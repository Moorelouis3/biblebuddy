import { DEUTERONOMY_DEEP_NOTES } from "./deuteronomyDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

export const DEUTERONOMY_30_34_PERSONAL_SECTIONS = buildGeneratedPersonalSections({
  book: "Deuteronomy",
  notes: DEUTERONOMY_DEEP_NOTES,
  chapters: [30, 31, 32, 33, 34],
  icon: "📜",
  fallbackPhrases: [
    "The LORD Thy God",
    "Choose Life",
    "This Commandment",
    "The Song Of Moses",
    "The Blessing Wherewith Moses Blessed",
    "Moses The Servant Of The LORD",
  ],
});
