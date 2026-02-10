export const ACTION_TYPES = [
  "book_completed",
  "chapter_completed",
  "devotional_day_completed",
  "devotional_day_started",
  "keyword_mastered",
  "note_created",
  "person_learned",
  "place_discovered",
  "reading_plan_chapter_completed",
  "trivia_question_answered",
  "trivia_started",
  "user_login",
  "user_signup",
  "chapter_notes_viewed",
] as const;

export type ActionType = (typeof ACTION_TYPES)[number];

export const ACTION_TYPE = {
  book_completed: "book_completed",
  chapter_completed: "chapter_completed",
  devotional_day_completed: "devotional_day_completed",
  devotional_day_started: "devotional_day_started",
  keyword_mastered: "keyword_mastered",
  note_created: "note_created",
  person_learned: "person_learned",
  place_discovered: "place_discovered",
  reading_plan_chapter_completed: "reading_plan_chapter_completed",
  trivia_question_answered: "trivia_question_answered",
  trivia_started: "trivia_started",
  user_login: "user_login",
  user_signup: "user_signup",
  chapter_notes_viewed: "chapter_notes_viewed",
} as const satisfies Record<ActionType, ActionType>;

export function isActionType(value: string): value is ActionType {
  return (ACTION_TYPES as readonly string[]).includes(value);
}
