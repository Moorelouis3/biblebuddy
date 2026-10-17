"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { BIBLE_STUDY_GROUP_ID } from "../../lib/bibleStudiesCatalog";
import { getActiveCommunityEvent, getCommunityEventState } from "../../lib/communityEvents";
import { BIBLE_YEAR_PLAN_HREF } from "../../lib/bibleYearProgress";
import {
  BIBLE_YEAR_SHELF_COVER,
  BIBLE_YEAR_SHELF_TITLE,
  availability,
  fetchLibraryStudies,
  fetchProgressByStudy,
  withTotals,
} from "../../lib/libraryCatalog";

/**
 * Your Bookshelf - one section where the home screen used to carry two.
 *
 * It replaces HomeStudyToday (the community study's day panel) and the
 * Continue Your Journey day rail. Those were a tall lavender panel and a
 * horizontal strip of square day tiles; between them the fold was gone before
 * anything else on the page got a look in. This is one shelf of upright covers
 * with the reader's real position under each.
 *
 * Nothing here is invented: covers, day counts and availability come from the
 * devotionals table, personal progress from devotional_progress, and the
 * community reading from lib/communityEvents plus that day's own row. A study
 * nobody has started says so rather than showing an empty bar.
 *
 * The reader's own day and the community's scheduled day are deliberately kept
 * apart - someone can be on day 9 of Proverbs while the group reads day 16, and
 * the strip under the shelf is the only thing that speaks for the group.
 */

const PLAN_TOTAL_DAYS = 365;

type ShelfBook = {
  key: string;
  title: string;
  cover: string;
  href: string;
  /** null when the reader has never opened it. */
  currentDay: number | null;
  totalDays: number;
  percent: number;
  isComplete: boolean;
  lastActivityAt: string | null;
  isCommunityToday: boolean;
  /** Set only for a study the reader has not started that opens later. */
  startsLabel: string | null;
};

export default function YourBookshelf({
  userId,
  planDay,
  planCompletedDays,
}: {
  userId: string | null;
  planDay: number | null;
  planCompletedDays: number;
}) {
  const router = useRouter();
  const [books, setBooks] = useState<ShelfBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayStrip, setTodayStrip] = useState<{
    studyTitle: string;
    reading: string;
    dayTitle: string;
  } | null>(null);

  const event = useMemo(() => getActiveCommunityEvent(), []);
  const eventState = useMemo(() => (event ? getCommunityEventState(event) : null), [event]);
  const communityDay = eventState?.phase === "live" ? eventState.communityDay : null;

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const studies = await fetchLibraryStudies();
      const progress = userId ? await fetchProgressByStudy(userId) : {};
      if (cancelled) return;

      const studyBooks: ShelfBook[] = studies.map((s) => {
        const p = withTotals(progress[s.id], s.total_days);
        const started = p.completedDays > 0;
        return {
          key: s.id,
          title: s.title,
          cover: s.cover_image || "",
          // Started readers go straight to their day; everyone else to the
          // study's own page, which is where you choose where to begin.
          href: started
            ? `/devotionals/${s.id}/day/${p.nextDay}`
            : `/plan?view=bible_studies&study=${encodeURIComponent(s.id)}`,
          currentDay: started ? p.nextDay : null,
          totalDays: s.total_days,
          percent: p.percent,
          isComplete: p.isComplete,
          lastActivityAt: p.lastActivityAt,
          isCommunityToday: Boolean(event && s.id === event.devotionalId && communityDay),
          startsLabel: availability(s, started).label,
        };
      });

      // Bible in One Year is a plan rather than a devotional row, so it is
      // assembled here from the same numbers the old day rail used.
      const bibleYear: ShelfBook = {
        key: "bible-in-one-year",
        title: BIBLE_YEAR_SHELF_TITLE,
        cover: BIBLE_YEAR_SHELF_COVER,
        href: BIBLE_YEAR_PLAN_HREF,
        currentDay: planDay,
        totalDays: PLAN_TOTAL_DAYS,
        percent: Math.round((planCompletedDays / PLAN_TOTAL_DAYS) * 100),
        isComplete: planCompletedDays >= PLAN_TOTAL_DAYS,
        lastActivityAt: null,
        isCommunityToday: false,
        startsLabel: null,
      };

      const all = [...studyBooks, bibleYear];
      const started = all.filter((b) => b.currentDay !== null && !b.isComplete);
      const rest = all.filter((b) => b.currentDay === null || b.isComplete);

      started.sort((a, b) => (b.lastActivityAt || "").localeCompare(a.lastActivityAt || ""));
      // Nothing started yet: the community study leads, then Bible in One Year.
      rest.sort((a, b) => {
        if (a.isCommunityToday !== b.isCommunityToday) return a.isCommunityToday ? -1 : 1;
        if ((a.key === "bible-in-one-year") !== (b.key === "bible-in-one-year")) {
          return a.key === "bible-in-one-year" ? -1 : 1;
        }
        return 0;
      });

      setBooks([...started, ...rest]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, planDay, planCompletedDays, event, communityDay]);

  // The group's reading for today, for the strip under the shelf.
  useEffect(() => {
    let cancelled = false;
    if (!event || !communityDay) {
      setTodayStrip(null);
      return;
    }
    void (async () => {
      const { data } = await supabase
        .from("devotional_days")
        .select("day_title,bible_reading_book,bible_reading_chapter")
        .eq("devotional_id", event.devotionalId)
        .eq("day_number", communityDay)
        .maybeSingle();
      if (cancelled || !data) return;
      setTodayStrip({
        studyTitle: event.title,
        reading: `${(data as any).bible_reading_book} ${(data as any).bible_reading_chapter}`,
        dayTitle: (data as any).day_title || "",
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [event, communityDay]);


  if (loading) {
    return (
      <section aria-labelledby="home-bookshelf-heading">
        <div className="rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm sm:p-5">
          <div className="h-6 w-44 animate-pulse rounded bg-[var(--bb-surface-soft,#eef2f7)]" />
          <div className="mt-5 flex gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-[132px] shrink-0 sm:w-[158px]">
                <div className="aspect-[2/3] w-full animate-pulse rounded-xl bg-[var(--bb-surface-soft,#eef2f7)]" />
                <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-[var(--bb-surface-soft,#eef2f7)]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (books.length === 0) return null;

  return (
    <>
      <section aria-labelledby="home-bookshelf-heading">
        <div className="rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              {/* Sized for a 375px phone first: at text-xl the two words wrapped
                  and shoved the pill onto its own line (Louis, 2026-10-17 -
                  "way too big, makes multi lines"). The subtitle under it went
                  the same day, to buy back the height. */}
              <h2
                id="home-bookshelf-heading"
                className="flex items-center gap-1.5 whitespace-nowrap text-[17px] font-black text-[var(--bb-text-primary,#111827)] sm:text-2xl"
              >
                <span aria-hidden className="text-base sm:text-2xl">📖</span>
                Continue Reading
              </h2>
            </div>
            <Link
              href="/library"
              className="shrink-0 rounded-full bg-[var(--bb-accent-soft,#eaf5ff)] px-3 py-1.5 text-xs font-black text-[var(--bb-accent,#2f7fe8)] transition hover:bg-[#dceeff] sm:px-4 sm:py-2 sm:text-sm"
            >
              Library →
            </Link>
          </div>

          {/* The covers are the point, so they are large. The row swipes on a
              phone with the next one peeking; on a desktop three or four sit
              side by side. */}
          <div className="-mx-4 mt-5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-5 sm:px-5 [&::-webkit-scrollbar]:hidden">
            <ul className="flex w-max snap-x snap-mandatory items-stretch gap-3 sm:gap-4">
              {books.map((book, index) => {
                const primaryLabel = book.isComplete
                  ? "Read Again →"
                  : book.currentDay !== null
                    ? "Continue →"
                    : "Open →";
                // The book they are furthest into wears the solid button; the
                // rest are tinted, so the eye lands on one thing.
                const isLead = index === 0;
                return (
                  <li key={book.key} className="flex w-[132px] shrink-0 snap-start flex-col sm:w-[158px]">
                    <button
                      type="button"
                      onClick={() => router.push(book.href)}
                      className="group relative block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)]"
                    >
                      {book.isCommunityToday ? (
                        <span className="absolute left-2 top-2 z-10 rounded-md bg-[var(--bb-accent,#2f7fe8)] px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow">
                          Group study
                        </span>
                      ) : null}
                      <div className="overflow-hidden rounded-xl shadow-[0_6px_16px_rgba(16,33,58,0.2)] transition group-hover:-translate-y-0.5">
                        {book.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={book.cover}
                            alt={book.title}
                            loading="lazy"
                            className="aspect-[2/3] w-full object-cover"
                          />
                        ) : (
                          <div className="flex aspect-[2/3] w-full items-center justify-center bg-[var(--bb-surface-soft,#eef2f7)] px-2 text-center text-[11px] font-black text-[var(--bb-text-muted,#6b7280)]">
                            {book.title}
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Two lines, always: a one-line title used to pull its
                        progress bar and button up out of line with the book
                        beside it. */}
                    <p className="mt-2 line-clamp-2 h-[2.2em] text-xs font-black leading-tight text-[var(--bb-text-primary,#111827)] sm:text-[13px]">
                      {book.title}
                    </p>

                    <div className="mt-1 flex-1">
                      {book.startsLabel ? (
                        <p className="text-[11px] font-black text-[#a57d2c]">{book.startsLabel}</p>
                      ) : book.isComplete ? (
                        <p className="flex items-center gap-1 text-[11px] font-bold text-[#2f8f5b]">
                          <span aria-hidden>✅</span> Completed
                        </p>
                      ) : book.currentDay !== null ? (
                        <>
                          <p className="text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                            Day {book.currentDay} of {book.totalDays}
                          </p>
                          <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#eef2f7)]">
                            <span
                              className="block h-full rounded-full bg-[var(--bb-accent,#2f7fe8)]"
                              style={{ width: `${book.percent}%` }}
                            />
                          </span>
                        </>
                      ) : (
                        <p className="text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">Start this study</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => router.push(book.href)}
                      className={`mt-2.5 w-full rounded-full px-2 py-2 text-center text-xs font-black transition sm:text-[13px] ${
                        isLead
                          ? "bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] text-[var(--bb-button-text,#ffffff)] hover:opacity-95"
                          : "bg-[var(--bb-accent-soft,#eaf5ff)] text-[var(--bb-accent,#2f7fe8)] hover:bg-[#dceeff]"
                      }`}
                    >
                      {primaryLabel}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Today's Group Study - its own card, because the group's reading is a
          different thing from the reader's own place in a book. Called "Today
          Together" until 2026-10-17; Louis wanted it to say what it is. */}
      {todayStrip ? (
        <section aria-labelledby="home-today-together-heading">
          {/* The lavender community look, the same family as From Your Groups
              further down the dashboard (Louis, 2026-10-17: the plain blue
              container "doesn't match the more polished components").
              bg-journey is the one illustrated background the dashboard was
              not using - a path over soft hills - so the two community cards
              are related without being the same picture twice.

              The text colours are fixed rather than themed, as on From Your
              Groups: the background is a fixed light illustration, so themed
              text would turn white on it in dark mode. */}
          <div
            className="relative overflow-hidden rounded-3xl border border-[#ddd6f3] p-4 shadow-sm sm:p-5"
            style={{
              backgroundColor: "#f5f2ff",
              backgroundImage: "url(/home-cards/bg-journey.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "left bottom",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* On a phone the button goes underneath, full width. Beside the
                text it left the heading about 150px to live in, which broke it
                across two lines (Louis, 2026-10-17). */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0 flex-1">
                <h2
                  id="home-today-together-heading"
                  className="flex items-center gap-2 whitespace-nowrap text-base font-black text-[#2b2150] sm:text-xl"
                >
                  <span aria-hidden>👥</span>
                  Today&rsquo;s Group Study
                </h2>
                <p className="mt-1 text-sm font-black text-[#2b2150] sm:text-[15px]">
                  {todayStrip.reading}
                  {todayStrip.dayTitle ? <> &middot; {todayStrip.dayTitle}</> : null}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#6a5aa8] sm:text-sm">
                  Read, reflect, and join the discussion with others in the Bible Buddy community.
                </p>
              </div>
              <Link
                href={`/study-groups/${BIBLE_STUDY_GROUP_ID}/chat`}
                className="block shrink-0 rounded-full bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] px-5 py-2.5 text-center text-sm font-black text-[var(--bb-button-text,#ffffff)] transition hover:opacity-95 sm:py-3"
              >
                Join Discussion →
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
