import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { ensureWeeklyGroupSeriesPost } from "../lib/weeklyGroupSeriesPostAdmin";
import { ensureWeeklyGroupTriviaPost } from "../lib/weeklyGroupTriviaAdmin";
import { ensureWeeklyGroupPollPost } from "../lib/weeklyGroupPollAdmin";
import { ensureWeeklyGroupQuestionPost } from "../lib/weeklyGroupQuestionAdmin";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function parseDateArg(value: string) {
  const date = new Date(`${value}T18:00:00+02:00`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }
  return date;
}

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

async function ensureForDate(groupId: string, actorUserId: string, date: Date) {
  const weekday = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    weekday: "short",
  }).format(date);

  switch (weekday) {
    case "Mon":
      return ensureWeeklyGroupSeriesPost(supabase, groupId, "update_monday", actorUserId, date, { force: true });
    case "Tue":
      return ensureWeeklyGroupTriviaPost(supabase, groupId, actorUserId, date, { force: true });
    case "Wed":
      return ensureWeeklyGroupPollPost(supabase, groupId, actorUserId, date, { force: true });
    case "Thu":
      return ensureWeeklyGroupQuestionPost(supabase, groupId, actorUserId, date, { force: true });
    case "Fri":
      return ensureWeeklyGroupSeriesPost(supabase, groupId, "who_was_this_friday", actorUserId, date, { force: true });
    case "Sat":
      return ensureWeeklyGroupSeriesPost(supabase, groupId, "bible_study_saturday", actorUserId, date, { force: true });
    case "Sun":
      return ensureWeeklyGroupSeriesPost(supabase, groupId, "prayer_request_sunday", actorUserId, date, { force: true });
    default:
      throw new Error(`Unsupported weekday: ${weekday}`);
  }
}

async function main() {
  const startArg = process.argv[2];
  const endArg = process.argv[3];
  const startDate = startArg ? parseDateArg(startArg) : parseDateArg("2026-04-24");
  const endDate = endArg ? parseDateArg(endArg) : new Date();

  const { data: groups, error: groupsError } = await supabase
    .from("study_groups")
    .select("id, name, leader_user_id")
    .in("name", ["Bible Buddy Study Group", "Hope Nation"]);

  if (groupsError) throw groupsError;

  const group = groups?.find((row) => row.name === "Bible Buddy Study Group") ?? groups?.[0];
  if (!group) throw new Error("Official study group not found.");
  if (!group.leader_user_id) throw new Error("Official study group leader is missing.");

  const cursor = new Date(startDate);
  const end = new Date(endDate);

  while (cursor.getTime() <= end.getTime()) {
    try {
      const result = await ensureForDate(group.id, group.leader_user_id, cursor);
      console.log(formatDateKey(cursor), result);
    } catch (error) {
      console.error(formatDateKey(cursor), error instanceof Error ? error.message : error);
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
