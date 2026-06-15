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
import { DEUTERONOMY_14_29_PERSONAL_SECTIONS } from "../lib/deuteronomyFourteenToTwentyNinePersonalNotes";
import { DEUTERONOMY_30_34_PERSONAL_SECTIONS } from "../lib/deuteronomyThirtyToThirtyFourPersonalNotes";
import { JOSHUA_1_11_PERSONAL_SECTIONS } from "../lib/joshuaOneToElevenPersonalNotes";
import { JOSHUA_12_19_PERSONAL_SECTIONS } from "../lib/joshuaTwelveToNineteenPersonalNotes";
import { JOSHUA_20_24_PERSONAL_SECTIONS } from "../lib/joshuaTwentyToTwentyFourPersonalNotes";
import { JUDGES_1_15_PERSONAL_SECTIONS } from "../lib/judgesOneToFifteenPersonalNotes";
import { JUDGES_16_21_PERSONAL_SECTIONS } from "../lib/judgesSixteenToTwentyOnePersonalNotes";
import { RUTH_1_4_PERSONAL_SECTIONS } from "../lib/ruthOneToFourPersonalNotes";
import { FIRST_SAMUEL_1_10_PERSONAL_SECTIONS } from "../lib/firstSamuelOneToTenPersonalNotes";
import { FIRST_SAMUEL_11_30_PERSONAL_SECTIONS } from "../lib/firstSamuelElevenToThirtyPersonalNotes";
import { FIRST_KINGS_1_15_PERSONAL_SECTIONS, FIRST_SAMUEL_31_PERSONAL_SECTIONS, SECOND_SAMUEL_1_24_PERSONAL_SECTIONS } from "../lib/royalHistoryPersonalNotes";
import { FIRST_CHRONICLES_1_8_PERSONAL_SECTIONS, FIRST_KINGS_16_22_PERSONAL_SECTIONS, SECOND_KINGS_1_25_PERSONAL_SECTIONS } from "../lib/kingdomDeclinePersonalNotes";
import { FIRST_CHRONICLES_9_29_PERSONAL_SECTIONS, SECOND_CHRONICLES_1_19_PERSONAL_SECTIONS } from "../lib/chroniclesPersonalNotes";
import { EZRA_1_3_PERSONAL_SECTIONS, SECOND_CHRONICLES_20_36_PERSONAL_SECTIONS } from "../lib/secondChroniclesTwentyToEzraThreePersonalNotes";
import { EZRA_4_10_PERSONAL_SECTIONS, NEHEMIAH_1_13_PERSONAL_SECTIONS } from "../lib/ezraFourToNehemiahThirteenPersonalNotes";
import { ESTHER_1_10_PERSONAL_SECTIONS, JOB_1_10_PERSONAL_SECTIONS } from "../lib/estherOneToJobTenPersonalNotes";
import { JOB_11_30_PERSONAL_SECTIONS } from "../lib/jobElevenToThirtyPersonalNotes";

type PersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  phrases: Array<[string, string]>;
};

type BibleBook =
  | "Genesis"
  | "Exodus"
  | "Leviticus"
  | "Numbers"
  | "Deuteronomy"
  | "Joshua"
  | "Judges"
  | "Ruth"
  | "1 Samuel"
  | "2 Samuel"
  | "1 Kings"
  | "2 Kings"
  | "1 Chronicles"
  | "2 Chronicles"
  | "Ezra"
  | "Nehemiah"
  | "Esther"
  | "Job";

type DayPart = {
  book: BibleBook;
  chapters: number[];
  sections: readonly PersonalSection[];
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
  51: { book: "Deuteronomy", chapters: [14, 15, 16, 17], sections: DEUTERONOMY_14_29_PERSONAL_SECTIONS },
  52: { book: "Deuteronomy", chapters: [18, 19, 20, 21], sections: DEUTERONOMY_14_29_PERSONAL_SECTIONS },
  53: { book: "Deuteronomy", chapters: [22, 23, 24, 25], sections: DEUTERONOMY_14_29_PERSONAL_SECTIONS },
  54: { book: "Deuteronomy", chapters: [26, 27, 28, 29], sections: DEUTERONOMY_14_29_PERSONAL_SECTIONS },
  55: { book: "Deuteronomy", chapters: [30, 31, 32, 33], sections: DEUTERONOMY_30_34_PERSONAL_SECTIONS },
  56: {
    parts: [
      { book: "Deuteronomy", chapters: [34], sections: DEUTERONOMY_30_34_PERSONAL_SECTIONS },
      { book: "Joshua", chapters: [1, 2, 3], sections: JOSHUA_1_11_PERSONAL_SECTIONS },
    ],
  },
  57: { book: "Joshua", chapters: [4, 5, 6, 7], sections: JOSHUA_1_11_PERSONAL_SECTIONS },
  58: { book: "Joshua", chapters: [8, 9, 10, 11], sections: JOSHUA_1_11_PERSONAL_SECTIONS },
  59: { book: "Joshua", chapters: [12, 13, 14, 15], sections: JOSHUA_12_19_PERSONAL_SECTIONS },
  60: { book: "Joshua", chapters: [16, 17, 18, 19], sections: JOSHUA_12_19_PERSONAL_SECTIONS },
  61: { book: "Joshua", chapters: [20, 21, 22, 23], sections: JOSHUA_20_24_PERSONAL_SECTIONS },
  62: {
    parts: [
      { book: "Joshua", chapters: [24], sections: JOSHUA_20_24_PERSONAL_SECTIONS },
      { book: "Judges", chapters: [1, 2, 3], sections: JUDGES_1_15_PERSONAL_SECTIONS },
    ],
  },
  63: { book: "Judges", chapters: [4, 5, 6, 7], sections: JUDGES_1_15_PERSONAL_SECTIONS },
  64: { book: "Judges", chapters: [8, 9, 10, 11], sections: JUDGES_1_15_PERSONAL_SECTIONS },
  65: { book: "Judges", chapters: [12, 13, 14, 15], sections: JUDGES_1_15_PERSONAL_SECTIONS },
  66: { book: "Judges", chapters: [16, 17, 18, 19], sections: JUDGES_16_21_PERSONAL_SECTIONS },
  67: {
    parts: [
      { book: "Judges", chapters: [20, 21], sections: JUDGES_16_21_PERSONAL_SECTIONS },
      { book: "Ruth", chapters: [1, 2], sections: RUTH_1_4_PERSONAL_SECTIONS },
    ],
  },
  68: {
    parts: [
      { book: "Ruth", chapters: [3, 4], sections: RUTH_1_4_PERSONAL_SECTIONS },
      { book: "1 Samuel", chapters: [1, 2], sections: FIRST_SAMUEL_1_10_PERSONAL_SECTIONS },
    ],
  },
  69: { book: "1 Samuel", chapters: [3, 4, 5, 6], sections: FIRST_SAMUEL_1_10_PERSONAL_SECTIONS },
  70: { book: "1 Samuel", chapters: [7, 8, 9, 10], sections: FIRST_SAMUEL_1_10_PERSONAL_SECTIONS },
  71: { book: "1 Samuel", chapters: [11, 12, 13, 14], sections: FIRST_SAMUEL_11_30_PERSONAL_SECTIONS },
  72: { book: "1 Samuel", chapters: [15, 16, 17, 18], sections: FIRST_SAMUEL_11_30_PERSONAL_SECTIONS },
  73: { book: "1 Samuel", chapters: [19, 20, 21, 22], sections: FIRST_SAMUEL_11_30_PERSONAL_SECTIONS },
  74: { book: "1 Samuel", chapters: [23, 24, 25, 26], sections: FIRST_SAMUEL_11_30_PERSONAL_SECTIONS },
  75: { book: "1 Samuel", chapters: [27, 28, 29, 30], sections: FIRST_SAMUEL_11_30_PERSONAL_SECTIONS },
  76: {
    parts: [
      { book: "1 Samuel", chapters: [31], sections: FIRST_SAMUEL_31_PERSONAL_SECTIONS },
      { book: "2 Samuel", chapters: [1, 2, 3], sections: SECOND_SAMUEL_1_24_PERSONAL_SECTIONS },
    ],
  },
  77: { book: "2 Samuel", chapters: [4, 5, 6, 7], sections: SECOND_SAMUEL_1_24_PERSONAL_SECTIONS },
  78: { book: "2 Samuel", chapters: [8, 9, 10, 11], sections: SECOND_SAMUEL_1_24_PERSONAL_SECTIONS },
  79: { book: "2 Samuel", chapters: [12, 13, 14, 15], sections: SECOND_SAMUEL_1_24_PERSONAL_SECTIONS },
  80: { book: "2 Samuel", chapters: [16, 17, 18, 19], sections: SECOND_SAMUEL_1_24_PERSONAL_SECTIONS },
  81: { book: "2 Samuel", chapters: [20, 21, 22, 23], sections: SECOND_SAMUEL_1_24_PERSONAL_SECTIONS },
  82: {
    parts: [
      { book: "2 Samuel", chapters: [24], sections: SECOND_SAMUEL_1_24_PERSONAL_SECTIONS },
      { book: "1 Kings", chapters: [1, 2, 3], sections: FIRST_KINGS_1_15_PERSONAL_SECTIONS },
    ],
  },
  83: { book: "1 Kings", chapters: [4, 5, 6, 7], sections: FIRST_KINGS_1_15_PERSONAL_SECTIONS },
  84: { book: "1 Kings", chapters: [8, 9, 10, 11], sections: FIRST_KINGS_1_15_PERSONAL_SECTIONS },
  85: { book: "1 Kings", chapters: [12, 13, 14, 15], sections: FIRST_KINGS_1_15_PERSONAL_SECTIONS },
  86: { book: "1 Kings", chapters: [16, 17, 18, 19], sections: FIRST_KINGS_16_22_PERSONAL_SECTIONS },
  87: {
    parts: [
      { book: "1 Kings", chapters: [20, 21, 22], sections: FIRST_KINGS_16_22_PERSONAL_SECTIONS },
      { book: "2 Kings", chapters: [1], sections: SECOND_KINGS_1_25_PERSONAL_SECTIONS },
    ],
  },
  88: { book: "2 Kings", chapters: [2, 3, 4, 5], sections: SECOND_KINGS_1_25_PERSONAL_SECTIONS },
  89: { book: "2 Kings", chapters: [6, 7, 8, 9], sections: SECOND_KINGS_1_25_PERSONAL_SECTIONS },
  90: { book: "2 Kings", chapters: [10, 11, 12, 13], sections: SECOND_KINGS_1_25_PERSONAL_SECTIONS },
  91: { book: "2 Kings", chapters: [14, 15, 16, 17], sections: SECOND_KINGS_1_25_PERSONAL_SECTIONS },
  92: { book: "2 Kings", chapters: [18, 19, 20, 21], sections: SECOND_KINGS_1_25_PERSONAL_SECTIONS },
  93: { book: "2 Kings", chapters: [22, 23, 24, 25], sections: SECOND_KINGS_1_25_PERSONAL_SECTIONS },
  94: { book: "1 Chronicles", chapters: [1, 2, 3, 4], sections: FIRST_CHRONICLES_1_8_PERSONAL_SECTIONS },
  95: { book: "1 Chronicles", chapters: [5, 6, 7, 8], sections: FIRST_CHRONICLES_1_8_PERSONAL_SECTIONS },
  96: { book: "1 Chronicles", chapters: [9, 10, 11, 12], sections: FIRST_CHRONICLES_9_29_PERSONAL_SECTIONS },
  97: { book: "1 Chronicles", chapters: [13, 14, 15, 16], sections: FIRST_CHRONICLES_9_29_PERSONAL_SECTIONS },
  98: { book: "1 Chronicles", chapters: [17, 18, 19, 20], sections: FIRST_CHRONICLES_9_29_PERSONAL_SECTIONS },
  99: { book: "1 Chronicles", chapters: [21, 22, 23, 24], sections: FIRST_CHRONICLES_9_29_PERSONAL_SECTIONS },
  100: { book: "1 Chronicles", chapters: [25, 26, 27, 28], sections: FIRST_CHRONICLES_9_29_PERSONAL_SECTIONS },
  101: {
    parts: [
      { book: "1 Chronicles", chapters: [29], sections: FIRST_CHRONICLES_9_29_PERSONAL_SECTIONS },
      { book: "2 Chronicles", chapters: [1, 2, 3], sections: SECOND_CHRONICLES_1_19_PERSONAL_SECTIONS },
    ],
  },
  102: { book: "2 Chronicles", chapters: [4, 5, 6, 7], sections: SECOND_CHRONICLES_1_19_PERSONAL_SECTIONS },
  103: { book: "2 Chronicles", chapters: [8, 9, 10, 11], sections: SECOND_CHRONICLES_1_19_PERSONAL_SECTIONS },
  104: { book: "2 Chronicles", chapters: [12, 13, 14, 15], sections: SECOND_CHRONICLES_1_19_PERSONAL_SECTIONS },
  105: { book: "2 Chronicles", chapters: [16, 17, 18, 19], sections: SECOND_CHRONICLES_1_19_PERSONAL_SECTIONS },
  106: { book: "2 Chronicles", chapters: [20, 21, 22, 23], sections: SECOND_CHRONICLES_20_36_PERSONAL_SECTIONS },
  107: { book: "2 Chronicles", chapters: [24, 25, 26, 27], sections: SECOND_CHRONICLES_20_36_PERSONAL_SECTIONS },
  108: { book: "2 Chronicles", chapters: [28, 29, 30, 31], sections: SECOND_CHRONICLES_20_36_PERSONAL_SECTIONS },
  109: { book: "2 Chronicles", chapters: [32, 33, 34, 35], sections: SECOND_CHRONICLES_20_36_PERSONAL_SECTIONS },
  110: {
    parts: [
      { book: "2 Chronicles", chapters: [36], sections: SECOND_CHRONICLES_20_36_PERSONAL_SECTIONS },
      { book: "Ezra", chapters: [1, 2, 3], sections: EZRA_1_3_PERSONAL_SECTIONS },
    ],
  },
  111: { book: "Ezra", chapters: [4, 5, 6, 7], sections: EZRA_4_10_PERSONAL_SECTIONS },
  112: {
    parts: [
      { book: "Ezra", chapters: [8, 9, 10], sections: EZRA_4_10_PERSONAL_SECTIONS },
      { book: "Nehemiah", chapters: [1], sections: NEHEMIAH_1_13_PERSONAL_SECTIONS },
    ],
  },
  113: { book: "Nehemiah", chapters: [2, 3, 4, 5], sections: NEHEMIAH_1_13_PERSONAL_SECTIONS },
  114: { book: "Nehemiah", chapters: [6, 7, 8, 9], sections: NEHEMIAH_1_13_PERSONAL_SECTIONS },
  115: { book: "Nehemiah", chapters: [10, 11, 12, 13], sections: NEHEMIAH_1_13_PERSONAL_SECTIONS },
  116: { book: "Esther", chapters: [1, 2, 3, 4], sections: ESTHER_1_10_PERSONAL_SECTIONS },
  117: { book: "Esther", chapters: [5, 6, 7, 8], sections: ESTHER_1_10_PERSONAL_SECTIONS },
  118: {
    parts: [
      { book: "Esther", chapters: [9, 10], sections: ESTHER_1_10_PERSONAL_SECTIONS },
      { book: "Job", chapters: [1, 2], sections: JOB_1_10_PERSONAL_SECTIONS },
    ],
  },
  119: { book: "Job", chapters: [3, 4, 5, 6], sections: JOB_1_10_PERSONAL_SECTIONS },
  120: { book: "Job", chapters: [7, 8, 9, 10], sections: JOB_1_10_PERSONAL_SECTIONS },
  121: { book: "Job", chapters: [11, 12, 13, 14], sections: JOB_11_30_PERSONAL_SECTIONS },
  122: { book: "Job", chapters: [15, 16, 17, 18], sections: JOB_11_30_PERSONAL_SECTIONS },
  123: { book: "Job", chapters: [19, 20, 21, 22], sections: JOB_11_30_PERSONAL_SECTIONS },
  124: { book: "Job", chapters: [23, 24, 25, 26], sections: JOB_11_30_PERSONAL_SECTIONS },
  125: { book: "Job", chapters: [27, 28, 29, 30], sections: JOB_11_30_PERSONAL_SECTIONS },
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
