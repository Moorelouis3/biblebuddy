"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ModalShell } from "./ModalShell";
import { LouisAvatar } from "./LouisAvatar";
import { getBibleBuddyLocalDayKey } from "../lib/louisDailyFlow";
import { getVerseOfTheDay } from "../lib/verseOfTheDay";
import { supabase } from "../lib/supabaseClient";

export type DashboardDailyWelcomeModalProps = {
  open: boolean;
  onClose: () => void;
  isReturningUser: boolean;
  lastAction?: { action_type: string; action_label: string } | null;
  recommendation?: string | null;
  userId?: string | null;
};

export default function DashboardDailyWelcomeModal({ open, onClose, userId }: DashboardDailyWelcomeModalProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (open) {
      setShowExplanation(false);
    }
  }, [open]);

  const handleAcknowledge = async () => {
    const today = getBibleBuddyLocalDayKey();

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

    await onClose();
  };

  const verse = getVerseOfTheDay();
  const explanationBlocks = useMemo(
    () =>
      verse.explanationSections
        .map((section) => section.body.trim())
        .filter(Boolean)
        .flatMap((body) =>
          body
            .replace(/[–—]/g, ", ")
            .replace(/\s+/g, " ")
            .split(/(?<=[.!?])\s+/)
            .reduce<string[]>((chunks, sentence, index) => {
              const cleanSentence = sentence.trim();
              if (!cleanSentence) return chunks;
              if (index % 2 === 0) {
                chunks.push(cleanSentence);
              } else {
                chunks[chunks.length - 1] = `${chunks[chunks.length - 1]} ${cleanSentence}`.trim();
              }
              return chunks;
            }, [])
            .map((block) => block.trim())
            .filter(Boolean),
        ),
    [verse],
  );

  return (
    <ModalShell isOpen={open} onClose={handleAcknowledge} backdropColor="bg-black/45" scrollable={true}>
      <div className="relative my-8 w-full max-w-md overflow-hidden rounded-[30px] border border-[#d9e7ff] bg-white shadow-2xl">
        <button
          type="button"
          onClick={handleAcknowledge}
          className="absolute right-4 top-4 z-10 text-xl text-[#7a97c7] transition hover:text-[#365b98]"
          aria-label="Close verse of the day"
        >
          x
        </button>

        <div className="bg-gradient-to-br from-[#eef5ff] via-[#f8fbff] to-[#e7f0ff] px-6 pb-6 pt-7 sm:px-8">
          <div className="mx-auto mb-4 w-fit rounded-full border border-[#d7e5ff] bg-white shadow-lg">
            <LouisAvatar mood="wave" size={72} />
          </div>
          <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5d7fb7]">
            Verse of the Day
          </p>

          <div className="rounded-[26px] border border-[#d9e7ff] bg-white/95 px-5 py-5 text-center shadow-sm">
            <div className="mb-3 text-xl font-bold italic leading-8 text-[#17335f]">"{verse.text}"</div>
            <div className="mb-1 text-sm font-semibold text-[#3e67a7]">{verse.reference}</div>
            <div className="text-xs text-[#6d86ad]">{verse.subtitle}</div>
          </div>
        </div>

        <div className="w-full bg-white px-6 pb-6 pt-5 sm:px-8">
          {!showExplanation ? (
            <button
              type="button"
              onClick={() => setShowExplanation(true)}
              className="mb-4 w-full rounded-2xl border border-[#d9e7ff] bg-[#f5f9ff] px-4 py-3 text-center text-sm font-semibold text-[#3f6fb2] transition hover:bg-[#edf4ff]"
            >
              Do you want to understand this verse?
            </button>
          ) : (
            <div className="mb-4 rounded-[22px] border border-[#d9e7ff] bg-[#f8fbff] px-4 py-4">
              <p className="mb-3 text-sm font-semibold text-[#3e67a7]">Understanding this verse</p>
              <div className="space-y-3">
                {explanationBlocks.map((block, index) => (
                  <p key={`${verse.reference}-explanation-${index}`} className="text-sm leading-7 text-[#445b80]">
                    {block}
                  </p>
                ))}
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleAcknowledge}
            className="w-full rounded-2xl bg-[#3f6fb2] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#335f9a]"
          >
            Close
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
