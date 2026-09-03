/* ============================================================
   HALF-YEARLY HQ — configuration
   The only file you normally need to edit.

   examDate drives EVERYTHING: the countdown, the three phases,
   how many new skills appear each day, and when mock papers
   start showing up in the daily plan. If the school announces
   the real date, change it here and the whole plan re-shapes
   itself — nothing else needs touching.
   ============================================================ */
window.HY_CONFIG = {
  name: 'Crispin',
  grade: 5,
  school: 'Asian School Bahrain · CBSE',
  examDate: '2026-09-14',      // ← first paper. Mid-September 2026.
  homeHref: 'index.html',
  dailyTargetMinutes: 30
};

/* Content files append to these. Declared here so load order is safe. */
window.HY_TOPICS = window.HY_TOPICS || [];
window.HY_SKILLS = window.HY_SKILLS || [];
window.HY_PAPERS = window.HY_PAPERS || [];
