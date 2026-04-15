/* ============================================================
   Crispin's World — penalty-shootout.js
   5-shot penalty shootout. Pick a corner, keeper dives, score.
   ============================================================ */

(function () {
  'use strict';
  const App = window.App;

  const REGIONS = [
    { id: 'tl', label: 'Top left',    bx: -170, by: -150 },
    { id: 'tm', label: 'Top middle',  bx:    0, by: -170 },
    { id: 'tr', label: 'Top right',   bx:  170, by: -150 },
    { id: 'bl', label: 'Bottom left', bx: -170, by:  -50 },
    { id: 'bm', label: 'Bottom mid',  bx:    0, by:  -60 },
    { id: 'br', label: 'Bottom right',bx:  170, by:  -50 }
  ];

  function PenaltyGame(hostId) {
    this.host = document.getElementById(hostId);
    this.maxShots = 5;
    this.shots = 0;
    this.goals = 0;
    this.saves = 0;
    this.locked = false;
    this.render();
  }

  PenaltyGame.prototype.render = function () {
    this.host.innerHTML = `
      <div class="pitch-stage">
        <h2 class="pitch-title">⚽ Penalty Shootout</h2>
        <p class="pitch-score">Shot <span id="ps-shot">1</span> of ${this.maxShots} · Score: <span id="ps-score">0</span></p>

        <svg viewBox="0 0 480 260" class="goal-svg" aria-label="Goal with 6 regions">
          <!-- Goal frame -->
          <rect x="40" y="30" width="400" height="170" fill="none" stroke="#FACC15" stroke-width="6" rx="4" />
          <!-- Net pattern -->
          <defs>
            <pattern id="net" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M0,0 L20,20 M20,0 L0,20" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect x="40" y="30" width="400" height="170" fill="url(#net)" />

          <!-- 6 regions -->
          <rect class="goal-region" data-reg="tl" x="45" y="35" width="130" height="80" />
          <rect class="goal-region" data-reg="tm" x="175" y="35" width="130" height="80" />
          <rect class="goal-region" data-reg="tr" x="305" y="35" width="130" height="80" />
          <rect class="goal-region" data-reg="bl" x="45" y="115" width="130" height="80" />
          <rect class="goal-region" data-reg="bm" x="175" y="115" width="130" height="80" />
          <rect class="goal-region" data-reg="br" x="305" y="115" width="130" height="80" />

          <!-- Keeper -->
          <text id="ps-keeper" class="keeper-icon" x="240" y="125" text-anchor="middle" font-size="50">🧤</text>
          <!-- Ball -->
          <text id="ps-ball" class="ball-icon" x="240" y="240" text-anchor="middle" font-size="34">⚽</text>

          <!-- Grass -->
          <rect x="0" y="200" width="480" height="60" fill="#16A34A" />
          <line x1="0" y1="200" x2="480" y2="200" stroke="#FACC15" stroke-width="2"/>
        </svg>

        <p class="pitch-score" id="ps-prompt">Pick a corner to aim at, then hit Shoot!</p>
        <div class="pitch-actions">
          <button class="btn btn-yellow btn-lg" id="ps-shoot" disabled>Shoot! ⚽</button>
          <button class="btn btn-outline" id="ps-reset" style="background:white;">🔄 Reset</button>
        </div>
        <div class="pitch-log" id="ps-log" aria-live="polite"></div>
      </div>
    `;
    this.wire();
  };

  PenaltyGame.prototype.wire = function () {
    const self = this;
    this.chosen = null;
    this.host.querySelectorAll('.goal-region').forEach(r => {
      r.addEventListener('click', () => {
        if (self.locked) return;
        self.host.querySelectorAll('.goal-region').forEach(x => {
          x.classList.remove('chosen', 'scored', 'saved');
        });
        r.classList.add('chosen');
        self.chosen = r.dataset.reg;
        document.getElementById('ps-shoot').disabled = false;
        document.getElementById('ps-prompt').textContent =
          'Aiming at ' + REGIONS.find(x => x.id === self.chosen).label + '. Shoot when ready!';
        App.Audio.playClick();
      });
    });

    document.getElementById('ps-shoot').addEventListener('click', () => self.shoot());
    document.getElementById('ps-reset').addEventListener('click', () => {
      self.shots = 0; self.goals = 0; self.saves = 0; self.chosen = null; self.locked = false;
      self.render();
    });
  };

  PenaltyGame.prototype.shoot = function () {
    if (!this.chosen || this.locked) return;
    this.locked = true;
    const self = this;
    const chosen = REGIONS.find(x => x.id === this.chosen);

    // Keeper AI: 35% chance to guess the chosen region, else random
    let keeperPick;
    if (Math.random() < 0.35) keeperPick = chosen.id;
    else keeperPick = REGIONS[Math.floor(Math.random() * REGIONS.length)].id;
    const keeperReg = REGIONS.find(x => x.id === keeperPick);

    // Animate keeper
    const keeper = document.getElementById('ps-keeper');
    keeper.classList.add('keeper-dive-' + keeperPick);

    // Animate ball
    const ball = document.getElementById('ps-ball');
    ball.style.setProperty('--bx', chosen.bx + 'px');
    ball.style.setProperty('--by', chosen.by + 'px');
    ball.classList.add('ball-shoot');

    const saved = (keeperPick === chosen.id);
    const log = document.getElementById('ps-log');

    setTimeout(() => {
      self.shots++;
      const chosenEl = self.host.querySelector(`.goal-region[data-reg="${chosen.id}"]`);
      if (saved) {
        self.saves++;
        chosenEl.classList.add('saved');
        App.Audio.playMiss();
        log.insertAdjacentHTML('afterbegin',
          `<div class="pitch-log__entry miss">Shot ${self.shots}: SAVED! Keeper dived ${keeperReg.label.toLowerCase()}.</div>`);
      } else {
        self.goals++;
        chosenEl.classList.add('scored');
        App.Audio.playGoal();
        log.insertAdjacentHTML('afterbegin',
          `<div class="pitch-log__entry goal">Shot ${self.shots}: GOAL! ⚽ Keeper went ${keeperReg.label.toLowerCase()}.</div>`);
      }
      document.getElementById('ps-score').textContent = self.goals;

      if (self.shots >= self.maxShots) {
        self.finish();
      } else {
        document.getElementById('ps-shot').textContent = self.shots + 1;
        // reset visuals for next shot
        setTimeout(() => {
          ball.classList.remove('ball-shoot');
          ball.style.transform = '';
          keeper.className = 'keeper-icon';
          document.getElementById('ps-shoot').disabled = true;
          document.getElementById('ps-prompt').textContent = 'Pick your next corner!';
          self.chosen = null;
          self.locked = false;
        }, 1200);
      }
    }, 700);
  };

  PenaltyGame.prototype.finish = function () {
    const self = this;
    const win = this.goals >= 3; // 3 out of 5 = win
    setTimeout(() => {
      const prompt = document.getElementById('ps-prompt');
      if (win) {
        prompt.innerHTML = `🏆 <strong>SIIUUU! You won ${self.goals}-${self.saves}!</strong>`;
        App.launchConfetti(100);
        App.Audio.playLevelUp();
        App.showToast('SIIIUUUU! 🏆 Penalty shootout win!', 'football');
        if (window.Progress) window.Progress.recordPenaltyWin();
      } else {
        prompt.innerHTML = `😬 <strong>You scored ${self.goals}/${self.maxShots}.</strong> Ronaldo missed 72 penalties in his career — try again!`;
        App.Audio.playMiss();
      }
      document.getElementById('ps-shoot').disabled = true;
      document.getElementById('ps-shoot').textContent = 'Game over';
    }, 900);
  };

  window.PenaltyGame = PenaltyGame;
})();
