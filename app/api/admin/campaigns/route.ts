import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { sendEmail, sesSendingEnabled } from "@/lib/email/sesSender";
import { unsubscribeUrl } from "@/lib/blogBroadcast";

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
 * Sending is deliberately NOT done here. Marking a campaign 'sending' is all
 * this does; /api/cron/email-campaign-send posts it in rate-limited batches.
 * A send that ran inside this request would die at the function timeout about
 * a thousand recipients in.
 */

const ADMIN_EMAIL = "moorelouis3@gmail.com";

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

  // ?campaignId=... returns one campaign WITH its body, for the preview.
  // Read from the same row the sender reads, so what is on screen is what
  // goes out - no second copy to drift. Reading cannot send: this is a GET
  // and it touches nothing but the select.
  const wanted = request.nextUrl.searchParams.get("campaignId");
  if (wanted) {
    const { data: one, error: oneError } = await db
      .from("email_campaigns")
      .select("campaign_id, subject, html, text, status, scheduled_for, notes")
      .eq("campaign_id", wanted)
      .maybeSingle();
    if (oneError) return NextResponse.json({ error: oneError.message }, { status: 500 });
    if (!one) return NextResponse.json({ error: "No such campaign." }, { status: 404 });
    // The real link is per recipient and only exists at send time, so the
    // preview shows a working stand-in rather than a raw placeholder.
    const previewHtml = (one.html || "").split("{{UNSUBSCRIBE}}").join("https://www.mybiblebuddy.net/api/email/unsubscribe?preview=1");
    const previewText = (one.notes || "").split("preview:")[1]?.trim() || null;
    return NextResponse.json({ campaign: { ...one, html: previewHtml, previewText } });
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
    .select("campaign_id, notes, rate_per_second, max_per_run, last_result");

  const metaById = new Map((meta || []).map((m) => [m.campaign_id, m]));

  const { count: subscribers } = await db
    .from("email_subscribers")
    .select("email", { count: "exact", head: true });
  const { count: suppressed } = await db
    .from("email_suppressions")
    .select("email", { count: "exact", head: true });

  return NextResponse.json({
    campaigns: (stats || []).map((row) => ({ ...row, ...(metaById.get(row.campaign_id) || {}) })),
    audience: (subscribers || 0),
    suppressed: suppressed || 0,
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
    const { error } = await db
      .from("email_campaigns")
      .update({ status: "sending" })
      .eq("campaign_id", campaignId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, armed: true, scheduledFor: campaign.scheduled_for });
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
