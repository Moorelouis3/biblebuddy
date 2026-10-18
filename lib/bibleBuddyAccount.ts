/**
 * The account Bible Buddy itself posts from.
 *
 * Every automatic post - the daily reading, the weekly trivia, the poll, the
 * question, the Friday piece, the blog post - carried Louis's personal
 * user_id until 2026-10-18, so all of it appeared under his name and his
 * face. On a wall where he had started 107 of the last 108 threads, a good
 * part of that was not him at all; it was the app wearing his name.
 *
 * Louis: "it needs to come from Bible Buddy, not me - do we need a burner
 * account?" Not a burner: a brand account, bible-buddy@mybiblebuddy.net on
 * his own domain, created that day. It has no password anybody holds and
 * never signs in; it exists to own these posts, so readers can tell the app
 * apart from the person.
 *
 * Overridable by env so a staging database with its own row does not post as
 * an id that means nothing there.
 */
export const BIBLE_BUDDY_USER_ID =
  process.env.BIBLE_BUDDY_USER_ID || "26504917-b8da-4f47-a200-7e78e5a75982";

/** What that account is called on screen. */
export const BIBLE_BUDDY_DISPLAY_NAME = "Bible Buddy";
