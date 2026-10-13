import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "@/lib/bibleInOneYearPlan";

// Daily reading reminder (2026-09-06): the one personal, daily nudge the
// weekly content calendar was missing. For every recently-active reader it
// writes one notifications row - "Day N is ready" or, when a streak is on
// the line, the streak-at-risk version. The existing pipeline does the
// rest: the DB trigger enqueues a push job and /api/push/process delivers
// it to subscribed devices; everyone else sees it on the bell.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const ACTIVE_WINDOW_DAYS = 14;
const NOTIFICATION_TYPE = "daily_reading_reminder";
const MAX_USERS_PER_RUN = 2000;
const PAGE_SIZE = 1000;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  try {
    const now = new Date();
    const todayStartIso = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
    const activeSinceIso = new Date(now.getTime() - ACTIVE_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();

    // Recently active readers.
    const profiles: Array<{ user_id: string; current_streak: number | null }> = [];
    for (let from = 0; from < MAX_USERS_PER_RUN; from += PAGE_SIZE) {
      const { data, error } = await supabase
        .from("profile_stats")
        .select("user_id, current_streak")
        .gte("last_active_at", activeSinceIso)
        .range(from, from + PAGE_SIZE - 1);
      if (error) throw new Error(error.message);
      profiles.push(...((data as typeof profiles) || []));
      if (!data || data.length < PAGE_SIZE) break;
    }

    const userIds = profiles.map((profile) => profile.user_id);
    if (userIds.length === 0) {
      return NextResponse.json({ sent: 0, reason: "no active users" });
    }

    // Already reminded today?
    const remindedToday = new Set<string>();
    {
      const { data, error } = await supabase
        .from("notifications")
        .select("user_id")
        .eq("type", NOTIFICATION_TYPE)
        .gte("created_at", todayStartIso)
        .limit(10000);
      if (error) throw new Error(error.message);
      (data || []).forEach((row: { user_id: string }) => remindedToday.add(row.user_id));
    }

    // Bible in One Year progress for everyone active: which days are read,
    // and did they already read something today (then no nagging).
    const completedByUser = new Map<string, Set<number>>();
    const readTodayUsers = new Set<string>();
    for (const idChunk of chunk(userIds, 200)) {
      for (let from = 0; ; from += PAGE_SIZE) {
        const { data, error } = await supabase
          .from("bible_year_day_progress")
          .select("user_id, day_number, reading_completed, updated_at")
          .in("user_id", idChunk)
          .eq("reading_completed", true)
          .range(from, from + PAGE_SIZE - 1);
        if (error) throw new Error(error.message);
        const rows = (data as Array<{ user_id: string; day_number: number; updated_at: string | null }> | null) || [];
        rows.forEach((row) => {
          let set = completedByUser.get(row.user_id);
          if (!set) completedByUser.set(row.user_id, (set = new Set()));
          set.add(row.day_number);
          if ((row.updated_at || "") >= todayStartIso) readTodayUsers.add(row.user_id);
        });
        if (!data || data.length < PAGE_SIZE) break;
      }
    }

    const dayByNumber = new Map(GENESIS_BIBLE_IN_ONE_YEAR_SERIES.map((day) => [day.dayNumber, day]));
    const inserts: Array<Record<string, unknown>> = [];

    for (const profile of profiles) {
      const userId = profile.user_id;
      if (remindedToday.has(userId) || readTodayUsers.has(userId)) continue;

      const completed = completedByUser.get(userId) || new Set<number>();
      let nextDayNumber = 1;
      while (completed.has(nextDayNumber) && nextDayNumber < 365) nextDayNumber += 1;
      const day = dayByNumber.get(nextDayNumber);
      if (!day) continue;

      const streak = Math.max(0, profile.current_streak ?? 0);
      const message =
        streak >= 3
          ? `Your ${streak}-day streak is on the line! Day ${day.dayNumber} - ${day.title} (${day.reference}) is ready. 🔥`
          : `Day ${day.dayNumber} is ready: ${day.title} (${day.reference}). A few minutes today keeps you moving.`;

      inserts.push({
        user_id: userId,
        type: NOTIFICATION_TYPE,
        from_user_id: null,
        from_user_name: "Bible Buddy",
        article_slug: `/plan?view=bible-year&day=${day.dayNumber}&solo=1`,
        message,
        is_read: false,
        created_at: new Date().toISOString(),
      });
    }

    const dryRun = request.nextUrl.searchParams.get("dryRun") === "1";
    let sent = 0;
    if (dryRun) {
      return NextResponse.json({
        dryRun: true,
        activeUsers: userIds.length,
        skippedAlreadyReminded: remindedToday.size,
        skippedReadToday: readTodayUsers.size,
        wouldSend: inserts.length,
        sample: inserts.slice(0, 3).map((row) => ({ message: row.message, article_slug: row.article_slug })),
      });
    }
    for (const insertChunk of chunk(inserts, 100)) {
      const { error } = await supabase.from("notifications").insert(insertChunk);
      if (error) {
        console.error("[DAILY_REMINDER] Insert failed:", error.message);
        continue;
      }
      sent += insertChunk.length;
    }

    return NextResponse.json({
      activeUsers: userIds.length,
      skippedAlreadyReminded: remindedToday.size,
      skippedReadToday: readTodayUsers.size,
      sent,
    });
  } catch (error) {
    console.error("[DAILY_REMINDER] Failed:", error);
    return NextResponse.json({ error: "Daily reminder failed." }, { status: 500 });
  }
}
