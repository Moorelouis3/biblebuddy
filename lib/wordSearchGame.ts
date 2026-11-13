/**
 * Bible Word Search: the puzzle rules, and nothing else (2026-11-13).
 *
 * Plain functions of their inputs: no Supabase, no window, no clock. A puzzle
 * is fully decided by (book, seed), so the grid is never stored - only the
 * seed and the words found - and reopening an unfinished puzzle rebuilds the
 * identical grid. scripts/verify-word-search.ts generates thousands of them
 * offline to prove every word is there exactly once.
 *
 * The word lists are in lib/wordSearchData.ts; saving is in
 * lib/wordSearchProgress.ts.
 */

export const GRID_SIZE = 12;

export type Cell = { row: number; col: number };

export type Placement = {
  /** The letters as placed: upper case, no spaces or punctuation. */
  letters: string;
  row: number;
  col: number;
  dRow: number;
  dCol: number;
};

export type Puzzle = {
  size: number;
  /** rows of single upper-case letters */
  grid: string[][];
  placements: Placement[];
  /** Which try produced this grid. 0 nearly always. */
  attempt: number;
  /** True when the one-word-per-row fallback had to be used. */
  fallback: boolean;
};

/**
 * The relaxed default: words read left to right, top to bottom, and along
 * both diagonals, but never backwards.
 */
export const PLACE_DIRECTIONS: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
];

const ALL_DIRECTIONS: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [1, -1],
];

/** "Red Sea", "FIG TREE", "Jesus'" -> "REDSEA", "FIGTREE", "JESUS". */
export function normalizeLetters(label: string): string {
  return label.normalize("NFKD").toUpperCase().replace(/[^A-Z]/g, "");
}

// ───────────────────────── seeded randomness ─────────────────────────

export function hashString(text: string): number {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

/** A fresh seed for "Play again". Not used for anything that needs to repeat. */
export function newSeed(): number {
  return Math.floor(Math.random() * 2147483646) + 1;
}

// ───────────────────────── building a grid ─────────────────────────

export function placementCells(placement: Placement): Cell[] {
  return Array.from({ length: placement.letters.length }, (_, index) => ({
    row: placement.row + placement.dRow * index,
    col: placement.col + placement.dCol * index,
  }));
}

function emptyGrid(size: number): string[][] {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => ""));
}

function fits(grid: string[][], letters: string, row: number, col: number, dRow: number, dCol: number) {
  const size = grid.length;
  const endRow = row + dRow * (letters.length - 1);
  const endCol = col + dCol * (letters.length - 1);
  if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) return false;
  for (let index = 0; index < letters.length; index += 1) {
    const existing = grid[row + dRow * index][col + dCol * index];
    // Overlaps are welcome, but only where the letters agree.
    if (existing && existing !== letters[index]) return false;
  }
  return true;
}

function write(grid: string[][], placement: Placement) {
  placementCells(placement).forEach((cell, index) => {
    grid[cell.row][cell.col] = placement.letters[index];
  });
}

const FILLER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function fill(base: string[][], random: () => number): string[][] {
  return base.map((row) => row.map((letter) => letter || FILLER[Math.floor(random() * FILLER.length)]));
}

/**
 * How many different places in the grid spell this word, reading in any of
 * the eight directions. Two readings over the same cells (a palindrome read
 * both ways) count once.
 */
export function countOccurrences(grid: string[][], letters: string): number {
  const size = grid.length;
  const seen = new Set<string>();
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (grid[row][col] !== letters[0]) continue;
      for (const [dRow, dCol] of ALL_DIRECTIONS) {
        const endRow = row + dRow * (letters.length - 1);
        const endCol = col + dCol * (letters.length - 1);
        if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) continue;
        let matches = true;
        for (let index = 1; index < letters.length; index += 1) {
          if (grid[row + dRow * index][col + dCol * index] !== letters[index]) {
            matches = false;
            break;
          }
        }
        if (!matches) continue;
        const a = `${row},${col}`;
        const b = `${endRow},${endCol}`;
        seen.add(a < b ? `${a}|${b}` : `${b}|${a}`);
      }
    }
  }
  return seen.size;
}

/** Every target word is in the grid, in its recorded place, exactly once. */
export function isValidPuzzle(puzzle: Puzzle, words: readonly string[]): boolean {
  if (puzzle.grid.length !== puzzle.size || puzzle.grid.some((row) => row.length !== puzzle.size)) return false;
  if (puzzle.grid.some((row) => row.some((letter) => !/^[A-Z]$/.test(letter)))) return false;
  if (puzzle.placements.length !== words.length) return false;
  for (const letters of words) {
    const placement = puzzle.placements.find((entry) => entry.letters === letters);
    if (!placement) return false;
    const spelled = placementCells(placement)
      .map((cell) => puzzle.grid[cell.row]?.[cell.col] ?? "")
      .join("");
    if (spelled !== letters) return false;
    if (countOccurrences(puzzle.grid, letters) !== 1) return false;
  }
  return true;
}

const MAX_ATTEMPTS = 40;
const TRIES_PER_WORD = 300;
const FILL_TRIES = 12;

function tryRandomLayout(words: readonly string[], size: number, random: () => number): Placement[] | null {
  const grid = emptyGrid(size);
  const placements: Placement[] = [];
  // Longest first: they have the fewest places to go.
  const ordered = words.slice().sort((a, b) => b.length - a.length || (a < b ? -1 : 1));
  for (const letters of ordered) {
    let placed: Placement | null = null;
    for (let attempt = 0; attempt < TRIES_PER_WORD && !placed; attempt += 1) {
      const [dRow, dCol] = PLACE_DIRECTIONS[Math.floor(random() * PLACE_DIRECTIONS.length)];
      const row = Math.floor(random() * size);
      const col = Math.floor(random() * size);
      if (fits(grid, letters, row, col, dRow, dCol)) placed = { letters, row, col, dRow, dCol };
    }
    if (!placed) return null;
    write(grid, placed);
    placements.push(placed);
  }
  return placements;
}

/** One word per row, left to right. It always fits; it is just less fun. */
function rowLayout(words: readonly string[], size: number, random: () => number): Placement[] {
  return words.map((letters, row) => ({
    letters,
    row,
    col: Math.floor(random() * (size - letters.length + 1)),
    dRow: 0,
    dCol: 1,
  }));
}

function finish(
  placements: Placement[],
  words: readonly string[],
  size: number,
  random: () => number,
  attempt: number,
  fallback: boolean,
): Puzzle | null {
  const base = emptyGrid(size);
  for (const placement of placements) write(base, placement);
  // The filler letters can spell a short word by accident. Re-roll them
  // rather than throw the whole layout away.
  for (let roll = 0; roll < FILL_TRIES; roll += 1) {
    const puzzle: Puzzle = { size, grid: fill(base, random), placements, attempt, fallback };
    if (isValidPuzzle(puzzle, words)) return puzzle;
  }
  return null;
}

/**
 * Build the puzzle for one book and one seed.
 *
 * `words` are already normalised letters (see normalizeLetters). The same
 * arguments always return the same grid. Nothing is returned unvalidated: a
 * layout that fails its check is discarded and the next attempt is tried, and
 * if forty attempts fail the one-word-per-row layout is used instead.
 */
export function generatePuzzle(bookKey: string, words: readonly string[], seed: number, size: number = GRID_SIZE): Puzzle {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const random = seededRandom(hashString(`${bookKey}|${seed}|${attempt}`));
    const placements = tryRandomLayout(words, size, random);
    if (!placements) continue;
    const puzzle = finish(placements, words, size, random, attempt, false);
    if (puzzle) return puzzle;
  }

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const random = seededRandom(hashString(`${bookKey}|${seed}|rows|${attempt}`));
    const puzzle = finish(rowLayout(words, size, random), words, size, random, attempt, true);
    if (puzzle) return puzzle;
  }

  // Unreachable for any list the verify script accepts (at most `size` words,
  // none longer than `size`, none hidden inside another). Returned without
  // the uniqueness guarantee rather than leave someone with no puzzle.
  const random = seededRandom(hashString(`${bookKey}|${seed}|last`));
  const placements = rowLayout(words, size, random);
  const base = emptyGrid(size);
  for (const placement of placements) write(base, placement);
  return { size, grid: fill(base, random), placements, attempt: MAX_ATTEMPTS, fallback: true };
}

// ───────────────────────── selecting on the grid ─────────────────────────

/**
 * Where a drag from `start` towards `raw` should end.
 *
 * A finger is never exactly on a row, column or diagonal, so the end snaps to
 * the nearest of the eight straight lines out of `start`, and stops at the
 * edge of the grid. This is what makes small cells forgiving on a phone.
 */
export function snapEnd(start: Cell, raw: Cell, size: number): Cell {
  const dRow = raw.row - start.row;
  const dCol = raw.col - start.col;
  if (dRow === 0 && dCol === 0) return start;
  const angle = Math.atan2(dRow, dCol);
  const step = Math.round(angle / (Math.PI / 4));
  const stepRow = Math.round(Math.sin(step * (Math.PI / 4)));
  const stepCol = Math.round(Math.cos(step * (Math.PI / 4)));
  let length = Math.max(Math.abs(dRow), Math.abs(dCol));
  while (length > 0) {
    const row = start.row + stepRow * length;
    const col = start.col + stepCol * length;
    if (row >= 0 && row < size && col >= 0 && col < size) return { row, col };
    length -= 1;
  }
  return start;
}

/** The cells from `start` to `end` when they lie on one straight line, else null. */
export function cellsBetween(start: Cell, end: Cell): Cell[] | null {
  const dRow = end.row - start.row;
  const dCol = end.col - start.col;
  if (dRow !== 0 && dCol !== 0 && Math.abs(dRow) !== Math.abs(dCol)) return null;
  const length = Math.max(Math.abs(dRow), Math.abs(dCol));
  const stepRow = Math.sign(dRow);
  const stepCol = Math.sign(dCol);
  return Array.from({ length: length + 1 }, (_, index) => ({
    row: start.row + stepRow * index,
    col: start.col + stepCol * index,
  }));
}

/**
 * The word a selection covers, if any. It does not matter which end the
 * person started from: first letter to last and last to first are the same
 * word.
 */
export function matchSelection(puzzle: Puzzle, start: Cell, end: Cell): Placement | null {
  for (const placement of puzzle.placements) {
    const cells = placementCells(placement);
    const first = cells[0];
    const last = cells[cells.length - 1];
    const forward = first.row === start.row && first.col === start.col && last.row === end.row && last.col === end.col;
    const backward = first.row === end.row && first.col === end.col && last.row === start.row && last.col === start.col;
    if (forward || backward) return placement;
  }
  return null;
}
