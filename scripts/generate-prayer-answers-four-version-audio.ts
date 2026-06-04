import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createContext, runInContext } from "vm";
import { GENESIS_ONE_TTS_VOICE } from "../lib/genesisOneTtsAudio";
import { cleanTextForTts } from "../lib/ttsSpeechText";

const SAMPLE_RATE = 24000;
const MAX_TTS_CHUNK_LENGTH = 3300;
const MP3_KBPS = 96;
const PAUSE_SECONDS = 30;

const INPUT_PATH = join(process.cwd(), "docs", "7-signs-god-answering-prayers-four-version-recording-script.md");
const OUTPUT_PATH = join(process.cwd(), "tmp", "prayer-answers", "7-signs-god-answering-prayers-four-versions-narration.mp3");
const VERSION_ONE_OUTPUT_PATH = join(process.cwd(), "tmp", "prayer-answers", "7-signs-god-answering-your-prayers-narrator-clean.mp3");
const CLEANED_SCRIPT_PATH = join(process.cwd(), "tmp", "prayer-answers", "7-signs-god-answering-prayers-four-versions-narrator-clean.txt");
const VERSION_ONE_CLEANED_SCRIPT_PATH = join(process.cwd(), "tmp", "prayer-answers", "7-signs-god-answering-your-prayers-narrator-clean.txt");

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

function silence(seconds: number) {
  return new Float32Array(Math.round(SAMPLE_RATE * seconds));
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

function numberWord(value: string) {
  const words: Record<string, string> = {
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
  };
  return words[value] || value;
}

function normalizeHeading(line: string) {
  return line.replace(/^#{1,6}\s*/, "").trim();
}

function isDocumentOnlyLine(line: string) {
  const heading = normalizeHeading(line);
  if (!heading) return true;
  if (heading === "---") return true;
  if (/^Long Form Audio/i.test(heading)) return true;
  if (/^Bible Study with Louis Style/i.test(heading)) return true;
  if (/^Four Version MP3/i.test(heading)) return true;
  if (/^Recording order:/i.test(heading)) return true;
  if (/^\d+\.\s/.test(heading)) return true;
  if (/^Pause silently/i.test(heading)) return true;
  if (/^30 SECOND PAUSE/i.test(heading)) return true;
  if (/^VERSION\s+\d+/i.test(heading)) return true;
  if (/^INTRO$/i.test(heading)) return true;
  if (/^OUTRO$/i.test(heading)) return true;
  if (/^(?:5|7)\s+(?:Signs|Ways)\s+God\s+(?:Is\s+)?Answer/i.test(heading)) return true;
  return false;
}

function findNextSpeechHeading(lines: string[], startIndex: number) {
  for (let i = startIndex; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line) continue;
    if (!/^#{1,6}\s+/.test(line)) return null;
    const heading = normalizeHeading(line);
    if (isDocumentOnlyLine(heading)) continue;
    return { heading, index: i };
  }
  return null;
}

function sectionToSpeechText(section: string) {
  const lines = section.replace(/\r\n/g, "\n").split("\n");
  const spokenLines: string[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line || line === "---") continue;

    const heading = normalizeHeading(line);
    const signOrWayMatch = heading.match(/^(SIGN|WAY)\s+(\d+)$/i);
    if (signOrWayMatch) {
      const nextHeading = findNextSpeechHeading(lines, i + 1);
      const label = signOrWayMatch[1].toLowerCase() === "sign" ? "Sign" : "Way";
      if (nextHeading) {
        spokenLines.push(`${label} number ${numberWord(signOrWayMatch[2])}: ${nextHeading.heading}.`);
        i = nextHeading.index;
      } else {
        spokenLines.push(`${label} number ${numberWord(signOrWayMatch[2])}.`);
      }
      continue;
    }

    if (isDocumentOnlyLine(line)) continue;

    if (/^#{1,6}\s+/.test(line)) {
      spokenLines.push(`${heading}.`);
      continue;
    }

    spokenLines.push(line);
  }

  return cleanTextForTts(spokenLines.join("\n\n")).replace(/\s+/g, " ").trim();
}

function buildSpeechSections() {
  const markdown = readFileSync(INPUT_PATH, "utf8").replace(/\r\n/g, "\n");
  const sections: Array<{ label: string; text: string }> = [];
  const versionMatches = Array.from(markdown.matchAll(/^## VERSION \d$/gm));

  for (let i = 0; i < versionMatches.length; i += 1) {
    const match = versionMatches[i];
    const start = match.index || 0;
    const end = i < versionMatches.length - 1 ? versionMatches[i + 1].index || markdown.length : markdown.length;
    const rawSection = markdown.slice(start, end);
    const label = match[0].replace(/^##\s*/, "");
    const text = sectionToSpeechText(rawSection);
    if (text) sections.push({ label, text });
  }

  if (sections.length !== 4) {
    throw new Error(`Expected 4 script versions, found ${sections.length}.`);
  }

  ensureDir(CLEANED_SCRIPT_PATH);
  writeFileSync(CLEANED_SCRIPT_PATH, sections.map((section) => section.text).join("\n\n[30 second pause]\n\n"));

  return sections;
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
        "Speak in a deep, warm, older male narrator voice. Sound like late night Christian narration: calm, cinematic, emotionally grounded, peaceful, reflective, and wise. Use natural pauses and a slow, comforting pace for people who feel spiritually exhausted or forgotten. Read Scripture reverently. Say mybiblebuddy.net clearly but naturally. Do not sound robotic, theatrical, rushed, salesy, or like a loud preacher.",
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
  const allSections = buildSpeechSections();
  const renderVersionOneOnly = process.env.PRAYER_ANSWERS_VERSION === "1";
  const sections = renderVersionOneOnly ? allSections.slice(0, 1) : allSections;
  const outputPath = renderVersionOneOnly ? VERSION_ONE_OUTPUT_PATH : OUTPUT_PATH;
  if (renderVersionOneOnly) {
    ensureDir(VERSION_ONE_CLEANED_SCRIPT_PATH);
    writeFileSync(VERSION_ONE_CLEANED_SCRIPT_PATH, sections[0].text);
  }
  const renderedSections: Float32Array[] = [];

  console.log(`[PRAYER_ANSWERS_TTS] Sections: ${sections.length}`);
  for (const [sectionIndex, section] of sections.entries()) {
    const chunks = chunkSpeechInput(section.text);
    const voiceChunks: Float32Array[] = [];
    console.log(`[PRAYER_ANSWERS_TTS] ${section.label}: ${section.text.length} chars, ${chunks.length} chunks`);

    for (const [chunkIndex, chunk] of chunks.entries()) {
      console.log(`[PRAYER_ANSWERS_TTS] Generating ${section.label} chunk ${chunkIndex + 1}/${chunks.length}`);
      voiceChunks.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(chunk)));
    }

    renderedSections.push(normalizeVoiceOnlyEpisode(concatSamples(voiceChunks)));
    if (sectionIndex < sections.length - 1) {
      console.log(`[PRAYER_ANSWERS_TTS] Adding ${PAUSE_SECONDS}s pause after ${section.label}`);
      renderedSections.push(silence(PAUSE_SECONDS));
    }
  }

  const mp3 = encodeMp3(concatSamples(renderedSections));
  ensureDir(outputPath);
  writeFileSync(outputPath, mp3);

  console.log(`[PRAYER_ANSWERS_TTS] MP3 saved: ${outputPath}`);
  console.log("[PRAYER_ANSWERS_TTS] Done");
}

main().catch((error) => {
  console.error("[PRAYER_ANSWERS_TTS] Failed:", error);
  process.exit(1);
});
