import { NUMBERS_DEEP_NOTES } from "./numbersDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

export const NUMBERS_26_36_PERSONAL_SECTIONS = buildGeneratedPersonalSections({
  book: "Numbers",
  notes: NUMBERS_DEEP_NOTES,
  chapters: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  icon: "⛺",
  fallbackPhrases: [
    "The LORD Spake Unto Moses",
    "The Children Of Israel",
    "According To Their Families",
    "Before The LORD",
    "The Inheritance",
    "As The LORD Commanded Moses",
    "The Congregation",
  ],
});
