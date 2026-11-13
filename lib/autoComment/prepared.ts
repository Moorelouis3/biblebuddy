/**
 * Auto Comment: the prepared encouragement, and how one is chosen
 * (Louis, 2026-11-13).
 *
 * For routine activity posts only - see lib/autoComment/router.ts for what
 * counts. No model is involved: a line is picked from the pool for that kind
 * of post, filled in from what the post itself says (the day, the study, the
 * score), and steered away from anything Louis has said recently.
 *
 * What these lines may and may not do:
 *
 *  - They never use a name. A display name can be "Bible Buddy User", a
 *    handle or an email prefix, and "Great job, Bible Buddy User!" is worse
 *    than no name at all.
 *  - They never claim an experience ("I loved that chapter too").
 *  - They match the result. Three out of five on trivia is not "Perfect!".
 *  - They are short, because they sit under a one-line post.
 *
 * Every line is a draft Louis reads before pressing Post, so this file is the
 * starting wording, not the final word. Add lines freely; the picker only
 * needs each pool to stay comfortably larger than the "recently used" window.
 */

import type { PreparedFields, PreparedKind } from "./router";

type Line = string | ((fields: PreparedFields) => string);

const bioyFirst: Line[] = [
  "Day 1 done. That is the hardest one. Keep going!",
  "Great start. See you on Day 2.",
  "Day 1 in the books. One day at a time.",
  "And it begins. Glad you are in this.",
];

const bioyGeneral: Line[] = [
  (f) => `Day ${f.day} done. Keep going!`,
  (f) => `Day ${f.day}. One day at a time adds up.`,
  "That's awesome. Keep it up!",
  "Great job staying with it.",
  (f) => `Day ${f.day} in the books. Well done.`,
  "Love seeing this. Keep going!",
  "Another day in the Word. Well done.",
  // "Real consistency" on Day 3 is overdoing it; it is earned after a week.
  (f) => ((f.day ?? 0) >= 7 ? `${f.day} days in. That is real consistency.` : `Day ${f.day} done. Glad you are in this.`),
  "Showing up again. That is how it gets read.",
  "Good work today.",
  (f) => `Day ${f.day} ✅ Keep it moving.`,
  "Steady. This is how a whole Bible gets read.",
];

const bioyRound: Line[] = [
  (f) => `Day ${f.day}! That is a real milestone. Well done.`,
  (f) => `${f.day} days. Most people never get this far. Keep going!`,
  (f) => `Day ${f.day} is a big one. Proud of this.`,
  (f) => `${f.day} days of showing up. That's awesome.`,
];

const bioyFinished: Line[] = [
  "The whole Bible in a year. That is a huge thing to finish. Well done!",
  "Day 365. You read the entire Bible. Congratulations!",
  "All 365 days. That is something to be proud of.",
];

const studyFirst: Line[] = [
  (f) => (f.title ? `Great start on ${f.title}. See you on Day 2.` : "Great start. See you on Day 2."),
  "Day 1 done. Glad you are studying with us.",
  (f) => (f.title ? `Welcome to ${f.title}. Good first day.` : "Good first day. Keep going!"),
  "And you are off. One day at a time.",
];

const studyGeneral: Line[] = [
  (f) => `Day ${f.day} done. Keep going!`,
  (f) => (f.title ? `Day ${f.day} of ${f.title}. Well done.` : `Day ${f.day}. Well done.`),
  "Great job staying with it.",
  "That's awesome. Keep it up!",
  "Love seeing this.",
  (f) => `Day ${f.day} ✅ Nice work.`,
  "Another day of the study done. Good work.",
  (f) => (f.title ? `Enjoying ${f.title} with you. Keep going!` : "Keep going!"),
  "Showing up again. That is how it sticks.",
  "Good work today.",
  (f) => `Day ${f.day} in the books.`,
  "Steady progress. Well done.",
];

const bookFinished: Line[] = [
  (f) => `The whole book of ${f.book}. That is worth celebrating. Well done!`,
  (f) => `${f.book}, finished. Great job!`,
  (f) => `You read all of ${f.book}. That's awesome.`,
  (f) => `${f.book} done. Which book is next?`,
  (f) => `Finishing ${f.book} is no small thing. Well done.`,
  (f) => `All of ${f.book}. Love seeing this.`,
];

const triviaPerfect: Line[] = [
  (f) => `${f.score} for ${f.total}. ${f.book} ${f.chapter} is sticking.`,
  "A perfect score. Well done!",
  (f) => `${f.score} out of ${f.total}! You know ${f.book} ${f.chapter}.`,
  "Clean sweep. Great job!",
  (f) => `All ${f.total} right on ${f.book} ${f.chapter}. That's awesome.`,
  "Perfect round. You were paying attention.",
];

const triviaGood: Line[] = [
  (f) => `${f.score} out of ${f.total}. Solid work on ${f.book} ${f.chapter}.`,
  "Nice score. Well done!",
  (f) => `${f.score} of ${f.total} on ${f.book} ${f.chapter}. Good going.`,
  "Strong round. Keep it up!",
  (f) => `Good work on ${f.book} ${f.chapter}.`,
  "That is a good score. The chapter is sticking.",
];

// A low score gets credit for playing, never a cheer for the number.
const triviaLow: Line[] = [
  (f) => `Good on you for testing yourself on ${f.book} ${f.chapter}.`,
  (f) => `${f.book} ${f.chapter} rewards a second read. Glad you tried it.`,
  "Thanks for sharing this. Every round teaches something.",
  "Taking the quiz is the part that counts. Keep going!",
  (f) => `That chapter is a tough one. Worth another look at ${f.book} ${f.chapter}.`,
];

const verseShare: Line[] = [
  "A good one to carry through the day.",
  (f) => `${f.reference}. Thanks for sharing this one.`,
  "Good verse to sit with today.",
  "Needed this one. Thanks for sharing.",
  (f) => `${f.reference} is a good one to hold on to.`,
  "Love this verse.",
  "A good word for today.",
  "Thanks for putting this on the feed.",
];

const chapterShare: Line[] = [
  (f) => `${f.book} ${f.chapter} done. Keep going!`,
  (f) => `Nice. ${f.book} ${f.chapter} is a good one.`,
  "Another chapter read. Well done.",
  (f) => `On to ${f.book} ${(f.chapter ?? 0) + 1}?`,
  "Great job staying in the Word.",
  (f) => `${f.book} ${f.chapter} ✅ Good work.`,
  "Love seeing this. Keep reading!",
];

const shortCaption: Line[] = [
  "Love this.",
  "Love seeing this!",
  "Thanks for sharing this.",
  "This is great.",
  "Good to see you here.",
  "Glad you posted this.",
];

/** The pool for one post, chosen from what the post says. */
export function poolFor(kind: PreparedKind, fields: PreparedFields): Line[] {
  switch (kind) {
    case "bioy_day": {
      const day = fields.day ?? 0;
      if (day === 1) return bioyFirst;
      if (day >= 365) return bioyFinished;
      if (day > 0 && day % 50 === 0) return bioyRound;
      return bioyGeneral;
    }
    case "study_day":
      return fields.day === 1 ? studyFirst : studyGeneral;
    case "book_finished":
      return bookFinished;
    case "trivia_share": {
      const score = fields.score ?? 0;
      const total = fields.total ?? 0;
      if (total > 0 && score === total) return triviaPerfect;
      if (total > 0 && score / total >= 0.6) return triviaGood;
      return triviaLow;
    }
    case "verse_share":
      return verseShare;
    case "chapter_share":
      return chapterShare;
    case "short_caption":
      return shortCaption;
  }
}

const render = (line: Line, fields: PreparedFields) => (typeof line === "function" ? line(fields) : line);

/** Compared loosely, so "Keep going!" and "keep going" count as the same line. */
export const normaliseLine = (text: string) => text.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();

function hash(text: string) {
  let value = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    value ^= text.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

/**
 * Pick one line.
 *
 * `seed` is the post id, so the same post always starts from the same place
 * in the pool - pressing the button twice does not reshuffle for no reason.
 * `avoid` is what Louis has said lately (his last comments anywhere, and
 * anything already under this person's posts). Starting from the seeded
 * position, the first line not in `avoid` wins. If every line has been used
 * recently the seeded one is returned anyway: a repeat is better than no
 * draft, and he reads it before posting.
 *
 * `turn` moves the starting point on, for "give me another one".
 */
export function pickPrepared(
  kind: PreparedKind,
  fields: PreparedFields,
  options: { seed: string; avoid?: readonly string[]; turn?: number },
): string {
  const pool = poolFor(kind, fields).map((line) => render(line, fields));
  const avoid = new Set((options.avoid || []).map(normaliseLine));
  const start = (hash(options.seed) + (options.turn || 0)) % pool.length;
  for (let offset = 0; offset < pool.length; offset += 1) {
    const candidate = pool[(start + offset) % pool.length];
    if (!avoid.has(normaliseLine(candidate))) return candidate;
  }
  return pool[start];
}
