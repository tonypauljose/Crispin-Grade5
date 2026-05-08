"""Generate the Big Numbers question bank (lakhs, crores, ten crores,
millions, ten millions) for Crispin's enrichment chapter.

Run from the repo root:
    python tools/generate_big_numbers_bank.py

Produces:
    data/big-numbers.js  → window.BIG_NUMBERS_BANK = [...]

Question types covered (the 11 the user asked for):
  1. Put commas — Indian system          (e.g. 12345678 → 1,23,45,678)
  2. Put commas — International system   (e.g. 12345678 → 12,345,678)
  3. Successor                           (n+1, with Indian commas)
  4. Predecessor                         (n−1, with Indian commas)
  5. Standard form (from expanded)       (5,00,000 + 30,000 + ... → 5,30,...)
  6. Expanded form (from standard)
  7. Numerals ← words (Indian system)    ("five lakh thirty four thousand" → 5,34,000)
  8. Words ← numerals (Indian system)
  9. Place value of underlined digit     (returns the worth, e.g. 30,00,000)
 10. Face value of underlined digit      (returns just the digit)
 11. Compare numbers (<, >, =)

The bank is FLAT (not tiered) — the in-chapter Quiz tab and the timed
Exam runner both pick random subsets.
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
# Helpers
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
    """0-99 → words"""
    if n < 20:
        return ONES[n]
    t, o = divmod(n, 10)
    return TENS[t] if o == 0 else f"{TENS[t]}-{ONES[o]}"


def words_3(n: int) -> str:
    """0-999 → words (no 'and')"""
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
    """Indian system: crore, lakh, thousand"""
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
    """International: billion, million, thousand"""
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
    """1234567890 → 1,23,45,67,890"""
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
    """1234567890 → 1,234,567,890"""
    return f"{n:,}"


def expanded_form_indian(n: int) -> str:
    """5,34,567 → '5,00,000 + 30,000 + 4,000 + 500 + 60 + 7'"""
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


# Place names — pos counted from the right, 0 = ones
INDIAN_PLACE_NAMES = [
    'ones', 'tens', 'hundreds',
    'thousands', 'ten thousands',
    'lakhs', 'ten lakhs',
    'crores', 'ten crores',
    'arabs',  # 10^9, optional
]
INTL_PLACE_NAMES = [
    'ones', 'tens', 'hundreds',
    'thousands', 'ten thousands', 'hundred thousands',
    'millions', 'ten millions', 'hundred millions',
    'billions',
]


def underlined_html(num_str: str, idx_from_left: int) -> str:
    """Return an HTML string with the digit at idx_from_left underlined.
    The chapter page renders this with <u> styling."""
    return num_str[:idx_from_left] + '<u>' + num_str[idx_from_left] + '</u>' + num_str[idx_from_left + 1:]


def Q(type_, q, options=None, answer=None, explain="", hint=None):
    o = {"type": type_, "q": q}
    if options is not None:
        o["options"] = options
    o["answer"] = answer
    o["explain"] = explain
    if hint:
        o["hint"] = hint
    return o


def write_bank(filename: str, var_name: str, qs: list):
    out = [f"/* Big Numbers — {len(qs)} questions, generated by tools/generate_big_numbers_bank.py */"]
    out.append("/* Covers: Indian + International commas, succ/pred, standard/expanded form,")
    out.append("   numeral↔words (both systems), place value, face value, comparison.       */")
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
    print(f"  wrote {filename:30s} {len(qs):4d} questions")


# ============================================================
# Generators (one per question type)
# ============================================================

# Choose number ranges that cover lakhs through ten crores.
def random_big_number(min_digits: int = 5, max_digits: int = 9) -> int:
    """Pick a random positive integer with digit-length in [min_digits, max_digits]."""
    d = random.randint(min_digits, max_digits)
    lo = 10 ** (d - 1)
    hi = 10 ** d - 1
    return random.randint(lo, hi)


def gen_indian_commas(n_qs: int) -> list:
    qs = []
    seen = set()
    tries = 0
    while len(qs) < n_qs and tries < n_qs * 5:
        tries += 1
        num = random_big_number(5, 9)
        if num in seen:
            continue
        seen.add(num)
        ans = indian_commas(num)
        qs.append(Q(
            "fill",
            f"Write {num} with commas in the <strong>Indian</strong> system.",
            answer=[ans, ans.replace(",", ""), str(num)],
            explain=f"Indian system: from the right, place the first comma after 3 digits, then every 2 digits. → <strong>{ans}</strong>",
            hint="Group the last 3 digits, then pairs going left."
        ))
    return qs


def gen_intl_commas(n_qs: int) -> list:
    qs = []
    seen = set()
    tries = 0
    while len(qs) < n_qs and tries < n_qs * 5:
        tries += 1
        num = random_big_number(5, 9)
        if num in seen:
            continue
        seen.add(num)
        ans = intl_commas(num)
        qs.append(Q(
            "fill",
            f"Write {num} with commas in the <strong>International</strong> system.",
            answer=[ans, ans.replace(",", ""), str(num)],
            explain=f"International system: place a comma every 3 digits from the right. → <strong>{ans}</strong>",
            hint="Group every 3 digits from the right."
        ))
    return qs


def gen_successor(n_qs: int) -> list:
    qs = []
    seen = set()
    tries = 0
    while len(qs) < n_qs and tries < n_qs * 5:
        tries += 1
        num = random_big_number(5, 9)
        # Make some interesting cases (carry-over) by occasionally picking 99-ending
        if random.random() < 0.25:
            num = (num // 100) * 100 + 99  # ends in ...99
        if num in seen:
            continue
        seen.add(num)
        succ = num + 1
        ans_indian = indian_commas(succ)
        ans_intl = intl_commas(succ)
        qs.append(Q(
            "fill",
            f"Successor of {indian_commas(num)} = ?",
            answer=[ans_indian, ans_intl, str(succ), indian_commas(succ).replace(",", "")],
            explain=f"Successor means +1. {indian_commas(num)} + 1 = <strong>{ans_indian}</strong>.",
            hint="Successor = the number that comes JUST AFTER (add 1)."
        ))
    return qs


def gen_predecessor(n_qs: int) -> list:
    qs = []
    seen = set()
    tries = 0
    while len(qs) < n_qs and tries < n_qs * 5:
        tries += 1
        num = random_big_number(5, 9)
        if random.random() < 0.25:
            num = (num // 100) * 100  # ends in ...00, predecessor borrows
        if num <= 1 or num in seen:
            continue
        seen.add(num)
        pred = num - 1
        ans_indian = indian_commas(pred)
        ans_intl = intl_commas(pred)
        qs.append(Q(
            "fill",
            f"Predecessor of {indian_commas(num)} = ?",
            answer=[ans_indian, ans_intl, str(pred), indian_commas(pred).replace(",", "")],
            explain=f"Predecessor means −1. {indian_commas(num)} − 1 = <strong>{ans_indian}</strong>.",
            hint="Predecessor = the number that comes JUST BEFORE (subtract 1)."
        ))
    return qs


def gen_standard_from_expanded(n_qs: int) -> list:
    qs = []
    seen = set()
    tries = 0
    while len(qs) < n_qs and tries < n_qs * 5:
        tries += 1
        num = random_big_number(5, 9)
        if num in seen:
            continue
        seen.add(num)
        expanded = expanded_form_indian(num)
        ans_indian = indian_commas(num)
        qs.append(Q(
            "fill",
            f"Write in <strong>standard form</strong>: {expanded}",
            answer=[ans_indian, str(num), intl_commas(num), ans_indian.replace(",", "")],
            explain=f"Add the place values together → <strong>{ans_indian}</strong>.",
            hint="Just add up the parts on each side of the + signs."
        ))
    return qs


def gen_expanded_from_standard(n_qs: int) -> list:
    qs = []
    seen = set()
    tries = 0
    while len(qs) < n_qs and tries < n_qs * 5:
        tries += 1
        num = random_big_number(5, 8)
        if num in seen:
            continue
        seen.add(num)
        expanded = expanded_form_indian(num)
        # Build a list of acceptable answer variations
        accepted = [
            expanded,
            expanded.replace(",", ""),
            expanded.replace(" + ", "+"),
            expanded.replace(" + ", " plus "),
        ]
        qs.append(Q(
            "fill",
            f"Write {indian_commas(num)} in <strong>expanded form</strong> (use + signs, you may include commas if you wish).",
            answer=accepted,
            explain=f"Break by place value: <strong>{expanded}</strong>.",
            hint="Each non-zero digit becomes (digit × its place worth)."
        ))
    return qs


def gen_numeral_from_words(n_qs: int) -> list:
    qs = []
    seen = set()
    tries = 0
    while len(qs) < n_qs and tries < n_qs * 5:
        tries += 1
        num = random_big_number(5, 8)
        if num in seen:
            continue
        seen.add(num)
        words = number_to_indian_words(num)
        ans_indian = indian_commas(num)
        ans_intl = intl_commas(num)
        qs.append(Q(
            "fill",
            f"Write the numeral (Indian system): \"{words.capitalize()}\".",
            answer=[ans_indian, str(num), ans_intl, ans_indian.replace(",", "")],
            explain=f"<strong>{ans_indian}</strong> ({ans_intl} in the International system).",
            hint="Crore = 1,00,00,000. Lakh = 1,00,000. Thousand = 1,000."
        ))
    return qs


def gen_words_from_numeral(n_qs: int) -> list:
    qs = []
    seen = set()
    tries = 0
    while len(qs) < n_qs and tries < n_qs * 5:
        tries += 1
        num = random_big_number(5, 8)
        if num in seen:
            continue
        seen.add(num)
        words = number_to_indian_words(num)
        # Accept variations: capitalisation, hyphenation, "and"
        variants = {
            words,
            words.replace('-', ' '),
            words + ' only',
        }
        qs.append(Q(
            "fill",
            f"Write {indian_commas(num)} in <strong>words</strong> (Indian system).",
            answer=list(variants),
            explain=f"<strong>{words.capitalize()}</strong>.",
            hint="Read the crores group first, then lakhs, thousands, and the rest."
        ))
    return qs


def gen_place_value(n_qs: int) -> list:
    qs = []
    seen = set()
    tries = 0
    while len(qs) < n_qs and tries < n_qs * 5:
        tries += 1
        num = random_big_number(6, 9)
        s = str(num)
        L = len(s)
        idx = random.randint(0, L - 1)
        digit = int(s[idx])
        if digit == 0:
            continue  # value would be 0 — skip
        key = (num, idx)
        if key in seen:
            continue
        seen.add(key)
        place_pos = L - 1 - idx
        place_value = digit * (10 ** place_pos)
        place_name = INDIAN_PLACE_NAMES[place_pos] if place_pos < len(INDIAN_PLACE_NAMES) else f"10^{place_pos}"
        # underlined display — using HTML <u>
        display = indian_commas(num)
        # We need to underline the same digit in the comma-formatted version
        # Easier: present the plain digits with the underlined char explicit
        plain_underlined = underlined_html(s, idx)
        ans_indian = indian_commas(place_value)
        ans_intl = intl_commas(place_value)
        accepted = [
            ans_indian, str(place_value), ans_intl,
            ans_indian.replace(",", ""),
        ]
        qs.append(Q(
            "fill",
            f"What is the <strong>place value</strong> of the underlined digit in {plain_underlined}? (Indian commas, e.g. 5,00,000)",
            answer=accepted,
            explain=f"The {digit} sits in the <strong>{place_name}</strong> place → place value = <strong>{ans_indian}</strong>.",
            hint=f"Place value = digit × (its place worth)."
        ))
    return qs


def gen_face_value(n_qs: int) -> list:
    qs = []
    seen = set()
    tries = 0
    while len(qs) < n_qs and tries < n_qs * 5:
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
            f"What is the <strong>face value</strong> of the underlined digit in {plain_underlined}?",
            answer=[str(digit)],
            explain=f"Face value = the digit itself, no matter where it sits. → <strong>{digit}</strong>",
            hint="Face value is always just the digit."
        ))
    return qs


def gen_compare(n_qs: int) -> list:
    qs = []
    seen = set()
    tries = 0
    while len(qs) < n_qs and tries < n_qs * 5:
        tries += 1
        a = random_big_number(6, 9)
        # Generate a similar-magnitude b that sometimes equals or differs by a little
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
        a_disp = indian_commas(a)
        b_disp = indian_commas(b)
        qs.append(Q(
            "compare",
            f"Compare: {a_disp} ___ {b_disp}",
            options=["<", ">", "="],
            answer=ans_idx,
            explain=f"{a_disp} {sign} {b_disp}.",
            hint="Same digit-count? Compare digit-by-digit from the LEFT (highest place first)."
        ))
    return qs


# ============================================================
# Build & write
# ============================================================

if __name__ == "__main__":
    random.seed(2026)
    qs = []
    qs += gen_indian_commas(28)
    qs += gen_intl_commas(28)
    qs += gen_successor(24)
    qs += gen_predecessor(24)
    qs += gen_standard_from_expanded(26)
    qs += gen_expanded_from_standard(26)
    qs += gen_numeral_from_words(28)
    qs += gen_words_from_numeral(24)
    qs += gen_place_value(36)
    qs += gen_face_value(20)
    qs += gen_compare(36)

    print(f"Generating Big Numbers bank...")
    write_bank("big-numbers.js", "BIG_NUMBERS_BANK", qs)
    print(f"Total: {len(qs)} questions across 11 types.")
