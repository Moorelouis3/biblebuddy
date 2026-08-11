export const BIBLE_YEAR_TTS_MODEL = "gpt-4o-mini-tts";
export const BIBLE_YEAR_SAMPLE_RATE = 24000;
export const BIBLE_YEAR_MP3_KBPS = 96;
export const BIBLE_YEAR_MAX_TTS_CHUNK_LENGTH = 3400;

export type BibleYearAudioRole = "narrator" | "god" | "adam" | "eve" | "serpent";

export type BibleYearSceneTone =
  | "void" | "light" | "water" | "life" | "humanity"
  | "rest" | "dust" | "eden" | "relationship";

export type BibleYearAudioSegment = {
  role: BibleYearAudioRole;
  scene: BibleYearSceneTone;
  text: string;
  pauseAfterMs?: number;
};

export type BibleYearCastEntry = {
  voice: string;
  instructions: string;
  /** ffmpeg filter chain applied after TTS, before assembly. */
  filter?: string;
};

const NARRATOR_INSTRUCTIONS =
  "Speak in a warm, cinematic, personal, emotionally grounded masculine voice. Sound like a trusted guide walking one listener through Scripture, not like a sermon, lecture, podcast, or generic audiobook. Use intimate pacing, soft dramatic pauses, and reflective emotional weight. Let Scripture readings feel reverent and spacious. Announce each Scripture range naturally, for example: Genesis 1 verses 1 through 5. Do not announce every individual verse number. Do not read markdown, headings, emojis, bullets, sound effect cues, or formatting labels. Speak directly to one person with calm hope, wonder, and presence. Do not sound robotic, theatrical, rushed, salesy, or overly polished.";

const GOD_INSTRUCTIONS =
  "Speak as the voice of Almighty God. Enormous, deep, booming, resonant male voice that fills the whole room, like distant thunder rolling over mountains. Chest-deep and powerful. Absolutely certain and commanding - this voice creates worlds by speaking. Slow, immense, and unhurried, with real weight behind every single word. Do not sound gentle, soft, breathy, young, timid, or conversational. Do not whisper. Project.";

/**
 * God rides on the same base voice as the narrator, so the separation has to
 * come from processing. Pitch drops ~4.3 semitones by resampling, then atempo
 * pulls the duration back to roughly 1.08x so it reads as deliberate rather
 * than slow motion. Bass shelf adds chest, the compressor keeps it dense and
 * constant (that is most of the "boom"), and the three-tap echo is the hall.
 */
const GOD_PITCH = 0.78;
const GOD_FILTER = [
  `asetrate=${Math.round(BIBLE_YEAR_SAMPLE_RATE * GOD_PITCH)}`,
  `aresample=${BIBLE_YEAR_SAMPLE_RATE}`,
  `atempo=${((1 / GOD_PITCH) / 1.08).toFixed(4)}`,
  "bass=g=9:f=95:w=0.7",
  "acompressor=threshold=0.16:ratio=3:attack=12:release=260:makeup=1.7",
  "aecho=0.86:0.72:70|150|260:0.32|0.18|0.09",
  "alimiter=limit=0.95",
].join(",");

export const BIBLE_YEAR_CAST: Record<BibleYearAudioRole, BibleYearCastEntry> = {
  narrator: {
    voice: "onyx",
    instructions: NARRATOR_INSTRUCTIONS,
  },
  god: {
    voice: "onyx",
    instructions: GOD_INSTRUCTIONS,
    filter: GOD_FILTER,
  },
  adam: {
    voice: "verse",
    instructions:
      "Speak as Adam, the first man, seeing another human being for the very first time. Warm, human, awake, amazed, a little overwhelmed. Sincere and grounded wonder, not theatrical delivery. Let genuine joy break through.",
  },
  eve: {
    voice: "coral",
    instructions:
      "Speak as Eve in the garden: young, open, unguarded, thoughtful. She is answering honestly and carefully, not suspicious yet. Natural and warm, gentle pace, no drama.",
  },
  serpent: {
    voice: "ballad",
    instructions:
      "Speak as the serpent in Eden: an adult male voice, smooth, quiet, unhurried and disarmingly reasonable. The menace is in how calm and friendly he sounds, never in hissing or growling. Sound like a trusted older friend planting a doubt. Understated, intimate, almost kind. Do not sound like a cartoon villain, a monster, or a woman.",
  },
};

export function segment(
  role: BibleYearAudioRole,
  scene: BibleYearSceneTone,
  text: string,
  pauseAfterMs = role === "god" ? 620 : 380,
): BibleYearAudioSegment {
  return { role, scene, text, pauseAfterMs };
}

export const narrator = (scene: BibleYearSceneTone, text: string, pauseAfterMs?: number) =>
  segment("narrator", scene, text, pauseAfterMs);
export const god = (scene: BibleYearSceneTone, text: string, pauseAfterMs = 620) =>
  segment("god", scene, text, pauseAfterMs);
export const adam = (scene: BibleYearSceneTone, text: string, pauseAfterMs = 520) =>
  segment("adam", scene, text, pauseAfterMs);
export const eve = (scene: BibleYearSceneTone, text: string, pauseAfterMs = 520) =>
  segment("eve", scene, text, pauseAfterMs);
export const serpent = (scene: BibleYearSceneTone, text: string, pauseAfterMs = 560) =>
  segment("serpent", scene, text, pauseAfterMs);
