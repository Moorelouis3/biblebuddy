export const LOUIS_DAILY_TASK_FLOW_VERSION = 1;
export const LOUIS_DAILY_TASK_WINDOW_MS = 24 * 60 * 60 * 1000;
export const LOUIS_SECOND_RECOMMENDATION_DELAY_MS = 6 * 60 * 60 * 1000;

function getDailyTaskCycleKey(userId: string) {
  return `bb:louis:daily-task-cycle:${LOUIS_DAILY_TASK_FLOW_VERSION}:${userId}`;
}

function getSecondRecommendationSeenKey(userId: string, cycleStartedAt: string) {
  return `bb:louis:daily-task-second:${LOUIS_DAILY_TASK_FLOW_VERSION}:${userId}:${cycleStartedAt}`;
}

function isWithinActiveWindow(iso: string | null | undefined) {
  if (!iso) return false;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return false;
  const elapsed = Date.now() - parsed.getTime();
  return elapsed >= 0 && elapsed < LOUIS_DAILY_TASK_WINDOW_MS;
}

export function getLouisDailyTaskCycleStartedAt(userId: string) {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(getDailyTaskCycleKey(userId));
  if (!isWithinActiveWindow(stored)) {
    if (stored) {
      window.localStorage.removeItem(getDailyTaskCycleKey(userId));
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

  const next = new Date().toISOString();
  window.localStorage.setItem(getDailyTaskCycleKey(userId), next);
  return next;
}

export function getLouisDailyTaskTimeLeftMs(userId: string) {
  const cycleStartedAt = getLouisDailyTaskCycleStartedAt(userId);
  if (!cycleStartedAt) return 0;
  const elapsed = Date.now() - new Date(cycleStartedAt).getTime();
  return Math.max(0, LOUIS_DAILY_TASK_WINDOW_MS - elapsed);
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
