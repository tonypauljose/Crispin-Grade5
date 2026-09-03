/* ============================================================
   HALF-YEARLY HQ — drill.js
   One practice session, run to completion.

   THE LOOP THAT MATTERS
   ---------------------
   Right answer  → short "why", next question.
   Wrong answer  → the correct answer, the reason, and the teach
                   card re-opened at the worked example. The item
                   is then pushed back into the queue three places
                   later, so he meets it again in the same session
                   while the correction is fresh.
                   It also joins the MUST-FIX list, and the session
                   will not let him finish until every must-fix
                   skill has been answered correctly at least once.

   That is the whole point of the app: you cannot walk away from a
   question you got wrong.
   ============================================================ */
(function () {
  'use strict';

  const HY = window.HY = window.HY || {};
  const S = HY.store;

  const REQUEUE_GAP = 3;        // how many other questions before a missed one returns
  const NEW_SKILL_STREAK = 3;   // clean answers in a row before a brand-new skill is "in"

  let ses = null;

  /* ---------------- item pool ---------------- */

  function skillOf(id) { return HY.plan.skillById(id); }

  /**
   * Pick n items for a skill: unseen first, then the ones he has got wrong,
   * then least-recent. Maths skills that declare a generator get roughly half
   * their questions freshly generated, so the bank can never be memorised —
   * and if the bank runs dry, generation covers the rest.
   */
  function pickItems(skillId, n, usedIds) {
    const sk = skillOf(skillId);
    if (!sk) return [];
    const bank = sk.items || [];
    const canGen = !!(sk.gen && HY.generate);
    if (!bank.length && !canGen) return [];

    if (canGen) {
      const wantGen = bank.length ? Math.max(1, Math.round(n / 2)) : n;
      const generated = HY.generate(sk, wantGen);
      const fromBank = pickFromBank(sk, bank, n - generated.length, usedIds);
      return HY.shuffle(generated.concat(fromBank)).slice(0, n);
    }
    return pickFromBank(sk, bank, n, usedIds);
  }

  function pickFromBank(sk, bank, n, usedIds) {
    if (n <= 0 || !bank.length) return [];
    const rec = S.rec(sk.id);
    const scored = bank.map(function (it) {
      const st = rec.items[it.id] || { r: 0, w: 0 };
      let pri = 0;
      if (st.r === 0 && st.w === 0) pri = 3;          // never seen — best
      else if (st.w > st.r) pri = 2;                   // he keeps missing it
      else if (st.r < 2) pri = 1;
      if (usedIds && usedIds.indexOf(it.id) >= 0) pri -= 5;   // already in this session
      return { it: it, pri: pri, r: Math.random() };
    });
    scored.sort(function (a, b) { return (b.pri - a.pri) || (a.r - b.r); });
    const out = [];
    for (let i = 0; i < scored.length && out.length < n; i++) out.push(scored[i].it);
    /* if the skill is short of items, cycle rather than stop */
    let k = 0;
    while (out.length < n && sk.items.length) { out.push(sk.items[k % sk.items.length]); k++; }
    return out;
  }

  function buildQueue(block) {
    const q = [], used = [];
    if (block.isNew || (block.skills.length === 1 && block.kind === 'learn')) {
      const sid = block.skills[0];
      pickItems(sid, block.items || 6, used).forEach(function (it) {
        used.push(it.id); q.push({ skillId: sid, item: it, tries: 0 });
      });
      /* easiest first for a first meeting */
      q.sort(function (a, b) { return (a.item.level || 2) - (b.item.level || 2); });
      return q;
    }

    /* mixed / repair: round-robin across skills so subjects interleave */
    const per = Math.max(1, Math.ceil((block.items || 10) / Math.max(1, block.skills.length)));
    const buckets = block.skills.map(function (sid) {
      return pickItems(sid, per, used).map(function (it) { used.push(it.id); return { skillId: sid, item: it, tries: 0 }; });
    });
    let guard = 0;
    while (q.length < (block.items || 10) && guard++ < 400) {
      let added = false;
      for (let i = 0; i < buckets.length && q.length < (block.items || 10); i++) {
        if (buckets[i].length) { q.push(buckets[i].shift()); added = true; }
      }
      if (!added) break;
    }
    return q;
  }

  /* ---------------- teach card ---------------- */

  function teachHTML(sk, opts) {
    opts = opts || {};
    const t = sk.teach || {};
    let h = '<div class="hy-teach' + (opts.compact ? ' hy-teach--compact' : '') + '">';
    if (!opts.compact) {
      h += '<div class="hy-teach__eyebrow">' + HY.esc(HY.plan.subjectName(sk.subject)) + ' · ' +
           HY.esc((HY.plan.topicById(sk.topic) || {}).name || sk.topic) + '</div>';
      h += '<h2 class="hy-teach__title">' + HY.esc(sk.name) + '</h2>';
      if (sk.canDo) h += '<p class="hy-teach__cando">🎯 ' + HY.esc(sk.canDo) + '</p>';
    }
    if (t.hook && !opts.compact) h += '<p class="hy-teach__hook">' + t.hook + '</p>';
    if (t.svg) h += '<div class="hy-fig">' + t.svg + '</div>';
    if (t.explain) h += '<div class="hy-teach__body">' + t.explain + '</div>';

    if (t.worked && t.worked.length) {
      h += '<div class="hy-worked"><div class="hy-worked__title">Worked example' + (t.worked.length > 1 ? 's' : '') + '</div>';
      t.worked.forEach(function (w) {
        h += '<div class="hy-worked__card">';
        h += '<div class="hy-worked__q">' + w.q + '</div>';
        if (w.svg) h += '<div class="hy-fig hy-fig--sm">' + w.svg + '</div>';
        h += '<ol class="hy-worked__steps">' + (w.steps || []).map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>';
        if (w.a) h += '<div class="hy-worked__a">Answer: <strong>' + w.a + '</strong></div>';
        h += '</div>';
      });
      h += '</div>';
    }
    if (t.remember && t.remember.length) {
      h += '<div class="hy-remember"><div class="hy-remember__title">Remember</div><ul>' +
           t.remember.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul></div>';
    }
    if (t.watchOut) h += '<div class="hy-watch"><strong>Watch out:</strong> ' + t.watchOut + '</div>';
    h += '</div>';
    return h;
  }

  /* ---------------- session ---------------- */

  function start(opts) {
    HY.speech.stop();
    ses = {
      host: opts.host,
      block: opts.block,
      onExit: opts.onExit || function () {},
      queue: buildQueue(opts.block),
      mustFix: {},              // skillId -> true until answered right
      asked: 0, right: 0, wrong: 0,
      mastered: [],
      newStreak: 0,
      startedAt: Date.now(),
      total: (opts.block.items || 10),
      taughtShown: false
    };

    if (opts.block.isNew) {
      const sk = skillOf(opts.block.skills[0]);
      if (sk) { S.markTaught(sk.id); S.noteNewSkill(sk.id); return renderTeach(sk); }
    }
    if (opts.block.kind === 'repair') return renderRepairIntro();
    next();
  }

  function renderTeach(sk) {
    ses.host.innerHTML =
      '<div class="hy-stage hy-stage--teach">' +
        teachHTML(sk) +
        '<div class="hy-actions">' +
          '<button class="hy-btn hy-btn--ghost" id="hy-back">← Not now</button>' +
          '<button class="hy-btn hy-btn--primary" id="hy-go">I understand — let me try →</button>' +
        '</div>' +
      '</div>';
    document.getElementById('hy-back').addEventListener('click', function () { finishEarly(); });
    document.getElementById('hy-go').addEventListener('click', function () { HY.sfx.tap(); next(); });
    speakable(ses.host);
  }

  function renderRepairIntro() {
    const names = ses.block.skills.map(function (id) { const s = skillOf(id); return s ? s.name : id; });
    ses.host.innerHTML =
      '<div class="hy-stage hy-stage--teach">' +
        '<div class="hy-teach"><div class="hy-teach__eyebrow">Repair shop</div>' +
        '<h2 class="hy-teach__title">🩹 Let\'s fix these</h2>' +
        '<p class="hy-teach__hook">These are the skills that keep slipping. Nothing here is hard — they just need another go. Every question you get right moves one of them out of this list.</p>' +
        '<ul class="hy-repairlist">' + names.map(function (n) { return '<li>' + HY.esc(n) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="hy-actions">' +
          '<button class="hy-btn hy-btn--ghost" id="hy-back">← Not now</button>' +
          '<button class="hy-btn hy-btn--primary" id="hy-go">Start fixing →</button>' +
        '</div>' +
      '</div>';
    document.getElementById('hy-back').addEventListener('click', function () { finishEarly(); });
    document.getElementById('hy-go').addEventListener('click', function () { HY.sfx.tap(); next(); });
  }

  function next() {
    if (!ses.queue.length) {
      /* anything still broken? top the queue back up with fresh items on those skills */
      const broken = Object.keys(ses.mustFix).filter(function (k) { return ses.mustFix[k]; });
      if (broken.length) {
        broken.forEach(function (sid) {
          pickItems(sid, 1, []).forEach(function (it) { ses.queue.push({ skillId: sid, item: it, tries: 0, isFix: true }); });
        });
      }
    }
    if (!ses.queue.length) return finish();
    renderItem(ses.queue.shift());
  }

  function progressPct() {
    const done = ses.asked;
    const est = Math.max(ses.total, done + ses.queue.length);
    return Math.min(100, Math.round((done / Math.max(1, est)) * 100));
  }

  function renderItem(entry) {
    const sk = skillOf(entry.skillId);
    const item = entry.item;
    const rec = S.rec(entry.skillId);

    ses.host.innerHTML =
      '<div class="hy-stage">' +
        '<div class="hy-qbar">' +
          '<div class="hy-qbar__fill" style="width:' + progressPct() + '%"></div>' +
        '</div>' +
        '<div class="hy-qmeta">' +
          '<span class="hy-pill hy-pill--' + sk.subject + '">' + HY.esc(HY.plan.subjectName(sk.subject)) + '</span>' +
          '<span class="hy-qmeta__skill">' + HY.esc(sk.name) + '</span>' +
          '<span class="hy-qmeta__box" title="How well you know this">' + boxDots(rec.box) + '</span>' +
        '</div>' +
        (entry.isFix || entry.tries > 0 ? '<div class="hy-again">🔁 Second look — you missed one like this</div>' : '') +
        '<div class="hy-q">' + item.q + '</div>' +
        (item.svg ? '<div class="hy-fig">' + item.svg + '</div>' : '') +
        '<div class="hy-body" id="hy-body"></div>' +
        '<div class="hy-fb" id="hy-fb"></div>' +
        '<div class="hy-actions" id="hy-actions">' +
          (item.hint ? '<button class="hy-btn hy-btn--ghost" id="hy-hint">💡 Hint</button>' : '') +
          '<button class="hy-btn hy-btn--primary" id="hy-check">Check</button>' +
        '</div>' +
      '</div>';

    const body = document.getElementById('hy-body');
    const ctrl = HY.items.render(item, body);
    const fb = document.getElementById('hy-fb');
    const checkBtn = document.getElementById('hy-check');
    speakable(ses.host);

    if (ctrl.onEnter) ctrl.onEnter(function () { doCheck(); });
    setTimeout(function () { ctrl.focus(); }, 60);

    const hintBtn = document.getElementById('hy-hint');
    if (hintBtn) hintBtn.addEventListener('click', function () {
      hintBtn.disabled = true;
      fb.className = 'hy-fb is-hint';
      fb.innerHTML = '💡 ' + item.hint;
    });

    /* staged (steps) and self-marked types drive their own completion */
    if (ctrl.mode === 'staged') {
      checkBtn.textContent = 'Finish this problem';
      checkBtn.disabled = true;
      ctrl.onDone(function () { checkBtn.disabled = false; checkBtn.classList.add('hy-btn--pulse'); });
    }
    if (ctrl.mode === 'self') {
      checkBtn.textContent = 'Continue';
      ctrl.onMarked(function () { checkBtn.classList.add('hy-btn--pulse'); });
    }

    function doCheck() {
      if (!ctrl.ready()) {
        if (ctrl.mode === 'self') { HY.toast('Look at the model answer, then mark yourself honestly.', 'warn'); ctrl.reveal(); }
        else HY.toast('Give it a go first — a guess is better than nothing.', 'warn');
        return;
      }
      const res = ctrl.check();
      settle(entry, sk, item, res, fb);
    }
    checkBtn.addEventListener('click', doCheck);
  }

  function boxDots(box) {
    let h = '';
    for (let i = 1; i <= 5; i++) h += '<i class="hy-dot' + (i <= box ? ' is-on' : '') + '"></i>';
    return h;
  }

  function settle(entry, sk, item, res, fb) {
    ses.asked++;
    const out = S.answer(sk.id, item.id, res.correct, res.given, res.want);

    const actions = document.getElementById('hy-actions');
    actions.innerHTML = '';

    if (res.correct) {
      ses.right++;
      ses.newStreak++;
      if (ses.mustFix[sk.id]) delete ses.mustFix[sk.id];
      HY.sfx.ok();
      fb.className = 'hy-fb is-good';
      fb.innerHTML = '<div class="hy-fb__head">✅ ' + praise() + '</div>' +
        (item.explain ? '<div class="hy-fb__why">' + item.explain + '</div>' : '');
      if (out.justMastered) {
        ses.mastered.push(sk.id);
        HY.confetti(70); HY.sfx.badge();
        fb.innerHTML += '<div class="hy-fb__mastered">🏆 <strong>' + HY.esc(sk.name) + '</strong> is now <strong>mastered</strong> — you got it right on a later day too, so it has really stuck.</div>';
        S.bridgeXP(25, 'Mastered: ' + sk.name);
      } else {
        S.bridgeXP(3, 'Correct answer');
      }
    } else {
      ses.wrong++;
      ses.newStreak = 0;
      ses.mustFix[sk.id] = true;
      HY.sfx.no();
      fb.className = 'hy-fb is-bad';
      fb.innerHTML =
        '<div class="hy-fb__head">Not this time — and that is useful. Look:</div>' +
        '<div class="hy-fb__ans">The answer is <strong>' + HY.esc(String(res.want)) + '</strong></div>' +
        (item.explain ? '<div class="hy-fb__why">' + item.explain + '</div>' : '') +
        '<button class="hy-btn hy-btn--ghost hy-btn--sm" id="hy-reteach">📖 Show me the rule again</button>' +
        '<div class="hy-reteach hidden" id="hy-reteach-box"></div>';

      const rt = document.getElementById('hy-reteach');
      const box = document.getElementById('hy-reteach-box');
      rt.addEventListener('click', function () {
        box.classList.toggle('hidden');
        if (box.innerHTML === '') box.innerHTML = teachHTML(sk, { compact: true });
        rt.textContent = box.classList.contains('hidden') ? '📖 Show me the rule again' : '📖 Hide the rule';
        speakable(box);
      });
      /* auto-open on a repeat miss — he clearly needs it */
      if (entry.tries >= 1) rt.click();

      /* back into the queue, a few questions later */
      const again = { skillId: sk.id, item: nextVariant(sk.id, item), tries: entry.tries + 1 };
      const at = Math.min(ses.queue.length, REQUEUE_GAP);
      ses.queue.splice(at, 0, again);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'hy-btn hy-btn--primary';
    nextBtn.textContent = ses.queue.length ? 'Next →' : 'Finish';
    nextBtn.addEventListener('click', function () { HY.sfx.tap(); next(); });
    actions.appendChild(nextBtn);
    setTimeout(function () { try { nextBtn.focus(); } catch (_) {} }, 40);

    /* a brand-new skill is "in" once he strings together clean answers */
    if (ses.block.isNew && ses.newStreak >= NEW_SKILL_STREAK && ses.queue.length > 2) {
      ses.queue = ses.queue.slice(0, 1);
    }
  }

  /** A different item on the same skill, so the retry is not pure recall of one question. */
  function nextVariant(skillId, avoid) {
    const picks = pickItems(skillId, 3, [avoid.id]);
    for (let i = 0; i < picks.length; i++) if (picks[i].id !== avoid.id) return picks[i];
    return avoid;
  }

  const PRAISE = ['Yes!', 'Exactly right.', 'Spot on.', 'That is it.', 'Correct.', 'Nailed it.', 'Good thinking.', 'Clean.'];
  function praise() { return PRAISE[Math.floor(Math.random() * PRAISE.length)]; }

  /* ---------------- finish ---------------- */

  function finishEarly() { HY.speech.stop(); ses.onExit(); }

  function finish() {
    const mins = Math.max(1, Math.round((Date.now() - ses.startedAt) / 60000));
    S.addMinutes(mins);
    const pct = ses.asked ? Math.round((ses.right / ses.asked) * 100) : 0;
    S.bridgeXP(10 + Math.round(pct / 10), 'Practice session');

    let line;
    if (pct === 100 && ses.asked >= 5) line = 'A perfect run. That is exam standard.';
    else if (pct >= 80) line = 'Strong session. The bits you missed have gone into the repair list.';
    else if (pct >= 55) line = 'Good work — you fixed things as you went, which is the whole point.';
    else line = 'This one was hard, and you stayed with it. That is how it starts to stick.';

    const masteredHTML = ses.mastered.length
      ? '<div class="hy-done__mastered">🏆 Mastered today: ' +
        ses.mastered.map(function (id) { const s = skillOf(id); return '<strong>' + HY.esc(s ? s.name : id) + '</strong>'; }).join(', ') +
        '</div>'
      : '';

    if (pct >= 80) { HY.confetti(90); HY.sfx.win(); } else { HY.sfx.ok(); }

    ses.host.innerHTML =
      '<div class="hy-stage hy-done">' +
        '<div class="hy-done__ring">' + ring(pct) + '</div>' +
        '<h2 class="hy-done__title">' + ses.right + ' out of ' + ses.asked + '</h2>' +
        '<p class="hy-done__line">' + line + '</p>' +
        masteredHTML +
        '<div class="hy-done__stats">' +
          '<div><span>' + ses.asked + '</span>questions</div>' +
          '<div><span>' + ses.wrong + '</span>fixed</div>' +
          '<div><span>' + mins + '</span>minutes</div>' +
        '</div>' +
        '<div class="hy-actions">' +
          '<button class="hy-btn hy-btn--primary" id="hy-done-back">Back to today\'s plan →</button>' +
        '</div>' +
      '</div>';
    document.getElementById('hy-done-back').addEventListener('click', function () { ses.onExit(); });
  }

  function ring(pct) {
    const C = 2 * Math.PI * 52, off = C * (1 - pct / 100);
    return '<svg viewBox="0 0 120 120" class="hy-ring" role="img"><title>' + pct + ' percent</title>' +
      '<circle class="hy-ring__bg" cx="60" cy="60" r="52" fill="none" stroke-width="10"/>' +
      '<circle class="hy-ring__fg" cx="60" cy="60" r="52" fill="none" stroke-width="10" stroke-linecap="round" ' +
      'stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 60 60)"/>' +
      '<text class="hy-ring__t" x="60" y="68" text-anchor="middle">' + pct + '%</text></svg>';
  }

  /* Attach 🔊 buttons to anything marked data-say (Hindi lines mostly). */
  function speakable(root) {
    root.querySelectorAll('[data-say]').forEach(function (n) {
      if (n.dataset.wired) return;
      n.dataset.wired = '1';
      n.addEventListener('click', function () { HY.speech.say(n.dataset.say || n.textContent, n.dataset.lang || 'hi-IN'); });
    });
  }

  HY.drill = {
    start: start,
    teachHTML: teachHTML,
    pickItems: pickItems,
    speakable: speakable,
    ring: ring
  };
})();
