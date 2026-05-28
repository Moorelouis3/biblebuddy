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

export type StudyNotesViewPayload = DeepStudyInterestPayload;

export type StudyNotesSectionOpenPayload = DeepStudyInterestPayload & {
  sectionReference: string;
  sectionTitle: string;
};

export type ParsedStudyNotesView = ParsedDeepStudyInterest;

export type ParsedStudyNotesSectionOpen = ParsedDeepStudyInterest & {
  sectionReference: string;
  sectionTitle: string;
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

function getBibleYearDayLabel(payload: DeepStudyInterestPayload) {
  const dayMatch = String(payload.itemKey || payload.itemTitle || payload.contentLabel || "").match(/day[-\s_]*(\d+)/i);
  return dayMatch ? `Day ${dayMatch[1]}` : payload.itemTitle || payload.contentLabel || "Bible in One Year";
}

function buildReadableDeepStudyInterestLabel(payload: DeepStudyInterestPayload) {
  if (payload.source === "bible_in_one_year") {
    return `${getBibleYearDayLabel(payload)} Study Notes clicked`;
  }
  return `${payload.sourceLabel} Study Notes clicked - ${payload.itemTitle}`;
}

function buildReadableStudyNotesViewLabel(payload: StudyNotesViewPayload) {
  if (payload.source === "bible_in_one_year") {
    return `${getBibleYearDayLabel(payload)} Study Notes viewed`;
  }
  return `${payload.sourceLabel} Study Notes viewed - ${payload.itemTitle}`;
}

function buildReadableStudyNotesSectionOpenLabel(payload: StudyNotesSectionOpenPayload) {
  const sectionLabel = payload.sectionTitle || payload.sectionReference || "Section";
  if (payload.source === "bible_in_one_year") {
    return `${getBibleYearDayLabel(payload)} Study Notes opened - ${sectionLabel}`;
  }
  return `${payload.sourceLabel} Study Notes opened - ${payload.itemTitle} - ${sectionLabel}`;
}

export function parseDeepStudyInterestLabel(label: string | null | undefined): ParsedDeepStudyInterest | null {
  const structuredIndex = label?.indexOf("deep_study_interest:v1|") ?? -1;
  if (!label || structuredIndex === -1) return null;
  const structuredLabel = label.slice(structuredIndex);

  const parts = structuredLabel.split("|").slice(1);
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

function buildStudyNotesBaseLabel(prefix: string, payload: DeepStudyInterestPayload, now = new Date()) {
  const localDate = getDeepStudyLocalDateKey(now);
  return [
    prefix,
    `localDate=${localDate}`,
    `source=${encodeLabelPart(payload.source)}`,
    `itemKey=${encodeLabelPart(payload.itemKey)}`,
    `sourceLabel=${encodeLabelPart(payload.sourceLabel)}`,
    `itemTitle=${encodeLabelPart(payload.itemTitle)}`,
    `contentLabel=${encodeLabelPart(payload.contentLabel || payload.itemTitle)}`,
    `deviceTimestamp=${encodeLabelPart(now.toISOString())}`,
  ];
}

export function buildStudyNotesViewLabel(payload: StudyNotesViewPayload, now = new Date()) {
  const structured = buildStudyNotesBaseLabel("study_notes_view:v1", payload, now).join("|");
  return `${buildReadableStudyNotesViewLabel(payload)} | ${structured}`;
}

export function buildStudyNotesSectionOpenLabel(payload: StudyNotesSectionOpenPayload, now = new Date()) {
  const structured = [
    ...buildStudyNotesBaseLabel("study_notes_section_open:v1", payload, now),
    `sectionReference=${encodeLabelPart(payload.sectionReference)}`,
    `sectionTitle=${encodeLabelPart(payload.sectionTitle)}`,
  ].join("|");
  return `${buildReadableStudyNotesSectionOpenLabel(payload)} | ${structured}`;
}

function parseStudyNotesBaseLabel(label: string | null | undefined, prefix: string): ParsedDeepStudyInterest | null {
  const structuredIndex = label?.indexOf(`${prefix}|`) ?? -1;
  if (!label || structuredIndex === -1) return null;
  const structuredLabel = label.slice(structuredIndex);

  const parts = structuredLabel.split("|").slice(1);
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

export function parseStudyNotesViewLabel(label: string | null | undefined): ParsedStudyNotesView | null {
  return parseStudyNotesBaseLabel(label, "study_notes_view:v1");
}

export function parseStudyNotesSectionOpenLabel(label: string | null | undefined): ParsedStudyNotesSectionOpen | null {
  const base = parseStudyNotesBaseLabel(label, "study_notes_section_open:v1");
  if (!base || !label) return null;
  const structuredIndex = label.indexOf("study_notes_section_open:v1|");
  const structuredLabel = structuredIndex >= 0 ? label.slice(structuredIndex) : label;

  const data = new Map<string, string>();
  for (const part of structuredLabel.split("|").slice(1)) {
    const separatorIndex = part.indexOf("=");
    if (separatorIndex === -1) continue;
    data.set(part.slice(0, separatorIndex), part.slice(separatorIndex + 1));
  }

  return {
    ...base,
    sectionReference: decodeLabelPart(data.get("sectionReference")),
    sectionTitle: decodeLabelPart(data.get("sectionTitle")),
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
      .like("action_label", `%${prefix}%`)
      .limit(1);

    if (!existingError && existing && existing.length > 0) return;

    const { error: insertError } = await client.from("master_actions").insert({
      user_id: payload.userId,
      username: payload.username || null,
      action_type: ACTION_TYPE.deep_study_interest_clicked,
      action_label: `${buildReadableDeepStudyInterestLabel(payload)} | ${actionLabel}`,
      event_metadata: {
        source: payload.source,
        sourceLabel: payload.sourceLabel,
        itemKey: payload.itemKey,
        itemTitle: payload.itemTitle,
        contentLabel: payload.contentLabel || payload.itemTitle,
      },
      created_at: now.toISOString(),
    });

    if (insertError) {
      console.warn("[DEEP_STUDY_INTEREST] Could not track Deep Study interest:", insertError);
    }
  } catch (error) {
    console.warn("[DEEP_STUDY_INTEREST] Could not track Deep Study interest:", error);
  }
}

export async function trackStudyNotesViewed(payload: StudyNotesViewPayload, client = defaultSupabase) {
  if (!payload.userId) return;

  const now = new Date();
  try {
    const { error } = await client.from("master_actions").insert({
      user_id: payload.userId,
      username: payload.username || null,
      action_type: ACTION_TYPE.study_notes_viewed,
      action_label: buildStudyNotesViewLabel(payload, now),
      event_metadata: {
        source: payload.source,
        sourceLabel: payload.sourceLabel,
        itemKey: payload.itemKey,
        itemTitle: payload.itemTitle,
        contentLabel: payload.contentLabel || payload.itemTitle,
      },
      created_at: now.toISOString(),
    });

    if (error) {
      console.warn("[STUDY_NOTES_ANALYTICS] Could not track Study Notes view:", error);
    }
  } catch (error) {
    console.warn("[STUDY_NOTES_ANALYTICS] Could not track Study Notes view:", error);
  }
}

export async function trackStudyNotesSectionOpened(payload: StudyNotesSectionOpenPayload, client = defaultSupabase) {
  if (!payload.userId) return;

  const now = new Date();
  try {
    const { error } = await client.from("master_actions").insert({
      user_id: payload.userId,
      username: payload.username || null,
      action_type: ACTION_TYPE.study_notes_section_opened,
      action_label: buildStudyNotesSectionOpenLabel(payload, now),
      event_metadata: {
        source: payload.source,
        sourceLabel: payload.sourceLabel,
        itemKey: payload.itemKey,
        itemTitle: payload.itemTitle,
        contentLabel: payload.contentLabel || payload.itemTitle,
        sectionReference: payload.sectionReference,
        sectionTitle: payload.sectionTitle,
      },
      created_at: now.toISOString(),
    });

    if (error) {
      console.warn("[STUDY_NOTES_ANALYTICS] Could not track Study Notes section:", error);
    }
  } catch (error) {
    console.warn("[STUDY_NOTES_ANALYTICS] Could not track Study Notes section:", error);
  }
}
