/* ============================================================
   HALF-YEARLY HQ — English · Adjectives
   Source: English work book pp. 15-23 (9 photos), fully attempted
   by Crispin with the teacher's red marking.

   Definitions and the list of six kinds are quoted in the
   workbook's own wording (p.15 rule box).

   Targeted at his marked errors:
     · "It's engine" for "Its engine"  (ticked, but wrong)
     · "These grandson" for "Their grandson"
     · "There" called a demonstrative adjective (struck out in red)
     · "Whos" for "Whose"
     · "collor" for "Colour", "slipers", "slimest", "Intrrogative"
     · underlining "many" when the instruction said circle numbers
   ============================================================ */
window.HY_TOPICS = (window.HY_TOPICS || []).concat([{
  id: 'eng-adjectives',
  subject: 'english',
  name: 'Adjectives',
  emoji: '🎨',
  blurb: 'The six kinds, the three degrees, and the traps that cost marks.',
  source: 'English work book pp. 15-23 (9 pages, marked by the teacher)',
  examWeight: 25
}]);

window.HY_SKILLS = (window.HY_SKILLS || []).concat([

  /* ---------------------------------------------------------- */
  {
    id: 'eng-adjectives.what-and-kinds',
    subject: 'english', topic: 'eng-adjectives',
    name: 'What an adjective is',
    canDo: 'I can define an adjective and name all six kinds without looking.',
    weight: 5, difficulty: 1,
    prereq: [],
    teach: {
      hook: 'Take the adjectives out of a sentence and it still works. Put them back and you can suddenly see the thing.',
      explain:
        '<p>Your workbook rule box says it in one line: <strong>"Adjectives are words that describe a noun or a pronoun."</strong></p>' +
        '<p>There are <strong>six kinds</strong>, and the exam expects you to be able to list them:</p>' +
        '<ol>' +
        '<li>Adjective of <strong>Quality</strong> — what kind? (<em>tall, honest, rainy</em>)</li>' +
        '<li>Adjective of <strong>Quantity</strong> — how much? (<em>some, much, little, whole, few</em>)</li>' +
        '<li>Adjective of <strong>Number</strong> — how many? (<em>one, five, thirteen, many</em>)</li>' +
        '<li><strong>Demonstrative</strong> Adjective — which one? (<em>this, that, these, those</em>)</li>' +
        '<li><strong>Possessive</strong> Adjective — whose? (<em>my, your, his, her, its, our, their</em>)</li>' +
        '<li><strong>Interrogative</strong> Adjective — asking a question (<em>whose, which, what</em>)</li>' +
        '</ol>',
      worked: [
        {
          q: 'Name the kind of adjective in: "Those books belong to me."',
          steps: [
            'The describing word is <strong>Those</strong>.',
            'It is telling us <em>which</em> books, and it is pointing at them.',
            'Pointing words — this, that, these, those — are demonstrative.'
          ],
          a: 'Demonstrative Adjective'
        }
      ],
      remember: [
        'Six kinds: Quality, Quantity, Number, Demonstrative, Possessive, Interrogative.',
        'An adjective always describes a noun or a pronoun — find the noun first.',
        'Quality = what kind · Quantity = how much · Number = how many.'
      ],
      watchOut: 'An adjective must sit with a noun. In "There are thirteen bananas", <em>there</em> is not an adjective at all — the adjective is <strong>thirteen</strong>.'
    },
    items: [
      { id: 'eng-adjectives.what-and-kinds.i01', type: 'fill', q: 'Adjectives are words that describe a ____ or a pronoun.', accept: ['noun'], level: 1, explain: 'That is the workbook definition: adjectives describe a noun or a pronoun.' },
      { id: 'eng-adjectives.what-and-kinds.i02', type: 'fill', q: 'How many kinds of adjectives does your workbook list?', accept: ['6', 'six'], level: 1, explain: 'Six: Quality, Quantity, Number, Demonstrative, Possessive, Interrogative.' },
      { id: 'eng-adjectives.what-and-kinds.i03', type: 'mcq', q: 'In "She wore a <strong>beautiful</strong> dress", what kind of adjective is <em>beautiful</em>?', options: ['Quality', 'Quantity', 'Number', 'Demonstrative'], answer: 0, level: 1, explain: 'It tells us what kind of dress, so it is an adjective of quality.' },
      { id: 'eng-adjectives.what-and-kinds.i04', type: 'mcq', q: 'In "<strong>Those</strong> boys are playing", what kind of adjective is <em>Those</em>?', options: ['Quality', 'Possessive', 'Demonstrative', 'Interrogative'], answer: 2, level: 1, explain: 'This, that, these and those point at something — they are demonstrative adjectives.' },
      { id: 'eng-adjectives.what-and-kinds.i05', type: 'bucket', q: 'Sort each adjective by its kind.', buckets: ['Quality', 'Quantity', 'Number'], chips: [{ t: 'honest', b: 'Quality' }, { t: 'some', b: 'Quantity' }, { t: 'thirteen', b: 'Number' }, { t: 'rainy', b: 'Quality' }, { t: 'little', b: 'Quantity' }, { t: 'many', b: 'Number' }], level: 2, explain: 'Quality answers "what kind", quantity answers "how much", number answers "how many". <strong>Many</strong> counts as an adjective of number.' },
      { id: 'eng-adjectives.what-and-kinds.i06', type: 'order', q: 'Put the six kinds of adjective in the order your workbook lists them.', answer: ['Quality', 'Quantity', 'Number', 'Demonstrative', 'Possessive', 'Interrogative'], level: 3, explain: 'That is the order in the p.15 rule box, and the order the exam expects.' },
      { id: 'eng-adjectives.what-and-kinds.i07', type: 'mcq', q: '"There are thirteen bananas in the basket." Which word is the adjective?', options: ['There', 'are', 'thirteen', 'basket'], answer: 2, level: 3, hint: 'Which word describes the bananas?', explain: '<strong>Thirteen</strong> is the adjective — an adjective of number. <em>There</em> is not an adjective at all; this exact question was marked wrong in your workbook.' },
      { id: 'eng-adjectives.what-and-kinds.i08', type: 'tap', q: 'Tap the adjective in this sentence.', level: 2, tokens: [{ t: 'The' }, { t: 'gentle', ok: true }, { t: 'old', ok: true }, { t: 'man' }, { t: 'smiled' }], explain: '<strong>Gentle</strong> and <strong>old</strong> both describe the man. Both are adjectives of quality.' },
      { id: 'eng-adjectives.what-and-kinds.i09', type: 'mcq', q: 'In "<strong>Whose</strong> marker is this?", what kind of adjective is <em>Whose</em>?', options: ['Possessive', 'Interrogative', 'Demonstrative', 'Quality'], answer: 1, level: 2, explain: 'It comes before a noun in a question, so it is an interrogative adjective.' },
      { id: 'eng-adjectives.what-and-kinds.i10', type: 'match', q: 'Match each kind to the question it answers.', pairs: [{ l: 'Quality', r: 'What kind?' }, { l: 'Quantity', r: 'How much?' }, { l: 'Number', r: 'How many?' }, { l: 'Possessive', r: 'Whose?' }], level: 2, explain: 'Ask the question and the kind names itself.' },
      { id: 'eng-adjectives.what-and-kinds.i11', type: 'tf', q: 'An adjective can describe a pronoun as well as a noun.', answer: true, level: 2, explain: 'True — the definition says "a noun or a pronoun". "She is happy" describes the pronoun <em>she</em>.' },
      { id: 'eng-adjectives.what-and-kinds.i12', type: 'multi', q: 'Tick every adjective of <strong>quantity</strong>.', options: ['some', 'five', 'much', 'those', 'whole'], answer: [0, 2, 4], level: 2, explain: 'Some, much and whole tell you how much. Five is number and those is demonstrative.' },
      { id: 'eng-adjectives.what-and-kinds.i13', type: 'mcq', q: '"I have <strong>little</strong> money" and "I have <strong>five</strong> coins". What is the difference?', options: ['No difference', 'Little is quantity (how much), five is number (how many)', 'Little is number, five is quantity', 'Both are quality'], answer: 1, level: 3, explain: 'Money cannot be counted one by one, so it takes quantity. Coins can be counted, so they take number.' },
      { id: 'eng-adjectives.what-and-kinds.i14', type: 'fill', q: 'In exercise VI you must underline adjectives of quantity and circle adjectives of number. What should you do to the word <strong>many</strong>?', accept: ['circle', 'circle it'], level: 3, hint: 'Does "many" answer how much or how many?', explain: 'Many answers <em>how many</em>, so it is an adjective of number and should be <strong>circled</strong>. You underlined it in the workbook, which is the wrong mark.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'eng-adjectives.possessive',
    subject: 'english', topic: 'eng-adjectives',
    name: 'Possessive adjectives',
    canDo: 'I can use my, your, his, her, its, our and their correctly — and I never confuse its with it\'s.',
    weight: 5, difficulty: 2,
    prereq: ['eng-adjectives.what-and-kinds'],
    teach: {
      hook: 'One missing apostrophe changes the whole meaning. This is the single most common mistake in Grade-5 English papers, and it caught you once already.',
      explain:
        '<p>The possessive adjectives are: <strong>my, your, his, her, its, our, their</strong>. They come before a noun and tell you <em>whose</em>.</p>' +
        '<p>The trap:</p>' +
        '<ul>' +
        '<li><strong>its</strong> = belonging to it. <em>The car is old. <strong>Its</strong> engine is loud.</em></li>' +
        '<li><strong>it\'s</strong> = it is. <em><strong>It\'s</strong> raining.</em></li>' +
        '</ul>' +
        '<p>The test: say "it is" instead. If the sentence still makes sense, use <strong>it\'s</strong>. If it turns into nonsense, use <strong>its</strong>.</p>' +
        '<p>Also watch the plural: when two or more people own something, the word is <strong>their</strong>, not <em>these</em> or <em>those</em>.</p>',
      worked: [
        {
          q: 'Choose: "The dog wagged (its / it\'s) tail."',
          steps: [
            'Try "it is": "The dog wagged it is tail." That is nonsense.',
            'So the apostrophe version is wrong here.',
            'Use the possessive form.'
          ],
          a: 'its'
        },
        {
          q: 'Rewrite using a possessive adjective: "Ram and Sita\'s grandson is very loving."',
          steps: [
            'Ram and Sita are <strong>two</strong> people.',
            'The possessive adjective for two or more people is <strong>their</strong>.',
            'So: Their grandson is very loving.'
          ],
          a: 'Their grandson is very loving.'
        }
      ],
      remember: [
        'my, your, his, her, its, our, their — the whole list.',
        "its = belonging to it. it's = it is. Say \"it is\" out loud to test it.",
        'Two or more owners → their.'
      ],
      watchOut: 'You wrote "It\'s engine is loud" in the workbook and it was ticked by mistake. It should be <strong>Its</strong> engine. And you wrote "These grandson" where it should be <strong>Their</strong> grandson.'
    },
    items: [
      { id: 'eng-adjectives.possessive.i01', type: 'mcq', q: 'The car is very old. ____ engine is loud.', options: ["It's", 'Its', 'Its\'', 'It'], answer: 1, level: 2, hint: 'Try saying "it is engine". Does it work?', explain: '<strong>Its</strong> — belonging to it. "It is engine is loud" is nonsense, so no apostrophe.' },
      { id: 'eng-adjectives.possessive.i02', type: 'mcq', q: 'Look outside — ____ raining again.', options: ['its', "it's", 'its\'', 'it'], answer: 1, level: 2, explain: "<strong>It's</strong> — short for <em>it is</em>. Here the test sentence works: \"it is raining\"." },
      { id: 'eng-adjectives.possessive.i03', type: 'fill', q: 'Rewrite with a possessive adjective: "Ram and Sita\'s grandson is loving." → ____ grandson is loving.', accept: ['their'], level: 2, hint: 'Two people own him.', explain: '<strong>Their</strong> — the possessive adjective for two or more people. You wrote "These" in the workbook, which is a demonstrative, not a possessive.' },
      { id: 'eng-adjectives.possessive.i04', type: 'fill', q: 'Rewrite with a possessive adjective: "Kabir\'s bicycle is new." → ____ bicycle is new.', accept: ['his'], level: 1, explain: 'Kabir is one boy, so the possessive adjective is <strong>his</strong>.' },
      { id: 'eng-adjectives.possessive.i05', type: 'bucket', q: 'Sort each sentence by which form it needs.', buckets: ['its', "it's"], chips: [{ t: 'The bird built ___ nest.', b: 'its' }, { t: '___ too hot today.', b: "it's" }, { t: 'The shop closed ___ doors.', b: 'its' }, { t: 'I think ___ going to rain.', b: "it's" }], level: 3, explain: 'If "it is" fits, use it\'s. If it means "belonging to it", use its.' },
      { id: 'eng-adjectives.possessive.i06', type: 'multi', q: 'Tick every <strong>possessive adjective</strong>.', options: ['my', 'this', 'their', 'whose', 'our'], answer: [0, 2, 4], level: 2, explain: 'My, their and our are possessive. <em>This</em> is demonstrative and <em>whose</em> is interrogative.' },
      { id: 'eng-adjectives.possessive.i07', type: 'tap', q: 'Tap the possessive adjective.', level: 1, tokens: [{ t: 'She' }, { t: 'lost' }, { t: 'her', ok: true }, { t: 'umbrella' }, { t: 'yesterday' }], explain: '<strong>Her</strong> tells us whose umbrella it is.' },
      { id: 'eng-adjectives.possessive.i08', type: 'fillMulti', q: 'Fill in the right possessive adjective.', level: 2, blanks: [{ label: 'I lost ___ pencil.', accept: ['my'] }, { label: 'The team won ___ match.', accept: ['its', 'their'] }, { label: 'You forgot ___ bag.', accept: ['your'] }], explain: 'My, its/their, your. A team can take either <em>its</em> (one group) or <em>their</em> (the members).' },
      { id: 'eng-adjectives.possessive.i09', type: 'tf', q: '"Its" always needs an apostrophe when it shows possession.', answer: false, level: 3, explain: 'False — and this is the trap. The possessive <strong>its</strong> has NO apostrophe. Only <em>it\'s</em> (it is) takes one.' },
      { id: 'eng-adjectives.possessive.i10', type: 'order', q: 'Put these possessive adjectives in the order your workbook lists them.', answer: ['my', 'your', 'his', 'her', 'its', 'our', 'their'], level: 3, explain: 'my, your, his, her, its, our, their.' },
      { id: 'eng-adjectives.possessive.i11', type: 'mcq', q: 'Which sentence is correct?', options: ["The dog hurt it's paw.", 'The dog hurt its paw.', 'The dog hurt its\' paw.', 'The dog hurt him paw.'], answer: 1, level: 2, explain: 'Belonging to the dog, so <strong>its</strong> with no apostrophe.' },
      { id: 'eng-adjectives.possessive.i12', type: 'fill', q: 'Rewrite with a possessive adjective: "The girls\' bags are heavy." → ____ bags are heavy.', accept: ['their'], level: 2, explain: 'More than one girl, so <strong>their</strong>.' },
      { id: 'eng-adjectives.possessive.i13', type: 'mcq', q: 'Crispin writes "These grandson is very loving." What is wrong?', options: ['Nothing', 'These is a demonstrative — it should be Their', 'It should be This', 'Grandson should be plural'], answer: 1, level: 3, explain: 'The sentence needs a possessive adjective, and for two owners that is <strong>Their</strong>. This exact slip was corrected in red in your workbook.' },
      { id: 'eng-adjectives.possessive.i14', type: 'fill', q: 'Complete: "The tree lost all ____ leaves in the storm."', accept: ['its'], level: 2, explain: '<strong>Its</strong> — belonging to the tree. "It is leaves" makes no sense, so no apostrophe.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'eng-adjectives.demonstrative-interrogative',
    subject: 'english', topic: 'eng-adjectives',
    name: 'Demonstrative & interrogative',
    canDo: 'I can pick out this/that/these/those and whose/which/what, and spell them correctly.',
    weight: 4, difficulty: 2,
    prereq: ['eng-adjectives.what-and-kinds'],
    teach: {
      hook: 'Two small families of words, and both of them come with a spelling trap.',
      explain:
        '<p><strong>Demonstrative adjectives</strong> point at something: <strong>this, that, these, those</strong>.</p>' +
        '<ul><li><em>this</em> and <em>that</em> go with <strong>one</strong> thing — this toy, that house.</li>' +
        '<li><em>these</em> and <em>those</em> go with <strong>more than one</strong> — these books, those boys.</li>' +
        '<li><em>this</em> and <em>these</em> are near; <em>that</em> and <em>those</em> are further away.</li></ul>' +
        '<p><strong>Interrogative adjectives</strong> ask a question and sit before a noun: <strong>whose, which, what</strong>.</p>' +
        '<p>Spelling: it is <strong>whose</strong> (w-h-o-s-e), not "whos". And <strong>interrogative</strong> has <em>inter-</em> at the front, like <em>internet</em>.</p>',
      worked: [
        {
          q: 'Which demonstrative fits: "____ books on the shelf are mine."',
          steps: [
            'The noun is <strong>books</strong>, which is plural.',
            'Plural needs <em>these</em> or <em>those</em>.',
            'The shelf is over there, so <strong>Those</strong>.'
          ],
          a: 'Those'
        }
      ],
      remember: [
        'this / that = one thing. these / those = more than one.',
        'this / these = near. that / those = far.',
        'Interrogative adjectives: whose, which, what.',
        'whose — w-h-o-s-e. interrogative — i-n-t-e-r-...'
      ],
      watchOut: 'A demonstrative adjective must have a noun after it. In "This is mine", <em>this</em> stands alone, so it is a pronoun, not an adjective.'
    },
    items: [
      { id: 'eng-adjectives.demonstrative-interrogative.i01', type: 'mcq', q: 'Which spelling is correct?', options: ['Whos', 'Whose', 'Who\'s', 'Whoes'], answer: 1, level: 1, explain: '<strong>Whose</strong> asks who owns something. You wrote "Whos" in the workbook and it was corrected in red.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i02', type: 'mcq', q: 'Which spelling is correct?', options: ['Intrrogative', 'Interogative', 'Interrogative', 'Intrerogative'], answer: 2, level: 2, hint: 'It starts like "internet".', explain: '<strong>Interrogative</strong> — I-n-t-e-r-r-o-g-a-t-i-v-e. You dropped the first "e" in the workbook.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i03', type: 'fill', q: 'Fill the blank: "____ books on the top shelf are mine." (plural, far away)', accept: ['those'], level: 1, explain: 'Plural and far away, so <strong>Those</strong>.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i04', type: 'fill', q: 'Fill the blank: "____ dress looks lovely on you." (one thing, near)', accept: ['this'], level: 1, explain: 'One thing and close by, so <strong>This</strong>.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i05', type: 'bucket', q: 'Sort each demonstrative.', buckets: ['One thing', 'More than one'], chips: [{ t: 'this', b: 'One thing' }, { t: 'these', b: 'More than one' }, { t: 'that', b: 'One thing' }, { t: 'those', b: 'More than one' }], level: 2, explain: 'this/that go with one; these/those go with more than one.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i06', type: 'multi', q: 'Tick every <strong>interrogative adjective</strong>.', options: ['whose', 'these', 'which', 'their', 'what'], answer: [0, 2, 4], level: 2, explain: 'Whose, which and what ask questions before a noun. These is demonstrative and their is possessive.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i07', type: 'tap', q: 'Tap the demonstrative adjective.', level: 1, tokens: [{ t: 'I' }, { t: 'want' }, { t: 'that', ok: true }, { t: 'red' }, { t: 'bicycle' }], explain: '<strong>That</strong> points at which bicycle. <em>Red</em> is an adjective too, but of quality.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i08', type: 'fill', q: 'Complete the question: "____ book did you borrow from the library?"', accept: ['which', 'what'], level: 2, explain: '<strong>Which</strong> (or <em>What</em>) — an interrogative adjective before the noun <em>book</em>.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i09', type: 'tf', q: 'In "This is my pen", the word <em>this</em> is a demonstrative adjective.', answer: false, level: 3, hint: 'Is there a noun straight after it?', explain: 'No — <em>this</em> stands on its own here, so it is a demonstrative <strong>pronoun</strong>. In "This pen is mine" it would be an adjective.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i10', type: 'fill', q: 'Complete: "____ marker is lying on the floor?" (asking who owns it)', accept: ['whose'], level: 2, explain: '<strong>Whose</strong> asks about ownership.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i11', type: 'mcq', q: 'Which sentence uses the demonstrative correctly?', options: ['These book is heavy.', 'This books are heavy.', 'These books are heavy.', 'Those book is heavy.'], answer: 2, level: 2, explain: 'Plural demonstrative <em>these</em> with the plural noun <em>books</em>.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i12', type: 'match', q: 'Match each demonstrative to when you use it.', pairs: [{ l: 'this', r: 'One thing, near' }, { l: 'these', r: 'Many things, near' }, { l: 'that', r: 'One thing, far' }, { l: 'those', r: 'Many things, far' }], level: 2, explain: 'Number first, then near or far.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i13', type: 'fill', q: 'Complete: "____ kind of food do you like best?"', accept: ['what', 'which'], level: 2, explain: '<strong>What</strong> kind of food — an interrogative adjective before the noun.' },
      { id: 'eng-adjectives.demonstrative-interrogative.i14', type: 'tap', q: 'Tap the interrogative adjective.', level: 2, tokens: [{ t: 'Whose', ok: true }, { t: 'blue' }, { t: 'bag' }, { t: 'is' }, { t: 'this' }, { t: '?' }], explain: '<strong>Whose</strong> comes before the noun <em>bag</em> and asks a question, so it is an interrogative adjective.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'eng-adjectives.degrees',
    subject: 'english', topic: 'eng-adjectives',
    name: 'Degrees of comparison',
    canDo: 'I can change any adjective into its comparative and superlative, with the right spelling.',
    weight: 5, difficulty: 2,
    prereq: ['eng-adjectives.what-and-kinds'],
    teach: {
      hook: 'Tall, taller, tallest. Three steps on a ladder — but the spelling changes as you climb, and that is where marks go missing.',
      explain:
        '<p>Every adjective has <strong>three degrees</strong>: <strong>Positive, Comparative, Superlative</strong>.</p>' +
        '<p>The spelling rules:</p>' +
        '<ul>' +
        '<li>Short word → add <strong>-er / -est</strong>: tall, taller, tallest.</li>' +
        '<li>One vowel + one final consonant → <strong>double the consonant</strong>: big, bigger, biggest · slim, slimmer, slimmest.</li>' +
        '<li>Ends in a consonant + <strong>y</strong> → y becomes <strong>i</strong>: happy, happier, happiest · silky, silkier, silkiest.</li>' +
        '<li>Ends in <strong>e</strong> → just add -r / -st: noble, nobler, noblest.</li>' +
        '<li>Long word → use <strong>more / most</strong>: beautiful, more beautiful, most beautiful.</li>' +
        '</ul>',
      worked: [
        {
          q: 'Write the three degrees of "slim".',
          steps: [
            '"Slim" is short, with one vowel (i) and one final consonant (m).',
            'So the m doubles before -er and -est.',
            'slim → slimmer → slimmest. Two m\'s in both.'
          ],
          a: 'slim, slimmer, slimmest'
        },
        {
          q: 'Write the three degrees of "important".',
          steps: [
            '"Important" is a long word — three syllables.',
            'Long words do not take -er and -est.',
            'Use more and most instead.'
          ],
          a: 'important, more important, most important'
        }
      ],
      remember: [
        'Three degrees: Positive, Comparative, Superlative.',
        'Short word → -er / -est. Long word → more / most.',
        'One vowel + one consonant → double the last letter.',
        'Never both: "more taller" is always wrong.'
      ],
      watchOut: 'You wrote "slimest" in the workbook. The printed comparative in the same row was "slimmer" with two m\'s — so the superlative must be <strong>slimmest</strong>, also with two m\'s.'
    },
    items: [
      { id: 'eng-adjectives.degrees.i01', type: 'fill', q: 'Superlative of <strong>slim</strong>', accept: ['slimmest'], level: 2, hint: 'Look at the comparative: slimmer. How many m\'s?', explain: '<strong>Slimmest</strong> — two m\'s, matching "slimmer". You wrote "slimest" in the workbook.' },
      { id: 'eng-adjectives.degrees.i02', type: 'fillMulti', q: 'Complete the degrees for <strong>happy</strong>.', level: 1, blanks: [{ label: 'Comparative', accept: ['happier'] }, { label: 'Superlative', accept: ['happiest'] }], explain: 'The y becomes i: happy, happier, happiest.' },
      { id: 'eng-adjectives.degrees.i03', type: 'fillMulti', q: 'Complete the degrees for <strong>beautiful</strong>.', level: 2, blanks: [{ label: 'Comparative', accept: ['more beautiful'] }, { label: 'Superlative', accept: ['most beautiful'] }], explain: 'A long word takes more and most, never -er and -est.' },
      { id: 'eng-adjectives.degrees.i04', type: 'fill', q: 'Superlative of <strong>big</strong>', accept: ['biggest'], level: 1, explain: 'One vowel + one final consonant, so the g doubles: biggest.' },
      { id: 'eng-adjectives.degrees.i05', type: 'fill', q: 'Comparative of <strong>noble</strong>', accept: ['nobler', 'more noble'], level: 2, hint: 'It already ends in e.', explain: 'It already ends in e, so just add -r: <strong>nobler</strong>.' },
      { id: 'eng-adjectives.degrees.i06', type: 'order', q: 'Put these in order: positive, comparative, superlative.', answer: ['fierce', 'fiercer', 'fiercest'], level: 1, explain: 'Positive → comparative → superlative.' },
      { id: 'eng-adjectives.degrees.i07', type: 'mcq', q: 'Which is correct?', options: ['more taller', 'tallerer', 'taller', 'most taller'], answer: 2, level: 2, explain: 'Just <strong>taller</strong>. Never use "more" together with "-er".' },
      { id: 'eng-adjectives.degrees.i08', type: 'bucket', q: 'Does this adjective take <strong>-er/-est</strong> or <strong>more/most</strong>?', buckets: ['-er / -est', 'more / most'], chips: [{ t: 'long', b: '-er / -est' }, { t: 'difficult', b: 'more / most' }, { t: 'warm', b: '-er / -est' }, { t: 'expensive', b: 'more / most' }, { t: 'rich', b: '-er / -est' }, { t: 'careful', b: 'more / most' }], level: 2, explain: 'Short words take the endings; long words take more and most.' },
      { id: 'eng-adjectives.degrees.i09', type: 'fill', q: 'Superlative of <strong>young</strong>', accept: ['youngest'], level: 1, explain: 'Short word, so add -est: youngest.' },
      { id: 'eng-adjectives.degrees.i10', type: 'fill', q: 'Comparative of <strong>silky</strong>', accept: ['silkier'], level: 2, explain: 'Consonant + y, so the y becomes i: silkier.' },
      { id: 'eng-adjectives.degrees.i11', type: 'fill', q: 'The three degrees of comparison are Positive, Comparative and ____', accept: ['superlative'], level: 1, explain: 'Positive, Comparative, Superlative — as in Tall, Taller, Tallest.' },
      { id: 'eng-adjectives.degrees.i12', type: 'mcq', q: 'Which sentence is correct?', options: ['This is the most interesting book.', 'This is the interestingest book.', 'This is the more interesting book of all.', 'This is the most interestingest book.'], answer: 0, level: 3, explain: '<em>Interesting</em> is a long word, so the superlative is <strong>most interesting</strong>.' },
      { id: 'eng-adjectives.degrees.i13', type: 'fillMulti', q: 'Complete the degrees for <strong>slim</strong>. Watch the spelling.', level: 3, blanks: [{ label: 'Comparative', accept: ['slimmer'] }, { label: 'Superlative', accept: ['slimmest'] }], explain: 'slim → slimmer → slimmest. Double m in both.' },
      { id: 'eng-adjectives.degrees.i14', type: 'multi', q: 'Tick every correctly spelt superlative.', options: ['biggest', 'slimest', 'happiest', 'richest', 'noblest'], answer: [0, 2, 3, 4], level: 3, explain: 'Only "slimest" is wrong — it needs two m\'s: <strong>slimmest</strong>.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'eng-adjectives.irregular-degrees',
    subject: 'english', topic: 'eng-adjectives',
    name: 'Irregular degrees',
    canDo: 'I know the degrees of good, bad, much and little by heart.',
    weight: 4, difficulty: 2,
    prereq: ['eng-adjectives.degrees'],
    teach: {
      hook: 'Four adjectives refuse to follow any rule. There is nothing to work out — you simply have to know them, and there are only four.',
      explain:
        '<p>These are the irregular ones from your workbook table:</p>' +
        '<ul>' +
        '<li><strong>good → better → best</strong></li>' +
        '<li><strong>bad → worse → worst</strong></li>' +
        '<li><strong>much → more → most</strong></li>' +
        '<li><strong>little → less → least</strong></li>' +
        '</ul>' +
        '<p>Say them out loud three times as a chant. That is genuinely the fastest way to fix them.</p>',
      worked: [
        {
          q: 'Complete: "Of all the teams, ours played the ____." (bad)',
          steps: [
            'The word is <em>bad</em>.',
            '"Of all" means we need the superlative — the top of the ladder.',
            'bad → worse → worst.'
          ],
          a: 'worst'
        }
      ],
      remember: [
        'good, better, best.',
        'bad, worse, worst.',
        'much, more, most.',
        'little, less, least.'
      ],
      watchOut: '"Worse" compares two things; "worst" is the bottom of a whole group. Same pattern as better and best.'
    },
    items: [
      { id: 'eng-adjectives.irregular-degrees.i01', type: 'fillMulti', q: 'Complete the degrees for <strong>good</strong>.', level: 1, blanks: [{ label: 'Comparative', accept: ['better'] }, { label: 'Superlative', accept: ['best'] }], explain: 'good → better → best.' },
      { id: 'eng-adjectives.irregular-degrees.i02', type: 'fillMulti', q: 'Complete the degrees for <strong>bad</strong>.', level: 1, blanks: [{ label: 'Comparative', accept: ['worse'] }, { label: 'Superlative', accept: ['worst'] }], explain: 'bad → worse → worst.' },
      { id: 'eng-adjectives.irregular-degrees.i03', type: 'fill', q: 'Superlative of <strong>much</strong>', accept: ['most'], level: 1, explain: 'much → more → most.' },
      { id: 'eng-adjectives.irregular-degrees.i04', type: 'fill', q: 'Comparative of <strong>little</strong>', accept: ['less'], level: 1, explain: 'little → less → least.' },
      { id: 'eng-adjectives.irregular-degrees.i05', type: 'match', q: 'Match each adjective to its comparative.', pairs: [{ l: 'good', r: 'better' }, { l: 'bad', r: 'worse' }, { l: 'much', r: 'more' }, { l: 'little', r: 'less' }], level: 2, explain: 'These four are irregular — they must simply be known.' },
      { id: 'eng-adjectives.irregular-degrees.i06', type: 'mcq', q: 'Complete: "This is the ____ film I have ever seen." (bad)', options: ['worse', 'worst', 'baddest', 'more bad'], answer: 1, level: 2, hint: '"Ever" compares it with everything.', explain: 'Comparing with all films, so the superlative: <strong>worst</strong>.' },
      { id: 'eng-adjectives.irregular-degrees.i07', type: 'mcq', q: 'Complete: "My handwriting is ____ than yours." (bad)', options: ['worse', 'worst', 'badder', 'most bad'], answer: 0, level: 2, explain: 'Comparing two things, so the comparative: <strong>worse</strong>.' },
      { id: 'eng-adjectives.irregular-degrees.i08', type: 'fill', q: 'Superlative of <strong>little</strong>', accept: ['least'], level: 2, explain: 'little → less → least.' },
      { id: 'eng-adjectives.irregular-degrees.i09', type: 'multi', q: 'Tick every word that is a correct <strong>irregular</strong> form.', options: ['gooder', 'better', 'baddest', 'worst', 'most'], answer: [1, 3, 4], level: 3, explain: '"Gooder" and "baddest" do not exist. The correct forms are better/best and worse/worst.' },
      { id: 'eng-adjectives.irregular-degrees.i10', type: 'order', q: 'Put these in order: positive, comparative, superlative.', answer: ['good', 'better', 'best'], level: 1, explain: 'good → better → best.' },
      { id: 'eng-adjectives.irregular-degrees.i11', type: 'fill', q: 'Complete: "She scored the ____ marks in the class." (good)', accept: ['best', 'highest'], level: 2, explain: 'The superlative of <em>good</em> is <strong>best</strong>.' },
      { id: 'eng-adjectives.irregular-degrees.i12', type: 'tf', q: 'The comparative of <em>bad</em> is "badder".', answer: false, level: 1, explain: 'No — <em>bad</em> is irregular. The comparative is <strong>worse</strong>.' },
      { id: 'eng-adjectives.irregular-degrees.i13', type: 'order', q: 'Put these in order: positive, comparative, superlative.', answer: ['little', 'less', 'least'], level: 2, explain: 'little → less → least.' },
      { id: 'eng-adjectives.irregular-degrees.i14', type: 'mcq', q: 'Which sentence is correct?', options: ['He has more money than me.', 'He has much money than me.', 'He has most money than me.', 'He has more most money than me.'], answer: 0, level: 2, explain: 'Comparing two people needs the comparative of <em>much</em>, which is <strong>more</strong>.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'eng-adjectives.spelling',
    subject: 'english', topic: 'eng-adjectives',
    name: 'Adjective spellings',
    canDo: 'I can spell the adjective words I keep getting wrong.',
    weight: 4, difficulty: 2,
    prereq: [],
    teach: {
      hook: 'Every one of these was marked wrong in your own workbook. None of them is difficult — they just need looking at once, properly.',
      explain:
        '<p>The exact slips from your pages, with the correct form:</p>' +
        '<ul>' +
        '<li>"collor" → <strong>colour</strong>. CBSE uses British spelling: <em>colour</em>, not <em>color</em>.</li>' +
        '<li>"slipers" → <strong>slippers</strong> (double p).</li>' +
        '<li>"slimest" → <strong>slimmest</strong> (double m).</li>' +
        '<li>"Whos" → <strong>whose</strong>.</li>' +
        '<li>"Intrrogative" → <strong>interrogative</strong>.</li>' +
        '<li>"Naughty" mid-sentence → <strong>naughty</strong>, small n. Capitals are only for the start of a sentence or a name.</li>' +
        '</ul>',
      worked: [
        {
          q: 'Spell the word for the shoes you wear at home.',
          steps: [
            'Say it slowly: slip-pers.',
            'The "slip" part keeps its p, and the ending adds another.',
            'So there are two p\'s.'
          ],
          a: 'slippers'
        }
      ],
      remember: [
        'colour, favourite, neighbour — British spellings keep the u.',
        'slippers, slimmest — double the consonant.',
        'whose, interrogative — the awkward two.'
      ],
      watchOut: 'A capital letter in the middle of a sentence is a mistake too. You wrote "Naughty" mid-sentence and the teacher corrected it twice.'
    },
    items: [
      { id: 'eng-adjectives.spelling.i01', type: 'mcq', q: 'Which spelling does CBSE expect?', options: ['color', 'collor', 'colour', 'coulor'], answer: 2, level: 1, explain: '<strong>Colour</strong> — the British spelling with the u. You wrote "collor" and it was circled in red.' },
      { id: 'eng-adjectives.spelling.i02', type: 'mcq', q: 'Which spelling is correct?', options: ['slipers', 'slippers', 'sliperrs', 'slipperz'], answer: 1, level: 1, explain: '<strong>Slippers</strong> — two p\'s.' },
      { id: 'eng-adjectives.spelling.i03', type: 'fill', q: 'Spell the word: shoes you wear indoors are ____', accept: ['slippers'], level: 2, explain: 'Slippers, with a double p.' },
      { id: 'eng-adjectives.spelling.i04', type: 'fill', q: 'Spell the word: the red, blue and green of something is its ____', accept: ['colour'], level: 2, hint: 'CBSE uses British spelling.', explain: '<strong>Colour</strong>, with the u.' },
      { id: 'eng-adjectives.spelling.i05', type: 'bucket', q: 'Sort each spelling.', buckets: ['Correct', 'Wrong'], chips: [{ t: 'colour', b: 'Correct' }, { t: 'slipers', b: 'Wrong' }, { t: 'whose', b: 'Correct' }, { t: 'slimest', b: 'Wrong' }, { t: 'interrogative', b: 'Correct' }, { t: 'Intrrogative', b: 'Wrong' }], level: 2, explain: 'The wrong ones need: slippers, slimmest, interrogative.' },
      { id: 'eng-adjectives.spelling.i06', type: 'mcq', q: 'Which sentence is punctuated correctly?', options: ['The Naughty boy ran away.', 'The naughty boy ran away.', 'the naughty Boy ran away.', 'The Naughty Boy ran away.'], answer: 1, level: 2, explain: 'Only the first word of a sentence and proper nouns take capitals. <em>Naughty</em> mid-sentence is a small n.' },
      { id: 'eng-adjectives.spelling.i07', type: 'fill', q: 'Spell the adjective meaning "not tidy": ____', accept: ['untidy'], level: 1, explain: 'Untidy — the prefix <em>un-</em> means "not".' },
      { id: 'eng-adjectives.spelling.i08', type: 'match', q: 'Match each adjective to its opposite.', pairs: [{ l: 'tidy', r: 'untidy' }, { l: 'safe', r: 'unsafe' }, { l: 'right', r: 'wrong' }, { l: 'winning', r: 'losing' }], level: 2, explain: 'Some opposites use the prefix <em>un-</em>; others are a completely different word.' },
      { id: 'eng-adjectives.spelling.i09', type: 'fill', q: 'Spell the adjective meaning "not safe": ____', accept: ['unsafe'], level: 1, explain: 'Unsafe.' },
      { id: 'eng-adjectives.spelling.i10', type: 'multi', q: 'Tick every correctly spelt word.', options: ['beautiful', 'comfortable', 'slimest', 'honest', 'collor'], answer: [0, 1, 3], level: 2, explain: '"slimest" should be slimmest and "collor" should be colour.' },
      { id: 'eng-adjectives.spelling.i11', type: 'fill', q: 'Spell the kind of adjective that asks a question: an ____ adjective.', accept: ['interrogative'], level: 3, explain: 'Interrogative — it starts like <em>internet</em>: i-n-t-e-r.' },
      { id: 'eng-adjectives.spelling.i12', type: 'match', q: 'Match each word to its meaning, from the workbook comprehension.', pairs: [{ l: 'conceited', r: 'proud' }, { l: 'jest', r: 'joke' }, { l: 'valuable', r: 'opposite of worthless' }, { l: 'honest', r: 'opposite of corrupt' }], level: 2, explain: 'These are the meanings given on p.23 of your workbook.' },
      { id: 'eng-adjectives.spelling.i13', type: 'mcq', q: 'Which sentence has no spelling mistake?', options: ['She wore red slipers.', 'What collor is your bag?', 'He is the slimmest boy in class.', 'Whos pen is this?'], answer: 2, level: 3, explain: 'The others should be slippers, colour and Whose.' },
      { id: 'eng-adjectives.spelling.i14', type: 'fill', q: 'From the p.23 passage: the ripe ears of grain were heavy and ____ (opposite of worthless).', accept: ['valuable'], level: 3, explain: 'Valuable. In the passage, the good ears are ripe, heavy, valuable and full; the bad ones are light, worthless and empty.' }
    ]
  }

]);
