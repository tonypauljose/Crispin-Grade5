"""Scaffold a new chapter: chapter HTML, worksheet HTML, data stub.

Usage:
    python tools/scaffold_chapter.py --num 2 --slug four-operations --title "The Four Operations"

Produces:
    chapters/ch02-four-operations.html
    worksheets/ch02-four-operations-worksheet.html
    data/ch02-four-operations.js

It then patches maths.html to unlock the card for that chapter.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


CHAPTER_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ch {n} · {title} — Crispin's World</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/common.css">
  <link rel="stylesheet" href="../css/components.css">
  <link rel="stylesheet" href="../css/animations.css">
</head>
<body>
  <main class="page">
    <div class="container">
      <section class="section">
        <p class="muted"><a href="../maths.html">← Back to Mathematics</a></p>
        <h1>📘 Chapter {n} · {title}</h1>
        <p class="lead">Grade 5 · CBSE · {title}.</p>
      </section>

      <div class="tabs" role="tablist">
        <button class="tab-btn active" data-target="tab-learn">📖 Learn</button>
        <button class="tab-btn" data-target="tab-practice">✍️ Practice</button>
        <button class="tab-btn" data-target="tab-quiz">🎯 Quiz</button>
        <button class="tab-btn" data-target="tab-worksheet">🖨️ Worksheet</button>
      </div>

      <section id="tab-learn" class="tab-panel active">
        <!-- TODO: add lesson cards -->
        <p class="muted">Lessons coming soon.</p>
      </section>
      <section id="tab-practice" class="tab-panel">
        <!-- TODO: add practice exercises -->
        <p class="muted">Practice coming soon.</p>
      </section>
      <section id="tab-quiz" class="tab-panel">
        <div class="quiz-tier-picker" id="tier-picker"></div>
        <div id="quiz-host"></div>
      </section>
      <section id="tab-worksheet" class="tab-panel">
        <a class="btn btn-primary" href="../worksheets/ch{nn}-{slug}-worksheet.html" target="_blank">Open worksheet 📄</a>
      </section>

    </div>
    <footer class="footer"><div class="container">Made with ❤️ and ⚽ for Crispin</div></footer>
  </main>

  <script src="../js/common.js"></script>
  <script src="../js/progress.js"></script>
  <script src="../js/quiz-engine.js"></script>
  <script src="../data/ch{nn}-{slug}.js"></script>
  <script>
    App.renderTopBar('maths');
    Progress.markVisit();
    Progress.renderGamebar();
    App.wireTabs();
    App.wireLessons();
    // TODO: render tier picker + mount quiz engine like Chapter 1
  </script>
</body>
</html>
"""


DATA_STUB = """/* ============================================================
   Chapter {n} — {title} — Quiz bank
   TODO: populate 40 questions per tier.
   ============================================================ */

window.CH{nn}_BANK = {{
  explorer: [
    // {{ type: 'mcq', q: '...', options: [...], answer: 0, explain: '...' }}
  ],
  adventurer: [],
  champion: []
}};
"""


WORKSHEET_STUB = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ch {n} Worksheet · {title}</title>
  <link rel="stylesheet" href="../css/common.css">
  <link rel="stylesheet" href="../css/components.css">
  <link rel="stylesheet" href="../css/print.css">
</head>
<body class="worksheet-page">
  <div class="no-print" style="position:sticky; top:0; background:#6B21A8; color:white; padding:12px 20px; text-align:center;">
    <a href="../chapters/ch{nn}-{slug}.html" style="color:#FACC15;">← Back to chapter</a>
    <button class="btn btn-yellow btn-sm" onclick="window.print()" style="margin-left:12px;">🖨️ Print</button>
  </div>
  <div class="worksheet">
    <h1>📘 {title}</h1>
    <p class="subtitle">Grade 5 · CBSE · Chapter {n} · Worksheet</p>
    <!-- TODO: add worksheet sections + randomised questions + answer key -->
  </div>
  <script src="../js/common.js"></script>
</body>
</html>
"""


def main() -> int:
    ap = argparse.ArgumentParser(description="Scaffold a new chapter")
    ap.add_argument("--num", type=int, required=True, help="Chapter number (e.g. 2)")
    ap.add_argument("--slug", type=str, required=True, help="URL slug (e.g. four-operations)")
    ap.add_argument("--title", type=str, required=True, help='Chapter title (e.g. "The Four Operations")')
    args = ap.parse_args()

    nn = f"{args.num:02d}"
    ctx = dict(n=args.num, nn=nn, slug=args.slug, title=args.title)

    targets = {
        ROOT / "chapters" / f"ch{nn}-{args.slug}.html": CHAPTER_TEMPLATE.format(**ctx),
        ROOT / "data" / f"ch{nn}-{args.slug}.js": DATA_STUB.format(**ctx),
        ROOT / "worksheets" / f"ch{nn}-{args.slug}-worksheet.html": WORKSHEET_STUB.format(**ctx),
    }

    for path, content in targets.items():
        if path.exists():
            print(f"! already exists: {path.relative_to(ROOT)}")
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8")
            print(f"✓ created: {path.relative_to(ROOT)}")

    print("\nNext steps:")
    print(f"  1. Draft lessons in chapters/ch{nn}-{args.slug}.html")
    print(f"  2. Generate quiz bank: python tools/generate_quiz_bank.py --chapter {nn} --tier explorer")
    print(f"  3. Unlock the card in maths.html (remove `locked` class, update href)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
