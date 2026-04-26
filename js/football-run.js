/* ============================================================
   Crispin's World — football-run.js
   Roblox-style obby runner. Auto-scroll right, jump (space/tap)
   over cones & defenders, slide (down) under banners, grab coins
   and footballs. 3 lives. Speed scales with score. High score
   persisted in localStorage.
   ============================================================ */
(function () {
  'use strict';
  const App = window.App;

  const HS_KEY = 'crispin_run_highscore';
  const COINS_KEY = 'crispin_run_coins';

  function loadHS() { try { return parseInt(localStorage.getItem(HS_KEY) || '0', 10); } catch (_) { return 0; } }
  function saveHS(v) { try { localStorage.setItem(HS_KEY, String(v)); } catch (_) {} }
  function loadCoins() { try { return parseInt(localStorage.getItem(COINS_KEY) || '0', 10); } catch (_) { return 0; } }
  function saveCoins(v) { try { localStorage.setItem(COINS_KEY, String(v)); } catch (_) {} }

  function FootballRun(hostId) {
    this.host = document.getElementById(hostId);
    if (!this.host) return;
    this.W = 800;
    this.H = 360;
    this.GROUND_Y = 290;
    this.player = null;
    this.obstacles = [];
    this.coins = [];
    this.particles = [];
    this.score = 0;
    this.coinsGot = 0;
    this.distance = 0;
    this.lives = 3;
    this.invuln = 0;
    this.speed = 5;
    this.scrollX = 0;
    this.gameOver = false;
    this.running = false;
    this.paused = false;
    this.lastTime = 0;
    this.spawnT = 0;
    this.coinT = 0;
    this.crowdT = 0;
    this.shake = 0;
    this.bestHS = loadHS();
    this.bestCoins = loadCoins();
    this.render();
  }

  FootballRun.prototype.render = function () {
    this.host.innerHTML = `
      <div class="run-stage">
        <div class="run-hud">
          <div class="run-hud__hearts" id="run-hearts">❤️❤️❤️</div>
          <div class="run-hud__stats">
            <span class="run-hud__score">⚽ <strong id="run-score">0</strong></span>
            <span class="run-hud__coins">🪙 <strong id="run-coins">0</strong></span>
            <span class="run-hud__dist">📏 <strong id="run-dist">0</strong>m</span>
          </div>
          <div class="run-hud__hi">🏆 Best: <strong id="run-hi">${this.bestHS}</strong></div>
        </div>
        <canvas class="run-canvas" id="run-canvas" width="${this.W}" height="${this.H}" tabindex="0"></canvas>
        <div class="run-controls">
          <button class="run-btn" id="run-jump" aria-label="Jump">⬆ Jump</button>
          <button class="run-btn" id="run-slide" aria-label="Slide">⬇ Slide</button>
        </div>
        <div class="run-overlay run-overlay--start" id="run-start">
          <div class="run-card">
            <h2>⚽ FOOTBALL RUN</h2>
            <p>Sprint through the stadium. Jump over cones &amp; defenders. Slide under banners. Grab the coins!</p>
            <ul class="run-rules">
              <li><kbd>Space</kbd> / <kbd>↑</kbd> / Tap top — JUMP</li>
              <li><kbd>↓</kbd> / Tap bottom — SLIDE</li>
              <li>3 lives. Speed grows with every 100 points.</li>
            </ul>
            <button class="run-cta" id="run-start-btn">▶ START</button>
          </div>
        </div>
        <div class="run-overlay run-overlay--end" id="run-end" style="display:none;">
          <div class="run-card">
            <h2 id="run-end-title">GAME OVER</h2>
            <div class="run-end-stats">
              <div><span>Score</span><strong id="run-end-score">0</strong></div>
              <div><span>Coins</span><strong id="run-end-coins">0</strong></div>
              <div><span>Distance</span><strong id="run-end-dist">0m</strong></div>
              <div><span>Best</span><strong id="run-end-best">0</strong></div>
            </div>
            <p id="run-end-verdict" style="margin: 14px 0 18px;"></p>
            <div style="display:flex; gap:10px; justify-content:center;">
              <button class="run-cta" id="run-restart-btn">🔄 Play again</button>
            </div>
          </div>
        </div>
      </div>
    `;
    this.canvas = document.getElementById('run-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.fitCanvas();
    window.addEventListener('resize', () => this.fitCanvas());
    this.wireControls();
    this.drawIdle();
  };

  FootballRun.prototype.fitCanvas = function () {
    // CSS handles display size; we use intrinsic 800x360 for game logic
    // but make sure the canvas remains responsive.
  };

  FootballRun.prototype.wireControls = function () {
    const start = document.getElementById('run-start-btn');
    start.addEventListener('click', () => this.startRun());
    document.getElementById('run-restart-btn').addEventListener('click', () => {
      document.getElementById('run-end').style.display = 'none';
      this.startRun();
    });

    const onKey = (e) => {
      if (!this.running) return;
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        this.jump();
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        this.slide(true);
      } else if (e.code === 'KeyP') {
        this.paused = !this.paused;
      }
    };
    const onKeyUp = (e) => {
      if (e.code === 'ArrowDown' || e.code === 'KeyS') this.slide(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKeyUp);

    // Touch/mouse on canvas — top half = jump, bottom half = slide
    const onPointer = (e) => {
      if (!this.running) return;
      const r = this.canvas.getBoundingClientRect();
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
      if (cy < r.height * 0.55) this.jump(); else this.slide(true);
    };
    const onPointerEnd = () => this.slide(false);
    this.canvas.addEventListener('mousedown', onPointer);
    this.canvas.addEventListener('mouseup', onPointerEnd);
    this.canvas.addEventListener('touchstart', (e) => { e.preventDefault(); onPointer(e); }, { passive: false });
    this.canvas.addEventListener('touchend', (e) => { e.preventDefault(); onPointerEnd(); }, { passive: false });

    // Button controls
    document.getElementById('run-jump').addEventListener('click', () => this.jump());
    const slideBtn = document.getElementById('run-slide');
    slideBtn.addEventListener('mousedown', () => this.slide(true));
    slideBtn.addEventListener('mouseup', () => this.slide(false));
    slideBtn.addEventListener('mouseleave', () => this.slide(false));
    slideBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.slide(true); }, { passive: false });
    slideBtn.addEventListener('touchend', (e) => { e.preventDefault(); this.slide(false); }, { passive: false });
  };

  FootballRun.prototype.startRun = function () {
    document.getElementById('run-start').style.display = 'none';
    document.getElementById('run-end').style.display = 'none';
    this.player = { x: 90, y: this.GROUND_Y - 50, vy: 0, w: 32, h: 50, sliding: false, onGround: true };
    this.obstacles = [];
    this.coins = [];
    this.particles = [];
    this.score = 0;
    this.coinsGot = 0;
    this.distance = 0;
    this.lives = 3;
    this.invuln = 0;
    this.speed = 5;
    this.scrollX = 0;
    this.spawnT = 60;
    this.coinT = 30;
    this.gameOver = false;
    this.running = true;
    this.lastTime = performance.now();
    this.shake = 0;
    this.updateHUD();
    this.canvas.focus();
    if (App && App.Audio) App.Audio.playWhistle();
    requestAnimationFrame((t) => this.loop(t));
  };

  FootballRun.prototype.jump = function () {
    if (!this.player || !this.running || this.paused) return;
    if (this.player.onGround && !this.player.sliding) {
      this.player.vy = -13;
      this.player.onGround = false;
      if (App && App.Audio) App.Audio.playClick();
      this.spawnDust();
    }
  };
  FootballRun.prototype.slide = function (active) {
    if (!this.player || !this.running) return;
    if (active && this.player.onGround) {
      this.player.sliding = true;
      this.player.h = 26;
      this.player.y = this.GROUND_Y - 26;
    } else if (!active) {
      if (this.player.sliding) {
        this.player.sliding = false;
        this.player.h = 50;
        this.player.y = this.GROUND_Y - 50;
      }
    }
  };

  FootballRun.prototype.spawnDust = function () {
    for (let i = 0; i < 6; i++) {
      this.particles.push({
        x: this.player.x + 16,
        y: this.player.y + this.player.h,
        vx: (Math.random() - 0.5) * 3,
        vy: -Math.random() * 2,
        life: 30,
        col: '#FBE99A'
      });
    }
  };

  FootballRun.prototype.spawnSparkle = function (x, y, col) {
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2;
      this.particles.push({
        x, y,
        vx: Math.cos(a) * (1 + Math.random() * 3),
        vy: Math.sin(a) * (1 + Math.random() * 3) - 1,
        life: 36,
        col
      });
    }
  };

  FootballRun.prototype.loop = function (t) {
    if (!this.running) return;
    const dt = Math.min(2, (t - this.lastTime) / 16.67);
    this.lastTime = t;
    if (!this.paused) {
      this.update(dt);
      this.draw();
    }
    if (!this.gameOver) requestAnimationFrame((tt) => this.loop(tt));
  };

  FootballRun.prototype.update = function (dt) {
    // Difficulty: speed grows slowly with score
    this.speed = 5 + Math.min(7, Math.floor(this.score / 80));
    this.scrollX += this.speed * dt;
    this.distance = Math.floor(this.scrollX / 8);

    // Player physics
    const p = this.player;
    p.vy += 0.7 * dt; // gravity
    p.y += p.vy * dt;
    if (p.y >= this.GROUND_Y - p.h) {
      p.y = this.GROUND_Y - p.h;
      p.vy = 0;
      p.onGround = true;
    } else {
      p.onGround = false;
    }

    // Spawn obstacles
    this.spawnT -= dt;
    if (this.spawnT <= 0) {
      this.spawnObstacle();
      // Next spawn — get faster as game progresses
      this.spawnT = 80 - Math.min(35, this.score / 6) + Math.random() * 30;
    }
    // Spawn coins
    this.coinT -= dt;
    if (this.coinT <= 0) {
      this.spawnCoinTrain();
      this.coinT = 90 + Math.random() * 60;
    }

    // Move obstacles + coins
    for (const o of this.obstacles) o.x -= this.speed * dt;
    for (const c of this.coins) c.x -= this.speed * dt;
    this.obstacles = this.obstacles.filter(o => o.x + o.w > -20);
    this.coins = this.coins.filter(c => c.x > -20);

    // Particles
    for (const pa of this.particles) {
      pa.x += pa.vx;
      pa.y += pa.vy;
      pa.vy += 0.15;
      pa.life -= 1;
    }
    this.particles = this.particles.filter(p => p.life > 0);

    // Collisions
    if (this.invuln > 0) this.invuln -= dt;
    for (const o of this.obstacles) {
      if (this.invuln > 0) break;
      if (rectHit(p, o)) {
        this.takeHit();
        break;
      }
    }
    for (let i = this.coins.length - 1; i >= 0; i--) {
      const c = this.coins[i];
      if (circleRectHit(c, p)) {
        this.coins.splice(i, 1);
        this.coinsGot += c.value || 1;
        this.score += (c.value || 1) * 5;
        this.spawnSparkle(c.x, c.y, c.col || '#FACC15');
        if (App && App.Audio) App.Audio.playCorrect();
        this.updateHUD();
      }
    }

    // Score from distance (slowly)
    if (Math.random() < 0.06 * dt) { this.score += 1; this.updateHUD(); }
    if (this.shake > 0) this.shake -= dt * 1.5;
  };

  function rectHit(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
  }
  function circleRectHit(c, r) {
    const cx = Math.max(r.x, Math.min(c.x, r.x + r.w));
    const cy = Math.max(r.y, Math.min(c.y, r.y + r.h));
    const dx = c.x - cx, dy = c.y - cy;
    return dx*dx + dy*dy <= (c.r||10)*(c.r||10);
  }

  FootballRun.prototype.spawnObstacle = function () {
    // 3 types: cone (low, jump), banner (high, slide), defender (medium, jump)
    const types = ['cone', 'banner', 'defender'];
    // Avoid back-to-back banners (slide+jump) too quickly
    const last = this.obstacles[this.obstacles.length - 1];
    let type = types[Math.floor(Math.random() * 3)];
    if (last && last.x > this.W - 220) return;
    const x = this.W + 30;
    if (type === 'cone') {
      this.obstacles.push({ type, x, y: this.GROUND_Y - 28, w: 26, h: 28 });
    } else if (type === 'defender') {
      this.obstacles.push({ type, x, y: this.GROUND_Y - 56, w: 30, h: 56 });
    } else {
      // Banner: floats above, must slide
      this.obstacles.push({ type, x, y: this.GROUND_Y - 70, w: 80, h: 24 });
    }
  };

  FootballRun.prototype.spawnCoinTrain = function () {
    const baseY = this.GROUND_Y - (Math.random() < 0.4 ? 90 : 50);
    const count = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const isFootball = Math.random() < 0.12 && i === Math.floor(count / 2);
      this.coins.push({
        x: this.W + 40 + i * 28,
        y: baseY,
        r: isFootball ? 11 : 8,
        col: isFootball ? '#FFFFFF' : '#FACC15',
        value: isFootball ? 5 : 1,
        type: isFootball ? 'ball' : 'coin'
      });
    }
  };

  FootballRun.prototype.takeHit = function () {
    this.lives -= 1;
    this.invuln = 70;
    this.shake = 14;
    if (App && App.Audio) App.Audio.playWrong();
    this.updateHUD();
    if (this.lives <= 0) this.endGame();
  };

  FootballRun.prototype.endGame = function () {
    this.running = false;
    this.gameOver = true;
    const isHi = this.score > this.bestHS;
    if (isHi) { this.bestHS = this.score; saveHS(this.bestHS); }
    saveCoins(this.bestCoins + this.coinsGot);
    this.bestCoins += this.coinsGot;

    document.getElementById('run-end').style.display = 'flex';
    document.getElementById('run-end-title').textContent = isHi ? '🏆 NEW HIGH SCORE!' : 'GAME OVER';
    document.getElementById('run-end-score').textContent = this.score;
    document.getElementById('run-end-coins').textContent = this.coinsGot;
    document.getElementById('run-end-dist').textContent = this.distance + 'm';
    document.getElementById('run-end-best').textContent = this.bestHS;
    let verdict;
    if (this.score >= 500) verdict = '⭐ Legendary run! Crispin would be proud.';
    else if (this.score >= 250) verdict = '🔥 Great running! Try to beat your best.';
    else if (this.score >= 100) verdict = '👍 Nice! Keep practising the slide.';
    else verdict = "Don't worry — Ronaldo missed too. One more go?";
    document.getElementById('run-end-verdict').textContent = verdict;

    if (App && App.launchConfetti && isHi) App.launchConfetti(120);
    if (App && App.Audio) App.Audio[isHi ? 'playGoal' : 'playMiss']();

    if (window.Progress && this.score >= 100) {
      window.Progress.addXP(Math.min(50, Math.floor(this.score / 10)), 'Football Run · ' + this.score);
    }
  };

  FootballRun.prototype.updateHUD = function () {
    document.getElementById('run-hearts').textContent = '❤️'.repeat(Math.max(0, this.lives)) + '🤍'.repeat(Math.max(0, 3 - this.lives));
    document.getElementById('run-score').textContent = this.score;
    document.getElementById('run-coins').textContent = this.coinsGot;
    document.getElementById('run-dist').textContent = this.distance;
    document.getElementById('run-hi').textContent = this.bestHS;
  };

  FootballRun.prototype.drawIdle = function () {
    // Static splash before first start
    const ctx = this.ctx;
    this.drawSky(ctx);
    this.drawCrowd(ctx, 0);
    this.drawGround(ctx, 0);
  };

  FootballRun.prototype.draw = function () {
    const ctx = this.ctx;
    ctx.save();
    if (this.shake > 0) {
      ctx.translate((Math.random() - 0.5) * this.shake, (Math.random() - 0.5) * this.shake);
    }
    this.drawSky(ctx);
    this.drawCrowd(ctx, this.scrollX * 0.2);
    this.drawStadium(ctx, this.scrollX * 0.4);
    this.drawGround(ctx, this.scrollX);
    // Coins
    for (const c of this.coins) this.drawCoin(ctx, c);
    // Obstacles
    for (const o of this.obstacles) this.drawObstacle(ctx, o);
    // Player
    this.drawPlayer(ctx);
    // Particles
    for (const p of this.particles) {
      ctx.globalAlpha = Math.max(0, p.life / 36);
      ctx.fillStyle = p.col;
      ctx.fillRect(p.x, p.y, 4, 4);
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  };

  FootballRun.prototype.drawSky = function (ctx) {
    const g = ctx.createLinearGradient(0, 0, 0, this.H);
    g.addColorStop(0, '#7C3AED');
    g.addColorStop(0.5, '#EC4899');
    g.addColorStop(1, '#FBBF24');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.W, this.H);
    // Stadium lights
    ctx.globalAlpha = 0.55;
    for (let i = 0; i < 4; i++) {
      const x = 100 + i * 200;
      const grd = ctx.createRadialGradient(x, 30, 0, x, 30, 80);
      grd.addColorStop(0, 'rgba(255,255,200,0.8)');
      grd.addColorStop(1, 'rgba(255,255,200,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(x - 80, 0, 160, 100);
    }
    ctx.globalAlpha = 1;
  };

  FootballRun.prototype.drawCrowd = function (ctx, offset) {
    ctx.fillStyle = '#1E1B4B';
    const yBase = 180;
    for (let i = -1; i < 60; i++) {
      const x = ((i * 14 - offset) % (this.W + 14) + (this.W + 14)) % (this.W + 14);
      const h = 18 + (i % 3) * 4;
      const bob = Math.sin((this.scrollX + i * 30) * 0.05) * 1.5;
      ctx.fillRect(x, yBase - h + bob, 12, h);
    }
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(0, 196, this.W, 4);
  };

  FootballRun.prototype.drawStadium = function (ctx, offset) {
    // Closer mid-bg buildings (stadium roof silhouette)
    ctx.fillStyle = '#0B0820';
    for (let i = -1; i < 8; i++) {
      const x = ((i * 130 - offset) % 800 + 800) % 800;
      ctx.beginPath();
      ctx.moveTo(x, 200);
      ctx.lineTo(x + 30, 170);
      ctx.lineTo(x + 80, 170);
      ctx.lineTo(x + 110, 200);
      ctx.closePath();
      ctx.fill();
    }
  };

  FootballRun.prototype.drawGround = function (ctx, offset) {
    // Pitch
    const y = this.GROUND_Y;
    ctx.fillStyle = '#22C55E';
    ctx.fillRect(0, y, this.W, this.H - y);
    // Stripes
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    for (let i = -1; i < 20; i++) {
      const x = ((i * 80 - offset * 0.6) % (this.W + 80) + (this.W + 80)) % (this.W + 80);
      ctx.fillRect(x, y, 40, this.H - y);
    }
    // Touchline
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(0, y - 2, this.W, 3);
  };

  FootballRun.prototype.drawPlayer = function (ctx) {
    const p = this.player;
    if (this.invuln > 0 && Math.floor(this.invuln / 4) % 2) return;

    const x = p.x, y = p.y, h = p.h, w = p.w;
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(x + w/2, this.GROUND_Y + 2, 18, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    // Legs (animated)
    const legPhase = Math.floor(this.scrollX / 5) % 2;
    ctx.fillStyle = '#1E3A8A';
    if (p.sliding) {
      // Body horizontal
      ctx.fillStyle = '#7C3AED';
      ctx.fillRect(x - 4, y, w + 12, h - 6);
      // Head at front
      ctx.fillStyle = '#D4A77A';
      ctx.beginPath();
      ctx.arc(x + w + 8, y + 8, 9, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Legs
      ctx.fillRect(x + 4, y + h - 14, 8, 14);
      ctx.fillRect(x + w - 12, y + h - 14, 8, 14);
      if (!p.onGround) {
        // Tucked legs when jumping
        ctx.fillStyle = '#1E3A8A';
        ctx.fillRect(x + 4, y + h - 18, 22, 8);
      }
      // Body (jersey)
      ctx.fillStyle = '#7C3AED';
      ctx.fillRect(x, y + 10, w, h - 24);
      // Arms
      ctx.fillStyle = '#7C3AED';
      const armSwing = Math.sin(this.scrollX * 0.2) * 4;
      ctx.fillRect(x - 4, y + 14 + armSwing, 6, 16);
      ctx.fillRect(x + w - 2, y + 14 - armSwing, 6, 16);
      // Number 7 on jersey
      ctx.fillStyle = '#FACC15';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText('7', x + 12, y + 24);
      // Head
      ctx.fillStyle = '#D4A77A';
      ctx.beginPath();
      ctx.arc(x + w/2, y + 6, 9, 0, Math.PI * 2);
      ctx.fill();
      // Hair
      ctx.fillStyle = '#1F2937';
      ctx.beginPath();
      ctx.arc(x + w/2, y + 4, 9, Math.PI, 0);
      ctx.fill();
    }
  };

  FootballRun.prototype.drawObstacle = function (ctx, o) {
    if (o.type === 'cone') {
      ctx.fillStyle = '#F97316';
      ctx.beginPath();
      ctx.moveTo(o.x + o.w/2, o.y);
      ctx.lineTo(o.x + o.w, o.y + o.h);
      ctx.lineTo(o.x, o.y + o.h);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(o.x + 4, o.y + 14, o.w - 8, 4);
      ctx.fillRect(o.x + 6, o.y + 22, o.w - 12, 3);
    } else if (o.type === 'defender') {
      // Body
      ctx.fillStyle = '#DC2626';
      ctx.fillRect(o.x, o.y + 14, o.w, o.h - 28);
      // Legs
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(o.x + 4, o.y + o.h - 14, 8, 14);
      ctx.fillRect(o.x + o.w - 12, o.y + o.h - 14, 8, 14);
      // Arms
      ctx.fillStyle = '#DC2626';
      ctx.fillRect(o.x - 4, o.y + 18, 6, 16);
      ctx.fillRect(o.x + o.w - 2, o.y + 18, 6, 16);
      // Head
      ctx.fillStyle = '#D4A77A';
      ctx.beginPath();
      ctx.arc(o.x + o.w/2, o.y + 8, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1F2937';
      ctx.beginPath();
      ctx.arc(o.x + o.w/2, o.y + 6, 8, Math.PI, 0);
      ctx.fill();
    } else if (o.type === 'banner') {
      // Banner string
      ctx.strokeStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(o.x, o.y + 5);
      ctx.lineTo(o.x, o.y - 30);
      ctx.moveTo(o.x + o.w, o.y + 5);
      ctx.lineTo(o.x + o.w, o.y - 30);
      ctx.stroke();
      // Banner body
      ctx.fillStyle = '#9333EA';
      ctx.fillRect(o.x, o.y, o.w, o.h);
      ctx.fillStyle = '#FACC15';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.fillText('SIIIUUU!', o.x + 8, o.y + 17);
    }
  };

  FootballRun.prototype.drawCoin = function (ctx, c) {
    if (c.type === 'ball') {
      // Football
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#1F2937';
      ctx.beginPath();
      ctx.moveTo(c.x, c.y - 6);
      ctx.lineTo(c.x + 5, c.y - 2);
      ctx.lineTo(c.x + 4, c.y + 4);
      ctx.lineTo(c.x - 4, c.y + 4);
      ctx.lineTo(c.x - 5, c.y - 2);
      ctx.closePath();
      ctx.fill();
    } else {
      // Spinning coin (squash via sin)
      const sx = Math.abs(Math.sin(this.scrollX * 0.06 + c.x * 0.01)) * 0.6 + 0.4;
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.scale(sx, 1);
      ctx.fillStyle = '#FACC15';
      ctx.beginPath(); ctx.arc(0, 0, c.r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#D97706';
      ctx.beginPath(); ctx.arc(0, 0, c.r * 0.6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(-1, -c.r * 0.4, 2, c.r * 0.8);
      ctx.restore();
    }
  };

  window.FootballRun = FootballRun;
})();
