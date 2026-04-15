"""Generate quiz-bank questions for a chapter.

Two modes:

  procedural — template-based number questions (100% reliable for arithmetic)
  claude     — calls the Anthropic API with prompt caching on the system block

Usage:
    python tools/generate_quiz_bank.py --chapter 02 --tier explorer --mode procedural --count 40
    python tools/generate_quiz_bank.py --chapter 02 --tier champion --mode claude --count 40
"""
from __future__ import annotations

import argparse
import json
import os
import random
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


# ============================================================
# Procedural generators
# ============================================================

def _fmt(n: int) -> str:
    return f"{n:,}"


def gen_place_value(n: int = 40) -> list[dict]:
    qs: list[dict] = []
    place_names = ["ones", "tens", "hundreds", "thousands"]
    while len(qs) < n:
        num = random.randint(1000, 9999)
        digits = str(num)
        pos = random.randint(0, 3)
        digit = int(digits[3 - pos])
        if digit == 0:
            continue
        correct = digit * (10 ** pos)
        wrong = {digit, digit * 10, digit * 100, digit * 1000} - {correct}
        options = [correct] + list(wrong)[:3]
        random.shuffle(options)
        qs.append({
            "type": "mcq",
            "q": f"What is the place value of {digit} in {_fmt(num)}?",
            "options": [str(o) for o in options],
            "answer": options.index(correct),
            "explain": f"{digit} is in the {place_names[pos]} place, so its value is {correct}.",
        })
    return qs


def gen_compare(n: int = 40) -> list[dict]:
    qs: list[dict] = []
    while len(qs) < n:
        a = random.randint(1000, 9999)
        b = a + random.choice([-5, -1, 0, 1, 5, 10, 100, -100, 250, -250])
        b = max(1000, min(9999, b))
        sign_idx = 0 if a < b else 1 if a > b else 2
        qs.append({
            "type": "compare",
            "q": f"Compare: {_fmt(a)} ___ {_fmt(b)}",
            "options": ["<", ">", "="],
            "answer": sign_idx,
            "explain": f"{_fmt(a)} {'<' if a < b else '>' if a > b else '='} {_fmt(b)}.",
        })
    return qs


def gen_rounding(n: int = 40) -> list[dict]:
    qs: list[dict] = []
    for _ in range(n):
        num = random.randint(1000, 9999)
        base = random.choice([10, 100, 1000])
        correct = round(num / base) * base
        opts = sorted({correct, correct - base, correct + base, (num // base) * base})
        while len(opts) < 4:
            opts.append(opts[-1] + base)
        opts = opts[:4]
        random.shuffle(opts)
        qs.append({
            "type": "mcq",
            "q": f"Round {_fmt(num)} to the nearest {base:,}.",
            "options": [_fmt(o) for o in opts],
            "answer": opts.index(correct),
            "explain": f"Look at the digit after the {base:,}s place.",
        })
    return qs


PROCEDURAL_GENERATORS = {
    "place-value": gen_place_value,
    "compare": gen_compare,
    "rounding": gen_rounding,
}


# ============================================================
# Claude API
# ============================================================

SYSTEM_PROMPT_GRADE5 = """You are a Grade 5 CBSE Mathematics tutor in Bahrain, generating quiz questions for Crispin (age 10). He loves football and Ronaldo.

Rules for ALL questions:
- Reading level: Grade 3-5. Short sentences.
- Prefer metric units (cm, m, kg, g, L). Use BHD or rupees for money when relevant.
- Where natural, use football/Ronaldo examples — but don't force it.
- Return ONLY valid JSON matching the schema below. No prose, no markdown fences.
- Each question must have a truthful `explain` field that tells WHY the answer is correct.

JSON schema for one question:
{
  "type": "mcq" | "tf" | "fill" | "compare",
  "q": "string",
  "options": ["A","B","C","D"],  // present for mcq AND compare only; compare options are always ["<", ">", "="]
  "answer": 0,                   // zero-indexed for mcq/tf/compare; for tf: 0=True, 1=False; for fill: string or array of accepted strings
  "explain": "string",
  "hint": "string" // optional but recommended for Champion tier
}

Return an ARRAY of question objects.
"""


def gen_claude(chapter: str, tier: str, count: int) -> list[dict]:
    try:
        from anthropic import Anthropic
    except ImportError:
        sys.exit("pip install anthropic first")

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        sys.exit("ANTHROPIC_API_KEY env var not set (put it in .env and source it)")

    client = Anthropic()

    user_msg = (
        f"Generate exactly {count} Grade 5 Mathematics questions for Chapter {chapter}, "
        f"{tier.upper()} tier. "
        f"Explorer: MCQ + TF basics. Adventurer: fill-blank + compare. "
        f"Champion: riddles, word problems, error-spotting, patterns. "
        f"Return a JSON array only, no prose."
    )

    resp = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=8000,
        system=[{
            "type": "text",
            "text": SYSTEM_PROMPT_GRADE5,
            "cache_control": {"type": "ephemeral"},
        }],
        messages=[{"role": "user", "content": user_msg}],
    )

    text = resp.content[0].text.strip()
    if text.startswith("```"):
        text = text.split("```")[1].lstrip("json\n")
    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        sys.exit(f"Claude returned invalid JSON: {e}\n---\n{text[:400]}")


# ============================================================
# CLI
# ============================================================

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--chapter", required=True, help="Chapter number like 01, 02")
    ap.add_argument("--tier", required=True, choices=["explorer", "adventurer", "champion"])
    ap.add_argument("--mode", required=True, choices=["procedural", "claude"])
    ap.add_argument("--count", type=int, default=40)
    ap.add_argument("--generator", default="place-value", help="Procedural generator name")
    ap.add_argument("--out", default=None, help="Output path (defaults to data/chNN-*.js)")
    args = ap.parse_args()

    if args.mode == "procedural":
        gen = PROCEDURAL_GENERATORS.get(args.generator)
        if not gen:
            sys.exit(f"Unknown generator: {args.generator}. Options: {list(PROCEDURAL_GENERATORS)}")
        questions = gen(args.count)
    else:
        questions = gen_claude(args.chapter, args.tier, args.count)

    # Print to stdout; user pastes into data file manually (safer than auto-patch)
    payload = json.dumps(questions, indent=2, ensure_ascii=False)
    print(f"// Generated {len(questions)} {args.tier} questions for Chapter {args.chapter}")
    print(payload)
    print(f"\n// ✓ Paste the array above into data/ch{args.chapter}-*.js under `{args.tier}: [...]`")
    return 0


if __name__ == "__main__":
    sys.exit(main())
