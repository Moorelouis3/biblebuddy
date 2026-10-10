import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { sendEmail, sesSendingEnabled } from "@/lib/email/sesSender";
import { countEligible } from "@/lib/email/sendCampaign";
import { unsubscribeUrl } from "@/lib/blogBroadcast";
import { ENGAGEMENT_GROUPS, isEngagementGroup } from "@/lib/email/engagementGroups";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * The campaign list behind /admin/campaigns (Louis, 2026-10-10).
 *
 * Replaces what Systeme's Newsletters screen did: every campaign with its
 * subject, when it goes out, how many it reached and the open and click
 * rates, plus the controls to move a date, rename it, pause it or send a test.
 *
 * The numbers come from ses_campaign_stats, which counts opens and clicks
 * DISTINCT by recipient - the same way Systeme reported them, so this week's
 * figures can be compared with the 17-20% opens he is used to.
 *
 * Engagement groups come from email_engagement / email_engagement_summary, and
 * the eligible-recipient count comes from marketing_recipients() - the same
 * function lib/email/sendCampaign walks. Nothing here recomputes a group or a
 * frequency cap in TypeScript, because then the screen could say one thing and
 * the sender do another.
 *
 * Sending is deliberately NOT done here. Marking a campaign 'sending' is all
 * this does; /api/cron/email-campaign-send posts it in rate-limited batches.
 * A send that ran inside this request would die at the function timeout about
 * a thousand recipients in.
 */

const ADMIN_EMAIL = "moorelouis3@gmail.com";

/** The drill-down list is for reading, not exporting; one page is plenty. */
const GROUP_PAGE_SIZE = 200;

async function requireLouis(request: NextRequest): Promise<{ db: SupabaseClient } | NextResponse> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !service) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const auth = createClient(url, anon, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await auth.auth.getUser(token);
  if (error || (data.user?.email || "").toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  return { db: createClient(url, service, { auth: { autoRefreshToken: false, persistSession: false } }) };
}

export async function GET(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;
  const { db } = auth;
  const params = request.nextUrl.searchParams;

  // ?campaignId=... returns one campaign WITH its body, for the preview.
  // Read from the same row the sender reads, so what is on screen is what
  // goes out - no second copy to drift. Reading cannot send: this is a GET
  // and it touches nothing but the select.
  const wanted = params.get("campaignId");
  if (wanted) {
    const { data: one, error: oneError } = await db
      .from("email_campaigns")
      .select("campaign_id, subject, html, text, status, scheduled_for, notes, kind, target_groups")
      .eq("campaign_id", wanted)
      .maybeSingle();
    if (oneError) return NextResponse.json({ error: oneError.message }, { status: 500 });
    if (!one) return NextResponse.json({ error: "No such campaign." }, { status: 404 });
    // The real link is per recipient and only exists at send time, so the
    // preview shows a working stand-in rather than a raw placeholder.
    const previewHtml = (one.html || "")
      .split("{{UNSUBSCRIBE}}")
      .join("https://www.mybiblebuddy.net/api/email/unsubscribe?preview=1");
    const previewText = (one.notes || "").split("preview:")[1]?.trim() || null;
    return NextResponse.json({ campaign: { ...one, html: previewHtml, previewText } });
  }

  // ?recipients=<campaignId> answers "who would get this, right now".
  //
  // Deliberately on demand rather than computed for every row of the list:
  // it is one query per campaign and there are 27 drafts, which would make
  // opening the page a half-minute affair.
  const recipientsFor = params.get("recipients");
  if (recipientsFor) {
    const { data: campaign } = await db
      .from("email_campaigns")
      .select("campaign_id, target_groups, kind")
      .eq("campaign_id", recipientsFor)
      .maybeSingle();
    if (!campaign) return NextResponse.json({ error: "No such campaign." }, { status: 404 });

    const total = await countEligible(recipientsFor, db);

    // The per-group split, so the number is explainable rather than just a
    // number. Counted through the same function, one group at a time.
    const byGroup: Record<string, number> = {};
    for (const group of ENGAGEMENT_GROUPS) {
      if (!campaign.target_groups?.includes(group)) {
        byGroup[group] = 0;
        continue;
      }
      const { count } = await db
        .rpc("marketing_recipients", { p_campaign_id: recipientsFor }, { count: "exact", head: true })
        .eq("engagement_group", group);
      byGroup[group] = count ?? 0;
    }

    return NextResponse.json({
      campaignId: recipientsFor,
      targetGroups: campaign.target_groups,
      kind: campaign.kind,
      eligibleNow: total,
      byGroup,
    });
  }

  // ?group=active|quiet|inactive drills into a dashboard card: who is in it,
  // when they were last active, and why they are there. The reason string is
  // built by the view, so it is the grouping rule explaining itself.
  const group = params.get("group");
  if (group) {
    if (!isEngagementGroup(group)) {
      return NextResponse.json({ error: "Unknown group." }, { status: 400 });
    }
    const offset = Math.max(0, Number(params.get("offset") || 0));
    const { data: people, count, error: groupError } = await db
      .from("email_engagement")
      .select(
        "email, first_name, engagement_group, registered_at, last_qualifying_activity_at, " +
          "last_app_activity_at, last_app_action, last_human_click_at, last_open_at, " +
          "opens_total, opens_that_look_human, activity_basis, group_reason, " +
          "marketing_sends_7d, weekly_cap, has_recorded_activity",
        { count: "exact" },
      )
      .eq("engagement_group", group)
      .eq("eligible", true)
      // Most recently active first, and the people we know nothing about last,
      // which is also the order they are worth looking at in.
      .order("reference_at", { ascending: false })
      .range(offset, offset + GROUP_PAGE_SIZE - 1);
    if (groupError) return NextResponse.json({ error: groupError.message }, { status: 500 });
    return NextResponse.json({
      group,
      total: count ?? 0,
      offset,
      pageSize: GROUP_PAGE_SIZE,
      people: people ?? [],
    });
  }

  const { data: stats, error } = await db
    .from("ses_campaign_stats")
    .select("*")
    .order("scheduled_for", { ascending: true, nullsFirst: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Notes carry the Systeme origin and preview text; the body is deliberately
  // not sent to the browser, because 27 campaigns at 10KB each is 270KB of
  // HTML nobody is reading in a table.
  const { data: meta } = await db
    .from("email_campaigns")
    .select("campaign_id, notes, rate_per_second, max_per_run, last_result, kind, target_groups");

  const metaById = new Map((meta || []).map((m) => [m.campaign_id, m]));

  const { data: engagement, error: engagementError } = await db
    .from("email_engagement_summary")
    .select("*")
    .maybeSingle();

  // The whole suppression list, which is larger than the part of it that sits
  // on our own mailing list - it also holds addresses that bounced out of
  // Systeme and were never subscribers here. The dashboard shows the on-list
  // number next to the three groups so the arithmetic adds up, and this one
  // as the full total.
  const { count: suppressedEverywhere } = await db
    .from("email_suppressions")
    .select("email", { count: "exact", head: true });

  return NextResponse.json({
    campaigns: (stats || []).map((row) => ({ ...row, ...(metaById.get(row.campaign_id) || {}) })),
    engagement: engagement ?? null,
    engagementError: engagementError?.message ?? null,
    audience: engagement?.subscribers_total ?? 0,
    suppressed: suppressedEverywhere || 0,
    senderReady: sesSendingEnabled(),
    from: process.env.SES_FROM_ADDRESS || "(SES_FROM_ADDRESS not set)",
  });
}

export async function POST(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;
  const { db } = auth;

  const body = await request.json().catch(() => null);
  const op = String(body?.op || "");
  const campaignId = String(body?.campaignId || "");
  if (!op || !campaignId) {
    return NextResponse.json({ error: "op and campaignId are required." }, { status: 400 });
  }

  const { data: campaign } = await db
    .from("email_campaigns")
    .select("*")
    .eq("campaign_id", campaignId)
    .maybeSingle();
  if (!campaign) return NextResponse.json({ error: "No such campaign." }, { status: 404 });

  if (op === "update") {
    const patch: Record<string, unknown> = {};
    if (typeof body.subject === "string" && body.subject.trim()) patch.subject = body.subject.trim();
    if ("scheduledFor" in body) {
      patch.scheduled_for = body.scheduledFor ? new Date(body.scheduledFor).toISOString() : null;
    }
    if (!Object.keys(patch).length) return NextResponse.json({ error: "Nothing to change." }, { status: 400 });
    const { error } = await db.from("email_campaigns").update(patch).eq("campaign_id", campaignId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  // Which engagement groups this campaign is allowed to reach. The caps still
  // apply inside each one, so targeting all three does not mean everybody gets
  // it - it means everybody who is under their limit this week gets it.
  if (op === "targets") {
    const groups = Array.isArray(body.targetGroups) ? body.targetGroups.filter(isEngagementGroup) : [];
    if (!groups.length) {
      return NextResponse.json({ error: "Pick at least one group." }, { status: 400 });
    }
    const { error } = await db
      .from("email_campaigns")
      .update({ target_groups: groups })
      .eq("campaign_id", campaignId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, targetGroups: groups, eligibleNow: await countEligible(campaignId, db) });
  }

  if (op === "pause" || op === "draft") {
    const { error } = await db
      .from("email_campaigns")
      .update({ status: op === "pause" ? "paused" : "draft" })
      .eq("campaign_id", campaignId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (op === "schedule") {
    // Arming a campaign. The cron will not touch it until scheduled_for has
    // passed, so a future date is safe; a past one goes on the next run.
    if (!sesSendingEnabled()) {
      return NextResponse.json({ error: "SES is not configured." }, { status: 400 });
    }
    // A transactional campaign - the welcome - has no audience to count. It
    // fires once per new signup from /api/cron/welcome-email, so asking
    // marketing_recipients() how many people it reaches would return the whole
    // list and be a frightening and completely wrong number to show.
    const transactional = campaign.kind === "transactional";
    const eligibleNow = transactional ? null : await countEligible(campaignId, db);
    const { error } = await db
      .from("email_campaigns")
      .update({ status: "sending" })
      .eq("campaign_id", campaignId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({
      ok: true,
      armed: true,
      transactional,
      scheduledFor: campaign.scheduled_for,
      eligibleNow,
      targetGroups: campaign.target_groups,
    });
  }

  if (op === "test") {
    if (!sesSendingEnabled()) {
      return NextResponse.json({ error: "SES is not configured." }, { status: 400 });
    }
    const to = typeof body.to === "string" && body.to.includes("@") ? body.to : ADMIN_EMAIL;
    const result = await sendEmail({
      to,
      subject: `[TEST] ${campaign.subject}`,
      html: campaign.html,
      text: campaign.text,
      unsubscribeUrl: unsubscribeUrl(to),
    });
    if (!result.sent) {
      return NextResponse.json({ error: result.detail || result.reason }, { status: 502 });
    }
    return NextResponse.json({ ok: true, testedTo: to });
  }

  return NextResponse.json({ error: "Unknown op." }, { status: 400 });
}
