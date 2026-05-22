import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createContext, runInContext } from "vm";
import { GENESIS_ONE_TTS_VOICE } from "../lib/genesisOneTtsAudio";
import { cleanTextForTts } from "../lib/ttsSpeechText";

const SAMPLE_RATE = 24000;
const MP3_KBPS = 96;
const BREAK_SECONDS = 15;

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const reels = [
  `Philippians 4 verses 6 to 7.

In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God will guard your hearts and your thoughts in Christ Jesus.

Paul wrote this while he was in prison.

So when he talks about peace, he is not talking about a perfect life. He is talking about peace in pressure.

That word guard is powerful. It means God's peace stands watch over your heart and your thoughts.

Anxiety tells you to replay everything.

God invites you to pray everything.

So today, take the thought that keeps looping in your mind and turn it into a request.

God, help me here.

God, give me wisdom.

God, guard my mind.

You do not have to carry it alone.

For more guided Bible lessons like this, sign up free at my Bible Buddy dot net.`,
  `Matthew 6 verse 34.

Therefore don't be anxious for tomorrow, for tomorrow will be anxious for itself. Each day's own evil is sufficient.

Jesus said this in the Sermon on the Mount.

He was talking to ordinary people worried about food, clothing, money, and the future.

So this is not a verse for people with easy lives. It is a verse for people trying to carry too much at once.

Jesus is not saying tomorrow does not matter.

He is saying tomorrow does not get to own today.

Anxiety makes you live through future pain before it even arrives.

But God gives grace for the day you are in.

So ask yourself: what is one faithful step I can take today?

Not next month.

Not the whole future.

Today.

For more simple Bible breakdowns, sign up free at my Bible Buddy dot net.`,
  `First Peter 5 verse 7.

Casting all your worries on him, because he cares for you.

Peter wrote this to Christians under pressure.

They were suffering, tired, and trying to stay faithful in a hard world.

And he does not say, hide your worries.

He says, cast them.

That means place the weight somewhere else.

All your worries.

Not just the spiritual sounding ones.

Not just the ones you can explain cleanly.

The messy ones too.

And the reason is beautiful: because He cares for you.

You are not annoying God by bringing Him the same fear again.

You are responding to His invitation.

So today, name one worry and hand it to Him honestly.

For more guided Bible lessons, sign up free at my Bible Buddy dot net.`,
];

const outputPath = join(process.cwd(), "tmp", "bible-topics", "anxiety", "reels", "peace-of-mind-3-reels-narrator-only.mp3");

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
        "Speak in a deep, warm, older male narrator voice. Sound calm, soulful, cinematic, reflective, and comforting. This is for short Christian reels about anxiety, so keep it intimate, clear, and emotionally grounded. Read the Bible verse reverently, then teach conversationally. Do not sound rushed, robotic, theatrical, salesy, or like a loud preacher.",
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
    console.log(`[BIBLE_TOPIC_REELS] Generating reel ${index + 1}/${reels.length}`);
    pieces.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(reel)));
    if (index < reels.length - 1) pieces.push(silenceSamples(BREAK_SECONDS));
  }

  const normalized = normalizeVoiceOnlyEpisode(concatSamples(pieces));
  const mp3 = encodeMp3(normalized);
  ensureDir(outputPath);
  writeFileSync(outputPath, mp3);
  console.log(`[BIBLE_TOPIC_REELS] Local narrator-only MP3: ${outputPath}`);
  console.log("[BIBLE_TOPIC_REELS] Done");
}

main().catch((error) => {
  console.error("[BIBLE_TOPIC_REELS] Failed:", error);
  process.exit(1);
});
