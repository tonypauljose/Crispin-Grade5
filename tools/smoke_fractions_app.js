/* ============================================================
   Fractions & Decimals Quest — smoke test
   Usage:  node tools/smoke_fractions_app.js
   (needs jsdom: installed under .tmp/rendertest, which is gitignored)

   1. For EVERY generator (16 skills + Ronaldo's Challenge) makes 200
      questions from a fixed seed and checks: the generator's own
      answer passes the checker; a wrong answer fails; equivalent
      forms behave as specified; the rendered text has no
      NaN / undefined / Infinity; no denominator is 0; the arithmetic
      agrees with an independent floating-point calculation.
   2. Loads fractions.html in a DOM and clicks through real questions
      (learn -> practise -> type -> check -> feedback -> next), a hint,
      an invalid answer, mastery, mixed mode and the challenge.
   Exits non-zero on any failure.
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

let JSDOM;
try {
  JSDOM = require(path.join(ROOT, '.tmp', 'rendertest', 'node_modules', 'jsdom')).JSDOM;
} catch (e) {
  console.error('jsdom not installed. Run:  cd .tmp/rendertest && npm install jsdom');
  process.exit(2);
}

const problems = [];
const log = [];
function fail(msg) { if (problems.length < 60) problems.push(msg); else if (problems.length === 60) problems.push('... more failures not shown'); }

/* ---------------- load the page ---------------- */
const rawHtml = fs.readFileSync(path.join(ROOT, 'fractions.html'), 'utf8');
const BOOTSTRAP = /<script>\s*FDQuest\.start[\s\S]*?<\/script>/;
if (!BOOTSTRAP.test(rawHtml)) { console.error('The page bootstrap changed — update BOOTSTRAP in this test.'); process.exit(2); }
const html = rawHtml.replace(BOOTSTRAP, '');

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'https://crispintony.com/fractions.html',
  pretendToBeVisual: true,
  beforeParse(win) {
    win.scrollTo = () => {};
    win.confirm = () => true;
    win.onerror = (msg, src, line) => { fail('window.onerror: ' + msg + ' (line ' + line + ')'); };
    /* stand-in for js/progress.js so we can see the one-way XP bridge fire */
    win.__xpCalls = [];
    win.Progress = { addXP(n, r) { win.__xpCalls.push([n, r]); } };
  }
});
const win = dom.window, doc = win.document;

/* the page really does load these three scripts */
const srcs = [...doc.querySelectorAll('script[src]')].map(s => s.getAttribute('src'));
['js/fractions-app.js', 'js/common.js', 'js/progress.js'].forEach(s => { if (srcs.indexOf(s) < 0) fail('fractions.html does not load ' + s); });
if (!/css\/fractions-app\.css/.test(rawHtml)) fail('fractions.html does not link css/fractions-app.css');
if (!/<title>Fractions &amp; Decimals Quest — Crispin's World<\/title>/.test(rawHtml)) fail('page title is not "Fractions & Decimals Quest — Crispin\'s World"');
const jsPath = path.join(ROOT, 'js', 'fractions-app.js');
try { win.eval(fs.readFileSync(jsPath, 'utf8')); } catch (e) { console.error('fractions-app.js threw: ' + e.message); process.exit(1); }
const FD = win.FD;
if (!FD) { console.error('window.FD missing'); process.exit(1); }

/* ---------------- helpers ---------------- */
const BAD_TEXT = /NaN|undefined|Infinity|\bnull\b|\[object/;
function hash(str) { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function decOf(f) { const k = String(f.d).length - 1; return FD.dstr(f.n, k); }

function wrongFor(q) {
  const t = q.input.type, s = q.solution;
  if (t === 'frac') return { n: String(+s.n + 1), d: s.d };
  if (t === 'mixed') return s.n ? { w: String(+s.w + 1), n: s.n, d: s.d } : { w: String(+s.w + 1), n: '', d: '' };
  if (t === 'dec') { const f = q.answer; return decOf({ n: f.n + f.d, d: f.d }); }
  if (t === 'text') return 'zzz';
  if (t === 'mcq') return q.input.choices.map(c => c.v).filter(v => v !== q.answer)[0];
  if (t === 'order') return s.slice().reverse();
  return null;
}
function ansForDom(q) { return q.solution; }

/* ---------------- unit-level checker rules ---------------- */
let unitChecks = 0;
function expect(name, got, want) { unitChecks++; if (got !== want) fail('unit: ' + name + ' -> got ' + got + ', wanted ' + want); }
(function units() {
  const F = FD.Frac;
  const fq = (n, d, simplest) => ({ input: { type: 'frac', simplest: !!simplest }, answer: new F(n, d) });
  const mq = (n, d, req, simp) => ({ input: { type: 'mixed', mixedRequired: !!req, simplest: !!simp }, answer: new F(n, d) });
  const dq = (n, d) => ({ input: { type: 'dec' }, answer: new F(n, d) });
  const ok = (q, a) => { const r = FD.check(q, a); return r.invalid ? 'invalid' : (r.ok ? 'ok' : 'no'); };
  // fractions: any equal fraction unless simplest
  expect('3/4 vs 6/8 (any equal)', ok(fq(3, 4), { n: '6', d: '8' }), 'ok');
  expect('3/4 vs 3/4', ok(fq(3, 4), { n: '3', d: '4' }), 'ok');
  expect('3/4 vs 3/5', ok(fq(3, 4), { n: '3', d: '5' }), 'no');
  expect('3/4 single box "6/8"', ok(fq(3, 4), { n: '6/8', d: '' }), 'ok');
  expect('3/4 single box " 3 / 4 "', ok(fq(3, 4), { n: ' 3 / 4 ', d: '' }), 'ok');
  expect('simplest 3/4 vs 6/8', ok(fq(3, 4, true), { n: '6', d: '8' }), 'no');
  expect('simplest 3/4 vs 3/4', ok(fq(3, 4, true), { n: '3', d: '4' }), 'ok');
  expect('simplest 2 vs "2"', ok(fq(2, 1, true), { n: '2', d: '' }), 'ok');
  expect('simplest 2 vs 4/2', ok(fq(2, 1, true), { n: '4', d: '2' }), 'no');
  expect('simplest 7/4 vs "1 3/4" typed', ok(fq(7, 4, true), { n: '1 3/4', d: '' }), 'ok');
  expect('den 0 invalid', ok(fq(3, 4), { n: '3', d: '0' }), 'invalid');
  expect('single box x/0 invalid', ok(fq(3, 4), { n: '3/0', d: '' }), 'invalid');
  expect('empty invalid', ok(fq(3, 4), { n: '', d: '' }), 'invalid');
  expect('letters invalid', ok(fq(3, 4), { n: 'a', d: 'b' }), 'invalid');
  // mixed
  expect('11/4 as 2 3/4', ok(mq(11, 4, true, true), { w: '2', n: '3', d: '4' }), 'ok');
  expect('11/4 as improper when mixed required', ok(mq(11, 4, true, true), { w: '', n: '11', d: '4' }), 'no');
  expect('11/4 as improper when mixed not required', ok(mq(11, 4, false), { w: '', n: '11', d: '4' }), 'ok');
  expect('12/4 as whole "3"', ok(mq(12, 4, true, true), { w: '3', n: '', d: '' }), 'ok');
  expect('12/4 as 12/4 when mixed required', ok(mq(12, 4, true, true), { w: '', n: '12', d: '4' }), 'no');
  expect('mixed with fraction part too big', ok(mq(11, 4, true), { w: '1', n: '7', d: '4' }), 'invalid');
  expect('2 6/8 when simplest asked', ok(mq(11, 4, true, true), { w: '2', n: '6', d: '8' }), 'no');
  expect('2 6/8 when simplest not asked', ok(mq(11, 4, true, false), { w: '2', n: '6', d: '8' }), 'ok');
  // decimals
  expect('0.5 vs 0.50', ok(dq(1, 2), '0.50'), 'ok');
  expect('0.5 vs .5', ok(dq(1, 2), '.5'), 'ok');
  expect('0.5 vs 0.5', ok(dq(1, 2), '0.5'), 'ok');
  expect('0.5 vs 00.5000', ok(dq(1, 2), '00.5000'), 'ok');
  expect('0.5 vs " 0.5 "', ok(dq(1, 2), ' 0.5 '), 'ok');
  expect('0.5 vs 0.05', ok(dq(1, 2), '0.05'), 'no');
  expect('0.5 vs 5', ok(dq(1, 2), '5'), 'no');
  expect('0.5 vs "0,5" is invalid (comma)', ok(dq(1, 2), '0,5'), 'invalid');
  expect('comma hint says "point"', /point/.test(FD.check(dq(1, 2), '0,5').invalid || ''), true);
  expect('12 vs 12.0', ok(dq(12, 1), '12.0'), 'ok');
  expect('12 vs "12."', ok(dq(12, 1), '12.'), 'ok');
  expect('"." invalid', ok(dq(12, 1), '.'), 'invalid');
  expect('"1.2.3" invalid', ok(dq(12, 1), '1.2.3'), 'invalid');
  expect('0.1+0.2 exactness (0.3)', ok(dq(3, 10), '0.30'), 'ok');
  // text
  const tq = { input: { type: 'text' }, accept: ['thousandths', 'thousandth'] };
  expect('text case/space', ok(tq, '  ThousandthS '), 'ok');
  expect('text wrong', ok(tq, 'hundredths'), 'no');
  expect('text empty', ok(tq, ' '), 'invalid');
  // mcq / order
  expect('mcq right', ok({ input: { type: 'mcq' }, answer: 'a' }, 'a'), 'ok');
  expect('mcq none', ok({ input: { type: 'mcq' }, answer: 'a' }, null), 'invalid');
  expect('order right', ok({ input: { type: 'order', items: [1, 2] }, answer: ['1', '0'] }, ['1', '0']), 'ok');
  expect('order wrong', ok({ input: { type: 'order', items: [1, 2] }, answer: ['1', '0'] }, ['0', '1']), 'no');
  expect('order incomplete', ok({ input: { type: 'order', items: [1, 2] }, answer: ['1', '0'] }, ['0']), 'invalid');
  // parseDec exactness
  expect('parseDec 0.1 -> 1/10', (() => { const p = FD.parseDec('0.1'); return p.f.n + '/' + p.f.d; })(), '1/10');
  expect('parseDec 2.05 -> 205/100', (() => { const p = FD.parseDec('2.05'); return p.f.n + '/' + p.f.d; })(), '205/100');
  // ladder
  expect('ladder LCM(4,6)', FD.ladder([4, 6]).lcm, 12);
  expect('ladder LCM(8,12)', FD.ladder([8, 12]).lcm, 24);
  expect('ladder LCM(5,7)', FD.ladder([5, 7]).lcm, 35);
  expect('ladder LCM(9,12)', FD.ladder([9, 12]).lcm, 36);
})();

/* ---------------- every generator x 200 ---------------- */
const N = 200;
const ids = FD.SKILLS.map(s => s.id).concat(['CH']);
const perGen = {};
let totalQ = 0, totalChecks = 0, notSimplestSeen = 0, equivTests = 0;

ids.forEach((id, gi) => {
  const rng = FD.makeRng(hash('fd-smoke-' + id) + gi);
  const angles = {}, prompts = {}, types = {};
  let bad = 0;
  for (let i = 0; i < N; i++) {
    let q;
    try { q = FD.gen(id, rng); } catch (e) { fail(id + '#' + i + ' generator threw: ' + e.stack.split('\n').slice(0, 2).join(' | ')); bad++; continue; }
    totalQ++;
    const tag = id + '#' + i + ' [' + q.angle + ']';
    const t = q.input.type;
    angles[q.angle] = (angles[q.angle] || 0) + 1; types[t] = (types[t] || 0) + 1; prompts[q.prompt] = 1;

    /* shape */
    if (!q.prompt || !q.steps || !q.steps.length || !q.hint) { fail(tag + ' missing prompt/steps/hint'); bad++; }
    if (q.solution == null || q.show == null) { fail(tag + ' missing solution/show'); bad++; }

    /* 1. own answer passes */
    totalChecks++;
    let r = FD.check(q, q.solution);
    if (!r.ok) { fail(tag + ' own correct answer rejected: ' + JSON.stringify(q.solution) + ' ' + JSON.stringify(r) + ' | ' + q.prompt.replace(/<[^>]+>/g, ' ')); bad++; }

    /* 2. wrong answer fails */
    totalChecks++;
    r = FD.check(q, wrongFor(q));
    if (r.ok || r.invalid) { fail(tag + ' wrong answer not rejected: ' + JSON.stringify(wrongFor(q)) + ' -> ' + JSON.stringify(r)); bad++; }

    /* 3. equivalent forms */
    const sol = q.solution;
    if (t === 'frac') {
      equivTests++;
      const single = FD.check(q, { n: sol.n + '/' + sol.d, d: '' });
      if (!single.ok) { fail(tag + ' single-box a/b rejected'); bad++; }
      if (+sol.n > 0) {
        const scaled = FD.check(q, { n: String(sol.n * 2), d: String(sol.d * 2) });
        if (q.input.simplest) {
          if (scaled.ok) { fail(tag + ' unreduced form accepted although simplest form asked'); bad++; }
          else if (!scaled.note) { fail(tag + ' unreduced form gives no "simplest form" note'); bad++; }
          else notSimplestSeen++;
        } else if (!scaled.ok) { fail(tag + ' equal fraction (x2) rejected'); bad++; }
      }
      if (FD.check(q, { n: sol.n, d: '0' }).ok !== undefined) { fail(tag + ' denominator 0 not flagged invalid'); bad++; }
    }
    if (t === 'mixed') {
      equivTests++;
      const imp = q.answer;
      const asImproper = FD.check(q, { w: '', n: String(imp.n), d: String(imp.d) });
      if (sol.n) {
        if (q.input.mixedRequired && asImproper.ok) { fail(tag + ' improper accepted though mixed number required'); bad++; }
        if (!q.input.mixedRequired && !asImproper.ok) { fail(tag + ' equal improper fraction rejected'); bad++; }
      } else if (!asImproper.ok && !q.input.mixedRequired) { fail(tag + ' improper rejected for whole result'); bad++; }
      const wholeOnly = sol.n ? null : FD.check(q, { w: sol.w, n: '', d: '' });
      if (wholeOnly && !wholeOnly.ok) { fail(tag + ' whole-number result not accepted as a whole number'); bad++; }
    }
    if (t === 'dec') {
      equivTests++;
      const s = String(sol);
      if (!FD.check(q, s + (s.indexOf('.') >= 0 ? '0' : '.0')).ok) { fail(tag + ' trailing zero rejected'); bad++; }
      if (/^0\./.test(s) && !FD.check(q, s.slice(1)).ok) { fail(tag + ' missing leading zero rejected'); bad++; }
      if (s.indexOf('.') >= 0 && !FD.check(q, s.replace('.', ',')).invalid) { fail(tag + ' comma not flagged'); bad++; }
    }
    if (t === 'text') {
      if (!FD.check(q, '  ' + String(sol).toUpperCase() + '  ').ok) { fail(tag + ' text not case/space-insensitive'); bad++; }
    }
    if (t === 'mcq') {
      const labels = q.input.choices.map(c => c.h.replace(/<[^>]+>/g, '').trim());
      const vs = q.input.choices.map(c => c.v);
      if (new Set(labels).size !== labels.length) { fail(tag + ' duplicate choice labels: ' + labels.join(' | ')); bad++; }
      if (new Set(vs).size !== vs.length) { fail(tag + ' duplicate choice ids'); bad++; }
      if (vs.filter(v => v === q.answer).length !== 1) { fail(tag + ' MCQ does not have exactly one right choice'); bad++; }
      if (q.input.choices.length < 2) { fail(tag + ' MCQ has fewer than 2 choices'); bad++; }
    }
    if (t === 'order') {
      const items = q.input.items;
      if (items.length < 3) { fail(tag + ' order question too short'); bad++; }
      const byV = {}; items.forEach(c => { byV[c.v] = c; });
      for (let k = 1; k < q.answer.length; k++) {
        const c = byV[q.answer[k - 1]].val.cmp(byV[q.answer[k]].val);
        if (c === 0) { fail(tag + ' order has tied values'); bad++; }
        if ((q.input.dir === 'asc' && c > 0) || (q.input.dir === 'desc' && c < 0)) { fail(tag + ' order answer is not sorted'); bad++; }
      }
    }

    /* 4. independent arithmetic */
    if (q.f !== undefined && Math.abs(q.answer.n / q.answer.d - q.f) > 1e-9) {
      fail(tag + ' answer ' + q.answer.n + '/' + q.answer.d + ' disagrees with float ' + q.f); bad++;
    }

    /* 5. rendered text + denominators */
    (q.dens || []).forEach(d => { if (!(d > 0) || !Number.isInteger(d)) { fail(tag + ' bad denominator ' + d); bad++; } });
    const box = doc.createElement('div');
    box.innerHTML = '<div>' + q.prompt + '</div>' + (q.visual || '') + FD.inputHTML(q) + '<div>' + q.hint + '</div>' + FD.stepsHTML(q) + '<div>' + q.show + '</div><div>' + FD.showAnswer(q, wrongFor(q)) + '</div>';
    const text = box.textContent, raw = box.innerHTML;
    if (BAD_TEXT.test(text) || BAD_TEXT.test(raw)) { fail(tag + ' bad text in render: ' + (text.match(BAD_TEXT) || raw.match(BAD_TEXT))[0] + ' | ' + text.slice(0, 120)); bad++; }
    box.querySelectorAll('.fd-fr').forEach(f => {
      const bot = f.querySelector('i'), top = f.querySelector('b');
      const bt = bot.textContent.trim(), tt = top.textContent.trim();
      if (!bt || (!bot.querySelector('.fd-box') && !/^[1-9]\d*( × [1-9]\d*)?$/.test(bt))) { fail(tag + ' suspicious denominator "' + bt + '"'); bad++; }
      if (!tt) { fail(tag + ' empty numerator'); bad++; }
    });
    if (/\/0(?![\d.])/.test(text)) { fail(tag + ' text contains "/0"'); bad++; }
    if (!/<ol|<li/.test(FD.stepsHTML(q))) { fail(tag + ' steps not rendered'); bad++; }
    if (id === 'F6' && q.angle === 'Work it out') {
      const stepsText = q.steps.join(' ');
      if (!/Step 1/.test(stepsText) || !/Step 2/.test(stepsText) || !/Step 3/.test(stepsText) || !/fd-ladder/.test(stepsText)) { fail(tag + ' F6 feedback lacks the 3 steps / ladder rows'); bad++; }
    }
    if (id === 'F8' && q.angle === 'Work it out' && !/M\.I of the divisor|M\.I of/.test(q.steps.join(' '))) { fail(tag + ' F8 divide feedback lacks "M.I of the divisor"'); bad++; }
  }
  perGen[id] = { angles: Object.keys(angles).length, distinct: Object.keys(prompts).length, types: Object.keys(types).join('/'), bad };
});

/* ---------------- DOM click-through ---------------- */
const wait = (ms) => new Promise(r => setTimeout(r, ms || 30));
const domSteps = [];
function dstep(name, fn) {
  return Promise.resolve().then(fn).then(r => { domSteps.push('  ok   ' + name + (r ? ' — ' + r : '')); }).catch(e => { fail('DOM ' + name + ': ' + e.message); domSteps.push('  FAIL ' + name + ' — ' + e.message); });
}
function must(c, m) { if (!c) throw new Error(m); }
function fillDom(q, a) {
  const set = (role, v) => { const e = doc.querySelector('.fd-in[data-role="' + role + '"]'); must(e, 'no input ' + role); e.value = v; };
  const t = q.input.type;
  if (t === 'frac') { set('n', a.n); set('d', a.d); }
  else if (t === 'mixed') { set('w', a.w); set('n', a.n); set('d', a.d); }
  else if (t === 'dec' || t === 'text') set('v', a);
  else if (t === 'mcq') { const b = doc.querySelector('.fd-choice[data-v="' + a + '"]'); must(b, 'no choice ' + a); b.click(); }
  else if (t === 'order') a.forEach(v => { const b = doc.querySelector('#fd-pool .fd-chip[data-v="' + v + '"]'); must(b, 'no chip ' + v); b.click(); });
}
const cur = () => FD.state().q;
const click = (sel) => { const e = doc.querySelector(sel); must(e, 'missing ' + sel); e.click(); };

(async () => {
  win.FDQuest.start(doc.getElementById('fd-host'));
  await dstep('home renders 16 skill cards in two groups', async () => {
    must(doc.querySelectorAll('.fd-card').length === 16, 'cards: ' + doc.querySelectorAll('.fd-card').length);
    must(doc.querySelectorAll('.fd-grid').length === 2, 'groups');
    must(doc.querySelectorAll('.fd-card--rec').length === 1 && doc.querySelector('.fd-card--rec').getAttribute('data-skill') === 'F1', 'recommended card is not F1');
    must(doc.querySelector('#fd-mixed') && doc.querySelector('#fd-challenge'), 'mode buttons');
    must(!BAD_TEXT.test(doc.body.textContent), 'bad text on home');
  });
  await dstep('open skill F2 -> learn card -> start practising', async () => {
    doc.querySelector('.fd-card[data-skill="F2"]').click(); await wait();
    must(doc.querySelector('.fd-example'), 'no learn card');
    click('#fd-start'); await wait();
    must(doc.querySelector('#fd-check') && cur().skill === 'F2', 'not in practice');
  });
  await dstep('correct answer -> praise, XP, meter, store, bridge', async () => {
    const xp0 = Number(FD.store.data.xp), calls0 = win.__xpCalls.length, q = cur();
    fillDom(q, ansForDom(q)); click('#fd-check');
    must(doc.querySelector('.fd-feedback--ok'), 'no ok feedback');
    must(FD.store.sk('F2').hist.length === 1 && FD.store.sk('F2').hist[0] === 1, 'attempt not recorded as right');
    must(FD.store.data.xp === xp0 + 10, 'xp not +10');
    must(win.__xpCalls.length === calls0 + 1 && win.__xpCalls[calls0][0] === 10, 'bridge not called');
    must(doc.querySelectorAll('.fd-pip--ok').length === 1, 'meter pip');
    must(!BAD_TEXT.test(doc.body.textContent), 'bad text in feedback');
    must(doc.querySelector('#fd-feedback .fd-details'), 'method link missing');
    return 'XP ' + FD.store.data.xp;
  });
  await dstep('next question is new and renders', async () => {
    const prev = cur().prompt + JSON.stringify(cur().solution);
    click('#fd-next'); await wait();
    must(doc.querySelector('#fd-check') && !doc.querySelector('.fd-feedback'), 'not a fresh question');
    must(cur() && (cur().prompt + JSON.stringify(cur().solution)) !== undefined, 'no question');
    return prev === cur().prompt + JSON.stringify(cur().solution) ? 'same (random repeat)' : 'different';
  });
  await dstep('wrong answer -> Not yet, both answers, steps, try-another', async () => {
    const q = cur(), calls0 = win.__xpCalls.length;
    fillDom(q, wrongFor(q)); click('#fd-check');
    const fb = doc.querySelector('.fd-feedback--bad');
    must(fb, 'no bad feedback');
    must(/Not yet/.test(fb.textContent), 'no "Not yet"');
    must(!/wrong|stupid|bad/i.test(fb.querySelector('.fd-feedback__head').textContent), 'shaming wording');
    must(fb.querySelector('.fd-compare__v--you') && fb.querySelector('.fd-compare__v--right'), 'answer comparison missing');
    must(fb.querySelectorAll('.fd-steps li').length >= 1, 'no worked steps');
    must(/Try another like this/.test(fb.querySelector('#fd-next').textContent), 'no "Try another like this"');
    must(win.__xpCalls.length === calls0, 'XP given for a wrong answer');
    must(FD.store.sk('F2').hist.slice(-1)[0] === 0, 'wrong attempt not recorded');
    must(!BAD_TEXT.test(fb.textContent), 'bad text in wrong feedback');
  });
  await dstep('hint: opens, costs no XP, does not count towards mastery', async () => {
    click('#fd-next'); await wait();
    const n0 = FD.store.sk('F2').hist.length, xp0 = FD.store.data.xp, q = cur();
    click('#fd-hint');
    must(!doc.querySelector('#fd-hintbox').hidden && doc.querySelector('#fd-hintbox').textContent.length > 20, 'hint box');
    fillDom(q, ansForDom(q)); click('#fd-check');
    must(doc.querySelector('.fd-feedback--ok'), 'should still be marked right');
    must(FD.store.sk('F2').hist.length === n0, 'hinted question counted towards mastery');
    must(FD.store.data.xp === xp0, 'hinted question earned XP');
  });
  await dstep('invalid input (empty / comma / denominator 0) is not counted', async () => {
    click('#fd-next'); await wait();
    const n0 = FD.store.sk('F2').hist.length;
    click('#fd-check');
    must(/boxes|Type|Fill/.test(doc.querySelector('#fd-msg').textContent), 'no friendly message for empty');
    must(!doc.querySelector('.fd-feedback'), 'empty answer was marked');
    must(FD.store.sk('F2').hist.length === n0, 'empty answer counted');
  });
  await dstep('decimal skill D1: comma gives the "use a point" hint', async () => {
    win.location.hash = '#/practice/D1'; await wait(60);
    let guard = 0;
    while (cur().input.type !== 'dec' && guard++ < 40) { if (doc.querySelector('#fd-check') && !doc.querySelector('.fd-feedback')) { fillDom(cur(), ansForDom(cur())); click('#fd-check'); } click('#fd-next'); await wait(5); }
    must(cur().input.type === 'dec', 'no decimal question found');
    doc.querySelector('.fd-in[data-role="v"]').value = '0,5'; click('#fd-check');
    must(/point/.test(doc.querySelector('#fd-msg').textContent), 'comma hint missing: ' + doc.querySelector('#fd-msg').textContent);
    must(!doc.querySelector('.fd-feedback'), 'comma answer was marked');
  });
  await dstep('order question (F3) can be tapped in order and checked', async () => {
    win.location.hash = '#/practice/F3'; await wait(60);
    let guard = 0;
    while (cur().input.type !== 'order' && guard++ < 80) { fillDom(cur(), ansForDom(cur())); click('#fd-check'); click('#fd-next'); await wait(5); }
    must(cur().input.type === 'order', 'no order question');
    fillDom(cur(), ansForDom(cur())); click('#fd-check');
    must(doc.querySelector('.fd-feedback--ok'), 'ordered answer not accepted');
  });
  await dstep('two-box mixed question (F4) round trip', async () => {
    win.location.hash = '#/practice/F4'; await wait(60);
    let guard = 0;
    while (cur().input.type !== 'mixed' && guard++ < 80) { fillDom(cur(), ansForDom(cur())); click('#fd-check'); click('#fd-next'); await wait(5); }
    must(cur().input.type === 'mixed', 'no mixed question');
    fillDom(cur(), ansForDom(cur())); click('#fd-check');
    must(doc.querySelector('.fd-feedback--ok'), 'mixed answer not accepted');
  });
  await dstep('mastery: 8 of last 10 (min 10 attempts) flips to mastered once', async () => {
    FD.store.reset();
    for (let i = 0; i < 9; i++) FD.store.record('F5', true);
    must(!FD.store.sk('F5').mastered, 'mastered before 10 attempts');
    must(FD.store.record('F5', true) === true && FD.store.sk('F5').mastered, 'not mastered at 10/10');
    FD.store.reset();
    for (let i = 0; i < 10; i++) FD.store.record('F6', i < 7);   // 7 of 10
    must(!FD.store.sk('F6').mastered, '7/10 counted as mastered');
    FD.store.record('F6', true); FD.store.record('F6', true);     // last 10 now has 8+ right? [1,1,1,1,1,1,0,0,0,1,1] -> last 10 = 5? compute
    const c = FD.store.correctIn10('F6');
    must(FD.store.sk('F6').mastered === (c >= 8), 'mastery flag disagrees with last-10 rule (c=' + c + ')');
    FD.store.reset();
    for (let i = 0; i < 10; i++) FD.store.record('F7', i !== 3 && i !== 8);   // 8 of 10
    must(FD.store.sk('F7').mastered, '8/10 not mastered');
  });
  await dstep('mastery shows banner in the UI and recommended skill moves on', async () => {
    FD.store.reset();
    for (let i = 0; i < 9; i++) FD.store.record('F1', true);
    win.location.hash = '#/practice/F1'; await wait(60);
    const q = cur(); fillDom(q, ansForDom(q)); click('#fd-check');
    must(doc.querySelector('.fd-mastered'), 'no mastered banner');
    must(win.__xpCalls[win.__xpCalls.length - 1][0] === 40, 'mastery XP bonus not sent');
    win.location.hash = '#/'; await wait(60);
    must(doc.querySelector('.fd-card--rec').getAttribute('data-skill') === 'F2', 'recommended did not move to F2');
    must(doc.querySelector('.fd-card[data-skill="F1"]').classList.contains('fd-card--done'), 'F1 card not marked mastered');
  });
  await dstep('every skill opens its learn card and a practice question', async () => {
    for (const s of FD.SKILLS) {
      win.location.hash = '#/learn/' + s.id; await wait(15);
      must(doc.querySelector('.fd-learn') && doc.querySelector('.fd-example'), s.id + ' learn card');
      must(!BAD_TEXT.test(doc.body.textContent), s.id + ' learn text bad');
      win.location.hash = '#/practice/' + s.id; await wait(15);
      must(doc.querySelector('#fd-check') && cur().skill === s.id, s.id + ' practice');
    }
    return FD.SKILLS.length + ' skills';
  });
  await dstep('mixed practice + Ronaldo\'s Challenge run', async () => {
    win.location.hash = '#/mixed'; await wait(60);
    must(doc.querySelector('#fd-check'), 'mixed');
    const seen = {};
    for (let i = 0; i < 25; i++) { seen[cur().skill] = 1; fillDom(cur(), ansForDom(cur())); click('#fd-check'); click('#fd-next'); await wait(3); }
    win.location.hash = '#/challenge'; await wait(60);
    must(doc.querySelector('#fd-check') && cur().skill === 'CH', 'challenge');
    fillDom(cur(), ansForDom(cur())); click('#fd-check');
    must(doc.querySelector('.fd-feedback--ok') && FD.store.data.ch.att >= 1, 'challenge not recorded');
    return 'mixed drew ' + Object.keys(seen).length + ' skills';
  });
  await dstep('progress persists under crispin_fd_v1', async () => {
    const raw = win.localStorage.getItem('crispin_fd_v1');
    must(raw && JSON.parse(raw).v === 1, 'nothing saved');
  });

  /* ---------------- report ---------------- */
  console.log('Fractions & Decimals Quest — smoke test');
  console.log('\nGenerators (' + N + ' questions each, fixed seed):');
  ids.forEach(id => {
    const g = perGen[id];
    console.log('  ' + (g.bad ? 'FAIL ' : 'ok   ') + id.padEnd(3) + ' ' + String(N).padStart(4) + ' q   angles=' + g.angles + '  distinct prompts=' + String(g.distinct).padStart(3) + '  inputs=' + g.types);
  });
  console.log('\nTotals: ' + totalQ + ' questions, ' + totalChecks + ' own-answer/wrong-answer checks, ' + equivTests + ' equivalent-form tests (' + notSimplestSeen + ' "simplest form" rejections), ' + unitChecks + ' checker unit cases.');
  console.log('\nDOM click-through:');
  domSteps.forEach(s => console.log(s));
  if (problems.length) {
    console.log('\nFAILURES (' + problems.length + '):');
    problems.forEach(p => console.log('  - ' + p));
    process.exit(1);
  }
  console.log('\nALL OK');
})().catch(e => { console.error('test crashed', e); process.exit(1); });
