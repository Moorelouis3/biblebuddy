"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LouisAvatar } from "@/components/LouisAvatar";
import UpgradeRequiredModal from "@/components/UpgradeRequiredModal";
import { triggerPoints } from "@/components/PointsPop";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
import type { TriviaChapterPack } from "@/lib/triviaGameData";
import { CHAPTER_BASED_TRIVIA_BOOK_CONFIG } from "@/lib/triviaCatalog";
import { FREE_TRIVIA_BOOK_KEYS } from "@/lib/bibleStudyGameCatalog";
import { trackNavigationActionOnce } from "@/lib/navigationActionTracker";

type TriviaGamePlayerProps = {
  bookName: string;
  bookSlug: string;
  chapter: TriviaChapterPack;
  onClose?: () => void;
};

async function fetchVerseText(reference: string) {
  try {
    const primaryRef = reference.split(/[;,]/)[0]?.trim() ?? reference.trim();
    const normalizedRef = encodeURIComponent(primaryRef);
    const response = await fetch(`https://bible-api.com/${normalizedRef}`);
    if (!response.ok) {
      throw new Error("Failed to fetch verse");
    }

    const data = await response.json();
    return data.text || "";
  } catch (error) {
    console.error("Error fetching verse:", error);
    return "";
  }
}

export default function TriviaGamePlayer({ bookName, bookSlug, chapter, onClose }: TriviaGamePlayerProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedCorrectCount, setEarnedCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [verseText, setVerseText] = useState("");
  const [loadingVerseText, setLoadingVerseText] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState<boolean | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const bookKey = useMemo(() => {
    return CHAPTER_BASED_TRIVIA_BOOK_CONFIG.find((entry) => entry.routeSlug === bookSlug)?.key ?? bookSlug;
  }, [bookSlug]);

  const isFreeBook = FREE_TRIVIA_BOOK_KEYS.has(bookKey);

  const currentQuestion = chapter.questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) {
        return;
      }

      if (!user) {
        setIsPaid(false);
        if (!isFreeBook) {
          setShowUpgradeModal(true);
        }
        return;
      }

      setUserId(user.id);

      const { data: profileStats } = await supabase
        .from("profile_stats")
        .select("is_paid")
        .eq("user_id", user.id)
        .maybeSingle();

      const paid = profileStats?.is_paid === true;
      setIsPaid(paid);

      if (!paid && !isFreeBook) {
        setShowUpgradeModal(true);
        return;
      }

      const creditResponse = await fetch("/api/consume-credit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionType: ACTION_TYPE.trivia_started,
        }),
      });

      if (!creditResponse.ok || cancelled) {
        return;
      }

      const creditResult = (await creditResponse.json()) as { ok: boolean };
      if (!creditResult.ok || cancelled) {
        return;
      }
    }

    void loadUser();

    return () => {
      cancelled = true;
    };
  }, [isFreeBook]);

  if (isPaid === false && !isFreeBook) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Trivia Pro Feature</h1>
          <p className="mt-3 text-gray-700">
            This chapter quiz unlocks with Pro.
          </p>
          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={() => setShowUpgradeModal(true)}
              className="block w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Upgrade to Pro
            </button>
            <button
              type="button"
              onClick={() => onClose ? onClose() : router.back()}
              className="block w-full rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-800 transition hover:bg-gray-200"
            >
              Go back
            </button>
          </div>
        </div>

        <UpgradeRequiredModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
      </div>
    );
  }

  async function handleAnswerSelect(answer: string) {
    if (selectedAnswer) {
      return;
    }

    const answerIsCorrect = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);

    if (answerIsCorrect) {
      setCorrectCount((current) => current + 1);
    }

    if (userId) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const meta = (user?.user_metadata ?? {}) as Record<string, string | undefined>;
        const username =
          meta.firstName || meta.first_name || (user?.email ? user.email.split("@")[0] : null) || "User";

        const response = await fetch("/api/trivia-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            questionId: currentQuestion.id,
            username,
            isCorrect: answerIsCorrect,
            book: chapter.progressKey,
          }),
        });

        const payload = (await response.json().catch(() => ({}))) as { awardedPoint?: boolean };
        if (payload.awardedPoint) {
          setEarnedCorrectCount((current) => current + 1);
        }
      } catch (error) {
        console.error("Error recording trivia answer:", error);
      }
    }

    setLoadingVerseText(true);
    const nextVerseText = await fetchVerseText(currentQuestion.verse);
    setVerseText(nextVerseText);
    setLoadingVerseText(false);
  }

  function handleNext() {
    if (currentQuestionIndex < chapter.questions.length - 1) {
      setCurrentQuestionIndex((current) => current + 1);
      setSelectedAnswer(null);
      setVerseText("");
      return;
    }

    setShowResults(true);
  }

  useEffect(() => {
    if (!showResults || !userId) return;

    void trackNavigationActionOnce({
      userId,
      actionType: ACTION_TYPE.trivia_chapter_completed,
      actionLabel: `${bookName} ${chapter.chapter} - ${correctCount}/${chapter.questions.length}`,
      dedupeKey: `trivia-chapter-completed:${bookKey}:${chapter.chapter}`,
    })
      .then((logged) => {
        if (logged) {
          triggerPoints(earnedCorrectCount);
        }
      })
      .catch((error) => {
        console.error("[NAV] Failed to track Trivia chapter completion:", error);
      });
  }, [showResults, userId, bookName, chapter.chapter, chapter.questions.length, earnedCorrectCount, bookKey]);

  if (showResults) {
    const scrambledHref = `/bible-study-games/scrambled/${bookKey}/${chapter.chapter}`;
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Chapter Complete</h1>
          <p className="mt-3 text-5xl font-bold text-blue-600">
            {correctCount}/{chapter.questions.length}
          </p>
          <p className="mt-3 text-gray-700">
            {bookName} {chapter.chapter} finished.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            Now try Scrambled for this chapter to lock key words into memory.
          </p>
          {earnedCorrectCount > 0 ? (
            <p className="mt-3 text-sm font-semibold text-emerald-700">
              You earned +{earnedCorrectCount} points for new correct answers.
            </p>
          ) : (
            <p className="mt-3 text-sm text-gray-600">
              No new points this run (you already earned points for these questions before).
            </p>
          )}
          <div className="mt-8 space-y-3">
            {!onClose && (
              <Link
                href={scrambledHref}
                className="block rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Play Scrambled
              </Link>
            )}
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="block w-full rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-800 transition hover:bg-gray-200"
              >
                Close
              </button>
            ) : (
              <Link
                href={`/bible-trivia/${bookSlug}`}
                className="block rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-800 transition hover:bg-gray-200"
              >
                Back to chapters
              </Link>
            )}
            <Link
              href={`/bible-trivia/${bookSlug}/${chapter.chapter}`}
              className="block rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Play trivia again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          {onClose ? (
            <button type="button" onClick={onClose} className="text-sm text-gray-600 transition hover:text-gray-900">
              ← Close
            </button>
          ) : (
            <Link href={`/bible-trivia/${bookSlug}`} className="text-sm text-gray-600 transition hover:text-gray-900">
              Back to chapters
            </Link>
          )}
          <p className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {chapter.questions.length}
          </p>
        </div>

        <div className="mb-4 flex items-start gap-3">
          <LouisAvatar mood="bible" size={48} />
          <div className="relative w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm">
            <div className="absolute -left-2 top-5 h-3 w-3 rotate-45 border-b border-l border-gray-200 bg-white" />
            <p>{chapter.description}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            {bookName} {chapter.chapter}
          </p>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">{currentQuestion.question}</h1>

          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.label;
              const isRightOption = !!selectedAnswer && option.label === currentQuestion.correctAnswer;
              const isWrongSelection = isSelected && option.label !== currentQuestion.correctAnswer;

              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => void handleAnswerSelect(option.label)}
                  disabled={!!selectedAnswer}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    isRightOption
                      ? "border-green-400 bg-green-50"
                      : isWrongSelection
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <span className="font-semibold text-gray-900">{option.label}.</span>{" "}
                  <span className="text-gray-800">{option.text}</span>
                </button>
              );
            })}
          </div>

          {selectedAnswer ? (
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <p className={`text-sm font-semibold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                {isCorrect ? "Correct" : "Not quite"}
              </p>
              <p className="mt-3 text-sm font-semibold text-gray-900">{currentQuestion.verse}</p>
              {loadingVerseText ? (
                <p className="mt-2 text-sm text-gray-500">Loading verse...</p>
              ) : verseText ? (
                <p className="mt-2 text-sm italic leading-6 text-gray-700">{verseText}</p>
              ) : null}
              <p className="mt-3 text-sm leading-6 text-gray-700">{currentQuestion.explanation}</p>
              <button
                type="button"
                onClick={handleNext}
                className="mt-5 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {currentQuestionIndex < chapter.questions.length - 1 ? "Next question" : "See results"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
