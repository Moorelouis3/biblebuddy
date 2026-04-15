import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  bibleBuddyTvSermonTopics,
  bibleBuddyTvTitles,
  getBibleBuddyTvSermonTopicLabel,
  type BibleBuddyTvSermonTopic,
} from "../../../../lib/bibleBuddyTvContent";

const CAROLINA_BLUE = "#4B9CD3";

export default async function BibleBuddyTvSermonTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const normalizedTopic = topic as BibleBuddyTvSermonTopic;
  const validTopic = bibleBuddyTvSermonTopics.some((item) => item.id === normalizedTopic);

  if (!validTopic) {
    notFound();
  }

  const sermons = bibleBuddyTvTitles.filter(
    (title) =>
      title.category === "sermons" &&
      title.badge !== "Coming Soon" &&
      title.sermonTopics?.includes(normalizedTopic)
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link href="/biblebuddy-tv" className="text-sm font-medium text-blue-600 hover:underline">
          &larr; Back to Bible Buddy TV
        </Link>

        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold" style={{ color: CAROLINA_BLUE }}>
            Sermon Topic
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">{getBibleBuddyTvSermonTopicLabel(normalizedTopic)}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
            Sermons in Bible Buddy TV that speak directly to {getBibleBuddyTvSermonTopicLabel(normalizedTopic).toLowerCase()}.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sermons.map((sermon) => (
            <Link
              key={sermon.id}
              href={`/biblebuddy-tv/shows/${sermon.slug}`}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={sermon.poster}
                  alt={`${sermon.title} poster`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: CAROLINA_BLUE }}>
                  Sermon
                </p>
                <h2 className="mt-1 text-lg font-bold text-gray-900">{sermon.title}</h2>
                <p className="mt-2 text-sm text-gray-500">
                  {sermon.year} • {sermon.runtime}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{sermon.logline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
