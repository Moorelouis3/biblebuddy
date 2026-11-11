/**
 * Offline checks for the 20-level system and the level-up celebration.
 *
 *   npm run verify:levels
 *
 * Same idiom as the other verify-* scripts: no network, no database, assert
 * against the real modules and the real source text. Everything here is a fact
 * that was decided deliberately and would be expensive to rediscover.
 */
import { readFileSync } from "fs";
import { strict as assert } from "assert";
import {
  LEVEL_DEFINITIONS,
  LEVEL_TIERS,
  LEVEL_RING_COLORS,
  MAX_LEVEL,
  MILESTONE_LEVELS,
  ACTION_POINT_WEIGHTS,
  getLevelInfoFromPoints,
  getLevelInfoWithLevelFloor,
  getTierForLevel,
  getTierStep,
  isMilestoneLevel,
} from "../lib/levelSystem";
import { computePointsFromActivity, streakBonusPointsFor } from "../lib/pointsEngine";
import { confettiForLevel } from "../lib/celebration";

const read = (path: string) => readFileSync(path, "utf8");
let checks = 0;
function check(label: string, fn: () => void) {
  fn();
  checks += 1;
  console.log(`  ok  ${label}`);
}

// ── The curve ──────────────────────────────────────────────────────────────
console.log("\nThe 20-level curve");

check("exactly 20 levels", () => {
  assert.equal(LEVEL_DEFINITIONS.length, 20);
  assert.equal(MAX_LEVEL, 20);
});

check("levels are numbered 1..20 in order", () => {
  LEVEL_DEFINITIONS.forEach((d, i) => assert.equal(d.level, i + 1));
});

check("minPoints strictly increasing, and maxPoints joins up with no gaps", () => {
  for (let i = 1; i < LEVEL_DEFINITIONS.length; i += 1) {
    assert.ok(
      LEVEL_DEFINITIONS[i].minPoints > LEVEL_DEFINITIONS[i - 1].minPoints,
      `level ${i + 1} minPoints is not above level ${i}`,
    );
    assert.equal(
      LEVEL_DEFINITIONS[i - 1].maxPoints,
      LEVEL_DEFINITIONS[i].minPoints - 1,
      `gap or overlap between level ${i} and ${i + 1}`,
    );
  }
});

check("level 1 starts at 0 and level 20 is open-ended", () => {
  assert.equal(LEVEL_DEFINITIONS[0].minPoints, 0);
  assert.equal(LEVEL_DEFINITIONS[19].maxPoints, null);
});

check("the approved thresholds, exactly", () => {
  assert.deepEqual(
    LEVEL_DEFINITIONS.map((d) => d.minPoints),
    [0, 50, 150, 300, 500, 800, 1200, 1700, 2300, 3100, 4100, 5400, 7000, 9000, 11500, 14500, 18000, 22000, 26000, 30000],
  );
});

check("Level 2 is one chapter: signup 25 + login 5 + chapter 25 clears it", () => {
  const firstSession =
    (ACTION_POINT_WEIGHTS.user_signup ?? 0) +
    (ACTION_POINT_WEIGHTS.user_login ?? 0) +
    (ACTION_POINT_WEIGHTS.chapter_completed ?? 0);
  assert.ok(firstSession >= LEVEL_DEFINITIONS[1].minPoints, `first session is ${firstSession}`);
});

check("Level 20 is about a Bible's worth of reading (1,189 chapters)", () => {
  const wholeBible = 1189 * (ACTION_POINT_WEIGHTS.chapter_completed ?? 0);
  const top = LEVEL_DEFINITIONS[19].minPoints;
  assert.ok(Math.abs(wholeBible - top) < 1000, `whole Bible ${wholeBible} vs level 20 ${top}`);
});

check("every level has a name and both copy lines", () => {
  for (const d of LEVEL_DEFINITIONS) {
    assert.ok(d.levelName.trim().length > 0, `level ${d.level} has no name`);
    assert.ok(d.identityText.trim().length > 0, `level ${d.level} has no identityText`);
    assert.ok(d.encouragementText.trim().length > 0, `level ${d.level} has no encouragementText`);
  }
});

check("all 20 names are distinct", () => {
  const names = LEVEL_DEFINITIONS.map((d) => d.levelName);
  assert.equal(new Set(names).size, 20);
});

check("Level 17 is Mentor, not Teacher - that name belongs to the member badge", () => {
  assert.equal(LEVEL_DEFINITIONS[16].levelName, "Mentor");
  assert.ok(!LEVEL_DEFINITIONS.some((d) => d.levelName === "Teacher"));
});

check("boundary lookups land on the right level", () => {
  assert.equal(getLevelInfoFromPoints(0).level, 1);
  assert.equal(getLevelInfoFromPoints(49).level, 1);
  assert.equal(getLevelInfoFromPoints(50).level, 2);
  assert.equal(getLevelInfoFromPoints(149).level, 2);
  assert.equal(getLevelInfoFromPoints(150).level, 3);
  assert.equal(getLevelInfoFromPoints(29999).level, 19);
  assert.equal(getLevelInfoFromPoints(30000).level, 20);
  assert.equal(getLevelInfoFromPoints(999999).level, 20);
});

check("progressPercent stays within 0..100 across a sweep", () => {
  for (let points = 0; points <= 40000; points += 137) {
    const info = getLevelInfoFromPoints(points);
    assert.ok(info.progressPercent >= 0 && info.progressPercent <= 100, `${points} -> ${info.progressPercent}`);
  }
});

check("the top level reports no next level and nothing left to earn", () => {
  const top = getLevelInfoFromPoints(30000);
  assert.equal(top.nextLevel, null);
  assert.equal(top.pointsToNextLevel, 0);
  assert.equal(top.progressPercent, 100);
});

// ── Nobody is ever demoted ─────────────────────────────────────────────────
console.log("\nThe level floor");

check("a stored level is never lowered, at any level, with zero points", () => {
  for (let level = 1; level <= MAX_LEVEL; level += 1) {
    assert.equal(getLevelInfoWithLevelFloor(0, level).level, level, `floor failed at ${level}`);
  }
});

check("the floor raises, never caps: more points than the floor still wins", () => {
  assert.equal(getLevelInfoWithLevelFloor(30000, 3).level, 20);
});

check("a missing or nonsense stored level falls back to the derived one", () => {
  assert.equal(getLevelInfoWithLevelFloor(0, null).level, 1);
  assert.equal(getLevelInfoWithLevelFloor(0, 0).level, 1);
  assert.equal(getLevelInfoWithLevelFloor(500, null).level, 5);
});

// ── Tiers and rings ────────────────────────────────────────────────────────
console.log("\nTiers and rings");

check("five tiers covering 1..20 with no gaps", () => {
  assert.equal(LEVEL_TIERS.length, 5);
  assert.equal(LEVEL_TIERS[0].from, 1);
  assert.equal(LEVEL_TIERS[4].to, 20);
  for (let i = 1; i < LEVEL_TIERS.length; i += 1) {
    assert.equal(LEVEL_TIERS[i].from, LEVEL_TIERS[i - 1].to + 1, `tier gap before ${LEVEL_TIERS[i].tierName}`);
  }
});

check("the tier changes on exactly the four milestone levels", () => {
  const tierStarts = LEVEL_TIERS.map((t) => t.from).filter((l) => l > 1);
  assert.deepEqual(tierStarts, [...MILESTONE_LEVELS]);
});

check("milestones are 5, 10, 15, 20 and nothing else", () => {
  const found: number[] = [];
  for (let l = 1; l <= MAX_LEVEL; l += 1) if (isMilestoneLevel(l)) found.push(l);
  assert.deepEqual(found, [5, 10, 15, 20]);
});

check("every level has a tier, and the step within it is 1..5", () => {
  for (let l = 1; l <= MAX_LEVEL; l += 1) {
    const tier = getTierForLevel(l);
    assert.ok(l >= tier.from && l <= tier.to, `level ${l} outside its tier`);
    const step = getTierStep(l);
    assert.ok(step >= 1 && step <= 5, `level ${l} step ${step}`);
  }
});

check("20 ring entries, each with light, dark and ringOnCore", () => {
  for (let l = 1; l <= MAX_LEVEL; l += 1) {
    const c = LEVEL_RING_COLORS[l];
    assert.ok(c, `no ring colours for level ${l}`);
    for (const key of ["light", "dark", "ringOnCore"] as const) {
      assert.match(c[key], /^#[0-9A-Fa-f]{6}$/, `level ${l} ${key} is not a hex colour`);
    }
  }
});

check("the 20 light ring colours are distinct, and so are the 20 dark ones", () => {
  const light = new Set<string>();
  const dark = new Set<string>();
  for (let l = 1; l <= MAX_LEVEL; l += 1) {
    light.add(LEVEL_RING_COLORS[l].light);
    dark.add(LEVEL_RING_COLORS[l].dark);
  }
  assert.equal(light.size, 20);
  assert.equal(dark.size, 20);
});

// ── Contrast, computed rather than asserted ────────────────────────────────
console.log("\nContrast (WCAG 2.x relative luminance)");

function luminance(hex: string) {
  const parts = hex.replace("#", "").match(/../g);
  if (!parts) throw new Error(`bad hex ${hex}`);
  const [r, g, b] = parts
    .map((x) => parseInt(x, 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

check("every ring colour clears 3:1 against the card it sits on", () => {
  for (let l = 1; l <= MAX_LEVEL; l += 1) {
    const light = contrast(LEVEL_RING_COLORS[l].light, "#FFFFFF");
    const dark = contrast(LEVEL_RING_COLORS[l].dark, "#0F1C2B");
    assert.ok(light >= 3, `level ${l} light ring is ${light.toFixed(2)}:1 on white`);
    assert.ok(dark >= 3, `level ${l} dark ring is ${dark.toFixed(2)}:1 on the dark card`);
  }
});

check("the level number is legible in white on every tier core", () => {
  for (const tier of LEVEL_TIERS) {
    const ratio = contrast("#FFFFFF", tier.coreColor);
    assert.ok(ratio >= 4.5, `${tier.tierName} core is ${ratio.toFixed(2)}:1 behind white text`);
  }
});

check("the ring inside the shield separates from the core it sits on", () => {
  for (let l = 1; l <= MAX_LEVEL; l += 1) {
    const core = getTierForLevel(l).coreColor;
    const ratio = contrast(LEVEL_RING_COLORS[l].ringOnCore, core);
    assert.ok(ratio >= 1.5, `level ${l} ring is only ${ratio.toFixed(2)}:1 on its core`);
  }
});

check("the double gold stroke always has one side clearing 3:1 on the crest band", () => {
  // Every theme's accentSoft, from lib/appThemes.ts. The band is one of these.
  const accentSofts = [
    "#EAF2FF", "#123348", "#DDF0FF", "#FFE9B8", "#EBDDFF", "#FFE0DD", "#DCF6E6", "#FFE0EF",
    "#FFE3C9", "#E8EBEF", "#E6E6E4", "#F9E4E9", "#EAE4F6", "#DFF0E6", "#DFECF6", "#F8E7D8", "#F4ECD3",
  ];
  for (const band of accentSofts) {
    const best = Math.max(contrast("#8A6410", band), contrast("#E9C566", band));
    assert.ok(best >= 3, `neither gold clears 3:1 on ${band} (best ${best.toFixed(2)})`);
  }
});

// ── Points cannot be bought or farmed ──────────────────────────────────────
console.log("\nPoints: not payable, not farmable");

check("no payment-derived key can earn a point", () => {
  for (const key of Object.keys(ACTION_POINT_WEIGHTS)) {
    assert.ok(
      !/paid|pro_|stripe|purchase|subscri|diamond|premium|payment/i.test(key),
      `${key} looks payment-derived and carries a weight`,
    );
  }
  const engine = read("lib/pointsEngine.ts");
  const levels = read("lib/levelSystem.ts");
  for (const forbidden of ["is_paid", "pro_expires_at", "membership_status", "stripe"]) {
    assert.ok(!engine.includes(forbidden), `lib/pointsEngine.ts references ${forbidden}`);
    assert.ok(!levels.includes(forbidden), `lib/levelSystem.ts references ${forbidden}`);
  }
});

check("navigation never pays: viewing a page is worth nothing", () => {
  for (const key of ["chapter_notes_viewed", "trivia_started", "trivia_question_answered"]) {
    assert.equal(ACTION_POINT_WEIGHTS[key as keyof typeof ACTION_POINT_WEIGHTS], 0, `${key} should be 0`);
  }
});

check("the Bible in One Year wrapper event stays 0 so a day is not paid twice", () => {
  assert.equal(ACTION_POINT_WEIGHTS.bible_in_one_year_day_completed, 0);
  const parts =
    (ACTION_POINT_WEIGHTS.bible_in_one_year_reading_completed ?? 0) +
    (ACTION_POINT_WEIGHTS.bible_in_one_year_trivia_completed ?? 0) +
    (ACTION_POINT_WEIGHTS.bible_in_one_year_reflection_completed ?? 0);
  assert.equal(parts, 65);
});

check("the two completion gaps are now paid, once per chapter", () => {
  assert.equal(ACTION_POINT_WEIGHTS.trivia_chapter_completed, 15);
  assert.equal(ACTION_POINT_WEIGHTS.scrambled_chapter_completed, 10);
  const engine = read("lib/pointsEngine.ts");
  assert.ok(engine.includes('"trivia_chapter_completed"'), "trivia_chapter_completed is not in UNIQUE_PER_LABEL");
  assert.ok(engine.includes('"scrambled_chapter_completed"'), "scrambled_chapter_completed is not in UNIQUE_PER_LABEL");
});

check("re-reading the same chapter scores once, not fifty times", () => {
  const actions = Array.from({ length: 50 }, () => ({
    action_type: "chapter_completed",
    action_label: "Genesis 3",
    created_at: "2026-11-10T09:00:00Z",
  }));
  const result = computePointsFromActivity({
    actions,
    groupRootPosts: [],
    groupComments: [],
    groupLikesGiven: [],
    likesReceived: [],
  });
  assert.equal(result.studyPoints, ACTION_POINT_WEIGHTS.chapter_completed);
});

check("500 comments in one day score the capped 5", () => {
  const actions = Array.from({ length: 500 }, (_, i) => ({
    action_type: "feed_post_commented",
    action_label: `c${i}`,
    created_at: "2026-11-10T09:00:00Z",
  }));
  const result = computePointsFromActivity({
    actions,
    groupRootPosts: [],
    groupComments: [],
    groupLikesGiven: [],
    likesReceived: [],
  });
  assert.equal(result.studyPoints, 5 * (ACTION_POINT_WEIGHTS.feed_post_commented ?? 0));
});

check("100 correct trivia answers in one day score the capped 10", () => {
  const actions = Array.from({ length: 100 }, (_, i) => ({
    action_type: "trivia_question_correct",
    action_label: `q${i}`,
    created_at: "2026-11-10T09:00:00Z",
  }));
  const result = computePointsFromActivity({
    actions,
    groupRootPosts: [],
    groupComments: [],
    groupLikesGiven: [],
    likesReceived: [],
  });
  assert.equal(result.studyPoints, 10 * (ACTION_POINT_WEIGHTS.trivia_question_correct ?? 0));
});

check("the streak bonus is capped at 50", () => {
  assert.equal(streakBonusPointsFor(0), 0);
  assert.equal(streakBonusPointsFor(7), 5);
  assert.equal(streakBonusPointsFor(309), 50);
  assert.equal(streakBonusPointsFor(null), 0);
});

check("social cannot out-earn study: a whole capped social day is under 100", () => {
  const day = "2026-11-10T09:00:00Z";
  const social = [
    ...Array.from({ length: 50 }, () => ({ action_type: "feed_post_thought", action_label: "x", created_at: day })),
    ...Array.from({ length: 50 }, () => ({ action_type: "feed_post_liked", action_label: "x", created_at: day })),
    ...Array.from({ length: 50 }, () => ({ action_type: "feed_post_commented", action_label: "x", created_at: day })),
    ...Array.from({ length: 50 }, () => ({ action_type: "feed_post_replied", action_label: "x", created_at: day })),
  ];
  const result = computePointsFromActivity({
    actions: social,
    groupRootPosts: [],
    groupComments: [],
    groupLikesGiven: [],
    likesReceived: [],
  });
  assert.ok(result.totalPoints < 100, `a capped social day earns ${result.totalPoints}`);
});

// ── The celebration ────────────────────────────────────────────────────────
console.log("\nThe level-up celebration");

check("confetti fires at every one of the 20 levels", () => {
  for (let l = 1; l <= MAX_LEVEL; l += 1) {
    const c = confettiForLevel(l);
    assert.ok(c.durationMs > 0, `level ${l} has no confetti`);
    assert.ok((c.origins ?? 1) >= 1);
  }
});

check("milestones burst longer than the levels around them, and 20 longest of all", () => {
  for (const m of MILESTONE_LEVELS) {
    if (m === 20) continue;
    assert.ok(
      confettiForLevel(m).durationMs > confettiForLevel(m + 1).durationMs,
      `level ${m} should burst longer than ${m + 1}`,
    );
  }
  const top = confettiForLevel(20).durationMs;
  for (let l = 1; l < 20; l += 1) {
    assert.ok(top >= confettiForLevel(l).durationMs, `level ${l} bursts longer than level 20`);
  }
});

check("the fast band (2-4) bursts shortest", () => {
  assert.ok(confettiForLevel(2).durationMs < confettiForLevel(6).durationMs);
  assert.equal(confettiForLevel(2).durationMs, confettiForLevel(4).durationMs);
});

check("the celebration is portalled through ModalShell, not a bare fixed overlay", () => {
  const src = read("components/LevelUpCelebration.tsx");
  assert.ok(src.includes("ModalShell"), "LevelUpCelebration does not use ModalShell");
  assert.ok(!/className="[^"]*fixed inset-0/.test(src), "LevelUpCelebration has a bare fixed overlay");
  assert.ok(read("components/ModalShell.tsx").includes("createPortal"), "ModalShell no longer portals");
  // The old inline modal must be gone from the card.
  const card = read("components/LevelProgressCard.tsx");
  assert.ok(!/fixed inset-0/.test(card), "LevelProgressCard still has the old inline modal");
  assert.ok(card.includes("LevelUpCelebration"), "LevelProgressCard does not render the celebration");
});

check("nothing in the level surfaces polls", () => {
  for (const path of [
    "components/LevelUpCelebration.tsx",
    "components/LevelProgressCard.tsx",
    "components/LevelRing.tsx",
    "components/LevelBadge.tsx",
  ]) {
    const src = read(path);
    assert.ok(!src.includes("setInterval"), `${path} uses setInterval`);
    assert.ok(!src.includes(".channel("), `${path} opens a realtime channel`);
    assert.ok(!src.includes("realtime"), `${path} mentions realtime`);
  }
  // The one interval in the feature is the confetti burst, which is bounded by
  // its own duration and cleared on unmount.
  const celebration = read("lib/celebration.ts");
  assert.ok(celebration.includes("clearInterval"), "the confetti burst does not clear its interval");
  assert.ok(celebration.includes("observer.disconnect()"), "the confetti burst does not disconnect its observer");
});

check("reduced motion is respected", () => {
  const celebration = read("lib/celebration.ts");
  assert.ok(celebration.includes("prefers-reduced-motion"), "lib/celebration.ts does not check reduced motion");
  assert.ok(
    /if \(prefersReducedMotion\(\)\) return/.test(celebration),
    "fireConfettiBurst does not bail out under reduced motion",
  );
  const css = read("app/globals.css");
  assert.ok(css.includes(".bb-levelup-shield { animation: none"), "the shield animation is not disabled");
  const src = read("components/LevelUpCelebration.tsx");
  assert.ok(src.includes("prefersReducedMotion"), "the celebration does not drop its animation classes");
});

check("the celebration is announced as a dialog and never by colour alone", () => {
  const src = read("components/LevelUpCelebration.tsx");
  assert.ok(src.includes('role="dialog"'));
  assert.ok(src.includes('aria-modal="true"'));
  assert.ok(src.includes("aria-labelledby"));
  assert.ok(src.includes('event.key === "Escape"'), "Escape does not dismiss");
  assert.ok(src.includes("previouslyFocused"), "focus is not returned on close");
  assert.ok(src.includes('aria-hidden="true"') || src.includes("aria-hidden"), "decorative SVG is not hidden");
});

check("the band hairline and the double gold stroke are both present", () => {
  const src = read("components/LevelUpCelebration.tsx");
  assert.ok(
    src.includes("vectorEffect=\"non-scaling-stroke\""),
    "the crest-band hairline is missing its non-scaling stroke",
  );
  assert.ok(src.includes("var(--bb-card-border"), "the hairline does not use the card border token");
  assert.ok(src.includes("GOLD_LIGHT") && src.includes("GOLD_DARK"), "the shield is not double-stroked");
});

check("the celebration is themed: no hardcoded card, text, button or bar colour", () => {
  const src = read("components/LevelUpCelebration.tsx");
  for (const token of [
    "var(--bb-card,",
    "var(--bb-card-border,",
    "var(--bb-accent-soft,",
    "var(--bb-accent,",
    "var(--bb-text-primary,",
    "var(--bb-text-secondary,",
    "var(--bb-text-muted,",
    "var(--bb-surface-soft,",
    "var(--bb-progress-track,",
    "var(--bb-progress-fill,",
    "var(--bb-button,",
    "var(--bb-button-text,",
  ]) {
    assert.ok(src.includes(token), `the celebration does not use ${token}`);
  }
  // The gold and the tier cores are the only fixed colours allowed.
  const allowed = new Set([
    "#8A6410", "#E9C566", "#FBEFB4", "#E3BA4E", "#C29121", "#A97C14", "#3B2A05", "#FFFFFF",
    "#ffffff", "#d8e3ec", "#eaf2ff", "#0056fd", "#101827", "#334155", "#64748b", "#eef4f8",
  ]);
  const hexes = src.match(/#[0-9A-Fa-f]{6}/g) || [];
  for (const hex of hexes) {
    assert.ok(allowed.has(hex), `unexpected hardcoded colour ${hex} in LevelUpCelebration`);
  }
});

// ── Celebration bookkeeping ────────────────────────────────────────────────
console.log("\nCelebration bookkeeping (a missed popup is not lost, a retry cannot repeat it)");

check("a level-up is owed from level_celebrated, not from this request", () => {
  const src = read("app/api/points/summary/route.ts");
  assert.ok(src.includes("level_celebrated"), "the summary route does not read level_celebrated");
  assert.ok(
    /const leveledUp = typeof celebrated === "number" \? levelInfo\.level > celebrated : false;/.test(src),
    "leveledUp is not derived from level_celebrated",
  );
  // The summary route may write level_celebrated in exactly one place: seeding
  // a user who has none (see the seed check above). It must never ADVANCE an
  // existing mark - that is the ack route's job, and advancing it here would
  // swallow the celebration it is supposed to owe.
  const writes = src.match(/(?:upsert|update)\(\s*\{[^}]*level_celebrated/g) || [];
  assert.equal(writes.length, 1, `expected exactly one level_celebrated write in the summary route, found ${writes.length}`);
  const writeAt = src.search(/(?:upsert|update)\(\s*\{[^}]*level_celebrated/);
  const seedAt = src.indexOf("if (celebrated === null)");
  assert.ok(seedAt >= 0 && writeAt > seedAt, "the level_celebrated write is not inside the null-seed branch");
  // And it must be guarded, not unconditional.
  const between = src.slice(seedAt, writeAt);
  assert.ok(!/\n\s*\}/.test(between.replace(/\{[^{}]*\}/g, "")), "the seed branch appears to close before the write");
});

check("a user with no mark gets one seeded, or the feature never fires for them", () => {
  // null means "never celebrated" and leveledUp is false for null, which is
  // what stopped the backfill greeting 1,153 existing users. But nothing else
  // writes the column - the ack route only runs after a popup was shown - so a
  // user created after the backfill would sit at null for ever and never see a
  // single celebration. Found on 2026-11-11 with 14 such rows already in
  // production.
  const src = read("app/api/points/summary/route.ts");
  assert.ok(
    /if \(celebrated === null\)/.test(src),
    "the summary route does not seed level_celebrated for a user who has none",
  );
  assert.ok(
    /level_celebrated: levelInfo\.level/.test(src),
    "the seed does not write the level the user already has",
  );
  // The seed must not also announce. leveledUp is computed before it and stays
  // false for null, so a seeded user sees nothing this time round.
  const seedAt = src.indexOf("if (celebrated === null)");
  const leveledUpAt = src.indexOf("const leveledUp =");
  assert.ok(leveledUpAt < seedAt, "leveledUp is computed after the seed, so a new user would be greeted");
});

check("the acknowledgement is a monotonic high-water mark", () => {
  const src = read("app/api/points/celebrated/route.ts");
  assert.ok(src.includes("level_celebrated"), "the ack route does not write level_celebrated");
  assert.ok(src.includes("if (level <= current)"), "the ack route can move the mark backwards");
  assert.ok(src.includes("MAX_LEVEL"), "the ack route does not bound the level it accepts");
});

check("the summary route survives the column not existing yet", () => {
  // Shipped on 2026-11-10 without this and the endpoint returned 500 for every
  // user for as long as the code was live before the migration ran, because
  // PostgREST fails the whole SELECT on one unknown column. Code and migrations
  // do not land at the same instant, so the column has to be optional.
  const src = read("app/api/points/summary/route.ts");
  assert.ok(src.includes("fetchProfile"), "the profile read is not isolated behind a helper");
  assert.ok(
    /if \(!\/level_celebrated\/\.test\(withColumn\.error\.message\)\)/.test(src),
    "the summary route does not fall back when level_celebrated is missing",
  );
  assert.ok(
    src.includes('.select("current_level, current_streak, display_name")'),
    "there is no fallback select without the optional column",
  );
  // The opt-out read must degrade to "enabled" rather than throwing.
  const milestones = read("lib/communityMilestones.ts");
  assert.ok(
    /const \{ data: prefs \} = await admin/.test(milestones),
    "the opt-out read destructures error, so a missing column would throw",
  );
});

check("the migration adds both columns, nullable and without defaults", () => {
  const sql = read("supabase/migrations/ADD_LEVEL_CELEBRATED_AND_MILESTONE_OPT_OUT.sql");
  assert.ok(/ADD COLUMN IF NOT EXISTS level_celebrated integer/.test(sql));
  assert.ok(/ADD COLUMN IF NOT EXISTS milestone_posts_enabled boolean/.test(sql));
  // Only the ALTER statements matter here; the file's comments discuss NOT NULL
  // and DEFAULT precisely because it deliberately uses neither.
  const alters = sql
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n")
    .split(";")
    .filter((stmt) => /ALTER TABLE/i.test(stmt));
  assert.equal(alters.length, 2, `expected 2 ALTER statements, found ${alters.length}`);
  for (const stmt of alters) {
    assert.ok(!/NOT NULL/i.test(stmt.replace(/IF NOT EXISTS/gi, "")), "a NOT NULL would rewrite the live table");
    assert.ok(!/DEFAULT/i.test(stmt), "a default would change existing behaviour");
  }
});

check("the backfill seals level_celebrated so nobody is greeted retroactively", () => {
  const src = read("scripts/recompute-all-levels.ts");
  assert.ok(src.includes("level_celebrated"), "the recompute does not seal level_celebrated");
  assert.ok(src.includes("--dry"), "the recompute has no dry run");
  assert.ok(src.includes("getLevelInfoWithLevelFloor"), "the recompute does not use the level floor");
  assert.ok(
    src.includes("actionsByUser.keys()"),
    "the recompute still drives from profile_stats alone and will skip users with no stats row",
  );
});

check("every paged read checks error rather than trusting a short page", () => {
  for (const path of ["app/api/points/summary/route.ts", "scripts/recompute-all-levels.ts"]) {
    const src = read(path);
    assert.ok(src.includes("if (error)"), `${path} does not check error on a paged read`);
    // Strip comments first: these files explain the 1,000-row cap in prose,
    // and a check that trips on its own documentation is worse than no check.
    const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "").replace(/^\s*\*.*$/gm, "");
    const bigLimits = (code.match(/\.limit\((\d+)\)/g) || [])
      .map((m) => Number(m.replace(/\D/g, "")))
      .filter((n) => n > 1000);
    assert.equal(bigLimits.length, 0, `${path} has a .limit() above the PostgREST cap of 1000`);
  }
});

// ── Founder Buddy ──────────────────────────────────────────────────────────
console.log("\nFounder Buddy");

check("the badge is untouched: all seven keys still resolve", () => {
  const src = read("lib/userBadges.ts");
  for (const key of ["founder_buddy", "teacher", "moderator", "top_buddy", "pro_buddy", "buddy_partner", "pro_trial"]) {
    assert.ok(src.includes(`"${key}"`), `${key} is missing from userBadges`);
  }
  assert.ok(src.includes("Founder Buddy"), "the Founder Buddy label is gone");
});

check("identity renders before the level chip on every surface that shows both", () => {
  for (const path of ["components/comments/CommentSection.tsx", "components/GroupPostThread.tsx"]) {
    const src = read(path);
    const badge = src.indexOf("<UserBadge");
    const level = src.indexOf("<LevelBadge");
    assert.ok(badge >= 0, `${path} does not render UserBadge`);
    assert.ok(level >= 0, `${path} does not render LevelBadge`);
    assert.ok(badge < level, `${path} renders the level chip before the identity badge`);
  }
});

check("dense rows get the chip, not the ring", () => {
  for (const path of ["components/comments/CommentSection.tsx", "components/GroupPostThread.tsx"]) {
    assert.ok(!read(path).includes("<LevelRing"), `${path} uses a ring in a dense row`);
  }
});

// ── The milestone opt-out ──────────────────────────────────────────────────
console.log("\nMilestone posts");

check("the wall poster respects the opt-out, and null still means enabled", () => {
  const src = read("lib/communityMilestones.ts");
  assert.ok(src.includes("milestone_posts_enabled"), "postMilestoneToWall does not check the opt-out");
  assert.ok(src.includes("=== false"), "the opt-out treats null as disabled");
});

check("the per-person daily cap has not crept up", () => {
  const src = read("lib/communityMilestones.ts");
  const match = src.match(/MAX_MILESTONE_POSTS_PER_DAY = (\d+)/);
  assert.ok(match, "the daily cap is gone");
  assert.ok(Number(match[1]) <= 2, `the daily cap is now ${match[1]}`);
});

console.log(`\n${checks} checks passed.\n`);
