// lib/readingProgress.ts
// Database-based reading progress helpers - PER-USER ISOLATION
// SOURCE OF TRUTH: completed_chapters table (filtered by user_id)

import { supabase } from "./supabaseClient";

/**
 * Get total chapters for a book
 */
export function getBookTotalChapters(bookName: string): number {
  const bookLower = bookName.toLowerCase();
  if (bookLower === "matthew") return 28;
  if (bookLower === "mark") return 16;
  if (bookLower === "luke") return 24;
  if (bookLower === "john") return 21;
  if (bookLower === "acts") return 28;
  if (bookLower === "romans") return 16;
  return 28; // default
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
    // Check if Matthew is complete
    const matthewComplete = await isBookComplete(userId, "Matthew");

    for (const book of books) {
      const bookKey = book.toLowerCase();

      // Check if book is unlocked
      const isUnlocked = book === "Matthew" || matthewComplete;
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

/**
 * Check if a book is unlocked for a specific user
 */
export async function isBookUnlocked(userId: string, book: string): Promise<boolean> {
  if (book === "Matthew") return true;

  if (book === "Mark") {
    const matthewComplete = await isBookComplete(userId, "Matthew");
    return matthewComplete;
  }

  // Everything else locked for now
  return false;
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
