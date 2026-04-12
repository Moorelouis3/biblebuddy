"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { LouisAvatar } from "@/components/LouisAvatar";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { trackNavigationActionOnce } from "@/lib/navigationActionTracker";
import { triggerPoints } from "@/components/PointsPop";
import { getScrambledBook, type ScrambledChapterPack } from "@/lib/scrambledGameData";
import { supabase } from "@/lib/supabaseClient";
import { CHAPTER_BASED_TRIVIA_BOOK_CONFIG } from "@/lib/triviaCatalog";

type LetterTile = {
  id: string;
  value: string;
  locked?: boolean;
};

type ScrambledBuddyRound = {
  user_id: string;
  display_name: string;
  username: string | null;
  profile_image_url: string | null;
  score: number;
  total: number;
  completed_at: string | null;
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

function buildProgressPercent(currentIndex: number, total: number) {
  return Math.round(((currentIndex + 1) / total) * 100);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function ScrambledGamePlayer({
  bookName,
  bookSlug,
  chapter,
  onClose,
}: {
  bookName: string;
  bookSlug: string;
  chapter: ScrambledChapterPack;
  onClose?: () => void;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bankLetters, setBankLetters] = useState<LetterTile[]>([]);
  const [answerSlots, setAnswerSlots] = useState<Array<LetterTile | null>>([]);
  const [revealedLetters, setRevealedLetters] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [earnedSolveCount, setEarnedSolveCount] = useState(0);
  const [status, setStatus] = useState<"idle" | "incorrect" | "correct">("idle");
  const [showResults, setShowResults] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [celebrateKey, setCelebrateKey] = useState(0);
  const [louieLine, setLouieLine] = useState("Tap the letters below and let's solve this word together.");
  const [recentReveal, setRecentReveal] = useState<{ index: number; letter: string; key: number } | null>(null);
  const [shareState, setShareState] = useState<"idle" | "sharing" | "shared" | "limited" | "error">("idle");
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [buddyRounds, setBuddyRounds] = useState<ScrambledBuddyRound[]>([]);
  const [loadingBuddyRounds, setLoadingBuddyRounds] = useState(false);
  const [showBuddyRoundsModal, setShowBuddyRoundsModal] = useState(false);
  const trackedQuestionIdsRef = useRef<Set<string>>(new Set());

  const question = chapter.questions[currentQuestionIndex];
  const nextChapterPack = useMemo(() => {
    const bookPack = getScrambledBook(bookSlug);
    if (!bookPack) return null;
    return bookPack.chapters.find((entry) => entry.chapter === chapter.chapter + 1) ?? null;
  }, [bookSlug, chapter.chapter]);

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
    setRecentReveal(null);
  }, [question]);

  useEffect(() => {
    setProgressLoaded(true);
  }, []);

  useEffect(() => {
    // Reset the "new points earned" counter each time a chapter run starts.
    setEarnedSolveCount(0);
  }, [bookSlug, chapter.chapter]);

  useEffect(() => {
    let mounted = true;

    void supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUserId(data.user?.id ?? null);
      const meta: any = data.user?.user_metadata || {};
      const nextUsername =
        meta.firstName ||
        meta.first_name ||
        (data.user?.email ? data.user.email.split("@")[0] : null) ||
        null;
      setUsername(nextUsername);
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!userId) return;

    void trackNavigationActionOnce({
      userId,
      username,
      actionType: ACTION_TYPE.scrambled_chapter_opened,
      actionLabel: `${bookName} ${chapter.chapter}`,
      dedupeKey: `scrambled-chapter-view:${bookSlug}:${chapter.chapter}`,
    }).catch((error) => {
      console.error("[NAV] Failed to track Scrambled chapter view:", error);
    });
  }, [bookName, bookSlug, chapter.chapter, userId, username]);

  useEffect(() => {
    let mounted = true;

    const loadBuddyRounds = async () => {
      if (!showResults) return;

      setLoadingBuddyRounds(true);

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;

        if (!accessToken) {
          if (mounted) {
            setBuddyRounds([]);
            setLoadingBuddyRounds(false);
          }
          return;
        }

        const response = await fetch(
          `/api/scrambled-round-buddies?book=${encodeURIComponent(bookSlug)}&chapter=${chapter.chapter}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload?.error || "Could not load buddies for this chapter.");
        }

        if (mounted) {
          setBuddyRounds((payload?.buddies as ScrambledBuddyRound[]) || []);
          setLoadingBuddyRounds(false);
        }
      } catch (error) {
        console.error("Failed to load scrambled buddy rounds", error);
        if (mounted) {
          setBuddyRounds([]);
          setLoadingBuddyRounds(false);
        }
      }
    };

    void loadBuddyRounds();

    return () => {
      mounted = false;
    };
  }, [bookSlug, chapter.chapter, showResults]);

  useEffect(() => {
    if (!showResults || !userId) return;

    void trackNavigationActionOnce({
      userId,
      username,
      actionType: ACTION_TYPE.scrambled_chapter_completed,
      actionLabel: `${bookName} ${chapter.chapter} - ${solvedCount}/${chapter.questions.length}`,
      dedupeKey: `scrambled-chapter-completed:${bookSlug}:${chapter.chapter}`,
    })
      .then((logged) => {
        if (logged) {
          triggerPoints(earnedSolveCount);
        }
      })
      .catch((error) => {
        console.error("[NAV] Failed to track Scrambled chapter completion:", error);
      });
  }, [showResults, userId, username, bookName, bookSlug, chapter.chapter, chapter.questions.length, solvedCount, earnedSolveCount]);

  const visibleBuddyRounds = useMemo(() => buddyRounds.slice(0, 6), [buddyRounds]);

  const getBuddyInitials = (displayName: string) =>
    displayName
      .split(" ")
      .map((word) => word[0] || "")
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const shareScoreToGroup = async () => {
    if (shareState === "sharing" || shareState === "shared") return;

    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;

    if (!accessToken) {
      setShareState("error");
      setShareMessage("Please sign in again before sharing your score.");
      return;
    }

    setShareState("sharing");
    setShareMessage(null);

    try {
      const response = await fetch("/api/scrambled-share-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          bookSlug,
          chapter: chapter.chapter,
          score: solvedCount,
          total: chapter.questions.length,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (response.status === 429 || payload?.alreadySharedToday) {
        setShareState("limited");
        setShareMessage("You already shared a Scrambled score today.");
        return;
      }

      if (!response.ok) {
        throw new Error(payload?.error || "Could not share your score right now.");
      }

      setShareState("shared");
      setShareMessage("Your Scrambled score is now in the Bible Study Group feed.");
    } catch (error) {
      setShareState("error");
      setShareMessage(error instanceof Error ? error.message : "Could not share your score right now.");
    }
  };

  const moveToNext = () => {
    if (currentQuestionIndex === chapter.questions.length - 1) {
      setShowResults(true);
      return;
    }

    setCurrentQuestionIndex((value) => value + 1);
  };

  const markCorrect = () => {
    setSolvedCount((value) => value + 1);
    setStatus("correct");
    setCelebrateKey((value) => value + 1);
    setLouieLine(`Nice work. ${question.answer} is right.`);
    void trackSolvedWord();
  };

  const trackSolvedWord = async () => {
    if (trackedQuestionIdsRef.current.has(question.id)) {
      return;
    }

    let resolvedUserId = userId;
    let resolvedUsername = username;

    if (!resolvedUserId) {
      const { data } = await supabase.auth.getUser();
      resolvedUserId = data.user?.id ?? null;
      const meta: any = data.user?.user_metadata || {};
      resolvedUsername =
        resolvedUsername ||
        meta.firstName ||
        meta.first_name ||
        (data.user?.email ? data.user.email.split("@")[0] : null) ||
        null;

      if (resolvedUserId) {
        setUserId(resolvedUserId);
      }
      if (resolvedUsername) {
        setUsername(resolvedUsername);
      }
    }

    if (!resolvedUserId) {
      return;
    }

    trackedQuestionIdsRef.current.add(question.id);

    const response = await fetch("/api/scrambled-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      body: JSON.stringify({
        userId: resolvedUserId,
        username: resolvedUsername,
        bookName,
        bookSlug,
        chapter: chapter.chapter,
        questionId: question.id,
        answer: question.answer,
        reference: question.reference,
      }),
    });

    if (!response.ok) {
      trackedQuestionIdsRef.current.delete(question.id);
      console.error("Failed to record scrambled answer", await response.text().catch(() => ""));
      return;
    }

    const payload = (await response.json().catch(() => ({}))) as { deduped?: boolean };
    if (payload.deduped !== true) {
      setEarnedSolveCount((current) => current + 1);
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
      setLouieLine(question.clue);
      return;
    }

    const answerLetters = question.answer.toUpperCase().split("");
    const nextRevealCount = Math.min(answerLetters.length, revealedLetters + 1);
    const nextSlots = buildAnswerSlots(question.answer, nextRevealCount);
    const nextBank = buildBankTiles(question.answer, nextRevealCount);
    const revealedLetter = answerLetters[nextRevealCount - 1];
    const revealedIndex = nextRevealCount - 1;

    setHintCount((value) => value + 1);
    setRevealedLetters(nextRevealCount);
    setAnswerSlots(nextSlots);
    setBankLetters(nextBank);
    setStatus("idle");
    setLouieLine(question.clue);
    setRecentReveal((current) => ({
      index: revealedIndex,
      letter: revealedLetter,
      key: (current?.key ?? 0) + 1,
    }));

    window.setTimeout(() => {
      setRecentReveal((current) => (current?.index === revealedIndex ? null : current));
    }, 900);

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

  const highlightedSourceLine = useMemo(() => {
    const pattern = new RegExp(`(${escapeRegExp(question.answer)})`, "ig");
    const parts = question.sourceLine.split(pattern);

    return parts.map((part, index) => {
      if (part.toLowerCase() === question.answer.toLowerCase()) {
        return (
          <span key={`${question.id}-line-${index}`} className="font-bold text-[#c14e5d]">
            {part}
          </span>
        );
      }

      return <span key={`${question.id}-line-${index}`}>{part}</span>;
    });
  }, [question.answer, question.id, question.sourceLine]);

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
    const triviaRouteSlug =
      CHAPTER_BASED_TRIVIA_BOOK_CONFIG.find((entry) => entry.key === bookSlug)?.routeSlug ?? bookSlug;
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
            {earnedSolveCount > 0 ? (
              <p className="mt-3 text-sm font-semibold text-emerald-700">
                You earned +{earnedSolveCount} points for new solved words.
              </p>
            ) : (
              <p className="mt-3 text-sm text-[#496a9b]">
                No new points this run (you already earned points for these words before).
              </p>
            )}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => void shareScoreToGroup()}
              disabled={shareState === "sharing" || shareState === "shared"}
              className="rounded-2xl border border-[#d7e2f8] bg-[#eef4ff] px-4 py-3 text-sm font-semibold text-[#35508a] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {shareState === "sharing" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-[#9fb8e8] border-t-[#35508a] animate-spin" />
                  <span>Sharing to group...</span>
                </span>
              ) : shareState === "shared" ? "Score Shared" : "Share score"}
            </button>
            <Link
              href={`/bible-trivia/${triviaRouteSlug}/${chapter.chapter}`}
              className="rounded-2xl border border-[#d7e2f8] bg-white px-4 py-3 text-sm font-semibold text-[#35508a] transition hover:bg-[#fbfdff]"
            >
              Take Trivia Quiz
            </Link>
            <Link
              href={nextChapterPack ? `/bible-study-games/scrambled/${bookSlug}/${nextChapterPack.chapter}` : `/bible-study-games/scrambled/${bookSlug}/${chapter.chapter}`}
              className="rounded-2xl bg-[#4768af] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#35508a]"
            >
              {nextChapterPack ? "Play Next Chapter" : "Play Chapter Again"}
            </Link>
            <Link
              href={`/bible-study-games/scrambled/${bookSlug}`}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Back to Chapters
            </Link>
          </div>

          <div className="mt-8 rounded-[24px] border border-[#d8e4fb] bg-[#f6f9ff] px-5 py-5 text-left">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5d7fc0]">Chapter Buddies</p>
                <p className="mt-1 text-sm font-bold text-gray-900">
                  {buddyRounds.length === 0
                    ? `No buddies have finished ${bookName} ${chapter.chapter} yet.`
                    : `${buddyRounds.length} ${buddyRounds.length === 1 ? "buddy has" : "buddies have"} also finished ${bookName} ${chapter.chapter}.`}
                </p>
                <p className="mt-1 text-xs text-[#6580aa]">
                  See who has completed this chapter round and how they scored.
                </p>
              </div>
              {buddyRounds.length > visibleBuddyRounds.length ? (
                <button
                  type="button"
                  onClick={() => setShowBuddyRoundsModal(true)}
                  className="text-xs font-semibold text-[#4768af] hover:text-[#35508a] whitespace-nowrap"
                >
                  See more
                </button>
              ) : null}
            </div>

            <div className="mt-4">
              {loadingBuddyRounds ? (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="h-9 w-9 rounded-full bg-[#dfe8f8] animate-pulse" />
                  <div className="h-9 w-9 rounded-full bg-[#dfe8f8] animate-pulse" />
                  <div className="h-9 w-9 rounded-full bg-[#dfe8f8] animate-pulse" />
                  <span className="ml-2">Loading buddies...</span>
                </div>
              ) : visibleBuddyRounds.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  {visibleBuddyRounds.map((buddy) => (
                    <Link
                      key={buddy.user_id}
                      href={`/profile/${buddy.user_id}`}
                      className="group flex items-center gap-2 rounded-full border border-[#d8e4fb] bg-white pr-3 shadow-sm transition hover:bg-[#fbfdff]"
                    >
                      {buddy.profile_image_url ? (
                        <img
                          src={buddy.profile_image_url}
                          alt={buddy.display_name}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5c7fc1] text-xs font-bold text-white">
                          {getBuddyInitials(buddy.display_name)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="max-w-[100px] truncate text-xs font-semibold text-gray-800 group-hover:text-gray-900">
                          {buddy.display_name}
                        </p>
                        <p className="text-[11px] text-[#6b82ab]">
                          {buddy.score}/{buddy.total}
                        </p>
                      </div>
                    </Link>
                  ))}
                  {buddyRounds.length > visibleBuddyRounds.length ? (
                    <button
                      type="button"
                      onClick={() => setShowBuddyRoundsModal(true)}
                      className="h-9 rounded-full border border-[#d8e4fb] bg-white px-3 text-xs font-semibold text-gray-600 transition hover:bg-[#fbfdff]"
                    >
                      +{buddyRounds.length - visibleBuddyRounds.length} more
                    </button>
                  ) : null}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Once your buddies finish this chapter, they’ll show up here.
                </p>
              )}
            </div>
          </div>

          {shareMessage ? (
            <p
              className={`mt-4 text-sm ${
                shareState === "error"
                  ? "text-[#b15454]"
                  : shareState === "limited"
                    ? "text-[#9b7a30]"
                    : "text-[#496a9b]"
              }`}
            >
              {shareMessage}
            </p>
          ) : null}

          {shareState === "sharing" ? (
            <div className="mt-4 overflow-hidden rounded-full bg-[#dfe8f8]">
              <div className="h-1.5 w-full animate-[share-progress_1.2s_ease-in-out_infinite] bg-[linear-gradient(90deg,#7aa8ff_0%,#8fd9be_100%)]" />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#f5f7fb] pb-14">
        <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 pt-6 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {onClose ? (
              <button type="button" onClick={onClose} className="text-sm font-semibold text-[#4768af] hover:text-[#35508a]">
                ← Close
              </button>
            ) : (
              <Link href={`/bible-study-games/scrambled/${bookSlug}`} className="text-sm font-semibold text-[#4768af] hover:text-[#35508a]">
                Back to Chapters
              </Link>
            )}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowHelp(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#cfdcf6] bg-white text-sm font-semibold text-[#4768af] shadow-sm transition hover:bg-[#f6f9ff]"
                aria-label="How to play Scrambled"
              >
                ?
              </button>
              {!onClose && (
                <Link href={`/Bible/${bookSlug}/${chapter.chapter}`} className="text-sm font-semibold text-[#4768af] hover:text-[#35508a]">
                  Read chapter
                </Link>
              )}
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
                <p className="mt-1 text-sm font-medium text-[#5d7fc0]">{question.reference}</p>
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
                  <div key={`${question.id}-slot-${index}`} className="relative">
                    {recentReveal?.index === index ? (
                      <span
                        key={`reveal-${recentReveal.key}`}
                        className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-full bg-[#edf4ff] px-2 py-0.5 text-xs font-bold text-[#4768af] shadow-sm animate-[reveal-pop_850ms_ease-out_forwards]"
                      >
                        +{recentReveal.letter}
                      </span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => handleAnswerLetterClick(index)}
                      className={`flex h-12 w-full items-center justify-center rounded-2xl border text-lg font-bold uppercase transition ${
                        tile
                          ? tile.locked
                            ? recentReveal?.index === index
                              ? "border-[#95b5ef] bg-[#edf4ff] text-[#31528d] animate-[slot-pop_360ms_ease-out]"
                              : "border-[#bfd3f5] bg-[#edf4ff] text-[#31528d]"
                            : "border-[#d5dbe5] bg-white text-gray-900 shadow-sm"
                          : "border-[#e4e8ef] bg-[#f4f6f9] text-gray-300"
                      }`}
                    >
                      {tile?.value ?? ""}
                    </button>
                  </div>
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
                  <p className="text-sm font-semibold text-gray-900">{question.reference}</p>
                  <p className="mt-1 text-sm leading-7 text-gray-700">"{highlightedSourceLine}"</p>
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

      {showBuddyRoundsModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4" onClick={() => setShowBuddyRoundsModal(false)}>
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5d7fc0]">Chapter Buddies</p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">{bookName} {chapter.chapter}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  {buddyRounds.length} {buddyRounds.length === 1 ? "buddy has" : "buddies have"} finished this chapter round.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowBuddyRoundsModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="mt-5 max-h-[55vh] overflow-y-auto">
              {buddyRounds.length === 0 ? (
                <p className="py-6 text-center text-sm text-gray-500">No completed buddy rounds yet.</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {buddyRounds.map((buddy) => (
                    <div key={buddy.user_id} className="flex items-center gap-3 py-3">
                      {buddy.profile_image_url ? (
                        <img src={buddy.profile_image_url} alt={buddy.display_name} className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5c7fc1] text-sm font-bold text-white flex-shrink-0">
                          {getBuddyInitials(buddy.display_name)}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">{buddy.display_name}</p>
                        <p className="text-xs text-gray-500">
                          Score: {buddy.score}/{buddy.total}
                        </p>
                      </div>
                      <Link
                        href={`/profile/${buddy.user_id}`}
                        onClick={() => setShowBuddyRoundsModal(false)}
                        className="flex-shrink-0 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                      >
                        View Profile
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
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

        @keyframes slot-pop {
          0% {
            transform: scale(0.82);
          }
          55% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes reveal-pop {
          0% {
            transform: translateX(-50%) translateY(10px) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(-26px) scale(1);
            opacity: 0;
          }
        }

        @keyframes share-progress {
          0% {
            transform: translateX(-65%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(65%);
          }
        }
      `}</style>
    </>
  );
}
