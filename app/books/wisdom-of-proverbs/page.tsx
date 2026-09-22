import type { Metadata } from "next";
import WisdomOfProverbsBooksPage from "../../../components/wisdom-books/WisdomOfProverbsBooksPage";
import { WISDOM_BOOK_ASSETS, WISDOM_BOOKS_PAGE_PATH } from "../../../lib/wisdomOfProverbsProducts";

// Standalone sales page for the printed Wisdom of Proverbs editions. Linked
// from the event page (?src=proverbs_event_page), social, email and the blog.

const title = "The Wisdom of Proverbs: Hardcover, Paperback & Journal | Bible Buddy";
const description =
  "Take the 31-day Wisdom of Proverbs study with you. The hardcover, paperback and companion journal by Louis Moore III, a Bible Buddy study.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `https://www.mybiblebuddy.net${WISDOM_BOOKS_PAGE_PATH}` },
  openGraph: {
    title,
    description,
    url: `https://www.mybiblebuddy.net${WISDOM_BOOKS_PAGE_PATH}`,
    images: [{ url: WISDOM_BOOK_ASSETS.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description, images: [WISDOM_BOOK_ASSETS.ogImage] },
};

export default function Page() {
  return <WisdomOfProverbsBooksPage />;
}
