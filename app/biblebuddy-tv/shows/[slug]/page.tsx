import Link from "next/link";
import BibleBuddyTvShowPageClient from "../../../../components/BibleBuddyTvShowPageClient";
import { getBibleBuddyTvTitle } from "../../../../lib/bibleBuddyTvContent";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BibleBuddyTvShowPage({ params }: PageProps) {
  const { slug } = await params;
  const title = getBibleBuddyTvTitle(slug);

  if (!title) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-gray-200 bg-white p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-violet-600">Bible Buddy TV</p>
          <h1 className="mt-3 text-3xl font-semibold">This title is not in the library yet.</h1>
          <p className="mt-3 text-gray-600">Head back to the Bible Buddy TV home and pick another shelf.</p>
          <Link
            href="/biblebuddy-tv"
            className="mt-6 inline-flex rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Back to Bible Buddy TV
          </Link>
        </div>
      </div>
    );
  }

  return <BibleBuddyTvShowPageClient title={title} />;
}
