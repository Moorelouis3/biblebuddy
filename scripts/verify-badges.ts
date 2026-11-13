/**
 * Offline checks on the achievement badges and the levels page.
 *
 *   npm run verify:badges
 *
 * No network, no database. The badge rules are pure functions, so they are
 * run for real; the wiring is asserted against the source, like the other
 * verify-* scripts.
 *
 * The badges were deleted once without anybody deciding to (commit 0cb3c0d09,
 * 2026-05-26, removed the dashboard grid they lived in). These checks are here
 * so the restored set cannot quietly lose a badge, unlock one twice, pay one
 * twice, take one back, or go back to unlocking a pile at once.
 */
import { readFileSync } from "fs";
import { strict as assert } from "assert";
import {
  BADGE_DEFINITIONS,
  BADGE_ANNOUNCE_WINDOW_MS,
  BADGE_UNLOCK_GAP_MS,
  badgeToAnnounce,
  badgeXpFor,
  buildBadgeStatuses,
  countBadgeInputs,
  pickBadgeToUnlock,
  type BadgeActionRow,
  type BadgeInputs,
} from "../lib/achievementBadges";
import { claimBadgeAnnouncement, endBadgeAnnouncement } from "../lib/badgeAnnouncements";
import { ACTION_POINT_WEIGHTS, LEVEL_DEFINITIONS, getLevelInfoFromPoints } from "../lib/levelSystem";
import { computePointsFromActivity } from "../lib/pointsEngine";

let checks = 0;
function check(label: string, fn: () => void) {
  fn();
  checks += 1;
  console.log(`  ok  ${label}`);
}

const ZERO: BadgeInputs = {
  currentStreak: 0,
  totalPoints: 0,
  chapterCompletions: 0,
  bibleStudyIntroCompletions: 0,
  triviaAnswers: 0,
  triviaCompletions: 0,
  scrambledWordsAnswered: 0,
  scrambledCompletions: 0,
  notesReviewed: 0,
  commentsPosted: 0,
  likesGiven: 0,
  tvVideosStarted: 0,
  booksCompleted: 0,
};
const none = new Map<string, string | null>();
const act = (action_type: string, action_label: string | null = null): BadgeActionRow => ({ action_type, action_label });
const extra = { currentStreak: 0, totalPoints: 0, groupComments: 0, groupLikesGiven: 0 };
const NOW = Date.parse("2026-11-13T12:00:00Z");
const hoursAgo = (h: number) => new Date(NOW - h * 3600_000).toISOString();

console.log("\nThe restored set is whole");

check("29 badges, the ids of the originals, none repeated", () => {
  const ids = BADGE_DEFINITIONS.map((badge) => badge.id);
  assert.equal(ids.length, 29);
  assert.equal(new Set(ids).size, 29);
  for (const id of ["first-light", "open-scroll", "steady-seven", "consistency-flame", "first-book-seal", "thousand-stones", "full-rhythm", "watchtower"]) {
    assert.ok(ids.includes(id), `missing ${id}`);
  }
});

check("every badge says what it is and exactly how to earn it", () => {
  for (const badge of BADGE_DEFINITIONS) {
    assert.ok(badge.title && badge.emoji && badge.description.length > 20, `${badge.id}: thin definition`);
    assert.ok(badge.how.length > 10, `${badge.id}: no how-to`);
    assert.ok(Number.isInteger(badge.target) && badge.target >= 1, `${badge.id}: bad target`);
    if (!badge.retired && badge.target > 1) {
      assert.ok(badge.how.includes(badge.target.toLocaleString()) || badge.how.includes(String(badge.target)), `${badge.id}: how-to does not state ${badge.target}`);
    }
  }
});

console.log("\nReady means the activity is really there");

check("nobody starts with a badge, earned or ready", () => {
  const statuses = buildBadgeStatuses(ZERO, none);
  assert.ok(statuses.every((status) => !status.earned && !status.ready && status.current === 0 && !status.isNew));
});

check("one finished chapter makes First Light and Open Scroll ready, and nothing bigger", () => {
  const inputs = countBadgeInputs([act("chapter_completed", "Genesis 1")], extra);
  const statuses = buildBadgeStatuses(inputs, none);
  assert.deepEqual(statuses.filter((s) => s.ready).map((s) => s.id).sort(), ["first-light", "open-scroll"]);
  assert.equal(statuses.filter((s) => s.earned).length, 0, "ready is not earned until it unlocks");
});

check("reading the same chapter five times is one chapter, not five", () => {
  const rows = Array.from({ length: 5 }, () => act("chapter_completed", "Genesis 1"));
  const inputs = countBadgeInputs(rows, extra);
  assert.equal(inputs.chapterCompletions, 1);
  const five = buildBadgeStatuses(inputs, none).find((status) => status.id === "five-chapter-path")!;
  assert.equal(five.ready, false);
  assert.equal(five.current, 1);
});

check("a chapter read in the reader and again in a reading plan is still one chapter", () => {
  const inputs = countBadgeInputs([act("chapter_completed", "John 3"), act("reading_plan_chapter_completed", "john 3")], extra);
  assert.equal(inputs.chapterCompletions, 1);
});

check("five different chapters make Five Chapter Path ready", () => {
  const rows = [1, 2, 3, 4, 5].map((n) => act("chapter_completed", `Genesis ${n}`));
  const five = buildBadgeStatuses(countBadgeInputs(rows, extra), none).find((status) => status.id === "five-chapter-path")!;
  assert.equal(five.ready, true);
});

check("progress is reported and never runs past the target", () => {
  const rows = [1, 2, 3].map((n) => act("chapter_completed", `Genesis ${n}`));
  const ten = buildBadgeStatuses(countBadgeInputs(rows, extra), none).find((status) => status.id === "ten-chapter-builder")!;
  assert.equal(ten.current, 3);
  assert.equal(ten.target, 10);
  for (const status of buildBadgeStatuses({ ...ZERO, totalPoints: 999999, currentStreak: 999 }, none)) {
    assert.ok(status.current <= status.target, `${status.id} overran`);
  }
});

check("a Scrambled word flagged [no-point] does not count", () => {
  assert.equal(countBadgeInputs([act("scrambled_word_answered", "LIGHT [no-point]")], extra).scrambledWordsAnswered, 0);
});

console.log("\nOne at a time, spread out");

const everything: BadgeInputs = { ...ZERO, currentStreak: 90, totalPoints: 5000, chapterCompletions: 40, bibleStudyIntroCompletions: 40, triviaAnswers: 90, triviaCompletions: 30, scrambledWordsAnswered: 90, scrambledCompletions: 30, notesReviewed: 40, commentsPosted: 9, likesGiven: 9, booksCompleted: 4 };

check("somebody who qualifies for everything unlocks exactly one badge", () => {
  const statuses = buildBadgeStatuses(everything, none);
  assert.equal(statuses.filter((s) => s.ready).length, 28, "all 28 live badges should be ready");
  const pick = pickBadgeToUnlock(statuses, none, NOW);
  assert.ok(pick && pick.id === "first-light", "the queue starts with the first badge");
});

check("nothing more unlocks until two hours after the last one", () => {
  assert.equal(BADGE_UNLOCK_GAP_MS, 2 * 60 * 60 * 1000);
  const recorded = new Map([["first-light", hoursAgo(1)]]);
  assert.equal(pickBadgeToUnlock(buildBadgeStatuses(everything, recorded), recorded, NOW), null);
  const almost = new Map([["first-light", new Date(NOW - BADGE_UNLOCK_GAP_MS + 1000).toISOString()]]);
  assert.equal(pickBadgeToUnlock(buildBadgeStatuses(everything, almost), almost, NOW), null);
});

check("after the gap the next one in order unlocks, and only that one", () => {
  const recorded = new Map([["first-light", hoursAgo(3)]]);
  const pick = pickBadgeToUnlock(buildBadgeStatuses(everything, recorded), recorded, NOW);
  assert.equal(pick?.id, "chapter-door");
});

check("the gap is measured from the most recent unlock, not the oldest", () => {
  const recorded = new Map([["first-light", hoursAgo(50)], ["chapter-door", hoursAgo(0.5)]]);
  assert.equal(pickBadgeToUnlock(buildBadgeStatuses(everything, recorded), recorded, NOW), null);
});

check("with nothing ready, nothing unlocks", () => {
  assert.equal(pickBadgeToUnlock(buildBadgeStatuses(ZERO, none), none, NOW), null);
});

check("only the points route may unlock, and it unlocks through one shared function", () => {
  const points = readFileSync("app/api/points/summary/route.ts", "utf8");
  const badges = readFileSync("app/api/badges/summary/route.ts", "utf8");
  assert.ok(points.includes("resolveBadges({") && badges.includes("resolveBadges({"));
  assert.ok(badges.includes("allowUnlock: false"), "the badges route must stay read-only");
  assert.ok(!/\.upsert\(|\.insert\(/.test(badges), "the badges route must not write");
  const awards = readFileSync("lib/badgeAwards.ts", "utf8");
  assert.equal((awards.match(/\.upsert\(/g) || []).length, 1, "exactly one write, for exactly one badge");
  assert.ok(awards.includes("pickBadgeToUnlock("));
});

console.log("\nUnlocked once, kept for good");

check("a recorded badge is earned, keeps its date and is not new again", () => {
  const recorded = new Map([["open-scroll", "2026-05-18T10:00:00Z"]]);
  const scroll = buildBadgeStatuses(countBadgeInputs([act("chapter_completed", "Genesis 1")], extra), recorded).find((s) => s.id === "open-scroll")!;
  assert.equal(scroll.earned, true);
  assert.equal(scroll.ready, false);
  assert.equal(scroll.isNew, false);
  assert.equal(scroll.earnedAt, "2026-05-18T10:00:00Z");
});

check("a streak badge survives the streak ending", () => {
  const recorded = new Map([["consistency-flame", "2026-05-20T10:00:00Z"]]);
  const flame = buildBadgeStatuses({ ...ZERO, currentStreak: 2 }, recorded).find((s) => s.id === "consistency-flame")!;
  assert.equal(flame.earned, true);
  assert.equal(flame.current, flame.target);
});

check("the retired TV badge is kept by those who earned it and offered to nobody else", () => {
  assert.ok(!buildBadgeStatuses({ ...ZERO, tvVideosStarted: 9 }, none).some((s) => s.id === "watchtower"));
  const kept = buildBadgeStatuses(ZERO, new Map([["watchtower", null]])).find((s) => s.id === "watchtower");
  assert.ok(kept && kept.earned && !kept.ready);
});

check("the unlock is written with the unique index, and a failed write unlocks nothing", () => {
  const awards = readFileSync("lib/badgeAwards.ts", "utf8");
  assert.ok(awards.includes('onConflict: "user_id,badge_id", ignoreDuplicates: true'));
  assert.ok(/if \(writeError\) \{\s*console\.error\([^)]*\);\s*\} else \{/.test(awards), "XP and the announcement must be inside the success branch");
  assert.ok(awards.includes("if (error) throw new Error(`user_badge_popups_seen:"), "a failed read must not be treated as no badges");
});

console.log("\nBadges pay XP once, from the award table");

check("the amounts are the originals and total 392", () => {
  assert.equal(BADGE_DEFINITIONS.reduce((sum, badge) => sum + badge.xp, 0), 392);
  assert.ok(BADGE_DEFINITIONS.every((badge) => [10, 12, 15, 20].includes(badge.xp)));
});

check("a badge pays once however many times its id appears, and a made-up id pays nothing", () => {
  assert.equal(badgeXpFor(["first-light"]), 10);
  assert.equal(badgeXpFor(["first-light", "first-light"]), 10);
  assert.equal(badgeXpFor(["first-light", "consistency-flame"]), 30);
  assert.equal(badgeXpFor(["not-a-badge", "level-99"]), 0);
  assert.equal(badgeXpFor([]), 0);
});

check("the points engine adds badge XP exactly, and nothing when there is none", () => {
  const base = { actions: [{ action_type: "chapter_completed", action_label: "Genesis 1", created_at: "2026-11-01T10:00:00Z" }], groupRootPosts: [], groupComments: [], groupLikesGiven: [], likesReceived: [] };
  const without = computePointsFromActivity(base);
  const withBadges = computePointsFromActivity({ ...base, badgeBonusPoints: 30 });
  assert.equal(without.totalPoints, 25);
  assert.equal(withBadges.totalPoints, 55);
  assert.equal(withBadges.studyPoints, without.studyPoints, "badge XP is bonus, not study points");
});

check("XP is not paid through badge_earned actions, which stay worth nothing", () => {
  assert.equal(ACTION_POINT_WEIGHTS.badge_earned, 0);
  assert.ok(!readFileSync("lib/badgeAwards.ts", "utf8").includes("master_actions"));
});

check("every place that totals a user's points passes badge XP", () => {
  for (const file of ["app/api/points/summary/route.ts", "app/api/badges/summary/route.ts", "scripts/recompute-all-levels.ts"]) {
    assert.ok(readFileSync(file, "utf8").includes("badgeBonusPoints"), `${file} totals points without badge XP`);
  }
});

console.log("\nThe page invents no level");

check("the levels page reads the level from /api/points/summary and the ladder from levelSystem", () => {
  const page = readFileSync("components/levels/LevelsPage.tsx", "utf8");
  assert.ok(page.includes('"/api/points/summary"'));
  assert.ok(page.includes("LEVEL_DEFINITIONS.map("));
  assert.ok(!/minPoints:\s*\d/.test(page), "no thresholds may be typed into the page");
  assert.ok(page.indexOf('"/api/points/summary"') < page.indexOf('"/api/badges/summary"'), "points first: it is the read that may unlock a badge");
});

check("twenty levels in order, and the boundaries land on the right level", () => {
  assert.equal(LEVEL_DEFINITIONS.length, 20);
  LEVEL_DEFINITIONS.forEach((def, index) => {
    assert.equal(def.level, index + 1);
    assert.equal(getLevelInfoFromPoints(def.minPoints).level, def.level);
    if (def.maxPoints !== null) {
      assert.equal(getLevelInfoFromPoints(def.maxPoints).level, def.level);
      assert.equal(LEVEL_DEFINITIONS[index + 1].minPoints, def.maxPoints + 1);
    }
  });
  const top = getLevelInfoFromPoints(999999);
  assert.equal(top.level, 20);
  assert.equal(top.nextLevel, null);
  assert.equal(top.pointsToNextLevel, 0);
});

check("the page says a level is not a measure of faith", () => {
  const page = readFileSync("components/levels/LevelsPage.tsx", "utf8");
  assert.ok(page.includes("do not") && page.includes("measure your faith"));
});

console.log("\nThe dashboard card");

check("the level card is a real link to /levels with a label", () => {
  const card = readFileSync("components/LevelProgressCard.tsx", "utf8");
  assert.ok(/<Link\s+href="\/levels"/.test(card));
  assert.ok(card.includes("aria-label="));
  assert.ok(card.includes("focus-visible:ring-2"));
});

check("a fresh unlock is still offered if the first reply was lost, and stops being news after ten minutes", () => {
  assert.equal(BADGE_ANNOUNCE_WINDOW_MS, 10 * 60 * 1000);
  const at = (minutesAgo: number) => new Date(NOW - minutesAgo * 60_000).toISOString();
  const fresh = buildBadgeStatuses(ZERO, new Map([["first-light", at(600)], ["open-scroll", at(3)]]));
  assert.equal(badgeToAnnounce(fresh, NOW)?.id, "open-scroll");
  const stale = buildBadgeStatuses(ZERO, new Map([["first-light", at(600)], ["open-scroll", at(11)]]));
  assert.equal(badgeToAnnounce(stale, NOW), null);
  assert.equal(badgeToAnnounce(buildBadgeStatuses(ZERO, none), NOW), null);
  // The 219 rows from May must never be announced as news.
  assert.equal(badgeToAnnounce(buildBadgeStatuses(ZERO, new Map([["first-light", "2026-05-18T10:00:00Z"]])), NOW), null);
});

check("each device announces a badge once, and both screens ask before showing", () => {
  assert.ok(readFileSync("lib/badgeAnnouncements.ts", "utf8").includes("export function claimBadgeAnnouncement("));
  assert.ok(readFileSync("components/LevelProgressCard.tsx", "utf8").includes("claimBadgeAnnouncement(sessionUserId, payload.badgeUnlocked.id)"));
  assert.ok(readFileSync("components/levels/LevelsPage.tsx", "utf8").includes("claimBadgeAnnouncement(userId, payload.badgeUnlocked.id)"));
});

check("a remount keeps the announcement on screen, and closing it ends it for good", () => {
  // The dashboard mounts the level card more than once while loading. The
  // first version claimed on mount one and showed nothing on mount two.
  const store = new Map<string, string>();
  (globalThis as unknown as { window: unknown }).window = {
    localStorage: { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v) },
  };
  assert.equal(claimBadgeAnnouncement("u1", "first-light"), true);
  assert.equal(claimBadgeAnnouncement("u1", "first-light"), true, "a remount still shows it");
  endBadgeAnnouncement("first-light");
  assert.equal(claimBadgeAnnouncement("u1", "first-light"), false, "closed means closed");
  assert.equal(claimBadgeAnnouncement("u1", "quick-recall"), true);
  assert.equal(claimBadgeAnnouncement("u2", "first-light"), true, "another reader on this device");
  delete (globalThis as unknown as { window?: unknown }).window;
});

check("a badge is announced after a level-up, never on top of it, and never from the cache", () => {
  const card = readFileSync("components/LevelProgressCard.tsx", "utf8");
  assert.ok(card.includes("unlockedBadge && !celebrating"));
  assert.ok(card.includes("{ ...payload, leveledUp: false, badgeUnlocked: null }"), "the cached snapshot must not replay an unlock");
  assert.ok(card.includes("{ ...cached, leveledUp: false, badgeUnlocked: null }"));
});

check("the announcement is a toast, not a modal, and respects reduced motion", () => {
  const toast = readFileSync("components/levels/BadgeUnlockedToast.tsx", "utf8");
  assert.ok(toast.includes('role="status"') && !toast.includes('aria-modal'));
  assert.ok(toast.includes("motion-safe:animate-"));
  assert.ok(toast.includes("createPortal("));
});

console.log(`\n${checks} checks passed.\n`);
