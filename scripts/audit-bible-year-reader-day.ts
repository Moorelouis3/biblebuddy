import { GENESIS_41_50_PERSONAL_SECTIONS } from "../lib/genesisFortyOneToFiftyPersonalNotes";
import { GENESIS_21_30_PERSONAL_SECTIONS } from "../lib/genesisTwentyOneToThirtyPersonalNotes";
import { GENESIS_31_40_PERSONAL_SECTIONS } from "../lib/genesisThirtyOneToFortyPersonalNotes";
import { EXODUS_2_10_PERSONAL_SECTIONS } from "../lib/exodusTwoToTenPersonalNotes";
import { EXODUS_11_20_PERSONAL_SECTIONS } from "../lib/exodusElevenToTwentyPersonalNotes";
import { EXODUS_21_30_PERSONAL_SECTIONS } from "../lib/exodusTwentyOneToThirtyPersonalNotes";
import { EXODUS_31_40_PERSONAL_SECTIONS } from "../lib/exodusThirtyOneToFortyPersonalNotes";
import { LEVITICUS_1_10_PERSONAL_SECTIONS } from "../lib/leviticusOneToTenPersonalNotes";
import { LEVITICUS_17_20_PERSONAL_SECTIONS } from "../lib/leviticusSeventeenToTwentyPersonalNotes";
import { LEVITICUS_21_27_PERSONAL_SECTIONS } from "../lib/leviticusTwentyOneToTwentySevenPersonalNotes";
import { NUMBERS_1_9_PERSONAL_SECTIONS } from "../lib/numbersOneToNinePersonalNotes";
import { NUMBERS_10_25_PERSONAL_SECTIONS } from "../lib/numbersTenToTwentyFivePersonalNotes";
import { NUMBERS_26_36_PERSONAL_SECTIONS } from "../lib/numbersTwentySixToThirtySixPersonalNotes";
import { DEUTERONOMY_1_13_PERSONAL_SECTIONS } from "../lib/deuteronomyOneToThirteenPersonalNotes";

type PersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  phrases: Array<[string, string]>;
};

type BibleBook = "Genesis" | "Exodus" | "Leviticus" | "Numbers" | "Deuteronomy";

type DayPart = {
  book: BibleBook;
  chapters: number[];
  sections: PersonalSection[];
};

type DaySpec = DayPart | { parts: DayPart[] };

const DAY_SPECS: Record<number, DaySpec> = {
  10: { book: "Genesis", chapters: [25, 26, 27], sections: GENESIS_21_30_PERSONAL_SECTIONS },
  11: { book: "Genesis", chapters: [28, 29], sections: GENESIS_21_30_PERSONAL_SECTIONS },
  12: {
    book: "Genesis",
    chapters: [30, 31],
    sections: [...GENESIS_21_30_PERSONAL_SECTIONS, ...GENESIS_31_40_PERSONAL_SECTIONS],
  },
  13: { book: "Genesis", chapters: [32, 33], sections: GENESIS_31_40_PERSONAL_SECTIONS },
  14: { book: "Genesis", chapters: [34, 35, 36], sections: GENESIS_31_40_PERSONAL_SECTIONS },
  15: { book: "Genesis", chapters: [37, 38], sections: GENESIS_31_40_PERSONAL_SECTIONS },
  16: { book: "Genesis", chapters: [39, 40], sections: GENESIS_31_40_PERSONAL_SECTIONS },
  17: { book: "Genesis", chapters: [41, 42], sections: GENESIS_41_50_PERSONAL_SECTIONS },
  18: { book: "Genesis", chapters: [43, 44], sections: GENESIS_41_50_PERSONAL_SECTIONS },
  19: { book: "Genesis", chapters: [45, 46], sections: GENESIS_41_50_PERSONAL_SECTIONS },
  20: { book: "Genesis", chapters: [47, 48], sections: GENESIS_41_50_PERSONAL_SECTIONS },
  21: { book: "Genesis", chapters: [49, 50], sections: GENESIS_41_50_PERSONAL_SECTIONS },
  22: { book: "Exodus", chapters: [1, 2, 3, 4], sections: EXODUS_2_10_PERSONAL_SECTIONS },
  23: { book: "Exodus", chapters: [5, 6, 7, 8], sections: EXODUS_2_10_PERSONAL_SECTIONS },
  24: {
    book: "Exodus",
    chapters: [9, 10, 11, 12],
    sections: [...EXODUS_2_10_PERSONAL_SECTIONS, ...EXODUS_11_20_PERSONAL_SECTIONS],
  },
  25: { book: "Exodus", chapters: [13, 14, 15, 16], sections: EXODUS_11_20_PERSONAL_SECTIONS },
  26: { book: "Exodus", chapters: [17, 18, 19, 20], sections: EXODUS_11_20_PERSONAL_SECTIONS },
  27: { book: "Exodus", chapters: [21, 22, 23, 24], sections: EXODUS_21_30_PERSONAL_SECTIONS },
  28: { book: "Exodus", chapters: [25, 26, 27, 28], sections: EXODUS_21_30_PERSONAL_SECTIONS },
  29: {
    book: "Exodus",
    chapters: [29, 30, 31, 32],
    sections: [...EXODUS_21_30_PERSONAL_SECTIONS, ...EXODUS_31_40_PERSONAL_SECTIONS],
  },
  30: { book: "Exodus", chapters: [33, 34, 35, 36], sections: EXODUS_31_40_PERSONAL_SECTIONS },
  31: { book: "Exodus", chapters: [37, 38, 39, 40], sections: EXODUS_31_40_PERSONAL_SECTIONS },
  32: { book: "Leviticus", chapters: [1, 2, 3, 4], sections: LEVITICUS_1_10_PERSONAL_SECTIONS },
  33: { book: "Leviticus", chapters: [5, 6, 7, 8], sections: LEVITICUS_1_10_PERSONAL_SECTIONS },
  34: { book: "Leviticus", chapters: [9, 10, 11, 12], sections: LEVITICUS_1_10_PERSONAL_SECTIONS },
  35: { book: "Leviticus", chapters: [13, 14, 15, 16], sections: LEVITICUS_1_10_PERSONAL_SECTIONS },
  36: { book: "Leviticus", chapters: [17, 18, 19, 20], sections: LEVITICUS_17_20_PERSONAL_SECTIONS },
  37: { book: "Leviticus", chapters: [21, 22, 23, 24], sections: LEVITICUS_21_27_PERSONAL_SECTIONS },
  38: {
    parts: [
      { book: "Leviticus", chapters: [25, 26, 27], sections: LEVITICUS_21_27_PERSONAL_SECTIONS },
      { book: "Numbers", chapters: [1], sections: NUMBERS_1_9_PERSONAL_SECTIONS },
    ],
  },
  39: { book: "Numbers", chapters: [2, 3, 4, 5], sections: NUMBERS_1_9_PERSONAL_SECTIONS },
  40: { book: "Numbers", chapters: [6, 7, 8, 9], sections: NUMBERS_1_9_PERSONAL_SECTIONS },
  41: { book: "Numbers", chapters: [10, 11, 12, 13], sections: NUMBERS_10_25_PERSONAL_SECTIONS },
  42: { book: "Numbers", chapters: [14, 15, 16, 17], sections: NUMBERS_10_25_PERSONAL_SECTIONS },
  43: { book: "Numbers", chapters: [18, 19, 20, 21], sections: NUMBERS_10_25_PERSONAL_SECTIONS },
  44: { book: "Numbers", chapters: [22, 23, 24, 25], sections: NUMBERS_10_25_PERSONAL_SECTIONS },
  45: { book: "Numbers", chapters: [26, 27, 28, 29], sections: NUMBERS_26_36_PERSONAL_SECTIONS },
  46: { book: "Numbers", chapters: [30, 31, 32, 33], sections: NUMBERS_26_36_PERSONAL_SECTIONS },
  47: {
    parts: [
      { book: "Numbers", chapters: [34, 35, 36], sections: NUMBERS_26_36_PERSONAL_SECTIONS },
      { book: "Deuteronomy", chapters: [1], sections: DEUTERONOMY_1_13_PERSONAL_SECTIONS },
    ],
  },
  48: { book: "Deuteronomy", chapters: [2, 3, 4, 5], sections: DEUTERONOMY_1_13_PERSONAL_SECTIONS },
  49: { book: "Deuteronomy", chapters: [6, 7, 8, 9], sections: DEUTERONOMY_1_13_PERSONAL_SECTIONS },
  50: { book: "Deuteronomy", chapters: [10, 11, 12, 13], sections: DEUTERONOMY_1_13_PERSONAL_SECTIONS },
};

function getDayParts(spec: DaySpec): DayPart[] {
  return "parts" in spec ? spec.parts : [spec];
}

function parseDay() {
  const dayArg = process.argv.find((arg) => arg.startsWith("--day="));
  const day = dayArg ? Number(dayArg.slice("--day=".length)) : Number(process.argv[2]);

  if (!Number.isInteger(day)) {
    throw new Error("Usage: npx tsx scripts/audit-bible-year-reader-day.ts --day=30");
  }

  return day;
}

const day = parseDay();
const spec = DAY_SPECS[day];

if (!spec) {
  const available = Object.keys(DAY_SPECS).join(", ");
  throw new Error(`No audit spec for day ${day}. Available days: ${available}`);
}

const dayParts = getDayParts(spec);
const daySections = dayParts.flatMap((part) => part.sections.filter((section) => part.chapters.includes(section.chapter)));
const underPhraseMinimum = daySections.filter((section) => section.phrases.length < 4);
const overVerseLimit = daySections.filter((section) => section.endVerse - section.startVerse + 1 > 6);
const totalPhrases = daySections.reduce((sum, section) => sum + section.phrases.length, 0);

console.log(`Day ${day}`);
console.log(
  `Reading: ${dayParts
    .map((part) => `${part.book} ${part.chapters[0]}-${part.chapters.at(-1)}`)
    .join("; ")}`,
);
console.log(`Sections: ${daySections.length}`);
console.log(`Phrases: ${totalPhrases}`);
console.log(`Minimum phrases in a section: ${Math.min(...daySections.map((section) => section.phrases.length))}`);
console.log(`Maximum phrases in a section: ${Math.max(...daySections.map((section) => section.phrases.length))}`);

for (const part of dayParts) {
  for (const chapter of part.chapters) {
    const chapterSections = part.sections.filter((section) => section.chapter === chapter);
    const chapterPhrases = chapterSections.reduce((sum, section) => sum + section.phrases.length, 0);
    console.log(`${part.book} ${chapter}: ${chapterSections.length} sections, ${chapterPhrases} phrases`);
  }
}

console.log(`Sections under 4 phrases: ${underPhraseMinimum.length}`);
for (const section of underPhraseMinimum) {
  console.log(`  ${section.reference}: ${section.phrases.length} phrases - ${section.title}`);
}

console.log(`Cards over 6 verses: ${overVerseLimit.length}`);
for (const section of overVerseLimit) {
  console.log(`  ${section.reference}: ${section.endVerse - section.startVerse + 1} verses - ${section.title}`);
}

if (underPhraseMinimum.length > 0 || overVerseLimit.length > 0) {
  process.exitCode = 1;
}
