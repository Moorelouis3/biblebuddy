export type ChapterBasedTriviaBookConfig = {
  key: string;
  title: string;
  routeSlug: string;
  chapters: number;
};

export const CHAPTER_BASED_TRIVIA_BOOK_CONFIG: ChapterBasedTriviaBookConfig[] = [
  { key: "genesis", title: "Genesis", routeSlug: "genesis", chapters: 50 },
  { key: "exodus", title: "Exodus", routeSlug: "exodus", chapters: 40 },
  { key: "leviticus", title: "Leviticus", routeSlug: "leviticus", chapters: 27 },
  { key: "numbers", title: "Numbers", routeSlug: "numbers", chapters: 36 },
  { key: "deuteronomy", title: "Deuteronomy", routeSlug: "deuteronomy", chapters: 34 },
  { key: "joshua", title: "Joshua", routeSlug: "joshua", chapters: 24 },
  { key: "judges", title: "Judges", routeSlug: "judges", chapters: 21 },
  { key: "ruth", title: "Ruth", routeSlug: "ruth", chapters: 4 },
  { key: "1samuel", title: "1 Samuel", routeSlug: "1-samuel", chapters: 31 },
  { key: "2samuel", title: "2 Samuel", routeSlug: "2-samuel", chapters: 24 },
  { key: "1kings", title: "1 Kings", routeSlug: "1-kings", chapters: 22 },
  { key: "2kings", title: "2 Kings", routeSlug: "2-kings", chapters: 25 },
  { key: "1chronicles", title: "1 Chronicles", routeSlug: "1-chronicles", chapters: 29 },
  { key: "2chronicles", title: "2 Chronicles", routeSlug: "2-chronicles", chapters: 36 },
  { key: "ezra", title: "Ezra", routeSlug: "ezra", chapters: 10 },
  { key: "nehemiah", title: "Nehemiah", routeSlug: "nehemiah", chapters: 13 },
  { key: "esther", title: "Esther", routeSlug: "esther", chapters: 10 },
  { key: "job", title: "Job", routeSlug: "job", chapters: 42 },
];

const configByKey = new Map(CHAPTER_BASED_TRIVIA_BOOK_CONFIG.map((book) => [book.key, book]));
const configByRouteSlug = new Map(CHAPTER_BASED_TRIVIA_BOOK_CONFIG.map((book) => [book.routeSlug, book]));

export function getChapterBasedTriviaBookByKey(bookKey: string) {
  return configByKey.get(bookKey) ?? null;
}

export function isChapterBasedTriviaBookKey(bookKey: string) {
  return configByKey.has(bookKey);
}

export function isChapterBasedTriviaRouteSlug(routeSlug: string) {
  return configByRouteSlug.has(routeSlug);
}

export function getTriviaProgressBookKey(bookKey: string, chapterNumber: number) {
  return `${bookKey}:${chapterNumber}`;
}
