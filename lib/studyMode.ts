/**
 * Bible Buddy study modes.
 *
 * There is ONE dashboard shell with three middles. The streak, the daily
 * tasks, and the audio / study-notes / trivia / discussion stack underneath
 * are identical for everyone. The only thing that changes is how the person
 * chose to read:
 *
 *   bible_year  -> Day 1, Day 2, Day 3 of Bible in One Year
 *   devotional  -> Day 1, Day 2 of THEIR devotional
 *   bible       -> Chapter 1, Chapter 2 of the book they are in
 *
 * Bible in One Year is the reference implementation. Devotional and Bible
 * are meant to end up with the SAME stack, not a lighter version of it:
 * a ten-to-twelve minute audio lesson on top, then the reading with its
 * notes underneath, then trivia, then discussion. Where a mode cannot fill
 * a slot yet, the slot is absent — never replaced with a different design.
 *
 * Current content reality (2026-08-16):
 *   - bible_year: audio yes, deep notes yes, trivia yes, discussion yes.
 *   - devotional: audio NOT YET (planned), reading + notes yes, trivia yes,
 *     discussion yes.
 *   - bible: chapter audio yes (getBibleChapterTtsSrc), chapter notes yes,
 *     trivia yes, discussion yes.
 */

export type StudyMode = "bible_year" | "devotional" | "bible";

export const DEFAULT_STUDY_MODE: StudyMode = "bible_year";

/**
 * The unified three-middle dashboard shell.
 *
 * Defaults ON. To fall back to the old behaviour (Bible in One Year gets the
 * full dashboard, everyone else gets the plainer tabbed panel), set:
 *
 *   NEXT_PUBLIC_UNIFIED_STUDY_SHELL=false
 *
 * This exists so the shell can be switched off without reverting a diff.
 */
export const UNIFIED_STUDY_SHELL = process.env.NEXT_PUBLIC_UNIFIED_STUDY_SHELL !== "false";

/**
 * Read a stored `profile_stats.preferred_study_mode` into a known mode.
 * Anything unrecognised or missing is treated as Bible in One Year, which is
 * what the app did before the chooser existed.
 */
export function resolveStudyMode(preferred?: string | null): StudyMode {
  if (preferred === "devotional") return "devotional";
  if (preferred === "bible") return "bible";
  return DEFAULT_STUDY_MODE;
}

/**
 * What one step through this mode is called. Bible in One Year and
 * devotionals both count days; reading straight through the Bible counts
 * chapters.
 */
export function getStudyUnitNoun(mode: StudyMode): "Day" | "Chapter" {
  return mode === "bible" ? "Chapter" : "Day";
}

/** "Day 3" / "Chapter 3" — the label shown above the middle panel. */
export function getStudyUnitLabel(mode: StudyMode, unitNumber: number): string {
  return `${getStudyUnitNoun(mode)} ${Math.max(1, unitNumber)}`;
}

/**
 * True when this mode should render inside the full dashboard shell (streak
 * hero, daily tasks, study stack) rather than the older plain tabbed panel.
 * Bible in One Year always has; the flag only governs the two new middles.
 */
export function usesUnifiedStudyShell(mode: StudyMode): boolean {
  return mode === "bible_year" || UNIFIED_STUDY_SHELL;
}
