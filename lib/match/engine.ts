/**
 * Bible Buddy Match: the board rules, with no React and no timers, so the
 * whole game can be checked offline (scripts/verify-match.ts) and the screen
 * only has to animate what this returns.
 *
 * How it plays (Louis, 2026-11-22: "drawing connections across the same signs
 * to get rid of them", not swap-match-three):
 * - Drag a line through 3 or more matching tiles that touch, in any of the
 *   8 directions. Let go and the line clears. One line is one move.
 *   Dragging back onto the previous tile takes the last one off the line.
 * - A line of 5 or 6 leaves a Light Burst where it ended: the same tile with a
 *   gold rim. Linked into a later line, it sweeps its whole row.
 * - A line of 7 or more leaves an All Match orb. The orb joins any line as a
 *   wildcard, and that line then clears every tile of its kind on the board.
 * - Each power-up fires once, and each removed collectible counts once, even
 *   when clears overlap. A tile kept as a new power-up is not removed.
 * - Tiles fall, new ones drop in from above. If no line of 3 is possible the
 *   board reshuffles for free.
 *
 * A board is rows of cells; a cell holds a tile or is empty mid-resolution.
 * Every tile has a stable id so the screen can slide it from where it was to
 * where it is.
 */

export type Power = "light" | "orb";
export type Tile = { id: number; type: string; power?: Power };
export type Cell = Tile | null;
export type Board = Cell[][];
export type Pos = { r: number; c: number };

export const ORB = "orb";
export const SIZE = 7;
/** Shortest line that clears. */
export const MIN_LINE = 3;
/** Line lengths that leave a power-up behind. */
export const LIGHT_AT = 5;
export const ORB_AT = 7;

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

/** Touching, including diagonally. */
export const touching = (a: Pos, b: Pos) => !samePos(a, b) && Math.abs(a.r - b.r) <= 1 && Math.abs(a.c - b.c) <= 1;

/** The kind a line is made of: its first tile that is not an orb (null while it is all orbs). */
export function lineType(board: Board, line: Pos[]): string | null {
  for (const p of line) {
    const t = board[p.r]?.[p.c];
    if (t && t.type !== ORB) return t.type;
  }
  return null;
}

/** Can this tile be added to the end of the line? */
export function canExtend(board: Board, line: Pos[], next: Pos): boolean {
  const t = board[next.r]?.[next.c];
  if (!t) return false;
  if (line.some((p) => samePos(p, next))) return false;
  if (line.length === 0) return true;
  if (!touching(line[line.length - 1], next)) return false;
  if (t.type === ORB) return true;
  const kind = lineType(board, line);
  return kind === null || kind === t.type;
}

/** Is there any line of MIN_LINE on the board? Returns one, for hints. */
export function findLine(board: Board): Pos[] | null {
  const rows = board.length;
  const cols = board[0].length;
  // A connected group (8 directions, same kind, orbs join anything) of 3 or
  // more always contains a line of 3, so a short search is enough.
  const extend = (line: Pos[]): Pos[] | null => {
    if (line.length >= MIN_LINE) return line;
    const last = line[line.length - 1];
    for (let dr = -1; dr <= 1; dr += 1) {
      for (let dc = -1; dc <= 1; dc += 1) {
        const n = { r: last.r + dr, c: last.c + dc };
        if (n.r < 0 || n.c < 0 || n.r >= rows || n.c >= cols) continue;
        if (canExtend(board, line, n)) {
          const found = extend([...line, n]);
          if (found) return found;
        }
      }
    }
    return null;
  };
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const found = extend([{ r, c }]);
      if (found && lineType(board, found) !== null) return found;
    }
  }
  return null;
}

/** A fresh board with at least one line to make. */
export function createBoard(types: string[], rng: Rng, ids: IdSource, rows = SIZE, cols = SIZE): Board {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const b: Board = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({ id: ids.next++, type: pick(types, rng) }) as Cell));
    if (findLine(b)) return b;
  }
  throw new Error("Could not deal a playable board.");
}

/** Same tiles, new places, with a line available. Costs nothing. */
export function reshuffle(b: Board, rng: Rng): Board {
  const tiles = b.flat().filter((t): t is Tile => !!t);
  const rows = b.length;
  const cols = b[0].length;
  for (let attempt = 0; attempt < 500; attempt += 1) {
    const bag = [...tiles];
    for (let i = bag.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    const next: Board = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => ({ ...bag[r * cols + c] })));
    if (findLine(next)) return next;
  }
  return b;
}

// ---------- resolving a line ----------

export type Beam = { row: number };

export type Step = {
  /** Cells that clear (each counted once). */
  cleared: Pos[];
  /** Rows swept by a Light Burst. */
  beams: Beam[];
  /** The kind an All Match orb cleared, if one was in the line. */
  orbType: string | null;
  /** The power-up left behind (kept, not counted). */
  made: Array<Pos & { tile: Tile }>;
  /** The board with the cleared cells empty and the power-up in place. */
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
  steps: Step[];
  final: Board;
  removed: Record<string, number>;
  points: number;
  /** True when the board had to be reshuffled at the end (no line left). */
  reshuffled: boolean;
};

/** Is this a line that clears? */
export function lineIsValid(board: Board, line: Pos[]): boolean {
  if (line.length < MIN_LINE) return false;
  if (lineType(board, line) === null) return false; // all orbs: nothing to match
  for (let i = 0; i < line.length; i += 1) if (!canExtend(board, line.slice(0, i), line[i])) return false;
  return true;
}

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

/** Play a line from start to finish. An invalid line changes nothing and costs nothing. */
export function playLine(board: Board, line: Pos[], types: string[], rng: Rng, ids: IdSource): Resolution {
  if (!lineIsValid(board, line)) return { valid: false, steps: [], final: board, removed: {}, points: 0, reshuffled: false };
  const rows = board.length;
  const cols = board[0].length;
  const kind = lineType(board, line)!;
  const clear = new Set<string>(line.map((p) => key(p.r, p.c)));

  // An orb in the line takes every tile of the line's kind.
  const hasOrb = line.some((p) => board[p.r][p.c]?.type === ORB);
  if (hasOrb) board.forEach((row, r) => row.forEach((t, c) => t && t.type === kind && clear.add(key(r, c))));

  // The power-up the line leaves: on its last tile that is not already a power-up.
  const made: Array<Pos & { tile: Tile }> = [];
  if (line.length >= LIGHT_AT) {
    const spot = [...line].reverse().find((p) => !board[p.r][p.c]?.power);
    if (spot) {
      const base = board[spot.r][spot.c]!;
      const tile: Tile = line.length >= ORB_AT ? { id: base.id, type: ORB, power: "orb" } : { id: base.id, type: base.type, power: "light" };
      made.push({ ...spot, tile });
      clear.delete(key(spot.r, spot.c));
    }
  }
  const keep = new Set(made.map((m) => key(m.r, m.c)));

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
          const kk = key(r, cc);
          if (!keep.has(kk) && !clear.has(kk)) {
            clear.add(kk);
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
  for (const m of made) afterClear[m.r][m.c] = m.tile;
  void rows;
  // Longer lines are worth more per tile.
  const points = cleared.length * (10 + Math.max(0, line.length - MIN_LINE) * 2) + made.length * 40 + beams.length * 30 + (hasOrb ? 60 : 0);
  const { board: afterFill, dropFrom } = fall(afterClear, types, rng, ids);
  const step: Step = { cleared, beams, orbType: hasOrb ? kind : null, made, afterClear, afterFill, dropFrom, removed, points };

  let final = afterFill;
  let reshuffled = false;
  if (!findLine(final)) {
    final = reshuffle(final, rng);
    reshuffled = true;
  }
  return { valid: true, steps: [step], final, removed, points, reshuffled };
}

// ---------- levels ----------

export type Goal = { type: string; count: number };
export type MatchLevel = {
  id: "creation" | "eden";
  number: number;
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
export const MATCH_LEVELS: MatchLevel[] = [
  {
    id: "creation",
    number: 1,
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

export const tileArt = (type: string) => `/games/match/tiles/${type}.webp`;

export function goalsMet(goals: Goal[], collected: Record<string, number>) {
  return goals.every((g) => (collected[g.type] || 0) >= g.count);
}
