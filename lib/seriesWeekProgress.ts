export type SeriesWeekProgressState = {
  reading: boolean;
  notes: boolean;
  trivia: boolean;
  reflection: boolean;
};

export type SeriesWeekProgressRowLike = {
  reading_completed?: boolean | null;
  notes_completed?: boolean | null;
  trivia_completed?: boolean | null;
  reflection_posted?: boolean | null;
};

export const SERIES_WEEK_TOTAL_SECTIONS = 4;

export function toSeriesWeekProgressState(row?: SeriesWeekProgressRowLike | null): SeriesWeekProgressState {
  return {
    reading: row?.reading_completed === true,
    notes: row?.notes_completed === true,
    trivia: row?.trivia_completed === true,
    reflection: row?.reflection_posted === true,
  };
}

export function countCompletedSeriesWeekSections(progress: SeriesWeekProgressState): number {
  return [progress.reading, progress.notes, progress.trivia, progress.reflection].filter(Boolean).length;
}

export function isSeriesWeekComplete(progress: SeriesWeekProgressState): boolean {
  return progress.reading && progress.notes && progress.trivia && progress.reflection;
}
