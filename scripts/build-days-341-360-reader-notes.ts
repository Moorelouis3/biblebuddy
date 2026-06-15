import { writeFileSync } from "fs";

type BookName =
  | "1 Thessalonians"
  | "2 Thessalonians"
  | "1 Timothy"
  | "2 Timothy"
  | "Titus"
  | "Philemon"
  | "Hebrews"
  | "James"
  | "1 Peter"
  | "2 Peter"
  | "1 John"
  | "2 John"
  | "3 John"
  | "Jude"
  | "Revelation";

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
  { book: "1 Thessalonians", chapters: [4, 5], exportName: "FIRST_THESSALONIANS_4_5_PERSONAL_SECTIONS", fileName: "firstThessaloniansFourToFivePersonalNotes" },
  { book: "2 Thessalonians", chapters: [1, 2, 3], exportName: "SECOND_THESSALONIANS_1_3_PERSONAL_SECTIONS", fileName: "secondThessaloniansOneToThreePersonalNotes" },
  { book: "1 Timothy", chapters: Array.from({ length: 6 }, (_, index) => index + 1), exportName: "FIRST_TIMOTHY_1_6_PERSONAL_SECTIONS", fileName: "firstTimothyOneToSixPersonalNotes" },
  { book: "2 Timothy", chapters: Array.from({ length: 4 }, (_, index) => index + 1), exportName: "SECOND_TIMOTHY_1_4_PERSONAL_SECTIONS", fileName: "secondTimothyOneToFourPersonalNotes" },
  { book: "Titus", chapters: [1, 2, 3], exportName: "TITUS_1_3_PERSONAL_SECTIONS", fileName: "titusOneToThreePersonalNotes" },
  { book: "Philemon", chapters: [1], exportName: "PHILEMON_1_PERSONAL_SECTIONS", fileName: "philemonOnePersonalNotes" },
  { book: "Hebrews", chapters: Array.from({ length: 13 }, (_, index) => index + 1), exportName: "HEBREWS_1_13_PERSONAL_SECTIONS", fileName: "hebrewsOneToThirteenPersonalNotes" },
  { book: "James", chapters: Array.from({ length: 5 }, (_, index) => index + 1), exportName: "JAMES_1_5_PERSONAL_SECTIONS", fileName: "jamesOneToFivePersonalNotes" },
  { book: "1 Peter", chapters: Array.from({ length: 5 }, (_, index) => index + 1), exportName: "FIRST_PETER_1_5_PERSONAL_SECTIONS", fileName: "firstPeterOneToFivePersonalNotes" },
  { book: "2 Peter", chapters: [1, 2, 3], exportName: "SECOND_PETER_1_3_PERSONAL_SECTIONS", fileName: "secondPeterOneToThreePersonalNotes" },
  { book: "1 John", chapters: Array.from({ length: 5 }, (_, index) => index + 1), exportName: "FIRST_JOHN_1_5_PERSONAL_SECTIONS", fileName: "firstJohnOneToFivePersonalNotes" },
  { book: "2 John", chapters: [1], exportName: "SECOND_JOHN_1_PERSONAL_SECTIONS", fileName: "secondJohnOnePersonalNotes" },
  { book: "3 John", chapters: [1], exportName: "THIRD_JOHN_1_PERSONAL_SECTIONS", fileName: "thirdJohnOnePersonalNotes" },
  { book: "Jude", chapters: [1], exportName: "JUDE_1_PERSONAL_SECTIONS", fileName: "judeOnePersonalNotes" },
  { book: "Revelation", chapters: Array.from({ length: 7 }, (_, index) => index + 1), exportName: "REVELATION_1_7_PERSONAL_SECTIONS", fileName: "revelationOneToSevenPersonalNotes" },
  { book: "Revelation", chapters: Array.from({ length: 15 }, (_, index) => index + 8), exportName: "REVELATION_8_22_PERSONAL_SECTIONS", fileName: "revelationEightToTwentyTwoPersonalNotes" },
];

const sectionIcons = ["👑", "📜", "🕊️", "🛡️", "🌿", "💛", "✉️", "⛪", "⚖️", "🔥", "🕯️", "🐑", "📣", "👁️", "🎺", "🤲"];
const stopWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
const badStart = /^(and|but|for|of|to|unto|with|from|in|on|by|that|which|when|because|therefore|then|also|yea|now|there|wherefore)\b/i;
const badEnd = new Set(["a", "an", "and", "as", "at", "be", "because", "both", "but", "by", "can", "could", "did", "do", "does", "for", "from", "hath", "he", "his", "in", "into", "is", "may", "might", "must", "of", "on", "shall", "should", "that", "the", "their", "there", "to", "unto", "very", "was", "when", "which", "will", "with", "would"]);
const weakPhrasePattern = /^(he|she|they|them|we|ye|you|i|it|him|her)\s+(said|say|answered|asked|went|came|come|took|gave|give|sent|found|sat|stood|entered|saw|heard|made|make|did)\b/i;

const anchors = [
  "This is the will of God even your sanctification",
  "The dead in Christ shall rise first",
  "Comfort one another with these words",
  "The day of the Lord so cometh as a thief",
  "Pray without ceasing",
  "Stand fast and hold the traditions",
  "If any would not work neither should he eat",
  "Christ Jesus came into the world to save sinners",
  "One mediator between God and men",
  "Great is the mystery of godliness",
  "Godliness with contentment is great gain",
  "Fight the good fight of faith",
  "Stir up the gift of God",
  "Rightly dividing the word of truth",
  "All scripture is given by inspiration of God",
  "I have fought a good fight",
  "Looking for that blessed hope",
  "Not by works of righteousness which we have done",
  "The express image of his person",
  "So great salvation",
  "Apostle and High Priest of our profession",
  "Let us therefore come boldly unto the throne of grace",
  "A priest for ever after the order of Melchisedec",
  "Mediator of a better covenant",
  "By his own blood he entered in once",
  "Without shedding of blood is no remission",
  "Faith is the substance of things hoped for",
  "Looking unto Jesus the author and finisher of our faith",
  "Jesus Christ the same yesterday and to day and for ever",
  "Let patience have her perfect work",
  "Be ye doers of the word",
  "Faith without works is dead",
  "Resist the devil and he will flee from you",
  "The trying of your faith worketh patience",
  "Begotten us again unto a lively hope",
  "Ye are a chosen generation",
  "By whose stripes ye were healed",
  "Casting all your care upon him",
  "Make your calling and election sure",
  "Holy men of God spake as they were moved by the Holy Ghost",
  "The day of the Lord will come as a thief",
  "God is light and in him is no darkness at all",
  "If we confess our sins",
  "God is love",
  "Perfect love casteth out fear",
  "This is the victory that overcometh the world",
  "Walking in truth",
  "Contend for the faith",
  "Alpha and Omega",
  "I was in the Spirit on the Lord's day",
  "He that hath an ear let him hear",
  "Behold I stand at the door and knock",
  "A throne was set in heaven",
  "The Lamb that was slain",
  "Sealed the servants of our God",
  "They washed their robes",
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
  if (weakPhrasePattern.test(phrase) && !/lord|god|jesus|christ|spirit|blood|faith|grace|truth|word|love|hope|lamb|throne|covenant|priest/i.test(phrase)) return "";
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

function category(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  if (/jesus|christ|lord|son|lamb|alpha|omega|first and the last|high priest|mediator|apostle and high priest|image/.test(lower)) return "christ";
  if (/blood|sacrifice|covenant|offering|priest|melchisedec|remission|sanctified|once for all|washed their robes/.test(lower)) return "priestSacrifice";
  if (/faith|grace|hope|salvation|promise|inheritance|mercy|assurance|confidence|boldly/.test(lower)) return "faithHope";
  if (/word|truth|scripture|doctrine|sound words|inspiration|commandment|prophecy|testimony/.test(lower)) return "wordTruth";
  if (/love|charity|brother|brethren|comfort|peace|forgive|hospitality|kindness/.test(lower)) return "loveCommunity";
  if (/works|godliness|good works|holiness|sanctification|pure|contentment|temperate|sober|blameless/.test(lower)) return "godliness";
  if (/suffer|trial|temptation|patience|endure|persecution|affliction|fiery trial|resist/.test(lower)) return "endurance";
  if (/elder|bishop|deacon|widow|servant|teacher|pastor|shepherd|preach|minister/.test(lower)) return "leadership";
  if (/spirit|holy ghost|anointing|born of god|in the spirit/.test(lower)) return "spiritLife";
  if (/last days|day of the lord|coming|appearing|revelation|throne|seal|angel|beast|churches|ear|overcometh|tribulation/.test(lower)) return "lastThings";
  if (/philemon|onesimus|timothy|titus|jude|peter|john|hebrews|thessalonians|saints|elect/.test(lower)) return "letterSetting";
  if (book === "Revelation") return "lastThings";
  return "detail";
}

function phraseIcon(book: BookName, phrase: string) {
  return {
    christ: "👑",
    priestSacrifice: "🐑",
    faithHope: "🤲",
    wordTruth: "📜",
    loveCommunity: "💛",
    godliness: "🌿",
    endurance: "🛡️",
    leadership: "⛪",
    spiritLife: "🕊️",
    lastThings: "🔥",
    letterSetting: "✉️",
    detail: "🔎",
  }[category(book, phrase)];
}

function bullets(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  if (/jesus|christ|lord|son|lamb|alpha|omega|high priest|mediator/.test(lower)) return ["👑 Christ revealed", "📜 Promise fulfilled", "🤲 Faith anchored", "🙏 Worship directed"];
  if (/blood|sacrifice|covenant|offering|priest|melchisedec|remission|washed/.test(lower)) return ["🐑 Sacrifice explained", "🩸 Blood named", "📜 Covenant meaning", "🤲 Access opened"];
  if (/faith|grace|hope|salvation|promise|inheritance|mercy|confidence|boldly/.test(lower)) return ["🤲 Faith strengthened", "🌅 Hope held", "📣 Grace received", "🧭 Assurance clarified"];
  if (/word|truth|scripture|doctrine|inspiration|commandment|prophecy|testimony/.test(lower)) return ["📜 Truth guarded", "👂 Hearing tested", "🧭 Doctrine clarified", "👣 Obedience shaped"];
  if (/love|charity|brother|brethren|comfort|peace|hospitality/.test(lower)) return ["💛 Love practiced", "👥 Community shaped", "🤲 Mercy shown", "🌿 Faith visible"];
  if (/works|godliness|holiness|sanctification|pure|contentment|sober|blameless/.test(lower)) return ["🌿 Godliness formed", "👣 Life response", "🕯️ Holiness named", "🧭 Conduct clarified"];
  if (/suffer|trial|temptation|patience|endure|persecution|affliction|resist/.test(lower)) return ["🛡️ Endurance needed", "🔥 Pressure named", "🤲 Faith tested", "🌅 Hope ahead"];
  if (/elder|bishop|deacon|widow|servant|teacher|pastor|shepherd|minister/.test(lower)) return ["⛪ Church order", "👥 People cared for", "📜 Responsibility named", "🌿 Faithful service"];
  if (/spirit|holy ghost|anointing|born of god|in the spirit/.test(lower)) return ["🕊️ Spirit life", "👑 God at work", "🧭 Discernment given", "🌿 New life shown"];
  if (/last days|day of the lord|coming|appearing|revelation|throne|seal|angel|churches|overcometh|tribulation/.test(lower)) return ["🔥 Final things", "👑 Christ reigning", "👂 Church warned", "🌅 Hope held"];
  if (/philemon|onesimus|timothy|titus|jude|peter|john|hebrews|thessalonians|saints|elect/.test(lower)) return ["✉️ Letter setting", "👥 People named", "🧭 Context clarified", "📣 Teaching applied"];
  if (book === "Revelation") return ["👁️ Vision detail", "👑 Heaven centered", "🔥 Judgment or hope", "👂 Reader warned"];
  return ["🔎 Detail noticed", "📖 Passage followed", "🧭 Reader clarity", "🌿 Faith connection"];
}

function explain(book: BookName, phrase: string) {
  const kind = category(book, phrase);
  const lower = phrase.toLowerCase();
  const detailLines: [string, string, string] = (() => {
    if (/therefore|wherefore|now|but|for/.test(lower)) {
      return [
        `${phrase} marks a turn in the writer's thought.`,
        "Words like this often connect doctrine to response, warning to encouragement, or promise to endurance.",
        "The wording helps the reader follow the flow instead of reading isolated lines.",
      ];
    }
    if (/church|saints|brethren|elect|servant|apostle|elder/.test(lower)) {
      return [
        `${phrase} identifies the people or setting being addressed.`,
        "These letters and visions speak to real believers who need truth, correction, hope, endurance, and assurance.",
        "The wording keeps the passage connected to the people receiving it.",
      ];
    }
    if (book === "Revelation") {
      return [
        `${phrase} gives one detail inside Revelation's vision language.`,
        "Revelation uses symbols, worship scenes, warnings, seals, angels, thrones, and the Lamb to reveal Christ's victory and call the church to endure.",
        "The wording helps the reader slow down inside the vision instead of rushing past it.",
      ];
    }
    return [
      `${phrase} gives the reader a specific part of the passage to slow down and understand.`,
      "The wording may carry doctrine, warning, encouragement, assurance, church instruction, or a practical command.",
      "The explanation stays close to the phrase so the reader can understand the text in front of them.",
    ];
  })();
  const lines: Record<ReturnType<typeof category>, [string, string, string]> = {
    christ: [
      `${phrase} points the reader to Christ's person, authority, ministry, or victory.`,
      "These books keep placing Jesus at the center: Son, Lord, High Priest, Lamb, Mediator, Shepherd, Judge, and returning King.",
      "The phrase helps the reader see why Christian faith rests on who Christ is.",
    ],
    priestSacrifice: [
      `${phrase} explains sacrifice, priesthood, blood, covenant, cleansing, or access to God.`,
      "Hebrews especially slows down over these ideas so readers see why Jesus' once-for-all work is greater than repeated offerings and earthly priesthood.",
      "The phrase helps the reader understand how Christ opens the way to God.",
    ],
    faithHope: [
      `${phrase} strengthens the reader's understanding of faith, hope, grace, salvation, or assurance.`,
      "These letters call believers to hold fast because God's promise is stronger than pressure, confusion, failure, or fear.",
      "The phrase helps the reader know what faith is holding onto.",
    ],
    wordTruth: [
      `${phrase} teaches how God's word, truth, doctrine, or testimony should be received and guarded.`,
      "The writers warn that truth can be neglected, twisted, or abandoned, so believers need clear teaching and faithful obedience.",
      "The phrase helps the reader see why truth matters for daily faith.",
    ],
    loveCommunity: [
      `${phrase} shows how love, fellowship, comfort, or care should shape believers.`,
      "Love is not treated as a soft slogan. It is shown in hospitality, forgiveness, truthfulness, brotherly care, and faithful encouragement.",
      "The phrase helps the reader see what faith looks like toward people.",
    ],
    godliness: [
      `${phrase} moves faith into visible godliness, holiness, contentment, or good works.`,
      "These letters keep joining doctrine to life. What believers confess should reshape desires, habits, speech, money, leadership, and endurance.",
      "The phrase helps the reader connect belief with conduct.",
    ],
    endurance: [
      `${phrase} teaches endurance under pressure, suffering, temptation, or delay.`,
      "The writers do not pretend hardship is strange. They teach believers to resist evil, remain patient, and hold hope because Christ will finish what He promised.",
      "The phrase helps the reader understand faithfulness when life is hard.",
    ],
    leadership: [
      `${phrase} explains care, order, teaching, or responsibility inside the church.`,
      "The pastoral letters show that healthy doctrine should create healthy leadership, protection for vulnerable people, and visible faithfulness in the household of God.",
      "The phrase helps the reader understand why church order matters.",
    ],
    spiritLife: [
      `${phrase} names God's life and discernment at work in believers.`,
      "The Spirit, new birth, anointing, and life from God are not vague ideas; they shape truth, assurance, obedience, and spiritual discernment.",
      "The phrase helps the reader see Christian life as God's work in His people.",
    ],
    lastThings: [
      `${phrase} points to Christ's return, final judgment, heavenly worship, or the church's endurance.`,
      "These passages do not give future hope to satisfy curiosity. They call believers to worship, repent, endure, and trust the Lamb who reigns.",
      "The phrase helps the reader hold warning and hope together.",
    ],
    letterSetting: [
      `${phrase} identifies the people, church, or servant connected to the passage.`,
      "Knowing who is involved keeps the reader from treating the text as detached sayings. The letter is speaking to real believers in real situations.",
      "The phrase helps the reader understand the setting before applying the teaching.",
    ],
    detail: detailLines,
  };
  const [first, second, closing] = lines[kind];
  return note([first, second, bullets(book, phrase).join("\n"), closing]);
}

function scorePhrase(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  let score = wordCount(phrase);
  if (anchors.some((anchor) => lower.includes(anchor.toLowerCase()))) score += 42;
  if (/lord|god|jesus|christ|spirit|faith|grace|truth|word|love|hope|blood|covenant|priest|sacrifice|lamb|throne|angel|seal|church|overcometh|godliness|works|salvation|glory/.test(lower)) score += 17;
  if (category(book, phrase) !== "detail") score += 11;
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
  const singleChapterSpans: Partial<Record<BookName, string>> = {
    Philemon: "Philemon 1:1-25",
    "2 John": "2 John 1:1-13",
    "3 John": "3 John 1:1-14",
    Jude: "Jude 1:1-25",
  };
  const reference = chapter === 1 && singleChapterSpans[book] ? singleChapterSpans[book] : `${book} ${chapter}`;
  const url = `https://bible-api.com/${encodeURIComponent(reference)}?translation=kjv`;
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

function chunkSizeFor(book: BookName) {
  return book === "Philemon" || book === "2 John" || book === "3 John" || book === "Jude" || book === "Revelation" ? 1 : 2;
}

async function buildBook(book: BookName, chapters: number[]) {
  const sections: Section[] = [];
  for (const chapter of chapters) {
    const apiChapter = await getChapter(book, chapter);
    chunkVerses(apiChapter.verses, chunkSizeFor(book)).forEach((chunk, index) => {
      const section = makeSection(book, chapter, chunk, index);
      if (section) sections.push(section);
    });
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
  return sections;
}

function typeName(book: BookName) {
  return `${book.replace(/\s+/g, "").replace(/^\d/, (digit) => digit === "1" ? "First" : digit === "2" ? "Second" : "Third")}PhraseSectionInput`;
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
