// lib/readingProgress.ts
// Database-based reading progress helpers - PER-USER ISOLATION
// SOURCE OF TRUTH: completed_chapters table (filtered by user_id)

import { supabase } from "./supabaseClient";
import { ACTION_TYPE } from "./actionTypes";

const chapterCompletionInFlight = new Set<string>();

// getBookTotalChapters now lives in lib/bibleBookChapters.ts so that server-side
// callers can use it without pulling in the browser Supabase client imported
// above. Imported for use below and re-exported because ~15 call sites import
// it from this module.
import { getBookTotalChapters } from "./bibleBookChapters";
export { getBookTotalChapters };

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
 * Get completed chapters for multiple books in one query for a specific user.
 */
export async function getCompletedChaptersByBooks(
  userId: string,
  books: string[],
): Promise<Record<string, number[]>> {
  try {
    const normalizedBooks = Array.from(
      new Set(
        books
          .map((book) => book.toLowerCase().trim())
          .filter(Boolean),
      ),
    );

    if (!normalizedBooks.length) return {};

    const { data, error } = await supabase
      .from("completed_chapters")
      .select("book, chapter")
      .eq("user_id", userId)
      .in("book", normalizedBooks)
      .order("chapter", { ascending: true });

    if (error) {
      console.error("[READING_PROGRESS] Error fetching completed chapters by books:", error);
      return {};
    }

    const grouped: Record<string, number[]> = {};
    normalizedBooks.forEach((book) => {
      grouped[book] = [];
    });

    (data || []).forEach((row) => {
      const book = String(row.book || "").toLowerCase().trim();
      const chapter = Number(row.chapter);
      if (!book || !Number.isFinite(chapter)) return;
      if (!grouped[book]) grouped[book] = [];
      grouped[book].push(chapter);
    });

    Object.keys(grouped).forEach((book) => {
      grouped[book] = grouped[book].sort((a, b) => a - b);
    });

    return grouped;
  } catch (err) {
    console.error("[READING_PROGRESS] Error in getCompletedChaptersByBooks:", err);
    return {};
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
    return "Genesis"; // Default to Genesis (first book in biblical order)
  }
}

// Bible book order - standard biblical order (Genesis → Revelation)
const BOOKS_ORDER = [
  // Old Testament
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings",
  "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther",
  "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
  "Zephaniah", "Haggai", "Zechariah", "Malachi",
  // New Testament
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude",
  "Revelation",
];

/**
 * Check if a user email is the admin email
 */
export function isAdminUser(userEmail: string | null | undefined): boolean {
  return userEmail === "moorelouis3@gmail.com";
}

/**
 * Check if a book is unlocked for a specific user
 */
export async function isBookUnlocked(userId: string, book: string, userEmail?: string | null): Promise<boolean> {
  // Admin bypass: admin can access all books
  if (userEmail && isAdminUser(userEmail)) {
    return true;
  }

  const bookKey = book.toLowerCase().trim();
  
  // Genesis is always unlocked (first book in biblical order)
  if (bookKey === "genesis") return true;

  // Find the book's index in the reading plan
  const bookIndex = BOOKS_ORDER.findIndex(b => b.toLowerCase().trim() === bookKey);
  
  // If book not found in plan, it's locked
  if (bookIndex === -1) return false;
  
  // If it's the first book (Genesis), it's unlocked (already handled above, but double-check)
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
export async function isChapterUnlocked(userId: string, book: string, chapter: number, userEmail?: string | null): Promise<boolean> {
  try {
    // Admin bypass: admin can access all chapters
    if (userEmail && isAdminUser(userEmail)) {
      return true;
    }

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
  const completionKey = `${userId}:${book.toLowerCase().trim()}:${chapter}`;
  if (chapterCompletionInFlight.has(completionKey)) return;
  chapterCompletionInFlight.add(completionKey);

  try {
    const bookKey = book.toLowerCase().trim();
    const actionLabel = `${book} ${chapter}`;

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

    // Give the phone back, here, where the chapter is actually finished.
    //
    // Seven screens mark a chapter done and every one of them comes through
    // this function, but only FullChapterReader ever lifted the Bible lock. So
    // Louis locked his apps, read Leviticus 22 from the book page on
    // 2026-10-17, and nothing happened: "it said locked, I finished a chapter,
    // no pop up, no new banner, no apps unlocked, nothing." The completion was
    // recorded correctly at 13:05:55 - it was the unlock that was never wired
    // to this path.
    //
    // It also sits ABOVE the master_actions block on purpose. That block only
    // writes an event the first time a chapter is ever completed, so hanging
    // the unlock off it would leave anybody re-reading a chapter they had read
    // before locked out with no way back. Finishing the chapter is what counts,
    // not whether it was the first time.
    //
    // Dynamic import because this module is also pulled in by server code, and
    // lib/bibleLock.ts registers a Capacitor plugin as soon as it loads.
    if (typeof window !== "undefined") {
      void import("./bibleLock")
        .then((mod) => mod.liftBibleLockFor(ACTION_TYPE.chapter_completed))
        .catch(() => {
          // No plugin, not in the app, nothing locked: the read still counts.
        });
    }
    // Exact match, not a prefix match.
    //
    // This was `.ilike(action_label, "${actionLabel}%")`, which matched any
    // LONGER label beginning with the same text: completing "Genesis 1" found
    // an existing "Genesis 16" and concluded the action was already logged, so
    // it never wrote one. 101 of the 1,361 distinct labels in the table are a
    // prefix of another ("Exodus 2"/"Exodus 21", "Matthew 1"/"Matthew 13"), and
    // the event log ended up holding about 27% of real completions - 424
    // against 1,563 in one week.
    //
    // Labels are written here as exactly `${book} ${chapter}` and 12,139 of the
    // 12,151 rows match that shape (the other 12 are null), so an equality
    // check cannot miss a legitimate existing row and start duplicating.
    //
    // This repairs the log going forward; it does not backfill the events that
    // were never written. completed_chapters has always been correct and is
    // what the newsletter counts - see lib/email/newsletterProgress.ts.
    const { data: existingAction, error: existingActionError } = await supabase
      .from("master_actions")
      .select("id")
      .eq("user_id", userId)
      .eq("action_type", ACTION_TYPE.chapter_completed)
      .eq("action_label", actionLabel)
      .limit(1)
      .maybeSingle();

    if (existingActionError) {
      console.error("[READING_PROGRESS] Error checking chapter completion action:", existingActionError);
    } else if (!existingAction) {
      const { error: actionError } = await supabase.from("master_actions").insert({
        user_id: userId,
        action_type: ACTION_TYPE.chapter_completed,
        action_label: actionLabel,
      });

      if (actionError) {
        console.error("[READING_PROGRESS] Error logging chapter completion action:", actionError);
      }
    }
  } catch (err) {
    console.error("[READING_PROGRESS] Error in markChapterDone:", err);
    throw err;
  } finally {
    chapterCompletionInFlight.delete(completionKey);
  }
}

/**
 * Check if all 28 chapters of Matthew are completed for a specific user
 */
export async function isMatthewComplete(userId: string): Promise<boolean> {
  return await isBookComplete(userId, "matthew");
}
