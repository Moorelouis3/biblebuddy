import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  buildWeeklyContext,
  buildWeeklyReportForUser,
  claimWeeklyReport,
  fetchRecentActions,
  getWeekKey,
  releaseWeeklyClaim,
  resolveFounderId,
  sendDirectMessage,
} from "@/lib/weeklyBibleReport";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const DAY_MS = 24 * 60 * 60 * 1000;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const db: any = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const louisId = await resolveFounderId(supabaseUrl, serviceKey, db);
  if (!louisId) {
    return NextResponse.json({ error: "Founder account not found." }, { status: 404 });
  }

  const { data: louisProfile } = await db
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", louisId)
    .maybeSingle();
  const louisName = louisProfile?.display_name || louisProfile?.username || "Louis";

  const dryRun = request.nextUrl.searchParams.get("dryRun") === "1";
  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = limitParam ? Math.max(1, parseInt(limitParam, 10)) : null;
  const since = new Date(Date.now() - 7 * DAY_MS).toISOString();
  const weekKey = getWeekKey();

  try {
    const recentActions = await fetchRecentActions(db, since);
    const actionsByUser = new Map<string, Array<{ user_id: string; action_type: string; action_label: string | null; created_at: string }>>();

    for (const action of recentActions) {
      if (!action.user_id || action.user_id === louisId) continue;
      const bucket = actionsByUser.get(action.user_id) ?? [];
      bucket.push(action);
      actionsByUser.set(action.user_id, bucket);
    }

    let activeUserIds = [...actionsByUser.keys()];
    if (limit) {
      activeUserIds = activeUserIds.slice(0, limit);
    }

    if (!activeUserIds.length) {
      return NextResponse.json({
        ok: true,
        sent: 0,
        skipped: 0,
        usersConsidered: 0,
        timestamp: new Date().toISOString(),
      });
    }

    const context = await buildWeeklyContext(db, activeUserIds);
    const previews: Array<{ userId: string; preview: string; actionLabel: string | null }> = [];
    let sent = 0;
    let skipped = 0;
    let errors = 0;

    for (const userId of activeUserIds) {
      const userActions = actionsByUser.get(userId) ?? [];
      if (!userActions.length) {
        skipped++;
        continue;
      }

      const report = buildWeeklyReportForUser(userId, userActions, context, weekKey);
      previews.push({
        userId,
        preview: report.message.slice(0, 220),
        actionLabel: report.action?.label ?? null,
      });

      if (dryRun) continue;

      let claimed = false;
      try {
        claimed = await claimWeeklyReport(db, userId, weekKey);
        if (!claimed) {
          skipped++;
          continue;
        }

        const ok = await sendDirectMessage(db, louisId, louisName, userId, report.message, report.action);
        if (!ok) {
          await releaseWeeklyClaim(db, userId, weekKey);
          errors++;
          continue;
        }

        sent++;
      } catch (error: any) {
        if (claimed) {
          await releaseWeeklyClaim(db, userId, weekKey);
        }
        console.error("[WEEKLY_REPORT] Failed for user", userId, error?.message);
        errors++;
      }
    }

    return NextResponse.json({
      ok: true,
      dryRun,
      since,
      weekKey,
      usersConsidered: activeUserIds.length,
      sent,
      skipped,
      errors,
      previews: previews.slice(0, 10),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    const message = String(error?.message || "");
    if (message.toLowerCase().includes("weekly_bible_report_sent")) {
      return NextResponse.json(
        {
          error: "weekly_bible_report_sent table is missing. Run scripts/create-weekly-bible-report-sent.sql first.",
        },
        { status: 500 },
      );
    }

    console.error("[WEEKLY_REPORT] Route failed:", error);
    return NextResponse.json({ error: "Failed to generate weekly Bible reports." }, { status: 500 });
  }
}
