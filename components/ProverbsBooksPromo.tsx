"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PROVERBS_BOOK_IMAGES, PROVERBS_BOOKS_PAGE_PATH, trackBooksEvent } from "../lib/proverbsBooks";

// "Take the study off the screen" promo on the Wisdom of Proverbs event page
// (shown after someone has signed up). It links to the internal books page,
// never straight to Amazon.
// Desktop/tablet shows the full banner image. On phones the banner's small
// print would be unreadable, so the same promo is laid out as text + cover.

const SERIF = 'Georgia, "Times New Roman", serif';

export default function ProverbsBooksPromo({ eventSlug }: { eventSlug: string }) {
  useEffect(() => {
    trackBooksEvent("community_event_books_promo_impression", { event: eventSlug });
  }, [eventSlug]);

  const onClick = (target: "banner" | "button") => () =>
    trackBooksEvent("community_event_books_promo_click", { event: eventSlug, target });

  return (
    <section aria-label="The Wisdom of Proverbs in print" className="flex flex-col gap-3">
      <Link
        href={PROVERBS_BOOKS_PAGE_PATH}
        onClick={onClick("banner")}
        className="block overflow-hidden rounded-[22px] border border-[#3a2c14] shadow-sm transition hover:brightness-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#cfa147]"
        aria-label="Take the study off the screen. The Wisdom of Proverbs is now a physical book. See the printed books."
      >
        {/* Tablet and desktop: the banner as designed. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PROVERBS_BOOK_IMAGES.eventPromoBanner}
          alt="Take the study off the screen. The Wisdom of Proverbs is now a physical book you can hold, highlight, take notes, and keep forever."
          width={1774}
          height={887}
          className="hidden h-auto w-full sm:block"
        />

        {/* Phones: same message, readable size. */}
        <div
          className="flex items-center gap-3 p-4 sm:hidden"
          style={{ background: "linear-gradient(115deg, #0f0a05 0%, #1d140b 55%, #2a1d0f 100%)" }}
        >
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#cfa147]">Now available in print</p>
            <p className="mt-1.5 text-[1.55rem] font-bold leading-[1.08] text-[#f4ecdd]" style={{ fontFamily: SERIF }}>
              Take the study <span className="text-[#e8c877]">off the screen.</span>
            </p>
            <p className="mt-2 text-[13px] font-semibold leading-5 text-[#f4ecdd]">
              The Wisdom of Proverbs is now a physical book.
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-[#cbbd9f]">
              Read. Highlight. Take notes. Keep it forever.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PROVERBS_BOOK_IMAGES.studyGuideCover}
            alt="The Wisdom of Proverbs book cover"
            width={720}
            height={1080}

            className="h-auto w-[34%] max-w-[140px] flex-shrink-0 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
          />
        </div>
      </Link>

      <Link
        href={PROVERBS_BOOKS_PAGE_PATH}
        onClick={onClick("button")}
        className="flex min-h-12 w-full items-center justify-center rounded-xl px-5 text-sm font-black tracking-wide text-[#221503] transition hover:brightness-95"
        style={{ background: "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)" }}
      >
        See the Printed Books →
      </Link>
    </section>
  );
}
