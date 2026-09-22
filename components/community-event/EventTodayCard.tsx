"use client";

/**
 * The "Today" card on the event page while the event is live: which
 * community day it is, that day's devotional title, the study button, and
 * the link to that day's discussion post in the Bible Buddy group (only once
 * the daily cron has actually posted it).
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import type { CommunityEvent } from "../../lib/communityEvents";
import { eventDayDiscussionPath, eventDayStudyPath, getEventDayPost } from "../../lib/communityEventDays";

export default function EventTodayCard({
  event,
  day,
  completedToday = false,
}: {
  event: CommunityEvent;
  day: number;
  completedToday?: boolean;
}) {
  const [loadedFor, setLoadedFor] = useState<number | null>(null);
  const [dayTitle, setDayTitle] = useState<string | null>(null);
  const [discussionHref, setDiscussionHref] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const loadTitle = async () => {
        try {
          const { data } = await supabase
            .from("devotional_days")
            .select("day_title")
            .eq("devotional_id", event.devotionalId)
            .eq("day_number", day)
            .maybeSingle();
          return (data as { day_title?: string | null } | null)?.day_title?.trim() || null;
        } catch {
          return null;
        }
      };
      const [title, post] = await Promise.all([
        loadTitle(),
        getEventDayPost(supabase, event.slug, day).catch(() => null),
      ]);
      if (cancelled) return;
      setDayTitle(title);
      setDiscussionHref(post ? eventDayDiscussionPath(post.group_id, post.group_post_id) : null);
      setLoadedFor(day);
    })();
    return () => {
      cancelled = true;
    };
  }, [event.devotionalId, event.slug, day]);

  const ready = loadedFor === day;

  return (
    <section
      className="rounded-2xl border border-[#3a2c14] p-5 text-center"
      style={{ background: "linear-gradient(180deg, #17100a 0%, #0c0804 100%)" }}
      aria-label={`Today: day ${day} of ${event.totalDays}`}
    >
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#bfa877]">Today</p>
      <p className="mt-1 text-sm font-black tracking-widest text-[#e8c877]">
        DAY {day} OF {event.totalDays} — PROVERBS {day}
      </p>
      {ready && dayTitle ? (
        <h2 className="mt-2 text-xl font-black leading-tight" style={{ color: "#f4ecdd" }}>
          {dayTitle}
        </h2>
      ) : !ready ? (
        <div className="mx-auto mt-3 h-5 w-2/3 animate-pulse rounded bg-[#2a1f10]" aria-hidden="true" />
      ) : null}
      {completedToday ? (
        <p className="mt-2 text-xs font-bold text-[#bfa877]">✓ You finished today&apos;s study</p>
      ) : null}

      <Link
        href={eventDayStudyPath(event.devotionalId, day)}
        className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl px-5 text-sm font-black tracking-wide text-[#221503] transition hover:brightness-95"
        style={{ background: "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)" }}
      >
        {completedToday ? "REVISIT TODAY'S STUDY" : "OPEN TODAY'S STUDY"}
      </Link>

      {ready && discussionHref ? (
        <Link
          href={discussionHref}
          className="mt-3 inline-block text-sm font-black text-[#e8c877] underline underline-offset-4"
        >
          Join today&apos;s discussion →
        </Link>
      ) : null}
    </section>
  );
}
