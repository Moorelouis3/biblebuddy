import { config } from "dotenv";
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from "fs";
import { join } from "path";
import ffmpegPath from "ffmpeg-static";

/**
 * Turns picked old Shorts into new ones.
 *
 * The picks are static-text shorts, so a single frame from the middle of the
 * clip carries the entire script. One vision call per short both reads that
 * text and rewrites it - same point, same voice, new sentences - because these
 * are remakes of videos already on the channel and a near-copy reads as a
 * re-upload.
 *
 *   npx tsx scripts/build-picked-shorts.ts --limit=10   (try a few first)
 *   npx tsx scripts/build-picked-shorts.ts              (all picked)
 *
 * Resumable: anything already built is skipped.
 */

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}
const LIFE_BUDDY_ENV = "C:/Users/Moore/Desktop/second-brain/.env";
if (!process.env.ANTHROPIC_API_KEY && existsSync(LIFE_BUDDY_ENV)) {
  config({ path: LIFE_BUDDY_ENV, override: false, quiet: true });
}

const ROOT = process.cwd();
const PENDING = join(ROOT, "data", "shorts-pending.json");
const BG_DIR = join(ROOT, "tmp", "shorts", "bg");
const WORK = join(ROOT, "tmp", "shorts", "extract");
const FFMPEG = ffmpegPath as unknown as string;

const arg = (n: string, d?: string) => {
  const hit = process.argv.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.split("=").slice(1).join("=") : d;
};
const limit = Number(arg("limit", "0"));

type Row = {
  id: string; title: string; lines: string[]; bg: string; sourceText: string;
  status: string; originUrl?: string; origin?: string; extractError?: string;
};

const PROMPT = `This frame is from a short vertical video. The whole video shows this one block of text the entire time.

Two jobs:

1. Read every line of the on-screen text, in order, exactly as written. Ignore any watermark, username, logo or app UI - only text that is part of the video.

2. Rewrite it. This is being remade for the same channel, so a near-copy of the original would read as a re-upload. Keep the same point, the same plain spoken voice, and the same rough length - but use genuinely different sentences and a different opening. Do not add Scripture references or quotes that are not in the original. Do not make it sound like an advert.

Formatting for the rewrite:
- 2 to 7 short lines, each one beat. Line breaks are the pacing.
- Use "" for a blank line between separate thoughts.
- Optionally an all-caps first line if the original opens like a hook.

Also give a 2-4 word title in Title Case.

Return only JSON:
{"original": ["..."], "lines": ["..."], "title": "..."}
If the frame has no readable text, return {"original": [], "lines": [], "title": ""}.`;

async function readAndRewrite(framePath: string) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("no ANTHROPIC_API_KEY");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 900,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: readFileSync(framePath).toString("base64") } },
          { type: "text", text: PROMPT },
        ],
      }],
    }),
  });
  if (!res.ok) throw new Error((await res.text()).slice(0, 140));
  const data = await res.json();
  const body = (data.content?.[0]?.text || "").trim().replace(/^```(?:json)?|```$/g, "").trim();
  const parsed = JSON.parse(body);
  return {
    original: (parsed.original || []).map((l: unknown) => String(l ?? "")),
    lines: (parsed.lines || []).map((l: unknown) => String(l ?? ""))
      .filter((l: string, i: number, arr: string[]) => l.trim() !== "" || (i > 0 && i < arr.length - 1)),
    title: String(parsed.title || "").slice(0, 60),
  };
}

function grabFrame(url: string, id: string) {
  const mp4 = join(WORK, `${id}.mp4`);
  const frame = join(WORK, `${id}.jpg`);

  execFileSync("yt-dlp", ["-f", "mp4/best", "--no-warnings", "-q", "-o", mp4, url],
    { stdio: ["ignore", "ignore", "pipe"], shell: true });

  let total = 0;
  try {
    execFileSync(FFMPEG, ["-i", mp4], { stdio: ["ignore", "pipe", "pipe"] });
  } catch (error) {
    const m = /Duration: (\d+):(\d+):(\d+\.\d+)/.exec((error as { stderr: Buffer }).stderr.toString());
    if (m) total = Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
  }
  if (!total) throw new Error("could not read duration");

  // Middle of the clip: past any intro animation, before any outro card.
  execFileSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", "-ss", (total * 0.5).toFixed(2),
    "-i", mp4, "-frames:v", "1", "-q:v", "3", frame], { stdio: ["ignore", "ignore", "ignore"] });

  try { rmSync(mp4, { force: true }); } catch { /* ignore */ }
  if (!existsSync(frame)) throw new Error("frame grab failed");
  return frame;
}

async function main() {
  mkdirSync(WORK, { recursive: true });
  const backgrounds = readdirSync(BG_DIR).filter((f) => f.endsWith(".mp4"));
  const rows = JSON.parse(readFileSync(PENDING, "utf8")) as Row[];

  const picked = rows.filter((r) => r.status === "picked" && (!r.lines || !r.lines.length));
  const batch = limit ? picked.slice(0, limit) : picked;
  console.log(`${picked.length} picked without a script; building ${batch.length}`);

  let built = 0, failed = 0;
  for (const [index, row] of batch.entries()) {
    if (!row.originUrl) { row.extractError = "no source url"; failed += 1; continue; }
    const frame = join(WORK, `${row.id}.jpg`);
    try {
      if (!existsSync(frame)) grabFrame(row.originUrl, row.id);
      const { original, lines, title } = await readAndRewrite(frame);

      if (!lines.length) throw new Error("no text read from frame");

      row.lines = lines;
      row.title = title || row.title;
      // sourceText becomes the YouTube description, so it has to describe the
      // new video, not the one it was remade from.
      row.sourceText = lines.filter(Boolean).join(" ").slice(0, 300);
      (row as Row & { originalText?: string }).originalText = original.join(" ");
      row.bg = backgrounds[(index + built) % backgrounds.length];
      delete row.extractError;
      built += 1;
    } catch (error) {
      row.extractError = (error as Error).message.slice(0, 140);
      failed += 1;
    }

    writeFileSync(PENDING, JSON.stringify(rows, null, 2));
    if ((index + 1) % 10 === 0 || index === batch.length - 1) {
      console.log(`  ${index + 1}/${batch.length}   built ${built}, failed ${failed}`);
    }
  }

  console.log(`\n${built} scripts built, ${failed} failed`);
  console.log("Restart the approval server - it books slots and renders anything approved.");
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });
