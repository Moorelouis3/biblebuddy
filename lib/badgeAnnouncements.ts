/**
 * Which badges this device has already announced. Browser only.
 *
 * GET /api/points/summary goes on offering a fresh unlock for ten minutes in
 * case the first reply was lost (BADGE_ANNOUNCE_WINDOW_MS in
 * lib/achievementBadges.ts), so something has to stop the same badge being
 * announced on every page load inside that window, and on both screens that
 * can show it - the dashboard card and the levels page. This is that.
 */

/** How long an announcement stays on screen. The toast uses the same figure. */
export const BADGE_ANNOUNCE_VISIBLE_MS = 12000;

/**
 * The announcement on screen right now, kept outside React.
 *
 * The dashboard mounts the level card more than once while it loads. Component
 * state dies with the first mount, and by then the badge has been claimed, so
 * the second mount was told "already announced" and the reader saw nothing at
 * all. Holding the live one here lets a remount carry on showing it.
 */
let live: { userId: string; badgeId: string; until: number } | null = null;

/**
 * True if this badge should be on screen: the first time this device is asked
 * about it for this user, and again for as long as that same announcement is
 * still showing. False ever after.
 *
 * Claiming and checking are one step, so two components cannot both start an
 * announcement. If storage is unavailable it answers true: showing a badge
 * twice is a much smaller failure than never showing it.
 */
export function claimBadgeAnnouncement(userId: string, badgeId: string): boolean {
  const now = Date.now();
  if (live && live.userId === userId && live.badgeId === badgeId) {
    if (now < live.until) return true;
    live = null;
    return false;
  }
  const key = `bb:badge-announced:${userId}:${badgeId}`;
  try {
    if (window.localStorage.getItem(key)) return false;
    window.localStorage.setItem(key, new Date(now).toISOString());
  } catch {
    // Fall through and show it.
  }
  live = { userId, badgeId, until: now + BADGE_ANNOUNCE_VISIBLE_MS };
  return true;
}

/** The reader closed it, or it timed out: a remount must not bring it back. */
export function endBadgeAnnouncement(badgeId: string): void {
  if (live && live.badgeId === badgeId) live = null;
}
