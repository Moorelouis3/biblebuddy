"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import BibleBuddyTvEpisodeModal from "./BibleBuddyTvEpisodeModal";
import {
  bibleBuddyTvTitles,
  type BibleBuddyTvEpisode,
  type BibleBuddyTvTitle,
} from "../lib/bibleBuddyTvContent";

const CAROLINA_BLUE = "#4B9CD3";
const CAROLINA_BLUE_SOFT = "#EAF5FC";
const CAROLINA_BLUE_BORDER = "#C8E2F3";

interface BibleBuddyTvShowPageClientProps {
  title: BibleBuddyTvTitle;
}

export default function BibleBuddyTvShowPageClient({
  title,
}: BibleBuddyTvShowPageClientProps) {
  const [selectedEpisode, setSelectedEpisode] = useState<BibleBuddyTvEpisode | null>(null);
  const [watchedEpisodeIds, setWatchedEpisodeIds] = useState<string[]>([]);
  const [lastWatchedEpisodeId, setLastWatchedEpisodeId] = useState<string | null>(null);

  const storageKey = useMemo(() => `bbtv-progress:${title.slug}`, [title.slug]);
  const featuredEpisode = title.episodes[0] ?? null;
  const continueEpisode =
    title.episodes.find((episode) => episode.id === lastWatchedEpisodeId) ??
    featuredEpisode ??
    null;
  const isMovie = title.contentType === "movie";
  const relatedTitles = bibleBuddyTvTitles
    .filter((item) => item.slug !== title.slug && item.episodes.length > 0)
    .slice(0, 3);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return;
      const parsed = JSON.parse(saved) as { watchedEpisodeIds?: string[]; lastWatchedEpisodeId?: string | null };
      setWatchedEpisodeIds(parsed.watchedEpisodeIds || []);
      setLastWatchedEpisodeId(parsed.lastWatchedEpisodeId || null);
    } catch (error) {
      console.error("[BibleBuddyTvShowPageClient] Could not load local progress:", error);
    }
  }, [storageKey]);

  function markEpisodeWatched(episode: BibleBuddyTvEpisode) {
    setSelectedEpisode(episode);

    const nextWatchedIds = Array.from(new Set([...watchedEpisodeIds, episode.id]));
    setWatchedEpisodeIds(nextWatchedIds);
    setLastWatchedEpisodeId(episode.id);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          watchedEpisodeIds: nextWatchedIds,
          lastWatchedEpisodeId: episode.id,
        })
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link href="/biblebuddy-tv" className="inline-block text-blue-600 hover:underline">
          &larr; Back to Bible Buddy TV
        </Link>

        <h1 className="mb-2 mt-4 text-3xl font-bold">{title.title}</h1>
        <p className="mb-4 text-gray-600">
          {title.year} • {title.rating} • {title.runtime} • {title.seasonsLabel}
        </p>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-6 md:grid-cols-[240px_1fr] md:items-start">
            <div className="flex justify-center md:justify-start">
              <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                <Image
                  src={title.poster}
                  alt={`${title.title} poster`}
                  width={240}
                  height={300}
                  className="h-auto w-[220px] rounded-lg object-contain"
                />
              </div>
            </div>

            <div>
              <div
                className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: CAROLINA_BLUE_SOFT, color: CAROLINA_BLUE }}
              >
                {title.badge}
              </div>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-700">{title.overview}</p>

              {title.searchTags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {title.searchTags.slice(0, 8).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div
                className="mt-5 rounded-xl border px-4 py-3"
                style={{ borderColor: CAROLINA_BLUE_BORDER, backgroundColor: CAROLINA_BLUE_SOFT }}
              >
                <p className="text-sm font-semibold" style={{ color: CAROLINA_BLUE }}>
                  {isMovie ? "Movie Tone" : "Show Tone"}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-700">{title.vibe}</p>
              </div>

              {continueEpisode?.available ? (
                <button
                  type="button"
                  onClick={() => markEpisodeWatched(continueEpisode)}
                  className="mt-5 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition"
                  style={{ backgroundColor: CAROLINA_BLUE }}
                >
                  {isMovie ? "\u25B6 Watch Now" : `Watch ${continueEpisode.contentLabel || `Episode ${continueEpisode.episodeNumber}`}`}
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {!isMovie ? (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">{isMovie ? "Movie" : `${title.seasonsLabel} Episodes`}</h2>
          <div className="space-y-3">
            {title.episodes.map((episode) => (
              <button
                key={episode.id}
                type="button"
                onClick={() => episode.available && markEpisodeWatched(episode)}
                disabled={!episode.available}
                className={`w-full rounded-xl border p-3 text-left transition ${
                  episode.available
                    ? "cursor-pointer border-gray-200 bg-white hover:bg-[#f5fbff]"
                    : "cursor-not-allowed border-gray-200 bg-gray-50 opacity-70"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg sm:w-44">
                    <Image
                      src={episode.thumbnail}
                      alt={`${episode.title} thumbnail`}
                      fill
                      className="object-cover"
                      sizes="176px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">
                        {episode.contentLabel || (isMovie ? "Movie" : `Episode ${episode.episodeNumber}`)}
                      </span>
                      <span className="text-sm text-gray-500">• {episode.duration}</span>
                      {!episode.available ? (
                        <span className="rounded-full bg-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-700">
                          Coming Soon
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900">{episode.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">{episode.summary}</p>
                  </div>

                  <div className="shrink-0">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${
                        episode.available
                          ? watchedEpisodeIds.includes(episode.id)
                            ? "bg-emerald-100 text-emerald-700"
                            : ""
                          : "bg-gray-200 text-gray-700"
                      }`}
                      style={
                        episode.available && !watchedEpisodeIds.includes(episode.id)
                          ? { backgroundColor: CAROLINA_BLUE_SOFT, color: CAROLINA_BLUE }
                          : undefined
                      }
                    >
                      {episode.available ? (watchedEpisodeIds.includes(episode.id) ? "Watched" : "Watch") : "Soon"}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          </div>
        ) : null}

        {relatedTitles.length > 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">More in Bible Buddy TV</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
              {relatedTitles.map((relatedTitle) => (
                <Link key={relatedTitle.id} href={`/biblebuddy-tv/shows/${relatedTitle.slug}`} className="block">
                  <div className="cursor-pointer rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-xl md:p-4">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                      <Image
                        src={relatedTitle.poster}
                        alt={`${relatedTitle.title} poster`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 45vw, 220px"
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-semibold" style={{ color: CAROLINA_BLUE }}>
                        {relatedTitle.badge}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-gray-900 md:text-lg">{relatedTitle.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-gray-700 md:text-sm">{relatedTitle.logline}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <BibleBuddyTvEpisodeModal
        title={title}
        episode={selectedEpisode}
        isOpen={selectedEpisode !== null}
        onClose={() => setSelectedEpisode(null)}
      />
    </div>
  );
}


