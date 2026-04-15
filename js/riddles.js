/* ============================================================
   Crispin's World — riddles.js
   Daily riddle picker (seeded by date) + archive renderer
   ============================================================ */

(function () {
  'use strict';
  const App = window.App;

  function daily() {
    const list = window.RIDDLES || [];
    if (!list.length) return null;
    const seed = App.todayKey();
    const rand = App.seededRand(seed);
    return list[Math.floor(rand() * list.length)];
  }

  function renderDaily(container) {
    if (!container) return;
    const r = daily();
    if (!r) { container.innerHTML = '<p class="muted">No riddles loaded.</p>'; return; }
    container.innerHTML = `
      <div class="riddle-card" id="daily-riddle">
        <div class="riddle-inner">
          <div class="riddle-face riddle-face--q">
            <span class="riddle-category">${r.category.toUpperCase()}</span>
            <h3>🧠 Today's Riddle</h3>
            <p>${r.q}</p>
            <p class="riddle-tap">👆 Tap to reveal</p>
          </div>
          <div class="riddle-face riddle-face--a">
            <span class="riddle-category">ANSWER</span>
            <h3>💡 Answer</h3>
            <p><strong>${r.a}</strong></p>
            ${r.hint ? `<p class="riddle-tap">Hint was: ${r.hint}</p>` : ''}
          </div>
        </div>
      </div>
    `;
    const card = container.querySelector('.riddle-card');
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      App.Audio.playClick();
    });
  }

  function renderArchive(container) {
    if (!container) return;
    const list = window.RIDDLES || [];
    const categories = ['all', ...new Set(list.map(r => r.category))];
    let currentFilter = 'all';

    const filterHtml = categories.map(c =>
      `<button class="btn btn-outline btn-sm" data-cat="${c}">${c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}</button>`
    ).join('');

    container.innerHTML = `
      <div class="riddle-filter">${filterHtml}</div>
      <div class="grid grid-2" id="riddle-grid"></div>
    `;

    function renderGrid() {
      const grid = document.getElementById('riddle-grid');
      const filtered = currentFilter === 'all' ? list : list.filter(r => r.category === currentFilter);
      grid.innerHTML = filtered.map((r, i) => `
        <div class="riddle-card" data-ri="${i}">
          <div class="riddle-inner">
            <div class="riddle-face riddle-face--q">
              <span class="riddle-category">${r.category.toUpperCase()}</span>
              <h3>Riddle ${i + 1}</h3>
              <p>${r.q}</p>
              <p class="riddle-tap">👆 Tap to reveal</p>
            </div>
            <div class="riddle-face riddle-face--a">
              <span class="riddle-category">ANSWER</span>
              <h3>💡 Answer</h3>
              <p><strong>${r.a}</strong></p>
              ${r.hint ? `<p class="riddle-tap">Hint: ${r.hint}</p>` : ''}
            </div>
          </div>
        </div>
      `).join('');
      grid.querySelectorAll('.riddle-card').forEach(card => {
        card.addEventListener('click', () => {
          card.classList.toggle('flipped');
          App.Audio.playClick();
        });
      });
    }

    container.querySelectorAll('.riddle-filter .btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.cat;
        container.querySelectorAll('.riddle-filter .btn').forEach(b => b.classList.remove('btn-primary'));
        btn.classList.add('btn-primary');
        renderGrid();
      });
    });
    renderGrid();
  }

  window.Riddles = { renderDaily, renderArchive };
})();
