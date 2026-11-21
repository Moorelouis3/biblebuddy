#!/usr/bin/env node
/**
 * Writes app/bible-covers-remap.generated.css: every hard-coded colour class
 * the app uses (bg-[#dce7f7], text-gray-900, border-purple-200 ...), sorted by
 * lightness and hue into the Bible Cover palette. Only applies under
 * html[data-bb-cover], so the plain app is untouched.
 *
 * Why generated: about 900 places hard-code a colour instead of using the
 * theme tokens. Patching them by hand per screen was slow and patchy; reading
 * them from the source keeps every screen covered as the app grows. Re-run
 * after adding screens:  node scripts/generate-cover-remap.mjs
 *
 * The palette (Louis, 2026-11-21): navy, slate, icy blue, amber; evergreen
 * only for done; red only where it means an error or delete. No pastel
 * tints of the old colours - "its lazy to just lighten the color up".
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { join } from "path";

const ROOTS = ["app", "components"];
const SKIP = /node_modules|\.next|app[\\/]admin|components[\\/]admin|app[\\/]blog/;
const files = [];
(function walk(dirs) {
  for (const dir of dirs) {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (SKIP.test(p)) continue;
      const st = statSync(p);
      if (st.isDirectory()) walk([p]);
      else if (/\.tsx$/.test(name)) files.push(p);
    }
  }
})(ROOTS);

const TW_HUES = {
  slate: "gray", gray: "gray", zinc: "gray", neutral: "gray", stone: "gray",
  red: "red", rose: "red",
  orange: "warm", amber: "warm", yellow: "warm",
  lime: "done", green: "done", emerald: "done", teal: "done",
  cyan: "cool", sky: "cool", blue: "cool", indigo: "cool",
  violet: "cool", purple: "cool", fuchsia: "cool", pink: "cool",
};

function hexToHsl(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16) / 255, g = parseInt(h.slice(2, 4), 16) / 255, b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  let s = 0, hue = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    hue = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    hue *= 60;
  }
  return { h: hue, s, l };
}

function hueFamily({ h, s }) {
  if (s < 0.15) return "gray";
  if (h < 15 || h >= 340) return "red";
  if (h < 65) return "warm";
  if (h < 170) return "done";
  return "cool"; // blues, indigos, violets, pinks: the cover's cool side
}

/** -> { kind: bg|text|border, family, tone: light|mid|strong|dark } */
function classify(cls) {
  let m = cls.match(/^(bg|text|border)-\[#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\]$/);
  if (m) {
    const hsl = hexToHsl(m[2]);
    const tone = hsl.l > 0.86 ? "light" : hsl.l > 0.68 ? "mid" : hsl.l > 0.3 ? "strong" : "dark";
    return { kind: m[1], family: hueFamily(hsl), tone };
  }
  m = cls.match(/^(bg|text|border)-(slate|gray|zinc|neutral|stone|red|rose|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink)-(50|100|200|300|400|500|600|700|800|900|950)$/);
  if (m) {
    const n = Number(m[3]);
    const tone = n <= 100 ? "light" : n <= 300 ? "mid" : n <= 600 ? "strong" : "dark";
    return { kind: m[1], family: TW_HUES[m[2]], tone };
  }
  // Semi-transparent white chips and pills (bg-white/70 ...): light tiles.
  if (/^bg-white\/\d+$/.test(cls)) return { kind: "bg", family: "gray", tone: "light" };
  return null;
}

const found = new Set();
for (const f of files) {
  const src = readFileSync(f, "utf8");
  for (const m of src.matchAll(/(?<![\w:-])(?:bg|text|border)-(?:\[#[0-9a-fA-F]{3,6}\]|[a-z]+-\d{2,3})(?![\w\]/-])/g)) found.add(m[0]);
  for (const m of src.matchAll(/(?<![\w:-])bg-white\/\d+(?![\w\]-])/g)) found.add(m[0]);
}

// What each class becomes. Values are cover tokens, so every cover works.
const TARGET = {
  bg: {
    light: () => "background-color: var(--bb-cover-tile) !important;",
    mid: (f) => f === "red" ? null : "background-color: var(--bb-cover-tile-strong) !important;",
    strong: (f) => f === "red" ? null
      : f === "done" ? "background-color: var(--bb-cover-done-soft) !important; color: #e6f4ec !important;"
      : f === "gray" ? "background-color: var(--bb-cover-tile-strong) !important;"
      : "background-color: var(--bb-cover-warm) !important; color: var(--bb-cover-warm-text) !important;",
    dark: (f) => f === "red" ? null : "background-color: var(--bb-cover-panel-strong) !important;",
  },
  text: {
    light: () => "color: var(--bb-text-primary) !important;",
    mid: (f) => f === "red" ? null : f === "gray" ? "color: var(--bb-text-muted) !important;" : `color: var(${f === "warm" ? "--bb-cover-warm" : f === "done" ? "--bb-cover-done" : "--bb-cover-cool"}) !important;`,
    strong: (f) => f === "red" ? null : f === "gray" ? "color: var(--bb-text-secondary) !important;" : `color: var(${f === "warm" ? "--bb-cover-warm" : f === "done" ? "--bb-cover-done" : "--bb-cover-cool"}) !important;`,
    dark: (f) => f === "red" ? null : f === "gray" ? "color: var(--bb-text-primary) !important;" : `color: var(${f === "warm" ? "--bb-cover-warm" : f === "done" ? "--bb-cover-done" : "--bb-text-primary"}) !important;`,
  },
  border: {
    light: () => "border-color: var(--bb-cover-frame) !important;",
    mid: (f) => f === "red" ? null : "border-color: var(--bb-cover-frame-strong) !important;",
    strong: (f) => f === "red" ? null : f === "gray" ? "border-color: var(--bb-cover-frame-strong) !important;" : `border-color: var(${f === "warm" ? "--bb-cover-warm" : f === "done" ? "--bb-cover-done" : "--bb-cover-cool"}) !important;`,
    dark: (f) => f === "red" ? null : "border-color: var(--bb-cover-frame-strong) !important;",
  },
};

const escape = (cls) => cls.replace(/([\[\]#()/.,:%])/g, "\\$1");
const groups = new Map();
for (const cls of [...found].sort()) {
  const c = classify(cls);
  if (!c) continue;
  const rule = TARGET[c.kind][c.tone](c.family);
  if (!rule) continue;
  if (!groups.has(rule)) groups.set(rule, []);
  groups.get(rule).push(`.${escape(cls)}`);
}

let out = `/* GENERATED by scripts/generate-cover-remap.mjs - do not edit by hand.
 * ${found.size} colour classes found in ${files.length} files; re-run after adding screens.
 * Loaded before app/bible-covers.css, so the hand-written hooks there win. */
`;
for (const [rule, sels] of groups) {
  out += `\nhtml[data-bb-cover] :is(${sels.join(", ")}) { ${rule} }\n`;
}
writeFileSync("app/bible-covers-remap.generated.css", out);
console.log(`Wrote app/bible-covers-remap.generated.css: ${[...groups.values()].reduce((n, s) => n + s.length, 0)} classes in ${groups.size} rules.`);
