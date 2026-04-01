"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LouisAvatar } from "@/components/LouisAvatar";
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

  const latestPlayedProgress = useMemo(() => {
    const played = book.chapters
      .map((chapter) => progress[getScrambledProgressKey(book.slug, chapter.chapter)])
      .filter((entry): entry is ScrambledChapterProgress => Boolean(entry?.lastPlayedAt))
      .sort((left, right) => new Date(right.lastPlayedAt).getTime() - new Date(left.lastPlayedAt).getTime());

    return played[0];
  }, [book, progress]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">The {book.name}</h1>
        <p className="text-gray-700 mb-4">{book.shortLabel}</p>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 relative overflow-hidden">
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="bible" size={48} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800 w-full">
              <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
              <div className="space-y-3">
                <p>{book.louisIntro}</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress in {book.name} Scrambled</span>
              <span>
                {completedCount === 0 ? "0" : Math.round((completedCount / book.chapters.length) * 100)}% ({completedCount} / {" "}
                {book.chapters.length} chapters completed)
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${(completedCount / book.chapters.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-4 mt-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {book.chapters.map((chapter) => {
                const chapterProgress = progress[getScrambledProgressKey(book.slug, chapter.chapter)];
                const bestScore = chapterProgress?.bestScore ?? 0;
                const done = !!chapterProgress?.completed;
                const cardClasses = done
                  ? "bg-green-100 border-green-300 text-green-800 cursor-pointer"
                  : "bg-gray-100 border-gray-300 text-gray-500 cursor-pointer";

                return (
                  <Link
                    key={chapter.chapter}
                    href={`/bible-study-games/scrambled/${book.slug}/${chapter.chapter}`}
                    className={`relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm block ${cardClasses}`}
                  >
                    <p className="font-semibold">{book.name} {chapter.chapter}</p>
                    <p className="text-[11px] mt-1">
                      {done
                        ? `Finished - best score ${bestScore}/${chapter.questions.length}`
                        : `${chapter.questions.length} words in this chapter.`}
                    </p>
                  </Link>
                );
              })}
            </div>

            <div className="mt-2 flex items-center justify-between text-xs sm:text-sm text-blue-600">
              <Link href="/bible-study-games/scrambled" className="hover:underline">
                Change category
              </Link>
              <Link href="/dashboard" className="hover:underline">
                Home
              </Link>
              <span className="text-gray-500">{completedCount} chapters completed</span>
            </div>

            <p className="text-xs text-gray-500">
              {completedCount > 0
                ? formatLastPlayed(latestPlayedProgress)
                : "Start with Genesis 1 and work forward chapter by chapter."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
