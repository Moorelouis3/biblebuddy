/**
 * npm run verify:popups
 *
 * Checks the popup rules in lib/popups/decide.ts against the three journeys
 * in docs/POPUP_SYSTEM_PROPOSAL.md, and the catalog against a few promises
 * (unique ids, the underlined words end the headline, real action names).
 * Offline: no network, no database.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ACTION_TYPE } from "../lib/actionTypes";
import { POPUP_CATALOG, TIPS_CATALOG } from "../lib/popups/catalog";
import {
  decide,
  HOURS_BETWEEN_POPUPS,
  MAX_AUTOMATIC_DISPLAYS,
  MAX_POPUPS_PER_WEEK,
  nextEligibleAfterClose,
  sameVisit,
  type DecideInput,
  type PopupHistory,
} from "../lib/popups/decide";

const NOW = new Date("2026-11-20T09:00:00Z");
const daysAgo = (days: number) => new Date(NOW.getTime() - days * 86_400_000).toISOString();
const hoursAgo = (hours: number) => new Date(NOW.getTime() - hours * 3_600_000).toISOString();

const allOn = Object.fromEntries(POPUP_CATALOG.map((popup) => [popup.id, { enabled: true }]));

const base = (over: Partial<DecideInput> = {}): DecideInput => ({
  now: NOW,
  pathname: "/dashboard",
  catalog: POPUP_CATALOG,
  settings: allOn,
  history: {},
  devices: new Set(),
  usedActions: new Set<string>(),
  accountCreatedAt: daysAgo(30),
  busy: null,
  shownThisVisit: false,
  lastAutomaticAt: null,
  automaticInLast7Days: 0,
  ...over,
});

const seen = (over: Partial<PopupHistory> = {}): PopupHistory => ({
  version: 1,
  displayCount: 1,
  lastShownAt: daysAgo(1),
  dismissedAt: null,
  ctaClickedAt: null,
  completedAt: null,
  neverAgain: false,
  nextEligibleAt: null,
  ...over,
});

/** Somebody who already uses the two discovery features, so only tutorials are in play. */
const triviaOnly = (over: Partial<DecideInput> = {}) =>
  base({ pathname: "/bible-trivia", usedActions: new Set(["feed_post_thought", "understand_verse_of_the_day"]), ...over });

let passed = 0;
const check = (name: string, run: () => void) => {
  run();
  passed += 1;
  console.log(`  ok  ${name}`);
};

console.log("Catalog");

check("ids are unique", () => {
  const ids = POPUP_CATALOG.map((popup) => popup.id);
  assert.equal(new Set(ids).size, ids.length);
});

check("the underlined words end the headline", () => {
  for (const popup of POPUP_CATALOG) assert.ok(popup.headline.endsWith(popup.headlineAccent), popup.id);
});

check("every 'already uses it' action is a real action type", () => {
  const known = new Set<string>(Object.values(ACTION_TYPE));
  for (const popup of POPUP_CATALOG) for (const action of popup.usedWhen) assert.ok(known.has(action), `${popup.id}: ${action}`);
});

check("copy stays short enough for a phone", () => {
  for (const popup of POPUP_CATALOG) {
    assert.ok(popup.headline.length <= 34, `${popup.id} headline`);
    assert.ok(popup.description.length <= 130, `${popup.id} description`);
    assert.ok(popup.steps.length <= 4, `${popup.id} steps`);
  }
});

console.log("Rules");

check("everything switched off shows nothing", () => {
  assert.equal(decide(base({ settings: {} })).chosen, null);
});

check("new user, day 1, in the reader: the reader tutorial", () => {
  const result = decide(base({ accountCreatedAt: hoursAgo(2), pathname: "/bible/genesis/1" }));
  assert.equal(result.chosen?.id, "tutorial_reader_study_notes");
});

check("new user, day 1, on the dashboard: nothing", () => {
  assert.equal(decide(base({ accountCreatedAt: hoursAgo(2) })).chosen, null);
});

check("a tutorial never appears outside its section", () => {
  const result = decide(base({ pathname: "/bb-feed" }));
  assert.ok(result.chosen?.kind !== "tutorial");
});

check("an announcement does not appear in the section it announces", () => {
  const verdict = decide(base({ pathname: "/bb-feed" })).verdicts.find((item) => item.id === "discover_feed");
  assert.equal(verdict?.reason, "already in that section");
});

check("one per visit: moving to another section does not earn a second", () => {
  const result = decide(base({ pathname: "/bible-trivia", shownThisVisit: true }));
  assert.equal(result.chosen, null);
  assert.equal(result.blockedBy, "one already shown this visit");
});

check("20 hours between popups, across visits", () => {
  assert.equal(decide(base({ pathname: "/bible-trivia", lastAutomaticAt: hoursAgo(5) })).chosen, null);
  assert.equal(decide(base({ pathname: "/bible-trivia", lastAutomaticAt: hoursAgo(21) })).chosen?.id, "tutorial_trivia");
});

check("three in a week is the ceiling", () => {
  assert.equal(decide(base({ pathname: "/bible-trivia", lastAutomaticAt: hoursAgo(30), automaticInLast7Days: 3 })).chosen, null);
});

check("busy means nothing, whatever is eligible", () => {
  const result = decide(base({ pathname: "/bible/genesis/1", busy: "typing" }));
  assert.equal(result.chosen, null);
  assert.equal(result.blockedBy, "busy: typing");
});

check("an experienced user is not taught what they already do", () => {
  const usedActions = new Set(POPUP_CATALOG.flatMap((popup) => popup.usedWhen));
  for (const pathname of ["/dashboard", "/bible/john/3", "/bible-trivia", "/bb-feed", "/devotionals/x/day/2"]) {
    assert.equal(decide(base({ pathname, usedActions })).chosen, null, pathname);
  }
});

check("a returning user who never opened the feed hears about it on the dashboard", () => {
  const usedActions = new Set(["understand_verse_of_the_day"]);
  assert.equal(decide(base({ usedActions })).chosen?.id, "discover_feed");
});

check("closing it snoozes it for two weeks, then it may return once", () => {
  const closed = seen({ dismissedAt: daysAgo(1), nextEligibleAt: nextEligibleAfterClose(new Date(daysAgo(1))) });
  const history = { tutorial_trivia: closed };
  assert.equal(decide(triviaOnly({ history })).chosen, null);
  const later = new Date(NOW.getTime() + 14 * 86_400_000);
  assert.equal(decide(triviaOnly({ now: later, history })).chosen?.id, "tutorial_trivia");
});

check("closed twice: never again on its own", () => {
  const history = { tutorial_trivia: seen({ displayCount: 2, nextEligibleAt: daysAgo(1) }) };
  assert.equal(decide(triviaOnly({ history })).chosen, null);
});

check("tapping the button, or 'don't show again', ends it", () => {
  for (const past of [seen({ ctaClickedAt: daysAgo(3) }), seen({ neverAgain: true })]) {
    assert.equal(decide(triviaOnly({ history: { tutorial_trivia: past } })).chosen, null);
  }
});

check("only a new content version brings a finished popup back", () => {
  const history = { tutorial_trivia: seen({ ctaClickedAt: daysAgo(40) }) };
  const bumped = POPUP_CATALOG.map((popup) => (popup.id === "tutorial_trivia" ? { ...popup, version: 2 } : popup));
  assert.equal(decide(triviaOnly({ history })).chosen, null);
  assert.equal(decide(triviaOnly({ history, catalog: bumped })).chosen?.id, "tutorial_trivia");
});

check("an expired popup is never chosen", () => {
  const settings = { ...allOn, tutorial_trivia: { enabled: true, expiresAt: daysAgo(1) } };
  assert.equal(decide(triviaOnly({ settings })).chosen, null);
});

check("something with an end date goes before something that can wait", () => {
  const settings = { ...allOn, discover_verse_of_the_day: { enabled: true, expiresAt: new Date(NOW.getTime() + 86_400_000).toISOString() } };
  assert.equal(decide(base({ settings })).chosen?.id, "discover_verse_of_the_day");
});

check("the reasons explain every popup, chosen or not", () => {
  const result = decide(base({ pathname: "/bible-trivia" }));
  assert.equal(result.verdicts.length, POPUP_CATALOG.length);
  assert.ok(result.verdicts.every((verdict) => verdict.reason.length > 0));
});

check("a visit ends after 30 quiet minutes, not on refresh", () => {
  assert.equal(sameVisit(new Date(NOW.getTime() - 5 * 60_000).toISOString(), NOW), true);
  assert.equal(sameVisit(new Date(NOW.getTime() - 31 * 60_000).toISOString(), NOW), false);
  assert.equal(sameVisit(null, NOW), false);
});

console.log("Coordinator");

const coordinator = readFileSync("components/popups/PopupCoordinator.tsx", "utf8");
const migration = readFileSync("supabase/migrations/20261113_popup_coordinator.sql", "utf8");
const analytics = readFileSync("app/api/landing-analytics/route.ts", "utf8");

check("the coordinator asks the database before it opens anything", () => {
  const asks = coordinator.indexOf('rpc("claim_popup"');
  assert.ok(asks > 0 && asks < coordinator.indexOf("setOpen({ popup"));
});

check("a popup never writes study activity", () => {
  assert.ok(!/from\("master_actions"\)\s*\.(insert|upsert|update)/.test(coordinator));
  const start = analytics.indexOf("const MASTER_ACTION_BY_EVENT");
  const mapped = analytics.slice(start, analytics.indexOf("};", start));
  for (const event of ["popup_shown", "popup_dismissed", "popup_cta_clicked", "popup_feature_adopted"]) {
    assert.ok(analytics.includes('"' + event + '"'), event + " is allowed");
    assert.ok(!mapped.includes(event), event + " is not study activity");
  }
});

check("the database holds the same limits as the rules", () => {
  assert.ok(migration.includes("interval '20 hours'") && HOURS_BETWEEN_POPUPS === 20);
  assert.ok(migration.includes(">= 3 then") && MAX_POPUPS_PER_WEEK === 3);
  assert.ok(migration.includes("display_count >= 2") && MAX_AUTOMATIC_DISPLAYS === 2);
});

check("the migration only adds: nothing a person has seen is removed", () => {
  assert.ok(!/(delete from|truncate|drop table|drop column)/i.test(migration));
});

check("outcome writes are actually sent (a bare `void supabase...` never is)", () => {
  const code = coordinator.replace(/\/\*[\s\S]*?\*\//g, "");
  assert.ok(!/void supabase\s*\.from/.test(code));
  assert.ok((code.match(/send\(/g) || []).length >= 4);
});

console.log("Store asks");

const iphone = new Set(["ios_web"] as const);
const everythingUsed = new Set(POPUP_CATALOG.flatMap((popup) => popup.usedWhen));

check("the App Store ask only exists on an iPhone browser", () => {
  assert.equal(decide(base({ usedActions: everythingUsed })).chosen, null);
  assert.equal(decide(base({ usedActions: everythingUsed, devices: iphone })).chosen?.id, "ask_app_store");
  assert.equal(decide(base({ usedActions: everythingUsed, devices: new Set(["android_web"] as const) })).chosen?.id, "ask_android_beta");
});

check("an ask waits behind a tutorial and behind an announcement", () => {
  assert.equal(decide(base({ devices: iphone, pathname: "/bible-trivia" })).chosen?.id, "tutorial_trivia");
  assert.equal(decide(base({ devices: iphone })).chosen?.kind, "announcement");
});

check("the App Store ask is under the same limits as everything else", () => {
  const on = { usedActions: everythingUsed, devices: iphone };
  assert.equal(decide(base({ ...on, shownThisVisit: true })).chosen, null);
  assert.equal(decide(base({ ...on, lastAutomaticAt: hoursAgo(3) })).chosen, null);
  assert.equal(decide(base({ ...on, lastAutomaticAt: hoursAgo(30), automaticInLast7Days: 3 })).chosen, null);
});

check("'don't show this again' and a tap both end the ask", () => {
  const on = { usedActions: everythingUsed, devices: iphone };
  assert.equal(decide(base({ ...on, history: { ask_app_store: seen({ neverAgain: true }) } })).chosen, null);
  assert.equal(decide(base({ ...on, history: { ask_app_store: seen({ ctaClickedAt: daysAgo(2) }) } })).chosen, null);
});

check("only asks offer 'don't show this again', and Tips lists none of them", () => {
  for (const popup of POPUP_CATALOG) assert.equal(Boolean(popup.offerNeverAgain), popup.kind === "ask", popup.id);
  assert.ok(TIPS_CATALOG.length > 0 && TIPS_CATALOG.every((popup) => popup.kind !== "ask"));
});

check("the old store popups stand down when the coordinator is on", () => {
  for (const file of ["components/AppStorePopup.tsx", "components/AndroidBetaPopup.tsx"]) {
    const source = readFileSync(file, "utf8");
    const guard = source.indexOf("if (coordinatorActive()) return;");
    assert.ok(guard > 0 && guard < source.indexOf("setOpen(true)"), file);
  }
});

check("the ask's facts match the app: store id, tester numbers", () => {
  const review = readFileSync("lib/appReviewPrompt.ts", "utf8");
  const beta = readFileSync("lib/androidBeta.ts", "utf8");
  const appStore = POPUP_CATALOG.find((popup) => popup.id === "ask_app_store");
  const android = POPUP_CATALOG.find((popup) => popup.id === "ask_android_beta");
  const storeId = appStore?.cta.href.split("/id")[1] ?? "missing";
  assert.ok(review.includes('"' + storeId + '"'), "App Store id");
  assert.ok(beta.includes("TESTERS_NEEDED = 12") && android?.description.includes("12 people"));
  assert.ok(beta.includes("TESTER_DAYS = 14") && android?.description.includes("14 days"));
});

check("the switch is off", () => {
  assert.ok(readFileSync("lib/popups/switch.ts", "utf8").includes("export const COORDINATOR_ENABLED = false;"));
});

check("test mode can only tighten: the pretend-device switch stays localhost-only", () => {
  const source = readFileSync("lib/popups/switch.ts", "utf8");
  const pretend = source.slice(source.indexOf("export function testDevice"));
  assert.ok(pretend.includes("!onLocalhost()"));
});

console.log(`\n${passed} checks passed.`);
