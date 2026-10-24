/* ============================================================
   FRACTIONS & DECIMALS QUEST — engine + app
   Every question is generated fresh from random numbers, the
   answer is checked with exact integer maths (no floating point),
   and a wrong answer shows the worked method for THAT question.
   A skill is mastered at 8 of the last 10 right (min 10 tries).

   Exposes window.FD (engine, used by tools/smoke_fractions_app.js)
   and window.FDQuest.start(hostEl).
   Own localStorage key: crispin_fd_v1. XP goes one-way into the
   host (window.Progress.addXP) when present; silent if absent.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'crispin_fd_v1';
  var XP_REASON = 'Fractions & Decimals Quest';

  /* ============================================================
     EXACT MATHS
     ============================================================ */
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function lcm(a, b) { return a / gcd(a, b) * b; }

  function Frac(n, d) {
    this.n = n; this.d = (d == null) ? 1 : d;
    if (this.d < 0) { this.n = -this.n; this.d = -this.d; }
  }
  Frac.prototype = {
    eq: function (o) { return this.n * o.d === o.n * this.d; },
    cmp: function (o) { var x = this.n * o.d, y = o.n * this.d; return x < y ? -1 : (x > y ? 1 : 0); },
    add: function (o) { return new Frac(this.n * o.d + o.n * this.d, this.d * o.d); },
    sub: function (o) { return new Frac(this.n * o.d - o.n * this.d, this.d * o.d); },
    mul: function (o) { return new Frac(this.n * o.n, this.d * o.d); },
    div: function (o) { return new Frac(this.n * o.d, this.d * o.n); },
    red: function () { var g = gcd(this.n, this.d) || 1; return new Frac(this.n / g, this.d / g); },
    isLowest: function () { return gcd(this.n, this.d) === 1; },
    float: function () { return this.n / this.d; }
  };

  /* decimals are strings -> integer / 10^k. Returns {f} or {err}. */
  function parseDec(s) {
    s = String(s == null ? '' : s).trim();
    if (!s) return { err: 'empty' };
    if (s.indexOf(',') >= 0) return { err: 'comma' };
    var m = /^(\d*)(?:\.(\d*))?$/.exec(s);
    if (!m || (m[1] === '' && (m[2] == null || m[2] === ''))) return { err: 'bad' };
    var ip = m[1] || '0', fp = m[2] || '';
    if (ip.length + fp.length > 12) return { err: 'bad' };
    return { f: new Frac(parseInt(ip + fp, 10), Math.pow(10, fp.length)) };
  }
  /* integer v scaled by 10^k  ->  "12.340" */
  function dstr(v, k) {
    var neg = v < 0, s = String(Math.abs(v));
    if (k > 0) { while (s.length <= k) s = '0' + s; s = s.slice(0, -k) + '.' + s.slice(-k); }
    return (neg ? '-' : '') + s;
  }
  function pow10(k) { return Math.pow(10, k); }

  /* single-box fraction text: "3/4", "1 3/4", "5" */
  function parseFracText(s) {
    s = String(s || '').trim();
    var m = /^(\d+)\s*\/\s*(\d+)$/.exec(s);
    if (m) {
      var d = parseInt(m[2], 10), n = parseInt(m[1], 10);
      if (!d) return { err: 'A denominator can never be 0.' };
      return { f: new Frac(n, d), lowest: gcd(n, d) === 1, mixed: false };
    }
    m = /^(\d+)\s+(\d+)\s*\/\s*(\d+)$/.exec(s);
    if (m) {
      var w = parseInt(m[1], 10), n2 = parseInt(m[2], 10), d2 = parseInt(m[3], 10);
      if (!d2) return { err: 'A denominator can never be 0.' };
      if (n2 >= d2) return { err: 'In a mixed number the fraction part must be smaller than its bottom number.' };
      return { f: new Frac(w * d2 + n2, d2), lowest: gcd(n2, d2) === 1, mixed: true };
    }
    if (/^\d+$/.test(s)) return { f: new Frac(parseInt(s, 10), 1), lowest: true, mixed: true };
    return { err: 'Use whole numbers like 3/4 — or type the top and bottom in the two boxes.' };
  }

  /* ============================================================
     SEEDED RANDOM
     ============================================================ */
  function makeRng(seed) {
    var s = seed >>> 0;
    function next() {
      s = (s + 0x6D2B79F5) >>> 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    return {
      next: next,
      int: function (a, b) { return Math.floor(next() * (b - a + 1)) + a; },
      pick: function (arr) { return arr[Math.floor(next() * arr.length)]; },
      chance: function (p) { return next() < p; },
      shuf: function (arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(next() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
        return a;
      }
    };
  }

  /* ============================================================
     HTML + SVG HELPERS
     ============================================================ */
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function fr(n, d) { return '<span class="fd-fr"><b>' + n + '</b><i>' + d + '</i></span>'; }
  function frF(f) { return f.d === 1 ? String(f.n) : fr(f.n, f.d); }
  function mix(w, n, d) { return '<span class="fd-mix"><span class="fd-mix__w">' + w + '</span>' + fr(n, d) + '</span>'; }
  function box() { return '<span class="fd-box">?</span>'; }
  function money(v) { return 'BD ' + v; }

  var FILL = '#F59E0B', EMPTY = '#FFF4D6', LINE = '#92400E';

  function svgBar(p, s, widths) {
    var W = 300, H = 54, x = 0, i, tot = 0;
    widths = widths || [];
    if (!widths.length) for (i = 0; i < p; i++) widths.push(1);
    for (i = 0; i < p; i++) tot += widths[i];
    var out = '<svg class="fd-svg" viewBox="0 0 ' + (W + 4) + ' ' + (H + 4) + '" role="img" aria-label="A bar cut into ' + p + ' parts, ' + s + ' shaded">';
    for (i = 0; i < p; i++) {
      var w = widths[i] / tot * W;
      out += '<rect x="' + (x + 2).toFixed(1) + '" y="2" width="' + w.toFixed(1) + '" height="' + H + '" fill="' + (i < s ? FILL : EMPTY) + '" stroke="' + LINE + '" stroke-width="2"/>';
      x += w;
    }
    return out + '</svg>';
  }
  function svgPie(p, s) {
    var r = 70, cx = 80, cy = 80, out = '<svg class="fd-svg fd-svg--pie" viewBox="0 0 160 160" role="img" aria-label="A circle cut into ' + p + ' parts, ' + s + ' shaded">';
    for (var i = 0; i < p; i++) {
      var a0 = -Math.PI / 2 + i * 2 * Math.PI / p, a1 = -Math.PI / 2 + (i + 1) * 2 * Math.PI / p;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      out += '<path d="M' + cx + ' ' + cy + ' L' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + r + ' ' + r + ' 0 0 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' Z" fill="' + (i < s ? FILL : EMPTY) + '" stroke="' + LINE + '" stroke-width="2"/>';
    }
    return out + '</svg>';
  }
  function svgGrid(k) {
    var out = '<svg class="fd-svg fd-svg--grid" viewBox="0 0 204 204" role="img" aria-label="A 10 by 10 grid with ' + k + ' squares shaded">';
    for (var i = 0; i < 100; i++) {
      out += '<rect x="' + (2 + (i % 10) * 20) + '" y="' + (2 + Math.floor(i / 10) * 20) + '" width="20" height="20" fill="' + (i < k ? FILL : EMPTY) + '" stroke="' + LINE + '" stroke-width="1"/>';
    }
    return out + '</svg>';
  }
  /* o: divs, dot (index), major (long tick every n), labels {index: text} */
  function svgLine(o) {
    var X0 = 24, X1 = 336, out = '<svg class="fd-svg fd-svg--line" viewBox="0 0 360 86" role="img" aria-label="A number line">';
    out += '<line x1="' + X0 + '" y1="50" x2="' + X1 + '" y2="50" stroke="' + LINE + '" stroke-width="3" stroke-linecap="round"/>';
    for (var i = 0; i <= o.divs; i++) {
      var x = X0 + (X1 - X0) * i / o.divs, major = (i % (o.major || o.divs)) === 0;
      out += '<line x1="' + x.toFixed(1) + '" y1="' + (major ? 40 : 44) + '" x2="' + x.toFixed(1) + '" y2="' + (major ? 60 : 56) + '" stroke="' + LINE + '" stroke-width="2"/>';
      if (o.labels && o.labels[i] != null) out += '<text x="' + x.toFixed(1) + '" y="80" text-anchor="middle" font-size="15" font-weight="700" fill="' + LINE + '">' + o.labels[i] + '</text>';
    }
    var dx = X0 + (X1 - X0) * o.dot / o.divs;
    out += '<circle cx="' + dx.toFixed(1) + '" cy="50" r="8" fill="#E11D48" stroke="#fff" stroke-width="2"/>';
    out += '<text x="' + dx.toFixed(1) + '" y="30" text-anchor="middle" font-size="18" font-weight="800" fill="#E11D48">?</text>';
    return out + '</svg>';
  }

  /* common-division "ladder" for LCM */
  function ladder(nums) {
    var cur = nums.slice(), rows = [], primes = [], p = 2, lcmv = 1;
    function more() { for (var i = 0; i < cur.length; i++) if (cur[i] > 1) return true; return false; }
    while (more()) {
      var any = false, i;
      for (i = 0; i < cur.length; i++) if (cur[i] > 1 && cur[i] % p === 0) any = true;
      if (!any) { p++; continue; }
      rows.push({ p: p, vals: cur.slice() });
      for (i = 0; i < cur.length; i++) if (cur[i] % p === 0) cur[i] = cur[i] / p;
      primes.push(p); lcmv *= p;
    }
    return { rows: rows, last: cur, primes: primes, lcm: lcmv };
  }
  function ladderHTML(l) {
    var h = '<table class="fd-ladder"><tbody>';
    l.rows.forEach(function (r) { h += '<tr><th>' + r.p + '</th><td>' + r.vals.join('</td><td>') + '</td></tr>'; });
    h += '<tr class="fd-ladder__end"><th></th><td>' + l.last.join('</td><td>') + '</td></tr></tbody></table>';
    return h + '<div class="fd-ladder__lcm">LCM = ' + l.primes.join(' × ') + ' = <b>' + l.lcm + '</b></div>';
  }

  /* number -> words (0..999999), no "and" so it never clashes with the decimal "and" */
  var ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function words(n) {
    if (n < 20) return ONES[n];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : '');
    if (n < 1000) return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + words(n % 100) : '');
    return words(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + words(n % 1000) : '');
  }
  function spell(digits) { return digits.split('').map(function (c) { return ONES[+c]; }).join(' '); }
  var PLACE_FRAC = ['', 'tenths', 'hundredths', 'thousandths'];
  function placeName(k, n) { var p = PLACE_FRAC[k]; return (n === 1) ? p.slice(0, -1) : p; }

  /* ============================================================
     QUESTION BUILDERS
     ============================================================ */
  var TF = [{ v: 'T', h: 'True' }, { v: 'F', h: 'False' }];

  function fracQ(sk, angle, prompt, ans, o) {
    o = o || {};
    if (o.simplest) ans = ans.red();
    return {
      skill: sk, angle: angle, prompt: prompt, visual: o.visual || '', hint: o.hint || '', steps: o.steps || [],
      input: { type: 'frac', simplest: !!o.simplest }, answer: ans,
      solution: { n: String(ans.n), d: String(ans.d) },
      show: (o.simplest && ans.d === 1) ? String(ans.n) : frF(ans),
      f: o.f, dens: o.dens || []
    };
  }
  /* mixed-number answer: whole + fraction boxes */
  function mixQ(sk, angle, prompt, ans, o) {
    o = o || {};
    var r = o.simplest ? ans.red() : ans, parts = o.parts;
    if (!parts) { var w = Math.floor(r.n / r.d), rem = r.n % r.d; parts = rem ? { w: String(w), n: String(rem), d: String(r.d) } : { w: String(w), n: '', d: '' }; }
    return {
      skill: sk, angle: angle, prompt: prompt, visual: o.visual || '', hint: o.hint || '', steps: o.steps || [],
      input: { type: 'mixed', mixedRequired: !!o.mixedRequired, simplest: !!o.simplest }, answer: ans,
      solution: parts, show: parts.n ? mix(parts.w, parts.n, parts.d) : parts.w,
      f: o.f, dens: o.dens || []
    };
  }
  function decQ(sk, angle, prompt, ans, str, o) {
    o = o || {};
    return {
      skill: sk, angle: angle, prompt: prompt, visual: o.visual || '', hint: o.hint || '', steps: o.steps || [],
      input: { type: 'dec' }, answer: ans, solution: str, show: str, unit: o.unit || '',
      f: o.f, dens: o.dens || []
    };
  }
  function textQ(sk, angle, prompt, accept, o) {
    o = o || {};
    return {
      skill: sk, angle: angle, prompt: prompt, visual: o.visual || '', hint: o.hint || '', steps: o.steps || [],
      input: { type: 'text' }, accept: accept.map(normText), solution: accept[0], show: esc(accept[0]), dens: []
    };
  }
  function mcqQ(R, sk, angle, prompt, choices, correctV, o) {
    o = o || {};
    var ch = o.keep ? choices : R.shuf(choices), shown = '';
    ch.forEach(function (c) { if (c.v === correctV) shown = c.h; });
    return {
      skill: sk, angle: angle, prompt: prompt, visual: o.visual || '', hint: o.hint || '', steps: o.steps || [],
      input: { type: 'mcq', choices: ch, wide: !!o.wide }, answer: correctV, solution: correctV, show: shown, dens: o.dens || []
    };
  }
  /* items: [{h, val(Frac)}]; dir 'asc'|'desc' */
  function orderQ(R, sk, angle, prompt, items, dir, o) {
    o = o || {};
    var tagged = items.map(function (it, i) { return { v: String(i), h: it.h, val: it.val }; });
    var sorted = tagged.slice().sort(function (a, b) { return dir === 'asc' ? a.val.cmp(b.val) : b.val.cmp(a.val); });
    var ans = sorted.map(function (x) { return x.v; });
    return {
      skill: sk, angle: angle, prompt: prompt, visual: o.visual || '', hint: o.hint || '', steps: o.steps || [],
      input: { type: 'order', items: R.shuf(tagged), dir: dir }, answer: ans, solution: ans,
      show: sorted.map(function (x) { return x.h; }).join(' <span class="fd-sep">,</span> '), dens: o.dens || []
    };
  }
  function tfQ(R, sk, angle, prompt, truth, o) {
    var q = mcqQ(R, sk, angle, prompt, TF, truth ? 'T' : 'F', { keep: true, visual: o && o.visual, hint: o && o.hint, steps: o && o.steps, dens: o && o.dens });
    return q;
  }
  function cmpSign(c) { return c < 0 ? '<' : (c > 0 ? '>' : '='); }
  var CMP = [{ v: '<', h: '&lt;' }, { v: '=', h: '=' }, { v: '>', h: '&gt;' }];
  function cmpQ(R, sk, angle, prompt, a, b, o) {
    return mcqQ(R, sk, angle, prompt, CMP, cmpSign(a.cmp(b)), { keep: true, visual: o.visual, hint: o.hint, steps: o.steps, dens: o.dens });
  }

  function normText(s) {
    return String(s == null ? '' : s).toLowerCase().replace(/[-–—]/g, ' ').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  /* ============================================================
     ANSWER CHECKING
     returns { ok } or { ok:false, note } or { invalid:'friendly message' }
     ============================================================ */
  function clean(s) { return String(s == null ? '' : s).trim(); }
  function check(q, ans) {
    var t = q.input.type, inp = q.input, r, n, d, w;
    if (t === 'frac') {
      n = clean(ans && ans.n); d = clean(ans && ans.d);
      if (!n && !d) return { invalid: 'Type your answer in the boxes first.' };
      if (n && d) {
        if (!/^\d+$/.test(n) || !/^\d+$/.test(d)) return { invalid: 'Use whole numbers in the two boxes.' };
        if (+d === 0) return { invalid: 'A denominator can never be 0.' };
        r = { f: new Frac(+n, +d), lowest: gcd(+n, +d) === 1 };
      } else if (n) {
        r = parseFracText(n);
        if (r.err) return { invalid: r.err };
      } else return { invalid: 'Fill in the top box too.' };
      if (!r.f.eq(q.answer)) return { ok: false };
      if (inp.simplest && !r.lowest) return { ok: false, note: 'That is the right value, but the question asks for the <b>simplest form</b>. Divide the top and bottom by the same number again.' };
      return { ok: true };
    }
    if (t === 'mixed') {
      w = clean(ans && ans.w); n = clean(ans && ans.n); d = clean(ans && ans.d);
      if (!w && !n && !d) return { invalid: 'Type your answer in the boxes first.' };
      var isMixed = false;
      if (!n && !d) {
        if (!/^\d+$/.test(w)) return { invalid: 'Use whole numbers in the boxes.' };
        r = { f: new Frac(+w, 1), lowest: true }; isMixed = true;
      } else if (n && d) {
        if (!/^\d+$/.test(n) || !/^\d+$/.test(d) || (w && !/^\d+$/.test(w))) return { invalid: 'Use whole numbers in the boxes.' };
        if (+d === 0) return { invalid: 'A denominator can never be 0.' };
        if (w) {
          if (+n >= +d) return { invalid: 'In a mixed number the fraction part must be smaller than its bottom number.' };
          r = { f: new Frac(+w * +d + +n, +d), lowest: gcd(+n, +d) === 1 }; isMixed = true;
        } else r = { f: new Frac(+n, +d), lowest: gcd(+n, +d) === 1 };
      } else return { invalid: 'Fill both the top and the bottom of the fraction part.' };
      if (!r.f.eq(q.answer)) return { ok: false };
      if (inp.mixedRequired && !isMixed) return { ok: false, note: 'That is the right value, but the question asks for a <b>mixed number</b> (whole number + fraction).' };
      if (inp.simplest && !r.lowest) return { ok: false, note: 'That is the right value, but the fraction part is not in its <b>simplest form</b> yet.' };
      return { ok: true };
    }
    if (t === 'dec') {
      r = parseDec(ans);
      if (r.err === 'comma') return { invalid: 'Use a point (.) as the decimal point, not a comma.' };
      if (r.err) return { invalid: r.err === 'empty' ? 'Type your answer first.' : 'Type just a number, like 0.5 or 12.' };
      return { ok: r.f.eq(q.answer) };
    }
    if (t === 'text') {
      var x = normText(ans);
      if (!x) return { invalid: 'Type your answer first.' };
      return { ok: q.accept.indexOf(x) >= 0 };
    }
    if (t === 'mcq') {
      if (ans == null || ans === '') return { invalid: 'Tap one of the answers first.' };
      return { ok: String(ans) === String(q.answer) };
    }
    if (t === 'order') {
      if (!ans || ans.length < inp.items.length) return { invalid: 'Tap every card in order first.' };
      return { ok: ans.join(',') === q.answer.join(',') };
    }
    return { ok: false };
  }

  /* how the child's answer is echoed back */
  function showAnswer(q, ans) {
    var t = q.input.type, n, d, w;
    if (t === 'frac') {
      n = clean(ans.n); d = clean(ans.d);
      return (n && d) ? fr(esc(n), esc(d)) : esc(n || d);
    }
    if (t === 'mixed') {
      w = clean(ans.w); n = clean(ans.n); d = clean(ans.d);
      if (n && d) return w ? mix(esc(w), esc(n), esc(d)) : fr(esc(n), esc(d));
      return esc(w);
    }
    if (t === 'mcq') { var h = ''; q.input.choices.forEach(function (c) { if (c.v === ans) h = c.h; }); return h; }
    if (t === 'order') {
      return ans.map(function (v) { var h = ''; q.input.items.forEach(function (c) { if (c.v === v) h = c.h; }); return h; }).join(' <span class="fd-sep">,</span> ');
    }
    return esc(ans);
  }

  /* ============================================================
     GENERATORS — one per skill. Each returns a question object.
     ============================================================ */
  var G = {};

  /* ---------- F1 What is a fraction ---------- */
  G.F1 = function (R) {
    var a = R.int(0, 4), p, s;
    if (a <= 1) {
      p = R.int(2, 10); s = R.int(1, p - 1);
      var circle = p <= 8 && R.chance(0.4), what = circle ? 'circle' : 'bar', vis = circle ? svgPie(p, s) : svgBar(p, s);
      var hint = 'The <b>bottom</b> number says how many equal parts the whole is cut into. The <b>top</b> number counts the parts we want.';
      if (a === 0) return fracQ('F1', 'See it', 'What fraction of the ' + what + ' is <b>shaded</b>?', new Frac(s, p), {
        visual: vis, dens: [p], hint: hint,
        steps: ['Count all the equal parts in the ' + what + ': <b>' + p + '</b>. That is the denominator (bottom).',
          'Count the shaded parts: <b>' + s + '</b>. That is the numerator (top).',
          'Fraction shaded = ' + fr(s, p) + '.']
      });
      return fracQ('F1', 'See it', 'What fraction of the ' + what + ' is <b>NOT</b> shaded?', new Frac(p - s, p), {
        visual: vis, dens: [p], hint: hint,
        steps: ['Count all the equal parts: <b>' + p + '</b> (bottom number).',
          'Count the parts with NO shading: <b>' + (p - s) + '</b> (top number).',
          'Fraction not shaded = ' + fr(p - s, p) + '.  (Check: ' + fr(s, p) + ' + ' + fr(p - s, p) + ' = 1 whole.)']
      });
    }
    if (a === 2) {
      var i, ws = [];
      if (R.chance(0.5)) {
        p = R.int(3, 6);
        for (i = 0; i < p; i++) ws.push(R.int(1, 4));
        var allSame = ws.every(function (x) { return x === ws[0]; });
        if (allSame) ws[0] += 2;
        return tfQ(R, 'F1', 'True or false', 'The bar is cut into ' + p + ' parts. True or false: each part is ' + fr(1, p) + ' of the whole bar.', false, {
          visual: svgBar(p, R.int(1, p - 1), ws), dens: [p],
          hint: 'Look at the sizes of the parts. Are they all the same?',
          steps: ['A fraction only works when the parts are <b>EQUAL</b> in size.', 'These ' + p + ' parts are different sizes, so a part is not ' + fr(1, p) + '.', 'The answer is <b>False</b>.']
        });
      }
      p = R.int(3, 9); s = R.int(1, p - 1);
      var c = R.chance(0.5) ? s : (function () { var z; do { z = R.int(1, p - 1); } while (z === s); return z; })();
      return tfQ(R, 'F1', 'True or false', 'True or false: the shaded part of the bar is ' + fr(c, p) + ' of the whole.', c === s, {
        visual: svgBar(p, s), dens: [p],
        hint: 'Count the shaded parts for the top, and all the parts for the bottom.',
        steps: ['The bar has <b>' + p + '</b> equal parts in all, so the bottom number is ' + p + '.', '<b>' + s + '</b> parts are shaded, so the shaded part is ' + fr(s, p) + '.',
          c === s ? 'That matches ' + fr(c, p) + ' — <b>True</b>.' : fr(c, p) + ' does not match ' + fr(s, p) + ' — <b>False</b>.']
      });
    }
    p = R.int(2, 10); s = R.int(1, p - 1);
    return fracQ('F1', 'Number line', 'The dot is at a fraction on the number line. Which fraction is it?', new Frac(s, p), {
      visual: svgLine({ divs: p, dot: s, labels: { 0: '0', 1e9: '' } }).replace('</svg>', '<text x="336" y="80" text-anchor="middle" font-size="15" font-weight="700" fill="' + LINE + '">1</text></svg>'),
      dens: [p],
      hint: 'The space from 0 to 1 is one whole. Count how many equal jumps it is cut into.',
      steps: ['The line from 0 to 1 is cut into <b>' + p + '</b> equal jumps, so the denominator is ' + p + '.', 'The dot is <b>' + s + '</b> jump' + (s > 1 ? 's' : '') + ' from 0, so the numerator is ' + s + '.', 'The dot is at ' + fr(s, p) + '.']
    });
  };

  /* ---------- F2 Equivalent fractions ---------- */
  var BASES = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6], [2, 7], [3, 7], [4, 7], [3, 8], [5, 8], [7, 8], [2, 9], [4, 9], [3, 10], [7, 10], [5, 12]];
  G.F2 = function (R) {
    var a = R.int(0, 3), b = R.pick(BASES), n = b[0], d = b[1], k, g;
    if (a === 0) {
      k = R.int(2, 9);
      return decQ('F2', 'Missing number', 'Fill the missing number:  <span class="fd-eq">' + fr(n, d) + ' = ' + fr(box(), d * k) + '</span>', new Frac(n * k, 1), String(n * k), {
        dens: [d, d * k], hint: 'What did the bottom number get multiplied by? Do the same to the top.',
        steps: ['Look at the bottoms: ' + d + ' became ' + d * k + '. ' + d + ' × <b>' + k + '</b> = ' + d * k + '.', 'Do the same to the top: ' + n + ' × ' + k + ' = <b>' + n * k + '</b>.', fr(n, d) + ' = ' + fr(n * k, d * k) + '.']
      });
    }
    if (a === 1) {
      k = R.int(2, 9);
      return decQ('F2', 'Missing number', 'Fill the missing number:  <span class="fd-eq">' + fr(n, d) + ' = ' + fr(n * k, box()) + '</span>', new Frac(d * k, 1), String(d * k), {
        dens: [d], hint: 'What did the top number get multiplied by? Do the same to the bottom.',
        steps: ['Look at the tops: ' + n + ' became ' + n * k + '. ' + n + ' × <b>' + k + '</b> = ' + n * k + '.', 'Do the same to the bottom: ' + d + ' × ' + k + ' = <b>' + d * k + '</b>.', fr(n, d) + ' = ' + fr(n * k, d * k) + '.']
      });
    }
    if (a === 2) {
      g = R.pick([2, 3, 4, 5, 6, 7, 8, 9, 10, 12]);
      return fracQ('F2', 'Simplest form', 'Write ' + fr(n * g, d * g) + ' in its <b>simplest form</b>.', new Frac(n, d), {
        simplest: true, dens: [d * g], hint: 'Find a number that goes into both the top and the bottom. Divide both by it. Keep going until no number (except 1) fits both.',
        steps: ['Find the biggest number that divides both ' + n * g + ' and ' + d * g + ': it is <b>' + g + '</b>.', n * g + ' ÷ ' + g + ' = ' + n + ' and ' + d * g + ' ÷ ' + g + ' = ' + d + '.',
          'Nothing except 1 divides both ' + n + ' and ' + d + ', so the simplest form is ' + fr(n, d) + '.']
      });
    }
    var mults = R.shuf([1, 2, 3, 4, 5, 6]).slice(0, 3), opts = [], oddN, oddD, base = new Frac(n, d);
    do {
      var kk = R.pick([2, 3, 4, 5]);
      oddN = R.chance(0.5) ? n * kk + R.pick([-1, 1]) : n * kk; oddD = d * kk;
      if (oddN === n * kk) { oddN = d * kk; oddD = n * kk; }   // swapped top and bottom
    } while (oddN < 1 || oddD < 1 || new Frac(oddN, oddD).eq(base));
    mults.forEach(function (m, i) { opts.push({ v: 'e' + i, n: n * m, d: d * m }); });
    opts.push({ v: 'odd', n: oddN, d: oddD });
    var ch = opts.map(function (o) { return { v: o.v, h: fr(o.n, o.d) }; });
    return mcqQ(R, 'F2', 'Odd one out', 'Three of these fractions are equal. Which is the <b>odd one out</b>?', ch, 'odd', {
      dens: opts.map(function (o) { return o.d; }), hint: 'Simplify each fraction. The odd one out is the one that does not simplify to the same fraction as the others.',
      steps: ['Simplify every fraction:'].concat(opts.map(function (o) { var r = new Frac(o.n, o.d).red(); return fr(o.n, o.d) + ' = ' + fr(r.n, r.d); })).concat(['Three of them are ' + fr(n, d) + '. The odd one out is ' + fr(oddN, oddD) + '.'])
    });
  };

  /* ---------- F3 Compare & order ---------- */
  G.F3 = function (R) {
    var a = R.int(0, 4), d, n1, n2, d1, d2, A, B, L, x, y;
    var promptC = function (A1, B1) { return 'Which sign goes in the box?  <span class="fd-eq">' + A1 + ' <span class="fd-box">?</span> ' + B1 + '</span>'; };
    if (a === 0) {
      d = R.int(3, 12); n1 = R.int(1, d - 1); do { n2 = R.int(1, d - 1); } while (n2 === n1);
      return cmpQ(R, 'F3', 'Same bottom', promptC(fr(n1, d), fr(n2, d)), new Frac(n1, d), new Frac(n2, d), {
        dens: [d], hint: 'Same denominator means same-sized pieces. Just compare the tops.',
        steps: ['Both fractions have the same denominator, ' + d + ', so the pieces are the same size.', 'Compare the numerators: ' + n1 + ' and ' + n2 + '.', fr(n1, d) + ' ' + cmpSign(n1 - n2).replace('<', '&lt;').replace('>', '&gt;') + ' ' + fr(n2, d) + '.']
      });
    }
    if (a === 1) {
      n1 = R.int(1, 5); d1 = R.int(n1 + 1, 12); do { d2 = R.int(n1 + 1, 12); } while (d2 === d1);
      A = new Frac(n1, d1); B = new Frac(n1, d2);
      return cmpQ(R, 'F3', 'Same top', promptC(fr(n1, d1), fr(n1, d2)), A, B, {
        dens: [d1, d2], hint: 'Same top number: think of a pizza. The more slices it is cut into, the smaller each slice is.',
        steps: ['Both tops are ' + n1 + ', so we are taking the same number of pieces.', 'The bigger the bottom number, the smaller each piece. ' + d1 + ' ' + (d1 > d2 ? '&gt;' : '&lt;') + ' ' + d2 + ' so ' + fr(1, d1) + ' is ' + (d1 > d2 ? 'smaller' : 'bigger') + ' than ' + fr(1, d2) + '.', fr(n1, d1) + ' ' + cmpSign(A.cmp(B)).replace('<', '&lt;').replace('>', '&gt;') + ' ' + fr(n1, d2) + '.']
      });
    }
    if (a === 2) {
      d = R.int(3, 12);
      if (R.chance(0.5)) {
        n1 = R.int(Math.max(1, d - 3), d + 3); A = new Frac(n1, d);
        return cmpQ(R, 'F3', 'Benchmark 1', promptC(fr(n1, d), '1'), A, new Frac(1, 1), {
          dens: [d], hint: 'One whole is ' + fr(d, d) + '. Is the top bigger than, smaller than, or equal to the bottom?',
          steps: ['One whole = ' + fr(d, d) + ' (top and bottom the same).', 'Compare the top ' + n1 + ' with the bottom ' + d + '.', n1 === d ? 'They are equal, so the fraction is equal to 1.' : (n1 > d ? 'The top is bigger, so the fraction is more than 1.' : 'The top is smaller, so the fraction is less than 1.')]
        });
      }
      d = R.int(3, 13); n1 = R.int(1, d);
      A = new Frac(n1, d);
      return cmpQ(R, 'F3', 'Benchmark ½', promptC(fr(n1, d), fr(1, 2)), A, new Frac(1, 2), {
        dens: [d], hint: 'Double the top. If it is bigger than the bottom, the fraction is more than ½.',
        steps: ['Easy way to compare with ' + fr(1, 2) + ': double the top and compare it with the bottom.', 'Double the top: ' + n1 + ' × 2 = ' + n1 * 2 + '. The bottom is ' + d + '.',
          n1 * 2 === d ? 'They are equal, so the fraction is exactly ' + fr(1, 2) + '.' : (n1 * 2 > d ? n1 * 2 + ' is more than ' + d + ', so it is bigger than ' + fr(1, 2) + '.' : n1 * 2 + ' is less than ' + d + ', so it is smaller than ' + fr(1, 2) + '.')]
      });
    }
    if (a === 3) {
      if (R.chance(0.2)) {
        var b = R.pick(BASES), m1 = R.int(2, 4), m2 = R.int(5, 7);
        n1 = b[0] * m1; d1 = b[1] * m1; n2 = b[0] * m2; d2 = b[1] * m2;
      } else {
        do { d1 = R.int(2, 12); d2 = R.int(2, 12); } while (d1 === d2 || lcm(d1, d2) > 60);
        n1 = R.int(1, d1 - 1); n2 = R.int(1, d2 - 1);
      }
      A = new Frac(n1, d1); B = new Frac(n2, d2); L = lcm(d1, d2); x = n1 * L / d1; y = n2 * L / d2;
      return cmpQ(R, 'F3', 'Unlike bottoms', promptC(fr(n1, d1), fr(n2, d2)), A, B, {
        dens: [d1, d2], hint: 'The bottoms are different. Change both fractions so they have the same bottom (use the LCM), then compare the tops.',
        steps: ['LCM of ' + d1 + ' and ' + d2 + ' = <b>' + L + '</b>.', fr(n1, d1) + ' = ' + fr(x, L) + ' and ' + fr(n2, d2) + ' = ' + fr(y, L) + '.',
          'Compare the tops: ' + x + ' ' + cmpSign(x - y).replace('<', '&lt;').replace('>', '&gt;') + ' ' + y + ', so ' + fr(n1, d1) + ' ' + cmpSign(A.cmp(B)).replace('<', '&lt;').replace('>', '&gt;') + ' ' + fr(n2, d2) + '.']
      });
    }
    var D = R.pick([12, 12, 20, 24, 30, 36, 60, 16, 18]), divs = [], i, items = [], seen = {};
    for (i = 2; i <= D; i++) if (D % i === 0 && i <= 20) divs.push(i);
    var guard = 0;
    while (items.length < 4 && guard++ < 200) {
      d = R.pick(divs); n1 = R.int(1, d - 1);
      var key = n1 * (D / d);
      if (seen[key]) continue;
      seen[key] = true; items.push({ h: fr(n1, d), val: new Frac(n1, d), n: n1, d: d, top: key });
    }
    var dir = R.chance(0.5) ? 'asc' : 'desc';
    var sortedI = items.slice().sort(function (p1, p2) { return dir === 'asc' ? p1.top - p2.top : p2.top - p1.top; });
    return orderQ(R, 'F3', 'Put in order', 'Tap the fractions in order, from the <b>' + (dir === 'asc' ? 'smallest to the biggest' : 'biggest to the smallest') + '</b>.', items, dir, {
      dens: items.map(function (it) { return it.d; }), hint: 'Change every fraction to the same bottom number (the LCM of all the bottoms), then line up the tops.',
      steps: ['Make the bottoms the same. A common bottom is <b>' + D + '</b>.'].concat(items.map(function (it) { return fr(it.n, it.d) + ' = ' + fr(it.top, D); }))
        .concat(['Order the tops (' + (dir === 'asc' ? 'smallest first' : 'biggest first') + '): ' + sortedI.map(function (it) { return it.top; }).join(', ') + '.', 'So the order is: ' + sortedI.map(function (it) { return fr(it.n, it.d); }).join(' <span class="fd-sep">,</span> ') + '.'])
    });
  };

  /* ---------- F4 Improper <-> mixed ---------- */
  G.F4 = function (R) {
    var a = R.int(0, 3), d, q, r, n, w;
    if (a === 0 || a === 3) {
      if (a === 0) {
        d = R.int(2, 9); q = R.int(1, 6); r = R.chance(0.2) ? 0 : R.int(1, d - 1);
        while (r && gcd(r, d) > 1) r = R.int(1, d - 1);
        n = q * d + r;
        return mixQ('F4', 'Improper to mixed', 'Write ' + fr(n, d) + ' as a <b>mixed number</b> (or a whole number).', new Frac(n, d), {
          mixedRequired: true, simplest: true, dens: [d], hint: 'Divide the top by the bottom. The answer is the whole number; the remainder goes over the same bottom number.',
          steps: ['Divide the numerator by the denominator: ' + n + ' ÷ ' + d + ' = <b>' + q + '</b>' + (r ? ' remainder <b>' + r + '</b>.' : ', with nothing left over.'),
            r ? 'The quotient ' + q + ' is the whole number. The remainder ' + r + ' goes over the same denominator ' + d + '.' : 'It divides exactly, so the answer is just the whole number ' + q + '.',
            n + '/' + d + ' = ' + (r ? mix(q, r, d) : '<b>' + q + '</b>') + '.']
        });
      }
      d = R.int(2, 5); n = R.int(1, 3 * d - 1); while (n % d === 0) n = R.int(1, 3 * d - 1);
      w = Math.floor(n / d); r = n % d;
      var labels = { 0: '0' }; labels[d] = '1'; labels[2 * d] = '2'; labels[3 * d] = '3';
      var vis = svgLine({ divs: 3 * d, dot: n, major: d, labels: labels });
      if (R.chance(0.5)) return mixQ('F4', 'Number line', 'Write the point on the number line as a <b>mixed number</b>.', new Frac(n, d), {
        mixedRequired: true, parts: { w: String(w), n: String(r), d: String(d) }, visual: vis, dens: [d],
        hint: 'Each whole is cut into ' + d + ' equal jumps. Find the last whole number before the dot, then count the extra jumps.',
        steps: ['Each whole is cut into <b>' + d + '</b> equal jumps (the bottom number).', 'The dot is just after the whole number <b>' + w + '</b>, and then <b>' + r + '</b> more jump' + (r > 1 ? 's' : '') + '.', 'Mixed number = ' + mix(w, r, d) + '  (which is ' + fr(n, d) + ').']
      });
      return fracQ('F4', 'Number line', 'Write the point on the number line as an <b>improper fraction</b>.', new Frac(n, d), {
        visual: vis, dens: [d], hint: 'Count every jump from 0. Each whole has ' + d + ' jumps.',
        steps: ['Each whole is cut into <b>' + d + '</b> equal jumps, so the bottom number is ' + d + '.', 'Count every jump from 0 to the dot: <b>' + n + '</b> jumps.', 'The dot is at ' + fr(n, d) + '.']
      });
    }
    d = R.int(2, 9); w = R.int(1, 6); r = R.int(1, d - 1); n = w * d + r;
    if (a === 1) return fracQ('F4', 'Mixed to improper', 'Write ' + mix(w, r, d) + ' as an <b>improper fraction</b>.', new Frac(n, d), {
      dens: [d], hint: 'Whole × bottom, then add the top. Put the answer over the same bottom.',
      steps: ['Use  (W × D) + N  over D.', 'W × D = ' + w + ' × ' + d + ' = ' + w * d + '.', 'Add N: ' + w * d + ' + ' + r + ' = <b>' + n + '</b>.', 'Put it over D = ' + d + ':  ' + mix(w, r, d) + ' = ' + fr(n, d) + '.']
    });
    return fracQ('F4', 'Mixed to improper', 'Convert ' + mix(w, r, d) + ' into an improper fraction. Each whole is made of ' + fr(d, d) + '.', new Frac(n, d), {
      dens: [d], hint: 'Whole × bottom, then add the top. Put the answer over the same bottom.',
      steps: ['Use  (W × D) + N  over D.', 'W × D = ' + w + ' × ' + d + ' = ' + w * d + '  (that is ' + w + ' wholes, each worth ' + fr(d, d) + ').', 'Add N: ' + w * d + ' + ' + r + ' = <b>' + n + '</b>.', 'Answer: ' + fr(n, d) + '.']
    });
  };

  /* ---------- F5 Like fractions ---------- */
  G.F5 = function (R) {
    var a = R.int(0, 5), d = R.int(3, 12), n1, n2;
    if (a === 0) {
      n1 = R.int(1, d - 1); n2 = R.int(1, d - 1); var s = n1 + n2;
      return fracQ('F5', 'Add', 'Add:  <span class="fd-eq">' + fr(n1, d) + ' + ' + fr(n2, d) + '</span>  (simplest form' + (s > d ? '; an improper fraction is fine' : '') + ')', new Frac(s, d), {
        simplest: true, dens: [d], f: n1 / d + n2 / d, hint: 'The bottoms are the same, so keep the bottom and just add the tops.',
        steps: ['The denominators are the same (' + d + '), so keep ' + d + ' as the bottom.', 'Add the numerators: ' + n1 + ' + ' + n2 + ' = ' + s + '.', fr(n1, d) + ' + ' + fr(n2, d) + ' = ' + fr(s, d) + (new Frac(s, d).isLowest() ? '.' : ' = ' + frF(new Frac(s, d).red()) + ' (simplified).')]
      });
    }
    if (a === 1) {
      n1 = R.int(2, d + 3); n2 = R.int(1, n1 - 1); var df = n1 - n2;
      return fracQ('F5', 'Subtract', 'Subtract:  <span class="fd-eq">' + fr(n1, d) + ' − ' + fr(n2, d) + '</span>  (simplest form)', new Frac(df, d), {
        simplest: true, dens: [d], f: n1 / d - n2 / d, hint: 'The bottoms are the same, so keep the bottom and just subtract the tops.',
        steps: ['The denominators are the same (' + d + '), so keep ' + d + ' as the bottom.', 'Subtract the numerators: ' + n1 + ' − ' + n2 + ' = ' + df + '.', fr(n1, d) + ' − ' + fr(n2, d) + ' = ' + fr(df, d) + (new Frac(df, d).isLowest() ? '.' : ' = ' + frF(new Frac(df, d).red()) + ' (simplified).')]
      });
    }
    if (a === 2) {
      n1 = R.int(1, d - 2); n2 = R.int(1, d - 1 - n1); var tot = n1 + n2;
      if (R.chance(0.5)) return decQ('F5', 'Missing number', 'Find the missing number:  <span class="fd-eq">' + fr(n1, d) + ' + ' + fr(box(), d) + ' = ' + fr(tot, d) + '</span>', new Frac(n2, 1), String(n2), {
        dens: [d], hint: 'Think of it backwards: total top minus the top you already have.',
        steps: ['The bottoms are all ' + d + ', so only the tops matter: ' + n1 + ' + ? = ' + tot + '.', '? = ' + tot + ' − ' + n1 + ' = <b>' + n2 + '</b>.', 'Check: ' + fr(n1, d) + ' + ' + fr(n2, d) + ' = ' + fr(tot, d) + '.']
      });
      return decQ('F5', 'Missing number', 'Find the missing number:  <span class="fd-eq">' + fr(tot, d) + ' − ' + fr(box(), d) + ' = ' + fr(n1, d) + '</span>', new Frac(n2, 1), String(n2), {
        dens: [d], hint: 'Think of it backwards: total top minus the top you are left with.',
        steps: ['The bottoms are all ' + d + ', so only the tops matter: ' + tot + ' − ? = ' + n1 + '.', '? = ' + tot + ' − ' + n1 + ' = <b>' + n2 + '</b>.', 'Check: ' + fr(tot, d) + ' − ' + fr(n2, d) + ' = ' + fr(n1, d) + '.']
      });
    }
    if (a === 3) {
      n1 = R.int(2, d - 1); n2 = R.int(Math.max(1, d - n1 - 2), Math.min(d - 1, d - n1 + 2)); var t = n1 + n2;
      var ans = t > d ? 'more' : (t < d ? 'less' : 'same');
      return mcqQ(R, 'F5', 'Estimate', 'Without finishing the sum, is  ' + fr(n1, d) + ' + ' + fr(n2, d) + '  more than 1, less than 1, or exactly 1?',
        [{ v: 'more', h: 'More than 1' }, { v: 'less', h: 'Less than 1' }, { v: 'same', h: 'Exactly 1' }], ans, {
          keep: true, dens: [d], hint: 'One whole is ' + fr(d, d) + '. Add the tops and compare with ' + d + '.',
          steps: ['One whole is ' + fr(d, d) + '.', 'Add the tops: ' + n1 + ' + ' + n2 + ' = ' + t + '. Compare with the bottom ' + d + '.', t > d ? t + ' is more than ' + d + ', so the sum is more than 1.' : (t < d ? t + ' is less than ' + d + ', so the sum is less than 1.' : 'They are equal, so the sum is exactly 1.')]
        });
    }
    if (a === 4) {
      n1 = R.int(1, d - 1); n2 = R.int(1, d - 1);
      return mcqQ(R, 'F5', 'Fix the mistake', 'Sam worked out  ' + fr(n1, d) + ' + ' + fr(n2, d) + ' = ' + fr(n1 + n2, d * 2) + '.  What did Sam do wrong?',
        [{ v: 'ok', h: 'He added the bottom numbers (denominators) as well' }, { v: 'no', h: 'He forgot to add the top numbers' }, { v: 'right', h: 'Nothing — Sam is right' }], 'ok', {
          dens: [d, d * 2], hint: 'Look at the bottom of the answer. Should the size of the pieces change when we add?',
          steps: ['The pieces are all the same size (' + fr(1, d) + '), so the denominator stays <b>' + d + '</b>.', 'Only the numerators are added: ' + n1 + ' + ' + n2 + ' = ' + (n1 + n2) + '.', 'Correct answer: ' + fr(n1 + n2, d) + '. Sam also added the bottoms (' + d + ' + ' + d + ' = ' + d * 2 + ') — that is the mistake.']
        });
    }
    n1 = R.int(1, d - 1); n2 = R.int(1, d - 1);
    var good = R.chance(0.5);
    return tfQ(R, 'F5', 'True or false', 'True or false:  ' + fr(n1, d) + ' + ' + fr(n2, d) + ' = ' + (good ? fr(n1 + n2, d) : fr(n1 + n2, d + d)), good, {
      dens: [d, d + d], hint: 'When the bottoms are the same, the bottom stays the same in the answer.',
      steps: ['The bottoms are the same (' + d + '), so the answer keeps ' + d + ' at the bottom.', 'Add the tops: ' + n1 + ' + ' + n2 + ' = ' + (n1 + n2) + '.', 'The correct sum is ' + fr(n1 + n2, d) + ', so the statement is <b>' + (good ? 'True' : 'False') + '</b>.']
    });
  };

  /* ---------- F6 Unlike fractions (3 steps) ---------- */
  function conv(n, d, L) {
    var m = L / d;
    if (m === 1) return fr(n, d) + ' already has the bottom ' + L;
    return fr(n, d) + ' = ' + fr(n + ' × ' + m, d + ' × ' + m) + ' = ' + fr(n * m, L);
  }
  function unlikeStepsFor(n1, d1, n2, d2, op) {
    var l = ladder([d1, d2]), L = l.lcm, x = n1 * L / d1, y = n2 * L / d2, res = op === '+' ? x + y : x - y;
    var rf = new Frac(res, L);
    return {
      L: L, res: res, steps: [
        '<b>Step 1 — LCM by the ladder.</b> Divide ' + d1 + ' and ' + d2 + ' by a common number until both reach 1.' + ladderHTML(l),
        '<b>Step 2 — Convert</b> both fractions to the bottom ' + L + ':  ' + conv(n1, d1, L) + ';   ' + conv(n2, d2, L) + '.',
        '<b>Step 3 — ' + (op === '+' ? 'Add' : 'Subtract') + '</b> the tops, keep the bottom:  ' + fr(x, L) + ' ' + (op === '+' ? '+' : '−') + ' ' + fr(y, L) + ' = ' + fr(res, L) + (rf.isLowest() ? '.' : ' = ' + frF(rf.red()) + ' (simplest form).')
      ]
    };
  }
  G.F6 = function (R) {
    var a = R.int(0, 5), d1, d2, n1, n2, op, tmp;
    function pickPair() {
      do { d1 = R.int(2, 12); d2 = R.int(2, 12); } while (d1 === d2 || lcm(d1, d2) > 48);
      n1 = R.int(1, d1 - 1); n2 = R.int(1, d2 - 1);
    }
    if (a <= 2) {
      pickPair(); op = R.chance(0.5) ? '+' : '-';
      if (op === '-') {
        var A = new Frac(n1, d1), B = new Frac(n2, d2), c = A.cmp(B);
        if (c === 0) { n2 = n2 === 1 ? 2 : n2 - 1; if (n2 >= d2) n2 = 1; B = new Frac(n2, d2); c = A.cmp(B); }
        if (c < 0) { tmp = n1; n1 = n2; n2 = tmp; tmp = d1; d1 = d2; d2 = tmp; }
        if (new Frac(n1, d1).eq(new Frac(n2, d2))) { pickPair(); op = '+'; }
      }
      var info = unlikeStepsFor(n1, d1, n2, d2, op);
      var val = op === '+' ? n1 / d1 + n2 / d2 : n1 / d1 - n2 / d2;
      return fracQ('F6', 'Work it out', (op === '+' ? 'Add:' : 'Subtract:') + '  <span class="fd-eq">' + fr(n1, d1) + ' ' + (op === '+' ? '+' : '−') + ' ' + fr(n2, d2) + '</span>  (simplest form' + (info.res > info.L ? '; an improper fraction is fine' : '') + ')', new Frac(info.res, info.L), {
        simplest: true, dens: [d1, d2, info.L], f: val, steps: info.steps,
        hint: 'The bottoms are different. Step 1: find the LCM with the ladder. Step 2: change both fractions to that bottom. Step 3: add or subtract the tops.'
      });
    }
    if (a === 3) {
      do { d1 = R.int(2, 12); d2 = R.int(2, 12); } while (d1 === d2 || lcm(d1, d2) > 60);
      var l = ladder([d1, d2]);
      return decQ('F6', 'Step 1 only', 'Use the ladder to find the <b>LCM</b> of ' + d1 + ' and ' + d2 + '.', new Frac(l.lcm, 1), String(l.lcm), {
        dens: [], hint: 'Divide both numbers by a common prime (2, 3, 5 …). When only one number divides, bring the other down. Stop when both are 1, then multiply the numbers on the left.',
        steps: ['Divide ' + d1 + ' and ' + d2 + ' by a common number until both reach 1.' + ladderHTML(l), 'Multiply the numbers down the left side: the LCM is <b>' + l.lcm + '</b>.']
      });
    }
    if (a === 4) {
      do { d1 = R.int(2, 9); d2 = R.int(2, 9); } while (d1 === d2 || lcm(d1, d2) > 36 || lcm(d1, d2) === d1);
      n1 = R.int(1, d1 - 1);
      var LL = lcm(d1, d2), m = LL / d1;
      return decQ('F6', 'Step 2 only', 'The LCM of ' + d1 + ' and ' + d2 + ' is ' + LL + '. Convert:  <span class="fd-eq">' + fr(n1, d1) + ' = ' + fr(box(), LL) + '</span>', new Frac(n1 * m, 1), String(n1 * m), {
        dens: [d1, LL], hint: 'What do you multiply the old bottom by to get the new bottom? Multiply the top by the same number.',
        steps: [d1 + ' × <b>' + m + '</b> = ' + LL + ', so the multiplier is ' + m + '.', 'Multiply the top by the same number: ' + n1 + ' × ' + m + ' = <b>' + n1 * m + '</b>.', fr(n1, d1) + ' = ' + fr(n1 * m, LL) + '.']
      });
    }
    pickPair();
    return mcqQ(R, 'F6', 'Fix the mistake', 'Ria worked out  ' + fr(n1, d1) + ' + ' + fr(n2, d2) + ' = ' + fr(n1 + n2, d1 + d2) + '.  Why is that wrong?',
      [{ v: 'ok', h: 'The bottoms are different, so you must first make them the same (use the LCM)' }, { v: 'x', h: 'You should multiply the tops, not add them' }, { v: 'r', h: 'Nothing — Ria is right' }], 'ok', {
        dens: [d1, d2, d1 + d2], hint: 'Pieces of different sizes cannot be added until they are cut to the same size.',
        steps: ['Fractions with different bottoms are pieces of <b>different sizes</b>, so we cannot just add the tops and bottoms.', 'First find the LCM of ' + d1 + ' and ' + d2 + ' (Step 1) and convert both fractions (Step 2). Only then add the tops (Step 3).'].concat([unlikeStepsFor(n1, d1, n2, d2, '+').steps[2]])
      });
  };

  /* ---------- F7 Multiply fractions ---------- */
  G.F7 = function (R) {
    var a = R.int(0, 5), n1, d1, n2, d2;
    if (a === 0) {
      do { d1 = R.int(2, 9); d2 = R.int(2, 9); n1 = R.int(1, d1 - 1); n2 = R.int(1, d2 - 1); } while (false);
      var P = n1 * n2, Q = d1 * d2, rd = new Frac(P, Q).red();
      return fracQ('F7', 'Work it out', 'Multiply:  <span class="fd-eq">' + fr(n1, d1) + ' × ' + fr(n2, d2) + '</span>  (simplest form)', new Frac(P, Q), {
        simplest: true, dens: [d1, d2, Q], f: (n1 / d1) * (n2 / d2), hint: 'Multiply the tops together and the bottoms together. Then simplify.',
        steps: ['Multiply the numerators: ' + n1 + ' × ' + n2 + ' = ' + P + '.', 'Multiply the denominators: ' + d1 + ' × ' + d2 + ' = ' + Q + '.', fr(n1, d1) + ' × ' + fr(n2, d2) + ' = ' + fr(P, Q) + (new Frac(P, Q).isLowest() ? '.' : ' = ' + frF(rd) + ' (simplest form).')]
      });
    }
    if (a === 1) {
      var w = R.int(2, 9); d1 = R.int(2, 9); n1 = R.int(1, d1 - 1);
      return fracQ('F7', 'Work it out', 'Multiply:  <span class="fd-eq">' + w + ' × ' + fr(n1, d1) + '</span>  (simplest form; an improper fraction is fine)', new Frac(w * n1, d1), {
        simplest: true, dens: [d1], f: w * n1 / d1, hint: 'Write the whole number as ' + fr(w, 1) + ', then multiply tops and bottoms.',
        steps: ['Write ' + w + ' as ' + fr(w, 1) + '.', 'Multiply the tops: ' + w + ' × ' + n1 + ' = ' + w * n1 + '. Multiply the bottoms: 1 × ' + d1 + ' = ' + d1 + '.', 'Answer: ' + fr(w * n1, d1) + (new Frac(w * n1, d1).isLowest() ? '.' : ' = ' + frF(new Frac(w * n1, d1).red()) + ' (simplest form).')]
      });
    }
    if (a === 2) {
      /* fraction of an amount */
      var kind = R.int(0, 3), d, n, k;
      if (kind === 2) {
        d = R.pick([2, 3, 4, 5, 6, 10, 12]); n = R.int(1, d - 1); k = 60 / d;
        return decQ('F7', 'Real life', 'A Rivals match lasts 1 hour. Crispin plays for ' + fr(n, d) + ' of the hour. How many <b>minutes</b> is that?', new Frac(n * k, 1), String(n * k), {
          dens: [d], f: n * 60 / d, hint: '1 hour = 60 minutes. Divide 60 by the bottom number, then multiply by the top.',
          steps: ['1 hour = 60 minutes.', 'Divide 60 by the bottom: 60 ÷ ' + d + ' = ' + k + ' (that is ' + fr(1, d) + ' of an hour).', 'Multiply by the top: ' + k + ' × ' + n + ' = <b>' + n * k + '</b> minutes.'], unit: 'minutes'
        });
      }
      d = R.pick([2, 3, 4, 5, 6, 8, 10]); n = R.int(1, d - 1); k = R.int(2, 12);
      var tot = d * k * (kind === 0 ? 10 : 1), part = tot / d * n, text;
      if (kind === 0) text = 'Crispin has ' + tot + ' Robux and spends ' + fr(n, d) + ' of it on a skin. How many <b>Robux</b> is the skin?';
      else if (kind === 1) text = 'Ronaldo scored ' + tot + ' goals this season. ' + fr(n, d) + ' of them were free kicks. How many <b>free kicks</b>?';
      else text = 'A football shirt costs BD ' + tot + '. The discount is ' + fr(n, d) + ' of the price. How many <b>BD</b> is the discount?';
      return decQ('F7', 'Real life', text, new Frac(part, 1), String(part), {
        dens: [d], f: n * tot / d, hint: '"Of" means multiply. Divide by the bottom number first, then multiply by the top.',
        steps: ['Divide by the bottom: ' + tot + ' ÷ ' + d + ' = ' + tot / d + ' (this is ' + fr(1, d) + ' of ' + tot + ').', 'Multiply by the top: ' + tot / d + ' × ' + n + ' = <b>' + part + '</b>.', fr(n, d) + ' of ' + tot + ' = ' + part + '.']
      });
    }
    if (a === 3) {
      d1 = R.int(2, 12); n1 = R.int(1, d1 - 1);
      var zeroFirst = R.chance(0.5);
      return fracQ('F7', 'Multiply by 0', 'Work out:  <span class="fd-eq">' + (zeroFirst ? '0 × ' + fr(n1, d1) : fr(n1, d1) + ' × 0') + '</span>', new Frac(0, 1), {
        dens: [d1], f: 0, hint: 'What is any number multiplied by 0?',
        steps: ['Anything multiplied by 0 gives 0 — fractions too.', 'Tops: ' + n1 + ' × 0 = 0. So the answer is ' + fr(0, d1) + ' = <b>0</b>.']
      });
    }
    if (a === 4) {
      d = R.pick([2, 3, 4, 5, 6, 8]); n = R.int(1, d - 1); k = R.int(2, 9);
      return decQ('F7', 'Missing number', 'Find the missing number:  <span class="fd-eq">' + fr(n, d) + ' of ' + box() + ' = ' + n * k + '</span>', new Frac(d * k, 1), String(d * k), {
        dens: [d], hint: n + ' parts out of ' + d + ' equal parts make ' + n * k + '. Find what ONE part is first.',
        steps: [fr(n, d) + ' of the number = ' + n * k + ', so ' + n + (n === 1 ? ' part' : ' parts') + ' = ' + n * k + '.', 'One part = ' + n * k + ' ÷ ' + n + ' = ' + k + '.', 'The whole has ' + d + ' parts: ' + k + ' × ' + d + ' = <b>' + d * k + '</b>.', 'Check: ' + fr(n, d) + ' of ' + d * k + ' = ' + n * k + '.']
      });
    }
    d1 = R.int(2, 9); n1 = R.int(1, d1 - 1); d2 = R.int(2, 9); n2 = R.int(1, d2 - 1);
    var tru = R.chance(0.5);
    return tfQ(R, 'F7', 'True or false', 'True or false:  ' + fr(n1, d1) + ' × ' + fr(n2, d2) + ' = ' + (tru ? fr(n1 * n2, d1 * d2) : fr(n1 + n2, d1 + d2)), tru, {
      dens: [d1, d2, d1 * d2, d1 + d2], hint: 'To multiply fractions: multiply the tops, and multiply the bottoms.',
      steps: ['Multiply the tops: ' + n1 + ' × ' + n2 + ' = ' + n1 * n2 + '. Multiply the bottoms: ' + d1 + ' × ' + d2 + ' = ' + d1 * d2 + '.', 'The correct answer is ' + fr(n1 * n2, d1 * d2) + ', so the statement is <b>' + (tru ? 'True' : 'False') + '</b>.']
    });
  };

  /* ---------- F8 Reciprocal & divide ---------- */
  G.F8 = function (R) {
    var a = R.int(0, 5), n, d, c, e, w;
    if (a === 0) {
      n = R.int(1, 9); d = R.int(2, 12);
      if (R.chance(0.25)) {
        w = R.int(2, 12);
        return fracQ('F8', 'Reciprocal', 'Find the <b>M.I</b> (multiplicative inverse, the reciprocal) of ' + w + '.', new Frac(1, w), {
          dens: [w], f: 1 / w, hint: 'Write the whole number as ' + fr(w, 1) + ', then flip it.',
          steps: ['Write ' + w + ' as ' + fr(w, 1) + '.', 'Flip it (swap top and bottom): ' + fr(1, w) + '.', 'Check: ' + w + ' × ' + fr(1, w) + ' = 1.  The M.I of ' + w + ' is <b>' + fr(1, w) + '</b>.']
        });
      }
      return fracQ('F8', 'Reciprocal', 'Find the <b>M.I</b> (multiplicative inverse, the reciprocal) of ' + fr(n, d) + '.', new Frac(d, n), {
        dens: [d, n], f: d / n, hint: 'Flip the fraction: the top becomes the bottom and the bottom becomes the top.',
        steps: ['Flip the fraction — swap the top and the bottom: ' + fr(n, d) + ' → ' + fr(d, n) + '.', 'Check: ' + fr(n, d) + ' × ' + fr(d, n) + ' = ' + fr(n * d, d * n) + ' = 1.', 'The M.I of ' + fr(n, d) + ' is <b>' + fr(d, n) + '</b>.']
      });
    }
    if (a <= 3) {
      n = R.int(1, 8); d = R.int(2, 9); c = R.int(1, 8); e = R.int(2, 9);
      var A = new Frac(n, d), B = new Frac(c, e), res = A.div(B), askText, steps, hint;
      hint = 'Keep the first fraction, Change ÷ to ×, Flip the second fraction (its M.I). Then multiply and simplify.';
      if (a === 3) {
        w = R.int(2, 9);
        if (R.chance(0.5)) {   /* fraction ÷ whole */
          res = new Frac(n, d * w);
          return fracQ('F8', 'Work it out', 'Divide:  <span class="fd-eq">' + fr(n, d) + ' ÷ ' + w + '</span>  (simplest form)', res, {
            simplest: true, dens: [d, w, d * w], f: n / d / w, hint: hint,
            steps: ['<b>Keep</b> ' + fr(n, d) + '.', '<b>Change</b> ÷ to ×.', '<b>Flip</b> the divisor: the M.I of ' + w + ' is ' + fr(1, w) + '.', fr(n, d) + ' × ' + fr(1, w) + ' = ' + fr(n, d * w) + (res.isLowest() ? '.' : ' = ' + frF(res.red()) + ' (simplest form).')]
          });
        }
        res = new Frac(w * e, c);
        return fracQ('F8', 'Work it out', 'Divide:  <span class="fd-eq">' + w + ' ÷ ' + fr(c, e) + '</span>  (simplest form; an improper fraction is fine)', res, {
          simplest: true, dens: [e, c], f: w / (c / e), hint: hint,
          steps: ['<b>Keep</b> ' + w + ' (as ' + fr(w, 1) + ').', '<b>Change</b> ÷ to ×.', '<b>Flip</b> the divisor: the M.I of ' + fr(c, e) + ' is ' + fr(e, c) + '.', fr(w, 1) + ' × ' + fr(e, c) + ' = ' + fr(w * e, c) + (res.isLowest() ? '.' : ' = ' + frF(res.red()) + ' (simplest form).')]
        });
      }
      return fracQ('F8', 'Work it out', 'Divide:  <span class="fd-eq">' + fr(n, d) + ' ÷ ' + fr(c, e) + '</span>  (simplest form' + (res.n > res.d ? '; an improper fraction is fine' : '') + ')', res, {
        simplest: true, dens: [d, e, c, d * c], f: (n / d) / (c / e), hint: hint,
        steps: ['<b>Keep</b> the first fraction: ' + fr(n, d) + '.', '<b>Change</b> ÷ to ×.', '<b>Flip</b> the second fraction — write the M.I of the divisor: M.I of ' + fr(c, e) + ' = ' + fr(e, c) + '.',
          fr(n, d) + ' × ' + fr(e, c) + ' = ' + fr(n * e, d * c) + (new Frac(n * e, d * c).isLowest() ? '.' : ' = ' + frF(res.red()) + ' (simplest form).')]
      });
    }
    if (a === 4) {
      n = R.int(1, 9); d = R.int(2, 10);
      var pick = R.int(0, 2);
      if (pick === 0) {
        return fracQ('F8', 'Missing number', 'Find the missing number:  <span class="fd-eq">' + fr(n, d) + ' × ' + box() + ' = 1</span>', new Frac(d, n), {
          dens: [d, n], hint: 'Which number makes a product of 1? It is the M.I (flip).',
          steps: ['A number times its M.I (reciprocal) is always 1.', 'So the missing number is the M.I of ' + fr(n, d) + ', which is <b>' + fr(d, n) + '</b>.', 'Check: ' + fr(n, d) + ' × ' + fr(d, n) + ' = 1.']
        });
      }
      if (pick === 1) {
        var good = new Frac(d, n), wrongs = [new Frac(n, d), new Frac(d + 1, n), new Frac(d, n + 1), new Frac(d - n, d)];
        var opts = [{ v: 'ok', h: frF(good) }], seenV = [good];
        wrongs.forEach(function (wf, i) {
          if (wf.d < 1 || wf.n < 1) return;
          if (seenV.some(function (s) { return s.eq(wf) && s.n === wf.n; })) return;
          if (wf.eq(good)) return;
          if (opts.length < 4) { seenV.push(wf); opts.push({ v: 'w' + i, h: frF(wf) }); }
        });
        return mcqQ(R, 'F8', 'Pick the M.I', 'Which fraction is the <b>M.I</b> (reciprocal) of ' + fr(n, d) + '?', opts, 'ok', {
          dens: [d, n].concat(opts.map(function () { return 1; })), hint: 'The M.I is the flip of the fraction.',
          steps: ['The M.I is found by flipping the fraction: the top and bottom swap places.', 'M.I of ' + fr(n, d) + ' = <b>' + fr(d, n) + '</b>.']
        });
      }
      var pool = [
        { t: 'The M.I of 0 does not exist, because 1 ÷ 0 cannot be worked out.', v: true, s: 'Flipping ' + fr(0, 1) + ' would put 0 on the bottom, and a denominator can never be 0. So 0 has no M.I.' },
        { t: 'The M.I of 1 is 1.', v: true, s: '1 × 1 = 1, so 1 is its own M.I.' },
        { t: 'The M.I of ' + fr(n, d) + ' is ' + fr(d, n) + '.', v: true, s: 'Flip ' + fr(n, d) + ' and you get ' + fr(d, n) + '.' },
        { t: 'The M.I of ' + fr(n, d) + ' is ' + fr(n, d) + '.', v: n === d, s: 'The M.I is the flip: ' + fr(d, n) + '. It is not the same fraction (unless top and bottom are equal).' },
        { t: 'Dividing by ' + fr(n, d) + ' is the same as multiplying by ' + fr(d, n) + '.', v: true, s: 'Keep, Change, Flip: dividing by a fraction = multiplying by its M.I.' },
        { t: 'Dividing by ' + fr(n, d) + ' is the same as multiplying by ' + fr(n, d) + '.', v: n === d, s: 'You must flip the divisor first: multiply by its M.I ' + fr(d, n) + '.' }
      ];
      var st = R.pick(pool);
      return tfQ(R, 'F8', 'True or false', 'True or false: ' + st.t, st.v, { dens: [d, n, 1], hint: 'Remember: M.I means flip, and 0 cannot be flipped.', steps: [st.s, 'So the statement is <b>' + (st.v ? 'True' : 'False') + '</b>.'] });
    }
    n = R.int(1, 7); d = R.int(2, 9); c = R.int(1, 6); e = R.int(2, 9);
    var dv = new Frac(n, d).div(new Frac(c, e)), mul = new Frac(n, d).mul(new Frac(e, c));
    var rightV = R.chance(0.5);
    return tfQ(R, 'F8', 'Fix the mistake', 'Nia did  ' + fr(n, d) + ' ÷ ' + fr(c, e) + ' = ' + fr(n, d) + ' × ' + (rightV ? fr(e, c) : fr(c, e)) + '.  Is her first step right?', rightV, {
      dens: [d, e, c], hint: 'Keep, Change, Flip: which fraction should be flipped?',
      steps: ['Rule: <b>Keep</b> the first fraction, <b>Change</b> ÷ to ×, <b>Flip</b> the divisor (use its M.I).', 'The divisor is ' + fr(c, e) + ', so it must become ' + fr(e, c) + '.', 'Right first step: ' + fr(n, d) + ' × ' + fr(e, c) + '. So Nia is <b>' + (rightV ? 'right' : 'wrong') + '</b>.']
    });
  };

  /* ---------- F9 Word problems ---------- */
  function wp(kind, prompt, ans, o) {  /* kind: 'frac' | 'int' | 'dec' */
    o = o || {};
    if (kind === 'frac') return fracQ(o.sk || 'F9', o.angle || 'Real life', prompt, ans, { simplest: true, dens: o.dens, f: o.f, steps: o.steps, hint: o.hint });
    var q = decQ(o.sk || 'F9', o.angle || 'Real life', prompt, ans, o.str || String(ans.n), { dens: o.dens, f: o.f, steps: o.steps, hint: o.hint, unit: o.unit });
    return q;
  }
  var DEN2 = [[2, 3], [2, 4], [2, 5], [3, 4], [3, 5], [3, 6], [4, 5], [4, 6], [5, 6], [2, 6], [4, 8], [3, 8], [5, 10]];
  var WP = [
    function (R) {   /* goals, like fractions */
      var d = R.int(5, 12), n1 = R.int(1, d - 3), n2 = R.int(1, d - 1 - n1);
      return wp('frac', 'Ronaldo scored ' + fr(n1, d) + ' of his team\'s goals in the first half and ' + fr(n2, d) + ' of the team\'s goals in the second half. What fraction of the team\'s goals did he score <b>altogether</b>?', new Frac(n1 + n2, d), {
        dens: [d], f: (n1 + n2) / d, hint: 'Both parts are out of the same ' + d + '. Add the tops.',
        steps: ['"Altogether" means add.', 'The bottoms are the same (' + d + '), so add the tops: ' + n1 + ' + ' + n2 + ' = ' + (n1 + n2) + '.', fr(n1, d) + ' + ' + fr(n2, d) + ' = ' + fr(n1 + n2, d) + (new Frac(n1 + n2, d).isLowest() ? '.' : ' = ' + frF(new Frac(n1 + n2, d).red()) + ' (simplest form).')]
      });
    },
    function (R) {   /* goals, unlike */
      var p, d1, d2, n1, n2;
      do { p = R.pick(DEN2); d1 = p[0]; d2 = p[1]; n1 = 1; n2 = 1; } while (new Frac(1, d1).add(new Frac(1, d2)).cmp(new Frac(1, 1)) >= 0);
      var info = unlikeStepsFor(n1, d1, n2, d2, '+');
      return wp('frac', 'This season Ronaldo scored ' + fr(1, d1) + ' of his team\'s goals with headers and another ' + fr(1, d2) + ' of his team\'s goals with free kicks. What fraction of the team\'s goals did he score <b>altogether</b>?', new Frac(info.res, info.L), {
        dens: [d1, d2, info.L], f: 1 / d1 + 1 / d2, steps: info.steps, hint: 'Different bottoms: find the LCM, convert, then add.'
      });
    },
    function (R) {   /* penalties */
      var d = R.pick([2, 4, 5, 10]), n = R.int(1, d - 1), t = d * R.int(2, 6);
      return wp('int', 'Ronaldo takes ' + t + ' penalties in a season and scores ' + fr(n, d) + ' of them. How many penalties does he <b>score</b>?', new Frac(n * t / d, 1), {
        dens: [d], f: n * t / d, unit: 'penalties', hint: '"Of" means multiply: divide by the bottom, then multiply by the top.',
        steps: ['Find ' + fr(n, d) + ' of ' + t + '.', 'Divide by the bottom: ' + t + ' ÷ ' + d + ' = ' + t / d + '.', 'Multiply by the top: ' + t / d + ' × ' + n + ' = <b>' + n * t / d + '</b>.']
      });
    },
    function (R) {   /* penalties missed (the rest) */
      var d = R.pick([2, 4, 5, 10]), n = R.int(1, d - 1), t = d * R.int(2, 6), sc = n * t / d;
      return wp('int', 'Ronaldo takes ' + t + ' penalties and scores ' + fr(n, d) + ' of them. How many does he <b>miss</b>?', new Frac(t - sc, 1), {
        dens: [d], f: t - sc, unit: 'penalties', hint: 'First find how many he scores. "Miss" means the rest, so take that away from the total.',
        steps: ['Scored: ' + fr(n, d) + ' of ' + t + ' = ' + t + ' ÷ ' + d + ' × ' + n + ' = ' + sc + '.', 'Missed = the rest: ' + t + ' − ' + sc + ' = <b>' + (t - sc) + '</b>.']
      });
    },
    function (R) {   /* Robux of */
      var d = R.pick([2, 4, 5, 8, 10]), n = R.int(1, d - 1), t = d * R.int(2, 12) * 10, sp = t / d * n;
      return wp('int', 'Crispin has ' + t + ' Robux. He spends ' + fr(n, d) + ' of them on a new skin. How many Robux does the skin cost?', new Frac(sp, 1), {
        dens: [d], f: sp, unit: 'Robux', hint: '"Of" means multiply: divide by the bottom, then multiply by the top.',
        steps: [t + ' ÷ ' + d + ' = ' + t / d + '.', t / d + ' × ' + n + ' = <b>' + sp + '</b> Robux.']
      });
    },
    function (R) {   /* Robux left */
      var d = R.pick([2, 4, 5, 8, 10]), n = R.int(1, d - 1), t = d * R.int(2, 12) * 10, sp = t / d * n;
      return wp('int', 'Crispin has ' + t + ' Robux. He spends ' + fr(n, d) + ' of them on a skin. How many Robux does he have <b>left</b>?', new Frac(t - sp, 1), {
        dens: [d], f: t - sp, unit: 'Robux', hint: 'Find what he spent, then take it away from what he had.',
        steps: ['Spent: ' + t + ' ÷ ' + d + ' × ' + n + ' = ' + sp + ' Robux.', 'Left = the rest: ' + t + ' − ' + sp + ' = <b>' + (t - sp) + '</b> Robux.']
      });
    },
    function (R) {   /* Robux fraction left */
      var p, a, b;
      do { p = R.pick(DEN2); a = p[0]; b = p[1]; } while (new Frac(1, a).add(new Frac(1, b)).cmp(new Frac(1, 1)) >= 0);
      var spent = new Frac(1, a).add(new Frac(1, b)), left = new Frac(1, 1).sub(spent), L = lcm(a, b);
      return wp('frac', 'Crispin spends ' + fr(1, a) + ' of the Robux he started with on a skin and ' + fr(1, b) + ' of the Robux he started with on an emote. What fraction of his Robux is <b>left</b>?', left, {
        dens: [a, b, L], f: 1 - 1 / a - 1 / b, hint: 'Add what he spent (find the LCM). Then take it away from 1 whole.',
        steps: ['Spent altogether: ' + fr(1, a) + ' + ' + fr(1, b) + ' = ' + fr(L / a, L) + ' + ' + fr(L / b, L) + ' = ' + fr(L / a + L / b, L) + '.', 'The whole is 1 = ' + fr(L, L) + ', so left = ' + fr(L, L) + ' − ' + fr(L / a + L / b, L) + ' = ' + fr(L - L / a - L / b, L) + (new Frac(L - L / a - L / b, L).isLowest() ? '.' : ' = ' + frF(left.red()) + ' (simplest form).')]
      });
    },
    function (R) {   /* Rivals match minutes */
      var d = R.pick([2, 3, 4, 5, 6, 10, 12]), n = R.int(1, d - 1), m = 60 / d * n;
      return wp('int', 'One Rivals match lasts ' + fr(n, d) + ' of an hour. How many <b>minutes</b> is that?', new Frac(m, 1), {
        dens: [d], f: m, unit: 'minutes', hint: '1 hour = 60 minutes. Find ' + fr(n, d) + ' of 60.',
        steps: ['1 hour = 60 minutes.', '60 ÷ ' + d + ' = ' + 60 / d + '.', 60 / d + ' × ' + n + ' = <b>' + m + '</b> minutes.']
      });
    },
    function (R) {   /* Rivals time altogether */
      var p = R.pick(DEN2), d1 = p[0], d2 = p[1];
      var info = unlikeStepsFor(1, d1, 1, d2, '+');
      return wp('frac', 'Crispin plays Rivals for ' + fr(1, d1) + ' of an hour, then plays again for ' + fr(1, d2) + ' of an hour. For what fraction of an hour does he play <b>altogether</b>?', new Frac(info.res, info.L), {
        dens: [d1, d2, info.L], f: 1 / d1 + 1 / d2, steps: info.steps, hint: 'Different bottoms: find the LCM, convert, then add.'
      });
    },
    function (R) {   /* pizza left */
      var d = R.pick([6, 8, 10, 12]), n1 = R.int(1, Math.floor(d / 2) - 1) || 1, n2 = R.int(1, d - 1 - n1), left = d - n1 - n2;
      return wp('frac', 'After the match, a pizza is cut into ' + d + ' equal slices. Crispin eats ' + n1 + ' slices and his friend eats ' + n2 + ' slices. What fraction of the pizza is <b>left</b>?', new Frac(left, d), {
        dens: [d], f: left / d, hint: 'Count the slices that are left, then write them over the total number of slices.',
        steps: ['Eaten: ' + n1 + ' + ' + n2 + ' = ' + (n1 + n2) + ' slices.', 'Left = the rest: ' + d + ' − ' + (n1 + n2) + ' = ' + left + ' slices.', 'Fraction left = ' + fr(left, d) + (new Frac(left, d).isLowest() ? '.' : ' = ' + frF(new Frac(left, d).red()) + ' (simplest form).')]
      });
    },
    function (R) {   /* pizza shared */
      var n = R.int(1, 3), d = R.int(2, 5), m = R.int(2, 5), res = new Frac(n, d * m);
      return wp('frac', fr(n, d) + ' of a pizza is left after the match. Crispin shares it equally among ' + m + ' friends. What fraction of the <b>whole pizza</b> does each friend get?', res, {
        dens: [d, m, d * m], f: n / d / m, hint: 'Sharing equally means divide. Keep, Change, Flip.',
        steps: ['Divide ' + fr(n, d) + ' by ' + m + '.', '<b>Keep</b> ' + fr(n, d) + ', <b>Change</b> ÷ to ×, <b>Flip</b> ' + m + ' to its M.I ' + fr(1, m) + '.', fr(n, d) + ' × ' + fr(1, m) + ' = ' + fr(n, d * m) + (new Frac(n, d * m).isLowest() ? '.' : ' = ' + frF(res.red()) + ' (simplest form).')]
      });
    },
    function (R) {   /* BD discount */
      var d = R.pick([2, 4, 5, 10]), n = R.int(1, d - 1), p = d * R.int(2, 10), disc = p / d * n, pay = p - disc;
      return wp('int', 'A football costs BD ' + p + '. In the sale the price drops by ' + fr(n, d) + '. How many <b>BD</b> do you pay?', new Frac(pay, 1), {
        dens: [d], f: pay, unit: 'BD', hint: 'Find the discount first. You pay the rest.',
        steps: ['Discount: ' + p + ' ÷ ' + d + ' × ' + n + ' = ' + disc + ' BD.', 'You pay the rest: ' + p + ' − ' + disc + ' = <b>' + pay + '</b> BD.']
      });
    },
    function (R) {   /* class of pupils */
      var d = R.pick([2, 3, 4, 5, 6, 8, 10]), n = R.int(1, d - 1), N = d * R.int(3, 8), cnt = N / d * n;
      if (R.chance(0.5)) return wp('int', 'In Crispin\'s class of ' + N + ' pupils, ' + fr(n, d) + ' play football at break. How many pupils is that?', new Frac(cnt, 1), {
        dens: [d], f: cnt, unit: 'pupils', hint: '"Of" means multiply: divide by the bottom, then multiply by the top.',
        steps: [N + ' ÷ ' + d + ' = ' + N / d + '.', N / d + ' × ' + n + ' = <b>' + cnt + '</b> pupils.']
      });
      return wp('frac', 'In Crispin\'s class, ' + fr(n, d) + ' of the pupils walk to school. What fraction of the class does <b>not</b> walk?', new Frac(d - n, d), {
        dens: [d], f: (d - n) / d, hint: 'The whole class is ' + fr(d, d) + '. Take away the walkers.',
        steps: ['The whole class = 1 = ' + fr(d, d) + '.', 'Not walking = ' + fr(d, d) + ' − ' + fr(n, d) + ' = ' + fr(d - n, d) + (new Frac(d - n, d).isLowest() ? '.' : ' = ' + frF(new Frac(d - n, d).red()) + ' (simplest form).')]
      });
    },
    function (R) {   /* water bottle: fraction of fraction */
      var d1 = R.pick([2, 3, 4, 5]), n1 = R.int(1, d1) === d1 ? 1 : R.int(1, d1 - 1), d2 = R.pick([2, 3, 4, 5]), n2 = R.int(1, d2 - 1);
      var res = new Frac(n1 * n2, d1 * d2);
      return wp('frac', 'Crispin\'s water bottle holds ' + fr(n1, d1) + ' litre. He drinks ' + fr(n2, d2) + ' of the water. How many <b>litres</b> does he drink?', res, {
        dens: [d1, d2, d1 * d2], f: (n1 / d1) * (n2 / d2), hint: '"Of" means multiply the two fractions.',
        steps: ['"Of" means ×:  ' + fr(n2, d2) + ' × ' + fr(n1, d1) + '.', 'Tops: ' + n2 + ' × ' + n1 + ' = ' + n1 * n2 + '. Bottoms: ' + d2 + ' × ' + d1 + ' = ' + d1 * d2 + '.', 'Answer: ' + fr(n1 * n2, d1 * d2) + (res.isLowest() ? '' : ' = ' + frF(res.red()) + ' (simplest form)') + ' litre.']
      });
    },
    function (R) {   /* water bottle: how many cups (divide) */
      var gn = 1, gd = R.pick([4, 5, 8, 10]), cnt = R.int(2, 6), bottle = new Frac(cnt * gn, gd);
      return wp('int', 'A bottle holds ' + frF(bottle.red()) + ' litre of water. Each cup holds ' + fr(gn, gd) + ' litre. How many cups can Crispin fill?', new Frac(cnt, 1), {
        dens: [gd, bottle.red().d], f: cnt, unit: 'cups', hint: 'How many times does the cup size fit into the bottle? That is a division.',
        steps: [frF(bottle.red()) + ' ÷ ' + fr(gn, gd) + '.', '<b>Keep</b> ' + frF(bottle.red()) + ', <b>Change</b> ÷ to ×, <b>Flip</b> the divisor: M.I of ' + fr(gn, gd) + ' = ' + fr(gd, gn) + '.', frF(bottle.red()) + ' × ' + fr(gd, gn) + ' = <b>' + cnt + '</b> cups.']
      });
    }
  ];
  G.F9 = function (R) { return R.pick(WP)(R); };

  /* ---------- Ronaldo's Challenge (harder, two-step) ---------- */
  var HARD = [
    function (R) {   /* Robux: fraction of the rest */
      var d1 = R.pick([3, 4, 5, 6]), n1 = R.int(1, d1 - 1), d2 = R.pick([2, 3, 4, 5]), n2 = R.int(1, d2 - 1), k = R.int(1, 4) * 5;
      var R0 = d1 * d2 * k, skin = R0 / d1 * n1, rest = R0 - skin, emote = rest / d2 * n2;
      return wp('int', 'Crispin has ' + R0 + ' Robux. He spends ' + fr(n1, d1) + ' of them on a skin. Then he spends ' + fr(n2, d2) + ' of the <b>Robux that are left</b> on an emote. How many Robux does the emote cost?', new Frac(emote, 1), {
        sk: 'CH', dens: [d1, d2], f: emote, unit: 'Robux', hint: 'Step 1: find the skin and what is left. Step 2: find the fraction of what is left.',
        steps: ['Skin: ' + R0 + ' ÷ ' + d1 + ' × ' + n1 + ' = ' + skin + ' Robux.', 'Left: ' + R0 + ' − ' + skin + ' = ' + rest + ' Robux.', 'Emote: ' + fr(n2, d2) + ' of ' + rest + ' = ' + rest + ' ÷ ' + d2 + ' × ' + n2 + ' = <b>' + emote + '</b> Robux.']
      });
    },
    function (R) {   /* goals: others */
      var p = R.pick(DEN2), d1 = p[0], d2 = p[1], L = lcm(d1, d2), G0 = L * R.int(1, 4), g1 = G0 / d1, g2 = G0 / d2;
      return wp('int', 'Al Nassr scored ' + G0 + ' goals in a season. Ronaldo scored ' + fr(1, d1) + ' of the team\'s goals and Mané scored ' + fr(1, d2) + ' of the team\'s goals. How many goals did the <b>rest of the team</b> score?', new Frac(G0 - g1 - g2, 1), {
        sk: 'CH', dens: [d1, d2], f: G0 - g1 - g2, unit: 'goals', hint: 'Find each player\'s goals, then take both away from the team total.',
        steps: ['Ronaldo: ' + G0 + ' ÷ ' + d1 + ' = ' + g1 + ' goals.', 'Mané: ' + G0 + ' ÷ ' + d2 + ' = ' + g2 + ' goals.', 'The rest: ' + G0 + ' − ' + g1 + ' − ' + g2 + ' = <b>' + (G0 - g1 - g2) + '</b> goals.']
      });
    },
    function (R) {   /* rivals: matches x fraction of hour */
      var d = R.pick([2, 3, 4, 5, 6, 10]), n = R.int(1, d - 1), m = R.int(2, 5), per = 60 / d * n;
      return wp('int', 'Each Rivals match lasts ' + fr(n, d) + ' of an hour. Crispin plays ' + m + ' matches. How many <b>minutes</b> does he play in total?', new Frac(per * m, 1), {
        sk: 'CH', dens: [d], f: per * m, unit: 'minutes', hint: 'First change ' + fr(n, d) + ' of an hour into minutes, then multiply by the number of matches.',
        steps: ['One match: ' + fr(n, d) + ' of 60 minutes = 60 ÷ ' + d + ' × ' + n + ' = ' + per + ' minutes.', 'Total: ' + per + ' × ' + m + ' = <b>' + per * m + '</b> minutes.']
      });
    },
    function (R) {   /* pizza: fraction left, unlike */
      var p, d1, d2;
      do { p = R.pick(DEN2); d1 = p[0]; d2 = p[1]; } while (new Frac(1, d1).add(new Frac(1, d2)).cmp(new Frac(1, 1)) >= 0 || d1 === d2);
      var eaten = new Frac(1, d1).add(new Frac(1, d2)), left = new Frac(1, 1).sub(eaten), L = lcm(d1, d2);
      return wp('frac', 'After the match, Crispin eats ' + fr(1, d1) + ' of a pizza and his friend eats ' + fr(1, d2) + ' of the pizza. What fraction of the pizza is <b>left</b>? (simplest form)', left, {
        sk: 'CH', dens: [d1, d2, L], f: 1 - 1 / d1 - 1 / d2, hint: 'Add what was eaten (find the LCM), then take it away from 1 whole.',
        steps: ['Eaten: ' + fr(1, d1) + ' + ' + fr(1, d2) + ' = ' + fr(L / d1, L) + ' + ' + fr(L / d2, L) + ' = ' + fr(L / d1 + L / d2, L) + '.', 'Left: 1 − ' + fr(L / d1 + L / d2, L) + ' = ' + fr(L, L) + ' − ' + fr(L / d1 + L / d2, L) + ' = ' + fr(L - L / d1 - L / d2, L) + (new Frac(L - L / d1 - L / d2, L).isLowest() ? '.' : ' = ' + frF(left.red()) + ' (simplest form).')]
      });
    },
    function (R) {   /* BD decimals: change */
      var a = R.int(2, 9) * 1000 + R.pick([250, 500, 750, 100, 350, 450, 650, 950]), b = R.int(1, 6) * 1000 + R.pick([250, 500, 750, 100, 350]), pay = Math.ceil((a + b) / 5000) * 5000 + (R.chance(0.5) ? 5000 : 0);
      if (pay === a + b) pay += 5000;   /* never BD 0.000 change */
      var change = pay - a - b;
      return decQ('CH', 'Real life', 'A football shirt costs BD ' + dstr(a, 3) + ' and a pair of boots costs BD ' + dstr(b, 3) + '. Crispin pays with BD ' + dstr(pay, 3) + '. How much <b>change</b> in BD does he get?', new Frac(change, 1000), dstr(change, 3), {
        f: change / 1000, dens: [], unit: 'BD', hint: 'Add the two prices first, then take that total away from what he paid. Line up the decimal points.',
        steps: ['Total cost: ' + dstr(a, 3) + ' + ' + dstr(b, 3) + ' = ' + dstr(a + b, 3) + ' BD.', 'Change: ' + dstr(pay, 3) + ' − ' + dstr(a + b, 3) + ' = <b>' + dstr(change, 3) + '</b> BD.']
      });
    }
  ];
  HARD.push(function (R) {
    var d = R.pick([3, 4, 5, 6]), n = R.int(1, d - 1), m = R.int(2, 4), k = R.int(2, 6), T = d * m * k, fee = T / d * n;
    return wp('int', 'Crispin\'s team wins ' + T + ' Robux. ' + fr(n, d) + ' of the prize pays the entry fee. The rest is shared equally among ' + m + ' players. How many Robux does <b>each player</b> get?', new Frac((T - fee) / m, 1), {
      sk: 'CH', dens: [d], f: (T - fee) / m, unit: 'Robux', hint: 'Find the fee, take it away to get the rest, then share the rest.',
      steps: ['Fee: ' + T + ' ÷ ' + d + ' × ' + n + ' = ' + fee + ' Robux.', 'The rest: ' + T + ' − ' + fee + ' = ' + (T - fee) + ' Robux.', 'Each player: ' + (T - fee) + ' ÷ ' + m + ' = <b>' + (T - fee) / m + '</b> Robux.']
    });
  });
  G.CH = function (R) { return R.pick(HARD)(R); };

  /* ---------- D1 Tenths, hundredths, thousandths ---------- */
  G.D1 = function (R) {
    var a = R.int(0, 3), k, n, v;
    if (a === 0) {
      k = R.int(1, 3); n = R.int(1, pow10(k) - 1);
      while (n % 10 === 0) n = R.int(1, pow10(k) - 1);
      return decQ('D1', 'Fraction to decimal', 'Write ' + fr(n, pow10(k)) + ' as a <b>decimal</b>.', new Frac(n, pow10(k)), dstr(n, k), {
        dens: [pow10(k)], hint: 'The denominator tells you the decimal places: 10 → 1 place, 100 → 2 places, 1000 → 3 places.',
        steps: ['The denominator is ' + pow10(k) + ', so there are <b>' + k + '</b> decimal place' + (k > 1 ? 's' : '') + ' (' + PLACE_FRAC[k] + ').', 'Write the numerator ' + n + ' with its last digit in the ' + PLACE_FRAC[k] + ' place' + (String(n).length < k ? ', filling empty places with zeros' : '') + '.', fr(n, pow10(k)) + ' = <b>' + dstr(n, k) + '</b>.']
      });
    }
    if (a === 1) {
      n = R.int(1, 99);
      return decQ('D1', 'See it', 'The 10 × 10 grid is one whole. Write the shaded part as a <b>decimal</b>.', new Frac(n, 100), dstr(n, 2), {
        visual: svgGrid(n), dens: [100], hint: 'The grid has 100 small squares. Count the shaded ones — that is the number of hundredths.',
        steps: ['The grid has 100 equal squares, so each square is one hundredth (' + fr(1, 100) + ' = 0.01).', 'Count the shaded squares: <b>' + n + '</b>. So ' + fr(n, 100) + '.', 'As a decimal: <b>' + dstr(n, 2) + '</b>.']
      });
    }
    if (a === 2) {
      var w = R.pick([0, 0, 0, 1, 2, 3, 5]), t = R.int(1, 9);
      v = w * 10 + t;
      var labels = {}; labels[0] = String(w); labels[10] = String(w + 1);
      return decQ('D1', 'Number line', 'What decimal is shown by the dot on the number line?', new Frac(v, 10), dstr(v, 1), {
        visual: svgLine({ divs: 10, dot: t, labels: labels }), dens: [10], hint: 'The space between ' + w + ' and ' + (w + 1) + ' is cut into 10 equal jumps. Each jump is one tenth (0.1).',
        steps: ['From ' + w + ' to ' + (w + 1) + ' there are 10 equal jumps, so each jump is 0.1 (one tenth).', 'The dot is <b>' + t + '</b> jump' + (t > 1 ? 's' : '') + ' after ' + w + '.', 'The dot is at <b>' + dstr(v, 1) + '</b>.']
      });
    }
    k = R.int(1, 3); n = R.int(1, pow10(k) - 1); while (n % 10 === 0) n = R.int(1, pow10(k) - 1);
    var kk = k === 1 ? 2 : k;
    var nn = n; if (k === 1) nn = n;
    var D = pow10(R.int(Math.max(k, 1), 3)), kd = Math.round(Math.log(D) / Math.LN10);
    var num = n * pow10(kd - k);
    return decQ('D1', 'Missing number', 'Fill the missing number:  <span class="fd-eq">' + dstr(n, k) + ' = ' + fr(box(), D) + '</span>', new Frac(num, 1), String(num), {
      dens: [D], hint: 'The bottom number is ' + D + ', so write the decimal with ' + kd + ' decimal places and read the number without the point.',
      steps: ['The denominator ' + D + ' has ' + kd + ' zero' + (kd > 1 ? 's' : '') + ', so write ' + dstr(n, k) + ' with <b>' + kd + '</b> decimal place' + (kd > 1 ? 's' : '') + ': ' + dstr(n * pow10(kd - k), kd) + '.', 'Without the point, that is ' + num + ' ' + PLACE_FRAC[kd] + '.', dstr(n, k) + ' = ' + fr(num, D) + '.  The missing number is <b>' + num + '</b>.']
    });
  };

  /* ---------- D2 Place value ---------- */
  var POS_NAMES = ['ones', 'tens', 'hundreds'];
  function digitsLayout(R, wd, fd) {
    var pool = R.shuf([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, wd + fd);
    return { whole: pool.slice(0, wd), frac: pool.slice(wd) };
  }
  G.D2 = function (R) {
    var a = R.int(0, 3), wd = R.int(1, 3), fd = R.int(1, 3), L = digitsLayout(R, wd, fd), i;
    function numHTML(ul) {
      var s = '';
      L.whole.forEach(function (dg, j) { s += (ul === 'w' + j) ? '<u class="fd-ul">' + dg + '</u>' : dg; });
      s += '.';
      L.frac.forEach(function (dg, j) { s += (ul === 'f' + j) ? '<u class="fd-ul">' + dg + '</u>' : dg; });
      return '<span class="fd-bignum">' + s + '</span>';
    }
    function nameOf(key) { return key.charAt(0) === 'w' ? POS_NAMES[wd - 1 - +key.slice(1)] : PLACE_FRAC[+key.slice(1) + 1]; }
    function valueOf(key) {
      var idx = +key.slice(1);
      if (key.charAt(0) === 'w') { var dg = L.whole[idx], e = wd - 1 - idx; return { str: String(dg * pow10(e)), f: new Frac(dg * pow10(e), 1) }; }
      var dg2 = L.frac[idx]; return { str: dstr(dg2, idx + 1), f: new Frac(dg2, pow10(idx + 1)) };
    }
    var keys = []; for (i = 0; i < wd; i++) keys.push('w' + i); for (i = 0; i < fd; i++) keys.push('f' + i);
    var key = R.pick(keys), nm = nameOf(key);
    var digit = key.charAt(0) === 'w' ? L.whole[+key.slice(1)] : L.frac[+key.slice(1)];
    if (a === 0) {
      var all = ['ones', 'tens', 'hundreds', 'tenths', 'hundredths', 'thousandths'], ds = [nm];
      var mirror = { tens: 'tenths', tenths: 'tens', hundreds: 'hundredths', hundredths: 'hundreds', ones: 'tenths', thousandths: 'hundredths' }[nm];
      if (mirror && ds.indexOf(mirror) < 0) ds.push(mirror);
      R.shuf(all).forEach(function (x) { if (ds.length < 4 && ds.indexOf(x) < 0) ds.push(x); });
      return mcqQ(R, 'D2', 'Name the place', 'The <u class="fd-ul">underlined</u> digit is in the ___ place.<div class="fd-bigwrap">' + numHTML(key) + '</div>', ds.map(function (x) { return { v: x, h: x }; }), nm, {
        dens: [], hint: 'Left of the decimal point: ones, tens, hundreds. Right of the point: tenths, hundredths, thousandths (they end in -ths).',
        steps: ['Find the decimal point. Digits to the <b>' + (key.charAt(0) === 'w' ? 'left' : 'right') + '</b> of the point.', key.charAt(0) === 'w' ? 'Counting from the point leftwards: ones, tens, hundreds.' : 'Counting from the point rightwards: tenths, hundredths, thousandths.', 'The digit <b>' + digit + '</b> is in the <b>' + nm + '</b> place.']
      });
    }
    if (a === 1) {
      var vv = valueOf(key);
      return decQ('D2', 'Place value', 'What is the <b>place value</b> of the <u class="fd-ul">underlined</u> digit?<div class="fd-bigwrap">' + numHTML(key) + '</div>', vv.f, vv.str, {
        dens: [], hint: 'Name the place first. Then the value is the digit times that place (e.g. 5 in the tenths place = 5 × 0.1).',
        steps: ['The underlined digit is <b>' + digit + '</b>, in the <b>' + nm + '</b> place.', 'Place value = digit × the value of the place.', 'So the place value is <b>' + vv.str + '</b>.']
      });
    }
    if (a === 2) {
      var pk = R.pick(keys), pname = nameOf(pk), pdigit = pk.charAt(0) === 'w' ? L.whole[+pk.slice(1)] : L.frac[+pk.slice(1)];
      var chs = L.whole.concat(L.frac).map(function (dg) { return { v: String(dg), h: String(dg) }; });
      return mcqQ(R, 'D2', 'Which digit?', 'Which digit is in the <b>' + pname + '</b> place?<div class="fd-bigwrap">' + numHTML('') + '</div>', chs, String(pdigit), {
        dens: [], hint: 'Find the decimal point first. Then count the places away from it.',
        steps: ['Find the decimal point.', pk.charAt(0) === 'w' ? 'Left of the point: ones, tens, hundreds (moving left).' : 'Right of the point: tenths, hundredths, thousandths (moving right).', 'The digit in the ' + pname + ' place is <b>' + pdigit + '</b>.']
      });
    }
    var g = R.int(2, 9), lay = ['tens', 'ones', 'tenths', 'hundredths', 'thousandths'], tgt = R.int(0, 4), choose = R.shuf([0, 1, 2, 3, 4]).slice(0, 4);
    if (choose.indexOf(tgt) < 0) choose[0] = tgt;
    var others = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function (x) { return x !== g; });
    var tgtValue = [g * 10, g, dstr(g, 1), dstr(g, 2), dstr(g, 3)][tgt];
    var cc = choose.map(function (pos) {
      var ds2 = R.shuf(others).slice(0, 4), arr = ds2.slice(); arr[pos] = g;
      var s = arr[0] + '' + arr[1] + '.' + arr[2] + arr[3] + arr[4];
      return { v: 'p' + pos, h: '<span class="fd-bignum fd-bignum--sm">' + s + '</span>' };
    });
    /* arr has 4 others + we need 5 digits: rebuild properly */
    cc = choose.map(function (pos) {
      var ds3 = R.shuf(others).slice(0, 5), arr2 = ds3.slice(); arr2[pos] = g;
      return { v: 'p' + pos, h: '<span class="fd-bignum fd-bignum--sm">' + arr2[0] + arr2[1] + '.' + arr2[2] + arr2[3] + arr2[4] + '</span>' };
    });
    return mcqQ(R, 'D2', 'Which number?', 'In which number does the digit <b>' + g + '</b> have the value <b>' + tgtValue + '</b>?', cc, 'p' + tgt, {
      wide: true, dens: [], hint: 'Find the digit ' + g + ' in each number and name its place. Which place has the value ' + tgtValue + '?',
      steps: ['A digit ' + g + ' is worth <b>' + tgtValue + '</b> when it sits in the <b>' + lay[tgt] + '</b> place.', 'Look for the number with ' + g + ' in the ' + lay[tgt] + ' place — the correct choice is highlighted.']
    });
  };

  /* ---------- D3 Decimals in words ---------- */
  function wordsPoint(w, k, f) { return words(w) + ' point ' + spell(dstr(f, k).split('.')[1]); }
  function wordsPlace(w, k, f) {
    if (w === 0) return words(f) + ' ' + placeName(k, f);
    return words(w) + ' and ' + words(f) + ' ' + placeName(k, f);
  }
  G.D3 = function (R) {
    var a = R.int(0, 3), k = R.int(1, 3), w = R.pick([0, 0, 3, 7, 12, 25, 48, 94, 120, 305]), f = R.int(1, pow10(k) - 1);
    while (f % 10 === 0) f = R.int(1, pow10(k) - 1);
    var dec = dstr(w * pow10(k) + f, k), pt = wordsPoint(w, k, f), pl = wordsPlace(w, k, f);
    if (w === 0 && R.chance(0.5)) { pt = 'zero point ' + spell(dec.split('.')[1]); }
    if (a === 0) {
      var form = R.chance(0.5) ? pt : pl;
      return decQ('D3', 'Words to number', 'Write this as a decimal number:<div class="fd-says">' + form + '</div>', new Frac(w * pow10(k) + f, pow10(k)), dec, {
        dens: [], hint: form === pt ? 'After the word "point", say each digit one by one.' : 'The last word names the place of the last digit: tenths, hundredths or thousandths.',
        steps: form === pt ? ['The whole-number part comes first: <b>' + w + '</b>.', 'After "point", each word is one digit: ' + spell(dec.split('.')[1]) + ' → <b>' + dec.split('.')[1] + '</b>.', 'Put them together: <b>' + dec + '</b>.']
          : ['The last word is <b>' + placeName(k, f) + '</b>, so the last digit sits in the ' + PLACE_FRAC[k] + ' place (' + k + ' decimal place' + (k > 1 ? 's' : '') + ').', (w ? 'Whole part: ' + w + '. ' : '') + 'Fraction part: ' + words(f) + ' = ' + f + ' ' + PLACE_FRAC[k] + ' → ' + dstr(f, k).split('.')[1] + '.', 'Together: <b>' + dec + '</b>.']
      });
    }
    if (a <= 2) {
      var correct = a === 1 ? pt : pl, valid = [pt, pl, 'zero point ' + spell(dec.split('.')[1])];
      var cands = [];
      cands.push(words(w) + ' point ' + words(f));                              // fraction digits read as a whole number
      for (var j = 1; j <= 3; j++) if (j !== k) cands.push((w === 0 ? '' : words(w) + ' and ') + words(f) + ' ' + placeName(j, f));   // wrong place name
      cands.push((w === 0 ? '' : words(w) + ' and ') + words(f) + ' ' + ({ 1: 'tens', 2: 'hundred', 3: 'thousand' }[k]));          // dropped the "-ths"
      if (w >= 10) cands.push(spell(String(w)) + ' point ' + spell(dec.split('.')[1]));                                       // whole part read digit by digit
      cands.push(words(w * pow10(k) + f));                                                                                    // point ignored
      var uniq = [];
      cands.forEach(function (c) { c = c.trim(); if (valid.indexOf(c) < 0 && uniq.indexOf(c) < 0 && c !== correct) uniq.push(c); });
      var dis = R.shuf(uniq).slice(0, 3);
      var ch = [{ v: 'ok', h: esc(correct) }].concat(dis.map(function (x, i) { return { v: 'x' + i, h: esc(x) }; }));
      return mcqQ(R, 'D3', 'Number to words', 'How do you read <span class="fd-bignum fd-bignum--sm">' + dec + '</span> in words?', ch, 'ok', {
        wide: true, dens: [], hint: 'Check the whole part, then the decimal part, then the place name (tenths, hundredths, thousandths).',
        steps: ['Whole part: <b>' + words(w) + '</b>.', 'There are <b>' + k + '</b> digit' + (k > 1 ? 's' : '') + ' after the point, so the last place is <b>' + PLACE_FRAC[k] + '</b>.', 'Two correct ways to say it: "' + pt + '" or "' + pl + '". The right choice is: <b>' + esc(correct) + '</b>.']
      });
    }
    var lastDigit = dec.charAt(dec.length - 1);
    return textQ('D3', 'Name the place', 'In <span class="fd-bignum fd-bignum--sm">' + dec + '</span>, the last digit <b>' + lastDigit + '</b> is in the ___ place. Type the place name (for example: tenths).', [PLACE_FRAC[k], PLACE_FRAC[k].slice(0, -1)], {
      hint: 'Count the digits after the point: 1 = tenths, 2 = hundredths, 3 = thousandths.',
      steps: ['Count the digits after the decimal point: <b>' + k + '</b>.', '1 digit → tenths, 2 digits → hundredths, 3 digits → thousandths.', 'The last digit is in the <b>' + PLACE_FRAC[k] + '</b> place.']
    });
  };

  /* ---------- D4 Expanded form ---------- */
  var PLACES5 = [
    { f: new Frac(10, 1), val: 10, dh: '10', fh: '10' }, { f: new Frac(1, 1), val: 1, dh: '1', fh: '1' },
    { f: new Frac(1, 10), val: 0.1, dh: '0.1', fh: fr(1, 10) }, { f: new Frac(1, 100), val: 0.01, dh: '0.01', fh: fr(1, 100) }, { f: new Frac(1, 1000), val: 0.001, dh: '0.001', fh: fr(1, 1000) }
  ];
  function termStr(form, dg, pi) {
    var P = PLACES5[pi];
    if (form === 0) return pi < 2 ? String(dg * P.val) : dstr(dg, pi - 1);
    return '(' + dg + ' × ' + (form === 1 ? P.dh : P.fh) + ')';
  }
  function expansion(form, terms) { return terms.map(function (t) { return termStr(form, t.dg, t.pi); }).join(' + '); }
  G.D4 = function (R) {
    var a = R.int(0, 2), form = R.int(0, 2), dgs = [], i, terms = [], lastPi = R.int(2, 4), startPi = R.int(0, 1);
    for (i = startPi; i <= lastPi; i++) dgs.push(i === startPi || i === lastPi ? R.int(1, 9) : (R.chance(0.3) ? 0 : R.int(1, 9)));
    dgs.forEach(function (dg, j) { if (dg) terms.push({ dg: dg, pi: startPi + j }); });
    /* value in units of 10^-(lastPi-1): a digit at place pi weighs 10^(lastPi-pi) */
    var scaled = 0;
    terms.forEach(function (t) { scaled += t.dg * pow10(lastPi - t.pi); });
    var places = lastPi - 1;               // decimal places of the answer
    var total = scaled;
    var numStr = dstr(total, places);
    var sums = terms.map(function (t) { return termStr(0, t.dg, t.pi); });
    if (a <= 1) {
      var steps = ['Work out each part: ' + terms.map(function (t) { return termStr(form, t.dg, t.pi) + ' = ' + (t.pi < 2 ? t.dg * PLACES5[t.pi].val : dstr(t.dg, t.pi - 1)); }).join(',  ') + '.',
        'Write each digit in its own place. A place with no part gets a <b>0</b>.', 'Put them together: <b>' + numStr + '</b>.'];
      return decQ('D4', 'Expanded to number', 'Write the number:<div class="fd-says">' + expansion(form, terms) + '</div>', new Frac(total, pow10(places)), numStr, {
        dens: [10, 100, 1000], hint: 'Each part tells you a digit and its place. Put each digit in its place; a missing place is a zero.', steps: steps
      });
    }
    var correct = expansion(form, terms), cands = [], tries = 0;
    function variant() {
      var t2 = terms.map(function (t) { return { dg: t.dg, pi: t.pi }; }), idx = R.int(0, t2.length - 1), mode = R.int(0, 2);
      if (mode === 0) { var np = t2[idx].pi + R.pick([-1, 1]); if (np < 0 || np > 4 || t2.some(function (t) { return t.pi === np; })) return null; t2[idx].pi = np; }
      else if (mode === 1) { if (t2.length < 2) return null; var i1 = 0, i2 = t2.length - 1, tmp = t2[i1].dg; t2[i1].dg = t2[i2].dg; t2[i2].dg = tmp; }
      else { var ndg = R.int(1, 9); if (ndg === t2[idx].dg) return null; t2[idx].dg = ndg; }
      return expansion(form, t2);
    }
    while (cands.length < 3 && tries++ < 80) { var v = variant(); if (v && v !== correct && cands.indexOf(v) < 0) cands.push(v); }
    var chs = [{ v: 'ok', h: correct }].concat(cands.map(function (c, i) { return { v: 'x' + i, h: c }; }));
    return mcqQ(R, 'D4', 'Number to expanded', 'Which is the correct expanded form of <span class="fd-bignum fd-bignum--sm">' + numStr + '</span>?', chs, 'ok', {
      wide: true, dens: [10, 100, 1000], hint: 'Break the number into its digits. Name each place, and multiply each digit by its place value.',
      steps: ['Name the place of each digit in ' + numStr + ' (zeros need no part).', 'Multiply each digit by its place value: ' + correct + '.', 'The others have a digit in the wrong place or the wrong digit.']
    });
  };

  /* ---------- D5 Decimal <-> fraction ---------- */
  G.D5 = function (R) {
    var a = R.int(0, 4), k = R.int(1, 3), n = R.int(1, pow10(k) - 1);
    while (n % 10 === 0) n = R.int(1, pow10(k) - 1);
    if (a === 0) return fracQ('D5', 'Decimal to fraction', 'Write <b>' + dstr(n, k) + '</b> as a fraction.', new Frac(n, pow10(k)), {
      dens: [pow10(k)], hint: 'Count the decimal places. 1 place → over 10, 2 places → over 100, 3 places → over 1000.',
      steps: [dstr(n, k) + ' has <b>' + k + '</b> decimal place' + (k > 1 ? 's' : '') + ', so the denominator is <b>' + pow10(k) + '</b>.', 'The numerator is the digits without the point: <b>' + n + '</b>.', dstr(n, k) + ' = ' + fr(n, pow10(k)) + (new Frac(n, pow10(k)).isLowest() ? '.' : '  (you may also simplify it to ' + frF(new Frac(n, pow10(k)).red()) + ').')]
    });
    if (a === 1) {
      var num = n + (R.chance(0.2) ? pow10(k) : 0);
      return decQ('D5', 'Fraction to decimal', 'Write ' + fr(num, pow10(k)) + ' as a <b>decimal</b>.', new Frac(num, pow10(k)), dstr(num, k), {
        dens: [pow10(k)], hint: 'The number of zeros in the denominator = the number of decimal places.',
        steps: ['The denominator ' + pow10(k) + ' has <b>' + k + '</b> zero' + (k > 1 ? 's' : '') + ', so the decimal has ' + k + ' place' + (k > 1 ? 's' : '') + '.', 'Write ' + num + ' and put the point ' + k + ' place' + (k > 1 ? 's' : '') + ' from the right.', fr(num, pow10(k)) + ' = <b>' + dstr(num, k) + '</b>.']
      });
    }
    if (a === 2) {
      var opts = [], ds = [1, 2, 3], dv = new Frac(n, pow10(k));
      ds.forEach(function (j) { opts.push({ v: 'j' + j, n: n, d: pow10(j) }); });
      opts.push({ v: 'plus', n: n + 1, d: pow10(k) });
      var ch = []; var seen = [];
      opts.forEach(function (o) { if (seen.indexOf(o.n + '/' + o.d) < 0) { seen.push(o.n + '/' + o.d); ch.push({ v: o.v, h: fr(o.n, o.d), n: o.n, d: o.d }); } });
      var good = null;
      ch.forEach(function (c) { if (new Frac(c.n, c.d).eq(dv)) good = c.v; });
      var onlyOne = ch.filter(function (c) { return new Frac(c.n, c.d).eq(dv); }).length === 1;
      if (!onlyOne || ch.length < 3) return G.D5(R);
      return mcqQ(R, 'D5', 'Pick the fraction', 'Which fraction is equal to <b>' + dstr(n, k) + '</b>?', ch.map(function (c) { return { v: c.v, h: c.h }; }), good, {
        dens: ch.map(function (c) { return c.d; }), hint: 'Count the decimal places to get the denominator, then write the digits on top.',
        steps: [dstr(n, k) + ' has ' + k + ' decimal place' + (k > 1 ? 's' : '') + ', so the denominator is ' + pow10(k) + '.', 'The digits ' + n + ' go on top: ' + fr(n, pow10(k)) + '.']
      });
    }
    if (a === 3) {
      var j2 = R.int(1, 3), truth = j2 === k;
      return tfQ(R, 'D5', 'True or false', 'True or false:  <b>' + dstr(n, k) + '</b> = ' + fr(n, pow10(j2)), truth, {
        dens: [pow10(j2)], hint: 'Count the decimal places in the decimal and compare with the zeros in the denominator.',
        steps: [dstr(n, k) + ' has ' + k + ' decimal place' + (k > 1 ? 's' : '') + ', so it should be over ' + pow10(k) + ': ' + fr(n, pow10(k)) + '.', truth ? 'That matches, so the statement is <b>True</b>.' : 'The statement has ' + pow10(j2) + ' on the bottom, so it is <b>False</b>.']
      });
    }
    var w = R.int(1, 9), k2 = R.int(1, 2), n2 = R.int(1, pow10(k2) - 1);
    while (n2 % 10 === 0) n2 = R.int(1, pow10(k2) - 1);
    return mixQ('D5', 'Mixed number', 'Write <b>' + dstr(w * pow10(k2) + n2, k2) + '</b> as a <b>mixed number</b>.', new Frac(w * pow10(k2) + n2, pow10(k2)), {
      mixedRequired: true, parts: { w: String(w), n: String(n2), d: String(pow10(k2)) }, dens: [pow10(k2)], hint: 'The whole number stays. Turn the part after the point into a fraction with 10, 100 or 1000 on the bottom.',
      steps: ['The whole-number part is <b>' + w + '</b>.', 'The part after the point is 0.' + dstr(n2, k2).split('.')[1] + ' = ' + fr(n2, pow10(k2)) + '.', dstr(w * pow10(k2) + n2, k2) + ' = ' + mix(w, n2, pow10(k2)) + '.']
    });
  };

  /* ---------- D6 Compare & order decimals ---------- */
  function randDecStr(R, forceTrailing) {
    var k = R.int(1, 3), w = R.int(0, 9), f = R.int(1, pow10(k) - 1);
    if (!forceTrailing) while (f % 10 === 0) f = R.int(1, pow10(k) - 1);
    return dstr(w * pow10(k) + f, k);
  }
  function dv(s) { return parseDec(s).f; }
  function padTo(s, k) { var p = s.split('.'), fp = p[1] || ''; while (fp.length < k) fp += '0'; return p[0] + '.' + fp; }
  function places(s) { return (s.split('.')[1] || '').length; }
  G.D6 = function (R) {
    var a = R.int(0, 3), s1, s2, w;
    if (a === 0) {
      var trap = R.int(0, 3);
      if (trap === 0) { var d1 = R.int(2, 9), d2 = R.int(1, d1 - 1); w = R.int(0, 5); s1 = w + '.' + d1; s2 = w + '.' + d2 + R.int(1, 9); }
      else if (trap === 1) { var dd = R.int(1, 8); w = R.int(0, 5); s1 = w + '.' + dd; s2 = w + '.' + dd + '0'; }
      else if (trap === 2) { w = R.int(1, 9); var t1 = R.int(1, 9); s1 = w + '.' + t1; s2 = w + '.' + (t1 > 1 ? t1 - 1 : 1) + '0' + R.int(1, 9); if (R.chance(0.5)) { var sw = s1; s1 = s2; s2 = sw; } }
      else { s1 = randDecStr(R, false); s2 = randDecStr(R, false); }
      var A = dv(s1), B = dv(s2), kk = Math.max(places(s1), places(s2)), p1 = padTo(s1, kk), p2 = padTo(s2, kk);
      return cmpQ(R, 'D6', 'Compare', 'Which sign goes in the box?  <span class="fd-eq">' + s1 + ' <span class="fd-box">?</span> ' + s2 + '</span>', A, B, {
        dens: [], hint: 'Give both numbers the same number of decimal places by adding zeros. Then compare like whole numbers.',
        steps: ['Write both with ' + kk + ' decimal place' + (kk > 1 ? 's' : '') + ' (add zeros on the right — it does not change the value): <b>' + p1 + '</b> and <b>' + p2 + '</b>.', 'Compare the whole numbers without the point: ' + (+(p1.replace('.', ''))) + ' and ' + (+(p2.replace('.', ''))) + '.', s1 + ' ' + cmpSign(A.cmp(B)).replace('<', '&lt;').replace('>', '&gt;') + ' ' + s2 + '.']
      });
    }
    var items = [], seen = {}, guard = 0, w0 = R.int(0, 5);
    while (items.length < 4 && guard++ < 100) {
      var s = (R.chance(0.7) ? w0 : R.int(0, 5)) + '.' + String(R.int(1, 99)).replace(/0+$/, '') + (R.chance(0.4) ? R.int(1, 9) : '');
      var f = dv(s), key = f.n + '/' + f.d, red = f.red();
      if (/\.$/.test(s)) continue;
      var kkey = red.n + '/' + red.d;
      if (seen[kkey]) continue;
      seen[kkey] = true; items.push({ s: s, h: '<span class="fd-bignum fd-bignum--sm">' + s + '</span>', val: f });
    }
    var maxP = Math.max.apply(null, items.map(function (x) { return places(x.s); }));
    var padded = items.map(function (x) { return padTo(x.s, maxP); });
    if (a === 3) {
      var big = R.chance(0.5), sorted = items.slice().sort(function (x, y) { return big ? y.val.cmp(x.val) : x.val.cmp(y.val); });
      return mcqQ(R, 'D6', 'Pick one', 'Which is the <b>' + (big ? 'greatest' : 'smallest') + '</b> number?', items.map(function (x, i) { return { v: 'i' + i, h: x.h }; }), 'i' + items.indexOf(sorted[0]), {
        dens: [], hint: 'Add zeros so every number has the same number of decimal places, then compare.',
        steps: ['Give every number ' + maxP + ' decimal place' + (maxP > 1 ? 's' : '') + ': ' + padded.join(', ') + '.', 'Compare them as whole numbers (ignore the point): ' + padded.map(function (p) { return +(p.replace('.', '')); }).join(', ') + '.', 'The ' + (big ? 'greatest' : 'smallest') + ' is <b>' + sorted[0].s + '</b>.']
      });
    }
    var dir = R.chance(0.5) ? 'asc' : 'desc', so = items.slice().sort(function (x, y) { return dir === 'asc' ? x.val.cmp(y.val) : y.val.cmp(x.val); });
    return orderQ(R, 'D6', 'Put in order', 'Tap the numbers in order, from the <b>' + (dir === 'asc' ? 'smallest to the greatest' : 'greatest to the smallest') + '</b>.', items.map(function (x) { return { h: x.h, val: x.val }; }), dir, {
      dens: [], hint: 'Add zeros so every number has the same number of decimal places, then compare like whole numbers.',
      steps: ['Give every number ' + maxP + ' decimal place' + (maxP > 1 ? 's' : '') + ': ' + padded.join(', ') + '.', 'Compare as whole numbers (ignore the point): ' + padded.map(function (p) { return +(p.replace('.', '')); }).join(', ') + '.', 'Order: ' + so.map(function (x) { return x.s; }).join(' , ') + '.']
    });
  };

  /* ---------- D7 Add & subtract decimals ---------- */
  function colWork(a, ka, b, kb, op) {
    var k = Math.max(ka, kb), A = a * pow10(k - ka), B = b * pow10(k - kb), res = op === '+' ? A + B : A - B;
    var sa = dstr(A, k), sb = dstr(B, k), sr = dstr(res, k), wid = Math.max(sa.length, sb.length, sr.length);
    function row(prefix, str, kOrig, bold) {
      var fillN = k - kOrig, shown = fillN ? str.slice(0, str.length - fillN) + '<span class="fd-fill">' + str.slice(str.length - fillN) + '</span>' : str;
      return prefix + new Array(wid - str.length + 1).join(' ') + (bold ? '<b>' + shown + '</b>' : shown);
    }
    var out = '<pre class="fd-col">' + row(' ', sa, ka) + '\n' + row(op === '+' ? '+' : '−', sb, kb) + '\n' + new Array(wid + 2).join('─') + '\n' + row(' ', sr, k, true) + '</pre>';
    return { html: out, res: res, k: k };
  }
  function d7Pair(R, op) {
    var ka = R.int(1, 3), kb = R.int(1, 3), a, b;
    if (R.chance(0.6)) while (ka === kb) kb = R.int(1, 3);
    a = R.int(pow10(ka) , 99 * pow10(ka)); b = R.int(pow10(kb), 60 * pow10(kb));
    while (a % 10 === 0) a++; while (b % 10 === 0) b++;
    if (op === '-') { var A = a * pow10(3 - ka), B = b * pow10(3 - kb); if (A <= B) { var t = a; a = b; b = t; t = ka; ka = kb; kb = t; } if (a * pow10(3 - ka) === b * pow10(3 - kb)) b += 1; if (a * pow10(3 - ka) <= b * pow10(3 - kb)) { a = b + pow10(ka); } }
    return { a: a, ka: ka, b: b, kb: kb };
  }
  G.D7 = function (R) {
    var a = R.int(0, 5), op = R.chance(0.5) ? '+' : '-', P, cw, sa, sb;
    if (a <= 1) {
      P = d7Pair(R, op); cw = colWork(P.a, P.ka, P.b, P.kb, op); sa = dstr(P.a, P.ka); sb = dstr(P.b, P.kb);
      return decQ('D7', 'Work it out', (op === '+' ? 'Add:' : 'Subtract:') + '  <span class="fd-eq">' + sa + ' ' + (op === '+' ? '+' : '−') + ' ' + sb + '</span>', new Frac(cw.res, pow10(cw.k)), dstr(cw.res, cw.k), {
        f: (op === '+' ? 1 : -1) * 0 + (op === '+' ? P.a / pow10(P.ka) + P.b / pow10(P.kb) : P.a / pow10(P.ka) - P.b / pow10(P.kb)), dens: [],
        hint: 'Line up the decimal points, one under the other. Fill empty places with zeros. Then add or subtract like whole numbers.',
        steps: ['Line up the decimal points and fill the empty places with zeros (shown in colour):' + cw.html, (op === '+' ? 'Add' : 'Subtract') + ' from the right, carrying' + (op === '+' ? '' : ' / borrowing') + ' as usual. Put the point straight down.', 'Answer: <b>' + dstr(cw.res, cw.k) + '</b>.']
      });
    }
    if (a === 2) {
      var ba = R.int(1, 9) * 1000 + R.pick([250, 500, 750, 100, 350, 450, 650, 900]), bb = R.int(1, 6) * 1000 + R.pick([250, 500, 750, 100, 350]);
      var sum = op === '+';
      if (!sum && ba <= bb) { var tt = ba; ba = bb; bb = tt; }
      cw = colWork(ba, 3, bb, 3, op);
      return decQ('D7', 'Real life', sum ? 'Crispin buys football boots for BD ' + dstr(ba, 3) + ' and a ball for BD ' + dstr(bb, 3) + '. How many <b>BD</b> does he spend?' : 'A football shirt costs BD ' + dstr(ba, 3) + '. Crispin has a voucher worth BD ' + dstr(bb, 3) + '. How many <b>BD</b> must he still pay?', new Frac(cw.res, 1000), dstr(cw.res, 3), {
        f: sum ? ba / 1000 + bb / 1000 : ba / 1000 - bb / 1000, dens: [], unit: 'BD', hint: 'Bahraini dinar has 3 decimal places (fils). Line up the points and ' + (sum ? 'add.' : 'subtract.'),
        steps: [(sum ? 'Spend = boots + ball. ' : 'To pay = price − voucher. ') + 'Line up the decimal points:' + cw.html, 'Answer: <b>BD ' + dstr(cw.res, 3) + '</b>.']
      });
    }
    if (a === 3) {
      P = d7Pair(R, '+'); var tot = P.a * pow10(Math.max(P.ka, P.kb) - P.ka) + P.b * pow10(Math.max(P.ka, P.kb) - P.kb), kk = Math.max(P.ka, P.kb);
      sa = dstr(P.a, P.ka);
      var bs = dstr(P.b, P.kb);
      if (R.chance(0.5)) return decQ('D7', 'Missing number', 'Find the missing number:  <span class="fd-eq">' + sa + ' + ' + box() + ' = ' + dstr(tot, kk) + '</span>', new Frac(P.b, pow10(P.kb)), bs, {
        f: P.b / pow10(P.kb), dens: [], hint: 'Work backwards: subtract the part you know from the total.',
        steps: ['The missing number = total − the part we know: ' + dstr(tot, kk) + ' − ' + sa + '.', colWork(tot, kk, P.a, P.ka, '-').html, 'The missing number is <b>' + bs + '</b>.', 'Check: ' + sa + ' + ' + bs + ' = ' + dstr(tot, kk) + '.']
      });
      return decQ('D7', 'Missing number', 'Find the missing number:  <span class="fd-eq">' + box() + ' + ' + bs + ' = ' + dstr(tot, kk) + '</span>', new Frac(P.a, pow10(P.ka)), sa, {
        f: P.a / pow10(P.ka), dens: [], hint: 'Work backwards: subtract the part you know from the total.',
        steps: ['The missing number = total − the part we know: ' + dstr(tot, kk) + ' − ' + bs + '.', colWork(tot, kk, P.b, P.kb, '-').html, 'The missing number is <b>' + sa + '</b>.', 'Check: ' + sa + ' + ' + bs + ' = ' + dstr(tot, kk) + '.']
      });
    }
    if (a === 4) {
      var x = R.int(10, 99) * 10 + R.int(1, 9), y = R.int(10, 99) * 10 + R.int(1, 9), exact = x + y;       // x,y in hundredths-ish
      var xs = dstr(x, 2), ys = dstr(y, 2), ex = Math.round(x / 100) + Math.round(y / 100);
      var cands = [ex, ex + 1, ex - 1, ex + 5, ex * 10].filter(function (v, i, ar) { return v > 0 && ar.indexOf(v) === i; }).slice(0, 4);
      if (cands.indexOf(ex) < 0) cands[0] = ex;
      return mcqQ(R, 'D7', 'Estimate', 'Round each number to the nearest whole number. What is the best <b>estimate</b> of  ' + xs + ' + ' + ys + '?', cands.map(function (v) { return { v: String(v), h: String(v) }; }), String(ex), {
        dens: [], hint: 'Round each decimal to the nearest whole number (look at the tenths digit), then add.',
        steps: [xs + ' rounds to ' + Math.round(x / 100) + ' and ' + ys + ' rounds to ' + Math.round(y / 100) + '.', Math.round(x / 100) + ' + ' + Math.round(y / 100) + ' = <b>' + ex + '</b>.', '(The exact answer is ' + dstr(exact, 2) + ', which is close to ' + ex + '.)']
      });
    }
    var p1 = R.int(1, 9), t1 = R.int(1, 9), h1 = R.int(1, 9), p2 = R.int(1, 9), A2 = p1 * 10 + t1, B2 = p2 * 100 + h1 * 10 + R.int(1, 9);
    var sA = dstr(A2, 1), sB = dstr(B2, 2), wrong = dstr(Number(String(A2) + '') + B2, 2), right = dstr(A2 * 10 + B2, 2);
    return mcqQ(R, 'D7', 'Fix the mistake', 'Sam added  ' + sA + ' + ' + sB + '  and got  ' + wrong + '.  What did Sam do wrong?',
      [{ v: 'ok', h: 'He did not line up the decimal points' }, { v: 'sub', h: 'He should have subtracted' }, { v: 'right', h: 'Nothing — Sam is right' }], 'ok', {
        dens: [], hint: 'Sam added the digits as if the numbers were whole numbers, from the right. Do the places match?',
        steps: ['Sam added the last digits together even though they are in different places (tenths + hundredths).', 'Line up the points and fill with zeros:' + colWork(A2, 1, B2, 2, '+').html, 'The correct answer is <b>' + right + '</b>.']
      });
  };

  /* ============================================================
     SKILL MAP
     ============================================================ */
  var SKILLS = [
    { id: 'F1', group: 'F', emoji: '🍕', title: 'What is a fraction?', blurb: 'Read shaded parts and number lines',
      learn: { text: 'A fraction names <b>equal parts</b> of a whole. The <b>denominator</b> (bottom) says how many equal parts the whole is cut into. The <b>numerator</b> (top) says how many of those parts we are talking about. The parts must be <b>equal</b> — if they are different sizes, it is not a fraction.',
        ex: 'A pizza is cut into 8 equal slices. Crispin eats 3. Fraction eaten = ' + fr(3, 8) + '. Fraction left = ' + fr(5, 8) + '. (' + fr(3, 8) + ' + ' + fr(5, 8) + ' = 1 whole.)' } },
    { id: 'F2', group: 'F', emoji: '⚖️', title: 'Equivalent fractions', blurb: 'Same value, different look. Simplest form',
      learn: { text: 'Equivalent fractions look different but have the <b>same value</b>. To make one, multiply (or divide) the top <b>and</b> the bottom by the <b>same</b> number. To write a fraction in <b>simplest form</b>, divide top and bottom by a number that goes into both, again and again, until only 1 fits both.',
        ex: fr(3, 4) + ' = ' + fr('?', 12) + ':  12 ÷ 4 = 3, so multiply the top by 3 too: 3 × 3 = 9. So ' + fr(3, 4) + ' = ' + fr(9, 12) + '.  Simplest form of ' + fr(12, 18) + ':  ÷ 6 → ' + fr(2, 3) + '.' } },
    { id: 'F3', group: 'F', emoji: '⚔️', title: 'Compare & order', blurb: '&lt; &gt; = and ordering fractions',
      learn: { text: 'Same bottoms: the bigger top is the bigger fraction. Same tops: the <b>smaller</b> bottom is the bigger fraction (bigger pieces). Compare with 1 (is the top bigger than the bottom?) or with ' + fr(1, 2) + ' (is double the top bigger than the bottom?). For unlike bottoms, change to the same bottom using the <b>LCM</b>, then compare the tops.',
        ex: fr(3, 4) + ' or ' + fr(5, 6) + '?  LCM of 4 and 6 is 12.  ' + fr(3, 4) + ' = ' + fr(9, 12) + ', ' + fr(5, 6) + ' = ' + fr(10, 12) + '.  9 &lt; 10, so ' + fr(3, 4) + ' &lt; ' + fr(5, 6) + '.' } },
    { id: 'F4', group: 'F', emoji: '🔄', title: 'Improper ↔ mixed', blurb: 'Switch between the two forms',
      learn: { text: 'An <b>improper fraction</b> has a top that is bigger than (or equal to) the bottom. A <b>mixed number</b> has a whole number and a proper fraction. Improper → mixed: <b>divide</b> top by bottom; the quotient is the whole number and the remainder goes over the same bottom. Mixed → improper: use <b>(W × D) + N</b> over D.',
        ex: fr(11, 4) + ': 11 ÷ 4 = 2 remainder 3, so ' + mix(2, 3, 4) + '.   ' + mix(2, 3, 4) + ': (2 × 4) + 3 = 11, so ' + fr(11, 4) + '.' } },
    { id: 'F5', group: 'F', emoji: '➕', title: 'Add & subtract (like fractions)', blurb: 'Same bottoms: keep the bottom',
      learn: { text: 'When the denominators are the <b>same</b>, the pieces are the same size. So <b>keep the denominator</b> and add (or subtract) only the numerators. Then write the answer in simplest form.',
        ex: fr(3, 8) + ' + ' + fr(1, 8) + ' = ' + fr(4, 8) + ' = ' + fr(1, 2) + '.   ' + fr(7, 9) + ' − ' + fr(4, 9) + ' = ' + fr(3, 9) + ' = ' + fr(1, 3) + '.' } },
    { id: 'F6', group: 'F', emoji: '🪜', title: 'Add & subtract (unlike)', blurb: 'LCM ladder, convert, then add',
      learn: { text: 'When the bottoms are different, use <b>3 steps</b>. <b>Step 1:</b> find the LCM of the denominators with the common-division <b>ladder</b>. <b>Step 2:</b> convert each fraction to that bottom (multiply top and bottom by the same number). <b>Step 3:</b> add or subtract the tops, keep the bottom, and simplify.',
        ex: fr(1, 4) + ' + ' + fr(1, 6) + ':  Step 1 ladder gives LCM = 12.  Step 2: ' + fr(1, 4) + ' = ' + fr(3, 12) + ', ' + fr(1, 6) + ' = ' + fr(2, 12) + '.  Step 3: ' + fr(3, 12) + ' + ' + fr(2, 12) + ' = ' + fr(5, 12) + '.' } },
    { id: 'F7', group: 'F', emoji: '✖️', title: 'Multiply fractions', blurb: 'Fraction of an amount, × 0',
      learn: { text: 'To multiply fractions, multiply the <b>tops</b> together and the <b>bottoms</b> together, then simplify. "<b>Of</b>" means multiply: ' + fr(3, 5) + ' of 20 means divide 20 by the bottom (5) and multiply by the top (3). Anything × 0 is 0.',
        ex: fr(2, 3) + ' × ' + fr(3, 4) + ' = ' + fr(6, 12) + ' = ' + fr(1, 2) + '.   ' + fr(3, 5) + ' of 20 Robux = 20 ÷ 5 × 3 = 12 Robux.' } },
    { id: 'F8', group: 'F', emoji: '🔁', title: 'Reciprocal & divide', blurb: 'M.I and Keep, Change, Flip',
      learn: { text: 'The <b>M.I</b> (multiplicative inverse, or reciprocal) of a fraction is the fraction <b>flipped</b>: a number times its M.I is 1. 0 has no M.I. To divide fractions: <b>Keep</b> the first fraction, <b>Change</b> ÷ to ×, <b>Flip</b> the second fraction (write the M.I of the divisor), then multiply.',
        ex: fr(2, 3) + ' ÷ ' + fr(4, 5) + ':  Keep ' + fr(2, 3) + ',  Change to ×,  M.I of the divisor ' + fr(4, 5) + ' is ' + fr(5, 4) + '.  ' + fr(2, 3) + ' × ' + fr(5, 4) + ' = ' + fr(10, 12) + ' = ' + fr(5, 6) + '.' } },
    { id: 'F9', group: 'F', emoji: '⚽', title: 'Word problems', blurb: 'Goals, Robux, Rivals, pizza and BD',
      learn: { text: 'Read the story slowly. Find the numbers and decide what to do: <b>altogether</b> → add; <b>left / the rest</b> → subtract; <b>of</b> → multiply; <b>shared equally / how many fit</b> → divide. Draw a quick picture if it helps. Finish with a sentence that answers the question.',
        ex: 'Ronaldo takes 20 penalties and scores ' + fr(3, 4) + ' of them. Scored = 20 ÷ 4 × 3 = 15. Missed = the rest = 20 − 15 = 5.' } },
    { id: 'D1', group: 'D', emoji: '🔟', title: 'Tenths, hundredths, thousandths', blurb: 'Fractions with 10, 100, 1000 as decimals',
      learn: { text: 'A decimal is a fraction with 10, 100, 1000 … on the bottom. One decimal place is <b>tenths</b>, two places are <b>hundredths</b>, three places are <b>thousandths</b>. A 10 × 10 grid has 100 squares, so each square is one hundredth (0.01).',
        ex: fr(37, 100) + ' = 0.37 (two zeros → two decimal places).   ' + fr(7, 1000) + ' = 0.007 (three places, so two zeros fill in).' } },
    { id: 'D2', group: 'D', emoji: '🏠', title: 'Place value', blurb: 'Name the place and its value',
      learn: { text: 'Left of the decimal point the places are ones, tens, hundreds. Right of the point they are <b>tenths, hundredths, thousandths</b> (each is ten times smaller). The place value of a digit is the digit × the value of its place.',
        ex: 'In 4<u>7</u>.362 the 7 is in the ones place (value 7). In 47.3<u>6</u>2 the 6 is in the hundredths place: 6 × 0.01 = 0.06.' } },
    { id: 'D3', group: 'D', emoji: '🗣️', title: 'Decimals in words', blurb: 'Read and write decimals with words',
      learn: { text: 'There are two ways to say a decimal. <b>Point form:</b> say the whole part, say "point", then read each decimal digit one by one: 94.73 is "ninety-four point seven three". <b>Place form:</b> say the whole part, "and", then the decimal part as a number with the place name: "ninety-four and seventy-three hundredths". Take care with the endings: <b>thousandths</b>, not thousand!',
        ex: '0.015 = "zero point zero one five" = "fifteen thousandths".' } },
    { id: 'D4', group: 'D', emoji: '🧩', title: 'Expanded form', blurb: 'Break a decimal into its place values',
      learn: { text: 'Expanded form breaks a number into the value of each digit. Write each digit with its place: tens (10), ones (1), tenths (' + fr(1, 10) + ' or 0.1), hundredths (' + fr(1, 100) + ' or 0.01). If a place is 0, you can leave it out — but remember it when you build the number back!',
        ex: '42.35 = (4 × 10) + (2 × 1) + (3 × 0.1) + (5 × 0.01) = 40 + 2 + 0.3 + 0.05.   30.07 = 30 + 0.07 (the tenths place is 0).' } },
    { id: 'D5', group: 'D', emoji: '↔️', title: 'Decimal ↔ fraction', blurb: 'Switch between decimals and fractions',
      learn: { text: 'Decimal → fraction: count the decimal places to get the denominator (1 place → 10, 2 → 100, 3 → 1000), and write the digits (without the point) on top. You can simplify afterwards. Fraction → decimal: the number of zeros in the denominator is the number of decimal places.',
        ex: '0.35 = ' + fr(35, 100) + ' = ' + fr(7, 20) + '.   ' + fr(9, 100) + ' = 0.09.   3.7 = ' + mix(3, 7, 10) + '.' } },
    { id: 'D6', group: 'D', emoji: '📏', title: 'Compare & order decimals', blurb: 'Beware 0.5 vs 0.45!',
      learn: { text: 'To compare decimals, give them the <b>same number of decimal places</b> by adding zeros on the right (this does not change the value). Then compare them like whole numbers. Be careful: a longer decimal is <b>not</b> always bigger!',
        ex: '0.5 vs 0.45  →  0.50 vs 0.45  →  50 hundredths &gt; 45 hundredths, so 0.5 &gt; 0.45.   3.9 vs 3.10  →  3.90 &gt; 3.10.' } },
    { id: 'D7', group: 'D', emoji: '💰', title: 'Add & subtract decimals', blurb: 'Line up the points!',
      learn: { text: '<b>Line up the decimal points</b> one under the other so tenths sit under tenths, hundredths under hundredths. Fill any empty places with zeros. Then add or subtract from the right, just like whole numbers, and bring the point straight down.',
        ex: '12.5 + 3.75  →  12.50 + 3.75 = 16.25.   (Zeros filled in so the places match.)' } }
  ];
  var BY_ID = {};
  SKILLS.forEach(function (s) { BY_ID[s.id] = s; });

  var ANGLE_FALLBACK = 'Practice';
  function gen(id, R) {
    var q = G[id](R);
    q.skill = q.skill || id;
    if (!q.angle) q.angle = ANGLE_FALLBACK;
    return q;
  }

  /* ============================================================
     STORE
     ============================================================ */
  function blank() { return { v: 1, xp: 0, skills: {}, ch: { att: 0, ok: 0, best: 0, run: 0 }, visits: 0 }; }
  var Store = {
    data: blank(),
    load: function () {
      try {
        var raw = localStorage.getItem(KEY);
        if (raw) { var d = JSON.parse(raw); if (d && d.v) this.data = Object.assign(blank(), d); }
      } catch (_) { this.data = blank(); }
      return this.data;
    },
    save: function () { try { localStorage.setItem(KEY, JSON.stringify(this.data)); } catch (_) {} },
    sk: function (id) {
      if (!this.data.skills[id]) this.data.skills[id] = { hist: [], att: 0, ok: 0, learned: false, mastered: false };
      return this.data.skills[id];
    },
    last10: function (id) { var h = this.sk(id).hist; return h.slice(-10); },
    correctIn10: function (id) { return this.last10(id).reduce(function (a, b) { return a + b; }, 0); },
    isMasteredNow: function (id) { var h = this.sk(id).hist; return h.length >= 10 && this.correctIn10(id) >= 8; },
    /* record one counted attempt; returns true the first time the skill is mastered */
    record: function (id, ok) {
      var s = this.sk(id), was = s.mastered;
      s.hist.push(ok ? 1 : 0); if (s.hist.length > 20) s.hist.shift();
      s.att++; if (ok) s.ok++;
      if (!was && this.isMasteredNow(id)) s.mastered = true;
      this.save();
      return !was && s.mastered;
    },
    addXP: function (n) { this.data.xp += n; this.save(); },
    reset: function () { this.data = blank(); this.save(); }
  };
  function bridgeXP(amount, reason) {
    try { if (window.Progress && typeof window.Progress.addXP === 'function') window.Progress.addXP(amount, reason || XP_REASON); } catch (_) {}
  }
  function stars(id) {
    var s = Store.sk(id);
    if (s.mastered) return 3;
    var c = Store.correctIn10(id);
    if (c >= 6) return 2;
    return s.att > 0 ? 1 : 0;
  }
  function recommended() {
    for (var i = 0; i < SKILLS.length; i++) if (!Store.sk(SKILLS[i].id).mastered) return SKILLS[i].id;
    return null;
  }

  /* ============================================================
     UI
     ============================================================ */
  var PRAISE = ['GOAL! ⚽ Top corner!', 'Siuuu! 🐐 That is Ronaldo-level!', 'Back of the net! 🥅', 'Robux well earned! 💎', 'Rivals victory! 🏆', 'Perfect pass! 🎯', 'Clean sheet! 🧤 Spot on!', 'Hat-trick material! ⚽⚽⚽', 'Level up! ⭐ Great thinking!', 'Free kick scored! 🔥'];
  var NOTYET = ['Not yet — let us look at it together.', 'Not yet — even Ronaldo misses penalties. Here is how it works.', 'Not yet — good try! Watch the method.', 'Not yet — you are close. Follow the steps.'];

  var host, root, view, S = { mode: null, id: null, q: null, hinted: false, answered: false, order: [], pick: null, streak: 0, session: { n: 0, ok: 0 } };
  var rng = makeRng((Date.now() ^ (Math.random() * 4294967296)) >>> 0);

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function ring(pct) {
    var C = 2 * Math.PI * 14, off = C * (1 - pct / 100);
    return '<svg class="fd-ring" viewBox="0 0 36 36" aria-hidden="true"><circle class="fd-ring__bg" cx="18" cy="18" r="14" fill="none" stroke-width="4"/><circle class="fd-ring__fg" cx="18" cy="18" r="14" fill="none" stroke-width="4" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 18 18)"/><text class="fd-ring__txt" x="18" y="22" text-anchor="middle">' + pct + '%</text></svg>';
  }
  function starRow(n) { var s = ''; for (var i = 0; i < 3; i++) s += '<span class="' + (i < n ? 'fd-star fd-star--on' : 'fd-star') + '">★</span>'; return s; }

  function buildChrome() {
    root = el('div', 'fd');
    root.innerHTML =
      '<header class="fd-top"><a class="fd-top__brand" href="#/"><span class="fd-top__logo">🍕</span><span>Fractions &amp; Decimals Quest</span></a><span class="fd-top__spacer"></span>' +
      '<span class="fd-pill" id="fd-xp"></span><a class="fd-iconbtn" href="index.html" title="Back to Crispin\'s World" aria-label="Exit">✕</a></header>' +
      '<main class="fd-main"><div class="fd-wrap" id="fd-view"></div></main>';
    host.appendChild(root);
    view = root.querySelector('#fd-view');
  }
  function setXP() { var p = root.querySelector('#fd-xp'); if (p) p.textContent = '⭐ ' + Store.data.xp + ' XP'; }

  function route() {
    var raw = (location.hash || '').replace(/^#\/?/, ''), parts = raw.split('/').filter(Boolean);
    if (parts[0] === 'learn' && BY_ID[parts[1]]) renderLearn(parts[1]);
    else if (parts[0] === 'practice' && BY_ID[parts[1]]) startPractice('skill', parts[1]);
    else if (parts[0] === 'mixed') startPractice('mixed');
    else if (parts[0] === 'challenge') startPractice('challenge');
    else renderHome();
    window.scrollTo(0, 0);
  }
  function go(h) { if (location.hash === h) route(); else location.hash = h; }

  /* ---------- home ---------- */
  function card(sk, rec) {
    var s = Store.sk(sk.id), c = Store.correctIn10(sk.id), pct = Math.min(100, Math.round(c / 8 * 100));
    var state = s.mastered ? 'Mastered' : (s.att ? c + '/' + Store.last10(sk.id).length + ' recent right' : 'Not started');
    return '<a class="fd-card' + (s.mastered ? ' fd-card--done' : '') + (rec ? ' fd-card--rec' : '') + '" href="#/' + (s.learned || s.att ? 'practice' : 'learn') + '/' + sk.id + '" data-skill="' + sk.id + '">' +
      (rec ? '<span class="fd-card__flag">Next up</span>' : '') +
      '<span class="fd-card__emoji">' + sk.emoji + '</span><span class="fd-card__id">' + sk.id + '</span>' +
      '<span class="fd-card__title">' + sk.title + '</span><span class="fd-card__blurb">' + sk.blurb + '</span>' +
      '<span class="fd-card__foot">' + ring(s.mastered ? 100 : pct) + '<span class="fd-card__state"><span class="fd-stars">' + starRow(stars(sk.id)) + '</span><span>' + state + '</span></span></span></a>';
  }
  function renderHome() {
    S.mode = null; setXP();
    var rec = recommended(), done = SKILLS.filter(function (s) { return Store.sk(s.id).mastered; }).length;
    var html = '<div class="fd-hero"><span class="fd-eyebrow">Crispin\'s practice arena</span><h1 class="fd-h1">🍕 Fractions &amp; Decimals Quest</h1>' +
      '<p class="fd-lead">Practise each skill until you <b>master</b> it: get <b>8 out of your last 10</b> right. Every question is brand new. ' + done + ' of ' + SKILLS.length + ' skills mastered.</p>' +
      '<div class="fd-chiprow"><a class="fd-btn fd-btn--primary" href="#/mixed" id="fd-mixed">🔀 Mixed practice</a><a class="fd-btn fd-btn--gold" href="#/challenge" id="fd-challenge">🐐 Ronaldo\'s Challenge</a></div></div>';
    [['F', 'Fractions', SKILLS], ['D', 'Decimals', SKILLS]].forEach(function (g) {
      html += '<h2 class="fd-h2">' + (g[0] === 'F' ? '🍕 Fractions' : '🔟 Decimals') + '</h2><div class="fd-grid">';
      SKILLS.forEach(function (sk) { if (sk.group === g[0]) html += card(sk, sk.id === rec); });
      html += '</div>';
    });
    html += '<p class="fd-foot"><button class="fd-link" id="fd-reset">Reset my progress</button></p>';
    view.innerHTML = html;
    var r = view.querySelector('#fd-reset');
    r.addEventListener('click', function () { if (window.confirm('Reset all Fractions & Decimals Quest progress on this device?')) { Store.reset(); renderHome(); } });
  }

  /* ---------- learn ---------- */
  function renderLearn(id) {
    var sk = BY_ID[id]; S.mode = null; setXP();
    var s = Store.sk(id); s.learned = true; Store.save();
    view.innerHTML = '<a class="fd-back" href="#/">← All skills</a><div class="fd-panel"><span class="fd-eyebrow">' + sk.id + ' · Learn</span><h1 class="fd-h1">' + sk.emoji + ' ' + sk.title + '</h1>' +
      '<p class="fd-learn">' + sk.learn.text + '</p><div class="fd-example"><span class="fd-example__tag">Worked example</span><div>' + sk.learn.ex + '</div></div>' +
      '<div class="fd-chiprow"><a class="fd-btn fd-btn--primary fd-btn--lg" id="fd-start" href="#/practice/' + id + '">Start practising →</a></div></div>';
  }

  /* ---------- practice ---------- */
  function startPractice(mode, id) {
    S.mode = mode; S.id = id || null; S.session = { n: 0, ok: 0 }; S.streak = 0;
    if (mode === 'skill') { var s = Store.sk(id); s.learned = true; Store.save(); }
    nextQuestion();
  }
  function pickSkillForMixed() {
    var pool = SKILLS.filter(function (sk) { var s = Store.sk(sk.id); return s.att > 0 || s.mastered; }).map(function (sk) { return sk.id; });
    if (pool.length < 2) pool = pool.concat(['F1', 'F2', 'F5', 'D1', 'D2', 'D6']);
    return rng.pick(pool);
  }
  function nextQuestion(sameSkill) {
    var id;
    if (S.mode === 'skill') id = S.id;
    else if (S.mode === 'challenge') id = 'CH';
    else id = (sameSkill && S.q) ? S.q.skill : pickSkillForMixed();
    S.q = gen(id, rng); S.hinted = false; S.answered = false; S.order = []; S.pick = null;
    renderQuestion();
  }
  function meterHTML(id) {
    var h = Store.last10(id), s = '';
    for (var i = 0; i < 10; i++) s += '<span class="fd-pip' + (i < h.length ? (h[i] ? ' fd-pip--ok' : ' fd-pip--no') : '') + '"></span>';
    return s;
  }
  function inputHTML(q) {
    var t = q.input.type;
    if (t === 'frac') return '<div class="fd-fi" role="group" aria-label="Your fraction"><input class="fd-in" data-role="n" inputmode="numeric" autocomplete="off" aria-label="Top number (numerator)" /><span class="fd-fi__bar"></span><input class="fd-in" data-role="d" inputmode="numeric" autocomplete="off" aria-label="Bottom number (denominator)" /></div>';
    if (t === 'mixed') return '<div class="fd-mi" role="group" aria-label="Your mixed number"><input class="fd-in fd-in--w" data-role="w" inputmode="numeric" autocomplete="off" aria-label="Whole number" /><div class="fd-fi"><input class="fd-in" data-role="n" inputmode="numeric" autocomplete="off" aria-label="Top number (numerator)" /><span class="fd-fi__bar"></span><input class="fd-in" data-role="d" inputmode="numeric" autocomplete="off" aria-label="Bottom number (denominator)" /></div></div>';
    if (t === 'dec') return '<div class="fd-di"><input class="fd-in fd-in--wide" data-role="v" inputmode="decimal" autocomplete="off" aria-label="Your answer" placeholder="?" />' + (q.unit ? '<span class="fd-unit">' + esc(q.unit) + '</span>' : '') + '</div>';
    if (t === 'text') return '<div class="fd-di"><input class="fd-in fd-in--wide" data-role="v" type="text" autocomplete="off" autocapitalize="off" aria-label="Your answer" placeholder="type here" /></div>';
    if (t === 'mcq') {
      var cls = 'fd-choices' + (q.input.wide ? ' fd-choices--wide' : '') + (q.input.choices.length === 2 ? ' fd-choices--two' : '') + (q.input.choices.length === 3 && q.input.choices[0].v === '<' ? ' fd-choices--three' : '');
      return '<div class="' + cls + '" role="group">' + q.input.choices.map(function (c) { return '<button type="button" class="fd-choice" data-v="' + esc(c.v) + '">' + c.h + '</button>'; }).join('') + '</div>';
    }
    if (t === 'order') {
      return '<div class="fd-order"><div class="fd-order__tray" id="fd-tray" aria-label="Your order"></div><div class="fd-order__pool" id="fd-pool">' +
        q.input.items.map(function (c) { return '<button type="button" class="fd-chip" data-v="' + c.v + '">' + c.h + '</button>'; }).join('') + '</div>' +
        '<button type="button" class="fd-link" id="fd-clear">Start again</button></div>';
    }
    return '';
  }
  function renderQuestion() {
    var q = S.q, title, id = S.mode === 'skill' ? S.id : q.skill, sk = BY_ID[id];
    if (S.mode === 'skill') title = sk.emoji + ' ' + sk.id + ' · ' + sk.title;
    else if (S.mode === 'challenge') title = '🐐 Ronaldo\'s Challenge';
    else title = '🔀 Mixed practice · ' + sk.id;
    var meter = S.mode === 'challenge' ? '<span class="fd-meter__txt">Best streak: ' + Store.data.ch.best + ' · this run: ' + S.streak + '</span>'
      : '<span class="fd-meter__pips" id="fd-meter">' + meterHTML(q.skill) + '</span><span class="fd-meter__txt">' + Store.correctIn10(q.skill) + ' of last ' + Store.last10(q.skill).length + ' right · need 8 of 10' + (Store.sk(q.skill).mastered ? ' · ✅ mastered' : '') + '</span>';
    view.innerHTML = '<a class="fd-back" href="#/">← All skills</a>' +
      '<div class="fd-panel"><div class="fd-qhead"><span class="fd-eyebrow">' + title + '</span><div class="fd-meter">' + meter + '</div></div>' +
      '<div class="fd-q" id="fd-q"><span class="fd-angle">' + esc(q.angle) + '</span><div class="fd-prompt">' + q.prompt + '</div>' + (q.visual ? '<div class="fd-visual">' + q.visual + '</div>' : '') +
      '<div class="fd-input" id="fd-input">' + inputHTML(q) + '</div></div>' +
      '<div class="fd-hintbox" id="fd-hintbox" hidden></div><div id="fd-msg" class="fd-msg" role="status" aria-live="polite"></div>' +
      '<div class="fd-actions" id="fd-actions"><button type="button" class="fd-btn" id="fd-hint">💡 Show me how</button><button type="button" class="fd-btn fd-btn--primary fd-btn--lg" id="fd-check">Check ✓</button></div>' +
      '<div id="fd-feedback"></div></div>';
    wireQuestion();
    var first = view.querySelector('.fd-in');
    if (first && !('ontouchstart' in window)) { try { first.focus(); } catch (_) {} }
  }
  function readAnswer() {
    var q = S.q, t = q.input.type, get = function (r) { var e = view.querySelector('.fd-in[data-role="' + r + '"]'); return e ? e.value : ''; };
    if (t === 'frac') return { n: get('n'), d: get('d') };
    if (t === 'mixed') return { w: get('w'), n: get('n'), d: get('d') };
    if (t === 'dec' || t === 'text') return get('v');
    if (t === 'mcq') return S.pick;
    if (t === 'order') return S.order.slice();
    return null;
  }
  function wireQuestion() {
    var q = S.q;
    view.querySelector('#fd-check').addEventListener('click', submit);
    view.querySelector('#fd-hint').addEventListener('click', showHint);
    Array.prototype.forEach.call(view.querySelectorAll('.fd-in'), function (inp) {
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    });
    if (q.input.type === 'mcq') {
      Array.prototype.forEach.call(view.querySelectorAll('.fd-choice'), function (b) {
        b.addEventListener('click', function () {
          if (S.answered) return;
          S.pick = b.getAttribute('data-v');
          Array.prototype.forEach.call(view.querySelectorAll('.fd-choice'), function (x) { x.classList.toggle('fd-choice--sel', x === b); });
        });
      });
    }
    if (q.input.type === 'order') {
      var pool = view.querySelector('#fd-pool'), tray = view.querySelector('#fd-tray');
      var paint = function () {
        tray.innerHTML = S.order.map(function (v, i) { var h = ''; q.input.items.forEach(function (c) { if (c.v === v) h = c.h; }); return '<button type="button" class="fd-chip fd-chip--in" data-v="' + v + '"><span class="fd-chip__n">' + (i + 1) + '</span>' + h + '</button>'; }).join('') || '<span class="fd-order__ph">Tap the cards below in order…</span>';
        Array.prototype.forEach.call(pool.querySelectorAll('.fd-chip'), function (b) { b.classList.toggle('fd-chip--used', S.order.indexOf(b.getAttribute('data-v')) >= 0); });
      };
      Array.prototype.forEach.call(pool.querySelectorAll('.fd-chip'), function (b) {
        b.addEventListener('click', function () { if (S.answered) return; var v = b.getAttribute('data-v'); if (S.order.indexOf(v) < 0) S.order.push(v); paint(); });
      });
      tray.addEventListener('click', function (e) {
        if (S.answered) return;
        var b = e.target.closest ? e.target.closest('.fd-chip--in') : null;
        if (b) { var v = b.getAttribute('data-v'); S.order = S.order.filter(function (x) { return x !== v; }); paint(); }
      });
      view.querySelector('#fd-clear').addEventListener('click', function () { if (!S.answered) { S.order = []; paint(); } });
      paint();
    }
  }
  function stepsHTML(q) {
    return '<ol class="fd-steps">' + q.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>';
  }
  function showHint() {
    if (S.answered) return;
    S.hinted = true;
    var hb = view.querySelector('#fd-hintbox');
    hb.hidden = false; hb.innerHTML = '<b>💡 Hint.</b> ' + (S.q.hint || 'Take it one step at a time.') + '<div class="fd-hintbox__note">Using a hint means this question will not count towards mastery or XP — that is fine, learning is the point!</div>';
  }
  function setMsg(h) { var m = view.querySelector('#fd-msg'); if (m) m.innerHTML = h || ''; }

  function submit() {
    if (S.answered) return;
    var q = S.q, ans = readAnswer(), res = check(q, ans);
    if (res.invalid) { setMsg('<span class="fd-msg--warn">' + esc(res.invalid) + '</span>'); return; }
    setMsg('');
    S.answered = true;
    var counts = !S.hinted, firstMastery = false, xpGain = 0;
    if (counts) {
      S.session.n++; if (res.ok) S.session.ok++;
      if (S.mode === 'challenge') {
        var ch = Store.data.ch; ch.att++; if (res.ok) { ch.ok++; S.streak++; if (S.streak > ch.best) ch.best = S.streak; } else S.streak = 0;
        Store.save();
      } else firstMastery = Store.record(q.skill, res.ok);
      if (res.ok) { xpGain = S.mode === 'challenge' ? 15 : 10; if (firstMastery) xpGain += 30; Store.addXP(xpGain); bridgeXP(xpGain, XP_REASON + (S.mode === 'challenge' ? ' · Challenge' : ' · ' + q.skill)); }
    }
    setXP();
    var meterEl = view.querySelector('#fd-meter'); if (meterEl) meterEl.innerHTML = meterHTML(q.skill);
    /* lock inputs */
    Array.prototype.forEach.call(view.querySelectorAll('.fd-in'), function (i) { i.disabled = true; });
    Array.prototype.forEach.call(view.querySelectorAll('.fd-choice'), function (b) {
      b.disabled = true;
      if (b.getAttribute('data-v') === String(q.answer)) b.classList.add('fd-choice--right');
      else if (b.classList.contains('fd-choice--sel')) b.classList.add('fd-choice--wrong');
    });
    Array.prototype.forEach.call(view.querySelectorAll('.fd-chip'), function (b) { b.disabled = true; });
    view.querySelector('#fd-actions').hidden = true;
    var fb = view.querySelector('#fd-feedback'), html;
    var again = (S.mode === 'challenge') ? 'Next challenge →' : 'Try another like this →';
    if (res.ok) {
      html = '<div class="fd-feedback fd-feedback--ok" role="status"><div class="fd-feedback__head">' + rng.pick(PRAISE) + (xpGain ? ' <span class="fd-xp">+' + xpGain + ' XP</span>' : '') + '</div>' +
        (S.hinted ? '<p class="fd-feedback__note">You used a hint, so this one does not count towards mastery — try the next one on your own!</p>' : '') +
        '<p>The answer is <b>' + q.show + '</b>.</p><details class="fd-details"><summary>See the method</summary>' + stepsHTML(q) + '</details>';
      if (firstMastery) html += '<div class="fd-mastered">🏆 <b>Skill mastered!</b> You got 8 of your last 10 right. +30 XP. Keep going or pick the next skill.</div>';
      html += '<div class="fd-chiprow"><button type="button" class="fd-btn fd-btn--primary fd-btn--lg" id="fd-next">Next question →</button>' + (S.mode === 'skill' ? '<a class="fd-btn" href="#/">All skills</a>' : '') + '</div></div>';
    } else {
      html = '<div class="fd-feedback fd-feedback--bad" role="status"><div class="fd-feedback__head">' + rng.pick(NOTYET) + '</div>' +
        (res.note ? '<p class="fd-feedback__note">' + res.note + '</p>' : '') +
        '<div class="fd-compare"><div><span class="fd-compare__lbl">Your answer</span><span class="fd-compare__v fd-compare__v--you">' + showAnswer(q, ans) + '</span></div><div><span class="fd-compare__lbl">Right answer</span><span class="fd-compare__v fd-compare__v--right">' + q.show + '</span></div></div>' +
        '<div class="fd-howto"><b>Here is how:</b>' + stepsHTML(q) + '</div>' +
        '<div class="fd-chiprow"><button type="button" class="fd-btn fd-btn--primary fd-btn--lg" id="fd-next">' + again + '</button><a class="fd-btn" href="#/">All skills</a></div></div>';
    }
    fb.innerHTML = html;
    var nx = view.querySelector('#fd-next');
    nx.addEventListener('click', function () { nextQuestion(!res.ok && S.mode === 'mixed'); });
    try { nx.focus(); } catch (_) {}
  }

  /* ---------- public ---------- */
  function start(hostEl) {
    host = hostEl; Store.load();
    buildChrome(); setXP();
    window.addEventListener('hashchange', route);
    route();
  }

  window.FD = {
    SKILLS: SKILLS, GENERATORS: G, gen: gen, check: check, makeRng: makeRng, Frac: Frac, parseDec: parseDec, dstr: dstr,
    showAnswer: showAnswer, inputHTML: inputHTML, stepsHTML: stepsHTML, store: Store, ladder: ladder,
    state: function () { return S; }, route: route, go: go
  };
  window.FDQuest = { start: start };
})();
