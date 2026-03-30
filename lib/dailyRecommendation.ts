/**
 * Daily Recommendation Logic
 *
 * The dashboard card and daily modal should feel like a smart nudge,
 * not a generic banner. This file looks at what the user has already
 * done, what they have ignored, and what is most likely to help them
 * re-enter the app with momentum.
 */

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

interface RecommendationCandidate extends DailyRecommendation {
  priority: number;
}

interface ProfileSnapshot {
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

function createRecommendation(input: Omit<RecommendationCandidate, "priority"> & { priority: number }): RecommendationCandidate {
  return input;
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
        .select("onboarding_completed, display_name, username, profile_image_url, bio, chapters_completed_count, trivia_questions_answered, people_learned_count, places_discovered_count, keywords_mastered_count")
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
    const lastBibleNoteAction = allActions.find((a) => a.action_type === "note_created" || a.action_type === "verse_highlighted");
    const daysSinceActive = lastMeaningful ? daysSince(lastMeaningful.created_at) : null;

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

      candidates.push(createRecommendation({
        priority: 100,
        greeting,
        contextLine: "Your profile is still one of the fastest ways to make Bible Buddy feel like real community.",
        recommendationLine: missingBits.length > 0
          ? `Add ${missingBits.join(", ")} so people can recognize you, and so the app feels more personal right away.`
          : "Finish setting up your profile so the rest of the app feels more connected to you.",
        primaryButtonText: "Finish Profile",
        primaryButtonHref: "/settings",
        level: 2,
        cardEyebrow: "Quick Win",
        cardTitle: "Set up your profile",
        cardSubtitle: "A completed profile makes the whole app feel more personal and more social.",
        cardTheme: "purple",
      }));
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
        primaryButtonHref: `/devotionals/${activeDevotional.id}`,
        level: 1,
        cardEyebrow: "Keep Going",
        cardTitle: `Continue ${activeDevotional.title}`,
        cardSubtitle: `You already did the hard part by starting. Pick up with Day ${nextDay} and keep your momentum alive today.`,
        cardTheme: "rose",
      }));
    }

    if (memberGroupIds.length === 0) {
      candidates.push(createRecommendation({
        priority: 96,
        greeting,
        contextLine: "You have not stepped into the Bible Study Group yet.",
        recommendationLine: "That is where the community side of Bible Buddy starts to click. You can follow the live study, read what other people are learning, and stop studying alone.",
        primaryButtonText: "Open Bible Study Group",
        primaryButtonHref: "/study-groups",
        level: 1,
        cardEyebrow: "Community",
        cardTitle: "Join the Bible Study Group",
        cardSubtitle: "This is where the live study, real discussion, and Bible Buddy community all come together.",
        cardTheme: "green",
      }));
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
            candidates.push(createRecommendation({
              priority: 94,
              greeting,
              contextLine: `${seriesRow.title} is live in your Bible Study Group.`,
              recommendationLine: "Do not jump into the middle of it. Start with Week 1 so the story, the teaching, and the group conversation all make sense from the beginning.",
              primaryButtonText: "Start Week 1",
              primaryButtonHref: `/study-groups/${seriesRow.group_id}/series`,
              level: 1,
              cardEyebrow: "Live Study",
              cardTitle: `Start ${seriesRow.title}`,
              cardSubtitle: "The study is already moving, but the right move is to begin with Week 1 and build from there.",
              cardTheme: "green",
            }));
          } else {
            candidates.push(createRecommendation({
              priority: 90,
              greeting,
              contextLine: `You are partway through ${seriesRow.title}.`,
              recommendationLine: `Your next best move is Week ${firstIncompleteWeek}. That keeps you in step with the group without skipping parts of the story.`,
              primaryButtonText: `Continue Week ${firstIncompleteWeek}`,
              primaryButtonHref: `/study-groups/${seriesRow.group_id}/series`,
              level: 1,
              cardEyebrow: "Next Step",
              cardTitle: `Continue with Week ${firstIncompleteWeek}`,
              cardSubtitle: "Stay in order. Finishing the next unfinished week will make the live study hit harder.",
              cardTheme: "green",
            }));
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
        candidates.push(createRecommendation({
          priority: 88,
          greeting,
          contextLine: unreadGroupCount === 1
            ? "There is new activity waiting in your Bible Study Group."
            : `There are ${unreadGroupCount} new things happening in your Bible Study Group.`,
          recommendationLine: "The group is moving right now. Drop back in and see what people posted before you lose the thread of the conversation.",
          primaryButtonText: "Check Group Activity",
          primaryButtonHref: `/study-groups/${memberGroupIds[0]}/chat`,
          level: 1,
          cardEyebrow: "Community",
          cardTitle: "Your group is active",
          cardSubtitle: "There is fresh conversation waiting for you in the study group right now.",
          cardTheme: "green",
        }));
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
        candidates.push(createRecommendation({
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
          cardEyebrow: "Reading Plan",
          cardTitle: `Read ${nextChapter.book} ${nextChapter.chapter}`,
          cardSubtitle: "Your reading plan already has your next step ready. Open the next chapter and keep moving.",
          cardTheme: "blue",
        }));
      } else {
        candidates.push(createRecommendation({
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
          cardEyebrow: "Reading Plan",
          cardTitle: `Continue ${planName}`,
          cardSubtitle: "You already have a plan in motion. The easiest win today is to pick it back up.",
          cardTheme: "blue",
        }));
      }
    }

    if (lastBibleReading) {
      const actionDate = new Date(lastBibleReading.created_at);
      const label = lastBibleReading.action_label || "";
      const parsed = parseChapterReference(label);

      if (parsed) {
        const next = getNextBibleChapter(parsed.book, parsed.chapter);
        candidates.push(createRecommendation({
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
          cardEyebrow: "Bible",
          cardTitle: "Continue reading",
          cardSubtitle: `You left off at ${label}. Your next chapter is already lined up for you.`,
          cardTheme: "blue",
        }));
      }
    } else if ((profile.chapters_completed_count || 0) === 0) {
      candidates.push(createRecommendation({
        priority: 77,
        greeting,
        contextLine: "You have not really started reading in the Bible yet.",
        recommendationLine: "Open the Bible and begin somewhere simple today. One chapter is enough to get your habit moving.",
        primaryButtonText: "Open the Bible",
        primaryButtonHref: "/Bible",
        level: 2,
        cardEyebrow: "Start Here",
        cardTitle: "Open the Bible today",
        cardSubtitle: "If you are not sure what to do next, reading one chapter is still one of the best moves in the app.",
        cardTheme: "blue",
      }));
    }

    const triviaDays = lastTriviaAction ? daysSince(lastTriviaAction.created_at) : null;
    if (triviaDays === null || triviaDays >= 7) {
      candidates.push(createRecommendation({
        priority: triviaDays === null ? 72 : 76,
        greeting,
        contextLine: triviaDays === null
          ? "You have not really touched Bible trivia yet."
          : `It has been ${triviaDays} days since you last played Bible trivia.`,
        recommendationLine: "Trivia is a fast way to wake your brain back up and test what has actually been sticking.",
        primaryButtonText: "Play Bible Trivia",
        primaryButtonHref: "/bible-trivia",
        level: 2,
        cardEyebrow: "Challenge",
        cardTitle: "Do a round of Bible trivia",
        cardSubtitle: "This is one of the easiest ways to turn a few free minutes into real Bible repetition.",
        cardTheme: "gold",
      }));
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
        cardEyebrow: "Fresh Momentum",
        cardTitle: "Go back to the verses you were in",
        cardSubtitle: "Your notes and highlights are usually a sign that God already had your attention there for a reason.",
        cardTheme: "blue",
      }));
    }

    if (lastDevotionalCompletion && !activeDevotional) {
      candidates.push(createRecommendation({
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
        cardEyebrow: "Devotional",
        cardTitle: "Pick up a devotional today",
        cardSubtitle: "A devotional is still one of the easiest ways to sit with Scripture in a guided way.",
        cardTheme: "rose",
      }));
    }

    const best = pickHighestPriority(candidates);
    if (best) return best;

    const { data: recommendedDevotionals } = await supabase
      .from("devotionals")
      .select("id, title, total_days")
      .limit(20);

    const recommendedDevotional = pickRecommendedDevotional(recommendedDevotionals || []);
    if (recommendedDevotional) {
      return {
        greeting: "Welcome to Bible Buddy.",
        contextLine: `${recommendedDevotional.title} is a strong place to begin if you want a guided story and a clear next step.`,
        recommendationLine: "Start with Day 1 today and let the app lead you into a simple, steady rhythm.",
        primaryButtonText: "Start Day 1",
        primaryButtonHref: `/devotionals/${recommendedDevotional.id}`,
        level: 2,
        cardEyebrow: "Start Here",
        cardTitle: `Start ${recommendedDevotional.title}`,
        cardSubtitle: "If you do not know where to begin, start with one strong story and let that become your habit.",
        cardTheme: "rose",
      };
    }

    return {
      greeting: "Welcome to Bible Buddy.",
      contextLine: "There is a lot here, but you only need one good next step.",
      recommendationLine: "Open the Bible today and start with one chapter.",
      primaryButtonText: "Open the Bible",
      primaryButtonHref: "/Bible",
      level: 2,
      cardEyebrow: "Start Here",
      cardTitle: "Open the Bible today",
      cardSubtitle: "When in doubt, one chapter is still a real win.",
      cardTheme: "blue",
    };
  } catch (err) {
    console.error("[DAILY_RECOMMENDATION] Error:", err);
    return null;
  }
}
