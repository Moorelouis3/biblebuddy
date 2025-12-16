// lib/readingProgress.ts
// Pure helper functions for reading progress – no JSX here.

const STORAGE_KEY = "biblebuddy_reading_progress";

type ReadingProgress = {
  matthewCurrentStep: number; // 0 = overview, 1 = ch1, 2 = ch2, ...
  streak: number;
  lastCompletedDate: string | null; // "2025-12-04"
  // Dynamic book progress: { "matthew": { currentChapter: 1, completedChapters: [1, 2] }, ... }
  bookProgress: Record<string, { currentChapter: number; completedChapters: number[] }>;
};

function getDefaultProgress(): ReadingProgress {
  return {
    matthewCurrentStep: 0,
    streak: 0,
    lastCompletedDate: null,
    bookProgress: {},
  };
}

function loadProgress(): ReadingProgress {
  if (typeof window === "undefined") {
    return getDefaultProgress();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();

    const parsed = JSON.parse(raw) as Partial<ReadingProgress>;
    return {
      matthewCurrentStep: parsed.matthewCurrentStep ?? 0,
      streak: parsed.streak ?? 0,
      lastCompletedDate: parsed.lastCompletedDate ?? null,
      bookProgress: parsed.bookProgress ?? {},
    };
  } catch {
    return getDefaultProgress();
  }
}

function saveProgress(data: ReadingProgress) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors for now
  }
}

function clampStep(step: number, totalSteps: number): number {
  if (step < 0) return 0;
  if (step >= totalSteps) return totalSteps - 1;
  return step;
}

function todayIso(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function yesterdayIso(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

/**
 * Get the user's current Matthew step index.
 * 0 = overview, 1 = Matthew 1, 2 = Matthew 2, ...
 */
export function getMatthewCurrentStep(totalSteps: number): number {
  const progress = loadProgress();
  return clampStep(progress.matthewCurrentStep, totalSteps);
}

/**
 * Mark a Matthew step as done and update streak.
 * stepIndex is the index you just finished (0 = overview, 1 = ch1, etc.)
 */
export function markMatthewStepDone(
  totalSteps: number,
  stepIndex: number
): void {
  if (typeof window === "undefined") return;

  const progress = loadProgress();

  // Move current step forward (next step becomes active)
  const nextStep = clampStep(stepIndex + 1, totalSteps);
  if (nextStep > progress.matthewCurrentStep) {
    progress.matthewCurrentStep = nextStep;
  }

  // Streak logic
  const today = todayIso();
  const yesterday = yesterdayIso();

  if (progress.lastCompletedDate === today) {
    // already counted today, do nothing to streak
  } else if (progress.lastCompletedDate === yesterday) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }

  progress.lastCompletedDate = today;
  saveProgress(progress);
}

/**
 * Check if all 28 chapters of Matthew are completed.
 */
export function isMatthewComplete(): boolean {
  const progress = loadProgress();
  const bookKey = "matthew";

  // Check if using dynamic system
  if (progress.bookProgress && progress.bookProgress[bookKey]) {
    const bookData = progress.bookProgress[bookKey];
    // All 28 chapters (1-28) are completed if currentChapter > 28 or we have all 28 in completedChapters
    const completedCount = bookData.completedChapters.filter((ch) => ch >= 1 && ch <= 28).length;
    return completedCount >= 28 || bookData.currentChapter > 28;
  }

  // Backward compatibility: old system
  // matthewCurrentStep 29 means all 28 chapters + overview are done
  return progress.matthewCurrentStep >= 29;
}

/**
 * Simple unlock logic for books.
 * Matthew is always unlocked.
 * Mark unlocks when Matthew is fully finished (all 28 chapters completed).
 */
export function isBookUnlocked(book: string, matthewTotalSteps: number): boolean {
  if (book === "Matthew") return true;

  if (book === "Mark") {
    return isMatthewComplete();
  }

  // everything else locked for now
  return false;
}

/**
 * Get the current chapter for a book (0 = overview, 1 = ch1, 2 = ch2, ...)
 * For backward compatibility, if book is "matthew" and no dynamic progress exists,
 * it falls back to matthewCurrentStep.
 */
export function getBookCurrentStep(book: string, totalChapters: number): number {
  const progress = loadProgress();
  const bookKey = book.toLowerCase();

  // Backward compatibility: if Matthew and no dynamic progress, use old system
  if (bookKey === "matthew" && (!progress.bookProgress || !progress.bookProgress[bookKey])) {
    return clampStep(progress.matthewCurrentStep, totalChapters);
  }

  // Use dynamic book progress
  const bookData = progress.bookProgress[bookKey];
  if (!bookData) {
    return 0; // Start at overview (0) or first chapter (1) depending on your system
  }

  return clampStep(bookData.currentChapter, totalChapters);
}

/**
 * Mark a chapter as done for any book.
 * This unlocks the next chapter automatically.
 */
export function markChapterDone(book: string, chapter: number): void {
  if (typeof window === "undefined") return;

  const progress = loadProgress();
  const bookKey = book.toLowerCase();

  // Initialize book progress if it doesn't exist
  if (!progress.bookProgress) {
    progress.bookProgress = {};
  }
  if (!progress.bookProgress[bookKey]) {
    progress.bookProgress[bookKey] = {
      currentChapter: 0,
      completedChapters: [],
    };
  }

  const bookData = progress.bookProgress[bookKey];

  // Mark chapter as completed if not already
  if (!bookData.completedChapters.includes(chapter)) {
    bookData.completedChapters.push(chapter);
    bookData.completedChapters.sort((a, b) => a - b);
  }

  // Unlock next chapter (currentChapter becomes the next one)
  // If this is chapter 1, currentChapter becomes 2 (unlocking chapter 2)
  const nextChapter = chapter + 1;
  if (nextChapter > bookData.currentChapter) {
    bookData.currentChapter = nextChapter;
  }

  // Streak logic (same as before)
  const today = todayIso();
  const yesterday = yesterdayIso();

  if (progress.lastCompletedDate === today) {
    // already counted today, do nothing to streak
  } else if (progress.lastCompletedDate === yesterday) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }

  progress.lastCompletedDate = today;
  saveProgress(progress);
}

/**
 * Check if a specific chapter is unlocked for a book.
 */
export function isChapterUnlocked(book: string, chapter: number): boolean {
  const progress = loadProgress();
  const bookKey = book.toLowerCase();

  // Backward compatibility for Matthew
  if (bookKey === "matthew" && (!progress.bookProgress || !progress.bookProgress[bookKey])) {
    // Use old system: chapter is unlocked if it's <= currentStep
    // Assuming chapter 0 is overview, chapter 1 is Matthew 1, etc.
    return chapter <= progress.matthewCurrentStep;
  }

  const bookData = progress.bookProgress[bookKey];
  if (!bookData) {
    // If no progress, only chapter 0 (overview) or 1 is unlocked
    return chapter <= 1;
  }

  // Chapter is unlocked if it's <= currentChapter
  return chapter <= bookData.currentChapter;
}

/**
 * Check if a chapter is completed.
 */
export function isChapterCompleted(book: string, chapter: number): boolean {
  const progress = loadProgress();
  const bookKey = book.toLowerCase();

  // Backward compatibility for Matthew
  if (bookKey === "matthew" && (!progress.bookProgress || !progress.bookProgress[bookKey])) {
    return chapter < progress.matthewCurrentStep;
  }

  const bookData = progress.bookProgress[bookKey];
  if (!bookData) {
    return false;
  }

  return bookData.completedChapters.includes(chapter);
}

/**
 * Get list of completed chapters for a book.
 * Returns array of chapter numbers that have been completed.
 */
export function getCompletedChapters(book: string, maxChapters: number): number[] {
  const progress = loadProgress();
  const bookKey = book.toLowerCase();
  const completed: number[] = [];

  // Backward compatibility for Matthew
  if (bookKey === "matthew" && (!progress.bookProgress || !progress.bookProgress[bookKey])) {
    // If currentStep is 18, chapters 1-17 are completed (step 0 is overview, so we start from 1)
    for (let i = 1; i < progress.matthewCurrentStep && i <= maxChapters; i++) {
      completed.push(i);
    }
    return completed;
  }

  // Use dynamic book progress
  const bookData = progress.bookProgress[bookKey];
  if (!bookData) {
    return [];
  }

  // Get all chapters that should be considered completed
  // Include: all chapters from 1 up to (currentChapter - 1), plus any explicitly in completedChapters
  const completedSet = new Set<number>();
  
  // Add all chapters up to currentChapter - 1 (if currentChapter > 1)
  if (bookData.currentChapter > 1) {
    for (let i = 1; i < bookData.currentChapter && i <= maxChapters; i++) {
      completedSet.add(i);
    }
  }
  
  // Also add any chapters explicitly marked as completed
  bookData.completedChapters.forEach((ch) => {
    if (ch >= 1 && ch <= maxChapters) {
      completedSet.add(ch);
    }
  });

  // Return sorted array
  return Array.from(completedSet).sort((a, b) => a - b);
}
