/* ============================================================
   Crispin's World — penalty-shootout.js (v2)
   Engaging penalty shootout with aim-and-charge mechanics.

   How to play:
   - Move your mouse/finger over the goal → crosshair tracks
   - Click & HOLD to charge power (meter fills; sweet spot = amber)
   - Release to shoot; ball flies toward the crosshair with physics
   - Keeper reads your aim and dives (reaction time shrinks by round)
   - 5-round match: score 3+ to win. Streaks multiply XP.
   ============================================================ */

(function () {
  'use strict';
  const App = window.App;

  // Goal geometry (SVG user coords)
  const GOAL = { x: 80, y: 40, w: 340, h: 170 };
  const MAX_ROUNDS = 5;

  function PenaltyGame(hostId) {
    this.host = document.getElementById(hostId);
    this.reset();
    this.render();
  }

  PenaltyGame.prototype.reset = function () {
    this.round = 1;
    this.goals = 0;
    this.saves = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.finished = false;
    this.aim = { x: 250, y: 125 };
    this.power = 0;
    this.charging = false;
    this.chargeStart = 0;
    this.locked = false;
    this.keeperX = 250;  // midpoint
    this.keeperY = 135;
    this.crowdGain = 0;
  };

  PenaltyGame.prototype.render = function () {
    this.host.innerHTML = `
      <div class="pitch-stage pitch-stage--big">
        <div class="pitch-scoreboard">
          <div class="sb-cell"><div class="sb-label">Round</div><div class="sb-val" id="ps-round">1 / ${MAX_ROUNDS}</div></div>
          <div class="sb-cell"><div class="sb-label">Goals</div><div class="sb-val sb-val--big" id="ps-goals">0</div></div>
          <div class="sb-cell"><div class="sb-label">Saves</div><div class="sb-val" id="ps-saves">0</div></div>
          <div class="sb-cell"><div class="sb-label">Streak</div><div class="sb-val" id="ps-streak">🔥 0</div></div>
        </div>

        <div class="pitch-playfield">
          <svg viewBox="0 0 500 300" class="goal-svg goal-svg--v2" id="ps-svg" aria-label="Penalty shootout goal — move cursor to aim, click and hold to charge, release to shoot">
            <defs>
              <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#1E3A8A"/>
                <stop offset="60%" stop-color="#7C3AED"/>
                <stop offset="100%" stop-color="#0B1F3D"/>
              </linearGradient>
              <linearGradient id="grass" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#22C55E"/>
                <stop offset="100%" stop-color="#14532D"/>
              </linearGradient>
              <pattern id="net2" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                <path d="M0,0 L12,12 M12,0 L0,12" stroke="rgba(255,255,255,0.35)" stroke-width="0.8"/>
              </pattern>
              <radialGradient id="spotLight" cx="50%" cy="0%" r="60%">
                <stop offset="0%" stop-color="rgba(255,255,255,0.28)"/>
                <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
              </radialGradient>
              <radialGradient id="ballGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="100%" stop-color="#D1D5DB"/>
              </radialGradient>
            </defs>

            <!-- Sky / stadium -->
            <rect width="500" height="300" fill="url(#sky)"/>
            <rect width="500" height="80" fill="url(#spotLight)"/>

            <!-- Stadium crowd silhouettes (animated) -->
            <g id="ps-crowd" opacity="0.7">
              ${generateCrowd()}
            </g>

            <!-- Pitch -->
            <rect y="210" width="500" height="90" fill="url(#grass)"/>
            <line x1="0" y1="212" x2="500" y2="212" stroke="#FACC15" stroke-width="1.5" opacity="0.6"/>

            <!-- Penalty area arc -->
            <path d="M 130 210 Q 250 250 370 210" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.6"/>
            <line x1="250" y1="220" x2="250" y2="260" stroke="#FFFFFF" stroke-width="1.5" opacity="0.5"/>

            <!-- Goal posts -->
            <rect x="${GOAL.x - 6}" y="${GOAL.y - 6}" width="6" height="${GOAL.h + 12}" fill="#FAFAF9"/>
            <rect x="${GOAL.x + GOAL.w}" y="${GOAL.y - 6}" width="6" height="${GOAL.h + 12}" fill="#FAFAF9"/>
            <rect x="${GOAL.x - 6}" y="${GOAL.y - 6}" width="${GOAL.w + 12}" height="6" fill="#FAFAF9"/>

            <!-- Net -->
            <rect x="${GOAL.x}" y="${GOAL.y}" width="${GOAL.w}" height="${GOAL.h}" fill="url(#net2)"/>
            <rect id="ps-netflash" x="${GOAL.x}" y="${GOAL.y}" width="${GOAL.w}" height="${GOAL.h}" fill="#FACC15" opacity="0"/>

            <!-- Keeper -->
            <g id="ps-keeper-wrap">
              <!-- Body -->
              <ellipse id="ps-keeper-shadow" cx="250" cy="250" rx="22" ry="4" fill="rgba(0,0,0,0.35)"/>
              <g id="ps-keeper" transform="translate(250,135)">
                <!-- Legs -->
                <rect x="-10" y="30" width="8" height="40" fill="#1E40AF" rx="3"/>
                <rect x="2" y="30" width="8" height="40" fill="#1E40AF" rx="3"/>
                <!-- Body / shirt -->
                <ellipse cx="0" cy="12" rx="22" ry="28" fill="#FB923C"/>
                <path d="M -22 8 L 0 -12 L 22 8 L 18 20 L -18 20 Z" fill="#EA580C"/>
                <!-- Arms -->
                <rect id="ps-arm-l" x="-32" y="-4" width="12" height="30" fill="#FB923C" rx="5"/>
                <rect id="ps-arm-r" x="20" y="-4" width="12" height="30" fill="#FB923C" rx="5"/>
                <!-- Gloves -->
                <circle id="ps-glove-l" cx="-26" cy="28" r="7" fill="#FDE047"/>
                <circle id="ps-glove-r" cx="26" cy="28" r="7" fill="#FDE047"/>
                <!-- Head -->
                <circle cx="0" cy="-18" r="11" fill="#D4A77A"/>
                <path d="M -10 -22 Q 0 -30 10 -22 L 8 -18 Q 0 -22 -8 -18 Z" fill="#1F2937"/>
                <circle cx="-3" cy="-18" r="1.5" fill="#1F2937"/>
                <circle cx="3" cy="-18" r="1.5" fill="#1F2937"/>
              </g>
            </g>

            <!-- Ball -->
            <g id="ps-ball-wrap">
              <ellipse cx="250" cy="280" rx="10" ry="2.5" fill="rgba(0,0,0,0.35)" id="ps-ball-shadow"/>
              <g id="ps-ball" transform="translate(250, 272)">
                <circle r="10" fill="url(#ballGrad)" stroke="#1F2937" stroke-width="1.2"/>
                <polygon points="0,-6 6,-2 4,4 -4,4 -6,-2" fill="#1F2937"/>
              </g>
            </g>

            <!-- Crosshair (hidden until interaction) -->
            <g id="ps-crosshair" style="display:none; pointer-events:none;">
              <circle cx="0" cy="0" r="22" fill="none" stroke="#FACC15" stroke-width="2" opacity="0.9"/>
              <circle cx="0" cy="0" r="12" fill="none" stroke="#FACC15" stroke-width="1.5" opacity="0.6"/>
              <line x1="-30" y1="0" x2="-14" y2="0" stroke="#FACC15" stroke-width="2"/>
              <line x1="14" y1="0" x2="30" y2="0" stroke="#FACC15" stroke-width="2"/>
              <line x1="0" y1="-30" x2="0" y2="-14" stroke="#FACC15" stroke-width="2"/>
              <line x1="0" y1="14" x2="0" y2="30" stroke="#FACC15" stroke-width="2"/>
            </g>

            <!-- Trajectory preview (while charging) -->
            <path id="ps-preview" d="" stroke="#FACC15" stroke-width="2" stroke-dasharray="4 4" fill="none" opacity="0"/>
          </svg>

          <!-- Power meter -->
          <div class="power-wrap">
            <div class="power-label">
              <span>⚡ POWER</span>
              <span id="ps-power-txt" class="muted">Hold to charge</span>
            </div>
            <div class="power-meter">
              <div class="power-zone power-zone--low"></div>
              <div class="power-zone power-zone--sweet"></div>
              <div class="power-zone power-zone--high"></div>
              <div class="power-zone power-zone--wild"></div>
              <div class="power-fill" id="ps-power-fill"></div>
              <div class="power-marker" id="ps-power-marker"></div>
            </div>
            <div class="power-hint muted">Sweet spot: amber zone. Too much = ball flies over!</div>
          </div>
        </div>

        <div class="pitch-message" id="ps-msg">Round 1 · Pick a corner, click &amp; hold to charge, release to shoot! ⚽</div>

        <div class="pitch-actions">
          <button class="btn btn-outline" id="ps-reset" style="background:white;">🔄 New match</button>
          <button class="btn btn-yellow btn-sm hidden" id="ps-next">Next round →</button>
        </div>

        <div class="pitch-log" id="ps-log" aria-live="polite"></div>
      </div>
    `;
    this.wire();
  };

  function generateCrowd() {
    // 3 rows of stylised fan silhouettes, animated via CSS class
    const rows = [];
    for (let r = 0; r < 3; r++) {
      const y = 145 + r * 18;
      const cells = [];
      for (let x = 0; x < 20; x++) {
        const cx = 10 + x * 25 + (r % 2 === 0 ? 0 : 12);
        const hue = (x * 37 + r * 83) % 360;
        const col = r === 0 ? '#6B21A8' : r === 1 ? '#4C1D95' : '#1E1B4B';
        cells.push(`<circle cx="${cx}" cy="${y}" r="6" fill="${col}" class="crowd-dot"/>`);
      }
      rows.push(cells.join(''));
    }
    return rows.join('');
  }

  // ============================================================
  // Wire interactions
  // ============================================================
  PenaltyGame.prototype.wire = function () {
    const self = this;
    const svg = document.getElementById('ps-svg');
    const crosshair = document.getElementById('ps-crosshair');

    const getSvgPoint = (clientX, clientY) => {
      const pt = svg.createSVGPoint();
      pt.x = clientX; pt.y = clientY;
      const m = svg.getScreenCTM();
      if (!m) return { x: 250, y: 125 };
      const ip = pt.matrixTransform(m.inverse());
      return { x: ip.x, y: ip.y };
    };

    const clampToGoal = (p) => ({
      x: Math.max(GOAL.x + 10, Math.min(GOAL.x + GOAL.w - 10, p.x)),
      y: Math.max(GOAL.y + 10, Math.min(GOAL.y + GOAL.h - 10, p.y))
    });

    const updateAim = (clientX, clientY) => {
      if (self.locked || self.finished) return;
      const p = clampToGoal(getSvgPoint(clientX, clientY));
      self.aim = p;
      crosshair.setAttribute('transform', `translate(${p.x}, ${p.y})`);
      crosshair.style.display = 'block';
      self.updatePreview();
      // Keeper "watches" cursor — drifts slightly toward aim
      if (!self.charging) {
        const drift = (p.x - self.keeperX) * 0.06;
        self.keeperX = Math.max(140, Math.min(360, self.keeperX + drift));
        document.getElementById('ps-keeper').setAttribute('transform', `translate(${self.keeperX}, 135)`);
      }
    };

    svg.addEventListener('mousemove', (e) => updateAim(e.clientX, e.clientY));
    svg.addEventListener('touchmove', (e) => {
      if (e.touches[0]) { e.preventDefault(); updateAim(e.touches[0].clientX, e.touches[0].clientY); }
    }, { passive: false });
    svg.addEventListener('mouseleave', () => { if (!self.charging) crosshair.style.display = 'none'; });

    const startCharge = (e) => {
      if (self.locked || self.finished) return;
      if (e.cancelable) e.preventDefault();
      self.charging = true;
      self.chargeStart = performance.now();
      self.animatePower();
      document.getElementById('ps-msg').textContent = 'Charging… release to shoot!';
    };
    const endCharge = () => {
      if (!self.charging || self.locked) return;
      self.charging = false;
      self.shoot();
    };
    svg.addEventListener('mousedown', startCharge);
    svg.addEventListener('touchstart', (e) => {
      if (e.touches[0]) updateAim(e.touches[0].clientX, e.touches[0].clientY);
      startCharge(e);
    }, { passive: false });
    window.addEventListener('mouseup', endCharge);
    window.addEventListener('touchend', endCharge);

    document.getElementById('ps-reset').addEventListener('click', () => { self.reset(); self.render(); });
    document.getElementById('ps-next').addEventListener('click', () => self.nextRound());
  };

  // ============================================================
  // Power animation loop (while charging)
  // ============================================================
  PenaltyGame.prototype.animatePower = function () {
    if (!this.charging) return;
    const elapsed = performance.now() - this.chargeStart;
    // Power fills fully in ~900ms, then overshoots into "wild"
    let p = Math.min(100, (elapsed / 900) * 100);
    this.power = p;
    const fill = document.getElementById('ps-power-fill');
    const marker = document.getElementById('ps-power-marker');
    const txt = document.getElementById('ps-power-txt');
    if (fill) fill.style.width = p + '%';
    if (marker) marker.style.left = p + '%';
    if (txt) {
      if (p < 30) txt.textContent = 'Too weak…';
      else if (p < 55) txt.textContent = 'Getting there';
      else if (p < 80) txt.textContent = '✨ Sweet spot!';
      else if (p < 95) txt.textContent = '⚠️ Risky';
      else txt.textContent = '🔥 WILD!';
    }
    this.updatePreview();
    requestAnimationFrame(() => this.animatePower());
  };

  PenaltyGame.prototype.updatePreview = function () {
    const preview = document.getElementById('ps-preview');
    if (!preview) return;
    if (!this.charging) { preview.setAttribute('opacity', 0); return; }
    // Curve from ball to aim, with curvature based on power
    const bx = 250, by = 272;
    const ax = this.aim.x, ay = this.aim.y;
    const midX = (bx + ax) / 2;
    const midY = (by + ay) / 2 - 40 - (this.power / 100) * 10;
    preview.setAttribute('d', `M ${bx},${by} Q ${midX},${midY} ${ax},${ay}`);
    preview.setAttribute('opacity', '0.7');
  };

  // ============================================================
  // Shoot & resolve
  // ============================================================
  PenaltyGame.prototype.shoot = function () {
    if (this.locked) return;
    this.locked = true;
    const pow = this.power;
    const self = this;

    // Keeper reaction: harder each round (dive earlier, more accurately)
    const roundDifficulty = {
      1: { reactMs: 520, skillChance: 0.30 },
      2: { reactMs: 440, skillChance: 0.40 },
      3: { reactMs: 360, skillChance: 0.52 },
      4: { reactMs: 280, skillChance: 0.62 },
      5: { reactMs: 220, skillChance: 0.72 }
    }[this.round] || { reactMs: 260, skillChance: 0.7 };

    // Determine outcome
    // Wild power: ball goes over
    let outcome = 'goal'; // 'goal' | 'save' | 'over' | 'wide'
    if (pow >= 95) {
      outcome = 'over';
    } else if (pow < 25) {
      outcome = 'save'; // too weak — keeper catches easily
    } else {
      // Keeper dives toward aim if "skill chance" succeeds
      const reads = Math.random() < roundDifficulty.skillChance;
      if (reads) {
        outcome = 'save';
      } else {
        outcome = 'goal';
      }
    }

    // Power sweet-spot bonus: between 55-80 reduces keeper effectiveness by 40%
    if (pow >= 55 && pow <= 80 && outcome === 'save' && Math.random() < 0.4) outcome = 'goal';
    // Corner-of-goal bonus (aim near corners): harder for keeper
    const distFromCenter = Math.abs(this.aim.x - 250);
    if (distFromCenter > 100 && outcome === 'save' && Math.random() < 0.3) outcome = 'goal';

    // Keeper dive animation
    setTimeout(() => self.keeperDive(outcome), 80);

    // Ball flight
    this.animateBall(outcome, roundDifficulty.reactMs);
  };

  PenaltyGame.prototype.keeperDive = function (outcome) {
    const keeper = document.getElementById('ps-keeper');
    if (!keeper) return;
    // Where does keeper dive? Toward aim if saving; else wrong direction.
    const dir = outcome === 'save'
      ? (this.aim.x < 250 ? 'left' : this.aim.x > 250 ? 'right' : 'center')
      : (this.aim.x < 250 ? 'right' : 'left');
    const targetX = dir === 'left' ? 180 : dir === 'right' ? 320 : 250;
    const rotate = dir === 'left' ? -40 : dir === 'right' ? 40 : 0;
    keeper.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.5, 1)';
    keeper.setAttribute('transform', `translate(${targetX}, ${dir === 'center' ? 120 : 150}) rotate(${rotate})`);
    this.keeperX = targetX;
  };

  PenaltyGame.prototype.animateBall = function (outcome, keeperReactMs) {
    const ball = document.getElementById('ps-ball');
    const netflash = document.getElementById('ps-netflash');
    const self = this;

    // Destination
    let destX = this.aim.x;
    let destY = this.aim.y;
    if (outcome === 'over') {
      destY = 10; // above crossbar
      destX = this.aim.x + (Math.random() - 0.5) * 60;
    } else if (outcome === 'wide') {
      destX = this.aim.x + (this.aim.x < 250 ? -80 : 80);
      destY = this.aim.y;
    }

    ball.style.transition = 'transform 0.5s cubic-bezier(0.35, 0.05, 0.5, 1)';
    ball.setAttribute('transform', `translate(${destX}, ${destY}) scale(0.6)`);

    setTimeout(() => self.resolve(outcome), 520);

    if (outcome === 'goal') {
      setTimeout(() => {
        netflash.style.transition = 'opacity 0.1s';
        netflash.setAttribute('opacity', '0.5');
        setTimeout(() => {
          netflash.style.transition = 'opacity 0.4s';
          netflash.setAttribute('opacity', '0');
        }, 100);
      }, 500);
    }
  };

  PenaltyGame.prototype.resolve = function (outcome) {
    const log = document.getElementById('ps-log');
    const msg = document.getElementById('ps-msg');
    const aim = this.aim;
    const cornerBonus = Math.abs(aim.x - 250) > 100 && (aim.y < 80 || aim.y > 170);

    if (outcome === 'goal') {
      this.goals++;
      this.streak++;
      this.bestStreak = Math.max(this.bestStreak, this.streak);
      App.Audio.playGoal();
      const text = cornerBonus ? '🎯 TOP CORNER! SIIUUU!' : '⚽ GOAL! SIIUUU!';
      msg.innerHTML = `<strong class="text-yellow">${text}</strong>`;
      log.insertAdjacentHTML('afterbegin', `<div class="pitch-log__entry goal">R${this.round}: ${text}${this.streak >= 2 ? ' · streak x' + this.streak : ''}</div>`);
      App.launchConfetti(this.streak >= 3 ? 80 : 40);
      if (cornerBonus) App.showToast('🎯 Top-corner finish!', 'football', 2000);
    } else if (outcome === 'save') {
      this.saves++;
      this.streak = 0;
      App.Audio.playMiss();
      msg.innerHTML = `<strong class="text-coral">🧤 SAVED! Keeper guessed it.</strong>`;
      log.insertAdjacentHTML('afterbegin', `<div class="pitch-log__entry miss">R${this.round}: Saved by the keeper.</div>`);
    } else if (outcome === 'over') {
      this.saves++;
      this.streak = 0;
      App.Audio.playMiss();
      msg.innerHTML = `<strong class="text-coral">🚀 Over the bar! Too much power.</strong>`;
      log.insertAdjacentHTML('afterbegin', `<div class="pitch-log__entry miss">R${this.round}: Blasted over the bar!</div>`);
    } else {
      this.saves++;
      this.streak = 0;
      App.Audio.playMiss();
      msg.innerHTML = `<strong class="text-coral">📐 Wide of the post!</strong>`;
      log.insertAdjacentHTML('afterbegin', `<div class="pitch-log__entry miss">R${this.round}: Wide!</div>`);
    }

    this.updateScoreboard();

    if (this.round >= MAX_ROUNDS) {
      setTimeout(() => this.finishMatch(), 1100);
    } else {
      document.getElementById('ps-next').classList.remove('hidden');
    }
  };

  PenaltyGame.prototype.updateScoreboard = function () {
    document.getElementById('ps-goals').textContent = this.goals;
    document.getElementById('ps-saves').textContent = this.saves;
    document.getElementById('ps-round').textContent = `${this.round} / ${MAX_ROUNDS}`;
    document.getElementById('ps-streak').textContent = '🔥 ' + this.streak;
  };

  PenaltyGame.prototype.nextRound = function () {
    this.round++;
    this.locked = false;
    this.power = 0;
    this.charging = false;
    this.keeperX = 250;
    this.keeperY = 135;
    const keeper = document.getElementById('ps-keeper');
    if (keeper) {
      keeper.style.transition = 'transform 0.4s';
      keeper.setAttribute('transform', `translate(250, 135)`);
    }
    const ball = document.getElementById('ps-ball');
    if (ball) {
      ball.style.transition = 'transform 0.3s';
      ball.setAttribute('transform', `translate(250, 272)`);
    }
    document.getElementById('ps-preview').setAttribute('opacity', '0');
    document.getElementById('ps-power-fill').style.width = '0%';
    document.getElementById('ps-power-marker').style.left = '0%';
    document.getElementById('ps-next').classList.add('hidden');
    this.updateScoreboard();
    document.getElementById('ps-msg').textContent = `Round ${this.round}: keeper is faster now! Pick your moment. ⚡`;
  };

  PenaltyGame.prototype.finishMatch = function () {
    this.finished = true;
    const win = this.goals >= 3;
    const msg = document.getElementById('ps-msg');
    document.getElementById('ps-next').classList.add('hidden');

    if (win) {
      msg.innerHTML = `🏆 <strong class="text-yellow">WIN! ${this.goals}-${this.saves} · best streak x${this.bestStreak}</strong>`;
      App.launchConfetti(140);
      App.Audio.playLevelUp();
      App.showToast('SIIIUUUU! 🏆 Penalty shootout won!', 'football');
      if (window.Progress) {
        window.Progress.recordPenaltyWin();
        if (this.bestStreak >= 3) window.Progress.addXP(15, 'Hat-trick of goals!');
        if (this.goals === 5) window.Progress.addXP(30, 'Perfect 5/5 match!');
      }
    } else {
      msg.innerHTML = `😬 <strong>Final: ${this.goals}-${this.saves}.</strong> Ronaldo missed 72 penalties in his career. Try again!`;
      App.Audio.playMiss();
    }
  };

  window.PenaltyGame = PenaltyGame;
})();
