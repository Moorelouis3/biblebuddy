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
    prompt: "What's your go to Bible translation right now, and why does it help you stay in the Word?",
    intro: "A simple weekly question to help Buddies learn how each person studies Scripture.",
    commentPrompt: "Drop your answer in the comments and tell us why that translation connects with you.",
  },
  {
    key: "testimony",
    subjectTitle: "Your Testimony",
    prompt: "What's your testimony? How did God begin changing your life?",
    intro: "Truth Thursday is about real faith, real people, and real stories of what God has done.",
    commentPrompt: "Share as much of your story as you feel comfortable sharing in the comments.",
  },
  {
    key: "favorite_book",
    subjectTitle: "Favorite Book of the Bible",
    prompt: "What's your favorite book in the Bible, and what keeps pulling you back to it?",
    intro: "This week's question is a simple way to spark honest Bible conversation in the group.",
    commentPrompt: "Tell the group your favorite book and one reason it means so much to you.",
  },
  {
    key: "favorite_verse",
    subjectTitle: "Verse You Lean On",
    prompt: "What's one Bible verse you keep coming back to in this season of life?",
    intro: "Sometimes one verse becomes an anchor. This week is about sharing those anchors together.",
    commentPrompt: "Post the verse reference and why it has been speaking to you lately.",
  },
  {
    key: "consistency",
    subjectTitle: "Staying Consistent",
    prompt: "What helps you stay consistent in the Bible when life gets busy?",
    intro: "The group grows when people share real habits, not perfect answers.",
    commentPrompt: "Give the group one tip that helps you keep showing up in the Word.",
  },
  {
    key: "jesus_following",
    subjectTitle: "Following Jesus",
    prompt: "What does following Jesus look like in your everyday life right now?",
    intro: "Truth Thursday is built to get the group talking about practical faith, not just ideas.",
    commentPrompt: "Share one real way you are trying to follow Jesus this week.",
  },
  {
    key: "bible_character",
    subjectTitle: "Bible Character",
    prompt: "What Bible person do you relate to the most right now, and why?",
    intro: "The people in Scripture often reflect the same struggles, hopes, and questions we live with today.",
    commentPrompt: "Tell us who you relate to and what part of their story connects with yours.",
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
