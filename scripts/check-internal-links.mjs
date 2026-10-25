#!/usr/bin/env node
/**
 * Every internal link in the site, checked against the live site.
 *
 *   npm run links                 # check against production
 *   npm run links -- --local      # check against http://localhost:3000
 *   npm run links -- --redirects  # also list the 3xx, which are usually fine
 *   npm run links -- --base https://staging.example.com
 *
 * Written 2026-10-25, the day we found that /start had been a 404 since
 * 2026-10-06 and every call to action on the blog pointed at it - three
 * shared components, hundreds of pages, nineteen days, and the only reason
 * anybody noticed was that Louis asked an unrelated question. Nothing in the
 * build catches a link to a route that no longer exists: Next does not check
 * href strings, TypeScript has no idea, and a 404 is a perfectly valid page.
 *
 * So: read every href out of the source, ask the live site about each one,
 * and exit non-zero if anything is dead. Cheap enough to run before a deploy.
 *
 * WHAT IT CHECKS
 *   app/ and components/, every .tsx and .ts
 *   href="/..." and href={`/...`} with no interpolation in them
 *
 * WHAT IT CANNOT CHECK, and why that is fine
 *   Interpolated hrefs (href={`/blog/${slug}`}) are skipped - the path does
 *   not exist until it runs. Those are generated from real data, which is a
 *   different class of bug from a hand-typed route that got deleted.
 *
 * A 3xx is NOT treated as a failure. Plenty of real routes answer a
 * logged-out request with a redirect to the homepage, because they are
 * behind the signup wall - /notes and /reading-plans both do. That is the
 * app working, not a broken link. Only 4xx and 5xx fail the run.
 */

import fs from "node:fs";
import path from "node:path";

const PRODUCTION = "https://www.mybiblebuddy.net";
const SOURCE_DIRS = ["app", "components"];
/** Not pages: assets, API routes and the Next internals. */
const SKIP = /^\/(api|_next|favicon|robots|sitemap)\b|\.(png|jpe?g|webp|gif|svg|ico|mp3|mp4|pdf|xml|txt|json|css|js)$/i;
/** How many to have in flight at once. Polite, and fast enough. */
const CONCURRENCY = 8;

const args = process.argv.slice(2);
const wantRedirects = args.includes("--redirects");
const baseFromFlag = (() => {
  const i = args.indexOf("--base");
  return i !== -1 ? args[i + 1] : null;
})();
const BASE = baseFromFlag || (args.includes("--local") ? "http://localhost:3000" : PRODUCTION);

/** Every .ts/.tsx under the source dirs. */
function sourceFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) sourceFiles(full, out);
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

/** target path -> the files that link to it */
const targets = new Map();

for (const dir of SOURCE_DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const file of sourceFiles(dir)) {
    const src = fs.readFileSync(file, "utf8");
    for (const m of src.matchAll(/href=(?:"([^"]+)"|\{`([^`]+)`\})/g)) {
      const raw = (m[1] ?? m[2] ?? "").trim();
      if (!raw.startsWith("/") || raw.startsWith("//")) continue;
      if (raw.includes("${")) continue;
      const clean = raw.split("#")[0];
      if (!clean || clean === "/" || SKIP.test(clean)) continue;
      if (!targets.has(clean)) targets.set(clean, new Set());
      targets.get(clean).add(file.replace(/\\/g, "/"));
    }
  }
}

const list = [...targets.keys()].sort();
console.log(`Checking ${list.length} internal links against ${BASE}\n`);

const dead = [];
const redirected = [];
let done = 0;

async function check(p) {
  let status = 0;
  let location = "";
  try {
    const res = await fetch(BASE + p, { redirect: "manual", headers: { "user-agent": "bible-buddy-link-check" } });
    status = res.status;
    location = res.headers.get("location") || "";
  } catch (error) {
    status = -1;
    location = String(error?.message || error);
  }
  if (status === -1 || status >= 400) dead.push({ p, status, location });
  else if (status >= 300) redirected.push({ p, status, location: location.replace(BASE, "") || "/" });

  done += 1;
  if (done % 50 === 0) process.stderr.write(`  ...${done}/${list.length}\n`);
}

// A small pool rather than all at once, so this does not look like an attack.
const queue = [...list];
await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length) {
      const next = queue.shift();
      if (next) await check(next);
    }
  }),
);

if (wantRedirects && redirected.length) {
  console.log(`${redirected.length} redirect${redirected.length === 1 ? "" : "s"} (usually the signup wall, not a fault):`);
  for (const r of redirected.sort((a, b) => a.p.localeCompare(b.p))) {
    console.log(`  ${r.status} ${r.p} -> ${r.location}`);
  }
  console.log("");
}

if (!dead.length) {
  console.log(`All ${list.length} links resolve.${redirected.length && !wantRedirects ? ` (${redirected.length} redirect, --redirects to list them.)` : ""}`);
  process.exit(0);
}

console.log(`${dead.length} DEAD LINK${dead.length === 1 ? "" : "S"}:\n`);
for (const d of dead.sort((a, b) => a.p.localeCompare(b.p))) {
  console.log(`  ${d.status === -1 ? "ERR" : d.status}  ${d.p}`);
  for (const file of [...targets.get(d.p)].sort()) console.log(`        ${file}`);
}
process.exit(1);
