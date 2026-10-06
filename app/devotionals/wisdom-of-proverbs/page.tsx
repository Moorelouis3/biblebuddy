import type { Metadata } from "next";
import ProverbsLandingPage from "@/components/proverbs/ProverbsLandingPage";

/**
 * The shareable Proverbs link. A server component purely so it can carry its own
 * Open Graph tags - /events/[slug] and /devotionals/[id] are both "use client"
 * and therefore cannot, which is why every Proverbs share showed the generic
 * homepage card until now (2026-10-06).
 *
 * Two things here are not optional, both learned from app/layout.tsx:
 *  - alternates.canonical, because the root canonical is pinned to the homepage,
 *    so a page that does not set its own self-canonicalises to "/".
 *  - other["og:image:secure_url"], because the root sets it to newsocialbanner.png
 *    and per-page openGraph does not replace it. /books/wisdom-of-proverbs already
 *    ships that mismatch; this page should not.
 */

const url = "https://www.mybiblebuddy.net/devotionals/wisdom-of-proverbs";
const image = "https://www.mybiblebuddy.net/og/wisdom-of-proverbs.png";
const title = "The Wisdom of Proverbs | Free 31-Day Bible Study";
const description =
  "Understand Proverbs and apply God's wisdom to your life. Start the free 31-day study with Bible Buddy.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: "Bible Buddy",
    type: "website",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "The Wisdom of Proverbs — a free 31-day Bible study from Bible Buddy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
  other: {
    "og:image:secure_url": image,
    "twitter:image:alt": "The Wisdom of Proverbs — a free 31-day Bible study from Bible Buddy",
    // Repeated from the root layout because a page's `other` replaces it rather
    // than merging with it.
    "fb:app_id": "1293695119276480",
  },
};

export default function Page() {
  return <ProverbsLandingPage />;
}
