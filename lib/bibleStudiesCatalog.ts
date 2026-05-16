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
    key: "creation_of_the_world",
    title: "The Creation of the World",
    subtitle: "Genesis 1 & 2",
    totalWeeks: 2,
    image: "/creationoftheworld.png",
    description:
      "A chapter-by-chapter Bible study through Genesis 1-2 with intro, reading, notes, trivia, Scrambled, and reflection centered on creation, order, Eden, humanity in God's image, purpose, rest, and relationship with God.",
  },
  {
    key: "fall_of_man",
    title: "The Fall of Man",
    subtitle: "Genesis 3 & 4",
    totalWeeks: 2,
    image: "/thefallofman.png",
    description:
      "A chapter-by-chapter Bible study through Genesis 3-4 with intro, reading, notes, trivia, Scrambled, and reflection centered on temptation, shame, sin, blame, violence, exile, and the need for redemption.",
  },
  {
    key: "flood_of_noah",
    title: "The Flood of Noah",
    subtitle: "Genesis 5-10",
    totalWeeks: 6,
    image: "/Floodofnoah.png",
    description:
      "A chapter-by-chapter Bible study through Genesis 5-10 with intro, reading, notes, trivia, Scrambled, and reflection centered on death spreading after the fall, corruption, violence, judgment, Noah's obedience, the flood, covenant mercy, and the nations after the flood.",
  },
  {
    key: "obedience_of_abraham",
    title: "The Obedience of Abraham",
    subtitle: "Genesis 11-25",
    totalWeeks: 15,
    image: "/TheobedienceofAbraham.png",
    description:
      "A chapter-by-chapter Bible study through Genesis 11-25 with intro, reading, notes, trivia, Scrambled, and reflection centered on Abraham's call, waiting, covenant, testing, and legacy.",
  },
  {
    key: "promise_through_isaac",
    title: "The Promise Through Isaac",
    subtitle: "Genesis 26 & 27",
    totalWeeks: 2,
    image: "/ThePromiseThroughIsaac.png",
    description:
      "A chapter-by-chapter Bible study through Genesis 26-27 with intro, reading, notes, trivia, Scrambled, and reflection centered on Isaac carrying Abraham's covenant promise, wells, fear, favoritism, Jacob and Esau, deception, blessing, and family consequences.",
  },
  {
    key: "wrestling_of_jacob",
    title: "The Wrestling of Jacob",
    subtitle: "Genesis 28-36",
    totalWeeks: 9,
    image: "/TheWrestlingofJacob.png",
    description:
      "A chapter-by-chapter Bible study through Genesis 28-36 with intro, reading, notes, trivia, Scrambled, and reflection centered on Jacob fleeing, Bethel, Rachel and Leah, Laban's deception, family rivalry, wrestling with God, reconciliation with Esau, renewal, and Edom.",
  },
  {
    key: "testing_of_joseph",
    title: "The Testing of Joseph",
    subtitle: "Genesis 37-50",
    totalWeeks: 14,
    image: "/TheTestingofJospehnewcover.png",
    description:
      "A chapter-by-chapter Bible study through Genesis 37-50 with intro, reading, notes, trivia, Scrambled, and reflection all centered on Joseph's story.",
  },
  {
    key: "rise_of_esther",
    title: "The Rise of Esther",
    subtitle: "Esther 1-10",
    totalWeeks: 10,
    image: "/theriseofester.png",
    description:
      "A chapter-by-chapter Bible study through Esther 1-10 with intro, reading, notes, trivia, Scrambled, and reflection centered on courage, hidden identity, palace pressure, providence, reversal, and legacy.",
  },
  {
    key: "wisdom_of_proverbs",
    title: "The Wisdom of Proverbs",
    subtitle: "Proverbs 1-31",
    totalWeeks: 31,
    image: "/Wisdomofproverbsnewcover.png",
    description:
      "A practical weekly Bible study through Proverbs focused on wisdom, speech, relationships, self-control, money, and daily decision making.",
  },
  {
    key: "courage_of_daniel",
    title: "The Courage of Daniel",
    subtitle: "Daniel 1-6",
    totalWeeks: 6,
    image: "/thecourageofdaniel.png",
    description:
      "A chapter-by-chapter Bible study through Daniel 1-6 with intro, reading, notes, trivia, Scrambled, and reflection centered on courage, identity, prayer, wisdom, pressure, persecution, and faithfulness in Babylon.",
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
