export type WeeklyGroupPollOption = {
  key: string;
  text: string;
};

export type WeeklyGroupPollTheme = {
  key: string;
  subjectTitle: string;
  question: string;
  intro: string | null;
  options: WeeklyGroupPollOption[];
};

export type WeeklyGroupPollRecord = {
  id: string;
  group_id: string;
  post_id: string;
  week_key: string;
  poll_key: string;
  subject_title: string;
  question: string;
  intro: string | null;
  options: WeeklyGroupPollOption[];
  created_at: string;
};

const THEMES: WeeklyGroupPollTheme[] = [
  {
    key: "reading_frequency",
    subjectTitle: "Bible Reading Habits",
    question: "How many days a week do you usually read the Bible?",
    intro: null,
    options: [
      { key: "six_seven", text: "6 to 7 days a week" },
      { key: "four_five", text: "4 to 5 days a week" },
      { key: "two_three", text: "2 to 3 days a week" },
      { key: "maybe_once", text: "Maybe once a week" },
    ],
  },
  {
    key: "jesus_is_god",
    subjectTitle: "Jesus and Identity",
    question: "Do you believe Jesus is God?",
    intro: null,
    options: [
      { key: "yes", text: "Yes" },
      { key: "no", text: "No" },
      { key: "learning", text: "I am still learning" },
    ],
  },
  {
    key: "favorite_translation",
    subjectTitle: "Bible Translation Preference",
    question: "What Bible translation do you use the most right now?",
    intro: null,
    options: [
      { key: "niv", text: "NIV" },
      { key: "esv", text: "ESV" },
      { key: "kjv", text: "KJV" },
      { key: "other", text: "Another one" },
    ],
  },
  {
    key: "morning_or_night",
    subjectTitle: "Bible Routine",
    question: "When are you most likely to read the Bible?",
    intro: null,
    options: [
      { key: "morning", text: "Morning" },
      { key: "afternoon", text: "Afternoon" },
      { key: "night", text: "Night" },
      { key: "varies", text: "It changes a lot" },
    ],
  },
];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function getPollWeekStart(date = new Date()): Date {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = utc.getUTCDay();
  const daysSinceWednesday = (day + 4) % 7;
  utc.setUTCDate(utc.getUTCDate() - daysSinceWednesday);
  return utc;
}

export function getPollWeekKey(date = new Date()): string {
  const weekStart = getPollWeekStart(date);
  return `${weekStart.getUTCFullYear()}-${pad(weekStart.getUTCMonth() + 1)}-${pad(weekStart.getUTCDate())}`;
}

export function getWeeklyGroupPollTheme(date = new Date()): WeeklyGroupPollTheme {
  const weekStart = getPollWeekStart(date);
  const seed = Math.floor(weekStart.getTime() / (7 * 24 * 60 * 60 * 1000));
  return THEMES[((seed % THEMES.length) + THEMES.length) % THEMES.length];
}

export function buildWeeklyGroupPoll(date = new Date()) {
  const theme = getWeeklyGroupPollTheme(date);
  return {
    weekKey: getPollWeekKey(date),
    pollKey: theme.key,
    subjectTitle: theme.subjectTitle,
    question: theme.question,
    intro: theme.intro,
    options: theme.options,
  };
}

export function parseWeeklyPollOptions(value: unknown): WeeklyGroupPollOption[] {
  if (!Array.isArray(value)) return [];
  return value.filter((option) => {
    if (!option || typeof option !== "object") return false;
    const maybe = option as WeeklyGroupPollOption;
    return typeof maybe.key === "string" && typeof maybe.text === "string";
  }) as WeeklyGroupPollOption[];
}
