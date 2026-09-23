"use client";

/**
 * "Today's Community Study" on the Home screen (2026-09-23, Louis).
 *
 * Members of a live community event should not have to open the group or the
 * event page to find out that Day 23 is ready. This puts the same Today card
 * high on Home for members only, and only while the event is running. It
 * renders nothing before the event starts, after it ends, or for anyone who
 * has not joined - the recruiting banner further down already covers them.
 */

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { getActiveCommunityEvent, getCommunityEventState } from "../../lib/communityEvents";
import EventTodayCard from "./EventTodayCard";
import { useEventProgress } from "./useEventProgress";

export default function HomeStudyToday({ userId }: { userId?: string | null }) {
  const event = getActiveCommunityEvent();
  const state = useMemo(() => (event ? getCommunityEventState(event) : null), [event]);
  // ?previewDay=N renders it as if that day were today, for checking before Oct 1.
  const [previewDay, setPreviewDay] = useState<number | null>(null);
  useEffect(() => {
    const raw = Number(new URLSearchParams(window.location.search).get("previewDay"));
    if (raw > 0 && event && raw <= event.totalDays) setPreviewDay(raw);
  }, [event]);
  const live = state?.phase === "live" || previewDay !== null;
  const day = state?.phase === "live" ? state.communityDay : previewDay;

  const [joined, setJoined] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!event || !userId || !live) {
      setChecked(true);
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const { data } = await supabase
          .from("community_event_members")
          .select("user_id")
          .eq("event_slug", event.slug)
          .eq("user_id", userId)
          .maybeSingle();
        if (!cancelled) setJoined(Boolean(data));
      } catch {
        /* the rest of Home still renders */
      } finally {
        if (!cancelled) setChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [event, userId, live]);

  const { completedDays } = useEventProgress(event?.devotionalId, userId, joined && live);

  if (!event || !live || !day || !joined || !checked) return null;

  return (
    <section aria-labelledby="home-today-study-heading">
      <h2
        id="home-today-study-heading"
        className="mb-2 text-xs font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]"
      >
        Today&apos;s Community Study
      </h2>
      <EventTodayCard event={event} day={day} completedToday={completedDays.has(day)} />
    </section>
  );
}
