/**
 * How many chapters each book of the Bible has (Louis, 2026-10-12).
 *
 * Lifted out of lib/readingProgress.ts unchanged. It lives on its own because
 * readingProgress imports the BROWSER Supabase client at module load, so
 * anything server-side that only wanted a chapter count - the newsletter's
 * progress block, for one - was dragging a browser client into Node and
 * crashing on import. This module has no imports and no side effects.
 *
 * readingProgress re-exports it, so every existing caller is unaffected.
 */

/** The 66 books, in canonical order. */
export const BIBLE_BOOKS: readonly string[] = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
  "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther",
  "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
  "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude",
  "Revelation",
];

/**
 * How many chapters the whole Bible has.
 *
 * Added so the admin dashboard stops carrying the literal 1189. The number is
 * the same, but it is now the sum of the table below rather than a figure
 * typed in next to it, so if a book's count is ever corrected the total
 * follows instead of quietly disagreeing.
 */
export const TOTAL_BIBLE_CHAPTERS: number = BIBLE_BOOKS.reduce(
  (sum, book) => sum + getBookTotalChapters(book),
  0,
);

/**
 * Get total chapters for a book
 */
export function getBookTotalChapters(bookName: string): number {
  const bookLower = bookName.toLowerCase().trim();
  
  // Gospels & Acts
  if (bookLower === "matthew") return 28;
  if (bookLower === "mark") return 16;
  if (bookLower === "luke") return 24;
  if (bookLower === "john") return 21;
  if (bookLower === "acts") return 28;
  
  // Law (Torah)
  if (bookLower === "genesis") return 50;
  if (bookLower === "exodus") return 40;
  if (bookLower === "leviticus") return 27;
  if (bookLower === "numbers") return 36;
  if (bookLower === "deuteronomy") return 34;
  
  // History
  if (bookLower === "joshua") return 24;
  if (bookLower === "judges") return 21;
  if (bookLower === "ruth") return 4;
  if (bookLower === "1 samuel" || bookLower === "1samuel") return 31;
  if (bookLower === "2 samuel" || bookLower === "2samuel") return 24;
  if (bookLower === "1 kings" || bookLower === "1kings") return 22;
  if (bookLower === "2 kings" || bookLower === "2kings") return 25;
  if (bookLower === "1 chronicles" || bookLower === "1chronicles") return 29;
  if (bookLower === "2 chronicles" || bookLower === "2chronicles") return 36;
  if (bookLower === "ezra") return 10;
  if (bookLower === "nehemiah") return 13;
  if (bookLower === "esther") return 10;
  
  // Wisdom & Poetry
  if (bookLower === "job") return 42;
  if (bookLower === "psalms") return 150;
  if (bookLower === "proverbs") return 31;
  if (bookLower === "ecclesiastes") return 12;
  if (bookLower === "song of solomon" || bookLower === "songofsolomon") return 8;
  
  // Major Prophets
  if (bookLower === "isaiah") return 66;
  if (bookLower === "jeremiah") return 52;
  if (bookLower === "lamentations") return 5;
  if (bookLower === "ezekiel") return 48;
  if (bookLower === "daniel") return 12;
  
  // Minor Prophets
  if (bookLower === "hosea") return 14;
  if (bookLower === "joel") return 3;
  if (bookLower === "amos") return 9;
  if (bookLower === "obadiah") return 1;
  if (bookLower === "jonah") return 4;
  if (bookLower === "micah") return 7;
  if (bookLower === "nahum") return 3;
  if (bookLower === "habakkuk") return 3;
  if (bookLower === "zephaniah") return 3;
  if (bookLower === "haggai") return 2;
  if (bookLower === "zechariah") return 14;
  if (bookLower === "malachi") return 4;
  
  // Paul's Letters
  if (bookLower === "romans") return 16;
  if (bookLower === "1 corinthians" || bookLower === "1corinthians") return 16;
  if (bookLower === "2 corinthians" || bookLower === "2corinthians") return 13;
  if (bookLower === "galatians") return 6;
  if (bookLower === "ephesians") return 6;
  if (bookLower === "philippians") return 4;
  if (bookLower === "colossians") return 4;
  if (bookLower === "1 thessalonians" || bookLower === "1thessalonians") return 5;
  if (bookLower === "2 thessalonians" || bookLower === "2thessalonians") return 3;
  if (bookLower === "1 timothy" || bookLower === "1timothy") return 6;
  if (bookLower === "2 timothy" || bookLower === "2timothy") return 4;
  if (bookLower === "titus") return 3;
  if (bookLower === "philemon") return 1;
  
  // General Epistles
  if (bookLower === "hebrews") return 13;
  if (bookLower === "james") return 5;
  if (bookLower === "1 peter" || bookLower === "1peter") return 5;
  if (bookLower === "2 peter" || bookLower === "2peter") return 3;
  if (bookLower === "1 john" || bookLower === "1john") return 5;
  if (bookLower === "2 john" || bookLower === "2john") return 1;
  if (bookLower === "3 john" || bookLower === "3john") return 1;
  if (bookLower === "jude") return 1;
  
  // Revelation
  if (bookLower === "revelation") return 22;
  
  return 28; // default fallback
}
