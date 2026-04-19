"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ModalShell } from "./ModalShell";
import { logActionToMasterActions } from "../lib/actionRecorder";
import { getVerseIntro, getVerseOfTheDay } from "../lib/verseOfTheDay";
import { supabase } from "../lib/supabaseClient";

const LOUIS_AVATAR_SRC = "/louis/louis-bible.png";

export type DashboardDailyWelcomeModalProps = {
  open: boolean;
  onClose: () => void;
  isReturningUser: boolean;
  lastAction?: { action_type: string; action_label: string } | null;
  recommendation?: string | null;
  userId?: string | null;
};

export default function DashboardDailyWelcomeModal({ open, onClose, userId }: DashboardDailyWelcomeModalProps) {
  const router = useRouter();

  const handleAcknowledge = async (navigateToVerse?: boolean) => {
    const today = new Date().toISOString().slice(0, 10);

    if (userId) {
      const { error } = await supabase
        .from("profile_stats")
        .update({ verse_of_the_day_shown: today })
        .eq("user_id", userId);

      if (error) {
        await supabase.from("profile_stats").upsert(
          {
            user_id: userId,
            verse_of_the_day_shown: today,
          },
          { onConflict: "user_id" },
        );
      }
    }

    if (navigateToVerse && userId) {
      await logActionToMasterActions(userId, "understand_verse_of_the_day");
    }

    await onClose();

    if (navigateToVerse) {
      router.push("/verse-of-the-day");
    }
  };

  const verse = getVerseOfTheDay();
  const intro = getVerseIntro();

  return (
    <ModalShell isOpen={open} onClose={onClose} backdropColor="bg-black/45" scrollable={true}>
      <div className="relative my-8 w-full max-w-md overflow-hidden rounded-[30px] border border-[#d9e7ff] bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-xl text-[#7a97c7] transition hover:text-[#365b98]"
          aria-label="Close verse of the day"
        >
          x
        </button>

        <div className="bg-gradient-to-br from-[#eef5ff] via-[#f8fbff] to-[#e7f0ff] px-6 pb-6 pt-7 sm:px-8">
          <img
            src={LOUIS_AVATAR_SRC}
            alt="Louis avatar"
            width={72}
            height={72}
            className="mx-auto mb-4 rounded-full border border-[#d7e5ff] bg-white shadow-lg"
          />
          <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5d7fb7]">
            Verse of the Day
          </p>
          <div className="mb-4 text-center text-base font-medium text-[#15335f]">{intro}</div>

          <div className="rounded-[26px] border border-[#d9e7ff] bg-white/95 px-5 py-5 text-center shadow-sm">
            <div className="mb-3 text-xl font-bold italic leading-8 text-[#17335f]">"{verse.text}"</div>
            <div className="mb-1 text-sm font-semibold text-[#3e67a7]">{verse.reference}</div>
            <div className="text-xs text-[#6d86ad]">{verse.subtitle}</div>
          </div>
        </div>

        <div className="w-full bg-white px-6 pb-6 pt-5 sm:px-8">
          <button
            onClick={() => handleAcknowledge(true)}
            className="w-full rounded-2xl bg-[#3f6fb2] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#335f9a]"
          >
            Understand This Verse
          </button>
          <button
            onClick={() => handleAcknowledge(false)}
            className="mt-3 w-full bg-transparent p-0 text-sm text-[#4a72ad] hover:underline"
            style={{ background: "none", border: "none" }}
          >
            Skip Today's Verse
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
