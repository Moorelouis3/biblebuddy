"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDailyRecommendation, type DailyRecommendation } from "@/lib/dailyRecommendation";
import { getBibleBuddyLocalDayKey } from "@/lib/louisDailyFlow";

/**
 * "Your next step" - one card, on the dashboard, saying the single next thing.
 *
 * Louis, 2026-10-17: "a today's task or today's God thing, where if they are
 * part of a devotional, the last one that they did continuing to the next day,
 * or where they left off at, or if they're in the Bible in One Year - saying
 * this is your next recommended thing, like a little section."
 *
 * The thinking behind it already existed and was good: getDailyRecommendation
 * reads what somebody has actually finished and works out the next move - Day 7
 * of the devotional they are halfway through, the chapter after the one they
 * read last, the Bible in One Year day they are up to. It was only ever shown
 * in a modal, though, and a modal is something you close. Nothing on the page
 * carried it, so the one question a reader opens the app with - what do I do
 * today - was answered by a popup they had already dismissed.
 *
 * Deliberately ONE card with ONE button. The recommender returns a ranked list
 * and it is tempting to show three; three options is a decision, and someone
 * who wanted to decide would not need a recommendation. "Recommended For You"
 * further down the page is a shelf of articles and is a different thing.
 *
 * Renders nothing while loading, when signed out, or when there is no
 * recommendation - a card that says "nothing to suggest" is worse than no card.
 */

/** The themes the recommender already speaks in, as card colours. */
const THEMES: Record<string, { ring: string; bg: string; eyebrow: string }> = {
  blue: { ring: "border-[#d7e6fb]", bg: "bg-[#f4f9ff]", eyebrow: "text-[#2f7fe8]" },
  green: { ring: "border-[#bfe4cd]", bg: "bg-[#f3fbf6]", eyebrow: "text-[#2f8f5b]" },
  rose: { ring: "border-[#f6d2dd]", bg: "bg-[#fff5f8]", eyebrow: "text-[#c2417a]" },
  purple: { ring: "border-[#ded2f6]", bg: "bg-[#f9f5ff]", eyebrow: "text-[#7149c6]" },
  gold: { ring: "border-[#f0e0b8]", bg: "bg-[#fffaef]", eyebrow: "text-[#9a7320]" },
};

/**
 * Worked out once a day, per device, and remembered.
 *
 * getDailyRecommendation runs seven Supabase queries. It was written for a
 * popup that fired once a session and is switched off
 * (DAILY_RECOMMENDATIONS_ENABLED in AppShell), so it had never run on the
 * dashboard - and the dashboard is the most-opened screen in Bible Buddy.
 * Seven queries on every load of it, across the tabs people leave open, is the
 * shape of the three October outages: those came from an eight-second poll in
 * AppShell making about 147,000 requests a day, not from the database being
 * too small.
 *
 * So it is computed once and remembered. Not for the whole day, though: the
 * suggestion goes stale the moment somebody acts on it, and a card still
 * saying "Continue Day 143" an hour after they finished Day 143 is worse than
 * one query too many. Half an hour is the compromise - it collapses the burst
 * of loads that happens while somebody is moving around the app, which is
 * where the cost actually is, and never leaves the card wrong for long.
 *
 * Storing the misses matters too: without it, everybody with nothing to
 * suggest pays all seven queries on every single load.
 */
const CACHE_PREFIX = "bb:next-step";
/** Long enough to cover moving around the app, short enough to stay true. */
const CACHE_TTL_MS = 30 * 60 * 1000;

type CachedRecommendation = { day: string; at: number; value: DailyRecommendation | null };

function cacheKey(userId: string) {
  return `${CACHE_PREFIX}:${userId}`;
}

function readCache(userId: string): CachedRecommendation | null {
  try {
    const raw = window.localStorage.getItem(cacheKey(userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedRecommendation;
    if (!parsed || parsed.day !== getBibleBuddyLocalDayKey()) return null;
    // A clock that has gone backwards (a timezone change, a corrected device
    // clock) would otherwise pin a stale card until the TTL caught up.
    const age = Date.now() - (parsed.at ?? 0);
    if (age < 0 || age > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    // Blocked storage, or something else wrote nonsense here. Fetching is
    // always the correct fallback.
    return null;
  }
}

function writeCache(userId: string, value: DailyRecommendation | null) {
  try {
    const payload: CachedRecommendation = { day: getBibleBuddyLocalDayKey(), at: Date.now(), value };
    window.localStorage.setItem(cacheKey(userId), JSON.stringify(payload));
  } catch {
    // Not remembering it costs seven queries on the next load, which is what
    // the old behaviour was. Nothing breaks.
  }
}

export default function NextStepCard({ userId }: { userId: string | null }) {
  const [recommendation, setRecommendation] = useState<DailyRecommendation | null>(null);

  useEffect(() => {
    if (!userId) {
      setRecommendation(null);
      return;
    }

    const cached = readCache(userId);
    if (cached) {
      setRecommendation(cached.value);
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const next = await getDailyRecommendation(userId);
        writeCache(userId, next);
        if (!cancelled) setRecommendation(next);
      } catch {
        // No suggestion is a fine outcome. The dashboard behaves exactly as it
        // did before this card existed. Deliberately not cached: a failed
        // query should be retried on the next load, not remembered all day.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!recommendation) return null;

  const theme = THEMES[recommendation.cardTheme || "blue"] || THEMES.blue;
  // cardTitle is the warm version ("Hey, you read Luke 4 last time") and
  // recommendationLine is the plain one. Either can be missing depending on
  // which branch of the recommender produced this, so each falls back to the
  // other rather than leaving an empty line.
  const title = recommendation.cardTitle || recommendation.recommendationLine;
  const subtitle = recommendation.cardSubtitle || recommendation.recommendationLine;

  return (
    <section aria-labelledby="home-next-step-heading">
      <div className={`rounded-2xl border ${theme.ring} ${theme.bg} p-4 shadow-sm sm:p-5`}>
        <p className={`text-[11px] font-black uppercase tracking-[0.08em] ${theme.eyebrow}`}>
          {recommendation.cardEyebrow || "Your next step"}
        </p>

        <h2
          id="home-next-step-heading"
          className="mt-1.5 text-base font-black leading-snug text-[var(--bb-text-primary,#0f1f3a)] sm:text-lg"
        >
          {title}
        </h2>

        {subtitle && subtitle !== title ? (
          <p className="mt-1 text-sm font-medium leading-snug text-[#5b7395]">{subtitle}</p>
        ) : null}

        <Link
          href={recommendation.primaryButtonHref}
          className="mt-3.5 inline-flex items-center justify-center rounded-full bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] px-5 py-2.5 text-sm font-black text-white shadow-sm shadow-[#2f7fe8]/25 transition hover:opacity-95"
        >
          {recommendation.primaryButtonText}
        </Link>
      </div>
    </section>
  );
}
