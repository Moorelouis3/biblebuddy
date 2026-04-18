/**
 * Daily Recommendation Logic
 *
 * The dashboard card and daily modal should feel like a smart nudge,
 * not a generic banner. This file looks at what the user has already
 * done, what they have ignored, and what is most likely to help them
 * re-enter the app with momentum.
 */

import { SCRAMBLED_BOOKS } from "./scrambledGameData";
import { supabase } from "./supabaseClient";
import { getBookTotalChapters } from "./readingProgress";

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
] as const;

type RecommendationTheme = "rose" | "blue" | "green" | "purple" | "gold";
type RecommendationCategory =
  | "profile"
  | "group"
  | "devotional"
  | "reading_plan"
  | "bible"
  | "trivia"
  | "games"
  | "reference"
  | "upgrade"
  | "general";

interface RecommendationCandidate extends DailyRecommendation {
  priority: number;
}

type RecommendationHistory = {
  shownAt: string;
  key: string;
  category: RecommendationCategory;
};

interface ProfileSnapshot {
  is_paid?: boolean | null;
  onboarding_completed?: boolean | null;
  display_name?: string | null;
  username?: string | null;
  profile_image_url?: string | null;
  bio?: string | null;
  chapters_completed_count?: number | null;
  trivia_questions_answered?: number | null;
  people_learned_count?: number | null;
  places_discovered_count?: number | null;
  keywords_mastered_count?: number | null;
}

export interface DailyRecommendation {
  greeting: string;
  contextLine: string;
  recommendationLine: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  level: 1 | 2;
  cardTitle?: string;
  cardSubtitle?: string;
  cardEyebrow?: string;
  cardTheme?: RecommendationTheme;
  recommendationKey?: string;
  category?: RecommendationCategory;
  imageHint?: string;
}

type LouisMessageTemplate = {
  title: string;
  subtitle: string;
};

const MEANINGFUL_ACTIONS = [
  "devotional_day_completed",
  "reading_plan_chapter_completed",
  "chapter_completed",
  "person_learned",
  "place_discovered",
  "keyword_mastered",
  "trivia_question_answered",
  "scrambled_word_answered",
  "note_created",
  "verse_highlighted",
];

function getScrambledBookSlug(book: string): string | null {
  return SCRAMBLED_BOOKS.find((entry) => entry.name.toLowerCase() === book.toLowerCase())?.slug ?? null;
}

function parseScrambledCompletionLabel(
  label: string | null | undefined,
): { book: string; chapter: number; score: number; total: number } | null {
  if (!label) return null;
  const match = label.match(/^(.+?)\s+(\d+)\s+-\s+(\d+)\/(\d+)$/);
  if (!match) return null;

  const chapter = parseInt(match[2], 10);
  const score = parseInt(match[3], 10);
  const total = parseInt(match[4], 10);
  if ([chapter, score, total].some((value) => Number.isNaN(value))) return null;

  return {
    book: match[1],
    chapter,
    score,
    total,
  };
}

function getNextBibleChapter(book: string, chapter: number): { book: string; chapter: number } {
  const total = getBookTotalChapters(book);
  if (chapter < total) return { book, chapter: chapter + 1 };
  const idx = BIBLE_BOOK_ORDER.findIndex((b) => b.toLowerCase() === book.toLowerCase());
  if (idx !== -1 && idx < BIBLE_BOOK_ORDER.length - 1) {
    return { book: BIBLE_BOOK_ORDER[idx + 1], chapter: 1 };
  }
  return { book: "Genesis", chapter: 1 };
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

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickLouisVariant(
  key: string,
  templates: LouisMessageTemplate[],
): LouisMessageTemplate {
  if (!templates.length) {
    return { title: "Louis has a next step for you", subtitle: "Open the app and keep going today." };
  }
  const index = hashString(key) % templates.length;
  return templates[index];
}

function withLouisCard(
  recommendation: RecommendationCandidate,
  templates: LouisMessageTemplate[],
): RecommendationCandidate {
  const variant = pickLouisVariant(
    `${recommendation.category || "general"}:${recommendation.primaryButtonHref}:${recommendation.primaryButtonText}`,
    templates,
  );

  return {
    ...recommendation,
    cardTitle: variant.title,
    cardSubtitle: variant.subtitle,
  };
}

function daysSince(dateString: string | null | undefined): number | null {
  if (!dateString) return null;
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return null;
  return Math.floor((Date.now() - parsed.getTime()) / 86400000);
}

function timePrefix(date: Date): string | null {
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (diffDays <= 1) return "Yesterday";
  if (diffDays <= 6) return "Earlier this week";
  return null;
}

function contextLine(date: Date, recentPhrase: string, longAgoPhrase: string): string {
  const prefix = timePrefix(date);
  return prefix ? `${prefix} ${recentPhrase}` : longAgoPhrase;
}

function calculateStreak(actions: { action_type: string; created_at: string }[]): number {
  const loginDates = actions
    .filter((a) => a.action_type === "user_login")
    .map((a) => a.created_at.slice(0, 10));

  const unique = [...new Set(loginDates)].sort().reverse();
  if (unique.length === 0) return 0;

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
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

function pickHighestPriority(options: RecommendationCandidate[]): DailyRecommendation | null {
  if (!options.length) return null;
  const bestPriority = Math.max(...options.map((option) => option.priority));
  const finalists = options.filter((option) => option.priority === bestPriority);
  return finalists[Math.floor(Math.random() * finalists.length)] ?? null;
}

function getRecommendationHistory(): RecommendationHistory | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("bb_daily_recommendation_history");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RecommendationHistory;
    if (!parsed?.key || !parsed?.category || !parsed?.shownAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveRecommendationHistory(recommendation: DailyRecommendation) {
  if (typeof window === "undefined") return;
  if (!recommendation.recommendationKey || !recommendation.category) return;
  const payload: RecommendationHistory = {
    shownAt: new Date().toISOString(),
    key: recommendation.recommendationKey,
    category: recommendation.category,
  };
  try {
    window.localStorage.setItem("bb_daily_recommendation_history", JSON.stringify(payload));
  } catch {
    // no-op
  }
}

function getTodayActionSet(actions: { action_type: string; created_at: string }[]) {
  const today = new Date().toISOString().slice(0, 10);
  const todayActions = actions.filter((action) => action.created_at.slice(0, 10) === today);
  return {
    hasDevotional: todayActions.some((action) => action.action_type === "devotional_day_completed"),
    hasReadingPlan: todayActions.some((action) => action.action_type === "reading_plan_chapter_completed"),
    hasBible: todayActions.some((action) => action.action_type === "chapter_completed"),
    hasTrivia: todayActions.some((action) => action.action_type === "trivia_question_answered"),
    hasGames: todayActions.some(
      (action) =>
        action.action_type === "trivia_question_answered" ||
        action.action_type === "scrambled_word_answered" ||
        action.action_type === "scrambled_chapter_completed",
    ),
    hasReference: todayActions.some((action) =>
      action.action_type === "person_learned" ||
      action.action_type === "place_discovered" ||
      action.action_type === "keyword_mastered"
    ),
    hasGroup: todayActions.some((action) =>
      action.action_type === "series_week_viewed" ||
      action.action_type === "group_series_started" ||
      action.action_type === "series_day_completed"
    ),
  };
}

function scoreRecommendation(
  recommendation: RecommendationCandidate,
  history: RecommendationHistory | null,
  todayActions: ReturnType<typeof getTodayActionSet>,
  suppressLevel1: boolean
) {
  let score = recommendation.priority;

  if (suppressLevel1 && recommendation.level === 1) {
    score -= 10;
  }

  if (history) {
    const hoursSinceShown = (Date.now() - new Date(history.shownAt).getTime()) / 3600000;
    if (hoursSinceShown < 36 && recommendation.recommendationKey === history.key) {
      score -= 14;
    } else if (hoursSinceShown < 18 && recommendation.category === history.category) {
      score -= 7;
    }
  }

  if (
    (recommendation.category === "devotional" && todayActions.hasDevotional) ||
    (recommendation.category === "reading_plan" && todayActions.hasReadingPlan) ||
    (recommendation.category === "bible" && todayActions.hasBible) ||
    (recommendation.category === "trivia" && todayActions.hasTrivia) ||
    (recommendation.category === "games" && todayActions.hasGames) ||
    (recommendation.category === "reference" && todayActions.hasReference) ||
    (recommendation.category === "group" && todayActions.hasGroup)
  ) {
    score -= 9;
  }

  const hour = new Date().getHours();
  if (hour < 11 && (recommendation.category === "devotional" || recommendation.category === "bible" || recommendation.category === "reading_plan")) {
    score += 2;
  }
  if (
    hour >= 17 &&
    (
      recommendation.category === "group" ||
      recommendation.category === "trivia" ||
      recommendation.category === "games" ||
      recommendation.category === "reference"
    )
  ) {
    score += 2;
  }

  return score;
}

function pickSmartRecommendation(
  options: RecommendationCandidate[],
  history: RecommendationHistory | null,
  todayActions: ReturnType<typeof getTodayActionSet>,
  suppressLevel1: boolean
): DailyRecommendation | null {
  if (!options.length) return null;

  const scored = options.map((option) => ({
    option,
    score: scoreRecommendation(option, history, todayActions, suppressLevel1),
  }));

  const bestScore = Math.max(...scored.map((entry) => entry.score));
  const finalists = scored
    .filter((entry) => entry.score >= bestScore - 2)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.option);

  return finalists[Math.floor(Math.random() * finalists.length)] ?? null;
}

function createRecommendation(input: Omit<RecommendationCandidate, "priority" | "recommendationKey"> & { priority: number }): RecommendationCandidate {
  const category = input.category || "general";
  const recommendationKey = `${category}:${input.primaryButtonHref}:${input.cardTitle || input.primaryButtonText}`;
  return {
    ...input,
    category,
    recommendationKey,
  };
}

export async function getDailyRecommendation(userId: string, suppressLevel1 = false): Promise<DailyRecommendation | null> {
  try {
    const [actionsRes, profileRes, membershipsRes] = await Promise.all([
      supabase
        .from("master_actions")
        .select("action_type, action_label, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(150),
      supabase
        .from("profile_stats")
        .select("is_paid, onboarding_completed, display_name, username, profile_image_url, bio, chapters_completed_count, trivia_questions_answered, people_learned_count, places_discovered_count, keywords_mastered_count")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("group_members")
        .select("group_id")
        .eq("user_id", userId)
        .eq("status", "approved")
        .limit(10),
    ]);

    const allActions = actionsRes.data || [];
    const profile = (profileRes.data || {}) as ProfileSnapshot;
    const memberGroupIds = (membershipsRes.data || []).map((row: { group_id: string }) => row.group_id);

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
    const lastScrambledCompletion = allActions.find((a) => a.action_type === "scrambled_chapter_completed");
    const lastBibleNoteAction = allActions.find((a) => a.action_type === "note_created" || a.action_type === "verse_highlighted");
    const daysSinceActive = lastMeaningful ? daysSince(lastMeaningful.created_at) : null;
    const loginActions = allActions.filter((a) => a.action_type === "user_login");

    let greeting = "Good to see you.";
    if (streak >= 2) {
      greeting = `You're on a ${streak} day streak.`;
    } else if (daysSinceActive !== null && daysSinceActive >= 7) {
      greeting = daysSinceActive >= 21
        ? "You've been away for a while. Welcome back."
        : `You haven't checked in for ${daysSinceActive} days. Welcome back.`;
    }

    const candidates: RecommendationCandidate[] = [];

    const hasDisplayName = !!(profile.display_name?.trim() || profile.username?.trim());
    const hasPhoto = !!profile.profile_image_url;
    const hasBio = !!profile.bio?.trim();
    const profileMissingCount = [hasDisplayName, hasPhoto, hasBio].filter(Boolean).length;
    const setupIncomplete = profile.onboarding_completed !== true || profileMissingCount < 2;

    if (setupIncomplete) {
      const missingBits = [
        hasDisplayName ? null : "your name",
        hasPhoto ? null : "a photo",
        hasBio ? null : "a short bio",
      ].filter(Boolean);

      candidates.push(withLouisCard(createRecommendation({
        priority: 100,
        greeting,
        contextLine: "Your profile is still one of the fastest ways to make Bible Buddy feel like real community.",
        recommendationLine: missingBits.length > 0
          ? `Add ${missingBits.join(", ")} so people can recognize you, and so the app feels more personal right away.`
          : "Finish setting up your profile so the rest of the app feels more connected to you.",
        primaryButtonText: "Finish Profile",
        primaryButtonHref: "/settings",
        level: 2,
        category: "profile",
        cardTheme: "purple",
      }), [
        { title: "Hey, you still have not set up your profile yet", subtitle: "Take a minute and finish it so Bible Buddy feels more personal, and so other people can actually recognize you." },
        { title: "Hey, your profile still needs a little love", subtitle: "Add the missing pieces so the app feels more like your space and less like a blank account." },
        { title: "Hey, finish your profile when you get a second", subtitle: "Your name, photo, and bio help the whole community side of Bible Buddy click faster." },
        { title: "Hey, let’s get your profile looking right", subtitle: "A finished profile makes the app feel more real the second people see your name, picture, and bio." },
        { title: "Hey, do not leave your profile half done", subtitle: "Clean that up now and the rest of Bible Buddy will feel way more connected to you." },
      ]));
    }

    const { data: devotionalProgress } = await supabase
      .from("devotional_progress")
      .select("devotional_id, day_number, is_completed")
      .eq("user_id", userId)
      .eq("is_completed", true)
      .order("day_number", { ascending: false });

    const maxByDevotional: Record<string, number> = {};
    for (const row of devotionalProgress || []) {
      if (!maxByDevotional[row.devotional_id] || row.day_number > maxByDevotional[row.devotional_id]) {
        maxByDevotional[row.devotional_id] = row.day_number;
      }
    }

    const devotionalIds = Object.keys(maxByDevotional);
    const devotionalsRes = devotionalIds.length > 0
      ? await supabase.from("devotionals").select("id, title, total_days").in("id", devotionalIds)
      : { data: [] as Array<{ id: string; title: string; total_days?: number | null }> };
    const activeDevotional = (devotionalsRes.data || []).find((dev) => (maxByDevotional[dev.id] || 0) < (dev.total_days || 0));

    if (activeDevotional) {
      const maxDay = maxByDevotional[activeDevotional.id];
      const nextDay = maxDay + 1;
      const lastDevAction = allActions.find(
        (a) => a.action_type === "devotional_day_completed" && a.action_label?.includes(activeDevotional.title)
      );
      candidates.push(createRecommendation({
        priority: 84,
        greeting,
        contextLine: lastDevAction
          ? contextLine(
              new Date(lastDevAction.created_at),
              `you finished Day ${maxDay} of ${activeDevotional.title}.`,
              `It's been a while since you last opened ${activeDevotional.title}.`
            )
          : `You already started ${activeDevotional.title}.`,
        recommendationLine: `Day ${nextDay} is ready, and this is probably the cleanest place for you to pick the story back up today.`,
        primaryButtonText: `Continue Day ${nextDay}`,
        primaryButtonHref: `/devotionals/${activeDevotional.id}?day=${nextDay}&from=louis-recommendation`,
        level: 1,
        category: "devotional",
        cardEyebrow: "Keep Going",
        cardTitle: `Continue ${activeDevotional.title}`,
        cardSubtitle: `You already did the hard part by starting. Pick up with Day ${nextDay} and keep your momentum alive today.`,
        cardTheme: "rose",
      }));
    }

    if (memberGroupIds.length === 0) {
      candidates.push(withLouisCard(createRecommendation({
        priority: 96,
        greeting,
        contextLine: "You have not stepped into the Bible Study Group yet.",
        recommendationLine: "That is where the community side of Bible Buddy starts to click. You can follow the live study, read what other people are learning, and stop studying alone.",
        primaryButtonText: "Open Bible Study Group",
        primaryButtonHref: "/study-groups",
        level: 1,
        category: "group",
        cardTheme: "green",
      }), [
        { title: "Hey, you have not checked out the Bible Study Group yet", subtitle: "That is where the Bible Buddy community gets together, studies Scripture, and talks about what everyone is learning." },
        { title: "Hey, you should step into the Bible Study Group", subtitle: "This is where the live study, real discussion, and community side of Bible Buddy all start to come alive." },
        { title: "Hey, do not study alone the whole time", subtitle: "The Bible Study Group is where people read together, reflect together, and actually build community around Scripture." },
        { title: "Hey, go see what the Bible Study Group is about", subtitle: "If you want the app to feel more alive, this is the place where people are really showing up together." },
        { title: "Hey, the group side of Bible Buddy is waiting on you", subtitle: "Open the study group and see how the weekly study and community conversations come together." },
      ]));
    } else {
      const { data: currentSeriesRows } = await supabase
        .from("group_series")
        .select("id, group_id, title")
        .in("group_id", memberGroupIds)
        .eq("is_current", true)
        .limit(10);

      if (currentSeriesRows && currentSeriesRows.length > 0) {
        const seriesIds = currentSeriesRows.map((row) => row.id);
        const { data: progressRows } = await supabase
          .from("series_week_progress")
          .select("series_id, week_number, reading_completed, trivia_completed, reflection_posted")
          .eq("user_id", userId)
          .in("series_id", seriesIds);

        for (const seriesRow of currentSeriesRows) {
          const progressMap = new Map<number, { reading: boolean; trivia: boolean; reflection: boolean }>();
          (progressRows || [])
            .filter((row) => row.series_id === seriesRow.id)
            .forEach((row) => {
              progressMap.set(row.week_number, {
                reading: row.reading_completed === true,
                trivia: row.trivia_completed === true,
                reflection: row.reflection_posted === true,
              });
            });

          let firstIncompleteWeek = 1;
          for (let week = 1; week <= 12; week++) {
            const progress = progressMap.get(week);
            const complete = !!(progress?.reading && progress?.trivia && progress?.reflection);
            if (!complete) {
              firstIncompleteWeek = week;
              break;
            }
          }

          const hasStartedAnyWeek = [...progressMap.values()].some((progress) => progress.reading || progress.trivia || progress.reflection);
          if (!hasStartedAnyWeek) {
            candidates.push(withLouisCard(createRecommendation({
              priority: 94,
              greeting,
              contextLine: `${seriesRow.title} is live in your Bible Study Group.`,
              recommendationLine: "Do not jump into the middle of it. Start with Week 1 so the story, the teaching, and the group conversation all make sense from the beginning.",
              primaryButtonText: "Start Week 1",
              primaryButtonHref: `/study-groups/${seriesRow.group_id}/series`,
              level: 1,
              category: "group",
              cardTheme: "green",
            }), [
              { title: `Hey, we just started ${seriesRow.title}`, subtitle: "You should do it with us, but start with Week 1 so the story and teaching make sense from the beginning." },
              { title: `Hey, ${seriesRow.title} is live in the study group`, subtitle: "Jump in with us, but begin at Week 1 so you do not step into the middle of the story." },
              { title: "Hey, the new live series is going now", subtitle: `Open ${seriesRow.title} and start from Week 1 so you can follow it the right way with everybody else.` },
              { title: `Hey, now is a good time to start ${seriesRow.title}`, subtitle: "The study is moving, but Week 1 is still the right place for you to begin." },
              { title: `Hey, your group just opened ${seriesRow.title}`, subtitle: "Start with Week 1 and let the app walk you into the series the right way." },
            ]));
          } else {
            candidates.push(withLouisCard(createRecommendation({
              priority: 90,
              greeting,
              contextLine: `You are partway through ${seriesRow.title}.`,
              recommendationLine: `Your next best move is Week ${firstIncompleteWeek}. That keeps you in step with the group without skipping parts of the story.`,
              primaryButtonText: `Continue Week ${firstIncompleteWeek}`,
              primaryButtonHref: `/study-groups/${seriesRow.group_id}/series`,
              level: 1,
              category: "group",
              cardTheme: "green",
            }), [
              { title: `Hey, your next step is Week ${firstIncompleteWeek}`, subtitle: `You are already in ${seriesRow.title}, so just keep going in order and stay with the group.` },
              { title: `Hey, continue with Week ${firstIncompleteWeek}`, subtitle: "That is the cleanest next move if you want the live study to keep making sense." },
              { title: `Hey, do Week ${firstIncompleteWeek} next`, subtitle: `You are partway through ${seriesRow.title}. Stay in order so the story and the teaching keep landing right.` },
              { title: "Hey, keep moving with the group study", subtitle: `Week ${firstIncompleteWeek} is the next unfinished week, and that is where you should pick it back up.` },
              { title: "Hey, do not lose your place in the live study", subtitle: `Week ${firstIncompleteWeek} is waiting on you, and finishing it keeps you in step with everybody else.` },
            ]));
          }
        }
      }

      const { count: unreadGroupCount } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_read", false)
        .like("article_slug", "/study-groups/%");

      if (unreadGroupCount && unreadGroupCount > 0) {
        candidates.push(withLouisCard(createRecommendation({
          priority: 88,
          greeting,
          contextLine: unreadGroupCount === 1
            ? "There is new activity waiting in your Bible Study Group."
            : `There are ${unreadGroupCount} new things happening in your Bible Study Group.`,
          recommendationLine: "The group is moving right now. Drop back in and see what people posted before you lose the thread of the conversation.",
          primaryButtonText: "Check Group Activity",
          primaryButtonHref: `/study-groups/${memberGroupIds[0]}/chat`,
          level: 1,
          category: "group",
          cardTheme: "green",
        }), [
          { title: "Hey, your Bible Study Group has new activity", subtitle: "People are posting right now, so go see what is happening before you lose the thread of the conversation." },
          { title: "Hey, your group is moving right now", subtitle: "There is fresh conversation waiting on you in the study group, and this is a good time to jump back in." },
          { title: "Hey, people are active in your study group", subtitle: "Open the group and catch up on the new posts while the conversation is still alive." },
          { title: "Hey, your group has new things happening", subtitle: "Do not miss the new activity. Go see what people are saying in the study group." },
          { title: "Hey, your people are posting in the group", subtitle: "Open the study group and catch up before the conversation moves past you." },
        ]));
      }
    }

    if (lastReadingPlanCompletion) {
      const colonIndex = (lastReadingPlanCompletion.action_label || "").indexOf(": ");
      const planName = colonIndex !== -1 ? lastReadingPlanCompletion.action_label!.slice(0, colonIndex) : "your reading plan";
      const chapterRef = colonIndex !== -1 ? lastReadingPlanCompletion.action_label!.slice(colonIndex + 2) : "a chapter";
      const parsedChapter = parseChapterReference(chapterRef);
      const actionDate = new Date(lastReadingPlanCompletion.created_at);
      const isBibleBuddy = planName.toLowerCase().includes("bible buddy");

      if (isBibleBuddy && parsedChapter) {
        const nextChapter = getNextBibleChapter(parsedChapter.book, parsedChapter.chapter);
        candidates.push(withLouisCard(createRecommendation({
          priority: 82,
          greeting,
          contextLine: contextLine(
            actionDate,
            `you finished ${chapterRef} in the Bible Buddy Reading Plan.`,
            `It's been a while since you last opened the Bible Buddy Reading Plan.`
          ),
          recommendationLine: `Your next chapter is ${nextChapter.book} ${nextChapter.chapter}, so you already know exactly where to jump back in.`,
          primaryButtonText: `Read ${nextChapter.book} ${nextChapter.chapter}`,
          primaryButtonHref: `/Bible/${nextChapter.book}/${nextChapter.chapter}`,
          level: 1,
          category: "reading_plan",
          cardTheme: "blue",
        }), [
          { title: `Hey, you read ${chapterRef} last time`, subtitle: `You should continue with ${nextChapter.book} ${nextChapter.chapter} today and keep your reading plan moving.` },
          { title: `Hey, your next reading plan chapter is ${nextChapter.book} ${nextChapter.chapter}`, subtitle: "You already know exactly where to go next, so just pick the story back up there today." },
          { title: "Hey, keep your reading plan going", subtitle: `Last time you finished ${chapterRef}. Today should be ${nextChapter.book} ${nextChapter.chapter}.` },
          { title: "Hey, do not lose your reading place", subtitle: `${nextChapter.book} ${nextChapter.chapter} is the next chapter in your plan, so go there today and keep the rhythm alive.` },
          { title: "Hey, your next chapter is ready", subtitle: `You stopped at ${chapterRef}, so today is a good day for ${nextChapter.book} ${nextChapter.chapter}.` },
        ]));
      } else {
        candidates.push(withLouisCard(createRecommendation({
          priority: 81,
          greeting,
          contextLine: contextLine(
            actionDate,
            `you read ${chapterRef} in ${planName}.`,
            `It's been a while since you last read from ${planName}.`
          ),
          recommendationLine: "Jump back into your reading plan while the rhythm is still there.",
          primaryButtonText: "Continue Reading Plan",
          primaryButtonHref: isBibleBuddy ? "/reading-plans/bible-buddy" : "/reading-plans/bible-in-one-year",
          level: 1,
          category: "reading_plan",
          cardTheme: "blue",
        }), [
          { title: `Hey, go back to ${planName}`, subtitle: "You already have a reading plan in motion, so the easiest win today is just to pick it back up." },
          { title: "Hey, your reading plan is waiting on you", subtitle: `Open ${planName} and keep the habit moving while you still know where you left off.` },
          { title: "Hey, continue your reading plan today", subtitle: `${planName} is already in progress for you, so just jump back in and keep going.` },
          { title: "Hey, do not let your reading plan go cold", subtitle: `Open ${planName} and move it forward again today.` },
          { title: "Hey, your next reading plan step is ready", subtitle: `You already started ${planName}, and now Louis wants you to keep that rhythm alive.` },
        ]));
      }
    }

    if (lastBibleReading) {
      const actionDate = new Date(lastBibleReading.created_at);
      const label = lastBibleReading.action_label || "";
      const parsed = parseChapterReference(label);

      if (parsed) {
        const next = getNextBibleChapter(parsed.book, parsed.chapter);
        candidates.push(withLouisCard(createRecommendation({
          priority: 78,
          greeting,
          contextLine: contextLine(
            actionDate,
            `you finished ${label}.`,
            `It's been a while since you last read in ${parsed.book}.`
          ),
          recommendationLine: `Keep going with ${next.book} ${next.chapter} so your Bible reading does not turn into another thing you meant to come back to.`,
          primaryButtonText: `Read ${next.book} ${next.chapter}`,
          primaryButtonHref: `/Bible/${next.book}/${next.chapter}`,
          level: 2,
          category: "bible",
          cardTheme: "blue",
        }), [
          { title: `Hey, you read ${label} last time`, subtitle: `You should continue with ${next.book} ${next.chapter} today and keep the story moving.` },
          { title: `Hey, your next Bible chapter is ${next.book} ${next.chapter}`, subtitle: `You already left off at ${label}, so this is the cleanest place to jump back in today.` },
          { title: "Hey, keep your Bible reading going", subtitle: `Last time you finished ${label}. Today should be ${next.book} ${next.chapter}.` },
          { title: "Hey, do not lose your place after that chapter", subtitle: `Go to ${next.book} ${next.chapter} next and keep your reading habit alive.` },
          { title: "Hey, one more chapter would be a real win today", subtitle: `${next.book} ${next.chapter} is already lined up for you, so just keep reading.` },
        ]));
      }
    } else if ((profile.chapters_completed_count || 0) === 0) {
      candidates.push(withLouisCard(createRecommendation({
        priority: 77,
        greeting,
        contextLine: "You have not really started reading in the Bible yet.",
        recommendationLine: "Open the Bible and begin somewhere simple today. One chapter is enough to get your habit moving.",
        primaryButtonText: "Open the Bible",
        primaryButtonHref: "/Bible",
        level: 2,
        category: "bible",
        cardTheme: "blue",
      }), [
        { title: "Hey, you should open the Bible today", subtitle: "If you are not sure what to do next, one chapter is still one of the best moves in the whole app." },
        { title: "Hey, start with one Bible chapter", subtitle: "Do not overthink it. Open the Bible and let one chapter be your win for today." },
        { title: "Hey, the Bible is still the best place to start", subtitle: "If you have not really begun reading yet, one chapter today can change the whole tone of your habit." },
        { title: "Hey, let’s keep this simple today", subtitle: "Open the Bible, read one chapter, and let that be your next right step." },
        { title: "Hey, if you do one thing today, read a chapter", subtitle: "That is still one of the strongest ways to start building a real Bible habit." },
      ]));
    }

    const triviaDays = lastTriviaAction ? daysSince(lastTriviaAction.created_at) : null;
    if (triviaDays === null || triviaDays >= 7) {
      candidates.push(withLouisCard(createRecommendation({
        priority: triviaDays === null ? 72 : 76,
        greeting,
        contextLine: triviaDays === null
          ? "You have not really touched Bible trivia yet."
          : `It has been ${triviaDays} days since you last played Bible trivia.`,
        recommendationLine: "Trivia is a fast way to wake your brain back up and test what has actually been sticking.",
        primaryButtonText: "Play Bible Trivia",
        primaryButtonHref: "/bible-trivia",
        level: 2,
        category: "trivia",
        cardTheme: "gold",
      }), [
        { title: "Hey, go do a round of Bible trivia", subtitle: "It is a fast way to wake your brain up and see what has really been sticking lately." },
        { title: "Hey, you have not done trivia in a while", subtitle: "Take a quick round today and sharpen what you actually remember from your reading." },
        { title: "Hey, Bible trivia would be a good move today", subtitle: "You only need a few minutes, and it is one of the easiest ways to get real Bible repetition." },
        { title: "Hey, test yourself with a trivia round", subtitle: "If it has been a while, this is a quick way to get your mind back into Scripture." },
        { title: "Hey, wake your Bible memory back up", subtitle: "One trivia round is a simple way to get back in the app and do something useful." },
      ]));
    }

    if (lastScrambledCompletion) {
      const scrambledProgress = parseScrambledCompletionLabel(lastScrambledCompletion.action_label);
      if (scrambledProgress) {
        const nextScrambledChapter = getNextBibleChapter(scrambledProgress.book, scrambledProgress.chapter);
        const nextScrambledBookSlug = getScrambledBookSlug(nextScrambledChapter.book);

        if (nextScrambledBookSlug) {
          candidates.push(createRecommendation({
            priority: 74,
            greeting,
            contextLine: `You finished ${scrambledProgress.book} ${scrambledProgress.chapter} in Scrambled.`,
            recommendationLine: `You got ${scrambledProgress.score}/${scrambledProgress.total} words right. Try ${nextScrambledChapter.book} ${nextScrambledChapter.chapter} next.`,
            primaryButtonText: "Play Scrambled",
            primaryButtonHref: `/bible-study-games/scrambled/${nextScrambledBookSlug}/${nextScrambledChapter.chapter}`,
            level: 2,
            category: "games",
            cardTheme: "gold",
          }));
        }
      }
    }

    const totalReferenceActions =
      (profile.people_learned_count || 0) +
      (profile.places_discovered_count || 0) +
      (profile.keywords_mastered_count || 0);

    if (lastReferenceAction) {
      const actionDate = new Date(lastReferenceAction.created_at);
      const label = lastReferenceAction.action_label || "";
      const mapping = {
        person_learned: {
          title: "Explore another Bible person",
          subtitle: "The people database helps Scripture feel less flat and much more connected.",
          cta: "Explore People",
          href: "/people-in-the-bible",
        },
        place_discovered: {
          title: "Explore another Bible place",
          subtitle: "Context changes how verses land. A place can explain a lot in just a few taps.",
          cta: "Explore Places",
          href: "/places-in-the-bible",
        },
        keyword_mastered: {
          title: "Study another Bible keyword",
          subtitle: "A single Bible word can open up a whole layer of meaning you would miss otherwise.",
          cta: "Explore Keywords",
          href: "/keywords-in-the-bible",
        },
      } as const;

      const current = mapping[lastReferenceAction.action_type as keyof typeof mapping];
      if (current) {
        candidates.push(createRecommendation({
          priority: 70,
          greeting,
          contextLine: contextLine(
            actionDate,
            `you last looked up ${label}.`,
            "It's been a while since you used the Bible reference tools."
          ),
          recommendationLine: "Those tools are there to make hard words and names stop feeling distant. Go learn one more thing today.",
          primaryButtonText: current.cta,
          primaryButtonHref: current.href,
          level: 2,
          category: "reference",
          cardEyebrow: "Bible Reference",
          cardTitle: current.title,
          cardSubtitle: current.subtitle,
          cardTheme: "purple",
        }));
      }
    } else if (totalReferenceActions === 0) {
      candidates.push(createRecommendation({
        priority: 68,
        greeting,
        contextLine: "You have not really used the people, places, and keyword tools yet.",
        recommendationLine: "Those tools are one of the easiest ways to make the Bible feel clearer fast, especially when you hit a name or word you do not know.",
        primaryButtonText: "Explore Keywords",
        primaryButtonHref: "/keywords-in-the-bible",
        level: 2,
        category: "reference",
        cardEyebrow: "Bible Reference",
        cardTitle: "Try the Bible word tools",
        cardSubtitle: "Tap into the people, places, and keyword databases to make your reading easier to follow.",
        cardTheme: "purple",
      }));
    }

    if (lastBibleNoteAction) {
      candidates.push(createRecommendation({
        priority: 66,
        greeting,
        contextLine: contextLine(
          new Date(lastBibleNoteAction.created_at),
          lastBibleNoteAction.action_type === "note_created"
            ? "you created a note while reading."
            : "you highlighted verses while reading.",
          "It's been a while since you last opened the Bible."
        ),
        recommendationLine: "Go back while those thoughts are still fresh and keep building from what was already standing out to you.",
        primaryButtonText: "Open the Bible",
        primaryButtonHref: "/Bible",
        level: 2,
        category: "bible",
        cardEyebrow: "Fresh Momentum",
        cardTitle: "Go back to the verses you were in",
        cardSubtitle: "Your notes and highlights are usually a sign that God already had your attention there for a reason.",
        cardTheme: "blue",
      }));
    }

    if (lastDevotionalCompletion && !activeDevotional) {
      candidates.push(withLouisCard(createRecommendation({
        priority: 64,
        greeting,
        contextLine: contextLine(
          new Date(lastDevotionalCompletion.created_at),
          "you completed a devotional day.",
          "It's been a while since you last worked on a devotional."
        ),
        recommendationLine: "Open your devotionals and keep the habit alive with the next story that speaks to where you are right now.",
        primaryButtonText: "View Devotionals",
        primaryButtonHref: "/devotionals",
        level: 2,
        category: "devotional",
        cardTheme: "rose",
      }), [
        { title: "Hey, you should open a devotional today", subtitle: "A devotional is still one of the easiest ways to sit with Scripture in a guided, story-first way." },
        { title: "Hey, go pick a devotional back up", subtitle: "If you want something guided today, this is one of the simplest ways to get back into the Word." },
        { title: "Hey, a devotional would be a great move today", subtitle: "You already know how these work, so just jump back in and let the app guide you." },
        { title: "Hey, now is a good time for a devotional day", subtitle: "If you want Scripture with structure, this is one of the best places to start." },
        { title: "Hey, go find your next devotional story", subtitle: "A good devotional day can get you back into the Bible without needing to overthink what to do next." },
      ]));
    }

    const { count: pushSubscriptionCount } = await supabase
      .from("push_subscriptions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_active", true);

    if (!pushSubscriptionCount) {
      candidates.push(withLouisCard(createRecommendation({
        priority: 63,
        greeting,
        contextLine: "Push alerts are still off on this account.",
        recommendationLine: "Turn them on so you do not miss new group activity, messages, or things happening inside Bible Buddy.",
        primaryButtonText: "Turn On Push Alerts",
        primaryButtonHref: "/dashboard",
        level: 2,
        category: "general",
        cardTheme: "blue",
      }), [
        { title: "Hey, you should turn on push notifications", subtitle: "Click here and do that so you do not miss things happening in Bible Buddy." },
        { title: "Hey, push alerts are still off", subtitle: "Turn them on so new messages, group activity, and updates can actually reach you." },
        { title: "Hey, do not miss what is happening", subtitle: "Enable push alerts so Bible Buddy can let you know when new stuff comes in." },
        { title: "Hey, it is probably time to switch push alerts on", subtitle: "That way you do not have to keep checking the app to know when something new happened." },
        { title: "Hey, let Bible Buddy send you alerts", subtitle: "Turn push on so important things can reach you instead of getting missed." },
      ]));
    }

    if (profile.is_paid !== true && (loginActions.length >= 10 || streak >= 7 || (allActions.length >= 25 && daysSinceActive !== null && daysSinceActive <= 7))) {
      candidates.push(withLouisCard(createRecommendation({
        priority: 61,
        greeting,
        contextLine: "You have been using Bible Buddy for a while now.",
        recommendationLine: "If the app has really been helping you, it might be time to look at what Pro opens up for your study life.",
        primaryButtonText: "See Pro",
        primaryButtonHref: "/upgrade",
        level: 2,
        category: "upgrade",
        cardTheme: "gold",
      }), [
        { title: "Hey, you have been using Bible Buddy for a while now", subtitle: "Have you thought about upgrading? Tap here and see why Pro might be worth it for you." },
        { title: "Hey, if Bible Buddy has been helping you, look at Pro", subtitle: "See what opens up when the credit wall is gone and the full devotional library is unlocked." },
        { title: "Hey, you might be ready for Pro now", subtitle: "You have already been showing up, so take a look at what upgrading would add to your study flow." },
        { title: "Hey, want to go deeper with Bible Buddy", subtitle: "Tap here and see what Pro gives you if you want more room to study without limits." },
        { title: "Hey, it may be time to look at upgrading", subtitle: "If you are using the app a lot now, Pro might make the whole experience feel smoother." },
      ]));
    }

    const todayActions = getTodayActionSet(allActions);
    const history = getRecommendationHistory();
    const best = pickSmartRecommendation(candidates, history, todayActions, suppressLevel1);
    if (best) {
      saveRecommendationHistory(best);
      return best;
    }

    const { data: recommendedDevotionals } = await supabase
      .from("devotionals")
      .select("id, title, total_days")
      .limit(20);

    const recommendedDevotional = pickRecommendedDevotional(recommendedDevotionals || []);
    if (recommendedDevotional) {
      const fallbackRecommendation: DailyRecommendation = {
        greeting: "Welcome to Bible Buddy.",
        contextLine: `${recommendedDevotional.title} is a strong place to begin if you want a guided story and a clear next step.`,
        recommendationLine: "Start with Day 1 today and let the app lead you into a simple, steady rhythm.",
        primaryButtonText: "Start Day 1",
        primaryButtonHref: `/devotionals/${recommendedDevotional.id}?day=1&from=louis-recommendation`,
        level: 2,
        category: "devotional",
        cardEyebrow: "Start Here",
        cardTitle: `Start ${recommendedDevotional.title}`,
        cardSubtitle: "If you do not know where to begin, start with one strong story and let that become your habit.",
        cardTheme: "rose",
      };
      saveRecommendationHistory(fallbackRecommendation);
      return fallbackRecommendation;
    }

    const defaultRecommendation: DailyRecommendation = {
      greeting: "Welcome to Bible Buddy.",
      contextLine: "There is a lot here, but you only need one good next step.",
      recommendationLine: "Open the Bible today and start with one chapter.",
      primaryButtonText: "Open the Bible",
      primaryButtonHref: "/Bible",
      level: 2,
      category: "bible",
      cardEyebrow: "Start Here",
      cardTitle: "Open the Bible today",
      cardSubtitle: "When in doubt, one chapter is still a real win.",
      cardTheme: "blue",
    };
    saveRecommendationHistory(defaultRecommendation);
    return defaultRecommendation;
  } catch (err) {
    console.error("[DAILY_RECOMMENDATION] Error:", err);
    return null;
  }
}
