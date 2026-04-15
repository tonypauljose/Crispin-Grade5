# Workflow: Generate a Quiz Bank

**Objective:** Produce 40 high-quality questions for one tier of one chapter.

## Input
- Chapter number
- Tier (explorer / adventurer / champion)
- Mode: `procedural` or `claude`

## Tier distribution target
- **Explorer** (40): simple MCQ + True/False. Tests direct facts.
- **Adventurer** (40): fill-blank + compare (<, >, =). Tests procedure.
- **Champion** (40): riddles, word problems, error-spotting, patterns, trick questions. Tests understanding + transfer.

## When to use procedural

Best for **numeric** questions where we can template the structure:

- Place value identification
- Successor/predecessor
- Rounding (at any level)
- Compare (<, >, =)
- Expanded form
- Simple addition/subtraction of multiples of 10/100/1000
- Roman numeral conversions

These produce 100%-reliable correct answers every time.

## When to use Claude API

Better for **verbal** or **conceptual** questions:

- Word problems with narrative (football/Ronaldo flavour!)
- Riddles (numeric or logical)
- Error-spotting ("Crispin wrote X as Y. What's wrong?")
- Pattern discovery
- Trick questions

Use `--mode claude` with prompt caching on the system block so repeated runs are cheap.

## Question object schema

```js
{
  type: 'mcq' | 'tf' | 'fill' | 'compare',
  q: 'Question text (HTML allowed)',
  options: ['A', 'B', 'C', 'D'],   // mcq + compare only
  answer: 1,                        // index for mcq/tf/compare; string|array for fill
  explain: 'One-sentence explanation',
  hint: 'Optional hint before submission'
}
```

For `fill`: `answer` can be a single string OR an array of acceptable spellings:
```js
answer: ['four thousand', 'four thousand and']
```

## Review checklist (always manual)

Before committing:

- [ ] Every `explain` is truthful and actually explains *why*.
- [ ] Champion tier has at least 3 football-themed questions.
- [ ] Every Champion riddle has a `hint`.
- [ ] Reading level is roughly Grade 3–5 (short sentences, no jargon).
- [ ] No culturally specific examples that Crispin wouldn't recognise (e.g. US football, cricket-only references).
- [ ] Numbers make sense in the Bahrain/India context (rupees AND BHD are OK).
- [ ] All questions render correctly on mobile (no overflow).

## Example procedural template (for reference)

```python
def gen_place_value(n=40):
    qs = []
    while len(qs) < n:
        num = random.randint(1000, 9999)
        digits = str(num)
        pos = random.randint(0, 3)
        digit = int(digits[3 - pos])
        if digit == 0:
            continue  # zero place values are less useful
        place_names = ['ones', 'tens', 'hundreds', 'thousands']
        options = [digit * 10**pos, digit, digit * 10, digit * 100]
        random.shuffle(options)
        correct_idx = options.index(digit * 10**pos)
        qs.append({
            'type': 'mcq',
            'q': f'What is the place value of {digit} in {num:,}?',
            'options': [str(o) for o in options],
            'answer': correct_idx,
            'explain': f'{digit} is in the {place_names[pos]} place, so its value is {digit * 10**pos}.'
        })
    return qs
```
