import { JOSHUA_DEEP_NOTES } from "./joshuaDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

export const JOSHUA_20_24_PERSONAL_SECTIONS = buildGeneratedPersonalSections({
  book: "Joshua",
  notes: JOSHUA_DEEP_NOTES,
  chapters: [20, 21, 22, 23, 24],
  icon: "🛡️",
  fallbackPhrases: [
    "The LORD",
    "The Children Of Israel",
    "The Cities Of Refuge",
    "The Land",
    "The Inheritance",
    "Serve The LORD",
    "Covenant",
  ],
});
