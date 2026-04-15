/* ============================================================
   Crispin's World — quiz-engine.js
   Reusable runner: MCQ / TF / fill-blank / compare
   Handles Explorer / Adventurer / Champion tiers.
   ============================================================ */

(function () {
  'use strict';
  const App = window.App;

  function QuizEngine(opts) {
    this.containerId = opts.containerId;
    this.chapter = opts.chapter; // e.g. 'ch01'
    this.tier = opts.tier;
    this.bank = opts.bank || [];
    this.count = Math.min(opts.count || this.bank.length, this.bank.length);
    this.onDone = opts.onDone;
    this.container = document.getElementById(this.containerId);
    this.qs = App.shuffle(this.bank).slice(0, this.count);
    this.idx = 0;
    this.correct = 0;
    this.started = Date.now();
    this.hintShown = false;
  }

  QuizEngine.prototype.start = function () {
    if (!this.container) return;
    this.render();
  };

  QuizEngine.prototype.render = function () {
    if (this.idx >= this.qs.length) return this.showResult();
    const q = this.qs[this.idx];
    const pct = Math.round((this.idx / this.qs.length) * 100);
    const tierLabel = this.tier.charAt(0).toUpperCase() + this.tier.slice(1);
    this.container.innerHTML = `
      <div class="qz-stage">
        <div class="qz-progress"><div class="qz-progress__fill" style="width:${pct}%"></div></div>
        <div class="qz-meta">
          <span>${tierLabel} · Question ${this.idx + 1} of ${this.qs.length}</span>
          <span>Score: ${this.correct}</span>
        </div>
        <div class="qz-question">${q.q}</div>
        <div class="qz-body" id="qz-body"></div>
        <div class="qz-feedback" id="qz-feedback"></div>
        <div class="qz-actions">
          <button class="btn btn-outline btn-sm" id="qz-hint" ${q.hint ? '' : 'disabled'}>💡 Hint</button>
          <button class="btn btn-primary" id="qz-submit">Submit</button>
          <button class="btn btn-teal hidden" id="qz-next">Next →</button>
        </div>
      </div>
    `;
    this.hintShown = false;
    const body = document.getElementById('qz-body');
    if (q.type === 'mcq' || q.type === 'compare') {
      this.renderMCQ(body, q);
    } else if (q.type === 'tf') {
      this.renderTF(body, q);
    } else if (q.type === 'fill') {
      this.renderFill(body, q);
    }

    const self = this;
    document.getElementById('qz-submit').addEventListener('click', () => self.submit());
    document.getElementById('qz-next').addEventListener('click', () => { self.idx++; self.render(); });
    const hintBtn = document.getElementById('qz-hint');
    if (hintBtn) hintBtn.addEventListener('click', () => self.showHint());
  };

  QuizEngine.prototype.renderMCQ = function (body, q) {
    body.className = 'qz-options';
    body.innerHTML = q.options.map((opt, i) =>
      `<button class="qz-option" data-i="${i}">${opt}</button>`
    ).join('');
    body.querySelectorAll('.qz-option').forEach(btn => {
      btn.addEventListener('click', function () {
        body.querySelectorAll('.qz-option').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        App.Audio.playClick();
      });
    });
  };
  QuizEngine.prototype.renderTF = function (body, q) {
    body.className = 'qz-options';
    body.innerHTML = `
      <button class="qz-option" data-i="0">✅ True</button>
      <button class="qz-option" data-i="1">❌ False</button>
    `;
    body.querySelectorAll('.qz-option').forEach(btn => {
      btn.addEventListener('click', function () {
        body.querySelectorAll('.qz-option').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        App.Audio.playClick();
      });
    });
  };
  QuizEngine.prototype.renderFill = function (body, q) {
    body.className = '';
    body.innerHTML = `<input class="qz-fill-input" id="qz-fill" placeholder="Your answer" autocomplete="off" />`;
    const input = document.getElementById('qz-fill');
    input.focus();
    const self = this;
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') self.submit(); });
  };

  QuizEngine.prototype.showHint = function () {
    const q = this.qs[this.idx];
    if (!q.hint || this.hintShown) return;
    this.hintShown = true;
    const fb = document.getElementById('qz-feedback');
    fb.className = 'qz-feedback show';
    fb.style.background = '#FEF3C7';
    fb.style.color = '#92400E';
    fb.innerHTML = `💡 <strong>Hint:</strong> ${q.hint}`;
  };

  QuizEngine.prototype.submit = function () {
    const q = this.qs[this.idx];
    let answer, isCorrect = false;
    const fb = document.getElementById('qz-feedback');

    if (q.type === 'mcq' || q.type === 'compare' || q.type === 'tf') {
      const sel = document.querySelector('.qz-option.selected');
      if (!sel) { App.showToast('Pick an answer first!', 'warn'); return; }
      answer = parseInt(sel.dataset.i, 10);
      isCorrect = (answer === q.answer);
      document.querySelectorAll('.qz-option').forEach((el, i) => {
        el.disabled = true;
        if (i === q.answer) el.classList.add('correct');
        else if (i === answer && !isCorrect) el.classList.add('wrong');
      });
    } else if (q.type === 'fill') {
      const input = document.getElementById('qz-fill');
      answer = (input.value || '').trim();
      if (!answer) { App.showToast('Type your answer first!', 'warn'); return; }
      const normalised = answer.toLowerCase().replace(/\s+/g, ' ').replace(/,/g, '');
      const acceptable = Array.isArray(q.answer) ? q.answer : [q.answer];
      isCorrect = acceptable.some(a => {
        const clean = String(a).toLowerCase().replace(/\s+/g, ' ').replace(/,/g, '');
        return clean === normalised;
      });
      input.disabled = true;
    }

    fb.className = 'qz-feedback show ' + (isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      this.correct++;
      App.Audio.playCorrect();
      fb.innerHTML = `✅ <strong>Correct!</strong> ${q.explain || ''}`;
    } else {
      App.Audio.playWrong();
      const correctText = q.type === 'fill'
        ? (Array.isArray(q.answer) ? q.answer[0] : q.answer)
        : q.options ? q.options[q.answer] : (q.answer === 0 ? 'True' : 'False');
      fb.innerHTML = `❌ <strong>Not quite.</strong> Correct answer: <strong>${correctText}</strong>. ${q.explain || ''}`;
    }

    document.getElementById('qz-submit').classList.add('hidden');
    document.getElementById('qz-next').classList.remove('hidden');
    const hintBtn = document.getElementById('qz-hint');
    if (hintBtn) hintBtn.classList.add('hidden');
  };

  QuizEngine.prototype.showResult = function () {
    const total = this.qs.length;
    const pct = total ? Math.round((this.correct / total) * 100) : 0;
    const timeTaken = Math.round((Date.now() - this.started) / 1000);
    const stars = pct >= 90 ? '⭐⭐⭐' : pct >= 70 ? '⭐⭐' : pct >= 40 ? '⭐' : '✨';
    const tierLabel = this.tier.charAt(0).toUpperCase() + this.tier.slice(1);

    let msg;
    if (pct === 100) msg = "SIIIUUU! Perfect score! 🎯⚽";
    else if (pct >= 80) msg = "Superb! You're on fire 🔥";
    else if (pct >= 60) msg = "Good job! Keep practising.";
    else if (pct >= 40) msg = "Nice try! Review the lesson and give it another shot.";
    else msg = "Don't worry — Ronaldo practises every day too!";

    this.container.innerHTML = `
      <div class="qz-stage qz-result">
        <div class="qz-result__stars">${stars}</div>
        <div class="qz-result__score">${this.correct} / ${total} <span style="font-size:1.2rem;">(${pct}%)</span></div>
        <p class="qz-result__xp">${tierLabel} tier · ${timeTaken}s</p>
        <p>${msg}</p>
        <div class="qz-actions" style="justify-content:center; margin-top:24px;">
          <button class="btn btn-primary" id="qz-retry">Try again 🔄</button>
          <button class="btn btn-outline" id="qz-exit">Back to tiers</button>
        </div>
      </div>
    `;

    if (pct >= 70) App.launchConfetti(80);
    if (pct === 100) App.Audio.playGoal();
    else App.Audio.playLevelUp();

    if (window.Progress) {
      window.Progress.recordQuiz({ chapter: this.chapter, tier: this.tier, percent: pct, timeTaken });
    }
    const self = this;
    document.getElementById('qz-retry').addEventListener('click', () => {
      const q = new QuizEngine({
        containerId: self.containerId, chapter: self.chapter, tier: self.tier,
        bank: self.bank, count: self.count, onDone: self.onDone
      });
      q.start();
    });
    document.getElementById('qz-exit').addEventListener('click', () => {
      if (self.onDone) self.onDone(pct);
    });
  };

  window.QuizEngine = QuizEngine;
})();
