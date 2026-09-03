/* ============================================================
   HALF-YEARLY HQ — store.js
   The mastery engine. Owns every piece of persistent state for
   the half-yearly exam preparation app.

   THE LEARNING MODEL (why the numbers are what they are)
   ------------------------------------------------------
   Each SKILL sits in a Leitner box 0..5.

     box 0  never practised
     box 1  seen, shaky              → review tomorrow
     box 2  getting there            → review in 2 days
     box 3  solid once               → review in 3 days
     box 4  solid twice              → review in 5 days
     box 5  automatic                → review in 8 days

   A correct answer promotes one box. A wrong answer drops two
   boxes (floor 1, never back to 0 — he has still learnt something)
   and puts the skill back in TODAY's queue, so the session cannot
   end while a skill is broken.

   MASTERED is deliberately strict, because "I got it right once"
   is not knowing it:
     · box >= 4                       (four clean answers)
     · at least 5 correct in total
     · at least one correct answer on a LATER DAY than the first
       correct one  (delayed retrieval — the real test of memory)

   That last condition is why the app cannot be gamed by grinding
   one topic for an hour on the night before the exam.
   ============================================================ */
(function () {
  'use strict';

  const HY = window.HY = window.HY || {};

  const KEY   = 'crispin_hy_v1';
  const PREFS = 'crispin_hy_prefs';

  /* review interval, in days, for each box */
  const INTERVALS = [0, 1, 2, 3, 5, 8];
  const MAX_BOX   = 5;

  /* ---------------- date helpers (Bahrain time, like the rest of the site) --- */
  function todayKey() {
    try {
      return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bahrain' }).format(new Date());
    } catch (_) {
      return new Date().toISOString().slice(0, 10);
    }
  }
  function addDays(key, n) {
    const d = new Date(key + 'T00:00:00');
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  }
  function daysBetween(a, b) {
    return Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);
  }
  function prettyDate(key) {
    try {
      return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(new Date(key + 'T00:00:00'));
    } catch (_) { return key; }
  }

  /* ---------------- state ---------------- */
  function blankSkill() {
    return {
      box: 0,
      seen: 0, right: 0, wrong: 0,
      streak: 0, bestStreak: 0,
      due: null,
      taught: false,
      firstRightDay: null,
      lastDay: null,
      delayed: false,        // got it right on a day after the first correct
      mastered: false,
      masteredOn: null,
      items: {},             // itemId -> { r, w, last }
      errors: []             // { itemId, given, want, at }  (last 6)
    };
  }

  function blank() {
    return {
      v: 1,
      startedOn: todayKey(),
      skills: {},
      days: {},              // dayKey -> { items, right, wrong, minutes, newSkills, done }
      mocks: [],             // { id, name, subject, pct, marks, total, at, weakSkills[] }
      lessons: {},           // lessonId -> { stage, done, doneOn }
      planLog: {},           // dayKey -> { plannedNew: [], completed: bool }
      badges: [],
      totalItems: 0,
      totalRight: 0
    };
  }

  let data = blank();
  let prefs = { dark: false, sound: true, dailyNew: 4, sessionMins: 30, showRoman: true };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d && d.v) data = Object.assign(blank(), d);
      }
    } catch (_) { data = blank(); }
    try {
      const p = localStorage.getItem(PREFS);
      if (p) prefs = Object.assign(prefs, JSON.parse(p));
    } catch (_) {}
    return data;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (_) {}
  }
  function savePrefs() {
    try { localStorage.setItem(PREFS, JSON.stringify(prefs)); } catch (_) {}
  }

  /* ---------------- skill records ---------------- */
  function rec(skillId) {
    if (!data.skills[skillId]) data.skills[skillId] = blankSkill();
    return data.skills[skillId];
  }

  function markTaught(skillId) {
    const r = rec(skillId);
    if (!r.taught) {
      r.taught = true;
      if (r.box === 0) { r.box = 1; r.due = todayKey(); }
      save();
    }
    return r;
  }

  /* Recompute mastered flag from the record's own history. */
  function refreshMastery(r) {
    const was = r.mastered;
    r.mastered = (r.box >= 4 && r.right >= 5 && r.delayed === true);
    if (r.mastered && !was) r.masteredOn = todayKey();
    if (!r.mastered) r.masteredOn = null;
    return r.mastered && !was;   // true when it *just* became mastered
  }

  /**
   * Record one answered item.
   * @returns {{justMastered:boolean, box:number, mastered:boolean, requeue:boolean}}
   */
  function answer(skillId, itemId, correct, given, want) {
    const today = todayKey();
    const r = rec(skillId);

    r.taught = true;
    r.seen++;
    r.lastDay = today;

    /* Generated questions get a fresh id every time, so keeping per-item
       stats for them would grow localStorage without bound and tell us
       nothing. Only banked items are tracked individually. */
    const banked = String(itemId).slice(0, 4) !== 'gen.';
    if (banked) {
      if (!r.items[itemId]) r.items[itemId] = { r: 0, w: 0, last: null };
      r.items[itemId].last = today;
    }

    if (correct) {
      r.right++;
      if (banked) r.items[itemId].r++;
      r.streak++;
      if (r.streak > r.bestStreak) r.bestStreak = r.streak;
      r.box = Math.min(MAX_BOX, Math.max(1, r.box) + 1);
      if (!r.firstRightDay) r.firstRightDay = today;
      else if (today !== r.firstRightDay) r.delayed = true;
      r.due = addDays(today, INTERVALS[r.box]);
    } else {
      r.wrong++;
      if (banked) r.items[itemId].w++;
      r.streak = 0;
      r.box = Math.max(1, r.box - 2);
      r.due = today;                       // back in today's queue
      r.errors.unshift({ itemId: itemId, given: given || '', want: want || '', at: today });
      r.errors = r.errors.slice(0, 6);
    }

    const justMastered = refreshMastery(r);

    /* day roll-up */
    if (!data.days[today]) data.days[today] = { items: 0, right: 0, wrong: 0, minutes: 0, newSkills: [], done: false };
    const day = data.days[today];
    day.items++;
    if (correct) day.right++; else day.wrong++;

    data.totalItems++;
    if (correct) data.totalRight++;

    save();
    return { justMastered: justMastered, box: r.box, mastered: r.mastered, requeue: !correct };
  }

  function noteNewSkill(skillId) {
    const today = todayKey();
    if (!data.days[today]) data.days[today] = { items: 0, right: 0, wrong: 0, minutes: 0, newSkills: [], done: false };
    if (data.days[today].newSkills.indexOf(skillId) < 0) {
      data.days[today].newSkills.push(skillId);
      save();
    }
  }

  function addMinutes(mins) {
    const today = todayKey();
    if (!data.days[today]) data.days[today] = { items: 0, right: 0, wrong: 0, minutes: 0, newSkills: [], done: false };
    data.days[today].minutes += mins;
    save();
  }

  function markDayDone() {
    const today = todayKey();
    if (!data.days[today]) data.days[today] = { items: 0, right: 0, wrong: 0, minutes: 0, newSkills: [], done: false };
    data.days[today].done = true;
    save();
  }

  /* ---------------- queries ---------------- */
  function isDue(skillId) {
    const r = data.skills[skillId];
    if (!r || r.box === 0) return false;
    if (!r.due) return true;
    return r.due <= todayKey();
  }

  /** 0..1 — how well this skill is known. Drives the readiness meter. */
  function score(skillId) {
    const r = data.skills[skillId];
    if (!r || !r.taught) return 0;
    if (r.mastered) return 1;
    const boxPart = Math.min(1, r.box / 4) * 0.8;
    const delayPart = r.delayed ? 0.15 : 0;
    return Math.min(0.98, boxPart + delayPart);
  }

  /** 'new' | 'learning' | 'shaky' | 'strong' | 'mastered' */
  function status(skillId) {
    const r = data.skills[skillId];
    if (!r || !r.taught) return 'new';
    if (r.mastered) return 'mastered';
    if (r.wrong >= 2 && r.box <= 2) return 'shaky';
    if (r.box >= 3) return 'strong';
    return 'learning';
  }

  function streakDays() {
    let n = 0, day = todayKey();
    /* today only counts once something has actually been done */
    if (!data.days[day] || !data.days[day].items) day = addDays(day, -1);
    while (data.days[day] && data.days[day].items > 0) { n++; day = addDays(day, -1); }
    return n;
  }

  function dayStats(key) {
    return data.days[key || todayKey()] || { items: 0, right: 0, wrong: 0, minutes: 0, newSkills: [], done: false };
  }

  /* ---------------- lessons ---------------- */
  function lessonRec(id) {
    if (!data.lessons) data.lessons = {};
    if (!data.lessons[id]) data.lessons[id] = { stage: 0, done: false, doneOn: null };
    return data.lessons[id];
  }
  function setLessonStage(id, n) { lessonRec(id).stage = n; save(); }
  function lessonStage(id) { return lessonRec(id).stage || 0; }
  function markLessonDone(id) {
    const r = lessonRec(id);
    r.done = true; r.doneOn = todayKey(); r.stage = 0;
    save();
  }
  function lessonDone(id) { return !!lessonRec(id).done; }
  function lessonsDoneCount() {
    const l = data.lessons || {};
    return Object.keys(l).filter(function (k) { return l[k].done; }).length;
  }

  function recordMock(m) {
    m.at = new Date().toISOString();
    data.mocks.unshift(m);
    data.mocks = data.mocks.slice(0, 40);
    save();
  }

  function errorBook() {
    const out = [];
    Object.keys(data.skills).forEach(function (sid) {
      const r = data.skills[sid];
      if (r.errors && r.errors.length) {
        r.errors.forEach(function (e) { out.push(Object.assign({ skillId: sid }, e)); });
      }
    });
    out.sort(function (a, b) { return a.at < b.at ? 1 : -1; });
    return out;
  }

  function reset() { data = blank(); save(); }
  function resetSkill(skillId) { delete data.skills[skillId]; save(); }

  /* ---------------- export / import (so progress survives a new device) ----- */
  function exportJSON() { return JSON.stringify({ hy: data, prefs: prefs }, null, 2); }
  function importJSON(text) {
    const parsed = JSON.parse(text);
    if (parsed && parsed.hy && parsed.hy.v) {
      data = Object.assign(blank(), parsed.hy);
      if (parsed.prefs) prefs = Object.assign(prefs, parsed.prefs);
      save(); savePrefs();
      return true;
    }
    return false;
  }

  /* ---------------- one-way XP bridge into the main site ---------------- */
  function bridgeXP(amount, reason) {
    try {
      if (window.Progress && typeof window.Progress.addXP === 'function') {
        window.Progress.addXP(amount, reason || 'Half-Yearly HQ');
      }
    } catch (_) {}
  }

  HY.store = {
    INTERVALS: INTERVALS,
    MAX_BOX: MAX_BOX,
    load: load, save: save,
    data: function () { return data; },
    prefs: function () { return prefs; },
    setPref: function (k, v) { prefs[k] = v; savePrefs(); },

    rec: rec,
    markTaught: markTaught,
    answer: answer,
    noteNewSkill: noteNewSkill,
    addMinutes: addMinutes,
    markDayDone: markDayDone,

    isDue: isDue,
    score: score,
    status: status,
    streakDays: streakDays,
    dayStats: dayStats,
    recordMock: recordMock,
    errorBook: errorBook,

    setLessonStage: setLessonStage,
    lessonStage: lessonStage,
    markLessonDone: markLessonDone,
    lessonDone: lessonDone,
    lessonsDoneCount: lessonsDoneCount,

    reset: reset,
    resetSkill: resetSkill,
    exportJSON: exportJSON,
    importJSON: importJSON,
    bridgeXP: bridgeXP,

    todayKey: todayKey,
    addDays: addDays,
    daysBetween: daysBetween,
    prettyDate: prettyDate
  };

  load();
})();
