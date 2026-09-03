/* ============================================================
   HALF-YEARLY HQ — gen.js
   Question generators for the maths skills.

   A banked question can be memorised. A generated one cannot.
   Where a maths skill is pure method — factors, multiples, HCF,
   LCM, prime factorisation, angle naming, radius and diameter —
   the app makes a brand-new question every time, with numbers
   chosen to stay inside Grade-5 range and to avoid the trivial
   cases that teach nothing.

   Every generator returns a complete item in the same shape as a
   banked one, so the drill runner does not care where it came
   from. Answers are COMPUTED, never typed, so they cannot be
   wrong.
   ============================================================ */
(function () {
  'use strict';

  const HY = window.HY = window.HY || {};
  let seq = 0;
  function uid(tag) { return 'gen.' + tag + '.' + (++seq) + '.' + Math.floor(Math.random() * 1e6); }

  /* ---------------- number helpers ---------------- */
  function ri(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function pick(a) { return a[ri(0, a.length - 1)]; }
  function shuffle(a) {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) { const j = ri(0, i); const t = r[i]; r[i] = r[j]; r[j] = t; }
    return r;
  }
  function factorsOf(n) {
    const out = [];
    for (let i = 1; i * i <= n; i++) {
      if (n % i === 0) { out.push(i); if (i !== n / i) out.push(n / i); }
    }
    return out.sort(function (a, b) { return a - b; });
  }
  function factorPairs(n) {
    const out = [];
    for (let i = 1; i * i <= n; i++) if (n % i === 0) out.push([i, n / i]);
    return out;
  }
  function primeFactors(n) {
    const out = [];
    let d = 2, x = n;
    while (d * d <= x) { while (x % d === 0) { out.push(d); x /= d; } d++; }
    if (x > 1) out.push(x);
    return out;
  }
  function isPrime(n) { return n > 1 && primeFactors(n).length === 1; }
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function lcm(a, b) { return a / gcd(a, b) * b; }
  function multiples(n, k) { const o = []; for (let i = 1; i <= k; i++) o.push(n * i); return o; }
  function uniq(a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); }

  /* Turn a prime-factor list into every string a child might reasonably type. */
  function pfAccept(list) {
    const j = list.join('');
    return uniq([
      list.join('x'), list.join(' x '), list.join('*'), list.join(','), list.join(', '), list.join(' '),
      j
    ]);
  }
  function pfPretty(list) { return list.join(' × '); }

  /* Options for an MCQ: the right answer plus plausible wrong ones. */
  function mcq(q, correct, wrongs, explain, hint, level) {
    const opts = shuffle([String(correct)].concat(wrongs.map(String)));
    return {
      id: uid('mcq'), type: 'mcq', q: q, options: opts,
      answer: opts.indexOf(String(correct)),
      explain: explain, hint: hint, level: level || 2, generated: true
    };
  }
  function fill(q, accept, explain, hint, level, placeholder) {
    return {
      id: uid('fill'), type: 'fill', q: q, accept: accept,
      explain: explain, hint: hint, level: level || 2, placeholder: placeholder, generated: true
    };
  }

  /* ---------------- SVG for angles ---------------- */
  function angleSVG(deg) {
    const cx = 40, cy = 130, r = 92;
    const rad = deg * Math.PI / 180;
    const x2 = cx + r * Math.cos(-rad), y2 = cy + r * Math.sin(-rad);
    const ar = 26;
    const arcEndX = cx + ar * Math.cos(-rad), arcEndY = cy + ar * Math.sin(-rad);
    const large = deg > 180 ? 1 : 0;
    return '<svg viewBox="0 0 240 160" role="img"><title>An angle of ' + deg + ' degrees</title>' +
      '<g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '"/>' +
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '"/>' +
      '<path d="M ' + (cx + ar) + ' ' + cy + ' A ' + ar + ' ' + ar + ' 0 ' + large + ' 0 ' + arcEndX.toFixed(1) + ' ' + arcEndY.toFixed(1) + '" stroke="#7C3AED" stroke-width="2"/>' +
      '</g>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="3" fill="currentColor"/>' +
      '<text x="' + (cx - 14) + '" y="' + (cy + 16) + '" font-family="Inter, system-ui" font-size="14" fill="currentColor">O</text>' +
      '</svg>';
  }

  function angleName(d) {
    if (d === 0) return 'Zero angle';
    if (d < 90) return 'Acute angle';
    if (d === 90) return 'Right angle';
    if (d < 180) return 'Obtuse angle';
    if (d === 180) return 'Straight angle';
    if (d < 360) return 'Reflex angle';
    return 'Complete angle';
  }

  /* ============================================================
     GENERATORS
     Each is HY.gen[name]() -> item
     ============================================================ */
  const G = {};

  /* ---- multiples ---- */
  G.firstMultiples = function () {
    const n = ri(3, 15), k = pick([4, 5, 6]);
    const list = multiples(n, k);
    return fill(
      'Write the first <strong>' + k + '</strong> multiples of <strong>' + n + '</strong>.',
      [list.join(', '), list.join(','), list.join(' ')],
      'Multiply ' + n + ' by 1, 2, 3 … : ' + list.map(function (v, i) { return n + ' × ' + (i + 1) + ' = ' + v; }).join(', ') + '.',
      'The first multiple of a number is always the number itself.',
      1, 'e.g. ' + n + ', ...'
    );
  };

  G.nthMultiple = function () {
    const n = ri(3, 19), k = ri(3, 9);
    return fill(
      'What is the <strong>' + k + suffix(k) + ' multiple</strong> of ' + n + '?',
      [String(n * k)],
      'The ' + k + suffix(k) + ' multiple means ' + n + ' × ' + k + ' = <strong>' + (n * k) + '</strong>.',
      'The nth multiple of a number = the number × n.',
      2
    );
  };

  G.isMultiple = function () {
    const n = ri(3, 12);
    const yes = Math.random() < 0.5;
    const v = yes ? n * ri(3, 9) : n * ri(3, 9) + ri(1, n - 1);
    return {
      id: uid('tf'), type: 'tf',
      q: '<strong>' + v + '</strong> is a multiple of <strong>' + n + '</strong>.',
      answer: v % n === 0,
      explain: v % n === 0
        ? v + ' ÷ ' + n + ' = ' + (v / n) + ' with nothing left over, so it is a multiple.'
        : v + ' ÷ ' + n + ' leaves a remainder of ' + (v % n) + ', so it is not a multiple.',
      hint: 'Divide and look at the remainder.', level: 2, generated: true
    };
  };

  /* ---- factors ---- */
  G.allFactors = function () {
    const n = pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 56, 60, 64, 72, 75, 80, 81, 90, 96, 100]);
    const f = factorsOf(n);
    return fill(
      'Write <strong>all</strong> the factors of <strong>' + n + '</strong>.',
      [f.join(', '), f.join(','), f.join(' ')],
      'Factor pairs: ' + factorPairs(n).map(function (p) { return p[0] + ' × ' + p[1]; }).join(', ') +
        '. So the factors are <strong>' + f.join(', ') + '</strong>.',
      'Start at 1 × ' + n + ' and work upwards until the pairs meet.',
      2, '1, 2, ...'
    );
  };

  G.isFactor = function () {
    const n = pick([24, 36, 40, 48, 56, 60, 72, 84, 90, 96]);
    const f = factorsOf(n);
    const yes = Math.random() < 0.5;
    let v;
    if (yes) v = pick(f.filter(function (x) { return x > 1 && x < n; }));
    else { do { v = ri(2, Math.floor(n / 2)); } while (n % v === 0); }
    return {
      id: uid('tf'), type: 'tf',
      q: '<strong>' + v + '</strong> is a factor of <strong>' + n + '</strong>.',
      answer: n % v === 0,
      explain: n % v === 0
        ? n + ' ÷ ' + v + ' = ' + (n / v) + ' exactly, so ' + v + ' is a factor.'
        : n + ' ÷ ' + v + ' leaves ' + (n % v) + ' over, so ' + v + ' is not a factor.',
      hint: 'A factor divides the number exactly, with no remainder.', level: 2, generated: true
    };
  };

  G.factorCount = function () {
    const n = pick([16, 18, 24, 28, 30, 36, 42, 48, 60, 64, 72, 100]);
    const f = factorsOf(n);
    return mcq(
      'How many factors does <strong>' + n + '</strong> have altogether?',
      f.length,
      uniq([f.length + 1, f.length - 1, f.length + 2, Math.max(2, f.length - 2)]).filter(function (x) { return x !== f.length; }).slice(0, 3),
      'The factors of ' + n + ' are ' + f.join(', ') + ' — that is ' + f.length + ' of them. Do not forget 1 and ' + n + ' itself.',
      'List the factor pairs and count every different number you used.', 3
    );
  };

  /* ---- prime / composite ---- */
  G.primeOrComposite = function () {
    const pool = [11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 57, 59, 61, 63, 67, 69, 71, 73, 77, 79, 81, 83, 87, 89, 91, 97];
    const n = pick(pool);
    const p = isPrime(n);
    return mcq(
      'Is <strong>' + n + '</strong> a prime number or a composite number?',
      p ? 'Prime' : 'Composite', p ? ['Composite'] : ['Prime'],
      p ? n + ' has only two factors: 1 and ' + n + '. That makes it prime.'
        : 'The factors of ' + n + ' are ' + factorsOf(n).join(', ') + ' — more than two, so it is composite.',
      'Try dividing by 2, 3, 5 and 7. If nothing divides it, it is prime.', 2
    );
  };

  G.primeSort = function () {
    const primes = shuffle([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43]).slice(0, 3);
    const comps = shuffle([4, 6, 9, 12, 15, 21, 25, 27, 33, 35, 39, 49, 51, 55]).slice(0, 3);
    const chips = shuffle(primes.map(function (n) { return { t: String(n), b: 'Prime' }; })
      .concat(comps.map(function (n) { return { t: String(n), b: 'Composite' }; })));
    return {
      id: uid('bucket'), type: 'bucket',
      q: 'Sort each number into the right box.',
      buckets: ['Prime', 'Composite'], chips: chips,
      explain: 'A prime number has exactly two factors (1 and itself). A composite number has more than two. Remember 1 is neither.',
      hint: 'Ask: how many numbers divide it exactly?', level: 2, generated: true
    };
  };

  /* ---- common factors / multiples ---- */
  G.commonFactors = function () {
    const a = pick([12, 16, 18, 20, 24, 28, 30, 36, 40, 48]);
    let b; do { b = pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 42, 45, 48, 60]); } while (b === a);
    const fa = factorsOf(a), fb = factorsOf(b);
    const common = fa.filter(function (x) { return fb.indexOf(x) >= 0; });
    return fill(
      'Write all the <strong>common factors</strong> of ' + a + ' and ' + b + '.',
      [common.join(', '), common.join(','), common.join(' ')],
      'Factors of ' + a + ' = ' + fa.join(', ') + '<br>Factors of ' + b + ' = ' + fb.join(', ') +
        '<br>The ones in both lists: <strong>' + common.join(', ') + '</strong>.',
      'List both sets of factors, then circle the ones that appear in both.', 2
    );
  };

  G.commonMultiples = function () {
    const a = ri(2, 9);
    let b; do { b = ri(2, 12); } while (b === a);
    const L = lcm(a, b);
    return fill(
      'Write the first <strong>two</strong> common multiples of ' + a + ' and ' + b + '.',
      [L + ', ' + (2 * L), L + ',' + (2 * L), L + ' ' + (2 * L)],
      'Multiples of ' + a + ': ' + multiples(a, 8).join(', ') + '<br>Multiples of ' + b + ': ' + multiples(b, 8).join(', ') +
        '<br>The first two that appear in both lists are <strong>' + L + '</strong> and <strong>' + (2 * L) + '</strong>.',
      'Write out both lists far enough and look for the first match.', 3
    );
  };

  /* ---- prime factorisation (staged) ---- */
  G.primeFactorisation = function () {
    const n = pick([24, 32, 36, 40, 45, 48, 50, 54, 56, 60, 63, 64, 72, 75, 80, 81, 84, 90, 96, 100]);
    const pf = primeFactors(n);
    return {
      id: uid('steps'), type: 'steps',
      q: 'Find the <strong>prime factorisation</strong> of ' + n + '.',
      parts: [
        { q: 'Start dividing by the smallest prime that goes in. What is that prime?', accept: [String(pf[0])], hint: 'Try 2 first, then 3, then 5.', why: 'The smallest prime factor of ' + n + ' is ' + pf[0] + '.' },
        { q: 'Now write ' + n + ' as a product of primes (use × between them).', accept: pfAccept(pf), hint: 'Keep dividing until you are left with 1.', why: n + ' = ' + pfPretty(pf) },
        { q: 'How many prime factors did you use altogether?', accept: [String(pf.length)], why: 'There are ' + pf.length + ' of them: ' + pfPretty(pf) + '.' }
      ],
      explain: n + ' = ' + pfPretty(pf) + '.',
      level: 2, generated: true
    };
  };

  /* ---- HCF by prime factorisation (staged) ---- */
  G.hcfPrimeFactorisation = function () {
    let a, b, g;
    do {
      a = pick([12, 16, 18, 20, 24, 27, 28, 30, 32, 36, 40, 45, 48, 56, 60, 63, 72, 75]);
      b = pick([15, 18, 24, 28, 30, 32, 35, 36, 42, 45, 48, 54, 56, 63, 70, 75, 80, 84, 90]);
      g = gcd(a, b);
    } while (a === b || g === 1);
    const pa = primeFactors(a), pb = primeFactors(b), pg = primeFactors(g);
    return {
      id: uid('steps'), type: 'steps',
      q: 'Find the <strong>HCF of ' + a + ' and ' + b + '</strong> by prime factorisation.',
      parts: [
        { q: 'Prime factors of ' + a, accept: pfAccept(pa), hint: 'Divide by the smallest prime again and again.', why: a + ' = ' + pfPretty(pa) },
        { q: 'Prime factors of ' + b, accept: pfAccept(pb), hint: 'Same method.', why: b + ' = ' + pfPretty(pb) },
        { q: 'Multiply the primes that appear in BOTH lists. What do you get?', accept: [String(g)].concat(pfAccept(pg)), hint: 'Pair them off one by one.', why: 'The common primes multiply to ' + g + '.' },
        { q: 'So the HCF is', accept: [String(g)], why: 'HCF of ' + a + ' and ' + b + ' = ' + g + '.' }
      ],
      explain: a + ' = ' + pfPretty(pa) + ' and ' + b + ' = ' + pfPretty(pb) + '. The primes they share multiply to give HCF = <strong>' + g + '</strong>.',
      level: 3, generated: true
    };
  };

  /* ---- LCM by common division (staged) ---- */
  G.lcmCommonDivision = function () {
    let a, b;
    do { a = ri(4, 20); b = ri(6, 24); } while (a === b || lcm(a, b) > 200);
    const L = lcm(a, b), g = gcd(a, b);
    return {
      id: uid('steps'), type: 'steps',
      q: 'Find the <strong>LCM of ' + a + ' and ' + b + '</strong>.',
      parts: [
        { q: 'What is the HCF of ' + a + ' and ' + b + '?', accept: [String(g)], hint: 'The biggest number that divides both.', why: 'HCF = ' + g + '.' },
        { q: 'Now the LCM — the smallest number both ' + a + ' and ' + b + ' divide into.', accept: [String(L)], hint: 'List the multiples of the bigger one and check each against the smaller.', why: 'LCM = ' + L + '.' },
        { q: 'Check: HCF × LCM should equal ' + a + ' × ' + b + '. What is ' + a + ' × ' + b + '?', accept: [String(a * b)], why: g + ' × ' + L + ' = ' + (g * L) + ' = ' + a + ' × ' + b + '. The check works.' }
      ],
      explain: 'LCM of ' + a + ' and ' + b + ' is <strong>' + L + '</strong>. A useful check: HCF × LCM = the two numbers multiplied together.',
      level: 3, generated: true
    };
  };

  G.hcfQuick = function () {
    let a, b, g;
    do { a = ri(8, 60); b = ri(8, 72); g = gcd(a, b); } while (a === b || g === 1);
    return fill('What is the HCF of ' + a + ' and ' + b + '?', [String(g)],
      'The factors they share are ' + factorsOf(a).filter(function (x) { return b % x === 0; }).join(', ') + '. The highest is <strong>' + g + '</strong>.',
      'HCF = the biggest factor that both numbers share.', 2);
  };

  G.lcmQuick = function () {
    let a, b, L;
    do { a = ri(3, 15); b = ri(4, 18); L = lcm(a, b); } while (a === b || L > 120);
    return fill('What is the LCM of ' + a + ' and ' + b + '?', [String(L)],
      'Multiples of ' + a + ': ' + multiples(a, 8).join(', ') + '. The first one that ' + b + ' also divides into is <strong>' + L + '</strong>.',
      'LCM = the smallest number that appears in both multiple lists.', 2);
  };

  /* ---- geometry: angles ---- */
  G.angleType = function () {
    const d = pick([15, 25, 35, 48, 62, 76, 89, 90, 95, 106, 118, 125, 143, 172, 180, 200, 245, 270, 310, 360, 0]);
    const name = angleName(d);
    const wrongs = ['Acute angle', 'Right angle', 'Obtuse angle', 'Straight angle', 'Reflex angle', 'Complete angle', 'Zero angle']
      .filter(function (x) { return x !== name; });
    return mcq(
      'An angle measures <strong>' + d + '°</strong>. What kind of angle is it?',
      name, shuffle(wrongs).slice(0, 3),
      explainAngle(d, name),
      'Compare it with 90° and 180°.', d === 90 || d === 180 || d === 0 || d === 360 ? 1 : 2
    );
  };

  function explainAngle(d, name) {
    if (d === 0) return '0° is a zero angle — the two arms lie on top of each other.';
    if (d < 90) return d + '° is less than 90°, so it is an <strong>acute angle</strong>.';
    if (d === 90) return 'Exactly 90° is a <strong>right angle</strong>.';
    if (d < 180) return d + '° is more than 90° but less than 180°, so it is an <strong>obtuse angle</strong>.';
    if (d === 180) return 'Exactly 180° is a <strong>straight angle</strong> — two right angles side by side.';
    if (d < 360) return d + '° lies between 180° and 360°, so it is a <strong>reflex angle</strong>.';
    return '360° is a <strong>complete angle</strong> — all the way round.';
  }

  G.angleFromFigure = function () {
    const d = pick([30, 45, 55, 70, 110, 125, 140, 160]);
    const name = angleName(d);
    const wrongs = ['Acute angle', 'Right angle', 'Obtuse angle', 'Straight angle', 'Reflex angle']
      .filter(function (x) { return x !== name; });
    const it = mcq('Look at the angle below. What kind of angle is it?', name, shuffle(wrongs).slice(0, 3),
      'It measures ' + d + '°. ' + explainAngle(d, name), 'Is the opening smaller or bigger than a square corner?', 2);
    it.svg = angleSVG(d);
    return it;
  };

  /* ---- geometry: circle ---- */
  G.radiusDiameter = function () {
    const askDiameter = Math.random() < 0.5;
    const r = ri(2, 25);
    if (askDiameter) {
      return {
        id: uid('steps'), type: 'steps',
        q: 'The radius of a circle is <strong>' + r + ' cm</strong>. Find its diameter. Show the working line too.',
        parts: [
          { q: 'Write the formula you will use.', accept: ['diameter = 2 x radius', 'd = 2 x r', 'diameter = 2 x r', 'd = 2r', '2 x radius'], hint: 'Diameter is twice the radius.', why: 'Diameter = 2 × radius' },
          { q: 'Now put the number in (write it like 2 × ' + r + ' cm)', accept: ['2 x ' + r + ' cm', '2 x ' + r, '2x' + r], hint: 'This substitution line earns a mark on its own.', why: '= 2 × ' + r + ' cm' },
          { q: 'Answer (with the unit)', accept: [(2 * r) + ' cm', String(2 * r)], why: '= ' + (2 * r) + ' cm' }
        ],
        explain: 'Diameter = 2 × radius = 2 × ' + r + ' cm = <strong>' + (2 * r) + ' cm</strong>. Never skip the middle line — it carries a mark.',
        level: 2, generated: true
      };
    }
    const d = r * 2;
    return {
      id: uid('steps'), type: 'steps',
      q: 'The diameter of a circle is <strong>' + d + ' cm</strong>. Find its radius. Show the working line too.',
      parts: [
        { q: 'Write the formula you will use.', accept: ['radius = diameter / 2', 'r = d / 2', 'radius = diameter ÷ 2', 'radius = d/2', 'diameter / 2'], hint: 'Radius is half the diameter.', why: 'Radius = diameter ÷ 2' },
        { q: 'Now put the number in (write it like ' + d + ' cm ÷ 2)', accept: [d + ' cm / 2', d + ' / 2', d + '/2', d + ' cm ÷ 2'], hint: 'This substitution line earns a mark on its own.', why: '= ' + d + ' cm ÷ 2' },
        { q: 'Answer (with the unit)', accept: [r + ' cm', String(r)], why: '= ' + r + ' cm' }
      ],
      explain: 'Radius = diameter ÷ 2 = ' + d + ' cm ÷ 2 = <strong>' + r + ' cm</strong>. Never skip the middle line — it carries a mark.',
      level: 2, generated: true
    };
  };

  /* ---- geometry: clock angles ---- */
  G.clockAngle = function () {
    const h = ri(1, 6);
    const deg = h * 30;
    const name = angleName(deg);
    const wrongs = ['Acute angle', 'Right angle', 'Obtuse angle', 'Straight angle', 'Reflex angle'].filter(function (x) { return x !== name; });
    return mcq(
      'At <strong>' + h + " o'clock</strong>, what kind of angle do the two hands make?",
      name, shuffle(wrongs).slice(0, 3),
      'One hour on the clock face is 360° ÷ 12 = 30°. At ' + h + " o'clock the hands are " + h + ' × 30° = ' + deg + '° apart, which is ' + name.toLowerCase() + '.',
      'Each hour mark is 30°.', 3
    );
  };

  function suffix(k) {
    if (k === 1) return 'st'; if (k === 2) return 'nd'; if (k === 3) return 'rd';
    return 'th';
  }

  /* ---------------- public ---------------- */
  HY.gen = G;
  HY.genHelpers = {
    factorsOf: factorsOf, primeFactors: primeFactors, isPrime: isPrime,
    gcd: gcd, lcm: lcm, multiples: multiples, angleName: angleName, angleSVG: angleSVG
  };

  /** Make n fresh items for a skill that declares a generator. */
  HY.generate = function (skill, n) {
    const out = [];
    if (!skill || !skill.gen) return out;
    const names = Array.isArray(skill.gen) ? skill.gen : [skill.gen];
    let guard = 0;
    while (out.length < n && guard++ < n * 6) {
      const fnName = names[out.length % names.length];
      const fn = G[fnName];
      if (!fn) break;
      try {
        const it = fn();
        it.skillId = skill.id;
        out.push(it);
      } catch (_) { break; }
    }
    return out;
  };
})();
