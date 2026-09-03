"use client";

/**
 * The home screen, matching Louis's approved 2026-09-02 mockup: a connected
 * daily dashboard answering "what should I do today?".
 *
 * Order is fixed by the spec: greeting + compact stats, Continue Your
 * Journey (plan card + nearby-day strip), Verse of the Day, Recommended For
 * You (3 across), Test Your Knowledge, From Your Groups.
 *
 * Deliberately its own component rather than another branch inside
 * DashboardJourneyExperience (19k lines, slow splash). The shell paints
 * immediately and each section fills in as its query lands. Every number
 * comes from a real row - when a query fails the section hides or falls
 * back rather than showing a made-up value.
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useSupabaseUser } from "../lib/useSupabaseUser";
import { recordNewUser } from "../lib/guestSession";
import VerseOfTheDayCard from "./VerseOfTheDayCard";
import CommunityEventBanner from "./CommunityEventBanner";
import { trackVotdEvent as trackHomeEvent } from "../lib/verseOfTheDayContent";
import { BLOG_ARTICLES } from "../lib/blogContent";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES, getBibleYearDayCoverImage } from "../lib/bibleInOneYearPlan";
import { BIBLE_STUDY_GROUP_ID } from "../lib/bibleStudiesCatalog";
import StreakFlameEmoji from "./StreakFlameEmoji";

/** Chapters in the Protestant canon, so progress is a real fraction. */
const TOTAL_BIBLE_CHAPTERS = 1189;
const PLAN_TOTAL_DAYS = 365;

type HomeStats = {
  loaded: boolean;
  streak: number | null;
  chaptersRead: number | null;
  planDay: number | null;
  planFinished: boolean;
  lastCompletedDay: number | null;
  displayName: string | null;
  flameId: string | null;
};

type GroupActivity = {
  loaded: boolean;
  postsToday: number | null;
  avatars: Array<{ userId: string; name: string; image: string | null }>;
  /** How many recent posters exist beyond the shown avatars, for the +N badge. */
  extraCount: number;
  /** The newest real conversation opener, or null when nothing usable. */
  preview: string | null;
};

function SectionHeading({ label, href, onSeeAll }: { label: string; href?: string; onSeeAll?: () => void }) {
  return (
    <div className="mb-2 flex items-end justify-between">
      <h2 className="text-xs font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">{label}</h2>
      {href ? (
        <Link href={href} onClick={onSeeAll} className="text-sm font-bold text-[var(--bb-accent,#2f7fe8)]">
          See All
        </Link>
      ) : null}
    </div>
  );
}

/** The circular "N% of Bible" indicator from the mockup. */
function BibleProgressRing({ percent }: { percent: number }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const filled = Math.max(0.02, Math.min(1, percent / 100)) * circumference;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r={radius} fill="none" stroke="var(--bb-progress-track, #dbe7f4)" strokeWidth="6" />
      <circle
        cx="22"
        cy="22"
        r={radius}
        fill="none"
        stroke="var(--bb-progress-fill, #2f7fe8)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference - filled}`}
        transform="rotate(-90 22 22)"
      />
    </svg>
  );
}

export default function HomeScreen() {
  const { userId } = useSupabaseUser();
  const [stats, setStats] = useState<HomeStats>({
    loaded: false,
    streak: null,
    chaptersRead: null,
    planDay: null,
    planFinished: false,
    lastCompletedDay: null,
    displayName: null,
    flameId: null,
  });
  const [communityEventJoined, setCommunityEventJoined] = useState(false);
  const [group, setGroup] = useState<GroupActivity>({
    loaded: false,
    postsToday: null,
    avatars: [],
    extraCount: 0,
    preview: null,
  });

  const recommended = useMemo(() => BLOG_ARTICLES.slice(0, 3), []);

  // AppShell hides the whole top header on /dashboard until the dashboard
  // reports itself loaded - a contract written for the old 19k-line dashboard
  // and its splash screen. This screen paints immediately, so report loaded
  // immediately; without this the logo, alerts, messages and profile picture
  // never come back.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("bb:dashboard-loader-state", { detail: { loading: false } }));
  }, []);

  useEffect(() => {
    if (!userId) return;

    void (async () => {
      // Each of these is independent, so one failing must not blank the others.
      const [profileResult, chapterResult, planResult] = await Promise.allSettled([
        supabase
          .from("profile_stats")
          .select("current_streak,display_name,username,selected_streak_flame")
          .eq("user_id", userId)
          .maybeSingle(),
        supabase
          .from("completed_chapters")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId),
        supabase
          .from("bible_year_day_progress")
          .select("day_number, reading_completed")
          .eq("user_id", userId)
          .limit(500),
      ]);

      const profile = profileResult.status === "fulfilled" ? (profileResult.value.data as any) : null;
      const chapterCount = chapterResult.status === "fulfilled" ? chapterResult.value.count : null;
      // The plan's own rule, copied exactly: the current day is the FIRST day
      // in the series whose reading is not done. Home used to say last row +1,
      // which ran a day ahead whenever a day had a progress row but an
      // unfinished reading - so home said Day 38 while the plan opened Day 37.
      let planDay: number | null = null;
      let planFinished = false;
      if (planResult.status === "fulfilled" && Array.isArray(planResult.value.data)) {
        const readDays = new Set(
          (planResult.value.data as any[])
            .filter((row) => row.reading_completed === true)
            .map((row) => Number(row.day_number)),
        );
        const firstUnread = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((d) => !readDays.has(d.dayNumber));
        planDay = firstUnread ? firstUnread.dayNumber : PLAN_TOTAL_DAYS;
        planFinished = !firstUnread;
      }

      setStats({
        loaded: true,
        streak: typeof profile?.current_streak === "number" ? profile.current_streak : null,
        chaptersRead: typeof chapterCount === "number" ? chapterCount : null,
        planDay,
        planFinished,
        lastCompletedDay: planDay !== null ? planDay - 1 : null,
        displayName: profile?.display_name || profile?.username || null,
        flameId: profile?.selected_streak_flame ?? null,
      });
    })();
  }, [userId]);

  // Real group activity: how many posts landed today, and who posted lately.
  // A failed query leaves the simple link, never fake numbers or faces.
  useEffect(() => {
    void (async () => {
      try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const { data: posts, error } = await supabase
          .from("group_posts")
          .select("user_id, created_at, content, parent_post_id")
          .eq("group_id", BIBLE_STUDY_GROUP_ID)
          .order("created_at", { ascending: false })
          .limit(60);
        if (error) throw error;
        const postsToday = (posts || []).filter(
          (row) => new Date(row.created_at as string).getTime() >= todayStart.getTime(),
        ).length;
        // The newest real conversation opener as a one-line preview.
        const previewPost = (posts || []).find(
          (row) => !row.parent_post_id && typeof row.content === "string" && row.content.trim().length > 0,
        );
        // Posts are stored as HTML - strip to plain text for the one-liner.
        const preview = previewPost
          ? (previewPost.content as string)
              .replace(/<[^>]*>/g, " ")
              .replace(/&nbsp;/gi, " ")
              .replace(/&amp;/gi, "&")
              .replace(/&quot;/gi, '"')
              .replace(/&#39;|&apos;/gi, "'")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 90) || null
          : null;
        const allPosterIds = new Set((posts || []).map((row) => row.user_id).filter(Boolean));
        const recentIds: string[] = [];
        for (const row of posts || []) {
          if (row.user_id && !recentIds.includes(row.user_id)) recentIds.push(row.user_id);
          if (recentIds.length >= 6) break;
        }
        let avatars: GroupActivity["avatars"] = [];
        if (recentIds.length) {
          const { data: profiles } = await supabase
            .from("profile_stats")
            .select("user_id, display_name, username, profile_image_url")
            .in("user_id", recentIds);
          avatars = recentIds
            .map((id) => {
              const profile = (profiles || []).find((p) => p.user_id === id);
              if (!profile) return null;
              return {
                userId: id,
                name: (profile.display_name || profile.username || "Bible Buddy") as string,
                image: (profile.profile_image_url as string) || null,
              };
            })
            .filter(Boolean) as GroupActivity["avatars"];
        }
        setGroup({
          loaded: true,
          postsToday,
          avatars,
          extraCount: Math.max(0, allPosterIds.size - avatars.length),
          preview,
        });
      } catch {
        setGroup({ loaded: true, postsToday: null, avatars: [], extraCount: 0, preview: null });
      }
    })();
  }, []);

  const greetingName = (stats.displayName || "friend").split(/\s+/)[0];
  // Matches the dashboard, which greets by time of day rather than always
  // saying morning.
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);
  const planEntry = stats.planDay
    ? GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((d) => d.dayNumber === stats.planDay)
    : null;
  // ALL 365 days, not a window - Louis, 2026-09-02: "its 365 of them...
  // the days should reach all the way across". The strip scrolls the whole
  // year; an effect below parks it on the current day, and lazy images mean
  // only the tiles actually scrolled into view ever download.
  const journeyDays = stats.planDay ? GENESIS_BIBLE_IN_ONE_YEAR_SERIES : [];

  // Park the year strip on the current day (a few completed days visible to
  // its left), instead of opening the scroll at Day 1.
  const journeyStripRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const strip = journeyStripRef.current;
    if (!strip || !stats.planDay) return;
    const tile = strip.querySelector<HTMLElement>(`[data-day="${stats.planDay}"]`);
    if (tile) {
      strip.scrollLeft = Math.max(0, tile.offsetLeft - strip.clientWidth / 2 + tile.clientWidth / 2);
    }
  }, [stats.planDay]);
  const biblePercent =
    stats.chaptersRead === null ? null : Math.round((stats.chaptersRead / TOTAL_BIBLE_CHAPTERS) * 100);
  const planHref = stats.planDay ? `/plan?view=bible-year&day=${stats.planDay}&solo=1` : "/plans";
  const completedDays = stats.lastCompletedDay ?? 0;
  const planPercent = Math.round((completedDays / PLAN_TOTAL_DAYS) * 100);
  const continueLabel = stats.planFinished
    ? "View Completed Plan"
    : completedDays === 0
      ? `Start Day ${stats.planDay ?? 1}`
      : `Continue Day ${stats.planDay}`;

  // Bottom-card impressions, fired once when that part of the page is
  // actually scrolled into view - a render alone is not a view.
  const knowledgeSectionRef = useRef<HTMLElement | null>(null);
  const impressionsSent = useRef(false);
  useEffect(() => {
    const target = knowledgeSectionRef.current;
    if (!target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting) || impressionsSent.current) return;
      impressionsSent.current = true;
      trackHomeEvent("home_trivia_impression", {});
      trackHomeEvent("home_scrambled_impression", {});
      trackHomeEvent("home_group_impression", { postsToday: group.postsToday });
      observer.disconnect();
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [group.postsToday]);

  function scrollRail(direction: 1 | -1) {
    const strip = journeyStripRef.current;
    if (!strip) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollBy({ left: direction * strip.clientWidth * 0.8, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function openPlanDay(source: "home_continue_plan_click" | "home_nearby_day_click", day: number) {
    trackHomeEvent(source, { day });
    if (userId) recordNewUser(userId, "plan_day_opened");
  }

  return (
    <div className="mx-auto flex w-full max-w-[960px] flex-col gap-6 px-4 pb-28 pt-5">
      {/* 1-2. Greeting left, compact stat cards right */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[var(--bb-text-primary,#111827)] sm:text-3xl">
            {greeting}, {greetingName}
          </h1>
          <p className="mt-1 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
            Let&apos;s grow closer to God today.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:w-auto sm:shrink-0 sm:grid-cols-2">
          {stats.streak !== null ? (
            // Peach, same family as the Bible Trivia card below
            <div
              className="flex min-w-[132px] items-center gap-2.5 rounded-2xl border border-[#f4dcc8] px-4 py-3 shadow-sm"
              style={{
                backgroundColor: "#fff3e6",
                backgroundImage: "url(/home-cards/bg-trivia.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
              }}
            >
              <StreakFlameEmoji
                flameId={stats.flameId}
                currentStreak={stats.streak}
                size={28}
                title={`${stats.streak} day streak`}
              />
              <div>
                <p className="text-xl font-black leading-tight text-[#3d2417]">{stats.streak}</p>
                <p className="text-[11px] font-bold text-[#8a5c40]">Day Streak</p>
              </div>
            </div>
          ) : !stats.loaded && userId ? (
            <div className="h-[64px] min-w-[132px] animate-pulse rounded-2xl bg-[var(--bb-surface-soft,#eef2f7)]" />
          ) : null}
          {biblePercent !== null ? (
            // Mint, same family as the Scrambled card below
            <div
              className="flex min-w-[132px] items-center gap-2.5 rounded-2xl border border-[#cde9dc] px-4 py-3 shadow-sm"
              style={{
                backgroundColor: "#eefaf3",
                backgroundImage: "url(/home-cards/bg-scrambled.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
              }}
            >
              <BibleProgressRing percent={biblePercent} />
              <div>
                <p className="text-xl font-black leading-tight text-[#123f30]">{biblePercent}%</p>
                <p className="text-[11px] font-bold text-[#3f7a63]">of Bible</p>
              </div>
            </div>
          ) : !stats.loaded && userId ? (
            <div className="h-[64px] min-w-[132px] animate-pulse rounded-2xl bg-[var(--bb-surface-soft,#eef2f7)]" />
          ) : null}
        </div>
      </header>

      {/* 3-4. Continue Your Journey */}
      <section aria-labelledby="home-journey-heading">
        <h2
          id="home-journey-heading"
          className="mb-2 text-xs font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]"
        >
          Continue Your Journey
        </h2>
        {planEntry ? (
          /* Light lavender journey path - the group art read too dark here */
          <div
            className="rounded-2xl border border-[#ddd6f3] p-4 shadow-sm sm:p-5"
            style={{
              backgroundColor: "#f5f2ff",
              backgroundImage: "url(/home-cards/bg-journey.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "left bottom",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Day Rail (approved Option 3, 2026-09-02): plan progress ->
                nearby days -> one Continue button. The old duplicated
                current-day cover, lesson title, passage and summary are gone
                on purpose - readers see those inside the day itself. */}
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">
                Bible in One Year
              </p>
              <p className="text-xs font-black text-[var(--bb-text-secondary,#4b5563)]">
                {completedDays} of {PLAN_TOTAL_DAYS} · {planPercent}%
              </p>
            </div>

            <div className="relative mt-3">
              <div
                ref={journeyStripRef}
                className="flex snap-x gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="list"
                aria-label="Plan days"
              >
                {journeyDays.map((day) => {
                  const isComplete = stats.lastCompletedDay !== null && day.dayNumber <= stats.lastCompletedDay;
                  const isCurrent = day.dayNumber === planEntry.dayNumber;
                  const isLocked = !isComplete && !isCurrent;
                  return (
                    <Link
                      key={day.dayNumber}
                      role="listitem"
                      data-day={day.dayNumber}
                      href={`/plan?view=bible-year&day=${day.dayNumber}&solo=1`}
                      onClick={() => openPlanDay("home_nearby_day_click", day.dayNumber)}
                      aria-label={`Day ${day.dayNumber}, ${isComplete ? "completed" : isCurrent ? "current day" : "locked"}`}
                      className="w-[104px] shrink-0 snap-start text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] sm:w-[141px]"
                    >
                      {/* Strict square: the day art IS square (1254x1254) -
                          the old 3:4 portrait frame was cropping its sides. */}
                      <div
                        className={`relative m-0.5 aspect-square overflow-hidden rounded-xl ${
                          isCurrent
                            ? "ring-2 ring-[var(--bb-accent,#2f7fe8)]"
                            : ""
                        }`}
                      >
                        <Image
                          src={getBibleYearDayCoverImage(day)}
                          alt=""
                          fill
                          loading="lazy"
                          className={`object-cover ${isLocked ? "opacity-60 grayscale" : ""}`}
                          sizes="(max-width: 640px) 104px, 141px"
                        />
                        {isComplete ? (
                          <span
                            className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--bb-accent,#2f7fe8)] text-[10px] font-black text-white"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                        ) : isLocked ? (
                          <span
                            className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-black/55 text-[10px] text-white"
                            aria-hidden="true"
                          >
                            🔒
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1.5 text-center text-[12px] font-black text-[var(--bb-text-primary,#111827)]">
                        Day {day.dayNumber}
                      </p>
                      <p
                        className={`text-center text-[11px] font-bold ${
                          isCurrent
                            ? "text-[var(--bb-accent,#2f7fe8)]"
                            : isComplete
                              ? "text-[var(--bb-text-secondary,#4b5563)]"
                              : "text-[var(--bb-text-muted,#9ca3af)]"
                        }`}
                      >
                        {isComplete ? "Completed" : isCurrent ? "Current" : "Locked"}
                      </p>
                    </Link>
                  );
                })}
              </div>

              {/* Desktop paging controls - phones and tablets just swipe */}
              <button
                type="button"
                aria-label="Show earlier days"
                onClick={() => scrollRail(-1)}
                className="absolute -left-2 top-[35%] z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-lg font-black text-[var(--bb-accent,#2f7fe8)] shadow-md transition hover:brightness-95 active:scale-95 sm:grid"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Show later days"
                onClick={() => scrollRail(1)}
                className="absolute -right-2 top-[35%] z-10 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-lg font-black text-[var(--bb-accent,#2f7fe8)] shadow-md transition hover:brightness-95 active:scale-95 sm:grid"
              >
                ›
              </button>
            </div>

            <Link
              href={planHref}
              onClick={() => openPlanDay("home_continue_plan_click", planEntry.dayNumber)}
              className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#111827] px-6 text-sm font-black uppercase tracking-wide text-white shadow-sm transition hover:brightness-95 active:scale-[0.99]"
              // Inline color because the global "a { color: inherit }" rule is
              // unlayered and beats every Tailwind text utility on anchors.
              style={{ color: "#ffffff" }}
            >
              {continueLabel}
            </Link>
          </div>
        ) : stats.loaded ? (
          <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-6 text-center shadow-sm">
            <p className="text-base font-black text-[var(--bb-text-primary,#111827)]">
              Start a Bible plan and build your daily rhythm.
            </p>
            <Link
              href="/plans"
              className="mt-3 inline-block rounded-xl bg-[#111827] px-6 py-3 text-sm font-black uppercase tracking-wide text-white"
              style={{ color: "#ffffff" }}
            >
              Explore Plans
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm sm:p-5">
            <div className="h-4 w-44 animate-pulse rounded bg-[var(--bb-surface-soft,#eef2f7)]" />
            <div className="mt-3 flex gap-3 overflow-hidden">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-[104px] shrink-0 sm:w-[141px]">
                  <div className="aspect-square animate-pulse rounded-xl bg-[var(--bb-surface-soft,#eef2f7)]" />
                  <div className="mx-auto mt-1.5 h-3 w-14 animate-pulse rounded bg-[var(--bb-surface-soft,#eef2f7)]" />
                </div>
              ))}
            </div>
            <div className="mt-4 h-12 w-full animate-pulse rounded-xl bg-[var(--bb-surface-soft,#eef2f7)]" />
          </div>
        )}
      </section>

      {/* 5. Verse of the Day */}
      <VerseOfTheDayCard userId={userId} />

      {/* 5b. Upcoming Community Study - the EXACT banner from the group page.
          One component, one event config, one signup page; only the
          analytics source differs, so both spots stay in sync by
          construction. The section disappears for anyone already signed up -
          the homepage banner exists to recruit, the group page keeps
          showing the joined state. */}
      {!communityEventJoined ? (
        <section aria-labelledby="home-community-study-heading">
          <h2
            id="home-community-study-heading"
            className="mb-2 text-xs font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]"
          >
            Upcoming Community Study
          </h2>
          <CommunityEventBanner userId={userId} source="homepage" onJoinedChange={setCommunityEventJoined} />
        </section>
      ) : null}

      {/* 6. Recommended For You */}
      <section aria-labelledby="home-recommended-heading">
        <SectionHeading label="Recommended For You" href="/blog" onSeeAll={() => trackHomeEvent("home_see_all_click", { section: "recommended" })} />
        <div className="flex snap-x gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {recommended.map((article) => (
            <Link
              key={article.slug}
              href={article.canonicalPath}
              onClick={() => trackHomeEvent("home_article_click", { slug: article.slug })}
              className="block w-[240px] shrink-0 snap-start rounded-xl outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] sm:w-auto"
            >
              <div className="relative aspect-[1728/910] overflow-hidden rounded-xl bg-[var(--bb-surface-soft,#eef2f7)]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 640px) 240px, 300px"
                />
              </div>
              <p className="mt-1.5 line-clamp-2 text-sm font-black text-[var(--bb-text-primary,#111827)]">
                {article.title}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">{article.readTime}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Test Your Knowledge - the approved Option 2 colorful pair.
          Decorative art is CSS/emoji, never baked text. No "daily challenge"
          claims: neither game has a daily system, so the copy stays honest. */}
      <section aria-labelledby="home-knowledge-heading" ref={knowledgeSectionRef}>
        <SectionHeading label="Test Your Knowledge" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href="/bible-trivia"
            onClick={() => trackHomeEvent("home_trivia_click", {})}
            aria-label="Bible Trivia - test your Bible knowledge"
            className="relative flex min-h-[132px] items-center gap-4 overflow-hidden rounded-2xl border border-[#f4dcc8] p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] active:scale-[0.99] sm:p-5"
            style={{
              backgroundColor: "#fff3e6",
              backgroundImage: "url(/home-cards/bg-trivia.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          >
            <span
              className="grid h-20 w-20 shrink-0 place-items-center rounded-full text-4xl font-black text-white shadow-[0_6px_16px_rgba(240,130,90,0.35)]"
              style={{ background: "linear-gradient(160deg, #ff9d7e 0%, #f2708a 100%)" }}
              aria-hidden="true"
            >
              ?
            </span>
            <span className="relative z-10 min-w-0 flex-1">
              <span className="block text-lg font-black text-[#3d2417]">Bible Trivia</span>
              <span className="mt-0.5 block text-xs font-semibold text-[#8a5c40]">
                Books and people · Test your Bible knowledge
              </span>
              <span className="mt-2 inline-block rounded-full bg-[#ffe1d2] px-2.5 py-1 text-[10px] font-black tracking-wide text-[#c1543a]">
                🔥 CHALLENGE YOURSELF
              </span>
              <span className="mt-2.5 block">
                <span className="inline-flex min-h-[36px] items-center rounded-lg bg-[#111827] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white">
                  Start →
                </span>
              </span>
            </span>
          </Link>

          <Link
            href="/bible-study-games/scrambled"
            onClick={() => trackHomeEvent("home_scrambled_click", {})}
            aria-label="Scrambled - unscramble the verse"
            className="relative flex min-h-[132px] items-center gap-4 overflow-hidden rounded-2xl border border-[#cde9dc] p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] active:scale-[0.99] sm:p-5"
            style={{
              backgroundColor: "#eefaf3",
              backgroundImage: "url(/home-cards/bg-scrambled.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          >
            <span className="grid w-20 shrink-0 grid-cols-3 gap-1" aria-hidden="true">
              {["B", "I", "B", "L", "E"].map((letter, index) => (
                <span
                  key={index}
                  className={`grid h-6 w-6 place-items-center rounded-md bg-white text-xs font-black text-[#1e7f63] shadow-sm ${
                    index === 3 ? "col-start-1" : ""
                  } ${index >= 3 ? "translate-x-3" : ""}`}
                >
                  {letter}
                </span>
              ))}
            </span>
            <span className="relative z-10 min-w-0 flex-1">
              <span className="block text-lg font-black text-[#123f30]">Scrambled</span>
              <span className="mt-0.5 block text-xs font-semibold text-[#3f7a63]">
                Unscramble the verse before the hints run out
              </span>
              <span className="mt-2 inline-block rounded-full bg-[#d8f2e4] px-2.5 py-1 text-[10px] font-black tracking-wide text-[#1e7f63]">
                ⭐ EVERY CHAPTER
              </span>
              <span className="mt-2.5 block">
                <span className="inline-flex min-h-[36px] items-center rounded-lg bg-[#111827] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white">
                  Play →
                </span>
              </span>
            </span>
          </Link>
        </div>
      </section>

      {/* 8. From Your Groups - the approved lavender community card. Real
          count, real faces, real latest conversation; a failed query falls
          back to the plain link copy, never fake activity. */}
      <section aria-labelledby="home-groups-heading">
        <SectionHeading label="From Your Groups" />
        <Link
          href={`/study-groups/${BIBLE_STUDY_GROUP_ID}/chat`}
          onClick={() => trackHomeEvent("home_group_click", { postsToday: group.postsToday })}
          aria-label={`Study Group${group.postsToday ? ` - ${group.postsToday} new conversations today` : ""}`}
          className="relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[#ddd6f3] p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] active:scale-[0.99] sm:flex-row sm:items-center sm:p-5"
          style={{
            backgroundColor: "#f5f2ff",
            backgroundImage: "url(/home-cards/bg-group.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "left bottom",
          }}
        >
          <span className="flex items-center gap-4">
            <span
              className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white text-3xl shadow-[0_6px_16px_rgba(124,104,180,0.25)]"
              aria-hidden="true"
            >
              👥
            </span>
            <span className="min-w-0 sm:hidden">
              <span className="block text-lg font-black text-[#2b2150]">Study Group</span>
              <span className="block text-xs font-bold text-[#6a5aa8]">
                {group.postsToday
                  ? `${group.postsToday} new conversation${group.postsToday === 1 ? "" : "s"} today`
                  : "See what your Bible Buddies are discussing."}
              </span>
            </span>
          </span>
          <span className="relative z-10 min-w-0 flex-1">
            <span className="hidden text-lg font-black text-[#2b2150] sm:block">Study Group</span>
            <span className="hidden text-xs font-bold text-[#6a5aa8] sm:block">
              {group.postsToday
                ? `● ${group.postsToday} new conversation${group.postsToday === 1 ? "" : "s"} today`
                : "See what your Bible Buddies are discussing."}
            </span>
            {group.preview ? (
              <span className="mt-1.5 flex items-start gap-1.5 text-xs font-semibold text-[#4c3f80]">
                <span aria-hidden="true">💬</span>
                <span className="line-clamp-1">{group.preview}</span>
              </span>
            ) : null}
          </span>
          {group.avatars.length ? (
            <span className="flex shrink-0 items-center -space-x-2" aria-hidden="true">
              {group.avatars.map((avatar) =>
                avatar.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={avatar.userId}
                    src={avatar.image}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ) : (
                  <span
                    key={avatar.userId}
                    className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[#e3ddfa] text-[11px] font-black text-[#5b4a9e]"
                  >
                    {avatar.name.charAt(0).toUpperCase()}
                  </span>
                ),
              )}
              {group.extraCount > 0 ? (
                <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[#5b4a9e] text-[10px] font-black text-white">
                  +{group.extraCount}
                </span>
              ) : null}
            </span>
          ) : null}
          <span className="relative z-10 flex min-h-[44px] shrink-0 items-center justify-center rounded-lg bg-[#111827] px-5 text-xs font-black uppercase tracking-wide text-white sm:min-h-[40px]">
            Visit Group →
          </span>
        </Link>
      </section>
    </div>
  );
}
