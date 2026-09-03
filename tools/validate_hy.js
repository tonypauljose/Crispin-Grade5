/* ============================================================
   Half-Yearly HQ — content validator
   Usage:  node tools/validate_hy.js

   Loads every data/hy-*.js file in a fake browser global, then
   checks the whole content set against the schema the engine
   expects. Catches the failure modes that would otherwise only
   show up as a blank screen or, worse, as a wrong answer taught
   to a ten-year-old.
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const errors = [];
const warns = [];
function err(m) { errors.push(m); }
function warn(m) { warns.push(m); }

/* ---------- load ---------- */
global.window = {};
const dataFiles = fs.readdirSync(path.join(ROOT, 'data'))
  .filter(f => /^hy-.*\.js$/.test(f)).sort();

// config first so the arrays exist
const order = ['hy-config.js'].concat(dataFiles.filter(f => f !== 'hy-config.js'));
for (const f of order) {
  const p = path.join(ROOT, 'data', f);
  try {
    // eslint-disable-next-line no-eval
    eval(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    err(`LOAD FAILED  ${f}: ${e.message}`);
  }
}

const TOPICS = global.window.HY_TOPICS || [];
const SKILLS = global.window.HY_SKILLS || [];
const LESSONS = global.window.HY_LESSONS || [];
const PAPERS = global.window.HY_PAPERS || [];

/* generator names actually defined in gen.js */
const genSrc = fs.readFileSync(path.join(ROOT, 'js', 'hy', 'gen.js'), 'utf8');
const GEN_NAMES = new Set([...genSrc.matchAll(/^\s*G\.(\w+)\s*=/gm)].map(m => m[1]));

/* widget names actually defined */
const widgetSrc = ['widgets-math.js', 'widgets-lang.js']
  .map(f => fs.readFileSync(path.join(ROOT, 'js', 'hy', f), 'utf8')).join('\n');
const WIDGET_NAMES = new Set([...widgetSrc.matchAll(/^\s*W\.(\w+)\s*=/gm)].map(m => m[1]));

const SUBJECTS = new Set(['english', 'hindi', 'maths', 'evs']);
const TYPES = new Set(['mcq', 'multi', 'tf', 'fill', 'fillMulti', 'match', 'order',
  'bucket', 'tap', 'steps', 'shortAnswer', 'speak']);

/* ---------- topics ---------- */
const topicIds = new Set();
for (const t of TOPICS) {
  if (!t.id) { err(`Topic with no id: ${JSON.stringify(t).slice(0, 80)}`); continue; }
  if (topicIds.has(t.id)) err(`Duplicate topic id: ${t.id}`);
  topicIds.add(t.id);
  if (!SUBJECTS.has(t.subject)) err(`Topic ${t.id}: bad subject "${t.subject}"`);
  if (!t.name) err(`Topic ${t.id}: missing name`);
  if (typeof t.examWeight !== 'number') warn(`Topic ${t.id}: no examWeight`);
}

/* ---------- skills + items ---------- */
const skillIds = new Set();
const itemIds = new Set();
let itemCount = 0;
const perTopic = {};

function checkItem(sk, it, idx) {
  const where = `${sk.id} item[${idx}] (${it.id || 'no id'})`;
  if (!it.id) err(`${where}: missing id`);
  else if (itemIds.has(it.id)) err(`${where}: DUPLICATE item id`);
  else itemIds.add(it.id);
  if (!it.type || !TYPES.has(it.type)) { err(`${where}: bad type "${it.type}"`); return; }
  if (!it.q && it.type !== 'speak') err(`${where}: missing q`);
  if (!it.explain) warn(`${where}: no explain (shown when he gets it wrong)`);
  if (it.level && ![1, 2, 3].includes(it.level)) err(`${where}: level must be 1, 2 or 3`);

  switch (it.type) {
    case 'mcq':
      if (!Array.isArray(it.options) || it.options.length < 2) err(`${where}: needs 2+ options`);
      else if (typeof it.answer !== 'number' || it.answer < 0 || it.answer >= it.options.length)
        err(`${where}: answer index ${it.answer} out of range (0..${it.options.length - 1})`);
      break;
    case 'multi':
      if (!Array.isArray(it.options) || !Array.isArray(it.answer) || !it.answer.length)
        err(`${where}: needs options[] and a non-empty answer[]`);
      else for (const a of it.answer)
        if (typeof a !== 'number' || a < 0 || a >= it.options.length)
          err(`${where}: answer index ${a} out of range`);
      break;
    case 'tf':
      if (typeof it.answer !== 'boolean') err(`${where}: answer must be true or false`);
      break;
    case 'fill':
      if (!Array.isArray(it.accept) || !it.accept.length) err(`${where}: needs a non-empty accept[]`);
      else if (it.accept.some(a => a === undefined || a === null || String(a).trim() === ''))
        err(`${where}: accept[] has an empty entry`);
      break;
    case 'fillMulti':
      if (!Array.isArray(it.blanks) || !it.blanks.length) err(`${where}: needs blanks[]`);
      else it.blanks.forEach((b, i) => {
        if (!b.label) err(`${where} blank[${i}]: missing label`);
        if (!Array.isArray(b.accept) || !b.accept.length) err(`${where} blank[${i}]: needs accept[]`);
      });
      break;
    case 'match':
      if (!Array.isArray(it.pairs) || it.pairs.length < 2) err(`${where}: needs 2+ pairs`);
      else it.pairs.forEach((p, i) => {
        if (!p.l || !p.r) err(`${where} pair[${i}]: needs l and r`);
      });
      break;
    case 'order':
      if (!Array.isArray(it.answer) || it.answer.length < 2) err(`${where}: needs an answer[] of 2+`);
      break;
    case 'bucket': {
      if (!Array.isArray(it.buckets) || it.buckets.length < 2) { err(`${where}: needs 2+ buckets`); break; }
      if (!Array.isArray(it.chips) || !it.chips.length) { err(`${where}: needs chips[]`); break; }
      const bs = new Set(it.buckets);
      it.chips.forEach((c, i) => {
        if (!c.t) err(`${where} chip[${i}]: missing t`);
        if (!bs.has(c.b)) err(`${where} chip[${i}] "${c.t}": bucket "${c.b}" is not one of [${it.buckets.join(', ')}]`);
      });
      break;
    }
    case 'tap':
      if (!Array.isArray(it.tokens) || !it.tokens.length) err(`${where}: needs tokens[]`);
      else if (!it.tokens.some(t => t.ok)) err(`${where}: no token marked ok:true — nothing to find`);
      break;
    case 'steps':
      if (!Array.isArray(it.parts) || !it.parts.length) err(`${where}: needs parts[]`);
      else it.parts.forEach((p, i) => {
        if (!p.q) err(`${where} part[${i}]: missing q`);
        if (!Array.isArray(p.accept) || !p.accept.length) err(`${where} part[${i}]: needs accept[]`);
      });
      break;
    case 'shortAnswer':
      if (!it.model) err(`${where}: needs a model answer`);
      if (!Array.isArray(it.must) || !it.must.length) warn(`${where}: no must[] marking points`);
      break;
    case 'speak':
      if (!it.text) err(`${where}: needs text`);
      if (!it.lang) warn(`${where}: no lang, will default to English`);
      break;
  }
}

for (const sk of SKILLS) {
  if (!sk.id) { err(`Skill with no id`); continue; }
  if (skillIds.has(sk.id)) err(`Duplicate skill id: ${sk.id}`);
  skillIds.add(sk.id);
  if (!SUBJECTS.has(sk.subject)) err(`Skill ${sk.id}: bad subject "${sk.subject}"`);
  if (!topicIds.has(sk.topic)) err(`Skill ${sk.id}: topic "${sk.topic}" is not registered in HY_TOPICS`);
  if (!sk.id.startsWith(sk.topic + '.')) warn(`Skill ${sk.id}: id does not start with its topic id`);
  if (!sk.name) err(`Skill ${sk.id}: missing name`);
  if (!sk.canDo) warn(`Skill ${sk.id}: missing canDo`);
  if (!sk.teach) err(`Skill ${sk.id}: missing teach card`);
  else {
    if (!sk.teach.explain) err(`Skill ${sk.id}: teach.explain missing`);
    if (!Array.isArray(sk.teach.worked) || !sk.teach.worked.length)
      err(`Skill ${sk.id}: teach.worked missing — a wrong answer re-opens this card, it must show a worked example`);
    else sk.teach.worked.forEach((w, i) => {
      if (!w.q) err(`Skill ${sk.id} worked[${i}]: missing q`);
      if (!Array.isArray(w.steps) || !w.steps.length) err(`Skill ${sk.id} worked[${i}]: missing steps`);
    });
    if (!sk.teach.watchOut) warn(`Skill ${sk.id}: no watchOut`);
  }
  if (sk.gen) {
    const names = Array.isArray(sk.gen) ? sk.gen : [sk.gen];
    for (const n of names) if (!GEN_NAMES.has(n)) err(`Skill ${sk.id}: generator "${n}" is not defined in js/hy/gen.js`);
  }
  const items = sk.items || [];
  if (items.length < 10) err(`Skill ${sk.id}: only ${items.length} items (minimum 10)`);
  items.forEach((it, i) => checkItem(sk, it, i));
  itemCount += items.length;
  perTopic[sk.topic] = (perTopic[sk.topic] || 0) + items.length;
}

/* prereqs must exist */
for (const sk of SKILLS) {
  for (const p of (sk.prereq || [])) {
    if (!skillIds.has(p)) err(`Skill ${sk.id}: prereq "${p}" does not exist`);
  }
}

/* ---------- lessons ---------- */
const lessonIds = new Set();
for (const l of LESSONS) {
  if (!l.id) { err('Lesson with no id'); continue; }
  if (lessonIds.has(l.id)) err(`Duplicate lesson id: ${l.id}`);
  lessonIds.add(l.id);
  if (!topicIds.has(l.topic)) err(`Lesson ${l.id}: topic "${l.topic}" is not registered`);
  if (!Array.isArray(l.stages) || !l.stages.length) { err(`Lesson ${l.id}: no stages`); continue; }
  l.stages.forEach((s, i) => {
    const w = `Lesson ${l.id} stage[${i}] (${s.kind})`;
    if (!['intro', 'idea', 'explore', 'teach', 'check', 'milestone'].includes(s.kind))
      err(`${w}: unknown stage kind`);
    if (s.kind === 'explore') {
      if (!s.widget) err(`${w}: no widget named`);
      else if (!WIDGET_NAMES.has(s.widget)) err(`${w}: widget "${s.widget}" is not defined`);
    }
    if (s.kind === 'teach') {
      if (!s.skill) err(`${w}: no skill named`);
      else if (!skillIds.has(s.skill)) err(`${w}: skill "${s.skill}" does not exist`);
    }
    if (s.kind === 'check') {
      const list = s.skills || (s.skill ? [s.skill] : []);
      if (!list.length) err(`${w}: no skills named`);
      for (const id of list) if (!skillIds.has(id)) err(`${w}: skill "${id}" does not exist`);
    }
  });
}

/* ---------- papers ---------- */
function poolSize(sec) {
  let n = 0;
  for (const sk of SKILLS) {
    if (sec.pick.skills && !sec.pick.skills.includes(sk.id)) continue;
    if (sec.pick.topics && !sec.pick.topics.includes(sk.topic)) continue;
    if (sec.pick.subject && sk.subject !== sec.pick.subject) continue;
    for (const it of (sk.items || [])) {
      if (sec.pick.types && !sec.pick.types.includes(it.type)) continue;
      if (sec.pick.minLevel && (it.level || 2) < sec.pick.minLevel) continue;
      n++;
    }
  }
  return n;
}
for (const p of PAPERS) {
  if (!p.id) { err('Paper with no id'); continue; }
  let declared = 0;
  for (const sec of (p.sections || [])) {
    if (!sec.pick && !sec.items) { err(`Paper ${p.id}: section "${sec.name}" has no pick or items`); continue; }
    declared += (sec.marksEach || 1) * (sec.count || 0);
    if (sec.pick) {
      if (sec.pick.skills) for (const s of sec.pick.skills)
        if (!skillIds.has(s)) err(`Paper ${p.id} section "${sec.name}": skill "${s}" does not exist`);
      if (sec.pick.topics) for (const t of sec.pick.topics)
        if (!topicIds.has(t)) err(`Paper ${p.id} section "${sec.name}": topic "${t}" does not exist`);
      const n = poolSize(sec);
      if (n < sec.count) err(`Paper ${p.id} section "${sec.name}": needs ${sec.count} questions, only ${n} available`);
      else if (n < sec.count * 2) warn(`Paper ${p.id} section "${sec.name}": only ${n} in the pool for ${sec.count} questions — repeats likely`);
    }
  }
  if (p.marks && Math.abs(declared - p.marks) > 0)
    warn(`Paper ${p.id}: sections add up to ${declared} marks but the paper says ${p.marks}`);
}

/* ---------- report ---------- */
console.log('='.repeat(64));
console.log('HALF-YEARLY HQ — CONTENT VALIDATION');
console.log('='.repeat(64));
console.log(`Topics   ${TOPICS.length}`);
console.log(`Skills   ${SKILLS.length}`);
console.log(`Items    ${itemCount}`);
console.log(`Lessons  ${LESSONS.length}`);
console.log(`Papers   ${PAPERS.length}`);
console.log('');
console.log('Items per topic:');
for (const t of TOPICS) {
  const sks = SKILLS.filter(s => s.topic === t.id);
  console.log(`  ${(t.id + ' ').padEnd(30, '.')} ${String(sks.length).padStart(2)} skills  ${String(perTopic[t.id] || 0).padStart(4)} items  [${t.subject}]`);
}
console.log('');
if (warns.length) {
  console.log(`WARNINGS (${warns.length}):`);
  warns.slice(0, 40).forEach(w => console.log('  ! ' + w));
  if (warns.length > 40) console.log(`  ... and ${warns.length - 40} more`);
  console.log('');
}
if (errors.length) {
  console.log(`ERRORS (${errors.length}):`);
  errors.forEach(e => console.log('  X ' + e));
  process.exit(1);
} else {
  console.log('No errors. Content is structurally valid.');
}
