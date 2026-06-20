import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "../lib/bibleInOneYearPlan";

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  const envText = fs.readFileSync(filePath, "utf8");
  for (const line of envText.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    if (!(match[1] in process.env)) {
      process.env[match[1]] = match[2];
    }
  }
}

loadEnvFile(path.join(process.cwd(), ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env"));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const [progressRes, chapterRes, actionRes] = await Promise.all([
    supabase
      .from("bible_year_day_progress")
      .select("user_id, day_number, reading_completed, trivia_completed, reflection_completed"),
    supabase.from("completed_chapters").select("user_id, book, chapter"),
    supabase
      .from("master_actions")
      .select("user_id, action_label, action_type")
      .in("action_type", ["bible_in_one_year_reading_completed"])
      .like("action_label", "Bible in One Year Day %"),
  ]);

  if (progressRes.error) throw progressRes.error;
  if (chapterRes.error) throw chapterRes.error;
  if (actionRes.error) throw actionRes.error;

  const progressByUser = new Map<string, Map<number, { reading_completed: boolean | null; trivia_completed: boolean | null; reflection_completed: boolean | null }>>();
  for (const row of progressRes.data || []) {
    if (!progressByUser.has(row.user_id)) progressByUser.set(row.user_id, new Map());
    progressByUser.get(row.user_id)!.set(Number(row.day_number), row);
  }

  const chaptersByUser = new Map<string, Set<string>>();
  for (const row of chapterRes.data || []) {
    if (!row.user_id || typeof row.book !== "string" || !Number.isFinite(row.chapter)) continue;
    if (!chaptersByUser.has(row.user_id)) chaptersByUser.set(row.user_id, new Set());
    chaptersByUser.get(row.user_id)!.add(`${row.book}`.trim().toLowerCase() + ":" + Number(row.chapter));
  }

  const actionsByUser = new Map<string, Set<number>>();
  for (const row of actionRes.data || []) {
    const match = (row.action_label || "").match(/^Bible in One Year Day (\d+) (Reading|Video):/);
    if (!match) continue;
    const dayNumber = Number(match[1]);
    if (!Number.isFinite(dayNumber)) continue;
    if (!actionsByUser.has(row.user_id)) actionsByUser.set(row.user_id, new Set());
    actionsByUser.get(row.user_id)!.add(dayNumber);
  }

  const userIds = new Set<string>([...progressByUser.keys(), ...chaptersByUser.keys(), ...actionsByUser.keys()]);
  const payload: Array<{
    user_id: string;
    day_number: number;
    reading_completed: true;
    trivia_completed: true;
    reflection_completed: true;
  }> = [];
  const repairedUsers: Array<{ userId: string; restoredThroughDay: number }> = [];

  for (const userId of userIds) {
    const userProgress = progressByUser.get(userId) || new Map();
    const chapterKeys = chaptersByUser.get(userId) || new Set<string>();
    const actionDays = actionsByUser.get(userId) || new Set<number>();
    const restoredDays: number[] = [];

    for (const day of GENESIS_BIBLE_IN_ONE_YEAR_SERIES) {
      const row = userProgress.get(day.dayNumber);
      const restoredByRow = row?.reading_completed === true;
      const restoredByAction = actionDays.has(day.dayNumber);
      const restoredByChapters =
        day.readings.length > 0 &&
        day.readings.every((reading) => chapterKeys.has(`${reading.book}`.trim().toLowerCase() + ":" + Number(reading.chapter)));

      if (!restoredByRow && !restoredByAction && !restoredByChapters) break;
      restoredDays.push(day.dayNumber);
    }

    if (!restoredDays.length) continue;

    let changed = false;
    for (const dayNumber of restoredDays) {
      const row = userProgress.get(dayNumber);
      if (row?.reading_completed === true && row?.trivia_completed === true && row?.reflection_completed === true) {
        continue;
      }
      payload.push({
        user_id: userId,
        day_number: dayNumber,
        reading_completed: true,
        trivia_completed: true,
        reflection_completed: true,
      });
      changed = true;
    }

    if (changed) {
      repairedUsers.push({ userId, restoredThroughDay: restoredDays[restoredDays.length - 1] });
    }
  }

  let batches = 0;
  for (let index = 0; index < payload.length; index += 500) {
    const chunk = payload.slice(index, index + 500);
    const { error } = await supabase
      .from("bible_year_day_progress")
      .upsert(chunk, { onConflict: "user_id,day_number" });
    if (error) throw error;
    batches += 1;
  }

  console.log(
    JSON.stringify(
      {
        usersScanned: userIds.size,
        repairedUsers: repairedUsers.length,
        repairedRows: payload.length,
        batches,
        repairedUsersSample: repairedUsers.slice(0, 20),
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error("[repairBibleYearProgress] Failed:", error);
  process.exit(1);
});
