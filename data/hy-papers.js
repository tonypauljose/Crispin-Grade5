/* ============================================================
   HALF-YEARLY HQ — mock papers

   Each paper is a BLUEPRINT, not a fixed set of questions: the
   sections say which skills and question types to draw from, and
   a fresh paper is assembled every time he sits it. So he can
   take the same paper four times in the last week and never meet
   the identical question set twice.

   Marks and timings follow the usual CBSE Grade-5 half-yearly
   shape for Gulf schools (40 marks, 90 minutes for a language
   paper). Confirm against the school's own timetable when it is
   published and adjust `marks` / `minutes` here if they differ.
   ============================================================ */
window.HY_PAPERS = (window.HY_PAPERS || []).concat([

  {
    id: 'paper-maths-full', name: 'Mathematics — Full Mock', subject: 'maths', emoji: '🧮',
    blurb: 'Geometry plus Multiples and Factors, in exam proportions.',
    minutes: 60, marks: 40,
    sections: [
      { name: 'A · Choose the correct answer', instructions: 'Tick one option only.', marksEach: 1, count: 8,
        pick: { subject: 'maths', types: ['mcq', 'tf'] } },
      { name: 'B · Fill in the blanks', instructions: 'Write the answer in the space.', marksEach: 1, count: 8,
        pick: { subject: 'maths', types: ['fill'] } },
      { name: 'C · Sort and match', instructions: 'Work carefully — no marks for half-finished sorting.', marksEach: 2, count: 3,
        pick: { subject: 'maths', types: ['bucket', 'match', 'order', 'multi'] } },
      { name: 'D · Show your working', instructions: 'Every line of working carries a mark. Do not skip the substitution line.', marksEach: 3, count: 4,
        pick: { subject: 'maths', types: ['steps'], minLevel: 2 } },
      { name: 'E · Harder questions', instructions: 'Read each one twice before you start.', marksEach: 2, count: 3,
        pick: { subject: 'maths', minLevel: 3 } }
    ]
  },

  {
    id: 'paper-maths-mf', name: 'Maths — Multiples & Factors only', subject: 'maths', emoji: '🔢',
    blurb: 'The topic you had done no work on. Sit this one twice.',
    minutes: 45, marks: 33,
    sections: [
      { name: 'A · Quick answers', instructions: 'One mark each.', marksEach: 1, count: 8,
        pick: { topics: ['math-multiples-factors'], types: ['mcq', 'tf', 'fill'] } },
      { name: 'B · Prime factorisation, HCF and LCM', instructions: 'Show every step.', marksEach: 3, count: 4,
        pick: { topics: ['math-multiples-factors'], types: ['steps'] } },
      { name: 'C · Word problems', instructions: 'Decide first whether it needs the HCF or the LCM.', marksEach: 2, count: 4,
        pick: { skills: ['math-multiples-factors.hcf-or-lcm'] } },
      { name: 'D · The facts', instructions: 'These should be instant.', marksEach: 1, count: 5,
        pick: { skills: ['math-multiples-factors.key-facts'] } }
    ]
  },

  {
    id: 'paper-english-full', name: 'English — Full Mock', subject: 'english', emoji: '📖',
    blurb: 'Literature, grammar and writing, in exam proportions.',
    minutes: 60, marks: 40,
    sections: [
      { name: 'A · Grammar — choose the correct answer', instructions: 'Tick one option only.', marksEach: 1, count: 8,
        pick: { topics: ['eng-adjectives', 'eng-tenses'], types: ['mcq', 'tf'] } },
      { name: 'B · Grammar — fill in the blanks', instructions: 'Watch your spelling; it is marked.', marksEach: 1, count: 8,
        pick: { topics: ['eng-adjectives', 'eng-tenses'], types: ['fill', 'fillMulti'] } },
      { name: 'C · Find the word', instructions: 'Pick out the word the question asks for.', marksEach: 1, count: 4,
        pick: { topics: ['eng-adjectives', 'eng-tenses'], types: ['tap', 'bucket'] } },
      { name: 'D · The chapters', instructions: 'Gilli Danda and The Decision of the Panchayat.', marksEach: 1, count: 11,
        pick: { topics: ['eng-gilli-danda', 'eng-panchayat'], types: ['mcq', 'fill', 'match', 'tf'] } },
      { name: 'E · Answer in full sentences', instructions: 'Write in complete sentences. Marks are given for the ideas, not the length.', marksEach: 3, count: 3,
        pick: { topics: ['eng-gilli-danda', 'eng-panchayat'], types: ['shortAnswer'] } }
    ]
  },

  {
    id: 'paper-hindi-full', name: 'हिंदी — पूरा प्रश्नपत्र', subject: 'hindi', emoji: '🪔',
    blurb: 'पाठ, कविता और व्याकरण — पूरे पेपर जैसा।',
    minutes: 60, marks: 40,
    sections: [
      { name: 'क · सही उत्तर चुनो', instructions: 'एक ही विकल्प चुनो।', marksEach: 1, count: 10,
        pick: { subject: 'hindi', types: ['mcq', 'tf'] } },
      { name: 'ख · खाली जगह भरो', instructions: 'मात्रा का ध्यान रखो।', marksEach: 1, count: 10,
        pick: { subject: 'hindi', types: ['fill', 'fillMulti'] } },
      { name: 'ग · मिलान और छाँटना', instructions: 'शब्द और अर्थ ध्यान से मिलाओ।', marksEach: 2, count: 4,
        pick: { subject: 'hindi', types: ['match', 'bucket', 'order'] } },
      { name: 'घ · प्रश्नों के उत्तर लिखो', instructions: 'पूरे वाक्य में लिखो। "क्यों" के उत्तर में इसलिए … क्योंकि … का प्रयोग करो।', marksEach: 3, count: 4,
        pick: { subject: 'hindi', types: ['shortAnswer'] } }
    ]
  },

  {
    id: 'paper-weak-spots', name: 'Weak Spots Paper', subject: 'maths', emoji: '🩹',
    blurb: 'Built entirely from the mistakes marked in your own books. Short, and worth doing twice.',
    minutes: 25, marks: 22,
    sections: [
      { name: 'A · Spelling that costs marks', instructions: 'Maths and English words you have written wrongly before.', marksEach: 1, count: 6,
        pick: { skills: ['math-geometry.spelling', 'eng-adjectives.spelling'] } },
      { name: 'B · Its, their, and agreement', instructions: 'All of these were corrected in red in your workbook.', marksEach: 1, count: 5,
        pick: { skills: ['eng-adjectives.possessive', 'eng-tenses.subject-agreement'] } },
      { name: 'C · Showing the working', instructions: 'The substitution line is worth a mark on its own.', marksEach: 3, count: 2,
        pick: { skills: ['math-geometry.radius-diameter'], types: ['steps'] } },
      { name: 'D · मात्रा और वर्तनी', instructions: 'हिंदी की वे गलतियाँ जो कॉपी में लाल पेन से ठीक हुई थीं।', marksEach: 1, count: 5,
        pick: { skills: ['hin-neem.matra-drill'] } }
    ]
  }

]);
