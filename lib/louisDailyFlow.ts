export const LOUIS_DAILY_TASK_FLOW_VERSION = 2;
export const LOUIS_SECOND_RECOMMENDATION_DELAY_MS = 6 * 60 * 60 * 1000;

export type LouisDailyTaskTarget = {
  devotionalId: string;
  dayNumber: number;
};

function getLocalDayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getLocalDayStartIso(date = new Date()) {
  const localMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  return localMidnight.toISOString();
}

function getNextLocalDayStartMs(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0, 0).getTime();
}

function getDailyTaskCycleKey(userId: string) {
  return `bb:louis:daily-task-cycle:${LOUIS_DAILY_TASK_FLOW_VERSION}:${userId}`;
}

function getDailyTaskTargetKey(userId: string, cycleStartedAt: string) {
  return `bb:louis:daily-task-target:${LOUIS_DAILY_TASK_FLOW_VERSION}:${userId}:${cycleStartedAt}`;
}

function getSecondRecommendationSeenKey(userId: string, cycleStartedAt: string) {
  return `bb:louis:daily-task-second:${LOUIS_DAILY_TASK_FLOW_VERSION}:${userId}:${cycleStartedAt}`;
}

function getDailyTaskBonusAwardedKey(userId: string, cycleStartedAt: string) {
  return `bb:louis:daily-task-bonus:${LOUIS_DAILY_TASK_FLOW_VERSION}:${userId}:${cycleStartedAt}`;
}

function getDailyTaskCelebrationSeenKey(userId: string, cycleStartedAt: string) {
  return `bb:louis:daily-task-celebration:${LOUIS_DAILY_TASK_FLOW_VERSION}:${userId}:${cycleStartedAt}`;
}

function clearDailyTaskScopedKeys(userId: string) {
  if (typeof window === "undefined") return;
  const prefixes = [
    `bb:louis:daily-task-target:${LOUIS_DAILY_TASK_FLOW_VERSION}:${userId}:`,
    `bb:louis:daily-task-second:${LOUIS_DAILY_TASK_FLOW_VERSION}:${userId}:`,
    `bb:louis:daily-task-bonus:${LOUIS_DAILY_TASK_FLOW_VERSION}:${userId}:`,
    `bb:louis:daily-task-celebration:${LOUIS_DAILY_TASK_FLOW_VERSION}:${userId}:`,
  ];

  for (let index = window.localStorage.length - 1; index >= 0; index -= 1) {
    const key = window.localStorage.key(index);
    if (key && prefixes.some((prefix) => key.startsWith(prefix))) {
      window.localStorage.removeItem(key);
    }
  }
}

export function getBibleBuddyLocalDayKey(date = new Date()) {
  return getLocalDayKey(date);
}

export function getBibleBuddyLocalDayStartIso(date = new Date()) {
  return getLocalDayStartIso(date);
}

export function getLouisDailyTaskCycleStartedAt(userId: string) {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(getDailyTaskCycleKey(userId));
  const expected = getLocalDayStartIso();

  if (stored !== expected) {
    if (stored) {
      window.localStorage.removeItem(getDailyTaskCycleKey(userId));
      clearDailyTaskScopedKeys(userId);
    }
    return null;
  }

  return stored;
}

export function hasActiveLouisDailyTaskCycle(userId: string) {
  return Boolean(getLouisDailyTaskCycleStartedAt(userId));
}

export function ensureLouisDailyTaskCycle(userId: string) {
  if (typeof window === "undefined") return null;
  const existing = getLouisDailyTaskCycleStartedAt(userId);
  if (existing) return existing;

  const next = getLocalDayStartIso();
  window.localStorage.setItem(getDailyTaskCycleKey(userId), next);
  return next;
}

export function getLouisDailyTaskTimeLeftMs(userId: string) {
  const cycleStartedAt = getLouisDailyTaskCycleStartedAt(userId);
  if (!cycleStartedAt) return 0;
  return Math.max(0, getNextLocalDayStartMs() - Date.now());
}

export function getLouisDailyTaskTarget(userId: string, cycleStartedAt: string) {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(getDailyTaskTargetKey(userId, cycleStartedAt));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as LouisDailyTaskTarget;
    if (!parsed?.devotionalId || typeof parsed.dayNumber !== "number") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function rememberLouisDailyTaskTarget(userId: string, cycleStartedAt: string, target: LouisDailyTaskTarget) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getDailyTaskTargetKey(userId, cycleStartedAt), JSON.stringify(target));
}

export function hasLouisDailyTaskBonusAwarded(userId: string, cycleStartedAt: string) {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getDailyTaskBonusAwardedKey(userId, cycleStartedAt)) === "1";
}

export function rememberLouisDailyTaskBonusAwarded(userId: string, cycleStartedAt: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getDailyTaskBonusAwardedKey(userId, cycleStartedAt), "1");
}

export function hasSeenLouisDailyTaskCelebration(userId: string, cycleStartedAt: string) {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getDailyTaskCelebrationSeenKey(userId, cycleStartedAt)) === "1";
}

export function rememberLouisDailyTaskCelebrationSeen(userId: string, cycleStartedAt: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getDailyTaskCelebrationSeenKey(userId, cycleStartedAt), "1");
}

export function hasSeenLouisSecondRecommendation(userId: string) {
  if (typeof window === "undefined") return false;
  const cycleStartedAt = getLouisDailyTaskCycleStartedAt(userId);
  if (!cycleStartedAt) return false;
  return window.localStorage.getItem(getSecondRecommendationSeenKey(userId, cycleStartedAt)) === "1";
}

export function rememberLouisSecondRecommendationSeen(userId: string) {
  if (typeof window === "undefined") return;
  const cycleStartedAt = getLouisDailyTaskCycleStartedAt(userId);
  if (!cycleStartedAt) return;
  window.localStorage.setItem(getSecondRecommendationSeenKey(userId, cycleStartedAt), "1");
}

export function isLouisSecondRecommendationReady(userId: string) {
  const cycleStartedAt = getLouisDailyTaskCycleStartedAt(userId);
  if (!cycleStartedAt) return false;
  if (hasSeenLouisSecondRecommendation(userId)) return false;
  const elapsed = Date.now() - new Date(cycleStartedAt).getTime();
  return elapsed >= LOUIS_SECOND_RECOMMENDATION_DELAY_MS;
}
