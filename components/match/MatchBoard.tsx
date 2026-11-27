"use client";

/**
 * One Bible Buddy Match board: the 7x9 grid, the parchment HUD (moves and
 * goals), and the win / out-of-moves panels. The rules are lib/match/engine.ts;
 * this file takes the swap (swipe a tile toward a neighbour, or tap one then
 * the other) and animates what it resolves to: the two tiles trade places,
 * then each clear in turn (flash, beams, break apart, tiles fall, new tiles
 * drop in), then a free reshuffle if no swap is left. A swap that lines
 * nothing up slides back. Input is locked until the last tile lands. With
 * reduced motion the same order runs with short pauses and no movement.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import MatchRules from "./MatchRules";
import MatchSettings from "./MatchSettings";
import { fireConfettiBurst } from "@/lib/celebration";
import { ACTION_POINT_WEIGHTS } from "@/lib/levelSystem";

/** XP for a board's first win: the match_board_won weight the points engine scores. */
const BOARD_XP = ACTION_POINT_WEIGHTS.match_board_won ?? 10;
import {
  adjacent,
  cloneBoard,
  createBoard,
  COLS,
  ROWS,
  findMove,
  goalsMet,
  ORB,
  DOVE,
  jubilee,
  playSwap,
  tileArt,
  type Board,
  type MatchLevel,
  type Beam,
  type Pos,
  type Tile,
} from "@/lib/match/engine";

/** The power-ups by name, for the moment one is earned or goes off. */
const POWER_NAMES: Record<string, string> = {
  light: "Light Burst!",
  pillar: "Pillar of Fire!",
  blast: "Trumpet Blast!",
  orb: "All Match orb!",
  dove: "Dove!",
};
import { matchSound } from "@/lib/match/sound";
import { trackMatch } from "@/lib/match/track";
import WinStory, { winStoryFor } from "./WinStory";

/**
 * A board in progress, kept on the device so closing the app does not start
 * it over (Louis, 2026-11-22: "if the game closes it should stay on the same
 * progress"). Saved after every move; cleared when the board is won, lost or
 * restarted. MatchGame reopens straight into it.
 */
export const BOARD_KEY = "bb:match:board";
export type SavedBoard = { levelId: string; board: Board; moves: number; collected: Record<string, number>; score: number; dark: boolean; nextId: number };
export function readSavedBoard(): SavedBoard | null {
  try {
    const raw = window.localStorage.getItem(BOARD_KEY);
    const s = raw ? (JSON.parse(raw) as SavedBoard) : null;
    return s && Array.isArray(s.board) && typeof s.moves === "number" ? s : null;
  } catch {
    return null;
  }
}
function writeSavedBoard(s: SavedBoard | null) {
  try {
    if (s) window.localStorage.setItem(BOARD_KEY, JSON.stringify(s));
    else window.localStorage.removeItem(BOARD_KEY);
  } catch {}
}

const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const id = window.setTimeout(() => setReduced(mq.matches), 0);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => {
      window.clearTimeout(id);
      mq.removeEventListener("change", on);
    };
  }, []);
  return reduced;
}

type Outcome = { won: boolean; score: number; movesLeft: number } | null;

export default function MatchBoard({
  level,
  onExit,
  onWin,
  isLastLevel,
  alreadyWon = false,
}: {
  level: MatchLevel;
  /** Back to the map (also Continue after a win). */
  onExit: () => void;
  /** Called once when the board is won, before the panel shows. */
  onWin: (score: number) => void;
  isLastLevel: boolean;
  /** This player has won this board before: a win now is a replay (analytics). */
  alreadyWon?: boolean;
}) {
  const reduced = useReducedMotion();
  // Tile ids for this board: one object, only ever read and bumped in handlers.
  // A board this player left halfway (the app closed) picks up where it was.
  const [resume] = useState(() => {
    const s = typeof window === "undefined" ? null : readSavedBoard();
    return s && s.levelId === level.id ? s : null;
  });
  const [ids] = useState(() => ({ current: { next: resume?.nextId ?? 1 } }));
  const [seed, setSeed] = useState(0); // bumps on retry
  const [board, setBoard] = useState<Board>(() => resume?.board ?? createBoard(level.types, Math.random, ids.current));
  const [moves, setMoves] = useState(resume?.moves ?? level.moves);
  const [collected, setCollected] = useState<Record<string, number>>(resume?.collected ?? {});
  const [score, setScore] = useState(resume?.score ?? 0);
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState<Pos | null>(null);
  const [flash, setFlash] = useState<Set<number>>(new Set());
  const [popping, setPopping] = useState<Set<number>>(new Set());
  const [beams, setBeams] = useState<Beam[]>([]);
  const [rays, setRays] = useState<{ from: Pos; to: Pos[] } | null>(null);
  const [drops, setDrops] = useState<Record<number, number>>({});
  const [dark, setDark] = useState(resume ? resume.dark : !!level.startsDark);
  const [hint, setHint] = useState<Pos[] | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [settings, setSettings] = useState(false);
  const [rules, setRules] = useState(false);
  const [doves, setDoves] = useState<Array<{ from: Pos; to: Pos }>>([]);
  // One free +5 moves per try, when the goals are close (2026-11-23).
  const [extraUsed, setExtraUsed] = useState(false);
  const [celebrate, setCelebrate] = useState<{ xp: number } | null>(null);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const boardRef = useRef(board);
  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  // Timings (ms). Reduced motion keeps the order and drops the movement.
  const T = useMemo(() => (reduced ? { swap: 60, flash: 120, pop: 60, fall: 80, between: 40 } : { swap: 200, flash: 220, pop: 220, fall: 340, between: 60 }), [reduced]);

  // Measurement: a board started (or picked up again), and left halfway.
  useEffect(() => {
    trackMatch("match_board_started", { board: level.id, number: level.number, title: level.title, resumed: !!resume });
    // Once per board opening.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);
  const exit = () => {
    if (!outcome && moves < level.moves) trackMatch("match_board_left", { board: level.id, number: level.number, title: level.title, movesUsed: level.moves - moves });
    onExit();
  };

  const restart = () => {
    writeSavedBoard(null);
    setExtraUsed(false);
    setBoard(createBoard(level.types, Math.random, ids.current));
    setMoves(level.moves);
    setCollected({});
    setScore(0);
    setSelected(null);
    setFlash(new Set());
    setPopping(new Set());
    setBeams([]);
    setRays(null);
    setDrops({});
    setDark(!!level.startsDark);
    setOutcome(null);
    setSeed((s) => s + 1);
  };

  const play = async (a: Pos, b: Pos) => {
    if (busy || outcome) return;
    const before = boardRef.current;
    setSelected(null);
    setHint(null);
    // The kinds the goals still need: where a Dove flies.
    const want = level.goals.filter((g) => (collected[g.type] || 0) < g.count).map((g) => g.type);
    const res = playSwap(before, a, b, level.types, Math.random, ids.current, want);
    setBusy(true);
    // The two tiles trade places either way.
    const traded = cloneBoard(before);
    traded[a.r][a.c] = before[b.r][b.c];
    traded[b.r][b.c] = before[a.r][a.c];
    setDrops({});
    setBoard(traded);
    matchSound.link(1);
    await sleep(T.swap);
    if (!res.valid) {
      // Nothing lined up: they slide back, and no move is used.
      matchSound.nope();
      await sleep(80);
      setBoard(before);
      await sleep(T.swap);
      setBusy(false);
      return;
    }
    const movesLeft = moves - 1;
    setMoves(movesLeft);
    let got = { ...collected };
    let total = score;
    for (const [i, step] of res.steps.entries()) {
      const clearedIds = new Set(step.cleared.map((p) => step.before[p.r][p.c]?.id).filter((id): id is number => typeof id === "number"));
      setFlash(clearedIds);
      setBeams(step.beams);
      if (step.orbType && step.orbAt) {
        // The orb sends a ray to every tile it takes, then they all go together.
        setRays({ from: step.orbAt, to: step.cleared.filter((q) => !(q.r === step.orbAt!.r && q.c === step.orbAt!.c)) });
      }
      if (step.orbType) matchSound.orb();
      else if (step.beams.length) matchSound.beam();
      const fired = step.beams.map((b) => (b.dove ? "dove" : b.blast ? "blast" : b.col !== undefined ? "pillar" : "light"));
      // The combos get their own names (2026-11-23).
      const combo =
        step.orbType && step.beams.length > 1
          ? "Mighty orb combo!"
          : step.beams.some((b) => b.radius === 2)
            ? "Great Trumpet Blast!"
            : i === 0 && step.beams.filter((b) => b.row !== undefined).length >= 1 && step.beams.filter((b) => b.col !== undefined).length >= 1 && step.beams.length >= 4
              ? "Cross of Light!"
              : null;
      const shout = combo ?? (step.orbType ? POWER_NAMES.orb : fired.length ? POWER_NAMES[fired[0]] : null);
      if (step.beams.some((b) => b.dove)) setDoves(step.beams.filter((b) => b.dove).map((b) => b.dove!));
      if (shout && !reduced) {
        setToast(shout);
        window.setTimeout(() => setToast((t) => (t === shout ? null : t)), 900);
      }
      // Higher with longer runs and with each link of a chain.
      else matchSound.match(Math.min(6, Math.max(0, step.longest - 3) + i));
      matchSound.crack();
      await sleep(T.flash);
      setPopping(clearedIds);
      await sleep(T.pop);
      for (const [t, n] of Object.entries(step.removed)) got = { ...got, [t]: (got[t] || 0) + n };
      total += step.points;
      setCollected(got);
      setScore(total);
      for (const b of step.beams) trackMatch("match_power_used", { board: level.id, power: b.dove ? "dove" : b.blast ? (b.radius === 2 ? "blast-combo" : "blast") : b.col !== undefined ? "pillar" : "light" });
      if (step.orbType) trackMatch("match_power_used", { board: level.id, power: "orb" });
      for (const m of step.made) trackMatch("match_power_made", { board: level.id, power: m.tile.power });
      if (step.made.length) {
        matchSound.power();
        const name = POWER_NAMES[step.made[0].tile.power || "light"];
        if (name && !reduced) {
          setToast(`You made a ${name.replace("!", "")}!`);
          window.setTimeout(() => setToast(null), 1300);
        }
      }
      setFlash(new Set());
      setPopping(new Set());
      setBeams([]);
      setRays(null);
      setDoves([]);
      setBoard(step.afterClear);
      // The first light: Creation's dark lifts on the first clear.
      if (dark) setDark(false);
      await sleep(T.between);
      setDrops(step.dropFrom);
      setBoard(step.afterFill);
      await sleep(T.fall);
      if (i > 0 && !reduced) {
        // Chain callouts (2026-11-23): each link of a chain louder than the last.
        setToast(i >= 3 ? "Glory!" : i === 2 ? "Hallelujah!" : "Amen!");
        window.setTimeout(() => setToast(null), 700);
      }
    }
    if (res.reshuffled) {
      setToast("No swaps left. Shuffling…");
      await sleep(reduced ? 200 : 700);
      setDrops({});
      setBoard(res.final);
      await sleep(T.fall);
      setToast(null);
    }
    setBusy(false);
    if (goalsMet(level.goals, got)) {
      // The Jubilee: spare moves (up to 8) become sweeps that all go off.
      if (movesLeft > 0) {
        const j = jubilee(res.final, movesLeft, level.types, Math.random, ids.current);
        if (j.valid) {
          setBusy(true);
          if (!reduced) setToast(`Jubilee! ${Math.min(8, movesLeft)} moves to spare`);
          for (const step of j.steps) {
            const clearedIds = new Set(step.cleared.map((p) => step.before[p.r][p.c]?.id).filter((id): id is number => typeof id === "number"));
            setBoard(step.before);
            setFlash(clearedIds);
            setBeams(step.beams);
            matchSound.beam();
            await sleep(T.flash);
            setPopping(clearedIds);
            await sleep(T.pop);
            total += step.points;
            setScore(total);
            setFlash(new Set());
            setPopping(new Set());
            setBeams([]);
            setBoard(step.afterClear);
            await sleep(T.between);
            setDrops(step.dropFrom);
            setBoard(step.afterFill);
            await sleep(T.fall);
          }
          setToast(null);
          setBusy(false);
        }
      }
      const finalScore = total + movesLeft * 25;
      setScore(finalScore);
      onWin(finalScore);
      writeSavedBoard(null);
      trackMatch("match_board_won", { board: level.id, number: level.number, title: level.title, score: finalScore, movesLeft, movesUsed: level.moves - movesLeft, replay: alreadyWon });
      matchSound.win();
      // The win itself first: confetti and "+10 XP" over the finished board
      // for a couple of seconds, then the story screen (Louis, 2026-11-23:
      // "something should happen after a board win... confetti, plus XP").
      // XP only on a board's first win; a replay celebrates without it.
      setCelebrate({ xp: alreadyWon ? 0 : BOARD_XP });
      fireConfettiBurst({ durationMs: 1800, origins: 2, peakParticleCount: 60, colors: ["#f6d36b", "#fff3cf", "#34a35a", "#0056FD", "#e8743b"] });
      window.setTimeout(() => setCelebrate(null), 2200);
      setOutcome({ won: true, score: finalScore, movesLeft });
    } else if (movesLeft <= 0) {
      matchSound.lose();
      setOutcome({ won: false, score: total, movesLeft: 0 });
      writeSavedBoard(null);
      trackMatch("match_board_lost", {
        board: level.id,
        number: level.number,
        title: level.title,
        goalsLeft: level.goals.reduce((n, g) => n + Math.max(0, g.count - (got[g.type] || 0)), 0),
      });
    } else {
      writeSavedBoard({ levelId: level.id, board: res.final, moves: movesLeft, collected: got, score: total, dark: false, nextId: ids.current.next });
    }
  };

  // ---- input: swipe a tile toward a neighbour, or tap one then the other ----
  const gridRef = useRef<HTMLDivElement | null>(null);
  const press = useRef<{ cell: Pos; x: number; y: number; swiped: boolean } | null>(null);
  const cellAt = (clientX: number, clientY: number): Pos | null => {
    const el = gridRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const size = rect.width / COLS;
    const c = Math.floor((clientX - rect.left) / size);
    const r = Math.floor((clientY - rect.top) / size);
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return null;
    return { r, c };
  };
  const cellSize = () => (gridRef.current ? gridRef.current.getBoundingClientRect().width / COLS : 40);
  const onDown = (e: React.PointerEvent) => {
    if (busy || outcome) return;
    const cell = cellAt(e.clientX, e.clientY);
    if (!cell || !boardRef.current[cell.r][cell.c]) return;
    matchSound.unlock();
    setHint(null);
    press.current = { cell, x: e.clientX, y: e.clientY, swiped: false };
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const pr = press.current;
    if (!pr || pr.swiped) return;
    const dx = e.clientX - pr.x;
    const dy = e.clientY - pr.y;
    // A swipe of a third of a tile picks the neighbour in that direction.
    if (Math.max(Math.abs(dx), Math.abs(dy)) < cellSize() * 0.33) return;
    pr.swiped = true;
    const to = Math.abs(dx) > Math.abs(dy) ? { r: pr.cell.r, c: pr.cell.c + Math.sign(dx) } : { r: pr.cell.r + Math.sign(dy), c: pr.cell.c };
    if (to.r < 0 || to.r >= ROWS || to.c < 0 || to.c >= COLS) return;
    void play(pr.cell, to);
  };
  const finish = () => {
    const pr = press.current;
    press.current = null;
    if (!pr || pr.swiped || busy || outcome) return;
    // A tap: select, or swap with the tile already selected.
    if (selected && adjacent(selected, pr.cell)) {
      void play(selected, pr.cell);
    } else if (selected && selected.r === pr.cell.r && selected.c === pr.cell.c) {
      setSelected(null);
    } else {
      setSelected(pr.cell);
      matchSound.link(0);
    }
  };

  // Stuck? After 10 seconds without a move (6 felt too quick: Louis, 2026-11-22), a swap that works pulses until the
  // next move (Jessica, via Louis, 2026-11-22: "if you take too long, a
  // suggestion should flash on the board").
  useEffect(() => {
    if (busy || outcome || hint || selected) return;
    const id = window.setTimeout(() => {
      const found = findMove(boardRef.current);
      if (found) {
        setHint(found);
        trackMatch("match_hint", { board: level.id, how: "idle" });
      }
    }, 10000);
    return () => window.clearTimeout(id);
  }, [board, busy, outcome, hint, selected]);

  const tiles = useMemo(() => {
    const list: Array<{ tile: Tile; r: number; c: number }> = [];
    board.forEach((row, r) => row.forEach((tile, c) => tile && list.push({ tile, r, c })));
    return list;
  }, [board]);
  const inList = (list: Pos[] | null, r: number, c: number) => !!list && list.some((p) => p.r === r && p.c === c);
  const leftFor = (type: string, count: number) => Math.max(0, count - (collected[type] || 0));

  return (
    <div
      className={`bbm-board ${level.backgrounds ? "has-art" : ""}`}
      style={
        {
          ["--bg" as string]: `url(${level.background})`,
          ["--socket" as string]: level.socket,
          ...(level.backgrounds ? { ["--bg-phone" as string]: `url(${level.backgrounds.phone})`, ["--bg-desktop" as string]: `url(${level.backgrounds.desktop})` } : {}),
        } as React.CSSProperties
      }
      data-level={level.id}
    >
      <div className="bbm-board-bg" aria-hidden="true" />

      <div className={`bbm-plaque bbm-board-title ${level.title.length > 16 ? "is-long is-xlong" : level.title.length > 10 ? "is-long" : ""}`}>
        <h1>{level.title}</h1>
        <p>— {level.reference} —</p>
        {level.hard ? <span className="bbm-hardtag">Hard board</span> : null}
      </div>

      <div className="bbm-hud">
        <div className="bbm-hud-moves">
          <span className="bbm-hud-label">Moves</span>
          <span className={`bbm-hud-count ${moves <= 5 ? "is-low" : ""}`}>{moves}</span>
        </div>
        <span className="bbm-hud-sep" />
        <div className="bbm-hud-goals">
          <div className="bbm-hud-goalrow">
            {level.goals.map((g) => {
              const left = leftFor(g.type, g.count);
              return (
                <span key={g.type} className={`bbm-goal ${left === 0 ? "is-done" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tileArt(g.type)} alt={g.type} />
                  {left === 0 ? <b className="bbm-goal-check">✓</b> : <b>×{left}</b>}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bbm-gridframe">
        <div
          key={seed}
          ref={gridRef}
          className={`bbm-grid ${reduced ? "is-reduced" : ""}`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={finish}
          onPointerCancel={finish}
          role="grid"
          aria-label={`${level.title} board: swap two tiles to line up three or more`}
        >
          {Array.from({ length: ROWS * COLS }).map((_, i) => (
            <span key={`s${i}`} className="bbm-socket" style={{ ["--r" as string]: Math.floor(i / COLS), ["--c" as string]: i % COLS } as React.CSSProperties} />
          ))}
          {beams.map((b, i) =>
            b.blast ? (
              <span key={`blast${i}`} className={`bbm-blast ${b.radius === 2 ? "is-big" : ""}`} style={{ ["--r" as string]: b.blast.r, ["--c" as string]: b.blast.c } as React.CSSProperties} aria-hidden="true" />
            ) : b.dove ? (
              <span key={`dove${i}`} hidden />
            ) : b.col !== undefined ? (
              <span key={`col${i}`} className="bbm-beam is-col" style={{ ["--c" as string]: b.col } as React.CSSProperties} aria-hidden="true" />
            ) : (
              <span key={`row${i}`} className="bbm-beam" style={{ ["--r" as string]: b.row } as React.CSSProperties} aria-hidden="true" />
            ),
          )}
          {doves.map((d, i) => (
            // The Dove's flight, from where it was to the tile it takes.
            <span
              key={`fly${i}`}
              className="bbm-dovefly"
              style={{ ["--r" as string]: d.from.r, ["--c" as string]: d.from.c, ["--tr" as string]: d.to.r, ["--tc" as string]: d.to.c } as React.CSSProperties}
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tileArt("dove")} alt="" />
            </span>
          ))}
          {rays ? (
            <svg className="bbm-rays" viewBox={`0 0 ${COLS} ${ROWS}`} aria-hidden="true">
              {rays.to.map((q, i) => (
                <line key={i} x1={rays.from.c + 0.5} y1={rays.from.r + 0.5} x2={q.c + 0.5} y2={q.r + 0.5} style={{ animationDelay: `${i * 18}ms` }} />
              ))}
            </svg>
          ) : null}
          {tiles.map(({ tile, r, c }) => {
            const drop = drops[tile.id];
            return (
              <span
                key={tile.id}
                className={[
                  "bbm-tile",
                  tile.power === "light" ? "is-light" : "",
                  tile.power === "pillar" ? "is-light is-pillar" : "",
                  tile.power === "blast" ? "is-light is-blast" : "",
                  tile.type === ORB ? "is-orb" : "",
                  tile.type === DOVE ? "is-light is-dove" : "",
                  selected && selected.r === r && selected.c === c ? "is-linked" : "",
                  flash.has(tile.id) ? "is-flash" : "",
                  popping.has(tile.id) ? "is-pop" : "",
                  drop ? "is-drop" : "",
                  inList(hint, r, c) ? "is-hint" : "",
                ].join(" ")}
                style={{ ["--r" as string]: r, ["--c" as string]: c, ["--d" as string]: drop ?? 0 } as React.CSSProperties}
                aria-label={tile.type === ORB ? "All Match orb" : tile.type === DOVE ? "Dove" : tile.power ? `${tile.type}, ${POWER_NAMES[tile.power].replace("!", "")}` : tile.type}
              >
                {tile.type === ORB ? (
                  <span className="bbm-orb" />
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tileArt(tile.type)} alt="" draggable={false} />
                    {/* Clearing: the tile breaks into four pieces that fly off, with sparks. */}
                    {popping.has(tile.id) ? (
                      <>
                        {[0, 1, 2, 3].map((k) => (
                          <span key={`s${k}`} className={`bbm-shard s${k}`} aria-hidden="true">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={tileArt(tile.type)} alt="" draggable={false} />
                          </span>
                        ))}
                        {[0, 1, 2, 3, 4, 5].map((k) => (
                          <span
                            key={`p${k}`}
                            className="bbm-spark"
                            style={{ ["--sx" as string]: `${Math.round(Math.cos((k / 6) * Math.PI * 2 + tile.id) * 34)}px`, ["--sy" as string]: `${Math.round(Math.sin((k / 6) * Math.PI * 2 + tile.id) * 34)}px` } as React.CSSProperties}
                            aria-hidden="true"
                          />
                        ))}
                      </>
                    ) : null}
                    {tile.power === "light" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="bbm-light-badge" src={tileArt("light-power-up")} alt="" draggable={false} />
                    ) : tile.power === "pillar" ? (
                      <span className="bbm-power-badge is-pillar" aria-hidden="true">🔥</span>
                    ) : tile.power === "blast" ? (
                      <span className="bbm-power-badge is-blast" aria-hidden="true">📯</span>
                    ) : null}
                  </>
                )}
              </span>
            );
          })}
          {dark ? <span className="bbm-dark" aria-hidden="true" /> : null}
        </div>
        {toast ? <div className="bbm-toast">{toast}</div> : null}
      </div>

      <div className="bbm-board-foot">
        {/* Back to the map, and Settings (music and sounds). Louis, 2026-11-23:
            "the map button should be a back button, and the other one a settings
            button". A hint still shows by itself after 10 seconds without a move. */}
        <button type="button" className="bbm-backbtn" onClick={exit} aria-label="Back to the map">
          <span aria-hidden="true">←</span> Back
        </button>
        <span className="bbm-score">Score {score}</span>
        {/* How to Play beside Settings (Louis, 2026-11-27: "add like a rules or
            something on the game about matches, what they get"). */}
        <span className="bbm-foot-right">
          <button type="button" className="bbm-gearbtn" onClick={() => setRules(true)} aria-label="How to play" title="How to play">
            <span aria-hidden="true">?</span>
          </button>
          <button type="button" className="bbm-gearbtn" onClick={() => setSettings(true)} aria-label="Settings: music and sounds" title="Settings">
            <span aria-hidden="true">⚙</span>
          </button>
        </span>
      </div>
      {rules ? <MatchRules onClose={() => setRules(false)} /> : null}
      {settings ? <MatchSettings onClose={() => setSettings(false)} /> : null}

      {/* A Genesis board won: its story screen (WinStory); other boards: the scroll. */}
      {celebrate ? (
        <div className="bbm-winburst" role="status" aria-live="polite">
          <p className="bbm-winburst-title">Board complete!</p>
          {celebrate.xp ? <p className="bbm-winburst-xp">+{celebrate.xp} XP</p> : <p className="bbm-winburst-sub">Played again</p>}
        </div>
      ) : outcome?.won && winStoryFor(level.book, level.number, level.id) ? (
        <WinStory src={winStoryFor(level.book, level.number, level.id)!} alt={`Well done! ${level.title} complete`} onContinue={onExit} />
      ) : outcome ? (
        <div className="bbm-panelwrap" role="dialog" aria-modal="true">
          <div className="bbm-panel">
            {outcome.won ? (
              <>
                <p className="bbm-panel-kicker">{level.reference}</p>
                <h2>{`${level.title} complete!`}</h2>
                {level.line ? <p className="bbm-panel-line">{level.line}</p> : null}
                {isLastLevel ? <p className="bbm-panel-line">That’s every board so far. More are coming!</p> : null}
                <p className="bbm-panel-score">
                  Score <b>{outcome.score}</b>
                  {outcome.movesLeft ? <span> · {outcome.movesLeft} moves to spare</span> : <span> · on the last move!</span>}
                </p>
                <button type="button" className="bbm-btn-green" onClick={onExit}>
                  {isLastLevel ? "Back to the map" : "Continue"}
                </button>
                <button type="button" className="bbm-btn-cream" onClick={restart}>
                  Play again
                </button>
                <Link className="bbm-panel-link" href={`/bible/${level.chapter.book}/${level.chapter.chapter}`}>
                  📖 Read {level.reference} in Bible Buddy
                </Link>
              </>
            ) : (
              <>
                <h2>Out of moves</h2>
                <ul className="bbm-panel-goals">
                  {level.goals.map((g) => (
                    <li key={g.type}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={tileArt(g.type)} alt="" /> {Math.min(g.count, collected[g.type] || 0)} / {g.count}
                    </li>
                  ))}
                </ul>
{!extraUsed && level.goals.reduce((n, g) => n + Math.max(0, g.count - (collected[g.type] || 0)), 0) <= 8 ? (
                  <button
                    type="button"
                    className="bbm-btn-green"
                    onClick={() => {
                      // So close: five more moves, once per try, free.
                      setExtraUsed(true);
                      setMoves(5);
                      setOutcome(null);
                      trackMatch("match_extra_moves", { board: level.id, number: level.number });
                    }}
                  >
                    So close! +5 moves
                  </button>
                ) : null}
                <button type="button" className={extraUsed || level.goals.reduce((n, g) => n + Math.max(0, g.count - (collected[g.type] || 0)), 0) > 8 ? "bbm-btn-green" : "bbm-btn-cream"} onClick={restart}>
                  Try again
                </button>
                <button type="button" className="bbm-btn-cream" onClick={onExit}>
                  Map
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
