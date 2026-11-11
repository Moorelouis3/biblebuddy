/**
 * npm run verify:audio-mix — the Bible reader's music bed sits under the voice.
 *
 * Offline. It cannot hear anything, so it checks the two things that actually
 * went wrong on 2026-11-11 and would go wrong again:
 *
 *  1. every bed track declares its own level, because the five files are
 *     mastered up to 11 dB apart and one flat number made the same chapter
 *     sound different depending on which file the player picked;
 *  2. the levels still put the bed roughly 24 dB under the narration, using
 *     the measured loudness of the real files.
 *
 * The measurements come from decoding the shipped mp3s in a browser
 * (full-file RMS for the beds, speech-only RMS for the narration). If a track
 * is replaced, re-measure and update both this file and the lib.
 */
import {
  BIBLE_READING_BACKGROUND_TRACKS,
  BIBLE_READING_BACKGROUND_VOLUME,
  bibleReadingBackgroundVolumeFor as volFor,
} from "../lib/bibleReadingBackgroundMusic";

/** Measured RMS, dBFS, 2026-11-11. */
const MEASURED_DB: Record<string, number> = {
  "/audio/background/bible-reading-1.mp3": -16.2,
  "/audio/background/bible-reading-2.mp3": -12.5,
  "/audio/background/bible-reading-3.mp3": -19.2,
  "/audio/background/bible-reading-4.mp3": -23.9,
  "/audio/background/bible-reading-5.mp3": -13.8,
};
/** Genesis 1 from /api/tts/bible-chapter, speaking parts only. */
const NARRATION_DB = -22.8;
/** How far under the voice the bed belongs. */
const TARGET_BELOW = 24;
const TOLERANCE = 1.5;

let bad = 0;
const ok = (name: string, pass: boolean, detail = "") => {
  if (pass) console.log(`  ok    ${name}`);
  else { bad++; console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`); }
};

console.log("\nEvery bed track has its own measured level\n");
for (const src of BIBLE_READING_BACKGROUND_TRACKS) {
  ok(`${src} is measured`, typeof MEASURED_DB[src] === "number");
  const v = volFor(src, BIBLE_READING_BACKGROUND_VOLUME);
  ok(`${src} declares a level of its own`, v !== BIBLE_READING_BACKGROUND_VOLUME, `got the fallback ${v}`);
}

console.log("\nThe bed lands ~24 dB under the narration\n");
const belows: number[] = [];
for (const src of BIBLE_READING_BACKGROUND_TRACKS) {
  const below = NARRATION_DB - (MEASURED_DB[src] + 20 * Math.log10(volFor(src, BIBLE_READING_BACKGROUND_VOLUME)));
  belows.push(below);
  ok(
    `${src.replace("/audio/background/", "")} is ${below.toFixed(1)} dB under the voice`,
    Math.abs(below - TARGET_BELOW) <= TOLERANCE,
    `wanted ${TARGET_BELOW} ± ${TOLERANCE}`,
  );
}
const spread = Math.max(...belows) - Math.min(...belows);
ok(`all five tracks within 1 dB of each other (spread ${spread.toFixed(1)} dB)`, spread <= 1);

console.log("\nNothing else was touched\n");
ok("an unknown track keeps whatever the caller asked for", volFor("/audio/other/whatever.mp3", 0.42) === 0.42);
ok("a null src keeps the caller's volume", volFor(null, 0.33) === 0.33);
ok("the fallback is quiet, so an unmeasured file errs soft", BIBLE_READING_BACKGROUND_VOLUME <= 0.05);
ok("absolute URLs still match", volFor("https://www.mybiblebuddy.net/audio/background/bible-reading-2.mp3", 0.1) === volFor("/audio/background/bible-reading-2.mp3", 0.1));
ok("cache-busted URLs still match", volFor("/audio/background/bible-reading-2.mp3?v=3", 0.1) === volFor("/audio/background/bible-reading-2.mp3", 0.1));

console.log(`\n${bad === 0 ? "All checks passed." : `${bad} check(s) FAILED.`}\n`);
process.exit(bad === 0 ? 0 : 1);
