/* ============================================================
   HALF-YEARLY HQ — app.js
   The shell: chrome, hash routing, and every screen that is not
   a running drill.

   Routes
     #/            Today — the only screen he needs on a normal day
     #/map         The whole syllabus, subject by subject
     #/topic/:id   One topic: its skills and how solid each one is
     #/skill/:id   One skill: the teach card, then practice
     #/repair      Error book — everything currently shaky
     #/mock        Mock papers
     #/exam/:id    A mock paper, running
     #/progress    Readiness, calendar, mastery table, backup
   ============================================================ */
(function () {
  'use strict';

  const HY = window.HY = window.HY || {};
  const S = HY.store;
  const esc = HY.esc;

  let host, root, view;
  const CFG = function () { return window.HY_CONFIG || {}; };

  const SUBJECTS = [
    { id: 'english', name: 'English', emoji: '📖' },
    { id: 'hindi',   name: 'Hindi',   emoji: '🪔' },
    { id: 'maths',   name: 'Maths',   emoji: '🧮' },
    { id: 'evs',     name: 'EVS',     emoji: '🌍' }
  ];

  /* ---------------- chrome ---------------- */
  function buildChrome() {
    root = document.createElement('div');
    root.className = 'hy';
    if (S.prefs().dark) root.classList.add('hy--dark');
    root.innerHTML =
      '<header class="hy-top">' +
        '<a class="hy-top__brand" href="#/"><span class="hy-top__logo">🎯</span><span>Half-Yearly HQ</span></a>' +
        '<nav class="hy-top__nav">' +
          '<a href="#/" data-r="today">Today</a>' +
          '<a href="#/map" data-r="map">Syllabus</a>' +
          '<a href="#/repair" data-r="repair">Repair</a>' +
          '<a href="#/mock" data-r="mock">Mocks</a>' +
          '<a href="#/progress" data-r="progress">Progress</a>' +
        '</nav>' +
        '<span class="hy-top__spacer"></span>' +
        '<span class="hy-top__count" id="hy-count"></span>' +
        '<button class="hy-icon" id="hy-sound" aria-label="Sound on or off"></button>' +
        '<button class="hy-icon" id="hy-theme" aria-label="Light or dark"></button>' +
        '<a class="hy-icon" href="' + (CFG().homeHref || 'index.html') + '" aria-label="Exit">✕</a>' +
      '</header>' +
      '<main class="hy-main"><div class="hy-wrap" id="hy-view"></div></main>' +
      '<nav class="hy-tabbar">' +
        '<a href="#/" data-r="today"><span>🎯</span>Today</a>' +
        '<a href="#/map" data-r="map"><span>🗺️</span>Syllabus</a>' +
        '<a href="#/repair" data-r="repair"><span>🩹</span>Repair</a>' +
        '<a href="#/mock" data-r="mock"><span>📝</span>Mocks</a>' +
        '<a href="#/progress" data-r="progress"><span>📊</span>Progress</a>' +
      '</nav>';
    host.appendChild(root);
    view = root.querySelector('#hy-view');

    const sBtn = root.querySelector('#hy-sound'), tBtn = root.querySelector('#hy-theme');
    function paint() {
      sBtn.textContent = HY.sfx.on ? '🔊' : '🔇';
      tBtn.textContent = root.classList.contains('hy--dark') ? '☀️' : '🌙';
    }
    sBtn.addEventListener('click', function () { HY.sfx.setOn(!HY.sfx.on); paint(); if (HY.sfx.on) HY.sfx.tap(); });
    tBtn.addEventListener('click', function () {
      const dark = root.classList.toggle('hy--dark');
      S.setPref('dark', dark); paint();
    });
    paint();
  }

  function setActive(r) {
    root.querySelectorAll('[data-r]').forEach(function (a) { a.classList.toggle('is-on', a.dataset.r === r); });
    const d = HY.plan.daysLeft();
    const c = root.querySelector('#hy-count');
    if (c) c.innerHTML = d === 0 ? '🔥 Exam day' : '<strong>' + d + '</strong> day' + (d === 1 ? '' : 's') + ' to go';
  }

  function scrollTop() { const m = root.querySelector('.hy-main'); if (m) m.scrollTop = 0; window.scrollTo(0, 0); }

  /* ---------------- shared bits ---------------- */

  function readinessRing(pct, label) {
    const C = 2 * Math.PI * 52, off = C * (1 - pct / 100);
    return '<div class="hy-readyring"><svg viewBox="0 0 120 120" class="hy-ring" role="img"><title>Readiness ' + pct + '%</title>' +
      '<circle class="hy-ring__bg" cx="60" cy="60" r="52" fill="none" stroke-width="11"/>' +
      '<circle class="hy-ring__fg" cx="60" cy="60" r="52" fill="none" stroke-width="11" stroke-linecap="round" ' +
      'stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 60 60)"/>' +
      '<text class="hy-ring__t" x="60" y="66" text-anchor="middle">' + pct + '%</text></svg>' +
      (label ? '<div class="hy-readyring__label">' + label + '</div>' : '') + '</div>';
  }

  function bar(pct, cls) {
    return '<div class="hy-bar"><div class="hy-bar__fill' + (cls ? ' ' + cls : '') + '" style="width:' + pct + '%"></div></div>';
  }

  const STATUS_LABEL = {
    'new': { t: 'Not started', c: 'new', e: '○' },
    'learning': { t: 'Learning', c: 'learning', e: '◔' },
    'shaky': { t: 'Shaky', c: 'shaky', e: '⚠' },
    'strong': { t: 'Strong', c: 'strong', e: '◕' },
    'mastered': { t: 'Mastered', c: 'mastered', e: '★' }
  };

  function skillRow(sk) {
    const st = S.status(sk.id), rec = S.rec(sk.id), info = STATUS_LABEL[st];
    return '<a class="hy-skillrow is-' + info.c + '" href="#/skill/' + encodeURIComponent(sk.id) + '">' +
      '<span class="hy-skillrow__mark">' + info.e + '</span>' +
      '<span class="hy-skillrow__main">' +
        '<span class="hy-skillrow__name">' + esc(sk.name) + '</span>' +
        '<span class="hy-skillrow__can">' + esc(sk.canDo || '') + '</span>' +
      '</span>' +
      '<span class="hy-skillrow__meta">' +
        '<span class="hy-skillrow__tag">' + info.t + '</span>' +
        (rec.seen ? '<span class="hy-skillrow__score">' + rec.right + '/' + rec.seen + '</span>' : '') +
      '</span></a>';
  }

  /* ---------------- TODAY ---------------- */

  function renderToday() {
    setActive('today');
    const p = HY.plan.today();
    const r = HY.plan.readiness();
    const pace = HY.plan.pace();
    const day = S.dayStats();
    const streak = S.streakDays();
    const name = CFG().name || 'Crispin';

    let hero =
      '<section class="hy-hero">' +
        '<div class="hy-hero__left">' +
          '<div class="hy-hero__eyebrow">' + p.phaseInfo.emoji + ' ' + p.phaseInfo.name + ' phase · ' + esc(p.phaseInfo.line) + '</div>' +
          '<h1 class="hy-hero__title">' + (p.daysLeft === 0 ? 'It is exam day, ' + esc(name) + '.' : esc(greeting()) + ', ' + esc(name) + '.') + '</h1>' +
          '<p class="hy-hero__sub">' + heroLine(p, pace, day) + '</p>' +
          '<div class="hy-hero__chips">' +
            '<span class="hy-chipstat"><strong>' + p.daysLeft + '</strong> days left</span>' +
            '<span class="hy-chipstat"><strong>' + streak + '</strong> day streak 🔥</span>' +
            '<span class="hy-chipstat"><strong>' + r.masteredSkills + '/' + r.totalSkills + '</strong> skills mastered</span>' +
            '<span class="hy-chipstat"><strong>~' + p.estMinutes + '</strong> min today' +
              (p.sessions > 1 ? ' (2 sittings)' : '') + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="hy-hero__right">' + readinessRing(r.overall, 'Exam readiness') + '</div>' +
      '</section>';

    let blocks = '<section class="hy-blocks">';
    if (!p.blocks.length) {
      blocks += '<div class="hy-empty">Nothing scheduled — everything is reviewed and nothing is due. Take the evening off, or open the <a href="#/map">syllabus map</a> and pick anything you fancy.</div>';
    }
    let lastSession = 0;
    p.blocks.forEach(function (b, i) {
      const doneMark = '';
      if (p.sessions > 1 && b.session !== lastSession) {
        lastSession = b.session;
        blocks += '<div class="hy-sessionhead">' +
          '<span class="hy-sessionhead__n">Session ' + b.session + '</span>' +
          '<span class="hy-sessionhead__m">about ' + p.sessionMinutes[b.session - 1] + ' minutes' +
          (b.session === 2 ? ' · take a proper break first' : '') + '</span></div>';
      }
      blocks +=
        '<article class="hy-block hy-block--' + b.kind + '">' +
          '<div class="hy-block__n">' + (i + 1) + '</div>' +
          '<div class="hy-block__main">' +
            '<h3 class="hy-block__title">' + b.emoji + ' ' + esc(b.title) + doneMark + '</h3>' +
            '<p class="hy-block__sub">' + esc(b.sub) + '</p>' +
            '<div class="hy-block__meta">' + (b.items ? b.items + ' questions · ' : '') + '~' + b.mins + ' min</div>' +
          '</div>' +
          '<button class="hy-btn hy-btn--primary hy-block__go" data-block="' + i + '">Start</button>' +
        '</article>';
    });
    blocks += '</section>';

    const weak = HY.plan.weakest(3).filter(function (w) { return w.score < 0.6; });
    let weakHTML = '';
    if (weak.length) {
      weakHTML = '<section class="hy-panel"><h2 class="hy-panel__title">🩹 Weakest right now</h2><div class="hy-skilllist">' +
        weak.map(function (w) { return skillRow(w.skill); }).join('') +
        '</div><a class="hy-btn hy-btn--ghost" href="#/repair">Open the repair shop →</a></section>';
    }

    let subj = '<section class="hy-panel"><h2 class="hy-panel__title">Where you stand</h2><div class="hy-subgrid">';
    SUBJECTS.forEach(function (s) {
      const d = r.bySubject[s.id];
      if (!d) {
        subj += '<div class="hy-subcard is-empty"><div class="hy-subcard__top">' + s.emoji + ' ' + s.name + '</div>' +
                '<div class="hy-subcard__note">No material yet</div></div>';
        return;
      }
      subj += '<a class="hy-subcard" href="#/map">' +
        '<div class="hy-subcard__top">' + s.emoji + ' ' + s.name + '<span>' + d.pct + '%</span></div>' +
        bar(d.pct, 'is-' + s.id) +
        '<div class="hy-subcard__note">' + d.mastered + ' mastered · ' + d.shaky + ' shaky · ' + d.untouched + ' new</div>' +
        '</a>';
    });
    subj += '</div></section>';

    view.innerHTML = hero + blocks + weakHTML + subj;

    view.querySelectorAll('[data-block]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const b = p.blocks[parseInt(btn.dataset.block, 10)];
        if (b.kind === 'mock') { location.hash = '#/mock'; return; }
        runBlock(b);
      });
    });
  }

  function greeting() {
    let h = 12;
    try { h = parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Bahrain', hour: '2-digit', hour12: false }).format(new Date()), 10); } catch (_) {}
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  function heroLine(p, pace, day) {
    if (p.daysLeft === 0) return 'Everything is done. Read your Remember cards once, then go and enjoy it.';
    if (day.items > 0 && !p.blocks.length) return 'Today is finished. ' + day.right + ' right out of ' + day.items + '.';
    if (day.items > 0) return 'You have done ' + day.items + ' questions today. ' + (p.blocks.length) + ' block' + (p.blocks.length === 1 ? '' : 's') + ' left.';
    if (!pace.onTrack && pace.gap > 2) return 'You are ' + pace.gap + ' skills behind the plan — today is a good day to catch up.';
    return 'Here is today. Work down the list, and the plan does the rest.';
  }

  function runBlock(b) {
    setActive('today');
    view.innerHTML = '<div class="hy-runner" id="hy-runner"></div>';
    scrollTop();
    if (b.kind === 'lesson') {
      HY.lesson.start({
        host: document.getElementById('hy-runner'),
        lesson: b.lessonId,
        resume: true,
        onExit: function () { renderToday(); scrollTop(); }
      });
      return;
    }
    HY.drill.start({
      host: document.getElementById('hy-runner'),
      block: b,
      onExit: function () { renderToday(); scrollTop(); }
    });
  }

  /* ---------------- MAP ---------------- */

  function renderMap() {
    setActive('map');
    const r = HY.plan.readiness();
    const topics = window.HY_TOPICS || [];
    let h = '<h1 class="hy-h1">🗺️ The whole syllabus</h1>' +
      '<p class="hy-lead">Everything in the half-yearly portion, broken into skills. Green means it has really stuck.</p>';

    SUBJECTS.forEach(function (s) {
      const list = topics.filter(function (t) { return t.subject === s.id; });
      const d = r.bySubject[s.id];
      h += '<section class="hy-panel"><h2 class="hy-panel__title">' + s.emoji + ' ' + s.name +
           (d ? '<span class="hy-panel__pct">' + d.pct + '%</span>' : '') + '</h2>';
      if (!list.length) {
        h += '<div class="hy-empty">No material has been added for ' + s.name + ' yet. ' +
             'Drop the notebook and textbook photos into <code>Half Yearly Portion/Crispin/' + s.name + '/</code> and they can be built in.</div></section>';
        return;
      }
      h += '<div class="hy-topicgrid">';
      list.forEach(function (t) {
        const td = r.byTopic[t.id] || { pct: 0, total: 0, mastered: 0, shaky: 0 };
        h += '<a class="hy-topiccard" href="#/topic/' + encodeURIComponent(t.id) + '">' +
          '<div class="hy-topiccard__emoji">' + (t.emoji || '📘') + '</div>' +
          '<h3 class="hy-topiccard__title">' + esc(t.name) + '</h3>' +
          '<p class="hy-topiccard__blurb">' + esc(t.blurb || '') + '</p>' +
          bar(td.pct, 'is-' + s.id) +
          '<div class="hy-topiccard__meta">' + td.mastered + '/' + td.total + ' mastered' +
          (td.shaky ? ' · <span class="is-shaky">' + td.shaky + ' shaky</span>' : '') + '</div>' +
          '</a>';
      });
      h += '</div></section>';
    });
    view.innerHTML = h;
  }

  /* ---------------- TOPIC ---------------- */

  function renderTopic(id) {
    setActive('map');
    const t = HY.plan.topicById(id);
    if (!t) { view.innerHTML = '<div class="hy-empty">Topic not found.</div>'; return; }
    const list = (window.HY_SKILLS || []).filter(function (s) { return s.topic === id; });
    const r = HY.plan.readiness().byTopic[id] || { pct: 0 };

    view.innerHTML =
      '<a class="hy-back" href="#/map">← All subjects</a>' +
      '<div class="hy-topichead">' +
        '<div class="hy-topichead__emoji">' + (t.emoji || '📘') + '</div>' +
        '<div><h1 class="hy-h1">' + esc(t.name) + '</h1>' +
        '<p class="hy-lead">' + esc(t.blurb || '') + '</p>' +
        '<p class="hy-source">Built from: ' + esc(t.source || 'class material') + '</p></div>' +
        readinessRing(r.pct, 'Topic') +
      '</div>' +
      '<div class="hy-actions hy-actions--left">' +
        '<button class="hy-btn hy-btn--primary" id="hy-practice-topic">Practise this topic (12 questions)</button>' +
        '<button class="hy-btn hy-btn--ghost" id="hy-teach-all">Read every rule</button>' +
      '</div>' +
      lessonsHTML(id) +
      '<h2 class="hy-panel__title hy-skilllist__h">Skills in this topic</h2>' +
      '<div class="hy-skilllist">' + list.map(skillRow).join('') + '</div>';

    document.getElementById('hy-practice-topic').addEventListener('click', function () {
      runBlock({
        id: 'topic-' + id, kind: 'drill', emoji: '📘', title: t.name,
        sub: 'Topic practice', skills: list.map(function (s) { return s.id; }), items: 12, mins: 10
      });
    });
    document.getElementById('hy-teach-all').addEventListener('click', function () {
      const html = list.map(function (s) { return HY.drill.teachHTML(s); }).join('<hr class="hy-hr">');
      const m = HY.modal('<div class="hy-modal__scroll">' + html + '</div><div class="hy-actions"><button class="hy-btn hy-btn--primary" data-close>Close</button></div>', { cls: 'hy-modal--wide' });
      HY.drill.speakable(m.el);
    });
  }

  function renderLesson(id) {
    setActive('map');
    const l = HY.lesson.byId(id);
    if (!l) { view.innerHTML = '<div class="hy-empty">Lesson not found.</div>'; return; }
    view.innerHTML = '<div class="hy-runner" id="hy-runner"></div>';
    HY.lesson.start({
      host: document.getElementById('hy-runner'),
      lesson: l, resume: true,
      onExit: function () { location.hash = '#/topic/' + encodeURIComponent(l.topic); }
    });
  }

  function lessonsHTML(topicId) {
    const ls = HY.lesson.forTopic(topicId);
    if (!ls.length) return '';
    return '<section class="hy-panel hy-panel--lessons">' +
      '<h2 class="hy-panel__title">📘 Learn it first</h2>' +
      '<p class="hy-lead">Short interactive lessons. Play with the idea, then answer a few questions on it.</p>' +
      '<div class="hy-lessongrid">' + ls.map(function (l) {
        const done = S.lessonDone(l.id);
        const stage = S.lessonStage(l.id);
        const started = !done && stage > 0;
        return '<a class="hy-lessoncard' + (done ? ' is-done' : '') + '" href="#/lesson/' + encodeURIComponent(l.id) + '">' +
          '<span class="hy-lessoncard__emoji">' + (l.emoji || '📘') + '</span>' +
          '<span class="hy-lessoncard__main">' +
            '<span class="hy-lessoncard__t">' + esc(l.title) + '</span>' +
            '<span class="hy-lessoncard__m">' + (l.stages || []).length + ' screens · ~' + (l.minutes || 8) + ' min</span>' +
          '</span>' +
          '<span class="hy-lessoncard__go">' + (done ? '✓ Done' : started ? 'Continue' : 'Start') + '</span>' +
          '</a>';
      }).join('') + '</div></section>';
  }

  /* ---------------- SKILL ---------------- */

  function renderSkill(id) {
    setActive('map');
    const sk = HY.plan.skillById(id);
    if (!sk) { view.innerHTML = '<div class="hy-empty">Skill not found.</div>'; return; }
    const rec = S.rec(id), st = S.status(id), info = STATUS_LABEL[st];
    const t = HY.plan.topicById(sk.topic);

    view.innerHTML =
      '<a class="hy-back" href="#/topic/' + encodeURIComponent(sk.topic) + '">← ' + esc(t ? t.name : sk.topic) + '</a>' +
      '<div class="hy-skillhead">' +
        '<span class="hy-tag is-' + info.c + '">' + info.e + ' ' + info.t + '</span>' +
        (rec.seen ? '<span class="hy-skillhead__stat">' + rec.right + ' right · ' + rec.wrong + ' wrong · box ' + rec.box + '/5</span>' : '') +
        (rec.due ? '<span class="hy-skillhead__stat">next review ' + S.prettyDate(rec.due) + '</span>' : '') +
      '</div>' +
      HY.drill.teachHTML(sk) +
      '<div class="hy-actions hy-actions--left">' +
        '<button class="hy-btn hy-btn--primary" id="hy-prac">Practise it now</button>' +
        (rec.seen ? '<button class="hy-btn hy-btn--ghost" id="hy-reset">Start this skill again</button>' : '') +
      '</div>';
    HY.drill.speakable(view);

    document.getElementById('hy-prac').addEventListener('click', function () {
      runBlockReturning({
        id: 'skill-' + id, kind: 'drill', emoji: '🎯', title: sk.name, sub: 'Skill practice',
        skills: [id], items: 8, mins: 7
      }, function () { renderSkill(id); });
    });
    const rst = document.getElementById('hy-reset');
    if (rst) rst.addEventListener('click', function () {
      S.resetSkill(id); HY.toast('Reset. This skill is new again.'); renderSkill(id);
    });
  }

  function runBlockReturning(b, back) {
    view.innerHTML = '<div class="hy-runner" id="hy-runner"></div>';
    scrollTop();
    HY.drill.start({ host: document.getElementById('hy-runner'), block: b, onExit: function () { back(); scrollTop(); } });
  }

  /* ---------------- REPAIR ---------------- */

  function renderRepair() {
    setActive('repair');
    const weak = HY.plan.weakest(15).filter(function (w) { return w.score < 0.8; });
    const errs = S.errorBook().slice(0, 25);

    let h = '<h1 class="hy-h1">🩹 Repair shop</h1>' +
      '<p class="hy-lead">Every mistake you make lands here. Nothing is deleted until you get that skill right again — that is the deal.</p>';

    if (!weak.length) {
      h += '<div class="hy-empty">Nothing is shaky right now. Genuinely nothing. Go and do a mock paper. 🎯</div>';
    } else {
      h += '<div class="hy-actions hy-actions--left"><button class="hy-btn hy-btn--primary" id="hy-fixall">Fix the worst ' + Math.min(6, weak.length) + ' now</button></div>';
      h += '<div class="hy-skilllist">' + weak.map(function (w) { return skillRow(w.skill); }).join('') + '</div>';
    }

    if (errs.length) {
      h += '<section class="hy-panel"><h2 class="hy-panel__title">📓 Error book</h2>' +
        '<p class="hy-lead">The last things you got wrong, and what the answer should have been. Read this the night before the exam.</p>' +
        '<div class="hy-errtable">';
      errs.forEach(function (e) {
        const sk = HY.plan.skillById(e.skillId);
        h += '<div class="hy-err">' +
          '<div class="hy-err__skill">' + esc(sk ? sk.name : e.skillId) + '<span>' + S.prettyDate(e.at) + '</span></div>' +
          '<div class="hy-err__wrong">You wrote: <s>' + esc(String(e.given).slice(0, 120)) + '</s></div>' +
          '<div class="hy-err__right">Right answer: <strong>' + esc(String(e.want).slice(0, 160)) + '</strong></div>' +
          '</div>';
      });
      h += '</div></section>';
    }
    view.innerHTML = h;

    const fix = document.getElementById('hy-fixall');
    if (fix) fix.addEventListener('click', function () {
      runBlockReturning({
        id: 'repair-now', kind: 'repair', emoji: '🩹', title: 'Repair session',
        sub: 'The skills that keep slipping',
        skills: weak.slice(0, 6).map(function (w) { return w.skill.id; }),
        items: 14, mins: 12
      }, renderRepair);
    });
  }

  /* ---------------- MOCKS ---------------- */

  function renderMock() {
    setActive('mock');
    const papers = window.HY_PAPERS || [];
    const mocks = S.data().mocks || [];
    let h = '<h1 class="hy-h1">📝 Mock papers</h1>' +
      '<p class="hy-lead">Sit these like the real thing: timer on, no hints, no going back to the lesson. The point is to find the leaks while there is still time to fix them.</p>';

    if (!papers.length) h += '<div class="hy-empty">No papers loaded yet.</div>';
    else {
      h += '<div class="hy-topicgrid">';
      papers.forEach(function (p) {
        const best = mocks.filter(function (m) { return m.id === p.id; }).reduce(function (a, m) { return Math.max(a, m.pct); }, 0);
        h += '<div class="hy-topiccard hy-topiccard--paper">' +
          '<div class="hy-topiccard__emoji">' + (p.emoji || '📄') + '</div>' +
          '<h3 class="hy-topiccard__title">' + esc(p.name) + '</h3>' +
          '<p class="hy-topiccard__blurb">' + esc(p.blurb || '') + '</p>' +
          '<div class="hy-topiccard__meta">' + p.minutes + ' min · ' + p.marks + ' marks' + (best ? ' · best ' + best + '%' : '') + '</div>' +
          '<div class="hy-actions hy-actions--left">' +
            '<a class="hy-btn hy-btn--primary" href="#/exam/' + encodeURIComponent(p.id) + '">Sit it</a>' +
            (p.print ? '<a class="hy-btn hy-btn--ghost" href="' + p.print + '" target="_blank" rel="noopener">🖨️ Print version</a>' : '') +
          '</div></div>';
      });
      h += '</div>';
    }

    if (mocks.length) {
      h += '<section class="hy-panel"><h2 class="hy-panel__title">Past attempts</h2><div class="hy-errtable">';
      mocks.slice(0, 12).forEach(function (m) {
        h += '<div class="hy-err"><div class="hy-err__skill">' + esc(m.name) + '<span>' + S.prettyDate(String(m.at).slice(0, 10)) + '</span></div>' +
          '<div class="hy-err__right">' + m.marks + '/' + m.total + ' — <strong>' + m.pct + '%</strong></div></div>';
      });
      h += '</div></section>';
    }
    view.innerHTML = h;
  }

  /* ---------------- PROGRESS ---------------- */

  function renderProgress() {
    setActive('progress');
    const r = HY.plan.readiness();
    const pace = HY.plan.pace();
    const cal = HY.plan.calendar();
    const d = S.data();

    let h = '<h1 class="hy-h1">📊 Progress</h1>';
    h += '<div class="hy-progtop">' + readinessRing(r.overall, 'Exam readiness') +
      '<div class="hy-progtop__stats">' +
        '<div class="hy-stat"><span>' + r.masteredSkills + '</span>skills mastered</div>' +
        '<div class="hy-stat"><span>' + (d.totalItems || 0) + '</span>questions answered</div>' +
        '<div class="hy-stat"><span>' + (d.totalItems ? Math.round((d.totalRight / d.totalItems) * 100) : 0) + '%</span>lifetime accuracy</div>' +
        '<div class="hy-stat"><span>' + S.streakDays() + '</span>day streak</div>' +
      '</div></div>';

    h += '<div class="hy-pace ' + (pace.onTrack ? 'is-ok' : 'is-behind') + '">' +
      (pace.onTrack
        ? '✅ On track — ' + pace.actual + ' skills solid, the plan expected ' + pace.shouldBe + ' by today.'
        : '⏳ Slightly behind — ' + pace.actual + ' skills solid, the plan wanted ' + pace.shouldBe + ' by today. The daily plan has already adjusted.') +
      '</div>';

    h += '<section class="hy-panel"><h2 class="hy-panel__title">By subject</h2>';
    SUBJECTS.forEach(function (s) {
      const sd = r.bySubject[s.id];
      if (!sd) return;
      h += '<div class="hy-progrow"><div class="hy-progrow__name">' + s.emoji + ' ' + s.name + '</div>' +
        bar(sd.pct, 'is-' + s.id) + '<div class="hy-progrow__pct">' + sd.pct + '%</div></div>';
    });
    h += '</section>';

    h += '<section class="hy-panel"><h2 class="hy-panel__title">Countdown</h2><div class="hy-cal">';
    cal.forEach(function (c) {
      h += '<div class="hy-cal__day is-' + c.phase + (c.isToday ? ' is-today' : '') + (c.items ? ' is-done' : '') + '">' +
        '<span class="hy-cal__d">' + c.label + '</span>' +
        '<span class="hy-cal__m">' + (c.dMinus === 0 ? 'EXAM' : 'D-' + c.dMinus) + '</span>' +
        (c.items ? '<span class="hy-cal__q">' + c.items + 'q</span>' : '') +
        '</div>';
    });
    h += '</div><p class="hy-lead hy-lead--sm">🌱 Learn · 🔁 Drill · 🎯 Rehearse</p></section>';

    h += '<section class="hy-panel"><h2 class="hy-panel__title">Every skill</h2><div class="hy-skilllist">' +
      (window.HY_SKILLS || []).slice().sort(function (a, b) { return S.score(a.id) - S.score(b.id); })
        .map(skillRow).join('') + '</div></section>';

    h += '<section class="hy-panel"><h2 class="hy-panel__title">Backup</h2>' +
      '<p class="hy-lead">Progress lives in this browser only. Save a copy before switching device.</p>' +
      '<div class="hy-actions hy-actions--left">' +
        '<button class="hy-btn hy-btn--ghost" id="hy-export">⬇️ Save my progress</button>' +
        '<button class="hy-btn hy-btn--ghost" id="hy-import">⬆️ Load a backup</button>' +
        '<button class="hy-btn hy-btn--warn" id="hy-reset-all">Reset everything</button>' +
      '</div></section>';

    view.innerHTML = h;

    document.getElementById('hy-export').addEventListener('click', function () {
      const blob = new Blob([S.exportJSON()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'crispin-half-yearly-progress-' + S.todayKey() + '.json';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    });
    document.getElementById('hy-import').addEventListener('click', function () {
      const inp = document.createElement('input');
      inp.type = 'file'; inp.accept = 'application/json';
      inp.addEventListener('change', function () {
        const f = inp.files[0]; if (!f) return;
        const rd = new FileReader();
        rd.onload = function () {
          try {
            if (S.importJSON(rd.result)) { HY.toast('Progress restored 👍', 'good'); renderProgress(); }
            else HY.toast('That file did not look right.', 'warn');
          } catch (_) { HY.toast('Could not read that file.', 'warn'); }
        };
        rd.readAsText(f);
      });
      inp.click();
    });
    document.getElementById('hy-reset-all').addEventListener('click', function () {
      const m = HY.modal('<h3>Reset everything?</h3><p>Every skill goes back to zero. This cannot be undone.</p>' +
        '<div class="hy-actions"><button class="hy-btn hy-btn--ghost" data-close>Keep my progress</button>' +
        '<button class="hy-btn hy-btn--warn" id="hy-really">Yes, reset</button></div>');
      m.el.querySelector('#hy-really').addEventListener('click', function () { S.reset(); m.close(); renderProgress(); });
    });
  }

  /* ---------------- routing ---------------- */

  function route() {
    HY.speech.stop();
    const raw = (location.hash || '').replace(/^#\/?/, '');
    const parts = raw.split('/').filter(Boolean);
    if (parts[0] === 'map') renderMap();
    else if (parts[0] === 'topic' && parts[1]) renderTopic(decodeURIComponent(parts[1]));
    else if (parts[0] === 'skill' && parts[1]) renderSkill(decodeURIComponent(parts.slice(1).join('/')));
    else if (parts[0] === 'lesson' && parts[1]) renderLesson(decodeURIComponent(parts.slice(1).join('/')));
    else if (parts[0] === 'repair') renderRepair();
    else if (parts[0] === 'mock') renderMock();
    else if (parts[0] === 'exam' && parts[1]) HY.exam.start({
      host: view, paperId: decodeURIComponent(parts[1]),
      onExit: function () { location.hash = '#/mock'; }
    });
    else if (parts[0] === 'progress') renderProgress();
    else renderToday();
    scrollTop();
  }

  function start(hostEl) {
    host = hostEl;
    buildChrome();
    window.addEventListener('hashchange', route);
    route();
  }

  HY.app = { start: start, readinessRing: readinessRing, bar: bar, skillRow: skillRow, SUBJECTS: SUBJECTS };
})();
