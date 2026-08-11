import { config } from "dotenv";
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createClient } from "@supabase/supabase-js";
import ffmpegPath from "ffmpeg-static";
import {
  BIBLE_YEAR_CAST,
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
const VOICE_CACHE = join(outDir, `day-${padded}-voice.f32`);

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
  const entry = BIBLE_YEAR_CAST[role];

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: BIBLE_YEAR_TTS_MODEL,
      voice: entry.voice,
      input: text,
      instructions: entry.instructions,
      response_format: "pcm",
    }),
  });

  if (!response.ok) {
    throw new Error(`TTS failed for ${role}/${entry.voice}: ${await response.text()}`);
  }
  return pcmToFloat32(Buffer.from(await response.arrayBuffer()));
}

async function renderSegment(item: BibleYearAudioSegment) {
  const parts: Float32Array[] = [];
  for (const chunk of chunkText(item.text)) parts.push(await speak(chunk, item.role));
  let voice = trimSilence(concat(parts));

  const filter = BIBLE_YEAR_CAST[item.role].filter;
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

function segmentsForDay(dayNumber: number): BibleYearAudioSegment[] {
  if (dayNumber === 1) return buildDayOneSegments(GENESIS_DAY_ONE_CREATION_LESSON);
  throw new Error(`Day ${dayNumber} has no segment script yet. Day 1 is the reference build.`);
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

async function main() {
  let voice: Float32Array;

  if (remixOnly && existsSync(VOICE_CACHE)) {
    const cached = readFileSync(VOICE_CACHE);
    voice = new Float32Array(cached.buffer, cached.byteOffset, Math.floor(cached.length / 4));
    console.log(`[day ${padded}] reusing cached voice track (${(voice.length / SR / 60).toFixed(1)} min)`);
  } else {
    const segments = segmentsForDay(day);
    const roleCounts = segments.reduce<Record<string, number>>((acc, s) => {
      acc[s.role] = (acc[s.role] || 0) + 1;
      return acc;
    }, {});
    console.log(`[day ${padded}] ${segments.length} segments:`, roleCounts);

    let done = 0;
    const rendered = await mapLimit(segments, concurrency, async (item) => {
      const audio = await renderSegment(item);
      done += 1;
      if (done % 20 === 0) console.log(`[day ${padded}] ${done}/${segments.length} segments`);
      return audio;
    });

    const pieces: Float32Array[] = [];
    rendered.forEach((audio, index) => {
      pieces.push(audio, silence(segments[index].pauseAfterMs ?? 380));
    });
    voice = concat(pieces);

    ensureDir(VOICE_CACHE);
    writeFileSync(VOICE_CACHE, floatToBuffer(voice));
  }

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
