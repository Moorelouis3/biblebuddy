import { DEUTERONOMY_DEEP_NOTES } from "./deuteronomyDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

export const DEUTERONOMY_30_34_PERSONAL_SECTIONS = buildGeneratedPersonalSections({
  book: "Deuteronomy",
  notes: DEUTERONOMY_DEEP_NOTES,
  chapters: [30, 31, 32, 33, 34],
  icon: "📜",
  fallbackPhrases: [
    "The LORD Thy God",
    "That Thou And Thy Seed May Live",
    "This Commandment Which I Command Thee This Day",
    "Set Your Hearts Unto All The Words",
    "The Blessing Wherewith Moses The Man Of God Blessed",
    "Moses The Servant Of The LORD",
    "The Eternal God Is Thy Refuge",
    "The LORD Came From Sinai",
    "Let Reuben Live And Not Die",
    "Blessed Of The LORD Be His Land",
    "As Thy Days So Shall Thy Strength Be",
    "Thine Enemies Shall Be Found Liars Unto Thee",
  ],
});
