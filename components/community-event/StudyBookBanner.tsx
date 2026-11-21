"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

/**
 * The printed book for a community study, on its signup page: a small strip,
 * never a section that takes over the page (Louis, 2026-11-15: "a simple buy
 * the book on amazon button and a lil thing that shows the cover and a small
 * text"). Small cover, one line, one button.
 *
 * One component for every study that has a book. It replaced
 * GenesisBookBanner (2026-10-28), which only knew The Beginning of
 * Everything.
 *
 * THE LINK IS READ, NOT HARD-CODED. It comes from the study's
 * `devotionals.paperback_url`, the same field the study page's book strip
 * and the day-complete popup use, set by
 *
 *   node --env-file=.env.local scripts/link-printed-edition.mjs "<title>" <ASIN>
 *
 * only once the book is Live on Amazon. Until then the strip renders nothing,
 * so it can never show a dead button. The Amazon page itself offers the
 * hardcover next to the paperback, so one button covers both.
 *
 * Shown to everyone, signed up or not. It is an offer, never a condition:
 * the small line says the study is free.
 */

type StudyBook = {
  devotionalId: string;
  title: string;
  /** The real front cover, not a render of it. */
  cover: string;
  /** Kept as it was for The Beginning of Everything, so its numbers carry on. */
  trackEvent: string;
};

const BOOKS: Record<string, StudyBook> = {
  "beginning-of-everything": {
    devotionalId: "486cff66-b50e-488d-9330-3951589e6fa8",
    title: "The Beginning of Everything",
    cover: "/beginning-of-everything-cover.webp",
    trackEvent: "genesis_book_amazon_click",
  },
  "obedience-of-abraham": {
    devotionalId: "2c7641c1-0280-4847-b36e-e89004a58534",
    title: "The Obedience of Abraham",
    // Replaced on 15 Nov 2026 with the front of the new 30-day print cover.
    cover: "/obedienceofabraham28day.png",
    // The event the day-complete popup's Amazon button already uses, so the
    // admin Books tab counts it; placement tells the two apart.
    trackEvent: "study_guide_amazon_clicked",
  },
};

export default function StudyBookBanner({ eventSlug }: { eventSlug: string }) {
  const book = BOOKS[eventSlug];
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    if (!book) return;
    let cancelled = false;
    void (async () => {
      try {
        const { data } = await supabase
          .from("devotionals")
          .select("paperback_url")
          .eq("id", book.devotionalId)
          .maybeSingle();
        const url = (data as { paperback_url?: string | null } | null)?.paperback_url?.trim();
        if (!cancelled && url) setHref(url);
      } catch {
        /* The signup page is the point of this screen; it still works. */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [book]);

  if (!book || !href) return null;

  const track = () => {
    // Fire and forget, through the same endpoint every other surface uses.
    try {
      void fetch(`${window.location.origin}/api/landing-analytics`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          event_name: book.trackEvent,
          page_path: window.location.pathname,
          metadata: { study: eventSlug, placement: "event_signup_page" },
        }),
        keepalive: true,
      });
    } catch {
      /* Never let measurement stop the click. */
    }
  };

  return (
    // Bigger, with a gently pulsing button (Louis, 2026-11-21: "the book
    // section can be bigger and the button can be like dancing or pulsing").
    // Still one strip: cover, a line, one button.
    <div
      aria-label={`${book.title}, the printed book`}
      className="flex items-center gap-4 rounded-2xl border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] p-4"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={book.cover} alt="" className="h-32 w-auto shrink-0 rounded-[4px] shadow-md sm:h-36" />
      {/* The text and button fill the width beside the cover (Louis,
          2026-11-21: "still too much empty space on the right"). */}
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-lg font-black leading-snug text-[var(--bb-text-primary,#111827)]">Get the printed book</p>
        <p className="mt-0.5 text-sm font-semibold leading-snug text-[var(--bb-text-secondary,#4b5563)]">
          {book.title}, in your hands. Optional: the study is free here.
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={track}
          className="bb-cv-fp-main bb-pulse-cta relative mt-3 flex w-full items-center justify-center rounded-xl px-4 py-3 text-base font-black text-[#1A1205] transition hover:brightness-95"
          style={{ backgroundColor: "var(--bb-cv-primary-bg, #FFB43D)" }}
        >
          Buy on Amazon →
        </a>
      </div>
    </div>
  );
}
