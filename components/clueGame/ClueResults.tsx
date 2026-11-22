"use client";

/**
 * Round Complete (approved mockup): selection, points, right answers out of 10, Challenge, Play Again, Review Cards. Plus the Beta question:
 * did you enjoy it, and do you want another book.
 */

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import type { ClueRef } from "@/lib/clueGame/types";
import { clueSound } from "@/lib/clueGame/sound";
import type { PublicCard, PublicMatch } from "@/lib/clueGame/engine";
import { trackClue } from "@/lib/clueGame/track";

/**
 * The whole game, question by question, for after the last round: the
 * question, the four choices with the right one marked (and yours, when it
 * was wrong), the explanation, the verse, and the Bible Buddy page about it.
 */
export function ReviewList({
  cards,
  onStudy,
  onOpenRef,
  nameOf,
  youId,
}: {
  cards: PublicMatch["history"];
  onStudy: (card: PublicCard) => void;
  onOpenRef?: (ref: ClueRef) => void;
  nameOf?: (playerId: string) => string;
  /** Whose answers to mark. */
  youId?: string;
}) {
  const L = ["A", "B", "C", "D"];
  return (
    <ol className="space-y-4 text-left">
      {cards.map((c, i) => {
        const mine = youId ? c.answers[youId]?.choice : undefined;
        const right = c.quiz.correct;
        const result = c.tiebreak
          ? c.winnerId
            ? `Tiebreaker · ${nameOf ? nameOf(c.winnerId) : "Won"}`
            : "Tiebreaker · nobody got it"
          : mine === undefined
            ? "No answer · 0"
            : mine === right
              ? "Right · +1"
              : "Wrong · −1";
        const color = mine !== undefined && mine === right ? "#1d5a34" : mine !== undefined ? "#a3261b" : "#8a5a1a";
        return (
          <li key={`${c.id}-${i}`} className="bb-clue-review">
            <div className="flex items-center gap-3">

              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-black uppercase tracking-[0.12em] opacity-60">
                  {c.tiebreak ? "Tiebreaker" : `Question ${i + 1}`} · Genesis {c.quiz.chapter}
                </div>
                <div className="bb-clue-serif text-[17px] font-bold leading-snug">{c.quiz.question}</div>
                {youId ? <div className="text-[12px] font-black" style={{ color }}>{result}</div> : null}
              </div>
            </div>
            <ol className="mt-2 grid grid-cols-2 gap-1.5">
              {c.quiz.choices.map((ch, k) => (
                <li
                  key={k}
                  className="rounded-lg px-2 py-1 text-[13px] font-bold"
                  style={
                    k === right
                      ? { background: "#1d6a34", color: "#fff8de" }
                      : k === mine
                        ? { background: "#a3261b", color: "#ffe7df" }
                        : { background: "rgba(255,255,255,.5)", color: "#5a4128" }
                  }
                >
                  {L[k]}. {ch} {k === right ? "✓" : k === mine ? "✗" : ""}
                </li>
              ))}
            </ol>
            {c.quiz.explanation ? <p className="mt-2 text-[14px] leading-snug">{c.quiz.explanation}</p> : null}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
              {c.quiz.ref ? (
                onOpenRef ? (
                  <button type="button" className="bb-clue-ref" onClick={() => onOpenRef(c.quiz.ref!)}>
                    {c.quiz.ref.label}
                  </button>
                ) : (
                  <span className="bb-clue-ref">{c.quiz.ref.label}</span>
                )
              ) : null}
              {c.study ? (
                <Link className="bb-clue-link text-[14px]" href={c.study.href}>
                  {c.study.label} →
                </Link>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function ClueResults({
  deckName,
  score,
  won,
  total,
  heading = "Game Complete",
  standings,
  primary,
  secondary,
  onReview,
  mode,
}: {
  deckName: string;
  score: number;
  won: number;
  total: number;
  /** No longer drawn (no cards since the trivia version); kept so callers need not change. */
  wonCards?: PublicCard[];
  heading?: string;
  standings?: ReactNode;
  primary?: ReactNode;
  secondary?: ReactNode;
  onReview: () => void;
  mode: "solo" | "room" | "challenge";
}) {
  const [feedback, setFeedback] = useState<null | "up" | "down">(null);
  const [wantMore, setWantMore] = useState(false);
  useEffect(() => {
    clueSound.fanfare(heading !== "Game Over" && score > 0);
    // Once, when the results appear.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bb-clue-parchment bb-clue-panel text-center">
      <h2 className="bb-clue-serif bb-clue-title" style={{ color: "#2a1a0c" }}>{heading}</h2>
      <span className="bb-clue-logo-pill mx-auto inline-block" style={{ fontSize: 16, padding: "4px 22px" }}>{deckName}</span>
      <div className="mt-4 flex justify-center">
        <span className="bb-clue-pointsbadge" style={{ fontSize: 30, padding: "8px 26px" }}>⭐ {score} point{Math.abs(score) === 1 ? "" : "s"}</span>
      </div>
      <p className="bb-clue-serif mt-3 text-[22px] font-bold">
        {won} of {total} right
      </p>

      {standings ? <div className="mt-4">{standings}</div> : null}
      <div className="mt-5 flex flex-col gap-3">
        {primary}
        {secondary}
        <button type="button" onClick={onReview} className="bb-clue-link mx-auto text-[17px]">
          📖 Review all {total} questions
        </button>
      </div>
      <div className="mt-5 border-t pt-4" style={{ borderColor: "#d7b26b" }}>
        {feedback ? (
          <p className="text-[14px] font-bold">Thank you{feedback === "up" ? "!" : ". We’ll keep working on it."}</p>
        ) : (
          <div className="flex items-center justify-center gap-3 text-[14px] font-bold">
            <span>Did you enjoy this game?</span>
            <button type="button" aria-label="Yes" className="bb-clue-x" style={{ width: 40, height: 40, fontSize: 20 }} onClick={() => { setFeedback("up"); trackClue("clue_game_feedback", { mode, enjoyed: true }); }}>👍</button>
            <button type="button" aria-label="No" className="bb-clue-x" style={{ width: 40, height: 40, fontSize: 20 }} onClick={() => { setFeedback("down"); trackClue("clue_game_feedback", { mode, enjoyed: false }); }}>👎</button>
          </div>
        )}
        {wantMore ? (
          <p className="mt-2 text-[13px] font-bold">Noted. More books are on the way.</p>
        ) : (
          <button type="button" className="mt-2 text-[13px] font-bold underline" onClick={() => { setWantMore(true); trackClue("clue_game_feedback", { mode, want_more_decks: true }); }}>
            I want more books like this
          </button>
        )}
      </div>
    </div>
  );
}
