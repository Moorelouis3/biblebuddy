"use client";

/**
 * /verse-of-the-day now forwards to today's dated entry
 * (/verse-of-the-day/YYYY-MM-DD) so old links land on the new breakdown
 * system. If today has no approved entry, the legacy deterministic verse
 * view renders instead - this page never dead-ends.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ModalShell } from "../../components/ModalShell";
import { LouisAvatar } from "../../components/LouisAvatar";
import { getVerseOfTheDay } from "../../lib/verseOfTheDay";
import { fetchVotdEntryByDate, getVotdLocalDayKey } from "../../lib/verseOfTheDayContent";

export default function VerseOfTheDayPage() {
  const router = useRouter();
  const [useLegacy, setUseLegacy] = useState(false);
  const verse = getVerseOfTheDay();

  useEffect(() => {
    const todayKey = getVotdLocalDayKey();
    void fetchVotdEntryByDate(todayKey).then((entry) => {
      if (entry) {
        router.replace(`/verse-of-the-day/${todayKey}`);
      } else {
        setUseLegacy(true);
      }
    });
  }, [router]);

  if (!useLegacy) return null;

  return (
    <ModalShell isOpen={true} backdropColor="bg-black/45" scrollable={true}>
      <div className="my-8 w-full max-w-2xl overflow-hidden rounded-[32px] border border-[#d9e7ff] bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#eef5ff] via-[#f7fbff] to-[#e8f0ff] px-6 pb-7 pt-8 sm:px-8">
          <div className="mb-4 flex justify-center">
            <LouisAvatar mood="bible" size={72} />
          </div>
          <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5d7fb7]">
            Verse of the Day
          </p>
          <div className="rounded-[28px] border border-[#d9e7ff] bg-white px-6 py-6 text-center shadow-sm">
            <div className="mb-4 text-2xl font-bold italic leading-9 text-[#17335f]">"{verse.text}"</div>
            <div className="mb-1 text-base font-semibold text-[#3e67a7]">{verse.reference}</div>
            <div className="text-sm text-[#6d86ad]">{verse.subtitle}</div>
          </div>
        </div>

        {/* Explanation sections — shown directly, no extra click needed */}
        <div className="px-6 pb-2 pt-6 sm:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6786ba]">Explanation</p>
          <div className="space-y-4">
            {verse.explanationSections.map((section) => (
              <div
                key={section.heading}
                className="rounded-[24px] border border-[#edf2fc] bg-[#fbfdff] px-5 py-5 shadow-sm"
              >
                <h2 className="mb-2 text-base font-bold text-[#2d4a79]">{section.heading}</h2>
                <p className="text-sm leading-7 text-gray-700">{section.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-6 pb-6 pt-5 sm:px-8">
          <Link
            href="/dashboard"
            className="block w-full rounded-2xl border border-[#d4e2fb] px-4 py-3 text-center text-sm font-semibold text-[#456ba6] transition hover:bg-[#f6f9ff]"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </ModalShell>
  );
}
