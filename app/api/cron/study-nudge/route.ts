import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail, sesSendingEnabled } from "@/lib/email/sesSender";
import { unsubscribeUrl } from "@/lib/email/unsubscribeLink";

/**
 * "You stopped on day 8" - the first behaviour-triggered email (Louis,
 * 2026-10-25).
 *
 * WHY THIS AND NOT ANOTHER BROADCAST. The welcome email clicks at 9.1%;
 * broadcasts to the same list click at 0.7-1.8%. The difference is not the
 * copy, it is that the welcome arrives when somebody has just done
 * something. This aims at the same thing: it reaches a reader a few days
 * after they stopped mid-study, naming the study and the day they are on.
 *
 * WHO IT REACHES. Someone whose most recent completed devotional day is
 * between MIN_QUIET_DAYS and MAX_QUIET_DAYS old. Four days is long enough
 * that they have genuinely lapsed rather than simply not opened the app
 * today; fourteen is where a nudge stops being a nudge and starts being a
 * stranger bringing up something you have moved on from.
 *
 * ONCE PER PERSON, EVER. email_campaign_sends is keyed (campaign_id, email)
 * and the row is written BEFORE the send, so it is the lock as well as the
 * record - two overlapping runs cannot both send, and a crash mid-send
 * cannot produce a second attempt. Deliberately conservative for a first
 * version: somebody who stalls on three studies gets one email, not three.
 *
 * TRANSACTIONAL OR NOT. This is marketing - it is promoting a study - so it
 * carries an unsubscribe link and goes through the same suppression check
 * as everything else. sendEmail refuses marketing mail without one.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const CAMPAIGN_ID = "study-nudge";
const MIN_QUIET_DAYS = 4;
const MAX_QUIET_DAYS = 14;
/** Small on purpose: this is a trickle, not a broadcast. */
const MAX_PER_RUN = 50;
const SITE = "https://www.mybiblebuddy.net";

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const dryRun = new URL(request.url).searchParams.get("dry") === "1";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }
  const db = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  if (!dryRun && !sesSendingEnabled()) {
    return NextResponse.json({ ok: true, idle: true, reason: "SES is not configured" });
  }

  const now = Date.now();
  const windowStart = new Date(now - MAX_QUIET_DAYS * 86_400_000).toISOString();
  const windowEnd = new Date(now - MIN_QUIET_DAYS * 86_400_000).toISOString();

  // Everything finished inside the window, newest first, so the first row we
  // see for a person is their most recent day.
  const { data: progress, error: progressError } = await db
    .from("devotional_progress")
    .select("user_id, devotional_id, day_number, completed_at")
    .eq("is_completed", true)
    .gte("completed_at", windowStart)
    .order("completed_at", { ascending: false })
    .limit(5000);

  if (progressError) {
    return NextResponse.json({ ok: false, error: progressError.message }, { status: 500 });
  }

  /**
   * Their latest day, and whether it is old enough to count as stalled.
   *
   * Anyone with activity NEWER than windowEnd is still going and must not be
   * nudged, so the newest row per person decides - not the newest row inside
   * some narrower slice.
   */
  const latest = new Map<string, { devotionalId: string; day: number; at: string }>();
  for (const row of progress || []) {
    if (latest.has(row.user_id)) continue;
    latest.set(row.user_id, { devotionalId: row.devotional_id, day: row.day_number, at: row.completed_at });
  }
  const stalled = [...latest.entries()].filter(([, v]) => v.at <= windowEnd);

  if (stalled.length === 0) {
    return NextResponse.json({ ok: true, considered: latest.size, stalled: 0, sent: 0 });
  }

  // Their address, and whether they are still reachable. email_engagement is
  // the one place that joins a user to an address and carries suppression.
  const userIds = stalled.map(([id]) => id);
  const { data: people } = await db
    .from("email_engagement")
    .select("user_id, email, first_name, suppressed")
    .in("user_id", userIds);

  const reachable = new Map(
    (people || [])
      .filter((p) => p.email && !p.suppressed)
      .map((p) => [p.user_id as string, p as { email: string; first_name: string | null }]),
  );

  // Studies, for the title in the subject line.
  const { data: devotionals } = await db
    .from("devotionals")
    .select("id, title, total_days");
  const studyById = new Map((devotionals || []).map((d) => [d.id, d]));

  // Who already has one.
  const { data: already } = await db
    .from("email_campaign_sends")
    .select("email")
    .eq("campaign_id", CAMPAIGN_ID);
  const sentAlready = new Set((already || []).map((r) => String(r.email).toLowerCase()));

  const queue = stalled
    .filter(([userId]) => reachable.has(userId))
    .filter(([userId]) => !sentAlready.has(reachable.get(userId)!.email.toLowerCase()))
    .slice(0, MAX_PER_RUN);

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      considered: latest.size,
      stalled: stalled.length,
      reachable: queue.length,
      sample: queue.slice(0, 5).map(([userId, v]) => ({
        day: v.day,
        study: studyById.get(v.devotionalId)?.title ?? "(unknown study)",
        quietDays: Math.round((now - new Date(v.at).getTime()) / 86_400_000),
        greeting: usableFirstName(reachable.get(userId)?.first_name, reachable.get(userId)!.email),
      })),
    });
  }

  let sent = 0;
  let failed = 0;

  for (const [userId, v] of queue) {
    const person = reachable.get(userId)!;
    const study = studyById.get(v.devotionalId);
    const title = study?.title ?? "your study";
    const nextDay = v.day + 1;
    const resume = `${SITE}/devotionals/${v.devotionalId}/day/${nextDay}`;
    const name = usableFirstName(person.first_name, person.email);
    // Signed, via the route that owns the format - an unsigned link is
    // rejected, which would leave a reader with no way out.
    const unsubscribe = unsubscribeUrl(person.email);

    // Claim first: the row is the lock. A duplicate key here means another
    // run already has this person.
    const { error: claimError } = await db
      .from("email_campaign_sends")
      .insert({ campaign_id: CAMPAIGN_ID, email: person.email, status: "pending" });
    if (claimError) continue;

    const subject = `You're on day ${v.day} of ${title}`;
    const text = [
      `Hey ${name}`,
      "",
      `You finished day ${v.day} of ${title}.`,
      "",
      "Day " + nextDay + " is still there. It has not gone anywhere.",
      "",
      "A few minutes is all it takes.",
      "",
      `Pick it back up: ${resume}`,
      "",
      "Louis",
      "",
      `Unsubscribe: ${unsubscribe}`,
      "",
    ].join("\n");

    const html = `<!doctype html><html><body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#263244;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;" cellspacing="0" cellpadding="0"><tr><td style="padding:32px;">
<p style="margin:0 0 16px;font-size:17px;">Hey ${escapeHtml(name)}</p>
<p style="margin:0 0 16px;font-size:17px;">You finished <strong>day ${v.day}</strong> of ${escapeHtml(title)}.</p>
<p style="margin:0 0 16px;font-size:17px;">Day ${nextDay} is still there. It has not gone anywhere.</p>
<p style="margin:0 0 24px;font-size:17px;">A few minutes is all it takes.</p>
<p style="margin:0 0 28px;"><a href="${escapeHtml(resume)}" style="display:inline-block;background:#2f7fe8;color:#ffffff;text-decoration:none;padding:14px 26px;font-size:16px;font-weight:bold;border-radius:8px;">Pick it back up &rarr;</a></p>
<p style="margin:0;font-size:17px;">Louis</p>
<p style="margin:24px 0 0;font-size:12px;color:#94a3b8;"><a href="${escapeHtml(unsubscribe)}" style="color:#94a3b8;">Unsubscribe</a></p>
</td></tr></table></td></tr></table></body></html>`;

    const result = await sendEmail({
      to: person.email,
      subject,
      html,
      text,
      unsubscribeUrl: unsubscribe,
      tags: { campaign: CAMPAIGN_ID },
    });

    await db
      .from("email_campaign_sends")
      .update({
        status: result.sent ? "sent" : "failed",
        detail: result.sent ? null : `${result.reason}${result.detail ? `: ${result.detail}` : ""}`,
        sent_at: result.sent ? new Date().toISOString() : null,
      })
      .eq("campaign_id", CAMPAIGN_ID)
      .eq("email", person.email);

    if (result.sent) sent += 1;
    else failed += 1;
  }

  return NextResponse.json({ ok: true, considered: latest.size, stalled: stalled.length, sent, failed });
}

/**
 * A name worth saying out loud, or nothing.
 *
 * first_name is often just the address with the @ cut off - the dry run
 * turned up "wendy.prudhomme1989" - and "Hey wendy.prudhomme1989" is worse
 * than not using a name at all. Anything carrying a digit, a dot, or the
 * email's own local part is treated as not-a-name.
 */
function usableFirstName(raw: string | null | undefined, email: string): string {
  const name = (raw || "").trim();
  if (!name) return "friend";
  if (/[0-9._@]/.test(name)) return "friend";
  if (name.toLowerCase() === email.split("@")[0]?.toLowerCase()) return "friend";
  if (name.length > 24) return "friend";
  return name;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
