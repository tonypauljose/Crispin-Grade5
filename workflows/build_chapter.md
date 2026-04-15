# Workflow: Build a New Chapter

**Objective:** Add a new chapter to the Maths portal end-to-end (Learn, Practice, Quiz, Worksheet, registered in `maths.html`).

## Inputs
- Chapter number (e.g. `2`)
- Slug (e.g. `four-operations`)
- Full chapter title (e.g. `"The Four Operations"`)
- CBSE Grade 5 textbook scope for that chapter
- List of topics (for Learn lessons)

## Steps

1. **Read the CBSE scope.** Open the workbook (or a photo of the chapter) and list every sub-topic. Aim for 8–10 lesson cards.

2. **Scaffold the files.**
   ```bash
   python tools/scaffold_chapter.py --num 2 --slug four-operations --title "The Four Operations"
   ```
   This creates:
   - `chapters/ch02-four-operations.html`
   - `worksheets/ch02-four-operations-worksheet.html`
   - `data/ch02-four-operations.js` (empty quiz bank stub)

3. **Draft the Learn tab.** Fill the lesson cards with: concept → example box → tip/watch-out box. Keep each lesson bite-sized. Don't exceed what a 10-year-old can finish in ~5 minutes.

4. **Build the Practice tab.** Aim for 8 exercise sets. Each set: 4–5 items. Use the same `.exercise`/`.ex-item` markup as Chapter 1 — the scoring JS is already in place.

5. **Generate the quiz bank.**
   ```bash
   # Procedural (for numeric questions — place value, four ops, etc.)
   python tools/generate_quiz_bank.py --chapter 02 --tier explorer --mode procedural --count 40

   # Claude API (for word problems, riddles, error-spotting)
   python tools/generate_quiz_bank.py --chapter 02 --tier champion --mode claude --count 40
   ```
   Target counts: Explorer 40 · Adventurer 40 · Champion 40 = **120 questions**.

6. **Hand-review the Champion tier.** Word problems and riddles need a human pass for age-appropriateness and wordings that make sense in Bahrain/India.

7. **Build the worksheet.** Mirror Chapter 1's pattern: 6–8 sections, randomised questions on page load, answer key after `page-break-before: always`.

8. **Register in `maths.html`.** Update the chapter card:
   - Remove `locked` class.
   - Swap the "Coming soon" badge for "Ready now".
   - Fix the `href` to the new chapter file.

9. **Validate.**
   ```bash
   python tools/validate_links.py
   ```
   Fix any broken links.

10. **Smoke test in the browser:**
    - All 4 tabs render.
    - Practice exercises auto-score.
    - Quiz runs through all 3 tiers (force-unlock via DevTools `localStorage` if needed).
    - Worksheet prints cleanly on A4.
    - Progress XP persists on reload.

11. **Commit.**
    ```bash
    git add chapters/ worksheets/ data/ maths.html
    git commit -m "Add Chapter 2: The Four Operations"
    git push
    ```

## Edge cases

- **Indian numbering:** Chapters dealing with ≥ 1 lakh must use `App.formatIndian()`. Up to 99,999 both systems agree.
- **Roman numerals:** Stop at `XC` (90) for Chapter 1; later chapters can use `C` and beyond.
- **Question validity:** Any `fill`-type question must accept multiple valid phrasings (e.g. "four thousand" and "four thousand and"). Stored as an array in the `answer` field.
