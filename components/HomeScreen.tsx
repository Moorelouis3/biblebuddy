"use client";

/**
 * The home screen from Louis's design.
 *
 * Deliberately its own component rather than another branch inside
 * DashboardJourneyExperience, which is 19,000 lines and already slow enough
 * that it shows a "Loading Bible Buddy" splash for several seconds. This
 * renders its shell immediately and fills each row in as its query lands, so
 * the first paint does not wait on anything.
 *
 * Every number here comes from a real row. When a query fails the section
 * hides rather than showing a zero - a made-up streak is worse than no streak.
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useSupabaseUser } from "../lib/useSupabaseUser";
import { recordNewUser } from "../lib/guestSession";
import { getVerseOfTheDay } from "../lib/verseOfTheDay";
import { BLOG_ARTICLES } from "../lib/blogContent";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES, getBibleYearDayCoverImage } from "../lib/bibleInOneYearPlan";
import { BIBLE_STUDY_GROUP_ID } from "../lib/bibleStudiesCatalog";
import StreakFlameEmoji from "./StreakFlameEmoji";

/** Chapters in the Protestant canon, so progress is a real fraction. */
const TOTAL_BIBLE_CHAPTERS = 1189;

type HomeStats = {
  streak: number | null;
  chaptersRead: number | null;
  planDay: number | null;
  lastCompletedDay: number | null;
  displayName: string | null;
  flameId: string | null;
};

function SectionHeading({ label, href }: { label: string; href?: string }) {
  return (
    <div className="mb-2 flex items-end justify-between">
      <h2 className="text-xs font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">{label}</h2>
      {href ? (
        <Link href={href} className="text-sm font-bold text-[var(--bb-accent,#2f7fe8)]">
          See All
        </Link>
      ) : null}
    </div>
  );
}

export default function HomeScreen() {
  const { userId } = useSupabaseUser();
  const [stats, setStats] = useState<HomeStats>({
    streak: null,
    chaptersRead: null,
    planDay: null,
    lastCompletedDay: null,
    displayName: null,
    flameId: null,
  });

  const verse = useMemo(() => getVerseOfTheDay(), []);
  const recommended = useMemo(() => BLOG_ARTICLES.slice(0, 4), []);

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
      if (planResult.status === "fulfilled" && Array.isArray(planResult.value.data)) {
        const readDays = new Set(
          (planResult.value.data as any[])
            .filter((row) => row.reading_completed === true)
            .map((row) => Number(row.day_number)),
        );
        const firstUnread = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((d) => !readDays.has(d.dayNumber));
        planDay = firstUnread ? firstUnread.dayNumber : 365;
      }

      setStats({
        streak: typeof profile?.current_streak === "number" ? profile.current_streak : null,
        chaptersRead: typeof chapterCount === "number" ? chapterCount : null,
        planDay,
        lastCompletedDay: planDay !== null ? planDay - 1 : null,
        displayName: profile?.display_name || profile?.username || null,
        flameId: profile?.selected_streak_flame ?? null,
      });
    })();
  }, [userId]);

  const greetingName = stats.displayName || "friend";
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
  // A window around the current day, so the strip opens showing where they
  // are rather than at Day 1.
  const journeyDays = useMemo(() => {
    if (!stats.planDay) return [];
    const start = Math.max(1, stats.planDay - 3);
    return GENESIS_BIBLE_IN_ONE_YEAR_SERIES.filter(
      (d) => d.dayNumber >= start && d.dayNumber <= start + 6,
    );
  }, [stats.planDay]);
  const biblePercent =
    stats.chaptersRead === null ? null : Math.round((stats.chaptersRead / TOTAL_BIBLE_CHAPTERS) * 100);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 pb-28 pt-4">
      <header>
        <h1 className="text-3xl font-black text-[var(--bb-text-primary,#111827)]">{greeting}, {greetingName}</h1>
        <p className="mt-1 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
          Let&apos;s grow closer to God today.
        </p>
      </header>

      {stats.streak !== null ? (
        <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm">
          <div className="flex items-center justify-center gap-3">
            <StreakFlameEmoji
              flameId={stats.flameId}
              currentStreak={stats.streak}
              size={38}
              title={`${stats.streak} day streak`}
            />
            <p className="text-2xl font-black text-[var(--bb-text-primary,#111827)]">
              {stats.streak} Day Bible Study Streak
            </p>
          </div>
          {biblePercent !== null ? (
            <>
              <div className="mt-3 h-6 overflow-hidden rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-progress-track,#dbe7f4)] shadow-[inset_0_1px_3px_rgba(38,63,99,0.16)]">
                <div
                  className="h-full rounded-full bg-[var(--bb-progress-fill,#2f7fe8)] transition-all duration-500"
                  style={{ width: `${Math.max(3, Math.min(100, biblePercent))}%` }}
                />
              </div>
              <p className="mt-3 text-center text-[13px] font-semibold text-[var(--bb-text-secondary,#4b5563)]">
                You have finished {biblePercent}% of the Bible.
              </p>
            </>
          ) : null}
        </div>
      ) : null}

      {planEntry ? (
        <section className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm">
          <p className="text-center text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">
            Bible in One Year
          </p>
          {/*
            A preview of where they are, not the plan itself. Tapping any cover
            opens the full plan dashboard on that day - the screen this used to
            be. Days past the current one stay greyed and locked, same as there.
          */}
          <div className="mt-3 flex snap-x gap-3 overflow-x-auto pb-2">
            {journeyDays.map((day) => {
              const isComplete = stats.lastCompletedDay !== null && day.dayNumber <= stats.lastCompletedDay;
              const isCurrent = day.dayNumber === planEntry.dayNumber;
              const isLocked = !isComplete && !isCurrent;
              return (
                <Link
                  key={day.dayNumber}
                  href={`/plan?view=bible-year&day=${day.dayNumber}&solo=1`}
                  onClick={() => {
                    if (userId) recordNewUser(userId, "plan_day_opened");
                  }}
                  className="w-[104px] shrink-0 snap-start text-left"
                >
                  <div
                    className={`relative aspect-[3/4] overflow-hidden rounded-xl border-2 ${
                      isCurrent ? "border-[var(--bb-accent,#2f7fe8)]" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={getBibleYearDayCoverImage(day)}
                      alt=""
                      fill
                      className={`object-cover ${isLocked ? "opacity-65 grayscale" : ""}`}
                      sizes="104px"
                    />
                  </div>
                  <p className="mt-1 text-center text-xs font-black text-[var(--bb-text-primary,#111827)]">
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
          <p className="mt-1 text-center text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
            Day {planEntry.dayNumber} — {planEntry.title}
          </p>
        </section>
      ) : null}

      <section className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f3f0ff)] p-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#7c3aed]">Verse of the Day</p>
        <p className="mt-1 text-base font-black leading-snug text-[var(--bb-text-primary,#111827)]">{verse.text}</p>
        <p className="mt-1 text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">{verse.reference} · KJV</p>
      </section>


      <section>
        <SectionHeading label="Recommended Reading" href="/blog" />
        {/* Full banners with the title underneath - the blog banners are wide
            poster art, so a thumbnail strip wasted them and looked empty. */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {recommended.map((article) => (
            <Link key={article.slug} href={article.canonicalPath} className="block">
              <div className="relative aspect-[1728/910] overflow-hidden rounded-xl bg-[var(--bb-surface-soft,#eef2f7)]">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 360px"
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

      <section>
        <SectionHeading label="Test Your Knowledge" />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Link
            href="/bible-trivia"
            className="flex items-center gap-3 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ede9fe] text-lg" aria-hidden="true">
              ❓
            </span>
            <span>
              <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">Bible Trivia</span>
              <span className="block text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
                How well do you know the Bible?
              </span>
            </span>
          </Link>
          <Link
            href="/bible-study-games/scrambled"
            className="flex items-center gap-3 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dcfce7] text-lg" aria-hidden="true">
              🔤
            </span>
            <span>
              <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">Scrambled</span>
              <span className="block text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
                Today&apos;s word challenge
              </span>
            </span>
          </Link>
        </div>
      </section>

      <section>
        <SectionHeading label="From Your Groups" />
        <Link
          href={`/study-groups/${BIBLE_STUDY_GROUP_ID}/chat`}
          className="flex items-center gap-3 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dbeafe] text-lg" aria-hidden="true">
            👥
          </span>
          <span className="text-sm font-black text-[var(--bb-text-primary,#111827)]">Study Group</span>
        </Link>
      </section>
    </div>
  );
}
