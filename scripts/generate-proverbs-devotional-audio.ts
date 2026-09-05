/**
 * Pre-generate the Wisdom of Proverbs day audio (2026-09-05): OpenAI TTS
 * narration of each day's devotional text with the same peaceful music bed
 * the Bible in One Year days use, uploaded to the exact cache path that
 * /api/tts/devotional-overview serves - so Play starts instantly with the
 * music already mixed in.
 *
 *   npx tsx scripts/generate-proverbs-devotional-audio.ts [--day=N] [--force]
 *
 * Without --day it runs all 31 days, skipping days whose cache file already
 * exists (pass --force to regenerate).
 */
import { config } from "dotenv";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { createContext, runInContext } from "vm";
import {
  createDevotionalOverviewTtsAdminClient,
  DEVOTIONAL_OVERVIEW_TTS_BUCKET,
  getDevotionalOverviewSpeechText,
  getDevotionalOverviewTtsPath,
} from "../lib/devotionalOverviewTtsAudio";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const DEVOTIONAL_ID = "c0ca300a-c0e9-47b8-84c5-99aca743a203";
const SAMPLE_RATE = 24000;
const MAX_TTS_CHUNK_LENGTH = 3400;
const MP3_KBPS = 96;
const AMBIENCE_GAIN = 0.088;

const onlyDay = Number(process.argv.find((arg) => arg.startsWith("--day="))?.split("=")[1] || "0");
const force = process.argv.includes("--force");

const NARRATOR_INSTRUCTIONS =
  "Speak in a deep, warm, older male narrator voice. Sound soulful, calm, grounded, cinematic, and wise, like an audio Bible study companion with documentary pacing. Let Scripture quotes feel reverent and spacious, then make the teaching conversational, connected, and emotionally clear. Keep the tone reflective, comforting, and weighty without sounding like a sermon. Do not read markdown, headings, emojis, bullets, or formatting labels. Do not sound robotic, theatrical, rushed, salesy, or overly polished.";

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
      voice: "onyx",
      input: text,
      instructions: NARRATOR_INSTRUCTIONS,
      response_format: "pcm",
    }),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "OpenAI TTS failed.");
    throw new Error(message || "OpenAI TTS failed.");
  }

  return Buffer.from(await response.arrayBuffer());
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

// The same peaceful pad-and-rain bed the Bible in One Year days use.
function synthesizePeacefulBed(sampleCount: number, ambienceGain = AMBIENCE_GAIN) {
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
    const texture = rainState * 0.22 + drop * 0.045;

    bed[i] = music * ambienceGain + texture * ambienceGain;
  }

  return bed;
}

function mixVoiceWithBed(voice: Float32Array) {
  const tailSamples = SAMPLE_RATE * 2;
  const outputLength = voice.length + tailSamples;
  const bed = synthesizePeacefulBed(outputLength);
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

function getMp3EncoderClass() {
  const bundlePath = join(process.cwd(), "node_modules", "lamejs", "lame.all.js");
  const context = {} as { lamejs?: { Mp3Encoder?: new (channels: number, sampleRate: number, kbps: number) => any } };
  runInContext(readFileSync(bundlePath, "utf8"), createContext(context));
  const Mp3Encoder = context.lamejs?.Mp3Encoder;
  if (!Mp3Encoder) throw new Error("Could not initialize lamejs MP3 encoder.");
  return Mp3Encoder;
}

function encodeMp3(samples: Float32Array) {
  const Mp3Encoder = getMp3EncoderClass();
  const encoder = new Mp3Encoder(1, SAMPLE_RATE, MP3_KBPS);
  const blockSize = 1152;
  const parts: Buffer[] = [];

  for (let i = 0; i < samples.length; i += blockSize) {
    const block = samples.subarray(i, i + blockSize);
    const pcm = new Int16Array(block.length);
    for (let j = 0; j < block.length; j += 1) {
      pcm[j] = Math.round(clamp(block[j]) * 32767);
    }
    const encoded = encoder.encodeBuffer(pcm);
    if (encoded.length > 0) parts.push(Buffer.from(encoded));
  }

  const flushed = encoder.flush();
  if (flushed.length > 0) parts.push(Buffer.from(flushed));
  return Buffer.concat(parts);
}

async function main() {
  const supabase = createDevotionalOverviewTtsAdminClient();
  if (!supabase) throw new Error("Missing Supabase env.");

  const days = onlyDay ? [onlyDay] : Array.from({ length: 31 }, (_, i) => i + 1);

  for (const day of days) {
    const text = await getDevotionalOverviewSpeechText(DEVOTIONAL_ID, day, supabase);
    const path = getDevotionalOverviewTtsPath(DEVOTIONAL_ID, day, text);

    if (!force) {
      const { data } = await supabase.storage.from(DEVOTIONAL_OVERVIEW_TTS_BUCKET).download(path);
      if (data) {
        console.log(`Day ${day}: already cached (${path}), skipping.`);
        continue;
      }
    }

    console.log(`Day ${day}: generating speech for ${text.length} chars...`);
    const chunks = chunkSpeechInput(text);
    const voiceParts: Float32Array[] = [];
    for (const chunk of chunks) {
      voiceParts.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(chunk)));
    }
    const totalVoice = voiceParts.reduce((sum, part) => sum + part.length, 0);
    const voice = new Float32Array(totalVoice);
    let offset = 0;
    for (const part of voiceParts) {
      voice.set(part, offset);
      offset += part.length;
    }

    const mixed = mixVoiceWithBed(voice);
    const mp3 = encodeMp3(mixed);

    const upload = await supabase.storage.from(DEVOTIONAL_OVERVIEW_TTS_BUCKET).upload(path, mp3, {
      contentType: "audio/mpeg",
      upsert: true,
    });
    if (upload.error) throw new Error(`Day ${day} upload failed: ${upload.error.message}`);

    const minutes = (mixed.length / SAMPLE_RATE / 60).toFixed(1);
    console.log(`Day ${day}: uploaded ${path} (${(mp3.length / 1024 / 1024).toFixed(1)} MB, ~${minutes} min)`);
  }

  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
