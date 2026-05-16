import { getBibleBuddyLocalDayKey } from "./louisDailyFlow";

export type FreeChapterUnlockTarget = {
  devotionalId: string;
  dayNumber: number;
  chapterLabel?: string | null;
};

type StoredFreeChapterUnlock = FreeChapterUnlockTarget & {
  dayKey: string;
};

const FREE_CHAPTER_UNLOCK_VERSION = 1;

function getFreeChapterUnlockKey(userId: string) {
  return `bb:free-plan:chapter-unlock:${FREE_CHAPTER_UNLOCK_VERSION}:${userId}`;
}

export function getNextLocalDayStartMs(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0, 0).getTime();
}

export function formatFreePlanCountdown(ms: number) {
  const safeMs = Math.max(0, ms);
  const totalMinutes = Math.ceil(safeMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  if (minutes === 0) return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  return `${hours} ${hours === 1 ? "hour" : "hours"} and ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
}

export function getFreeChapterUnlock(userId: string | null | undefined): StoredFreeChapterUnlock | null {
  if (!userId || typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(getFreeChapterUnlockKey(userId));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredFreeChapterUnlock;
    if (!parsed?.dayKey || !parsed.devotionalId || typeof parsed.dayNumber !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function rememberFreeChapterUnlock(userId: string | null | undefined, target: FreeChapterUnlockTarget) {
  if (!userId || typeof window === "undefined" || !target.devotionalId || !target.dayNumber) return;
  window.localStorage.setItem(
    getFreeChapterUnlockKey(userId),
    JSON.stringify({
      ...target,
      dayKey: getBibleBuddyLocalDayKey(),
    }),
  );
}

export function canFreeUserUnlockChapter(userId: string | null | undefined, target: FreeChapterUnlockTarget) {
  const today = getBibleBuddyLocalDayKey();
  const stored = getFreeChapterUnlock(userId);
  if (!stored || stored.dayKey !== today) return true;

  return stored.devotionalId === target.devotionalId && stored.dayNumber === target.dayNumber;
}
