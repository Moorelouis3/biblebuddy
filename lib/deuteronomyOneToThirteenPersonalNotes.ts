import { DEUTERONOMY_DEEP_NOTES } from "./deuteronomyDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

export const DEUTERONOMY_1_13_PERSONAL_SECTIONS = buildGeneratedPersonalSections({
  book: "Deuteronomy",
  notes: DEUTERONOMY_DEEP_NOTES,
  chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  icon: "📜",
  fallbackPhrases: [
    "The LORD Our God",
    "Hear O Israel",
    "Keep The Commandments",
    "Remember",
    "The Land Which The LORD Sware",
    "Love The LORD Thy God",
    "With All Thine Heart",
  ],
});
