import { config } from "dotenv";
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createClient } from "@supabase/supabase-js";
import ffmpegPath from "ffmpeg-static";
import {
  assignEpisodeVoices,
  castFor,
  BIBLE_YEAR_MAX_TTS_CHUNK_LENGTH,
  BIBLE_YEAR_MP3_KBPS,
  BIBLE_YEAR_SAMPLE_RATE as SR,
  BIBLE_YEAR_TTS_MODEL,
  type BibleYearAudioRole,
  type BibleYearAudioSegment,
} from "../lib/bibleYearAudioCast";
import { BIBLE_YEAR_AUDIO_BUCKET } from "../lib/bibleYearAudio";
import { GENESIS_DAY_ONE_CREATION_LESSON } from "../lib/bibleYearDailyLessons";
import { buildDayOneSegments } from "../lib/bibleYearDayOneSegments";
import { buildDaySegments, type BibleYearDayScript } from "../lib/bibleYearDayScript";
import { BIBLE_YEAR_DAY_TWO_SCRIPT } from "../lib/bibleYearDayTwoScript";
import {
  BIBLE_YEAR_DAY_FIVE_SCRIPT,
  BIBLE_YEAR_DAY_FOUR_SCRIPT,
  BIBLE_YEAR_DAY_SIX_SCRIPT,
  BIBLE_YEAR_DAY_THREE_SCRIPT,
} from "../lib/bibleYearDaysThreeToSixScripts";
import {
  BIBLE_YEAR_DAY_EIGHT_SCRIPT,
  BIBLE_YEAR_DAY_NINE_SCRIPT,
  BIBLE_YEAR_DAY_SEVEN_SCRIPT,
  BIBLE_YEAR_DAY_TEN_SCRIPT,
} from "../lib/bibleYearDaysSevenToTenScripts";
import { BIBLE_YEAR_DAY_ELEVEN_SCRIPT } from "../lib/bibleYearDayElevenScript";
import { BIBLE_YEAR_DAY_TWELVE_SCRIPT } from "../lib/bibleYearDayTwelveScript";
import { BIBLE_YEAR_DAY_THIRTEEN_SCRIPT } from "../lib/bibleYearDayThirteenScript";
import { BIBLE_YEAR_DAY_FOURTEEN_SCRIPT } from "../lib/bibleYearDayFourteenScript";
import { BIBLE_YEAR_DAY_FIFTEEN_SCRIPT } from "../lib/bibleYearDayFifteenScript";
import { BIBLE_YEAR_DAY_SIXTEEN_SCRIPT } from "../lib/bibleYearDaySixteenScript";
import { BIBLE_YEAR_DAY_SEVENTEEN_SCRIPT } from "../lib/bibleYearDaySeventeenScript";
import { BIBLE_YEAR_DAY_EIGHTEEN_SCRIPT } from "../lib/bibleYearDayEighteenScript";
import { BIBLE_YEAR_DAY_NINETEEN_SCRIPT } from "../lib/bibleYearDayNineteenScript";
import { BIBLE_YEAR_DAY_TWENTY_SCRIPT } from "../lib/bibleYearDayTwentyScript";
import { BIBLE_YEAR_DAY_TWENTY_ONE_SCRIPT } from "../lib/bibleYearDayTwentyOneScript";
import { BIBLE_YEAR_DAY_TWENTY_TWO_SCRIPT } from "../lib/bibleYearDayTwentyTwoScript";
import { BIBLE_YEAR_DAY_TWENTY_THREE_SCRIPT } from "../lib/bibleYearDayTwentyThreeScript";
import { BIBLE_YEAR_DAY_TWENTY_FOUR_SCRIPT } from "../lib/bibleYearDayTwentyFourScript";
import { BIBLE_YEAR_DAY_TWENTY_FIVE_SCRIPT } from "../lib/bibleYearDayTwentyFiveScript";
import { BIBLE_YEAR_DAY_TWENTY_SIX_SCRIPT } from "../lib/bibleYearDayTwentySixScript";
import { BIBLE_YEAR_DAY_TWENTY_SEVEN_SCRIPT } from "../lib/bibleYearDayTwentySevenScript";
import { BIBLE_YEAR_DAY_TWENTY_EIGHT_SCRIPT } from "../lib/bibleYearDayTwentyEightScript";
import { BIBLE_YEAR_DAY_TWENTY_NINE_SCRIPT } from "../lib/bibleYearDayTwentyNineScript";
import { BIBLE_YEAR_DAY_THIRTY_SCRIPT } from "../lib/bibleYearDayThirtyScript";
import { BIBLE_YEAR_DAY_THIRTY_ONE_SCRIPT } from "../lib/bibleYearDayThirtyOneScript";
import { BIBLE_YEAR_DAY_THIRTY_TWO_SCRIPT } from "../lib/bibleYearDayThirtyTwoScript";
import { BIBLE_YEAR_DAY_THIRTY_THREE_SCRIPT } from "../lib/bibleYearDayThirtyThreeScript";
import { BIBLE_YEAR_DAY_THIRTY_FOUR_SCRIPT } from "../lib/bibleYearDayThirtyFourScript";
import { BIBLE_YEAR_DAY_THIRTY_FIVE_SCRIPT } from "../lib/bibleYearDayThirtyFiveScript";
import { BIBLE_YEAR_DAY_THIRTY_SIX_SCRIPT } from "../lib/bibleYearDayThirtySixScript";
import { BIBLE_YEAR_DAY_THIRTY_SEVEN_SCRIPT } from "../lib/bibleYearDayThirtySevenScript";
import { BIBLE_YEAR_DAY_THIRTY_EIGHT_SCRIPT } from "../lib/bibleYearDayThirtyEightScript";
import { BIBLE_YEAR_DAY_THIRTY_NINE_SCRIPT } from "../lib/bibleYearDayThirtyNineScript";
import { BIBLE_YEAR_DAY_FORTY_SCRIPT } from "../lib/bibleYearDayFortyScript";
import { BIBLE_YEAR_DAY_FORTY_ONE_SCRIPT } from "../lib/bibleYearDayFortyOneScript";
import { BIBLE_YEAR_DAY_FORTY_TWO_SCRIPT } from "../lib/bibleYearDayFortyTwoScript";
import { BIBLE_YEAR_DAY_FORTY_THREE_SCRIPT } from "../lib/bibleYearDayFortyThreeScript";
import { BIBLE_YEAR_DAY_FORTY_FOUR_SCRIPT } from "../lib/bibleYearDayFortyFourScript";
import { BIBLE_YEAR_DAY_FORTY_FIVE_SCRIPT } from "../lib/bibleYearDayFortyFiveScript";
import { BIBLE_YEAR_DAY_FORTY_SIX_SCRIPT } from "../lib/bibleYearDayFortySixScript";
import { BIBLE_YEAR_DAY_FORTY_SEVEN_SCRIPT } from "../lib/bibleYearDayFortySevenScript";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const FFMPEG = ffmpegPath as unknown as string;

function arg(name: string, fallback?: string) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
}
const has = (name: string) => process.argv.includes(`--${name}`);

const day = Number(arg("day", "1"));
const musicFile = arg("music", "SangeetKiAatma.mp3") as string;
const musicGain = Number(arg("music-gain", "0.08"));
const concurrency = Number(arg("concurrency", "5"));
const remixOnly = has("remix");
const shouldUpload = has("upload");

const padded = String(day).padStart(3, "0");
const outDir = join(process.cwd(), "tmp", "bible-in-one-year", `day-${padded}`);
const MIXED_PATH = join(outDir, `day-${padded}-audio.mp3`);
const DRY_PATH = join(outDir, `day-${padded}-narrator-only.mp3`);
/** Segments are cached individually so re-balancing and re-mixing cost no API calls. */
const SEGMENT_CACHE = join(outDir, `day-${padded}-segments.f32`);
const SEGMENT_INDEX = join(outDir, `day-${padded}-segments.json`);

function ensureDir(p: string) {
  mkdirSync(dirname(p), { recursive: true });
}

// --- audio primitives ------------------------------------------------------

function pcmToFloat32(buffer: Buffer) {
  const out = new Float32Array(Math.floor(buffer.length / 2));
  for (let i = 0; i < out.length; i += 1) out[i] = buffer.readInt16LE(i * 2) / 32768;
  return out;
}

function concat(chunks: Float32Array[]) {
  const out = new Float32Array(chunks.reduce((n, c) => n + c.length, 0));
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.length;
  }
  return out;
}

function silence(ms: number) {
  return new Float32Array(Math.max(0, Math.round((ms / 1000) * SR)));
}

/**
 * Every TTS clip ships with roughly 1.8s of silence baked into its head and
 * tail. Left in, that silence stacks on top of the authored pause and turns a
 * 380ms beat into a 2+ second hole on every voice switch. Trimming first makes
 * pauseAfterMs the only gap, so transitions are exact.
 */
function trimSilence(s: Float32Array, threshold = 0.006, marginMs = 30) {
  const margin = Math.round((marginMs / 1000) * SR);
  let start = 0;
  let end = s.length - 1;
  while (start < s.length && Math.abs(s[start]) < threshold) start += 1;
  while (end > start && Math.abs(s[end]) < threshold) end -= 1;
  if (start >= end) return s;
  return s.slice(Math.max(0, start - margin), Math.min(s.length, end + margin));
}

function floatToBuffer(samples: Float32Array) {
  const buf = Buffer.alloc(samples.length * 4);
  for (let i = 0; i < samples.length; i += 1) buf.writeFloatLE(samples[i], i * 4);
  return buf;
}

function runFilter(samples: Float32Array, filter: string) {
  const raw = execFileSync(FFMPEG, [
    "-hide_banner", "-loglevel", "error",
    "-f", "f32le", "-ar", String(SR), "-ac", "1", "-i", "pipe:0",
    "-af", filter, "-f", "f32le", "-ar", String(SR), "-ac", "1", "-",
  ], { input: floatToBuffer(samples), maxBuffer: 1 << 28 });
  return new Float32Array(raw.buffer, raw.byteOffset, Math.floor(raw.length / 4));
}

/**
 * Podcast loudness target. Without this, episodes land wherever the TTS
 * happened to sit - the first Day 1 render peaked at 0.61 - and 364 episodes
 * would drift audibly against each other.
 */
const LOUDNESS_FILTER = "loudnorm=I=-16:TP=-1.5:LRA=11";

function writeMp3(samples: Float32Array, file: string) {
  ensureDir(file);
  execFileSync(FFMPEG, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-f", "f32le", "-ar", String(SR), "-ac", "1", "-i", "pipe:0",
    "-af", LOUDNESS_FILTER,
    "-codec:a", "libmp3lame", "-b:a", `${BIBLE_YEAR_MP3_KBPS}k`, file,
  ], { input: floatToBuffer(samples), maxBuffer: 1 << 28 });
}

// --- music bed -------------------------------------------------------------

function decodeToMono(file: string) {
  const raw = execFileSync(FFMPEG, [
    "-hide_banner", "-loglevel", "error",
    "-i", file, "-ac", "1", "-ar", String(SR), "-f", "f32le", "-",
  ], { maxBuffer: 1 << 28 });
  return new Float32Array(raw.buffer, raw.byteOffset, Math.floor(raw.length / 4));
}

/**
 * The tracks in the repo are 3-4 minutes, so a 25 minute episode loops them
 * six or seven times. Butt-joining produces an audible clunk at every seam, so
 * fold the tail back over the head and tile the crossfaded unit instead.
 */
function buildLoopedBed(music: Float32Array, needed: number, crossfadeSeconds = 4) {
  const cf = Math.min(Math.round(crossfadeSeconds * SR), Math.floor(music.length / 3));
  const unitLength = music.length - cf;
  const unit = new Float32Array(unitLength);

  for (let i = 0; i < unitLength; i += 1) {
    if (i < cf) {
      const t = i / cf;
      unit[i] = music[i] * t + music[unitLength + i] * (1 - t);
    } else {
      unit[i] = music[i];
    }
  }

  const out = new Float32Array(needed);
  for (let i = 0; i < needed; i += 1) out[i] = unit[i % unitLength];
  return out;
}

function mixWithBed(voice: Float32Array, bed: Float32Array, gain: number) {
  const tail = SR * 3;
  const length = voice.length + tail;
  const out = new Float32Array(length);
  let peak = 0;

  for (let i = 0; i < length; i += 1) {
    const fadeIn = Math.min(1, i / (SR * 2));
    const fadeOut = Math.min(1, (length - i) / (SR * 3));
    const ambience = (bed[i] || 0) * gain * fadeIn * fadeOut;
    const voiced = i < voice.length ? voice[i] * 1.0 : 0;
    const mixed = voiced + ambience;
    out[i] = mixed;
    peak = Math.max(peak, Math.abs(mixed));
  }

  if (peak > 0.98) {
    const scale = 0.98 / peak;
    for (let i = 0; i < length; i += 1) out[i] *= scale;
  }
  return out;
}

/** RMS over voiced samples only, so trailing echo and room tone do not drag it down. */
function voicedRms(samples: Float32Array, floor = 0.01) {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < samples.length; i += 1) {
    const v = samples[i];
    if (Math.abs(v) >= floor) {
      sum += v * v;
      count += 1;
    }
  }
  return count ? Math.sqrt(sum / count) : 0;
}

function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * OpenAI's voices do not come out at matched loudness, and loudnorm runs on the
 * finished episode - it lifts everything evenly, so a quiet character voice stays
 * quiet next to the narrator. God is worst affected because his compressor and
 * echo tail pull his average down further.
 *
 * Balance per role rather than per segment: match each role's median to the
 * narrator's, so cross-voice level is even but a narrator who drops to a hush
 * on one line still drops.
 */
/** Level each role sits at relative to the narrator. 1.0 = matched. */
/**
 * Which voice each speaker uses in this episode. Set once the segments are
 * known, so two characters in the same day never share a voice.
 */
let episodeVoices = new Map<string, string>();

const ROLE_LEVEL_TARGET: Partial<Record<BibleYearAudioRole, number>> = {
  // Was 1.12, which stacked on top of the old filter and made God boom over
  // everything. Just above the narrator is enough to feel set apart.
  god: 1.02,
};

function roleGains(rendered: Float32Array[], segments: BibleYearAudioSegment[]) {
  const byRole = new Map<BibleYearAudioRole, number[]>();
  rendered.forEach((audio, index) => {
    const role = segments[index].role;
    if (!byRole.has(role)) byRole.set(role, []);
    byRole.get(role)!.push(voicedRms(audio));
  });

  const narratorLevel = median(byRole.get("narrator") || []);
  const gains = new Map<BibleYearAudioRole, number>();

  for (const [role, levels] of byRole) {
    const level = median(levels);
    // God sits deliberately forward of the narrator; flattening him to parity
    // costs the presence that makes him read as God at all.
    const target = narratorLevel * (ROLE_LEVEL_TARGET[role] ?? 1);
    const gain = role === "narrator" || !level || !narratorLevel
      ? 1
      : Math.max(0.6, Math.min(2.5, target / level));
    gains.set(role, gain);
    console.log(
      `[day ${padded}] ${role.padEnd(8)} rms ${level.toFixed(4)} -> gain ${gain.toFixed(2)}`,
    );
  }
  return gains;
}

function normalize(voice: Float32Array) {
  const out = new Float32Array(voice.length);
  let peak = 0;
  for (let i = 0; i < voice.length; i += 1) {
    out[i] = voice[i] * 0.98;
    peak = Math.max(peak, Math.abs(out[i]));
  }
  if (peak > 0.98) {
    const scale = 0.98 / peak;
    for (let i = 0; i < out.length; i += 1) out[i] *= scale;
  }
  return out;
}

// --- speech ----------------------------------------------------------------

function chunkText(text: string) {
  if (text.length <= BIBLE_YEAR_MAX_TTS_CHUNK_LENGTH) return [text];
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    const next = `${current} ${trimmed}`.trim();
    if (next.length > BIBLE_YEAR_MAX_TTS_CHUNK_LENGTH && current) {
      chunks.push(current);
      current = trimmed;
    } else {
      current = next;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

async function speak(text: string, role: BibleYearAudioRole) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");
  const entry = castFor(role);
  const voice = episodeVoices.get(role) || entry.voice;

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: BIBLE_YEAR_TTS_MODEL,
      voice,
      input: text,
      instructions: entry.instructions,
      response_format: "pcm",
    }),
  });

  if (!response.ok) {
    throw new Error(`TTS failed for ${role}/${voice}: ${await response.text()}`);
  }
  return pcmToFloat32(Buffer.from(await response.arrayBuffer()));
}

async function renderSegment(item: BibleYearAudioSegment) {
  const parts: Float32Array[] = [];
  for (const chunk of chunkText(item.text)) parts.push(await speak(chunk, item.role));
  let voice = trimSilence(concat(parts));

  const filter = castFor(item.role).filter;
  if (filter) voice = trimSilence(runFilter(voice, filter));

  return voice;
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T, index: number) => Promise<R>) {
  const out = new Array<R>(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      out[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return out;
}

// --- day wiring ------------------------------------------------------------

const DAY_SCRIPTS: Record<number, BibleYearDayScript> = {
  2: BIBLE_YEAR_DAY_TWO_SCRIPT,
  3: BIBLE_YEAR_DAY_THREE_SCRIPT,
  4: BIBLE_YEAR_DAY_FOUR_SCRIPT,
  5: BIBLE_YEAR_DAY_FIVE_SCRIPT,
  6: BIBLE_YEAR_DAY_SIX_SCRIPT,
  7: BIBLE_YEAR_DAY_SEVEN_SCRIPT,
  8: BIBLE_YEAR_DAY_EIGHT_SCRIPT,
  9: BIBLE_YEAR_DAY_NINE_SCRIPT,
  10: BIBLE_YEAR_DAY_TEN_SCRIPT,
  11: BIBLE_YEAR_DAY_ELEVEN_SCRIPT,
  12: BIBLE_YEAR_DAY_TWELVE_SCRIPT,
  13: BIBLE_YEAR_DAY_THIRTEEN_SCRIPT,
  14: BIBLE_YEAR_DAY_FOURTEEN_SCRIPT,
  15: BIBLE_YEAR_DAY_FIFTEEN_SCRIPT,
  16: BIBLE_YEAR_DAY_SIXTEEN_SCRIPT,
  17: BIBLE_YEAR_DAY_SEVENTEEN_SCRIPT,
  18: BIBLE_YEAR_DAY_EIGHTEEN_SCRIPT,
  19: BIBLE_YEAR_DAY_NINETEEN_SCRIPT,
  20: BIBLE_YEAR_DAY_TWENTY_SCRIPT,
  21: BIBLE_YEAR_DAY_TWENTY_ONE_SCRIPT,
  22: BIBLE_YEAR_DAY_TWENTY_TWO_SCRIPT,
  23: BIBLE_YEAR_DAY_TWENTY_THREE_SCRIPT,
  24: BIBLE_YEAR_DAY_TWENTY_FOUR_SCRIPT,
  25: BIBLE_YEAR_DAY_TWENTY_FIVE_SCRIPT,
  26: BIBLE_YEAR_DAY_TWENTY_SIX_SCRIPT,
  27: BIBLE_YEAR_DAY_TWENTY_SEVEN_SCRIPT,
  28: BIBLE_YEAR_DAY_TWENTY_EIGHT_SCRIPT,
  29: BIBLE_YEAR_DAY_TWENTY_NINE_SCRIPT,
  30: BIBLE_YEAR_DAY_THIRTY_SCRIPT,
  31: BIBLE_YEAR_DAY_THIRTY_ONE_SCRIPT,
  32: BIBLE_YEAR_DAY_THIRTY_TWO_SCRIPT,
  33: BIBLE_YEAR_DAY_THIRTY_THREE_SCRIPT,
  34: BIBLE_YEAR_DAY_THIRTY_FOUR_SCRIPT,
  35: BIBLE_YEAR_DAY_THIRTY_FIVE_SCRIPT,
  36: BIBLE_YEAR_DAY_THIRTY_SIX_SCRIPT,
  37: BIBLE_YEAR_DAY_THIRTY_SEVEN_SCRIPT,
  38: BIBLE_YEAR_DAY_THIRTY_EIGHT_SCRIPT,
  39: BIBLE_YEAR_DAY_THIRTY_NINE_SCRIPT,
  40: BIBLE_YEAR_DAY_FORTY_SCRIPT,
  41: BIBLE_YEAR_DAY_FORTY_ONE_SCRIPT,
  42: BIBLE_YEAR_DAY_FORTY_TWO_SCRIPT,
  43: BIBLE_YEAR_DAY_FORTY_THREE_SCRIPT,
  44: BIBLE_YEAR_DAY_FORTY_FOUR_SCRIPT,
  45: BIBLE_YEAR_DAY_FORTY_FIVE_SCRIPT,
  46: BIBLE_YEAR_DAY_FORTY_SIX_SCRIPT,
  47: BIBLE_YEAR_DAY_FORTY_SEVEN_SCRIPT,
};

async function segmentsForDay(dayNumber: number): Promise<BibleYearAudioSegment[]> {
  if (dayNumber === 1) return buildDayOneSegments(GENESIS_DAY_ONE_CREATION_LESSON);
  const script = DAY_SCRIPTS[dayNumber];
  if (script) return buildDaySegments(script);
  throw new Error(`Day ${dayNumber} has no segment script yet.`);
}

async function upload(audio: Buffer) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase credentials are required to upload.");
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const storagePath = `bible-in-one-year/day-${padded}/day-${padded}-audio.mp3`;
  const result = await supabase.storage.from(BIBLE_YEAR_AUDIO_BUCKET).upload(storagePath, audio, {
    contentType: "audio/mpeg",
    upsert: true,
  });
  if (result.error) throw new Error(result.error.message);
  console.log(`[day ${padded}] uploaded to ${BIBLE_YEAR_AUDIO_BUCKET}/${storagePath}`);
}

type CachedSegment = { role: BibleYearAudioRole; length: number; pauseAfterMs: number };

function loadCachedSegments() {
  const index = JSON.parse(readFileSync(SEGMENT_INDEX, "utf8")) as CachedSegment[];
  const blob = readFileSync(SEGMENT_CACHE);
  const all = new Float32Array(blob.buffer, blob.byteOffset, Math.floor(blob.length / 4));

  const rendered: Float32Array[] = [];
  let offset = 0;
  for (const item of index) {
    rendered.push(all.slice(offset, offset + item.length));
    offset += item.length;
  }
  return { index, rendered };
}

async function main() {
  let rendered: Float32Array[];
  let meta: CachedSegment[];

  if (remixOnly && existsSync(SEGMENT_CACHE) && existsSync(SEGMENT_INDEX)) {
    const cached = loadCachedSegments();
    rendered = cached.rendered;
    meta = cached.index;
    console.log(`[day ${padded}] reusing ${meta.length} cached segments (no API calls)`);
  } else {
    const segments = await segmentsForDay(day);
    episodeVoices = assignEpisodeVoices(segments.map((item) => item.role));
    const spokenCast = [...episodeVoices].filter(([role]) => role !== "narrator");
    if (spokenCast.length) {
      console.log(
        `[day ${padded}] cast: ` + spokenCast.map(([role, voice]) => `${role}/${voice}`).join(", "),
      );
    }
    const roleCounts = segments.reduce<Record<string, number>>((acc, s) => {
      acc[s.role] = (acc[s.role] || 0) + 1;
      return acc;
    }, {});
    console.log(`[day ${padded}] ${segments.length} segments:`, roleCounts);

    let done = 0;
    rendered = await mapLimit(segments, concurrency, async (item) => {
      const audio = await renderSegment(item);
      done += 1;
      if (done % 20 === 0) console.log(`[day ${padded}] ${done}/${segments.length} segments`);
      return audio;
    });

    meta = segments.map((item, index) => ({
      role: item.role,
      length: rendered[index].length,
      pauseAfterMs: item.pauseAfterMs ?? 380,
    }));

    ensureDir(SEGMENT_CACHE);
    writeFileSync(SEGMENT_CACHE, floatToBuffer(concat(rendered)));
    writeFileSync(SEGMENT_INDEX, JSON.stringify(meta));
  }

  const gains = roleGains(rendered, meta.map((m) => ({ role: m.role })) as BibleYearAudioSegment[]);

  const pieces: Float32Array[] = [];
  rendered.forEach((audio, index) => {
    const gain = gains.get(meta[index].role) ?? 1;
    if (gain === 1) {
      pieces.push(audio);
    } else {
      const scaled = new Float32Array(audio.length);
      for (let i = 0; i < audio.length; i += 1) scaled[i] = audio[i] * gain;
      pieces.push(scaled);
    }
    pieces.push(silence(meta[index].pauseAfterMs));
  });
  const voice = concat(pieces);

  const minutes = voice.length / SR / 60;
  console.log(`[day ${padded}] voice track: ${minutes.toFixed(1)} min`);

  const dry = normalize(voice);
  writeMp3(dry, DRY_PATH);
  console.log(`[day ${padded}] dry: ${DRY_PATH}`);

  const music = decodeToMono(join(process.cwd(), musicFile));
  const bed = buildLoopedBed(music, voice.length + SR * 4);
  const mixed = mixWithBed(voice, bed, musicGain);
  writeMp3(mixed, MIXED_PATH);
  console.log(`[day ${padded}] mixed (${musicFile} @ ${musicGain}): ${MIXED_PATH}`);

  if (shouldUpload) await upload(readFileSync(MIXED_PATH));
  else console.log(`[day ${padded}] not uploaded (pass --upload to publish)`);
}

main().catch((error) => {
  console.error(`[day ${padded}] failed:`, error);
  process.exit(1);
});
