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
    intro: "What translation do you naturally reach for, and what makes it the one you trust most right now?",
    commentPrompt: "Share your answer in the comments and tell us why it has become your go-to.",
  },
  {
    key: "testimony",
    subjectTitle: "Your Testimony",
    prompt: "What is your story with God, and what moment made your faith real to you?",
    intro: "Take a moment and share your story. What was life like before, what drew you toward God, and what was the moment when you knew you needed Him?",
    commentPrompt: "Be as honest and detailed as you want in the comments. Someone else may need your story today.",
  },
  {
    key: "favorite_book",
    subjectTitle: "Favorite Book of the Bible",
    prompt: "What's your favorite book in the Bible?",
    intro: "What book do you keep returning to, and what is it about that book that keeps speaking to you?",
    commentPrompt: "Share your answer in the comments and tell us what makes that book personal for you.",
  },
  {
    key: "favorite_verse",
    subjectTitle: "Verse You Lean On",
    prompt: "What's one Bible verse you keep coming back to?",
    intro: "What verse has stayed with you in a deep way, and why does it keep meeting you where you are?",
    commentPrompt: "Drop the verse in the comments and tell us the story behind why it matters to you.",
  },
  {
    key: "consistency",
    subjectTitle: "Staying Consistent",
    prompt: "What helps you stay consistent in the Bible?",
    intro: "When life gets busy or your motivation drops, what actually helps you keep showing up in the Word?",
    commentPrompt: "Share what really helps you in the comments so someone else can learn from it too.",
  },
  {
    key: "jesus_following",
    subjectTitle: "Following Jesus",
    prompt: "What does following Jesus look like for you right now?",
    intro: "In this season of life, what is Jesus asking of you, and what does following Him actually look like day to day?",
    commentPrompt: "Share honestly in the comments. Real answers help make the conversation real.",
  },
  {
    key: "bible_character",
    subjectTitle: "Bible Character",
    prompt: "What Bible person do you relate to the most right now?",
    intro: "Who in Scripture feels the most relatable to you in this season, and what part of their story mirrors what you are walking through?",
    commentPrompt: "Tell us who it is in the comments and why their story feels close to yours right now.",
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
