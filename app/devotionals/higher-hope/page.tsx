import type { Metadata } from "next";
import HigherHopeLandingPage from "@/components/higherhope/HigherHopeLandingPage";

/**
 * The shareable Higher Hope link (2026-10-24). Same shape as
 * app/devotionals/wisdom-of-proverbs/page.tsx, and for the same reasons: a
 * server component purely so it can carry its own Open Graph tags, because
 * /devotionals/[id] is "use client" and cannot.
 *
 * Two things here are not optional, both learned from app/layout.tsx:
 *  - alternates.canonical, because the root canonical is pinned to the homepage,
 *    so a page that does not set its own self-canonicalises to "/".
 *  - other["og:image:secure_url"], because the root sets it to newsocialbanner.png
 *    and per-page openGraph does not replace it.
 */

const url = "https://www.mybiblebuddy.net/devotionals/higher-hope";
const image = "https://www.mybiblebuddy.net/og/higher-hope.png";
const title = "Higher Hope | A Free 60-Day Study for Anyone Fighting Addiction";
const description =
  "Sixty days through addiction with God's word. Free, private and self-paced - for anyone fighting something they cannot put down, and the people who love them.";
const alt = "Higher Hope — a free 60-day journey through addiction with God's word, from Bible Buddy";

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
    images: [{ url: image, width: 1200, height: 630, type: "image/png", alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
  other: {
    "og:image:secure_url": image,
    "twitter:image:alt": alt,
    // Repeated from the root layout because a page's `other` replaces it rather
    // than merging with it.
    "fb:app_id": "1293695119276480",
  },
};

export default function Page() {
  return <HigherHopeLandingPage />;
}
