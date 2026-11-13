/**
 * npm run verify:popups
 *
 * Checks the popup rules in lib/popups/decide.ts against the three journeys
 * in docs/POPUP_SYSTEM_PROPOSAL.md, and the catalog against a few promises
 * (unique ids, the underlined words end the headline, real action names).
 * Offline: no network, no database.
 */

import assert from "node:assert/strict";
import { ACTION_TYPE } from "../lib/actionTypes";
import { POPUP_CATALOG } from "../lib/popups/catalog";
import {
  decide,
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

console.log(`\n${passed} checks passed.`);
