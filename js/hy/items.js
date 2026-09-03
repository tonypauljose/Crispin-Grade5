/* ============================================================
   HALF-YEARLY HQ — items.js
   Every question type Crispin can meet, and how it is rendered,
   answered and marked.

   Each renderer returns a CONTROLLER:
     {
       mode: 'auto' | 'self' | 'staged',
       ready()   -> bool     has he actually attempted it
       check()   -> { correct, given, want }
       reveal()              show the right answer in place
       focus()               put the cursor where it belongs
     }

   Everything is tap-first: no HTML5 drag anywhere, because drag
   is miserable on a tablet. Select-then-place instead.
   ============================================================ */
(function () {
  'use strict';

  const HY = window.HY = window.HY || {};

  /* ---------------- utilities ---------------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function shuffle(a) {
    const r = a.slice();
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = r[i]; r[i] = r[j]; r[j] = t;
    }
    return r;
  }
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* Answer normalisation for typed answers.
     Deliberately forgiving about form, strict about substance. */
  function norm(s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .replace(/[‘’“”]/g, "'")   // smart quotes
      .replace(/[।.!?]+\s*$/g, '')                    // trailing danda / full stop
      .replace(/[,]/g, '')                            // thousands commas
      .replace(/\s*[×xX*]\s*/g, 'x')                  // 2 × 3, 2*3, 2 x 3  ->  2x3
      .replace(/\s*[-–—]\s*/g, '-')
      .replace(/\s+/g, ' ')
      .trim();
  }
  function numeric(s) {
    const n = Number(String(s).replace(/[,\s]/g, ''));
    return isFinite(n) && String(s).replace(/[,\s]/g, '') !== '' ? n : null;
  }
  function matches(given, acceptList) {
    const g = norm(given);
    if (!g) return false;
    const list = Array.isArray(acceptList) ? acceptList : [acceptList];
    for (let i = 0; i < list.length; i++) {
      const a = norm(list[i]);
      if (g === a) return true;
      const gn = numeric(g), an = numeric(a);
      if (gn !== null && an !== null && Math.abs(gn - an) < 1e-9) return true;
      /* "6 cm" should pass when the key is "6", and vice versa */
      const strip = function (x) { return x.replace(/\b(cm|mm|m|km|kg|g|ml|l|degrees?|deg|°|units?)\b/g, '').replace(/\s+/g, ' ').trim(); };
      if (strip(g) === strip(a)) return true;
      const gs = numeric(strip(g)), as2 = numeric(strip(a));
      if (gs !== null && as2 !== null && Math.abs(gs - as2) < 1e-9) return true;
    }
    return false;
  }
  function firstAccept(list) {
    return Array.isArray(list) ? list[0] : list;
  }

  /* ---------------- renderers ---------------- */
  const R = {};

  /* ---- MCQ ---- */
  R.mcq = function (item, host) {
    const order = shuffle(item.options.map(function (o, i) { return i; }));
    const wrap = el('div', 'hy-opts');
    order.forEach(function (origIdx) {
      const b = el('button', 'hy-opt');
      b.type = 'button';
      b.dataset.i = origIdx;
      b.innerHTML = '<span class="hy-opt__mark"></span><span class="hy-opt__text">' + item.options[origIdx] + '</span>';
      b.addEventListener('click', function () {
        if (wrap.classList.contains('is-locked')) return;
        wrap.querySelectorAll('.hy-opt').forEach(function (x) { x.classList.remove('is-sel'); });
        b.classList.add('is-sel');
        HY.sfx && HY.sfx.tap();
      });
      wrap.appendChild(b);
    });
    host.appendChild(wrap);

    return {
      mode: 'auto',
      ready: function () { return !!wrap.querySelector('.is-sel'); },
      check: function () {
        const sel = wrap.querySelector('.is-sel');
        const i = sel ? parseInt(sel.dataset.i, 10) : -1;
        const correct = i === item.answer;
        wrap.classList.add('is-locked');
        wrap.querySelectorAll('.hy-opt').forEach(function (b) {
          const bi = parseInt(b.dataset.i, 10);
          if (bi === item.answer) b.classList.add('is-right');
          else if (bi === i) b.classList.add('is-wrong');
          b.disabled = true;
        });
        return { correct: correct, given: i >= 0 ? item.options[i] : '(nothing)', want: item.options[item.answer] };
      },
      reveal: function () {
        wrap.classList.add('is-locked');
        wrap.querySelectorAll('.hy-opt').forEach(function (b) {
          if (parseInt(b.dataset.i, 10) === item.answer) b.classList.add('is-right');
          b.disabled = true;
        });
      },
      focus: function () {}
    };
  };

  /* ---- MULTI (choose all that apply) ---- */
  R.multi = function (item, host) {
    const order = shuffle(item.options.map(function (o, i) { return i; }));
    const wrap = el('div', 'hy-opts hy-opts--multi');
    order.forEach(function (origIdx) {
      const b = el('button', 'hy-opt');
      b.type = 'button'; b.dataset.i = origIdx;
      b.innerHTML = '<span class="hy-opt__box"></span><span class="hy-opt__text">' + item.options[origIdx] + '</span>';
      b.addEventListener('click', function () {
        if (wrap.classList.contains('is-locked')) return;
        b.classList.toggle('is-sel');
        HY.sfx && HY.sfx.tap();
      });
      wrap.appendChild(b);
    });
    host.appendChild(wrap);
    host.appendChild(el('p', 'hy-microhint', 'Tap every one that is right — there is more than one.'));

    const want = item.answer.slice().sort();
    return {
      mode: 'auto',
      ready: function () { return !!wrap.querySelector('.is-sel'); },
      check: function () {
        const got = [];
        wrap.querySelectorAll('.hy-opt.is-sel').forEach(function (b) { got.push(parseInt(b.dataset.i, 10)); });
        got.sort();
        const correct = got.length === want.length && got.every(function (v, i) { return v === want[i]; });
        wrap.classList.add('is-locked');
        wrap.querySelectorAll('.hy-opt').forEach(function (b) {
          const bi = parseInt(b.dataset.i, 10);
          const should = want.indexOf(bi) >= 0, did = b.classList.contains('is-sel');
          if (should) b.classList.add('is-right');
          else if (did) b.classList.add('is-wrong');
          b.disabled = true;
        });
        return {
          correct: correct,
          given: got.map(function (i) { return item.options[i]; }).join(', ') || '(nothing)',
          want: want.map(function (i) { return item.options[i]; }).join(', ')
        };
      },
      reveal: function () {
        wrap.classList.add('is-locked');
        wrap.querySelectorAll('.hy-opt').forEach(function (b) {
          if (want.indexOf(parseInt(b.dataset.i, 10)) >= 0) b.classList.add('is-right');
          b.disabled = true;
        });
      },
      focus: function () {}
    };
  };

  /* ---- TRUE / FALSE ---- */
  R.tf = function (item, host) {
    const wrap = el('div', 'hy-opts hy-opts--tf');
    [['✅ True', true], ['❌ False', false]].forEach(function (pair) {
      const b = el('button', 'hy-opt hy-opt--big');
      b.type = 'button'; b.dataset.v = pair[1] ? '1' : '0';
      b.innerHTML = '<span class="hy-opt__text">' + pair[0] + '</span>';
      b.addEventListener('click', function () {
        if (wrap.classList.contains('is-locked')) return;
        wrap.querySelectorAll('.hy-opt').forEach(function (x) { x.classList.remove('is-sel'); });
        b.classList.add('is-sel');
        HY.sfx && HY.sfx.tap();
      });
      wrap.appendChild(b);
    });
    host.appendChild(wrap);

    return {
      mode: 'auto',
      ready: function () { return !!wrap.querySelector('.is-sel'); },
      check: function () {
        const sel = wrap.querySelector('.is-sel');
        const v = sel ? sel.dataset.v === '1' : null;
        const correct = v === !!item.answer;
        wrap.classList.add('is-locked');
        wrap.querySelectorAll('.hy-opt').forEach(function (b) {
          const bv = b.dataset.v === '1';
          if (bv === !!item.answer) b.classList.add('is-right');
          else if (bv === v) b.classList.add('is-wrong');
          b.disabled = true;
        });
        return { correct: correct, given: v === null ? '(nothing)' : (v ? 'True' : 'False'), want: item.answer ? 'True' : 'False' };
      },
      reveal: function () {
        wrap.querySelectorAll('.hy-opt').forEach(function (b) {
          if ((b.dataset.v === '1') === !!item.answer) b.classList.add('is-right');
          b.disabled = true;
        });
      },
      focus: function () {}
    };
  };

  /* ---- FILL (single typed answer) ---- */
  R.fill = function (item, host) {
    const wrap = el('div', 'hy-fill');
    const input = el('input', 'hy-input');
    input.type = 'text';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', 'false');
    input.placeholder = item.placeholder || 'Type your answer';
    if (item.lang) input.setAttribute('lang', item.lang);
    if (item.lang === 'hi-IN') input.classList.add('hy-input--hi');
    wrap.appendChild(input);
    host.appendChild(wrap);
    const reveal = el('div', 'hy-reveal');
    host.appendChild(reveal);

    return {
      mode: 'auto',
      ready: function () { return input.value.trim().length > 0; },
      check: function () {
        const given = input.value;
        const correct = matches(given, item.accept);
        input.disabled = true;
        input.classList.add(correct ? 'is-right' : 'is-wrong');
        if (!correct) reveal.innerHTML = 'Answer: <strong>' + esc(firstAccept(item.accept)) + '</strong>';
        return { correct: correct, given: given.trim() || '(nothing)', want: firstAccept(item.accept) };
      },
      reveal: function () {
        input.disabled = true;
        reveal.innerHTML = 'Answer: <strong>' + esc(firstAccept(item.accept)) + '</strong>';
      },
      focus: function () { try { input.focus(); } catch (_) {} },
      onEnter: function (fn) {
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') fn(); });
      }
    };
  };

  /* ---- FILL MULTI (several blanks) ---- */
  R.fillMulti = function (item, host) {
    const wrap = el('div', 'hy-fillmulti');
    const inputs = [];
    item.blanks.forEach(function (b, i) {
      const row = el('div', 'hy-fillmulti__row');
      row.appendChild(el('label', 'hy-fillmulti__label', esc(b.label)));
      const inp = el('input', 'hy-input');
      inp.type = 'text';
      inp.setAttribute('autocomplete', 'off'); inp.setAttribute('spellcheck', 'false');
      if (item.lang === 'hi-IN') inp.classList.add('hy-input--hi');
      row.appendChild(inp);
      const rv = el('div', 'hy-reveal');
      row.appendChild(rv);
      wrap.appendChild(row);
      inputs.push({ inp: inp, rv: rv, def: b });
    });
    host.appendChild(wrap);

    return {
      mode: 'auto',
      ready: function () { return inputs.some(function (x) { return x.inp.value.trim(); }); },
      check: function () {
        let all = true;
        const given = [], want = [];
        inputs.forEach(function (x) {
          const ok = matches(x.inp.value, x.def.accept);
          if (!ok) all = false;
          x.inp.disabled = true;
          x.inp.classList.add(ok ? 'is-right' : 'is-wrong');
          if (!ok) x.rv.innerHTML = '→ <strong>' + esc(firstAccept(x.def.accept)) + '</strong>';
          given.push(x.def.label + ': ' + (x.inp.value.trim() || '—'));
          want.push(x.def.label + ': ' + firstAccept(x.def.accept));
        });
        return { correct: all, given: given.join(' · '), want: want.join(' · ') };
      },
      reveal: function () {
        inputs.forEach(function (x) {
          x.inp.disabled = true;
          x.rv.innerHTML = '→ <strong>' + esc(firstAccept(x.def.accept)) + '</strong>';
        });
      },
      focus: function () { try { inputs[0].inp.focus(); } catch (_) {} }
    };
  };

  /* ---- MATCH (tap left, tap right) ---- */
  R.match = function (item, host) {
    const lefts = item.pairs.map(function (p, i) { return { t: p.l, i: i }; });
    const rights = shuffle(item.pairs.map(function (p, i) { return { t: p.r, i: i }; }));
    const paired = {};        // leftIndex -> rightIndex
    let selLeft = null;

    const wrap = el('div', 'hy-match');
    const colL = el('div', 'hy-match__col');
    const colR = el('div', 'hy-match__col');
    wrap.appendChild(colL); wrap.appendChild(colR);
    host.appendChild(wrap);

    function paint() {
      colL.querySelectorAll('.hy-chip').forEach(function (c) {
        const i = parseInt(c.dataset.i, 10);
        c.classList.toggle('is-sel', selLeft === i);
        c.classList.toggle('is-paired', paired[i] !== undefined);
        const badge = c.querySelector('.hy-chip__num');
        if (badge) badge.textContent = paired[i] !== undefined ? String(slotOf(paired[i])) : '';
      });
      colR.querySelectorAll('.hy-chip').forEach(function (c) {
        const i = parseInt(c.dataset.i, 10);
        const used = Object.keys(paired).some(function (k) { return paired[k] === i; });
        c.classList.toggle('is-paired', used);
        const badge = c.querySelector('.hy-chip__num');
        if (badge) badge.textContent = used ? String(slotOf(i)) : '';
      });
    }
    /* stable little pairing number so a matched couple shares a badge */
    const slots = {};
    let slotN = 0;
    function slotOf(rightIdx) {
      if (!slots[rightIdx]) slots[rightIdx] = ++slotN;
      return slots[rightIdx];
    }

    lefts.forEach(function (l) {
      const c = el('button', 'hy-chip hy-chip--l');
      c.type = 'button'; c.dataset.i = l.i;
      c.innerHTML = '<span class="hy-chip__num"></span><span class="hy-chip__t">' + l.t + '</span>';
      c.addEventListener('click', function () {
        if (wrap.classList.contains('is-locked')) return;
        if (paired[l.i] !== undefined) { delete paired[l.i]; selLeft = null; paint(); HY.sfx && HY.sfx.tap(); return; }
        selLeft = (selLeft === l.i) ? null : l.i;
        paint(); HY.sfx && HY.sfx.tap();
      });
      colL.appendChild(c);
    });
    rights.forEach(function (r) {
      const c = el('button', 'hy-chip hy-chip--r');
      c.type = 'button'; c.dataset.i = r.i;
      c.innerHTML = '<span class="hy-chip__num"></span><span class="hy-chip__t">' + r.t + '</span>';
      c.addEventListener('click', function () {
        if (wrap.classList.contains('is-locked')) return;
        if (selLeft === null) return;
        Object.keys(paired).forEach(function (k) { if (paired[k] === r.i) delete paired[k]; });
        paired[selLeft] = r.i;
        slotOf(r.i);
        selLeft = null;
        paint(); HY.sfx && HY.sfx.tap();
      });
      colR.appendChild(c);
    });
    host.appendChild(el('p', 'hy-microhint', 'Tap a word on the left, then its partner on the right. Tap a paired word to undo it.'));
    paint();

    return {
      mode: 'auto',
      ready: function () { return Object.keys(paired).length === item.pairs.length; },
      check: function () {
        let all = true;
        wrap.classList.add('is-locked');
        item.pairs.forEach(function (p, i) {
          const ok = paired[i] === i;
          if (!ok) all = false;
          const c = colL.querySelector('.hy-chip[data-i="' + i + '"]');
          if (c) c.classList.add(ok ? 'is-right' : 'is-wrong');
        });
        colR.querySelectorAll('.hy-chip').forEach(function (c) { c.disabled = true; });
        colL.querySelectorAll('.hy-chip').forEach(function (c) { c.disabled = true; });
        if (!all) {
          const list = el('div', 'hy-reveal');
          list.innerHTML = 'Correct pairs:<br>' + item.pairs.map(function (p) {
            return '<strong>' + p.l + '</strong> → ' + p.r;
          }).join('<br>');
          host.appendChild(list);
        }
        return {
          correct: all,
          given: item.pairs.map(function (p, i) { return p.l + '→' + (paired[i] !== undefined ? item.pairs[paired[i]].r : '?'); }).join(', '),
          want: item.pairs.map(function (p) { return p.l + '→' + p.r; }).join(', ')
        };
      },
      reveal: function () {
        wrap.classList.add('is-locked');
        const list = el('div', 'hy-reveal');
        list.innerHTML = 'Correct pairs:<br>' + item.pairs.map(function (p) {
          return '<strong>' + p.l + '</strong> → ' + p.r;
        }).join('<br>');
        host.appendChild(list);
      },
      focus: function () {}
    };
  };

  /* ---- ORDER (build a sequence) ---- */
  R.order = function (item, host) {
    const answer = item.answer.slice();
    const pool = shuffle(answer.map(function (t, i) { return { t: t, k: i }; }));
    const placed = [];

    const line = el('div', 'hy-order__line');
    const bank = el('div', 'hy-order__bank');
    host.appendChild(line);
    host.appendChild(el('p', 'hy-microhint', 'Tap the pieces in the right order. Tap one in the line above to send it back.'));
    host.appendChild(bank);

    function paint() {
      line.innerHTML = '';
      if (!placed.length) line.appendChild(el('span', 'hy-order__ph', 'Your answer appears here'));
      placed.forEach(function (p, idx) {
        const c = el('button', 'hy-chip hy-chip--placed');
        c.type = 'button';
        c.innerHTML = '<span class="hy-chip__t">' + p.t + '</span>';
        c.addEventListener('click', function () {
          if (line.classList.contains('is-locked')) return;
          placed.splice(idx, 1); pool.push(p); paint(); HY.sfx && HY.sfx.tap();
        });
        line.appendChild(c);
      });
      bank.innerHTML = '';
      pool.forEach(function (p, idx) {
        const c = el('button', 'hy-chip');
        c.type = 'button';
        c.innerHTML = '<span class="hy-chip__t">' + p.t + '</span>';
        c.addEventListener('click', function () {
          if (line.classList.contains('is-locked')) return;
          pool.splice(idx, 1); placed.push(p); paint(); HY.sfx && HY.sfx.tap();
        });
        bank.appendChild(c);
      });
    }
    paint();

    return {
      mode: 'auto',
      ready: function () { return placed.length === answer.length; },
      check: function () {
        const got = placed.map(function (p) { return p.t; });
        const correct = got.length === answer.length && got.every(function (v, i) { return norm(v) === norm(answer[i]); });
        line.classList.add('is-locked');
        line.querySelectorAll('.hy-chip').forEach(function (c, i) {
          c.classList.add(norm(got[i]) === norm(answer[i]) ? 'is-right' : 'is-wrong');
          c.disabled = true;
        });
        bank.querySelectorAll('.hy-chip').forEach(function (c) { c.disabled = true; });
        if (!correct) {
          const rv = el('div', 'hy-reveal');
          rv.innerHTML = 'Correct order: <strong>' + esc(answer.join(' ')) + '</strong>';
          host.appendChild(rv);
        }
        return { correct: correct, given: got.join(' ') || '(nothing)', want: answer.join(' ') };
      },
      reveal: function () {
        line.classList.add('is-locked');
        const rv = el('div', 'hy-reveal');
        rv.innerHTML = 'Correct order: <strong>' + esc(answer.join(' ')) + '</strong>';
        host.appendChild(rv);
      },
      focus: function () {}
    };
  };

  /* ---- BUCKET (sort chips into boxes) ---- */
  R.bucket = function (item, host) {
    const chips = shuffle(item.chips.map(function (c, i) { return { t: c.t, b: c.b, k: i, in: null }; }));
    let sel = null;

    const boxes = el('div', 'hy-buckets');
    item.buckets.forEach(function (name) {
      const b = el('div', 'hy-bucket');
      b.dataset.name = name;
      b.innerHTML = '<div class="hy-bucket__title">' + esc(name) + '</div><div class="hy-bucket__body"></div>';
      b.addEventListener('click', function () {
        if (boxes.classList.contains('is-locked')) return;
        if (sel === null) return;
        chips[sel].in = name; sel = null; paint(); HY.sfx && HY.sfx.tap();
      });
      boxes.appendChild(b);
    });
    const bank = el('div', 'hy-bucket__bank');
    host.appendChild(bank);
    host.appendChild(el('p', 'hy-microhint', 'Tap a card, then tap the box it belongs in.'));
    host.appendChild(boxes);

    function chipEl(c, idx, locked) {
      const e = el('button', 'hy-chip');
      e.type = 'button';
      e.innerHTML = '<span class="hy-chip__t">' + c.t + '</span>';
      if (sel === idx) e.classList.add('is-sel');
      if (locked) {
        e.classList.add(c.in === c.b ? 'is-right' : 'is-wrong');
        e.disabled = true;
        if (c.in !== c.b) e.innerHTML += '<span class="hy-chip__fix">→ ' + esc(c.b) + '</span>';
      } else {
        e.addEventListener('click', function (ev) {
          ev.stopPropagation();
          if (boxes.classList.contains('is-locked')) return;
          if (c.in) { c.in = null; sel = null; paint(); HY.sfx && HY.sfx.tap(); return; }
          sel = (sel === idx) ? null : idx;
          paint(); HY.sfx && HY.sfx.tap();
        });
      }
      return e;
    }
    function paint(locked) {
      bank.innerHTML = '';
      chips.forEach(function (c, i) { if (!c.in) bank.appendChild(chipEl(c, i, locked)); });
      if (!bank.children.length) bank.appendChild(el('span', 'hy-order__ph', 'All sorted 👍'));
      boxes.querySelectorAll('.hy-bucket').forEach(function (b) {
        const body = b.querySelector('.hy-bucket__body');
        body.innerHTML = '';
        chips.forEach(function (c, i) { if (c.in === b.dataset.name) body.appendChild(chipEl(c, i, locked)); });
      });
    }
    paint(false);

    return {
      mode: 'auto',
      ready: function () { return chips.every(function (c) { return !!c.in; }); },
      check: function () {
        const correct = chips.every(function (c) { return c.in === c.b; });
        boxes.classList.add('is-locked');
        paint(true);
        return {
          correct: correct,
          given: chips.map(function (c) { return c.t + '→' + (c.in || '?'); }).join(', '),
          want: chips.map(function (c) { return c.t + '→' + c.b; }).join(', ')
        };
      },
      reveal: function () {
        chips.forEach(function (c) { c.in = c.b; });
        boxes.classList.add('is-locked');
        paint(true);
      },
      focus: function () {}
    };
  };

  /* ---- TAP (tap the target words in a sentence) ---- */
  R.tap = function (item, host) {
    const wrap = el('div', 'hy-tap');
    item.tokens.forEach(function (tok, i) {
      if (tok.t === '\n') { wrap.appendChild(el('span', 'hy-tap__br')); return; }
      const b = el('button', 'hy-tok');
      b.type = 'button'; b.dataset.i = i;
      b.textContent = tok.t;
      if (tok.fixed) { b.classList.add('is-fixed'); b.disabled = true; }
      else b.addEventListener('click', function () {
        if (wrap.classList.contains('is-locked')) return;
        b.classList.toggle('is-sel'); HY.sfx && HY.sfx.tap();
      });
      wrap.appendChild(b);
    });
    host.appendChild(wrap);
    host.appendChild(el('p', 'hy-microhint', 'Tap the word (or words) the question asks for. Tap again to unselect.'));

    return {
      mode: 'auto',
      ready: function () { return !!wrap.querySelector('.is-sel'); },
      check: function () {
        let all = true;
        wrap.classList.add('is-locked');
        wrap.querySelectorAll('.hy-tok').forEach(function (b) {
          const tok = item.tokens[parseInt(b.dataset.i, 10)];
          const should = !!tok.ok, did = b.classList.contains('is-sel');
          if (should && did) b.classList.add('is-right');
          else if (should && !did) { b.classList.add('is-missed'); all = false; }
          else if (!should && did) { b.classList.add('is-wrong'); all = false; }
          b.disabled = true;
        });
        const want = item.tokens.filter(function (t) { return t.ok; }).map(function (t) { return t.t; });
        const given = [];
        wrap.querySelectorAll('.hy-tok.is-sel').forEach(function (b) { given.push(b.textContent); });
        return { correct: all, given: given.join(', ') || '(nothing)', want: want.join(', ') };
      },
      reveal: function () {
        wrap.classList.add('is-locked');
        wrap.querySelectorAll('.hy-tok').forEach(function (b) {
          if (item.tokens[parseInt(b.dataset.i, 10)].ok) b.classList.add('is-right');
          b.disabled = true;
        });
      },
      focus: function () {}
    };
  };

  /* ---- STEPS (a long answer, one stage at a time) ---- */
  R.steps = function (item, host) {
    const wrap = el('div', 'hy-steps');
    host.appendChild(wrap);
    const state = { idx: 0, tries: 0, wrongAny: false, log: [] };

    function renderStep() {
      const part = item.parts[state.idx];
      const row = el('div', 'hy-step');
      row.innerHTML =
        '<div class="hy-step__n">' + (state.idx + 1) + '</div>' +
        '<div class="hy-step__main"><div class="hy-step__q">' + part.q + '</div></div>';
      const main = row.querySelector('.hy-step__main');
      const inp = el('input', 'hy-input');
      inp.type = 'text'; inp.setAttribute('autocomplete', 'off'); inp.setAttribute('spellcheck', 'false');
      if (part.placeholder) inp.placeholder = part.placeholder;
      main.appendChild(inp);
      const fb = el('div', 'hy-step__fb');
      main.appendChild(fb);
      const go = el('button', 'hy-btn hy-btn--sm', 'Check this step');
      go.type = 'button';
      main.appendChild(go);
      wrap.appendChild(row);
      try { inp.focus(); } catch (_) {}

      function settle(ok) {
        inp.disabled = true; go.remove();
        inp.classList.add(ok ? 'is-right' : 'is-wrong');
        state.log.push(part.q + ' = ' + (inp.value.trim() || '—'));
        state.idx++;
        if (state.idx < item.parts.length) renderStep();
        else wrap.dispatchEvent(new CustomEvent('hy:stepsdone', { bubbles: true }));
      }
      function attempt() {
        const ok = matches(inp.value, part.accept);
        if (ok) {
          fb.className = 'hy-step__fb is-good'; fb.textContent = '✓';
          HY.sfx && HY.sfx.ok();
          settle(true);
        } else {
          state.tries++; state.wrongAny = true;
          HY.sfx && HY.sfx.no();
          if (state.tries >= 2) {
            fb.className = 'hy-step__fb is-bad';
            fb.innerHTML = 'The answer here is <strong>' + esc(firstAccept(part.accept)) + '</strong>' +
                           (part.why ? '<br><span class="hy-step__why">' + part.why + '</span>' : '');
            state.tries = 0;
            settle(false);
          } else {
            fb.className = 'hy-step__fb is-bad';
            fb.innerHTML = 'Not quite — look again at this step.' + (part.hint ? ' <em>' + part.hint + '</em>' : '');
          }
        }
      }
      go.addEventListener('click', attempt);
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') attempt(); });
    }
    renderStep();

    return {
      mode: 'staged',
      isDone: function () { return state.idx >= item.parts.length; },
      onDone: function (fn) { wrap.addEventListener('hy:stepsdone', fn); },
      ready: function () { return state.idx >= item.parts.length; },
      check: function () {
        return {
          correct: !state.wrongAny,
          given: state.log.join(' | '),
          want: item.parts.map(function (p) { return p.q + ' = ' + firstAccept(p.accept); }).join(' | ')
        };
      },
      reveal: function () {},
      focus: function () {}
    };
  };

  /* ---- SHORT ANSWER (written answer, self-marked against the model) ---- */
  R.shortAnswer = function (item, host) {
    const wrap = el('div', 'hy-short');
    const ta = el('textarea', 'hy-textarea');
    ta.rows = item.lines || 3;
    ta.placeholder = 'Write your answer here — full sentences, like in the exam.';
    if (item.lang === 'hi-IN') ta.classList.add('hy-input--hi');
    wrap.appendChild(ta);
    const paperNote = el('p', 'hy-microhint',
      'Writing it on paper instead? Do that, then tap <strong>Show the model answer</strong> and mark yourself honestly.');
    wrap.appendChild(paperNote);
    host.appendChild(wrap);

    const panel = el('div', 'hy-model hidden');
    host.appendChild(panel);
    let shown = false, marked = null;

    function showModel() {
      if (shown) return;
      shown = true;
      ta.disabled = true;
      panel.classList.remove('hidden');
      panel.innerHTML =
        '<div class="hy-model__title">Model answer</div>' +
        '<div class="hy-model__body">' + item.model + '</div>' +
        (item.must && item.must.length
          ? '<div class="hy-model__title">Did your answer have all of these?</div><div class="hy-model__must">' +
            item.must.map(function (m, i) {
              return '<label class="hy-check"><input type="checkbox" data-i="' + i + '"><span>' + m + '</span></label>';
            }).join('') + '</div>'
          : '') +
        '<div class="hy-model__mark">' +
          '<button class="hy-btn hy-btn--ok" type="button" data-m="1">I got it right ✅</button>' +
          '<button class="hy-btn hy-btn--warn" type="button" data-m="0">I missed things ❌</button>' +
        '</div>';
      panel.querySelectorAll('[data-m]').forEach(function (b) {
        b.addEventListener('click', function () {
          marked = b.dataset.m === '1';
          panel.querySelectorAll('[data-m]').forEach(function (x) { x.classList.remove('is-sel'); });
          b.classList.add('is-sel');
          panel.dispatchEvent(new CustomEvent('hy:selfmarked', { bubbles: true }));
        });
      });
    }

    const showBtn = el('button', 'hy-btn hy-btn--ghost', 'Show the model answer');
    showBtn.type = 'button';
    showBtn.addEventListener('click', function () { showModel(); showBtn.remove(); });
    host.appendChild(showBtn);

    return {
      mode: 'self',
      showModel: showModel,
      onMarked: function (fn) { panel.addEventListener('hy:selfmarked', fn); },
      ready: function () { return marked !== null; },
      check: function () {
        showModel();
        const ticks = panel.querySelectorAll('.hy-check input:checked').length;
        const need = item.must ? item.must.length : 0;
        const correct = marked === true && (!need || ticks >= Math.ceil(need * 0.75));
        return {
          correct: correct,
          given: (ta.value.trim() || '(written on paper)').slice(0, 300),
          want: String(item.model).replace(/<[^>]+>/g, ' ').slice(0, 300)
        };
      },
      reveal: showModel,
      focus: function () { try { ta.focus(); } catch (_) {} }
    };
  };

  /* ---- SPEAK (read aloud, self-check with TTS) ---- */
  R.speak = function (item, host) {
    const wrap = el('div', 'hy-speak');
    wrap.innerHTML = '<div class="hy-speak__text' + (item.lang === 'hi-IN' ? ' hy-hi' : '') + '">' + item.text + '</div>';
    const row = el('div', 'hy-speak__row');
    const play = el('button', 'hy-btn hy-btn--ghost', '🔊 Hear it');
    play.type = 'button';
    play.addEventListener('click', function () { HY.speech && HY.speech.say(item.text, item.lang || 'en-GB'); });
    row.appendChild(play);
    wrap.appendChild(row);
    host.appendChild(wrap);

    const mark = el('div', 'hy-model__mark');
    mark.innerHTML =
      '<button class="hy-btn hy-btn--ok" type="button" data-m="1">I read it correctly ✅</button>' +
      '<button class="hy-btn hy-btn--warn" type="button" data-m="0">I need more practice</button>';
    host.appendChild(mark);
    let marked = null;
    mark.querySelectorAll('[data-m]').forEach(function (b) {
      b.addEventListener('click', function () {
        marked = b.dataset.m === '1';
        mark.querySelectorAll('[data-m]').forEach(function (x) { x.classList.remove('is-sel'); });
        b.classList.add('is-sel');
        mark.dispatchEvent(new CustomEvent('hy:selfmarked', { bubbles: true }));
      });
    });

    return {
      mode: 'self',
      onMarked: function (fn) { mark.addEventListener('hy:selfmarked', fn); },
      ready: function () { return marked !== null; },
      check: function () { return { correct: marked === true, given: marked ? 'read correctly' : 'needs practice', want: item.text }; },
      reveal: function () { HY.speech && HY.speech.say(item.text, item.lang || 'en-GB'); },
      focus: function () {}
    };
  };

  /* ---------------- public ---------------- */
  HY.items = {
    render: function (item, host) {
      const fn = R[item.type];
      if (!fn) {
        host.innerHTML = '<p class="hy-microhint">Unknown question type: ' + esc(item.type) + '</p>';
        return { mode: 'auto', ready: function () { return true; }, check: function () { return { correct: false, given: '', want: '' }; }, reveal: function () {}, focus: function () {} };
      }
      return fn(item, host);
    },
    matches: matches,
    norm: norm,
    esc: esc,
    shuffle: shuffle,
    types: Object.keys(R)
  };
})();
