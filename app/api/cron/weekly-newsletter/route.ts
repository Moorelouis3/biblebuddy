import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { selectWeeklyArticles, renderWeeklyNewsletter, pruneUnpublished } from "@/lib/email/weeklyNewsletter";
import { fetchFeaturedDevotional } from "@/lib/email/featuredDevotional";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Builds and arms the weekly newsletter (Louis, 2026-10-23).
 *
 * The 13 October issue was assembled by hand, sent once, and then nothing went
 * out for two Tuesdays because there was nobody to assemble the next one. This
 * is that missing step: every Tuesday it reads the week's own blog output,
 * writes the email, and arms it.
 *
 * IT DOES NOT SEND. It creates a row in email_campaigns the same way a human
 * would, and /api/cron/email-campaign-send - which already handles batching,
 * resuming, suppression and never sending twice - does the posting. One sender,
 * not two. See the comment in that route about rows having owners.
 *
 * WHY IT IS SAFE TO RUN EVERY TUESDAY:
 *
 *   Idempotent.  The campaign id is newsletter-<YYYY-MM-DD>. Running twice on
 *                the same day is a no-op, so a retry, an overlapping cron or a
 *                manual curl cannot produce two newsletters.
 *   Refuses to   A week with nothing published gets no email at all rather
 *   send empty.  than an email with an empty middle.
 *   Previewable. ?dry=1 renders and returns everything, writes nothing. Use it
 *                before a Tuesday to see exactly what would go out.
 *
 * SCHEDULE. Vercel runs it Tuesdays at 08:00 UTC. scheduled_for is set to the
 * moment of creation so the batch sender treats it as due now and, because it
 * orders by scheduled_for before created_at, it goes ahead of any campaign
 * sitting on a null schedule.
 *
 * TO STOP IT: pause the row (status 'paused'), or remove the cron entry from
 * vercel.json. Pausing the row stops this week; removing the cron stops the
 * habit.
 */

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  // Same rule as the other crons here: no secret configured means Vercel's own
  // caller, which sets no header, can still run it.
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dryRun = request.nextUrl.searchParams.get("dry") === "1";

  // Lets a preview ask "what would last Tuesday's have looked like".
  const asOf = request.nextUrl.searchParams.get("asof");
  if (asOf && !dryRun) {
    return NextResponse.json({ error: "asof is only allowed with dry=1" }, { status: 400 });
  }
  if (asOf && !/^\d{4}-\d{2}-\d{2}$/.test(asOf)) {
    return NextResponse.json({ error: "asof must be YYYY-MM-DD" }, { status: 400 });
  }
  const now = asOf ? new Date(`${asOf}T12:00:00.000Z`) : new Date();

  const raw = selectWeeklyArticles({ now });

  // Never link to a page that is not live yet: BLOG_ARTICLES lists what
  // exists, not what has been deployed. See pruneUnpublished.
  const { selection, dropped } = await pruneUnpublished(raw);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }
  const db = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // The devotional we are pushing. It leads the email.
  const devotional = await fetchFeaturedDevotional(db, now);

  // Nothing to say at all. An empty newsletter is worse than no newsletter.
  if (!selection.features.length && !devotional) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: `no devotional available and nothing written between ${selection.since} and ${selection.weekOf}`,
    });
  }

  const rendered = renderWeeklyNewsletter(selection, devotional);
  const campaignId = `newsletter-${selection.weekOf}`;

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      campaignId,
      subject: rendered.subject,
      preview: rendered.preview,
      droppedBecauseNotLiveYet: dropped,
      selection: {
        since: selection.since,
        weekOf: selection.weekOf,
        totalInWindow: selection.totalInWindow,
        features: selection.features.map((a) => ({ title: a.title, category: a.category, path: a.canonicalPath })),
        devotional: devotional ? { title: devotional.title, days: devotional.totalDays, id: devotional.id } : null,
      },
      html: rendered.html,
      text: rendered.text,
    });
  }

  // Already built this week. Not an error - this is what makes a retry safe.
  const { data: existing, error: existingError } = await db
    .from("email_campaigns")
    .select("campaign_id, status, created_at")
    .eq("campaign_id", campaignId)
    .maybeSingle();
  if (existingError && !/does not exist|schema cache/i.test(existingError.message)) {
    return NextResponse.json({ ok: false, error: existingError.message }, { status: 500 });
  }
  if (existing) {
    return NextResponse.json({
      ok: true,
      alreadyBuilt: true,
      campaignId,
      status: existing.status,
      createdAt: existing.created_at,
    });
  }

  const nowIso = new Date().toISOString();
  const { error } = await db.from("email_campaigns").insert({
    campaign_id: campaignId,
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
    kind: "marketing",
    status: "sending",
    scheduled_for: nowIso,
    // Warm-up settings proven by the 13 October send.
    rate_per_second: 5,
    max_per_run: 900,
    notes: `Built automatically from ${selection.totalInWindow} articles published ${selection.since}..${selection.weekOf}.`,
  });
  if (error) {
    return NextResponse.json({ ok: false, campaignId, error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    created: true,
    campaignId,
    subject: rendered.subject,
    features: selection.features.length,
    droppedBecauseNotLiveYet: dropped,
    devotional: devotional?.title ?? null,
    note: "Armed. /api/cron/email-campaign-send posts it in batches from here.",
  });
}
