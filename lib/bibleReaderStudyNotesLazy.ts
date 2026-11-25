/**
 * A chapter's study notes, without shipping the whole Bible's notes to get them.
 *
 * lib/bibleReaderStudyNotes is the aggregator for every chapter: 482 note
 * files, which the bundler turns into one chunk of about 33 MB. The Bible
 * reader stopped importing it long ago and fetches one chapter at a time
 * (lib/chapterStaticData.ts). The Plans screen never did: it imported the
 * aggregator, and so did the Bible in One Year content it leans on, which
 * put that chunk in front of every plan day and every study day
 * (docs/SPEED_REPORT_2026-11-25.md, cause 4).
 *
 * This is the same question with the same name and the same answer shape,
 * so the callers did not have to change how they ask:
 *
 * - On the server (pages being rendered, API routes, scripts) it reads the
 *   aggregator exactly as before.
 * - In the browser it answers from what has already arrived, and for a
 *   chapter it has not seen yet it returns [] and fetches that one
 *   chapter's small static file. When the file lands, anything using
 *   useStudySectionsVersion() (lib/useStudySectionsVersion.ts) draws again and gets the real notes.
 *
 * So in the browser [] can mean "not here yet". A caller that must tell
 * that apart from "this chapter has no notes" should use
 * loadChapterStudySections directly, which is async and says so.
 *
 * The `typeof window` check has to stay written inline around the require:
 * that is what lets the bundler drop the aggregator from the browser build.
 * Moving it into a helper puts the 33 MB straight back.
 */
// Type only. Importing this module for its value is the thing being avoided.
import type { BibleReaderStudySection } from "./bibleReaderStudyNotes";
import { loadChapterStudySections } from "./chapterStaticData";

const NOT_HERE_YET: BibleReaderStudySection[] = [];
const RETRY_AFTER_MS = 15_000;

const arrived = new Map<string, BibleReaderStudySection[]>();
const inFlight = new Set<string>();
const failedAt = new Map<string, number>();
const listeners = new Set<() => void>();
let version = 0;

function keyOf(book: string, chapter: number) {
  return `${book.trim().toLowerCase().replace(/\s+/g, " ")}:${chapter}`;
}

function announce() {
  version += 1;
  listeners.forEach((listener) => listener());
}

function fetchChapter(book: string, chapter: number, key: string) {
  if (inFlight.has(key)) return;
  const lastFailure = failedAt.get(key);
  if (lastFailure && Date.now() - lastFailure < RETRY_AFTER_MS) return;

  inFlight.add(key);
  void loadChapterStudySections(book, chapter)
    .then((sections) => {
      inFlight.delete(key);
      if (sections === null) {
        // Did not arrive. Not remembered as empty, so a later ask tries again.
        failedAt.set(key, Date.now());
        return;
      }
      failedAt.delete(key);
      arrived.set(key, sections);
      announce();
    })
    .catch(() => {
      inFlight.delete(key);
      failedAt.set(key, Date.now());
    });
}

/**
 * The study sections for one chapter.
 *
 * Server: the real answer, synchronously. Browser: what has arrived, or []
 * while that chapter's file is on its way (see the note at the top).
 */
export function getBibleReaderStudySections(
  book: string | null | undefined,
  chapter: number | null | undefined,
): BibleReaderStudySection[] {
  if (typeof window === "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const aggregator = require("./bibleReaderStudyNotes") as typeof import("./bibleReaderStudyNotes");
    return aggregator.getBibleReaderStudySections(book, chapter);
  }

  const chapterNumber = Number(chapter);
  if (!book || !Number.isFinite(chapterNumber) || chapterNumber < 1) return NOT_HERE_YET;

  const key = keyOf(book, chapterNumber);
  const known = arrived.get(key);
  if (known) return known;

  fetchChapter(book, chapterNumber, key);
  return NOT_HERE_YET;
}

/**
 * The same, but never starts a download.
 *
 * For code that runs the moment a file is imported (the hand-written day
 * notes build their lists that way). Asking there would fetch chapters on
 * every load of the Plans screen for readers who are nowhere near them.
 */
export function peekBibleReaderStudySections(
  book: string | null | undefined,
  chapter: number | null | undefined,
): BibleReaderStudySection[] {
  if (typeof window === "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const aggregator = require("./bibleReaderStudyNotes") as typeof import("./bibleReaderStudyNotes");
    return aggregator.getBibleReaderStudySections(book, chapter);
  }

  const chapterNumber = Number(chapter);
  if (!book || !Number.isFinite(chapterNumber)) return NOT_HERE_YET;
  return arrived.get(keyOf(book, chapterNumber)) || NOT_HERE_YET;
}

/** For lib/useStudySectionsVersion.ts, which is where the React hook lives. */
export function subscribeToStudySections(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getStudySectionsVersion() {
  return version;
}
