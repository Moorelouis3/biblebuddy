// Study Activity grouping and cap on the shared Feed (lib/studyActivityFeed.ts).
// One person completing Days 7-9 of one study plus days across other studies:
// grouped, capped at three cards a day, regular posts and other people untouched.
import { collapseStudyActivity, parseStudyCompletion, completionSentence } from "../lib/studyActivityFeed";
import { readStudyActivity } from "../lib/communityMilestones";
const t0 = Date.parse("2026-11-21T08:00:00Z");
const at = (min: number) => new Date(t0 + min * 60000).toISOString();
let n = 0;
const p = (user: string, content: string, min: number) => ({ id: `p${++n}`, user_id: user, content, created_at: at(min) });
const posts = [
  p("A", '✅ Completed Day 9 of "The Wisdom of Proverbs".', 30),
  p("B", "Praise God for today!", 25),
  p("A", '✅ Completed Day 8 of "The Wisdom of Proverbs".', 20),
  p("A", '✅ Completed Day 7 of "The Wisdom of Proverbs".', 10),
  p("A", '✅ Completed Day 3 of "The Obedience of Abraham".', 40),
  p("A", '✅ Completed Day 5 of "The Obedience of Abraham".', 45),
  p("A", "✅ Finished Day 140 of Bible in One Year.", 50),
  p("A", '✅ Completed Day 2 of "The Tempting of Jesus".', 60),
  p("A", '✅ Completed Day 3 of "The Tempting of Jesus".', 61),
  p("A", "My own thought, not automatic.", 70),
  p("B", '✅ Completed Day 1 of "The Tempting of Jesus".', 62),
].sort((a, b) => b.created_at.localeCompare(a.created_at));
const out = collapseStudyActivity(posts);

const fail = (c: boolean, m: string) => { if (!c) { console.error("FAIL", m); process.exitCode = 1; } };
const aAuto = out.filter((o) => o.user_id === "A" && parseStudyCompletion(o.content));
fail(aAuto.length === 3, "cap 3 for A: " + aAuto.length);
fail(out.some((o) => o.content === '✅ Completed Days 7–9 of "The Wisdom of Proverbs".' && o.id === "p1"), "grouped 7-9 on newest");
fail(out.some((o) => o.content === '✅ Completed Days 3 and 5 of "The Obedience of Abraham".'), "skipped days");
fail(out.some((o) => o.user_id === "B" && o.content?.includes("Tempting")), "B visible");
fail(out.some((o) => o.content === "My own thought, not automatic."), "user post kept");
fail(completionSentence({ kind: "devotional", title: "X", days: [1, 3, 5, 7, 9, 11] }) === '✅ Completed 6 days of "X".', "count form");
fail(readStudyActivity('✅ Completed 6 days of "X".')?.title === "X", "reader count form");
console.log(process.exitCode ? "FAILED" : "all pass");
