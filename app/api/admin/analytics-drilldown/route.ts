import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type WindowKey = "today" | "yesterday" | "24h" | "7d" | "30d" | "90d" | "this_month" | "lifetime";

type MasterActionRow = {
  id?: string | number | null;
  user_id?: string | null;
  username?: string | null;
  session_id?: string | null;
  action_type?: string | null;
  action_label?: string | null;
  journey_day?: number | null;
  event_metadata?: Record<string, unknown> | null;
  created_at?: string | null;
};

const MAIN_ACTION_LOG_ALLOWLIST = new Set([
  "user_signup",
  "bible_in_one_year_started",
  "bible_in_one_year_day_viewed",
  "bible_in_one_year_day_completed",
  "bible_in_one_year_trivia_completed",
  "trivia_chapter_completed",
  "bible_in_one_year_reflection_completed",
  "study_notes_viewed",
  "bible_book_opened",
  "bible_chapter_opened",
  "chapter_completed",
  "book_completed",
  "verse_highlighted",
  "upgrade_popup_viewed",
  "upgrade_popup_cta_clicked",
  "upgrade_popup_dismissed",
  "trial_started",
  "trial_canceled",
  "trial_converted",
  "user_upgraded",
  "badge_earned",
]);

function getDateRange(windowKey: WindowKey) {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  if (windowKey === "today") return { start: todayStart.toISOString(), end: null as string | null };
  if (windowKey === "yesterday") {
    const start = new Date(todayStart);
    start.setDate(start.getDate() - 1);
    return { start: start.toISOString(), end: todayStart.toISOString() };
  }
  if (windowKey === "7d") return { start: new Date(now.getTime() - 7 * 86400000).toISOString(), end: null };
  if (windowKey === "30d") return { start: new Date(now.getTime() - 30 * 86400000).toISOString(), end: null };
  if (windowKey === "90d") return { start: new Date(now.getTime() - 90 * 86400000).toISOString(), end: null };
  if (windowKey === "this_month") return { start: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(), end: null };
  if (windowKey === "lifetime") return { start: "1970-01-01T00:00:00.000Z", end: null };
  return { start: new Date(now.getTime() - 86400000).toISOString(), end: null };
}

function parseDay(row: MasterActionRow) {
  const labelMatch = (row.action_label || "").match(/Day\s+(\d+)/i);
  return Number(row.journey_day || labelMatch?.[1] || 0) || null;
}

function parseAutoCompleted(row: MasterActionRow) {
  const metadata = row.event_metadata || {};
  if (metadata.auto_completed === true || metadata.autoCompleted === true) return true;
  const label = String(row.action_label || "").toLowerCase();
  return label.includes("auto completed") || label.includes("auto-completed") || label.includes("auto completion");
}

function cleanAutoCompletedLabel(label: string) {
  return label
    .replace(/^auto(?:\s|-)?completed\s*[:\-]?\s*/i, "")
    .replace(/^auto\s*completion\s*[:\-]?\s*/i, "")
    .trim();
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value.replace(/\+/g, "%20"));
  } catch {
    return value;
  }
}

function parseStudyNotesLabel(label: string) {
  const trimmed = label.trim();
  if (!trimmed.includes("|")) return null;

  const parts = trimmed.split("|");
  const entries = new Map<string, string>();
  for (const part of parts) {
    const eq = part.indexOf("=");
    if (eq <= 0) continue;
    const key = part.slice(0, eq).trim();
    const rawValue = part.slice(eq + 1).trim();
    if (!key) continue;
    entries.set(key, safeDecode(rawValue));
  }

  const reference = (entries.get("reference") || "").trim();
  const sectionTitle = (entries.get("sectionTitle") || "").trim();
  if (!reference && !sectionTitle) return null;

  if (reference && sectionTitle) return `${reference} ${sectionTitle}`.trim();
  return reference || sectionTitle;
}

function getStudyNotesDisplayLabel(label: string) {
  const parsed = parseStudyNotesLabel(label);
  if (parsed) return parsed;
  return cleanAutoCompletedLabel(label);
}

function dedupeActionRows<T extends { userId: string | null; userLabel: string; actionTitle: string; detail: string; createdAt: string }>(rows: T[]) {
  const seen = new Set<string>();
  const deduped: T[] = [];
  for (const row of rows) {
    const key = [
      row.userId || row.userLabel,
      row.actionTitle.trim().toLowerCase(),
      row.detail.trim().toLowerCase(),
      row.createdAt,
    ].join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(row);
  }
  return deduped;
}

function actionOrderRank(actionType: string) {
  if (actionType.includes("completed")) return 0;
  if (actionType.includes("opened") || actionType.includes("viewed")) return 1;
  return 2;
}

function getBibleYearTaskFromRow(row: MasterActionRow) {
  const metadata = row.event_metadata || {};
  const metaTask = metadata.task;
  if (typeof metaTask === "string") {
    const normalized = metaTask.trim().toLowerCase();
    if (normalized.includes("read") || normalized.includes("audio") || normalized.includes("video")) return "reading";
    if (normalized.includes("trivia")) return "trivia";
    if (normalized.includes("reflection") || normalized.includes("discussion") || normalized.includes("summary")) return "reflection";
  }

  const label = String(row.action_label || "").toLowerCase();
  if (label.includes("trivia")) return "trivia";
  if (label.includes("reflection") || label.includes("discussion") || label.includes("summary")) return "reflection";
  if (label.includes("reading") || label.includes("audio") || label.includes("video")) return "reading";
  return null;
}

function normalizeActionTypeForMainLog(row: MasterActionRow) {
  const type = row.action_type || "";

  if (type === "bible_book_viewed") return "bible_book_opened";
  if (type === "bible_chapter_viewed") return "bible_chapter_opened";
  if (type === "chapter_notes_viewed" || type === "study_notes_section_opened") return "study_notes_viewed";
  if (type === "bible_year_day_start_popup_clicked") return "bible_in_one_year_started";

  if (type === "bible_year_task_completed") {
    const task = getBibleYearTaskFromRow(row);
    if (task === "reading") return null;
    if (task === "trivia") return "bible_in_one_year_trivia_completed";
    if (task === "reflection") return "bible_in_one_year_reflection_completed";
    return null;
  }

  return type || null;
}

function actionTitle(row: MasterActionRow) {
  const type = row.action_type || "tracked_action";
  const day = parseDay(row);
  const label = String(row.action_label || "").trim();
  const cleanedLabel = cleanAutoCompletedLabel(label);
  const isAutoCompleted = parseAutoCompleted(row);
  if (type === "user_signup") return "Created an account";
  if (type === "bible_in_one_year_started") return "Started Bible in One Year";
  if (type === "bible_in_one_year_day_viewed") return day ? `Opened Day ${day}` : "Opened a Bible in One Year day";
  if (type === "bible_in_one_year_day_completed") return day ? `Completed Day ${day}` : "Completed a Bible in One Year day";
  if (type === "bible_in_one_year_reading_completed") return day ? `Finished Day ${day} reading` : "Completed a reading";
  if (type === "bible_in_one_year_trivia_completed") return day ? `Finished Day ${day} trivia` : "Completed trivia";
  if (type === "bible_in_one_year_reflection_completed") return day ? `Finished Day ${day} discussion` : "Completed discussion";
  if (type === "trivia_chapter_completed") return "Completed trivia";
  if (type === "study_notes_viewed") {
    const displayLabel = getStudyNotesDisplayLabel(label);
    return displayLabel ? `Opened ${displayLabel}` : "Opened note section";
  }
  if (type === "bible_book_opened") return cleanedLabel ? `Opened ${cleanedLabel}` : "Opened a Bible book";
  if (type === "bible_chapter_opened") return cleanedLabel ? `Opened ${cleanedLabel}` : "Opened a Bible chapter";
  if (type === "chapter_completed") return cleanedLabel ? `${isAutoCompleted ? "Auto completed" : "Completed"} ${cleanedLabel}` : "Completed a Bible chapter";
  if (type === "book_completed") return cleanedLabel ? `${isAutoCompleted ? "Auto completed" : "Completed"} ${cleanedLabel}` : "Completed a Bible book";
  if (type === "verse_highlighted") return "Highlighted a verse";
  if (type === "upgrade_popup_viewed") return "Viewed upgrade popup";
  if (type === "upgrade_popup_cta_clicked") return "Clicked upgrade";
  if (type === "upgrade_popup_dismissed") return "Dismissed upgrade";
  if (type === "trial_started") return "Started trial";
  if (type === "trial_canceled") return "Canceled trial";
  if (type === "trial_converted") return "Converted from trial";
  if (type === "user_upgraded") return "Upgraded to Premium";
  if (type === "badge_earned") return "Earned a badge";
  return type.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function actionDetail(row: MasterActionRow) {
  const type = row.action_type || "tracked_action";
  const label = String(row.action_label || "").trim();
  const cleanedLabel = cleanAutoCompletedLabel(label);
  const isAutoCompleted = parseAutoCompleted(row);
  const day = parseDay(row);

  if (type === "user_signup") return "Created an account";
  if (type === "bible_in_one_year_started") return "Started Bible in One Year";
  if (type === "bible_in_one_year_day_viewed") return day ? `Opened Day ${day}` : "Opened a Bible in One Year day";
  if (type === "bible_in_one_year_day_completed") return day ? `Marked Day ${day} as completed` : "Marked a Bible in One Year day complete";
  if (type === "bible_in_one_year_reading_completed") return label ? `Completed reading for "${label}"` : "Completed a reading";
  if (type === "bible_in_one_year_trivia_completed") return label ? `Answered trivia for "${label}"` : "Answered trivia";
  if (type === "bible_in_one_year_reflection_completed") return label ? `Completed discussion on "${label}"` : "Completed a discussion";
  if (type === "trivia_chapter_completed") return label ? `Completed trivia for ${label}` : "Completed trivia";
  if (type === "study_notes_viewed") {
    const displayLabel = getStudyNotesDisplayLabel(label);
    return displayLabel ? `Opened ${displayLabel}` : "Opened note section";
  }
  if (type === "bible_book_opened") return cleanedLabel ? `Opened ${cleanedLabel}` : "Opened a Bible book";
  if (type === "bible_chapter_opened") return cleanedLabel ? `Opened ${cleanedLabel}` : "Opened a Bible chapter";
  if (type === "chapter_completed") return cleanedLabel ? `${isAutoCompleted ? "Auto completed" : "Completed"} ${cleanedLabel}` : "Completed a Bible chapter";
  if (type === "book_completed") return cleanedLabel ? `${isAutoCompleted ? "Auto completed" : "Completed"} ${cleanedLabel}` : "Completed a Bible book";
  if (type === "verse_highlighted") return label ? `Highlighted ${label}` : "Highlighted a verse";
  if (type === "upgrade_popup_viewed") return "Viewed upgrade popup";
  if (type === "upgrade_popup_cta_clicked") return "Clicked upgrade";
  if (type === "upgrade_popup_dismissed") return "Dismissed upgrade popup";
  if (type === "trial_started") return "Started trial";
  if (type === "trial_canceled") return "Canceled trial";
  if (type === "trial_converted") return "Converted from trial";
  if (type === "user_upgraded") return "Upgraded to Premium";
  if (type === "badge_earned") return label || "Earned a badge";

  return label || type.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function signupSource(row: MasterActionRow | undefined) {
  const metadata = row?.event_metadata || {};
  const source = metadata.source || metadata.utm_source || metadata.signupSource || metadata.referrer;
  if (typeof source === "string" && source.trim()) return source.trim();
  const label = (row?.action_label || "").trim();
  return label && !/^user signup$/i.test(label) ? label : "Direct / unknown";
}

export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!url || !anonKey || !serviceKey) return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  if (!token) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  const authClient = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: ownerData } = await authClient.auth.getUser(token);
  const ownerUser = ownerData.user;
  if (ownerUser?.email !== "moorelouis3@gmail.com") return NextResponse.json({ error: "Owner analytics only." }, { status: 403 });
  const ownerId = ownerUser.id;

  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const requestUrl = new URL(request.url);
  const requestedWindow = requestUrl.searchParams.get("window") as WindowKey | null;
  const windowKey: WindowKey = ["today", "yesterday", "24h", "7d", "30d", "90d", "this_month", "lifetime"].includes(requestedWindow || "")
    ? requestedWindow as WindowKey
    : "today";
  const { start, end } = getDateRange(windowKey);

  let actionQuery = admin
    .from("master_actions")
    .select("id, user_id, username, session_id, action_type, action_label, journey_day, event_metadata, created_at")
    .gte("created_at", start)
    .order("created_at", { ascending: false })
    .limit(5000);
  if (end) actionQuery = actionQuery.lt("created_at", end);
  const { data: actionData, error: actionError } = await actionQuery;
  if (actionError) return NextResponse.json({ error: actionError.message }, { status: 500 });

  const actions = ((actionData || []) as MasterActionRow[]).filter((row) => row.user_id !== ownerId);
  const userIds = Array.from(new Set(actions.map((row) => row.user_id).filter((id): id is string => Boolean(id))));
  const profiles = new Map<string, { name: string; streak: number; totalActions: number; paid: boolean }>();
  const currentDays = new Map<string, number>();

  for (let index = 0; index < userIds.length; index += 500) {
    const batch = userIds.slice(index, index + 500);
    const [{ data: profileRows }, { data: progressRows }] = await Promise.all([
      admin.from("profile_stats").select("user_id, display_name, username, current_streak, total_actions, is_paid").in("user_id", batch),
      admin.from("bible_year_day_progress").select("user_id, day_number, reading_completed").in("user_id", batch),
    ]);
    for (const profile of profileRows || []) {
      const userId = String(profile.user_id || "");
      if (!userId) continue;
      profiles.set(userId, {
        name: String(profile.display_name || profile.username || `User ${userId.slice(0, 8)}`),
        streak: Number(profile.current_streak || 0),
        totalActions: Number(profile.total_actions || 0),
        paid: profile.is_paid === true,
      });
    }
    for (const progress of progressRows || []) {
      const userId = String(progress.user_id || "");
      const day = Number(progress.day_number || 0);
      if (!userId || !day) continue;
      const candidate = progress.reading_completed ? Math.min(365, day + 1) : day;
      currentDays.set(userId, Math.max(currentDays.get(userId) || 1, candidate));
    }
  }

  for (const row of actions) {
    if (!row.user_id) continue;
    const day = parseDay(row);
    if (day) currentDays.set(row.user_id, Math.max(currentDays.get(row.user_id) || 1, day));
  }

  const nameFor = (row: MasterActionRow) => row.user_id
    ? profiles.get(row.user_id)?.name || row.username || `User ${row.user_id.slice(0, 8)}`
    : row.username || (row.session_id ? `Guest ${row.session_id.slice(0, 8)}` : "Unknown user");

  const actionRows = actions.map((row, index) => ({
    id: String(row.id || `${row.action_type}-${row.created_at}-${index}`),
    actorId: row.user_id || (row.session_id ? `guest:${row.session_id}` : `unknown:${row.username || index}`),
    userId: row.user_id || null,
    userLabel: nameFor(row),
    actionType: row.action_type || "tracked_action",
    actionTitle: actionTitle(row),
    detail: actionDetail(row),
    dayNumber: parseDay(row),
    createdAt: row.created_at || "",
  }));

  const mainActionRows = dedupeActionRows(actions
    .map((row, index) => {
      const normalizedType = normalizeActionTypeForMainLog(row);
      if (!normalizedType || !MAIN_ACTION_LOG_ALLOWLIST.has(normalizedType)) return null;
      const normalizedRow: MasterActionRow = { ...row, action_type: normalizedType };
      return {
        id: String(row.id || `${normalizedType}-${row.created_at}-${index}`),
        actorId: row.user_id || (row.session_id ? `guest:${row.session_id}` : `unknown:${row.username || index}`),
        userId: row.user_id || null,
        userLabel: nameFor(row),
        actionType: normalizedType,
        actionTitle: actionTitle(normalizedRow),
        detail: actionDetail(normalizedRow),
        dayNumber: parseDay(normalizedRow),
        createdAt: row.created_at || "",
      };
    })
    .filter((row): row is {
      id: string;
      userId: string | null;
      userLabel: string;
      actorId: string;
      actionType: string;
      actionTitle: string;
      detail: string;
      dayNumber: number | null;
      createdAt: string;
    } => Boolean(row)));

  const actionRowsByActor = new Map<string, typeof mainActionRows>();
  for (const row of mainActionRows) {
    actionRowsByActor.set(row.actorId, [...(actionRowsByActor.get(row.actorId) || []), row]);
  }

  const sortedMainActionRows = Array.from(actionRowsByActor.entries())
    .map(([actorId, rows]) => {
      const sortedRows = [...rows].sort((left, right) => {
        const timeDiff = new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
        if (timeDiff !== 0) return timeDiff;
        const leftDay = left.dayNumber || 0;
        const rightDay = right.dayNumber || 0;
        if (leftDay !== rightDay) return leftDay - rightDay;
        const rankDiff = actionOrderRank(left.actionType) - actionOrderRank(right.actionType);
        if (rankDiff !== 0) return rankDiff;
        return left.actionTitle.localeCompare(right.actionTitle);
      });
      return {
        actorId,
        rows: sortedRows,
        lastActiveAt: sortedRows[sortedRows.length - 1]?.createdAt || "",
      };
    })
    .sort((left, right) => right.lastActiveAt.localeCompare(left.lastActiveAt))
    .flatMap((group) => group.rows);

  const grouped = new Map<string, typeof actionRows>();
  actionRows.forEach((row) => {
    grouped.set(row.actorId, [...(grouped.get(row.actorId) || []), row]);
  });
  const activeUsers = Array.from(grouped.entries()).map(([key, rows]) => {
    const first = rows[0];
    const profile = first.userId ? profiles.get(first.userId) : undefined;
    return {
      actorId: key,
      userId: first.userId,
      userLabel: first.userLabel,
      streak: profile?.streak || 0,
      currentDay: first.userId ? currentDays.get(first.userId) || 1 : null,
      totalActions: rows.length,
      lifetimeActions: profile?.totalActions || 0,
      accountType: profile?.paid ? "Pro" : first.userId ? "Free" : "Guest",
      lastAction: first.actionTitle,
      lastActiveAt: first.createdAt,
    };
  }).sort((left, right) => right.lastActiveAt.localeCompare(left.lastActiveAt));

  const signupActions = new Map(actions.filter((row) => row.action_type === "user_signup" && row.user_id).map((row) => [row.user_id as string, row]));
  const signups: Array<{ userId: string; userLabel: string; source: string; currentDay: number; accountType: string; createdAt: string }> = [];
  let page = 1;
  while (page <= 20) {
    const { data } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    const users = data?.users || [];
    for (const user of users) {
      const createdAt = user.created_at || "";
      if (!createdAt || createdAt < start || (end && createdAt >= end) || user.id === ownerId) continue;
      const profile = profiles.get(user.id);
      signups.push({
        userId: user.id,
        userLabel: profile?.name || user.email?.split("@")[0] || `User ${user.id.slice(0, 8)}`,
        source: signupSource(signupActions.get(user.id)),
        currentDay: currentDays.get(user.id) || 1,
        accountType: profile?.paid ? "Pro" : user.is_anonymous ? "Guest" : "Free",
        createdAt,
      });
    }
    if (users.length < 1000) break;
    page += 1;
  }
  signups.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const daysCompleted = actionRows
    .filter((row) => row.actionType === "bible_in_one_year_day_completed")
    .map((row) => ({
      id: row.id,
      userId: row.userId,
      userLabel: row.userLabel,
      dayNumber: row.dayNumber,
      streak: row.userId ? profiles.get(row.userId)?.streak || 0 : 0,
      createdAt: row.createdAt,
    }));

  return NextResponse.json({
    window: windowKey,
    activeUsers,
    actions: sortedMainActionRows,
    signups,
    daysCompleted,
  }, { headers: { "Cache-Control": "private, max-age=15" } });
}
