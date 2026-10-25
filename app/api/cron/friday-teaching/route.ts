import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail, sesSendingEnabled } from "@/lib/email/sesSender";
import { unsubscribeUrl } from "@/lib/email/unsubscribeLink";
import {
  SERIES_START,
  easternNow,
  firstFridayFor,
  orderedLessons,
} from "@/lib/email/fridayTeachingSeries";
import { themedFridayOn } from "@/lib/email/fridayThemedEmails";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

/**
 * The Friday teaching series (Louis, 2026-10-12).
 *
 * Twelve lessons, one every Friday at 8am Eastern, each subscriber moving
 * through them in order from wherever they are. Louis's handoff document is
 * the spec; docs/FRIDAY_TEACHING_SERIES.md is the readable version of it.
 *
 * WHO IS ENROLLED IS DERIVED, NOT STORED. A subscriber's first Friday is
 * simply the first Friday after they signed up, never earlier than the series
 * start. That one line replaces an enrollment table, a backfill and a hook in
 * the signup path, and it cannot drift out of sync with the subscriber list:
 *
 *   - someone who joined before launch starts on 16 Oct with everyone else;
 *   - someone who joins on a Thursday starts the very next day;
 *   - someone who joins on a FRIDAY skips that day's email and waits a week,
 *     which is what the handoff asks for;
 *   - everyone starts at lesson 1 and moves through the same order.
 *
 * WHERE SOMEONE IS UP TO IS ALSO DERIVED: their next lesson is the first one
 * email_campaign_sends has no row for. So a person who misses a week through a
 * failure or a pause simply receives that lesson next Friday rather than
 * losing it - and because the record is keyed to the lesson's stable id rather
 * than its position, editing or reordering the series can never resend
 * something somebody already has.
 *
 * NOTHING SENDS UNTIL LOUIS ARMS IT. Each lesson is installed as a 'paused'
 * campaign row; this only sends lessons whose row says 'sending'.
 */

/** Eastern hours during which a Friday run may send. First batch at 8am. */
const WINDOW_START_HOUR = 8;
const WINDOW_END_HOUR = 12;

/** Most sends in one invocation, so a run finishes inside maxDuration. */
const MAX_PER_RUN = 900;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  // Matches the other crons here: no secret configured means open, because
  // Vercel's own cron caller sets no header.
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const params = request.nextUrl.searchParams;

  // `dry=1` reports exactly what a live run would do and sends nothing. It is
  // how the schedule gets checked on a Tuesday.
  const dryRun = params.get("dry") === "1";

  // `asof=YYYY-MM-DD` answers "what goes out on that Friday?" without waiting
  // for it. Dry runs only - it decides who is due, so honouring it on a live
  // run would be a way to mail the whole list early.
  const asof = params.get("asof");
  if (asof && !dryRun) {
    return NextResponse.json({ error: "asof is only allowed with dry=1" }, { status: 400 });
  }
  if (asof && !/^\d{4}-\d{2}-\d{2}$/.test(asof)) {
    return NextResponse.json({ error: "asof must be YYYY-MM-DD" }, { status: 400 });
  }
  const now = asof
    ? easternNow(new Date(`${asof}T12:00:00Z`))
    : easternNow();
  // `force=1` ignores the day-and-hour gate. Forcing a DRY run is harmless and
  // is how the schedule gets checked midweek, but forcing a live send outside
  // the window must not be possible on a deployment with no secret set, where
  // the route itself is open to anyone.
  const force = params.get("force") === "1";
  if (force && !dryRun && !process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: "forcing a live send requires CRON_SECRET; add dry=1 to simulate" },
      { status: 403 },
    );
  }

  /**
   * THE DRIP STANDS DOWN ON A THEMED FRIDAY (Louis, 2026-10-25).
   *
   * Four Fridays carry a dated email of their own - Thanksgiving, the last
   * Friday before Christmas, Christmas Day, New Year's Day - posted by
   * /api/cron/email-campaign-send from its own scheduled campaign row.
   * Without this, everybody would get two emails on Christmas morning:
   * their next lesson and the Christmas one.
   *
   * Nobody loses a lesson by standing down. Somebody's position is the
   * first lesson they have no send row for, not a count of Fridays, so a
   * skipped week simply arrives the Friday after.
   *
   * Checked before the send window so that `?dry=1&asof=2026-12-25` says so
   * plainly rather than reporting the wrong hour.
   */
  const themed = themedFridayOn(now.date);
  if (themed) {
    return NextResponse.json({
      ok: true,
      idle: true,
      reason: "a themed Friday email goes out today instead of the series",
      themed: { id: themed.id, subject: themed.subject, sendAtUtc: themed.sendAtUtc },
      sentBy: "/api/cron/email-campaign-send",
      eastern: now,
    });
  }

  const inWindow =
    now.weekday === "Fri" && now.hour >= WINDOW_START_HOUR && now.hour < WINDOW_END_HOUR;
  if (!inWindow && !force) {
    return NextResponse.json({
      ok: true,
      idle: true,
      reason: `not the Friday send window (Eastern: ${now.weekday} ${now.hour}:00)`,
      eastern: now,
    });
  }

  if (!dryRun && !sesSendingEnabled()) {
    return NextResponse.json({ ok: true, idle: true, reason: "SES is not configured" });
  }

  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const lessons = orderedLessons();
  const lessonIds = lessons.map((l) => l.id);

  // The installed campaign rows carry the body that actually goes out, so a
  // fix made in /admin/campaigns is what sends. A lesson missing from this
  // table has not been installed yet.
  const { data: campaignRows, error: campaignError } = await db
    .from("email_campaigns")
    .select("campaign_id, subject, html, text, status, rate_per_second")
    .in("campaign_id", lessonIds);
  if (campaignError) {
    return NextResponse.json({ ok: false, error: campaignError.message }, { status: 500 });
  }
  const campaigns = new Map((campaignRows ?? []).map((c) => [c.campaign_id, c]));

  const missing = lessonIds.filter((id) => !campaigns.has(id));
  if (missing.length) {
    return NextResponse.json({
      ok: false,
      error: "the series is not installed",
      missing,
      hint: "run scripts/install-friday-series.ts",
    }, { status: 409 });
  }

  const armed = lessonIds.filter((id) => campaigns.get(id)?.status === "sending");
  // A dry run deliberately carries on past this: the whole point of it, before
  // launch, is to show what WOULD go out once the series is armed.
  if (!armed.length && !dryRun) {
    return NextResponse.json({
      ok: true,
      idle: true,
      reason: "no lesson is armed - every campaign row is still paused",
      eastern: now,
    });
  }
  const sendable = (lessonId: string) =>
    dryRun || campaigns.get(lessonId)?.status === "sending";

  // ---- who is due, and for which lesson --------------------------------

  const today = now.date;

  const subscribers: Array<{ email: string; first_name: string | null; subscribed_at: string }> = [];
  for (let page = 0; page < 60; page += 1) {
    const { data, error } = await db
      .from("email_subscribers")
      .select("email, first_name, subscribed_at")
      .order("email", { ascending: true })
      .range(page * 1000, page * 1000 + 999);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    if (!data?.length) break;
    subscribers.push(...data);
    if (data.length < 1000) break;
  }

  // Everything already sent, claimed or skipped for this series. 'pending'
  // and 'failed' both count as taken: a pending row is another run holding
  // the slot, and retrying a hard failure every Friday forever would be worse
  // than the one lesson it loses.
  const taken = new Map<string, Set<string>>();
  for (let page = 0; page < 200; page += 1) {
    const { data, error } = await db
      .from("email_campaign_sends")
      .select("campaign_id, email")
      .in("campaign_id", lessonIds)
      .range(page * 1000, page * 1000 + 999);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    if (!data?.length) break;
    for (const row of data) {
      const set = taken.get(row.email) ?? new Set<string>();
      set.add(row.campaign_id);
      taken.set(row.email, set);
    }
    if (data.length < 1000) break;
  }

  // Pre-filtered rather than left to sendEmail, which checks again anyway:
  // this avoids claiming a send row for somebody who already said no.
  const suppressed = new Set<string>();
  for (let page = 0; page < 60; page += 1) {
    const { data, error } = await db
      .from("email_suppressions")
      .select("email")
      .range(page * 1000, page * 1000 + 999);
    if (error) break; // not fatal: sendEmail is still the real guard
    if (!data?.length) break;
    for (const row of data) suppressed.add(String(row.email).toLowerCase());
    if (data.length < 1000) break;
  }

  type Due = { email: string; firstName: string | null; lessonId: string };
  const due: Due[] = [];
  const stalled = new Map<string, number>(); // lesson -> people waiting on a paused lesson
  let notStartedYet = 0;
  let finished = 0;

  for (const subscriber of subscribers) {
    if (suppressed.has(subscriber.email.toLowerCase())) continue;

    const signupDate = String(subscriber.subscribed_at).slice(0, 10);
    const firstFriday = (() => {
      const own = firstFridayFor(signupDate);
      return own > SERIES_START ? own : SERIES_START;
    })();
    if (firstFriday > today) {
      notStartedYet += 1;
      continue;
    }

    const already = taken.get(subscriber.email);
    const next = lessons.find((l) => !already?.has(l.id));
    if (!next) {
      finished += 1;
      continue;
    }
    if (!sendable(next.id)) {
      stalled.set(next.id, (stalled.get(next.id) ?? 0) + 1);
      continue;
    }
    due.push({ email: subscriber.email, firstName: subscriber.first_name, lessonId: next.id });
  }

  const perLesson: Record<string, number> = {};
  for (const d of due) perLesson[d.lessonId] = (perLesson[d.lessonId] ?? 0) + 1;

  if (dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      eastern: now,
      wouldSend: due.length,
      cappedAt: MAX_PER_RUN,
      perLesson,
      armed,
      stalledOnPausedLesson: Object.fromEntries(stalled),
      notStartedYet,
      finishedAllTwelve: finished,
      subscribers: subscribers.length,
      suppressed: suppressed.size,
    });
  }

  // ---- send -------------------------------------------------------------

  const batch = due.slice(0, MAX_PER_RUN);
  const rate = Math.max(0.2, Number(campaigns.get(batch[0]?.lessonId)?.rate_per_second) || 5);
  const gapMs = Math.ceil(1000 / rate);

  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const person of batch) {
    const campaign = campaigns.get(person.lessonId)!;

    // Claim before sending. email_campaign_sends is keyed (campaign_id,
    // email), so this insert is the lock as well as the record: two overlapping
    // runs cannot both take the same person, and a crash straight afterwards
    // costs one lesson rather than sending it twice.
    const { error: claimError } = await db
      .from("email_campaign_sends")
      .insert({ campaign_id: person.lessonId, email: person.email, status: "pending" });
    if (claimError) {
      skipped += 1;
      continue;
    }

    const name = (person.firstName || "friend").trim() || "friend";
    const fill = (value: string) => value.replace(/\{\{\s*first_name\s*\}\}/g, name);

    let status: "sent" | "failed" | "skipped" = "failed";
    let detail: string | null = null;
    try {
      const result = await sendEmail({
        to: person.email,
        subject: fill(campaign.subject),
        html: fill(campaign.html),
        text: fill(campaign.text),
        unsubscribeUrl: unsubscribeUrl(person.email),
        tags: { campaign: person.lessonId },
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
      .eq("campaign_id", person.lessonId)
      .eq("email", person.email);

    await new Promise((resolve) => setTimeout(resolve, gapMs));
  }

  for (const id of new Set(batch.map((b) => b.lessonId))) {
    await db
      .from("email_campaigns")
      .update({ last_run_at: new Date().toISOString(), last_result: { sent, failed, skipped } })
      .eq("campaign_id", id);
  }

  return NextResponse.json({
    ok: true,
    eastern: now,
    sent,
    failed,
    skipped,
    remaining: Math.max(0, due.length - batch.length),
    perLesson,
  });
}
