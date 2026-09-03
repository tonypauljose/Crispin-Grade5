/* ============================================================
   HALF-YEARLY HQ — lesson.js
   The LEARN half of the app.

   A lesson is a short journey, one screen at a time:

     intro     why this matters, in one breath
     idea      the explanation, in plain words with a picture
     explore   a piece of apparatus he actually plays with —
               the rule is discovered, not announced
     teach     the formal rule card for the skill, once he has
               already met the idea
     check     three or four real questions, which DO count
               towards mastery
     milestone what he can now do

   Nothing here is a wall of text. One idea per screen, a big
   Next button, and the Next stays locked on an `explore` screen
   until he has actually used the apparatus (with a "skip" escape
   hatch, because being trapped is worse than skipping).
   ============================================================ */
(function () {
  'use strict';

  const HY = window.HY = window.HY || {};
  const S = HY.store;
  const esc = HY.esc;

  let L = null;

  function lessons() { return window.HY_LESSONS || []; }
  function byId(id) {
    const all = lessons();
    for (let i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }
  function forTopic(topicId) {
    return lessons().filter(function (l) { return l.topic === topicId; });
  }

  /* ---------------- rendering ---------------- */

  function shell(inner, opts) {
    opts = opts || {};
    const pct = Math.round(((L.idx) / Math.max(1, L.stages.length - 1)) * 100);
    L.host.innerHTML =
      '<div class="hy-lesson">' +
        '<div class="hy-lesson__bar"><div class="hy-lesson__fill" style="width:' + pct + '%"></div></div>' +
        '<div class="hy-lesson__head">' +
          '<span class="hy-lesson__title">' + (L.lesson.emoji || '📘') + ' ' + esc(L.lesson.title) + '</span>' +
          '<span class="hy-lesson__step">' + (L.idx + 1) + ' / ' + L.stages.length + '</span>' +
        '</div>' +
        '<div class="hy-lesson__body" id="hy-lesson-body">' + (inner || '') + '</div>' +
        '<div class="hy-actions" id="hy-lesson-actions">' +
          '<button class="hy-btn hy-btn--ghost" id="hy-l-back">' + (L.idx === 0 ? 'Leave' : '← Back') + '</button>' +
          (opts.noNext ? '' :
            '<button class="hy-btn hy-btn--primary" id="hy-l-next"' + (opts.lockNext ? ' disabled' : '') + '>' +
              (L.idx === L.stages.length - 1 ? 'Finish' : (opts.nextLabel || 'Next →')) + '</button>') +
        '</div>' +
        (opts.lockNext ? '<button class="hy-lesson__skip" id="hy-l-skip">Skip this bit</button>' : '') +
      '</div>';

    document.getElementById('hy-l-back').addEventListener('click', function () {
      HY.sfx.tap();
      if (L.idx === 0) return exit();
      L.idx--; render();
    });
    const nx = document.getElementById('hy-l-next');
    if (nx) nx.addEventListener('click', advance);
    const sk = document.getElementById('hy-l-skip');
    if (sk) sk.addEventListener('click', function () { HY.sfx.tap(); advance(); });
    return document.getElementById('hy-lesson-body');
  }

  function unlockNext() {
    const nx = document.getElementById('hy-l-next');
    if (nx && nx.disabled) {
      nx.disabled = false;
      nx.classList.add('hy-btn--pulse');
      HY.sfx.badge();
    }
    const sk = document.getElementById('hy-l-skip');
    if (sk) sk.remove();
  }

  function advance() {
    HY.sfx.tap();
    if (L.idx >= L.stages.length - 1) return finish();
    L.idx++;
    S.setLessonStage(L.lesson.id, L.idx);
    render();
  }

  /* ---------------- stage renderers ---------------- */

  const R = {};

  R.intro = function (s) {
    shell(
      '<div class="hy-lstage hy-lstage--intro">' +
        '<div class="hy-lstage__emoji">' + (s.emoji || '✨') + '</div>' +
        '<h2 class="hy-lstage__h">' + esc(s.title) + '</h2>' +
        '<div class="hy-lstage__body">' + (s.body || '') + '</div>' +
      '</div>', { nextLabel: "Let's go →" });
  };

  R.idea = function (s) {
    shell(
      '<div class="hy-lstage">' +
        '<h2 class="hy-lstage__h">' + (s.emoji ? s.emoji + ' ' : '') + esc(s.title) + '</h2>' +
        (s.svg ? '<div class="hy-fig">' + s.svg + '</div>' : '') +
        '<div class="hy-lstage__body">' + (s.body || '') + '</div>' +
        (s.remember ? '<div class="hy-remember"><div class="hy-remember__title">Remember</div><ul>' +
          s.remember.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul></div>' : '') +
        (s.watchOut ? '<div class="hy-watch"><strong>Watch out:</strong> ' + s.watchOut + '</div>' : '') +
      '</div>');
    HY.drill.speakable(L.host);
  };

  R.explore = function (s) {
    const body = shell(
      '<div class="hy-lstage">' +
        '<h2 class="hy-lstage__h">' + (s.emoji || '🧪') + ' ' + esc(s.title || 'Try it') + '</h2>' +
        (s.why ? '<p class="hy-lstage__why">' + s.why + '</p>' : '') +
        '<div class="hy-widget" id="hy-widget"></div>' +
      '</div>', { lockNext: true });

    const holder = body.querySelector('#hy-widget');
    const fn = HY.widgets && HY.widgets[s.widget];
    if (!fn) {
      holder.innerHTML = '<div class="hy-empty">This activity is not available.</div>';
      unlockNext();
      return;
    }
    try {
      const w = fn(holder, s.opts || {});
      if (w && w.onDone) w.onDone(unlockNext);
      else unlockNext();
    } catch (e) {
      holder.innerHTML = '<div class="hy-empty">This activity could not start.</div>';
      unlockNext();
    }
  };

  R.teach = function (s) {
    const sk = HY.plan.skillById(s.skill);
    if (!sk) { advance(); return; }
    S.markTaught(sk.id);
    shell('<div class="hy-lstage">' + HY.drill.teachHTML(sk) + '</div>', { nextLabel: 'Got it →' });
    HY.drill.speakable(L.host);
  };

  R.check = function (s) {
    const body = shell(
      '<div class="hy-lstage">' +
        '<h2 class="hy-lstage__h">✅ ' + esc(s.title || 'Quick check') + '</h2>' +
        '<p class="hy-lstage__why">' + (s.why || 'A few real questions. These count — get them right and the skill starts filling up.') + '</p>' +
        '<div id="hy-check-host"></div>' +
      '</div>', { noNext: true });

    HY.drill.start({
      host: body.querySelector('#hy-check-host'),
      block: {
        id: 'lesson-check-' + L.lesson.id + '-' + L.idx,
        kind: 'drill', emoji: '✅', title: s.title || 'Quick check', sub: '',
        skills: s.skills || [s.skill], items: s.items || 4, mins: 4
      },
      onExit: function () { advance(); }
    });
  };

  R.milestone = function (s) {
    HY.confetti(80); HY.sfx.win();
    shell(
      '<div class="hy-lstage hy-lstage--intro">' +
        '<div class="hy-lstage__emoji">' + (s.emoji || '🏅') + '</div>' +
        '<h2 class="hy-lstage__h">' + esc(s.title || 'Lesson complete') + '</h2>' +
        '<div class="hy-lstage__body">' + (s.body || '') + '</div>' +
        (s.canNow ? '<div class="hy-cannow"><div class="hy-cannow__t">You can now</div><ul>' +
          s.canNow.map(function (c) { return '<li>' + c + '</li>'; }).join('') + '</ul></div>' : '') +
      '</div>', { nextLabel: 'Finish' });
  };

  function render() {
    const s = L.stages[L.idx];
    const fn = R[s.kind];
    if (!fn) { advance(); return; }
    fn(s);
    const main = document.querySelector('.hy-main');
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  /* ---------------- lifecycle ---------------- */

  function start(opts) {
    const lesson = typeof opts.lesson === 'string' ? byId(opts.lesson) : opts.lesson;
    if (!lesson) { opts.host.innerHTML = '<div class="hy-empty">Lesson not found.</div>'; return; }
    L = {
      host: opts.host,
      lesson: lesson,
      stages: lesson.stages || [],
      idx: opts.resume ? Math.min(S.lessonStage(lesson.id), (lesson.stages || []).length - 1) : 0,
      onExit: opts.onExit || function () {},
      startedAt: Date.now()
    };
    if (!L.stages.length) { opts.host.innerHTML = '<div class="hy-empty">This lesson has no content yet.</div>'; return; }
    render();
  }

  function finish() {
    const mins = Math.max(1, Math.round((Date.now() - L.startedAt) / 60000));
    S.addMinutes(mins);
    S.markLessonDone(L.lesson.id);
    S.bridgeXP(30, 'Lesson: ' + L.lesson.title);
    HY.toast('Lesson complete · +30 XP', 'good');
    exit();
  }

  function exit() {
    HY.speech.stop();
    const fn = L.onExit;
    L = null;
    fn();
  }

  HY.lesson = {
    start: start,
    byId: byId,
    forTopic: forTopic,
    all: lessons
  };
})();
