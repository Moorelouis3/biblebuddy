/**
 * When a study opens. Nothing here decides WHICH studies are on the shelf.
 *
 * It used to. This file held FEATURED_STUDY_ORDER, AVAILABLE_STUDY_TITLES and
 * UPCOMING_STUDIES - three hand-kept lists of titles - because "in the
 * library" was once an editorial decision with nowhere to live on the row.
 * ADD_LIBRARY_CATALOG_COLUMNS.sql gave it one. The Library has read
 * `devotionals` since 2026-10-16 (is_published, sort_order, available_from,
 * cover_image: see lib/libraryCatalog.ts), so the lists stopped being the
 * answer and became a second opinion.
 *
 * They were removed on 2026-11-12, when Louis put The Obedience of Abraham
 * back on the shelf for 1 December. That was one row edit - is_published,
 * available_from, sort_order - and the shelf showed it immediately, greyed,
 * with a countdown. The admin Study Guides tab did not, because it was still
 * reading the list here, which nobody had thought to edit. Same shape as the
 * cover bug and the layout bug before it: nothing errors, two screens just
 * quietly disagree about what exists. docs/STUDY_LAYOUT_LISTS.md is the
 * history.
 *
 * So: the database says what is on the shelf and when it opens. This file
 * only answers "has that moment arrived yet", for the one caller that cannot
 * import the browser catalog.
 */

/**
 * What time of day a study opens.
 *
 * available_from is a date column - it drops any time you write to it - so the
 * hour lives in code. 11:00 is when Higher Hope was set to land (Louis,
 * 2026-10-18), and a study that opens at a stated hour rather than at midnight
 * is the one people can actually be waiting for.
 */
export const RELEASE_HOUR = 11;

/** The exact moment a study opens, or null if it has no date and is simply out. */
export function releaseAtFrom(availableFrom: string | null | undefined): Date | null {
  if (!availableFrom) return null;
  const start = new Date(`${availableFrom}T00:00:00`);
  if (Number.isNaN(start.getTime())) return null;
  start.setHours(RELEASE_HOUR, 0, 0, 0);
  return start;
}

/** True once readers who have never started it can open the study. */
export function isOpenNow(availableFrom: string | null | undefined, now = new Date()): boolean {
  const start = releaseAtFrom(availableFrom);
  return !start || start <= now;
}

/**
 * "Starts 1 December" for a study that has not opened yet, else null.
 *
 * Day and month only, in the same words the shelf used when these labels were
 * typed by hand. The year is deliberately absent: a release more than a year
 * out is not a thing that happens, and "Starts 1 December 2026" reads like a
 * contract.
 */
export function startLabelFrom(availableFrom: string | null | undefined, now = new Date()): string | null {
  const start = releaseAtFrom(availableFrom);
  if (!start || start <= now) return null;
  return `Starts ${start.getDate()} ${start.toLocaleString("en-GB", { month: "long" })}`;
}
