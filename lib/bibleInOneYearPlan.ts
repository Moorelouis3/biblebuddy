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

export type GenesisBibleYearReading = {
  book: "Genesis";
  chapter: number;
  studyTitle: string;
  studyDayNumber: number;
};

export type GenesisBibleYearDay = {
  dayNumber: number;
  title: string;
  reference: string;
  estimatedTime: string;
  summary: string;
  coverImage?: string;
  readings: GenesisBibleYearReading[];
};

function buildGenesisReadings(studyTitle: string, startChapter: number, endChapter: number, studyStartDay: number): GenesisBibleYearReading[] {
  return Array.from({ length: endChapter - startChapter + 1 }, (_, index) => ({
    book: "Genesis",
    chapter: startChapter + index,
    studyTitle,
    studyDayNumber: studyStartDay + index,
  }));
}

export const GENESIS_BIBLE_IN_ONE_YEAR_SERIES: GenesisBibleYearDay[] = [
  {
    dayNumber: 1,
    title: "Creation of the World",
    reference: "Genesis 1-2",
    estimatedTime: "18 min",
    summary: "Start with creation, Eden, image of God, purpose, rest, and relationship.",
    readings: buildGenesisReadings("The Creation of the World", 1, 2, 1),
  },
  {
    dayNumber: 2,
    title: "Fall of Man",
    reference: "Genesis 3-4",
    estimatedTime: "about 15 min",
    summary: "Follow temptation, shame, Cain and Abel, exile, violence, and the first hints of hope.",
    readings: buildGenesisReadings("The Fall of Man", 3, 4, 1),
  },
  {
    dayNumber: 3,
    title: "Noah Builds an Ark",
    reference: "Genesis 5-7",
    estimatedTime: "about 15 min",
    summary: "Learn about the generations of Noah, the corruption of the earth, God's warning, Noah's obedience, and the ark.",
    coverImage: "/day3cover.png",
    readings: buildGenesisReadings("The Flood of Noah", 5, 7, 1),
  },
  {
    dayNumber: 4,
    title: "Life After the Flood",
    reference: "Genesis 8-10",
    estimatedTime: "about 16 min",
    summary: "Move through the flood waters receding, Noah's altar, God's covenant, the rainbow, human weakness, and the nations.",
    coverImage: "/Lifeafterflood.png",
    readings: buildGenesisReadings("The Flood of Noah", 8, 10, 4),
  },
  {
    dayNumber: 5,
    title: "Obedience of Abraham",
    reference: "Genesis 11-13",
    estimatedTime: "about 16 min",
    summary: "Begin Abraham's story with Babel, Abram's family line, God's call, Egypt, and Abram learning not to grasp.",
    coverImage: "/obedienceofabrahamnewcover.png",
    readings: buildGenesisReadings("The Obedience of Abraham", 11, 13, 1),
  },
  {
    dayNumber: 6,
    title: "The Rescue of Lot",
    reference: "Genesis 14-15",
    estimatedTime: "about 16 min",
    summary: "Follow Abram rescuing Lot, meeting Melchizedek, refusing Sodom's reward, and receiving God's covenant promise.",
    coverImage: "/TherescuseofLot.png",
    readings: buildGenesisReadings("The Obedience of Abraham", 14, 15, 4),
  },
  {
    dayNumber: 7,
    title: "The Covenant Promise",
    reference: "Genesis 16-17",
    estimatedTime: "about 14 min",
    summary: "Study Hagar, waiting, human shortcuts, the God who sees, new names, circumcision, Isaac, and covenant promise.",
    coverImage: "/Thecovenantpromise.png",
    readings: buildGenesisReadings("The Obedience of Abraham", 16, 17, 6),
  },
  {
    dayNumber: 8,
    title: "The Judgment of Sodom",
    reference: "Genesis 18-19",
    estimatedTime: "about 19 min",
    summary: "Move through Abraham welcoming the visitors, Sarah hearing the promise, Abraham interceding, Sodom's violence, Lot's rescue, and judgment.",
    readings: buildGenesisReadings("The Obedience of Abraham", 18, 19, 8),
  },
  {
    dayNumber: 9,
    title: "Abraham's Test and Legacy",
    reference: "Genesis 20-25",
    estimatedTime: "about 16 min",
    summary: "Close Abraham's journey with repeated fear, Isaac's birth, Hagar and Ishmael, the test on Mount Moriah, burial, Isaac's bride, and the covenant family moving forward.",
    readings: buildGenesisReadings("The Obedience of Abraham", 20, 25, 10),
  },
  {
    dayNumber: 10,
    title: "Covenant Through Isaac",
    reference: "Genesis 26-27",
    estimatedTime: "30-35 min",
    summary: "Study Isaac, wells, family tension, deception, Jacob, Esau, and the blessing moving through weakness.",
    readings: buildGenesisReadings("The Promise Through Isaac", 26, 27, 1),
  },
  {
    dayNumber: 11,
    title: "Wrestling of Jacob",
    reference: "Genesis 28-29",
    estimatedTime: "30-35 min",
    summary: "Begin Jacob's journey with Bethel, God's promise, exile, love, labor, and family complexity.",
    readings: buildGenesisReadings("The Wrestling of Jacob", 28, 29, 1),
  },
  {
    dayNumber: 12,
    title: "Wrestling of Jacob",
    reference: "Genesis 30-31",
    estimatedTime: "30-35 min",
    summary: "Follow household tension, growth, conflict with Laban, and Jacob learning to leave by faith.",
    readings: buildGenesisReadings("The Wrestling of Jacob", 30, 31, 3),
  },
  {
    dayNumber: 13,
    title: "Wrestling of Jacob",
    reference: "Genesis 32-33",
    estimatedTime: "30-35 min",
    summary: "Study fear, prayer, wrestling with God, a changed name, and reconciliation with Esau.",
    readings: buildGenesisReadings("The Wrestling of Jacob", 32, 33, 5),
  },
  {
    dayNumber: 14,
    title: "Wrestling of Jacob",
    reference: "Genesis 34-36",
    estimatedTime: "40-45 min",
    summary: "Close Jacob's section with grief, violence, renewal at Bethel, loss, and the Edomite line.",
    readings: buildGenesisReadings("The Wrestling of Jacob", 34, 36, 7),
  },
  {
    dayNumber: 15,
    title: "Testing of Joseph",
    reference: "Genesis 37-38",
    estimatedTime: "30-35 min",
    summary: "Begin Joseph's story with dreams, betrayal, the pit, Judah, Tamar, and God working in messy places.",
    readings: buildGenesisReadings("The Testing of Joseph", 37, 38, 1),
  },
  {
    dayNumber: 16,
    title: "Testing of Joseph",
    reference: "Genesis 39-40",
    estimatedTime: "30-35 min",
    summary: "Follow Joseph through integrity, false accusation, prison, forgotten service, and hidden preparation.",
    readings: buildGenesisReadings("The Testing of Joseph", 39, 40, 3),
  },
  {
    dayNumber: 17,
    title: "Testing of Joseph",
    reference: "Genesis 41-42",
    estimatedTime: "30-35 min",
    summary: "Watch Joseph rise with wisdom, famine begin, and his brothers unknowingly face the one they betrayed.",
    readings: buildGenesisReadings("The Testing of Joseph", 41, 42, 5),
  },
  {
    dayNumber: 18,
    title: "Testing of Joseph",
    reference: "Genesis 43-44",
    estimatedTime: "30-35 min",
    summary: "Study testing, fear, mercy, Judah's transformation, and the family reaching a breaking point.",
    readings: buildGenesisReadings("The Testing of Joseph", 43, 44, 7),
  },
  {
    dayNumber: 19,
    title: "Testing of Joseph",
    reference: "Genesis 45-46",
    estimatedTime: "30-35 min",
    summary: "Move into revelation, forgiveness, reunion, and Jacob's family going down into Egypt.",
    readings: buildGenesisReadings("The Testing of Joseph", 45, 46, 9),
  },
  {
    dayNumber: 20,
    title: "Testing of Joseph",
    reference: "Genesis 47-48",
    estimatedTime: "30-35 min",
    summary: "Study provision in Egypt, Jacob's final years, blessing, adoption, and covenant hope.",
    readings: buildGenesisReadings("The Testing of Joseph", 47, 48, 11),
  },
  {
    dayNumber: 21,
    title: "Testing of Joseph",
    reference: "Genesis 49-50",
    estimatedTime: "30-35 min",
    summary: "Finish Genesis with Jacob's blessings, burial, Joseph's forgiveness, and hope beyond Egypt.",
    readings: buildGenesisReadings("The Testing of Joseph", 49, 50, 13),
  },
];

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

