export const BIBLE_READING_BACKGROUND_TRACKS = [
  "/audio/background/bible-reading-1.mp3",
  "/audio/background/bible-reading-2.mp3",
  "/audio/background/bible-reading-3.mp3",
  "/audio/background/bible-reading-4.mp3",
  "/audio/background/bible-reading-5.mp3",
];

/**
 * How loud the bed sits under the narrator, and why it is per track.
 * ---------------------------------------------------------------------------
 * Louis, 2026-11-11: the music "is far too loud and competes with the voice".
 *
 * It was one flat 0.1 for all five tracks, and that was the bug. The five
 * files are mastered at wildly different levels, so the same 0.1 produced a
 * different mix depending on which one the player happened to pick - and
 * GlobalAudioPlayer rotates through them, so the SAME chapter sounded
 * different on a second play. Measured (RMS of the whole file, in the
 * browser, 2026-11-11):
 *
 *   track 1  -16.2 dB      track 4  -23.9 dB
 *   track 2  -12.5 dB      track 5  -13.8 dB
 *   track 3  -19.2 dB
 *
 * An 11.4 dB spread. The Genesis 1 narration from /api/tts/bible-chapter
 * measures -22.8 dB over its speaking parts (50 ms frames, silences between
 * verses excluded - including them flatters the voice and is how you end up
 * mixing music too loud). So at the old flat 0.1 the bed landed between
 * 9.7 dB and 21.1 dB under the voice. Anything under about 15 dB of
 * separation stops being atmosphere and starts competing, which is exactly
 * what track 2 was doing.
 *
 * Each track now carries its own gain, chosen so all five land at the same
 * -46.8 dB: 24 dB below the narration. That is at the quiet end of the usual
 * 15-25 dB for a music bed under speech, which is what "barely noticeable"
 * asks for. The narrator is untouched - it plays at full volume as before.
 *
 * If a track is ever replaced, measure the new file and put its gain here.
 * Do not reach for one number again; these files are not mastered alike.
 */
const BACKGROUND_TRACK_VOLUMES: Record<string, number> = {
  "/audio/background/bible-reading-1.mp3": 0.0295,
  "/audio/background/bible-reading-2.mp3": 0.0193,
  "/audio/background/bible-reading-3.mp3": 0.0417,
  "/audio/background/bible-reading-4.mp3": 0.0716,
  "/audio/background/bible-reading-5.mp3": 0.0224,
};

/**
 * The fallback for a track with no measurement, and the value the call sites
 * still pass as `backgroundMusicVolume`. Set to roughly what a mid-loudness
 * track needs, so an unmeasured file errs quiet rather than loud.
 */
export const BIBLE_READING_BACKGROUND_VOLUME = 0.03;

/**
 * The volume to actually play `src` at. Players call this once they know
 * which track they picked, because only then is the right level knowable.
 * Anything not in the table falls back to what the caller asked for.
 */
export function bibleReadingBackgroundVolumeFor(src: string | null | undefined, fallback?: number) {
  const key = String(src || "").split("?")[0];
  const match = BACKGROUND_TRACK_VOLUMES[key] ?? BACKGROUND_TRACK_VOLUMES[key.replace(/^.*(\/audio\/)/, "$1")];
  if (typeof match === "number") return match;
  return typeof fallback === "number" ? fallback : BIBLE_READING_BACKGROUND_VOLUME;
}

function normalizeBook(book: string | null | undefined) {
  return String(book || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

export function getBibleReadingBackgroundTracks(book: string | null | undefined, chapter: number | string | null | undefined) {
  if (normalizeBook(book) === "genesis" && Number(chapter) === 1) {
    return BIBLE_READING_BACKGROUND_TRACKS;
  }
  return undefined;
}
