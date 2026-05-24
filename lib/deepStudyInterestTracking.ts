import { ACTION_TYPE } from "./actionTypes";
import { supabase as defaultSupabase } from "./supabaseClient";

export type DeepStudyInterestSource =
  | "bible_in_one_year"
  | "bible_topics"
  | "character_study"
  | "bible_chapter"
  | "reading_plan"
  | "future_deep_study";

export type DeepStudyInterestPayload = {
  userId?: string | null;
  username?: string | null;
  source: DeepStudyInterestSource;
  sourceLabel: string;
  itemKey: string;
  itemTitle: string;
  contentLabel?: string | null;
};

export type ParsedDeepStudyInterest = {
  localDate: string;
  source: string;
  sourceLabel: string;
  itemKey: string;
  itemTitle: string;
  contentLabel: string;
  deviceTimestamp: string;
};

function encodeLabelPart(value: string | null | undefined) {
  return encodeURIComponent((value || "").trim());
}

function decodeLabelPart(value: string | null | undefined) {
  try {
    return decodeURIComponent(value || "");
  } catch {
    return value || "";
  }
}

export function getDeepStudyLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function buildDeepStudyInterestLabel(payload: DeepStudyInterestPayload, now = new Date()) {
  const localDate = getDeepStudyLocalDateKey(now);
  return [
    "deep_study_interest:v1",
    `localDate=${localDate}`,
    `source=${encodeLabelPart(payload.source)}`,
    `itemKey=${encodeLabelPart(payload.itemKey)}`,
    `sourceLabel=${encodeLabelPart(payload.sourceLabel)}`,
    `itemTitle=${encodeLabelPart(payload.itemTitle)}`,
    `contentLabel=${encodeLabelPart(payload.contentLabel || payload.itemTitle)}`,
    `deviceTimestamp=${encodeLabelPart(now.toISOString())}`,
  ].join("|");
}

export function getDeepStudyInterestDailyPrefix(payload: DeepStudyInterestPayload, now = new Date()) {
  const localDate = getDeepStudyLocalDateKey(now);
  return [
    "deep_study_interest:v1",
    `localDate=${localDate}`,
    `source=${encodeLabelPart(payload.source)}`,
    `itemKey=${encodeLabelPart(payload.itemKey)}`,
  ].join("|");
}

export function parseDeepStudyInterestLabel(label: string | null | undefined): ParsedDeepStudyInterest | null {
  if (!label?.startsWith("deep_study_interest:v1|")) return null;

  const parts = label.split("|").slice(1);
  const data = new Map<string, string>();
  for (const part of parts) {
    const separatorIndex = part.indexOf("=");
    if (separatorIndex === -1) continue;
    data.set(part.slice(0, separatorIndex), part.slice(separatorIndex + 1));
  }

  return {
    localDate: data.get("localDate") || "",
    source: decodeLabelPart(data.get("source")),
    sourceLabel: decodeLabelPart(data.get("sourceLabel")),
    itemKey: decodeLabelPart(data.get("itemKey")),
    itemTitle: decodeLabelPart(data.get("itemTitle")),
    contentLabel: decodeLabelPart(data.get("contentLabel")),
    deviceTimestamp: decodeLabelPart(data.get("deviceTimestamp")),
  };
}

export async function trackDeepStudyInterestOnce(payload: DeepStudyInterestPayload, client = defaultSupabase) {
  if (!payload.userId) return;

  const now = new Date();
  const prefix = getDeepStudyInterestDailyPrefix(payload, now);
  const actionLabel = buildDeepStudyInterestLabel(payload, now);

  try {
    const { data: existing, error: existingError } = await client
      .from("master_actions")
      .select("id")
      .eq("user_id", payload.userId)
      .eq("action_type", ACTION_TYPE.deep_study_interest_clicked)
      .like("action_label", `${prefix}%`)
      .limit(1);

    if (!existingError && existing && existing.length > 0) return;

    const { error: insertError } = await client.from("master_actions").insert({
      user_id: payload.userId,
      username: payload.username || null,
      action_type: ACTION_TYPE.deep_study_interest_clicked,
      action_label: actionLabel,
      created_at: now.toISOString(),
    });

    if (insertError) {
      console.warn("[DEEP_STUDY_INTEREST] Could not track Deep Study interest:", insertError);
    }
  } catch (error) {
    console.warn("[DEEP_STUDY_INTEREST] Could not track Deep Study interest:", error);
  }
}
