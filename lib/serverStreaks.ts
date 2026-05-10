import type { SupabaseClient } from "@supabase/supabase-js";
import { ACTION_TYPE } from "./actionTypes";

export const STREAK_TIME_ZONE = "America/New_York";

function resolveStreakTimeZone(timeZone?: string) {
  if (!timeZone) return STREAK_TIME_ZONE;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return timeZone;
  } catch {
    return STREAK_TIME_ZONE;
  }
}

export function getStreakDateKey(dateInput: Date | string, timeZone?: string) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const resolvedTimeZone = resolveStreakTimeZone(timeZone);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: resolvedTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(date)
    .filter((part) => part.type !== "literal");

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value])) as Record<string, string>;
  return `${values.year}-${values.month}-${values.day}`;
}

export function calculateStreakFromCompletedDates(completedDates: Set<string>, timeZone?: string) {
  const resolvedTimeZone = resolveStreakTimeZone(timeZone);
  const today = new Date();
  const todayKey = getStreakDateKey(today, resolvedTimeZone);
  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayKey = getStreakDateKey(yesterday, resolvedTimeZone);

  let cursor: Date;
  if (completedDates.has(todayKey)) {
    cursor = new Date(`${todayKey}T12:00:00Z`);
  } else if (completedDates.has(yesterdayKey)) {
    cursor = new Date(`${yesterdayKey}T12:00:00Z`);
  } else {
    return 0;
  }

  let currentStreak = 0;
  let cursorKey = getStreakDateKey(cursor, resolvedTimeZone);

  while (completedDates.has(cursorKey)) {
    currentStreak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
    cursorKey = getStreakDateKey(cursor, resolvedTimeZone);
  }

  return currentStreak;
}

async function fetchAllMasterActionRows(
  supabase: SupabaseClient,
  userIds: string[],
  sinceIso: string,
) {
  const pageSize = 1000;
  let from = 0;
  const rows: Array<{ user_id: string | null; created_at: string; action_type: string }> = [];

  while (true) {
    const response = await supabase
      .from("master_actions")
      .select("user_id, created_at, action_type")
      .in("user_id", userIds)
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: false })
      .range(from, from + pageSize - 1);

    if (response.error) {
      throw response.error;
    }

    const chunk = response.data || [];
    rows.push(...chunk);

    if (chunk.length < pageSize) {
      break;
    }

    from += pageSize;
  }

  return rows;
}

async function fetchAllAppLoginRows(
  supabase: SupabaseClient,
  userIds: string[] | null,
  sinceIso: string,
) {
  const pageSize = 1000;
  let from = 0;
  const rows: Array<{ user_id: string | null; created_at: string }> = [];

  while (true) {
    let query = supabase
      .from("app_logins")
      .select("user_id, created_at")
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: false })
      .range(from, from + pageSize - 1);

    if (userIds?.length) {
      query = query.in("user_id", userIds);
    }

    const response = await query;

    if (response.error) {
      throw response.error;
    }

    const chunk = response.data || [];
    rows.push(...chunk);

    if (chunk.length < pageSize) {
      break;
    }

    from += pageSize;
  }

  return rows;
}

export async function getLiveStreakMapForUsers(
  supabase: SupabaseClient,
  userIds: string[],
  lookbackDays = 400,
  timeZone?: string,
) {
  const resolvedTimeZone = resolveStreakTimeZone(timeZone);
  const normalizedIds = Array.from(new Set(userIds.filter(Boolean)));
  if (normalizedIds.length === 0) return new Map<string, number>();

  const since = new Date();
  since.setUTCDate(since.getUTCDate() - lookbackDays);
  const sinceIso = since.toISOString();

  const [actionRows, appLoginRows] = await Promise.all([
    fetchAllMasterActionRows(supabase, normalizedIds, sinceIso),
    fetchAllAppLoginRows(supabase, normalizedIds, sinceIso),
  ]);

  const completedDatesByUser = new Map<string, Set<string>>();
  const ensureUserSet = (userId: string) => {
    let existing = completedDatesByUser.get(userId);
    if (!existing) {
      existing = new Set<string>();
      completedDatesByUser.set(userId, existing);
    }
    return existing;
  };

  actionRows.forEach((row) => {
    if (!row.user_id) return;
    if (row.action_type !== ACTION_TYPE.user_login) return;
    ensureUserSet(row.user_id).add(getStreakDateKey(row.created_at, resolvedTimeZone));
  });

  appLoginRows.forEach((row) => {
    if (!row.user_id) return;
    ensureUserSet(row.user_id).add(getStreakDateKey(row.created_at, resolvedTimeZone));
  });

  const streakMap = new Map<string, number>();
  normalizedIds.forEach((userId) => {
    streakMap.set(
      userId,
      calculateStreakFromCompletedDates(completedDatesByUser.get(userId) || new Set<string>(), resolvedTimeZone),
    );
  });

  return streakMap;
}

export async function getLiveStreakMapForRecentUsers(
  supabase: SupabaseClient,
  lookbackDays = 400,
  timeZone?: string,
) {
  const resolvedTimeZone = resolveStreakTimeZone(timeZone);
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - lookbackDays);
  const sinceIso = since.toISOString();

  const pageSize = 1000;
  const actionRows: Array<{ user_id: string | null; created_at: string; action_type: string }> = [];

  let from = 0;
  while (true) {
    const response = await supabase
      .from("master_actions")
      .select("user_id, created_at, action_type")
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: false })
      .range(from, from + pageSize - 1);

    if (response.error) {
      throw response.error;
    }

    const chunk = response.data || [];
    actionRows.push(...chunk);
    if (chunk.length < pageSize) break;
    from += pageSize;
  }

  const appLoginRows = await fetchAllAppLoginRows(supabase, null, sinceIso);

  const completedDatesByUser = new Map<string, Set<string>>();
  const ensureUserSet = (userId: string) => {
    let existing = completedDatesByUser.get(userId);
    if (!existing) {
      existing = new Set<string>();
      completedDatesByUser.set(userId, existing);
    }
    return existing;
  };

  actionRows.forEach((row) => {
    if (!row.user_id) return;
    if (row.action_type !== ACTION_TYPE.user_login) return;
    ensureUserSet(row.user_id).add(getStreakDateKey(row.created_at, resolvedTimeZone));
  });

  appLoginRows.forEach((row) => {
    if (!row.user_id) return;
    ensureUserSet(row.user_id).add(getStreakDateKey(row.created_at, resolvedTimeZone));
  });

  const streakMap = new Map<string, number>();
  completedDatesByUser.forEach((completedDates, userId) => {
    streakMap.set(userId, calculateStreakFromCompletedDates(completedDates, resolvedTimeZone));
  });

  return streakMap;
}
