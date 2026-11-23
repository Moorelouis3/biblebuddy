"use client";

/**
 * The Bible Clue Game board. One component for solo, private rooms and
 * challenges: it draws a PublicMatch (lib/clueGame/engine.ts publicView),
 * which never holds the right answer, or anyone else's choice, before the
 * question closes, and calls back with what the player did.
 *
 * Trivia only since 2026-11-22. Louis: the mystery cards were pointless once
 * it became trivia ("remove the whole card thing and just keep the trivia
 * card changing, make it bigger"). So the board is:
 *   - the round in the header;
 *   - the other players across the top: points, whether they have locked in
 *     (never what), and after the reveal what they chose;
 *   - one big question panel: the question with its timer, then the answer,
 *     a one-line explanation and the verse;
 *   - four answer buttons A-D, 2 by 2;
 *   - you: photo, points and how many you have got right.
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { PublicCard, PublicMatch } from "@/lib/clueGame/engine";
import { sceneFor } from "@/lib/clueGame/catalog";
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
  /** No longer drawn (the cards are gone); kept so callers need not change. */
  cardBack?: string;
  /** The decks in play: they choose the scene. */
  deckIds?: string[];
  /** Lock in a choice (display index 0-3). */
  onAnswer: (choice: number) => void;
  onStudy: (card: PublicCard) => void;
  isHost?: boolean;
  onPause?: () => void;
  onResume?: () => void;
  /** Shown in place of the play area (the final results); the players stay in view. */
  overlay?: ReactNode;
  /** The selection in the header pill. */
  roundLabel?: string;
}) {
  const boardRef = useRef<HTMLDivElement | null>(null);
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

  const rightCount = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of view.history) for (const p of view.players) if (gotRight(c, p.id)) map.set(p.id, (map.get(p.id) || 0) + 1);
    return map;
  }, [view.history, view.players]);

  const at = paused && view.pausedAt ? view.pausedAt : now;
  // The opening: the instruction, with a short countdown to the first question.
  const introLeft = view.dealt === 1 && round && view.phase === "question" && !paused ? round.openAt - at : 0;
  const inIntro = introLeft > 0;
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

  /** From the question panel to a player's photo, in px, for the points that fly. */
  const panelRef = useRef<HTMLDivElement | null>(null);
  const vectorTo = (playerId: string) => {
    const board = boardRef.current;
    const panel = panelRef.current?.getBoundingClientRect();
    const seat = board?.querySelector(`[data-seat="${CSS.escape(playerId)}"]`)?.getBoundingClientRect();
    const b = board?.getBoundingClientRect();
    if (!panel || !seat || !b) return null;
    const x = panel.left + panel.width / 2 - b.left;
    const y = panel.top + panel.height / 2 - b.top;
    return { x, y, dx: seat.left + seat.width / 2 - (panel.left + panel.width / 2), dy: seat.top + seat.height / 2 - (panel.top + panel.height / 2) };
  };

  // Points popping out of the panel and flying to each player.
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
      // Only the fastest right answer scores, so a right answer can be worth 0.
      const scorer = Object.entries(round.points || {}).find(([, p]) => p > 0)?.[0];
      outcome =
        myPoints > 0
          ? "Right! +1"
          : myPoints < 0
            ? "Wrong · −1"
            : mine !== null && mine === correct
              ? `Right, but ${scorer ? nameOf(scorer) : "someone"} was faster · 0`
              : "No answer · 0";
      outcomeColor = myPoints > 0 ? "#1d5a34" : myPoints < 0 ? "#a3261b" : "#8a5a1a";
      if (view.phase === "reveal") outcome += lastRegular ? " · Last round!" : ` · Round ${view.dealt + 1} in ${Math.max(1, Math.ceil(dealMsLeft / 1000))}…`;
    }
  }

  return (
    <div ref={boardRef} className="bb-cb is-quiz is-trivia" style={{ ["--cb-top" as string]: `${top}px`, ["--scene-phone" as string]: `url(${scene.phone})`, ["--scene-desktop" as string]: `url(${scene.desktop})` } as React.CSSProperties}>
      <div className="bb-cb-scene" aria-hidden="true" />

      {/* The round, in the header between Back and Sound */}
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
                {status ? <span className={`bb-cb-status ${status.kind}`}>{status.text}</span> : <span className="bb-cb-status">{rightCount.get(p.id) || 0} right</span>}
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

      {overlay ? (
        <div className="bb-cb-overlay">{overlay}</div>
      ) : (
        <>
          <div className="bb-cb-gap" />
          {/* The question: one big panel */}
          <div ref={panelRef} className="bb-cb-panel bb-cb-bigpanel">
            {inIntro ? (
              <div className="bb-cb-howto">
                <p className="bb-cb-howto-title">How to play</p>
                <p className="bb-cb-howto-text">{HOW_TO_PLAY}</p>
                <p className="bb-cb-howto-deal">First question in {Math.max(1, Math.ceil(introLeft / 1000))}…</p>
              </div>
            ) : paused ? (
              <p className="bb-cb-panel-big">{players.length > 1 ? "Paused by the host. Talk it over!" : "Paused. Tap Resume when you are ready."}</p>
            ) : view.phase === "question" && quiz ? (
              <>
                <div className="bb-cb-panel-head">
                  {tiebreak ? <span className="bb-cb-tb">Tiebreaker · First correct answer wins</span> : <span>{quiz.book ?? "Genesis"} {quiz.chapter}</span>}
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
            ) : revealed && quiz ? (
              <div key={`r${roundKey}`} className="bb-cb-reveal bb-clue-fadein">
                <p className="bb-cb-answer">{correct !== null ? quiz.choices[correct] : card?.answer}</p>
                {quiz.explanation ? <p className="bb-cb-explain">{quiz.explanation}</p> : null}
                <div className="bb-cb-panel-row">
                  {quiz.ref ? <span className="bb-cb-ref">{quiz.ref.label}</span> : null}
                  {card ? (
                    <button type="button" className="bb-clue-link text-[14px]" onClick={() => onStudy({ ...card, quiz })}>
                      📖 Read it
                    </button>
                  ) : null}
                </div>
                <p className="bb-cb-outcome" style={{ color: outcomeColor }}>
                  {outcome}
                </p>
              </div>
            ) : null}
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
              {rightCount.get(youId) || 0} right
            </span>
          </div>
          <div className="bb-cb-bottomgap" />
        </>
      )}
    </div>
  );
}
