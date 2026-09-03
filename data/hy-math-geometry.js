/* ============================================================
   HALF-YEARLY HQ — Maths · Geometry (Chapter 8)

   Source: Crispin's own Chapter-8 Geometry material —
   18 pages of handwritten class notes (notebook) + 5 printed
   school booklet pages (58, 59, 60, 61, 62), photographed
   29 Jun 2026.  Transcribed in .tmp/hy-extract/math-geometry.md

   School wording is used verbatim wherever the notes give a
   definition.  Two areas ("Point / line / line segment / Ray"
   and "Circle / centre / circumference / radius / diameter")
   are deferred by the notebook to Google Classroom and are NOT
   in the photographed material; standard CBSE Grade-5 wording
   is used for those and is listed in the topic gaps note.
   ============================================================ */

window.HY_TOPICS = (window.HY_TOPICS || []).concat([{
  id: 'math-geometry',
  subject: 'maths',
  name: 'Geometry',
  emoji: '📐',
  blurb: 'Points, lines and rays; parallel and perpendicular; the seven angles; the protractor; circles, chords and the radius sums.',
  source: 'Chapter 8 class notebook, 18 pages + school booklet pp. 58-62',
  examWeight: 45
}]);

window.HY_SKILLS = (window.HY_SKILLS || []).concat([

/* ---------- 1. Point, line, line segment, ray ---------- */
{
  id: 'math-geometry.basics',
  subject: 'maths',
  topic: 'math-geometry',
  name: 'Point, line, ray, segment',
  canDo: 'I can say what a point, a line, a line segment and a ray are, and which of them has a definite length.',
  weight: 5,
  difficulty: 1,
  prereq: [],
  teach: {
    hook: 'Four words. Every other thing in this chapter is built out of them, and the paper always opens with them.',
    explain: '<p>A <strong>point</strong> shows an exact location. It has no length, no breadth and no height. It is the <strong>basic unit of geometry</strong>. We mark it with a dot and a capital letter.</p><p>A <strong>line</strong> goes on endlessly in both directions. It has <strong>no end points</strong>, so it has <strong>no definite length</strong>.</p><p>A <strong>line segment</strong> is the part of a line between two end points. Because it stops at both ends it has a <strong>definite (fixed) length</strong>, so you can measure it with a ruler.</p><p>A <strong>ray</strong> has <strong>one end point</strong> and goes on endlessly in the other direction. It has no definite length, so its length <strong>cannot be measured</strong>.</p>',
    worked: [
      {
        q: 'Which one has a definite length: a line, a ray or a line segment?',
        steps: [
          'A length can only be measured if the drawing <strong>stops</strong> at both ends.',
          'A line has no end points, so it never stops. Not measurable.',
          'A ray stops at one end only, so it still never stops at the other. Not measurable.',
          'A line segment stops at <strong>both</strong> ends, so it has a fixed length.'
        ],
        a: 'The line segment'
      },
      {
        q: 'How many end points does each of the three have?',
        steps: [
          'Line: <strong>0</strong> end points, arrows both ways.',
          'Ray: <strong>1</strong> end point, arrow one way.',
          'Line segment: <strong>2</strong> end points, no arrows.'
        ],
        a: 'Line 0, ray 1, line segment 2'
      }
    ],
    remember: [
      'Count the end points: 0 = line, 1 = ray, 2 = line segment.',
      'Only the line segment can be measured. Only the line segment has a definite length.',
      'A point is the basic unit of geometry. No length, no breadth, no height.',
      'A line segment and a ray are both parts of a line.'
    ],
    watchOut: 'A ray does have a starting point, and that tempts people into saying you can measure it. You cannot. It runs on forever at the other end.',
    svg: '<svg viewBox="0 0 260 150" role="img" xmlns="http://www.w3.org/2000/svg"><title>A line, a ray and a line segment</title><g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"><path d="M30 30 H210"/><path d="M30 30 l10 -6 M30 30 l10 6 M210 30 l-10 -6 M210 30 l-10 6"/><path d="M30 80 H210"/><path d="M210 80 l-10 -6 M210 80 l-10 6"/><circle cx="30" cy="80" r="3" fill="currentColor"/><path d="M30 130 H210"/><circle cx="30" cy="130" r="3" fill="currentColor"/><circle cx="210" cy="130" r="3" fill="currentColor"/></g><g fill="currentColor" font-family="Inter, system-ui" font-size="14"><text x="222" y="35">line</text><text x="222" y="85">ray</text><text x="222" y="135">segment</text></g></svg>'
  },
  items: [
    { id: 'math-geometry.basics.i01', type: 'fill', level: 1, q: 'A ______ shows an exact location.', accept: ['point', 'a point'], placeholder: 'one word', hint: 'It is just a dot with a capital letter.', explain: 'A point shows an exact location. It has no length, breadth or height.' },
    { id: 'math-geometry.basics.i02', type: 'fill', level: 1, q: 'A ______ is the basic unit of geometry.', accept: ['point', 'a point'], placeholder: 'one word', explain: 'Point is the basic unit of geometry. Everything else is built out of points.' },
    { id: 'math-geometry.basics.i03', type: 'mcq', level: 1, q: 'Which one has a <strong>definite length</strong>?', options: ['A line', 'A ray', 'A line segment', 'A point'], answer: 2, hint: 'Which one stops at both ends?', explain: 'A line segment has two end points, so it has a definite length and can be measured.' },
    { id: 'math-geometry.basics.i04', type: 'tf', level: 1, q: 'The length of a ray can be measured.', answer: false, explain: 'A ray runs on endlessly from its one end point, so it has no definite length and cannot be measured.' },
    { id: 'math-geometry.basics.i05', type: 'tf', level: 1, q: 'A ray has one end point.', answer: true, explain: 'Yes. One end point, and it goes on endlessly in the other direction.' },
    { id: 'math-geometry.basics.i06', type: 'tf', level: 1, q: 'A point has no length, breadth or height.', answer: true, explain: 'Correct. A point only shows a position.' },
    { id: 'math-geometry.basics.i07', type: 'mcq', level: 1, q: 'How many end points does a <strong>line segment</strong> have?', options: ['None', 'One', 'Two', 'Endless'], answer: 2, explain: 'Two end points. That is exactly why it has a fixed length.' },
    { id: 'math-geometry.basics.i08', type: 'mcq', level: 1, q: 'How many end points does a <strong>line</strong> have?', options: ['None', 'One', 'Two', 'Four'], answer: 0, hint: 'Arrowheads at both ends mean it never stops.', explain: 'A line has no end points. It goes on endlessly in both directions.' },
    { id: 'math-geometry.basics.i09', type: 'fill', level: 1, q: 'A line segment or a ray is a part of a ______', accept: ['line', 'a line'], placeholder: 'one word', explain: 'Both are cut out of a line, so both are parts of a line.' },
    { id: 'math-geometry.basics.i10', type: 'bucket', level: 2, q: 'Sort each one by whether its length can be measured.', buckets: ['Definite length', 'No definite length'], chips: [{ t: 'Line segment', b: 'Definite length' }, { t: 'Line', b: 'No definite length' }, { t: 'Ray', b: 'No definite length' }, { t: 'The edge of your ruler', b: 'Definite length' }, { t: 'A torch beam', b: 'No definite length' }, { t: 'A matchstick', b: 'Definite length' }], explain: 'Anything that stops at both ends has a definite length. A ray, like a torch beam, keeps going.' },
    { id: 'math-geometry.basics.i11', type: 'match', level: 2, q: 'Match each word to what it means.', pairs: [{ l: 'Point', r: 'Shows an exact location' }, { l: 'Line', r: 'No end points, goes on both ways' }, { l: 'Line segment', r: 'Two end points, fixed length' }, { l: 'Ray', r: 'One end point, cannot be measured' }], explain: 'Count the end points and the four words sort themselves out: 0, 1, 2.' },
    { id: 'math-geometry.basics.i12', type: 'mcq', level: 2, q: 'The shortest distance between the two points M and N is ______', options: ['the line MN', 'the ray MN', 'the line segment MN', 'the point MN'], answer: 2, explain: 'The straight piece joining M to N is the line segment MN. It is the shortest route between them.' },
    { id: 'math-geometry.basics.i13', type: 'mcq', level: 3, q: 'Aarav says, "A ray can be measured with a ruler, because it has a starting point." Is he right?', options: ['Yes, one end point is enough to measure it', 'No, it has no end at the other side, so it has no definite length', 'Yes, if you draw it short', 'No, because a ray is not straight'], answer: 1, hint: 'You need BOTH ends to measure something.', explain: 'One end point is not enough. A ray runs on endlessly the other way, so it has no definite length. A ray IS straight, so the last option is wrong too.' },
    { id: 'math-geometry.basics.i14', type: 'multi', level: 3, q: 'Tick <strong>every</strong> statement that is true.', options: ['A point is the basic unit of geometry', 'A line has two end points', 'A line segment has a definite length', 'A ray goes on endlessly in one direction', 'A line has a definite length'], answer: [0, 2, 3], explain: 'A line has no end points and no definite length, so those two are false. The other three are the exact facts from the notes.' },
    { id: 'math-geometry.basics.i15', type: 'shortAnswer', level: 3, q: 'What is the difference between a line and a line segment?', model: 'A line has no end points and goes on endlessly in both directions, so it has no definite length. A line segment has two end points, so it has a definite length and can be measured. A line segment is a part of a line.', must: ['says a line has no end points / goes on endlessly both ways', 'says a line segment has two end points', 'says the line segment has a definite length that can be measured'], lines: 3, explain: 'Three marking points: end points, endlessness, measurable length.' }
  ]
},

/* ---------- 2. Notation ---------- */
{
  id: 'math-geometry.notation',
  subject: 'maths',
  topic: 'math-geometry',
  name: 'Writing lines and rays',
  canDo: 'I can write and read the symbols for a line, a ray and a line segment, and say when the order of the letters matters.',
  weight: 4,
  difficulty: 2,
  prereq: ['math-geometry.basics'],
  teach: {
    hook: 'The examiner can tell a line from a ray only by the little mark you draw on top. Miss it and the mark goes.',
    explain: '<p>The symbol on top tells you which one it is:</p><ul><li>Line PQ is written <strong>↔PQ</strong> (a double-headed arrow above).</li><li>Ray UV is written <strong>→UV</strong> (a single arrow above).</li><li>Line segment MN is written <strong>‾MN</strong> (a bar above).</li></ul><p><strong>Does the order of the letters matter?</strong> For a line and a line segment, no. ‾CD and ‾DC are the same segment, because both end points are just ends.</p><p>For a <strong>ray</strong>, yes. The <strong>first</strong> letter is the starting point. So →ST starts at S and runs past T, while →TS starts at T and runs past S. They are different rays.</p>',
    worked: [
      {
        q: 'In →NM, what is the starting point, and which way does it go?',
        steps: [
          'The arrow above tells you this is a <strong>ray</strong>.',
          'For a ray the <strong>first letter is the starting point</strong>, so the starting point is <strong>N</strong>.',
          'It then runs endlessly towards the second letter.'
        ],
        a: 'It starts at N and goes endlessly in the direction of M'
      },
      {
        q: 'True or false: ‾CD is different from ‾DC.',
        steps: [
          'The bar means this is a <strong>line segment</strong>.',
          'A segment is just the piece between two end points.',
          'Starting from C or from D, it is the same piece.'
        ],
        a: 'False. They are the same segment.'
      }
    ],
    remember: [
      'Double arrow ↔ = line. Single arrow → = ray. Bar ‾ = segment.',
      'Ray: first letter = the starting point.',
      'Order matters for a ray only. ‾AB = ‾BA, but →AB is not →BA.'
    ],
    watchOut: 'Writing PQ with nothing on top. A bare PQ is not an answer in this chapter. Always draw the bar or the arrow.'
  },
  items: [
    { id: 'math-geometry.notation.i01', type: 'mcq', level: 1, q: 'Line PQ is written as ______', options: ['PQ with a bar above it', 'PQ with a single arrow above it', 'PQ with a double-headed arrow above it', 'PQ with a dot above it'], answer: 2, explain: 'A line runs both ways, so it takes the double-headed arrow: ↔PQ.' },
    { id: 'math-geometry.notation.i02', type: 'mcq', level: 1, q: 'A ray UV is written as ______', options: ['↔UV', '→UV', '‾UV', 'UV'], answer: 1, explain: 'A ray goes one way only, so it takes a single arrow: →UV.' },
    { id: 'math-geometry.notation.i03', type: 'mcq', level: 1, q: 'The line segment MN is written as ______', options: ['↔MN', '→MN', '‾MN', '∠MN'], answer: 2, explain: 'A segment stops at both ends, so it gets a plain bar: ‾MN.' },
    { id: 'math-geometry.notation.i04', type: 'match', level: 1, q: 'Match each symbol to what it names.', pairs: [{ l: '↔AB', r: 'Line AB' }, { l: '→AB', r: 'Ray AB' }, { l: '‾AB', r: 'Line segment AB' }, { l: 'A', r: 'Point A' }], explain: 'Double arrow, single arrow, bar, nothing. Four different things.' },
    { id: 'math-geometry.notation.i05', type: 'tf', level: 2, q: '‾CD is different from ‾DC.', answer: false, explain: 'False. A line segment is the same piece whichever end you name first, so ‾CD and ‾DC are the same.' },
    { id: 'math-geometry.notation.i06', type: 'tf', level: 2, q: '→ST and →TS are different.', answer: true, explain: 'True. →ST starts at S, →TS starts at T. Different starting points means different rays.' },
    { id: 'math-geometry.notation.i07', type: 'mcq', level: 2, q: 'The shortest distance between the two points M and N is written as ______', options: ['↔MN', '→MN', '‾MN', 'point MN'], answer: 2, explain: 'The shortest distance is the line segment joining them, written ‾MN.' },
    { id: 'math-geometry.notation.i08', type: 'fill', level: 2, q: 'In →NM, the starting point is ______', accept: ['n'], placeholder: 'a letter', hint: 'First letter of a ray.', explain: 'For a ray the first letter is the starting point, so it is N.' },
    { id: 'math-geometry.notation.i09', type: 'fill', level: 2, q: 'In →NM, the ray goes endlessly in the direction of ______', accept: ['m'], placeholder: 'a letter', explain: 'It starts at N and runs endlessly towards M.' },
    { id: 'math-geometry.notation.i10', type: 'bucket', level: 2, q: 'Sort each symbol.', buckets: ['Line', 'Ray', 'Line segment'], chips: [{ t: '↔PQ', b: 'Line' }, { t: '→PQ', b: 'Ray' }, { t: '‾PQ', b: 'Line segment' }, { t: '↔XY', b: 'Line' }, { t: '‾XY', b: 'Line segment' }, { t: '→XY', b: 'Ray' }], explain: 'Read the mark on top, not the letters.' },
    { id: 'math-geometry.notation.i11', type: 'mcq', level: 3, q: 'Riya wants the ray that <strong>starts at A</strong> and passes through B. She writes →BA. Is she right?', options: ['Yes, the letters can go either way', 'No, she should write →AB, because the first letter is the starting point', 'No, she should write ‾AB', 'Yes, but only if B is further away'], answer: 1, hint: 'Which letter names the start of a ray?', explain: 'The first letter of a ray is its starting point. Starting at A means →AB. →BA is a different ray, starting at B.' },
    { id: 'math-geometry.notation.i12', type: 'mcq', level: 3, q: 'Which pair names <strong>exactly the same thing</strong>?', options: ['→PQ and →QP', '‾PQ and ‾QP', '→PQ and ‾PQ', '↔PQ and →PQ'], answer: 1, explain: 'Only the segment is order-free. ‾PQ and ‾QP are the same segment. The rays are different, and a ray, a line and a segment are three different things.' },
    { id: 'math-geometry.notation.i13', type: 'multi', level: 3, q: 'Tick <strong>every</strong> true statement.', options: ['↔AB and ↔BA are the same line', '→AB and →BA are the same ray', '‾AB and ‾BA are the same line segment', '‾AB can be measured with a ruler', '→AB can be measured with a ruler'], answer: [0, 2, 3], explain: 'Lines and segments do not care about letter order; rays do. And only the segment has a definite length.' },
    { id: 'math-geometry.notation.i14', type: 'fillMulti', level: 3, q: 'Write what each symbol names. Use the words <em>line</em>, <em>ray</em> or <em>line segment</em>.', blanks: [{ label: '↔DE is the ...', accept: ['line', 'line de', 'the line de'] }, { label: '→DE is the ...', accept: ['ray', 'ray de', 'the ray de'] }, { label: '‾DE is the ...', accept: ['line segment', 'segment', 'line segment de'] }], explain: 'Double arrow line, single arrow ray, bar segment.' },
    { id: 'math-geometry.notation.i15', type: 'tf', level: 2, q: '→AB and →BA start at different points.', answer: true, explain: 'True. →AB starts at A and →BA starts at B, so they are two different rays.' }
  ]
},

/* ---------- 3. Types of lines ---------- */
{
  id: 'math-geometry.line-types',
  subject: 'maths',
  topic: 'math-geometry',
  name: 'Types of lines',
  canDo: 'I can tell intersecting, parallel and perpendicular lines apart and define each one in the words the notes use.',
  weight: 5,
  difficulty: 2,
  prereq: ['math-geometry.basics'],
  teach: {
    hook: 'Railway tracks, the corner of your notebook, and a pair of scissors. Three lines, three different names.',
    explain: '<p><strong>Intersecting lines:</strong> Lines which cross each other at a point are called intersecting lines. The point at which they cross is called the <strong>point of intersection</strong>.</p><p><strong>Parallel lines:</strong> The lines in a plane that never meet and are always at an equal distance from each other are called parallel lines. Railway tracks are the classic example.</p><p><strong>Perpendicular lines:</strong> The intersecting lines that form <strong>90°</strong> at the point of intersection. We mark the right angle with a small square box.</p><p>So perpendicular lines are a <em>special kind</em> of intersecting lines. Every perpendicular pair is intersecting, but most intersecting pairs are not perpendicular.</p>',
    worked: [
      {
        q: 'Two lines cross each other and one of the angles formed is 90°. What kind of lines are they?',
        steps: [
          'They cross, so they are <strong>intersecting</strong> lines.',
          'The angle at the point of intersection is 90°.',
          'Intersecting lines that form 90° have a special name.'
        ],
        a: 'Perpendicular lines (and they are intersecting lines too)'
      },
      {
        q: 'Line AB and line CD are always 4 cm apart, all along their length. Will they ever cross?',
        steps: [
          'They stay at an <strong>equal distance</strong> from each other.',
          'If the gap never shrinks, they can never touch.',
          'Lines that never meet and stay an equal distance apart are parallel.'
        ],
        a: 'No. They are parallel lines.'
      }
    ],
    remember: [
      'Intersecting = cross at a point. That point is the point of intersection.',
      'Parallel = never meet, always the same distance apart. Railway tracks.',
      'Perpendicular = intersecting AND 90°. Look for the little square box.',
      'Spelling: i-n-t-e-r-s-e-c-t-i-n-g. Ends in -ing, not -iong.'
    ],
    watchOut: 'Not every crossing is perpendicular. Only call it perpendicular if the angle at the crossing is 90°.',
    svg: '<svg viewBox="0 0 200 165" role="img" xmlns="http://www.w3.org/2000/svg"><title>Perpendicular lines AB and PQ meeting at O</title><g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"><path d="M30 80 H170"/><path d="M30 80 l10 -6 M30 80 l10 6 M170 80 l-10 -6 M170 80 l-10 6"/><path d="M100 20 V140"/><path d="M100 20 l-6 10 M100 20 l6 10 M100 140 l-6 -10 M100 140 l6 -10"/><path d="M100 66 H114 V80"/><circle cx="100" cy="80" r="3" fill="currentColor"/></g><g fill="currentColor" font-family="Inter, system-ui" font-size="14"><text x="94" y="14">P</text><text x="94" y="158">Q</text><text x="14" y="85">A</text><text x="178" y="85">B</text><text x="84" y="96">O</text><text x="120" y="60">90°</text></g></svg>'
  },
  items: [
    { id: 'math-geometry.line-types.i01', type: 'fill', level: 1, q: 'Lines which cross each other at a point are called ______', accept: ['intersecting lines', 'intersecting'], placeholder: 'two words', hint: 'Ends in -ing.', explain: 'Lines which cross each other at a point are called intersecting lines. Spelling: intersecting.' },
    { id: 'math-geometry.line-types.i02', type: 'fill', level: 1, q: 'The point at which two lines cross is called the ______', accept: ['point of intersection', 'intersection point'], placeholder: 'three words', explain: 'The point at which they cross is called the point of intersection.' },
    { id: 'math-geometry.line-types.i03', type: 'fill', level: 1, q: '______ never meet each other.', accept: ['parallel lines', 'parallel'], placeholder: 'two words', explain: 'Parallel lines never meet and are always at an equal distance from each other.' },
    { id: 'math-geometry.line-types.i04', type: 'fill', level: 1, q: 'Railway tracks are an example of ______ lines.', accept: ['parallel'], placeholder: 'one word', explain: 'The two rails never meet and stay the same distance apart, so they are parallel.' },
    { id: 'math-geometry.line-types.i05', type: 'mcq', level: 1, q: 'Perpendicular lines form an angle of ______ at the point of intersection.', options: ['45°', '90°', '180°', '360°'], answer: 1, explain: 'Perpendicular lines are the intersecting lines that form 90° at the point of intersection.' },
    { id: 'math-geometry.line-types.i06', type: 'mcq', level: 2, q: 'In the figure, what kind of lines are ↔AB and ↔PQ?', svg: '<svg viewBox="0 0 200 165" role="img" xmlns="http://www.w3.org/2000/svg"><title>Two lines meeting with a right angle box</title><g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"><path d="M30 80 H170"/><path d="M100 20 V140"/><path d="M100 66 H114 V80"/><circle cx="100" cy="80" r="3" fill="currentColor"/></g><g fill="currentColor" font-family="Inter, system-ui" font-size="14"><text x="94" y="14">P</text><text x="94" y="158">Q</text><text x="16" y="85">A</text><text x="178" y="85">B</text><text x="84" y="96">O</text></g></svg>', options: ['Parallel lines', 'Perpendicular lines', 'Lines that never meet', 'Rays'], answer: 1, hint: 'What does the little square box at O mean?', explain: 'The small square box marks a 90° angle, so these intersecting lines are perpendicular.' },
    { id: 'math-geometry.line-types.i07', type: 'mcq', level: 2, q: 'In the figure, ↔AB and ↔CD cross at O. What is the point O called?', svg: '<svg viewBox="0 0 200 165" role="img" xmlns="http://www.w3.org/2000/svg"><title>Lines AB and CD crossing at O</title><g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"><path d="M30 20 L170 140"/><path d="M30 20 l3.3 9.4 M30 20 l9.8 1.8 M170 140 l-3.3 -9.4 M170 140 l-9.8 -1.8"/><path d="M170 20 L30 140"/><path d="M170 20 l-9.8 1.8 M170 20 l-3.3 9.4 M30 140 l9.8 -1.8 M30 140 l3.3 -9.4"/><circle cx="100" cy="80" r="3" fill="currentColor"/></g><g fill="currentColor" font-family="Inter, system-ui" font-size="14"><text x="20" y="14">A</text><text x="176" y="14">C</text><text x="20" y="158">D</text><text x="176" y="158">B</text><text x="106" y="74">O</text></g></svg>', options: ['The vertex', 'The point of intersection', 'The centre', 'The base line'], answer: 1, explain: 'Where intersecting lines cross is called the point of intersection. Vertex is the word used for an angle.' },
    { id: 'math-geometry.line-types.i08', type: 'bucket', level: 2, q: 'Sort each real-life pair of lines.', buckets: ['Parallel', 'Perpendicular'], chips: [{ t: 'Railway tracks', b: 'Parallel' }, { t: 'The corner of a page', b: 'Perpendicular' }, { t: 'Opposite edges of a ruler', b: 'Parallel' }, { t: 'A plus sign +', b: 'Perpendicular' }, { t: 'The lines on ruled paper', b: 'Parallel' }, { t: 'The letter L', b: 'Perpendicular' }], explain: 'If they never meet, parallel. If they meet at 90°, perpendicular.' },
    { id: 'math-geometry.line-types.i09', type: 'tf', level: 2, q: 'All perpendicular lines are intersecting lines.', answer: true, explain: 'True. Perpendicular lines are the intersecting lines that form 90°, so they must cross.' },
    { id: 'math-geometry.line-types.i10', type: 'tf', level: 2, q: 'All intersecting lines are perpendicular lines.', answer: false, explain: 'False. Lines can cross at 30°, 50° or any angle. Only a 90° crossing is perpendicular.' },
    { id: 'math-geometry.line-types.i11', type: 'match', level: 2, q: 'Match each definition to its name.', pairs: [{ l: 'Lines which cross each other at a point', r: 'Intersecting lines' }, { l: 'Lines that never meet and are always an equal distance apart', r: 'Parallel lines' }, { l: 'Intersecting lines that form 90°', r: 'Perpendicular lines' }, { l: 'The point at which two lines cross', r: 'Point of intersection' }], explain: 'These are the four definitions written in the notes, word for word.' },
    { id: 'math-geometry.line-types.i12', type: 'mcq', level: 3, q: 'Zoya says, "These two lines cross each other at 90°, so they are parallel lines." What is wrong?', options: ['Nothing, she is right', 'Parallel lines never cross at all, so lines that cross at 90° are perpendicular', 'They are parallel only if they are also equal in length', 'They should be called intersecting, never perpendicular'], answer: 1, hint: 'Do parallel lines ever meet?', explain: 'Parallel lines never meet. If they cross, they cannot be parallel. Crossing at 90° makes them perpendicular (and also intersecting).' },
    { id: 'math-geometry.line-types.i13', type: 'multi', level: 3, q: 'Tick <strong>every</strong> true statement about parallel lines.', options: ['They never meet', 'They are always at an equal distance from each other', 'They cross at one point', 'Railway tracks are an example', 'They form 90° where they meet'], answer: [0, 1, 3], explain: 'Parallel lines never meet, so options about crossing and about 90° cannot be true.' },
    { id: 'math-geometry.line-types.i14', type: 'shortAnswer', level: 3, q: 'Define parallel lines.', model: 'The lines in a plane that never meet and are always at an equal distance from each other are called parallel lines.', must: ['says they never meet', 'says they are always at an equal distance from each other', 'uses the words parallel lines'], lines: 2, explain: 'Both halves matter. "Never meet" alone is not the full definition the notes give.' },
    { id: 'math-geometry.line-types.i15', type: 'fillMulti', level: 3, q: 'Name the type of lines described.', blanks: [{ label: 'They cross at a point, at 65°', accept: ['intersecting lines', 'intersecting'] }, { label: 'They cross at a point, at 90°', accept: ['perpendicular lines', 'perpendicular'] }, { label: 'They never cross, gap always 3 cm', accept: ['parallel lines', 'parallel'] }], explain: 'Any crossing = intersecting. A 90° crossing = perpendicular. No crossing with a fixed gap = parallel.' }
  ]
},

/* ---------- 4. The two line rules + counting segments ---------- */
{
  id: 'math-geometry.line-rules',
  subject: 'maths',
  topic: 'math-geometry',
  name: 'Line rules and counting',
  canDo: 'I can use the two Note rules about lines through points, and count the line segments in a capital letter.',
  weight: 3,
  difficulty: 2,
  prereq: ['math-geometry.basics'],
  teach: {
    hook: 'Two short rules the teacher wrote as Notes. Notes in the margin are the ones that turn up in the paper.',
    explain: '<p><strong>Note 1:</strong> Only <strong>one</strong> line segment can be drawn passing through two given points. Put two dots on paper and join them straight. There is only one straight way to do it.</p><p><strong>Note 2:</strong> An <strong>infinite</strong> number of lines can be drawn through any given point. One dot lets you swing the line round to any slope you like, and you never run out.</p><p>The Activity page also asks you to <strong>count line segments</strong> in capital letters. Count each separate straight stroke once.</p>',
    worked: [
      {
        q: 'How many line segments are needed to form the letter W?',
        steps: [
          'Draw W slowly and count the times your pencil changes direction.',
          'Down-right, up-right, down-right, up-right.',
          'That is four separate straight strokes.'
        ],
        a: '4'
      },
      {
        q: 'How many lines can be drawn through a single point P?',
        steps: [
          'Rest a line on P and turn it a little. It still passes through P.',
          'Every new slope gives a new line, and the slopes never run out.',
          'So the number is not 1 or 2, it is endless.'
        ],
        a: 'An infinite number'
      }
    ],
    remember: [
      'One point, infinite lines. Two points, only one line segment.',
      'Letter counts from the Activity page: N = 3, W = 4, L = 2, X = 2.'
    ],
    watchOut: 'Do not swap the two rules round. The word "infinite" goes with ONE point; the word "only one" goes with TWO points.',
    svg: '<svg viewBox="0 0 200 165" role="img" xmlns="http://www.w3.org/2000/svg"><title>Infinite lines through one point</title><g stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"><path d="M100 80 L165 80 M100 80 L146 34 M100 80 L100 15 M100 80 L54 34 M100 80 L35 80 M100 80 L54 126 M100 80 L100 145 M100 80 L146 126"/><circle cx="100" cy="80" r="3.5" fill="currentColor"/></g><g fill="currentColor" font-family="Inter, system-ui" font-size="14"><text x="96" y="10">A</text><text x="150" y="30">C</text><text x="172" y="85">Y</text><text x="150" y="140">F</text><text x="96" y="159">B</text><text x="42" y="140">D</text><text x="20" y="85">X</text><text x="42" y="30">E</text></g></svg>'
  },
  items: [
    { id: 'math-geometry.line-rules.i01', type: 'tf', level: 1, q: 'Only one line segment can be drawn passing through two given points.', answer: true, explain: 'True. Two dots, one straight join. This is the Note in the notebook.' },
    { id: 'math-geometry.line-rules.i02', type: 'fill', level: 1, q: '______ number of lines can be drawn through any given point.', accept: ['infinite', 'an infinite', 'infinitely many'], placeholder: 'one word', hint: 'Spelling: i-n-f-i-n-i-t-e.', explain: 'An infinite number of lines can be drawn through any given point.' },
    { id: 'math-geometry.line-rules.i03', type: 'mcq', level: 1, q: 'How many lines can be drawn through <strong>one</strong> given point?', options: ['One', 'Two', 'Four', 'An infinite number'], answer: 3, explain: 'You can swing the line round to any slope, so there is no limit.' },
    { id: 'math-geometry.line-rules.i04', type: 'mcq', level: 2, q: 'How many line segments can be drawn passing through <strong>two</strong> given points?', options: ['Only one', 'Two', 'Four', 'An infinite number'], answer: 0, hint: 'How many straight ways are there to join two dots?', explain: 'Only one. Once both end points are fixed, the straight join is fixed too.' },
    { id: 'math-geometry.line-rules.i05', type: 'fill', level: 1, q: 'How many line segments are needed to form the capital letter <strong>N</strong>?', accept: ['3', 'three'], placeholder: 'a number', explain: 'Down, diagonal, down. Three line segments.' },
    { id: 'math-geometry.line-rules.i06', type: 'fill', level: 1, q: 'How many line segments are needed to form the capital letter <strong>W</strong>?', accept: ['4', 'four'], placeholder: 'a number', explain: 'Four straight strokes: down, up, down, up.' },
    { id: 'math-geometry.line-rules.i07', type: 'fill', level: 1, q: 'How many line segments are needed to form the capital letter <strong>L</strong>?', accept: ['2', 'two'], placeholder: 'a number', explain: 'One down stroke and one across stroke. Two segments, meeting at 90°.' },
    { id: 'math-geometry.line-rules.i08', type: 'fill', level: 1, q: 'How many line segments are needed to form the capital letter <strong>X</strong>?', accept: ['2', 'two'], placeholder: 'a number', explain: 'Two diagonal strokes crossing each other. Two segments.' },
    { id: 'math-geometry.line-rules.i09', type: 'fillMulti', level: 2, q: 'Write the number of line segments in each capital letter.', blanks: [{ label: 'N', accept: ['3', 'three'] }, { label: 'W', accept: ['4', 'four'] }, { label: 'L', accept: ['2', 'two'] }, { label: 'X', accept: ['2', 'two'] }], explain: 'N = 3, W = 4, L = 2, X = 2. These are the four from the Activity page.' },
    { id: 'math-geometry.line-rules.i10', type: 'bucket', level: 2, q: 'Sort each capital letter by how many line segments it needs.', buckets: ['2 segments', '3 segments', '4 segments'], chips: [{ t: 'L', b: '2 segments' }, { t: 'X', b: '2 segments' }, { t: 'V', b: '2 segments' }, { t: 'T', b: '2 segments' }, { t: 'N', b: '3 segments' }, { t: 'Z', b: '3 segments' }, { t: 'W', b: '4 segments' }, { t: 'E', b: '4 segments' }], explain: 'Count the separate straight strokes. Z is three (across, diagonal, across); E is four (one down, three across).' },
    { id: 'math-geometry.line-rules.i11', type: 'mcq', level: 2, q: 'Which of these capital letters needs the <strong>most</strong> line segments?', options: ['N', 'W', 'L', 'X'], answer: 1, explain: 'W needs 4. N needs 3, L needs 2 and X needs 2.' },
    { id: 'math-geometry.line-rules.i12', type: 'mcq', level: 3, q: 'Karan says, "An infinite number of line segments can be drawn through two given points." Is he right?', options: ['Yes, you can always draw more', 'No. Through two given points only ONE line segment can be drawn', 'Yes, but only if the points are far apart', 'No, exactly two can be drawn'], answer: 1, hint: 'He has picked up the wrong Note.', explain: 'He has swapped the rules. Infinite lines pass through ONE point; through TWO points there is only one line segment.' },
    { id: 'math-geometry.line-rules.i13', type: 'tf', level: 3, q: 'An infinite number of lines can be drawn through two given points.', answer: false, explain: 'False. Through two given points only one line segment (and one line) can be drawn. Infinite lines go through one point.' },
    { id: 'math-geometry.line-rules.i14', type: 'mcq', level: 3, q: 'How many line segments are needed to form the capital letter <strong>A</strong>?', options: ['2', '3', '4', '1'], answer: 1, hint: 'Two slanting strokes plus the bar across the middle.', explain: 'Three: the left slant, the right slant, and the crossbar.' },
    { id: 'math-geometry.line-rules.i15', type: 'shortAnswer', level: 3, q: 'Write the two Note rules about lines and points from your notes.', model: 'Only one line segment can be drawn passing through two given points. An infinite number of lines can be drawn through any given point.', must: ['says only ONE line segment through two given points', 'says an INFINITE number of lines through one given point'], lines: 2, explain: 'Two rules, two marks. Keep "one" with two points and "infinite" with one point.' }
  ]

}]);
