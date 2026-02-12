// ============================================================
// THE VIOL — Mini-Game Module
// Musical pattern-matching: Zann plays a sequence on the viol,
// the player repeats it by clicking the strings.
// Three rounds of increasing difficulty. The third round's final
// note is impossible — it comes from beyond the strings.
// Self-contained: injects its own CSS, uses Audio.playViolNote().
// ============================================================
const ViolGame = {

  // Viol string definitions — distinct colours for visual clarity
  strings: [
    { id: 0, name: 'I',   pitch: 146.83, hue: '35'  },  // D3 — amber
    { id: 1, name: 'II',  pitch: 196.00, hue: '100' },  // G3 — olive
    { id: 2, name: 'III', pitch: 261.63, hue: '210' },  // C4 — steel blue
    { id: 3, name: 'IV',  pitch: 329.63, hue: '340' }   // E4 — dusky rose
  ],

  // The void pitch — no string, impossible to play
  voidPitch: 73.42,  // D2, sub-bass, wrong register entirely

  // Round sequences (indices into strings array; -1 = void note)
  rounds: [
    { notes: [0, 2, 1],                  tempo: 700  },  // Round 1: 3 notes, slow
    { notes: [3, 1, 0, 2, 3],            tempo: 550  },  // Round 2: 5 notes, moderate
    { notes: [2, 0, 3, 1, 2, 3, -1],     tempo: 450  }   // Round 3: 7 notes, faster
  ],

  container: null,
  onComplete: null,
  currentRound: 0,
  playerInput: [],
  inputActive: false,
  score: 0,
  cssInjected: false,
  _keyHandler: null,

  start(container, onComplete) {
    this.container = container;
    this.onComplete = onComplete;
    this.currentRound = 0;
    this.score = 0;
    this.injectCSS();
    this.showIntro();
  },

  injectCSS() {
    if (this.cssInjected) return;
    this.cssInjected = true;
    const style = document.createElement('style');
    style.textContent = `
/* === VIOL MINI-GAME === */
.viol-game{
  text-align:center;padding:1em 0;
  font-family:'IM Fell English',Georgia,serif;
  color:var(--ink);
}
.viol-title{
  font-family:'Cinzel',serif;font-size:1.3rem;
  letter-spacing:0.15em;text-transform:uppercase;
  margin-bottom:0.3em;color:var(--ink);
}
.viol-subtitle{
  font-family:'Cinzel',serif;font-size:0.75rem;
  letter-spacing:0.25em;text-transform:uppercase;
  color:var(--ink-light);margin-bottom:1.5em;
}
.viol-instruction{
  font-style:italic;color:var(--ink-light);
  margin:1em 0;font-size:0.95rem;line-height:1.6;
}
.viol-round-label{
  font-family:'Cinzel',serif;font-size:0.8rem;
  letter-spacing:0.2em;text-transform:uppercase;
  color:var(--ink-light);margin:1.5em 0 0.5em;
}

/* String container */
.viol-strings{
  display:flex;flex-direction:row;
  justify-content:center;align-items:stretch;
  gap:6px;margin:1.5em auto;
  max-width:340px;height:220px;
  position:relative;
}

/* Individual string — large tappable panel, colour-coded */
.viol-string{
  flex:1;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  position:relative;cursor:pointer;
  transition:all 0.2s;
  user-select:none;-webkit-user-select:none;
  border:2px solid var(--ink);
  background:rgba(0,0,0,0.03);
  min-width:60px;
}
.viol-string:hover{background:rgba(0,0,0,0.06)}
.viol-string.disabled{cursor:default;opacity:0.4;border-color:rgba(10,10,12,0.2)}
.viol-string.disabled:hover{background:rgba(0,0,0,0.03)}

/* Colour-coded idle backgrounds — subtle tint */
.viol-string[data-hue="35"]{background:hsla(35,40%,50%,0.08);border-color:hsla(35,30%,30%,0.5)}
.viol-string[data-hue="100"]{background:hsla(100,30%,45%,0.08);border-color:hsla(100,25%,30%,0.5)}
.viol-string[data-hue="210"]{background:hsla(210,30%,50%,0.08);border-color:hsla(210,25%,30%,0.5)}
.viol-string[data-hue="340"]{background:hsla(340,30%,45%,0.08);border-color:hsla(340,25%,30%,0.5)}

/* The actual string line */
.viol-string::before{
  content:'';position:absolute;
  top:10%;bottom:10%;left:50%;
  transform:translateX(-50%);
  transition:all 0.15s;
  border-radius:1px;
}
.viol-string[data-hue="35"]::before{width:5px;background:linear-gradient(180deg,hsla(35,50%,40%,0.2) 0%,hsla(35,60%,50%,0.8) 50%,hsla(35,50%,40%,0.2) 100%)}
.viol-string[data-hue="100"]::before{width:4px;background:linear-gradient(180deg,hsla(100,40%,35%,0.2) 0%,hsla(100,50%,45%,0.8) 50%,hsla(100,40%,35%,0.2) 100%)}
.viol-string[data-hue="210"]::before{width:3px;background:linear-gradient(180deg,hsla(210,40%,40%,0.2) 0%,hsla(210,50%,55%,0.8) 50%,hsla(210,40%,40%,0.2) 100%)}
.viol-string[data-hue="340"]::before{width:2px;background:linear-gradient(180deg,hsla(340,40%,35%,0.2) 0%,hsla(340,50%,45%,0.8) 50%,hsla(340,40%,35%,0.2) 100%)}

/* String label — roman numeral */
.viol-string-label{
  position:absolute;bottom:8px;
  font-family:'Cinzel',serif;font-size:0.75rem;font-weight:700;
  letter-spacing:0.05em;opacity:0.7;
}
/* Keyboard hint — top of string */
.viol-key-hint{
  position:absolute;top:8px;
  font-family:'Cinzel',serif;font-size:0.6rem;
  opacity:0.4;letter-spacing:0.05em;
  color:var(--ink-light);
}
.viol-string[data-hue="35"] .viol-string-label{color:hsl(35,50%,35%)}
.viol-string[data-hue="100"] .viol-string-label{color:hsl(100,40%,30%)}
.viol-string[data-hue="210"] .viol-string-label{color:hsl(210,40%,35%)}
.viol-string[data-hue="340"] .viol-string-label{color:hsl(340,40%,30%)}

/* === PLAYING STATE — bold, unmistakable colour fill === */
.viol-string.playing{transition:all 0.08s}
.viol-string[data-hue="35"].playing{background:hsla(35,70%,55%,0.35);border-color:hsl(35,60%,40%);box-shadow:inset 0 0 30px hsla(35,70%,50%,0.2),0 0 12px hsla(35,70%,50%,0.15)}
.viol-string[data-hue="100"].playing{background:hsla(100,60%,50%,0.3);border-color:hsl(100,50%,35%);box-shadow:inset 0 0 30px hsla(100,60%,45%,0.2),0 0 12px hsla(100,60%,45%,0.15)}
.viol-string[data-hue="210"].playing{background:hsla(210,60%,55%,0.3);border-color:hsl(210,50%,40%);box-shadow:inset 0 0 30px hsla(210,60%,50%,0.2),0 0 12px hsla(210,60%,50%,0.15)}
.viol-string[data-hue="340"].playing{background:hsla(340,60%,50%,0.3);border-color:hsl(340,50%,35%);box-shadow:inset 0 0 30px hsla(340,60%,45%,0.2),0 0 12px hsla(340,60%,45%,0.15)}

.viol-string.playing::before{
  width:6px !important;
  filter:brightness(1.8);
  box-shadow:0 0 10px currentColor,0 0 20px currentColor;
  animation:stringVibrate 0.05s linear 8;
}

@keyframes stringVibrate{
  0%{transform:translateX(-50%)}
  25%{transform:translateX(calc(-50% + 2px))}
  50%{transform:translateX(-50%)}
  75%{transform:translateX(calc(-50% - 2px))}
  100%{transform:translateX(-50%)}
}

/* Wrong note — red fill */
.viol-string.wrong{
  background:hsla(0,60%,40%,0.25) !important;
  border-color:hsl(0,50%,35%) !important;
  box-shadow:inset 0 0 30px hsla(0,60%,40%,0.2),0 0 8px hsla(0,60%,40%,0.15) !important;
}
.viol-string.wrong::before{filter:brightness(0.5) !important}

/* Correct note — green fill */
.viol-string.correct{
  background:hsla(120,50%,40%,0.2) !important;
  border-color:hsl(120,40%,30%) !important;
  box-shadow:inset 0 0 20px hsla(120,50%,40%,0.15) !important;
}

/* === VOID NOTE — the impossible string === */
.viol-void-note{
  position:absolute;top:0;left:0;right:0;bottom:0;
  display:flex;align-items:center;justify-content:center;
  background:radial-gradient(ellipse at center,
    rgba(60,0,100,0.3) 0%,rgba(20,0,40,0.15) 60%,transparent 100%
  );
  opacity:0;transition:opacity 0.5s;
  pointer-events:none;z-index:10;
  cursor:pointer;
  border:2px dashed rgba(120,60,200,0.4);
}
.viol-void-note.visible{
  opacity:1;pointer-events:auto;
  animation:voidNoteFlicker 0.8s ease-in-out infinite alternate;
}
@keyframes voidNoteFlicker{
  0%{background:radial-gradient(ellipse at center,rgba(60,0,100,0.25) 0%,rgba(20,0,40,0.12) 60%,transparent 100%)}
  100%{background:radial-gradient(ellipse at center,rgba(80,0,140,0.35) 0%,rgba(30,0,60,0.2) 60%,transparent 100%)}
}
.viol-void-label{
  font-family:'Cinzel',serif;font-size:0.8rem;font-weight:700;
  color:rgba(160,120,220,0.8);letter-spacing:0.15em;
  text-transform:uppercase;
  text-shadow:0 0 10px rgba(120,60,200,0.4);
}

/* Result display */
.viol-result{
  margin:1.5em 0;padding:0.8em 1em;
  border:3px solid var(--ink);
  font-family:'Cinzel',serif;font-size:0.85rem;
  letter-spacing:0.05em;text-align:center;
}
.viol-result.success{border-color:#3a5a1a;color:#2a4a10}
.viol-result.partial{border-color:#5a5a1a;color:#4a4a10}
.viol-result.failure{border-color:#5a1a1a;color:#4a1010}

/* Narrative text */
.viol-narrative{
  font-style:italic;color:var(--ink-light);
  margin:0.8em 0;font-size:0.9rem;line-height:1.65;
}

/* Visual effects — screen edges darkening */
.viol-atmosphere{
  position:fixed;top:0;left:0;right:0;bottom:0;
  pointer-events:none;z-index:99;
  transition:opacity 1.5s ease;opacity:0;
}
.viol-atmosphere.round2{
  opacity:1;
  background:radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.3) 100%);
}
.viol-atmosphere.round3{
  opacity:1;
  background:radial-gradient(ellipse at center,transparent 30%,rgba(20,0,40,0.4) 100%);
}

/* Begin button */
.viol-begin-btn{
  display:inline-block;margin:1.5em auto;padding:0.6em 2em;
  background:var(--ink);color:var(--parchment);
  border:3px solid var(--ink);border-radius:0;
  font-family:'Cinzel',serif;font-size:0.85rem;
  letter-spacing:0.1em;cursor:pointer;transition:all 0.3s;
  text-transform:uppercase;
}
.viol-begin-btn:hover{
  background:#2a2430;
  box-shadow:3px 3px 0 rgba(0,0,0,0.2);
}

/* Sequence indicator dots — colour-coded to match strings */
.viol-progress{
  display:flex;justify-content:center;gap:0.6em;
  margin:1em 0;
}
.viol-dot{
  width:14px;height:14px;
  border:2px solid var(--ink-light);
  background:transparent;
  transition:all 0.3s;
}
.viol-dot.hue-35{border-color:hsla(35,40%,40%,0.6)}
.viol-dot.hue-100{border-color:hsla(100,35%,35%,0.6)}
.viol-dot.hue-210{border-color:hsla(210,35%,40%,0.6)}
.viol-dot.hue-340{border-color:hsla(340,35%,35%,0.6)}

.viol-dot.played{transform:scale(1.15)}
.viol-dot.hue-35.played{background:hsl(35,60%,50%);border-color:hsl(35,50%,40%)}
.viol-dot.hue-100.played{background:hsl(100,50%,45%);border-color:hsl(100,40%,35%)}
.viol-dot.hue-210.played{background:hsl(210,50%,55%);border-color:hsl(210,40%,40%)}
.viol-dot.hue-340.played{background:hsl(340,50%,45%);border-color:hsl(340,40%,35%)}

.viol-dot.current{transform:scale(1.4);border-width:3px}
.viol-dot.wrong{background:#8a3030;border-color:#8a3030}
.viol-dot.void-dot{border-color:rgba(100,60,160,0.5);border-style:dashed}
.viol-dot.void-dot.played{background:rgba(120,60,200,0.6);border-color:rgba(120,60,200,0.8)}

@media(max-width:600px){
  .viol-strings{height:200px;max-width:300px}
  .viol-title{font-size:1.1rem}
  .viol-string-label{font-size:0.7rem}
  .viol-string{min-width:50px}
}
@media(max-width:400px){
  .viol-strings{height:180px;max-width:270px}
  .viol-string{min-width:44px}
}
`;
    document.head.appendChild(style);
  },

  // --- INTRO SCREEN ---
  showIntro() {
    this.container.innerHTML = `
      <div class="viol-game">
        <div class="viol-title">\u2726 The Viol \u2726</div>
        <div class="viol-subtitle">A Lesson in Sound</div>
        <p class="viol-instruction">Zann lifts the old practice viol from the wardrobe and places it in your hands. It is heavier than you expected. He positions your fingers on the neck, adjusts your grip on the bow, and then \u2014 with the patience of a man who has waited thirty years for a student \u2014 he begins to teach.</p>
        <p class="viol-instruction">He will play a sequence of notes. Watch which strings light up and listen to the pitches. Then repeat the pattern by clicking or tapping the strings in the same order.</p>
        <p class="viol-instruction" style="font-size:0.85rem;opacity:0.7">Each string has its own colour. Take your time \u2014 there is no time limit.<br>Click or tap the strings, or press <strong>1\u20134</strong> on your keyboard.</p>
        <button class="viol-begin-btn" onclick="ViolGame.startRound()">Take Up the Viol</button>
      </div>`;
  },

  // --- BUILD THE INSTRUMENT UI ---
  buildInstrument() {
    let html = '<div class="viol-strings" id="viol-strings">';
    this.strings.forEach((s, i) => {
      html += `<div class="viol-string disabled" data-idx="${i}" data-hue="${s.hue}" id="viol-s${i}">
        <span class="viol-key-hint">${i + 1}</span>
        <span class="viol-string-label">${s.name}</span>
      </div>`;
    });
    html += '<div class="viol-void-note" id="viol-void"><span class="viol-void-label">?</span></div>';
    html += '</div>';
    return html;
  },

  // --- BUILD PROGRESS DOTS (colour-coded to match strings) ---
  buildProgress(round) {
    const notes = round.notes;
    let html = '<div class="viol-progress" id="viol-progress">';
    notes.forEach((n, i) => {
      let cls = 'viol-dot';
      if (n === -1) {
        cls += ' void-dot';
      } else {
        cls += ` hue-${this.strings[n].hue}`;
      }
      html += `<div class="${cls}" id="viol-dot-${i}"></div>`;
    });
    html += '</div>';
    return html;
  },

  // --- START A ROUND ---
  startRound() {
    const roundIdx = this.currentRound;
    const round = this.rounds[roundIdx];
    this.playerInput = [];
    this.inputActive = false;

    this.setAtmosphere(roundIdx);

    const narratives = [
      'Zann draws the bow across the strings. Three notes \u2014 simple, clear, human. He nods to you. <em>Your turn.</em>',
      'The sequence is longer now. Stranger. The harmonies do not resolve the way your ear expects. From the window, a faint sound \u2014 not quite a response, but an acknowledgement. <em>Something is listening.</em>',
      'Zann\u2019s hands move with desperate urgency. The notes are discordant, wild, and the final note \u2014 the final note comes from somewhere else. A frequency the viol should not be able to produce. The window rattles.'
    ];

    this.container.innerHTML = `
      <div class="viol-game">
        <div class="viol-round-label">Round ${roundIdx + 1} of 3</div>
        ${this.buildInstrument()}
        ${this.buildProgress(round)}
        <p class="viol-narrative" id="viol-narrative">${narratives[roundIdx]}</p>
        <p class="viol-instruction" id="viol-status">Watch and listen\u2026</p>
      </div>`;

    // Play Zann's sequence after a pause
    setTimeout(() => this.playSequence(round), 1200);
  },

  // --- PLAY ZANN'S DEMONSTRATION SEQUENCE ---
  playSequence(round) {
    const notes = round.notes;
    let i = 0;

    const playNext = () => {
      if (i >= notes.length) {
        // Sequence complete — enable player input after a clear pause
        setTimeout(() => this.enableInput(round), 800);
        return;
      }

      const noteIdx = notes[i];
      const dotEl = document.getElementById(`viol-dot-${i}`);
      if (dotEl) dotEl.classList.add('played');

      if (noteIdx === -1) {
        this.playVoidNote();
      } else {
        this.highlightString(noteIdx, round.tempo * 0.75);
        Audio.playViolNote(this.strings[noteIdx].pitch, round.tempo / 1000);
      }

      i++;
      setTimeout(playNext, round.tempo);
    };

    playNext();
  },

  // --- HIGHLIGHT A STRING ---
  highlightString(idx, duration) {
    const el = document.getElementById(`viol-s${idx}`);
    if (!el) return;
    el.classList.add('playing');
    setTimeout(() => el.classList.remove('playing'), duration || 500);
  },

  // --- PLAY THE VOID NOTE ---
  playVoidNote() {
    const voidEl = document.getElementById('viol-void');
    if (voidEl) {
      voidEl.classList.add('visible');
      setTimeout(() => voidEl.classList.remove('visible'), 1000);
    }

    Audio.playViolNote(this.voidPitch, 0.8);
    Audio.playVoidPulse();
    Audio.playWindowRattle();
  },

  // --- ENABLE PLAYER INPUT ---
  enableInput(round) {
    this.inputActive = true;
    this.playerInput = [];

    const statusEl = document.getElementById('viol-status');
    if (statusEl) statusEl.textContent = 'Your turn \u2014 play the sequence.';

    // Reset progress dots
    round.notes.forEach((_, i) => {
      const dot = document.getElementById(`viol-dot-${i}`);
      if (dot) { dot.classList.remove('played'); dot.classList.remove('wrong'); }
    });

    // Mark first dot as current
    const firstDot = document.getElementById('viol-dot-0');
    if (firstDot) firstDot.classList.add('current');

    // Enable string clicks
    this.strings.forEach((_, i) => {
      const el = document.getElementById(`viol-s${i}`);
      if (el) {
        el.classList.remove('disabled');
        el.onclick = () => this.onStringClick(i, round);
      }
    });

    // In round 3, the void note is clickable for the last position
    if (this.currentRound === 2) {
      const voidEl = document.getElementById('viol-void');
      if (voidEl) {
        voidEl.onclick = () => this.onStringClick(-1, round);
      }
    }

    // Keyboard support: 1-4 for strings, Space for void
    this._removeKeyHandler();
    this._keyHandler = (e) => {
      if (!this.inputActive) return;
      const key = e.key;
      if (key >= '1' && key <= '4') {
        e.preventDefault();
        this.onStringClick(parseInt(key) - 1, round);
      } else if (key === ' ' && this.currentRound === 2) {
        e.preventDefault();
        this.onStringClick(-1, round);
      }
    };
    document.addEventListener('keydown', this._keyHandler);
  },

  // --- REMOVE KEYBOARD HANDLER ---
  _removeKeyHandler() {
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
  },

  // --- HANDLE PLAYER INPUT ---
  onStringClick(stringIdx, round) {
    if (!this.inputActive) return;

    const pos = this.playerInput.length;
    const expected = round.notes[pos];
    const dotEl = document.getElementById(`viol-dot-${pos}`);

    // Play the note
    if (stringIdx === -1) {
      this.playVoidNote();
    } else {
      this.highlightString(stringIdx, 400);
      Audio.playViolNote(this.strings[stringIdx].pitch, 0.5);
    }

    if (stringIdx === expected) {
      // Correct
      this.playerInput.push(stringIdx);
      if (dotEl) { dotEl.classList.remove('current'); dotEl.classList.add('played'); }

      if (stringIdx >= 0) {
        const strEl = document.getElementById(`viol-s${stringIdx}`);
        if (strEl) {
          strEl.classList.add('correct');
          setTimeout(() => strEl.classList.remove('correct'), 350);
        }
      }

      // Check if round complete
      if (this.playerInput.length >= round.notes.length) {
        this.inputActive = false;
        this.score++;
        this.disableStrings();
        setTimeout(() => this.roundSuccess(), 600);
        return;
      }

      // Mark next dot
      const nextDot = document.getElementById(`viol-dot-${pos + 1}`);
      if (nextDot) nextDot.classList.add('current');

      // In round 3, show void hint when approaching the final note
      if (this.currentRound === 2 && pos + 1 === round.notes.length - 1) {
        const voidEl = document.getElementById('viol-void');
        if (voidEl) voidEl.classList.add('visible');
      }
    } else {
      // Wrong note
      this.inputActive = false;
      if (dotEl) { dotEl.classList.remove('current'); dotEl.classList.add('wrong'); }

      if (stringIdx >= 0) {
        const strEl = document.getElementById(`viol-s${stringIdx}`);
        if (strEl) {
          strEl.classList.add('wrong');
          setTimeout(() => strEl.classList.remove('wrong'), 600);
        }
      }

      this.disableStrings();
      setTimeout(() => this.roundFail(), 600);
    }
  },

  // --- DISABLE ALL STRINGS ---
  disableStrings() {
    this._removeKeyHandler();
    this.strings.forEach((_, i) => {
      const el = document.getElementById(`viol-s${i}`);
      if (el) { el.classList.add('disabled'); el.onclick = null; }
    });
    const voidEl = document.getElementById('viol-void');
    if (voidEl) { voidEl.classList.remove('visible'); voidEl.onclick = null; }
  },

  // --- ROUND SUCCESS ---
  roundSuccess() {
    const statusEl = document.getElementById('viol-status');
    const roundIdx = this.currentRound;

    const successTexts = [
      'The notes ring true. Zann nods \u2014 a small, approving inclination of the head. The viol accepts your touch.',
      'The sequence holds. The window\u2019s stirring subsides, just slightly. Zann\u2019s eyes widen with something that looks like hope.',
      'Impossible. You played the impossible note. The void answered, and the viol answered back, and for one vertiginous instant the barrier vibrated with the frequency of two players instead of one.'
    ];

    if (statusEl) {
      statusEl.innerHTML = `<span style="color:#3a5a1a">\u2726 Sequence matched \u2726</span>`;
    }

    const narrativeEl = document.getElementById('viol-narrative');
    if (narrativeEl) narrativeEl.innerHTML = successTexts[roundIdx];

    this.currentRound++;

    if (this.currentRound < this.rounds.length) {
      setTimeout(() => {
        if (statusEl) {
          statusEl.innerHTML = '<button class="viol-begin-btn" onclick="ViolGame.startRound()" style="font-size:0.75rem;padding:0.5em 1.5em">Next Round</button>';
        }
      }, 1200);
    } else {
      setTimeout(() => this.showResults(), 1500);
    }
  },

  // --- ROUND FAIL ---
  roundFail() {
    const statusEl = document.getElementById('viol-status');
    const roundIdx = this.currentRound;

    const failTexts = [
      'The wrong string. A discord that makes both you and Zann wince. He shakes his head \u2014 not in anger, but in the weary patience of a teacher who has all the time in the world. Which, of course, he does not.',
      'The sequence breaks. The harmony shatters into dissonance, and from the window comes a sound \u2014 not a rattle, but something deeper. A vibration. An acknowledgement of your failure.',
      'The impossible note defeats you. The void\u2019s frequency finds no answer in your hands. Zann reaches over and stills the strings. His expression is not disappointed \u2014 it is resigned. He did not truly expect anyone to play that note. He is not sure <em>he</em> can play it anymore.'
    ];

    if (statusEl) {
      statusEl.innerHTML = `<span style="color:#5a1a1a">\u2726 Sequence broken \u2726</span>`;
    }

    const narrativeEl = document.getElementById('viol-narrative');
    if (narrativeEl) narrativeEl.innerHTML = failTexts[roundIdx];

    this.currentRound++;

    if (this.currentRound < this.rounds.length) {
      setTimeout(() => {
        if (statusEl) {
          statusEl.innerHTML = '<button class="viol-begin-btn" onclick="ViolGame.startRound()" style="font-size:0.75rem;padding:0.5em 1.5em">Next Round</button>';
        }
      }, 1200);
    } else {
      setTimeout(() => this.showResults(), 1500);
    }
  },

  // --- SET ATMOSPHERE EFFECTS ---
  setAtmosphere(roundIdx) {
    let atmo = document.getElementById('viol-atmosphere');
    if (!atmo) {
      atmo = document.createElement('div');
      atmo.id = 'viol-atmosphere';
      atmo.className = 'viol-atmosphere';
      document.body.appendChild(atmo);
    }

    atmo.className = 'viol-atmosphere';
    if (roundIdx === 1) atmo.classList.add('round2');
    if (roundIdx === 2) atmo.classList.add('round3');
  },

  clearAtmosphere() {
    const atmo = document.getElementById('viol-atmosphere');
    if (atmo) atmo.remove();
  },

  // --- RESULTS SCREEN ---
  showResults() {
    this.clearAtmosphere();
    this._removeKeyHandler();

    // Apply state effects based on score
    if (typeof state !== 'undefined') {
      state.played_viol = (state.played_viol || 0) + 1;
      state.dread = (state.dread || 0) + 1;

      // Sanity cost scales with exposure — the further you go, the more it costs
      // Score 0: no cost (barely touched it), 1-2: -2, 3: -5 (the void note)
      if (this.score >= 1 && this.score <= 2) {
        state.sanity = (state.sanity || 0) - 2;
      } else if (this.score === 3) {
        state.sanity = (state.sanity || 0) - 5;
      }

      if (this.score >= 2) {
        state.zann_trust = (state.zann_trust || 0) + 1;
      }
      if (this.score === 3) {
        state.knowledge = (state.knowledge || 0) + 1;
      }
    }

    let resultClass, resultLabel, resultNarrative;

    if (this.score === 3) {
      resultClass = 'success';
      resultLabel = '\u2726 The Viol Accepts You \u2726';
      resultNarrative = `<p>You played. All three rounds \u2014 even the impossible note, the frequency from beyond the strings. The viol vibrated in your hands with a resonance that bypassed muscle and bone and spoke directly to whatever it is inside a human being that the void recognises as an adversary.</p>
<p>Zann is weeping. Silent tears \u2014 he has no voice for sobbing \u2014 running down the creased channels of his face into his beard. He grips your hand. The grip says what his voice cannot: <em>you are the first. In thirty years, you are the first.</em></p>
<p>The curtain over the window has gone still. For the first time since you entered this room, it is not moving. The void is listening. And what it hears, for the first time in three decades, is the sound of two players instead of one.</p>`;
    } else if (this.score >= 1) {
      resultClass = 'partial';
      resultLabel = '\u2726 A Beginning \u2726';
      resultNarrative = `<p>You played. Not perfectly \u2014 your fingers are wrong, your instincts untrained, the viol a foreign country beneath your hands. But you played, and the strings responded, and for the rounds you managed, the barrier between here and there hummed with a new voice.</p>
<p>Zann takes the viol from you gently. His expression is complicated \u2014 gratitude and worry mixed in equal measure. You have shown aptitude. Whether you have shown enough remains to be seen.</p>
<p>The curtain stirs. The window watches. But the void has heard you, and it knows there are two now, and that changes something. Even if neither of you can say exactly what.</p>`;
    } else {
      resultClass = 'failure';
      resultLabel = '\u2726 The Strings Resist \u2726';
      resultNarrative = `<p>The viol rejects you. Not with any malice, just the simple, physical certainty of an instrument that has been played by one pair of hands for thirty years and does not know how to respond to another. Every note is wrong. Every sequence breaks. The strings vibrate with confusion rather than music.</p>
<p>Zann takes the viol back. He does not look at you. His silence, always present, deepens into the resignation of a one who has placed his last hope on a bet and watched it fail.</p>
<p>But he does not despair. He has survived thirty years on the edge of the void. Despair is a luxury he abandoned long ago. He will try again. Tomorrow. The night after. For as long as there are nights remaining.</p>`;
    }

    this.container.innerHTML = `
      <div class="viol-game">
        <div class="viol-title">\u2726 The Viol \u2726</div>
        <div class="viol-result ${resultClass}"><strong>${resultLabel}</strong></div>
        <div style="text-align:left;padding:0 0.5em">${resultNarrative}</div>
      </div>`;

    if (this.onComplete) this.onComplete();
  }
};
