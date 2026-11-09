/**
 * The P3 items from docs/STABILITY_VERIFICATION_2026-11-09.md.
 *
 *   npm run verify:p3-cleanup
 *
 * P3-1  the study-group pages have been redirected to the feed since the group
 *       closed, so they were unreachable code carrying 46 unguarded button
 *       handlers, two sub-second polls and 35 error-discarding reads. Deleting
 *       them was the best ratio in the whole document.
 *
 *       The trap it had to avoid: GroupPostThread looks like it belongs to the
 *       groups, and does not. The devotional day page and Today's Group Study
 *       on the dashboard both use it for community-event discussions, so it
 *       stays - and so does TodaysGroupStudy, which HomeScreen renders.
 *
 * P3-3  eslint walked other sessions' worktrees, build output and all.
 * P3-4  the reply walk ran one query per level of nesting with no bound, and
 *       a parent chain that looped would have run forever.
 */
import { existsSync, readFileSync } from "node:fs";

let passed = 0;
const failures: string[] = [];

function check(label: string, condition: boolean) {
  if (condition) {
    passed += 1;
    console.log(`  ok  ${label}`);
  } else {
    failures.push(label);
    console.log(`FAIL  ${label}`);
  }
}

// -- P3-1 - what went -------------------------------------------------------

const DELETED = [
  "app/study-groups/page.tsx",
  "app/study-groups/[id]/page.tsx",
  "app/study-groups/[id]/chat/page.tsx",
  "app/study-groups/[id]/analytics/page.tsx",
  "app/study-groups/[id]/scheduler/page.tsx",
  "app/study-groups/[id]/series/page.tsx",
  "app/study-groups/[id]/series/week/[weekNum]/page.tsx",
  "components/GroupPostEditor.tsx",
  "components/GroupWeeklyPollCard.tsx",
  "components/GroupWeeklyQuestionCard.tsx",
  "components/GroupWeeklyTriviaCard.tsx",
  "components/GroupsOnboardingModal.tsx",
];

for (const file of DELETED) {
  check(`${file} is gone`, !existsSync(file));
}

// -- P3-1 - what deliberately stayed ----------------------------------------

const KEPT = [
  "components/GroupPostThread.tsx",
  "components/home/TodaysGroupStudy.tsx",
];

for (const file of KEPT) {
  check(`${file} is still here, because it is still used`, existsSync(file));
}

const devotionalDay = readFileSync("app/devotionals/[id]/day/[dayNumber]/page.tsx", "utf8");
const homeScreen = readFileSync("components/HomeScreen.tsx", "utf8");
check("the devotional day page still has its discussion thread", /GroupPostThread/.test(devotionalDay));
check("the dashboard still has Today's Group Study", /TodaysGroupStudy/.test(homeScreen));

// -- P3-1 - nothing left pointing at the deleted files ----------------------

const nextConfig = readFileSync("next.config.ts", "utf8");
check(
  "the redirect that made these pages unreachable is still in place",
  /source: "\/study-groups"/.test(nextConfig) && /destination: "\/bb-feed"/.test(nextConfig),
);

// -- P3-3 - eslint stops walking other sessions' checkouts ------------------

const eslintConfig = readFileSync("eslint.config.mjs", "utf8");
check("eslint ignores .claude/worktrees", /\.claude\/worktrees/.test(eslintConfig));

// -- P3-4 - the reply walk is bounded ---------------------------------------

const thread = readFileSync("components/GroupPostThread.tsx", "utf8");
check("the reply walk has a depth limit", /const MAX_REPLY_DEPTH = \d+;/.test(thread));
check("and the loop actually respects it", /depth < MAX_REPLY_DEPTH/.test(thread));
check(
  "a reply is never followed twice, so a loop in the data cannot spin",
  /seenIds/.test(thread) && /!seenIds\.has\(row\.id\)/.test(thread),
);

// -- Report ------------------------------------------------------------------

console.log(`\n${passed} passed, ${failures.length} failed.`);
if (failures.length) {
  for (const f of failures) console.error(`  failed: ${f}`);
  process.exit(1);
}
