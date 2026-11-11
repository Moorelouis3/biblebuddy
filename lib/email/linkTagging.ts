/**
 * Stamping utm_source=email on our own links, at send time.
 *
 * WHY THIS EXISTS. Two true things that together made email unmeasurable:
 *
 *   1. SES click tracking has been OFF since 2026-11-09. It rewrites every
 *      link through awstrack.me, and a link on that domain is not
 *      mybiblebuddy.net, so iOS stopped treating it as a universal link and
 *      the app stopped opening. Turning it off was right.
 *   2. email_arrivals replaced it - but the recorder only counts a visit
 *      carrying utm_source=email, and nothing was adding that.
 *
 * So from 9 to 11 November, Bible Buddy sent 5,055 newsletters and five
 * welcome emails and could not count a single click on any of them. The
 * arrivals table held two rows, both with no campaign. Since every recorded
 * SES "open" is a scanner fetch, clicks were the ONLY trustworthy signal, and
 * it was dark.
 *
 * This closes it the cheap way. The destination host does not change, so deep
 * links keep opening the app; only our own query string grows. Nothing here
 * edits approved copy - it happens on the way out, so an author writes a
 * plain link and it still gets counted.
 *
 * WHAT IS DELIBERATELY NOT TAGGED
 *   - any host that is not mybiblebuddy.net. The App Store link stays exactly
 *     as approved, and Apple would report nothing anyway.
 *   - /api/... and the unsubscribe link. Leaving is not readership, and an
 *     unsubscribe counted as an arrival would flatter every send.
 *   - a link that already carries utm_source, so a hand-tagged link wins.
 *   - {{...}} placeholders, which are not URLs yet when this runs.
 */

/** mybiblebuddy.net and any subdomain of it. Nothing else. */
const OUR_HOST = /^(?:[a-z0-9-]+\.)*mybiblebuddy\.net$/i;

/** Actions, not reading. */
const NOT_READERSHIP = /^\/(?:api\/|unsubscribe)/i;

/**
 * One URL. Returns it unchanged unless it is one of ours and untagged, which
 * is what makes this safe to run over a whole email body.
 */
export function tagEmailUrl(rawUrl: string, campaignId: string): string {
  if (!campaignId) return rawUrl;
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return rawUrl;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return rawUrl;
  if (!OUR_HOST.test(url.hostname)) return rawUrl;
  if (NOT_READERSHIP.test(url.pathname)) return rawUrl;
  if (url.searchParams.has("utm_source")) return rawUrl;

  url.searchParams.set("utm_source", "email");
  url.searchParams.set("utm_campaign", campaignId);
  return url.toString();
}

/**
 * Every href in an HTML body.
 *
 * &amp; is decoded before parsing and re-encoded after, because an attribute
 * value is HTML and `?a=1&amp;b=2` is one URL with two parameters, not a
 * parameter literally called `amp;b`.
 */
export function tagHtmlLinks(html: string, campaignId: string): string {
  if (!campaignId || !html) return html;
  return html.replace(/(<a\b[^>]*?\shref=")([^"]*)(")/gi, (full, pre: string, href: string, post: string) => {
    // A token like {{UNSUBSCRIBE}} is substituted after this runs.
    if (href.includes("{{")) return full;
    const decoded = href.replace(/&amp;/gi, "&");
    const tagged = tagEmailUrl(decoded, campaignId);
    if (tagged === decoded) return full;
    return pre + tagged.replace(/&/g, "&amp;") + post;
  });
}

/**
 * Bare URLs in a plain-text body. Trailing punctuation is given back, so
 * "read it at https://www.mybiblebuddy.net/blog/x." keeps its full stop
 * outside the link instead of inside it.
 */
export function tagTextLinks(text: string, campaignId: string): string {
  if (!campaignId || !text) return text;
  return text.replace(/https?:\/\/[^\s<>"'\]]+/gi, (match: string) => {
    const trailing = match.match(/[.,;:!?)}>]+$/);
    const core = trailing ? match.slice(0, -trailing[0].length) : match;
    const tagged = tagEmailUrl(core, campaignId);
    return tagged === core ? match : tagged + (trailing ? trailing[0] : "");
  });
}
