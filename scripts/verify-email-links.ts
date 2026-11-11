/**
 * Offline checks for email link tagging and the welcome funnel's own links.
 *
 *   npm run verify:email-links
 *
 * Same idiom as the other verify-* scripts: no network, no database, assert
 * against the real modules and the real source text.
 *
 * These exist because email click measurement went dark for two days without
 * anything failing: SES click tracking was off by design, and the arrivals
 * recorder needs utm_source=email, which nothing was adding. No error, no
 * alert, just a column of zeroes that looked like apathy.
 */
import { readFileSync } from "fs";
import { strict as assert } from "assert";
import { tagEmailUrl, tagHtmlLinks, tagTextLinks } from "../lib/email/linkTagging";
import { WELCOME_SEQUENCE, APP_STORE_URL } from "../lib/email/welcomeSequence";
import { renderWelcomeHtml, renderWelcomeText } from "../lib/email/welcomeRender";

const read = (p: string) => readFileSync(p, "utf8");
let checks = 0;
function check(label: string, fn: () => void) {
  fn();
  checks += 1;
  console.log(`  ok  ${label}`);
}

console.log("\nWhat gets tagged");

check("our own links get utm_source=email and the campaign", () => {
  const out = tagEmailUrl("https://www.mybiblebuddy.net/blog/x", "welcome-1");
  assert.ok(out.includes("utm_source=email"), out);
  assert.ok(out.includes("utm_campaign=welcome-1"), out);
  assert.ok(out.startsWith("https://www.mybiblebuddy.net/blog/x?"), out);
});

check("an existing query string survives", () => {
  const out = tagEmailUrl("https://www.mybiblebuddy.net/study?day=3", "welcome-3");
  assert.ok(out.includes("day=3"), out);
  assert.ok(out.includes("utm_campaign=welcome-3"), out);
});

check("a fragment stays at the end, where a browser can still find it", () => {
  const out = tagEmailUrl("https://www.mybiblebuddy.net/p#section", "c");
  assert.ok(out.endsWith("#section"), out);
  assert.ok(out.includes("utm_source=email"), out);
});

check("subdomains count as ours", () => {
  assert.ok(tagEmailUrl("https://mybiblebuddy.net/x", "c").includes("utm_source"));
  assert.ok(tagEmailUrl("https://app.mybiblebuddy.net/x", "c").includes("utm_source"));
});

console.log("\nWhat is left alone");

check("the App Store link is never touched", () => {
  assert.equal(tagEmailUrl(APP_STORE_URL, "welcome-1"), APP_STORE_URL);
});

check("no other host is touched, including lookalikes", () => {
  for (const url of [
    "https://apps.apple.com/app/id6822155944",
    "https://example.com/mybiblebuddy.net",
    "https://mybiblebuddy.net.evil.com/x",
    "https://notmybiblebuddy.net/x",
  ]) {
    assert.equal(tagEmailUrl(url, "c"), url, url);
  }
});

check("unsubscribe and api links are not readership", () => {
  for (const url of [
    "https://www.mybiblebuddy.net/unsubscribe?token=abc",
    "https://www.mybiblebuddy.net/api/email/open",
  ]) {
    assert.equal(tagEmailUrl(url, "c"), url, url);
  }
});

check("a hand-tagged link wins and is not tagged twice", () => {
  const already = "https://www.mybiblebuddy.net/x?utm_source=email&utm_campaign=mine";
  assert.equal(tagEmailUrl(already, "other"), already);
});

check("no campaign id means no tagging at all", () => {
  const url = "https://www.mybiblebuddy.net/x";
  assert.equal(tagEmailUrl(url, ""), url);
});

check("rubbish in, same rubbish out", () => {
  for (const url of ["", "not a url", "mailto:a@b.c", "{{UNSUBSCRIBE}}", "javascript:alert(1)"]) {
    assert.equal(tagEmailUrl(url, "c"), url, url);
  }
});

console.log("\nWhole bodies");

check("every href in an HTML body is handled, and only the right ones", () => {
  const html =
    '<a href="https://www.mybiblebuddy.net/a">a</a>' +
    '<a href="https://apps.apple.com/app/id6822155944">b</a>' +
    '<a href="{{UNSUBSCRIBE}}">c</a>';
  const out = tagHtmlLinks(html, "welcome-2");
  assert.equal((out.match(/utm_source=email/g) || []).length, 1, out);
  assert.ok(out.includes('href="{{UNSUBSCRIBE}}"'), "the placeholder was mangled");
  assert.ok(out.includes('href="https://apps.apple.com/app/id6822155944"'), "the App Store link was rewritten");
});

check("& is HTML-encoded in an attribute, so both parameters reach the browser", () => {
  const out = tagHtmlLinks('<a href="https://www.mybiblebuddy.net/a?x=1">a</a>', "c");
  assert.ok(out.includes("&amp;utm_campaign=c"), out);
  // A bare & in an attribute is what silently drops the second parameter.
  assert.ok(!/&(?!amp;)/.test(out), `an unencoded ampersand survived: ${out}`);
});

check("an already-encoded query is not double-encoded", () => {
  const out = tagHtmlLinks('<a href="https://www.mybiblebuddy.net/a?x=1&amp;y=2">a</a>', "c");
  assert.ok(!out.includes("amp;amp;"), out);
  assert.ok(out.includes("x=1&amp;y=2"), out);
});

check("bare URLs in a text body are tagged, punctuation left outside", () => {
  const out = tagTextLinks("Read https://www.mybiblebuddy.net/blog/x. Then stop.", "c");
  assert.ok(out.includes("utm_campaign=c."), `the full stop moved inside the link: ${out}`);
  assert.ok(out.endsWith("Then stop."), out);
});

console.log("\nThe sender does it, so no author has to");

const sender = read("lib/email/sesSender.ts");

check("sendEmail tags both bodies", () => {
  assert.ok(/tagHtmlLinks\(options\.html/.test(sender), "html is not tagged");
  assert.ok(/tagTextLinks\(options\.text/.test(sender), "text is not tagged");
});

check("the unsubscribe link can never be counted as an arrival", () => {
  // Tagging runs on the body while {{UNSUBSCRIBE}} is still a placeholder,
  // and the substitution wraps it. Both halves have to stay that way round.
  assert.ok(
    /withUnsub\(tagHtmlLinks\(/.test(sender) && /withUnsub\(tagTextLinks\(/.test(sender),
    "the unsubscribe URL is substituted before tagging, so it would be tagged",
  );
});

check("the real campaign id is used, not the truncated SES tag", () => {
  assert.ok(/campaignId\?: string;/.test(sender), "sendEmail takes no campaignId");
  assert.ok(
    /options\.campaignId \|\| options\.tags\?\.campaign/.test(sender),
    "the untruncated id is not preferred",
  );
  const bulk = read("lib/email/sendCampaign.ts");
  assert.ok(/^\s+campaignId,$/m.test(bulk), "sendCampaign does not pass the real id");
  const cron = read("app/api/cron/welcome-email/route.ts");
  assert.ok(/campaignId: step\.campaignId/.test(cron), "the welcome cron does not pass the real id");
});

check("what the recorder requires is exactly what the sender writes", () => {
  const recorder = read("components/EmailArrivalRecorder.tsx");
  assert.ok(/utm_source/.test(recorder), "the recorder no longer keys on utm_source");
  assert.ok(/"email"/.test(recorder), "the recorder no longer expects the value 'email'");
  assert.ok(/utm_campaign/.test(recorder), "the recorder no longer reads utm_campaign");
  // If either parameter name ever changes, these two must change together.
  const out = tagEmailUrl("https://www.mybiblebuddy.net/x", "c");
  assert.ok(out.includes("utm_source=email") && out.includes("utm_campaign=c"), out);
});

console.log("\nThe funnel's own numbers");

check("the funnel counts subscribers rather than fetching them", () => {
  /**
   * The first version of this tallied rows in JavaScript from a plain select.
   * PostgREST caps every response at 1,000 rows, so with 5,584 subscribers it
   * reported the broadcast audience as 990 - plausible, and wrong. Nothing
   * failed; the dashboard simply lied by a factor of five and a half.
   */
  const dash = read("lib/adminDashboard.ts");
  const funnelAt = dash.indexOf("const WELCOME_STEP_IDS");
  assert.ok(funnelAt > 0, "the welcome funnel block is gone");
  const block = dash.slice(funnelAt, dash.indexOf("const welcomeFunnel = {", funnelAt));
  for (const m of block.matchAll(/\.from\("email_subscribers"\)\s*\n?\s*\.select\(([^)]*)\)/g)) {
    assert.ok(
      /count: "exact", head: true/.test(m[1]),
      `a subscriber read in the funnel block is not a count, so it caps at 1000 rows: ${m[1]}`,
    );
  }
  assert.ok(/count: "exact", head: true/.test(block), "the funnel does not count at all");
});

check("the welcome steps are not also listed as campaigns below the funnel", () => {
  // Two numbers for one email on one screen is the failure CLAUDE.md's
  // "Search before you build" is about: the funnel counts people at a step,
  // the list counts a send on a date, and they disagree by design.
  const dash = read("lib/adminDashboard.ts");
  assert.ok(
    /WELCOME_STEP_IDS\.includes\(row\.campaignId\)/.test(dash),
    "welcome steps are still duplicated into the campaign list",
  );
});

console.log("\nThe five welcome emails, as they will actually go out");

check("every welcome link is one we approved", () => {
  for (const step of WELCOME_SEQUENCE) {
    for (const m of renderWelcomeHtml(step).matchAll(/<a href="([^"]+)"/g)) {
      const url = m[1];
      if (url === "{{UNSUBSCRIBE}}") continue;
      assert.ok(
        url === APP_STORE_URL || url.startsWith("https://www.mybiblebuddy.net"),
        `step ${step.step} links somewhere unexpected: ${url}`,
      );
    }
  }
});

check("every welcome email has a CTA, and we know which ones can be counted", () => {
  /**
   * NOT asserting that all five are measurable, because four of them are not,
   * and that is a content fact rather than a bug in the tagging.
   *
   * Steps 2-5 carry exactly one CTA, the App Store, and Apple reports nothing
   * back to a sender. Tagging cannot help them: there is no link of ours in
   * the body to tag. Only step 1 also offers mybiblebuddy.net.
   *
   * That also leaves an Android reader of steps 2-5 with nowhere to go, which
   * is the larger half of the problem. Adding the website line from step 1 -
   * copy Louis has already approved - would fix both at once, but it edits
   * approved bodies, so it is his call. Until then this check records the
   * state out loud instead of passing quietly.
   */
  const blind: number[] = [];
  for (const step of WELCOME_SEQUENCE) {
    const html = tagHtmlLinks(renderWelcomeHtml(step), step.campaignId);
    const ctas = (html.match(/<a href="/g) || []).length;
    assert.ok(ctas >= 2, `step ${step.step} has no CTA at all (only the unsubscribe link)`);
    if (!html.includes(`utm_campaign=${step.campaignId}`)) blind.push(step.step);
  }
  assert.ok(
    !blind.includes(1),
    "step 1 has lost its mybiblebuddy.net link, so no welcome email is measurable at all",
  );
  if (blind.length) {
    console.log(
      `      note: steps ${blind.join(", ")} are App-Store-only, so clicks on them` +
        " cannot be counted by anyone, and Android readers have no door.",
    );
  }
});

check("tagging never breaks a welcome body: same links, same images, same tokens", () => {
  for (const step of WELCOME_SEQUENCE) {
    const before = renderWelcomeHtml(step);
    const after = tagHtmlLinks(before, step.campaignId);
    const count = (s: string) => (s.match(/<a href="/g) || []).length;
    assert.equal(count(after), count(before), `step ${step.step} lost or gained a link`);
    assert.ok(after.includes("{{UNSUBSCRIBE}}"), `step ${step.step} lost its unsubscribe token`);
    assert.ok(after.includes("{{first_name}}"), `step ${step.step} lost the name token`);
    assert.ok(after.includes(APP_STORE_URL), `step ${step.step} lost the App Store link`);
    // Images are not links, and Supabase storage is not us.
    const imgs = (s: string) => (s.match(/<img[^>]*>/g) || []).join("");
    assert.equal(imgs(after), imgs(before), `step ${step.step} had an image URL rewritten`);
    const text = tagTextLinks(renderWelcomeText(step), step.campaignId);
    assert.ok(text.includes("{{UNSUBSCRIBE}}"), `step ${step.step} text lost its unsubscribe token`);
  }
});

console.log(`\n${checks} checks passed.\n`);
