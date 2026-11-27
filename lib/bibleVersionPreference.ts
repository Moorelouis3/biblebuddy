/**
 * The Bible version a reader picked, remembered on the phone.
 *
 * First used by Bible Memory (2026-11-27). Louis: "someone complained about
 * the KJV being everywhere... pick the translation when you are there, so if
 * you save a verse from verse of the day or from the bible you can read it in
 * the other translations when trying to memorize".
 *
 * One key for the whole app, so a screen that offers the same choice later
 * can honour it. The chapter reader and the Bible in One Year reader have
 * their own KJV / WEB / ASV switch and do NOT read this yet: each still opens
 * on the King James every time.
 *
 * Only versions the app may publish freely belong in this list. All three
 * are in the public domain. A licensed version (ESV, NIV) is added only once
 * its licence is signed.
 */

export type BibleVersion = "kjv" | "web" | "asv";

export const BIBLE_VERSIONS: Array<{ value: BibleVersion; label: string; name: string }> = [
  { value: "kjv", label: "KJV", name: "King James Version" },
  { value: "web", label: "WEB", name: "World English Bible" },
  { value: "asv", label: "ASV", name: "American Standard Version" },
];

const KEY = "bb:bible-version:v1";

function isBibleVersion(value: unknown): value is BibleVersion {
  return value === "kjv" || value === "web" || value === "asv";
}

/** The reader's saved version, or null when they have never picked one. */
export function readPreferredBibleVersion(): BibleVersion | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem(KEY);
    return isBibleVersion(saved) ? saved : null;
  } catch {
    return null;
  }
}

export function savePreferredBibleVersion(version: BibleVersion) {
  if (typeof window === "undefined" || !isBibleVersion(version)) return;
  try {
    window.localStorage.setItem(KEY, version);
  } catch {
    // Full or blocked storage: the version still holds for this visit.
  }
}
