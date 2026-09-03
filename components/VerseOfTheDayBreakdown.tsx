"use client";

/**
 * The Verse of the Day breakdown - the saved study content for one entry.
 *
 * Shared by the homepage popup and the /verse-of-the-day/[date] page so a
 * shared link shows exactly what the popup shows. All content comes from the
 * database row; nothing is generated at read time.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  fetchVotdEngagement,
  getVotdBackground,
  getVotdShareUrl,
  formatVotdDateLabel,
  trackVotdEvent,
  upsertVotdEngagement,
  type VerseOfTheDayEntry,
} from "../lib/verseOfTheDayContent";

function SectionBody({ text }: { text: string }) {
  return (
    <div className="space-y-3">
      {text
        .split(/\n\s*\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, index) => (
          <p key={index} className="text-[15px] font-semibold leading-relaxed text-[var(--bb-text-secondary,#374151)]">
            {line}
          </p>
        ))}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2563eb)]">{children}</h3>
  );
}

export default function VerseOfTheDayBreakdown({
  entry,
  userId,
  onClose,
  surface,
}: {
  entry: VerseOfTheDayEntry;
  userId: string | null | undefined;
  /** Present in the popup; absent on the standalone page. */
  onClose?: () => void;
  surface: "popup" | "page";
}) {
  const background = getVotdBackground(entry);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");
  const completedRef = useRef(false);
  const endMarkerRef = useRef<HTMLDivElement | null>(null);

  const meta = { date: entry.scheduled_date, reference: entry.reference, background: background.theme };

  // Opening the breakdown counts as reading it starting - saved per user so
  // the card can show "read", plus the analytics event per surface.
  useEffect(() => {
    trackVotdEvent(surface === "popup" ? "votd_breakdown_open" : "votd_page_view", meta);
    if (userId) {
      void upsertVotdEngagement(userId, entry.id, { opened_at: new Date().toISOString() });
      void fetchVotdEngagement(userId, entry.id).then((row) => {
        if (row?.bookmarked) setBookmarked(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.id, userId, surface]);

  // Completion = the reader actually reached the end of the breakdown.
  useEffect(() => {
    const marker = endMarkerRef.current;
    if (!marker || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((item) => item.isIntersecting) || completedRef.current) return;
      completedRef.current = true;
      trackVotdEvent("votd_breakdown_complete", meta);
      if (userId) void upsertVotdEngagement(userId, entry.id, { completed_at: new Date().toISOString() });
      observer.disconnect();
    });
    observer.observe(marker);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.id, userId]);

  async function handleBookmark() {
    if (!userId) {
      setShareState("idle");
      window.location.href = "/";
      return;
    }
    const next = !bookmarked;
    setBookmarked(next);
    trackVotdEvent("votd_bookmark", { ...meta, bookmarked: next });
    await upsertVotdEngagement(userId, entry.id, {
      bookmarked: next,
      bookmarked_at: new Date().toISOString(),
    });
  }

  async function handleShare() {
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
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    } catch {
      // Share sheet dismissed or clipboard blocked - not an error worth showing.
    }
  }

  const bibleHref = `/Bible/${encodeURIComponent(entry.book)}/${entry.chapter}`;

  return (
    <div className="overflow-hidden rounded-[28px] bg-[var(--bb-card,#ffffff)] shadow-xl">
      {/* Hero - same pastel art as the homepage card so the popup feels
          connected; light wash and dark text, never a dark overlay. */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${background.src})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.22) 55%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 px-5 py-6 sm:px-7 sm:py-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#1f2937]">Verse of the Day</p>
              <p className="mt-1 text-[11px] font-bold tracking-wide text-[#334155]">
                {formatVotdDateLabel(entry.scheduled_date)}
              </p>
            </div>
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[rgba(15,23,42,0.12)] bg-white/65 text-lg font-black text-[#1f2937] backdrop-blur-sm transition hover:bg-white"
              >
                ✕
              </button>
            ) : null}
          </div>
          <p className="mt-4 font-serif text-xl font-bold leading-snug text-[#111827] sm:text-2xl">
            {entry.verse_text}
          </p>
          <p className="mt-3 text-sm font-black text-[#334155]">
            {entry.reference} · {entry.translation}
          </p>
        </div>
      </div>

      <div className="px-5 py-6 sm:px-7">
        <div className="space-y-7">
          <section>
            <SectionHeading>📜 Who Wrote This?</SectionHeading>
            <SectionBody text={entry.author_section} />
          </section>
          <section>
            <SectionHeading>🗺️ Where Are We In The Story?</SectionHeading>
            <SectionBody text={entry.context_section} />
          </section>
          <section>
            <SectionHeading>💡 What Does It Actually Mean?</SectionHeading>
            <SectionBody text={entry.meaning_section} />
          </section>
          <section>
            <SectionHeading>❤️ Why This Matters Today</SectionHeading>
            <SectionBody text={entry.application_section} />
          </section>

          <section className="rounded-2xl bg-[var(--bb-accent-soft,#eaf2ff)] p-4">
            <SectionHeading>Take This With You</SectionHeading>
            <p className="text-[15px] font-black leading-relaxed text-[var(--bb-text-primary,#111827)]">
              ✨ {entry.takeaway}
            </p>
          </section>

          <section>
            <SectionHeading>Think About It</SectionHeading>
            <p className="text-[15px] font-bold leading-relaxed text-[var(--bb-text-primary,#111827)]">
              💭 {entry.reflection_question}
            </p>
          </section>

          {entry.prayer ? (
            <section>
              <SectionHeading>🙏 A Short Prayer</SectionHeading>
              <SectionBody text={entry.prayer} />
            </section>
          ) : null}
        </div>

        <div ref={endMarkerRef} aria-hidden="true" />

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <Link
            href={bibleHref}
            onClick={() => trackVotdEvent("votd_open_in_bible", meta)}
            className="rounded-full bg-[var(--bb-button,#2563eb)] px-5 py-2.5 text-sm font-black text-[var(--bb-button-text,#ffffff)] transition hover:brightness-95"
          >
            Open in Bible
          </Link>
          <button
            type="button"
            onClick={() => void handleBookmark()}
            aria-pressed={bookmarked}
            className={`rounded-full border px-4 py-2.5 text-sm font-black transition ${
              bookmarked
                ? "border-[var(--bb-accent,#2563eb)] bg-[var(--bb-accent-soft,#eaf2ff)] text-[var(--bb-accent,#2563eb)]"
                : "border-[var(--bb-card-border,#dbe7f4)] text-[var(--bb-text-secondary,#374151)] hover:brightness-95"
            }`}
          >
            {bookmarked ? "🔖 Bookmarked" : "🔖 Bookmark"}
          </button>
          <button
            type="button"
            onClick={() => void handleShare()}
            className="rounded-full border border-[var(--bb-card-border,#dbe7f4)] px-4 py-2.5 text-sm font-black text-[var(--bb-text-secondary,#374151)] transition hover:brightness-95"
          >
            {shareState === "copied" ? "✓ Link copied" : "↗ Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
