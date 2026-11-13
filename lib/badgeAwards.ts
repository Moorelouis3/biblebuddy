import type { SupabaseClient } from "@supabase/supabase-js";
import {
  BADGE_IDS,
  badgeToAnnounce,
  badgeXpFor,
  buildBadgeStatuses,
  countBadgeInputs,
  pickBadgeToUnlock,
  type BadgeActionRow,
  type BadgeStatus,
} from "./achievementBadges";

/**
 * A reader's badges, their XP, and the one place a badge unlocks. Server only.
 *
 * Both GET /api/points/summary and GET /api/badges/summary call this, so the
 * XP a badge pays and the badge the reader sees can never come from two
 * different calculations.
 *
 * The points total and the badges depend on each other - two badges are about
 * reaching an XP total, and every badge adds XP - so the caller hands over
 * `totalWith`, a function from "badge XP" to "total XP", and this works out
 * the rest in the only order that is consistent:
 *
 *   1. read what is already unlocked, and add up its XP;
 *   2. total the reader's points including that;
 *   3. see which badges that total and their activity now reach;
 *   4. if `allowUnlock`, unlock at most ONE of them, when the gap allows;
 *   5. if one unlocked, add its XP and total again.
 *
 * UNLOCKING writes one row to public.user_badge_popups_seen, which is unique
 * on (user_id, badge_id). So a retry, a second tab or a repeat of the same
 * activity cannot unlock a badge twice or pay it twice: the second write is
 * refused and ignored. If the write fails the badge is not unlocked, pays
 * nothing and is not announced; it stays ready and unlocks next time.
 *
 * Only the points route passes allowUnlock. The badges route never does, so
 * two requests made side by side by one page cannot each unlock a badge.
 */

type AdminClient = Pick<SupabaseClient, "from">;

export type BadgeResolution = {
  /** XP from every unlocked badge, including one unlocked just now. */
  badgeBonusPoints: number;
  /** Total XP including badgeBonusPoints. */
  totalPoints: number;
  statuses: BadgeStatus[];
  /** The badge unlocked by this request, if any. */
  unlocked: BadgeStatus | null;
  /**
   * The badge to tell the reader about: the one just unlocked, or one unlocked
   * in the last few minutes whose news may not have reached them
   * (BADGE_ANNOUNCE_WINDOW_MS). The app shows each badge once per device.
   */
  announce: BadgeStatus | null;
};

export async function resolveBadges(options: {
  supabase: AdminClient;
  userId: string;
  actions: BadgeActionRow[];
  groupCommentCount: number;
  groupLikeCount: number;
  currentStreak: number;
  /** The reader's total XP, given this much XP from badges. */
  totalWith: (badgeBonusPoints: number) => number;
  allowUnlock: boolean;
  now?: number;
}): Promise<BadgeResolution> {
  const { supabase, userId } = options;

  const { data, error } = await supabase
    .from("user_badge_popups_seen")
    .select("badge_id, shown_at")
    .eq("user_id", userId)
    .limit(1000);
  // A failed read is an error, never "no badges": treating it as empty would
  // take the reader's badge XP away for this request and offer to unlock
  // badges they already have.
  if (error) throw new Error(`user_badge_popups_seen: ${error.message}`);

  const recorded = new Map<string, string | null>();
  for (const row of (data as Array<{ badge_id: string; shown_at: string | null }>) || []) {
    if (BADGE_IDS.has(row.badge_id)) recorded.set(row.badge_id, row.shown_at);
  }

  let badgeBonusPoints = badgeXpFor(recorded.keys());
  let totalPoints = options.totalWith(badgeBonusPoints);

  const build = () =>
    buildBadgeStatuses(
      countBadgeInputs(options.actions, {
        currentStreak: options.currentStreak,
        totalPoints,
        groupComments: options.groupCommentCount,
        groupLikesGiven: options.groupLikeCount,
      }),
      recorded,
    );

  let statuses = build();
  let unlocked: BadgeStatus | null = null;

  if (options.allowUnlock) {
    const next = pickBadgeToUnlock(statuses, recorded, options.now ?? Date.now());
    if (next) {
      const shownAt = new Date(options.now ?? Date.now()).toISOString();
      const { error: writeError } = await supabase
        .from("user_badge_popups_seen")
        .upsert({ user_id: userId, badge_id: next.id, shown_at: shownAt }, { onConflict: "user_id,badge_id", ignoreDuplicates: true });
      if (writeError) {
        console.error("[BADGES] Could not record an unlock:", writeError.message);
      } else {
        recorded.set(next.id, shownAt);
        badgeBonusPoints = badgeXpFor(recorded.keys());
        totalPoints = options.totalWith(badgeBonusPoints);
        statuses = build();
        unlocked = statuses.find((status) => status.id === next.id) ?? null;
        if (unlocked) unlocked.isNew = true;
      }
    }
  }

  return { badgeBonusPoints, totalPoints, statuses, unlocked, announce: unlocked ?? badgeToAnnounce(statuses, options.now ?? Date.now()) };
}
