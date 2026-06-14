import { JOSHUA_DEEP_NOTES } from "./joshuaDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

export const JOSHUA_12_19_PERSONAL_SECTIONS = buildGeneratedPersonalSections({
  book: "Joshua",
  notes: JOSHUA_DEEP_NOTES,
  chapters: [12, 13, 14, 15, 16, 17, 18, 19],
  icon: "🗺️",
  fallbackPhrases: [
    "The Land Rested From War",
    "The LORD Gave Unto Israel",
    "Inheritance By Lot",
    "According To Their Families",
    "Cities And Villages",
    "The Children Of Israel",
  ],
});
