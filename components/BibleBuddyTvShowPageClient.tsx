"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BibleBuddyTvEpisodeModal from "./BibleBuddyTvEpisodeModal";
import { ACTION_TYPE } from "../lib/actionTypes";
import { logActionToMasterActions } from "../lib/actionRecorder";
import {
  bibleBuddyTvTitles,
  type BibleBuddyTvEpisode,
  type BibleBuddyTvTitle,
} from "../lib/bibleBuddyTvContent";
import { trackNavigationActionOnce } from "../lib/navigationActionTracker";
import { supabase } from "../lib/supabaseClient";
import { getVideoProgressForVideos, type VideoProgressRow } from "../lib/videoProgress";

const CAROLINA_BLUE = "#4B9CD3";
const CAROLINA_BLUE_SOFT = "#EAF5FC";
const CAROLINA_BLUE_BORDER = "#C8E2F3";
const MY_LIST_STORAGE_KEY = "bbtv-my-list";

interface BibleBuddyTvShowPageClientProps {
  title: BibleBuddyTvTitle;
}

export default function BibleBuddyTvShowPageClient({
  title,
}: BibleBuddyTvShowPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedEpisode, setSelectedEpisode] = useState<BibleBuddyTvEpisode | null>(null);
  const [openingEpisodeId, setOpeningEpisodeId] = useState<string | null>(null);
  const [videoProgressByEpisode, setVideoProgressByEpisode] = useState<Record<string, VideoProgressRow>>({});
  const [lastWatchedEpisodeId, setLastWatchedEpisodeId] = useState<string | null>(null);
  const [isInMyList, setIsInMyList] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [sharingEpisodeId, setSharingEpisodeId] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [handledEpisodeParam, setHandledEpisodeParam] = useState<string | null>(null);

  const featuredEpisode = title.episodes[0] ?? null;
  const continueEpisode =
    title.episodes.find((episode) => episode.id === lastWatchedEpisodeId) ??
    featuredEpisode ??
    null;
  const isMovie = title.contentType === "movie";
  const categoryLabel =
    title.category === "documentaries"
      ? "Documentary"
      : title.category === "sermons"
      ? "Sermon"
      : title.category === "bible-stories"
      ? "Animation"
      : title.category === "movies"
      ? "Movie"
      : "TV Show";
  const detailMeta = [title.year, title.rating];
  if (title.runtime && !["Documentary", "Documentary Special"].includes(title.runtime)) {
    detailMeta.push(title.runtime);
  }
  if (title.seasonsLabel && title.seasonsLabel !== title.runtime) {
    detailMeta.push(title.seasonsLabel);
  }
  const recommendationHeading =
    title.category === "documentaries"
      ? "Check Out More Documentaries"
      : title.category === "movies"
      ? "Check Out More Movies"
      : title.category === "tv"
      ? "Check Out More TV Shows"
      : title.category === "sermons"
      ? "Check Out More Sermons"
      : "Check Out More Animation";
  const relatedTitles = bibleBuddyTvTitles
    .filter(
      (item) =>
        item.slug !== title.slug &&
        item.episodes.length > 0 &&
        item.category === title.category &&
        item.badge !== "Coming Soon"
    )
    .slice(0, 3);

  const requestedEpisodeId = searchParams.get("episode");

  useEffect(() => {
    async function loadUserAndTrackTitle() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.id) return;

      const meta = (user.user_metadata || {}) as Record<string, string | undefined>;
      const resolvedName =
        meta.firstName ||
        meta.first_name ||
        (user.email ? user.email.split("@")[0] : null) ||
        "User";

      setUserId(user.id);
      setUserName(resolvedName);

      void trackNavigationActionOnce({
        userId: user.id,
        username: resolvedName,
        actionType: ACTION_TYPE.bible_buddy_tv_title_opened,
        actionLabel: `${categoryLabel}: ${title.title}`,
        dedupeKey: `bible-buddy-tv-title:${title.slug}`,
      }).catch((error) => {
        console.error("[NAV] Failed to track Bible Buddy TV title view:", error);
      });
    }

    void loadUserAndTrackTitle();
  }, [categoryLabel, title.slug, title.title]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(MY_LIST_STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as string[];
      setIsInMyList(Array.isArray(parsed) ? parsed.includes(title.id) : false);
    } catch (error) {
      console.error("[BibleBuddyTvShowPageClient] Could not load My List:", error);
    }
  }, [title.id]);

  useEffect(() => {
    if (!requestedEpisodeId) {
      setHandledEpisodeParam(null);
      return;
    }
    if (selectedEpisode || handledEpisodeParam === requestedEpisodeId) return;
    const requestedEpisode = title.episodes.find((episode) => episode.id === requestedEpisodeId && episode.available) ?? null;
    if (!requestedEpisode) return;
    setHandledEpisodeParam(requestedEpisodeId);
    void markEpisodeWatched(requestedEpisode);
  }, [requestedEpisodeId, selectedEpisode, handledEpisodeParam, title.episodes]);

  useEffect(() => {
    if (!userId) {
      setVideoProgressByEpisode({});
      setLastWatchedEpisodeId(null);
      return;
    }

    const currentUserId = userId;
    let cancelled = false;

    async function loadVideoProgress() {
      try {
        const rows = await getVideoProgressForVideos(
          currentUserId,
          title.episodes.filter((episode) => episode.youtubeUrl).map((episode) => episode.id),
        );
        if (cancelled) return;

        const byEpisode = rows.reduce<Record<string, VideoProgressRow>>((acc, row) => {
          acc[row.video_id] = row;
          return acc;
        }, {});

        setVideoProgressByEpisode(byEpisode);
        setLastWatchedEpisodeId(rows[0]?.video_id ?? null);
      } catch (error) {
        if (!cancelled) {
          console.error("[BibleBuddyTvShowPageClient] Could not load video progress:", error);
        }
      }
    }

    void loadVideoProgress();

    return () => {
      cancelled = true;
    };
  }, [title.episodes, userId]);

  async function ensureTrackingUser() {
    if (userId) {
      return { resolvedUserId: userId, resolvedUserName: userName };
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return { resolvedUserId: null, resolvedUserName: null };
    }

    const meta = (user.user_metadata || {}) as Record<string, string | undefined>;
    const resolvedName =
      meta.firstName ||
      meta.first_name ||
      (user.email ? user.email.split("@")[0] : null) ||
      "User";

    setUserId(user.id);
    setUserName(resolvedName);

    return { resolvedUserId: user.id, resolvedUserName: resolvedName };
  }

  function toggleMyList() {
    if (typeof window === "undefined") return;

    try {
      const saved = window.localStorage.getItem(MY_LIST_STORAGE_KEY);
      const current = saved ? ((JSON.parse(saved) as string[]) || []) : [];
      const next = current.includes(title.id)
        ? current.filter((id) => id !== title.id)
        : [...current, title.id];

      window.localStorage.setItem(MY_LIST_STORAGE_KEY, JSON.stringify(next));
      setIsInMyList(next.includes(title.id));
    } catch (error) {
      console.error("[BibleBuddyTvShowPageClient] Could not update My List:", error);
    }
  }

  async function markEpisodeWatched(episode: BibleBuddyTvEpisode) {
    setOpeningEpisodeId(episode.id);
    setSelectedEpisode(episode);
    setLastWatchedEpisodeId(episode.id);

    const { resolvedUserId, resolvedUserName } = await ensureTrackingUser();

    if (resolvedUserId) {
      const actionLabel = `${categoryLabel} • ${title.title} • ${episode.contentLabel || (isMovie ? "Movie" : `Episode ${episode.episodeNumber}`)} • ${episode.title}`;
      void logActionToMasterActions(
        resolvedUserId,
        ACTION_TYPE.bible_buddy_tv_video_started,
        actionLabel,
        resolvedUserName
      ).catch((error) => {
        console.error("[NAV] Failed to track Bible Buddy TV video start:", error);
      });
    }
  }

  async function shareEpisodeToGroup(episode: BibleBuddyTvEpisode) {
    if (sharingEpisodeId) return;
    setSharingEpisodeId(episode.id);
    setShareMessage(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const token = session?.access_token;
      if (!token) {
        throw new Error("Sign in first to share Bible Buddy TV videos.");
      }

      const response = await fetch("/api/biblebuddy-tv/share-to-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          showSlug: title.slug,
          episodeId: episode.id,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error || "Could not share this video right now.");
      }

      setShareMessage("Shared to the group feed.");
    } catch (error) {
      setShareMessage(error instanceof Error ? error.message : "Could not share this video right now.");
    } finally {
      setSharingEpisodeId(null);
    }
  }

  async function refreshEpisodeProgress() {
    if (!userId) return;
    try {
      const rows = await getVideoProgressForVideos(
        userId,
        title.episodes.filter((episode) => episode.youtubeUrl).map((episode) => episode.id),
      );
      const byEpisode = rows.reduce<Record<string, VideoProgressRow>>((acc, row) => {
        acc[row.video_id] = row;
        return acc;
      }, {});
      setVideoProgressByEpisode(byEpisode);
      setLastWatchedEpisodeId(rows[0]?.video_id ?? null);
    } catch (error) {
      console.error("[BibleBuddyTvShowPageClient] Could not refresh video progress:", error);
    }
  }

  useEffect(() => {
    if (!selectedEpisode) {
      setOpeningEpisodeId(null);
      return;
    }

    const timeout = window.setTimeout(() => {
      setOpeningEpisodeId(null);
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [selectedEpisode]);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link href="/biblebuddy-tv" className="inline-block text-blue-600 hover:underline">
          &larr; Back to Bible Buddy TV
        </Link>

        <h1 className="mb-2 mt-4 text-3xl font-bold">{title.title}</h1>
        <p className="mb-4 text-gray-600">{detailMeta.join(" • ")}</p>

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

              <div
                className="mt-5 rounded-xl border px-4 py-3"
                style={{ borderColor: CAROLINA_BLUE_BORDER, backgroundColor: CAROLINA_BLUE_SOFT }}
              >
                <p className="text-sm font-semibold" style={{ color: CAROLINA_BLUE }}>
                  {isMovie ? "Movie Tone" : "Show Tone"}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-700">{title.vibe}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {continueEpisode?.available ? (
                  <button
                    type="button"
                    onClick={() => void markEpisodeWatched(continueEpisode)}
                    className="rounded-lg px-5 py-2.5 text-sm font-medium text-white transition"
                    style={{ backgroundColor: CAROLINA_BLUE }}
                  >
                    {openingEpisodeId === continueEpisode.id
                      ? "Opening..."
                      : isMovie
                        ? "\u25B6 Watch Now"
                        : `Watch ${continueEpisode.contentLabel || `Episode ${continueEpisode.episodeNumber}`}`}
                  </button>
                ) : null}
                {continueEpisode?.available ? (
                  <button
                    type="button"
                    onClick={() => void shareEpisodeToGroup(continueEpisode)}
                    disabled={sharingEpisodeId === continueEpisode.id}
                    className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {sharingEpisodeId === continueEpisode.id ? "Sharing..." : "Share to Group"}
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={toggleMyList}
                  className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                >
                  {isInMyList ? "✓ In My List" : "+ My List"}
                </button>
              </div>
              {shareMessage ? (
                <p className={`mt-3 text-sm ${shareMessage === "Shared to the group feed." ? "text-emerald-700" : "text-rose-600"}`}>
                  {shareMessage}
                </p>
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
                onClick={() => episode.available && void markEpisodeWatched(episode)}
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
                          ? videoProgressByEpisode[episode.id]?.completed
                            ? "bg-emerald-100 text-emerald-700"
                            : ""
                          : "bg-gray-200 text-gray-700"
                      }`}
                      style={
                        episode.available && !videoProgressByEpisode[episode.id]?.completed
                          ? { backgroundColor: CAROLINA_BLUE_SOFT, color: CAROLINA_BLUE }
                          : undefined
                      }
                    >
                      {episode.available
                        ? openingEpisodeId === episode.id
                          ? "Opening..."
                          : videoProgressByEpisode[episode.id]?.completed
                            ? "Completed"
                            : (videoProgressByEpisode[episode.id]?.current_time || 0) > 0
                              ? "Resume"
                              : "Watch"
                        : "Soon"}
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
            <h2 className="mb-4 text-xl font-bold">{recommendationHeading}</h2>
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
        onShare={shareEpisodeToGroup}
        sharingEpisodeId={sharingEpisodeId}
        onClose={() => {
          setSelectedEpisode(null);
          if (requestedEpisodeId) {
            router.replace(`/biblebuddy-tv/shows/${title.slug}`, { scroll: false });
          }
          void refreshEpisodeProgress();
        }}
      />
    </div>
  );
}


