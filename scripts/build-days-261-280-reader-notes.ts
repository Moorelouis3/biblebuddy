import { writeFileSync } from "fs";

type BookName =
  | "Hosea"
  | "Joel"
  | "Amos"
  | "Obadiah"
  | "Jonah"
  | "Micah"
  | "Nahum"
  | "Habakkuk"
  | "Zephaniah"
  | "Haggai"
  | "Zechariah"
  | "Malachi"
  | "Matthew";

type ApiVerse = {
  chapter: number;
  verse: number;
  text: string;
};

type ApiChapter = {
  verses: ApiVerse[];
};

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

const books: Array<{ book: BookName; chapters: number[]; exportName: string; fileName: string }> = [
  { book: "Hosea", chapters: [13, 14], exportName: "HOSEA_13_14_PERSONAL_SECTIONS", fileName: "hoseaThirteenToFourteenPersonalNotes" },
  { book: "Joel", chapters: [1, 2, 3], exportName: "JOEL_1_3_PERSONAL_SECTIONS", fileName: "joelOneToThreePersonalNotes" },
  { book: "Amos", chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9], exportName: "AMOS_1_9_PERSONAL_SECTIONS", fileName: "amosOneToNinePersonalNotes" },
  { book: "Obadiah", chapters: [1], exportName: "OBADIAH_1_PERSONAL_SECTIONS", fileName: "obadiahOnePersonalNotes" },
  { book: "Jonah", chapters: [1, 2, 3, 4], exportName: "JONAH_1_4_PERSONAL_SECTIONS", fileName: "jonahOneToFourPersonalNotes" },
  { book: "Micah", chapters: [1, 2, 3, 4, 5, 6, 7], exportName: "MICAH_1_7_PERSONAL_SECTIONS", fileName: "micahOneToSevenPersonalNotes" },
  { book: "Nahum", chapters: [1, 2, 3], exportName: "NAHUM_1_3_PERSONAL_SECTIONS", fileName: "nahumOneToThreePersonalNotes" },
  { book: "Habakkuk", chapters: [1, 2, 3], exportName: "HABAKKUK_1_3_PERSONAL_SECTIONS", fileName: "habakkukOneToThreePersonalNotes" },
  { book: "Zephaniah", chapters: [1, 2, 3], exportName: "ZEPHANIAH_1_3_PERSONAL_SECTIONS", fileName: "zephaniahOneToThreePersonalNotes" },
  { book: "Haggai", chapters: [1, 2], exportName: "HAGGAI_1_2_PERSONAL_SECTIONS", fileName: "haggaiOneToTwoPersonalNotes" },
  { book: "Zechariah", chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], exportName: "ZECHARIAH_1_14_PERSONAL_SECTIONS", fileName: "zechariahOneToFourteenPersonalNotes" },
  { book: "Malachi", chapters: [1, 2, 3, 4], exportName: "MALACHI_1_4_PERSONAL_SECTIONS", fileName: "malachiOneToFourPersonalNotes" },
  { book: "Matthew", chapters: [1, 2, 3, 4, 5], exportName: "MATTHEW_1_5_PERSONAL_SECTIONS", fileName: "matthewOneToFivePersonalNotes" },
];

const sectionIcons = ["⚖️", "🕯️", "🌩️", "👑", "🧭", "🔥", "📜", "💧", "🛡️", "🌱", "🎺", "🙏", "🌅", "🕊️", "⭐", "🏛️"];
const stopWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
const badStart = /^(and|but|for|of|to|unto|with|from|in|on|by|that|which|when|because|therefore|then|also|yea)\b/i;
const badEnd = new Set(["a", "an", "and", "as", "at", "be", "because", "both", "but", "by", "for", "from", "hath", "he", "his", "in", "into", "is", "of", "on", "that", "the", "their", "there", "to", "unto", "very", "was", "when", "which", "with"]);

const anchors = [
  "In me is thine help",
  "O Israel thou hast destroyed thyself",
  "O Israel return unto the LORD thy God",
  "I will heal their backsliding",
  "I will be as the dew unto Israel",
  "The day of the LORD is at hand",
  "Turn ye even to me with all your heart",
  "Rend your heart and not your garments",
  "I will pour out my spirit upon all flesh",
  "Let judgment run down as waters",
  "Can two walk together except they be agreed",
  "Prepare to meet thy God",
  "Seek ye me and ye shall live",
  "Woe to them that are at ease in Zion",
  "The pride of thine heart hath deceived thee",
  "The day of the LORD is near",
  "The kingdom shall be the LORD's",
  "Arise go to Nineveh",
  "Jonah rose up to flee",
  "Salvation is of the LORD",
  "Should not I spare Nineveh",
  "What doth the LORD require of thee",
  "Do justly",
  "Love mercy",
  "Walk humbly with thy God",
  "Bethlehem Ephratah",
  "He will turn again he will have compassion",
  "The LORD is slow to anger",
  "The LORD is good a strong hold",
  "Woe to the bloody city",
  "The just shall live by his faith",
  "Write the vision",
  "Though the fig tree shall not blossom",
  "Yet I will rejoice in the LORD",
  "The great day of the LORD is near",
  "Seek ye the LORD",
  "The LORD thy God in the midst of thee is mighty",
  "Consider your ways",
  "This house lie waste",
  "The glory of this latter house shall be greater",
  "Turn ye unto me",
  "Not by might nor by power but by my spirit",
  "Behold thy King cometh unto thee",
  "They shall look upon me whom they have pierced",
  "I have loved you saith the LORD",
  "Ye have robbed God",
  "The Sun of righteousness arise",
  "Behold I will send you Elijah",
  "Son of David",
  "Son of Abraham",
  "She shall bring forth a son",
  "Thou shalt call his name JESUS",
  "This is my beloved Son",
  "Repent ye for the kingdom of heaven is at hand",
  "Blessed are the poor in spirit",
  "Ye are the salt of the earth",
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
  return phrase;
}

function verseCandidateSets(text: string) {
  const normalized = normalize(text).replace(/\([^)]+\)/g, "");
  const clauses = normalized
    .split(/[,;:.!?]/)
    .map(trimPhrase)
    .filter(Boolean);
  const words = normalized.replace(/[^A-Za-z0-9'\s-]/g, " ").split(/\s+/).filter(Boolean);
  const windows: string[] = [];
  for (const size of [5, 6, 7, 8]) {
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
  if (book === "Matthew") {
    if (/jesus|christ|son of david|son of abraham|beloved son|king|emmanuel/.test(lower)) return "gospelIdentity";
    if (/begat|generation|carried away to babylon|of whom was born/.test(lower)) return "gospelLineage";
    if (/kingdom|repent|baptized|tempted|follow me/.test(lower)) return "gospelKingdom";
    if (/blessed|salt|light|law|righteousness|poor in spirit|merciful|pure in heart/.test(lower)) return "gospelTeaching";
    return "gospelDetail";
  }
  if (/return|heal|mercy|compassion|dew|restore|save|rejoice|strong hold|good/.test(lower)) return "mercy";
  if (/day of the lord|judgment|woe|fire|wrath|punish|destroy|bloody|desolate/.test(lower)) return "judgment";
  if (/pride|robbed|transgress|iniquity|whoredom|idols|flee|violence|deceiv/.test(lower)) return "sin";
  if (/king|kingdom|david|bethlehem|branch|spirit|pierced|elijah|messenger|covenant|house of jacob|house of joseph|possess|captivity|remnant/.test(lower)) return "promise";
  if (/offering|altar|priest|temple|house|sanctuary|sabbath|tithe/.test(lower)) return "worship";
  if (/vision|word of the lord|saith the lord|write|prophet|saw/.test(lower)) return "propheticWord";
  return "detail";
}

function phraseIcon(book: BookName, phrase: string) {
  const kind = category(book, phrase);
  return {
    gospelIdentity: "👑",
    gospelLineage: "🧬",
    gospelKingdom: "📣",
    gospelTeaching: "🌱",
    gospelDetail: "🔎",
    mercy: "🌿",
    judgment: "⚖️",
    sin: "⚠️",
    promise: "⭐",
    worship: "🕯️",
    propheticWord: "📜",
    detail: "🔎",
  }[kind];
}

function bullets(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  if (book === "Matthew") {
    if (/begat|generation|carried away to babylon|of whom was born/.test(lower)) {
      return ["🧬 Family line traced", "📜 Covenant history", "👑 David remembered", "🌿 Promise moving forward"];
    }
    if (/jesus|christ|son of david|son of abraham|emmanuel|beloved son/.test(lower)) {
      return ["👑 Messiah identified", "📜 Promise fulfilled", "🧭 Story connected", "🙏 Savior revealed"];
    }
    if (/blessed|poor in spirit|salt|light|righteousness|merciful|pure in heart/.test(lower)) {
      return ["🌱 Kingdom character", "🕯️ Visible witness", "💧 Heart examined", "🧭 Daily obedience"];
    }
    return ["📖 Gospel detail", "🧭 Reader oriented", "👣 Jesus followed", "🌿 Kingdom seen"];
  }
  if (/day of the lord|judgment|woe|wrath|fire|destroy/.test(lower)) return ["⚖️ Judgment named", "🔥 Evil confronted", "📣 Warning heard", "🧭 Return urged"];
  if (/return|heal|mercy|compassion|dew|save|rejoice/.test(lower)) return ["🌿 Mercy offered", "↩️ Return invited", "💧 Healing promised", "🙏 Hope restored"];
  if (/pride|idols|robbed|flee|iniquity|violence|whoredom/.test(lower)) return ["⚠️ Sin exposed", "🧱 False trust broken", "🧭 Heart corrected", "📖 Text made plain"];
  if (/king|bethlehem|branch|spirit|pierced|elijah|messenger|covenant/.test(lower)) return ["⭐ Promise traced", "👑 King expected", "📜 Prophecy carried", "🕊️ Hope kept alive"];
  if (/offering|altar|priest|temple|house|tithe|sanctuary/.test(lower)) return ["🕯️ Worship examined", "🏛️ House of God", "🙏 Honor required", "📦 Offering understood"];
  return ["🔎 Exact wording", "📖 Local meaning", "🧭 Reader oriented", "🌿 Faith made practical"];
}

function explain(book: BookName, phrase: string) {
  const kind = category(book, phrase);
  const lines: Record<string, [string, string, string]> = {
    gospelIdentity: [
      `${phrase} identifies Jesus inside Israel's promised story.`,
      "Matthew does not introduce Jesus as a random teacher. He presents Him as the promised Son, King, and Savior.",
      "The phrase helps a beginner connect Jesus to the promises that came before Him.",
    ],
    gospelLineage: [
      `${phrase} keeps Jesus' family line tied to Israel's real history.`,
      "Matthew's genealogy is not a random list of names. It traces promise through fathers, kings, exile, and unexpected people until the story reaches Christ.",
      "The phrase helps the reader see that Jesus arrives inside a long covenant story, not outside of it.",
    ],
    gospelKingdom: [
      `${phrase} announces the response Jesus' kingdom requires.`,
      "The Gospel is not only information about heaven. It calls people to turn, trust, follow, and live under God's reign.",
      "The phrase helps the reader hear the kingdom as a present call, not just a future idea.",
    ],
    gospelTeaching: [
      `${phrase} describes the kind of life Jesus forms in His people.`,
      "The Sermon on the Mount reaches beneath outward behavior and speaks to the heart, desires, mercy, truth, and obedience.",
      "The phrase helps the reader see that Jesus teaches whole-life righteousness before God.",
    ],
    gospelDetail: [
      `${phrase} gives the reader an exact detail for following Matthew carefully.`,
      "Small Gospel details often connect people, places, fulfillment, and obedience so the reader can track the story clearly.",
      "The phrase keeps the reader close to Matthew's actual wording instead of drifting into a broad topic.",
    ],
    mercy: [
      `${phrase} shows God's mercy moving toward people who need rescue, return, or healing.`,
      "The prophets do not treat mercy as pretending sin did not happen. Mercy names the wound and still opens a road back to the LORD.",
      "The phrase helps the reader see hope without watering down the seriousness of sin.",
    ],
    judgment: [
      `${phrase} warns that the LORD will not ignore evil forever.`,
      "Prophetic judgment is not random rage. It is God's holy answer to pride, violence, idolatry, injustice, and covenant rebellion.",
      "The phrase helps the reader understand why these books speak with so much urgency.",
    ],
    sin: [
      `${phrase} exposes the false trust or rebellion underneath the surface.`,
      "The prophets keep naming sin plainly because people can keep religious language while their hearts drift far from the LORD.",
      "The phrase helps the reader recognize what God is confronting in the passage.",
    ],
    promise: [
      `${phrase} carries hope forward inside a hard prophetic book.`,
      "Even when judgment is near, the LORD keeps speaking of a King, a remnant, a restored people, and a future shaped by His faithfulness.",
      "The phrase helps the reader trace promise through warnings that might otherwise feel only severe.",
    ],
    worship: [
      `${phrase} brings worship, offerings, or God's house into focus.`,
      "The issue is not religious activity by itself. The LORD is weighing whether His people honor Him with truthful hearts and obedient lives.",
      "The phrase helps the reader see why worship language often sits beside rebuke in the prophets.",
    ],
    propheticWord: [
      `${phrase} tells the reader that the message comes from the LORD, not merely from the prophet's opinion.`,
      "The prophet speaks because God addresses His people. That makes the warning, comfort, and promise weighty.",
      "The phrase helps the reader listen to the passage as God's covenant speech.",
    ],
    detail: [
      `${phrase} gives the reader one exact piece of the passage to understand before moving on.`,
      "The wording may look small, but it helps locate who is speaking, what is being confronted, and how the chapter is moving.",
      "The phrase helps a beginner slow down and follow the text phrase by phrase.",
    ],
  };
  const [first, second, closing] = lines[kind];
  return note([first, second, bullets(book, phrase).join("\n"), closing]);
}

function scorePhrase(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  let score = wordCount(phrase);
  if (anchors.some((anchor) => lower.includes(anchor.toLowerCase()))) score += 30;
  if (/lord|god|jesus|christ|kingdom|covenant|mercy|judgment|return|repent|spirit|righteous|iniquity|prophet|day of the lord/.test(lower)) score += 12;
  if (category(book, phrase) !== "detail" && category(book, phrase) !== "gospelDetail") score += 8;
  if (/^(said|came|went|made|took|called)\b/i.test(phrase)) score -= 4;
  if (/\b(and|or|but)\b/i.test(phrase)) score -= 1;
  return score;
}

function chunkVerses(verses: ApiVerse[]) {
  const chunks: ApiVerse[][] = [];
  for (let index = 0; index < verses.length; index += 5) chunks.push(verses.slice(index, index + 5));
  if (chunks.length > 1 && chunks.at(-1)!.length < 3) {
    const last = chunks.pop()!;
    const prev = chunks.pop()!;
    const keep = Math.max(3, prev.length - last.length);
    chunks.push(prev.slice(0, keep));
    chunks.push([...prev.slice(keep), ...last]);
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
    if (selected.length >= 6) break;
  }
  for (const phrase of windowPool) {
    if (selected.length >= 6) break;
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
  const passage = book === "Obadiah" ? "Obadiah 1:1-21" : `${book} ${chapter}`;
  const url = `https://bible-api.com/${encodeURIComponent(passage)}?translation=kjv`;
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
    chunkVerses(apiChapter.verses).forEach((chunk, index) => {
      const section = makeSection(book, chapter, chunk, index);
      if (section) sections.push(section);
    });
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
  return sections;
}

function typeName(book: BookName) {
  return `${book.replace(/\s+/g, "")}PhraseSectionInput`;
}

async function main() {
  for (const target of books) {
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
