/**
 * Auto Comment: deciding what kind of reply a feed post should get
 * (Louis, 2026-11-13).
 *
 * The feed is two very different things under one post type. Measured over
 * the 30 days to 13 November: 949 of 975 member posts were one-line activity
 * posts ("✅ Finished Day 204 of Bible in One Year.") and 26 were a person
 * writing something. A model adds nothing to the first kind and is the only
 * honest way to answer the second. So:
 *
 *   prepared  routine activity   -> a line chosen from lib/autoComment/prepared.ts
 *   ai        a person's words   -> one short draft from the model
 *   none      our own posts      -> no draft at all
 *
 * feed_posts carries no event type: every activity post is stored as a
 * "thought" and is only recognisable by its wording. So the shapes below are
 * the exact sentences lib/communityMilestones.ts and the three ShareToFeed
 * buttons write. scripts/verify-auto-comment.ts generates those sentences
 * from the real code and checks this file still recognises them, so a
 * reworded milestone fails a check instead of silently going to the model.
 *
 * THE RULE THAT MATTERS MOST: if a person added their own words to anything -
 * a verse they shared, a trivia score - those words are never ignored. An
 * untouched share is routine; a share with a sentence on the end is a person
 * talking.
 *
 * Pure functions, no database and no network.
 */

export type FeedPostForRouting = {
  user_id: string;
  post_type: string | null;
  content: string | null;
  verse_ref: string | null;
  verse_text: string | null;
};

export type PreparedKind =
  | "bioy_day"
  | "study_day"
  | "book_finished"
  | "trivia_share"
  | "verse_share"
  | "chapter_share"
  | "short_caption";

export type PreparedFields = {
  day?: number;
  title?: string;
  book?: string;
  chapter?: number;
  score?: number;
  total?: number;
  reference?: string;
};

export type AutoCommentDecision =
  | { route: "none"; reason: string }
  | { route: "prepared"; kind: PreparedKind; fields: PreparedFields }
  | {
      route: "ai";
      /** Prayer, grief, hardship: the draft must not celebrate. */
      careful: boolean;
      /** Exactly what the person wrote, never the verse standing in for it. */
      text: string;
      verseRef: string | null;
      verseText: string | null;
      postType: string;
    };

const clean = (value: string | null | undefined) => String(value ?? "").replace(/\s+/g, " ").trim();

// ---- the sentences the app writes on people's behalf ----

const BIOY_DAY = /^✅ Finished Day (\d+) of Bible in One Year\.$/;
const STUDY_DAY_TITLED = /^✅ Completed Day (\d+) of "(.+)"\.$/;
const STUDY_DAY_UNTITLED = /^✅ Completed Day (\d+) of a Bible study\.$/;
const BOOK_FINISHED = /^📖 Finished the book of (.+)\.$/;

// ---- the text the three Share buttons pre-fill, left untouched ----

const TRIVIA_SHARE = /^Got (\d+) out of (\d+) on (.+) (\d+) trivia\.$/;
const CHAPTER_SHARE = /^Just finished reading (.+) (\d+)\.$/;
const VERSE_SHARE = /^(.+ \d+:\d+(?:-\d+)?) is my verse today\.$/;

/**
 * Words that mean a post is about something hard, whatever its type.
 *
 * Deliberately broad. A false positive only costs a calmer draft with no
 * exclamation mark; a false negative puts "That's awesome!" under somebody's
 * diagnosis. The prayer post types are always careful regardless of wording.
 */
const HARD_THINGS =
  /\b(pray for|prayers? (for|please)|please pray|passed away|died|death|funeral|grief|grieving|mourning|cancer|diagnos|hospital|surgery|sick|illness|miscarr|divorce|separated|lost my|losing my|laid off|fired|terminated|unemployed|evicted|homeless|debt|financ|needs? to be met|addict|relapse|smok|cigarette|drinking|alcohol|tempt|gets hard|hard time|depress|anxiety|anxious|suicid|lonely|alone|abuse|struggling|struggle|hurting|heartbroken|broken|afraid|scared|overwhelmed|hopeless)/i;
// No closing word boundary on purpose: several entries are stems ("diagnos",
// "miscarr", "depress"), and with one, "diagnosis" did not match.

export function isHardTopic(text: string): boolean {
  return HARD_THINGS.test(text);
}

/** How many real words a caption has. "Bible study…" is two. */
function wordCount(text: string) {
  return (text.match(/[A-Za-z0-9’']+/g) || []).length;
}

/**
 * Decide the route for one post.
 *
 * `ownAccountIds` are the accounts that never get a draft: whoever is asking
 * (nobody comments on their own post with a prepared line) and the Bible
 * Buddy brand account, whose posts are our own scheduled content.
 */
export function routeFeedPost(post: FeedPostForRouting, ownAccountIds: readonly string[]): AutoCommentDecision {
  if (ownAccountIds.includes(post.user_id)) return { route: "none", reason: "This is one of our own posts." };

  const text = clean(post.content);
  const verseRef = clean(post.verse_ref) || null;
  const verseText = clean(post.verse_text) || null;
  const postType = clean(post.post_type) || "thought";
  const ai = (careful: boolean): AutoCommentDecision => ({ route: "ai", careful, text, verseRef, verseText, postType });

  // Prayer first, and always careful, whatever the wording looks like.
  if (postType === "prayer_request" || postType === "prayer") {
    if (!text) return { route: "none", reason: "There is nothing written to reply to." };
    return ai(true);
  }

  // Activity the app posted for them. These carry no words of the person's own.
  let match = text.match(BIOY_DAY);
  if (match) return { route: "prepared", kind: "bioy_day", fields: { day: Number(match[1]) } };
  match = text.match(STUDY_DAY_TITLED);
  if (match) return { route: "prepared", kind: "study_day", fields: { day: Number(match[1]), title: match[2] } };
  match = text.match(STUDY_DAY_UNTITLED);
  if (match) return { route: "prepared", kind: "study_day", fields: { day: Number(match[1]) } };
  match = text.match(BOOK_FINISHED);
  if (match) return { route: "prepared", kind: "book_finished", fields: { book: match[1] } };

  // A Share button's text, exactly as pre-filled. One changed character and
  // it is no longer this - it falls through to the person-wrote-it rules.
  match = text.match(TRIVIA_SHARE);
  if (match) {
    return {
      route: "prepared",
      kind: "trivia_share",
      fields: { score: Number(match[1]), total: Number(match[2]), book: match[3], chapter: Number(match[4]) },
    };
  }
  match = text.match(CHAPTER_SHARE);
  if (match) return { route: "prepared", kind: "chapter_share", fields: { book: match[1], chapter: Number(match[2]) } };
  match = text.match(VERSE_SHARE);
  if (match) return { route: "prepared", kind: "verse_share", fields: { reference: match[1] } };

  // From here on a person wrote something.
  if (isHardTopic(text)) return ai(true);

  // A verse with nothing of their own under it is still just a shared verse.
  if (!text && verseRef) return { route: "prepared", kind: "verse_share", fields: { reference: verseRef } };

  // A photo with no caption, or a two-word caption, gives a model nothing to
  // understand; a short friendly line is the honest reply.
  if (wordCount(text) < 3) {
    if (!text && !verseRef && postType !== "photo" && postType !== "video") {
      return { route: "none", reason: "There is nothing written to reply to." };
    }
    return { route: "prepared", kind: "short_caption", fields: {} };
  }

  return ai(false);
}
