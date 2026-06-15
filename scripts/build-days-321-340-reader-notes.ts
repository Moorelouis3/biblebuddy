import { writeFileSync } from "fs";

type BookName =
  | "Romans"
  | "1 Corinthians"
  | "2 Corinthians"
  | "Galatians"
  | "Ephesians"
  | "Philippians"
  | "Colossians"
  | "1 Thessalonians";

type ApiVerse = { chapter: number; verse: number; text: string };
type ApiChapter = { verses: ApiVerse[] };

type Section = {
  book: BookName;
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

type Target = {
  book: BookName;
  chapters: number[];
  exportName: string;
  fileName: string;
};

const targets: Target[] = [
  { book: "Romans", chapters: Array.from({ length: 8 }, (_, index) => index + 9), exportName: "ROMANS_9_16_PERSONAL_SECTIONS", fileName: "romansNineToSixteenPersonalNotes" },
  { book: "1 Corinthians", chapters: Array.from({ length: 16 }, (_, index) => index + 1), exportName: "FIRST_CORINTHIANS_1_16_PERSONAL_SECTIONS", fileName: "firstCorinthiansOneToSixteenPersonalNotes" },
  { book: "2 Corinthians", chapters: Array.from({ length: 13 }, (_, index) => index + 1), exportName: "SECOND_CORINTHIANS_1_13_PERSONAL_SECTIONS", fileName: "secondCorinthiansOneToThirteenPersonalNotes" },
  { book: "Galatians", chapters: Array.from({ length: 6 }, (_, index) => index + 1), exportName: "GALATIANS_1_6_PERSONAL_SECTIONS", fileName: "galatiansOneToSixPersonalNotes" },
  { book: "Ephesians", chapters: Array.from({ length: 6 }, (_, index) => index + 1), exportName: "EPHESIANS_1_6_PERSONAL_SECTIONS", fileName: "ephesiansOneToSixPersonalNotes" },
  { book: "Philippians", chapters: Array.from({ length: 4 }, (_, index) => index + 1), exportName: "PHILIPPIANS_1_4_PERSONAL_SECTIONS", fileName: "philippiansOneToFourPersonalNotes" },
  { book: "Colossians", chapters: Array.from({ length: 4 }, (_, index) => index + 1), exportName: "COLOSSIANS_1_4_PERSONAL_SECTIONS", fileName: "colossiansOneToFourPersonalNotes" },
  { book: "1 Thessalonians", chapters: [1, 2, 3], exportName: "FIRST_THESSALONIANS_1_3_PERSONAL_SECTIONS", fileName: "firstThessaloniansOneToThreePersonalNotes" },
];

const sectionIcons = ["📣", "✝️", "🕊️", "👑", "📜", "🧩", "💛", "🏠", "🕯️", "🛡️", "🌿", "✉️", "⚖️", "🔥", "🤲", "🧭"];
const stopWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
const badStart = /^(and|but|for|of|to|unto|with|from|in|on|by|that|which|when|because|therefore|then|also|yea|now|there|wherefore)\b/i;
const badEnd = new Set(["a", "an", "and", "as", "at", "be", "because", "both", "but", "by", "can", "could", "did", "do", "does", "for", "from", "hath", "he", "his", "in", "into", "is", "may", "might", "must", "of", "on", "shall", "should", "that", "the", "their", "there", "to", "unto", "very", "was", "when", "which", "will", "with", "would"]);
const weakPhrasePattern = /^(he|she|they|them|we|ye|you|i|it|him|her)\s+(said|say|answered|asked|went|came|come|took|gave|give|sent|found|sat|stood|entered|saw|heard|made|make|did)\b/i;

const anchors = [
  "The gifts and calling of God are without repentance",
  "Present your bodies a living sacrifice",
  "Be not conformed to this world",
  "Be ye transformed by the renewing of your mind",
  "We being many are one body in Christ",
  "Overcome evil with good",
  "Put ye on the Lord Jesus Christ",
  "The kingdom of God is not meat and drink",
  "The preaching of the cross",
  "Christ crucified",
  "We have the mind of Christ",
  "Ye are God's building",
  "Ye are the temple of God",
  "Purge out therefore the old leaven",
  "Your body is the temple of the Holy Ghost",
  "Charity edifieth",
  "This do in remembrance of me",
  "Now ye are the body of Christ",
  "Charity suffereth long and is kind",
  "Let all things be done decently and in order",
  "Christ died for our sins according to the scriptures",
  "Now is Christ risen from the dead",
  "Be ye stedfast unmoveable",
  "The God of all comfort",
  "We have this treasure in earthen vessels",
  "We walk by faith not by sight",
  "If any man be in Christ he is a new creature",
  "God loveth a cheerful giver",
  "My grace is sufficient for thee",
  "My strength is made perfect in weakness",
  "The just shall live by faith",
  "Christ hath redeemed us from the curse of the law",
  "There is neither Jew nor Greek",
  "Stand fast therefore in the liberty",
  "Walk in the Spirit",
  "The fruit of the Spirit",
  "Bear ye one another's burdens",
  "Blessed us with all spiritual blessings",
  "Chosen us in him before the foundation of the world",
  "By grace are ye saved through faith",
  "Created in Christ Jesus unto good works",
  "One Lord one faith one baptism",
  "Put on the new man",
  "Walk in love",
  "Put on the whole armour of God",
  "Being confident of this very thing",
  "Let this mind be in you which was also in Christ Jesus",
  "I count all things but loss",
  "I can do all things through Christ",
  "Who is the image of the invisible God",
  "By him were all things created",
  "Christ in you the hope of glory",
  "Set your affection on things above",
  "Let the word of Christ dwell in you richly",
  "Work of faith and labour of love",
  "Ye turned to God from idols",
  "The word of God which effectually worketh also",
];

function note(lines: string[]) {
  return lines.filter(Boolean).join("\n\n");
}

function normalize(text: string) {
  return text.replace(/[“”]/g, "\"").replace(/[’]/g, "'").replace(/\s+/g, " ").trim();
}

function titleCase(value: string) {
  return normalize(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const clean = word.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, "");
      const lower = clean.toLowerCase();
      if (!clean) return "";
      if (clean.toUpperCase() === "LORD") return "LORD";
      if (clean.toUpperCase() === "JESUS") return "JESUS";
      if (clean.toUpperCase() === "CHRIST") return "Christ";
      if (index > 0 && stopWords.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .filter(Boolean)
    .join(" ");
}

function wordCount(phrase: string) {
  return phrase.split(/\s+/).filter(Boolean).length;
}

function trimPhrase(raw: string) {
  let phrase = normalize(raw)
    .replace(/^["'`]+|["'`]+$/g, "")
    .replace(/[:;,.!?]+$/g, "")
    .replace(badStart, "")
    .trim();
  phrase = phrase.replace(/\s+/g, " ");
  while (phrase) {
    const last = phrase.split(/\s+/).at(-1)?.toLowerCase() ?? "";
    if (!badEnd.has(last)) break;
    phrase = phrase.split(/\s+/).slice(0, -1).join(" ");
  }
  phrase = titleCase(phrase);
  if (wordCount(phrase) < 3 || wordCount(phrase) > 10) return "";
  if (/^\d/.test(phrase)) return "";
  if (weakPhrasePattern.test(phrase) && !/lord|god|jesus|christ|spirit|blood|cross|sin|faith|grace|gospel|promise|resurrection|church|body|charity|love/i.test(phrase)) return "";
  return phrase;
}

function verseCandidateSets(text: string) {
  const normalized = normalize(text).replace(/\([^)]+\)/g, "");
  const clauses = normalized.split(/[,;:.!?]/).map(trimPhrase).filter(Boolean);
  const words = normalized.replace(/[^A-Za-z0-9'\s-]/g, " ").split(/\s+/).filter(Boolean);
  const windows: string[] = [];
  for (const size of [4, 5, 6, 7, 8, 9]) {
    for (let index = 0; index + size <= words.length; index += 1) {
      const phrase = trimPhrase(words.slice(index, index + size).join(" "));
      if (phrase) windows.push(phrase);
    }
  }
  const special = anchors.filter((anchor) => normalized.toLowerCase().includes(anchor.toLowerCase())).map(titleCase);
  return { clauses: [...new Set([...special, ...clauses])], windows: [...new Set(windows)] };
}

function category(_book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  if (/jesus|christ|lord|son|image of the invisible god|firstborn|head of the body|before all things|fullness/.test(lower)) return "christ";
  if (/cross|crucified|blood|died|death|buried|resurrection|risen|firstfruits|gospel/.test(lower)) return "crossGospel";
  if (/faith|grace|justified|righteousness|saved|redemption|reconciled|peace|promise|covenant|election|mercy/.test(lower)) return "graceFaith";
  if (/law|works|curse|bondage|liberty|flesh|sin|condemnation|wrath|old man|ordinances/.test(lower)) return "lawFlesh";
  if (/spirit|holy ghost|fruit of the spirit|walk in the spirit|sealed|earnest|quickened/.test(lower)) return "spiritLife";
  if (/word|truth|wisdom|knowledge|mystery|mind|doctrine|excellent|glory|praise|name|record/.test(lower)) return "teachingTruth";
  if (/walk|obey|work|works|doing|do good|sow|reap|prove|stand|stedfast|unmoveable|run well/.test(lower)) return "obediencePractice";
  if (/body|members|church|gifts|tongues|prophecy|apostles|ministry|servants|edify|edification/.test(lower)) return "churchBody";
  if (/love|charity|forgive|kind|meekness|gentleness|comfort|encourag|tenderhearted/.test(lower)) return "loveComfort";
  if (/marriage|husband|wife|children|father|bondservants|masters|unmarried|virgin/.test(lower)) return "household";
  if (/idols|meat|supper|table|cup|bread|leaven|temple|fornication|sanctification/.test(lower)) return "holinessWorship";
  if (/armour|helmet|breastplate|sword|shield|wrestle|principalities|powers/.test(lower)) return "armor";
  if (/joy|rejoice|content|suffer|affliction|weakness|thorn|persecution|tribulation/.test(lower)) return "sufferingJoy";
  if (/apostle|paul|corinth|galatia|ephesus|philippi|colosse|thessalonica|saints|brethren/.test(lower)) return "letterSetting";
  if (/scripture|written|abraham|israel|gentiles|jew|remnant|seed/.test(lower)) return "scriptureStory";
  return "detail";
}

function phraseIcon(book: BookName, phrase: string) {
  return {
    christ: "👑",
    crossGospel: "✝️",
    graceFaith: "📣",
    lawFlesh: "⚖️",
    spiritLife: "🕊️",
    teachingTruth: "📖",
    obediencePractice: "👣",
    churchBody: "🧩",
    loveComfort: "💛",
    household: "🏠",
    holinessWorship: "🕯️",
    armor: "🛡️",
    sufferingJoy: "🌿",
    letterSetting: "✉️",
    scriptureStory: "📜",
    detail: "🔎",
  }[category(book, phrase)];
}

function bullets(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  if (/jesus|christ|lord|image|firstborn|head|fullness/.test(lower)) return ["👑 Christ centered", "📜 Promise fulfilled", "🧭 Reader anchored", "🙏 Worship directed"];
  if (/cross|crucified|blood|died|death|resurrection|risen|gospel/.test(lower)) return ["✝️ Gospel center", "🩸 Cost named", "🌅 Resurrection hope", "📣 Message clarified"];
  if (/faith|grace|justified|righteousness|saved|redemption|peace|promise|mercy/.test(lower)) return ["📣 Grace explained", "🤲 Faith received", "⚖️ Standing before God", "🌿 Life changed"];
  if (/law|works|curse|bondage|liberty|flesh|sin|condemnation|wrath/.test(lower)) return ["⚖️ False hope exposed", "⛓️ Bondage named", "📣 Grace needed", "🌿 Freedom opened"];
  if (/spirit|holy ghost|fruit|sealed|quickened/.test(lower)) return ["🕊️ Spirit life", "🌿 New desires", "🧭 Walk directed", "🙏 Dependence taught"];
  if (/word|truth|wisdom|knowledge|mystery|mind|doctrine|excellent|glory|praise|name|record/.test(lower)) return ["📖 Truth clarified", "🧠 Mind shaped", "🧭 Discernment formed", "👑 God honored"];
  if (/walk|obey|work|doing|do good|sow|reap|prove|stand|stedfast|unmoveable|run well/.test(lower)) return ["👣 Obedience practiced", "🌱 Fruit expected", "🧭 Direction clarified", "🙏 Endurance needed"];
  if (/body|members|church|gifts|tongues|prophecy|ministry|edify/.test(lower)) return ["🧩 Church body", "🎁 Gifts serving", "💬 Edification", "🌿 Unity practiced"];
  if (/love|charity|forgive|kind|comfort|tenderhearted/.test(lower)) return ["💛 Love defined", "🤲 Mercy practiced", "🌿 Heart shaped", "👣 Faith visible"];
  if (/marriage|husband|wife|children|father|servants|masters/.test(lower)) return ["🏠 Household life", "👣 Daily obedience", "💛 Love practiced", "🧭 Order clarified"];
  if (/idols|meat|supper|table|cup|bread|leaven|temple|fornication|sanctification/.test(lower)) return ["🕯️ Holiness named", "🍞 Worship setting", "🧭 Conscience guided", "👥 Others considered"];
  if (/armour|helmet|breastplate|sword|shield|wrestle/.test(lower)) return ["🛡️ Spiritual battle", "📜 Truth equipped", "🙏 Prayer needed", "👣 Stand firm"];
  if (/joy|rejoice|content|suffer|affliction|weakness|thorn/.test(lower)) return ["🌿 Joy under pressure", "🙏 Trust formed", "💪 Weakness reframed", "👑 Christ enough"];
  if (/apostle|paul|corinth|galatia|ephesus|philippi|colosse|thessalonica|saints|brethren/.test(lower)) return ["✉️ Letter setting", "👥 Church addressed", "🧭 Context clarified", "📣 Teaching applied"];
  if (/scripture|written|abraham|israel|gentiles|jew|remnant|seed/.test(lower)) return ["📜 Scripture story", "👥 People named", "🤲 Promise traced", "👑 Christ in view"];
  if (book === "Romans") return ["⚖️ Argument followed", "📣 Mercy explained", "🌿 Life response", "👥 Jew and Gentile"];
  return ["🔎 Detail noticed", "📖 Passage followed", "🧭 Reader clarity", "🌿 Faith connection"];
}

function explain(book: BookName, phrase: string) {
  const kind = category(book, phrase);
  const lower = phrase.toLowerCase();
  const detailLines: [string, string, string] = (() => {
    if (/therefore|wherefore|now|but|for/.test(lower)) {
      return [
        `${phrase} signals a turn in the flow of Paul's reasoning.`,
        "Words like this often connect doctrine to response, problem to answer, or grace to the kind of life that should follow.",
        "The wording helps the reader follow the argument instead of reading isolated sentences.",
      ];
    }
    if (/corinth|galatia|ephesus|philippi|colosse|thessalonica|saints|brethren|church/.test(lower)) {
      return [
        `${phrase} tells the reader who is being addressed or what church situation is in view.`,
        "These letters were written to real believers with real confusion, pressure, sin, questions, and growth. The setting helps the teaching land in ordinary church life.",
        "The wording keeps the passage connected to people, not abstract ideas.",
      ];
    }
    if (/grace|faith|law|spirit|body|charity|resurrection|liberty|armour|joy|christ/.test(lower)) {
      return [
        `${phrase} carries one of the main teaching points in this part of ${book}.`,
        "Paul's letters often build meaning phrase by phrase, so the reader needs to slow down over the wording and see how the thought is being built.",
        "The wording helps the reader understand how the truth should shape life.",
      ];
    }
    return [
      `${phrase} gives the reader a specific part of Paul's thought to slow down and understand.`,
      "The wording may carry doctrine, correction, encouragement, or a practical command for the church.",
      "The wording keeps the explanation tied to the actual text.",
    ];
  })();
  const lines: Record<ReturnType<typeof category>, [string, string, string]> = {
    christ: [
      `${phrase} points the reader to who Christ is and why He stands at the center of the Christian life.`,
      "Paul keeps returning to Christ as Lord, head, image, Savior, source of life, and the one in whom believers receive every spiritual blessing.",
      "The phrase helps the reader see Christianity as union with Christ, not mere self-improvement.",
    ],
    crossGospel: [
      `${phrase} brings the reader back to the Gospel center: Christ crucified, risen, and proclaimed.`,
      "Paul does not treat the cross as only the beginning of faith. The cross shapes wisdom, humility, forgiveness, resurrection hope, and the whole message of salvation.",
      "The phrase helps the reader keep the Gospel at the center.",
    ],
    graceFaith: [
      `${phrase} explains how grace, faith, righteousness, mercy, or promise works in Paul's teaching.`,
      "Paul keeps showing that people are made right with God by grace through faith, not by boasting, ancestry, effort, or religious performance.",
      "The phrase helps a beginner understand what God gives and how people receive it.",
    ],
    lawFlesh: [
      `${phrase} names the pressure of sin, law, flesh, works, or bondage that grace answers.`,
      "Paul slows down here because readers easily confuse obedience with self-rescue. The law can expose sin, but it cannot create new life apart from Christ.",
      "The phrase helps the reader see what cannot save before hearing what can.",
    ],
    spiritLife: [
      `${phrase} teaches how the Spirit gives life and forms the believer's walk.`,
      "The Spirit is not treated as a vague feeling. Paul connects the Spirit to assurance, holiness, unity, fruit, prayer, power, and new desires.",
      "The phrase helps the reader understand Christian living as Spirit-dependent life.",
    ],
    teachingTruth: [
      `${phrase} teaches how truth, wisdom, knowledge, or renewed thinking should shape the believer.`,
      "Paul cares about what Christians understand because wrong thinking leads to wrong worship, wrong confidence, and wrong living.",
      "The phrase helps the reader see doctrine as something that forms the mind and the life.",
    ],
    obediencePractice: [
      `${phrase} moves the teaching into practiced obedience.`,
      "Paul does not leave grace floating above ordinary life. He shows believers how to walk, work, stand, sow, serve, and endure in response to what God has done.",
      "The phrase helps the reader connect belief with daily faithfulness.",
    ],
    churchBody: [
      `${phrase} explains how believers belong to one another in the body of Christ.`,
      "Paul uses body, members, gifts, service, and edification to show that the church is not a crowd of isolated people but a Spirit-shaped community.",
      "The phrase helps the reader see why gifts and freedom must serve love.",
    ],
    loveComfort: [
      `${phrase} defines the kind of love, comfort, forgiveness, or tenderness that should mark believers.`,
      "Paul does not leave love as a vague emotion. He describes patience, kindness, burden-bearing, generosity, comfort, forgiveness, and mercy in concrete ways.",
      "The phrase helps the reader see what faith should look like toward people.",
    ],
    household: [
      `${phrase} brings Paul's teaching into ordinary household relationships.`,
      "These instructions show that the Gospel reaches marriage, parenting, work, authority, service, and daily responsibility instead of staying only in worship gatherings.",
      "The phrase helps the reader connect doctrine to home life.",
    ],
    holinessWorship: [
      `${phrase} teaches how holiness and worship shape the believer's body, conscience, and community life.`,
      "Paul connects worship to meals, bodies, sexual holiness, idols, the Lord's Supper, and how believers treat one another.",
      "The phrase helps the reader see that worship includes the whole life.",
    ],
    armor: [
      `${phrase} teaches the reader how Paul describes spiritual resistance and endurance.`,
      "The armor language is not about fear. It is about standing firm with truth, righteousness, faith, salvation, Scripture, prayer, and dependence on God.",
      "The phrase helps the reader understand spiritual battle without losing sight of God's provision.",
    ],
    sufferingJoy: [
      `${phrase} shows how Paul frames suffering, weakness, joy, or contentment in Christ.`,
      "Paul does not pretend hardship is easy. He shows that weakness can become the place where Christ's strength, comfort, and hope are seen more clearly.",
      "The phrase helps the reader understand endurance through Christ.",
    ],
    letterSetting: [
      `${phrase} identifies the people, church, or apostolic setting behind the letter.`,
      "Knowing the setting keeps the reader from treating the letter as random sayings. Paul is speaking to real churches with real needs.",
      "The phrase helps the reader know who is being taught and why.",
    ],
    scriptureStory: [
      `${phrase} connects Paul's teaching to Scripture, Israel, Abraham, Gentiles, promise, or the seed of faith.`,
      "Paul reads the Gospel as the continuation and fulfillment of God's long story, not a separate idea detached from the Old Testament.",
      "The phrase helps the reader see one Bible story moving toward Christ.",
    ],
    detail: detailLines,
  };
  const [first, second, closing] = lines[kind];
  return note([first, second, bullets(book, phrase).join("\n"), closing]);
}

function scorePhrase(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  let score = wordCount(phrase);
  if (anchors.some((anchor) => lower.includes(anchor.toLowerCase()))) score += 40;
  if (/lord|god|jesus|christ|spirit|gospel|grace|faith|righteous|sin|death|life|resurrection|body|church|charity|love|law|liberty|promise|cross|blood|glory|hope|mercy/.test(lower)) score += 16;
  if (category(book, phrase) !== "detail") score += 10;
  if (/^(said|came|went|made|took|called)\b/i.test(phrase)) score -= 5;
  if (/\b(and|or|but)\b/i.test(phrase)) score -= 1;
  return score;
}

function chunkVerses(verses: ApiVerse[], chunkSize = 2) {
  const chunks: ApiVerse[][] = [];
  for (let index = 0; index < verses.length; index += chunkSize) chunks.push(verses.slice(index, index + chunkSize));
  if (chunkSize > 1 && chunks.length > 1 && chunks.at(-1)!.length < chunkSize) {
    const last = chunks.pop()!;
    const prev = chunks.pop()!;
    chunks.push([...prev, ...last]);
  }
  return chunks;
}

function isNearDuplicate(phrase: string, selected: string[]) {
  const lower = phrase.toLowerCase();
  return selected.some((item) => {
    const other = item.toLowerCase();
    return lower.includes(other) || other.includes(lower);
  });
}

function selectPhrases(book: BookName, chunk: ApiVerse[]) {
  const sets = chunk.map((verse) => verseCandidateSets(verse.text));
  const clausePool = [...new Set(sets.flatMap((set) => set.clauses))]
    .filter((phrase) => wordCount(phrase) >= 3)
    .sort((a, b) => scorePhrase(book, b) - scorePhrase(book, a));
  const windowPool = [...new Set(sets.flatMap((set) => set.windows))]
    .filter((phrase) => wordCount(phrase) >= 3)
    .sort((a, b) => scorePhrase(book, b) - scorePhrase(book, a));
  const selected: string[] = [];
  for (const phrase of clausePool) {
    if (!isNearDuplicate(phrase, selected)) selected.push(phrase);
    if (selected.length >= 7) break;
  }
  for (const phrase of windowPool) {
    if (selected.length >= 7) break;
    if (!isNearDuplicate(phrase, selected)) selected.push(phrase);
  }
  return selected;
}

function makeSection(book: BookName, chapter: number, chunk: ApiVerse[], sectionIndex: number): Section | null {
  const phrases = selectPhrases(book, chunk);
  if (phrases.length < 4) return null;
  const startVerse = chunk[0].verse;
  const endVerse = chunk.at(-1)!.verse;
  const reference = startVerse === endVerse ? `${book} ${chapter}:${startVerse}` : `${book} ${chapter}:${startVerse}-${endVerse}`;
  const title = phrases[0];
  return {
    book,
    chapter,
    startVerse,
    endVerse,
    reference,
    title,
    icon: sectionIcons[(chapter + startVerse + sectionIndex) % sectionIcons.length],
    phrases: phrases.map((phrase) => [`${phraseIcon(book, phrase)} ${phrase}`, explain(book, phrase)]),
  };
}

async function getChapter(book: BookName, chapter: number) {
  const url = `https://bible-api.com/${encodeURIComponent(`${book} ${chapter}`)}?translation=kjv`;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await fetch(url);
    if (response.ok) return (await response.json()) as ApiChapter;
    if (response.status !== 429 || attempt === 6) throw new Error(`Could not fetch ${book} ${chapter}: ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, 1500 * attempt));
  }
  throw new Error(`Could not fetch ${book} ${chapter}`);
}

function serialize(sections: Section[]) {
  return JSON.stringify(sections, null, 2)
    .replace(/^\[\n/, "")
    .replace(/\n\]$/, "")
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/^/gm, "  ")
    .trimStart();
}

async function buildBook(book: BookName, chapters: number[]) {
  const sections: Section[] = [];
  for (const chapter of chapters) {
    const apiChapter = await getChapter(book, chapter);
    chunkVerses(apiChapter.verses, book === "1 Thessalonians" ? 1 : 2).forEach((chunk, index) => {
      const section = makeSection(book, chapter, chunk, index);
      if (section) sections.push(section);
    });
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
  return sections;
}

function typeName(book: BookName) {
  return `${book.replace(/\s+/g, "").replace(/^\d/, (digit) => digit === "1" ? "First" : "Second")}PhraseSectionInput`;
}

async function main() {
  for (const target of targets) {
    const sections = await buildBook(target.book, target.chapters);
    const type = typeName(target.book);
    writeFileSync(
      `lib/${target.fileName}.ts`,
      `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type ${type} = PersonalLeviticusPhraseSectionInput & { book: "${target.book}" };

export const ${target.exportName} = [
${serialize(sections)}
] as const satisfies readonly ${type}[];
`,
    );
    console.log(`Wrote ${sections.length} ${target.book} sections.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
