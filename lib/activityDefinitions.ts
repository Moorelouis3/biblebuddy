/**
 * What counts as "active" (Louis, 2026-10-23).
 *
 * This existed in three places that disagreed:
 *
 *   public.is_qualifying_app_action()   SQL, decides the email engagement
 *                                       groups - who is active / quiet / dead
 *   isMeaningfulAction()                lib/actionRecorder, decides when to
 *                                       buzz the phone and ask for a review
 *   (nothing)                           the admin dashboard, which counted
 *                                       EVERY master_actions row, so opening
 *                                       the dashboard made you "active today"
 *                                       exactly as much as finishing a chapter
 *
 * The dashboard now uses the two real ones instead of a fourth of its own, so
 * "active" means the same thing on the analytics page as it does to the email
 * sender.
 *
 * THE SQL IS THE SOURCE OF TRUTH for isQualifyingAction. If the deny list
 * below and the one in supabase/migrations/20261010_engagement_groups.sql ever
 * drift, the email groups win and this file is the bug.
 */

/** Action types the SQL function denies outright. */
const NOT_QUALIFYING = new Set([
  "landing_page_visited",
  "landing_cta_clicked",
  "user_signup",
  "louis_daily_message_shown",
  "user_upgraded",
  "trial_canceled",
  "referral_signup_reward",
  "profile_creation_popup_completed",
  "dashboard_tour_completed",
  "dashboard_tour_skipped",
]);

const NOT_QUALIFYING_PREFIXES = ["onboarding_", "install_banner_", "upgrade_popup_"];

/**
 * "A human chose to come back to Bible Buddy."
 *
 * A deny list rather than an allow list, deliberately: master_actions grows a
 * new action type with every feature, and an allow list would silently stop
 * counting the new ones - quietly marking active people inactive. What is
 * denied is everything that is not the person choosing to study: marketing
 * site visits, registration, popups we pushed at them, billing bookkeeping.
 *
 * user_login and dashboard_viewed DO count. They are not studying, but a
 * person who opens the app every week is not inactive by any honest reading.
 */
export function isQualifyingAction(actionType: string | null | undefined): boolean {
  if (!actionType) return false;
  if (NOT_QUALIFYING.has(actionType)) return false;
  return !NOT_QUALIFYING_PREFIXES.some((prefix) => actionType.startsWith(prefix));
}

/**
 * "They finished something." Stricter than above: opening a chapter is not
 * this, completing one is. Mirrors isMeaningfulAction in lib/actionRecorder.
 */
const ALSO_MEANINGFUL = new Set([
  "note_created",
  "person_learned",
  "place_discovered",
  "keyword_mastered",
  "trivia_question_correct",
  "understand_verse_of_the_day",
  "group_message_sent",
  "feed_post_thought",
  "feed_post_prayer",
  "feed_post_prayer_request",
  "feed_post_photo",
  "feed_post_video",
  "feed_post_commented",
  "feed_post_replied",
  "buddy_added",
]);

export function isMeaningfulAction(actionType: string | null | undefined): boolean {
  if (!actionType) return false;
  if (actionType.endsWith("_completed")) return true;
  return ALSO_MEANINGFUL.has(actionType);
}
