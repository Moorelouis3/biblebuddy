import { NUMBERS_DEEP_NOTES } from "./numbersDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

export const NUMBERS_1_9_PERSONAL_SECTIONS = buildGeneratedPersonalSections({
  book: "Numbers",
  notes: NUMBERS_DEEP_NOTES,
  chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  icon: "⛺",
  fallbackPhrases: [
    "The LORD Spake Unto Moses",
    "The Children Of Israel",
    "By Their Armies",
    "According To Their Families",
    "Before The Tabernacle",
    "Keep The Charge",
    "As The LORD Commanded Moses",
  ],
});
