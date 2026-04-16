import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  buildWeeklyContext,
  buildWeeklyLouisReportForUser,
  claimWeeklyReport,
  fetchRecentActions,
  getWeekKey,
  releaseWeeklyClaim,
  sendLouisInboxMessage,
  resolveFounderId,
} from "@/lib/weeklyBibleReport";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const DAY_MS = 24 * 60 * 60 * 1000;
const REPORT_TIMEZONE = process.env.WEEKLY_REPORT_TIMEZONE || "America/New_York";

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

function isThursdayInReportTimezone(anchorDate = new Date()) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: REPORT_TIMEZONE,
  }).format(anchorDate);

  return weekday.toLowerCase() === "thursday";
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

  if (!isThursdayInReportTimezone()) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: `Weekly Bible report only sends on Thursday in ${REPORT_TIMEZONE}.`,
    });
  }

  const db: any = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const louisId = await resolveFounderId(supabaseUrl, serviceKey, db);
  if (!louisId) {
    return NextResponse.json({ error: "Founder account not found." }, { status: 404 });
  }

  const dryRun = request.nextUrl.searchParams.get("dryRun") === "1";
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

    const activeUserIds = [...actionsByUser.keys()].sort((leftUserId, rightUserId) => {
      const leftActions = actionsByUser.get(leftUserId) ?? [];
      const rightActions = actionsByUser.get(rightUserId) ?? [];
      if (rightActions.length !== leftActions.length) {
        return rightActions.length - leftActions.length;
      }
      return (rightActions[0]?.created_at || "").localeCompare(leftActions[0]?.created_at || "");
    });

    if (!activeUserIds.length) {
      return NextResponse.json({
        ok: true,
        sent: 0,
        skipped: 0,
        usersActiveLast7d: 0,
        timestamp: new Date().toISOString(),
      });
    }

    const context = await buildWeeklyContext(db, activeUserIds);
    const previews: Array<{ userId: string; preview: string; title: string | null }> = [];
    let sent = 0;
    let skipped = 0;
    let errors = 0;

    for (const userId of activeUserIds) {
      const userActions = actionsByUser.get(userId) ?? [];
      if (!userActions.length) {
        skipped++;
        continue;
      }

      const report = buildWeeklyLouisReportForUser(userId, userActions, context, weekKey);
      previews.push({
        userId,
        preview: report.message.slice(0, 220),
        title: report.title ?? null,
      });

      if (dryRun) continue;

      let claimed = false;
      try {
        claimed = await claimWeeklyReport(db, userId, weekKey);
        if (!claimed) {
          skipped++;
          continue;
        }

        const ok = await sendLouisInboxMessage(db, userId, report);
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
      usersActiveLast7d: activeUserIds.length,
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

    if (message.toLowerCase().includes("louis_inbox_messages")) {
      return NextResponse.json(
        {
          error: "louis_inbox_messages table is missing. Run scripts/create-louis-inbox-messages.sql first.",
        },
        { status: 500 },
      );
    }

    console.error("[WEEKLY_REPORT] Route failed:", error);
    return NextResponse.json({ error: "Failed to generate weekly Bible reports." }, { status: 500 });
  }
}
