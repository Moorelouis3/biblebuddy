"use client";

/**
 * The home screen, matching Louis's approved 2026-09-02 mockup: a connected
 * daily dashboard answering "what should I do today?".
 *
 * Order is fixed by the spec: greeting + compact stats, Continue Your
 * Journey (plan card + nearby-day strip), Verse of the Day, Look It Up,
 * Recommended For You (3 across), Test Your Knowledge, From Your Groups.
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
import { cardTint } from "../lib/cardTints";
import YourBookshelf from "./home/YourBookshelf";
import TodaysGroupStudy from "./home/TodaysGroupStudy";
import { trackVotdEvent as trackHomeEvent } from "../lib/verseOfTheDayContent";
import { BLOG_ARTICLES } from "../lib/blogContent";
import { bibleYearPercent, calculateBibleYearPosition } from "../lib/bibleYearProgress";
import { BIBLE_STUDY_GROUP_ID } from "../lib/bibleStudiesCatalog";
import StreakFlameEmoji from "./StreakFlameEmoji";
import StreakShareModal from "./StreakShareModal";
import LevelProgressCard from "./LevelProgressCard";
import BibleReferenceCard from "./BibleReferenceCard";
import { updateWidgets } from "../lib/nativeWidgets";
import HomeWidgetBoard from "./home/HomeWidgetBoard";
import {
  AskLilLouisWidget,
  BibleInOneYearWidget,
  BuddiesWidget,
  ContinueReadingWidget,
  GroupCountdownWidget,
  MessagesWidget,
  PrayerRequestsWidget,
  SavedVersesWidget,
  StudyGuideWidget,
  StudyNotesWidget,
} from "./home/HomeExtraWidgets";
import { useHomeLayout } from "../lib/homeLayoutStore";
import type { HomeWidget } from "../lib/homeWidgets";

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
  /** Bible in One Year days actually finished, for the streak share card. */
  planCompletedDays: number;
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

/**
 * What Home showed last time, kept on the phone.
 *
 * Home used to open with its streak, Bible percentage and plan day blank,
 * and fill them in once three requests had answered, on every single visit
 * (docs/SPEED_REPORT_2026-11-25.md, cause 9). Now the last known numbers are
 * on screen at once and the fresh ones replace them a moment later.
 *
 * Keyed by reader, so a shared phone never shows somebody else's streak.
 */
const HOME_STATS_CACHE = "bb:home-stats:v1:";
const HOME_GROUP_CACHE = "bb:home-group:v1";

function readHomeCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeHomeCache(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Full or blocked storage: Home still loads from the database.
  }
}

export default function HomeScreen() {
  const { userId } = useSupabaseUser();
  const homeLayout = useHomeLayout(userId ?? null);
  const [editingHome, setEditingHome] = useState(false);
  // ?edit=1 (the "Make Home yours" popup's button) opens Home in edit mode,
  // then drops the parameter so a reload does not reopen it.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("edit") !== "1") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEditingHome(true);
    url.searchParams.delete("edit");
    window.history.replaceState(window.history.state, "", url.pathname + (url.search || "") + url.hash);
  }, []);
  const [streakShareOpen, setStreakShareOpen] = useState(false);
  const [stats, setStats] = useState<HomeStats>({
    loaded: false,
    streak: null,
    chaptersRead: null,
    planDay: null,
    planFinished: false,
    lastCompletedDay: null,
    planCompletedDays: 0,
    displayName: null,
    flameId: null,
  });
  const [group, setGroup] = useState<GroupActivity>({
    loaded: false,
    postsToday: null,
    avatars: [],
    extraCount: 0,
    preview: null,
  });

  // Five random posts per visit (Louis, 2026-09-06: shuffled, five
  // scrollable banners). SSR and the first client paint use the newest
  // five so hydration matches; the shuffle lands right after mount.
  const [recommended, setRecommended] = useState(() => BLOG_ARTICLES.slice(0, 5));
  useEffect(() => {
    const shuffled = BLOG_ARTICLES.slice();
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setRecommended(shuffled.slice(0, 5));
  }, []);

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

    // Last visit's numbers first. The fresh ones follow below.
    const remembered = readHomeCache<HomeStats>(HOME_STATS_CACHE + userId);
    if (remembered) setStats({ ...remembered, loaded: true });

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

      // supabase-js does not throw on a failed request, it answers with an
      // error. So "fulfilled" is not "worked": check the error too, and when a
      // read failed keep what the phone remembered instead of blanking it.
      const profileOk = profileResult.status === "fulfilled" && !profileResult.value.error;
      const chaptersOk = chapterResult.status === "fulfilled" && !chapterResult.value.error;
      const planOk = planResult.status === "fulfilled" && !planResult.value.error;

      const profile = profileOk ? (profileResult.value.data as any) : null;
      const chapterCount = chaptersOk ? chapterResult.value.count : null;
      // One shared rule now - see lib/bibleYearProgress.ts for why.
      const { planDay, planFinished, highestReadDay, completedDays } = calculateBibleYearPosition(
        planOk ? (planResult.value.data as any) : null,
      );

      const fresh: HomeStats = {
        loaded: true,
        streak: typeof profile?.current_streak === "number" ? profile.current_streak : null,
        chaptersRead: typeof chapterCount === "number" ? chapterCount : null,
        planDay,
        planFinished,
        // The furthest day actually finished, not "the day before the next
        // one" - those differ for anyone who skipped a day.
        lastCompletedDay: planDay !== null ? highestReadDay : null,
        planCompletedDays: completedDays,
        displayName: profile?.display_name || profile?.username || null,
        flameId: profile?.selected_streak_flame ?? null,
      };
      const next: HomeStats = remembered
        ? {
            ...fresh,
            ...(profileOk
              ? {}
              : { streak: remembered.streak, displayName: remembered.displayName, flameId: remembered.flameId }),
            ...(chaptersOk ? {} : { chaptersRead: remembered.chaptersRead }),
            ...(planOk
              ? {}
              : {
                  planDay: remembered.planDay,
                  planFinished: remembered.planFinished,
                  lastCompletedDay: remembered.lastCompletedDay,
                  planCompletedDays: remembered.planCompletedDays,
                }),
          }
        : fresh;
      setStats(next);
      // Only a complete answer is worth remembering.
      if (profileOk && chaptersOk && planOk) writeHomeCache(HOME_STATS_CACHE + userId, next);
      // The Streak widget on the iPhone home screen.
      if (typeof profile?.current_streak === "number") updateWidgets({ streak: profile.current_streak });
    })();
  }, [userId]);

  // Real group activity: how many posts landed today, and who posted lately.
  // A failed query leaves the simple link, never fake numbers or faces.
  useEffect(() => {
    // Last visit's faces and preview first; today's count is recounted below.
    const rememberedGroup = readHomeCache<GroupActivity>(HOME_GROUP_CACHE);
    if (rememberedGroup) setGroup({ ...rememberedGroup, loaded: true, postsToday: null });

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
        const freshGroup: GroupActivity = {
          loaded: true,
          postsToday,
          avatars,
          extraCount: Math.max(0, allPosterIds.size - avatars.length),
          preview,
        };
        setGroup(freshGroup);
        writeHomeCache(HOME_GROUP_CACHE, freshGroup);
      } catch {
        // A failed read keeps what the phone remembered, if anything.
        if (!rememberedGroup) setGroup({ loaded: true, postsToday: null, avatars: [], extraCount: 0, preview: null });
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
  const biblePercent =
    stats.chaptersRead === null ? null : Math.round((stats.chaptersRead / TOTAL_BIBLE_CHAPTERS) * 100);
  const completedDays = stats.lastCompletedDay ?? 0;
  const continueLabel = stats.planFinished
    ? "View Completed Plan"
    : completedDays === 0
      ? `Start Day ${stats.planDay ?? 1}`
      : `Continue Day ${stats.planDay}`;

  // Bottom-card impressions, fired once when that part of the page is
  // actually scrolled into view - a render alone is not a view.
  // The games are separate widgets now, anywhere on the board (or not on it
  // at all), so each game widget reports its own impression when it is seen.
  const impressionsSent = useRef(new Set<string>());
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const events: Record<string, string> = {
      game_trivia: "home_trivia_impression",
      game_scrambled: "home_scrambled_impression",
      game_word_search: "home_word_search_impression",
      game_memory: "home_memory_impression",
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const kind = (entry.target as HTMLElement).dataset.widgetKind || "";
        if (!entry.isIntersecting || !events[kind] || impressionsSent.current.has(kind)) continue;
        impressionsSent.current.add(kind);
        trackHomeEvent(events[kind] as Parameters<typeof trackHomeEvent>[0], {});
        observer.unobserve(entry.target);
      }
    });
    document.querySelectorAll('[data-widget-kind^="game_"]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [homeLayout.layout]);


  function openPlanDay(source: "home_continue_plan_click" | "home_nearby_day_click", day: number) {
    trackHomeEvent(source, { day });
    if (userId) recordNewUser(userId, "plan_day_opened");
  }

  /**
   * Each widget on the board (components/home/HomeWidgetBoard.tsx). The
   * dashboard's own sections are rendered here exactly as they were before
   * widgets, so the default Home looks the same; the new widgets live in
   * components/home/HomeExtraWidgets.tsx.
   */
  function renderWidget(widget: HomeWidget) {
    switch (widget.kind) {
      case "streak":
        return (
          <>
          {stats.streak !== null ? (
            // Peach, same family as the Bible Trivia card below. Tapping it
            // opens the streak share card (components/StreakShareModal.tsx).
            <button
              type="button"
              onClick={() => setStreakShareOpen(true)}
              aria-label={`${stats.streak} day streak. Share your streak`}
              className="bb-cv-stat flex w-full min-w-0 items-center gap-1.5 rounded-2xl border border-[#f4dcc8] px-2.5 py-2.5 text-left shadow-sm transition active:scale-[0.98] sm:gap-2.5 sm:px-4 sm:py-3"
              style={{
                backgroundColor: "var(--bb-cv-light-bg, #fff3e6)",
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
                <p className="text-base font-black leading-tight text-[#3d2417] sm:text-xl">{stats.streak}</p>
                <p className="text-[10px] font-bold text-[#8a5c40] sm:text-[11px]">Day Streak</p>
              </div>
            </button>
          ) : !stats.loaded && userId ? (
            <div className="h-[64px] min-w-0 animate-pulse rounded-2xl bg-[var(--bb-surface-soft,#eef2f7)]" />
          ) : null}
          </>
        );
      case "bible_progress":
        return (
          <>
          {biblePercent !== null ? (
            // Mint, same family as the Scrambled card below
            <div
              className="bb-cv-stat flex min-w-0 items-center gap-1.5 rounded-2xl border border-[#cde9dc] px-2.5 py-2.5 shadow-sm sm:gap-2.5 sm:px-4 sm:py-3"
              style={{
                backgroundColor: "var(--bb-cv-light-bg, #eefaf3)",
                backgroundImage: "url(/home-cards/bg-scrambled.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
              }}
            >
              <BibleProgressRing percent={biblePercent} />
              <div>
                <p className="text-base font-black leading-tight text-[#123f30] sm:text-xl">{biblePercent}%</p>
                <p className="text-[10px] font-bold text-[#3f7a63] sm:text-[11px]">of Bible</p>
              </div>
            </div>
          ) : !stats.loaded && userId ? (
            <div className="h-[64px] min-w-0 animate-pulse rounded-2xl bg-[var(--bb-surface-soft,#eef2f7)]" />
          ) : null}
          </>
        );
      case "level":
        // Points & levels relaunch (2026-09-05): purple level card. The
        // level-up celebration modal lives inside this component too.
        return <LevelProgressCard />;
      case "verse_of_the_day":
        return <VerseOfTheDayCard userId={userId} />;
      case "bookshelf":
        return <YourBookshelf userId={userId} planDay={stats.planDay} planCompletedDays={completedDays} />;
      case "group_study_today":
        // Draws nothing when no study is live; the board hides the empty slot.
        return <TodaysGroupStudy />;
      case "quick_reads":
        return (
      <section aria-labelledby="home-recommended-heading">
        {/* "Quick Reads", not "Recommended For You" (Louis, 2026-10-17). The
            analytics key stays "recommended" so the history before the rename
            still joins up with the history after it. */}
        <SectionHeading label="Quick Reads" href="/blog" onSeeAll={() => trackHomeEvent("home_see_all_click", { section: "recommended" })} />
        <div className="flex snap-x gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {recommended.map((article, index) => {
            const tint = cardTint(index);
            return (
            <Link
              key={article.slug}
              href={article.canonicalPath}
              onClick={() => trackHomeEvent("home_article_click", { slug: article.slug })}
              // Each banner on its own tinted card. The width grew by the
              // padding so the artwork keeps the size it had rather than
              // shrinking to make room for the frame.
              className="bb-cv-card block w-[256px] shrink-0 snap-start rounded-2xl border p-2 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] sm:w-[296px]"
              style={{ backgroundColor: tint.bg, borderColor: tint.border }}
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
              <p className="mt-1.5 line-clamp-2 px-0.5 text-sm font-black text-[var(--bb-text-primary,#111827)]">
                {article.title}
              </p>
              <p className="mt-0.5 px-0.5 pb-0.5 text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">{article.readTime}</p>
            </Link>
            );
          })}
        </div>
      </section>
        );
      case "look_it_up":
        return <BibleReferenceCard onEvent={trackHomeEvent} />;
      case "game_trivia":
        return (
          <Link
            href="/bible-study-games/clue?from=home"
            onClick={() => trackHomeEvent("home_trivia_click", {})}
            aria-label="Bible Trivia - test your Bible knowledge"
            className="bb-cv-card bb-cv-game relative flex min-h-[132px] items-center gap-4 overflow-hidden rounded-2xl border border-[#f4dcc8] p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] active:scale-[0.99] sm:p-5"
            style={{
              backgroundColor: "var(--bb-cv-light-bg, #fff3e6)",
              backgroundImage: "url(/home-cards/bg-trivia.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          >
            <span
              className="bb-cv-game-art bb-cv-game-art-round grid h-20 w-20 shrink-0 place-items-center rounded-full text-4xl font-black text-white shadow-[0_6px_16px_rgba(240,130,90,0.35)]"
              style={{ background: "linear-gradient(160deg, #ff9d7e 0%, #f2708a 100%)" }}
              aria-hidden="true"
            >
              ?
            </span>
            <span className="bb-cv-game-text relative z-10 min-w-0 flex-1">
              <span className="block text-lg font-black text-[#3d2417]">Bible Trivia</span>
              <span className="mt-0.5 block text-xs font-semibold text-[#8a5c40]">
                Any book · Easy to Hard · Challenge your Buddies
              </span>
              <span className="bb-cv-tag mt-2 inline-block rounded-full bg-[#ffe1d2] px-2.5 py-1 text-[10px] font-black tracking-wide text-[#c1543a]">
                🔥 CHALLENGE YOURSELF
              </span>
              <span className="mt-2.5 block">
                <span className="bb-cv-cta inline-flex min-h-[36px] items-center rounded-lg bg-[#111827] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white">
                  Start →
                </span>
              </span>
            </span>
          </Link>
        );
      case "game_scrambled":
        return (
          <Link
            href="/bible-study-games/scrambled"
            onClick={() => trackHomeEvent("home_scrambled_click", {})}
            aria-label="Scrambled - unscramble the verse"
            className="bb-cv-card bb-cv-game relative flex min-h-[132px] items-center gap-4 overflow-hidden rounded-2xl border border-[#cde9dc] p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] active:scale-[0.99] sm:p-5"
            style={{
              backgroundColor: "var(--bb-cv-light-bg, #eefaf3)",
              backgroundImage: "url(/home-cards/bg-scrambled.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          >
            <span className="grid w-20 shrink-0 grid-cols-3 gap-1" aria-hidden="true">
              {["B", "I", "B", "L", "E"].map((letter, index) => (
                <span
                  key={index}
                  className={`bb-cv-tile grid h-6 w-6 place-items-center rounded-md bg-white text-xs font-black text-[#1e7f63] shadow-sm ${
                    index === 3 ? "col-start-1" : ""
                  } ${index >= 3 ? "translate-x-3" : ""}`}
                >
                  {letter}
                </span>
              ))}
            </span>
            <span className="bb-cv-game-text relative z-10 min-w-0 flex-1">
              <span className="block text-lg font-black text-[#123f30]">Scrambled</span>
              <span className="mt-0.5 block text-xs font-semibold text-[#3f7a63]">
                Unscramble the verse before the hints run out
              </span>
              <span className="bb-cv-tag mt-2 inline-block rounded-full bg-[#d8f2e4] px-2.5 py-1 text-[10px] font-black tracking-wide text-[#1e7f63]">
                ⭐ EVERY CHAPTER
              </span>
              <span className="mt-2.5 block">
                <span className="bb-cv-cta inline-flex min-h-[36px] items-center rounded-lg bg-[#111827] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white">
                  Play →
                </span>
              </span>
            </span>
          </Link>
        );
      case "game_word_search":
        return (
          <Link
            href="/bible-study-games/word-search"
            onClick={() => trackHomeEvent("home_word_search_click", {})}
            aria-label="Bible Word Search - find hidden Bible words"
            className="bb-cv-card bb-cv-game relative flex min-h-[132px] items-center gap-4 overflow-hidden rounded-2xl border border-[#cfe0fb] p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] active:scale-[0.99] sm:p-5"
            style={{ background: "linear-gradient(135deg, #eef5ff 0%, #dbe9ff 100%)" }}
          >
            <span className="bb-cv-game-art grid w-20 shrink-0 gap-y-0.5 rounded-xl bg-white p-1.5 shadow-sm" aria-hidden="true">
              {["FAITH", "GRACE", "TRUST"].map((row, rowIndex) => (
                <span key={row} className={`grid grid-cols-5 rounded ${rowIndex === 1 ? "bb-cv-found bg-[#5eead4]" : ""}`}>
                  {row.split("").map((letter, index) => (
                    <span
                      key={index}
                      className={`grid h-[13px] place-items-center text-[10px] leading-none text-[#14213d] ${
                        rowIndex === 1 ? "font-black" : "font-bold"
                      }`}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </span>
            <span className="bb-cv-game-text relative z-10 min-w-0 flex-1">
              <span className="block text-lg font-black text-[#14213d]">Bible Word Search</span>
              <span className="mt-0.5 block text-xs font-semibold text-[#3f5d8a]">
                Find hidden Bible words and strengthen your biblical vocabulary
              </span>
              <span className="bb-cv-tag mt-2 inline-block rounded-full bg-[#d3e3ff] px-2.5 py-1 text-[10px] font-black tracking-wide text-[#1d4ed8]">
                📖 ALL 66 BOOKS
              </span>
              <span className="mt-2.5 block">
                <span className="bb-cv-cta inline-flex min-h-[36px] items-center rounded-lg bg-[#111827] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white">
                  Play Now →
                </span>
              </span>
            </span>
          </Link>
        );
      case "game_memory":
        return (
          <Link
            href="/bible-study-games/memory"
            onClick={() => trackHomeEvent("home_memory_click", {})}
            aria-label="Bible Memory - practice remembering Scripture"
            className="bb-cv-card bb-cv-game relative flex min-h-[132px] items-center gap-4 overflow-hidden rounded-2xl border border-[#dccdf8] p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] active:scale-[0.99] sm:p-5"
            style={{ background: "linear-gradient(135deg, #f6efff 0%, #eadcff 100%)" }}
          >
            <span className="bb-cv-game-art grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-white text-center shadow-sm" aria-hidden="true">
              <span>
                <span className="block text-[9px] font-bold leading-tight text-[#14213d]">The LORD is my</span>
                <span className="bb-cv-found mt-1 inline-block rounded-full bg-[#7c3aed] px-2 py-0.5 text-[9px] font-black text-white">shepherd</span>
              </span>
            </span>
            <span className="bb-cv-game-text relative z-10 min-w-0 flex-1">
              <span className="block text-lg font-black text-[#2b1a52]">Bible Memory</span>
              <span className="mt-0.5 block text-xs font-semibold text-[#5d4a8a]">
                Practice remembering Scripture and strengthen your knowledge of God&apos;s Word
              </span>
              <span className="bb-cv-tag mt-2 inline-block rounded-full bg-[#e2d4fb] px-2.5 py-1 text-[10px] font-black tracking-wide text-[#5b21b6]">
                🧠 LEARN IT BY HEART
              </span>
              <span className="mt-2.5 block">
                <span className="bb-cv-cta inline-flex min-h-[36px] items-center rounded-lg bg-[#111827] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white">
                  Play Now →
                </span>
              </span>
            </span>
          </Link>
        );
      case "study_guide":
        return widget.studyId ? <StudyGuideWidget studyId={widget.studyId} userId={userId} size={widget.size} /> : null;
      case "ask_lil_louis":
        return <AskLilLouisWidget size={widget.size} />;
      case "continue_reading":
        return <ContinueReadingWidget userId={userId} size={widget.size} />;
      case "bible_in_one_year":
        return (
          <BibleInOneYearWidget
            planDay={stats.planDay}
            completedDays={completedDays}
            planFinished={stats.planFinished}
            size={widget.size}
          />
        );
      case "study_notes":
        return <StudyNotesWidget userId={userId} size={widget.size} />;
      case "saved_verses":
        return <SavedVersesWidget userId={userId} size={widget.size} />;
      case "group_countdown":
        return <GroupCountdownWidget size={widget.size} />;
      case "buddies":
        return <BuddiesWidget userId={userId} size={widget.size} />;
      case "messages":
        return <MessagesWidget userId={userId} size={widget.size} />;
      case "prayer_requests":
        return <PrayerRequestsWidget size={widget.size} />;
      default:
        return null;
    }
  }

  return (
    // pb stays small: AppShell already reserves the bottom bar's height and
    // renders the Report a Problem card right below this - pb-28 left a big
    // hole between the group card and the reporter (Louis, 2026-09-03).
    <div className="mx-auto flex w-full max-w-[960px] flex-col gap-6 px-4 pb-2 pt-5">
      {/* The greeting stays at the top and is not a widget. Everything under
          it is the reader's widget Home (Louis, 2026-11-21); with no saved
          layout it is the dashboard in its usual order. */}
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-[var(--bb-text-primary,#111827)] sm:text-3xl">
            {greeting}, {greetingName}
          </h1>
          <p className="mt-1 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
            Let&apos;s grow closer to God today.
          </p>
        </div>
        {!editingHome ? (
          <button
            type="button"
            onClick={() => setEditingHome(true)}
            className="shrink-0 rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-3 py-1.5 text-xs font-black text-[var(--bb-text-primary,#111827)] shadow-sm"
          >
            ✏️ Edit Home
          </button>
        ) : null}
      </header>

      <HomeWidgetBoard
        userId={userId ?? null}
        layout={homeLayout.layout}
        editing={editingHome}
        setEditing={setEditingHome}
        onSave={homeLayout.save}
        onReset={homeLayout.reset}
        renderWidget={renderWidget}
      />

      {/* Tap the streak: the share card (Louis, 2026-11-22). The Bible in One
          Year block shows only for someone who has read a day of the plan. */}
      <StreakShareModal
        isOpen={streakShareOpen}
        onClose={() => setStreakShareOpen(false)}
        streakDays={stats.streak ?? 0}
        bibleYear={
          stats.planDay !== null && (stats.lastCompletedDay ?? 0) > 0
            ? { currentDay: stats.planDay, overallPercent: bibleYearPercent(stats.planCompletedDays) }
            : null
        }
      />
    </div>
  );
}
