import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendCampaign } from "@/lib/email/sendCampaign";
import { sesSendingEnabled } from "@/lib/email/sesSender";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

/**
 * The thing that actually posts the mailing list (Louis, 2026-10-09).
 *
 * sendCampaign() has existed since the 8th and nothing called it, so
 * email_campaign_sends sat at zero. This is the caller.
 *
 * It is a cron rather than a button because a campaign cannot finish inside
 * one request: 4,571 subscribers at a safe 5/second is about fifteen minutes
 * and this function is killed at five. sendCampaign is resumable by design -
 * it claims each address before sending - so the honest shape is small batches,
 * often, until the list is done. A run that dies halfway loses nothing.
 *
 * Nothing goes out unless a human has set a campaign to 'sending'. With no such
 * row this is a no-op, which is why it is safe to have firing every ten minutes
 * from the day it ships.
 *
 * It also stays inert while SES is unconfigured, the same way sesSender does,
 * so this can go live before the AWS keys are in without sending anything or
 * filling the logs with errors.
 */

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  // Matches the other crons in this project: no secret configured means the
  // route is open, because Vercel's own cron caller sets no header.
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

type CampaignRow = {
  campaign_id: string;
  subject: string;
  html: string;
  text: string;
  tag: string | null;
  rate_per_second: number;
  max_per_run: number;
  started_at: string | null;
  scheduled_for: string | null;
};

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

  // Oldest first, one at a time. Two campaigns going out at once would share
  // the SES rate limit and neither would respect it.
  // Anything scheduled for the future is left alone. Ordered by scheduled_for
  // so a campaign with a date goes before one without, and nulls last.
  const { data, error } = await db
    .from("email_campaigns")
    .select("campaign_id, subject, html, text, tag, rate_per_second, max_per_run, started_at, scheduled_for")
    .eq("status", "sending")
    .or(`scheduled_for.is.null,scheduled_for.lte.${new Date().toISOString()}`)
    .order("scheduled_for", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true })
    .limit(1);

  if (error) {
    // The table not existing yet is not a failure worth alerting on - the
    // migration simply has not been run.
    if (/does not exist|schema cache/i.test(error.message)) {
      return NextResponse.json({ ok: true, idle: true, reason: "email_campaigns table not created yet" });
    }
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  // ?test=<address> posts a single copy and records nothing, so a campaign can
  // be read in a real inbox before it goes to thousands.
  //
  // This one fails CLOSED. The cron itself is open when CRON_SECRET is unset,
  // which is fine for a job that only sends to the existing list - but a path
  // that emails an arbitrary address on request is an open relay, and would be
  // found and abused. No secret configured means no test sends.
  const testAddress = request.nextUrl.searchParams.get("test");
  if (testAddress) {
    const secret = process.env.CRON_SECRET;
    if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
      return NextResponse.json(
        { error: "Test sends require CRON_SECRET to be set and supplied." },
        { status: 401 },
      );
    }
    const wanted = request.nextUrl.searchParams.get("campaign");
    const { data: row } = await db
      .from("email_campaigns")
      .select("campaign_id, subject, html, text")
      .eq("campaign_id", wanted ?? "")
      .maybeSingle();
    if (!row) return NextResponse.json({ error: "No such campaign." }, { status: 404 });
    if (!sesSendingEnabled()) {
      return NextResponse.json({ error: "SES is not configured yet." }, { status: 409 });
    }
    const fill = (value: string) => value.replace(/\{\{\s*first_name\s*\}\}/g, "friend");
    const { sendEmail } = await import("@/lib/email/sesSender");
    const sent = await sendEmail({
      to: testAddress,
      subject: fill(row.subject),
      html: fill(row.html),
      text: fill(row.text),
    });
    return NextResponse.json({ ok: sent.sent, test: testAddress, ...sent });
  }

  const campaign = (data?.[0] as CampaignRow | undefined) ?? null;
  if (!campaign) {
    return NextResponse.json({
      ok: true,
      idle: true,
      reason: "nothing is due - no campaign is both marked sending and past its scheduled time",
    });
  }

  if (!sesSendingEnabled()) {
    return NextResponse.json({
      ok: true,
      idle: true,
      campaignId: campaign.campaign_id,
      reason:
        "SES is not configured. Needs SES_SENDING_ENABLED=true, AWS_SES_ACCESS_KEY_ID, " +
        "AWS_SES_SECRET_ACCESS_KEY and SES_FROM_ADDRESS.",
    });
  }

  if (!campaign.started_at) {
    await db
      .from("email_campaigns")
      .update({ started_at: new Date().toISOString() })
      .eq("campaign_id", campaign.campaign_id);
  }

  try {
    const result = await sendCampaign({
      campaignId: campaign.campaign_id,
      subject: campaign.subject,
      html: campaign.html,
      text: campaign.text,
      tag: campaign.tag ?? undefined,
      ratePerSecond: Number(campaign.rate_per_second),
      limit: campaign.max_per_run,
    });

    // Finished when this run found nobody left to send to. Anyone who failed
    // is already recorded in email_campaign_sends and is deliberately NOT
    // retried - a hard bounce retried forever is how a sender gets burned.
    //
    // "Nobody left" includes people held back by their weekly cap, and that
    // is deliberate. A quiet or inactive subscriber who has already had their
    // allowance this week does not receive this campaign late next week; they
    // simply receive fewer campaigns, which is the entire point of the groups.
    // Holding one open until the rolling window moved would post Thursday's
    // email on the following Tuesday, and the campaign would never complete.
    const finished = result.eligible === 0;

    await db
      .from("email_campaigns")
      .update({
        last_run_at: new Date().toISOString(),
        last_result: result,
        ...(finished ? { status: "done", completed_at: new Date().toISOString() } : {}),
      })
      .eq("campaign_id", campaign.campaign_id);

    return NextResponse.json({ ok: true, finished, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    // Pause rather than keep hammering. A campaign that is failing needs a
    // person to look at it, and the next run would hit the same wall.
    await db
      .from("email_campaigns")
      .update({
        status: "paused",
        last_run_at: new Date().toISOString(),
        last_result: { error: message },
      })
      .eq("campaign_id", campaign.campaign_id);

    return NextResponse.json(
      { ok: false, campaignId: campaign.campaign_id, paused: true, error: message },
      { status: 500 },
    );
  }
}
