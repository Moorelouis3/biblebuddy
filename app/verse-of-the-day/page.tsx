"use client";

import { useState } from "react";
import Link from "next/link";
import { ModalShell } from "../../components/ModalShell";
import { LouisAvatar } from "../../components/LouisAvatar";
import { getVerseOfTheDay } from "../../lib/verseOfTheDay";

export default function VerseOfTheDayPage() {
  const [showExplanation, setShowExplanation] = useState(false);
  const verse = getVerseOfTheDay();

  return (
    <>
      <ModalShell isOpen={true} backdropColor="bg-black/45" scrollable={true}>
        <div className="my-8 w-full max-w-xl overflow-hidden rounded-[32px] border border-[#d9e7ff] bg-white shadow-2xl">
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

          <div className="bg-white px-6 pb-6 pt-5 sm:px-8">
            <button
              type="button"
              onClick={() => setShowExplanation(true)}
              className="w-full rounded-2xl bg-[#3f6fb2] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#335f9a]"
            >
              Read the Explanation
            </button>
            <Link
              href="/dashboard"
              className="mt-3 block w-full rounded-2xl border border-[#d4e2fb] px-4 py-3 text-center text-sm font-semibold text-[#456ba6] transition hover:bg-[#f6f9ff]"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={showExplanation}
        onClose={() => setShowExplanation(false)}
        backdropColor="bg-black/50"
        scrollable={true}
        zIndex="z-[90]"
      >
        <div className="my-8 w-full max-w-2xl overflow-hidden rounded-[32px] border border-[#d9e7ff] bg-white shadow-2xl">
          <div className="flex items-start justify-between border-b border-[#e7eefc] bg-[#f7faff] px-6 py-5 sm:px-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6786ba]">Explanation</p>
              <h1 className="mt-2 text-2xl font-bold text-[#17335f]">{verse.reference}</h1>
            </div>
            <button
              type="button"
              onClick={() => setShowExplanation(false)}
              className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#5f7fb4] shadow-sm transition hover:text-[#355b97]"
            >
              Close
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto px-6 py-6 sm:px-8">
            <div className="mb-6 rounded-[24px] border border-[#e5ecfb] bg-[#fbfdff] px-5 py-5">
              <p className="text-lg italic leading-8 text-[#29446f]">"{verse.text}"</p>
              <p className="mt-3 text-sm font-semibold text-[#5377b1]">{verse.subtitle}</p>
            </div>

            <div className="space-y-5">
              {verse.explanationSections.map((section) => (
                <div key={section.heading} className="rounded-[24px] border border-[#edf2fc] bg-white px-5 py-5 shadow-sm">
                  <h2 className="mb-2 text-lg font-bold text-[#2d4a79]">{section.heading}</h2>
                  <p className="text-sm leading-7 text-gray-700">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModalShell>
    </>
  );
}
