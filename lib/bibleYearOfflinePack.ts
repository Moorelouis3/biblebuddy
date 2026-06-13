import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES, generateBibleInOneYearPlan, getBibleYearDayCoverImage, type ChapterAssignment } from "./bibleInOneYearPlan";
import { getBibleYearDayContent, type BibleYearSummaryContent } from "./bibleYearDaysContent";

export const BIBLE_YEAR_OFFLINE_TEXT_PACK_KEY = "bb:bible-year-offline-text-pack";
export const BIBLE_YEAR_OFFLINE_TEXT_PACK_VERSION = "2026-05-25-v1";

type BibleYearOfflineDay = {
  dayNumber: number;
  title: string;
  reference: string;
  summary: string;
  estimatedTime?: string;
  coverImage?: string;
  chapters: ChapterAssignment[];
  summaryContent?: BibleYearSummaryContent;
  studyNotesMarkdown?: string | null;
  studyNotesSections?: unknown[] | null;
  discussionPrompt?: string;
};

export type BibleYearOfflineTextPack = {
  version: string;
  cachedAt: string;
  totalDays: number;
  totalChapters: number;
  days: BibleYearOfflineDay[];
};

function formatReference(chapters: ChapterAssignment[]) {
  if (!chapters.length) return "Bible Reading";
  const first = chapters[0];
  const last = chapters[chapters.length - 1];
  if (!first || !last) return "Bible Reading";
  if (first.book === last.book) {
    return first.chapter === last.chapter ? `${first.book} ${first.chapter}` : `${first.book} ${first.chapter}-${last.chapter}`;
  }
  return `${first.book} ${first.chapter} - ${last.book} ${last.chapter}`;
}

function buildFallbackDayTitle(chapters: ChapterAssignment[]) {
  const reference = formatReference(chapters);
  return `Bible Reading: ${reference}`;
}

export function buildBibleYearOfflineTextPack(): BibleYearOfflineTextPack {
  const fullPlan = generateBibleInOneYearPlan();
  const genesisDays = new Map(GENESIS_BIBLE_IN_ONE_YEAR_SERIES.map((day) => [day.dayNumber, day]));
  const days = fullPlan.weeks.flatMap((week) =>
    week.days.map((planDay) => {
      const builtDay = genesisDays.get(planDay.dayNumber) || null;
      const content = builtDay ? getBibleYearDayContent(builtDay) : null;
      const reference = builtDay?.reference || formatReference(planDay.chapters);

      return {
        dayNumber: planDay.dayNumber,
        title: builtDay?.title || buildFallbackDayTitle(planDay.chapters),
        reference,
        summary: builtDay?.summary || `Read ${reference} as part of your Bible in One Year journey.`,
        estimatedTime: builtDay?.estimatedTime,
        coverImage: getBibleYearDayCoverImage(builtDay),
        chapters: planDay.chapters,
        summaryContent: content?.summary,
        studyNotesMarkdown: content?.studyNotesMarkdown,
        studyNotesSections: content?.studyNotesSections,
        discussionPrompt: content?.discussionPrompt,
      };
    }),
  );

  return {
    version: BIBLE_YEAR_OFFLINE_TEXT_PACK_VERSION,
    cachedAt: new Date().toISOString(),
    totalDays: fullPlan.totalDays,
    totalChapters: fullPlan.totalChapters,
    days,
  };
}

export function cacheBibleYearOfflineTextPack() {
  if (typeof window === "undefined") return null;
  const pack = buildBibleYearOfflineTextPack();
  try {
    window.localStorage.setItem(BIBLE_YEAR_OFFLINE_TEXT_PACK_KEY, JSON.stringify(pack));
  } catch (error) {
    console.warn("[BIBLE_YEAR_OFFLINE] Could not cache text pack:", error);
  }
  return pack;
}
