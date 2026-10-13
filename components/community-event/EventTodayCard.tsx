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

  // Done days go green (2026-09-23, Louis): the day number never changes, so
  // the colour is what tells you at a glance whether today still needs doing.
  const palette = completedToday
    ? {
        background: "linear-gradient(180deg, #123020 0%, #081409 100%)",
        border: "#2f7a4a",
        eyebrow: "#8fdcab",
        dayLine: "#b6f0ca",
        title: "#e7fbec",
        skeleton: "#14301f",
        button: "linear-gradient(180deg, #a7ecc0 0%, #46a86c 100%)",
        buttonText: "#07260f",
        link: "#8fdcab",
      }
    : {
        background: "linear-gradient(180deg, #17100a 0%, #0c0804 100%)",
        border: "#3a2c14",
        eyebrow: "#bfa877",
        dayLine: "#e8c877",
        title: "#f4ecdd",
        skeleton: "#2a1f10",
        button: "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)",
        buttonText: "#221503",
        link: "#e8c877",
      };

  return (
    <section
      className="rounded-2xl border p-5 text-center transition-colors"
      style={{ background: palette.background, borderColor: palette.border }}
      aria-label={`Day ${day} of ${event.totalDays}${completedToday ? ", completed" : ", not completed yet"}`}
    >
      <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: palette.eyebrow }}>
        {completedToday ? "✓ Completed" : "Today"}
      </p>
      <p className="mt-1 text-sm font-black tracking-widest" style={{ color: palette.dayLine }}>
        DAY {day} OF {event.totalDays} — PROVERBS {day}
      </p>
      {ready && dayTitle ? (
        <h2 className="mt-2 text-xl font-black leading-tight" style={{ color: palette.title }}>
          {dayTitle}
        </h2>
      ) : !ready ? (
        <div className="mx-auto mt-3 h-5 w-2/3 animate-pulse rounded" style={{ background: palette.skeleton }} aria-hidden="true" />
      ) : null}
      <p className="mt-2 text-xs font-bold" style={{ color: palette.eyebrow }}>
        {completedToday ? `Day ${day} done — well done!` : "Not done yet"}
      </p>

      <Link
        href={eventDayStudyPath(event.devotionalId, day)}
        className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl px-5 text-sm font-black tracking-wide transition hover:brightness-95"
        style={{ background: palette.button, color: palette.buttonText }}
      >
        {completedToday ? "REVISIT TODAY'S STUDY" : "OPEN TODAY'S STUDY"}
      </Link>

      {ready && discussionHref ? (
        <Link
          href={discussionHref}
          className="mt-3 inline-block text-sm font-black underline underline-offset-4"
          style={{ color: palette.link }}
        >
          Join today&apos;s discussion →
        </Link>
      ) : null}
    </section>
  );
}
