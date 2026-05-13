type DeepStudyOptions = {
  chapter: number;
  title: string;
  range: string;
  heading: string;
  body: string[];
};

const MIN_DEEP_CHAPTER = 8;
const MIN_FORMATTED_CHAPTER = 4;

function cleanHeading(heading: string) {
  return heading
    .replace(/\\u[0-9A-Fa-f]{4}/g, "")
    .replace(/[^\w\s,'-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text: string, words: string[]) {
  const lower = text.toLowerCase();
  return words.some((word) => lower.includes(word));
}

const themeLabels: Record<string, { icon: string; label: string; bullets: string[] }> = {
  speech: {
    icon: "🗣️",
    label: "Words Reveal Direction",
    bullets: ["what is being spoken", "what the words are building", "what the heart is revealing"],
  },
  money: {
    icon: "💰",
    label: "Money Tests The Heart",
    bullets: ["what money promises", "what money exposes", "how wisdom handles provision"],
  },
  correction: {
    icon: "🧭",
    label: "Correction Is A Mercy",
    bullets: ["what needs to be heard", "what pride wants to avoid", "how wisdom receives help"],
  },
  path: {
    icon: "🛤️",
    label: "The Path Is The Point",
    bullets: ["where the choice begins", "where the road is leading", "what kind of person the path is forming"],
  },
  heart: {
    icon: "❤️",
    label: "The Heart Comes First",
    bullets: ["what desire is doing", "what motive is underneath", "what eventually flows outward"],
  },
  home: {
    icon: "🏠",
    label: "Wisdom At Home",
    bullets: ["what happens in close relationships", "what strengthens the house", "what quietly tears peace down"],
  },
  leadership: {
    icon: "👑",
    label: "Influence Needs Wisdom",
    bullets: ["how power is used", "who is protected", "whether justice or pride is leading"],
  },
  justice: {
    icon: "⚖️",
    label: "God Cares About What Is Right",
    bullets: ["how people handle advantage", "whether the vulnerable are protected", "what honesty looks like when it costs"],
  },
  appetite: {
    icon: "🍽️",
    label: "Desire Needs Guardrails",
    bullets: ["what the craving promises", "what it may cost", "how wisdom keeps desire in order"],
  },
  laziness: {
    icon: "🌾",
    label: "Faithfulness Is Built Daily",
    bullets: ["what delay is costing", "what excuse sounds reasonable", "what steady obedience looks like"],
  },
  friendship: {
    icon: "🤝",
    label: "Closeness Shapes You",
    bullets: ["who is influencing the heart", "who brings clarity", "who makes foolishness feel normal"],
  },
  humility: {
    icon: "🙇",
    label: "Pride Blocks Wisdom",
    bullets: ["where pride is defending itself", "where humility can listen", "how honor is safely received"],
  },
  fear: {
    icon: "🙏",
    label: "Life Happens Before God",
    bullets: ["what the Lord sees", "what obedience requires", "how reverence changes ordinary choices"],
  },
  folly: {
    icon: "⚠️",
    label: "Folly Has A Pattern",
    bullets: ["what foolishness repeats", "what warning is being ignored", "where the ending is headed"],
  },
};

function paragraphChunks(lines: string[]) {
  const midpoint = Math.max(2, Math.ceil(lines.length / 2));
  return {
    first: lines.slice(0, midpoint),
    second: lines.slice(midpoint),
  };
}

const listIcons = ["🔎", "🧭", "✅", "⚠️"];

function emojiList(items: string[]) {
  return items.map((item, index) => `- ${listIcons[index % listIcons.length]} ${item}`);
}

function themeParagraphs(theme: string, chapter: number) {
  const paragraphs: Record<string, string[]> = {
    speech: [
      "Slow down over the words in this section, because Proverbs never treats speech as harmless noise. Words reveal the heart, direct relationships, and often decide whether a moment becomes healing or harm.",
      "This is why Solomon keeps returning to the mouth, lips, tongue, witness, counsel, and answer. Speech is wisdom made visible. It shows whether a person has learned restraint, truth, patience, and love, or whether the heart is still being ruled by impulse.",
      "In real life, this presses into ordinary conversations: the quick reply, the private complaint, the repeated exaggeration, the secret shared too freely, the angry sentence that cannot be pulled back. Wisdom trains a person to ask what their words are building before they release them.",
    ],
    money: [
      "This section also treats money and possessions as spiritual tests. Proverbs is not against provision, savings, labor, or wise increase, but it refuses to let wealth become the measure of a person's life.",
      "Money reveals trust. It can expose greed, fear, laziness, generosity, oppression, pride, or stewardship. That is why Solomon connects riches to justice, diligence, restraint, open-handedness, and the fear of the Lord.",
      "The practical question is not only, How much do I have? It is, What is this doing to my heart? Am I using what God gives as a tool for wisdom, or am I letting it become the thing that quietly rules me?",
    ],
    correction: [
      "Correction is one of the emotional pressure points in Proverbs. Nobody naturally enjoys being corrected, because correction touches pride, exposes weakness, and interrupts the story we prefer to tell about ourselves.",
      "But Solomon teaches that the ability to receive reproof is one of the clearest signs of wisdom. A person who can be corrected can still be rescued. A person who refuses correction often keeps walking until consequences become the only teacher left.",
      "This makes the section deeply practical. Wisdom asks whether we listen when a parent, friend, leader, spouse, pastor, or Scripture itself confronts us. The issue is not whether correction feels good. The issue is whether it leads us back toward life.",
    ],
    path: [
      "Notice the movement language in this section. Proverbs often teaches through roads, steps, ways, paths, turning, stumbling, and direction because life is not standing still.",
      "A single choice may look small, but repeated choices become a path. A path trains desire, forms habits, shapes relationships, and slowly makes certain futures easier to reach and others harder to imagine.",
      "Wisdom helps the reader look past the immediate step and ask where the road is going. Foolishness asks only what feels possible now. Wisdom asks what kind of person this path is making me become.",
    ],
    heart: [
      "The heart is underneath the whole section. In Proverbs, the heart is more than emotion. It is the inner control center of loves, motives, thoughts, desires, fears, and direction.",
      "That means the visible issue is rarely the only issue. Speech, money, anger, laziness, lust, pride, and conflict all flow from something deeper. Wisdom keeps asking what source these actions are coming from.",
      "This is why Proverbs feels so practical and so spiritual at the same time. It does not only want better behavior. It wants a heart trained by the fear of the Lord so the life flowing outward becomes healthier.",
    ],
    home: [
      "When Proverbs talks about the house, it is talking about more than a building. The home is where wisdom becomes visible in repeated patterns: tone, trust, patience, discipline, generosity, conflict, and peace.",
      "A person can look successful outside and still trouble their own house. Solomon keeps pressing this because wisdom must reach the places where people are most familiar and least performative.",
      "This section invites the reader to think about what their presence does to the people closest to them. Do they strengthen the house, or do they slowly tear it down with pride, anger, neglect, selfishness, or careless words?",
    ],
    leadership: [
      "Leadership in Proverbs is never only about position. It is about weight, responsibility, justice, restraint, and the fear of the Lord.",
      "Kings, rulers, judges, and people with influence can bless others when they love righteousness, but they can also multiply harm when pride, anger, greed, or favoritism rules them.",
      "This applies beyond ancient kings. Anyone with influence over a home, team, ministry, friendship, business, or decision carries some form of leadership. Wisdom asks whether that influence protects people or uses them.",
    ],
    justice: [
      "Justice is one of the deep moral threads in Proverbs. God cares about honest scales, truthful witnesses, fair boundaries, the poor, the vulnerable, and the way power treats people who cannot easily defend themselves.",
      "This section shows that wisdom is not only private character. It reaches into public life, money, courts, work, neighborhoods, and the way people handle advantage.",
      "The reader should feel the seriousness here: God is not impressed by religious language that ignores justice. Wisdom does what is right when dishonesty would be easier and when exploitation might go unnoticed by people.",
    ],
    appetite: [
      "Appetite is not only about food or drink. In Proverbs, appetite includes the cravings that pull on the body and the heart: pleasure, comfort, sex, control, recognition, ease, and escape.",
      "Solomon does not pretend desire is unreal. He teaches that desire must be governed by wisdom, because an untrained appetite can start as a servant and slowly become a master.",
      "This section asks what the reader is feeding. Repeated desire becomes stronger when it is constantly obeyed. Wisdom learns when to receive a good gift, when to refuse a dangerous one, and when to stop before the heart is ruled by craving.",
    ],
    laziness: [
      "Laziness in Proverbs is rarely treated as a harmless personality trait. It is a direction that slowly steals opportunity, weakens responsibility, and teaches the heart to prefer excuses over faithfulness.",
      "The sluggard often sounds reasonable to himself. He can explain delay, exaggerate obstacles, and make ordinary work feel impossible. Solomon exposes those excuses because they quietly reshape a life.",
      "The practical wisdom here is steady faithfulness. Wisdom does not require dramatic energy every day, but it does call a person to do the next right thing before neglect becomes a harvest.",
    ],
    friendship: [
      "Relationships are one of the main places wisdom is tested. Friends, neighbors, counselors, spouses, enemies, and fools all shape the atmosphere of a life.",
      "Proverbs teaches that closeness is never neutral. The people we listen to, imitate, argue with, trust, or envy can strengthen wisdom or slowly pull the heart toward foolishness.",
      "This section invites careful attention to relational patterns. Who sharpens you? Who flatters you? Who corrects you? Who makes sin feel normal? Who helps you see clearly when your own heart is noisy?",
    ],
    humility: [
      "Pride and humility sit underneath many of these sayings. Pride makes a person unteachable, easily offended, hungry for honor, and blind to danger. Humility keeps the heart open to wisdom.",
      "Solomon keeps showing that honor cannot be grabbed safely by pride. The person who demands elevation often exposes their smallness, while the humble person can receive instruction and be lifted at the right time.",
      "This is practical because pride rarely feels like pride from the inside. It often feels like defensiveness, comparison, entitlement, or the need to be seen. Wisdom teaches the heart to bow before it breaks.",
    ],
    fear: [
      "The fear of the Lord is the foundation under the practical details. Proverbs is not giving detached life tips. It is teaching life before God.",
      "That means every ordinary decision has spiritual weight. Work, speech, anger, money, correction, pleasure, justice, and friendship all happen before the eyes of the Lord.",
      "When the fear of the Lord is present, wisdom becomes more than self-improvement. It becomes reverence, trust, obedience, and a life ordered around God's truth instead of personal impulse.",
    ],
    folly: [
      "Folly in Proverbs is not merely a lack of information. It is a pattern of life that resists correction, follows appetite, misuses words, mocks wisdom, and keeps choosing the short road even when the ending is clear.",
      "That is why Solomon paints foolishness so vividly. He wants the reader to recognize it before it feels normal. Foolishness becomes more dangerous when it becomes familiar.",
      "The section asks the reader to examine not only obvious rebellion but small habits of resistance: ignoring counsel, feeding resentment, laughing at sin, delaying obedience, or assuming consequences will not come.",
    ],
  };

  return paragraphs[theme]?.map((paragraph) => paragraph.replace("This section", `In Proverbs ${chapter}, this section`)) ?? [];
}

function themesFor(heading: string, body: string[]) {
  const text = `${heading} ${body.join(" ")}`.toLowerCase();
  const themes: string[] = [];

  const tests: Array<[string, string[]]> = [
    ["speech", ["speech", "words", "mouth", "tongue", "lips", "answer", "witness", "counsel", "talebearer"]],
    ["money", ["money", "wealth", "rich", "riches", "treasure", "gold", "silver", "poverty", "poor", "generosity", "open hand", "debt"]],
    ["correction", ["correction", "instruction", "reproof", "rebuke", "discipline", "counsel", "listen"]],
    ["path", ["path", "way", "walk", "steps", "road", "stumble", "direction"]],
    ["heart", ["heart", "desire", "soul", "motive", "inner", "fear"]],
    ["home", ["house", "home", "wife", "child", "children", "mother", "father", "family"]],
    ["leadership", ["king", "ruler", "rule", "crown", "throne", "judge", "leadership"]],
    ["justice", ["justice", "judgment", "scales", "balance", "landmark", "poor", "oppress", "false witness", "righteous"]],
    ["appetite", ["appetite", "food", "wine", "drink", "table", "desire", "pleasure", "strange woman"]],
    ["laziness", ["lazy", "sloth", "sluggard", "diligent", "work", "labor", "field", "harvest"]],
    ["friendship", ["friend", "neighbor", "enemy", "companion", "counsel", "relationship"]],
    ["humility", ["pride", "proud", "humility", "honor", "haughty", "scorner", "glory"]],
    ["fear", ["lord", "fear of the lord", "god"]],
    ["folly", ["fool", "folly", "wicked", "scorner", "evil"]],
  ];

  for (const [theme, words] of tests) {
    if (includesAny(text, words)) themes.push(theme);
  }

  if (!themes.includes("heart")) themes.push("heart");
  if (!themes.includes("path")) themes.push("path");
  if (!themes.includes("fear")) themes.push("fear");

  return [...new Set(themes)].slice(0, 4);
}

export function deepenProverbsSection(options: DeepStudyOptions) {
  const { chapter, title, range, heading, body } = options;

  if (chapter < MIN_DEEP_CHAPTER) return body;

  const readableHeading = cleanHeading(heading);
  const cleanTitle = cleanHeading(title);
  const selectedThemes = themesFor(readableHeading, body);
  const expansion = selectedThemes.flatMap((theme) => themeParagraphs(theme, chapter)).slice(0, 9);

  return [
    ...body,
    `To read Proverbs ${chapter}:${range} well, do not treat this section as a disconnected cluster of wise sayings. It belongs inside the movement of **${cleanTitle}**, so the smaller sayings are working together to train how the reader sees life.`,
    `The heading **${readableHeading}** helps name the main pressure point. Solomon is slowing the reader down so wisdom is not only noticed, but understood, pictured, and carried into real decisions.`,
    ...expansion,
    "This is the kind of wisdom that becomes useful during an ordinary day. It helps a person pause before speaking, look past the immediate feeling, notice the direction of a choice, and ask what kind of life is being formed.",
  ];
}

export function formatProverbsStudySection(options: DeepStudyOptions) {
  const { chapter, range, heading, body } = options;

  if (chapter === 7 || body.some((line) => line.trim().startsWith("### "))) {
    return body;
  }

  const selectedThemes = themesFor(heading, body);
  const primaryTheme = themeLabels[selectedThemes[0]] ?? themeLabels.heart;
  const secondaryTheme = themeLabels[selectedThemes[1]] ?? themeLabels.path;
  const finalTheme = themeLabels[selectedThemes[2]] ?? themeLabels.fear;
  const { first, second } = paragraphChunks(body);

  return [
    `### ${primaryTheme.icon} ${primaryTheme.label}`,
    ...first,
    "**Watch the movement in this section:**",
    ...emojiList(primaryTheme.bullets),
    `### ${secondaryTheme.icon} How This Works In Real Life`,
    ...second,
    "**This is the wisdom pressure point:**",
    ...emojiList(secondaryTheme.bullets),
    `### ${finalTheme.icon} Carry This Into The Day`,
    `Proverbs ${chapter}:${range} is not meant to stay on the page. It is meant to train the reader to notice what is happening in the heart, in the path, and in the ordinary decisions that shape a life.`,
    "**Ask it plainly:**",
    ...emojiList(finalTheme.bullets),
  ];
}

export function deepenProverbsIntro(chapter: number, title: string, intro: string[]) {
  if (chapter < MIN_FORMATTED_CHAPTER || chapter === 7) return intro;

  const cleanTitle = cleanHeading(title);

  return [
    ...intro,
    "### 🧩 How To Read This Chapter",
    `For this Bible study, Proverbs ${chapter} should be read slowly, not skimmed. The chapter may contain short sayings, but short does not mean shallow. Each proverb is like a window into how wisdom works in real life.`,
    "**As you read, keep watching for:**",
    "- 🔎 what wisdom builds",
    "- ⚠️ what foolishness breaks",
    "- ❤️ what the heart reveals",
    "- 🛤️ where each path is leading",
    "### 🧭 The Thread Holding It Together",
    `The chapter title, **${cleanTitle}**, gives the reader a lens for the whole chapter. Even when the sayings move from speech to money to correction to relationships, they are still training the same kind of heart: one that fears the Lord and can recognize the difference between wisdom and folly before consequences become loud.`,
    "The goal is not only to understand individual verses. The goal is to see the patterns: what wisdom builds, what foolishness breaks, what the heart reveals, and how ordinary choices slowly shape a life.",
  ];
}

export function deepenProverbsTakeaway(chapter: number, takeaway: string[]) {
  if (chapter < MIN_FORMATTED_CHAPTER || chapter === 7) return takeaway;

  return [
    ...takeaway,
    "**Hold on to the main movement:**",
    "- 📍 wisdom reaches ordinary life",
    "- ❤️ the heart shows up in choices",
    "- 🛤️ small paths become real futures",
    `The deeper lesson of Proverbs ${chapter} is that wisdom is not abstract. It moves into the mouth, the home, the workplace, the wallet, the private desire, the public decision, and the hidden motive.`,
    "The chapter teaches the reader to slow down and ask better questions: What is this forming in me? Where does this path lead? What does this reveal about my heart? What would wisdom look like before the damage is done?",
    "That is why Proverbs is so practical and so serious at the same time. It is not trying to decorate life with religious thoughts. It is trying to protect the whole direction of life with truth.",
  ];
}
