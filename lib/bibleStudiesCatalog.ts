export type BibleStudyCatalogItem = {
  key: string;
  title: string;
  subtitle: string;
  totalChapters: number;
  image: string;
  description: string;
};

export const BIBLE_STUDY_GROUP_ID = "165bada5-0900-44f1-963b-54e86fe64b39";

export const BIBLE_STUDIES_CATALOG: BibleStudyCatalogItem[] = [
  {
    key: "obedience_of_abraham",
    title: "The Obedience of Abraham",
    subtitle: "15-chapter Bible study",
    totalChapters: 15,
    image: "/TheobedienceofAbraham.png",
    description:
      "A chapter-by-chapter Bible study through Genesis 11-25 with intro, reading, notes, trivia, Scrambled, and reflection centered on Abraham's call, waiting, covenant, testing, and legacy.",
  },
  {
    key: "testing_of_joseph",
    title: "The Testing of Joseph",
    subtitle: "14-chapter Bible study",
    totalChapters: 14,
    image: "/TheTestingofJospehnewcover.png",
    description:
      "A chapter-by-chapter Bible study through Genesis 37-50 with intro, reading, notes, trivia, Scrambled, and reflection all centered on Joseph's story.",
  },
  {
    key: "wisdom_of_proverbs",
    title: "The Wisdom of Proverbs",
    subtitle: "31-chapter Bible study",
    totalChapters: 31,
    image: "/Wisdomofproverbsnewcover.png",
    description:
      "A chapter-by-chapter Bible study through Proverbs focused on wisdom, speech, relationships, self-control, money, and daily decision making.",
  },
  {
    key: "temptation_of_jesus",
    title: "The Temptation of Jesus",
    subtitle: "5-part Bible study",
    totalChapters: 5,
    image: "/TheTemptingofjesusstudy.png",
    description:
      "A guided Bible study through Jesus in the wilderness, showing how truth, obedience, and identity hold steady under pressure.",
  },
];

export type BibleStudySeriesCatalogItem = BibleStudyCatalogItem;
export const BIBLE_STUDY_SERIES_CATALOG = BIBLE_STUDIES_CATALOG;

export function getBibleStudySeriesCover(title: string | null | undefined): string | null {
  const normalizedTitle = normalizeBibleStudySeriesTitle(title);
  const match = BIBLE_STUDIES_CATALOG.find(
    (study) => normalizeBibleStudySeriesTitle(study.title) === normalizedTitle,
  );
  return match?.image ?? null;
}

export function normalizeBibleStudySeriesTitle(title: string | null | undefined) {
  return (title || "").trim().toLowerCase();
}
