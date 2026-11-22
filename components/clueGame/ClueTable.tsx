"use client";

/**
 * The Bible Clue Game board. One component for solo, private rooms and
 * challenges: it draws a PublicMatch (lib/clueGame/engine.ts publicView),
 * which never holds the right answer, or anyone else's choice, before the
 * question closes, and calls back with what the player did.
 *
 * Multiple choice since 2026-11-22 (Louis: the five moving clues were too
 * fast to follow, Jessica quit, and typing made the iPhone flash). Layout:
 *   - the deck and round in the header;
 *   - the other players across the top: points, whether they have locked in
 *     (never what), and after the reveal what they chose;
 *   - one play row: the card in play, the question panel, the draw pile;
 *   - four answer buttons A-D, 2 by 2;
 *   - you: photo, points, how many you got right, and those cards in a strip.
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { INTRO_DEAL_EACH_MS, INTRO_SHUFFLE_MS, ROUND_INTRO_MS, type PublicCard, type PublicMatch } from "@/lib/clueGame/engine";
import { sceneFor } from "@/lib/clueGame/catalog";
import { CardBack, SubjectArt } from "./ClueParts";
import { clueSound, startClueMusic } from "@/lib/clueGame/sound";

export type TablePlayer = { id: string; name: string; avatar?: string | null };

const UI = "/games/clue/ui";
const LETTERS = ["A", "B", "C", "D"];
export const HOW_TO_PLAY = "You have 10 seconds to pick an answer. Right earns 1 point. Wrong costs 1 point. Skip for 0.";

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?"
  );
}

/** A real profile photo (or initials) inside the gold player ring. */
function RingPhoto({ name, src, size, seat }: { name: string; src?: string | null; size: number; seat: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <span className="bb-cb-ring" style={{ width: size, height: size }} data-seat={seat}>
      <span className="bb-cb-ring-photo" style={{ fontSize: size * 0.34 }}>
        {src && !broken ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" onError={() => setBroken(true)} />
        ) : (
          initials(name)
        )}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="bb-cb-ring-frame" src={`${UI}/player-ring.webp`} alt="" aria-hidden="true" />
    </span>
  );
}

type Done = PublicMatch["history"][number];

/** Did this player get this round right? */
function gotRight(c: Done, id: string) {
  return c.tiebreak ? c.winnerId === id : (c.points[id] ?? 0) > 0;
}

export default function ClueTable({
  view,
  players,
  youId,
  now,
  cardBack,
  deckIds,
  onAnswer,
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
  /** The decks in play: they choose the scene. */
  deckIds?: string[];
  /** Lock in a choice (display index 0-3). */
  onAnswer: (choice: number) => void;
  onStudy: (card: PublicCard) => void;
  isHost?: boolean;
  onPause?: () => void;
  onResume?: () => void;
  /** Shown in place of the play row (the final results); the players stay in view. */
  overlay?: ReactNode;
  /** The selection in the header pill. */
  roundLabel?: string;
}) {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const round = view.round;
  const card = round?.card ?? null;
  const quiz = round?.quiz ?? null;
  const revealed = !!round && round.revealedAt !== null;
  const paused = view.pausedAt !== null;
  const scene = sceneFor(deckIds);
  const over = view.phase === "over";

  const me = players.find((p) => p.id === youId) || { id: youId, name: "You" };
  const others = useMemo(() => players.filter((p) => p.id !== youId).slice(0, 3), [players, youId]);
  const nameOf = (id: string) => (id === youId ? "You" : players.find((p) => p.id === id)?.name || "A player");

  // Cards each player got right, oldest first.
  const rightBy = useMemo(() => {
    const map = new Map<string, Done[]>();
    for (const c of view.history) {
      for (const p of view.players) if (gotRight(c, p.id)) map.set(p.id, [...(map.get(p.id) || []), c]);
    }
    return map;
  }, [view.history, view.players]);
  const myRight = rightBy.get(youId) || [];

  const at = paused && view.pausedAt ? view.pausedAt : now;
  // The opening: the instruction, while the deck is shuffled and dealt.
  const introLeft = view.dealt === 1 && round && view.phase === "question" && !paused ? round.openAt - at : 0;
  const inIntro = introLeft > 0;
  const introElapsed = ROUND_INTRO_MS - introLeft;
  const shuffling = inIntro && introElapsed < INTRO_SHUFFLE_MS;
  const introPile = inIntro && !shuffling ? Math.min(view.deckSize, Math.floor((introElapsed - INTRO_SHUFFLE_MS) / INTRO_DEAL_EACH_MS) + 1) : 0;
  const dealingDone = inIntro && introPile >= view.deckSize;
  const msLeft = round && view.phase === "question" ? Math.max(0, round.closesAt - Math.max(at, round.openAt)) : 0;
  const seconds = Math.min(view.settings.answerSeconds, Math.ceil(msLeft / 1000));
  const dealMsLeft = round?.revealedAt != null && view.phase === "reveal" ? Math.max(0, round.revealedAt + view.settings.revealSeconds * 1000 - at) : 0;
  const tiebreak = !!round?.tiebreak;
  const inTiebreak = tiebreak && view.tiebreakers.includes(youId);
  const roundKey = round ? `${view.dealt}:${view.history.length}` : "";

  // My choice, shown at once (a room's server confirms it on the next view).
  const [picked, setPicked] = useState<{ key: string; choice: number } | null>(null);
  const mine = round?.mine ?? (picked && picked.key === roundKey ? picked.choice : null);
  const canAnswer = view.phase === "question" && !!round && !paused && !inIntro && msLeft > 0 && mine === null && (!tiebreak || inTiebreak);
  const correct = revealed ? quiz?.correct ?? null : null;
  const myPoints = revealed && round?.points ? round.points[youId] ?? 0 : 0;

  // The game screen is locked: the page cannot scroll while the board is up,
  // the app menu is hidden, and the board fills exactly the screen below where it starts.
  const [top, setTop] = useState(0);
  useLayoutEffect(() => {
    const html = document.documentElement;
    const before = { html: html.style.overflow, body: document.body.style.overflow, overscroll: html.style.overscrollBehavior };
    window.scrollTo(0, 0);
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    html.classList.add("bb-in-game");
    const measure = () => {
      const el = boardRef.current;
      if (el) setTop(Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      html.style.overflow = before.html;
      document.body.style.overflow = before.body;
      html.style.overscrollBehavior = before.overscroll;
      html.classList.remove("bb-in-game");
    };
  }, []);

  // Quiet music while you are at the table (stops when you leave it).
  useEffect(() => startClueMusic(), []);

  // The face-down cover on a newly dealt card is taken away after its flip.
  const [uncovered, setUncovered] = useState("");
  useEffect(() => {
    if (inIntro || !roundKey) return;
    const id = window.setTimeout(() => setUncovered(roundKey), 1100);
    return () => window.clearTimeout(id);
  }, [roundKey, inIntro]);

  // New right cards slide into your strip: keep the newest in view.
  useEffect(() => {
    const el = stripRef.current;
    if (el) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
  }, [myRight.length]);

  /** From the card in play to a player's photo, in px. */
  const vectorTo = (playerId: string) => {
    const board = boardRef.current;
    const slot = slotRef.current?.getBoundingClientRect();
    const seat = board?.querySelector(`[data-seat="${CSS.escape(playerId)}"]`)?.getBoundingClientRect();
    const b = board?.getBoundingClientRect();
    if (!slot || !seat || !b) return null;
    const x = slot.left + slot.width / 2 - b.left;
    const y = slot.top + slot.height / 2 - b.top;
    return { x, y, dx: seat.left + seat.width / 2 - (slot.left + slot.width / 2), dy: seat.top + seat.height / 2 - (slot.top + slot.height / 2) };
  };

  // A card you got right flies to you just before the next question.
  const [award, setAward] = useState<{ dx: number; dy: number } | null>(null);
  const flyTo = revealed ? (tiebreak ? round?.winnerId ?? null : myPoints > 0 ? youId : null) : null;
  const flyNow = view.phase === "reveal" && !!flyTo && dealMsLeft > 0 && dealMsLeft < 900;
  useLayoutEffect(() => {
    if (!flyNow || !flyTo) {
      setAward(null);
      return;
    }
    const v = vectorTo(flyTo);
    if (v) setAward({ dx: v.dx, dy: v.dy });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyNow, flyTo]);

  // Points popping out of the card and flying to each player.
  const [pops, setPops] = useState<Array<{ id: number; text: string; kind: "win" | "lose"; x: number; y: number; dx: number; dy: number; seat: string }>>([]);
  const popId = useRef(0);
  const pop = (text: string, kind: "win" | "lose", playerId: string) => {
    const v = vectorTo(playerId);
    if (!v) return;
    const id = (popId.current += 1);
    setPops((list) => [...list, { id, text, kind, seat: playerId, ...v }]);
    window.setTimeout(() => setPops((list) => list.filter((p) => p.id !== id)), 1900);
  };

  // Sounds and points, from what changed on the board (the same for solo and rooms).
  const heard = useRef({ key: roundKey, phase: view.phase, tick: "" });
  useEffect(() => {
    const h = heard.current;
    if (roundKey && roundKey !== h.key && view.phase === "question" && !inIntro) clueSound.deal();
    if (view.phase === "reveal" && h.phase !== "reveal" && round) {
      clueSound.flip();
      if (round.tiebreak) {
        if (round.winnerId === youId) {
          clueSound.correct();
          window.setTimeout(() => clueSound.cheer(), 250);
        } else if (round.winnerId) clueSound.otherWon();
        else clueSound.missed();
      } else {
        const pts = round.points?.[youId] ?? 0;
        if (pts > 0) {
          clueSound.correct();
          window.setTimeout(() => clueSound.cheer(), 250);
        } else if (pts < 0) {
          clueSound.wrong();
          window.setTimeout(() => clueSound.aww(), 180);
        } else clueSound.missed();
        for (const [id, p] of Object.entries(round.points || {})) if (p) pop(p > 0 ? `+${p}` : `−${-p}`, p > 0 ? "win" : "lose", id);
      }
    }
    h.key = inIntro ? "" : roundKey;
    h.phase = view.phase;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundKey, view.phase, round?.revealedAt, youId, inIntro]);
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
    if (view.phase !== "question" || paused || inIntro || seconds > 3 || seconds < 1) return;
    const k = `${roundKey}:${seconds}`;
    if (heard.current.tick === k) return;
    heard.current.tick = k;
    clueSound.tick(seconds === 1);
  }, [seconds, view.phase, paused, inIntro, roundKey]);

  const choose = (i: number) => {
    if (!canAnswer) return;
    setPicked({ key: roundKey, choice: i });
    clueSound.tap();
    onAnswer(i);
  };

  const pileLeft = inIntro ? (shuffling ? 0 : introPile) : Math.max(0, view.deckSize - view.dealt);
  const scrollStrip = (dir: 1 | -1) => stripRef.current?.scrollBy({ left: dir * (stripRef.current.clientWidth * 0.7), behavior: "smooth" });
  const lastRegular = view.dealt >= view.deckSize;

  /** What another player is doing, without giving away their choice. */
  const statusOf = (id: string) => {
    if (!round || over) return null;
    if (tiebreak && !view.tiebreakers.includes(id)) return { text: "Watching", kind: "" };
    if (revealed) {
      const a = round.answers?.[id];
      if (!a) return { text: "No answer", kind: "" };
      const right = a.choice === correct;
      return { text: `Chose ${LETTERS[a.choice]} ${right ? "✓" : "✗"}`, kind: right ? "is-right" : "is-wrong" };
    }
    if (inIntro) return null;
    return round.locked.includes(id) ? { text: "✓ Locked in", kind: "is-locked" } : { text: "Thinking…", kind: "" };
  };

  let outcome = "";
  let outcomeColor = "#1d5a34";
  if (revealed && round) {
    if (tiebreak) {
      outcome = round.winnerId ? `${nameOf(round.winnerId)} ${round.winnerId === youId ? "win" : "wins"} the tiebreaker!` : "Nobody got it. A fresh question…";
      outcomeColor = round.winnerId === youId ? "#1d5a34" : "#8a5a1a";
    } else {
      outcome = myPoints > 0 ? "Right! +1" : myPoints < 0 ? "Wrong · −1" : "No answer · 0";
      outcomeColor = myPoints > 0 ? "#1d5a34" : myPoints < 0 ? "#a3261b" : "#8a5a1a";
      if (view.phase === "reveal") outcome += lastRegular ? " · Last round!" : ` · Round ${view.dealt + 1} in ${Math.max(1, Math.ceil(dealMsLeft / 1000))}…`;
    }
  }

  return (
    <div ref={boardRef} className="bb-cb is-quiz" style={{ ["--cb-top" as string]: `${top}px`, ["--scene-phone" as string]: `url(${scene.phone})`, ["--scene-desktop" as string]: `url(${scene.desktop})` } as React.CSSProperties}>
      <div className="bb-cb-scene" aria-hidden="true" />

      {/* Selection and round, in the header between Back and Sound */}
      <div className="bb-cb-titles">
        <span className="bb-cb-deckpill">{roundLabel || "Genesis"}</span>
        <span className="bb-cb-roundpill">{over ? "Game over" : tiebreak ? "Tiebreaker" : `Round ${Math.max(1, view.dealt)} of ${view.deckSize}`}</span>
        {isHost && !over ? (
          <button type="button" className="bb-cb-roundpill is-button" onClick={paused ? onResume : onPause}>
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>
        ) : null}
      </div>

      {/* The other players across the top */}
      {others.length ? (
        <div className="bb-cb-others" style={{ gridTemplateColumns: `repeat(${others.length}, minmax(0, 1fr))` }}>
          {others.map((p) => {
            const wins = rightBy.get(p.id) || [];
            const fan = wins.slice(-3);
            const leading = over && view.winnerSideIds.includes(p.id);
            const status = statusOf(p.id);
            return (
              <div
                key={p.id}
                className={`bb-cb-other ${pops.some((x) => x.seat === p.id && x.kind === "win") ? "is-scored" : ""} ${pops.some((x) => x.seat === p.id && x.kind === "lose") ? "is-docked" : ""} ${leading ? "is-winner" : ""}`}
              >
                {leading ? <span className="bb-cb-crown" aria-label="Winner">👑</span> : null}
                <RingPhoto name={p.name} src={p.avatar} size={56} seat={p.id} />
                <span className="bb-cb-greenpill bb-cb-namepill">
                  <span className="bb-cb-name">{p.name}</span>
                  <span className="bb-cb-dot">·</span>
                  <span className="bb-cb-pts">{view.scores[p.id] ?? 0} pts</span>
                </span>
                {status ? <span className={`bb-cb-status ${status.kind}`}>{status.text}</span> : null}
                <div className="bb-cb-fan" aria-label={`${wins.length} right`}>
                  {fan.map((c, i) => (
                    <span key={`${c.id}-${i}`} className="bb-cb-fancard" style={{ transform: `rotate(${(i - (fan.length - 1) / 2) * 8}deg)`, zIndex: i }}>
                      <SubjectArt card={c} mode="reveal" />
                    </span>
                  ))}
                  {wins.length > fan.length ? <span className="bb-cb-fanmore">+{wins.length - fan.length}</span> : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {pops.map((p) => (
        <span
          key={p.id}
          className={`bb-clue-pop ${p.kind === "win" ? "is-win" : "is-lose"}`}
          style={{ left: p.x, top: p.y, ["--dx" as string]: `${p.dx}px`, ["--dy" as string]: `${p.dy}px` } as React.CSSProperties}
          aria-hidden="true"
        >
          {p.text}
        </span>
      ))}

      {overlay ? null : <div className="bb-cb-gap" />}

      {overlay ? (
        <div className="bb-cb-overlay">{overlay}</div>
      ) : (
        <>
          {/* The card in play · the question · the draw pile */}
          <div className="bb-cb-play">
            <div className="bb-cb-pileslot">
              {shuffling ? (
                <div className="bb-clue-shuffle bb-cb-shuffle" aria-label="Shuffling the deck">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`bb-clue-shuffle-card ${i % 2 ? "is-right" : "is-left"}`} style={{ animationDelay: `${i * 40}ms` }}>
                      <CardBack src={cardBack} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`bb-cb-pile ${pileLeft === 0 ? "is-empty" : ""}`} aria-label={`${pileLeft} cards left`}>
                  {/* The last round: the deck is used up, but its place stays on the table (faded, 0). */}
                  {pileLeft === 0 && !inIntro ? (
                    <div className="bb-cb-pilecard is-ghost">
                      <CardBack src={cardBack} />
                    </div>
                  ) : null}
                  {Array.from({ length: Math.min(pileLeft, 4) }).map((_, i) => (
                    <div key={i} className="bb-cb-pilecard" style={{ transform: `translate(${-i * 2.5}px, ${i * 2.5}px)`, zIndex: 4 - i }}>
                      <CardBack src={cardBack} />
                    </div>
                  ))}
                  {inIntro && !dealingDone && introPile > 0 ? (
                    <div key={introPile} className="bb-cb-pilecard bb-clue-intro-fly" style={{ zIndex: 6 }}>
                      <CardBack src={cardBack} />
                    </div>
                  ) : null}
                  {pileLeft > 0 || !inIntro ? <span className="bb-cb-pilebadge">{pileLeft}</span> : null}
                </div>
              )}
            </div>

            <div className="bb-cb-panel">
              {inIntro ? (
                <div className="bb-cb-howto">
                  <p className="bb-cb-howto-title">How to play</p>
                  <p className="bb-cb-howto-text">{HOW_TO_PLAY}</p>
                  <p className="bb-cb-howto-deal">{shuffling ? "Shuffling the deck…" : dealingDone ? "Round 1. Here we go!" : `Dealing ${view.deckSize} cards…`}</p>
                </div>
              ) : paused ? (
                <p className="bb-cb-panel-big">{players.length > 1 ? "Paused by the host. Talk it over!" : "Paused. Tap Resume when you are ready."}</p>
              ) : view.phase === "question" && quiz ? (
                <>
                  <div className="bb-cb-panel-head">
                    {tiebreak ? (
                      <span className="bb-cb-tb">Tiebreaker · First correct answer wins</span>
                    ) : (
                      <span>Genesis {quiz.chapter}</span>
                    )}
                    <span className="bb-cb-sep" />
                    <span className={`bb-cb-timer ${seconds <= 3 ? "is-final" : ""}`} aria-live="polite">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`${UI}/icon-stopwatch.webp`} alt="" />
                      0:{String(seconds).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="bb-cb-timebar">
                    <span className={seconds <= 3 ? "is-final" : ""} style={{ transform: `scaleX(${msLeft / (view.settings.answerSeconds * 1000)})` }} />
                  </div>
                  <p key={roundKey} className="bb-cb-clue bb-cb-question bb-clue-fadein">{quiz.question}</p>
                </>
              ) : revealed && quiz && card ? (
                <div className="bb-cb-reveal">
                  <p className="bb-cb-answer">{correct !== null ? quiz.choices[correct] : card.answer}</p>
                  {quiz.explanation ? <p className="bb-cb-explain">{quiz.explanation}</p> : null}
                  <div className="bb-cb-panel-row">
                    {quiz.ref ? <span className="bb-cb-ref">{quiz.ref.label}</span> : null}
                    <button type="button" className="bb-clue-link text-[14px]" onClick={() => onStudy({ ...card, quiz })}>
                      📖 Study
                    </button>
                  </div>
                  <p className="bb-cb-outcome" style={{ color: outcomeColor }}>
                    {outcome}
                  </p>
                </div>
              ) : null}
            </div>

            <div ref={slotRef} className="bb-cb-slot">
              {card && !inIntro ? (
                <div
                  key={roundKey}
                  className={`bb-cb-cardwrap bb-clue-deal ${award ? "bb-clue-award" : ""}`}
                  style={award ? ({ ["--dx" as string]: `${award.dx}px`, ["--dy" as string]: `${award.dy}px` } as React.CSSProperties) : undefined}
                >
                  {revealed && flyTo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="bb-clue-sparkle" src={`${UI}/sparkle.webp`} alt="" aria-hidden="true" />
                  ) : null}
                  <div className={`bb-cb-card ${revealed ? "is-revealed" : "bb-clue-flipin"}`}>
                    <span className="bb-cb-card-art">
                      <SubjectArt card={card} mode={revealed ? "reveal" : "mystery"} />
                    </span>
                    {!revealed ? <span className="bb-cb-card-cat">{card.category === "person" ? "Person" : card.category === "place" ? "Place" : "Thing"}</span> : null}
                    {!revealed && uncovered !== roundKey ? (
                      <div className="bb-cb-cardcover" aria-hidden="true">
                        <CardBack src={cardBack} />
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="bb-cb-card is-empty" aria-hidden="true" />
              )}
            </div>
          </div>

          {/* The four choices */}
          {!over ? (
            <div className="bb-cb-choices" role="group" aria-label="Choose an answer">
              {[0, 1, 2, 3].map((i) => {
                const text = !inIntro && quiz ? quiz.choices[i] : "";
                const isMine = mine === i;
                const isRight = correct === i;
                const isWrong = revealed && isMine && correct !== i;
                const faded = (revealed && !isRight && !isMine) || (!revealed && mine !== null && !isMine);
                return (
                  <button
                    key={`${roundKey}-${i}`}
                    type="button"
                    className={`bb-cb-choice ${isMine ? "is-mine" : ""} ${isRight ? "is-right" : ""} ${isWrong ? "is-wrong" : ""} ${faded ? "is-faded" : ""}`}
                    disabled={!canAnswer}
                    onClick={() => choose(i)}
                    aria-pressed={isMine}
                  >
                    <span className="bb-cb-letter">{LETTERS[i]}</span>
                    <span className="bb-cb-choice-text">{text}</span>
                    {revealed && isRight ? <span className="bb-cb-mark">✓</span> : isWrong ? <span className="bb-cb-mark">✗</span> : null}
                  </button>
                );
              })}
              <p className="bb-cb-hint" aria-live="polite">
                {inIntro
                  ? "Get ready…"
                  : paused
                    ? "Paused"
                    : view.phase === "question"
                      ? tiebreak && !inTiebreak
                        ? "Watching the tiebreaker…"
                        : mine !== null
                          ? tiebreak
                            ? "Locked in. Waiting…"
                            : "Locked in. The answer shows when time is up."
                          : tiebreak
                            ? "One try. First right answer wins!"
                            : "Pick one, or let it run out for 0."
                      : view.phase === "reveal"
                        ? lastRegular && !tiebreak
                          ? "That was the last question."
                          : "Next question coming…"
                        : ""}
              </p>
            </div>
          ) : null}

          {/* You */}
          <div className="bb-cb-me">
            <span className={`bb-cb-mechip ${pops.some((x) => x.seat === youId && x.kind === "win") ? "is-scored" : ""} ${pops.some((x) => x.seat === youId && x.kind === "lose") ? "is-docked" : ""}`}>
              <RingPhoto name={me.name} src={me.avatar} size={60} seat={youId} />
              <span className="bb-cb-greenpill bb-cb-mepill">You · {view.scores[youId] ?? 0} pts</span>
            </span>
            <span className="bb-cb-divider" />
            <span className="bb-cb-creampill bb-cb-collected">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${UI}/icon-trophy.webp`} alt="" />
              {myRight.length} right
            </span>
          </div>

          {/* The cards you got right */}
          <div className="bb-cb-stripwrap">
            {myRight.length > 2 ? (
              <button type="button" className="bb-cb-arrow is-left" aria-label="Earlier cards" onClick={() => scrollStrip(-1)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${UI}/icon-arrow.webp`} alt="" />
              </button>
            ) : null}
            <div ref={stripRef} className="bb-cb-strip">
              {myRight.length ? (
                myRight.map((c, i) => (
                  <button key={`${c.id}-${i}`} type="button" className="bb-cb-won" onClick={() => onStudy(c)} aria-label={`Review ${c.answer}`}>
                    <span className="bb-cb-won-art">
                      <SubjectArt card={c} mode="reveal" />
                    </span>
                    <span className="bb-cb-won-name">{c.answer}</span>
                    <span className="bb-cb-won-pts">{c.tiebreak ? "Win" : "+1"}</span>
                  </button>
                ))
              ) : (
                <p className="bb-cb-strip-empty">Cards you get right land here.</p>
              )}
            </div>
            {myRight.length > 2 ? (
              <button type="button" className="bb-cb-arrow is-right" aria-label="Later cards" onClick={() => scrollStrip(1)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${UI}/icon-arrow.webp`} alt="" />
              </button>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
