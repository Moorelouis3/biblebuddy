"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { dispatchLouisMoment } from "@/lib/louisMoments";

type TriviaGamePlayerProps = {
  bookName: string;
  bookSlug: string;
  chapter: TriviaChapterPack;
  onClose?: () => void;
  onComplete?: () => void;
  skipUpgradeGate?: boolean;
  compact?: boolean;
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

export default function TriviaGamePlayer({ bookName, bookSlug, chapter, onClose, onComplete, skipUpgradeGate = false, compact = false }: TriviaGamePlayerProps) {
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
  const completionNotifiedRef = useRef(false);

  const bookKey = useMemo(() => {
    return CHAPTER_BASED_TRIVIA_BOOK_CONFIG.find((entry) => entry.routeSlug === bookSlug)?.key ?? bookSlug;
  }, [bookSlug]);

  const isFreeBook = FREE_TRIVIA_BOOK_KEYS.has(bookKey);
  const shouldGateUpgrade = !skipUpgradeGate && !isFreeBook;

  const questions = chapter?.questions ?? [];
  const currentQuestion = questions[currentQuestionIndex] ?? null;
  const isCorrect = Boolean(currentQuestion && selectedAnswer === currentQuestion.correctAnswer);

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
        if (shouldGateUpgrade) {
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

      if (!paid && shouldGateUpgrade) {
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
  }, [shouldGateUpgrade]);

  if (isPaid === false && shouldGateUpgrade) {
    return (
      <div className={`${compact ? "bg-white px-3 py-4" : "min-h-screen bg-gray-50 px-4 py-10"}`}>
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
    if (selectedAnswer || !currentQuestion) {
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
    if (currentQuestionIndex < questions.length - 1) {
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
      actionLabel: `${bookName} ${chapter.chapter} - ${correctCount}/${questions.length}`,
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
  }, [showResults, userId, bookName, chapter.chapter, questions.length, earnedCorrectCount, bookKey]);

  useEffect(() => {
    if (!showResults || completionNotifiedRef.current) return;
    completionNotifiedRef.current = true;
    onComplete?.();
  }, [showResults, onComplete]);

  useEffect(() => {
    if (!showResults) return;

    const scrambledHref = `/bible-study-games/scrambled/${bookKey}/${chapter.chapter}`;
    const chapterHref = `/bible-trivia/${bookSlug}`;

    dispatchLouisMoment({
      message:
        correctCount === questions.length
          ? `Nice work. You just finished trivia for ${bookName} ${chapter.chapter} and got a perfect score.\n\nIf you want to lock this chapter in even more, Scrambled is the best next move.\n\nDo you want to play it now?`
          : `Nice work. You just finished trivia for ${bookName} ${chapter.chapter} and got ${correctCount} out of ${questions.length}.\n\nIf you want to keep the momentum going, Scrambled is the best next move.\n\nDo you want to play it now?`,
      replies: [
        {
          id: `trivia-scrambled-${bookKey}-${chapter.chapter}`,
          label: "Yes",
          href: scrambledHref,
        },
        {
          id: `trivia-scrambled-no-${bookKey}-${chapter.chapter}`,
          label: "No",
          message: "No problem.\n\nIf you want to come back to Scrambled later, I will be here.",
        },
      ],
    });
  }, [showResults, correctCount, questions.length, chapter.chapter, bookName, bookKey, bookSlug]);

  if (!currentQuestion && !showResults) {
    return (
      <div className="bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Trivia unavailable</h1>
          <p className="mt-3 text-gray-700">
            Louis could not find the questions for this chapter yet.
          </p>
          <button
            type="button"
            onClick={() => onClose ? onClose() : router.back()}
            className="mt-8 block w-full rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-800 transition hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const scrambledHref = `/bible-study-games/scrambled/${bookKey}/${chapter.chapter}`;
    const isEmbedded = Boolean(onClose);
    const perfectScore = correctCount === questions.length;
    const strongScore = correctCount >= Math.max(4, questions.length - 1);
    const encouragement = perfectScore
      ? "That was clean. You really paid attention to this chapter."
      : strongScore
        ? "Strong work. The chapter is starting to stick."
        : correctCount >= Math.ceil(questions.length / 2)
          ? "Good progress. Keep going and this chapter will get clearer."
          : "You finished the round, and that still counts. Review it once more and the chapter will land better.";
    return (
      <div className={`${isEmbedded || compact ? "bg-white px-3 py-4" : "min-h-screen bg-[#f5f7fb] px-4 py-8"}`}>
        <div
          className={`relative mx-auto max-w-xl text-center ${
            isEmbedded
              ? "px-2 py-2"
              : "rounded-[32px] border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/70 sm:p-8"
          }`}
        >
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-1 top-1 z-10 grid h-9 w-9 place-items-center rounded-full border border-gray-200 bg-white text-2xl font-light leading-none text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-950 sm:right-3 sm:top-3"
              aria-label="Close trivia results"
            >
              ×
            </button>
          ) : null}
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-gray-200 bg-white shadow-lg shadow-gray-200/80">
            <LouisAvatar mood="stareyes" size={78} />
          </div>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-gray-950">Bible Buddy</p>
          <p className="mt-1 text-base font-black text-gray-950">{perfectScore ? "Perfect round." : "Nice work finishing."}</p>
          <h1 className="mx-auto mt-8 max-w-md text-3xl font-black leading-tight text-gray-950">
            Trivia Results for {bookName} {chapter.chapter}
          </h1>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.16em] text-gray-950">Score</p>
          <p className="mt-2 text-6xl font-black leading-none text-gray-950">
            {correctCount}/{questions.length}
          </p>
          <p className="mx-auto mt-4 max-w-md text-base font-bold leading-7 text-gray-950">{encouragement}</p>
          {earnedCorrectCount > 0 ? (
            <p className="mt-5 text-base font-black leading-7 text-gray-950">
              You earned +{earnedCorrectCount} points for new correct answers.
            </p>
          ) : (
            <p className="mt-5 text-base font-bold leading-7 text-gray-950">
              No new points this run (you already earned points for these questions before).
            </p>
          )}
          {!onClose ? (
            <div className="mt-8 space-y-3">
              <Link
                href={scrambledHref}
                className="block rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Play Scrambled
              </Link>
              <Link
                href={`/bible-trivia/${bookSlug}`}
                className="block rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-800 transition hover:bg-gray-200"
              >
                Back to chapters
              </Link>
              <Link
                href={`/bible-trivia/${bookSlug}/${chapter.chapter}`}
                className="block rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Play trivia again
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={`${compact ? "bg-white px-3 py-4" : "min-h-screen bg-gray-50 px-4 py-8"}`}>
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
            Question {currentQuestionIndex + 1} of {questions.length}
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
              const answerStyle = isRightOption
                ? {
                    backgroundColor: "#BBF7D0",
                    borderColor: "#16A34A",
                    boxShadow: "0 0 0 2px rgba(22, 163, 74, 0.14)",
                  }
                : isWrongSelection
                  ? {
                      backgroundColor: "#FECACA",
                      borderColor: "#DC2626",
                      boxShadow: "0 0 0 2px rgba(220, 38, 38, 0.12)",
                    }
                  : isSelected
                    ? {
                        backgroundColor: "#F1F5F9",
                        borderColor: "#64748B",
                      }
                    : undefined;

              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => void handleAnswerSelect(option.label)}
                  disabled={!!selectedAnswer}
                  style={answerStyle}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    isRightOption
                      ? "border-green-600 bg-green-200 disabled:opacity-100"
                      : isWrongSelection
                        ? "border-red-600 bg-red-200 disabled:opacity-100"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 disabled:opacity-100"
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
                {currentQuestionIndex < questions.length - 1 ? "Next question" : "See results"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
