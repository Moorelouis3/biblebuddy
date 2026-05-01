export type RecurringScheduleKey =
  | "update_monday"
  | "trivia_tuesday"
  | "opinion_wednesday"
  | "truth_thursday"
  | "who_was_this_friday"
  | "bible_study_saturday"
  | "prayer_request_sunday";

export type RecurringSeriesOverridePayload = {
  kind: "series";
  title: string;
  description: string | null;
  contentHtml: string;
};

export type RecurringTriviaOverridePayload = {
  kind: "trivia";
  subjectTitle: string;
  intro: string;
};

export type RecurringPollOverridePayload = {
  kind: "poll";
  question: string;
  intro: string;
  options: string[];
};

export type RecurringQuestionOverridePayload = {
  kind: "question";
  prompt: string;
  intro: string;
  commentPrompt: string;
};

export type RecurringOverridePayload =
  | RecurringSeriesOverridePayload
  | RecurringTriviaOverridePayload
  | RecurringPollOverridePayload
  | RecurringQuestionOverridePayload;

export type GroupRecurringOverrideRow = {
  schedule_key: RecurringScheduleKey;
  week_key: string;
  override_payload: RecurringOverridePayload;
  updated_at?: string | null;
};

const RECURRING_SCHEDULE_KEYS: RecurringScheduleKey[] = [
  "update_monday",
  "trivia_tuesday",
  "opinion_wednesday",
  "truth_thursday",
  "who_was_this_friday",
  "bible_study_saturday",
  "prayer_request_sunday",
];

export function isRecurringScheduleKey(value: unknown): value is RecurringScheduleKey {
  return typeof value === "string" && RECURRING_SCHEDULE_KEYS.includes(value as RecurringScheduleKey);
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeNullableString(value: unknown) {
  return typeof value === "string" ? value.trim() || null : null;
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(Boolean);
}

export function getRecurringOverrideKind(
  scheduleKey: RecurringScheduleKey,
): RecurringOverridePayload["kind"] {
  switch (scheduleKey) {
    case "trivia_tuesday":
      return "trivia";
    case "opinion_wednesday":
      return "poll";
    case "truth_thursday":
      return "question";
    default:
      return "series";
  }
}

export function normalizeRecurringOverridePayload(
  scheduleKey: RecurringScheduleKey,
  payload: unknown,
): RecurringOverridePayload | null {
  if (!payload || typeof payload !== "object") return null;

  const kind = getRecurringOverrideKind(scheduleKey);
  const source = payload as Record<string, unknown>;

  if (kind === "series") {
    const title = normalizeString(source.title);
    const contentHtml = normalizeString(source.contentHtml);
    if (!title || !contentHtml) return null;
    return {
      kind,
      title,
      description: normalizeNullableString(source.description),
      contentHtml,
    };
  }

  if (kind === "trivia") {
    const subjectTitle = normalizeString(source.subjectTitle);
    const intro = normalizeString(source.intro);
    if (!subjectTitle || !intro) return null;
    return {
      kind,
      subjectTitle,
      intro,
    };
  }

  if (kind === "poll") {
    const question = normalizeString(source.question);
    const options = normalizeStringArray(source.options);
    if (!question || options.length < 2) return null;
    return {
      kind,
      question,
      intro: normalizeString(source.intro),
      options,
    };
  }

  const prompt = normalizeString(source.prompt);
  const intro = normalizeString(source.intro);
  const commentPrompt = normalizeString(source.commentPrompt);
  if (!prompt || !intro || !commentPrompt) return null;
  return {
    kind,
    prompt,
    intro,
    commentPrompt,
  };
}
