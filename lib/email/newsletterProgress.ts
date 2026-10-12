import type { SupabaseClient } from "@supabase/supabase-js";
import { getBookTotalChapters } from "@/lib/bibleBookChapters";

/**
 * The personalised progress block in the newsletter (Louis, 2026-10-12).
 *
 * This file works out WHAT is true for each recipient. progressSection.ts turns
 * that into the words. The split matters because the numbers are checkable and
 * the wording is not.
 *
 * WHY SO CAREFUL ABOUT WHICH TABLE: master_actions is NOT usable for counting
 * chapters. Its chapter_completed event is written once per chapter ever, behind
 * a guard that used to prefix-match ("Genesis 1" matched "Genesis 16"), so it
 * holds roughly 27% of the real completions - 424 against 1,563 in the week this
 * was built. completed_chapters is the table the app actually writes on every
 * completion and is the only source used here.
 *
 * WHAT "chapters covered" MEANS, honestly: finishing one Bible-in-One-Year day
 * marks every chapter that day covers, so a single sitting can add three or
 * four rows. The copy says "covered", never "read", for that reason.
 *
 * WHO GETS A NUMBER: almost nobody, and that is the expected state. 39 of 5,221
 * subscribers had any chapter or devotional activity in the week this was
 * written. The invitation variant is the normal output, not the error case.
 */

/** Chunk size for `.in()` lookups. 400 blows the PostgREST URL limit; 250 is what the rest of the codebase uses. */
const LOOKUP_CHUNK = 250;

const BIBLE_YEAR_TOTAL_DAYS = 365;
const SITE_URL = "https://www.mybiblebuddy.net";

export type ProgressWindow = {
  /** Inclusive lower bound. */
  startIso: string;
  /** Exclusive upper bound. */
  endIso: string;
};

export type StudyPosition = {
  kind: "devotional" | "bible_year";
  title: string;
  /** Days actually recorded complete. Never a "current day" the reader merely selected. */
  daysCompleted: number;
  totalDays: number;
  /** Lowest day not yet completed, or null when every day is done. */
  nextDay: number | null;
  finished: boolean;
  /** Present for devotionals only; used to build the continue link. */
  devotionalId?: string;
};

export type RecipientProgress = {
  email: string;
  firstName: string | null;
  userId: string | null;
  /** Completions inside the reporting window. Counted from completed_chapters. */
  chaptersThisWeek: number;
  /** Most recent completion in the window, used for the "keep reading" link. */
  lastChapter: { book: string; chapter: number } | null;
  study: StudyPosition | null;
  variant: "weekly" | "study" | "invitation";
};

/**
 * The reporting week, stated once so every recipient is measured against the
 * same seven days.
 *
 * A send to 5,000 people runs in 250-at-a-time batches across many cron
 * invocations and takes hours, sometimes spanning a day boundary. Deriving the
 * window from now() inside each batch would quietly give later recipients a
 * different week from earlier ones, so it is anchored to a timestamp that does
 * not move once the campaign starts: started_at, falling back to created_at.
 */
export function resolveProgressWindow(
  campaign: { started_at?: string | null; created_at?: string | null },
  overrideEndIso?: string,
): ProgressWindow {
  const end = new Date(overrideEndIso || campaign.started_at || campaign.created_at || new Date().toISOString());
  const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
  return { startIso: start.toISOString(), endIso: end.toISOString() };
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

/**
 * Lowest day from 1..total that is not recorded complete.
 *
 * Deliberately not "highest completed + 1": a reader who did days 1, 2, 3 and 7
 * has not done 4, and sending them to day 8 would skip past work they never did.
 * Returns null when the study is finished.
 */
function firstIncompleteDay(completed: Set<number>, total: number): number | null {
  for (let day = 1; day <= total; day += 1) {
    if (!completed.has(day)) return day;
  }
  return null;
}

/** Where a reader continues. Finished studies send them to pick a new one rather than nowhere. */
export function continueHref(progress: RecipientProgress): string {
  const study = progress.study;

  if (study) {
    if (study.finished) return `${SITE_URL}/devotionals`;
    if (study.kind === "bible_year") return `${SITE_URL}/reading-plans/bible-in-one-year`;
    return `${SITE_URL}/devotionals/${study.devotionalId}/day/${study.nextDay}`;
  }

  // Chapters but no study: continue in the book they were last in. The next
  // chapter is only offered when that chapter genuinely exists in the book -
  // otherwise the reader goes to the Bible reader rather than to a 404.
  if (progress.lastChapter) {
    const { book, chapter } = progress.lastChapter;
    const total = getBookTotalChapters(book);
    const target = total && chapter < total ? chapter + 1 : chapter;
    return `${SITE_URL}/Bible/${encodeURIComponent(book)}/${target}`;
  }

  return `${SITE_URL}/devotionals/wisdom-of-proverbs`;
}

export type BatchRecipient = { email: string; first_name: string | null; user_id?: string | null };

/**
 * Everything the section needs for one batch, in a handful of queries.
 *
 * Measured against production: 1.8s for 1,000 recipients (three windowed
 * lookups chunked at 250), against a default batch of 250 per cron run. The
 * cost is flat per batch rather than per recipient, which is the whole point -
 * a per-person query would be 5,000 round trips.
 */
export async function fetchProgressForBatch(
  db: SupabaseClient,
  recipients: BatchRecipient[],
  window: ProgressWindow,
): Promise<Map<string, RecipientProgress>> {
  const byEmail = new Map<string, RecipientProgress>();
  for (const r of recipients) {
    byEmail.set(r.email.toLowerCase(), {
      email: r.email,
      firstName: (r.first_name ?? "").trim() || null,
      userId: null,
      chaptersThisWeek: 0,
      lastChapter: null,
      study: null,
      variant: "invitation",
    });
  }

  const emails = recipients.map((r) => r.email.toLowerCase());
  if (!emails.length) return byEmail;

  // 1. Subscriber -> account. email_engagement already does this join against
  //    auth.users (NOT user_signups, which accounts for a fraction of accounts).
  //    user_id is null for an address with no account: 172 of 5,221 today.
  const emailToUser = new Map<string, string>();
  for (const part of chunk(emails, LOOKUP_CHUNK)) {
    const { data, error } = await db.from("email_engagement").select("email, user_id").in("email", part);
    if (error) throw new Error(`email_engagement: ${error.message}`);
    for (const row of data ?? []) {
      if (row.user_id) emailToUser.set(String(row.email).toLowerCase(), row.user_id);
    }
  }
  for (const [email, progress] of byEmail) progress.userId = emailToUser.get(email) ?? null;

  const userIds = [...new Set([...emailToUser.values()])];
  if (!userIds.length) return byEmail;

  // 2. Chapters completed inside the window.
  const chapterRows: Array<{ user_id: string; book: string; chapter: number; completed_at: string }> = [];
  for (const part of chunk(userIds, LOOKUP_CHUNK)) {
    const { data, error } = await db
      .from("completed_chapters")
      .select("user_id, book, chapter, completed_at")
      .gte("completed_at", window.startIso)
      .lt("completed_at", window.endIso)
      .in("user_id", part);
    if (error) throw new Error(`completed_chapters: ${error.message}`);
    chapterRows.push(...((data ?? []) as typeof chapterRows));
  }

  const chaptersByUser = new Map<string, { count: number; last: { book: string; chapter: number; at: string } | null }>();
  for (const row of chapterRows) {
    const entry = chaptersByUser.get(row.user_id) ?? { count: 0, last: null };
    entry.count += 1;
    if (!entry.last || row.completed_at > entry.last.at) {
      entry.last = { book: row.book, chapter: row.chapter, at: row.completed_at };
    }
    chaptersByUser.set(row.user_id, entry);
  }

  // 3. Devotional days completed - all of them, not just this week. Position is
  //    "where you are in the study", which is a lifetime fact.
  const devRows: Array<{ user_id: string; devotional_id: string; day_number: number; completed_at: string | null }> = [];
  for (const part of chunk(userIds, LOOKUP_CHUNK)) {
    const { data, error } = await db
      .from("devotional_progress")
      .select("user_id, devotional_id, day_number, completed_at")
      .eq("is_completed", true)
      .in("user_id", part);
    if (error) throw new Error(`devotional_progress: ${error.message}`);
    devRows.push(...((data ?? []) as typeof devRows));
  }

  // 4. Bible in One Year days.
  const byRows: Array<{ user_id: string; day_number: number; reading_completed: boolean | null; updated_at: string | null }> = [];
  for (const part of chunk(userIds, LOOKUP_CHUNK)) {
    const { data, error } = await db
      .from("bible_year_day_progress")
      .select("user_id, day_number, reading_completed, updated_at")
      .in("user_id", part);
    if (error) throw new Error(`bible_year_day_progress: ${error.message}`);
    byRows.push(...((data ?? []) as typeof byRows));
  }

  // 5. Devotional titles and lengths (24 rows; fetched whole).
  const { data: devotionals, error: devErr } = await db.from("devotionals").select("id, title, total_days");
  if (devErr) throw new Error(`devotionals: ${devErr.message}`);
  const devMeta = new Map((devotionals ?? []).map((d: any) => [d.id, { title: d.title as string, totalDays: Number(d.total_days) || 0 }]));

  // Fold per user.
  const devByUser = new Map<string, Map<string, { days: Set<number>; latest: string }>>();
  for (const row of devRows) {
    const perUser = devByUser.get(row.user_id) ?? new Map();
    const entry = perUser.get(row.devotional_id) ?? { days: new Set<number>(), latest: "" };
    entry.days.add(row.day_number);
    if (row.completed_at && row.completed_at > entry.latest) entry.latest = row.completed_at;
    perUser.set(row.devotional_id, entry);
    devByUser.set(row.user_id, perUser);
  }

  const byUser = new Map<string, { days: Set<number>; latest: string }>();
  for (const row of byRows) {
    if (!row.reading_completed) continue;
    const entry = byUser.get(row.user_id) ?? { days: new Set<number>(), latest: "" };
    entry.days.add(row.day_number);
    if (row.updated_at && row.updated_at > entry.latest) entry.latest = row.updated_at;
    byUser.set(row.user_id, entry);
  }

  for (const progress of byEmail.values()) {
    if (!progress.userId) continue;
    const userId = progress.userId;

    const chapters = chaptersByUser.get(userId);
    progress.chaptersThisWeek = chapters?.count ?? 0;
    progress.lastChapter = chapters?.last ? { book: chapters.last.book, chapter: chapters.last.chapter } : null;

    // Pick the study with the most recent recorded completion. A devotional the
    // reader merely opened does not appear here at all, which is intended: the
    // selected day in profile_stats is not evidence that anything was finished.
    let best: (StudyPosition & { latest: string }) | null = null;

    for (const [devotionalId, entry] of devByUser.get(userId) ?? []) {
      const meta = devMeta.get(devotionalId);
      if (!meta || !meta.totalDays) continue;
      const nextDay = firstIncompleteDay(entry.days, meta.totalDays);
      const candidate = {
        kind: "devotional" as const,
        title: meta.title,
        daysCompleted: entry.days.size,
        totalDays: meta.totalDays,
        nextDay,
        finished: nextDay === null,
        devotionalId,
        latest: entry.latest,
      };
      if (!best || candidate.latest > best.latest) best = candidate;
    }

    const yearEntry = byUser.get(userId);
    if (yearEntry) {
      const nextDay = firstIncompleteDay(yearEntry.days, BIBLE_YEAR_TOTAL_DAYS);
      const candidate = {
        kind: "bible_year" as const,
        title: "the Bible in One Year",
        daysCompleted: yearEntry.days.size,
        totalDays: BIBLE_YEAR_TOTAL_DAYS,
        nextDay,
        finished: nextDay === null,
        latest: yearEntry.latest,
      };
      if (!best || candidate.latest > best.latest) best = candidate;
    }

    if (best) {
      const { latest, ...study } = best;
      progress.study = study;
    }

    progress.variant =
      progress.chaptersThisWeek > 0 ? "weekly" : progress.study ? "study" : "invitation";
  }

  return byEmail;
}
