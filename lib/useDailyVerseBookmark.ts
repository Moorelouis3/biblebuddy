"use client";

import { useCallback, useEffect, useState } from "react";
import { isBookmarked, onBookmarkChange, setBookmark } from "./bookmarks";
import { trackVotdEvent, type VerseOfTheDayEntry } from "./verseOfTheDayContent";

export type DailyVerseSource = "today" | "archive" | "bookmarks" | "link";

/**
 * Bookmark state for one Daily Verse, shared by the homepage card, the popup,
 * the archive and the Bookmarks page. Flips instantly, rolls back if the save
 * fails, and follows changes made by any other copy on screen.
 */
export function useDailyVerseBookmark(
  userId: string | null | undefined,
  entry: Pick<VerseOfTheDayEntry, "id" | "scheduled_date" | "reference"> | null,
  source: DailyVerseSource,
) {
  const [bookmarked, setBookmarked] = useState(false);
  const entryId = entry?.id ?? null;

  useEffect(() => {
    setBookmarked(false);
    if (!userId || !entryId) return;
    let cancelled = false;
    void isBookmarked(userId, "daily_verse", entryId).then((saved) => {
      if (!cancelled) setBookmarked(saved);
    });
    return () => {
      cancelled = true;
    };
  }, [userId, entryId]);

  useEffect(() => {
    if (!entryId) return;
    return onBookmarkChange((detail) => {
      if (detail.contentType === "daily_verse" && detail.contentId === entryId) setBookmarked(detail.bookmarked);
    });
  }, [entryId]);

  const toggle = useCallback(async () => {
    if (!userId || !entry) return false;
    const next = !bookmarked;
    setBookmarked(next);
    const ok = await setBookmark(userId, "daily_verse", entry.id, next);
    if (!ok) {
      setBookmarked(!next);
      return false;
    }
    const meta = { date: entry.scheduled_date, reference: entry.reference, daily_verse_id: entry.id, source };
    trackVotdEvent("votd_bookmark", { ...meta, bookmarked: next }, userId);
    trackVotdEvent(next ? "daily_verse_bookmarked" : "daily_verse_unbookmarked", meta, userId);
    return true;
  }, [userId, entry, bookmarked, source]);

  return { bookmarked, toggle };
}
