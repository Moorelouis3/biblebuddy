/**
 * Which six books go on the dashboard shelf, and in what order
 * (Louis, 2026-11-15: "a dynamic, personalized system").
 *
 * A plain function, on purpose. It is handed everything it needs - the
 * studies, this person's progress, which study the group is doing and which
 * one is coming - and it returns the row with a reason for every seat. No
 * network, no clock of its own, no randomness: the same person sees the same
 * shelf every time they open the app until something about them changes. That
 * is also what lets scripts/verify-bookshelf.ts walk every case without a
 * browser.
 *
 * Nothing here names a study. "The Obedience of Abraham" is on the shelf
 * because lib/communityEvents.ts says it is the next study to start, and the
 * day it starts it moves to the second seat because the same file then says
 * it is live. The next one after it needs a line in that file and nothing
 * here.
 *
 * THE ORDER
 *   1. The next community study that has not started (sign up).
 *   2. The community study the group is doing now.
 *   3. The study this person read most recently and has not finished.
 *   4-6. Their other unfinished studies, newest first; then studies they have
 *        finished; then recommendations.
 *
 * A seat with nothing to put in it is not left empty: the next thing in the
 * order moves up. No book is ever on the shelf twice, so the group's study is
 * never also somebody's "currently reading".
 *
 * RECOMMENDATIONS are a small scoring table, not a model, and use only what
 * the app already knows:
 *   +5  it is the study this person set as their plan
 *   +3  each other study of the same kind (category) they started or finished
 *       (counted at most twice)
 *   +2  each Bible book they read lately that this kind of study is about
 *       (counted at most three times)
 *   +1  it is short, and they have finished two short ones
 *   +1  it is Bible in One Year and they have no history at all
 * Ties go to the Library's own order, so the result never shuffles.
 */

export type ShelfRole =
  /** The next community study, not started yet. */
  | "upcoming"
  /** The community study running now. */
  | "live"
  /** What this person read most recently and has not finished. */
  | "current"
  /** Another study they are part-way through. */
  | "in_progress"
  /** One they finished. */
  | "completed"
  /** The study they set as their plan, when they have not read it yet. */
  | "chosen"
  /** Picked for them. */
  | "recommended";

export type ShelfCandidate = {
  key: string;
  title: string;
  /** devotionals.category: "genesis-series" | "new-testament" | "wisdom" | null. */
  category: string | null;
  totalDays: number;
  /** The Library's order; lower comes first. */
  sortOrder: number;
  /** At least one day finished. */
  started: boolean;
  isComplete: boolean;
  /** The last day they finished anything in it, or null when unknown. */
  lastActivityAt: string | null;
  /** Not out yet, and not a community study with a sign-up page. */
  comingSoon: boolean;
};

export type ShelfInput = {
  candidates: ShelfCandidate[];
  /** Key of the next community study to start, if there is one on the list. */
  upcomingKey: string | null;
  /** Key of the community study running now. */
  liveKey: string | null;
  /** The study this person set as their plan. */
  chosenKey: string | null;
  /** Bible books they finished chapters of lately, lower case, newest first. */
  recentBooks: string[];
  max?: number;
};

export type ShelfSlot = { key: string; role: ShelfRole; reason: string; score: number };

export const SHELF_SEATS = 6;
export const BIBLE_YEAR_KEY = "bible-in-one-year";
const SHORT_STUDY_DAYS = 21;

/** Which Bible books a kind of study is about. */
export const CATEGORY_BOOKS: Record<string, string[]> = {
  "genesis-series": ["genesis"],
  wisdom: ["proverbs", "psalms", "ecclesiastes", "job", "song of solomon"],
  "new-testament": ["matthew", "mark", "luke", "john", "acts"],
};

const BOOK_LABEL = (book: string) => book.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

/** Newest first; a study with no date goes after one that has it. */
function byRecency(chosenKey: string | null) {
  return (a: ShelfCandidate, b: ShelfCandidate) => {
    const left = a.lastActivityAt || "";
    const right = b.lastActivityAt || "";
    if (left !== right) return right.localeCompare(left);
    if ((a.key === chosenKey) !== (b.key === chosenKey)) return a.key === chosenKey ? -1 : 1;
    return a.sortOrder - b.sortOrder || a.title.localeCompare(b.title);
  };
}

/** The score for a study this person has not started, and the reason to show with it. */
export function scoreRecommendation(candidate: ShelfCandidate, input: ShelfInput): { score: number; reason: string } {
  const others = input.candidates.filter((item) => item.key !== candidate.key && (item.started || item.isComplete));
  const reasons: [number, string][] = [];

  if (candidate.key === input.chosenKey) reasons.push([5, "The study you chose"]);

  const sameKind = candidate.category ? others.filter((item) => item.category === candidate.category) : [];
  if (sameKind.length) reasons.push([3 * Math.min(2, sameKind.length), `More like ${sameKind[0].title}`]);

  const about = candidate.category ? CATEGORY_BOOKS[candidate.category] || [] : [];
  const readLately = Array.from(new Set(input.recentBooks.filter((book) => about.includes(book))));
  if (readLately.length) reasons.push([2 * Math.min(3, readLately.length), `Because you read ${BOOK_LABEL(readLately[0])}`]);

  const shortOnesFinished = others.filter((item) => item.isComplete && item.totalDays <= SHORT_STUDY_DAYS).length;
  if (candidate.totalDays <= SHORT_STUDY_DAYS && shortOnesFinished >= 2) reasons.push([1, "A short study, like the ones you finished"]);

  if (candidate.key === BIBLE_YEAR_KEY && !others.length && !input.recentBooks.length) reasons.push([1, "A good place to start"]);

  const score = reasons.reduce((sum, [points]) => sum + points, 0);
  const strongest = reasons.sort((a, b) => b[0] - a[0])[0];
  return { score, reason: strongest ? strongest[1] : "Start this study" };
}

export function selectShelf(input: ShelfInput): ShelfSlot[] {
  const max = input.max ?? SHELF_SEATS;
  const slots: ShelfSlot[] = [];
  const used = new Set<string>();
  const find = (key: string | null) => (key ? input.candidates.find((item) => item.key === key) : undefined);
  const seat = (candidate: ShelfCandidate | undefined, role: ShelfRole, reason: string, score = 0) => {
    if (!candidate || used.has(candidate.key) || slots.length >= max) return;
    used.add(candidate.key);
    slots.push({ key: candidate.key, role, reason, score });
  };

  // 1 and 2: the group's studies. Whoever is looking, these lead.
  seat(find(input.upcomingKey), "upcoming", "The next community study");
  seat(find(input.liveKey), "live", "The study the group is doing now");

  // 3: what they were reading.
  const unfinished = input.candidates
    .filter((item) => item.started && !item.isComplete && !used.has(item.key))
    .sort(byRecency(input.chosenKey));
  if (unfinished.length) {
    seat(unfinished[0], "current", "What you read most recently");
  } else {
    // Nothing part-read: the study they chose still gets the seat. Choosing
    // it is the statement of intent, and it should not be sixth.
    const chosen = find(input.chosenKey);
    if (chosen && !chosen.isComplete && !chosen.comingSoon) seat(chosen, "chosen", "The study you chose");
  }

  // 4-6: the rest of what is theirs...
  for (const item of unfinished.slice(1)) seat(item, "in_progress", "You started this one");

  const finished = input.candidates.filter((item) => item.isComplete && !used.has(item.key)).sort(byRecency(input.chosenKey));
  for (const item of finished) seat(item, "completed", "You finished this one");

  // ...then what we would point them at.
  const fresh = input.candidates
    .filter((item) => !used.has(item.key) && !item.started && !item.isComplete)
    .map((item) => ({ item, ...scoreRecommendation(item, input) }))
    .sort(
      (a, b) =>
        // Something they cannot open yet goes after everything they can.
        Number(a.item.comingSoon) - Number(b.item.comingSoon) ||
        b.score - a.score ||
        a.item.sortOrder - b.item.sortOrder ||
        a.item.title.localeCompare(b.item.title),
    );
  for (const { item, score, reason } of fresh) seat(item, "recommended", item.comingSoon ? "Coming soon" : reason, score);

  return slots;
}
