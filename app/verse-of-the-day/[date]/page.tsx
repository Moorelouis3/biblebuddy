"use client";

/**
 * Direct URL for one Verse of the Day entry, e.g. /verse-of-the-day/2026-09-05.
 * This is the link the share button hands out, and it keeps working after the
 * day passes - past approved entries stay publicly readable, so an archived
 * verse reopens with its full saved breakdown.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import VerseOfTheDayBreakdown from "../../../components/VerseOfTheDayBreakdown";
import { useSupabaseUser } from "../../../lib/useSupabaseUser";
import {
  fetchVotdEntryByDate,
  getVotdLocalDayKey,
  type VerseOfTheDayEntry,
} from "../../../lib/verseOfTheDayContent";

export default function VerseOfTheDayDatePage() {
  const params = useParams();
  const date = String(params.date || "");
  const { userId } = useSupabaseUser();
  const [entry, setEntry] = useState<VerseOfTheDayEntry | null>(null);
  const [loaded, setLoaded] = useState(false);

  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date);

  useEffect(() => {
    if (!validDate) {
      setLoaded(true);
      return;
    }
    void fetchVotdEntryByDate(date).then((row) => {
      setEntry(row);
      setLoaded(true);
    });
  }, [date, validDate]);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6">
      {entry ? (
        <VerseOfTheDayBreakdown entry={entry} userId={userId} surface="page" />
      ) : loaded ? (
        <div className="rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-8 text-center">
          <p className="text-lg font-black text-[var(--bb-text-primary,#111827)]">
            No Verse of the Day here yet
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
            This day has no published verse. Today&apos;s verse is waiting on your home screen.
          </p>
          <Link
            href={`/verse-of-the-day/${getVotdLocalDayKey()}`}
            className="mt-5 inline-block rounded-full bg-[var(--bb-button,#2563eb)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)]"
          >
            Open today&apos;s verse
          </Link>
        </div>
      ) : null}
      {entry ? (
        <div className="mt-4 text-center">
          <Link
            href="/dashboard"
            className="text-sm font-bold text-[var(--bb-accent,#2563eb)]"
          >
            ← Back to Bible Buddy
          </Link>
        </div>
      ) : null}
    </div>
  );
}
