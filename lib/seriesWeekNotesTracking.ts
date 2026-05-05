import { ACTION_TYPE } from "./actionTypes";

export const SERIES_WEEK_NOTES_FALLBACK_PREFIX = "Weekly Notes Opened:";

export function getSeriesWeekNotesLabel(seriesTitle: string | null | undefined, weekNumber: number): string {
  return `${seriesTitle || "Bible Series"} Week ${weekNumber} Notes`;
}

export function getSeriesWeekNotesFallbackLabel(seriesTitle: string | null | undefined, weekNumber: number): string {
  return `${SERIES_WEEK_NOTES_FALLBACK_PREFIX} ${getSeriesWeekNotesLabel(seriesTitle, weekNumber)}`;
}

export function isSeriesWeekNotesActionEvent(
  actionType: string | null | undefined,
  actionLabel: string | null | undefined
): boolean {
  if (actionType === ACTION_TYPE.series_week_notes_opened) return true;
  return actionType === ACTION_TYPE.study_group_article_opened
    && typeof actionLabel === "string"
    && actionLabel.startsWith(`${SERIES_WEEK_NOTES_FALLBACK_PREFIX} `);
}

export function matchesSeriesWeekNotesActionLabel(
  actionLabel: string | null | undefined,
  seriesTitle: string | null | undefined,
  weekNumber: number
): boolean {
  const primary = getSeriesWeekNotesLabel(seriesTitle, weekNumber);
  const fallback = getSeriesWeekNotesFallbackLabel(seriesTitle, weekNumber);
  return actionLabel === primary || actionLabel === fallback;
}

export function parseSeriesWeekNotesWeekNumber(
  actionLabel: string | null | undefined,
  seriesTitle?: string | null
): number | null {
  if (!actionLabel) return null;

  const primaryPrefix = `${seriesTitle || "Bible Series"} Week `;
  if (actionLabel.startsWith(primaryPrefix) && actionLabel.endsWith(" Notes")) {
    const raw = actionLabel.slice(primaryPrefix.length, -6).trim();
    const week = Number(raw);
    return Number.isFinite(week) && week > 0 ? week : null;
  }

  const fallbackPrefix = `${SERIES_WEEK_NOTES_FALLBACK_PREFIX} ${seriesTitle || "Bible Series"} Week `;
  if (actionLabel.startsWith(fallbackPrefix) && actionLabel.endsWith(" Notes")) {
    const raw = actionLabel.slice(fallbackPrefix.length, -6).trim();
    const week = Number(raw);
    return Number.isFinite(week) && week > 0 ? week : null;
  }

  const genericMatch = actionLabel.match(/Week (\d+) Notes$/);
  if (!genericMatch) return null;
  const week = Number(genericMatch[1]);
  return Number.isFinite(week) && week > 0 ? week : null;
}
