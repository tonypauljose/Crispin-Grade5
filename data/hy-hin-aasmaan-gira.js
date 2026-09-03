/* HALF-YEARLY HQ — आसमान गिरा (पाठ ५)
   Source extraction: .tmp/hy-extract/hin-aasmaan-notebook.md
   (Crispin's Hindi class notebook, 5 handwritten pages, dated 12-5-26,
    teacher-signed 21/6/26 with the remark "Complete it".)

   Everything here traces back to those five pages: शब्दार्थ, विलोम, पर्यायवाची,
   the four प्रश्न-उत्तर, the जीवन मूल्य answer, वाक्य बनाओ, किसने किससे कहा,
   and the गतिविधि. The spelling / मात्रा drills are built directly from the
   teacher's red corrections. Where the notebook itself left an error
   uncorrected (नही for नहीं), this file teaches the correct form.
*/

window.HY_TOPICS = (window.HY_TOPICS || []).concat([{
  id: "hin-aasmaan-gira",
  subject: "hindi",
  name: "आसमान गिरा",
  emoji: "🐇",
  blurb: "पाठ ५ — शब्दार्थ, विलोम, पर्यायवाची, प्रश्न-उत्तर, शिक्षा, किसने किससे कहा, और वर्तनी की पक्की मरम्मत।",
  source: "Class notebook, 5 handwritten pages (12-5-26 to 21/6/26), teacher-marked in red",
  examWeight: 25
}]);

window.HY_SKILLS = (window.HY_SKILLS || []).concat([

/* ============================================================
   1. शब्दार्थ
   ============================================================ */
{
  id: "hin-aasmaan-gira.shabdarth",
  subject: "hindi",
  topic: "hin-aasmaan-gira",
  name: "शब्दार्थ लिखना",
  canDo: "I can give the Hindi meaning of चौंककर, ठहरो and डर exactly the way the notebook gives it.",
  weight: 4,
  difficulty: 1,
  prereq: [],
  teach: {
    hook: "Three words. That is the whole शब्दार्थ list for this पाठ, and every one of them is a free mark in the exam.",
    explain: "<p><strong>शब्दार्थ</strong> (shabdaarth) means <em>word-meaning</em>. The exam gives you a word from the lesson and you write its meaning <strong>in Hindi</strong>, not in English.</p><p>Your notebook gives exactly three pairs, written in the format <strong>शब्द – अर्थ</strong>:</p><ul><li><strong>चौंककर</strong> (chaunk-kar, startled) – <strong>डरकर</strong> (dar-kar, in fear)</li><li><strong>ठहरो</strong> (thahro, stop / wait) – <strong>रुको</strong> (ruko, stop)</li><li><strong>डर</strong> (dar, fear) – <strong>भय</strong> (bhay, fear)</li></ul><p>Write the dash. Write the meaning in Devanagari. That is the full answer.</p>",
    worked: [
      {
        q: "शब्दार्थ लिखिए — चौंककर",
        steps: [
          "The question wants the meaning of <strong>चौंककर</strong>, in Hindi.",
          "Picture the खरगोश (khargosh, rabbit) hearing धम्म and jumping up. He got up <em>in fear</em>.",
          "The notebook word for that is <strong>डरकर</strong>.",
          "Write it in the school format with a dash: चौंककर – डरकर"
        ],
        a: "चौंककर – डरकर"
      },
      {
        q: "शब्दार्थ लिखिए — डर",
        steps: [
          "<strong>डर</strong> is the noun, not the action.",
          "Its one-word Hindi meaning in the notebook is <strong>भय</strong>.",
          "Careful with the very first letter: it is <strong>ड</strong>, not इ. You once wrote इर and the teacher corrected it in red."
        ],
        a: "डर – भय"
      }
    ],
    remember: [
      "चौंककर = डरकर (both end in -कर, both are about fear).",
      "ठहरो = रुको (both are orders meaning STOP).",
      "डर = भय (one syllable of fear, one word of fear)."
    ],
    watchOut: "Do not answer in English. \"चौंककर – startled\" scores nothing. The answer must be the Hindi word from the notebook."
  },
  items: [
    { id: "hin-aasmaan-gira.shabdarth.i01", type: "match", level: 1,
      q: "शब्द को उसके अर्थ से मिलाइए।",
      pairs: [ { l: "चौंककर", r: "डरकर" }, { l: "ठहरो", r: "रुको" }, { l: "डर", r: "भय" } ],
      explain: "ये तीनों जोड़े कॉपी के शब्दार्थ वाले भाग से हैं।",
      hint: "दोनों शब्द जो -कर पर खत्म होते हैं, वे आपस में जोड़ी बनाते हैं।" },

    { id: "hin-aasmaan-gira.shabdarth.i02", type: "mcq", level: 1,
      q: "<strong>चौंककर</strong> का अर्थ क्या है?",
      options: ["डरकर", "हँसकर", "दौड़कर", "सोकर"],
      answer: 0,
      explain: "चौंककर – डरकर। खरगोश आवाज़ सुनकर डरकर उठा, हँसकर नहीं।",
      hint: "खरगोश धम्म की आवाज़ सुनकर कैसा महसूस कर रहा था?" },

    { id: "hin-aasmaan-gira.shabdarth.i03", type: "mcq", level: 1,
      q: "<strong>ठहरो</strong> का अर्थ क्या है?",
      options: ["रुको", "चलो", "भागो", "बैठो"],
      answer: 0,
      explain: "ठहरो – रुको। दोनों का मतलब है — आगे मत बढ़ो।",
      hint: "शेर ने दहाड़ा और सब जानवर क्या हो गए?" },

    { id: "hin-aasmaan-gira.shabdarth.i04", type: "mcq", level: 1,
      q: "<strong>डर</strong> का अर्थ क्या है?",
      options: ["भय", "खुशी", "नींद", "आवाज़"],
      answer: 0,
      explain: "डर – भय। दोनों एक ही भाव के नाम हैं।",
      hint: "भ से शुरू होने वाला शब्द।" },

    { id: "hin-aasmaan-gira.shabdarth.i05", type: "fill", level: 1,
      q: "शब्दार्थ पूरा कीजिए — डर – ______",
      accept: ["भय"],
      placeholder: "हिंदी में",
      explain: "डर – भय। यही कॉपी में लिखा है।",
      hint: "दो अक्षर का शब्द, भ से शुरू।" },

    { id: "hin-aasmaan-gira.shabdarth.i06", type: "fill", level: 2,
      q: "उल्टा सवाल — पाठ के किस शब्द का अर्थ <strong>भय</strong> है?",
      accept: ["डर"],
      placeholder: "पाठ का शब्द",
      explain: "भय जिस शब्द का अर्थ है, वह है डर। ध्यान रहे — पहला अक्षर ड है, इ नहीं।",
      hint: "दो अक्षर। पहला अक्षर ड।" },

    { id: "hin-aasmaan-gira.shabdarth.i07", type: "fill", level: 2,
      q: "उल्टा सवाल — पाठ के किस शब्द का अर्थ <strong>रुको</strong> है?",
      accept: ["ठहरो"],
      placeholder: "पाठ का शब्द",
      explain: "ठहरो – रुको। सवाल किसी भी दिशा से आ सकता है, इसलिए दोनों तरफ से याद रखो।",
      hint: "ठ से शुरू होता है।" },

    { id: "hin-aasmaan-gira.shabdarth.i08", type: "tap", level: 2,
      q: "इस वाक्य में उस शब्द पर टैप कीजिए जिसका अर्थ <strong>डरकर</strong> है।",
      tokens: [ { t: "खरगोश" }, { t: "आवाज़" }, { t: "सुनकर" }, { t: "चौंककर", ok: true }, { t: "उठ" }, { t: "गया।" } ],
      explain: "चौंककर का अर्थ डरकर है, इसलिए वही शब्द सही है।",
      hint: "वह शब्द जो -कर पर खत्म होता है और डर से जुड़ा है।" },

    { id: "hin-aasmaan-gira.shabdarth.i09", type: "tf", level: 2,
      q: "<strong>ठहरो</strong> का अर्थ <strong>भागो</strong> है।",
      answer: false,
      explain: "ठहरो का अर्थ रुको है। भागो तो उसका उल्टा है।",
      hint: "ठहरो सुनकर आप रुकते हो या दौड़ते हो?" },

    { id: "hin-aasmaan-gira.shabdarth.i10", type: "bucket", level: 2,
      q: "हर शब्द को सही डिब्बे में डालिए।",
      buckets: ["डर / भय से जुड़ा", "रुकने से जुड़ा"],
      chips: [ { t: "डर", b: "डर / भय से जुड़ा" }, { t: "भय", b: "डर / भय से जुड़ा" }, { t: "चौंककर", b: "डर / भय से जुड़ा" }, { t: "डरकर", b: "डर / भय से जुड़ा" }, { t: "ठहरो", b: "रुकने से जुड़ा" }, { t: "रुको", b: "रुकने से जुड़ा" } ],
      explain: "चौंककर और डरकर, डर और भय — ये सब डर वाले शब्द हैं। ठहरो और रुको रुकने वाले।",
      hint: "शब्दार्थ की तीनों जोड़ियाँ याद करो।" },

    { id: "hin-aasmaan-gira.shabdarth.i11", type: "fill", level: 2,
      q: "वाक्य पूरा कीजिए — गाँव के लोग शेर को देखकर ______ गए।",
      accept: ["डर"],
      placeholder: "एक शब्द",
      explain: "गाँव के लोग शेर को देखकर डर गए। यही वाक्य आपकी कॉपी में वाक्य बनाओ वाले भाग में है।",
      hint: "जिस शब्द का अर्थ भय है।" },

    { id: "hin-aasmaan-gira.shabdarth.i12", type: "fillMulti", level: 2,
      q: "शब्दार्थ की पूरी तालिका भरिए।",
      blanks: [ { label: "चौंककर –", accept: ["डरकर"] }, { label: "ठहरो –", accept: ["रुको"] }, { label: "डर –", accept: ["भय"] } ],
      explain: "पूरे पाठ में यही तीन शब्दार्थ दिए गए हैं। तीनों हिंदी में लिखे जाते हैं।",
      hint: "क्रम वही है जो कॉपी में है — क, ख, ग।" },

    { id: "hin-aasmaan-gira.shabdarth.i13", type: "mcq", level: 3,
      q: "नीचे दिए गए जोड़ों में से कौन-सा <strong>शब्दार्थ</strong> का जोड़ा नहीं है?",
      options: ["चौंककर – डरकर", "ठहरो – रुको", "डर – भय", "जल्दी – धीरे"],
      answer: 3,
      explain: "जल्दी और धीरे एक-दूसरे का अर्थ नहीं, विलोम हैं। शब्दार्थ में दोनों शब्दों का मतलब एक ही होता है।",
      hint: "क्या दोनों शब्दों का मतलब एक ही है, या उल्टा है?" },

    { id: "hin-aasmaan-gira.shabdarth.i14", type: "mcq", level: 3,
      q: "क्रिस्पिन ने उत्तर लिखा — <strong>चौंककर – startled</strong>। शिक्षिका ने अंक नहीं दिए। क्यों?",
      options: ["शब्दार्थ हिंदी शब्द में लिखना होता है, अंग्रेज़ी में नहीं", "startled का मतलब गलत है", "चौंककर पाठ में नहीं आया", "शब्दार्थ में डैश नहीं लगाते"],
      answer: 0,
      explain: "अर्थ सही समझा, पर हिंदी की कॉपी में उत्तर हिंदी में चाहिए — चौंककर – डरकर।",
      hint: "गलती अर्थ में नहीं, भाषा में है।" },

    { id: "hin-aasmaan-gira.shabdarth.i15", type: "speak", level: 1,
      q: "तीनों शब्दार्थ ज़ोर से पढ़िए, फिर 🔊 दबाकर मिलाइए।",
      text: "चौंककर – डरकर। ठहरो – रुको। डर – भय।",
      lang: "hi-IN",
      explain: "बोलकर याद करने से परीक्षा में शब्द जल्दी याद आते हैं।" }
  ]
},

/* ============================================================
   2. विलोम शब्द
   ============================================================ */
{
  id: "hin-aasmaan-gira.vilom",
  subject: "hindi",
  topic: "hin-aasmaan-gira",
  name: "विलोम शब्द",
  canDo: "I can write the विलोम of आगे, हँसना, जल्दी and पास using the school notation शब्द × विलोम.",
  weight: 5,
  difficulty: 1,
  prereq: [],
  teach: {
    hook: "विलोम is the easiest full mark in the Hindi paper, as long as you do not mix it up with पर्यायवाची.",
    explain: "<p><strong>विलोम शब्द</strong> (vilom shabd) = <em>opposite word</em>. Your school writes the pair with a small cross between them: <strong>शब्द × विलोम</strong>. Use that cross in the exam, exactly as in the notebook.</p><p>The four pairs from this पाठ:</p><ul><li><strong>आगे</strong> (aage, ahead) × <strong>पीछे</strong> (peechhe, behind)</li><li><strong>हँसना</strong> (hansna, to laugh) × <strong>रोना</strong> (rona, to cry)</li><li><strong>जल्दी</strong> (jaldi, quickly) × <strong>धीरे</strong> (dheere, slowly)</li><li><strong>पास</strong> (paas, near) × <strong>दूर</strong> (door, far)</li></ul><p>Opposite, not similar. If the two words could both fit in the same sentence, you have written a पर्यायवाची by mistake.</p>",
    worked: [
      {
        q: "विलोम लिखिए — हँसना",
        steps: [
          "Ask: what is the exact opposite action?",
          "Not हँसाना (to make someone laugh) — that is the same action, just done to another person.",
          "The opposite of laughing is crying: <strong>रोना</strong>.",
          "Write it the school way, with the cross: हँसना × रोना"
        ],
        a: "हँसना × रोना"
      },
      {
        q: "विलोम लिखिए — जल्दी",
        steps: [
          "जल्दी means quickly.",
          "Many children write देर, but देर means <em>late</em>, which is about time, not speed.",
          "The notebook answer is <strong>धीरे</strong> (slowly).",
          "जल्दी × धीरे"
        ],
        a: "जल्दी × धीरे"
      }
    ],
    remember: [
      "आगे × पीछे, पास × दूर — both pairs are about place.",
      "हँसना × रोना — both are feelings you show on your face.",
      "जल्दी × धीरे — speed, not time. Not देर.",
      "The school sign for विलोम is × . The school sign for पर्यायवाची is – ."
    ],
    watchOut: "चुप × मौन is wrong. मौन means the same as चुप, so that is a पर्यायवाची, not a विलोम."
  },
  items: [
    { id: "hin-aasmaan-gira.vilom.i01", type: "match", level: 1,
      q: "शब्द को उसके विलोम से मिलाइए।",
      pairs: [ { l: "आगे", r: "पीछे" }, { l: "हँसना", r: "रोना" }, { l: "जल्दी", r: "धीरे" }, { l: "पास", r: "दूर" } ],
      explain: "पाठ ५ के चारों विलोम जोड़े यही हैं।",
      hint: "हर जोड़ी एक-दूसरे की उल्टी है।" },

    { id: "hin-aasmaan-gira.vilom.i02", type: "mcq", level: 1,
      q: "<strong>आगे</strong> का विलोम क्या है?",
      options: ["पीछे", "ऊपर", "पास", "बाहर"],
      answer: 0,
      explain: "आगे × पीछे। ऊपर का विलोम नीचे होगा, पास का दूर।",
      hint: "जो आगे नहीं, वह कहाँ रह जाता है?" },

    { id: "hin-aasmaan-gira.vilom.i03", type: "mcq", level: 2,
      q: "<strong>हँसना</strong> का विलोम क्या है?",
      options: ["रोना", "हँसाना", "चुप", "गाना"],
      answer: 0,
      explain: "हँसना × रोना। हँसाना उल्टा नहीं है — वह तो हँसने वाला ही काम है, बस किसी और से करवाया जाता है।",
      hint: "आँसू किस काम में आते हैं?" },

    { id: "hin-aasmaan-gira.vilom.i04", type: "mcq", level: 2,
      q: "<strong>जल्दी</strong> का विलोम क्या है?",
      options: ["धीरे", "देर", "तेज़", "सुबह"],
      answer: 0,
      explain: "कॉपी में जल्दी × धीरे लिखा है। देर समय के बारे में है, गति के बारे में नहीं। तेज़ तो जल्दी का पर्यायवाची है।",
      hint: "कछुआ कैसे चलता है?" },

    { id: "hin-aasmaan-gira.vilom.i05", type: "mcq", level: 1,
      q: "<strong>पास</strong> का विलोम क्या है?",
      options: ["दूर", "नज़दीक", "पड़ोस", "पीछे"],
      answer: 0,
      explain: "पास × दूर। नज़दीक और पड़ोस तो पास जैसे ही हैं, उल्टे नहीं।",
      hint: "जो चीज़ हाथ नहीं पहुँचती, वह कहाँ है?" },

    { id: "hin-aasmaan-gira.vilom.i06", type: "fill", level: 1,
      q: "विलोम लिखिए — पास × ______",
      accept: ["दूर"],
      placeholder: "विलोम",
      explain: "पास × दूर।",
      hint: "द से शुरू।" },

    { id: "hin-aasmaan-gira.vilom.i07", type: "fill", level: 2,
      q: "उल्टा सवाल — ______ × पीछे",
      accept: ["आगे"],
      placeholder: "शब्द",
      explain: "आगे × पीछे। जोड़ी दोनों तरफ से पूछी जा सकती है।",
      hint: "दौड़ में जो जीतता है, वह कहाँ रहता है?" },

    { id: "hin-aasmaan-gira.vilom.i08", type: "bucket", level: 3,
      q: "हर जोड़ी को सही डिब्बे में डालिए।",
      buckets: ["सही विलोम जोड़ी", "विलोम नहीं है"],
      chips: [ { t: "आगे × पीछे", b: "सही विलोम जोड़ी" }, { t: "जल्दी × धीरे", b: "सही विलोम जोड़ी" }, { t: "पास × दूर", b: "सही विलोम जोड़ी" }, { t: "हँसना × रोना", b: "सही विलोम जोड़ी" }, { t: "चुप × मौन", b: "विलोम नहीं है" }, { t: "पेड़ × वृक्ष", b: "विलोम नहीं है" }, { t: "जानवर × पशु", b: "विलोम नहीं है" } ],
      explain: "चुप-मौन, पेड़-वृक्ष और जानवर-पशु एक ही अर्थ वाले शब्द हैं, यानी पर्यायवाची। विलोम में अर्थ उल्टा होना चाहिए।",
      hint: "अगर दोनों शब्दों का मतलब एक ही है, तो वह विलोम नहीं।" },

    { id: "hin-aasmaan-gira.vilom.i09", type: "tf", level: 2,
      q: "<strong>चुप × मौन</strong> एक सही विलोम जोड़ी है।",
      answer: false,
      explain: "मौन का अर्थ भी चुप ही है, इसलिए यह पर्यायवाची है। विलोम में अर्थ उल्टा चाहिए।",
      hint: "क्या मौन रहने वाला आदमी बोल रहा है?" },

    { id: "hin-aasmaan-gira.vilom.i10", type: "tap", level: 2,
      q: "इस वाक्य में विलोम जोड़ी वाले दोनों शब्दों पर टैप कीजिए।",
      tokens: [ { t: "खरगोश" }, { t: "आगे", ok: true }, { t: "भागा" }, { t: "और" }, { t: "शेर" }, { t: "पीछे", ok: true }, { t: "रह" }, { t: "गया।" } ],
      explain: "आगे × पीछे इस वाक्य में एक-दूसरे के सामने खड़े हैं।",
      hint: "जगह बताने वाले दो शब्द ढूँढ़ो।" },

    { id: "hin-aasmaan-gira.vilom.i11", type: "fillMulti", level: 2,
      q: "चारों विलोम जोड़े पूरे कीजिए।",
      blanks: [ { label: "आगे ×", accept: ["पीछे"] }, { label: "हँसना ×", accept: ["रोना"] }, { label: "जल्दी ×", accept: ["धीरे"] }, { label: "पास ×", accept: ["दूर"] } ],
      explain: "यही चार जोड़े पाठ ५ में दिए गए हैं। क्रम भी कॉपी वाला ही है।",
      hint: "पहले दो जगह के, फिर भाव के, फिर गति के।" },

    { id: "hin-aasmaan-gira.vilom.i12", type: "mcq", level: 3,
      q: "निम्नलिखित में से किस जोड़े में <strong>विलोम शब्द नहीं</strong> हैं?",
      options: ["आगे × पीछे", "जल्दी × धीरे", "जानवर × पशु", "हँसना × रोना"],
      answer: 2,
      explain: "जानवर और पशु का अर्थ एक ही है, इसलिए वह पर्यायवाची जोड़ी है।",
      hint: "तीन जोड़ियों में अर्थ उल्टा है, एक में एक जैसा।" },

    { id: "hin-aasmaan-gira.vilom.i13", type: "fill", level: 3,
      q: "क्रिस्पिन ने लिखा — <strong>हँसना × हँसाना</strong>। सही विलोम लिखकर ठीक कीजिए।",
      accept: ["रोना"],
      placeholder: "सही विलोम",
      explain: "हँसाना का मतलब है किसी को हँसाना, यानी वही काम। उल्टा काम है रोना।",
      hint: "जब आँखों से पानी आता है।" },

    { id: "hin-aasmaan-gira.vilom.i14", type: "fill", level: 3,
      q: "वाक्य को उल्टा कीजिए — “जल्दी चलो।” का उल्टा वाक्य है “______ चलो।”",
      accept: ["धीरे"],
      placeholder: "एक शब्द",
      explain: "जल्दी × धीरे, इसलिए वाक्य बनेगा — धीरे चलो।",
      hint: "जल्दी का विलोम वही रहेगा।" },

    { id: "hin-aasmaan-gira.vilom.i15", type: "speak", level: 1,
      q: "चारों जोड़े ज़ोर से पढ़िए, फिर 🔊 दबाकर मिलाइए।",
      text: "आगे × पीछे। हँसना × रोना। जल्दी × धीरे। पास × दूर।",
      lang: "hi-IN",
      explain: "जोड़ी को साथ-साथ बोलने से दोनों शब्द एक साथ याद रहते हैं।" }
  ]
},

/* ============================================================
   3. पर्यायवाची शब्द
   ============================================================ */
{
  id: "hin-aasmaan-gira.paryayvachi",
  subject: "hindi",
  topic: "hin-aasmaan-gira",
  name: "पर्यायवाची शब्द",
  canDo: "I can write BOTH पर्यायवाची words for पेड़, चुप and जानवर, the way the notebook lists them.",
  weight: 5,
  difficulty: 2,
  prereq: ["hin-aasmaan-gira.vilom"],
  teach: {
    hook: "This पाठ asks for two synonyms per word, not one. Write only one and you lose half the mark.",
    explain: "<p><strong>पर्यायवाची शब्द</strong> (paryaayvaachi shabd) = words with the <em>same</em> meaning. The school writes them with a dash and a comma: <strong>शब्द – पर्याय१, पर्याय२</strong>.</p><p>The three sets from this पाठ, with two synonyms each:</p><ul><li><strong>पेड़</strong> (ped, tree) – <strong>वृक्ष</strong> (vriksh), <strong>तरु</strong> (taru)</li><li><strong>चुप</strong> (chup, silent) – <strong>मौन</strong> (maun), <strong>शांत</strong> (shaant)</li><li><strong>जानवर</strong> (jaanvar, animal) – <strong>पशु</strong> (pashu), <strong>जीव</strong> (jeev)</li></ul><p>All three head-words come straight out of the story: the खरगोश was asleep under a <strong>पेड़</strong>, the <strong>जानवर</strong> all ran, and the शेर told them to be <strong>चुप</strong>.</p>",
    worked: [
      {
        q: "पर्यायवाची शब्द लिखिए — पेड़",
        steps: [
          "The question wants words that mean the SAME as पेड़.",
          "The notebook gives two: <strong>वृक्ष</strong> and <strong>तरु</strong>.",
          "Write both, separated by a comma, after a dash.",
          "Check the spelling of वृक्ष: व + ृ (ऋ की मात्रा) + क्ष."
        ],
        a: "पेड़ – वृक्ष, तरु"
      },
      {
        q: "पर्यायवाची शब्द लिखिए — जानवर",
        steps: [
          "जानवर means animal.",
          "Two Hindi words for animal in the notebook: <strong>पशु</strong> and <strong>जीव</strong>.",
          "जानवर – पशु, जीव"
        ],
        a: "जानवर – पशु, जीव"
      }
    ],
    remember: [
      "पेड़ – वृक्ष, तरु (both are book-words for tree).",
      "चुप – मौन, शांत (मौन = no speaking, शांत = no noise).",
      "जानवर – पशु, जीव.",
      "पर्यायवाची uses a dash – . विलोम uses a cross × . Look at the sign before you answer."
    ],
    watchOut: "Do not write only one synonym. Every पर्यायवाची in this पाठ has TWO, and the exam will expect both."
  },
  items: [
    { id: "hin-aasmaan-gira.paryayvachi.i01", type: "match", level: 1,
      q: "शब्द को उसके पर्यायवाची से मिलाइए।",
      pairs: [ { l: "पेड़", r: "वृक्ष" }, { l: "चुप", r: "मौन" }, { l: "जानवर", r: "पशु" } ],
      explain: "हर शब्द का दूसरा पर्यायवाची भी याद रखो — तरु, शांत, जीव।",
      hint: "तीनों शब्द कहानी में आए हैं।" },

    { id: "hin-aasmaan-gira.paryayvachi.i02", type: "fillMulti", level: 2,
      q: "<strong>पेड़</strong> के दोनों पर्यायवाची लिखिए।",
      blanks: [ { label: "पहला", accept: ["वृक्ष"] }, { label: "दूसरा", accept: ["तरु"] } ],
      explain: "पेड़ – वृक्ष, तरु। दोनों लिखने पर ही पूरा अंक मिलेगा।",
      hint: "एक व से शुरू, दूसरा त से।" },

    { id: "hin-aasmaan-gira.paryayvachi.i03", type: "fillMulti", level: 2,
      q: "<strong>चुप</strong> के दोनों पर्यायवाची लिखिए।",
      blanks: [ { label: "पहला", accept: ["मौन"] }, { label: "दूसरा", accept: ["शांत"] } ],
      explain: "चुप – मौन, शांत।",
      hint: "एक म से शुरू, दूसरा श से।" },

    { id: "hin-aasmaan-gira.paryayvachi.i04", type: "fillMulti", level: 2,
      q: "<strong>जानवर</strong> के दोनों पर्यायवाची लिखिए।",
      blanks: [ { label: "पहला", accept: ["पशु"] }, { label: "दूसरा", accept: ["जीव"] } ],
      explain: "जानवर – पशु, जीव।",
      hint: "एक प से शुरू, दूसरा ज से।" },

    { id: "hin-aasmaan-gira.paryayvachi.i05", type: "mcq", level: 1,
      q: "<strong>तरु</strong> किसका पर्यायवाची है?",
      options: ["पेड़", "चुप", "जानवर", "आसमान"],
      answer: 0,
      explain: "तरु का अर्थ पेड़ है। पेड़ – वृक्ष, तरु।",
      hint: "जिसके नीचे खरगोश सो रहा था।" },

    { id: "hin-aasmaan-gira.paryayvachi.i06", type: "mcq", level: 2,
      q: "<strong>जीव</strong> किसका पर्यायवाची है?",
      options: ["जानवर", "पेड़", "चुप", "डर"],
      answer: 0,
      explain: "जानवर – पशु, जीव। जीव का अर्थ है प्राणी, यानी जानवर।",
      hint: "पशु का साथी शब्द।" },

    { id: "hin-aasmaan-gira.paryayvachi.i07", type: "bucket", level: 2,
      q: "हर पर्यायवाची शब्द को उसके सही मूल शब्द के डिब्बे में डालिए।",
      buckets: ["पेड़", "चुप", "जानवर"],
      chips: [ { t: "वृक्ष", b: "पेड़" }, { t: "तरु", b: "पेड़" }, { t: "मौन", b: "चुप" }, { t: "शांत", b: "चुप" }, { t: "पशु", b: "जानवर" }, { t: "जीव", b: "जानवर" } ],
      explain: "हर डिब्बे में ठीक दो शब्द जाने चाहिए — यही इस पाठ का नियम है।",
      hint: "हर डिब्बे में दो-दो चिप्स।" },

    { id: "hin-aasmaan-gira.paryayvachi.i08", type: "tf", level: 2,
      q: "<strong>शांत</strong> और <strong>चुप</strong> का अर्थ एक ही है।",
      answer: true,
      explain: "हाँ, शांत चुप का पर्यायवाची है। कॉपी में चुप – मौन, शांत लिखा है।",
      hint: "क्लास में शांत रहना और चुप रहना — क्या अलग है?" },

    { id: "hin-aasmaan-gira.paryayvachi.i09", type: "tap", level: 2,
      q: "इस वाक्य में उस शब्द पर टैप कीजिए जो <strong>पेड़</strong> का पर्यायवाची है।",
      tokens: [ { t: "खरगोश" }, { t: "एक" }, { t: "बड़े" }, { t: "वृक्ष", ok: true }, { t: "के" }, { t: "नीचे" }, { t: "सो" }, { t: "रहा" }, { t: "था।" } ],
      explain: "वृक्ष का अर्थ पेड़ है, इसलिए वही शब्द सही है।",
      hint: "जिस शब्द के नीचे कोई सो सकता है।" },

    { id: "hin-aasmaan-gira.paryayvachi.i10", type: "mcq", level: 3,
      q: "इस पाठ में <strong>चुप</strong> के पर्यायवाची कितने दिए गए हैं?",
      options: ["दो", "एक", "तीन", "कोई नहीं"],
      answer: 0,
      explain: "दो — मौन और शांत। इस पाठ के हर पर्यायवाची में दो-दो शब्द दिए गए हैं।",
      hint: "कॉपी में डैश के बाद कॉमा गिनो।" },

    { id: "hin-aasmaan-gira.paryayvachi.i11", type: "mcq", level: 3,
      q: "क्रिस्पिन ने लिखा — <strong>जानवर × पशु</strong>। इसमें क्या गलत है?",
      options: ["× का चिह्न विलोम के लिए है, पर्यायवाची के लिए डैश – लगता है", "पशु शब्द गलत है", "जानवर का पर्यायवाची जीव ही होता है", "इसमें कुछ गलत नहीं है"],
      answer: 0,
      explain: "अर्थ सही है, चिह्न गलत है। सही उत्तर — जानवर – पशु, जीव। साथ ही दूसरा पर्यायवाची भी छूट गया।",
      hint: "स्कूल में × किस चीज़ के लिए इस्तेमाल होता है?" },

    { id: "hin-aasmaan-gira.paryayvachi.i12", type: "fill", level: 3,
      q: "पूरा उत्तर लिखिए — जानवर – ______, ______ (दोनों शब्द कॉमा के साथ)",
      accept: ["पशु, जीव", "पशु जीव", "पशु,जीव"],
      placeholder: "दोनों पर्यायवाची",
      explain: "जानवर – पशु, जीव। परीक्षा में दोनों लिखने पर पूरा अंक मिलता है।",
      hint: "पहले प, फिर ज।" },

    { id: "hin-aasmaan-gira.paryayvachi.i13", type: "mcq", level: 2,
      q: "<strong>मौन</strong> शब्द में कौन-सी मात्रा है?",
      options: ["औ की मात्रा (ौ)", "ओ की मात्रा (ो)", "ऊ की मात्रा (ू)", "कोई मात्रा नहीं"],
      answer: 0,
      explain: "मौन में म पर औ की मात्रा है — म + ौ + न। मोन लिखना गलत होगा।",
      hint: "बोलकर देखो — “मौ” या “मो”?" },

    { id: "hin-aasmaan-gira.paryayvachi.i14", type: "speak", level: 1,
      q: "तीनों पर्यायवाची सेट ज़ोर से पढ़िए, फिर 🔊 दबाकर मिलाइए।",
      text: "पेड़ – वृक्ष, तरु। चुप – मौन, शांत। जानवर – पशु, जीव।",
      lang: "hi-IN",
      explain: "दोनों पर्यायवाची एक साँस में बोलने की आदत डालो, तो परीक्षा में दोनों याद आएँगे।" }
  ]
},

/* ============================================================
   4. प्र १ का पूरा उत्तर — the answer the teacher completed in red
   ============================================================ */
{
  id: "hin-aasmaan-gira.uttar-q1",
  subject: "hindi",
  topic: "hin-aasmaan-gira",
  name: "प्र १ का पूरा उत्तर",
  canDo: "I can write the full two-sentence answer to \"खरगोश को कैसे लगा कि आसमान गिर रहा है?\" without stopping halfway.",
  weight: 5,
  difficulty: 3,
  prereq: [],
  teach: {
    hook: "This is the one answer the teacher rewrote for you in red ink. That is the strongest hint in the whole notebook about what a full-mark answer looks like.",
    explain: "<p>In the notebook you wrote only <em>“खरगोश जब पेड़ के नीचे सो रहा है।”</em> The teacher crossed it out and finished it in red. Two things were wrong: it stopped halfway, and it used <strong>है</strong> (present) for something that happened in the <strong>past</strong>.</p><p>The full model answer, exactly as it now stands on the page:</p><p><strong>खरगोश जब पेड़ के नीचे सो रहा था तो उसे धम्म की आवाज़ आई। तब उसे लगा कि आसमान गिर रहा है।</strong></p><p>It has two sentences and it answers <em>“कैसे”</em>. First the cause (a धम्म sound while he slept), then the effect (he thought the sky was falling). A “कैसे” question always needs both halves.</p>",
    worked: [
      {
        q: "खरगोश को कैसे लगा कि आसमान गिर रहा है?",
        steps: [
          "The question word is <strong>कैसे</strong>, so the answer must give the reason, not just the place.",
          "Start by reusing the question words: खरगोश जब पेड़ के नीचे सो रहा…",
          "It already happened, so the verb is <strong>था</strong>, not है: <em>सो रहा था</em>.",
          "Now the cause: तो उसे <strong>धम्म</strong> (dhamm, a thud) की आवाज़ आई।",
          "Now the effect, in a second sentence: तब उसे लगा कि आसमान गिर रहा है।",
          "Read it back. Two sentences, two full stops (।)."
        ],
        a: "खरगोश जब पेड़ के नीचे सो रहा था तो उसे धम्म की आवाज़ आई। तब उसे लगा कि आसमान गिर रहा है।"
      }
    ],
    remember: [
      "Skeleton: सो रहा <strong>था</strong> → धम्म की आवाज़ आई → तब उसे लगा कि आसमान गिर रहा है।",
      "The rabbit was sleeping in the PAST, so सो रहा था. Only the last verb (गिर रहा है) stays in the present, because that is what he was thinking at that moment.",
      "Two sentences. Two ।",
      "A “कैसे” question is never answered by naming only a place."
    ],
    watchOut: "Stopping at “…सो रहा था।” is the exact mistake that got crossed out. Keep writing until you reach “…आसमान गिर रहा है।”"
  },
  items: [
    { id: "hin-aasmaan-gira.uttar-q1.i01", type: "order", level: 2,
      q: "उत्तर के टुकड़ों को सही क्रम में लगाइए।",
      answer: ["खरगोश जब", "पेड़ के नीचे", "सो रहा था", "तो उसे धम्म की आवाज़ आई।", "तब उसे लगा", "कि आसमान गिर रहा है।"],
      explain: "पूरा उत्तर — खरगोश जब पेड़ के नीचे सो रहा था तो उसे धम्म की आवाज़ आई। तब उसे लगा कि आसमान गिर रहा है।",
      hint: "पहले वह कहाँ था, फिर क्या सुना, फिर क्या सोचा।" },

    { id: "hin-aasmaan-gira.uttar-q1.i02", type: "steps", level: 3,
      q: "पूरा उत्तर टुकड़े-टुकड़े में बनाइए — खरगोश को कैसे लगा कि आसमान गिर रहा है?",
      parts: [
        { q: "खरगोश कहाँ सो रहा था?", accept: ["पेड़ के नीचे", "पेड के नीचे"] },
        { q: "क्रिया किस काल में लिखेंगे — “सो रहा है” या “सो रहा था”?", accept: ["सो रहा था", "था"] },
        { q: "उसे कौन-सी आवाज़ आई?", accept: ["धम्म की आवाज़", "धम्म", "धम्म की आवाज"] },
        { q: "फिर उसे क्या लगा?", accept: ["आसमान गिर रहा है", "कि आसमान गिर रहा है", "आसमान गिर रहा है।"] }
      ],
      explain: "चारों टुकड़े जोड़ो — खरगोश जब पेड़ के नीचे सो रहा था तो उसे धम्म की आवाज़ आई। तब उसे लगा कि आसमान गिर रहा है।",
      hint: "जगह → काल → आवाज़ → सोच।" },

    { id: "hin-aasmaan-gira.uttar-q1.i03", type: "fill", level: 2,
      q: "खाली जगह भरिए — खरगोश जब पेड़ के नीचे सो रहा ______ तो उसे धम्म की आवाज़ आई।",
      accept: ["था"],
      placeholder: "एक शब्द",
      explain: "यह बात बीत चुकी है, इसलिए था लिखेंगे। है लिखना वही गलती है जो कॉपी में लाल स्याही से काटी गई थी।",
      hint: "बीता हुआ समय।" },

    { id: "hin-aasmaan-gira.uttar-q1.i04", type: "fill", level: 2,
      q: "खाली जगह भरिए — तब उसे लगा कि ______ गिर रहा है।",
      accept: ["आसमान"],
      placeholder: "एक शब्द",
      explain: "तब उसे लगा कि आसमान गिर रहा है। यही पाठ का नाम भी है।",
      hint: "पाठ का नाम देखो।" },

    { id: "hin-aasmaan-gira.uttar-q1.i05", type: "mcq", level: 2,
      q: "खरगोश को क्या सुनकर लगा कि आसमान गिर रहा है?",
      options: ["धम्म की आवाज़", "शेर की दहाड़", "बच्चों की आवाज़", "पक्षियों की आवाज़"],
      answer: 0,
      explain: "उसे धम्म की आवाज़ आई थी — वह असल में एक बड़ा-सा फल गिरने की आवाज़ थी।",
      hint: "फल गिरने पर कैसी आवाज़ होती है?" },

    { id: "hin-aasmaan-gira.uttar-q1.i06", type: "mcq", level: 3,
      q: "क्रिस्पिन ने उत्तर लिखा — “खरगोश जब पेड़ के नीचे सो रहा है।” शिक्षिका ने इसे काट दिया। सबसे बड़ी वजह क्या थी?",
      options: ["उत्तर अधूरा है और काल भी गलत है", "खरगोश की जगह शेर लिखना था", "उत्तर बहुत लंबा है", "पेड़ की स्पेलिंग गलत है"],
      answer: 0,
      explain: "दो गलतियाँ — उत्तर आधे में रुक गया, और “है” की जगह “था” आना चाहिए था। शिक्षिका ने बाकी उत्तर लाल स्याही से पूरा किया।",
      hint: "सवाल “कैसे” पूछ रहा है। क्या जवाब में कारण आया?" },

    { id: "hin-aasmaan-gira.uttar-q1.i07", type: "tf", level: 2,
      q: "“खरगोश पेड़ के नीचे सो रहा था।” — यह प्र १ का पूरा उत्तर है।",
      answer: false,
      explain: "यह आधा उत्तर है। पूरा उत्तर धम्म की आवाज़ और उसकी सोच तक जाता है — “…तो उसे धम्म की आवाज़ आई। तब उसे लगा कि आसमान गिर रहा है।”",
      hint: "सवाल “कैसे लगा” पूछ रहा है, “कहाँ सो रहा था” नहीं।" },

    { id: "hin-aasmaan-gira.uttar-q1.i08", type: "shortAnswer", level: 3,
      q: "खरगोश को कैसे लगा कि आसमान गिर रहा है?",
      model: "खरगोश जब पेड़ के नीचे सो रहा था तो उसे धम्म की आवाज़ आई। तब उसे लगा कि आसमान गिर रहा है।",
      must: ["खरगोश पेड़ के नीचे सो रहा था — “था” लिखा है, “है” नहीं", "धम्म की आवाज़ का ज़िक्र है", "आखिर में लिखा है कि उसे लगा आसमान गिर रहा है", "दो वाक्य हैं और दोनों के अंत में । है"],
      lines: 3,
      explain: "यही वह उत्तर है जो शिक्षिका ने लाल स्याही से पूरा किया था। चारों बिंदु आने चाहिए।",
      hint: "कारण पहले, सोच बाद में।" },

    { id: "hin-aasmaan-gira.uttar-q1.i09", type: "order", level: 3,
      q: "उत्तर के दूसरे वाक्य के शब्दों को क्रम में लगाइए।",
      answer: ["तब", "उसे", "लगा", "कि", "आसमान", "गिर", "रहा", "है।"],
      explain: "तब उसे लगा कि आसमान गिर रहा है। “कि” के बाद वह बात आती है जो उसने सोची।",
      hint: "“तब” से शुरू कीजिए।" },

    { id: "hin-aasmaan-gira.uttar-q1.i10", type: "mcq", level: 3,
      q: "उत्तर में <strong>कि</strong> शब्द का काम क्या है?",
      options: ["यह जोड़ता है कि उसे क्या लगा", "यह सवाल पूछता है", "यह जगह बताता है", "यह समय बताता है"],
      answer: 0,
      explain: "कि जोड़ने वाला शब्द है — “उसे लगा कि आसमान गिर रहा है।” ध्यान रहे, यह “को” नहीं है। कॉपी में यही गलती एक बार लाल स्याही से ठीक हुई थी।",
      hint: "इसके बाद वाला हिस्सा बताता है कि उसने क्या सोचा।" },

    { id: "hin-aasmaan-gira.uttar-q1.i11", type: "fillMulti", level: 3,
      q: "पूरा उत्तर भरिए।",
      blanks: [
        { label: "खरगोश जब पेड़ के नीचे सो रहा", accept: ["था"] },
        { label: "तो उसे ______ की आवाज़ आई", accept: ["धम्म"] },
        { label: "तब उसे लगा कि आसमान गिर रहा", accept: ["है"] }
      ],
      explain: "पहले खाने में था, आखिरी खाने में है। सोना बीत चुका था, पर “आसमान गिर रहा है” वह उस समय सोच रहा था।",
      hint: "पहला खाना बीता हुआ काल, आखिरी वाला वर्तमान।" },

    { id: "hin-aasmaan-gira.uttar-q1.i12", type: "tap", level: 2,
      q: "उत्तर के इस वाक्य में उस शब्द पर टैप कीजिए जो बताता है कि बात बीत चुकी है।",
      tokens: [ { t: "खरगोश" }, { t: "पेड़" }, { t: "के" }, { t: "नीचे" }, { t: "सो" }, { t: "रहा" }, { t: "था", ok: true }, { t: "।" } ],
      explain: "था बीते हुए समय का शब्द है। है वर्तमान का होता है।",
      hint: "आखिरी क्रिया शब्द।" },

    { id: "hin-aasmaan-gira.uttar-q1.i13", type: "mcq", level: 1,
      q: "धम्म की आवाज़ असल में किस चीज़ की थी?",
      options: ["एक बड़ा-सा फल गिरने की", "शेर के दहाड़ने की", "आसमान गिरने की", "पेड़ टूटने की"],
      answer: 0,
      explain: "बाद में सभी जानवरों ने पेड़ के नीचे एक बड़ा-सा फल गिरा हुआ देखा। आसमान गिरा ही नहीं था।",
      hint: "प्र ३ का उत्तर याद करो।" },

    { id: "hin-aasmaan-gira.uttar-q1.i14", type: "speak", level: 2,
      q: "पूरा उत्तर एक साँस में ज़ोर से पढ़िए, फिर 🔊 दबाकर मिलाइए।",
      text: "खरगोश जब पेड़ के नीचे सो रहा था तो उसे धम्म की आवाज़ आई। तब उसे लगा कि आसमान गिर रहा है।",
      lang: "hi-IN",
      explain: "बोलकर याद कर लो तो लिखते समय आधे में नहीं रुकोगे।" },

    { id: "hin-aasmaan-gira.uttar-q1.i15", type: "fill", level: 3,
      q: "उत्तर में कुल कितने वाक्य हैं? (अंक में लिखिए)",
      accept: ["2", "दो"],
      placeholder: "संख्या",
      explain: "दो वाक्य — पहला धम्म की आवाज़ तक, दूसरा “तब उसे लगा…” से। दोनों के अंत में पूर्ण विराम । लगता है।",
      hint: "पूर्ण विराम । गिनो।" }
  ]
}

]);
