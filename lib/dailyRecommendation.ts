/**
 * Daily Recommendation Logic
 *
 * Determines what Lil Louis should recommend to the user on their first login each day.
 * Priority: Active devotional → Active reading plan → Last meaningful action → New user default
 */

import { supabase } from "./supabaseClient";
import { getBookTotalChapters } from "./readingProgress";

/** Canonical Bible book order — used to find the next book after the last chapter */
const BIBLE_BOOK_ORDER = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
  "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah",
  "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
  "Jude", "Revelation",
];

/** Returns the next chapter after the given book + chapter, wrapping across book boundaries */
function getNextBibleChapter(book: string, chapter: number): { book: string; chapter: number } {
  const total = getBookTotalChapters(book);
  if (chapter < total) return { book, chapter: chapter + 1 };
  const idx = BIBLE_BOOK_ORDER.findIndex((b) => b.toLowerCase() === book.toLowerCase());
  if (idx !== -1 && idx < BIBLE_BOOK_ORDER.length - 1) return { book: BIBLE_BOOK_ORDER[idx + 1], chapter: 1 };
  return { book: "Genesis", chapter: 1 }; // wrap after Revelation
}

export interface DailyRecommendation {
  greeting: string;
  contextLine: string;
  recommendationLine: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  /** 1 = devotional/reading plan recommendation, 2 = activity-based or fallback */
  level: 1 | 2;
}

const MEANINGFUL_ACTIONS = [
  "devotional_day_completed",
  "reading_plan_chapter_completed",
  "chapter_completed",
  "person_learned",
  "place_discovered",
  "keyword_mastered",
  "trivia_question_answered",
  "note_created",
  "verse_highlighted",
];

/**
 * Returns a time prefix string, or null if it's been 14+ days (long ago).
 * null signals the caller to use "It's been a while since you last..." phrasing.
 */
function timePrefix(date: Date): string | null {
  const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 1) return "Yesterday";
  if (diffDays <= 6) return "Earlier this week";
  return null;
}

/** Build a contextLine that handles both recent and long-ago phrasing */
function contextLine(date: Date, recentPhrase: string, longAgoPhrase: string): string {
  const prefix = timePrefix(date);
  return prefix ? `${prefix} ${recentPhrase}` : longAgoPhrase;
}

/** Calculate current consecutive login streak from user_login action dates */
function calculateStreak(actions: { action_type: string; created_at: string }[]): number {
  const loginDates = actions
    .filter((a) => a.action_type === "user_login")
    .map((a) => a.created_at.slice(0, 10));

  const unique = [...new Set(loginDates)].sort().reverse();
  if (unique.length === 0) return 0;

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // Streak must include today or yesterday
  if (unique[0] !== today && unique[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(unique[i - 1]);
    const curr = new Date(unique[i]);
    const diff = Math.round((prev.getTime() - curr.getTime()) / 86400000);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

export async function getDailyRecommendation(userId: string, suppressLevel1 = false): Promise<DailyRecommendation | null> {
  try {
    // Fetch recent actions for context
    const { data: actions } = await supabase
      .from("master_actions")
      .select("action_type, action_label, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(100);

    const allActions = actions || [];

    // --- Greeting line ---
    const streak = calculateStreak(allActions);
    const lastMeaningful = allActions.find((a) => MEANINGFUL_ACTIONS.includes(a.action_type));
    const daysSinceActive = lastMeaningful
      ? Math.floor((Date.now() - new Date(lastMeaningful.created_at).getTime()) / 86400000)
      : null;

    let greeting: string;
    if (streak >= 2) {
      greeting = `You're on a ${streak} day streak.`;
    } else if (daysSinceActive !== null && daysSinceActive >= 7) {
      greeting = daysSinceActive >= 21
        ? "You've been away for a while. Welcome back."
        : `You haven't checked in for ${daysSinceActive} days. Welcome back.`;
    } else {
      greeting = "Good to see you.";
    }

    if (!suppressLevel1) {
      // --- PRIORITY 1: Active devotional ---
      const { data: devotionalProgress } = await supabase
        .from("devotional_progress")
        .select("devotional_id, day_number, is_completed")
        .eq("user_id", userId)
        .eq("is_completed", true)
        .order("day_number", { ascending: false });

      if (devotionalProgress && devotionalProgress.length > 0) {
        const maxByDevotional: Record<string, number> = {};
        for (const row of devotionalProgress) {
          if (!maxByDevotional[row.devotional_id] || row.day_number > maxByDevotional[row.devotional_id]) {
            maxByDevotional[row.devotional_id] = row.day_number;
          }
        }

        const { data: devotionals } = await supabase
          .from("devotionals")
          .select("id, title, total_days")
          .in("id", Object.keys(maxByDevotional));

        if (devotionals) {
          for (const dev of devotionals) {
            const maxDay = maxByDevotional[dev.id];
            if (maxDay < dev.total_days) {
              const nextDay = maxDay + 1;
              const lastDevAction = allActions.find(
                (a) => a.action_type === "devotional_day_completed" && a.action_label?.includes(dev.title)
              );
              const devContextLine = lastDevAction
                ? contextLine(
                    new Date(lastDevAction.created_at),
                    `you finished Day ${maxDay} of the ${dev.title} devotional.`,
                    `It's been a while since you last worked on the ${dev.title} devotional.`
                  )
                : `You're on Day ${nextDay} of the ${dev.title} devotional.`;
              return {
                greeting,
                contextLine: devContextLine,
                recommendationLine: `Ready to continue with Day ${nextDay}?`,
                primaryButtonText: `Continue Day ${nextDay}`,
                primaryButtonHref: `/devotionals/${dev.id}`,
                level: 1 as const,
              };
            }
          }
        }
      }

      // --- PRIORITY 2: Active reading plan ---
      const lastReadingPlan = allActions.find((a) => a.action_type === "reading_plan_chapter_completed");
      if (lastReadingPlan) {
        const colonIndex = (lastReadingPlan.action_label || "").indexOf(": ");
        const planName = colonIndex !== -1 ? lastReadingPlan.action_label!.slice(0, colonIndex) : "your reading plan";
        const chapterRef = colonIndex !== -1 ? lastReadingPlan.action_label!.slice(colonIndex + 2) : "a chapter";
        const rpDate = new Date(lastReadingPlan.created_at);
        const isBibleBuddy = planName.toLowerCase().includes("bible buddy");

        if (isBibleBuddy) {
          const match = chapterRef.match(/^(.+?)\s+(\d+)$/);
          if (match) {
            const book = match[1];
            const chapter = parseInt(match[2], 10);
            const nextChapter = chapter + 1;
            return {
              greeting,
              contextLine: contextLine(
                rpDate,
                `you read ${chapterRef} in the Bible Buddy Reading Plan.`,
                `It's been a while since you last read ${chapterRef} in the Bible Buddy Reading Plan.`
              ),
              recommendationLine: `Want to continue with ${book} ${nextChapter} today?`,
              primaryButtonText: `Read ${book} ${nextChapter}`,
              primaryButtonHref: `/Bible/${book}/${nextChapter}`,
              level: 1 as const,
            };
          }
        }

        return {
          greeting,
          contextLine: contextLine(
            rpDate,
            `you read ${chapterRef} in ${planName}.`,
            `It's been a while since you last read from ${planName}.`
          ),
          recommendationLine: "Want to continue your reading plan today?",
          primaryButtonText: "Continue Reading Plan",
          primaryButtonHref: isBibleBuddy ? "/reading-plans/bible-buddy" : "/reading-plans/bible-in-one-year",
          level: 1 as const,
        };
      }
    } // end !suppressLevel1

    // --- PRIORITY 3: Last meaningful action ---
    if (lastMeaningful) {
      const actionDate = new Date(lastMeaningful.created_at);
      const label = lastMeaningful.action_label || "";

      switch (lastMeaningful.action_type) {
        case "chapter_completed": {
          // action_label = "Proverbs 10" — parse book + chapter
          const chMatch = label.match(/^(.+?)\s+(\d+)$/);
          if (chMatch) {
            const chBook = chMatch[1];
            const chNum = parseInt(chMatch[2], 10);
            const next = getNextBibleChapter(chBook, chNum);
            const nextLabel = `${next.book} ${next.chapter}`;
            return {
              greeting,
              contextLine: contextLine(
                actionDate,
                `you read ${label}.`,
                `It's been a while since you last read ${label}.`
              ),
              recommendationLine: `Want to continue with ${nextLabel} today?`,
              primaryButtonText: `Read ${nextLabel}`,
              primaryButtonHref: `/Bible/${next.book}/${next.chapter}`,
              level: 2 as const,
            };
          }
          // Fallback if label doesn't parse (shouldn't happen)
          return {
            greeting,
            contextLine: contextLine(
              actionDate,
              `you read ${label}.`,
              `It's been a while since you last read ${label}.`
            ),
            recommendationLine: "Want to keep reading today?",
            primaryButtonText: "Continue Reading",
            primaryButtonHref: "/Bible",
            level: 2 as const,
          };
        }

        case "person_learned":
          return {
            greeting,
            contextLine: contextLine(
              actionDate,
              `you looked up ${label}.`,
              `It's been a while since you last explored people in the Bible.`
            ),
            recommendationLine: "Want to explore another person in the Bible?",
            primaryButtonText: "Explore People",
            primaryButtonHref: "/people-in-the-bible",
            level: 2 as const,
          };

        case "place_discovered":
          return {
            greeting,
            contextLine: contextLine(
              actionDate,
              `you looked up ${label}.`,
              `It's been a while since you last explored places in the Bible.`
            ),
            recommendationLine: "Want to explore another place in the Bible?",
            primaryButtonText: "Explore Places",
            primaryButtonHref: "/places-in-the-bible",
            level: 2 as const,
          };

        case "keyword_mastered":
          return {
            greeting,
            contextLine: contextLine(
              actionDate,
              `you looked up ${label}.`,
              `It's been a while since you last explored Bible keywords.`
            ),
            recommendationLine: "Want to explore another Bible keyword?",
            primaryButtonText: "Explore Keywords",
            primaryButtonHref: "/keywords-in-the-bible",
            level: 2 as const,
          };

        case "trivia_question_answered":
          return {
            greeting,
            contextLine: contextLine(
              actionDate,
              `you finished a round of trivia.`,
              `It's been a while since you last played Bible trivia.`
            ),
            recommendationLine: "Want to do more trivia today?",
            primaryButtonText: "Do Trivia",
            primaryButtonHref: "/bible-trivia",
            level: 2 as const,
          };

        case "note_created":
          return {
            greeting,
            contextLine: contextLine(
              actionDate,
              `you created a note while reading.`,
              `It's been a while since you last opened the Bible.`
            ),
            recommendationLine: "Want to keep reading today?",
            primaryButtonText: "Open Bible",
            primaryButtonHref: "/Bible",
            level: 2 as const,
          };

        case "verse_highlighted":
          return {
            greeting,
            contextLine: contextLine(
              actionDate,
              `you highlighted some verses.`,
              `It's been a while since you last opened the Bible.`
            ),
            recommendationLine: "Want to keep reading today?",
            primaryButtonText: "Open Bible",
            primaryButtonHref: "/Bible",
            level: 2 as const,
          };

        case "devotional_day_completed":
          return {
            greeting,
            contextLine: contextLine(
              actionDate,
              `you completed a devotional day.`,
              `It's been a while since you last worked on a devotional.`
            ),
            recommendationLine: "Want to continue your devotional today?",
            primaryButtonText: "View Devotionals",
            primaryButtonHref: "/devotionals",
            level: 2 as const,
          };
      }
    }

    // --- PRIORITY 4: New user — recommend The Tempting of Jesus ---
    const { data: freeDevotional } = await supabase
      .from("devotionals")
      .select("id, title")
      .ilike("title", "%Tempt%")
      .maybeSingle();

    if (freeDevotional) {
      return {
        greeting: "Welcome to Bible Buddy.",
        contextLine: "A great place to start is my free devotional.",
        recommendationLine: `Want to begin Day 1 of ${freeDevotional.title}?`,
        primaryButtonText: "Start Day 1",
        primaryButtonHref: `/devotionals/${freeDevotional.id}`,
        level: 2 as const,
      };
    }

    return {
      greeting: "Welcome to Bible Buddy.",
      contextLine: "There's a lot to explore here.",
      recommendationLine: "Want to start reading the Bible today?",
      primaryButtonText: "Open Bible",
      primaryButtonHref: "/Bible",
      level: 2 as const,
    };
  } catch (err) {
    console.error("[DAILY_RECOMMENDATION] Error:", err);
    return null;
  }
}
