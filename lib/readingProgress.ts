// lib/readingProgress.ts
// Pure helper functions for reading progress – no JSX here.

const STORAGE_KEY = "biblebuddy_reading_progress";

type ReadingProgress = {
  matthewCurrentStep: number; // 0 = overview, 1 = ch1, 2 = ch2, ...
  streak: number;
  lastCompletedDate: string | null; // "2025-12-04"
};

function getDefaultProgress(): ReadingProgress {
  return {
    matthewCurrentStep: 0,
    streak: 0,
    lastCompletedDate: null,
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
 * Simple unlock logic for books.
 * Matthew is always unlocked.
 * Mark unlocks when Matthew is fully finished.
 */
export function isBookUnlocked(book: string, matthewTotalSteps: number): boolean {
  const progress = loadProgress();

  if (book === "Matthew") return true;

  if (book === "Mark") {
    // if currentStep is at or beyond last index, Matthew is done
    return progress.matthewCurrentStep >= matthewTotalSteps - 1;
  }

  // everything else locked for now
  return false;
}
