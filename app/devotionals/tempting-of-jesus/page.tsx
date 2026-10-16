import type { Metadata } from "next";
import TemptingLandingPage from "@/components/tempting/TemptingLandingPage";

/**
 * The shareable Tempting of Jesus link. A server component purely so it can
 * carry its own Open Graph tags - /devotionals/[id] is "use client" and
 * therefore cannot, which is why every share of this study fell back to the
 * generic homepage card.
 *
 * Two things here are not optional, both copied from the Proverbs page because
 * they are forced by app/layout.tsx:
 *  - alternates.canonical, because the root canonical is pinned to the homepage,
 *    so a page that does not set its own self-canonicalises to "/".
 *  - other["og:image:secure_url"], because the root sets it to newsocialbanner.png
 *    and per-page openGraph does not replace it.
 */

const url = "https://www.mybiblebuddy.net/devotionals/tempting-of-jesus";
const image = "https://www.mybiblebuddy.net/og/tempting-of-jesus.png";
const title = "The Tempting of Jesus | Free 21-Day Bible Study";
const description =
  "Jesus faced the devil in the wilderness and beat every trick he had. Walk through exactly how, in a free 21-day study with Bible Buddy.";
const imageAlt = "The Tempting of Jesus — a free 21-day Bible study from Bible Buddy";

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
        alt: imageAlt,
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
    "twitter:image:alt": imageAlt,
    // Repeated from the root layout because a page's `other` replaces it rather
    // than merging with it.
    "fb:app_id": "1293695119276480",
  },
};

export default function Page() {
  return <TemptingLandingPage />;
}
