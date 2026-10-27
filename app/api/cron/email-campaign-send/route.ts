import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendCampaign } from "@/lib/email/sendCampaign";
import { sesSendingEnabled } from "@/lib/email/sesSender";
import { fetchProgressForBatch, resolveProgressWindow } from "@/lib/email/newsletterProgress";
import { renderProgressSectionHtml, renderProgressSectionText } from "@/lib/email/progressSection";


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
  created_at: string | null;
  scheduled_for: string | null;
  // Read so a run can tell a first hiccup from a campaign that is actually
  // broken; see the catch block.
  last_result: { consecutiveFailures?: number } | null;
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
  //
  // CAMPAIGNS OWNED BY ANOTHER SENDER ARE EXCLUDED BY ID (2026-10-13).
  //
  // A campaign row is not automatically this cron's to send. Another sender
  // owns rows in this table and would be a disaster here: the welcome email,
  // posted one person at a time by /api/cron/welcome-email, kept out by
  // kind='transactional'.
  //
  // THE FRIDAY LESSONS USED TO BE EXCLUDED HERE AND ARE NOT ANY MORE
  // (2026-10-25). They were dripped per subscriber by
  // /api/cron/friday-teaching and carried no send date, which to this query
  // read as "armed, undated, send it now" - so arming the series would have
  // posted lesson 1 to the whole list on the spot. That cron is deleted:
  // every Friday email is now a dated campaign on the calendar in
  // lib/email/fridayTeachingSeries.ts, and THIS is the sender for all of
  // them. A future scheduled_for is what holds each one, which is why the
  // installer refuses to write a Friday row without one.
  //
  // Excluding by id rather than by a far-future date: a date is a value
  // somebody can clear by accident from the dashboard, whereas this cannot be
  // undone by editing a row.
  /**
   * The behaviour triggers belong to their own crons too (2026-10-25).
   *
   * Their rows are armed with no scheduled_for - the trigger decides who is
   * due from somebody's own behaviour, not from a column - which to the query
   * below looks exactly like "armed, undated, send it now". Arming the study
   * nudge would have posted it to the entire list in one run instead of to
   * the twenty-odd people who actually stalled.
   *
   * They are also kind 'transactional', which this query already filters out,
   * so this is the second lock rather than the only one. Excluding by id is
   * what survives somebody changing a row's kind from the dashboard.
   */
  const TRIGGER_IDS = ["study-nudge", "streak-at-risk", "finished-devotional"];

  /**
   * The community study start emails, one row per study
   * (community-start-beginning-of-everything, and whatever comes after).
   *
   * Same shape as the triggers above and the same danger: armed, undated,
   * and owned by a different sender - /api/cron/community-study-start, which
   * picks the recipients itself from community_event_members on the morning
   * the study opens. To the query below that row looks like "send this to
   * everybody now", and the 18 people who joined would become the whole
   * list.
   *
   * Matched by prefix rather than by id so the next study cannot ship
   * without this lock by somebody forgetting to add it here.
   */
  const COMMUNITY_START_PREFIX = "community-start-";

  const foreignIds = TRIGGER_IDS;

  const { data, error } = await db
    .from("email_campaigns")
    .select("campaign_id, subject, html, text, tag, rate_per_second, max_per_run, started_at, created_at, scheduled_for, last_result")
    // Marketing only. The welcome email is a campaign row too, but it is
    // triggered one person at a time by /api/cron/welcome-email - if this
    // batch sender ever picked it up it would post it to the whole list.
    .eq("kind", "marketing")
    .eq("status", "sending")
    .not("campaign_id", "in", `(${foreignIds.join(",")})`)
    .not("campaign_id", "like", `${COMMUNITY_START_PREFIX}%`)
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
    // A test send renders the progress block for the TEST ADDRESS's own
    // account, not a stand-in. That is the only way a test tells you whether
    // the real thing works, and it keeps the placeholder from going out raw.
    const progressMap = await fetchProgressForBatch(
      db,
      [{ email: testAddress, first_name: null }],
      resolveProgressWindow({}),
    );
    const progress = progressMap.get(testAddress.toLowerCase());
    const sectionHtml = progress ? renderProgressSectionHtml(progress) : "";
    const sectionText = progress ? renderProgressSectionText(progress) : "";
    const fill = (value: string, section: string) =>
      value
        .replace(/\{\{\s*progress_section\s*\}\}/g, section)
        .replace(/\{\{\s*first_name\s*\}\}/g, "friend");
    const { sendEmail } = await import("@/lib/email/sesSender");
    const sent = await sendEmail({
      to: testAddress,
      subject: fill(row.subject, ""),
      html: fill(row.html, sectionHtml),
      text: fill(row.text, sectionText),
    });
    return NextResponse.json({ ok: sent.sent, test: testAddress, variant: progress?.variant ?? null, ...sent });
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

  // started_at is also what anchors the progress block's seven-day window, so
  // it has to be pinned before the first batch and never moved afterwards. A
  // send spans many of these runs; without a fixed anchor the people reached on
  // Wednesday would be measured against a different week from Tuesday's.
  if (!campaign.started_at) {
    const startedAt = new Date().toISOString();
    await db
      .from("email_campaigns")
      .update({ started_at: startedAt })
      .eq("campaign_id", campaign.campaign_id);
    campaign.started_at = startedAt;
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
      progressWindow: resolveProgressWindow(campaign),
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

    // Three strikes, not one.
    //
    // This used to pause on the first error, on the reasoning that a failing
    // campaign needs a person. That is true of a campaign that is genuinely
    // broken and badly wrong for one that hiccupped: a send to 5,000 people
    // runs for nine hours across fifty-odd invocations, and over that long a
    // single dropped connection or a slow query is close to certain. Twice in
    // one evening a blip stopped the Moses campaign dead, and both times the
    // only fix was a human noticing and pressing a button.
    //
    // A transient failure costs ten minutes now - the next run simply tries
    // again. A real one still stops, three runs in, with its reasons kept.
    const strikes = (Number((campaign.last_result as { consecutiveFailures?: number } | null)?.consecutiveFailures) || 0) + 1;
    const giveUp = strikes >= 3;

    await db
      .from("email_campaigns")
      .update({
        ...(giveUp ? { status: "paused" } : {}),
        last_run_at: new Date().toISOString(),
        last_result: {
          error: message || "(the error carried no message - usually a dropped connection)",
          consecutiveFailures: strikes,
          willRetry: !giveUp,
        },
      })
      .eq("campaign_id", campaign.campaign_id);

    return NextResponse.json(
      { ok: false, campaignId: campaign.campaign_id, paused: giveUp, strikes, error: message },
      { status: 500 },
    );
  }
}
