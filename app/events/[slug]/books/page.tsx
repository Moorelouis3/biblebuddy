import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProverbsBooksPage from "../../../../components/ProverbsBooksPage";
import { getCommunityEvent } from "../../../../lib/communityEvents";

// Printed-books page for a community event. Only events with a
// printBooksPath (today: The Wisdom of Proverbs) have one.

type Params = { slug: string };

export const metadata: Metadata = {
  title: "The Wisdom of Proverbs in Print | Bible Buddy",
  description:
    "The Wisdom of Proverbs study guide and companion journal: the 31-day Bible Buddy study as a physical book you can read, highlight, write in, and keep.",
};

export default async function EventBooksPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const event = getCommunityEvent(slug);
  if (!event?.printBooksPath) notFound();
  return <ProverbsBooksPage eventSlug={event.slug} />;
}
