type NormalizedVerse = {
  number: number;
  text: string;
};

const WORD_FOCUS_RULES: Array<{
  pattern: RegExp;
  title: string;
  line: string;
}> = [
  {
    pattern: /\bwisdom|wise\b/i,
    title: "🧠 Wisdom",
    line: "Wisdom is not just knowing the right answer. In Proverbs, wisdom is skill for living under God, choosing the path that lines up with truth before life forces the lesson on you.",
  },
  {
    pattern: /\bunderstanding|discern|prudence|prudent\b/i,
    title: "👀 Understanding",
    line: "Understanding is the ability to see beneath the surface. It notices direction, motive, consequence, and the difference between what looks good and what is actually good.",
  },
  {
    pattern: /\binstruction|reproof|correction|chasten|chastening|rebuke\b/i,
    title: "🛠️ Instruction",
    line: "Instruction is not just information. It is training. It shapes a person through teaching, correction, and repeated reminders until wisdom becomes a pattern.",
  },
  {
    pattern: /\bheart\b/i,
    title: "❤️ Heart",
    line: "The heart is the inner control room of a person. Proverbs keeps going after the heart because choices, words, desires, and direction all flow from there.",
  },
  {
    pattern: /\bpath|way|walk|steps|goeth|feet\b/i,
    title: "👣 Path",
    line: "A path is more than one decision. It is a direction. Solomon wants the reader to ask where a choice is taking them, not only how it feels in the moment.",
  },
  {
    pattern: /\bmouth|lips|tongue|words|answer|speak|speech\b/i,
    title: "🗣️ Speech",
    line: "Words are treated as spiritual fruit in Proverbs. They reveal what is inside a person, and they can heal, poison, guide, expose, or destroy.",
  },
  {
    pattern: /\bfool|foolish|folly|scorner|simple\b/i,
    title: "🚫 Foolishness",
    line: "A fool in Proverbs is not mainly someone with low intelligence. It is someone who resists correction, trusts themselves too much, and keeps choosing what destroys.",
  },
  {
    pattern: /\bsluggard|slothful|lazy|sleep|folding of the hands\b/i,
    title: "🐌 Sluggard",
    line: "The sluggard is a picture of passive destruction. Nothing has to explode for a life to fall apart; neglect can do it slowly.",
  },
  {
    pattern: /\bpoor|poverty|rich|riches|wealth|silver|gold|treasure|substance\b/i,
    title: "💰 Wealth",
    line: "Proverbs does not treat money as evil, but it refuses to let money become ultimate. Wealth tests wisdom because it exposes trust, appetite, generosity, and integrity.",
  },
  {
    pattern: /\bpride|proud|haughty|high look\b/i,
    title: "⚠️ Pride",
    line: "Pride is dangerous because it makes a person feel too big to be corrected. It blinds the heart before the fall becomes visible.",
  },
  {
    pattern: /\brighteous|righteousness|upright|integrity|just\b/i,
    title: "⚖️ Righteousness",
    line: "Righteousness is wisdom lived straight. It is not image management; it is a life aligned with what is right before God and neighbor.",
  },
  {
    pattern: /\bwicked|evil|perverse|froward|crooked\b/i,
    title: "🕳️ Wickedness",
    line: "Wickedness in Proverbs is a direction away from God. It may look useful for a moment, but it bends the soul and damages the people around it.",
  },
  {
    pattern: /\bfriend|neighbor|brother|father|mother|son|children|wife|woman\b/i,
    title: "👥 Relationships",
    line: "Proverbs brings wisdom into real relationships because character is proven around people. Family, friends, neighbors, and leaders all reveal what kind of wisdom is really in us.",
  },
  {
    pattern: /\bking|ruler|throne|judgment|justice|law\b/i,
    title: "👑 Leadership And Justice",
    line: "Leadership in Proverbs is not just about power. It is about justice, restraint, truth, and the responsibility to protect what is right.",
  },
  {
    pattern: /\bfear of the lord|lord\b/i,
    title: "🙏 The Lord",
    line: "The Lord is not a side idea in Proverbs. Reverence for Him is the foundation that keeps wisdom from becoming mere self-help.",
  },
];

function uniq<T>(items: T[]) {
  return Array.from(new Set(items));
}

function sectionText(verses: NormalizedVerse[]) {
  return verses.map((verse) => verse.text).join(" ");
}

function pickWordFocus(verses: NormalizedVerse[]) {
  const text = sectionText(verses);
  const matches = WORD_FOCUS_RULES.filter((rule) => rule.pattern.test(text)).slice(0, 4);

  if (matches.length > 0) {
    return matches;
  }

  return [
    {
      title: "🧭 Direction",
      line: "This section is asking the reader to pay attention to direction. Proverbs is always asking, Where does this choice lead if you keep walking in it?",
    },
    {
      title: "🧠 Discernment",
      line: "Discernment is the skill of slowing down long enough to see what is really happening beneath the surface.",
    },
  ];
}

function buildVerseMovement(verses: NormalizedVerse[]) {
  const numbers = verses.map((verse) => verse.number);
  if (!numbers.length) return [];

  const first = numbers[0];
  const last = numbers[numbers.length - 1];

  if (first === last) {
    return [
      `- 📌 Verse ${first} gives the main image or warning.`,
      "- 🔍 Slow down over the wording because one short proverb can carry a whole life lesson.",
    ];
  }

  const middle = numbers[Math.floor(numbers.length / 2)];
  return [
    `- 📌 Verses ${first}-${Math.max(first, middle - 1)} open the thought and show what wisdom wants you to notice.`,
    `- 🔍 Verses ${middle}-${last} press the lesson deeper so it is not only understood, but applied.`,
  ];
}

function buildPersonalApplication(verses: NormalizedVerse[], heading: string) {
  const text = sectionText(verses).toLowerCase();
  const applications = [];

  if (/mouth|lips|tongue|words|answer|speak|speech/.test(text)) {
    applications.push("Ask: are my words making this situation clearer, calmer, and more truthful, or am I adding fire?");
  }
  if (/heart/.test(text)) {
    applications.push("Ask: what desire, fear, or motive is quietly steering me here?");
  }
  if (/path|way|walk|steps|feet/.test(text)) {
    applications.push("Ask: if I keep walking this way, where does it actually take me?");
  }
  if (/fool|foolish|folly|scorner|simple/.test(text)) {
    applications.push("Ask: where am I resisting correction because I would rather be right than wise?");
  }
  if (/poor|rich|riches|wealth|silver|gold|treasure|substance/.test(text)) {
    applications.push("Ask: is money serving wisdom, or is money becoming the thing I trust?");
  }
  if (/sluggard|slothful|lazy|sleep/.test(text)) {
    applications.push("Ask: what small area am I neglecting that will cost more later if I keep ignoring it?");
  }
  if (/pride|proud|haughty/.test(text)) {
    applications.push("Ask: where has pride made correction feel like an attack instead of a gift?");
  }
  if (/lord|fear of the lord/.test(text)) {
    applications.push("Ask: am I treating God as the center of this decision, or only adding Him after I choose what I want?");
  }

  const fallback = `Ask: what is ${heading.replace(/^[^\w]+/, "").toLowerCase()} exposing about the way I think, speak, choose, or respond?`;
  return uniq(applications.length ? applications : [fallback]).slice(0, 3);
}

export function renderProverbsSectionDepth({
  chapter,
  range,
  heading,
  verses,
}: {
  chapter: number;
  range: string;
  heading: string;
  verses: NormalizedVerse[];
}) {
  const wordFocus = pickWordFocus(verses);
  const movement = buildVerseMovement(verses);
  const application = buildPersonalApplication(verses, heading);

  return `### 🔎 Word And Theme Breakdown

${wordFocus.map((item) => `- **${item.title}:** ${item.line}`).join("\n")}

### 🧩 How This Section Moves

${movement.join("\n")}

### 👀 What To Watch For

- 🧠 Notice what the verses are forming in the reader, not only what they are forbidding.
- 🛣️ Watch the direction of the path. Proverbs cares about where repeated choices lead.
- ❤️ Pay attention to the heart underneath the behavior.

### ✅ Bring It Home

${application.map((line) => `- ${line}`).join("\n")}

This is why Proverbs ${chapter}:${range} should not be rushed. Solomon is not filling space. He is training the reader to recognize wisdom before the moment becomes costly.`;
}

