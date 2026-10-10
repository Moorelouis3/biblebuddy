import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail, sesSendingEnabled } from "@/lib/email/sesSender";
import { unsubscribeUrl } from "@/lib/email/unsubscribeLink";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

/**
 * The welcome email, sent from our own server (Louis, 2026-10-10).
 *
 * It used to be Systeme's: our code added a `bb-day1-welcome` tag over their
 * API and an automation rule on their side wrote and sent the actual email.
 * That made Systeme the last thing still running after the SES move, and meant
 * the words going out to every new member lived in somebody else's product
 * where nothing in this repo could see or review them.
 *
 * Now the body lives in email_campaigns under the id 'welcome' and this posts
 * it. It is a campaign row like any other, so it shows up on /admin/campaigns
 * with its own sent, open and click numbers, and the draft preview works on it.
 *
 * SAFETY - the thing that must never go wrong here:
 *
 *   Turning this on must not email the 5,000 people who already signed up.
 *
 * Two independent guards:
 *   1. started_at on the campaign is the cut-over. It is stamped the first
 *      time the welcome is switched on, and only people who joined AFTER that
 *      moment are ever considered. Switching it off and on again does not
 *      reset it.
 *   2. A hard backstop of MAX_AGE_DAYS regardless of what started_at says, so
 *      even a corrupted or hand-edited timestamp cannot reach back through the
 *      whole list.
 *
 * Nothing sends while the campaign is 'paused', which is how it is installed.
 */

/** Nobody who signed up longer ago than this ever gets a welcome. */
const MAX_AGE_DAYS = 7;

/** Most new signups in an hour; well above the ~20/day Bible Buddy sees. */
const MAX_PER_RUN = 200;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  // Matches the other crons in this project: no secret configured means the
  // route is open, because Vercel's own cron caller sets no header.
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const db = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: campaign, error: campaignError } = await db
    .from("email_campaigns")
    .select("campaign_id, subject, html, text, status, started_at, rate_per_second")
    .eq("campaign_id", "welcome")
    .maybeSingle();

  if (campaignError) {
    return NextResponse.json({ ok: false, error: campaignError.message }, { status: 500 });
  }
  if (!campaign) {
    return NextResponse.json({ ok: true, idle: true, reason: "no 'welcome' campaign row" });
  }
  if (campaign.status !== "sending") {
    return NextResponse.json({ ok: true, idle: true, reason: `welcome is ${campaign.status}` });
  }
  if (!sesSendingEnabled()) {
    return NextResponse.json({ ok: true, idle: true, reason: "SES is not configured" });
  }

  // Guard 1: the cut-over. Stamped once, the first time it is switched on.
  let cutover = campaign.started_at;
  if (!cutover) {
    cutover = new Date().toISOString();
    await db.from("email_campaigns").update({ started_at: cutover }).eq("campaign_id", "welcome");
    // Deliberately returning here. On the very first run nobody can have
    // signed up after a cut-over set a millisecond ago, and stopping makes
    // that obvious rather than leaving it to an empty query.
    return NextResponse.json({ ok: true, armed: true, cutover, sent: 0 });
  }

  // Guard 2: the backstop. Whichever of the two is more recent wins.
  const backstop = new Date(Date.now() - MAX_AGE_DAYS * 86400000).toISOString();
  const since = cutover > backstop ? cutover : backstop;

  const { data: joined, error: joinedError } = await db
    .from("email_subscribers")
    .select("email, first_name, subscribed_at")
    .gte("subscribed_at", since)
    .order("subscribed_at", { ascending: true })
    .limit(MAX_PER_RUN);

  if (joinedError) {
    return NextResponse.json({ ok: false, error: joinedError.message }, { status: 500 });
  }
  if (!joined?.length) {
    return NextResponse.json({ ok: true, sent: 0, since, reason: "nobody new" });
  }

  // Who already has one. email_campaign_sends is keyed (campaign_id, email),
  // so it is both the record and the lock - the insert below cannot create a
  // second row for the same person even if two runs overlap.
  const { data: already } = await db
    .from("email_campaign_sends")
    .select("email")
    .eq("campaign_id", "welcome")
    .in(
      "email",
      joined.map((s) => s.email),
    );
  const done = new Set((already ?? []).map((r) => r.email));
  const queue = joined.filter((s) => !done.has(s.email));

  const gapMs = Math.ceil(1000 / Math.max(0.2, Number(campaign.rate_per_second) || 1));
  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const person of queue) {
    // Claim before sending, same as sendCampaign: a crash between the two
    // loses one welcome rather than sending a duplicate later.
    const { error: claimError } = await db
      .from("email_campaign_sends")
      .insert({ campaign_id: "welcome", email: person.email, status: "pending" });
    if (claimError) {
      skipped += 1;
      continue;
    }

    const name = (person.first_name || "friend").trim() || "friend";
    const fill = (value: string) => value.replace(/\{\{\s*first_name\s*\}\}/g, name);

    let status: "sent" | "failed" | "skipped" = "failed";
    let detail: string | null = null;
    try {
      const result = await sendEmail({
        to: person.email,
        subject: fill(campaign.subject),
        html: fill(campaign.html),
        text: fill(campaign.text),
        // Suppression is still checked inside sendEmail. Somebody who
        // unsubscribed and then made a new account does not get a welcome.
        unsubscribeUrl: unsubscribeUrl(person.email),
        tags: { campaign: "welcome" },
      });
      if (result.sent) {
        status = "sent";
        sent += 1;
      } else if (result.reason === "suppressed") {
        status = "skipped";
        skipped += 1;
      } else {
        detail = result.detail || result.reason || "unknown";
        failed += 1;
      }
    } catch (error) {
      detail = error instanceof Error ? error.message : String(error);
      failed += 1;
    }

    await db
      .from("email_campaign_sends")
      .update({ status, detail, sent_at: new Date().toISOString() })
      .eq("campaign_id", "welcome")
      .eq("email", person.email);

    await new Promise((resolve) => setTimeout(resolve, gapMs));
  }

  await db
    .from("email_campaigns")
    .update({ last_run_at: new Date().toISOString(), last_result: { sent, failed, skipped, since } })
    .eq("campaign_id", "welcome");

  return NextResponse.json({ ok: true, sent, failed, skipped, considered: queue.length, since });
}
