import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createContext, runInContext } from "vm";
import { GENESIS_ONE_TTS_VOICE } from "../lib/genesisOneTtsAudio";
import { cleanTextForTts } from "../lib/ttsSpeechText";

const SAMPLE_RATE = 24000;
const MP3_KBPS = 96;
const BREAK_SECONDS = 12;

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const scripts = [
  `2 Bible verses to fight anxiety.

Verse number 1. Philippians 4 verses 6 through 7.

In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God.

And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.

God is not telling you to pretend nothing is wrong.

He is inviting you to bring what is heavy to Him.

And His peace can guard the places anxiety keeps attacking.

Verse number 2. 1 Peter 5 verse 7.

Casting all your worries on him, because he cares for you.

You are not annoying God with your worries.

He cares enough to carry what is too heavy for you.

So take a breath.

You are not alone.

God is near.`,
  `3 Bible verses that will calm a racing mind.

Verse number 1. Isaiah 26 verse 3.

You will keep whoever's mind is steadfast in perfect peace, because he trusts in you.

Peace does not always begin when the situation changes.

Sometimes peace begins when your mind turns back to God.

Verse number 2. Psalm 94 verse 19.

When my thoughts were many within me, your comforts delight my soul.

God is not shocked by a crowded mind.

He meets you right in the middle of all those thoughts with comfort.

Verse number 3. John 14 verse 27.

Peace I leave with you. My peace I give to you; not as the world gives, I give to you.

Don't let your heart be troubled, neither let it be fearful.

Jesus gives a peace that is deeper than circumstances.

So breathe slowly.

Fear does not get the final word.`,
  `5 Bible verses for when anxiety feels too heavy.

Verse number 1. Philippians 4 verses 6 through 7.

In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God.

And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.

This verse gives your anxiety somewhere to go.

Prayer becomes the place where you stop carrying everything alone.

Verse number 2. 1 Peter 5 verse 7.

Casting all your worries on him, because he cares for you.

God is not distant from what is bothering you.

If it is heavy on your heart, it matters to Him.

Verse number 3. Isaiah 26 verse 3.

You will keep whoever's mind is steadfast in perfect peace, because he trusts in you.

A steady mind does not mean a perfect life.

It means your thoughts keep coming back to the One who holds you.

Verse number 4. Psalm 94 verse 19.

When my thoughts were many within me, your comforts delight my soul.

God knows what it feels like when your thoughts multiply.

His comfort can meet you inside the noise, not just after the noise is gone.

Verse number 5. John 14 verse 27.

Peace I leave with you. My peace I give to you; not as the world gives, I give to you.

Don't let your heart be troubled, neither let it be fearful.

Jesus gives a peace the world cannot manufacture.

The world says peace comes when everything is fixed, but Jesus can give peace while He is still walking with you through it.

So take one slow breath.

You do not have to solve your whole life tonight.

Give God the worry in front of you.

He cares for you.

He is with you.

And His peace can guard your heart and your mind.`,
];

const outputPath = join(process.cwd(), "tmp", "bible-topics", "anxiety", "reels", "anxiety-3-reel-scripts-with-breaks.mp3");

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
        "Speak in a deep, warm, older male narrator voice. Sound calm, soulful, cinematic, reflective, and comforting. This is for short Christian reels about anxiety and calming the mind, so keep it intimate, clear, emotionally grounded, and not rushed. Read each verse reverently. Say verse numbers clearly. Do not sound robotic, theatrical, salesy, or like a loud preacher.",
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
  for (const [index, script] of scripts.entries()) {
    console.log(`[ANXIETY_REELS] Generating script ${index + 1}/${scripts.length}`);
    pieces.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(script)));
    if (index < scripts.length - 1) pieces.push(silenceSamples(BREAK_SECONDS));
  }

  const normalized = normalizeVoiceOnlyEpisode(concatSamples(pieces));
  const mp3 = encodeMp3(normalized);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, mp3);
  console.log(`[ANXIETY_REELS] MP3: ${outputPath}`);
}

main().catch((error) => {
  console.error("[ANXIETY_REELS] Failed:", error);
  process.exit(1);
});
