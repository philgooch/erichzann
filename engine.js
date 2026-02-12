// ============================================================
// THE MUSIC OF ERICH ZANN - An Interactive Audio Drama
// Game Engine
// ============================================================


// --- GAME STATE ---
const state = {
  perception: 0, sanity: 0, luck: 0,
  zann_trust: 0, knowledge: 0, dread: 0, suspicion: 0,
  heard_music: 0, knows_void: 0, has_manuscript: 0,
  window_sealed: 0, played_viol: 0, 
  knows_street_name: 0, knows_clerk: 0,
  player_room_floor: '',
  rue_memory: 0, zann_dead: 0,
  committed_to_stay: 0, vowed_to_help: 0,
  currentScene: null,
  paragraph: 0,
  diceCallback: null
};

// --- DICE SYSTEM ---
const Dice = {
  roll(n, sides) {
    let total = 0;
    for (let i = 0; i < n; i++) total += Math.floor(Math.random() * sides) + 1;
    return total;
  },

  showTest(statName, callback) {
    const overlay = document.getElementById('dice-overlay');
    const title = document.getElementById('dice-title');
    const container = document.getElementById('dice-container');
    const result = document.getElementById('dice-result');
    const cont = document.getElementById('dice-continue');

    // Sanity (2d6+12) needs 4d6 to test; others (1d6+6) need 2d6
    const numDice = (statName === 'sanity') ? 4 : 2;

    title.textContent = 'Test Your ' + statName.charAt(0).toUpperCase() + statName.slice(1);

    // Build dice elements dynamically
    container.innerHTML = '';
    const dice = [];
    for (let i = 0; i < numDice; i++) {
      const die = document.createElement('div');
      die.className = 'die rolling';
      die.textContent = '?';
      container.appendChild(die);
      dice.push(die);
    }
    if (numDice === 4) container.classList.add('four-dice');
    else container.classList.remove('four-dice');

    result.classList.remove('visible');
    cont.classList.remove('visible');
    result.innerHTML = '';
    overlay.classList.add('visible');

    Audio.playDiceRoll();

    const target = state[statName];
    let rollInterval = setInterval(() => {
      dice.forEach(die => { die.textContent = Math.floor(Math.random() * 6) + 1; });
    }, 80);

    setTimeout(() => {
      clearInterval(rollInterval);
      let total = 0;
      dice.forEach(die => {
        const val = Math.floor(Math.random() * 6) + 1;
        die.textContent = val;
        die.classList.remove('rolling');
        total += val;
      });
      const success = total <= target;

      result.innerHTML = `Your ${statName.toUpperCase()} is <strong>${target}</strong>. You rolled <strong>${total}</strong>.<br>` +
        (success
          ? `<span class="success-text">\u2726 You succeeded! \u2726</span>`
          : `<span class="fail-text">\u2726 You failed. \u2726</span>`);
      result.classList.add('visible');

      setTimeout(() => {
        cont.classList.add('visible');
        cont.focus();
        state.diceCallback = () => callback(success);
      }, 600);
    }, 900);
  }
};

// --- TYPEWRITER ENGINE ---
const Typewriter = {
  queue: [],
  active: false,
  speed: 28,
  timer: null,
  startDelay: null,
  generation: 0,
  onComplete: null,
  currentEl: null,

  animateDialogs(container, onComplete) {
    const boxes = container.querySelectorAll('.dialog-box:not(.typed)');
    if (!boxes.length) { if (onComplete) onComplete(); return; }

    boxes.forEach((box, i) => {
      const textEl = box.querySelector('.dialog-text');
      if (!textEl) { box.classList.add('typed'); return; }
      const fullText = textEl.textContent;
      textEl.textContent = '';
      textEl.classList.add('typing');
      setTimeout(() => box.classList.add('typed'), i * 80);
      this.queue.push({ el: textEl, text: fullText, index: 0 });
    });

    this.onComplete = onComplete || null;
    if (!this.active) this.processNext();
  },

  processNext() {
    if (!this.queue.length) {
      this.active = false;
      this.currentEl = null;
      if (this.onComplete) { const cb = this.onComplete; this.onComplete = null; cb(); }
      return;
    }
    this.active = true;
    const item = this.queue[0];
    this.currentEl = item.el;
    const gen = ++this.generation;
    if (this.startDelay) { clearTimeout(this.startDelay); this.startDelay = null; }
    this.startDelay = setTimeout(() => {
      this.startDelay = null;
      if (this.generation !== gen) return;
      this.timer = setInterval(() => {
        if (this.generation !== gen) {
          clearInterval(this.timer);
          this.timer = null;
          return;
        }
        if (item.index < item.text.length) {
          item.el.textContent += item.text[item.index];
          item.index++;
          if (item.index % 4 === 0) Audio.playTypeClick();
        } else {
          clearInterval(this.timer); this.timer = null;
          item.el.classList.remove('typing');
          this.queue.shift();
          setTimeout(() => {
            if (this.generation === gen) this.processNext();
          }, 300);
        }
      }, this.speed);
    }, 200);
  },

  skip() {
    this.generation++;
    if (this.startDelay) { clearTimeout(this.startDelay); this.startDelay = null; }
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    this.queue.forEach(item => {
      item.el.textContent = item.text;
      item.el.classList.remove('typing');
    });
    this.queue = [];
    this.active = false;
    this.currentEl = null;
    if (this.onComplete) { const cb = this.onComplete; this.onComplete = null; cb(); }
  },

  stop() { this.skip(); }
};

// --- PARAGRAPH REVEAL ENGINE ---
const ParagraphReveal = {
  elements: [],
  currentIndex: 0,
  active: false,
  autoTimer: null,
  onComplete: null,
  indicatorEl: null,

  completeDialogBox(el) {
    if (!el || !el.classList.contains('dialog-box')) return;
    el.classList.add('typed');
    const textEl = el.querySelector('.dialog-text');
    if (textEl) {
      const fullText = textEl.getAttribute('data-full-text');
      if (fullText) {
        textEl.textContent = fullText;
      }
      textEl.classList.remove('typing');
    }
  },

  init() {
    this.indicatorEl = document.createElement('span');
    this.indicatorEl.className = 'reveal-indicator';
    this.indicatorEl.textContent = '\u261C';
    this.indicatorEl.setAttribute('role', 'button');
    this.indicatorEl.setAttribute('aria-label', 'Click or press Tab to reveal next paragraph');
    this.indicatorEl.setAttribute('tabindex', '-1');
    this.indicatorEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.active) this.skipCurrent();
    });
  },

  showIndicator(el) {
    if (!this.indicatorEl) return;
    if (el && el.tagName === 'P') {
      el.appendChild(this.indicatorEl);
      setTimeout(() => this.indicatorEl.classList.add('visible'), 300);
    }
  },

  hideIndicator() {
    if (this.indicatorEl) {
      this.indicatorEl.classList.remove('visible');
    }
  },

  moveIndicator(el) {
    this.hideIndicator();
    setTimeout(() => this.showIndicator(el), 100);
  },

  start(container, onComplete) {
    this.stop();

    const all = Array.from(container.children);
    this.elements = all.filter(el => {
      if (el.tagName === 'P') return true;
      if (el.classList.contains('dialog-box')) return true;
      if (el.classList.contains('skill-result')) return true;
      return false;
    });

    if (!this.elements.length) {
      if (onComplete) onComplete();
      return;
    }

    this.elements.forEach(el => {
      if (!el.classList.contains('dialog-box')) {
        el.classList.add('reveal-hidden');
      }
    });

    this.currentIndex = 0;
    this.active = true;
    this.onComplete = onComplete || null;

    document.getElementById('content').classList.add('reveal-active');

    this.autoTimer = setTimeout(() => this.revealNext(), 150);
  },

  revealNext() {
    if (this.currentIndex >= this.elements.length) {
      this.complete();
      return;
    }

    const el = this.elements[this.currentIndex];
    this.currentIndex++;

    if (el.classList.contains('dialog-box')) {
      this.hideIndicator();
      el.classList.add('typed');
      this.scrollToElement(el);
      const textEl = el.querySelector('.dialog-text');
      if (textEl) {
        const fullText = textEl.textContent;
        textEl.setAttribute('data-full-text', fullText);
        textEl.textContent = '';
        textEl.classList.add('typing');
        Typewriter.queue = [{ el: textEl, text: fullText, index: 0 }];
        Typewriter.onComplete = () => this.scheduleNext(200);
        Typewriter.active = false;
        Typewriter.processNext();
      } else {
        this.scheduleNext(200);
      }
    } else {
      el.classList.remove('reveal-hidden');
      this.scrollToElement(el);

      if (this.currentIndex < this.elements.length) {
        this.moveIndicator(el);
      } else {
        this.hideIndicator();
      }

      const chars = el.textContent.length;
      const base = Math.max(3000, Math.min(10000, chars * 30));
      const delay = el.classList.contains('thought') ? Math.min(5000, base * 1.3) : base;
      this.scheduleNext(delay);
    }
  },

  scheduleNext(delay) {
    this.autoTimer = setTimeout(() => this.revealNext(), delay);
  },

  scrollToElement(el) {
    const rect = el.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    if (rect.top > viewHeight * 0.65) {
      const targetY = window.scrollY + rect.top - viewHeight * 0.35;
      this.smoothScrollTo(targetY, 1400);
    }
  },

  smoothScrollTo(targetY, duration) {
    if (this._scrollRAF) cancelAnimationFrame(this._scrollRAF);

    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 1) return;

    const startTime = performance.now();

    const easeInOutQuart = (t) => t < 0.5
      ? 8 * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuart(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) {
        this._scrollRAF = requestAnimationFrame(step);
      } else {
        this._scrollRAF = null;
      }
    };

    this._scrollRAF = requestAnimationFrame(step);
  },

  skipCurrent() {
    if (!this.active) return;

    if (this.autoTimer) { clearTimeout(this.autoTimer); this.autoTimer = null; }

    Typewriter.onComplete = null;
    Typewriter.skip();

    for (let i = 0; i < this.currentIndex; i++) {
      const el = this.elements[i];
      if (el.classList.contains('dialog-box')) {
        this.completeDialogBox(el);
      }
    }

    const justRevealedIndex = this.currentIndex - 1;
    if (justRevealedIndex >= 0 && justRevealedIndex < this.elements.length) {
      const el = this.elements[justRevealedIndex];
      if (el.classList.contains('dialog-box')) {
        this.completeDialogBox(el);
      } else {
        el.classList.add('reveal-instant');
        el.classList.remove('reveal-hidden');
      }
    }

    if (this.currentIndex < this.elements.length) {
      this.hideIndicator();
      this.scheduleNext(150);
    } else {
      this.complete();
    }
  },

  skipAll() {
    if (!this.active) return;
    if (this.autoTimer) { clearTimeout(this.autoTimer); this.autoTimer = null; }

    Typewriter.onComplete = null;
    Typewriter.skip();

    for (let i = 0; i < this.elements.length; i++) {
      const el = this.elements[i];
      if (el.classList.contains('dialog-box')) {
        this.completeDialogBox(el);
      } else {
        el.classList.add('reveal-instant');
        el.classList.remove('reveal-hidden');
      }
    }

    this.currentIndex = this.elements.length;
    this.complete();
  },

  complete() {
    this.active = false;
    this.hideIndicator();
    document.getElementById('content').classList.remove('reveal-active');
    if (this.onComplete) {
      const cb = this.onComplete;
      this.onComplete = null;
      cb();
    }
  },

  stop() {
    if (this.autoTimer) { clearTimeout(this.autoTimer); this.autoTimer = null; }
    Typewriter.onComplete = null;
    Typewriter.stop();
    this.elements = [];
    this.currentIndex = 0;
    this.active = false;
    this.onComplete = null;
    this.hideIndicator();
    const content = document.getElementById('content');
    if (content) content.classList.remove('reveal-active');
  }
};

// --- GAME CONTROLLER ---
const Game = {
  start() {
    this.showTitle();
  },

  showTitle() {
    const content = document.getElementById('content');
    const choices = document.getElementById('choices');
    choices.innerHTML = '';
    content.innerHTML = `
      <div id="title-screen">
        <div class="title-flourish">\u2726</div>
        <div class="title-main">The Music of Erich Zann</div>
        <div class="title-sub">An Interactive Audio Drama</div>
        <div class="title-tagline">\u201CHe was playing nightly to save himself and the world from the infinite void\u2026\u201D</div>
        <div class="title-credit">After H.\u2009P. Lovecraft</div>
        <div class="title-flourish">\u2726 \u2726 \u2726</div>
        
        <div class="dramatis-section">
          <div class="dramatis-header">Dramatis Person\u00e6</div>
          <ul class="dramatis-list">
            <li><span class="dramatis-name">Edward Pickman</span>, <span class="dramatis-desc">a student of metaphysics; impoverished, overly curious</span></li>
            <li><span class="dramatis-name">Erich Zann</span>, <span class="dramatis-desc">a mute German viol-player; gaunt, terrified</span></li>
            <li><span class="dramatis-name">Blandot</span>, <span class="dramatis-desc">landlord of the boarding house; indifferent, content to collect rent</span></li>
            <li><span class="dramatis-name">The Tenant Below</span>, <span class="dramatis-desc">a weary clerk; long-term resident; knows too much</span></li>
            <li><span class="dramatis-name">The Night Wanderer</span>, <span class="dramatis-desc">a figure; seen on Rue d\u2019Auseil after dark</span></li>
            <li><span class="dramatis-name">The Concierge</span>, <span class="dramatis-desc">an elderly woman; remembers things best forgotten</span></li>
          </ul>
          <div class="dramatis-minor">Together with Lodgers, Passers-by, and Shadows<br>of the Rue d\u2019Auseil</div>
          
          <div class="scene-header">The Scene</div>
          <div class="scene-description">A steep and narrow street in a nameless city,<br>which appears on no map.</div>
        </div>
        
        <button class="begin-btn" onclick="Game.showCharGen()">Begin New Game</button>
        ${this.hasSave() ? '<button class="begin-btn continue-save-btn" onclick="Game.loadGame()">Continue Saved Game</button>' : ''}
      </div>`;
  },

  showCharGen() {
    Audio.init();
    const content = document.getElementById('content');
    content.classList.add('fading');
    Audio.playPageTurn();
    setTimeout(() => {
      content.innerHTML = `
        <div id="chargen-screen" style="display:block">
          <div class="chargen-title">\u2726 Your Character \u2726</div>
          <p style="text-align:center;font-style:italic;color:var(--ink-light);margin-bottom:1.5em;font-size:0.9rem">Roll your dice to determine your starting abilities.</p>
          <div class="stat-roll-row">
            <span class="stat-roll-label">PERCEPTION</span>
            <span class="stat-roll-formula">1d6 + 6</span>
            <span class="stat-roll-val" id="cg-perception">\u2014</span>
            <button class="roll-btn" id="roll-perception" onclick="Game.rollStat('perception')">Roll</button>
          </div>
          <div class="stat-roll-row">
            <span class="stat-roll-label">SANITY</span>
            <span class="stat-roll-formula">2d6 + 12</span>
            <span class="stat-roll-val" id="cg-sanity">\u2014</span>
            <button class="roll-btn" id="roll-sanity" onclick="Game.rollStat('sanity')">Roll</button>
          </div>
          <div class="stat-roll-row">
            <span class="stat-roll-label">LUCK</span>
            <span class="stat-roll-formula">1d6 + 6</span>
            <span class="stat-roll-val" id="cg-luck">\u2014</span>
            <button class="roll-btn" id="roll-luck" onclick="Game.rollStat('luck')">Roll</button>
          </div>
          <p class="chargen-desc"><strong>PERCEPTION</strong> measures your sharpness of mind \u2014 your ability to notice what others miss. <strong>SANITY</strong> is your mental fortitude against the unknown. <strong>LUCK</strong> is the fortune that stands between you and the abyss.</p>
          <p class="chargen-desc">During the game, these abilities will be tested. The game will roll dice \u2014 two for Perception and Luck, four for Sanity \u2014 and if the result is equal to or lower than your ability, you may learn something useful.</p>
          <button class="adventure-btn" id="start-adventure" onclick="Game.beginAdventure()">Enter the City</button>
        </div>`;
      content.classList.remove('fading');
    }, 500);
  },

  rollStat(stat) {
    const btn = document.getElementById('roll-' + stat);
    const display = document.getElementById('cg-' + stat);
    btn.disabled = true;

    let val;
    if (stat === 'perception') val = Dice.roll(1,6) + 6;
    else if (stat === 'sanity') val = Dice.roll(2,6) + 12;
    else val = Dice.roll(1,6) + 6;

    let count = 0;
    const interval = setInterval(() => {
      display.textContent = Math.floor(Math.random() * 6) + (stat === 'sanity' ? 14 : 7);
      count++;
      if (count > 8) {
        clearInterval(interval);
        display.textContent = val;
        display.style.color = '#0a0a0c';
        display.style.fontSize = '1.4rem';
        state[stat] = val;
        Audio.playDiceRoll();

        if (state.perception && state.sanity && state.luck) {
          document.getElementById('start-adventure').classList.add('ready');
        }
      }
    }, 80);
  },

  beginAdventure() {
    if (!state.perception || !state.sanity || !state.luck) return;
    document.getElementById('stats-bar').classList.add('visible');
    this.updateStats();
    this.loadScene('a1_title');
  },

  loadScene(id) {
    const scene = SCENES[id];
    if (!scene) { console.error('Scene not found:', id); return; }
    state.currentScene = id;

    // Auto-save on every scene transition (except title screens)
    if (scene.type !== 'act_title') {
      this.saveGame(true);
    }

    ParagraphReveal.stop();
    Typewriter.stop();

    const content = document.getElementById('content');
    const choices = document.getElementById('choices');

    content.classList.add('fading');
    Audio.playPageTurn();

    if (scene.ambience) Audio.playAmbience(scene.ambience);

    // Play scene music (layered on top of ambience)
    if (scene.audio !== undefined) Audio.playMusic(scene.audio);

    // Update void-touched CSS based on dread level
    this.updateDreadEffects();

    setTimeout(() => {
      choices.innerHTML = '';

      if (scene.type === 'act_title') {
        content.innerHTML = `
          <div class="act-title-screen">
            <div class="act-number">${scene.actNum}</div>
            <div class="act-name">${scene.actName}</div>
            <div class="title-flourish">\u2726 \u2726 \u2726</div>
            <button class="continue-btn" onclick="Game.loadScene('${scene.next}')">Turn the Page</button>
          </div>`;
      } else if (scene.type === 'minigame') {
        // Delegate to a self-contained minigame module
        choices.innerHTML = '';
        if (scene.game === 'viol_game' && typeof ViolGame !== 'undefined') {
          content.innerHTML = '<div id="minigame-container"></div>';
          content.classList.remove('fading');
          const mgContainer = document.getElementById('minigame-container');
          ViolGame.start(mgContainer, () => {
            const nextScene = SCENES[scene.next];
            const nextPara = nextScene ? nextScene.paragraph : '?';
            choices.innerHTML = `<button class="continue-btn" onclick="Game.loadScene('${scene.next}')">Continue</button>`;
          });
          window.scrollTo({ top: 0 });
          return;
        } else {
          // Fallback: skip to next scene if module not loaded
          content.classList.remove('fading');
          this.loadScene(scene.next);
          return;
        }
      } else if (scene.type === 'act_close') {
        content.innerHTML = this.buildSceneHTML(scene);
        ParagraphReveal.start(content, () => {
          this.buildActCloseScreen(scene, choices);
          this.scrollToChoices();
        });
      } else if (scene.type === 'ending') {
        content.innerHTML = this.buildSceneHTML(scene);
        ParagraphReveal.start(content, () => {
          this.buildEndScreen(choices);
          this.scrollToChoices();
        });
      } else if (scene.type === 'game_ending') {
        content.innerHTML = this.buildSceneHTML(scene);
        ParagraphReveal.start(content, () => {
          this.buildGameEndScreen(scene, choices);
          this.scrollToChoices();
        });
      } else {
        content.innerHTML = this.buildSceneHTML(scene);
        ParagraphReveal.start(content, () => {
          if (scene.choices) {
            this.buildChoices(scene.choices, choices);
          } else if (scene.conditionalNext || scene.next) {
            const nextId = this.resolveNextScene(scene);
            if (nextId) {
              const nextScene = SCENES[nextId];
              const nextPara = nextScene ? nextScene.paragraph : '?';
              choices.innerHTML = `<button class="continue-btn" onclick="Game.loadScene('${nextId}')">Turn to \u00a7${nextPara}</button>`;
              this.scrollToChoices();
            }
          }
        });
      }

      content.classList.remove('fading');
      window.scrollTo({ top: 0 });
    }, 500);
  },

  // Replace {{if condition}}...{{else}}...{{/if}} blocks and {{varName}} placeholders
  resolveTemplates(html) {
    // Process {{if}}...{{/if}} blocks (innermost first to support nesting)
    const ifPattern = /\{\{if\s+([^}]+)\}\}([\s\S]*?)\{\{\/if\}\}/;
    let result = html;
    let safety = 0;
    while (ifPattern.test(result) && safety++ < 50) {
      result = result.replace(ifPattern, (match, condition, body) => {
        // Split on {{else}} to get if/else branches
        const parts = body.split(/\{\{else\}\}/);
        const ifBody = parts[0];
        const elseBody = parts.length > 1 ? parts[1] : '';
        return this.checkCondition(condition.trim()) ? ifBody : elseBody;
      });
    }
    // Then substitute simple {{varName}} placeholders
    result = result.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      const val = state[key];
      return (val !== undefined && val !== '') ? val : match;
    });
    return result;
  },

  buildSceneHTML(scene) {
    let html = '';
    if (scene.title) {
      html += `<div class="scene-title">${scene.title}</div>`;
      if (scene.subtitle) html += `<div class="scene-subtitle">${scene.subtitle}</div>`;
      else html += `<div class="scene-subtitle">\u2726</div>`;
    }
    if (scene.paragraph) {
      html += `<div style="margin-bottom:0.5em"><span class="para-num">\u00a7${scene.paragraph}</span></div>`;
    }
    html += scene.text;

    // Handle exclusive conditional text blocks (only first match shown)
    if (scene.exclusiveConditionals) {
      let matched = false;
      for (const cond of scene.exclusiveConditionals) {
        if (!matched && this.checkCondition(cond.check)) {
          html += cond.text;
          matched = true;
          break;
        }
      }
      if (!matched && scene.defaultConditional) {
        html += scene.defaultConditional;
      }
    }
    // Handle conditional text blocks - all matches shown
    else if (scene.conditionals) {
      let anyMatched = false;
      scene.conditionals.forEach(cond => {
        if (this.checkCondition(cond.check)) {
          html += cond.text;
          anyMatched = true;
        }
      });
      if (!anyMatched && scene.defaultConditional) {
        html += scene.defaultConditional;
      }
    }
    if (scene.closingText) {
      html += scene.closingText;
    }

    return this.resolveTemplates(html);
  },

  // Resolve the next scene, handling conditionalNext arrays
  resolveNextScene(scene) {
    if (scene.conditionalNext) {
      for (const cond of scene.conditionalNext) {
        if (this.checkCondition(cond.check)) {
          return cond.next;
        }
      }
    }
    return scene.next;
  },

  // Resolve outcome text for a choice, checking exclusiveOutcomes first
  resolveOutcome(choice) {
    if (choice.exclusiveOutcomes) {
      for (const cond of choice.exclusiveOutcomes) {
        if (this.checkCondition(cond.check)) {
          return cond.text;
        }
      }
    }
    return choice.outcome;
  },

  checkCondition(expr) {
    if (expr.includes('&&')) {
      const parts = expr.split('&&').map(p => p.trim());
      return parts.every(p => this.checkCondition(p));
    }
    // Match: key op value (value can be a number or a quoted string)
    const match = expr.match(/^(\w+)\s*(>=|<=|>|<|!==|!=|===|==)\s*(?:'([^']*)'|"([^"]*)"|(-?\d+))$/);
    if (!match) return false;
    const [, key, op, strSingle, strDouble, numStr] = match;
    const stateVal = state[key];

    if (numStr !== undefined) {
      // Numeric comparison (existing behaviour)
      const numVal = parseInt(numStr);
      const sv = stateVal || 0;
      switch(op) {
        case '>=': return sv >= numVal;
        case '<=': return sv <= numVal;
        case '>':  return sv > numVal;
        case '<':  return sv < numVal;
        case '===': case '==': return sv === numVal;
        case '!==': case '!=': return sv !== numVal;
        default: return false;
      }
    } else {
      // String comparison
      const strVal = strSingle !== undefined ? strSingle : strDouble;
      const sv = stateVal || '';
      switch(op) {
        case '===': case '==': return sv === strVal;
        case '!==': case '!=': return sv !== strVal;
        default: return false;
      }
    }
  },

  buildChoices(choiceList, container) {
    container.innerHTML = `<div class="choices-header">What do you do?</div>`;
    choiceList.forEach((c, i) => {
      // Skip choices whose condition is not met
      if (c.condition && !this.checkCondition(c.condition)) return;
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = this.resolveTemplates(`<span class="choice-label">${c.label}.</span> ${c.text}`);
      btn.onclick = () => this.makeChoice(i);
      container.appendChild(btn);
    });
    this.scrollToChoices();
  },

  scrollToChoices() {
    setTimeout(() => {
      const el = document.getElementById('choices');
      if (el && el.innerHTML.trim()) {
        const rect = el.getBoundingClientRect();
        const targetY = window.scrollY + rect.top - window.innerHeight * 0.35;
        ParagraphReveal.smoothScrollTo(targetY, 1400);
      }
    }, 80);
  },

  makeChoice(index) {
    const scene = SCENES[state.currentScene];
    const choice = scene.choices[index];

    document.querySelectorAll('.choice-btn').forEach(b => b.classList.add('disabled'));

    // Apply effects
    if (choice.effects) {
      for (const [key, val] of Object.entries(choice.effects)) {
        state[key] = typeof val === 'string' ? val : (state[key] || 0) + val;
      }
    }

    // Check for skill test
    if (choice.skillTest) {
      if (choice.skillTest.deferResult) {
        this.showOutcome(choice, null, true);
      } else {
        Dice.showTest(choice.skillTest.stat, (success) => {
          if (choice.skillTest.stat === 'luck') {
            state.luck = Math.max(0, state.luck - 1);
          }
          if (success && choice.skillTest.successBonus) {
            for (const [key, val] of Object.entries(choice.skillTest.successBonus)) {
              state[key] = typeof val === 'string' ? val : (state[key] || 0) + val;
            }
          }
          if (!success && choice.skillTest.failPenalty) {
            for (const [key, val] of Object.entries(choice.skillTest.failPenalty)) {
              state[key] = typeof val === 'string' ? val : (state[key] || 0) + val;
            }
          }
          this.showOutcome(choice, success, false);
        });
      }
    } else {
      this.showOutcome(choice, null, false);
    }
  },

  showOutcome(choice, skillSuccess, deferPending) {
    const content = document.getElementById('content');
    const choices = document.getElementById('choices');
    choices.innerHTML = '';

    let outcomeHTML = `<div class="outcome-section">`;
    outcomeHTML += `<div style="margin-bottom:0.5em"><span class="para-num">\u00a7${choice.paragraph}</span></div>`;

    const st = (!deferPending && skillSuccess !== null)
      ? SCENES[state.currentScene].choices.find(c => c.paragraph === choice.paragraph).skillTest
      : (deferPending ? SCENES[state.currentScene].choices.find(c => c.paragraph === choice.paragraph).skillTest : null);

    const skillOverride = skillSuccess !== null && st && (
      (skillSuccess && st.successNext) || (!skillSuccess && st.failNext)
    );

    if (st && !st.deferResult && skillSuccess !== null) {
      outcomeHTML += skillSuccess ? st.successText : st.failText;
    }

    if (skillSuccess !== null && st && skillSuccess && st.successOutcome !== undefined) {
      outcomeHTML += st.successOutcome;
    } else if (skillSuccess !== null && st && !skillSuccess && st.failOutcome !== undefined) {
      outcomeHTML += st.failOutcome;
    } else if (!skillOverride) {
      outcomeHTML += this.resolveOutcome(choice);
    }

    if (st && st.deferResult && skillSuccess !== null) {
      outcomeHTML += skillSuccess ? st.successText : st.failText;
    }
    outcomeHTML += `</div>`;

    content.innerHTML += this.resolveTemplates(outcomeHTML);

    // Play choice-level audio (null = fade out all music tracks)
    if (choice.audio !== undefined) {
      if (choice.audio === null || choice.audioMode === 'replace') {
        Audio.playMusic(choice.audio);
      } else {
        Audio.layerMusic(choice.audio);
      }
    }

    const outcomeEl = content.querySelector('.outcome-section:last-of-type');

    if (deferPending) {
      ParagraphReveal.start(outcomeEl, () => {
        const deferSt = SCENES[state.currentScene].choices.find(c => c.paragraph === choice.paragraph).skillTest;
        Dice.showTest(deferSt.stat, (success) => {
          if (deferSt.stat === 'luck') {
            state.luck = Math.max(0, state.luck - 1);
          }
          if (success && deferSt.successBonus) {
            for (const [key, val] of Object.entries(deferSt.successBonus)) {
              state[key] = typeof val === 'string' ? val : (state[key] || 0) + val;
            }
          }
          if (!success && deferSt.failPenalty) {
            for (const [key, val] of Object.entries(deferSt.failPenalty)) {
              state[key] = typeof val === 'string' ? val : (state[key] || 0) + val;
            }
          }

          const resultHTML = success ? deferSt.successText : deferSt.failText;
          if (resultHTML) {
            const resultWrapper = document.createElement('div');
            resultWrapper.innerHTML = this.resolveTemplates(resultHTML);
            outcomeEl.appendChild(resultWrapper);
            ParagraphReveal.start(resultWrapper, () => {
              this.showContinueButton(choice, deferSt, success, choices);
            });
          } else {
            this.showContinueButton(choice, deferSt, success, choices);
          }

          this.updateStats();
        });
      });
    } else {
      ParagraphReveal.start(outcomeEl, () => {
        this.showContinueButton(choice, st, skillSuccess, choices);
      });
    }

    this.updateStats();

    // Scroll to outcome
    setTimeout(() => {
      const outcome = content.querySelector('.outcome-section:last-of-type');
      if (outcome) {
        const rect = outcome.getBoundingClientRect();
        const targetY = window.scrollY + rect.top - window.innerHeight * 0.2;
        ParagraphReveal.smoothScrollTo(targetY, 1400);
      }
    }, 100);
  },

  showContinueButton(choice, st, skillSuccess, choicesEl) {
    let nextKey = choice.next;
    if (st && skillSuccess !== null) {
      if (skillSuccess && st.successNext) nextKey = st.successNext;
      if (!skillSuccess && st.failNext) nextKey = st.failNext;
    }
    const nextScene = SCENES[nextKey];
    const nextPara = nextScene ? nextScene.paragraph : '?';
    choicesEl.innerHTML = `<button class="continue-btn" onclick="Game.loadScene('${nextKey}')">Turn to \u00a7${nextPara}</button>`;
    this.scrollToChoices();
  },

  buildActCloseScreen(scene, container) {
    let html = `<div class="end-act">`;
    html += `<div class="stats-summary">`;
    html += `<strong>Your Progress</strong><br><br>`;
    html += `Perception: ${state.perception} \u2022 Sanity: ${state.sanity} \u2022 Luck: ${state.luck}<br>`;
    html += `<br>`;
    html += `<em>The music plays on. What you have heard cannot be unheard\u2026</em>`;
    html += `</div>`;
    html += `<div class="title-flourish">\u2726</div>`;
    if (scene.next && SCENES[scene.next]) {
      html += `<button class="continue-btn" onclick="Game.loadScene('${scene.next}')" style="margin-top:1.5em">Continue to ${scene.nextActLabel || 'the next act'}</button>`;
    }
    html += `</div>`;
    container.innerHTML = html;
  },

  buildEndScreen(container) {
    let html = `<div class="end-act">`;
    html += `<div class="stats-summary">`;
    html += `<strong>Your Progress</strong><br><br>`;
    html += `Perception: ${state.perception} \u2022 Sanity: ${state.sanity} \u2022 Luck: ${state.luck}<br>`;
    html += `<br>`;
    html += `<em>The music plays on. What you have heard cannot be unheard\u2026</em>`;
    html += `</div>`;
    html += `<div class="title-flourish">\u2726</div>`;
    html += `<p style="text-align:center;font-style:italic;color:var(--ink-light);margin:1em 0">The next act \u2014 coming soon.</p>`;
    html += `<button class="continue-btn" onclick="Game.restart()" style="margin-top:1.5em">Play Again from the Beginning</button>`;
    html += `</div>`;
    container.innerHTML = html;
  },

  buildGameEndScreen(scene, container) {
    let html = `<div class="end-act">`;
    html += `<div class="scene-break"></div>`;
    html += `<div class="title-flourish">\u2726 \u2726 \u2726</div>`;
    if (scene.endingTitle) {
      html += `<p style="text-align:center;font-family:'Cinzel',serif;font-size:1.3rem;color:var(--gold);letter-spacing:0.1em;margin:1em 0">${scene.endingTitle}</p>`;
    }
    if (scene.endingSubtitle) {
      html += `<p style="text-align:center;font-style:italic;color:var(--ink-light);margin:0.5em 0">${scene.endingSubtitle}</p>`;
    }
    html += `<div class="stats-summary" style="margin-top:2em">`;
    html += `<strong>Final Record</strong><br><br>`;
    html += `Perception: ${state.perception} \u2022 Sanity: ${state.sanity} \u2022 Luck: ${state.luck}<br>`;
    html += `</div>`;
    html += `<div class="title-flourish">\u2726</div>`;
    html += `<p style="text-align:center;font-style:italic;color:var(--ink-light);margin:1em 0">There are five possible endings. Your choices determined this one.</p>`;
    html += `<button class="continue-btn" onclick="Game.restart()" style="margin-top:1.5em">Play Again from the Beginning</button>`;
    html += `</div>`;
    container.innerHTML = html;
  },

  updateStats() {
    document.getElementById('perception-display').textContent = state.perception;
    document.getElementById('sanity-display').textContent = state.sanity;
    document.getElementById('luck-display').textContent = state.luck;
    this.updateDreadEffects();
  },

  // Apply visual effects based on dread level
  updateDreadEffects() {
    const parchment = document.getElementById('parchment');
    if (!parchment) return;
    if (state.dread >= 3) {
      parchment.classList.add('void-touched');
    } else {
      parchment.classList.remove('void-touched');
    }
  },

  closeDice() {
    document.getElementById('dice-overlay').classList.remove('visible');
    if (state.diceCallback) {
      const cb = state.diceCallback;
      state.diceCallback = null;
      cb();
    }
  },

  restart() {
    ParagraphReveal.stop();
    Typewriter.stop();
    state.perception = 0; state.sanity = 0; state.luck = 0;
    state.zann_trust = 0; state.knowledge = 0; state.dread = 0; state.suspicion = 0;
    state.heard_music = 0; state.knows_void = 0; state.has_manuscript = 0;
    state.window_sealed = 0; state.played_viol = 0; state.knows_clerk = 0;
    state.knows_street_name = 0;
    state.player_room_floor = '';
    state.rue_memory = 0; state.zann_dead = 0;
    state.committed_to_stay = 0; state.vowed_to_help = 0;
    state.currentScene = null; state.diceCallback = null;
    document.getElementById('stats-bar').classList.remove('visible');
    const parchment = document.getElementById('parchment');
    if (parchment) parchment.classList.remove('void-touched');
    Audio.stopAll();
    this.deleteSave();
    this.showTitle();
    window.scrollTo({ top: 0 });
  },

  // --- SAVE / LOAD SYSTEM ---
  SAVE_KEY: 'zann_save',

  saveGame(quiet) {
    const saveData = {
      version: 1,
      timestamp: Date.now(),
      state: {
        perception: state.perception,
        sanity: state.sanity,
        luck: state.luck,
        zann_trust: state.zann_trust,
        knowledge: state.knowledge,
        dread: state.dread,
        suspicion: state.suspicion,
        heard_music: state.heard_music,
        knows_void: state.knows_void,
        has_manuscript: state.has_manuscript,
        window_sealed: state.window_sealed,
        played_viol: state.played_viol,
        knows_street_name: state.knows_street_name,
        knows_clerk: state.knows_clerk,
        player_room_floor: state.player_room_floor,
        rue_memory: state.rue_memory,
        zann_dead: state.zann_dead,
        committed_to_stay: state.committed_to_stay,
        vowed_to_help: state.vowed_to_help,
        currentScene: state.currentScene
      }
    };
    try {
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
      if (!quiet) this.showSaveConfirm();
    } catch (e) {
      console.error('Save failed:', e);
    }
  },

  showSaveConfirm() {
    const btn = document.getElementById('save-btn');
    if (!btn) return;
    btn.classList.add('saved');
    btn.textContent = '\u2713 Saved';
    setTimeout(() => {
      btn.classList.remove('saved');
      btn.textContent = '\u26B3 Save';
    }, 1500);
  },

  hasSave() {
    try {
      return localStorage.getItem(this.SAVE_KEY) !== null;
    } catch (e) {
      return false;
    }
  },

  loadGame() {
    try {
      const raw = localStorage.getItem(this.SAVE_KEY);
      if (!raw) return false;
      const saveData = JSON.parse(raw);
      const s = saveData.state;
      state.perception = s.perception;
      state.sanity = s.sanity;
      state.luck = s.luck;
      state.zann_trust = s.zann_trust || 0;
      state.knowledge = s.knowledge || 0;
      state.dread = s.dread || 0;
      state.suspicion = s.suspicion || 0;
      state.heard_music = s.heard_music || 0;
      state.knows_void = s.knows_void || 0;
      state.has_manuscript = s.has_manuscript || 0;
      state.window_sealed = s.window_sealed || 0;
      state.played_viol = s.played_viol || 0;
      state.knows_street_name = s.knows_street_name || 0;
      state.knows_clerk = s.knows_clerk || 0;
      state.player_room_floor = s.player_room_floor || '';
      state.rue_memory = s.rue_memory || 0;
      state.zann_dead = s.zann_dead || 0;
      state.committed_to_stay = s.committed_to_stay || 0;
      state.vowed_to_help = s.vowed_to_help || 0;
      state.currentScene = s.currentScene;
      state.diceCallback = null;

      Audio.init();
      document.getElementById('stats-bar').classList.add('visible');
      this.updateStats();
      this.loadScene(state.currentScene);
      return true;
    } catch (e) {
      console.error('Load failed:', e);
      return false;
    }
  },

  deleteSave() {
    try { localStorage.removeItem(this.SAVE_KEY); } catch (e) { /* ignore */ }
  }
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  ParagraphReveal.init();
  Game.start();
  // Click on content to skip current paragraph
  document.getElementById('content').addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    if (ParagraphReveal.active) {
      ParagraphReveal.skipCurrent();
    } else if (Typewriter.active) {
      Typewriter.skip();
    }
  });
  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    const diceOverlay = document.getElementById('dice-overlay');
    const diceContinue = document.getElementById('dice-continue');
    const diceModalOpen = diceOverlay && diceOverlay.classList.contains('visible');

    if (diceModalOpen) {
      const continueReady = diceContinue && diceContinue.classList.contains('visible');
      if (continueReady && (e.key === 'Enter' || e.key === 'Escape')) {
        e.preventDefault();
        Game.closeDice();
      }
      return;
    }

    if (e.key === 'Tab' && ParagraphReveal.active) {
      e.preventDefault();
      ParagraphReveal.skipCurrent();
    }
  });
});
