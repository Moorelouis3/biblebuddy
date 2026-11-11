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
import { WELCOME_SEQUENCE, APP_STORE_URL, ANDROID_URL } from "../lib/email/welcomeSequence";
import { BETA_OPEN, PLAY_LISTING_URL } from "../lib/androidBeta";
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

check("the Android link is the explainer, never Play itself, while the beta runs", () => {
  /**
   * Bible Buddy is in a Google closed test, so the Play listing is invisible
   * to anyone who has not first joined the tester group. Someone sent straight
   * there is told they are not a tester, which reads like a broken app.
   * /android is the page that explains the two steps, and it is what every
   * Play button on the site points at.
   */
  assert.equal(ANDROID_URL, "https://www.mybiblebuddy.net/android");
  for (const step of WELCOME_SEQUENCE) {
    assert.ok(
      !/play\.google\.com/.test(step.body),
      `step ${step.step} links straight to Play, which is invisible during the closed test`,
    );
  }
  /**
   * THE TRAP THIS EXISTS FOR. /android is built to be retired the day the beta
   * ends (app/android/page.tsx is noindex and says so) and it does not
   * redirect. A page can be retired; an email cannot - a welcome sent months
   * later still carries whatever link is baked into it. So the moment
   * BETA_OPEN goes false, this fails until the bodies point at the real
   * listing and the five rows are reinstalled.
   */
  if (!BETA_OPEN) {
    for (const step of WELCOME_SEQUENCE) {
      assert.ok(
        step.body.includes(PLAY_LISTING_URL),
        `the Android beta is over and /android is retired, but step ${step.step} still links to it. ` +
          `Point ANDROID_URL at ${PLAY_LISTING_URL} and re-run scripts/install-welcome-sequence.ts.`,
      );
    }
  }
});

check("every step offers both doors, so every step can be counted", () => {
  /**
   * Until 2026-11-11 steps 2-5 carried exactly one CTA, the App Store. Apple
   * reports nothing back to a sender, so there was no link of ours in those
   * bodies to tag: four of the five emails were unmeasurable however good the
   * instrumentation was. It also left an Android reader of those four with
   * nowhere to go at all, which was the larger half of it.
   *
   * Louis approved putting step 1's existing website line on the other four,
   * so now all five offer the App Store AND mybiblebuddy.net. This asserts
   * both doors on every step: losing the web line would quietly take an
   * email's clicks off the dashboard and shut Android readers out again, and
   * neither failure shows up as an error anywhere.
   */
  for (const step of WELCOME_SEQUENCE) {
    const html = tagHtmlLinks(renderWelcomeHtml(step), step.campaignId);
    const urls = [...html.matchAll(/<a href="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((u) => u !== "{{UNSUBSCRIBE}}");
    assert.ok(
      urls.some((u) => u.startsWith(APP_STORE_URL)),
      `step ${step.step} has no App Store link`,
    );
    assert.ok(
      urls.some((u) => u.startsWith(ANDROID_URL)),
      `step ${step.step} has no Android link - Android readers have no door and its clicks cannot be counted`,
    );
    assert.ok(
      html.includes(`utm_campaign=${step.campaignId}`),
      `step ${step.step} has no measurable link`,
    );
    // The text body matters as much: plenty of clients render it instead.
    const text = tagTextLinks(renderWelcomeText(step), step.campaignId);
    assert.ok(
      /mybiblebuddy\.net[^\s]*utm_source=email/.test(text),
      `step ${step.step} text body has no countable website link`,
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
