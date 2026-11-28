/**
 * The Bible version a reader picked: one setting for the whole app.
 *
 * History. Each reader used to have its own KJV / WEB / ASV switch that
 * forgot the choice on every chapter. Bible Memory got a remembered choice on
 * 2026-11-27, and the same day Louis asked: "can we make it site wide for the
 * translation instead of every place?" This file is that setting.
 *
 * Who obeys it: the chapter reader (both kinds: ChapterInsightReader and
 * FullChapterReader), Bible in One Year's Follow Along reader, Bible Memory,
 * and the picker in Settings. Changing it in any of them changes it in all.
 *
 * Who does NOT, and why: everything written around the King James. Study
 * notes and phrase cards, Verse of the Day, the study guides, Trivia, Word
 * Search and the recorded Bible in One Year narration all quote or match KJV
 * wording, so they stay KJV whatever is picked here.
 *
 * Where it is kept: on the phone (localStorage) so it is instant, and on the
 * account (auth user metadata, `bible_version`) so it follows the reader to
 * another device. No database column: a preference this small does not need
 * a migration. The account's value wins when a page loads.
 *
 * Only versions the app may publish freely belong in the list. All four are
 * public domain. A licensed version (ESV, NIV) is added only once its licence
 * is signed.
 */

import { supabase } from "./supabaseClient";

export type BibleVersion = "kjv" | "web" | "asv" | "lut";

export const BIBLE_VERSIONS: Array<{ value: BibleVersion; label: string; name: string }> = [
  { value: "kjv", label: "KJV", name: "King James Version" },
  { value: "web", label: "WEB", name: "World English Bible" },
  { value: "asv", label: "ASV", name: "American Standard Version" },
  // The first Bible in another language (2026-11-28). Luther 1912 is public
  // domain; the text is public/luther1912, laid out on the King James verse
  // numbers so notes, bookmarks and progress line up. See
  // scripts/import-luther-1912.mjs.
  { value: "lut", label: "LUT", name: "Luther 1912 (Deutsch)" },
];

/**
 * Versions the app holds as its own files (public/<folder>/<book>/<n>.json).
 * The others are asked for from the verse service.
 */
export const STATIC_BIBLE_FOLDER: Partial<Record<BibleVersion, string>> = { kjv: "kjv", lut: "luther1912" };

const KEY = "bb:bible-version:v1";
const CHANGE_EVENT = "bb:bible-version-changed";
const ACCOUNT_FIELD = "bible_version";

function isBibleVersion(value: unknown): value is BibleVersion {
  return value === "kjv" || value === "web" || value === "asv" || value === "lut";
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

function writeLocal(version: BibleVersion) {
  try {
    window.localStorage.setItem(KEY, version);
  } catch {
    // Full or blocked storage: the version still holds for this visit.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

/** Hear about a change made on any screen. Returns unsubscribe. */
export function onBibleVersionChange(listener: () => void) {
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
}

/**
 * The reader picked a version. Kept on the phone at once, told to every
 * screen that is listening, and written to the account in the background.
 * A failed account write is not an error worth showing: the phone has it.
 */
export function savePreferredBibleVersion(version: BibleVersion) {
  if (typeof window === "undefined" || !isBibleVersion(version)) return;
  const changed = readPreferredBibleVersion() !== version;
  writeLocal(version);
  if (!changed) return;
  void supabase.auth
    .getSession()
    .then(({ data }) => {
      if (!data.session?.user) return;
      if (data.session.user.user_metadata?.[ACCOUNT_FIELD] === version) return;
      return supabase.auth.updateUser({ data: { [ACCOUNT_FIELD]: version } });
    })
    .catch(() => {
      // Offline or signed out. The next change will try again.
    });
}

let pulled: Promise<void> | null = null;

/**
 * Once per page load: adopt the version saved on the account, so a choice
 * made on the phone shows up on the laptop. Does nothing when the account has
 * none, or when it already matches.
 */
export function pullBibleVersionFromAccount(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (!pulled) {
    pulled = supabase.auth
      .getSession()
      .then(({ data }) => {
        const saved = data.session?.user?.user_metadata?.[ACCOUNT_FIELD];
        if (isBibleVersion(saved) && saved !== readPreferredBibleVersion()) writeLocal(saved);
      })
      .catch(() => {
        // No session to read: the phone's own choice stands.
      });
  }
  return pulled;
}
