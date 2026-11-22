"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { cardTint } from "../../lib/cardTints";
import {
  communityEventStartsAt,
  getCommunityEventState,
  getLiveCommunityEvent,
  getUpcomingCommunityEvent,
} from "../../lib/communityEvents";
import { BIBLE_YEAR_PLAN_HREF } from "../../lib/bibleYearProgress";
import { BIBLE_YEAR_KEY, SHELF_SEATS, selectShelf, type ShelfCandidate, type ShelfRole } from "../../lib/bookshelf/selectShelf";
import { trackWisdomBookEvent } from "../../lib/wisdomOfProverbsProducts";
import { updateWidgets } from "../../lib/nativeWidgets";
import LoadFailedNotice from "../LoadFailedNotice";
import {
  BIBLE_YEAR_SHELF_COVER,
  BIBLE_YEAR_SHELF_TITLE,
  availability,
  fetchLibraryStudies,
  fetchProgressByStudy,
  withTotals,
  type LibraryStudy,
} from "../../lib/libraryCatalog";

/**
 * Your Bookshelf - one row of six books, chosen for the person looking.
 *
 * WHAT GOES WHERE is not decided here. lib/bookshelf/selectShelf.ts takes the
 * studies, this person's progress and the community calendar and hands back
 * the six seats in order (Louis, 2026-11-15):
 *
 *   1. the next community study, with its countdown and a way to sign up;
 *   2. the study the group is doing now, with the group's day;
 *   3. what this person read most recently;
 *   4-6. their other studies, then ones they finished, then suggestions.
 *
 * This file loads what that function needs and draws the cards. Nothing in
 * it names a study: the upcoming and live seats come from
 * lib/communityEvents.ts, so the next community study appears, counts down,
 * goes live and retires here with no change to this file.
 *
 * Nothing is invented either. Covers, lengths and dates come from the
 * devotionals table, personal progress from devotional_progress, the group's
 * day from the calendar, and the number studying from the same count the
 * study's own page shows. A number we do not have is left off the card.
 *
 * The reader's own day and the group's day are kept apart on purpose: someone
 * can be on day 9 while the group reads day 16, and the live card says both.
 *
 * It replaced HomeStudyToday and the Continue Your Journey day rail (October
 * 2026); the purple Today's Group Study card now sits directly under it.
 */

const PLAN_TOTAL_DAYS = 365;

/**
 * One row, and only one (Louis, 2026-11-07). Six since 2026-11-12. The grid
 * below has exactly this many columns, so change both or neither.
 */
const SHELF_MAX_BOOKS = SHELF_SEATS;

type LiveAction = { label: string; href: string; kind: "join" | "study_today" | "view_discussion" | "catch_up" };

type ShelfBook = {
  key: string;
  title: string;
  cover: string;
  href: string;
  /** Which seat this is and why: see lib/bookshelf/selectShelf.ts. */
  role: ShelfRole;
  reason: string;
  /** null when the reader has never finished a day of it. */
  currentDay: number | null;
  totalDays: number;
  /**
   * Days actually finished, which is NOT currentDay - 1 for everybody.
   * "Days remaining" and the percentage are both counted from this, so the
   * card never claims a day the reader has not done.
   */
  completedDays: number;
  percent: number;
  isComplete: boolean;
  /** The last day they finished anything in it. "Last read", not "last opened". */
  lastActivityAt: string | null;
  /** The sign-up page of an upcoming community study. */
  signUpHref: string | null;
  /** They are already signed up for it. */
  signedUp: boolean;
  /** Set only for a study the reader has not started that opens later. */
  startsLabel: string | null;
  /** When it opens, so the countdown can be recomputed as the clock moves. */
  availableFrom: string | null;
  /** The live community study only. */
  live: { communityDay: number; slug: string; participating: boolean; action: LiveAction } | null;
};

/** "Releases in 6d 20h" for a study that is not out yet, or null. */
function countdownLabel(book: ShelfBook, now: number): string | null {
  if (!book.availableFrom) return book.startsLabel;
  return availability({ available_from: book.availableFrom } as LibraryStudy, false, new Date(now)).label;
}

/** Days left, counted from days finished. Never negative, never more than the study is long. */
function daysRemaining(book: ShelfBook): number {
  return Math.max(0, Math.min(book.totalDays, book.totalDays - book.completedDays));
}

/** 0-100, whatever the stored percentage says, so a bar can never overrun. */
function safePercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

/**
 * "today", "yesterday", "3 days ago" - or null when there is no stamp to
 * work from. Compared by calendar day in the reader's own timezone.
 */
function relativeDayLabel(stamp: string | null, now: number): string | null {
  if (!stamp) return null;
  const then = new Date(stamp);
  if (Number.isNaN(then.getTime())) return null;
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((startOfDay(new Date(now)) - startOfDay(then)) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  return null;
}

/** "Nov 7, 2026" in the reader's own locale, or null. */
function formatDate(stamp: string | null): string | null {
  if (!stamp) return null;
  const date = new Date(stamp);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/**
 * The countdown broken into its three boxes, or null once the moment has
 * passed - which is what stops an expired countdown sitting on the card.
 */
function countdownParts(book: ShelfBook, now: number): { days: string; hours: string; minutes: string } | null {
  if (!book.availableFrom) return null;
  const left = new Date(book.availableFrom).getTime() - now;
  if (!Number.isFinite(left) || left <= 0) return null;
  const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");
  return {
    days: pad(Math.floor(left / 86_400_000)),
    hours: pad(Math.floor((left % 86_400_000) / 3_600_000)),
    minutes: pad(Math.floor((left % 3_600_000) / 60_000)),
  };
}

/**
 * The glow on the upcoming study. A shadow and nothing else: it changes no
 * size, so nothing on the shelf moves, and it only runs for a reader who has
 * not asked their device for less motion. Everybody else gets the same
 * purple ring, still.
 */
const SHELF_CSS = `
.bb-shelf-upcoming { box-shadow: 0 0 0 2px rgba(123,74,226,0.55), 0 8px 22px rgba(123,74,226,0.22); }
@media (prefers-reduced-motion: no-preference) {
  .bb-shelf-upcoming { animation: bb-shelf-glow 2.8s ease-in-out infinite; }
  @keyframes bb-shelf-glow {
    0%, 100% { box-shadow: 0 0 0 2px rgba(123,74,226,0.45), 0 6px 18px rgba(123,74,226,0.18); }
    50% { box-shadow: 0 0 0 3px rgba(214,165,60,0.75), 0 10px 30px rgba(123,74,226,0.38); }
  }
  .bb-shelf-live-dot { animation: bb-shelf-dot 1.6s ease-in-out infinite; }
  @keyframes bb-shelf-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
}
`;

/** Never let a side read stop the shelf: it just goes without that detail. */
async function soft<T>(run: () => PromiseLike<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch {
    return fallback;
  }
}

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
  /** The shelf could not be read, so say so instead of animating forever. */
  const [failed, setFailed] = useState(false);
  /** Bumped by Try Again; it is in the effect's deps, so the load re-runs. */
  const [reloadKey, setReloadKey] = useState(0);
  /** How many people are in the live study, when we can read it. */
  const [liveCount, setLiveCount] = useState<number | null>(null);

  /** A clock, so a countdown counts. Every minute: the smallest unit shown. */
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // The two community seats, straight from the calendar.
  const liveEvent = useMemo(() => getLiveCommunityEvent(), []);
  const upcomingEvent = useMemo(() => getUpcomingCommunityEvent(), []);
  const liveState = useMemo(() => (liveEvent ? getCommunityEventState(liveEvent) : null), [liveEvent]);
  const communityDay = liveState?.phase === "live" ? liveState.communityDay : null;

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const eventSlugs = [liveEvent?.slug, upcomingEvent?.slug].filter(Boolean) as string[];

      // The studies must load or there is no shelf; everything else is a
      // detail the shelf can do without, so each is read softly, side by side.
      const [studies, progress, plan, memberSlugs, recentBooks, bibleYearLast] = await Promise.all([
        fetchLibraryStudies(),
        userId ? fetchProgressByStudy(userId) : Promise.resolve({} as Awaited<ReturnType<typeof fetchProgressByStudy>>),
        /**
         * The guide this reader chose. A study sets preferred_study_mode to
         * "devotional" and names itself in louis_primary_devotional_id; Bible
         * in One Year sets the mode to "bible_year" and names nothing.
         */
        userId
          ? soft(async () => {
              const { data } = await supabase
                .from("profile_stats")
                .select("preferred_study_mode, louis_primary_devotional_id")
                .eq("user_id", userId)
                .maybeSingle();
              return data as { preferred_study_mode?: string | null; louis_primary_devotional_id?: string | null } | null;
            }, null)
          : null,
        // Which of the two community studies they have signed up for.
        userId && eventSlugs.length
          ? soft(async () => {
              const { data } = await supabase.from("community_event_members").select("event_slug").eq("user_id", userId).in("event_slug", eventSlugs);
              return new Set((data || []).map((row) => String(row.event_slug)));
            }, new Set<string>())
          : new Set<string>(),
        // The Bible books they read lately: the one signal recommendations
        // use beyond their own studies.
        userId
          ? soft(async () => {
              const { data } = await supabase
                .from("completed_chapters")
                .select("book")
                .eq("user_id", userId)
                .order("completed_at", { ascending: false })
                .limit(40);
              return (data || []).map((row) => String(row.book || "").toLowerCase()).filter(Boolean);
            }, [] as string[])
          : ([] as string[]),
        // Bible in One Year keeps no date on its own rows, so "last read" for
        // it is the newest finished-day action. Without this it could never
        // be the study somebody read most recently.
        userId && planCompletedDays > 0
          ? soft(async () => {
              const { data } = await supabase
                .from("master_actions")
                .select("created_at")
                .eq("user_id", userId)
                .in("action_type", ["bible_in_one_year_day_completed", "bible_in_one_year_reading_completed"])
                .order("created_at", { ascending: false })
                .limit(1);
              return (data?.[0]?.created_at as string | undefined) ?? null;
            }, null as string | null)
          : null,
      ]);

      if (cancelled) return;

      const chosenKey = plan?.preferred_study_mode === "bible_year" ? BIBLE_YEAR_KEY : plan?.louis_primary_devotional_id ?? null;
      const upcomingStartsAt = upcomingEvent ? communityEventStartsAt(upcomingEvent) : null;

      const studyBooks: ShelfBook[] = studies.map((s) => {
        const p = withTotals(progress[s.id], s.total_days);
        const started = p.completedDays > 0;
        const isUpcoming = Boolean(upcomingEvent && s.id === upcomingEvent.devotionalId);
        const isLive = Boolean(liveEvent && s.id === liveEvent.devotionalId && communityDay);

        let live: ShelfBook["live"] = null;
        if (isLive && liveEvent && communityDay) {
          const participating = started || memberSlugs.has(liveEvent.slug);
          const dayHref = (day: number) => `/plan?view=bible_studies&study=${encodeURIComponent(s.id)}&day=${day}`;
          // Days are done in order, so "the first day not finished" against
          // the group's day says where this person stands.
          const action: LiveAction = !participating
            ? { label: "Join Study", href: `/events/${liveEvent.slug}?join=1&src=bookshelf`, kind: "join" }
            : p.isComplete || p.nextDay > communityDay
              ? // Today's day of the study, where that day's discussion is.
                // Never the feed (Louis, 2026-11-15: "i only want the
                // discussions in the day it belongs on the study").
                { label: "View Discussion", href: dayHref(communityDay), kind: "view_discussion" }
              : p.nextDay < communityDay
                ? { label: "Catch Up", href: dayHref(p.nextDay), kind: "catch_up" }
                : { label: "Study Today", href: dayHref(communityDay), kind: "study_today" };
          live = { communityDay, slug: liveEvent.slug, participating, action };
        }

        return {
          key: s.id,
          title: s.title,
          cover: s.cover_image || "",
          /**
           * THE STUDY'S OWN PAGE, NOT THE NEXT DAY (Louis, 2026-10-25, from
           * Rachel's message: "people can't get to the past days"). Tapping a
           * book opens the book; its day list is where every day lives.
           */
          href: started ? `/devotionals/${s.id}` : `/plan?view=bible_studies&study=${encodeURIComponent(s.id)}`,
          role: "recommended",
          reason: "",
          currentDay: started ? p.nextDay : null,
          totalDays: s.total_days,
          completedDays: p.completedDays,
          percent: p.percent,
          isComplete: p.isComplete,
          lastActivityAt: p.lastActivityAt,
          signUpHref: isUpcoming && upcomingEvent ? `/events/${upcomingEvent.slug}` : null,
          signedUp: Boolean(isUpcoming && upcomingEvent && memberSlugs.has(upcomingEvent.slug)),
          startsLabel: availability(s, started).label,
          // The upcoming community study counts down to the moment it opens
          // for the group, the same instant its sign-up popup ends on.
          availableFrom: isUpcoming ? upcomingStartsAt : started ? null : s.available_from,
          live,
        };
      });

      // Bible in One Year is a plan rather than a devotional row, so it is
      // assembled here from the numbers the home screen already has.
      const bibleYearStarted = planCompletedDays > 0;
      const bibleYear: ShelfBook = {
        key: BIBLE_YEAR_KEY,
        title: BIBLE_YEAR_SHELF_TITLE,
        cover: BIBLE_YEAR_SHELF_COVER,
        href: BIBLE_YEAR_PLAN_HREF,
        role: "recommended",
        reason: "",
        currentDay: bibleYearStarted ? planDay : null,
        totalDays: PLAN_TOTAL_DAYS,
        completedDays: planCompletedDays,
        percent: Math.round((planCompletedDays / PLAN_TOTAL_DAYS) * 100),
        isComplete: planCompletedDays >= PLAN_TOTAL_DAYS,
        lastActivityAt: bibleYearLast,
        signUpHref: null,
        signedUp: false,
        startsLabel: null,
        availableFrom: null,
        live: null,
      };

      const all = [...studyBooks, bibleYear];
      const byKey = new Map(all.map((book) => [book.key, book]));
      const sortOrders = new Map(studies.map((s, index) => [s.id, s.sort_order ?? 1000 + index]));
      const categories = new Map(studies.map((s) => [s.id, s.category]));

      const candidates: ShelfCandidate[] = all.map((book) => ({
        key: book.key,
        title: book.title,
        category: categories.get(book.key) ?? null,
        totalDays: book.totalDays,
        sortOrder: sortOrders.get(book.key) ?? 5000,
        started: book.currentDay !== null || book.completedDays > 0,
        isComplete: book.isComplete,
        lastActivityAt: book.lastActivityAt,
        // Dated, not started, and with no sign-up page behind it.
        comingSoon: !book.signUpHref && Boolean(book.startsLabel),
      }));

      const slots = selectShelf({
        candidates,
        upcomingKey: upcomingEvent?.devotionalId ?? null,
        liveKey: liveEvent && communityDay ? liveEvent.devotionalId : null,
        chosenKey,
        recentBooks,
        max: SHELF_MAX_BOOKS,
      });

      const shelf = slots
        .map((slot) => {
          const book = byKey.get(slot.key);
          return book ? { ...book, role: slot.role, reason: slot.reason } : null;
        })
        .filter((book): book is ShelfBook => Boolean(book));
      setBooks(shelf);
      setLoading(false);

      // The My Study widget on the iPhone home screen: the first study on the
      // shelf the reader is actually partway through, in shelf order.
      const inProgress = shelf.find((book) => !book.isComplete && book.currentDay !== null && book.role !== "upcoming");
      updateWidgets({
        study: inProgress
          ? {
              title: inProgress.title,
              day: inProgress.currentDay,
              totalDays: inProgress.totalDays,
              completedDays: inProgress.completedDays,
              cover: inProgress.cover || null,
              href: inProgress.href,
            }
          : null,
      });
    })().catch((error: unknown) => {
      if (cancelled) return;
      console.warn("[BOOKSHELF] Could not load the shelf:", error);
      setFailed(true);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [userId, planDay, planCompletedDays, liveEvent, upcomingEvent, communityDay, reloadKey]);

  // How many are in the live study. The same count the study's page shows;
  // if it cannot be read the card simply does not show a number.
  useEffect(() => {
    if (!liveEvent || !communityDay) return;
    let cancelled = false;
    void fetch(`${window.location.origin}/api/community-events/${liveEvent.slug}/count`)
      .then((response) => (response.ok ? response.json() : null))
      .then((body: { count?: number } | null) => {
        if (!cancelled && body && typeof body.count === "number" && body.count > 0) setLiveCount(body.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [liveEvent, communityDay]);

  /**
   * Buddies in every study on the shelf, keyed by study id (and the Bible in
   * One Year shelf id). The Library's own batched count, /api/library/counts,
   * so a cover here never disagrees with the same cover there (Louis,
   * 2026-11-22: "every study should have the buddy count"). One request for
   * the whole row; a study missing from it, or at zero, just shows no line.
   */
  const [buddyCounts, setBuddyCounts] = useState<Record<string, number>>({});
  useEffect(() => {
    let cancelled = false;
    void fetch(`${window.location.origin}/api/library/counts`)
      .then((response) => (response.ok ? response.json() : null))
      .then((body: { counts?: Record<string, number> } | null) => {
        if (!cancelled && body?.counts) setBuddyCounts(body.counts);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  /** Try Again: back to the skeleton, then run the load once more. */
  function retryLoad() {
    setFailed(false);
    setLoading(true);
    setReloadKey((k) => k + 1);
  }

  /** "2 studies in progress · 1 completed · 1 upcoming", from the shelf itself. */
  const shelfSummary = useMemo(() => {
    const upcoming = books.filter((b) => b.role === "upcoming" || (b.currentDay === null && Boolean(countdownLabel(b, now)))).length;
    const completed = books.filter((b) => b.isComplete).length;
    const inProgress = books.filter((b) => !b.isComplete && b.currentDay !== null).length;
    const parts: string[] = [];
    if (inProgress) parts.push(`${inProgress} ${inProgress === 1 ? "study" : "studies"} in progress`);
    if (completed) parts.push(`${completed} completed`);
    if (upcoming) parts.push(`${upcoming} upcoming`);
    return parts.join(" · ");
  }, [books, now]);

  /** Flipped one frame after the books land, so the progress bars grow from nothing. */
  const [barsIn, setBarsIn] = useState(false);
  useEffect(() => {
    if (loading || !books.length) return;
    const id = window.requestAnimationFrame(() => setBarsIn(true));
    return () => window.cancelAnimationFrame(id);
  }, [loading, books.length]);

  // One event for the whole row, not six: which book is in which seat, and
  // why. Once per load of the shelf.
  const shownRef = useRef("");
  useEffect(() => {
    if (loading || !books.length) return;
    const signature = books.map((book) => `${book.key}:${book.role}`).join("|");
    if (shownRef.current === signature) return;
    shownRef.current = signature;
    void trackWisdomBookEvent("bookshelf_shown", {
      seats: books.map((book, index) => ({ position: index + 1, study: book.key, title: book.title, role: book.role })),
    });
  }, [loading, books]);

  /** Every tap on a card: which seat, which kind of card, and what the button said. */
  function open(book: ShelfBook, index: number, href: string, action: string) {
    void trackWisdomBookEvent("bookshelf_card_clicked", {
      position: index + 1,
      study: book.key,
      title: book.title,
      role: book.role,
      action,
    });
    router.push(href);
  }

  if (failed) {
    return (
      <section>
        <LoadFailedNotice message="Couldn't load your bookshelf." onRetry={retryLoad} />
      </section>
    );
  }

  if (loading) {
    return (
      <section aria-labelledby="home-bookshelf-heading">
        <div>
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
    <section aria-labelledby="home-bookshelf-heading">
      <style>{SHELF_CSS}</style>
      {/* No outer card (Louis, 2026-10-17): each book has its own pastel card
          and the page is the holder, exactly as Quick Reads does it. */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2
              id="home-bookshelf-heading"
              className="flex items-center gap-1.5 whitespace-nowrap text-[17px] font-black text-[var(--bb-text-primary,#111827)] sm:text-2xl"
            >
              <span aria-hidden className="text-base sm:text-2xl">📖</span>
              Your Bookshelf
            </h2>
            {/* Counted from the shelf on screen, so it can never disagree with
                the cards under it. A part that is zero is dropped. */}
            {shelfSummary ? (
              <p className="mt-0.5 truncate text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)] sm:text-[13px]">{shelfSummary}</p>
            ) : null}
          </div>
          <Link
            href="/library"
            className="shrink-0 rounded-full bg-[var(--bb-accent-soft,#eaf5ff)] px-3 py-1.5 text-xs font-black text-[var(--bb-accent,#2f7fe8)] transition hover:bg-[#dceeff] sm:px-4 sm:py-2 sm:text-sm"
          >
            Library →
          </Link>
        </div>

        {/* Swipe on a phone, one grid row on a desktop. Six fixed columns, not
            auto-fit, so the row can never wrap (Louis, 2026-11-07). The
            upcoming study is first, so it is the first card a phone shows.
            pt-1 gives the glow on that first card room above it. */}
        <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-width:none] sm:-mx-5 sm:px-5 lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          <ul className="flex w-max snap-x snap-mandatory items-stretch gap-3 sm:gap-4 lg:grid lg:w-full lg:grid-cols-6">
            {books.map((book, index) => {
              const tint = cardTint(index);
              const isUpcoming = book.role === "upcoming";
              const live = book.role === "live" ? book.live : null;
              const countdown = countdownParts(book, now);
              // Dated, not started and with nothing to sign up for: a
              // placeholder until the morning it lands.
              const comingSoon = !isUpcoming && !live && book.currentDay === null && Boolean(countdownLabel(book, now));
              const percent = safePercent(book.percent);
              const releaseDate = formatDate(book.availableFrom);
              const finishedOn = book.isComplete ? formatDate(book.lastActivityAt) : null;
              const lastRead = relativeDayLabel(book.lastActivityAt, now);
              const groupPercent = live ? safePercent((live.communityDay / Math.max(1, book.totalDays)) * 100) : 0;
              // What this seat is, for a Bible Cover to style (bb-cv-* hooks,
              // app/bible-covers.css). Has no effect without a cover.
              // The buddy count. The live seat keeps its own sign-up count
              // too and shows whichever is larger, which is the rule the
              // Library count already follows for community studies.
              const buddies = Math.max(buddyCounts[book.key] ?? 0, live ? liveCount ?? 0 : 0);
              const buddiesLabel = buddies > 0 ? new Intl.NumberFormat().format(buddies) : null;
              const tone = isUpcoming ? "upcoming" : live ? "live" : comingSoon ? "soon" : book.isComplete ? "done" : book.role === "current" ? "current" : "other";

              // Where a tap goes, and what the button says.
              const target = isUpcoming
                ? { href: book.signedUp ? book.signUpHref || book.href : `${book.signUpHref}?join=1&src=bookshelf`, action: book.signedUp ? "signed_up" : "sign_up" }
                : live
                  ? { href: live.action.href, action: live.action.kind }
                  : { href: book.href, action: book.isComplete ? "read_again" : book.currentDay !== null ? "continue" : "open" };

              return (
                <li
                  key={book.key}
                  data-tone={tone}
                  className={`bb-cv-book flex w-[168px] shrink-0 snap-start flex-col rounded-2xl border p-2 shadow-sm transition motion-safe:duration-200 hover:shadow-md sm:w-[184px] lg:w-auto ${
                    isUpcoming ? "bb-shelf-upcoming" : ""
                  }`}
                  style={{ backgroundColor: tint.bg, borderColor: isUpcoming ? "#b79cf3" : tint.border }}
                >
                  <button
                    type="button"
                    disabled={comingSoon}
                    onClick={() => open(book, index, target.href, target.action)}
                    className="group relative block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] disabled:cursor-default"
                  >
                    {/* One badge, never a stack: what this seat is. */}
                    {isUpcoming ? (
                      <span className="bb-cv-badge absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#6d3fd4] px-2 py-1 text-[9px] font-black text-white shadow-md">
                        <span aria-hidden>🗓️</span> Upcoming Study
                      </span>
                    ) : live ? (
                      <span className="bb-cv-badge absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#b91c1c] px-2 py-1 text-[9px] font-black text-white shadow-md">
                        <span aria-hidden className="bb-shelf-live-dot h-1.5 w-1.5 rounded-full bg-white" /> Live Group Study
                      </span>
                    ) : comingSoon ? (
                      <span className="bb-cv-badge absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 rounded-full bg-[#6d3fd4] px-2 py-1 text-[9px] font-black text-white shadow-md">
                        <span aria-hidden>🗓️</span> Coming Soon
                      </span>
                    ) : book.isComplete ? (
                      <span className="bb-cv-badge absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#1f8f54] px-2 py-1 text-[9px] font-black text-white shadow-md">
                        <span aria-hidden>✔</span> Study Completed
                      </span>
                    ) : book.role === "current" ? (
                      <span className="bb-cv-badge absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#5b3fd4] px-2 py-1 text-[9px] font-black text-white shadow-md">
                        <span aria-hidden>📖</span> Currently Reading
                      </span>
                    ) : book.role === "chosen" ? (
                      <span className="bb-cv-badge absolute left-1.5 top-1.5 z-10 rounded-full bg-[#2b2150] px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow-md">
                        Your study
                      </span>
                    ) : book.role === "recommended" ? (
                      <span className="bb-cv-badge absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 rounded-full bg-[#0056fd] px-2 py-1 text-[9px] font-black text-white shadow-md">
                        <span aria-hidden>✨</span> For You
                      </span>
                    ) : null}
                    <div className="overflow-hidden rounded-xl shadow-[0_6px_16px_rgba(16,33,58,0.2)]">
                      {book.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={book.cover}
                          alt={book.title}
                          loading={index < 2 ? "eager" : "lazy"}
                          // Grey until it opens (Louis, 2026-11-15: "the next
                          // coming devotional cover should be gray"). The glow,
                          // the countdown and the purple button are what draw
                          // the eye; the grey cover says "not yet".
                          className={`aspect-[2/3] w-full object-cover ${comingSoon || isUpcoming ? "opacity-70 grayscale" : ""}`}
                        />
                      ) : (
                        <div className="flex aspect-[2/3] w-full items-center justify-center bg-[var(--bb-surface-soft,#eef2f7)] px-2 text-center text-[11px] font-black text-[var(--bb-text-muted,#6b7280)]">
                          {book.title}
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Two lines reserved, so the rows under the titles line up. */}
                  <p className="bb-cv-book-title mt-2 line-clamp-2 min-h-[2.5em] text-xs font-black leading-tight text-[var(--bb-text-primary,#111827)] sm:text-[13px]">
                    {book.title}
                  </p>

                  <div className="bb-cv-book-body mt-1 flex-1">
                    {isUpcoming ? (
                      <>
                        {countdown ? (
                          <>
                            <div className="flex gap-1" role="timer" aria-live="off">
                              {[
                                [countdown.days, "Days"],
                                [countdown.hours, "Hours"],
                                [countdown.minutes, "Minutes"],
                              ].map(([value, label]) => (
                                <span key={label} className="bb-cv-count flex-1 rounded-lg bg-white/80 px-1 py-1 text-center">
                                  <span className="bb-cv-hl block text-[14px] font-black leading-none text-[#4b2fae]">{value}</span>
                                  <span className="block text-[8px] font-bold uppercase tracking-wide text-[#7a6aa8]">{label}</span>
                                </span>
                              ))}
                            </div>
                            <p className="sr-only">
                              Starts in {countdown.days} days, {countdown.hours} hours and {countdown.minutes} minutes
                            </p>
                          </>
                        ) : (
                          <p className="bb-cv-hl text-[11px] font-black text-[#4b2fae]">Starting now</p>
                        )}
                        {releaseDate ? (
                          <p className="bb-cv-hl mt-1.5 flex items-center gap-1 text-[11px] font-black text-[#c81e1e]">
                            <span aria-hidden>📅</span> Starts {releaseDate}
                          </p>
                        ) : null}
                        <p className="mt-1 flex items-center gap-1 text-[10px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                          <span aria-hidden>👥</span> {buddiesLabel ? `${buddiesLabel} joined` : `${book.totalDays}-day group study`}
                        </p>
                      </>
                    ) : live ? (
                      <>
                        {/* The GROUP's day, from the calendar. Not this
                            person's: theirs is the line under the bar. */}
                        <p className="bb-cv-hl text-[11px] font-black text-[#b91c1c]">
                          Day {live.communityDay} of {book.totalDays}
                        </p>
                        <span className="bb-cv-track mt-1 block h-2 overflow-hidden rounded-full bg-white/80">
                          <span
                            className="bb-cv-fill bb-cv-fill-warm block h-full rounded-full bg-[#b91c1c] motion-safe:transition-[width] motion-safe:duration-700 motion-safe:ease-out"
                            style={{ width: `${barsIn ? groupPercent : 0}%` }}
                            role="progressbar"
                            aria-valuenow={groupPercent}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${book.title}: the group is on day ${live.communityDay} of ${book.totalDays}`}
                          />
                        </span>
                        <p className="bb-cv-hl mt-1.5 flex items-center gap-1 text-[10px] font-black text-[var(--bb-text-primary,#111827)]">
                          <span aria-hidden>📖</span> Today&apos;s reading is live!
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[10px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                          <span aria-hidden>👥</span>{" "}
                          {buddiesLabel ? `${buddiesLabel} studying together` : "Study with your Bible Buddies"}
                        </p>
                        {live.participating && book.currentDay !== null ? (
                          <p className="mt-1 flex items-center gap-1 text-[10px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                            <span aria-hidden>🙋</span> You: {book.isComplete ? "finished" : `Day ${book.currentDay}`}
                          </p>
                        ) : null}
                      </>
                    ) : comingSoon ? (
                      <>
                        <p className="bb-cv-hl text-[11px] font-black text-[#a57d2c]">{countdownLabel(book, now)}</p>
                        {releaseDate ? (
                          <p className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                            <span aria-hidden>📅</span> Releases {releaseDate}
                          </p>
                        ) : null}
                      </>
                    ) : book.isComplete ? (
                      <>
                        <p className="bb-cv-ok flex items-center gap-1 text-[11px] font-bold text-[#2f8f5b]">
                          <span aria-hidden>✅</span> Completed
                        </p>
                        {finishedOn ? (
                          <p className="mt-1 flex items-center gap-1 text-[10px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                            <span aria-hidden>📅</span> Completed {finishedOn}
                          </p>
                        ) : null}
                      </>
                    ) : book.currentDay !== null ? (
                      <>
                        <div className="flex items-baseline justify-between gap-1">
                          <p className="text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                            Day {book.currentDay} of {book.totalDays}
                          </p>
                          <span className="bb-cv-pill shrink-0 rounded-full bg-white/70 px-1.5 py-0.5 text-[10px] font-black text-[var(--bb-accent,#2f7fe8)]">
                            {percent}%
                          </span>
                        </div>
                        <span className="bb-cv-track mt-1.5 block h-2 overflow-hidden rounded-full bg-white/70">
                          <span
                            className="bb-cv-fill block h-full rounded-full bg-[var(--bb-accent,#2f7fe8)] motion-safe:transition-[width] motion-safe:duration-700 motion-safe:ease-out"
                            style={{ width: `${barsIn ? percent : 0}%` }}
                            role="progressbar"
                            aria-valuenow={percent}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${book.title}: ${percent}% complete`}
                          />
                        </span>
                        <p className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                          <span aria-hidden>📅</span> {daysRemaining(book)} days remaining
                        </p>
                      </>
                    ) : (
                      <>
                        {/* Why this one is here, when there is a reason. */}
                        <p className="text-[11px] font-bold leading-snug text-[var(--bb-text-muted,#6b7280)]">
                          {book.reason && book.reason !== "Start this study" ? book.reason : "Start this study"}
                        </p>
                        <p className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                          <span aria-hidden>📅</span> {book.totalDays} days
                        </p>
                      </>
                    )}

                    {/* The buddy count on every other card: the community
                        seats already say it in their own words above. */}
                    {buddiesLabel && !isUpcoming && !live ? (
                      <p className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                        <span aria-hidden>👥</span> {buddiesLabel} studying together
                      </p>
                    ) : null}

                    {/* Last READ, not last opened. Hidden on the community
                        seats, which speak for the group, and on a finished
                        study, where the date above already says it. */}
                    {lastRead && !book.isComplete && !isUpcoming && !live && book.currentDay !== null ? (
                      <p className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[var(--bb-text-muted,#9aa3b2)]">
                        <span aria-hidden>🕒</span> Last read {lastRead}
                      </p>
                    ) : null}
                  </div>

                  {/* One button. Purple for the upcoming study, red for the
                      live one, green outline to read a finished one again,
                      solid blue for what they are reading, soft blue for the
                      rest. */}
                  <button
                    type="button"
                    disabled={comingSoon}
                    onClick={() => open(book, index, target.href, target.action)}
                    data-signed={isUpcoming && book.signedUp ? "true" : undefined}
                    className={`bb-cv-btn mt-2.5 flex min-h-[40px] w-full items-center justify-center gap-1 whitespace-nowrap rounded-full px-1.5 py-2 text-center text-[12px] font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 active:scale-[0.98] ${
                      isUpcoming
                        ? book.signedUp
                          ? "border-2 border-[#6d3fd4] bg-white/70 text-[#5b3fd4] ring-[#5b3fd4]"
                          : "bg-gradient-to-r from-[#7b4ae2] to-[#5b3fd4] text-white shadow-sm ring-[#5b3fd4] hover:brightness-105"
                        : live
                          ? "bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white shadow-sm ring-[#b91c1c] hover:brightness-105"
                          : comingSoon
                            ? "cursor-default bg-[#f3ece0] text-[#a57d2c]"
                            : book.isComplete
                              ? "border-2 border-[#1f8f54] bg-transparent text-[#1f8f54] ring-[#1f8f54] hover:bg-[#1f8f54]/10"
                              : book.role === "current"
                                ? "bg-gradient-to-r from-[var(--bb-accent,#2f7fe8)] to-[#1f5fd0] text-[var(--bb-button-text,#ffffff)] shadow-sm ring-[var(--bb-accent,#2f7fe8)] hover:brightness-105"
                                : "bg-[var(--bb-accent-soft,#eaf5ff)] text-[var(--bb-accent,#2f7fe8)] ring-[var(--bb-accent,#2f7fe8)] hover:bg-[#dceeff]"
                    }`}
                  >
                    {isUpcoming ? (
                      book.signedUp ? (
                        <>
                          <span className="text-[11px]">You&apos;re Signed Up! ✓</span>
                        </>
                      ) : (
                        <>
                          <span aria-hidden>🔔</span> Sign Up →
                        </>
                      )
                    ) : live ? (
                      <>{live.action.label} →</>
                    ) : comingSoon ? (
                      "Coming soon"
                    ) : book.isComplete ? (
                      <>
                        <span aria-hidden>↻</span> Read Again →
                      </>
                    ) : book.currentDay !== null ? (
                      "Continue →"
                    ) : (
                      "Start →"
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
