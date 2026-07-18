export type SignupAttribution = {
  source: string;
  sourceDetail: string | null;
  referrerUrl: string | null;
  landingSessionId: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

const PENDING_SIGNUP_ATTRIBUTION_KEY = "bb:pending-signup-attribution";

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
  const combined = `${source} ${referrer} ${pagePath}`.toLowerCase();

  if (combined.includes("facebook") || combined.includes("fbclid") || combined.includes("fb.") || /\bfb\b/.test(combined)) return "Facebook";
  if (combined.includes("instagram") || combined.includes("igshid") || /\big\b/.test(combined)) return "Instagram";
  if (combined.includes("threads")) return "Threads";
  if (combined.includes("youtube") || combined.includes("youtu.be") || combined.includes("youtu")) return "YouTube";
  if (combined.includes("google") || combined.includes("gclid")) return "Google";
  return "Other";
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
  const sourceDetail = utmSource
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
    };
  } catch {
    return null;
  }
}

export function clearPendingSignupAttribution() {
  if (typeof window === "undefined") return;
  safeRemove(window.localStorage, PENDING_SIGNUP_ATTRIBUTION_KEY);
}
