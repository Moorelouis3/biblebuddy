/**
 * Widget taps land where they say (Louis, 2026-11-21: the Bible Lock widget's
 * "set it up" opened the dashboard). Offline: checks the helper's behaviour
 * and that the three pieces are wired together.
 */
import { readFileSync } from "fs";
import assert from "assert";
import { resolveOpenedPath, setPendingDeepLink, takePendingDeepLink } from "../lib/pendingDeepLink";

let passed = 0;
const ok = (name: string, fn: () => void) => {
  fn();
  passed += 1;
  console.log(`  ok  ${name}`);
};

ok("the 1.17 widget's /settings opens the Bible Lock page", () => assert.equal(resolveOpenedPath("/settings"), "/bible-lock"));
ok("other links are left alone", () => {
  assert.equal(resolveOpenedPath("/dashboard"), "/dashboard");
  assert.equal(resolveOpenedPath("/settings?tab=notifications"), "/settings?tab=notifications");
});
ok("a pending link is handed over once", () => {
  setPendingDeepLink("/bible-lock");
  assert.equal(takePendingDeepLink(), "/bible-lock");
  assert.equal(takePendingDeepLink(), null);
});

const deepLinks = readFileSync("components/NativeDeepLinks.tsx", "utf8");
ok("NativeDeepLinks maps and holds the opened path", () => {
  assert.match(deepLinks, /resolveOpenedPath\(/);
  assert.match(deepLinks, /setPendingDeepLink\(path\)/);
});
const frontDoor = readFileSync("app/app/page.tsx", "utf8");
ok("the front door prefers the opened link over /dashboard", () =>
  assert.match(frontDoor, /router\.replace\(takePendingDeepLink\(\) \|\| "\/dashboard"\)/));
const widget = readFileSync("native/ios-extensions/BibleBuddyWidgets/WidgetViews.swift", "utf8");
ok("the widget itself points at /bible-lock from the next build", () =>
  assert.match(widget, /case \.notSetUp: return "\/bible-lock"/));

console.log(`\n${passed} checks passed.`);
