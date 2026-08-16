/**
 * How someone chose to read the Bible.
 *
 * One dashboard, three middles. The shell — streak, daily tasks, and the
 * audio / study notes / trivia / discussion stack — is identical for everyone.
 * Only the thing in the middle changes:
 *
 *   bible_year   Day 1, Day 2, Day 3 ... through the whole Bible
 *   devotional   Day 1, Day 2 ... of the devotional they picked
 *   bible        Chapter 1, Chapter 2 ... of the book they are reading
 *
 * Chosen at /start and stored on profile_stats.preferred_study_mode.
 *
 * This module exists so the dashboard stops assuming "Day". That assumption is
 * why someone reading plain Bible saw "Day 4" while sitting on Genesis 4, and
 * why Home used to drop them back into Bible in One Year.
 */

export type StudyMode = "bible_year" | "devotional" | "bible";

export const DEFAULT_STUDY_MODE: StudyMode = "bible_year";

/** Anything unrecognised falls back to Bible in One Year, the original behaviour. */
export function normalizeStudyMode(value: string | null | undefined): StudyMode {
  if (value === "devotional" || value === "bible" || value === "bible_year") return value;
  return DEFAULT_STUDY_MODE;
}

/**
 * What one step through this mode is called.
 *
 * Bible in One Year and devotionals both count in days. Reading a book of the
 * Bible counts in chapters — "Day 4" is meaningless when you are on Genesis 4.
 */
export function studyUnitLabel(mode: StudyMode, n: number | null | undefined): string {
  const num = typeof n === "number" && n > 0 ? n : 1;
  return mode === "bible" ? `Chapter ${num}` : `Day ${num}`;
}

/** Plural noun for the unit, for progress text like "3 of 21 days". */
export function studyUnitNoun(mode: StudyMode, plural = true): string {
  if (mode === "bible") return plural ? "chapters" : "chapter";
  return plural ? "days" : "day";
}

/** What the middle of the dashboard is showing, for headings and empty states. */
export function studyModeTitle(mode: StudyMode): string {
  switch (mode) {
    case "devotional":
      return "Your devotional";
    case "bible":
      return "Your reading";
    default:
      return "The Bible in One Year";
  }
}

/**
 * Where Home should land for this mode.
 *
 * Home must return someone to their own study, never to a plan they never
 * started.
 */
export function studyModeHomeHref(mode: StudyMode): string {
  switch (mode) {
    case "devotional":
      return "/devotionals";
    case "bible":
      return "/bible";
    default:
      return "/dashboard";
  }
}
