"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { bibleLockStatus } from "@/lib/bibleLock";
import { bibleYearDayHref, fetchBibleYearPosition } from "@/lib/bibleYearProgress";
import { BIBLE_GAME_BOOKS } from "@/lib/bibleStudyGameCatalog";
import {
  fetchLibraryStudies,
  fetchProgressByStudy,
  withTotals,
  type StudyProgress,
} from "@/lib/libraryCatalog";

/**
 * What to do to get your apps back (Louis, 2026-10-23: "tapping Tasks on the
 * locked screen just takes me to the dashboard").
 *
 * The strip said "Pick a task" and then dropped people on the home screen to
 * find one for themselves, which on a shielded phone is the moment they give
 * up. This is the short list instead, and every card opens the real thing at
 * the place they left it - their next plan day, their devotional's next page,
 * trivia for the book they are reading, the note editor.
 *
 * Nothing here unlocks anything. Opening a page is not finishing one; the
 * shield lifts from the completion event the activity itself records, which is
 * what BibleLockWatcher watches for. A card that unlocked on tap would make
 * the whole feature theatre.
 *
 * Nothing here is a second copy of a feature either - every href is an
 * existing screen, reached with the same helpers the dashboard uses.
 */

type Task = {
  key: string;
  icon: string;
  title: string;
  /** What this card will actually open, in words. */
  detail: string;
  href: string;
  /** False when there is nothing to continue: the card says so and offers the way in. */
  ready: boolean;
};

const LOADING: Task[] = [
  { key: "trivia", icon: "🎯", title: "Bible Trivia", detail: "Finding your next game…", href: "/bible-trivia", ready: true },
  { key: "devotional", icon: "📖", title: "Continue Devotional", detail: "Finding your place…", href: "/plan?view=bible_studies", ready: true },
  { key: "reading", icon: "📅", title: "Continue Bible Reading", detail: "Finding your place…", href: "/reading", ready: true },
  { key: "notes", icon: "✍🏾", title: "Write Bible Notes", detail: "Write what today's passage gave you", href: "/notes/grow", ready: true },
];

export default function BibleLockTasks() {
  const [tasks, setTasks] = useState<Task[]>(LOADING);
  const [locked, setLocked] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      // The headline depends on whether the apps are actually shielded right
      // now, and that answer comes from the device, never from a guess.
      void bibleLockStatus().then((status) => {
        if (!cancelled) setLocked(status.supported ? status.locked : null);
      });

      const { data } = await supabase.auth.getUser();
      const userId = data.user?.id ?? null;
      if (cancelled) return;

      const [position, studies, progress, lastRead, plan] = await Promise.all([
        fetchBibleYearPosition(userId),
        fetchLibraryStudies(),
        userId
          ? fetchProgressByStudy(userId)
          : Promise.resolve({} as Record<string, StudyProgress>),
        userId
          ? supabase
              .from("completed_chapters")
              .select("book, completed_at")
              .eq("user_id", userId)
              .order("completed_at", { ascending: false })
              .limit(1)
              .maybeSingle()
          : Promise.resolve({ data: null }),
        userId
          ? supabase
              .from("profile_stats")
              .select("louis_primary_devotional_id")
              .eq("user_id", userId)
              .maybeSingle()
          : Promise.resolve({ data: null }),
      ]);
      if (cancelled) return;

      // Trivia for the book they were last reading, which is the only "next
      // game" this app actually has a notion of. Anything else would be a new
      // progress system for one card.
      const lastBook = (lastRead?.data as { book?: string } | null)?.book?.toLowerCase() ?? null;
      const triviaBook = lastBook
        ? BIBLE_GAME_BOOKS.find((book) => book.title.toLowerCase() === lastBook)
        : undefined;

      // The devotional they chose, if they have started it; otherwise the one
      // they have touched most recently. A study nobody has opened has no
      // "next page" to continue to.
      const preferredId = (plan?.data as { louis_primary_devotional_id?: string | null } | null)
        ?.louis_primary_devotional_id;
      const started = studies
        .map((study) => ({ study, progress: withTotals(progress[study.id], study.total_days) }))
        .filter((row) => row.progress.completedDays > 0 && !row.progress.isComplete)
        .sort((a, b) => {
          if (a.study.id === preferredId) return -1;
          if (b.study.id === preferredId) return 1;
          return (b.progress.lastActivityAt || "").localeCompare(a.progress.lastActivityAt || "");
        });
      const devotional = started[0] ?? null;

      setTasks([
        {
          key: "trivia",
          icon: "🎯",
          title: "Bible Trivia",
          detail: triviaBook ? `Questions on ${triviaBook.title}` : "Pick a book and play a round",
          href: triviaBook?.triviaHref ?? "/bible-trivia",
          ready: true,
        },
        {
          key: "devotional",
          icon: "📖",
          title: "Continue Devotional",
          detail: devotional
            ? `${devotional.study.title} · Day ${devotional.progress.nextDay}`
            : "No devotional started yet",
          href: devotional
            ? `/devotionals/${devotional.study.id}/day/${devotional.progress.nextDay}`
            : "/plan?view=bible_studies",
          ready: Boolean(devotional),
        },
        {
          key: "reading",
          icon: "📅",
          title: "Continue Bible Reading",
          detail: position.planFinished
            ? "Plan finished — open the Bible and read a chapter"
            : position.planDay
              ? `Bible in One Year · Day ${position.planDay}`
              : "Open the Bible and finish a chapter",
          href:
            position.planDay && !position.planFinished ? bibleYearDayHref(position.planDay) : "/reading",
          ready: true,
        },
        {
          key: "notes",
          icon: "✍🏾",
          title: "Write Bible Notes",
          detail: "Write what today's passage gave you",
          href: "/notes/grow",
          ready: true,
        },
      ]);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-black text-[var(--bb-text-secondary,#5f6368)] hover:text-[var(--bb-accent,#2f7fe8)]"
      >
        ← Home
      </Link>

      <header className="mt-5 text-center">
        <span aria-hidden className="text-4xl">
          {locked === false ? "🔓" : "🔒"}
        </span>
        <h1 className="mt-2 text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
          {locked === false ? "Your apps are open" : "Complete a Bible activity to unlock your apps"}
        </h1>
        <p className="mt-2 text-[15px] font-semibold leading-relaxed text-[var(--bb-text-secondary,#5f6368)]">
          {locked === false
            ? "Nothing is shielded right now. These are here whenever you want them."
            : "Finish any one of these and the apps you chose come straight back."}
        </p>
      </header>

      <ul className="mt-6 space-y-3">
        {tasks.map((task) => (
          <li key={task.key}>
            <Link
              href={task.href}
              className={`flex items-center gap-3.5 rounded-3xl border px-4 py-4 transition ${
                task.ready
                  ? "border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] hover:border-[var(--bb-accent,#2f7fe8)] hover:bg-[var(--bb-surface-soft,#f5f9ff)]"
                  : "border-dashed border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f7faff)]"
              }`}
            >
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--bb-accent-soft,#eaf1fd)] text-xl"
              >
                {task.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-black text-[var(--bb-text-primary,#111827)]">
                  {task.title}
                </span>
                <span className="mt-0.5 block truncate text-[13px] font-semibold text-[var(--bb-text-secondary,#5f6368)]">
                  {task.detail}
                </span>
              </span>
              <span
                aria-hidden
                className="shrink-0 text-sm font-black text-[var(--bb-accent,#2f7fe8)]"
              >
                {task.ready ? "→" : "Start"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-center text-[13px] font-semibold leading-relaxed text-[var(--bb-text-muted,#6b7280)]">
        Opening one of these does not unlock anything on its own — finish it and the apps come back.
      </p>

      <p className="mt-4 text-center">
        <Link
          href="/bible-lock"
          className="text-sm font-black text-[var(--bb-text-secondary,#5f6368)] underline-offset-2 hover:text-[var(--bb-accent,#2f7fe8)] hover:underline"
        >
          How Bible Lock works
        </Link>
      </p>
    </div>
  );
}
