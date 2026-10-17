/**
 * How an automatic feed item reads as a sentence.
 *
 * Lifted out of app/bb-feed/page.tsx on 2026-10-17, when the profile became
 * somebody's wall and needed to render the same items. Two copies of these
 * sentences would drift, and the drift would be invisible - the same event
 * described one way on the feed and another on the profile.
 *
 * Every string completes "<name> ...", so they all start with a verb.
 */

export type ActivityData = Record<string, string | number | null>;

export const ACTIVITY_LABELS: Record<string, (data: ActivityData) => string> = {
  devotional_day_completed: (d) => `completed Bible Study task ${d.day_number} of "${d.title}"`,
  study_group_joined: (d) => `joined the group "${d.group_name}"`,
  buddy_added: (d) => `became Buddies with ${d.buddy_name || "someone"}`,
  verse_shared: (d) => `shared ${d.verse_ref || "a verse"}`,
  post_created: () => `posted something new`,
  prayer_shared: () => `shared a prayer`,
  // The automatic ones (2026-10-17). Without a line here the feed falls back to
  // the raw type with the underscores swapped out - "bible in one year day
  // completed" - which reads like a database column, because it is one.
  bible_in_one_year_day_completed: (d) =>
    d.day_number ? `finished Day ${d.day_number} of Bible in One Year` : `read today's Bible in One Year`,
  book_completed: (d) => (d.book ? `finished the book of ${d.book}` : `finished a book of the Bible`),
};

export function activityLabel(type: string, data: ActivityData): string {
  const fn = ACTIVITY_LABELS[type];
  return fn ? fn(data) : type.replace(/_/g, " ");
}
