import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createContext, runInContext } from "vm";
import { createClient } from "@supabase/supabase-js";
import { BIBLE_YEAR_AUDIO_BUCKET, BIBLE_YEAR_DAY_ONE_AUDIO } from "../lib/bibleYearAudio";
import { GENESIS_CREATION_WEB_VERSES } from "../lib/creationOfWorldDeepNotes";
import { GENESIS_DAY_ONE_CREATION_LESSON } from "../lib/bibleYearDailyLessons";
import { GENESIS_ONE_TTS_VOICE } from "../lib/genesisOneTtsAudio";
import { cleanTextForTts } from "../lib/ttsSpeechText";

const SAMPLE_RATE = 24000;
const MAX_TTS_CHUNK_LENGTH = 3400;
const MP3_KBPS = 96;
const OUTPUT_PATH = join(process.cwd(), "tmp", "bible-in-one-year", "day-001", "day-001-audio.mp3");

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

function ensureDir(path: string) {
  mkdirSync(dirname(path), { recursive: true });
}

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

    bed[i] = music * 0.088 + rain * 0.088;
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
    for (let j = 0; j < block.length; j += 1) {
      pcm[j] = Math.round(clamp(block[j]) * 32767);
    }
    const encoded = encoder.encodeBuffer(pcm);
    if (encoded.length > 0) mp3Chunks.push(Buffer.from(encoded));
  }

  const flushed = encoder.flush();
  if (flushed.length > 0) mp3Chunks.push(Buffer.from(flushed));
  return Buffer.concat(mp3Chunks);
}

function getVerses(chapter: number, startVerse: number, endVerse: number) {
  return (GENESIS_CREATION_WEB_VERSES[chapter] || []).filter((verse) => verse.verse >= startVerse && verse.verse <= endVerse);
}

function speakReference(chapter: number, startVerse: number, endVerse: number) {
  if (startVerse === endVerse) return `Genesis ${chapter} verse ${startVerse}.`;
  return `Genesis ${chapter} verses ${startVerse} through ${endVerse}.`;
}

function buildDayOneSpeechText() {
  const teachingByReference: Record<string, string[]> = {
    "Genesis 1:1-5": [
      "The story starts with God already there. Not created. Not explained. Not fighting for control. Just God, Creator over everything.",
      "The heavens and the earth means the whole created order: everything above, everything below, everything visible, and everything humans will live inside. The first verse puts everything under God's authority.",
      "The earth is unshaped, unfilled, dark, and watery. But unfinished does not mean abandoned. Before the world looks complete, God's Spirit is already near.",
      "God says, Let there be light, and light comes. He does not fight the darkness. He speaks, and creation responds. Light appears before the sun and moon, so light comes from God, not from a sun god.",
      "God separates light from darkness and names Day and Night. Naming shows authority. Separation shows order. God is putting things where they belong.",
    ],
    "Genesis 1:6-13": [
      "To ancient readers, deep waters could feel like danger and chaos. Here, the waters do not rule themselves. God gives them boundaries.",
      "God gathers the seas and lets dry land appear. The world is becoming livable. Life needs a place, so God prepares a place.",
      "Plants, trees, fruit, and seeds fill the earth. The seed detail matters because God creates life that can keep producing life. Life can multiply. Food can be provided. The earth can sustain creatures. One generation can lead to another.",
    ],
    "Genesis 1:14-25": [
      "The sun and moon are not gods. They are lights in God's sky.",
      "The lights mark days, seasons, and years. God is making a world humans can live in, work in, rest in, and worship in. Seasons for planting and harvesting. Days and nights for work and rest. Years for memory and history. Appointed times for worship.",
      "God fills the waters, sky, and land with life. Creation is no longer empty. It is full, alive, layered, and blessed.",
    ],
    "Genesis 1:26-31": [
      "This is the high point of creation. Human beings are made in God's image. People are not accidents and not disposable.",
      "Male and female are both created in God's image. Human worth is not based on power, gender, money, beauty, success, or strength. Every person matters because every person is made by God.",
      "Dominion does not mean abuse. It means responsibility. Humans are called to care for God's world under God's authority. Every person has dignity. Every person has responsibility. Creation is entrusted to human care. Life is meant to reflect God's goodness.",
      "Before sin enters the story, creation is good, human life is good, and God's purpose for the world is good.",
    ],
    "Genesis 2:1-3": [
      "God does not leave creation half done. What He made has order, purpose, and goodness.",
      "God rests because the work is complete. Rest is built into creation before sin enters the world.",
      "God sets the seventh day apart. From the beginning, time with God can be holy. Time can be set apart. Rest belongs in human life. Worship grows from God's finished work. Creation has rhythm, not endless striving.",
    ],
    "Genesis 2:4-9": [
      "The lesson slows down and focuses on human life with God.",
      "God forms man from the dust. That is humbling. We are not gods. We are physical, dependent, and connected to God's world.",
      "But humanity is not only dust. God breathes life into the man. We are dust touched by God: humble, valuable, and dependent.",
      "God plants a garden and places the man there. He prepares a home before He gives a command. Eden is a picture of provision, beauty, purpose, and peace.",
    ],
    "Genesis 2:10-17": [
      "The garden is abundance. Water flows. Precious materials are named. Life near God is supplied.",
      "God gives the man work before sin enters the world. So work itself is not the curse. Meaningful responsibility is part of God's good design.",
      "God says the man may freely eat from every tree except one. God gives abundance, then sets one boundary.",
      "The tree introduces choice and trust. Will humanity trust God's word about life and death? Provision is generous. Boundaries are real. Obedience matters. Trust is part of life with God.",
    ],
    "Genesis 2:18-25": [
      "For the first time, God says something is not good. Sin has not entered yet. The problem is aloneness.",
      "The man names the animals, showing responsibility. But none of them can answer his loneliness. None is a suitable helper.",
      "Helper does not mean weak or lesser. The point is partnership, not inferiority. The man needs someone who corresponds to him.",
      "God makes woman from the man's side and brings her to him. The man's response is joy: bone of my bones and flesh of my flesh.",
      "Marriage is pictured as covenant closeness, loyalty, and shared life.",
      "The man and woman are naked and not ashamed. No hiding. No fear. No guilt. No pretending. Fully known. Fully welcomed. Joined in covenant love. Not yet covered by shame.",
    ],
  };

  const parts: string[] = [
    "Welcome to Day 1 of the Bible In One Year journey: The Creation of the World.",
    "Today we are walking through Genesis chapters 1 and 2 as one flowing story.",
    "The goal is simple. We are going to listen to the Scripture, pause along the way, and let the beginning of the Bible open up slowly and clearly.",
    "Genesis does not begin with human chaos at the center. It begins with God: already present, already powerful, already speaking.",
    "So take a breath. Let the story slow down. This is where the Bible begins.",
  ];

  for (const section of GENESIS_DAY_ONE_CREATION_LESSON.sections) {
    const block = section.verseBlock;
    const verses = getVerses(block.chapter, block.startVerse, block.endVerse);
    const scripture = verses.map((verse) => verse.text).join(" ");
    parts.push(`${speakReference(block.chapter, block.startVerse, block.endVerse)} ${scripture}`);
    parts.push(...(teachingByReference[block.reference] || section.teaching));
  }

  parts.push(
    "The Creation of the World shows us the world before the damage.",
    "God creates, speaks, orders, fills, blesses, rests, forms, breathes, plants, provides, commands, and creates relationship.",
    "Human life is not accidental. Work is not pointless. Rest is not optional. Relationship is not random.",
    "Everything begins with God's good design.",
    "We were made by God, in God's image, for life with God.",
    "Before we understand the fall, we need to understand creation.",
    "Before we understand redemption, we need to understand what God made humanity for.",
  );

  return cleanTextForTts(parts.join("\n\n"))
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
        "Speak in a deep, calm, warm male Bible teacher voice. Make it reflective, documentary-style, emotionally immersive, and modern. Announce each Scripture range naturally, for example: Genesis 1 verses 1 through 5. Do not announce every individual verse number. Do not read markdown, headings, emojis, bullets, or formatting labels. Keep the transitions conversational and give natural pauses between Scripture and explanation. Do not sound robotic, theatrical, or rushed.",
      response_format: "pcm",
    }),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "OpenAI TTS failed.");
    throw new Error(message || "OpenAI TTS failed.");
  }

  return Buffer.from(await response.arrayBuffer());
}

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function uploadAudio(audio: Buffer) {
  const supabase = createAdminClient();
  if (!supabase) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");

  await supabase.storage.createBucket(BIBLE_YEAR_AUDIO_BUCKET, { public: false }).catch(() => null);
  const upload = await supabase.storage.from(BIBLE_YEAR_AUDIO_BUCKET).upload(BIBLE_YEAR_DAY_ONE_AUDIO.storagePath, audio, {
    contentType: "audio/mpeg",
    upsert: true,
  });

  if (upload.error) throw new Error(upload.error.message);
}

async function main() {
  const text = buildDayOneSpeechText();
  const chunks = chunkSpeechInput(text);
  const voiceChunks: Float32Array[] = [];

  console.log(`[BIBLE_YEAR_DAY_001] Text chars: ${text.length}, chunks: ${chunks.length}`);
  for (const [index, chunk] of chunks.entries()) {
    console.log(`[BIBLE_YEAR_DAY_001] Generating chunk ${index + 1}/${chunks.length}`);
    voiceChunks.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(chunk)));
  }

  console.log("[BIBLE_YEAR_DAY_001] Mixing voice with peaceful ambience");
  const mixed = mixVoiceWithBed(concatSamples(voiceChunks));

  console.log("[BIBLE_YEAR_DAY_001] Encoding MP3");
  const mp3 = encodeMp3(mixed);
  ensureDir(OUTPUT_PATH);
  writeFileSync(OUTPUT_PATH, mp3);

  console.log(`[BIBLE_YEAR_DAY_001] Local MP3: ${OUTPUT_PATH}`);
  console.log(`[BIBLE_YEAR_DAY_001] Uploading to ${BIBLE_YEAR_AUDIO_BUCKET}/${BIBLE_YEAR_DAY_ONE_AUDIO.storagePath}`);
  await uploadAudio(mp3);
  console.log("[BIBLE_YEAR_DAY_001] Done");
}

main().catch((error) => {
  console.error("[BIBLE_YEAR_DAY_001] Failed:", error);
  process.exit(1);
});
