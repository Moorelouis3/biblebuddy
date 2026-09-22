"use client";

import Link from "next/link";
import { useEffect } from "react";
import { trackWisdomBookEvent, WISDOM_BOOK_ASSETS, WISDOM_BOOKS_PAGE_PATH } from "../lib/wisdomOfProverbsProducts";

// "GO DEEPER - Get the Physical Book" banner on the Wisdom of Proverbs event
// page, for people who have signed up. The banner is Louis's artwork as-is
// (no button baked in); the real button below it opens the internal books
// page, which handles choosing between the three editions. Never straight to
// Amazon from here.

const HREF = `${WISDOM_BOOKS_PAGE_PATH}?src=proverbs_event_page`;

export default function ProverbsBooksPromo({ eventSlug }: { eventSlug: string }) {
  useEffect(() => {
    void trackWisdomBookEvent("wisdom_book_banner_viewed", { event: eventSlug });
  }, [eventSlug]);

  const onClick = (target: "banner" | "button") => () =>
    void trackWisdomBookEvent("wisdom_book_banner_clicked", { event: eventSlug, target });

  return (
    <section aria-label="The Wisdom of Proverbs in print" className="flex flex-col gap-3">
      <Link
        href={HREF}
        onClick={onClick("banner")}
        className="block overflow-hidden rounded-[22px] border border-[#3a2c14] shadow-sm transition hover:brightness-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#cfa147]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={WISDOM_BOOK_ASSETS.promoBanner}
          alt="Go deeper: get the physical book. The Wisdom of Proverbs is now available in print. Read, highlight, and make it yours."
          width={2048}
          height={768}
          className="block h-auto w-full"
        />
      </Link>
      <Link
        href={HREF}
        onClick={onClick("button")}
        className="flex min-h-12 w-full items-center justify-center rounded-xl px-5 text-sm font-black tracking-[0.08em] text-[#221503] transition hover:brightness-95"
        style={{ background: "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)" }}
      >
        VIEW THE PHYSICAL BOOKS →
      </Link>
    </section>
  );
}
