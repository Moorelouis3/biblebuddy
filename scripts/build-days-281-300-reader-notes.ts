import { writeFileSync } from "fs";

type BookName =
  | "Matthew"
  | "Mark"
  | "Luke";

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
  { book: "Matthew", chapters: Array.from({ length: 23 }, (_, index) => index + 6), exportName: "MATTHEW_6_28_PERSONAL_SECTIONS", fileName: "matthewSixToTwentyEightPersonalNotes" },
  { book: "Mark", chapters: Array.from({ length: 16 }, (_, index) => index + 1), exportName: "MARK_1_16_PERSONAL_SECTIONS", fileName: "markOneToSixteenPersonalNotes" },
  { book: "Luke", chapters: Array.from({ length: 21 }, (_, index) => index + 1), exportName: "LUKE_1_21_PERSONAL_SECTIONS", fileName: "lukeOneToTwentyOnePersonalNotes" },
];

const sectionIcons = ["⚖️", "🕯️", "🌩️", "👑", "🧭", "🔥", "📜", "💧", "🛡️", "🌱", "🎺", "🙏", "🌅", "🕊️", "⭐", "🏛️"];
const stopWords = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
const badStart = /^(and|but|for|of|to|unto|with|from|in|on|by|that|which|when|because|therefore|then|also|yea)\b/i;
const badEnd = new Set(["a", "an", "and", "as", "at", "be", "because", "both", "but", "by", "for", "from", "hath", "he", "his", "in", "into", "is", "of", "on", "that", "the", "their", "there", "to", "unto", "very", "was", "when", "which", "with"]);

const anchors = [
  "Our Father which art in heaven",
  "Thy kingdom come",
  "Seek ye first the kingdom of God",
  "Judge not that ye be not judged",
  "Ask and it shall be given you",
  "Enter ye in at the strait gate",
  "Lord if thou wilt",
  "Follow me and let the dead bury their dead",
  "Son of man hath power on earth to forgive sins",
  "The harvest truly is plenteous",
  "Come unto me all ye that labour",
  "I will give you rest",
  "Lord even the devils are subject unto us",
  "A sower went forth to sow",
  "The kingdom of heaven is like",
  "O thou of little faith",
  "Thou art the Christ the Son of the living God",
  "Upon this rock I will build my church",
  "If any man will come after me",
  "Take up his cross",
  "This is my beloved Son",
  "Lord how oft shall my brother sin against me",
  "Forgive from your hearts",
  "The Son of man came not to be ministered unto",
  "Behold thy King cometh unto thee",
  "My house shall be called the house of prayer",
  "Woe unto you scribes and Pharisees hypocrites",
  "Watch therefore",
  "Well done thou good and faithful servant",
  "This is my body",
  "This is my blood of the new testament",
  "My God my God why hast thou forsaken me",
  "He is risen",
  "Go ye therefore and teach all nations",
  "The beginning of the gospel of Jesus Christ",
  "The time is fulfilled",
  "Repent ye for the kingdom of heaven is at hand",
  "I will make you to become fishers of men",
  "Peace be still",
  "Daughter thy faith hath made thee whole",
  "Talitha cumi",
  "Ephphatha that is Be opened",
  "Whom say ye that I am",
  "The Son of man must suffer many things",
  "Hosanna Blessed is he that cometh",
  "Not what I will but what thou wilt",
  "Truly this man was the Son of God",
  "Fear not Zacharias",
  "Blessed art thou among women",
  "My soul doth magnify the Lord",
  "Glory to God in the highest",
  "Wist ye not that I must be about my Father's business",
  "The Spirit of the Lord is upon me",
  "Launch out into the deep",
  "Blessed are ye poor",
  "Her sins which are many are forgiven",
  "Who is this that forgiveth sins also",
  "Thou art the Christ of God",
  "The Son of man is come to seek and to save",
  "Thou shalt love the Lord thy God",
  "Who is my neighbour",
  "Mary hath chosen that good part",
  "Lord teach us to pray",
  "Take heed and beware of covetousness",
  "Except ye repent ye shall all likewise perish",
  "This my son was dead and is alive again",
  "The publican standing afar off",
  "Blessed is the King that cometh in the name of the Lord",
  "The Son of man is come to seek and to save that which was lost",
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
  if (/son of god|jesus|christ|beloved son|saviour|emmanuel/.test(lower)) return "identity";
  if (/was the son of|begat|book of the generation|generation of jesus christ/.test(lower)) return "lineage";
  if (/cross|betray|blood|crucified|sepulchre|risen|resurrection|passover|cup|body/.test(lower)) return "cross";
  if (/parable|sower|seed|vineyard|talent|penny|sheep|goat|virgin|mustard|leaven|net|lost|prodigal/.test(lower)) return "parable";
  if (/healed|cleansed|blind|deaf|devil|unclean spirit|dead|raised|storm|wind|sea|loaves|fish|daughter|talitha|ephphatha/.test(lower)) return "miracle";
  if (/pharisee|scribe|hypocrite|woe|tradition|temple|sabbath|money changers|chief priests|elders/.test(lower)) return "conflict";
  if (/father|pray|forgive|mercy|faith|ask|seek|knock|rest|comfort|peace|love|daily bread|trespasses/.test(lower)) return "prayerMercy";
  if (/blessed|poor|meek|righteousness|heart|treasure|mammon|judge|fruit|commandment|neighbor|neighbour|alms|fast/.test(lower)) return "teaching";
  if (/kingdom|repent|gospel|preach|disciples|follow|deny himself|watch|strait gate/.test(lower)) return "kingdom";
  if (/fulfilled|prophet|written|scripture|moses|elias|abraham|david|jerusalem|bethlehem/.test(lower)) return "fulfillment";
  if (/son of man|son of david/.test(lower)) return "identity";
  return "detail";
}

function phraseIcon(book: BookName, phrase: string) {
  const kind = category(book, phrase);
  return {
    identity: "👑",
    lineage: "🧬",
    kingdom: "📣",
    prayerMercy: "🙏",
    parable: "🌾",
    miracle: "✨",
    conflict: "⚠️",
    cross: "✝️",
    fulfillment: "📜",
    teaching: "🌱",
    detail: "🔎",
  }[kind];
}

function bullets(book: BookName, phrase: string) {
  const lower = phrase.toLowerCase();
  if (/jesus|christ|son of god|son of man|beloved son|king/.test(lower)) return ["👑 Jesus identified", "📜 Promise connected", "🧭 Reader oriented", "🙏 Trust invited"];
  if (/was the son of|begat|generation/.test(lower)) return ["🧬 Family line traced", "📜 Covenant history", "👑 Promise carried", "🌿 Story connected"];
  if (/kingdom|repent|follow|cross|watch|pray/.test(lower)) return ["📣 Kingdom announced", "👣 Disciples called", "🧭 Response clarified", "🌿 Life redirected"];
  if (/parable|sower|seed|vineyard|talent|lost|sheep/.test(lower)) return ["🌾 Picture language", "👂 Hearers tested", "🧭 Meaning opened", "🌱 Heart revealed"];
  if (/healed|cleansed|blind|devil|unclean|dead|storm|bread|loaves/.test(lower)) return ["✨ Power shown", "💧 Mercy given", "👑 Authority revealed", "🙏 Faith awakened"];
  if (/pharisee|scribe|hypocrite|woe|temple|sabbath/.test(lower)) return ["⚠️ False religion exposed", "🏛️ Temple tension", "💬 Words weighed", "🧭 Heart confronted"];
  if (/cross|betray|blood|crucified|risen|sepulchre|passover/.test(lower)) return ["✝️ Suffering named", "🩸 Covenant cost", "🌅 Resurrection hope", "📣 Good news carried"];
  if (/father|pray|forgive|faith|ask|seek|rest|peace|love/.test(lower)) return ["🙏 Prayer taught", "🌿 Mercy received", "💧 Heart softened", "👣 Trust practiced"];
  if (/fulfilled|prophet|written|scripture|jerusalem|bethlehem/.test(lower)) return ["📜 Scripture fulfilled", "🧭 Story connected", "👑 Messiah revealed", "🌿 Promise kept"];
  if (/blessed|poor|meek|righteousness|heart|treasure|mammon|judge|neighbor|neighbour/.test(lower)) return ["🌱 Kingdom character", "💧 Heart examined", "🧭 Daily obedience", "🕯️ Witness made visible"];
  return ["🔎 Exact wording", "📖 Local meaning", "🧭 Reader oriented", "🌿 Faith made practical"];
}

function explain(book: BookName, phrase: string) {
  const kind = category(book, phrase);
  const lines: Record<string, [string, string, string]> = {
    identity: [
      `${phrase} identifies who Jesus is in the Gospel story.`,
      "The Gospels keep showing Jesus through His words, authority, compassion, holiness, and mission so the reader knows they are not watching an ordinary teacher.",
      "The phrase helps a beginner see what the passage is revealing about Jesus.",
    ],
    lineage: [
      `${phrase} keeps Jesus' family line tied to real people and real history.`,
      "The Gospel genealogies show that Jesus enters the same human story God had been guiding through promise, weakness, exile, and covenant mercy.",
      "The phrase helps the reader see that Jesus comes into history, not around it.",
    ],
    kingdom: [
      `${phrase} shows the response Jesus' kingdom calls for.`,
      "Jesus does not only announce good news from a distance. He calls people to repent, follow, watch, pray, and trust Him with their whole life.",
      "The phrase helps the reader hear discipleship as a real response to Jesus.",
    ],
    prayerMercy: [
      `${phrase} teaches how needy people come to God for mercy, forgiveness, faith, or help.`,
      "The Gospels show prayer and mercy as deeply practical. People ask, receive, forgive, trust, and learn to depend on the Father.",
      "The phrase helps the reader see faith working in ordinary fear, need, sin, and weakness.",
    ],
    parable: [
      `${phrase} opens one of Jesus' picture-teachings.`,
      "A parable makes the listener slow down. It reveals the kingdom while also exposing whether the hearer really wants to receive Jesus' word.",
      "The phrase helps the reader look for the spiritual point inside the picture.",
    ],
    miracle: [
      `${phrase} shows Jesus' authority entering real human need.`,
      "The miracles are not side entertainment. They reveal mercy, power, and the arrival of God's kingdom in bodies, homes, storms, graves, and oppressed lives.",
      "The phrase helps the reader understand what the miracle is showing about Jesus.",
    ],
    conflict: [
      `${phrase} marks a confrontation between Jesus and false or hardened religion.`,
      "The conflict is not petty argument. Jesus exposes hypocrisy, wrong priorities, and religious language that refuses God's heart.",
      "The phrase helps the reader see why Jesus' words become sharper in these chapters.",
    ],
    cross: [
      `${phrase} carries the story toward Jesus' suffering, death, and resurrection.`,
      "The cross is not an accident in the Gospel story. Jesus gives Himself, fulfills Scripture, bears shame, and rises as Lord.",
      "The phrase helps the reader keep the cost and victory of the Gospel in view.",
    ],
    fulfillment: [
      `${phrase} connects the Gospel moment to Scripture and promise.`,
      "The Gospel writers keep showing that Jesus' life is tied to what God had already spoken through the Law, the Prophets, and Israel's story.",
      "The phrase helps the reader see continuity instead of treating the New Testament as disconnected.",
    ],
    teaching: [
      `${phrase} teaches the kind of heart and life Jesus forms in His people.`,
      "Jesus presses beneath appearances into desire, treasure, mercy, obedience, humility, and love of God and neighbor.",
      "The phrase helps the reader see that kingdom life reaches the whole person.",
    ],
    detail: [
      `${phrase} gives the reader one exact Gospel detail to understand before moving on.`,
      "Small details in these chapters often show setting, movement, audience, or response so the reader can follow the scene clearly.",
      "The phrase helps a beginner stay close to the actual text instead of jumping too quickly to a broad idea.",
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
  if (category(book, phrase) !== "detail") score += 8;
  if (/^(said|came|went|made|took|called)\b/i.test(phrase)) score -= 4;
  if (/\b(and|or|but)\b/i.test(phrase)) score -= 1;
  return score;
}

function chunkVerses(verses: ApiVerse[]) {
  const chunks: ApiVerse[][] = [];
  for (let index = 0; index < verses.length; index += 3) chunks.push(verses.slice(index, index + 3));
  if (chunks.length > 1 && chunks.at(-1)!.length < 3) {
    const last = chunks.pop()!;
    const prev = chunks.pop()!;
    const keep = Math.max(2, prev.length - last.length);
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
