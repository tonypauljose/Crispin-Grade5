/* ============================================================
   HALF-YEARLY HQ — plan.js
   Turns "23 days until the exam and 78 skills to learn" into
   "here is what you do today, it takes 28 minutes".

   THE PLAN SHAPE
   --------------
   The run-up is split into three phases, worked backwards from
   the exam date:

     LEARN     new skills every day + spaced reviews
     DRILL     no new skills; interleaved mixed practice and
               repair of everything shaky
     REHEARSE  timed mock papers, error book, light review

   The boundaries are a SHARE of the run-up, not fixed dates, so a
   three-week plan and a ten-day scramble both get sensible phases.

   New skills per day are recomputed every single day:
        newPerDay = ceil(untaught / teaching days left)
   So a missed day makes tomorrow slightly heavier instead of
   quietly pushing the syllabus off the end of the calendar.

   A session always interleaves subjects (mixing maths with
   grammar beats blocking them) and always ends with the things
   he got wrong, not with the things he found easy.
   ============================================================ */
(function () {
  'use strict';

  const HY = window.HY = window.HY || {};
  const S = HY.store;

  function cfg() { return window.HY_CONFIG || {}; }
  function examDate() { return cfg().examDate || '2026-09-14'; }
  function skills() { return window.HY_SKILLS || []; }
  function topics() { return window.HY_TOPICS || []; }

  function skillById(id) {
    const all = skills();
    for (let i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }
  function topicById(id) {
    const all = topics();
    for (let i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  function daysLeft() {
    return Math.max(0, S.daysBetween(S.todayKey(), examDate()));
  }

  /* How long the whole run-up is, so the phases can scale to it.
     A three-week run-up and a one-week scramble need different
     boundaries; these are worked out as a share of the window
     rather than fixed at D-8 / D-3. */
  function windowDays() {
    const start = S.data().startedOn || S.todayKey();
    return Math.max(3, S.daysBetween(start, examDate()));
  }
  function drillStartsAt() {
    return Math.max(2, Math.min(8, Math.round(windowDays() * 0.35)));
  }
  function rehearseStartsAt() {
    return Math.max(1, Math.min(3, Math.round(windowDays() * 0.15)));
  }

  function phase() {
    const d = daysLeft();
    if (d <= rehearseStartsAt()) return 'rehearse';
    if (d <= drillStartsAt()) return 'drill';
    return 'learn';
  }

  const PHASE_INFO = {
    learn:    { name: 'Learn',    emoji: '🌱', line: 'Meet new skills, lock in the old ones.' },
    drill:    { name: 'Drill',    emoji: '🔁', line: 'No new topics. Mix everything up and fix the weak spots.' },
    rehearse: { name: 'Rehearse', emoji: '🎯', line: 'Full papers against the clock, then patch the leaks.' }
  };

  /* ---------------- selection helpers ---------------- */

  function prereqsMet(sk) {
    if (!sk.prereq || !sk.prereq.length) return true;
    return sk.prereq.every(function (p) {
      const r = S.data().skills[p];
      return r && r.box >= 2;    // a prereq only needs to be *usable*, not mastered
    });
  }

  function untaught() {
    return skills().filter(function (s) { return !S.rec(s.id).taught; });
  }

  function dueSkills() {
    return skills().filter(function (s) { return S.isDue(s.id); });
  }

  function shakySkills() {
    return skills().filter(function (s) { return S.status(s.id) === 'shaky'; });
  }

  function learnedSkills() {
    return skills().filter(function (s) { const r = S.rec(s.id); return r.taught && r.box > 0; });
  }

  /** Days still available for teaching brand-new material. */
  function teachingDaysLeft() {
    return Math.max(1, daysLeft() - drillStartsAt());
  }

  /* How many brand-new skills to introduce today.
     The cap rises for a short run-up: with ten days and fifty skills there
     is no honest way to do fewer, and silently capping would mean the last
     few skills were never taught at all. A heavy day is split into two
     sessions instead (see `today`). */
  function newPerDay() {
    const left = untaught().length;
    if (!left) return 0;
    if (phase() !== 'learn') return 0;
    const cap = windowDays() <= 12 ? 10 : 8;
    const per = Math.ceil(left / teachingDaysLeft());
    return Math.max(1, Math.min(cap, per));
  }

  /**
   * Pick today's new skills: highest exam weight first, prereqs
   * respected, and rotated across subjects so a day is never a
   * single-subject slog.
   */
  function pickNew(n) {
    if (n <= 0) return [];
    const pool = untaught().filter(prereqsMet);
    if (!pool.length) return [];

    /* rank: exam weight, then easier first inside a topic */
    pool.sort(function (a, b) {
      const tw = (topicById(b.topic) ? topicById(b.topic).examWeight || 0 : 0) -
                 (topicById(a.topic) ? topicById(a.topic).examWeight || 0 : 0);
      if (tw) return tw;
      if (b.weight !== a.weight) return (b.weight || 3) - (a.weight || 3);
      return (a.difficulty || 2) - (b.difficulty || 2);
    });

    /* round-robin across subjects */
    const bySubject = {};
    pool.forEach(function (s) { (bySubject[s.subject] = bySubject[s.subject] || []).push(s); });
    const order = Object.keys(bySubject).sort(function (a, b) {
      return bySubject[b].length - bySubject[a].length;
    });

    const out = [];
    let guard = 0;
    while (out.length < n && guard++ < 200) {
      let added = false;
      for (let i = 0; i < order.length && out.length < n; i++) {
        const q = bySubject[order[i]];
        if (q && q.length) { out.push(q.shift()); added = true; }
      }
      if (!added) break;
    }
    return out;
  }

  /** Interleave a list so consecutive entries come from different subjects. */
  function interleave(list) {
    const bySubject = {};
    list.forEach(function (s) { (bySubject[s.subject] = bySubject[s.subject] || []).push(s); });
    const keys = Object.keys(bySubject);
    const out = [];
    let guard = 0;
    while (out.length < list.length && guard++ < 500) {
      for (let i = 0; i < keys.length; i++) {
        const q = bySubject[keys[i]];
        if (q && q.length) out.push(q.shift());
      }
    }
    return out;
  }

  /* ---------------- today's plan ---------------- */

  /**
   * @returns {{phase,phaseInfo,daysLeft,blocks:Array,estMinutes:number,newCount:number}}
   * Each block: { id, kind, emoji, title, sub, skills:[], items:number, mins:number }
   */
  function today() {
    const ph = phase();
    const due = dueSkills();
    const shaky = shakySkills();
    const nNew = newPerDay();
    const fresh = pickNew(nNew);
    const learned = learnedSkills();
    const blocks = [];

    /* 1 — WARM UP: quick recall of things already known and due today */
    const warmPool = interleave(due.filter(function (s) { return S.status(s.id) !== 'shaky'; }));
    if (warmPool.length) {
      blocks.push({
        id: 'warmup', kind: 'drill', emoji: '⚡',
        title: 'Warm-up recall',
        sub: 'Quick-fire questions on what you already know. No teaching, just remembering.',
        skills: warmPool.slice(0, 6).map(function (s) { return s.id; }),
        items: Math.min(8, warmPool.length * 2), mins: 5
      });
    }

    /* 2 — LESSONS: where a new topic is about to start and it has an
       interactive lesson he has not done, the lesson comes FIRST. He
       meets the idea by playing with it before any question is asked. */
    const lessonSeen = {};
    let lessonCount = 0;
    fresh.forEach(function (s) {
      if (lessonCount >= 2 || lessonSeen[s.topic]) return;
      lessonSeen[s.topic] = true;
      const avail = (window.HY_LESSONS || []).filter(function (l) {
        return l.topic === s.topic && !S.lessonDone(l.id);
      });
      if (!avail.length) return;
      const l = avail[0];
      lessonCount++;
      blocks.push({
        id: 'lesson-' + l.id, kind: 'lesson', emoji: l.emoji || '📘',
        title: 'Learn: ' + l.title,
        sub: (topicById(l.topic) ? topicById(l.topic).name : l.topic) + ' · ' +
             subjectName(s.subject) + ' · discover it by doing, then a quick check',
        lessonId: l.id, skills: [], items: 0, mins: l.minutes || 8
      });
    });

    /* 3 — NEW SKILLS: taught one at a time, practised to a clean streak */
    fresh.forEach(function (s, i) {
      blocks.push({
        id: 'new-' + s.id, kind: 'learn', emoji: '🌱',
        title: 'Learn: ' + s.name,
        sub: (topicById(s.topic) ? topicById(s.topic).name : s.topic) + ' · ' + subjectName(s.subject),
        skills: [s.id], items: 5, mins: 5, isNew: true, order: i
      });
    });

    /* 4 — REPAIR: everything currently shaky, with the teach card re-shown */
    if (shaky.length) {
      blocks.push({
        id: 'repair', kind: 'repair', emoji: '🩹',
        title: 'Repair shop',
        sub: 'The ' + shaky.length + ' skill' + (shaky.length === 1 ? '' : 's') + ' that keep slipping. We fix these first.',
        skills: interleave(shaky).slice(0, 6).map(function (s) { return s.id; }),
        items: Math.min(12, shaky.length * 3), mins: 8
      });
    }

    /* 5 — MIXED DRILL: interleaved practice across everything learnt */
    if (learned.length >= 3 && ph !== 'learn') {
      blocks.push({
        id: 'mixed', kind: 'drill', emoji: '🥗',
        title: 'Mixed bag',
        sub: 'All subjects shuffled together — exactly how the exam feels.',
        skills: interleave(learned).slice(0, 12).map(function (s) { return s.id; }),
        items: 14, mins: 12
      });
    } else if (learned.length >= 3) {
      blocks.push({
        id: 'mixed', kind: 'drill', emoji: '🥗',
        title: 'Mixed bag',
        sub: 'A shuffle of older skills so nothing goes rusty.',
        skills: interleave(learned).slice(0, 8).map(function (s) { return s.id; }),
        items: 8, mins: 7
      });
    }

    /* 6 — REHEARSAL: mock papers in the last stretch */
    if (ph === 'rehearse' || (ph === 'drill' && daysLeft() % 2 === 0)) {
      blocks.push({
        id: 'mock', kind: 'mock', emoji: '📝',
        title: 'Mock paper',
        sub: 'One timed paper. Sit it properly: pen, paper, no help.',
        skills: [], items: 0, mins: ph === 'rehearse' ? 45 : 25
      });
    }

    const estMinutes = blocks.reduce(function (a, b) { return a + b.mins; }, 0);

    /* A 65-minute block of work is not a session, it is an endurance test.
       Anything over 45 minutes is split in two, with the lessons and the
       warm-up kept together at the front of the first sitting. */
    let sessions = 1;
    if (estMinutes > 45 && blocks.length > 3) {
      sessions = 2;
      const half = estMinutes / 2;
      let running = 0;
      blocks.forEach(function (b) {
        running += b.mins;
        b.session = (running <= half || b.kind === 'lesson') ? 1 : 2;
      });
      /* never leave a session empty */
      if (!blocks.some(function (b) { return b.session === 2; })) {
        blocks[blocks.length - 1].session = 2;
      }
    } else {
      blocks.forEach(function (b) { b.session = 1; });
    }
    const sessionMinutes = [1, 2].map(function (n) {
      return blocks.filter(function (b) { return b.session === n; })
                   .reduce(function (a, b) { return a + b.mins; }, 0);
    });

    return {
      sessions: sessions,
      sessionMinutes: sessionMinutes,
      phase: ph,
      phaseInfo: PHASE_INFO[ph],
      daysLeft: daysLeft(),
      examDate: examDate(),
      blocks: blocks,
      estMinutes: estMinutes,
      newCount: fresh.length,
      dueCount: due.length,
      shakyCount: shaky.length
    };
  }

  /* ---------------- readiness ---------------- */

  function subjectName(id) {
    return { english: 'English', hindi: 'Hindi', maths: 'Maths', evs: 'EVS' }[id] || id;
  }

  /**
   * Exam readiness, 0..100. Weighted by how heavily each skill is
   * likely to be examined, so mastering three high-weight skills
   * moves the needle more than ten trivia ones.
   */
  function readiness() {
    const bySubject = {}, byTopic = {};
    let num = 0, den = 0;

    skills().forEach(function (s) {
      const w = s.weight || 3;
      const sc = S.score(s.id);
      num += w * sc; den += w;

      if (!bySubject[s.subject]) bySubject[s.subject] = { num: 0, den: 0, total: 0, mastered: 0, shaky: 0, untouched: 0 };
      const sub = bySubject[s.subject];
      sub.num += w * sc; sub.den += w; sub.total++;
      const st = S.status(s.id);
      if (st === 'mastered') sub.mastered++;
      else if (st === 'shaky') sub.shaky++;
      else if (st === 'new') sub.untouched++;

      if (!byTopic[s.topic]) byTopic[s.topic] = { num: 0, den: 0, total: 0, mastered: 0, shaky: 0, untouched: 0, subject: s.subject };
      const tp = byTopic[s.topic];
      tp.num += w * sc; tp.den += w; tp.total++;
      if (st === 'mastered') tp.mastered++;
      else if (st === 'shaky') tp.shaky++;
      else if (st === 'new') tp.untouched++;
    });

    function pct(o) { return o.den ? Math.round((o.num / o.den) * 100) : 0; }
    const outSub = {}, outTop = {};
    Object.keys(bySubject).forEach(function (k) { outSub[k] = Object.assign({ pct: pct(bySubject[k]) }, bySubject[k]); });
    Object.keys(byTopic).forEach(function (k) { outTop[k] = Object.assign({ pct: pct(byTopic[k]) }, byTopic[k]); });

    return {
      overall: den ? Math.round((num / den) * 100) : 0,
      bySubject: outSub,
      byTopic: outTop,
      totalSkills: skills().length,
      masteredSkills: skills().filter(function (s) { return S.status(s.id) === 'mastered'; }).length
    };
  }

  /**
   * Am I on track? Compares mastery achieved against mastery needed
   * by today if the syllabus is to be finished by D-4.
   */
  function pace() {
    const total = skills().length || 1;
    const start = S.data().startedOn || S.todayKey();
    const finishBy = S.addDays(examDate(), -Math.max(1, rehearseStartsAt()));
    const totalDays = Math.max(1, S.daysBetween(start, finishBy));
    const elapsed = Math.max(0, Math.min(totalDays, S.daysBetween(start, S.todayKey())));
    const shouldBe = Math.round((elapsed / totalDays) * total);
    const actual = skills().filter(function (s) { return S.score(s.id) >= 0.75; }).length;
    return {
      shouldBe: shouldBe, actual: actual, total: total,
      onTrack: actual >= shouldBe,
      gap: shouldBe - actual
    };
  }

  /** Full day-by-day calendar to the exam, for the countdown view. */
  function calendar() {
    const out = [];
    const n = daysLeft();
    for (let i = 0; i <= n; i++) {
      const key = S.addDays(S.todayKey(), i);
      const d = S.daysBetween(key, examDate());
      let ph = 'learn';
      if (d <= rehearseStartsAt()) ph = 'rehearse'; else if (d <= drillStartsAt()) ph = 'drill';
      const stats = S.data().days[key];
      out.push({
        key: key,
        label: S.prettyDate(key),
        dMinus: d,
        phase: ph,
        isToday: i === 0,
        done: !!(stats && stats.done),
        items: stats ? stats.items : 0
      });
    }
    return out;
  }

  /** Weakest skills first — used by the Repair Shop and the error book. */
  function weakest(n) {
    return skills()
      .filter(function (s) { return S.rec(s.id).taught; })
      .map(function (s) { return { skill: s, score: S.score(s.id), rec: S.rec(s.id) }; })
      .sort(function (a, b) {
        if (a.score !== b.score) return a.score - b.score;
        return b.rec.wrong - a.rec.wrong;
      })
      .slice(0, n || 10);
  }

  HY.plan = {
    today: today,
    readiness: readiness,
    pace: pace,
    calendar: calendar,
    weakest: weakest,
    phase: phase,
    phaseInfo: function () { return PHASE_INFO[phase()]; },
    daysLeft: daysLeft,
    examDate: examDate,
    windowDays: windowDays,
    drillStartsAt: drillStartsAt,
    newPerDay: newPerDay,
    untaught: untaught,
    dueSkills: dueSkills,
    shakySkills: shakySkills,
    learnedSkills: learnedSkills,
    skillById: skillById,
    topicById: topicById,
    subjectName: subjectName,
    interleave: interleave,
    PHASE_INFO: PHASE_INFO
  };
})();
