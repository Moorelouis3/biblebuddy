/**
 * The four banners that rotate through blog posts, and the rule that decides
 * which one lands in which slot.
 *
 * Kept apart from components/blog/PromoSlot.tsx so the rotation can be checked
 * without a browser - scripts/verify-app-download-links.ts walks every post
 * with it to prove all four designs are actually used and that no post shows
 * the same one twice.
 *
 * 2026-11-03: these replace the five banners that sold a free account and
 * pointed at /signup. All four say "Download the Bible Buddy app" and go to
 * the App Store; the destination lives in lib/appDownload.ts.
 *
 * ADDING OR SWAPPING A BANNER: drop the file in public/promos/ and edit one
 * entry below. What a banner has to be, same as every other promo on the
 * blog: 1536 x 1024 (3:2), JPG, under about 350KB, readable at 343px wide
 * (that is a real phone, and that is most of this traffic), nothing important
 * in the outer 6% because the card clips its corners. `name` is what lands in
 * blog_promo_events - keep it short, kebab-case and stable, because renaming
 * one splits its history in the numbers.
 */

export type PromoBanner = {
  name: string;
  file: string;
  alt: string;
};

export const PROMO_BANNERS: PromoBanner[] = [
  {
    name: "app-all-features",
    file: "app-all-features.jpg",
    alt:
      "More than a blog — grow in God's Word daily with Bible Buddy. Daily streaks, "
      + "Bible trivia, daily devotionals and audio. Download the free Bible Buddy app.",
  },
  {
    name: "app-daily-habits",
    file: "app-daily-habits.jpg",
    alt:
      "Build a daily Bible habit, one day at a time. Stay encouraged with daily "
      + "streaks and devotionals. Download the free Bible Buddy app.",
  },
  {
    name: "app-bible-trivia",
    file: "app-bible-trivia.jpg",
    alt:
      "How well do you know your Bible? Explore Bible trivia and save the verses "
      + "that speak to you. Download the free Bible Buddy app.",
  },
  {
    name: "app-audio-devotionals",
    file: "app-audio-devotionals.jpg",
    alt:
      "Make room for God's Word — read, listen, reflect. Daily devotionals, audio "
      + "and notes. Download the free Bible Buddy app.",
  },
];

// Small stable hash so a given post always starts at the same point in the
// rotation. Deterministic on purpose: every reader of a post sees the same
// banner in the same slot, so promo performance per post is clean data
// instead of noise.
function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Cycles through the four in order from a per-post starting point, so a
 * reader working down one post sees a different design at each slot, and a
 * reader working through the blog does not meet the same one every time.
 */
export function pickPromoBanner(postSlug: string, slotIndex: number): PromoBanner {
  return PROMO_BANNERS[(hashString(postSlug) + slotIndex) % PROMO_BANNERS.length];
}
