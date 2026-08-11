import { BIBLE_YEAR_GENESIS_WEB_VERSES } from "../lib/bibleYearGenesisVerses";
import {
  GENESIS_DAY_ONE_CREATION_LESSON,
  GENESIS_DAY_THREE_NOAH_ARK_LESSON,
  GENESIS_DAY_TWO_FALL_LESSON,
  type BibleYearDailyLesson,
} from "../lib/bibleYearDailyLessons";
import { buildDayOneSegments } from "../lib/bibleYearDayOneSegments";

/** Published estimate for gpt-4o-mini-tts. Verify against the billing dashboard. */
const USD_PER_AUDIO_MINUTE = 0.015;
/**
 * Measured on the real Day 1 render: 13,135 characters produced 17.3 minutes.
 * That is slow for speech because roughly 1.4 minutes of it is authored silence
 * between segments, and the narrator is directed to an unhurried pace.
 */
const CHARS_PER_AUDIO_MINUTE = 759;

function lessonCharacters(lesson: BibleYearDailyLesson) {
  let scripture = 0;
  let teaching = 0;

  for (const section of lesson.sections) {
    const block = section.verseBlock;
    const verses = BIBLE_YEAR_GENESIS_WEB_VERSES[block.chapter] || [];
    for (const verse of verses) {
      if (verse.verse >= block.startVerse && verse.verse <= block.endVerse) {
        scripture += verse.text.length;
      }
    }
    teaching += section.teaching.join(" ").length;
  }

  const framing = lesson.opening.join(" ").length + lesson.closing.join(" ").length;
  return { scripture, teaching, framing, total: scripture + teaching + framing };
}

function report(label: string, chars: number, segments: number | null) {
  const minutes = chars / CHARS_PER_AUDIO_MINUTE;
  const cost = minutes * USD_PER_AUDIO_MINUTE;
  console.log(
    `${label.padEnd(28)} ${String(chars).padStart(7)} chars  ` +
    `${minutes.toFixed(1).padStart(5)} min  ~$${cost.toFixed(2)}` +
    (segments ? `  (${segments} segments)` : ""),
  );
}

const dayOneSegments = buildDayOneSegments(GENESIS_DAY_ONE_CREATION_LESSON);
const dayOneChars = dayOneSegments.reduce((n, s) => n + s.text.length, 0);

console.log("=== Day 1: measured from the actual render ===");
report("Day 1 (rendered)", dayOneChars, dayOneSegments.length);
console.log(`  implied rate: ${(dayOneChars / 17.3).toFixed(0)} chars per audio minute\n`);

console.log("=== Days 2 and 3: projected in Day 1 style ===");
for (const lesson of [GENESIS_DAY_TWO_FALL_LESSON, GENESIS_DAY_THREE_NOAH_ARK_LESSON]) {
  const c = lessonCharacters(lesson);
  // Day 1's hand-written teaching runs about 1.35x the stock lesson teaching,
  // and the cold open/close are richer than lesson.opening/closing.
  const projected = Math.round(c.scripture + c.teaching * 1.35 + Math.max(c.framing, 3000));
  console.log(`\nDay ${lesson.dayNumber} - ${lesson.title} (${lesson.reference})`);
  console.log(`  scripture ${c.scripture}, teaching ${c.teaching}, framing ${c.framing}`);
  report(`  Day ${lesson.dayNumber} (projected)`, projected, null);
}

console.log("\n=== Full year, extrapolating from Day 1 ===");
const perDay = (dayOneChars / CHARS_PER_AUDIO_MINUTE) * USD_PER_AUDIO_MINUTE;
for (const [label, days] of [["Days 2-70 redo", 69], ["Days 71-365 new", 295], ["All 364", 364]] as const) {
  console.log(`${label.padEnd(20)} ${String(days).padStart(3)} days  ~$${(perDay * days).toFixed(2)}`);
}
console.log("\nRe-mixing music is free - the voice track is cached to disk.");
