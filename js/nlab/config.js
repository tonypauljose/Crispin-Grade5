/* ============================================================
   NUMBERS LAB — per-child config  (CRISPIN, Grade 5)
   This is the ONLY file that differs meaningfully between the
   two sites. Crislyn's copy swaps name/grade/accent/level/mascot.
   ============================================================ */
window.NLAB_CONFIG = {
  child: 'crispin',
  name: 'Crispin',
  grade: 5,
  age: 10,
  // accent theming — injected onto the .nlab root at runtime
  accent: '#7C3AED',
  accent2: '#14B8A6',
  // Grade 5 → start a notch higher
  defaultLevel: 'adventurer',     // explorer | adventurer | champion
  storageKey: 'nlab_progress_v1',
  homeHref: 'maths.html',         // where the ✕ exit returns to
  hostXP: 'Progress',             // window.Progress.addXP(n, reason)  (feature-detected)
  mascot: null,                   // Crispin has no site mascot
  welcome: "Welcome to your Numbers Lab, Crispin! I'm Digit. Let's uncover the secret life of numbers — from place value to the binary code computers think in."
};
