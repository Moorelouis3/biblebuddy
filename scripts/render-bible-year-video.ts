import { config } from "dotenv";
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
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
};

async function segmentTexts(dayNumber: number) {
  if (dayNumber === 1) return buildDayOneSegments(GENESIS_DAY_ONE_CREATION_LESSON);
  const script = DAY_SCRIPTS[dayNumber];
  if (!script) throw new Error(`Day ${dayNumber} has no script.`);
  return buildDaySegments(script);
}

/**
 * Captions are derived from the script plus the cached per-segment durations,
 * not from transcribing the audio. That means they are exactly right - no
 * misheard names, no drift - and cost nothing to produce.
 */
function chunkForCaption(text: string, maxWords = 6) {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  let current: string[] = [];

  for (const word of words) {
    current.push(word);
    const longEnough = current.length >= maxWords;
    const clauseEnd = /[,;:.!?]$/.test(word) && current.length >= 3;
    if (longEnough || clauseEnd) {
      chunks.push(current.join(" "));
      current = [];
    }
  }
  if (current.length) {
    // Avoid orphaning one or two words on their own card.
    if (current.length <= 2 && chunks.length) chunks[chunks.length - 1] += " " + current.join(" ");
    else chunks.push(current.join(" "));
  }
  return chunks.length ? chunks : [text];
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
    const totalChars = chunks.reduce((n, c) => n + c.length, 0) || 1;

    let offset = cursor;
    for (const chunk of chunks) {
      // Time is shared out by character count, so long chunks hold longer.
      const share = (chunk.length / totalChars) * durationSeconds;
      const start = offset;
      const end = offset + share;
      lines.push(
        `Dialogue: 0,${assTime(start)},${assTime(end)},Default,,0,0,0,,${escapeAss(chunk)}`,
      );
      offset = end;
    }

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
    "Style: Default,Georgia,34,&H00FFFFFF,&H000000FF,&H00202020,&H80000000,0,0,0,0,100,100,0,0,1,2,1,5,80,80,0,1",
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
  renderVideo(seconds);
}

main().catch((error) => {
  console.error(`[day ${padded}] failed:`, error.message || error);
  process.exit(1);
});
