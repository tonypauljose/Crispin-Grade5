/* ============================================================
   HALF-YEARLY HQ — Multiples and Factors, part 2
   Prime & composite · prime factorisation · HCF · LCM · word problems

   Source: workbook pages 33-41 (Maths folder, 16 photos).
   IMPORTANT CONTEXT: every one of these pages was left BLANK in
   Crispin's workbook. Prime factorisation, HCF by prime
   factorisation, LCM by common division, the theory blanks, the
   prime sieve and the word problems have never been attempted.
   This is the single largest gap in the whole half-yearly portion,
   so these skills are taught from zero and weighted heavily.

   The numbers used in the worked examples are the school's own
   (workbook pp. 35-38 and the p.41 worksheet) so the practice
   matches what he will actually be asked.
   ============================================================ */
window.HY_SKILLS = (window.HY_SKILLS || []).concat([

  /* ---------------------------------------------------------- */
  {
    id: 'math-multiples-factors.prime-composite',
    subject: 'maths', topic: 'math-multiples-factors',
    name: 'Prime or composite',
    canDo: 'I can say whether a number is prime or composite, and I know why 1 is neither.',
    weight: 5, difficulty: 2,
    prereq: ['math-multiples-factors.factors'],
    gen: ['primeOrComposite', 'primeSort'],
    teach: {
      hook: 'Every number has a personality. Some are loners with only two factors. Some have a big family of factors. And one number is in a club of its own.',
      explain:
        '<p>Count how many factors a number has. That is the whole test.</p>' +
        '<ul>' +
        '<li>Exactly <strong>two</strong> factors (1 and itself) → <strong>prime</strong>.</li>' +
        '<li><strong>More than two</strong> factors → <strong>composite</strong>.</li>' +
        '<li>Only <strong>one</strong> factor → that is 1, and it is <strong>neither</strong> prime nor composite.</li>' +
        '</ul>' +
        '<p>2 is the smallest prime, and the <strong>only even prime</strong> — every other even number can be divided by 2, which gives it a third factor.</p>',
      worked: [
        {
          q: 'Is 21 prime or composite?',
          steps: [
            'Find its factors: 1 × 21 and 3 × 7.',
            'So the factors are 1, 3, 7, 21 — that is four factors.',
            'More than two factors means <strong>composite</strong>.'
          ],
          a: 'Composite'
        },
        {
          q: 'Is 29 prime or composite?',
          steps: [
            'Try 2 — 29 is odd, so no.',
            'Try 3 — 2 + 9 = 11, not a multiple of 3, so no.',
            'Try 5 — it does not end in 0 or 5, so no.',
            'Try 7 — 7 × 4 = 28, 7 × 5 = 35, so no.',
            'Nothing divides it. Only 1 and 29 are left, so it is <strong>prime</strong>.'
          ],
          a: 'Prime'
        }
      ],
      remember: [
        'Prime = exactly 2 factors. Composite = more than 2.',
        '1 is neither prime nor composite — it has only one factor.',
        '2 is the smallest prime and the only even prime.',
        'To test a number under 100, you only need to try 2, 3, 5 and 7.'
      ],
      watchOut: 'Do not say 1 is prime. It is the classic Grade-5 trap, and it appears on the worksheet as a Yes/No question.'
    },
    items: [
      { id: 'math-multiples-factors.prime-composite.i01', type: 'tf', q: '1 is a prime number.', answer: false, level: 1, hint: 'How many factors does 1 have?', explain: '1 has only ONE factor (itself). A prime needs exactly two. 1 is neither prime nor composite.' },
      { id: 'math-multiples-factors.prime-composite.i02', type: 'mcq', q: 'Which is the <strong>smallest prime number</strong>?', options: ['0', '1', '2', '3'], answer: 2, level: 1, explain: '2 is the smallest prime — its only factors are 1 and 2.' },
      { id: 'math-multiples-factors.prime-composite.i03', type: 'fill', q: 'The only <strong>even</strong> prime number is ____', accept: ['2'], level: 1, hint: 'Every other even number can be halved.', explain: 'Every even number after 2 has 2 as an extra factor, so it cannot be prime. 2 is the only even prime.' },
      { id: 'math-multiples-factors.prime-composite.i04', type: 'fill', q: 'The smallest <strong>odd composite</strong> number is ____', accept: ['9'], level: 2, hint: 'Check 3, 5, 7 first — are they prime?', explain: '3, 5 and 7 are all prime. 9 = 3 × 3, so 9 is the smallest odd composite number.' },
      { id: 'math-multiples-factors.prime-composite.i05', type: 'fill', q: 'The smallest <strong>even composite</strong> number is ____', accept: ['4'], level: 2, hint: '2 is prime, so look at the next even number.', explain: '2 is prime. 4 = 1, 2, 4 — three factors — so 4 is the smallest even composite number.' },
      { id: 'math-multiples-factors.prime-composite.i06', type: 'fill', q: 'How many prime numbers are there between 1 and 100?', accept: ['25'], level: 2, hint: 'You counted them in the sieve activity.', explain: 'There are exactly <strong>25</strong> primes below 100. This is a fact worth memorising — it is a standard fill-in-the-blank.' },
      { id: 'math-multiples-factors.prime-composite.i07', type: 'bucket', q: 'Sort these numbers.', buckets: ['Prime', 'Composite'], chips: [{ t: '19', b: 'Prime' }, { t: '21', b: 'Composite' }, { t: '23', b: 'Prime' }, { t: '27', b: 'Composite' }, { t: '31', b: 'Prime' }, { t: '33', b: 'Composite' }], level: 2, explain: '21 = 3 × 7, 27 = 3 × 9, 33 = 3 × 11. The rest have no factors except 1 and themselves.' },
      { id: 'math-multiples-factors.prime-composite.i08', type: 'multi', q: 'Tick <strong>every</strong> prime number.', options: ['2', '9', '13', '15', '17', '21'], answer: [0, 2, 4], level: 2, explain: '9 = 3 × 3, 15 = 3 × 5, 21 = 3 × 7 — all composite. 2, 13 and 17 are prime.' },
      { id: 'math-multiples-factors.prime-composite.i09', type: 'mcq', q: 'A prime number has ____ factors.', options: ['only one', 'exactly two', 'exactly three', 'more than two'], answer: 1, level: 1, explain: 'Exactly two: 1 and the number itself. That is the definition.' },
      { id: 'math-multiples-factors.prime-composite.i10', type: 'tf', q: '51 is a prime number.', answer: false, level: 3, hint: 'Add the digits: 5 + 1 = 6.', explain: '5 + 1 = 6, which is a multiple of 3, so 3 divides 51. In fact 51 = 3 × 17, so it is composite. This one catches a lot of people.' },
      { id: 'math-multiples-factors.prime-composite.i11', type: 'mcq', q: 'Rahul says "All odd numbers are prime." Is he right?', options: ['Yes, always', 'No — 9, 15 and 21 are odd but composite', 'Yes, except for 1', 'Only for numbers under 20'], answer: 1, level: 3, explain: 'Odd does not mean prime. 9 = 3 × 3, 15 = 3 × 5 and 21 = 3 × 7 are all odd AND composite.' },
      { id: 'math-multiples-factors.prime-composite.i12', type: 'fill', q: 'Is 1 a composite number? Answer <strong>Yes</strong> or <strong>No</strong>.', accept: ['no'], level: 2, explain: 'No. A composite number needs more than two factors; 1 has only one. It is neither prime nor composite.' },
      { id: 'math-multiples-factors.prime-composite.i13', type: 'multi', q: 'Tick every <strong>composite</strong> number.', options: ['4', '7', '12', '29', '35'], answer: [0, 2, 4], level: 2, explain: '4 = 2 × 2, 12 = 3 × 4, 35 = 5 × 7. 7 and 29 are prime.' },
      { id: 'math-multiples-factors.prime-composite.i14', type: 'order', q: 'Put these prime numbers in order, smallest first.', answer: ['2', '3', '5', '7', '11', '13'], level: 1, explain: 'The first six primes are 2, 3, 5, 7, 11, 13. Learn this run by heart.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'math-multiples-factors.key-facts',
    subject: 'maths', topic: 'math-multiples-factors',
    name: 'The facts they always ask',
    canDo: 'I can fill in the standard blanks about factors and multiples without hesitating.',
    weight: 5, difficulty: 2,
    prereq: [],
    teach: {
      hook: 'Every half-yearly paper has a row of one-mark blanks. They are free marks if you have these eight facts by heart.',
      explain:
        '<p>These are not things to work out in the exam. They are things to <strong>know</strong>.</p>' +
        '<ul>' +
        '<li>1 is a factor of <strong>every</strong> number.</li>' +
        '<li>Every number is a factor of <strong>itself</strong>.</li>' +
        '<li>The <strong>smallest</strong> factor of any number is 1; the <strong>greatest</strong> factor is the number itself.</li>' +
        '<li>The smallest multiple of a number is the <strong>number itself</strong>.</li>' +
        '<li>The multiples of a number are <strong>endless</strong> — there is no greatest multiple.</li>' +
        '<li>Every number except 1 has <strong>at least two</strong> factors.</li>' +
        '<li>If one number is a factor of another, their <strong>HCF is the smaller</strong> number and their <strong>LCM is the larger</strong>.</li>' +
        '<li>A number is always <strong>divisible</strong> by each of its factors.</li>' +
        '</ul>',
      worked: [
        {
          q: '4 is a factor of 32. What is the LCM of 4 and 32?',
          steps: [
            'Because 4 divides 32 exactly, 32 is already a multiple of both.',
            'When one number is a factor of the other, the LCM is simply the <strong>bigger</strong> number.',
            'So the LCM is 32 — no working needed.'
          ],
          a: '32'
        },
        {
          q: 'What is the greatest multiple of 8?',
          steps: [
            'Multiples of 8: 8, 16, 24, 32, 40 … you can always add 8 again.',
            'The list never stops.',
            'So there is <strong>no greatest multiple</strong>. Multiples are endless.'
          ],
          a: 'There is none — multiples are endless'
        }
      ],
      remember: [
        'Factors are FEW and they stop. Multiples are MANY and they never stop.',
        'Smallest factor = 1. Greatest factor = the number itself.',
        'Smallest multiple = the number itself. Greatest multiple = does not exist.'
      ],
      watchOut: '"The greatest multiple of 8 is ___" is a trick question. The answer is that there is no greatest multiple, not a number.'
    },
    items: [
      { id: 'math-multiples-factors.key-facts.i01', type: 'fill', q: '____ is a factor of every number.', accept: ['1', 'one'], level: 1, explain: '1 divides every number exactly, so 1 is a factor of them all.' },
      { id: 'math-multiples-factors.key-facts.i02', type: 'fill', q: 'The smallest factor of any number is ____', accept: ['1', 'one'], level: 1, explain: 'Every factor list starts at 1.' },
      { id: 'math-multiples-factors.key-facts.i03', type: 'mcq', q: 'The greatest factor of 36 is ____', options: ['1', '6', '18', '36'], answer: 3, level: 1, explain: 'The biggest factor of a number is always the number itself — 36 × 1 = 36.' },
      { id: 'math-multiples-factors.key-facts.i04', type: 'fill', q: 'The smallest multiple of 7 is ____', accept: ['7', 'seven'], level: 1, hint: '7 × 1 = ?', explain: 'The first multiple is always the number itself: 7 × 1 = 7.' },
      { id: 'math-multiples-factors.key-facts.i05', type: 'mcq', q: 'The multiples of a number are ____', options: ['limited', 'endless', 'always even', 'always odd'], answer: 1, level: 2, explain: 'You can always multiply by a bigger number, so the list of multiples never ends.' },
      { id: 'math-multiples-factors.key-facts.i06', type: 'mcq', q: 'What is the greatest multiple of 8?', options: ['88', '800', '8 × 100', 'There is no greatest multiple'], answer: 3, level: 3, hint: 'Can you always add another 8?', explain: 'Multiples go on for ever, so there is no greatest one. This is a favourite trick blank.' },
      { id: 'math-multiples-factors.key-facts.i07', type: 'fill', q: '4 is a factor of 32, so the LCM of 4 and 32 is ____', accept: ['32'], level: 2, hint: 'One number divides the other exactly.', explain: 'When one number is a factor of the other, the LCM is the larger number: 32.' },
      { id: 'math-multiples-factors.key-facts.i08', type: 'fill', q: '4 is a factor of 32, so the HCF of 4 and 32 is ____', accept: ['4'], level: 2, explain: 'When one number is a factor of the other, the HCF is the smaller number: 4.' },
      { id: 'math-multiples-factors.key-facts.i09', type: 'fill', q: '____ is the highest common factor of 15 and 9.', accept: ['3'], level: 2, hint: 'Factors of 15: 1, 3, 5, 15. Factors of 9: 1, 3, 9.', explain: 'The common factors of 15 and 9 are 1 and 3. The highest is <strong>3</strong>.' },
      { id: 'math-multiples-factors.key-facts.i10', type: 'tf', q: 'Every number except 1 has at least two factors.', answer: true, level: 2, explain: 'True — every number has 1 and itself, which is two factors. Only 1 has just one factor.' },
      { id: 'math-multiples-factors.key-facts.i11', type: 'fill', q: 'The common factor of two numbers that share nothing is always ____', accept: ['1', 'one'], level: 2, hint: 'Your notes worked this out for 18 and 25.', explain: '1 is a factor of every number, so it is always common. Your notes have "Common factor of 18, 25 = 1".' },
      { id: 'math-multiples-factors.key-facts.i12', type: 'bucket', q: 'Which of these go on for ever, and which stop?', buckets: ['Endless', 'Has an end'], chips: [{ t: 'Multiples of 6', b: 'Endless' }, { t: 'Factors of 6', b: 'Has an end' }, { t: 'Multiples of 12', b: 'Endless' }, { t: 'Factors of 100', b: 'Has an end' }], level: 2, explain: 'Factors are a short, finished list. Multiples never stop.' },
      { id: 'math-multiples-factors.key-facts.i13', type: 'mcq', q: 'A number is always divisible by ____', options: ['its multiples', 'each of its factors', 'every prime', 'the number 10'], answer: 1, level: 2, explain: 'A factor divides the number exactly with no remainder — that is what a factor means.' },
      { id: 'math-multiples-factors.key-facts.i14', type: 'fill', q: 'The HCF of two prime numbers, such as 7 and 11, is ____', accept: ['1', 'one'], level: 3, explain: 'Two different primes share only the factor 1, so their HCF is 1.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'math-multiples-factors.prime-factorisation',
    subject: 'maths', topic: 'math-multiples-factors',
    name: 'Prime factorisation',
    canDo: 'I can break any number down into a product of prime numbers.',
    weight: 5, difficulty: 2,
    prereq: ['math-multiples-factors.prime-composite'],
    gen: ['primeFactorisation'],
    teach: {
      hook: 'Every number is built out of primes, like a Lego model built out of bricks. Prime factorisation is taking the model apart to see the bricks.',
      explain:
        '<p>Keep dividing by the <strong>smallest prime that goes in</strong>, until you are left with 1.</p>' +
        '<p>Try 2 first. When 2 stops working, try 3. Then 5, then 7. Write the primes you divided by, and multiply them together — that is the prime factorisation.</p>' +
        '<p>Here is the magic bit: <strong>it does not matter which way you split first</strong>. 36 can start as 6 × 6 or as 4 × 9, and you still end up with 2 × 2 × 3 × 3.</p>',
      worked: [
        {
          q: 'Find the prime factorisation of 36.',
          steps: [
            '36 ÷ 2 = 18',
            '18 ÷ 2 = 9',
            '9 will not divide by 2, so move to 3:  9 ÷ 3 = 3',
            '3 ÷ 3 = 1 — stop.',
            'The primes used were 2, 2, 3, 3.'
          ],
          a: '36 = 2 × 2 × 3 × 3'
        },
        {
          q: 'Find the prime factorisation of 81.',
          steps: [
            '81 is odd, so 2 is no use. Try 3.',
            '81 ÷ 3 = 27,  27 ÷ 3 = 9,  9 ÷ 3 = 3,  3 ÷ 3 = 1.',
            'Four threes were used.'
          ],
          a: '81 = 3 × 3 × 3 × 3'
        }
      ],
      remember: [
        'Always start with the smallest prime that divides: 2, then 3, then 5, then 7.',
        'Stop when you reach 1.',
        'Write the answer with × signs between the primes, smallest first.'
      ],
      watchOut: 'The answer must contain ONLY primes. "36 = 4 × 9" is not a prime factorisation, because 4 and 9 are both composite.'
    },
    items: [
      { id: 'math-multiples-factors.prime-factorisation.i01', type: 'fill', q: 'Prime factorisation of <strong>32</strong>', accept: ['2x2x2x2x2', '2*2*2*2*2', '2,2,2,2,2'], level: 1, placeholder: 'like 2x2x3', hint: 'Halve it again and again.', explain: '32 → 16 → 8 → 4 → 2 → 1, dividing by 2 each time. So 32 = 2 × 2 × 2 × 2 × 2.' },
      { id: 'math-multiples-factors.prime-factorisation.i02', type: 'fill', q: 'Prime factorisation of <strong>81</strong>', accept: ['3x3x3x3', '3*3*3*3', '3,3,3,3'], level: 1, hint: '81 is odd — start at 3.', explain: '81 ÷ 3 = 27 ÷ 3 = 9 ÷ 3 = 3 ÷ 3 = 1. So 81 = 3 × 3 × 3 × 3.' },
      { id: 'math-multiples-factors.prime-factorisation.i03', type: 'fill', q: 'Prime factorisation of <strong>51</strong>', accept: ['3x17', '3*17', '3,17'], level: 3, hint: '5 + 1 = 6, so 3 divides it.', explain: '51 ÷ 3 = 17, and 17 is prime. So 51 = 3 × 17. Only two primes — that surprises people.' },
      { id: 'math-multiples-factors.prime-factorisation.i04', type: 'fill', q: 'Prime factorisation of <strong>75</strong>', accept: ['3x5x5', '3*5*5', '3,5,5'], level: 2, hint: 'It ends in 5, so 5 goes in.', explain: '75 ÷ 3 = 25, 25 ÷ 5 = 5, 5 ÷ 5 = 1. So 75 = 3 × 5 × 5.' },
      { id: 'math-multiples-factors.prime-factorisation.i05', type: 'fill', q: 'Prime factorisation of <strong>27</strong>', accept: ['3x3x3', '3*3*3', '3,3,3'], level: 1, explain: '27 ÷ 3 = 9 ÷ 3 = 3 ÷ 3 = 1. So 27 = 3 × 3 × 3.' },
      { id: 'math-multiples-factors.prime-factorisation.i06', type: 'steps', q: 'Find the prime factorisation of <strong>36</strong>, one step at a time.', level: 2, parts: [{ q: 'Divide 36 by the smallest prime that goes in. What do you get?', accept: ['18'], hint: '36 ÷ 2', why: '36 ÷ 2 = 18' }, { q: 'Now divide 18 by 2.', accept: ['9'], why: '18 ÷ 2 = 9' }, { q: '9 will not divide by 2. Divide it by 3.', accept: ['3'], why: '9 ÷ 3 = 3' }, { q: 'Write the whole prime factorisation of 36 (use x between the primes).', accept: ['2x2x3x3', '2*2*3*3', '2,2,3,3'], why: '36 = 2 × 2 × 3 × 3' }], explain: '36 = 2 × 2 × 3 × 3.' },
      { id: 'math-multiples-factors.prime-factorisation.i07', type: 'mcq', q: 'Which of these is a correct <strong>prime</strong> factorisation of 24?', options: ['4 × 6', '2 × 12', '2 × 2 × 2 × 3', '3 × 8'], answer: 2, level: 2, explain: 'Only 2 × 2 × 2 × 3 uses nothing but primes. 4, 6, 12 and 8 are all composite.' },
      { id: 'math-multiples-factors.prime-factorisation.i08', type: 'tf', q: '36 = 4 × 9 is a prime factorisation.', answer: false, level: 2, explain: 'No — 4 and 9 are composite. Keep splitting until every part is prime: 2 × 2 × 3 × 3.' },
      { id: 'math-multiples-factors.prime-factorisation.i09', type: 'fill', q: 'Prime factorisation of <strong>100</strong>', accept: ['2x2x5x5', '2*2*5*5', '2,2,5,5'], level: 2, explain: '100 ÷ 2 = 50, 50 ÷ 2 = 25, 25 ÷ 5 = 5, 5 ÷ 5 = 1. So 100 = 2 × 2 × 5 × 5.' },
      { id: 'math-multiples-factors.prime-factorisation.i10', type: 'fill', q: 'Prime factorisation of <strong>45</strong>', accept: ['3x3x5', '3*3*5', '3,3,5'], level: 2, explain: '45 ÷ 3 = 15, 15 ÷ 3 = 5, 5 ÷ 5 = 1. So 45 = 3 × 3 × 5.' },
      { id: 'math-multiples-factors.prime-factorisation.i11', type: 'mcq', q: 'How many prime factors does 48 have when you write it out in full (counting repeats)?', options: ['3', '4', '5', '6'], answer: 2, level: 3, hint: '48 = 2 × 2 × 2 × 2 × 3', explain: '48 = 2 × 2 × 2 × 2 × 3 — that is five primes altogether.' },
      { id: 'math-multiples-factors.prime-factorisation.i12', type: 'fill', q: 'A number breaks down as 2 × 3 × 5. What is the number?', accept: ['30'], level: 2, explain: '2 × 3 = 6, 6 × 5 = 30. Multiplying the primes back together always returns the original number — a good way to check your work.' },
      { id: 'math-multiples-factors.prime-factorisation.i13', type: 'steps', q: 'Find the prime factorisation of <strong>72</strong>.', level: 3, parts: [{ q: '72 ÷ 2 = ?', accept: ['36'], why: '36' }, { q: '36 ÷ 2 = ?', accept: ['18'], why: '18' }, { q: '18 ÷ 2 = ?', accept: ['9'], why: '9' }, { q: 'Now write the full prime factorisation of 72.', accept: ['2x2x2x3x3', '2*2*2*3*3', '2,2,2,3,3'], why: '72 = 2 × 2 × 2 × 3 × 3' }], explain: '72 = 2 × 2 × 2 × 3 × 3.' },
      { id: 'math-multiples-factors.prime-factorisation.i14', type: 'tf', q: 'If you split 36 as 6 × 6 instead of 4 × 9, you get a different prime factorisation.', answer: false, level: 3, explain: 'You always end up with the same primes: 2 × 2 × 3 × 3. The route changes, the destination never does.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'math-multiples-factors.hcf',
    subject: 'maths', topic: 'math-multiples-factors',
    name: 'HCF',
    canDo: 'I can find the highest common factor of two or three numbers using prime factorisation.',
    weight: 5, difficulty: 3,
    prereq: ['math-multiples-factors.prime-factorisation'],
    gen: ['hcfPrimeFactorisation', 'hcfQuick'],
    teach: {
      hook: 'HCF is the biggest thing two numbers have in common. Think of it as the largest identical box that both amounts can be packed into with nothing left over.',
      explain:
        '<p><strong>HCF</strong> stands for <strong>Highest Common Factor</strong>. Two ways to find it:</p>' +
        '<p><strong>1. By listing</strong> — write out all the factors of each number, ring the ones in both lists, and take the biggest.</p>' +
        '<p><strong>2. By prime factorisation</strong> (faster for big numbers) — break both numbers into primes, then multiply the primes that appear in <strong>both</strong> lists.</p>',
      worked: [
        {
          q: 'Find the HCF of 28 and 56.',
          steps: [
            '28 = 2 × 2 × 7',
            '56 = 2 × 2 × 2 × 7',
            'Primes in <strong>both</strong> lists: 2, 2 and 7.',
            'Multiply them: 2 × 2 × 7 = 28.'
          ],
          a: 'HCF = 28'
        },
        {
          q: 'Find the HCF of 18, 45 and 63.',
          steps: [
            '18 = 2 × 3 × 3',
            '45 = 3 × 3 × 5',
            '63 = 3 × 3 × 7',
            'The only primes in all three lists are 3 and 3.',
            '3 × 3 = 9.'
          ],
          a: 'HCF = 9'
        }
      ],
      remember: [
        'HCF = Highest Common Factor. It is never bigger than the smaller number.',
        'Multiply only the primes that appear in EVERY list.',
        'If the numbers share nothing, the HCF is 1.'
      ],
      watchOut: 'A prime counts only as many times as it appears in both lists. 28 has two 2s and 56 has three, so only <em>two</em> 2s go into the HCF.'
    },
    items: [
      { id: 'math-multiples-factors.hcf.i01', type: 'fill', q: 'HCF of <strong>10 and 16</strong>', accept: ['2'], level: 1, hint: '10 = 2 × 5, 16 = 2 × 2 × 2 × 2', explain: 'They share only one 2, so the HCF is 2.' },
      { id: 'math-multiples-factors.hcf.i02', type: 'fill', q: 'HCF of <strong>27 and 30</strong>', accept: ['3'], level: 2, hint: '27 = 3 × 3 × 3, 30 = 2 × 3 × 5', explain: 'The only prime in both lists is a single 3, so HCF = 3.' },
      { id: 'math-multiples-factors.hcf.i03', type: 'fill', q: 'HCF of <strong>28 and 56</strong>', accept: ['28'], level: 2, hint: 'Does 28 divide 56 exactly?', explain: '28 is a factor of 56, so the HCF is the smaller number itself: 28.' },
      { id: 'math-multiples-factors.hcf.i04', type: 'fill', q: 'HCF of <strong>35 and 75</strong>', accept: ['5'], level: 2, hint: '35 = 5 × 7, 75 = 3 × 5 × 5', explain: 'They share one 5 only, so HCF = 5.' },
      { id: 'math-multiples-factors.hcf.i05', type: 'fill', q: 'HCF of <strong>18, 45 and 63</strong>', accept: ['9'], level: 3, hint: 'All three are multiples of 9.', explain: '18 = 2×3×3, 45 = 3×3×5, 63 = 3×3×7. All share 3 × 3 = 9.' },
      { id: 'math-multiples-factors.hcf.i06', type: 'steps', q: 'Find the HCF of <strong>24 and 36</strong> by prime factorisation.', level: 2, parts: [{ q: 'Prime factors of 24', accept: ['2x2x2x3', '2*2*2*3', '2,2,2,3'], why: '24 = 2 × 2 × 2 × 3' }, { q: 'Prime factors of 36', accept: ['2x2x3x3', '2*2*3*3', '2,2,3,3'], why: '36 = 2 × 2 × 3 × 3' }, { q: 'Which primes appear in BOTH lists? (write them with x between)', accept: ['2x2x3', '2*2*3', '2,2,3'], why: 'Two 2s and one 3.' }, { q: 'So the HCF is', accept: ['12'], why: '2 × 2 × 3 = 12' }], explain: 'HCF of 24 and 36 = 12.' },
      { id: 'math-multiples-factors.hcf.i07', type: 'mcq', q: 'The HCF of two numbers is always ____', options: ['bigger than both numbers', 'equal to the larger number', 'less than or equal to the smaller number', 'always 1'], answer: 2, level: 3, explain: 'A common factor has to divide the smaller number, so it can never be bigger than it.' },
      { id: 'math-multiples-factors.hcf.i08', type: 'fill', q: 'HCF of <strong>7 and 13</strong>', accept: ['1'], level: 2, explain: 'Both are prime and different, so the only factor they share is 1.' },
      { id: 'math-multiples-factors.hcf.i09', type: 'tf', q: 'The HCF of 12 and 36 is 36.', answer: false, level: 2, explain: 'No — 36 does not divide 12. The HCF is 12, because 12 is a factor of 36.' },
      { id: 'math-multiples-factors.hcf.i10', type: 'fill', q: 'HCF of <strong>16 and 24</strong>', accept: ['8'], level: 2, hint: '16 = 2×2×2×2, 24 = 2×2×2×3', explain: 'They share three 2s: 2 × 2 × 2 = 8.' },
      { id: 'math-multiples-factors.hcf.i11', type: 'mcq', q: 'Which pair has an HCF of 1?', options: ['12 and 18', '9 and 16', '20 and 30', '14 and 21'], answer: 1, level: 3, explain: '9 = 3 × 3 and 16 = 2 × 2 × 2 × 2 — no prime in common, so HCF = 1. The others all share a factor.' },
      { id: 'math-multiples-factors.hcf.i12', type: 'fill', q: 'HCF of <strong>15 and 9</strong>', accept: ['3'], level: 1, explain: 'Factors of 15: 1, 3, 5, 15. Factors of 9: 1, 3, 9. The highest common one is 3.' },
      { id: 'math-multiples-factors.hcf.i13', type: 'steps', q: 'Find the HCF of <strong>18 and 45</strong>.', level: 2, parts: [{ q: 'Prime factors of 18', accept: ['2x3x3', '2*3*3', '2,3,3'], why: '18 = 2 × 3 × 3' }, { q: 'Prime factors of 45', accept: ['3x3x5', '3*3*5', '3,3,5'], why: '45 = 3 × 3 × 5' }, { q: 'HCF', accept: ['9'], why: 'They share 3 × 3 = 9.' }], explain: 'HCF of 18 and 45 = 9.' },
      { id: 'math-multiples-factors.hcf.i14', type: 'fill', q: 'HCF of <strong>20 and 30</strong>', accept: ['10'], level: 2, explain: '20 = 2 × 2 × 5, 30 = 2 × 3 × 5. Shared: 2 × 5 = 10.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'math-multiples-factors.lcm',
    subject: 'maths', topic: 'math-multiples-factors',
    name: 'LCM',
    canDo: 'I can find the lowest common multiple of two or three numbers.',
    weight: 5, difficulty: 3,
    prereq: ['math-multiples-factors.prime-factorisation'],
    gen: ['lcmCommonDivision', 'lcmQuick'],
    teach: {
      hook: 'Two buses leave the stop together, one every 12 minutes and one every 18. When will they leave together again? That answer is the LCM.',
      explain:
        '<p><strong>LCM</strong> stands for <strong>Lowest Common Multiple</strong> — the smallest number that both (or all) of your numbers divide into.</p>' +
        '<p><strong>By listing:</strong> write out the multiples of each number and find the first one they share.</p>' +
        '<p><strong>By common division</strong> (the method in your workbook): write the numbers in a row, keep dividing by a prime that goes into <em>at least one</em> of them, carry down anything that will not divide, and stop when the bottom row is all 1s. Multiply everything down the left-hand side.</p>',
      worked: [
        {
          q: 'Find the LCM of 12, 18 and 24 by common division.',
          steps: [
            '2 | 12, 18, 24  →  6, 9, 12',
            '2 | 6, 9, 12    →  3, 9, 6   (9 will not halve, so carry it down)',
            '2 | 3, 9, 6     →  3, 9, 3',
            '3 | 3, 9, 3     →  1, 3, 1',
            '3 | 1, 3, 1     →  1, 1, 1  — stop.',
            'Multiply the left column: 2 × 2 × 2 × 3 × 3 = 72.'
          ],
          a: 'LCM = 72'
        },
        {
          q: 'Find the LCM of 10, 15 and 25.',
          steps: [
            'Multiples of 25: 25, 50, 75, 100, 125, 150 …',
            '150 ÷ 10 = 15 exactly, and 150 ÷ 15 = 10 exactly.',
            'Nothing smaller works for all three.'
          ],
          a: 'LCM = 150'
        }
      ],
      remember: [
        'LCM = Lowest Common Multiple. It is never smaller than the largest number.',
        'Quick check: HCF × LCM = the two numbers multiplied together.',
        'If one number is a factor of the other, the LCM is simply the larger number.'
      ],
      watchOut: 'Do not mix them up. HCF is a <strong>Factor</strong>, so it is small. LCM is a <strong>Multiple</strong>, so it is big.'
    },
    items: [
      { id: 'math-multiples-factors.lcm.i01', type: 'fill', q: 'LCM of <strong>10, 15 and 25</strong>', accept: ['150'], level: 3, hint: 'Try the multiples of 25.', explain: '10 = 2×5, 15 = 3×5, 25 = 5×5 → LCM = 2 × 3 × 5 × 5 = 150.' },
      { id: 'math-multiples-factors.lcm.i02', type: 'fill', q: 'LCM of <strong>20, 25 and 30</strong>', accept: ['300'], level: 3, explain: '20 = 2×2×5, 25 = 5×5, 30 = 2×3×5 → LCM = 2×2×3×5×5 = 300.' },
      { id: 'math-multiples-factors.lcm.i03', type: 'fill', q: 'LCM of <strong>48 and 84</strong>', accept: ['336'], level: 3, hint: '48 = 2×2×2×2×3, 84 = 2×2×3×7', explain: 'LCM = 2×2×2×2×3×7 = 336.' },
      { id: 'math-multiples-factors.lcm.i04', type: 'fill', q: 'LCM of <strong>30 and 55</strong>', accept: ['330'], level: 3, hint: '30 = 2×3×5, 55 = 5×11', explain: 'LCM = 2 × 3 × 5 × 11 = 330.' },
      { id: 'math-multiples-factors.lcm.i05', type: 'fill', q: 'LCM of <strong>12, 18 and 24</strong>', accept: ['72'], level: 3, explain: '12 = 2×2×3, 18 = 2×3×3, 24 = 2×2×2×3 → LCM = 2×2×2×3×3 = 72.' },
      { id: 'math-multiples-factors.lcm.i06', type: 'fill', q: 'LCM of <strong>4 and 6</strong>', accept: ['12'], level: 1, hint: 'Multiples of 6: 6, 12, 18…', explain: 'Multiples of 4: 4, 8, 12… Multiples of 6: 6, 12… The first they share is 12.' },
      { id: 'math-multiples-factors.lcm.i07', type: 'fill', q: 'LCM of <strong>5 and 7</strong>', accept: ['35'], level: 2, explain: 'They share no factors, so the LCM is just 5 × 7 = 35.' },
      { id: 'math-multiples-factors.lcm.i08', type: 'mcq', q: 'The LCM of two numbers is always ____', options: ['smaller than both', 'at least as big as the larger number', 'equal to their HCF', 'always their product'], answer: 1, level: 3, explain: 'The LCM has to be a multiple of the bigger number, so it can never be smaller than it.' },
      { id: 'math-multiples-factors.lcm.i09', type: 'fill', q: 'LCM of <strong>6 and 12</strong>', accept: ['12'], level: 1, hint: 'Is 6 a factor of 12?', explain: '6 divides 12 exactly, so the LCM is simply the larger number: 12.' },
      { id: 'math-multiples-factors.lcm.i10', type: 'steps', q: 'Find the LCM of <strong>42, 56 and 70</strong>.', level: 3, parts: [{ q: 'Prime factors of 42', accept: ['2x3x7', '2*3*7', '2,3,7'], why: '42 = 2 × 3 × 7' }, { q: 'Prime factors of 56', accept: ['2x2x2x7', '2*2*2*7', '2,2,2,7'], why: '56 = 2 × 2 × 2 × 7' }, { q: 'Prime factors of 70', accept: ['2x5x7', '2*5*7', '2,5,7'], why: '70 = 2 × 5 × 7' }, { q: 'LCM (take the most of each prime and multiply)', accept: ['840'], why: '2×2×2 × 3 × 5 × 7 = 840' }], explain: 'LCM of 42, 56 and 70 = 840.' },
      { id: 'math-multiples-factors.lcm.i11', type: 'tf', q: 'For 6 and 8: HCF × LCM = 6 × 8.', answer: true, level: 3, hint: 'HCF = 2, LCM = 24.', explain: 'HCF = 2, LCM = 24, and 2 × 24 = 48 = 6 × 8. This check works for any pair of numbers.' },
      { id: 'math-multiples-factors.lcm.i12', type: 'fill', q: 'LCM of <strong>8 and 12</strong>', accept: ['24'], level: 2, explain: '8 = 2×2×2, 12 = 2×2×3 → LCM = 2×2×2×3 = 24.' },
      { id: 'math-multiples-factors.lcm.i13', type: 'mcq', q: 'Which is bigger for the numbers 9 and 12 — the HCF or the LCM?', options: ['The HCF', 'The LCM', 'They are equal', 'It depends'], answer: 1, level: 2, explain: 'HCF = 3, LCM = 36. The LCM is a multiple so it is always the bigger of the two.' },
      { id: 'math-multiples-factors.lcm.i14', type: 'fill', q: 'LCM of <strong>3, 4 and 5</strong>', accept: ['60'], level: 2, explain: 'They share no factors, so multiply them: 3 × 4 × 5 = 60.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'math-multiples-factors.hcf-or-lcm',
    subject: 'maths', topic: 'math-multiples-factors',
    name: 'HCF or LCM? Word problems',
    canDo: 'I can read a word problem and decide whether it needs the HCF or the LCM, then solve it.',
    weight: 5, difficulty: 3,
    prereq: ['math-multiples-factors.hcf', 'math-multiples-factors.lcm'],
    teach: {
      hook: 'In the exam the hard part is never the arithmetic. It is knowing which of the two you need. There is a reliable clue.',
      explain:
        '<p>Read what the problem is doing to the amounts.</p>' +
        '<p><strong>SPLITTING things up into equal groups → HCF.</strong> Words like <em>greatest, largest, maximum, each, equal groups, cut into pieces, share out</em>. The answer comes out <strong>smaller</strong> than the numbers.</p>' +
        '<p><strong>REPEATING things until they meet → LCM.</strong> Words like <em>least, smallest, together again, same time, ring together, minimum number needed</em>. The answer comes out <strong>bigger</strong> than the numbers.</p>',
      worked: [
        {
          q: 'A wall needs 90 bricks in each row. Rows of 12 and rows of 18 are also possible. What is the greatest number of bricks that could be in each equal stack?',
          steps: [
            'We are <strong>splitting</strong> into equal stacks, and we want the <strong>greatest</strong> size.',
            'That is a HCF question.',
            'HCF of 12 and 18: 12 = 2 × 2 × 3, 18 = 2 × 3 × 3 → shared 2 × 3 = 6.'
          ],
          a: '6 bricks in each stack'
        },
        {
          q: 'Two bells ring every 12 minutes and every 18 minutes. They ring together now. After how long will they ring together again?',
          steps: [
            'The bells <strong>repeat</strong> and we want when they next <strong>meet</strong>.',
            'That is an LCM question.',
            '12 = 2 × 2 × 3, 18 = 2 × 3 × 3 → LCM = 2 × 2 × 3 × 3 = 36.'
          ],
          a: '36 minutes'
        }
      ],
      remember: [
        'Cutting up and sharing out → HCF (the answer gets smaller).',
        'Repeating until they meet → LCM (the answer gets bigger).',
        'Check your answer against common sense: could 4 people really get 200 sweets each from 24?'
      ],
      watchOut: 'The words "greatest" and "least" in the question are the giveaway — but read carefully, because "the least number of boxes" can still be an HCF question about box size.'
    },
    items: [
      { id: 'math-multiples-factors.hcf-or-lcm.i01', type: 'mcq', q: 'Two lighthouses flash every 8 seconds and every 12 seconds. After how many seconds do they flash together? <br>Which do you need?', options: ['HCF', 'LCM'], answer: 1, level: 2, explain: 'They repeat and we want when they next meet — that is the LCM. (LCM of 8 and 12 = 24 seconds.)' },
      { id: 'math-multiples-factors.hcf-or-lcm.i02', type: 'mcq', q: 'Ribbons of 36 cm and 48 cm are cut into equal pieces, as long as possible. Which do you need?', options: ['HCF', 'LCM'], answer: 0, level: 2, explain: 'We are cutting into equal pieces and want the greatest length — that is the HCF. (HCF of 36 and 48 = 12 cm.)' },
      { id: 'math-multiples-factors.hcf-or-lcm.i03', type: 'fill', q: 'Two bells ring every 12 minutes and every 18 minutes. They ring together now. After how many <strong>minutes</strong> will they ring together again?', accept: ['36'], level: 3, hint: 'They repeat until they meet.', explain: 'LCM of 12 and 18 = 36. They ring together every 36 minutes.' },
      { id: 'math-multiples-factors.hcf-or-lcm.i04', type: 'fill', q: 'Ribbons 36 cm and 48 cm long are cut into equal pieces, each as long as possible. How long is each piece, in cm?', accept: ['12', '12 cm'], level: 3, explain: 'HCF of 36 and 48 = 12, so each piece is 12 cm.' },
      { id: 'math-multiples-factors.hcf-or-lcm.i05', type: 'bucket', q: 'Sort each problem by what it needs.', buckets: ['HCF', 'LCM'], chips: [{ t: 'Largest equal groups', b: 'HCF' }, { t: 'When two buses meet again', b: 'LCM' }, { t: 'Biggest tile that fits both walls', b: 'HCF' }, { t: 'Smallest number both divide into', b: 'LCM' }], level: 2, explain: 'Splitting up → HCF. Repeating until they meet → LCM.' },
      { id: 'math-multiples-factors.hcf-or-lcm.i06', type: 'fill', q: '24 pencils and 36 erasers are packed into identical kits with nothing left over. What is the <strong>greatest number of kits</strong>?', accept: ['12'], level: 3, hint: 'Both amounts must divide by the number of kits.', explain: 'HCF of 24 and 36 = 12. So 12 kits, each with 2 pencils and 3 erasers.' },
      { id: 'math-multiples-factors.hcf-or-lcm.i07', type: 'fill', q: 'What is the <strong>smallest</strong> number that is exactly divisible by 6, 8 and 12?', accept: ['24'], level: 3, explain: '6 = 2×3, 8 = 2×2×2, 12 = 2×2×3 → LCM = 2×2×2×3 = 24.' },
      { id: 'math-multiples-factors.hcf-or-lcm.i08', type: 'mcq', q: 'A boy has 90 bricks. He builds rows with the same number of bricks in each row, using every brick. Which of these could NOT be the number of rows?', options: ['5', '9', '10', '12'], answer: 3, level: 3, hint: 'Which of these is not a factor of 90?', explain: '90 ÷ 12 = 7.5, which is not a whole number. 12 is not a factor of 90, so it cannot work.' },
      { id: 'math-multiples-factors.hcf-or-lcm.i09', type: 'fill', q: 'Two runners circle a track in 40 seconds and 60 seconds. They start together. After how many <strong>seconds</strong> are they together at the start again?', accept: ['120'], level: 3, explain: 'LCM of 40 and 60 = 120 seconds (2 minutes).' },
      { id: 'math-multiples-factors.hcf-or-lcm.i10', type: 'mcq', q: 'Which answer must be <strong>smaller</strong> than both starting numbers (or equal to one)?', options: ['The HCF', 'The LCM', 'Both', 'Neither'], answer: 0, level: 2, explain: 'The HCF is a factor, so it can never exceed the smaller number. The LCM is a multiple, so it is never below the larger one.' },
      { id: 'math-multiples-factors.hcf-or-lcm.i11', type: 'fill', q: 'The floor of a room is 12 m by 18 m. What is the side, in metres, of the <strong>largest</strong> square tile that fits exactly?', accept: ['6', '6 m'], level: 3, hint: 'The tile must divide both 12 and 18.', explain: 'HCF of 12 and 18 = 6, so the largest square tile is 6 m by 6 m.' },
      { id: 'math-multiples-factors.hcf-or-lcm.i12', type: 'tf', q: 'A problem asking for the "least number of sweets that can be shared equally among 4, 6 or 8 children" needs the LCM.', answer: true, level: 3, explain: 'The number must be a multiple of 4, 6 and 8, and we want the smallest — that is the LCM, which is 24.' },
      { id: 'math-multiples-factors.hcf-or-lcm.i13', type: 'fill', q: 'What is the least number of sweets that can be shared equally among 4, 6 or 8 children?', accept: ['24'], level: 3, explain: 'LCM of 4, 6 and 8 = 24.' },
      { id: 'math-multiples-factors.hcf-or-lcm.i14', type: 'mcq', q: 'Priya works out that the HCF of 15 and 20 is 60. What went wrong?', options: ['Nothing, 60 is right', 'She found the LCM instead of the HCF', 'She added instead of multiplying', 'She forgot 1 is a factor'], answer: 1, level: 3, explain: '60 is the LCM. The HCF of 15 and 20 is 5. If your "HCF" is bigger than both numbers, you have found the LCM by mistake.' }
    ]
  }

]);
