/**
 * Turning what somebody typed into something two rules can agree on.
 *
 * The job is to let "Amen!!", "amen 🙏" and "Amen." be one thing, without
 * letting "I am not sure I agree" quietly become "I agree". So: case, spacing,
 * punctuation and emoji go; words do not.
 */

/**
 * Emoji, pictographs, variation selectors and zero-width joiners.
 *
 * Stripping these is what makes `isEmojiOnly` possible, and it is also why a
 * comment that is only a thumbs up normalises to the empty string.
 */
const EMOJI = /[\p{Extended_Pictographic}\p{Emoji_Component}‍️☀-➿]/gu;

/** Curly quotes in, straight quotes out, so "God's" matches "God's". */
function straightenQuotes(text: string) {
  return text.replace(/[‘’ʼ]/g, "'").replace(/[“”]/g, '"');
}

/**
 * A few spellings that turn up constantly and mean the same thing. Deliberately
 * tiny: this is not a spell checker, and a wrong expansion here would send a
 * comment to the wrong category.
 */
const VARIANTS: Array<[RegExp, string]> = [
  [/\bu\b/g, "you"],
  [/\bur\b/g, "your"],
  [/\bpls\b|\bplz\b/g, "please"],
  [/\bthx\b|\bty\b/g, "thanks"],
  [/\bgm\b/g, "good morning"],
  [/\bamen+\b/g, "amen"], // "ameeen"
  [/\bgod'?s\b/g, "gods"],
];

/** Lowercase, no emoji, no punctuation, single spaces. */
export function normalise(text: string): string {
  let t = straightenQuotes(String(text || "")).toLowerCase();
  t = t.replace(EMOJI, " ");
  // Keep apostrophes while stripping other punctuation, then drop the
  // apostrophes too - "dont" and "don't" should match.
  t = t.replace(/[^\p{L}\p{N}\s']/gu, " ").replace(/'/g, "");
  t = t.replace(/\s+/g, " ").trim();
  for (const [re, to] of VARIANTS) t = t.replace(re, to);
  return t.replace(/\s+/g, " ").trim();
}

/** What gets stored so repeats group together, and what rules are tested against. */
export function fingerprint(text: string): string {
  return normalise(text);
}

export function wordCount(text: string): number {
  const n = normalise(text);
  return n ? n.split(" ").length : 0;
}

/** True when there was nothing but emoji, punctuation or whitespace. */
export function isEmojiOnly(text: string): boolean {
  return String(text || "").trim().length > 0 && normalise(text).length === 0;
}
