"use client";

/**
 * The Daily Verse popup. One component for every way in: today's card on the
 * home screen, the Previous Daily Verses archive, and Bookmarks all open this
 * with whichever entry they have, so the experience is identical for today's
 * verse and one from three months ago.
 *
 * Pass `sequence` (the list the reader opened it from, newest first) to get
 * previous/next day links inside the popup.
 */

import { useRef } from "react";
import { ModalShell } from "./ModalShell";
import VerseOfTheDayBreakdown from "./VerseOfTheDayBreakdown";
import type { DailyVerseSource } from "../lib/useDailyVerseBookmark";
import { getVotdLocalDayKey, type VerseOfTheDayEntry } from "../lib/verseOfTheDayContent";

/** "Today" or "Sep 11" for the previous/next links. */
function shortDate(dateKey: string) {
  if (dateKey === getVotdLocalDayKey()) return "Today";
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, (m || 1) - 1, d || 1)),
  );
}

export default function VerseOfTheDayModal({
  entry,
  userId,
  onClose,
  source,
  sequence,
  onSelect,
  onViewArchive,
}: {
  entry: VerseOfTheDayEntry | null;
  userId: string | null | undefined;
  onClose: () => void;
  source: DailyVerseSource;
  sequence?: VerseOfTheDayEntry[];
  onSelect?: (entry: VerseOfTheDayEntry) => void;
  onViewArchive?: () => void;
}) {
  const topRef = useRef<HTMLDivElement | null>(null);
  const select = (next: VerseOfTheDayEntry) => {
    onSelect?.(next);
    topRef.current?.scrollIntoView({ block: "start" });
  };
  const index = entry && sequence ? sequence.findIndex((item) => item.id === entry.id) : -1;
  // sequence is newest first: "previous day" is the next item in the list.
  const older = index >= 0 ? sequence?.[index + 1] : undefined;
  const newer = index > 0 ? sequence?.[index - 1] : undefined;

  return (
    <ModalShell isOpen={Boolean(entry)} onClose={onClose} scrollable>
      <div ref={topRef} className="w-full max-w-2xl scroll-mt-10">
        {entry ? (
          <VerseOfTheDayBreakdown
            key={entry.id}
            entry={entry}
            userId={userId}
            surface="popup"
            source={source}
            onClose={onClose}
            onPrevious={older && onSelect ? { label: shortDate(older.scheduled_date), onClick: () => select(older) } : null}
            onNext={newer && onSelect ? { label: shortDate(newer.scheduled_date), onClick: () => select(newer) } : null}
            onViewArchive={onViewArchive}
          />
        ) : null}
      </div>
    </ModalShell>
  );
}
