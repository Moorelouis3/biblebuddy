import { config } from "dotenv";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import {
  createGenesisOneTtsAdminClient,
  GENESIS_ONE_TTS_KINDS,
  GENESIS_ONE_TTS_VOICE,
  getGenesisOneSpeechText,
} from "../lib/genesisOneTtsAudio";
import type { GenesisOneTtsKind } from "../lib/genesisOneTts";

const SAMPLE_RATE = 24000;
const OUTPUT_DIR = join(process.cwd(), "public", "audio", "genesis", "1");
const MAX_TTS_CHUNK_LENGTH = 3400;

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

function ensureDir(path: string) {
  mkdirSync(dirname(path), { recursive: true });
}

function clamp(value: number) {
  return Math.max(-1, Math.min(1, value));
}

function createWavBuffer(samples: Float32Array, sampleRate = SAMPLE_RATE) {
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples.length; i += 1) {
    buffer.writeInt16LE(Math.round(clamp(samples[i]) * 32767), 44 + i * 2);
  }

  return buffer;
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

function seededNoise(seedStart = 777) {
  let seed = seedStart;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967295;
  };
}

function chordFrequency(root: number, semitone: number) {
  return root * 2 ** (semitone / 12);
}

function synthesizePeacefulBed(sampleCount: number) {
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
    const rain = rainState * 0.22 + drop * 0.045;

    bed[i] = music * 0.075 + rain * 0.075;
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
        "Speak in a calm, warm, steady male Bible study narrator voice. Keep the tone peaceful, reverent, clear, and emotionally grounded. Use a gentle pace with natural pauses.",
      response_format: "pcm",
    }),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "OpenAI TTS failed.");
    throw new Error(message || "OpenAI TTS failed.");
  }

  return Buffer.from(await response.arrayBuffer());
}

async function generateKind(kind: GenesisOneTtsKind) {
  const supabase = createGenesisOneTtsAdminClient();
  if (!supabase) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");

  const text = await getGenesisOneSpeechText(kind, supabase);
  const chunks = chunkSpeechInput(text);
  const voiceChunks: Float32Array[] = [];

  console.log(`[GENESIS_1_PEACEFUL] Generating ${kind}. Text chars: ${text.length}, chunks: ${chunks.length}`);
  for (const [index, chunk] of chunks.entries()) {
    console.log(`[GENESIS_1_PEACEFUL] ${kind} chunk ${index + 1}/${chunks.length}`);
    voiceChunks.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(chunk)));
  }

  const voiceSamples = concatSamples(voiceChunks);
  const peacefulSamples = mixVoiceWithBed(voiceSamples);
  const peacefulPath = join(OUTPUT_DIR, `${kind}-${GENESIS_ONE_TTS_VOICE}-peaceful-rain-cinematic.wav`);
  ensureDir(peacefulPath);
  writeFileSync(peacefulPath, createWavBuffer(peacefulSamples));
  console.log(`[GENESIS_1_PEACEFUL] Peaceful WAV: ${peacefulPath}`);
}

async function main() {
  const requestedKinds = process.argv
    .slice(2)
    .filter((arg) => !arg.startsWith("--")) as GenesisOneTtsKind[];
  const kinds = requestedKinds.length > 0 ? requestedKinds : GENESIS_ONE_TTS_KINDS;

  for (const kind of kinds) {
    if (!GENESIS_ONE_TTS_KINDS.includes(kind)) {
      throw new Error(`Invalid Genesis 1 TTS kind: ${kind}`);
    }
    await generateKind(kind);
  }
}

main().catch((error) => {
  console.error("[GENESIS_1_PEACEFUL] Failed:", error);
  process.exit(1);
});
