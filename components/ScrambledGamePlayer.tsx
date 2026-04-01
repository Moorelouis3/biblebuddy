"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  SCRAMBLED_PROGRESS_STORAGE_KEY,
  type ScrambledChapterPack,
  type ScrambledProgressMap,
  getScrambledProgressKey,
} from "@/lib/scrambledGameData";

type LetterTile = {
  id: string;
  value: string;
};

function shuffleLetters(answer: string) {
  const letters = answer
    .toUpperCase()
    .split("")
    .map((value, index) => ({ id: `${value}-${index}-${Math.random().toString(36).slice(2, 8)}`, value }));

  for (let index = letters.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [letters[index], letters[swapIndex]] = [letters[swapIndex], letters[index]];
  }

  return letters;
}

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

function writeProgress(next: ScrambledProgressMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SCRAMBLED_PROGRESS_STORAGE_KEY, JSON.stringify(next));
}

function buildProgressPercent(currentIndex: number, total: number) {
  return Math.round(((currentIndex + 1) / total) * 100);
}

export default function ScrambledGamePlayer({
  bookName,
  bookSlug,
  chapter,
}: {
  bookName: string;
  bookSlug: string;
  chapter: ScrambledChapterPack;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bankLetters, setBankLetters] = useState<LetterTile[]>([]);
  const [answerLetters, setAnswerLetters] = useState<LetterTile[]>([]);
  const [solvedCount, setSolvedCount] = useState(0);
  const [status, setStatus] = useState<"idle" | "incorrect" | "correct">("idle");
  const [showResults, setShowResults] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);

  const question = chapter.questions[currentQuestionIndex];
  const chapterKey = getScrambledProgressKey(bookSlug, chapter.chapter);

  useEffect(() => {
    setBankLetters(shuffleLetters(question.answer));
    setAnswerLetters([]);
    setStatus("idle");
  }, [question]);

  useEffect(() => {
    setProgressLoaded(true);
  }, []);

  const resetAttempt = () => {
    setBankLetters(shuffleLetters(question.answer));
    setAnswerLetters([]);
    setStatus("idle");
  };

  const persistCompletion = (score: number) => {
    const current = readProgress();
    const previous = current[chapterKey];

    current[chapterKey] = {
      completed: true,
      bestScore: Math.max(previous?.bestScore ?? 0, score),
      lastPlayedAt: new Date().toISOString(),
    };

    writeProgress(current);
  };

  const moveToNext = () => {
    if (currentQuestionIndex === chapter.questions.length - 1) {
      persistCompletion(solvedCount);
      setShowResults(true);
      return;
    }

    setCurrentQuestionIndex((value) => value + 1);
  };

  const checkAnswer = (tiles: LetterTile[]) => {
    if (tiles.length !== question.answer.length) return;

    const guess = tiles.map((tile) => tile.value).join("").toLowerCase();
    if (guess === question.answer.toLowerCase()) {
      setSolvedCount((value) => value + 1);
      setStatus("correct");
      return;
    }

    setStatus("incorrect");
    window.setTimeout(() => {
      setBankLetters(shuffleLetters(question.answer));
      setAnswerLetters([]);
      setStatus("idle");
    }, 650);
  };

  const handleBankLetterClick = (tile: LetterTile) => {
    if (status === "correct") return;

    const nextBank = bankLetters.filter((entry) => entry.id !== tile.id);
    const nextAnswer = [...answerLetters, tile];
    setBankLetters(nextBank);
    setAnswerLetters(nextAnswer);
    checkAnswer(nextAnswer);
  };

  const handleAnswerLetterClick = (tile: LetterTile) => {
    if (status === "correct") return;

    setAnswerLetters((current) => current.filter((entry) => entry.id !== tile.id));
    setBankLetters((current) => [...current, tile]);
    setStatus("idle");
  };

  const encouragement =
    solvedCount === chapter.questions.length
      ? "Perfect chapter run."
      : solvedCount >= 8
        ? "Strong work. You really know this chapter."
        : solvedCount >= 5
          ? "Solid progress. The chapter is starting to stick."
          : "Good first pass. Play it again and the words will lock in faster.";

  if (!progressLoaded) {
    return (
      <div className="min-h-screen bg-[#f7f7f4] px-4 py-14 text-center text-sm text-gray-500">
        Loading Scrambled...
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#f7f7f4] px-4 py-10">
        <div className="mx-auto max-w-xl rounded-[30px] border border-[#eadfcf] bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b37839]">Chapter Complete</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">{bookName} {chapter.chapter}</h1>
          <p className="mt-3 text-sm leading-7 text-gray-600">You finished all 10 scrambled KJV word prompts from this chapter.</p>

          <div className="mt-8 rounded-[24px] border border-[#d8e8dc] bg-[#f3fbf5] px-6 py-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2f6b47]">Best score this run</p>
            <p className="mt-2 text-5xl font-bold text-[#1e5235]">{solvedCount} / {chapter.questions.length}</p>
            <p className="mt-3 text-sm text-[#37674b]">{encouragement}</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/bible-study-games/scrambled/${bookSlug}/${chapter.chapter}`}
              className="rounded-2xl bg-[#1f7a52] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#186341]"
            >
              Play Chapter Again
            </Link>
            <Link
              href={`/bible-study-games/scrambled/${bookSlug}`}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Back to Chapters
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/Bible/${bookSlug}/${chapter.chapter}`}
              className="rounded-2xl border border-[#edd7b2] bg-[#fff8ee] px-4 py-3 text-sm font-semibold text-[#8d5f2d] transition hover:bg-[#fff3e0]"
            >
              Read {bookName} {chapter.chapter}
            </Link>
            <Link
              href={`/notes?book=${bookSlug}&chapter=${chapter.chapter}`}
              className="rounded-2xl border border-[#e2daf4] bg-[#f7f3ff] px-4 py-3 text-sm font-semibold text-[#6d4cb3] transition hover:bg-[#efe8ff]"
            >
              Take Notes on This Chapter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f4] pb-14">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pt-8 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link href={`/bible-study-games/scrambled/${bookSlug}`} className="text-sm font-semibold text-[#8d5f2d] hover:text-[#6d461d]">
            &lt;- Back to Chapters
          </Link>
          <Link href={`/Bible/${bookSlug}/${chapter.chapter}`} className="text-sm font-semibold text-[#4768af] hover:text-[#35508a]">
            Read chapter
          </Link>
        </div>

        <div className="rounded-[28px] border border-[#eadfcf] bg-gradient-to-br from-[#fffaf2] via-white to-[#f8efe4] p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b37839]">Scrambled</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{bookName} {chapter.chapter}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">{chapter.description}</p>
            </div>
            <div className="rounded-2xl border border-[#f1d9b6] bg-[#fff7ea] px-4 py-3 text-sm text-[#8d5f2d] shadow-sm">
              <p className="font-semibold">Word {currentQuestionIndex + 1} of {chapter.questions.length}</p>
              <p className="mt-1">Solved this run: {solvedCount}</p>
            </div>
          </div>

          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#f0e1cb]">
            <div
              className="h-full rounded-full bg-[#cb8140] transition-all duration-300"
              style={{ width: `${buildProgressPercent(currentQuestionIndex, chapter.questions.length)}%` }}
            />
          </div>
        </div>

        <div className="rounded-[30px] border border-[#e6e7ea] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#f2f4f7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-600">
              {question.reference}
            </span>
            <span className="rounded-full bg-[#fff4ea] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#b36e28]">
              {question.difficulty}
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">Unscramble the KJV word</h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">{question.clue}</p>
          <p className="mt-3 rounded-2xl border border-[#e8edf5] bg-[#f7faff] px-4 py-3 text-sm italic text-[#4b6586]">
            "{question.sourceLine}"
          </p>

          <div className="mt-6 rounded-[26px] border border-dashed border-[#d7dce3] bg-[#fafbfc] p-4">
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {Array.from({ length: question.answer.length }).map((_, index) => {
                const tile = answerLetters[index];
                return (
                  <button
                    key={`${question.id}-slot-${index}`}
                    type="button"
                    onClick={() => tile && handleAnswerLetterClick(tile)}
                    className={`flex h-12 items-center justify-center rounded-2xl border text-lg font-bold uppercase transition ${tile ? "border-[#d5dbe5] bg-white text-gray-900 shadow-sm" : "border-[#e4e8ef] bg-[#f4f6f9] text-gray-300"}`}
                  >
                    {tile?.value ?? ""}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {bankLetters.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={() => handleBankLetterClick(tile)}
                className="flex h-12 min-w-12 items-center justify-center rounded-2xl border border-[#d8e2ee] bg-[#f7fbff] px-4 text-lg font-bold uppercase text-[#2f4b6a] shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                {tile.value}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={resetAttempt}
              disabled={status === "correct"}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reset word
            </button>
            <button
              type="button"
              onClick={() => {
                setBankLetters((current) => {
                  const next = [...current];
                  for (let index = next.length - 1; index > 0; index -= 1) {
                    const swapIndex = Math.floor(Math.random() * (index + 1));
                    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
                  }
                  return next;
                });
              }}
              disabled={status === "correct" || bankLetters.length <= 1}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Shuffle letters
            </button>
            {status === "correct" ? (
              <button
                type="button"
                onClick={moveToNext}
                className="rounded-2xl bg-[#1f7a52] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#186341]"
              >
                {currentQuestionIndex === chapter.questions.length - 1 ? "See Chapter Results" : "Next word"}
              </button>
            ) : null}
          </div>

          <div className="mt-6 min-h-16 rounded-[24px] border px-4 py-4 text-sm leading-7 transition-all duration-200">
            {status === "correct" ? (
              <div className="border-[#d7ecd9] bg-[#f4fbf5] text-[#24573c]">
                <p className="font-semibold">Correct: {question.answer}</p>
                <p className="mt-1">You matched the word from {question.reference}. Keep moving and finish the chapter pack.</p>
              </div>
            ) : status === "incorrect" ? (
              <div className="border-[#f1d8d8] bg-[#fff6f6] text-[#9a4d4d]">
                <p className="font-semibold">Not quite.</p>
                <p className="mt-1">The letters are resetting so you can take another clean try.</p>
              </div>
            ) : (
              <div className="border-[#e8edf5] bg-[#fafcff] text-gray-600">
                <p className="font-semibold text-gray-900">Build the answer one letter at a time.</p>
                <p className="mt-1">Tap letters below to place them in order. Tap a placed letter to send it back.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
