import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { sendEmail, sesSendingEnabled } from "@/lib/email/sesSender";
import { unsubscribeUrl } from "@/lib/email/unsubscribeLink";
import { COMMUNITY_EVENTS, getCommunityEventState, type CommunityEvent } from "@/lib/communityEvents";
import { eventDayStudyPath } from "@/lib/communityEventDays";

/**
 * "Day 1 is ready" - the one email that makes signing up to a community
 * study mean something (Louis, 2026-10-25).
 *
 * WHY IT EXISTS. 252 people signed up to The Wisdom of Proverbs. 189 of them
 * never opened a single day. Joining a study currently does four things:
 * it adds a row, it changes a button, it opts you into the in-app daily
 * notification, and it counts you on the event page. None of those reach
 * somebody who is not in the app that morning, which is exactly the person
 * who signed up weeks earlier and then forgot. So the gap being closed here
 * is not "members need more email" - it is that the single moment of highest
 * intent, the morning the study they chose actually opens, passed in silence.
 *
 * ONE EMAIL. NOT A WEEKLY HABIT. There is deliberately no day-7 or day-14
 * follow-up: the lapsed reader is already covered by study-nudge, which
 * reaches anyone who stops mid-study. Adding a weekly community email on top
 * would be a second broadcast to the same list, and broadcasts to this list
 * click at 0.7-1.8%.
 *
 * ARMED PER STUDY, NOT GLOBALLY. The campaign id carries the slug
 * (`community-start-beginning-of-everything`), so arming November's study
 * does not silently approve next year's. Each one is a decision.
 *
 * WHO IT SKIPS. Anyone suppressed, anyone without an address, anyone who has
 * already had this study's email, and anyone who has already completed a day
 * of it - day 1 opens at 01:00 UTC, which is the previous evening in the US,
 * so by the time this runs some members have genuinely finished it and
 * "Day 1 is ready" would read as if nobody was watching.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

/** Same ceiling as the welcome email. The cron fires twice an hour apart, so
 * a study with more members than this finishes on the second run. */
const MAX_PER_RUN = 200;
const SITE = "https://www.mybiblebuddy.net";

/**
 * Community day 1 is the point of this email, and day 2 is the safety net: a
 * single failed cron run on the morning itself would otherwise lose the whole
 * send, and there is no second chance at a study's opening day. The copy says
 * "day 1 is ready", which is true on both. The send ledger is what stops
 * anyone getting it twice.
 */
const SENDABLE_DAYS = new Set([1, 2]);

const campaignIdFor = (event: CommunityEvent) => `community-start-${event.slug}`;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const params = new URL(request.url).searchParams;
  const dryRun = params.get("dry") === "1";
  /** Preview a study that is not opening today, to read the copy and the count. */
  const slugOverride = params.get("slug");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }
  const db = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  if (!dryRun && !sesSendingEnabled()) {
    return NextResponse.json({ ok: true, idle: true, reason: "SES is not configured" });
  }

  const now = new Date();
  const opening = COMMUNITY_EVENTS.filter((event) => {
    if (slugOverride) return event.slug === slugOverride;
    const state = getCommunityEventState(event, now);
    return state.phase === "live" && SENDABLE_DAYS.has(state.communityDay);
  });

  if (opening.length === 0) {
    return NextResponse.json({ ok: true, idle: true, reason: "no community study is on day 1 today" });
  }

  const results = [];
  for (const event of opening) {
    results.push(await runEvent(db, event, { dryRun, now, preview: Boolean(slugOverride) }));
  }
  return NextResponse.json({ ok: true, results });
}

async function runEvent(
  db: SupabaseClient,
  event: CommunityEvent,
  options: { dryRun: boolean; now: Date; preview: boolean },
) {
  const campaignId = campaignIdFor(event);

  /**
   * NOTHING SENDS UNTIL LOUIS ARMS IT.
   *
   * An email_campaigns row named for this study, saying 'sending'. No row, or
   * a paused one, and the route still reports exactly who it WOULD reach -
   * which is the useful half while deciding - and sends nothing. Without this
   * gate, deploying the route would be the same as approving the send.
   */
  const { data: campaign } = await db
    .from("email_campaigns")
    .select("campaign_id, status")
    .eq("campaign_id", campaignId)
    .maybeSingle();
  const armed = (campaign as { status?: string } | null)?.status === "sending";

  // Everybody who signed up. reminders is deliberately ignored: that flag is
  // about the in-app daily notification for all 21 days, not about whether
  // somebody wants to be told the study they joined has started.
  const { data: members, error: membersError } = await db
    .from("community_event_members")
    .select("user_id")
    .eq("event_slug", event.slug);
  if (membersError) {
    return { slug: event.slug, ok: false, error: `community_event_members: ${membersError.message}` };
  }
  const memberIds = [...new Set((members || []).map((row) => String(row.user_id)))];
  if (memberIds.length === 0) {
    return { slug: event.slug, ok: true, armed, members: 0, sent: 0 };
  }

  // Address and suppression in one place.
  const { data: people } = await db
    .from("email_engagement")
    .select("user_id, email, first_name, suppressed")
    .in("user_id", memberIds);
  const reachable = new Map<string, { email: string; first_name: string | null }>();
  for (const row of (people || []) as {
    user_id: string;
    email: string | null;
    first_name: string | null;
    suppressed: boolean | null;
  }[]) {
    if (row.email && !row.suppressed) reachable.set(row.user_id, { email: row.email, first_name: row.first_name });
  }

  // Already started it, so telling them it is ready would be absurd.
  const { data: started } = await db
    .from("devotional_progress")
    .select("user_id")
    .eq("devotional_id", event.devotionalId)
    .eq("is_completed", true)
    .in("user_id", memberIds);
  const alreadyStarted = new Set(((started || []) as { user_id: string }[]).map((row) => row.user_id));

  // Already had this study's email.
  const { data: already } = await db
    .from("email_campaign_sends")
    .select("email")
    .eq("campaign_id", campaignId);
  const sentAlready = new Set(((already || []) as { email: string }[]).map((row) => String(row.email).toLowerCase()));

  const queue = memberIds
    .filter((userId) => reachable.has(userId))
    .filter((userId) => !alreadyStarted.has(userId))
    .filter((userId) => !sentAlready.has(reachable.get(userId)!.email.toLowerCase()))
    .slice(0, MAX_PER_RUN);

  if (options.dryRun || !armed || options.preview) {
    return {
      slug: event.slug,
      ok: true,
      dryRun: true,
      armed,
      reason: armed
        ? options.preview
          ? "?slug= preview: reporting only"
          : undefined
        : `no armed '${campaignId}' campaign row - reporting only, nothing sent`,
      members: memberIds.length,
      reachable: reachable.size,
      alreadyStarted: alreadyStarted.size,
      alreadySent: sentAlready.size,
      queued: queue.length,
      subject: subjectFor(event),
      sample: queue.slice(0, 5).map((userId) => ({
        greeting: usableFirstName(reachable.get(userId)!.first_name, reachable.get(userId)!.email),
      })),
    };
  }

  let sent = 0;
  let failed = 0;
  const link = `${SITE}${eventDayStudyPath(event.devotionalId, 1)}`;

  for (const userId of queue) {
    const person = reachable.get(userId)!;
    const name = usableFirstName(person.first_name, person.email);
    const unsubscribe = unsubscribeUrl(person.email);

    // Claim first: the row is the lock. A duplicate key here means another
    // run already has this person.
    const { error: claimError } = await db
      .from("email_campaign_sends")
      .insert({ campaign_id: campaignId, email: person.email, status: "pending" });
    if (claimError) continue;

    const { subject, text, html } = buildEmail({ event, name, link, unsubscribe });
    const result = await sendEmail({
      to: person.email,
      subject,
      html,
      text,
      unsubscribeUrl: unsubscribe,
      tags: { campaign: campaignId },
    });

    await db
      .from("email_campaign_sends")
      .update({
        status: result.sent ? "sent" : "failed",
        detail: result.sent ? null : `${result.reason}${result.detail ? `: ${result.detail}` : ""}`,
        sent_at: result.sent ? new Date().toISOString() : null,
      })
      .eq("campaign_id", campaignId)
      .eq("email", person.email);

    if (result.sent) sent += 1;
    else failed += 1;
  }

  return {
    slug: event.slug,
    ok: true,
    armed: true,
    members: memberIds.length,
    reachable: reachable.size,
    alreadyStarted: alreadyStarted.size,
    queued: queue.length,
    sent,
    failed,
  };
}

const subjectFor = (event: CommunityEvent) => `Day 1 of ${event.title} is ready`;

function buildEmail(options: { event: CommunityEvent; name: string; link: string; unsubscribe: string }) {
  const { event, name, link, unsubscribe } = options;
  const subject = subjectFor(event);

  const text = [
    `Hey ${name}`,
    "",
    `You signed up for ${event.title}, and it starts today.`,
    "",
    "Day 1 is open now. It takes a few minutes: read or listen, read the passage, then answer the day's question and see what everyone else said.",
    "",
    `A new day opens every morning for the next ${event.totalDays - 1} days, and nothing expires. If you miss one, it waits for you.`,
    "",
    `Start day 1: ${link}`,
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
<p style="margin:0 0 16px;font-size:17px;">You signed up for <strong>${escapeHtml(event.title)}</strong>, and it starts today.</p>
<p style="margin:0 0 16px;font-size:17px;">Day 1 is open now. It takes a few minutes: read or listen, read the passage, then answer the day's question and see what everyone else said.</p>
<p style="margin:0 0 24px;font-size:17px;">A new day opens every morning for the next ${event.totalDays - 1} days, and nothing expires. If you miss one, it waits for you.</p>
<p style="margin:0 0 28px;"><a href="${escapeHtml(link)}" style="display:inline-block;background:#2f7fe8;color:#ffffff;text-decoration:none;padding:14px 26px;font-size:16px;font-weight:bold;border-radius:8px;">Start day 1 &rarr;</a></p>
<p style="margin:0;font-size:17px;">Louis</p>
<p style="margin:24px 0 0;font-size:12px;color:#94a3b8;"><a href="${escapeHtml(unsubscribe)}" style="color:#94a3b8;">Unsubscribe</a></p>
</td></tr></table></td></tr></table></body></html>`;

  return { subject, text, html };
}

/**
 * A name worth saying out loud, or nothing. Same rule as study-nudge:
 * first_name is often just the address with the @ cut off, and
 * "Hey wendy.prudhomme1989" is worse than no name at all.
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
