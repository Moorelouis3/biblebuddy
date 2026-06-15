import { JOSHUA_DEEP_NOTES } from "./joshuaDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";
import { DAY_61_80_JOSHUA_20_24_SUPPLEMENTAL_SECTIONS } from "./daySixtyOneToEightySupplementalPersonalNotes";

export const JOSHUA_20_24_PERSONAL_SECTIONS = [
  ...buildGeneratedPersonalSections({
  book: "Joshua",
  notes: JOSHUA_DEEP_NOTES,
  chapters: [20, 21, 22, 23, 24],
  icon: "🛡️",
  fallbackPhrases: [
    "The LORD Also Spake Unto Joshua",
    "The Children Of Israel",
    "The Cities Of Refuge",
    "The Land Rested From War",
    "The Inheritance Of The Levites",
    "Serve The LORD",
    "Made A Covenant With The People",
  ],
  }),
  ...DAY_61_80_JOSHUA_20_24_SUPPLEMENTAL_SECTIONS,
];
