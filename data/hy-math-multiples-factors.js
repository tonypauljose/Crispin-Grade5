/* ============================================================
   HALF-YEARLY HQ — Maths · Multiples and Factors (Ch-3, June)
   Source extraction: .tmp/hy-extract/math-multiples-factors.md
   (class notebook pp.1-4 + printed workbook pp.30-41)

   Crispin CAN already list multiples, factors, common multiples
   and common factors. He has done NO work at all on prime
   factorisation, HCF, LCM, the theory blanks, the 1-100 sieve
   or the word problems — workbook pp.35-41 are entirely blank.
   Those skills are taught here from zero.
   ============================================================ */

window.HY_TOPICS = (window.HY_TOPICS || []).concat([{
  id: "math-multiples-factors",
  subject: "maths",
  name: "Multiples and Factors",
  emoji: "🔢",
  blurb: "Factors, multiples, primes, prime factorisation, HCF and LCM. Half of this chapter is still blank in your workbook, so it is the biggest single win available.",
  source: "Class notebook, 4 pages (23-6-2026) + printed workbook 'Multiples and Factors, Chapter-3 (June)', pp. 30-41",
  examWeight: 55
}]);

window.HY_SKILLS = (window.HY_SKILLS || []).concat([

{
  id: "math-multiples-factors.multiples",
  subject: "maths",
  topic: "math-multiples-factors",
  name: "Write the multiples",
  canDo: "I can write the first five multiples of a number, and the nth multiple, using the X 1, X 2, X 3 method.",
  weight: 4,
  difficulty: 1,
  prereq: [],
  teach: {
    hook: "Skip-count in 7s: 7, 14, 21, 28. Every number you land on is a multiple of 7. That is the whole idea.",
    explain: "<p>A <strong>multiple</strong> of a number is what you get when you multiply that number by 1, 2, 3, 4, 5 and so on.</p><p>The school method is a column. Write <strong>9 X 1 = 9</strong>, <strong>9 X 2 = 18</strong>, <strong>9 X 3 = 27</strong> and so on down the page, then write one answer line: <em>1st five multiples of 9 = 9, 18, 27, 36, 45</em>.</p><p>The <strong>nth multiple</strong> is just the number times n. The 4th multiple of 8 means 8 X 4.</p>",
    worked: [
      {
        q: "Write down the first 5 multiples of 15.",
        steps: [
          "15 X 1 = 15",
          "15 X 2 = 30",
          "15 X 3 = 45",
          "15 X 4 = 60",
          "15 X 5 = 75",
          "Answer line: 1st five multiples of 15 = 15, 30, 45, 60, 75"
        ],
        a: "15, 30, 45, 60, 75"
      },
      {
        q: "Write the 4th multiple of 8.",
        steps: [
          "The 4th multiple means multiply by 4.",
          "8 X 4 = 32.",
          "One line is the whole answer. No list needed."
        ],
        a: "32"
      }
    ],
    remember: [
      "The FIRST multiple of a number is the number itself. First multiple of 32 is 32.",
      "nth multiple = number X n.",
      "Multiples never run out. There is no greatest multiple of any number.",
      "Write X between the two numbers, never =. It is 12 X 3 = 36."
    ],
    watchOut: "Your list must START at the number itself. You once wrote the first five multiples of 32 as 36, 64, 96, 128, 160. The 36 should be 32."
  },
  items: [
    { id: "math-multiples-factors.multiples.i01", type: "fill", level: 1, q: "The first multiple of 32 is ____", accept: ["32"], placeholder: "number", hint: "32 X 1 = ?", explain: "Every number's first multiple is itself, because n X 1 = n. So it is 32." },
    { id: "math-multiples-factors.multiples.i02", type: "fillMulti", level: 1, q: "Write down the first 5 multiples of <strong>9</strong>.", blanks: [ { label: "9 X 1", accept: ["9"] }, { label: "9 X 2", accept: ["18"] }, { label: "9 X 3", accept: ["27"] }, { label: "9 X 4", accept: ["36"] }, { label: "9 X 5", accept: ["45"] } ], explain: "Add 9 each time: 9, 18, 27, 36, 45. Watch the third one, 27, not 21." },
    { id: "math-multiples-factors.multiples.i03", type: "order", level: 1, q: "Put the first five multiples of 12 in order.", answer: ["12","24","36","48","60"], explain: "12 X 1 = 12, 12 X 2 = 24, 12 X 3 = 36, 12 X 4 = 48, 12 X 5 = 60." },
    { id: "math-multiples-factors.multiples.i04", type: "fill", level: 1, q: "Write the 4<sup>th</sup> multiple of 8.", accept: ["32"], placeholder: "number", hint: "8 X 4", explain: "4th multiple means X 4, so 8 X 4 = 32." },
    { id: "math-multiples-factors.multiples.i05", type: "mcq", level: 1, q: "Write the 6<sup>th</sup> multiple of 6.", options: ["12","30","36","42"], answer: 2, explain: "6 X 6 = 36. Choosing 30 means you counted 6 X 5 by mistake." },
    { id: "math-multiples-factors.multiples.i06", type: "fill", level: 1, q: "The third multiple of 10 is ____", accept: ["30"], placeholder: "number", explain: "10 X 3 = 30. This exact blank is on page 38 of your workbook." },
    { id: "math-multiples-factors.multiples.i07", type: "fill", level: 1, q: "The 4<sup>th</sup> multiple of 12 is ____", accept: ["48"], placeholder: "number", explain: "12 X 4 = 48. Also on page 38 of your workbook." },
    { id: "math-multiples-factors.multiples.i08", type: "mcq", level: 2, q: "Crispin wrote: <em>The first five multiples of 32 = 36, 64, 96, 128, 160.</em> What is wrong?", options: ["Nothing, it is correct","The first number should be 32, not 36","The last number should be 150","There should be six numbers"], answer: 1, hint: "What is 32 X 1?", explain: "32 X 1 = 32, so the list starts at 32: 32, 64, 96, 128, 160. The rest of the list was right." },
    { id: "math-multiples-factors.multiples.i09", type: "mcq", level: 2, q: "Which working line is written correctly?", options: ["12 = 3 = 36","12 X 3 = 36","12 X 3 X 36","36 = 12 = 3"], answer: 1, hint: "The = sign means 'is equal to'. It cannot also mean 'times'.", explain: "The multiply sign goes between the two numbers and = goes before the answer: 12 X 3 = 36. Writing 12 = 3 = 36 says 12 equals 3, which is false and loses marks." },
    { id: "math-multiples-factors.multiples.i10", type: "multi", level: 2, q: "Tick every multiple of 6.", options: ["16","18","24","32","42"], answer: [1,2,4], explain: "18 = 6 X 3, 24 = 6 X 4, 42 = 6 X 7. 16 and 32 are multiples of 8, not of 6." },
    { id: "math-multiples-factors.multiples.i11", type: "tf", level: 1, q: "45 is a multiple of 9.", answer: true, explain: "9 X 5 = 45, so yes." },
    { id: "math-multiples-factors.multiples.i12", type: "tf", level: 3, q: "There is a greatest multiple of 8.", answer: false, explain: "Multiples go on for ever: 8, 16, 24, 32 and onwards. You can always multiply by a bigger number, so there is no greatest multiple. Page 38 asks this as a trick blank." },
    { id: "math-multiples-factors.multiples.i13", type: "fillMulti", level: 2, q: "Write down the first 5 multiples of <strong>25</strong>.", blanks: [ { label: "25 X 1", accept: ["25"] }, { label: "25 X 2", accept: ["50"] }, { label: "25 X 3", accept: ["75"] }, { label: "25 X 4", accept: ["100"] }, { label: "25 X 5", accept: ["125"] } ], explain: "Count in quarter-hundreds: 25, 50, 75, 100, 125." },
    { id: "math-multiples-factors.multiples.i14", type: "mcq", level: 3, q: "Which of these is <strong>not</strong> a multiple of 7?", options: ["21","28","35","45"], answer: 3, hint: "Try dividing each one by 7.", explain: "7 X 3 = 21, 7 X 4 = 28, 7 X 5 = 35. 45 is not in the 7 times table, because 7 X 6 = 42 and 7 X 7 = 49." },
    { id: "math-multiples-factors.multiples.i15", type: "fill", level: 3, q: "The 8<sup>th</sup> multiple of 7 is ____", accept: ["56"], placeholder: "number", hint: "7 X 8", explain: "7 X 8 = 56." },
    { id: "math-multiples-factors.multiples.i16", type: "steps", level: 2, q: "Write down the first 5 multiples of 18, the way the workbook wants it.", parts: [ { q: "18 X 1 =", accept: ["18"] }, { q: "18 X 2 =", accept: ["36"] }, { q: "18 X 3 =", accept: ["54"] }, { q: "18 X 4 =", accept: ["72"] }, { q: "18 X 5 =", accept: ["90"] }, { q: "Answer line: 1st five multiples of 18 =", accept: ["18, 36, 54, 72, 90","18 36 54 72 90","18,36,54,72,90"] } ], explain: "Keep adding 18: 18, 36, 54, 72, 90." }
  ]
},

{
  id: "math-multiples-factors.factors",
  subject: "maths",
  topic: "math-multiples-factors",
  name: "Find all the factors",
  canDo: "I can find every factor of a number using factor pairs, and copy the full list into my answer line without dropping any.",
  weight: 5,
  difficulty: 2,
  prereq: ["math-multiples-factors.multiples"],
  teach: {
    hook: "24 players at training. Equal teams of 1, 2, 3, 4, 6, 8, 12 or 24 all work. Those are the factors of 24.",
    explain: "<p>A <strong>factor</strong> of a number divides it exactly, with nothing left over.</p><p>The school method is <strong>factor pairs</strong>. Start at <strong>1 X n = n</strong> and work down: 2 X ?, 3 X ?, 4 X ? and so on. Skip any number that does not divide exactly. Stop when the two sides meet.</p><p>Then read the answer line off the pairs: the left column going <strong>down</strong>, then the right column coming back <strong>up</strong>.</p>",
    worked: [
      {
        q: "Find all the factors of 56.",
        steps: [
          "1 X 56 = 56",
          "2 X 28 = 56",
          "3 does not divide 56, skip it.",
          "4 X 14 = 56",
          "5 does not divide 56, and 6 does not either.",
          "7 X 8 = 56, and 7 and 8 are neighbours, so stop.",
          "Read down the left (1, 2, 4, 7) then up the right (8, 14, 28, 56)."
        ],
        a: "Factors of 56 = 1, 2, 4, 7, 8, 14, 28, 56"
      },
      {
        q: "Find all the factors of 72.",
        steps: [
          "1 X 72, 2 X 36, 3 X 24, <strong>4 X 18</strong>, 6 X 12, 8 X 9. Stop, because 8 and 9 are neighbours.",
          "Down the left: 1, 2, 3, 4, 6, 8.",
          "Up the right: 9, 12, 18, 24, 36, 72.",
          "Six pairs means <strong>twelve</strong> factors. Count them before you stop."
        ],
        a: "Factors of 72 = 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72"
      }
    ],
    remember: [
      "1 is a factor of every number, and every number is a factor of itself.",
      "Each pair gives TWO factors. Count your pairs, double it, then count your answer line. They must match.",
      "Check every pair line multiplies back. 3 X 36 = 108, but 3 X 32 = only 96.",
      "A factor is never bigger than the number itself."
    ],
    watchOut: "Dropping a number when you copy your own working into the answer line. You lost the 4 from the factors of 72 and the 12 from the factors of 48, even though both were sitting in your pairs above. Count the list."
  },
  items: [
    { id: "math-multiples-factors.factors.i01", type: "multi", level: 1, q: "Tick every factor of 27.", options: ["1","2","3","5","9","27"], answer: [0,2,4,5], explain: "1 X 27 and 3 X 9 are the only pairs, so the factors are 1, 3, 9, 27." },
    { id: "math-multiples-factors.factors.i02", type: "steps", level: 2, q: "Find all the factors of 56 using factor pairs.", parts: [ { q: "1 X ? = 56", accept: ["56"] }, { q: "2 X ? = 56", accept: ["28"] }, { q: "4 X ? = 56", accept: ["14"] }, { q: "7 X ? = 56", accept: ["8"] }, { q: "How many factors altogether?", accept: ["8","eight"] }, { q: "Factors of 56 =", accept: ["1, 2, 4, 7, 8, 14, 28, 56","1 2 4 7 8 14 28 56","1,2,4,7,8,14,28,56"] } ], explain: "Four pairs give eight factors: 1, 2, 4, 7, 8, 14, 28, 56." },
    { id: "math-multiples-factors.factors.i03", type: "fill", level: 2, q: "How many factors does 90 have?", accept: ["12","twelve"], placeholder: "number", hint: "Pairs: 1x90, 2x45, 3x30, 5x18, 6x15, 9x10.", explain: "Six pairs, so twelve factors: 1, 2, 3, 5, 6, 9, 10, 15, 18, 30, 45, 90." },
    { id: "math-multiples-factors.factors.i04", type: "order", level: 1, q: "Put all the factors of 24 in ascending order.", answer: ["1","2","3","4","6","8","12","24"], explain: "Pairs 1x24, 2x12, 3x8, 4x6 give eight factors." },
    { id: "math-multiples-factors.factors.i05", type: "mcq", level: 3, q: "Crispin wrote <em>3 X 32 = 108</em> while listing the factors of 108. What went wrong?", options: ["Nothing, 32 is a factor of 108","3 X 32 = 96, so the partner of 3 should be 36","108 has no factor of 3","The 3 should have been a 4"], answer: 1, hint: "Multiply 3 by 32 and see what you actually get.", explain: "3 X 36 = 108, so the pair is 3 and 36. 32 does not divide 108 at all. The real list is 1, 2, 3, 4, 6, 9, 12, 18, 27, 36, 54, 108." },
    { id: "math-multiples-factors.factors.i06", type: "multi", level: 2, q: "Circle the factors of <strong>68</strong>.", options: ["34","5","17","4","2","3","1","10","68"], answer: [0,2,3,4,6,8], explain: "68 = 1 X 68, 2 X 34, 4 X 17. So the factors are 1, 2, 4, 17, 34, 68. 5, 3 and 10 do not divide 68." },
    { id: "math-multiples-factors.factors.i07", type: "multi", level: 1, q: "Circle the factors of <strong>15</strong>.", options: ["4","5","7","15","3","1","10"], answer: [1,3,4,5], explain: "15 = 1 X 15 and 3 X 5, so the factors are 1, 3, 5, 15." },
    { id: "math-multiples-factors.factors.i08", type: "multi", level: 1, q: "Circle the factors of <strong>21</strong>.", options: ["1","5","7","15","3","21","2"], answer: [0,2,4,5], explain: "21 = 1 X 21 and 3 X 7, so the factors are 1, 3, 7, 21." },
    { id: "math-multiples-factors.factors.i09", type: "fill", level: 2, q: "Find all the factors of 85.", accept: ["1, 5, 17, 85","1 5 17 85","1,5,17,85"], placeholder: "list them", hint: "There are only two pairs.", explain: "1 X 85 and 5 X 17, so 1, 5, 17, 85." },
    { id: "math-multiples-factors.factors.i10", type: "mcq", level: 2, q: "Which of these is <strong>not</strong> a factor of 72?", options: ["4","8","16","24"], answer: 2, hint: "72 divided by 16 is not a whole number.", explain: "72 = 8 X 9, 3 X 24 and 4 X 18, but 72 divided by 16 is 4.5. So 16 is not a factor." },
    { id: "math-multiples-factors.factors.i11", type: "bucket", level: 2, q: "Sort each number: is it a factor of 48 or not?", buckets: ["Factor of 48","Not a factor of 48"], chips: [ { t: "12", b: "Factor of 48" }, { t: "16", b: "Factor of 48" }, { t: "9", b: "Not a factor of 48" }, { t: "6", b: "Factor of 48" }, { t: "5", b: "Not a factor of 48" }, { t: "24", b: "Factor of 48" }, { t: "18", b: "Not a factor of 48" }, { t: "8", b: "Factor of 48" } ], explain: "Factors of 48 = 1, 2, 3, 4, 6, 8, 12, 16, 24, 48. That list has TEN numbers, and 12 is one of them. You left 12 out on workbook page 33." },
    { id: "math-multiples-factors.factors.i12", type: "tf", level: 1, q: "1 is a factor of every number.", answer: true, explain: "Any number times 1 gives itself, so 1 divides everything exactly. This is fill-in-the-blank (h) on page 38." },
    { id: "math-multiples-factors.factors.i13", type: "fillMulti", level: 1, q: "Answer both for the number <strong>64</strong>.", blanks: [ { label: "Smallest factor of 64", accept: ["1"] }, { label: "Greatest factor of 64", accept: ["64"] } ], explain: "The smallest factor of any number is 1 and the greatest factor is the number itself." },
    { id: "math-multiples-factors.factors.i14", type: "steps", level: 2, q: "Find all the factors of 81.", parts: [ { q: "1 X ? = 81", accept: ["81"] }, { q: "3 X ? = 81", accept: ["27"] }, { q: "9 X ? = 81", accept: ["9"] }, { q: "Factors of 81 =", accept: ["1, 3, 9, 27, 81","1 3 9 27 81","1,3,9,27,81"] } ], hint: "9 pairs with itself, so it is written only once.", explain: "1 X 81, 3 X 27, 9 X 9. When a number pairs with itself you write it once: 1, 3, 9, 27, 81. Note 81 divided by 3 is 27, not 21." },
    { id: "math-multiples-factors.factors.i15", type: "fill", level: 3, q: "How many factors does 108 have?", accept: ["12","twelve"], placeholder: "number", hint: "1x108, 2x54, 3x36, 4x27, 6x18, 9x12.", explain: "Six pairs, so twelve factors: 1, 2, 3, 4, 6, 9, 12, 18, 27, 36, 54, 108." },
    { id: "math-multiples-factors.factors.i16", type: "mcq", level: 3, q: "A number has exactly these factors: 1, 2, 4, 8, 16, 32, 64. What is the number?", options: ["32","48","64","128"], answer: 2, hint: "The greatest factor of a number is the number itself.", explain: "The largest factor in the list is always the number itself, so it is 64." }
  ]
}
]);
