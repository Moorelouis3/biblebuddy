"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { cardTint } from "../../lib/cardTints";
import { bibleBuddyTvTitles, type BibleBuddyTvTitle } from "../../lib/bibleBuddyTvContent";

/**
 * Bible Buddy TV on the dashboard, shaped like the bookshelf.
 *
 * Louis, 2026-10-18: "add a section to the dashboard for Bible Buddy TV like
 * the bookshelf or Quick Reads, where stuff is recommended to the user from
 * Bible Buddy TV with the covers, like the bookshelf, above Quick Reads."
 *
 * TV spent six weeks with no door into it at all. A tab in the More sheet is
 * a door somebody has to go looking for; a rail of posters on the page they
 * open every morning is the shows finding them.
 *
 * Same furniture as the shelf above it on purpose - the heading with its
 * link, the swipeable row, pastel cards, portrait covers - because it is the
 * same idea: things you are part way through, then things to start.
 */

/** Enough to swipe through, few enough to stay a rail rather than a catalogue. */
const SHELF_SIZE = 8;

type ShelfShow = {
  title: BibleBuddyTvTitle;
  /** Where this reader is: part way in, finished, or has not started. */
  state: "watching" | "watched" | "new";
  lastWatchedAt: string | null;
};

export default function BibleBuddyTvShelf({ userId }: { userId: string | null }) {
  const router = useRouter();
  const [shows, setShows] = useState<ShelfShow[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      /**
       * What this reader has actually watched, in one query.
       *
       * video_progress keys on the episode id, so the rows are matched back
       * to the show those episodes belong to. Asked for the reader's rows
       * rather than for progress on every episode in the catalogue: there
       * are hundreds of episodes and only ever a handful of rows.
       */
      let progress: Array<{ video_id: string; completed: boolean | null; updated_at: string | null }> = [];
      if (userId) {
        const { data } = await supabase
          .from("video_progress")
          .select("video_id, completed, updated_at")
          .eq("user_id", userId)
          .order("updated_at", { ascending: false })
          .limit(300);
        progress = data || [];
      }
      if (cancelled) return;

      const byEpisode = new Map(progress.map((row) => [row.video_id, row]));

      const scored: ShelfShow[] = bibleBuddyTvTitles.map((title) => {
        let state: ShelfShow["state"] = "new";
        let lastWatchedAt: string | null = null;

        for (const episode of title.episodes) {
          const row = byEpisode.get(episode.id);
          if (!row) continue;
          if (!lastWatchedAt || (row.updated_at || "") > lastWatchedAt) lastWatchedAt = row.updated_at || null;
          // One unfinished episode makes the whole show something you are in
          // the middle of; finishing them all is what makes it watched.
          if (!row.completed) state = "watching";
          else if (state !== "watching") state = "watched";
        }

        return { title, state, lastWatchedAt };
      });

      /**
       * Part way through first, most recent at the front; then the shows this
       * reader has not opened, in the order the catalogue already puts them,
       * which is Louis's own; finished ones last.
       *
       * No scoring invented beyond that. Nothing here claims to know what
       * somebody will like - it knows what they left unfinished, which is the
       * only thing on this page that has earned the front of a rail.
       */
      const watching = scored
        .filter((show) => show.state === "watching")
        .sort((a, b) => (b.lastWatchedAt || "").localeCompare(a.lastWatchedAt || ""));
      const fresh = scored.filter((show) => show.state === "new");
      const watched = scored.filter((show) => show.state === "watched");

      setShows([...watching, ...fresh, ...watched].slice(0, SHELF_SIZE));
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!shows || shows.length === 0) return null;

  return (
    <section aria-labelledby="home-tv-heading">
      <div className="flex items-center justify-between gap-3">
        <h2
          id="home-tv-heading"
          className="flex items-center gap-1.5 whitespace-nowrap text-[17px] font-black text-[var(--bb-text-primary,#111827)] sm:text-2xl"
        >
          <span aria-hidden className="text-base sm:text-2xl">📺</span>
          Bible Buddy TV
        </h2>
        <Link
          href="/biblebuddy-tv"
          className="shrink-0 rounded-full bg-[var(--bb-accent-soft,#eaf5ff)] px-3 py-1.5 text-xs font-black text-[var(--bb-accent,#2f7fe8)] transition hover:bg-[#dceeff] sm:px-4 sm:py-2 sm:text-sm"
        >
          All shows →
        </Link>
      </div>

      <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-5 sm:px-5 [&::-webkit-scrollbar]:hidden">
        <ul className="flex w-max snap-x snap-mandatory items-stretch gap-3 sm:gap-4">
          {shows.map((show, index) => {
            const tint = cardTint(index);
            const label =
              show.state === "watching"
                ? show.title.continueWatchingLabel || "Keep watching"
                : show.state === "watched"
                  ? "Watch again"
                  : show.title.badge;

            return (
              <li
                key={show.title.id}
                className="flex w-[148px] shrink-0 snap-start flex-col rounded-2xl border p-2 shadow-sm sm:w-[174px]"
                style={{ backgroundColor: tint.bg, borderColor: tint.border }}
              >
                <button
                  type="button"
                  onClick={() => router.push(`/biblebuddy-tv/shows/${show.title.slug}`)}
                  className="group relative block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)]"
                >
                  {show.state === "watching" ? (
                    <span className="absolute left-2 top-2 z-10 rounded-md bg-[var(--bb-accent,#2f7fe8)] px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow">
                      Keep watching
                    </span>
                  ) : null}
                  <div className="overflow-hidden rounded-xl shadow-[0_6px_16px_rgba(16,33,58,0.2)] transition group-hover:-translate-y-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={show.title.poster}
                      alt={show.title.title}
                      loading="lazy"
                      className="aspect-[2/3] w-full object-cover"
                    />
                  </div>
                  <p className="mt-2 line-clamp-2 h-[2.2em] text-xs font-black leading-tight text-[var(--bb-text-primary,#111827)] sm:text-[13px]">
                    {show.title.title}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] font-semibold text-[var(--bb-text-muted,#6b7280)]">
                    {label}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
