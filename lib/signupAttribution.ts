export type SignupAttribution = {
  source: string;
  sourceDetail: string | null;
  referrerUrl: string | null;
  landingSessionId: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  // Where the visitor originally came from, captured on their very first page
  // view and never overwritten. `source` above is last touch: someone who
  // arrives from Pinterest, reads a blog post, then clicks a promo signs up
  // with src=blog, so `source` is "Blog" and this is "Pinterest". Both matter
  // - one says which channel found them, the other says what converted them.
  firstTouchSource: string | null;
  firstTouchReferrer: string | null;
};

const PENDING_SIGNUP_ATTRIBUTION_KEY = "bb:pending-signup-attribution";
const FIRST_TOUCH_SOURCE_KEY = "bb:first-touch-source";
const FIRST_TOUCH_REFERRER_KEY = "bb:first-touch-referrer";
const LANDING_REFERRER_KEY = "bb:landing-referrer";

function clean(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function safeGet(storage: Storage | undefined, key: string) {
  try {
    return storage?.getItem(key) || null;
  } catch {
    return null;
  }
}

function safeSet(storage: Storage | undefined, key: string, value: string) {
  try {
    storage?.setItem(key, value);
  } catch {
    // Tracking should never block signup.
  }
}

function safeRemove(storage: Storage | undefined, key: string) {
  try {
    storage?.removeItem(key);
  } catch {
    // Tracking should never block app load.
  }
}

function getReferrerHost(referrer: string | null) {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return referrer;
  }
}

export function normalizeSignupSource(sourceValue?: unknown, referrerValue?: unknown, pagePathValue?: unknown) {
  const source = clean(sourceValue) || "";
  const referrer = clean(referrerValue) || "";
  const pagePath = clean(pagePathValue) || "";
  // Explicit src=blog means the visitor clicked a promo or CTA inside our
  // own blog. Check it first so a Google/Facebook referrer that led them
  // to the blog does not swallow the blog attribution.
  if (source.toLowerCase() === "blog" || source.toLowerCase().startsWith("blog:")) return "Blog";
  const combined = `${source} ${referrer} ${pagePath}`.toLowerCase();

  if (combined.includes("facebook") || combined.includes("fbclid") || combined.includes("fb.") || /\bfb\b/.test(combined)) return "Facebook";
  if (combined.includes("instagram") || combined.includes("igshid") || /\big\b/.test(combined)) return "Instagram";
  if (combined.includes("threads")) return "Threads";
  if (combined.includes("pinterest") || combined.includes("pin.it")) return "Pinterest";
  if (combined.includes("youtube") || combined.includes("youtu.be") || combined.includes("youtu")) return "YouTube";
  if (combined.includes("google") || combined.includes("gclid")) return "Google";
  if (combined.includes("utm_source=email") || /\bemail\b/.test(combined)) return "Email";
  return "Other";
}

// Records where this visitor came from on their FIRST page view, whatever page
// that is. Previously only the landing page stored a source, so anyone who
// arrived straight onto a blog post from Pinterest had their origin thrown
// away: by signup time document.referrer is our own blog and the channel is
// unrecoverable. Writes once and never overwrites, so the original channel
// survives every later click through the site.
export function captureFirstTouch() {
  if (typeof window === "undefined") return;

  const referrer = clean(document.referrer);
  // An internal referrer means this is not the visit that brought them here.
  let externalReferrer: string | null = referrer;
  if (referrer) {
    try {
      if (new URL(referrer).hostname === window.location.hostname) externalReferrer = null;
    } catch {
      // Unparseable referrer: keep it, it is still a hint.
    }
  }

  // Keep the referrer of the entry page around for the existing read in
  // getSignupAttributionFromBrowser, which had nothing writing it.
  if (externalReferrer && !safeGet(window.localStorage, LANDING_REFERRER_KEY)) {
    safeSet(window.localStorage, LANDING_REFERRER_KEY, externalReferrer);
  }

  if (safeGet(window.localStorage, FIRST_TOUCH_SOURCE_KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const utmSource = clean(
    params.get("utm_source") || params.get("source") || params.get("src") || params.get("ref"),
  );
  // Deliberately does NOT pass the page path: on a blog page that would match
  // "blog" and record the blog as the origin, which is the bug being fixed.
  const source = normalizeSignupSource(utmSource, externalReferrer, null);

  // Nothing to learn from: no campaign tag and no external referrer. Stay
  // silent so a genuine first touch can still be captured on a later visit.
  if (source === "Other" && !utmSource && !externalReferrer) return;

  safeSet(window.localStorage, FIRST_TOUCH_SOURCE_KEY, source);
  if (externalReferrer) safeSet(window.localStorage, FIRST_TOUCH_REFERRER_KEY, externalReferrer);
}

export function getSignupAttributionFromBrowser(): SignupAttribution {
  if (typeof window === "undefined") {
    return {
      source: "Other",
      sourceDetail: null,
      referrerUrl: null,
      landingSessionId: null,
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      firstTouchSource: null,
      firstTouchReferrer: null,
    };
  }

  const params = new URLSearchParams(window.location.search);
  const utmSource = clean(params.get("utm_source") || params.get("source") || params.get("src") || params.get("ref"));
  const utmMedium = clean(params.get("utm_medium"));
  const utmCampaign = clean(params.get("utm_campaign"));
  const landingSource = clean(
    safeGet(window.sessionStorage, "bb:landing-source") ||
      safeGet(window.localStorage, "bb:landing-source"),
  );
  const storedReferrer = clean(
    safeGet(window.localStorage, "bb:landing-referrer") ||
      safeGet(window.sessionStorage, "bb:landing-referrer"),
  );
  const referrerUrl = storedReferrer || clean(document.referrer);
  const pagePath = `${window.location.pathname}${window.location.search}`;
  const source = normalizeSignupSource(utmSource || landingSource, referrerUrl, pagePath);
  // Blog promo clicks arrive as /signup?src=blog&promo=<banner>&post=<slug>.
  // Fold promo + post into the stored detail so the blog analytics page can
  // report signups per post and per banner.
  const blogPromo = clean(params.get("promo"));
  const blogPost = clean(params.get("post"));
  const sourceDetail =
    source === "Blog" && (blogPromo || blogPost)
      ? `blog:${blogPost || "unknown"}:${blogPromo || "unknown"}`
      : utmSource
        ? `utm:${utmSource}`
        : landingSource
          ? `landing:${landingSource}`
          : getReferrerHost(referrerUrl);

  return {
    source,
    sourceDetail,
    referrerUrl,
    landingSessionId: clean(
      safeGet(window.localStorage, "bb:landing-session-id") ||
        safeGet(window.sessionStorage, "bb:landing-session-id"),
    ),
    utmSource,
    utmMedium,
    utmCampaign,
    firstTouchSource: clean(safeGet(window.localStorage, FIRST_TOUCH_SOURCE_KEY)),
    firstTouchReferrer: clean(safeGet(window.localStorage, FIRST_TOUCH_REFERRER_KEY)),
  };
}

export function writePendingSignupAttribution() {
  if (typeof window === "undefined") return;
  safeSet(window.localStorage, PENDING_SIGNUP_ATTRIBUTION_KEY, JSON.stringify(getSignupAttributionFromBrowser()));
}

export function readPendingSignupAttribution(): SignupAttribution | null {
  if (typeof window === "undefined") return null;
  const raw = safeGet(window.localStorage, PENDING_SIGNUP_ATTRIBUTION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<SignupAttribution>;
    const source = normalizeSignupSource(parsed.source, parsed.referrerUrl, parsed.sourceDetail);
    return {
      source,
      sourceDetail: clean(parsed.sourceDetail),
      referrerUrl: clean(parsed.referrerUrl),
      landingSessionId: clean(parsed.landingSessionId),
      utmSource: clean(parsed.utmSource),
      utmMedium: clean(parsed.utmMedium),
      utmCampaign: clean(parsed.utmCampaign),
      firstTouchSource:
        clean(parsed.firstTouchSource) || clean(safeGet(window.localStorage, FIRST_TOUCH_SOURCE_KEY)),
      firstTouchReferrer:
        clean(parsed.firstTouchReferrer) || clean(safeGet(window.localStorage, FIRST_TOUCH_REFERRER_KEY)),
    };
  } catch {
    return null;
  }
}

export function clearPendingSignupAttribution() {
  if (typeof window === "undefined") return;
  safeRemove(window.localStorage, PENDING_SIGNUP_ATTRIBUTION_KEY);
}
