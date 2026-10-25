import type { Metadata } from "next";
import BibleInOneYearLandingPage from "@/components/bibleinoneyear/BibleInOneYearLandingPage";

/**
 * The shareable Bible in One Year link (2026-10-25). Same shape as
 * app/devotionals/higher-hope/page.tsx and app/devotionals/wisdom-of-proverbs/
 * page.tsx, and for the same reason: a server component purely so it can carry
 * its own Open Graph tags, because the landing component is "use client" and
 * cannot.
 *
 * At /bible-in-one-year rather than under /devotionals/, because this is a
 * reading plan with its own tables and its own plan page - there is no
 * devotionals row behind it.
 *
 * Two things here are not optional, both learned from app/layout.tsx:
 *  - alternates.canonical, because the root canonical is pinned to the homepage,
 *    so a page that does not set its own self-canonicalises to "/".
 *  - other["og:image:secure_url"], because the root sets it to newsocialbanner.png
 *    and per-page openGraph does not replace it.
 */

const url = "https://www.mybiblebuddy.net/bible-in-one-year";
const image = "https://www.mybiblebuddy.net/og/bible-in-one-year.png";
const title = "Bible in One Year | A Free 365-Day Journey Through God's Word";
const description =
  "Read the whole Bible in a year, with study notes that explain every day as you go. Free, self-paced, and nothing locks or expires if you fall behind.";
const alt = "Bible in One Year — a free 365-day journey through God's word, from Bible Buddy";

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
  return <BibleInOneYearLandingPage />;
}
