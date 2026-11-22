/**
 * Bible Buddy Match: the board rules, with no React and no timers, so the
 * whole game can be checked offline (scripts/verify-match.ts) and the screen
 * only has to animate what this returns.
 *
 * How it plays (Louis, 2026-11-22: "switch from the drag the line way... back
 * to the swap one icon to match 3, 4, 5, or however many in a row"):
 * - Swap two tiles that sit side by side or one above the other. If that
 *   lines up 3 or more of a kind in a row or a column, they clear and it
 *   costs one move. A swap that lines nothing up goes back and costs nothing.
 * - Every matched tile clears. A run of 4 earns a Light Burst and a run of 5
 *   or more an All Match orb; the power-up drops in from the top of that
 *   column with the new tiles.
 * - A Light Burst caught in a clear sweeps its whole row. Swap an orb with
 *   any tile to clear every tile of that kind (two orbs: the whole board).
 * - Tiles fall, new ones drop in, and anything that lines up then clears too
 *   (a chain, worth more each time). If no swap is possible the board
 *   reshuffles for free.
 *
 * A board is rows of cells; a cell holds a tile or is empty mid-resolution.
 * Every tile has a stable id so the screen can slide it from where it was to
 * where it is.
 */

import BOARD_CONFIGS from "./boards.generated.json";

export type Power = "light" | "orb";
export type Tile = { id: number; type: string; power?: Power };
export type Cell = Tile | null;
export type Board = Cell[][];
export type Pos = { r: number; c: number };

export const ORB = "orb";
export const SIZE = 7;
/** The board: 7 across, 9 down (Louis, 2026-11-22: the 7x7 left the top of the screen empty). */
export const COLS = 7;
export const ROWS = 9;
/** Shortest run (row or column) that clears. */
export const MIN_LINE = 3;
/** Run lengths that earn a power-up: 4 a Light Burst, 5 or more an All Match orb. */
export const LIGHT_AT = 4;
export const ORB_AT = 5;

export type Rng = () => number;

/** Small seeded generator (mulberry32): the same seed always deals the same board. */
export function seededRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Ids for new tiles, kept outside the board so a replay never reuses one mid-animation. */
export type IdSource = { next: number };

const pick = <T,>(list: T[], rng: Rng) => list[Math.floor(rng() * list.length) % list.length];
export const cloneBoard = (b: Board): Board => b.map((row) => row.map((t) => (t ? { ...t } : null)));
const key = (r: number, c: number) => `${r},${c}`;
const samePos = (a: Pos, b: Pos) => a.r === b.r && a.c === b.c;

/** Side by side or one above the other (no diagonals): the swaps you can make. */
export const adjacent = (a: Pos, b: Pos) => Math.abs(a.r - b.r) + Math.abs(a.c - b.c) === 1;

/**
 * Every row or column run of MIN_LINE or more of one kind (orbs never make a
 * run). Each run is its cells in order.
 */
export function findRuns(board: Board): Pos[][] {
  const rows = board.length;
  const cols = board[0].length;
  const runs: Pos[][] = [];
  const typeAt = (r: number, c: number) => {
    const t = board[r]?.[c];
    return t && t.type !== ORB ? t.type : null;
  };
  for (let r = 0; r < rows; r += 1) {
    let c = 0;
    while (c < cols) {
      const t = typeAt(r, c);
      let end = c + 1;
      while (t && end < cols && typeAt(r, end) === t) end += 1;
      if (t && end - c >= MIN_LINE) runs.push(Array.from({ length: end - c }, (_, i) => ({ r, c: c + i })));
      c = end;
    }
  }
  for (let c = 0; c < cols; c += 1) {
    let r = 0;
    while (r < rows) {
      const t = typeAt(r, c);
      let end = r + 1;
      while (t && end < rows && typeAt(end, c) === t) end += 1;
      if (t && end - r >= MIN_LINE) runs.push(Array.from({ length: end - r }, (_, i) => ({ r: r + i, c })));
      r = end;
    }
  }
  return runs;
}

function swapped(board: Board, a: Pos, b: Pos): Board {
  const next = cloneBoard(board);
  const t = next[a.r][a.c];
  next[a.r][a.c] = next[b.r][b.c];
  next[b.r][b.c] = t;
  return next;
}

/** Would swapping these two make something happen? */
export function swapWorks(board: Board, a: Pos, b: Pos): boolean {
  if (!adjacent(a, b)) return false;
  const ta = board[a.r]?.[a.c];
  const tb = board[b.r]?.[b.c];
  if (!ta || !tb) return false;
  if (ta.type === ORB || tb.type === ORB) return true;
  return findRuns(swapped(board, a, b)).length > 0;
}

/** A swap that works, for the hint (null when the board is stuck). */
export function findMove(board: Board): [Pos, Pos] | null {
  const rows = board.length;
  const cols = board[0].length;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      for (const n of [{ r, c: c + 1 }, { r: r + 1, c }]) {
        if (n.r < rows && n.c < cols && swapWorks(board, { r, c }, n)) return [{ r, c }, n];
      }
    }
  }
  return null;
}

/** Kept for older callers: a move's two tiles, or null. */
export function findLine(board: Board): Pos[] | null {
  return findMove(board);
}

/** A fresh board: nothing already lined up, and at least one swap that works. */
export function createBoard(types: string[], rng: Rng, ids: IdSource, rows = ROWS, cols = COLS): Board {
  for (let attempt = 0; attempt < 500; attempt += 1) {
    const b: Board = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null as Cell));
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        // Never deal three in a row: pick again when this one would make a run.
        let type = pick(types, rng);
        for (let tries = 0; tries < 12; tries += 1) {
          const rowRun = c >= 2 && b[r][c - 1]?.type === type && b[r][c - 2]?.type === type;
          const colRun = r >= 2 && b[r - 1][c]?.type === type && b[r - 2][c]?.type === type;
          if (!rowRun && !colRun) break;
          type = pick(types, rng);
        }
        b[r][c] = { id: ids.next++, type };
      }
    }
    if (findRuns(b).length === 0 && findMove(b)) return b;
  }
  throw new Error("Could not deal a playable board.");
}

/** Same tiles, new places: nothing lined up, a swap available. Costs nothing. */
export function reshuffle(b: Board, rng: Rng): Board {
  const tiles = b.flat().filter((t): t is Tile => !!t);
  const rows = b.length;
  const cols = b[0].length;
  for (let attempt = 0; attempt < 800; attempt += 1) {
    const bag = [...tiles];
    for (let i = bag.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    const next: Board = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => ({ ...bag[r * cols + c] })));
    if (findRuns(next).length === 0 && findMove(next)) return next;
  }
  return b;
}

// ---------- resolving a swap ----------

export type Beam = { row: number };

export type Step = {
  /** Cells that clear (each counted once). */
  cleared: Pos[];
  /** Rows swept by a Light Burst. */
  beams: Beam[];
  /** The kind an All Match orb cleared, if one was used. */
  orbType: string | null;
  /** Power-ups earned this step (they drop in from the top with the new tiles). */
  made: Array<Pos & { tile: Tile }>;
  /** The longest run this step, for the sound. */
  longest: number;
  /** The board this step starts from. */
  before: Board;
  /** With the cleared cells empty. */
  afterClear: Board;
  /** After the fall and the refill. */
  afterFill: Board;
  /** For each new tile id, how many rows above its final row it drops from. */
  dropFrom: Record<number, number>;
  /** Collectibles removed, by kind. */
  removed: Record<string, number>;
  points: number;
};

export type Resolution = {
  valid: boolean;
  /** The two tiles swapped, and the board right after the swap. */
  swap: [Pos, Pos] | null;
  afterSwap: Board;
  /** The clear, then each chain reaction it sets off. */
  steps: Step[];
  final: Board;
  removed: Record<string, number>;
  points: number;
  /** True when the board had to be reshuffled at the end (no swap left). */
  reshuffled: boolean;
};

/** Gravity and refill. Returns the new board and how far each new tile drops. */
function fall(b: Board, types: string[], rng: Rng, ids: IdSource): { board: Board; dropFrom: Record<number, number> } {
  const rows = b.length;
  const cols = b[0].length;
  const next: Board = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null as Cell));
  const dropFrom: Record<number, number> = {};
  for (let c = 0; c < cols; c += 1) {
    const stack: Tile[] = [];
    for (let r = rows - 1; r >= 0; r -= 1) {
      const t = b[r][c];
      if (t) stack.push(t);
    }
    let r = rows - 1;
    for (const t of stack) next[r--][c] = t;
    const missing = r + 1;
    for (; r >= 0; r -= 1) {
      const t: Tile = { id: ids.next++, type: pick(types, rng) };
      next[r][c] = t;
      dropFrom[t.id] = missing; // the new tiles of a column drop in together
    }
  }
  return { board: next, dropFrom };
}

/**
 * Clear a set of cells (plus the rows of any Light Bursts caught in it), let
 * the tiles fall, and drop in the power-ups earned.
 */
function clearStep(
  board: Board,
  start: Set<string>,
  earned: Array<{ c: number; power: Power; type: string }>,
  orbType: string | null,
  longest: number,
  chain: number,
  types: string[],
  rng: Rng,
  ids: IdSource,
): Step {
  const cols = board[0].length;
  const clear = new Set(start);
  // Light Bursts caught in the clear sweep their row, once each; a sweep can
  // catch another Light Burst, which sweeps its own row.
  const fired = new Set<number>();
  const beams: Beam[] = [];
  let grew = true;
  while (grew) {
    grew = false;
    for (const k of [...clear]) {
      const [r, c] = k.split(",").map(Number);
      const t = board[r][c];
      if (t?.power === "light" && !fired.has(t.id)) {
        fired.add(t.id);
        beams.push({ row: r });
        for (let cc = 0; cc < cols; cc += 1) {
          if (!clear.has(key(r, cc))) {
            clear.add(key(r, cc));
            grew = true;
          }
        }
      }
    }
  }
  const removed: Record<string, number> = {};
  const afterClear = cloneBoard(board);
  const cleared: Pos[] = [];
  for (const k of clear) {
    const [r, c] = k.split(",").map(Number);
    const t = board[r][c];
    if (!t) continue;
    cleared.push({ r, c });
    if (t.type !== ORB) removed[t.type] = (removed[t.type] || 0) + 1;
    afterClear[r][c] = null;
  }
  const { board: afterFill, dropFrom } = fall(afterClear, types, rng, ids);
  // Every matched tile clears (Louis: "if I select six, all six need to be
  // gone"); a power-up earned drops in at the top of its column.
  const made: Step["made"] = [];
  const usedCols = new Set<number>();
  for (const e of earned) {
    let c = e.c;
    if (usedCols.has(c)) c = [...Array(cols).keys()].find((x) => !usedCols.has(x) && afterFill[0][x]) ?? c;
    usedCols.add(c);
    const top = afterFill[0][c];
    if (!top) continue;
    const tile: Tile = e.power === "orb" ? { id: top.id, type: ORB, power: "orb" } : { id: top.id, type: e.type, power: "light" };
    afterFill[0][c] = tile;
    made.push({ r: 0, c, tile });
  }
  // Chains are worth more: x1, x2, x3...
  const points = (cleared.length * 10 + made.length * 40 + beams.length * 30 + (orbType ? 60 : 0)) * chain;
  return { cleared, beams, orbType, made, longest, before: board, afterClear, afterFill, dropFrom, removed, points };
}

/** The runs on a board as one clear: their cells, and the power-ups they earn (4 = Light Burst, 5+ = orb). */
function runsToClear(board: Board, runs: Pos[][], prefer: Pos[]) {
  const start = new Set<string>();
  const earned: Array<{ c: number; power: Power; type: string }> = [];
  let longest = 0;
  for (const run of runs) {
    for (const p of run) start.add(key(p.r, p.c));
    longest = Math.max(longest, run.length);
    if (run.length >= LIGHT_AT) {
      // Where the swap landed in this run, else its middle: that column gets the power-up.
      const at = run.find((p) => prefer.some((q) => samePos(p, q))) ?? run[Math.floor(run.length / 2)];
      earned.push({ c: at.c, power: run.length >= ORB_AT ? "orb" : "light", type: board[at.r][at.c]!.type });
    }
  }
  return { start, earned, longest };
}

/**
 * Swap two neighbouring tiles. A swap that lines nothing up is not a move:
 * the tiles go back and no move is used. Otherwise everything lined up
 * clears, tiles fall, and any new lines clear too (a chain), until the board
 * settles.
 */
export function playSwap(board: Board, a: Pos, b: Pos, types: string[], rng: Rng, ids: IdSource): Resolution {
  const none: Resolution = { valid: false, swap: null, afterSwap: board, steps: [], final: board, removed: {}, points: 0, reshuffled: false };
  if (!swapWorks(board, a, b)) return none;
  const afterSwap = swapped(board, a, b);
  const steps: Step[] = [];
  let current = afterSwap;
  const ta = board[a.r][a.c]!;
  const tb = board[b.r][b.c]!;

  // An orb swapped with a tile takes every tile of that kind (and itself).
  if (ta.type === ORB || tb.type === ORB) {
    const orbAt = ta.type === ORB ? b : a; // where the orb is now
    const other = ta.type === ORB ? tb : ta;
    const start = new Set<string>([key(orbAt.r, orbAt.c)]);
    let orbType: string | null = null;
    if (other.type === ORB) {
      // Two orbs: the whole board.
      current.forEach((row, r) => row.forEach((_, c) => start.add(key(r, c))));
      orbType = "all";
    } else {
      orbType = other.type;
      current.forEach((row, r) => row.forEach((t, c) => t && t.type === other.type && start.add(key(r, c))));
    }
    const step = clearStep(current, start, [], orbType, 0, 1, types, rng, ids);
    steps.push(step);
    current = step.afterFill;
  }

  for (let chain = steps.length + 1; chain <= 30; chain += 1) {
    const runs = findRuns(current);
    if (!runs.length) break;
    const { start, earned, longest } = runsToClear(current, runs, chain === 1 ? [a, b] : []);
    const step = clearStep(current, start, earned, null, longest, chain, types, rng, ids);
    steps.push(step);
    current = step.afterFill;
  }

  const removed: Record<string, number> = {};
  let points = 0;
  for (const s of steps) {
    points += s.points;
    for (const [t, n] of Object.entries(s.removed)) removed[t] = (removed[t] || 0) + n;
  }
  let final = current;
  let reshuffled = false;
  if (!findMove(final)) {
    final = reshuffle(final, rng);
    reshuffled = true;
  }
  return { valid: true, swap: [a, b], afterSwap, steps, final, removed, points, reshuffled };
}

// ---------- levels ----------

export type Goal = { type: string; count: number };
export type MatchLevel = {
  id: string;
  number: number;
  /** "Genesis", "Exodus": the map ribbon and home label. */
  book: string;
  /** The board's own backgrounds (Drive board folders); Creation and Eden use matchCss. */
  backgrounds?: { phone: string; desktop: string };
  /** The line on the win scroll. */
  line?: string;
  title: string;
  reference: string;
  /** For "Read in Bible Buddy". */
  chapter: { book: string; chapter: number };
  types: string[];
  goals: Goal[];
  moves: number;
  background: string;
  /** Socket colour behind each tile. */
  socket: string;
  /** Creation starts dark and the dark lifts on the first clear. */
  startsDark?: boolean;
};

/** Goals and moves are here so they can be tuned after playtesting. */
const FIRST_LEVELS: MatchLevel[] = [
  {
    id: "creation",
    number: 1,
    book: "Genesis",
    line: "“Let there be light: and there was light.”",
    title: "Creation",
    reference: "Genesis 1",
    chapter: { book: "genesis", chapter: 1 },
    types: ["sun", "moon", "star", "globe", "tree", "lion", "lamb"],
    goals: [
      { type: "sun", count: 8 },
      { type: "globe", count: 8 },
      { type: "tree", count: 8 },
    ],
    moves: 28,
    background: "/games/match/backgrounds/creation.webp",
    socket: "#1b2b57",
    startsDark: true,
  },
  {
    id: "eden",
    number: 2,
    book: "Genesis",
    line: "“The LORD God planted a garden eastward in Eden.”",
    title: "Garden of Eden",
    reference: "Genesis 2–3",
    chapter: { book: "genesis", chapter: 2 },
    types: ["adam", "eve", "orange", "fig", "water-drop", "dove", "tree"],
    goals: [
      { type: "orange", count: 8 },
      { type: "dove", count: 8 },
      { type: "tree", count: 8 },
    ],
    moves: 28,
    background: "/games/match/backgrounds/eden.webp",
    socket: "#1d4a2a",
  },
];

/**
 * Every board after Eden comes from Louis's Drive board folders (2026-11-22:
 * "the rest of the Genesis boards and Exodus... the first 20 levels"), one
 * board-config.json each, collected into boards.generated.json with their art
 * under public/games/match/boards/<slug>/. The configs ask for 7x7; every
 * board is 7 across and 9 down here (ROWS), like Creation and Eden.
 */
type BoardConfig = {
  slug: string;
  level: number;
  name: string;
  scripture: string;
  moveLimit: number;
  tiles: string[];
  goals: Record<string, number>;
  goalText?: string;
  storyEffect?: string;
  chapter?: string;
};

/** "Exodus 7:14–10:29" -> exodus 7; "Genesis 6–9" -> genesis 6. */
function chapterOf(scripture: string): { book: string; chapter: number } {
  const m = /^\s*((?:\d\s)?[A-Za-z ]+?)\s+(\d+)/.exec(scripture || "");
  return m ? { book: m[1].trim().toLowerCase().replace(/\s+/g, "-"), chapter: Number(m[2]) } : { book: "genesis", chapter: 1 };
}

const SOCKETS = ["#1b2b57", "#1d4a2a", "#4a2a14", "#1f3b4d", "#3b2350"];

/** The playable order: Genesis boards after Eden, then Exodus; the first 20. */
export const MAX_MATCH_LEVELS = 20;
function fromConfigs(configs: BoardConfig[]): MatchLevel[] {
  const book = (c: BoardConfig) => (c.chapter || c.slug.split("-")[0]).replace(/^\w/, (x) => x.toUpperCase());
  const order = (c: BoardConfig) => (book(c).toLowerCase() === "genesis" ? 0 : 1) * 1000 + c.level;
  const rest = configs
    // Creation and Eden are the first two boards already.
    .filter((c) => !(book(c).toLowerCase() === "genesis" && c.level <= 2))
    .filter((c) => c.tiles?.length >= 4 && Object.keys(c.goals || {}).length > 0)
    .sort((a, b) => order(a) - order(b));
  return rest.map((c, i) => ({
    id: c.slug,
    number: FIRST_LEVELS.length + i + 1,
    book: book(c),
    title: c.name,
    reference: c.scripture,
    chapter: chapterOf(c.scripture),
    types: c.tiles,
    goals: Object.entries(c.goals).map(([type, count]) => ({ type, count })),
    moves: c.moveLimit || 28,
    background: `/games/match/boards/${c.slug}/background-phone.webp`,
    backgrounds: { phone: `/games/match/boards/${c.slug}/background-phone.webp`, desktop: `/games/match/boards/${c.slug}/background-desktop.webp` },
    line: c.storyEffect || c.goalText,
    socket: SOCKETS[(FIRST_LEVELS.length + i) % SOCKETS.length],
  }));
}

export const MATCH_LEVELS: MatchLevel[] = [...FIRST_LEVELS, ...fromConfigs(BOARD_CONFIGS as unknown as BoardConfig[])].slice(0, MAX_MATCH_LEVELS);

export const tileArt = (type: string) => `/games/match/tiles/${type}.webp`;

export function goalsMet(goals: Goal[], collected: Record<string, number>) {
  return goals.every((g) => (collected[g.type] || 0) >= g.count);
}
