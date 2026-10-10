#!/usr/bin/env node
/**
 * Did the signup wall pay off? (Louis, 2026-10-08)
 *
 * Guests were switched off on 6 October. Total sign-ups fell about 63% and the
 * question was whether the extra email addresses were worth the accounts lost.
 * This prints the same table every time so the answer builds itself instead of
 * being re-derived by hand.
 *
 *   npm run signups            # against production
 *   npm run signups -- --days 28
 *   npm run signups -- --local # against a dev server on :3000
 *
 * All the counting lives in /api/stats/signup-wall, so this and the Wednesday
 * routine can never drift apart. Needs SECOND_BRAIN_STATS_SECRET, which is
 * already in .env.local and on Vercel.
 */
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

function loadEnvLocal() {
  const file = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = /^([A-Z0-9_]+)=(.*)$/.exec(line);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim();
  }
}

loadEnvLocal();

const secret = process.env.SECOND_BRAIN_STATS_SECRET;
if (!secret) {
  console.error("SECOND_BRAIN_STATS_SECRET missing (.env.local locally, Vercel env in the cloud).");
  process.exit(1);
}

const base = value("base", flag("local") ? "http://localhost:3000" : "https://www.mybiblebuddy.net");
const days = value("days", "21");

const response = await fetch(`${base}/api/stats/signup-wall?days=${encodeURIComponent(days)}`, {
  headers: { authorization: `Bearer ${secret}` },
});

if (!response.ok) {
  console.error(`${base} returned ${response.status}: ${(await response.text()).slice(0, 300)}`);
  process.exit(1);
}

const data = await response.json();
const pad = (v, w) => String(v).padStart(w);

console.log(`\nSign-ups by Berlin day — guests off since ${data.wallDate}`);
console.log(`(read ${new Date(data.generatedAt).toISOString().replace("T", " ").slice(0, 16)} UTC)\n`);
console.log("  day          guests   email   total");
console.log("  " + "-".repeat(36));

for (const row of data.days) {
  const isToday = row.day === data.today;
  const wallMark = row.day === data.wallDate ? "  <- wall went up" : "";
  console.log(
    `  ${row.day}  ${pad(row.anonymous, 6)}  ${pad(row.withEmail, 6)}  ${pad(row.total, 6)}` +
      (isToday ? "   (today, still running)" : wallMark),
  );
}

const { baseline, sinceWall } = data;
console.log("\n  " + "-".repeat(36));
console.log(`  before (${baseline.window}, per day)`);
console.log(
  `    guests ${baseline.perDay.anonymous}   email ${baseline.perDay.withEmail}   total ${baseline.perDay.total}`,
);

if (sinceWall) {
  console.log(`  since the wall (${sinceWall.completeDays} complete day${sinceWall.completeDays === 1 ? "" : "s"}, per day)`);
  console.log(
    `    guests ${sinceWall.perDay.anonymous}   email ${sinceWall.perDay.withEmail}   total ${sinceWall.perDay.total}`,
  );

  const pct = (now, then) => {
    const change = ((now - then) / then) * 100;
    return `${change >= 0 ? "+" : ""}${change.toFixed(0)}%`;
  };
  console.log("\n  VERDICT");
  console.log(`    email addresses  ${pct(sinceWall.perDay.withEmail, baseline.perDay.withEmail)}`);
  console.log(`    total accounts   ${pct(sinceWall.perDay.total, baseline.perDay.total)}`);
  if (sinceWall.completeDays < 7) {
    console.log(`    (only ${sinceWall.completeDays} complete days - too early to trust the trend)`);
  }
  // Only the latest complete day matters here. Guests kept trickling in for a
  // day after the wall went up (stale JS in tabs people already had open), so
  // averaging across the whole window would warn forever about a leak that
  // closed on 7 October.
  const latest = data.days.filter((row) => row.day !== data.today).at(-1);
  if (latest && latest.anonymous > 0) {
    console.log(`    NOTE: ${latest.anonymous} guest account(s) created on ${latest.day}.`);
    console.log("          Check GUESTS_ENABLED in lib/guestSession.ts has not been flipped back.");
  }
}

if (data.truncated) {
  console.log("\n  WARNING: hit the page cap while scanning users - numbers are short. Raise MAX_PAGES.");
}
console.log("");
