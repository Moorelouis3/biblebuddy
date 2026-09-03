import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { BIBLE_STUDY_GROUP_ID } from "@/lib/bibleStudiesCatalog";

/**
 * The numbers behind the slim /admin/analytics overview (2026-09-03):
 * are people coming, are they staying, and is what was built this week
 * working. Six cards, no revenue, no onboarding-step funnel - the deep
 * dashboards live on their own subpages.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";
const SIGNUP_EVENTS = new Set(["guest_account_created", "created_free_account", "created_account_successfully"]);

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const admin = getAdminClient();
  if (!admin || !token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { data: authData, error: authError } = await admin.auth.getUser(token);
  if (authError || (authData.user?.email || "").toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const now = new Date();
  const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
  const yesterdayStart = new Date(todayStart.getTime() - 86_400_000);
  const weekStart = new Date(todayStart.getTime() - 6 * 86_400_000);
  const todayIso = todayStart.toISOString();
  const yesterdayIso = yesterdayStart.toISOString();
  const weekIso = weekStart.toISOString();

  const [signupRows, activeToday, activeYesterday, streakCount, planRows, votdRows, proverbsCount, groupToday, reportRows] =
    await Promise.all([
      admin
        .from("landing_page_events")
        .select("event_name, source, created_at")
        .in("event_name", [...SIGNUP_EVENTS])
        .gte("created_at", weekIso)
        .limit(5000),
      admin.from("profile_stats").select("*", { count: "exact", head: true }).gte("updated_at", todayIso),
      admin
        .from("profile_stats")
        .select("*", { count: "exact", head: true })
        .gte("updated_at", yesterdayIso)
        .lt("updated_at", todayIso),
      admin.from("profile_stats").select("*", { count: "exact", head: true }).gte("current_streak", 3),
      admin
        .from("bible_year_day_progress")
        .select("user_id, day_number, reading_completed, created_at")
        .gte("created_at", todayIso)
        .limit(2000),
      admin
        .from("landing_page_events")
        .select("event_name, created_at")
        .like("event_name", "votd_%")
        .gte("created_at", weekIso)
        .limit(20000),
      admin
        .from("community_event_members")
        .select("*", { count: "exact", head: true })
        .eq("event_slug", "wisdom-of-proverbs"),
      admin
        .from("group_posts")
        .select("*", { count: "exact", head: true })
        .eq("group_id", BIBLE_STUDY_GROUP_ID)
        .gte("created_at", todayIso),
      admin
        .from("notifications")
        .select("created_at")
        .ilike("message", "%Problem Report%")
        .gte("created_at", weekIso)
        .limit(500),
    ]);

  // Signups: today and this week, split by first-touch source.
  const signups = { today: 0, week: 0, bySource: {} as Record<string, { today: number; week: number }> };
  for (const row of signupRows.data || []) {
    const source = (row.source || "direct").toLowerCase();
    const bucket = (signups.bySource[source] = signups.bySource[source] || { today: 0, week: 0 });
    bucket.week += 1;
    signups.week += 1;
    if (row.created_at >= todayIso) {
      bucket.today += 1;
      signups.today += 1;
    }
  }

  // Bible in One Year: distinct people opening a day today, and finished readings.
  const planUsers = new Set<string>();
  let readingsCompletedToday = 0;
  for (const row of planRows.data || []) {
    if (row.user_id) planUsers.add(row.user_id);
    if (row.reading_completed === true) readingsCompletedToday += 1;
  }

  // Verse of the Day funnel, today and the 7-day window.
  const votd = { today: {} as Record<string, number>, week: {} as Record<string, number> };
  for (const row of votdRows.data || []) {
    votd.week[row.event_name] = (votd.week[row.event_name] || 0) + 1;
    if (row.created_at >= todayIso) votd.today[row.event_name] = (votd.today[row.event_name] || 0) + 1;
  }

  const reportsToday = (reportRows.data || []).filter((row) => row.created_at >= todayIso).length;

  return NextResponse.json({
    generatedAt: now.toISOString(),
    signups,
    activity: {
      activeToday: activeToday.count ?? 0,
      activeYesterday: activeYesterday.count ?? 0,
      streakThreePlus: streakCount.count ?? 0,
    },
    bibleYear: {
      dayOpensToday: planUsers.size,
      readingsCompletedToday,
    },
    votd,
    proverbsSignups: proverbsCount.count ?? 0,
    group: { postsToday: groupToday.count ?? 0 },
    reports: { today: reportsToday, week: (reportRows.data || []).length },
  });
}
