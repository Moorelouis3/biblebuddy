/**
 * Where a visit or a signup came from. The one set of rules, shared by the
 * analytics dashboard (lib/adminDashboard.ts) and the drilldown
 * (app/api/admin/analytics-drilldown).
 *
 * Louis, 2026-11-22: "Direct / unknown is not acceptable! and Google should
 * be Search and then under Search should break down to the separate search
 * engines". What "Direct / unknown" actually held (last 30 days of signups,
 * 254 of 426):
 * - 209 began on /app, the phone app's signed-out front door. They are App
 *   Store installs (Android is a closed test).
 * - 21 have no trail at all. Every one signed in with Apple or Google, which
 *   wrote the profile before any attribution. Those with an iPhone push token
 *   are counted as the App Store; the rest as "Apple or Google sign-in".
 * - The rest landed on the homepage or signup page with no referrer (typed
 *   in or a bookmark), or on a blog post or study page with no referrer (a
 *   link opened from another app, which strips it).
 * Two real misreadings were counted as Google before: coming back from the
 * Google sign-in page (accounts.google.com), and the Gmail app
 * (com.google.android.gm), which is Email.
 */

export type SourceName =
  | "Threads"
  | "Facebook"
  | "Instagram"
  | "Search"
  | "AI chat"
  | "Pinterest"
  | "Email"
  | "YouTube"
  | "Other websites"
  | "App Store"
  | "Apple or Google sign-in"
  | "Link from another app"
  | "Typed in or bookmark"
  | "Returning members";

export const SOURCE_ORDER: SourceName[] = [
  "Threads",
  "Facebook",
  "Instagram",
  "Search",
  "AI chat",
  "Pinterest",
  "Email",
  "YouTube",
  "Other websites",
  "App Store",
  "Apple or Google sign-in",
  "Link from another app",
  "Typed in or bookmark",
  "Returning members",
];

/** Our own pages and sign-in round trips: never a source. */
const INTERNAL = /mybiblebuddy|localhost|127\.0\.0\.1|accounts\.google\.|appleid\.apple\.com|supabase\.co|vercel\.app/;

const ENGINES: Array<[RegExp, string]> = [
  [/googlequicksearchbox|(^|[/.])google\.[a-z.]+(\/|$)|gclid/, "Google"],
  [/bing\.com|msn\.com/, "Bing"],
  [/duckduckgo/, "DuckDuckGo"],
  [/search\.yahoo|yahoo\.com\/search|(^|\.)yahoo\./, "Yahoo"],
  [/search\.brave|brave\.com/, "Brave"],
  [/ecosia/, "Ecosia"],
  [/yandex/, "Yandex"],
  [/baidu/, "Baidu"],
  [/qwant/, "Qwant"],
  [/startpage/, "Startpage"],
  [/search\.aol|aol\.com/, "AOL"],
];

const AI_CHATS: Array<[RegExp, string]> = [
  [/chatgpt|openai/, "ChatGPT"],
  [/perplexity/, "Perplexity"],
  [/gemini\.google/, "Gemini"],
  [/copilot\.microsoft|bing\.com\/chat/, "Copilot"],
  [/claude\.ai/, "Claude"],
];

export type SourceHit = { source: SourceName; detail?: string };

/** The search engine in a referrer or tag, if it is one. */
export function searchEngineOf(text: string): string | null {
  const x = text.toLowerCase();
  for (const [re, name] of ENGINES) if (re.test(x)) return name;
  if (/(^|[^a-z])(search|organic)([^a-z]|$)/.test(x)) return "Other search engine";
  return null;
}

/**
 * An outside channel named in a referrer, tag or note, or null when the text
 * names none. Our own pages and sign-in pages are never a channel.
 */
export function channelOf(text: string | null | undefined): SourceHit | null {
  const raw = (text || "").toLowerCase().trim();
  if (!raw) return null;
  // Drop the parts that are only us: "https://www.mybiblebuddy.net/... page:/app".
  const x = raw
    .split(/\s+/)
    .filter((part) => !INTERNAL.test(part))
    .join(" ");
  if (!x) return null;
  if (x.includes("threads")) return { source: "Threads" };
  if (/instagram|igshid|\big\b|closer-ig|manychat/.test(x)) return { source: "Instagram" };
  if (/facebook|fbclid|\bfb\b|fb\./.test(x)) return { source: "Facebook" };
  if (/pinterest|pin\.it/.test(x)) return { source: "Pinterest" };
  if (/youtube|youtu\.be/.test(x)) return { source: "YouTube" };
  if (/utm_source=email|[?&]sc=|mail\.google|com\.google\.android\.gm\b|outlook\.|mail\.yahoo|\bemail\b|newsletter|systeme/.test(x)) return { source: "Email" };
  for (const [re, name] of AI_CHATS) if (re.test(x)) return { source: "AI chat", detail: name };
  const engine = searchEngineOf(x);
  if (engine) return { source: "Search", detail: engine };
  const host = x.match(/https?:\/\/([^/\s?#]+)/)?.[1] || x.match(/android-app:\/\/([^/\s]+)/)?.[1];
  if (host) return { source: "Other websites", detail: host.replace(/^www\./, "") };
  return null;
}

function pathOnly(path: string | null | undefined) {
  return (path || "").toLowerCase().split("?")[0].split("#")[0] || "/";
}

/** Where a visit with no outside referrer started, judged by its first page. */
function noReferrerSource(path: string | null | undefined): SourceHit {
  const p = pathOnly(path);
  if (p === "/app" || p.startsWith("/app/")) return { source: "App Store" };
  if (/^\/(blog|bible-study-hub|bible-study-tips)(\/|$)/.test(p)) return { source: "Link from another app" };
  if (p === "/" || /^\/(signup|login|landing|welcome|start)(\/|$)/.test(p)) return { source: "Typed in or bookmark" };
  // Any other first page is a signed-in screen: someone already a member
  // opening the app or a saved tab.
  return { source: "Returning members" };
}

/** A visit, from its first event. Campaign tags beat the referrer. */
export function sessionSource(e: { referrer?: string | null; page_path?: string | null; source?: string | null }): SourceHit {
  const path = (e.page_path || "").toLowerCase();
  const tagged = path.match(/utm_source=([^&]+)/)?.[1] || path.match(/[?&]src=([^&]+)/)?.[1] || "";
  return channelOf(decodeURIComponent(tagged)) || channelOf(e.referrer) || channelOf(e.source) || noReferrerSource(e.page_path);
}

export type SignupProfile = {
  signup_source: string | null;
  signup_utm_source: string | null;
  signup_first_touch_source: string | null;
  signup_referrer_url: string | null;
  signup_source_detail: string | null;
};

/**
 * A signup. `iosApp` says the account has an iPhone push token, which is how
 * a signup with no trail at all is placed.
 */
export function userSource(p: SignupProfile, iosApp = false): SourceHit {
  // "Other", "Blog", "Direct" are where they converted, not where they came
  // from; channelOf ignores them because they name no channel.
  const hit =
    channelOf(`${p.signup_utm_source || ""} ${p.signup_source || ""}`) ||
    channelOf(p.signup_first_touch_source) ||
    channelOf(p.signup_referrer_url) ||
    channelOf((p.signup_source_detail || "").replace(/(^| )(page|landing):\S*/g, " "));
  if (hit) return hit;
  const detail = p.signup_source_detail || "";
  const page = detail.match(/(?:^| )page:(\/\S*)/)?.[1];
  const blogSlug = detail.match(/^blog:([^:]+)/)?.[1];
  if (page) {
    // A new account cannot be a returning member: a first page deep inside
    // the site is a link someone opened from another app (which drops the
    // referrer), such as a study or a post shared in a message.
    const hit = noReferrerSource(page);
    return hit.source === "Returning members" ? { source: "Link from another app" } : hit;
  }
  if (blogSlug || /^blog$/i.test(p.signup_source || "")) return { source: "Link from another app" };
  if (/landing:direct/i.test(detail)) return { source: "Typed in or bookmark" };
  if (!p.signup_source && !detail) return iosApp ? { source: "App Store" } : { source: "Apple or Google sign-in" };
  return { source: "Typed in or bookmark" };
}
