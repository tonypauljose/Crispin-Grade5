/* ============================================================
   HALF-YEARLY HQ — English · Unit 4 · "Gilli Danda"

   Source: Crispin's class notebook, 4 handwritten pages dated
   13-5-2026, plus the Santoor Grade 5 textbook, Unit 4 "Ups and
   Downs", Chapter 7 "Gilli Danda", printed pages 79-90.
   Extraction files:
     .tmp/hy-extract/eng-gillidanda-notebook.md
     .tmp/hy-extract/eng-gillidanda-textbook.md

   NOTE: every textbook exercise in this chapter was left BLANK,
   so this topic teaches them from scratch. The notebook wording
   (e.g. "ray - a beam of light", "throw x catch") is the school's
   own wording and is used verbatim wherever it exists.
   ============================================================ */

window.HY_TOPICS = (window.HY_TOPICS || []).concat([{
  id: 'eng-gilli-danda',
  subject: 'english',
  name: 'Gilli Danda',
  emoji: '🏏',
  blurb: 'The Unit 4 poem, plus the grammar bolted onto it: prefixes, abstract nouns, possessive pronouns, antonyms and double letters.',
  source: 'Class notebook, 4 pages (13-5-2026) + Santoor Grade 5 textbook pp. 79-90',
  examWeight: 20
}]);

window.HY_SKILLS = (window.HY_SKILLS || []).concat([

  /* ─────────────────────────── 1 · WORD MEANINGS ─────────────────────────── */
  {
    id: 'eng-gilli-danda.word-meanings',
    subject: 'english',
    topic: 'eng-gilli-danda',
    name: 'Meanings of the new words',
    canDo: 'I can write the meaning of every new word from Gilli Danda the way my notebook gives it, and use the word in my own sentence.',
    weight: 5,
    difficulty: 1,
    prereq: [],
    teach: {
      hook: 'Three of these meanings are already written in your notebook in your teacher’s exact words. Learning them word for word is the cheapest mark in the paper.',
      explain: '<p>Your notebook gives three meanings for this lesson. Learn them exactly as they are written:</p><ul><li><strong>ray</strong> - a beam of light</li><li><strong>quit</strong> - to stop doing something / to leave something permanently</li><li><strong>underneath</strong> - under an object or a surface</li></ul><p>The textbook adds more words to look up: <strong>gather</strong>, <strong>swing</strong> and <strong>golden</strong>. It also lists four New Words on page 80: gather, gilli, quit, underneath.</p><p>The format the school wants is <strong>word - meaning</strong>, with a dash between. After the meaning, you use the word in a sentence of your own.</p>',
      worked: [
        {
          q: 'Write the meaning of <strong>underneath</strong>, then use it in a sentence of your own.',
          steps: [
            'Find the word in the poem: "Underneath the bright blue skies."',
            'It is telling you <em>where</em> the gilli is. It is below something.',
            'Notebook meaning: <strong>under an object or a surface</strong>.',
            'Now a sentence of your own, using the word in the same way: "The ball rolled underneath the car."'
          ],
          a: 'underneath - under an object or a surface. The ball rolled underneath the car.'
        },
        {
          q: 'Write the meaning of <strong>quit</strong>.',
          steps: [
            'The poem says "With our friends, we never quit!"',
            'They never <em>stop</em>. So quit has to do with stopping.',
            'Your notebook gives both halves of the meaning, joined by a slash.',
            'Copy it whole: to stop doing something / to leave something permanently.'
          ],
          a: 'quit - to stop doing something / to leave something permanently'
        }
      ],
      remember: [
        'ray = a beam of light. The poem ends "Under the golden rays of the sun".',
        'quit = to stop doing something / to leave something permanently.',
        'underneath = under an object or a surface.',
        'Write it as word - meaning, with a dash, the way the notebook does.'
      ],
      watchOut: 'The meaning of quit ends in permanently: p-e-r-m-a-n-e-n-t-l-y. There is an n in the middle, not an h. Your notebook has permahently and it was never corrected.'
    },
    items: [
      { id: 'eng-gilli-danda.word-meanings.i01', type: 'fill', level: 1,
        q: 'Write the meaning of <strong>ray</strong>.',
        accept: ['a beam of light', 'beam of light'],
        placeholder: 'the notebook meaning',
        hint: 'Four words. It starts with "a beam".',
        explain: 'Your notebook says: ray - a beam of light. Not "the sun" and not "light" on its own. A beam of light.' },

      { id: 'eng-gilli-danda.word-meanings.i02', type: 'fill', level: 1,
        q: 'Write the meaning of <strong>underneath</strong>.',
        accept: ['under an object or a surface', 'under an object or surface', 'under an object or a surface'],
        placeholder: 'the notebook meaning',
        hint: 'It begins with the word "under".',
        explain: 'Your notebook says: underneath - under an object or a surface. Two things are named, an object and a surface.' },

      { id: 'eng-gilli-danda.word-meanings.i03', type: 'mcq', level: 1,
        q: 'What does <strong>quit</strong> mean?',
        options: ['To start something new', 'To stop doing something / to leave something permanently', 'To play a game with friends', 'To hit something hard'],
        answer: 1,
        explain: 'quit means to stop doing something, or to leave something permanently. In the poem the children "never quit", so they never stop playing.' },

      { id: 'eng-gilli-danda.word-meanings.i04', type: 'match', level: 2,
        q: 'Match each word to its meaning.',
        pairs: [
          { l: 'ray', r: 'a beam of light' },
          { l: 'quit', r: 'to stop doing something permanently' },
          { l: 'underneath', r: 'under an object or a surface' },
          { l: 'gather', r: 'to come together in one place' }
        ],
        explain: 'ray, quit and underneath come straight from your notebook. gather is the textbook New Word on page 80 and means to come together in one place.' },

      { id: 'eng-gilli-danda.word-meanings.i05', type: 'mcq', level: 2,
        q: 'In the poem the children say <em>"With our friends, we never quit!"</em> What does that tell you about them?',
        options: ['They never stop playing', 'They never win the game', 'They never shout', 'They never bring friends'],
        answer: 0,
        explain: 'quit means to stop. "We never quit" means they keep playing and do not give up.' },

      { id: 'eng-gilli-danda.word-meanings.i06', type: 'fill', level: 1,
        q: 'Complete the last line of the poem: "Under the golden ______ of the sun!"',
        accept: ['rays'],
        placeholder: 'one word',
        hint: 'More than one beam of light.',
        explain: 'The line is "Under the golden rays of the sun!". One beam is a ray, many beams are rays.' },

      { id: 'eng-gilli-danda.word-meanings.i07', type: 'mcq', level: 1,
        q: 'What does <strong>gather</strong> mean in the line "In the playground, we gather around"?',
        options: ['To run away in all directions', 'To come together in one place', 'To shout loudly', 'To take turns'],
        answer: 1,
        explain: 'gather means to come together in one place. The children collect in a group in the playground before the game starts.' },

      { id: 'eng-gilli-danda.word-meanings.i08', type: 'mcq', level: 2,
        q: 'What does <strong>swing</strong> mean in the line "One, two, three, swing and hit"?',
        options: ['To sit on a park swing', 'To move your arm and the stick back and forth through the air', 'To wait quietly', 'To count out loud'],
        answer: 1,
        explain: 'Here swing is a verb. It means to move the danda back and forth through the air so that it strikes the gilli.' },

      { id: 'eng-gilli-danda.word-meanings.i09', type: 'mcq', level: 1,
        q: 'What does <strong>golden</strong> mean?',
        options: ['Made of real gold only', 'Bright yellow, the colour of gold', 'Very old', 'Very expensive'],
        answer: 1,
        explain: 'golden means having the bright yellow colour of gold. The sun’s rays are golden because they look bright yellow, not because they are made of gold.' },

      { id: 'eng-gilli-danda.word-meanings.i10', type: 'tap', level: 2,
        q: 'Tap the two New Words from page 80 that appear in this line.',
        tokens: [ { t: 'In' }, { t: 'the' }, { t: 'playground,' }, { t: 'we' }, { t: 'gather', ok: true }, { t: 'around,' }, { t: 'underneath', ok: true }, { t: 'the' }, { t: 'blue' }, { t: 'sky' } ],
        explain: 'The four New Words on page 80 are gather, gilli, quit and underneath. Two of them are in this line: gather and underneath.' },

      { id: 'eng-gilli-danda.word-meanings.i11', type: 'mcq', level: 3,
        q: 'Ravi writes in his book: <em>quit - to stop doing something / to leave something permahently.</em> One word is spelt wrong. Which one, and what is right?',
        options: ['stop should be stopp', 'something should be somthing', 'permahently should be permanently', 'Nothing is wrong'],
        answer: 2,
        explain: 'permanently has an n in the middle: per-ma-n-ent-ly. An h sneaks in there very easily. Say it slowly as you write it.' },

      { id: 'eng-gilli-danda.word-meanings.i12', type: 'tf', level: 1,
        q: '<strong>Underneath</strong> means on top of something.',
        answer: false,
        explain: 'No. underneath means under an object or a surface, so it is below, never on top.' },

      { id: 'eng-gilli-danda.word-meanings.i13', type: 'fill', level: 3,
        q: 'Which word in the poem means "a beam of light"?',
        accept: ['ray', 'rays'],
        placeholder: 'one word from the poem',
        hint: 'It is in the very last line.',
        explain: 'ray. The poem uses the plural: "Under the golden rays of the sun!"' },

      { id: 'eng-gilli-danda.word-meanings.i14', type: 'fillMulti', level: 2,
        q: 'Fill the meanings the way your notebook gives them.',
        blanks: [
          { label: 'ray -', accept: ['a beam of light', 'beam of light'] },
          { label: 'underneath -', accept: ['under an object or a surface', 'under an object or surface'] },
          { label: 'gather -', accept: ['to come together in one place', 'come together in one place', 'to come together'] }
        ],
        explain: 'Three meanings, three exact phrases. ray - a beam of light. underneath - under an object or a surface. gather - to come together in one place.' },

      { id: 'eng-gilli-danda.word-meanings.i15', type: 'shortAnswer', level: 2,
        q: 'Use <strong>gather</strong> in a sentence of your own.',
        model: 'The whole class gathered around the teacher to hear the story.',
        must: ['uses the word gather or gathered', 'the sentence shows people coming together in one place', 'starts with a capital letter and ends with a full stop'],
        lines: 2,
        explain: 'A good sentence proves you know the meaning. If your sentence would still make sense with "ran away" in place of "gather", the meaning has not come through.' },

      { id: 'eng-gilli-danda.word-meanings.i16', type: 'shortAnswer', level: 3,
        q: 'Write the meaning of <strong>underneath</strong> and then use it in a sentence of your own, in the notebook format.',
        model: 'underneath - under an object or a surface. My shoes were lying underneath the bed.',
        must: ['gives the meaning as "under an object or a surface"', 'uses a dash between the word and the meaning', 'then gives a full sentence using underneath', 'the sentence starts with a capital and ends with a full stop'],
        lines: 3,
        explain: 'Two jobs in one answer: the meaning first, in the notebook wording, then your own sentence. The dash between word and meaning is part of the format your teacher marks.' }
    ]
  },

  /* ─────────────────────────── 2 · ANTONYMS ─────────────────────────── */
  {
    id: 'eng-gilli-danda.antonyms',
    subject: 'english',
    topic: 'eng-gilli-danda',
    name: 'Antonyms and the odd one out',
    canDo: 'I can write the antonym of a word using the x format, and I can circle the word that is different in meaning from an underlined word.',
    weight: 5,
    difficulty: 2,
    prereq: [],
    teach: {
      hook: 'The exam asks for antonyms in two disguises. Same skill, two costumes.',
      explain: '<p>An <strong>antonym</strong> is a word that means the <em>opposite</em>. Your notebook writes antonyms with an <strong>x</strong> between the pair.</p><ul><li>throw x catch</li><li>free x captive</li><li>quit x continue</li><li>bright x dull</li></ul><p>The textbook on page 87 asks the same thing a different way: it underlines a word, gives three choices, and says <strong>circle the word that is different in meaning</strong>. Two of the three choices agree with the underlined word. The odd one out fights it, so the odd one out is the antonym. That is your answer.</p>',
      worked: [
        {
          q: 'Everyone liked the <u>vibrant</u> colours of the bangles. &nbsp; dull / bright / shiny',
          steps: [
            'vibrant means very bright and full of life.',
            'Check each choice against it. bright agrees. shiny agrees.',
            'dull means not bright. That one fights.',
            'The odd one out is the answer, so circle dull.'
          ],
          a: 'dull'
        },
        {
          q: 'Write the antonym: free x ______',
          steps: [
            'free means able to go anywhere, not held.',
            'The opposite is being held or shut in.',
            'Your notebook gives the exact word for it.'
          ],
          a: 'captive'
        }
      ],
      remember: [
        'Antonym = opposite. Synonym = same.',
        'throw x catch · free x captive · quit x continue · bright x dull',
        'In the page-87 exercise, two choices agree and one argues. Circle the one that argues.'
      ],
      watchOut: 'catch is spelt c-a-t-c-h. You wrote ctach in your notebook and had to cross it out. The t comes before the c.'
    },
    items: [
      { id: 'eng-gilli-danda.antonyms.i01', type: 'fill', level: 1,
        q: 'Write the antonym: <strong>throw</strong> x ______',
        accept: ['catch'],
        placeholder: 'one word',
        hint: 'What the other players in the poem try to do to the gilli.',
        explain: 'throw x catch. Careful with the spelling: c-a-t-c-h.' },

      { id: 'eng-gilli-danda.antonyms.i02', type: 'fill', level: 1,
        q: 'Write the antonym: <strong>free</strong> x ______',
        accept: ['captive'],
        placeholder: 'one word',
        hint: 'It starts with cap-.',
        explain: 'free x captive. A captive animal is one that is caged and cannot go where it likes.' },

      { id: 'eng-gilli-danda.antonyms.i03', type: 'fill', level: 1,
        q: 'Write the antonym: <strong>quit</strong> x ______',
        accept: ['continue'],
        placeholder: 'one word',
        hint: 'It starts with con-.',
        explain: 'quit x continue. quit means to stop, so the opposite is to keep going, which is continue.' },

      { id: 'eng-gilli-danda.antonyms.i04', type: 'fill', level: 1,
        q: 'Write the antonym: <strong>bright</strong> x ______',
        accept: ['dull'],
        placeholder: 'one word',
        hint: 'Four letters, starts with d.',
        explain: 'bright x dull. dull means not bright, with no shine in it.' },

      { id: 'eng-gilli-danda.antonyms.i05', type: 'match', level: 2,
        q: 'Match each word to its antonym.',
        pairs: [
          { l: 'throw', r: 'catch' },
          { l: 'free', r: 'captive' },
          { l: 'quit', r: 'continue' },
          { l: 'bright', r: 'dull' }
        ],
        explain: 'These are the exact four pairs from your notebook: throw x catch, free x captive, quit x continue, bright x dull.' },

      { id: 'eng-gilli-danda.antonyms.i06', type: 'mcq', level: 2,
        q: 'Which spelling is correct?',
        options: ['ctach', 'catch', 'cathc', 'cacth'],
        answer: 1,
        explain: 'catch. The letters go c-a-t-c-h. The t sits before the second c. This is the word you crossed out in your book, so it is worth two extra seconds.' },

      { id: 'eng-gilli-danda.antonyms.i07', type: 'mcq', level: 2,
        q: 'Miibi went to the market and bought an <u>expensive</u> toy. Circle the word that is <strong>different in meaning</strong>.',
        options: ['precious', 'costly', 'cheap'],
        answer: 2,
        explain: 'expensive means it costs a lot. precious and costly agree with that. cheap is the opposite, so cheap is the odd one out.' },

      { id: 'eng-gilli-danda.antonyms.i08', type: 'mcq', level: 2,
        q: 'Anju and Farida <u>forgot</u> to buy popcorn and juice for the picnic. Circle the word that is <strong>different in meaning</strong>.',
        options: ['remembered', 'revised', 'ignored'],
        answer: 0,
        explain: 'The opposite of forgot is remembered, so that is the answer. Fair warning: the other two choices in the book are not really synonyms of forgot either. Always pick the clear opposite.' },

      { id: 'eng-gilli-danda.antonyms.i09', type: 'mcq', level: 3,
        q: 'The moon <u>continued</u> to count the stars night after night. Circle the word that is <strong>different in meaning</strong>.',
        options: ['stopped', 'began', 'started'],
        answer: 0,
        explain: 'continued means kept going. The opposite of kept going is stopped. began and started are about starting, which is not the opposite. Look for the true opposite.' },

      { id: 'eng-gilli-danda.antonyms.i10', type: 'mcq', level: 2,
        q: 'I <u>always</u> complete my homework on time. Circle the word that is <strong>different in meaning</strong>.',
        options: ['often', 'never', 'sometimes'],
        answer: 1,
        explain: 'always means every single time. never means not even once, so never is the opposite. often and sometimes are somewhere in between.' },

      { id: 'eng-gilli-danda.antonyms.i11', type: 'mcq', level: 2,
        q: 'There was <u>excitement</u> in the shop among the toys. Circle the word that is <strong>different in meaning</strong>.',
        options: ['interest', 'enjoyment', 'boredom'],
        answer: 2,
        explain: 'excitement is a lively, happy feeling. interest and enjoyment agree with it. boredom is the flat, nothing-happening feeling, so it is the opposite.' },

      { id: 'eng-gilli-danda.antonyms.i12', type: 'mcq', level: 3,
        q: 'Badal <u>nervously</u> told his mother about the dog he found on his way home. Circle the word that is <strong>different in meaning</strong>.',
        options: ['sadly', 'joyfully', 'confidently'],
        answer: 2,
        explain: 'nervously means in a worried, unsure way. The true opposite is confidently, which means sure of yourself. joyfully is tempting but it is the opposite of sadly, not of nervously.' },

      { id: 'eng-gilli-danda.antonyms.i13', type: 'mcq', level: 2,
        q: 'Everyone liked the <u>vibrant</u> colours of the bangles. Circle the word that is <strong>different in meaning</strong>.',
        options: ['dull', 'bright', 'shiny'],
        answer: 0,
        explain: 'vibrant means bright and full of life. bright and shiny agree with it. dull is the opposite. This is the same pair your notebook drills: bright x dull.' },

      { id: 'eng-gilli-danda.antonyms.i14', type: 'mcq', level: 3,
        q: 'The fort is known for its <u>unique</u> style of construction. Circle the word that is <strong>different in meaning</strong>.',
        options: ['different', 'unusual', 'common'],
        answer: 2,
        explain: 'unique means one of a kind. different and unusual agree with it. common means seen everywhere, so common is the opposite. Notice: uncommon is the word your prefix table makes, and it means "not easily found".' },

      { id: 'eng-gilli-danda.antonyms.i15', type: 'bucket', level: 3,
        q: 'Sort each pair. Do the two words mean the opposite, or the same?',
        buckets: ['Antonyms (opposite)', 'Synonyms (same)'],
        chips: [
          { t: 'throw - catch', b: 'Antonyms (opposite)' },
          { t: 'bright - shiny', b: 'Synonyms (same)' },
          { t: 'quit - stop', b: 'Synonyms (same)' },
          { t: 'free - captive', b: 'Antonyms (opposite)' },
          { t: 'expensive - cheap', b: 'Antonyms (opposite)' },
          { t: 'expensive - costly', b: 'Synonyms (same)' },
          { t: 'quit - continue', b: 'Antonyms (opposite)' },
          { t: 'bright - dull', b: 'Antonyms (opposite)' }
        ],
        explain: 'quit - stop and bright - shiny and expensive - costly mean the same thing, so they are synonyms. The rest are opposites. Watch out for quit, which appears in both a synonym pair and an antonym pair.' },

      { id: 'eng-gilli-danda.antonyms.i16', type: 'mcq', level: 3,
        q: 'Sara writes in her book: <em>bright x shiny.</em> Is she right?',
        options: ['Yes, that is a correct antonym pair', 'No, shiny means almost the same as bright. The antonym is dull', 'No, the antonym of bright is light', 'Yes, because shiny is spelt differently'],
        answer: 1,
        explain: 'shiny is a synonym of bright, not an antonym. The x symbol means opposite, so it must be bright x dull.' }
    ]
  },

  /* ─────────────────────────── 3 · PREFIXES un- / re- ─────────────────────────── */
  {
    id: 'eng-gilli-danda.prefixes',
    subject: 'english',
    topic: 'eng-gilli-danda',
    name: 'Prefixes un- and re-',
    canDo: 'I can add un- or re- to a word, write the new word and write its meaning.',
    weight: 5,
    difficulty: 2,
    prereq: [],
    teach: {
      hook: 'Two tiny syllables let you build dozens of new words. This table is blank in your textbook, so it is the first thing a teacher would set in an exam.',
      explain: '<p>The textbook rule, word for word: <em>"Both un- and re- are prefixes. When we add a prefix at the beginning of a word it changes that word’s meaning. Each prefix has a different function."</em></p><p><strong>Un : not</strong> &nbsp; · &nbsp; <strong>Re : again</strong></p><p>So the meaning is easy to build. If the prefix is <strong>un-</strong>, the meaning starts with <strong>not</strong>. If the prefix is <strong>re-</strong>, the meaning ends with <strong>again</strong>.</p><ul><li>Un + happy = unhappy (not happy)</li><li>Re + draw = redraw (draw again)</li></ul><p>The one row already printed in your book is <strong>Un + common = uncommon</strong>, and its meaning is given as <em>"Something that is not easily found"</em>.</p>',
      worked: [
        {
          q: 'Add the correct prefix to <strong>arrange</strong>. Write the new word and its meaning.',
          steps: [
            'Ask: does the sentence need "not arrange" or "arrange again"?',
            'You cannot "not-arrange" something, but you can certainly arrange it again.',
            'So the prefix is re-, giving <strong>rearrange</strong>.',
            'Meaning: re means again, so rearrange means arrange again.'
          ],
          a: 'Re- | arrange | rearrange | arrange again'
        },
        {
          q: 'Add the correct prefix to <strong>aware</strong>. Write the new word and its meaning.',
          steps: [
            '"aware again" makes no sense.',
            '"not aware" makes perfect sense: you did not know.',
            'So the prefix is un-, giving <strong>unaware</strong>.',
            'Meaning: not aware.'
          ],
          a: 'Un- | aware | unaware | not aware'
        }
      ],
      remember: [
        'Un : not · Re : again. Those two words are the whole rule.',
        'Build the meaning from the prefix: un- meanings begin with "not", re- meanings end with "again".',
        'A prefix goes at the beginning of a word. A prefix is never a word by itself.'
      ],
      watchOut: 'Not every word starting with un or re has a prefix. uncle is not "not cle". red is not "d again". Test it: chop the prefix off and check that a real word is left behind.'
    },
    items: [
      { id: 'eng-gilli-danda.prefixes.i01', type: 'mcq', level: 1,
        q: 'The prefix <strong>un-</strong> means:',
        options: ['again', 'not', 'before', 'very'],
        answer: 1,
        explain: 'Un : not. Your textbook prints it in bold on page 81.' },

      { id: 'eng-gilli-danda.prefixes.i02', type: 'mcq', level: 1,
        q: 'The prefix <strong>re-</strong> means:',
        options: ['not', 'wrongly', 'again', 'after'],
        answer: 2,
        explain: 'Re : again. So redraw means draw again.' },

      { id: 'eng-gilli-danda.prefixes.i03', type: 'mcq', level: 1,
        q: 'What is a <strong>prefix</strong>?',
        options: ['A letter added to the end of a word', 'Something added at the beginning of a word, which changes its meaning', 'Another word for a full stop', 'A word that means the opposite'],
        answer: 1,
        explain: 'The book says: when we add a prefix at the beginning of a word it changes that word’s meaning. Beginning, not end.' },

      { id: 'eng-gilli-danda.prefixes.i04', type: 'fill', level: 1,
        q: 'Re + write = ______',
        accept: ['rewrite'],
        placeholder: 'the new word',
        hint: 'Join them with no space and no hyphen.',
        explain: 'rewrite. It means write again, because re means again.' },

      { id: 'eng-gilli-danda.prefixes.i05', type: 'fill', level: 1,
        q: 'Un + aware = ______',
        accept: ['unaware'],
        placeholder: 'the new word',
        explain: 'unaware, and it means not aware. You would not say "reaware", because being aware again makes no sense.' },

      { id: 'eng-gilli-danda.prefixes.i06', type: 'fill', level: 2,
        q: 'Add the correct prefix to <strong>comfortable</strong>.',
        accept: ['uncomfortable'],
        placeholder: 'the new word',
        hint: 'Would you say "not comfortable" or "comfortable again"?',
        explain: 'uncomfortable, meaning not comfortable. A hard wooden bench is uncomfortable.' },

      { id: 'eng-gilli-danda.prefixes.i07', type: 'fill', level: 2,
        q: 'Add the correct prefix to <strong>think</strong>.',
        accept: ['rethink'],
        placeholder: 'the new word',
        hint: 'You can certainly do this one a second time.',
        explain: 'rethink, meaning think again. "unthink" is not a word.' },

      { id: 'eng-gilli-danda.prefixes.i08', type: 'fillMulti', level: 3,
        q: 'Complete the page-81 table. Write the new word for each.',
        blanks: [
          { label: 'write', accept: ['rewrite'] },
          { label: 'aware', accept: ['unaware'] },
          { label: 'comfortable', accept: ['uncomfortable'] },
          { label: 'arrange', accept: ['rearrange'] },
          { label: 'think', accept: ['rethink'] }
        ],
        explain: 'rewrite, unaware, uncomfortable, rearrange, rethink. Two take un- because they mean "not", three take re- because they mean "again".' },

      { id: 'eng-gilli-danda.prefixes.i09', type: 'bucket', level: 2,
        q: 'Which prefix does each word need?',
        buckets: ['Un- (not)', 'Re- (again)'],
        chips: [
          { t: 'happy', b: 'Un- (not)' },
          { t: 'draw', b: 'Re- (again)' },
          { t: 'kind', b: 'Un- (not)' },
          { t: 'read', b: 'Re- (again)' },
          { t: 'aware', b: 'Un- (not)' },
          { t: 'arrange', b: 'Re- (again)' },
          { t: 'fair', b: 'Un- (not)' },
          { t: 'fill', b: 'Re- (again)' }
        ],
        explain: 'Say the meaning out loud before you sort. "not happy" works, "happy again" is odd. "read again" works, "not read" would need a different word.' },

      { id: 'eng-gilli-danda.prefixes.i10', type: 'match', level: 2,
        q: 'Match each new word to its meaning.',
        pairs: [
          { l: 'unhappy', r: 'not happy' },
          { l: 'redraw', r: 'draw again' },
          { l: 'unaware', r: 'not aware' },
          { l: 'rearrange', r: 'arrange again' }
        ],
        explain: 'Un- meanings begin with "not". Re- meanings end with "again". That is all there is to it.' },

      { id: 'eng-gilli-danda.prefixes.i11', type: 'tap', level: 2,
        q: 'Tap every word that has a prefix. <br><em>Sameer was unhappy because he was unable to find his drawing book. He decided to redo his work.</em>',
        tokens: [ { t: 'Sameer' }, { t: 'was' }, { t: 'unhappy', ok: true }, { t: 'because' }, { t: 'he' }, { t: 'was' }, { t: 'unable', ok: true }, { t: 'to' }, { t: 'find' }, { t: 'his' }, { t: 'drawing' }, { t: 'book.' }, { t: 'He' }, { t: 'decided' }, { t: 'to' }, { t: 'redo', ok: true }, { t: 'his' }, { t: 'work.' } ],
        explain: 'unhappy (not happy), unable (not able) and redo (do again). This is the exact sentence printed in the rule box on page 81.' },

      { id: 'eng-gilli-danda.prefixes.i12', type: 'mcq', level: 2,
        q: 'What does the book give as the meaning of <strong>uncommon</strong>?',
        options: ['Something very ordinary', 'Something that is not easily found', 'Something common again', 'Something shared by everyone'],
        answer: 1,
        explain: 'This is the one row already printed in your table: Un- | common | uncommon | Something that is not easily found.' },

      { id: 'eng-gilli-danda.prefixes.i13', type: 'mcq', level: 3,
        q: 'Which of these words does <strong>not</strong> have a prefix?',
        options: ['unhappy', 'uncle', 'rewrite', 'unable'],
        answer: 1,
        explain: 'uncle. Chop off un- and you are left with "cle", which is not a word. In unhappy, unable and rewrite, chopping the prefix leaves happy, able and write.' },

      { id: 'eng-gilli-danda.prefixes.i14', type: 'mcq', level: 3,
        q: 'Anil writes: <em>Un + write = unwrite (not write).</em> Is he right?',
        options: ['Yes, both parts are correct', 'No. unwrite is not a word. It should be rewrite, meaning write again', 'No. It should be unwritten, meaning not written', 'Yes, but the meaning should be "write again"'],
        answer: 1,
        explain: 'The prefix has to make a real word. unwrite is not one. rewrite is, and it means write again.' },

      { id: 'eng-gilli-danda.prefixes.i15', type: 'fillMulti', level: 3,
        q: 'Write the meaning of each word, using the rule Un : not, Re : again.',
        blanks: [
          { label: 'unaware means', accept: ['not aware'] },
          { label: 'rearrange means', accept: ['arrange again'] },
          { label: 'uncomfortable means', accept: ['not comfortable'] },
          { label: 'rethink means', accept: ['think again'] }
        ],
        explain: 'Build the meaning straight from the prefix. un- gives "not ___", re- gives "___ again". No cleverness needed.' },

      { id: 'eng-gilli-danda.prefixes.i16', type: 'multi', level: 3,
        q: 'Tick every word below that is spelt correctly and really uses a prefix.',
        options: ['unkind', 'refill', 'unarrange', 'rethink', 'unhappy', 'retall'],
        answer: [0, 1, 3, 4],
        explain: 'unkind, refill, rethink and unhappy are all real. unarrange is not a word (it is rearrange) and retall is not a word either, because you cannot be tall again.' }
    ]
  },

  /* ─────────────────────────── 4 · ABSTRACT NOUNS ─────────────────────────── */
  {
    id: 'eng-gilli-danda.abstract-nouns',
    subject: 'english',
    topic: 'eng-gilli-danda',
    name: 'Abstract or concrete noun',
    canDo: 'I can use the see, taste, touch, smell test to decide whether a noun is abstract, and I know which words in the page-82 grid are abstract.',
    weight: 5,
    difficulty: 2,
    prereq: [],
    teach: {
      hook: 'You can put a rose in your hand. You cannot put happiness in your hand. That one difference is the whole topic.',
      explain: '<p>The textbook gives you a grid of 24 words on page 82 and says: <strong>encircle the nouns that you can see, taste, touch, or smell.</strong> Then it says the words you have <strong>NOT</strong> encircled are the <strong>abstract nouns</strong>.</p><p>Its own words: <em>"The word abstract refers to something that has no physical shape."</em> And: <em>"Feelings, thoughts, ideas, etc., are all abstract nouns as they cannot be touched, smelt, or seen."</em></p><p>The example it uses: happiness and rose are both nouns, but you can touch, see and smell a rose. You cannot touch happiness. It is a feeling.</p>',
      worked: [
        {
          q: 'Is <strong>fear</strong> abstract or concrete?',
          steps: [
            'Run the test. Can you see fear? No.',
            'Can you taste it, touch it or smell it? No.',
            'It is a feeling, and feelings have no physical shape.',
            'So it is an <strong>abstract noun</strong>. In the grid you would leave it uncircled.'
          ],
          a: 'Abstract'
        },
        {
          q: 'Is an <strong>ice cube</strong> abstract or concrete?',
          steps: [
            'Can you see it? Yes. Can you touch it? Yes, and it is cold.',
            'You could even taste it.',
            'It has a physical shape, so it is not abstract.',
            'It is a concrete noun, so in the grid you circle it.'
          ],
          a: 'Concrete (circle it)'
        }
      ],
      remember: [
        'Abstract = no physical shape. You cannot see it, taste it, touch it or smell it.',
        'Feelings, thoughts and ideas are abstract: joy, anger, fear, truth, lie, happiness.',
        'In the page-82 grid you CIRCLE the concrete nouns. The 6 words left uncircled are the abstract ones.'
      ],
      watchOut: 'The trick in this exercise is that the answer is the words you leave alone. The book prints NOT in bold capitals for exactly that reason. Read the instruction twice before you start circling.'
    },
    items: [
      { id: 'eng-gilli-danda.abstract-nouns.i01', type: 'mcq', level: 1,
        q: 'The word <strong>abstract</strong> refers to something that:',
        options: ['is very small', 'has no physical shape', 'is hard to spell', 'has more than one meaning'],
        answer: 1,
        explain: 'Straight from page 82: the word abstract refers to something that has no physical shape.' },

      { id: 'eng-gilli-danda.abstract-nouns.i02', type: 'mcq', level: 1,
        q: 'Which of these is an <strong>abstract noun</strong>?',
        options: ['spoon', 'anger', 'tiger', 'toffee'],
        answer: 1,
        explain: 'anger is a feeling, so it has no physical shape. You can hold a spoon, see a tiger and taste a toffee.' },

      { id: 'eng-gilli-danda.abstract-nouns.i03', type: 'bucket', level: 2,
        q: 'Sort these words from the page-82 grid.',
        buckets: ['Abstract (leave uncircled)', 'Concrete (circle it)'],
        chips: [
          { t: 'joy', b: 'Abstract (leave uncircled)' },
          { t: 'leaf', b: 'Concrete (circle it)' },
          { t: 'anger', b: 'Abstract (leave uncircled)' },
          { t: 'mountain', b: 'Concrete (circle it)' },
          { t: 'sun', b: 'Concrete (circle it)' },
          { t: 'shirt', b: 'Concrete (circle it)' },
          { t: 'toffee', b: 'Concrete (circle it)' },
          { t: 'rose', b: 'Concrete (circle it)' }
        ],
        explain: 'These are the first two rows of the grid. Only joy and anger are feelings, so only those two are abstract.' },

      { id: 'eng-gilli-danda.abstract-nouns.i04', type: 'bucket', level: 2,
        q: 'Sort these words from the page-82 grid.',
        buckets: ['Abstract (leave uncircled)', 'Concrete (circle it)'],
        chips: [
          { t: 'ice cube', b: 'Concrete (circle it)' },
          { t: 'sugar', b: 'Concrete (circle it)' },
          { t: 'truth', b: 'Abstract (leave uncircled)' },
          { t: 'lie', b: 'Abstract (leave uncircled)' },
          { t: 'chessboard', b: 'Concrete (circle it)' },
          { t: 'football', b: 'Concrete (circle it)' },
          { t: 'happiness', b: 'Abstract (leave uncircled)' },
          { t: 'fear', b: 'Abstract (leave uncircled)' }
        ],
        explain: 'truth, lie, happiness and fear are ideas and feelings, so they are abstract. The rest you can see and touch.' },

      { id: 'eng-gilli-danda.abstract-nouns.i05', type: 'tf', level: 1,
        q: '<strong>Happiness</strong> is a concrete noun because it makes you smile.',
        answer: false,
        explain: 'A smile is concrete. Happiness itself is a feeling and cannot be touched, so it is abstract. That is the exact example the book uses.' },

      { id: 'eng-gilli-danda.abstract-nouns.i06', type: 'multi', level: 2,
        q: 'Tick every <strong>abstract</strong> noun.',
        options: ['tree', 'fear', 'cup', 'truth', 'deer', 'joy'],
        answer: [1, 3, 5],
        explain: 'fear, truth and joy have no physical shape. A tree, a cup and a deer can all be seen and touched.' },

      { id: 'eng-gilli-danda.abstract-nouns.i07', type: 'tap', level: 2,
        q: 'Tap the abstract nouns in this row of the grid: <em>chessboard, lie, football, deer</em>',
        tokens: [ { t: 'chessboard' }, { t: 'lie', ok: true }, { t: 'football' }, { t: 'deer' } ],
        explain: 'Only lie. A lie is something someone says, an idea with no shape. The other three you can pick up or look at.' },

      { id: 'eng-gilli-danda.abstract-nouns.i08', type: 'mcq', level: 3,
        q: 'Rahul reads the instruction and circles <strong>joy</strong>, <strong>anger</strong> and <strong>fear</strong> in the grid. Has he done it right?',
        options: ['Yes, those are the abstract nouns', 'No. He was told to circle the nouns he can see, taste, touch or smell, so those three should be left uncircled', 'No, he should have circled every word', 'Yes, but he should have circled truth as well'],
        answer: 1,
        explain: 'He has found the abstract nouns correctly but done the opposite of the instruction. The exercise says circle the ones you can sense. The abstract nouns are the leftovers.' },

      { id: 'eng-gilli-danda.abstract-nouns.i09', type: 'fill', level: 2,
        q: 'Complete the book’s sentence: "The word abstract refers to something that has no ______ shape."',
        accept: ['physical'],
        placeholder: 'one word',
        explain: 'physical. No physical shape means there is nothing there to touch or hold.' },

      { id: 'eng-gilli-danda.abstract-nouns.i10', type: 'mcq', level: 2,
        q: 'Which word in the poem "Gilli Danda" is an <strong>abstract noun</strong>?',
        options: ['stick', 'joy', 'sun', 'playground'],
        answer: 1,
        explain: 'joy, from the line "We play with joy, watch it go!". A stick, the sun and a playground can all be seen.' },

      { id: 'eng-gilli-danda.abstract-nouns.i11', type: 'mcq', level: 2,
        q: 'The book says <strong>sadness</strong> is an example of which kind of noun?',
        options: ['A concrete noun', 'An abstract noun', 'A proper noun', 'A plural noun'],
        answer: 1,
        explain: 'Page 82 uses sadness as its example of an abstract noun, because sadness has no physical shape.' },

      { id: 'eng-gilli-danda.abstract-nouns.i12', type: 'multi', level: 3,
        q: 'The page-82 grid has 24 words. Tick the <strong>six</strong> that you should leave uncircled.',
        options: ['joy', 'sugar', 'anger', 'truth', 'river', 'lie', 'happiness', 'fear', 'spoon'],
        answer: [0, 2, 3, 5, 6, 7],
        explain: 'The six abstract nouns in the grid are joy, anger, truth, lie, happiness and fear. The other 18 words are all concrete.' },

      { id: 'eng-gilli-danda.abstract-nouns.i13', type: 'mcq', level: 3,
        q: 'Why is a <strong>rose</strong> a concrete noun but <strong>happiness</strong> an abstract one?',
        options: ['Because a rose is prettier', 'Because you can touch, see and smell a rose, but happiness is a feeling you cannot touch', 'Because rose is a shorter word', 'Because happiness is a verb'],
        answer: 1,
        explain: 'This is the book’s own comparison. Both are nouns. Only one of them has a physical shape.' },

      { id: 'eng-gilli-danda.abstract-nouns.i14', type: 'tap', level: 3,
        q: 'Tap every abstract noun in this sentence. <br><em>The boy felt fear when the tiger roared, but his courage grew and he told the truth.</em>',
        tokens: [ { t: 'The' }, { t: 'boy' }, { t: 'felt' }, { t: 'fear', ok: true }, { t: 'when' }, { t: 'the' }, { t: 'tiger' }, { t: 'roared,' }, { t: 'but' }, { t: 'his' }, { t: 'courage', ok: true }, { t: 'grew' }, { t: 'and' }, { t: 'he' }, { t: 'told' }, { t: 'the' }, { t: 'truth', ok: true } ],
        explain: 'fear, courage and truth are all feelings or ideas with no physical shape. boy and tiger can be seen, so they are concrete.' },

      { id: 'eng-gilli-danda.abstract-nouns.i15', type: 'match', level: 2,
        q: 'Match each concrete noun to the sense that proves it is concrete.',
        pairs: [
          { l: 'rose', r: 'you can smell it' },
          { l: 'toffee', r: 'you can taste it' },
          { l: 'ice cube', r: 'you can feel it is cold' },
          { l: 'mountain', r: 'you can see it from far away' }
        ],
        explain: 'If any one of see, taste, touch or smell works on a noun, it is concrete. Only when all four fail is the noun abstract.' },

      { id: 'eng-gilli-danda.abstract-nouns.i16', type: 'shortAnswer', level: 3,
        q: 'Write three abstract nouns of your own that are not in the textbook grid, and say in one sentence why they are abstract.',
        model: 'Love, kindness and courage are abstract nouns. They are feelings, so they have no physical shape and cannot be seen, touched, tasted or smelt.',
        must: ['gives three nouns that are feelings, thoughts or ideas', 'none of them is a thing you could hold', 'the reason mentions that they cannot be seen, touched, tasted or smelt', 'written as a full sentence'],
        lines: 3,
        explain: 'Good ones to reach for: love, kindness, courage, anger, hope, honesty, freedom, friendship. Test each one against see, taste, touch, smell before you write it down.' }
    ]
  }
]);
