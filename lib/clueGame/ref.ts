import type { ClueRef } from "./types";

/** "Genesis 6:13–18", "2 Peter 2:5", "Jude 1:14" → a ClueRef. Throws on anything else. */
export function ref(label: string): ClueRef {
  const m = label.match(/^(.+?)\s+(\d+):(\d+)(?:\s*[–-]\s*(\d+))?$/);
  if (!m) throw new Error(`Bad clue reference: ${label}`);
  const verseStart = Number(m[3]);
  return { label, book: m[1], chapter: Number(m[2]), verseStart, verseEnd: m[4] ? Number(m[4]) : verseStart };
}

/**
 * The opaque file key for a card's art. The silhouette is shown to every
 * player while they are still guessing, so its URL must not spell the answer
 * (".../joseph-mystery.webp" would). FNV-1a, so the browser and the server
 * agree without a lookup table. scripts/clue-game-art.mjs names files the same way.
 */
export function artKey(id: string): string {
  let h = 0x811c9dc5;
  for (const ch of `bbclue:${id}`) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36).padStart(7, "0");
}

/** Art paths for a roster id whose files exist in public/games/clue/genesis/art/. */
export const genesisArt = (id: string) => ({
  mystery: `/games/clue/genesis/art/${artKey(id)}-m.webp`,
  reveal: `/games/clue/genesis/art/${artKey(id)}-r.webp`,
});
