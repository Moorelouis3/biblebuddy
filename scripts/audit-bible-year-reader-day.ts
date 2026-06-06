import { GENESIS_41_50_PERSONAL_SECTIONS } from "../lib/genesisFortyOneToFiftyPersonalNotes";
import { GENESIS_21_30_PERSONAL_SECTIONS } from "../lib/genesisTwentyOneToThirtyPersonalNotes";
import { EXODUS_2_10_PERSONAL_SECTIONS } from "../lib/exodusTwoToTenPersonalNotes";
import { EXODUS_11_20_PERSONAL_SECTIONS } from "../lib/exodusElevenToTwentyPersonalNotes";
import { EXODUS_21_30_PERSONAL_SECTIONS } from "../lib/exodusTwentyOneToThirtyPersonalNotes";
import { EXODUS_31_40_PERSONAL_SECTIONS } from "../lib/exodusThirtyOneToFortyPersonalNotes";

type PersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  phrases: Array<[string, string]>;
};

type DaySpec = {
  book: "Genesis" | "Exodus";
  chapters: number[];
  sections: PersonalSection[];
};

const DAY_SPECS: Record<number, DaySpec> = {
  10: { book: "Genesis", chapters: [25, 26, 27], sections: GENESIS_21_30_PERSONAL_SECTIONS },
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
};

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

const daySections = spec.sections.filter((section) => spec.chapters.includes(section.chapter));
const underPhraseMinimum = daySections.filter((section) => section.phrases.length < 4);
const overVerseLimit = daySections.filter((section) => section.endVerse - section.startVerse + 1 > 6);
const totalPhrases = daySections.reduce((sum, section) => sum + section.phrases.length, 0);

console.log(`Day ${day}`);
console.log(`Reading: ${spec.book} ${spec.chapters[0]}-${spec.chapters.at(-1)}`);
console.log(`Sections: ${daySections.length}`);
console.log(`Phrases: ${totalPhrases}`);
console.log(`Minimum phrases in a section: ${Math.min(...daySections.map((section) => section.phrases.length))}`);
console.log(`Maximum phrases in a section: ${Math.max(...daySections.map((section) => section.phrases.length))}`);

for (const chapter of spec.chapters) {
  const chapterSections = daySections.filter((section) => section.chapter === chapter);
  const chapterPhrases = chapterSections.reduce((sum, section) => sum + section.phrases.length, 0);
  console.log(`${spec.book} ${chapter}: ${chapterSections.length} sections, ${chapterPhrases} phrases`);
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
