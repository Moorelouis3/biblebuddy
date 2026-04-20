import { supabase } from "./supabaseClient";
import { getSeriesKeyFromTitle } from "./seriesContent";

export type SeriesNotesContent = string | string[] | null;
export type SeriesNotesPayload = {
  content: SeriesNotesContent;
  html?: string | null;
};

export function hasLazySeriesNotes(seriesTitle: string | null | undefined, weekNumber: number): boolean {
  const seriesKey = getSeriesKeyFromTitle(seriesTitle);

  if (seriesKey === "testing_of_joseph") {
    return weekNumber === 1 || weekNumber === 2 || weekNumber === 3 || weekNumber === 4 || weekNumber === 5 || weekNumber === 6 || weekNumber === 7 || weekNumber === 8 || weekNumber === 9 || weekNumber === 10 || weekNumber === 11 || weekNumber === 12 || weekNumber === 13 || weekNumber === 14;
  }

  return false;
}

export async function loadSeriesNotesContent(
  seriesTitle: string | null | undefined,
  weekNumber: number,
  fallbackNotes?: string | null,
): Promise<SeriesNotesPayload> {
  const seriesKey = getSeriesKeyFromTitle(seriesTitle);

  if (seriesKey) {
    const { data, error } = await supabase
      .from("series_week_notes")
      .select("notes_text, notes_html")
      .eq("series_key", seriesKey)
      .eq("week_number", weekNumber)
      .maybeSingle();

    if (!error && data && (data.notes_text || data.notes_html)) {
      return {
        content: data.notes_text ?? null,
        html: data.notes_html ?? null,
      };
    }
  }

  if (seriesKey === "testing_of_joseph") {
    if (weekNumber === 1) {
      const mod = await import("./testingOfJosephWeekOneNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_ONE_NOTES };
    }

    if (weekNumber === 2) {
      const mod = await import("./testingOfJosephWeekTwoNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_TWO_NOTES };
    }

    if (weekNumber === 3) {
      const mod = await import("./testingOfJosephWeekThreeNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_THREE_NOTES };
    }

    if (weekNumber === 4) {
      const mod = await import("./testingOfJosephWeekFourNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_FOUR_NOTES };
    }

    if (weekNumber === 5) {
      const mod = await import("./testingOfJosephWeekFiveNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_FIVE_NOTES };
    }

    if (weekNumber === 6) {
      const mod = await import("./testingOfJosephWeekSixNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_SIX_NOTES };
    }

    if (weekNumber === 7) {
      const mod = await import("./testingOfJosephWeekSevenNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_SEVEN_NOTES };
    }

    if (weekNumber === 8) {
      const mod = await import("./testingOfJosephWeekEightNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_EIGHT_NOTES };
    }

    if (weekNumber === 9) {
      const mod = await import("./testingOfJosephWeekNineNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_NINE_NOTES };
    }

    if (weekNumber === 10) {
      const mod = await import("./testingOfJosephWeekTenNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_TEN_NOTES };
    }

    if (weekNumber === 11) {
      const mod = await import("./testingOfJosephWeekElevenNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_ELEVEN_NOTES };
    }

    if (weekNumber === 12) {
      const mod = await import("./testingOfJosephWeekTwelveNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_TWELVE_NOTES };
    }

    if (weekNumber === 13) {
      const mod = await import("./testingOfJosephWeekThirteenNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_THIRTEEN_NOTES };
    }

    if (weekNumber === 14) {
      const mod = await import("./testingOfJosephWeekFourteenNotes");
      return { content: mod.TESTING_OF_JOSEPH_WEEK_FOURTEEN_NOTES };
    }
  }

  return { content: fallbackNotes ?? null };
}
