import { writeFileSync } from "fs";

type ApiVerse = {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
};

type ApiChapter = {
  verses: ApiVerse[];
};

type DayPlan = {
  day: number;
  title: string;
  reference: string;
  readings: Array<{ book: string; chapters: number[] }>;
};

const e = (...codes: number[]) => String.fromCodePoint(...codes);

const I = {
  altar: e(0x1f54d),
  ark: e(0x1f4e6),
  battle: e(0x2694, 0xfe0f),
  book: e(0x1f4d6),
  city: e(0x1f3d9, 0xfe0f),
  cloud: e(0x2601, 0xfe0f),
  crown: e(0x1f451),
  dove: e(0x1f54a, 0xfe0f),
  fire: e(0x1f525),
  heart: e(0x1f49b),
  house: e(0x1f3e0),
  key: e(0x1f511),
  lamp: e(0x1fa94),
  lion: e(0x1f981),
  mountain: e(0x26f0, 0xfe0f),
  prayer: e(0x1f64f),
  scroll: e(0x1f4dc),
  shield: e(0x1f6e1, 0xfe0f),
  sorrow: e(0x1f622),
  spark: e(0x2728),
  sword: e(0x1f5e1, 0xfe0f),
  table: e(0x1f37d, 0xfe0f),
  temple: e(0x1f3db, 0xfe0f),
  trumpet: e(0x1f3ba),
  warning: e(0x26a0, 0xfe0f),
  water: e(0x1f4a7),
  wisdom: e(0x1f9e0),
};

const sectionIcons = [I.crown, I.sword, I.scroll, I.house, I.prayer, I.fire, I.city, I.shield, I.temple, I.wisdom, I.warning, I.heart];
const phraseIcons = [I.spark, I.scroll, I.sword, I.shield, I.crown, I.house, I.prayer, I.heart, I.warning, I.city, I.key, I.sorrow, I.fire, I.wisdom, I.ark, I.altar, I.water, I.mountain];

const dayPlans: DayPlan[] = [
  { day: 86, title: "Elijah Confronts Idolatry", reference: "1 Kings 16-19", readings: [{ book: "1 Kings", chapters: [16, 17, 18, 19] }] },
  { day: 87, title: "Ahab's Fall and Elijah's Final Warnings", reference: "1 Kings 20-22; 2 Kings 1", readings: [{ book: "1 Kings", chapters: [20, 21, 22] }, { book: "2 Kings", chapters: [1] }] },
  { day: 88, title: "Elisha's Ministry Begins", reference: "2 Kings 2-5", readings: [{ book: "2 Kings", chapters: [2, 3, 4, 5] }] },
  { day: 89, title: "Rescue, Siege, and Jehu's Judgment", reference: "2 Kings 6-9", readings: [{ book: "2 Kings", chapters: [6, 7, 8, 9] }] },
  { day: 90, title: "Jehu's Reform and Israel's Decline", reference: "2 Kings 10-13", readings: [{ book: "2 Kings", chapters: [10, 11, 12, 13] }] },
  { day: 91, title: "Israel Falls to Assyria", reference: "2 Kings 14-17", readings: [{ book: "2 Kings", chapters: [14, 15, 16, 17] }] },
  { day: 92, title: "Hezekiah's Faith and Manasseh's Evil", reference: "2 Kings 18-21", readings: [{ book: "2 Kings", chapters: [18, 19, 20, 21] }] },
  { day: 93, title: "Josiah's Reform and Judah's Fall", reference: "2 Kings 22-25", readings: [{ book: "2 Kings", chapters: [22, 23, 24, 25] }] },
  { day: 94, title: "The Family Line of God's People", reference: "1 Chronicles 1-4", readings: [{ book: "1 Chronicles", chapters: [1, 2, 3, 4] }] },
  { day: 95, title: "Tribes, Genealogies, and Identity", reference: "1 Chronicles 5-8", readings: [{ book: "1 Chronicles", chapters: [5, 6, 7, 8] }] },
];

function titleCase(phrase: string) {
  const small = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
  return phrase
    .split(" ")
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (word === "LORD") return "LORD";
      if (index > 0 && small.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function normalizeText(text: string) {
  return text.replace(/\s+/g, " ").replace(/[“”]/g, "\"").trim();
}

function cleanPhrase(phrase: string) {
  return titleCase(
    phrase
      .replace(/["'()]/g, "")
      .replace(/[,\s]+$/g, "")
      .replace(/^\s*and\s+/i, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function phraseKey(phrase: string) {
  return phrase.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isNearDuplicatePhrase(key: string, seen: Set<string>) {
  if (!key) return true;
  for (const existing of seen) {
    if (existing === key) return true;
    if (key.length >= 14 && existing.startsWith(key)) return true;
    if (existing.length >= 14 && key.startsWith(existing)) return true;
  }
  return false;
}

function makePhraseCandidates(verse: ApiVerse) {
  const text = normalizeText(verse.text)
    .replace(/^And\s+/i, "And ")
    .replace(/^But\s+/i, "But ");
  const pieces = text
    .split(/[,;:.!?]/)
    .map((piece) => piece.trim())
    .filter((piece) => piece.split(/\s+/).length >= 3)
    .map((piece) => piece.replace(/^And\s+/i, "And ").replace(/\s+$/g, ""));
  const titled = pieces.map(cleanPhrase).filter((phrase) => phrase.split(/\s+/).length >= 3);
  if (titled.length > 0) return titled.slice(0, 2);
  return [cleanPhrase(text.split(/\s+/).slice(0, 10).join(" "))].filter((phrase) => phrase.split(/\s+/).length >= 3);
}

function phraseIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("lord") || t.includes("god")) return I.prayer;
  if (t.includes("king") || t.includes("throne") || t.includes("reign") || t.includes("crown")) return I.crown;
  if (t.includes("sword") || t.includes("battle") || t.includes("smote") || t.includes("war") || t.includes("host")) return I.sword;
  if (t.includes("house") || t.includes("build") || t.includes("dwelt")) return I.house;
  if (t.includes("ark") || t.includes("covenant")) return I.ark;
  if (t.includes("altar") || t.includes("sacrifice") || t.includes("offered")) return I.altar;
  if (t.includes("heart") || t.includes("love")) return I.heart;
  if (t.includes("wisdom") || t.includes("understanding")) return I.wisdom;
  if (t.includes("jerusalem") || t.includes("hebron") || t.includes("shechem") || t.includes("city")) return I.city;
  if (t.includes("cloud") || t.includes("glory") || t.includes("temple")) return I.temple;
  if (t.includes("died") || t.includes("wept") || t.includes("mourn") || t.includes("slain")) return I.sorrow;
  if (t.includes("command") || t.includes("word") || t.includes("said")) return I.scroll;
  let hash = 0;
  for (const char of title) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return phraseIcons[hash % phraseIcons.length];
}

function phraseIconUnique(title: string, used: Set<string>) {
  const preferred = phraseIcon(title);
  if (!used.has(preferred)) {
    used.add(preferred);
    return preferred;
  }
  let hash = 0;
  for (const char of title) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  for (let offset = 1; offset <= phraseIcons.length; offset += 1) {
    const icon = phraseIcons[(hash + offset) % phraseIcons.length];
    if (!used.has(icon)) {
      used.add(icon);
      return icon;
    }
  }
  return preferred;
}

function explain(title: string, book: string, chapter: number) {
  const t = title.toLowerCase();
  let meaning = `${title} slows the reader down to the exact movement of the story.`;
  let support = "It is not just background information. It tells what is changing, who is acting, or what pressure is rising in the passage.";
  let bullets = [`${I.book} Exact wording`, `${I.key} Story movement`, `${phraseIcon(title)} Detail with meaning`];
  let close = "The phrase helps the reader follow the passage by paying attention to what the Bible actually says.";

  if (t.includes("lord") || t.includes("god")) {
    meaning = `${title} puts the LORD at the center of the phrase.`;
    support = "Kings may threaten, prophets may speak, and nations may fight, but God's name shows who has final authority.";
    bullets = [`${I.prayer} God's authority`, `${I.scroll} God's word`, `${I.key} God's purpose`];
    close = "The phrase teaches the reader to look beneath the visible drama and notice what God is doing.";
  } else if (t.includes("king") || t.includes("throne") || t.includes("reign")) {
    meaning = `${title} is kingdom language.`;
    support = "It deals with rule, authority, and the question of whether leadership is being used under God or against Him.";
    bullets = [`${I.crown} Authority`, `${I.house} A royal house`, `${I.warning} Leadership under God`];
    close = "The phrase helps the reader ask whether power is being received faithfully or used selfishly.";
  } else if (t.includes("house")) {
    meaning = `${title} can mean a home, a family line, or a royal household, depending on the sentence.`;
    support = "In Kings, a house often means more than one person. It can describe a whole dynasty carrying blessing, guilt, judgment, or responsibility.";
    bullets = [`${I.house} Family line`, `${I.crown} Royal future`, `${I.scroll} Consequences carried forward`];
    close = "The phrase helps the reader see that leadership problems do not stay private.";
  } else if (t.includes("heart")) {
    meaning = `${title} points to the inner person.`;
    support = "In the Bible, the heart includes desire, loyalty, thought, and choice. The story is showing more than outward behavior.";
    bullets = [`${I.heart} Desire`, `${I.key} Loyalty`, `${I.warning} Direction of life`];
    close = "The phrase reminds the reader that kingdoms are shaped by hidden desires before public actions appear.";
  } else if (t.includes("sword") || t.includes("battle") || t.includes("war") || t.includes("smote")) {
    meaning = `${title} is battle language.`;
    support = "It shows conflict becoming physical, public, and costly. War in Kings is never just action; it reveals fear, pride, judgment, and the need for God's rule.";
    bullets = [`${I.sword} Conflict`, `${I.shield} Danger`, `${I.warning} Real consequences`];
    close = "The phrase helps the reader feel that sin and power struggles spill into real lives.";
  } else if (t.includes("fled") || t.includes("slain") || t.includes("fell") || t.includes("died") || t.includes("death")) {
    meaning = `${title} is grief or defeat language.`;
    support = "It tells the reader that choices and conflict have reached a painful result. The Bible does not rush past sorrow.";
    bullets = [`${I.sorrow} Loss`, `${I.warning} Consequence`, `${I.scroll} Sorrow named honestly`];
    close = "The phrase matters because God's story does not pretend broken leadership has no cost.";
  } else if (t.includes("men of israel") || t.includes("children of israel") || t.includes("judah")) {
    meaning = `${title} focuses on the people, not only the king.`;
    support = "When tribes and people groups are named, the reader should notice how public the consequences have become.";
    bullets = [`${I.city} The people`, `${I.crown} Public leadership`, `${I.warning} Shared consequences`];
    close = "The phrase helps the reader see the kingdom story as both personal and national.";
  } else if (t.includes("ark") || t.includes("covenant")) {
    meaning = `${title} points to God's covenant presence and promise among His people.`;
    support = "Covenant language reminds the reader that Israel's hope is deeper than military strength or royal success.";
    bullets = [`${I.ark} Covenant sign`, `${I.prayer} Holy presence`, `${I.scroll} Promises remembered`];
    close = "The phrase keeps worship and God's presence at the center of the kingdom story.";
  } else if (t.includes("altar") || t.includes("sacrifice") || t.includes("offered")) {
    meaning = `${title} is worship language.`;
    support = "An altar or sacrifice is not decoration. It is where sin, gratitude, judgment, and mercy are brought before the LORD.";
    bullets = [`${I.altar} Worship`, `${I.fire} Sacrifice`, `${I.prayer} Seeking mercy`];
    close = "The phrase helps the reader see that the kingdom still needs worship more than appearance.";
  } else if (t.includes("wisdom") || t.includes("understanding")) {
    meaning = `${title} is about guidance, judgment, and knowing what should be done next.`;
    support = "Wisdom can save a kingdom or expose its weakness, depending on whether people listen humbly and obey faithfully.";
    bullets = [`${I.wisdom} Discernment`, `${I.scroll} Words that guide`, `${I.crown} Leadership decisions`];
    close = "The phrase teaches the reader that advice is never neutral when a kingdom is under pressure.";
  } else if (t.includes("jerusalem") || t.includes("hebron") || t.includes("shechem") || t.includes("gihon") || t.includes("zion")) {
    meaning = `${title} names a real place where the story turns.`;
    support = "Bible places often carry memory, danger, worship, or kingdom meaning. The location helps the reader follow where the conflict or promise is moving.";
    bullets = [`${I.city} A real location`, `${I.key} A story marker`, `${I.scroll} Memory attached to place`];
    close = "The phrase keeps the Bible from feeling vague; these events happen in real places to real people.";
  } else if (t.includes("said") || t.includes("spake") || t.includes("answered") || t.includes("called")) {
    meaning = `${title} marks spoken words entering the scene.`;
    support = "In these chapters, speech often reveals loyalty, fear, wisdom, rebellion, or trust. A sentence can expose the direction of a heart.";
    bullets = [`${I.scroll} Words spoken`, `${I.heart} Motives revealed`, `${I.key} The scene turns`];
    close = "The phrase teaches the reader to listen closely to what people say when pressure rises.";
  } else if (t.includes("came to pass") || t.includes("after a while") || t.includes("after many days") || t.includes("seventh time")) {
    meaning = `${title} is timing language.`;
    support = "It helps the reader know when the story has shifted to a new moment. These time markers keep cause, consequence, and response clear.";
    bullets = [`${I.key} A new moment`, `${I.scroll} Story movement`, `${I.warning} Consequences unfolding`];
    close = "The phrase reminds the reader that the Bible often teaches through sequence, not only through speeches.";
  } else if (t.includes("david") || t.includes("saul") || t.includes("solomon") || t.includes("absalom") || t.includes("rehoboam") || t.includes("jeroboam")) {
    meaning = `${title} keeps attention on a person whose choices affect more than himself.`;
    support = "In the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.";
    bullets = [`${I.crown} Leadership`, `${I.heart} Character revealed`, `${I.warning} Choices spread outward`];
    close = "The phrase helps the reader watch how one person's actions can bless or wound many others.";
  }

  return [meaning, support, "", ...bullets, "", close].join("\n\n");
}

function sectionHeading(book: string, chapter: number, start: number, end: number, phrases: string[]) {
  const core = phrases[0]
    ?.replace(/^(And|But)\s+/i, "")
    .replace(/\bthat were\b/i, "were")
    .replace(/\bthat was\b/i, "was")
    .replace(/\bthat had\b/i, "had") || `${book} ${chapter}:${start}-${end}`;
  const weakEndings = new Set(["and", "as", "at", "but", "by", "for", "from", "in", "of", "on", "that", "the", "to", "unto", "when", "with"]);
  const words = core.split(" ").slice(0, 9);
  while (words.length > 3 && weakEndings.has(words[words.length - 1].toLowerCase())) words.pop();
  return titleCase(words.join(" "));
}

async function getChapter(book: string, chapter: number) {
  const url = `https://bible-api.com/${encodeURIComponent(`${book} ${chapter}`)}?translation=kjv`;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (response.ok) return (await response.json()) as ApiChapter;
      if (response.status !== 429 || attempt === 5) throw new Error(`Could not fetch ${book} ${chapter}: ${response.status}`);
    } catch (error) {
      if (attempt === 5) throw error;
    } finally {
      clearTimeout(timeout);
    }
    await new Promise((resolve) => setTimeout(resolve, 2500 * attempt));
  }
  throw new Error(`Could not fetch ${book} ${chapter}`);
}

function splitIntoChunks<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) chunks.push(items.slice(index, index + size));
  return chunks;
}

function serialize(value: unknown) {
  return JSON.stringify(value, null, 2).replace(/"([^"]+)":/g, "$1:");
}

async function main() {
  const chapterCache = new Map<string, ApiVerse[]>();
  for (const day of dayPlans) {
    for (const reading of day.readings) {
      for (const chapter of reading.chapters) {
        const apiChapter = await getChapter(reading.book, chapter);
        chapterCache.set(`${reading.book}:${chapter}`, apiChapter.verses);
        await new Promise((resolve) => setTimeout(resolve, 350));
      }
    }
  }

  const allSections: Array<{
    book: string;
    chapter: number;
    startVerse: number;
    endVerse: number;
    reference: string;
    title: string;
    icon: string;
    phrases: Array<[string, string]>;
  }> = [];

  for (const [key, verses] of chapterCache) {
    const [book, chapterText] = key.split(":");
    const chapter = Number(chapterText);
    for (const [chunkIndex, chunk] of splitIntoChunks(verses, 6).entries()) {
      const candidates: string[] = [];
      for (const verse of chunk) candidates.push(...makePhraseCandidates(verse));
      const unique: string[] = [];
      const seen = new Set<string>();
      for (const phrase of candidates) {
        const key = phraseKey(phrase);
        if (isNearDuplicatePhrase(key, seen)) continue;
        unique.push(phrase);
        seen.add(key);
        if (unique.length === 4) break;
      }
      let fallbackVerseIndex = 0;
      while (unique.length < 4) {
        const verse = normalizeText(chunk[fallbackVerseIndex % chunk.length].text);
        const clauses = verse
          .split(/[,;:.!?]/)
          .map((piece) => cleanPhrase(piece))
          .filter((phrase) => phrase.split(/\s+/).length >= 3);
        const words = verse.replace(/["'()]/g, "").split(/\s+/).filter(Boolean);
        const fallback =
          clauses[fallbackVerseIndex % Math.max(1, clauses.length)] ||
          cleanPhrase(words.slice(0, Math.min(10, words.length)).join(" "));
        const fallbackKey = phraseKey(fallback);
        if (!isNearDuplicatePhrase(fallbackKey, seen) && fallback.split(/\s+/).length >= 3) {
          unique.push(fallback);
          seen.add(fallbackKey);
        }
        fallbackVerseIndex += 1;
        if (fallbackVerseIndex > chunk.length + 6) {
          const lastFallback = cleanPhrase(words.slice(Math.max(0, words.length - 10), words.length).join(" "));
          const lastKey = phraseKey(lastFallback);
          if (!isNearDuplicatePhrase(lastKey, seen) && lastFallback.split(/\s+/).length >= 3) {
            unique.push(lastFallback);
            seen.add(lastKey);
          }
        }
      }
      const startVerse = chunk[0].verse;
      const endVerse = chunk[chunk.length - 1].verse;
      const reference = startVerse === endVerse ? `${book} ${chapter}:${startVerse}` : `${book} ${chapter}:${startVerse}-${endVerse}`;
      allSections.push({
        book,
        chapter,
        startVerse,
        endVerse,
        reference,
        title: sectionHeading(book, chapter, startVerse, endVerse, unique),
        icon: sectionIcons[(chapter + chunkIndex) % sectionIcons.length],
        phrases: (() => {
          const usedIcons = new Set<string>();
          return unique.map((title) => [`${phraseIconUnique(title, usedIcons)} ${title}`, explain(title, book, chapter)] as [string, string]);
        })(),
      });
    }
  }

const personalFile = `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type KingdomDeclinePhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "1 Kings" | "2 Kings" | "1 Chronicles" };

const sections = ${serialize(allSections)} as const satisfies readonly KingdomDeclinePhraseSectionInput[];

export const FIRST_KINGS_16_22_PERSONAL_SECTIONS = sections.filter((section) => section.book === "1 Kings");
export const SECOND_KINGS_1_25_PERSONAL_SECTIONS = sections.filter((section) => section.book === "2 Kings");
export const FIRST_CHRONICLES_1_8_PERSONAL_SECTIONS = sections.filter((section) => section.book === "1 Chronicles");
`;

  const dayObjects = dayPlans.map((day) => {
    const refs = day.readings.flatMap((reading) => reading.chapters.map((chapter) => `${reading.book} ${chapter}`));
    const sections = day.readings.flatMap((reading) =>
      reading.chapters.flatMap((chapter) => allSections.filter((section) => section.book === reading.book && section.chapter === chapter)),
    );
    return { ...day, refs, sections };
  });

  const deepFile = `import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

type DaySection = {
  reference: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
  heading: string;
  summary: string;
  teaching: readonly string[];
};

function makeLesson(dayNumber: number, title: string, reference: string, sections: readonly DaySection[], opening: string[], closing: string[]): BibleYearDailyLesson {
  return {
    dayNumber,
    title,
    reference,
    estimatedListenTime: "20-30 min",
    opening,
    sections: sections.map((section) => ({
      heading: section.heading,
      verseBlock: {
        reference: section.reference,
        chapter: section.chapter,
        startVerse: section.startVerse,
        endVerse: section.endVerse,
      },
      teaching: [...section.teaching],
    })),
    closing,
  };
}

function makeDeepNotes(title: string, chapters: string[], intro: string[], sections: readonly DaySection[], closing: string[]) {
  return \`## Bible Reader Chapters Covered

\${chapters.map((chapter) => \`- \${chapter}\`).join("\\n")}

## Chapter Introduction

\${intro.join("\\n\\n")}

## Study Notes

\${sections.map((section) => \`\${section.reference} - \${section.heading}\\n\\n\${section.teaching.join("\\n\\n")}\`).join("\\n\\n")}

## Application & Reflection

\${closing.join("\\n\\n")}

The big idea is this: \${title} helps the reader follow the kingdom story with clear attention to God, covenant, wisdom, sin, mercy, and the need for faithful leadership.\`;
}

function makeStudySections(sections: readonly DaySection[]): BibleYearDeepStudySection[] {
  return sections.map((section) => ({
    reference: section.reference,
    title: section.heading,
    icon: "book",
    summary: section.summary,
    markdown: \`## \${section.reference}

\${section.teaching.join("\\n\\n")}

## What This Means

This section should be read slowly.

The kingdom story is not just listing events.

It is teaching the reader how leadership, worship, sin, wisdom, and covenant promises shape the people of God.\`,
  }));
}

${dayObjects
  .map((day) => {
    const constName = `DAY_${day.day}_SECTIONS`;
    const sections = day.sections.map((section) => ({
      reference: section.reference,
      chapter: section.chapter,
      startVerse: section.startVerse,
      endVerse: section.endVerse,
      heading: section.title,
      summary: `${section.reference} focuses on ${section.title.toLowerCase()} inside ${day.title.toLowerCase()}.`,
      teaching: [
        `Read ${section.reference} as a focused part of ${day.title}.`,
        `The section begins with "${section.phrases[0][0].replace(/^. /u, "")}" and keeps the reader close to the Bible's own wording.`,
        `The details matter because the kingdom story is being shaped through real choices, real consequences, and God's steady purpose.`,
        `Listen for the words of authority, worship, warning, mercy, and promise before moving to the next section.`,
      ],
    }));
    return `const ${constName}: DaySection[] = ${serialize(sections)};`;
  })
  .join("\n\n")}

${dayObjects
  .map((day) => {
    const varName = day.day === 86
      ? "KINGS_CHRONICLES_DAY_EIGHTY_SIX_ELIJAH_CONFRONTS_IDOLATRY_LESSON"
      : day.day === 87
      ? "KINGS_CHRONICLES_DAY_EIGHTY_SEVEN_AHABS_FALL_AND_ELIJAHS_FINAL_WARNINGS_LESSON"
      : day.day === 88
      ? "KINGS_CHRONICLES_DAY_EIGHTY_EIGHT_ELISHAS_MINISTRY_BEGINS_LESSON"
      : day.day === 89
      ? "KINGS_CHRONICLES_DAY_EIGHTY_NINE_RESCUE_SIEGE_AND_JEHUS_JUDGMENT_LESSON"
      : day.day === 90
      ? "KINGS_CHRONICLES_DAY_NINETY_JEHUS_REFORM_AND_ISRAELS_DECLINE_LESSON"
      : day.day === 91
      ? "KINGS_CHRONICLES_DAY_NINETY_ONE_ISRAEL_FALLS_TO_ASSYRIA_LESSON"
      : day.day === 92
      ? "KINGS_CHRONICLES_DAY_NINETY_TWO_HEZEKIAHS_FAITH_AND_MANASSEHS_EVIL_LESSON"
      : day.day === 93
      ? "KINGS_CHRONICLES_DAY_NINETY_THREE_JOSIAHS_REFORM_AND_JUDAHS_FALL_LESSON"
      : day.day === 94
      ? "KINGS_CHRONICLES_DAY_NINETY_FOUR_THE_FAMILY_LINE_OF_GODS_PEOPLE_LESSON"
      : "KINGS_CHRONICLES_DAY_NINETY_FIVE_TRIBES_GENEALOGIES_AND_IDENTITY_LESSON";
    return `export const ${varName} = makeLesson(
  ${day.day},
  ${JSON.stringify(day.title)},
  ${JSON.stringify(day.reference)},
  DAY_${day.day}_SECTIONS,
  [
    ${JSON.stringify(`Today we continue the Bible in One Year with ${day.reference}.`)},
    ${JSON.stringify(`${day.title} shows the kingdom story moving through promise, pressure, worship, wisdom, and consequence.`)},
  ],
  [
    ${JSON.stringify(`Day ${day.day} reminds us that kings change, but the LORD still rules over His people.`)},
    "The reader should leave this lesson watching both God's promises and human choices more carefully.",
  ],
);`;
  })
  .join("\n\n")}

${dayObjects
  .map((day) => `export const BIBLE_YEAR_DAY_${day.day}_DEEP_NOTES = makeDeepNotes(
  ${JSON.stringify(day.title)},
  ${serialize(day.refs)},
  [
    ${JSON.stringify(`Day ${day.day} covers ${day.reference}.`)},
    ${JSON.stringify(`${day.title} belongs to the Bible's larger kingdom story, where leadership is tested and God's promises remain in view.`)},
  ],
  DAY_${day.day}_SECTIONS,
  [
    "Where do you see the need for faithful leadership in this passage?",
    "What phrase from today's reading helped you understand the story more clearly?",
  ],
);`)
  .join("\n\n")}

${dayObjects.map((day) => `export const BIBLE_YEAR_DAY_${day.day}_DEEP_STUDY_SECTIONS = makeStudySections(DAY_${day.day}_SECTIONS);`).join("\n")}
`;

  writeFileSync("lib/kingdomDeclinePersonalNotes.ts", personalFile);
  writeFileSync("lib/bibleYearDaysEightySixToNinetyFiveDeepNotes.ts", deepFile);

  for (const day of dayObjects) {
    const script = `# Bible in One Year - Day ${day.day}

## ${day.title}

${day.reference}

${day.sections
  .map(
    (section) => `### ${section.reference}

[Read ${section.reference}.]

${section.title} is the focus of this section. Explain the key phrases, help the listener follow the story, and connect the moment to the larger kingdom movement before continuing.
`,
  )
  .join("\n")}
`;
    writeFileSync(`docs/bible-in-one-year-day-${day.day}-narrator-script.md`, script);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
