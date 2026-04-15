# Workflow: Validate Site Before Deploy

**Objective:** Catch broken links, console errors, layout bugs, and storage corruption before pushing.

## Automated checks

### 1. Link validator
```bash
python tools/validate_links.py
```
Exits 0 if all internal `<a href>` and `<script src>` / `<link href>` resolve. Exits 1 with a report otherwise.

### 2. HTML validity (optional)
```bash
# If you have `tidy` installed
tidy -q -e index.html learning.html maths.html fun.html
```

## Manual checklist

### Core flow
- [ ] Open `index.html` in a clean browser (Chrome DevTools → Application → Clear storage first).
- [ ] Name prompt appears on first visit.
- [ ] Entering a name → greeting appears + toast shows.
- [ ] CR7 quote rotates.
- [ ] Bahrain clock ticks every second.
- [ ] Sound is OFF by default — speaker icon → toggle SFX on → click a tab → hear a click.
- [ ] Music toggle → faint pads play in loop.

### Learning flow
- [ ] Navigate Home → Learning → Maths.
- [ ] Click Chapter 1. All 4 tabs work.
- [ ] Learn tab: open/close all 9 lessons. Roman numeral try-it works.
- [ ] Practice tab: complete Exercise 1 with wrong answers → see red. Complete with all correct → see confetti + XP award.
- [ ] Quiz tab: run Explorer. Check that scoring works, tier unlock toast appears at ≥70%.
- [ ] Adventurer unlocks after Explorer pass.
- [ ] Worksheet tab: opens worksheet page, print preview is A4-clean, answer key on separate page.

### Fun Zone
- [ ] `fun.html` loads.
- [ ] Penalty shootout: click a region, "Shoot" enabled, ball animates, keeper dives.
- [ ] Score 3/5 → confetti + SIUUU badge earned.
- [ ] Riddle of the Day renders. Tap to flip.
- [ ] Riddle archive: filter buttons work; all 33 riddles render; each flips correctly.

### Persistence
- [ ] DevTools → Application → Local Storage → `crispin_progress_v1` has XP + badges.
- [ ] Refresh page — XP and badges persist.
- [ ] `crispin_profile` holds name + firstVisit.
- [ ] `crispin_sound_prefs` holds current toggle state.

### Responsive
- [ ] Chrome DevTools → Toggle device toolbar → iPhone 12.
- [ ] Hero stacks, cards adapt, tabs horizontally scroll if needed.
- [ ] No horizontal page scroll.
- [ ] Top bar remains readable.

### Print
- [ ] Open worksheet → Ctrl+P.
- [ ] A4, no scaling.
- [ ] Student section fits on page 1.
- [ ] Answer key starts on page 2 (or later).
- [ ] No truncation.

### Lighthouse (mobile)
```
Chrome DevTools → Lighthouse → Mobile → Run
Target: ≥90 Performance · ≥90 Accessibility · ≥90 Best Practices
```

### Post-deploy (after DNS)
- [ ] `https://crispintony.com` loads with padlock.
- [ ] `www.crispintony.com` redirects.
- [ ] Mobile tap test on phone.
