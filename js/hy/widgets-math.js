/* ============================================================
   HALF-YEARLY HQ — widgets-math.js
   Hands-on maths apparatus. These are for LEARNING, not testing:
   nothing here is scored, nothing goes in the mastery box. The
   point is that he discovers the rule by moving things about,
   and only then meets the questions.

   Every widget:
       HY.widgets.<name>(host, opts) -> { done: Promise-ish via onDone }
   and signals onDone() when the child has actually explored enough
   for the lesson to unlock "Next".
   ============================================================ */
(function () {
  'use strict';

  const HY = window.HY = window.HY || {};
  const W = HY.widgets = HY.widgets || {};
  const H = HY.genHelpers || {};

  /* ---------------- shared helpers ---------------- */
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function factorsOf(n) {
    const out = [];
    for (let i = 1; i * i <= n; i++) if (n % i === 0) { out.push(i); if (i !== n / i) out.push(n / i); }
    return out.sort(function (a, b) { return a - b; });
  }
  function factorPairs(n) {
    const out = [];
    for (let i = 1; i * i <= n; i++) if (n % i === 0) out.push([i, n / i]);
    return out;
  }
  function primeFactors(n) {
    const out = []; let d = 2, x = n;
    while (d * d <= x) { while (x % d === 0) { out.push(d); x /= d; } d++; }
    if (x > 1) out.push(x);
    return out;
  }
  function isPrime(n) { return n > 1 && primeFactors(n).length === 1; }
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function tap() { HY.sfx && HY.sfx.tap(); }
  function ok() { HY.sfx && HY.sfx.ok(); }

  /* A little status line every widget shares. */
  function statusBar(host, text) {
    const s = el('div', 'hw-status', text || '');
    host.appendChild(s);
    return {
      set: function (t, kind) { s.innerHTML = t; s.className = 'hw-status' + (kind ? ' is-' + kind : ''); },
      el: s
    };
  }

  /* ============================================================
     1 · FACTOR RECTANGLES
     "A factor is a number of rows that comes out even."
     ============================================================ */
  W.factorRectangles = function (host, opts) {
    const n = (opts && opts.n) || 12;
    const pairs = factorPairs(n);
    const found = {};
    let onDone = function () {};

    host.appendChild(el('p', 'hw-intro',
      'You have <strong>' + n + '</strong> counters. Try to arrange them into a perfect rectangle. ' +
      'Change the number of rows — when it comes out with <strong>no leftovers</strong>, you have found a factor pair.'));

    const ctrl = el('div', 'hw-row');
    ctrl.innerHTML = '<span class="hw-label">Rows</span>';
    const minus = el('button', 'hw-step', '−');
    const val = el('span', 'hw-val', '1');
    const plus = el('button', 'hw-step', '+');
    ctrl.appendChild(minus); ctrl.appendChild(val); ctrl.appendChild(plus);
    host.appendChild(ctrl);

    const board = el('div', 'hw-board');
    host.appendChild(board);
    const st = statusBar(host);

    const list = el('div', 'hw-found');
    host.appendChild(list);

    let rows = 1;
    function paint() {
      val.textContent = rows;
      const cols = Math.ceil(n / rows);
      const exact = n % rows === 0;
      board.innerHTML = '';
      const grid = el('div', 'hw-dots');
      grid.style.gridTemplateColumns = 'repeat(' + (exact ? n / rows : cols) + ', 1fr)';
      for (let i = 0; i < n; i++) {
        const d = el('span', 'hw-dot' + (exact ? ' is-ok' : (i >= rows * Math.floor(n / rows) ? ' is-left' : '')));
        grid.appendChild(d);
      }
      board.appendChild(grid);

      if (exact) {
        const c = n / rows;
        if (!found[rows]) {
          found[rows] = true; found[c] = true;
          ok();
          renderFound();
        }
        st.set('✓ <strong>' + rows + ' × ' + c + ' = ' + n + '</strong> — a perfect rectangle. So <strong>' + rows + '</strong> and <strong>' + c + '</strong> are both factors of ' + n + '.', 'good');
      } else {
        const left = n % rows;
        st.set('Not quite — ' + left + ' counter' + (left === 1 ? ' is' : 's are') + ' left over, so <strong>' + rows + '</strong> is not a factor of ' + n + '.', 'bad');
      }
    }
    function renderFound() {
      const all = factorsOf(n);
      const got = all.filter(function (f) { return found[f]; });
      list.innerHTML = '<div class="hw-found__title">Factors found: ' + got.length + ' of ' + all.length + '</div>' +
        '<div class="hw-chips">' + all.map(function (f) {
          return '<span class="hw-chip' + (found[f] ? ' is-on' : '') + '">' + (found[f] ? f : '?') + '</span>';
        }).join('') + '</div>';
      if (got.length === all.length) {
        list.innerHTML += '<div class="hw-win">🎉 Every factor of ' + n + ' found: <strong>' + all.join(', ') + '</strong>. ' +
          'Notice there are <strong>' + pairs.length + '</strong> rectangles but <strong>' + all.length + '</strong> factors.</div>';
        HY.confetti && HY.confetti(50);
        onDone();
      }
    }
    minus.addEventListener('click', function () { rows = Math.max(1, rows - 1); tap(); paint(); });
    plus.addEventListener('click', function () { rows = Math.min(n, rows + 1); tap(); paint(); });
    paint(); renderFound();

    return { onDone: function (fn) { onDone = fn; } };
  };

  /* ============================================================
     2 · MULTIPLE GRID  (multiples, common multiples, LCM)
     ============================================================ */
  W.multipleGrid = function (host, opts) {
    const max = (opts && opts.max) || 60;
    let a = (opts && opts.a) || 4, b = (opts && opts.b) || 6;
    let onDone = function () {}, explored = 0;

    host.appendChild(el('p', 'hw-intro',
      'Colour in the multiples of two numbers and watch where they <strong>land on the same square</strong>. ' +
      'The first square that gets both colours is the <strong>LCM</strong>.'));

    const ctrl = el('div', 'hw-row hw-row--wrap');
    ctrl.innerHTML =
      '<span class="hw-label hw-label--a">Number A</span><select class="hw-select" id="hw-a"></select>' +
      '<span class="hw-label hw-label--b">Number B</span><select class="hw-select" id="hw-b"></select>';
    host.appendChild(ctrl);
    const selA = ctrl.querySelector('#hw-a'), selB = ctrl.querySelector('#hw-b');
    for (let i = 2; i <= 12; i++) {
      selA.appendChild(new Option(i, i)); selB.appendChild(new Option(i, i));
    }
    selA.value = a; selB.value = b;

    const grid = el('div', 'hw-numgrid');
    host.appendChild(grid);
    const st = statusBar(host);

    function paint() {
      grid.innerHTML = '';
      for (let i = 1; i <= max; i++) {
        const isA = i % a === 0, isB = i % b === 0;
        const c = el('span', 'hw-cell' + (isA && isB ? ' is-both' : isA ? ' is-a' : isB ? ' is-b' : ''), String(i));
        grid.appendChild(c);
      }
      const L = a / gcd(a, b) * b;
      const commons = [];
      for (let i = 1; i <= max; i++) if (i % a === 0 && i % b === 0) commons.push(i);
      st.set(
        'Multiples of <b class="hw-ink-a">' + a + '</b> and <b class="hw-ink-b">' + b + '</b> meet at: <strong>' +
        (commons.length ? commons.join(', ') : 'nothing on this grid') + '</strong>.' +
        (L <= max ? ' The <strong>first</strong> one — ' + L + ' — is the <strong>LCM</strong>.' : ' The LCM is ' + L + ', off the end of this grid.'),
        'good');
      explored++;
      if (explored >= 3) onDone();
    }
    selA.addEventListener('change', function () { a = +selA.value; tap(); paint(); });
    selB.addEventListener('change', function () { b = +selB.value; tap(); paint(); });
    paint();
    return { onDone: function (fn) { onDone = fn; } };
  };

  /* ============================================================
     3 · PRIME SIEVE  (Sieve of Eratosthenes, 1-100)
     This is the exact activity page he never attempted.
     ============================================================ */
  W.primeSieve = function (host) {
    const crossed = {};
    let stage = 0, onDone = function () {};
    const STEPS = [
      { n: 1, label: 'Cross out 1 — it is neither prime nor composite.' },
      { n: 2, label: 'Keep 2, cross out every other multiple of 2.' },
      { n: 3, label: 'Keep 3, cross out every other multiple of 3.' },
      { n: 5, label: 'Keep 5, cross out every other multiple of 5.' },
      { n: 7, label: 'Keep 7, cross out every other multiple of 7.' }
    ];

    host.appendChild(el('p', 'hw-intro',
      'This is the <strong>Sieve of Eratosthenes</strong> — a 2,000-year-old trick for finding every prime up to 100. ' +
      'Work through the steps. Whatever survives is prime.'));

    const grid = el('div', 'hw-sieve');
    host.appendChild(grid);
    const st = statusBar(host, STEPS[0].label);
    const btn = el('button', 'hy-btn hy-btn--primary hw-go', 'Cross out 1');
    host.appendChild(btn);

    function paint() {
      grid.innerHTML = '';
      for (let i = 1; i <= 100; i++) {
        const c = el('button', 'hw-scell' + (crossed[i] ? ' is-out' : ''), String(i));
        if (stage >= STEPS.length && !crossed[i]) c.classList.add('is-prime');
        c.addEventListener('click', function () {
          crossed[i] = !crossed[i]; tap(); paint();
        });
        grid.appendChild(c);
      }
    }
    btn.addEventListener('click', function () {
      const s = STEPS[stage];
      if (s.n === 1) crossed[1] = true;
      else for (let m = s.n * 2; m <= 100; m += s.n) crossed[m] = true;
      stage++;
      ok();
      if (stage < STEPS.length) {
        st.set(STEPS[stage].label);
        btn.textContent = STEPS[stage].n === 1 ? 'Cross out 1' : 'Cross out multiples of ' + STEPS[stage].n;
      } else {
        let count = 0;
        for (let i = 1; i <= 100; i++) if (!crossed[i]) count++;
        st.set('🎉 Done. <strong>' + count + ' numbers</strong> survived — those are the primes from 1 to 100. ' +
          'Learn that number: <strong>there are 25 primes below 100</strong>.', 'good');
        btn.remove();
        HY.confetti && HY.confetti(60);
        onDone();
      }
      paint();
    });
    paint();
    return { onDone: function (fn) { onDone = fn; } };
  };

  /* ============================================================
     4 · FACTOR TREE  (prime factorisation, by doing)
     ============================================================ */
  W.factorTree = function (host, opts) {
    const start = (opts && opts.n) || 36;
    let onDone = function () {};
    const root = { v: start, kids: null };

    host.appendChild(el('p', 'hw-intro',
      'Split <strong>' + start + '</strong> into two factors. Then split those. Keep going until every branch ends ' +
      'in a <strong>prime</strong> number that cannot be split any further.'));

    const tree = el('div', 'hw-tree');
    host.appendChild(tree);
    const st = statusBar(host, 'Tap the number to split it.');
    const picker = el('div', 'hw-picker');
    host.appendChild(picker);

    function leaves(node, acc) {
      acc = acc || [];
      if (!node.kids) acc.push(node);
      else node.kids.forEach(function (k) { leaves(k, acc); });
      return acc;
    }
    function allPrime() { return leaves(root).every(function (l) { return isPrime(l.v); }); }

    function nodeEl(node) {
      const wrap = el('div', 'hw-tnode');
      const btn = el('button', 'hw-tval' + (isPrime(node.v) ? ' is-prime' : node.kids ? ' is-done' : ' is-open'), String(node.v));
      if (!node.kids && !isPrime(node.v)) {
        btn.addEventListener('click', function () { openPicker(node); });
      } else if (isPrime(node.v)) {
        btn.title = node.v + ' is prime — it stops here.';
      }
      wrap.appendChild(btn);
      if (node.kids) {
        const kidRow = el('div', 'hw-tkids');
        node.kids.forEach(function (k) { kidRow.appendChild(nodeEl(k)); });
        wrap.appendChild(el('div', 'hw-tstem'));
        wrap.appendChild(kidRow);
      }
      return wrap;
    }
    function paint() {
      tree.innerHTML = '';
      tree.appendChild(nodeEl(root));
      if (allPrime()) {
        const pf = leaves(root).map(function (l) { return l.v; }).sort(function (x, y) { return x - y; });
        st.set('🎉 Every branch is prime. So <strong>' + start + ' = ' + pf.join(' × ') + '</strong>. ' +
          'That is the prime factorisation, and it is the same whichever way you split first.', 'good');
        picker.innerHTML = '';
        HY.confetti && HY.confetti(50);
        onDone();
      }
    }
    function openPicker(node) {
      const ps = factorPairs(node.v).filter(function (p) { return p[0] !== 1; });
      picker.innerHTML = '<div class="hw-picker__t">Split <strong>' + node.v + '</strong> into:</div>';
      const row = el('div', 'hw-chips');
      ps.forEach(function (p) {
        const b = el('button', 'hw-chip is-btn', p[0] + ' × ' + p[1]);
        b.addEventListener('click', function () {
          node.kids = [{ v: p[0], kids: null }, { v: p[1], kids: null }];
          tap(); picker.innerHTML = ''; paint();
        });
        row.appendChild(b);
      });
      picker.appendChild(row);
      st.set('Pick a pair that multiplies to ' + node.v + '.');
    }
    paint();
    return { onDone: function (fn) { onDone = fn; } };
  };

  /* ============================================================
     5 · HCF / LCM VENN
     The single best picture of what HCF and LCM actually are.
     ============================================================ */
  W.hcfLcmVenn = function (host, opts) {
    const a = (opts && opts.a) || 24, b = (opts && opts.b) || 36;
    let onDone = function () {};

    const pa = primeFactors(a), pb = primeFactors(b);
    /* work out the shared multiset */
    const shared = [], leftOnly = pa.slice(), rightOnly = pb.slice();
    pa.forEach(function (p) {
      const i = rightOnly.indexOf(p);
      if (i >= 0) { shared.push(p); rightOnly.splice(i, 1); leftOnly.splice(leftOnly.indexOf(p), 1); }
    });
    const hcf = shared.reduce(function (x, y) { return x * y; }, 1);
    const lcm = a / gcd(a, b) * b;

    host.appendChild(el('p', 'hw-intro',
      'Break both numbers into primes, then see which primes they <strong>share</strong>. ' +
      'Tap each prime in the middle strip to move it where you think it belongs.'));

    const wrap = el('div', 'hw-venn');
    wrap.innerHTML =
      '<div class="hw-venn__side hw-venn__side--l"><div class="hw-venn__cap">' + a + ' only</div><div class="hw-venn__zone" data-z="l"></div></div>' +
      '<div class="hw-venn__mid"><div class="hw-venn__cap">Shared</div><div class="hw-venn__zone" data-z="m"></div></div>' +
      '<div class="hw-venn__side hw-venn__side--r"><div class="hw-venn__cap">' + b + ' only</div><div class="hw-venn__zone" data-z="r"></div></div>';
    host.appendChild(wrap);

    const bank = el('div', 'hw-chips hw-bank');
    host.appendChild(bank);
    const st = statusBar(host, a + ' = ' + pa.join(' × ') + '  ·  ' + b + ' = ' + pb.join(' × '));
    const check = el('button', 'hy-btn hy-btn--primary hw-go', 'Check the split');
    host.appendChild(check);

    /* every prime token, tagged with where it truly belongs */
    const tokens = shared.map(function (p) { return { v: p, home: 'm', at: null }; })
      .concat(leftOnly.map(function (p) { return { v: p, home: 'l', at: null }; }))
      .concat(rightOnly.map(function (p) { return { v: p, home: 'r', at: null }; }));
    let sel = null;

    function paint(reveal) {
      bank.innerHTML = '';
      wrap.querySelectorAll('.hw-venn__zone').forEach(function (z) { z.innerHTML = ''; });
      tokens.forEach(function (t, i) {
        const c = el('button', 'hw-chip is-btn' + (sel === i ? ' is-sel' : ''), String(t.v));
        if (reveal) c.classList.add(t.at === t.home ? 'is-right' : 'is-wrong');
        c.addEventListener('click', function () {
          if (reveal) return;
          if (t.at) { t.at = null; sel = null; } else { sel = (sel === i ? null : i); }
          tap(); paint(false);
        });
        if (t.at) wrap.querySelector('.hw-venn__zone[data-z="' + t.at + '"]').appendChild(c);
        else bank.appendChild(c);
      });
      if (!bank.children.length) bank.appendChild(el('span', 'hw-muted', 'All placed 👍'));
    }
    wrap.querySelectorAll('.hw-venn__zone').forEach(function (z) {
      z.addEventListener('click', function () {
        if (sel === null) return;
        tokens[sel].at = z.dataset.z; sel = null; tap(); paint(false);
      });
    });
    check.addEventListener('click', function () {
      const right = tokens.every(function (t) { return t.at === t.home; });
      paint(true);
      if (right) {
        ok(); HY.confetti && HY.confetti(60);
        st.set('🎉 Exactly. Multiply the <strong>shared</strong> primes: ' + (shared.length ? shared.join(' × ') + ' = ' : '') +
          '<strong>HCF = ' + hcf + '</strong>. Multiply <strong>everything in the picture</strong>: ' +
          '<strong>LCM = ' + lcm + '</strong>. That is all HCF and LCM ever are.', 'good');
        check.remove();
        onDone();
      } else {
        st.set('Not yet. A prime sits in the middle only if it appears in <em>both</em> lists — and only as many times as it appears in both. ' +
          a + ' = ' + pa.join(' × ') + ' · ' + b + ' = ' + pb.join(' × '), 'bad');
        setTimeout(function () { paint(false); }, 1400);
      }
    });
    paint(false);
    return { onDone: function (fn) { onDone = fn; } };
  };

  /* ============================================================
     6 · PROTRACTOR
     Two scales, exactly as the notes describe them.
     ============================================================ */
  W.protractor = function (host, opts) {
    const mode = (opts && opts.mode) || 'explore';
    let target = (opts && opts.target) || null;
    let onDone = function () {}, hits = 0;
    let angle = 40;

    host.appendChild(el('p', 'hw-intro',
      mode === 'measure'
        ? 'Drag the purple arm until the angle matches the target. Read it off the protractor — remember which scale to use.'
        : 'Drag the purple arm. Watch the reading on <strong>both scales</strong> and see when the angle changes its name.'));

    const stage = el('div', 'hw-proto');
    host.appendChild(stage);
    const st = statusBar(host);

    const W_ = 420, Hh = 240, cx = 210, cy = 200, R = 165;
    function draw() {
      const rad = angle * Math.PI / 180;
      const x2 = cx + R * Math.cos(-rad), y2 = cy + R * Math.sin(-rad);
      let ticks = '';
      for (let d = 0; d <= 180; d += 10) {
        const r1 = R, r2 = d % 30 === 0 ? R - 18 : R - 10;
        const rr = d * Math.PI / 180;
        ticks += '<line x1="' + (cx + r1 * Math.cos(-rr)).toFixed(1) + '" y1="' + (cy + r1 * Math.sin(-rr)).toFixed(1) +
                 '" x2="' + (cx + r2 * Math.cos(-rr)).toFixed(1) + '" y2="' + (cy + r2 * Math.sin(-rr)).toFixed(1) +
                 '" stroke="currentColor" stroke-width="1.2" opacity=".55"/>';
        if (d % 30 === 0) {
          const tr = R - 32;
          ticks += '<text x="' + (cx + tr * Math.cos(-rr)).toFixed(1) + '" y="' + (cy + tr * Math.sin(-rr) + 4).toFixed(1) +
                   '" text-anchor="middle" font-size="11" font-family="Inter, system-ui" fill="currentColor" opacity=".8">' + d + '</text>';
          const tr2 = R - 52;
          ticks += '<text x="' + (cx + tr2 * Math.cos(-rr)).toFixed(1) + '" y="' + (cy + tr2 * Math.sin(-rr) + 4).toFixed(1) +
                   '" text-anchor="middle" font-size="10" font-family="Inter, system-ui" fill="#14B8A6" opacity=".9">' + (180 - d) + '</text>';
        }
      }
      stage.innerHTML =
        '<svg viewBox="0 0 ' + W_ + ' ' + Hh + '" class="hw-proto__svg" role="img"><title>Protractor showing ' + angle + ' degrees</title>' +
        '<path d="M ' + (cx - R) + ' ' + cy + ' A ' + R + ' ' + R + ' 0 0 1 ' + (cx + R) + ' ' + cy + ' Z" fill="currentColor" opacity=".05"/>' +
        '<path d="M ' + (cx - R) + ' ' + cy + ' A ' + R + ' ' + R + ' 0 0 1 ' + (cx + R) + ' ' + cy + '" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".7"/>' +
        '<line x1="' + (cx - R) + '" y1="' + cy + '" x2="' + (cx + R) + '" y2="' + cy + '" stroke="currentColor" stroke-width="1.6" opacity=".7"/>' +
        ticks +
        '<path d="M ' + (cx + 46) + ' ' + cy + ' A 46 46 0 0 0 ' + (cx + 46 * Math.cos(-rad)).toFixed(1) + ' ' + (cy + 46 * Math.sin(-rad)).toFixed(1) + '" fill="none" stroke="#7C3AED" stroke-width="3"/>' +
        '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + R) + '" y2="' + cy + '" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>' +
        '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#7C3AED" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="' + x2.toFixed(1) + '" cy="' + y2.toFixed(1) + '" r="11" fill="#7C3AED"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="4.5" fill="currentColor"/>' +
        '<text x="' + cx + '" y="' + (cy + 24) + '" text-anchor="middle" font-size="13" font-family="Inter, system-ui" fill="currentColor">O (centre)</text>' +
        '</svg>';
      const name = H.angleName ? H.angleName(angle) : '';
      if (mode === 'measure' && target) {
        const diff = Math.abs(angle - target);
        if (diff <= 1) {
          st.set('✓ <strong>' + angle + '°</strong> — that is it. It is ' + (H.angleName ? H.angleName(angle).toLowerCase() : '') + '.', 'good');
          if (!stage.dataset.hit) { stage.dataset.hit = '1'; ok(); hits++; if (hits >= 1) onDone(); }
        } else {
          stage.dataset.hit = '';
          st.set('Target: <strong>' + target + '°</strong> · you are on <strong>' + angle + '°</strong> — ' + (angle < target ? 'open it wider.' : 'close it a little.'));
        }
      } else {
        st.set('Reading: <strong>' + angle + '°</strong> on the outer scale, <strong>' + (180 - angle) + '°</strong> on the inner scale. ' +
          'This is <strong>' + name.toLowerCase() + '</strong>.');
      }
    }

    function setFromEvent(e) {
      const svg = stage.querySelector('svg');
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const pt = (e.touches && e.touches[0]) || e;
      const sx = (pt.clientX - r.left) / r.width * W_;
      const sy = (pt.clientY - r.top) / r.height * Hh;
      let deg = Math.atan2(cy - sy, sx - cx) * 180 / Math.PI;
      if (deg < 0) deg = 0; if (deg > 180) deg = 180;
      angle = Math.round(deg);
      draw();
    }
    let dragging = false;
    stage.addEventListener('pointerdown', function (e) { dragging = true; setFromEvent(e); });
    stage.addEventListener('pointermove', function (e) { if (dragging) { e.preventDefault(); setFromEvent(e); } });
    window.addEventListener('pointerup', function () { dragging = false; });
    stage.addEventListener('click', setFromEvent);

    const row = el('div', 'hw-row');
    [10, 45, 90, 120, 180].forEach(function (d) {
      const b = el('button', 'hw-chip is-btn', d + '°');
      b.addEventListener('click', function () { angle = d; tap(); draw(); if (mode === 'explore') { hits++; if (hits >= 3) onDone(); } });
      row.appendChild(b);
    });
    host.appendChild(row);
    draw();
    return { onDone: function (fn) { onDone = fn; } };
  };

  /* ============================================================
     7 · CIRCLE EXPLORER
     Radius, diameter, chord — and why the diameter is the
     longest chord (his one flagged conceptual wobble).
     ============================================================ */
  W.circleExplorer = function (host) {
    let r = 70, chordAngle = 55;
    let onDone = function () {}, moved = 0;
    const cx = 170, cy = 130;

    host.appendChild(el('p', 'hw-intro',
      'Drag the <strong>purple dot</strong> to change the radius, and the <strong>teal dot</strong> to swing the chord. ' +
      'Watch what happens to the chord as it passes through the centre.'));

    const stage = el('div', 'hw-circle');
    host.appendChild(stage);
    const st = statusBar(host);

    function draw() {
      const rad = chordAngle * Math.PI / 180;
      /* chord from a fixed point A round to B */
      const ax = cx - r * Math.cos(rad), ay = cy - r * Math.sin(rad);
      const bx = cx + r * Math.cos(rad), by = cy - r * Math.sin(rad);
      const chordLen = Math.round(Math.hypot(bx - ax, by - ay));
      const isDia = Math.abs(chordLen - 2 * r) < 2;
      stage.innerHTML =
        '<svg viewBox="0 0 340 260" class="hw-circle__svg" role="img"><title>A circle with radius, diameter and chord</title>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="currentColor" stroke-width="2.5"/>' +
        '<line x1="' + (cx - r) + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '" stroke="#F59E0B" stroke-width="3" stroke-dasharray="6 4"/>' +
        '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '" stroke="#7C3AED" stroke-width="4"/>' +
        '<line x1="' + ax.toFixed(1) + '" y1="' + ay.toFixed(1) + '" x2="' + bx.toFixed(1) + '" y2="' + by.toFixed(1) + '" stroke="#14B8A6" stroke-width="4"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="4.5" fill="currentColor"/>' +
        '<circle cx="' + (cx + r) + '" cy="' + cy + '" r="10" fill="#7C3AED"/>' +
        '<circle cx="' + bx.toFixed(1) + '" cy="' + by.toFixed(1) + '" r="10" fill="#14B8A6"/>' +
        '<text x="' + (cx - 6) + '" y="' + (cy + 20) + '" font-size="13" font-family="Inter, system-ui" fill="currentColor">O</text>' +
        '<text x="' + (cx + r / 2 - 8) + '" y="' + (cy - 8) + '" font-size="12" font-family="Inter, system-ui" fill="#7C3AED">radius</text>' +
        '</svg>';
      st.set(
        '<span class="hw-key hw-key--p">radius = ' + r + '</span>' +
        '<span class="hw-key hw-key--a">diameter = ' + (2 * r) + '</span>' +
        '<span class="hw-key hw-key--t">chord = ' + chordLen + '</span><br>' +
        (isDia
          ? '🎯 The chord now passes straight through the centre — so it <strong>is</strong> the diameter. That is why <strong>the diameter is the longest chord</strong>.'
          : 'Diameter is always <strong>2 × radius</strong> = 2 × ' + r + ' = <strong>' + (2 * r) + '</strong>. The chord is shorter than the diameter right now.'),
        isDia ? 'good' : '');
      if (isDia && !stage.dataset.seen) { stage.dataset.seen = '1'; ok(); onDone(); }
    }
    function point(e) {
      const svg = stage.querySelector('svg'); if (!svg) return null;
      const b = svg.getBoundingClientRect();
      const p = (e.touches && e.touches[0]) || e;
      return { x: (p.clientX - b.left) / b.width * 340, y: (p.clientY - b.top) / b.height * 260 };
    }
    let drag = null;
    stage.addEventListener('pointerdown', function (e) {
      const p = point(e); if (!p) return;
      const dPurple = Math.hypot(p.x - (cx + r), p.y - cy);
      drag = dPurple < 26 ? 'r' : 'c';
      move(e);
    });
    function move(e) {
      const p = point(e); if (!p || !drag) return;
      if (drag === 'r') r = Math.max(35, Math.min(115, Math.round(Math.hypot(p.x - cx, p.y - cy))));
      else {
        let a = Math.atan2(cy - p.y, p.x - cx) * 180 / Math.PI;
        chordAngle = Math.max(0, Math.min(90, Math.round(Math.abs(a))));
      }
      moved++;
      draw();
    }
    stage.addEventListener('pointermove', function (e) { if (drag) { e.preventDefault(); move(e); } });
    window.addEventListener('pointerup', function () { drag = null; });

    const row = el('div', 'hw-row');
    const b1 = el('button', 'hw-chip is-btn', 'Make the chord a diameter');
    b1.addEventListener('click', function () { chordAngle = 0; tap(); draw(); });
    row.appendChild(b1);
    host.appendChild(row);
    draw();
    return { onDone: function (fn) { onDone = fn; } };
  };

  /* ============================================================
     8 · LINE LAB — parallel / intersecting / perpendicular
     ============================================================ */
  W.lineLab = function (host) {
    let ang = 30, onDone = function () {}, seen = {};
    host.appendChild(el('p', 'hw-intro',
      'Turn the teal line. Watch the name change — and notice that <strong>perpendicular is just a special kind of intersecting</strong>.'));
    const stage = el('div', 'hw-linelab');
    host.appendChild(stage);
    const st = statusBar(host);

    function kind() {
      if (ang === 0 || ang === 180) return { n: 'Parallel lines', d: 'They never meet, however far you stretch them, and they stay the same distance apart.' };
      if (ang === 90) return { n: 'Perpendicular lines', d: 'They cross at exactly 90°. Every pair of perpendicular lines is also intersecting.' };
      return { n: 'Intersecting lines', d: 'They cross at one point — the point of intersection.' };
    }
    function draw() {
      const rad = ang * Math.PI / 180;
      const cx = 170, cy = 90, L = 140;
      const par = ang === 0 || ang === 180;
      const x1 = cx - L * Math.cos(rad), y1 = cy + L * Math.sin(rad);
      const x2 = cx + L * Math.cos(rad), y2 = cy - L * Math.sin(rad);
      stage.innerHTML =
        '<svg viewBox="0 0 340 180" class="hw-linelab__svg" role="img"><title>Two lines at ' + ang + ' degrees</title>' +
        '<line x1="30" y1="' + cy + '" x2="310" y2="' + cy + '" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>' +
        '<line x1="' + (par ? 30 : x1.toFixed(1)) + '" y1="' + (par ? cy - 40 : y1.toFixed(1)) + '" x2="' + (par ? 310 : x2.toFixed(1)) + '" y2="' + (par ? cy - 40 : y2.toFixed(1)) + '" stroke="#14B8A6" stroke-width="3.5" stroke-linecap="round"/>' +
        (par ? '' : '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="#7C3AED"/>') +
        (ang === 90 ? '<rect x="' + cx + '" y="' + (cy - 18) + '" width="18" height="18" fill="none" stroke="#7C3AED" stroke-width="2"/>' : '') +
        '</svg>';
      const k = kind();
      seen[k.n] = true;
      st.set('<strong>' + k.n + '</strong> — ' + k.d, ang === 90 ? 'good' : '');
      if (Object.keys(seen).length >= 3) onDone();
    }
    const row = el('div', 'hw-row');
    const slider = el('input', 'hw-slider');
    slider.type = 'range'; slider.min = '0'; slider.max = '180'; slider.value = String(ang);
    slider.addEventListener('input', function () { ang = +slider.value; draw(); });
    row.appendChild(slider);
    host.appendChild(row);
    const quick = el('div', 'hw-row');
    [[0, 'Parallel'], [45, 'Intersecting'], [90, 'Perpendicular']].forEach(function (p) {
      const b = el('button', 'hw-chip is-btn', p[1]);
      b.addEventListener('click', function () { ang = p[0]; slider.value = String(p[0]); tap(); draw(); });
      quick.appendChild(b);
    });
    host.appendChild(quick);
    draw();
    return { onDone: function (fn) { onDone = fn; } };
  };

})();
