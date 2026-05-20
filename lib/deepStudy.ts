import type { AppThemeId } from "./appThemes";
import type { PremiumSkinId } from "./premiumSkins";

export type DeepStudyTaskKind = "devotional" | "reading" | "notes" | "trivia" | "scrambled" | "reflection";

export type DeepStudySessionSummary = {
  id: string;
  userId: string;
  dayKey: string;
  startedAt: string;
  endedAt: string;
  plannedMinutes: number;
  shareDisplayMinutes?: number;
  stoppedEarly?: boolean;
  activeMinutes: number;
  awayMinutes: number;
  interruptions: number;
  interactions: number;
  tasksCompleted: number;
  taskBreakdown: Record<DeepStudyTaskKind, number>;
  chaptersStudied: string[];
  focusScore: number;
  multiplier: number;
  streak: number;
  diamondsEarned: number;
  themeId: AppThemeId;
  skinId?: PremiumSkinId;
};

export type DeepStudyDailyStats = {
  sessions: number;
  totalMinutes: number;
  averageFocus: number;
  diamondsEarned: number;
};

export const DEEP_STUDY_DIAMONDS_PER_MINUTE = 10;
export const DEEP_STUDY_HISTORY_LIMIT = 120;

export function getDeepStudyHistoryKey(userId: string) {
  return `bb:deep-study-history:${userId}`;
}

export function getDeepStudyLocalDayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function getDeepStudyMultiplier(streak: number) {
  if (streak >= 100) return 2.5;
  if (streak >= 60) return 2.25;
  if (streak >= 30) return 2;
  if (streak >= 14) return 1.75;
  if (streak >= 7) return 1.5;
  if (streak >= 3) return 1.2;
  return 1;
}

export function getDeepStudyRank(totalMinutes: number, averageFocus: number, streak: number) {
  if (totalMinutes >= 45 && averageFocus >= 85 && streak >= 7) return "Rooted";
  if (totalMinutes >= 30 && averageFocus >= 80) return "Locked In";
  if (totalMinutes >= 20 && averageFocus >= 70) return "Deep Focus";
  if (totalMinutes >= 10 && averageFocus >= 60) return "Focused";
  return "Light Study";
}

export function loadDeepStudyHistory(userId: string): DeepStudySessionSummary[] {
  if (typeof window === "undefined" || !userId) return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(getDeepStudyHistoryKey(userId)) || "[]");
    return Array.isArray(parsed) ? parsed.filter((session) => session?.id && session?.dayKey) : [];
  } catch {
    return [];
  }
}

export function saveDeepStudySession(summary: DeepStudySessionSummary) {
  if (typeof window === "undefined" || !summary.userId) return;
  const history = loadDeepStudyHistory(summary.userId).filter((session) => session.id !== summary.id);
  const nextHistory = [summary, ...history]
    .sort((a, b) => new Date(b.endedAt).getTime() - new Date(a.endedAt).getTime())
    .slice(0, DEEP_STUDY_HISTORY_LIMIT);
  window.localStorage.setItem(getDeepStudyHistoryKey(summary.userId), JSON.stringify(nextHistory));
}

export function getDeepStudyStreak(history: DeepStudySessionSummary[], todayKey = getDeepStudyLocalDayKey()) {
  const completedDays = new Set(history.map((session) => session.dayKey).filter(Boolean));
  let streak = 0;
  const cursor = parseDayKey(todayKey);
  while (completedDays.has(formatDayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function getDeepStudyDailyStats(history: DeepStudySessionSummary[], dayKey: string): DeepStudyDailyStats {
  const sessions = history.filter((session) => session.dayKey === dayKey);
  const totalMinutes = sessions.reduce((sum, session) => sum + Math.max(0, session.activeMinutes), 0);
  const focusWeightedMinutes = sessions.reduce((sum, session) => sum + Math.max(0, session.activeMinutes) * Math.max(0, session.focusScore), 0);
  return {
    sessions: sessions.length,
    totalMinutes,
    averageFocus: totalMinutes > 0 ? Math.round(focusWeightedMinutes / totalMinutes) : 0,
    diamondsEarned: sessions.reduce((sum, session) => sum + Math.max(0, session.diamondsEarned), 0),
  };
}

export function buildEmptyTaskBreakdown(): Record<DeepStudyTaskKind, number> {
  return {
    devotional: 0,
    reading: 0,
    notes: 0,
    trivia: 0,
    scrambled: 0,
    reflection: 0,
  };
}

function parseDayKey(dayKey: string) {
  const [year, month, day] = dayKey.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

function formatDayKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
