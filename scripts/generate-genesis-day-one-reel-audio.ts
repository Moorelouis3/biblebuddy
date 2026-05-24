import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createContext, runInContext } from "vm";
import { GENESIS_ONE_TTS_VOICE } from "../lib/genesisOneTtsAudio";
import { cleanTextForTts } from "../lib/ttsSpeechText";

const SAMPLE_RATE = 24000;
const MP3_KBPS = 96;
const BREAK_SECONDS = 30;

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const reels = [
  `Why did God create light first?

In Genesis 1 verse 3, the Bible says:

God said, Let there be light, and there was light.

That sounds simple, but it is one of the most powerful moments in the whole Bible.

Before there was light, Genesis says the earth was formless, empty, and covered in darkness.

And God does not panic.

He does not fight the darkness.

He does not explain Himself to the darkness.

He simply speaks.

And the first thing His voice brings into the story is light.

That matters because some of us know what it feels like to be in a dark place.

Confused.

Empty.

Overwhelmed.

Unsure what comes next.

But Genesis 1 reminds us that darkness is not stronger than God's voice.

When God speaks, light comes.

Order comes.

Life begins.

So if your life feels dark right now, do not believe the darkness is the end of the story.

God still speaks into dark places.

And when He speaks, light has to answer.`,
  `God made you that way.

In Genesis 1 verse 26, God says:

Let's make man in our image, after our likeness.

That means you were not created by accident.

And I know sometimes you may look at your life and only see what you would change.

Your past.

Your mistakes.

The things you did.

The things that happened to you.

The parts of yourself you wish were different.

But before the Bible ever talks about your failure, it talks about your value.

You were made in the image of God.

When God made the lights, He gave them a purpose.

When God made the trees, He placed seeds inside them so fruit could keep growing again and again.

God put thought into everything He created.

So if God cared that much about the fruit on a tree, imagine how much thought He put into you.

You are not random.

You are not worthless.

You are not too broken to matter.

You were made with purpose.

You were made with dignity.

You were made to reflect something about God in the world.

So stop calling yourself a mistake when God calls you His image.`,
];

const outputPath = join(process.cwd(), "tmp", "genesis-day-one-reels", "genesis-1-2-two-reels-30s-gap.mp3");

function clamp(value: number) {
  return Math.max(-1, Math.min(1, value));
}

function pcmBufferToFloat32(buffer: Buffer) {
  const samples = new Float32Array(Math.floor(buffer.length / 2));
  for (let i = 0; i < samples.length; i += 1) samples[i] = buffer.readInt16LE(i * 2) / 32768;
  return samples;
}

function silenceSamples(seconds: number) {
  return new Float32Array(Math.max(0, Math.round(seconds * SAMPLE_RATE)));
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
      input: cleanTextForTts(text),
      instructions:
        "Speak in a deep, warm, older male narrator voice. Sound calm, soulful, cinematic, reflective, and comforting. This is for short Christian reels, so keep it intimate, clear, emotionally grounded, and not rushed. Read the Bible verse reverently, then teach conversationally. Do not sound robotic, theatrical, salesy, or like a loud preacher.",
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
  const pieces: Float32Array[] = [];
  for (const [index, reel] of reels.entries()) {
    console.log(`[GENESIS_REELS] Generating reel ${index + 1}/${reels.length}`);
    pieces.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(reel)));
    if (index < reels.length - 1) pieces.push(silenceSamples(BREAK_SECONDS));
  }

  const normalized = normalizeVoiceOnlyEpisode(concatSamples(pieces));
  const mp3 = encodeMp3(normalized);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, mp3);
  console.log(`[GENESIS_REELS] MP3: ${outputPath}`);
}

main().catch((error) => {
  console.error("[GENESIS_REELS] Failed:", error);
  process.exit(1);
});
