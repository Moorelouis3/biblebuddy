/**
 * Bible Buddy's first birthday (went live November 2025).
 *
 * ONE date window for everything that celebrates it: the party hat on the
 * header wordmark (components/AppShell.tsx) and the "Bible Buddy turns 1!"
 * popup (lib/popups/catalog.ts, bible_buddy_birthday_2026). Both read these
 * two constants, so they can never start or stop on different days.
 *
 * Europe/Berlin, as Louis asked: from the first moment of 21 November 2026
 * until midnight as 1 December begins. Both dates are in winter time (CET,
 * UTC+1), so Berlin midnight is 23:00 UTC the day before.
 *
 * Temporary. After 1 December nothing here shows; the code can be deleted
 * any time after that without anything else changing.
 */

/** 21 Nov 2026 00:00 Europe/Berlin. */
export const BIRTHDAY_STARTS_AT = "2026-11-20T23:00:00.000Z";
/** 1 Dec 2026 00:00 Europe/Berlin: the first moment it is over. */
export const BIRTHDAY_ENDS_AT = "2026-11-30T23:00:00.000Z";

export const BIRTHDAY_HEADLINE = "Bible Buddy turns 1! 🎉";
export const BIRTHDAY_MESSAGE =
  "We launched Bible Buddy last November, and today we’re celebrating one year of studying the Bible together. Thank you for reading, studying, and growing with us.";
/** For anywhere the promo has to fit in one sentence. */
export const BIRTHDAY_SHORT_LINE = "Bible Buddy turns 1! Thanks for spending this first year in God’s Word with us.";

export const BIRTHDAY_HAT_SRC = "/brand/birthday-hat.png";

/** True from the start instant up to, but not including, the end instant. */
export function isBirthdayWindow(now: Date = new Date()): boolean {
  const t = now.getTime();
  return t >= Date.parse(BIRTHDAY_STARTS_AT) && t < Date.parse(BIRTHDAY_ENDS_AT);
}

/**
 * Milliseconds until the window next opens or closes, or null when both are
 * behind us. Lets an open tab switch at the boundary without polling.
 */
export function msUntilBirthdayChange(now: Date = new Date()): number | null {
  const t = now.getTime();
  const start = Date.parse(BIRTHDAY_STARTS_AT);
  const end = Date.parse(BIRTHDAY_ENDS_AT);
  if (t < start) return start - t;
  if (t < end) return end - t;
  return null;
}
