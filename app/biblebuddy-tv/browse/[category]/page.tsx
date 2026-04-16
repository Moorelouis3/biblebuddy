import { notFound } from "next/navigation";
import BibleBuddyTvBrowsePageClient from "../../../../components/BibleBuddyTvBrowsePageClient";
import type { BibleBuddyTvBrowseKey } from "../../../../lib/bibleBuddyTvBrowse";

const VALID_BROWSE_KEYS: Array<Exclude<BibleBuddyTvBrowseKey, "home">> = [
  "my-list",
  "sermons",
  "movies",
  "documentaries",
  "bible-stories",
  "tv",
];

export default async function BibleBuddyTvBrowseCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ topic?: string }>;
}) {
  const { category } = await params;
  const { topic } = await searchParams;

  if (!VALID_BROWSE_KEYS.includes(category as Exclude<BibleBuddyTvBrowseKey, "home">)) {
    notFound();
  }

  return (
    <BibleBuddyTvBrowsePageClient
      browseKey={category as Exclude<BibleBuddyTvBrowseKey, "home">}
      initialSubcategory={topic}
    />
  );
}
