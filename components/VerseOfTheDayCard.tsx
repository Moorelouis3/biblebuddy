"use client";

/**
 * The Verse of the Day homepage card, from Louis's approved mockup
 * (2026-09-02): rotating background art, gold serif verse, TODAY pill,
 * READ THE BREAKDOWN, bookmark and share. The whole card opens the
 * breakdown popup except the two small controls.
 *
 * Data comes from verse_of_the_day_entries by the user's LOCAL date. If no
 * approved entry exists for today the card falls back to the legacy
 * deterministic verse pool and simply hides the breakdown affordances -
 * the homepage never breaks because the queue ran dry.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { ModalShell } from "./ModalShell";
import VerseOfTheDayBreakdown from "./VerseOfTheDayBreakdown";
import { getVerseOfTheDay } from "../lib/verseOfTheDay";
import {
  fetchVotdEngagement,
  fetchVotdEntryByDate,
  formatVotdDateLabel,
  getVotdBackground,
  getVotdLocalDayKey,
  getVotdShareUrl,
  trackVotdEvent,
  upsertVotdEngagement,
  type VerseOfTheDayEntry,
} from "../lib/verseOfTheDayContent";

export default function VerseOfTheDayCard({ userId }: { userId: string | null | undefined }) {
  const todayKey = useMemo(() => getVotdLocalDayKey(), []);
  const [entry, setEntry] = useState<VerseOfTheDayEntry | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [alreadyRead, setAlreadyRead] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const impressionSent = useRef(false);

  const legacyVerse = useMemo(() => getVerseOfTheDay(), []);

  useEffect(() => {
    void (async () => {
      const row = await fetchVotdEntryByDate(todayKey);
      setEntry(row);
      setLoaded(true);
      if (row && !impressionSent.current) {
        impressionSent.current = true;
        trackVotdEvent("votd_card_impression", {
          date: row.scheduled_date,
          reference: row.reference,
          background: getVotdBackground(row).theme,
        });
      }
      if (row && userId) {
        const engagement = await fetchVotdEngagement(userId, row.id);
        if (engagement?.bookmarked) setBookmarked(true);
        if (engagement?.opened_at) setAlreadyRead(true);
      }
    })();
  }, [todayKey, userId]);

  // Fallback: today's simple card, no breakdown - never a blank hole.
  if (!entry) {
    if (!loaded) return null;
    return (
      <section className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f3f0ff)] p-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#7c3aed]">Verse of the Day</p>
        <p className="mt-1 text-base font-black leading-snug text-[var(--bb-text-primary,#111827)]">
          {legacyVerse.text}
        </p>
        <p className="mt-1 text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">{legacyVerse.reference} · KJV</p>
      </section>
    );
  }

  const background = getVotdBackground(entry);
  const meta = { date: entry.scheduled_date, reference: entry.reference, background: background.theme };

  function openBreakdown(sourceEvent: "votd_card_click" | "votd_read_breakdown_click") {
    trackVotdEvent(sourceEvent, meta);
    setIsOpen(true);
    setAlreadyRead(true);
  }

  async function handleBookmark(event: React.MouseEvent) {
    event.stopPropagation();
    if (!entry || !userId) return;
    const next = !bookmarked;
    setBookmarked(next);
    trackVotdEvent("votd_bookmark", { ...meta, bookmarked: next });
    await upsertVotdEngagement(userId, entry.id, { bookmarked: next, bookmarked_at: new Date().toISOString() });
  }

  async function handleShare(event: React.MouseEvent) {
    event.stopPropagation();
    if (!entry) return;
    const url = getVotdShareUrl(entry.scheduled_date);
    const text = `"${entry.verse_text}" - ${entry.reference} (${entry.translation})`;
    trackVotdEvent("votd_share", meta);
    if (userId) void upsertVotdEngagement(userId, entry.id, { shared_at: new Date().toISOString() });
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Verse of the Day - Bible Buddy", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      // Dismissed share sheet - nothing to report.
    }
  }

  return (
    <>
      <section
        role="button"
        tabIndex={0}
        onClick={() => openBreakdown("votd_card_click")}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openBreakdown("votd_card_click");
          }
        }}
        aria-label={`Verse of the Day - ${entry.reference}. Read the breakdown.`}
        className="relative cursor-pointer overflow-hidden rounded-[24px] border border-black/30 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#e3c27c] active:scale-[0.995]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${background.src})` }}
          aria-hidden="true"
        />
        {/* Left-to-right scrim keeps the words readable over any art */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(95deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.25) 100%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-2.5 px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#e3c27c]">
              📖 Verse of the Day
              {alreadyRead ? (
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-black tracking-normal text-[#f0e6d2]">
                  ✓ Read
                </span>
              ) : null}
            </p>
            <span className="rounded-full border border-[#e3c27c]/60 px-3 py-1 text-[10px] font-black tracking-[0.12em] text-[#f0e6d2]">
              {formatVotdDateLabel(entry.scheduled_date)}
            </span>
          </div>

          <p className="max-w-[46rem] font-serif text-lg font-bold leading-snug text-[#f7efdf] sm:text-2xl">
            {entry.verse_text}
          </p>

          <p className="text-[13px] font-black text-[#e3c27c]">
            {entry.reference} · {entry.translation}
          </p>

          <div className="mt-1 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openBreakdown("votd_read_breakdown_click");
              }}
              className="text-[12px] font-black uppercase tracking-[0.14em] text-[#e3c27c] transition hover:brightness-110"
            >
              Read the Breakdown →
            </button>
            <div className="flex items-center gap-1.5">
              {userId ? (
                <button
                  type="button"
                  onClick={(event) => void handleBookmark(event)}
                  aria-pressed={bookmarked}
                  aria-label={bookmarked ? "Remove bookmark" : "Bookmark this verse"}
                  className={`grid h-9 w-9 place-items-center rounded-full text-base transition hover:bg-white/20 active:scale-95 ${
                    bookmarked ? "bg-[#e3c27c]/25" : "bg-white/10"
                  }`}
                >
                  {bookmarked ? "🔖" : "🏷️"}
                </button>
              ) : null}
              <button
                type="button"
                onClick={(event) => void handleShare(event)}
                aria-label="Share this verse"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-base transition hover:bg-white/20 active:scale-95"
              >
                {shareCopied ? "✓" : "↗"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <ModalShell isOpen={isOpen} onClose={() => setIsOpen(false)} scrollable>
        <div className="w-full max-w-2xl">
          <VerseOfTheDayBreakdown entry={entry} userId={userId} surface="popup" onClose={() => setIsOpen(false)} />
        </div>
      </ModalShell>
    </>
  );
}
