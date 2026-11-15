"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

/**
 * The printed book for a community study, on its signup page.
 *
 * One component for every study that has a book. It replaced
 * GenesisBookBanner (2026-10-28), which only knew The Beginning of
 * Everything, when Louis asked for the same thing on The Obedience of
 * Abraham with both bindings (2026-11-15): "get the hardcover, get the
 * paperback ... you don't need to get the book to do the study".
 *
 * THE PAPERBACK LINK IS READ, NOT HARD-CODED. It comes from the study's
 * `devotionals.paperback_url`, the same field the study page's book strip
 * and the day-complete popup use, set by
 *
 *   node --env-file=.env.local scripts/link-printed-edition.mjs "<title>" <ASIN>
 *
 * only once the book is Live on Amazon. Until then the banner renders
 * nothing, so it can never show a dead button.
 *
 * The hardcover has no column of its own, so its address lives here. Add one
 * only after KDP's bookshelf shows that binding as Live.
 *
 * Shown to everyone, signed up or not: somebody still deciding should see the
 * book too. It is an offer, never a condition - the line under the buttons
 * says so, because the study is free.
 */

type StudyBook = {
  devotionalId: string;
  title: string;
  /** The small gold line under the title, e.g. "Genesis 1–8". */
  passage: string;
  days: number;
  /** The real front cover, not a render of it. */
  cover: string;
  coverAlt: string;
  blurb: string;
  /** Amazon hardcover page, only once KDP shows it Live. */
  hardcoverUrl: string | null;
  /** Kept as it was for The Beginning of Everything, so its numbers carry on. */
  trackEvent: string;
};

const BOOKS: Record<string, StudyBook> = {
  "beginning-of-everything": {
    devotionalId: "486cff66-b50e-488d-9330-3951589e6fa8",
    title: "The Beginning of Everything",
    passage: "Genesis 1–8",
    days: 21,
    cover: "/beginning-of-everything-cover.webp",
    coverAlt: "The Beginning of Everything, Genesis 1 to 8, written by Louis Moore III",
    blurb:
      "Go deeper with the full book. Daily readings, clear explanations, real-life applications and reflection questions to help you understand Genesis.",
    // Hardcover Live on KDP, submitted 25 Oct 2026 (bookshelf, 15 Nov).
    hardcoverUrl: "https://www.amazon.com/dp/B0HP8B21L3",
    trackEvent: "genesis_book_amazon_click",
  },
  "obedience-of-abraham": {
    devotionalId: "2c7641c1-0280-4847-b36e-e89004a58534",
    title: "The Obedience of Abraham",
    passage: "Genesis 9–25",
    days: 30,
    // Replaced on 15 Nov 2026 with the front of the new 30-day print cover.
    cover: "/obedienceofabraham28day.png",
    coverAlt: "The Obedience of Abraham, a 30-day Bible study of Genesis 9 to 25, written by Louis Moore III",
    blurb:
      "Every day of the study in one printed book: the daily readings, clear explanations, real-life application and reflection questions, from Noah's sons to the death of Abraham.",
    // Hardcover Live on KDP, submitted 15 Nov 2026 (bookshelf, 15 Nov).
    hardcoverUrl: "https://www.amazon.com/dp/B0HRRR4VLM",
    // The event the day-complete popup's Amazon button already uses, so the
    // admin Books tab counts it; placement tells the two apart.
    trackEvent: "study_guide_amazon_clicked",
  },
};

const INK = "#0E1A3A";
const GOLD = "#B8860B";

export default function StudyBookBanner({ eventSlug }: { eventSlug: string }) {
  const book = BOOKS[eventSlug];
  const [paperbackUrl, setPaperbackUrl] = useState<string | null>(null);

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
        if (!cancelled && url) setPaperbackUrl(url);
      } catch {
        /* The signup page is the point of this screen; it still works. */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [book]);

  // No paperback yet means the book is not Live, so nothing is shown at all.
  if (!book || !paperbackUrl) return null;

  const track = (binding: "hardcover" | "paperback") => {
    // Fire and forget, through the same endpoint every other surface uses.
    try {
      void fetch(`${window.location.origin}/api/landing-analytics`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          event_name: book.trackEvent,
          page_path: window.location.pathname,
          metadata: { study: eventSlug, placement: "event_signup_page", binding },
        }),
        keepalive: true,
      });
    } catch {
      /* Never let measurement stop the click. */
    }
  };

  const buttonClass =
    "inline-flex min-h-12 flex-1 items-center justify-center rounded-xl px-5 text-[13.5px] font-black tracking-wide transition hover:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  return (
    <section
      aria-label={`${book.title}, the printed book`}
      className="overflow-hidden rounded-2xl border border-[#E4E9F0] bg-white p-5 sm:p-6"
    >
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-7">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.cover}
          alt={book.coverAlt}
          loading="lazy"
          className="w-[108px] shrink-0 rounded-[4px] shadow-[0_10px_26px_rgba(14,26,58,0.22)] sm:w-[124px]"
        />

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-[10.5px] font-black uppercase tracking-[0.18em]" style={{ color: GOLD }}>
            Prefer a physical copy?
          </p>
          <h2 className="mt-1.5 text-[22px] font-black leading-tight tracking-[-0.02em] sm:text-[26px]" style={{ color: INK }}>
            {book.title}
          </h2>
          <p className="mt-0.5 text-[12px] font-black uppercase tracking-[0.16em]" style={{ color: GOLD }}>
            {book.passage} · {book.days} days
          </p>
          <p className="mx-auto mt-2.5 max-w-[46ch] text-[13.5px] font-semibold leading-snug text-[#55617A] sm:mx-0">
            {book.blurb}
          </p>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            {book.hardcoverUrl ? (
              <a
                href={book.hardcoverUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("hardcover")}
                className={buttonClass}
                style={{ backgroundColor: "#FFB43D", color: "#1A1205" }}
              >
                GET THE HARDCOVER
              </a>
            ) : null}
            <a
              href={paperbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("paperback")}
              className={buttonClass}
              style={
                book.hardcoverUrl
                  ? { backgroundColor: "#FFFFFF", color: INK, border: `2px solid ${INK}` }
                  : { backgroundColor: "#FFB43D", color: "#1A1205" }
              }
            >
              GET THE PAPERBACK
            </a>
          </div>

          <p className="mt-2.5 text-[12px] font-semibold leading-snug text-[#7A8699]">
            You don&apos;t need the book to do the study. All {book.days} days are free inside Bible Buddy. The book is
            for anyone who would rather study with a physical copy in hand.
          </p>
        </div>
      </div>
    </section>
  );
}
