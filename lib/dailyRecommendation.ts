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

function parseChapterReference(label: string | null | undefined): { book: string; chapter: number } | null {
  if (!label) return null;

  const match = label.match(/^(.+?)\s+(\d+)$/);
  if (!match) return null;

  const chapter = parseInt(match[2], 10);
  if (Number.isNaN(chapter)) return null;

  return { book: match[1], chapter };
}

function pickRecommendedDevotional(
  devotionals: Array<{ id: string; title: string; total_days?: number | null }>
): { id: string; title: string; total_days?: number | null } | null {
  if (!devotionals.length) return null;

  const preferredTitleMatchers = [/tempt/i, /joseph/i, /prayer/i, /psalm/i, /gospel/i];

  for (const matcher of preferredTitleMatchers) {
    const match = devotionals.find((devotional) => matcher.test(devotional.title));
    if (match) return match;
  }

  return devotionals[0] ?? null;
}

function pickRandomRecommendation(options: DailyRecommendation[]): DailyRecommendation | null {
  if (!options.length) return null;
  return options[Math.floor(Math.random() * options.length)] ?? null;
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
    const lastDevotionalCompletion = allActions.find((a) => a.action_type === "devotional_day_completed");
    const lastReadingPlanCompletion = allActions.find((a) => a.action_type === "reading_plan_chapter_completed");
    const lastBibleReading = allActions.find((a) => a.action_type === "chapter_completed");
    const lastReferenceAction = allActions.find((a) =>
      a.action_type === "person_learned" ||
      a.action_type === "place_discovered" ||
      a.action_type === "keyword_mastered"
    );
    const lastTriviaAction = allActions.find((a) => a.action_type === "trivia_question_answered");
    const lastBibleNoteAction = allActions.find((a) => a.action_type === "note_created" || a.action_type === "verse_highlighted");
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

    const primaryCandidates: DailyRecommendation[] = [];

    // Fetch group memberships early — used for series, notification, and live study checks
    const { data: memberships } = await supabase
      .from("group_members")
      .select("group_id")
      .eq("user_id", userId)
      .eq("status", "approved")
      .limit(10);
    const memberGroupIds = (memberships || []).map((row: { group_id: string }) => row.group_id);

    // --- PRIMARY CANDIDATE: Active devotional ---
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
              : `You're in the middle of the ${dev.title} devotional and Day ${nextDay} is ready.`;
            primaryCandidates.push({
              greeting,
              contextLine: devContextLine,
              recommendationLine: `Pick up where you left off and continue with Day ${nextDay} today.`,
              primaryButtonText: `Continue Day ${nextDay}`,
              primaryButtonHref: `/devotionals/${dev.id}`,
              level: 1 as const,
            });
            break;
          }
        }
      }
    }

    // --- PRIMARY CANDIDATE: Active reading plan ---
    const lastReadingPlan = allActions.find((a) => a.action_type === "reading_plan_chapter_completed");
    if (lastReadingPlan) {
      const colonIndex = (lastReadingPlan.action_label || "").indexOf(": ");
      const planName = colonIndex !== -1 ? lastReadingPlan.action_label!.slice(0, colonIndex) : "your reading plan";
      const chapterRef = colonIndex !== -1 ? lastReadingPlan.action_label!.slice(colonIndex + 2) : "a chapter";
      const rpDate = new Date(lastReadingPlan.created_at);
      const isBibleBuddy = planName.toLowerCase().includes("bible buddy");
      const parsedChapter = parseChapterReference(chapterRef);

      if (isBibleBuddy && parsedChapter) {
        const nextChapter = getNextBibleChapter(parsedChapter.book, parsedChapter.chapter);
        primaryCandidates.push({
          greeting,
          contextLine: contextLine(
            rpDate,
            `you finished ${chapterRef} in the Bible Buddy Reading Plan.`,
            `It's been a while since you last opened the Bible Buddy Reading Plan.`
          ),
          recommendationLine: `Your next chapter is ${nextChapter.book} ${nextChapter.chapter}.`,
          primaryButtonText: `Read ${nextChapter.book} ${nextChapter.chapter}`,
          primaryButtonHref: `/Bible/${nextChapter.book}/${nextChapter.chapter}`,
          level: 1 as const,
        });
      } else {
        primaryCandidates.push({
          greeting,
          contextLine: contextLine(
            rpDate,
            `you read ${chapterRef} in ${planName}.`,
            `It's been a while since you last read from ${planName}.`
          ),
          recommendationLine: `Jump back into ${planName} and keep the momentum going today.`,
          primaryButtonText: "Continue Reading Plan",
          primaryButtonHref: isBibleBuddy ? "/reading-plans/bible-buddy" : "/reading-plans/bible-in-one-year",
          level: 1 as const,
        });
      }
    }

    // --- PRIMARY CANDIDATE: Continue Bible reading ---
    if (lastBibleReading) {
      const actionDate = new Date(lastBibleReading.created_at);
      const label = lastBibleReading.action_label || "";
      const chMatch = label.match(/^(.+?)\s+(\d+)$/);
      if (chMatch) {
        const chBook = chMatch[1];
        const chNum = parseInt(chMatch[2], 10);
        const next = getNextBibleChapter(chBook, chNum);
        const nextLabel = `${next.book} ${next.chapter}`;
        primaryCandidates.push({
          greeting,
          contextLine: contextLine(
            actionDate,
            `you finished ${label}.`,
            `It's been a while since you last read in ${chBook}.`
          ),
          recommendationLine: `Keep reading by starting ${nextLabel} next.`,
          primaryButtonText: `Read ${nextLabel}`,
          primaryButtonHref: `/Bible/${next.book}/${next.chapter}`,
          level: 2 as const,
        });
      } else {
        primaryCandidates.push({
          greeting,
          contextLine: contextLine(
            actionDate,
            `you read ${label}.`,
            `It's been a while since you last opened the Bible.`
          ),
          recommendationLine: "Open the Bible and continue where you left off.",
          primaryButtonText: "Open Bible",
          primaryButtonHref: "/Bible",
          level: 2 as const,
        });
      }
    }

    // --- GROUP CANDIDATES ---
    if (memberGroupIds.length > 0) {
      // HIGH PRIORITY: Bible study series not yet started
      const hasStartedSeries = allActions.some(
        (a) =>
          a.action_type === "series_week_viewed" ||
          a.action_type === "group_series_started" ||
          a.action_type === "series_day_completed"
      );

      if (!hasStartedSeries) {
        const { data: seriesGroupPosts } = await supabase
          .from("weekly_group_series_posts")
          .select("group_id, title")
          .in("group_id", memberGroupIds)
          .eq("series_key", "bible_study_saturday")
          .order("created_at", { ascending: true })
          .limit(1);

        const firstSeriesPost = seriesGroupPosts?.[0];
        if (firstSeriesPost) {
          primaryCandidates.push({
            greeting,
            contextLine: "Your Bible Study Group has an active Bible study series.",
            recommendationLine: "Start with Week 1 and study the Word alongside the rest of the group.",
            primaryButtonText: "Start Week 1 Bible Study",
            primaryButtonHref: `/study-groups/${firstSeriesPost.group_id}/series/week/1`,
            level: 1 as const,
          });
        }
      }

      // HIGH PRIORITY: Unread group notifications
      const { count: unreadGroupCount } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_read", false)
        .like("article_slug", "/study-groups/%");

      if (unreadGroupCount && unreadGroupCount > 0) {
        const notifLine =
          unreadGroupCount === 1
            ? "There's new activity in your Bible Study Group."
            : `There are ${unreadGroupCount} new things happening in your Bible Study Group.`;
        primaryCandidates.push({
          greeting,
          contextLine: notifLine,
          recommendationLine: "The group is active — check in and see what you missed.",
          primaryButtonText: "Open Study Group",
          primaryButtonHref: `/study-groups/${memberGroupIds[0]}/chat`,
          level: 1 as const,
        });
      }

      // SECONDARY: This week's live Bible study post
      const { data: liveStudyPosts } = await supabase
        .from("weekly_group_series_posts")
        .select("group_id, title, description, created_at")
        .eq("series_key", "bible_study_saturday")
        .in("group_id", memberGroupIds)
        .order("created_at", { ascending: false })
        .limit(1);

      const liveStudy = liveStudyPosts?.[0];
      if (liveStudy) {
        primaryCandidates.push({
          greeting,
          contextLine: contextLine(
            new Date(liveStudy.created_at),
            `your group has this week's Bible study ready.`,
            `It's been a while since you checked your Bible Study Group.`
          ),
          recommendationLine: liveStudy.title || "Open this week's live Bible study in your group.",
          primaryButtonText: "Open Study Group",
          primaryButtonHref: `/study-groups/${liveStudy.group_id}/chat`,
          level: 2 as const,
        });
      }
    }

    const randomPrimary = pickRandomRecommendation(primaryCandidates);
    if (randomPrimary) {
      return randomPrimary;
    }

    // --- PRIORITY 4: Continue devotionals before anything else ---
    if (lastDevotionalCompletion) {
      return {
        greeting,
        contextLine: contextLine(
          new Date(lastDevotionalCompletion.created_at),
          `you completed a devotional day.`,
          `It's been a while since you last worked on a devotional.`
        ),
        recommendationLine: "Open your devotionals and continue where you left off.",
        primaryButtonText: "View Devotionals",
        primaryButtonHref: "/devotionals",
        level: 2 as const,
      };
    }

    // --- PRIORITY 5: Reference tools after Bible reading ---
    if (lastReferenceAction) {
      const actionDate = new Date(lastReferenceAction.created_at);
      const label = lastReferenceAction.action_label || "";

      switch (lastReferenceAction.action_type) {
        case "person_learned":
          return {
            greeting,
            contextLine: contextLine(
              actionDate,
              `you looked up ${label}.`,
              `It's been a while since you last explored people in the Bible.`
            ),
            recommendationLine: "Open the people tool again and learn another Bible person today.",
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
            recommendationLine: "Open the places tool again and explore another Bible location today.",
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
            recommendationLine: "Open the keywords tool again and dig into another key word today.",
            primaryButtonText: "Explore Keywords",
            primaryButtonHref: "/keywords-in-the-bible",
            level: 2 as const,
          };
      }
    }

    // --- PRIORITY 6: Other meaningful actions ---
    if (lastTriviaAction) {
      return {
        greeting,
        contextLine: contextLine(
          new Date(lastTriviaAction.created_at),
          `you finished a round of trivia.`,
          `It's been a while since you last played Bible trivia.`
        ),
        recommendationLine: "Play another round and keep building what you know.",
        primaryButtonText: "Do Trivia",
        primaryButtonHref: "/bible-trivia",
        level: 2 as const,
      };
    }

    if (lastBibleNoteAction) {
      return {
        greeting,
        contextLine: contextLine(
          new Date(lastBibleNoteAction.created_at),
          lastBibleNoteAction.action_type === "note_created"
            ? `you created a note while reading.`
            : `you highlighted some verses.`,
          `It's been a while since you last opened the Bible.`
        ),
        recommendationLine: "Open the Bible and keep going while it is still fresh.",
        primaryButtonText: "Open Bible",
        primaryButtonHref: "/Bible",
        level: 2 as const,
      };
    }

    // --- PRIORITY 7: Fallback to last meaningful action if needed ---
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
                `you finished ${label}.`,
                `It's been a while since you last read in ${chBook}.`
              ),
              recommendationLine: `Keep reading by starting ${nextLabel} next.`,
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
            recommendationLine: "Open the people tool again and learn another Bible person today.",
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
            recommendationLine: "Open the places tool again and explore another Bible location today.",
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
            recommendationLine: "Open the keywords tool again and dig into another key word today.",
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
            recommendationLine: "Play another round and keep building what you know.",
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
            recommendationLine: "Jump back into Scripture and keep reading from where you were studying.",
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
            recommendationLine: "Open the Bible and keep going while those verses are still fresh.",
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
            recommendationLine: "Pick a devotional and keep your consistency going today.",
            primaryButtonText: "View Devotionals",
            primaryButtonHref: "/devotionals",
            level: 2 as const,
          };
      }
    }

    // --- PRIORITY 4: New user — recommend The Tempting of Jesus ---
    const { data: recommendedDevotionals } = await supabase
      .from("devotionals")
      .select("id, title, total_days")
      .limit(10);

    const recommendedDevotional = pickRecommendedDevotional(recommendedDevotionals || []);

    if (recommendedDevotional) {
      return {
        greeting: "Welcome to Bible Buddy.",
        contextLine: `You have not started a devotional yet, and ${recommendedDevotional.title} is a great place to begin.`,
        recommendationLine: "Start with Day 1 today and build a simple daily habit.",
        primaryButtonText: "Start Day 1",
        primaryButtonHref: `/devotionals/${recommendedDevotional.id}`,
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
