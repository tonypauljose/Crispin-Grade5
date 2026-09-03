/* ============================================================
   HALF-YEARLY HQ — exam.js
   Timed mock papers.

   Different from a drill on purpose:
     · no hints, no feedback until the end
     · a clock, a question palette, and the freedom to skip and
       come back — the two things that actually cost marks in a
       real paper are panic and bad time management
     · every answer still feeds the mastery engine afterwards, so
       a mock is also the best possible spaced-repetition session
     · the review at the end names the exact skills that leaked,
       and drops them straight into the repair shop
   ============================================================ */
(function () {
  'use strict';

  const HY = window.HY = window.HY || {};
  const S = HY.store;
  const esc = HY.esc;

  let E = null;

  function papers() { return window.HY_PAPERS || []; }
  function paperById(id) {
    const p = papers();
    for (let i = 0; i < p.length; i++) if (p[i].id === id) return p[i];
    return null;
  }

  /* ---------------- paper assembly ---------------- */

  function poolFor(sec) {
    const skills = window.HY_SKILLS || [];
    const wantTopics = sec.pick && sec.pick.topics;
    const wantSubject = sec.pick && sec.pick.subject;
    const wantTypes = sec.pick && sec.pick.types;
    const wantSkills = sec.pick && sec.pick.skills;
    const minLevel = (sec.pick && sec.pick.minLevel) || 1;

    const out = [];
    skills.forEach(function (sk) {
      if (wantSkills && wantSkills.indexOf(sk.id) < 0) return;
      if (wantTopics && wantTopics.indexOf(sk.topic) < 0) return;
      if (wantSubject && sk.subject !== wantSubject) return;
      (sk.items || []).forEach(function (it) {
        if (wantTypes && wantTypes.indexOf(it.type) < 0) return;
        if ((it.level || 2) < minLevel) return;
        out.push({ skill: sk, item: it });
      });
    });
    return out;
  }

  /** Build one sitting of the paper. Fresh sample every attempt. */
  function assemble(paper) {
    const sections = [];
    let n = 0;
    (paper.sections || []).forEach(function (sec) {
      const chosen = [];
      if (sec.items && sec.items.length) {
        sec.items.forEach(function (it) { chosen.push({ skill: null, item: it }); });
      } else {
        const pool = HY.shuffle(poolFor(sec));
        const seenSkill = {};
        /* spread across skills first, then top up */
        pool.forEach(function (p) {
          if (chosen.length >= sec.count) return;
          const key = p.skill ? p.skill.id : 'x';
          if (seenSkill[key]) return;
          seenSkill[key] = true; chosen.push(p);
        });
        for (let i = 0; i < pool.length && chosen.length < sec.count; i++) {
          if (chosen.indexOf(pool[i]) < 0) chosen.push(pool[i]);
        }
      }
      sections.push({
        name: sec.name,
        instructions: sec.instructions || '',
        marksEach: sec.marksEach || 1,
        questions: chosen.map(function (c) { return { skill: c.skill, item: c.item, no: ++n, answered: false, ctrl: null, res: null }; })
      });
    });
    return sections;
  }

  /* ---------------- lifecycle ---------------- */

  function start(opts) {
    const paper = paperById(opts.paperId);
    if (!paper) { opts.host.innerHTML = '<div class="hy-empty">That paper does not exist.</div>'; return; }
    E = {
      host: opts.host,
      onExit: opts.onExit || function () {},
      paper: paper,
      sections: assemble(paper),
      flat: [],
      idx: 0,
      started: 0,
      endsAt: 0,
      timer: null,
      submitted: false
    };
    E.sections.forEach(function (s) { s.questions.forEach(function (q) { q.section = s; E.flat.push(q); }); });
    renderBrief();
  }

  function renderBrief() {
    const p = E.paper;
    E.host.innerHTML =
      '<div class="hy-exambrief">' +
        '<div class="hy-exambrief__emoji">' + (p.emoji || '📝') + '</div>' +
        '<h1 class="hy-h1">' + esc(p.name) + '</h1>' +
        '<p class="hy-lead">' + esc(p.blurb || '') + '</p>' +
        '<div class="hy-exambrief__grid">' +
          '<div><span>' + E.flat.length + '</span>questions</div>' +
          '<div><span>' + p.marks + '</span>marks</div>' +
          '<div><span>' + p.minutes + '</span>minutes</div>' +
        '</div>' +
        '<ul class="hy-exambrief__rules">' +
          '<li>Answer every question. A blank scores nothing; a sensible guess sometimes scores everything.</li>' +
          '<li>You can skip and come back. Use the number strip at the top.</li>' +
          '<li>No hints, and no answers until you submit. That is the point.</li>' +
          '<li>Keep an eye on the clock. About <strong>' + Math.max(1, Math.round(p.minutes / E.flat.length)) + ' minute' +
            (Math.round(p.minutes / E.flat.length) === 1 ? '' : 's') + '</strong> per question.</li>' +
        '</ul>' +
        '<div class="hy-actions">' +
          '<button class="hy-btn hy-btn--ghost" id="hy-ex-cancel">Not now</button>' +
          '<button class="hy-btn hy-btn--primary" id="hy-ex-go">Start the clock ⏱️</button>' +
        '</div>' +
      '</div>';
    document.getElementById('hy-ex-cancel').addEventListener('click', function () { E.onExit(); });
    document.getElementById('hy-ex-go').addEventListener('click', function () {
      E.started = Date.now();
      E.endsAt = E.started + E.paper.minutes * 60000;
      HY.sfx.tap();
      renderQ();
      E.timer = setInterval(tick, 1000);
    });
  }

  function tick() {
    const left = Math.max(0, E.endsAt - Date.now());
    const el = document.getElementById('hy-ex-clock');
    if (el) {
      const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
      el.textContent = m + ':' + (s < 10 ? '0' : '') + s;
      el.classList.toggle('is-low', left < 120000);
    }
    if (left <= 0) { clearInterval(E.timer); submit(true); }
  }

  function renderQ() {
    const q = E.flat[E.idx];
    const sec = q.section;

    let palette = '<div class="hy-palette">';
    E.flat.forEach(function (x, i) {
      palette += '<button class="hy-pal' + (i === E.idx ? ' is-on' : '') + (x.answered ? ' is-done' : '') +
        (x.flag ? ' is-flag' : '') + '" data-i="' + i + '">' + (i + 1) + '</button>';
    });
    palette += '</div>';

    E.host.innerHTML =
      '<div class="hy-examhead">' +
        '<span class="hy-examhead__name">' + esc(E.paper.name) + '</span>' +
        '<span class="hy-clock" id="hy-ex-clock">--:--</span>' +
        '<button class="hy-btn hy-btn--warn hy-btn--sm" id="hy-ex-submit">Submit paper</button>' +
      '</div>' +
      palette +
      '<div class="hy-stage hy-stage--exam">' +
        '<div class="hy-examsec">' + esc(sec.name) + ' · ' + sec.marksEach + ' mark' + (sec.marksEach === 1 ? '' : 's') +
          (sec.instructions ? '<span class="hy-examsec__i">' + esc(sec.instructions) + '</span>' : '') + '</div>' +
        '<div class="hy-q"><span class="hy-q__no">' + q.no + '.</span> ' + q.item.q + '</div>' +
        (q.item.svg ? '<div class="hy-fig">' + q.item.svg + '</div>' : '') +
        '<div class="hy-body" id="hy-body"></div>' +
        '<div class="hy-actions">' +
          '<button class="hy-btn hy-btn--ghost" id="hy-ex-prev"' + (E.idx === 0 ? ' disabled' : '') + '>← Back</button>' +
          '<button class="hy-btn hy-btn--ghost" id="hy-ex-flag">' + (q.flag ? '🚩 Unflag' : '🏳️ Flag for later') + '</button>' +
          '<button class="hy-btn hy-btn--primary" id="hy-ex-next">' + (E.idx === E.flat.length - 1 ? 'Review & submit' : 'Next →') + '</button>' +
        '</div>' +
      '</div>';

    tick();
    const body = document.getElementById('hy-body');
    /* Each question keeps its OWN live DOM node and controller for the whole
       paper. Moving between questions detaches and re-attaches that node, so
       every answer survives navigation — including matches, sorts and
       orderings, whose state lives inside the widget rather than in the
       markup. */
    if (!q.el) {
      q.el = document.createElement('div');
      q.ctrl = HY.items.render(q.item, q.el);
    }
    body.appendChild(q.el);

    document.querySelectorAll('.hy-pal').forEach(function (b) {
      b.addEventListener('click', function () { leave(); E.idx = parseInt(b.dataset.i, 10); renderQ(); });
    });
    document.getElementById('hy-ex-prev').addEventListener('click', function () { leave(); if (E.idx > 0) { E.idx--; renderQ(); } });
    document.getElementById('hy-ex-next').addEventListener('click', function () {
      leave();
      if (E.idx < E.flat.length - 1) { E.idx++; renderQ(); } else renderReview();
    });
    document.getElementById('hy-ex-flag').addEventListener('click', function () { q.flag = !q.flag; leave(); renderQ(); });
    document.getElementById('hy-ex-submit').addEventListener('click', function () { leave(); renderReview(); });
  }

  /* Detach the current question's node before the screen is rebuilt, and
     record whether it has been attempted. */
  function leave() {
    const q = E.flat[E.idx];
    if (!q || !q.el) return;
    try { q.answered = !!(q.ctrl && q.ctrl.ready()); } catch (_) { q.answered = false; }
    if (q.el.parentNode) q.el.parentNode.removeChild(q.el);
  }

  /* ---------------- review + submit ---------------- */

  function renderReview() {
    const unanswered = E.flat.filter(function (q) { return !q.answered; });
    const flagged = E.flat.filter(function (q) { return q.flag; });
    E.host.innerHTML =
      '<div class="hy-stage">' +
        '<h2 class="hy-h1">Before you submit</h2>' +
        '<p class="hy-lead">' +
          (unanswered.length
            ? '<strong>' + unanswered.length + ' question' + (unanswered.length === 1 ? ' is' : 's are') + ' still blank.</strong> In a real paper, always write something.'
            : 'Every question has an answer. Good.') +
          (flagged.length ? ' You flagged ' + flagged.length + ' to come back to.' : '') +
        '</p>' +
        '<div class="hy-palette hy-palette--review">' +
          E.flat.map(function (q, i) {
            return '<button class="hy-pal' + (q.answered ? ' is-done' : ' is-blank') + (q.flag ? ' is-flag' : '') + '" data-i="' + i + '">' + (i + 1) + '</button>';
          }).join('') +
        '</div>' +
        '<div class="hy-actions">' +
          '<button class="hy-btn hy-btn--ghost" id="hy-ex-return">← Keep working</button>' +
          '<button class="hy-btn hy-btn--primary" id="hy-ex-final">Submit and see my marks</button>' +
        '</div>' +
      '</div>';
    document.querySelectorAll('.hy-pal').forEach(function (b) {
      b.addEventListener('click', function () { E.idx = parseInt(b.dataset.i, 10); renderQ(); });
    });
    document.getElementById('hy-ex-return').addEventListener('click', function () { renderQ(); });
    document.getElementById('hy-ex-final').addEventListener('click', function () { submit(false); });
  }

  /* Mark one question using its own live controller, so what is marked is
     exactly what he left on the screen. */
  function markOne(q) {
    if (!q.ctrl) return { correct: false, given: '(no answer)', want: '' };
    let attempted = false;
    try { attempted = !!q.ctrl.ready(); } catch (_) {}
    if (!attempted) {
      try { q.ctrl.reveal(); } catch (_) {}
      return { correct: false, given: '(blank)', want: wantOf(q) };
    }
    let res;
    try { res = q.ctrl.check(); } catch (_) { res = { correct: false, given: '(no answer)', want: wantOf(q) }; }
    return res;
  }

  /* Best-effort description of the right answer, for a blank response. */
  function wantOf(q) {
    const it = q.item;
    switch (it.type) {
      case 'mcq': return it.options ? it.options[it.answer] : '';
      case 'multi': return (it.answer || []).map(function (i) { return it.options[i]; }).join(', ');
      case 'tf': return it.answer ? 'True' : 'False';
      case 'fill': return (it.accept || [])[0] || '';
      case 'fillMulti': return (it.blanks || []).map(function (b) { return b.label + ': ' + b.accept[0]; }).join(' · ');
      case 'match': return (it.pairs || []).map(function (p) { return p.l + ' - ' + p.r; }).join(', ');
      case 'order': return (it.answer || []).join(' ');
      case 'bucket': return (it.chips || []).map(function (c) { return c.t + ' - ' + c.b; }).join(', ');
      case 'tap': return (it.tokens || []).filter(function (t) { return t.ok; }).map(function (t) { return t.t; }).join(', ');
      case 'steps': return (it.parts || []).map(function (p) { return p.accept[0]; }).join(' | ');
      default: return '';
    }
  }

  function submit(outOfTime) {
    if (E.submitted) return;
    E.submitted = true;
    if (E.timer) clearInterval(E.timer);
    leave();

    let marks = 0, total = 0;
    const selfMark = [];
    const weak = {};

    E.sections.forEach(function (sec) {
      sec.questions.forEach(function (q) {
        total += sec.marksEach;
        if (q.item.type === 'shortAnswer' || q.item.type === 'speak') {
          const ta = q.el ? q.el.querySelector('textarea') : null;
          q.res = { correct: null, given: ta ? ta.value : '', want: q.item.model || q.item.text || '' };
          selfMark.push(q);
          return;
        }
        q.res = markOne(q);
        if (q.res.correct) marks += sec.marksEach;
        if (q.skill) {
          S.answer(q.skill.id, q.item.id, !!q.res.correct, q.res.given, q.res.want);
          if (!q.res.correct) weak[q.skill.id] = (weak[q.skill.id] || 0) + 1;
        }
      });
    });

    const autoTotal = total - selfMark.reduce(function (a, q) { return a + q.section.marksEach; }, 0);
    const pct = autoTotal ? Math.round((marks / autoTotal) * 100) : 0;
    const mins = Math.round((Date.now() - E.started) / 60000);

    S.recordMock({
      id: E.paper.id, name: E.paper.name, subject: E.paper.subject,
      pct: pct, marks: marks, total: autoTotal,
      weakSkills: Object.keys(weak)
    });
    S.bridgeXP(40, 'Mock paper: ' + E.paper.name);
    if (pct >= 80) { HY.confetti(110); HY.sfx.win(); }

    renderResult(pct, marks, autoTotal, mins, selfMark, weak, outOfTime);
  }

  function renderResult(pct, marks, total, mins, selfMark, weak, outOfTime) {
    let line;
    if (pct >= 90) line = 'That is an A. Do a couple more and keep it there.';
    else if (pct >= 75) line = 'Solid pass. Fix the handful below and this becomes an A.';
    else if (pct >= 55) line = 'Halfway there. The list below is exactly what to work on — nothing else.';
    else line = 'Rough one, and much better now than in September. Everything you missed is now in the repair shop.';

    let h = '<div class="hy-stage hy-done">' +
      (outOfTime ? '<div class="hy-again">⏰ Time ran out — the rest were marked blank. Time management is a skill too.</div>' : '') +
      '<div class="hy-done__ring">' + HY.drill.ring(pct) + '</div>' +
      '<h2 class="hy-done__title">' + marks + ' / ' + total + '</h2>' +
      '<p class="hy-done__line">' + line + '</p>' +
      '<div class="hy-done__stats"><div><span>' + mins + '</span>minutes used</div><div><span>' + E.paper.minutes + '</span>allowed</div></div>';

    const weakIds = Object.keys(weak);
    if (weakIds.length) {
      h += '<div class="hy-panel"><h3 class="hy-panel__title">What leaked</h3><div class="hy-skilllist">' +
        weakIds.sort(function (a, b) { return weak[b] - weak[a]; }).map(function (id) {
          const sk = HY.plan.skillById(id);
          return sk ? HY.app.skillRow(sk) : '';
        }).join('') + '</div>' +
        '<button class="hy-btn hy-btn--primary" id="hy-ex-fix">Fix these now →</button></div>';
    }

    if (selfMark.length) {
      h += '<div class="hy-panel"><h3 class="hy-panel__title">Mark these yourself</h3>' +
        '<p class="hy-lead">Written answers cannot be auto-marked. Compare yours with the model and be strict — the examiner will be.</p>';
      selfMark.forEach(function (q) {
        h += '<div class="hy-selfmark"><div class="hy-selfmark__q">' + q.no + '. ' + q.item.q + '</div>' +
          '<div class="hy-selfmark__yours"><strong>You wrote:</strong> ' + esc(q.res.given || '(blank)') + '</div>' +
          '<div class="hy-selfmark__model"><strong>Model:</strong> ' + (q.item.model || q.item.text || '') + '</div>' +
          (q.item.must ? '<ul class="hy-selfmark__must">' + q.item.must.map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ul>' : '') +
          '</div>';
      });
      h += '</div>';
    }

    h += '<div class="hy-panel"><h3 class="hy-panel__title">Full paper review</h3><div class="hy-review">';
    E.sections.forEach(function (sec) {
      h += '<div class="hy-review__sec">' + esc(sec.name) + '</div>';
      sec.questions.forEach(function (q) {
        const ok = q.res && q.res.correct;
        const mark = q.res && q.res.correct === null ? '✎' : (ok ? '✓' : '✗');
        h += '<div class="hy-review__q ' + (q.res && q.res.correct === null ? 'is-self' : ok ? 'is-ok' : 'is-no') + '">' +
          '<span class="hy-review__m">' + mark + '</span>' +
          '<div><div class="hy-review__t">' + q.no + '. ' + q.item.q + '</div>' +
          (ok ? '' : '<div class="hy-review__a">Answer: <strong>' + esc(String(q.res ? q.res.want : '')).slice(0, 200) + '</strong></div>') +
          (!ok && q.item.explain ? '<div class="hy-review__e">' + q.item.explain + '</div>' : '') +
          '</div></div>';
      });
    });
    h += '</div></div>';

    h += '<div class="hy-actions"><button class="hy-btn hy-btn--ghost" id="hy-ex-done">Back to mocks</button></div></div>';
    E.host.innerHTML = h;

    document.getElementById('hy-ex-done').addEventListener('click', function () { E.onExit(); });
    const fix = document.getElementById('hy-ex-fix');
    if (fix) fix.addEventListener('click', function () {
      const runner = document.createElement('div');
      runner.className = 'hy-runner';
      E.host.innerHTML = '';
      E.host.appendChild(runner);
      HY.drill.start({
        host: runner,
        block: { id: 'post-mock', kind: 'repair', emoji: '🩹', title: 'Post-mock repair', sub: 'Everything the paper caught',
                 skills: weakIds.slice(0, 6), items: 14, mins: 12 },
        onExit: function () { E.onExit(); }
      });
    });
  }

  HY.exam = { start: start, assemble: assemble, paperById: paperById };
})();
