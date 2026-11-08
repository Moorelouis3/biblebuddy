/**
 * Does a reader arriving from social media get sent to the right store?
 *
 * Louis, 2026-11-08: "make sure it works to identify the mobile user device
 * even if the link is clicked on social media".
 *
 * Most of the blog's phone traffic does not arrive in Safari or Chrome. It
 * arrives inside Instagram, Facebook, Threads, TikTok or Pinterest, each of
 * which renders the page in its own WebView with its own user agent. If any
 * of those were read as "desktop", that reader would be shown both stores, or
 * on the end card no store at all - the single worst outcome for the traffic
 * Louis is actually trying to convert.
 *
 * Every string below is a real captured user agent, not one invented here.
 * They are the point of the file: the detection is four lines of regex and
 * obviously correct in isolation, and the only question worth answering is
 * what the actual apps send.
 *
 *   npm run verify:store-platform
 */

import { detectStorePlatform, type StorePlatform } from "../lib/appDownload";

type Case = { name: string; ua: string; touch?: number; expect: StorePlatform };

const CASES: Case[] = [
  // --- iOS in somebody else's app -----------------------------------------
  {
    name: "Instagram in-app browser, iPhone",
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 335.0.0.32.97 (iPhone14,5; iOS 17_5_1; en_US; en; scale=3.00; 1170x2532; 606308470)",
    expect: "ios",
  },
  {
    name: "Facebook in-app browser, iPhone",
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBDV/iPhone15,2;FBMD/iPhone;FBSN/iOS;FBSV/17.4;FBSS/3;FBID/phone;FBLC/en_US;FBOP/5]",
    expect: "ios",
  },
  {
    name: "Threads in-app browser, iPhone",
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 BarcelonaIOS 335.0.0.32.97",
    expect: "ios",
  },
  {
    name: "TikTok in-app browser, iPhone",
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 musical_ly_32.5.0 JsSdk/2.0 NetType/WIFI Channel/App Store ByteLocale/en Region/US",
    expect: "ios",
  },
  {
    name: "Pinterest in-app browser, iPhone",
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Pinterest/11.32",
    expect: "ios",
  },
  {
    name: "Gmail / Google app, iPhone",
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/305.0.610387835 Mobile/15E148 Safari/604.1",
    expect: "ios",
  },
  { name: "Safari, iPhone", ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1", expect: "ios" },

  // --- Android in somebody else's app --------------------------------------
  {
    name: "Instagram in-app browser, Android",
    ua: "Mozilla/5.0 (Linux; Android 13; SM-G991B Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.6099.230 Mobile Safari/537.36 Instagram 319.0.0.43.110 Android",
    expect: "android",
  },
  {
    name: "Facebook in-app browser, Android",
    ua: "Mozilla/5.0 (Linux; Android 14; Pixel 8 Build/UQ1A.240205.004; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/121.0.6167.143 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/452.0.0.33.108;]",
    expect: "android",
  },
  {
    name: "TikTok in-app browser, Android",
    ua: "Mozilla/5.0 (Linux; Android 12; V2111 Build/SP1A.210812.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 trill_310503 JsSdk/1.0 NetType/WIFI Channel/googleplay",
    expect: "android",
  },
  {
    name: "Chrome, Android",
    ua: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
    expect: "android",
  },
  {
    name: "Samsung Internet, Android",
    ua: "Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36",
    expect: "android",
  },

  // --- Tablets --------------------------------------------------------------
  { name: "iPad, requesting mobile site", ua: "Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1", expect: "ios" },
  {
    name: "iPad in desktop mode (says Macintosh, five touch points)",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
    touch: 5,
    expect: "ios",
  },
  { name: "Android tablet", ua: "Mozilla/5.0 (Linux; Android 13; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", expect: "android" },

  // --- Must NOT be read as a phone -----------------------------------------
  { name: "Mac, no touch screen", ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36", touch: 0, expect: "other" },
  { name: "Windows desktop", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36", expect: "other" },
  {
    name: "Windows touch laptop (touch alone must not mean iPad)",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    touch: 10,
    expect: "other",
  },
  { name: "Googlebot", ua: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", expect: "other" },
  {
    name: "Googlebot smartphone (an Android crawler, correctly read as Android)",
    ua: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    expect: "android",
  },
  { name: "empty user agent", ua: "", expect: "other" },
];

let failures = 0;
for (const c of CASES) {
  const got = detectStorePlatform(c.ua, c.touch ?? 0);
  const ok = got === c.expect;
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${c.name}${ok ? "" : `  (expected ${c.expect}, got ${got})`}`);
}

console.log("");
if (failures > 0) {
  console.error(`${failures} of ${CASES.length} failed.`);
  process.exit(1);
}
console.log(`All ${CASES.length} user agents placed correctly.`);
