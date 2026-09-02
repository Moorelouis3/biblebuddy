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
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useSupabaseUser } from "../lib/useSupabaseUser";
import { recordNewUser } from "../lib/guestSession";
import VerseOfTheDayCard from "./VerseOfTheDayCard";
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
  const [group, setGroup] = useState<GroupActivity>({ loaded: false, postsToday: null, avatars: [] });

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
          .select("user_id, created_at")
          .eq("group_id", BIBLE_STUDY_GROUP_ID)
          .order("created_at", { ascending: false })
          .limit(60);
        if (error) throw error;
        const postsToday = (posts || []).filter(
          (row) => new Date(row.created_at as string).getTime() >= todayStart.getTime(),
        ).length;
        const recentIds: string[] = [];
        for (const row of posts || []) {
          if (row.user_id && !recentIds.includes(row.user_id)) recentIds.push(row.user_id);
          if (recentIds.length >= 4) break;
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
        setGroup({ loaded: true, postsToday, avatars });
      } catch {
        setGroup({ loaded: true, postsToday: null, avatars: [] });
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
  // Three completed days behind, the current day, and the next three - the
  // compact strip from the mockup, replacing the old oversized carousel.
  const journeyDays = useMemo(() => {
    if (!stats.planDay) return [];
    const start = Math.max(1, stats.planDay - 3);
    return GENESIS_BIBLE_IN_ONE_YEAR_SERIES.filter((d) => d.dayNumber >= start && d.dayNumber <= start + 6);
  }, [stats.planDay]);
  const biblePercent =
    stats.chaptersRead === null ? null : Math.round((stats.chaptersRead / TOTAL_BIBLE_CHAPTERS) * 100);
  const planHref = stats.planDay ? `/plan?view=bible-year&day=${stats.planDay}&solo=1` : "/plans";

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
            <div className="flex min-w-[132px] items-center gap-2.5 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-3 shadow-sm">
              <StreakFlameEmoji
                flameId={stats.flameId}
                currentStreak={stats.streak}
                size={28}
                title={`${stats.streak} day streak`}
              />
              <div>
                <p className="text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">{stats.streak}</p>
                <p className="text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">Day Streak</p>
              </div>
            </div>
          ) : !stats.loaded && userId ? (
            <div className="h-[64px] min-w-[132px] animate-pulse rounded-2xl bg-[var(--bb-surface-soft,#eef2f7)]" />
          ) : null}
          {biblePercent !== null ? (
            <div className="flex min-w-[132px] items-center gap-2.5 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-3 shadow-sm">
              <BibleProgressRing percent={biblePercent} />
              <div>
                <p className="text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">{biblePercent}%</p>
                <p className="text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">of Bible</p>
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
          <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <Link
                href={planHref}
                onClick={() => openPlanDay("home_continue_plan_click", planEntry.dayNumber)}
                className="relative mx-auto block w-[168px] shrink-0 sm:mx-0 sm:w-[184px]"
                aria-label={`Open Day ${planEntry.dayNumber} - ${planEntry.title}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border-2 border-[var(--bb-accent,#2f7fe8)]">
                  <Image
                    src={getBibleYearDayCoverImage(planEntry)}
                    alt={`Day ${planEntry.dayNumber} cover - ${planEntry.title}`}
                    fill
                    priority
                    className="object-cover"
                    sizes="184px"
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[var(--bb-accent,#2f7fe8)] px-3 py-1 text-[11px] font-black text-white">
                    Current
                  </span>
                </div>
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">
                  Bible in One Year
                </p>
                <p className="mt-1.5 text-2xl font-black leading-none text-[var(--bb-text-primary,#111827)] sm:text-3xl">
                  Day {planEntry.dayNumber}
                </p>
                <p className="mt-1.5 text-lg font-black leading-snug text-[var(--bb-text-primary,#111827)]">
                  {planEntry.title}
                </p>
                {planEntry.reference ? (
                  <p className="mt-0.5 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
                    {planEntry.reference}
                  </p>
                ) : null}
                <Link
                  href={planHref}
                  onClick={() => openPlanDay("home_continue_plan_click", planEntry.dayNumber)}
                  className="mt-3 w-fit rounded-xl bg-[var(--bb-button,#2f7fe8)] px-6 py-3 text-sm font-black uppercase tracking-wide text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95 active:scale-[0.98]"
                >
                  {stats.planFinished ? "Review the plan" : `Continue Day ${planEntry.dayNumber}`}
                </Link>
                <p className="mt-3 text-xs font-bold text-[var(--bb-text-secondary,#4b5563)]">
                  {stats.lastCompletedDay ?? 0} of {PLAN_TOTAL_DAYS} days
                </p>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--bb-progress-track,#dbe7f4)]">
                  <div
                    className="h-full rounded-full bg-[var(--bb-progress-fill,#2f7fe8)] transition-all duration-500"
                    style={{
                      width: `${Math.max(1, Math.min(100, Math.round(((stats.lastCompletedDay ?? 0) / PLAN_TOTAL_DAYS) * 100)))}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Nearby plan days - compact, horizontally scrollable, no page overflow */}
            <div
              className="mt-4 flex snap-x gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="list"
              aria-label="Nearby plan days"
            >
              {journeyDays.map((day) => {
                const isComplete = stats.lastCompletedDay !== null && day.dayNumber <= stats.lastCompletedDay;
                const isCurrent = day.dayNumber === planEntry.dayNumber;
                const isLocked = !isComplete && !isCurrent;
                return (
                  <Link
                    key={day.dayNumber}
                    role="listitem"
                    href={`/plan?view=bible-year&day=${day.dayNumber}&solo=1`}
                    onClick={() => openPlanDay("home_nearby_day_click", day.dayNumber)}
                    className="w-[88px] shrink-0 snap-start text-left"
                  >
                    <div
                      className={`relative aspect-[3/4] overflow-hidden rounded-lg border-2 ${
                        isCurrent ? "border-[var(--bb-accent,#2f7fe8)]" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={getBibleYearDayCoverImage(day)}
                        alt=""
                        fill
                        loading="lazy"
                        className={`object-cover ${isLocked ? "opacity-60 grayscale" : ""}`}
                        sizes="88px"
                      />
                      {isComplete ? (
                        <span
                          className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--bb-accent,#2f7fe8)] text-[10px] font-black text-white"
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      ) : isLocked ? (
                        <span
                          className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/55 text-[10px] text-white"
                          aria-hidden="true"
                        >
                          🔒
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-center text-[11px] font-black text-[var(--bb-text-primary,#111827)]">
                      Day {day.dayNumber}
                    </p>
                    <p
                      className={`text-center text-[10px] font-bold ${
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
          </div>
        ) : stats.loaded ? (
          <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-6 text-center shadow-sm">
            <p className="text-base font-black text-[var(--bb-text-primary,#111827)]">
              Start a Bible plan and build your daily rhythm.
            </p>
            <Link
              href="/plans"
              className="mt-3 inline-block rounded-xl bg-[var(--bb-button,#2f7fe8)] px-6 py-3 text-sm font-black uppercase tracking-wide text-[var(--bb-button-text,#ffffff)]"
            >
              Explore Plans
            </Link>
          </div>
        ) : (
          <div className="h-[260px] animate-pulse rounded-2xl bg-[var(--bb-surface-soft,#eef2f7)]" />
        )}
      </section>

      {/* 5. Verse of the Day */}
      <VerseOfTheDayCard userId={userId} />

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

      {/* 7. Test Your Knowledge */}
      <section aria-labelledby="home-knowledge-heading">
        <SectionHeading label="Test Your Knowledge" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            href="/bible-trivia"
            onClick={() => trackHomeEvent("home_trivia_click", {})}
            className="flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3.5 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] active:scale-[0.99]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fce7f3] text-lg" aria-hidden="true">
              ❓
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">Bible Trivia</span>
              <span className="block text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
                How well do you know the Bible?
              </span>
            </span>
            <span className="text-lg font-black text-[var(--bb-text-muted,#9ca3af)]" aria-hidden="true">
              ›
            </span>
          </Link>
          <Link
            href="/bible-study-games/scrambled"
            onClick={() => trackHomeEvent("home_scrambled_click", {})}
            className="flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3.5 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] active:scale-[0.99]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dcfce7] text-lg" aria-hidden="true">
              🔤
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">Scrambled</span>
              <span className="block text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
                Today&apos;s word challenge
              </span>
            </span>
            <span className="text-lg font-black text-[var(--bb-text-muted,#9ca3af)]" aria-hidden="true">
              ›
            </span>
          </Link>
        </div>
      </section>

      {/* 8. From Your Groups - real activity, real faces, or a plain link */}
      <section aria-labelledby="home-groups-heading">
        <SectionHeading label="From Your Groups" />
        <Link
          href={`/study-groups/${BIBLE_STUDY_GROUP_ID}/chat`}
          onClick={() => trackHomeEvent("home_group_click", { postsToday: group.postsToday })}
          className="flex items-center gap-3 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3.5 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] active:scale-[0.99]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dbeafe] text-lg" aria-hidden="true">
            👥
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">Study Group</span>
            <span className="block text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
              {group.postsToday
                ? `${group.postsToday} new conversation${group.postsToday === 1 ? "" : "s"} today`
                : "See what your Bible Buddies are discussing."}
            </span>
          </span>
          {group.avatars.length ? (
            <span className="flex shrink-0 -space-x-2" aria-hidden="true">
              {group.avatars.map((avatar) =>
                avatar.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={avatar.userId}
                    src={avatar.image}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-[var(--bb-card,#ffffff)] object-cover"
                  />
                ) : (
                  <span
                    key={avatar.userId}
                    className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--bb-card,#ffffff)] bg-[var(--bb-accent-soft,#eaf2ff)] text-[11px] font-black text-[var(--bb-accent,#2f7fe8)]"
                  >
                    {avatar.name.charAt(0).toUpperCase()}
                  </span>
                ),
              )}
            </span>
          ) : null}
          <span className="hidden text-xs font-black uppercase tracking-wide text-[var(--bb-accent,#2f7fe8)] sm:block">
            Visit Group →
          </span>
        </Link>
      </section>
    </div>
  );
}
