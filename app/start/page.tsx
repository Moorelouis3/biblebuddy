"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ensureGuestSession } from "@/lib/guestSession";

/**
 * "How would you like to read the Bible?"
 *
 * The single screen a new user sees between clicking Start Studying Now and
 * actually studying. It replaces the 10-step first-login onboarding, which
 * mostly repeated the landing page and collected three fields the app never
 * read back.
 *
 * The one question asked here does something: it routes them.
 */

type StudyChoice = {
  mode: string;
  emoji: string;
  title: string;
  blurb: string;
  detail: string;
  href: string;
};

const CHOICES: StudyChoice[] = [
  {
    mode: "devotional",
    emoji: "📖",
    title: "A devotional",
    blurb: "Short daily studies on one theme",
    detail:
      "Pick from studies on temptation, the women of the Bible, Proverbs, Job, David, Moses and more. Usually 21 days, about 10 minutes each.",
    href: "/devotionals",
  },
  {
    mode: "bible_year",
    emoji: "📅",
    title: "The Bible in One Year",
    blurb: "Read the whole Bible, one day at a time",
    detail:
      "A guided day-by-day journey with audio, study notes, trivia and reflection. Start at Day 1 and go at your own pace.",
    href: "/dashboard?view=bible-year&day=1",
  },
  {
    mode: "bible",
    emoji: "✝️",
    title: "Just the Bible",
    blurb: "Pick a book and start reading",
    detail:
      "Go straight to any book and chapter, with study notes explaining what you are reading as you go.",
    href: "/bible",
  },
];

export default function StartPage() {
  const router = useRouter();
  const [choosing, setChoosing] = useState<string | null>(null);

  // Someone may land here directly from a shared link with no session.
  useEffect(() => {
    void ensureGuestSession({ source: "start_chooser" });
  }, []);

  async function choose(choice: StudyChoice) {
    if (choosing) return;
    setChoosing(choice.mode);

    try {
      const guest = await ensureGuestSession({ source: "start_chooser" });

      if (guest.ok) {
        const nowIso = new Date().toISOString();
        const today = new Date();
        const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        // bible_year_started_at / launch_seen_at are set for every mode, not just
        // Bible in One Year: AppShell treats their absence as "needs onboarding"
        // and would show the first-login modal on the next page.
        const payload = {
          user_id: guest.userId,
          preferred_study_mode: choice.mode,
          onboarding_completed: true,
          bible_year_started_at: todayKey,
          bible_year_launch_seen_at: nowIso,
        };

        const { error } = await supabase
          .from("profile_stats")
          .upsert(payload, { onConflict: "user_id" });

        if (error) {
          // Any failure here is cosmetic — never block someone from studying.
          console.error("[START] Could not save study mode:", error.message);
          await supabase
            .from("profile_stats")
            .upsert(
              { user_id: guest.userId, onboarding_completed: true },
              { onConflict: "user_id" },
            );
        }
      }
    } catch (err) {
      console.error("[START] Could not set up journey:", err);
    }

    // Full reload so AppShell boots with the chosen mode already saved.
    window.location.href = choice.href;
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <div className="text-center">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0056FD]">
          Welcome to Bible Buddy
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">
          How would you like to read the Bible?
        </h1>
        <p className="mx-auto mt-4 max-w-[480px] text-base font-semibold leading-7 text-gray-600">
          Pick whichever sounds right. You can change this any time, and you can
          do all three.
        </p>
      </div>

      <div className="mt-9 space-y-4">
        {CHOICES.map((choice) => (
          <button
            key={choice.mode}
            type="button"
            onClick={() => void choose(choice)}
            disabled={choosing !== null}
            className="group w-full rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#0056FD] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:p-6"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl leading-none" aria-hidden="true">
                {choice.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-black text-gray-950 sm:text-xl">
                  {choosing === choice.mode ? "Starting..." : choice.title}
                </h2>
                <p className="mt-1 text-sm font-bold text-[#0056FD]">{choice.blurb}</p>
                <p className="mt-2 text-sm font-medium leading-6 text-gray-600">
                  {choice.detail}
                </p>
              </div>
              <span
                className="mt-1 shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#0056FD]"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-8 text-center text-xs font-bold text-gray-500">
        Bible Buddy is completely free. No account needed to start.
      </p>
    </div>
  );
}
