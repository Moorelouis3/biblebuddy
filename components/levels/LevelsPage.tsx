"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import LevelRing from "@/components/LevelRing";
import LoadFailedNotice from "@/components/LoadFailedNotice";
import { ACTION_POINT_WEIGHTS, LEVEL_DEFINITIONS, MAX_LEVEL, getTierForLevel } from "@/lib/levelSystem";
import { BADGE_TONE_CLASSES, type BadgeStatus } from "@/lib/achievementBadges";
import BadgeUnlockedToast, { type UnlockedBadge } from "@/components/levels/BadgeUnlockedToast";
import { claimBadgeAnnouncement, endBadgeAnnouncement } from "@/lib/badgeAnnouncements";

/**
 * The levels page: /levels, opened from the level card on the dashboard.
 *
 * Two things live here and they are kept apart on purpose.
 *
 *   LEVELS are one ladder of twenty, driven by XP. Everything shown about them
 *   comes from lib/levelSystem.ts and GET /api/points/summary - the same
 *   definitions and the same endpoint the dashboard card reads, so the two
 *   screens cannot disagree. Nothing here computes a level of its own.
 *
 *   BADGES are separate achievements, earned by doing a particular thing. They
 *   come from GET /api/badges/summary (lib/achievementBadges.ts). A badge pays
 *   a little XP once, when it unlocks, and unlocks one at a time: reaching a
 *   target makes it "ready", and ready badges unlock one per visit, at most
 *   one every two hours. The unlock itself happens in /api/points/summary,
 *   which is why this page reads that first and the badge list second.
 *
 * A level counts activity in an app. It says nothing about anybody's faith,
 * and the page says so in words rather than leaving it to be assumed.
 */

type PointsSummary = {
  totalPoints: number;
  level: number;
  levelName: string;
  identityText: string;
  encouragementText: string;
  progressPercent: number;
  pointsToNextLevel: number;
  nextLevelName: string | null;
  nextLevel: number | null;
  badgeUnlocked?: UnlockedBadge | null;
};

type BadgeSummary = {
  badges: BadgeStatus[];
  earnedCount: number;
  readyCount: number;
  totalCount: number;
  badgeXp: number;
};

const w = (key: keyof typeof ACTION_POINT_WEIGHTS) => ACTION_POINT_WEIGHTS[key] ?? 0;

/**
 * How XP is earned, read from the real weights so this list cannot drift from
 * what the app pays. The limits are the ones in lib/pointsEngine.ts.
 */
const WAYS_TO_EARN: Array<{ emoji: string; label: string; xp: string; note?: string }> = [
  { emoji: "📖", label: "Finish a Bible chapter", xp: `${w("chapter_completed")} XP`, note: "Once per chapter" },
  { emoji: "📘", label: "Finish a whole book of the Bible", xp: `${w("book_completed")} XP`, note: "On top of its chapters" },
  { emoji: "🌅", label: "Finish a study day's intro", xp: `${w("devotional_day_completed")} XP` },
  { emoji: "📝", label: "Review a chapter's study notes", xp: `${w("chapter_notes_reviewed")} XP`, note: "Once per chapter" },
  { emoji: "✍️", label: "Answer a study day's reflection", xp: `${w("devotional_reflection_saved")} XP` },
  { emoji: "🧠", label: "Finish a chapter's trivia", xp: `${w("trivia_chapter_completed")} XP`, note: `Plus ${w("trivia_question_correct")} XP per correct answer, up to 10 a day` },
  { emoji: "🔤", label: "Finish a chapter's Scrambled", xp: `${w("scrambled_chapter_completed")} XP`, note: `Plus ${w("scrambled_word_answered")} XP per word, up to 10 a day` },
  {
    emoji: "📅",
    label: "A Bible in One Year day",
    xp: `${w("bible_in_one_year_reading_completed") + w("bible_in_one_year_trivia_completed") + w("bible_in_one_year_reflection_completed")} XP`,
    note: `Reading ${w("bible_in_one_year_reading_completed")}, trivia ${w("bible_in_one_year_trivia_completed")}, reflection ${w("bible_in_one_year_reflection_completed")}`,
  },
  { emoji: "🧩", label: "Finish a Bible Word Search book", xp: `${w("word_search_book_completed")} XP`, note: "Once per book" },
  { emoji: "💭", label: "A Bible Memory practice session", xp: `${w("bible_memory_session_completed")} XP`, note: "Up to 2 a day" },
  { emoji: "👋", label: "Open the app", xp: `${w("user_login")} XP`, note: "Once a day" },
  { emoji: "🔥", label: "Keep your streak", xp: "+5 XP per week", note: "Up to +50" },
  { emoji: "💬", label: "Post, comment or like in the feed", xp: `${w("feed_post_liked")} to ${w("feed_post_thought")} XP`, note: "With a daily limit on each" },
];

async function sessionUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id ?? null;
}

async function authedFetch<T>(path: string): Promise<T> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("not signed in");
  const response = await fetch(path, { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) throw new Error(`${path} ${response.status}`);
  return (await response.json()) as T;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-3xl border border-[var(--bb-card-border,#e2e8f0)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function Bar({ percent, className = "", fill = "bg-[var(--bb-progress-fill,#6d5bd0)]" }: { percent: number; className?: string; fill?: string }) {
  const safe = Math.max(0, Math.min(100, percent));
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-[var(--bb-progress-track,#e9e5f7)] ${className}`} aria-hidden>
      <div className={`h-full rounded-full motion-safe:transition-[width] motion-safe:duration-700 ${fill}`} style={{ width: `${safe}%` }} />
    </div>
  );
}

function BadgeTile({ badge, onOpen }: { badge: BadgeStatus; onOpen: (badge: BadgeStatus) => void }) {
  const tone = BADGE_TONE_CLASSES[badge.tone];
  const percent = Math.round((badge.current / badge.target) * 100);
  const started = !badge.earned && !badge.ready && badge.current > 0;
  return (
    <button
      type="button"
      onClick={() => onOpen(badge)}
      aria-label={`${badge.title}. ${badge.earned ? "Earned" : badge.ready ? "Done, unlocks soon" : started ? `${badge.current} of ${badge.target}` : "Not started"}. ${badge.how}`}
      className={`flex min-h-[132px] w-full flex-col items-center rounded-2xl border p-3 text-center outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] motion-safe:hover:-translate-y-0.5 ${
        badge.earned
          ? `${tone.tile} ${tone.glow}`
          : badge.ready
            ? `${tone.tile} border-dashed`
            : "border-[var(--bb-card-border,#e2e8f0)] bg-[var(--bb-surface-soft,#f4f6fa)] text-[var(--bb-text-muted,#6b7280)]"
      } ${badge.isNew ? "motion-safe:animate-[bb-badge-pop_700ms_ease-out]" : ""}`}
    >
      <span className={`text-3xl leading-none ${badge.earned ? "" : badge.ready ? "opacity-80" : "opacity-45 grayscale"}`} aria-hidden>
        {badge.emoji}
      </span>
      <span className="mt-2 text-[13px] font-black leading-tight">{badge.title}</span>
      {badge.earned ? (
        <span className="mt-1 text-[11px] font-bold opacity-80">{badge.isNew ? "New!" : "Earned"}</span>
      ) : badge.ready ? (
        <span className="mt-1 text-[11px] font-bold opacity-80">Done · unlocks soon</span>
      ) : (
        <>
          <span className="mt-1 text-[11px] font-bold">
            {badge.current.toLocaleString()} / {badge.target.toLocaleString()}
          </span>
          <Bar percent={percent} className="mt-1.5 !h-1.5" fill={started ? tone.progress : "bg-transparent"} />
        </>
      )}
    </button>
  );
}

export default function LevelsPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<PointsSummary | null>(null);
  const [summaryFailed, setSummaryFailed] = useState(false);
  const [badges, setBadges] = useState<BadgeSummary | null>(null);
  const [badgesFailed, setBadgesFailed] = useState(false);
  const [openBadge, setOpenBadge] = useState<BadgeStatus | null>(null);
  const [unlocked, setUnlocked] = useState<UnlockedBadge | null>(null);
  const dismissUnlocked = useCallback(() => {
    setUnlocked((shown) => {
      if (shown) endBadgeAnnouncement(shown.id);
      return null;
    });
  }, []);
  const [reloadKey, setReloadKey] = useState(0);
  const currentRowRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    setSummaryFailed(false);
    setBadgesFailed(false);
    // In order, not side by side: the points read is the one that may unlock
    // a badge, and the list has to be read after it or it would show that
    // badge as still waiting. A failure in one still must not blank the other,
    // so the list is read whether or not the points read worked.
    void (async () => {
      let unlockedId: string | null = null;
      try {
        const payload = await authedFetch<PointsSummary>("/api/points/summary");
        if (cancelled) return;
        setSummary(payload);
        if (payload.badgeUnlocked) {
          // Marked "New!" in the grid either way; announced only if this
          // device has not already announced it (the dashboard may have).
          unlockedId = payload.badgeUnlocked.id;
          const userId = await sessionUserId();
          if (!cancelled && userId && claimBadgeAnnouncement(userId, payload.badgeUnlocked.id)) setUnlocked(payload.badgeUnlocked);
        }
      } catch {
        if (!cancelled) setSummaryFailed(true);
      }
      try {
        const payload = await authedFetch<BadgeSummary>("/api/badges/summary");
        if (cancelled) return;
        setBadges({ ...payload, badges: payload.badges.map((badge) => (badge.id === unlockedId ? { ...badge, isNew: true } : badge)) });
      } catch {
        if (!cancelled) setBadgesFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const retry = useCallback(() => setReloadKey((key) => key + 1), []);

  // Back goes where the reader came from; a cold open of /levels has nowhere
  // to go back to, so it goes to the dashboard instead of doing nothing.
  const goBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/dashboard");
  }, [router]);

  useEffect(() => {
    if (!openBadge) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenBadge(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openBadge]);

  const sortedBadges = useMemo(() => {
    if (!badges) return [];
    const rank = (badge: BadgeStatus) => (badge.isNew ? 0 : badge.earned ? 1 : badge.ready ? 2 : badge.current > 0 ? 3 : 4);
    return [...badges.badges].sort((a, b) => rank(a) - rank(b) || b.current / b.target - a.current / a.target);
  }, [badges]);
  const closest = useMemo(
    () =>
      sortedBadges.find((badge) => !badge.earned && !badge.ready && badge.current > 0) ??
      sortedBadges.find((badge) => !badge.earned && !badge.ready) ??
      null,
    [sortedBadges],
  );

  const level = summary?.level ?? null;
  const atTop = level !== null && level >= MAX_LEVEL;
  const tier = level ? getTierForLevel(level) : null;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pb-28 pt-4 sm:pt-6">
      {/* Used once, by a badge earned on this load. Reduced motion skips it. */}
      <style>{`@keyframes bb-badge-pop{0%{transform:scale(.86);opacity:.4}60%{transform:scale(1.06);opacity:1}100%{transform:scale(1)}}`}</style>

      <button
        type="button"
        onClick={goBack}
        className="inline-flex min-h-11 items-center gap-1 rounded-full px-2 text-sm font-bold text-[var(--bb-accent,#2f7fe8)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)]"
      >
        <span aria-hidden>←</span> Back
      </button>

      <h1 className="mt-1 text-2xl font-black text-[var(--bb-text-primary,#111827)]">Your Level</h1>

      {/* ---- where you are ------------------------------------------------ */}
      <Card className="mt-4">
        {summaryFailed ? (
          <LoadFailedNotice message="Couldn't load your level." onRetry={retry} />
        ) : !summary ? (
          <div className="animate-pulse" aria-busy="true" aria-label="Loading your level">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-[var(--bb-surface-soft,#eef2f7)]" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-2/3 rounded bg-[var(--bb-surface-soft,#eef2f7)]" />
                <div className="h-4 w-1/2 rounded bg-[var(--bb-surface-soft,#eef2f7)]" />
              </div>
            </div>
            <div className="mt-5 h-2.5 rounded-full bg-[var(--bb-surface-soft,#eef2f7)]" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <LevelRing level={summary.level} size={84} progressPercent={atTop ? undefined : summary.progressPercent}>
                <span
                  className="flex h-full w-full items-center justify-center rounded-full text-2xl font-black text-white"
                  style={{ backgroundColor: tier?.coreColor ?? "#334155" }}
                >
                  {summary.level}
                </span>
              </LevelRing>
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-text-muted,#6b7280)]">
                  Level {summary.level} of {MAX_LEVEL}
                </p>
                <p className="text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">{summary.levelName}</p>
                <p className="mt-0.5 text-sm font-bold text-[var(--bb-text-secondary,#4b5563)]">
                  {summary.totalPoints.toLocaleString()} XP
                </p>
              </div>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-[var(--bb-text-secondary,#4b5563)]">{summary.identityText}</p>

            {atTop ? (
              <p className="mt-4 rounded-2xl bg-[var(--bb-surface-soft,#f4f6fa)] px-4 py-3 text-sm font-bold text-[var(--bb-text-primary,#111827)]">
                This is the highest level. There is no next one to reach.
              </p>
            ) : (
              <div className="mt-4">
                <Bar percent={summary.progressPercent} />
                <div className="mt-2 flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-black text-[var(--bb-text-primary,#111827)]">
                    {summary.pointsToNextLevel.toLocaleString()} XP to go
                  </span>
                  <span className="text-right font-bold text-[var(--bb-text-muted,#6b7280)]">
                    Next: Level {summary.nextLevel} · {summary.nextLevelName}
                  </span>
                </div>
              </div>
            )}

            <p className="mt-4 text-sm italic leading-relaxed text-[var(--bb-text-muted,#6b7280)]">{summary.encouragementText}</p>
          </>
        )}
      </Card>

      {/* ---- what a level is, and is not ---------------------------------- */}
      <p className="mt-4 px-1 text-[13px] leading-relaxed text-[var(--bb-text-muted,#6b7280)]">
        Levels count what you have done in Bible Buddy. They are a way to see your own progress here. They do not
        measure your faith or how close you are to God.
      </p>

      {/* ---- badges -------------------------------------------------------- */}
      <Card className="mt-6">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-black text-[var(--bb-text-primary,#111827)]">Badges</h2>
          {badges ? (
            <span className="text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
              {badges.earnedCount} of {badges.totalCount} earned
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-[var(--bb-text-secondary,#4b5563)]">
          Badges are separate from your level. Each one marks a particular thing you have done, and adds a little XP
          when it unlocks. Tap a badge to see how to earn it.
        </p>

        {badgesFailed ? (
          <LoadFailedNotice className="mt-4" message="Couldn't load your badges." onRetry={retry} />
        ) : !badges ? (
          <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-4" aria-busy="true" aria-label="Loading badges">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-[132px] animate-pulse rounded-2xl bg-[var(--bb-surface-soft,#eef2f7)]" />
            ))}
          </div>
        ) : (
          <>
            {badges.readyCount > 0 ? (
              <p className="mt-4 rounded-2xl bg-[var(--bb-surface-soft,#f4f6fa)] px-4 py-3 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
                {badges.readyCount === 1
                  ? "You have done enough for 1 more badge."
                  : `You have done enough for ${badges.readyCount} more badges.`}{" "}
                Badges unlock one at a time, so the next one will be waiting when you come back.
              </p>
            ) : badges.earnedCount === 0 ? (
              <p className="mt-4 rounded-2xl bg-[var(--bb-surface-soft,#f4f6fa)] px-4 py-3 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
                No badges yet. {closest ? `The first one, ${closest.emoji} ${closest.title}, is one step away: ${closest.how}` : ""}
              </p>
            ) : closest ? (
              <p className="mt-4 rounded-2xl bg-[var(--bb-surface-soft,#f4f6fa)] px-4 py-3 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
                Next up: {closest.emoji} {closest.title}, {closest.current.toLocaleString()} of {closest.target.toLocaleString()}.
              </p>
            ) : null}

            <div className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
              {sortedBadges.map((badge) => (
                <BadgeTile key={badge.id} badge={badge} onOpen={setOpenBadge} />
              ))}
            </div>
          </>
        )}
      </Card>

      {/* ---- how XP is earned --------------------------------------------- */}
      <Card className="mt-6">
        <h2 className="text-lg font-black text-[var(--bb-text-primary,#111827)]">How you earn XP</h2>
        <p className="mt-1 text-sm leading-relaxed text-[var(--bb-text-secondary,#4b5563)]">
          XP comes from studying. Most things count once: reading the same chapter again does not add more XP, so the
          way up is reading and studying something new.
        </p>
        <ul className="mt-3 divide-y divide-[var(--bb-card-border,#e2e8f0)]">
          {WAYS_TO_EARN.map((way) => (
            <li key={way.label} className="flex items-center gap-3 py-2.5">
              <span className="text-xl" aria-hidden>
                {way.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-[var(--bb-text-primary,#111827)]">{way.label}</span>
                {way.note ? <span className="block text-xs text-[var(--bb-text-muted,#6b7280)]">{way.note}</span> : null}
              </span>
              <span className="shrink-0 text-sm font-black text-[var(--bb-text-primary,#111827)]">{way.xp}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ---- every level --------------------------------------------------- */}
      <Card className="mt-6">
        <h2 className="text-lg font-black text-[var(--bb-text-primary,#111827)]">All {MAX_LEVEL} levels</h2>
        <ol className="mt-3 space-y-2">
          {LEVEL_DEFINITIONS.map((def) => {
            const state = level === null ? "unknown" : def.level < level ? "done" : def.level === level ? "current" : "ahead";
            const defTier = getTierForLevel(def.level);
            return (
              <li
                key={def.level}
                ref={state === "current" ? currentRowRef : undefined}
                aria-current={state === "current" ? "step" : undefined}
                className={`flex items-start gap-3 rounded-2xl border p-3 ${
                  state === "current"
                    ? "border-[var(--bb-accent,#2f7fe8)] bg-[var(--bb-accent-soft,#eaf2ff)]"
                    : "border-[var(--bb-card-border,#e2e8f0)] bg-[var(--bb-card,#ffffff)]"
                } ${state === "ahead" ? "opacity-75" : ""}`}
              >
                <span
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                  style={{ backgroundColor: state === "ahead" ? "#94a3b8" : defTier.coreColor }}
                  aria-hidden
                >
                  {state === "done" ? "✓" : def.level}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[15px] font-black text-[var(--bb-text-primary,#111827)]">
                      Level {def.level} · {def.levelName}
                    </span>
                    <span className="text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                      {def.maxPoints === null
                        ? `${def.minPoints.toLocaleString()} XP and up`
                        : `${def.minPoints.toLocaleString()} to ${def.maxPoints.toLocaleString()} XP`}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm leading-relaxed text-[var(--bb-text-secondary,#4b5563)]">{def.identityText}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">
                    {state === "done" ? "Completed" : state === "current" ? "You are here" : state === "ahead" ? "Coming up" : ""}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Card>

      <p className="mt-6 text-center text-sm">
        <Link href="/dashboard" className="font-bold underline" style={{ color: "var(--bb-accent, #2f7fe8)" }}>
          Back to the dashboard
        </Link>
      </p>

      {unlocked ? <BadgeUnlockedToast badge={unlocked} onDismiss={dismissUnlocked} showLink={false} /> : null}

      {/* ---- one badge, in full ------------------------------------------- */}
      {openBadge ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 p-3 sm:items-center"
          onClick={() => setOpenBadge(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bb-badge-title"
            onClick={(event) => event.stopPropagation()}
            className={`w-full max-w-sm rounded-3xl border p-5 shadow-xl ${BADGE_TONE_CLASSES[openBadge.tone].tile}`}
          >
            <div className="text-center">
              <span className={`text-5xl ${openBadge.earned ? "" : "opacity-50 grayscale"}`} aria-hidden>
                {openBadge.emoji}
              </span>
              <p className="mt-1 text-[11px] font-black uppercase tracking-[0.14em] opacity-70">{openBadge.category}</p>
              <h3 id="bb-badge-title" className="text-xl font-black">
                {openBadge.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{openBadge.description}</p>
            <p className="mt-3 text-xs font-black uppercase tracking-wide opacity-70">How to earn it</p>
            <p className="text-sm font-semibold leading-relaxed">{openBadge.how}</p>
            <p className="mt-3 text-xs font-black uppercase tracking-wide opacity-70">Worth</p>
            <p className="text-sm font-semibold">{openBadge.xp} XP, once</p>
            {openBadge.ready ? (
              <p className="mt-3 text-sm font-black">
                ✓ Done. Badges unlock one at a time, so this one will unlock on a later visit.
              </p>
            ) : openBadge.earned ? (
              <p className="mt-3 text-sm font-black">
                ✓ Earned
                {openBadge.earnedAt
                  ? ` on ${new Date(openBadge.earnedAt).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}`
                  : ""}
              </p>
            ) : (
              <div className="mt-3">
                <Bar percent={(openBadge.current / openBadge.target) * 100} fill={BADGE_TONE_CLASSES[openBadge.tone].progress} />
                <p className="mt-1.5 text-sm font-black">
                  {openBadge.current.toLocaleString()} of {openBadge.target.toLocaleString()} · {(openBadge.target - openBadge.current).toLocaleString()} to go
                </p>
              </div>
            )}
            <button
              type="button"
              autoFocus
              onClick={() => setOpenBadge(null)}
              className="mt-4 min-h-11 w-full rounded-full bg-[var(--bb-button,#1f2937)] px-5 text-sm font-black text-[var(--bb-button-text,#ffffff)] outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
