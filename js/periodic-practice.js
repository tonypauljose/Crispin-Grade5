/* ============================================================
   periodic-practice.js — shared engine for the 10 daily printable
   practice papers (Maths Periodic Exam: Numbers + Four Operations).

   Each worksheets/periodic-dayNN-*.html page defines a SECTIONS config
   and calls PP.buildPaper(opts). This library provides:
     • number/word/roman helpers (ported from the Python bank generator)
     • a library of question generators — each returns { q, a }
         q = question HTML (with answer blanks / working space)
         a = answer-key HTML (FULL worked solution)
     • buildPaper(): renders the question paper + answer key, wires the
       toolbar (print questions only · print answer key · new questions ·
       toggle key) using the print-questions-only / print-answers-only
       body classes defined in css/print.css.
   Fresh questions are generated on every page load / "New questions".
   ============================================================ */
(function () {
  'use strict';

  // ---------- basic helpers ----------
  function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function pick(arr) { return arr[randInt(0, arr.length - 1)]; }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = randInt(0, i);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function bigNumber(minDigits, maxDigits) {
    const d = randInt(minDigits, maxDigits);
    const lo = Math.pow(10, d - 1);
    const hi = Math.pow(10, d) - 1;
    return randInt(lo, hi);
  }

  // ---------- commas ----------
  function indianCommas(n) {
    const s = String(n);
    if (s.length <= 3) return s;
    const last3 = s.slice(-3);
    let rest = s.slice(0, -3);
    const groups = [];
    while (rest.length > 2) { groups.unshift(rest.slice(-2)); rest = rest.slice(0, -2); }
    if (rest) groups.unshift(rest);
    return groups.join(',') + ',' + last3;
  }
  function intlCommas(n) { return Number(n).toLocaleString('en-US'); }

  // ---------- number names ----------
  const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function words2(n) {
    if (n < 20) return ONES[n];
    const t = Math.floor(n / 10), o = n % 10;
    return o === 0 ? TENS[t] : TENS[t] + '-' + ONES[o];
  }
  function words3(n) {
    if (n === 0) return '';
    if (n < 100) return words2(n);
    const h = Math.floor(n / 100), r = n % 100;
    return ONES[h] + ' hundred' + (r ? ' ' + words2(r) : '');
  }
  function indianWords(n) {
    if (n === 0) return 'zero';
    const parts = [];
    const crore = Math.floor(n / 10000000); n %= 10000000;
    const lakh = Math.floor(n / 100000); n %= 100000;
    const thousand = Math.floor(n / 1000); n %= 1000;
    if (crore) parts.push(words2(crore) + ' crore');
    if (lakh) parts.push(words2(lakh) + ' lakh');
    if (thousand) parts.push(words2(thousand) + ' thousand');
    if (n) parts.push(words3(n));
    return parts.join(' ');
  }
  function intlWords(n) {
    if (n === 0) return 'zero';
    const parts = [];
    const million = Math.floor(n / 1000000); n %= 1000000;
    const thousand = Math.floor(n / 1000); n %= 1000;
    if (million) parts.push(words3(million) + ' million');
    if (thousand) parts.push(words3(thousand) + ' thousand');
    if (n) parts.push(words3(n));
    return parts.join(' ');
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  // ---------- expanded form / place names ----------
  const INDIAN_PLACES = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands',
    'lakhs', 'ten lakhs', 'crores', 'ten crores'];
  function expandedForm(n) {
    const s = String(n), L = s.length, parts = [];
    for (let i = 0; i < L; i++) {
      const d = +s[i];
      if (d === 0) continue;
      parts.push(indianCommas(d * Math.pow(10, L - 1 - i)));
    }
    return parts.length ? parts.join(' + ') : '0';
  }
  function roundTo(n, base) { return Math.round(n / base) * base; }

  // ---------- roman ----------
  const ROMAN = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  function toRoman(n) {
    let out = '';
    for (const [v, sym] of ROMAN) { while (n >= v) { out += sym; n -= v; } }
    return out;
  }

  // ---------- markup helpers ----------
  const BLANK = '<span class="ws-blank wide"></span>';
  const BLANKS = '<span class="ws-blank"></span>';
  const WORK = '<div class="ws-workspace"></div>';
  const WORK_TALL = '<div class="ws-workspace tall"></div>';
  function underline(numStr, idx) {
    return numStr.slice(0, idx) + '<u>' + numStr[idx] + '</u>' + numStr.slice(idx + 1);
  }
  function ans(text) { return '<b>' + text + '</b>'; }

  // ============================================================
  //  GENERATORS — each returns { q, a }
  // ============================================================
  const gen = {
    // ----- Chapter 1 : Numbers -----
    indianComma() {
      const n = bigNumber(6, 9), r = indianCommas(n);
      return {
        q: `Put commas (Indian system) in <b>${n}</b> and write the number name. ${BLANK}`,
        a: `${n} → ${ans(r)} = ${ans(cap(indianWords(n)))}`
      };
    },
    intlComma() {
      const n = bigNumber(6, 9), r = intlCommas(n);
      return {
        q: `Put commas (International system) in <b>${n}</b> and write the number name. ${BLANK}`,
        a: `${n} → ${ans(r)} = ${ans(cap(intlWords(n)))}`
      };
    },
    numeralFromWords() {
      const intl = Math.random() < 0.5;
      const n = bigNumber(6, 8);
      const w = intl ? intlWords(n) : indianWords(n);
      return {
        q: `Write the numeral (${intl ? 'International' : 'Indian'} system): “${cap(w)}”. ${BLANK}`,
        a: `${ans(indianCommas(n))} (Indian) = ${ans(intlCommas(n))} (International)`
      };
    },
    placeValue() {
      let n, s, idx, d;
      do { n = bigNumber(6, 9); s = String(n); idx = randInt(0, s.length - 1); d = +s[idx]; } while (d === 0);
      const pos = s.length - 1 - idx;
      const pv = d * Math.pow(10, pos);
      return {
        q: `Place value of the underlined digit: ${underline(s, idx)} = ${BLANKS}`,
        a: `${underline(s, idx)} → ${d} in the ${INDIAN_PLACES[pos]} place = ${d} × ${indianCommas(Math.pow(10, pos))} = ${ans(indianCommas(pv))}`
      };
    },
    faceValue() {
      const n = bigNumber(6, 9), s = String(n), idx = randInt(0, s.length - 1), d = +s[idx];
      return {
        q: `Face value of the underlined digit: ${underline(s, idx)} = ${BLANKS}`,
        a: `Face value = the digit itself = ${ans(d)}`
      };
    },
    placeVsFace() {
      let n, s, idx, d;
      do { n = bigNumber(6, 8); s = String(n); idx = randInt(0, s.length - 4); d = +s[idx]; } while (d === 0);
      const pos = s.length - 1 - idx;
      const pv = d * Math.pow(10, pos);
      return {
        q: `In ${underline(s, idx)}, find (place value − face value) of the underlined digit. ${BLANK}`,
        a: `place value ${indianCommas(pv)} − face value ${d} = ${ans(indianCommas(pv - d))}`
      };
    },
    successor() {
      let n = bigNumber(6, 9);
      if (Math.random() < 0.4) n = Math.floor(n / 100) * 100 + 99;
      return {
        q: `Successor of ${indianCommas(n)} = ${BLANK}`,
        a: `${indianCommas(n)} + 1 = ${ans(indianCommas(n + 1))}`
      };
    },
    predecessor() {
      let n = bigNumber(6, 9);
      if (Math.random() < 0.4) n = Math.floor(n / 1000) * 1000;
      if (n < 2) n = 1000000;
      return {
        q: `Predecessor of ${indianCommas(n)} = ${BLANK}`,
        a: `${indianCommas(n)} − 1 = ${ans(indianCommas(n - 1))}`
      };
    },
    standardForm() {
      const n = bigNumber(6, 8);
      return {
        q: `Write in standard form: ${expandedForm(n)} = ${BLANK}`,
        a: `Add the parts → ${ans(indianCommas(n))}`
      };
    },
    expandForm() {
      const n = bigNumber(6, 8);
      return {
        q: `Write ${indianCommas(n)} in expanded form. ${BLANK}`,
        a: `${ans(expandedForm(n))}`
      };
    },
    compare() {
      const a = bigNumber(6, 9);
      let b;
      const k = pick(['close', 'far', 'far']);
      if (k === 'close') b = Math.max(1, a + pick([-1000, -100, -10, -1, 1, 10, 100, 1000]));
      else b = bigNumber(6, 9);
      const sign = a < b ? '<' : (a > b ? '>' : '=');
      return {
        q: `Compare (use &gt;, &lt; or =): ${indianCommas(a)} ____ ${indianCommas(b)}`,
        a: `${indianCommas(a)} ${ans(sign)} ${indianCommas(b)}`
      };
    },
    ordering() {
      const want = pick(['ascending', 'descending']);
      const base = bigNumber(6, 8);
      const set = new Set([base]);
      while (set.size < 4) set.add(Math.max(1, base + pick([-2100, -1500, -900, -300, 230, 770, 1900, 3300])));
      const nums = Array.from(set).slice(0, 4);
      const shown = shuffle(nums);
      const sorted = nums.slice().sort((x, y) => want === 'ascending' ? x - y : y - x);
      return {
        q: `Arrange in <b>${want}</b> order: ${shown.map(indianCommas).join(' , ')} <br>${BLANK}`,
        a: `${sorted.map(indianCommas).join(want === 'ascending' ? ' < ' : ' > ')}`
      };
    },
    rounding() {
      const base = pick([10, 100, 1000]);
      const n = randInt(10500, 989999);
      const r = roundTo(n, base);
      const nm = { 10: 'nearest 10', 100: 'nearest 100', 1000: 'nearest 1000' }[base];
      const decider = Math.floor((n % base) / (base / 10));
      const dir = (n % base) >= base / 2 ? 'up' : 'down';
      return {
        q: `Round off ${indianCommas(n)} to the ${nm}. ${BLANK}`,
        a: `digit to the right is ${decider} → round ${dir} → ${ans(indianCommas(r))}`
      };
    },
    romanTo() {
      const n = Math.random() < 0.5 ? randInt(4, 100) : randInt(40, 399);
      return {
        q: `Write the Roman numeral for ${n}. ${BLANKS}`,
        a: `${n} = ${ans(toRoman(n))}`
      };
    },
    romanFrom() {
      const n = Math.random() < 0.5 ? randInt(4, 100) : randInt(40, 399);
      return {
        q: `Write the number for ${toRoman(n)}. ${BLANKS}`,
        a: `${toRoman(n)} = ${ans(n)}`
      };
    },
    romanCompare() {
      const a = randInt(5, 90);
      const b = Math.max(1, a + pick([-7, -3, 0, 3, 7, 12]));
      const sign = a < b ? '<' : (a > b ? '>' : '=');
      return {
        q: `Compare (use &gt;, &lt; or =): ${toRoman(a)} ____ ${toRoman(b)}`,
        a: `${toRoman(a)} (=${a}) ${ans(sign)} ${toRoman(b)} (=${b})`
      };
    },

    // ----- Chapter 2 : The Four Operations -----
    addition() {
      const three = Math.random() < 0.4;
      const nums = three
        ? [bigNumber(5, 6), bigNumber(5, 6), bigNumber(4, 5)]
        : [bigNumber(6, 7), bigNumber(6, 7)];
      const total = nums.reduce((s, x) => s + x, 0);
      return {
        q: `<span class="ws-q-label">Find the sum:</span> ${nums.map(indianCommas).join(' + ')} =${WORK}`,
        a: `${nums.map(indianCommas).join(' + ')} = ${ans(indianCommas(total))}`,
        compute: true
      };
    },
    subtraction() {
      const a = bigNumber(6, 7);
      const b = randInt(10000, a - 1000);
      return {
        q: `<span class="ws-q-label">Find the difference:</span> ${indianCommas(a)} − ${indianCommas(b)} =${WORK}`,
        a: `${indianCommas(a)} − ${indianCommas(b)} = ${ans(indianCommas(a - b))}`,
        compute: true
      };
    },
    mixedAddSub() {
      const a = bigNumber(6, 6), b = randInt(1000, 90000), c = randInt(1000, 90000);
      const res = a + b - c;
      return {
        q: `<span class="ws-q-label">Solve:</span> ${indianCommas(a)} + ${indianCommas(b)} − ${indianCommas(c)} =${WORK}`,
        a: `${indianCommas(a)} + ${indianCommas(b)} = ${indianCommas(a + b)}; − ${indianCommas(c)} = ${ans(indianCommas(res))}`,
        compute: true
      };
    },
    multiply() {
      const a = randInt(1000, 9999);
      const b = Math.random() < 0.5 ? randInt(11, 99) : randInt(101, 999);
      return {
        q: `<span class="ws-q-label">Multiply:</span> ${indianCommas(a)} × ${b} =${WORK_TALL}`,
        a: `${indianCommas(a)} × ${b} = ${ans(indianCommas(a * b))}`,
        compute: true
      };
    },
    productPower() {
      const a = randInt(101, 9999), p = pick([10, 100, 1000]);
      const z = { 10: 'one zero', 100: 'two zeros', 1000: 'three zeros' }[p];
      return {
        q: `Find the product: ${indianCommas(a)} × ${p} = ${BLANK}`,
        a: `add ${z} → ${ans(indianCommas(a * p))}`
      };
    },
    quotientPower() {
      const p = pick([10, 100, 1000]);
      const dividend = randInt(p * 5, 999999);
      const q = Math.floor(dividend / p), r = dividend % p;
      return {
        q: `${indianCommas(dividend)} ÷ ${p} :  Quotient = ${BLANKS} , Remainder = ${BLANKS}`,
        a: `Q = ${ans(indianCommas(q))}, R = ${ans(r)}`
      };
    },
    divide() {
      const divisor = randInt(12, 199);
      const q = randInt(20, 999);
      const r = randInt(0, divisor - 1);
      const dividend = divisor * q + r;
      return {
        q: `<span class="ws-q-label">Divide</span> ${indianCommas(dividend)} ÷ ${divisor} :  Q = ${BLANKS} , R = ${BLANKS}${WORK_TALL}`,
        a: `Q = ${ans(indianCommas(q))}, R = ${ans(r)}  (check: ${indianCommas(q)} × ${divisor} + ${r} = ${indianCommas(dividend)})`,
        compute: true
      };
    },
    divideCheck() {
      const divisor = randInt(6, 99);
      const q = randInt(50, 9999);
      const r = randInt(0, divisor - 1);
      const dividend = divisor * q + r;
      return {
        q: `<span class="ws-q-label">Divide and check:</span> ${indianCommas(dividend)} ÷ ${divisor}. Find Q and R, then verify (Q × divisor) + R = dividend.${WORK_TALL}`,
        a: `Q = ${ans(indianCommas(q))}, R = ${ans(r)}. Check: (${indianCommas(q)} × ${divisor}) + ${r} = ${indianCommas(q * divisor)} + ${r} = ${ans(indianCommas(dividend))} ✓`,
        compute: true
      };
    },
    missingDigit() {
      const k = pick(['add', 'sub', 'mul', 'div']);
      if (k === 'add') {
        const a = randInt(1000, 99999), b = randInt(1000, 99999);
        return { q: `? + ${indianCommas(a)} = ${indianCommas(a + b)} ; ? = ${BLANKS}`, a: `? = ${indianCommas(a + b)} − ${indianCommas(a)} = ${ans(indianCommas(b))}` };
      }
      if (k === 'sub') {
        const a = randInt(5000, 99999), b = randInt(100, a - 100);
        return { q: `${indianCommas(a)} − ? = ${indianCommas(a - b)} ; ? = ${BLANKS}`, a: `? = ${indianCommas(a)} − ${indianCommas(a - b)} = ${ans(indianCommas(b))}` };
      }
      if (k === 'mul') {
        const a = randInt(3, 12), b = randInt(11, 99);
        return { q: `${a} × ? = ${indianCommas(a * b)} ; ? = ${BLANKS}`, a: `? = ${indianCommas(a * b)} ÷ ${a} = ${ans(b)}` };
      }
      const b = randInt(3, 12), q = randInt(11, 99);
      return { q: `${indianCommas(b * q)} ÷ ? = ${q} ; ? = ${BLANKS}`, a: `? = ${indianCommas(b * q)} ÷ ${q} = ${ans(b)}` };
    },
    wordProblem() {
      const k = pick(['moneyLeft', 'totalCost', 'share', 'attendance', 'twoStep']);
      if (k === 'moneyLeft') {
        const land = randInt(2000000, 9999999), spent = randInt(500000, land - 100000);
        return { q: `Sita had ₹${indianCommas(land)} and spent ₹${indianCommas(spent)} on land. Money left? ${BLANK}${WORK}`, a: `₹${indianCommas(land)} − ₹${indianCommas(spent)} = ${ans('₹' + indianCommas(land - spent))}`, compute: true };
      }
      if (k === 'totalCost') {
        const price = randInt(1200, 9800), qty = randInt(12, 99);
        return { q: `A factory makes ${qty} machines, each worth ₹${indianCommas(price)}. Total value? ${BLANK}${WORK}`, a: `${qty} × ₹${indianCommas(price)} = ${ans('₹' + indianCommas(price * qty))}`, compute: true };
      }
      if (k === 'share') {
        const people = pick([12, 15, 18, 24, 25]), each = randInt(150, 999);
        const total = people * each + randInt(0, people - 1);
        const q = Math.floor(total / people), r = total % people;
        return { q: `${indianCommas(total)} sweets shared equally among ${people} children. Each child gets? (state remainder too) ${BLANK}${WORK}`, a: `${indianCommas(total)} ÷ ${people} = ${ans(indianCommas(q))} each, remainder ${ans(r)}`, compute: true };
      }
      if (k === 'attendance') {
        const a = randInt(200000, 900000), b = randInt(50000, a - 10000);
        return { q: `A stadium had ${indianCommas(a)} fans; ${indianCommas(b)} left at half-time. How many remained? ${BLANK}${WORK}`, a: `${indianCommas(a)} − ${indianCommas(b)} = ${ans(indianCommas(a - b))}`, compute: true };
      }
      const boxes = randInt(120, 480), perBox = randInt(24, 60), sold = randInt(1000, 8000);
      const made = boxes * perBox;
      return { q: `A bakery packs ${indianCommas(boxes)} boxes of ${perBox} buns each, then sells ${indianCommas(sold)} buns. How many buns are left? ${BLANK}${WORK_TALL}`, a: `Made = ${indianCommas(boxes)} × ${perBox} = ${indianCommas(made)}; left = ${indianCommas(made)} − ${indianCommas(sold)} = ${ans(indianCommas(made - sold))}`, compute: true };
    }
  };

  // ============================================================
  //  PAPER BUILDER
  // ============================================================
  function buildSectionItems(genName, count) {
    const items = [];
    const seen = new Set();
    let tries = 0;
    const fn = gen[genName];
    if (!fn) throw new Error('Unknown generator: ' + genName);
    while (items.length < count && tries < count * 20) {
      tries++;
      const item = fn();
      if (seen.has(item.q)) continue;
      seen.add(item.q);
      items.push(item);
    }
    return items;
  }

  function letterFor(i) { return String.fromCharCode(65 + i); }

  function buildPaper(opts) {
    const root = document.getElementById(opts.mount || 'paper');
    const App = window.App;
    const sections = opts.sections;
    let totalMarks = 0;

    const secHtml = [];
    const keyHtml = [];

    sections.forEach((sec, si) => {
      const letter = letterFor(si);
      const items = buildSectionItems(sec.gen, sec.count);
      const marks = sec.marks != null ? sec.marks : items.length;
      totalMarks += marks;

      const liClass = items.length && items[0].compute ? ' class="ws-compute"' : '';
      const listClass = 'ws-list' + (sec.grid ? ' ws-grid' : '');
      const qItems = items.map(it => `<li${liClass}>${it.q}</li>`).join('');
      secHtml.push(`
        <section class="worksheet__section">
          <h2><span class="section-letter">${letter}.</span> ${sec.title}
            <span style="float:right; font-size:10pt; font-weight:normal;">(${marks} mark${marks === 1 ? '' : 's'})</span></h2>
          ${sec.instructions ? `<p class="worksheet__instructions">${sec.instructions}</p>` : ''}
          <ol class="${listClass}">${qItems}</ol>
        </section>`);

      const aItems = items.map(it => `<li>${it.a}</li>`).join('');
      keyHtml.push(`<div class="answer-key__section"><h3>${letter}. ${sec.title}</h3><ol class="answer-key__list">${aItems}</ol></div>`);
    });

    const dateStr = (App && App.formatDateDMY) ? App.formatDateDMY(new Date()) : '';
    root.innerHTML = `
      <div class="worksheet__header">
        <div class="worksheet__title-block">
          <h1>${opts.title}</h1>
          <p class="subtitle">${opts.subtitle}</p>
        </div>
        <div class="worksheet__fields">
          <label>Name:</label><span class="blank"></span>
          <label>Date:</label><span class="blank">${dateStr}</span>
          <label>Time:</label><span class="blank">40 min</span>
          <label>Score:</label><span class="blank">&nbsp;&nbsp; / ${totalMarks}</span>
        </div>
      </div>
      ${opts.intro ? `<p class="worksheet__instructions" style="font-size:11pt;">${opts.intro}</p>` : ''}
      ${secHtml.join('')}
      <section class="answer-key" id="answer-key">
        <h1>🗝️ Answer Key — full working</h1>
        <p class="muted">For the parent/teacher. Crispin: try every question first, then check.</p>
        ${keyHtml.join('')}
      </section>`;
  }

  // ---------- toolbar wiring (printing question paper / key separately) ----------
  function printOnly(cls) {
    document.body.classList.add(cls);
    const cleanup = () => { document.body.classList.remove(cls); window.removeEventListener('afterprint', cleanup); };
    window.addEventListener('afterprint', cleanup);
    window.print();
    // Safety net for browsers that don't fire afterprint
    setTimeout(cleanup, 1500);
  }
  function toggleAnswers() {
    const k = document.getElementById('answer-key');
    if (k) k.style.display = (k.style.display === 'none') ? 'block' : 'none';
  }

  window.PP = {
    randInt, pick, shuffle, indianCommas, intlCommas, indianWords, intlWords,
    toRoman, expandedForm, roundTo, gen, buildPaper,
    printQuestions: () => printOnly('print-questions-only'),
    printAnswers: () => printOnly('print-answers-only'),
    toggleAnswers
  };
})();
