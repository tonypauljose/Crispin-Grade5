"""Generate new riddles for data/riddles.js via the Claude API.

Usage:
    python tools/generate_riddles.py --category football --count 5
    python tools/generate_riddles.py --category math --count 10

Output is printed as JSON. Paste into data/riddles.js manually.
"""
from __future__ import annotations

import argparse
import json
import os
import sys

SYSTEM_PROMPT = """You write family-friendly riddles for Crispin, a 10-year-old in Bahrain who loves football and Ronaldo.

Rules:
- Age 10-12 reading level. Short, playful.
- No scary or sensitive themes.
- Each riddle has: `q` (the riddle), `a` (the answer), `hint` (one-line clue), `category` (math|word|logic|football).
- Math riddles: use numbers up to 10,000 or simple fractions.
- Football riddles: reference Ronaldo, football rules, or famous moments.
- Return ONLY a JSON array. No prose, no markdown fences.
"""


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--category", required=True, choices=["math", "word", "logic", "football"])
    ap.add_argument("--count", type=int, default=5)
    args = ap.parse_args()

    try:
        from anthropic import Anthropic
    except ImportError:
        sys.exit("pip install anthropic first")

    if not os.environ.get("ANTHROPIC_API_KEY"):
        sys.exit("Set ANTHROPIC_API_KEY (put in .env and source).")

    client = Anthropic()
    user_msg = f"Generate {args.count} {args.category} riddles for Crispin. Return JSON array only."

    resp = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=3000,
        system=[{
            "type": "text",
            "text": SYSTEM_PROMPT,
            "cache_control": {"type": "ephemeral"},
        }],
        messages=[{"role": "user", "content": user_msg}],
    )

    text = resp.content[0].text.strip()
    if text.startswith("```"):
        text = text.split("```")[1].lstrip("json\n")
    try:
        riddles = json.loads(text)
    except json.JSONDecodeError as e:
        sys.exit(f"Claude returned invalid JSON: {e}\n{text[:400]}")

    print(json.dumps(riddles, indent=2, ensure_ascii=False))
    print(f"\n// ✓ {len(riddles)} new {args.category} riddles. Paste into data/riddles.js.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
