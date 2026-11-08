"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { cardTint } from "../../lib/cardTints";
import { BIBLE_STUDY_GROUP_ID } from "../../lib/bibleStudiesCatalog";
import { COMMUNITY_EVENTS, getActiveCommunityEvent, getCommunityEventState } from "../../lib/communityEvents";
import { BIBLE_YEAR_PLAN_HREF } from "../../lib/bibleYearProgress";
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

/**
 * One row, and only one (Louis, 2026-11-07: "i only want one row of the book
 * shelf and we dont need all the devotionals just enough to fill the row... as
 * we add more they all dont need be on the bookshelf").
 *
 * Five is what fills the desktop row, so the shelf takes the first five of an
 * order that already puts the right ones in front: what you are reading, newest
 * first, then the study you set as yours, then today's community study, then
 * the one opening next. Everything past that is a catalogue, and the catalogue
 * is the Library link in this header - the shelf grows a sixth card the day a
 * sixth column fits, not the day a sixth study ships.
 */
const SHELF_MAX_BOOKS = 5;

type ShelfBook = {
  key: string;
  title: string;
  cover: string;
  href: string;
  /** null when the reader has never opened it. */
  currentDay: number | null;
  totalDays: number;
  /**
   * Days actually finished, which is NOT currentDay - 1 for everybody.
   * Somebody can be on day 9 with eight finished, or skip ahead and be on day
   * 9 with three. "Days remaining" and the percentage are both counted from
   * this, so the card never claims a day the reader has not done.
   */
  completedDays: number;
  percent: number;
  isComplete: boolean;
  /**
   * The newest `completed_at` on any of this study's days - so it is the last
   * time they READ, not the last time they opened the book, and the card says
   * "Last read" rather than "Last opened" because that is what the number is.
   * On a finished study the same stamp is the day they finished it.
   */
  lastActivityAt: string | null;
  isCommunityToday: boolean;
  /**
   * The event page for a community study that has been announced but has not
   * started, e.g. /events/beginning-of-everything through October.
   *
   * A dated study used to sit on the shelf as a dead "Coming soon" tile, which
   * is the one moment somebody is actually interested and the card had nothing
   * for them to do (Louis, 2026-10-25). When this is set the card takes a
   * "Sign up" button instead, and the countdown moves under the cover where it
   * still tells them when it starts.
   */
  signUpHref: string | null;
  /** Set only for a study the reader has not started that opens later. */
  startsLabel: string | null;
  /** The release date, so the countdown can be recomputed as the clock moves. */
  availableFrom: string | null;
};

/**
 * "Releases in 6d 20h" for a study that is not out yet, or null.
 *
 * Takes the clock as an argument so the card recomputes it on every tick
 * rather than reading a string frozen when the shelf loaded.
 */
function countdownLabel(book: ShelfBook, now: number): string | null {
  if (!book.availableFrom) return book.startsLabel;
  return availability({ available_from: book.availableFrom } as LibraryStudy, false, new Date(now)).label;
}

/**
 * Days left, counted from days finished rather than from the day they are on.
 *
 * Never negative and never more than the study is long: somebody who has
 * finished more days than the catalogue says it has - which happens when a
 * study is shortened after people start it - should see 0, not a minus
 * number.
 */
function daysRemaining(book: ShelfBook): number {
  return Math.max(0, Math.min(book.totalDays, book.totalDays - book.completedDays));
}

/** 0-100, whatever the stored percentage says, so a bar can never overrun. */
function safePercent(book: ShelfBook): number {
  if (!Number.isFinite(book.percent)) return 0;
  return Math.max(0, Math.min(100, Math.round(book.percent)));
}

/**
 * "today", "yesterday", "3 days ago" - or null when there is no stamp to
 * work from, in which case the card shows nothing rather than a guess.
 *
 * Compared by calendar day in the reader's own timezone, so something read at
 * 11pm last night reads as "yesterday" rather than "today" to anyone who
 * opens the app after midnight.
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
 * The countdown broken into its three boxes, or null once the date has
 * passed - which is what stops an expired countdown sitting on the card: the
 * clock ticking above re-runs this, it returns null, and the card falls
 * through to its ordinary state on its own.
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
 * The /events page for a study that has been announced and has not begun, or
 * null.
 *
 * Deliberately looks at every community event rather than asking
 * getActiveCommunityEvent: through October the active event is Proverbs, which
 * is running, while the one somebody can actually sign up for is the next one.
 * Both belong on the shelf and they are not the same study.
 */
function upcomingEventHref(devotionalId: string): string | null {
  const event = COMMUNITY_EVENTS.find((e) => e.devotionalId === devotionalId);
  if (!event) return null;
  return getCommunityEventState(event).phase === "countdown" ? `/events/${event.slug}` : null;
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
  /** The study this reader set as their plan; the shelf leads with it and marks it. */
  const [chosenKey, setChosenKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  /**
   * The shelf could not be read, so say so instead of animating forever.
   *
   * The load below is a bare async effect: before this, a throw anywhere in
   * it skipped setLoading(false) and the three grey covers pulsed until the
   * tab was closed. Since the auth-lock fix a request CAN throw - it aborts
   * after 30 seconds rather than hanging - so this path is now reachable.
   */
  const [failed, setFailed] = useState(false);
  /** Bumped by Try Again; it is in the effect's deps, so the load re-runs. */
  const [reloadKey, setReloadKey] = useState(0);

  /**
   * A clock, so a countdown counts.
   *
   * Every minute, because the label's smallest unit is a minute: anything
   * faster re-renders the shelf to redraw text that has not changed.
   */
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);


  const event = useMemo(() => getActiveCommunityEvent(), []);
  const eventState = useMemo(() => (event ? getCommunityEventState(event) : null), [event]);
  const communityDay = eventState?.phase === "live" ? eventState.communityDay : null;

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const studies = await fetchLibraryStudies();
      const progress = userId ? await fetchProgressByStudy(userId) : {};

      /**
       * The guide this reader chose, whichever kind it is.
       *
       * Two things can be chosen and they are stored differently. A study
       * sets preferred_study_mode to "devotional" and names itself in
       * louis_primary_devotional_id; Bible in One Year sets the mode to
       * "bible_year" and names nothing, because it is a plan rather than a
       * row in devotionals - which is also why it is the one book on this
       * shelf whose key is not a uuid. 689 accounts are on bible_year and
       * 169 on a devotional, so reading only the devotional id would have
       * fixed this for the smaller half (Louis: "I need it for all guides,
       * not just the 21 Women").
       *
       * "bible" is the third mode: reading the Bible itself, which is not a
       * book on this shelf and so leads nothing here.
       */
      let chosenStudyId: string | null = null;
      if (userId) {
        const { data: plan } = await supabase
          .from("profile_stats")
          .select("preferred_study_mode, louis_primary_devotional_id")
          .eq("user_id", userId)
          .maybeSingle();
        const row = plan as { preferred_study_mode?: string | null; louis_primary_devotional_id?: string | null } | null;
        chosenStudyId =
          row?.preferred_study_mode === "bible_year"
            ? "bible-in-one-year"
            : row?.louis_primary_devotional_id ?? null;
      }

      if (cancelled) return;

      const studyBooks: ShelfBook[] = studies.map((s) => {
        const p = withTotals(progress[s.id], s.total_days);
        const started = p.completedDays > 0;
        return {
          key: s.id,
          title: s.title,
          cover: s.cover_image || "",
          /**
           * THE STUDY'S OWN PAGE, NOT THE NEXT DAY (Louis, 2026-10-25,
           * reporting Rachel's message: "people can't get to the past days").
           *
           * This used to jump a started reader straight to their next day,
           * which made that day the only day they could reach: there was no
           * way back to day 3 to re-read it, finish one they skipped, or just
           * see how far through they were. Tapping a book should open the
           * book. The day list on /devotionals/[id] is where every day lives,
           * the next one included, so nothing is further away than it was -
           * it is one tap instead of nought, and the other N days went from
           * unreachable to one tap.
           */
          href: started
            ? `/devotionals/${s.id}`
            : `/plan?view=bible_studies&study=${encodeURIComponent(s.id)}`,
          currentDay: started ? p.nextDay : null,
          totalDays: s.total_days,
          completedDays: p.completedDays,
          percent: p.percent,
          isComplete: p.isComplete,
          lastActivityAt: p.lastActivityAt,
          isCommunityToday: Boolean(event && s.id === event.devotionalId && communityDay),
          signUpHref: started ? null : upcomingEventHref(s.id),
          startsLabel: availability(s, started).label,
          availableFrom: started ? null : s.available_from,
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
        completedDays: planCompletedDays,
        percent: Math.round((planCompletedDays / PLAN_TOTAL_DAYS) * 100),
        isComplete: planCompletedDays >= PLAN_TOTAL_DAYS,
        lastActivityAt: null,
        isCommunityToday: false,
        signUpHref: null,
        startsLabel: null,
        availableFrom: null,
      };

      const all = [...studyBooks, bibleYear];
      const started = all.filter((b) => b.currentDay !== null && !b.isComplete);
      const rest = all.filter((b) => b.currentDay === null || b.isComplete);

      started.sort((a, b) => (b.lastActivityAt || "").localeCompare(a.lastActivityAt || ""));
      // Nothing started yet: the community study leads, then Bible in One Year.
      rest.sort((a, b) => {
        if (a.isCommunityToday !== b.isCommunityToday) return a.isCommunityToday ? -1 : 1;
        // Next to the study of the month, not buried behind the back
        // catalogue (Louis, 2026-10-25). The study running and the study
        // opening are the two this shelf is actually about.
        if (Boolean(a.signUpHref) !== Boolean(b.signUpHref)) return a.signUpHref ? -1 : 1;
        if ((a.key === "bible-in-one-year") !== (b.key === "bible-in-one-year")) {
          return a.key === "bible-in-one-year" ? -1 : 1;
        }
        return 0;
      });

      /**
       * The study somebody chose leads the shelf, whatever their history.
       *
       * The shelf ordered by last activity and nothing else, so "Set as my
       * reading plan" wrote louis_primary_devotional_id and the dashboard
       * went on showing whatever had been touched most recently. Checked on
       * Louis's own account, 2026-10-18: the button saved 21 Women of the
       * Bible correctly and the shelf still led with The Wisdom of Proverbs,
       * with 21 Women fourth, saying "Start this study". The write was never
       * the problem; nothing read it.
       *
       * Louis: "I want that to be able to set, and then the one people set,
       * it's the one we focus on." So the chosen study goes to the front -
       * which also hands it the solid button, because the lead card is the
       * one that wears it. A plan with no progress yet still leads: choosing
       * it is the statement of intent, and being fourth on the shelf is how
       * the old order answered that.
       */
      const ordered = [...started, ...rest];
      const chosenIndex = chosenStudyId
        ? ordered.findIndex((book) => book.key === chosenStudyId)
        : -1;
      if (chosenIndex > 0) {
        const [chosen] = ordered.splice(chosenIndex, 1);
        ordered.unshift(chosen);
      }

      setBooks(ordered);
      setChosenKey(chosenStudyId);

      setLoading(false);
    })().catch((error: unknown) => {
      // A bare async effect swallowed nothing before this: there was no catch,
      // so a throw simply skipped setLoading(false) above and left the
      // skeleton pulsing. Catching on the promise keeps the body's
      // indentation and reads the same.
      if (cancelled) return;
      console.warn("[BOOKSHELF] Could not load the shelf:", error);
      setFailed(true);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [userId, planDay, planCompletedDays, event, communityDay, reloadKey]);

  /** Try Again: back to the skeleton, then run the load once more. */
  function retryLoad() {
    setFailed(false);
    setLoading(true);
    setReloadKey((k) => k + 1);
  }

  /** The row itself: the first SHELF_MAX_BOOKS of the order built above. */
  const visibleBooks = useMemo(() => books.slice(0, SHELF_MAX_BOOKS), [books]);

  /**
   * "2 studies in progress · 1 completed · 1 upcoming", from the shelf itself.
   *
   * Upcoming is decided by the same countdown the cards use, so a study that
   * opens while the page is sitting there moves out of "upcoming" and into
   * the ordinary count on the next tick, with nothing to refresh.
   */
  const shelfSummary = useMemo(() => {
    const upcoming = visibleBooks.filter((b) => countdownParts(b, now)).length;
    const completed = visibleBooks.filter((b) => b.isComplete).length;
    const inProgress = visibleBooks.filter(
      (b) => !b.isComplete && b.currentDay !== null && !countdownParts(b, now),
    ).length;
    const parts: string[] = [];
    if (inProgress) parts.push(`${inProgress} ${inProgress === 1 ? "study" : "studies"} in progress`);
    if (completed) parts.push(`${completed} completed`);
    if (upcoming) parts.push(`${upcoming} upcoming`);
    return parts.join(" · ");
  }, [visibleBooks, now]);

  /**
   * The one book that wears "Currently Reading": the started, unfinished
   * study they read most recently.
   *
   * `books` is already ordered with the started ones first, newest activity
   * first, so this is the first of those that has a real timestamp behind it.
   * Somebody who has never read anything gets no badge rather than an
   * invented one, and Bible in One Year carries no stamp at all, so it is
   * never badged on a technicality.
   */
  const currentlyReadingKey = useMemo(() => {
    const read = visibleBooks.find((b) => !b.isComplete && b.currentDay !== null && b.lastActivityAt);
    return read?.key ?? null;
  }, [visibleBooks]);

  /**
   * Flipped on one frame after the books land, which is what makes the
   * progress bars grow from nothing instead of appearing at length.
   *
   * A frame rather than a timeout: the bar has to be painted at 0% once
   * before the width changes, or the browser has nothing to animate from.
   * The animation itself is motion-safe, so this does nothing visible for a
   * reader who has asked for less movement.
   */
  const [barsIn, setBarsIn] = useState(false);
  useEffect(() => {
    if (loading || !books.length) return;
    const id = window.requestAnimationFrame(() => setBarsIn(true));
    return () => window.cancelAnimationFrame(id);
  }, [loading, books.length]);

  if (failed) {
    // No aria-labelledby here: the heading that owns that id is not rendered
    // in this branch, and LoadFailedNotice announces itself as an alert.
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
    <>

      <section aria-labelledby="home-bookshelf-heading">
        {/* No outer card. Louis, 2026-10-17: "you have the continue reading in
            a white holder, remove that, it's pointless - look at the quick
            reads, each banner has its own holder, no main holder, the page is
            the external holder."

            It was doing visible harm rather than nothing: once every book got
            its own pastel card, a white box around them framed things that
            were already framed, and the tints read as swatches inside a panel
            instead of cards on the page. Quick Reads never had one. The
            padding went with it, because HomeScreen's own px-4 already
            provides the gutter - which is exactly how Quick Reads lines up.

            The loading skeleton lost its box too, or the shelf would flash a
            white panel and then drop it the moment the books arrived. */}
        <div>
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
                {/* "Your Bookshelf" (Louis, 2026-10-18), which is what the
                    component has been called since it was built: a shelf of
                    the books you have open, rather than one instruction. */}
                Your Bookshelf
              </h2>
              {/* Counted from the shelf that is actually on screen, so the
                  line can never disagree with the cards under it. Each part
                  is dropped when it is zero rather than printed as "0
                  completed", and the whole line goes when there is nothing to
                  count - an empty shelf should not announce its emptiness
                  three times. */}
              {shelfSummary ? (
                <p className="mt-0.5 truncate text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)] sm:text-[13px]">
                  {shelfSummary}
                </p>
              ) : null}
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
          {/* Swipe on a phone, one grid row on a desktop. Five fixed columns,
              not auto-fit: auto-fit wrapped the sixth book onto a second row
              the moment the catalogue outgrew the first, which is the whole
              thing Louis asked to stop (2026-11-07). The list is capped at
              SHELF_MAX_BOOKS to match, so the row can never wrap. */}
          <div className="-mx-4 mt-5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-5 sm:px-5 lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
            <ul className="flex w-max snap-x snap-mandatory items-stretch gap-3 sm:gap-4 lg:grid lg:w-full lg:grid-cols-5">
              {visibleBooks.map((book, index) => {
                const primaryLabel = book.isComplete
                  ? "Read Again →"
                  : book.currentDay !== null
                    ? "Continue →"
                    : "Open →";
                // The book they are furthest into wears the solid button; the
                // rest are tinted, so the eye lands on one thing.
                const isLead = index === 0;
                // Each book on its own pastel card (Louis, 2026-10-17:
                // "separate bgs for each banner, and the same for continue
                // reading"). The width grew by exactly the padding, so the
                // covers keep the size and portrait proportions they had - the
                // frame is added around them rather than taken out of them.
                const tint = cardTint(index);
                const countdown = countdownParts(book, now);
                /* The old gate, kept exactly: a study can be "not out yet"
                   with a label and no release timestamp, and that still has
                   to lock the cover and the button. countdown is only for
                   the boxes, which need a real date to count to. */
                const notOutYet = Boolean(countdownLabel(book, now));
                const percent = safePercent(book);
                const releaseDate = formatDate(book.availableFrom);
                const finishedOn = book.isComplete ? formatDate(book.lastActivityAt) : null;
                const lastRead = relativeDayLabel(book.lastActivityAt, now);
                return (
                  <li
                    key={book.key}
                    className="flex w-[160px] shrink-0 snap-start flex-col rounded-2xl border p-2 shadow-sm transition motion-safe:duration-200 hover:-translate-y-0.5 hover:shadow-md sm:w-[184px] lg:w-auto"
                    style={{ backgroundColor: tint.bg, borderColor: tint.border }}
                  >
                    {/* Not out yet means not open yet (Louis, 2026-10-18:
                        "it's just a placeholder for now, no need to allow it
                        to click, we will do that later"). The cover and the
                        countdown are the whole of it until the morning it
                        lands, when the countdown runs out and the card
                        becomes a button again on its own. */}
                    <button
                      type="button"
                      disabled={notOutYet}
                      onClick={() => router.push(book.href)}
                      className="group relative block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] disabled:cursor-default"
                    >
                      {/* One main study at a time (Louis, 2026-10-18:
                          "people should only have one primary devotional, the
                          others could be started but only one at a time can be
                          the main devotional"). Setting a new one replaces it,
                          because louis_primary_devotional_id is a single
                          column - so the rule already held in the data and had
                          nothing saying so on the screen. This is what says
                          it, on the one card that leads the shelf. */}
                      {/* One badge, not four stacked on a 148px cover. In
                          order: a study that has not opened yet, a finished
                          one, the one they are actually reading, the group's
                          study, and last the one they chose. The first four
                          say something about the book; "Your study" is the
                          weakest claim of the five and so it goes last. */}
                      {notOutYet ? (
                        <span className="absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 rounded-full bg-[#6d3fd4] px-2 py-1 text-[9px] font-black text-white shadow-md">
                          <span aria-hidden>🗓️</span> Upcoming Study
                        </span>
                      ) : book.isComplete ? (
                        <span className="absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 rounded-full bg-[#1f8f54] px-2 py-1 text-[9px] font-black text-white shadow-md">
                          <span aria-hidden>✔</span> Study Completed
                        </span>
                      ) : book.key === currentlyReadingKey ? (
                        <span className="absolute left-1.5 top-1.5 z-10 inline-flex items-center gap-1 rounded-full bg-[#5b3fd4] px-2 py-1 text-[9px] font-black text-white shadow-md">
                          <span aria-hidden>📖</span> Currently Reading
                        </span>
                      ) : book.isCommunityToday ? (
                        <span className="absolute left-1.5 top-1.5 z-10 rounded-full bg-[var(--bb-accent,#2f7fe8)] px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow-md">
                          Group study
                        </span>
                      ) : book.key === chosenKey ? (
                        <span className="absolute left-1.5 top-1.5 z-10 rounded-full bg-[#2b2150] px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow-md">
                          Your study
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
                    {/* min-height rather than a fixed 2.2em: the fixed one
                        kept the rows level and sliced the descenders off a
                        two-line title ("The Beginning of Everything" lost the
                        bottom of its g and y). This still reserves two lines
                        so the bars below stay in line, without cutting the
                        words. */}
                    <p className="mt-2 line-clamp-2 min-h-[2.5em] text-xs font-black leading-tight text-[var(--bb-text-primary,#111827)] sm:text-[13px]">
                      {book.title}
                    </p>

                    <div className="mt-1 flex-1">
                      {/* Recomputed against the ticking clock below, so the
                          countdown counts rather than showing whatever it
                          said when the shelf loaded. */}
                      {notOutYet ? (
                        /* Three boxes rather than a sentence, so the number
                           that is about to change is the thing the eye
                           lands on. The minute ticker above redraws them;
                           when the date passes, countdownParts returns null
                           and the card becomes an ordinary one with no
                           refresh and nothing to clean up. */
                        <>
                          {/* Boxes need a real release timestamp to count to.
                              A study that is only marked "not out yet", with
                              no date behind it, keeps the plain label it has
                              always had rather than three boxes of zeroes. */}
                          {countdown ? (
                          <>
                          <div className="flex gap-1" role="timer" aria-live="off">
                            {[
                              [countdown.days, "Days"],
                              [countdown.hours, "Hours"],
                              [countdown.minutes, "Minutes"],
                            ].map(([value, label]) => (
                              <span
                                key={label}
                                className="flex-1 rounded-lg bg-white/70 px-1 py-1 text-center"
                              >
                                <span className="block text-[13px] font-black leading-none text-[#4b2fae]">
                                  {value}
                                </span>
                                <span className="block text-[8px] font-bold uppercase tracking-wide text-[#7a6aa8]">
                                  {label}
                                </span>
                              </span>
                            ))}
                          </div>
                          <p className="sr-only">
                            Releases in {countdown.days} days, {countdown.hours} hours and{" "}
                            {countdown.minutes} minutes
                          </p>
                          </>
                          ) : (
                            <p className="text-[11px] font-black text-[#a57d2c]">
                              {countdownLabel(book, now)}
                            </p>
                          )}
                          {releaseDate ? (
                            <p className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                              <span aria-hidden>📅</span> Releases {releaseDate}
                            </p>
                          ) : null}
                        </>
                      ) : book.isComplete ? (
                        <>
                          <p className="flex items-center gap-1 text-[11px] font-bold text-[#2f8f5b]">
                            <span aria-hidden>✅</span> Completed
                          </p>
                          {/* The stamp is the newest finished day, which on a
                              study they have finished IS the day they finished
                              it. No stamp means no date rather than a made-up
                              one. */}
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
                            <span className="shrink-0 rounded-full bg-white/70 px-1.5 py-0.5 text-[10px] font-black text-[var(--bb-accent,#2f7fe8)]">
                              {percent}%
                            </span>
                          </div>
                          {/* Grows from nothing to where it should be once,
                              on mount. motion-safe only, so a reader who has
                              asked their phone to stop animating gets the bar
                              already at its length. */}
                          <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-white/70">
                            <span
                              className="block h-full rounded-full bg-[var(--bb-accent,#2f7fe8)] motion-safe:transition-[width] motion-safe:duration-700 motion-safe:ease-out"
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
                        <p className="text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">Start this study</p>
                      )}

                      {/* Last READ, not last opened: the only stamp we keep is
                          the newest finished day. Hidden when there is none,
                          and on a finished study, where the date above already
                          says it. */}
                      {lastRead && !book.isComplete ? (
                        <p className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[var(--bb-text-muted,#9aa3b2)]">
                          <span aria-hidden>🕒</span> Last read {lastRead}
                        </p>
                      ) : null}
                    </div>

                    {/* A study that is announced but not open gets "Sign up"
                        rather than a dead "Coming soon": the countdown is
                        already printed above the button, so the button is free
                        to do the one useful thing. Everything without an event
                        behind it keeps the old disabled tile. */}
                    {/* One button, four looks, same behaviour as before:
                        purple to sign up for a dated study, green outline to
                        read a finished one again, solid blue for the book
                        they are furthest into, soft blue for the rest. A
                        study with a date and no event behind it keeps the old
                        disabled tile - there is genuinely nothing to press
                        yet. */}
                    <button
                      type="button"
                      disabled={notOutYet && !book.signUpHref}
                      onClick={() => router.push(book.signUpHref || book.href)}
                      className={`mt-2.5 flex w-full items-center justify-center gap-1 rounded-full px-2 py-2 text-center text-xs font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 active:scale-[0.98] sm:text-[13px] ${
                        book.signUpHref
                          ? "bg-gradient-to-r from-[#7b4ae2] to-[#5b3fd4] text-white shadow-sm ring-[#5b3fd4] hover:brightness-105"
                          : notOutYet
                            ? "cursor-default bg-[#f3ece0] text-[#a57d2c]"
                            : book.isComplete
                              ? "border-2 border-[#1f8f54] bg-transparent text-[#1f8f54] ring-[#1f8f54] hover:bg-[#1f8f54]/10"
                              : isLead
                                ? "bg-gradient-to-r from-[var(--bb-accent,#2f7fe8)] to-[#1f5fd0] text-[var(--bb-button-text,#ffffff)] shadow-sm ring-[var(--bb-accent,#2f7fe8)] hover:brightness-105"
                                : "bg-[var(--bb-accent-soft,#eaf5ff)] text-[var(--bb-accent,#2f7fe8)] ring-[var(--bb-accent,#2f7fe8)] hover:bg-[#dceeff]"
                      }`}
                    >
                      {book.signUpHref ? (
                        <>
                          <span aria-hidden>🔔</span> Sign up →
                        </>
                      ) : notOutYet ? (
                        "Coming soon"
                      ) : book.isComplete ? (
                        <>
                          <span aria-hidden>↻</span> Read Again →
                        </>
                      ) : (
                        primaryLabel
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

    </>
  );
}
