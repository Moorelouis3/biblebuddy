import { config } from "dotenv";
import { execFileSync } from "child_process";
import { createServer } from "http";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { extname, join } from "path";

/**
 * Approval page for generated Shorts.
 *
 *   npx tsx scripts/shorts-approval-server.ts
 *   -> http://localhost:4400
 *
 * Deliberately a separate server rather than routes bolted onto the Creator
 * Buddy dashboard, so a mistake here cannot take that down.
 *
 * Approving does not upload. It renders the video and appends the short to
 * data/shorts-schedule.json in the next free slots; uploading stays on the
 * 5-a-day cadence via upload-shorts.mjs --next.
 */

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const ROOT = process.cwd();
const PENDING = join(ROOT, "data", "shorts-pending.json");
const QUEUE = join(ROOT, "data", "shorts-queue.json");
const SCHEDULE = join(ROOT, "data", "shorts-schedule.json");
const PREVIEW_DIR = join(ROOT, "tmp", "shorts", "previews");
const PORT = 4400;

/** Berlin local times, five a day. */
const SLOTS = ["02:00", "06:00", "12:00", "16:00", "20:00"];

type Candidate = {
  id: string; sourceId: string; score: number; posted: string; sourceText: string;
  title: string; lines: string[]; bg: string; preview: string;
  status: "pending" | "approved" | "rejected" | "scheduled";
  scheduledFor?: string;
};

const readJson = <T,>(path: string, fallback: T): T =>
  existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : fallback;

function loadPending(): Candidate[] { return readJson<Candidate[]>(PENDING, []); }
function savePending(rows: Candidate[]) { writeFileSync(PENDING, JSON.stringify(rows, null, 2)); }

/** Next free 5-a-day slots after everything already scheduled. */
function nextSlots(count: number) {
  const schedule = readJson<Array<{ date: string; time: string }>>(SCHEDULE, []);
  const taken = new Set(schedule.map((r) => `${r.date} ${r.time}`));

  const lastDate = schedule.map((r) => r.date).sort().pop();
  const cursor = lastDate ? new Date(`${lastDate}T00:00:00Z`) : new Date();
  if (!lastDate) cursor.setUTCDate(cursor.getUTCDate() + 1);

  const out: Array<{ date: string; time: string }> = [];
  let guard = 0;
  while (out.length < count && guard++ < 400) {
    const date = cursor.toISOString().slice(0, 10);
    for (const time of SLOTS) {
      if (out.length >= count) break;
      if (!taken.has(`${date} ${time}`)) out.push({ date, time });
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

function renderAndSchedule(approved: Candidate[]) {
  const queue = readJson<any[]>(QUEUE, []);
  const schedule = readJson<any[]>(SCHEDULE, []);
  const slots = nextSlots(approved.length);
  const results: Array<{ id: string; ok: boolean; slot?: string; error?: string }> = [];

  approved.forEach((candidate, index) => {
    const slot = slots[index];
    try {
      // render-short.ts reads from shorts-queue.json, so the entry lands there first.
      if (!queue.some((q) => q.id === candidate.id)) {
        queue.push({
          id: candidate.id, likes: candidate.score, posted: candidate.posted,
          title: candidate.title, lines: candidate.lines, bg: candidate.bg,
        });
        writeFileSync(QUEUE, JSON.stringify(queue, null, 2));
      }

      execFileSync("npx", ["tsx", "scripts/render-short.ts", `--id=${candidate.id}`],
        { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"], shell: true });

      schedule.push({
        file: `${candidate.id}.mp4`, title: candidate.title, likes: candidate.score,
        date: slot.date, time: slot.time,
        caption: candidate.sourceText.replace(/\s+/g, " ").slice(0, 300),
      });
      writeFileSync(SCHEDULE, JSON.stringify(schedule, null, 2));

      candidate.status = "scheduled";
      candidate.scheduledFor = `${slot.date} ${slot.time}`;
      results.push({ id: candidate.id, ok: true, slot: `${slot.date} ${slot.time}` });
    } catch (error) {
      results.push({ id: candidate.id, ok: false, error: (error as Error).message.slice(0, 200) });
    }
  });

  return results;
}

const PAGE = `<!doctype html><html><head><meta charset="utf-8">
<title>Shorts approval</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box}
body{margin:0;background:#0d0d10;color:#e9e9ee;font:15px/1.5 "Segoe UI",system-ui,sans-serif}
header{position:sticky;top:0;z-index:10;background:#15151b;border-bottom:1px solid #26262f;
  padding:14px 20px;display:flex;gap:14px;align-items:center;flex-wrap:wrap}
h1{font-size:17px;margin:0;font-weight:600}
.count{color:#9a9aa8;font-size:13px}
button{background:#2b2b36;color:#e9e9ee;border:1px solid #3a3a48;border-radius:7px;
  padding:8px 14px;font-size:14px;cursor:pointer}
button:hover{background:#343442}
button.go{background:#1f7a4d;border-color:#2a9e64}
button.go:hover{background:#25925c}
button.no{background:#7a2b2b;border-color:#9e3a3a}
#grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:18px;padding:20px}
.card{background:#15151b;border:1px solid #26262f;border-radius:11px;overflow:hidden;display:flex;flex-direction:column}
.card.yes{border-color:#2a9e64;box-shadow:0 0 0 1px #2a9e64}
.card.no{opacity:.34}
.shot{width:100%;aspect-ratio:9/16;background:#000 center/cover no-repeat;cursor:pointer}
.meta{padding:10px 12px;font-size:12.5px;color:#9a9aa8;display:flex;justify-content:space-between;gap:8px}
.title{color:#e9e9ee;font-weight:600;font-size:13.5px}
.btns{display:flex;border-top:1px solid #26262f}
.btns button{flex:1;border:0;border-radius:0;padding:10px}
.scheduled{padding:10px 12px;font-size:12.5px;color:#2a9e64;border-top:1px solid #26262f}
#log{padding:0 20px 30px;color:#9a9aa8;font-size:13px;white-space:pre-wrap}
</style></head><body>
<header>
  <h1>Shorts approval</h1>
  <span class="count" id="count"></span>
  <button onclick="markAll('yes')">Yes to all</button>
  <button onclick="markAll('no')">No to all</button>
  <button class="go" onclick="submit()">Approve &amp; schedule</button>
</header>
<div id="grid"></div>
<div id="log"></div>
<script>
let rows=[],marks={};
async function load(){
  rows=await (await fetch('/api/pending')).json();
  document.getElementById('count').textContent=rows.length+' waiting';
  render();
}
function markAll(v){ rows.forEach(r=>{ if(r.status==='pending') marks[r.id]=v }); render(); }
function mark(id,v){ marks[id]=marks[id]===v?undefined:v; render(); }
function render(){
  document.getElementById('grid').innerHTML=rows.map(r=>{
    const m=marks[r.id];
    const done=r.status==='scheduled';
    return '<div class="card '+(m||'')+'">'
      +'<div class="shot" data-shot="'+r.id+'" onclick="mark(\\''+r.id+'\\',\\'yes\\')"></div>'
      +'<div class="meta"><span class="title">'+r.title+'</span><span>'+r.score+'</span></div>'
      +(done
        ? '<div class="scheduled">scheduled '+r.scheduledFor+'</div>'
        : '<div class="btns"><button class="no" onclick="mark(\\''+r.id+'\\',\\'no\\')">No</button>'
          +'<button class="go" onclick="mark(\\''+r.id+'\\',\\'yes\\')">Yes</button></div>')
      +'</div>';
  }).join('');
  // Applied here rather than in a style attribute: a data URI contains
  // characters that would terminate the attribute early.
  rows.forEach(function(r){
    if(!r.inline) return;
    var el=document.querySelector('[data-shot="'+r.id+'"]');
    if(el) el.style.backgroundImage='url("'+r.inline+'")';
  });
}
async function submit(){
  const yes=Object.keys(marks).filter(k=>marks[k]==='yes');
  const no=Object.keys(marks).filter(k=>marks[k]==='no');
  if(!yes.length&&!no.length){ alert('Nothing marked.'); return; }
  const log=document.getElementById('log');
  log.textContent='Rendering '+yes.length+' short(s). This takes about a minute each...';
  const res=await (await fetch('/api/decide',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({yes,no})})).json();
  log.textContent=res.summary+'\\n'+(res.results||[]).map(r=>
    (r.ok?'  ok   '+r.id+'  -> '+r.slot:'  FAIL '+r.id+'  '+r.error)).join('\\n');
  marks={}; load();
}
load();
</script></body></html>`;

createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);

  if (url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    return res.end(PAGE);
  }

  if (url.pathname === "/api/pending") {
    // Previews ship inline as data URIs rather than as <img src> subresources.
    // A browser extension on this machine rewrites image elements to a 1x1
    // placeholder, so anything fetched separately never arrives; a data URI has
    // no request to intercept.
    const rows = loadPending().map((row) => {
      const file = join(PREVIEW_DIR, row.preview);
      const inline = existsSync(file)
        ? `data:image/jpeg;base64,${readFileSync(file).toString("base64")}`
        : null;
      return { ...row, inline };
    });
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(rows));
  }

  if (url.pathname.startsWith("/previews/")) {
    const name = decodeURIComponent(url.pathname.slice("/previews/".length));
    const file = join(PREVIEW_DIR, name);
    // Keep the handler inside the preview directory.
    if (!file.startsWith(PREVIEW_DIR) || !existsSync(file)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": extname(file) === ".png" ? "image/png" : "image/jpeg" });
    return res.end(readFileSync(file));
  }

  if (url.pathname === "/api/decide" && req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    const { yes = [], no = [] } = JSON.parse(body || "{}");

    const rows = loadPending();
    for (const row of rows) {
      if (no.includes(row.id)) row.status = "rejected";
      if (yes.includes(row.id) && row.status === "pending") row.status = "approved";
    }

    const approved = rows.filter((r) => yes.includes(r.id) && r.status === "approved");
    const results = renderAndSchedule(approved);
    savePending(rows);

    const ok = results.filter((r) => r.ok).length;
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify({
      summary: `${ok} scheduled, ${results.length - ok} failed, ${no.length} rejected. Upload stays at 5/day - run: node upload-shorts.mjs --next --tz-offset=+02:00`,
      results,
    }));
  }

  res.writeHead(404);
  res.end();
}).listen(PORT, () => {
  const pending = loadPending().filter((r) => r.status === "pending").length;
  console.log(`Shorts approval on http://localhost:${PORT}  (${pending} waiting)`);
});
