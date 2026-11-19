/**
 * Which cover goes on a Study Activity card in the feed.
 *
 * The feed reads covers from `devotionals` (title -> cover_image). Bible in One
 * Year is deliberately NOT a devotionals row (see lib/libraryCatalog.ts,
 * bibleYearShelfStudy), so every "Finished Day N of Bible in One Year." post
 * found no cover and fell back to the open-book placeholder. Its cover lives in
 * the catalogue as BIBLE_YEAR_SHELF_COVER, which is what the Library and the
 * bookshelf already show, so the feed uses that same constant.
 *
 * Posts carry no study id - the feed recognises them by their sentence (see
 * readStudyActivity in lib/communityMilestones.ts) - so this keys on the title
 * that sentence carries. That makes it work for every post already written,
 * with no backfill.
 *
 * Returns null only when there is genuinely no cover; the card then shows its
 * book-mark placeholder.
 */
import { BIBLE_YEAR_SHELF_COVER, BIBLE_YEAR_SHELF_TITLE } from "./libraryCatalog";

/** Covers that exist outside the `devotionals` table, keyed by lower-cased title. */
const BUILT_IN_COVERS: Record<string, string> = {
  [BIBLE_YEAR_SHELF_TITLE.toLowerCase()]: BIBLE_YEAR_SHELF_COVER,
};

function normaliseTitle(title: string) {
  return title.trim().replace(/^["“”]+|["“”]+$/g, "").trim().toLowerCase();
}

export function resolveStudyActivityCover(
  title: string | null | undefined,
  catalogCovers: Record<string, string> = {},
): string | null {
  const raw = String(title ?? "").trim();
  if (!raw) return null;

  const exact = catalogCovers[raw];
  if (exact) return exact;

  const key = normaliseTitle(raw);
  if (BUILT_IN_COVERS[key]) return BUILT_IN_COVERS[key];

  for (const [catalogTitle, cover] of Object.entries(catalogCovers)) {
    if (cover && normaliseTitle(catalogTitle) === key) return cover;
  }

  return null;
}
