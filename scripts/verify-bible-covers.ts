/**
 * Bible Covers (lib/bibleCovers.ts, app/bible-covers.css). Offline checks of
 * the rules that keep covers fast and keep the plain app untouched.
 * Run: npm run verify:bible-covers
 */
import { readFileSync, existsSync } from "fs";
import assert from "assert";
import { BIBLE_COVERS, isCoverExcludedPath, bibleCoverCssVars } from "../lib/bibleCovers";

let passed = 0;
const ok = (name: string, fn: () => void) => {
  fn();
  passed += 1;
  console.log(`  ok  ${name}`);
};

const covers = Object.values(BIBLE_COVERS);
const css = readFileSync("app/bible-covers.css", "utf8");
const generated = readFileSync("app/bible-covers-remap.generated.css", "utf8");

ok("eleven covers, Winter Cabin among them", () => {
  assert.equal(covers.length, 11);
  assert.ok(BIBLE_COVERS["winter-cabin"]);
});

ok("every cover's artwork exists on disk", () => {
  for (const cover of covers) {
    for (const src of [cover.art.mobile, cover.art.desktop, cover.art.thumb]) {
      assert.ok(existsSync(`public${src}`), `${cover.id}: missing public${src}`);
    }
  }
});

ok("every cover fills every token (no undefined colours)", () => {
  for (const cover of covers) {
    for (const [name, value] of Object.entries({ ...cover.theme, ...bibleCoverCssVars(cover) })) {
      assert.ok(typeof value === "string" && value.length > 0, `${cover.id}: ${name}`);
    }
  }
});

ok("the page background is transparent so the scene shows", () => {
  for (const cover of covers) assert.equal(cover.theme.background, "transparent");
});

ok("marketing, sign-in and blog pages keep their own look", () => {
  for (const path of ["/", "/login", "/signup", "/blog", "/blog/genesis-1", "/app"]) assert.ok(isCoverExcludedPath(path), path);
  for (const path of ["/dashboard", "/bible/john/3", "/library", "/bb-feed", "/devotionals/abc", "/settings"]) assert.ok(!isCoverExcludedPath(path), path);
});

ok("every cover rule is scoped to html[data-bb-cover] (plain app untouched)", () => {
  const selectors = [...(css + generated).replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/(^|\})\s*([^{}@]+)\{/g)].map((m) => m[2].trim());
  for (const sel of selectors) {
    if (/^(from|to|[\d.]+%)/.test(sel) || sel.startsWith(".bb-cover-")) continue; // keyframes and the backdrop's own layers
    // Split on top-level commas only: :is(a, b) lists stay whole.
    const parts: string[] = [];
    let depth = 0, cur = "";
    for (const ch of sel) {
      if (ch === "(") depth++;
      if (ch === ")") depth--;
      if (ch === "," && depth === 0) { parts.push(cur); cur = ""; } else cur += ch;
    }
    parts.push(cur);
    for (const part of parts) {
      const p = part.trim();
      // The backdrop and its effect layers only exist under a cover.
      if (!p || p.includes(".bb-cover-") || p.includes(".bb-fx-")) continue;
      assert.ok(p.startsWith("html[data-bb-cover"), `unscoped selector: ${p.slice(0, 80)}`);
    }
  }
});

ok("no substring class selectors (what made the old skins slow and patchy)", () => {
  assert.ok(!/\[class\*=/.test((css + generated).replace(/\/\*[\s\S]*?\*\//g, "")));
});

ok("no expensive effects: no blur, no blend modes, no fixed attachment", () => {
  const body = (css + generated).replace(/\/\*[\s\S]*?\*\//g, "");
  assert.ok(!/filter:\s*blur/.test(body), "filter: blur");
  assert.ok(!/mix-blend-mode/.test(body), "mix-blend-mode");
  assert.ok(!/background-attachment:\s*fixed/.test(body), "background-attachment: fixed");
  for (const m of body.matchAll(/backdrop-filter:\s*([^;!]+)/g)) assert.equal(m[1].trim(), "none");
});

ok("the snow and drift only move (transform), never repaint", () => {
  // Balanced braces, so one-line and multi-line keyframes both match.
  const frames = [...css.matchAll(/@keyframes bb-(?:cover|fx)-[a-z-]+\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g)].map((m) => m[1]);
  assert.ok(frames.length >= 10, `only ${frames.length} keyframes found`);
  for (const f of frames) {
    const props = [...f.matchAll(/([a-z-]+)\s*:/g)].map((m) => m[1]);
    for (const prop of props) assert.ok(["transform", "opacity"].includes(prop), `animates ${prop}`);
  }
});

ok("still for reduced motion, low-power devices, and when switched off; paused when hidden", () => {
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /data-bb-perf-reduce="true"\] \.bb-cover-snow/);
  assert.match(css, /data-bb-cover-motion="still"\] \.bb-cover-snow/);
  assert.match(css, /data-bb-app-hidden="true"\] \.bb-cover-snow/);
});

ok("the backdrop is mounted once, in the root layout", () => {
  const layout = readFileSync("app/layout.tsx", "utf8");
  assert.equal(layout.match(/<BibleCoverBackdrop \/>/g)?.length, 1);
  const backdrop = readFileSync("components/BibleCoverBackdrop.tsx", "utf8");
  assert.ok(!/setState\([^)]*\)\s*;?\s*\n?\s*requestAnimationFrame/.test(backdrop));
});

ok("the generated remap is loaded before the hand-written hooks", () => {
  const layout = readFileSync("app/layout.tsx", "utf8");
  assert.ok(layout.indexOf("bible-covers-remap.generated.css") < layout.indexOf('"./bible-covers.css"'));
});

ok("covers are the one design choice: the theme picker is gone, the shelf is in Settings", () => {
  const settings = readFileSync("app/settings/page.tsx", "utf8");
  assert.ok(!settings.includes('title="App theme"'), "App theme section still there");
  assert.match(settings, /<SettingsSection title="Bible cover"[\s\S]*?<BibleCoverPicker \/>/);
  assert.ok(readFileSync("lib/appThemes.ts", "utf8").includes('getAppTheme("light")'));
});

ok("every popup is drawn in the cover: feature popups, custom popups, day complete", () => {
  assert.match(readFileSync("components/popups/FeaturePopup.tsx", "utf8"), /COVER_TONE/);
  for (const f of ["components/NewGamesPopup.tsx", "components/BibleLockPopup.tsx", "components/DevotionalDayCompletionModal.tsx"]) {
    const src = readFileSync(f, "utf8");
    assert.ok(!src.includes('background: "linear-gradient('), `${f} has a gradient the cover cannot reach`);
  }
});

ok("every cover has a light effect, and every effect layer can be stilled", () => {
  const backdrop = readFileSync("components/BibleCoverBackdrop.tsx", "utf8");
  for (const cover of covers) {
    assert.ok(!["drift", "none"].includes(cover.motion), `${cover.id} has no effect`);
    assert.ok(backdrop.includes(`case "${cover.motion}":`), `${cover.id}: no layers for ${cover.motion}`);
  }
  assert.match(css, /data-bb-cover-motion="still"\] \.bb-cover-fx/);
  assert.match(css, /data-bb-app-hidden="true"\] \.bb-cover-fx \{ animation-play-state: paused/);
  for (const tile of ["fireflies", "stars", "embers", "sparkles", "sand", "rain", "petals"]) {
    assert.ok(existsSync(`public/covers/fx/${tile}.png`), tile);
  }
});

ok("the art is not capped at 100% width (no bare strip at the edge)", () => {
  assert.match(css, /\.bb-cover-art \{[\s\S]*?max-width: none;/);
});

console.log(`\n${passed} checks passed.`);
