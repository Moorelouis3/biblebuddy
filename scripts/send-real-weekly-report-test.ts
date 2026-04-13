import { createClient } from "@supabase/supabase-js";
import {
  buildWeeklyContext,
  buildWeeklyReportForUser,
  fetchRecentActions,
  getWeekKey,
  sendDirectMessage,
} from "@/lib/weeklyBibleReport";

const TARGET_USER_ID = "c36fe21d-cca0-4561-b543-b6dba8290316";
const LOUIS_USER_ID = "669d4404-5eee-49ee-a112-2ecbd573e22a";

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing Supabase env vars.");
  }

  const db: any = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const weekKey = getWeekKey();

  const recentActions = await fetchRecentActions(db, since);
  const userActions = recentActions.filter((action) => action.user_id === TARGET_USER_ID);

  const context = await buildWeeklyContext(db, [TARGET_USER_ID]);
  const report = buildWeeklyReportForUser(TARGET_USER_ID, userActions, context, weekKey);

  const { data: louisProfile, error: louisError } = await db
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", LOUIS_USER_ID)
    .maybeSingle();

  if (louisError) {
    throw louisError;
  }

  const louisName = louisProfile?.display_name || louisProfile?.username || "Louis";
  const ok = await sendDirectMessage(db, LOUIS_USER_ID, louisName, TARGET_USER_ID, report.message, report.action);

  if (!ok) {
    throw new Error("Failed to send the real weekly report DM.");
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        targetUserId: TARGET_USER_ID,
        weekKey,
        stats: report.stats,
        action: report.action,
        preview: report.message,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
