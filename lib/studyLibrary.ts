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
];

/**
 * The studies a reader can open today. Anything else on the shelf is a grey
 * "Coming Soon" card. This was the single title "The Wisdom of Proverbs" until
 * 21 Women of the Bible went live (2026-10-18) and came up greyed out.
 */
export const AVAILABLE_STUDY_TITLES: ReadonlySet<string> = new Set([
  "The Wisdom of Proverbs",
  "21 Women of the Bible",
]);

/**
 * Studies that are announced but not open yet. Was a single title until
 * Higher Hope was added (2026-10-23) and there were two at once: Higher Hope
 * on the 25th and The Tempting of Jesus on 1 November.
 *
 * A study belongs here rather than in AVAILABLE_STUDY_TITLES until its days
 * are actually written - Higher Hope is 60 days long and had 0 of them in the
 * database when it was listed, so opening it would have shown an empty study.
 * Move a title to AVAILABLE_STUDY_TITLES once its days exist.
 *
 * Higher Hope has no slug landing page of its own, so it opens on its id.
 */
export const UPCOMING_STUDIES: ReadonlyMap<string, { startLabel: string; path: string }> = new Map([
  ["The Tempting of Jesus", { startLabel: "Starts 1 November", path: "/devotionals/tempting-of-jesus" }],
  ["Higher Hope", { startLabel: "Starts 25 October", path: "/devotionals/170cb29a-39fc-47b7-9083-db1664df04f6" }],
]);

export const isInLibrary = (title: string | null | undefined): boolean =>
  !!title && FEATURED_STUDY_ORDER.includes(title);
