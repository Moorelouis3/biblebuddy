"use client";

export const dynamic = "force-dynamic";

/**
 * The community event page - sign-up and information for The Wisdom of
 * Proverbs, and any community devotional after it. Everything on it is driven
 * by lib/communityEvents.ts, so the next event is a config entry.
 *
 * Reuses the systems that already exist: the devotional and its 31 days,
 * devotional_progress for personal progress, the solo day view for study,
 * the group feed for discussion, and landing-analytics for tracking.
 */

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useSupabaseUser } from "../../../lib/useSupabaseUser";
import { recordNewUser } from "../../../lib/guestSession";
import {
  getCommunityEvent,
  getCommunityEventState,
  isCommunityEventDayUnlocked,
} from "../../../lib/communityEvents";
import { BIBLE_STUDY_GROUP_ID } from "../../../lib/bibleStudiesCatalog";

function track(eventName: string, metadata: Record<string, unknown> = {}) {
  try {
    void fetch("/api/landing-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        page_path: `${window.location.pathname}${window.location.search}`,
        referrer: document.referrer || null,
        metadata,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* analytics never blocks the page */
  }
}

const HOW_IT_WORKS: Array<{ title: string; body: string; icon: string }> = [
  { icon: "🎧", title: "Read or listen", body: "Read or listen to that day's Wisdom of Proverbs devotional." },
  { icon: "📖", title: "Read the chapter", body: "Read the corresponding chapter of Proverbs inside Bible Buddy." },
  { icon: "🧠", title: "Test what you learned", body: "Complete the trivia for that day." },
  {
    icon: "💬",
    title: "Join the discussion",
    body: "Answer the daily discussion question, then read and reply to other Bible Buddies if you would like to continue the conversation.",
  },
];

export default function CommunityEventPage() {
  const params = useParams();
  const router = useRouter();
  const slug = String(params.slug || "");
  const event = getCommunityEvent(slug);
  const { userId, loading: authLoading } = useSupabaseUser();

  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);
  const [justJoined, setJustJoined] = useState(false);
  const [reminders, setReminders] = useState(false);
  const [participants, setParticipants] = useState<number | null>(null);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [streak, setStreak] = useState<number | null>(null);

  const state = useMemo(() => (event ? getCommunityEventState(event) : null), [event]);

  useEffect(() => {
    if (event) track("community_event_page_view", { event: event.slug });
  }, [event]);

  useEffect(() => {
    if (!event || !userId) return;
    void (async () => {
      try {
        const [memberResult, progressResult, profileResult, countResult] = await Promise.allSettled([
          supabase
            .from("community_event_members")
            .select("reminders")
            .eq("event_slug", event.slug)
            .eq("user_id", userId)
            .maybeSingle(),
          supabase
            .from("devotional_progress")
            .select("day_number")
            .eq("user_id", userId)
            .eq("devotional_id", event.devotionalId),
          supabase.from("profile_stats").select("current_streak").eq("user_id", userId).maybeSingle(),
          supabase
            .from("community_event_members")
            .select("*", { count: "exact", head: true })
            .eq("event_slug", event.slug),
        ]);

        if (memberResult.status === "fulfilled" && memberResult.value.data) {
          setJoined(true);
          setReminders(Boolean((memberResult.value.data as { reminders?: boolean }).reminders));
        }
        if (progressResult.status === "fulfilled" && Array.isArray(progressResult.value.data)) {
          setCompletedDays(
            new Set((progressResult.value.data as Array<{ day_number: number }>).map((row) => row.day_number)),
          );
        }
        if (profileResult.status === "fulfilled") {
          const s = (profileResult.value.data as { current_streak?: number } | null)?.current_streak;
          if (typeof s === "number") setStreak(s);
        }
        if (countResult.status === "fulfilled" && typeof countResult.value.count === "number" && countResult.value.count > 0) {
          setParticipants(countResult.value.count);
        }
      } catch {
        /* every section degrades independently */
      }
    })();
  }, [event, userId]);

  if (!event) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-sm font-black text-[var(--bb-text-secondary,#4b5563)]">
        This event does not exist.
      </div>
    );
  }

  const nextDay =
    Array.from({ length: event.totalDays }, (_, i) => i + 1).find((d) => !completedDays.has(d)) || event.totalDays;
  const nextOpenDay = isCommunityEventDayUnlocked(event, nextDay) ? nextDay : null;

  async function join() {
    if (!event || joining) return;
    track("community_event_join_click", { event: event.slug });
    if (!userId) {
      // Existing auth flow, back to this page afterwards.
      router.push(`/login?next=${encodeURIComponent(`/events/${event.slug}`)}`);
      return;
    }
    setJoining(true);
    try {
      const { error } = await supabase
        .from("community_event_members")
        .upsert({ event_slug: event.slug, user_id: userId }, { onConflict: "event_slug,user_id", ignoreDuplicates: true });
      if (!error) {
        setJoined(true);
        setJustJoined(true);
        setParticipants((count) => (count === null ? 1 : count + 1));
        track("community_event_joined", { event: event.slug });
        recordNewUser(userId, `community_event_${event.slug}`);
      }
    } finally {
      setJoining(false);
    }
  }

  async function toggleReminders(on: boolean) {
    if (!event || !userId) return;
    setReminders(on);
    await supabase
      .from("community_event_members")
      .update({ reminders: on })
      .eq("event_slug", event.slug)
      .eq("user_id", userId);
    if (on) track("community_event_reminder_optin", { event: event.slug });
  }

  function openDay(day: number) {
    track("community_event_day_started", { event: event!.slug, day });
    router.push(`/devotionals/${event!.devotionalId}/day/${day}`);
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 pb-28 pt-4">
      <header
        className="overflow-hidden rounded-[28px] border border-[#3a2c14] p-6 text-center"
        style={{
          background: `linear-gradient(100deg, #0c0804 0%, #17100a 55%, rgba(23,16,10,0.65) 100%), url(${event.bannerArt}) right top / auto 100% no-repeat`,
        }}
      >
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#bfa877]">October 1–31</p>
        <h1 className="mt-2 text-3xl font-black leading-tight" style={{ color: "#e8c877" }}>
          {event.title}
        </h1>
        <p className="mt-1 text-sm font-bold text-[#f4ecdd]">{event.subtitle}</p>
        {state?.phase === "countdown" ? (
          <p className="mt-3 inline-block rounded-full border border-[#8a6b2f] px-4 py-1.5 text-xs font-black tracking-widest text-[#e8c877]">
            {state.daysToGo} DAY{state.daysToGo === 1 ? "" : "S"} TO GO
          </p>
        ) : state?.phase === "live" ? (
          <p className="mt-3 inline-block rounded-full border border-[#8a6b2f] px-4 py-1.5 text-xs font-black tracking-widest text-[#e8c877]">
            DAY {state.communityDay} OF {event.totalDays}
          </p>
        ) : null}
      </header>

      <p className="text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
        Study all 31 chapters of Proverbs alongside Bible Buddies around the world. A new day becomes available
        every day throughout October. You do not have to join at a particular time. Complete each day whenever it
        fits your schedule, then meet the community in the daily discussion.
      </p>

      {justJoined ? (
        <div className="rounded-2xl border border-[#cfe5cf] bg-[#eefaf0] p-4">
          <p className="text-sm font-black text-[#14532d]">You&apos;re in! The journey begins October 1.</p>
          <p className="mt-0.5 text-xs font-semibold text-[#3f6212]">
            We&apos;ll remind you when Day 1 becomes available.
          </p>
        </div>
      ) : null}

      {!joined ? (
        <button
          type="button"
          onClick={() => void join()}
          disabled={joining || authLoading}
          className="min-h-12 rounded-xl px-5 text-sm font-black tracking-wide text-[#221503] transition hover:brightness-95 disabled:opacity-70"
          style={{ background: "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)" }}
        >
          {joining ? "JOINING…" : "JOIN THE 31-DAY STUDY"}
        </button>
      ) : (
        <label className="flex items-center gap-3 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4">
          <input
            type="checkbox"
            checked={reminders}
            onChange={(e) => void toggleReminders(e.target.checked)}
            className="h-5 w-5 accent-[#cfa147]"
          />
          <span className="text-sm font-bold text-[var(--bb-text-primary,#111827)]">Remind me each day in October</span>
        </label>
      )}

      {participants !== null ? (
        <p className="text-center text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
          {participants} Bible Buddies have joined
        </p>
      ) : null}

      <section>
        <h2 className="mb-2 text-xs font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">
          How it works
        </h2>
        <div className="flex flex-col gap-2">
          {HOW_IT_WORKS.map((step, index) => (
            <div
              key={step.title}
              className="flex items-start gap-3 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4"
            >
              <span className="text-xl" aria-hidden="true">
                {step.icon}
              </span>
              <span>
                <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">
                  {index + 1}. {step.title}
                </span>
                <span className="mt-0.5 block text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">
                  {step.body}
                </span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs font-semibold italic leading-5 text-[var(--bb-text-muted,#6b7280)]">
          We are not meeting at one particular time. We are studying the same chapter on the same day—and meeting
          in the discussion afterward.
        </p>
      </section>

      {joined ? (
        <section>
          <h2 className="mb-2 text-xs font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">
            Your progress
          </h2>
          <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-[var(--bb-text-secondary,#4b5563)]">
              {state?.phase === "live" ? <span>Community: Day {state.communityDay}</span> : null}
              <span>
                You: {completedDays.size} of {event.totalDays} days done
              </span>
              {streak !== null ? <span>🔥 {streak} day streak</span> : null}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2">
              {Array.from({ length: event.totalDays }, (_, i) => i + 1).map((day) => {
                const done = completedDays.has(day);
                const unlocked = isCommunityEventDayUnlocked(event, day);
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={!unlocked}
                    onClick={() => openDay(day)}
                    title={done ? `Day ${day} - completed` : unlocked ? `Open Day ${day}` : `Day ${day} unlocks later`}
                    className={`grid aspect-square place-items-center rounded-lg text-[11px] font-black transition ${
                      done
                        ? "bg-[#e8c877] text-[#221503]"
                        : unlocked
                          ? "border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f4f8ff)] text-[var(--bb-text-primary,#111827)] hover:border-[#cfa147]"
                          : "border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f4f8ff)] text-[var(--bb-text-muted,#9ca3af)] opacity-60"
                    }`}
                  >
                    {done ? "✓" : unlocked ? day : "🔒"}
                  </button>
                );
              })}
            </div>
            {nextOpenDay ? (
              <button
                type="button"
                onClick={() => openDay(nextOpenDay)}
                className="mt-4 flex min-h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-black text-[#221503] transition hover:brightness-95"
                style={{ background: "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)" }}
              >
                CONTINUE WITH DAY {nextOpenDay}
              </button>
            ) : state?.phase === "countdown" ? (
              <p className="mt-4 text-center text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                Day 1 unlocks October 1.
              </p>
            ) : null}
          </div>
          <Link
            href={`/study-groups/${BIBLE_STUDY_GROUP_ID}/chat`}
            className="mt-2 block text-center text-sm font-bold text-[var(--bb-accent,#2f7fe8)]"
          >
            Open the daily discussion in the Study Group
          </Link>
        </section>
      ) : null}

      {/* Book and journal promo: built, hidden until a real link exists. */}
      {event.bookUrl ? (
        <section className="rounded-2xl border border-[#3a2c14] p-5" style={{ background: "#17100a" }}>
          <h2 className="text-lg font-black" style={{ color: "#e8c877" }}>
            Continue Your Journey Beyond the App
          </h2>
          <p className="mt-1 text-sm font-semibold text-[#f4ecdd]">
            Bring The Wisdom of Proverbs into your personal study time with the hardcover devotional and companion
            journal.
          </p>
          <a
            href={event.bookUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("community_event_book_click", { event: event.slug })}
            className="mt-3 inline-block rounded-xl px-5 py-2.5 text-sm font-black text-[#221503]"
            style={{ background: "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)" }}
          >
            GET THE HARDCOVER
          </a>
        </section>
      ) : null}
    </div>
  );
}
