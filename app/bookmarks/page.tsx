"use client";

/**
 * Bookmarks - everything the user has saved (2026-09-13). Reads the generic
 * user_bookmarks table; Daily Verses are the only saved type today, and each
 * new type gets its own section here. Saved verses open in the same Daily
 * Verse popup as everywhere else.
 */

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import VerseOfTheDayModal from "../../components/VerseOfTheDayModal";
import { listBookmarks, onBookmarkChange, setBookmark } from "../../lib/bookmarks";
import { useSupabaseUser } from "../../lib/useSupabaseUser";
import {
  fetchVotdEntriesByIds,
  fetchVotdEntryByDate,
  getVotdLocalDayKey,
  trackVotdEvent,
  type VerseOfTheDayEntry,
} from "../../lib/verseOfTheDayContent";

const PAGE_SIZE = 30;

function fullDate(dateKey: string) {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(y, (m || 1) - 1, d || 1)))
    .toUpperCase();
}

export default function BookmarksPage() {
  const { userId, loading: userLoading } = useSupabaseUser();
  const [verses, setVerses] = useState<VerseOfTheDayEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<{ entry: VerseOfTheDayEntry; source: "bookmarks" | "today" } | null>(null);
  const tracked = useRef(false);

  const loadPage = useCallback(
    async (from: number) => {
      if (!userId) return;
      try {
        const rows = await listBookmarks(userId, "daily_verse", PAGE_SIZE, from);
        const entries = await fetchVotdEntriesByIds(rows.map((row) => row.content_id));
        const byId = new Map(entries.map((entry) => [entry.id, entry]));
        // Keep bookmark order (most recently saved first).
        const ordered = rows.map((row) => byId.get(row.content_id)).filter(Boolean) as VerseOfTheDayEntry[];
        setVerses((prev) => (from === 0 ? ordered : [...prev, ...ordered]));
        setHasMore(rows.length === PAGE_SIZE);
        setOffset(from + rows.length);
        setError(null);
      } catch {
        setError("Could not load your bookmarks. Refresh the page to try again.");
      }
    },
    [userId],
  );

  useEffect(() => {
    if (userLoading) return;
    if (!userId) {
      setLoaded(true);
      return;
    }
    void loadPage(0).then(() => setLoaded(true));
    if (!tracked.current) {
      tracked.current = true;
      trackVotdEvent("bookmarks_page_opened", { source: "bookmarks" }, userId);
    }
  }, [userId, userLoading, loadPage]);

  // Saved or removed somewhere else on the page (e.g. inside the popup).
  useEffect(
    () =>
      onBookmarkChange((detail) => {
        if (detail.contentType !== "daily_verse") return;
        if (!detail.bookmarked) {
          setVerses((prev) => prev.filter((entry) => entry.id !== detail.contentId));
          setOffset((prev) => Math.max(0, prev - 1));
        } else {
          void fetchVotdEntriesByIds([detail.contentId]).then(([entry]) => {
            if (entry) setVerses((prev) => (prev.some((item) => item.id === entry.id) ? prev : [entry, ...prev]));
          });
        }
      }),
    [],
  );

  async function remove(entry: VerseOfTheDayEntry) {
    if (!userId) return;
    const ok = await setBookmark(userId, "daily_verse", entry.id, false);
    if (!ok) {
      setError("Could not remove that bookmark. Please try again.");
      return;
    }
    trackVotdEvent(
      "daily_verse_unbookmarked",
      { daily_verse_id: entry.id, date: entry.scheduled_date, reference: entry.reference, source: "bookmarks" },
      userId,
    );
  }

  async function openToday() {
    const today = await fetchVotdEntryByDate(getVotdLocalDayKey());
    if (today) setOpen({ entry: today, source: "today" });
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
      <h1 className="text-2xl font-black text-[var(--bb-text-primary,#111827)]">Bookmarks</h1>
      <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
        Everything you&apos;ve saved in Bible Buddy.
      </p>

      {error ? <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}

      {!loaded ? (
        <p className="mt-8 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">Loading...</p>
      ) : !userId ? (
        <div className="mt-8 rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-8 text-center">
          <p className="text-3xl">🔖</p>
          <p className="mt-2 text-lg font-black text-[var(--bb-text-primary,#111827)]">Sign in to see your bookmarks</p>
          <Link
            href="/login?next=/bookmarks"
            className="mt-5 inline-block rounded-full bg-[var(--bb-button,#2563eb)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)]"
          >
            Sign in
          </Link>
        </div>
      ) : verses.length === 0 ? (
        <div className="mt-8 rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-8 text-center">
          <p className="text-4xl">🔖</p>
          <p className="mt-2 text-lg font-black text-[var(--bb-text-primary,#111827)]">No bookmarks yet</p>
          <p className="mt-2 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
            Save verses you want to come back to and they&apos;ll appear here.
          </p>
          <button
            type="button"
            onClick={() => void openToday()}
            className="mt-5 rounded-full bg-[var(--bb-button,#2563eb)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)]"
          >
            View Today&apos;s Daily Verse
          </button>
        </div>
      ) : (
        <section className="mt-6">
          <h2 className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#6b7280)]">
            Saved Daily Verses
          </h2>
          <ul className="mt-3 space-y-3">
            {verses.map((entry) => (
              <li
                key={entry.id}
                className="rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpen({ entry, source: "bookmarks" })}
                  className="block w-full p-4 pb-2 text-left"
                >
                  <p className="text-[11px] font-black tracking-[0.14em] text-[var(--bb-accent,#2563eb)]">
                    {fullDate(entry.scheduled_date)}
                  </p>
                  <p className="mt-1.5 text-[14px] font-black text-[var(--bb-text-primary,#111827)]">{entry.reference}</p>
                  <p className="mt-1 line-clamp-2 font-serif text-[15px] font-bold leading-snug text-[var(--bb-text-secondary,#374151)]">
                    &ldquo;{entry.verse_text}&rdquo;
                  </p>
                </button>
                <div className="flex items-center justify-between px-4 pb-3">
                  <span className="text-xs font-black text-[var(--bb-accent,#2563eb)]">🔖 Saved</span>
                  <button
                    type="button"
                    onClick={() => void remove(entry)}
                    aria-label={`Remove ${entry.reference} from bookmarks`}
                    className="rounded-full px-3 py-1 text-xs font-black text-[var(--bb-text-muted,#6b7280)] hover:bg-[var(--bb-surface-soft,#f3f4f6)]"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {hasMore ? (
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => void loadPage(offset)}
                className="rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-6 py-2.5 text-sm font-black"
              >
                Show more
              </button>
            </div>
          ) : null}
        </section>
      )}

      <div className="mt-6 text-center">
        <Link href="/daily-verses" className="text-sm font-bold text-[var(--bb-accent,#2563eb)] hover:underline">
          View Previous Daily Verses
        </Link>
      </div>

      <VerseOfTheDayModal
        entry={open?.entry ?? null}
        userId={userId}
        source={open?.source ?? "bookmarks"}
        onClose={() => setOpen(null)}
      />
    </div>
  );
}
