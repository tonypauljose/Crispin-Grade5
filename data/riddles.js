/* ============================================================
   Crispin's World — Riddles bank
   30+ riddles across categories: math, logic, word, football
   ============================================================ */

window.RIDDLES = [
  // ---- Math riddles ----
  { category: 'math', q: "I am a 4-digit number. My thousands digit is 5, my hundreds digit is 0, my tens digit is 0, and my ones digit is 0. Who am I?", a: "5,000", hint: "Just 5 thousand and nothing else." },
  { category: 'math', q: "I am the largest 3-digit number. Who am I?", a: "999", hint: "Just before 4 digits begin." },
  { category: 'math', q: "I am an odd number. Take away one letter and I become even. What number am I?", a: "Seven (take away the 's' → even)", hint: "Think of the word, not the digit." },
  { category: 'math', q: "I am the Roman numeral for 9. Flip me upside down and I look like another number. What am I?", a: "IX (upside-down looks like XI, which is 11)", hint: "Two letters, one vowel." },
  { category: 'math', q: "What 4-digit number uses each of the digits 1, 2, 3, 4 exactly once and is the smallest possible?", a: "1,234", hint: "Smallest digit first." },
  { category: 'math', q: "I have digits that read the same forwards and backwards. I am 4 digits and all my digits are different pairs. An example is 1221. Name another.", a: "e.g. 3443, 2552, 9009 (any 4-digit palindrome)", hint: "First and last must match; middle two must match." },
  { category: 'math', q: "I am a number. When rounded to the nearest 100, I become 5,000. When rounded to the nearest 10, I become 4,960. Who am I?", a: "4,955 (rounds up at both levels)", hint: "Tens digit is 5 or 6." },
  { category: 'math', q: "Add me to my successor. If that sum is 9, who am I?", a: "4 (4 + 5 = 9)", hint: "Successor means +1." },
  { category: 'math', q: "If you multiply any 4-digit number by me, you get 0. Who am I?", a: "Zero", hint: "The most powerful digit!" },
  { category: 'math', q: "I am a Roman numeral. I look like an X but with two more Xs. Who am I?", a: "XXX (= 30)", hint: "Three tens." },

  // ---- Word / letter riddles ----
  { category: 'word', q: "I am tall when I am young, and I am short when I am old. What am I?", a: "A candle", hint: "It gets used up." },
  { category: 'word', q: "What has keys but can't open locks?", a: "A piano (or a keyboard)", hint: "Music or typing." },
  { category: 'word', q: "What has hands but cannot clap?", a: "A clock", hint: "It tells the time." },
  { category: 'word', q: "I have cities but no houses, mountains but no trees, and water but no fish. What am I?", a: "A map", hint: "You fold me in your bag." },
  { category: 'word', q: "The more you take, the more you leave behind. What am I?", a: "Footsteps", hint: "You leave me while walking." },
  { category: 'word', q: "What gets wetter the more it dries?", a: "A towel", hint: "You use it after a bath." },
  { category: 'word', q: "I'm light as a feather, but even the strongest person can't hold me for more than a few minutes. What am I?", a: "Your breath", hint: "Hold it and count." },
  { category: 'word', q: "I have a neck but no head, two arms but no hands. What am I?", a: "A shirt", hint: "You wear me every day." },

  // ---- Logic / classic riddles ----
  { category: 'logic', q: "A rooster lays an egg on top of a triangular roof. Which side does it roll down?", a: "Neither — roosters don't lay eggs!", hint: "Who lays eggs: male or female chickens?" },
  { category: 'logic', q: "If there are 5 apples and you take away 3, how many do you have?", a: "3 — the ones you took!", hint: "How many are with YOU, not the pile." },
  { category: 'logic', q: "What month has 28 days?", a: "All of them (every month has at least 28 days)", hint: "Think about every month." },
  { category: 'logic', q: "You see a boat filled with people. It has not sunk, but when you look again you don't see a single person on the boat. How is that possible?", a: "All the people are married (not single)", hint: "The word 'single' has another meaning." },
  { category: 'logic', q: "I am an odd number. Take away one letter and I become even. What am I?", a: "'Seven' (remove 's' → 'even')", hint: "Spelling trick." },
  { category: 'logic', q: "Three doctors say that Robert is their brother. Robert says he has no brothers. Who is lying?", a: "No one — the doctors are his sisters!", hint: "'Doctor' doesn't mean 'man'." },
  { category: 'logic', q: "Two fathers and two sons sit down to eat eggs. They eat exactly three eggs and each has one. How?", a: "They are a grandfather, a father, and a son (3 people, 2 fathers, 2 sons).", hint: "One person counts as two." },

  // ---- Football / sport riddles ----
  { category: 'football', q: "I am Ronaldo's famous celebration word when I score a goal. What do I shout?", a: "SIIIUUUU!", hint: "It's a long cheer!" },
  { category: 'football', q: "A football match lasts 90 minutes. If half-time is 15 minutes, how long is the full event (not counting stoppage time)?", a: "105 minutes (90 playing + 15 break)", hint: "Add the break." },
  { category: 'football', q: "I am the shape of a football field. What am I?", a: "A rectangle", hint: "Four corners, two pairs of equal sides." },
  { category: 'football', q: "Ronaldo wears jersey number 7. In Roman numerals, how is 7 written?", a: "VII", hint: "Five plus two." },
  { category: 'football', q: "How many players are there in a football team on the pitch at kick-off?", a: "11 (including the goalkeeper)", hint: "10 outfield + 1 keeper." },
  { category: 'football', q: "If a penalty shootout ends 5-4, how many penalties were scored in total?", a: "9", hint: "Just add them." },
  { category: 'football', q: "A hat-trick is scoring how many goals in one match?", a: "Three", hint: "Same as the number of strikes in baseball or a magic charm." },
  { category: 'football', q: "Ronaldo has played for Sporting, Manchester United, Real Madrid, Juventus, Manchester United again, and Al-Nassr. How many different clubs is that?", a: "5 (United counts once)", hint: "Count unique clubs." }
];
