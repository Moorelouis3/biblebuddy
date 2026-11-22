/** npm run verify:study-day-pace: two days back to back, then a 7-minute wait. */
import assert from "node:assert/strict";
import { studyDayWaitFrom, STUDY_DAY_WAIT_MS } from "../lib/studyDayPace";

const MIN = 60_000;
const now = 1_000_000_000_000;

assert.equal(studyDayWaitFrom([], now), 0, "first day is free");
assert.equal(studyDayWaitFrom([now - 1 * MIN], now), 0, "second day is free");
assert.equal(studyDayWaitFrom([now - 1 * MIN, now - 2 * MIN], now), 6 * MIN, "third back to back waits out 7 min from the latest");
assert.equal(studyDayWaitFrom([now - 8 * MIN, now - 9 * MIN], now), 0, "the wait is over after 7 min");
assert.equal(studyDayWaitFrom([now - 1 * MIN, now - 20 * MIN], now), 0, "last two not back to back: free");
assert.equal(studyDayWaitFrom([now, now - 1 * MIN, now - 2 * MIN], now), STUDY_DAY_WAIT_MS, "only the latest two count");
// After the wait: day 3 at +8m, day 4 right after is free, day 5 waits again.
const d3 = now; 
assert.equal(studyDayWaitFrom([d3, d3 - 8 * MIN], d3 + MIN), 0, "day after a waited day is free");
assert.equal(studyDayWaitFrom([d3 + MIN, d3, d3 - 8 * MIN], d3 + 2 * MIN), 6 * MIN, "then waits again");
console.log("study day pace: all pass");
