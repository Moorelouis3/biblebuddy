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

const dayPlans: DayPlan[] = [
  { day: 96, title: "Return, Saul, and David's Supporters", reference: "1 Chronicles 9-12", readings: [{ book: "1 Chronicles", chapters: [9, 10, 11, 12] }] },
  { day: 97, title: "The Ark Comes to Jerusalem", reference: "1 Chronicles 13-16", readings: [{ book: "1 Chronicles", chapters: [13, 14, 15, 16] }] },
  { day: 98, title: "David's Covenant and Victories", reference: "1 Chronicles 17-20", readings: [{ book: "1 Chronicles", chapters: [17, 18, 19, 20] }] },
  { day: 99, title: "The Temple Site and Priestly Order", reference: "1 Chronicles 21-24", readings: [{ book: "1 Chronicles", chapters: [21, 22, 23, 24] }] },
  { day: 100, title: "Worship Teams and Temple Plans", reference: "1 Chronicles 25-28", readings: [{ book: "1 Chronicles", chapters: [25, 26, 27, 28] }] },
  { day: 101, title: "David's Offering and Solomon's Temple", reference: "1 Chronicles 29; 2 Chronicles 1-3", readings: [{ book: "1 Chronicles", chapters: [29] }, { book: "2 Chronicles", chapters: [1, 2, 3] }] },
  { day: 102, title: "Temple Dedication and God's Glory", reference: "2 Chronicles 4-7", readings: [{ book: "2 Chronicles", chapters: [4, 5, 6, 7] }] },
  { day: 103, title: "Solomon's Reign and the Divided Kingdom", reference: "2 Chronicles 8-11", readings: [{ book: "2 Chronicles", chapters: [8, 9, 10, 11] }] },
  { day: 104, title: "Kings, Reform, and Returning to God", reference: "2 Chronicles 12-15", readings: [{ book: "2 Chronicles", chapters: [12, 13, 14, 15] }] },
  { day: 105, title: "Asa, Jehoshaphat, and Trust", reference: "2 Chronicles 16-19", readings: [{ book: "2 Chronicles", chapters: [16, 17, 18, 19] }] },
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

function makePhraseCandidates(verse: ApiVerse) {
  const text = normalizeText(verse.text)
    .replace(/^And\s+/i, "And ")
    .replace(/^But\s+/i, "But ");
  const pieces = text
    .split(/[,;:.!?]/)
    .map((piece) => piece.trim())
    .filter((piece) => piece.split(/\s+/).length >= 3)
    .map((piece) => piece.replace(/^And\s+/i, "And ").replace(/\s+$/g, ""));
  return pieces.slice(0, 2).map((piece) => titleCase(piece.replace(/["'()]/g, "").replace(/\s+/g, " ").trim()));
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
  return I.spark;
}

function explain(title: string, book: string, chapter: number) {
  const t = title.toLowerCase();
  let meaning = `${title} names the action or detail the reader is supposed to notice in this part of the passage.`;
  let close = "The phrase matters because Chronicles is teaching through details: names, families, worship, leadership, and how God keeps His people remembered.";
  let bullets = [`${I.book} A real detail`, `${I.key} A scene marker`, `${I.spark} A movement in the kingdom story`];

  if (t.includes("lord") || t.includes("god")) {
    meaning = `${title} keeps God at the center of the scene.`;
    bullets = [`${I.prayer} God is not absent`, `${I.scroll} His word carries authority`, `${I.key} His purpose is still moving`];
    close = "The phrase reminds the reader that the kingdom story is never only about human power.";
  } else if (t.includes("king") || t.includes("throne") || t.includes("reign")) {
    meaning = `${title} is kingdom language. It is about rule, authority, and who has the right to lead God's people.`;
    bullets = [`${I.crown} Authority`, `${I.house} A royal house`, `${I.warning} Leadership under God's eye`];
    close = "The phrase matters because the Bible is tracing what kind of king Israel has and what kind of king Israel still needs.";
  } else if (t.includes("house")) {
    meaning = `${title} can point to a building, a family line, or a royal household depending on the sentence.`;
    bullets = [`${I.house} Home or dynasty`, `${I.crown} Family rule`, `${I.scroll} Promise carried forward`];
    close = "The phrase helps the reader watch how God works through households, not only through isolated individuals.";
  } else if (t.includes("genealog") || t.includes("sons of") || t.includes("children of") || t.includes("begat") || t.includes("families") || t.includes("names") || t.includes("reckoned")) {
    meaning = `${title} is genealogy language. It shows that the Bible is remembering real families, tribes, and covenant history.`;
    bullets = [`${I.book} Names remembered`, `${I.house} Families traced`, `${I.key} Identity preserved`];
    close = "The phrase matters because Chronicles teaches that God's people are not forgotten, even after exile, failure, and loss.";
  } else if (t.includes("levites") || t.includes("priests") || t.includes("porters") || t.includes("singers") || t.includes("courses")) {
    meaning = `${title} is worship-order language. It describes people set apart for service around the temple and the worship of the LORD.`;
    bullets = [`${I.temple} Temple service`, `${I.prayer} Worship organized`, `${I.scroll} Holy responsibilities`];
    close = "The phrase helps the reader see that worship in Chronicles is careful, ordered, and centered on the LORD.";
  } else if (t.includes("heart")) {
    meaning = `${title} focuses on the inner person. In the Bible, the heart includes desire, loyalty, thought, and choice.`;
    bullets = [`${I.heart} Desire`, `${I.key} Loyalty`, `${I.warning} Direction of life`];
    close = "The phrase matters because the story keeps showing that outward power cannot replace a faithful heart.";
  } else if (t.includes("sword") || t.includes("battle") || t.includes("war") || t.includes("smote")) {
    meaning = `${title} brings the reader into conflict. The kingdom story is being shaped through danger, violence, and judgment.`;
    bullets = [`${I.sword} Conflict`, `${I.shield} Protection needed`, `${I.warning} Sin has real consequences`];
    close = "The phrase is important because these battles reveal both human weakness and God's rule over history.";
  } else if (t.includes("fled") || t.includes("slain") || t.includes("fell") || t.includes("died") || t.includes("death")) {
    meaning = `${title} is language of defeat, grief, or consequence. It tells the reader that choices and conflict have reached a painful result.`;
    bullets = [`${I.sorrow} Loss`, `${I.warning} Consequence`, `${I.scroll} The story does not hide sorrow`];
    close = "The phrase matters because the Bible lets the reader feel the weight of sin, war, and broken leadership.";
  } else if (t.includes("men of israel") || t.includes("children of israel") || t.includes("judah")) {
    meaning = `${title} focuses on the people, not only the leader. What happens to the king affects the nation.`;
    bullets = [`${I.city} The people`, `${I.crown} Public leadership`, `${I.warning} Shared consequences`];
    close = "The phrase helps the reader remember that the kingdom story is personal and national at the same time.";
  } else if (t.includes("ark") || t.includes("covenant")) {
    meaning = `${title} points to God's covenant presence among His people.`;
    bullets = [`${I.ark} Covenant sign`, `${I.prayer} Holy presence`, `${I.scroll} God's promises remembered`];
    close = "The phrase matters because Israel's hope is not only a throne but the LORD dwelling with His people.";
  } else if (t.includes("altar") || t.includes("sacrifice") || t.includes("offered")) {
    meaning = `${title} is worship language. It shows people drawing near to God through sacrifice and surrender.`;
    bullets = [`${I.altar} A place of worship`, `${I.fire} Sacrifice offered`, `${I.prayer} Seeking mercy`];
    close = "The phrase helps the reader see that sin, gratitude, judgment, and mercy all come before the LORD.";
  } else if (t.includes("wisdom") || t.includes("understanding")) {
    meaning = `${title} is about the ability to judge rightly, listen carefully, and lead with discernment.`;
    bullets = [`${I.wisdom} Discernment`, `${I.crown} Leadership`, `${I.scroll} Listening before ruling`];
    close = "The phrase matters because Solomon's strength begins with receiving wisdom from God.";
  } else if (t.includes("jerusalem") || t.includes("hebron") || t.includes("shechem") || t.includes("gihon") || t.includes("zion")) {
    meaning = `${title} names a place where the story turns. Biblical places often carry memory, worship, danger, or kingdom meaning.`;
    bullets = [`${I.city} A real location`, `${I.crown} Kingdom movement`, `${I.key} A turning point`];
    close = "The phrase helps the reader follow where God is moving the story geographically and spiritually.";
  } else if (t.includes("david") || t.includes("saul") || t.includes("solomon") || t.includes("absalom") || t.includes("rehoboam") || t.includes("jeroboam")) {
    meaning = `${title} keeps attention on a person whose choices affect many others.`;
    bullets = [`${I.crown} Leadership`, `${I.heart} Character revealed`, `${I.warning} Choices spread outward`];
    close = "The phrase matters because kings and sons in these chapters do not live private lives; their decisions shape the people.";
  }

  return [meaning, "", ...bullets, "", close, "", `${book} ${chapter} uses this phrase to help the reader follow God's people, worship, leadership, and covenant memory carefully.`].join("\n\n");
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
    const response = await fetch(url);
    if (response.ok) return (await response.json()) as ApiChapter;
    if (response.status !== 429 || attempt === 5) throw new Error(`Could not fetch ${book} ${chapter}: ${response.status}`);
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
      const unique = [...new Set(candidates)].filter((phrase) => phrase.split(/\s+/).length >= 3).slice(0, 4);
      let fallbackVerseIndex = 0;
      while (unique.length < 4) {
        const verse = normalizeText(chunk[fallbackVerseIndex % chunk.length].text);
        const firstClause = verse.split(/[,;:.!?]/)[0].trim();
        const fallback = titleCase((firstClause || verse).replace(/["'()]/g, "").replace(/\s+/g, " ").trim());
        if (!unique.includes(fallback) && fallback.split(/\s+/).length >= 3) unique.push(fallback);
        fallbackVerseIndex += 1;
        if (fallbackVerseIndex > chunk.length + 6) {
          unique.push(titleCase(`${chunk[0].book_name} ${chapter} Verse ${chunk[0].verse}`));
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
        phrases: unique.map((title) => [`${phraseIcon(title)} ${title}`, explain(title, book, chapter)]),
      });
    }
  }

const personalFile = `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type ChroniclesPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "1 Chronicles" | "2 Chronicles" };

const sections = ${serialize(allSections)} as const satisfies readonly ChroniclesPhraseSectionInput[];

export const FIRST_CHRONICLES_9_29_PERSONAL_SECTIONS = sections.filter((section) => section.book === "1 Chronicles");
export const SECOND_CHRONICLES_1_19_PERSONAL_SECTIONS = sections.filter((section) => section.book === "2 Chronicles");
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
    const varName = day.day === 96
      ? "CHRONICLES_DAY_NINETY_SIX_RETURN_SAUL_AND_DAVIDS_SUPPORTERS_LESSON"
      : day.day === 97
      ? "CHRONICLES_DAY_NINETY_SEVEN_THE_ARK_COMES_TO_JERUSALEM_LESSON"
      : day.day === 98
      ? "CHRONICLES_DAY_NINETY_EIGHT_DAVIDS_COVENANT_AND_VICTORIES_LESSON"
      : day.day === 99
      ? "CHRONICLES_DAY_NINETY_NINE_THE_TEMPLE_SITE_AND_PRIESTLY_ORDER_LESSON"
      : day.day === 100
      ? "CHRONICLES_DAY_ONE_HUNDRED_WORSHIP_TEAMS_AND_TEMPLE_PLANS_LESSON"
      : day.day === 101
      ? "CHRONICLES_DAY_ONE_HUNDRED_ONE_DAVIDS_OFFERING_AND_SOLOMONS_TEMPLE_LESSON"
      : day.day === 102
      ? "CHRONICLES_DAY_ONE_HUNDRED_TWO_TEMPLE_DEDICATION_AND_GODS_GLORY_LESSON"
      : day.day === 103
      ? "CHRONICLES_DAY_ONE_HUNDRED_THREE_SOLOMONS_REIGN_AND_THE_DIVIDED_KINGDOM_LESSON"
      : day.day === 104
      ? "CHRONICLES_DAY_ONE_HUNDRED_FOUR_KINGS_REFORM_AND_RETURNING_TO_GOD_LESSON"
      : "CHRONICLES_DAY_ONE_HUNDRED_FIVE_ASA_JEHOSHAPHAT_AND_TRUST_LESSON";
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

  writeFileSync("lib/chroniclesPersonalNotes.ts", personalFile);
  writeFileSync("lib/bibleYearDaysNinetySixToOneHundredFiveDeepNotes.ts", deepFile);

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
