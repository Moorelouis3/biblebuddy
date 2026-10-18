"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { cardTint } from "../../lib/cardTints";
import { BIBLE_BUDDY_USER_ID } from "../../lib/bibleBuddyAccount";
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
  /** The study this reader set as their plan; the shelf leads with it and marks it. */
  const [chosenKey, setChosenKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [todayStrip, setTodayStrip] = useState<{
    studyTitle: string;
    reading: string;
    dayTitle: string;
  } | null>(null);

  /**
   * Today's pinned study post in the feed, and who has answered it.
   *
   * The discussion question has one home - the comments on that post - and
   * this card shows the faces and sends you there. See the avatar row below.
   */
  const [discussion, setDiscussion] = useState<{
    postId: string;
    count: number;
    people: Array<{ user_id: string; display_name: string | null; username: string | null; profile_image_url: string | null }>;
  } | null>(null);

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

      /**
       * Today's study post in the feed, and the people who have answered.
       *
       * Found the same way the feed pins it: the Bible Buddy account, a
       * "Day 18: ..." headline, most recent first. Looking it up here rather
       * than being told about it keeps the card and the pin agreeing without
       * a second source of truth to go stale.
       */
      const { data: pinned } = await supabase
        .from("feed_posts")
        .select("id, content")
        .eq("user_id", BIBLE_BUDDY_USER_ID)
        .order("created_at", { ascending: false })
        .limit(12);

      const todaysPost = (pinned || []).find((post) =>
        /^Day \d+:\s/.test(String(post.content).split("\n", 1)[0] ?? ""),
      );

      if (!cancelled && todaysPost) {
        const { data: answers } = await supabase
          .from("feed_post_comments")
          .select("user_id")
          .eq("post_id", todaysPost.id)
          .order("created_at", { ascending: false })
          .limit(200);

        const answerers = [...new Set((answers || []).map((row) => row.user_id))];
        const { data: faces } = answerers.length
          ? await supabase
              .from("profile_stats")
              .select("user_id, display_name, username, profile_image_url")
              .in("user_id", answerers.slice(0, 5))
          : { data: [] };

        if (!cancelled) {
          setDiscussion({
            postId: todaysPost.id,
            count: answerers.length,
            people: faces || [],
          });
        }
      }
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
      {/* The group study leads (Louis, 2026-10-18: "the group study should
          be first"). Everybody is on the same day of it, and it is the one
          thing on this page happening with other people right now; your own
          shelf is there whenever you get to it. */}
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

                {/* Who has answered today, as faces.

                    Louis, 2026-10-18: "add the circle avatar option to Today's
                    Group Study to show what buddies have answered the
                    discussion question, and make sure the comments on this
                    match the comments on the feed's pinned daily devotional
                    post, like we had in the group."

                    They match by being the same thread: these are the people
                    who commented on today's pinned post, and the button opens
                    that post. There is no second discussion to keep in step,
                    because there is no second discussion. */}
                {discussion && discussion.people.length > 0 ? (
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="flex -space-x-2">
                      {discussion.people.slice(0, 5).map((person) => (
                        <span key={person.user_id} className="rounded-full ring-2 ring-[#f5f2ff]">
                          {person.profile_image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={person.profile_image_url}
                              alt=""
                              className="h-7 w-7 rounded-full object-cover"
                            />
                          ) : (
                            <span
                              aria-hidden
                              className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black text-white"
                              style={{ backgroundColor: "#6a5aa8" }}
                            >
                              {(person.display_name || person.username || "B")
                                .split(/\s+/)
                                .map((word) => word[0] || "")
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </span>
                          )}
                        </span>
                      ))}
                    </span>
                    <span className="text-xs font-black text-[#2b2150]">
                      {discussion.count === 1 ? "1 answer so far" : `${discussion.count} answers so far`}
                    </span>
                  </div>
                ) : null}
              </div>
              <Link
                href={discussion?.postId ? `/bb-feed?post=${discussion.postId}` : "/bb-feed"}
                /* Dark ink rather than the accent blue (Louis's mock-up,
                   2026-10-17). #2b2150 is not a new colour: it is the same
                   deep purple this card's own heading uses, and the one From
                   Your Groups uses, so the button sits inside the lavender
                   family instead of being the one loud thing on a pastel
                   card. Fixed, like the text above it, because the
                   illustrated background stays light in dark mode. */
                className="block shrink-0 rounded-full bg-[#2b2150] px-5 py-2.5 text-center text-sm font-black shadow-sm transition hover:bg-[#3a2d6b] sm:py-3"
                /* The colour is inline, not a utility class, because
                   globals.css carries an unlayered `a { color: inherit }`.
                   Tailwind v4 puts utilities in @layer utilities, and
                   unlayered CSS outranks any layer - so a colour class on an
                   anchor silently loses and the label inherits the card's
                   dark text. On this button that was black on near-black. */
                style={{ color: "#ffffff" }}
              >
                Join Discussion →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

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
                // Each book on its own pastel card (Louis, 2026-10-17:
                // "separate bgs for each banner, and the same for continue
                // reading"). The width grew by exactly the padding, so the
                // covers keep the size and portrait proportions they had - the
                // frame is added around them rather than taken out of them.
                const tint = cardTint(index);
                return (
                  <li
                    key={book.key}
                    className="flex w-[148px] shrink-0 snap-start flex-col rounded-2xl border p-2 shadow-sm sm:w-[174px]"
                    style={{ backgroundColor: tint.bg, borderColor: tint.border }}
                  >
                    <button
                      type="button"
                      onClick={() => router.push(book.href)}
                      className="group relative block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)]"
                    >
                      {/* One main study at a time (Louis, 2026-10-18:
                          "people should only have one primary devotional, the
                          others could be started but only one at a time can be
                          the main devotional"). Setting a new one replaces it,
                          because louis_primary_devotional_id is a single
                          column - so the rule already held in the data and had
                          nothing saying so on the screen. This is what says
                          it, on the one card that leads the shelf. */}
                      {book.isCommunityToday ? (
                        <span className="absolute left-2 top-2 z-10 rounded-md bg-[var(--bb-accent,#2f7fe8)] px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow">
                          Group study
                        </span>
                      ) : book.key === chosenKey ? (
                        <span className="absolute left-2 top-2 z-10 rounded-md bg-[#2b2150] px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow">
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

    </>
  );
}
