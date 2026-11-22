"use client";

/**
 * Round Complete (approved mockup): deck, points, cards won out of 10, a fan
 * of won cards, Challenge, Play Again, Review Cards. Plus the Beta question:
 * did you enjoy it, and do you want another book.
 */

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import type { ClueRef } from "@/lib/clueGame/types";
import { clueSound } from "@/lib/clueGame/sound";
import type { PublicCard, PublicMatch } from "@/lib/clueGame/engine";
import { SubjectArt } from "./ClueParts";
import { trackClue } from "@/lib/clueGame/track";

/**
 * The whole game, round by round, for after the last card (Louis: "a full
 * list of the rounds and all the clues with more info links"): the picture,
 * the answer, who won it, all five clues with their verses, and the link to
 * the Bible Buddy page about it. The table itself only ever shows the clue
 * in play.
 */
export function ReviewList({
  cards,
  onStudy,
  onOpenRef,
  nameOf,
}: {
  cards: PublicMatch["history"];
  onStudy: (card: PublicCard) => void;
  onOpenRef?: (ref: ClueRef) => void;
  nameOf?: (sideId: string) => string;
}) {
  return (
    <ol className="space-y-4 text-left">
      {cards.map((c, i) => (
        <li key={`${c.id}-${i}`} className="bb-clue-review">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => onStudy(c)} className="bb-clue-thumb is-color" style={{ width: 64 }} aria-label={`Study ${c.answer}`}>
              <SubjectArt card={c} mode="reveal" />
            </button>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-black uppercase tracking-[0.12em] opacity-60">Round {i + 1}</div>
              <div className="bb-clue-serif text-[20px] font-bold leading-tight">{c.answer}</div>
              <div className="text-[12px] font-black" style={{ color: c.outcome === "won" ? "#1d5a34" : "#8a5a1a" }}>
                {c.outcome === "won" ? `${c.sideId && nameOf ? nameOf(c.sideId) : "Won"} · +${c.points}` : "Nobody got it"}
              </div>
            </div>
          </div>
          <ol className="mt-2 space-y-1">
            {(c.clues || []).map((clue, k) => (
              <li key={k} className="bb-clue-studyclue">
                <span className="bb-clue-pts">{5 - k}</span>
                <span className="min-w-0">
                  {clue.text}{" "}
                  {onOpenRef ? (
                    <button type="button" className="bb-clue-ref" onClick={() => onOpenRef(clue.ref)}>
                      {clue.ref.label}
                    </button>
                  ) : (
                    <span className="bb-clue-ref">{clue.ref.label}</span>
                  )}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <button type="button" className="bb-clue-link text-[14px]" onClick={() => onStudy(c)}>📖 Teaching note</button>
            {c.study ? (
              <Link className="bb-clue-link text-[14px]" href={c.study.href}>
                {c.study.label} →
              </Link>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ClueResults({
  deckName,
  score,
  won,
  total,
  wonCards,
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
  wonCards: PublicCard[];
  heading?: string;
  standings?: ReactNode;
  primary?: ReactNode;
  secondary?: ReactNode;
  onReview: () => void;
  mode: "solo" | "room" | "challenge";
}) {
  const [feedback, setFeedback] = useState<null | "up" | "down">(null);
  const [wantMore, setWantMore] = useState(false);
  const fan = wonCards.slice(-3);
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
        {won} of {total} rounds won
      </p>
      {fan.length ? (
        <div className="mt-3 flex items-end justify-center">
          {fan.map((c, i) => (
            <div
              key={`${c.id}-${i}`}
              className="bb-clue-thumb is-color"
              style={{ width: 84, transform: `rotate(${(i - (fan.length - 1) / 2) * 9}deg) translateY(${i === Math.floor(fan.length / 2) ? -8 : 0}px)`, margin: "0 -6px" }}
            >
              <SubjectArt card={c} mode="reveal" />
            </div>
          ))}
        </div>
      ) : null}
      {standings ? <div className="mt-4">{standings}</div> : null}
      <div className="mt-5 flex flex-col gap-3">
        {primary}
        {secondary}
        <button type="button" onClick={onReview} className="bb-clue-link mx-auto text-[17px]">
          📖 Review all 10 rounds
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
