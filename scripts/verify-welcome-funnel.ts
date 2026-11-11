/**
 * Offline checks for the five-day welcome funnel and the two buckets.
 *
 *   npm run verify:welcome
 *
 * Same idiom as the other verify-* scripts: no network, no database, assert
 * against the real modules and the real source text. Every check here is a
 * rule from Louis's routing spec that would be expensive to rediscover by
 * finding it broken in somebody's inbox.
 */
import { readFileSync } from "fs";
import { strict as assert } from "assert";
import {
  WELCOME_SEQUENCE,
  WELCOME_CAMPAIGN_IDS,
  FINAL_WELCOME_STEP,
  RETIRED_WELCOME_CAMPAIGN_ID,
  IMAGE_PENDING,
  isReadyToSend,
  APP_STORE_URL,
} from "../lib/email/welcomeSequence";
import { renderWelcomeHtml, renderWelcomeText } from "../lib/email/welcomeRender";

const read = (p: string) => readFileSync(p, "utf8");
let checks = 0;
function check(label: string, fn: () => void) {
  fn();
  checks += 1;
  console.log(`  ok  ${label}`);
}

console.log("\nThe five emails");

check("five steps, numbered 1-5, in order", () => {
  assert.equal(WELCOME_SEQUENCE.length, 5);
  assert.equal(FINAL_WELCOME_STEP, 5);
  WELCOME_SEQUENCE.forEach((s, i) => assert.equal(s.step, i + 1));
});

check("each step has its own campaign id, all distinct", () => {
  assert.equal(new Set(WELCOME_CAMPAIGN_IDS).size, 5);
  WELCOME_SEQUENCE.forEach((s) => assert.equal(s.campaignId, `welcome-${s.step}`));
});

check("no step reuses the retired single welcome id", () => {
  assert.ok(!WELCOME_CAMPAIGN_IDS.includes(RETIRED_WELCOME_CAMPAIGN_ID));
});

check("the approved subjects, exactly", () => {
  assert.deepEqual(
    WELCOME_SEQUENCE.map((s) => s.subject),
    [
      "Welcome to Bible Buddy! 📖",
      "What do you do when you don't understand God's Word? 📖",
      "Sometimes a Plan Makes It Easier 📖",
      "Are You Understanding What You're Reading? 📖",
      "What If Social Media Brought You Closer to God? 🙏🏾",
    ],
  );
});

check("every body opens with Hey {{first_name}}, and signs off as Louis", () => {
  for (const s of WELCOME_SEQUENCE) {
    assert.ok(s.body.startsWith("Hey {{first_name}},"), `step ${s.step} does not open correctly`);
    assert.ok(s.body.trimEnd().endsWith("Creator of Bible Buddy 🙏🏾"), `step ${s.step} sign-off is wrong`);
  }
});

check("Louis's own lines survive verbatim", () => {
  const day2 = WELCOME_SEQUENCE[1].body;
  assert.ok(day2.includes("When I first started studying the Bible, I had EVERYTHING."));
  assert.ok(day2.includes("Thanksgiving dinner"), "the Thanksgiving analogy is gone");
  const day4 = WELCOME_SEQUENCE[3].body;
  assert.ok(day4.includes("BUT YOU CAN'T SHARE THE GOOD WORD IF YOU DON'T UNDERSTAND GOD'S WORD!"));
  assert.ok(day4.includes("algebra"), "the algebra analogy is gone");
});

check("no invented Google Play URL anywhere", () => {
  for (const s of WELCOME_SEQUENCE) {
    assert.ok(!/play\.google\.com/.test(s.body), `step ${s.step} has a Play Store URL`);
    assert.ok(!/link to be added/i.test(s.body), `step ${s.step} still has an unresolved placeholder`);
  }
  assert.ok(WELCOME_SEQUENCE[0].body.includes("mybiblebuddy.net"), "Day 1 has no Android fallback");
});

check("every step is ready: no step can carry an unhosted image", () => {
  for (const s of WELCOME_SEQUENCE) {
    assert.ok(!s.body.includes(IMAGE_PENDING), `step ${s.step} still has a pending image marker`);
    assert.ok(isReadyToSend(s), `step ${s.step} is not ready to send`);
  }
});

check("the two images are hosted where email can fetch them, not on Drive", () => {
  const all = WELCOME_SEQUENCE.map((s) => s.body).join("\n");
  assert.ok(!/drive\.google\.com/.test(all), "a Google Drive link is in an email body");
  const imgs = [...all.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1]);
  assert.equal(imgs.length, 2, `expected 2 images, found ${imgs.length}`);
  for (const url of imgs) {
    assert.ok(url.startsWith("https://"), `image is not https: ${url}`);
    assert.ok(/supabase\.co\/storage\/v1\/object\/public\//.test(url), `image is not publicly hosted: ${url}`);
    assert.ok(!/\.webp($|\?)/.test(url), `image is webp, which Outlook cannot render: ${url}`);
  }
});

console.log("\nRendering");

check("every step renders a full document with both tokens", () => {
  for (const s of WELCOME_SEQUENCE) {
    const html = renderWelcomeHtml(s);
    assert.ok(/^<!doctype html>/i.test(html), `step ${s.step} is not a full document`);
    assert.ok(html.includes("{{UNSUBSCRIBE}}"), `step ${s.step} has no unsubscribe token`);
    assert.ok(html.includes("{{first_name}}"), `step ${s.step} lost the name token`);
    const text = renderWelcomeText(s);
    assert.ok(text.includes("{{UNSUBSCRIBE}}"), `step ${s.step} text has no unsubscribe token`);
    assert.ok(text.length > 400, `step ${s.step} text is suspiciously short`);
  }
});

check("images render with the attributes email clients need", () => {
  for (const s of WELCOME_SEQUENCE) {
    const html = renderWelcomeHtml(s);
    for (const tag of html.match(/<img[^>]*>/g) || []) {
      assert.ok(/alt="[^"]+"/.test(tag), "an image has no alt text");
      assert.ok(/width="600"/.test(tag), "an image has no width attribute");
      assert.ok(/max-width:600px/.test(tag), "an image has no max-width");
      assert.ok(/height:auto/.test(tag), "an image has no height:auto");
    }
  }
});

check("no markdown leaks into the rendered HTML", () => {
  for (const s of WELCOME_SEQUENCE) {
    const html = renderWelcomeHtml(s);
    assert.ok(!/!\[[^\]]*\]\(/.test(html), `step ${s.step} leaked raw markdown image syntax`);
    assert.ok(!/\]\(https?:/.test(html), `step ${s.step} leaked raw markdown link syntax`);
  }
});

check("every CTA points at a real Bible Buddy destination", () => {
  for (const s of WELCOME_SEQUENCE) {
    for (const m of renderWelcomeHtml(s).matchAll(/<a href="([^"]+)"/g)) {
      const url = m[1];
      if (url === "{{UNSUBSCRIBE}}") continue;
      assert.ok(
        url === APP_STORE_URL || url.startsWith("https://www.mybiblebuddy.net"),
        `step ${s.step} links somewhere unexpected: ${url}`,
      );
    }
  }
});

console.log("\nThe cron");

const cron = read("app/api/cron/welcome-email/route.ts");

check("it walks the steps rather than sending one email", () => {
  assert.ok(cron.includes("WELCOME_SEQUENCE"), "the cron does not use the sequence");
  assert.ok(cron.includes("FINAL_WELCOME_STEP"), "the cron does not know where the funnel ends");
  assert.ok(/welcome_step/.test(cron), "the cron does not track a step");
  assert.ok(!/campaign_id", "welcome"\)/.test(cron), "the cron still targets the old single welcome");
});

check("a step that is not armed stops the funnel instead of being skipped", () => {
  assert.ok(
    /campaign\.status !== "sending"/.test(cron),
    "the cron does not check that a step is armed",
  );
  assert.ok(/notArmed/.test(cron), "the cron does not report subscribers waiting at an unarmed step");
});

check("it claims before sending, so a crash cannot duplicate", () => {
  const claimAt = cron.indexOf('.insert({ campaign_id: step.campaignId');
  const sendAt = cron.indexOf("await sendEmail(");
  assert.ok(claimAt > 0 && sendAt > claimAt, "the cron sends before claiming");
});

check("one email a day, not one every fifteen minutes", () => {
  const match = cron.match(/MIN_GAP_HOURS = (\d+)/);
  assert.ok(match, "there is no gap between steps");
  assert.ok(Number(match[1]) >= 18, `the gap is only ${match[1]}h`);
});

check("finishing step 5 is what moves somebody into Bucket 2", () => {
  assert.ok(
    /nextStepNumber >= FINAL_WELCOME_STEP/.test(cron),
    "the cron does not detect the final step",
  );
  assert.ok(/welcome_completed_at/.test(cron), "the cron never marks completion");
});

check("existing subscribers can never be pulled into the funnel", () => {
  assert.ok(
    /\.is\("welcome_completed_at", null\)/.test(cron),
    "the cron does not exclude people who already completed",
  );
  const sql = read("supabase/migrations/20261111_email_buckets.sql");
  assert.ok(/welcome_completed_at = timestamptz '2026-11-11/.test(sql), "the cohort is not anchored to the cutoff");
  assert.ok(/where welcome_completed_at is null/.test(sql), "the anchoring could overwrite a real completion");
});

check("it survives the migration not having run", () => {
  assert.ok(
    /welcome_step\|welcome_completed_at/.test(cron),
    "the cron does not detect missing columns",
  );
  assert.ok(/idle: true/.test(cron), "the cron does not idle when the columns are absent");
});

check("it does not poll or run unbounded", () => {
  assert.ok(!/setInterval/.test(cron), "the cron uses setInterval");
  for (const name of ["MAX_PER_RUN", "MAX_CANDIDATES", "MAX_AGE_DAYS"]) {
    assert.ok(cron.includes(name), `${name} is missing`);
  }
});

console.log("\nBucket separation");

check("a subscriber mid-welcome is invisible to broadcasts", () => {
  const sql = read("supabase/migrations/20261111_email_buckets.sql");
  assert.ok(
    /s\.welcome_completed_at is not null/.test(sql),
    "marketing_recipients does not exclude the welcome funnel",
  );
  // The welcome emails are transactional, which is how they still reach
  // Bucket 1 while broadcasts cannot.
  assert.ok(/c\.kind = 'transactional'/.test(sql), "transactional mail is no longer exempt");
  // Suppression and duplicate protection must survive the rewrite.
  assert.ok(/e\.eligible/.test(sql), "suppression check is gone from marketing_recipients");
  assert.ok(/email_campaign_sends/.test(sql), "duplicate protection is gone from marketing_recipients");
});

check("the anchoring runs before the exclusion, or the audience would empty", () => {
  const sql = read("supabase/migrations/20261111_email_buckets.sql");
  const anchorAt = sql.indexOf("update public.email_subscribers");
  const excludeAt = sql.indexOf("create or replace function public.marketing_recipients");
  assert.ok(anchorAt > 0 && excludeAt > anchorAt, "the exclusion is defined before the cohort is anchored");
});

check("the install script cannot arm a step", () => {
  const install = read("scripts/install-welcome-sequence.ts");
  assert.ok(/payload\.status = "paused"/.test(install), "rows are not created paused");
  assert.ok(!/status: "sending"/.test(install), "the install script can arm a step");
  assert.ok(/if \(!was\) payload\.status/.test(install), "a re-run could overwrite a deliberately armed status");
});

console.log(`\n${checks} checks passed.\n`);
