"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  SCRAMBLED_PROGRESS_STORAGE_KEY,
  type ScrambledBookPack,
  type ScrambledChapterProgress,
  type ScrambledProgressMap,
  getScrambledProgressKey,
} from "@/lib/scrambledGameData";

function readProgress(): ScrambledProgressMap {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(SCRAMBLED_PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ScrambledProgressMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function formatLastPlayed(progress?: ScrambledChapterProgress) {
  if (!progress?.lastPlayedAt) return "Not played yet";

  const date = new Date(progress.lastPlayedAt);
  if (Number.isNaN(date.getTime())) return "Played recently";

  return `Last played ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

export default function ScrambledBookClient({ book }: { book: ScrambledBookPack }) {
  const [progress, setProgress] = useState<ScrambledProgressMap>({});

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  const completedCount = useMemo(
    () => book.chapters.filter((chapter) => progress[getScrambledProgressKey(book.slug, chapter.chapter)]?.completed).length,
    [book, progress],
  );

  return (
    <div className="min-h-screen bg-[#f7f7f4] pb-14">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[#eadfcf] bg-[#fff8ef] p-6 shadow-sm sm:p-8">
          <Link href="/bible-study-games/scrambled" className="text-sm font-semibold text-[#8d5f2d] hover:text-[#6d461d]">
            &lt;- Back to Scrambled
          </Link>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b37839]">Book Test Pack</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{book.name}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-[15px]">{book.shortDescription}</p>
            </div>
            <div className="rounded-2xl border border-[#f1d9b6] bg-[#fff7ea] px-4 py-3 text-sm text-[#8d5f2d] shadow-sm">
              <p className="font-semibold">{completedCount} / {book.chapters.length} chapters completed</p>
              <p className="mt-1 text-[#9d7445]">10 scrambled KJV words per chapter</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {book.chapters.map((chapter) => {
            const chapterProgress = progress[getScrambledProgressKey(book.slug, chapter.chapter)];
            const bestScore = chapterProgress?.bestScore ?? 0;

            return (
              <Link
                key={chapter.chapter}
                href={`/bible-study-games/scrambled/${book.slug}/${chapter.chapter}`}
                className={`rounded-[26px] border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${book.accentClassName}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a05e43]">Chapter {chapter.chapter}</p>
                    <h2 className="mt-2 text-2xl font-bold text-gray-900">{book.name} {chapter.chapter}</h2>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${chapterProgress?.completed ? "bg-[#dcf5e3] text-[#256447]" : "bg-white/80 text-gray-600"}`}
                  >
                    {chapterProgress?.completed ? "Completed" : "Ready"}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-gray-600">{chapter.description}</p>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">Best score: {bestScore} / {chapter.questions.length}</p>
                    <p className="mt-1 text-gray-500">{formatLastPlayed(chapterProgress)}</p>
                  </div>
                  <span className="font-semibold text-[#8d5f2d]">Play -&gt;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
