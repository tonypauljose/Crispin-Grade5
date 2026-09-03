/* HALF-YEARLY HQ - English: Tenses
   Source: Asian School English Work Book, pp. 26-41 + 43-45 (photographed, 19 pages).
   Extraction file: .tmp/hy-extract/eng-tense-workbook.md
   Covers: simple present / past / future, present + past continuous, subject-verb
   agreement, the -ing spelling rules, identifying the tense, tense in writing,
   apostrophes and its vs it is, and the p.41 Ravi comprehension.
   Pages 37-41 were never attempted in the book, so those skills carry weight 5. */

window.HY_TOPICS = (window.HY_TOPICS || []).concat([{
  id: "eng-tenses",
  subject: "english",
  name: "Tenses",
  emoji: "⏳",
  blurb: "Present, past and future - simple and continuous. Getting the verb to match both the subject and the time.",
  source: "English Work Book, pp. 26-41 and 43-45 (pp. 37-41 never attempted)",
  examWeight: 35
}]);

window.HY_SKILLS = (window.HY_SKILLS || []).concat([

/* ---------------------------------------------------------------- 1 */
{
  id: "eng-tenses.simple-present",
  subject: "english",
  topic: "eng-tenses",
  name: "Simple present tense",
  canDo: "I can put a verb in the simple present tense, adding -s or -es only when the subject is one person or one thing.",
  weight: 5,
  difficulty: 1,
  prereq: [],
  teach: {
    hook: "Things that are always true and things you do every week both live in the simple present. The sun rises. You play football on Fridays.",
    explain: "<p>The work book rule: <strong>the simple present tense is used to talk about things that happen regularly or are permanent.</strong></p><p>Verbs have different forms called tenses, and the tense of a verb tells you the <em>time</em> at which the action takes place. Simple present means now, always, every day.</p><p>The tricky part is the ending. If the subject is <strong>one</strong> person or <strong>one</strong> thing (he, she, it, Emma, my watch) the verb takes <strong>-s</strong> or <strong>-es</strong>. For <strong>I, we, you, they</strong> and for any plural subject, the verb stays plain.</p>",
    worked: [
      {
        q: "My watch ______ correct time. (keep)",
        steps: [
          "Find the subject: <strong>my watch</strong>.",
          "One watch, so it belongs to the he / she / it group.",
          "That group adds <strong>-s</strong>, so keep becomes keeps."
        ],
        a: "My watch keeps correct time."
      },
      {
        q: "These students ______ very hard. (work)",
        steps: [
          "Subject: <strong>these students</strong>, which is more than one.",
          "Plural subjects take the plain verb, with no -s.",
          "So the verb stays <strong>work</strong>."
        ],
        a: "These students work very hard."
      },
      {
        q: "The babies cry at night. (She)",
        steps: [
          "The new subject <strong>she</strong> is one person, so the verb needs the -s ending.",
          "cry ends in a consonant plus y, so the y changes to i and you add <strong>-es</strong>.",
          "cry becomes <strong>cries</strong>."
        ],
        a: "She cries at night."
      }
    ],
    remember: [
      "One person or one thing = verb + s.",
      "More than one = plain verb, no s.",
      "I and you never take -s: I play, you play.",
      "Ends in -ch, -sh, -ss, -x or -o? Add -es: watches, brushes, goes.",
      "Consonant + y? The y becomes ies: carry to carries, cry to cries."
    ],
    watchOut: "Two names joined by <strong>and</strong> make a plural subject. It is Mino and Vijay <strong>play</strong> badminton, never plays."
  },
  items: [
    { id: "eng-tenses.simple-present.i01", type: "fill", q: "Emma ______ smart in her school uniform. <em>(look)</em>", accept: ["looks"], placeholder: "one word", level: 1, hint: "Emma is one person.", explain: "Emma is one person, so the verb takes -s: looks." },
    { id: "eng-tenses.simple-present.i02", type: "mcq", q: "Mino and Vijay ______ badminton together. <em>(play)</em>", options: ["plays", "play", "playing", "is playing"], answer: 1, level: 2, hint: "Count the people first.", explain: "Mino AND Vijay is two people, so the subject is plural and the verb stays plain: play. You wrote plays here in the work book and it was never corrected." },
    { id: "eng-tenses.simple-present.i03", type: "fill", q: "My watch ______ correct time. <em>(keep)</em>", accept: ["keeps"], level: 1, explain: "One watch, so keep takes -s: keeps." },
    { id: "eng-tenses.simple-present.i04", type: "fill", q: "These students ______ very hard. <em>(work)</em>", accept: ["work"], level: 1, hint: "How many students?", explain: "Students is plural, so the verb has no -s: work." },
    { id: "eng-tenses.simple-present.i05", type: "fill", q: "The rainwater ______ the rivers and ponds. <em>(fill)</em>", accept: ["fills"], level: 1, explain: "Rainwater is one thing, so fill takes -s: fills. The two things it fills do not change the verb." },
    { id: "eng-tenses.simple-present.i06", type: "tap", q: "Tap the one word that is wrong.", tokens: [{ t: "Players" }, { t: "makes", ok: true }, { t: "much" }, { t: "money." }], level: 2, hint: "Look at the subject first.", explain: "Players is plural, so it should be make, not makes." },
    { id: "eng-tenses.simple-present.i07", type: "tf", q: "This sentence is correct: <strong>The sun rise in the east.</strong>", answer: false, level: 1, explain: "The sun is one thing, so it must be <strong>rises</strong>. The work book prints it as: The sun rises in the east." },
    { id: "eng-tenses.simple-present.i08", type: "bucket", q: "Sort each subject by what its verb needs.", buckets: ["Verb takes -s", "Plain verb"], chips: [{ t: "The train", b: "Verb takes -s" }, { t: "Players", b: "Plain verb" }, { t: "Mother", b: "Verb takes -s" }, { t: "These students", b: "Plain verb" }, { t: "Shobna", b: "Verb takes -s" }, { t: "Mino and Vijay", b: "Plain verb" }, { t: "He", b: "Verb takes -s" }, { t: "We", b: "Plain verb" }], level: 2, explain: "Only single people and single things take the -s. Any subject you could swap for they takes the plain verb." },
    { id: "eng-tenses.simple-present.i09", type: "fillMulti", q: "Write the <strong>he / she / it</strong> form of each verb.", blanks: [{ label: "go", accept: ["goes"] }, { label: "watch", accept: ["watches"] }, { label: "carry", accept: ["carries"] }, { label: "keep", accept: ["keeps"] }], level: 2, hint: "-ch and -o take -es. Consonant plus y takes -ies.", explain: "goes and watches take -es; carry ends in consonant plus y so it becomes carries; keep just adds -s." },
    { id: "eng-tenses.simple-present.i10", type: "mcq", q: "Rahul writes: <strong>The boys calls me funny names.</strong> What is wrong?", options: ["Nothing, it is correct", "The boys is plural, so it should be call", "It should be The boys called", "It should be The boy calls"], answer: 1, level: 2, explain: "The boys is plural, so the verb drops the -s: The boys call me funny names." },
    { id: "eng-tenses.simple-present.i11", type: "fill", q: "Shobna ______ important points. <em>(ignore)</em>", accept: ["ignores"], level: 1, explain: "Shobna is one person: ignores." },
    { id: "eng-tenses.simple-present.i12", type: "fill", q: "He makes fewer mistakes. He ______ very attentively. <em>(write)</em>", accept: ["writes"], level: 2, explain: "He is one person, so write takes -s: writes." },
    { id: "eng-tenses.simple-present.i13", type: "order", q: "Build the work book example sentence.", answer: ["The", "sun", "rises", "in", "the", "east."], level: 1, explain: "The sun rises in the east. It is a permanent truth, so simple present, with -s on rises." },
    { id: "eng-tenses.simple-present.i14", type: "mcq", q: "Which sentence is written correctly?", options: ["The train run between Delhi and Mumbai.", "The train runs between Delhi and Mumbai.", "The train running between Delhi and Mumbai.", "The train are run between Delhi and Mumbai."], answer: 1, level: 3, explain: "One train, so runs. Running on its own is never a complete verb: it needs is or was in front of it." },
    { id: "eng-tenses.simple-present.i15", type: "fillMulti", q: "Complete the work book definition: the simple present tense is used to talk about things that happen ______ or are ______.", blanks: [{ label: "first blank", accept: ["regularly"] }, { label: "second blank", accept: ["permanent"] }], level: 3, hint: "One word means again and again. One means it does not change.", explain: "The book's exact wording is things that happen <strong>regularly</strong> or are <strong>permanent</strong>. Learn it in those words." },
    { id: "eng-tenses.simple-present.i16", type: "fill", q: "Mother ______ herbs in the garden. <em>(grow)</em>", accept: ["grows"], level: 1, explain: "Mother is one person: grows." }
  ]
},

/* ---------------------------------------------------------------- 2 */
{
  id: "eng-tenses.subject-agreement",
  subject: "english",
  topic: "eng-tenses",
  name: "Change the subject, fix the verb",
  canDo: "I can rewrite a sentence with a new subject and change the verb so that it agrees with that new subject.",
  weight: 5,
  difficulty: 2,
  prereq: ["eng-tenses.simple-present"],
  teach: {
    hook: "Swap the subject and the verb has to follow. This is the rule that cost you marks twice in the work book, so it is worth ten minutes.",
    explain: "<p>The work book gives you a sentence and a new subject in brackets. You rewrite the whole sentence with the new subject and change the verb to match it. Everything else stays exactly the same.</p><p><strong>He, she, it</strong> and single names take verb + s or + es.<br><strong>I, we, you, they</strong> and all plurals take the plain verb.</p><p>Copy the rest of the sentence word for word, and put the full stop back at the end.</p>",
    worked: [
      {
        q: "Tanmay carries the water bottle in a bag. (We)",
        steps: [
          "The new subject is <strong>We</strong>.",
          "We is more than one person, so the verb must be plain.",
          "carries goes back to <strong>carry</strong>: the -ies comes off and the y returns.",
          "Copy the rest of the sentence and keep the full stop."
        ],
        a: "We carry the water bottle in a bag."
      },
      {
        q: "You are an intelligent boy. (He)",
        steps: [
          "New subject <strong>He</strong>.",
          "The verb is <em>are</em>. With he, the verb be becomes <strong>is</strong>.",
          "Keep <em>an intelligent</em> as two separate words, and end with a full stop."
        ],
        a: "He is an intelligent boy."
      }
    ],
    remember: [
      "I, we, you, they take the plain verb.",
      "He, she, it take verb + s.",
      "carry becomes carries, and carries goes back to carry.",
      "I am, you are, he is, we are, they are.",
      "Full stop at the end of every rewritten sentence."
    ],
    watchOut: "You wrote <em>We carries the water bottle</em> and the teacher circled it in red. <strong>We</strong> never takes an -s verb."
  },
  items: [
    { id: "eng-tenses.subject-agreement.i01", type: "mcq", q: "Rewrite: <strong>Tanmay carries the water bottle in a bag.</strong> (We)", options: ["We carries the water bottle in a bag.", "We carry the water bottle in a bag.", "We carrys the water bottle in a bag.", "We carrying the water bottle in a bag."], answer: 1, level: 2, hint: "Would you ever say we carries?", explain: "We takes the plain verb, so carries becomes carry. This is the exact item the teacher corrected in red in your book." },
    { id: "eng-tenses.subject-agreement.i02", type: "fill", q: "Rewrite with the new subject: <strong>Monika reaches school on time.</strong> (They)", accept: ["They reach school on time"], level: 1, explain: "They is plural, so reaches becomes reach." },
    { id: "eng-tenses.subject-agreement.i03", type: "fill", q: "Rewrite with the new subject: <strong>Tania and Tanu talk in the class.</strong> (He)", accept: ["He talks in the class"], level: 2, explain: "He is one person, so talk becomes talks." },
    { id: "eng-tenses.subject-agreement.i04", type: "fill", q: "Rewrite with the new subject: <strong>The students stand in a queue.</strong> (Sonia and Surya)", accept: ["Sonia and Surya stand in a queue"], level: 2, hint: "Two names joined by and.", explain: "Sonia and Surya is two people, so the verb stays plain: stand." },
    { id: "eng-tenses.subject-agreement.i05", type: "fill", q: "Rewrite with the new subject: <strong>They sing very well.</strong> (Ravi)", accept: ["Ravi sings very well"], level: 1, explain: "Ravi is one person: sings." },
    { id: "eng-tenses.subject-agreement.i06", type: "fill", q: "Rewrite with the new subject: <strong>We read stories every day.</strong> (Meena)", accept: ["Meena reads stories every day"], level: 1, explain: "Meena is one person: reads." },
    { id: "eng-tenses.subject-agreement.i07", type: "fill", q: "Rewrite with the new subject: <strong>Little Tara loves to play with cats.</strong> (I)", accept: ["I love to play with cats"], level: 2, hint: "Two things to watch: the verb, and the s on cats.", explain: "I takes the plain verb love. Keep <strong>cats</strong> plural, because the teacher marked that missing s in your book." },
    { id: "eng-tenses.subject-agreement.i08", type: "mcq", q: "Rewrite: <strong>You are an intelligent boy.</strong> (He)", options: ["He are an intelligent boy.", "He is an intelligent boy.", "He is anintelligent boy.", "He am an intelligent boy."], answer: 1, level: 2, explain: "With he, the verb be becomes is. Also <em>an intelligent</em> is two words: in your book they were joined and the teacher slashed them apart." },
    { id: "eng-tenses.subject-agreement.i09", type: "tf", q: "This rewrite is correct: <strong>The robbers hides themselves in the darkness.</strong>", answer: false, level: 2, explain: "The robbers is plural, so it is hide, not hides." },
    { id: "eng-tenses.subject-agreement.i10", type: "bucket", q: "Which verb form does each subject need?", buckets: ["works", "work"], chips: [{ t: "I", b: "work" }, { t: "She", b: "works" }, { t: "The boys", b: "work" }, { t: "My father", b: "works" }, { t: "We", b: "work" }, { t: "It", b: "works" }, { t: "Sonia and Surya", b: "work" }, { t: "You", b: "work" }], level: 2, explain: "You is the odd one out. It looks singular but it always takes the plain verb: you work." },
    { id: "eng-tenses.subject-agreement.i11", type: "fill", q: "Rewrite with the new subject: <strong>The boy calls me funny names.</strong> (The boys)", accept: ["The boys call me funny names"], level: 2, explain: "The s moves from the verb to the subject: the boys call." },
    { id: "eng-tenses.subject-agreement.i12", type: "tap", q: "Tap the word that has to change: <strong>We carries the water bottle in a bag.</strong>", tokens: [{ t: "We" }, { t: "carries", ok: true }, { t: "the" }, { t: "water" }, { t: "bottle" }, { t: "in" }, { t: "a" }, { t: "bag." }], level: 2, explain: "carries must become carry, because the subject We is plural." },
    { id: "eng-tenses.subject-agreement.i13", type: "fillMulti", q: "Complete the simple present forms of <strong>carry</strong>.", blanks: [{ label: "I ______", accept: ["carry"] }, { label: "She ______", accept: ["carries"] }, { label: "They ______", accept: ["carry"] }, { label: "The porter ______", accept: ["carries"] }], level: 2, explain: "Only he, she, it and single names get carries. Everything else is carry." },
    { id: "eng-tenses.subject-agreement.i14", type: "steps", q: "Rewrite step by step: <strong>The babies cry at night.</strong> (She)", parts: [{ q: "What is the new subject?", accept: ["she"] }, { q: "Is it one, or more than one? Type one or more.", accept: ["one", "1", "singular"] }, { q: "So what does the verb cry become?", accept: ["cries"] }, { q: "Write the full sentence.", accept: ["She cries at night"] }], level: 3, explain: "She is one person, and cry ends in consonant plus y, so it becomes cries: She cries at night." },
    { id: "eng-tenses.subject-agreement.i15", type: "mcq", q: "Which rewrite is completely correct?", options: ["He talks in the class", "He talk in the class.", "He talks in the class.", "He is talks in the class."], answer: 2, level: 3, hint: "Look at the very end of each one.", explain: "The verb needs the -s and the sentence needs a full stop. Four answers on page 27 of your book lost their full stops." }
  ]
},

/* ---------------------------------------------------------------- 3 */
{
  id: "eng-tenses.simple-past",
  subject: "english",
  topic: "eng-tenses",
  name: "Simple past tense",
  canDo: "I can write the simple past form of a verb, including the irregular ones, and spell it correctly.",
  weight: 5,
  difficulty: 2,
  prereq: [],
  teach: {
    hook: "Anything that is finished and over goes into the simple past. The match ended. India won.",
    explain: "<p>The work book rule: <strong>the simple past tense is used to talk about actions that happened in the past.</strong></p><p>Most verbs just take <strong>-ed</strong>: walk becomes walked. But the spelling shifts in three cases, and about thirty common verbs change shape completely.</p><p>The subject makes no difference at all in the simple past. I walked, she walked, they walked. That is one thing less to worry about.</p>",
    worked: [
      {
        q: "I ______ the stars through the telescope. (study)",
        steps: [
          "study ends in a consonant plus <strong>y</strong>.",
          "So the y changes to i before -ed.",
          "study becomes <strong>studied</strong>."
        ],
        a: "I studied the stars through the telescope."
      },
      {
        q: "Jessi ______ a scarf for her mother. (knit)",
        steps: [
          "knit is one syllable and ends in consonant - vowel - consonant (n-i-t).",
          "That pattern doubles the last letter before -ed.",
          "knit becomes <strong>knitted</strong>, not knited."
        ],
        a: "Jessi knitted a scarf for her mother."
      },
      {
        q: "Aryan and Aditya ______ kites in the open field. (fly)",
        steps: [
          "fly does not take -ed at all. It is an irregular verb.",
          "Its past form is a completely different word.",
          "fly becomes <strong>flew</strong>."
        ],
        a: "Aryan and Aditya flew kites in the open field."
      }
    ],
    remember: [
      "Most verbs: add -ed (walk, walked).",
      "Ends in e: add just -d (chase, chased; race, raced).",
      "Consonant + y: y becomes ied (study, studied; try, tried).",
      "Short verb, one vowel, one last consonant: double it (wag, wagged; knit, knitted).",
      "Irregulars must be learnt by heart: buy-bought, win-won, know-knew, fly-flew, bite-bit, wear-wore, hit-hit."
    ],
    watchOut: "A few verbs do not change at all: hit stays hit, cut stays cut, put stays put. Never write hitted or cutted."
  },
  items: [
    { id: "eng-tenses.simple-past.i01", type: "fill", q: "Vivek ______ the kitten in his arms. <em>(hold)</em>", accept: ["held"], level: 1, explain: "hold is irregular: hold, held." },
    { id: "eng-tenses.simple-past.i02", type: "fill", q: "I ______ the stars through the telescope. <em>(study)</em>", accept: ["studied"], level: 2, hint: "Look at the last two letters of study.", explain: "Consonant plus y, so the y becomes i: studied." },
    { id: "eng-tenses.simple-past.i03", type: "mcq", q: "Jessi ______ a scarf for her mother. <em>(knit)</em>", options: ["knited", "knitted", "knits", "knitting"], answer: 1, level: 2, explain: "knit is a short consonant-vowel-consonant verb, so the t doubles: knitted." },
    { id: "eng-tenses.simple-past.i04", type: "fill", q: "The mother ______ the baby at night. <em>(feed)</em>", accept: ["fed"], level: 1, explain: "feed is irregular: feed, fed. Not feeded." },
    { id: "eng-tenses.simple-past.i05", type: "match", q: "Match each verb to its simple past form.", pairs: [{ l: "buy", r: "bought" }, { l: "win", r: "won" }, { l: "know", r: "knew" }, { l: "bite", r: "bit" }, { l: "wear", r: "wore" }], level: 2, explain: "These five are irregular. There is no rule, only practice: bought, won, knew, bit, wore." },
    { id: "eng-tenses.simple-past.i06", type: "bucket", q: "Which spelling rule does each verb follow when it goes into the past?", buckets: ["Just add -ed", "Drop the e, add -ed", "Double the last letter"], chips: [{ t: "walk", b: "Just add -ed" }, { t: "fill", b: "Just add -ed" }, { t: "pour", b: "Just add -ed" }, { t: "chase", b: "Drop the e, add -ed" }, { t: "race", b: "Drop the e, add -ed" }, { t: "smile", b: "Drop the e, add -ed" }, { t: "wag", b: "Double the last letter" }, { t: "knit", b: "Double the last letter" }], level: 2, explain: "walked, filled, poured; chased, raced, smiled; wagged, knitted. The word-search page of your book was full of the middle group: cared, liked, waved, traced." },
    { id: "eng-tenses.simple-past.i07", type: "fill", q: "The fox ______ in vain to reach the bunch of grapes. <em>(try)</em>", accept: ["tried"], level: 2, explain: "try ends in consonant plus y, so it becomes tried." },
    { id: "eng-tenses.simple-past.i08", type: "order", q: "Build the work book example sentence.", answer: ["The", "plane", "landed", "ten", "minutes", "ago."], level: 1, explain: "The plane landed ten minutes ago. The words ten minutes ago are your clue that it must be simple past." },
    { id: "eng-tenses.simple-past.i09", type: "mcq", q: "She ______ a diamond ring. <em>(wear)</em>", options: ["weared", "wore", "worn", "wearing"], answer: 1, level: 2, hint: "Worn needs a helper word like has in front of it.", explain: "The simple past of wear is wore. Worn is a different form that needs has or had with it." },
    { id: "eng-tenses.simple-past.i10", type: "tf", q: "This is correct: <strong>A storm hitted a small town.</strong>", answer: false, level: 2, explain: "hit never changes. A storm hit a small town." },
    { id: "eng-tenses.simple-past.i11", type: "fill", q: "A cold wind ______ at night. <em>(blow)</em>", accept: ["blew"], level: 2, hint: "Not blowed.", explain: "blow is irregular: blow, blew." },
    { id: "eng-tenses.simple-past.i12", type: "fillMulti", q: "Write the simple past of each verb.", blanks: [{ label: "sit", accept: ["sat"] }, { label: "ring", accept: ["rang"] }, { label: "catch", accept: ["caught"] }, { label: "steal", accept: ["stole"] }], level: 2, explain: "sat, rang, caught, stole. All four appeared on page 29 of your work book." },
    { id: "eng-tenses.simple-past.i13", type: "tap", q: "Tap every verb that is in the simple past tense.", tokens: [{ t: "Yesterday" }, { t: "the" }, { t: "police" }, { t: "caught", ok: true }, { t: "the" }, { t: "thief" }, { t: "who" }, { t: "stole", ok: true }, { t: "the" }, { t: "jewellery." }], level: 2, explain: "caught and stole are both finished actions, so both are simple past. Yesterday is a time word, not a verb." },
    { id: "eng-tenses.simple-past.i14", type: "fill", q: "The stars ______ brightly yesterday. <em>(shine)</em>", accept: ["shone"], level: 3, hint: "Rhymes with bone.", explain: "shine is irregular: shine, shone. This is from page 40 of your book, which was never filled in." },
    { id: "eng-tenses.simple-past.i15", type: "mcq", q: "Rahul says the past tense of <strong>know</strong> is <strong>knowed</strong>. Is he right?", options: ["Yes, know is a regular verb", "No, it is knew", "No, it is known", "No, it is knowned"], answer: 1, level: 3, explain: "know is irregular. The simple past is knew. Known is the form that goes with has or had." },
    { id: "eng-tenses.simple-past.i16", type: "fill", q: "Complete the work book definition: the simple past tense is used to talk about actions that happened in the ______.", accept: ["past"], level: 3, explain: "In the <strong>past</strong>. Those three words were printed with an underline in your book, which usually means the teacher wants them back word for word." },
    { id: "eng-tenses.simple-past.i17", type: "fill", q: "Rewrite in the simple past: <strong>The children sit quietly in the classroom.</strong>", accept: ["The children sat quietly in the classroom"], level: 2, explain: "sit becomes sat. Nothing else in the sentence changes." }
  ]
},

/* ---------------------------------------------------------------- 4 */
{
  id: "eng-tenses.simple-future",
  subject: "english",
  topic: "eng-tenses",
  name: "Simple future tense",
  canDo: "I can form the simple future with will or shall followed by the plain form of the verb.",
  weight: 4,
  difficulty: 2,
  prereq: [],
  teach: {
    hook: "Everything that has not happened yet needs the same two-word engine: will or shall, plus the plain verb.",
    explain: "<p>The work book rule: <strong>we use the simple future tense to talk about things that have not happened yet.</strong></p><p>The pattern never changes: <strong>will</strong> or <strong>shall</strong> + the <strong>plain</strong> verb. Your book uses both will and shall, so either one is accepted.</p><p>The word after will or shall is the dictionary form of the verb. It takes no -s, no -ed and no -ing. Not will goes, not will went, not will going. Just <em>will go</em>.</p>",
    worked: [
      {
        q: "Kirti and Sudha ______ the party on Sunday. (organise)",
        steps: [
          "The party is on Sunday, so it has not happened yet: simple future.",
          "Start with will or shall.",
          "Then the plain verb, exactly as it appears in the brackets: <strong>organise</strong>.",
          "So it is will organise or shall organise. Never shall organising."
        ],
        a: "Kirti and Sudha will organise the party on Sunday."
      },
      {
        q: "I visited Rajasthan during the holidays. (change to simple future)",
        steps: [
          "Find the verb: <strong>visited</strong>.",
          "Put it back into its plain form: visit.",
          "Put will or shall in front of it.",
          "Copy the rest of the sentence, and check the spelling of Rajasthan."
        ],
        a: "I will visit Rajasthan during the holidays."
      }
    ],
    remember: [
      "will or shall + plain verb. Always two words.",
      "Never add -s, -ed or -ing after will or shall.",
      "Your book treats will and shall as equally correct.",
      "Clue words for the future: tomorrow, next week, next month, this afternoon, on Sunday."
    ],
    watchOut: "You wrote <em>shall organing</em> in the work book. The auxiliary shall was fine. The verb after it must be the plain word: shall <strong>organise</strong>."
  },
  items: [
    { id: "eng-tenses.simple-future.i01", type: "fill", q: "The porters ______ the luggage. <em>(carry)</em>", accept: ["will carry", "shall carry"], placeholder: "two words", level: 1, explain: "will or shall plus the plain verb carry. Not will carries." },
    { id: "eng-tenses.simple-future.i02", type: "mcq", q: "Kirti and Sudha ______ the party on Sunday. <em>(organise)</em>", options: ["will organise", "shall organising", "will organises", "shall organised"], answer: 0, level: 2, hint: "What form is the verb in the brackets?", explain: "will or shall is followed by the plain verb: will organise. In your book this answer came out as shall organing and picked up a red mark." },
    { id: "eng-tenses.simple-future.i03", type: "fill", q: "Rohan ______ his new project next week. <em>(start)</em>", accept: ["will start", "shall start"], level: 1, explain: "Next week means it has not happened yet: will start." },
    { id: "eng-tenses.simple-future.i04", type: "tf", q: "This is correct: <strong>Kirti and Sudha shall organising the party.</strong>", answer: false, level: 2, explain: "After shall you need the plain verb, so it is shall organise. Organising can only follow is, am, are, was or were." },
    { id: "eng-tenses.simple-future.i05", type: "fill", q: "The sky is very cloudy. It ______ . <em>(rain)</em>", accept: ["will rain", "shall rain"], level: 1, explain: "will rain. The cloudy sky is the clue that this has not happened yet." },
    { id: "eng-tenses.simple-future.i06", type: "fill", q: "My nephew ______ nine next week. <em>(turn)</em>", accept: ["will turn", "shall turn"], level: 1, explain: "will turn. Next week points to the future." },
    { id: "eng-tenses.simple-future.i07", type: "mcq", q: "Which is the correct simple future of <strong>win</strong>?", options: ["will win", "will won", "will winning", "wills win"], answer: 0, level: 2, explain: "will win. The verb after will never changes its shape." },
    { id: "eng-tenses.simple-future.i08", type: "tap", q: "Tap the two words that make the future tense.", tokens: [{ t: "We" }, { t: "shall", ok: true }, { t: "stay", ok: true }, { t: "in" }, { t: "Shimla" }, { t: "till" }, { t: "Friday." }], level: 2, explain: "shall stay is the future verb. The book prints this example on page 30." },
    { id: "eng-tenses.simple-future.i09", type: "bucket", q: "Sort these into correct and wrong future forms.", buckets: ["Correct", "Wrong"], chips: [{ t: "will go", b: "Correct" }, { t: "shall moved", b: "Wrong" }, { t: "will sings", b: "Wrong" }, { t: "shall choose", b: "Correct" }, { t: "will carry", b: "Correct" }, { t: "will organising", b: "Wrong" }, { t: "shall stay", b: "Correct" }, { t: "will turns", b: "Wrong" }], level: 2, explain: "Everything in the Wrong box has an extra ending on the second word. The verb after will or shall stays plain." },
    { id: "eng-tenses.simple-future.i10", type: "fill", q: "Rewrite in the simple future tense: <strong>I visited Rajasthan during the holidays.</strong>", accept: ["I will visit Rajasthan during the holidays", "I shall visit Rajasthan during the holidays"], level: 2, hint: "Check the spelling of Rajasthan: R-a-j-a-s-t-h-a-n.", explain: "I will visit Rajasthan during the holidays. You spelt it Rajastan in the book, so it is worth a second look: Rajas-than." },
    { id: "eng-tenses.simple-future.i11", type: "fill", q: "Rewrite in the simple future tense: <strong>I completed my homework.</strong>", accept: ["I will complete my homework", "I shall complete my homework"], level: 2, explain: "completed goes back to complete, with will or shall in front." },
    { id: "eng-tenses.simple-future.i12", type: "order", q: "Build the work book example sentence.", answer: ["Bob", "will", "go", "to", "the", "park", "in", "the", "evening."], level: 1, explain: "Bob will go to the park in the evening. will comes first, then the plain verb go." },
    { id: "eng-tenses.simple-future.i13", type: "fillMulti", q: "Fill each blank with the simple future form.", blanks: [{ label: "They ______ a new government. (choose)", accept: ["will choose", "shall choose"] }, { label: "They ______ into their new house next month. (move)", accept: ["will move", "shall move"] }, { label: "The hunter ______ the tiger. (shoot)", accept: ["will shoot", "shall shoot"] }], level: 2, explain: "will or shall plus choose, move, shoot. Never chose, moved or shot here, because none of it has happened yet." },
    { id: "eng-tenses.simple-future.i14", type: "mcq", q: "We use the simple future tense to talk about things that ______.", options: ["happen regularly", "have not happened yet", "happened in the past", "are happening as we speak"], answer: 1, level: 3, explain: "That is the book's exact wording: things that have not happened yet. The other three options are the definitions of the other tenses, so read them again." },
    { id: "eng-tenses.simple-future.i15", type: "steps", q: "Build the future sentence step by step: <strong>Kirti and Sudha / organise the party on Sunday.</strong>", parts: [{ q: "Write the auxiliary you will use (will or shall).", accept: ["will", "shall"] }, { q: "Write the verb exactly as it must appear after it.", accept: ["organise", "organize"] }, { q: "Now write the whole sentence.", accept: ["Kirti and Sudha will organise the party on Sunday", "Kirti and Sudha shall organise the party on Sunday", "Kirti and Sudha will organize the party on Sunday", "Kirti and Sudha shall organize the party on Sunday"] }], level: 3, explain: "Auxiliary plus plain verb: Kirti and Sudha will organise the party on Sunday." },
    { id: "eng-tenses.simple-future.i16", type: "mcq", q: "Which sentence is in the simple future tense?", options: ["Mahi goes to the market this afternoon.", "Mahi is going to the market.", "Mahi will go to the market this afternoon.", "Mahi went to the market this afternoon."], answer: 2, level: 3, explain: "Only will go is the simple future. Is going is present continuous, and went is simple past." }
  ]
}
]);
