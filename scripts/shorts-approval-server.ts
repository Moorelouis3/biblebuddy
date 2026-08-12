import { config } from "dotenv";
import { spawn } from "child_process";
import { createServer } from "http";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

/**
 * Shorts approval + schedule board.
 *
 *   npx tsx scripts/shorts-approval-server.ts
 *   http://localhost:4400            approve queue
 *   http://localhost:4400/schedule   everything booked
 *
 * Clicking Yes books the next free slot immediately and the card leaves the
 * grid. Rendering happens on a background worker afterwards, because a render
 * takes the better part of a minute and there is no reason to make the click
 * wait for it.
 *
 * Approving never uploads. Uploads stay on the 5-a-day cadence via
 * upload-shorts.mjs --next.
 */

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const ROOT = process.cwd();
const PENDING = join(ROOT, "data", "shorts-pending.json");
const QUEUE = join(ROOT, "data", "shorts-queue.json");
const SCHEDULE = join(ROOT, "data", "shorts-schedule.json");
const PREVIEW_DIR = join(ROOT, "tmp", "shorts", "previews");
const UPLOAD_LOG = "C:/Users/Moore/Desktop/youtube-shorts-automation/data/bible-shorts-uploaded.json";
const PORT = 4400;

/** Berlin local times, five a day. */
const SLOTS = ["02:00", "06:00", "12:00", "16:00", "20:00"];
/** Keep the runway at least this far out. */
const TARGET_DAYS_AHEAD = 14;

type Candidate = {
  id: string; sourceId: string; score: number; posted: string; sourceText: string;
  title: string; lines: string[]; bg: string; preview: string;
  status: "pending" | "approved" | "rejected" | "scheduled" | "failed";
  scheduledFor?: string; error?: string;
};
type Slot = { date: string; time: string };

const readJson = <T,>(path: string, fallback: T): T =>
  existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : fallback;

const loadPending = () => readJson<Candidate[]>(PENDING, []);
const savePending = (rows: Candidate[]) => writeFileSync(PENDING, JSON.stringify(rows, null, 2));

/** shorts-queue.json is {_note, shorts}, not a bare array. */
function loadQueue(): { wrapper: Record<string, unknown>; shorts: any[] } {
  const raw = readJson<any>(QUEUE, { shorts: [] });
  if (Array.isArray(raw)) return { wrapper: {}, shorts: raw };
  return { wrapper: raw, shorts: Array.isArray(raw.shorts) ? raw.shorts : [] };
}
function saveQueue(wrapper: Record<string, unknown>, shorts: any[]) {
  const out = Array.isArray(wrapper) ? shorts : { ...wrapper, shorts };
  writeFileSync(QUEUE, JSON.stringify(out, null, 2));
}

const loadSchedule = () => readJson<any[]>(SCHEDULE, []);
const saveSchedule = (rows: any[]) => writeFileSync(SCHEDULE, JSON.stringify(rows, null, 2));

function bookSlot(): Slot {
  const schedule = loadSchedule();
  const taken = new Set(schedule.map((r) => `${r.date} ${r.time}`));
  const lastDate = schedule.map((r) => r.date).sort().pop();

  const cursor = lastDate ? new Date(`${lastDate}T00:00:00Z`) : new Date();
  for (let guard = 0; guard < 500; guard += 1) {
    const date = cursor.toISOString().slice(0, 10);
    for (const time of SLOTS) {
      if (!taken.has(`${date} ${time}`)) return { date, time };
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  throw new Error("no free slot found");
}

function daysAhead() {
  const dates = loadSchedule().map((r) => r.date).sort();
  if (!dates.length) return 0;
  const last = new Date(`${dates[dates.length - 1]}T00:00:00Z`).getTime();
  return Math.max(0, Math.round((last - Date.now()) / 86400000));
}

// --- render worker -----------------------------------------------------------

const renderQueue: string[] = [];
let rendering: string | null = null;

function pumpRenderQueue() {
  if (rendering || !renderQueue.length) return;
  const id = renderQueue.shift() as string;
  rendering = id;

  const child = spawn("npx", ["tsx", "scripts/render-short.ts", `--id=${id}`],
    { cwd: ROOT, shell: true, stdio: ["ignore", "pipe", "pipe"] });

  let stderr = "";
  child.stderr.on("data", (d) => { stderr += d.toString(); });
  child.on("close", (code) => {
    const rows = loadPending();
    const row = rows.find((r) => r.id === id);
    if (row) {
      if (code === 0) row.status = "scheduled";
      else { row.status = "failed"; row.error = stderr.slice(-200) || `render exited ${code}`; }
      savePending(rows);
    }
    console.log(`[render] ${id} ${code === 0 ? "ok" : "FAILED"}  (${renderQueue.length} queued)`);
    rendering = null;
    pumpRenderQueue();
  });
}

/** Books the slot and writes the files. Render is queued, not awaited. */
function approve(id: string) {
  const rows = loadPending();
  const row = rows.find((r) => r.id === id);
  if (!row) return { ok: false, error: "unknown id" };
  if (row.status !== "pending") return { ok: false, error: `already ${row.status}` };

  const slot = bookSlot();

  const { wrapper, shorts } = loadQueue();
  if (!shorts.some((s: any) => s.id === row.id)) {
    shorts.push({ id: row.id, likes: row.score, posted: row.posted, title: row.title, lines: row.lines, bg: row.bg });
    saveQueue(wrapper, shorts);
  }

  const schedule = loadSchedule();
  schedule.push({
    file: `${row.id}.mp4`, title: row.title, likes: row.score,
    date: slot.date, time: slot.time,
    caption: row.sourceText.replace(/\s+/g, " ").slice(0, 300),
  });
  saveSchedule(schedule);

  row.status = "approved";
  row.scheduledFor = `${slot.date} ${slot.time}`;
  savePending(rows);

  renderQueue.push(row.id);
  pumpRenderQueue();

  return { ok: true, slot: `${slot.date} ${slot.time}`, daysAhead: daysAhead() };
}

// --- pages -------------------------------------------------------------------

const STYLE = `*{box-sizing:border-box}
body{margin:0;background:#0d0d10;color:#e9e9ee;font:15px/1.5 "Segoe UI",system-ui,sans-serif}
header{position:sticky;top:0;z-index:10;background:#15151b;border-bottom:1px solid #26262f;
  padding:14px 20px;display:flex;gap:14px;align-items:center;flex-wrap:wrap}
h1{font-size:17px;margin:0;font-weight:600}
a{color:#7fb2ff;text-decoration:none}
.count{color:#9a9aa8;font-size:13px}
.runway{font-size:13px;padding:3px 9px;border-radius:99px;background:#22323f;color:#8fd0ff}
.runway.low{background:#3f2a22;color:#ffb98f}
button{background:#2b2b36;color:#e9e9ee;border:1px solid #3a3a48;border-radius:7px;padding:8px 14px;font-size:14px;cursor:pointer}
button:hover{background:#343442}
button.go{background:#1f7a4d;border-color:#2a9e64}
button.no{background:#7a2b2b;border-color:#9e3a3a}`;

const APPROVE_PAGE = `<!doctype html><html><head><meta charset="utf-8">
<title>Shorts approval</title><meta name="viewport" content="width=device-width,initial-scale=1">
<style>${STYLE}
#grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:18px;padding:20px}
.card{background:#15151b;border:1px solid #26262f;border-radius:11px;overflow:hidden;display:flex;flex-direction:column;
  transition:opacity .35s ease,transform .35s ease}
.card.gone{opacity:0;transform:scale(.94)}
.shot{width:100%;aspect-ratio:9/16;background:#000 center/cover no-repeat;cursor:pointer}
.meta{padding:10px 12px;font-size:12.5px;color:#9a9aa8;display:flex;justify-content:space-between;gap:8px}
.title{color:#e9e9ee;font-weight:600;font-size:13.5px}
.btns{display:flex;border-top:1px solid #26262f}
.btns button{flex:1;border:0;border-radius:0;padding:10px}
#log{padding:0 20px 30px;color:#9a9aa8;font-size:13px;white-space:pre-wrap}
</style></head><body>
<header>
  <h1>Shorts approval</h1>
  <span class="count" id="count"></span>
  <span class="runway" id="runway"></span>
  <button onclick="yesAll()">Yes to all</button>
  <a href="/schedule"><button>Schedule board</button></a>
</header>
<div id="grid"></div>
<div id="log"></div>
<script>
var rows=[];
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
function setRunway(d){
  var el=document.getElementById('runway');
  el.textContent=d+' days booked ahead';
  el.className='runway'+(d<${TARGET_DAYS_AHEAD}?' low':'');
}
function load(){
  fetch('/api/pending').then(function(r){return r.json()}).then(function(d){
    rows=d.rows; setRunway(d.daysAhead);
    document.getElementById('count').textContent=rows.length+' waiting';
    var g=document.getElementById('grid');
    g.innerHTML=rows.map(function(r){
      return '<div class="card" id="c-'+esc(r.id)+'">'
        +'<div class="shot" data-shot="'+esc(r.id)+'" onclick="decide(\\''+r.id+'\\',true)"></div>'
        +'<div class="meta"><span class="title">'+esc(r.title)+'</span><span>'+r.score+'</span></div>'
        +'<div class="btns"><button class="no" onclick="decide(\\''+r.id+'\\',false)">No</button>'
        +'<button class="go" onclick="decide(\\''+r.id+'\\',true)">Yes</button></div></div>';
    }).join('');
    rows.forEach(function(r){
      if(!r.inline) return;
      var el=document.querySelector('[data-shot="'+r.id+'"]');
      if(el) el.style.backgroundImage='url("'+r.inline+'")';
    });
  });
}
function fade(id){
  var c=document.getElementById('c-'+id);
  if(c){ c.classList.add('gone'); setTimeout(function(){ c.remove(); },350); }
  rows=rows.filter(function(r){return r.id!==id});
  document.getElementById('count').textContent=rows.length+' waiting';
}
function decide(id,yes){
  fade(id);
  fetch('/api/decide',{method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({id:id,yes:yes})})
    .then(function(r){return r.json()}).then(function(res){
      if(res.ok&&yes){ setRunway(res.daysAhead);
        document.getElementById('log').textContent='booked '+id+' -> '+res.slot+'   (rendering in background)'; }
      else if(!res.ok){ document.getElementById('log').textContent='FAILED '+id+': '+res.error; }
    });
}
function yesAll(){
  var ids=rows.map(function(r){return r.id});
  if(!ids.length) return;
  if(!confirm('Approve and schedule all '+ids.length+'?')) return;
  ids.forEach(function(id,i){ setTimeout(function(){ decide(id,true) }, i*120); });
}
load();
</script></body></html>`;

const SCHEDULE_PAGE = `<!doctype html><html><head><meta charset="utf-8">
<title>Schedule board</title><meta name="viewport" content="width=device-width,initial-scale=1">
<style>${STYLE}
.wrap{padding:20px;max-width:1000px}
.day{margin-bottom:22px}
.day h2{font-size:14px;color:#9a9aa8;margin:0 0 8px;font-weight:600}
.row{display:flex;gap:12px;align-items:center;background:#15151b;border:1px solid #26262f;
  border-radius:9px;padding:9px 13px;margin-bottom:6px}
.time{color:#7fb2ff;font-variant-numeric:tabular-nums;min-width:52px}
.name{flex:1}
.tag{font-size:12px;padding:2px 8px;border-radius:99px;background:#2b2b36;color:#9a9aa8}
.tag.up{background:#1f7a4d33;color:#63d69b}
.tag.wait{background:#3f2a2233;color:#ffb98f}
</style></head><body>
<header><h1>Schedule board</h1><span class="count" id="count"></span>
<span class="runway" id="runway"></span>
<a href="/"><button>Approve queue</button></a></header>
<div class="wrap" id="wrap"></div>
<script>
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
fetch('/api/schedule').then(function(r){return r.json()}).then(function(d){
  document.getElementById('count').textContent=d.rows.length+' scheduled';
  var el=document.getElementById('runway');
  el.textContent=d.daysAhead+' days booked ahead';
  el.className='runway'+(d.daysAhead<${TARGET_DAYS_AHEAD}?' low':'');
  var byDay={};
  d.rows.forEach(function(r){ (byDay[r.date]=byDay[r.date]||[]).push(r); });
  document.getElementById('wrap').innerHTML=Object.keys(byDay).sort().map(function(date){
    return '<div class="day"><h2>'+date+'</h2>'+byDay[date].sort(function(a,b){
      return a.time<b.time?-1:1;
    }).map(function(r){
      var tag=r.uploaded?'<span class="tag up">uploaded</span>':'<span class="tag wait">not uploaded</span>';
      return '<div class="row"><span class="time">'+r.time+'</span><span class="name">'+esc(r.title)+'</span>'+tag+'</div>';
    }).join('')+'</div>';
  }).join('');
});
</script></body></html>`;

createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);
  const send = (code: number, type: string, body: string | Buffer) => {
    res.writeHead(code, { "content-type": type });
    res.end(body);
  };

  if (url.pathname === "/") return send(200, "text/html; charset=utf-8", APPROVE_PAGE);
  if (url.pathname === "/schedule") return send(200, "text/html; charset=utf-8", SCHEDULE_PAGE);

  if (url.pathname === "/api/pending") {
    // Previews go inline as data URIs: a browser extension on this machine
    // rewrites <img> to a 1x1 placeholder, so a separate fetch never arrives.
    const rows = loadPending()
      .filter((r) => r.status === "pending")
      .map((row) => {
        const file = join(PREVIEW_DIR, row.preview);
        return { ...row, inline: existsSync(file) ? `data:image/jpeg;base64,${readFileSync(file).toString("base64")}` : null };
      });
    return send(200, "application/json", JSON.stringify({ rows, daysAhead: daysAhead() }));
  }

  if (url.pathname === "/api/schedule") {
    const uploaded = readJson<Record<string, unknown>>(UPLOAD_LOG, {});
    const rows = loadSchedule()
      .map((r) => ({ ...r, uploaded: Boolean(uploaded[r.file]) }))
      .sort((a, b) => (a.date + a.time < b.date + b.time ? -1 : 1));
    return send(200, "application/json", JSON.stringify({ rows, daysAhead: daysAhead() }));
  }

  if (url.pathname === "/api/decide" && req.method === "POST") {
    let body = "";
    for await (const chunk of req) body += chunk;
    const { id, yes } = JSON.parse(body || "{}");

    if (!yes) {
      const rows = loadPending();
      const row = rows.find((r) => r.id === id);
      if (row && row.status === "pending") { row.status = "rejected"; savePending(rows); }
      return send(200, "application/json", JSON.stringify({ ok: true, rejected: true }));
    }
    return send(200, "application/json", JSON.stringify(approve(id)));
  }

  send(404, "text/plain", "not found");
}).listen(PORT, () => {
  const pending = loadPending().filter((r) => r.status === "pending").length;
  console.log(`Shorts approval  http://localhost:${PORT}       (${pending} waiting)`);
  console.log(`Schedule board   http://localhost:${PORT}/schedule  (${daysAhead()} days ahead)`);
});
