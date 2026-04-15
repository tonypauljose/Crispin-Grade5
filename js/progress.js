/* ============================================================
   Crispin's World — progress.js
   Gamification engine: 8 levels, 21 hybrid badges (football +
   learning), XP, streaks. Persists to localStorage.
   ============================================================ */

(function () {
  'use strict';

  const STORE_KEY = 'crispin_progress_v1';
  const App = window.App || {};

  const LEVELS = [
    { min: 0,    name: 'Beginner',    emoji: '🌱' },
    { min: 100,  name: 'Explorer',    emoji: '🔍' },
    { min: 300,  name: 'Learner',     emoji: '📚' },
    { min: 700,  name: 'Adventurer',  emoji: '🧗' },
    { min: 1400, name: 'Scholar',     emoji: '🎓' },
    { min: 2300, name: 'Master',      emoji: '🏆' },
    { min: 3300, name: 'Champion',    emoji: '👑' },
    { min: 4500, name: 'Legend',      emoji: '⚡' }
  ];

  const BADGES = [
    // -------- Learning badges (13) --------
    { id: 'first-steps',    name: 'First Steps',     emoji: '👣', desc: 'Opened your first lesson' },
    { id: 'practice-star',  name: 'Practice Star',   emoji: '⭐', desc: 'Completed your first practice exercise' },
    { id: 'perfectionist',  name: 'Perfectionist',   emoji: '💯', desc: 'Scored 100% on a practice exercise' },
    { id: 'speed-demon',    name: 'Speed Demon',     emoji: '⚡', desc: 'Finished a quiz in record time' },
    { id: 'quiz-master',    name: 'Quiz Master',     emoji: '🎯', desc: 'Passed an Explorer quiz' },
    { id: 'streak-star',    name: 'Streak Star',     emoji: '🔥', desc: '3-day learning streak' },
    { id: 'streak-legend',  name: 'Streak Legend',   emoji: '🌟', desc: '7-day learning streak' },
    { id: 'comeback-kid',   name: 'Comeback Kid',    emoji: '💪', desc: 'Returned after a break' },
    { id: 'early-bird',     name: 'Early Bird',      emoji: '🌅', desc: 'Learned before 8 AM Bahrain time' },
    { id: 'night-owl',      name: 'Night Owl',       emoji: '🦉', desc: 'Learned after 9 PM Bahrain time' },
    { id: 'roman-legion',   name: 'Roman Legion',    emoji: '🏛️', desc: 'Mastered Roman numerals' },
    { id: 'chapter-closer', name: 'Chapter Closer',  emoji: '📕', desc: 'Completed all sections of a chapter' },
    { id: 'lakh-master',    name: 'Lakh Master',     emoji: '🔢', desc: 'Conquered Indian place-value system (later chapters)' },

    // -------- Football badges (8) --------
    { id: 'hat-trick',      name: 'Hat-trick Hero',  emoji: '🎩', desc: 'Three perfect quizzes in a row' },
    { id: 'free-kick',      name: 'Free-kick Master',emoji: '🎯', desc: 'Speed bonus on a quiz' },
    { id: 'golden-boot',    name: 'Golden Boot',     emoji: '🥇', desc: 'Earned 500 XP in a single week' },
    { id: 'siuuu',          name: 'SIUUU',           emoji: '⚽', desc: 'First penalty-shootout win' },
    { id: 'captains-arm',   name: "Captain's Armband", emoji: '🎖️', desc: '7-day streak while keeping 90%+ accuracy' },
    { id: 'champions-lg',   name: 'Champions League',emoji: '🏆', desc: 'Completed Champion tier of a chapter' },
    { id: 'ballon-dor',     name: "Ballon d'Or",     emoji: '🏅', desc: 'Reached Legend level' },
    { id: 'stadium-fan',    name: 'Stadium Fan',     emoji: '🏟️', desc: 'Visited the portal 10+ days' }
  ];

  function defaultState() {
    return {
      xp: 0,
      badges: [],
      streak: { count: 0, lastDay: null },
      daysVisited: [],
      quizRecords: {},     // {ch01-explorer: {best: 85, attempts: 3}}
      chapterState: {},    // {ch01: {learnOpened: true, practiceCount: 3, ...}}
      perfectQuizStreak: 0,
      penaltyWins: 0,
      xpThisWeek: { week: '', total: 0 }
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return Object.assign(defaultState(), parsed);
    } catch (_) { return defaultState(); }
  }
  function save(state) {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }

  const state = load();

  function levelInfo(xp) {
    let idx = 0;
    for (let i = 0; i < LEVELS.length; i++) {
      if (xp >= LEVELS[i].min) idx = i;
    }
    const curr = LEVELS[idx];
    const next = LEVELS[idx + 1];
    const progress = next ? (xp - curr.min) / (next.min - curr.min) : 1;
    return { idx, curr, next, progress: Math.min(1, Math.max(0, progress)) };
  }

  function renderGamebar() {
    let bar = document.querySelector('.gamebar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'gamebar';
      const topbar = document.querySelector('.topbar');
      if (topbar && topbar.nextSibling) topbar.parentNode.insertBefore(bar, topbar.nextSibling);
      else document.body.appendChild(bar);
    }
    const li = levelInfo(state.xp);
    const pct = Math.round(li.progress * 100);
    const nextTxt = li.next ? `${state.xp} / ${li.next.min} XP` : `${state.xp} XP (MAX)`;
    bar.innerHTML = `
      <div class="gamebar__level" title="Level ${li.idx + 1}: ${li.curr.name}">
        <span class="gamebar__level-badge">${li.curr.emoji}</span>
        <span>${li.curr.name}</span>
      </div>
      <div class="gamebar__xp">
        <div class="gamebar__xp-bar"><div class="gamebar__xp-fill" style="width:${pct}%"></div></div>
        <div class="gamebar__xp-text">${nextTxt}</div>
      </div>
      <div class="gamebar__streak" title="Learning streak">
        <span>🔥</span><span>${state.streak.count} day${state.streak.count === 1 ? '' : 's'}</span>
      </div>
      <div class="gamebar__badges" title="Badges earned">
        <span>🏅</span><span>${state.badges.length}/${BADGES.length}</span>
      </div>
    `;
    document.body.classList.add('with-gamebar');
    const pageEl = document.querySelector('.page');
    if (pageEl) pageEl.classList.add('with-gamebar');
  }

  function showLevelUpModal(newLevel) {
    const html = `
      <h2 class="modal__title">🎉 LEVEL UP!</h2>
      <div class="modal__body" style="text-align:center;">
        <div style="font-size:4rem;">${newLevel.emoji}</div>
        <div class="big-level">${newLevel.name}</div>
        <p>You've reached <strong>${newLevel.name}</strong>! Keep it up, champion.</p>
      </div>
      <div class="modal__footer">
        <button class="btn btn-yellow" data-close>Let's go! ⚽</button>
      </div>
    `;
    App.openModal(html, { cls: 'modal--levelup' });
    App.launchConfetti(120);
    App.Audio.playLevelUp();
  }

  function showBadgeModal(badge) {
    const html = `
      <h2 class="modal__title">🏅 New Badge!</h2>
      <div class="modal__body" style="text-align:center;">
        <span class="badge-emoji">${badge.emoji}</span>
        <h3 style="color:var(--purple); margin:var(--space-2) 0;">${badge.name}</h3>
        <p>${badge.desc}</p>
      </div>
      <div class="modal__footer">
        <button class="btn btn-primary" data-close>Awesome!</button>
      </div>
    `;
    App.openModal(html, { cls: 'modal--badge' });
    App.launchConfetti(60);
    App.Audio.playBadge();
  }

  function earnBadge(id) {
    if (state.badges.includes(id)) return false;
    const badge = BADGES.find(b => b.id === id);
    if (!badge) return false;
    state.badges.push(id);
    save(state);
    renderGamebar();
    showBadgeModal(badge);
    return true;
  }

  function weekKey() {
    const d = new Date();
    const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    return d.getFullYear() + '-W' + week;
  }

  function addXP(amount, reason) {
    if (!amount) return;
    const prevLevel = levelInfo(state.xp).idx;
    state.xp += amount;
    // weekly xp tracker
    const wk = weekKey();
    if (state.xpThisWeek.week !== wk) state.xpThisWeek = { week: wk, total: 0 };
    state.xpThisWeek.total += amount;
    if (state.xpThisWeek.total >= 500) earnBadge('golden-boot');
    save(state);
    if (reason) App.showToast(`+${amount} XP · ${reason}`, 'success', 2200);
    const newLevel = levelInfo(state.xp).idx;
    renderGamebar();
    if (newLevel > prevLevel) {
      showLevelUpModal(LEVELS[newLevel]);
      if (LEVELS[newLevel].name === 'Legend') earnBadge('ballon-dor');
    }
    checkTimeBadges();
  }

  function checkTimeBadges() {
    const hourStr = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Bahrain', hour: '2-digit', hour12: false
    }).format(new Date());
    const h = parseInt(hourStr, 10);
    if (h < 8) earnBadge('early-bird');
    if (h >= 21) earnBadge('night-owl');
  }

  function markVisit() {
    const today = App.todayKey();
    if (state.streak.lastDay === today) return;
    const yesterday = (() => {
      const d = new Date(); d.setDate(d.getDate() - 1);
      return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bahrain' }).format(d);
    })();
    if (state.streak.lastDay === yesterday) {
      state.streak.count += 1;
    } else if (state.streak.lastDay && state.streak.lastDay !== today) {
      // missed a day → reset, award Comeback Kid if returning after >=2d
      const lastDate = new Date(state.streak.lastDay);
      const diffDays = Math.floor((new Date(today) - lastDate) / 86400000);
      if (diffDays >= 2) earnBadge('comeback-kid');
      state.streak.count = 1;
    } else {
      state.streak.count = 1;
    }
    state.streak.lastDay = today;
    if (!state.daysVisited.includes(today)) state.daysVisited.push(today);
    if (state.daysVisited.length >= 10) earnBadge('stadium-fan');
    if (state.streak.count >= 3) earnBadge('streak-star');
    if (state.streak.count >= 7) earnBadge('streak-legend');
    save(state);
    addXP(10, 'Daily visit bonus');
    checkTimeBadges();
  }

  function recordQuiz({ chapter, tier, percent, timeTaken }) {
    const key = chapter + '-' + tier;
    const prev = state.quizRecords[key] || { best: 0, attempts: 0 };
    prev.attempts += 1;
    prev.best = Math.max(prev.best, percent);
    state.quizRecords[key] = prev;

    let xp = 20;
    if (percent >= 50) xp = 30;
    if (percent >= 70) xp = 45;
    if (percent >= 90) xp = 60;
    addXP(xp, `${tier.charAt(0).toUpperCase() + tier.slice(1)} quiz · ${percent}%`);
    earnBadge('quiz-master');

    if (percent === 100) {
      state.perfectQuizStreak = (state.perfectQuizStreak || 0) + 1;
      if (state.perfectQuizStreak >= 3) earnBadge('hat-trick');
    } else {
      state.perfectQuizStreak = 0;
    }
    if (timeTaken && timeTaken < 90 && percent >= 80) earnBadge('free-kick');
    if (percent >= 70 && tier === 'explorer') App.showToast("🎉 Adventurer tier unlocked!", 'football');
    if (percent >= 80 && tier === 'adventurer') App.showToast("👑 Champion tier unlocked!", 'football');
    if (tier === 'champion' && percent >= 80) earnBadge('champions-lg');

    // Captain's Armband: 7-day streak + 90%+ accuracy
    if (state.streak.count >= 7 && percent >= 90) earnBadge('captains-arm');

    save(state);
  }

  function tierUnlocked(chapter, tier) {
    if (tier === 'explorer') return true;
    const recExpl = state.quizRecords[chapter + '-explorer'];
    const recAdv = state.quizRecords[chapter + '-adventurer'];
    if (tier === 'adventurer') return !!recExpl && recExpl.best >= 70;
    if (tier === 'champion') return !!recAdv && recAdv.best >= 80;
    return false;
  }

  function recordPracticeComplete(percent) {
    earnBadge('practice-star');
    if (percent === 100) earnBadge('perfectionist');
    const xp = percent === 100 ? 45 : percent >= 70 ? 25 : 15;
    addXP(xp, `Practice · ${percent}%`);
  }

  function recordPenaltyWin() {
    state.penaltyWins += 1;
    save(state);
    earnBadge('siuuu');
    addXP(25, 'Penalty shootout win ⚽');
  }

  function recordRoman() { earnBadge('roman-legion'); }

  function recordChapterComplete(chapter) {
    state.chapterState[chapter] = state.chapterState[chapter] || {};
    state.chapterState[chapter].complete = true;
    save(state);
    earnBadge('chapter-closer');
  }

  function renderBadgeGrid(container) {
    if (!container) return;
    container.innerHTML = BADGES.map(b => {
      const earned = state.badges.includes(b.id);
      return `
        <div class="badge-chip ${earned ? '' : 'locked'}" title="${b.desc}">
          <div class="badge-chip__emoji">${b.emoji}</div>
          <div class="badge-chip__name">${b.name}</div>
          <div class="badge-chip__desc">${earned ? '✓ Earned' : b.desc}</div>
        </div>
      `;
    }).join('');
  }

  function getStats() {
    return {
      xp: state.xp,
      level: levelInfo(state.xp),
      badges: state.badges.length,
      totalBadges: BADGES.length,
      streak: state.streak.count,
      days: state.daysVisited.length,
      quizRecords: state.quizRecords,
      penaltyWins: state.penaltyWins
    };
  }

  function showProgressModal() {
    const s = getStats();
    const html = `
      <h2 class="modal__title">📊 My Progress</h2>
      <div class="modal__body">
        <div class="stats-strip" style="margin-bottom:16px;">
          <div class="stat"><div class="stat__value">${s.xp}</div><div class="stat__label">Total XP</div></div>
          <div class="stat"><div class="stat__value">${s.level.curr.emoji}</div><div class="stat__label">${s.level.curr.name}</div></div>
          <div class="stat"><div class="stat__value">${s.badges}/${s.totalBadges}</div><div class="stat__label">Badges</div></div>
          <div class="stat"><div class="stat__value">🔥 ${s.streak}</div><div class="stat__label">Streak</div></div>
        </div>
        <h3 style="margin-bottom:8px;">Badges</h3>
        <div class="badge-grid" id="modal-badge-grid"></div>
      </div>
      <div class="modal__footer">
        <button class="btn btn-primary" data-close>Close</button>
      </div>
    `;
    App.openModal(html, { cls: '' });
    renderBadgeGrid(document.getElementById('modal-badge-grid'));
  }

  // ==== Public API ====
  window.Progress = {
    LEVELS, BADGES,
    state,
    renderGamebar,
    addXP,
    markVisit,
    recordQuiz,
    recordPracticeComplete,
    recordPenaltyWin,
    recordRoman,
    recordChapterComplete,
    tierUnlocked,
    earnBadge,
    renderBadgeGrid,
    getStats,
    levelInfo: () => levelInfo(state.xp),
    showProgressModal
  };
})();
