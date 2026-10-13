/**
 * Bible Buddy access policy.
 *
 * The core Bible-study experience is free. No credits, no per-day drip, no
 * plan limits, no upgrade wall between someone and understanding Scripture.
 *
 * This flag exists so the change is reversible without reverting a large diff.
 * It defaults to FREE. To temporarily restore the old paid gating, set:
 *
 *   NEXT_PUBLIC_CORE_STUDY_FREE=false
 *
 * Anything that is an actual commercial product (physical books, donations,
 * bulk orders) is deliberately NOT governed by this flag — those are real
 * purchases, not access to study.
 */
export const CORE_STUDY_IS_FREE = process.env.NEXT_PUBLIC_CORE_STUDY_FREE !== "false";

/**
 * True when a user should be treated as having full study access.
 * Under the free policy this is everyone, including guests.
 *
 * `isPaid` is still honoured when the flag is off, so legacy behaviour is
 * exactly preserved on revert.
 */
export function hasFullStudyAccess(isPaid?: boolean | null): boolean {
  return CORE_STUDY_IS_FREE || isPaid === true;
}
