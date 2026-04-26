/* ============================================================
   Crispin's World — common.js
   Bahrain clock, Web Audio SFX + music, toast, confetti,
   Indian number utils, name prompt, top bar, sound menu.
   ============================================================ */

(function () {
  'use strict';

  // ---------- Global namespace ----------
  const App = window.App = window.App || {};

  // ---------- Path helper (so pages in subfolders can link to root)
  App.root = function () {
    const path = location.pathname;
    if (path.includes('/chapters/') || path.includes('/worksheets/')) return '../';
    return '';
  };

  // ---------- Bahrain clock ----------
  App.startBahrainClock = function (dateEl, timeEl) {
    const fmt = (opts) => new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Bahrain', ...opts });
    const tick = () => {
      const now = new Date();
      const d = fmt({ day: '2-digit', month: 'long', year: 'numeric' }).format(now);
      const t = fmt({ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now);
      if (dateEl) dateEl.textContent = d;
      if (timeEl) timeEl.textContent = t + ' · Bahrain';
    };
    tick();
    setInterval(tick, 1000);
  };

  // ---------- Date formatting (DD MMMM YYYY) ----------
  App.formatDateDMY = function (date) {
    const d = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Bahrain', day: '2-digit', month: 'long', year: 'numeric'
    }).format(d);
  };
  App.todayKey = function () {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bahrain' }).format(new Date());
  };

  // ---------- Greeting by time ----------
  App.greeting = function () {
    const h = parseInt(new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Bahrain', hour: '2-digit', hour12: false
    }).format(new Date()), 10);
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    if (h < 21) return 'Good evening';
    return 'Good night';
  };

  // ---------- Indian number formatting ----------
  App.formatIndian = function (n) {
    const s = String(Math.abs(Math.floor(n)));
    if (s.length <= 3) return (n < 0 ? '-' : '') + s;
    const last3 = s.slice(-3);
    const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return (n < 0 ? '-' : '') + rest + ',' + last3;
  };
  App.formatIntl = function (n) {
    return Math.floor(n).toLocaleString('en-US');
  };

  // ---------- Number to words (up to 99,999 for Grade 5) ----------
  const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
                'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
                'seventeen', 'eighteen', 'nineteen'];
  const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function under100(n) {
    if (n < 20) return ONES[n];
    const t = Math.floor(n / 10), r = n % 10;
    return TENS[t] + (r ? '-' + ONES[r] : '');
  }
  function under1000(n) {
    if (n < 100) return under100(n);
    const h = Math.floor(n / 100), r = n % 100;
    return ONES[h] + ' hundred' + (r ? ' and ' + under100(r) : '');
  }
  App.numberInWords = function (n) {
    n = Math.floor(n);
    if (n === 0) return 'zero';
    if (n < 1000) return under1000(n);
    if (n < 100000) {
      const th = Math.floor(n / 1000), r = n % 1000;
      return under1000(th) + ' thousand' + (r ? ' ' + under1000(r) : '');
    }
    // Grade 5 should not hit this in Chapter 1
    const lakh = Math.floor(n / 100000), r = n % 100000;
    return under1000(lakh) + ' lakh' + (r ? ' ' + App.numberInWords(r) : '');
  };

  // ---------- Roman numerals (I–XC range for Chapter 1) ----------
  const ROMAN_MAP = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  App.intToRoman = function (n) {
    let out = '', rem = Math.floor(n);
    for (const [v, s] of ROMAN_MAP) {
      while (rem >= v) { out += s; rem -= v; }
    }
    return out;
  };
  App.romanToInt = function (r) {
    const m = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let s = 0, prev = 0;
    for (let i = r.length - 1; i >= 0; i--) {
      const v = m[r[i].toUpperCase()];
      if (!v) return NaN;
      s += (v < prev) ? -v : v;
      prev = v;
    }
    return s;
  };

  // ---------- Expanded form ----------
  App.expandedForm = function (n) {
    const s = String(Math.floor(n));
    const parts = [];
    for (let i = 0; i < s.length; i++) {
      const digit = parseInt(s[i], 10);
      if (digit === 0) continue;
      const place = Math.pow(10, s.length - 1 - i);
      parts.push(digit * place);
    }
    return parts.join(' + ');
  };

  // ---------- Random helpers ----------
  App.randInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  App.shuffle = function (arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  App.seededRand = function (seed) {
    let s = 0;
    for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 0xffffffff;
    };
  };

  // ============================================================
  // AUDIO — Web Audio API (procedural, no files)
  // ============================================================
  const Audio = App.Audio = {
    ctx: null,
    sfxOn: false,
    musicOn: false,
    musicNode: null,
    prefsKey: 'crispin_sound_prefs',

    init() {
      try {
        const prefs = JSON.parse(localStorage.getItem(this.prefsKey) || '{"sfx":false,"music":false}');
        this.sfxOn = !!prefs.sfx;
        this.musicOn = !!prefs.music;
      } catch (_) {}
    },
    savePrefs() {
      localStorage.setItem(this.prefsKey, JSON.stringify({ sfx: this.sfxOn, music: this.musicOn }));
    },
    ensureCtx() {
      if (!this.ctx) {
        try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
        catch (_) { return null; }
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return this.ctx;
    },
    tone(freq, dur, type = 'sine', gain = 0.15, at = 0) {
      if (!this.sfxOn) return;
      const ctx = this.ensureCtx(); if (!ctx) return;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(gain, ctx.currentTime + at + 0.01);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + at + dur);
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + at);
      o.stop(ctx.currentTime + at + dur + 0.05);
    },
    playClick() { this.tone(700, 0.05, 'square', 0.1); },
    playCorrect() {
      this.tone(659, 0.12, 'sine', 0.15);
      this.tone(784, 0.16, 'sine', 0.15, 0.1);
      this.tone(988, 0.2, 'sine', 0.15, 0.2);
    },
    playWrong() {
      this.tone(220, 0.12, 'sawtooth', 0.12);
      this.tone(165, 0.22, 'sawtooth', 0.12, 0.1);
    },
    playLevelUp() {
      const notes = [523, 659, 784, 1047];
      notes.forEach((f, i) => this.tone(f, 0.2, 'sine', 0.18, i * 0.12));
    },
    playBadge() {
      this.tone(1319, 0.1, 'sine', 0.15);
      this.tone(1760, 0.14, 'sine', 0.15, 0.08);
    },
    playGoal() {
      // Ascending "SIIUUU!" style fanfare
      const notes = [392, 440, 494, 523, 587, 659, 784];
      notes.forEach((f, i) => this.tone(f, 0.25, 'sine', 0.18, i * 0.09));
    },
    playMiss() {
      this.tone(330, 0.3, 'sine', 0.12);
      this.tone(247, 0.4, 'sine', 0.12, 0.15);
    },
    /** Procedural crowd roar — band-pass filtered white noise that swells. */
    playCrowdRoar(duration = 1.8, intensity = 1) {
      if (!this.sfxOn) return;
      const ctx = this.ensureCtx(); if (!ctx) return;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource(); src.buffer = buffer;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 700; bp.Q.value = 0.8;
      const g = ctx.createGain();
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(0.25 * intensity, ctx.currentTime + 0.25);
      g.gain.linearRampToValueAtTime(0.35 * intensity, ctx.currentTime + duration * 0.5);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
      src.connect(bp).connect(g).connect(ctx.destination);
      src.start();
      src.stop(ctx.currentTime + duration + 0.05);
    },
    /** Short disappointed crowd "ohhhh" */
    playCrowdOh(duration = 1.2) {
      if (!this.sfxOn) return;
      const ctx = this.ensureCtx(); if (!ctx) return;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource(); src.buffer = buffer;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 450; bp.Q.value = 1;
      const g = ctx.createGain();
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.2);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
      src.connect(bp).connect(g).connect(ctx.destination);
      src.start();
      src.stop(ctx.currentTime + duration + 0.05);
    },
    /** Referee whistle — short piercing tone */
    playWhistle() {
      this.tone(2200, 0.08, 'sine', 0.08);
      this.tone(2400, 0.12, 'sine', 0.1, 0.06);
    },

    startMusic() {
      if (this.musicNode) return;
      const ctx = this.ensureCtx(); if (!ctx) return;
      const master = ctx.createGain();
      master.gain.value = 0.04;
      master.connect(ctx.destination);
      this.musicNode = master;
      // C major: C - Am - F - G (triads, sine pads)
      const progressions = [
        [261.63, 329.63, 392.00], // C E G
        [220.00, 261.63, 329.63], // A C E
        [174.61, 220.00, 261.63], // F A C
        [196.00, 246.94, 293.66]  // G B D
      ];
      let idx = 0;
      const tick = () => {
        if (!this.musicOn) return;
        const chord = progressions[idx % 4];
        const dur = 2.0;
        chord.forEach(f => {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.type = 'sine'; o.frequency.value = f;
          g.gain.value = 0;
          g.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.3);
          g.gain.linearRampToValueAtTime(0, ctx.currentTime + dur);
          o.connect(g).connect(master);
          o.start(ctx.currentTime);
          o.stop(ctx.currentTime + dur + 0.1);
        });
        idx++;
        this.musicTimer = setTimeout(tick, dur * 1000);
      };
      tick();
    },
    stopMusic() {
      if (this.musicTimer) clearTimeout(this.musicTimer);
      if (this.musicNode) {
        try { this.musicNode.disconnect(); } catch (_) {}
        this.musicNode = null;
      }
    },
    toggleSfx(on) { this.sfxOn = on; this.savePrefs(); if (on) this.playClick(); },
    toggleMusic(on) {
      this.musicOn = on; this.savePrefs();
      if (on) this.startMusic(); else this.stopMusic();
    }
  };
  Audio.init();

  // ============================================================
  // TOAST
  // ============================================================
  function ensureToastZone() {
    let z = document.querySelector('.toast-zone');
    if (!z) {
      z = document.createElement('div');
      z.className = 'toast-zone';
      document.body.appendChild(z);
    }
    return z;
  }
  App.showToast = function (msg, type = 'info', duration = 3500) {
    const z = ensureToastZone();
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.innerHTML = msg;
    z.appendChild(t);
    setTimeout(() => {
      t.classList.add('leaving');
      setTimeout(() => t.remove(), 320);
    }, duration);
  };

  // ============================================================
  // CONFETTI
  // ============================================================
  App.launchConfetti = function (count = 60) {
    const colors = ['#6B21A8', '#FACC15', '#14B8A6', '#FB7185', '#16A34A', '#A855F7'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = 2 + Math.random() * 2 + 's';
      p.style.animationDelay = Math.random() * 0.5 + 's';
      p.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 4500);
    }
  };

  // ============================================================
  // MODALS
  // ============================================================
  App.openModal = function (contentHtml, opts = {}) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = '<div class="modal ' + (opts.cls || '') + '">' + contentHtml + '</div>';
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    if (opts.closeOnBackdrop !== false) {
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    }
    overlay.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
    return { overlay, close };
  };

  // ============================================================
  // NAME PROMPT (first visit)
  // ============================================================
  App.getProfile = function () {
    try { return JSON.parse(localStorage.getItem('crispin_profile') || 'null'); }
    catch (_) { return null; }
  };
  App.saveProfile = function (p) {
    localStorage.setItem('crispin_profile', JSON.stringify(p));
  };
  App.askName = function (callback) {
    const existing = App.getProfile();
    if (existing && existing.name) { callback(existing); return; }
    const html = `
      <h2 class="modal__title">⚽ Welcome to Crispin's World!</h2>
      <div class="modal__body">
        <p style="text-align:center;">Hey there! What should we call you while you visit?</p>
        <input type="text" class="name-input" id="visitor-name" placeholder="Your name" maxlength="30" autocomplete="off" />
        <p class="muted" style="text-align:center; font-size:0.85rem;">We save this only on your device so the site can say hi.</p>
      </div>
      <div class="modal__footer">
        <button class="btn btn-primary" id="visitor-name-go">Let's go!</button>
      </div>
    `;
    const { close } = App.openModal(html, { cls: '', closeOnBackdrop: false });
    const input = document.getElementById('visitor-name');
    const go = () => {
      const name = (input.value || '').trim() || 'Friend';
      const profile = { name, firstVisit: App.todayKey() };
      App.saveProfile(profile);
      close();
      Audio.playCorrect();
      App.showToast(`Hi ${name}! 👋 Make yourself at home.`, 'success');
      if (callback) callback(profile);
    };
    input.focus();
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
    document.getElementById('visitor-name-go').addEventListener('click', go);
  };

  // ============================================================
  // TOP BAR renderer (insertion into any page)
  // ============================================================
  App.renderTopBar = function (current) {
    const root = App.root();
    const topbar = document.createElement('header');
    topbar.className = 'topbar';
    topbar.innerHTML = `
      <a href="${root}index.html" class="topbar__brand">
        <span class="topbar__ball" aria-hidden="true">⚽</span>
        <span>Crispin's World</span>
      </a>
      <nav class="topbar__nav" aria-label="Main">
        <a href="${root}index.html" ${current === 'home' ? 'class="active"' : ''}>Home</a>
        <a href="${root}learning.html" ${current === 'learning' ? 'class="active"' : ''}>Learning</a>
        <a href="${root}maths.html" ${current === 'maths' ? 'class="active"' : ''}>Maths</a>
        <a href="${root}exam.html" ${current === 'exam' ? 'class="active"' : ''} style="background:rgba(220,38,38,0.4);">📝 Exam</a>
        <a href="${root}fun.html" ${current === 'fun' ? 'class="active"' : ''}>Fun Zone</a>
      </nav>
      <div class="topbar__clock" aria-live="polite" aria-label="Bahrain time">
        <span class="clock__date" id="clock-date">—</span>
        <span class="clock__time" id="clock-time">—</span>
      </div>
      <button class="topbar__sound" id="sound-btn" aria-label="Sound options" title="Sound options">🔊</button>
    `;
    document.body.insertBefore(topbar, document.body.firstChild);

    App.startBahrainClock(document.getElementById('clock-date'), document.getElementById('clock-time'));

    // Sound menu
    const menu = document.createElement('div');
    menu.className = 'sound-menu';
    menu.innerHTML = `
      <h3 class="sound-menu__title">🔊 Sound Options</h3>
      <div class="sound-row">
        <span>Sound effects</span>
        <div class="toggle ${Audio.sfxOn ? 'on' : ''}" id="toggle-sfx" role="switch" aria-checked="${Audio.sfxOn}"></div>
      </div>
      <div class="sound-row">
        <span>Background music</span>
        <div class="toggle ${Audio.musicOn ? 'on' : ''}" id="toggle-music" role="switch" aria-checked="${Audio.musicOn}"></div>
      </div>
      <p class="muted" style="margin-top:8px; font-size:0.8rem;">Both are OFF by default. Your choice is remembered on this device.</p>
    `;
    document.body.appendChild(menu);

    const btn = document.getElementById('sound-btn');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
      Audio.ensureCtx(); // unlock audio on user gesture
    });
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && e.target !== btn) menu.classList.remove('open');
    });

    document.getElementById('toggle-sfx').addEventListener('click', function () {
      const on = !this.classList.contains('on');
      this.classList.toggle('on', on);
      this.setAttribute('aria-checked', on);
      Audio.toggleSfx(on);
    });
    document.getElementById('toggle-music').addEventListener('click', function () {
      const on = !this.classList.contains('on');
      this.classList.toggle('on', on);
      this.setAttribute('aria-checked', on);
      Audio.toggleMusic(on);
    });

    // Auto-start music if user previously enabled it (after first gesture)
    document.addEventListener('click', function once() {
      if (Audio.musicOn) Audio.startMusic();
      document.removeEventListener('click', once);
    }, { once: true });
  };

  // ============================================================
  // CR7 / Ronaldo motivational quotes
  // ============================================================
  App.CR7_QUOTES = [
    { text: "Your love makes me strong, your hate makes me unstoppable.", who: "Cristiano Ronaldo" },
    { text: "Talent without working hard is nothing.", who: "Cristiano Ronaldo" },
    { text: "Dedication, hard work all the time, and belief.", who: "Cristiano Ronaldo" },
    { text: "I'm living a dream I never want to wake up from.", who: "Cristiano Ronaldo" },
    { text: "Maybe I'm not the best, but I'm close to it.", who: "Cristiano Ronaldo" },
    { text: "The more difficult the victory, the greater the happiness in winning.", who: "Pelé" },
    { text: "To win, you have to believe you can do it.", who: "Sir Alex Ferguson" },
    { text: "Small details make big differences.", who: "Cristiano Ronaldo" },
    { text: "Without football, my life is worth nothing.", who: "Cristiano Ronaldo" },
    { text: "If you don't believe you are the best, then you will never achieve all that you are capable of.", who: "Cristiano Ronaldo" }
  ];
  App.renderCR7Rotator = function (container) {
    if (!container) return;
    let i = App.randInt(0, App.CR7_QUOTES.length - 1);
    const render = () => {
      const q = App.CR7_QUOTES[i];
      container.innerHTML = `
        <span class="hero__cr7-jersey" aria-hidden="true">7</span>
        <div>“${q.text}” <span class="muted" style="font-style:normal; font-weight:700;">— ${q.who}</span></div>
      `;
      i = (i + 1) % App.CR7_QUOTES.length;
    };
    render();
    setInterval(render, 8000);
  };

  // ============================================================
  // Lesson accordion wiring (shared)
  // ============================================================
  App.wireLessons = function (root = document) {
    root.querySelectorAll('.lesson').forEach((lesson) => {
      const header = lesson.querySelector('.lesson__header');
      if (!header) return;
      header.addEventListener('click', () => {
        const opening = !lesson.classList.contains('open');
        lesson.classList.toggle('open');
        if (opening) {
          Audio.playClick();
          // Reward XP for opening a lesson (first time per session)
          const sessionKey = 'lesson_opened_' + (lesson.dataset.lesson || lesson.id || 'x');
          if (!sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, '1');
            if (window.Progress) window.Progress.addXP(5, 'Opened a lesson');
          }
        }
      });
    });
  };

  // ============================================================
  // Tabs wiring
  // ============================================================
  App.wireTabs = function (containerSel = '.tabs', panelSel = '.tab-panel') {
    const container = document.querySelector(containerSel);
    if (!container) return;
    const btns = container.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll(panelSel);
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        btns.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(p => p.classList.toggle('active', p.id === target));
        Audio.playClick();
        // Scroll tabs into view on mobile
        window.scrollTo({ top: container.offsetTop - 80, behavior: 'smooth' });
      });
    });
  };

  // Export helpers
  App.Audio = Audio;
})();
