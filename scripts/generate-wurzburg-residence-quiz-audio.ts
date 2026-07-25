import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createContext, runInContext } from "vm";
import { GENESIS_ONE_TTS_VOICE } from "../lib/genesisOneTtsAudio";
import { cleanTextForTts } from "../lib/ttsSpeechText";

const SAMPLE_RATE = 24000;
const MAX_TTS_CHUNK_LENGTH = 3400;
const MP3_KBPS = 128;
const TTS_CONCURRENCY = 5;

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const outputPath = join(process.cwd(), "exports", "wurzburg-residence-tour", "Würzburg Residence Quiz.mp3");
const scriptPath = join(process.cwd(), "exports", "wurzburg-residence-tour", "residence-quiz-script.md");

type Segment = { type: "text"; text: string } | { type: "silence"; ms: number };

const ROUND_ANNOUNCEMENTS: Record<string, string> = {
  "ROUND 1 — THE WARM-UP": "Round One: The Warm-Up.",
  "ROUND 2 — BUILDING THE KNOWLEDGE": "Round Two: Building the Knowledge.",
  "ROUND 3 — GUIDE-LEVEL MASTERY": "Round Three: Guide-Level Mastery.",
  "FINAL ROUND — THE GAUNTLET": "Final Round: The Gauntlet.",
};

const QUESTION_PREFIX = /^\*\*Q\d+\.\*\*\s*/;
const GAUNTLET_PREFIX = /^\*\*G\d+\.\*\*\s*/;
const ANSWER_PREFIX = /^\*\*A:\*\*\s*/;

function ensureDir(path: string) {
  mkdirSync(dirname(path), { recursive: true });
}

function clamp(value: number) {
  return Math.max(-1, Math.min(1, value));
}

function pcmBufferToFloat32(buffer: Buffer) {
  const samples = new Float32Array(Math.floor(buffer.length / 2));
  for (let i = 0; i < samples.length; i += 1) samples[i] = buffer.readInt16LE(i * 2) / 32768;
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

function silenceSamples(ms: number) {
  return new Float32Array(Math.round((ms / 1000) * SAMPLE_RATE));
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
    for (let j = 0; j < block.length; j += 1) pcm[j] = Math.round(clamp(block[j]) * 32767);
    const encoded = encoder.encodeBuffer(pcm);
    if (encoded.length > 0) mp3Chunks.push(Buffer.from(encoded));
  }

  const flushed = encoder.flush();
  if (flushed.length > 0) mp3Chunks.push(Buffer.from(flushed));
  return Buffer.concat(mp3Chunks);
}

function pushText(segments: Segment[], text: string) {
  const trimmed = text.trim();
  if (trimmed) segments.push({ type: "text", text: trimmed });
}

function pushSilence(segments: Segment[], ms: number) {
  segments.push({ type: "silence", ms });
}

function buildSegments(raw: string): Segment[] {
  const segments: Segment[] = [];
  const lines = raw.split("\n");

  let started = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!started) {
      if (line === "## HOST INTRO") started = true;
      continue;
    }

    if (line === "### Notes for repeat play") break;
    if (!line || line === "---") continue;

    if (line.startsWith("*(") && line.endsWith(")*")) {
      if (line.startsWith("*(End of Round")) pushSilence(segments, 1200);
      continue;
    }

    if (line === "## HOST INTRO" || line === "## HOW TO PLAY" || line === "## CLOSING") {
      pushSilence(segments, 1000);
      continue;
    }

    if (line.startsWith("## ")) {
      const key = line.replace(/^## /, "");
      pushSilence(segments, 1500);
      const announcement = ROUND_ANNOUNCEMENTS[key];
      if (announcement) pushText(segments, announcement);
      pushSilence(segments, 800);
      continue;
    }

    if (GAUNTLET_PREFIX.test(line)) {
      const withoutPrefix = line.replace(GAUNTLET_PREFIX, "");
      const [questionPart, answerPart] = withoutPrefix.split("[pause]");
      pushText(segments, questionPart);
      pushSilence(segments, 1500);
      if (answerPart) pushText(segments, answerPart);
      pushSilence(segments, 500);
      continue;
    }

    if (QUESTION_PREFIX.test(line)) {
      const withoutPrefix = line.replace(QUESTION_PREFIX, "");
      const [questionPart, answerPart] = withoutPrefix.split("[pause]");
      pushText(segments, questionPart);
      pushSilence(segments, 3000);
      if (answerPart) pushText(segments, answerPart);
      continue;
    }

    if (ANSWER_PREFIX.test(line)) {
      const withoutPrefix = line.replace(ANSWER_PREFIX, "");
      pushText(segments, withoutPrefix);
      pushSilence(segments, 900);
      continue;
    }

    if (line.includes("[pause]")) {
      const parts = line.split("[pause]");
      parts.forEach((part, i) => {
        pushText(segments, part);
        if (i < parts.length - 1) pushSilence(segments, 1200);
      });
      continue;
    }

    pushText(segments, line);
  }

  return segments;
}

async function generateOpenAiSpeechPcm(text: string) {
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
      voice: GENESIS_ONE_TTS_VOICE,
      response_format: "pcm",
      input: text,
      instructions:
        "Speak like an upbeat, confident game-show host running a live trivia round for a group of tour guides. Energetic and encouraging, with a little playful spark on transitions and genuine enthusiasm revealing each answer, but always clear and well-paced so specific names and dates are easy to catch. Keep pacing brisk without rushing words.",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI TTS failed: ${response.status} ${body}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function generateSpeechForText(text: string) {
  const cleaned = cleanTextForTts(text).replace(/\s+/g, " ").trim();
  if (!cleaned) return new Float32Array(0);

  if (cleaned.length <= MAX_TTS_CHUNK_LENGTH) {
    return pcmBufferToFloat32(await generateOpenAiSpeechPcm(cleaned));
  }

  const sentences = cleaned.match(/[^.!?]+[.!?]*/g) || [cleaned];
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

  const parts: Float32Array[] = [];
  for (const chunk of chunks) parts.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(chunk)));
  return concatSamples(parts);
}

async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T, index: number) => Promise<R>) {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  let completed = 0;

  async function worker() {
    while (cursor < items.length) {
      const current = cursor;
      cursor += 1;
      results[current] = await fn(items[current], current);
      completed += 1;
      if (completed % 10 === 0 || completed === items.length) {
        console.log(`Generated ${completed}/${items.length} speech segments`);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function main() {
  ensureDir(outputPath);
  const raw = readFileSync(scriptPath, "utf8");
  const segments = buildSegments(raw);

  const textSegments = segments.filter((s): s is { type: "text"; text: string } => s.type === "text");
  console.log(`Parsed ${segments.length} segments (${textSegments.length} speech, ${segments.length - textSegments.length} pauses).`);

  const generatedAudio = await mapWithConcurrency(textSegments, TTS_CONCURRENCY, (segment) =>
    generateSpeechForText(segment.text),
  );

  const audioChunks: Float32Array[] = [];
  let textIndex = 0;
  for (const segment of segments) {
    if (segment.type === "text") {
      audioChunks.push(generatedAudio[textIndex]);
      textIndex += 1;
    } else {
      audioChunks.push(silenceSamples(segment.ms));
    }
  }

  const voice = normalizeVoiceOnlyEpisode(concatSamples(audioChunks));
  writeFileSync(outputPath, encodeMp3(voice));
  console.log(`Wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
