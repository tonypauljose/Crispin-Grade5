/* ============================================================
   Crispin's World — English Chapter 1: Nouns
   Quiz bank · 3 tiers · 120 questions total
   Types: mcq · tf · fill · compare
   ============================================================ */

window.ENG01_BANK = {

  // ---------- EXPLORER (40) — basic MCQ + True/False ----------
  explorer: [
    // What is a noun? (identification)
    { type: 'mcq', q: 'Which word in this list is a noun?', options: ['run', 'quickly', 'book', 'happy'], answer: 2, explain: '"book" names a thing, so it\'s a noun. "run" is a verb, "quickly" an adverb, "happy" an adjective.' },
    { type: 'mcq', q: 'Which one of these is NOT a noun?', options: ['dog', 'chair', 'Bahrain', 'jump'], answer: 3, explain: '"jump" is a verb (action). The other three name a thing, an object, and a place.' },
    { type: 'mcq', q: 'What does a noun name?', options: ['Only animals', 'A person, place, animal, thing, or idea', 'Only actions', 'Only emotions'], answer: 1, explain: 'A noun names a person, place, animal, thing, or idea.' },

    // Common vs proper
    { type: 'mcq', q: 'Which is a PROPER noun?', options: ['school', 'city', 'Ronaldo', 'team'], answer: 2, explain: 'Proper nouns name specific people, places or things and always start with a capital letter.' },
    { type: 'mcq', q: 'Which is a COMMON noun?', options: ['Bahrain', 'Sunday', 'river', 'Amir'], answer: 2, explain: '"river" is a general name — a common noun. The others are specific (proper) nouns.' },
    { type: 'mcq', q: '"Crispin plays at Al-Ahli stadium." Which word is a proper noun for a place?', options: ['Crispin', 'plays', 'Al-Ahli', 'stadium'], answer: 2, explain: '"Al-Ahli" is the specific name of a stadium → proper noun.' },
    { type: 'mcq', q: 'Proper nouns always begin with __?', options: ['A small letter', 'A capital letter', 'A number', 'A full stop'], answer: 1, explain: 'Proper nouns always start with a capital letter.' },

    // Singular vs plural
    { type: 'mcq', q: 'What is the plural of "child"?', options: ['childs', 'children', 'childes', 'childrens'], answer: 1, explain: '"child" has an irregular plural: children.' },
    { type: 'mcq', q: 'What is the plural of "mouse"?', options: ['mouses', 'mice', 'meese', 'moose'], answer: 1, explain: '"mouse" → "mice" (irregular).' },
    { type: 'mcq', q: 'What is the plural of "foot"?', options: ['foots', 'footes', 'feet', 'feets'], answer: 2, explain: '"foot" → "feet" (irregular).' },
    { type: 'mcq', q: 'What is the plural of "tooth"?', options: ['tooths', 'teeth', 'toothes', 'teeths'], answer: 1, explain: '"tooth" → "teeth" (irregular).' },
    { type: 'mcq', q: 'What is the plural of "man"?', options: ['mans', 'men', 'manes', 'mens'], answer: 1, explain: '"man" → "men".' },
    { type: 'mcq', q: 'What is the plural of "leaf"?', options: ['leafs', 'leaves', 'leafes', 'lieves'], answer: 1, explain: 'Nouns ending in -f/-fe often change to -ves: leaf → leaves.' },
    { type: 'mcq', q: 'What is the plural of "box"?', options: ['boxs', 'boxes', 'boxies', 'box'], answer: 1, explain: 'Words ending in -x add -es: box → boxes.' },
    { type: 'mcq', q: 'What is the singular of "geese"?', options: ['goose', 'gooses', 'gees', 'goosey'], answer: 0, explain: 'geese → goose (irregular).' },

    // Collective nouns
    { type: 'mcq', q: 'A ____ of sheep.', options: ['flock', 'herd', 'pride', 'school'], answer: 0, explain: 'A flock of sheep (or birds). A herd is for cattle; a pride for lions; a school for fish.' },
    { type: 'mcq', q: 'A ____ of lions.', options: ['flock', 'herd', 'pride', 'pack'], answer: 2, explain: 'A pride of lions.' },
    { type: 'mcq', q: 'A ____ of fish.', options: ['school', 'herd', 'swarm', 'army'], answer: 0, explain: 'A school (or shoal) of fish.' },
    { type: 'mcq', q: 'A ____ of bees.', options: ['herd', 'swarm', 'pack', 'flock'], answer: 1, explain: 'A swarm of bees.' },
    { type: 'mcq', q: 'A ____ of wolves.', options: ['pride', 'pack', 'bunch', 'school'], answer: 1, explain: 'A pack of wolves.' },

    // Abstract nouns
    { type: 'mcq', q: 'Which of these is an ABSTRACT noun?', options: ['ball', 'happiness', 'cat', 'pencil'], answer: 1, explain: '"happiness" is a feeling — you can\'t touch or see it. That makes it abstract.' },
    { type: 'mcq', q: 'Which one is an abstract noun?', options: ['book', 'courage', 'table', 'cup'], answer: 1, explain: '"courage" is an idea/quality — abstract.' },
    { type: 'mcq', q: 'Which is NOT an abstract noun?', options: ['honesty', 'freedom', 'water', 'love'], answer: 2, explain: '"water" is a thing you can see and touch — it\'s a concrete noun.' },

    // Gender
    { type: 'mcq', q: 'Feminine of "lion"?', options: ['lionet', 'lioness', 'liona', 'lionine'], answer: 1, explain: 'lion → lioness.' },
    { type: 'mcq', q: 'Masculine of "queen"?', options: ['king', 'prince', 'duke', 'lord'], answer: 0, explain: 'queen → king.' },
    { type: 'mcq', q: 'Feminine of "uncle"?', options: ['aunty', 'aunt', 'auntie', 'uncless'], answer: 1, explain: 'uncle → aunt.' },
    { type: 'mcq', q: 'Masculine of "cow"?', options: ['ox', 'bull', 'steer', 'calf'], answer: 1, explain: 'cow → bull (ox is a castrated bull used for work).' },

    // Possessive
    { type: 'mcq', q: 'Which shows the correct possessive form?', options: ['Crispins book', "Crispin's book", "Crispins' book", 'Crispin book'], answer: 1, explain: 'For a singular noun, add apostrophe + s: Crispin\'s book.' },
    { type: 'mcq', q: 'Plural possessive: "The balls of the boys" = ?', options: ["The boy's balls", "The boys' balls", "The boyses balls", "The boys balls"], answer: 1, explain: 'For plurals ending in -s, add only an apostrophe: boys\'.' },

    // True / False pack (10)
    { type: 'tf', q: '"Ronaldo" is a proper noun.', answer: 0, explain: 'True — it\'s the name of a specific person.' },
    { type: 'tf', q: 'The plural of "sheep" is "sheeps".', answer: 1, explain: 'False — "sheep" is the same in singular and plural.' },
    { type: 'tf', q: 'All nouns begin with a capital letter.', answer: 1, explain: 'False — only proper nouns do. Common nouns start with a small letter unless they begin a sentence.' },
    { type: 'tf', q: '"Love" is an abstract noun.', answer: 0, explain: 'True — it names a feeling, not a thing you can touch.' },
    { type: 'tf', q: '"A pride of lions" is correct.', answer: 0, explain: 'True — the collective noun for lions is "pride".' },
    { type: 'tf', q: 'The plural of "tooth" is "tooths".', answer: 1, explain: 'False — it\'s "teeth".' },
    { type: 'tf', q: 'Both "book" and "pencil" are concrete nouns (things you can touch).', answer: 0, explain: 'True — both are concrete nouns.' },
    { type: 'tf', q: 'Feminine of "king" is "queen".', answer: 0, explain: 'True.' },
    { type: 'tf', q: 'The possessive of "children" is "childrens\'".', answer: 1, explain: 'False — "children" doesn\'t end in -s, so we write "children\'s".' },
    { type: 'tf', q: 'A "swarm" is the collective noun for bees.', answer: 0, explain: 'True — a swarm of bees.' },

    // Common type identification
    { type: 'mcq', q: '"Honesty is the best policy." What type of noun is "honesty"?', options: ['Common', 'Proper', 'Abstract', 'Collective'], answer: 2, explain: '"honesty" names a quality — abstract noun.' },
    { type: 'mcq', q: '"The team won the match." What type of noun is "team"?', options: ['Abstract', 'Collective', 'Proper', 'Uncountable'], answer: 1, explain: '"team" names a group of people — collective noun.' }
  ],

  // ---------- ADVENTURER (40) — fill-blank + compare ----------
  adventurer: [
    // Pluralise
    { type: 'fill', q: 'Plural of "baby" = ?', answer: ['babies'], explain: 'Consonant + y → change y to ies: baby → babies.' },
    { type: 'fill', q: 'Plural of "knife" = ?', answer: ['knives'], explain: 'knife → knives (-fe → -ves).' },
    { type: 'fill', q: 'Plural of "wife" = ?', answer: ['wives'], explain: 'wife → wives.' },
    { type: 'fill', q: 'Plural of "life" = ?', answer: ['lives'], explain: 'life → lives.' },
    { type: 'fill', q: 'Plural of "bus" = ?', answer: ['buses'], explain: 'Words ending in -s add -es: buses.' },
    { type: 'fill', q: 'Plural of "dish" = ?', answer: ['dishes'], explain: 'Words ending in -sh add -es: dishes.' },
    { type: 'fill', q: 'Plural of "tomato" = ?', answer: ['tomatoes'], explain: 'Some -o nouns add -es: tomato → tomatoes.' },
    { type: 'fill', q: 'Plural of "hero" = ?', answer: ['heroes'], explain: 'hero → heroes.' },
    { type: 'fill', q: 'Plural of "woman" = ?', answer: ['women'], explain: 'woman → women (irregular).' },
    { type: 'fill', q: 'Plural of "deer" = ?', answer: ['deer'], explain: '"deer" stays the same in singular and plural.' },
    { type: 'fill', q: 'Plural of "person" = ?', answer: ['people'], explain: 'person → people (irregular; "persons" is used in very formal contexts).' },

    // Gender pairs
    { type: 'fill', q: 'Feminine of "prince" = ?', answer: ['princess'], explain: 'prince → princess.' },
    { type: 'fill', q: 'Feminine of "nephew" = ?', answer: ['niece'], explain: 'nephew → niece.' },
    { type: 'fill', q: 'Masculine of "actress" = ?', answer: ['actor'], explain: 'actress → actor.' },
    { type: 'fill', q: 'Feminine of "waiter" = ?', answer: ['waitress'], explain: 'waiter → waitress.' },
    { type: 'fill', q: 'Masculine of "hen" = ?', answer: ['cock', 'rooster'], explain: 'hen → cock / rooster.' },

    // Collective
    { type: 'fill', q: 'A ____ of grapes. (one word)', answer: ['bunch'], explain: 'A bunch of grapes.' },
    { type: 'fill', q: 'A ____ of flowers. (one word)', answer: ['bouquet'], explain: 'A bouquet of flowers.' },
    { type: 'fill', q: 'A ____ of ships.', answer: ['fleet'], explain: 'A fleet of ships.' },
    { type: 'fill', q: 'A ____ of stars. (one word)', answer: ['galaxy', 'constellation', 'cluster'], explain: 'A galaxy or constellation of stars; "cluster" is also accepted.' },
    { type: 'fill', q: 'A ____ of players.', answer: ['team'], explain: 'A team of players.' },

    // Possessive
    { type: 'fill', q: 'Rewrite using an apostrophe: "the bag of Sara" = ?', answer: ["sara's bag", "sarah's bag"], explain: 'For a singular name, add \'s: Sara\'s bag.' },
    { type: 'fill', q: 'Rewrite: "the toys of the children" = ?', answer: ["children's toys", "the children's toys"], explain: '"children" doesn\'t end in s, so add \'s: children\'s toys.' },
    { type: 'fill', q: 'Rewrite: "the books of the boys" = ?', answer: ["boys' books", "the boys' books"], explain: 'Plural ending in s → add just an apostrophe: boys\'.' },

    // Identify the noun in a sentence
    { type: 'fill', q: 'Pick the noun in: "The ball rolled away." (one word)', answer: ['ball'], explain: '"ball" is the thing — the noun.' },
    { type: 'fill', q: 'Pick the noun in: "Amina laughs loudly." (one word, the person)', answer: ['amina'], explain: '"Amina" is a proper noun (a person\'s name).' },
    { type: 'fill', q: 'Name the proper noun in: "I visited Manama last week."', answer: ['manama'], explain: '"Manama" is the specific place — proper noun.' },

    // Type classification (fill)
    { type: 'fill', q: 'What type of noun is "army"? (common / proper / abstract / collective)', answer: ['collective'], explain: '"army" names a group — collective noun.' },
    { type: 'fill', q: 'What type of noun is "bravery"? (common / proper / abstract / collective)', answer: ['abstract'], explain: 'A quality you can\'t touch — abstract noun.' },
    { type: 'fill', q: 'What type of noun is "Friday"? (common / proper / abstract / collective)', answer: ['proper'], explain: 'Day names are proper nouns.' },

    // Compare (choose the right option)
    { type: 'compare', q: 'Which is an abstract noun?', options: ['pencil', 'kindness', 'stadium'], answer: 1, explain: '"kindness" is an idea — abstract.' },
    { type: 'compare', q: 'Which is a proper noun?', options: ['river', 'country', 'India'], answer: 2, explain: '"India" is specific — proper.' },
    { type: 'compare', q: 'Which is a collective noun?', options: ['fish', 'ocean', 'school'], answer: 2, explain: 'A "school" of fish — collective.' },
    { type: 'compare', q: 'Which is the singular form?', options: ['mice', 'mouse', 'mouses'], answer: 1, explain: 'mouse (singular) → mice (plural).' },
    { type: 'compare', q: 'Which word means more than one?', options: ['leaf', 'leaves', 'leafy'], answer: 1, explain: '"leaves" is the plural of "leaf".' },

    // Mixed
    { type: 'fill', q: 'What do we call a name of a specific person, place or thing, that always starts with a capital letter? (one word, two parts like: proper noun)', answer: ['proper noun', 'proper'], explain: 'A proper noun.' },
    { type: 'fill', q: 'What kind of noun names a group of things or people? (one word)', answer: ['collective'], explain: 'Collective nouns.' },
    { type: 'fill', q: 'Plural of "sheep" = ?', answer: ['sheep'], explain: '"sheep" stays the same.' },
    { type: 'fill', q: 'Plural of "fish" = ?', answer: ['fish', 'fishes'], explain: 'Usually "fish" (same). "fishes" is used when talking about different species.' },
    { type: 'fill', q: 'Abstract noun of "brave" = ?', answer: ['bravery', 'braveness'], explain: 'brave → bravery.' }
  ],

  // ---------- CHAMPION (40) — word problems, riddles, error-spotting, rewrites ----------
  champion: [
    // Error spotting
    { type: 'mcq', q: 'Which sentence is written CORRECTLY?', options: [
        'The childrens toys are here.',
        "The childrens' toys are here.",
        "The children's toys are here.",
        "The childrens's toys are here."
      ], answer: 2, explain: '"children" doesn\'t end in s, so the possessive is "children\'s".' },
    { type: 'mcq', q: 'Which sentence uses the plural CORRECTLY?', options: [
        'Three mouses ran under the sofa.',
        'Three mice ran under the sofa.',
        'Three meese ran under the sofa.',
        'Three mices ran under the sofa.'
      ], answer: 1, explain: 'mouse → mice.' },
    { type: 'mcq', q: 'Which is the CORRECT collective noun?', options: [
        'A flock of lions',
        'A herd of lions',
        'A pride of lions',
        'A swarm of lions'
      ], answer: 2, explain: 'Lions live in a pride. Flock = sheep, herd = cattle, swarm = bees.' },
    { type: 'mcq', q: 'Which sentence uses a PROPER noun correctly?', options: [
        'crispin lives in bahrain.',
        'Crispin lives in bahrain.',
        'Crispin lives in Bahrain.',
        'crispin lives in Bahrain.'
      ], answer: 2, explain: 'Both "Crispin" and "Bahrain" are proper nouns — both capitalised.' },
    { type: 'mcq', q: 'Spot the error: "I have two informations for you."', options: [
        'informations → informational',
        'informations → information',
        'two → twos',
        'No error'
      ], answer: 1, explain: '"information" is uncountable — it has no plural form. Say "pieces of information" or just "information".' },
    { type: 'tf', q: '"Advice" should never be written as "advices".', answer: 0, explain: 'True — "advice" is uncountable.' },
    { type: 'tf', q: 'You can say "three furnitures" when you have three pieces of furniture.', answer: 1, explain: 'False — "furniture" is uncountable. Say "three pieces of furniture".' },
    { type: 'tf', q: '"Water", "milk" and "rice" are all uncountable nouns.', answer: 0, explain: 'True — we measure them (a glass of water, a cup of rice) rather than count them directly.' },

    // Tricky plurals
    { type: 'mcq', q: 'Plural of "ox"?', options: ['oxes', 'oxen', 'oxees', 'ox'], answer: 1, explain: 'ox → oxen (irregular).' },
    { type: 'mcq', q: 'Plural of "crisis"?', options: ['crises', 'crisises', 'crisi', 'crisis'], answer: 0, explain: 'crisis → crises (Greek origin: -is → -es).' },
    { type: 'mcq', q: 'Plural of "cactus"?', options: ['cactuses', 'cacti', 'cactis', 'both cacti and cactuses are accepted'], answer: 3, explain: 'Both "cacti" and "cactuses" are correct.' },
    { type: 'mcq', q: 'Plural of "aircraft"?', options: ['aircrafts', 'aircraft', 'aircrafties', 'aircraftes'], answer: 1, explain: '"aircraft" stays the same in singular and plural.' },

    // Riddles
    { type: 'mcq', q: 'I\'m a collective noun. You can find one of me in the sky at night — I\'m a group of stars that make a picture. What am I?', options: ['galaxy', 'constellation', 'cluster', 'meteor'], answer: 1, explain: 'A constellation — a named pattern of stars, like Orion.', hint: 'Starts with C. Named shapes like the Big Dipper.' },
    { type: 'mcq', q: 'I name a thing you can\'t touch but can feel. I start with F. I\'m what birds do in the sky… wait, no — I\'m a feeling you get on your birthday. What am I?', options: ['flight', 'fun', 'friend', 'fort'], answer: 1, explain: '"fun" — an abstract noun (feeling).', hint: 'A feeling that starts with F.' },
    { type: 'mcq', q: 'I am the feminine version of a farm animal whose male is called a bull. What am I?', options: ['calf', 'cow', 'heifer', 'ox'], answer: 1, explain: 'bull (male) → cow (female).' },
    { type: 'mcq', q: "I'm a collective noun for musicians who play together. I start with B.", options: ['bunch', 'band', 'bouquet', 'bevy'], answer: 1, explain: 'A band of musicians.' },

    // Sentence rewriting
    { type: 'fill', q: 'Rewrite using a possessive apostrophe: "the pencil of my friend" = ?', answer: ["my friend's pencil"], explain: 'friend (singular) → friend\'s.' },
    { type: 'fill', q: 'Rewrite using an apostrophe: "the uniforms of the players" = ?', answer: ["the players' uniforms", "players' uniforms"], explain: 'Plural ending in s → add only an apostrophe.' },
    { type: 'fill', q: 'Rewrite: "the shoes of the women" = ?', answer: ["the women's shoes", "women's shoes"], explain: '"women" doesn\'t end in s, so add \'s: women\'s.' },

    // Word problems / context
    { type: 'mcq', q: 'Ronaldo played for Portugal. Which TWO words are proper nouns?', options: [
        'played and for',
        'Ronaldo and Portugal',
        'Ronaldo and played',
        'Portugal only'
      ], answer: 1, explain: 'Both "Ronaldo" (person) and "Portugal" (place) are proper nouns.' },
    { type: 'mcq', q: 'How many nouns are in: "The team scored a goal at the stadium."?', options: ['Two', 'Three', 'Four', 'One'], answer: 1, explain: 'team, goal, stadium — three nouns.', hint: 'Names of things only, ignore "the", "scored", "at", "a".' },
    { type: 'mcq', q: 'Count the nouns in: "Crispin loves football and ice cream."', options: ['Two', 'Three', 'Four', 'Five'], answer: 2, explain: 'Crispin, football, ice cream — three (or four if you count "ice" and "cream" separately, but "ice cream" is a compound noun, counted as one).', hint: '"ice cream" counts as ONE noun.' },

    // Countable vs Uncountable
    { type: 'mcq', q: 'Which noun is UNCOUNTABLE?', options: ['apple', 'chair', 'milk', 'book'], answer: 2, explain: '"milk" is uncountable — you\'d say "a glass of milk", not "two milks".' },
    { type: 'mcq', q: 'Pick the uncountable noun:', options: ['sugar', 'cup', 'spoon', 'biscuit'], answer: 0, explain: '"sugar" is uncountable (a spoonful of sugar).' },
    { type: 'mcq', q: '"Luggage" — how do we count it?', options: ['Two luggages', 'Two pieces of luggage', 'Two luggage', 'Luggages'], answer: 1, explain: '"luggage" is uncountable; use "pieces of luggage".' },

    // Advanced: compound / hidden
    { type: 'mcq', q: 'Which is a COMPOUND noun (two words joined)?', options: ['football', 'play', 'quickly', 'happy'], answer: 0, explain: 'foot + ball = football (compound noun).' },
    { type: 'mcq', q: 'Which is a COMPOUND noun?', options: ['run', 'toothpaste', 'tall', 'cried'], answer: 1, explain: 'tooth + paste = toothpaste.' },

    // Patterns
    { type: 'fill', q: 'Pattern: dog → dogs, cat → cats, fox → ? (plural)', answer: ['foxes'], explain: '-x nouns add -es: foxes.' },
    { type: 'fill', q: 'Pattern: city → cities, story → stories, baby → ? (plural)', answer: ['babies'], explain: 'Consonant + y → -ies.' },

    // Mixed identification
    { type: 'mcq', q: 'Which is an ABSTRACT noun in: "His courage saved the day."?', options: ['His', 'courage', 'saved', 'day'], answer: 1, explain: '"courage" is a quality — abstract noun. ("day" is a common noun — concrete idea of time.)' },
    { type: 'mcq', q: 'Which is a COLLECTIVE noun in: "The crowd cheered loudly."?', options: ['The', 'crowd', 'cheered', 'loudly'], answer: 1, explain: '"crowd" names a group of people — collective noun.' },

    // Tricky gender
    { type: 'fill', q: 'Masculine of "mare" (a female horse)? (one word)', answer: ['stallion'], explain: 'mare (female) → stallion (male).' },
    { type: 'fill', q: 'Feminine of "wizard"? (one word)', answer: ['witch'], explain: 'wizard → witch.' },

    // Error-spotting true/false
    { type: 'tf', q: '"The childrens\' books are here." is correctly written.', answer: 1, explain: 'False — it should be "The children\'s books" (children doesn\'t end in s).' },
    { type: 'tf', q: '"A herd of fish swam past." is correct.', answer: 1, explain: 'False — fish come in a "school" (or "shoal"), not a "herd".' },
    { type: 'tf', q: 'In "Peace is priceless," the word "peace" is an abstract noun.', answer: 0, explain: 'True — peace is a state/idea you can\'t touch.' },

    // Extra riddles
    { type: 'mcq', q: 'I\'m a compound noun. Ronaldo kicks me between two posts. What am I?', options: ['goalkeeper', 'football', 'crossbar', 'penalty'], answer: 1, explain: '"football" — what you kick. (goalkeeper stops it, crossbar is the top post.)' },
    { type: 'mcq', q: 'I\'m the collective noun for WOLVES.', options: ['pack', 'herd', 'pride', 'flock'], answer: 0, explain: 'A pack of wolves.' },
    { type: 'mcq', q: 'What is the SINGULAR of "children"?', options: ['child', 'childs', 'kid', 'childer'], answer: 0, explain: 'children → child.' },
    { type: 'mcq', q: "I'm a noun for a feeling. I rhyme with 'pride'. (Hint: it's the opposite of being ashamed.)", options: ['guide', 'pride', 'bride', 'slide'], answer: 1, explain: '"pride" — feeling of being pleased about something you did.', hint: 'What a lioness has a lot of? Also a feeling.' },
    { type: 'mcq', q: 'Identify the WRONG plural:', options: ['children', 'feet', 'geese', 'sheeps'], answer: 3, explain: 'The plural of "sheep" is "sheep" — not "sheeps".' }
  ]
};
