/* ============================================================
   Crispin's World — hindi.js
   Web Speech API helpers + word-tooltip + flashcard mechanics
   ============================================================ */
(function () {
  'use strict';

  const Hindi = window.Hindi = {};

  // ── Web Speech API: speak Hindi text ──────────────────────
  // Crispin's laptop (Windows 11) ships with Microsoft Hemant / Kalpana.
  // Modern Chrome on macOS and Android has hi-IN voices too.
  // If no Hindi voice is installed, we fall back to whatever the OS
  // provides and surface a friendly note via the `tts-warning` banner.

  let voicesCache = null;
  let warnedNoVoice = false;

  function loadVoices() {
    if (voicesCache && voicesCache.length) return voicesCache;
    if (!window.speechSynthesis) return [];
    voicesCache = speechSynthesis.getVoices();
    return voicesCache;
  }

  // Voices load asynchronously in some browsers
  if (window.speechSynthesis) {
    speechSynthesis.onvoiceschanged = () => { voicesCache = speechSynthesis.getVoices(); };
  }

  function pickHindiVoice() {
    const voices = loadVoices();
    // Prefer hi-IN, then any voice whose name contains "Hindi" or "Hemant"
    return voices.find(v => v.lang === 'hi-IN')
        || voices.find(v => /hindi|hemant|kalpana|swara|aditi/i.test(v.name))
        || null;
  }

  Hindi.hasVoice = function () {
    return !!pickHindiVoice();
  };

  Hindi.speak = function (text, opts = {}) {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voice = pickHindiVoice();
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    } else {
      u.lang = 'hi-IN';
      if (!warnedNoVoice) {
        warnedNoVoice = true;
        console.warn('No Hindi voice installed — speech will use the system fallback.');
      }
    }
    u.rate  = opts.rate  || 0.85;
    u.pitch = opts.pitch || 1.0;
    u.volume = opts.volume || 1.0;
    if (opts.onstart) u.onstart = opts.onstart;
    if (opts.onend)   u.onend   = opts.onend;
    if (opts.onerror) u.onerror = opts.onerror;
    speechSynthesis.speak(u);
    return u;
  };

  Hindi.stop = function () {
    if (window.speechSynthesis) speechSynthesis.cancel();
  };

  // Show a TTS warning banner inside `host` when no Hindi voice exists
  Hindi.checkVoiceAndWarn = function (host) {
    if (!host) return;
    // Voices may not be ready yet — wait briefly
    setTimeout(() => {
      if (!Hindi.hasVoice()) {
        host.innerHTML = `
          <div class="tts-warning">
            <strong>📢 Heads-up:</strong> No Hindi voice was found on this device, so speak buttons
            will use the system default voice (which may sound robotic). On Windows, install
            "Microsoft Hemant" via Settings → Time &amp; Language → Speech → Add a voice → हिंदी.
            On macOS / iOS, enable a Hindi voice in System Settings → Accessibility → Spoken Content.
          </div>
        `;
      }
    }, 400);
  };

  // ── Speak button helper: wires any [data-speak] element ───
  // Usage: <button class="hin-speak" data-speak="नमस्ते">🔊</button>
  Hindi.wireSpeakButtons = function (root) {
    root = root || document;
    root.querySelectorAll('[data-speak]').forEach(btn => {
      if (btn._wiredSpeak) return;
      btn._wiredSpeak = true;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.dataset.speak;
        if (!text) return;
        btn.classList.add('speaking');
        Hindi.speak(text, {
          onend:   () => btn.classList.remove('speaking'),
          onerror: () => btn.classList.remove('speaking'),
        });
      });
    });
  };

  // ── Tappable word → tooltip with translation ──────────────
  // Usage: <span class="hin-word" data-tr="namaste" data-en="hello">नमस्ते</span>
  let activeTooltip = null;
  function ensureTooltip() {
    if (activeTooltip) return activeTooltip;
    activeTooltip = document.createElement('div');
    activeTooltip.className = 'hin-tooltip';
    document.body.appendChild(activeTooltip);
    return activeTooltip;
  }
  function placeTooltip(el, tip) {
    const r = el.getBoundingClientRect();
    tip.style.left = Math.max(8, r.left + (r.width / 2) - 140) + 'px';
    tip.style.top  = (r.bottom + 8) + 'px';
  }
  Hindi.wireWords = function (root) {
    root = root || document;
    const tip = ensureTooltip();
    let current = null;
    function showFor(el) {
      const hi = el.textContent.trim();
      const tr = el.dataset.tr || '';
      const en = el.dataset.en || '';
      tip.innerHTML = `
        <span class="hin-tooltip__hi">${hi}</span>
        ${tr ? `<span class="hin-tooltip__tr">/${tr}/</span>` : ''}
        ${en ? `<span class="hin-tooltip__en">${en}</span>` : ''}
      `;
      placeTooltip(el, tip);
      tip.classList.add('show');
      el.classList.add('glossed');
    }
    function hide() {
      tip.classList.remove('show');
      if (current) current.classList.remove('glossed');
      current = null;
    }
    root.querySelectorAll('.hin-word').forEach(w => {
      if (w._wiredWord) return;
      w._wiredWord = true;
      w.addEventListener('mouseenter', () => { current = w; showFor(w); });
      w.addEventListener('mouseleave', hide);
      // Click also speaks the word
      w.addEventListener('click', () => {
        Hindi.speak(w.textContent.trim());
        if (!tip.classList.contains('show')) {
          current = w;
          showFor(w);
          setTimeout(hide, 2500);
        }
      });
    });
    document.addEventListener('scroll', hide, { passive: true });
  };

  // ── Read a poem stanza by stanza, highlighting current line ──
  Hindi.speakStanza = function (lines, opts = {}) {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const onLine = opts.onLine || (() => {});
    const onDone = opts.onDone || (() => {});
    let i = 0;
    function next() {
      if (i >= lines.length) { onDone(); return; }
      const line = lines[i];
      onLine(i, line);
      Hindi.speak(line, {
        rate: opts.rate || 0.8,
        onend: () => { i += 1; next(); },
        onerror: () => { i += 1; next(); },
      });
    }
    next();
  };

  // ── Reveal toggles for poem English translation, Q&A, etc ──
  Hindi.wireToggles = function (root) {
    root = root || document;
    root.querySelectorAll('[data-toggle-target]').forEach(btn => {
      if (btn._wiredToggle) return;
      btn._wiredToggle = true;
      btn.addEventListener('click', () => {
        const target = document.querySelector(btn.dataset.toggleTarget);
        if (!target) return;
        const showing = target.classList.toggle('show');
        if (btn.dataset.labelHide && btn.dataset.labelShow) {
          btn.textContent = showing ? btn.dataset.labelHide : btn.dataset.labelShow;
        }
      });
    });
  };

  // Auto-wire on every page that loads this script
  document.addEventListener('DOMContentLoaded', () => {
    Hindi.wireSpeakButtons(document);
    Hindi.wireWords(document);
    Hindi.wireToggles(document);
  });
})();
