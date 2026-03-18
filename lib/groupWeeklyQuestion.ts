export type WeeklyGroupQuestionTheme = {
  key: string;
  subjectTitle: string;
  prompt: string;
  intro: string;
  commentPrompt: string;
};

export type WeeklyGroupQuestionRecord = {
  id: string;
  group_id: string;
  post_id: string;
  week_key: string;
  prompt_key: string;
  subject_title: string;
  prompt: string;
  intro: string | null;
  comment_prompt: string | null;
  created_at: string;
};

const THEMES: WeeklyGroupQuestionTheme[] = [
  {
    key: "go_to_translation",
    subjectTitle: "Bible Translation",
    prompt: "What's your go to Bible translation right now?",
    intro: "Which Bible translation do you read when studying the Bible?",
    commentPrompt: "Drop your answer in the comments.",
  },
  {
    key: "testimony",
    subjectTitle: "Your Testimony",
    prompt: "What made you come to God?",
    intro: "Share a simple part of your testimony with the group.",
    commentPrompt: "Drop your answer in the comments.",
  },
  {
    key: "favorite_book",
    subjectTitle: "Favorite Book of the Bible",
    prompt: "What's your favorite book in the Bible?",
    intro: "What book do you keep going back to the most?",
    commentPrompt: "Drop your answer in the comments.",
  },
  {
    key: "favorite_verse",
    subjectTitle: "Verse You Lean On",
    prompt: "What's one Bible verse you keep coming back to?",
    intro: "Share a verse that has really stayed with you.",
    commentPrompt: "Drop your answer in the comments.",
  },
  {
    key: "consistency",
    subjectTitle: "Staying Consistent",
    prompt: "What helps you stay consistent in the Bible?",
    intro: "What helps you keep showing up in the Word when life gets busy?",
    commentPrompt: "Drop your answer in the comments.",
  },
  {
    key: "jesus_following",
    subjectTitle: "Following Jesus",
    prompt: "What does following Jesus look like for you right now?",
    intro: "Share one real way you are trying to follow Jesus this week.",
    commentPrompt: "Drop your answer in the comments.",
  },
  {
    key: "bible_character",
    subjectTitle: "Bible Character",
    prompt: "What Bible person do you relate to the most right now?",
    intro: "Who in Scripture feels the most relatable to you in this season?",
    commentPrompt: "Drop your answer in the comments.",
  },
];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function getQuestionWeekStart(date = new Date()): Date {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = utc.getUTCDay();
  const daysSinceThursday = (day + 3) % 7;
  utc.setUTCDate(utc.getUTCDate() - daysSinceThursday);
  return utc;
}

export function getQuestionWeekKey(date = new Date()): string {
  const weekStart = getQuestionWeekStart(date);
  return `${weekStart.getUTCFullYear()}-${pad(weekStart.getUTCMonth() + 1)}-${pad(weekStart.getUTCDate())}`;
}

export function getWeeklyGroupQuestionTheme(date = new Date()): WeeklyGroupQuestionTheme {
  const weekStart = getQuestionWeekStart(date);
  const seed = Math.floor(weekStart.getTime() / (7 * 24 * 60 * 60 * 1000));
  return THEMES[((seed % THEMES.length) + THEMES.length) % THEMES.length];
}

export function buildWeeklyGroupQuestion(date = new Date()) {
  const theme = getWeeklyGroupQuestionTheme(date);
  return {
    weekKey: getQuestionWeekKey(date),
    promptKey: theme.key,
    subjectTitle: theme.subjectTitle,
    prompt: theme.prompt,
    intro: theme.intro,
    commentPrompt: theme.commentPrompt,
  };
}
