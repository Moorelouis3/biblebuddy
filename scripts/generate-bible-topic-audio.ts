import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createContext, runInContext } from "vm";
import { BIBLE_TOPICS, getBibleTopicLesson } from "../lib/bibleTopics";
import { GENESIS_ONE_TTS_VOICE } from "../lib/genesisOneTtsAudio";
import { cleanTextForTts } from "../lib/ttsSpeechText";

const SAMPLE_RATE = 24000;
const MAX_TTS_CHUNK_LENGTH = 3400;
const MP3_KBPS = 96;

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

function getArg(name: string, fallback: string) {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length) || process.env[`BIBLE_TOPIC_${name.toUpperCase()}`] || fallback;
}

const topicSlug = getArg("topic", "anxiety");
const lessonSlug = getArg("lesson", "7-bible-verses-for-peace-of-mind");
const selectedTopic = BIBLE_TOPICS.find((item) => item.slug === topicSlug);
const selectedLesson = getBibleTopicLesson(topicSlug, lessonSlug);

if (!selectedTopic || !selectedLesson) {
  throw new Error(`Bible Topic lesson not found: ${topicSlug}/${lessonSlug}`);
}

const topic = selectedTopic;
const lesson = selectedLesson;
const outputPath = join(process.cwd(), "tmp", "bible-topics", topic.slug, lesson.slug, `${lesson.slug}-narrator-only.mp3`);

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

function buildSpeechText() {
  return cleanTextForTts(lesson.transcript)
    .replace(/\bBible Topics\s*:\s*/gi, "Bible Topics. ")
    .replace(/\bVerse\s+\d+\b\.?/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
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
      input: text,
      instructions:
        "Speak in a deep, warm, older male narrator voice. Sound soulful, calm, grounded, cinematic, comforting, and wise. Use the pacing of a guided devotional and trusted Bible teacher. Keep the tone reflective and emotionally steady for someone dealing with anxiety or racing thoughts. Read Scripture with reverent spaciousness. Do not read markdown, headings, emojis, bullets, formatting labels, or URLs awkwardly. Keep transitions conversational. Do not sound robotic, theatrical, rushed, salesy, or overly polished.",
      response_format: "pcm",
    }),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "OpenAI TTS failed.");
    throw new Error(message || "OpenAI TTS failed.");
  }

  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const text = buildSpeechText();
  const chunks = chunkSpeechInput(text);
  const voiceChunks: Float32Array[] = [];

  console.log(`[BIBLE_TOPIC:${topic.slug}/${lesson.slug}] Text chars: ${text.length}, chunks: ${chunks.length}`);
  for (const [index, chunk] of chunks.entries()) {
    console.log(`[BIBLE_TOPIC:${topic.slug}/${lesson.slug}] Generating narrator chunk ${index + 1}/${chunks.length}`);
    voiceChunks.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(chunk)));
  }

  const voiceTrack = concatSamples(voiceChunks);
  const normalized = normalizeVoiceOnlyEpisode(voiceTrack);
  const mp3 = encodeMp3(normalized);
  ensureDir(outputPath);
  writeFileSync(outputPath, mp3);

  console.log(`[BIBLE_TOPIC:${topic.slug}/${lesson.slug}] Local narrator-only MP3: ${outputPath}`);
  console.log(`[BIBLE_TOPIC:${topic.slug}/${lesson.slug}] Done`);
}

main().catch((error) => {
  console.error(`[BIBLE_TOPIC:${topic.slug}/${lesson.slug}] Failed:`, error);
  process.exit(1);
});
