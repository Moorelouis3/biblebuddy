"use client";

/**
 * Chapter trivia, wherever the app offers it: after a chapter in the Bible
 * reader, as a study-guide day's task, on the dashboard and in Bible in One
 * Year.
 *
 * Since 2026-11-23 this plays the new Bible Trivia game (the Bible Clue game,
 * renamed; components/clueGame/ChapterTrivia.tsx) on that chapter's
 * questions, full screen, Easy, Medium or Hard. The old five-question quiz is
 * gone; its questions live on in the new game's bank
 * (scripts/trivia-import-old.ts).
 *
 * What stays exactly as it was, because other screens read it:
 *  - the props, so every caller is unchanged;
 *  - trivia_chapter_completed, label "{Book} {chapter} - {right}/{total}",
 *    deduped per book and chapter: study-guide days count as done on it, and
 *    Bible in One Year, badges and the admin reports read it;
 *  - every answer to /api/trivia-answer (trivia_question_answered /
 *    trivia_question_correct, the XP per first right answer, profile_stats);
 *  - trivia_started through /api/consume-credit when a game starts;
 *  - the XP pop and Louis's Scrambled suggestion afterwards;
 *  - onComplete once the completion is saved, then onClose.
 */

import { useCallback, useRef, useState } from "react";
import { triggerPoints } from "@/components/PointsPop";
import { TASK_XP } from "@/lib/progressionRewards";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
import type { TriviaChapterPack } from "@/lib/triviaGameData";
import { CHAPTER_BASED_TRIVIA_BOOK_CONFIG } from "@/lib/triviaCatalog";
import { trackNavigationActionOnce } from "@/lib/navigationActionTracker";
import { dispatchLouisMoment } from "@/lib/louisMoments";
import { BOOK_INDEX, MIN_ROUND } from "@/lib/clueGame/bank";
import { CLUE_LEVELS, LEVEL_LABEL, type ClueLevel } from "@/lib/clueGame/types";
import ChapterTrivia, { type ChapterTriviaResult } from "@/components/clueGame/ChapterTrivia";

type TriviaGamePlayerProps = {
  bookName: string;
  bookSlug: string;
  chapter: TriviaChapterPack;
  onClose?: () => void;
  onComplete?: () => void;
  /** Kept for callers; trivia is free for everyone. */
  skipUpgradeGate?: boolean;
  compact?: boolean;
  enableDashboardSkip?: boolean;
  hideSkipButton?: boolean;
};

/** The old trivia's route slug → the game's book id (only Song of Songs differs). */
const gameBook = (routeSlug: string) => (routeSlug === "song-of-songs" ? "song-of-solomon" : routeSlug);

export default function TriviaGamePlayer({ bookName, bookSlug, chapter, onClose, onComplete, compact = false }: TriviaGamePlayerProps) {
  const chapterNumber = chapter?.chapter ?? 1;
  const book = gameBook(bookSlug);
  const bookKey = CHAPTER_BASED_TRIVIA_BOOK_CONFIG.find((entry) => entry.routeSlug === bookSlug)?.key ?? bookSlug;
  const counts = BOOK_INDEX[book]?.chapters?.[chapterNumber] ?? [0, 0, 0];
  const [playing, setPlaying] = useState<ClueLevel | null>(null);
  const [last, setLast] = useState<ChapterTriviaResult | null>(null);
  const completed = useRef(false);

  const start = (level: ClueLevel) => {
    setPlaying(level);
    // The same "trivia started" record the old quiz made.
    void fetch("/api/consume-credit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actionType: ACTION_TYPE.trivia_started }),
    }).catch(() => null);
  };

  const finish = useCallback(
    async (r: ChapterTriviaResult) => {
      setLast(r);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const meta = (user.user_metadata ?? {}) as Record<string, string | undefined>;
      const username = meta.firstName || meta.first_name || (user.email ? user.email.split("@")[0] : null) || "User";

      // Every answer, as the old quiz recorded them (XP for a first right answer).
      let earned = 0;
      for (const a of r.answers) {
        try {
          const res = await fetch("/api/trivia-answer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, questionId: a.id, username, isCorrect: a.correct, book: chapter?.progressKey ?? `${bookKey}:${chapterNumber}` }),
          });
          const payload = (await res.json().catch(() => ({}))) as { awardedPoint?: boolean };
          if (payload.awardedPoint) earned += 1;
        } catch {}
      }

      if (!completed.current) {
        try {
          const logged = await trackNavigationActionOnce({
            userId: user.id,
            actionType: ACTION_TYPE.trivia_chapter_completed,
            actionLabel: `${bookName} ${chapterNumber} - ${r.right}/${r.total}`,
            dedupeKey: `trivia-chapter-completed:${bookKey}:${chapterNumber}`,
          });
          completed.current = true;
          if (logged) triggerPoints(Math.round(earned * (TASK_XP.triviaPerfect / Math.max(r.total, 1))));
          onComplete?.();
        } catch (error) {
          console.error("[NAV] Failed to track Trivia chapter completion:", error);
        }
      }

      dispatchLouisMoment({
        message:
          r.right === r.total
            ? `Nice work. You just finished trivia for ${bookName} ${chapterNumber} and got a perfect score.\n\nIf you want to lock this chapter in even more, Scrambled is the best next move.\n\nDo you want to play it now?`
            : `Nice work. You just finished trivia for ${bookName} ${chapterNumber} and got ${r.right} out of ${r.total}.\n\nIf you want to keep the momentum going, Scrambled is the best next move.\n\nDo you want to play it now?`,
        replies: [
          { id: `trivia-scrambled-${bookKey}-${chapterNumber}`, label: "Yes", href: `/bible-study-games/scrambled/${bookKey}/${chapterNumber}` },
          { id: `trivia-scrambled-no-${bookKey}-${chapterNumber}`, label: "No", message: "No problem.\n\nIf you want to come back to Scrambled later, I will be here." },
        ],
      });
    },
    [bookKey, bookName, chapter?.progressKey, chapterNumber, onComplete],
  );

  const playable = CLUE_LEVELS.filter((lv, i) => (counts[i] || 0) >= MIN_ROUND);

  return (
    <div className={compact ? "px-1 py-2" : "px-4 py-6"}>
      <div
        className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-[#d9a843] text-center shadow-[0_10px_24px_-12px_rgba(60,30,5,0.55)]"
        style={{ background: "linear-gradient(180deg, #2a170b, #3b2412)" }}
      >
        <div className="px-5 pb-5 pt-4">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-[#1d5a37] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#fff3cf]">
            <span aria-hidden>❓</span> Bible Trivia
          </p>
          <h2 className="mt-2 font-serif text-[24px] font-black leading-tight" style={{ color: "#fff1c9" }}>
            {bookName} {chapterNumber}
          </h2>
          <p className="mt-1 text-[14px] font-semibold" style={{ color: "#f3e6cc" }}>
            How well do you know this chapter? Up to 10 questions, 10 seconds each.
          </p>
          {last ? (
            <p className="mt-3 rounded-xl px-3 py-2 text-[15px] font-black" style={{ background: "rgba(29,90,55,.85)", color: "#fff3cf" }}>
              {last.right === last.total ? `Perfect! ${last.right}/${last.total}` : `You got ${last.right} of ${last.total} right`}. Play again or try a harder level.
            </p>
          ) : null}
          {playable.length ? (
            <div className="mt-4 grid gap-2">
              {CLUE_LEVELS.map((lv, i) => {
                const ok = (counts[i] || 0) >= MIN_ROUND;
                return (
                  <button
                    key={lv}
                    type="button"
                    disabled={!ok}
                    onClick={() => start(lv)}
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full text-[17px] font-black transition active:scale-[0.98] disabled:opacity-45"
                    style={{ color: "#fff7dd", background: ok ? "linear-gradient(180deg, #34a35a, #1d6a34)" : "#5a4630", boxShadow: "inset 0 0 0 2px #f6d36b" }}
                  >
                    {ok ? `▶ ${LEVEL_LABEL[lv]}` : `${LEVEL_LABEL[lv]} · coming soon`}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 text-[15px] font-bold" style={{ color: "#f3e6cc" }}>
              Questions for this chapter are being written. Check back soon.
            </p>
          )}
          {onClose ? (
            <button type="button" onClick={onClose} className="mt-3 text-[14px] font-bold underline" style={{ color: "#f3e6cc" }}>
              {last ? "Done" : "Not now"}
            </button>
          ) : null}
        </div>
      </div>
      {playing ? (
        <ChapterTrivia
          book={book}
          bookName={bookName}
          chapter={chapterNumber}
          level={playing}
          onFinish={(r) => void finish(r)}
          onExit={() => setPlaying(null)}
        />
      ) : null}
    </div>
  );
}
