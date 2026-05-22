import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createContext, runInContext } from "vm";
import { GENESIS_ONE_TTS_VOICE } from "../lib/genesisOneTtsAudio";
import { cleanTextForTts } from "../lib/ttsSpeechText";

const SAMPLE_RATE = 24000;
const MP3_KBPS = 96;

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const script = `
Matthew chapter 5, verse 13.

Jesus says:

"You are the salt of the earth. But if the salt loses its flavor, how shall it be seasoned again? It is then good for nothing except to be thrown out and trampled under people's feet."

Now when we hear that today, most people just think of table salt.

Something you throw onto food to make it taste better.

But the people listening to Jesus would have understood something much deeper immediately.

Because back then, salt was not cheap like it is today.

And salt did more than just make food taste better.

For example, back in the ancient world, they did not have refrigerators.

So when people needed meat to last longer, they would rub salt into it.

The salt would pull moisture out and slow down decay.

Without salt, things spoiled quickly.

So when Jesus says:

"You are the salt of the earth..."

He is saying believers are supposed to preserve what is good in a world slowly decaying morally and spiritually.

But salt also meant something else in Jesus' time.

Roman soldiers were sometimes paid with salt.

That is where we get the word salary from.

Salt had value.

It was precious.

And salt was also connected to purity.

It was used in sacrifices and offerings because it represented something clean.

Something set apart.

So Jesus is not just calling believers seasoning.

He is saying:

You bring preservation into a corrupt world.

You bring value.

You are meant to live differently.

And then Jesus gives the warning:

"If the salt loses its flavor... what good is it?"

In other words, if believers stop living differently from the world around them, they lose the very thing that makes them impactful.

And this is why understanding the context of Scripture matters.

Because one verse becomes so much deeper when you understand the world Jesus was speaking into.

Check out my Bible Buddy dot net.
`;

const outputPath = join(process.cwd(), "tmp", "bible-topics", "reels", "matthew-5-13-salt-of-the-earth-narrator.mp3");

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
        "Speak in a calm, warm, steady male Bible study narrator voice. Keep the tone peaceful, reflective, clear, and emotionally grounded. Start calm but strong. Use natural pauses, gentle emphasis, and a short-video pacing. Do not sound rushed, robotic, theatrical, salesy, or like a loud preacher.",
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
  console.log("[MATTHEW_5_13] Generating narrator-only audio");
  const voice = pcmBufferToFloat32(await generateOpenAiSpeechPcm(script));
  const normalized = normalizeVoiceOnlyEpisode(voice);
  const mp3 = encodeMp3(normalized);
  ensureDir(outputPath);
  writeFileSync(outputPath, mp3);
  console.log(`[MATTHEW_5_13] Local narrator-only MP3: ${outputPath}`);
  console.log("[MATTHEW_5_13] Done");
}

main().catch((error) => {
  console.error("[MATTHEW_5_13] Failed:", error);
  process.exit(1);
});
