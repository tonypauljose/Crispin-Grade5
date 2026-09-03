/* ============================================================
   HALF-YEARLY HQ — util.js
   Sound, speech, confetti, toasts. Self-contained: the app works
   even if the host site's common.js never loads.
   ============================================================ */
(function () {
  'use strict';
  const HY = window.HY = window.HY || {};

  /* ---------------- sound ---------------- */
  const SKEY = 'crispin_hy_sound';
  const sfx = HY.sfx = {
    on: (function () { try { return localStorage.getItem(SKEY) !== 'off'; } catch (_) { return true; } })(),
    ctx: null,
    setOn: function (v) { this.on = !!v; try { localStorage.setItem(SKEY, v ? 'on' : 'off'); } catch (_) {} },
    _ctx: function () {
      if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { return null; } }
      if (this.ctx.state === 'suspended') { try { this.ctx.resume(); } catch (_) {} }
      return this.ctx;
    },
    _t: function (freq, dur, type, gain, at) {
      if (!this.on) return;
      const ctx = this._ctx(); if (!ctx) return;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type || 'sine'; o.frequency.value = freq;
      const t0 = ctx.currentTime + (at || 0);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(gain || 0.12, t0 + 0.012);
      g.gain.linearRampToValueAtTime(0, t0 + dur);
      o.connect(g).connect(ctx.destination);
      o.start(t0); o.stop(t0 + dur + 0.04);
    },
    tap:   function () { this._t(620, 0.045, 'square', 0.05); },
    ok:    function () { this._t(659, 0.10, 'sine', 0.12); this._t(880, 0.14, 'sine', 0.12, 0.08); },
    no:    function () { this._t(200, 0.14, 'sine', 0.09); this._t(150, 0.18, 'sine', 0.08, 0.1); },
    win:   function () { [523, 659, 784, 1047].forEach(function (f, i) { sfx._t(f, 0.22, 'sine', 0.14, i * 0.1); }); },
    badge: function () { this._t(1319, 0.1, 'sine', 0.12); this._t(1760, 0.16, 'sine', 0.12, 0.08); }
  };

  /* ---------------- speech (English + Hindi) ---------------- */
  let hiVoice = null, enVoice = null;
  function pickVoice(lang) {
    const voices = (window.speechSynthesis && window.speechSynthesis.getVoices()) || [];
    if (!voices.length) return null;
    if (/^hi/i.test(lang)) {
      if (hiVoice) return hiVoice;
      const hi = voices.filter(function (v) { return /^hi/i.test(v.lang || ''); });
      hiVoice = hi[0] || null;
      return hiVoice;
    }
    if (enVoice) return enVoice;
    const en = voices.filter(function (v) { return /^en[-_](GB|IN|US)/i.test(v.lang || ''); });
    enVoice = en[0] || voices[0] || null;
    return enVoice;
  }

  HY.speech = {
    say: function (text, lang) {
      if (!('speechSynthesis' in window)) return;
      try { window.speechSynthesis.cancel(); } catch (_) {}
      const plain = String(text).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const fire = function () {
        const u = new SpeechSynthesisUtterance(plain);
        u.lang = lang || 'en-GB';
        u.rate = /^hi/i.test(u.lang) ? 0.78 : 0.95;
        const v = pickVoice(u.lang); if (v) u.voice = v;
        try { window.speechSynthesis.speak(u); } catch (_) {}
      };
      if (!window.speechSynthesis.getVoices().length) {
        window.speechSynthesis.addEventListener('voiceschanged', fire, { once: true });
        setTimeout(fire, 350);
      } else fire();
    },
    stop: function () { try { window.speechSynthesis.cancel(); } catch (_) {} }
  };

  /* ---------------- confetti ---------------- */
  HY.confetti = function (n) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    n = n || 60;
    const colors = ['#7C3AED', '#14B8A6', '#FBBF24', '#F472B6', '#34D399'];
    for (let i = 0; i < n; i++) {
      const p = document.createElement('div');
      p.className = 'hy-confetti';
      p.style.left = (Math.random() * 100) + 'vw';
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
      p.style.animationDelay = (Math.random() * 0.35) + 's';
      document.body.appendChild(p);
      (function (e) { setTimeout(function () { e.remove(); }, 4000); })(p);
    }
  };

  /* ---------------- toast ---------------- */
  HY.toast = function (msg, kind, ms) {
    let zone = document.querySelector('.hy-toasts');
    if (!zone) {
      zone = document.createElement('div');
      zone.className = 'hy-toasts';
      document.body.appendChild(zone);
    }
    const t = document.createElement('div');
    t.className = 'hy-toast' + (kind ? ' hy-toast--' + kind : '');
    t.innerHTML = msg;
    zone.appendChild(t);
    setTimeout(function () { t.classList.add('is-out'); setTimeout(function () { t.remove(); }, 300); }, ms || 2400);
  };

  /* ---------------- modal ---------------- */
  HY.modal = function (html, opts) {
    opts = opts || {};
    const back = document.createElement('div');
    back.className = 'hy-modalback';
    back.innerHTML = '<div class="hy-modal' + (opts.cls ? ' ' + opts.cls : '') + '" role="dialog" aria-modal="true">' + html + '</div>';
    document.body.appendChild(back);
    const close = function () { back.remove(); };
    back.addEventListener('click', function (e) {
      if (e.target === back && opts.backdropClose !== false) close();
      if (e.target.hasAttribute && e.target.hasAttribute('data-close')) close();
    });
    back.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', close); });
    return { el: back, close: close };
  };

  /* ---------------- misc ---------------- */
  HY.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  HY.shuffle = function (a) {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = r[i]; r[i] = r[j]; r[j] = t; }
    return r;
  };
})();
