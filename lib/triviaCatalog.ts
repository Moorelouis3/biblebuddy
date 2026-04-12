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
  { key: "psalms", title: "Psalms", routeSlug: "psalms", chapters: 150 },
  { key: "proverbs", title: "Proverbs", routeSlug: "proverbs", chapters: 31 },
  { key: "ecclesiastes", title: "Ecclesiastes", routeSlug: "ecclesiastes", chapters: 12 },
  { key: "songofsongs", title: "Song of Songs", routeSlug: "song-of-songs", chapters: 8 },
  { key: "isaiah", title: "Isaiah", routeSlug: "isaiah", chapters: 66 },
  { key: "jeremiah", title: "Jeremiah", routeSlug: "jeremiah", chapters: 52 },
  { key: "lamentations", title: "Lamentations", routeSlug: "lamentations", chapters: 5 },
  { key: "ezekiel", title: "Ezekiel", routeSlug: "ezekiel", chapters: 48 },
  { key: "daniel", title: "Daniel", routeSlug: "daniel", chapters: 12 },
  { key: "hosea", title: "Hosea", routeSlug: "hosea", chapters: 14 },
  { key: "joel", title: "Joel", routeSlug: "joel", chapters: 3 },
  { key: "amos", title: "Amos", routeSlug: "amos", chapters: 9 },
  { key: "obadiah", title: "Obadiah", routeSlug: "obadiah", chapters: 1 },
  { key: "jonah", title: "Jonah", routeSlug: "jonah", chapters: 4 },
  { key: "micah", title: "Micah", routeSlug: "micah", chapters: 7 },
  { key: "nahum", title: "Nahum", routeSlug: "nahum", chapters: 3 },
  { key: "habakkuk", title: "Habakkuk", routeSlug: "habakkuk", chapters: 3 },
  { key: "zephaniah", title: "Zephaniah", routeSlug: "zephaniah", chapters: 3 },
  { key: "haggai", title: "Haggai", routeSlug: "haggai", chapters: 2 },
  { key: "zechariah", title: "Zechariah", routeSlug: "zechariah", chapters: 14 },
  { key: "malachi", title: "Malachi", routeSlug: "malachi", chapters: 4 },
  { key: "matthew", title: "Matthew", routeSlug: "matthew", chapters: 28 },
  { key: "mark", title: "Mark", routeSlug: "mark", chapters: 16 },
  { key: "luke", title: "Luke", routeSlug: "luke", chapters: 24 },
  { key: "john", title: "John", routeSlug: "john", chapters: 21 },
  { key: "acts", title: "Acts", routeSlug: "acts", chapters: 28 },
  { key: "romans", title: "Romans", routeSlug: "romans", chapters: 16 },
  { key: "1corinthians", title: "1 Corinthians", routeSlug: "1-corinthians", chapters: 16 },
  { key: "2corinthians", title: "2 Corinthians", routeSlug: "2-corinthians", chapters: 13 },
  { key: "galatians", title: "Galatians", routeSlug: "galatians", chapters: 6 },
  { key: "ephesians", title: "Ephesians", routeSlug: "ephesians", chapters: 6 },
  { key: "philippians", title: "Philippians", routeSlug: "philippians", chapters: 4 },
  { key: "colossians", title: "Colossians", routeSlug: "colossians", chapters: 4 },
  { key: "1thessalonians", title: "1 Thessalonians", routeSlug: "1-thessalonians", chapters: 5 },
  { key: "2thessalonians", title: "2 Thessalonians", routeSlug: "2-thessalonians", chapters: 3 },
  { key: "1timothy", title: "1 Timothy", routeSlug: "1-timothy", chapters: 6 },
  { key: "2timothy", title: "2 Timothy", routeSlug: "2-timothy", chapters: 4 },
  { key: "titus", title: "Titus", routeSlug: "titus", chapters: 3 },
  { key: "philemon", title: "Philemon", routeSlug: "philemon", chapters: 1 },
  { key: "hebrews", title: "Hebrews", routeSlug: "hebrews", chapters: 13 },
  { key: "james", title: "James", routeSlug: "james", chapters: 5 },
  { key: "1peter", title: "1 Peter", routeSlug: "1-peter", chapters: 5 },
  { key: "2peter", title: "2 Peter", routeSlug: "2-peter", chapters: 3 },
  { key: "1john", title: "1 John", routeSlug: "1-john", chapters: 5 },
  { key: "2john", title: "2 John", routeSlug: "2-john", chapters: 1 },
  { key: "3john", title: "3 John", routeSlug: "3-john", chapters: 1 },
  { key: "jude", title: "Jude", routeSlug: "jude", chapters: 1 },
  { key: "revelation", title: "Revelation", routeSlug: "revelation", chapters: 22 },
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
