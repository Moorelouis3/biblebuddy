import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Daily Verse of the Day queue watchdog (Vercel cron, once a day).
 *
 * Counts how many consecutive APPROVED days remain after today (Berlin
 * time). When the run length crosses a configured threshold (default
 * 10 / 5 / 2 / 1) it drops an alert into Louis's existing notifications
 * bell. If TOMORROW has no approved entry it raises a critical alert every
 * run until fixed - the homepage would fall back to the legacy pool, and
 * nothing unreviewed ever auto-publishes.
 *
 * Alerts go only to the admin account; regular users never see them.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

function berlinDayKey(offsetDays = 0) {
  const now = new Date(Date.now() + offsetDays * 86_400_000);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  // Find Louis's user id by email.
  let adminUserId: string | null = null;
  for (let page = 1; page <= 20 && !adminUserId; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error || !data.users.length) break;
    adminUserId = data.users.find((user) => (user.email || "").toLowerCase() === ADMIN_EMAIL)?.id || null;
    if (data.users.length < 1000) break;
  }
  if (!adminUserId) return NextResponse.json({ error: "Admin user not found." }, { status: 500 });

  const today = berlinDayKey();
  const { data: rows } = await admin
    .from("verse_of_the_day_entries")
    .select("scheduled_date, status")
    .gt("scheduled_date", today);
  const approved = new Set(
    (rows || []).filter((row) => row.status === "approved").map((row) => row.scheduled_date as string),
  );

  let remaining = 0;
  for (let i = 1; i <= 366; i++) {
    if (!approved.has(berlinDayKey(i))) break;
    remaining += 1;
  }
  const tomorrowCovered = approved.has(berlinDayKey(1));

  const { data: settings } = await admin
    .from("verse_of_the_day_settings")
    .select("low_queue_thresholds")
    .eq("id", 1)
    .maybeSingle();
  const thresholds: number[] = settings?.low_queue_thresholds || [10, 5, 2, 1];

  const alerts: string[] = [];
  if (!tomorrowCovered) {
    alerts.push(
      `CRITICAL: No approved Verse of the Day for tomorrow (${berlinDayKey(1)}). The homepage will fall back to the legacy verse pool. Approve an entry in /admin/verse-of-the-day.`,
    );
  } else if (thresholds.includes(remaining)) {
    alerts.push(`Verse of the Day is running low. Only ${remaining} approved day${remaining === 1 ? "" : "s"} remain.`);
  }

  let inserted = 0;
  for (const message of alerts) {
    // One alert per message per day - the cron may run more than once.
    const { data: existing } = await admin
      .from("notifications")
      .select("id")
      .eq("user_id", adminUserId)
      .eq("type", "votd_queue_alert")
      .eq("message", message)
      .gte("created_at", `${today}T00:00:00Z`)
      .limit(1);
    if (existing?.length) continue;
    const { error } = await admin.from("notifications").insert({
      user_id: adminUserId,
      type: "votd_queue_alert",
      from_user_name: "Verse of the Day",
      message,
      is_read: false,
    });
    if (!error) inserted += 1;
  }

  return NextResponse.json({ ok: true, today, remaining, tomorrowCovered, alertsSent: inserted });
}
