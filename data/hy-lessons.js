/* ============================================================
   HALF-YEARLY HQ — interactive lessons
   The LEARN half of the app.

   A lesson is a short journey of single-idea screens. The shape
   is always the same and it is deliberate:

       intro    →  why should I care
       idea     →  the explanation, in plain words
       explore  →  APPARATUS he plays with, where the rule
                   actually gets discovered
       teach    →  the formal rule card, now that it means
                   something
       check    →  three or four real questions that count
       milestone→  what he can now do

   Discovery before definition. The `explore` screen locks the
   Next button until he has actually used the thing, so the
   apparatus cannot be clicked past.
   ============================================================ */
window.HY_LESSONS = (window.HY_LESSONS || []).concat([

  /* ============================================================
     MATHS · MULTIPLES AND FACTORS
     ============================================================ */
  {
    id: 'ml-factors', topic: 'math-multiples-factors', emoji: '🧱', minutes: 8,
    title: 'What a factor really is',
    stages: [
      { kind: 'intro', emoji: '🧱', title: 'Factors are rectangles',
        body: '<p>You already know how to <em>list</em> factors. This lesson is about what a factor actually <strong>is</strong> — because once you can see it, HCF, primes and prime factorisation all become easy.</p>' },
      { kind: 'idea', emoji: '🔍', title: 'The rectangle test',
        body: '<p>Take some counters and try to arrange them into a perfect rectangle.</p>' +
              '<p>If they fit with <strong>nothing left over</strong>, the number of rows is a <strong>factor</strong>. If some counters are stranded, it is not.</p>' +
              '<p>That is the whole idea. A factor divides the number exactly.</p>',
        remember: ['Factor = a number that divides exactly, with no remainder.', 'Every rectangle gives you TWO factors at once — the rows and the columns.'] },
      { kind: 'explore', emoji: '🧱', title: 'Build the rectangles', widget: 'factorRectangles', opts: { n: 24 },
        why: 'Find every factor of 24 by making rectangles. Watch what happens when the number of rows does not divide it.' },
      { kind: 'idea', emoji: '🪜', title: 'Why the pairs meet in the middle',
        body: '<p>Notice something: 1 × 24, 2 × 12, 3 × 8, 4 × 6 … and then it stops.</p>' +
              '<p>After 4 × 6 the next pair would be 6 × 4, which you have already had. The pairs <strong>meet in the middle</strong> and start repeating.</p>' +
              '<p>That is why your notes tell you to work upwards until the pairs meet, and then stop. It is not a rule to memorise — it is just what happens.</p>',
        watchOut: 'A number with an exact square root, like 36 (6 × 6), has a pair where both numbers are the same. That is why 36 has an odd number of factors.' },
      { kind: 'explore', emoji: '🧱', title: 'Try a harder one', widget: 'factorRectangles', opts: { n: 36 },
        why: '36 behaves slightly differently. See if you can spot why it has an odd number of factors.' },
      { kind: 'teach', skill: 'math-multiples-factors.factors' },
      { kind: 'check', skills: ['math-multiples-factors.factors'], items: 4, title: 'Quick check' },
      { kind: 'milestone', emoji: '🧱', title: 'Factors, sorted',
        body: '<p>You can now see a factor instead of just reciting one.</p>',
        canNow: ['Explain what a factor is, in your own words', 'Find every factor of a number using pairs', 'Say why the pairs stop in the middle'] }
    ]
  },

  {
    id: 'ml-multiples', topic: 'math-multiples-factors', emoji: '🎨', minutes: 7,
    title: 'Multiples, and where they meet',
    stages: [
      { kind: 'intro', emoji: '🎨', title: 'Two colours, one grid',
        body: '<p>Multiples are easy on their own. The interesting bit is what happens when the multiples of two numbers land on the <strong>same square</strong>.</p>' },
      { kind: 'idea', emoji: '➕', title: 'What a multiple is',
        body: '<p>A multiple is what you get when you multiply a number by 1, 2, 3, 4 …</p>' +
              '<p>So the multiples of 6 are 6, 12, 18, 24, 30 … and the list <strong>never ends</strong>.</p>' +
              '<p>That is the big difference from factors. Factors are a short, finished list. Multiples go on for ever.</p>',
        remember: ['The first multiple of a number is the number itself.', 'Multiples never run out — there is no "greatest multiple".'] },
      { kind: 'explore', emoji: '🎨', title: 'Colour the grid', widget: 'multipleGrid', opts: { a: 4, b: 6, max: 60 },
        why: 'Pick two numbers and watch their multiples light up. The squares that get BOTH colours are the common multiples — and the first one is the LCM.' },
      { kind: 'idea', emoji: '🎯', title: 'You have just found the LCM',
        body: '<p>The first square that got both colours is the <strong>Lowest Common Multiple</strong>.</p>' +
              '<p>That is all the LCM is — the first time two counting patterns land on the same number. Two buses leaving together again; two bells ringing at the same moment.</p>' +
              '<p>Try 3 and 5 in the grid: they only meet at 15, 30, 45. Try 4 and 8: they meet much sooner, because 4 is already a factor of 8.</p>' },
      { kind: 'teach', skill: 'math-multiples-factors.multiples' },
      { kind: 'check', skills: ['math-multiples-factors.multiples'], items: 4, title: 'Quick check' },
      { kind: 'milestone', emoji: '🎨', title: 'Multiples mastered',
        body: '<p>Next time you meet an LCM question, picture the grid.</p>',
        canNow: ['List the multiples of any number', 'Find common multiples of two numbers', 'Explain why multiples never end'] }
    ]
  },

  {
    id: 'ml-primes', topic: 'math-multiples-factors', emoji: '🔎', minutes: 9,
    title: 'Hunting for prime numbers',
    stages: [
      { kind: 'intro', emoji: '🔎', title: 'The activity you never did',
        body: '<p>There is a page in your workbook with a 1-to-100 grid on it, and it is still blank. It is one of the best things in the whole book, so let us do it properly now.</p>' },
      { kind: 'idea', emoji: '🧮', title: 'Prime, composite, and the odd one out',
        body: '<p>Count the factors. That is the entire test.</p>' +
              '<ul><li>Exactly <strong>two</strong> factors → <strong>prime</strong></li>' +
              '<li><strong>More than two</strong> → <strong>composite</strong></li>' +
              '<li>Only <strong>one</strong> factor → that is 1, and it is <strong>neither</strong></li></ul>',
        remember: ['1 is neither prime nor composite.', '2 is the smallest prime and the only even one.'],
        watchOut: 'Saying "1 is prime" is the single most common Grade-5 mistake. It has only one factor, so it cannot be.' },
      { kind: 'explore', emoji: '🔎', title: 'The Sieve of Eratosthenes', widget: 'primeSieve',
        why: 'Work through the steps. Cross out 1, then the multiples of 2, 3, 5 and 7. Whatever survives is prime — and count them at the end.' },
      { kind: 'idea', emoji: '💡', title: 'Why only 2, 3, 5 and 7?',
        body: '<p>You only had to cross out multiples of four numbers to clear the whole grid up to 100. Why?</p>' +
              '<p>Because any composite number under 100 must have a factor of 10 or less. If it did not, its two factors would multiply to more than 100.</p>' +
              '<p>So the only primes you need to test with are 2, 3, 5 and 7. That is a genuinely useful shortcut in an exam.</p>',
        remember: ['To test if a number under 100 is prime, only try 2, 3, 5 and 7.', 'There are 25 primes below 100.'] },
      { kind: 'teach', skill: 'math-multiples-factors.prime-composite' },
      { kind: 'check', skills: ['math-multiples-factors.prime-composite'], items: 5, title: 'Quick check' },
      { kind: 'milestone', emoji: '🔎', title: 'Prime hunter',
        body: '<p>You have now done the activity — and you know the number 25 by heart.</p>',
        canNow: ['Say whether any number under 100 is prime', 'Explain why 1 is neither prime nor composite', 'Remember that there are 25 primes below 100'] }
    ]
  },

  {
    id: 'ml-prime-tree', topic: 'math-multiples-factors', emoji: '🌳', minutes: 8,
    title: 'Breaking numbers into primes',
    stages: [
      { kind: 'intro', emoji: '🌳', title: 'Every number is built from primes',
        body: '<p>Primes are the building bricks of every other number. Prime factorisation is taking a number apart to see which bricks it is made of.</p><p>This is the page of your workbook that was completely blank — and it is the key to HCF and LCM.</p>' },
      { kind: 'explore', emoji: '🌳', title: 'Build a factor tree', widget: 'factorTree', opts: { n: 36 },
        why: 'Split 36 into two factors. Then split those. Keep going until every branch ends in a prime that cannot be split any further.' },
      { kind: 'idea', emoji: '🔁', title: 'The route changes, the answer does not',
        body: '<p>You could have started 36 as 6 × 6, or as 4 × 9, or as 2 × 18. Try it again below and take a different route.</p>' +
              '<p>You will get exactly the same primes at the bottom: <strong>2 × 2 × 3 × 3</strong>.</p>' +
              '<p>That is a real mathematical fact, not a coincidence. Every number has exactly one prime "recipe".</p>' },
      { kind: 'explore', emoji: '🌳', title: 'A different number', widget: 'factorTree', opts: { n: 72 },
        why: 'Try 72 and take whichever route you like. Check that you finish with 2 × 2 × 2 × 3 × 3 however you split it.' },
      { kind: 'teach', skill: 'math-multiples-factors.prime-factorisation' },
      { kind: 'check', skills: ['math-multiples-factors.prime-factorisation'], items: 4, title: 'Quick check' },
      { kind: 'milestone', emoji: '🌳', title: 'Tree grown',
        body: '<p>You can now break any number into primes — which means HCF and LCM are about to get much easier.</p>',
        canNow: ['Draw a factor tree for any number', 'Write a prime factorisation with × signs', 'Explain why the answer is the same whichever way you split'] }
    ]
  },

  {
    id: 'ml-hcf-lcm', topic: 'math-multiples-factors', emoji: '⭕', minutes: 10,
    title: 'HCF and LCM, finally seen',
    stages: [
      { kind: 'intro', emoji: '⭕', title: 'One picture explains both',
        body: '<p>Most people learn HCF and LCM as two separate recipes and then mix them up under pressure.</p><p>There is one picture that shows what both of them actually are, and after this you will not confuse them again.</p>' },
      { kind: 'idea', emoji: '🧩', title: 'Split the primes into three piles',
        body: '<p>Break both numbers into primes. Now sort those primes into three piles:</p>' +
              '<ul><li>primes only the <strong>first</strong> number has</li>' +
              '<li>primes <strong>both</strong> numbers have</li>' +
              '<li>primes only the <strong>second</strong> number has</li></ul>' +
              '<p>Multiply the <strong>middle</strong> pile → that is the <strong>HCF</strong>.<br>Multiply <strong>everything</strong> → that is the <strong>LCM</strong>.</p>' },
      { kind: 'explore', emoji: '⭕', title: 'Sort the primes yourself', widget: 'hcfLcmVenn', opts: { a: 24, b: 36 },
        why: 'Place each prime where it belongs, then check. The middle pile is the HCF; all three piles together are the LCM.' },
      { kind: 'idea', emoji: '🧠', title: 'Which one does the question want?',
        body: '<p>The arithmetic is never the hard part. Choosing is.</p>' +
              '<p><strong>Splitting things into equal groups → HCF.</strong> Words like <em>greatest, largest, each, equal groups, cut into pieces</em>. The answer comes out <strong>smaller</strong>.</p>' +
              '<p><strong>Things repeating until they meet → LCM.</strong> Words like <em>least, smallest, together again, same time</em>. The answer comes out <strong>bigger</strong>.</p>',
        remember: ['HCF is a Factor, so it is small.', 'LCM is a Multiple, so it is big.', 'If your "HCF" is bigger than both numbers, you have found the LCM by mistake.'] },
      { kind: 'explore', emoji: '⭕', title: 'One more pair', widget: 'hcfLcmVenn', opts: { a: 18, b: 45 },
        why: 'Try 18 and 45. Predict the HCF before you check.' },
      { kind: 'teach', skill: 'math-multiples-factors.hcf' },
      { kind: 'check', skills: ['math-multiples-factors.hcf', 'math-multiples-factors.lcm'], items: 5, title: 'Quick check' },
      { kind: 'milestone', emoji: '⭕', title: 'The hardest topic, done',
        body: '<p>This was the biggest gap in your whole half-yearly portion, and you have just closed it.</p>',
        canNow: ['Find the HCF using prime factorisation', 'Find the LCM of two or three numbers', 'Decide from the wording whether a problem needs HCF or LCM'] }
    ]
  },

  /* ============================================================
     MATHS · GEOMETRY
     ============================================================ */
  {
    id: 'geo-lines', topic: 'math-geometry', emoji: '📏', minutes: 6,
    title: 'Three ways two lines can meet',
    stages: [
      { kind: 'intro', emoji: '📏', title: 'Only three possibilities',
        body: '<p>Two straight lines on a page can do exactly three things. That is it. Once you have seen all three move, the definitions stop being words to memorise.</p>' },
      { kind: 'explore', emoji: '📏', title: 'Turn the line', widget: 'lineLab',
        why: 'Drag the slider and watch the name change. Find all three: parallel, intersecting and perpendicular.' },
      { kind: 'idea', emoji: '💡', title: 'Perpendicular is a special kind of intersecting',
        body: '<p>Did you notice that at 90° the lines were still crossing?</p>' +
              '<p>That is the point most people miss: <strong>every pair of perpendicular lines is also intersecting</strong>. Perpendicular just means they cross at exactly 90°.</p>' +
              '<p>Your notes put it this way: <em>"The intersecting lines that form 90° at the point of intersection."</em></p>',
        remember: ['Parallel — never meet, always the same distance apart. Think railway tracks.', 'Intersecting — cross at one point, called the point of intersection.', 'Perpendicular — intersecting at exactly 90°.'] },
      { kind: 'teach', skill: 'math-geometry.line-types' },
      { kind: 'check', skills: ['math-geometry.line-types'], items: 4, title: 'Quick check' },
      { kind: 'milestone', emoji: '📏', title: 'Lines sorted',
        body: '<p>Three names, and you have seen each one happen.</p>',
        canNow: ['Name any pair of lines from a diagram', 'Give the school definition of each', 'Explain why perpendicular lines are also intersecting'] }
    ]
  },

  {
    id: 'geo-angles', topic: 'math-geometry', emoji: '📐', minutes: 10,
    title: 'Angles and the protractor',
    stages: [
      { kind: 'intro', emoji: '📐', title: 'The two-scale problem',
        body: '<p>Most protractor marks are lost the same way: reading the wrong scale. Ten minutes here should fix that for good.</p>' },
      { kind: 'idea', emoji: '🔺', title: 'What an angle is made of',
        body: '<p><strong>"Two rays having a common end point form an angle."</strong></p>' +
              '<p>The rays are the <strong>arms</strong>. The shared point is the <strong>vertex</strong>. The amount of turn between them is the angle, measured in <strong>degrees</strong>.</p>' +
              '<p>In a name like ∠PQR, the <strong>middle letter is the vertex</strong>. Always.</p>',
        remember: ['Arms + vertex = angle.', 'Middle letter of the name = the vertex.'],
        watchOut: 'Drawing the arms longer does not make the angle bigger. Only the turn between them counts.' },
      { kind: 'explore', emoji: '📐', title: 'Read the protractor', widget: 'protractor', opts: { mode: 'explore' },
        why: 'Drag the purple arm around. Watch BOTH scales, and notice the moment the angle changes its name from acute to obtuse.' },
      { kind: 'idea', emoji: '⚠️', title: 'Which scale do I read?',
        body: '<p>Put the <strong>centre</strong> on the vertex and the <strong>base line</strong> along one arm.</p>' +
              '<p>Then start counting from whichever <strong>0</strong> sits on that arm, and stay on that same scale all the way round.</p>' +
              '<p><strong>The sense check that always works:</strong> if the angle looks smaller than a square corner, your answer must be under 90. If you got 140, you were on the wrong scale — the answer is 180 − 140 = 40.</p>',
        remember: ['The two scales always add up to 180.', 'Acute must read under 90. Obtuse must read over 90. Check before you write.'] },
      { kind: 'explore', emoji: '🎯', title: 'Hit the target', widget: 'protractor', opts: { mode: 'measure', target: 65 },
        why: 'Set the arm to exactly 65°. Use the scale, not guesswork.' },
      { kind: 'teach', skill: 'math-geometry.angle-types' },
      { kind: 'check', skills: ['math-geometry.angle-types', 'math-geometry.protractor'], items: 5, title: 'Quick check' },
      { kind: 'milestone', emoji: '📐', title: 'Protractor beaten',
        body: '<p>You now have a sense check that catches the wrong-scale error every time.</p>',
        canNow: ['Name all seven types of angle from their measure', 'Read a protractor on the correct scale', 'Catch your own wrong-scale mistakes'] }
    ]
  },

  {
    id: 'geo-circle', topic: 'math-geometry', emoji: '⚪', minutes: 8,
    title: 'Inside a circle',
    stages: [
      { kind: 'intro', emoji: '⚪', title: 'The chord that grew up',
        body: '<p>Your teacher put a red question mark next to your circle diagram. The confusion is between a <strong>chord</strong> and a <strong>diameter</strong> — and there is one movement that makes the difference obvious.</p>' },
      { kind: 'idea', emoji: '📖', title: 'The names, in the school\'s words',
        body: '<ul>' +
              '<li><strong>Radius</strong> — from the centre to the edge.</li>' +
              '<li><strong>Chord</strong> — <em>"a line segment joining any two points on the circumference of the circle."</em></li>' +
              '<li><strong>Diameter</strong> — a chord that passes through the centre. <em>The longest chord of the circle.</em></li>' +
              '<li><strong>Circumference</strong> — the length of the circle.</li>' +
              '<li><strong>Arc</strong> — any part of a circle. Half a circle is a <strong>semicircle</strong>, and that is an arc too.</li>' +
              '</ul>',
        watchOut: 'Spelling: circum-fe-rence. You have written "circumfrence" more than once, and it costs the mark.' },
      { kind: 'explore', emoji: '⚪', title: 'Swing the chord', widget: 'circleExplorer',
        why: 'Drag the teal dot to swing the chord around. Watch its length as it passes through the centre — and see what it becomes.' },
      { kind: 'idea', emoji: '🎯', title: 'So that is why',
        body: '<p>When the chord passed through the centre it reached its <strong>longest</strong> — and at that moment it was the diameter.</p>' +
              '<p>So <strong>the diameter is the longest chord</strong>. Not a rule to memorise. Just what you saw happen.</p>' +
              '<p>And every diameter is a chord, but most chords are not diameters.</p>',
        remember: ['Diameter = 2 × radius. Radius = diameter ÷ 2.', 'The diameter is the longest chord.'] },
      { kind: 'teach', skill: 'math-geometry.radius-diameter' },
      { kind: 'check', skills: ['math-geometry.circle-parts', 'math-geometry.radius-diameter'], items: 5, title: 'Quick check' },
      { kind: 'milestone', emoji: '⚪', title: 'Circle cleared up',
        body: '<p>Chord versus diameter will not catch you again — and remember the three-line working.</p>',
        canNow: ['Name every part of a circle', 'Explain why the diameter is the longest chord', 'Show all three lines of working in a radius or diameter sum'] }
    ]
  },

  /* ============================================================
     ENGLISH
     ============================================================ */
  {
    id: 'eng-tense-lesson', topic: 'eng-tenses', emoji: '⏳', minutes: 9,
    title: 'The tense machine',
    stages: [
      { kind: 'intro', emoji: '⏳', title: 'One verb, six shapes',
        body: '<p>Tenses look like a long list to memorise. They are not — they are one small pattern repeated six times, and you can watch it happen.</p>' },
      { kind: 'explore', emoji: '⏳', title: 'Change the tense, watch the verb', widget: 'tenseTimeline',
        why: 'Pick a verb and tap each box. Watch what changes — and notice the helping verb that appears in the bottom row.' },
      { kind: 'idea', emoji: '🔧', title: 'The pattern you just saw',
        body: '<p><strong>Simple tenses</strong> — no helping verb at all.</p>' +
              '<ul><li>Past: the past form. <em>He played.</em></li>' +
              '<li>Present: plain verb, or add <strong>-s</strong> for he / she / it. <em>He plays.</em></li>' +
              '<li>Future: <strong>will</strong> + plain verb. <em>He will play.</em></li></ul>' +
              '<p><strong>Continuous tenses</strong> — always a form of <em>be</em> plus the verb with <strong>-ing</strong>.</p>' +
              '<ul><li>Past: was / were + -ing</li><li>Present: am / is / are + -ing</li><li>Future: will be + -ing</li></ul>',
        remember: ['Simple = no helper. Continuous = helper + -ing.', 'Future is always "will" + the PLAIN verb. Never "will played".'] },
      { kind: 'idea', emoji: '⚠️', title: 'The agreement trap',
        body: '<p>In the simple present only, the verb changes with the subject:</p>' +
              '<ul><li><strong>Singular</strong> subject → verb takes <strong>-s</strong>. <em>He play<strong>s</strong>. She carr<strong>ies</strong>.</em></li>' +
              '<li><strong>Plural</strong> subject → verb stays <strong>plain</strong>. <em>Mino and Vijay <strong>play</strong>. We <strong>carry</strong>.</em></li></ul>' +
              '<p>Your workbook has both of these marked in red: "Mino and Vijay plays" and "We carries". Two names joined by <em>and</em> make a plural subject.</p>',
        watchOut: 'The -s goes on the VERB for a singular subject, and on the NOUN for a plural one. They never both take it.' },
      { kind: 'check', skills: ['eng-tenses.subject-agreement'], items: 4, title: 'Agreement check' },
      { kind: 'teach', skill: 'eng-tenses.simple-future' },
      { kind: 'check', skills: ['eng-tenses.simple-past', 'eng-tenses.simple-future'], items: 4, title: 'Tense check' },
      { kind: 'milestone', emoji: '⏳', title: 'Six tenses, one pattern',
        body: '<p>You can now build any of the six from the pattern, instead of trying to remember a table.</p>',
        canNow: ['Build all six tenses from any verb', 'Match the verb to a singular or plural subject', 'Spot "will played" and other impossible forms'] }
    ]
  },

  {
    id: 'eng-ing-lesson', topic: 'eng-tenses', emoji: '⚙️', minutes: 7,
    title: 'The -ing rules',
    stages: [
      { kind: 'intro', emoji: '⚙️', title: 'Four rules, fourteen words',
        body: '<p>Page 37 of your workbook is completely blank — it is the page of -ing spellings. There are only four rules, and this machine will teach you all of them in about five minutes.</p>' },
      { kind: 'idea', emoji: '📝', title: 'The four rules',
        body: '<ol>' +
              '<li><strong>Just add -ing.</strong> Most verbs. <em>talk → talking, sing → singing, carry → carrying</em></li>' +
              '<li><strong>Drop the final e, then add -ing.</strong> <em>hide → hiding, write → writing, come → coming</em></li>' +
              '<li><strong>Double the last letter.</strong> Short verb, one vowel, one final consonant. <em>hit → hitting, run → running, swim → swimming</em></li>' +
              '<li><strong>Change ie to y.</strong> Only a few: <em>die → dying, lie → lying, tie → tying</em></li>' +
              '</ol>',
        remember: ['Ends in e? Drop it.', 'Short with one vowel + one consonant? Double it.', 'Ends in ie? Swap for y.', 'Otherwise just add -ing.'] },
      { kind: 'explore', emoji: '⚙️', title: 'Feed the machine', widget: 'ingMachine',
        why: 'Choose the right rule for each verb. Get it right and the machine builds the word for you.' },
      { kind: 'idea', emoji: '💡', title: 'Careful with y',
        body: '<p>Watch out for one thing: <em>y</em> behaves differently for <strong>-ing</strong> than it does for <strong>-ed</strong> or <strong>-er</strong>.</p>' +
              '<p>For <strong>-ing</strong>, the y just stays: <em>carry → carrying, fly → flying</em>.</p>' +
              '<p>It is only for other endings that y turns into i: <em>carry → carried, happy → happier</em>.</p>' },
      { kind: 'check', skills: ['eng-tenses.simple-present'], items: 4, title: 'Quick check' },
      { kind: 'milestone', emoji: '⚙️', title: 'Blank page filled',
        body: '<p>That is one of the five unattempted pages dealt with.</p>',
        canNow: ['Add -ing to any verb with the right spelling', 'Name which of the four rules applies', 'Avoid the y trap'] }
    ]
  },

  {
    id: 'eng-adj-lesson', topic: 'eng-adjectives', emoji: '🎨', minutes: 9,
    title: 'Spotting and comparing adjectives',
    stages: [
      { kind: 'intro', emoji: '🎨', title: 'Six kinds, one job',
        body: '<p>Every adjective does the same job — it describes a noun or a pronoun. The six "kinds" are just six different things it can tell you.</p>' },
      { kind: 'idea', emoji: '🔎', title: 'Ask the question',
        body: '<p>To name the kind, ask what the word is telling you:</p>' +
              '<ul>' +
              '<li><em>What kind?</em> → <strong>Quality</strong> (tall, honest, rainy)</li>' +
              '<li><em>How much?</em> → <strong>Quantity</strong> (some, much, little, whole)</li>' +
              '<li><em>How many?</em> → <strong>Number</strong> (one, thirteen, many)</li>' +
              '<li><em>Which one?</em> → <strong>Demonstrative</strong> (this, that, these, those)</li>' +
              '<li><em>Whose?</em> → <strong>Possessive</strong> (my, your, his, her, its, our, their)</li>' +
              '<li>Asking a question → <strong>Interrogative</strong> (whose, which, what)</li>' +
              '</ul>',
        watchOut: 'An adjective must have a noun to describe. In "There are thirteen bananas", the adjective is thirteen — "there" is not an adjective at all.' },
      { kind: 'explore', emoji: '🔎', title: 'Hunt the adjectives', widget: 'wordHunt',
        opts: {
          label: 'adjective',
          passage: [
            { tokens: [
              { t: 'The' }, { t: 'tall', ok: true, kind: 'quality', why: 'It tells you what kind of boy.' },
              { t: 'boy' }, { t: 'ate' }, { t: 'five', ok: true, kind: 'number', why: 'It tells you how many.' },
              { t: 'mangoes' }, { t: 'quickly' }, { t: '.' }
            ] },
            { tokens: [
              { t: 'Those', ok: true, kind: 'demonstrative', why: 'It points at which books.' },
              { t: 'books' }, { t: 'on' }, { t: 'my', ok: true, kind: 'possessive', why: 'It tells you whose desk.' },
              { t: 'desk' }, { t: 'are' }, { t: 'very' }, { t: 'old', ok: true, kind: 'quality', why: 'It tells you what kind of books.' }, { t: '.' }
            ] },
            { tokens: [
              { t: 'Whose', ok: true, kind: 'interrogative', why: 'It asks a question before a noun.' },
              { t: 'blue', ok: true, kind: 'quality', why: 'It describes the bag.' },
              { t: 'bag' }, { t: 'has' }, { t: 'some', ok: true, kind: 'quantity', why: 'It tells you how much.' },
              { t: 'water' }, { t: 'in' }, { t: 'it' }, { t: '?' }
            ] }
          ]
        },
        why: 'Tap every adjective. When you find one it tells you which of the six kinds it is.' },
      { kind: 'explore', emoji: '🪜', title: 'Climb the degree ladder', widget: 'degreeLadder',
        why: 'Step through each adjective and watch how the spelling changes as you climb. Pay attention to "slim".' },
      { kind: 'idea', emoji: '⚠️', title: 'Its or it\'s',
        body: '<p>This one caught you in the workbook, so it is worth thirty seconds.</p>' +
              '<ul><li><strong>its</strong> = belonging to it. <em>The car is old. <strong>Its</strong> engine is loud.</em></li>' +
              '<li><strong>it\'s</strong> = it is. <em><strong>It\'s</strong> raining.</em></li></ul>' +
              '<p>The test: say "it is" instead. If it still makes sense, use the apostrophe. If it turns into nonsense, do not.</p>',
        remember: ["Try saying \"it is\". That single test settles it every time."] },
      { kind: 'check', skills: ['eng-adjectives.what-and-kinds', 'eng-adjectives.possessive'], items: 5, title: 'Quick check' },
      { kind: 'milestone', emoji: '🎨', title: 'Adjectives handled',
        body: '<p>Six kinds, three degrees, and the its/it\'s trap defused.</p>',
        canNow: ['Name the kind of any adjective', 'Form comparatives and superlatives correctly', "Choose between its and it's every time"] }
    ]
  },

  /* ============================================================
     HINDI
     ============================================================ */
  {
    id: 'hin-neem-lesson', topic: 'hin-neem', emoji: '🌳', minutes: 9,
    title: 'नीम — कविता और शब्द',
    stages: [
      { kind: 'intro', emoji: '🌳', title: 'हर पंक्ति एक ही शब्द पर',
        body: '<p>इस कविता की एक खास बात है: <strong>हर पंक्ति "नीम" पर खत्म होती है।</strong> यह पता चलते ही आधी कविता अपने आप याद हो जाती है।</p>' },
      { kind: 'explore', emoji: '🎧', title: 'कविता सुनो और पढ़ो', widget: 'poemReader',
        opts: {
          lang: 'hi-IN', title: 'नीम — हरीश निगम',
          lines: [
            { t: 'लहराता-बलखाता नीम,', m: 'The neem sways and bends' },
            { t: 'दिनभर हँसता-गाता नीम।', m: 'All day it laughs and sings' },
            { t: 'चिड़िया, कौआ, तोता सबसे,', m: 'To the sparrow, crow and parrot' },
            { t: 'अपना नेह जताता नीम।', m: 'It shows its love (नेह = प्रेम)' },
            { t: 'नहीं डॉक्टर फिर भी देखो,', m: 'It is not a doctor, and yet see' },
            { t: 'कितने रोग भगाता नीम।', m: 'How many illnesses it drives away (रोग = बीमारी)' },
            { t: 'चले प्रदूषित वायु कभी तो,', m: 'If polluted air ever blows' },
            { t: 'उसको शुद्ध बनाता नीम।', m: 'The neem makes it clean (शुद्ध = साफ)' },
            { t: 'कड़वे तन में मन को मीठा,', m: 'In a bitter body, a sweet mind' },
            { t: 'रखना हमें सिखाता नीम।', m: 'The neem teaches us to keep' },
            { t: 'हवा चले तो झूम-झूमके,', m: 'When the wind blows it sways' },
            { t: 'सब का मन बहलाता नीम।', m: 'And cheers everyone up' },
            { t: 'लेता नहीं किसी से कुछ भी,', m: 'It takes nothing from anyone' },
            { t: 'पर कितना दे जाता नीम।', m: 'But how much it gives' }
          ]
        },
        why: 'हर पंक्ति पर 🔊 दबाकर सुनो, फिर पंक्ति छूकर उसका अर्थ देखो। जब तैयार हो जाओ तो 🎤 Recite मोड में जाकर बिना देखे बोलो।' },
      { kind: 'idea', emoji: '💡', title: 'कविता का भाव',
        body: '<p>पूरी कविता एक ही बात कहती है: <strong>नीम देता ही देता है, लेता कुछ नहीं।</strong></p>' +
              '<p>वह गंदी हवा साफ करता है, रोग भगाता है, पक्षियों से प्रेम करता है, और सबका मन बहलाता है।</p>' +
              '<p>और सबसे बड़ी सीख आखिरी में है — <strong>कड़वे तन में मन को मीठा रखना</strong>। यानी हालात कड़वे हों तब भी मन मीठा रखो।</p>',
        remember: ['कवि — हरीश निगम', 'हर पंक्ति "नीम" पर खत्म होती है', 'शिक्षा — कड़वे तन में मन मीठा'] },
      { kind: 'explore', emoji: '🃏', title: 'शब्दार्थ कार्ड', widget: 'wordLab',
        opts: {
          lang: 'hi-IN',
          words: [
            { w: 'नेह', roman: 'neh', m: 'प्रेम — love', eg: 'अपना नेह जताता नीम।' },
            { w: 'रोग', roman: 'rog', m: 'बीमारी — illness', eg: 'कितने रोग भगाता नीम।' },
            { w: 'शुद्ध', roman: 'shuddh', m: 'साफ — clean, pure', eg: 'उसको शुद्ध बनाता नीम।' },
            { w: 'हवा', roman: 'hawa', m: 'पर्यायवाची: वायु, पवन' },
            { w: 'डॉक्टर', roman: 'doctor', m: 'पर्यायवाची: चिकित्सक, वैद्य' },
            { w: 'कड़वा', roman: 'kadwa', m: 'विलोम: मीठा' }
          ]
        },
        why: 'हर कार्ड छूने से पहले अर्थ बोलने की कोशिश करो — पहले अंदाज़ा लगाने से याद ज़्यादा पक्का होता है।' },
      { kind: 'teach', skill: 'hin-neem.prashn-uttar' },
      { kind: 'check', skills: ['hin-neem.shabdarth', 'hin-neem.vilom-paryayvachi'], items: 5, title: 'छोटी जाँच' },
      { kind: 'milestone', emoji: '🌳', title: 'नीम पूरा',
        body: '<p>कविता, शब्दार्थ, विलोम, पर्यायवाची — सब एक जगह।</p>',
        canNow: ['कविता की कोई भी पंक्ति पूरी करना', 'नेह, रोग, शुद्ध के अर्थ बताना', 'प्रश्न का उत्तर पूरे वाक्य में लिखना'] }
    ]
  },

  {
    id: 'hin-sarvanaam-lesson', topic: 'hin-sarvanaam', emoji: '🔤', minutes: 7,
    title: 'सर्वनाम पहचानो',
    stages: [
      { kind: 'intro', emoji: '🔤', title: 'संज्ञा की जगह लेने वाला शब्द',
        body: '<p>सर्वनाम वह शब्द है जो <strong>संज्ञा की जगह</strong> पर आता है। अगर हर बार नाम दोहराना पड़े तो वाक्य बहुत भद्दा लगेगा।</p>' },
      { kind: 'idea', emoji: '💡', title: 'क्यों ज़रूरी है',
        body: '<p>देखो:</p>' +
              '<p><em>"रोहन स्कूल गया। रोहन ने रोहन का बस्ता रोहन की मेज़ पर रखा।"</em></p>' +
              '<p>अब सर्वनाम के साथ:</p>' +
              '<p><em>"रोहन स्कूल गया। <strong>उसने अपना</strong> बस्ता <strong>अपनी</strong> मेज़ पर रखा।"</em></p>' +
              '<p>यही सर्वनाम का काम है — दोहराव हटाना।</p>',
        remember: ['सर्वनाम = संज्ञा के बदले आने वाला शब्द।', 'मैं, तुम, आप, वह, यह, हम, वे — ये सब सर्वनाम हैं।'] },
      { kind: 'explore', emoji: '🔎', title: 'वाक्य में सर्वनाम ढूँढो', widget: 'wordHunt',
        opts: {
          label: 'सर्वनाम', lang: 'hi-IN',
          passage: [
            { tokens: [
              { t: 'मैं', ok: true, kind: 'उत्तम पुरुष', why: 'बोलने वाला अपने लिए।' },
              { t: 'रोज़' }, { t: 'सुबह' }, { t: 'दौड़ता' }, { t: 'हूँ।' }
            ] },
            { tokens: [
              { t: 'वह', ok: true, kind: 'अन्य पुरुष', why: 'किसी तीसरे के लिए।' },
              { t: 'मेरा' }, { t: 'मित्र' }, { t: 'है' }, { t: 'और' },
              { t: 'हम', ok: true, kind: 'उत्तम पुरुष', why: 'बहुवचन — हम सब।' },
              { t: 'साथ' }, { t: 'खेलते' }, { t: 'हैं।' }
            ] },
            { tokens: [
              { t: 'क्या' }, { t: 'आप', ok: true, kind: 'मध्यम पुरुष', why: 'जिससे बात हो रही है, आदर के साथ।' },
              { t: 'यह', ok: true, kind: 'निश्चयवाचक', why: 'पास की चीज़ की ओर संकेत।' },
              { t: 'किताब' }, { t: 'पढ़ेंगे' }, { t: '?' }
            ] }
          ]
        },
        why: 'हर सर्वनाम छूओ। सही होने पर वह बता देगा कि वह कौन-सा सर्वनाम है।' },
      { kind: 'teach', skill: 'hin-sarvanaam.paribhasha' },
      { kind: 'check', skills: ['hin-sarvanaam.pehchaan', 'hin-sarvanaam.vaakya-mein'], items: 5, title: 'छोटी जाँच' },
      { kind: 'milestone', emoji: '🔤', title: 'सर्वनाम पक्का',
        body: '<p>अब किसी भी वाक्य में सर्वनाम पहचान सकते हो।</p>',
        canNow: ['सर्वनाम की परिभाषा लिखना', 'वाक्य में सर्वनाम पहचानना', 'खाली जगह में सही सर्वनाम भरना'] }
    ]
  }

]);
