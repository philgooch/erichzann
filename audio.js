// ============================================================
// THE MUSIC OF ERICH ZANN — Audio Engine
// All ambience synthesised via Web Audio API.
// Supports optional layered .mp3/.ogg via scene.audio property.
// ============================================================
const Audio = {
  ctx: null,
  masterGain: null,
  currentNodes: [],
  muted: false,
  initialized: false,

  // Music layer (native <audio> elements for .mp3/.ogg files)
  musicTracks: {},
  musicVolume: 0.4,
  fadeDuration: 2.0,

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.ctx.destination);
      this.initialized = true;
      document.getElementById('audio-toggle').classList.add('visible');
    } catch(e) { console.log('Web Audio not available'); }
  },

  toggle() {
    this.muted = !this.muted;
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.muted ? 0 : 0.3, this.ctx.currentTime, 0.3);
    }
    for (const t of Object.values(this.musicTracks)) {
      if (t.el) t.el.volume = this.muted ? 0 : t.targetVolume;
    }
    document.getElementById('audio-toggle').textContent = this.muted ? '\u266A\u0338' : '\u266A';
  },

  stopAll() {
    this.currentNodes.forEach(n => {
      try {
        if (n.stop) n.stop();
        else if (n.disconnect) n.disconnect();
      } catch(e) {}
    });
    this.currentNodes = [];
    this._cleanupAllMusic();
  },

  createNoise(duration) {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * (duration || 2);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  },

  // Play ambience by name
  playAmbience(name) {
    if (!this.initialized) return;
    this.currentNodes.forEach(n => {
      try { if (n.stop) n.stop(); else if (n.disconnect) n.disconnect(); } catch(e) {}
    });
    this.currentNodes = [];
    if (name && typeof this['amb_' + name] === 'function') {
      this['amb_' + name]();
    }
  },

  // --- MUSIC LAYER (for optional .mp3/.ogg files) ---
  playMusic(track) {
    if (!this.initialized) return;
    if (track === null) { this.stopMusic(); return; }
    const requested = this._normaliseTrackList(track);
    const requestedNames = new Set(requested.map(t => t.src));
    const currentNames = new Set(Object.keys(this.musicTracks));
    for (const name of currentNames) {
      if (!requestedNames.has(name)) this._fadeOutTrack(name);
    }
    for (const t of requested) {
      if (!currentNames.has(t.src)) {
        this._fadeInTrack(t.src, t.volume, t.loop);
      }
    }
  },

  layerMusic(track) {
    if (!this.initialized) return;
    if (track === null) return;
    const requested = this._normaliseTrackList(track);
    for (const t of requested) {
      if (!this.musicTracks[t.src]) {
        this._fadeInTrack(t.src, t.volume, t.loop);
      }
    }
  },

  stopMusic() {
    for (const name of Object.keys(this.musicTracks)) {
      this._fadeOutTrack(name);
    }
  },

  _normaliseTrackList(track) {
    if (!Array.isArray(track)) track = [track];
    return track.map(t => {
      if (typeof t === 'string') return { src: t, volume: this.musicVolume, loop: true };
      return { src: t.src, volume: t.volume !== undefined ? t.volume : this.musicVolume, loop: t.loop !== undefined ? t.loop : true };
    });
  },

  _fadeInTrack(src, volume, loop) {
    try {
      const el = new window.Audio('audio/' + src);
      el.loop = !!loop;
      el.volume = 0;
      const targetVol = Math.min(1, volume);
      this.musicTracks[src] = { el, targetVolume: targetVol };
      el.play().then(() => {
        const start = performance.now();
        const dur = this.fadeDuration * 1000;
        const fade = () => {
          const t = this.musicTracks[src];
          if (!t || t.el !== el) return;
          const p = Math.min(1, (performance.now() - start) / dur);
          el.volume = this.muted ? 0 : targetVol * p;
          if (p < 1) requestAnimationFrame(fade);
        };
        requestAnimationFrame(fade);
      }).catch(() => {});
    } catch(e) {}
  },

  _fadeOutTrack(name) {
    const t = this.musicTracks[name];
    if (!t) return;
    delete this.musicTracks[name];
    const el = t.el;
    const startVol = el.volume;
    const start = performance.now();
    const dur = this.fadeDuration * 1000;
    const fade = () => {
      const p = Math.min(1, (performance.now() - start) / dur);
      el.volume = Math.max(0, startVol * (1 - p));
      if (p < 1) { requestAnimationFrame(fade); }
      else { el.pause(); el.src = ''; }
    };
    requestAnimationFrame(fade);
  },

  _cleanupAllMusic() {
    for (const [name, t] of Object.entries(this.musicTracks)) {
      try { t.el.pause(); t.el.src = ''; } catch(e) {}
    }
    this.musicTracks = {};
  },


  // ========================================================
  // AMBIENCE: STREET
  // The Rue d'Auseil at dusk — steep, narrow, cobblestoned.
  // Wind funnelling through a canyon of old buildings, distant
  // footsteps, creaking signs, the sense of a city that doesn't
  // quite belong.
  // ========================================================
  amb_street() {
    const ctx = this.ctx;
    const nodes = [];

    // --- Wind through narrow streets ---
    // Two noise layers, heavily filtered, with slow LFO for gusting
    const wind = ctx.createBufferSource();
    wind.buffer = this.createNoise(4); wind.loop = true;
    const windLp = ctx.createBiquadFilter();
    windLp.type = 'lowpass'; windLp.frequency.value = 600;
    const windG = ctx.createGain(); windG.gain.value = 0.06;
    wind.connect(windLp); windLp.connect(windG); windG.connect(this.masterGain);
    wind.start(); nodes.push(wind);

    // Wind gusts — LFO modulating the filter cutoff
    const gustLfo = ctx.createOscillator();
    gustLfo.frequency.value = 0.15;
    const gustDepth = ctx.createGain();
    gustDepth.gain.value = 300;
    gustLfo.connect(gustDepth); gustDepth.connect(windLp.frequency);
    gustLfo.start(); nodes.push(gustLfo);

    // Higher whistling wind layer (funnelling effect)
    const whistle = ctx.createBufferSource();
    whistle.buffer = this.createNoise(3); whistle.loop = true;
    const whistleBp = ctx.createBiquadFilter();
    whistleBp.type = 'bandpass'; whistleBp.frequency.value = 1800; whistleBp.Q.value = 8;
    const whistleG = ctx.createGain(); whistleG.gain.value = 0.012;
    whistle.connect(whistleBp); whistleBp.connect(whistleG); whistleG.connect(this.masterGain);
    whistle.start(); nodes.push(whistle);

    // Whistle frequency wanders
    const whistleLfo = ctx.createOscillator();
    whistleLfo.frequency.value = 0.08;
    const whistleLfoG = ctx.createGain();
    whistleLfoG.gain.value = 400;
    whistleLfo.connect(whistleLfoG); whistleLfoG.connect(whistleBp.frequency);
    whistleLfo.start(); nodes.push(whistleLfo);

    // --- Distant footsteps on cobblestones ---
    const stepN = ctx.createBufferSource();
    stepN.buffer = this.createNoise(2); stepN.loop = true;
    const stepBp = ctx.createBiquadFilter();
    stepBp.type = 'bandpass'; stepBp.frequency.value = 500; stepBp.Q.value = 2;
    const stepG = ctx.createGain(); stepG.gain.value = 0;
    stepN.connect(stepBp); stepBp.connect(stepG); stepG.connect(this.masterGain);
    stepN.start(); nodes.push(stepN);

    const scheduleSteps = () => {
      const count = 4 + Math.floor(Math.random() * 8);
      const pace = 0.38 + Math.random() * 0.2;
      const vol = 0.008 + Math.random() * 0.008;
      for (let i = 0; i < count; i++) {
        const t = ctx.currentTime + 0.5 + i * pace;
        stepBp.frequency.setValueAtTime(350 + Math.random() * 400, t);
        stepG.gain.setValueAtTime(0, t);
        stepG.gain.linearRampToValueAtTime(vol, t + 0.006);
        stepG.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      }
      setTimeout(scheduleSteps, (count * pace + 4 + Math.random() * 10) * 1000);
    };
    scheduleSteps();

    // --- Creaking sign ---
    const creak = ctx.createOscillator();
    creak.type = 'sine'; creak.frequency.value = 350;
    const creakG = ctx.createGain(); creakG.gain.value = 0;
    const creakBp = ctx.createBiquadFilter();
    creakBp.type = 'bandpass'; creakBp.frequency.value = 380; creakBp.Q.value = 14;
    creak.connect(creakBp); creakBp.connect(creakG); creakG.connect(this.masterGain);
    creak.start(); nodes.push(creak);

    const scheduleCreak = () => {
      const t = ctx.currentTime + Math.random() * 5 + 3;
      const baseFreq = 300 + Math.random() * 120;
      creak.frequency.setValueAtTime(baseFreq, t);
      creak.frequency.linearRampToValueAtTime(baseFreq + 50, t + 0.15);
      creak.frequency.linearRampToValueAtTime(baseFreq - 25, t + 0.35);
      creakG.gain.setValueAtTime(0, t);
      creakG.gain.linearRampToValueAtTime(0.018, t + 0.04);
      creakG.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      setTimeout(scheduleCreak, (Math.random() * 5 + 3) * 1000);
    };
    scheduleCreak();

    // --- Distant bell (single, far away) ---
    const bell = ctx.createOscillator();
    bell.type = 'sine'; bell.frequency.value = 196;
    const bellH = ctx.createOscillator();
    bellH.type = 'sine'; bellH.frequency.value = 392;
    const bellG = ctx.createGain(); bellG.gain.value = 0;
    const bellHG = ctx.createGain(); bellHG.gain.value = 0;
    const bellLp = ctx.createBiquadFilter();
    bellLp.type = 'lowpass'; bellLp.frequency.value = 350;
    bell.connect(bellLp); bellLp.connect(bellG); bellG.connect(this.masterGain);
    bellH.connect(bellHG); bellHG.connect(bellLp);
    bell.start(); bellH.start(); nodes.push(bell, bellH);

    const scheduleBell = () => {
      const t = ctx.currentTime + Math.random() * 25 + 10;
      const tolls = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < tolls; i++) {
        const tt = t + i * 2.8;
        bellG.gain.setValueAtTime(0, tt);
        bellG.gain.linearRampToValueAtTime(0.035, tt + 0.02);
        bellG.gain.exponentialRampToValueAtTime(0.001, tt + 3);
        bellHG.gain.setValueAtTime(0, tt);
        bellHG.gain.linearRampToValueAtTime(0.015, tt + 0.01);
        bellHG.gain.exponentialRampToValueAtTime(0.001, tt + 1.5);
      }
      setTimeout(scheduleBell, (Math.random() * 25 + 10) * 1000);
    };
    scheduleBell();

    this.currentNodes.push(...nodes);
  },


  // ========================================================
  // AMBIENCE: BOARDING HOUSE
  // Interior of Blandot's house — creaking timber, muffled
  // sounds from other tenants, dripping, the sense of an old
  // building settling around you.
  // ========================================================
  amb_boarding_house() {
    const ctx = this.ctx;
    const nodes = [];

    // --- Room tone: very low noise, muffled ---
    const room = ctx.createBufferSource();
    room.buffer = this.createNoise(3); room.loop = true;
    const roomLp = ctx.createBiquadFilter();
    roomLp.type = 'lowpass'; roomLp.frequency.value = 180;
    const roomG = ctx.createGain(); roomG.gain.value = 0.06;
    room.connect(roomLp); roomLp.connect(roomG); roomG.connect(this.masterGain);
    room.start(); nodes.push(room);

    // --- Floorboard creaks ---
    const creak = ctx.createOscillator();
    creak.type = 'sine'; creak.frequency.value = 120;
    const creakG = ctx.createGain(); creakG.gain.value = 0;
    creak.connect(creakG); creakG.connect(this.masterGain);
    creak.start(); nodes.push(creak);

    const scheduleCreak = () => {
      const t = ctx.currentTime + Math.random() * 6 + 3;
      const f = 90 + Math.random() * 80;
      creak.frequency.setValueAtTime(f, t);
      creak.frequency.linearRampToValueAtTime(f + 30 + Math.random() * 30, t + 0.2);
      creakG.gain.setValueAtTime(0, t);
      creakG.gain.linearRampToValueAtTime(0.02 + Math.random() * 0.01, t + 0.06);
      creakG.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      setTimeout(scheduleCreak, (Math.random() * 6 + 3) * 1000);
    };
    scheduleCreak();

    // --- Dripping water ---
    const drip = ctx.createOscillator();
    drip.type = 'sine'; drip.frequency.value = 2800;
    const dripG = ctx.createGain(); dripG.gain.value = 0;
    const dripLp = ctx.createBiquadFilter();
    dripLp.type = 'lowpass'; dripLp.frequency.value = 3500;
    drip.connect(dripLp); dripLp.connect(dripG); dripG.connect(this.masterGain);
    drip.start(); nodes.push(drip);

    const scheduleDrip = () => {
      const t = ctx.currentTime + Math.random() * 4 + 2;
      const f = 2400 + Math.random() * 800;
      drip.frequency.setValueAtTime(f, t);
      drip.frequency.exponentialRampToValueAtTime(f * 0.6, t + 0.12);
      dripG.gain.setValueAtTime(0, t);
      dripG.gain.linearRampToValueAtTime(0.025, t + 0.008);
      dripG.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      setTimeout(scheduleDrip, (Math.random() * 4 + 2) * 1000);
    };
    scheduleDrip();

    // --- Muffled voices (very distant, unintelligible) ---
    // Bandpassed noise with slow modulation suggests speech rhythm
    const voice = ctx.createBufferSource();
    voice.buffer = this.createNoise(4); voice.loop = true;
    const voiceBp = ctx.createBiquadFilter();
    voiceBp.type = 'bandpass'; voiceBp.frequency.value = 300; voiceBp.Q.value = 6;
    const voiceG = ctx.createGain(); voiceG.gain.value = 0;
    voice.connect(voiceBp); voiceBp.connect(voiceG); voiceG.connect(this.masterGain);
    voice.start(); nodes.push(voice);

    const scheduleVoice = () => {
      const t = ctx.currentTime + Math.random() * 8 + 5;
      const syllables = 3 + Math.floor(Math.random() * 5);
      const rate = 0.2 + Math.random() * 0.15;
      for (let i = 0; i < syllables; i++) {
        const ts = t + i * rate;
        voiceBp.frequency.setValueAtTime(250 + Math.random() * 200, ts);
        voiceG.gain.setValueAtTime(0, ts);
        voiceG.gain.linearRampToValueAtTime(0.008 + Math.random() * 0.006, ts + 0.04);
        voiceG.gain.exponentialRampToValueAtTime(0.001, ts + rate * 0.8);
      }
      setTimeout(scheduleVoice, (Math.random() * 8 + 5) * 1000);
    };
    scheduleVoice();

    // --- Timber settling ---
    const settle = ctx.createOscillator();
    settle.type = 'sawtooth'; settle.frequency.value = 50;
    const settleLp = ctx.createBiquadFilter();
    settleLp.type = 'lowpass'; settleLp.frequency.value = 100;
    const settleG = ctx.createGain(); settleG.gain.value = 0;
    settle.connect(settleLp); settleLp.connect(settleG); settleG.connect(this.masterGain);
    settle.start(); nodes.push(settle);

    const scheduleSettle = () => {
      const t = ctx.currentTime + Math.random() * 12 + 8;
      settle.frequency.setValueAtTime(40 + Math.random() * 30, t);
      settleG.gain.setValueAtTime(0, t);
      settleG.gain.linearRampToValueAtTime(0.025, t + 0.02);
      settleG.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
      setTimeout(scheduleSettle, (Math.random() * 12 + 8) * 1000);
    };
    scheduleSettle();

    this.currentNodes.push(...nodes);
  },


  // ========================================================
  // AMBIENCE: GARRET
  // Zann's room when quiet — oppressive silence, the window
  // a presence, occasional distant sounds from below.
  // Very minimal: the absence of sound is the point.
  // ========================================================
  amb_garret() {
    const ctx = this.ctx;
    const nodes = [];

    // --- Near-silence room tone ---
    const room = ctx.createBufferSource();
    room.buffer = this.createNoise(3); room.loop = true;
    const roomLp = ctx.createBiquadFilter();
    roomLp.type = 'lowpass'; roomLp.frequency.value = 150;
    const roomG = ctx.createGain(); roomG.gain.value = 0.04;
    room.connect(roomLp); roomLp.connect(roomG); roomG.connect(this.masterGain);
    room.start(); nodes.push(room);

    // --- Faint wind at the window ---
    const wind = ctx.createBufferSource();
    wind.buffer = this.createNoise(4); wind.loop = true;
    const windBp = ctx.createBiquadFilter();
    windBp.type = 'bandpass'; windBp.frequency.value = 800; windBp.Q.value = 4;
    const windG = ctx.createGain(); windG.gain.value = 0.008;
    wind.connect(windBp); windBp.connect(windG); windG.connect(this.masterGain);
    wind.start(); nodes.push(wind);

    // Slow waver on the wind
    const windLfo = ctx.createOscillator();
    windLfo.frequency.value = 0.1;
    const windLfoG = ctx.createGain();
    windLfoG.gain.value = 200;
    windLfo.connect(windLfoG); windLfoG.connect(windBp.frequency);
    windLfo.start(); nodes.push(windLfo);

    // --- Window rattle — very occasional ---
    const rattle = ctx.createBufferSource();
    rattle.buffer = this.createNoise(1); rattle.loop = true;
    const rattleBp = ctx.createBiquadFilter();
    rattleBp.type = 'bandpass'; rattleBp.frequency.value = 2000; rattleBp.Q.value = 5;
    const rattleG = ctx.createGain(); rattleG.gain.value = 0;
    rattle.connect(rattleBp); rattleBp.connect(rattleG); rattleG.connect(this.masterGain);
    rattle.start(); nodes.push(rattle);

    const scheduleRattle = () => {
      const t = ctx.currentTime + Math.random() * 10 + 8;
      const bursts = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < bursts; i++) {
        const tt = t + i * 0.08;
        rattleBp.frequency.setValueAtTime(1500 + Math.random() * 1500, tt);
        rattleG.gain.setValueAtTime(0, tt);
        rattleG.gain.linearRampToValueAtTime(0.015 + Math.random() * 0.01, tt + 0.004);
        rattleG.gain.exponentialRampToValueAtTime(0.001, tt + 0.06);
      }
      setTimeout(scheduleRattle, (Math.random() * 10 + 8) * 1000);
    };
    scheduleRattle();

    // --- Single distant creak from below ---
    const creak = ctx.createOscillator();
    creak.type = 'sine'; creak.frequency.value = 100;
    const creakG = ctx.createGain(); creakG.gain.value = 0;
    const creakLp = ctx.createBiquadFilter();
    creakLp.type = 'lowpass'; creakLp.frequency.value = 200;
    creak.connect(creakLp); creakLp.connect(creakG); creakG.connect(this.masterGain);
    creak.start(); nodes.push(creak);

    const scheduleCreak = () => {
      const t = ctx.currentTime + Math.random() * 12 + 6;
      creak.frequency.setValueAtTime(80 + Math.random() * 50, t);
      creakG.gain.setValueAtTime(0, t);
      creakG.gain.linearRampToValueAtTime(0.012, t + 0.08);
      creakG.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      setTimeout(scheduleCreak, (Math.random() * 12 + 6) * 1000);
    };
    scheduleCreak();

    this.currentNodes.push(...nodes);
  },


  // ========================================================
  // AMBIENCE: GARRET MUSIC
  // Zann playing the viol — eerie, not melodic. Synthesised
  // bowed-string tones with unsettling harmonics.
  // ========================================================
  amb_garret_music() {
    const ctx = this.ctx;
    const nodes = [];

    // Start with garret base (room tone + window wind)
    this.amb_garret();

    // --- Viol drone: sawtooth through resonant filter = bowed string ---
    const viol1 = ctx.createOscillator();
    viol1.type = 'sawtooth'; viol1.frequency.value = 196; // G3
    const viol1Lp = ctx.createBiquadFilter();
    viol1Lp.type = 'lowpass'; viol1Lp.frequency.value = 800;
    const viol1G = ctx.createGain(); viol1G.gain.value = 0.025;
    viol1.connect(viol1Lp); viol1Lp.connect(viol1G); viol1G.connect(this.masterGain);
    viol1.start(); nodes.push(viol1);

    // Slow pitch waver — bowing imprecision
    const violLfo = ctx.createOscillator();
    violLfo.frequency.value = 4.5;
    const violLfoG = ctx.createGain();
    violLfoG.gain.value = 2.5;
    violLfo.connect(violLfoG); violLfoG.connect(viol1.frequency);
    violLfo.start(); nodes.push(violLfo);

    // Second string — a dissonant fifth, slightly flat
    const viol2 = ctx.createOscillator();
    viol2.type = 'sawtooth'; viol2.frequency.value = 290; // ~D4 flat
    const viol2Lp = ctx.createBiquadFilter();
    viol2Lp.type = 'lowpass'; viol2Lp.frequency.value = 700;
    const viol2G = ctx.createGain(); viol2G.gain.value = 0.018;
    viol2.connect(viol2Lp); viol2Lp.connect(viol2G); viol2G.connect(this.masterGain);
    viol2.start(); nodes.push(viol2);

    // --- Bow scrape texture: filtered noise ---
    const bow = ctx.createBufferSource();
    bow.buffer = this.createNoise(3); bow.loop = true;
    const bowBp = ctx.createBiquadFilter();
    bowBp.type = 'bandpass'; bowBp.frequency.value = 2500; bowBp.Q.value = 3;
    const bowG = ctx.createGain(); bowG.gain.value = 0.008;
    bow.connect(bowBp); bowBp.connect(bowG); bowG.connect(this.masterGain);
    bow.start(); nodes.push(bow);

    // --- Melodic fragments: scheduled pitch changes ---
    const melody = ctx.createOscillator();
    melody.type = 'sawtooth'; melody.frequency.value = 392;
    const melLp = ctx.createBiquadFilter();
    melLp.type = 'lowpass'; melLp.frequency.value = 900;
    const melG = ctx.createGain(); melG.gain.value = 0;
    melody.connect(melLp); melLp.connect(melG); melG.connect(this.masterGain);
    melody.start(); nodes.push(melody);

    // Eerie note sequences — not quite any recognisable scale
    // const eerieNotes = [330, 370, 415, 294, 500, 277, 466, 350, 520, 247];
//     const schedulePhrase = () => {
//       const noteCount = 2 + Math.floor(Math.random() * 4);
//       const t0 = ctx.currentTime + 0.3;
//       const dur = 0.4 + Math.random() * 0.3;
//       for (let i = 0; i < noteCount; i++) {
//         const t = t0 + i * dur;
//         const note = eerieNotes[Math.floor(Math.random() * eerieNotes.length)];
//         melody.frequency.setValueAtTime(note, t);
//         melG.gain.setValueAtTime(0, t);
//         melG.gain.linearRampToValueAtTime(0.02 + Math.random() * 0.01, t + 0.06);
//         melG.gain.setValueAtTime(0.015, t + dur * 0.6);
//         melG.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.95);
//       }
//       setTimeout(schedulePhrase, (noteCount * dur + 2 + Math.random() * 4) * 1000);
//     };
//     schedulePhrase();

    // --- Unsettling high harmonic (appears and disappears) ---
    const harmonic = ctx.createOscillator();
    harmonic.type = 'sine'; harmonic.frequency.value = 3520;
    const harmG = ctx.createGain(); harmG.gain.value = 0;
    harmonic.connect(harmG); harmG.connect(this.masterGain);
    harmonic.start(); nodes.push(harmonic);

    const scheduleHarmonic = () => {
      const t = ctx.currentTime + Math.random() * 8 + 4;
      const f = 2800 + Math.random() * 1500;
      harmonic.frequency.setValueAtTime(f, t);
      harmG.gain.setValueAtTime(0, t);
      harmG.gain.linearRampToValueAtTime(0.005 + Math.random() * 0.004, t + 1);
      harmG.gain.exponentialRampToValueAtTime(0.001, t + 3 + Math.random() * 2);
      setTimeout(scheduleHarmonic, (Math.random() * 8 + 4) * 1000);
    };
    scheduleHarmonic();

    this.currentNodes.push(...nodes);
  },


  // ========================================================
  // AMBIENCE: NIGHT
  // The boarding house at night — deep quiet, occasional
  // distant sounds, the weight of darkness.
  // ========================================================
  amb_night() {
    const ctx = this.ctx;
    const nodes = [];

    // --- Deep silence (very low noise floor) ---
    const silence = ctx.createBufferSource();
    silence.buffer = this.createNoise(4); silence.loop = true;
    const silLp = ctx.createBiquadFilter();
    silLp.type = 'lowpass'; silLp.frequency.value = 120;
    const silG = ctx.createGain(); silG.gain.value = 0.05;
    silence.connect(silLp); silLp.connect(silG); silG.connect(this.masterGain);
    silence.start(); nodes.push(silence);

    // --- Very distant wind ---
    const wind = ctx.createBufferSource();
    wind.buffer = this.createNoise(3); wind.loop = true;
    const windLp = ctx.createBiquadFilter();
    windLp.type = 'lowpass'; windLp.frequency.value = 300;
    const windG = ctx.createGain(); windG.gain.value = 0.02;
    wind.connect(windLp); windLp.connect(windG); windG.connect(this.masterGain);
    wind.start(); nodes.push(wind);

    // --- Distant bell (single toll, very rare) ---
    const bell = ctx.createOscillator();
    bell.type = 'sine'; bell.frequency.value = 180;
    const bellG = ctx.createGain(); bellG.gain.value = 0;
    const bellLp = ctx.createBiquadFilter();
    bellLp.type = 'lowpass'; bellLp.frequency.value = 280;
    bell.connect(bellLp); bellLp.connect(bellG); bellG.connect(this.masterGain);
    bell.start(); nodes.push(bell);

    const scheduleBell = () => {
      const t = ctx.currentTime + Math.random() * 30 + 15;
      bellG.gain.setValueAtTime(0, t);
      bellG.gain.linearRampToValueAtTime(0.025, t + 0.02);
      bellG.gain.exponentialRampToValueAtTime(0.001, t + 4);
      setTimeout(scheduleBell, (Math.random() * 30 + 15) * 1000);
    };
    scheduleBell();

    // --- Occasional creak (building settling) ---
    const creak = ctx.createOscillator();
    creak.type = 'sine'; creak.frequency.value = 100;
    const creakG = ctx.createGain(); creakG.gain.value = 0;
    creak.connect(creakG); creakG.connect(this.masterGain);
    creak.start(); nodes.push(creak);

    const scheduleCreak = () => {
      const t = ctx.currentTime + Math.random() * 10 + 5;
      creak.frequency.setValueAtTime(85 + Math.random() * 60, t);
      creakG.gain.setValueAtTime(0, t);
      creakG.gain.linearRampToValueAtTime(0.01, t + 0.1);
      creakG.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
      setTimeout(scheduleCreak, (Math.random() * 10 + 5) * 1000);
    };
    scheduleCreak();

    this.currentNodes.push(...nodes);
  },


  // ========================================================
  // AMBIENCE: VOID
  // What lies beyond the window — the absence of everything
  // recognisable. Deep sub-bass, otherworldly harmonics, the
  // sense of vast emptiness that is somehow alive.
  // ========================================================
  amb_void() {
    const ctx = this.ctx;
    const nodes = [];

    // --- Sub-bass drone: below hearing, felt in the chest ---
    const sub = ctx.createOscillator();
    sub.type = 'sine'; sub.frequency.value = 28;
    const subG = ctx.createGain(); subG.gain.value = 0.08;
    sub.connect(subG); subG.connect(this.masterGain);
    sub.start(); nodes.push(sub);

    // Slow throb
    const subLfo = ctx.createOscillator();
    subLfo.frequency.value = 0.06;
    const subLfoG = ctx.createGain();
    subLfoG.gain.value = 0.04;
    subLfo.connect(subLfoG); subLfoG.connect(subG.gain);
    subLfo.start(); nodes.push(subLfo);

    // --- Harmonic overtones: wrong intervals ---
    // Not musical — the ratios are irrational, unsettling
    const h1 = ctx.createOscillator();
    h1.type = 'sine'; h1.frequency.value = 73.4; // not a true harmonic
    const h1G = ctx.createGain(); h1G.gain.value = 0.02;
    h1.connect(h1G); h1G.connect(this.masterGain);
    h1.start(); nodes.push(h1);

    const h2 = ctx.createOscillator();
    h2.type = 'sine'; h2.frequency.value = 117.3;
    const h2G = ctx.createGain(); h2G.gain.value = 0.015;
    h2.connect(h2G); h2G.connect(this.masterGain);
    h2.start(); nodes.push(h2);

    const h3 = ctx.createOscillator();
    h3.type = 'sine'; h3.frequency.value = 163.8;
    const h3G = ctx.createGain(); h3G.gain.value = 0.01;
    h3.connect(h3G); h3G.connect(this.masterGain);
    h3.start(); nodes.push(h3);

    // Very slow drift on the harmonics
    const driftLfo = ctx.createOscillator();
    driftLfo.frequency.value = 0.02;
    const driftG = ctx.createGain();
    driftG.gain.value = 3;
    driftLfo.connect(driftG);
    driftG.connect(h1.frequency);
    driftG.connect(h2.frequency);
    driftG.connect(h3.frequency);
    driftLfo.start(); nodes.push(driftLfo);

    // --- Void breath: noise that swells and recedes ---
    const breath = ctx.createBufferSource();
    breath.buffer = this.createNoise(5); breath.loop = true;
    const breathLp = ctx.createBiquadFilter();
    breathLp.type = 'lowpass'; breathLp.frequency.value = 200;
    const breathG = ctx.createGain(); breathG.gain.value = 0.04;
    breath.connect(breathLp); breathLp.connect(breathG); breathG.connect(this.masterGain);
    breath.start(); nodes.push(breath);

    const breathLfo = ctx.createOscillator();
    breathLfo.frequency.value = 0.08;
    const breathLfoG = ctx.createGain();
    breathLfoG.gain.value = 80;
    breathLfo.connect(breathLfoG); breathLfoG.connect(breathLp.frequency);
    breathLfo.start(); nodes.push(breathLfo);

    // --- Distant impossible sounds ---
    // Brief tones at weird frequencies, as if hearing through a membrane
    const alien = ctx.createOscillator();
    alien.type = 'triangle'; alien.frequency.value = 500;
    const alienG = ctx.createGain(); alienG.gain.value = 0;
    const alienLp = ctx.createBiquadFilter();
    alienLp.type = 'lowpass'; alienLp.frequency.value = 600;
    alien.connect(alienLp); alienLp.connect(alienG); alienG.connect(this.masterGain);
    alien.start(); nodes.push(alien);

    const scheduleAlien = () => {
      const t = ctx.currentTime + Math.random() * 6 + 3;
      const f = 200 + Math.random() * 800;
      alien.frequency.setValueAtTime(f, t);
      alien.frequency.linearRampToValueAtTime(f * (0.8 + Math.random() * 0.4), t + 1.5);
      alienG.gain.setValueAtTime(0, t);
      alienG.gain.linearRampToValueAtTime(0.006 + Math.random() * 0.005, t + 0.5);
      alienG.gain.exponentialRampToValueAtTime(0.001, t + 2 + Math.random() * 1.5);
      setTimeout(scheduleAlien, (Math.random() * 6 + 3) * 1000);
    };
    scheduleAlien();

    this.currentNodes.push(...nodes);
  },


  // ========================================================
  // AMBIENCE: STORM
  // The final night — unnatural wind, building chaos, the
  // boundary between worlds thinning.
  // ========================================================
  amb_storm() {
    const ctx = this.ctx;
    const nodes = [];

    // --- Violent wind (layered, heavy filtering) ---
    const wind1 = ctx.createBufferSource();
    wind1.buffer = this.createNoise(5); wind1.loop = true;
    const wind1Lp = ctx.createBiquadFilter();
    wind1Lp.type = 'lowpass'; wind1Lp.frequency.value = 800;
    const wind1G = ctx.createGain(); wind1G.gain.value = 0.1;
    wind1.connect(wind1Lp); wind1Lp.connect(wind1G); wind1G.connect(this.masterGain);
    wind1.start(); nodes.push(wind1);

    const gustLfo = ctx.createOscillator();
    gustLfo.frequency.value = 0.25;
    const gustD = ctx.createGain();
    gustD.gain.value = 400;
    gustLfo.connect(gustD); gustD.connect(wind1Lp.frequency);
    gustLfo.start(); nodes.push(gustLfo);

    // High shrieking wind
    const shriek = ctx.createBufferSource();
    shriek.buffer = this.createNoise(3); shriek.loop = true;
    const shriekBp = ctx.createBiquadFilter();
    shriekBp.type = 'bandpass'; shriekBp.frequency.value = 2500; shriekBp.Q.value = 6;
    const shriekG = ctx.createGain(); shriekG.gain.value = 0.025;
    shriek.connect(shriekBp); shriekBp.connect(shriekG); shriekG.connect(this.masterGain);
    shriek.start(); nodes.push(shriek);

    const shriekLfo = ctx.createOscillator();
    shriekLfo.frequency.value = 0.12;
    const shriekLfoG = ctx.createGain();
    shriekLfoG.gain.value = 800;
    shriekLfo.connect(shriekLfoG); shriekLfoG.connect(shriekBp.frequency);
    shriekLfo.start(); nodes.push(shriekLfo);

    // --- Window slamming ---
    const slam = ctx.createBufferSource();
    slam.buffer = this.createNoise(1); slam.loop = true;
    const slamBp = ctx.createBiquadFilter();
    slamBp.type = 'bandpass'; slamBp.frequency.value = 400; slamBp.Q.value = 2;
    const slamG = ctx.createGain(); slamG.gain.value = 0;
    slam.connect(slamBp); slamBp.connect(slamG); slamG.connect(this.masterGain);
    slam.start(); nodes.push(slam);

    const scheduleSlam = () => {
      const t = ctx.currentTime + Math.random() * 5 + 2;
      slamBp.frequency.setValueAtTime(200 + Math.random() * 400, t);
      slamG.gain.setValueAtTime(0, t);
      slamG.gain.linearRampToValueAtTime(0.06 + Math.random() * 0.04, t + 0.005);
      slamG.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      // Rattle after slam
      const t2 = t + 0.15;
      for (let i = 0; i < 3; i++) {
        const tr = t2 + i * 0.06;
        slamG.gain.linearRampToValueAtTime(0.02, tr + 0.003);
        slamG.gain.exponentialRampToValueAtTime(0.001, tr + 0.05);
      }
      setTimeout(scheduleSlam, (Math.random() * 5 + 2) * 1000);
    };
    scheduleSlam();

    // --- Sub-bass rumble (the building groaning) ---
    const rumble = ctx.createOscillator();
    rumble.type = 'sawtooth'; rumble.frequency.value = 35;
    const rumbleLp = ctx.createBiquadFilter();
    rumbleLp.type = 'lowpass'; rumbleLp.frequency.value = 80;
    const rumbleG = ctx.createGain(); rumbleG.gain.value = 0.06;
    rumble.connect(rumbleLp); rumbleLp.connect(rumbleG); rumbleG.connect(this.masterGain);
    rumble.start(); nodes.push(rumble);

    // --- Void bleeding through: fragments of amb_void ---
    const voidH = ctx.createOscillator();
    voidH.type = 'sine'; voidH.frequency.value = 73.4;
    const voidHG = ctx.createGain(); voidHG.gain.value = 0;
    voidH.connect(voidHG); voidHG.connect(this.masterGain);
    voidH.start(); nodes.push(voidH);

    const scheduleVoidBleed = () => {
      const t = ctx.currentTime + Math.random() * 6 + 3;
      const f = 60 + Math.random() * 120;
      voidH.frequency.setValueAtTime(f, t);
      voidHG.gain.setValueAtTime(0, t);
      voidHG.gain.linearRampToValueAtTime(0.015 + Math.random() * 0.01, t + 0.8);
      voidHG.gain.exponentialRampToValueAtTime(0.001, t + 3);
      setTimeout(scheduleVoidBleed, (Math.random() * 6 + 3) * 1000);
    };
    scheduleVoidBleed();

    this.currentNodes.push(...nodes);
  },


  // ========================================================
  // AMBIENCE: RUE VANISHING
  // The street dissolving — sounds fading in reverse order,
  // increasing silence, one final distant note.
  // ========================================================
  amb_rue_vanishing() {
    const ctx = this.ctx;
    const nodes = [];

    // --- Receding footsteps (your own, running) ---
    const steps = ctx.createBufferSource();
    steps.buffer = this.createNoise(2); steps.loop = true;
    const stepsBp = ctx.createBiquadFilter();
    stepsBp.type = 'bandpass'; stepsBp.frequency.value = 500; stepsBp.Q.value = 2;
    const stepsG = ctx.createGain(); stepsG.gain.value = 0.015;
    steps.connect(stepsBp); stepsBp.connect(stepsG); stepsG.connect(this.masterGain);
    steps.start(); nodes.push(steps);

    // Fade the steps away over time
    stepsG.gain.setValueAtTime(0.015, ctx.currentTime);
    stepsG.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 20);

    // --- Wind dying ---
    const wind = ctx.createBufferSource();
    wind.buffer = this.createNoise(4); wind.loop = true;
    const windLp = ctx.createBiquadFilter();
    windLp.type = 'lowpass'; windLp.frequency.value = 500;
    const windG = ctx.createGain(); windG.gain.value = 0.04;
    wind.connect(windLp); windLp.connect(windG); windG.connect(this.masterGain);
    wind.start(); nodes.push(wind);

    windG.gain.setValueAtTime(0.04, ctx.currentTime);
    windG.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 25);

    // --- A single, lingering viol note that fades very slowly ---
    const lastNote = ctx.createOscillator();
    lastNote.type = 'sawtooth'; lastNote.frequency.value = 196;
    const lastLp = ctx.createBiquadFilter();
    lastLp.type = 'lowpass'; lastLp.frequency.value = 500;
    const lastG = ctx.createGain(); lastG.gain.value = 0.02;
    lastNote.connect(lastLp); lastLp.connect(lastG); lastG.connect(this.masterGain);
    lastNote.start(); nodes.push(lastNote);

    lastG.gain.setValueAtTime(0.02, ctx.currentTime);
    lastG.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 30);

    // Filter closes slowly — the note becomes more and more muffled
    lastLp.frequency.setValueAtTime(500, ctx.currentTime);
    lastLp.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 30);

    this.currentNodes.push(...nodes);
  },


  // ========================================================
  // UI SOUND EFFECTS
  // ========================================================

  playPageTurn() {
    if (!this.initialized || this.muted) return;
    const ctx = this.ctx;
    const noise = ctx.createBufferSource();
    noise.buffer = this.createNoise(0.3);
    const hpf = ctx.createBiquadFilter();
    hpf.type = 'highpass'; hpf.frequency.value = 2000;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    noise.connect(hpf); hpf.connect(gain); gain.connect(this.masterGain);
    noise.start(); noise.stop(ctx.currentTime + 0.2);
  },

  playDiceRoll() {
    if (!this.initialized || this.muted) return;
    const ctx = this.ctx;
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const n = ctx.createBufferSource();
        n.buffer = this.createNoise(0.1);
        const bpf = ctx.createBiquadFilter();
        bpf.type = 'bandpass'; bpf.frequency.value = 1500 + Math.random() * 2000; bpf.Q.value = 5;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.12, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        n.connect(bpf); bpf.connect(g); g.connect(this.masterGain);
        n.start(); n.stop(ctx.currentTime + 0.1);
      }, i * 120);
    }
  },

  playTypeClick() {
    if (!this.initialized || this.muted) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = 1200 + Math.random() * 600;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.015, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);
    osc.connect(g); g.connect(this.masterGain);
    osc.start(); osc.stop(ctx.currentTime + 0.02);
  },

  // --- Viol note (for mini-game) ---
  playViolNote(pitch, duration) {
    if (!this.initialized || this.muted) return;
    const ctx = this.ctx;
    const dur = duration || 0.6;

    // Sawtooth through lowpass = bowed string character
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth'; osc.frequency.value = pitch;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = pitch * 3;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
    g.gain.setValueAtTime(0.05, ctx.currentTime + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

    // Slight vibrato
    const vib = ctx.createOscillator();
    vib.frequency.value = 5;
    const vibG = ctx.createGain();
    vibG.gain.value = 3;
    vib.connect(vibG); vibG.connect(osc.frequency);

    osc.connect(lp); lp.connect(g); g.connect(this.masterGain);
    osc.start(); vib.start();
    osc.stop(ctx.currentTime + dur + 0.1);
    vib.stop(ctx.currentTime + dur + 0.1);
  },

  // --- Window rattle (triggered effect) ---
  playWindowRattle() {
    if (!this.initialized || this.muted) return;
    const ctx = this.ctx;
    const n = ctx.createBufferSource();
    n.buffer = this.createNoise(0.5);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 2000; bp.Q.value = 4;
    const g = ctx.createGain();
    n.connect(bp); bp.connect(g); g.connect(this.masterGain);
    n.start();

    // Rapid bursts
    for (let i = 0; i < 5; i++) {
      const t = ctx.currentTime + i * 0.06;
      bp.frequency.setValueAtTime(1500 + Math.random() * 1500, t);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.04, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    }
    n.stop(ctx.currentTime + 0.5);
  },

  // --- Void pulse (deep, stomach-turning sub-bass throb) ---
  playVoidPulse() {
    if (!this.initialized || this.muted) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.value = 30;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
    osc.connect(g); g.connect(this.masterGain);
    osc.start(); osc.stop(ctx.currentTime + 2.5);
  }
};
