// lib/readingProgress.ts
// Database-based reading progress helpers - PER-USER ISOLATION
// SOURCE OF TRUTH: completed_chapters table (filtered by user_id)

import { supabase } from "./supabaseClient";

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

/**
 * Get completed chapters for a book for a specific user from database
 */
export async function getCompletedChapters(userId: string, book: string): Promise<number[]> {
  try {
    const bookKey = book.toLowerCase().trim();
    const { data, error } = await supabase
      .from("completed_chapters")
      .select("chapter")
      .eq("user_id", userId)
      .eq("book", bookKey)
      .order("chapter", { ascending: true });

    if (error) {
      console.error(`[READING_PROGRESS] Error fetching completed chapters for ${bookKey}:`, error);
      return [];
    }

    return (data || []).map((row) => row.chapter).sort((a, b) => a - b);
  } catch (err) {
    console.error(`[READING_PROGRESS] Error in getCompletedChapters:`, err);
    return [];
  }
}

/**
 * Get total completed chapters across all books for a user
 * This is the shared function used by both dashboard and Bible Study Stats
 */
export async function getTotalCompletedChapters(userId: string, books: string[]): Promise<number> {
  try {
    let totalCount = 0;
    for (const book of books) {
      const completed = await getCompletedChapters(userId, book);
      totalCount += completed.length;
    }
    return totalCount;
  } catch (err) {
    console.error(`[READING_PROGRESS] Error in getTotalCompletedChapters:`, err);
    return 0;
  }
}

/**
 * Check if a book is complete for a specific user
 */
export async function isBookComplete(userId: string, bookName: string): Promise<boolean> {
  try {
    const bookKey = bookName.toLowerCase().trim();
    const totalChapters = getBookTotalChapters(bookName);
    const completedChapters = await getCompletedChapters(userId, bookKey);
    return completedChapters.length >= totalChapters;
  } catch (err) {
    console.error(`[READING_PROGRESS] Error in isBookComplete:`, err);
    return false;
  }
}

/**
 * Check if a chapter is completed for a specific user
 */
export async function isChapterCompleted(userId: string, book: string, chapter: number): Promise<boolean> {
  try {
    const bookKey = book.toLowerCase().trim();
    const { data, error } = await supabase
      .from("completed_chapters")
      .select("id")
      .eq("user_id", userId)
      .eq("book", bookKey)
      .eq("chapter", chapter)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error(`[READING_PROGRESS] Error checking chapter completion:`, error);
      return false;
    }

    return !!data;
  } catch (err) {
    console.error(`[READING_PROGRESS] Error in isChapterCompleted:`, err);
    return false;
  }
}

/**
 * Get the current chapter (next chapter to read) for a book for a specific user
 * Returns the smallest chapter number that is not completed, or totalChapters + 1 if all are completed
 */
export async function getBookCurrentStep(userId: string, book: string, totalChapters: number): Promise<number> {
  try {
    const bookKey = book.toLowerCase().trim();
    const completedChapters = await getCompletedChapters(userId, bookKey);
    const completedSet = new Set(completedChapters);

    // Find the first chapter (1 to totalChapters) that is not completed
    for (let ch = 1; ch <= totalChapters; ch++) {
      if (!completedSet.has(ch)) {
        return ch;
      }
    }

    // All chapters completed
    return totalChapters + 1;
  } catch (err) {
    console.error(`[READING_PROGRESS] Error in getBookCurrentStep:`, err);
    return 1; // Default to chapter 1
  }
}

/**
 * Get the current/active book for a specific user
 * Returns the first unlocked book that is not yet complete
 */
export async function getCurrentBook(userId: string, books: string[]): Promise<string | null> {
  try {
    for (const book of books) {
      // Check if book is unlocked
      const isUnlocked = await isBookUnlocked(userId, book);
      if (!isUnlocked) continue;

      // Check if book is complete
      const isComplete = await isBookComplete(userId, book);
      if (!isComplete) {
        return book; // This is the current active book
      }
    }

    // All unlocked books are complete
    return null;
  } catch (err) {
    console.error(`[READING_PROGRESS] Error in getCurrentBook:`, err);
    return "Matthew"; // Default to Matthew
  }
}

// Reading plan book order (same as in app/reading/page.tsx)
const BOOKS_ORDER = [
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
  "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther",
  "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
  "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude",
  "Revelation",
];

/**
 * Check if a book is unlocked for a specific user
 */
export async function isBookUnlocked(userId: string, book: string): Promise<boolean> {
  const bookKey = book.toLowerCase().trim();
  
  // Matthew is always unlocked (first book)
  if (bookKey === "matthew") return true;

  // Find the book's index in the reading plan
  const bookIndex = BOOKS_ORDER.findIndex(b => b.toLowerCase().trim() === bookKey);
  
  // If book not found in plan, it's locked
  if (bookIndex === -1) return false;
  
  // If it's the first book (Matthew), it's unlocked (already handled above, but double-check)
  if (bookIndex === 0) return true;
  
  // Book is unlocked if the previous book in the reading plan is complete
  const previousBook = BOOKS_ORDER[bookIndex - 1];
  if (!previousBook) return false;
  
  const previousBookComplete = await isBookComplete(userId, previousBook);
  return previousBookComplete;
}

/**
 * Check if a chapter is unlocked for a specific user
 */
export async function isChapterUnlocked(userId: string, book: string, chapter: number): Promise<boolean> {
  try {
    const bookKey = book.toLowerCase().trim();
    const completedChapters = await getCompletedChapters(userId, bookKey);
    
    if (chapter === 1) return true; // First chapter is always unlocked
    
    // Chapter is unlocked if previous chapter is completed
    return completedChapters.includes(chapter - 1);
  } catch (err) {
    console.error(`[READING_PROGRESS] Error in isChapterUnlocked:`, err);
    return false;
  }
}

/**
 * Mark a chapter as completed for a specific user
 * Uses UPSERT to prevent duplicates (unique constraint on user_id, book, chapter)
 */
export async function markChapterDone(userId: string, book: string, chapter: number): Promise<void> {
  try {
    const bookKey = book.toLowerCase().trim();

    // UPSERT into completed_chapters (the ONLY source of truth)
    const { error } = await supabase
      .from("completed_chapters")
      .upsert({
        user_id: userId,
        book: bookKey,
        chapter: chapter,
        completed_at: new Date().toISOString(),
      }, {
        onConflict: "user_id,book,chapter",
      });

    if (error) {
      console.error("[READING_PROGRESS] Error marking chapter as completed:", error);
      throw error;
    }

    console.log(`[READING_PROGRESS] ✅ Marked ${bookKey} chapter ${chapter} as completed for user ${userId}`);
  } catch (err) {
    console.error("[READING_PROGRESS] Error in markChapterDone:", err);
    throw err;
  }
}

/**
 * Check if all 28 chapters of Matthew are completed for a specific user
 */
export async function isMatthewComplete(userId: string): Promise<boolean> {
  return await isBookComplete(userId, "matthew");
}
