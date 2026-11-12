/**
 * Where a chapter's static data lives on the CDN.
 *
 * - KJV text: public/kjv/<book-slug>/<chapter>.json, written once by
 *   scripts/fetch-kjv-static.ts from bible-api.com (same source the reader
 *   fetched live, so the text is identical and saved highlights keep their
 *   offsets).
 * - Study notes: public/study-notes/<book-slug>/<chapter>.json, regenerated
 *   on every build by scripts/generate-study-notes-static.ts.
 *
 * Both are plain files, so they arrive as fast as any image and need no
 * server function. The reader falls back to the live sources if a file is
 * missing.
 */

// Type only. Importing this module for its value pulls every note file in the
// Bible, about 33 MB, into the client bundle.
import type { BibleReaderStudySection } from "./bibleReaderStudyNotes";

export function chapterSlug(book: string | null | undefined) {
  return String(book || "").trim().toLowerCase().replace(/\s+/g, "-");
}

export function kjvStaticUrl(book: string, chapter: number) {
  return `/kjv/${chapterSlug(book)}/${Number(chapter)}.json`;
}

export function studyNotesStaticUrl(book: string, chapter: number) {
  return `/study-notes/${chapterSlug(book)}/${Number(chapter)}.json`;
}

/**
 * A fetch that cannot hang.
 *
 * Two things this guards against, both seen in production:
 *
 * - Inside the iOS app, CapacitorHttp replaces window.fetch and a RELATIVE url
 *   can simply never settle: no response, no rejection, no timeout. So every
 *   url is made absolute before it is fetched.
 * - Any request can stall on a phone. Without a deadline the reader waits
 *   forever and the screen never learns it failed. So every fetch has one.
 */
function absoluteUrl(url: string) {
  if (typeof window === "undefined" || !url.startsWith("/")) return url;
  return `${window.location.origin}${url}`;
}

function deadline(ms: number): AbortSignal | undefined {
  if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") return AbortSignal.timeout(ms);
  if (typeof AbortController === "undefined") return undefined;
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

const STATIC_TIMEOUT_MS = 8000;
const API_TIMEOUT_MS = 20000;
const MAX_REMEMBERED = 16;

/**
 * Chapter files already asked for in this visit, by url.
 *
 * Holding the promise rather than the result means a second caller that asks
 * while the first request is still in the air shares it instead of starting
 * another. That is what lets the neighbouring chapters be fetched ahead of
 * time: when the reader gets there, the answer is already here.
 */
const remembered = new Map<string, Promise<unknown | null>>();

export async function fetchStaticJson<T>(url: string): Promise<T | null> {
  const key = absoluteUrl(url);
  const existing = remembered.get(key);
  if (existing) return existing as Promise<T | null>;

  const request = (async () => {
    try {
      const response = await fetch(key, { signal: deadline(STATIC_TIMEOUT_MS) });
      if (!response.ok) return null;
      return (await response.json()) as T;
    } catch {
      return null;
    }
  })();

  remembered.set(key, request);
  if (remembered.size > MAX_REMEMBERED) {
    const oldest = remembered.keys().next().value;
    if (oldest !== undefined && oldest !== key) remembered.delete(oldest);
  }

  const result = await request;
  // A miss or a failure is not remembered, so the next ask tries again.
  if (result === null) remembered.delete(key);
  return result;
}

/**
 * One chapter's study notes: the static file on the CDN first, the server
 * function only if that file is missing.
 *
 * Returns null when both fail, which is different from an empty list. A
 * chapter with no notes is [], and the reader must be able to tell "there is
 * nothing more" from "it did not arrive" - one is a complete card, the other
 * is a card that has to say so and offer another try.
 *
 * The server function is the slow path on purpose-built evidence: measured on
 * 2026-11-12 it took 7.2s cold for Genesis 1 against 0.5s for the same bytes
 * as a static file, because the function has to load every note in the Bible
 * to answer for one chapter.
 */
export async function loadChapterStudySections(
  book: string,
  chapter: number,
): Promise<BibleReaderStudySection[] | null> {
  const cached = await fetchStaticJson<{ sections?: BibleReaderStudySection[] }>(studyNotesStaticUrl(book, chapter));
  if (Array.isArray(cached?.sections)) return cached.sections;

  try {
    const response = await fetch(
      absoluteUrl(`/api/study-notes?book=${encodeURIComponent(book)}&chapter=${Number(chapter)}`),
      { signal: deadline(API_TIMEOUT_MS) },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as { sections?: BibleReaderStudySection[] };
    return Array.isArray(data.sections) ? data.sections : null;
  } catch {
    return null;
  }
}

/**
 * Fetch a chapter's text and notes before anybody asks for them.
 *
 * Both are small static files (a few kB of text, some tens of kB of notes)
 * with long cache headers, so this costs little and makes Next and Previous
 * open with everything already in hand. Failures are silent: this is a head
 * start, not something the page depends on.
 */
export function prefetchChapterData(book: string, chapter: number) {
  if (!book || !Number.isFinite(chapter) || chapter < 1) return;
  void fetchStaticJson(kjvStaticUrl(book, chapter));
  void fetchStaticJson(studyNotesStaticUrl(book, chapter));
}
