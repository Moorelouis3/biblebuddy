import type { ProAccessProfile } from "./proAccess";
import { getProAccess } from "./proAccess";

export const GUIDED_CHAPTER_UNLOCK_HOURS = 24;

export type GuidedChapterAccessStatus = "active" | "completed_locked";

export type GuidedChapterAccessRow = {
  id?: string;
  user_id: string;
  devotional_id: string;
  day_number: number;
  bible_reading_book?: string | null;
  bible_reading_chapter?: number | null;
  started_at?: string | null;
  completed_at?: string | null;
  unlocks_at?: string | null;
  status: GuidedChapterAccessStatus;
  created_at?: string | null;
  updated_at?: string | null;
};

export type GuidedChapterTarget = {
  devotionalId: string;
  dayNumber: number;
  bibleReadingBook?: string | null;
  bibleReadingChapter?: number | null;
};

export type GuidedChapterAccessState = {
  isPro: boolean;
  canAccess: boolean;
  isLocked: boolean;
  activeRow: GuidedChapterAccessRow | null;
  lockedUntil: string | null;
  lockReason: "daily_limit" | "other_active_chapter" | null;
};

type SupabaseLike = {
  from: (table: string) => any;
};

let guidedChapterAccessTableUnavailable = false;

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

export function isGuidedChapterAccessUnavailable() {
  return guidedChapterAccessTableUnavailable;
}

export function isGuidedChapterAccessTableMissingError(error: unknown) {
  const typed = error as { code?: string | null; message?: string | null } | null | undefined;
  const message = String(typed?.message || "").toLowerCase();
  return (
    typed?.code === "PGRST205" ||
    typed?.code === "42P01" ||
    message.includes("guided_chapter_access") && (
      message.includes("could not find the table") ||
      message.includes("does not exist") ||
      message.includes("schema cache")
    )
  );
}

export function noteGuidedChapterAccessError(error: unknown) {
  if (!isGuidedChapterAccessTableMissingError(error)) return false;
  guidedChapterAccessTableUnavailable = true;
  console.warn("[GUIDED_CHAPTER_ACCESS] Table is unavailable; guided locks are temporarily bypassed.");
  return true;
}

function isSameTarget(row: GuidedChapterAccessRow | null | undefined, target: GuidedChapterTarget) {
  return Boolean(row && row.devotional_id === target.devotionalId && row.day_number === target.dayNumber);
}

function isFuture(value: string | null | undefined, now = new Date()) {
  if (!value) return false;
  const time = new Date(value).getTime();
  return Number.isFinite(time) && time > now.getTime();
}

export function formatGuidedUnlockCountdown(unlocksAt: string | null | undefined, now = new Date()) {
  if (!unlocksAt) return "soon";
  const ms = Math.max(0, new Date(unlocksAt).getTime() - now.getTime());
  const totalMinutes = Math.ceil(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours <= 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

async function fetchBlockingGuidedRows(supabase: SupabaseLike, userId: string) {
  if (guidedChapterAccessTableUnavailable) return [] as GuidedChapterAccessRow[];

  const { data, error } = await supabase
    .from("guided_chapter_access")
    .select("*")
    .eq("user_id", userId)
    .in("status", ["active", "completed_locked"])
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    if (noteGuidedChapterAccessError(error)) return [] as GuidedChapterAccessRow[];
    console.error("[GUIDED_CHAPTER_ACCESS] Could not read guided access rows:", error);
    return [] as GuidedChapterAccessRow[];
  }

  return (data || []) as GuidedChapterAccessRow[];
}

export async function getGuidedChapterAccessState({
  supabase,
  userId,
  profile,
  target,
  now = new Date(),
}: {
  supabase: SupabaseLike;
  userId: string;
  profile: ProAccessProfile | null | undefined;
  target: GuidedChapterTarget;
  now?: Date;
}): Promise<GuidedChapterAccessState> {
  const proAccess = getProAccess(profile);
  if (proAccess.hasAccess) {
    return {
      isPro: true,
      canAccess: true,
      isLocked: false,
      activeRow: null,
      lockedUntil: null,
      lockReason: null,
    };
  }

  const rows = await fetchBlockingGuidedRows(supabase, userId);
  const activeRow = rows.find((row) => row.status === "active");
  if (activeRow) {
    const canAccess = isSameTarget(activeRow, target);
    return {
      isPro: false,
      canAccess,
      isLocked: !canAccess,
      activeRow,
      lockedUntil: null,
      lockReason: canAccess ? null : "other_active_chapter",
    };
  }

  const lockedRow = rows.find((row) => row.status === "completed_locked" && isFuture(row.unlocks_at, now));
  if (lockedRow) {
    const canAccess = isSameTarget(lockedRow, target);
    return {
      isPro: false,
      canAccess,
      isLocked: !canAccess,
      activeRow: lockedRow,
      lockedUntil: lockedRow.unlocks_at ?? null,
      lockReason: canAccess ? null : "daily_limit",
    };
  }

  return {
    isPro: false,
    canAccess: true,
    isLocked: false,
    activeRow: null,
    lockedUntil: null,
    lockReason: null,
  };
}

export async function ensureGuidedChapterStarted({
  supabase,
  userId,
  profile,
  target,
}: {
  supabase: SupabaseLike;
  userId: string;
  profile: ProAccessProfile | null | undefined;
  target: GuidedChapterTarget;
}) {
  if (getProAccess(profile).hasAccess) return null;
  if (guidedChapterAccessTableUnavailable) return null;

  const now = new Date().toISOString();
  const payload = {
    user_id: userId,
    devotional_id: target.devotionalId,
    day_number: target.dayNumber,
    bible_reading_book: target.bibleReadingBook ?? null,
    bible_reading_chapter: target.bibleReadingChapter ?? null,
    started_at: now,
    status: "active" as GuidedChapterAccessStatus,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from("guided_chapter_access")
    .upsert(payload, { onConflict: "user_id,devotional_id,day_number" })
    .select("*")
    .maybeSingle();

  if (error) {
    if (noteGuidedChapterAccessError(error)) return null;
    console.error("[GUIDED_CHAPTER_ACCESS] Could not start guided chapter:", error);
    return null;
  }

  return (data || null) as GuidedChapterAccessRow | null;
}

export async function completeGuidedChapterAccess({
  supabase,
  userId,
  profile,
  target,
  now = new Date(),
}: {
  supabase: SupabaseLike;
  userId: string;
  profile: ProAccessProfile | null | undefined;
  target: GuidedChapterTarget;
  now?: Date;
}) {
  if (getProAccess(profile).hasAccess) return null;
  if (guidedChapterAccessTableUnavailable) return null;

  const completedAt = now.toISOString();
  const unlocksAt = addHours(now, GUIDED_CHAPTER_UNLOCK_HOURS).toISOString();

  const payload = {
    user_id: userId,
    devotional_id: target.devotionalId,
    day_number: target.dayNumber,
    bible_reading_book: target.bibleReadingBook ?? null,
    bible_reading_chapter: target.bibleReadingChapter ?? null,
    started_at: completedAt,
    completed_at: completedAt,
    unlocks_at: unlocksAt,
    status: "completed_locked" as GuidedChapterAccessStatus,
    updated_at: completedAt,
  };

  const { data, error } = await supabase
    .from("guided_chapter_access")
    .upsert(payload, { onConflict: "user_id,devotional_id,day_number" })
    .select("*")
    .maybeSingle();

  if (error) {
    if (noteGuidedChapterAccessError(error)) return null;
    console.error("[GUIDED_CHAPTER_ACCESS] Could not complete guided chapter:", error);
    return null;
  }

  return (data || null) as GuidedChapterAccessRow | null;
}
