// lib/bibleInOneYearPlan.ts
// Generates a 365-day Bible reading plan distributing all chapters across the year

import { getBookTotalChapters } from "./readingProgress";

// All 66 books of the Bible in standard order
const ALL_BOOKS = [
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

export type ChapterAssignment = {
  book: string;
  chapter: number;
};

export type DayReading = {
  dayNumber: number;
  chapters: ChapterAssignment[];
};

export type WeekReading = {
  weekNumber: number;
  days: DayReading[];
};

export type BibleInOneYearPlan = {
  weeks: WeekReading[];
  totalDays: number;
  totalChapters: number;
};

/**
 * Generate a 365-day Bible reading plan
 * Distributes all chapters evenly across the year
 */
export function generateBibleInOneYearPlan(): BibleInOneYearPlan {
  // Collect all chapters from all books
  const allChapters: ChapterAssignment[] = [];
  
  for (const book of ALL_BOOKS) {
    const totalChapters = getBookTotalChapters(book);
    for (let chapter = 1; chapter <= totalChapters; chapter++) {
      allChapters.push({ book, chapter });
    }
  }

  const totalChapters = allChapters.length;
  const totalDays = 365;
  
  // Calculate chapters per day (will have some days with more/less)
  const baseChaptersPerDay = Math.floor(totalChapters / totalDays);
  const remainder = totalChapters % totalDays;
  
  // Distribute chapters across days
  const days: DayReading[] = [];
  let chapterIndex = 0;
  
  for (let day = 1; day <= totalDays; day++) {
    // Some days get one extra chapter to handle remainder
    const chaptersForDay = baseChaptersPerDay + (day <= remainder ? 1 : 0);
    const dayChapters: ChapterAssignment[] = [];
    
    for (let i = 0; i < chaptersForDay && chapterIndex < allChapters.length; i++) {
      dayChapters.push(allChapters[chapterIndex]);
      chapterIndex++;
    }
    
    days.push({
      dayNumber: day,
      chapters: dayChapters,
    });
  }
  
  // Group days into weeks (52 weeks, last week may have fewer days)
  const weeks: WeekReading[] = [];
  for (let week = 1; week <= 52; week++) {
    const weekStartDay = (week - 1) * 7 + 1;
    const weekDays = days.slice(weekStartDay - 1, weekStartDay + 6).filter(d => d !== undefined);
    
    if (weekDays.length > 0) {
      weeks.push({
        weekNumber: week,
        days: weekDays,
      });
    }
  }
  
  return {
    weeks,
    totalDays,
    totalChapters,
  };
}

/**
 * Get the current day number based on start date (defaults to Jan 1)
 * Can be customized to start from a specific date
 */
export function getCurrentDayNumber(startDate?: Date): number {
  const start = startDate || new Date(new Date().getFullYear(), 0, 1); // Jan 1 of current year
  const now = new Date();
  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Return day number (1-365), wrapping around if needed
  const dayNumber = (diffDays % 365) + 1;
  return Math.max(1, Math.min(365, dayNumber));
}

/**
 * Get week number for a given day number
 */
export function getWeekNumber(dayNumber: number): number {
  return Math.ceil(dayNumber / 7);
}

/**
 * Get day number within week (1-7) for a given day number
 */
export function getDayInWeek(dayNumber: number): number {
  const dayInWeek = ((dayNumber - 1) % 7) + 1;
  return dayInWeek;
}

