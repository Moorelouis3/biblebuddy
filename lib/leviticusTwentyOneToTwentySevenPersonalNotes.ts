import { LEVITICUS_DEEP_NOTES } from "./leviticusDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

export const LEVITICUS_21_27_PERSONAL_SECTIONS = buildGeneratedPersonalSections({
  book: "Leviticus",
  notes: LEVITICUS_DEEP_NOTES,
  chapters: [21, 22, 23, 24, 25, 26, 27],
  icon: "📜",
  fallbackPhrases: [
    "The LORD Spake Unto Moses",
    "I Am The LORD",
    "Be Holy",
    "Keep My Statutes",
    "Before The LORD",
    "The Children Of Israel",
    "A Statute For Ever",
  ],
});
