import { createClient } from "@supabase/supabase-js";
import {
  buildWeeklyContext,
  buildWeeklyLouisReportForUser,
  fetchRecentActions,
  getWeekKey,
  sendLouisInboxMessage,
} from "@/lib/weeklyBibleReport";

const TARGET_USER_ID = "c36fe21d-cca0-4561-b543-b6dba8290316";

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
  const report = buildWeeklyLouisReportForUser(TARGET_USER_ID, userActions, context, weekKey);
  const ok = await sendLouisInboxMessage(db, TARGET_USER_ID, report);

  if (!ok) {
    throw new Error("Failed to send the real weekly report through Louis.");
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        targetUserId: TARGET_USER_ID,
        weekKey,
        stats: report.stats,
        action: report.action,
        title: report.title,
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
