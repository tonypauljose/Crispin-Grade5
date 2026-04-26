/* ============================================================
   Crispin's World — practice-runner.js
   Shared auto-scoring for chapter Practice tabs.
   Reads .exercise blocks with .ex-item[data-answer] children.
   Multiple acceptable answers: pipe-separate them in data-answer.
   ============================================================ */
(function () {
  'use strict';
  const App = window.App;

  function normalise(s) {
    return (s || '').toString().toLowerCase().trim()
      .replace(/\s+/g, ' ')
      .replace(/,/g, '')
      .replace(/[.!?]/g, '');
  }

  // Public: window.checkEx(n) checks the n-th exercise on the page.
  window.checkEx = function (n) {
    const card = document.getElementById('ex-' + n);
    if (!card) return;
    const items = card.querySelectorAll('.ex-item');
    let correct = 0;
    items.forEach(item => {
      const expected = (item.dataset.answer || '').toLowerCase();
      const alternates = expected.split('|').map(normalise);
      const inputEl = item.querySelector('input, select');
      if (!inputEl) return;
      const given = normalise(inputEl.value);
      item.classList.remove('correct', 'wrong');
      const tolerated = given.replace(/ and /g, ' ');
      const ok = alternates.some(a => a === given || a === tolerated || a.replace(/ and /g, ' ') === tolerated);
      if (ok) {
        item.classList.add('correct');
        correct++;
      } else {
        item.classList.add('wrong');
        if (inputEl.tagName === 'INPUT') inputEl.title = 'Correct answer: ' + (alternates[0] || '');
      }
    });
    const total = items.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const fb = document.getElementById('fb-' + n);
    if (fb) {
      fb.className = 'ex-feedback show ' + (pct === 100 ? 'good' : pct >= 60 ? 'mixed' : 'bad');
      let msg = `You got ${correct} of ${total} (${pct}%).`;
      if (pct === 100) msg += ' 💯 Brilliant!';
      else if (pct >= 80) msg += ' 🌟 Great effort!';
      else if (pct >= 60) msg += ' 👍 Nice — a couple to review.';
      else msg += ' Hover the wrong boxes to see the right answer, then try again.';
      fb.innerHTML = msg;
    }
    if (pct >= 80 && App && App.launchConfetti) App.launchConfetti(40);
    if (App && App.Audio) App.Audio[pct === 100 ? 'playGoal' : pct >= 60 ? 'playCorrect' : 'playWrong']();
    if (window.Progress) window.Progress.recordPracticeComplete(pct);
  };
})();
