/* ============================================================
   HALF-YEARLY HQ — Geometry, part 2
   Angles · types of angles · the protractor · the circle ·
   radius and diameter · clock angles · the spellings he loses
   marks on.

   Source: Maths notebook pp. 6-23 and workbook pp. 58-62.
   All definitions are quoted in the school's own wording, because
   that is the wording the paper marks.

   Two things in here are targeted at real, documented losses:
     · the substitution line in radius/diameter working, which he
       skips (workbook p.60 Q4 and Q5) and which carries a mark
     · the technical spellings he gets wrong again and again —
       "Stright", "segament", "circumfrence", "intersectiong",
       "ancute", "instument"
   ============================================================ */
window.HY_SKILLS = (window.HY_SKILLS || []).concat([

  /* ---------------------------------------------------------- */
  {
    id: 'math-geometry.angles',
    subject: 'maths', topic: 'math-geometry',
    name: 'What an angle is',
    canDo: 'I can name the arms and the vertex of an angle and write it using the correct symbol.',
    weight: 4, difficulty: 1,
    prereq: ['math-geometry.basics'],
    teach: {
      hook: 'Open a pair of scissors. The two blades are the arms, the screw is the vertex, and the gap between them is the angle.',
      explain:
        '<p>Your notes put it exactly like this: <strong>"Two rays having a common end point form an angle."</strong></p>' +
        '<ul>' +
        '<li>The two rays are the <strong>arms</strong> (or sides) of the angle.</li>' +
        '<li>The common end point is the <strong>vertex</strong>.</li>' +
        '<li>An angle is written with the symbol <strong>∠</strong>.</li>' +
        '<li>Angles are measured in <strong>degrees (°)</strong>.</li>' +
        '</ul>' +
        '<p>In a name like <strong>∠PQR</strong>, the <strong>middle letter is always the vertex</strong>. So Q is the vertex, and the arms are ray QP and ray QR.</p>' +
        '<p>The space between the arms is the <strong>interior</strong> of the angle; the space outside is the <strong>exterior</strong>.</p>',
      svg: '<svg viewBox="0 0 260 150" role="img"><title>An angle with vertex Q and arms QP and QR</title><g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="40" y1="120" x2="230" y2="120"/><line x1="40" y1="120" x2="185" y2="25"/><path d="M 90 120 A 50 50 0 0 0 74 90" stroke="#7C3AED" stroke-width="2"/></g><circle cx="40" cy="120" r="3.5" fill="currentColor"/><text x="26" y="136" font-family="Inter, system-ui" font-size="14" fill="currentColor">Q</text><text x="236" y="125" font-family="Inter, system-ui" font-size="14" fill="currentColor">R</text><text x="190" y="22" font-family="Inter, system-ui" font-size="14" fill="currentColor">P</text><text x="96" y="100" font-family="Inter, system-ui" font-size="12" fill="#7C3AED">interior</text></svg>',
      worked: [
        {
          q: 'In ∠DEF, name the vertex and the two arms.',
          steps: [
            'The middle letter is E, so the vertex is <strong>E</strong>.',
            'The arms start at the vertex and go out to the other two letters.',
            'So the arms are ray ED and ray EF.'
          ],
          a: 'Vertex E; arms →ED and →EF'
        }
      ],
      remember: [
        'Middle letter = the vertex. Always.',
        'Two rays + one shared end point = an angle.',
        'The unit for measuring an angle is the degree (°).'
      ],
      watchOut: 'The size of an angle does not depend on how long you draw the arms. A small angle with very long arms is still a small angle.'
    },
    items: [
      { id: 'math-geometry.angles.i01', type: 'fill', q: 'Two rays having a common end point form an ____', accept: ['angle'], level: 1, explain: 'That is the school\'s definition of an angle, word for word.' },
      { id: 'math-geometry.angles.i02', type: 'fill', q: 'The common end point of the two rays is called the ____', accept: ['vertex'], level: 1, explain: 'The two rays are the arms; the point where they meet is the vertex.' },
      { id: 'math-geometry.angles.i03', type: 'mcq', q: 'In <strong>∠MNO</strong>, which letter is the vertex?', options: ['M', 'N', 'O', 'You cannot tell'], answer: 1, level: 1, hint: 'Look at the middle.', explain: 'The middle letter of an angle name is always the vertex, so it is N.' },
      { id: 'math-geometry.angles.i04', type: 'fill', q: 'The unit for measuring an angle is the ____', accept: ['degree', 'degrees'], level: 1, explain: 'Angles are measured in degrees, written with the ° symbol.' },
      { id: 'math-geometry.angles.i05', type: 'mcq', q: 'The two rays that form an angle are called its ____', options: ['vertices', 'arms', 'chords', 'scales'], answer: 1, level: 1, explain: 'They are called the arms, or the sides, of the angle.' },
      { id: 'math-geometry.angles.i06', type: 'fillMulti', q: 'For <strong>∠DEF</strong>, complete these.', level: 2, blanks: [{ label: 'The vertex', accept: ['E'] }, { label: 'One arm', accept: ['ED', 'ray ED', 'EF', 'ray EF'] }], explain: 'The vertex is E, and the arms are ray ED and ray EF.' },
      { id: 'math-geometry.angles.i07', type: 'fill', q: 'The space <strong>between</strong> the arms of an angle is called the ____ of the angle.', accept: ['interior'], level: 2, explain: 'Between the arms is the interior; outside them is the exterior.' },
      { id: 'math-geometry.angles.i08', type: 'tf', q: 'If you draw the arms of an angle longer, the angle gets bigger.', answer: false, level: 3, explain: 'No. The size of an angle is the amount of turn between the arms. Longer arms do not change it.' },
      { id: 'math-geometry.angles.i09', type: 'mcq', q: 'Which symbol stands for "angle"?', options: ['∠', '△', '⊥', '∥'], answer: 0, level: 1, explain: '∠ is the angle symbol. ⊥ means perpendicular and ∥ means parallel.' },
      { id: 'math-geometry.angles.i10', type: 'fill', q: 'How many line segments make up the capital letter <strong>N</strong>?', accept: ['3', 'three'], level: 2, hint: 'Two uprights and one slanting stroke.', explain: 'N is made from 3 line segments. (W has 4, L has 2, X has 2.)' },
      { id: 'math-geometry.angles.i11', type: 'match', q: 'Match the capital letter to its number of line segments.', pairs: [{ l: 'N', r: '3' }, { l: 'W', r: '4' }, { l: 'L', r: '2' }], level: 2, explain: 'N = 3, W = 4, L = 2. X also has 2.' },
      { id: 'math-geometry.angles.i12', type: 'tap', q: 'Tap the word that names the <strong>point</strong> where the two arms meet.', level: 1, tokens: [{ t: 'The' }, { t: 'two' }, { t: 'arms' }, { t: 'meet' }, { t: 'at' }, { t: 'the' }, { t: 'vertex', ok: true }, { t: 'of' }, { t: 'the' }, { t: 'angle' }], explain: 'The arms meet at the vertex.' },
      { id: 'math-geometry.angles.i13', type: 'mcq', q: 'Which of these does an angle NOT need?', options: ['Two rays', 'A common end point', 'Arms of equal length', 'A vertex'], answer: 2, level: 3, explain: 'The arms can be any length. What matters is the turn between them.' },
      { id: 'math-geometry.angles.i14', type: 'fill', q: 'The space <strong>outside</strong> the arms of an angle is called the ____', accept: ['exterior'], level: 2, explain: 'Inside is the interior, outside is the exterior.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'math-geometry.angle-types',
    subject: 'maths', topic: 'math-geometry',
    name: 'The seven types of angle',
    canDo: 'I can name any angle from its measure: zero, acute, right, obtuse, straight, reflex or complete.',
    weight: 5, difficulty: 2,
    prereq: ['math-geometry.angles'],
    gen: ['angleType', 'angleFromFigure'],
    teach: {
      hook: 'Angles are classified purely by size. Learn the seven bands once and you can never get one wrong.',
      explain:
        '<p>Your notes classify angles <strong>according to their measure</strong>:</p>' +
        '<ul>' +
        '<li><strong>Zero angle</strong> — exactly 0°</li>' +
        '<li><strong>Acute angle</strong> — greater than 0° and less than 90°</li>' +
        '<li><strong>Right angle</strong> — exactly 90°</li>' +
        '<li><strong>Obtuse angle</strong> — greater than 90° and less than 180°</li>' +
        '<li><strong>Straight angle</strong> — exactly 180° (two right angles)</li>' +
        '<li><strong>Reflex angle</strong> — between 180° and 360°</li>' +
        '<li><strong>Complete angle</strong> — exactly 360°</li>' +
        '</ul>',
      worked: [
        {
          q: 'Classify 106°.',
          steps: [
            'Is it exactly 90°? No.',
            'Is it more than 90° but less than 180°? Yes — 106 sits between them.',
            'That band is obtuse.'
          ],
          a: 'Obtuse angle'
        },
        {
          q: 'Classify 270°.',
          steps: [
            '270 is more than 180°.',
            'It is less than 360°.',
            'Between 180° and 360° is the reflex band.'
          ],
          a: 'Reflex angle'
        }
      ],
      remember: [
        'Acute = a cute little angle, under 90°.',
        'Right = exactly 90°, the corner of a page.',
        'Obtuse = obviously bigger, 90° to 180°.',
        'Reflex = bigger than a straight line, 180° to 360°.'
      ],
      watchOut: 'Exactly 90° is a right angle, not acute and not obtuse. The words "greater than" and "less than" in the definitions matter.'
    },
    items: [
      { id: 'math-geometry.angle-types.i01', type: 'mcq', q: 'An angle of <strong>25°</strong> is a ____', options: ['Acute angle', 'Right angle', 'Obtuse angle', 'Reflex angle'], answer: 0, level: 1, explain: '25° is less than 90°, so it is acute. Your notes list 25°, 48°, 76° and 11° as acute examples.' },
      { id: 'math-geometry.angle-types.i02', type: 'mcq', q: 'An angle of <strong>125°</strong> is a ____', options: ['Acute angle', 'Right angle', 'Obtuse angle', 'Straight angle'], answer: 2, level: 1, explain: '125° is between 90° and 180°, so it is obtuse.' },
      { id: 'math-geometry.angle-types.i03', type: 'fill', q: 'An angle whose measure is exactly <strong>180°</strong> is called a ____ angle.', accept: ['straight'], level: 1, hint: 'It looks like a straight line.', explain: 'Exactly 180° is a straight angle. Two right angles make a straight angle.' },
      { id: 'math-geometry.angle-types.i04', type: 'fill', q: 'An angle whose measure is exactly <strong>360°</strong> is called a ____ angle.', accept: ['complete', 'full'], level: 2, explain: 'A full turn, 360°, is a complete angle.' },
      { id: 'math-geometry.angle-types.i05', type: 'mcq', q: 'An angle of <strong>200°</strong> is a ____', options: ['Obtuse angle', 'Straight angle', 'Reflex angle', 'Complete angle'], answer: 2, level: 2, explain: '200° lies between 180° and 360°, so it is reflex. Your notes give 270° and 200° as reflex examples.' },
      { id: 'math-geometry.angle-types.i06', type: 'bucket', q: 'Sort these angle measures.', buckets: ['Acute', 'Obtuse', 'Reflex'], chips: [{ t: '48°', b: 'Acute' }, { t: '95°', b: 'Obtuse' }, { t: '172°', b: 'Obtuse' }, { t: '270°', b: 'Reflex' }, { t: '11°', b: 'Acute' }, { t: '310°', b: 'Reflex' }], level: 2, explain: 'Under 90° acute · 90° to 180° obtuse · 180° to 360° reflex.' },
      { id: 'math-geometry.angle-types.i07', type: 'tf', q: 'An angle of exactly 90° is an acute angle.', answer: false, level: 2, explain: 'No. Acute means <em>less than</em> 90°. Exactly 90° is a right angle.' },
      { id: 'math-geometry.angle-types.i08', type: 'fill', q: 'Two right angles together make one ____ angle.', accept: ['straight'], level: 2, explain: '90° + 90° = 180°, which is a straight angle.' },
      { id: 'math-geometry.angle-types.i09', type: 'order', q: 'Put these angle types in order from smallest to largest.', answer: ['Zero', 'Acute', 'Right', 'Obtuse', 'Straight', 'Reflex', 'Complete'], level: 3, explain: '0° · under 90° · 90° · 90-180° · 180° · 180-360° · 360°.' },
      { id: 'math-geometry.angle-types.i10', type: 'mcq', q: 'How many right angles are there in a complete angle?', options: ['2', '3', '4', '6'], answer: 2, level: 3, hint: '360 ÷ 90', explain: '360° ÷ 90° = 4. A complete turn contains four right angles.' },
      { id: 'math-geometry.angle-types.i11', type: 'fill', q: 'An angle whose measure is greater than 0° and less than 90° is called an ____ angle.', accept: ['acute'], level: 1, explain: 'That is the school\'s exact definition of an acute angle.' },
      { id: 'math-geometry.angle-types.i12', type: 'mcq', q: 'Sara says 179° is a straight angle because it "looks straight". Is she right?', options: ['Yes, close enough', 'No — a straight angle is exactly 180°, so 179° is obtuse', 'No — 179° is reflex', 'No — 179° is acute'], answer: 1, level: 3, explain: 'A straight angle must be exactly 180°. 179° is still under 180°, so it is obtuse.' },
      { id: 'math-geometry.angle-types.i13', type: 'multi', q: 'Tick every measure that gives an <strong>obtuse</strong> angle.', options: ['89°', '95°', '106°', '180°', '172°'], answer: [1, 2, 4], level: 2, explain: '95°, 106° and 172° all sit between 90° and 180°. 89° is acute and 180° is straight.' },
      { id: 'math-geometry.angle-types.i14', type: 'fill', q: 'An angle whose measure lies between 180° and 360° is called a ____ angle.', accept: ['reflex'], level: 1, explain: 'That is the reflex band, straight from your notes.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'math-geometry.protractor',
    subject: 'maths', topic: 'math-geometry',
    name: 'Using the protractor',
    canDo: 'I can name the parts of a protractor and say which scale to read.',
    weight: 4, difficulty: 2,
    prereq: ['math-geometry.angles'],
    teach: {
      hook: 'Half the marks lost on protractor questions come from reading the wrong scale. There is a simple rule that stops it happening.',
      explain:
        '<p>Straight from your notes: <strong>"Instrument used to measure or to construct angle is Protractor."</strong></p>' +
        '<ul>' +
        '<li>It is in the shape of a <strong>semicircle</strong>, divided equally into <strong>180 parts</strong>.</li>' +
        '<li>It has <strong>two scales</strong>, both marked from 0° to 180°.</li>' +
        '<li>The <strong>upper scale is read from left to right</strong>; the <strong>lower scale is read from right to left</strong>.</li>' +
        '<li>The line joining the zero of each scale is the <strong>base line</strong>.</li>' +
        '<li>Its parts: <strong>base line, centre, inner scale, outer scale</strong>.</li>' +
        '</ul>' +
        '<p>To read it: put the <strong>centre</strong> on the vertex and the <strong>base line</strong> along one arm. Then start counting from the <strong>0</strong> that sits on that arm, and follow that same scale round.</p>',
      worked: [
        {
          q: 'One arm lies along the 0 of the outer scale and the other arm crosses at the mark labelled 60 (outer) and 120 (inner). What is the angle?',
          steps: [
            'Find which scale has its 0 on the first arm — here it is the outer scale.',
            'Follow that same scale to the second arm.',
            'The outer scale reads 60.',
            'Sense check: the opening looks smaller than a square corner, and 60° is acute. It fits.'
          ],
          a: '60°'
        }
      ],
      remember: [
        'Centre on the vertex, base line on one arm.',
        'Start from whichever 0 sits on your arm, and stay on that scale.',
        'Sense check: acute angles must read under 90, obtuse over 90.'
      ],
      watchOut: 'If your answer is 120° but the angle clearly looks smaller than a square corner, you have read the wrong scale. The right answer is 180 − 120 = 60°.'
    },
    items: [
      { id: 'math-geometry.protractor.i01', type: 'fill', q: 'The instrument used to measure or construct an angle is the ____', accept: ['protractor'], level: 1, explain: 'The protractor. Careful with the spelling — and with "instrument", which you have slipped on before.' },
      { id: 'math-geometry.protractor.i02', type: 'mcq', q: 'A protractor is in the shape of a ____', options: ['circle', 'semicircle', 'triangle', 'square'], answer: 1, level: 1, explain: 'It is a semicircle, divided equally into 180 parts.' },
      { id: 'math-geometry.protractor.i03', type: 'fill', q: 'A protractor is divided equally into ____ parts.', accept: ['180'], level: 1, explain: 'One part for each degree from 0° to 180°.' },
      { id: 'math-geometry.protractor.i04', type: 'fill', q: 'The line joining the zero of each scale is called the ____', accept: ['base line', 'baseline'], level: 2, explain: 'That is the base line, and it goes along one arm of the angle.' },
      { id: 'math-geometry.protractor.i05', type: 'mcq', q: 'The <strong>upper</strong> scale of a protractor is read ____', options: ['from left to right', 'from right to left', 'from the middle outwards', 'in either direction'], answer: 0, level: 2, explain: 'Your notes say the upper scale is read from left to right and the lower scale from right to left.' },
      { id: 'math-geometry.protractor.i06', type: 'multi', q: 'Tick every part of a protractor named in your notes.', options: ['Base line', 'Centre', 'Inner scale', 'Radius', 'Outer scale'], answer: [0, 1, 2, 4], level: 2, explain: 'Base line, centre, inner scale and outer scale. Radius belongs to a circle, not a protractor.' },
      { id: 'math-geometry.protractor.i07', type: 'mcq', q: 'An angle clearly looks smaller than a square corner, but you read 140°. What has gone wrong?', options: ['Nothing, 140° is right', 'You read the wrong scale — it should be 40°', 'The protractor is broken', 'You should add 40 to get 180'], answer: 1, level: 3, explain: 'An angle smaller than a right angle must be under 90°. 180 − 140 = 40°, read from the other scale.' },
      { id: 'math-geometry.protractor.i08', type: 'fill', q: 'Both scales on a protractor are marked from 0° to ____', accept: ['180', '180°'], level: 1, explain: 'Both scales run 0° to 180°, just in opposite directions.' },
      { id: 'math-geometry.protractor.i09', type: 'tf', q: 'When measuring, the centre of the protractor goes on the vertex of the angle.', answer: true, level: 2, explain: 'Yes — centre on the vertex, base line along one arm. Get that right and the reading follows.' },
      { id: 'math-geometry.protractor.i10', type: 'fill', q: 'A mark reads 70 on the outer scale. What does the same mark read on the inner scale?', accept: ['110'], level: 3, hint: 'The two scales always add to 180.', explain: '180 − 70 = 110. The two scales always add up to 180.' },
      { id: 'math-geometry.protractor.i11', type: 'mcq', q: 'Which of these can a protractor NOT do?', options: ['Measure an angle', 'Construct an angle', 'Measure the length of a line in cm', 'Check if an angle is a right angle'], answer: 2, level: 2, explain: 'Lengths need a ruler. A protractor measures and constructs angles.' },
      { id: 'math-geometry.protractor.i12', type: 'fill', q: 'The <strong>lower</strong> scale of a protractor is read from ____ to ____ (answer like: left to right)', accept: ['right to left'], level: 2, explain: 'The lower scale is read from right to left, the opposite way to the upper scale.' },
      { id: 'math-geometry.protractor.i13', type: 'match', q: 'Match each protractor part to its job.', pairs: [{ l: 'Centre', r: 'Sits on the vertex' }, { l: 'Base line', r: 'Lies along one arm' }, { l: 'Scales', r: 'Give the reading in degrees' }], level: 2, explain: 'Centre on the vertex, base line on the arm, then read the scale.' },
      { id: 'math-geometry.protractor.i14', type: 'tf', q: 'A protractor can measure a reflex angle directly in one reading.', answer: false, level: 3, explain: 'No — a protractor only goes up to 180°. For a reflex angle you measure the smaller angle and subtract from 360°.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'math-geometry.circle-parts',
    subject: 'maths', topic: 'math-geometry',
    name: 'Parts of a circle',
    canDo: 'I can name the centre, radius, diameter, chord, circumference, arc and semicircle.',
    weight: 5, difficulty: 2,
    prereq: [],
    teach: {
      hook: 'A chord and a diameter look similar, and telling them apart is the one thing your teacher put a red question mark against. Here is the difference in one line.',
      explain:
        '<p><strong>Chord</strong> — your notes say it exactly like this: <em>"A line segment joining any two points on the circumference of the circle is called the chord of the circle."</em></p>' +
        '<p><strong>Diameter</strong> — a chord that passes <strong>through the centre</strong>. That makes it the <strong>longest chord</strong> of the circle.</p>' +
        '<p>So: every diameter is a chord, but most chords are not diameters.</p>' +
        '<ul>' +
        '<li><strong>Circumference</strong> — the length of the circle (the distance all the way round).</li>' +
        '<li><strong>Radius</strong> — from the centre to the edge; half of the diameter.</li>' +
        '<li><strong>Arc</strong> — any part of a circle.</li>' +
        '<li><strong>Semicircle</strong> — half of a circle. A semicircle is also an arc.</li>' +
        '</ul>',
      svg: '<svg viewBox="0 0 260 200" role="img"><title>A circle showing radius, diameter and chord</title><circle cx="120" cy="100" r="75" fill="none" stroke="currentColor" stroke-width="2.5"/><line x1="45" y1="100" x2="195" y2="100" stroke="#F59E0B" stroke-width="3"/><line x1="120" y1="100" x2="120" y2="25" stroke="#7C3AED" stroke-width="3"/><line x1="63" y1="151" x2="177" y2="151" stroke="#14B8A6" stroke-width="3"/><circle cx="120" cy="100" r="4" fill="currentColor"/><text x="126" y="115" font-family="Inter, system-ui" font-size="13" fill="currentColor">O</text><text x="128" y="60" font-family="Inter, system-ui" font-size="12" fill="#7C3AED">radius</text><text x="140" y="94" font-family="Inter, system-ui" font-size="12" fill="#F59E0B">diameter</text><text x="100" y="171" font-family="Inter, system-ui" font-size="12" fill="#14B8A6">chord</text></svg>',
      worked: [
        {
          q: 'Is every chord a diameter?',
          steps: [
            'A chord joins any two points on the circumference.',
            'A diameter must also pass through the centre.',
            'Most chords miss the centre, so most chords are not diameters.',
            'But every diameter does join two points on the circumference, so every diameter IS a chord.'
          ],
          a: 'No — but every diameter is a chord'
        }
      ],
      remember: [
        'Chord = joins two points on the circumference.',
        'Diameter = a chord through the centre = the longest chord.',
        'Circumference = the length all the way round.',
        'Semicircle = half a circle, and it is also an arc.'
      ],
      watchOut: 'Spelling: it is <strong>circumference</strong> (c-i-r-c-u-m-f-e-r-e-n-c-e), not "circumfrence". You have written it the wrong way more than once.'
    },
    items: [
      { id: 'math-geometry.circle-parts.i01', type: 'fill', q: 'A line segment joining any two points on the circumference of a circle is called a ____', accept: ['chord'], level: 1, explain: 'That is the school\'s definition of a chord, word for word.' },
      { id: 'math-geometry.circle-parts.i02', type: 'fill', q: 'The longest chord of a circle is the ____', accept: ['diameter'], level: 1, explain: 'A chord through the centre is the diameter, and it is the longest chord.' },
      { id: 'math-geometry.circle-parts.i03', type: 'tf', q: 'Every chord of a circle is a diameter.', answer: false, level: 2, explain: 'No. A chord is only a diameter if it passes through the centre. Every diameter is a chord, but not the other way round.' },
      { id: 'math-geometry.circle-parts.i04', type: 'tf', q: 'Every diameter of a circle is a chord.', answer: true, level: 3, explain: 'Yes — it joins two points on the circumference, which is exactly what a chord does.' },
      { id: 'math-geometry.circle-parts.i05', type: 'fill', q: 'The length of the circle (the distance all the way round) is called the ____', accept: ['circumference'], level: 2, hint: 'Watch the spelling: circum-fer-ence.', explain: 'The circumference. Spell it c-i-r-c-u-m-f-e-r-e-n-c-e.' },
      { id: 'math-geometry.circle-parts.i06', type: 'fill', q: 'Any part of a circle is called an ____', accept: ['arc'], level: 1, explain: 'Any part of the circle is an arc.' },
      { id: 'math-geometry.circle-parts.i07', type: 'fill', q: 'Half of a circle is called a ____', accept: ['semicircle', 'semi circle', 'semi-circle'], level: 1, explain: 'Half a circle is a semicircle, and a semicircle is also an arc.' },
      { id: 'math-geometry.circle-parts.i08', type: 'match', q: 'Match each part of the circle to what it means.', pairs: [{ l: 'Radius', r: 'Centre to the edge' }, { l: 'Diameter', r: 'Right across, through the centre' }, { l: 'Chord', r: 'Joins two points on the edge' }, { l: 'Circumference', r: 'The distance all the way round' }], level: 2, explain: 'Radius is half a diameter; a chord need not pass through the centre.' },
      { id: 'math-geometry.circle-parts.i09', type: 'bucket', q: 'Which of these always pass through the centre?', buckets: ['Through the centre', 'Not always'], chips: [{ t: 'Diameter', b: 'Through the centre' }, { t: 'Radius', b: 'Through the centre' }, { t: 'Chord', b: 'Not always' }, { t: 'Arc', b: 'Not always' }], level: 3, explain: 'A radius starts at the centre and a diameter passes through it. A chord or arc need not go near it.' },
      { id: 'math-geometry.circle-parts.i10', type: 'tf', q: 'A semicircle is also an arc of the circle.', answer: true, level: 2, explain: 'Yes — your notes say so directly. An arc is any part of a circle, and half of one certainly is.' },
      { id: 'math-geometry.circle-parts.i11', type: 'mcq', q: 'Which spelling is correct?', options: ['circumfrence', 'circumference', 'circumferance', 'circumfarence'], answer: 1, level: 2, explain: '<strong>Circumference</strong>. You have written "circumfrence" before — the missing "e" costs the mark.' },
      { id: 'math-geometry.circle-parts.i12', type: 'multi', q: 'Tick everything that is a <strong>line segment</strong> inside a circle.', options: ['Radius', 'Diameter', 'Chord', 'Circumference'], answer: [0, 1, 2], level: 3, explain: 'The circumference is a curve, not a line segment. The other three are straight.' },
      { id: 'math-geometry.circle-parts.i13', type: 'fill', q: 'The fixed point in the middle of a circle is called the ____', accept: ['centre', 'center'], level: 1, explain: 'The centre, usually labelled O.' },
      { id: 'math-geometry.circle-parts.i14', type: 'mcq', q: 'A chord is drawn so that it passes exactly through the centre. What is it now called?', options: ['A radius', 'An arc', 'A diameter', 'A semicircle'], answer: 2, level: 2, explain: 'A chord through the centre is a diameter — and it is the longest chord you can draw.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'math-geometry.radius-diameter',
    subject: 'maths', topic: 'math-geometry',
    name: 'Radius and diameter sums',
    canDo: 'I can work out a radius from a diameter and back again, showing every line of working.',
    weight: 5, difficulty: 2,
    prereq: ['math-geometry.circle-parts'],
    gen: ['radiusDiameter'],
    teach: {
      hook: 'These are easy marks, and you have been dropping some of them — not by getting the answer wrong, but by skipping a line of working.',
      explain:
        '<p>Two formulas, and that is the whole topic:</p>' +
        '<ul><li><strong>Diameter = 2 × radius</strong></li>' +
        '<li><strong>Radius = diameter ÷ 2</strong></li></ul>' +
        '<p>Write your answer in <strong>three lines</strong>, every single time:</p>' +
        '<p>1. the formula &nbsp; 2. the numbers put in &nbsp; 3. the answer with its unit</p>' +
        '<p>Line 2 is the one you skipped in the workbook on questions 4 and 5. It carries a mark on its own, even when the final answer is right.</p>',
      worked: [
        {
          q: 'The radius of a circle is 9 cm. Find the diameter.',
          steps: [
            'Diameter = 2 × radius',
            '= 2 × 9 cm',
            '= 18 cm'
          ],
          a: '18 cm'
        },
        {
          q: 'The diameter of a circle is 14 cm. Find the radius.',
          steps: [
            'Radius = diameter ÷ 2',
            '= 14 cm ÷ 2',
            '= 7 cm'
          ],
          a: '7 cm'
        }
      ],
      remember: [
        'Diameter = 2 × radius. Radius = diameter ÷ 2.',
        'Three lines: formula, substitution, answer.',
        'Always write the unit. "18" is not the same as "18 cm".'
      ],
      watchOut: 'Do not write "= 2 × 9 = cm". The unit belongs on the number: "= 2 × 9 cm". That stray "= cm" appeared in your workbook.'
    },
    items: [
      { id: 'math-geometry.radius-diameter.i01', type: 'fill', q: 'The radius of a circle is 8 cm. What is its diameter? (include the unit)', accept: ['16 cm', '16'], level: 1, explain: 'Diameter = 2 × radius = 2 × 8 cm = 16 cm.' },
      { id: 'math-geometry.radius-diameter.i02', type: 'fill', q: 'The diameter of a circle is 24 cm. What is its radius? (include the unit)', accept: ['12 cm', '12'], level: 1, explain: 'Radius = diameter ÷ 2 = 24 cm ÷ 2 = 12 cm.' },
      { id: 'math-geometry.radius-diameter.i03', type: 'steps', q: 'The radius of a circle is 9 cm. Find the diameter, showing all three lines.', level: 2, parts: [{ q: 'Line 1 — write the formula', accept: ['diameter = 2 x radius', 'd = 2 x r', 'diameter = 2 x r', 'd = 2r'], hint: 'Diameter is twice the radius.', why: 'Diameter = 2 × radius' }, { q: 'Line 2 — put the number in (write it as 2 x 9 cm)', accept: ['2 x 9 cm', '2 x 9', '2x9'], hint: 'This line earns a mark by itself.', why: '= 2 × 9 cm' }, { q: 'Line 3 — the answer with its unit', accept: ['18 cm', '18'], why: '= 18 cm' }], explain: 'Diameter = 2 × radius = 2 × 9 cm = 18 cm.' },
      { id: 'math-geometry.radius-diameter.i04', type: 'steps', q: 'The diameter of a circle is 14 cm. Find the radius, showing all three lines.', level: 2, parts: [{ q: 'Line 1 — write the formula', accept: ['radius = diameter / 2', 'r = d / 2', 'radius = diameter ÷ 2', 'radius = d/2'], why: 'Radius = diameter ÷ 2' }, { q: 'Line 2 — put the number in (write it as 14 cm / 2)', accept: ['14 cm / 2', '14 / 2', '14/2', '14 cm ÷ 2'], why: '= 14 cm ÷ 2' }, { q: 'Line 3 — the answer with its unit', accept: ['7 cm', '7'], why: '= 7 cm' }], explain: 'Radius = diameter ÷ 2 = 14 cm ÷ 2 = 7 cm.' },
      { id: 'math-geometry.radius-diameter.i05', type: 'fill', q: 'A circle has a radius of 5 cm. Its diameter is ____ cm.', accept: ['10'], level: 1, explain: '2 × 5 cm = 10 cm.' },
      { id: 'math-geometry.radius-diameter.i06', type: 'fill', q: 'A circle has a diameter of 8 cm. Its radius is ____ cm.', accept: ['4'], level: 1, explain: '8 cm ÷ 2 = 4 cm.' },
      { id: 'math-geometry.radius-diameter.i07', type: 'mcq', q: 'Which line of working is missing here?<br>Diameter = 2 × radius<br>= 18 cm', options: ['Nothing is missing', 'The substitution line, = 2 × 9 cm', 'The unit', 'The formula'], answer: 1, level: 3, explain: 'The middle line showing the numbers being put in is missing. It carries a mark of its own.' },
      { id: 'math-geometry.radius-diameter.i08', type: 'fill', q: 'The diameter of a circle is 28 cm. What is its radius, in cm?', accept: ['14'], level: 2, explain: '28 ÷ 2 = 14 cm.' },
      { id: 'math-geometry.radius-diameter.i09', type: 'tf', q: 'If the radius doubles, the diameter also doubles.', answer: true, level: 3, explain: 'True. The diameter is always exactly twice the radius, so they grow together.' },
      { id: 'math-geometry.radius-diameter.i10', type: 'fill', q: 'A round table top has a radius of 45 cm. What is its diameter, in cm?', accept: ['90'], level: 2, explain: '2 × 45 cm = 90 cm.' },
      { id: 'math-geometry.radius-diameter.i11', type: 'mcq', q: 'Which of these is written correctly?', options: ['= 2 × 9 = cm', '= 2 × 9 cm', '= 2 cm × 9 cm', '= 2 × 9 = 18'], answer: 1, level: 3, explain: 'The unit goes with the number: "= 2 × 9 cm". "= 2 × 9 = cm" is the slip that appeared in your workbook.' },
      { id: 'math-geometry.radius-diameter.i12', type: 'fill', q: 'The diameter of a circle is 7 cm. What is its radius, in cm?', accept: ['3.5', '3½'], level: 3, hint: 'It will not be a whole number.', explain: '7 ÷ 2 = 3.5 cm. A radius does not have to be a whole number.' },
      { id: 'math-geometry.radius-diameter.i13', type: 'fillMulti', q: 'A circle has a radius of 11 cm. Fill in each line.', level: 2, blanks: [{ label: 'Formula', accept: ['diameter = 2 x radius', 'd = 2 x r', 'd = 2r', 'diameter = 2 x r'] }, { label: 'Substitution', accept: ['2 x 11 cm', '2 x 11', '2x11'] }, { label: 'Answer', accept: ['22 cm', '22'] }], explain: 'Diameter = 2 × radius = 2 × 11 cm = 22 cm.' },
      { id: 'math-geometry.radius-diameter.i14', type: 'fill', q: 'The longest chord of a circle measures 20 cm. What is the radius, in cm?', accept: ['10'], level: 3, hint: 'The longest chord is the diameter.', explain: 'The longest chord IS the diameter, so the diameter is 20 cm and the radius is 20 ÷ 2 = 10 cm.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'math-geometry.clock-angles',
    subject: 'maths', topic: 'math-geometry',
    name: 'Angles on a clock',
    canDo: 'I can work out the angle the hands of a clock turn through.',
    weight: 3, difficulty: 3,
    prereq: ['math-geometry.angle-types'],
    gen: ['clockAngle'],
    teach: {
      hook: 'A clock face is a complete angle cut into twelve equal slices. Once you know the size of one slice, every clock question falls open.',
      explain:
        '<p>A full turn is <strong>360°</strong>, and the clock face is divided into <strong>12</strong> hours.</p>' +
        '<p>So one hour mark is <strong>360 ÷ 12 = 30°</strong>.</p>' +
        '<p>From that single fact:</p>' +
        '<ul>' +
        '<li>15 minutes = 3 hour marks = 30 + 30 + 30 = <strong>90°</strong>, a right angle.</li>' +
        '<li>30 minutes = <strong>180°</strong>, a straight angle.</li>' +
        '<li>One full hour of the minute hand = <strong>360°</strong>, a complete angle.</li>' +
        '<li>2 hours of the minute hand = 720°, which is 720 ÷ 90 = <strong>8 right angles</strong>.</li>' +
        '</ul>',
      worked: [
        {
          q: 'What kind of angle do the hands make at 4 o\'clock?',
          steps: [
            'At 4 o\'clock the hands are 4 hour marks apart.',
            '4 × 30° = 120°.',
            '120° is more than 90° and less than 180°.'
          ],
          a: 'An obtuse angle'
        }
      ],
      remember: [
        'One hour mark = 30°.',
        '15 minutes of the minute hand = 90°.',
        'Number of hour marks × 30 = the angle.'
      ],
      watchOut: 'Count the number of <em>hour marks</em> between the hands, not the number on the clock face.'
    },
    items: [
      { id: 'math-geometry.clock-angles.i01', type: 'fill', q: 'The minute hand moves from 12 to 1. Through how many degrees has it turned?', accept: ['30', '30°'], level: 1, hint: '360 ÷ 12', explain: '360° ÷ 12 = 30°. One hour mark is 30°.' },
      { id: 'math-geometry.clock-angles.i02', type: 'fill', q: 'In 15 minutes, the minute hand turns through ____ degrees.', accept: ['90', '90°'], level: 1, explain: '30 + 30 + 30 = 90°, which is a right angle.' },
      { id: 'math-geometry.clock-angles.i03', type: 'mcq', q: 'At <strong>4 o\'clock</strong>, the angle between the hands is ____', options: ['Acute', 'Right', 'Obtuse', 'Reflex'], answer: 2, level: 2, explain: '4 × 30° = 120°, which is between 90° and 180° — obtuse.' },
      { id: 'math-geometry.clock-angles.i04', type: 'mcq', q: 'At <strong>3 o\'clock</strong>, the angle between the hands is ____', options: ['Acute', 'Right', 'Obtuse', 'Straight'], answer: 1, level: 1, explain: '3 × 30° = 90°, exactly a right angle.' },
      { id: 'math-geometry.clock-angles.i05', type: 'mcq', q: 'At <strong>6 o\'clock</strong>, the angle between the hands is ____', options: ['Right', 'Obtuse', 'Straight', 'Reflex'], answer: 2, level: 1, explain: '6 × 30° = 180°, a straight angle. The hands point opposite ways.' },
      { id: 'math-geometry.clock-angles.i06', type: 'fill', q: 'In 2 hours the minute hand turns through 720°. How many <strong>right angles</strong> is that?', accept: ['8'], level: 3, hint: '720 ÷ 90', explain: '720 ÷ 90 = 8 right angles.' },
      { id: 'math-geometry.clock-angles.i07', type: 'fill', q: 'In 30 minutes, the minute hand turns through ____ degrees.', accept: ['180', '180°'], level: 2, explain: 'Half a turn is 180°, a straight angle.' },
      { id: 'math-geometry.clock-angles.i08', type: 'mcq', q: 'At <strong>2 o\'clock</strong>, the angle between the hands is ____', options: ['Acute', 'Right', 'Obtuse', 'Straight'], answer: 0, level: 2, explain: '2 × 30° = 60°, which is less than 90° — acute.' },
      { id: 'math-geometry.clock-angles.i09', type: 'fill', q: 'How many degrees does the minute hand turn through in one whole hour?', accept: ['360', '360°'], level: 1, explain: 'A full circle, 360° — a complete angle.' },
      { id: 'math-geometry.clock-angles.i10', type: 'fill', q: 'At 5 o\'clock, the angle between the hands is ____ degrees.', accept: ['150', '150°'], level: 2, explain: '5 × 30° = 150°.' },
      { id: 'math-geometry.clock-angles.i11', type: 'bucket', q: 'Sort each clock time by the kind of angle its hands make.', buckets: ['Acute', 'Right', 'Obtuse'], chips: [{ t: "1 o'clock", b: 'Acute' }, { t: "3 o'clock", b: 'Right' }, { t: "5 o'clock", b: 'Obtuse' }, { t: "2 o'clock", b: 'Acute' }, { t: "4 o'clock", b: 'Obtuse' }], level: 3, explain: 'Multiply the hour marks by 30, then classify: 30°, 90°, 150°, 60°, 120°.' },
      { id: 'math-geometry.clock-angles.i12', type: 'fill', q: 'In 45 minutes, the minute hand turns through ____ degrees.', accept: ['270', '270°'], level: 3, hint: 'Three quarters of a turn.', explain: '45 minutes is three quarters of a turn: 3 × 90° = 270°. That is a reflex angle.' },
      { id: 'math-geometry.clock-angles.i13', type: 'tf', q: 'In 15 minutes the minute hand makes one right angle.', answer: true, level: 1, explain: 'True — 15 minutes is a quarter turn, which is 90°.' },
      { id: 'math-geometry.clock-angles.i14', type: 'mcq', q: 'How many right angles does the minute hand turn through in one hour?', options: ['2', '3', '4', '6'], answer: 2, level: 2, explain: '360° ÷ 90° = 4 right angles in a full turn.' }
    ]
  },

  /* ---------------------------------------------------------- */
  {
    id: 'math-geometry.spelling',
    subject: 'maths', topic: 'math-geometry',
    name: 'Spelling the maths words',
    canDo: 'I can spell the geometry terms correctly, so I do not lose marks on words I understand.',
    weight: 4, difficulty: 2,
    prereq: [],
    teach: {
      hook: 'You know all of this geometry. In your notebook, six words are spelt wrong again and again — and in a written answer that is a lost mark on something you actually knew.',
      explain:
        '<p>These are the six from your own notebook, with the way you wrote them:</p>' +
        '<ul>' +
        '<li>"Stright" → <strong>straight</strong> (s-t-r-<u>ai</u>-g-h-t). You wrote it wrongly three times.</li>' +
        '<li>"segament" → <strong>segment</strong> (seg-ment, no "a" in the middle). Three times.</li>' +
        '<li>"circumfrence" → <strong>circumference</strong> (circum-<u>fe</u>-rence).</li>' +
        '<li>"intersectiong" → <strong>intersecting</strong> (intersect + ing).</li>' +
        '<li>"ancute" → <strong>acute</strong> (no "n").</li>' +
        '<li>"instument" / "Istrument" → <strong>instrument</strong> (in-<u>str</u>-u-ment).</li>' +
        '</ul>',
      worked: [
        {
          q: 'How do you spell the word for an angle of exactly 180°?',
          steps: [
            'It is not "stright" — that is missing the a.',
            'Break it up: str + <strong>aigh</strong> + t.',
            'Same "aigh" as in <em>straight away</em>.'
          ],
          a: 'straight'
        }
      ],
      remember: [
        'straight — has "aigh" in it, like eight.',
        'segment — seg + ment. No "a".',
        'circumference — circum + ference.',
        'acute — starts with a plain "a", no n.'
      ],
      watchOut: 'These words appear in almost every geometry answer you write, so one wrong spelling can cost you marks several times over in the same paper.'
    },
    items: [
      { id: 'math-geometry.spelling.i01', type: 'mcq', q: 'Which spelling is correct?', options: ['Stright', 'Straght', 'Straight', 'Strait'], answer: 2, level: 1, explain: '<strong>Straight</strong>. You wrote "Stright" three times in your notebook.' },
      { id: 'math-geometry.spelling.i02', type: 'mcq', q: 'Which spelling is correct?', options: ['segament', 'segment', 'segmant', 'seggment'], answer: 1, level: 1, explain: '<strong>Segment</strong> — seg + ment, with no "a" in the middle.' },
      { id: 'math-geometry.spelling.i03', type: 'mcq', q: 'Which spelling is correct?', options: ['circumfrence', 'circumference', 'circumferance', 'cirumference'], answer: 1, level: 2, explain: '<strong>Circumference</strong>: circum-fe-rence.' },
      { id: 'math-geometry.spelling.i04', type: 'mcq', q: 'Which spelling is correct?', options: ['intersectiong', 'intersecting', 'intersepting', 'interseting'], answer: 1, level: 1, explain: '<strong>Intersecting</strong> — the verb "intersect" plus "-ing".' },
      { id: 'math-geometry.spelling.i05', type: 'mcq', q: 'Which spelling is correct?', options: ['ancute', 'accute', 'acute', 'akute'], answer: 2, level: 1, explain: '<strong>Acute</strong> — a-c-u-t-e. There is no "n".' },
      { id: 'math-geometry.spelling.i06', type: 'mcq', q: 'Which spelling is correct?', options: ['instument', 'Istrument', 'instrument', 'instrament'], answer: 2, level: 1, explain: '<strong>Instrument</strong> — in-str-u-ment.' },
      { id: 'math-geometry.spelling.i07', type: 'fill', q: 'Spell the word: an angle of exactly 180° is a ____ angle.', accept: ['straight'], level: 2, explain: 'Straight — with "aigh" in the middle.' },
      { id: 'math-geometry.spelling.i08', type: 'fill', q: 'Spell the word: a part of a line with two end points is a line ____', accept: ['segment'], level: 2, explain: 'Segment. No "a" in the middle.' },
      { id: 'math-geometry.spelling.i09', type: 'fill', q: 'Spell the word: the distance all the way round a circle is its ____', accept: ['circumference'], level: 2, explain: 'Circumference.' },
      { id: 'math-geometry.spelling.i10', type: 'fill', q: 'Spell the word: an angle less than 90° is ____', accept: ['acute'], level: 2, explain: 'Acute.' },
      { id: 'math-geometry.spelling.i11', type: 'bucket', q: 'Sort each spelling.', buckets: ['Correct', 'Wrong'], chips: [{ t: 'straight', b: 'Correct' }, { t: 'segament', b: 'Wrong' }, { t: 'circumference', b: 'Correct' }, { t: 'ancute', b: 'Wrong' }, { t: 'perpendicular', b: 'Correct' }, { t: 'instument', b: 'Wrong' }], level: 2, explain: 'The wrong ones are segament (segment), ancute (acute) and instument (instrument).' },
      { id: 'math-geometry.spelling.i12', type: 'fill', q: 'Spell the word: lines that cross each other are ____ lines.', accept: ['intersecting'], level: 2, explain: 'Intersecting lines.' },
      { id: 'math-geometry.spelling.i13', type: 'fill', q: 'Spell the word: the tool used to measure an angle is an ____ called a protractor.', accept: ['instrument'], level: 2, explain: 'Instrument — in-str-u-ment.' },
      { id: 'math-geometry.spelling.i14', type: 'mcq', q: 'Which sentence has NO spelling mistake?', options: ['A stright angle is 180 degrees.', 'A line segament has two end points.', 'The circumference is the length of the circle.', 'An ancute angle is less than 90 degrees.'], answer: 2, level: 3, explain: 'Only the third is right. The others should be straight, segment and acute.' }
    ]
  }

]);
