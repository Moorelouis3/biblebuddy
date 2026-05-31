import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createContext, runInContext } from "vm";
import { createClient } from "@supabase/supabase-js";
import { BIBLE_YEAR_AUDIO_BUCKET, BIBLE_YEAR_DAY_EIGHT_AUDIO, BIBLE_YEAR_DAY_EIGHTEEN_AUDIO, BIBLE_YEAR_DAY_ELEVEN_AUDIO, BIBLE_YEAR_DAY_FIFTEEN_AUDIO, BIBLE_YEAR_DAY_FIVE_AUDIO, BIBLE_YEAR_DAY_FOUR_AUDIO, BIBLE_YEAR_DAY_FOURTEEN_AUDIO, BIBLE_YEAR_DAY_NINE_AUDIO, BIBLE_YEAR_DAY_NINETEEN_AUDIO, BIBLE_YEAR_DAY_ONE_AUDIO, BIBLE_YEAR_DAY_SEVEN_AUDIO, BIBLE_YEAR_DAY_SEVENTEEN_AUDIO, BIBLE_YEAR_DAY_SIX_AUDIO, BIBLE_YEAR_DAY_SIXTEEN_AUDIO, BIBLE_YEAR_DAY_TEN_AUDIO, BIBLE_YEAR_DAY_THIRTEEN_AUDIO, BIBLE_YEAR_DAY_THREE_AUDIO, BIBLE_YEAR_DAY_TWELVE_AUDIO, BIBLE_YEAR_DAY_TWENTY_AUDIO, BIBLE_YEAR_DAY_TWENTY_ONE_AUDIO, BIBLE_YEAR_DAY_TWENTY_THREE_AUDIO, BIBLE_YEAR_DAY_TWENTY_TWO_AUDIO, BIBLE_YEAR_DAY_TWO_AUDIO } from "../lib/bibleYearAudio";
import { BIBLE_YEAR_GENESIS_WEB_VERSES } from "../lib/bibleYearGenesisVerses";
import { GENESIS_DAY_EIGHT_JUDGMENT_OF_SODOM_LESSON, GENESIS_DAY_FIVE_ABRAHAM_OBEDIENCE_LESSON, GENESIS_DAY_FOUR_NOAH_FLOOD_LESSON, GENESIS_DAY_NINE_ABRAHAMS_TEST_AND_LEGACY_LESSON, GENESIS_DAY_ONE_CREATION_LESSON, GENESIS_DAY_SEVEN_COVENANT_PROMISE_LESSON, GENESIS_DAY_SIX_RESCUE_OF_LOT_LESSON, GENESIS_DAY_THREE_NOAH_ARK_LESSON, GENESIS_DAY_TWO_FALL_LESSON, type BibleYearDailyLesson } from "../lib/bibleYearDailyLessons";
import { GENESIS_ONE_TTS_VOICE } from "../lib/genesisOneTtsAudio";
import { cleanTextForTts } from "../lib/ttsSpeechText";
import { GENESIS_DAY_ELEVEN_JACOBS_JOURNEY_BEGINS_LESSON, GENESIS_DAY_FOURTEEN_JACOB_RETURNS_TO_BETHEL_LESSON, GENESIS_DAY_TEN_COVENANT_THROUGH_ISAAC_LESSON, GENESIS_DAY_THIRTEEN_JACOB_WRESTLES_WITH_GOD_LESSON, GENESIS_DAY_TWELVE_JACOB_LEAVES_LABAN_LESSON } from "../lib/bibleYearDaysTenToFourteen";
import { GENESIS_DAY_FIFTEEN_JOSEPHS_TESTING_BEGINS_LESSON } from "../lib/bibleYearDaysFifteenToTwentyOne";
import { GENESIS_DAY_SIXTEEN_FAITHFUL_IN_THE_HIDDEN_PLACE_LESSON } from "../lib/bibleYearDaySixteenDeepNotes";
import { GENESIS_DAY_SEVENTEEN_JOSEPH_RISES_AND_REMEMBERS_LESSON } from "../lib/bibleYearDaySeventeenDeepNotes";
import { GENESIS_DAY_EIGHTEEN_JUDAH_STANDS_IN_THE_GAP_LESSON } from "../lib/bibleYearDayEighteenDeepNotes";
import { GENESIS_DAY_NINETEEN_JOSEPH_REVEALS_HIMSELF_LESSON } from "../lib/bibleYearDayNineteenDeepNotes";
import { GENESIS_DAY_TWENTY_JACOB_BLESSES_JOSEPHS_SONS_LESSON } from "../lib/bibleYearDayTwentyDeepNotes";
import { GENESIS_DAY_TWENTY_ONE_GENESIS_ENDS_WITH_HOPE_LESSON } from "../lib/bibleYearDayTwentyOneDeepNotes";
import { EXODUS_DAY_TWENTY_TWO_GOD_HEARS_ISRAELS_CRY_LESSON } from "../lib/bibleYearDayTwentyTwoDeepNotes";
import { EXODUS_DAY_TWENTY_THREE_PHARAOH_RESISTS_GODS_WORD_LESSON } from "../lib/bibleYearDayTwentyThreeDeepNotes";

const SAMPLE_RATE = 24000;
const MAX_TTS_CHUNK_LENGTH = 3400;
const MP3_KBPS = 96;
type BibleYearAudioRole = "narrator" | "god" | "adam";
type BibleYearSceneTone = "void" | "light" | "water" | "life" | "humanity" | "rest" | "dust" | "eden" | "relationship";
type BibleYearAudioSegment = {
  role: BibleYearAudioRole;
  scene: BibleYearSceneTone;
  text: string;
  pauseAfterMs?: number;
};
type BibleYearRenderedSegment = {
  role: BibleYearAudioRole;
  scene: BibleYearSceneTone;
  startSample: number;
  endSample: number;
};

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const requestedDay = Number(process.env.BIBLE_YEAR_TTS_DAY || process.argv.find((arg) => arg.startsWith("--day="))?.split("=")[1] || "1");
const voiceOnlyMode = process.argv.includes("--voice-only") || process.env.BIBLE_YEAR_TTS_VOICE_ONLY === "true";
const uploadVoiceOnlyMode = process.argv.includes("--upload-voice-only") || process.env.BIBLE_YEAR_TTS_UPLOAD_VOICE_ONLY === "true";
const selectedLesson =
  requestedDay === 23
    ? EXODUS_DAY_TWENTY_THREE_PHARAOH_RESISTS_GODS_WORD_LESSON
    : requestedDay === 22
    ? EXODUS_DAY_TWENTY_TWO_GOD_HEARS_ISRAELS_CRY_LESSON
    : requestedDay === 21
    ? GENESIS_DAY_TWENTY_ONE_GENESIS_ENDS_WITH_HOPE_LESSON
    : requestedDay === 20
    ? GENESIS_DAY_TWENTY_JACOB_BLESSES_JOSEPHS_SONS_LESSON
    : requestedDay === 19
    ? GENESIS_DAY_NINETEEN_JOSEPH_REVEALS_HIMSELF_LESSON
    : requestedDay === 18
    ? GENESIS_DAY_EIGHTEEN_JUDAH_STANDS_IN_THE_GAP_LESSON
    : requestedDay === 17
    ? GENESIS_DAY_SEVENTEEN_JOSEPH_RISES_AND_REMEMBERS_LESSON
    : requestedDay === 16
    ? GENESIS_DAY_SIXTEEN_FAITHFUL_IN_THE_HIDDEN_PLACE_LESSON
    : requestedDay === 15
    ? GENESIS_DAY_FIFTEEN_JOSEPHS_TESTING_BEGINS_LESSON
    : requestedDay === 14
    ? GENESIS_DAY_FOURTEEN_JACOB_RETURNS_TO_BETHEL_LESSON
    : requestedDay === 13
    ? GENESIS_DAY_THIRTEEN_JACOB_WRESTLES_WITH_GOD_LESSON
    : requestedDay === 12
    ? GENESIS_DAY_TWELVE_JACOB_LEAVES_LABAN_LESSON
    : requestedDay === 11
    ? GENESIS_DAY_ELEVEN_JACOBS_JOURNEY_BEGINS_LESSON
    : requestedDay === 10
    ? GENESIS_DAY_TEN_COVENANT_THROUGH_ISAAC_LESSON
    : requestedDay === 9
    ? GENESIS_DAY_NINE_ABRAHAMS_TEST_AND_LEGACY_LESSON
    : requestedDay === 8
    ? GENESIS_DAY_EIGHT_JUDGMENT_OF_SODOM_LESSON
    : requestedDay === 7
    ? GENESIS_DAY_SEVEN_COVENANT_PROMISE_LESSON
    : requestedDay === 6
    ? GENESIS_DAY_SIX_RESCUE_OF_LOT_LESSON
    : requestedDay === 5
    ? GENESIS_DAY_FIVE_ABRAHAM_OBEDIENCE_LESSON
    : requestedDay === 4
      ? GENESIS_DAY_FOUR_NOAH_FLOOD_LESSON
      : requestedDay === 3
        ? GENESIS_DAY_THREE_NOAH_ARK_LESSON
        : requestedDay === 2
          ? GENESIS_DAY_TWO_FALL_LESSON
          : GENESIS_DAY_ONE_CREATION_LESSON;
const selectedAudio =
  requestedDay === 23
    ? BIBLE_YEAR_DAY_TWENTY_THREE_AUDIO
    : requestedDay === 22
    ? BIBLE_YEAR_DAY_TWENTY_TWO_AUDIO
    : requestedDay === 21
    ? BIBLE_YEAR_DAY_TWENTY_ONE_AUDIO
    : requestedDay === 20
    ? BIBLE_YEAR_DAY_TWENTY_AUDIO
    : requestedDay === 19
    ? BIBLE_YEAR_DAY_NINETEEN_AUDIO
    : requestedDay === 18
    ? BIBLE_YEAR_DAY_EIGHTEEN_AUDIO
    : requestedDay === 17
    ? BIBLE_YEAR_DAY_SEVENTEEN_AUDIO
    : requestedDay === 16
    ? BIBLE_YEAR_DAY_SIXTEEN_AUDIO
    : requestedDay === 15
    ? BIBLE_YEAR_DAY_FIFTEEN_AUDIO
    : requestedDay === 14
    ? BIBLE_YEAR_DAY_FOURTEEN_AUDIO
    : requestedDay === 13
    ? BIBLE_YEAR_DAY_THIRTEEN_AUDIO
    : requestedDay === 12
    ? BIBLE_YEAR_DAY_TWELVE_AUDIO
    : requestedDay === 11
    ? BIBLE_YEAR_DAY_ELEVEN_AUDIO
    : requestedDay === 10
    ? BIBLE_YEAR_DAY_TEN_AUDIO
    : requestedDay === 9
    ? BIBLE_YEAR_DAY_NINE_AUDIO
    : requestedDay === 8
    ? BIBLE_YEAR_DAY_EIGHT_AUDIO
    : requestedDay === 7
    ? BIBLE_YEAR_DAY_SEVEN_AUDIO
    : requestedDay === 6
    ? BIBLE_YEAR_DAY_SIX_AUDIO
    : requestedDay === 5
    ? BIBLE_YEAR_DAY_FIVE_AUDIO
    : requestedDay === 4
      ? BIBLE_YEAR_DAY_FOUR_AUDIO
      : requestedDay === 3
        ? BIBLE_YEAR_DAY_THREE_AUDIO
        : requestedDay === 2
          ? BIBLE_YEAR_DAY_TWO_AUDIO
          : BIBLE_YEAR_DAY_ONE_AUDIO;
const selectedDayLabel = `BIBLE_YEAR_DAY_${String(selectedLesson.dayNumber).padStart(3, "0")}`;
const outputDay = String(selectedLesson.dayNumber).padStart(3, "0");
const OUTPUT_PATH = join(process.cwd(), "tmp", "bible-in-one-year", `day-${outputDay}`, `day-${outputDay}-audio.mp3`);
const VOICE_ONLY_OUTPUT_PATH = join(process.cwd(), "tmp", "bible-in-one-year", `day-${outputDay}`, `day-${outputDay}-voices-only.mp3`);
const NARRATOR_ONLY_OUTPUT_PATH = join(process.cwd(), "tmp", "bible-in-one-year", `day-${outputDay}`, `day-${outputDay}-narrator-only.mp3`);
const DAY_EIGHT_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-8-exact-web-narrator-script.md");
const DAY_NINE_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-9-exact-web-narrator-script.md");
const DAY_TEN_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-10-exact-web-narrator-script.md");
const DAY_ELEVEN_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-11-exact-web-narrator-script.md");
const DAY_TWELVE_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-12-exact-web-narrator-script.md");
const DAY_THIRTEEN_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-13-exact-web-narrator-script.md");
const DAY_FOURTEEN_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-14-narrator-script.md");
const DAY_FIFTEEN_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-15-narrator-script.md");
const DAY_SIXTEEN_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-16-narrator-script.md");
const DAY_SEVENTEEN_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-17-narrator-script.md");
const DAY_EIGHTEEN_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-18-narrator-script.md");
const DAY_NINETEEN_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-19-narrator-script.md");
const DAY_TWENTY_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-20-narrator-script.md");
const DAY_TWENTY_ONE_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-21-narrator-script.md");
const DAY_TWENTY_TWO_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-22-narrator-script.md");
const DAY_TWENTY_THREE_APPROVED_SCRIPT_PATH = join(process.cwd(), "docs", "bible-in-one-year-day-23-narrator-script.md");
const AMBIENCE_GAIN = selectedLesson.dayNumber === 2 ? 0.129 : selectedLesson.dayNumber === 1 ? 0.112 : 0.088;

function ensureDir(path: string) {
  mkdirSync(dirname(path), { recursive: true });
}

function clamp(value: number) {
  return Math.max(-1, Math.min(1, value));
}

function pcmBufferToFloat32(buffer: Buffer) {
  const samples = new Float32Array(Math.floor(buffer.length / 2));
  for (let i = 0; i < samples.length; i += 1) {
    samples[i] = buffer.readInt16LE(i * 2) / 32768;
  }
  return samples;
}

function concatSamples(chunks: Float32Array[]) {
  const totalLength = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const output = new Float32Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }
  return output;
}

function silenceSamples(durationMs: number) {
  return new Float32Array(Math.max(0, Math.round((durationMs / 1000) * SAMPLE_RATE)));
}

function chunkSpeechInput(text: string) {
  if (text.length <= MAX_TTS_CHUNK_LENGTH) return [text];

  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    const next = `${current} ${trimmed}`.trim();
    if (next.length > MAX_TTS_CHUNK_LENGTH && current) {
      chunks.push(current);
      current = trimmed;
    } else {
      current = next;
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

function seededNoise(seedStart = 1137) {
  let seed = seedStart;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967295;
  };
}

function chordFrequency(root: number, semitone: number) {
  return root * 2 ** (semitone / 12);
}

function synthesizePeacefulBed(sampleCount: number, ambienceGain = 0.088, scene: BibleYearSceneTone = "eden") {
  const bed = new Float32Array(sampleCount);
  const random = seededNoise();
  const progression = [
    { root: 98, notes: [0, 3, 7, 10] },
    { root: 82.41, notes: [0, 3, 7, 10] },
    { root: 116.54, notes: [0, 3, 7, 10] },
    { root: 87.31, notes: [0, 3, 7, 10] },
  ];
  const barSeconds = 8;
  let rainState = 0;
  let dropEnergy = 0;

  for (let i = 0; i < sampleCount; i += 1) {
    const t = i / SAMPLE_RATE;
    const chord = progression[Math.floor(t / barSeconds) % progression.length];
    const chordT = t % barSeconds;
    const attack = Math.min(1, chordT / 2.4);
    const release = Math.min(1, (barSeconds - chordT) / 2.2);
    const padEnvelope = Math.max(0, Math.min(attack, release));

    let pad = 0;
    for (const semitone of chord.notes) {
      const freq = chordFrequency(chord.root, semitone);
      pad += Math.sin(2 * Math.PI * freq * t) * 0.18;
      pad += Math.sin(2 * Math.PI * freq * 2 * t) * 0.035;
    }

    const slowPulse = 0.84 + Math.sin(2 * Math.PI * 0.055 * t) * 0.16;
    const music = pad * padEnvelope * slowPulse;

    const noise = random() * 2 - 1;
    rainState = rainState * 0.965 + noise * 0.035;
    if (random() > 0.99935) dropEnergy += 0.42 + random() * 0.3;
    dropEnergy *= 0.982;
    const drop = Math.sin(2 * Math.PI * (1300 + random() * 600) * t) * dropEnergy;
    let texture = rainState * 0.22 + drop * 0.045;

    if (scene === "void") {
      texture += Math.sin(2 * Math.PI * 34 * t) * 0.42;
      texture += Math.sin(2 * Math.PI * 51 * t) * 0.18;
    } else if (scene === "light") {
      const swell = Math.min(1, t / 3.4) * Math.min(1, (sampleCount / SAMPLE_RATE - t) / 3);
      texture += Math.sin(2 * Math.PI * (520 + Math.sin(t * 0.7) * 18) * t) * 0.055 * swell;
      texture += Math.sin(2 * Math.PI * (1040 + Math.sin(t * 0.4) * 28) * t) * 0.028 * swell;
    } else if (scene === "water") {
      texture += rainState * 0.42 + Math.sin(2 * Math.PI * 0.17 * t) * 0.05;
    } else if (scene === "life" || scene === "eden" || scene === "relationship") {
      if (random() > 0.9991) texture += Math.sin(2 * Math.PI * (2100 + random() * 1400) * t) * 0.18;
      if (random() > 0.99955) texture += Math.sin(2 * Math.PI * (760 + random() * 420) * t) * 0.12;
    } else if (scene === "dust") {
      texture += (random() * 2 - 1) * 0.055 * Math.max(0, 1 - t / 7);
      texture += Math.sin(2 * Math.PI * 74 * t) * 0.05;
    } else if (scene === "rest") {
      texture *= 0.38;
    }

    bed[i] = music * ambienceGain + texture * ambienceGain;
  }

  return bed;
}

function mixVoiceWithBed(voice: Float32Array) {
  const tailSamples = SAMPLE_RATE * 2;
  const outputLength = voice.length + tailSamples;
  const bed = synthesizePeacefulBed(outputLength, AMBIENCE_GAIN);
  const output = new Float32Array(outputLength);
  let peak = 0;

  for (let i = 0; i < outputLength; i += 1) {
    const fadeIn = Math.min(1, i / (SAMPLE_RATE * 1.5));
    const fadeOut = Math.min(1, (outputLength - i) / (SAMPLE_RATE * 2));
    const ambience = bed[i] * fadeIn * fadeOut;
    const voiceSample = i < voice.length ? voice[i] * 0.96 : 0;
    const mixed = voiceSample + ambience;
    output[i] = mixed;
    peak = Math.max(peak, Math.abs(mixed));
  }

  if (peak > 0.98) {
    const gain = 0.98 / peak;
    for (let i = 0; i < output.length; i += 1) output[i] *= gain;
  }

  return output;
}

function mixVoiceWithSceneBed(voice: Float32Array, scene: BibleYearSceneTone, role: BibleYearAudioRole, pauseAfterMs = 450) {
  const pauseSamples = Math.max(0, Math.round((pauseAfterMs / 1000) * SAMPLE_RATE));
  const outputLength = voice.length + pauseSamples;
  const roleBedGain = role === "god" ? AMBIENCE_GAIN * 0.7 : AMBIENCE_GAIN;
  const bed = synthesizePeacefulBed(outputLength, roleBedGain, scene);
  const output = new Float32Array(outputLength);
  let peak = 0;

  for (let i = 0; i < outputLength; i += 1) {
    const fadeIn = Math.min(1, i / (SAMPLE_RATE * 0.35));
    const fadeOut = Math.min(1, (outputLength - i) / (SAMPLE_RATE * 0.5));
    const ambience = bed[i] * fadeIn * fadeOut;
    const voiceGain = role === "god" ? 1.03 : role === "adam" ? 0.98 : 0.96;
    const voiceSample = i < voice.length ? voice[i] * voiceGain : 0;
    const mixed = voiceSample + ambience;
    output[i] = mixed;
    peak = Math.max(peak, Math.abs(mixed));
  }

  if (peak > 0.98) {
    const gain = 0.98 / peak;
    for (let i = 0; i < output.length; i += 1) output[i] *= gain;
  }

  return output;
}

function pitchDown(samples: Float32Array, factor = 0.76) {
  const output = new Float32Array(Math.ceil(samples.length / factor));
  for (let i = 0; i < output.length; i += 1) {
    const sourceIndex = i * factor;
    const left = Math.floor(sourceIndex);
    const right = Math.min(samples.length - 1, left + 1);
    const mix = sourceIndex - left;
    output[i] = (samples[left] || 0) * (1 - mix) + (samples[right] || 0) * mix;
  }
  return output;
}

function addDelayBody(samples: Float32Array, delays: Array<{ ms: number; gain: number }>) {
  const maxDelay = Math.max(...delays.map((item) => item.ms));
  const output = new Float32Array(samples.length + Math.round((maxDelay / 1000) * SAMPLE_RATE));
  output.set(samples, 0);

  for (const delay of delays) {
    const offset = Math.round((delay.ms / 1000) * SAMPLE_RATE);
    for (let i = 0; i < samples.length; i += 1) {
      output[i + offset] += samples[i] * delay.gain;
    }
  }

  let peak = 0;
  for (let i = 0; i < output.length; i += 1) peak = Math.max(peak, Math.abs(output[i]));
  if (peak > 0.96) {
    const gain = 0.96 / peak;
    for (let i = 0; i < output.length; i += 1) output[i] *= gain;
  }
  return output;
}

function processVoiceForRole(samples: Float32Array, role: BibleYearAudioRole) {
  if (role !== "god") return samples;
  const lowered = pitchDown(samples, 0.72);
  return addDelayBody(lowered, [
    { ms: 34, gain: 0.2 },
    { ms: 78, gain: 0.14 },
    { ms: 126, gain: 0.08 },
  ]);
}

function sceneAtSample(timeline: BibleYearRenderedSegment[], sampleIndex: number) {
  for (const item of timeline) {
    if (sampleIndex >= item.startSample && sampleIndex <= item.endSample) return item.scene;
  }
  return timeline[timeline.length - 1]?.scene || "rest";
}

function addSineBurst(output: Float32Array, startSample: number, durationSeconds: number, frequency: number, gain: number) {
  const durationSamples = Math.round(durationSeconds * SAMPLE_RATE);
  for (let i = 0; i < durationSamples && startSample + i < output.length; i += 1) {
    const t = i / SAMPLE_RATE;
    const envelope = Math.sin(Math.PI * (i / Math.max(1, durationSamples - 1)));
    output[startSample + i] += Math.sin(2 * Math.PI * frequency * t) * gain * envelope;
  }
}

function addNoiseBurst(output: Float32Array, startSample: number, durationSeconds: number, gain: number, seed = 991) {
  const random = seededNoise(seed);
  const durationSamples = Math.round(durationSeconds * SAMPLE_RATE);
  let state = 0;
  for (let i = 0; i < durationSamples && startSample + i < output.length; i += 1) {
    const envelope = Math.sin(Math.PI * (i / Math.max(1, durationSamples - 1)));
    state = state * 0.92 + (random() * 2 - 1) * 0.08;
    output[startSample + i] += state * gain * envelope;
  }
}

function addBirdChirps(output: Float32Array, startSample: number, durationSeconds: number, gain: number, seed = 2244) {
  const random = seededNoise(seed);
  const chirps = Math.max(3, Math.floor(durationSeconds / 2.5));
  for (let c = 0; c < chirps; c += 1) {
    const chirpStart = startSample + Math.round((random() * durationSeconds) * SAMPLE_RATE);
    const chirpLength = Math.round((0.08 + random() * 0.12) * SAMPLE_RATE);
    const frequency = 1400 + random() * 1900;
    for (let i = 0; i < chirpLength && chirpStart + i < output.length; i += 1) {
      const t = i / SAMPLE_RATE;
      const envelope = Math.sin(Math.PI * (i / Math.max(1, chirpLength - 1)));
      output[chirpStart + i] += Math.sin(2 * Math.PI * (frequency + Math.sin(t * 80) * 260) * t) * gain * envelope;
    }
  }
}

function synthesizeContinuousProductionBed(sampleCount: number, timeline: BibleYearRenderedSegment[]) {
  const output = new Float32Array(sampleCount);
  const random = seededNoise(8821);
  const progression = [
    { root: 73.42, notes: [0, 7, 12, 15] },
    { root: 82.41, notes: [0, 5, 10, 14] },
    { root: 65.41, notes: [0, 7, 10, 15] },
    { root: 98, notes: [0, 3, 7, 12] },
  ];
  let windState = 0;
  let waterState = 0;
  let rainState = 0;
  let timelineIndex = 0;

  for (let i = 0; i < sampleCount; i += 1) {
    const t = i / SAMPLE_RATE;
    while (timelineIndex < timeline.length - 1 && i > timeline[timelineIndex].endSample) timelineIndex += 1;
    const scene = timeline[timelineIndex]?.scene || "rest";
    const chord = progression[Math.floor(t / 10) % progression.length];
    let pad = 0;
    for (const semitone of chord.notes) {
      const freq = chordFrequency(chord.root, semitone);
      pad += Math.sin(2 * Math.PI * freq * t) * 0.11;
      pad += Math.sin(2 * Math.PI * freq * 2 * t) * 0.018;
    }

    const noise = random() * 2 - 1;
    windState = windState * 0.985 + noise * 0.015;
    waterState = waterState * 0.94 + noise * 0.06;
    rainState = rainState * 0.968 + noise * 0.032;

    let texture = windState * 0.06 + rainState * 0.045;
    let musicGain = 0.078;

    if (scene === "void") {
      texture += Math.sin(2 * Math.PI * 32 * t) * 0.09 + Math.sin(2 * Math.PI * 49 * t) * 0.045;
      musicGain = 0.054;
    } else if (scene === "light") {
      texture += Math.sin(2 * Math.PI * 780 * t) * 0.012;
      musicGain = 0.088;
    } else if (scene === "water") {
      texture += waterState * 0.19 + Math.sin(2 * Math.PI * 0.11 * t) * 0.03;
    } else if (scene === "life") {
      texture += rainState * 0.06;
      musicGain = 0.084;
    } else if (scene === "humanity") {
      texture += Math.sin(2 * Math.PI * 58 * t) * 0.035;
      musicGain = 0.083;
    } else if (scene === "dust") {
      texture += (random() * 2 - 1) * 0.028 + Math.sin(2 * Math.PI * 72 * t) * 0.028;
      musicGain = 0.062;
    } else if (scene === "eden" || scene === "relationship") {
      texture += waterState * 0.08 + rainState * 0.035;
      musicGain = 0.075;
    } else if (scene === "rest") {
      texture *= 0.5;
      musicGain = 0.066;
    }

    const globalFadeIn = Math.min(1, i / (SAMPLE_RATE * 4));
    const globalFadeOut = Math.min(1, (sampleCount - i) / (SAMPLE_RATE * 5));
    output[i] = (pad * musicGain + texture) * globalFadeIn * globalFadeOut;
  }

  for (const item of timeline) {
    if (item.role === "god" && item.scene === "light") {
      addSineBurst(output, Math.max(0, item.startSample - SAMPLE_RATE), 4.2, 96, 0.09);
      addSineBurst(output, item.startSample, 3.4, 620, 0.025);
      addSineBurst(output, item.startSample, 3.4, 1240, 0.018);
    }
    if (item.role === "god" && item.scene === "water") addNoiseBurst(output, Math.max(0, item.startSample - SAMPLE_RATE / 2), 5.5, 0.11, item.startSample);
    if (item.role === "god" && item.scene === "life") addBirdChirps(output, item.startSample, 8, 0.035, item.startSample);
    if (item.scene === "life") addBirdChirps(output, item.startSample, Math.min(10, (item.endSample - item.startSample) / SAMPLE_RATE), 0.018, item.startSample + 17);
    if (item.scene === "dust" && item.role === "narrator") addNoiseBurst(output, item.startSample, 2.2, 0.055, item.startSample + 45);
    if (item.scene === "eden" || item.scene === "relationship") addBirdChirps(output, item.startSample, Math.min(7, (item.endSample - item.startSample) / SAMPLE_RATE), 0.012, item.startSample + 91);
  }

  return output;
}

function mixProductionEpisode(voiceTrack: Float32Array, timeline: BibleYearRenderedSegment[]) {
  const bed = synthesizeContinuousProductionBed(voiceTrack.length, timeline);
  const output = new Float32Array(voiceTrack.length);
  let peak = 0;

  for (let i = 0; i < voiceTrack.length; i += 1) {
    const voice = voiceTrack[i] * 0.98;
    const duck = Math.abs(voice) > 0.025 ? 0.58 : 1;
    const mixed = voice + bed[i] * duck;
    output[i] = mixed;
    peak = Math.max(peak, Math.abs(mixed));
  }

  if (peak > 0.98) {
    const gain = 0.98 / peak;
    for (let i = 0; i < output.length; i += 1) output[i] *= gain;
  }
  return output;
}

function normalizeVoiceOnlyEpisode(voiceTrack: Float32Array) {
  const output = new Float32Array(voiceTrack.length);
  let peak = 0;
  for (let i = 0; i < voiceTrack.length; i += 1) {
    output[i] = voiceTrack[i] * 0.98;
    peak = Math.max(peak, Math.abs(output[i]));
  }

  if (peak > 0.98) {
    const gain = 0.98 / peak;
    for (let i = 0; i < output.length; i += 1) output[i] *= gain;
  }
  return output;
}

function getMp3EncoderClass() {
  const bundlePath = join(process.cwd(), "node_modules", "lamejs", "lame.all.js");
  const context = {} as { lamejs?: { Mp3Encoder?: new (channels: number, sampleRate: number, kbps: number) => any } };
  createContext(context);
  runInContext(readFileSync(bundlePath, "utf8"), context);
  const Mp3Encoder = context.lamejs?.Mp3Encoder;
  if (!Mp3Encoder) throw new Error("Could not initialize lamejs MP3 encoder.");
  return Mp3Encoder;
}

function encodeMp3(samples: Float32Array) {
  const Mp3Encoder = getMp3EncoderClass();
  const encoder = new Mp3Encoder(1, SAMPLE_RATE, MP3_KBPS);
  const mp3Chunks: Buffer[] = [];
  const sampleBlockSize = 1152;

  for (let i = 0; i < samples.length; i += sampleBlockSize) {
    const block = samples.subarray(i, i + sampleBlockSize);
    const pcm = new Int16Array(block.length);
    for (let j = 0; j < block.length; j += 1) {
      pcm[j] = Math.round(clamp(block[j]) * 32767);
    }
    const encoded = encoder.encodeBuffer(pcm);
    if (encoded.length > 0) mp3Chunks.push(Buffer.from(encoded));
  }

  const flushed = encoder.flush();
  if (flushed.length > 0) mp3Chunks.push(Buffer.from(flushed));
  return Buffer.concat(mp3Chunks);
}

function getVerses(chapter: number, startVerse: number, endVerse: number) {
  return (BIBLE_YEAR_GENESIS_WEB_VERSES[chapter] || []).filter((verse) => verse.verse >= startVerse && verse.verse <= endVerse);
}

function speakReference(chapter: number, startVerse: number, endVerse: number) {
  if (startVerse === endVerse) return `Genesis ${chapter} verse ${startVerse}.`;
  return `Genesis ${chapter} verses ${startVerse} through ${endVerse}.`;
}

function sceneForReference(reference: string): BibleYearSceneTone {
  if (reference === "Genesis 1:1-5") return "light";
  if (reference === "Genesis 1:6-13") return "water";
  if (reference === "Genesis 1:14-25") return "life";
  if (reference === "Genesis 1:26-31") return "humanity";
  if (reference === "Genesis 2:1-3") return "rest";
  if (reference === "Genesis 2:4-9") return "dust";
  if (reference === "Genesis 2:10-17") return "eden";
  return "relationship";
}

function segment(role: BibleYearAudioRole, scene: BibleYearSceneTone, text: string, pauseAfterMs = role === "god" ? 850 : 480): BibleYearAudioSegment {
  return { role, scene, text, pauseAfterMs };
}

function narrator(scene: BibleYearSceneTone, text: string, pauseAfterMs?: number) {
  return segment("narrator", scene, text, pauseAfterMs);
}

function god(scene: BibleYearSceneTone, text: string, pauseAfterMs = 950) {
  return segment("god", scene, text, pauseAfterMs);
}

function adam(scene: BibleYearSceneTone, text: string, pauseAfterMs = 750) {
  return segment("adam", scene, text, pauseAfterMs);
}

function dayOneVerseSegments(chapter: number, verseNumber: number, scene: BibleYearSceneTone): BibleYearAudioSegment[] {
  const verse = BIBLE_YEAR_GENESIS_WEB_VERSES[chapter]?.find((item) => item.verse === verseNumber)?.text || "";

  if (chapter === 1) {
    switch (verseNumber) {
      case 3:
        return [narrator(scene, "God said."), god("light", "Let there be light."), narrator("light", "And there was light.")];
      case 6:
        return [narrator(scene, "God said."), god("water", "Let there be an expanse in the middle of the waters, and let it divide the waters from the waters.")];
      case 9:
        return [narrator(scene, "God said."), god("water", "Let the waters under the sky be gathered together to one place, and let the dry land appear."), narrator("water", "And it was so.")];
      case 11:
        return [narrator(scene, "God said."), god("life", "Let the earth yield grass, herbs yielding seeds, and fruit trees bearing fruit after their kind, with their seeds in it, on the earth."), narrator("life", "And it was so.")];
      case 14:
        return [narrator(scene, "God said."), god("light", "Let there be lights in the expanse of the sky to divide the day from the night; and let them be for signs to mark seasons, days, and years.")];
      case 15:
        return [god("light", "And let them be for lights in the expanse of the sky to give light on the earth."), narrator("light", "And it was so.")];
      case 20:
        return [narrator(scene, "God said."), god("life", "Let the waters abound with living creatures, and let birds fly above the earth in the open expanse of the sky.")];
      case 22:
        return [narrator(scene, "God blessed them, saying."), god("life", "Be fruitful, and multiply, and fill the waters in the seas, and let birds multiply on the earth.")];
      case 24:
        return [narrator(scene, "God said."), god("life", "Let the earth produce living creatures after their kind, livestock, creeping things, and animals of the earth after their kind."), narrator("life", "And it was so.")];
      case 26:
        return [narrator(scene, "God said."), god("humanity", "Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, over the birds of the sky, over the livestock, over all the earth, and over every creeping thing that creeps on the earth.")];
      case 28:
        return [narrator(scene, "God blessed them. God said to them."), god("humanity", "Be fruitful, multiply, fill the earth, and subdue it. Have dominion over the fish of the sea, over the birds of the sky, and over every living thing that moves on the earth.")];
      case 29:
        return [narrator(scene, "God said."), god("humanity", "Behold, I have given you every herb yielding seed, which is on the surface of all the earth, and every tree, which bears fruit yielding seed. It will be your food.")];
      case 30:
        return [god("humanity", "To every animal of the earth, and to every bird of the sky, and to everything that creeps on the earth, in which there is life, I have given every green herb for food."), narrator("humanity", "And it was so.")];
      default:
        return [narrator(scene, verse)];
    }
  }

  if (chapter === 2) {
    switch (verseNumber) {
      case 16:
        return [narrator(scene, "Yahweh God commanded the man, saying."), god("eden", "You may freely eat of every tree of the garden.")];
      case 17:
        return [god("eden", "But you shall not eat of the tree of the knowledge of good and evil; for in the day that you eat of it, you will surely die.")];
      case 18:
        return [narrator(scene, "Yahweh God said."), god("relationship", "It is not good for the man to be alone. I will make him a helper comparable to him.")];
      case 23:
        return [narrator(scene, "The man said."), adam("relationship", "This is now bone of my bones, and flesh of my flesh. She will be called woman, because she was taken out of Man.")];
      default:
        return [narrator(scene, verse)];
    }
  }

  return [narrator(scene, verse)];
}

function buildDayOneCinematicSpeechText(lesson: BibleYearDailyLesson) {
  const cinematicTeachingByReference: Record<string, string[]> = {
    "Genesis 1:1-5": [
      "Stay here for a second. Before anything exists, God is already there. He is not introduced like a character who walks onto the stage. He simply is.",
      "The earth is formless, empty, covered in darkness, and deep waters. But unfinished does not mean abandoned. God's Spirit is already hovering over the waters. Even before the world has shape, God's presence is near.",
      "And then creation begins with a voice. God does not panic in darkness. He does not fight it. He speaks into it.",
      "Light enters the story before the sun and moon are ever named. That matters. Genesis is showing you that light does not ultimately come from the created things. Light comes from God.",
      "Maybe you know what it feels like when life seems dark, unfinished, or hard to understand. Genesis starts here to remind you: darkness is not too much for God. Confusion is not stronger than His voice. When God speaks, reality begins to change.",
    ],
    "Genesis 1:6-13": [
      "Now the world begins to take shape. Waters are separated. Sky opens. Seas gather. Dry ground appears.",
      "This is not random motion. This is God making room for life. Before He fills the world, He prepares the world.",
      "Then the earth starts to grow. Grass, plants, fruit trees, seeds. Life that can keep producing more life.",
      "Most things God grows start smaller than we expect. A seed is easy to overlook, but inside it is future provision, future fruit, future generations.",
      "So already, creation is not only beautiful. It is generous. God is building a world that can hold life, feed life, and multiply life.",
    ],
    "Genesis 1:14-25": [
      "Now the sky fills with lights. Days can be counted. Seasons can be known. Years can be remembered.",
      "To the ancient world, the sun and moon were often treated like gods. Genesis quietly corrects that. They are not gods. They are lights in God's sky, serving the purpose He gives them.",
      "Then the waters move. The sky comes alive. Birds lift into the air. Sea creatures fill the deep. Animals begin moving across the land.",
      "The silence of the empty world is gone now. There is movement, sound, breath, rhythm, life.",
      "And God blesses living creatures. That is important. Life is not just allowed by God. Life is blessed by God.",
    ],
    "Genesis 1:26-31": [
      "This is the moment the story has been building toward. God says, let us make man in our image, after our likeness.",
      "Human beings are not accidents. You are not an accident. Before anyone measures your success, your beauty, your strength, your usefulness, or your past, Genesis says human worth starts with God.",
      "Male and female are both made in God's image. Both carry dignity. Both are blessed. Both are called into purpose.",
      "Dominion does not mean abuse. It means responsibility. Humanity is called to represent God's care inside God's creation.",
      "Then God looks at everything He made, and this time He does not only call it good. He calls it very good. Before sin breaks anything, the world is blessed, ordered, alive, and full of purpose.",
    ],
    "Genesis 2:1-3": [
      "The story does not end with God rushing to the next thing. It ends with rest.",
      "God rests, not because He is tired, but because the work is complete. Creation has rhythm. Work and rest. Forming and filling. Speaking and delighting.",
      "The first thing called holy in the Bible is not a building. It is not an object. It is a day. Time with God is holy from the beginning.",
      "If your life feels like nonstop striving, Genesis gently pushes back. You were not created to hold everything together. Rest is trust. Rest is worship. Rest is part of God's good design.",
    ],
    "Genesis 2:4-9": [
      "Now the camera moves closer. Genesis 1 gave us the wide view of creation. Genesis 2 brings us near enough to see dust, breath, garden, and relationship.",
      "God forms the man from the dust of the ground. That is humbling. We are not gods. We are creatures. We are connected to the earth.",
      "But then God breathes into him the breath of life. That is deeply personal. Humanity is dust touched by God. Fragile, but valuable. Humble, but alive with breath from the Creator.",
      "Then God plants a garden. Before there is a command, there is provision. Before there is a test, there is a home. Eden is beauty, safety, abundance, and peace.",
    ],
    "Genesis 2:10-17": [
      "The garden is full. Rivers flow. Precious materials are named. The world near God is supplied and alive.",
      "Then God gives the man work. That matters because work exists before sin. Meaningful responsibility is part of the good world.",
      "God also gives freedom before restriction. You may freely eat from every tree, except one.",
      "The story is not showing a stingy God. It is showing a generous God with a real boundary. The question is trust. Will humanity receive life from God, or try to define good and evil apart from Him?",
      "That question will carry us straight into the next day. But for now, feel the goodness of this moment. God gives life, place, food, work, freedom, and a clear word.",
    ],
    "Genesis 2:18-25": [
      "For the first time, God says something is not good. Not sin. Not rebellion. Aloneness.",
      "The man is surrounded by living creatures, but none of them correspond to him. None can meet him face to face as a true partner.",
      "So God causes a deep sleep to fall over the man, and He forms the woman. When the man sees her, the first human words recorded in Scripture are poetry.",
      "This is bone of my bones and flesh of my flesh. That is wonder. Recognition. Joy.",
      "And the chapter ends with a picture that almost feels hard to imagine now: naked and not ashamed. No hiding. No fear. No pretending. Fully known, fully safe, fully at peace.",
      "Before shame entered the story, there was peace.",
    ],
  };

  const parts: string[] = [
    "Hey. I am really glad you are here.",
    "Today is Day 1 of our journey through the Bible together.",
    "Before Abraham. Before Moses. Before David. Before Jesus. Before cities, war, pain, and shame. The story starts here.",
    "At the beginning.",
    "There was God.",
    "Today, we are stepping into the creation of the world. Not just to learn facts, but to walk through the opening scene of Scripture together.",
    "So take a breath. Let the noise settle for a moment. We are going back to the first page of the Bible.",
  ];

  for (const section of lesson.sections) {
    const block = section.verseBlock;
    const verses = getVerses(block.chapter, block.startVerse, block.endVerse);
    const scripture = verses.map((verse) => verse.text).join(" ");
    parts.push(speakReference(block.chapter, block.startVerse, block.endVerse));
    parts.push(scripture);
    parts.push(...(cinematicTeachingByReference[block.reference] || section.teaching));
  }

  parts.push(
    "So this is where the Bible begins.",
    "Not with human achievement. Not with human failure. Not with a problem we have to solve.",
    "It begins with God creating, speaking, ordering, filling, blessing, resting, forming, breathing, planting, providing, and making room for relationship.",
    "This matters because the rest of the Bible is going to show us what happens when that good world is broken, and how far God will go to restore what was lost.",
    "But before we talk about the fall, before shame, hiding, violence, exile, covenant, sacrifice, kings, prophets, and redemption, you need to see the design.",
    "You were made by God. You were made in God's image. You were made for life with Him.",
    "And if you carry nothing else from Day 1, carry this: God is not afraid of darkness, emptiness, or disorder. He knows how to speak light into places that feel impossible.",
    "Tomorrow, we step into Genesis 3 and 4. The peace of Eden will be tested. Trust will break. Shame will enter. But even there, God will not disappear.",
    "For now, rest in the beginning.",
    "The world was made good.",
    "And you were made on purpose.",
  );

  return cleanTextForTts(parts.join("\n\n"))
    .replace(/\bVerse\s+\d+\b\.?/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildDayOneProductionSegments(lesson: BibleYearDailyLesson) {
  const teachingByReference: Record<string, string[]> = {
    "Genesis 1:1-5": [
      "Stay here for a second. Before anything exists, God is already there. He is not introduced like a character who walks onto the stage. He simply is.",
      "The earth is formless, empty, covered in darkness, and deep waters. But unfinished does not mean abandoned. God's Spirit is already hovering over the waters. Even before the world has shape, God's presence is near.",
      "Creation begins quietly, with a voice. God does not panic in darkness. He does not fight it. He speaks into it.",
      "Light enters the story before the sun and moon are ever named. Genesis is showing you that light does not ultimately come from created things. Light comes from God.",
      "Maybe you know what it feels like when life seems dark, unfinished, or hard to understand. Genesis starts here to remind you: darkness is not too much for God. Confusion is not stronger than His voice.",
    ],
    "Genesis 1:6-13": [
      "Now the world begins to take shape. Waters are separated. Sky opens. Seas gather. Dry ground appears.",
      "This is not random motion. This is God making room for life. Before He fills the world, He prepares the world.",
      "Then the earth starts to grow. Grass, plants, fruit trees, seeds. Life that can keep producing more life.",
      "Most things God grows start smaller than we expect. A seed is easy to overlook, but inside it is future provision, future fruit, future generations.",
    ],
    "Genesis 1:14-25": [
      "Now the sky fills with lights. Days can be counted. Seasons can be known. Years can be remembered.",
      "To the ancient world, the sun and moon were often treated like gods. Genesis quietly corrects that. They are not gods. They are lights in God's sky, serving the purpose He gives them.",
      "Then the waters move. The sky comes alive. Birds lift into the air. Sea creatures fill the deep. Animals begin moving across the land.",
      "The silence of the empty world is gone now. There is movement, sound, breath, rhythm, and life.",
    ],
    "Genesis 1:26-31": [
      "This is the moment the story has been building toward. Human beings are not accidents. You are not an accident.",
      "Before anyone measures your success, your beauty, your strength, your usefulness, or your past, Genesis says human worth starts with God.",
      "Male and female are both made in God's image. Both carry dignity. Both are blessed. Both are called into purpose.",
      "Dominion does not mean abuse. It means responsibility. Humanity is called to represent God's care inside God's creation.",
      "Before sin breaks anything, the world is blessed, ordered, alive, and full of purpose.",
    ],
    "Genesis 2:1-3": [
      "The story does not end with God rushing to the next thing. It ends with rest.",
      "God rests, not because He is tired, but because the work is complete. Creation has rhythm. Work and rest. Forming and filling. Speaking and delighting.",
      "The first thing called holy in the Bible is not a building. It is not an object. It is a day. Time with God is holy from the beginning.",
      "If your life feels like nonstop striving, Genesis gently pushes back. You were not created to hold everything together. Rest is trust. Rest is worship.",
    ],
    "Genesis 2:4-9": [
      "Now the camera moves closer. Genesis 1 gave us the wide view of creation. Genesis 2 brings us near enough to see dust, breath, garden, and relationship.",
      "God forms the man from the dust of the ground. That is humbling. We are not gods. We are creatures. We are connected to the earth.",
      "But then God breathes into him the breath of life. Humanity is dust touched by God. Fragile, but valuable. Humble, but alive with breath from the Creator.",
      "Then God plants a garden. Before there is a command, there is provision. Before there is a test, there is a home. Eden is beauty, safety, abundance, and peace.",
    ],
    "Genesis 2:10-17": [
      "The garden is full. Rivers flow. Precious materials are named. The world near God is supplied and alive.",
      "Then God gives the man work. Work exists before sin. Meaningful responsibility is part of the good world.",
      "God also gives freedom before restriction. You may freely eat from every tree, except one.",
      "The story is not showing a stingy God. It is showing a generous God with a real boundary. The question is trust.",
      "Will humanity receive life from God, or try to define good and evil apart from Him?",
    ],
    "Genesis 2:18-25": [
      "For the first time, God says something is not good. Not sin. Not rebellion. Aloneness.",
      "The man is surrounded by living creatures, but none of them correspond to him. None can meet him face to face as a true partner.",
      "So God causes a deep sleep to fall over the man, and He forms the woman. When the man sees her, the first human words recorded in Scripture are poetry.",
      "This is wonder. Recognition. Joy.",
      "And the chapter ends with a picture that almost feels hard to imagine now: naked and not ashamed. No hiding. No fear. No pretending. Fully known, fully safe, fully at peace.",
      "Before shame entered the story, there was peace.",
    ],
  };

  const segments: BibleYearAudioSegment[] = [
    narrator("void", "Hey. I am really glad you are here.", 700),
    narrator("void", "Today is Day 1 of our journey through the Bible together.", 650),
    narrator("void", "Before Abraham. Before Moses. Before David. Before Jesus. Before cities, war, pain, and shame. The story starts here.", 800),
    narrator("void", "At the beginning.", 1000),
    narrator("void", "There was God.", 1150),
    narrator("light", "Today, we are stepping into the creation of the world. Not just to learn facts, but to walk through the opening scene of Scripture together.", 650),
    narrator("void", "So take a breath. Let the noise settle for a moment. We are going back to the first page of the Bible.", 900),
  ];

  for (const section of lesson.sections) {
    const block = section.verseBlock;
    const scene = sceneForReference(block.reference);
    segments.push(narrator(scene, speakReference(block.chapter, block.startVerse, block.endVerse), 700));

    for (let verse = block.startVerse; verse <= block.endVerse; verse += 1) {
      segments.push(...dayOneVerseSegments(block.chapter, verse, scene));
    }

    for (const line of teachingByReference[block.reference] || section.teaching) {
      segments.push(narrator(scene, line, 560));
    }
  }

  segments.push(
    narrator("rest", "So this is where the Bible begins.", 700),
    narrator("rest", "Not with human achievement. Not with human failure. Not with a problem we have to solve.", 700),
    narrator("rest", "It begins with God creating, speaking, ordering, filling, blessing, resting, forming, breathing, planting, providing, and making room for relationship.", 800),
    narrator("rest", "This matters because the rest of the Bible is going to show us what happens when that good world is broken, and how far God will go to restore what was lost.", 700),
    narrator("rest", "But before we talk about the fall, before shame, hiding, violence, exile, covenant, sacrifice, kings, prophets, and redemption, you need to see the design.", 800),
    narrator("rest", "You were made by God. You were made in God's image. You were made for life with Him.", 850),
    narrator("light", "And if you carry nothing else from Day 1, carry this: God is not afraid of darkness, emptiness, or disorder. He knows how to speak light into places that feel impossible.", 900),
    narrator("rest", "Tomorrow, we step into Genesis 3 and 4. The peace of Eden will be tested. Trust will break. Shame will enter. But even there, God will not disappear.", 850),
    narrator("rest", "For now, rest in the beginning.", 800),
    narrator("rest", "The world was made good.", 750),
    narrator("rest", "And you were made on purpose.", 1200),
  );

  return segments
    .map((item) => ({ ...item, text: cleanTextForTts(item.text).replace(/\bVerse\s+\d+\b\.?/gi, " ").replace(/\s+/g, " ").trim() }))
    .filter((item) => item.text.length > 0);
}

function buildDayOneSingleNarratorSegments(lesson: BibleYearDailyLesson) {
  return buildDayOneProductionSegments(lesson).map((item) => ({
    ...item,
    role: "narrator" as BibleYearAudioRole,
  }));
}

function buildBibleYearSpeechText(lesson: BibleYearDailyLesson) {
  if (lesson.dayNumber === 1) return buildDayOneCinematicSpeechText(lesson);
  const approvedScriptPath = getApprovedBibleYearScriptPath(lesson.dayNumber);
  if (approvedScriptPath && existsSync(approvedScriptPath)) return buildApprovedBibleYearSpeechText(approvedScriptPath);

  const teachingByReference: Record<string, string[]> = {
    "Genesis 1:1-5": [
      "The story starts with God already there. Not created. Not explained. Not fighting for control. Just God, Creator over everything.",
      "The heavens and the earth means the whole created order: everything above, everything below, everything visible, and everything humans will live inside. The first verse puts everything under God's authority.",
      "The earth is unshaped, unfilled, dark, and watery. But unfinished does not mean abandoned. Before the world looks complete, God's Spirit is already near.",
      "God says, Let there be light, and light comes. He does not fight the darkness. He speaks, and creation responds. Light appears before the sun and moon, so light comes from God, not from a sun god.",
      "God separates light from darkness and names Day and Night. Naming shows authority. Separation shows order. God is putting things where they belong.",
    ],
    "Genesis 1:6-13": [
      "To ancient readers, deep waters could feel like danger and chaos. Here, the waters do not rule themselves. God gives them boundaries.",
      "God gathers the seas and lets dry land appear. The world is becoming livable. Life needs a place, so God prepares a place.",
      "Plants, trees, fruit, and seeds fill the earth. The seed detail matters because God creates life that can keep producing life. Life can multiply. Food can be provided. The earth can sustain creatures. One generation can lead to another.",
    ],
    "Genesis 1:14-25": [
      "The sun and moon are not gods. They are lights in God's sky.",
      "The lights mark days, seasons, and years. God is making a world humans can live in, work in, rest in, and worship in. Seasons for planting and harvesting. Days and nights for work and rest. Years for memory and history. Appointed times for worship.",
      "God fills the waters, sky, and land with life. Creation is no longer empty. It is full, alive, layered, and blessed.",
    ],
    "Genesis 1:26-31": [
      "This is the high point of creation. Human beings are made in God's image. People are not accidents and not disposable.",
      "Male and female are both created in God's image. Human worth is not based on power, gender, money, beauty, success, or strength. Every person matters because every person is made by God.",
      "Dominion does not mean abuse. It means responsibility. Humans are called to care for God's world under God's authority. Every person has dignity. Every person has responsibility. Creation is entrusted to human care. Life is meant to reflect God's goodness.",
      "Before sin enters the story, creation is good, human life is good, and God's purpose for the world is good.",
    ],
    "Genesis 2:1-3": [
      "God does not leave creation half done. What He made has order, purpose, and goodness.",
      "God rests because the work is complete. Rest is built into creation before sin enters the world.",
      "God sets the seventh day apart. From the beginning, time with God can be holy. Time can be set apart. Rest belongs in human life. Worship grows from God's finished work. Creation has rhythm, not endless striving.",
    ],
    "Genesis 2:4-9": [
      "The lesson slows down and focuses on human life with God.",
      "God forms man from the dust. That is humbling. We are not gods. We are physical, dependent, and connected to God's world.",
      "But humanity is not only dust. God breathes life into the man. We are dust touched by God: humble, valuable, and dependent.",
      "God plants a garden and places the man there. He prepares a home before He gives a command. Eden is a picture of provision, beauty, purpose, and peace.",
    ],
    "Genesis 2:10-17": [
      "The garden is abundance. Water flows. Precious materials are named. Life near God is supplied.",
      "God gives the man work before sin enters the world. So work itself is not the curse. Meaningful responsibility is part of God's good design.",
      "God says the man may freely eat from every tree except one. God gives abundance, then sets one boundary.",
      "The tree introduces choice and trust. Will humanity trust God's word about life and death? Provision is generous. Boundaries are real. Obedience matters. Trust is part of life with God.",
    ],
    "Genesis 2:18-25": [
      "For the first time, God says something is not good. Sin has not entered yet. The problem is aloneness.",
      "The man names the animals, showing responsibility. But none of them can answer his loneliness. None is a suitable helper.",
      "Helper does not mean weak or lesser. The point is partnership, not inferiority. The man needs someone who corresponds to him.",
      "God makes woman from the man's side and brings her to him. The man's response is joy: bone of my bones and flesh of my flesh.",
      "Marriage is pictured as covenant closeness, loyalty, and shared life.",
      "The man and woman are naked and not ashamed. No hiding. No fear. No guilt. No pretending. Fully known. Fully welcomed. Joined in covenant love. Not yet covered by shame.",
    ],
  };

  const parts: string[] = [
    `Welcome to Day ${lesson.dayNumber} of the Bible In One Year journey: ${lesson.title}.`,
    ...lesson.opening,
  ];

  for (const section of lesson.sections) {
    const block = section.verseBlock;
    const verses = getVerses(block.chapter, block.startVerse, block.endVerse);
    const scripture = verses.map((verse) => verse.text).join(" ");
    parts.push(`${speakReference(block.chapter, block.startVerse, block.endVerse)} ${scripture}`);
    const customTeaching = lesson.dayNumber === 1 ? teachingByReference[block.reference] : null;
    parts.push(...(customTeaching || section.teaching));
  }

  if (lesson.dayNumber === 1) {
    parts.push(
      "The Creation of the World shows us the world before the damage.",
      "God creates, speaks, orders, fills, blesses, rests, forms, breathes, plants, provides, commands, and creates relationship.",
      "Human life is not accidental. Work is not pointless. Rest is not optional. Relationship is not random.",
      "Everything begins with God's good design.",
      "We were made by God, in God's image, for life with God.",
      "Before we understand the fall, we need to understand creation.",
      "Before we understand redemption, we need to understand what God made humanity for.",
    );
  } else {
    parts.push(...lesson.closing);
  }

  return cleanTextForTts(parts.join("\n\n"))
    .replace(/\bVerse\s+\d+\b\.?/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getApprovedBibleYearScriptPath(dayNumber: number) {
  if (dayNumber === 8) return DAY_EIGHT_APPROVED_SCRIPT_PATH;
  if (dayNumber === 9) return DAY_NINE_APPROVED_SCRIPT_PATH;
  if (dayNumber === 10) return DAY_TEN_APPROVED_SCRIPT_PATH;
  if (dayNumber === 11) return DAY_ELEVEN_APPROVED_SCRIPT_PATH;
  if (dayNumber === 12) return DAY_TWELVE_APPROVED_SCRIPT_PATH;
  if (dayNumber === 13) return DAY_THIRTEEN_APPROVED_SCRIPT_PATH;
  if (dayNumber === 14) return DAY_FOURTEEN_APPROVED_SCRIPT_PATH;
  if (dayNumber === 15) return DAY_FIFTEEN_APPROVED_SCRIPT_PATH;
  if (dayNumber === 16) return DAY_SIXTEEN_APPROVED_SCRIPT_PATH;
  if (dayNumber === 17) return DAY_SEVENTEEN_APPROVED_SCRIPT_PATH;
  if (dayNumber === 18) return DAY_EIGHTEEN_APPROVED_SCRIPT_PATH;
  if (dayNumber === 19) return DAY_NINETEEN_APPROVED_SCRIPT_PATH;
  if (dayNumber === 20) return DAY_TWENTY_APPROVED_SCRIPT_PATH;
  if (dayNumber === 21) return DAY_TWENTY_ONE_APPROVED_SCRIPT_PATH;
  if (dayNumber === 22) return DAY_TWENTY_TWO_APPROVED_SCRIPT_PATH;
  if (dayNumber === 23) return DAY_TWENTY_THREE_APPROVED_SCRIPT_PATH;
  return null;
}

function buildApprovedBibleYearSpeechText(scriptPath: string) {
  const raw = readFileSync(scriptPath, "utf8");
  const lines = raw.split(/\r?\n/);
  const spokenLines: string[] = [];
  let include = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "## Opening") {
      include = true;
      continue;
    }

    if (!include || !trimmed) continue;
    if (/^##\s+Reusable Day Script Framework/i.test(trimmed)) break;
    if (/^#{1,6}\s+/.test(trimmed)) continue;
    if (/^\*\*(Scripture|Narrator)\*\*$/i.test(trimmed)) continue;
    if (/^\*\*(Reading|Bible text|Goal|Estimated script word count|Estimated spoken time|Estimated audio runtime with light pauses\/music bed)\s*:/i.test(trimmed)) continue;

    const withoutVerseNumber = trimmed.replace(/^\d+\.\s+/, "");
    const withoutMarkdownLabel = withoutVerseNumber.replace(/^\*\*([^*]+)\*\*:?\s*/g, "$1 ");
    spokenLines.push(withoutMarkdownLabel);
  }

  return cleanTextForTts(spokenLines.join("\n\n"))
    .replace(/\bVerse\s+\d+\b\.?/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function voiceForRole(role: BibleYearAudioRole) {
  if (role === "god") return GENESIS_ONE_TTS_VOICE;
  if (role === "adam") return "alloy";
  return GENESIS_ONE_TTS_VOICE;
}

function instructionsForRole(role: BibleYearAudioRole) {
  if (role === "god") {
    return "Speak as the voice of God in Genesis with the deepest calm masculine presence available. Sound reverent, eternal, peaceful, authoritative, slow, grounded, and emotionally controlled. Keep the voice lower and heavier than the narrator. Do not sound aggressive, theatrical, villainous, or like a movie trailer. Use spacious pauses and quiet weight. Do not read markdown, headings, emojis, bullets, sound effect cues, or formatting labels.";
  }

  if (role === "adam") {
    return "Speak as Adam in Genesis with a human, warm, curious, vulnerable masculine voice. Sound amazed and emotionally alive, like someone seeing another human for the first time. Keep it sincere and grounded, not theatrical. Do not read markdown, headings, emojis, bullets, sound effect cues, or formatting labels.";
  }

  return selectedLesson.dayNumber === 1
    ? "Speak in a warm, cinematic, personal, emotionally grounded masculine voice. Sound like a trusted guide walking one listener through Scripture, not like a sermon, lecture, podcast, or generic audiobook. Use intimate pacing, soft dramatic pauses, and reflective emotional weight. Let Scripture readings feel reverent and spacious. Announce each Scripture range naturally, for example: Genesis 1 verses 1 through 5. Do not announce every individual verse number. Do not read markdown, headings, emojis, bullets, sound effect cues, or formatting labels. Speak directly to one person with calm hope, wonder, and presence. Do not sound robotic, theatrical, rushed, salesy, or overly polished."
    : "Speak in a deep, warm, older male narrator voice. Sound soulful, calm, grounded, cinematic, and wise, like an audio Bible story companion with documentary pacing. Let the Scripture readings feel reverent and spacious, then make the explanations conversational, connected, and emotionally clear. Keep the tone reflective, comforting, and weighty without sounding like a sermon. Announce each Scripture range naturally, for example: Genesis 1 verses 1 through 5. Do not announce every individual verse number. Do not read markdown, headings, emojis, bullets, sound effect cues, or formatting labels. Do not sound robotic, theatrical, rushed, salesy, or overly polished.";
}

async function generateOpenAiSpeechPcm(text: string, role: BibleYearAudioRole = "narrator") {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: voiceForRole(role),
      input: text,
      instructions: instructionsForRole(role),
      response_format: "pcm",
    }),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "OpenAI TTS failed.");
    throw new Error(message || "OpenAI TTS failed.");
  }

  return Buffer.from(await response.arrayBuffer());
}

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function uploadAudio(audio: Buffer) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");

  await supabase.storage.createBucket(BIBLE_YEAR_AUDIO_BUCKET, { public: false }).catch(() => null);
  const upload = await supabase.storage.from(BIBLE_YEAR_AUDIO_BUCKET).upload(selectedAudio.storagePath, audio, {
    contentType: "audio/mpeg",
    upsert: true,
  });

  if (upload.error) throw new Error(upload.error.message);
}

async function main() {
  if (selectedLesson.dayNumber === 1) {
    const segments = buildDayOneSingleNarratorSegments(selectedLesson);
    const voicePieces: Float32Array[] = [];
    let cursor = 0;
    const totalChars = segments.reduce((total, item) => total + item.text.length, 0);

    console.log(`[${selectedDayLabel}] Production segments: ${segments.length}, text chars: ${totalChars}`);
    for (const [index, item] of segments.entries()) {
      console.log(`[${selectedDayLabel}] Generating single-narrator segment ${index + 1}/${segments.length} (${item.scene})`);
      const chunks = chunkSpeechInput(item.text);
      const voiceChunks: Float32Array[] = [];
      for (const chunk of chunks) voiceChunks.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(chunk, item.role)));
      const voice = processVoiceForRole(concatSamples(voiceChunks), item.role);
      const pause = silenceSamples(item.pauseAfterMs ?? 450);
      voicePieces.push(voice, pause);
      cursor += voice.length + pause.length;
    }

    console.log(`[${selectedDayLabel}] Normalizing clean character/narrator voice episode`);
    const mixed = normalizeVoiceOnlyEpisode(concatSamples(voicePieces));

    console.log(`[${selectedDayLabel}] Encoding clean voice production MP3`);
    const mp3 = encodeMp3(mixed);
    ensureDir(OUTPUT_PATH);
    writeFileSync(OUTPUT_PATH, mp3);
    writeFileSync(VOICE_ONLY_OUTPUT_PATH, mp3);

    console.log(`[${selectedDayLabel}] Local MP3: ${OUTPUT_PATH}`);
    console.log(`[${selectedDayLabel}] Voice-only MP3: ${VOICE_ONLY_OUTPUT_PATH}`);
    console.log(`[${selectedDayLabel}] Uploading to ${BIBLE_YEAR_AUDIO_BUCKET}/${selectedAudio.storagePath}`);
    await uploadAudio(mp3);
    console.log(`[${selectedDayLabel}] Done`);
    return;
  }

  const text = buildBibleYearSpeechText(selectedLesson);
  const chunks = chunkSpeechInput(text);
  const voiceChunks: Float32Array[] = [];

  console.log(`[${selectedDayLabel}] Text chars: ${text.length}, chunks: ${chunks.length}`);
  for (const [index, chunk] of chunks.entries()) {
    console.log(`[${selectedDayLabel}] Generating chunk ${index + 1}/${chunks.length}`);
    voiceChunks.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(chunk)));
  }

  const voiceTrack = concatSamples(voiceChunks);
  const mixed = voiceOnlyMode ? normalizeVoiceOnlyEpisode(voiceTrack) : mixVoiceWithBed(voiceTrack);

  console.log(`[${selectedDayLabel}] Encoding ${voiceOnlyMode ? "narrator-only" : "mixed"} MP3`);
  const mp3 = encodeMp3(mixed);
  const outputPath = voiceOnlyMode ? NARRATOR_ONLY_OUTPUT_PATH : OUTPUT_PATH;
  ensureDir(outputPath);
  writeFileSync(outputPath, mp3);

  console.log(`[${selectedDayLabel}] Local MP3: ${outputPath}`);
  if (!voiceOnlyMode || uploadVoiceOnlyMode) {
    console.log(`[${selectedDayLabel}] Uploading to ${BIBLE_YEAR_AUDIO_BUCKET}/${selectedAudio.storagePath}`);
    await uploadAudio(mp3);
  }
  console.log(`[${selectedDayLabel}] Done`);
}

main().catch((error) => {
  console.error(`[${selectedDayLabel}] Failed:`, error);
  process.exit(1);
});
