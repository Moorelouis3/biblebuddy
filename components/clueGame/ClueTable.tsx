"use client";

/**
 * The Bible Clue Game table. One component for solo, private rooms and
 * challenges: it draws a PublicMatch (lib/clueGame/engine.ts publicView),
 * which never holds the current card's answer before the reveal, and calls
 * back with what the player did. Solo makes the PublicMatch on the device;
 * a room gets it from the server.
 *
 * Layout (Louis, 2026-11-22: "it should feel like I'm sitting down at a
 * spades game table and not leaving to go to other rooms for information"):
 * one screen. The felt fills it; every player stays seated round its edge the
 * whole game (photo, name, score, won pile); everything that happens - the
 * deal, the card, the clue and timer, the answers, the reveal, the points
 * flying to a seat, even the final results - happens on the green in the
 * middle. Your guess box is docked at your seat like the hand you hold.
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { INTRO_DEAL_EACH_MS, INTRO_SHUFFLE_MS, ROUND_INTRO_MS, type PublicCard, type PublicMatch } from "@/lib/clueGame/engine";
import { Avatar, CardBack, PlayingCard } from "./ClueParts";
import { clueSound } from "@/lib/clueGame/sound";

export type TablePlayer = { id: string; name: string; avatar?: string | null };

/**
 * Seats round a portrait table, as % of the stage. You always sit at the
 * bottom; the others fill the sides and the top like players at a card table.
 */
function seatSpots(count: number): Array<{ x: number; y: number }> {
  const you = { x: 50, y: 88 };
  const layouts: Record<number, Array<{ x: number; y: number }>> = {
    0: [],
    1: [{ x: 50, y: 7 }],
    2: [{ x: 22, y: 9 }, { x: 78, y: 9 }],
    3: [{ x: 11, y: 42 }, { x: 50, y: 7 }, { x: 89, y: 42 }],
    4: [{ x: 11, y: 50 }, { x: 25, y: 10 }, { x: 75, y: 10 }, { x: 89, y: 50 }],
    5: [{ x: 11, y: 56 }, { x: 13, y: 22 }, { x: 50, y: 7 }, { x: 87, y: 22 }, { x: 89, y: 56 }],
  };
  return [you, ...(layouts[Math.min(5, Math.max(0, count - 1))] || [])].slice(0, count);
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
  overlay,
  roundLabel,
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
  /** Shown on the felt instead of the card (the final results), seats still round it. */
  overlay?: ReactNode;
  /** Shown top centre of the felt, e.g. the deck name. */
  roundLabel?: string;
}) {
  const [guess, setGuess] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const feltRef = useRef<HTMLDivElement | null>(null);
  const round = view.round;
  const card = round?.card ?? null;
  const revealed = (view.phase === "reveal" || view.phase === "over") && !!round?.outcome;
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
  const seconds = Math.min(view.settings.clueSeconds, Math.ceil(clueMsLeft / 1000));
  // The game's opening: shuffle, then the game's cards dealt onto the pile.
  const introLeft = view.dealt === 1 && round && view.phase === "clue" && !paused ? round.clueStartedAt - at : 0;
  const inIntro = introLeft > 0;
  const introElapsed = ROUND_INTRO_MS - introLeft;
  const shuffling = inIntro && introElapsed < INTRO_SHUFFLE_MS;
  const introPile = inIntro && !shuffling ? Math.min(view.deckSize, Math.floor((introElapsed - INTRO_SHUFFLE_MS) / INTRO_DEAL_EACH_MS) + 1) : 0;
  const dealingDone = inIntro && introPile >= view.deckSize;
  const myGuesses = round?.guesses?.[youId] || 0;
  const maxRoundGuesses = view.settings.guessesPerRound ?? 2;
  const roundLeft = Math.max(0, maxRoundGuesses - (round?.roundGuesses?.[youId] || 0));
  const canGuess = view.phase === "clue" && !paused && !inIntro && myGuesses < view.settings.guessesPerClue && roundLeft > 0 && clueMsLeft > 0;
  const waiting = !!round?.waiting?.includes(youId);
  const points = round ? 5 - round.clueIndex : 0;

  // Keep the guess box in focus as clues change.
  const clueKey = round ? `${view.dealt}:${round.clueIndex}` : "";
  useEffect(() => {
    if (canGuess) inputRef.current?.focus({ preventScroll: true });
  }, [clueKey, canGuess]);

  // The face-down cover on a newly dealt card is taken away after its flip,
  // even if a device never runs the animation, so the silhouette always shows.
  const [uncovered, setUncovered] = useState(0);
  const hasRound = !!round;
  useEffect(() => {
    if (inIntro || !hasRound) return;
    const id = window.setTimeout(() => setUncovered(view.dealt), 1100);
    return () => window.clearTimeout(id);
  }, [view.dealt, inIntro, hasRound]);

  // Send the won card flying to the winner's seat, just before the next deal.
  const [award, setAward] = useState<{ dx: number; dy: number } | null>(null);
  const winnerSeat = round?.outcome?.kind === "won" ? seated.findIndex((p) => p.id === round.outcome!.sideId) : -1;
  const flyNow = view.phase === "reveal" && winnerSeat >= 0 && dealMsLeft > 0 && dealMsLeft < 900;
  const vectorTo = (index: number) => {
    const felt = feltRef.current?.getBoundingClientRect();
    const spot = spots[index];
    if (!felt || !spot) return null;
    // The card sits at about 30% down the stage.
    return { dx: ((spot.x - 50) / 100) * felt.width, dy: ((spot.y - 30) / 100) * felt.height };
  };
  useLayoutEffect(() => {
    if (!flyNow) {
      setAward(null);
      return;
    }
    const v = vectorTo(winnerSeat);
    if (v) setAward(v);
    // spots/vectorTo derive from seated; winnerSeat/flyNow are the triggers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyNow, winnerSeat]);

  // Points popping out of the table and flying to a seat, and the seat's
  // score plate bouncing when it changes.
  const [pops, setPops] = useState<Array<{ id: number; text: string; kind: "win" | "lose"; dx: number; dy: number; seat: string }>>([]);
  const popId = useRef(0);
  const pop = (text: string, kind: "win" | "lose", playerId: string) => {
    const index = seated.findIndex((p) => p.id === playerId);
    const v = vectorTo(index);
    if (!v) return;
    const id = (popId.current += 1);
    setPops((list) => [...list, { id, text, kind, seat: playerId, ...v }]);
    window.setTimeout(() => setPops((list) => list.filter((p) => p.id !== id)), 1900);
  };

  // Sounds, from what changed on the table (the same for solo and rooms).
  // Wrong guesses already on the table when it first draws are old news.
  const heard = useRef({ dealt: view.dealt, clue: round?.clueIndex ?? -1, phase: view.phase, tick: 0, wrongAt: view.recentWrong.length ? view.recentWrong[view.recentWrong.length - 1].at : 0 });
  useEffect(() => {
    const h = heard.current;
    if (view.dealt !== h.dealt && view.phase === "clue" && !(view.dealt === 1 && inIntro)) clueSound.deal();
    else if (view.phase === "clue" && round && round.clueIndex > h.clue && view.dealt === h.dealt) clueSound.clue();
    if (view.phase === "reveal" && h.phase !== "reveal" && round?.outcome) {
      clueSound.flip();
      if (round.outcome.kind === "won") {
        if (round.outcome.sideId === youId) {
          clueSound.correct();
          window.setTimeout(() => clueSound.cheer(), 250);
        } else clueSound.otherWon();
        pop(`+${round.outcome.points}`, "win", round.outcome.sideId);
      } else {
        clueSound.missed();
        window.setTimeout(() => clueSound.aww(), 150);
      }
    }
    // Wrong guesses from anyone at the table: the minus pops at their seat;
    // your own also buzzes and the room groans.
    const fresh = view.recentWrong.filter((w) => w.at > h.wrongAt);
    if (fresh.length) {
      for (const w of fresh) pop(`−${w.points}`, "lose", w.playerId);
      if (fresh.some((w) => w.playerId === youId)) {
        clueSound.wrong();
        window.setTimeout(() => clueSound.aww(), 180);
      }
      h.wrongAt = fresh[fresh.length - 1].at;
    }
    h.dealt = view.dealt;
    h.clue = round?.clueIndex ?? -1;
    h.phase = view.phase;
    // The first card's deal sound waits for the opening to finish.
    if (view.dealt === 1 && inIntro) h.dealt = 0;
    // pop/vectorTo read the latest seats; the view is what triggers this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.dealt, view.phase, round, view.recentWrong, youId, inIntro]);
  // Opening sounds: one riffle, then a flick per card onto the pile.
  const introHeard = useRef({ shuffled: false, pile: 0 });
  useEffect(() => {
    if (!inIntro) return;
    const h = introHeard.current;
    if (shuffling && !h.shuffled) {
      h.shuffled = true;
      clueSound.shuffle();
    }
    if (introPile > h.pile) {
      h.pile = introPile;
      clueSound.dealCard();
    }
  }, [inIntro, shuffling, introPile]);
  useEffect(() => {
    if (view.phase !== "clue" || paused || inIntro || seconds > 3 || seconds < 1) return;
    if (heard.current.tick === seconds + (round?.clueIndex ?? 0) * 100 + view.dealt * 1000) return;
    heard.current.tick = seconds + (round?.clueIndex ?? 0) * 100 + view.dealt * 1000;
    clueSound.tick(seconds === 1);
  }, [seconds, view.phase, paused, inIntro, round?.clueIndex, view.dealt]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!guess.trim() || !canGuess) return;
    onGuess(guess.trim());
    setGuess("");
  };

  const currentClue = round && view.phase === "clue" ? round.shownClues[round.clueIndex] : "";
  const keyRef = card?.clues?.[4]?.ref ?? card?.clues?.[0]?.ref;
  const winnerName = round?.outcome?.kind === "won" ? players.find((p) => p.id === round.outcome!.sideId)?.name : null;
  const pileLeft = inIntro ? (shuffling ? 0 : introPile) : Math.max(0, view.deckSize - view.dealt);
  const over = view.phase === "over";

  return (
    <div className="bb-ct">
      {/* The table: everything happens here */}
      <div ref={feltRef} className="bb-ct-stage">
        <div className="bb-ct-felt" aria-hidden="true" />

        {/* Round and host controls, top of the felt */}
        <div className="bb-ct-topbar">
          <span className="bb-ct-roundpill">{over ? "Game over" : `Round ${Math.max(1, view.dealt)} of ${view.deckSize}`}</span>
          {roundLabel ? <span className="bb-ct-decklabel">{roundLabel}</span> : null}
          {isHost && !over ? (
            <button type="button" className="bb-ct-roundpill is-button" onClick={paused ? onResume : onPause}>
              {paused ? "▶ Resume" : "⏸ Pause"}
            </button>
          ) : null}
        </div>

        {/* The seats, always in view */}
        {seated.map((p, i) => {
          const spot = spots[i];
          const score = view.scores[p.id] ?? 0;
          const pile = view.piles[p.id]?.length ?? 0;
          const leading = over && view.winnerSideIds.includes(p.id);
          return (
            <div
              key={p.id}
              className={`bb-clue-seat ${p.id === youId ? "is-you" : ""} ${pops.some((x) => x.seat === p.id && x.kind === "win") ? "is-scored" : ""} ${pops.some((x) => x.seat === p.id && x.kind === "lose") ? "is-docked" : ""} ${leading ? "is-winner" : ""}`}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              {leading ? <span className="bb-ct-crown" aria-label="Winner">👑</span> : null}
              <Avatar name={p.name} src={p.avatar} size={seated.length > 4 ? 42 : 50} />
              <div className="bb-clue-seatplate">
                <span className="max-w-[76px] truncate">{p.id === youId && seated.length > 1 ? "You" : p.name}</span>
                <span>⭐ {score}</span>
                <span className="bb-clue-pilecount" title="Cards won">{pile}</span>
              </div>
            </div>
          );
        })}

        {pops.map((p) => (
          <span
            key={p.id}
            className={`bb-clue-pop ${p.kind === "win" ? "is-win" : "is-lose"}`}
            style={{ ["--dx" as string]: `${p.dx}px`, ["--dy" as string]: `${p.dy}px` } as React.CSSProperties}
            aria-hidden="true"
          >
            {p.text}
          </span>
        ))}

        {/* The middle of the felt */}
        <div className="bb-ct-middle">
          {overlay ? (
            <div className="bb-ct-overlay">{overlay}</div>
          ) : (
            <>
              <div className="bb-ct-cards">
                {inIntro ? (
                  shuffling ? (
                    <div className="bb-clue-shuffle" aria-label="Shuffling the deck">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`bb-clue-shuffle-card ${i % 2 ? "is-right" : "is-left"}`} style={{ animationDelay: `${i * 40}ms` }}>
                          <CardBack src={cardBack} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bb-clue-card" aria-hidden="true">
                      {!dealingDone ? (
                        <div key={introPile} className="bb-clue-intro-fly">
                          <CardBack src={cardBack} />
                        </div>
                      ) : null}
                    </div>
                  )
                ) : card ? (
                  <div
                    key={view.dealt}
                    className={`bb-clue-deal ${award ? "bb-clue-award" : ""}`}
                    style={award ? ({ ["--dx" as string]: `${award.dx}px`, ["--dy" as string]: `${award.dy}px` } as React.CSSProperties) : undefined}
                  >
                    {revealed && round?.outcome?.kind === "won" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="bb-clue-sparkle" src="/games/clue/ui/sparkle.webp" alt="" aria-hidden="true" />
                    ) : null}
                    <div className={revealed ? "" : "bb-clue-flipin"}>
                      <PlayingCard card={card} face={revealed ? "reveal" : "mystery"} back={cardBack} />
                      {!revealed && uncovered !== view.dealt ? (
                        <div className="bb-clue-flipcover" aria-hidden="true">
                          <CardBack src={cardBack} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className="bb-clue-card" aria-hidden="true" />
                )}
                <div className={`bb-clue-drawpile ${pileLeft === 0 ? "is-empty" : ""}`} aria-label={`${pileLeft} cards left`}>
                  {Array.from({ length: Math.min(pileLeft, 5) }).map((_, i) => (
                    <div key={i} style={{ transform: `translate(${i * 2}px, ${-i * 2}px)` }}>
                      <CardBack src={cardBack} />
                    </div>
                  ))}
                  {pileLeft > 0 ? <span className="bb-clue-pilebadge">{pileLeft}</span> : null}
                </div>
              </div>

              {/* What's happening, on a slip of parchment on the felt */}
              <div className="bb-ct-slip">
                {inIntro ? (
                  <p className="bb-ct-slip-big">{shuffling ? "Shuffling the deck…" : dealingDone ? "Round 1. Here we go!" : `Dealing ${view.deckSize} cards…`}</p>
                ) : paused ? (
                  <p className="bb-ct-slip-big">Paused by the host. Talk it over!</p>
                ) : view.phase === "clue" && card ? (
                  <>
                    <div className="bb-ct-slip-row">
                      <span className="bb-clue-pointsbadge">⭐ {points}</span>
                      <span className="bb-ct-cat">Clue {(round?.clueIndex ?? 0) + 1} of 5</span>
                      <span className={`bb-clue-timerpill ${seconds <= 3 ? "is-final" : ""}`} aria-live="polite">
                        ⏱ {seconds}
                      </span>
                    </div>
                    <div className="bb-ct-timebar">
                      <span style={{ transform: `scaleX(${clueMsLeft / (view.settings.clueSeconds * 1000)})` }} className={seconds <= 3 ? "is-final" : ""} />
                    </div>
                    <p key={clueKey} className="bb-clue-cluetext bb-clue-fadein">{currentClue}</p>
                  </>
                ) : revealed && card ? (
                  <>
                    <p className="bb-ct-answer">{card.answer}</p>
                    <div className="bb-ct-slip-row">
                      {keyRef ? <span className="bb-clue-refpill">{keyRef.label}</span> : null}
                      <button type="button" className="bb-clue-link text-[14px]" onClick={() => onStudy(card)}>
                        📖 Study
                      </button>
                    </div>
                    <p className="text-center text-[13px] font-black" style={{ color: round?.outcome?.kind === "won" ? "#1d5a34" : "#8a5a1a" }}>
                      {round?.outcome?.kind === "won"
                        ? `${round.outcome.sideId === youId ? "You" : winnerName || "A player"} won it · +${round.outcome.points}`
                        : "Nobody got this one."}
                      {view.phase === "reveal" ? (view.dealt >= view.deckSize ? " · Last round!" : ` · Round ${view.dealt + 1} in ${Math.max(1, Math.ceil(dealMsLeft / 1000))}…`) : ""}
                    </p>
                  </>
                ) : null}

                {view.roundAnswers.length && !inIntro ? (
                  <div className="bb-clue-answers">
                    <ol>
                      {view.roundAnswers.slice(-4).map((a, i) => {
                        const who = players.find((p) => p.id === a.playerId);
                        return (
                          <li key={`${a.playerId}-${a.clueIndex}-${i}`} className={a.right ? "is-right" : "is-wrong"}>
                            <span className="bb-clue-answers-name">{a.playerId === youId ? "You" : who?.name || "Buddy"}</span>
                            <span className="bb-clue-answers-time">{a.seconds.toFixed(1)}s</span>
                            <span className="bb-clue-answers-guess">“{a.guess}”</span>
                            <span className="bb-clue-answers-result">{a.right ? `✓ +${a.points}` : `✗ −${a.points}`}</span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Your hand: the guess box, docked at your seat */}
      {!over && !overlay ? (
        <form onSubmit={submit} className="bb-ct-hand">
          <input
            ref={inputRef}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={!canGuess}
            placeholder={inIntro ? "Get ready…" : canGuess ? (roundLeft === 1 ? "Last guess this round…" : `Your guess… (${roundLeft} this round)`) : view.phase === "clue" && roundLeft <= 0 ? "No guesses left this round" : view.phase === "reveal" ? "Next round coming…" : waiting ? "Waiting for the next clue…" : "Next clue coming…"}
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
          <button type="button" onClick={onWait} className="bb-ct-wait" disabled={waiting || !canGuess} title="Wait for the next clue (free)">
            {round && round.clueIndex >= 4 ? "Pass" : "Wait"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
