/* ============================================================
   HALF-YEARLY HQ — widgets-lang.js
   Interactive apparatus for English and Hindi.

   Same contract as the maths widgets: exploration, not testing.
   Nothing here is marked. It exists so that the rule is
   *discovered* before it is practised.
   ============================================================ */
(function () {
  'use strict';

  const HY = window.HY = window.HY || {};
  const W = HY.widgets = HY.widgets || {};

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function tap() { HY.sfx && HY.sfx.tap(); }
  function ok() { HY.sfx && HY.sfx.ok(); }
  function say(t, lang) { HY.speech && HY.speech.say(t, lang || 'en-GB'); }
  function statusBar(host, text) {
    const s = el('div', 'hw-status', text || '');
    host.appendChild(s);
    return { set: function (t, k) { s.innerHTML = t; s.className = 'hw-status' + (k ? ' is-' + k : ''); } };
  }

  /* ============================================================
     TENSE TIMELINE
     One verb, six boxes. Tap a box and the sentence rewrites
     itself. The pattern (helping verb + main verb) becomes
     visible instead of being memorised.
     ============================================================ */
  W.tenseTimeline = function (host, opts) {
    let onDone = function () {}, seen = {};
    const VERBS = (opts && opts.verbs) || [
      { base: 'play', s: 'plays', past: 'played', ing: 'playing', obj: 'football' },
      { base: 'write', s: 'writes', past: 'wrote', ing: 'writing', obj: 'a letter' },
      { base: 'eat', s: 'eats', past: 'ate', ing: 'eating', obj: 'a mango' },
      { base: 'run', s: 'runs', past: 'ran', ing: 'running', obj: 'in the park' },
      { base: 'go', s: 'goes', past: 'went', ing: 'going', obj: 'to school' }
    ];
    let vi = 0, subject = 'He';

    host.appendChild(el('p', 'hw-intro',
      'Pick a verb, then tap any box. Watch how the verb changes for each tense — and notice the <strong>helping verb</strong> ' +
      'that appears in the continuous row.'));

    const ctrl = el('div', 'hw-row hw-row--wrap');
    ctrl.innerHTML = '<span class="hw-label">Verb</span>';
    const sel = el('select', 'hw-select');
    VERBS.forEach(function (v, i) { sel.appendChild(new Option(v.base, i)); });
    ctrl.appendChild(sel);
    ctrl.appendChild(el('span', 'hw-label', 'Subject'));
    const sub = el('select', 'hw-select');
    ['He', 'They', 'I'].forEach(function (s) { sub.appendChild(new Option(s, s)); });
    ctrl.appendChild(sub);
    host.appendChild(ctrl);

    const grid = el('div', 'hw-tense');
    host.appendChild(grid);
    const out = el('div', 'hw-sentence');
    host.appendChild(out);
    const st = statusBar(host, 'Tap a box to build the sentence.');

    function forms(v, s) {
      const be = { He: ['is', 'was'], They: ['are', 'were'], I: ['am', 'was'] }[s];
      const simplePresent = s === 'He' ? v.s : v.base;
      return {
        'Simple past':        { t: s + ' ' + v.past + ' ' + v.obj + '.', r: 'Verb in its <strong>past form</strong> (' + v.past + '). No helping verb.' },
        'Simple present':     { t: s + ' ' + simplePresent + ' ' + v.obj + '.', r: s === 'He' ? 'Singular subject, so the verb takes <strong>-s</strong>.' : 'Plural subject, so the verb stays <strong>plain</strong>.' },
        'Simple future':      { t: s + ' will ' + v.base + ' ' + v.obj + '.', r: '<strong>will</strong> + the plain verb. Never "will played".' },
        'Past continuous':    { t: s + ' ' + be[1] + ' ' + v.ing + ' ' + v.obj + '.', r: '<strong>' + be[1] + '</strong> + verb + <strong>-ing</strong>.' },
        'Present continuous': { t: s + ' ' + be[0] + ' ' + v.ing + ' ' + v.obj + '.', r: '<strong>' + be[0] + '</strong> + verb + <strong>-ing</strong>. Happening right now.' },
        'Future continuous':  { t: s + ' will be ' + v.ing + ' ' + v.obj + '.', r: '<strong>will be</strong> + verb + <strong>-ing</strong>.' }
      };
    }

    function paint() {
      const v = VERBS[vi], f = forms(v, subject);
      const order = ['Simple past', 'Simple present', 'Simple future', 'Past continuous', 'Present continuous', 'Future continuous'];
      grid.innerHTML = '';
      order.forEach(function (name) {
        const b = el('button', 'hw-tcell' + (/continuous/.test(name) ? ' is-cont' : ''), name);
        b.addEventListener('click', function () {
          grid.querySelectorAll('.hw-tcell').forEach(function (x) { x.classList.remove('is-on'); });
          b.classList.add('is-on');
          out.innerHTML = '<span class="hw-sentence__t">' + f[name].t + '</span>';
          st.set('<strong>' + name + '</strong> — ' + f[name].r, 'good');
          say(f[name].t);
          tap();
          seen[name] = true;
          if (Object.keys(seen).length >= 4) onDone();
        });
        grid.appendChild(b);
      });
      out.innerHTML = '<span class="hw-muted">Your sentence appears here.</span>';
    }
    sel.addEventListener('change', function () { vi = +sel.value; paint(); });
    sub.addEventListener('change', function () { subject = sub.value; paint(); });
    paint();
    return { onDone: function (fn) { onDone = fn; } };
  };

  /* ============================================================
     -ING MACHINE
     The four spelling rules, discovered by sorting.
     (This is the workbook page he never attempted.)
     ============================================================ */
  W.ingMachine = function (host) {
    let onDone = function () {}, done = 0;
    const RULES = [
      { id: 'add',    name: 'Just add -ing',                 note: 'Most verbs. Nothing else changes.' },
      { id: 'drope',  name: 'Drop the final e, add -ing',    note: 'When the verb ends in a silent e.' },
      { id: 'double', name: 'Double the last letter, add -ing', note: 'Short verb, one vowel, one final consonant.' },
      { id: 'ie',     name: 'Change ie to y, add -ing',      note: 'Only a handful: die, lie, tie.' }
    ];
    const WORDS = [
      { w: 'send', r: 'add', ing: 'sending' },
      { w: 'fly', r: 'add', ing: 'flying' },
      { w: 'talk', r: 'add', ing: 'talking' },
      { w: 'watch', r: 'add', ing: 'watching' },
      { w: 'sing', r: 'add', ing: 'singing' },
      { w: 'carry', r: 'add', ing: 'carrying' },
      { w: 'hide', r: 'drope', ing: 'hiding' },
      { w: 'come', r: 'drope', ing: 'coming' },
      { w: 'write', r: 'drope', ing: 'writing' },
      { w: 'hit', r: 'double', ing: 'hitting' },
      { w: 'run', r: 'double', ing: 'running' },
      { w: 'swim', r: 'double', ing: 'swimming' },
      { w: 'die', r: 'ie', ing: 'dying' },
      { w: 'lie', r: 'ie', ing: 'lying' }
    ];
    let idx = 0;

    host.appendChild(el('p', 'hw-intro',
      'Feed a verb into the machine and choose which <strong>-ing rule</strong> it follows. Get it right and the machine ' +
      'shows you the finished word.'));

    const card = el('div', 'hw-machine');
    host.appendChild(card);
    const st = statusBar(host);

    function paint() {
      if (idx >= WORDS.length) {
        card.innerHTML = '<div class="hw-win">🎉 All fourteen sorted. You now know every -ing rule the exam can ask for.</div>';
        st.set('Say them back: just add · drop the e · double the last letter · ie becomes y.', 'good');
        HY.confetti && HY.confetti(60);
        onDone();
        return;
      }
      const item = WORDS[idx];
      card.innerHTML =
        '<div class="hw-machine__word">' + item.w + '</div>' +
        '<div class="hw-machine__arrow">↓ which rule?</div>';
      const opts = el('div', 'hw-machine__opts');
      HY.shuffle(RULES).forEach(function (r) {
        const b = el('button', 'hw-rulebtn', '<strong>' + r.name + '</strong><span>' + r.note + '</span>');
        b.addEventListener('click', function () {
          if (r.id === item.r) {
            ok();
            card.innerHTML =
              '<div class="hw-machine__word">' + item.w + '</div>' +
              '<div class="hw-machine__arrow">↓ ' + r.name + '</div>' +
              '<div class="hw-machine__out">' + item.ing + '</div>';
            st.set('✓ <strong>' + item.w + ' → ' + item.ing + '</strong>. ' + r.note, 'good');
            say(item.ing);
            idx++; done++;
            setTimeout(paint, 1200);
          } else {
            HY.sfx && HY.sfx.no();
            b.classList.add('is-wrong');
            st.set('Not that one. Look at the last two letters of <strong>' + item.w + '</strong> and try again.', 'bad');
          }
        });
        opts.appendChild(b);
      });
      card.appendChild(opts);
      st.set('Verb ' + (idx + 1) + ' of ' + WORDS.length + '.');
    }
    paint();
    return { onDone: function (fn) { onDone = fn; } };
  };

  /* ============================================================
     WORD HUNT
     A sentence or short passage where every tap classifies a
     word. Used for adjectives, pronouns, सर्वनाम, nouns.
     ============================================================ */
  W.wordHunt = function (host, opts) {
    const data = (opts && opts.passage) || [];
    const label = (opts && opts.label) || 'word';
    const lang = (opts && opts.lang) || 'en-GB';
    let onDone = function () {}, foundCount = 0;
    const total = data.reduce(function (a, s) { return a + s.tokens.filter(function (t) { return t.kind; }).length; }, 0);

    host.appendChild(el('p', 'hw-intro',
      'Tap any word you think is a <strong>' + label + '</strong>. If you are right, it lights up and tells you what kind it is. ' +
      'There are <strong>' + total + '</strong> to find.'));

    const box = el('div', 'hw-hunt' + (lang === 'hi-IN' ? ' hy-hi' : ''));
    host.appendChild(box);
    const st = statusBar(host, '0 of ' + total + ' found.');

    data.forEach(function (sentence) {
      const line = el('div', 'hw-hunt__line');
      sentence.tokens.forEach(function (t) {
        const b = el('button', 'hw-htok', t.t);
        b.addEventListener('click', function () {
          if (b.classList.contains('is-found')) { say(t.t, lang); return; }
          if (t.kind) {
            b.classList.add('is-found');
            b.appendChild(el('span', 'hw-htok__k', t.kind));
            foundCount++; ok(); say(t.t, lang);
            st.set(foundCount + ' of ' + total + ' found. <strong>' + t.t + '</strong> — ' + t.kind +
              (t.why ? '. ' + t.why : ''), 'good');
            if (foundCount >= total) {
              st.set('🎉 Every one found. Read the sentences once more and see them all at a glance.', 'good');
              HY.confetti && HY.confetti(50);
              onDone();
            }
          } else {
            b.classList.add('is-miss');
            HY.sfx && HY.sfx.no();
            st.set('<strong>' + t.t + '</strong> is not a ' + label + ' here. ' + (t.why || 'Look again.'), 'bad');
            setTimeout(function () { b.classList.remove('is-miss'); }, 700);
          }
        });
        line.appendChild(b);
      });
      box.appendChild(line);
    });
    return { onDone: function (fn) { onDone = fn; } };
  };

  /* ============================================================
     POEM / PASSAGE READER
     Read → hear → understand → then recite with the words
     hidden. Built for नीम and Gilli Danda.
     ============================================================ */
  W.poemReader = function (host, opts) {
    const lines = (opts && opts.lines) || [];
    const lang = (opts && opts.lang) || 'en-GB';
    const title = (opts && opts.title) || '';
    let onDone = function () {}, revealed = {}, mode = 'read';

    host.appendChild(el('p', 'hw-intro',
      'Tap 🔊 to hear a line. Tap the line itself to see what it means. When you feel ready, switch to ' +
      '<strong>Recite mode</strong> and say it with the words hidden.'));

    const tabs = el('div', 'hw-row');
    const bRead = el('button', 'hw-chip is-btn is-sel', '📖 Read');
    const bRecite = el('button', 'hw-chip is-btn', '🎤 Recite');
    tabs.appendChild(bRead); tabs.appendChild(bRecite);
    host.appendChild(tabs);

    const box = el('div', 'hw-poem' + (lang === 'hi-IN' ? ' hy-hi' : ''));
    host.appendChild(box);
    const st = statusBar(host, title);

    function paint() {
      box.innerHTML = '';
      lines.forEach(function (ln, i) {
        const row = el('div', 'hw-poem__row');
        const spk = el('button', 'hw-poem__spk', '🔊');
        spk.addEventListener('click', function (e) { e.stopPropagation(); say(ln.t, lang); });
        row.appendChild(spk);
        const txt = el('div', 'hw-poem__t');
        if (mode === 'recite' && !revealed[i]) {
          txt.className = 'hw-poem__t is-hidden';
          txt.textContent = ln.t.replace(/\S/g, '·');
        } else {
          txt.textContent = ln.t;
        }
        row.appendChild(txt);
        if (ln.m) {
          const m = el('div', 'hw-poem__m' + (revealed[i] ? '' : ' is-off'), ln.m);
          row.appendChild(m);
        }
        row.addEventListener('click', function () {
          revealed[i] = !revealed[i]; tap(); paint();
          const n = Object.keys(revealed).filter(function (k) { return revealed[k]; }).length;
          if (n >= Math.min(4, lines.length)) onDone();
        });
        box.appendChild(row);
      });
    }
    bRead.addEventListener('click', function () {
      mode = 'read'; bRead.classList.add('is-sel'); bRecite.classList.remove('is-sel');
      st.set(title); paint();
    });
    bRecite.addEventListener('click', function () {
      mode = 'recite'; revealed = {}; bRecite.classList.add('is-sel'); bRead.classList.remove('is-sel');
      st.set('Say each line out loud, then tap it to check yourself.', 'good');
      paint(); onDone();
    });
    paint();
    return { onDone: function (fn) { onDone = fn; } };
  };

  /* ============================================================
     WORD LAB — vocabulary flip cards with audio
     ============================================================ */
  W.wordLab = function (host, opts) {
    const words = (opts && opts.words) || [];
    const lang = (opts && opts.lang) || 'en-GB';
    let onDone = function () {}, flipped = {};

    host.appendChild(el('p', 'hw-intro',
      'Tap a card to turn it over. Try to say the meaning <strong>before</strong> you flip — guessing first makes it stick.'));

    const grid = el('div', 'hw-cards');
    host.appendChild(grid);
    const st = statusBar(host, '0 of ' + words.length + ' turned over.');

    words.forEach(function (w, i) {
      const card = el('button', 'hw-card');
      function paint() {
        card.className = 'hw-card' + (flipped[i] ? ' is-flipped' : '');
        card.innerHTML = flipped[i]
          ? '<span class="hw-card__m">' + w.m + '</span>' + (w.eg ? '<span class="hw-card__eg">' + w.eg + '</span>' : '')
          : '<span class="hw-card__w' + (lang === 'hi-IN' ? ' hy-hi' : '') + '">' + w.w + '</span>' +
            (w.roman ? '<span class="hw-card__r">' + w.roman + '</span>' : '');
      }
      card.addEventListener('click', function () {
        flipped[i] = !flipped[i]; tap(); paint();
        if (!flipped[i]) return;
        say(w.w, lang);
        const n = Object.keys(flipped).filter(function (k) { return flipped[k]; }).length;
        st.set(n + ' of ' + words.length + ' turned over.', n >= words.length ? 'good' : '');
        if (n >= words.length) { ok(); onDone(); }
      });
      paint();
      grid.appendChild(card);
    });
    return { onDone: function (fn) { onDone = fn; } };
  };

  /* ============================================================
     DEGREE LADDER — positive / comparative / superlative
     ============================================================ */
  W.degreeLadder = function (host, opts) {
    const sets = (opts && opts.sets) || [
      { p: 'tall', c: 'taller', s: 'tallest', rule: 'Short word: add -er and -est.' },
      { p: 'big', c: 'bigger', s: 'biggest', rule: 'One vowel + one consonant: double the last letter first.' },
      { p: 'slim', c: 'slimmer', s: 'slimmest', rule: 'Double the m — slimmer, slimmest. Not "slimest".' },
      { p: 'happy', c: 'happier', s: 'happiest', rule: 'Ends in y after a consonant: y becomes i.' },
      { p: 'beautiful', c: 'more beautiful', s: 'most beautiful', rule: 'Long word: use more and most instead of -er and -est.' },
      { p: 'good', c: 'better', s: 'best', rule: 'Irregular — it just has to be learnt.' },
      { p: 'bad', c: 'worse', s: 'worst', rule: 'Irregular — learn it by heart.' }
    ];
    let i = 0, onDone = function () {};

    host.appendChild(el('p', 'hw-intro',
      'Every adjective has three steps on the ladder. Climb each one and watch <strong>how the word changes</strong> — ' +
      'the spelling rule is different for different kinds of word.'));

    const stage = el('div', 'hw-ladder');
    host.appendChild(stage);
    const st = statusBar(host);
    const row = el('div', 'hw-row');
    const prev = el('button', 'hw-chip is-btn', '← Previous');
    const next = el('button', 'hw-chip is-btn', 'Next word →');
    row.appendChild(prev); row.appendChild(next);
    host.appendChild(row);

    function paint() {
      const s = sets[i];
      stage.innerHTML =
        '<div class="hw-lstep hw-lstep--3"><span class="hw-lstep__lbl">Superlative</span><span class="hw-lstep__w">' + s.s + '</span></div>' +
        '<div class="hw-lstep hw-lstep--2"><span class="hw-lstep__lbl">Comparative</span><span class="hw-lstep__w">' + s.c + '</span></div>' +
        '<div class="hw-lstep hw-lstep--1"><span class="hw-lstep__lbl">Positive</span><span class="hw-lstep__w">' + s.p + '</span></div>';
      st.set('<strong>' + s.rule + '</strong>  ·  ' + (i + 1) + ' of ' + sets.length);
      say(s.p + ', ' + s.c + ', ' + s.s);
    }
    prev.addEventListener('click', function () { i = (i - 1 + sets.length) % sets.length; tap(); paint(); });
    next.addEventListener('click', function () {
      i = (i + 1) % sets.length; tap(); paint();
      if (i === sets.length - 1) onDone();
    });
    paint();
    return { onDone: function (fn) { onDone = fn; } };
  };

})();
