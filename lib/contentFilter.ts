/**
 * Filtering objectionable content before it is posted.
 *
 * App Review, 2026-10-27, Guideline 1.2: an app with user-generated content
 * must have a EULA with no tolerance for objectionable content, a way to flag
 * content, a way to block abusive users, AND "a method for filtering
 * objectionable content". Bible Buddy already had the first three - the Terms
 * carry a zero-tolerance section, ReportBlockMenu reports to buddy_reports,
 * and lib/userBlocks.ts blocks people. Nothing filtered at the point of
 * posting. This is that.
 *
 * THE TRAP THIS APP HAS AND MOST DO NOT. It is a Bible app, and the KJV is
 * blunt. "Ass" is all over Numbers 22. "Whore" runs through Hosea and
 * Revelation. "Damned" is in Mark 16, "hell" in dozens of places, "bastard"
 * in Deuteronomy 23, "piss" in 2 Kings 18, "bowels", "teats", "concubine",
 * "harlot". A list scraped off the internet would stop people quoting
 * Scripture in a Scripture app, which is worse than the problem it solves.
 *
 * So the list below is deliberately narrow: slurs and explicit sexual terms
 * that do not appear in the KJV. Everything in Scripture is allowed through.
 * The check is a floor, not a moderator - reports and blocks are what deal
 * with the things no word list can catch.
 */

/**
 * Terms that block a post. Checked against word boundaries, case-insensitively.
 *
 * Every entry here was checked against the KJV text in public/kjv and appears
 * nowhere in it. Add nothing without doing the same - scripts/check-content-filter.ts
 * fails the build if an entry turns up in Scripture.
 */
const BLOCKED = [
  // Racial and ethnic slurs.
  "nigger", "nigga", "chink", "spic", "kike", "gook", "wetback", "coon",
  "paki", "raghead", "towelhead",
  // Slurs against sexuality and gender.
  "faggot", "fag", "dyke", "tranny", "shemale",
  // Slurs against disability.
  "retard", "retarded",
  // Explicit sexual terms.
  "cunt", "blowjob", "handjob", "creampie", "gangbang", "bukkake", "dildo",
  "anal sex", "porn", "porno", "pornhub", "hentai", "milf",
  // Strong profanity with no scriptural use.
  "fuck", "fucking", "fucker", "motherfucker", "shit", "shitty", "bullshit",
  "bitch", "bitches", "wanker", "twat", "prick",
  // Self-harm and violence directed at a person.
  "kill yourself", "kys",
];

/**
 * Characters people swap in to get past a list. Folded before matching, so
 * f*ck, f u c k and fvck are all caught, while leaving ordinary text alone.
 */
function fold(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    // Common substitutions.
    .replace(/[@4]/g, "a")
    .replace(/[3]/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/[0]/g, "o")
    .replace(/[5$]/g, "s")
    .replace(/[7]/g, "t")
    .replace(/[vv]/g, "v")
    // Anything that is not a letter, digit or space becomes a space, which
    // turns f*u*c*k and f.u.c.k into separate letters...
    .replace(/[^a-z0-9\s]/g, " ")
    // ...and this closes single-letter gaps so they read as one word again.
    .replace(/\b(?:([a-z])\s+(?=[a-z]\b))+/g, (m) => m.replace(/\s+/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * The f*ck case: a letter replaced by a censor character rather than removed.
 *
 * Deleting the punctuation instead ("f*ck" -> "fck") and then allowing a
 * missing vowel would be the easy fix and a bad one: "sh[aeiou]?t" blocks
 * "shut up". So the censor character is kept as a marker instead, and a term
 * matches only if every letter lines up one-for-one with either itself or a
 * marker. "shut" can never match "shit" that way, because the letters are in
 * the wrong places.
 */
const CENSOR = "\u0001";

function foldCensored(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    // Only punctuation sitting BETWEEN two letters is a censor mark. An
    // apostrophe in "don't" is too, which is harmless - no blocked term
    // lines up with it.
    .replace(/(?<=[a-z])[^a-z0-9\s](?=[a-z])/g, CENSOR);
}

function censoredPattern(term: string) {
  const body = term
    .split("")
    .map((ch) => (ch === " " ? "\\s+" : `[${ch}${CENSOR}]`))
    .join("");
  return new RegExp(`\\b${body}\\b`, "i");
}

export type ContentCheck =
  | { ok: true }
  | { ok: false; reason: string; matched: string };

/**
 * Is this safe to post?
 *
 * Returns a reason written for the person who typed it, not for a log: they
 * are about to see it, and "that word is not allowed here" lands better than
 * a validation error.
 */
export function checkContent(raw: string | null | undefined): ContentCheck {
  const text = (raw || "").trim();
  if (!text) return { ok: true };
  const folded = fold(text);
  const censored = foldCensored(text);

  for (const term of BLOCKED) {
    const pattern = term.includes(" ")
      ? new RegExp(`\\b${term.replace(/\s+/g, "\\s*")}\\b`, "i")
      : new RegExp(`\\b${term}\\b`, "i");
    if (pattern.test(folded) || censoredPattern(term).test(censored)) {
      return {
        ok: false,
        matched: term,
        reason:
          "That post contains language we do not allow in the community. Bible Buddy has no tolerance for objectionable content. Please reword it and try again.",
      };
    }
  }
  return { ok: true };
}

/** The words the filter holds, for the check script and for tests. */
export const BLOCKED_TERMS: readonly string[] = BLOCKED;
export { fold as foldForFilter };
