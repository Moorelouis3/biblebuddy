import { config } from "dotenv";
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import ffmpegPath from "ffmpeg-static";

/**
 * Builds a batch of candidate Shorts from the best-performing Threads posts and
 * renders a cheap preview image for each, ready for approval in the dashboard.
 *
 * Nothing is rendered to video and nothing is uploaded here - a preview is a
 * still frame plus the text layer, about two seconds each instead of a minute.
 *
 *   npx tsx scripts/build-shorts-batch.ts --count=60
 *   npx tsx scripts/build-shorts-batch.ts --count=60 --months=6
 */

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}
// Life Buddy holds the Anthropic key; this project only has the OpenAI one.
const LIFE_BUDDY_ENV = "C:/Users/Moore/Desktop/second-brain/.env";
if (!process.env.ANTHROPIC_API_KEY && existsSync(LIFE_BUDDY_ENV)) {
  config({ path: LIFE_BUDDY_ENV, override: false, quiet: true });
}

const ROOT = process.cwd();
const THREADS_STATE = "C:/Users/Moore/Desktop/youtube-shorts-automation/data/threads-state.json";
const BG_DIR = join(ROOT, "tmp", "shorts", "bg");
const WORK_DIR = join(ROOT, "tmp", "shorts", "work");
const PREVIEW_DIR = join(ROOT, "tmp", "shorts", "previews");
const PENDING = join(ROOT, "data", "shorts-pending.json");
const QUEUE = join(ROOT, "data", "shorts-queue.json");
const FFMPEG = ffmpegPath as unknown as string;

const W = 1080;
const H = 1920;
const TEXT_W = 960;
const TEXT_H = 1340;
const SIZE_MAX = 72;
const SIZE_MIN = 34;

function arg(name: string, fallback?: string) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
}
const wantCount = Number(arg("count", "60"));
const months = Number(arg("months", "6"));

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
].find((p) => existsSync(p));

type ThreadPost = {
  id: string;
  text: string;
  postedAt: string;
  scores?: Record<string, { score?: number } | undefined>;
};

type Candidate = {
  id: string;
  sourceId: string;
  score: number;
  posted: string;
  sourceText: string;
  title: string;
  lines: string[];
  bg: string;
  preview: string;
  status: "pending";
};

/** Normalised for comparison - the existing 35 were reworded when copy-fitted. */
function fingerprint(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim().slice(0, 60);
}

function bestScore(post: ThreadPost) {
  return post.scores?.["7d"]?.score ?? post.scores?.["3d"]?.score ?? post.scores?.["24h"]?.score ?? null;
}

function selectCandidates() {
  const state = JSON.parse(readFileSync(THREADS_STATE, "utf8")) as { posts: ThreadPost[] };
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);

  const queueRaw = existsSync(QUEUE) ? JSON.parse(readFileSync(QUEUE, "utf8")) : [];
  const queue = Array.isArray(queueRaw) ? queueRaw : queueRaw.rows || [];
  const pendingRaw = existsSync(PENDING) ? JSON.parse(readFileSync(PENDING, "utf8")) : [];

  // Everything already made or already waiting for approval is off the table.
  const taken = new Set<string>();
  for (const s of queue) taken.add(fingerprint((s.lines || []).join(" ")));
  for (const s of pendingRaw) { taken.add(fingerprint((s.lines || []).join(" "))); taken.add(fingerprint(s.sourceText || "")); }

  return (state.posts || [])
    .filter((p) => p.postedAt && new Date(p.postedAt) >= cutoff)
    .map((p) => ({ post: p, score: bestScore(p) }))
    .filter((x): x is { post: ThreadPost; score: number } => x.score !== null)
    .filter(({ post }) => {
      const text = (post.text || "").trim();
      if (text.length < 40 || text.length > 600) return false;   // too thin, or will not fit
      if (/^@/.test(text)) return false;                          // reply
      if (!taken.has(fingerprint(text))) return true;
      return false;
    })
    .sort((a, b) => b.score - a.score);
}

// --- copy-fitting ------------------------------------------------------------

const SYSTEM = `You turn a Threads post into the on-screen text of a short vertical video.

Rules:
- Keep the author's voice and wording wherever possible. Do not smooth it into ad copy or add words he did not write.
- Output 2 to 7 short lines. Each line is one beat, and the break is the pacing - a line break is honoured, never re-wrapped.
- Use a blank line ("") between separate thoughts.
- Optionally make the FIRST line an all-caps hook, but only if the post already opens like one.
- Strip hashtags, @handles, emoji-only lines, and calls to action like "comment below" or "follow for more".
- Never invent Scripture references or quotes.
- Also give a 2-4 word title in Title Case.

Return JSON: {"title": string, "lines": string[]}`;

function normaliseResult(raw: string) {
  const parsed = JSON.parse(raw);
  const lines = (parsed.lines || [])
    .map((l: unknown) => String(l ?? ""))
    .filter((l: string, i: number, arr: string[]) => l.trim() !== "" || (i > 0 && i < arr.length - 1));
  return { title: String(parsed.title || "Untitled").slice(0, 60), lines };
}

async function copyFitOpenAi(text: string, apiKey: string) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.4,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: text },
      ],
    }),
  });
  if (!res.ok) throw new Error((await res.text()).slice(0, 160));
  const data = await res.json();
  return normaliseResult(data.choices[0].message.content);
}

async function copyFitAnthropic(text: string, apiKey: string) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 700,
      system: `${SYSTEM}\n\nReturn only the JSON object, nothing else.`,
      messages: [{ role: "user", content: text }],
    }),
  });
  if (!res.ok) throw new Error((await res.text()).slice(0, 160));
  const data = await res.json();
  const body = (data.content?.[0]?.text || "").trim().replace(/^```(?:json)?|```$/g, "").trim();
  return normaliseResult(body);
}

/**
 * OpenAI first, Anthropic as a fallback. The OpenAI account ran out of credits
 * mid-build, and having one dead key stop a 60-post batch is not worth it.
 */
async function copyFit(text: string) {
  const openAiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (openAiKey && !copyFit.openAiDead) {
    try {
      return await copyFitOpenAi(text, openAiKey);
    } catch (error) {
      const message = (error as Error).message;
      if (/credit|quota|billing|insufficient/i.test(message)) {
        copyFit.openAiDead = true;
        console.log("  OpenAI unavailable (no credits) - falling back to Anthropic for the rest of this batch");
      } else {
        throw new Error(`copy-fit failed: ${message}`);
      }
    }
  }

  if (!anthropicKey) throw new Error("copy-fit failed: OpenAI unavailable and no ANTHROPIC_API_KEY");
  return copyFitAnthropic(text, anthropicKey);
}
copyFit.openAiDead = false;

// --- preview -----------------------------------------------------------------

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildHtml(lines: string[]) {
  const body = lines
    .map((line) => (line.trim() ? `<div class="l">${escapeHtml(line)}</div>` : `<div class="sp"></div>`))
    .join("\n");

  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
html,body{margin:0;padding:0;width:${W}px;height:${H}px;background:transparent;overflow:hidden}
#stage{width:${W}px;height:${H}px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.42)}
#block{width:${TEXT_W}px;text-align:center;color:#fff;
  font-family:"Segoe UI","Segoe UI Emoji","Segoe UI Symbol",sans-serif;
  font-weight:700;line-height:1.28;
  text-shadow:0 2px 6px rgba(0,0,0,.75);
  -webkit-font-smoothing:antialiased}
.l{margin:0}
.sp{height:.6em}
</style></head><body>
<div id="stage"><div id="block">
${body}
</div></div>
<script>
(function(){
  var b=document.getElementById('block'),s=${SIZE_MAX};
  b.style.fontSize=s+'px';
  while(s>${SIZE_MIN} && b.scrollHeight>${TEXT_H}){ s-=2; b.style.fontSize=s+'px'; }
  b.setAttribute('data-size',s);
})();
</script>
</body></html>`;
}

function renderPreview(id: string, lines: string[], bg: string) {
  if (!CHROME) throw new Error("Chrome not found - needed to draw the text layer.");
  mkdirSync(WORK_DIR, { recursive: true });
  mkdirSync(PREVIEW_DIR, { recursive: true });

  const htmlPath = join(WORK_DIR, `pv-${id}.html`);
  const pngPath = join(WORK_DIR, `pv-${id}.png`);
  const stillPath = join(WORK_DIR, `pv-${id}-bg.jpg`);
  const outPath = join(PREVIEW_DIR, `${id}.jpg`);

  writeFileSync(htmlPath, buildHtml(lines), "utf8");
  execFileSync(CHROME, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--force-device-scale-factor=1", "--default-background-color=00000000",
    `--window-size=${W},${H}`, `--screenshot=${pngPath}`,
    `file:///${htmlPath.replace(/\\/g, "/")}`,
  ], { stdio: ["ignore", "ignore", "ignore"] });

  // One still from the middle of the clip, then a straight alpha composite -
  // the same look as the finished video without paying for an encode.
  execFileSync(FFMPEG, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-ss", "3", "-i", join(BG_DIR, bg), "-frames:v", "1",
    "-vf", `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}`,
    stillPath,
  ], { stdio: ["ignore", "ignore", "ignore"] });

  execFileSync(FFMPEG, [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", stillPath, "-i", pngPath,
    "-filter_complex", "[0:v][1:v]overlay=0:0:format=auto,scale=405:720",
    "-q:v", "4", outPath,
  ], { stdio: ["ignore", "ignore", "ignore"] });

  return `${id}.jpg`;
}

// --- main --------------------------------------------------------------------

async function main() {
  const backgrounds = readdirSync(BG_DIR).filter((f) => f.endsWith(".mp4"));
  if (!backgrounds.length) throw new Error(`No b-roll in ${BG_DIR}`);

  const pool = selectCandidates();
  console.log(`${pool.length} unused posts in the last ${months} months; taking top ${wantCount}`);

  const existing: Candidate[] = existsSync(PENDING) ? JSON.parse(readFileSync(PENDING, "utf8")) : [];
  const out: Candidate[] = [...existing];
  let made = 0;

  for (const { post, score } of pool) {
    if (made >= wantCount) break;
    const id = `t-${post.id}`.slice(0, 40);
    if (out.some((c) => c.id === id)) continue;

    try {
      const { title, lines } = await copyFit(post.text);
      if (!lines.length) { console.log(`skip ${id}: no lines`); continue; }

      // Rotate b-roll so consecutive approvals do not reuse the same clip.
      const bg = backgrounds[(existing.length + made) % backgrounds.length];
      const preview = renderPreview(id, lines, bg);

      out.push({
        id, sourceId: post.id, score: Math.round(score), posted: post.postedAt.slice(0, 10),
        sourceText: post.text, title, lines, bg, preview, status: "pending",
      });
      made += 1;
      if (made % 10 === 0) console.log(`  ${made}/${wantCount}`);
    } catch (error) {
      console.log(`skip ${id}: ${(error as Error).message.slice(0, 90)}`);
    }
  }

  mkdirSync(join(ROOT, "data"), { recursive: true });
  writeFileSync(PENDING, JSON.stringify(out, null, 2));
  console.log(`\n${made} new candidates, ${out.length} pending total -> ${PENDING}`);
  console.log(`previews -> ${PREVIEW_DIR}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
