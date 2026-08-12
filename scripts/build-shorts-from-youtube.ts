import { config } from "dotenv";
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import ffmpegPath from "ffmpeg-static";

/**
 * Builds approval candidates from Shorts that already performed on YouTube.
 *
 * The old videos are narrated clips with rolling captions, so there is no
 * stored script and a single frame only yields one caption line. What does
 * exist is the Threads post the short was made from - Louis's own wording, in
 * full. So YouTube view/engagement data picks WHICH ideas to remake, and the
 * matching Threads post supplies the words.
 *
 *   npx tsx scripts/build-shorts-from-youtube.ts --count=60
 */

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}
const LIFE_BUDDY_ENV = "C:/Users/Moore/Desktop/second-brain/.env";
if (!process.env.ANTHROPIC_API_KEY && existsSync(LIFE_BUDDY_ENV)) {
  config({ path: LIFE_BUDDY_ENV, override: false, quiet: true });
}

const ROOT = process.cwd();
const REUSABLE = "C:/Users/Moore/Desktop/youtube-shorts-automation/data/shorts-reusable.json";
const THREADS_STATE = "C:/Users/Moore/Desktop/youtube-shorts-automation/data/threads-state.json";
const BG_DIR = join(ROOT, "tmp", "shorts", "bg");
const WORK_DIR = join(ROOT, "tmp", "shorts", "work");
const PREVIEW_DIR = join(ROOT, "tmp", "shorts", "previews");
const PENDING = join(ROOT, "data", "shorts-pending.json");
const QUEUE = join(ROOT, "data", "shorts-queue.json");
const FFMPEG = ffmpegPath as unknown as string;

const W = 1080, H = 1920, TEXT_W = 960, TEXT_H = 1340, SIZE_MAX = 72, SIZE_MIN = 34;
const MATCH_THRESHOLD = 0.6;

const arg = (n: string, d?: string) => {
  const hit = process.argv.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.split("=").slice(1).join("=") : d;
};
const wantCount = Number(arg("count", "60"));

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
].find((p) => existsSync(p));

const STOP = new Set(["the","a","you","your","to","of","is","it","in","and","this","that","for","god","jesus","are","was","not","but","with","have"]);
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const keywords = (s: string) => new Set(norm(s).split(" ").filter((w) => w.length > 2 && !STOP.has(w)));
const fingerprint = (s: string) => norm(s).slice(0, 60);

const SYSTEM = `You turn a Threads post into the on-screen text of a short vertical video.

Rules:
- Keep the author's voice and wording wherever possible. Do not smooth it into ad copy or add words he did not write.
- Output 2 to 7 short lines. Each line is one beat, and the break is the pacing.
- Use a blank line ("") between separate thoughts.
- Optionally make the FIRST line an all-caps hook, but only if the post already opens like one.
- Strip hashtags, @handles, emoji-only lines, and calls to action.
- Never invent Scripture references or quotes.
- Also give a 2-4 word title in Title Case.

Return only JSON: {"title": string, "lines": string[]}`;

async function copyFit(text: string) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("no ANTHROPIC_API_KEY");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001", max_tokens: 700,
      system: SYSTEM, messages: [{ role: "user", content: text }],
    }),
  });
  if (!res.ok) throw new Error((await res.text()).slice(0, 140));
  const data = await res.json();
  const body = (data.content?.[0]?.text || "").trim().replace(/^```(?:json)?|```$/g, "").trim();
  const parsed = JSON.parse(body);
  const lines = (parsed.lines || []).map((l: unknown) => String(l ?? ""))
    .filter((l: string, i: number, arr: string[]) => l.trim() !== "" || (i > 0 && i < arr.length - 1));
  return { title: String(parsed.title || "Untitled").slice(0, 60), lines };
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderPreview(id: string, lines: string[], bg: string) {
  if (!CHROME) throw new Error("Chrome not found");
  mkdirSync(WORK_DIR, { recursive: true });
  mkdirSync(PREVIEW_DIR, { recursive: true });

  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;padding:0;width:${W}px;height:${H}px;background:transparent;overflow:hidden}
#stage{width:${W}px;height:${H}px;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.42)}
#block{width:${TEXT_W}px;text-align:center;color:#fff;font-family:"Segoe UI",sans-serif;font-weight:700;
  line-height:1.28;text-shadow:0 2px 6px rgba(0,0,0,.75);-webkit-font-smoothing:antialiased}
.l{margin:0}.sp{height:.6em}
</style></head><body><div id="stage"><div id="block">
${lines.map((l) => (l.trim() ? `<div class="l">${escapeHtml(l)}</div>` : `<div class="sp"></div>`)).join("\n")}
</div></div><script>
(function(){var b=document.getElementById('block'),s=${SIZE_MAX};b.style.fontSize=s+'px';
while(s>${SIZE_MIN}&&b.scrollHeight>${TEXT_H}){s-=2;b.style.fontSize=s+'px';}})();
</script></body></html>`;

  const htmlPath = join(WORK_DIR, `pv-${id}.html`);
  const pngPath = join(WORK_DIR, `pv-${id}.png`);
  const stillPath = join(WORK_DIR, `pv-${id}-bg.jpg`);
  const outPath = join(PREVIEW_DIR, `${id}.jpg`);
  writeFileSync(htmlPath, html, "utf8");

  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--force-device-scale-factor=1", "--default-background-color=00000000",
    `--window-size=${W},${H}`, `--screenshot=${pngPath}`,
    `file:///${htmlPath.replace(/\\/g, "/")}`], { stdio: ["ignore", "ignore", "ignore"] });

  execFileSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", "-ss", "3", "-i", join(BG_DIR, bg),
    "-frames:v", "1", "-vf", `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}`,
    stillPath], { stdio: ["ignore", "ignore", "ignore"] });

  execFileSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", "-i", stillPath, "-i", pngPath,
    "-filter_complex", "[0:v][1:v]overlay=0:0:format=auto,scale=405:720", "-q:v", "4", outPath],
    { stdio: ["ignore", "ignore", "ignore"] });

  return `${id}.jpg`;
}

async function main() {
  const reusable = JSON.parse(readFileSync(REUSABLE, "utf8")) as Array<{ title: string; views: number; rate: number; published: string; url: string }>;
  const state = JSON.parse(readFileSync(THREADS_STATE, "utf8")) as { posts: Array<{ id: string; text: string; postedAt: string }> };
  const posts = state.posts.filter((p) => p.text && p.text.length > 25)
    .map((p) => ({ ...p, kw: keywords(p.text) }));

  const backgrounds = readdirSync(BG_DIR).filter((f) => f.endsWith(".mp4"));
  const existing = existsSync(PENDING) ? JSON.parse(readFileSync(PENDING, "utf8")) : [];
  const queueRaw = existsSync(QUEUE) ? JSON.parse(readFileSync(QUEUE, "utf8")) : { shorts: [] };
  const queueShorts = Array.isArray(queueRaw) ? queueRaw : (queueRaw.shorts || []);

  const taken = new Set<string>();
  for (const s of queueShorts) taken.add(fingerprint((s.lines || []).join(" ")));
  for (const s of existing) { taken.add(fingerprint((s.lines || []).join(" "))); taken.add(fingerprint(s.sourceText || "")); }

  const out = [...existing];
  let made = 0, unmatched = 0;

  for (const short of reusable) {
    if (made >= wantCount) break;
    const id = `yt-${short.url.split("v=")[1]}`;
    if (out.some((c: any) => c.id === id)) continue;

    // Find the Threads post this short was made from.
    const kw = keywords(short.title);
    if (!kw.size) continue;
    let best: typeof posts[number] | null = null, bestScore = 0;
    for (const p of posts) {
      let hit = 0;
      for (const w of kw) if (p.kw.has(w)) hit += 1;
      const score = hit / kw.size;
      if (score > bestScore) { bestScore = score; best = p; }
    }
    if (!best || bestScore < MATCH_THRESHOLD) { unmatched += 1; continue; }
    if (taken.has(fingerprint(best.text))) continue;

    try {
      const { title, lines } = await copyFit(best.text);
      if (!lines.length) continue;
      const bg = backgrounds[(out.length + made) % backgrounds.length];
      const preview = renderPreview(id, lines, bg);

      out.push({
        id, sourceId: best.id, score: short.views, posted: short.published,
        sourceText: best.text, title, lines, bg, preview, status: "pending",
        origin: "youtube", originUrl: short.url, originViews: short.views, originRate: short.rate,
      });
      taken.add(fingerprint(best.text));
      made += 1;
      if (made % 10 === 0) console.log(`  ${made}/${wantCount}`);
    } catch (error) {
      console.log(`skip ${id}: ${(error as Error).message.slice(0, 80)}`);
    }
  }

  writeFileSync(PENDING, JSON.stringify(out, null, 2));
  console.log(`\n${made} added from proven Shorts (${unmatched} had no matching Threads post)`);
  console.log(`${out.length} pending total -> approval page`);
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });
