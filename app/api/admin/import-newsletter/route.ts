import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * One-off intake for the newsletters still sitting in Systeme (2026-10-10).
 *
 * Systeme has no public API for newsletters, their editor screen never
 * finishes loading, and the bodies could not be read out through the browser
 * tooling. What DOES work is their own internal endpoint,
 * /api/dashboard/customer/mailing/newsletters/<id>, called from a logged-in
 * tab. So the browser fetches each newsletter there and posts it straight
 * here, and the copy goes from Systeme into our database without a human or
 * an assistant retyping a word of it.
 *
 * Everything arrives as a DRAFT. Nothing imported here can send until someone
 * sets it to 'sending', which is the same gate every other campaign passes.
 *
 * DELETE THIS ROUTE once the 27 newsletters are across. It exists to move a
 * one-time pile of content and has no job after that.
 *
 * Auth: CRON_SECRET in the query string. A cross-origin post cannot set an
 * Authorization header without a CORS preflight that Systeme's page will not
 * allow, so the token rides in the URL over HTTPS. Reusing the ops secret
 * rather than adding a new one is deliberate - a permanent env var for a
 * temporary endpoint is worse than a shared one that disappears with it.
 */

type Incoming = {
  systemeId?: number | string;
  subject?: string;
  previewText?: string | null;
  html?: string | null;
  body?: string | null;
  scheduledAt?: string | null;
};

export async function POST(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.nextUrl.searchParams.get("token") !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  let payload: Incoming;
  try {
    payload = JSON.parse(await request.text()) as Incoming;
  } catch {
    return NextResponse.json({ error: "Body was not JSON." }, { status: 400 });
  }

  const systemeId = String(payload.systemeId || "").trim();
  const subject = (payload.subject || "").trim();
  if (!systemeId || !subject) {
    return NextResponse.json({ error: "systemeId and subject are required." }, { status: 400 });
  }

  const html = (payload.html || payload.body || "").trim();
  if (!html) {
    return NextResponse.json({ error: "No body on that newsletter." }, { status: 400 });
  }

  // A plain-text part is not optional: HTML-only mail scores worse with spam
  // filters, and Systeme stores only the rendered HTML.
  const text = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li)>/gi, "\n\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const db = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Keyed on the Systeme id so re-running the import updates rather than
  // duplicating. Status is forced back to draft on every import: a half-moved
  // campaign must never inherit 'sending'.
  const campaignId = `systeme-${systemeId}`;
  const { error } = await db.from("email_campaigns").upsert(
    {
      campaign_id: campaignId,
      subject,
      html,
      text,
      status: "draft",
      notes: payload.previewText
        ? `imported from Systeme #${systemeId} | preview: ${payload.previewText}`
        : `imported from Systeme #${systemeId}`,
    },
    { onConflict: "campaign_id" },
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, campaignId, subject, htmlLength: html.length });
}
