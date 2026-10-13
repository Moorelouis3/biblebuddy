import type { WeeklyGroupPollOption, WeeklyGroupPollTheme } from "./groupWeeklyPoll";

// Opinion Wednesday - the approved 52-week poll bank (2026-09-06).
// These are Louis's approved community polls, published in this exact
// order, one per Wednesday: no poll repeats until all 52 have been used.
// They are low-pressure conversation starters (no right answers), four
// options each. To add Poll #53 later, append an entry here - the
// scheduler picks the next unused poll automatically, no other change
// needed. Do NOT let anything regenerate or rewrite these weekly.

type WeeklyPollBankEntry = {
  key: string;
  subjectTitle: string;
  question: string;
  options: [string, string, string, string];
};

function toTheme(entry: WeeklyPollBankEntry): WeeklyGroupPollTheme {
  const options: WeeklyGroupPollOption[] = entry.options.map((text, index) => ({
    key: `option_${index + 1}`,
    text,
  }));
  return {
    key: entry.key,
    subjectTitle: entry.subjectTitle,
    question: entry.question,
    intro: null,
    options,
  };
}

const READING = "Bible Reading & Habits";
const PREFERENCES = "Bible Preferences";
const STUDY = "Bible Study";
const PRAYER = "Prayer";
const WORSHIP = "Worship & Church";
const EVERYDAY = "Faith & Everyday Life";
const COMMUNITY = "Community & Growth";

const BANK: WeeklyPollBankEntry[] = [
  // Bible Reading & Habits (1-8)
  {
    key: "reading_days_per_week",
    subjectTitle: READING,
    question: "How many days a week do you usually read the Bible?",
    options: ["6-7 days a week", "4-5 days a week", "2-3 days a week", "Maybe once a week"],
  },
  {
    key: "reading_time_of_day",
    subjectTitle: READING,
    question: "When do you usually read your Bible?",
    options: ["First thing in the morning", "During the day", "Before bed", "Whenever I get the chance"],
  },
  {
    key: "reading_session_length",
    subjectTitle: READING,
    question: "How long is a typical Bible-reading session for you?",
    options: ["Less than 10 minutes", "10-20 minutes", "20-30 minutes", "More than 30 minutes"],
  },
  {
    key: "reading_location",
    subjectTitle: READING,
    question: "Where do you read the Bible most often?",
    options: ["At home", "At church", "At work / on a break", "Wherever I happen to be"],
  },
  {
    key: "reading_motivation",
    subjectTitle: READING,
    question: "What usually motivates you to open your Bible?",
    options: ["My daily routine", "I need encouragement", "I want to learn something", "I just feel drawn to read"],
  },
  {
    key: "reading_format",
    subjectTitle: READING,
    question: "How do you prefer to read the Bible?",
    options: ["Physical Bible", "Bible app", "Both", "Mostly audio"],
  },
  {
    key: "reading_plan_use",
    subjectTitle: READING,
    question: "Do you follow a Bible reading plan?",
    options: ["Yes, every day", "Sometimes", "I've tried before", "Not yet"],
  },
  {
    key: "reading_hardest_part",
    subjectTitle: READING,
    question: "What makes Bible reading hardest for you?",
    options: ["Finding the time", "Understanding what I read", "Staying consistent", "Knowing where to start"],
  },

  // Bible Preferences (9-16)
  {
    key: "translation_most_read",
    subjectTitle: PREFERENCES,
    question: "Which Bible translation do you read most?",
    options: ["KJV", "NIV", "ESV", "Another translation"],
  },
  {
    key: "favorite_bible_part",
    subjectTitle: PREFERENCES,
    question: "Which part of the Bible do you enjoy reading most?",
    options: ["Old Testament", "The Gospels", "Rest of the New Testament", "I enjoy all of it"],
  },
  {
    key: "favorite_gospel",
    subjectTitle: PREFERENCES,
    question: "Which Gospel do you enjoy reading most?",
    options: ["Matthew", "Mark", "Luke", "John"],
  },
  {
    key: "book_to_study_deeply",
    subjectTitle: PREFERENCES,
    question: "Which book would you most like to study deeply?",
    options: ["Genesis", "Psalms", "Proverbs", "Romans"],
  },
  {
    key: "favorite_ot_story",
    subjectTitle: PREFERENCES,
    question: "Which Old Testament story could you read again and again?",
    options: ["Joseph", "Moses & the Exodus", "David", "Daniel"],
  },
  {
    key: "favorite_book_type",
    subjectTitle: PREFERENCES,
    question: "Which type of Bible book do you enjoy most?",
    options: ["History & stories", "Wisdom & poetry", "Prophecy", "Letters / teaching"],
  },
  {
    key: "reading_style_preference",
    subjectTitle: PREFERENCES,
    question: "Which do you enjoy more?",
    options: ["Reading one whole chapter", "Studying a few verses deeply", "Following a reading plan", "It depends on the day"],
  },
  {
    key: "want_to_understand_better",
    subjectTitle: PREFERENCES,
    question: "What would you most like to understand better?",
    options: ["Old Testament", "Jesus' teachings", "Paul's letters", "Revelation / prophecy"],
  },

  // Bible Study (17-24)
  {
    key: "confusing_verse_response",
    subjectTitle: STUDY,
    question: "When you don't understand a Bible verse, what do you usually do?",
    options: ["Read the surrounding verses", "Look up an explanation", "Pray about it", "Keep reading and return later"],
  },
  {
    key: "study_note_taking",
    subjectTitle: STUDY,
    question: "Do you take notes while studying the Bible?",
    options: ["Almost always", "Sometimes", "Rarely", "Never"],
  },
  {
    key: "bible_highlighting",
    subjectTitle: STUDY,
    question: "Do you highlight your Bible?",
    options: ["Yes, a lot", "Sometimes", "Not yet, but I'd like to", "No"],
  },
  {
    key: "understanding_helper",
    subjectTitle: STUDY,
    question: "What helps you understand Scripture most?",
    options: ["Verse-by-verse notes", "Videos / teaching", "Discussing it with others", "Reading it repeatedly"],
  },
  {
    key: "context_lookup_frequency",
    subjectTitle: STUDY,
    question: "How often do you look up the context behind a Bible passage?",
    options: ["Almost every time", "Sometimes", "Only when I'm confused", "Rarely"],
  },
  {
    key: "bible_buddy_help_wish",
    subjectTitle: STUDY,
    question: "What would you most like Bible Buddy to help you with?",
    options: ["Understanding Scripture", "Reading consistently", "Learning Bible history", "Applying Scripture to life"],
  },
  {
    key: "study_focus_preference",
    subjectTitle: STUDY,
    question: "Would you rather study...",
    options: ["One person in the Bible", "One book of the Bible", "One Christian topic", "One verse at a time"],
  },
  {
    key: "difficult_passage_first_need",
    subjectTitle: STUDY,
    question: "When studying a difficult passage, what do you want first?",
    options: ["A simple explanation", "Historical context", "Key word meanings", "Practical application"],
  },

  // Prayer (25-32)
  {
    key: "prayer_style",
    subjectTitle: PRAYER,
    question: "How do you usually pray?",
    options: ["Quietly in my head", "Out loud", "I write my prayers", "A mix of these"],
  },
  {
    key: "prayer_time_of_day",
    subjectTitle: PRAYER,
    question: "When do you pray most often?",
    options: ["Morning", "Throughout the day", "Evening", "Whenever I need to"],
  },
  {
    key: "prayer_topics",
    subjectTitle: PRAYER,
    question: "What do you pray about most?",
    options: ["Family & friends", "Guidance", "Gratitude", "Whatever I'm going through"],
  },
  {
    key: "prayer_journaling",
    subjectTitle: PRAYER,
    question: "Do you ever write down your prayers?",
    options: ["Yes, regularly", "Sometimes", "I've tried it", "Never"],
  },
  {
    key: "prayer_length",
    subjectTitle: PRAYER,
    question: "How long are most of your prayers?",
    options: ["A few seconds", "A few minutes", "10+ minutes", "It varies completely"],
  },
  {
    key: "prayer_hardest_part",
    subjectTitle: PRAYER,
    question: "Which is hardest for you in prayer?",
    options: ["Staying focused", "Finding the words", "Being consistent", "Waiting for an answer"],
  },
  {
    key: "prayer_before_reading",
    subjectTitle: PRAYER,
    question: "Do you pray before reading the Bible?",
    options: ["Almost always", "Sometimes", "Rarely", "I haven't tried that"],
  },
  {
    key: "prayer_focus_helper",
    subjectTitle: PRAYER,
    question: "What helps you focus during prayer?",
    options: ["Complete silence", "Worship music", "Writing things down", "Walking / being outside"],
  },

  // Worship & Church (33-40)
  {
    key: "connection_with_god",
    subjectTitle: WORSHIP,
    question: "What helps you connect with God the most?",
    options: ["Reading the Bible", "Prayer", "Worship music", "Church / other believers"],
  },
  {
    key: "worship_music_type",
    subjectTitle: WORSHIP,
    question: "What kind of worship music do you listen to most?",
    options: ["Contemporary worship", "Gospel", "Hymns", "A mixture"],
  },
  {
    key: "christian_music_time",
    subjectTitle: WORSHIP,
    question: "When do you listen to Christian music most?",
    options: ["Morning", "While driving", "While working / cleaning", "Throughout the day"],
  },
  {
    key: "church_attendance",
    subjectTitle: WORSHIP,
    question: "How often do you currently attend church?",
    options: ["Every week", "A few times a month", "Occasionally", "I'm looking for a church"],
  },
  {
    key: "church_favorite_part",
    subjectTitle: WORSHIP,
    question: "What part of church do you enjoy most?",
    options: ["Worship", "Sermon / teaching", "Community", "Prayer"],
  },
  {
    key: "church_attendance_mode",
    subjectTitle: WORSHIP,
    question: "How do you usually attend church?",
    options: ["In person", "Online", "Both", "I'm not attending currently"],
  },
  {
    key: "welcoming_church_quality",
    subjectTitle: WORSHIP,
    question: "What makes a church feel welcoming to you?",
    options: ["Friendly people", "Strong Bible teaching", "Good worship", "A sense of community"],
  },
  {
    key: "study_setting_preference",
    subjectTitle: WORSHIP,
    question: "Do you prefer studying Scripture...",
    options: ["By myself", "With one other person", "In a small group", "In a church/class setting"],
  },

  // Faith & Everyday Life (41-48)
  {
    key: "hard_times_first_turn",
    subjectTitle: EVERYDAY,
    question: "When life gets difficult, where do you usually turn first?",
    options: ["Prayer", "The Bible", "Someone I trust", "I try to handle it myself first"],
  },
  {
    key: "faith_growth_area",
    subjectTitle: EVERYDAY,
    question: "What area of your faith are you working on most right now?",
    options: ["Consistency", "Trusting God", "Prayer", "Understanding Scripture"],
  },
  {
    key: "daily_god_reminder",
    subjectTitle: EVERYDAY,
    question: "What reminds you of God most during an ordinary day?",
    options: ["Nature", "Music", "Other people", "Scripture"],
  },
  {
    key: "trusting_god_hardest",
    subjectTitle: EVERYDAY,
    question: "What do you find hardest about trusting God?",
    options: ["Waiting", "Not knowing what comes next", "Letting go of control", "Understanding why things happen"],
  },
  {
    key: "season_greatest_need",
    subjectTitle: EVERYDAY,
    question: "Which do you need most in this season?",
    options: ["Peace", "Direction", "Strength", "Patience"],
  },
  {
    key: "thankful_for_today",
    subjectTitle: EVERYDAY,
    question: "What are you most thankful to God for today?",
    options: ["Family / relationships", "Health / another day", "Provision", "God's grace"],
  },
  {
    key: "encouragement_bible_spot",
    subjectTitle: EVERYDAY,
    question: "When you need encouragement, where in the Bible are you most likely to go?",
    options: ["Psalms", "Proverbs", "The Gospels", "Paul's letters"],
  },
  {
    key: "scripture_memory_helper",
    subjectTitle: EVERYDAY,
    question: "What helps you remember Scripture?",
    options: ["Highlighting", "Writing verses down", "Repeating / memorizing", "Seeing verses regularly"],
  },

  // Community & Growth (49-52)
  {
    key: "question_comfort_level",
    subjectTitle: COMMUNITY,
    question: "How comfortable are you asking Bible questions?",
    options: ["Very comfortable", "Usually comfortable", "A little nervous", "I'm afraid of sounding wrong"],
  },
  {
    key: "participation_encourager",
    subjectTitle: COMMUNITY,
    question: "What would make you participate more in a Bible community?",
    options: ["Simple polls like this", "Bible questions", "Character studies", "Sharing prayer / encouragement"],
  },
  {
    key: "bible_learning_stage",
    subjectTitle: COMMUNITY,
    question: "How would you describe where you are in learning the Bible?",
    options: ["Just getting started", "I know some of it", "I've studied for years", "Always learning"],
  },
  {
    key: "faith_one_year_goal",
    subjectTitle: COMMUNITY,
    question: "One year from now, what would you most like to say about your faith?",
    options: ["I know the Bible better", "I pray more consistently", "I trust God more", "I'm closer to God"],
  },
];

export const WEEKLY_POLL_BANK: WeeklyGroupPollTheme[] = BANK.map(toTheme);

// Poll keys from the old 4-poll cycle mapped to their equivalent in the
// approved bank, so the rotation continues from where the old cycle left
// off instead of immediately re-asking a question the group just answered.
// ("jesus_is_god" has no equivalent in the approved bank and is skipped.)
const LEGACY_POLL_KEY_ALIASES: Record<string, string> = {
  reading_frequency: "reading_days_per_week",
  morning_or_night: "reading_time_of_day",
  favorite_translation: "translation_most_read",
};

const INDEX_BY_KEY = new Map(WEEKLY_POLL_BANK.map((theme, index) => [theme.key, index]));

export function findWeeklyPollIndexByKey(pollKey: string | null | undefined) {
  if (!pollKey) return null;
  const resolvedKey = LEGACY_POLL_KEY_ALIASES[pollKey] ?? pollKey;
  const index = INDEX_BY_KEY.get(resolvedKey);
  return index === undefined ? null : index;
}

/**
 * Given past poll_key values ordered newest-first, return the index of the
 * poll that should publish next: the one after the most recently published
 * bank poll. Keys that don't match the bank (retired polls, one-off
 * specials) are skipped. With no match at all the rotation starts at #1.
 */
export function getNextWeeklyPollIndex(recentPollKeysNewestFirst: string[]) {
  for (const pollKey of recentPollKeysNewestFirst) {
    const matched = findWeeklyPollIndexByKey(pollKey);
    if (matched !== null) {
      return (matched + 1) % WEEKLY_POLL_BANK.length;
    }
  }
  return 0;
}
