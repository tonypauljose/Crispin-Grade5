/* ============================================================
   Crispin's World — Chapter 1: Numbers 1 to 10,000
   Quiz bank split across 3 tiers (Explorer / Adventurer / Champion)
   Total: 120 questions
   Question types: mcq, tf, fill, compare
   ============================================================ */

window.CH01_BANK = {

  // ---------- EXPLORER (40 questions) — MCQ + TF basics ----------
  explorer: [
    // Place value
    { type: 'mcq', q: 'In the number 4,567, which digit is in the hundreds place?', options: ['4', '5', '6', '7'], answer: 1, explain: '5 sits in the hundreds place.' },
    { type: 'mcq', q: 'What is the place value of 7 in 7,284?', options: ['7', '70', '700', '7,000'], answer: 3, explain: '7 is in the thousands place, so its value is 7,000.' },
    { type: 'mcq', q: 'In 3,056, which digit is in the ones place?', options: ['3', '0', '5', '6'], answer: 3, explain: '6 is the last digit on the right — the ones place.' },
    { type: 'mcq', q: 'Which digit is in the tens place in 8,129?', options: ['8', '1', '2', '9'], answer: 2, explain: '2 is in the tens place.' },
    { type: 'mcq', q: 'What is the place value of 0 in 4,083?', options: ['0', '8', '80', '800'], answer: 0, explain: 'Zero anywhere always has a value of 0, but it holds the place — here, the hundreds place.' },

    // Expanded form
    { type: 'mcq', q: 'Which is the expanded form of 3,405?', options: ['3,000 + 400 + 5', '3,000 + 40 + 5', '300 + 400 + 5', '3,000 + 400 + 50'], answer: 0, explain: 'There are no tens, so skip that place: 3000 + 400 + 5.' },
    { type: 'mcq', q: 'What number is 5,000 + 200 + 30 + 4?', options: ['5,234', '5,243', '5,324', '5,432'], answer: 0, explain: 'Add them up: 5,234.' },

    // Number names / faces
    { type: 'mcq', q: 'How do you write 6,209 in words?', options: ['Six thousand two hundred nine', 'Six thousand two hundred ninety', 'Six hundred two thousand nine', 'Sixty-two hundred nine'], answer: 0, explain: '6 thousand, 2 hundred, 0 tens, 9 ones → Six thousand two hundred nine.' },
    { type: 'mcq', q: 'Which number is "Four thousand six hundred"?', options: ['4,060', '4,006', '4,600', '46,000'], answer: 2, explain: '4 thousand 6 hundred = 4,600.' },

    // Successor / predecessor
    { type: 'mcq', q: 'What is the successor of 3,999?', options: ['3,998', '4,000', '3,900', '4,099'], answer: 1, explain: 'Successor means +1: 3,999 + 1 = 4,000.' },
    { type: 'mcq', q: 'What is the predecessor of 5,000?', options: ['4,999', '5,001', '4,900', '4,099'], answer: 0, explain: 'Predecessor means −1: 5,000 − 1 = 4,999.' },
    { type: 'mcq', q: 'The successor of 7,349 is:', options: ['7,348', '7,350', '7,340', '7,359'], answer: 1, explain: '7,349 + 1 = 7,350.' },

    // Compare
    { type: 'mcq', q: 'Which number is the greatest?', options: ['4,567', '4,765', '4,657', '4,756'], answer: 1, explain: 'Compare the hundreds: 4,765 has 7 hundred which is the biggest.' },
    { type: 'mcq', q: 'Which number is the smallest?', options: ['2,345', '2,435', '2,354', '2,453'], answer: 0, explain: '2,345 has the smallest hundreds digit.' },

    // Rounding
    { type: 'mcq', q: 'Round 3,467 to the nearest 10.', options: ['3,460', '3,470', '3,500', '3,400'], answer: 1, explain: 'Ones digit is 7 (≥5), so round up to 3,470.' },
    { type: 'mcq', q: 'Round 5,231 to the nearest 100.', options: ['5,200', '5,300', '5,000', '5,230'], answer: 0, explain: 'Tens digit is 3 (<5), so round down to 5,200.' },
    { type: 'mcq', q: 'Round 4,650 to the nearest 1,000.', options: ['4,000', '5,000', '4,500', '5,500'], answer: 1, explain: 'Hundreds digit is 6 (≥5), so round up to 5,000.' },

    // Roman numerals
    { type: 'mcq', q: 'What is the Roman numeral for 9?', options: ['VIIII', 'IX', 'XI', 'VIII'], answer: 1, explain: '9 is written as IX — one less than ten.' },
    { type: 'mcq', q: 'What is XL in Hindu-Arabic?', options: ['40', '60', '15', '90'], answer: 0, explain: 'X=10, L=50. X before L means 50 − 10 = 40.' },
    { type: 'mcq', q: 'What is the Roman numeral for 14?', options: ['XIV', 'VIX', 'XIIII', 'IXV'], answer: 0, explain: 'X(10) + IV(4) = XIV.' },
    { type: 'mcq', q: 'What is LXX in Hindu-Arabic?', options: ['50', '60', '70', '90'], answer: 2, explain: 'L(50) + X(10) + X(10) = 70.' },

    // True/False pack
    { type: 'tf', q: '9,999 is the largest 4-digit number.', answer: 0, explain: 'True — add 1 and you get 10,000 which is a 5-digit number.' },
    { type: 'tf', q: '1,000 is the smallest 4-digit number.', answer: 0, explain: 'True — 999 is still 3 digits.' },
    { type: 'tf', q: 'The Roman numeral for 4 is IIII.', answer: 1, explain: 'False — 4 is IV (one less than five).' },
    { type: 'tf', q: 'The successor of any number is that number plus 1.', answer: 0, explain: 'True — successor always means +1.' },
    { type: 'tf', q: 'Zero has no place value — it just holds a spot.', answer: 0, explain: 'True — zero keeps the place but its value is always 0.' },
    { type: 'tf', q: 'Rounding 4,500 to the nearest 1,000 gives 4,000.', answer: 1, explain: 'False — with 5 or more, we round up, so 4,500 rounds to 5,000.' },
    { type: 'tf', q: '3,000 + 400 + 0 + 2 equals 3,402.', answer: 0, explain: 'True — the zero tens mean nothing in the tens place.' },
    { type: 'tf', q: 'L stands for 100 in Roman numerals.', answer: 1, explain: 'False — L is 50. C is 100.' },
    { type: 'tf', q: '0 is the predecessor of 1.', answer: 0, explain: 'True — 1 − 1 = 0.' },
    { type: 'tf', q: 'Seven thousand seven is written as 7,007.', answer: 0, explain: 'True — 7 thousand + 0 hundred + 0 ten + 7 = 7,007.' },

    // More MCQs
    { type: 'mcq', q: 'How many hundreds are there in 4,800?', options: ['8', '48', '4', '480'], answer: 1, explain: '4,800 ÷ 100 = 48 hundreds.' },
    { type: 'mcq', q: 'How many tens are there in 1,250?', options: ['25', '125', '12', '250'], answer: 1, explain: '1,250 ÷ 10 = 125 tens.' },
    { type: 'mcq', q: 'The number "nine thousand nine" is:', options: ['9,009', '9,090', '9,900', '999'], answer: 0, explain: '9 thousand + 0 + 0 + 9 ones = 9,009.' },
    { type: 'mcq', q: 'Which numeral below is a 4-digit number?', options: ['975', '3,008', '12,500', '850'], answer: 1, explain: '3,008 has exactly 4 digits.' },
    { type: 'mcq', q: 'What is 10 less than 4,000?', options: ['3,990', '3,099', '3,900', '399'], answer: 0, explain: '4,000 − 10 = 3,990.' },
    { type: 'mcq', q: 'What is 100 more than 6,850?', options: ['6,860', '7,000', '6,950', '7,850'], answer: 2, explain: '6,850 + 100 = 6,950.' },
    { type: 'mcq', q: 'Which of these is between 4,200 and 4,300?', options: ['4,199', '4,256', '4,305', '4,400'], answer: 1, explain: '4,256 sits between 4,200 and 4,300.' },
    { type: 'mcq', q: 'What comes next: 1,000, 2,000, 3,000, __?', options: ['3,100', '4,000', '3,500', '30,000'], answer: 1, explain: 'Pattern adds 1,000 each time.' },
    { type: 'mcq', q: 'In a Roman numeral, what comes just before L?', options: ['XL', 'IL', 'XLIX', 'LI'], answer: 2, explain: 'L is 50; 49 is XLIX (one less than fifty).', hint: 'Think of it as 40 (XL) plus 9 (IX).' }
  ],

  // ---------- ADVENTURER (40 questions) — fill-blank + compare ----------
  adventurer: [
    // Fill — number names
    { type: 'fill', q: 'Write 4,705 in words (e.g. "four thousand seven hundred five").', answer: ['four thousand seven hundred five', 'four thousand seven hundred and five'], explain: '4 thousand 7 hundred 0 tens 5 ones.' },
    { type: 'fill', q: 'Write 8,060 in words.', answer: ['eight thousand sixty', 'eight thousand and sixty'], explain: '8 thousand 0 hundred 6 tens 0 ones.' },
    { type: 'fill', q: 'Write 2,999 in words.', answer: ['two thousand nine hundred ninety-nine', 'two thousand nine hundred and ninety-nine', 'two thousand nine hundred ninety nine'], explain: '2 thousand 9 hundred 9 tens 9 ones.' },
    { type: 'fill', q: 'Write 1,001 in words.', answer: ['one thousand one', 'one thousand and one'], explain: 'One thousand plus one.' },
    { type: 'fill', q: 'Write 6,500 in words.', answer: ['six thousand five hundred'], explain: 'Six thousand five hundred — straightforward.' },

    // Fill — numerals from words
    { type: 'fill', q: 'Write "three thousand four hundred eight" in numerals.', answer: ['3408', '3,408'], explain: '3 thousand 4 hundred 0 tens 8 ones.' },
    { type: 'fill', q: 'Write "seven thousand seventy" in numerals.', answer: ['7070', '7,070'], explain: '7 thousand 0 hundred 7 tens 0 ones.' },
    { type: 'fill', q: 'Write "five thousand five" in numerals.', answer: ['5005', '5,005'], explain: '5 thousand + 0 + 0 + 5.' },

    // Fill — place value
    { type: 'fill', q: 'What is the place value of 6 in 5,623?', answer: ['600', '6 hundreds'], explain: '6 is in the hundreds place → 600.' },
    { type: 'fill', q: 'What is the place value of 4 in 4,392?', answer: ['4000', '4,000', '4 thousands'], explain: '4 is in the thousands place.' },
    { type: 'fill', q: 'What is the place value of 8 in 1,480?', answer: ['80', '8 tens'], explain: '8 is in the tens place.' },

    // Fill — expanded form
    { type: 'fill', q: 'Expanded form of 3,728. (Write like 3000 + 700 + 20 + 8)', answer: ['3000 + 700 + 20 + 8', '3,000 + 700 + 20 + 8'], explain: 'Just split each digit by its place value.' },
    { type: 'fill', q: 'Expanded form of 9,050.', answer: ['9000 + 50', '9,000 + 50', '9000 + 0 + 50 + 0'], explain: 'Skip places with zero.' },
    { type: 'fill', q: 'Expanded form of 4,006.', answer: ['4000 + 6', '4,000 + 6'], explain: 'Just thousands and ones.' },

    // Fill — rounding
    { type: 'fill', q: 'Round 3,847 to the nearest 10.', answer: ['3850', '3,850'], explain: 'Ones digit 7 ≥ 5, round up.' },
    { type: 'fill', q: 'Round 6,439 to the nearest 100.', answer: ['6400', '6,400'], explain: 'Tens digit 3 < 5, round down.' },
    { type: 'fill', q: 'Round 2,500 to the nearest 1,000.', answer: ['3000', '3,000'], explain: 'Hundreds digit 5, round up.' },
    { type: 'fill', q: 'Round 7,149 to the nearest 100.', answer: ['7100', '7,100'], explain: 'Tens digit 4 < 5, round down.' },

    // Fill — Roman numerals
    { type: 'fill', q: 'Write XLII in Hindu-Arabic.', answer: ['42'], explain: 'XL (40) + II (2) = 42.' },
    { type: 'fill', q: 'Write 27 in Roman numerals.', answer: ['XXVII'], explain: 'XX (20) + V (5) + II (2) = XXVII.' },
    { type: 'fill', q: 'Write LXXV in Hindu-Arabic.', answer: ['75'], explain: 'L (50) + XX (20) + V (5) = 75.' },
    { type: 'fill', q: 'Write 89 in Roman numerals.', answer: ['LXXXIX'], explain: 'L (50) + XXX (30) + IX (9).' },
    { type: 'fill', q: 'Write XC in Hindu-Arabic.', answer: ['90'], explain: 'X before C means 100 − 10 = 90.' },

    // Fill — successor / predecessor
    { type: 'fill', q: 'Successor of 4,999.', answer: ['5000', '5,000'], explain: 'Just +1.' },
    { type: 'fill', q: 'Predecessor of 1,000.', answer: ['999'], explain: '1,000 − 1 = 999 (3-digit).' },
    { type: 'fill', q: 'Successor of 6,089.', answer: ['6090', '6,090'], explain: '6,089 + 1 = 6,090.' },

    // Compare — <, >, =
    { type: 'compare', q: 'Compare: 4,578 ___ 4,587', options: ['<', '>', '='], answer: 0, explain: 'Tens digit: 7 < 8, so 4,578 is less than 4,587.' },
    { type: 'compare', q: 'Compare: 9,000 ___ 8,999', options: ['<', '>', '='], answer: 1, explain: '9,000 has more thousands — greater.' },
    { type: 'compare', q: 'Compare: 3,450 ___ 3,540', options: ['<', '>', '='], answer: 0, explain: 'Hundreds digit: 4 < 5.' },
    { type: 'compare', q: 'Compare: 2,500 ___ 2,500', options: ['<', '>', '='], answer: 2, explain: 'Same number.' },
    { type: 'compare', q: 'Compare: 5,010 ___ 5,001', options: ['<', '>', '='], answer: 1, explain: 'Tens: 1 > 0, so 5,010 > 5,001.' },
    { type: 'compare', q: 'Compare: 6,789 ___ 6,798', options: ['<', '>', '='], answer: 0, explain: 'Tens: 8 < 9.' },
    { type: 'compare', q: 'Compare: 1,000 ___ 999', options: ['<', '>', '='], answer: 1, explain: 'More digits = greater number.' },

    // Fill — pattern / ordering
    { type: 'fill', q: 'What comes next in the pattern: 1,500 · 2,000 · 2,500 · ____', answer: ['3000', '3,000'], explain: 'Each step adds 500.' },
    { type: 'fill', q: 'What comes next: 9,800 · 9,850 · 9,900 · ____', answer: ['9950', '9,950'], explain: 'Each step adds 50.' },
    { type: 'fill', q: 'What comes next: 4,444 · 4,443 · 4,442 · ____', answer: ['4441', '4,441'], explain: 'Each step subtracts 1.' },

    // Fill — 100 more/less, 1000 more/less
    { type: 'fill', q: 'What is 100 more than 3,978?', answer: ['4078', '4,078'], explain: '3,978 + 100 = 4,078.' },
    { type: 'fill', q: 'What is 1,000 less than 6,234?', answer: ['5234', '5,234'], explain: '6,234 − 1,000 = 5,234.' },
    { type: 'fill', q: 'How many tens are in 3,470?', answer: ['347'], explain: '3,470 ÷ 10 = 347 tens.' },
    { type: 'fill', q: 'How many hundreds are in 5,600?', answer: ['56'], explain: '5,600 ÷ 100 = 56 hundreds.' }
  ],

  // ---------- CHAMPION (40 questions) — word problems, riddles, error-spotting, patterns ----------
  champion: [
    // Word problems
    { type: 'mcq', q: 'A stadium has 8,450 seats. Round that to the nearest hundred so the announcer can say a neat number.', options: ['8,400', '8,500', '8,450', '9,000'], answer: 1, explain: '8,450 — tens digit is 5, round up to 8,500.', hint: 'Look at the tens digit.' },
    { type: 'mcq', q: 'Ronaldo scored 3,245 career goals in one story we imagined. What is the place value of 2?', options: ['20', '200', '2,000', '2'], answer: 1, explain: '2 sits in the hundreds place → 200.' },
    { type: 'fill', q: 'A school library has 2,486 books. If 100 more books arrive, how many are there now?', answer: ['2586', '2,586'], explain: '2,486 + 100 = 2,586.' },
    { type: 'fill', q: 'A football club sold 4,750 tickets on Friday and 100 more on Saturday. How many on Saturday?', answer: ['4850', '4,850'], explain: '4,750 + 100 = 4,850.' },
    { type: 'mcq', q: 'A cricket ground has 9,999 fans. Another fan enters. Now how many?', options: ['9,998', '10,000', '1,000', '99,999'], answer: 1, explain: '9,999 + 1 = 10,000 — the number rolls into 5 digits.', hint: 'The largest 4-digit number plus 1.' },

    // Riddles
    { type: 'mcq', q: 'I am a 4-digit number. My thousands digit is 5. My other digits are all zero. Who am I?', options: ['5,000', '500', '5,500', '55,000'], answer: 0, explain: '5 in the thousands place, 0 everywhere else = 5,000.' },
    { type: 'mcq', q: 'I am an even 4-digit number. All my digits are 4 except the last one which is 0. Who am I?', options: ['4,440', '4,404', '4,040', '4,004'], answer: 0, explain: 'First three digits are 4 and last is 0 → 4,440.' },
    { type: 'mcq', q: 'I am the smallest 4-digit number with all different digits.', options: ['1,000', '1,023', '1,234', '1,203'], answer: 1, explain: '1,023 — start with 1, then the smallest remaining digits 0, 2, 3.', hint: 'Start with the smallest thousands digit, then use 0.' },
    { type: 'mcq', q: 'I am the greatest 4-digit number with all different digits.', options: ['9,876', '9,999', '9,987', '9,900'], answer: 0, explain: '9,876 — largest unique-digit arrangement.' },
    { type: 'fill', q: 'I am a 4-digit number. All my digits are the same. When you read me in words, you say "ones" four times plus the digit name. What number am I if the digit is 7?', answer: ['7777', '7,777'], explain: '7-7-7-7 = 7,777.' },

    // Error spotting
    { type: 'mcq', q: 'Crispin wrote "Three thousand five hundred two" as 3,520. Which digit is wrong?', options: ['Thousands', 'Hundreds', 'Tens', 'Ones'], answer: 2, explain: 'It should be 3,502 — the tens should be 0, not 2. (And ones 2.) The position of 2 is wrong — he put it in the tens instead of ones.', hint: 'Read the number slowly: three thousand, five hundred, zero tens, two ones.' },
    { type: 'tf', q: 'The expanded form of 4,607 is 4000 + 600 + 7 (we skip the zero tens).', answer: 0, explain: 'True — we skip place values that are zero.' },
    { type: 'tf', q: 'The Roman numeral VIIII correctly represents 9.', answer: 1, explain: 'False — Romans do not write four of the same symbol in a row. 9 is IX.' },
    { type: 'tf', q: '"Eight thousand eighty" is written as 8,800.', answer: 1, explain: 'False — it is 8,080 (8 thousand, 0 hundred, 8 tens, 0 ones).' },
    { type: 'tf', q: 'The predecessor of 10,000 is 9,999 (a 4-digit number).', answer: 0, explain: 'True — 10,000 − 1 = 9,999.' },
    { type: 'tf', q: '3,456 rounded to the nearest 100 is 3,400.', answer: 1, explain: 'False — tens digit 5 rounds up → 3,500.' },
    { type: 'tf', q: 'In 4,040, both 4s have the same place value.', answer: 1, explain: 'False — one 4 is in thousands (4,000) and the other in tens (40).' },
    { type: 'mcq', q: 'Which number is INCORRECTLY written in words?', options: ['3,205 = three thousand two hundred five', '4,040 = four thousand forty', '7,007 = seven thousand and seven', '5,500 = five thousand and fifty'], answer: 3, explain: '5,500 should be "five thousand five hundred", not "five thousand and fifty".' },

    // Patterns
    { type: 'mcq', q: 'What pattern is this? 1,000 · 2,000 · 4,000 · 8,000', options: ['+1,000', '×2', '+2,000', '×3'], answer: 1, explain: 'Each number is doubled.', hint: 'Check if each step adds or multiplies.' },
    { type: 'mcq', q: 'Next term: 9,999 · 8,888 · 7,777 · ____', options: ['6,666', '7,000', '6,776', '7,776'], answer: 0, explain: 'Pattern: digits repeat and decrease by 1 each step.' },
    { type: 'fill', q: 'Next term in: 2,468 · 2,478 · 2,488 · ____', answer: ['2498', '2,498'], explain: 'Each step adds 10.' },
    { type: 'fill', q: 'Next in the Roman pattern: X, XX, XXX, ____', answer: ['XL'], explain: 'We jump to 40 next, written XL (not XXXX).' },

    // Harder word problems
    { type: 'mcq', q: 'In a football tournament, 2,500 + 2,500 fans watched the final. How many fans in total?', options: ['4,500', '5,000', '5,500', '5,200'], answer: 1, explain: '2,500 + 2,500 = 5,000.' },
    { type: 'mcq', q: 'The year Ronaldo was born is 1985 (imaginary version). Write it in Roman numerals.', options: ['MCMLXXXV', 'MCMXCV', 'MDCCCLXXXV', 'MLCMXXXV'], answer: 0, explain: 'M=1000, CM=900, LXXX=80, V=5 → MCMLXXXV = 1985.', hint: '1000 + 900 + 80 + 5.' },
    { type: 'fill', q: 'What is the smallest 4-digit odd number?', answer: ['1001', '1,001'], explain: '1,000 is smallest 4-digit but even. 1,001 is next and odd.' },
    { type: 'fill', q: 'What is the largest 4-digit even number?', answer: ['9998', '9,998'], explain: '9,999 is odd, so the largest even is 9,998.' },
    { type: 'mcq', q: 'Crispin arranges the digits 3, 5, 8, 0 to make the greatest 4-digit number. What is it?', options: ['8,530', '8,503', '8,053', '8,035'], answer: 0, explain: 'Biggest digit first, then next biggest: 8, 5, 3, 0.' },
    { type: 'mcq', q: 'Using 3, 5, 8, 0 — what is the smallest 4-digit number? (Can\'t start with 0.)', options: ['3,058', '0,358', '3,085', '3,580'], answer: 0, explain: 'Smallest non-zero digit first (3), then 0, 5, 8.', hint: 'You can\'t put 0 at the start — that would make it a 3-digit number.' },

    // Compare (harder)
    { type: 'compare', q: 'Compare: LXXVII ___ 78 (Roman vs Hindu-Arabic)', options: ['<', '>', '='], answer: 0, explain: 'LXXVII = 77 < 78.' },
    { type: 'compare', q: 'Compare: 4,000 + 500 + 20 ___ 4,520', options: ['<', '>', '='], answer: 2, explain: 'Both equal 4,520.' },

    // Mixed
    { type: 'fill', q: 'What number comes between 5,999 and 6,001?', answer: ['6000', '6,000'], explain: 'Just one number fits: 6,000.' },
    { type: 'mcq', q: 'Which is the correct descending order? 4,567 · 4,657 · 4,576 · 4,765', options: ['4,765 > 4,657 > 4,576 > 4,567', '4,765 > 4,576 > 4,657 > 4,567', '4,567 > 4,576 > 4,657 > 4,765', '4,657 > 4,765 > 4,576 > 4,567'], answer: 0, explain: 'Compare hundreds first, then tens, then ones.' },
    { type: 'fill', q: 'Write the number just after XCIX in Hindu-Arabic.', answer: ['100'], explain: 'XCIX = 99, next is 100.' },
    { type: 'mcq', q: 'If you add the place values of all digits in 4,328, you get:', options: ['4,328', '17', 'Impossible', '4 + 3 + 2 + 8 = 17'], answer: 0, explain: 'Expanded form IS the number: 4000 + 300 + 20 + 8 = 4,328.', hint: 'This is what "expanded form" means.' },
    { type: 'tf', q: 'Rounding always makes a number bigger.', answer: 1, explain: 'False — it can go up or down depending on the digit after the place we round to.' },
    { type: 'tf', q: 'The number 9,100 is closer to 9,000 than to 9,200.', answer: 1, explain: 'False — 9,100 is exactly 100 away from both. By convention we round 9,150 and above up, but 9,100 itself rounds to 9,100 (already a round hundred) or to 9,000 at the thousand level.' },
    { type: 'fill', q: 'Crispin counts his footballs: 45 white, 23 orange, 12 special ones. Which number is in between when sorted ascending?', answer: ['23'], explain: 'Sorted: 12, 23, 45. Middle = 23.' },
    { type: 'mcq', q: 'The predecessor of XL is:', options: ['XXXIX', 'XLI', 'XXXVIII', 'L'], answer: 0, explain: 'XL = 40, so predecessor = 39 = XXXIX.', hint: '40 − 1 in Roman.' },
    { type: 'mcq', q: 'Which statement is TRUE?', options: ['9,000 < 9,000', 'A 4-digit number can start with 0', 'Round 6,500 to the nearest 1,000 gives 7,000', 'XC = 110'], answer: 2, explain: '6,500 rounds to 7,000 because the hundreds digit is 5.' },
    { type: 'fill', q: 'Ronaldo wore #7 for Manchester United. If 7 is written as VII, what is the Roman numeral for the total goals if he scores 77?', answer: ['LXXVII'], explain: 'L(50) + X(10) + X(10) + V(5) + I(1) + I(1) = 77.', hint: 'Break 77 into 50 + 20 + 7.' }
  ]
};
