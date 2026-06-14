import { DEUTERONOMY_DEEP_NOTES } from "./deuteronomyDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

export const DEUTERONOMY_14_29_PERSONAL_SECTIONS = buildGeneratedPersonalSections({
  book: "Deuteronomy",
  notes: DEUTERONOMY_DEEP_NOTES,
  chapters: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  icon: "📜",
  fallbackPhrases: [
    "The LORD Thy God",
    "Thou Shalt Not",
    "Before The LORD",
    "The Place Which The LORD Shall Choose",
    "Justice And Judgment",
    "Keep The Commandments",
    "All The Words Of This Law",
  ],
});
