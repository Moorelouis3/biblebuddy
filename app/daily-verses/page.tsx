"use client";

/**
 * Previous Daily Verses (2026-09-13). Every published Daily Verse stays in
 * verse_of_the_day_entries after its day, so this is just that table, newest
 * first, 30 at a time. Tapping one opens the same Daily Verse popup the home
 * screen uses. /daily-verses?date=YYYY-MM-DD opens that day's popup directly.
 */

import Link from "next/link";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VerseOfTheDayModal from "../../components/VerseOfTheDayModal";
import { fetchBookmarkedIds, onBookmarkChange } from "../../lib/bookmarks";
import { useSupabaseUser } from "../../lib/useSupabaseUser";
import {
  fetchVotdArchive,
  fetchVotdEntryByDate,
  getVotdLocalDayKey,
  trackVotdEvent,
  type VerseOfTheDayEntry,
} from "../../lib/verseOfTheDayContent";

const PAGE_SIZE = 30;

/** "September 12" - the year is added for today's card and older years. */
function fullDate(dateKey: string, withYear = false) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const showYear = withYear || y !== new Date().getFullYear();
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    ...(showYear ? { year: "numeric" as const } : {}),
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, (m || 1) - 1, d || 1)));
}

function DailyVersesArchive() {
  const { userId, loading: userLoading } = useSupabaseUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const todayKey = useRef(getVotdLocalDayKey()).current;

  const [entries, setEntries] = useState<VerseOfTheDayEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<VerseOfTheDayEntry | null>(null);
  const trackedOpen = useRef(false);

  const loadPage = useCallback(
    async (offset: number) => {
      const rows = await fetchVotdArchive(todayKey, PAGE_SIZE, offset);
      setEntries((prev) => (offset === 0 ? rows : [...prev, ...rows]));
      setHasMore(rows.length === PAGE_SIZE);
      return rows;
    },
    [todayKey],
  );

  useEffect(() => {
    void loadPage(0).then(() => setLoaded(true));
  }, [loadPage]);

  useEffect(() => {
    if (userLoading || trackedOpen.current) return;
    trackedOpen.current = true;
    trackVotdEvent("daily_verse_archive_opened", { source: "archive" }, userId);
  }, [userId, userLoading]);

  // Bookmark badges for what is on screen.
  useEffect(() => {
    if (!userId || !entries.length) return;
    void fetchBookmarkedIds(
      userId,
      "daily_verse",
      entries.map((entry) => entry.id),
    ).then(setSaved);
  }, [userId, entries]);

  useEffect(
    () =>
      onBookmarkChange((detail) => {
        if (detail.contentType !== "daily_verse") return;
        setSaved((prev) => {
          const next = new Set(prev);
          if (detail.bookmarked) next.add(detail.contentId);
          else next.delete(detail.contentId);
          return next;
        });
      }),
    [],
  );

  // Deep link: ?date=YYYY-MM-DD opens that verse's popup.
  const dateParam = searchParams.get("date");
  useEffect(() => {
    if (!dateParam || !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) return;
    void fetchVotdEntryByDate(dateParam).then((row) => {
      if (row) setOpen(row);
    });
  }, [dateParam]);

  function openEntry(entry: VerseOfTheDayEntry) {
    setOpen(entry);
    router.replace(`/daily-verses?date=${entry.scheduled_date}`, { scroll: false });
  }

  function closeEntry() {
    setOpen(null);
    router.replace("/daily-verses", { scroll: false });
  }

  async function loadMore() {
    setLoadingMore(true);
    await loadPage(entries.length);
    setLoadingMore(false);
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
      <h1 className="text-2xl font-black text-[var(--bb-text-primary,#111827)]">Daily Verses</h1>
      <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
        Revisit previous verses from Bible Buddy.
      </p>

      {!loaded ? (
        <p className="mt-8 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="mt-8 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">No Daily Verses yet.</p>
      ) : (
        <ol className="mt-5 space-y-3">
          {entries.map((entry) => {
            const isToday = entry.scheduled_date === todayKey;
            return (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => openEntry(entry)}
                  className="block w-full rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.995]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2563eb)]">
                      {isToday ? `Today · ${fullDate(entry.scheduled_date, true)}` : fullDate(entry.scheduled_date)}
                    </p>
                    {saved.has(entry.id) ? (
                      <span className="text-xs font-black text-[var(--bb-accent,#2563eb)]" aria-label="Bookmarked">
                        🔖 Saved
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 line-clamp-2 font-serif text-[16px] font-bold leading-snug text-[var(--bb-text-primary,#111827)]">
                    &ldquo;{entry.verse_text}&rdquo;
                  </p>
                  <p className="mt-1.5 text-[13px] font-black text-[var(--bb-text-secondary,#4b5563)]">{entry.reference}</p>
                </button>
              </li>
            );
          })}
        </ol>
      )}

      {hasMore ? (
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => void loadMore()}
            disabled={loadingMore}
            className="rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-6 py-2.5 text-sm font-black text-[var(--bb-text-primary,#111827)] disabled:opacity-50"
          >
            {loadingMore ? "Loading..." : "Show older verses"}
          </button>
        </div>
      ) : null}

      <div className="mt-6 text-center">
        <Link href="/bookmarks" className="text-sm font-bold text-[var(--bb-accent,#2563eb)] hover:underline">
          🔖 Your Bookmarks
        </Link>
      </div>

      <VerseOfTheDayModal
        entry={open}
        userId={userId}
        source="archive"
        sequence={entries}
        onSelect={openEntry}
        onClose={closeEntry}
        onViewArchive={closeEntry}
      />
    </div>
  );
}

export default function DailyVersesPage() {
  return (
    <Suspense fallback={null}>
      <DailyVersesArchive />
    </Suspense>
  );
}
