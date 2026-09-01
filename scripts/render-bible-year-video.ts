import { config } from "dotenv";
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";
const requireTs = createRequire(__filename);
import { join } from "path";
import ffmpegPath from "ffmpeg-static";
import { BIBLE_YEAR_SAMPLE_RATE as SR, type BibleYearAudioRole } from "../lib/bibleYearAudioCast";
import { buildDaySegments, type BibleYearDayScript } from "../lib/bibleYearDayScript";
import { buildDayOneSegments } from "../lib/bibleYearDayOneSegments";
import { GENESIS_DAY_ONE_CREATION_LESSON } from "../lib/bibleYearDailyLessons";
import { BIBLE_YEAR_DAY_TWO_SCRIPT } from "../lib/bibleYearDayTwoScript";
import {
  BIBLE_YEAR_DAY_FIVE_SCRIPT, BIBLE_YEAR_DAY_FOUR_SCRIPT,
  BIBLE_YEAR_DAY_SIX_SCRIPT, BIBLE_YEAR_DAY_THREE_SCRIPT,
} from "../lib/bibleYearDaysThreeToSixScripts";
import { BIBLE_YEAR_DAY_ELEVEN_SCRIPT } from "../lib/bibleYearDayElevenScript";
import {
  BIBLE_YEAR_DAY_EIGHT_SCRIPT, BIBLE_YEAR_DAY_NINE_SCRIPT,
  BIBLE_YEAR_DAY_SEVEN_SCRIPT, BIBLE_YEAR_DAY_TEN_SCRIPT,
} from "../lib/bibleYearDaysSevenToTenScripts";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const FFMPEG = ffmpegPath as unknown as string;

function arg(name: string, fallback?: string) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
}

const day = Number(arg("day", "1"));
const brollPath = arg("broll") as string;
const preset = arg("preset", "veryfast") as string;
const padded = String(day).padStart(3, "0");

const dayDir = join(process.cwd(), "tmp", "bible-in-one-year", `day-${padded}`);
const audioPath = join(dayDir, `day-${padded}-audio.mp3`);
const indexPath = join(dayDir, `day-${padded}-segments.json`);
const assPath = join(dayDir, `day-${padded}-captions.ass`);
const videoOut = join(process.cwd(), "tmp", "bible-in-one-year-video", `day-${padded}.mp4`);

const DAY_SCRIPTS: Record<number, BibleYearDayScript> = {
  2: BIBLE_YEAR_DAY_TWO_SCRIPT, 3: BIBLE_YEAR_DAY_THREE_SCRIPT, 4: BIBLE_YEAR_DAY_FOUR_SCRIPT,
  5: BIBLE_YEAR_DAY_FIVE_SCRIPT, 6: BIBLE_YEAR_DAY_SIX_SCRIPT, 7: BIBLE_YEAR_DAY_SEVEN_SCRIPT,
  8: BIBLE_YEAR_DAY_EIGHT_SCRIPT, 9: BIBLE_YEAR_DAY_NINE_SCRIPT, 10: BIBLE_YEAR_DAY_TEN_SCRIPT,
  11: BIBLE_YEAR_DAY_ELEVEN_SCRIPT,
};

/**
 * Finds a day's script without this file needing to be edited first.
 *
 * DAY_SCRIPTS above is a hand-written list of imports, so every new day needed
 * a code change before it could be rendered. Fine for eleven days, impossible
 * for three hundred and sixty five, and the thing that stopped the unattended
 * run dead on day 12 with "Day 12 has no script" while
 * lib/bibleYearDayTwelveScript.ts was sitting right there.
 *
 * The scripts follow one naming rule, BIBLE_YEAR_DAY_<NUMBER IN WORDS>_SCRIPT,
 * so lib is searched for exports with that shape and the words are turned back
 * into a number. Single file or grouped file, it gets found either way.
 */
const NUMBER_WORDS: Record<string, number> = {
  ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6, SEVEN: 7, EIGHT: 8, NINE: 9,
  TEN: 10, ELEVEN: 11, TWELVE: 12, THIRTEEN: 13, FOURTEEN: 14, FIFTEEN: 15,
  SIXTEEN: 16, SEVENTEEN: 17, EIGHTEEN: 18, NINETEEN: 19, TWENTY: 20, THIRTY: 30,
  FORTY: 40, FIFTY: 50, SIXTY: 60, SEVENTY: 70, EIGHTY: 80, NINETY: 90, HUNDRED: 100,
};

/** "TWENTY_ONE", "TWENTYONE" and "ONE_HUNDRED_FIVE" all resolve. */
function wordsToNumber(words: string): number | null {
  const parts: string[] = [];
  for (const chunk of words.split("_")) {
    if (chunk in NUMBER_WORDS) { parts.push(chunk); continue; }
    let rest = chunk;
    let guard = 0;
    while (rest && guard++ < 8) {
      const hit = Object.keys(NUMBER_WORDS)
        .filter((w) => rest.startsWith(w))
        .sort((x, y) => y.length - x.length)[0];
      if (!hit) return null;
      parts.push(hit);
      rest = rest.slice(hit.length);
    }
    if (rest) return null;
  }
  let current = 0;
  for (const p of parts) {
    const v = NUMBER_WORDS[p];
    if (v === 100) current = (current || 1) * 100;
    else current += v;
  }
  return current || null;
}

let discovered: Map<number, BibleYearDayScript> | null = null;
async function discoverScripts() {
  if (discovered) return discovered;
  discovered = new Map();
  const libDir = join(process.cwd(), "lib");
  let names: string[] = [];
  try { names = readdirSync(libDir); } catch { return discovered; }
  for (const name of names) {
    if (!name.endsWith(".ts")) continue;
    let source = "";
    try { source = readFileSync(join(libDir, name), "utf8"); } catch { continue; }
    // matchAll, not a shared exec loop. A /g/ regex carries lastIndex between
    // calls, so after matching in one file it resumed part-way through the
    // next and missed it: day 11 was found and day 12, the very next file
    // alphabetically, silently was not.
    const found: Array<[number, string]> = [];
    for (const m of source.matchAll(/export const BIBLE_YEAR_DAY_([A-Z_]+?)_SCRIPT/g)) {
      const day = wordsToNumber(m[1]);
      if (day) found.push([day, `BIBLE_YEAR_DAY_${m[1]}_SCRIPT`]);
    }
    if (!found.length) continue;
    // require, not import(): tsx compiles this file to CommonJS, where a
    // dynamic import of a .ts path does not resolve, while require is hooked.
    let mod: Record<string, unknown>;
    try { mod = requireTs(join(libDir, name)) as Record<string, unknown>; }
    catch (e) { console.warn(`[scripts] skipped ${name}: ${(e as Error).message.slice(0, 120)}`); continue; }
    for (const [day, exportName] of found) {
      const value = mod[exportName];
      if (value && !discovered.has(day)) discovered.set(day, value as BibleYearDayScript);
    }
  }
  return discovered;
}

async function segmentTexts(dayNumber: number) {
  if (dayNumber === 1) return buildDayOneSegments(GENESIS_DAY_ONE_CREATION_LESSON);
  let script: BibleYearDayScript | undefined = DAY_SCRIPTS[dayNumber];
  if (!script) script = (await discoverScripts()).get(dayNumber);
  if (!script) throw new Error(`Day ${dayNumber} has no script, and lib/ has no BIBLE_YEAR_DAY_..._SCRIPT export for it.`);
  return buildDaySegments(script);
}

/**
 * Captions are derived from the script plus the cached per-segment durations,
 * not from transcribing the audio. That means they are exactly right - no
 * misheard names, no drift - and cost nothing to produce.
 */
/** One card never spans two sentences - a card should carry a single thought. */
function splitSentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Split an over-long sentence into evenly sized cards rather than filling each
 * one to the brim. Greedy filling produced "Today is Day 1 of our journey
 * through the" followed by a stranded "Bible together."; aiming for equal
 * pieces gives a clean break near the middle instead. Commas are preferred as
 * break points when they fall close to the target.
 */
function splitLongSentence(sentence: string, maxChars: number) {
  const pieces = Math.ceil(sentence.length / maxChars);
  const target = Math.ceil(sentence.length / pieces);
  const words = sentence.split(/\s+/);
  const out: string[] = [];
  let current = "";

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    current = current ? `${current} ${word}` : word;
    const remaining = words.slice(i + 1).join(" ");
    if (!remaining) break;

    const atTarget = current.length >= target;
    // Break a little early on a comma if we are already close to the target.
    const commaBreak = /,$/.test(word) && current.length >= target * 0.7;
    if (atTarget || commaBreak) {
      out.push(current);
      current = "";
    }
  }
  if (current) out.push(current);
  return out.length ? out : [sentence];
}

function chunkForCaption(text: string, maxChars = 44) {
  const out: string[] = [];
  for (const sentence of splitSentences(text)) {
    if (sentence.length <= maxChars) out.push(sentence);
    else out.push(...splitLongSentence(sentence, maxChars));
  }
  return out.length ? out : [text];
}

/**
 * Share a segment's duration across its cards by character count, but never let
 * a card flash. "Hey." is four characters inside a 2.6s segment; by raw
 * proportion it would show for a third of a second.
 */
function shareDuration(chunks: string[], totalSeconds: number, minSeconds = 0.7) {
  const totalChars = chunks.reduce((n, c) => n + c.length, 0) || 1;
  let shares = chunks.map((c) => (c.length / totalChars) * totalSeconds);

  if (chunks.length * minSeconds >= totalSeconds) {
    return chunks.map(() => totalSeconds / chunks.length);
  }

  const short = shares.map((s) => s < minSeconds);
  if (short.some(Boolean)) {
    const fixed = short.reduce((n, isShort, i) => n + (isShort ? minSeconds : 0), 0);
    const flexibleTotal = shares.reduce((n, s, i) => n + (short[i] ? 0 : s), 0) || 1;
    const remaining = totalSeconds - fixed;
    shares = shares.map((s, i) => (short[i] ? minSeconds : (s / flexibleTotal) * remaining));
  }
  return shares;
}

function assTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const cs = Math.floor((seconds - Math.floor(seconds)) * 100);
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

function escapeAss(text: string) {
  return text.replace(/[{}]/g, "").replace(/\r?\n/g, " ").trim();
}

type CachedSegment = { role: BibleYearAudioRole; length: number; pauseAfterMs: number };

async function buildCaptions() {
  const index = JSON.parse(readFileSync(indexPath, "utf8")) as CachedSegment[];
  const segments = await segmentTexts(day);

  if (index.length !== segments.length) {
    throw new Error(
      `Segment cache (${index.length}) does not match the script (${segments.length}). ` +
      `Re-render day ${padded} before building video, or captions will drift.`,
    );
  }

  const lines: string[] = [];
  let cursor = 0;

  for (let i = 0; i < segments.length; i += 1) {
    const durationSeconds = index[i].length / SR;
    const text = segments[i].text;
    const chunks = chunkForCaption(text);
    const shares = shareDuration(chunks, durationSeconds);

    let offset = cursor;
    chunks.forEach((chunk, chunkIndex) => {
      const start = offset;
      const end = offset + shares[chunkIndex];
      lines.push(
        `Dialogue: 0,${assTime(start)},${assTime(end)},Default,,0,0,0,,${escapeAss(chunk)}`,
      );
      offset = end;
    });

    cursor += durationSeconds + index[i].pauseAfterMs / 1000;
  }

  const header = [
    "[Script Info]",
    "ScriptType: v4.00+",
    "PlayResX: 1280",
    "PlayResY: 720",
    "WrapStyle: 0",
    "ScaledBorderAndShadow: yes",
    "",
    "[V4+ Styles]",
    "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
    // Alignment 5 = middle centre, matching the existing YouTube videos.
    "Style: Default,Georgia,46,&H00FFFFFF,&H000000FF,&H00202020,&H80000000,0,0,0,0,100,100,0,0,1,2.5,1.5,5,70,70,0,1",
    "",
    "[Events]",
    "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
  ].join("\n");

  writeFileSync(assPath, header + "\n" + lines.join("\n") + "\n", "utf8");
  console.log(`[day ${padded}] captions: ${lines.length} cards -> ${assPath}`);
  return cursor;
}

function audioSeconds() {
  try {
    execFileSync(FFMPEG, ["-i", audioPath], { stdio: ["ignore", "pipe", "pipe"] });
  } catch (error) {
    const stderr = (error as { stderr: Buffer }).stderr.toString();
    const match = stderr.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
    if (match) return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
  }
  throw new Error("Could not read audio duration.");
}

function renderVideo(seconds: number) {
  mkdirSync(join(process.cwd(), "tmp", "bible-in-one-year-video"), { recursive: true });

  // The subtitles filter needs a path it can parse; running from the day folder
  // and passing a bare filename avoids Windows drive-letter escaping entirely.
  const args = [
    "-hide_banner", "-loglevel", "error", "-stats", "-y",
    "-stream_loop", "-1", "-i", brollPath,
    "-i", audioPath,
    "-filter_complex",
    `[0:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=30,subtitles=day-${padded}-captions.ass[v]`,
    "-map", "[v]", "-map", "1:a",
    "-t", String(seconds),
    "-c:v", "libx264", "-preset", preset, "-crf", "23", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "128k",
    "-movflags", "+faststart",
    videoOut,
  ];

  console.log(`[day ${padded}] encoding ${(seconds / 60).toFixed(1)} min at preset ${preset}...`);
  execFileSync(FFMPEG, args, { cwd: dayDir, stdio: ["ignore", "inherit", "inherit"] });
  console.log(`[day ${padded}] video: ${videoOut}`);
}

async function main() {
  if (!brollPath || !existsSync(brollPath)) {
    throw new Error(`Pass --broll=<path to template mp4>. Got: ${brollPath}`);
  }
  if (!existsSync(audioPath)) throw new Error(`No rendered audio at ${audioPath}`);
  if (!existsSync(indexPath)) throw new Error(`No segment cache at ${indexPath}. Re-render the day.`);

  const captionEnd = await buildCaptions();
  const seconds = audioSeconds();
  console.log(`[day ${padded}] audio ${seconds.toFixed(1)}s, captions end ${captionEnd.toFixed(1)}s`);
  if (process.argv.includes("--captions-only")) return;
  renderVideo(seconds);
}

main().catch((error) => {
  console.error(`[day ${padded}] failed:`, error.message || error);
  process.exit(1);
});
