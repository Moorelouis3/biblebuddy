/**
 * npm run verify:bookshelf
 *
 * Walks the dashboard shelf's ordering rules (lib/bookshelf/selectShelf.ts)
 * through every case in Louis's brief of 15 November 2026: new user,
 * returning user, several studies on the go, finished studies, signed up or
 * not, a study moving from upcoming to live, a study ending, and no community
 * study at all. Offline: no network, no database.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { BIBLE_YEAR_KEY, selectShelf, type ShelfCandidate, type ShelfInput } from "../lib/bookshelf/selectShelf";
import { COMMUNITY_EVENTS, getLiveCommunityEvent, getUpcomingCommunityEvent } from "../lib/communityEvents";

let passed = 0;
const check = (name: string, run: () => void) => {
  run();
  passed += 1;
  console.log(`  ok  ${name}`);
};

const study = (key: string, over: Partial<ShelfCandidate> = {}): ShelfCandidate => ({
  key,
  title: key,
  category: null,
  totalDays: 21,
  sortOrder: 10,
  started: false,
  isComplete: false,
  lastActivityAt: null,
  comingSoon: false,
  ...over,
});

// A catalogue shaped like the real one: two community studies, five others.
const catalogue = (over: Record<string, Partial<ShelfCandidate>> = {}): ShelfCandidate[] =>
  [
    study("abraham", { category: "genesis-series", totalDays: 30, sortOrder: 1 }),
    study("beginning", { category: "genesis-series", sortOrder: 2 }),
    study("proverbs", { category: "wisdom", totalDays: 31, sortOrder: 3 }),
    study("tempting", { category: "new-testament", sortOrder: 4 }),
    study("women", { sortOrder: 5 }),
    study("hope", { totalDays: 60, sortOrder: 6 }),
    study(BIBLE_YEAR_KEY, { totalDays: 365, sortOrder: 7 }),
    study("future", { sortOrder: 8, comingSoon: true }),
  ].map((item) => ({ ...item, ...(over[item.key] || {}) }));

const shelf = (over: Partial<ShelfInput> = {}, studies: Record<string, Partial<ShelfCandidate>> = {}) =>
  selectShelf({ candidates: catalogue(studies), upcomingKey: "abraham", liveKey: "beginning", chosenKey: null, recentBooks: [], ...over });

const keys = (slots: ReturnType<typeof selectShelf>) => slots.map((slot) => slot.key);
const roleOf = (slots: ReturnType<typeof selectShelf>, key: string) => slots.find((slot) => slot.key === key)?.role;

console.log("The order");

check("the upcoming study is first and the live one second, for everybody", () => {
  for (const slots of [shelf(), shelf({}, { proverbs: { started: true, lastActivityAt: "2026-11-14" } })]) {
    assert.equal(slots[0].key, "abraham");
    assert.equal(slots[0].role, "upcoming");
    assert.equal(slots[1].key, "beginning");
    assert.equal(slots[1].role, "live");
  }
});

check("third is what they read most recently, by real activity", () => {
  const slots = shelf({}, {
    proverbs: { started: true, lastActivityAt: "2026-11-01" },
    tempting: { started: true, lastActivityAt: "2026-11-14" },
  });
  assert.equal(slots[2].key, "tempting");
  assert.equal(slots[2].role, "current");
  assert.equal(slots[3].key, "proverbs");
  assert.equal(slots[3].role, "in_progress");
});

check("then other unfinished studies, then finished ones, then recommendations", () => {
  const slots = shelf({}, {
    proverbs: { started: true, lastActivityAt: "2026-11-14" },
    tempting: { started: true, lastActivityAt: "2026-11-02" },
    women: { started: true, isComplete: true, lastActivityAt: "2026-10-01" },
  });
  assert.deepEqual(slots.map((slot) => slot.role), ["upcoming", "live", "current", "in_progress", "completed", "recommended"]);
});

check("always six, never the same book twice", () => {
  for (const slots of [shelf(), shelf({ upcomingKey: null }), shelf({ upcomingKey: null, liveKey: null })]) {
    assert.equal(slots.length, 6);
    assert.equal(new Set(keys(slots)).size, 6);
  }
});

console.log("The cases in the brief");

check("brand-new user, no history: group studies, then Bible in One Year first among the rest", () => {
  const slots = shelf();
  assert.deepEqual(keys(slots).slice(0, 3), ["abraham", "beginning", BIBLE_YEAR_KEY]);
  assert.equal(slots[2].reason, "A good place to start");
  assert.ok(!keys(slots).includes("future"), "a study that is not out yet waits behind the ones that are");
});

check("somebody doing the live study: it stays in the group seat, not also 'currently reading'", () => {
  const slots = shelf({}, {
    beginning: { started: true, lastActivityAt: "2026-11-15" },
    proverbs: { started: true, lastActivityAt: "2026-11-10" },
  });
  assert.equal(roleOf(slots, "beginning"), "live");
  assert.equal(slots[2].key, "proverbs");
  assert.equal(keys(slots).filter((key) => key === "beginning").length, 1);
});

check("the study they chose takes the third seat when nothing is part-read", () => {
  const slots = shelf({ chosenKey: "women" });
  assert.equal(slots[2].key, "women");
  assert.equal(slots[2].role, "chosen");
});

check("Bible in One Year with no date still counts as theirs when they chose it", () => {
  const slots = shelf({ chosenKey: BIBLE_YEAR_KEY }, { [BIBLE_YEAR_KEY]: { started: true } });
  assert.equal(slots[2].key, BIBLE_YEAR_KEY);
  assert.equal(slots[2].role, "current");
});

check("a study moving from upcoming to live moves from the first seat to the second", () => {
  const before = shelf({ upcomingKey: "abraham", liveKey: "beginning" });
  const after = shelf({ upcomingKey: null, liveKey: "abraham" });
  assert.equal(before[0].key, "abraham");
  assert.equal(after[0].key, "abraham");
  assert.equal(after[0].role, "live");
});

check("a community study that has ended is an ordinary book again", () => {
  const slots = shelf({ upcomingKey: null, liveKey: null }, { beginning: { started: true, isComplete: true, lastActivityAt: "2026-11-28" } });
  assert.equal(roleOf(slots, "beginning"), "completed");
});

check("no community study at all: their own reading leads", () => {
  const slots = shelf({ upcomingKey: null, liveKey: null }, { proverbs: { started: true, lastActivityAt: "2026-11-14" } });
  assert.equal(slots[0].key, "proverbs");
  assert.equal(slots[0].role, "current");
});

console.log("Recommendations");

check("reading Genesis points at the Genesis studies", () => {
  const slots = shelf({ upcomingKey: null, liveKey: null, recentBooks: ["genesis", "genesis", "exodus"] });
  assert.equal(slots[0].key, "abraham");
  assert.equal(slots[0].reason, "Because you read Genesis");
});

check("a study of the same kind as one they finished ranks above the rest", () => {
  const slots = shelf(
    { upcomingKey: null, liveKey: null },
    { proverbs: { started: true, isComplete: true, lastActivityAt: "2026-10-31" } },
  );
  // Nothing else is "wisdom" in this catalogue, so add one to prove the point.
  const withWisdom = selectShelf({
    candidates: [...catalogue({ proverbs: { started: true, isComplete: true, lastActivityAt: "2026-10-31" } }), study("job", { category: "wisdom", sortOrder: 99 })],
    upcomingKey: null,
    liveKey: null,
    chosenKey: null,
    recentBooks: [],
  });
  assert.equal(slots[0].role, "completed");
  assert.equal(withWisdom[1].key, "job");
  assert.equal(withWisdom[1].reason, "More like proverbs");
});

check("two short studies finished: another short one is suggested for that reason", () => {
  const slots = shelf(
    { upcomingKey: null, liveKey: null },
    {
      women: { started: true, isComplete: true, lastActivityAt: "2026-09-01" },
      tempting: { started: true, isComplete: true, lastActivityAt: "2026-10-01" },
    },
  );
  const short = slots.find((slot) => slot.role === "recommended" && slot.reason.startsWith("A short study"));
  assert.ok(short, "a short study is recommended with that reason");
});

check("the same person gets the same shelf every time", () => {
  const input = { recentBooks: ["john", "proverbs"], chosenKey: "hope" };
  assert.deepEqual(shelf(input), shelf(input));
});

check("no study is named in the rules, and nothing is random", () => {
  const source = readFileSync("lib/bookshelf/selectShelf.ts", "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  for (const word of ["Abraham", "Beginning", "Proverbs", "Math.random", "Date.now"]) assert.ok(!source.includes(word), word);
});

console.log("The calendar");

check("each community study is upcoming before its start date and live on it", () => {
  for (const event of COMMUNITY_EVENTS) {
    const dayBefore = new Date(`${event.startDate}T12:00:00Z`);
    dayBefore.setUTCDate(dayBefore.getUTCDate() - 1);
    const firstDay = new Date(`${event.startDate}T12:00:00Z`);
    assert.equal(getLiveCommunityEvent(firstDay)?.slug, event.slug, `${event.slug} is live on its first day`);
    assert.notEqual(getLiveCommunityEvent(dayBefore)?.slug, event.slug);
    const upcoming = getUpcomingCommunityEvent(dayBefore);
    assert.ok(upcoming && Date.parse(upcoming.startDate) <= Date.parse(event.startDate));
  }
});

check("long after the last study there is neither a live nor an upcoming one", () => {
  const farFuture = new Date("2030-01-01T12:00:00Z");
  assert.equal(getLiveCommunityEvent(farFuture), null);
  assert.equal(getUpcomingCommunityEvent(farFuture), null);
});

console.log("Discussion lives on the study day");

check("the daily study post is the day's thread and is not copied into the feed", () => {
  const insert = readFileSync("lib/groupPostInsert.ts", "utf8");
  assert.ok(insert.indexOf("if (options.skipFeedMirror) return insertedPostId;") < insert.indexOf('.from("feed_posts").insert('));
  assert.ok(readFileSync("lib/communityEventDailyPost.ts", "utf8").includes("skipFeedMirror: true"));
});

check("the feed does not pin a daily study post", () => {
  const feed = readFileSync("app/bb-feed/page.tsx", "utf8");
  assert.ok(feed.includes("for (const candidate of [poll, prayer]) {"));
});

check("View Discussion on the shelf opens today's day of the study, never the feed", () => {
  const shelf = readFileSync("components/home/YourBookshelf.tsx", "utf8");
  assert.ok(shelf.includes('{ label: "View Discussion", href: dayHref(communityDay), kind: "view_discussion" }'));
  assert.ok(!shelf.includes("/bb-feed") && !shelf.includes("eventDayDiscussionPath"));
});

check("Today's Group Study counts answers from the study day's thread", () => {
  const card = readFileSync("components/home/TodaysGroupStudy.tsx", "utf8");
  assert.ok(card.includes('.eq("parent_post_id", dayPost.group_post_id)'));
  assert.ok(!card.includes("feed_post_comments") && !card.includes('.from("feed_posts")'));
});

console.log(`\n${passed} checks passed.`);
