/**
 * Seed shape for Verse of the Day breakdowns. The seed script fetches the
 * KJV text for each reference from the Bible database at seed time, so
 * Scripture is never hand copied here. Section bodies follow the Bible
 * Buddy note voice: short lines, a blank line between every line, no
 * contractions, no hyphens, honest hedges where scholarship is divided.
 */
export type VerseBreakdownSeed = {
  /** Display reference, e.g. "Proverbs 3:5-6" (shown with an en dash in UI). */
  reference: string;
  /** Lowercase book key matching the bible_chapters table, e.g. "1 peter". */
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
  /** Exact KJV phrase in title case, per the note style spec. */
  title: string;
  /** WHO WROTE THIS? */
  author: string;
  /** WHERE ARE WE IN THE STORY? */
  context: string;
  /** WHAT DOES IT ACTUALLY MEAN? */
  meaning: string;
  /** WHY THIS MATTERS TODAY */
  application: string;
  /** TAKE THIS WITH YOU - one or two lines, no emoji (UI adds the sparkle). */
  takeaway: string;
  /** THINK ABOUT IT - one question, no emoji (UI adds it). */
  reflection: string;
  /** Optional short prayer, two to four lines. */
  prayer?: string;
};
