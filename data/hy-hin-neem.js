/* ============================================================
   HALF-YEARLY HQ — हिंदी · नीम (कविता)
   Source: Hindi class notebook, 5 handwritten pages (Note Book /
   Neem). The poem is copied there in full on pages 4-5.

   कवि: हरीश निगम.  14 lines (7 couplets); every single line ends
   with the word नीम, which is the poem's defining feature and an
   easy exam question.

   All शब्दार्थ, विलोम, पर्यायवाची and प्रश्न-उत्तर below are
   exactly as the teacher ticked them in the notebook. The school
   answers "क्यों" questions with the frame
        "... इसलिए ... क्योंकि ..."
   and restates the words of the question inside the answer. That
   pattern is drilled here because it is what earns the marks.

   Targeted at his marked errors:
     · रोग written as शोग / शेग  (teacher wrote रोग in red)
     · सीखाता written for सिखाता  (ि not ी)
     · the missing से in "लेता नहीं किसी से कुछ भी,"
   ============================================================ */
window.HY_TOPICS = (window.HY_TOPICS || []).concat([{
  id: 'hin-neem',
  subject: 'hindi',
  name: 'नीम',
  emoji: '🌳',
  blurb: 'कविता, शब्दार्थ, विलोम, पर्यायवाची और प्रश्न-उत्तर।',
  source: 'हिंदी कॉपी — 5 pages (कविता पूरी लिखी हुई)',
  examWeight: 20
}]);

window.HY_SKILLS = (window.HY_SKILLS || []).concat([

  /* ---------------------------------------------------------- */
  {
    id: 'hin-neem.kavita',
    subject: 'hindi', topic: 'hin-neem',
    name: 'कविता · the poem',
    canDo: 'I can recite the poem, complete any line, and name the poet.',
    weight: 5, difficulty: 2,
    prereq: [],
    teach: {
      hook: 'हर पंक्ति का आखिरी शब्द एक ही है — नीम। Once you spot that, half the poem remembers itself.',
      explain:
        '<p>कविता का नाम <strong>नीम</strong> है और कवि का नाम <strong>हरीश निगम</strong> (Harish Nigam) है।</p>' +
        '<p>कविता में <strong>14 पंक्तियाँ</strong> हैं — 7 जोड़े (couplets). हर पंक्ति <strong>नीम</strong> शब्द पर खत्म होती है।</p>' +
        '<p>The poem says the neem tree gives everything and takes nothing: it cleans dirty air, drives away illness, loves the birds, and even though its body (तन) is bitter, it teaches us to keep our mind (मन) sweet.</p>',
      worked: [
        {
          q: 'पंक्ति पूरी करो: "नहीं डॉक्टर फिर भी देखो, कितने ____ भगाता नीम।"',
          steps: [
            'The line before it says the neem is not a doctor.',
            'फिर भी — even so — it drives something away.',
            'What does a doctor drive away? Illnesses — <strong>रोग</strong>.'
          ],
          a: 'रोग'
        }
      ],
      remember: [
        'कविता — नीम · कवि — हरीश निगम।',
        '14 पंक्तियाँ, हर पंक्ति के अंत में "नीम"।',
        'मुख्य भाव: नीम देता ही देता है, लेता कुछ नहीं।'
      ],
      watchOut: 'कवि का नाम पूछा जा सकता है। हरीश निगम — दोनों शब्द याद रखो।'
    },
    items: [
      { id: 'hin-neem.kavita.i01', type: 'fill', q: 'इस कविता के कवि का नाम क्या है?', accept: ['हरीश निगम', 'हरीश निगम।'], lang: 'hi-IN', level: 1, explain: 'कवि — <strong>हरीश निगम</strong>। कविता के अंत में दिया गया है।' },
      { id: 'hin-neem.kavita.i02', type: 'fill', q: 'कविता का नाम क्या है?', accept: ['नीम'], lang: 'hi-IN', level: 1, explain: 'कविता का नाम <strong>नीम</strong> है।' },
      { id: 'hin-neem.kavita.i03', type: 'fill', q: 'पंक्ति पूरी करो: "नहीं डॉक्टर फिर भी देखो, कितने ____ भगाता नीम।"', accept: ['रोग'], lang: 'hi-IN', level: 2, hint: 'डॉक्टर किसे भगाता है?', explain: '<strong>रोग</strong> — बीमारी। ध्यान दो: <strong>र</strong>ोग, श नहीं। तुमने पहले "शोग" लिखा था।' },
      { id: 'hin-neem.kavita.i04', type: 'fill', q: 'पंक्ति पूरी करो: "चले प्रदूषित वायु कभी तो, उसको ____ बनाता नीम।"', accept: ['शुद्ध'], lang: 'hi-IN', level: 2, explain: '<strong>शुद्ध</strong> — साफ। नीम गंदी हवा को साफ कर देता है।' },
      { id: 'hin-neem.kavita.i05', type: 'fill', q: 'पंक्ति पूरी करो: "कड़वे तन में मन को मीठा, रखना हमें ____ नीम।"', accept: ['सिखाता'], lang: 'hi-IN', level: 3, hint: 'सिखाना = to teach. छोटी ि।', explain: '<strong>सिखाता</strong> — छोटी ि से। "सीखाता" गलत है। सीखना = to learn, सिखाना = to teach.' },
      { id: 'hin-neem.kavita.i06', type: 'fill', q: 'पंक्ति पूरी करो: "लेता नहीं किसी ____ कुछ भी, पर कितना दे जाता नीम।"', accept: ['से'], lang: 'hi-IN', level: 3, hint: 'एक छोटा शब्द छूट गया था।', explain: '<strong>से</strong>। पूरी पंक्ति: "लेता नहीं किसी <strong>से</strong> कुछ भी,"। तुम्हारी कॉपी में यही शब्द छूटा था।' },
      { id: 'hin-neem.kavita.i07', type: 'order', q: 'पंक्ति को सही क्रम में लगाओ।', answer: ['अपना', 'नेह', 'जताता', 'नीम।'], level: 2, explain: '"अपना नेह जताता नीम।" — नीम सब पक्षियों से प्रेम जताता है।' },
      { id: 'hin-neem.kavita.i08', type: 'mcq', q: 'कविता की हर पंक्ति के अंत में कौन-सा शब्द आता है?', options: ['पेड़', 'नीम', 'हवा', 'मन'], answer: 1, level: 1, explain: 'हर पंक्ति <strong>नीम</strong> पर खत्म होती है — यही इस कविता की खास बात है।' },
      { id: 'hin-neem.kavita.i09', type: 'speak', q: 'यह पंक्ति ज़ोर से पढ़ो, फिर 🔊 दबाकर जाँचो।', text: 'लहराता-बलखाता नीम, दिनभर हँसता-गाता नीम।', lang: 'hi-IN', level: 1, explain: 'कविता की पहली दो पंक्तियाँ।' },
      { id: 'hin-neem.kavita.i10', type: 'speak', q: 'यह पंक्ति ज़ोर से पढ़ो, फिर 🔊 दबाकर जाँचो।', text: 'कड़वे तन में मन को मीठा, रखना हमें सिखाता नीम।', lang: 'hi-IN', level: 2, explain: 'यही कविता की सबसे ज़रूरी पंक्ति है — इसी से शिक्षा निकलती है।' },
      { id: 'hin-neem.kavita.i11', type: 'order', q: 'पंक्ति को सही क्रम में लगाओ।', answer: ['चिड़िया,', 'कौआ,', 'तोता', 'सबसे,'], level: 2, explain: '"चिड़िया, कौआ, तोता सबसे, अपना नेह जताता नीम।"' },
      { id: 'hin-neem.kavita.i12', type: 'fill', q: 'कविता में कितनी पंक्तियाँ हैं?', accept: ['14', 'चौदह'], level: 3, explain: '14 पंक्तियाँ — यानी 7 जोड़े।' },
      { id: 'hin-neem.kavita.i13', type: 'mcq', q: '"हवा चले तो झूम-झूमके, सब का मन ____ नीम।" खाली जगह भरो।', options: ['भगाता', 'बहलाता', 'बनाता', 'जताता'], answer: 1, level: 3, explain: '<strong>बहलाता</strong> — मन बहलाना = to cheer someone up.' },
      { id: 'hin-neem.kavita.i14', type: 'shortAnswer', q: 'अपने शब्दों में लिखो: यह कविता हमें क्या सिखाती है?', lang: 'hi-IN', lines: 3, model: 'यह कविता हमें सिखाती है कि नीम का पेड़ सबको कुछ न कुछ देता है और बदले में किसी से कुछ नहीं लेता। नीम कड़वे तन में भी मन को मीठा रखना सिखाता है।', must: ['नीम देता है, लेता कुछ नहीं', 'कड़वे तन में मन मीठा रखना', 'पूरे वाक्य में लिखा है'], level: 3, explain: 'मुख्य भाव: देना और मीठा मन।' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'hin-neem.shabdarth',
    subject: 'hindi', topic: 'hin-neem',
    name: 'शब्दार्थ',
    canDo: 'I know the meaning of नेह, रोग and शुद्ध as the notes give them.',
    weight: 4, difficulty: 1,
    prereq: [],
    teach: {
      hook: 'तीन शब्द — बस तीन। कॉपी में यही तीन दिए गए हैं, और परीक्षा में यही पूछे जाएँगे।',
      explain:
        '<p>कॉपी के शब्दार्थ, जैसे लिखे हैं:</p>' +
        '<ul>' +
        '<li><strong>नेह</strong> (neh) = <strong>प्रेम</strong> — love</li>' +
        '<li><strong>रोग</strong> (rog) = <strong>बीमारी</strong> — illness</li>' +
        '<li><strong>शुद्ध</strong> (shuddh) = <strong>साफ</strong> — clean, pure</li>' +
        '</ul>' +
        '<p>शब्दार्थ हमेशा इसी रूप में लिखो: <em>शब्द – अर्थ</em>.</p>',
      worked: [
        {
          q: '"अपना नेह जताता नीम।" — यहाँ नेह का अर्थ क्या है?',
          steps: [
            'नीम पक्षियों के साथ कुछ जता रहा है।',
            'कॉपी में लिखा है: नेह = प्रेम।',
            'तो नीम अपना प्रेम दिखाता है।'
          ],
          a: 'प्रेम'
        }
      ],
      remember: [
        'नेह = प्रेम',
        'रोग = बीमारी',
        'शुद्ध = साफ'
      ],
      watchOut: 'रोग में <strong>र</strong> है, <strong>श</strong> नहीं। तुमने कॉपी में "शोग" लिखा था और मैडम ने लाल पेन से ठीक किया था।'
    },
    items: [
      { id: 'hin-neem.shabdarth.i01', type: 'match', q: 'शब्द और अर्थ मिलाओ।', pairs: [{ l: 'नेह', r: 'प्रेम' }, { l: 'रोग', r: 'बीमारी' }, { l: 'शुद्ध', r: 'साफ' }], level: 1, explain: 'कॉपी के तीनों शब्दार्थ।' },
      { id: 'hin-neem.shabdarth.i02', type: 'fill', q: 'नेह का अर्थ लिखो।', accept: ['प्रेम', 'प्यार'], lang: 'hi-IN', level: 1, explain: 'नेह = <strong>प्रेम</strong>।' },
      { id: 'hin-neem.shabdarth.i03', type: 'fill', q: 'रोग का अर्थ लिखो।', accept: ['बीमारी'], lang: 'hi-IN', level: 1, explain: 'रोग = <strong>बीमारी</strong>।' },
      { id: 'hin-neem.shabdarth.i04', type: 'fill', q: 'शुद्ध का अर्थ लिखो।', accept: ['साफ', 'स्वच्छ'], lang: 'hi-IN', level: 1, explain: 'शुद्ध = <strong>साफ</strong>।' },
      { id: 'hin-neem.shabdarth.i05', type: 'mcq', q: '"कितने रोग भगाता नीम।" — रोग का अर्थ है:', options: ['प्रेम', 'बीमारी', 'हवा', 'पेड़'], answer: 1, level: 2, explain: 'रोग = बीमारी। इसलिए नीम को डॉक्टर कहा जाता है।' },
      { id: 'hin-neem.shabdarth.i06', type: 'mcq', q: 'किस शब्द का अर्थ "साफ" है?', options: ['नेह', 'रोग', 'शुद्ध', 'तन'], answer: 2, level: 1, explain: 'शुद्ध = साफ।' },
      { id: 'hin-neem.shabdarth.i07', type: 'bucket', q: 'हर शब्द को उसके अर्थ के डिब्बे में डालो।', buckets: ['प्रेम', 'बीमारी', 'साफ'], chips: [{ t: 'नेह', b: 'प्रेम' }, { t: 'रोग', b: 'बीमारी' }, { t: 'शुद्ध', b: 'साफ' }], level: 2, explain: 'तीनों शब्दार्थ कॉपी से।' },
      { id: 'hin-neem.shabdarth.i08', type: 'mcq', q: 'सही वर्तनी (spelling) चुनो:', options: ['शोग', 'रोग', 'शेग', 'रौग'], answer: 1, level: 2, explain: '<strong>रोग</strong> — र से, श से नहीं। यही गलती कॉपी में लाल पेन से ठीक हुई थी।' },
      { id: 'hin-neem.shabdarth.i09', type: 'fill', q: 'वाक्य पूरा करो: नीम पक्षियों के प्रति अपना ____ जताता है।', accept: ['नेह', 'प्रेम'], lang: 'hi-IN', level: 2, explain: 'नेह (प्रेम) जताता है।' },
      { id: 'hin-neem.shabdarth.i10', type: 'speak', q: 'तीनों शब्द ज़ोर से पढ़ो: नेह, रोग, शुद्ध', text: 'नेह, रोग, शुद्ध', lang: 'hi-IN', level: 1, explain: 'बोलकर पढ़ने से वर्तनी याद रहती है।' },
      { id: 'hin-neem.shabdarth.i11', type: 'tf', q: 'शुद्ध का अर्थ "गंदा" है।', answer: false, level: 2, explain: 'नहीं — शुद्ध का अर्थ <strong>साफ</strong> है। गंदा उसका विलोम है।' },
      { id: 'hin-neem.shabdarth.i12', type: 'fillMulti', q: 'तीनों शब्दार्थ लिखो।', lang: 'hi-IN', level: 2, blanks: [{ label: 'नेह', accept: ['प्रेम', 'प्यार'] }, { label: 'रोग', accept: ['बीमारी'] }, { label: 'शुद्ध', accept: ['साफ', 'स्वच्छ'] }], explain: 'नेह = प्रेम · रोग = बीमारी · शुद्ध = साफ।' },
      { id: 'hin-neem.shabdarth.i13', type: 'mcq', q: 'नीम गंदी हवा को ____ बना देता है।', options: ['कड़वा', 'शुद्ध', 'मीठा', 'प्रदूषित'], answer: 1, level: 2, explain: 'शुद्ध — साफ। "चले प्रदूषित वायु कभी तो, उसको शुद्ध बनाता नीम।"' },
      { id: 'hin-neem.shabdarth.i14', type: 'tap', q: 'इस पंक्ति में वह शब्द छूओ जिसका अर्थ "प्रेम" है।', lang: 'hi-IN', level: 2, tokens: [{ t: 'अपना' }, { t: 'नेह', ok: true }, { t: 'जताता' }, { t: 'नीम।' }], explain: 'नेह = प्रेम।' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'hin-neem.vilom-paryayvachi',
    subject: 'hindi', topic: 'hin-neem',
    name: 'विलोम और पर्यायवाची',
    canDo: 'I know the opposites and synonyms exactly as the notes list them.',
    weight: 5, difficulty: 2,
    prereq: [],
    teach: {
      hook: 'दो लिस्ट, और दोनों छोटी हैं। विलोम में तीन जोड़े, पर्यायवाची में चार शब्द — बस।',
      explain:
        '<p><strong>विलोम शब्द (opposites)</strong> — कॉपी में × चिह्न से लिखे गए हैं:</p>' +
        '<ul>' +
        '<li>शुद्ध × <strong>अशुद्ध</strong></li>' +
        '<li>कड़वा × <strong>मीठा</strong></li>' +
        '<li>अपना × <strong>पराया</strong></li>' +
        '</ul>' +
        '<p><strong>पर्यायवाची शब्द (synonyms)</strong> — हर शब्द के <strong>दो</strong> पर्यायवाची दिए गए हैं:</p>' +
        '<ul>' +
        '<li>हवा – <strong>वायु, पवन</strong></li>' +
        '<li>प्रदूषित – <strong>गंदा, मलिन</strong></li>' +
        '<li>डॉक्टर – <strong>चिकित्सक, वैद्य</strong></li>' +
        '<li>दिन – <strong>दिवस, वार</strong></li>' +
        '</ul>',
      worked: [
        {
          q: 'कड़वा का विलोम लिखो।',
          steps: [
            'कड़वा = bitter.',
            'उसका उल्टा = sweet.',
            'हिंदी में <strong>मीठा</strong>।'
          ],
          a: 'मीठा'
        }
      ],
      remember: [
        'विलोम: शुद्ध × अशुद्ध · कड़वा × मीठा · अपना × पराया',
        'पर्यायवाची हमेशा दो-दो लिखो, जैसे कॉपी में हैं।',
        'हवा = वायु, पवन'
      ],
      watchOut: 'पर्यायवाची पूछे जाने पर <strong>दो</strong> शब्द लिखो — कॉपी में हर जगह दो ही दिए गए हैं, और एक लिखने पर पूरे अंक नहीं मिलते।'
    },
    items: [
      { id: 'hin-neem.vilom-paryayvachi.i01', type: 'fill', q: 'शुद्ध का विलोम लिखो।', accept: ['अशुद्ध'], lang: 'hi-IN', level: 1, explain: 'शुद्ध × <strong>अशुद्ध</strong>।' },
      { id: 'hin-neem.vilom-paryayvachi.i02', type: 'fill', q: 'कड़वा का विलोम लिखो।', accept: ['मीठा'], lang: 'hi-IN', level: 1, explain: 'कड़वा × <strong>मीठा</strong>।' },
      { id: 'hin-neem.vilom-paryayvachi.i03', type: 'fill', q: 'अपना का विलोम लिखो।', accept: ['पराया'], lang: 'hi-IN', level: 2, explain: 'अपना × <strong>पराया</strong>।' },
      { id: 'hin-neem.vilom-paryayvachi.i04', type: 'match', q: 'विलोम मिलाओ।', pairs: [{ l: 'शुद्ध', r: 'अशुद्ध' }, { l: 'कड़वा', r: 'मीठा' }, { l: 'अपना', r: 'पराया' }], level: 1, explain: 'तीनों जोड़े कॉपी से।' },
      { id: 'hin-neem.vilom-paryayvachi.i05', type: 'fillMulti', q: 'हवा के दो पर्यायवाची लिखो।', lang: 'hi-IN', level: 2, blanks: [{ label: 'पहला', accept: ['वायु', 'पवन'] }, { label: 'दूसरा', accept: ['पवन', 'वायु'] }], explain: 'हवा – <strong>वायु, पवन</strong>।' },
      { id: 'hin-neem.vilom-paryayvachi.i06', type: 'fillMulti', q: 'डॉक्टर के दो पर्यायवाची लिखो।', lang: 'hi-IN', level: 2, blanks: [{ label: 'पहला', accept: ['चिकित्सक', 'वैद्य'] }, { label: 'दूसरा', accept: ['वैद्य', 'चिकित्सक'] }], explain: 'डॉक्टर – <strong>चिकित्सक, वैद्य</strong>।' },
      { id: 'hin-neem.vilom-paryayvachi.i07', type: 'match', q: 'पर्यायवाची मिलाओ।', pairs: [{ l: 'हवा', r: 'वायु, पवन' }, { l: 'प्रदूषित', r: 'गंदा, मलिन' }, { l: 'दिन', r: 'दिवस, वार' }], level: 2, explain: 'कॉपी के पर्यायवाची, दो-दो करके।' },
      { id: 'hin-neem.vilom-paryayvachi.i08', type: 'mcq', q: 'प्रदूषित का पर्यायवाची कौन-सा है?', options: ['शुद्ध', 'मलिन', 'मीठा', 'पवन'], answer: 1, level: 2, explain: 'प्रदूषित – गंदा, <strong>मलिन</strong>।' },
      { id: 'hin-neem.vilom-paryayvachi.i09', type: 'bucket', q: 'हर शब्द को सही डिब्बे में डालो।', buckets: ['विलोम जोड़ा', 'पर्यायवाची'], chips: [{ t: 'कड़वा × मीठा', b: 'विलोम जोड़ा' }, { t: 'हवा – वायु', b: 'पर्यायवाची' }, { t: 'शुद्ध × अशुद्ध', b: 'विलोम जोड़ा' }, { t: 'दिन – दिवस', b: 'पर्यायवाची' }], level: 2, explain: 'विलोम = उल्टा अर्थ। पर्यायवाची = वही अर्थ।' },
      { id: 'hin-neem.vilom-paryayvachi.i10', type: 'fill', q: 'दिन का एक पर्यायवाची लिखो।', accept: ['दिवस', 'वार'], lang: 'hi-IN', level: 1, explain: 'दिन – <strong>दिवस, वार</strong>।' },
      { id: 'hin-neem.vilom-paryayvachi.i11', type: 'tf', q: 'मलिन और गंदा दोनों प्रदूषित के पर्यायवाची हैं।', answer: true, level: 2, explain: 'हाँ — कॉपी में दोनों दिए गए हैं।' },
      { id: 'hin-neem.vilom-paryayvachi.i12', type: 'mcq', q: 'अपना का विलोम है:', options: ['मीठा', 'पराया', 'अशुद्ध', 'वायु'], answer: 1, level: 2, explain: 'अपना × <strong>पराया</strong>।' },
      { id: 'hin-neem.vilom-paryayvachi.i13', type: 'fill', q: 'पवन किस शब्द का पर्यायवाची है?', accept: ['हवा'], lang: 'hi-IN', level: 2, explain: 'पवन और वायु — दोनों <strong>हवा</strong> के पर्यायवाची हैं।' },
      { id: 'hin-neem.vilom-paryayvachi.i14', type: 'multi', q: 'हवा के पर्यायवाची चुनो (एक से ज़्यादा हो सकते हैं)।', options: ['वायु', 'मलिन', 'पवन', 'दिवस'], answer: [0, 2], level: 3, explain: 'वायु और पवन। मलिन प्रदूषित का और दिवस दिन का पर्यायवाची है।' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'hin-neem.prashn-uttar',
    subject: 'hindi', topic: 'hin-neem',
    name: 'प्रश्न-उत्तर',
    canDo: 'I can write the four answers in full sentences, using the school\'s frame.',
    weight: 5, difficulty: 3,
    prereq: ['hin-neem.kavita'],
    teach: {
      hook: 'मैडम ने हर उत्तर पर सही का निशान तभी लगाया जब उत्तर में प्रश्न के शब्द दोहराए गए थे। यही तरीका अंक दिलाता है।',
      explain:
        '<p>दो नियम, और दोनों कॉपी से हैं:</p>' +
        '<p><strong>1. उत्तर में प्रश्न के शब्द दोहराओ।</strong> प्रश्न "नीम का पेड़ हमारे लिए क्या करता है?" तो उत्तर भी "नीम का पेड़ हमारे लिए…" से शुरू होगा।</p>' +
        '<p><strong>2. "क्यों" वाले प्रश्न का उत्तर हमेशा इस ढाँचे में:</strong> <em>… <strong>इसलिए</strong> … <strong>क्योंकि</strong> …</em></p>' +
        '<p>पूरे वाक्य में लिखो, और अंत में पूर्ण विराम (।) ज़रूर लगाओ।</p>',
      worked: [
        {
          q: 'नीम को डॉक्टर क्यों कहा जाता है?',
          steps: [
            'प्रश्न में "क्यों" है, तो ढाँचा होगा: इसलिए … क्योंकि …',
            'प्रश्न के शब्द दोहराओ: "नीम को डॉक्टर इसलिए कहा जाता है"',
            'फिर कारण: "क्योंकि इससे बहुत से रोग दूर हो जाते हैं।"'
          ],
          a: 'नीम को डॉक्टर इसलिए कहा जाता है क्योंकि इससे बहुत से रोग दूर हो जाते हैं।'
        }
      ],
      remember: [
        'प्रश्न के शब्द उत्तर में दोहराओ।',
        '"क्यों" → इसलिए … क्योंकि …',
        'हर उत्तर के अंत में पूर्ण विराम (।)।'
      ],
      watchOut: 'अधूरा उत्तर मत छोड़ो। कॉपी में एक उत्तर अधूरा था और मैडम ने "Complete it" लिखा था।'
    },
    items: [
      { id: 'hin-neem.prashn-uttar.i01', type: 'shortAnswer', q: 'नीम का पेड़ हमारे लिए क्या करता है?', lang: 'hi-IN', lines: 2, model: 'नीम का पेड़ हमारे लिए प्रदूषित वायु को शुद्ध करता है।', must: ['"नीम का पेड़ हमारे लिए" से शुरू किया', 'प्रदूषित वायु को शुद्ध करता है', 'पूर्ण विराम लगाया'], level: 2, explain: 'कॉपी का उत्तर: नीम का पेड़ हमारे लिए प्रदूषित वायु को शुद्ध करता है।' },
      { id: 'hin-neem.prashn-uttar.i02', type: 'shortAnswer', q: 'नीम को डॉक्टर क्यों कहा जाता है?', lang: 'hi-IN', lines: 2, model: 'नीम को डॉक्टर इसलिए कहा जाता है क्योंकि इससे बहुत से रोग दूर हो जाते हैं।', must: ['"इसलिए" शब्द इस्तेमाल किया', '"क्योंकि" शब्द इस्तेमाल किया', 'रोग दूर हो जाते हैं लिखा'], level: 3, explain: '"क्यों" वाले प्रश्न का ढाँचा: … इसलिए … क्योंकि …' },
      { id: 'hin-neem.prashn-uttar.i03', type: 'shortAnswer', q: 'नीम किन-किन पक्षियों के प्रति अपना प्रेम जताता है?', lang: 'hi-IN', lines: 2, model: 'नीम चिड़िया, कौआ तथा तोते जैसे सभी पक्षियों के प्रति प्रेम जताता है।', must: ['चिड़िया, कौआ और तोता तीनों लिखे', 'पूरे वाक्य में लिखा'], level: 2, explain: 'तीनों पक्षी कविता से हैं: चिड़िया, कौआ, तोता।' },
      { id: 'hin-neem.prashn-uttar.i04', type: 'shortAnswer', q: 'कविता के अनुसार हम नीम के पेड़ से क्या सीखते हैं?', lang: 'hi-IN', lines: 2, model: 'नीम कड़वे तन में मन को मीठा रखना सिखाता है।', must: ['कड़वे तन का ज़िक्र', 'मन को मीठा रखना', 'सिखाता (छोटी ि) सही लिखा'], level: 3, explain: 'यही कविता की शिक्षा है।' },
      { id: 'hin-neem.prashn-uttar.i05', type: 'fill', q: '"क्यों" वाले प्रश्न का उत्तर किन दो शब्दों से जोड़ा जाता है? (जैसे: ____ … ____)', accept: ['इसलिए क्योंकि', 'इसलिए, क्योंकि', 'इसलिए और क्योंकि'], lang: 'hi-IN', level: 2, explain: '<strong>इसलिए … क्योंकि …</strong> — यही स्कूल का ढाँचा है।' },
      { id: 'hin-neem.prashn-uttar.i06', type: 'order', q: 'उत्तर को सही क्रम में लगाओ।', answer: ['नीम', 'को', 'डॉक्टर', 'इसलिए', 'कहा', 'जाता', 'है', 'क्योंकि', 'इससे', 'बहुत', 'से', 'रोग', 'दूर', 'हो', 'जाते', 'हैं।'], level: 3, explain: 'नीम को डॉक्टर इसलिए कहा जाता है क्योंकि इससे बहुत से रोग दूर हो जाते हैं।' },
      { id: 'hin-neem.prashn-uttar.i07', type: 'mcq', q: 'नीम प्रदूषित वायु का क्या करता है?', options: ['उसे और गंदा करता है', 'उसे शुद्ध बनाता है', 'उसे रोक देता है', 'कुछ नहीं करता'], answer: 1, level: 1, explain: 'नीम प्रदूषित वायु को <strong>शुद्ध</strong> बनाता है।' },
      { id: 'hin-neem.prashn-uttar.i08', type: 'multi', q: 'कविता में किन पक्षियों का नाम आया है?', options: ['चिड़िया', 'मोर', 'कौआ', 'तोता', 'कबूतर'], answer: [0, 2, 3], level: 2, explain: 'चिड़िया, कौआ और तोता — तीनों "चिड़िया, कौआ, तोता सबसे" पंक्ति में हैं।' },
      { id: 'hin-neem.prashn-uttar.i09', type: 'tf', q: 'उत्तर लिखते समय प्रश्न के शब्द दोहराने चाहिए।', answer: true, level: 2, explain: 'हाँ — यही तरीका मैडम ने कॉपी में हर बार सही किया है।' },
      { id: 'hin-neem.prashn-uttar.i10', type: 'fill', q: 'वाक्य पूरा करो: नीम को डॉक्टर इसलिए कहा जाता है ____ इससे बहुत से रोग दूर हो जाते हैं।', accept: ['क्योंकि'], lang: 'hi-IN', level: 2, explain: '<strong>क्योंकि</strong> — कारण बताने वाला शब्द।' },
      { id: 'hin-neem.prashn-uttar.i11', type: 'mcq', q: 'हर उत्तर के अंत में क्या लगाना ज़रूरी है?', options: ['प्रश्नवाचक चिह्न ?', 'पूर्ण विराम ।', 'अल्पविराम ,', 'कुछ नहीं'], answer: 1, level: 1, explain: 'उत्तर के अंत में <strong>पूर्ण विराम (।)</strong> लगता है।' },
      { id: 'hin-neem.prashn-uttar.i12', type: 'fill', q: 'नीम हमें क्या रखना सिखाता है? (दो शब्द)', accept: ['मन मीठा', 'मन को मीठा', 'मीठा मन'], lang: 'hi-IN', level: 2, explain: 'कड़वे तन में <strong>मन को मीठा</strong> रखना।' },
      { id: 'hin-neem.prashn-uttar.i13', type: 'speak', q: 'यह उत्तर ज़ोर से बोलो, फिर 🔊 दबाकर जाँचो।', text: 'नीम को डॉक्टर इसलिए कहा जाता है क्योंकि इससे बहुत से रोग दूर हो जाते हैं।', lang: 'hi-IN', level: 2, explain: 'बोलकर याद करने से परीक्षा में वाक्य जल्दी आता है।' },
      { id: 'hin-neem.prashn-uttar.i14', type: 'mcq', q: 'नीम किससे कुछ लेता है?', options: ['सब से', 'किसी से नहीं', 'सिर्फ़ पक्षियों से', 'सिर्फ़ हवा से'], answer: 1, level: 3, explain: '"लेता नहीं किसी से कुछ भी, पर कितना दे जाता नीम।" — नीम किसी से कुछ नहीं लेता।' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'hin-neem.matra-drill',
    subject: 'hindi', topic: 'hin-neem',
    name: 'वर्तनी और मात्रा',
    canDo: 'I can spell the words I keep getting wrong, with the right matras.',
    weight: 4, difficulty: 3,
    prereq: [],
    teach: {
      hook: 'तीन गलतियाँ कॉपी में लाल पेन से ठीक हुई थीं। तीनों छोटी हैं, और तीनों दोबारा हो सकती हैं।',
      explain:
        '<p><strong>1. रोग, शोग नहीं.</strong> र और श अलग अक्षर हैं। रोग = बीमारी।</p>' +
        '<p><strong>2. सिखाता, सीखाता नहीं.</strong> छोटी <strong>ि</strong> लगती है, बड़ी ी नहीं। याद रखो:</p>' +
        '<ul><li><strong>सीखना</strong> = to learn (मैं सीखता हूँ)</li>' +
        '<li><strong>सिखाना</strong> = to teach (नीम सिखाता है)</li></ul>' +
        '<p><strong>3. "से" मत छोड़ो.</strong> पंक्ति है "लेता नहीं किसी <strong>से</strong> कुछ भी," — छोटे शब्द छूट जाना सबसे आम गलती है।</p>',
      worked: [
        {
          q: 'सही चुनो: नीम हमें मीठा रहना (सिखाता / सीखाता) है।',
          steps: [
            'नीम पढ़ा रहा है, सीख नहीं रहा।',
            'पढ़ाना = सिखाना, और उसमें छोटी ि है।',
            'तो सही शब्द सिखाता है।'
          ],
          a: 'सिखाता'
        }
      ],
      remember: [
        'रोग — र से।',
        'सिखाना (छोटी ि) = to teach · सीखना (बड़ी ी) = to learn।',
        'लिखने के बाद एक बार पढ़ो — छूटा हुआ शब्द तभी पकड़ में आता है।'
      ],
      watchOut: 'लिखने के बाद हमेशा एक बार पढ़कर देखो कि कोई छोटा शब्द (से, को, में, ने) छूट तो नहीं गया।'
    },
    items: [
      { id: 'hin-neem.matra-drill.i01', type: 'mcq', q: 'सही वर्तनी चुनो:', options: ['सीखाता', 'सिखाता', 'सिखता', 'सीखता'], answer: 1, level: 2, hint: 'नीम पढ़ा रहा है।', explain: '<strong>सिखाता</strong> — छोटी ि। सिखाना = to teach।' },
      { id: 'hin-neem.matra-drill.i02', type: 'mcq', q: 'सही वर्तनी चुनो:', options: ['शोग', 'रोग', 'रोंग', 'शेग'], answer: 1, level: 1, explain: '<strong>रोग</strong> — र से।' },
      { id: 'hin-neem.matra-drill.i03', type: 'fill', q: 'पंक्ति पूरी करो: "लेता नहीं किसी ____ कुछ भी,"', accept: ['से'], lang: 'hi-IN', level: 2, explain: '<strong>से</strong> — यही शब्द तुम्हारी कॉपी में छूटा था।' },
      { id: 'hin-neem.matra-drill.i04', type: 'mcq', q: '"मैं रोज़ नया शब्द ____ हूँ।" सही शब्द चुनो।', options: ['सिखाता', 'सीखता', 'सिखता', 'सीखाता'], answer: 1, level: 3, hint: 'यहाँ तुम खुद सीख रहे हो।', explain: '<strong>सीखता</strong> — सीखना = to learn, बड़ी ी से।' },
      { id: 'hin-neem.matra-drill.i05', type: 'mcq', q: '"अध्यापिका हमें गणित ____ हैं।" सही शब्द चुनो।', options: ['सीखती', 'सिखाती', 'सीखाती', 'सिखती'], answer: 1, level: 3, explain: '<strong>सिखाती</strong> — पढ़ाने के लिए सिखाना, छोटी ि से।' },
      { id: 'hin-neem.matra-drill.i06', type: 'bucket', q: 'हर शब्द को सही डिब्बे में डालो।', buckets: ['सही', 'गलत'], chips: [{ t: 'रोग', b: 'सही' }, { t: 'शोग', b: 'गलत' }, { t: 'सिखाता', b: 'सही' }, { t: 'सीखाता', b: 'गलत' }, { t: 'शुद्ध', b: 'सही' }, { t: 'नेह', b: 'सही' }], level: 2, explain: 'शोग और सीखाता — दोनों गलत हैं।' },
      { id: 'hin-neem.matra-drill.i07', type: 'match', q: 'शब्द और उसका अर्थ मिलाओ।', pairs: [{ l: 'सीखना', r: 'to learn' }, { l: 'सिखाना', r: 'to teach' }], level: 2, explain: 'बड़ी ी = सीखना (learn), छोटी ि = सिखाना (teach)।' },
      { id: 'hin-neem.matra-drill.i08', type: 'fill', q: 'सही वर्तनी लिखो: बीमारी के लिए कविता में कौन-सा शब्द आया है?', accept: ['रोग'], lang: 'hi-IN', level: 1, explain: 'रोग।' },
      { id: 'hin-neem.matra-drill.i09', type: 'tf', q: '"सीखाता" सही वर्तनी है।', answer: false, level: 2, explain: 'नहीं — सही शब्द <strong>सिखाता</strong> है, छोटी ि से।' },
      { id: 'hin-neem.matra-drill.i10', type: 'tap', q: 'इस वाक्य में गलत वर्तनी वाला शब्द छूओ।', lang: 'hi-IN', level: 3, tokens: [{ t: 'नीम' }, { t: 'हमें' }, { t: 'मीठा' }, { t: 'रहना' }, { t: 'सीखाता', ok: true }, { t: 'है।' }], explain: 'सीखाता गलत है — सही शब्द <strong>सिखाता</strong> है।' },
      { id: 'hin-neem.matra-drill.i11', type: 'speak', q: 'ये तीनों शब्द ज़ोर से बोलो: रोग, सिखाता, शुद्ध', text: 'रोग, सिखाता, शुद्ध', lang: 'hi-IN', level: 1, explain: 'बोलकर पढ़ने से मात्रा याद रहती है।' },
      { id: 'hin-neem.matra-drill.i12', type: 'fill', q: 'वाक्य पूरा करो: "इससे बहुत से ____ दूर हो जाते हैं।"', accept: ['रोग'], lang: 'hi-IN', level: 2, explain: 'रोग = बीमारी।' },
      { id: 'hin-neem.matra-drill.i13', type: 'mcq', q: 'कौन-सा वाक्य पूरी तरह सही है?', options: ['नीम हमें मीठा रहना सीखाता है।', 'नीम हमें मीठा रहना सिखाता है।', 'नीम हमें मीठा रहना सिखता है।', 'नीम हमें मीठा रहना सीखता है।'], answer: 1, level: 3, explain: 'सिखाता — नीम पढ़ा रहा है, इसलिए छोटी ि।' },
      { id: 'hin-neem.matra-drill.i14', type: 'fillMulti', q: 'सही वर्तनी लिखो।', lang: 'hi-IN', level: 3, blanks: [{ label: 'बीमारी', accept: ['रोग'] }, { label: 'to teach (नीम ___ है)', accept: ['सिखाता'] }, { label: 'साफ', accept: ['शुद्ध'] }], explain: 'रोग · सिखाता · शुद्ध।' }
    ]
  }

]);
