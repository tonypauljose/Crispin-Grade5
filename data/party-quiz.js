/* ============================================================
   Crispin's World — Birthday Quiz Battle bank
   Mixed rounds for the party — friends shout the answer,
   the host taps "Award point" to whichever friend got it first.

   Categories: maths, english, riddle, football, crispin
   Each item: { cat, q, a, hint? }

   ⚠️  EDIT THE "ABOUT CRISPIN" SECTION BELOW BEFORE THE PARTY
   The placeholder questions are obvious — replace the answers
   so they reflect Crispin's real favorites.
   ============================================================ */

window.PARTY_QUIZ = [

  // ──────── ROUND 1: WARM-UP RIDDLES ────────
  { cat: 'riddle', q: "What has hands but cannot clap?",
    a: "A clock", hint: "Tick tock." },
  { cat: 'riddle', q: "I'm tall when I'm young and short when I'm old. What am I?",
    a: "A candle", hint: "Light me up." },
  { cat: 'riddle', q: "What gets wetter the more it dries?",
    a: "A towel", hint: "After a bath." },

  // ──────── ROUND 2: MATHS BLITZ ────────
  { cat: 'maths', q: "Quick! What is 7 × 8?",
    a: "56" },
  { cat: 'maths', q: "Round 4,562 to the nearest hundred.",
    a: "4,600", hint: "Look at the tens digit." },
  { cat: 'maths', q: "What is half of 250?",
    a: "125" },
  { cat: 'maths', q: "If a goal scores 3 points and Crispin scored 4 goals, how many points?",
    a: "12" },
  { cat: 'maths', q: "What is the smallest 4-digit number you can make using 0, 5, 2, 9 (each once)?",
    a: "2,059", hint: "Zero can't be first." },
  { cat: 'maths', q: "I'm thinking of a number. Double it and add 3, you get 17. What's the number?",
    a: "7" },

  // ──────── ROUND 3: ENGLISH WORD PLAY ────────
  { cat: 'english', q: "What's the plural of \"mouse\" (the animal)?",
    a: "Mice" },
  { cat: 'english', q: "Spell BIRTHDAY backwards.",
    a: "YADHTRIB" },
  { cat: 'english', q: "Is \"quickly\" a noun, verb, adjective, or adverb?",
    a: "Adverb", hint: "It tells you HOW you do something." },
  { cat: 'english', q: "What word means the opposite of \"brave\"?",
    a: "Cowardly / scared / afraid" },
  { cat: 'english', q: "What's a word that rhymes with \"cake\" and means a body of water?",
    a: "Lake" },

  // ──────── ROUND 4: FOOTBALL TRIVIA ────────
  { cat: 'football', q: "How many players from one team are on the pitch in a football match?",
    a: "11" },
  { cat: 'football', q: "What do you call it when one player scores 3 goals in one match?",
    a: "A hat-trick" },
  { cat: 'football', q: "Which country won the 2022 FIFA World Cup?",
    a: "Argentina" },
  { cat: 'football', q: "How many minutes long is a standard football match (without extra time)?",
    a: "90 minutes", hint: "Two halves of 45 each." },
  { cat: 'football', q: "What colour card means a player is sent off?",
    a: "Red card" },
  { cat: 'football', q: "Who is famous for the celebration \"SIIIUUU!\"?",
    a: "Cristiano Ronaldo" },

  // ──────── ROUND 5: TRICKY RIDDLES ────────
  { cat: 'riddle', q: "I have cities but no houses, mountains but no trees, and water but no fish. What am I?",
    a: "A map" },
  { cat: 'riddle', q: "The more you take, the more you leave behind. What am I?",
    a: "Footsteps" },
  { cat: 'riddle', q: "What has a face and two hands but no arms or legs?",
    a: "A clock" },
  { cat: 'riddle', q: "I am an odd number. Take away one letter and I become even. What number am I?",
    a: "Seven (remove the 's' → even)", hint: "Think of the WORD, not the digit." },

  // ──────── ROUND 6: ABOUT CRISPIN — FAMILY & FAVOURITES ────────
  // A few of these have placeholder answers — edit them in 30 seconds
  // to reflect Crispin's real favourites. The family ones are already filled in.
  { cat: 'crispin', q: "What's the name of Crispin's sister?",
    a: "Crislyn" },
  { cat: 'crispin', q: "What does Crispin call his grandfather?",
    a: "Appapa" },
  { cat: 'crispin', q: "What does Crispin call his grandmother?",
    a: "Ammama" },
  { cat: 'crispin', q: "How many cousins of Crispin are at the party today?",
    a: "Two — Casper and Canes" },
  { cat: 'crispin', q: "What grade is Crispin in, and what school?",
    a: "Grade 5 at Asian School Bahrain" },
  { cat: 'crispin', q: "What is Crispin's jersey number on his learning portal?",
    a: "Number 7" },
  { cat: 'crispin', q: "How old is Crispin turning today?",
    a: "10!" },
  { cat: 'crispin', q: "What is Crispin's favourite football team?",
    a: "EDIT_ME — e.g. Real Madrid",
    hint: "Hint: edit me in data/party-quiz.js" },
  { cat: 'crispin', q: "What is Crispin's favourite food?",
    a: "EDIT_ME — e.g. Pizza" },

  // ──────── ROUND 7: FINAL CHALLENGE — BIG QUESTIONS ────────
  { cat: 'maths', q: "What is 12 × 12?",
    a: "144" },
  { cat: 'football', q: "What is the maximum number of substitutes most football leagues now allow per team?",
    a: "5" },
  { cat: 'riddle', q: "What goes up but never comes down?",
    a: "Your age!" }

];
