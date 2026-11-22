import type { ClueCard } from "./types";

/** Lowercase, no accents, no punctuation, no leading "the", single spaces. */
export function normalizeGuess(text: string): string {
  return String(text || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’'`]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^the /, "");
}

function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const temp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = temp;
    }
  }
  return prev[b.length];
}

/**
 * Is this guess the card's answer? The answer and every accepted spelling
 * count, after normalising. A small typo is forgiven on longer names only
 * (one letter from 5 letters, two from 9), so "Abrahm" counts but "Eva" for
 * "Eve" has to be listed in `accepted` to count.
 */
export function isCorrectGuess(card: Pick<ClueCard, "answer" | "accepted">, guess: string): boolean {
  const g = normalizeGuess(guess);
  if (!g) return false;
  for (const option of [card.answer, ...card.accepted]) {
    const o = normalizeGuess(option);
    if (!o) continue;
    if (g === o) return true;
    const allowed = o.length >= 9 ? 2 : o.length >= 5 ? 1 : 0;
    if (allowed && Math.abs(g.length - o.length) <= allowed && editDistance(g, o) <= allowed) return true;
  }
  return false;
}
