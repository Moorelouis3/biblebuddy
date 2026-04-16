import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  buildWeeklyContext,
  buildWeeklyLouisReportForUser,
  claimWeeklyReport,
  fetchRecentActions,
  getWeekKey,
  releaseWeeklyClaim,
  resolveFounderId,
  sendLouisInboxMessage,
} from "@/lib/weeklyBibleReport";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const DAY_MS = 24 * 60 * 60 * 1000;

function getDb() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function sendWeeklyLouisReportsNow() {
  const db: any = getDb();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!db || !supabaseUrl || !serviceKey) {
    throw new Error("Server not configured.");
  }

  const louisId = await resolveFounderId(supabaseUrl, serviceKey, db);
  if (!louisId) {
    throw new Error("Founder account not found.");
  }

  const since = new Date(Date.now() - 7 * DAY_MS).toISOString();
  const weekKey = getWeekKey();
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

  const context = await buildWeeklyContext(db, activeUserIds);

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
    } catch (error) {
      if (claimed) {
        await releaseWeeklyClaim(db, userId, weekKey);
      }
      console.error("[ADMIN_WEEKLY_REPORT] Failed for user", userId, error);
      errors++;
    }
  }

  return {
    ok: true,
    usersActiveLast7d: activeUserIds.length,
    sent,
    skipped,
    errors,
    weekKey,
  };
}

export async function POST(request: NextRequest) {
  const db: any = getDb();
  if (!db) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  try {
    const body = await request.json();

    if (body?.type === "send_now") {
      const result = await sendWeeklyLouisReportsNow();
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
  } catch (error) {
    console.error("[ADMIN_WEEKLY_REPORT] Route failed:", error);
    const message = error instanceof Error ? error.message : "Failed to process weekly report action.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
