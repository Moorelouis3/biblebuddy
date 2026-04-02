"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LouisAvatar } from "@/components/LouisAvatar";
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
  locked?: boolean;
};

function createTile(value: string, index: number, locked = false): LetterTile {
  return {
    id: `${value}-${index}-${Math.random().toString(36).slice(2, 8)}`,
    value,
    locked,
  };
}

function shuffleTiles(tiles: LetterTile[]) {
  const next = [...tiles];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function buildAnswerSlots(answer: string, revealedLetters: number) {
  const letters = answer.toUpperCase().split("");
  return letters.map((value, index) => (index < revealedLetters ? createTile(value, index, true) : null));
}

function buildBankTiles(answer: string, revealedLetters: number) {
  const letters = answer.toUpperCase().split("");
  return shuffleTiles(
    letters
      .map((value, index) => ({ value, index }))
      .filter(({ index }) => index >= revealedLetters)
      .map(({ value, index }) => createTile(value, index))
  );
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
  const [answerSlots, setAnswerSlots] = useState<Array<LetterTile | null>>([]);
  const [revealedLetters, setRevealedLetters] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [status, setStatus] = useState<"idle" | "incorrect" | "correct">("idle");
  const [showResults, setShowResults] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [celebrateKey, setCelebrateKey] = useState(0);
  const [louieLine, setLouieLine] = useState("Tap the letters below and let's solve this word together.");

  const question = chapter.questions[currentQuestionIndex];
  const chapterKey = getScrambledProgressKey(bookSlug, chapter.chapter);

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, index) => ({
        id: index,
        left: `${8 + index * 5}%`,
        delay: `${index * 45}ms`,
        color: ["#7aa8ff", "#8fd9be", "#f4c56c", "#ffb9c8"][index % 4],
      })),
    []
  );

  useEffect(() => {
    setAnswerSlots(buildAnswerSlots(question.answer, 0));
    setBankLetters(buildBankTiles(question.answer, 0));
    setStatus("idle");
    setHintCount(0);
    setRevealedLetters(0);
    setLouieLine("Tap the letters below and let's solve this word together.");
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

  const markCorrect = () => {
    setSolvedCount((value) => value + 1);
    setStatus("correct");
    setCelebrateKey((value) => value + 1);
    setLouieLine(`Nice work. "${question.answer}" is right, and that one counts for your score.`);

    if (userId) {
      void fetch("/api/scrambled-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          bookName,
          bookSlug,
          chapter: chapter.chapter,
          questionId: question.id,
          answer: question.answer,
          reference: question.reference,
        }),
      });
    }
  };

  const checkAnswer = (slots: Array<LetterTile | null>) => {
    if (slots.some((slot) => slot === null)) return;

    const guess = slots.map((slot) => slot?.value ?? "").join("").toLowerCase();
    if (guess === question.answer.toLowerCase()) {
      markCorrect();
      return;
    }

    setStatus("incorrect");
    setLouieLine("Close. Reset or shuffle the letters and try another order.");
    window.setTimeout(() => {
      const restoredSlots = buildAnswerSlots(question.answer, revealedLetters);
      const restoredBank = buildBankTiles(question.answer, revealedLetters);
      setAnswerSlots(restoredSlots);
      setBankLetters(restoredBank);
      setStatus("idle");
      setLouieLine(hintCount > 0 ? "Use another hint and I'll place the next letter for you." : "Tap the letters below and let's solve this word together.");
    }, 700);
  };

  const resetAttempt = () => {
    setAnswerSlots(buildAnswerSlots(question.answer, revealedLetters));
    setBankLetters(buildBankTiles(question.answer, revealedLetters));
    setStatus("idle");
    setLouieLine(revealedLetters > 0 ? "I kept the revealed letters in place for you." : "Fresh start. Try the word again.");
  };

  const handleBankLetterClick = (tile: LetterTile) => {
    if (status === "correct") return;

    const nextIndex = answerSlots.findIndex((slot) => slot === null);
    if (nextIndex === -1) return;

    const nextBank = bankLetters.filter((entry) => entry.id !== tile.id);
    const nextSlots = [...answerSlots];
    nextSlots[nextIndex] = tile;
    setBankLetters(nextBank);
    setAnswerSlots(nextSlots);
    checkAnswer(nextSlots);
  };

  const handleAnswerLetterClick = (slotIndex: number) => {
    if (status === "correct") return;

    const slot = answerSlots[slotIndex];
    if (!slot || slot.locked) return;

    const nextSlots = [...answerSlots];
    nextSlots[slotIndex] = null;
    setAnswerSlots(nextSlots);
    setBankLetters((current) => shuffleTiles([...current, { ...slot, locked: false }]));
    setStatus("idle");
  };

  const revealNextLetter = () => {
    if (status === "correct") return;

    if (hintCount === 0) {
      setHintCount(1);
      setLouieLine(`Hint: ${question.clue}`);
      return;
    }

    const answerLetters = question.answer.toUpperCase().split("");
    const nextRevealCount = Math.min(answerLetters.length, revealedLetters + 1);
    const nextSlots = buildAnswerSlots(question.answer, nextRevealCount);
    const nextBank = buildBankTiles(question.answer, nextRevealCount);
    const revealedLetter = answerLetters[nextRevealCount - 1];

    setHintCount((value) => value + 1);
    setRevealedLetters(nextRevealCount);
    setAnswerSlots(nextSlots);
    setBankLetters(nextBank);
    setStatus("idle");

    if (nextRevealCount === 1) {
      setLouieLine(`I placed the first letter for you. ${question.clue}`);
    } else {
      setLouieLine(`I placed the next letter for you. The next one is ${revealedLetter}.`);
    }

    if (nextRevealCount === answerLetters.length) {
      markCorrect();
    }
  };

  const hintLabel =
    hintCount === 0
      ? "Show hint"
      : revealedLetters < question.answer.length
        ? "Reveal next letter"
        : "Answer revealed";

  const encouragement =
    solvedCount === chapter.questions.length
      ? "Perfect chapter run."
      : solvedCount >= Math.max(4, chapter.questions.length - 1)
        ? "Strong work. You really know this chapter."
        : solvedCount >= Math.ceil(chapter.questions.length / 2)
          ? "Solid progress. The chapter is starting to stick."
          : "Good first pass. Play it again and the words will lock in faster.";

  if (!progressLoaded) {
    return <div className="min-h-screen bg-[#f5f7fb] px-4 py-14 text-center text-sm text-gray-500">Loading Scrambled...</div>;
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] px-4 py-10">
        <div className="mx-auto max-w-xl rounded-[32px] border border-[#d8e4fb] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex w-fit items-center gap-3 rounded-full bg-[#eef4ff] px-4 py-2">
            <LouisAvatar mood="stareyes" size={46} />
            <p className="text-sm font-semibold text-[#335ea8]">Louis says you finished this chapter.</p>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#5d7fc0]">Chapter Complete</p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">{bookName} {chapter.chapter}</h1>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            You finished all {chapter.questions.length} scrambled prompts from this chapter.
          </p>

          <div className="mt-8 rounded-[24px] border border-[#d8e4fb] bg-[#f6f9ff] px-6 py-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#426ab2]">Words correct</p>
            <p className="mt-2 text-5xl font-bold text-[#1f4f9e]">{solvedCount} / {chapter.questions.length}</p>
            <p className="mt-3 text-sm text-[#496a9b]">{encouragement}</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/bible-study-games/scrambled/${bookSlug}/${chapter.chapter}`}
              className="rounded-2xl bg-[#4768af] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#35508a]"
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
      <div className="min-h-screen bg-[#f5f7fb] pb-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 pt-6 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link href={`/bible-study-games/scrambled/${bookSlug}`} className="text-sm font-semibold text-[#4768af] hover:text-[#35508a]">
              Back to Chapters
            </Link>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowHelp(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#cfdcf6] bg-white text-sm font-semibold text-[#4768af] shadow-sm transition hover:bg-[#f6f9ff]"
                aria-label="How to play Scrambled"
              >
                ?
              </button>
              <Link href={`/Bible/${bookSlug}/${chapter.chapter}`} className="text-sm font-semibold text-[#4768af] hover:text-[#35508a]">
                Read chapter
              </Link>
            </div>
          </div>

          <div className="rounded-[30px] border border-[#d8e4fb] bg-white px-5 py-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-full border border-[#d7e2f8] bg-[#f4f8ff] p-1 shadow-sm">
                <LouisAvatar mood={status === "correct" ? "stareyes" : hintCount > 0 ? "think" : "bible"} size={58} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5d7fc0]">Scrambled</p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">{bookName} {chapter.chapter}</h1>
                <div className="mt-3 rounded-[24px] border border-[#d8e4fb] bg-[#f6f9ff] px-4 py-3">
                  <p className="text-sm leading-7 text-[#35508a]">{louieLine}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-[#d8e4fb] bg-white px-5 py-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-700">
              <p className="font-semibold">Word {currentQuestionIndex + 1} of {chapter.questions.length}</p>
              <p>Number of words correct: {solvedCount}</p>
            </div>

            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#dfe8f8]">
              <div
                className="h-full rounded-full bg-[#5c7fc1] transition-all duration-300"
                style={{ width: `${buildProgressPercent(currentQuestionIndex, chapter.questions.length)}%` }}
              />
            </div>

            <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Unscramble the word</h2>
                <p className="mt-1 text-sm text-gray-500">{question.reference}</p>
              </div>

              <button
                type="button"
                onClick={revealNextLetter}
                disabled={status === "correct"}
                className="rounded-2xl border border-[#d8e2ee] bg-[#f7fbff] px-4 py-2 text-sm font-semibold text-[#2f4b6a] shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {hintLabel}
              </button>
            </div>

            <div className="mt-4 rounded-[24px] border border-[#e0e7f4] bg-[#f8fbff] px-4 py-4">
              {hintCount === 0 ? (
                <p className="text-sm text-gray-500">Use a hint if you need a little help.</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm leading-7 text-gray-700">
                    <span className="font-semibold text-gray-900">Hint:</span> {question.clue}
                  </p>
                  {revealedLetters > 0 ? (
                    <p className="text-sm leading-7 text-gray-600">
                      Louis has placed <span className="font-semibold text-gray-900">{revealedLetters}</span>{" "}
                      {revealedLetters === 1 ? "letter" : "letters"} for you so far.
                    </p>
                  ) : null}
                </div>
              )}
            </div>

            <div className="relative mt-5">
              {status === "correct" ? (
                <div key={celebrateKey} className="pointer-events-none absolute inset-x-0 -top-5 z-10 h-24 overflow-hidden">
                  {confettiPieces.map((piece) => (
                    <span
                      key={`${celebrateKey}-${piece.id}`}
                      className="absolute top-0 h-3 w-3 rounded-full animate-[confetti-fall_900ms_ease-out_forwards]"
                      style={{ left: piece.left, animationDelay: piece.delay, backgroundColor: piece.color }}
                    />
                  ))}
                </div>
              ) : null}

              <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                {answerSlots.map((tile, index) => (
                  <button
                    key={`${question.id}-slot-${index}`}
                    type="button"
                    onClick={() => handleAnswerLetterClick(index)}
                    className={`flex h-12 items-center justify-center rounded-2xl border text-lg font-bold uppercase transition ${
                      tile
                        ? tile.locked
                          ? "border-[#bfd3f5] bg-[#edf4ff] text-[#31528d]"
                          : "border-[#d5dbe5] bg-white text-gray-900 shadow-sm"
                        : "border-[#e4e8ef] bg-[#f4f6f9] text-gray-300"
                    }`}
                  >
                    {tile?.value ?? ""}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
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

            <div className="mt-5 flex flex-wrap items-center gap-3">
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
                onClick={() => setBankLetters((current) => shuffleTiles(current))}
                disabled={status === "correct" || bankLetters.length <= 1}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Shuffle letters
              </button>
              {status === "correct" ? (
                <button
                  type="button"
                  onClick={moveToNext}
                  className="rounded-2xl bg-[#4768af] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#35508a]"
                >
                  {currentQuestionIndex === chapter.questions.length - 1 ? "See Chapter Results" : "Next word"}
                </button>
              ) : null}
            </div>

            <div className="mt-4 min-h-10 text-sm leading-7">
              {status === "correct" ? (
                <div className="rounded-[24px] border border-[#d8e4fb] bg-[#f6f9ff] px-4 py-4">
                  <p className="font-semibold text-[#2f4b6a]">Correct. Louis found the verse for you.</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">{question.reference}</p>
                  <p className="mt-1 text-sm leading-7 text-gray-700">"{question.sourceLine}"</p>
                </div>
              ) : status === "incorrect" ? (
                <p className="font-semibold text-[#9a4d4d]">Not quite. Try a different order, or let Louis reveal the next letter.</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {showHelp ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4" onClick={() => setShowHelp(false)}>
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <LouisAvatar mood="wave" size={44} />
              <div>
                <h2 className="text-xl font-bold text-gray-900">How to play</h2>
                <p className="text-sm text-gray-500">Louis will guide you through each word.</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-gray-700">Tap letters below to build the word in the correct order.</p>
            <p className="mt-2 text-sm leading-7 text-gray-700">Tap a placed letter if you want to send it back and try another spot.</p>
            <p className="mt-2 text-sm leading-7 text-gray-700">Every time you ask for more help, Louis can place another letter for you.</p>
            <p className="mt-2 text-sm leading-7 text-gray-700">Even if Louis reveals the whole word, it still counts. The goal is to learn the Scripture word.</p>
            <button
              type="button"
              onClick={() => setShowHelp(false)}
              className="mt-5 rounded-xl bg-[#4768af] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#35508a]"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}

      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translateY(90px) scale(1.15);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
