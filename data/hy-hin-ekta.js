/* HALF-YEARLY HQ — एकता में बल है + लिंग
   Source extraction: .tmp/hy-extract/hin-ekta-workbook.md
   Material: Hindi Work Book (The Asian School, Bahrain), pp. 12-17 —
   p.12 कहानी लेखन cloze "एकता में बल है" (left blank by Crispin),
   pp.13-17 लिंग unit (प्रश्न १-५), plus the dictated margin note on p.13
   ("हमेशा पुल्लिंग / हमेशा स्त्रीलिंग रहने वाले शब्द").
   Every gender fact below is taken from the workbook's own accepted answer key. */

window.HY_TOPICS = (window.HY_TOPICS || []).concat([{
  id: "hin-ekta",
  subject: "hindi",
  name: "एकता में बल है + लिंग",
  emoji: "🤝",
  blurb: "किसान और उसके चार बेटों की कहानी, और लिंग — पुल्लिंग या स्त्रीलिंग पहचानना, बदलना और वाक्य में मिलाना।",
  source: "Hindi Work Book pp. 12-17 (कहानी लेखन + लिंग प्रश्न १-५) + class margin note on p.13",
  examWeight: 30
}]);

window.HY_SKILLS = (window.HY_SKILLS || []).concat([

{
  id: "hin-ekta.kahani-cloze",
  subject: "hindi",
  topic: "hin-ekta",
  name: "कहानी के खाली स्थान भरो",
  canDo: "I can fill every blank in the story एकता में बल है using the right word from the word box.",
  weight: 5,
  difficulty: 2,
  prereq: [],
  teach: {
    hook: "This is the one page in your workbook that is still completely empty. Fifteen blanks, fifteen words in the box. Learn the story once and the blanks fill themselves.",
    explain: "<p>कहानी लेखन (kahani lekhan) means <strong>story writing</strong>. The workbook gives you a box of words and a story with gaps. Your job is to drop each word into the gap where it makes sense.</p><p>The trick is <strong>not</strong> to guess word by word. Read the whole story first so you know what happens. Then each blank has only one word that fits the meaning <em>and</em> the grammar.</p><p>Here is the finished story:<br>किसी गाँव में एक <strong>किसान</strong> रहता था। उसके चार <strong>बेटे</strong> थे। वे हमेशा <strong>झगड़ते</strong> रहते थे। किसान उन्हें बहुत समझाता पर बेटों पर कोई <strong>असर</strong> न होता। एक दिन उसने अपने <strong>चारों</strong> बेटों को बुलाया और <strong>लकड़ियों</strong> के गट्ठर को तोड़ने को कहा। चारों ने उसे तोड़ने की <strong>कोशिश</strong> की पर <strong>असफल</strong> रहे। अब किसान ने उन्हें एक-एक लकड़ी <strong>पकड़ाई</strong>। चारों ने लकड़ी <strong>आसानी</strong> से <strong>तोड़</strong> दी। किसान ने समझाया कि जब तक लकड़ियाँ <strong>बँधी</strong> थीं उन्हें कोई नहीं <strong>तोड़</strong> पाया। यदि तुम <strong>मिलजुलकर</strong> रहोगे तो तुम्हें कोई <strong>हरा</strong> नहीं सकता।</p><p>( सीख - एकता में बड़ी ताकत होती है )</p>",
    worked: [
      {
        q: "वे हमेशा ______ रहते थे। (word box: झगड़ते, किसान, आसानी, हरा)",
        steps: [
          "Who is वे (ve, they)? The four sons.",
          "The next line says the father kept explaining but it had no असर (asar, effect). So the sons were doing something bad.",
          "झगड़ते (jhagadte) means <strong>quarrelling</strong>. किसान is a person, आसानी is easily, हरा is defeat.",
          "Only झगड़ते makes sense with रहते थे."
        ],
        a: "झगड़ते"
      },
      {
        q: "चारों ने लकड़ी ______ से ______ दी।",
        steps: [
          "One stick alone is weak, so the sons managed it.",
          "The pattern ______ से means <em>with ______</em>. आसानी से (aasani se) = easily.",
          "Then ______ दी needs a verb root. तोड़ (tod) = break, so तोड़ दी = broke it.",
          "Answer: आसानी से तोड़ दी."
        ],
        a: "आसानी, तोड़"
      }
    ],
    remember: [
      "Story order: किसान → चार बेटे → झगड़ा → गट्ठर → असफल → एक-एक लकड़ी → तोड़ दी → सीख।",
      "गट्ठर (gatthar) = the tied bundle of sticks. बँधी (bandhi) = tied.",
      "हरा (hara) here means <strong>defeat</strong>, not the colour green.",
      "The सीख is printed for you: एकता में बड़ी ताकत होती है।"
    ],
    watchOut: "तोड़ is needed in TWO blanks (आसानी से तोड़ दी, और कोई नहीं तोड़ पाया). Do not panic when a box word gets used twice."
  },
  items: [
    { id: "hin-ekta.kahani-cloze.i01", type: "fill", q: "किसी गाँव में एक ______ रहता था।", accept: ["किसान"], placeholder: "एक शब्द", explain: "किसान (kisaan) = farmer. The whole story is about him and his four sons.", hint: "गाँव में रहने वाला, खेती करने वाला।", level: 1 },
    { id: "hin-ekta.kahani-cloze.i02", type: "fill", q: "उसके चार ______ थे।", accept: ["बेटे"], placeholder: "एक शब्द", explain: "बेटे (bete) = sons. चार बेटे — four sons. बेटा becomes बेटे when there is more than one.", hint: "चार का मतलब एक से ज़्यादा, तो शब्द भी बहुवचन होगा।", level: 1 },
    { id: "hin-ekta.kahani-cloze.i03", type: "mcq", q: "वे हमेशा ______ रहते थे।", options: ["खेलते", "झगड़ते", "पढ़ते", "मिलकर"], answer: 1, explain: "झगड़ते (jhagadte) = quarrelling. The next line says the father's advice had no effect, so they must have been quarrelling.", hint: "अगली पंक्ति कहती है कि पिता के समझाने का कोई असर न होता।", level: 1 },
    { id: "hin-ekta.kahani-cloze.i04", type: "fill", q: "किसान उन्हें बहुत समझाता पर बेटों पर कोई ______ न होता।", accept: ["असर"], placeholder: "एक शब्द", explain: "असर (asar) = effect. कोई असर न होता = it had no effect on them.", hint: "समझाने का जो नतीजा होता है, उसे क्या कहते हैं?", level: 2 },
    { id: "hin-ekta.kahani-cloze.i05", type: "fill", q: "एक दिन उसने अपने ______ बेटों को बुलाया।", accept: ["चारों"], placeholder: "एक शब्द", explain: "चारों (chaaron) = all four. He called all four sons together, not just one.", hint: "बेटे कितने थे?", level: 1 },
    { id: "hin-ekta.kahani-cloze.i06", type: "mcq", q: "और ______ के गट्ठर को तोड़ने को कहा।", options: ["लकड़ी", "लकड़ियाँ", "लकड़ियों", "लकड़ियों की"], answer: 2, explain: "Before के the word takes the form लकड़ियों. लकड़ियों के गट्ठर = the bundle of sticks.", hint: "गट्ठर से पहले 'के' लगा है, इसलिए शब्द का रूप बदलेगा।", level: 3 },
    { id: "hin-ekta.kahani-cloze.i07", type: "fill", q: "चारों ने उसे तोड़ने की ______ की।", accept: ["कोशिश"], placeholder: "एक शब्द", explain: "कोशिश (koshish) = try, attempt. तोड़ने की कोशिश की = they tried to break it.", hint: "जब हम कुछ करने का प्रयास करते हैं, उसे क्या कहते हैं?", level: 2 },
    { id: "hin-ekta.kahani-cloze.i08", type: "fill", q: "चारों ने उसे तोड़ने की कोशिश की पर ______ रहे।", accept: ["असफल"], placeholder: "एक शब्द", explain: "असफल (asafal) = unsuccessful. The tied bundle did not break, so they failed.", hint: "सफल का उल्टा शब्द बॉक्स में है।", level: 2 },
    { id: "hin-ekta.kahani-cloze.i09", type: "fill", q: "अब किसान ने उन्हें एक-एक लकड़ी ______।", accept: ["पकड़ाई"], placeholder: "एक शब्द", explain: "पकड़ाई (pakdaai) = handed over. He handed each son a single stick.", hint: "हाथ में देना — इसके लिए बॉक्स में एक शब्द है।", level: 2 },
    { id: "hin-ekta.kahani-cloze.i10", type: "fillMulti", q: "दोनों खाली स्थान भरो: चारों ने लकड़ी ______ से ______ दी।", blanks: [ { label: "पहला खाली स्थान", accept: ["आसानी"] }, { label: "दूसरा खाली स्थान", accept: ["तोड़"] } ], explain: "आसानी से (aasani se) = easily, तोड़ दी = broke it. One stick alone snaps at once.", hint: "'से' से पहले तरीका आता है, 'दी' से पहले क्रिया।", level: 2 },
    { id: "hin-ekta.kahani-cloze.i11", type: "fill", q: "किसान ने समझाया कि जब तक लकड़ियाँ ______ थीं।", accept: ["बँधी"], placeholder: "एक शब्द", explain: "बँधी (bandhi) = tied. As long as the sticks were tied together nobody could break them.", hint: "गट्ठर में लकड़ियाँ किस हालत में थीं?", level: 2 },
    { id: "hin-ekta.kahani-cloze.i12", type: "fill", q: "उन्हें कोई नहीं ______ पाया।", accept: ["तोड़"], placeholder: "एक शब्द", explain: "तोड़ (tod) = break. तोड़ पाया = could break. This box word is used twice in the story, and that is fine.", hint: "गट्ठर के साथ कोई क्या नहीं कर पाया?", level: 3 },
    { id: "hin-ekta.kahani-cloze.i13", type: "fillMulti", q: "अंतिम दो खाली स्थान भरो: यदि तुम ______ रहोगे तो तुम्हें कोई ______ नहीं सकता।", blanks: [ { label: "पहला खाली स्थान", accept: ["मिलजुलकर", "मिलकर"] }, { label: "दूसरा खाली स्थान", accept: ["हरा"] } ], explain: "मिलजुलकर (miljulkar) = staying together in harmony. हरा (hara) here means <strong>defeat</strong>, not the colour green.", hint: "यह किसान की सलाह है — साथ रहने की।", level: 3 },
    { id: "hin-ekta.kahani-cloze.i14", type: "tf", q: "रोहन ने लिखा: चारों ने लकड़ी आसानी से पकड़ाई। क्या यह सही है?", answer: false, explain: "पकड़ाई means handed over. The sons did not hand the stick to anybody, they broke it. सही वाक्य: चारों ने लकड़ी आसानी से तोड़ दी।", hint: "पकड़ाना किसने किया था — किसान ने या बेटों ने?", level: 3 },
    { id: "hin-ekta.kahani-cloze.i15", type: "match", q: "शब्द और उसका अर्थ मिलाओ।", pairs: [ { l: "असर", r: "effect" }, { l: "असफल", r: "unsuccessful" }, { l: "पकड़ाई", r: "handed over" }, { l: "हरा", r: "defeat" }, { l: "बँधी", r: "tied" } ], explain: "These five box words carry the meaning of the story. हरा is the trap — here it is a verb meaning defeat.", level: 2 },
    { id: "hin-ekta.kahani-cloze.i16", type: "speak", q: "इसे ज़ोर से पढ़ो, फिर 🔊 दबाकर जाँचो।", text: "किसी गाँव में एक किसान रहता था। उसके चार बेटे थे। वे हमेशा झगड़ते रहते थे।", lang: "hi-IN", explain: "Reading the opening aloud fixes the word order in your head, which makes the blanks obvious in the exam.", level: 1 }
  ]
},

{
  id: "hin-ekta.kahani-katha",
  subject: "hindi",
  topic: "hin-ekta",
  name: "कहानी की घटनाएँ और सीख",
  canDo: "I can retell एकता में बल है in the right order and write its सीख in one sentence.",
  weight: 4,
  difficulty: 2,
  prereq: ["hin-ekta.kahani-cloze"],
  teach: {
    hook: "A single stick snaps in a second. Tie six together and even four grown men cannot break them. That is the whole story, and the whole point.",
    explain: "<p>Every कहानी लेखन answer needs two things: the <strong>events in the right order</strong>, and the <strong>सीख</strong> (seekh) — the moral — at the end in brackets.</p><p>The events here go in five steps: a किसान has four quarrelling sons → he gives them a गट्ठर (gatthar, a tied bundle of sticks) to break → all four fail → he gives them one stick each → they break it at once → he explains the lesson.</p><p>The सीख is printed in your workbook: <strong>( सीख - एकता में बड़ी ताकत होती है )</strong> — unity has great strength. The title itself, एकता में बल है, says the same thing: in unity there is strength.</p>",
    worked: [
      {
        q: "किसान ने बेटों को एक-एक लकड़ी क्यों पकड़ाई?",
        steps: [
          "First he gave them the whole bundle and they could not break it.",
          "He wanted to show the difference between together and alone.",
          "One stick alone broke easily, which proved his point.",
          "So the answer names both parts: to show them that alone they are weak, together they are strong."
        ],
        a: "यह दिखाने के लिए कि अकेली लकड़ी आसानी से टूट जाती है, पर बँधी हुई लकड़ियाँ नहीं टूटतीं।"
      }
    ],
    remember: [
      "पात्र (paatra, characters): एक किसान और उसके चार बेटे।",
      "सीख — एकता में बड़ी ताकत होती है।",
      "गट्ठर नहीं टूटा, अकेली लकड़ी टूट गई। That single contrast is the story."
    ],
    watchOut: "Do not forget the सीख line. In कहानी लेखन the moral usually carries its own mark, and it is the easiest mark on the page."
  },
  items: [
    { id: "hin-ekta.kahani-katha.i01", type: "mcq", q: "कहानी में किसान के कितने बेटे थे?", options: ["दो", "तीन", "चार", "पाँच"], answer: 2, explain: "उसके चार बेटे थे। The word चारों appears later in the story too.", level: 1 },
    { id: "hin-ekta.kahani-katha.i02", type: "order", q: "कहानी की घटनाओं को सही क्रम में लगाओ।", answer: ["किसान के चार बेटे हमेशा झगड़ते थे।", "किसान ने चारों को लकड़ियों का गट्ठर तोड़ने को कहा।", "चारों गट्ठर तोड़ने में असफल रहे।", "किसान ने उन्हें एक-एक लकड़ी पकड़ाई।", "चारों ने लकड़ी आसानी से तोड़ दी।", "किसान ने उन्हें एकता की सीख दी।"], explain: "The bundle comes first and fails, the single stick comes second and breaks. If you swap those two, the lesson makes no sense.", hint: "पहले गट्ठर, फिर एक-एक लकड़ी।", level: 2 },
    { id: "hin-ekta.kahani-katha.i03", type: "fill", q: "इस कहानी की सीख है — एकता में बड़ी ______ होती है।", accept: ["ताकत"], placeholder: "एक शब्द", explain: "( सीख - एकता में बड़ी ताकत होती है ) — यह पंक्ति आपकी वर्क बुक में छपी हुई है।", hint: "बल का पर्यायवाची शब्द।", level: 1 },
    { id: "hin-ekta.kahani-katha.i04", type: "tf", q: "चारों बेटे लकड़ियों का गट्ठर तोड़ने में सफल रहे।", answer: false, explain: "वे असफल रहे। The tied bundle did not break — that failure is the point of the story.", level: 1 },
    { id: "hin-ekta.kahani-katha.i05", type: "mcq", q: "किसान अपने बेटों से परेशान क्यों था?", options: ["वे पढ़ाई नहीं करते थे", "वे हमेशा झगड़ते रहते थे", "वे खेत में काम नहीं करते थे", "वे गाँव छोड़कर चले गए थे"], answer: 1, explain: "वे हमेशा झगड़ते रहते थे और समझाने का कोई असर न होता था।", level: 1 },
    { id: "hin-ekta.kahani-katha.i06", type: "fill", q: "लकड़ियों के बँधे हुए बंडल को कहानी में क्या कहा गया है?", accept: ["गट्ठर", "गटठर"], placeholder: "एक शब्द", explain: "गट्ठर (gatthar) = bundle. आपकी वर्क बुक में यह गटठर छपा है, पर सही वर्तनी गट्ठर है।", hint: "पन्ने के चित्र में आदमी इसे पकड़े हुए है।", level: 2 },
    { id: "hin-ekta.kahani-katha.i07", type: "shortAnswer", q: "किसान ने अपने बेटों को क्या सीख दी? दो वाक्यों में लिखो।", model: "किसान ने अपने बेटों को सीख दी कि जब तक वे मिलजुलकर रहेंगे, उन्हें कोई हरा नहीं सकता। अलग-अलग रहने पर वे अकेली लकड़ी की तरह कमज़ोर हो जाएँगे।", must: ["मिलजुलकर रहने की बात कही है", "कोई हरा नहीं सकता — यह लिखा है", "अकेले होने पर कमज़ोरी का ज़िक्र है"], lines: 3, explain: "The answer must contain both halves: together = strong, alone = weak.", level: 2 },
    { id: "hin-ekta.kahani-katha.i08", type: "shortAnswer", q: "किसान ने बेटों को एक-एक लकड़ी क्यों पकड़ाई?", model: "किसान ने बेटों को एक-एक लकड़ी इसलिए पकड़ाई ताकि वे देख सकें कि अकेली लकड़ी आसानी से टूट जाती है, पर बँधी हुई लकड़ियों को कोई नहीं तोड़ पाता।", must: ["अकेली लकड़ी आसानी से टूटती है — यह कहा है", "बँधी लकड़ियाँ नहीं टूटतीं — यह कहा है", "कारण के रूप में लिखा है, केवल घटना नहीं"], lines: 3, explain: "Answer the क्यों. Do not just describe what happened; give the reason.", level: 3 },
    { id: "hin-ekta.kahani-katha.i09", type: "mcq", q: "कहानी का शीर्षक एकता में बल है का अर्थ क्या है?", options: ["अकेले रहने में ताकत है", "मिलकर रहने में ताकत है", "लकड़ी में ताकत है", "किसान में ताकत है"], answer: 1, explain: "एकता (ekta) = unity, बल (bal) = strength. शीर्षक और सीख दोनों एक ही बात कहते हैं।", level: 2 },
    { id: "hin-ekta.kahani-katha.i10", type: "tap", q: "इस वाक्य में कहानी के पात्रों को दबाओ।", tokens: [ { t: "गाँव" }, { t: "में" }, { t: "किसान", ok: true }, { t: "और" }, { t: "उसके" }, { t: "चार" }, { t: "बेटे", ok: true }, { t: "रहते" }, { t: "थे" } ], explain: "पात्र (characters) are the people in the story — यहाँ किसान और उसके बेटे। गाँव जगह है, पात्र नहीं।", level: 2 },
    { id: "hin-ekta.kahani-katha.i11", type: "mcq", q: "कहानी में किसान के समझाने का बेटों पर क्या हुआ?", options: ["कोई असर न होता", "वे तुरंत मान जाते", "वे रोने लगते", "वे गाँव छोड़ देते"], answer: 0, explain: "किसान उन्हें बहुत समझाता पर बेटों पर कोई असर न होता — इसलिए उसे लकड़ियों वाला तरीका सोचना पड़ा।", level: 2 },
    { id: "hin-ekta.kahani-katha.i12", type: "shortAnswer", q: "एकता में बल है कहानी को अपने शब्दों में चार से पाँच वाक्यों में लिखो।", model: "किसी गाँव में एक किसान रहता था। उसके चार बेटे थे जो हमेशा झगड़ते रहते थे। एक दिन किसान ने चारों को बुलाकर लकड़ियों का गट्ठर तोड़ने को कहा, पर वे असफल रहे। फिर किसान ने उन्हें एक-एक लकड़ी पकड़ाई और चारों ने उसे आसानी से तोड़ दी। किसान ने समझाया कि मिलजुलकर रहोगे तो तुम्हें कोई हरा नहीं सकता। ( सीख - एकता में बड़ी ताकत होती है )", must: ["किसान और उसके चार झगड़ालू बेटों से शुरू किया है", "गट्ठर तोड़ने में असफल रहे — यह लिखा है", "एक-एक लकड़ी आसानी से टूट गई — यह लिखा है", "अंत में सीख लिखी है"], lines: 6, explain: "Full कहानी लेखन answer: events in order, then the सीख in brackets. The सीख is a separate mark.", level: 3 },
    { id: "hin-ekta.kahani-katha.i13", type: "tf", q: "कहानी लेखन का उत्तर लिखते समय सीख लिखना ज़रूरी नहीं है।", answer: false, explain: "सीख ज़रूरी है। आपकी वर्क बुक में भी वह कोष्ठक में छपी है — ( सीख - एकता में बड़ी ताकत होती है )।", level: 2 },
    { id: "hin-ekta.kahani-katha.i14", type: "speak", q: "सीख को ज़ोर से पढ़ो, फिर 🔊 दबाकर जाँचो।", text: "एकता में बड़ी ताकत होती है।", lang: "hi-IN", explain: "Say it out loud three times and it will be there in the exam hall.", level: 1 },
    { id: "hin-ekta.kahani-katha.i15", type: "mcq", q: "नीचे दिए गए में से कौन-सी सीख इस कहानी से मेल नहीं खाती?", options: ["मिलजुलकर रहना चाहिए", "एकता में बल है", "अकेले रहने में ही भलाई है", "झगड़ने से नुकसान होता है"], answer: 2, explain: "कहानी अकेले रहने के खिलाफ है। अकेली लकड़ी ही सबसे पहले टूटती है।", level: 3 }
  ]
},

{
  id: "hin-ekta.ling-pehchan",
  subject: "hindi",
  topic: "hin-ekta",
  name: "पुल्लिंग या स्त्रीलिंग पहचानो",
  canDo: "I can look at a Hindi word and say whether it is पुल्लिंग or स्त्रीलिंग.",
  weight: 5,
  difficulty: 1,
  prereq: [],
  teach: {
    hook: "In Hindi every single word has a gender. Not just people and animals — a fan, a chair, the moon, a bedbug. Get the gender right and the rest of the sentence falls into place.",
    explain: "<p><strong>लिंग</strong> (ling) means <strong>gender</strong>. Hindi has exactly two: <strong>पुल्लिंग</strong> (pullingg) = masculine, and <strong>स्त्रीलिंग</strong> (streeling) = feminine. Your workbook page 13 shows this with a boy's face over पुल्लिंग and a girl's face over स्त्रीलिंग.</p><p>शब्द के जिस रूप से पुरुष जाति का बोध होता है, उसे <strong>पुल्लिंग</strong> कहते हैं। शब्द के जिस रूप से स्त्री जाति का बोध होता है, उसे <strong>स्त्रीलिंग</strong> कहते हैं।</p><p>For people and animals you can often just think about the meaning: लड़का is a boy so पुल्लिंग, लड़की is a girl so स्त्रीलिंग. For objects there is no boy or girl to look at, so you learn them. Your workbook already gave you sixteen of them on page 14.</p><p><strong>पुल्लिंग:</strong> कवि, घर, पानी, अमरूद, चंद्रमा, खटमल, मार्च, पंखा<br><strong>स्त्रीलिंग:</strong> पंजाबी, यमुना, मिर्ची, माला, आँधी, संस्कृत, गिलहरी, कुर्सी</p>",
    worked: [
      {
        q: "गिलहरी पुल्लिंग है या स्त्रीलिंग?",
        steps: [
          "गिलहरी (gilahri) means squirrel.",
          "Test it in a sentence: गिलहरी पेड़ पर चढ़ <strong>रही</strong> है। We say रही, not रहा.",
          "The verb takes the ई sound, so the word is feminine.",
          "गिलहरी = स्त्रीलिंग."
        ],
        a: "स्त्रीलिंग"
      },
      {
        q: "पंखा पुल्लिंग है या स्त्रीलिंग?",
        steps: [
          "पंखा (pankha) means fan.",
          "Sentence test: पंखा चल <strong>रहा</strong> है। We say रहा, not रही.",
          "The verb takes the आ sound, so the word is masculine.",
          "पंखा = पुल्लिंग."
        ],
        a: "पुल्लिंग"
      }
    ],
    remember: [
      "Two genders only: पुल्लिंग (masculine) और स्त्रीलिंग (feminine). There is no third box.",
      "Sentence test: say it with रहा है / रही है. रहा means पुल्लिंग, रही means स्त्रीलिंग.",
      "Page-14 पुल्लिंग eight: कवि, घर, पानी, अमरूद, चंद्रमा, खटमल, मार्च, पंखा.",
      "Page-14 स्त्रीलिंग eight: पंजाबी, यमुना, मिर्ची, माला, आँधी, संस्कृत, गिलहरी, कुर्सी."
    ],
    watchOut: "A word goes in ONE list only, never both. 16 words in the box means 8 + 8, not 17 answers."
  },
  items: [
    { id: "hin-ekta.ling-pehchan.i01", type: "mcq", q: "लिंग के कितने भेद होते हैं?", options: ["एक", "दो", "तीन", "चार"], answer: 1, explain: "दो — पुल्लिंग और स्त्रीलिंग। आपकी वर्क बुक के पन्ने पर भी यही दो नाम छपे हैं।", level: 1 },
    { id: "hin-ekta.ling-pehchan.i02", type: "bucket", q: "पन्ना १४ के शब्दों को सही लिंग में छाँटो।", buckets: ["पुल्लिंग", "स्त्रीलिंग"], chips: [ { t: "कवि", b: "पुल्लिंग" }, { t: "घर", b: "पुल्लिंग" }, { t: "पानी", b: "पुल्लिंग" }, { t: "अमरूद", b: "पुल्लिंग" }, { t: "पंजाबी", b: "स्त्रीलिंग" }, { t: "यमुना", b: "स्त्रीलिंग" }, { t: "मिर्ची", b: "स्त्रीलिंग" }, { t: "माला", b: "स्त्रीलिंग" } ], explain: "पानी पुल्लिंग है — पानी गिर रहा है। पंजाबी एक भाषा है और सब भाषाएँ स्त्रीलिंग होती हैं।", level: 2 },
    { id: "hin-ekta.ling-pehchan.i03", type: "bucket", q: "बाकी आठ शब्दों को छाँटो।", buckets: ["पुल्लिंग", "स्त्रीलिंग"], chips: [ { t: "चंद्रमा", b: "पुल्लिंग" }, { t: "खटमल", b: "पुल्लिंग" }, { t: "मार्च", b: "पुल्लिंग" }, { t: "पंखा", b: "पुल्लिंग" }, { t: "आँधी", b: "स्त्रीलिंग" }, { t: "संस्कृत", b: "स्त्रीलिंग" }, { t: "गिलहरी", b: "स्त्रीलिंग" }, { t: "कुर्सी", b: "स्त्रीलिंग" } ], explain: "मार्च एक महीना है और सब महीने पुल्लिंग होते हैं। संस्कृत भाषा है, इसलिए स्त्रीलिंग।", level: 2 },
    { id: "hin-ekta.ling-pehchan.i04", type: "mcq", q: "इनमें से कौन-सा शब्द स्त्रीलिंग है?", options: ["खटमल", "चंद्रमा", "आँधी", "अमरूद"], answer: 2, explain: "आँधी (aandhi) = storm, स्त्रीलिंग। आँधी आ रही है — रही से पता चलता है।", level: 1 },
    { id: "hin-ekta.ling-pehchan.i05", type: "mcq", q: "इनमें से कौन-सा शब्द पुल्लिंग है?", options: ["कुर्सी", "गिलहरी", "माला", "कवि"], answer: 3, explain: "कवि (kavi) = poet, पुल्लिंग। कुर्सी, गिलहरी और माला तीनों स्त्रीलिंग हैं।", level: 1 },
    { id: "hin-ekta.ling-pehchan.i06", type: "tf", q: "पानी स्त्रीलिंग शब्द है।", answer: false, explain: "पानी पुल्लिंग है। पानी ठंडा है, पानी गिर रहा है — दोनों में पुल्लिंग रूप आता है।", hint: "बोलकर देखो — पानी ठंडा है या पानी ठंडी है?", level: 2 },
    { id: "hin-ekta.ling-pehchan.i07", type: "fill", q: "कुर्सी का लिंग लिखो।", accept: ["स्त्रीलिंग"], placeholder: "पुल्लिंग / स्त्रीलिंग", explain: "कुर्सी स्त्रीलिंग है — कुर्सी टूट गई है, न कि टूट गया है।", level: 1 },
    { id: "hin-ekta.ling-pehchan.i08", type: "fill", q: "चंद्रमा का लिंग लिखो।", accept: ["पुल्लिंग"], placeholder: "पुल्लिंग / स्त्रीलिंग", explain: "चंद्रमा पुल्लिंग है — चंद्रमा निकल आया है।", level: 1 },
    { id: "hin-ekta.ling-pehchan.i09", type: "multi", q: "हर स्त्रीलिंग शब्द चुनो।", options: ["मिर्ची", "घर", "यमुना", "पंखा", "संस्कृत"], answer: [0, 2, 4], explain: "मिर्ची मसाला है, यमुना नदी है, संस्कृत भाषा है — तीनों स्त्रीलिंग। घर और पंखा पुल्लिंग हैं।", level: 2 },
    { id: "hin-ekta.ling-pehchan.i10", type: "tap", q: "इस वाक्य में हर पुल्लिंग शब्द दबाओ।", tokens: [ { t: "कवि", ok: true }, { t: "ने" }, { t: "कुर्सी" }, { t: "पर" }, { t: "बैठकर" }, { t: "पानी", ok: true }, { t: "पिया" } ], explain: "कवि और पानी दोनों पुल्लिंग हैं। कुर्सी स्त्रीलिंग है।", level: 2 },
    { id: "hin-ekta.ling-pehchan.i11", type: "mcq", q: "किसी शब्द का लिंग जाँचने का सबसे तेज़ तरीका क्या है?", options: ["शब्द के अक्षर गिनो", "शब्द को रहा है / रही है के साथ बोलो", "शब्द का पहला अक्षर देखो", "शब्द की लंबाई देखो"], answer: 1, explain: "बोलकर देखना सबसे भरोसेमंद है। पंखा चल रहा है — पुल्लिंग। आँधी आ रही है — स्त्रीलिंग।", level: 2 },
    { id: "hin-ekta.ling-pehchan.i12", type: "tf", q: "जो शब्द ई की मात्रा पर खत्म होता है, वह हमेशा स्त्रीलिंग होता है।", answer: false, explain: "ऐसा नहीं है। पानी, धोबी और कवि सब ई या इ पर खत्म होते हैं पर पुल्लिंग हैं। मात्रा नहीं, अर्थ और वाक्य देखो।", level: 3 },
    { id: "hin-ekta.ling-pehchan.i13", type: "mcq", q: "एक बच्चे ने १६ शब्दों की सूची बनाई और कुल १७ शब्द लिख दिए। सबसे संभावित गलती क्या है?", options: ["उसने एक शब्द छोड़ दिया", "उसने एक शब्द दोनों सूचियों में लिख दिया", "उसने एक नया शब्द बना लिया", "उसने शब्द उलटे लिख दिए"], answer: 1, explain: "एक शब्द दोनों बॉक्स में चला गया। एक शब्द का एक ही लिंग होता है, इसलिए हर शब्द केवल एक सूची में जाएगा।", level: 3 },
    { id: "hin-ekta.ling-pehchan.i14", type: "match", q: "शब्द और उसका अर्थ मिलाओ, फिर याद रखो कि उसका लिंग क्या है।", pairs: [ { l: "खटमल", r: "bedbug (पुल्लिंग)" }, { l: "गिलहरी", r: "squirrel (स्त्रीलिंग)" }, { l: "अमरूद", r: "guava (पुल्लिंग)" }, { l: "माला", r: "garland (स्त्रीलिंग)" }, { l: "आँधी", r: "storm (स्त्रीलिंग)" } ], explain: "अर्थ के साथ लिंग याद करो, तो परीक्षा में दोनों एक साथ आ जाएँगे।", level: 2 },
    { id: "hin-ekta.ling-pehchan.i15", type: "fill", q: "मार्च का लिंग लिखो।", accept: ["पुल्लिंग"], placeholder: "पुल्लिंग / स्त्रीलिंग", explain: "मार्च महीना है और सब महीने पुल्लिंग होते हैं — मार्च आ गया।", hint: "यह एक महीना है।", level: 2 },
    { id: "hin-ekta.ling-pehchan.i16", type: "bucket", q: "इन शब्दों को छाँटो। सावधान — कुछ शब्द उलझाने वाले हैं।", buckets: ["पुल्लिंग", "स्त्रीलिंग"], chips: [ { t: "पानी", b: "पुल्लिंग" }, { t: "पंजाबी", b: "स्त्रीलिंग" }, { t: "कवि", b: "पुल्लिंग" }, { t: "मिर्ची", b: "स्त्रीलिंग" }, { t: "मार्च", b: "पुल्लिंग" }, { t: "संस्कृत", b: "स्त्रीलिंग" } ], explain: "पानी, कवि और मार्च पुल्लिंग। पंजाबी और संस्कृत भाषाएँ हैं, मिर्ची मसाला है — तीनों स्त्रीलिंग।", level: 3 }
  ]
},

{
  id: "hin-ekta.ling-jode",
  subject: "hindi",
  topic: "hin-ekta",
  name: "लिंग बदलो — जोड़े बनाओ",
  canDo: "I can change a पुल्लिंग word into its स्त्रीलिंग partner and back again.",
  weight: 5,
  difficulty: 2,
  prereq: ["hin-ekta.ling-pehchan"],
  teach: {
    hook: "राजा becomes रानी. लड़का becomes लड़की. Once you spot the ending that changes, you can do a whole exam question in under a minute.",
    explain: "<p><strong>लिंग के जोड़े</strong> (ling ke jode) = gender pairs. A masculine word and its feminine partner: लड़का – लड़की, राजा – रानी.</p><p>Most pairs follow one of four endings:</p><ul><li>आ becomes ई — लड़का → लड़की, दादा → दादी, चूहा → चुहिया (this one also loses its ऊ)</li><li>add इका — अध्यापक → अध्यापिका, गायक → गायिका, शिक्षक → शिक्षिका</li><li>add नी or आनी — शेर → शेरनी, मोर → मोरनी, हिरन → हिरनी, सेठ → सेठानी</li><li>add आनी or इन for workers — नौकर → नौकरानी, ग्वाला → ग्वालिन, धोबी → धोबिन</li></ul><p>Some pairs are completely different words and just have to be learnt: आदमी – औरत, भाई – बहन, दोस्त – सहेली, बैल – गाय, पिता – माता.</p>",
    worked: [
      {
        q: "अध्यापक का स्त्रीलिंग रूप लिखो।",
        steps: [
          "अध्यापक (adhyaapak) = male teacher. Break it: अ + ध्या + प + क.",
          "The rule for words ending in क is to add इका.",
          "क + इका gives पिका, so अध्या + पिका.",
          "Write it carefully: अ ध् या प ि क ा — the ध् sits joined to या.",
          "अध्यापिका."
        ],
        a: "अध्यापिका"
      },
      {
        q: "चूहा का स्त्रीलिंग रूप लिखो।",
        steps: [
          "चूहा (chooha) = male mouse.",
          "This is not a plain आ → ई word. The ऊ shortens to उ.",
          "चूहा → चुहिया. The ending becomes इया.",
          "In the workbook sentence: चुहिया अपनी बिल में जा छुपी है।"
        ],
        a: "चुहिया"
      }
    ],
    remember: [
      "आ → ई : लड़का-लड़की, दादा-दादी, नाना-नानी.",
      "क → इका : अध्यापक-अध्यापिका, गायक-गायिका, शिक्षक-शिक्षिका.",
      "जानवर के लिए नी : शेर-शेरनी, मोर-मोरनी, हिरन-हिरनी.",
      "सीखने वाले जोड़े: आदमी-औरत, भाई-बहन, दोस्त-सहेली, बैल-गाय."
    ],
    watchOut: "अध्यापक is the MAN and अध्यापिका is the WOMAN. The extra इ is the woman. Mixing these two up is the easiest way to lose an easy mark."
  },
  items: [
    { id: "hin-ekta.ling-jode.i01", type: "match", q: "पन्ना १३ के जोड़े मिलाओ।", pairs: [ { l: "लड़का", r: "लड़की" }, { l: "अध्यापक", r: "अध्यापिका" }, { l: "दादाजी", r: "दादीजी" }, { l: "राजा", r: "रानी" }, { l: "पिताजी", r: "माताजी" } ], explain: "यही पाँच जोड़े आपकी वर्क बुक के पन्ने १३ पर चित्रों के नीचे थे।", level: 1 },
    { id: "hin-ekta.ling-jode.i02", type: "fill", q: "लड़का का स्त्रीलिंग रूप लिखो।", accept: ["लड़की"], placeholder: "एक शब्द", explain: "आ की मात्रा हटी, ई की मात्रा लगी — लड़का → लड़की। ड़ में नुक्ता ज़रूर लगाओ।", level: 1 },
    { id: "hin-ekta.ling-jode.i03", type: "fill", q: "अध्यापक का स्त्रीलिंग रूप लिखो।", accept: ["अध्यापिका"], placeholder: "एक शब्द", explain: "क से पहले इ की मात्रा जोड़ो — अध्यापक → अध्यापिका। यही रूप आपकी वर्क बुक में लाल पेन से ठीक किया गया था।", hint: "क वाले शब्दों में इका जुड़ता है।", level: 2 },
    { id: "hin-ekta.ling-jode.i04", type: "fill", q: "अध्यापिका का पुल्लिंग रूप लिखो।", accept: ["अध्यापक"], placeholder: "एक शब्द", explain: "इ की मात्रा हटा दो — अध्यापिका → अध्यापक। पुल्लिंग रूप छोटा होता है।", hint: "उलटी दिशा में सोचो — कौन-सी मात्रा हटानी है?", level: 2 },
    { id: "hin-ekta.ling-jode.i05", type: "fillMulti", q: "स्त्रीलिंग रूप लिखो।", blanks: [ { label: "राजा", accept: ["रानी"] }, { label: "गायक", accept: ["गायिका"] }, { label: "सेठ", accept: ["सेठानी"] }, { label: "नौकर", accept: ["नौकरानी"] } ], explain: "राजा-रानी अलग शब्द है। गायक में इका जुड़ा, सेठ और नौकर में आनी जुड़ा।", level: 2 },
    { id: "hin-ekta.ling-jode.i06", type: "fillMulti", q: "स्त्रीलिंग रूप लिखो।", blanks: [ { label: "शेर", accept: ["शेरनी"] }, { label: "मोर", accept: ["मोरनी"] }, { label: "हिरन", accept: ["हिरनी"] } ], explain: "जानवरों में अक्सर नी जुड़ता है — शेरनी, मोरनी, हिरनी। यही तीनों शब्द आपकी वर्क बुक के प्रश्न ४ में थे।", level: 2 },
    { id: "hin-ekta.ling-jode.i07", type: "mcq", q: "चूहा का स्त्रीलिंग रूप क्या है?", options: ["चूही", "चुहिया", "चूहानी", "चूही जी"], answer: 1, explain: "चूहा → चुहिया। ऊ छोटी होकर उ बनती है और इया जुड़ता है। वर्क बुक का वाक्य — चुहिया अपनी बिल में जा छुपी है।", level: 2 },
    { id: "hin-ekta.ling-jode.i08", type: "mcq", q: "डिब्बा का स्त्रीलिंग रूप क्या है?", options: ["डिब्बी", "डिबिया", "डिब्बानी", "डिब्बिका"], answer: 1, explain: "डिब्बा → डिबिया। यह भी इया वाला जोड़ा है, जैसे चूहा-चुहिया।", level: 3 },
    { id: "hin-ekta.ling-jode.i09", type: "match", q: "इन जोड़ों को मिलाओ। ये पूरी तरह अलग शब्द हैं।", pairs: [ { l: "आदमी", r: "औरत" }, { l: "भाई", r: "बहन" }, { l: "दोस्त", r: "सहेली" }, { l: "बैल", r: "गाय" }, { l: "पिता", r: "माता" } ], explain: "इनमें कोई मात्रा नहीं बदलती, शब्द ही बदल जाता है। इन्हें रटना पड़ता है।", level: 2 },
    { id: "hin-ekta.ling-jode.i10", type: "fill", q: "चिड़िया का पुल्लिंग रूप लिखो।", accept: ["चिड़ा"], placeholder: "एक शब्द", explain: "चिड़िया → चिड़ा। वर्क बुक का वाक्य — चिड़ा पानी पी रहा है। रहा से पता चलता है कि शब्द पुल्लिंग है।", hint: "वर्क बुक के प्रश्न ३ में यह शब्द आया था।", level: 2 },
    { id: "hin-ekta.ling-jode.i11", type: "tf", q: "अध्यापिका पुरुष शिक्षक के लिए इस्तेमाल होता है।", answer: false, explain: "नहीं। अध्यापिका महिला शिक्षक है, अध्यापक पुरुष शिक्षक है। इ की मात्रा स्त्रीलिंग की पहचान है।", level: 2 },
    { id: "hin-ekta.ling-jode.i12", type: "mcq", q: "सोनम ने लिखा — मेरी अध्यापक कक्षा में आई। गलती क्या है?", options: ["आई की जगह आया होना चाहिए", "अध्यापक की जगह अध्यापिका होना चाहिए", "मेरी की जगह मेरा होना चाहिए", "कोई गलती नहीं है"], answer: 1, explain: "मेरी और आई दोनों स्त्रीलिंग हैं, इसलिए शब्द भी स्त्रीलिंग चाहिए — मेरी अध्यापिका कक्षा में आई।", level: 3 },
    { id: "hin-ekta.ling-jode.i13", type: "fillMulti", q: "पुल्लिंग रूप लिखो।", blanks: [ { label: "शिक्षिका", accept: ["शिक्षक"] }, { label: "ग्वालिन", accept: ["ग्वाला"] }, { label: "नौकरानी", accept: ["नौकर"] }, { label: "सहेली", accept: ["दोस्त"] } ], explain: "शिक्षिका → शिक्षक (इ हटी), ग्वालिन → ग्वाला, नौकरानी → नौकर, और सहेली का जोड़ा दोस्त है।", level: 3 },
    { id: "hin-ekta.ling-jode.i14", type: "bucket", q: "हर शब्द को उसके लिंग में डालो।", buckets: ["पुल्लिंग", "स्त्रीलिंग"], chips: [ { t: "अध्यापक", b: "पुल्लिंग" }, { t: "अध्यापिका", b: "स्त्रीलिंग" }, { t: "गायिका", b: "स्त्रीलिंग" }, { t: "सेठ", b: "पुल्लिंग" }, { t: "चुहिया", b: "स्त्रीलिंग" }, { t: "डिब्बा", b: "पुल्लिंग" }, { t: "मोरनी", b: "स्त्रीलिंग" }, { t: "बैल", b: "पुल्लिंग" } ], explain: "इ, ई, नी, आनी और इया वाले रूप यहाँ स्त्रीलिंग हैं। अध्यापक और अध्यापिका को एक साथ देखो और अंतर पकड़ो।", level: 2 },
    { id: "hin-ekta.ling-jode.i15", type: "order", q: "इन जोड़ों को वैसे क्रम में लगाओ जैसे वे वर्क बुक के पन्ने १३ पर थे।", answer: ["लड़का - लड़की", "अध्यापक - अध्यापिका", "दादाजी - दादीजी", "राजा - रानी", "पिताजी - माताजी"], explain: "यही क्रम आपके वर्क बुक के चित्रों का था — बच्चे, शिक्षक, दादा-दादी, राजा-रानी, माता-पिता।", level: 1 },
    { id: "hin-ekta.ling-jode.i16", type: "fill", q: "दादाजी का स्त्रीलिंग रूप लिखो।", accept: ["दादीजी", "दादी जी"], placeholder: "एक शब्द", explain: "दादाजी → दादीजी। आ की मात्रा ई बन गई और जी वैसा ही रहा।", level: 1 }
  ]
}

]);
