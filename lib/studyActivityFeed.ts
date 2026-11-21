/**
 * Keeping one person's study check-offs from taking over the shared Feed.
 *
 * Louis, 2026-11-21: one reader's "Completed Day 9", "Completed Day 8",
 * "Completed Day 7" sat back to back on the community Feed. People can study
 * as much as they like; the shared Feed should not turn every check-off into
 * another post. Two rules, applied in two places:
 *
 * 1. Nearby completions of the same study by the same person are one card:
 *    "Completed Days 7–9 of …" (or the actual days when some were skipped).
 * 2. At most STUDY_ACTIVITY_CAP automatic cards per person in any rolling
 *    24 hours, across all studies. A grouped card counts once.
 *
 * Where:
 * - When a post is written (lib/communityMilestones.ts postMilestoneToWall):
 *   a completion close to an earlier card for the same study is merged into
 *   that card instead of becoming a new post, and past the cap nothing new is
 *   written. So new floods never reach the table.
 * - When the Feed is read (app/bb-feed/page.tsx, community and friends tabs):
 *   collapseStudyActivity runs on the fetched rows before ranking, which
 *   cleans up the runs already in the table without changing or deleting a
 *   single row. The card shown is the newest post of the run, with its own
 *   likes and comments; the older posts keep theirs and stay on the person's
 *   own wall and My Feed, which are their personal history and are not
 *   collapsed. Every completion is also in master_actions (the profile's
 *   activity log) regardless.
 *
 * Regular, person-written posts are never touched: only sentences that
 * milestoneSentence writes are recognised here.
 */

export const STUDY_ACTIVITY_CAP = 3;
export const STUDY_ACTIVITY_WINDOW_MS = 24 * 60 * 60 * 1000;
/** Completions this close together, same study, are one card. */
export const STUDY_ACTIVITY_GROUP_GAP_MS = 6 * 60 * 60 * 1000;

export type StudyActivityKind = "devotional" | "bible_year" | "book";

export type StudyCompletion = {
  kind: StudyActivityKind;
  /** The study's title, "a Bible study", "Bible in One Year", or the book. */
  title: string;
  /** Day numbers, sorted, unique. Empty for a finished book. */
  days: number[];
};

const DAY_LIST = String.raw`(\d+(?:\s*[–-]\s*\d+)?(?:\s*(?:,|and)\s*\d+(?:\s*[–-]\s*\d+)?)*)`;

const SHAPES: Array<{ re: RegExp; kind: StudyActivityKind; count?: boolean }> = [
  { re: new RegExp(String.raw`^✅ Completed Days? ${DAY_LIST} of "(.+)"\.$`), kind: "devotional" },
  { re: new RegExp(String.raw`^✅ Completed Days? ${DAY_LIST} of (a Bible study)\.$`), kind: "devotional" },
  { re: new RegExp(String.raw`^✅ Finished Days? ${DAY_LIST} of (Bible in One Year)\.$`), kind: "bible_year" },
];

function expandDays(list: string): number[] {
  const days = new Set<number>();
  for (const part of list.split(/\s*(?:,|and)\s*/)) {
    const range = part.match(/^(\d+)\s*[–-]\s*(\d+)$/);
    if (range) {
      const a = Number(range[1]);
      const b = Number(range[2]);
      for (let d = Math.min(a, b); d <= Math.max(a, b) && d - Math.min(a, b) < 400; d += 1) days.add(d);
    } else if (/^\d+$/.test(part)) {
      days.add(Number(part));
    }
  }
  return [...days].sort((x, y) => x - y);
}

/** A completion sentence read back into its parts; null for anything a person wrote. */
export function parseStudyCompletion(content: string | null | undefined): StudyCompletion | null {
  const text = String(content ?? "").trim();
  if (!text) return null;
  for (const shape of SHAPES) {
    const m = text.match(shape.re);
    if (m) return { kind: shape.kind, title: m[2], days: expandDays(m[1]) };
  }
  const book = text.match(/^📖 Finished the book of (.+)\.$/);
  if (book) return { kind: "book", title: book[1], days: [] };
  return null;
}

/** "7–9" when consecutive, "2, 5 and 9" when not (up to five), else "6 days". */
export function describeDays(days: number[]): { plural: boolean; text: string; isCount: boolean } {
  const sorted = [...new Set(days)].sort((a, b) => a - b);
  if (sorted.length <= 1) return { plural: false, text: String(sorted[0] ?? ""), isCount: false };
  const consecutive = sorted.every((d, i) => i === 0 || d === sorted[i - 1] + 1);
  if (consecutive) return { plural: true, text: `${sorted[0]}–${sorted[sorted.length - 1]}`, isCount: false };
  if (sorted.length <= 5) {
    return { plural: true, text: `${sorted.slice(0, -1).join(", ")} and ${sorted[sorted.length - 1]}`, isCount: false };
  }
  return { plural: true, text: `${sorted.length} days`, isCount: true };
}

/** The sentence for one or more completed days, in the shapes readStudyActivity reads. */
export function completionSentence(completion: StudyCompletion): string {
  if (completion.kind === "book") return `📖 Finished the book of ${completion.title}.`;
  const verb = completion.kind === "bible_year" ? "Finished" : "Completed";
  const { plural, text, isCount } = describeDays(completion.days);
  const days = isCount ? text : `${plural ? "Days" : "Day"} ${text}`;
  const title = completion.kind === "devotional" && completion.title !== "a Bible study" ? `"${completion.title}"` : completion.title;
  return `✅ ${verb} ${days} of ${title}.`;
}

/** Same study, so the two can share a card. */
export function sameStudy(a: StudyCompletion, b: StudyCompletion): boolean {
  return a.kind === b.kind && a.kind !== "book" && a.title === b.title && a.title !== "a Bible study";
}

type PostLike = { id: string; user_id: string; content?: string | null; created_at: string };

/**
 * The Feed's view of automatic study posts: runs grouped, at most
 * STUDY_ACTIVITY_CAP per person per rolling 24 hours. Returns the posts in
 * their original order, minus the folded and capped ones, with each kept
 * card's content rewritten to cover its whole run.
 */
export function collapseStudyActivity<T extends PostLike>(posts: T[]): T[] {
  type Group = { keep: T; completion: StudyCompletion; first: number; last: number };
  const hidden = new Set<string>();
  const rewritten = new Map<string, string>();

  const byUser = new Map<string, Array<{ post: T; at: number; completion: StudyCompletion }>>();
  for (const post of posts) {
    const completion = parseStudyCompletion(post.content);
    if (!completion) continue;
    const at = Date.parse(post.created_at);
    if (!Number.isFinite(at)) continue;
    const list = byUser.get(post.user_id) ?? [];
    list.push({ post, at, completion });
    byUser.set(post.user_id, list);
  }

  for (const list of byUser.values()) {
    list.sort((a, b) => a.at - b.at);
    const groups: Group[] = [];
    for (const item of list) {
      // Join the latest card for this study when it is close enough.
      const open = [...groups].reverse().find((g) => sameStudy(g.completion, item.completion));
      if (open && item.at - open.last <= STUDY_ACTIVITY_GROUP_GAP_MS) {
        hidden.add(open.keep.id);
        open.keep = item.post; // the newest post of the run carries the card
        open.completion = { ...open.completion, days: [...open.completion.days, ...item.completion.days] };
        open.last = item.at;
        continue;
      }
      // Over the cap: fold into a card for the same study inside the window,
      // otherwise leave it to personal history.
      const inWindow = groups.filter((g) => item.at - g.first < STUDY_ACTIVITY_WINDOW_MS);
      if (inWindow.length >= STUDY_ACTIVITY_CAP) {
        const same = [...inWindow].reverse().find((g) => sameStudy(g.completion, item.completion));
        if (same) {
          same.completion = { ...same.completion, days: [...same.completion.days, ...item.completion.days] };
        }
        hidden.add(item.post.id);
        continue;
      }
      groups.push({ keep: item.post, completion: item.completion, first: item.at, last: item.at });
    }
    for (const g of groups) {
      const sentence = completionSentence({ ...g.completion, days: [...new Set(g.completion.days)].sort((a, b) => a - b) });
      if (sentence !== String(g.keep.content ?? "").trim()) rewritten.set(g.keep.id, sentence);
    }
  }

  return posts
    .filter((post) => !hidden.has(post.id))
    .map((post) => (rewritten.has(post.id) ? { ...post, content: rewritten.get(post.id)! } : post));
}
