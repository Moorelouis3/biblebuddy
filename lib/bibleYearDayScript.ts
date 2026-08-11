import { narrator, segment, type BibleYearAudioSegment, type BibleYearSceneTone } from "./bibleYearAudioCast";
import { createOpenQuote, verseToSegments } from "./bibleYearAutoCast";
import { fetchChapterVerses } from "./bibleYearScripture";

/**
 * Generic builder for every day after Day 1. The per-day writing lives in a
 * BibleYearDayScript; the shape - cold open, then reference / verses / teaching
 * per block, then close - is fixed by docs/bible-year-day-1-audio-standard.md.
 *
 * `scene` is carried for compatibility but no longer changes the sound: the v2
 * pipeline mixes a real music bed rather than the old per-scene synthesis.
 */

export type BibleYearScriptBlock = {
  reference: string;
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
  teaching: string[];
};

export type BibleYearDayScript = {
  dayNumber: number;
  title: string;
  /** Paired with pauseAfterMs, so the writer controls the rhythm of the open. */
  opening: Array<[string, number]>;
  blocks: BibleYearScriptBlock[];
  closing: Array<[string, number]>;
};

const SCENE: BibleYearSceneTone = "relationship";

function spokenReference(book: string, chapter: number, startVerse: number, endVerse: number) {
  const name = book.charAt(0).toUpperCase() + book.slice(1);
  if (startVerse === endVerse) return `${name} ${chapter} verse ${startVerse}.`;
  return `${name} ${chapter} verses ${startVerse} through ${endVerse}.`;
}

export async function buildDaySegments(script: BibleYearDayScript): Promise<BibleYearAudioSegment[]> {
  const segments: BibleYearAudioSegment[] = script.opening.map(([text, pause]) =>
    narrator(SCENE, text, pause),
  );

  for (const block of script.blocks) {
    segments.push(
      narrator(SCENE, spokenReference(block.book, block.chapter, block.startVerse, block.endVerse), 700),
    );

    const verses = await fetchChapterVerses(block.book, block.chapter);
    const open = createOpenQuote();
    for (const verse of verses) {
      if (verse.verse < block.startVerse || verse.verse > block.endVerse) continue;
      segments.push(...verseToSegments(verse.text, SCENE, open));
    }

    for (const line of block.teaching) segments.push(narrator(SCENE, line, 560));
  }

  for (const [text, pause] of script.closing) segments.push(narrator(SCENE, text, pause));

  return segments;
}

export function scriptCharacterCount(script: BibleYearDayScript) {
  return (
    script.opening.reduce((n, [t]) => n + t.length, 0) +
    script.closing.reduce((n, [t]) => n + t.length, 0) +
    script.blocks.reduce((n, b) => n + b.teaching.join(" ").length, 0)
  );
}

export { segment };
