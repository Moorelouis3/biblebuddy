"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { logActionToMasterActions } from "@/lib/actionRecorder";
import { ACTION_TYPE } from "@/lib/actionTypes";
import {
  SCRAMBLED_PROGRESS_STORAGE_KEY,
  type ScrambledChapterPack,
  type ScrambledProgressMap,
  getScrambledProgressKey,
} from "@/lib/scrambledGameData";
import { supabase } from "@/lib/supabaseClient";

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
  const [showHelp, setShowHelp] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  const question = chapter.questions[currentQuestionIndex];
  const chapterKey = getScrambledProgressKey(bookSlug, chapter.chapter);

  useEffect(() => {
    setBankLetters(shuffleLetters(question.answer));
    setAnswerLetters([]);
    setStatus("idle");
    setHintLevel(0);
  }, [question]);

  useEffect(() => {
    setProgressLoaded(true);
  }, []);

  useEffect(() => {
    let mounted = true;

    void supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUserId(data.user?.id ?? null);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const resetAttempt = () => {
    setBankLetters(shuffleLetters(question.answer));
    setAnswerLetters([]);
    setStatus("idle");
  };

  const hintLabel = hintLevel === 0 ? "Show hint" : hintLevel === 1 ? "More hint" : "Hint shown";

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
      if (userId) {
        const actionLabel = `${bookName} ${chapter.chapter} - ${question.answer}`;
        void logActionToMasterActions(userId, ACTION_TYPE.scrambled_word_answered, actionLabel);
      }
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
    return <div className="min-h-screen bg-[#f7f7f4] px-4 py-14 text-center text-sm text-gray-500">Loading Scrambled...</div>;
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#f7f7f4] px-4 py-10">
        <div className="mx-auto max-w-xl rounded-[30px] border border-[#eadfcf] bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b37839]">Chapter Complete</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">{bookName} {chapter.chapter}</h1>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            You finished all {chapter.questions.length} scrambled prompts from this chapter.
          </p>

          <div className="mt-8 rounded-[24px] border border-[#d8e8dc] bg-[#f3fbf5] px-6 py-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2f6b47]">Words correct</p>
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
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#f7f7f4] pb-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pt-8 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link href={`/bible-study-games/scrambled/${bookSlug}`} className="text-sm font-semibold text-[#8d5f2d] hover:text-[#6d461d]">
              Back to Chapters
            </Link>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowHelp(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                aria-label="How to play Scrambled"
              >
                ?
              </button>
              <Link href={`/Bible/${bookSlug}/${chapter.chapter}`} className="text-sm font-semibold text-[#4768af] hover:text-[#35508a]">
                Read chapter
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b37839]">Scrambled</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{bookName} {chapter.chapter}</h1>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-700">
            <p className="font-semibold">Word {currentQuestionIndex + 1} of {chapter.questions.length}</p>
            <p>Number of words correct: {solvedCount}</p>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-[#e4dccd]">
            <div
              className="h-full rounded-full bg-[#cb8140] transition-all duration-300"
              style={{ width: `${buildProgressPercent(currentQuestionIndex, chapter.questions.length)}%` }}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Unscramble the word</h2>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setHintLevel((current) => Math.min(2, current + 1))}
                disabled={hintLevel >= 2}
                className="rounded-2xl border border-[#d8e2ee] bg-white px-4 py-2 text-sm font-semibold text-[#2f4b6a] shadow-sm transition hover:bg-[#f7fbff] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {hintLabel}
              </button>
              {hintLevel >= 1 ? (
                <p className="text-sm leading-7 text-gray-700">
                  <span className="font-semibold text-gray-900">Hint:</span> {question.clue}
                </p>
              ) : (
                <p className="text-sm text-gray-500">Use a hint if you need a little help.</p>
              )}
            </div>
            {hintLevel >= 2 ? (
              <p className="mt-2 text-sm leading-7 text-gray-600">
                Starts with <span className="font-semibold text-gray-900">{question.answer.charAt(0).toUpperCase()}</span>
                {" "}and comes from <span className="font-semibold text-gray-900">{question.reference}</span>.
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {Array.from({ length: question.answer.length }).map((_, index) => {
              const tile = answerLetters[index];
              return (
                <button
                  key={`${question.id}-slot-${index}`}
                  type="button"
                  onClick={() => tile && handleAnswerLetterClick(tile)}
                  className={`flex h-12 items-center justify-center rounded-2xl border text-lg font-bold uppercase transition ${
                    tile
                      ? "border-[#d5dbe5] bg-white text-gray-900 shadow-sm"
                      : "border-[#e4e8ef] bg-[#f4f6f9] text-gray-300"
                  }`}
                >
                  {tile?.value ?? ""}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
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

          <div className="flex flex-wrap items-center gap-3">
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

          <div className="min-h-10 text-sm leading-7">
            {status === "correct" ? (
              <p className="font-semibold text-[#24573c]">Correct. Keep going.</p>
            ) : status === "incorrect" ? (
              <p className="font-semibold text-[#9a4d4d]">Not quite. Try it again.</p>
            ) : null}
          </div>
        </div>
      </div>

      {showHelp ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4" onClick={() => setShowHelp(false)}>
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900">How to play</h2>
            <p className="mt-3 text-sm leading-7 text-gray-700">Tap letters below to build the word in the correct order.</p>
            <p className="mt-2 text-sm leading-7 text-gray-700">Tap a placed letter if you want to send it back and try a different order.</p>
            <p className="mt-2 text-sm leading-7 text-gray-700">Use the hint when you need help, then keep moving chapter by chapter.</p>
            <button
              type="button"
              onClick={() => setShowHelp(false)}
              className="mt-5 rounded-xl bg-[#1f7a52] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#186341]"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
