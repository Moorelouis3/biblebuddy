import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });
config({ path: ".env" });

type MasterActionRow = {
  user_id: string | null;
  username: string | null;
  session_id?: string | null;
  action_type: string;
  action_label: string | null;
  journey_day: number | null;
  account_status?: string | null;
  event_metadata?: Record<string, unknown> | null;
  created_at: string;
};

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const COMPLETION_ACTION_BY_TASK: Record<number, string> = {
  1: "bible_in_one_year_reading_completed",
  2: "bible_in_one_year_reflection_completed",
  3: "bible_in_one_year_trivia_completed",
};

const TASK_TITLE_BY_TASK: Record<number, string> = {
  1: "Scripture Video",
  2: "Day Summary",
  3: "Trivia",
};

function canonicalEvent(dayNumber: number, taskNumber: number, status: "started" | "finished") {
  return `day_${dayNumber}_task_${taskNumber}_${status}`;
}

function canonicalLabel(dayNumber: number, taskNumber: number, status: "started" | "finished") {
  return `Day ${dayNumber} Task ${taskNumber} ${status} - ${TASK_TITLE_BY_TASK[taskNumber]}`;
}

function parseDayFromLabel(label: string | null | undefined) {
  const match = String(label || "").match(/day\s+(\d+)/i);
  return match ? Number(match[1]) : 0;
}

function actorKey(row: Pick<MasterActionRow, "user_id" | "session_id">) {
  return row.user_id || row.session_id || "";
}

async function fetchRows() {
  const completionTypes = Object.values(COMPLETION_ACTION_BY_TASK);
  const { data, error } = await supabase
    .from("master_actions")
    .select("user_id, username, session_id, action_type, action_label, journey_day, account_status, event_metadata, created_at")
    .in("action_type", ["bible_year_task_started", ...completionTypes])
    .order("created_at", { ascending: true })
    .limit(250000);

  if (error) throw error;
  return (data || []) as MasterActionRow[];
}

async function main() {
  const rows = await fetchRows();
  const existing = new Set<string>();
  const completionEvidence = new Map<string, MasterActionRow>();

  for (const row of rows) {
    const dayNumber = Number(row.journey_day || parseDayFromLabel(row.action_label) || 0);
    const actor = actorKey(row);
    if (!dayNumber || !actor) continue;

    const metadata = row.event_metadata && typeof row.event_metadata === "object" ? row.event_metadata : {};
    const metadataCanonical = typeof metadata.canonicalEventName === "string" ? metadata.canonicalEventName : "";
    if (metadataCanonical) {
      existing.add(`${actor}:${metadataCanonical}`);
    }

    for (const taskNumber of [1, 2, 3]) {
      for (const status of ["started", "finished"] as const) {
        if (row.action_label === canonicalLabel(dayNumber, taskNumber, status)) {
          existing.add(`${actor}:${canonicalEvent(dayNumber, taskNumber, status)}`);
        }
      }
    }

    const completedTask = Number(
      Object.entries(COMPLETION_ACTION_BY_TASK).find(([, actionType]) => actionType === row.action_type)?.[0] || 0,
    );
    if (!completedTask) continue;

    for (let taskNumber = 1; taskNumber <= completedTask; taskNumber += 1) {
      for (const status of ["started", "finished"] as const) {
        const eventName = canonicalEvent(dayNumber, taskNumber, status);
        const key = `${actor}:${eventName}`;
        if (!completionEvidence.has(key)) {
          completionEvidence.set(key, row);
        }
      }
    }
  }

  const inserts = Array.from(completionEvidence.entries())
    .filter(([key]) => !existing.has(key))
    .map(([key, evidence]) => {
      const eventName = key.split(":").at(-1) || "";
      const match = eventName.match(/^day_(\d+)_task_(\d+)_(started|finished)$/);
      if (!match) return null;
      const dayNumber = Number(match[1]);
      const taskNumber = Number(match[2]);
      const status = match[3] as "started" | "finished";
      return {
        user_id: evidence.user_id,
        username: evidence.username || "User",
        session_id: evidence.session_id || null,
        action_type: status === "started" ? "bible_year_task_started" : COMPLETION_ACTION_BY_TASK[taskNumber],
        action_label: canonicalLabel(dayNumber, taskNumber, status),
        journey_day: dayNumber,
        account_status: evidence.account_status || "free_or_guest",
        event_metadata: {
          plan: "bible_in_one_year",
          task: taskNumber === 1 ? "reading" : taskNumber === 2 ? "reflection" : "trivia",
          taskNumber,
          taskTitle: TASK_TITLE_BY_TASK[taskNumber],
          taskStatus: status,
          canonicalEventName: eventName,
          dayNumber,
          backfilled: true,
          backfillSourceActionType: evidence.action_type,
          backfillSourceCreatedAt: evidence.created_at,
        },
        created_at: evidence.created_at,
      };
    })
    .filter(Boolean);

  console.log(`Found ${rows.length} Bible-year task rows.`);
  console.log(`Existing canonical actor-events: ${existing.size}.`);
  console.log(`Backfill rows to insert: ${inserts.length}.`);

  for (let index = 0; index < inserts.length; index += 500) {
    const batch = inserts.slice(index, index + 500);
    const { error } = await supabase.from("master_actions").insert(batch);
    if (error) throw error;
    console.log(`Inserted ${Math.min(index + batch.length, inserts.length)} / ${inserts.length}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
