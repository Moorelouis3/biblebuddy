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
import { getVerseOfTheDay } from "../lib/verseOfTheDay";
import { bibleBuddyTvTitles } from "../lib/bibleBuddyTvContent";
import { BLOG_ARTICLES } from "../lib/blogContent";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "../lib/bibleInOneYearPlan";

/** Chapters in the Protestant canon, so progress is a real fraction. */
const TOTAL_BIBLE_CHAPTERS = 1189;

type HomeStats = {
  streak: number | null;
  chaptersRead: number | null;
  planDay: number | null;
  displayName: string | null;
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
    displayName: null,
  });

  const verse = useMemo(() => getVerseOfTheDay(), []);
  const featuredTv = useMemo(() => bibleBuddyTvTitles.slice(0, 3), []);
  const recommended = useMemo(() => BLOG_ARTICLES.slice(0, 4), []);

  useEffect(() => {
    if (!userId) return;

    void (async () => {
      // Each of these is independent, so one failing must not blank the others.
      const [profileResult, chapterResult, planResult] = await Promise.allSettled([
        supabase
          .from("profile_stats")
          .select("current_streak,display_name,username")
          .eq("user_id", userId)
          .maybeSingle(),
        supabase
          .from("completed_chapters")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId),
        supabase
          .from("bible_year_day_progress")
          .select("day_number")
          .eq("user_id", userId)
          .order("day_number", { ascending: false })
          .limit(1),
      ]);

      const profile = profileResult.status === "fulfilled" ? (profileResult.value.data as any) : null;
      const chapterCount = chapterResult.status === "fulfilled" ? chapterResult.value.count : null;
      const lastDay =
        planResult.status === "fulfilled" ? (planResult.value.data as any[])?.[0]?.day_number ?? null : null;

      setStats({
        streak: typeof profile?.current_streak === "number" ? profile.current_streak : null,
        chaptersRead: typeof chapterCount === "number" ? chapterCount : null,
        // The day they are on is the one after the last one finished.
        planDay: typeof lastDay === "number" ? Math.min(365, lastDay + 1) : null,
        displayName: profile?.display_name || profile?.username || null,
      });
    })();
  }, [userId]);

  const greetingName = stats.displayName || "friend";
  const planEntry = stats.planDay
    ? GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((d) => d.dayNumber === stats.planDay)
    : null;
  const biblePercent =
    stats.chaptersRead === null ? null : Math.round((stats.chaptersRead / TOTAL_BIBLE_CHAPTERS) * 100);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 pb-28 pt-4">
      <header>
        <h1 className="text-3xl font-black text-[var(--bb-text-primary,#111827)]">Good morning, {greetingName}</h1>
        <p className="mt-1 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
          Let&apos;s grow closer to God today.
        </p>
      </header>

      {stats.streak !== null ? (
        <div className="flex items-center gap-3 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm">
          <span className="text-3xl" aria-hidden="true">
            🔥
          </span>
          <div>
            <p className="text-2xl font-black leading-none text-[var(--bb-text-primary,#111827)]">{stats.streak}</p>
            <p className="text-sm font-bold text-[#f97316]">Day Streak</p>
          </div>
        </div>
      ) : null}

      {biblePercent !== null ? (
        <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-black text-[var(--bb-text-primary,#111827)]">Bible Progress</p>
            <p className="text-sm font-black text-[var(--bb-accent,#2f7fe8)]">{biblePercent}%</p>
          </div>
          <p className="mt-0.5 text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
            You have finished {biblePercent}% of the Bible.
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#eef2f7)]">
            <div
              className="h-full rounded-full bg-[var(--bb-accent,#2f7fe8)] transition-all duration-300"
              style={{ width: `${biblePercent}%` }}
            />
          </div>
        </div>
      ) : null}

      {planEntry ? (
        <section className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[var(--bb-accent,#2f7fe8)]">
            Your plan · Bible in One Year
          </p>
          <p className="mt-1 text-xl font-black text-[var(--bb-text-primary,#111827)]">
            Day {planEntry.dayNumber} — {planEntry.title}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">{planEntry.reference}</p>
          <Link
            href={`/dashboard?view=bible-year&day=${planEntry.dayNumber}`}
            className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-[var(--bb-button,#2563eb)] px-4 text-sm font-black text-[var(--bb-button-text,#ffffff)] transition hover:brightness-95"
          >
            Continue Plan
          </Link>
          <p className="mt-2 text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
            You can only have one active plan at a time. Change or switch plans in{" "}
            <Link href="/devotionals" className="text-[var(--bb-accent,#2f7fe8)]">
              Plans
            </Link>
            .
          </p>
        </section>
      ) : null}

      <section>
        <SectionHeading label="Featured on Bible Buddy TV" href="/biblebuddy-tv" />
        <div className="grid grid-cols-3 gap-2">
          {featuredTv.map((title, index) => (
            <Link key={title.slug} href={`/biblebuddy-tv/shows/${title.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[var(--bb-surface-soft,#eef2f7)]">
                <Image
                  src={title.poster}
                  alt={title.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 240px"
                  // The first row is above the fold on every phone, so it must
                  // not wait for lazy-loading and arrive as an empty box.
                  priority={index === 0}
                />
              </div>
              <p className="mt-1 line-clamp-2 text-xs font-bold text-[var(--bb-text-primary,#111827)]">{title.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f3f0ff)] p-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#7c3aed]">Verse of the Day</p>
        <p className="mt-1 text-base font-black leading-snug text-[var(--bb-text-primary,#111827)]">{verse.text}</p>
        <p className="mt-1 text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">{verse.reference} · KJV</p>
      </section>

      <section>
        <SectionHeading label="Recommended Reading" href="/blog" />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {recommended.map((article) => (
            <Link
              key={article.slug}
              href={article.canonicalPath}
              className="flex items-center gap-3 overflow-hidden rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)]"
            >
              <div className="relative h-16 w-20 shrink-0 bg-[var(--bb-surface-soft,#eef2f7)]">
                <Image src={article.image} alt="" fill className="object-cover" sizes="80px" />
              </div>
              <div className="min-w-0 py-2 pr-3">
                <p className="line-clamp-2 text-sm font-black text-[var(--bb-text-primary,#111827)]">{article.title}</p>
                <p className="mt-0.5 text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">{article.readTime}</p>
              </div>
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
          href="/dashboard?view=group"
          className="flex items-center gap-3 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dbeafe] text-lg" aria-hidden="true">
            👥
          </span>
          <span className="text-sm font-black text-[var(--bb-text-primary,#111827)]">Bible Buddy Community</span>
        </Link>
      </section>
    </div>
  );
}
