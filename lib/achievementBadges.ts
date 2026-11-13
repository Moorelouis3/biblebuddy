/**
 * Achievement badges: things a reader earns by doing something in the app.
 *
 * RESTORED, NOT INVENTED (2026-11-13). These 29 badges, their ids, names,
 * emoji, colours, targets and descriptions are the ones that lived inside
 * app/dashboard/page.tsx until commit 0cb3c0d09 ("Simplify dashboard and Bible
 * year flow", 2026-05-26) removed the dashboard's badge grid along with a lot
 * else. The definitions were never moved anywhere; they were only reachable
 * through git history. `git show 0cb3c0d09~1:app/dashboard/page.tsx`, lines
 * 531-886, is the original.
 *
 * What survived the removal, and is reused here:
 *   - public.user_badge_popups_seen (supabase/migrations/
 *     ADD_USER_BADGE_POPUPS_SEEN.sql): one row per user per badge, unique on
 *     (user_id, badge_id). 219 rows for 44 users were still in it. It is the
 *     only durable record that somebody earned a badge, so it is now the
 *     award record: a row means earned, for good.
 *
 * XP. A badge pays XP once, when it unlocks: the same 10 to 20 points each
 * one paid before the reward systems were retired on 2026-05-27. Louis,
 * 2026-11-13: "yes badges pay xp please". All 29 together are worth 392.
 *
 * It is not paid the old way. The old dashboard wrote a
 * `badge_earned:<id>:<xp>` action and the amount was read back out of the
 * label, so the label was the ledger; no such rows exist any more and
 * ACTION_POINT_WEIGHTS.badge_earned stays 0. Now the award table is the
 * ledger: lib/pointsEngine.ts adds badgeXpFor(the badges recorded for that
 * reader), with the amounts taken from the definitions below. A row for an id
 * that is not a badge pays nothing, and a badge cannot pay twice because it
 * cannot be recorded twice.
 *
 * ONE AT A TIME. Reaching a target makes a badge `ready`. It unlocks - is
 * recorded, pays its XP and is celebrated - on its own, at most one per
 * BADGE_UNLOCK_GAP_MS. See pickBadgeToUnlock at the foot of this file.
 *
 * NOT THE SAME THING AS:
 *   - levels (lib/levelSystem.ts), which are a single ladder driven by XP;
 *   - member badges (lib/userBadges.ts: Teacher, Moderator, Pro Buddy), which
 *     are roles somebody is given;
 *   - Bible progress badges (lib/bibleProgressBadges.ts), which name how much
 *     of the Bible has been read.
 */

export type BadgeTone = "blue" | "gold" | "green" | "pink" | "purple" | "red" | "teal" | "slate";

export type BadgeDefinition = {
  id: string;
  title: string;
  category: string;
  emoji: string;
  tone: BadgeTone;
  target: number;
  /** The original line shown with the badge. */
  description: string;
  /** Exactly what has to be done, in plain words, with the real number in it. */
  how: string;
  /** What the count is a count of, for "3 of 5 chapters". */
  unit: string;
  /** Which number from BadgeInputs this badge counts. */
  measure: (input: BadgeInputs) => number;
  /** XP paid once, when the badge unlocks. The amounts are the originals. */
  xp: number;
  /**
   * Cannot be earned any more because the feature is gone. Still shown to
   * anybody who earned it; hidden from everybody else rather than dangled.
   */
  retired?: boolean;
};

/** Counts taken from a reader's real recorded activity. */
export type BadgeInputs = {
  currentStreak: number;
  totalPoints: number;
  chapterCompletions: number;
  bibleStudyIntroCompletions: number;
  triviaAnswers: number;
  triviaCompletions: number;
  scrambledWordsAnswered: number;
  scrambledCompletions: number;
  notesReviewed: number;
  commentsPosted: number;
  likesGiven: number;
  tvVideosStarted: number;
  booksCompleted: number;
};

/** "Bible Study tasks": an intro, a chapter, a notes review, a trivia round or a Scrambled round. */
const studyTasks = (i: BadgeInputs) =>
  i.bibleStudyIntroCompletions + i.chapterCompletions + i.notesReviewed + i.triviaCompletions + i.scrambledCompletions;

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: "first-light",
    title: "First Light",
    category: "Bible Study",
    emoji: "🌅",
    tone: "gold",
    target: 1,
    description: "Complete your first Bible Study task and light the first spark.",
    how: "Complete 1 Bible Study task: a study intro, a chapter, a notes review, a trivia round or a Scrambled round.",
    unit: "task",
    measure: studyTasks,
    xp: 10,
  },
  {
    id: "chapter-door",
    title: "Chapter Door",
    category: "Bible Study",
    emoji: "🚪",
    tone: "blue",
    target: 1,
    description: "Read your first chapter intro before stepping into the Scripture.",
    how: "Finish the intro of 1 study day.",
    unit: "intro",
    measure: (i) => i.bibleStudyIntroCompletions,
    xp: 10,
  },
  {
    id: "open-scroll",
    title: "Open Scroll",
    category: "Reading",
    emoji: "📖",
    tone: "blue",
    target: 1,
    description: "Finish your first Bible chapter inside Bible Buddy.",
    how: "Finish reading 1 Bible chapter.",
    unit: "chapter",
    measure: (i) => i.chapterCompletions,
    xp: 10,
  },
  {
    id: "notes-lamp",
    title: "Notes Lamp",
    category: "Notes",
    emoji: "🪔",
    tone: "teal",
    target: 1,
    description: "Review chapter notes for the first time and let the chapter get clearer.",
    how: "Open or review the study notes for 1 chapter.",
    unit: "notes review",
    measure: (i) => i.notesReviewed,
    xp: 10,
  },
  {
    id: "quick-recall",
    title: "Quick Recall",
    category: "Trivia",
    emoji: "🧠",
    tone: "pink",
    target: 1,
    description: "Answer your first trivia question and check what is sticking.",
    how: "Answer 1 trivia question.",
    unit: "answer",
    measure: (i) => i.triviaAnswers,
    xp: 10,
  },
  {
    id: "word-lock",
    title: "Word Lock",
    category: "Scrambled",
    emoji: "🔐",
    tone: "purple",
    target: 1,
    description: "Solve your first Scrambled word and lock a chapter word into memory.",
    how: "Solve 1 Scrambled word.",
    unit: "word",
    measure: (i) => i.scrambledWordsAnswered,
    xp: 10,
  },
  {
    id: "ink-and-heart",
    title: "Ink & Heart",
    category: "Reflection",
    emoji: "✍️",
    tone: "gold",
    target: 1,
    description: "Post your first reflection or comment and put thought into words.",
    how: "Post 1 comment or reply.",
    unit: "comment",
    measure: (i) => i.commentsPosted,
    xp: 10,
  },
  {
    id: "whole-chapter",
    title: "Whole Chapter",
    category: "Bible Study",
    emoji: "✅",
    tone: "green",
    target: 1,
    description: "Complete every task for one chapter study from intro to reflection.",
    how: "Complete 1 full study day.",
    unit: "study day",
    measure: (i) => i.bibleStudyIntroCompletions,
    xp: 15,
  },
  {
    id: "steady-seven",
    title: "Steady Seven",
    category: "Streak",
    emoji: "🗓️",
    tone: "green",
    target: 7,
    description: "Show up to Bible Buddy for seven days straight.",
    how: "Reach a 7 day streak.",
    unit: "day",
    measure: (i) => i.currentStreak,
    xp: 12,
  },
  {
    id: "two-week-table",
    title: "Two Week Table",
    category: "Streak",
    emoji: "🍞",
    tone: "gold",
    target: 14,
    description: "Return for two straight weeks and build a steady place at the table.",
    how: "Reach a 14 day streak.",
    unit: "day",
    measure: (i) => i.currentStreak,
    xp: 15,
  },
  {
    id: "consistency-flame",
    title: "Consistency Flame",
    category: "Streak",
    emoji: "🔥",
    tone: "red",
    target: 30,
    description: "Reach a 30 day streak and prove the rhythm is becoming real.",
    how: "Reach a 30 day streak.",
    unit: "day",
    measure: (i) => i.currentStreak,
    xp: 20,
  },
  {
    id: "long-obedience",
    title: "Long Obedience",
    category: "Streak",
    emoji: "🛤️",
    tone: "slate",
    target: 60,
    description: "Stay connected for 60 days straight. This is the kind of steady that shapes a life.",
    how: "Reach a 60 day streak.",
    unit: "day",
    measure: (i) => i.currentStreak,
    xp: 20,
  },
  {
    id: "five-chapter-path",
    title: "Five Chapter Path",
    category: "Reading",
    emoji: "🧭",
    tone: "blue",
    target: 5,
    description: "Finish five Bible chapters and start seeing Scripture as a path, not a one-time stop.",
    how: "Finish reading 5 different Bible chapters.",
    unit: "chapter",
    measure: (i) => i.chapterCompletions,
    xp: 10,
  },
  {
    id: "ten-chapter-builder",
    title: "Chapter Builder",
    category: "Reading",
    emoji: "🏗️",
    tone: "teal",
    target: 10,
    description: "Finish ten Bible chapters and build real reading momentum.",
    how: "Finish reading 10 different Bible chapters.",
    unit: "chapter",
    measure: (i) => i.chapterCompletions,
    xp: 10,
  },
  {
    id: "proverbs-pathfinder",
    title: "Pathfinder",
    category: "Bible Study",
    emoji: "🥾",
    tone: "green",
    target: 5,
    description: "Complete five full chapter studies and keep moving through the Bible Study path.",
    how: "Complete 5 full study days.",
    unit: "study day",
    measure: (i) => i.bibleStudyIntroCompletions,
    xp: 10,
  },
  {
    id: "study-arch",
    title: "Study Arch",
    category: "Bible Study",
    emoji: "🌉",
    tone: "purple",
    target: 15,
    description: "Complete 15 full chapter studies and cross from starting into staying.",
    how: "Complete 15 full study days.",
    unit: "study day",
    measure: (i) => i.bibleStudyIntroCompletions,
    xp: 20,
  },
  {
    id: "deep-well",
    title: "Deep Well",
    category: "Notes",
    emoji: "💧",
    tone: "teal",
    target: 10,
    description: "Review ten chapter note sections and keep drawing deeper understanding.",
    how: "Open or review study notes 10 times.",
    unit: "notes review",
    measure: (i) => i.notesReviewed,
    xp: 10,
  },
  {
    id: "margin-notes",
    title: "Margin Notes",
    category: "Notes",
    emoji: "📓",
    tone: "gold",
    target: 25,
    description: "Review 25 chapter note sections and become someone who studies slowly.",
    how: "Open or review study notes 25 times.",
    unit: "notes review",
    measure: (i) => i.notesReviewed,
    xp: 15,
  },
  {
    id: "quiz-crown",
    title: "Quiz Crown",
    category: "Trivia",
    emoji: "👑",
    tone: "purple",
    target: 10,
    description: "Finish ten trivia rounds and sharpen your chapter recall.",
    how: "Finish the trivia for 10 different chapters.",
    unit: "trivia round",
    measure: (i) => i.triviaCompletions,
    xp: 15,
  },
  {
    id: "memory-keeper",
    title: "Memory Keeper",
    category: "Scrambled",
    emoji: "🧩",
    tone: "pink",
    target: 10,
    description: "Finish ten Scrambled rounds and keep chapter words close.",
    how: "Finish Scrambled for 10 different chapters.",
    unit: "Scrambled round",
    measure: (i) => i.scrambledCompletions,
    xp: 15,
  },
  {
    id: "game-night",
    title: "Game Night",
    category: "Games",
    emoji: "🎮",
    tone: "green",
    target: 25,
    description: "Complete 25 Bible game rounds across Trivia and Scrambled.",
    how: "Finish 25 trivia or Scrambled rounds in total.",
    unit: "round",
    measure: (i) => i.triviaCompletions + i.scrambledCompletions,
    xp: 20,
  },
  {
    id: "encourager",
    title: "Encourager",
    category: "Community",
    emoji: "💙",
    tone: "blue",
    target: 3,
    description: "Like three posts or comments and help another Bible Buddy feel seen.",
    how: "Like 3 posts or comments.",
    unit: "like",
    measure: (i) => i.likesGiven,
    xp: 10,
  },
  {
    id: "table-talk",
    title: "Table Talk",
    category: "Community",
    emoji: "🗣️",
    tone: "purple",
    target: 5,
    description: "Post five comments or replies and join the Bible Buddy conversation.",
    how: "Post 5 comments or replies.",
    unit: "comment",
    measure: (i) => i.commentsPosted,
    xp: 10,
  },
  {
    id: "watchtower",
    title: "Watchtower",
    category: "Bible Buddy TV",
    emoji: "📺",
    tone: "red",
    target: 1,
    description: "Start your first Bible Buddy TV video and learn through story, teaching, or sermon.",
    how: "This badge came from Bible Buddy TV, which is no longer in the app.",
    unit: "video",
    measure: (i) => i.tvVideosStarted,
    xp: 10,
    // Bible Buddy TV was removed on 2026-10-29 (commit 7f2703ae2).
    retired: true,
  },
  {
    id: "first-book-seal",
    title: "Book Seal",
    category: "Reading",
    emoji: "🏅",
    tone: "gold",
    target: 1,
    description: "Finish your first complete Bible book and seal that milestone.",
    how: "Finish every chapter of 1 book of the Bible.",
    unit: "book",
    measure: (i) => i.booksCompleted,
    xp: 20,
  },
  {
    id: "three-book-shelf",
    title: "Three Book Shelf",
    category: "Reading",
    emoji: "📚",
    tone: "teal",
    target: 3,
    description: "Finish three Bible books and start building a real Scripture shelf.",
    how: "Finish every chapter of 3 books of the Bible.",
    unit: "book",
    measure: (i) => i.booksCompleted,
    xp: 20,
  },
  {
    id: "small-but-steady",
    title: "Small But Steady",
    category: "Progress",
    emoji: "🌱",
    tone: "green",
    target: 250,
    description: "Earn 250 points through small faithful actions.",
    how: "Earn 250 XP.",
    unit: "XP",
    measure: (i) => i.totalPoints,
    xp: 10,
  },
  {
    id: "thousand-stones",
    title: "Thousand Stones",
    category: "Progress",
    emoji: "🪨",
    tone: "slate",
    target: 1000,
    description: "Earn 1,000 Bible Buddy points, one study action at a time.",
    how: "Earn 1,000 XP.",
    unit: "XP",
    measure: (i) => i.totalPoints,
    xp: 15,
  },
  {
    id: "full-rhythm",
    title: "Full Rhythm",
    category: "Bible Study",
    emoji: "🎵",
    tone: "blue",
    target: 50,
    description: "Complete 50 Bible Study tasks and let the rhythm settle in.",
    how: "Complete 50 Bible Study tasks: study intros, chapters, notes reviews, trivia rounds and Scrambled rounds all count.",
    unit: "task",
    measure: studyTasks,
    xp: 20,
  },
];

export const BADGE_IDS = new Set(BADGE_DEFINITIONS.map((badge) => badge.id));

/** The old tile, bar and glow classes, unchanged. */
export const BADGE_TONE_CLASSES: Record<BadgeTone, { tile: string; progress: string; glow: string }> = {
  blue: {
    tile: "border-[var(--bb-accent,#8fc7ee)] bg-[var(--bb-accent-soft,#eaf5ff)] text-[var(--bb-text-primary,#123c63)]",
    progress: "bg-[#7BAFD4]",
    glow: "shadow-[0_10px_28px_rgba(123,175,212,0.32)]",
  },
  gold: { tile: "border-[#ffd36a] bg-[#fff7df] text-[#4c3100]", progress: "bg-[#f3bd3e]", glow: "shadow-[0_10px_28px_rgba(242,178,51,0.3)]" },
  green: { tile: "border-[#9fe6b8] bg-[#e9fbef] text-[#0e4829]", progress: "bg-[#35c46f]", glow: "shadow-[0_10px_28px_rgba(52,195,111,0.28)]" },
  pink: { tile: "border-[#ffc0d6] bg-[#fff0f6] text-[#651536]", progress: "bg-[#f46fa0]", glow: "shadow-[0_10px_28px_rgba(244,111,160,0.28)]" },
  purple: { tile: "border-[#d8c1ff] bg-[#f4edff] text-[#35156d]", progress: "bg-[#9b6cf4]", glow: "shadow-[0_10px_28px_rgba(155,108,244,0.28)]" },
  red: { tile: "border-[#ffb2a7] bg-[#fff0ee] text-[#651a14]", progress: "bg-[#f45b4c]", glow: "shadow-[0_10px_28px_rgba(244,91,76,0.26)]" },
  teal: { tile: "border-[#99eadc] bg-[#e9fffa] text-[#0c4d44]", progress: "bg-[#26bca5]", glow: "shadow-[0_10px_28px_rgba(38,188,165,0.26)]" },
  slate: { tile: "border-[#cbd5e1] bg-[#f8fafc] text-[#1f2937]", progress: "bg-[#64748b]", glow: "shadow-[0_10px_28px_rgba(100,116,139,0.2)]" },
};

export type BadgeActionRow = { action_type: string | null; action_label: string | null };

/**
 * Completion facts, counted once per distinct label.
 *
 * The removed dashboard counted raw rows, so reading Genesis 3 five times was
 * "five chapters". The points engine has since settled the question the other
 * way - "finishing Genesis 3 twice is still one completed chapter"
 * (UNIQUE_PER_LABEL in lib/pointsEngine.ts) - and a badge that says "finish
 * five Bible chapters" should mean five chapters. So these are distinct. This
 * is the one place the restored rules are stricter than the originals.
 */
const DISTINCT_BY_LABEL = new Set([
  "chapter_completed",
  "reading_plan_chapter_completed",
  "devotional_day_completed",
  "chapter_notes_reviewed",
  "trivia_chapter_completed",
  "scrambled_chapter_completed",
  "book_completed",
]);

/** Turn a reader's action rows into the counts the badges measure. */
export function countBadgeInputs(
  actions: BadgeActionRow[],
  extra: { currentStreak: number; totalPoints: number; groupComments: number; groupLikesGiven: number },
): BadgeInputs {
  const raw = new Map<string, number>();
  const distinct = new Map<string, Set<string>>();
  for (const row of actions) {
    const type = row.action_type || "";
    if (!type) continue;
    // The same exclusion the points engine and the old dashboard make.
    if (type === "scrambled_word_answered" && (row.action_label || "").includes("[no-point]")) continue;
    raw.set(type, (raw.get(type) || 0) + 1);
    if (DISTINCT_BY_LABEL.has(type)) {
      if (!distinct.has(type)) distinct.set(type, new Set());
      distinct.get(type)!.add((row.action_label || "").trim().toLowerCase() || `unlabelled-${raw.get(type)}`);
    }
  }
  const count = (...types: string[]) =>
    types.reduce((total, type) => total + (DISTINCT_BY_LABEL.has(type) ? distinct.get(type)?.size || 0 : raw.get(type) || 0), 0);

  // A chapter finished in the reader and the same chapter finished through a
  // reading plan is one chapter, so those two share one set of labels.
  const chapters = new Set([...(distinct.get("chapter_completed") || []), ...(distinct.get("reading_plan_chapter_completed") || [])]);

  return {
    currentStreak: Math.max(0, Math.floor(extra.currentStreak || 0)),
    totalPoints: Math.max(0, Math.floor(extra.totalPoints || 0)),
    chapterCompletions: chapters.size,
    bibleStudyIntroCompletions: count("devotional_day_completed"),
    triviaAnswers: count("trivia_question_answered", "trivia_question_correct"),
    triviaCompletions: count("trivia_chapter_completed"),
    scrambledWordsAnswered: count("scrambled_word_answered"),
    scrambledCompletions: count("scrambled_chapter_completed"),
    notesReviewed: count("chapter_notes_reviewed") + (raw.get("chapter_notes_viewed") || 0),
    commentsPosted: Math.max(0, extra.groupComments) + count("feed_post_commented", "feed_post_replied"),
    likesGiven: Math.max(0, extra.groupLikesGiven) + count("feed_post_liked"),
    tvVideosStarted: count("bible_buddy_tv_video_started", "bible_buddy_tv_title_opened"),
    booksCompleted: count("book_completed"),
  };
}

export type BadgeStatus = {
  id: string;
  title: string;
  category: string;
  emoji: string;
  tone: BadgeTone;
  description: string;
  how: string;
  unit: string;
  target: number;
  /** XP this badge pays, once, when it unlocks. */
  xp: number;
  /** Clamped to 0..target. */
  current: number;
  /** Unlocked: recorded in the award table, XP paid. */
  earned: boolean;
  /**
   * The activity is done but the badge has not unlocked yet, because badges
   * unlock one at a time (BADGE_UNLOCK_GAP_MS). It is next in the queue.
   */
  ready: boolean;
  /** When it unlocked, if it has. */
  earnedAt: string | null;
  /** Unlocked during this very request: the one moment to celebrate it. */
  isNew: boolean;
};

/**
 * Where a reader stands on every badge.
 *
 * `recorded` is what the award table holds. A recorded badge is earned
 * whatever the numbers say today: a 30 day streak that later breaks was still
 * a 30 day streak. A badge that is not recorded but whose count has reached
 * the target is `ready`: it will unlock, but not necessarily now. A retired
 * badge can no longer become ready.
 */
export function buildBadgeStatuses(input: BadgeInputs, recorded: Map<string, string | null>): BadgeStatus[] {
  const statuses: BadgeStatus[] = [];
  for (const badge of BADGE_DEFINITIONS) {
    const earned = recorded.has(badge.id);
    if (badge.retired && !earned) continue;
    const measured = Math.floor(Number(badge.measure(input)) || 0);
    const ready = !earned && !badge.retired && measured >= badge.target;
    statuses.push({
      id: badge.id,
      title: badge.title,
      category: badge.category,
      emoji: badge.emoji,
      tone: badge.tone,
      description: badge.description,
      how: badge.how,
      unit: badge.unit,
      target: badge.target,
      xp: badge.xp,
      current: earned || ready ? badge.target : Math.max(0, Math.min(badge.target, measured)),
      earned,
      ready,
      earnedAt: earned ? recorded.get(badge.id) ?? null : null,
      isNew: false,
    });
  }
  return statuses;
}

/** XP paid by the badges a reader has unlocked. Ids that are not real badges pay nothing. */
export function badgeXpFor(recordedIds: Iterable<string>): number {
  const byId = new Map(BADGE_DEFINITIONS.map((badge) => [badge.id, badge.xp]));
  let total = 0;
  for (const id of new Set(recordedIds)) total += byId.get(id) ?? 0;
  return total;
}

/**
 * How long after one badge unlocks before the next one may.
 *
 * Louis, 2026-11-13: "badges should pop up but not in the same pop up session,
 * 1 at a time, spread out, not 28 earned at one time". Somebody who has used
 * the app for a year could qualify for twenty of these the day this ships.
 * They get one, and the next one the next time they come back after this gap,
 * so the backlog arrives as a run of small wins rather than a wall.
 *
 * Two hours is the cooldown the removed dashboard used for the same job
 * (BADGE_POPUP_BATCH_COOLDOWN_MS). It allowed two popups per batch; this
 * allows one.
 */
export const BADGE_UNLOCK_GAP_MS = 2 * 60 * 60 * 1000;

/**
 * The one badge that may unlock now, or null.
 *
 * At most one, and only when the last unlock is at least the gap ago. The
 * order is the order of BADGE_DEFINITIONS, which runs from the first small
 * steps to the long hauls, so the queue plays out in a sensible sequence.
 */
export function pickBadgeToUnlock(statuses: BadgeStatus[], recorded: Map<string, string | null>, now: number): BadgeStatus | null {
  const next = statuses.find((status) => status.ready);
  if (!next) return null;
  let latest = 0;
  for (const shownAt of recorded.values()) {
    const at = shownAt ? Date.parse(shownAt) : NaN;
    if (Number.isFinite(at) && at > latest) latest = at;
  }
  if (latest && now - latest < BADGE_UNLOCK_GAP_MS) return null;
  return next;
}

/**
 * How long a fresh unlock goes on being offered for announcement.
 *
 * The unlock is recorded by the request that makes it, but the reply to that
 * request can be lost: the reader taps away, the tab is backgrounded, or (in
 * development, on every load) React mounts the card twice and throws the
 * first reply away. The first version announced only on the unlocking reply,
 * and on the very first test the badge unlocked, the XP arrived and nothing
 * was ever shown. Same defect the level-up popup had before
 * profile_stats.level_celebrated (D1, docs/LEVELS_PROPOSAL_2026-11-10.md).
 *
 * So the server offers the most recent unlock for this long, and the app
 * shows it unless that device has already shown it
 * (components/levels/BadgeUnlockedToast.tsx keeps the list). Ten minutes
 * covers a slow first load and a retry, and is short enough that yesterday's
 * badge is never announced as news.
 */
export const BADGE_ANNOUNCE_WINDOW_MS = 10 * 60 * 1000;

/** The most recently unlocked badge, if it unlocked within the window. */
export function badgeToAnnounce(statuses: BadgeStatus[], now: number): BadgeStatus | null {
  let latest: BadgeStatus | null = null;
  let latestAt = 0;
  for (const status of statuses) {
    if (!status.earned || !status.earnedAt) continue;
    const at = Date.parse(status.earnedAt);
    if (Number.isFinite(at) && at > latestAt) {
      latestAt = at;
      latest = status;
    }
  }
  if (!latest || now - latestAt > BADGE_ANNOUNCE_WINDOW_MS || now < latestAt - 60_000) return null;
  return latest;
}
