"""Generate the Maths Periodic Exam practice bank for Crispin.

Portion (from the school workbook photos):
  Chapter 1 — Numbers          (Indian & International place value, commas,
                                number names, numerals from words, place vs
                                face value, successor/predecessor, expanded &
                                standard form, comparing & ordering, rounding
                                to 10/100/1000, Roman numerals)
  Chapter 2 — The Four Operations  (properties/vocabulary, sums, differences,
                                mixed +/-, products, quotient & remainder,
                                multiply 4-digit x 2-3 digit, divide by 2-3
                                digit divisors, divide-and-check)

Run from the repo root:
    python tools/generate_periodic_maths_bank.py

Produces:
    data/periodic-maths.js  -> window.PERIODIC_MATHS_BANK = [...]

The bank is FLAT (not tiered). exam.html loads it as a flat array and the
ExamEngine picks a random subset. Question objects use the exact schema the
engine consumes: type in {mcq, tf, fill, compare}; answer is an index for
mcq/tf/compare and a list of accepted strings for fill; `explain` carries the
full worked solution (shown as the rationale). Calibrated HARD on purpose.
"""
from __future__ import annotations

import json
import random
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent / "data"


# ============================================================
# Number-name + comma helpers (shared with the Big Numbers tool)
# ============================================================

ONES = {
    0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
    6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
    11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
    16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen',
}
TENS = {2: 'twenty', 3: 'thirty', 4: 'forty', 5: 'fifty',
        6: 'sixty', 7: 'seventy', 8: 'eighty', 9: 'ninety'}


def words_2(n: int) -> str:
    if n < 20:
        return ONES[n]
    t, o = divmod(n, 10)
    return TENS[t] if o == 0 else f"{TENS[t]}-{ONES[o]}"


def words_3(n: int) -> str:
    if n == 0:
        return ''
    if n < 100:
        return words_2(n)
    h, r = divmod(n, 100)
    out = f"{ONES[h]} hundred"
    if r:
        out += f" {words_2(r)}"
    return out


def number_to_indian_words(n: int) -> str:
    if n == 0:
        return 'zero'
    parts = []
    crore, n = divmod(n, 10_000_000)
    lakh, n = divmod(n, 100_000)
    thousand, n = divmod(n, 1_000)
    hundreds = n
    if crore:
        parts.append(f"{words_2(crore)} crore")
    if lakh:
        parts.append(f"{words_2(lakh)} lakh")
    if thousand:
        parts.append(f"{words_2(thousand)} thousand")
    if hundreds:
        parts.append(words_3(hundreds))
    return ' '.join(parts)


def number_to_intl_words(n: int) -> str:
    if n == 0:
        return 'zero'
    parts = []
    billion, n = divmod(n, 1_000_000_000)
    million, n = divmod(n, 1_000_000)
    thousand, n = divmod(n, 1_000)
    hundreds = n
    if billion:
        parts.append(f"{words_3(billion)} billion")
    if million:
        parts.append(f"{words_3(million)} million")
    if thousand:
        parts.append(f"{words_3(thousand)} thousand")
    if hundreds:
        parts.append(words_3(hundreds))
    return ' '.join(parts)


def indian_commas(n: int) -> str:
    s = str(n)
    if len(s) <= 3:
        return s
    last3 = s[-3:]
    rest = s[:-3]
    groups = []
    while len(rest) > 2:
        groups.insert(0, rest[-2:])
        rest = rest[:-2]
    if rest:
        groups.insert(0, rest)
    return ','.join(groups) + ',' + last3


def intl_commas(n: int) -> str:
    return f"{n:,}"


def expanded_form_indian(n: int) -> str:
    s = str(n)
    parts = []
    L = len(s)
    for i, ch in enumerate(s):
        d = int(ch)
        if d == 0:
            continue
        place = d * (10 ** (L - 1 - i))
        parts.append(indian_commas(place))
    return ' + '.join(parts) if parts else '0'


INDIAN_PLACE_NAMES = [
    'ones', 'tens', 'hundreds',
    'thousands', 'ten thousands',
    'lakhs', 'ten lakhs',
    'crores', 'ten crores',
    'arabs',
]


def underlined_html(num_str: str, idx_from_left: int) -> str:
    return num_str[:idx_from_left] + '<u>' + num_str[idx_from_left] + '</u>' + num_str[idx_from_left + 1:]


# ---- Roman numerals ----
_ROMAN_MAP = [
    (1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'),
    (100, 'C'), (90, 'XC'), (50, 'L'), (40, 'XL'),
    (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I'),
]


def to_roman(n: int) -> str:
    out = []
    for val, sym in _ROMAN_MAP:
        while n >= val:
            out.append(sym)
            n -= val
    return ''.join(out)


def Q(type_, q, options=None, answer=None, explain="", hint=None):
    o = {"type": type_, "q": q}
    if options is not None:
        o["options"] = options
    o["answer"] = answer
    o["explain"] = explain
    if hint:
        o["hint"] = hint
    return o


def num_answers(n: int) -> list:
    """Accepted fill answers for a numeric result — Indian commas, plain, and
    International commas. The engine's matcher strips commas and matches
    numerically, so any of these is accepted."""
    return [indian_commas(n), str(n), intl_commas(n)]


def write_bank(filename: str, var_name: str, qs: list):
    out = [f"/* Maths Periodic Exam practice — {len(qs)} questions, generated by tools/generate_periodic_maths_bank.py */"]
    out.append("/* Portion: Chapter 1 Numbers + Chapter 2 The Four Operations. High difficulty. */")
    out.append(f"window.{var_name} = [")
    for q in qs:
        parts = [f"type: '{q['type']}'", f"q: {json.dumps(q['q'])}"]
        if "options" in q:
            parts.append(f"options: {json.dumps(q['options'])}")
        parts.append(f"answer: {json.dumps(q['answer'])}")
        parts.append(f"explain: {json.dumps(q['explain'])}")
        if "hint" in q:
            parts.append(f"hint: {json.dumps(q['hint'])}")
        out.append("  { " + ", ".join(parts) + " },")
    out.append("];")
    out.append("")
    path = ROOT / filename
    path.write_text("\n".join(out), encoding="utf-8")
    print(f"  wrote {filename:24s} {len(qs):4d} questions")


def random_big_number(min_digits: int = 5, max_digits: int = 9) -> int:
    d = random.randint(min_digits, max_digits)
    lo = 10 ** (d - 1)
    hi = 10 ** d - 1
    return random.randint(lo, hi)


# ============================================================
# CHAPTER 1 — NUMBERS
# ============================================================

def gen_indian_commas(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        num = random_big_number(6, 9)
        if num in seen:
            continue
        seen.add(num)
        ans = indian_commas(num)
        qs.append(Q(
            "fill",
            f"Put commas in the <strong>Indian</strong> system: {num}",
            answer=[ans, ans.replace(",", ""), str(num)],
            explain=f"Indian system groups 3-2-2 from the right: first comma after 3 digits, then every 2 digits. → <strong>{ans}</strong>",
            hint="From the right: 3 digits, then pairs (3-2-2)."
        ))
    return qs


def gen_intl_commas(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        num = random_big_number(6, 9)
        if num in seen:
            continue
        seen.add(num)
        ans = intl_commas(num)
        qs.append(Q(
            "fill",
            f"Put commas in the <strong>International</strong> system: {num}",
            answer=[ans, ans.replace(",", ""), str(num)],
            explain=f"International system groups in 3s from the right (3-3-3). → <strong>{ans}</strong>",
            hint="Every 3 digits from the right."
        ))
    return qs


def gen_numeral_from_words(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        system = random.choice(['indian', 'intl'])
        num = random_big_number(6, 8)
        key = (num, system)
        if key in seen:
            continue
        seen.add(key)
        if system == 'indian':
            words = number_to_indian_words(num)
            sysname = 'Indian'
        else:
            words = number_to_intl_words(num)
            sysname = 'International'
        qs.append(Q(
            "fill",
            f"Write the numeral ({sysname} system): “{words.capitalize()}”",
            answer=num_answers(num),
            explain=f"<strong>{indian_commas(num)}</strong> (Indian) = <strong>{intl_commas(num)}</strong> (International).",
            hint="Crore = 1,00,00,000 · Lakh = 1,00,000 · Million = 1,000,000."
        ))
    return qs


def gen_words_from_numeral(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        num = random_big_number(6, 8)
        if num in seen:
            continue
        seen.add(num)
        words = number_to_indian_words(num)
        variants = {words, words.replace('-', ' '), words + ' only'}
        qs.append(Q(
            "fill",
            f"Write {indian_commas(num)} in <strong>words</strong> (Indian system).",
            answer=list(variants),
            explain=f"<strong>{words.capitalize()}</strong>.",
            hint="Read crores, then lakhs, then thousands, then the rest."
        ))
    return qs


def gen_place_value(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        num = random_big_number(6, 9)
        s = str(num)
        L = len(s)
        idx = random.randint(0, L - 1)
        digit = int(s[idx])
        if digit == 0:
            continue
        key = (num, idx)
        if key in seen:
            continue
        seen.add(key)
        place_pos = L - 1 - idx
        place_value = digit * (10 ** place_pos)
        place_name = INDIAN_PLACE_NAMES[place_pos] if place_pos < len(INDIAN_PLACE_NAMES) else f"10^{place_pos}"
        plain_underlined = underlined_html(s, idx)
        qs.append(Q(
            "fill",
            f"<strong>Place value</strong> of the underlined digit in {plain_underlined}?",
            answer=num_answers(place_value),
            explain=f"The {digit} is in the <strong>{place_name}</strong> place → place value = {digit} × {indian_commas(10 ** place_pos)} = <strong>{indian_commas(place_value)}</strong>.",
            hint="Place value = digit × its place worth."
        ))
    return qs


def gen_face_value(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        num = random_big_number(6, 9)
        s = str(num)
        idx = random.randint(0, len(s) - 1)
        digit = int(s[idx])
        key = (num, idx)
        if key in seen:
            continue
        seen.add(key)
        plain_underlined = underlined_html(s, idx)
        qs.append(Q(
            "fill",
            f"<strong>Face value</strong> of the underlined digit in {plain_underlined}?",
            answer=[str(digit)],
            explain=f"Face value is just the digit itself, wherever it sits. → <strong>{digit}</strong>",
            hint="Face value = the digit itself."
        ))
    return qs


def gen_place_vs_face(n_qs: int) -> list:
    """Harder: difference between place value and face value of a digit."""
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        num = random_big_number(6, 8)
        s = str(num)
        L = len(s)
        idx = random.randint(0, L - 4)  # pick a higher place so the gap is big
        digit = int(s[idx])
        if digit == 0:
            continue
        key = (num, idx)
        if key in seen:
            continue
        seen.add(key)
        place_pos = L - 1 - idx
        pv = digit * (10 ** place_pos)
        diff = pv - digit
        plain_underlined = underlined_html(s, idx)
        qs.append(Q(
            "fill",
            f"In {plain_underlined}, find (place value − face value) of the underlined digit.",
            answer=num_answers(diff),
            explain=f"Place value = {indian_commas(pv)}, face value = {digit}. {indian_commas(pv)} − {digit} = <strong>{indian_commas(diff)}</strong>.",
            hint="Work out both values, then subtract."
        ))
    return qs


def gen_successor(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        num = random_big_number(6, 9)
        if random.random() < 0.35:
            num = (num // 100) * 100 + 99
        if num in seen:
            continue
        seen.add(num)
        succ = num + 1
        qs.append(Q(
            "fill",
            f"Successor of {indian_commas(num)} = ?",
            answer=num_answers(succ),
            explain=f"Successor means +1. {indian_commas(num)} + 1 = <strong>{indian_commas(succ)}</strong>.",
            hint="Successor = comes just after (add 1)."
        ))
    return qs


def gen_predecessor(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        num = random_big_number(6, 9)
        if random.random() < 0.35:
            num = (num // 1000) * 1000  # ends in ...000 → borrowing
        if num <= 1 or num in seen:
            continue
        seen.add(num)
        pred = num - 1
        qs.append(Q(
            "fill",
            f"Predecessor of {indian_commas(num)} = ?",
            answer=num_answers(pred),
            explain=f"Predecessor means −1. {indian_commas(num)} − 1 = <strong>{indian_commas(pred)}</strong>.",
            hint="Predecessor = comes just before (subtract 1)."
        ))
    return qs


def gen_standard_from_expanded(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        num = random_big_number(6, 8)
        if num in seen:
            continue
        seen.add(num)
        expanded = expanded_form_indian(num)
        qs.append(Q(
            "fill",
            f"Write in <strong>standard form</strong>: {expanded}",
            answer=num_answers(num),
            explain=f"Add the place values: <strong>{indian_commas(num)}</strong>.",
            hint="Add up all the parts."
        ))
    return qs


def gen_expanded_from_standard(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        num = random_big_number(6, 8)
        if num in seen:
            continue
        seen.add(num)
        expanded = expanded_form_indian(num)
        accepted = [
            expanded,
            expanded.replace(",", ""),
            expanded.replace(" + ", "+"),
            expanded.replace(" + ", " plus "),
        ]
        qs.append(Q(
            "fill",
            f"Write {indian_commas(num)} in <strong>expanded form</strong> (use + signs).",
            answer=accepted,
            explain=f"Break by place value: <strong>{expanded}</strong>.",
            hint="Each non-zero digit becomes digit × its place worth."
        ))
    return qs


def gen_compare(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        a = random_big_number(6, 9)
        kind = random.choice(['close', 'farther', 'equal', 'farther', 'close'])
        if kind == 'equal':
            b = a
        elif kind == 'close':
            shift = random.choice([-1000, -100, -10, -1, 1, 10, 100, 1000, 10_000])
            b = max(1, a + shift)
        else:
            b = random_big_number(6, 9)
        key = (a, b)
        if key in seen:
            continue
        seen.add(key)
        sign = '<' if a < b else ('>' if a > b else '=')
        ans_idx = 0 if sign == '<' else (1 if sign == '>' else 2)
        qs.append(Q(
            "compare",
            f"Compare: {indian_commas(a)} ___ {indian_commas(b)}",
            options=["<", ">", "="],
            answer=ans_idx,
            explain=f"{indian_commas(a)} {sign} {indian_commas(b)}.",
            hint="Count digits first; if equal, compare from the left."
        ))
    return qs


def gen_ordering(n_qs: int) -> list:
    """Pick the greatest / smallest from 4 close numbers (MCQ)."""
    qs, tries = [], 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        base = random_big_number(6, 8)
        nums = {base}
        while len(nums) < 4:
            nums.add(max(1, base + random.choice([-2100, -1500, -900, -300, -40, 50, 230, 770, 1900, 3300])))
        nums = list(nums)[:4]
        random.shuffle(nums)
        if len({n for n in nums}) < 4:
            continue
        want = random.choice(['greatest', 'smallest'])
        target = max(nums) if want == 'greatest' else min(nums)
        options = [indian_commas(n) for n in nums]
        ans_idx = nums.index(target)
        ordered = sorted(nums, reverse=(want == 'greatest'))
        ordered_disp = ' > '.join(indian_commas(n) for n in sorted(nums, reverse=True))
        qs.append(Q(
            "mcq",
            f"Which is the <strong>{want}</strong>? {', '.join(indian_commas(n) for n in nums)}",
            options=options,
            answer=ans_idx,
            explain=f"In descending order: {ordered_disp}. So the {want} is <strong>{indian_commas(target)}</strong>.",
            hint="Compare digit-count first, then left-to-right."
        ))
    return qs


def _round_to(n: int, base: int) -> int:
    return ((n + base // 2) // base) * base


def gen_rounding(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        base = random.choice([10, 100, 1000])
        num = random.randint(1050, 998999)
        key = (num, base)
        if key in seen:
            continue
        seen.add(key)
        ans = _round_to(num, base)
        nm = {10: 'nearest 10', 100: 'nearest 100', 1000: 'nearest 1000'}[base]
        # work out the deciding digit for the explanation
        decider = (num % base) // (base // 10)
        direction = 'up' if (num % base) >= base / 2 else 'down'
        qs.append(Q(
            "fill",
            f"Round off {indian_commas(num)} to the <strong>{nm}</strong>.",
            answer=num_answers(ans),
            explain=f"Look at the digit in the {base // 10}s place ({decider}). It is {'5 or more' if direction == 'up' else 'less than 5'}, so round <strong>{direction}</strong> → <strong>{indian_commas(ans)}</strong>.",
            hint="Check the digit just to the right of the rounding place: 5+ rounds up."
        ))
    return qs


def gen_roman_to(n_qs: int) -> list:
    """Hindu-Arabic number → Roman numeral."""
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        num = random.choice([random.randint(4, 100), random.randint(40, 399)])
        if num in seen:
            continue
        seen.add(num)
        ans = to_roman(num)
        qs.append(Q(
            "fill",
            f"Write the <strong>Roman numeral</strong> for {num}.",
            answer=[ans, ans.lower()],
            explain=f"{num} = <strong>{ans}</strong>.  (I=1, V=5, X=10, L=50, C=100; a smaller symbol before a bigger one subtracts, e.g. IV=4, IX=9, XL=40, XC=90.)",
            hint="Break the number into 100s, 50s, 10s, 9s, 5s, 4s, 1s."
        ))
    return qs


def gen_roman_from(n_qs: int) -> list:
    """Roman numeral → Hindu-Arabic number."""
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        num = random.choice([random.randint(4, 100), random.randint(40, 399)])
        if num in seen:
            continue
        seen.add(num)
        roman = to_roman(num)
        qs.append(Q(
            "fill",
            f"Write the number for the Roman numeral <strong>{roman}</strong>.",
            answer=[str(num)],
            explain=f"{roman} = <strong>{num}</strong>.",
            hint="Add the symbols left to right; a smaller one before a bigger one means subtract."
        ))
    return qs


def gen_roman_compare(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        a = random.randint(5, 90)
        b = random.choice([a, a + random.choice([-7, -3, 3, 7, 12])])
        b = max(1, b)
        key = (a, b)
        if key in seen:
            continue
        seen.add(key)
        sign = '<' if a < b else ('>' if a > b else '=')
        ans_idx = 0 if sign == '<' else (1 if sign == '>' else 2)
        qs.append(Q(
            "compare",
            f"Compare the Roman numerals: {to_roman(a)} ___ {to_roman(b)}",
            options=["<", ">", "="],
            answer=ans_idx,
            explain=f"{to_roman(a)} = {a} and {to_roman(b)} = {b}, so {to_roman(a)} {sign} {to_roman(b)}.",
            hint="Convert each Roman numeral to a number first, then compare."
        ))
    return qs


def gen_numbers_facts(n_qs: int) -> list:
    """True/false + MCQ concept checks for Chapter 1."""
    pool = [
        Q("tf", "The successor of the largest 4-digit number is 10,000.",
          answer=0, explain="Largest 4-digit number = 9,999; its successor = 9,999 + 1 = 10,000. <strong>True</strong>."),
        Q("tf", "In the Indian system, after the first 3 digits from the right, commas come every 2 digits.",
          answer=0, explain="Indian grouping is 3-2-2. <strong>True</strong>."),
        Q("tf", "Face value of a digit changes depending on its place.",
          answer=1, explain="Face value is always the digit itself; <em>place value</em> changes with position. <strong>False</strong>."),
        Q("tf", "In the International system commas are placed every 3 digits from the right.",
          answer=0, explain="International grouping is 3-3-3. <strong>True</strong>."),
        Q("tf", "There is no Roman numeral symbol for zero.",
          answer=0, explain="Romans had no symbol for 0. <strong>True</strong>."),
        Q("tf", "1 crore = 10 millions.",
          answer=0, explain="1 crore = 1,00,00,000 = 10,000,000 = 10 million. <strong>True</strong>."),
        Q("tf", "1 lakh = 100 thousand.",
          answer=0, explain="1,00,000 = 100 × 1,000 = one hundred thousand. <strong>True</strong>."),
        Q("mcq", "How many lakhs make one crore?",
          options=["10", "100", "1,000", "10,000"], answer=1,
          explain="1 crore = 1,00,00,000 = 100 × 1,00,000 = <strong>100 lakhs</strong>."),
        Q("mcq", "Which number has 7 in the lakhs place?",
          options=["27,45,310", "2,74,510", "70,45,123", "7,04,512"], answer=3,
          explain="In 7,04,512 the 7 sits in the lakhs place (1,00,000s). → <strong>7,04,512</strong>."),
        Q("mcq", "The place value of 0 in any number is:",
          options=["0", "10", "the place name", "1"], answer=0,
          explain="0 × (any place) = <strong>0</strong>."),
        Q("mcq", "Which is the largest 7-digit number?",
          options=["99,99,999", "10,00,000", "99,99,990", "90,00,000"], answer=0,
          explain="The largest 7-digit number is <strong>99,99,999</strong> (one less than one crore)."),
        Q("mcq", "What is the smallest 8-digit number?",
          options=["10,00,000", "1,00,00,000", "99,99,999", "1,000,000"], answer=1,
          explain="Smallest 8-digit number = <strong>1,00,00,000</strong> (one crore)."),
        Q("tf", "When comparing two numbers with a different number of digits, the one with more digits is larger.",
          answer=0, explain="More digits always means a larger whole number. <strong>True</strong>."),
        Q("mcq", "In 4,38,851 → 4,38,852, what operation was done?",
          options=["Found the predecessor", "Found the successor", "Rounded to nearest 10", "Doubled it"], answer=1,
          explain="852 is 851 + 1, so it is the <strong>successor</strong>."),
    ]
    random.shuffle(pool)
    return pool[:n_qs]


# ============================================================
# CHAPTER 2 — THE FOUR OPERATIONS
# ============================================================

def gen_addition(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        kind = random.choice(['two', 'three'])
        if kind == 'two':
            a, b = random.randint(100000, 9999999), random.randint(100000, 9999999)
            nums = [a, b]
        else:
            nums = [random.randint(10000, 999999) for _ in range(3)]
        key = tuple(nums)
        if key in seen:
            continue
        seen.add(key)
        total = sum(nums)
        expr = ' + '.join(indian_commas(n) for n in nums)
        qs.append(Q(
            "fill",
            f"Find the sum: {expr}",
            answer=num_answers(total),
            explain=f"{expr} = <strong>{indian_commas(total)}</strong>. (Line up the digits by place value and add, carrying where needed.)",
            hint="Add ones first, carry to the next place."
        ))
    return qs


def gen_subtraction(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        a = random.randint(500000, 9999999)
        b = random.randint(10000, a - 1000)
        key = (a, b)
        if key in seen:
            continue
        seen.add(key)
        diff = a - b
        qs.append(Q(
            "fill",
            f"Find the difference: {indian_commas(a)} − {indian_commas(b)}",
            answer=num_answers(diff),
            explain=f"{indian_commas(a)} − {indian_commas(b)} = <strong>{indian_commas(diff)}</strong>. (Borrow from the next place when a digit is too small.)",
            hint="Subtract place by place; borrow when needed."
        ))
    return qs


def gen_mixed_addsub(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        a = random.randint(100000, 999999)
        b = random.randint(1000, 90000)
        c = random.randint(1000, min(a + b - 1, 90000))
        key = (a, b, c)
        if key in seen:
            continue
        seen.add(key)
        res = a + b - c
        qs.append(Q(
            "fill",
            f"Solve: {indian_commas(a)} + {indian_commas(b)} − {indian_commas(c)}",
            answer=num_answers(res),
            explain=f"Work left to right: {indian_commas(a)} + {indian_commas(b)} = {indian_commas(a + b)}; then − {indian_commas(c)} = <strong>{indian_commas(res)}</strong>.",
            hint="Add first, then subtract."
        ))
    return qs


def gen_multiply(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        a = random.randint(1000, 9999)
        b = random.choice([random.randint(11, 99), random.randint(101, 999)])
        key = (a, b)
        if key in seen:
            continue
        seen.add(key)
        prod = a * b
        qs.append(Q(
            "fill",
            f"Multiply: {indian_commas(a)} × {b}",
            answer=num_answers(prod),
            explain=f"{indian_commas(a)} × {b} = <strong>{indian_commas(prod)}</strong>. (Multiply by each digit of {b}, shift each partial product one place left, then add.)",
            hint="Multiply by each digit, then add the shifted rows."
        ))
    return qs


def gen_product_powers(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        a = random.randint(101, 9999)
        p = random.choice([10, 100, 1000])
        key = (a, p)
        if key in seen:
            continue
        seen.add(key)
        prod = a * p
        zeros = {10: 'one zero', 100: 'two zeros', 1000: 'three zeros'}[p]
        qs.append(Q(
            "fill",
            f"Find the product: {indian_commas(a)} × {p}",
            answer=num_answers(prod),
            explain=f"To multiply by {p}, write {indian_commas(a)} and add {zeros}. → <strong>{indian_commas(prod)}</strong>.",
            hint=f"Multiplying by {p} just adds {zeros}."
        ))
    return qs


def gen_quotient_powers(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        p = random.choice([10, 100, 1000])
        dividend = random.randint(p * 5, 999999)
        key = (dividend, p)
        if key in seen:
            continue
        seen.add(key)
        q, r = divmod(dividend, p)
        qs.append(Q(
            "fill",
            f"Divide {indian_commas(dividend)} ÷ {p}. What is the <strong>quotient</strong>?",
            answer=num_answers(q),
            explain=f"Dividing by {p}: quotient = {indian_commas(q)} and remainder = {r}. The quotient is <strong>{indian_commas(q)}</strong>.",
            hint=f"To divide by {p}, drop the last {len(str(p)) - 1} digit(s) — those become the remainder."
        ))
    return qs


def gen_divide(n_qs: int) -> list:
    """Divide by a 2-3 digit divisor; ask quotient or remainder."""
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        divisor = random.randint(12, 199)
        q = random.randint(20, 999)
        r = random.randint(0, divisor - 1)
        dividend = divisor * q + r
        ask = random.choice(['q', 'r'])
        key = (dividend, divisor, ask)
        if key in seen:
            continue
        seen.add(key)
        if ask == 'q':
            qs.append(Q(
                "fill",
                f"Divide {indian_commas(dividend)} ÷ {divisor}. What is the <strong>quotient</strong>?",
                answer=num_answers(q),
                explain=f"{indian_commas(dividend)} ÷ {divisor} = quotient <strong>{indian_commas(q)}</strong>, remainder {r}. (Check: {indian_commas(q)} × {divisor} + {r} = {indian_commas(dividend)}.)",
                hint="Use long division; bring down one digit at a time."
            ))
        else:
            qs.append(Q(
                "fill",
                f"Divide {indian_commas(dividend)} ÷ {divisor}. What is the <strong>remainder</strong>?",
                answer=[str(r)],
                explain=f"{indian_commas(dividend)} ÷ {divisor} = quotient {indian_commas(q)}, remainder <strong>{r}</strong>. (Check: {indian_commas(q)} × {divisor} + {r} = {indian_commas(dividend)}.)",
                hint="The remainder is what is left over, always less than the divisor."
            ))
    return qs


def gen_divide_and_check(n_qs: int) -> list:
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        divisor = random.randint(6, 99)
        q = random.randint(50, 9999)
        r = random.randint(0, divisor - 1)
        dividend = divisor * q + r
        key = (dividend, divisor)
        if key in seen:
            continue
        seen.add(key)
        qs.append(Q(
            "fill",
            f"On dividing, {indian_commas(dividend)} ÷ {divisor} gives quotient {indian_commas(q)} and remainder {r}. Using (quotient × divisor) + remainder, what should the answer be?",
            answer=num_answers(dividend),
            explain=f"(quotient × divisor) + remainder = ({indian_commas(q)} × {divisor}) + {r} = {indian_commas(q * divisor)} + {r} = <strong>{indian_commas(dividend)}</strong> = the dividend. So the division is correct.",
            hint="(quotient × divisor) + remainder should equal the dividend."
        ))
    return qs


def gen_missing_digit(n_qs: int) -> list:
    """Missing-number puzzles across the four operations."""
    qs, seen, tries = [], set(), 0
    while len(qs) < n_qs and tries < n_qs * 8:
        tries += 1
        kind = random.choice(['add', 'sub', 'mul', 'div'])
        if kind == 'add':
            a = random.randint(1000, 99999)
            b = random.randint(1000, 99999)
            q = Q("fill", f"Find the missing number: ? + {indian_commas(a)} = {indian_commas(a + b)}",
                  answer=num_answers(b),
                  explain=f"? = {indian_commas(a + b)} − {indian_commas(a)} = <strong>{indian_commas(b)}</strong>.",
                  hint="Subtract the known part from the total.")
            k = ('add', a, b)
        elif kind == 'sub':
            a = random.randint(5000, 99999)
            b = random.randint(100, a - 100)
            q = Q("fill", f"Find the missing number: {indian_commas(a)} − ? = {indian_commas(a - b)}",
                  answer=num_answers(b),
                  explain=f"? = {indian_commas(a)} − {indian_commas(a - b)} = <strong>{indian_commas(b)}</strong>.",
                  hint="Subtract the answer from the first number.")
            k = ('sub', a, b)
        elif kind == 'mul':
            a = random.randint(3, 12)
            b = random.randint(11, 99)
            q = Q("fill", f"Find the missing number: {a} × ? = {indian_commas(a * b)}",
                  answer=[str(b)],
                  explain=f"? = {indian_commas(a * b)} ÷ {a} = <strong>{b}</strong>.",
                  hint="Divide the product by the known factor.")
            k = ('mul', a, b)
        else:
            b = random.randint(3, 12)
            q_ = random.randint(11, 99)
            prod = b * q_
            q = Q("fill", f"Find the missing number: {indian_commas(prod)} ÷ ? = {q_}",
                  answer=[str(b)],
                  explain=f"? = {indian_commas(prod)} ÷ {q_} = <strong>{b}</strong>.",
                  hint="Divide the dividend by the quotient.")
            k = ('div', prod, q_)
        if k in seen:
            continue
        seen.add(k)
        qs.append(q)
    return qs


def gen_op_facts(n_qs: int) -> list:
    """Properties & vocabulary of the four operations (from the workbook)."""
    pool = [
        Q("fill", "The number from which we subtract is called the ______.",
          answer=["minuend"], explain="In a − b, <strong>a</strong> is the <strong>minuend</strong> and b is the subtrahend."),
        Q("fill", "The result of a subtraction is called the ______.",
          answer=["difference"], explain="Subtraction gives the <strong>difference</strong>."),
        Q("fill", "The result of an addition is called the ______.",
          answer=["sum", "total"], explain="Addition gives the <strong>sum</strong>."),
        Q("fill", "The result of a multiplication is called the ______.",
          answer=["product"], explain="Multiplication gives the <strong>product</strong>."),
        Q("tf", "0 is the additive identity (a + 0 = a).",
          answer=0, explain="Adding 0 changes nothing, so 0 is the <strong>additive identity</strong>. True."),
        Q("tf", "1 is the multiplicative identity (a × 1 = a).",
          answer=0, explain="Multiplying by 1 changes nothing, so 1 is the <strong>multiplicative identity</strong>. True."),
        Q("fill", "6,749,823 + 0 = ______",
          answer=num_answers(6749823), explain="Adding 0 changes nothing → <strong>6,749,823</strong>."),
        Q("fill", "89,765 × 1 = ______",
          answer=num_answers(89765), explain="Multiplying by 1 changes nothing → <strong>89,765</strong>."),
        Q("fill", "452 × 0 = ______",
          answer=["0"], explain="Anything multiplied by 0 is <strong>0</strong>."),
        Q("fill", "When a number is divided by itself, the quotient is ______.",
          answer=["1"], explain="a ÷ a = <strong>1</strong> (for any non-zero a)."),
        Q("fill", "When a number is divided by 1, the quotient is ______.",
          answer=["the number itself", "the number", "itself", "same number"],
          explain="a ÷ 1 = a, i.e. <strong>the number itself</strong>."),
        Q("tf", "23,482,569 − 1 = 23,482,568.",
          answer=0, explain="Subtracting 1 gives the predecessor: <strong>23,482,568</strong>. True."),
        Q("tf", "9,523,102 − 9,523,102 = 0.",
          answer=0, explain="Any number minus itself is <strong>0</strong>. True."),
        Q("mcq", "432 × 755 = 755 × ____ . The blank is:",
          options=["432", "755", "0", "1"], answer=0,
          explain="Multiplication is commutative: order does not matter, so the blank is <strong>432</strong>."),
        Q("mcq", "Which shows the additive identity?",
          options=["a × 1 = a", "a + 0 = a", "a ÷ a = 1", "a − 0 = a"], answer=1,
          explain="The additive identity is <strong>a + 0 = a</strong>."),
        Q("mcq", "10,240 ÷ 10,240 = ?",
          options=["0", "1", "10,240", "10"], answer=1,
          explain="A non-zero number divided by itself is <strong>1</strong>."),
    ]
    random.shuffle(pool)
    return pool[:n_qs]


def gen_word_problems(n_qs: int) -> list:
    """Multi-step, real-life word problems (cheque/money/people)."""
    qs, tries = [], 0
    while len(qs) < n_qs and tries < n_qs * 12:
        tries += 1
        kind = random.choice(['money_left', 'total_cost', 'share', 'attendance', 'cheque'])
        if kind == 'money_left':
            land = random.randint(2000000, 9999999)
            spent = random.randint(500000, land - 100000)
            left = land - spent
            qs.append(Q("fill",
                f"Sita had ₹{indian_commas(land)}. She spent ₹{indian_commas(spent)} buying land. How much money is left (in ₹)?",
                answer=num_answers(left),
                explain=f"₹{indian_commas(land)} − ₹{indian_commas(spent)} = <strong>₹{indian_commas(left)}</strong>.",
                hint="'Spent' → subtract."))
        elif kind == 'total_cost':
            price = random.randint(1200, 9800)
            qty = random.randint(12, 99)
            tot = price * qty
            qs.append(Q("fill",
                f"A factory makes {qty} items, each worth ₹{indian_commas(price)}. What is the total value (in ₹)?",
                answer=num_answers(tot),
                explain=f"{qty} × ₹{indian_commas(price)} = <strong>₹{indian_commas(tot)}</strong>.",
                hint="'Each' and 'total' → multiply."))
        elif kind == 'share':
            people = random.choice([12, 15, 18, 24, 25])
            each = random.randint(150, 999)
            total = people * each + random.randint(0, people - 1)
            q, r = divmod(total, people)
            qs.append(Q("fill",
                f"{indian_commas(total)} toffees are shared equally among {people} children. How many does each child get (ignore the leftover)?",
                answer=num_answers(q),
                explain=f"{indian_commas(total)} ÷ {people} = quotient <strong>{indian_commas(q)}</strong> (remainder {r} left over).",
                hint="'Shared equally' → divide."))
        elif kind == 'attendance':
            a = random.randint(200000, 900000)
            b = random.randint(50000, a - 10000)
            left = a - b
            qs.append(Q("fill",
                f"A stadium had {indian_commas(a)} fans. {indian_commas(b)} left at half-time. How many remained?",
                answer=num_answers(left),
                explain=f"{indian_commas(a)} − {indian_commas(b)} = <strong>{indian_commas(left)}</strong>.",
                hint="'Left' → subtract."))
        else:  # cheque
            amt = random.randint(1000000, 9999999)
            qs.append(Q("fill",
                f"A cheque is written for ₹{indian_commas(amt)}. Write this amount in words (Indian system) — then state the digit in the lakhs place.",
                answer=[str(int(str(amt).rjust(8, '0')[-6]))],
                explain=f"₹{indian_commas(amt)} = {number_to_indian_words(amt)} rupees only. The lakhs-place digit is <strong>{int(str(amt).rjust(8, '0')[-6])}</strong>.",
                hint="The lakhs place is the 6th digit from the right."))
    return qs


# ============================================================
# Build & write
# ============================================================

if __name__ == "__main__":
    random.seed(2026)
    qs = []

    # --- Chapter 1 — Numbers (~150) ---
    qs += gen_indian_commas(16)
    qs += gen_intl_commas(12)
    qs += gen_numeral_from_words(16)
    qs += gen_words_from_numeral(12)
    qs += gen_place_value(16)
    qs += gen_face_value(8)
    qs += gen_place_vs_face(8)
    qs += gen_successor(10)
    qs += gen_predecessor(10)
    qs += gen_standard_from_expanded(10)
    qs += gen_expanded_from_standard(10)
    qs += gen_compare(12)
    qs += gen_ordering(10)
    qs += gen_rounding(16)
    qs += gen_roman_to(12)
    qs += gen_roman_from(10)
    qs += gen_roman_compare(8)
    qs += gen_numbers_facts(14)

    # --- Chapter 2 — The Four Operations (~150) ---
    qs += gen_addition(16)
    qs += gen_subtraction(16)
    qs += gen_mixed_addsub(12)
    qs += gen_multiply(16)
    qs += gen_product_powers(10)
    qs += gen_quotient_powers(10)
    qs += gen_divide(16)
    qs += gen_divide_and_check(12)
    qs += gen_missing_digit(12)
    qs += gen_op_facts(16)
    qs += gen_word_problems(16)

    print("Generating Maths Periodic Exam practice bank...")
    write_bank("periodic-maths.js", "PERIODIC_MATHS_BANK", qs)
    print(f"Total: {len(qs)} questions (Chapter 1 Numbers + Chapter 2 Four Operations).")
