import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  buildWeeklyContext,
  buildWeeklyReportForUser,
  claimWeeklyReport,
  ensureWeeklyBuckets,
  fetchRecentActions,
  getBucketDay,
  getWeekKey,
  releaseWeeklyClaim,
  resolveFounderId,
  sendDirectMessage,
  type WeeklyBucketDay,
} from "@/lib/weeklyBibleReport";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const DAY_MS = 24 * 60 * 60 * 1000;
const VALID_BUCKET_DAYS: WeeklyBucketDay[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

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

async function sendTodayBucket(limit = 50) {
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

  const { data: louisProfile } = await db
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", louisId)
    .maybeSingle();
  const louisName = louisProfile?.display_name || louisProfile?.username || "Louis";

  const since = new Date(Date.now() - 7 * DAY_MS).toISOString();
  const weekKey = getWeekKey();
  const bucketDay = getBucketDay();

  const recentActions = await fetchRecentActions(db, since);
  const actionsByUser = new Map<string, Array<{ user_id: string; action_type: string; action_label: string | null; created_at: string }>>();

  for (const action of recentActions) {
    if (!action.user_id || action.user_id === louisId) continue;
    const bucket = actionsByUser.get(action.user_id) ?? [];
    bucket.push(action);
    actionsByUser.set(action.user_id, bucket);
  }

  const allActiveUserIds = [...actionsByUser.keys()];
  const bucketMap = await ensureWeeklyBuckets(db, allActiveUserIds, bucketDay);

  let activeUserIds = allActiveUserIds
    .filter((userId) => bucketMap.get(userId) === bucketDay)
    .sort((leftUserId, rightUserId) => {
      const leftActions = actionsByUser.get(leftUserId) ?? [];
      const rightActions = actionsByUser.get(rightUserId) ?? [];
      if (rightActions.length !== leftActions.length) {
        return rightActions.length - leftActions.length;
      }
      return (rightActions[0]?.created_at || "").localeCompare(leftActions[0]?.created_at || "");
    })
    .slice(0, Math.max(1, limit));

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

    const report = buildWeeklyReportForUser(userId, userActions, context, weekKey);
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
    bucketDay,
    usersConsidered: activeUserIds.length,
    usersActiveLast7d: allActiveUserIds.length,
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

    if (body?.type === "set_bucket") {
      const userId = String(body?.userId || "").trim();
      const bucketDay = String(body?.bucketDay || "").trim().toLowerCase() as WeeklyBucketDay;

      if (!userId || !VALID_BUCKET_DAYS.includes(bucketDay)) {
        return NextResponse.json({ error: "Invalid user or bucket day." }, { status: 400 });
      }

      const { error } = await db
        .from("weekly_bible_report_buckets")
        .upsert(
          {
            user_id: userId,
            bucket_day: bucketDay,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        );

      if (error) {
        console.error("[ADMIN_WEEKLY_REPORT] Failed to save bucket:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ ok: true, userId, bucketDay });
    }

    if (body?.type === "send_today") {
      const limit = Number.isFinite(Number(body?.limit)) ? Number(body.limit) : 50;
      const result = await sendTodayBucket(limit);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
  } catch (error) {
    console.error("[ADMIN_WEEKLY_REPORT] Route failed:", error);
    const message = error instanceof Error ? error.message : "Failed to process weekly report action.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
