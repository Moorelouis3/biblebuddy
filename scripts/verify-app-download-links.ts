/**
 * Checks where the blog's download banners send people.
 *
 *   npx tsx scripts/verify-app-download-links.ts
 *
 * Two jobs. First, that today every reader on every device lands on the App
 * Store and nothing anywhere offers Android, which is not live yet. Second,
 * that the device routing really works once lib/appDownload.ts has a Play
 * URL - that code is dormant until Louis supplies one, and dormant code that
 * has never run is a promise, not a feature.
 *
 * It also walks every blog post folder and reports which of the four banners
 * the rotation actually hands out, so a design cannot quietly go unused.
 */
import fs from "node:fs";
import path from "node:path";
import {
  APP_STORES,
  androidIsLive,
  detectStorePlatform,
  showsBothStores,
  storeHref,
} from "../lib/appDownload";
import { pickPromoBanner } from "../lib/blogPromoBanners";

const APPLE = "https://apps.apple.com/app/id6822155944";

const UA = {
  iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
  ipadDesktopMode: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
  android: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
  mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  windows: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  nonsense: "",
};

let failures = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
};

// ---------------------------------------------------------------- today ----
console.log("\nTODAY — Android not live\n");

check("the Apple listing is the one Louis gave", APP_STORES.apple === APPLE, APP_STORES.apple);
check("no Android URL is set", !androidIsLive(), String(APP_STORES.google));

check("iPhone goes to the App Store", storeHref(detectStorePlatform(UA.iphone)) === APPLE);
check("iPad in desktop mode is still an iPad", detectStorePlatform(UA.ipadDesktopMode, 5) === "ios");
check("a Mac is not mistaken for an iPad", detectStorePlatform(UA.mac, 0) === "other");
check("Android goes to the App Store too", storeHref(detectStorePlatform(UA.android)) === APPLE);
check("desktop goes to the App Store", storeHref(detectStorePlatform(UA.windows)) === APPLE);
check("an unreadable user agent still gets a link", storeHref(detectStorePlatform(UA.nonsense)) === APPLE);

// The part that would embarrass us: advertising a store that does not exist.
const everyPlatform = ["ios", "android", "other"] as const;
check(
  "nobody is offered a choice of stores yet",
  everyPlatform.every((p) => !showsBothStores(p)),
);
check(
  "nobody is sent anywhere but Apple",
  everyPlatform.every((p) => storeHref(p) === APPLE),
);

// ------------------------------------------------------- once Android is in --
console.log("\nONCE THE PLAY URL IS ADDED (simulated)\n");

const PLAY = "https://play.google.com/store/apps/details?id=com.example.test";
APP_STORES.google = PLAY;

check("Android is live", androidIsLive());
check("an Android phone goes to Google Play", storeHref(detectStorePlatform(UA.android)) === PLAY);
check("an iPhone still goes to the App Store", storeHref(detectStorePlatform(UA.iphone)) === APPLE);
check("an iPad still goes to the App Store", storeHref(detectStorePlatform(UA.ipadDesktopMode, 5)) === APPLE);
check("desktop is offered both stores", showsBothStores(detectStorePlatform(UA.windows)));
check("a phone is never asked to choose", !showsBothStores("ios") && !showsBothStores("android"));

APP_STORES.google = null;
check("restored to not-live for the rest of the run", !androidIsLive());

// An empty string is the mistake someone will make instead of null.
APP_STORES.google = "   ";
check("a blank Android URL does not count as live", !androidIsLive());
APP_STORES.google = null;

// ------------------------------------------------------------- rotation ----
console.log("\nROTATION ACROSS THE BLOG\n");

const blogDir = path.join(process.cwd(), "app", "blog");
const slugs = fs
  .readdirSync(blogDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== "category")
  .map((entry) => entry.name);

// Three slots is what a typical post carries; the exact number only moves
// where a post starts, not whether every design gets used.
const SLOTS = 3;
const seen = new Map<string, number>();
for (const slug of slugs) {
  for (let slot = 0; slot < SLOTS; slot++) {
    const banner = pickPromoBanner(slug, slot);
    seen.set(banner.name, (seen.get(banner.name) || 0) + 1);
  }
}

check("every blog post folder was read", slugs.length > 100, `${slugs.length} posts`);
check("all four designs are in use", seen.size === 4, [...seen.keys()].join(", "));
for (const [name, count] of [...seen.entries()].sort()) {
  const share = ((count / (slugs.length * SLOTS)) * 100).toFixed(1);
  console.log(`    ${name.padEnd(24)} ${String(count).padStart(4)}  (${share}%)`);
}

// Nobody should meet the same design twice in one post.
const repeats = slugs.filter((slug) => {
  const names = Array.from({ length: SLOTS }, (_, slot) => pickPromoBanner(slug, slot).name);
  return new Set(names).size !== names.length;
});
check("no post shows the same design twice", repeats.length === 0, repeats.slice(0, 3).join(", "));

// --------------------------------------------------------------- assets ----
console.log("\nARTWORK ON DISK\n");

for (const name of [...seen.keys()].sort()) {
  const file = path.join(process.cwd(), "public", "promos", `${name}.jpg`);
  const exists = fs.existsSync(file);
  const kb = exists ? Math.round(fs.statSync(file).size / 1024) : 0;
  check(`${name}.jpg is there and a sensible size`, exists && kb < 350, exists ? `${kb}KB` : "missing");
}

const leftovers = fs
  .readdirSync(path.join(process.cwd(), "public", "promos"))
  .filter((f) => f.startsWith("promo-banner-"));
check("the old banners are gone", leftovers.length === 0, leftovers.join(", "));

console.log(`\n${failures === 0 ? "ALL PASS" : `${failures} FAILED`}\n`);
process.exit(failures === 0 ? 0 : 1);
