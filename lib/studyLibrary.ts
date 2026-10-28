/**
 * What is on the study shelf (Louis, 2026-10-23).
 *
 * These lists lived inside app/devotionals/page.tsx, which was fine while the
 * Plans page was the only thing that needed them. The admin Study Guides tab
 * needs the same answer, and a second copy would drift: the devotionals table
 * holds 25 rows, only four of which are in the library, and an admin page with
 * its own list would quietly report on studies nobody can see. One list, two
 * readers.
 *
 * It is a hand-kept list rather than a query because "in the library" is an
 * editorial decision, not a property of the row. is_published is true for
 * studies that were retired from the shelf long ago.
 */

/**
 * Every study on the shelf, in the order the Plans page shows them.
 *
 * Typed readonly string[] rather than `as const`: callers pass a title that
 * came out of the database, which is a plain string, and a literal union would
 * reject it.
 */
export const FEATURED_STUDY_ORDER: readonly string[] = [
  "The Wisdom of Proverbs",
  "The Tempting of Jesus",
  "21 Women of the Bible",
  "Higher Hope",
  "The Beginning of Everything",
];

/**
 * The studies a reader can open today. Anything else on the shelf is a grey
 * "Coming Soon" card. This was the single title "The Wisdom of Proverbs" until
 * 21 Women of the Bible went live (2026-10-18) and came up greyed out.
 */
export const AVAILABLE_STUDY_TITLES: ReadonlySet<string> = new Set([
  "The Wisdom of Proverbs",
  "21 Women of the Bible",
  // Moved out of UPCOMING_STUDIES on 2026-10-24, once all 60 days existed in
  // devotional_days. The devotionals row still carries available_from
  // 2026-10-25, which is what actually gates the reader, so this does not open
  // it early - it just stops the card being a grey "Coming Soon" on the day it
  // does open.
  "Higher Hope",
]);

/**
 * Studies that are announced but not open yet.
 *
 * A study belongs here rather than in AVAILABLE_STUDY_TITLES until its days
 * are actually written - Higher Hope sat here from 2026-10-23 because it is 60
 * days long and had 0 of them in the database, so opening it would have shown
 * an empty study. Move a title across once its days exist.
 */
export const UPCOMING_STUDIES: ReadonlyMap<string, { startLabel: string; path: string }> = new Map([
  ["The Tempting of Jesus", { startLabel: "Starts 1 November", path: "/devotionals/tempting-of-jesus" }],
  // All 21 days are already in devotional_days; the devotionals row's
  // available_from of 2026-11-08 is what actually gates the reader, and this
  // entry is what makes the card say so instead of looking broken.
  ["The Beginning of Everything", { startLabel: "Starts 8 November", path: "/devotionals/beginning-of-everything" }],
]);

export const isInLibrary = (title: string | null | undefined): boolean =>
  !!title && FEATURED_STUDY_ORDER.includes(title);
