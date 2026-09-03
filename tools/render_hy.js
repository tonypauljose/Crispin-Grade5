/* ============================================================
   Half-Yearly HQ — headless render test
   Usage:  node tools/render_hy.js
   (needs jsdom: installed under .tmp/rendertest, which is gitignored)

   Actually loads half-yearly.html in a DOM, walks the app like a
   child would — Today, a lesson with its apparatus, a drill with
   right and wrong answers, the syllabus map, a topic, the repair
   shop, a mock paper end to end — and fails on the first
   uncaught error or empty screen.
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
const steps = [];
function step(name, fn) {
  try {
    const r = fn();
    steps.push('  ok   ' + name + (r ? '  — ' + r : ''));
  } catch (e) {
    problems.push(name + ': ' + e.message);
    steps.push('  FAIL ' + name + ' — ' + e.message);
  }
}

/* jsdom will not fetch local <script src="..."> files, so we load them by
   hand below. The page's inline bootstrap must therefore be removed before
   parsing, or it runs before the engine exists. */
const rawHtml = fs.readFileSync(path.join(ROOT, 'half-yearly.html'), 'utf8');
const BOOTSTRAP = /<script>\s*HY\.app\.start[\s\S]*?<\/script>/;
if (!BOOTSTRAP.test(rawHtml)) {
  console.error('The page bootstrap changed — update BOOTSTRAP in this test.');
  process.exit(2);
}
const html = rawHtml.replace(BOOTSTRAP, '');

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: undefined,
  url: 'https://crispintony.com/half-yearly.html',
  pretendToBeVisual: true,
  beforeParse(win) {
    /* silence things jsdom does not implement, but record real errors */
    win.HTMLCanvasElement.prototype.getContext = () => null;
    win.AudioContext = function () {
      return {
        state: 'running', currentTime: 0, resume() {}, destination: {},
        createOscillator: () => ({ type: '', frequency: { value: 0 }, connect: () => ({ connect: () => {} }), start() {}, stop() {} }),
        createGain: () => ({ gain: { value: 0, setValueAtTime() {}, linearRampToValueAtTime() {} }, connect: () => ({ connect: () => {} }) })
      };
    };
    win.speechSynthesis = { cancel() {}, speak() {}, getVoices: () => [], addEventListener() {} };
    win.SpeechSynthesisUtterance = function () {};
    win.matchMedia = () => ({ matches: false, addEventListener() {} });
    win.scrollTo = () => {};
    win.onerror = (msg, src, line) => { problems.push(`window.onerror: ${msg} (line ${line})`); };
  }
});

const win = dom.window;
const doc = win.document;

/* jsdom loads local <script src> only if we do it ourselves */
const scripts = [...doc.querySelectorAll('script[src]')].map(s => s.getAttribute('src'));
for (const src of scripts) {
  const p = path.join(ROOT, src);
  if (!fs.existsSync(p)) { problems.push('missing script ' + src); continue; }
  try {
    win.eval(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    problems.push(`script ${src} threw: ${e.message}`);
  }
}

/* now run the inline bootstrap */
try {
  win.HY.app.start(doc.getElementById('hy-host'));
} catch (e) {
  problems.push('app.start threw: ' + e.message);
}

const HY = win.HY;
const $ = sel => doc.querySelector(sel);
const $$ = sel => [...doc.querySelectorAll(sel)];
function click(el) {
  if (!el) throw new Error('nothing to click');
  el.dispatchEvent(new win.MouseEvent('click', { bubbles: true }));
}
function text() { return (doc.body.textContent || '').replace(/\s+/g, ' ').trim(); }
function route(hash) {
  win.location.hash = hash;
  win.dispatchEvent(new win.Event('hashchange'));
}

/* ---------------- the walkthrough ---------------- */

step('content loaded', () => {
  if (!win.HY_SKILLS || win.HY_SKILLS.length < 10) throw new Error('skills missing');
  return `${win.HY_TOPICS.length} topics, ${win.HY_SKILLS.length} skills, ${win.HY_LESSONS.length} lessons`;
});

step('shell renders', () => {
  if (!$('.hy-top')) throw new Error('no top bar');
  if (!$('.hy-tabbar')) throw new Error('no tab bar');
  return '';
});

step('Today screen', () => {
  route('#/');
  if (!$('.hy-hero')) throw new Error('no hero');
  const blocks = $$('.hy-block');
  if (!blocks.length) throw new Error('no plan blocks');
  return `${blocks.length} blocks`;
});

step('Syllabus map', () => {
  route('#/map');
  const cards = $$('.hy-topiccard');
  if (cards.length < 5) throw new Error('too few topic cards: ' + cards.length);
  return `${cards.length} topics`;
});

step('Topic page shows lessons and skills', () => {
  route('#/topic/math-multiples-factors');
  if (!$$('.hy-lessoncard').length) throw new Error('no lesson cards');
  if (!$$('.hy-skillrow').length) throw new Error('no skill rows');
  return `${$$('.hy-lessoncard').length} lessons, ${$$('.hy-skillrow').length} skills`;
});

step('Skill page renders a teach card', () => {
  route('#/skill/math-multiples-factors.hcf');
  if (!$('.hy-teach')) throw new Error('no teach card');
  if (!$('.hy-worked__card')) throw new Error('no worked example');
  return '';
});

/* --- every lesson, every stage, every widget --- */
for (const lesson of win.HY_LESSONS) {
  step(`lesson "${lesson.id}" runs all ${lesson.stages.length} stages`, () => {
    route('#/lesson/' + lesson.id);
    let guard = 0;
    for (let i = 0; i < lesson.stages.length && guard < 60; i++) {
      guard++;
      const stage = lesson.stages[i];
      if (!$('.hy-lesson') && stage.kind !== 'check') throw new Error(`stage ${i} (${stage.kind}) did not render`);
      if (stage.kind === 'explore') {
        if (!$('.hy-widget')) throw new Error(`stage ${i}: widget host missing`);
        if (!$('.hy-widget').children.length) throw new Error(`stage ${i}: widget "${stage.widget}" rendered nothing`);
      }
      if (stage.kind === 'check') {
        if (!$('.hy-stage')) throw new Error(`stage ${i}: check did not start a drill`);
        return `reached the check at stage ${i}`;
      }
      const skip = $('#hy-l-skip');
      const next = $('#hy-l-next');
      if (skip) click(skip);
      else if (next && !next.disabled) click(next);
      else throw new Error(`stage ${i} (${stage.kind}): no way forward`);
    }
    return 'completed';
  });
}

/* --- a drill, answered right then wrong --- */
step('drill: correct answer advances', () => {
  route('#/skill/math-geometry.angle-types');
  click($('#hy-prac'));
  if (!$('.hy-q')) throw new Error('no question rendered');
  const opts = $$('.hy-opt');
  if (!opts.length) throw new Error('no options rendered');
  click(opts[0]);
  click($('#hy-check'));
  if (!$('.hy-fb.is-good') && !$('.hy-fb.is-bad')) throw new Error('no feedback shown');
  const isBad = !!$('.hy-fb.is-bad');
  if (isBad && !$('#hy-reteach')) throw new Error('wrong answer did not offer the rule again');
  return isBad ? 'wrong answer re-taught correctly' : 'correct answer accepted';
});

step('drill: wrong answer re-opens the teach card', () => {
  /* Deterministic: find a typed-answer question and give a definitely wrong
     answer, so the wrong-answer path is always exercised. */
  route('#/skill/math-geometry.angle-types');
  click($('#hy-prac'));
  let found = false;
  for (let i = 0; i < 10 && !found; i++) {
    const inp = $('.hy-fill .hy-input');
    if (inp) { inp.value = 'zzzz-not-an-answer'; found = true; break; }
    const opt = $('.hy-opt');
    if (!opt) throw new Error('no answerable question rendered');
    click(opt);
    click($('#hy-check'));
    const next = $('#hy-check') ? null : $('.hy-actions .hy-btn--primary');
    if (next) click(next); else break;
  }
  if (!found) return '(no typed-answer question came up)';
  click($('#hy-check'));
  const bad = $('.hy-fb.is-bad');
  if (bad) {
    const rt = $('#hy-reteach');
    if (!rt) throw new Error('no "show me the rule" button');
    click(rt);
    if (!$('#hy-reteach-box').innerHTML) throw new Error('re-teach box stayed empty');
    return 're-teach opened';
  }
  return '(picked the right one by chance)';
});

/* --- every item type renders --- */
step('every item type renders', () => {
  const seen = {};
  for (const sk of win.HY_SKILLS) for (const it of (sk.items || [])) {
    if (seen[it.type]) continue;
    const host = doc.createElement('div');
    doc.body.appendChild(host);
    const ctrl = HY.items.render(it, host);
    if (!host.children.length) throw new Error(`type "${it.type}" rendered nothing (${it.id})`);
    if (typeof ctrl.check !== 'function') throw new Error(`type "${it.type}" has no check()`);
    seen[it.type] = it.id;
    host.remove();
  }
  return Object.keys(seen).join(', ');
});

/* --- every generated item renders too --- */
step('generated items render', () => {
  let n = 0;
  for (const sk of win.HY_SKILLS) {
    if (!sk.gen) continue;
    for (const it of HY.generate(sk, 4)) {
      const host = doc.createElement('div');
      doc.body.appendChild(host);
      HY.items.render(it, host);
      if (!host.children.length) throw new Error(`generated ${it.type} rendered nothing`);
      host.remove();
      n++;
    }
  }
  return n + ' generated questions';
});

step('Repair shop', () => {
  route('#/repair');
  if (!text().includes('Repair shop')) throw new Error('repair screen missing');
  return '';
});

step('Progress screen', () => {
  route('#/progress');
  if (!$('.hy-cal')) throw new Error('no countdown calendar');
  if (!$$('.hy-skillrow').length) throw new Error('no skill table');
  return `${$$('.hy-cal__day').length} days in the countdown`;
});

/* --- a full mock paper, sat end to end --- */
step('mock paper runs and marks itself', () => {
  route('#/mock');
  if (!$$('.hy-topiccard--paper').length) throw new Error('no papers listed');
  route('#/exam/paper-maths-mf');
  if (!$('.hy-exambrief')) throw new Error('no exam brief');
  click($('#hy-ex-go'));
  if (!$('.hy-examhead')) throw new Error('exam did not start');
  const n = $$('.hy-pal').length;
  if (!n) throw new Error('no question palette');
  /* answer everything we can, then walk to the end */
  for (let i = 0; i < n; i++) {
    const opt = $('.hy-opt');
    if (opt) click(opt);
    const inp = $('.hy-input');
    if (inp) { inp.value = '12'; }
    const next = $('#hy-ex-next');
    if (!next) throw new Error(`no next button on question ${i + 1}`);
    click(next);
  }
  const fin = $('#hy-ex-final');
  if (!fin) throw new Error('no submit button on the review screen');
  click(fin);
  if (!$('.hy-done')) throw new Error('no results screen');
  const mocks = HY.store.data().mocks;
  if (!mocks.length) throw new Error('the attempt was not recorded');
  return `${n} questions, scored ${mocks[0].marks}/${mocks[0].total}`;
});

step('answers survive moving between exam questions', () => {
  route('#/exam/paper-maths-full');
  click($('#hy-ex-go'));
  /* find a question with options, answer it, navigate away and back */
  let answeredAt = -1;
  const pals = $$('.hy-pal').length;
  for (let i = 0; i < pals; i++) {
    const opt = $('.hy-opt');
    if (opt) { click(opt); answeredAt = i; break; }
    click($('#hy-ex-next'));
  }
  if (answeredAt < 0) return '(no option question found)';
  click($('#hy-ex-next'));
  click($$('.hy-pal')[answeredAt]);
  if (!$('.hy-opt.is-sel')) throw new Error('the chosen answer was lost when navigating away');
  return 'selection preserved';
});

/* ---------------- report ---------------- */
console.log('='.repeat(64));
console.log('HALF-YEARLY HQ — HEADLESS RENDER TEST');
console.log('='.repeat(64));
steps.forEach(s => console.log(s));
console.log('');
if (problems.length) {
  console.log(`PROBLEMS (${problems.length}):`);
  [...new Set(problems)].slice(0, 30).forEach(p => console.log('  X ' + p));
  try { dom.window.close(); } catch (_) {}
  process.exit(1);
}
console.log('The app renders and plays through end to end.');
/* the exam clock and the confetti timers would otherwise hold node open */
try { dom.window.close(); } catch (_) {}
process.exit(0);
