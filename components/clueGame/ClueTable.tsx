"use client";

/**
 * The Bible Clue Game table. One component for solo, private rooms and
 * challenges: it draws a PublicMatch (lib/clueGame/engine.ts publicView),
 * which never holds the current card's answer before the reveal, and calls
 * back with what the player did. Solo makes the PublicMatch on the device;
 * a room gets it from the server.
 *
 * Layout from Louis's approved mockups (2026-11-22): warm room, oval green
 * felt with players seated round it (photo or initials, score, won pile), the
 * deck back as the draw pile, one 5:7 card, and the clue and guess in a
 * separate parchment panel below. Deal, flip and award are animated in CSS
 * and switched off for reduced motion. The next card deals itself.
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { PublicCard, PublicMatch } from "@/lib/clueGame/engine";
import { Avatar, CardBack, CATEGORY_LABEL, PlayingCard, SubjectArt } from "./ClueParts";
import { clueSound } from "@/lib/clueGame/sound";

export type TablePlayer = { id: string; name: string; avatar?: string | null };

/** Seat positions round the oval, as % of the felt. "You" always sit at the bottom. */
function seatSpots(count: number): Array<{ x: number; y: number }> {
  if (count <= 0) return [];
  const spots = [{ x: 50, y: 92 }];
  const others = count - 1;
  for (let i = 0; i < others; i += 1) {
    // Spread across the top arc, from left to right.
    const t = others === 1 ? 0.5 : i / (others - 1);
    const angle = Math.PI * (1.05 + 0.9 * t); // ~190° .. ~350°
    spots.push({ x: 50 + 44 * Math.cos(angle), y: 52 + 42 * Math.sin(angle) + (others > 3 ? 4 : 0) });
  }
  return spots;
}

export default function ClueTable({
  view,
  players,
  youId,
  now,
  cardBack,
  onGuess,
  onWait,
  onStudy,
  isHost,
  onPause,
  onResume,
}: {
  view: PublicMatch;
  players: TablePlayer[];
  youId: string;
  /** Server-adjusted clock. */
  now: number;
  cardBack?: string;
  onGuess: (text: string) => void;
  onWait: () => void;
  onStudy: (card: PublicCard) => void;
  isHost?: boolean;
  onPause?: () => void;
  onResume?: () => void;
}) {
  const [guess, setGuess] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const feltRef = useRef<HTMLDivElement | null>(null);
  const round = view.round;
  const card = round?.card ?? null;
  const revealed = view.phase === "reveal" && !!round?.outcome;
  const paused = view.pausedAt !== null;

  // You first (bottom seat), then everyone else in join order.
  const seated = useMemo(() => {
    const me = players.find((p) => p.id === youId);
    return [...(me ? [me] : []), ...players.filter((p) => p.id !== youId)];
  }, [players, youId]);
  const spots = seatSpots(seated.length);

  const at = paused && view.pausedAt ? view.pausedAt : now;
  const clueMsLeft = round && view.phase === "clue" ? Math.max(0, round.clueStartedAt + view.settings.clueSeconds * 1000 - at) : 0;
  const dealMsLeft = round?.revealedAt && view.phase === "reveal" ? Math.max(0, round.revealedAt + view.settings.revealSeconds * 1000 - at) : 0;
  const seconds = Math.ceil(clueMsLeft / 1000);
  const myGuesses = round?.guesses?.[youId] || 0;
  const canGuess = view.phase === "clue" && !paused && myGuesses < view.settings.guessesPerClue && clueMsLeft > 0;
  const waiting = !!round?.waiting?.includes(youId);
  const points = round ? 5 - round.clueIndex : 0;

  // Keep the guess box in focus as clues change (and in view above the phone keyboard).
  const clueKey = round ? `${view.dealt}:${round.clueIndex}` : "";
  useEffect(() => {
    if (canGuess) inputRef.current?.focus({ preventScroll: true });
  }, [clueKey, canGuess]);

  // Send the won card flying to the winner's seat, just before the next deal.
  const [award, setAward] = useState<{ dx: number; dy: number } | null>(null);
  const winnerSeat = round?.outcome?.kind === "won" ? seated.findIndex((p) => p.id === round.outcome!.sideId) : -1;
  const flyNow = revealed && winnerSeat >= 0 && dealMsLeft > 0 && dealMsLeft < 900;
  useLayoutEffect(() => {
    if (!flyNow) {
      setAward(null);
      return;
    }
    const felt = feltRef.current?.getBoundingClientRect();
    const spot = spots[winnerSeat];
    if (!felt || !spot) return;
    setAward({ dx: ((spot.x - 50) / 100) * felt.width, dy: ((spot.y - 50) / 100) * felt.height });
    // spots is derived from seated; winnerSeat/flyNow are the triggers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyNow, winnerSeat]);

  // Sounds, from what changed on the table (the same for solo and rooms).
  const heard = useRef({ dealt: view.dealt, clue: round?.clueIndex ?? -1, phase: view.phase, tick: 0, wrongAt: 0 });
  useEffect(() => {
    const h = heard.current;
    if (view.dealt !== h.dealt && view.phase === "clue") clueSound.deal();
    else if (view.phase === "clue" && round && round.clueIndex > h.clue && view.dealt === h.dealt) clueSound.clue();
    if (view.phase === "reveal" && h.phase !== "reveal" && round?.outcome) {
      clueSound.flip();
      if (round.outcome.kind === "won") (round.outcome.sideId === youId ? clueSound.correct : clueSound.otherWon)();
      else clueSound.missed();
    }
    const mine = view.recentWrong.filter((w) => w.playerId === youId && w.at > h.wrongAt);
    if (mine.length) {
      clueSound.wrong();
      h.wrongAt = mine[mine.length - 1].at;
    }
    h.dealt = view.dealt;
    h.clue = round?.clueIndex ?? -1;
    h.phase = view.phase;
  }, [view.dealt, view.phase, round, view.recentWrong, youId]);
  useEffect(() => {
    if (view.phase !== "clue" || paused || seconds > 3 || seconds < 1) return;
    if (heard.current.tick === seconds + (round?.clueIndex ?? 0) * 100 + view.dealt * 1000) return;
    heard.current.tick = seconds + (round?.clueIndex ?? 0) * 100 + view.dealt * 1000;
    clueSound.tick(seconds === 1);
  }, [seconds, view.phase, paused, round?.clueIndex, view.dealt]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!guess.trim() || !canGuess) return;
    onGuess(guess.trim());
    setGuess("");
  };

  const previous = round ? round.shownClues.slice(0, view.phase === "clue" ? round.clueIndex : 0) : [];
  const currentClue = round && view.phase === "clue" ? round.shownClues[round.clueIndex] : "";
  const keyRef = card?.clues?.[4]?.ref ?? card?.clues?.[0]?.ref;
  const winnerName = round?.outcome?.kind === "won" ? players.find((p) => p.id === round.outcome!.sideId)?.name : null;

  return (
    <div>
      {/* The table */}
      <div ref={feltRef} className="bb-clue-felt">
        {seated.map((p, i) => {
          const spot = spots[i];
          const score = view.scores[p.id] ?? 0;
          const pile = view.piles[p.id]?.length ?? 0;
          return (
            <div key={p.id} className={`bb-clue-seat ${p.id === youId ? "is-you" : ""}`} style={{ left: `${spot.x}%`, top: `${spot.y}%` }}>
              <Avatar name={p.name} src={p.avatar} size={seated.length > 4 ? 40 : 48} />
              <div className="bb-clue-seatplate">
                <span className="max-w-[84px] truncate">{p.id === youId && seated.length > 1 ? "You" : p.name}</span>
                <span>⭐ {score}</span>
                <span className="bb-clue-pilecount" title="Cards won">{pile}</span>
              </div>
            </div>
          );
        })}

        <div className="bb-clue-center">
          {card ? (
            <div
              key={view.dealt}
              className={`bb-clue-deal ${award ? "bb-clue-award" : ""}`}
              style={award ? ({ ["--dx" as string]: `${award.dx}px`, ["--dy" as string]: `${award.dy}px` } as React.CSSProperties) : undefined}
            >
              <PlayingCard card={card} face={revealed ? "reveal" : "mystery"} back={cardBack} />
            </div>
          ) : (
            <div className="bb-clue-card" aria-hidden="true" />
          )}
          <div className="bb-clue-drawpile" aria-label={`${Math.max(0, view.deckSize - view.dealt)} cards left`}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ transform: `translate(${i * 3}px, ${-i * 3}px)` }}>
                <CardBack src={cardBack} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-9 flex items-center justify-center gap-2 text-[13px] font-black" style={{ color: "#fff1c9" }}>
        <span className="bb-clue-logo-badge" style={{ marginTop: 0 }}>
          Card {Math.max(1, view.dealt)} of {view.deckSize}
        </span>
        {isHost && view.phase !== "over" ? (
          <button type="button" className="bb-clue-logo-badge" style={{ marginTop: 0 }} onClick={paused ? onResume : onPause}>
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>
        ) : null}
      </div>

      {/* The clue and guess panel */}
      {round && card ? (
        <div className="bb-clue-panel bb-clue-parchment">
          {paused ? (
            <p className="bb-clue-serif py-6 text-center text-xl font-bold">Paused by the host. Talk it over!</p>
          ) : view.phase === "clue" ? (
            <>
              <div className="flex items-center gap-3">
                <div className="bb-clue-thumb" style={{ width: 64 }}>
                  <SubjectArt card={card} mode="mystery" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                  <span className="bb-clue-pointsbadge">⭐ {points} point{points === 1 ? "" : "s"}</span>
                  <span className={`bb-clue-timerpill ${seconds <= 3 ? "is-final" : ""}`} aria-live="polite">
                    ⏱ 0:{String(seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-[0.14em] opacity-70">{CATEGORY_LABEL[card.category]}</span>
                </div>
              </div>
              {previous.length ? (
                <ol className="mt-3 space-y-1 text-[13px] leading-snug opacity-70">
                  {previous.map((t, i) => (
                    <li key={i}>
                      <b>{5 - i}.</b> {t}
                    </li>
                  ))}
                </ol>
              ) : null}
              <p key={clueKey} className="bb-clue-cluetext mt-3 bb-clue-fadein">
                {currentClue}
              </p>
              <form onSubmit={submit} className="mt-3 flex gap-2">
                <input
                  ref={inputRef}
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onFocus={(e) => window.setTimeout(() => e.target.scrollIntoView({ block: "center", behavior: "smooth" }), 250)}
                  disabled={!canGuess}
                  placeholder={canGuess ? "Your guess…" : waiting ? "Waiting for the next clue…" : "Next clue coming…"}
                  className="bb-clue-input"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="words"
                  spellCheck={false}
                  enterKeyHint="go"
                  aria-label="Your guess"
                />
                <button type="submit" className="bb-clue-btn bb-clue-btn-green" disabled={!guess.trim() || !canGuess}>
                  Guess
                </button>
              </form>
              <button type="button" onClick={onWait} className="bb-clue-wait" disabled={waiting || !canGuess}>
                {round.clueIndex < 4 ? "Wait for the next clue (free)" : "I don’t know (free)"}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="bb-clue-thumb is-color" style={{ width: 96 }}>
                <SubjectArt card={card} mode="reveal" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center">
                <h2 className="bb-clue-serif bb-clue-title" style={{ fontSize: "clamp(26px,7vw,34px)" }}>{card.answer}</h2>
                {keyRef ? <span className="bb-clue-refpill">{keyRef.label}</span> : null}
                <p className="text-[13px] font-black" style={{ color: round.outcome?.kind === "won" ? "#1d5a34" : "#8a5a1a" }}>
                  {round.outcome?.kind === "won"
                    ? `${round.outcome.sideId === youId ? "You" : winnerName || "A player"} won it · +${round.outcome.points}`
                    : "Nobody got this one."}
                </p>
                <button type="button" className="bb-clue-link text-[15px]" onClick={() => onStudy(card)}>
                  📖 Study This Card
                </button>
              </div>
            </div>
          )}
          {view.phase === "reveal" && !paused ? (
            <div className="mt-3">
              <p className="bb-clue-serif text-center text-[15px] italic">
                {view.dealt >= view.deckSize ? "Last card!" : `Dealing in ${Math.max(1, Math.ceil(dealMsLeft / 1000))}…`}
              </p>
              <div className="bb-clue-progress mt-1.5">
                <span style={{ transform: `scaleX(${1 - dealMsLeft / (view.settings.revealSeconds * 1000)})` }} />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
