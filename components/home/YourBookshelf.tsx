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
        <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm sm:p-5">
          <div className="h-5 w-40 animate-pulse rounded bg-[var(--bb-surface-soft,#eef2f7)]" />
          <div className="mt-4 flex gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-[88px] shrink-0 sm:w-[104px]">
                <div className="aspect-[2/3] w-full animate-pulse rounded-lg bg-[var(--bb-surface-soft,#eef2f7)]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (books.length === 0) return null;

  return (
    <section aria-labelledby="home-bookshelf-heading">
      <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              id="home-bookshelf-heading"
              className="text-lg font-black text-[var(--bb-text-primary,#111827)]"
            >
              Your Bookshelf
            </h2>
            <p className="mt-0.5 text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
              Pick up where you left off.
            </p>
          </div>
          <Link
            href="/library"
            className="shrink-0 text-sm font-black text-[var(--bb-accent,#2f7fe8)] hover:underline"
          >
            View all →
          </Link>
        </div>

        {/* Swipes on a phone with the next cover peeking, several side by side
            on a desktop. Snap so a swipe settles on a book, not between two. */}
        <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-5 sm:px-5 [&::-webkit-scrollbar]:hidden">
          <ul className="flex w-max snap-x snap-mandatory gap-4 sm:gap-5">
            {books.map((book) => (
              <li key={book.key} className="w-[92px] shrink-0 snap-start sm:w-[108px]">
                <button
                  type="button"
                  onClick={() => router.push(book.href)}
                  className="group block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)]"
                >
                  <div className="relative">
                    {book.isCommunityToday ? (
                      <span className="absolute -top-1.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--bb-accent,#2f7fe8)] px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-white shadow">
                        Today&rsquo;s study
                      </span>
                    ) : null}
                    <div className="overflow-hidden rounded-lg shadow-[0_4px_10px_rgba(16,33,58,0.18)] transition group-hover:-translate-y-0.5">
                      {book.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={book.cover}
                          alt={book.title}
                          loading="lazy"
                          className="aspect-[2/3] w-full object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[2/3] w-full items-center justify-center bg-[var(--bb-surface-soft,#eef2f7)] px-1.5 text-center text-[10px] font-black text-[var(--bb-text-muted,#6b7280)]">
                          {book.title}
                        </div>
                      )}
                    </div>
                  </div>
                </button>

                {/* The shelf the covers stand on. */}
                <div className="mt-0 h-[3px] w-full rounded-full bg-gradient-to-b from-[#dfe6ef] to-[#c7d2e0]" />

                <p
                  className={`mt-2 text-center text-[11px] font-black leading-tight ${
                    book.startsLabel ? "text-[#a57d2c]" : "text-[var(--bb-text-primary,#111827)]"
                  }`}
                >
                  {book.startsLabel
                    ? book.startsLabel
                    : book.isComplete
                      ? "Completed"
                      : book.currentDay !== null
                        ? `Day ${book.currentDay} of ${book.totalDays}`
                        : "Start this study"}
                </p>

                {book.currentDay !== null && !book.isComplete ? (
                  <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#eef2f7)]">
                    <span
                      className="block h-full rounded-full bg-[var(--bb-accent,#2f7fe8)]"
                      style={{ width: `${book.percent}%` }}
                    />
                  </span>
                ) : null}

                <button
                  type="button"
                  onClick={() => router.push(book.href)}
                  className="mt-1.5 block w-full text-center text-[11px] font-black text-[var(--bb-accent,#2f7fe8)] hover:underline"
                >
                  {book.isComplete ? "Read again →" : book.currentDay !== null ? "Continue →" : "Open →"}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {todayStrip ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-xl bg-[#fdf6e7] px-3 py-2.5">
            <p className="min-w-0 text-[13px] font-semibold leading-snug text-[#7a5b1c]">
              <span aria-hidden className="mr-1.5">👥</span>
              <span className="font-black">Today together:</span> {todayStrip.reading}
              {todayStrip.dayTitle ? <> · {todayStrip.dayTitle}</> : null}
            </p>
            <Link
              href={`/study-groups/${BIBLE_STUDY_GROUP_ID}/chat`}
              className="shrink-0 text-[13px] font-black text-[#a57d2c] hover:underline"
            >
              Join discussion →
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
