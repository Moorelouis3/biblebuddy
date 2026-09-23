// The printed editions of The Wisdom of Proverbs (2026-09-22).
// ONE place for everything product-related: order, prices, copy, images and
// Amazon links. The /books/wisdom-of-proverbs page and the event-page banner
// read from here.
//
// TO GO LIVE: paste Louis's real Amazon product links into `amazonUrl`.
// Never guess them. While a link is null that product's button reads
// "Coming soon to Amazon" and is not clickable, and the event-page banner
// stays hidden until the hardcover link is set.
//
// JOURNAL COVER: set `journal.image` once the real journal cover file is in
// /public/books/wisdom-of-proverbs/. Until then the card shows a plain
// "cover coming soon" frame - never the study book's artwork.

export type WisdomProductKey = "hardcover" | "paperback" | "journal";

export type WisdomProduct = {
  key: WisdomProductKey;
  label: string;
  title: string;
  edition: string;
  price: string;
  description: string;
  amazonUrl: string | null;
  image: string | null;
  ctaLabel: string;
  /** landing-analytics event name fired on the Amazon click */
  clickEvent: string;
  /** Shown on the books page. false keeps the product wired up but hidden. */
  visible: boolean;
};

export const WISDOM_BOOKS_PAGE_PATH = "/books/wisdom-of-proverbs";

export const WISDOM_BOOK_ASSETS = {
  /** "GO DEEPER - Get the Physical Book" banner (no button baked in). 2048x768 */
  promoBanner: "/books/wisdom-of-proverbs/get-the-physical-book-banner.webp",
  /** Real front cover of the study book. 900x1350 */
  cover: "/books/wisdom-of-proverbs/cover.webp",
  /** Social share image. 1200x630 */
  ogImage: "/books/wisdom-of-proverbs/og.jpg",
} as const;

// Order matters: hardcover is the primary product and always comes first.
export const WISDOM_OF_PROVERBS_PRODUCTS: Record<WisdomProductKey, WisdomProduct> = {
  hardcover: {
    key: "hardcover",
    label: "Hardcover",
    title: "The Wisdom of Proverbs",
    edition: "Hardcover",
    price: "$29.99",
    description:
      "The complete 31-day Wisdom of Proverbs study in a durable hardcover edition. Made for your bookshelf, quiet time, highlighting, note-taking, and years of returning to Proverbs.",
    amazonUrl: "https://www.amazon.com/dp/B0HHW7WXG7", // KDP hardcover, live (ASIN B0HHW7WXG7)
    image: WISDOM_BOOK_ASSETS.cover,
    ctaLabel: "Buy Hardcover on Amazon",
    clickEvent: "wisdom_hardcover_amazon_clicked",
    visible: true,
  },
  paperback: {
    key: "paperback",
    label: "Paperback",
    title: "The Wisdom of Proverbs",
    edition: "Paperback Edition",
    price: "$19.99",
    description:
      "The complete 31-day study in a flexible paperback edition. Read, highlight, take notes, and make the study your own.",
    amazonUrl: "https://www.amazon.com/dp/B0HKMDPG9X", // KDP paperback, live (ASIN B0HKMDPG9X)
    image: WISDOM_BOOK_ASSETS.cover,
    ctaLabel: "Buy Paperback on Amazon",
    clickEvent: "wisdom_paperback_amazon_clicked",
    visible: true,
  },
  journal: {
    key: "journal",
    label: "Companion Journal",
    title: "The Wisdom of Proverbs",
    edition: "Companion Journal",
    price: "$19.99",
    description:
      "A companion for readers who want more room to write, reflect, pray, and apply what they are learning throughout Proverbs.",
    amazonUrl: null, // Journal is still a KDP draft (2026-09-22) - add once it is live
    image: null, // TODO(Louis): real journal cover file
    ctaLabel: "Buy Journal on Amazon",
    clickEvent: "wisdom_journal_amazon_clicked",
    // Hidden until Louis says to add it (2026-09-22). Flip to true, add the
    // Amazon link and the cover image, and the page shows it again.
    visible: false,
  },
};

export const WISDOM_PRODUCT_ORDER: WisdomProductKey[] = ["hardcover", "paperback", "journal"];

/** The event-page banner only shows once the hardcover can be bought. */
export const WISDOM_BOOKS_ON_SALE = Boolean(WISDOM_OF_PROVERBS_PRODUCTS.hardcover.amazonUrl);

/** Where did this visit come from? ?src= (our own placements), UTM, or referrer. */
export function readWisdomVisitSource() {
  if (typeof window === "undefined") return { source: "Direct" };
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const placement = params.get("src");
  let referrerHost: string | null = null;
  try {
    referrerHost = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : null;
  } catch {
    referrerHost = null;
  }
  const source = placement || utmSource || referrerHost || "Direct";
  return {
    source,
    placement,
    utm_source: utmSource,
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    referrer_host: referrerHost,
  };
}

/** Sends a book event through the existing landing-analytics pipeline. */
export async function trackWisdomBookEvent(eventName: string, metadata: Record<string, unknown> = {}) {
  try {
    const visit = readWisdomVisitSource();
    let userId: string | null = null;
    try {
      // Loaded here, not at the top: this file is also read by the daily-post
      // cron on the server, which must not pull in the browser client.
      const { supabase } = await import("./supabaseClient");
      const { data } = await supabase.auth.getSession();
      userId = data.session?.user?.id ?? null;
    } catch {
      userId = null;
    }
    let sessionId = "";
    try {
      sessionId = window.localStorage.getItem("bb:landing-session-id") || "";
    } catch {
      sessionId = "";
    }
    void fetch("/api/landing-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        session_id: sessionId,
        user_id: userId,
        source: visit.source,
        referrer: document.referrer || null,
        page_path: `${window.location.pathname}${window.location.search}`,
        metadata: { ...visit, ...metadata },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* analytics never blocks the page */
  }
}
