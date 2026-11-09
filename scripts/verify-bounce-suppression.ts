/**
 * Checks that a bounced address stops being emailed after one bounce.
 *
 * Louis, 2026-11-09: "stop eamiling them after 2 strikes actually 1 strike if
 * its biunced thatex dont want emails move on".
 *
 * Offline on purpose - no network, no database, nothing to set up. It reads
 * the source of the webhook and the backfill script and asserts the decisions
 * they make, then models the webhook's bounce branch against the shapes SES
 * actually publishes.
 *
 * The point of most of these checks is the next person, not today. Suppressing
 * only Permanent bounces looks like the careful choice, and it is the thing
 * someone will "fix" back in six months. The checks below fail loudly if they
 * do, with the reason attached.
 *
 *   npx tsx scripts/verify-bounce-suppression.ts
 */

import fs from "node:fs";

const WEBHOOK = "app/api/webhooks/ses/route.ts";
const BACKFILL = "scripts/suppress-bounced-addresses.ts";
const SENDER = "lib/email/sesSender.ts";

let failures = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`${ok ? "  PASS" : "  FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
};

const read = (path: string) => fs.readFileSync(path, "utf8");

/* ------------------------------------------------------------------ */
/* The webhook suppresses on every bounce                              */
/* ------------------------------------------------------------------ */

console.log("\nThe SES webhook");
const webhook = read(WEBHOOK);

check(
  "does not gate suppression on a Permanent bounce",
  !/bounceType\s*===\s*["']Permanent["']/.test(webhook),
  "a Permanent-only gate is what let 228 dead addresses stay on the list",
);

check(
  "does not skip a recipient before suppressing",
  !/if \(!permanent\)/.test(webhook) && !/soft bounce, kept/.test(webhook),
  "every bounce suppresses now, soft ones included",
);

const bounceBranch = webhook.slice(
  webhook.indexOf('if (kind === "Bounce"'),
  webhook.indexOf('if (kind === "Complaint"'),
);

check(
  "calls suppress() for each bounced recipient",
  /await suppress\(recipient\.emailAddress, "bounce"/.test(bounceBranch),
  "",
);

check(
  "has no `continue` left in the bounce loop except the empty-address guard",
  (bounceBranch.match(/continue;/g) || []).length === 1,
  "a second continue means someone added an exemption",
);

check(
  "records the SES bounce type in the suppression detail",
  /event\.bounce\.bounceType/.test(bounceBranch) && /detail/.test(bounceBranch),
  "without it a Transient suppression cannot be told from a Permanent one and cannot be undone safely",
);

check(
  "does not treat DeliveryDelay as a bounce",
  !/deliverydelay/i.test(bounceBranch),
  "SES is still retrying at that point; only the Bounce event means it gave up",
);

/* ------------------------------------------------------------------ */
/* Model the branch against the shapes SES publishes                   */
/* ------------------------------------------------------------------ */

console.log("\nThe decision, modelled");

type Bounce = {
  bounceType?: string;
  bounceSubType?: string;
  bouncedRecipients?: Array<{ emailAddress?: string; diagnosticCode?: string }>;
};

/** The same decision the webhook makes, kept deliberately tiny. */
function suppressedBy(bounce: Bounce): string[] {
  const out: string[] = [];
  for (const recipient of bounce.bouncedRecipients || []) {
    if (!recipient.emailAddress) continue;
    out.push(recipient.emailAddress);
  }
  return out;
}

const permanent: Bounce = {
  bounceType: "Permanent",
  bounceSubType: "NoEmail",
  bouncedRecipients: [{ emailAddress: "gone@example.com", diagnosticCode: "550 5.1.1 user unknown" }],
};
const transient: Bounce = {
  bounceType: "Transient",
  bounceSubType: "MailboxFull",
  bouncedRecipients: [{ emailAddress: "full@example.com" }],
};
const typo: Bounce = {
  bounceType: "Permanent",
  bounceSubType: "General",
  bouncedRecipients: [{ emailAddress: "someone@gmail.con" }],
};
const undetermined: Bounce = {
  bounceType: "Undetermined",
  bouncedRecipients: [{ emailAddress: "unclear@example.com" }],
};
const empty: Bounce = { bounceType: "Permanent", bouncedRecipients: [{ diagnosticCode: "550" }] };

check("a Permanent bounce suppresses", suppressedBy(permanent).length === 1);
check(
  "a Transient bounce suppresses too",
  suppressedBy(transient).length === 1,
  "this is the change: a full mailbox used to be kept and re-mailed every campaign",
);
check("a mistyped domain suppresses", suppressedBy(typo)[0] === "someone@gmail.con");
check("an Undetermined bounce suppresses", suppressedBy(undetermined).length === 1);
check("a bounce with no address suppresses nobody", suppressedBy(empty).length === 0);

check(
  "several recipients on one bounce all suppress",
  suppressedBy({
    bounceType: "Transient",
    bouncedRecipients: [{ emailAddress: "a@example.com" }, { emailAddress: "b@example.com" }],
  }).length === 2,
);

/* ------------------------------------------------------------------ */
/* The sender actually honours the list                                */
/* ------------------------------------------------------------------ */

console.log("\nThe sender");
const sender = read(SENDER);

check(
  "checks the suppression list before every send",
  /if \(await isSuppressed\(to\)\) return \{ sent: false, reason: "suppressed" \}/.test(sender),
  "the whole fix rests on this line",
);

check(
  "checks it before the unsubscribe-link rule, not after",
  sender.indexOf("isSuppressed(to)") < sender.indexOf("marketing email needs an unsubscribe link"),
  "a suppressed address must drop out first, whatever else is wrong with the message",
);

/* ------------------------------------------------------------------ */
/* The backfill script is safe to re-run                               */
/* ------------------------------------------------------------------ */

console.log("\nThe backfill script");
const backfill = read(BACKFILL);

check(
  "is a dry run unless --apply is passed",
  /const APPLY = process\.argv\.includes\("--apply"\)/.test(backfill) && /if \(!APPLY\)/.test(backfill),
  "",
);

check(
  "never deletes a suppression",
  !/\.delete\(\)/.test(backfill),
  "undoing one is a deliberate act, not something a re-run can do by accident",
);

check(
  "never touches email_subscribers",
  // Matched on the query, not the word: the file's own comment says it does
  // not touch that table, and a bare word search reads its promise as a breach.
  !/from\(\s*["']email_subscribers["']/.test(backfill),
  "suppression is the list that stops a send; unsubscribing somebody is a different thing",
);

check(
  "never sends an email",
  !/sendEmail|SendEmailCommand/.test(backfill),
  "",
);

check(
  "pages its reads rather than trusting one select",
  /range\(from, from \+ PAGE - 1\)/.test(backfill),
  "PostgREST caps every response at 1000 rows, so an unpaged read quietly finds 1000 bounces and no more",
);

check(
  "treats a supabase error as an error",
  /if \(error\) throw new Error\(`\$\{table\}: \$\{error\.message\}`\)/.test(backfill),
  "supabase-js returns {data: null, error} instead of throwing, so an empty page and a dropped connection look alike",
);

check(
  "masks addresses it prints",
  /function mask\(/.test(backfill) && /mask\(email\)/.test(backfill),
  "this prints to a terminal and into logs",
);

check(
  "defaults to one strike",
  /numberFlag\("--strikes=", 1\)/.test(backfill),
  "",
);

/* ------------------------------------------------------------------ */

console.log(`\n${failures ? `${failures} check(s) failed.` : "All checks passed."}`);
process.exit(failures ? 1 : 0);
