/**
 * Renders a vertical YouTube Short from a Threads post: AI background clip +
 * the post text + a music bed lifted from the Bible in One Year templates.
 *
 * The text is drawn by headless Chrome into a transparent PNG, not by libass.
 * libass only has monochrome emoji, and Louis's shorts use the colour ones -
 * Chrome renders Segoe UI Emoji in full colour and honours the exact line
 * breaks of the original post instead of wrapping wherever it likes.
 *
 * The music is baked in on purpose: Louis uploads from desktop, and YouTube's
 * sound catalogue is only reachable from the phone app's Shorts flow.
 *
 *   npx tsx scripts/render-short.ts --id=02-wear-a-cross
 *   npx tsx scripts/render-short.ts --all
 */
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import ffmpegPath from "ffmpeg-static";

const FFMPEG = ffmpegPath as unknown as string;
const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
].find((p) => existsSync(p));

const ROOT = process.cwd();
const BG_DIR = join(ROOT, "tmp", "shorts", "bg");
const WORK_DIR = join(ROOT, "tmp", "shorts", "work");
const OUT_DIR = join(ROOT, "tmp", "shorts", "out");
const MUSIC = join(ROOT, "tmp", "shorts", "audio", "bed.mp3");

const W = 1080;
const H = 1920;
const FPS = 30;

/** Text column width and the height the block must fit inside. */
const TEXT_W = 960;
const TEXT_H = 1340;
/**
 * Font size the fit starts from and walks down.
 *
 * Louis's own shorts run about 44px on a 720-wide frame, which is ~66px here.
 * Starting at 124 meant short posts filled the whole screen and read as
 * shouting; the cap keeps every post in the same register regardless of length.
 */
const SIZE_MAX = 72;
const SIZE_MIN = 34;
/**
 * At or under this length a line is a deliberate break, not prose that happens
 * to be short, so it is never allowed to re-wrap. Set low on purpose: forcing a
 * 30-character line onto one row costs more in type size than the tidier wrap
 * is worth.
 */
const TIGHT_CHARS = 14;

const TAIL_SECONDS = 1.6;
const HEAD_SECONDS = 0.6;
/** Shorts cap at 60s; stay well clear so nothing gets cut. */
const MAX_BODY_SECONDS = 44;

type Short = {
  id: string;
  likes: number;
  posted: string;
  title: string;
  /** Blank entries are deliberate breaks between beats, as posted. */
  lines: string[];
  /** First line is a list heading and gets set larger than the items. */
  heading?: boolean;
  caption?: string;
  bg: string;
};

function arg(name: string, fallback?: string) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Reading time per line. A three-word line and a twenty-word line cannot get
 * the same beat, but a very short line still needs long enough to land.
 */
function lineSeconds(line: string) {
  return Math.min(4.2, Math.max(1.45, 0.95 + line.length * 0.052));
}

/**
 * A ten-line list would run past the point where anyone is still watching, so
 * long posts get squeezed uniformly rather than truncated. Nothing is cut.
 */
function paceLines(lines: string[]) {
  const raw = lines.map(lineSeconds);
  const total = raw.reduce((n, s) => n + s, 0);
  if (total <= MAX_BODY_SECONDS) return raw;
  const squeeze = MAX_BODY_SECONDS / total;
  return raw.map((s) => s * squeeze);
}

/**
 * The page sizes itself: it starts at SIZE_MAX and steps down until the block
 * fits the box. Doing it in the browser means the measurement is the real
 * laid-out height - emoji, wrapping and all - not an estimate.
 */
function buildHtml(short: Short) {
  const body = short.lines
    .map((line, i) => {
      if (!line.trim()) return `<div class="sp"></div>`;
      const isHeading = i === 0 && short.heading;
      // A short line is a break the post author chose, so it must not get
      // re-wrapped into two rows - the type shrinks instead. Genuinely long
      // prose lines are left free to wrap or they would drag the whole block
      // down to unreadable. The heading is allowed to wrap the way it does in
      // Louis's own shorts.
      // In a list post every item is one row, the way Louis's own list shorts
      // read; elsewhere only the short deliberate breaks are held.
      const isListItem = Boolean(short.heading) && !isHeading;
      const tight = !isHeading && (isListItem || line.trim().length <= TIGHT_CHARS)
        ? ' data-tight="1"'
        : "";
      return `<div class="${isHeading ? "l h" : "l"}"${tight}>${escapeHtml(line)}</div>`;
    })
    .join("\n");

  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
html,body{margin:0;padding:0;width:${W}px;height:${H}px;background:transparent;overflow:hidden}
/* Louis's own shorts sit the text on a darkened frame rather than relying on a
   heavy shadow halo. The scrim rides in the same transparent PNG, so it darkens
   the video underneath when the layer is composited. */
#stage{width:${W}px;height:${H}px;display:flex;align-items:center;justify-content:center;
  background:rgba(0,0,0,.42)}
#block{width:${TEXT_W}px;text-align:center;color:#fff;
  font-family:"Segoe UI","Segoe UI Emoji","Segoe UI Symbol",sans-serif;
  font-weight:700;line-height:1.28;
  /* With the scrim doing the contrast work, the shadow only needs to soften the
     edges - the old triple halo is what read as "too bold". */
  text-shadow:0 2px 6px rgba(0,0,0,.75);
  -webkit-font-smoothing:antialiased}
.l{margin:0}
.sp{height:.6em}
.h{font-size:1.32em;font-weight:800;padding-bottom:.14em}
</style></head><body>
<div id="stage"><div id="block">
${body}
</div></div>
<script>
(function(){
  var b=document.getElementById('block'),s=${SIZE_MAX};
  var tight=[].slice.call(b.querySelectorAll('[data-tight]'));
  /** A tight line that grew past one row means the author's break was broken. */
  function wrapped(el){
    var lh=parseFloat(getComputedStyle(el).lineHeight)||1;
    return el.offsetHeight > lh*1.5;
  }
  function fits(){
    if(b.scrollHeight>${TEXT_H}) return false;
    for(var i=0;i<tight.length;i++) if(wrapped(tight[i])) return false;
    return true;
  }
  b.style.fontSize=s+'px';
  while(s>${SIZE_MIN} && !fits()){ s-=2; b.style.fontSize=s+'px'; }
  b.setAttribute('data-size',s);
})();
</script>
</body></html>`;
}

function drawText(short: Short) {
  if (!CHROME) throw new Error("Chrome not found - needed to draw the text layer.");
  const htmlPath = join(WORK_DIR, `${short.id}.html`);
  const pngPath = join(WORK_DIR, `${short.id}.png`);
  writeFileSync(htmlPath, buildHtml(short), "utf8");

  const dom = execFileSync(
    CHROME,
    [
      "--headless=new", "--disable-gpu", "--hide-scrollbars",
      "--force-device-scale-factor=1",
      // Transparent backdrop so only the glyphs land on the video.
      "--default-background-color=00000000",
      `--window-size=${W},${H}`,
      `--screenshot=${pngPath}`,
      "--dump-dom",
      `file:///${htmlPath.replace(/\\/g, "/")}`,
    ],
    { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
  );

  if (!existsSync(pngPath)) throw new Error(`Chrome did not write ${pngPath}`);
  const size = dom.match(/data-size="(\d+)"/)?.[1] ?? "?";
  return { pngPath, size };
}

function render(short: Short, musicOffset: number) {
  const bg = join(BG_DIR, short.bg);
  if (!existsSync(bg)) throw new Error(`Background missing: ${bg}`);
  if (!existsSync(MUSIC)) throw new Error(`Music bed missing: ${MUSIC}`);

  mkdirSync(WORK_DIR, { recursive: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const spoken = short.lines.filter((l) => l.trim());
  const durations = paceLines(spoken);
  const total = durations.reduce((n, s) => n + s, 0) + HEAD_SECONDS + TAIL_SECONDS;

  const { pngPath, size } = drawText(short);
  const out = join(OUT_DIR, `${short.id}.mp4`);
  const fadeOut = Math.max(0, total - 1.4);

  // No grade, no darkening, no vignette - the backgrounds arrive already
  // coloured. The scale/crop pair is a no-op at 1080x1920 and only catches an
  // odd-sized clip. The text is a straight alpha composite, solid from frame
  // one, no fade.
  const filter = [
    `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}[bgv];`,
    `[bgv][1:v]overlay=0:0:format=auto[v];`,
    `[2:a]volume=0.42,afade=t=in:st=0:d=1.2,afade=t=out:st=${fadeOut.toFixed(2)}:d=1.4[a]`,
  ].join("");

  const args = [
    "-hide_banner", "-loglevel", "error", "-y",
    "-stream_loop", "-1", "-i", bg,
    "-loop", "1", "-i", pngPath,
    "-ss", musicOffset.toFixed(2), "-i", MUSIC,
    "-filter_complex", filter,
    "-map", "[v]", "-map", "[a]",
    "-t", total.toFixed(2),
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
    "-pix_fmt", "yuv420p", "-r", String(FPS),
    "-c:a", "aac", "-b:a", "192k", "-ar", "44100",
    "-movflags", "+faststart",
    out,
  ];

  execFileSync(FFMPEG, args, { stdio: ["ignore", "inherit", "inherit"] });
  console.log(`[${short.id}] ${total.toFixed(1)}s  ${size}px  bg=${short.bg}`);
  return out;
}

const queue = JSON.parse(readFileSync(join(ROOT, "data", "shorts-queue.json"), "utf8")) as {
  shorts: Short[];
};

const only = arg("id");
const all = process.argv.includes("--all");
const targets = only ? queue.shorts.filter((s) => s.id === only) : all ? queue.shorts : queue.shorts.slice(0, 1);

if (!targets.length) throw new Error(`No short matched --id=${only}`);

targets.forEach((short, i) => {
  // Different start point per short so eighteen uploads don't open on the
  // identical bar of music.
  render(short, 8 + ((i * 17) % 150));
});
