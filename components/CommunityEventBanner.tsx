"use client";

/**
 * The promotional banner at the top of the group feed - The Wisdom of
 * Proverbs first, any community event later.
 *
 * One responsive component over one art asset. The art is the right column
 * (King Solomon), the text panel is drawn live, so the same banner counts
 * down before launch, shows the community day during the event, and settles
 * into the evergreen invitation afterwards - no scheduled images.
 *
 * It sits inside the feed column, so its edges align with the cards below
 * by construction. The whole banner navigates to the event page.
 */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  getActiveCommunityEvent,
  getCommunityEventState,
} from "../lib/communityEvents";

function trackEvent(eventName: string, metadata: Record<string, unknown> = {}) {
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
    // Analytics must never break the group page.
  }
}

export default function CommunityEventBanner({
  userId,
  source = "group_page",
}: {
  userId?: string | null;
  /** Where this banner instance lives - the homepage and the group page share
      the component and event; analytics tell them apart by this. */
  source?: "group_page" | "homepage";
}) {
  const event = getActiveCommunityEvent();
  const [joined, setJoined] = useState(false);
  const [participants, setParticipants] = useState<number | null>(null);

  // Re-evaluated each minute so the countdown flips to live at Berlin
  // midnight without a reload left open overnight showing yesterday.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const state = useMemo(() => (event ? getCommunityEventState(event, now) : null), [event, now]);

  useEffect(() => {
    if (!event) return;
    trackEvent("community_event_banner_impression", { event: event.slug, source });
  }, [event, source]);

  useEffect(() => {
    if (!event) return;
    void (async () => {
      try {
        // Real numbers or none: the join table may not exist yet, and a
        // missing count hides the line rather than inventing one.
        const { count, error } = await supabase
          .from("community_event_members")
          .select("*", { count: "exact", head: true })
          .eq("event_slug", event.slug);
        if (!error && typeof count === "number" && count > 0) setParticipants(count);

        if (userId) {
          const { data } = await supabase
            .from("community_event_members")
            .select("user_id")
            .eq("event_slug", event.slug)
            .eq("user_id", userId)
            .maybeSingle();
          if (data) setJoined(true);

        }
      } catch {
        // Leave the banner in its stateless form.
      }
    })();
  }, [event, userId]);

  if (!event || !state) return null;

  const pill =
    state.phase === "countdown"
      ? `${state.daysToGo} DAY${state.daysToGo === 1 ? "" : "S"} TO GO`
      : state.phase === "live"
        ? `DAY ${state.communityDay} OF ${event.totalDays}`
        : `${event.totalDays} DAYS`;

  const heading =
    state.phase === "live" ? `Day ${state.communityDay} of ${event.totalDays}` : event.title;

  const sub =
    state.phase === "countdown"
      ? "A 31-day devotional · Starting October 1"
      : state.phase === "live"
        ? `Today: Proverbs ${state.communityDay}`
        : "Grow in wisdom one chapter at a time.";

  // The study itself is still being built, so members just see that they are
  // in - nothing to view yet. Louis, 2026-09-02.
  const cta = joined ? "YOU'RE IN ✓" : state.phase === "evergreen" ? "START THE 31-DAY JOURNEY" : "JOIN THE STUDY";

  return (
    <Link
      href={`/events/${event.slug}`}
      onClick={() => trackEvent("community_event_banner_click", { event: event.slug, phase: state.phase, source })}
      className="bb-community-event-banner block overflow-hidden rounded-[28px] border border-[#3a2c14] shadow-sm"
      style={{ background: "linear-gradient(105deg, #0c0804 0%, #17100a 58%, #241708 100%)" }}
      aria-label={`${event.title} - open the event page`}
    >
      <div className="relative flex min-h-[190px] items-stretch sm:min-h-[220px]">
        {/* King Solomon. Kept on every size; on phones he narrows instead of
            covering the words. */}
        <div
          className="absolute inset-y-0 right-0 w-[38%] bg-cover bg-[position:35%_top] sm:w-[46%] sm:bg-[position:center_top]"
          style={{ backgroundImage: `url(${event.bannerArt})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-[30%] w-[16%] sm:right-[38%] sm:w-[14%]"
          style={{ background: "linear-gradient(90deg, #17100a 0%, transparent 100%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex w-[68%] flex-col justify-center gap-1.5 py-5 pl-5 pr-2 sm:w-[58%] sm:gap-2 sm:py-6 sm:pl-7">
          <span
            className="w-fit rounded-full border border-[#8a6b2f] px-3 py-1 text-[11px] font-black tracking-[0.14em] text-[#e8c877] sm:text-xs"
            style={{ background: "rgba(0,0,0,0.35)" }}
          >
            {pill}
          </span>
          <p
            className="text-xl font-black leading-tight sm:text-3xl"
            style={{ color: "#e8c877", textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
          >
            {heading}
          </p>
          <p className="text-[13px] font-bold leading-snug text-[#f4ecdd] sm:text-base">{sub}</p>
          {state.phase === "countdown" ? (
            <p className="text-[11px] font-semibold text-[#bfa877] sm:text-xs">Live daily on Bible Buddy</p>
          ) : null}
          {participants !== null && !joined ? (
            <p className="text-[11px] font-semibold text-[#bfa877] sm:text-xs">
              {participants} Bible Buddies have joined
            </p>
          ) : null}
          <span
            className="mt-1.5 w-fit rounded-lg px-4 py-2 text-[12px] font-black tracking-wide text-[#221503] sm:px-5 sm:text-sm"
            style={{ background: "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)" }}
          >
            {cta}
          </span>
        </div>
      </div>
    </Link>
  );
}
