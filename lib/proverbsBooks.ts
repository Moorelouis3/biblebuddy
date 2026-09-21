// The printed Wisdom of Proverbs books (2026-09-21).
// Flow: event page promo -> /events/wisdom-of-proverbs/books -> Amazon.
// Only the books page links to Amazon. Everything about the community study
// itself stays free inside Bible Buddy.
//
// TO GO LIVE: paste the real Amazon product links below. Until a link is set,
// that product's button shows "Amazon link coming soon" instead of a link.
// Never guess these URLs.

/** Amazon page for "The Wisdom of Proverbs: A 31-Day Study of the Book of Proverbs". */
export const PROVERBS_STUDY_GUIDE_AMAZON_URL: string | null = null;

/** Amazon page for "The Wisdom of Proverbs Journal" (a separate product). */
export const PROVERBS_JOURNAL_AMAZON_URL: string | null = null;

/** Journal cover image in /public. Null until the cover is ready; the page
 *  then shows a simple styled journal cover in its place. */
export const PROVERBS_JOURNAL_COVER_IMAGE: string | null = null;

/** The event-page promo only shows once at least one book can be bought. */
export const PROVERBS_BOOKS_ON_SALE = Boolean(PROVERBS_STUDY_GUIDE_AMAZON_URL || PROVERBS_JOURNAL_AMAZON_URL);

export const PROVERBS_BOOKS_PAGE_PATH = "/events/wisdom-of-proverbs/books";

export const PROVERBS_BOOK_IMAGES = {
  /** "Take the study off the screen." - event page promo. 1774x887 */
  eventPromoBanner: "/events/proverbs-books/take-the-study-off-the-screen.webp",
  /** "More Than a Study. A Lasting Experience." - books page hero. 1774x887 */
  booksPageBanner: "/events/proverbs-books/more-than-a-study.webp",
  /** Study Guide front cover. 720x1080 */
  studyGuideCover: "/events/proverbs-books/study-guide-cover.webp",
} as const;

export function trackBooksEvent(eventName: string, metadata: Record<string, unknown> = {}) {
  try {
    void fetch("/api/landing-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        page_path: `${window.location.pathname}${window.location.search}`,
        referrer: document.referrer || null,
        metadata,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* analytics never blocks the page */
  }
}
