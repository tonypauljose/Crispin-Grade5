# Crispin's World — Grade 5 Learning Portal

An interactive Grade 5 learning portal for **Crispin**, a student at Asian School Bahrain following the CBSE syllabus. Live at **[crispintony.com](https://crispintony.com)**.

Built as a pure **static HTML / CSS / JavaScript site** — no build tools, no framework, no bundler. Just open `index.html` in a browser and it works.

> Inspired by [Crislyn-Grade4](https://github.com/tonypauljose/Crislyn-Grade4) (live at crislyntony.com), built for Crispin's sister.

---

## What's inside

- **Landing page** (`index.html`) — welcome, name prompt, Bahrain clock, CR7 quote rotator, stats, action cards, Riddle of the Day teaser
- **Learning hub** (`learning.html`) — subject picker
- **Maths grid** (`maths.html`) — 10-chapter CBSE Grade 5 workbook grid
- **Chapter 1** (`chapters/ch01-numbers.html`) — Numbers 1 to 10,000. Tabs: Learn · Practice · Quiz · Worksheet. 9 lessons, 8 practice exercises, 120 quiz questions across 3 difficulty tiers.
- **Printable worksheet** (`worksheets/ch01-numbers-worksheet.html`) — A4-optimised, randomised questions on each load, answer key on a separate page.
- **Fun Zone** (`fun.html`) — Penalty shootout mini-game, Riddle of the Day, 33+ riddle archive (math / word / logic / football).

## Half-Yearly HQ (`half-yearly.html`)

The exam-preparation app, built from photographs of Crispin's own notebooks,
textbooks and workbooks in `Half Yearly Portion/`. Two halves:

**Learn** — 13 interactive lessons. Each is a short journey of single-idea
screens: an explanation, then a piece of *apparatus he plays with* (build
rectangles to discover factors, run the Sieve of Eratosthenes, grow a factor
tree, sort primes into a Venn to see what HCF and LCM actually are, drag a real
two-scale protractor, swing a chord until it becomes the diameter, flip a verb
through six tenses, feed verbs into the -ing machine, hunt adjectives in a
sentence, read नीम line by line with audio), then a few real questions. The
Next button stays locked on an apparatus screen until it has actually been used.

**Practise** — a mastery engine, not a quiz. Every skill sits in a Leitner box
(review after 1, 2, 3, 5, 8 days). A wrong answer drops it two boxes, re-opens
the teach card at the worked example, and pushes the question back into the same
session three places later; the session will not end while a skill is broken.
"Mastered" additionally requires a correct answer **on a later day**, so it
cannot be crammed the night before.

- **Today** — the day's plan, built fresh each morning: warm-up recall, any new
  lessons, new skills, the repair shop, an interleaved mixed set, and mock
  papers as the exam nears. Heavy days split into two sittings.
- **Syllabus** — every topic and skill, colour-coded from *not started* to *mastered*.
- **Repair** — the error book. Every mistake lands here and stays until the skill is right again.
- **Mocks** — timed papers with a clock, a question palette and a full review.
  The papers are blueprints, so a fresh set of questions is assembled every sitting.
- **Progress** — exam readiness, pacing against the plan, a countdown calendar, and JSON backup/restore.

Content: **10 topics · 54 skills · 800+ questions · 13 lessons · 5 mock papers**,
plus 19 maths **generators** that make unlimited fresh questions so the bank can
never be memorised. All progress is in `localStorage` (`crispin_hy_v1`).

Set the exam date in `data/hy-config.js` — the phases, the daily new-skill count
and the countdown all re-shape themselves around it.

### Checking the content

```bash
node tools/validate_hy.js   # schema, answer keys, cross-references, paper blueprints
node tools/smoke_hy.js      # mastery rules, planner pacing, every generator
node tools/render_hy.js     # headless walkthrough of the whole app (needs jsdom)
```

## Gamification

- **8 levels:** Beginner → Explorer → Learner → Adventurer → Scholar → Master → Champion → Legend.
- **21 badges (hybrid):** half football-themed (Hat-trick Hero, Free-kick Master, Golden Boot, SIUUU, Captain's Armband, Champions League, Ballon d'Or, Stadium Fan), half learning-themed (First Steps, Perfectionist, Speed Demon, Quiz Master, Streak Star/Legend, Comeback Kid, Early Bird, Night Owl, Roman Legion, Chapter Closer, Lakh Master, Practice Star).
- **XP** for opening lessons, completing practice, passing quizzes, daily streaks, penalty wins.
- **Daily streak** with Bahrain-time day boundary.
- All progress persists in `localStorage` (keys: `crispin_progress_v1`, `crispin_profile`, `crispin_sound_prefs`).

## Sound

- **Procedural Web Audio API** tones for correct / wrong / click / level-up / goal (SIUUU! ascending fanfare) / badge sparkle.
- Optional **ambient music** — C–Am–F–G sine-pad loop.
- **Both OFF by default.** User opts in via the speaker button in the top-right corner.

## WAT Framework

This repo follows the **WAT (Workflows · Agents · Tools)** architecture defined in [`CLAUDE.md`](CLAUDE.md):

- **`workflows/`** — markdown SOPs for building chapters, generating quiz banks, deploying, etc.
- **`tools/`** — Python scripts for chapter scaffolding and quiz-bank generation (see `tools/requirements.txt`).
- **`.tmp/`** — disposable scratch area (gitignored).
- **`.env`** — API keys (gitignored).

The static portal files (`index.html`, `css/`, `js/`, `chapters/`, `worksheets/`, `CNAME`) live at the repo root so GitHub Pages serves them directly. The WAT scaffolding coexists without interfering.

## Running locally

Just open `index.html` in any modern browser. No server required. If you want a live-reload server:

```bash
# Python 3
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploying

See [`workflows/deploy_github_pages.md`](workflows/deploy_github_pages.md) for the full step-by-step. In short:

1. Push to `tonypauljose/Crispin-Grade5` on GitHub.
2. Settings → Pages → Deploy from branch `main` (root).
3. Custom domain: `crispintony.com`.
4. Configure DNS at the registrar (A records + `www` CNAME — exact values in the deploy workflow).
5. Enforce HTTPS once the cert is issued.

## Licence

Personal family project — built with ❤️ and ⚽ for Crispin.
