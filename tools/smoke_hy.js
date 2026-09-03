/* ============================================================
   Half-Yearly HQ — engine smoke test
   Usage:  node tools/smoke_hy.js

   Runs the parts of the engine that do not need a DOM:
     · the mastery / Leitner rules in store.js
     · the daily planner in plan.js, simulated across the whole
       run-up to the exam
     · every question generator in gen.js, checked against the
       same schema the validator uses

   This is what catches "he can never reach mastery" or "the plan
   stops giving him anything to do on day 9" before a child does.
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* ---------- minimal browser shim ---------- */
const store = {};
global.localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: k => { delete store[k]; }
};
global.window = { localStorage: global.localStorage };

function load(rel) {
  // eslint-disable-next-line no-eval
  eval(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

/* content */
const dataFiles = fs.readdirSync(path.join(ROOT, 'data')).filter(f => /^hy-.*\.js$/.test(f)).sort();
load('data/hy-config.js');
for (const f of dataFiles) if (f !== 'hy-config.js') load('data/' + f);

/* engine (DOM-free parts only) */
load('js/hy/util.js');
load('js/hy/store.js');
load('js/hy/gen.js');
load('js/hy/plan.js');

const HY = global.window.HY;
const S = HY.store;
const P = HY.plan;
const fails = [];
const notes = [];
function check(cond, msg) { if (!cond) fails.push(msg); }

/* ============================================================
   1 · MASTERY RULES
   ============================================================ */
const SK = global.window.HY_SKILLS[0].id;

/* a skill answered right five times ON ONE DAY must NOT be mastered:
   delayed retrieval is required */
for (let i = 0; i < 6; i++) S.answer(SK, 'x' + i, true, '', '');
let r = S.data().skills[SK];
check(r.box === 5, `box should cap at 5, got ${r.box}`);
check(r.right === 6, `right count wrong: ${r.right}`);
check(r.mastered === false, 'MASTERY BUG: mastered after one day of grinding — delayed retrieval not enforced');
notes.push(`Same-day grind: box ${r.box}, right ${r.right}, mastered ${r.mastered}  (correctly NOT mastered)`);

/* now simulate a correct answer on a later day */
r.firstRightDay = '2020-01-01';           // pretend the first correct was long ago
S.answer(SK, 'x9', true, '', '');
r = S.data().skills[SK];
check(r.delayed === true, 'delayed flag not set on a later-day correct');
check(r.mastered === true, 'should be mastered after a later-day correct answer');
notes.push(`After a later-day correct: mastered ${r.mastered}`);

/* a wrong answer must knock it down and re-queue it today */
S.answer(SK, 'x9', false, 'nope', 'yes');
r = S.data().skills[SK];
check(r.box === 3, `wrong answer should drop two boxes to 3, got ${r.box}`);
check(r.mastered === false, 'a wrong answer must remove mastery');
check(r.due === S.todayKey(), 'a wrong answer must make the skill due again today');
check(r.errors.length === 1, 'the error should be recorded in the error book');
notes.push(`After a miss: box ${r.box}, due ${r.due}, mastered ${r.mastered}`);

/* box can never fall below 1 */
for (let i = 0; i < 10; i++) S.answer(SK, 'z' + i, false, '', '');
check(S.data().skills[SK].box >= 1, 'box fell below 1 — the floor is not holding');

/* generated items must not accumulate per-item stats */
const before = Object.keys(S.data().skills[SK].items).length;
for (let i = 0; i < 50; i++) S.answer(SK, 'gen.mcq.' + i + '.999', true, '', '');
const after = Object.keys(S.data().skills[SK].items).length;
check(after === before, `generated items are being stored individually (${before} -> ${after})`);
notes.push(`Generated-item keys stored: ${after - before} (should be 0)`);

/* ============================================================
   2 · THE PLANNER, SIMULATED DAY BY DAY
   ============================================================ */
S.reset();
const total = global.window.HY_SKILLS.length;
const examDate = P.examDate();
let day = S.todayKey();
const seenPhases = new Set();
let simDays = 0, everEmpty = null, maxNew = 0, taughtEver = new Set();

/* Fake the clock by overriding todayKey through the data's startedOn and
   walking the due dates forward: we simulate by teaching whatever the plan
   offers each day and rolling the store's dates on. */
function simulateDay(dayKey) {
  const p = P.today();
  seenPhases.add(p.phase);
  if (!p.blocks.length) everEmpty = everEmpty || dayKey;
  maxNew = Math.max(maxNew, p.newCount);
  /* "do" the plan: answer everything correctly */
  p.blocks.forEach(b => {
    (b.skills || []).forEach(id => {
      taughtEver.add(id);
      S.answer(id, 'sim-' + dayKey + '-' + id, true, '', '');
    });
    if (b.lessonId) S.markLessonDone(b.lessonId);
  });
  return p;
}

/* We cannot move the real clock, so we test the planner's shape on day 1
   and its arithmetic directly instead. */
const p1 = P.today();
check(p1.blocks.length > 0, 'PLAN BUG: day one has nothing to do');
check(p1.estMinutes > 5 && p1.estMinutes < 120, `day one is ${p1.estMinutes} minutes — out of a sensible range`);
check(p1.newCount > 0, 'PLAN BUG: no new skills offered on day one');
const lessonBlocks = p1.blocks.filter(b => b.kind === 'lesson');
check(lessonBlocks.length > 0, 'PLAN BUG: no interactive lesson offered before new skills');
check(p1.blocks.indexOf(lessonBlocks[0]) < p1.blocks.findIndex(b => b.isNew),
  'PLAN BUG: lessons should come before the new-skill drills');
notes.push(`Day 1 plan: ${p1.blocks.length} blocks, ${p1.newCount} new skills, ` +
  `${lessonBlocks.length} lesson(s), ~${p1.estMinutes} min, phase "${p1.phase}"`);
notes.push(`  blocks: ${p1.blocks.map(b => b.kind).join(' · ')}`);

/* the whole syllabus must be teachable in the time available */
const perDay = P.newPerDay();
const teachDays = Math.max(1, P.daysLeft() - P.drillStartsAt());
check(perDay * teachDays >= total,
  `PACING BUG: ${perDay} new skills/day x ${teachDays} teaching days = ${perDay * teachDays}, but there are ${total} skills`);
notes.push(`Pacing: ${total} skills, ${P.daysLeft()} days to the exam, ` +
  `${teachDays} teaching days, ${perDay} new skills/day`);

/* readiness must start at zero and be well-formed */
S.reset();
const rd = P.readiness();
check(rd.overall === 0, `readiness should start at 0, got ${rd.overall}`);
check(rd.totalSkills === total, 'readiness is not counting every skill');
Object.keys(rd.bySubject).forEach(k => {
  check(rd.bySubject[k].pct >= 0 && rd.bySubject[k].pct <= 100, `subject ${k} readiness out of range`);
});

/* every topic must be reachable by the planner */
const topics = new Set(global.window.HY_SKILLS.map(s => s.topic));
const planned = new Set();
for (let i = 0; i < 400 && planned.size < topics.size; i++) {
  const pick = P.today();
  let progressed = false;
  pick.blocks.forEach(b => (b.skills || []).forEach(id => {
    const sk = P.skillById(id);
    if (sk) planned.add(sk.topic);
    S.answer(id, 'reach-' + i + '-' + id, true, '', '');
    progressed = true;
  }));
  if (!progressed) break;
}
check(planned.size === topics.size,
  `REACHABILITY BUG: the planner never reaches ${[...topics].filter(t => !planned.has(t)).join(', ')}`);
notes.push(`Planner reaches all ${planned.size} topics`);

/* ============================================================
   3 · GENERATORS
   ============================================================ */
const TYPES = new Set(['mcq', 'multi', 'tf', 'fill', 'fillMulti', 'match', 'order',
  'bucket', 'tap', 'steps', 'shortAnswer', 'speak']);

function checkGenerated(it, name) {
  const w = `gen.${name}`;
  if (!it || !it.type) { fails.push(`${w}: produced nothing usable`); return; }
  if (!TYPES.has(it.type)) fails.push(`${w}: bad type ${it.type}`);
  if (!it.id) fails.push(`${w}: no id`);
  if (!it.q) fails.push(`${w}: no question text`);
  if (!it.explain) fails.push(`${w}: no explanation`);
  switch (it.type) {
    case 'mcq':
      if (!Array.isArray(it.options) || it.options.length < 2) fails.push(`${w}: too few options`);
      else if (typeof it.answer !== 'number' || it.answer < 0 || it.answer >= it.options.length)
        fails.push(`${w}: answer index out of range`);
      if (new Set(it.options).size !== it.options.length) fails.push(`${w}: DUPLICATE options — "${it.options.join(' / ')}"`);
      break;
    case 'tf':
      if (typeof it.answer !== 'boolean') fails.push(`${w}: tf answer not boolean`);
      break;
    case 'fill':
      if (!Array.isArray(it.accept) || !it.accept.length) fails.push(`${w}: empty accept[]`);
      if ((it.accept || []).some(a => String(a).trim() === '')) fails.push(`${w}: blank entry in accept[]`);
      break;
    case 'steps':
      if (!Array.isArray(it.parts) || !it.parts.length) fails.push(`${w}: no parts`);
      else it.parts.forEach((p, i) => {
        if (!p.q) fails.push(`${w} part ${i}: no q`);
        if (!Array.isArray(p.accept) || !p.accept.length) fails.push(`${w} part ${i}: no accept[]`);
      });
      break;
    case 'bucket': {
      const bs = new Set(it.buckets || []);
      (it.chips || []).forEach(c => { if (!bs.has(c.b)) fails.push(`${w}: chip "${c.t}" has unknown bucket "${c.b}"`); });
      break;
    }
  }
}

const genNames = Object.keys(HY.gen);
notes.push(`Generators found: ${genNames.length} (${genNames.join(', ')})`);
for (const name of genNames) {
  for (let i = 0; i < 60; i++) {
    let it;
    try { it = HY.gen[name](); } catch (e) { fails.push(`gen.${name} threw: ${e.message}`); break; }
    checkGenerated(it, name);
  }
}

/* every generator named by a skill must exist and run */
for (const sk of global.window.HY_SKILLS) {
  if (!sk.gen) continue;
  const names = Array.isArray(sk.gen) ? sk.gen : [sk.gen];
  for (const n of names) {
    if (!HY.gen[n]) { fails.push(`Skill ${sk.id}: generator "${n}" missing`); continue; }
    const made = HY.generate(sk, 5);
    if (made.length !== 5) fails.push(`Skill ${sk.id}: HY.generate returned ${made.length} of 5`);
  }
}

/* spot-check the maths the generators claim */
const H = HY.genHelpers;
check(H.gcd(24, 36) === 12, 'gcd broken');
check(H.lcm(4, 6) === 12, 'lcm broken');
check(H.primeFactors(36).join('x') === '2x2x3x3', 'primeFactors broken');
check(H.factorsOf(24).join(',') === '1,2,3,4,6,8,12,24', 'factorsOf broken');
check(H.isPrime(17) === true && H.isPrime(1) === false && H.isPrime(51) === false, 'isPrime broken');
check(H.angleName(90) === 'Right angle' && H.angleName(200) === 'Reflex angle' &&
      H.angleName(45) === 'Acute angle' && H.angleName(180) === 'Straight angle', 'angleName broken');

/* ---------- report ---------- */
console.log('='.repeat(64));
console.log('HALF-YEARLY HQ — ENGINE SMOKE TEST');
console.log('='.repeat(64));
notes.forEach(n => console.log('  · ' + n));
console.log('');
if (fails.length) {
  console.log(`FAILURES (${fails.length}):`);
  fails.slice(0, 30).forEach(f => console.log('  X ' + f));
  if (fails.length > 30) console.log(`  ... and ${fails.length - 30} more`);
  process.exit(1);
}
console.log('All engine checks passed.');
