# Workflow: Build a Printable Worksheet

**Objective:** A single-file HTML worksheet that prints cleanly on A4 with an answer key on a separate page.

## Page structure

```
Worksheet header
  └── Title / subtitle / Student fields (Name / Date / Score)
Section A  — concept 1  (5 marks)
Section B  — concept 2  (5 marks)
...
Section X  — concept n  (5 marks)
--- page break ---
Answer key (for teacher/parent)
```

## A4 rules

- Paper: **A4** (210 × 297 mm).
- Margins: **15 mm** left/right, **12 mm** top/bottom.
- Body font: **Nunito**, 11pt.
- Section headings: **Fredoka One**, 14pt, with yellow left-bar (`border-left: 4px solid #FACC15`).
- Total question count: aim for **~40 marks** per worksheet (reasonable 45-min session).
- `page-break-inside: avoid` on each section so a question can't be split across pages.

## Randomisation

- Use `App.seededRand(seed)` when you want day-stable randomness (Riddle of the Day), or pure `Math.random()` for fresh-on-reload behaviour.
- **Worksheets use fresh random numbers on every page load.** Click "New Questions" to regenerate.
- Seed answer-key array in parallel with the question generation so the answers stay in sync.

## Answer key

- Put it in a `<section class="answer-key">` with `page-break-before: always`.
- Each sub-section: `<h3>` + `<ol class="answer-key__list">`.
- The `.no-print` class hides the on-screen toolbar while printing.

## Always test

- Chrome → Ctrl+P → A4 → verify no content is clipped.
- Check that the answer key starts on page 2 (or later), not page 1.
- Print → Fit to page **disabled** (100% scale).
