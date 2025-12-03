// lib/readingProgress.ts

// Key in localStorage
const STORAGE_KEY = "bibleBuddyReadingProgress_v1";

// First book in your plan
const FIRST_BOOK = "Matthew";

// One book's progress (overview + chapters)
export type BookProgress = {
  currentStep: number;   // 0 = overview, 1 = chapter1, etc.
  totalSteps: number;    // overview + all chapters
  finished: boolean;
};

export type ReadingProgress = {
  books: Record<string, BookProgress>;
  unlockedBooks: string[];        // which books are unlocked in the plan
  lastReadDate: string | null;    // "2025-12-03"
  streakDays: number;             // 0,1,2,3...
};

function getInitialProgress(): ReadingProgress {
  return {
    books: {
      [FIRST_BOOK]: {
        currentStep: 0,
        totalSteps: 0, // will be set when we know TOTAL_STEPS
        finished: false,
      },
    },
    unlockedBooks: [FIRST_BOOK],
    lastReadDate: null,
    streakDays: 0,
  };
}

function loadFromStorage(): ReadingProgress {
  if (typeof window === "undefined") return getInitialProgress();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialProgress();
    const parsed = JSON.parse(raw);

    // merge with defaults so nothing is missing
    return {
      ...getInitialProgress(),
      ...parsed,
      books: {
        ...getInitialProgress().books,
        ...(parsed.books || {}),
      },
    };
  } catch {
    return getInitialProgress();
  }
}

function saveToStorage(progress: ReadingProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// Make sure a book entry exists and has totalSteps
function ensureBook(
  progress: ReadingProgress,
  bookName: string,
  totalSteps: number
): BookProgress {
  let book = progress.books[bookName];
  if (!book) {
    book = {
      currentStep: 0,
      totalSteps,
      finished: false,
    };
    progress.books[bookName] = book;
  } else if (!book.totalSteps) {
    book.totalSteps = totalSteps;
  }
  return book;
}

/** Get the full reading progress object */
export function getReadingProgress(): ReadingProgress {
  return loadFromStorage();
}

/** Return which books are unlocked (intersected with your BOOKS array) */
export function getUnlockedBooks(allBooks: string[]): string[] {
  const progress = loadFromStorage();
  const baseUnlocked =
    progress.unlockedBooks && progress.unlockedBooks.length > 0
      ? progress.unlockedBooks
      : [FIRST_BOOK];

  const unlockedSet = new Set(baseUnlocked);
  return allBooks.filter((b) => unlockedSet.has(b));
}

/** Get current Matthew step (0 = overview, 1 = ch1, etc.) */
export function getMatthewCurrentStep(totalSteps: number): number {
  const progress = loadFromStorage();
  const book = ensureBook(progress, FIRST_BOOK, totalSteps);
  return book.currentStep ?? 0;
}

/** Get streak info (used for streak UI, if you want it later) */
export function getStreakInfo(): { streakDays: number; lastReadDate: string | null } {
  const progress = loadFromStorage();
  return {
    streakDays: progress.streakDays || 0,
    lastReadDate: progress.lastReadDate || null,
  };
}

// update streak whenever a chapter is finished
function updateStreak(progress: ReadingProgress) {
  const today = new Date();
  const todayISO = today.toISOString().slice(0, 10); // "YYYY-MM-DD"

  if (!progress.lastReadDate) {
    progress.lastReadDate = todayISO;
    progress.streakDays = 1;
    return;
  }

  if (progress.lastReadDate === todayISO) {
    // already counted today
    return;
  }

  const last = new Date(progress.lastReadDate);
  const diffMs = today.getTime() - last.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    progress.streakDays = (progress.streakDays || 0) + 1;
  } else {
    progress.streakDays = 1;
  }

  progress.lastReadDate = todayISO;
}

/**
 * Call this when the user FINISHES the current Matthew step
 * (for example: at the bottom of a chapter page -> "Mark this chapter done")
 *
 * totalSteps = overview + all chapters (for Matthew = 29)
 * nextBookName = "Mark" (so when Matthew is finished, Mark unlocks)
 */
export function markMatthewStepDone(
  totalSteps: number,
  nextBookName: string
): { currentStep: number; finishedBook: boolean; progress: ReadingProgress } {
  const progress = loadFromStorage();
  const book = ensureBook(progress, FIRST_BOOK, totalSteps);

  // move forward one step, but not past the last step
  if (book.currentStep < book.totalSteps - 1) {
    book.currentStep += 1;
  }

  // if on last step, mark finished + unlock next book
  if (book.currentStep >= book.totalSteps - 1) {
    book.finished = true;
    if (nextBookName && !progress.unlockedBooks.includes(nextBookName)) {
      progress.unlockedBooks.push(nextBookName);
    }
  }

  // streak
  updateStreak(progress);

  saveToStorage(progress);

  return {
    currentStep: book.currentStep,
    finishedBook: book.finished,
    progress,
  };
}
