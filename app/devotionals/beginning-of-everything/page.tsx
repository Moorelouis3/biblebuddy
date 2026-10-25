import type { Metadata } from "next";
import BeginningOfEverythingLandingPage from "@/components/beginning/BeginningOfEverythingLandingPage";

/**
 * The shareable link for The Beginning of Everything (2026-10-25). Same shape
 * as app/devotionals/higher-hope/page.tsx, and for the same reason: a server
 * component purely so it can carry its own Open Graph tags, because
 * /devotionals/[id] is "use client" and cannot.
 *
 * Two things here are not optional, both learned from app/layout.tsx:
 *  - alternates.canonical, because the root canonical is pinned to the homepage,
 *    so a page that does not set its own self-canonicalises to "/".
 *  - other["og:image:secure_url"], because the root sets it to newsocialbanner.png
 *    and per-page openGraph does not replace it.
 */

const url = "https://www.mybiblebuddy.net/devotionals/beginning-of-everything";
const image = "https://www.mybiblebuddy.net/og/beginning-of-everything.png";
const title = "The Beginning of Everything | A Free 21-Day Study of Genesis 1-8";
const description =
  "Twenty one days through the first eight chapters of the Bible. Creation, the garden, the fall, Cain and Abel, and the flood. Free, self-paced, and written for beginners. Opens 1 November.";
const alt = "The Beginning of Everything — a free 21-day study of Genesis 1 to 8, from Bible Buddy";

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
  return <BeginningOfEverythingLandingPage />;
}
