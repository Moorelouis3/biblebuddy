/**
 * Render all 21 daily posts for The Beginning of Everything to a review doc.
 *
 * The posts go up one a day from 1 November and there is no way to see them
 * all at once in the app, so this writes exactly what the cron will post, in
 * the order it will post it, for reading and editing before the study opens.
 *
 *   npx tsx scripts/render-beginning-daily-posts.ts
 *
 * Output: docs/BEGINNING_OF_EVERYTHING_DAILY_POSTS.md
 */

import fs from "node:fs";
import path from "node:path";
import { BEGINNING_DAILY_POSTS } from "../lib/beginningDailyPosts";
import { buildPostPlainText, buildPostTitle } from "../lib/communityEventDailyPost";
import { COMMUNITY_EVENTS } from "../lib/communityEvents";
import { eventDayStudyPath } from "../lib/communityEventDays";

const event = COMMUNITY_EVENTS.find((e) => e.slug === "beginning-of-everything");
if (!event) throw new Error("beginning-of-everything is not in COMMUNITY_EVENTS");

const lines: string[] = [
  `# ${event.title}: the ${event.totalDays} daily posts`,
  "",
  "What the daily cron posts in the feed as Louis, one a day from " +
    `${event.dateRangeLabel}. Generated from \`lib/beginningDailyPosts.ts\` by`,
  "`scripts/render-beginning-daily-posts.ts` - edit the data file, not this one.",
  "",
  "Drafted from the study's own day files, so every title and reflection",
  "question is what the devotional already asks. Key verses were checked word",
  "for word against `public/kjv/genesis/`.",
  "",
];

for (const entry of BEGINNING_DAILY_POSTS) {
  const studyPath = eventDayStudyPath(event.devotionalId, entry.day);
  lines.push(
    "---",
    "",
    `## ${buildPostTitle(entry, event.title)}`,
    "",
    "```",
    buildPostPlainText(entry, event.totalDays, studyPath, null),
    "```",
    "",
  );
}

const out = path.join(process.cwd(), "docs", "BEGINNING_OF_EVERYTHING_DAILY_POSTS.md");
fs.writeFileSync(out, lines.join("\n"), "utf8");

const missing = Array.from({ length: event.totalDays }, (_, i) => i + 1).filter(
  (day) => !BEGINNING_DAILY_POSTS.some((entry) => entry.day === day),
);
console.log(`Wrote ${out}`);
console.log(`${BEGINNING_DAILY_POSTS.length} of ${event.totalDays} days`);
console.log(missing.length ? `MISSING DAYS: ${missing.join(", ")}` : "No missing days.");
