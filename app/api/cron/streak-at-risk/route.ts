import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sesSendingEnabled } from "@/lib/email/sesSender";
import { unsubscribeUrl } from "@/lib/email/unsubscribeLink";
import {
  SITE,
  alreadySent,
  button,
  claimAndSend,
  escapeHtml,
  isArmed,
  shell,
  usableFirstName,
} from "@/lib/email/triggerEmails";

/**
 * "Your 12 day streak ends tonight" - trigger 2 (Louis, 2026-10-25).
 *
 * WHO. Somebody whose streak is worth protecting and whose last active day
 * was YESTERDAY: today is the day that decides it. Active today and there is
 * nothing to warn about; quiet for two days and the streak is already gone,
 * so the email would be about something that has already happened, which is
 * worse than silence.
 *
 * MIN_STREAK exists because a two day streak is not a thing anybody is
 * invested in, and emailing about one teaches people to ignore these.
 *
 * TIMING. Late in the day, Eastern, so there is still an evening left to
 * save it - a warning that arrives after midnight is just bad news.
 *
 * ONCE EVERY RESET, NOT ONCE EVER. Unlike the stalled-study nudge, this is
 * worth repeating: the same person can build and risk a streak many times.
 * The send id carries the date, so one per person per day at most, and the
 * same person can be warned again next month.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const CAMPAIGN_ID = "streak-at-risk";
/** Below this, a streak is not yet something anybody would miss. */
const MIN_STREAK = 3;
const MAX_PER_RUN = 100;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

/** Today and yesterday as the reader's own calendar would read them. */
function easternDates() {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const now = new Date();
  return {
    today: fmt.format(now),
    yesterday: fmt.format(new Date(now.getTime() - 86_400_000)),
  };
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

  const armed = await isArmed(db, CAMPAIGN_ID);
  const { today, yesterday } = easternDates();

  const { data: rows, error } = await db
    .from("profile_stats")
    .select("user_id, current_streak, last_active_date")
    .gte("current_streak", MIN_STREAK)
    .eq("last_active_date", yesterday)
    .limit(2000);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const candidates = rows || [];
  if (candidates.length === 0) {
    return NextResponse.json({ ok: true, armed, atRisk: 0, sent: 0, today });
  }

  const { data: people } = await db
    .from("email_engagement")
    .select("user_id, email, first_name, suppressed")
    .in("user_id", candidates.map((c) => c.user_id));

  const reachable = new Map(
    (people || [])
      .filter((p) => p.email && !p.suppressed)
      .map((p) => [p.user_id as string, p as { email: string; first_name: string | null }]),
  );

  // Dated, so the same person can be warned again the next time a streak of
  // theirs is on the line.
  const sendCampaignId = `${CAMPAIGN_ID}-${today}`;
  const sentToday = await alreadySent(db, sendCampaignId);

  const queue = candidates
    .filter((c) => reachable.has(c.user_id))
    .filter((c) => !sentToday.has(reachable.get(c.user_id)!.email.toLowerCase()))
    .slice(0, MAX_PER_RUN);

  if (dryRun || !armed) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      armed,
      reason: armed ? undefined : `no armed '${CAMPAIGN_ID}' campaign row - reporting only, nothing sent`,
      today,
      atRisk: candidates.length,
      reachable: queue.length,
      sample: queue.slice(0, 5).map((c) => ({
        streak: c.current_streak,
        greeting: usableFirstName(reachable.get(c.user_id)?.first_name, reachable.get(c.user_id)!.email),
      })),
    });
  }

  let sent = 0;
  for (const c of queue) {
    const person = reachable.get(c.user_id)!;
    const name = usableFirstName(person.first_name, person.email);
    const streak = c.current_streak as number;
    const read = `${SITE}/dashboard`;

    const subject = `Your ${streak} day streak ends tonight`;
    const text = [
      `Hey ${name}`,
      "",
      `You are ${streak} days in. Today is the day that decides whether it keeps going.`,
      "",
      "One reading. That is all it takes.",
      "",
      `Keep it alive: ${read}`,
      "",
      "Louis",
      "",
      `Unsubscribe: ${unsubscribeUrl(person.email)}`,
      "",
    ].join("\n");

    const html = shell(
      `<p style="margin:0 0 16px;font-size:17px;">Hey ${escapeHtml(name)}</p>
<p style="margin:0 0 16px;font-size:17px;">You are <strong>${streak} days</strong> in. Today is the day that decides whether it keeps going.</p>
<p style="margin:0 0 24px;font-size:17px;">One reading. That is all it takes.</p>
${button(read, "Keep it alive")}
<p style="margin:0;font-size:17px;">Louis</p>`,
      unsubscribeUrl(person.email),
    );

    if (await claimAndSend(db, sendCampaignId, person, { subject, html, text })) sent += 1;
  }

  return NextResponse.json({ ok: true, armed, today, atRisk: candidates.length, sent });
}
