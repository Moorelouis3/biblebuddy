// node book-import2.js <folder holding the book's 00-…-Map and 01-… folders> "<Book Name>"
const fs = require("fs");
const sharp = require("C:/Users/Moore/Desktop/biblebuddy-64b2c5e17859ed53fac72e910f85cda25c78337e/node_modules/sharp");
const [, , L0, BOOK] = process.argv;
const L = L0.replace(/\/?$/, "/");
const W = "C:/Users/Moore/Desktop/biblebuddy-match/";
const key = BOOK.toLowerCase().replace(/\s+/g, "-");
const report = { book: BOOK, boards: [], newTiles: [], problems: [] };

async function trace(src) {
  const Wd = 270, H = 1170;
  const { data } = await sharp(src).resize(Wd, H).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => { const i = (y * Wd + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };
  // The path colour: the most common warm sand colour in the bottom middle.
  const counts = new Map();
  for (let y = H - 40; y < H; y += 2) for (let x = Math.round(Wd * 0.25); x < Wd * 0.75; x++) {
    const c = px(x, y);
    if (c[0] > 215 && c[1] > 150 && c[1] < 225 && c[2] < 150 && c[0] - c[2] > 90) {
      const k = c.map((v) => Math.round(v / 12) * 12).join(",");
      counts.set(k, (counts.get(k) || 0) + 1);
    }
  }
  const ref = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]?.split(",").map(Number);
  if (!ref) return null;
  const near = (c) => Math.abs(c[0] - ref[0]) + Math.abs(c[1] - ref[1]) + Math.abs(c[2] - ref[2]) < 65;
  let prev = Wd * 0.45;
  const pts = [];
  let misses = 0;
  for (let p = 99.5; p >= 0; p -= 2.5) {
    const y = Math.min(H - 1, Math.round((p / 100) * H));
    const runs = [];
    let s = -1;
    for (let x = 0; x < Wd; x++) {
      const ok = near(px(x, y));
      if (ok && s < 0) s = x;
      if ((!ok || x === Wd - 1) && s >= 0) { const e = ok ? x : x - 1; if (e - s >= 12) runs.push([s, e]); s = -1; }
    }
    if (!runs.length) { misses++; continue; }
    runs.sort((a, b) => Math.abs((a[0] + a[1]) / 2 - prev) - Math.abs((b[0] + b[1]) / 2 - prev));
    const c = (runs[0][0] + runs[0][1]) / 2;
    // A jump of more than a quarter of the width between two rows is another sand patch, not the path.
    if (pts.length && Math.abs(c - prev) > Wd * 0.25) { misses++; continue; }
    prev = c;
    pts.push([Math.round((c / Wd) * 100), p]);
  }
  return { pts, misses, ref };
}

(async () => {
  const gen = JSON.parse(fs.readFileSync(W + "lib/match/boards.generated.json"));
  const out = gen.filter((b) => !b.slug.startsWith(key + "-"));
  const dirs = fs.readdirSync(L).filter((d) => /^\d\d-/.test(d)).sort();
  for (const folder of dirs) {
    if (folder.startsWith("00")) continue;
    const d = L + folder + "/";
    let raw, cfg;
    try { raw = fs.readFileSync(d + "board-config.json", "utf8"); cfg = JSON.parse(raw); } catch { report.problems.push(folder + ": board-config.json missing or bad"); continue; }
    const slug = key + "-" + String(cfg.level).padStart(2, "0");
    const files = fs.readdirSync(d).map((f) => f.replace(/\.png$/, ""));
    if (cfg.tiles.length !== 7) report.problems.push(slug + ": " + cfg.tiles.length + " tiles");
    for (const t of cfg.tiles) if (!files.includes(t) && !fs.existsSync(W + "public/games/match/tiles/" + t + ".webp")) report.problems.push(slug + ": tile " + t + " has no art");
    for (const g of Object.keys(cfg.goals)) if (!cfg.tiles.includes(g)) report.problems.push(slug + ": goal " + g + " not a tile");
    for (const f of ["background-phone", "background-desktop", "win-screen"]) if (!files.includes(f)) report.problems.push(slug + ": " + f + ".png missing");
    const bdir = W + "public/games/match/boards/" + slug + "/";
    fs.mkdirSync(bdir, { recursive: true });
    fs.writeFileSync(bdir + "board-config.json", raw);
    for (const [k, w] of [["phone", 1080], ["desktop", 1920]]) if (files.includes("background-" + k)) await sharp(d + "background-" + k + ".png").resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(bdir + "background-" + k + ".webp");
    if (files.includes("board-preview")) { fs.mkdirSync(W + "docs/match-board-previews", { recursive: true }); fs.copyFileSync(d + "board-preview.png", W + "docs/match-board-previews/" + slug + ".png"); }
    if (files.includes("win-screen")) {
      const ws = await sharp(d + "win-screen.png").metadata();
      if (Math.abs(ws.width / ws.height - 851 / 1848) > 0.02) report.problems.push(slug + ": win screen is " + ws.width + "x" + ws.height);
      await sharp(d + "win-screen.png").resize({ width: 851, withoutEnlargement: true }).webp({ quality: 82 }).toFile(W + "public/games/match/transitions/" + slug + ".webp");
    }
    for (const t of cfg.tiles) {
      const o = W + "public/games/match/tiles/" + t + ".webp";
      if (fs.existsSync(o) || !files.includes(t)) continue;
      await sharp(d + t + ".png").resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 85 }).toFile(o);
      report.newTiles.push(t);
    }
    // The scripture must name this book. ChatGPT once wrote "Numbers" on 46 boards of
    // five other books (2026-11-23); the chapters were right, the book was not.
    const firstWord = (cfg.scripture || "").match(/^(\d\s+)?[A-Za-z]+/)?.[0] || "";
    if (firstWord && firstWord.toLowerCase().replace(/\s+/g, " ") !== BOOK.toLowerCase()) {
      report.problems.push(slug + ": scripture said " + cfg.scripture + ", fixed to " + BOOK);
      cfg.scripture = cfg.scripture.replace(firstWord, BOOK);
      fs.writeFileSync(bdir + "board-config.json", JSON.stringify(cfg, null, 2) + "\n");
    }
    out.push({ slug, folderTitle: folder, ...cfg, chapter: BOOK });
    report.boards.push(slug + " " + cfg.name + " | " + JSON.stringify(cfg.goals));
  }
  const mapDir = dirs.find((d) => d.startsWith("00"));
  if (!mapDir || !fs.existsSync(L + mapDir + "/map-phone.png")) report.problems.push("map-phone.png missing");
  else {
    const src = L + mapDir + "/map-phone.png";
    const meta = await sharp(src).metadata();
    report.map = meta.width + "x" + meta.height;
    await sharp(src).resize({ width: 1080, withoutEnlargement: true }).webp({ quality: 78 }).toFile(W + "public/games/match/ui/map-" + key + "-phone.webp");
    const t = await trace(src);
    if (!t || t.pts.length < 25) report.problems.push("map path: could not trace (" + (t ? t.pts.length : 0) + " points)");
    const preview = "data:image/webp;base64," + (await sharp(src).resize(24, 104).webp({ quality: 40 }).toBuffer()).toString("base64");
    const maps = JSON.parse(fs.readFileSync(W + "lib/match/maps.generated.json", "utf8"));
    maps[BOOK] = { src: "/games/match/ui/map-" + key + "-phone.webp", path: t ? t.pts : [], preview };
    fs.writeFileSync(W + "lib/match/maps.generated.json", JSON.stringify(maps, null, 1) + "\n");
    report.trace = t ? { points: t.pts.length, misses: t.misses, ref: t.ref } : null;
  }
  fs.writeFileSync(W + "lib/match/boards.generated.json", JSON.stringify(out, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
