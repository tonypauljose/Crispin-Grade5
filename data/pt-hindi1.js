/* ============================================================
   Crispin's World — HINDI PERIODIC TEST 1
   पाठ · बगीचे का घोंघा  +  व्याकरण · संज्ञा (Noun)

   This is the ONLY file that changes per chapter. The slide engine
   (js/hindi-journey.js) and styles (css/hindi-journey.css) are
   chapter-agnostic.

   ⚠️ STRICTLY school-aligned. The literature half mirrors the Asian
   School Bahrain · Grade 5 · Hindi April notes (same wording/answers
   as data/hin02-bageeche-ka-ghongha.js). The grammar half mirrors the
   Grade-5 हिंदी व्याकरण workbook (संज्ञा: जातिवाचक vs व्यक्तिवाचक).

   Teaching model (read-first, never spoon-fed):
     discover (meaning shown ONCE) -> readCheck (Hindi only, read aloud,
     🔊 = "check my reading") -> guessMeaning (attempt before reveal)
     -> trace -> copy -> match -> choose/fill -> miniTest -> milestone.
   Answer-writing objective: answerBuild (tap tiles in order) ->
     traceAnswer (trace clause by clause) -> recall ("write it on paper").
   ============================================================ */
(function () {
  'use strict';

  // ---- Words (defined once; Devanagari spelt here only) ----------------
  const W = {
    // ── बगीचे का घोंघा · शब्दार्थ ──
    chhor:    { hi: 'छोर',    roman: 'chhor',   en: 'the far end / edge', emoji: '📍' },
    adbhut:   { hi: 'अद्भुत', roman: 'adbhut',  en: 'amazing / wondrous', emoji: '✨' },
    chakit:   { hi: 'चकित',   roman: 'chakit',  en: 'surprised / amazed', emoji: '😲' },
    dhwani:   { hi: 'ध्वनि',  roman: 'dhwani',  en: 'sound', emoji: '🔊' },
    // ── विलोम (antonyms) ──
    jeevan:   { hi: 'जीवन',   roman: 'jeevan',  en: 'life', emoji: '🌱' },
    mrityu:   { hi: 'मृत्यु', roman: 'mrityu',  en: 'death', emoji: '⚰️' },
    chaura:   { hi: 'चौड़ा',  roman: 'chauda',  en: 'wide / broad', emoji: '↔️' },
    tang:     { hi: 'तंग',    roman: 'tang',    en: 'narrow / tight', emoji: '🤏' },
    saamne:   { hi: 'सामने',  roman: 'saamne',  en: 'in front', emoji: '⬆️' },
    peeche:   { hi: 'पीछे',   roman: 'peeche',  en: 'behind', emoji: '⬇️' },
    hansna:   { hi: 'हँसना',  roman: 'hansna',  en: 'to laugh', emoji: '😄' },
    rona:     { hi: 'रोना',   roman: 'rona',    en: 'to cry', emoji: '😢' },
    sookha:   { hi: 'सूखा',   roman: 'sookha',  en: 'dry', emoji: '🏜️' },
    geela:    { hi: 'गीला',   roman: 'geela',   en: 'wet', emoji: '💧' },
    // ── पर्यायवाची (synonyms) ──
    duniya:   { hi: 'दुनिया', roman: 'duniya',  en: 'world', emoji: '🌍' },
    jagat:    { hi: 'जगत',    roman: 'jagat',   en: 'world', emoji: '🌐' },
    sansaar:  { hi: 'संसार',  roman: 'sansaar', en: 'world', emoji: '🗺️' },
    aankh:    { hi: 'आँख',    roman: 'aankh',   en: 'eye', emoji: '👁️' },
    netra:    { hi: 'नेत्र',  roman: 'netra',   en: 'eye', emoji: '👀' },
    nayan:    { hi: 'नयन',    roman: 'nayan',   en: 'eye', emoji: '😍' },
    bageecha: { hi: 'बगीचा',  roman: 'bageecha', en: 'garden', emoji: '🌷' },
    upvan:    { hi: 'उपवन',   roman: 'upvan',   en: 'garden', emoji: '🌳' },
    baag:     { hi: 'बाग',    roman: 'baag',    en: 'garden', emoji: '🏡' },
    aakaash:  { hi: 'आकाश',   roman: 'aakaash', en: 'sky', emoji: '🌤️' },
    nabh:     { hi: 'नभ',     roman: 'nabh',    en: 'sky', emoji: '☁️' },
    gagan:    { hi: 'गगन',    roman: 'gagan',   en: 'sky', emoji: '🌌' },
    // ── वाक्य बनाओ ──
    achaanak: { hi: 'अचानक',  roman: 'achaanak', en: 'suddenly', emoji: '⚡' },
    mazedaar: { hi: 'मज़ेदार', roman: 'mazedaar', en: 'fun / interesting', emoji: '😋' },
    // ── संज्ञा (grammar) — concept words ──
    sangya:   { hi: 'संज्ञा',  roman: 'sangya',  en: 'noun (a name)', emoji: '🏷️' },
    jaati:    { hi: 'जातिवाचक संज्ञा',  roman: 'jaativaachak', en: 'common noun', emoji: '👥' },
    vyakti:   { hi: 'व्यक्तिवाचक संज्ञा', roman: 'vyaktivaachak', en: 'proper noun', emoji: '🏛️' },
    // example nouns (categories)
    rohan:    { hi: 'रोहन',   roman: 'Rohan',   en: "a person's name", emoji: '👦' },
    kitaab:   { hi: 'किताब',  roman: 'kitaab',  en: 'a book (a thing)', emoji: '📖' },
    chooha:   { hi: 'चूहा',   roman: 'chooha',  en: 'a mouse (an animal)', emoji: '🐭' },
    ghar:     { hi: 'घर',     roman: 'ghar',    en: 'a house (a place)', emoji: '🏠' },
  };

  // ---- Slide builder helpers (keep the data DRY + correct) -------------
  let _n = 0;
  const uid = (p) => `${p}-${++_n}`;

  const discover = (w, note) => ({ kind: 'discover', id: uid('disc-' + w.roman), word: w, note: note || '' });
  const readCheck = (w) => ({ kind: 'readCheck', id: uid('read-' + w.roman), word: w });
  // options are English meanings; answer is index of the correct one (engine shuffles)
  const guess = (w, distractors) => ({
    kind: 'guessMeaning', id: uid('guess-' + w.roman), word: w,
    options: [w.en, ...distractors], answer: 0
  });
  const trace = (w) => ({ kind: 'trace', id: uid('trace-' + w.roman), word: w });
  const copy = (w) => ({ kind: 'copy', id: uid('copy-' + w.roman), word: w });
  const milestone = (headline, stickerId, label, stars) =>
    ({ kind: 'milestone', id: uid('done'), headline, sticker: { id: stickerId, label }, stars });
  const intro = (emoji, headline, body) => ({ kind: 'intro', id: uid('intro'), emoji, headline, body });

  /* =====================================================================
     MISSION 1 — Word Meanings · शब्दार्थ   (बगीचे का घोंघा)
     ===================================================================== */
  const m1Words = [W.chhor, W.adbhut, W.chakit, W.dhwani];
  const m1 = {
    id: 'm1-shabdarth', title: 'Word Meanings', titleHi: 'शब्दार्थ', emoji: '📖', estMin: 10,
    words: m1Words.map(w => w.hi),
    steps: [
      intro('📖', 'Mission 1 · शब्दार्थ', 'Meet 4 words from बगीचे का घोंघा. Look, listen, read, trace — then play a matching game! 🐌'),
      ...m1Words.map(w => discover(w)),
      readCheck(W.chhor),  guess(W.chhor, ['a sound', 'a garden']),
      readCheck(W.adbhut), guess(W.adbhut, ['boring', 'sad']),
      readCheck(W.chakit), guess(W.chakit, ['sleepy', 'angry']),
      readCheck(W.dhwani), guess(W.dhwani, ['the far end', 'light']),
      trace(W.dhwani), trace(W.chakit), copy(W.chhor),
      {
        kind: 'match', id: uid('m1-match'), title: 'Match each word to its meaning',
        pairs: [
          { left: { hi: 'छोर', roman: 'chhor' }, right: { en: 'the far end' } },
          { left: { hi: 'अद्भुत', roman: 'adbhut' }, right: { en: 'amazing' } },
          { left: { hi: 'चकित', roman: 'chakit' }, right: { en: 'surprised' } },
          { left: { hi: 'ध्वनि', roman: 'dhwani' }, right: { en: 'sound' } },
        ]
      },
      {
        kind: 'choose', id: uid('m1-choose'), prompt: "'चकित' का अर्थ क्या है?",
        options: [{ en: 'surprised / amazed' }, { en: 'sleepy' }, { en: 'a garden' }], answer: 0,
        explain: "'चकित' का अर्थ है — हैरान (surprised). 😲"
      },
      {
        kind: 'fill', id: uid('m1-fill'), title: 'Tap the word that fits',
        prompt: 'घोंघे ने एक मीठी ____ सुनी।  (The snail heard a sweet ____.)',
        bank: [{ hi: 'ध्वनि' }, { hi: 'छोर' }, { hi: 'चकित' }], answer: 'ध्वनि',
        explain: "ध्वनि = sound (आवाज़). 🔊"
      },
      {
        kind: 'miniTest', id: uid('m1-mini'), title: 'Quick check — 3 questions',
        questions: [
          { kind: 'choose', prompt: "'अद्भुत' means…", options: [{ en: 'amazing' }, { en: 'dry' }, { en: 'narrow' }], answer: 0 },
          { kind: 'choose', prompt: 'Which word means "sound"?', options: [{ hi: 'ध्वनि' }, { hi: 'छोर' }, { hi: 'अद्भुत' }], answer: 0 },
          { kind: 'fill', prompt: "'छोर' means ____", bank: [{ en: 'the far end' }, { en: 'sound' }, { en: 'surprised' }], answer: 'the far end' },
        ]
      },
      milestone('Mission 1 complete! You met 4 new words! 🎉', 'pt-hindi1-m1', 'Word Explorer', 10),
    ]
  };

  /* =====================================================================
     MISSION 2 — Opposites · विलोम शब्द   (बगीचे का घोंघा)
     ===================================================================== */
  const m2Pairs = [
    [W.jeevan, W.mrityu], [W.chaura, W.tang], [W.saamne, W.peeche],
    [W.hansna, W.rona], [W.sookha, W.geela],
  ];
  const m2 = {
    id: 'm2-vilom', title: 'Opposites', titleHi: 'विलोम शब्द', emoji: '⚖️', estMin: 11,
    words: m2Pairs.flat().map(w => w.hi),
    steps: [
      intro('⚖️', 'Mission 2 · विलोम', 'Opposite words are like day and night! Learn 5 pairs that mean the opposite of each other. 🌗'),
      ...m2Pairs.flatMap(([a, b]) => [
        discover(a, `The opposite of "${b.en}".`),
        discover(b, `The opposite of "${a.en}".`),
      ]),
      readCheck(W.jeevan), guess(W.jeevan, ['death', 'wet']),
      readCheck(W.hansna), guess(W.hansna, ['to cry', 'narrow']),
      readCheck(W.geela),  guess(W.geela, ['dry', 'in front']),
      trace(W.jeevan), trace(W.rona), copy(W.geela),
      {
        kind: 'match', id: uid('m2-match'), title: 'Match each word to its opposite',
        pairs: [
          { left: { hi: 'जीवन', roman: 'jeevan' }, right: { hi: 'मृत्यु' } },
          { left: { hi: 'चौड़ा', roman: 'chauda' }, right: { hi: 'तंग' } },
          { left: { hi: 'सामने', roman: 'saamne' }, right: { hi: 'पीछे' } },
          { left: { hi: 'हँसना', roman: 'hansna' }, right: { hi: 'रोना' } },
          { left: { hi: 'सूखा', roman: 'sookha' }, right: { hi: 'गीला' } },
        ]
      },
      {
        kind: 'choose', id: uid('m2-choose1'), prompt: "'जीवन' का विलोम शब्द क्या है?",
        options: [{ hi: 'मृत्यु' }, { hi: 'गीला' }, { hi: 'पीछे' }], answer: 0,
        explain: 'जीवन (life) ↔ मृत्यु (death).'
      },
      {
        kind: 'choose', id: uid('m2-choose2'), prompt: "'सूखा' का विलोम शब्द क्या है?",
        options: [{ hi: 'गीला' }, { hi: 'तंग' }, { hi: 'रोना' }], answer: 0,
        explain: 'सूखा (dry) ↔ गीला (wet).'
      },
      {
        kind: 'miniTest', id: uid('m2-mini'), title: 'Quick check — 3 questions',
        questions: [
          { kind: 'choose', prompt: 'Opposite of चौड़ा?', options: [{ hi: 'तंग' }, { hi: 'गीला' }, { hi: 'पीछे' }], answer: 0 },
          { kind: 'choose', prompt: 'Opposite of हँसना (to laugh)?', options: [{ hi: 'रोना' }, { hi: 'सामने' }, { hi: 'सूखा' }], answer: 0 },
          { kind: 'choose', prompt: 'सामने (in front) is the opposite of…', options: [{ hi: 'पीछे' }, { hi: 'मृत्यु' }, { hi: 'तंग' }], answer: 0 },
        ]
      },
      milestone('Mission 2 complete! You are an Opposite Master! ⚖️', 'pt-hindi1-m2', 'Opposite Master', 10),
    ]
  };

  /* =====================================================================
     MISSION 3 — Same-Meaning Words · पर्यायवाची   (बगीचे का घोंघा)
     ===================================================================== */
  const m3 = {
    id: 'm3-paryayvachi', title: 'Same-Meaning Words', titleHi: 'पर्यायवाची शब्द', emoji: '🌳', estMin: 11,
    words: [W.duniya, W.jagat, W.sansaar, W.aankh, W.netra, W.nayan, W.bageecha, W.upvan, W.baag, W.aakaash, W.nabh, W.gagan].map(w => w.hi),
    steps: [
      intro('🌳', 'Mission 3 · पर्यायवाची', 'Some words are "friends" — they mean the SAME thing! Learn 4 word families. 👭'),
      discover(W.duniya, 'Other words for world: जगत, संसार.'),
      discover(W.jagat, 'Means world, like दुनिया.'),
      discover(W.sansaar, 'Means world, like दुनिया.'),
      discover(W.aankh, 'Other words for eye: नेत्र, नयन.'),
      discover(W.netra, 'Means eye, like आँख.'),
      discover(W.bageecha, 'Other words for garden: उपवन, बाग.'),
      discover(W.upvan, 'Means garden, like बगीचा.'),
      discover(W.aakaash, 'Other words for sky: नभ, गगन.'),
      discover(W.nabh, 'Means sky, like आकाश.'),
      readCheck(W.jagat),  guess(W.jagat, ['eye', 'garden']),
      readCheck(W.netra),  guess(W.netra, ['world', 'sky']),
      readCheck(W.gagan),  guess(W.gagan, ['garden', 'eye']),
      trace(W.nabh), trace(W.baag), copy(W.netra),
      {
        kind: 'match', id: uid('m3-match'), title: 'Match each word to its family',
        pairs: [
          { left: { hi: 'जगत', roman: 'jagat' }, right: { hi: 'दुनिया', en: '(world)' } },
          { left: { hi: 'नेत्र', roman: 'netra' }, right: { hi: 'आँख', en: '(eye)' } },
          { left: { hi: 'उपवन', roman: 'upvan' }, right: { hi: 'बगीचा', en: '(garden)' } },
          { left: { hi: 'नभ', roman: 'nabh' }, right: { hi: 'आकाश', en: '(sky)' } },
          { left: { hi: 'गगन', roman: 'gagan' }, right: { hi: 'आकाश', en: '(sky)' } },
        ]
      },
      {
        kind: 'choose', id: uid('m3-choose1'), prompt: "'आँख' का पर्यायवाची शब्द कौन-सा है?",
        options: [{ hi: 'नेत्र' }, { hi: 'जगत' }, { hi: 'बाग' }], answer: 0,
        explain: 'आँख = नेत्र = नयन (all mean eye). 👁️'
      },
      {
        kind: 'choose', id: uid('m3-choose2'), prompt: 'नभ और गगन — दोनों का अर्थ है…',
        options: [{ en: 'sky' }, { en: 'garden' }, { en: 'world' }], answer: 0,
        explain: 'आकाश = नभ = गगन (all mean sky). 🌌'
      },
      {
        kind: 'miniTest', id: uid('m3-mini'), title: 'Quick check — 3 questions',
        questions: [
          { kind: 'choose', prompt: 'उपवन means the same as…', options: [{ hi: 'बगीचा' }, { hi: 'आँख' }, { hi: 'दुनिया' }], answer: 0 },
          { kind: 'choose', prompt: 'Which means world?', options: [{ hi: 'संसार' }, { hi: 'नभ' }, { hi: 'बाग' }], answer: 0 },
          { kind: 'choose', prompt: 'नयन means…', options: [{ en: 'eye' }, { en: 'sky' }, { en: 'garden' }], answer: 0 },
        ]
      },
      milestone('Mission 3 complete! Word friends unlocked! 🌳', 'pt-hindi1-m3', 'Word-Friends Star', 10),
    ]
  };

  /* =====================================================================
     MISSION 4 — Questions & Answers · प्रश्न-उत्तर  (core writing mission)
     ===================================================================== */
  const m4 = {
    id: 'm4-prashn-uttar', title: 'Questions & Answers', titleHi: 'प्रश्न-उत्तर', emoji: '🐌', estMin: 15,
    steps: [
      intro('🐌', 'Mission 4 · प्रश्न-उत्तर', 'These are the questions from class. Learn each answer, build it, trace it — then YOU write it! ✍️ (You can also read the full story.)'),

      // Q1
      {
        kind: 'choose', id: uid('m4-q1-choose'),
        prompt: 'घोंघा बगीचे के बाहर क्यों जाना चाहता था?', promptEn: 'Why did the snail want to go outside the garden?',
        options: [
          { hi: 'वहाँ की दुनिया देखने के लिए', en: 'to see the world out there' },
          { hi: 'खाना खाने के लिए', en: 'to eat food' },
          { hi: 'अपनी माँ से मिलने के लिए', en: 'to meet his mother' },
        ], answer: 0,
        explain: 'घोंघा बगीचे के बाहर वहाँ की दुनिया देखने के लिए जाना चाहता था।'
      },
      {
        kind: 'answerBuild', id: uid('m4-q1-build'),
        question: 'घोंघा बाहर क्यों जाना चाहता था?',
        questionEn: 'Build the answer: tap the words in the right order.',
        answer: ['घोंघा', 'बाहर', 'की', 'दुनिया', 'देखने', 'के', 'लिए', 'जाना', 'चाहता', 'था।'],
        hintEn: 'The snail wanted to go to see the world outside.'
      },
      {
        kind: 'traceAnswer', id: uid('m4-q1-trace'),
        clauses: ['घोंघा बाहर की दुनिया', 'देखने जाना चाहता था।'],
        en: 'The snail wanted to go to see the outside world.'
      },
      {
        kind: 'recall', id: uid('m4-q1-recall'),
        prompt: 'घोंघा बगीचे के बाहर क्यों जाना चाहता था?',
        modelHi: 'घोंघा बगीचे के बाहर वहाँ की दुनिया देखने के लिए जाना चाहता था।',
        modelEn: 'The snail wanted to go outside the garden to see the world there.'
      },

      // Q2
      {
        kind: 'choose', id: uid('m4-q2-choose'),
        prompt: 'घोंघे ने पहली बार बाहर क्या-क्या देखा?', promptEn: 'What all did the snail see outside for the first time?',
        options: [
          { hi: 'लाल चींटों, चढ़ती गिलहरी, गेंद के पीछे भागता कुत्ता', en: 'red ants, a climbing squirrel, a dog chasing a ball' },
          { hi: 'हाथी और शेर', en: 'an elephant and a lion' },
          { hi: 'नीला समुद्र', en: 'the blue sea' },
        ], answer: 0,
        explain: 'घोंघे ने लाल चींटों, पेड़ पर चढ़ती गिलहरी और गेंद के पीछे भागते कुत्ते को देखा।'
      },
      {
        kind: 'answerBuild', id: uid('m4-q2-build'),
        question: 'घोंघे ने बाहर क्या-क्या देखा?',
        questionEn: 'Build the answer: tap the words in order.',
        answer: ['घोंघे', 'ने', 'चींटों', 'गिलहरी', 'और', 'कुत्ते', 'को', 'देखा।'],
        hintEn: 'The snail saw ants, a squirrel and a dog.'
      },
      {
        kind: 'recall', id: uid('m4-q2-recall'),
        prompt: 'घोंघे ने पहली बार बाहर क्या-क्या देखा?',
        modelHi: 'घोंघे ने लाल चींटों को, पेड़ पर चढ़ती गिलहरी को और गेंद के पीछे भागते कुत्ते को देखा।',
        modelEn: 'The snail saw red ants, a squirrel climbing a tree, and a dog running after a ball.'
      },

      // Q3
      {
        kind: 'choose', id: uid('m4-q3-choose'),
        prompt: 'घोंघे का सिर क्या देखकर चकरा गया?', promptEn: 'What made the snail’s head spin?',
        options: [
          { hi: 'आसमान तक जाते खजूर और बड़ के लंबे पेड़ को देखकर', en: 'seeing the tall date-palm and banyan trees reaching the sky' },
          { hi: 'एक छोटी तितली को देखकर', en: 'seeing a small butterfly' },
          { hi: 'ज़ोर की बारिश को देखकर', en: 'seeing heavy rain' },
        ], answer: 0,
        explain: 'घोंघे का सिर आसमान तक जाते खजूर और बड़ के लंबे पेड़ को देखकर चकरा गया।'
      },
      {
        kind: 'recall', id: uid('m4-q3-recall'),
        prompt: 'घोंघे का सिर क्या देखकर चकरा गया?',
        modelHi: 'घोंघे का सिर आसमान तक जाते खजूर और बड़ के लंबे पेड़ को देखकर चकरा गया।',
        modelEn: 'The snail’s head spun on seeing the tall date-palm and banyan trees that reached the sky.'
      },

      {
        kind: 'miniTest', id: uid('m4-mini'), title: 'Quick check — 3 questions',
        questions: [
          { kind: 'choose', prompt: 'Why did the snail go out?', options: [{ en: 'to see the world' }, { en: 'to eat' }, { en: 'to sleep' }], answer: 0 },
          { kind: 'choose', prompt: 'Which did the snail see?', options: [{ hi: 'गिलहरी' }, { hi: 'हाथी' }, { hi: 'शेर' }], answer: 0 },
          { kind: 'choose', prompt: 'घोंघे का सिर किसे देखकर चकराया?', options: [{ hi: 'लंबे पेड़' }, { hi: 'तितली' }, { hi: 'बारिश' }], answer: 0 },
        ]
      },
      milestone('Mission 4 complete! You can answer AND write them! 🐌', 'pt-hindi1-m4', 'Story Detective', 14),
    ]
  };

  /* =====================================================================
     MISSION 5 — Make a Sentence + Moral + HOT · वाक्य · मूल्य · सोच
     ===================================================================== */
  const m5 = {
    id: 'm5-vakya-moral', title: 'Sentences · Moral · Think', titleHi: 'वाक्य · मूल्य · सोच', emoji: '✏️', estMin: 13,
    words: [W.achaanak.hi, W.mazedaar.hi],
    steps: [
      intro('✏️', 'Mission 5 · वाक्य बनाओ', 'Use the word in a sentence — just like in the test! Then learn the moral and one thinking question. ✍️'),
      discover(W.achaanak, 'We will use this in a sentence.'),
      discover(W.mazedaar, 'We will use this in a sentence.'),
      readCheck(W.achaanak), guess(W.achaanak, ['slowly', 'fun']),

      // अचानक sentence
      {
        kind: 'choose', id: uid('m5-ac-choose'), prompt: "'अचानक' शब्द का सही प्रयोग किस वाक्य में हुआ है?",
        options: [
          { hi: 'अचानक बारिश शुरू हो गई।', en: 'Suddenly it started to rain.' },
          { hi: 'मैं अचानक खाना खाता हूँ।', en: '(not correct)' },
        ], answer: 0,
        explain: "'अचानक' का अर्थ है 'suddenly' — किसी अप्रत्याशित घटना के लिए।"
      },
      {
        kind: 'answerBuild', id: uid('m5-ac-build'),
        question: 'वाक्य बनाओ — अचानक', questionEn: 'Build a sentence using अचानक.',
        answer: ['वह', 'हँसते-हँसते', 'अचानक', 'रोने', 'लगा।'],
        hintEn: 'While laughing, he suddenly began to cry.'
      },
      {
        kind: 'recall', id: uid('m5-ac-recall'),
        prompt: 'अचानक — अपना वाक्य लिखो।', modelHi: 'वह हँसते-हँसते अचानक रोने लगा।',
        modelEn: 'While laughing, he suddenly began to cry.'
      },

      // मज़ेदार sentence
      {
        kind: 'choose', id: uid('m5-mz-choose'), prompt: "'मज़ेदार' शब्द का सही प्रयोग किस वाक्य में हुआ है?",
        options: [
          { hi: 'यह कहानी बहुत मज़ेदार है।', en: 'This story is very fun.' },
          { hi: 'मेरा सिर मज़ेदार है।', en: '(not correct)' },
        ], answer: 0,
        explain: "'मज़ेदार' का अर्थ है 'fun / interesting'।"
      },
      {
        kind: 'answerBuild', id: uid('m5-mz-build'),
        question: 'वाक्य बनाओ — मज़ेदार', questionEn: 'Build a sentence using मज़ेदार.',
        answer: ['यह', 'चुटकुला', 'बहुत', 'मज़ेदार', 'है।'],
        hintEn: 'This joke is very funny.'
      },
      {
        kind: 'recall', id: uid('m5-mz-recall'),
        prompt: 'मज़ेदार — अपना वाक्य लिखो।', modelHi: 'यह चुटकुला बहुत मज़ेदार है।',
        modelEn: 'This joke is very funny.'
      },

      // मूल्य (value / moral)
      {
        kind: 'choose', id: uid('m5-moral-choose'),
        prompt: 'इस पाठ से हमें क्या शिक्षा मिलती है?', promptEn: 'What does this lesson teach us?',
        options: [
          { hi: 'कभी हार नहीं माननी चाहिए और मेहनत करते रहना चाहिए।', en: 'Never give up; keep working hard.' },
          { hi: 'हमें कभी बाहर नहीं जाना चाहिए।', en: 'We should never go outside.' },
          { hi: 'हमें हमेशा डरना चाहिए।', en: 'We should always be afraid.' },
        ], answer: 0,
        explain: 'सीख — हमें कभी हार नहीं माननी चाहिए और मेहनत करके आगे बढ़ना चाहिए।'
      },
      {
        kind: 'recall', id: uid('m5-moral-recall'),
        prompt: 'इस पाठ से हमें क्या शिक्षा मिलती है?',
        modelHi: 'इस पाठ से हमें यह शिक्षा मिलती है कि हमें कभी हार नहीं माननी चाहिए और हमेशा मेहनत करके आगे बढ़ना चाहिए।',
        modelEn: 'This lesson teaches us never to give up, and to keep working hard to move forward.'
      },

      // HOT
      {
        kind: 'choose', id: uid('m5-hot-choose'),
        prompt: 'घोंघे की उम्र की पहचान कैसे की जाती है?', promptEn: 'How is a snail’s age recognised? (thinking question)',
        options: [
          { hi: 'उसके कवच (खोल) पर बने छल्लों या घेरों से', en: 'from the rings/circles on its shell' },
          { hi: 'उसकी पूँछ की लंबाई से', en: 'from the length of its tail' },
          { hi: 'उसके रंग से', en: 'from its colour' },
        ], answer: 0,
        explain: 'घोंघे की उम्र उसके कवच (खोल) पर बने छल्लों या घेरों को गिनकर पहचानी जाती है — जैसे पेड़ की उम्र उसके तने के वलयों से।'
      },

      {
        kind: 'miniTest', id: uid('m5-mini'), title: 'Quick check — 3 questions',
        questions: [
          { kind: 'choose', prompt: "'अचानक' means…", options: [{ en: 'suddenly' }, { en: 'slowly' }, { en: 'fun' }], answer: 0 },
          { kind: 'choose', prompt: 'The lesson teaches us to…', options: [{ en: 'never give up' }, { en: 'always be afraid' }, { en: 'stay inside' }], answer: 0 },
          { kind: 'choose', prompt: 'A snail’s age is known from…', options: [{ en: 'rings on its shell' }, { en: 'its tail' }, { en: 'its colour' }], answer: 0 },
        ]
      },
      milestone('Mission 5 complete! बगीचे का घोंघा done! 🏆', 'pt-hindi1-m5', 'Snail Champion', 14),
    ]
  };

  /* =====================================================================
     MISSION 6 — What is a Noun? · संज्ञा क्या है?   (व्याकरण)
     ===================================================================== */
  const m6 = {
    id: 'm6-sangya', title: 'What is a Noun?', titleHi: 'संज्ञा', emoji: '🏷️', estMin: 11,
    words: [W.rohan, W.kitaab, W.chooha, W.ghar].map(w => w.hi),
    steps: [
      intro('🏷️', 'Mission 6 · संज्ञा क्या है?', 'संज्ञा = a NAME. किसी व्यक्ति, वस्तु, प्राणी या स्थान के नाम को संज्ञा कहते हैं। जैसे — रोहन, किताब, चूहा, घर. 🏷️'),
      discover(W.rohan, 'व्यक्ति (a person) — a name like Rohan is a संज्ञा.'),
      discover(W.kitaab, 'वस्तु (a thing) — किताब is a संज्ञा.'),
      discover(W.chooha, 'प्राणी (an animal) — चूहा is a संज्ञा.'),
      discover(W.ghar, 'स्थान (a place) — घर is a संज्ञा.'),
      {
        kind: 'choose', id: uid('m6-c1'), prompt: 'इनमें से कौन-सा शब्द संज्ञा (नाम) है?',
        options: [{ hi: 'रोहन' }, { hi: 'दौड़ना' }, { hi: 'अच्छा' }], answer: 0,
        explain: 'रोहन एक व्यक्ति का नाम है — इसलिए यह संज्ञा है। (दौड़ना = क्रिया, अच्छा = विशेषण)'
      },
      {
        kind: 'choose', id: uid('m6-c2'), prompt: "'घर' किस प्रकार की संज्ञा का उदाहरण है?",
        options: [{ hi: 'स्थान' }, { hi: 'प्राणी' }, { hi: 'व्यक्ति' }], answer: 0,
        explain: 'घर एक स्थान (place) का नाम है।'
      },
      {
        kind: 'choose', id: uid('m6-c3'), prompt: "'चूहा' किसका उदाहरण है?",
        options: [{ hi: 'प्राणी' }, { hi: 'वस्तु' }, { hi: 'स्थान' }], answer: 0,
        explain: 'चूहा एक प्राणी (animal) है।'
      },
      {
        kind: 'fill', id: uid('m6-fill'), title: 'Tap the संज्ञा (the name word)',
        prompt: '____ मेज़ पर रखी है।  (The ____ is on the table.)',
        bank: [{ hi: 'किताब' }, { hi: 'सुंदर' }, { hi: 'जल्दी' }], answer: 'किताब',
        explain: 'किताब एक वस्तु (thing) है — संज्ञा। ✅'
      },
      {
        kind: 'miniTest', id: uid('m6-mini'), title: 'Quick check — 3 questions',
        questions: [
          { kind: 'choose', prompt: 'संज्ञा किसे कहते हैं?', options: [{ en: 'the name of a person, thing, animal or place' }, { en: 'an action word' }, { en: 'a describing word' }], answer: 0 },
          { kind: 'choose', prompt: 'Which is a संज्ञा?', options: [{ hi: 'किताब' }, { hi: 'दौड़ना' }, { hi: 'सुंदर' }], answer: 0 },
          { kind: 'choose', prompt: "'रोहन' is the name of a…", options: [{ en: 'person (व्यक्ति)' }, { en: 'place (स्थान)' }, { en: 'thing (वस्तु)' }], answer: 0 },
        ]
      },
      milestone('Mission 6 complete! You know what a संज्ञा is! 🏷️', 'pt-hindi1-m6', 'Noun Spotter', 10),
    ]
  };

  /* =====================================================================
     MISSION 7 — Two Kinds · जातिवाचक vs व्यक्तिवाचक   (व्याकरण)
     ===================================================================== */
  const m7 = {
    id: 'm7-bhed', title: 'Two Kinds of Noun', titleHi: 'संज्ञा के दो भेद', emoji: '👥', estMin: 12,
    steps: [
      intro('👥', 'Mission 7 · दो भेद', 'A noun can be of two kinds: जातिवाचक (common — a whole class) and व्यक्तिवाचक (proper — one special name). 🏛️'),
      discover(W.jaati, 'किसी पूरी जाति/वर्ग का बोध — जैसे पेड़, कुत्ता, लड़का, नदी, शहर।'),
      discover(W.vyakti, 'किसी विशेष व्यक्ति/स्थान/वस्तु का नाम — जैसे भारत, दिल्ली, गंगा, ताजमहल।'),
      {
        kind: 'choose', id: uid('m7-c1'), prompt: "'भारत' कौन-सी संज्ञा है?",
        options: [{ hi: 'व्यक्तिवाचक' }, { hi: 'जातिवाचक' }], answer: 0,
        explain: 'भारत एक विशेष देश का नाम है — व्यक्तिवाचक संज्ञा।'
      },
      {
        kind: 'choose', id: uid('m7-c2'), prompt: "'पेड़' कौन-सी संज्ञा है?",
        options: [{ hi: 'जातिवाचक' }, { hi: 'व्यक्तिवाचक' }], answer: 0,
        explain: 'पेड़ पूरी जाति का बोध कराता है — जातिवाचक संज्ञा।'
      },
      {
        kind: 'choose', id: uid('m7-c3'), prompt: "'गंगा' कौन-सी संज्ञा है?",
        options: [{ hi: 'व्यक्तिवाचक' }, { hi: 'जातिवाचक' }], answer: 0,
        explain: 'गंगा एक विशेष नदी का नाम है — व्यक्तिवाचक। (नदी = जातिवाचक)'
      },
      {
        kind: 'choose', id: uid('m7-c4'), prompt: "'लड़का' कौन-सी संज्ञा है?",
        options: [{ hi: 'जातिवाचक' }, { hi: 'व्यक्तिवाचक' }], answer: 0,
        explain: 'लड़का पूरी जाति का बोध कराता है — जातिवाचक।'
      },
      {
        kind: 'match', id: uid('m7-match'), title: 'Match each word to its kind',
        pairs: [
          { left: { hi: 'दिल्ली' }, right: { hi: 'व्यक्तिवाचक' } },
          { left: { hi: 'शहर' }, right: { hi: 'जातिवाचक' } },
          { left: { hi: 'ताजमहल' }, right: { hi: 'व्यक्तिवाचक संज्ञा' } },
          { left: { hi: 'नदी' }, right: { hi: 'जातिवाचक संज्ञा' } },
        ]
      },
      {
        kind: 'fill', id: uid('m7-fill'), title: 'Tap the व्यक्तिवाचक संज्ञा (proper noun)',
        prompt: '____ एक प्रसिद्ध स्मारक है।  (____ is a famous monument.)',
        bank: [{ hi: 'ताजमहल' }, { hi: 'पेड़' }, { hi: 'नदी' }], answer: 'ताजमहल',
        explain: 'ताजमहल एक विशेष स्मारक का नाम है — व्यक्तिवाचक। ✅'
      },
      {
        kind: 'miniTest', id: uid('m7-mini'), title: 'Quick check — 3 questions',
        questions: [
          { kind: 'choose', prompt: 'दिल्ली is a…', options: [{ en: 'proper noun (व्यक्तिवाचक)' }, { en: 'common noun (जातिवाचक)' }], answer: 0 },
          { kind: 'choose', prompt: 'कुत्ता is a…', options: [{ en: 'common noun (जातिवाचक)' }, { en: 'proper noun (व्यक्तिवाचक)' }], answer: 0 },
          { kind: 'choose', prompt: 'Which is a व्यक्तिवाचक संज्ञा?', options: [{ hi: 'हिमालय' }, { hi: 'पर्वत' }, { hi: 'लड़की' }], answer: 0 },
        ]
      },
      milestone('Mission 7 complete! जातिवाचक vs व्यक्तिवाचक — sorted! 👥', 'pt-hindi1-m7', 'Noun Sorter', 12),
    ]
  };

  /* =====================================================================
     MISSION 8 — Pick & Sort Nouns · संज्ञा छाँटो   (व्याकरण, core)
     ===================================================================== */
  const m8 = {
    id: 'm8-chhaanto', title: 'Pick & Sort Nouns', titleHi: 'संज्ञा छाँटो', emoji: '🔍', estMin: 14,
    steps: [
      intro('🔍', 'Mission 8 · संज्ञा छाँटो', 'Fill the right noun, then find the noun in each sentence and tell its kind — exactly like the workbook! ✍️'),

      // उचित संज्ञा भरो (fill from a word bank)
      {
        kind: 'fill', id: uid('m8-f1'), title: 'उचित संज्ञा भरो',
        prompt: 'जंगल का राजा ____ है।  (The king of the jungle is the ____.)',
        bank: [{ hi: 'शेर' }, { hi: 'तितली' }, { hi: 'घर' }], answer: 'शेर',
        explain: 'जंगल का राजा शेर है। 🦁 (शेर — जातिवाचक संज्ञा)'
      },
      {
        kind: 'fill', id: uid('m8-f2'), title: 'उचित संज्ञा भरो',
        prompt: 'फूल पर ____ बैठी है।  (A ____ is sitting on the flower.)',
        bank: [{ hi: 'तितली' }, { hi: 'मोर' }, { hi: 'मछली' }], answer: 'तितली',
        explain: 'फूल पर तितली बैठी है। 🦋'
      },
      {
        kind: 'fill', id: uid('m8-f3'), title: 'उचित संज्ञा भरो',
        prompt: 'भारत की राजधानी ____ है।  (The capital of India is ____.)',
        bank: [{ hi: 'दिल्ली' }, { hi: 'मुंबई' }, { hi: 'आगरा' }], answer: 'दिल्ली',
        explain: 'भारत की राजधानी दिल्ली है। (दिल्ली — व्यक्तिवाचक संज्ञा)'
      },
      {
        kind: 'fill', id: uid('m8-f4'), title: 'उचित संज्ञा भरो',
        prompt: '____ कपड़े धोता है।  (The ____ washes clothes.)',
        bank: [{ hi: 'धोबी' }, { hi: 'ग्वाला' }, { hi: 'माली' }], answer: 'धोबी',
        explain: 'धोबी कपड़े धोता है। 🧺'
      },

      // संज्ञा छाँटकर भेद लिखो (identify noun + its kind)
      {
        kind: 'choose', id: uid('m8-c1'),
        prompt: 'मीना गुड़िया से खेल रही है। — इसमें व्यक्तिवाचक संज्ञा कौन-सी है?',
        options: [{ hi: 'मीना' }, { hi: 'गुड़िया' }, { hi: 'खेल' }], answer: 0,
        explain: 'मीना एक विशेष नाम है — व्यक्तिवाचक। (गुड़िया — जातिवाचक)'
      },
      {
        kind: 'choose', id: uid('m8-c2'),
        prompt: 'मोर नाच रहा था। — संज्ञा और उसका भेद कौन-सा है?',
        options: [{ hi: 'मोर — जातिवाचक' }, { hi: 'नाच — जातिवाचक' }, { hi: 'मोर — व्यक्तिवाचक' }], answer: 0,
        explain: 'मोर एक जातिवाचक संज्ञा है। 🦚'
      },
      {
        kind: 'choose', id: uid('m8-c3'),
        prompt: 'भारत में बहुत-सी नदियाँ हैं। — व्यक्तिवाचक संज्ञा कौन-सी है?',
        options: [{ hi: 'भारत' }, { hi: 'नदियाँ' }, { hi: 'बहुत' }], answer: 0,
        explain: 'भारत — व्यक्तिवाचक; नदियाँ — जातिवाचक।'
      },
      {
        kind: 'choose', id: uid('m8-c4'),
        prompt: 'रोहित अमेरिका में पढ़ता है। — इसमें दोनों व्यक्तिवाचक संज्ञाएँ कौन-सी हैं?',
        options: [{ hi: 'रोहित, अमेरिका' }, { hi: 'पढ़ता, में' }, { hi: 'रोहित, पढ़ता' }], answer: 0,
        explain: 'रोहित (व्यक्ति) और अमेरिका (देश) — दोनों व्यक्तिवाचक संज्ञाएँ हैं।'
      },

      // sort a tiny paragraph (write on paper, then check)
      {
        kind: 'recall', id: uid('m8-recall'),
        prompt: 'वाक्य पढ़ो और संज्ञाएँ छाँटो: "सचिन भारत का प्रसिद्ध खिलाड़ी है।"',
        modelHi: 'व्यक्तिवाचक संज्ञा — सचिन, भारत।  जातिवाचक संज्ञा — खिलाड़ी।',
        modelEn: 'Proper nouns: Sachin, India. Common noun: player.'
      },

      {
        kind: 'miniTest', id: uid('m8-mini'), title: 'Quick check — 3 questions',
        questions: [
          { kind: 'fill', prompt: 'भारत की राजधानी ____ है।', bank: [{ hi: 'दिल्ली' }, { hi: 'आगरा' }, { hi: 'मुंबई' }], answer: 'दिल्ली' },
          { kind: 'choose', prompt: 'गुड़िया is a…', options: [{ en: 'common noun (जातिवाचक)' }, { en: 'proper noun (व्यक्तिवाचक)' }], answer: 0 },
          { kind: 'choose', prompt: '"गंगा बहती है।" — गंगा is…', options: [{ hi: 'व्यक्तिवाचक' }, { hi: 'जातिवाचक' }], answer: 0 },
        ]
      },
      milestone('🏆 All 8 missions done! बगीचे का घोंघा + संज्ञा — you are exam-ready!', 'pt-hindi1-champion', 'Periodic Test Champion', 18),
    ]
  };

  /* =====================================================================
     PRACTICE MODE — mixed pool from all missions (both topics)
     ===================================================================== */
  const practice = {
    pool: [
      { kind: 'choose', prompt: "'छोर' means…", options: [{ en: 'the far end' }, { en: 'sound' }, { en: 'garden' }], answer: 0 },
      { kind: 'choose', prompt: "'अद्भुत' means…", options: [{ en: 'amazing' }, { en: 'narrow' }, { en: 'dry' }], answer: 0 },
      { kind: 'choose', prompt: "'चकित' means…", options: [{ en: 'surprised' }, { en: 'happy' }, { en: 'wet' }], answer: 0 },
      { kind: 'choose', prompt: 'Opposite of जीवन?', options: [{ hi: 'मृत्यु' }, { hi: 'गीला' }, { hi: 'पीछे' }], answer: 0 },
      { kind: 'choose', prompt: 'Opposite of सूखा?', options: [{ hi: 'गीला' }, { hi: 'तंग' }, { hi: 'रोना' }], answer: 0 },
      { kind: 'choose', prompt: 'Opposite of हँसना?', options: [{ hi: 'रोना' }, { hi: 'सामने' }, { hi: 'चौड़ा' }], answer: 0 },
      { kind: 'choose', prompt: "'आँख' का पर्यायवाची?", options: [{ hi: 'नेत्र' }, { hi: 'जगत' }, { hi: 'बाग' }], answer: 0 },
      { kind: 'choose', prompt: 'नभ और गगन means…', options: [{ en: 'sky' }, { en: 'world' }, { en: 'eye' }], answer: 0 },
      { kind: 'choose', prompt: 'घोंघा बाहर क्यों जाना चाहता था?', options: [{ hi: 'दुनिया देखने के लिए' }, { hi: 'खाने के लिए' }, { hi: 'सोने के लिए' }], answer: 0 },
      { kind: 'choose', prompt: "A snail’s age is known from…", options: [{ en: 'rings on its shell' }, { en: 'its tail' }, { en: 'its colour' }], answer: 0 },
      { kind: 'choose', prompt: 'संज्ञा किसे कहते हैं?', options: [{ en: 'the name of a person/thing/animal/place' }, { en: 'an action' }, { en: 'a colour' }], answer: 0 },
      { kind: 'choose', prompt: "'किताब' किस प्रकार की संज्ञा?", options: [{ hi: 'वस्तु' }, { hi: 'व्यक्ति' }, { hi: 'स्थान' }], answer: 0 },
      { kind: 'choose', prompt: "'भारत' कौन-सी संज्ञा है?", options: [{ hi: 'व्यक्तिवाचक' }, { hi: 'जातिवाचक' }], answer: 0 },
      { kind: 'choose', prompt: "'पेड़' कौन-सी संज्ञा है?", options: [{ hi: 'जातिवाचक' }, { hi: 'व्यक्तिवाचक' }], answer: 0 },
      { kind: 'fill', prompt: 'जंगल का राजा ____ है।', bank: [{ hi: 'शेर' }, { hi: 'तितली' }, { hi: 'घर' }], answer: 'शेर' },
      { kind: 'fill', prompt: 'भारत की राजधानी ____ है।', bank: [{ hi: 'दिल्ली' }, { hi: 'आगरा' }, { hi: 'मुंबई' }], answer: 'दिल्ली' },
    ]
  };

  window.PT_HINDI1 = {
    id: 'pt-hindi1',
    chapter: 'पाठ · बगीचे का घोंघा + व्याकरण · संज्ञा',
    title: 'बगीचे का घोंघा + संज्ञा',
    titleEn: 'Hindi Periodic Test 1',
    theme: { primary: '#15803D', light: '#86EFAC', accent: '#CA8A04' },
    storyHref: 'chapters/hin02-bageeche-ka-ghongha.html',
    missions: [m1, m2, m3, m4, m5, m6, m7, m8],
    practice: practice,
  };
})();
