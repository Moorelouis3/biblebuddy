"use client";

/**
 * One Bible Buddy Match board: the 7x9 grid, the parchment HUD (moves and
 * goals), and the win / out-of-moves panels. The rules are lib/match/engine.ts;
 * this file draws the line you drag and animates what letting go resolves to:
 *   flash, beams, pop, the power-up left behind, tiles fall, new tiles drop in,
 *   then a free reshuffle if no line is left.
 * Input is locked from letting go until the last tile lands. With reduced
 * motion the same order runs with short pauses and no movement.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  canExtend,
  createBoard,
  COLS,
  ROWS,
  findLine,
  goalsMet,
  lineType,
  LIGHT_AT,
  MIN_LINE,
  ORB,
  ORB_AT,
  playLine,
  tileArt,
  type Board,
  type MatchLevel,
  type Pos,
  type Tile,
} from "@/lib/match/engine";
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
  const [line, setLine] = useState<Pos[]>([]);
  const [flash, setFlash] = useState<Set<number>>(new Set());
  const [popping, setPopping] = useState<Set<number>>(new Set());
  const [beams, setBeams] = useState<number[]>([]);
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
  const T = useMemo(() => (reduced ? { flash: 120, pop: 60, fall: 80, between: 40 } : { flash: 240, pop: 220, fall: 340, between: 60 }), [reduced]);

  const restart = () => {
    setBoard(createBoard(level.types, Math.random, ids.current));
    setMoves(level.moves);
    setCollected({});
    setScore(0);
    setLine([]);
    setFlash(new Set());
    setPopping(new Set());
    setBeams([]);
    setDrops({});
    setDark(!!level.startsDark);
    setOutcome(null);
    setSeed((s) => s + 1);
  };

  const play = async (drawn: Pos[]) => {
      if (busy || outcome) return;
      const before = boardRef.current;
      const res = playLine(before, drawn, level.types, Math.random, ids.current);
      if (!res.valid) {
        if (drawn.length > 1) matchSound.nope();
        return; // too short: nothing happens, no move used
      }
      setBusy(true);
      setHint(null);
      const movesLeft = moves - 1;
      setMoves(movesLeft);
      let got = { ...collected };
      let total = score;
      for (const step of res.steps) {
        const clearedIds = new Set(step.cleared.map((p) => before[p.r][p.c]?.id).filter((id): id is number => typeof id === "number"));
        setFlash(clearedIds);
        setBeams(step.beams.map((b) => b.row));
        if (step.orbType) matchSound.orb();
        else if (step.beams.length) matchSound.beam();
        else matchSound.match(Math.min(6, drawn.length - MIN_LINE));
        matchSound.crack();
        await sleep(T.flash);
        setPopping(clearedIds);
        await sleep(T.pop);
        for (const [t, n] of Object.entries(step.removed)) got = { ...got, [t]: (got[t] || 0) + n };
        total += step.points;
        setCollected(got);
        setScore(total);
        if (step.made.length) matchSound.power();
        setFlash(new Set());
        setPopping(new Set());
        setBeams([]);
        setBoard(step.afterClear);
        // The first light: Creation's dark lifts on the first clear.
        if (dark) setDark(false);
        await sleep(T.between);
        setDrops(step.dropFrom);
        setBoard(step.afterFill);
        await sleep(T.fall);
      }
      if (res.reshuffled) {
        setToast("No lines left. Shuffling…");
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

  // ---- input: drag a line (finger or mouse) ----
  const gridRef = useRef<HTMLDivElement | null>(null);
  const drawing = useRef(false);
  const lineRef = useRef<Pos[]>([]);
  const setLineBoth = (next: Pos[]) => {
    lineRef.current = next;
    setLine(next);
  };
  /**
   * The cell under the pointer, only when the pointer is near its middle, so
   * a diagonal drag does not catch the cells beside the corner it passes.
   */
  const cellAt = (clientX: number, clientY: number, strict: boolean): Pos | null => {
    const el = gridRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const size = rect.width / COLS;
    const fx = (clientX - rect.left) / size;
    const fy = (clientY - rect.top) / size;
    const c = Math.floor(fx);
    const r = Math.floor(fy);
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return null;
    if (strict) {
      const dx = fx - c - 0.5;
      const dy = fy - r - 0.5;
      if (dx * dx + dy * dy > 0.38 * 0.38) return null;
    }
    return { r, c };
  };
  const onDown = (e: React.PointerEvent) => {
    if (busy || outcome) return;
    const cell = cellAt(e.clientX, e.clientY, false);
    if (!cell || !boardRef.current[cell.r][cell.c]) return;
    matchSound.unlock();
    drawing.current = true;
    setHint(null);
    setLineBoth([cell]);
    matchSound.link(0);
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const cell = cellAt(e.clientX, e.clientY, true);
    if (!cell) return;
    const current = lineRef.current;
    const last = current[current.length - 1];
    if (last && last.r === cell.r && last.c === cell.c) return;
    // Back onto the previous tile: take the last one off.
    const prev = current[current.length - 2];
    if (prev && prev.r === cell.r && prev.c === cell.c) {
      setLineBoth(current.slice(0, -1));
      matchSound.link(current.length - 2);
      return;
    }
    if (canExtend(boardRef.current, current, cell)) {
      setLineBoth([...current, cell]);
      matchSound.link(current.length);
    }
  };
  const finish = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const drawn = lineRef.current;
    setLineBoth([]);
    void play(drawn);
  };

  // The sun button shows a line for a moment.
  const showHint = () => {
    if (busy || outcome) return;
    const found = findLine(boardRef.current);
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
  const kind = line.length ? lineType(board, line) : null;
  const reward = line.length >= ORB_AT ? "All Match orb!" : line.length >= LIGHT_AT ? "Light Burst!" : null;

  return (
    <div className="bbm-board" style={{ ["--bg" as string]: `url(${level.background})`, ["--socket" as string]: level.socket } as React.CSSProperties} data-level={level.id}>
      <div className="bbm-board-bg" aria-hidden="true" />

      <div className={`bbm-plaque bbm-board-title ${level.title.length > 10 ? "is-long" : ""}`}>
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
          aria-label={`${level.title} board: drag across matching tiles`}
        >
          {Array.from({ length: ROWS * COLS }).map((_, i) => (
            <span key={`s${i}`} className="bbm-socket" style={{ ["--r" as string]: Math.floor(i / COLS), ["--c" as string]: i % COLS } as React.CSSProperties} />
          ))}
          {beams.map((row) => (
            <span key={`beam${row}`} className="bbm-beam" style={{ ["--r" as string]: row } as React.CSSProperties} aria-hidden="true" />
          ))}
          {tiles.map(({ tile, r, c }) => {
            const drop = drops[tile.id];
            return (
              <span
                key={tile.id}
                className={[
                  "bbm-tile",
                  tile.power === "light" ? "is-light" : "",
                  tile.type === ORB ? "is-orb" : "",
                  inList(line, r, c) ? "is-linked" : "",
                  line.length && kind && tile.type !== kind && tile.type !== ORB && !inList(line, r, c) ? "is-dim" : "",
                  flash.has(tile.id) ? "is-flash" : "",
                  popping.has(tile.id) ? "is-pop" : "",
                  drop ? "is-drop" : "",
                  inList(hint, r, c) ? "is-hint" : "",
                ].join(" ")}
                style={{ ["--r" as string]: r, ["--c" as string]: c, ["--d" as string]: drop ?? 0 } as React.CSSProperties}
                aria-label={tile.type === ORB ? "All Match orb" : tile.power === "light" ? `${tile.type}, Light Burst` : tile.type}
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
                    ) : null}
                  </>
                )}
              </span>
            );
          })}
          {/* The line being drawn, through the middles of the linked tiles. */}
          {line.length > 1 ? (
            <svg className="bbm-linksvg" viewBox={`0 0 ${COLS} ${ROWS}`} aria-hidden="true">
              <polyline className="bbm-link-glow" points={line.map((p) => `${p.c + 0.5},${p.r + 0.5}`).join(" ")} />
              <polyline className="bbm-link" points={line.map((p) => `${p.c + 0.5},${p.r + 0.5}`).join(" ")} />
            </svg>
          ) : null}
          {line.length ? (
            <span
              className={`bbm-linkcount ${line.length >= MIN_LINE ? "is-ready" : ""}`}
              style={{ ["--r" as string]: line[line.length - 1].r, ["--c" as string]: line[line.length - 1].c } as React.CSSProperties}
              aria-live="polite"
            >
              {line.length}
              {reward ? <em>{reward}</em> : null}
            </span>
          ) : null}
          {dark ? <span className="bbm-dark" aria-hidden="true" /> : null}
        </div>
        {toast ? <div className="bbm-toast">{toast}</div> : null}
      </div>

      <div className="bbm-board-foot">
        <button type="button" className="bbm-mapbtn" onClick={onExit}>
          <span aria-hidden="true">🗺️</span> Map
        </button>
        <span className="bbm-score">Score {score}</span>
        <button type="button" className="bbm-hintbtn" onClick={showHint} aria-label="Show a line" title="Show a line">
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
                <h2>{isLastLevel ? "Creation to Eden, done!" : `${level.title} complete!`}</h2>
                <p className="bbm-panel-line">{level.id === "creation" ? "“Let there be light: and there was light.”" : "“The LORD God planted a garden eastward in Eden.”"}</p>
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
