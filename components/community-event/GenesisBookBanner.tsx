"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

/**
 * The companion book for The Beginning of Everything, on the signup page
 * (Louis, 2026-10-28).
 *
 * THE LINK IS NOT HARD-CODED, and that is the whole design. The brief said to
 * use the real Amazon listing and not to invent one - and at the time of
 * writing there is no listing: devotionals.paperback_url is null for this
 * study, no ASIN appears anywhere in the repo, and an Amazon search for the
 * title and author returns nothing. The other three books all have one.
 *
 * So the banner reads paperback_url from the devotional row, exactly as the
 * printed Proverbs, Tempting and 21 Women editions already do, and renders
 * nothing until it is set. The moment Louis runs
 *
 *   node --env-file=.env.local scripts/link-printed-edition.mjs \
 *     "The Beginning of Everything" <ASIN>
 *
 * the banner appears everywhere, with no code change and no deploy. That
 * script already checks the ASIN's shape and fetches the URL to confirm it
 * loads before writing it, so a typo cannot put a dead link in front of
 * readers.
 *
 * Showing a disabled button, or a button pointing at a search page, was the
 * alternative. Both teach people the button does not work.
 */

const DEVOTIONAL_ID = "486cff66-b50e-488d-9330-3951589e6fa8";

/** The real cover that ships with the study, not a render of it. */
const COVER = "/beginning-of-everything-cover.webp";

const FEATURES = [
  { top: "21 Days", bottom: "of study" },
  { top: "Clear", bottom: "explanations" },
  { top: "Real-life", bottom: "application" },
  { top: "Reflection", bottom: "questions" },
] as const;

const INK = "#0E1A3A";
const GOLD = "#B8860B";

export default function GenesisBookBanner() {
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const { data } = await supabase
          .from("devotionals")
          .select("paperback_url")
          .eq("id", DEVOTIONAL_ID)
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
  }, []);

  if (!href) return null;

  const track = () => {
    // Fire and forget, through the same endpoint every other surface uses.
    try {
      void fetch("/api/landing-analytics", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          event_name: "genesis_book_amazon_click",
          page_path: typeof window !== "undefined" ? window.location.pathname : "/events/beginning-of-everything",
          metadata: { study: "beginning-of-everything", placement: "event_signup_page" },
        }),
        keepalive: true,
      });
    } catch {
      /* Never let measurement stop the click. */
    }
  };

  return (
    <section
      aria-label="The Beginning of Everything, the companion book"
      className="overflow-hidden rounded-2xl border border-[#E4E9F0] bg-white p-5 sm:p-6"
    >
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-7">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={COVER}
          alt="The Beginning of Everything, Genesis 1 to 8, written by Louis Moore III"
          width={1024}
          height={1536}
          loading="lazy"
          className="w-[108px] shrink-0 rounded-[4px] shadow-[0_10px_26px_rgba(14,26,58,0.22)] sm:w-[124px]"
        />

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-[10.5px] font-black uppercase tracking-[0.18em]" style={{ color: GOLD }}>
            The official companion book
          </p>
          <h2 className="mt-1.5 text-[22px] font-black leading-tight tracking-[-0.02em] sm:text-[26px]" style={{ color: INK }}>
            The Beginning of Everything
          </h2>
          <p className="mt-0.5 text-[12px] font-black uppercase tracking-[0.16em]" style={{ color: GOLD }}>
            Genesis 1–8
          </p>
          <p className="mx-auto mt-2.5 max-w-[46ch] text-[13.5px] font-semibold leading-snug text-[#55617A] sm:mx-0">
            Go deeper with the full book. Daily readings, clear explanations, real-life applications and
            reflection questions to help you understand Genesis.
          </p>

          <ul className="mt-3.5 flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-start">
            {FEATURES.map((f) => (
              <li key={f.top} className="text-center sm:text-left">
                <span className="block text-[12.5px] font-black" style={{ color: INK }}>
                  {f.top}
                </span>
                <span className="block text-[11px] font-semibold text-[#7A8699]">{f.bottom}</span>
              </li>
            ))}
          </ul>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={track}
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl px-6 text-[14px] font-black tracking-wide transition hover:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
            style={{ backgroundColor: "#FFB43D", color: "#1A1205" }}
          >
            <span>GET THE BOOK ON AMAZON →</span>
          </a>

          <p className="mt-2 text-[11.5px] font-semibold text-[#7A8699]">
            The 21-day community study is free. The book is optional.
          </p>
        </div>
      </div>
    </section>
  );
}

