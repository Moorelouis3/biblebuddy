# Bible Buddy Chapter Notes Framework

Genesis 1-4 is the official Bible Buddy chapter notes standard.

Every future chapter note should feel like it was written in the same system, by the same teacher, for the same reader. The model is especially Genesis 4: clear verse callouts, short teaching paragraphs, H3 mini-teaching headers, word and phrase explanations, historical context, theological meaning, and personal application.

This framework is required for every Bible chapter note going forward.

## Non-Negotiable Rules

1. Every section must begin with KJV verse callouts.
2. Verse sections must not cover more than 5 verses.
3. The notes must use the actual KJV verse text in the callout.
4. After the callouts, the section must teach through H3 mini headers.
5. Do not write broad summary paragraphs without breaking down words, phrases, history, theology, and application.
6. Do not invent a new format for each study.
7. Do not add filler to hit a word count.
8. Keep the notes deep, but readable in about 10-15 minutes per chapter.
9. The voice must stay conversational, clear, emotionally aware, and Bible-teacher focused.
10. The chapter should feel unified with Genesis 1-4.

## Required Chapter Shape

Every chapter note must follow this outer structure:

```md
# Genesis 4

# When Sin Moves From the Garden Into the Family

Short hook sentence.

Short setup paragraphs.

## Why Genesis 4 Matters

- Bullet
- Bullet
- Bullet
- Bullet
- Bullet

## Chapter Flow

- 📍 Section Title
- 📍 Section Title
- 📍 Section Title

# Deep Chapter Notes

## Genesis 4:1 to 5

# Section Title

> **1** Full KJV verse text.

> **2** Full KJV verse text.

Teaching paragraphs and H3 mini headers.

# The Big Lesson of Genesis 4

One focused lesson paragraph.

# Final Thought on Genesis 4

- Bullet
- Bullet
- Bullet

# Pause and Reflect

- Question
- Question
- Question
```

## Required Section Shape

Each verse section must work like Genesis 4:

```md
## Genesis 4:1 to 5

# Cain and Abel's Offerings

> **1** And Adam knew Eve his wife...

> **2** And she again bare his brother Abel...

Short opening teaching lines.

### 👶 Cain and Abel

Break down the people, setting, action, and meaning.

### 🙏 Offerings to the LORD

Explain the word, custom, worship meaning, and heart issue.

### 😡 Cain Was Very Wroth

Explain the KJV word, emotional movement, and why it matters.

### 🐍 Sin Lieth at the Door

Explain the phrase, image, theology, and application.
```

The rhythm is:

1. KJV verse callouts.
2. Short orientation.
3. H3 mini teaching header.
4. Word or phrase explanation.
5. Historical or cultural context.
6. Bible-story connection.
7. Theological meaning.
8. Personal reflection or application.
9. Next H3 mini teaching header.

## Verse Callout Standard

Always call out the KJV verse like this:

```md
> **7** If thou doest well, shalt thou not be accepted? and if thou doest not well, sin lieth at the door...
```

Rules:

- Use the actual verse number.
- Use the actual KJV verse text.
- Do not paraphrase the verse inside the callout.
- Do not replace the verse with a summary.
- Do not combine more than 5 verses in one section.
- If a story movement is longer than 5 verses, split it into multiple sections.

Example:

```md
## Genesis 4:8 to 12

# Cain Murders Abel

## Genesis 4:13 to 16

# Cain Becomes a Fugitive
```

Do not do:

```md
## Genesis 4:8 to 16
```

even though the older Genesis 4 source currently does this. The Genesis 4 teaching style is the model, but the future verse-section limit is 5.

## H3 Mini Header Standard

Every verse section needs multiple H3 mini headers.

Good H3 headers look like:

```md
### 👶 Cain and Abel
### 🙏 Offerings to the LORD
### 😡 Cain Was Very Wroth
### 🐍 Sin Lieth at the Door
### 🩸 Blood Cries From the Ground
### 🚶 Fugitive and Vagabond
### 🧬 The Mark of Cain
```

They should name the specific teaching moment, not a generic category.

Avoid generic H3 headers like:

```md
### What This Means
### Important Lesson
### Application
### Context
```

Those can be useful internally, but they do not match Genesis 1-4. The header should feel like a memorable Bible teaching point.

## What Each Section Must Teach

Not every section needs every category, but every section should include several of these layers.

### Words

Explain important KJV words.

Examples:

- `subtil` means crafty, clever, shrewd, and dangerous in a hidden way.
- `wroth` means angry.
- `countenance` means face, expression, or appearance.
- `keeper` means one who tends, watches, guards, or cares for something.
- `vagabond` means a restless wanderer without settled home.

### Phrases

Slow down over important phrases.

Examples:

- `Yea, hath God said?`
- `Sin lieth at the door`
- `Am I my brother's keeper?`
- `The voice of thy brother's blood crieth`
- `East of Eden`
- `Call upon the name of the LORD`

### History And Culture

Explain what ancient readers would understand.

Examples:

- Offerings were acts of worship, not random gifts.
- A firstborn blessing carried family destiny and inheritance weight.
- Wells mattered because water meant survival.
- Genealogies preserved identity, memory, land, and promise.
- Cities, music, tools, and livestock show culture developing outside Eden.

### Literary Flow

Show how the section fits the story.

Examples:

- Genesis 4 moves from worship to anger to murder to exile.
- Cain's line shows culture growing while violence grows too.
- Seth's line shows hope after Abel's death and Cain's exile.
- Genesis often teaches through repeated words, contrast, and escalation.

### Theology

Explain what the passage reveals about God, sin, humanity, judgment, mercy, covenant, worship, or redemption.

Examples:

- God warns Cain before Cain murders Abel.
- Sin is pictured as something crouching and desiring control.
- God hears innocent blood.
- Judgment and mercy appear together.
- God preserves a line of hope.

### Application

Apply without becoming a devotional.

Good application sounds like Genesis 4:

- "Before Cain kills with his hands, anger shows on his face."
- "Sin makes people treat responsibility like an insult."
- "Cultural progress does not automatically fix the human heart."
- "Humanity is broken, but worship is still possible."

Do not turn the notes into a devotional reflection section. Keep application tied to the verse.

## Voice Standard

The voice should sound like Louis teaching someone personally.

Use:

- short paragraphs
- clear explanations
- emotional honesty
- direct teaching
- simple but not shallow wording
- Bible connections
- careful word definitions
- gentle but serious application

Avoid:

- long academic paragraphs
- generic AI summaries
- repeating "Genesis is showing..." over and over
- over-explaining the same point
- vague devotional language
- commentary that floats away from the verse

## Section Length Standard

Target chapter length:

- Short chapters: 1,600-2,400 words
- Medium chapters: 2,200-3,200 words
- Long chapters: 3,000-4,200 words only if needed

The goal is not maximum length. The goal is layered clarity.

A strong section usually has:

- 2-5 KJV verse callouts
- 2-5 H3 mini headers
- short paragraphs under each mini header
- occasional bullet lists when they make the idea easier to scan

## Required Data Shape

Every chapter note should be built from structured data like this:

```ts
type ChapterNote = {
  book: string;
  chapter: number;
  title: string;
  hook: string;
  setup: string[];
  matters: string[];
  sections: ChapterSection[];
  lesson: string;
  finalThought: string[];
  pause: string[];
};

type ChapterSection = {
  reference: string;
  title: string;
  verses: number[];
  notes: string[];
};

type BibleVerse = {
  verse: number;
  text: string;
};
```

The renderer must build sections like this:

```ts
function verseCallouts(chapter: number, verses: number[]) {
  return verses
    .map((verse) => `> **${verse}** ${verseText(chapter, verse)}`)
    .join("\n\n");
}

function buildSection(chapter: number, section: ChapterSection) {
  return `## Genesis ${chapter}:${section.verses[0]} to ${section.verses.at(-1)}

# ${section.title}

${verseCallouts(chapter, section.verses)}

${section.notes.join("\n\n")}`;
}
```

## Quality Checklist

Before notes are accepted, check every chapter:

- Does every section begin with full KJV verse callouts?
- Is every verse section 5 verses or fewer?
- Are there H3 mini headers inside every section?
- Are KJV words explained?
- Are important phrases slowed down?
- Is there historical or cultural context?
- Is there theology tied directly to the passage?
- Is there application tied directly to the passage?
- Does it avoid generic summary writing?
- Does it sound like Genesis 1-4?
- Does it feel readable on mobile?
- Does it stay around a 10-15 minute reading/listening experience?

## The Simple Rule

If the notes do not look and feel like Genesis 4, they are not done.

