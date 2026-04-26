/* ============================================================
   Crispin's World — exam-engine.js
   30-minute timed exam mode. Picks N questions from a bank,
   runs them with a countdown clock, no skipping back, locks
   the page until done, then emails the results to a parent
   via FormSubmit.co (free, no signup required).

   FormSubmit setup:
   - First submission triggers a confirmation email to the
     PARENT_EMAIL address. The parent must click the link
     once. From then on every submission is delivered silently.
   - To change the parent address, edit PARENT_EMAIL below.
   ============================================================ */
(function () {
  'use strict';
  const App = window.App;

  const PARENT_EMAIL = 'marytreesajose@gmail.com';
  const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/' + PARENT_EMAIL;
  const DEFAULT_DURATION_SEC = 30 * 60;
  const DEFAULT_QUESTION_COUNT = 25;

  function ExamEngine(opts) {
    this.host = document.getElementById(opts.containerId);
    this.subject = opts.subject || 'Maths';
    this.chapter = opts.chapter || 'Unknown';
    this.chapterTitle = opts.chapterTitle || opts.chapter;
    this.bank = opts.bank || []; // flat array of question objects
    this.count = Math.min(opts.count || DEFAULT_QUESTION_COUNT, this.bank.length);
    this.durationSec = opts.durationSec || DEFAULT_DURATION_SEC;
    this.studentName = opts.studentName || 'Crispin';
    this.parentEmail = opts.parentEmail || PARENT_EMAIL;

    this.qs = (App && App.shuffle ? App.shuffle(this.bank) : this.bank.slice()).slice(0, this.count);
    this.idx = 0;
    this.answers = []; // {q, given, correct, isCorrect}
    this.startTime = Date.now();
    this.endTime = this.startTime + this.durationSec * 1000;
    this.tickHandle = null;
    this.finished = false;
  }

  ExamEngine.prototype.start = function () {
    if (!this.host) return;
    this.host.innerHTML = `
      <div class="exam-stage">
        <div class="exam-bar">
          <div class="exam-bar__title">📝 ${this.subject} · ${this.chapterTitle}</div>
          <div class="exam-bar__meta">
            <span class="exam-bar__counter" id="exam-counter">Q 1 / ${this.qs.length}</span>
            <span class="exam-bar__timer" id="exam-timer">30:00</span>
          </div>
        </div>
        <div class="exam-progress"><div class="exam-progress__fill" id="exam-progress"></div></div>
        <div class="exam-question" id="exam-question"></div>
        <div class="exam-feedback" id="exam-feedback"></div>
        <div class="exam-actions">
          <button class="btn btn-outline" id="exam-skip">Skip ⤼</button>
          <button class="btn btn-primary" id="exam-next">Submit answer →</button>
        </div>
        <p class="muted" style="text-align:center; margin-top:16px;">
          ⚠️ Answers can't be changed after you click Submit. The exam auto-ends after 30 minutes.
        </p>
      </div>
    `;
    this.renderQuestion();
    this.startTimer();
    document.getElementById('exam-skip').addEventListener('click', () => this.skip());
    document.getElementById('exam-next').addEventListener('click', () => this.submitAnswer());

    // Block tab navigation accidentally closing
    window.addEventListener('beforeunload', this._beforeunload = (e) => {
      if (!this.finished) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    });
  };

  ExamEngine.prototype.startTimer = function () {
    const tick = () => {
      const remaining = Math.max(0, Math.round((this.endTime - Date.now()) / 1000));
      const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
      const ss = String(remaining % 60).padStart(2, '0');
      const t = document.getElementById('exam-timer');
      if (t) {
        t.textContent = mm + ':' + ss;
        if (remaining <= 60) t.classList.add('exam-bar__timer--warn');
        if (remaining <= 10) t.classList.add('exam-bar__timer--danger');
      }
      if (remaining <= 0) {
        this.finish(true);
      } else {
        this.tickHandle = setTimeout(tick, 500);
      }
    };
    tick();
  };

  ExamEngine.prototype.renderQuestion = function () {
    if (this.idx >= this.qs.length) return this.finish(false);
    const q = this.qs[this.idx];
    document.getElementById('exam-counter').textContent = `Q ${this.idx + 1} / ${this.qs.length}`;
    document.getElementById('exam-progress').style.width = ((this.idx) / this.qs.length * 100) + '%';

    let body = '';
    if (q.type === 'mcq' || q.type === 'compare') {
      body = `<div class="exam-question__text">${q.q}</div>` +
             `<div class="qz-options">` +
              q.options.map((o, i) => `<button class="qz-option" data-i="${i}">${o}</button>`).join('') +
             `</div>`;
    } else if (q.type === 'tf') {
      body = `<div class="exam-question__text">${q.q}</div>` +
             `<div class="qz-options">` +
               `<button class="qz-option" data-i="0">✅ True</button>` +
               `<button class="qz-option" data-i="1">❌ False</button>` +
             `</div>`;
    } else if (q.type === 'fill') {
      body = `<div class="exam-question__text">${q.q}</div>` +
             `<input class="qz-fill-input" id="exam-fill" placeholder="Type your answer" autocomplete="off" />`;
    }
    document.getElementById('exam-question').innerHTML = body;
    document.getElementById('exam-feedback').innerHTML = '';
    document.querySelectorAll('.qz-option').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.qz-option').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        if (App && App.Audio) App.Audio.playClick();
      });
    });
    const fillInput = document.getElementById('exam-fill');
    if (fillInput) {
      fillInput.focus();
      fillInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.submitAnswer();
      });
    }
  };

  ExamEngine.prototype.skip = function () {
    const q = this.qs[this.idx];
    this.answers.push({
      q: q.q, type: q.type, given: '(skipped)',
      correct: this._correctText(q),
      isCorrect: false
    });
    this.idx++;
    this.renderQuestion();
  };

  ExamEngine.prototype._correctText = function (q) {
    if (q.type === 'mcq' || q.type === 'compare') return q.options[q.answer];
    if (q.type === 'tf') return q.answer === 0 ? 'True' : 'False';
    if (q.type === 'fill') return Array.isArray(q.answer) ? q.answer[0] : q.answer;
    return '';
  };

  ExamEngine.prototype.submitAnswer = function () {
    const q = this.qs[this.idx];
    let given = '', isCorrect = false;
    if (q.type === 'mcq' || q.type === 'compare' || q.type === 'tf') {
      const sel = document.querySelector('.qz-option.selected');
      if (!sel) {
        if (App && App.showToast) App.showToast('Pick an answer or click Skip.', 'warn');
        return;
      }
      const i = parseInt(sel.dataset.i, 10);
      given = (q.options ? q.options[i] : (i === 0 ? 'True' : 'False'));
      isCorrect = (i === q.answer);
    } else if (q.type === 'fill') {
      const input = document.getElementById('exam-fill');
      given = (input.value || '').trim();
      if (!given) {
        if (App && App.showToast) App.showToast('Type an answer or click Skip.', 'warn');
        return;
      }
      const norm = given.toLowerCase().replace(/\s+/g, ' ').replace(/,/g, '');
      const acceptable = Array.isArray(q.answer) ? q.answer : [q.answer];
      isCorrect = acceptable.some(a => String(a).toLowerCase().replace(/\s+/g, ' ').replace(/,/g, '') === norm);
    }

    this.answers.push({
      q: q.q, type: q.type, given,
      correct: this._correctText(q),
      isCorrect,
      explain: q.explain || ''
    });
    if (App && App.Audio) App.Audio[isCorrect ? 'playCorrect' : 'playWrong']();
    this.idx++;
    this.renderQuestion();
  };

  ExamEngine.prototype.finish = function (timedOut) {
    if (this.finished) return;
    this.finished = true;
    if (this.tickHandle) clearTimeout(this.tickHandle);
    window.removeEventListener('beforeunload', this._beforeunload);

    const total = this.qs.length;
    const correct = this.answers.filter(a => a.isCorrect).length;
    const skipped = this.answers.filter(a => a.given === '(skipped)').length;
    // Mark unanswered remaining questions as skipped
    const unanswered = total - this.answers.length;
    for (let i = 0; i < unanswered; i++) {
      const q = this.qs[this.answers.length];
      this.answers.push({
        q: q.q, type: q.type, given: '(unanswered)',
        correct: this._correctText(q), isCorrect: false
      });
    }
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const timeTaken = Math.round((Date.now() - this.startTime) / 1000);
    const mins = Math.floor(timeTaken / 60), secs = timeTaken % 60;

    this.host.innerHTML = `
      <div class="exam-result">
        ${timedOut ? '<div class="exam-banner exam-banner--warn">⏱ Time\'s up! The exam was auto-submitted.</div>' : ''}
        <h2 style="text-align:center; margin-bottom: 8px;">📊 Exam Results</h2>
        <div class="exam-result__big">${correct} / ${total} <span style="font-size:1.4rem;">(${pct}%)</span></div>
        <div class="exam-result__meta">
          ${this.subject} · ${this.chapterTitle}<br>
          Time taken: ${mins}m ${secs}s · Skipped/blank: ${total - correct - this.answers.filter(a => a.isCorrect).length + this.answers.filter(a => a.isCorrect && false).length} ${''}
        </div>
        <div id="email-status" class="exam-email-status">Sending results to <strong>${this.parentEmail}</strong>…</div>
        <details class="exam-review" open>
          <summary>Review answers (${total} questions)</summary>
          <ol class="exam-review-list">
            ${this.answers.map(a => `
              <li class="${a.isCorrect ? 'exam-review-li--ok' : 'exam-review-li--bad'}">
                <div class="exam-review-q">${a.q}</div>
                <div class="exam-review-yours"><strong>Your answer:</strong> ${a.given}</div>
                ${a.isCorrect ? '' : `<div class="exam-review-correct"><strong>Correct:</strong> ${a.correct}</div>`}
                ${a.explain && !a.isCorrect ? `<div class="exam-review-explain">${a.explain}</div>` : ''}
              </li>
            `).join('')}
          </ol>
        </details>
        <div style="text-align:center; margin-top: 24px;">
          <a class="btn btn-primary" href="exam.html">📝 New Exam</a>
          <a class="btn btn-outline" href="maths.html" style="margin-left:8px;">← Back to Maths</a>
        </div>
      </div>
    `;
    if (App && App.launchConfetti && pct >= 80) App.launchConfetti(120);
    if (App && App.Audio) App.Audio[pct >= 80 ? 'playGoal' : pct >= 50 ? 'playCorrect' : 'playMiss']();

    // Award XP
    if (window.Progress) {
      const xp = pct >= 90 ? 80 : pct >= 70 ? 60 : pct >= 50 ? 40 : 25;
      window.Progress.addXP(xp, `Exam · ${this.chapterTitle} · ${pct}%`);
    }

    // Send results to parent via FormSubmit
    this._sendEmail({ correct, total, pct, mins, secs, timedOut });
  };

  ExamEngine.prototype._sendEmail = function ({ correct, total, pct, mins, secs, timedOut }) {
    const wrongList = this.answers.filter(a => !a.isCorrect);
    const wrongSummary = wrongList.length === 0
      ? 'All correct! 🎉'
      : wrongList.map((a, i) => `Q${i+1}: ${a.q}\n   Your answer: ${a.given}\n   Correct: ${a.correct}`).join('\n\n');

    const payload = {
      _subject: `Crispin's exam result — ${this.subject} · ${this.chapterTitle} · ${pct}%`,
      _template: 'box',
      _captcha: 'false',
      student: this.studentName,
      subject: this.subject,
      chapter: this.chapterTitle,
      score: `${correct} / ${total} (${pct}%)`,
      time_taken: `${mins} min ${secs} sec`,
      total_questions: total,
      correct_answers: correct,
      wrong_or_skipped: total - correct,
      timed_out: timedOut ? 'YES — exam ended automatically at 30 mins' : 'No',
      taken_at: App.formatDateDMY(new Date()) + ' (Bahrain time)',
      review: wrongSummary
    };

    const status = document.getElementById('email-status');
    fetch(FORMSUBMIT_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(r => r.json())
      .then(data => {
        if (data && data.success) {
          status.innerHTML = `✅ Results sent to <strong>${this.parentEmail}</strong>.`;
          status.classList.add('exam-email-status--ok');
        } else {
          throw new Error('FormSubmit returned non-success');
        }
      })
      .catch(err => {
        console.warn('Email delivery failed:', err);
        // Fallback: pre-fill a mailto link the parent can click manually
        const body = encodeURIComponent(
`Crispin's exam result

Subject: ${this.subject}
Chapter: ${this.chapterTitle}
Score: ${correct} / ${total} (${pct}%)
Time: ${mins} min ${secs} sec
Date: ${App.formatDateDMY(new Date())}

${wrongSummary}`);
        const subject = encodeURIComponent(payload._subject);
        status.innerHTML = `
          ⚠️ Auto-email didn't go through (probably the first time — FormSubmit needs you to confirm
          <strong>${this.parentEmail}</strong> the first time).<br>
          You can also <a href="mailto:${this.parentEmail}?subject=${subject}&body=${body}" class="btn btn-outline btn-sm" style="margin-top:6px;">📧 Open email manually</a>
        `;
        status.classList.add('exam-email-status--warn');
      });
  };

  window.ExamEngine = ExamEngine;
})();
