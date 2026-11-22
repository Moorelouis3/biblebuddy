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
import {
  adjacent,
  cloneBoard,
  createBoard,
  COLS,
  ROWS,
  findMove,
  goalsMet,
  ORB,
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
};
import { matchSound } from "@/lib/match/sound";

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
}: {
  level: MatchLevel;
  /** Back to the map (also Continue after a win). */
  onExit: () => void;
  /** Called once when the board is won, before the panel shows. */
  onWin: (score: number) => void;
  isLastLevel: boolean;
}) {
  const reduced = useReducedMotion();
  // Tile ids for this board: one object, only ever read and bumped in handlers.
  const [ids] = useState(() => ({ current: { next: 1 } }));
  const [seed, setSeed] = useState(0); // bumps on retry
  const [board, setBoard] = useState<Board>(() => createBoard(level.types, Math.random, ids.current));
  const [moves, setMoves] = useState(level.moves);
  const [collected, setCollected] = useState<Record<string, number>>({});
  const [score, setScore] = useState(0);
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState<Pos | null>(null);
  const [flash, setFlash] = useState<Set<number>>(new Set());
  const [popping, setPopping] = useState<Set<number>>(new Set());
  const [beams, setBeams] = useState<Beam[]>([]);
  const [rays, setRays] = useState<{ from: Pos; to: Pos[] } | null>(null);
  const [drops, setDrops] = useState<Record<number, number>>({});
  const [dark, setDark] = useState(!!level.startsDark);
  const [hint, setHint] = useState<Pos[] | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const boardRef = useRef(board);
  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  // Timings (ms). Reduced motion keeps the order and drops the movement.
  const T = useMemo(() => (reduced ? { swap: 60, flash: 120, pop: 60, fall: 80, between: 40 } : { swap: 200, flash: 220, pop: 220, fall: 340, between: 60 }), [reduced]);

  const restart = () => {
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
    const res = playSwap(before, a, b, level.types, Math.random, ids.current);
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
      const fired = step.beams.map((b) => (b.blast ? "blast" : b.col !== undefined ? "pillar" : "light"));
      const shout = step.orbType ? POWER_NAMES.orb : fired.length ? POWER_NAMES[fired[0]] : null;
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
      setBoard(step.afterClear);
      // The first light: Creation's dark lifts on the first clear.
      if (dark) setDark(false);
      await sleep(T.between);
      setDrops(step.dropFrom);
      setBoard(step.afterFill);
      await sleep(T.fall);
      if (i > 0 && !reduced) {
        setToast(i >= 3 ? "Amazing chain!" : i === 2 ? "Great chain!" : "Chain!");
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
      const finalScore = total + movesLeft * 25;
      setScore(finalScore);
      onWin(finalScore);
      matchSound.win();
      setOutcome({ won: true, score: finalScore, movesLeft });
    } else if (movesLeft <= 0) {
      matchSound.lose();
      setOutcome({ won: false, score: total, movesLeft: 0 });
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

  // Stuck? After 6 seconds without a move, a swap that works pulses until the
  // next move (Jessica, via Louis, 2026-11-22: "if you take too long, a
  // suggestion should flash on the board").
  useEffect(() => {
    if (busy || outcome || hint || selected) return;
    const id = window.setTimeout(() => {
      const found = findMove(boardRef.current);
      if (found) setHint(found);
    }, 6000);
    return () => window.clearTimeout(id);
  }, [board, busy, outcome, hint, selected]);

  // The sun button shows a swap that works, for a moment.
  const showHint = () => {
    if (busy || outcome) return;
    const found = findMove(boardRef.current);
    if (!found) return;
    setHint(found);
    window.setTimeout(() => setHint(null), 2400);
  };

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
      </div>

      <div className="bbm-hud">
        <div className="bbm-hud-moves">
          <span className="bbm-hud-label">Moves</span>
          <span className={`bbm-hud-count ${moves <= 5 ? "is-low" : ""}`}>{moves}</span>
        </div>
        <span className="bbm-hud-sep" />
        <div className="bbm-hud-goals">
          <span className="bbm-hud-label">Goal</span>
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
              <span key={`blast${i}`} className="bbm-blast" style={{ ["--r" as string]: b.blast.r, ["--c" as string]: b.blast.c } as React.CSSProperties} aria-hidden="true" />
            ) : b.col !== undefined ? (
              <span key={`col${i}`} className="bbm-beam is-col" style={{ ["--c" as string]: b.col } as React.CSSProperties} aria-hidden="true" />
            ) : (
              <span key={`row${i}`} className="bbm-beam" style={{ ["--r" as string]: b.row } as React.CSSProperties} aria-hidden="true" />
            ),
          )}
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
                  selected && selected.r === r && selected.c === c ? "is-linked" : "",
                  flash.has(tile.id) ? "is-flash" : "",
                  popping.has(tile.id) ? "is-pop" : "",
                  drop ? "is-drop" : "",
                  inList(hint, r, c) ? "is-hint" : "",
                ].join(" ")}
                style={{ ["--r" as string]: r, ["--c" as string]: c, ["--d" as string]: drop ?? 0 } as React.CSSProperties}
                aria-label={tile.type === ORB ? "All Match orb" : tile.power ? `${tile.type}, ${POWER_NAMES[tile.power].replace("!", "")}` : tile.type}
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
        <button type="button" className="bbm-mapbtn" onClick={onExit}>
          <span aria-hidden="true">🗺️</span> Map
        </button>
        <span className="bbm-score">Score {score}</span>
        <button type="button" className="bbm-hintbtn" onClick={showHint} aria-label="Show a swap" title="Show a swap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tileArt("light-power-up")} alt="" />
        </button>
      </div>

      {outcome ? (
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
                <button type="button" className="bbm-btn-green" onClick={restart}>
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
