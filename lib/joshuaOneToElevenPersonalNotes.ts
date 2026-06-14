import { JOSHUA_DEEP_NOTES } from "./joshuaDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

export const JOSHUA_1_11_PERSONAL_SECTIONS = buildGeneratedPersonalSections({
  book: "Joshua",
  notes: JOSHUA_DEEP_NOTES,
  chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  icon: "🛡️",
  fallbackPhrases: [
    "Be Strong And Of A Good Courage",
    "The LORD Thy God Is With Thee",
    "Ark Of The Covenant",
    "The Children Of Israel",
    "According Unto The Word Of The LORD",
    "The Land Which I Do Give",
  ],
});
