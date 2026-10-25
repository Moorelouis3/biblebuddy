"use client";

/**
 * The "Today" card on the event page while the event is live: which
 * community day it is, that day's devotional title, the study button, and
 * who has already answered today's question (only once the daily cron has
 * actually posted the day).
 *
 * THE DISCUSSION IS THE REASON TO BE IN A COMMUNITY STUDY (Louis, 2026-10-25).
 * It used to end in a bare "Join today's discussion →" pointing at the feed:
 * a reader had no idea whether anybody was in there, and arriving at the feed
 * still left them hunting for the thread. Proverbs bears that out - 187
 * answers from 38 people, decaying from 25 on day one to about 4 - so the
 * answers exist and nothing on the way in says so.
 *
 * Now the card shows the faces and the count, and the link lands on the day's
 * Discussion task already open, so seeing that six people answered and
 * answering yourself is one move instead of three.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import type { CommunityEvent } from "../../lib/communityEvents";
import { eventDayStudyPath, getEventDayPost } from "../../lib/communityEventDays";
import { getEventDayAnswers, type DayAnswerFace } from "../../lib/eventDiscussion";

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
  const [hasDiscussion, setHasDiscussion] = useState(false);
  const [answers, setAnswers] = useState<{ count: number; faces: DayAnswerFace[] }>({ count: 0, faces: [] });

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
      setHasDiscussion(Boolean(post));
      setLoadedFor(day);

      // Second pass on purpose: the count needs the post id, and the card
      // should not wait on it before showing the day and the button.
      if (!post) {
        setAnswers({ count: 0, faces: [] });
        return;
      }
      const loaded = await getEventDayAnswers(supabase, post.group_post_id);
      if (!cancelled) setAnswers(loaded);
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
        {/* The day's own title is right below, so this stays study-agnostic -
            it used to add "— PROVERBS {day}", which only held for October. */}
        DAY {day} OF {event.totalDays}
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

      {ready && hasDiscussion ? (
        <Link
          href={`${eventDayStudyPath(event.devotionalId, day)}?task=discussion`}
          className="mt-4 flex items-center justify-center gap-2 text-sm font-black"
          style={{ color: palette.link }}
        >
          {answers.faces.length > 0 ? (
            <span className="flex shrink-0 items-center" aria-hidden="true">
              {answers.faces.map((face, index) => (
                <span
                  key={face.user_id}
                  className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border-2 text-[10px] font-black uppercase"
                  style={{
                    borderColor: palette.border,
                    background: palette.skeleton,
                    color: palette.eyebrow,
                    marginLeft: index === 0 ? 0 : -10,
                    zIndex: answers.faces.length - index,
                  }}
                >
                  {face.profile_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={face.profile_image_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    face.display_name.trim().charAt(0) || "B"
                  )}
                </span>
              ))}
            </span>
          ) : null}
          <span className="underline underline-offset-4">
            {answers.count === 0
              ? "Be the first to answer today →"
              : answers.count === 1
                ? "1 person answered today →"
                : `${answers.count} people answered today →`}
          </span>
        </Link>
      ) : null}
    </section>
  );
}
