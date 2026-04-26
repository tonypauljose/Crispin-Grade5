/* ============================================================
   Crispin's World — practice-runner.js
   Shared auto-scoring for chapter Practice tabs.

   Usage: every .ex-item carries data-answer="canonical|alt|alt2".
   Multiple acceptable answers are pipe-separated.

   Matching rules (lenient, in this order):
   1. Exact normalised match (lowercase, trimmed, commas stripped,
      'and'/'the' stripped, multi-spaces collapsed).
   2. Numeric multiplier expansion: '4 thousand', '4 thousands',
      '4 thousand ones' all become '4000'. Same for hundred/ten.
   3. Numeric tolerance: '4,000' == '4000', '0.5' == '.5'.

   When wrong, the correct answer is shown INLINE under the input
   so kids actually see it (not hidden in a tooltip).
   ============================================================ */
(function () {
  'use strict';
  const App = window.App;

  function normalise(s) {
    return (s || '').toString().toLowerCase().trim()
      .replace(/[,]/g, '')           // strip thousands commas
      .replace(/[.!?]+$/g, '')       // strip terminal punctuation
      .replace(/\bthe\b/g, '')       // ignore leading 'the'
      .replace(/\band\b/g, '')       // ignore 'and'
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Convert "N thousand[s]", "N hundred[s]", "N ten[s]" into the integer.
  // Also handles trailing words like "ones" / "place" being ignored.
  function expandPlaceValue(s) {
    if (!s) return s;
    let v = s
      .replace(/\bones\b/g, '')
      .replace(/\bplace\b/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    // "4 thousand", "4 thousands"
    let m;
    if ((m = /^(\d+)\s*thousand[s]?$/.exec(v))) return String(parseInt(m[1], 10) * 1000);
    if ((m = /^(\d+)\s*hundred[s]?$/.exec(v))) return String(parseInt(m[1], 10) * 100);
    if ((m = /^(\d+)\s*ten[s]?$/.exec(v))) return String(parseInt(m[1], 10) * 10);
    return v;
  }

  // Numeric equality if both sides parse to the same finite number.
  function numericMatch(a, b) {
    const na = Number(a), nb = Number(b);
    if (!isFinite(na) || !isFinite(nb)) return false;
    return Math.abs(na - nb) < 1e-9;
  }

  function isMatch(given, expectedRaw) {
    const expected = normalise(expectedRaw);
    if (given === expected) return true;
    // Try numeric tolerance on raw normalised forms
    if (numericMatch(given, expected)) return true;
    // Try place-value expansion on the user's input
    const expanded = expandPlaceValue(given);
    if (expanded === expected) return true;
    if (numericMatch(expanded, expected)) return true;
    // And on the expected (in case data-answer uses words)
    const expandedExpected = expandPlaceValue(expected);
    if (given === expandedExpected) return true;
    if (numericMatch(given, expandedExpected)) return true;
    return false;
  }

  // Public: window.checkEx(n) checks the n-th exercise on the page.
  window.checkEx = function (n) {
    const card = document.getElementById('ex-' + n);
    if (!card) return;
    const items = card.querySelectorAll('.ex-item');
    let correct = 0;
    items.forEach(item => {
      const raw = item.dataset.answer || '';
      const alternates = raw.split('|').map(a => a.trim()).filter(Boolean);
      const inputEl = item.querySelector('input, select');
      if (!inputEl) return;
      const given = normalise(inputEl.value);
      item.classList.remove('correct', 'wrong');

      // Remove any previous reveal
      const prev = item.querySelector('.ex-item__correct');
      if (prev) prev.remove();

      const ok = alternates.some(a => isMatch(given, a));
      if (ok) {
        item.classList.add('correct');
        correct++;
      } else {
        item.classList.add('wrong');
        // Show correct answer INLINE — kids actually see it
        const reveal = document.createElement('div');
        reveal.className = 'ex-item__correct';
        const display = (alternates[0] || '').replace(/\|/g, ' or ');
        reveal.innerHTML = '✓ Correct answer: <strong>' + display + '</strong>';
        item.appendChild(reveal);
        if (inputEl.tagName === 'INPUT') inputEl.title = 'Correct: ' + display;
      }
    });
    const total = items.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const fb = document.getElementById('fb-' + n);
    if (fb) {
      fb.className = 'ex-feedback show ' + (pct === 100 ? 'good' : pct >= 60 ? 'mixed' : 'bad');
      let msg = 'You got <strong>' + correct + ' of ' + total + '</strong> (' + pct + '%).';
      if (pct === 100) msg += ' 💯 Brilliant!';
      else if (pct >= 80) msg += ' 🌟 Great effort — fix the few in red and try again.';
      else if (pct >= 60) msg += ' 👍 Nice — review the wrong ones (correct answers shown).';
      else msg += ' Don\'t worry! Read the correct answers below each box and try once more.';
      fb.innerHTML = msg;
    }
    if (pct >= 80 && App && App.launchConfetti) App.launchConfetti(40);
    if (App && App.Audio) App.Audio[pct === 100 ? 'playGoal' : pct >= 60 ? 'playCorrect' : 'playWrong']();
    if (window.Progress) window.Progress.recordPracticeComplete(pct);
  };
})();
