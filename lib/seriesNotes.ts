import { getSeriesKeyFromTitle } from "./seriesContent";

export function hasLazySeriesNotes(seriesTitle: string | null | undefined, weekNumber: number): boolean {
  const seriesKey = getSeriesKeyFromTitle(seriesTitle);

  if (seriesKey === "testing_of_joseph") {
    return weekNumber === 1 || weekNumber === 2;
  }

  return false;
}

export async function loadSeriesNotesContent(
  seriesTitle: string | null | undefined,
  weekNumber: number,
  fallbackNotes?: string | null,
): Promise<string | null> {
  const seriesKey = getSeriesKeyFromTitle(seriesTitle);

  if (seriesKey === "testing_of_joseph") {
    if (weekNumber === 1) {
      const mod = await import("./testingOfJosephWeekOneNotes");
      return mod.TESTING_OF_JOSEPH_WEEK_ONE_NOTES;
    }

    if (weekNumber === 2) {
      const mod = await import("./testingOfJosephWeekTwoNotes");
      return mod.TESTING_OF_JOSEPH_WEEK_TWO_NOTES;
    }
  }

  return fallbackNotes ?? null;
}
