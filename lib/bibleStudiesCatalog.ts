export type BibleStudySeriesCatalogItem = {
  key: string;
  title: string;
  subtitle: string;
  totalWeeks: number;
  image: string;
  description: string;
};

export const BIBLE_STUDY_GROUP_ID = "165bada5-0900-44f1-963b-54e86fe64b39";

export const BIBLE_STUDY_SERIES_CATALOG: BibleStudySeriesCatalogItem[] = [
  {
    key: "testing_of_joseph",
    title: "The Testing of Joseph",
    subtitle: "14-chapter Bible study",
    totalWeeks: 14,
    image: "/TheTestingofJospehnewcover.png",
    description:
      "A chapter-by-chapter Bible study through Genesis 37-50 with intro, reading, notes, trivia, Scrambled, and reflection all centered on Joseph's story.",
  },
  {
    key: "temptation_of_jesus",
    title: "The Temptation of Jesus",
    subtitle: "5-week group study",
    totalWeeks: 5,
    image: "/TheTemptingofjesusstudy.png",
    description:
      "A guided weekly Bible study through Jesus in the wilderness, showing how truth, obedience, and identity hold steady under pressure.",
  },
  {
    key: "wisdom_of_proverbs",
    title: "The Wisdom of Proverbs",
    subtitle: "31-week group study",
    totalWeeks: 31,
    image: "/Wisdomofproverbsnewcover.png",
    description:
      "A practical weekly Bible study through Proverbs focused on wisdom, speech, relationships, self-control, money, and daily decision making.",
  },
];

export function getBibleStudySeriesCover(title: string | null | undefined): string | null {
  const normalizedTitle = normalizeBibleStudySeriesTitle(title);
  const match = BIBLE_STUDY_SERIES_CATALOG.find(
    (series) => normalizeBibleStudySeriesTitle(series.title) === normalizedTitle,
  );
  return match?.image ?? null;
}

export function normalizeBibleStudySeriesTitle(title: string | null | undefined) {
  return (title || "").trim().toLowerCase();
}
