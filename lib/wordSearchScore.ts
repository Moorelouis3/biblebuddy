/**
 * Bible Word Search scoring (2026-11-24), the same shape as Bible Trivia's:
 * points for every word, more for finding it fast, a streak multiplier for
 * finds that come close together, and 1 to 3 stars at the end.
 *
 * Plain functions of their inputs, so scripts/verify-word-search.ts can check
 * them. None of this is XP: XP for Word Search is still one award per book
 * the first time it is finished (word_search_book_completed).
 */

export const WORD_POINTS = 100;
/** A word found within this many seconds of the last find earns the full speed bonus, falling to none at SPEED_WINDOW. */
export const SPEED_FULL = 8;
export const SPEED_WINDOW = 30;
export const SPEED_BONUS = 100;
/** Finds this close together keep a streak going. */
export const STREAK_WINDOW = 20;
export const HINTS_PER_GRID = 3;
export const HINT_COST = 50;

/** x1 normally, x1.5 from the third quick find in a row, x2 from the fifth (as in Bible Trivia). */
export function streakMultiplier(streak: number): number {
  return streak >= 5 ? 2 : streak >= 3 ? 1.5 : 1;
}

export function speedBonus(secondsSinceLast: number): number {
  if (secondsSinceLast <= SPEED_FULL) return SPEED_BONUS;
  if (secondsSinceLast >= SPEED_WINDOW) return 0;
  return Math.round(SPEED_BONUS * (1 - (secondsSinceLast - SPEED_FULL) / (SPEED_WINDOW - SPEED_FULL)));
}

export type FindScore = { points: number; streak: number; multiplier: number };

/** The points for one find, given how long since the last one and the streak before it. */
export function scoreFind(secondsSinceLast: number, streakBefore: number): FindScore {
  const streak = secondsSinceLast <= STREAK_WINDOW ? streakBefore + 1 : 1;
  const multiplier = streakMultiplier(streak);
  return { points: Math.round((WORD_POINTS + speedBonus(secondsSinceLast)) * multiplier), streak, multiplier };
}

/**
 * Stars for a finished grid, by the average time per word found in this
 * sitting. Hints cost a star from three: a grid solved with help is still
 * solved, so it never drops below one.
 */
export function starsFor(seconds: number, wordsFound: number, hintsUsed: number): number {
  if (wordsFound <= 0) return 1;
  const perWord = seconds / wordsFound;
  let stars = perWord <= 20 ? 3 : perWord <= 40 ? 2 : 1;
  if (hintsUsed >= 2) stars -= 1;
  return Math.max(1, Math.min(3, stars));
}

export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export type WordSearchBest = { score: number; stars: number; seconds: number };

/** The best result is kept on this device only, as a personal record. */
export function readBest(slug: string): WordSearchBest | null {
  try {
    const raw = window.localStorage.getItem(`bb:ws-best:${slug}`);
    if (!raw) return null;
    const value = JSON.parse(raw) as WordSearchBest;
    return typeof value?.score === "number" ? value : null;
  } catch {
    return null;
  }
}

/** Saves and returns true when this result beats the record. */
export function saveBest(slug: string, result: WordSearchBest): boolean {
  const old = readBest(slug);
  const better = !old || result.score > old.score;
  const merged: WordSearchBest = old
    ? { score: Math.max(old.score, result.score), stars: Math.max(old.stars, result.stars), seconds: Math.min(old.seconds, result.seconds) }
    : result;
  try {
    window.localStorage.setItem(`bb:ws-best:${slug}`, JSON.stringify(merged));
  } catch {
    // A private window: the record just is not kept.
  }
  return better;
}
