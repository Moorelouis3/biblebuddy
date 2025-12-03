// /lib/readingProgress.ts

const STORAGE_KEY = "bb_reading_progress_v1";

type ReadingProgress = {
  matthewCurrentStep: number; // 0 = overview, 1 = Matthew 1, etc
  streak: number;
  lastReadDate: string | null; // "YYYY-MM-DD"
  unlockedBooks: string[];
};

const DEFAULT_PROGRESS: ReadingProgress = {
  matthewCurrentStep: 0,
  streak: 0,
  lastReadDate: null,
  unlockedBooks: ["Matthew"],
};

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function loadProgress(): ReadingProgress {
  if (!isBrowser()) return { ...DEFAULT_PROGRESS };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };

    const parsed = JSON.parse(raw) as Partial<ReadingProgress>;

    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      unlockedBooks: parsed.unlockedBooks ?? ["Matthew"],
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function saveProgress(data: ReadingProgress) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors
  }
}

function isSameDay(a: string | null, b: string | null) {
  if (!a || !b) return false;
  return a === b;
}

// ─────────────────────────────────────────────
// PUBLIC HELPERS
// ─────────────────────────────────────────────

export function getMatthewCurrentStep(totalItems: number): number {
  const data = loadProgress();
  let step = data.matthewCurrentStep ?? 0;

  if (step < 0) step = 0;
  if (step >= totalItems) step = totalItems - 1;

  return step;
}

export function isBookUnlocked(bookName: string): boolean {
  const data = loadProgress();
  return data.unlockedBooks.includes(bookName);
}

/**
 * Used by the Reading Plan grid to know which
 * books should be clickable.
 *
 * It keeps the original order of `allBooks`,
 * only returning the ones that are unlocked.
 */
export function getUnlockedBooks(allBooks: string[]): string[] {
  const data = loadProgress();
  const unlockedList = data.unlockedBooks && data.unlockedBooks.length
    ? data.unlockedBooks
    : ["Matthew"];

  return allBooks.filter((book) => unlockedList.includes(book));
}

/**
 * Mark one Matthew step as done and update
 * current step, streak and unlocked books.
 *
 * totalItems is overview plus chapters
 * stepIndex is the index that was just finished
 */
export function markMatthewStepDone(
  totalItems: number,
  stepIndex: number
): ReadingProgress {
  const data = loadProgress();

  // update streak
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10); // YYYY-MM-DD
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  if (!data.lastReadDate) {
    data.streak = 1;
  } else if (isSameDay(data.lastReadDate, todayStr)) {
    // already counted today, keep streak as is
  } else if (data.lastReadDate === yesterdayStr) {
    data.streak = (data.streak || 0) + 1;
  } else {
    data.streak = 1;
  }

  data.lastReadDate = todayStr;

  // move Matthew step forward
  const currentStep = data.matthewCurrentStep ?? 0;

  if (stepIndex >= currentStep && stepIndex < totalItems - 1) {
    data.matthewCurrentStep = stepIndex + 1;
  } else if (stepIndex >= totalItems - 1) {
    data.matthewCurrentStep = totalItems - 1;
  }

  // unlock Mark when final Matthew step is done
  const lastIndex = totalItems - 1;
  if (data.matthewCurrentStep >= lastIndex) {
    if (!data.unlockedBooks.includes("Mark")) {
      data.unlockedBooks.push("Mark");
    }
  }

  saveProgress(data);
  return data;
}
