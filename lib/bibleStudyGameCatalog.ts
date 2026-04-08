export interface BibleGameBook {
  key: string;
  title: string;
  triviaHref: string;
}

export interface BibleGamePerson {
  key: string;
  title: string;
  triviaHref: string;
  scrambledHref?: string;
}

export interface ScrambledGamePerson {
  key: string;
  title: string;
  scrambledHref: string;
}

export const BIBLE_GAME_BOOKS: BibleGameBook[] = [
  { key: "genesis", title: "Genesis", triviaHref: "/bible-trivia/genesis" },
  { key: "exodus", title: "Exodus", triviaHref: "/bible-trivia/exodus" },
  { key: "leviticus", title: "Leviticus", triviaHref: "/bible-trivia/leviticus" },
  { key: "numbers", title: "Numbers", triviaHref: "/bible-trivia/numbers" },
  { key: "deuteronomy", title: "Deuteronomy", triviaHref: "/bible-trivia/deuteronomy" },
  { key: "joshua", title: "Joshua", triviaHref: "/bible-trivia/joshua" },
  { key: "judges", title: "Judges", triviaHref: "/bible-trivia/judges" },
  { key: "ruth", title: "Ruth", triviaHref: "/bible-trivia/ruth" },
  { key: "1samuel", title: "1 Samuel", triviaHref: "/bible-trivia/1-samuel" },
  { key: "2samuel", title: "2 Samuel", triviaHref: "/bible-trivia/2-samuel" },
  { key: "1kings", title: "1 Kings", triviaHref: "/bible-trivia/1-kings" },
  { key: "2kings", title: "2 Kings", triviaHref: "/bible-trivia/2-kings" },
  { key: "1chronicles", title: "1 Chronicles", triviaHref: "/bible-trivia/1-chronicles" },
  { key: "2chronicles", title: "2 Chronicles", triviaHref: "/bible-trivia/2-chronicles" },
  { key: "ezra", title: "Ezra", triviaHref: "/bible-trivia/ezra" },
  { key: "nehemiah", title: "Nehemiah", triviaHref: "/bible-trivia/nehemiah" },
  { key: "esther", title: "Esther", triviaHref: "/bible-trivia/esther" },
  { key: "job", title: "Job", triviaHref: "/bible-trivia/job" },
  { key: "psalms", title: "Psalms", triviaHref: "/bible-trivia/psalms" },
  { key: "proverbs", title: "Proverbs", triviaHref: "/bible-trivia/proverbs" },
  { key: "ecclesiastes", title: "Ecclesiastes", triviaHref: "/bible-trivia/ecclesiastes" },
  { key: "songofsongs", title: "Song of Songs", triviaHref: "/bible-trivia/song-of-songs" },
  { key: "isaiah", title: "Isaiah", triviaHref: "/bible-trivia/isaiah" },
  { key: "jeremiah", title: "Jeremiah", triviaHref: "/bible-trivia/jeremiah" },
  { key: "lamentations", title: "Lamentations", triviaHref: "/bible-trivia/lamentations" },
  { key: "ezekiel", title: "Ezekiel", triviaHref: "/bible-trivia/ezekiel" },
  { key: "daniel", title: "Daniel", triviaHref: "/bible-trivia/daniel" },
  { key: "hosea", title: "Hosea", triviaHref: "/bible-trivia/hosea" },
  { key: "joel", title: "Joel", triviaHref: "/bible-trivia/joel" },
  { key: "amos", title: "Amos", triviaHref: "/bible-trivia/amos" },
  { key: "obadiah", title: "Obadiah", triviaHref: "/bible-trivia/obadiah" },
  { key: "jonah", title: "Jonah", triviaHref: "/bible-trivia/jonah" },
  { key: "micah", title: "Micah", triviaHref: "/bible-trivia/micah" },
  { key: "nahum", title: "Nahum", triviaHref: "/bible-trivia/nahum" },
  { key: "habakkuk", title: "Habakkuk", triviaHref: "/bible-trivia/habakkuk" },
  { key: "zephaniah", title: "Zephaniah", triviaHref: "/bible-trivia/zephaniah" },
  { key: "haggai", title: "Haggai", triviaHref: "/bible-trivia/haggai" },
  { key: "zechariah", title: "Zechariah", triviaHref: "/bible-trivia/zechariah" },
  { key: "malachi", title: "Malachi", triviaHref: "/bible-trivia/malachi" },
  { key: "matthew", title: "Matthew", triviaHref: "/bible-trivia/matthew" },
  { key: "mark", title: "Mark", triviaHref: "/bible-trivia/mark" },
  { key: "luke", title: "Luke", triviaHref: "/bible-trivia/luke" },
  { key: "john", title: "John", triviaHref: "/bible-trivia/john" },
  { key: "acts", title: "Acts", triviaHref: "/bible-trivia/acts" },
  { key: "romans", title: "Romans", triviaHref: "/bible-trivia/romans" },
  { key: "1corinthians", title: "1 Corinthians", triviaHref: "/bible-trivia/1-corinthians" },
  { key: "2corinthians", title: "2 Corinthians", triviaHref: "/bible-trivia/2-corinthians" },
  { key: "galatians", title: "Galatians", triviaHref: "/bible-trivia/galatians" },
  { key: "ephesians", title: "Ephesians", triviaHref: "/bible-trivia/ephesians" },
  { key: "philippians", title: "Philippians", triviaHref: "/bible-trivia/philippians" },
  { key: "colossians", title: "Colossians", triviaHref: "/bible-trivia/colossians" },
  { key: "1thessalonians", title: "1 Thessalonians", triviaHref: "/bible-trivia/1-thessalonians" },
  { key: "2thessalonians", title: "2 Thessalonians", triviaHref: "/bible-trivia/2-thessalonians" },
  { key: "1timothy", title: "1 Timothy", triviaHref: "/bible-trivia/1-timothy" },
  { key: "2timothy", title: "2 Timothy", triviaHref: "/bible-trivia/2-timothy" },
  { key: "titus", title: "Titus", triviaHref: "/bible-trivia/titus" },
  { key: "philemon", title: "Philemon", triviaHref: "/bible-trivia/philemon" },
  { key: "hebrews", title: "Hebrews", triviaHref: "/bible-trivia/hebrews" },
  { key: "james", title: "James", triviaHref: "/bible-trivia/james" },
  { key: "1peter", title: "1 Peter", triviaHref: "/bible-trivia/1-peter" },
  { key: "2peter", title: "2 Peter", triviaHref: "/bible-trivia/2-peter" },
  { key: "1john", title: "1 John", triviaHref: "/bible-trivia/1-john" },
  { key: "2john", title: "2 John", triviaHref: "/bible-trivia/2-john" },
  { key: "3john", title: "3 John", triviaHref: "/bible-trivia/3-john" },
  { key: "jude", title: "Jude", triviaHref: "/bible-trivia/jude" },
  { key: "revelation", title: "Revelation", triviaHref: "/bible-trivia/revelation" },
];

export const BIBLE_GAME_PEOPLE: BibleGamePerson[] = [
  { key: "god", title: "God", triviaHref: "/bible-trivia/god" },
  { key: "jesus", title: "Jesus", triviaHref: "/bible-trivia/jesus" },
  { key: "moses", title: "Moses", triviaHref: "/bible-trivia/moses" },
  { key: "abraham", title: "Abraham", triviaHref: "/bible-trivia/abraham" },
];

export const SCRAMBLED_GAME_PEOPLE: ScrambledGamePerson[] = [
  { key: "god", title: "God", scrambledHref: "/bible-study-games/scrambled/person-god" },
  { key: "jesus", title: "Jesus", scrambledHref: "/bible-study-games/scrambled/person-jesus" },
  { key: "moses", title: "Moses", scrambledHref: "/bible-study-games/scrambled/person-moses" },
  { key: "abraham", title: "Abraham", scrambledHref: "/bible-study-games/scrambled/person-abraham" },
  { key: "esther", title: "Esther", scrambledHref: "/bible-study-games/scrambled/person-esther" },
  { key: "paul", title: "Paul", scrambledHref: "/bible-study-games/scrambled/person-paul" },
  { key: "peter", title: "Peter", scrambledHref: "/bible-study-games/scrambled/person-peter" },
  { key: "job", title: "Job", scrambledHref: "/bible-study-games/scrambled/person-job" },
  { key: "matthew", title: "Matthew", scrambledHref: "/bible-study-games/scrambled/person-matthew" },
  { key: "luke", title: "Luke", scrambledHref: "/bible-study-games/scrambled/person-luke" },
  { key: "jacob", title: "Jacob", scrambledHref: "/bible-study-games/scrambled/person-jacob" },
  { key: "joseph", title: "Joseph", scrambledHref: "/bible-study-games/scrambled/person-joseph" },
  { key: "aaron", title: "Aaron", scrambledHref: "/bible-study-games/scrambled/person-aaron" },
  { key: "david", title: "David", scrambledHref: "/bible-study-games/scrambled/person-david" },
  { key: "noah", title: "Noah", scrambledHref: "/bible-study-games/scrambled/person-noah" },
  { key: "daniel", title: "Daniel", scrambledHref: "/bible-study-games/scrambled/person-daniel" },
  { key: "samuel", title: "Samuel", scrambledHref: "/bible-study-games/scrambled/person-samuel" },
  { key: "isaac", title: "Isaac", scrambledHref: "/bible-study-games/scrambled/person-isaac" },
  { key: "john-the-baptist", title: "John the Baptist", scrambledHref: "/bible-study-games/scrambled/person-john-the-baptist" },
  { key: "mary", title: "Mary", scrambledHref: "/bible-study-games/scrambled/person-mary" },
  { key: "ruth", title: "Ruth", scrambledHref: "/bible-study-games/scrambled/person-ruth" },
  { key: "solomon", title: "Solomon", scrambledHref: "/bible-study-games/scrambled/person-solomon" },
  { key: "elijah", title: "Elijah", scrambledHref: "/bible-study-games/scrambled/person-elijah" },
  { key: "elisha", title: "Elisha", scrambledHref: "/bible-study-games/scrambled/person-elisha" },
  { key: "joshua", title: "Joshua", scrambledHref: "/bible-study-games/scrambled/person-joshua" },
  { key: "mary-magdalene", title: "Mary Magdalene", scrambledHref: "/bible-study-games/scrambled/person-mary-magdalene" },
  { key: "timothy", title: "Timothy", scrambledHref: "/bible-study-games/scrambled/person-timothy" },
  { key: "jonah", title: "Jonah", scrambledHref: "/bible-study-games/scrambled/person-jonah" },
];

export const FREE_TRIVIA_BOOK_KEYS = new Set(["genesis", "exodus", "leviticus", "numbers"]);
export const FREE_TRIVIA_PERSON_KEYS = new Set(["god", "jesus"]);
export const FREE_SCRAMBLED_BOOK_KEYS = new Set(["genesis", "exodus", "leviticus", "numbers"]);
export const FREE_SCRAMBLED_PERSON_KEYS = new Set([
  "person-god",
  "person-jesus",
  "person-moses",
  "person-abraham",
]);
export const SCRAMBLED_LIVE_BOOK_KEYS = new Set(["genesis", "exodus", "leviticus", "numbers", "deuteronomy", "joshua", "judges", "ruth", "1samuel", "2samuel", "1kings", "2kings", "1chronicles", "2chronicles", "ezra", "nehemiah", "esther", "job", "psalms", "proverbs", "ecclesiastes", "songofsongs", "isaiah", "jeremiah", "lamentations", "ezekiel", "daniel", "hosea", "joel", "amos", "obadiah", "jonah", "micah", "nahum", "habakkuk", "zephaniah", "haggai", "zechariah", "malachi", "matthew", "mark", "luke", "john", "acts", "romans", "1corinthians", "2corinthians", "galatians", "ephesians", "philippians", "colossians", "1thessalonians", "2thessalonians", "1timothy", "2timothy", "titus", "philemon", "hebrews", "james", "1peter", "2peter", "1john", "2john", "3john", "jude", "revelation"]);
export const BIBLE_GAME_ITEMS_PER_PAGE = 12;
