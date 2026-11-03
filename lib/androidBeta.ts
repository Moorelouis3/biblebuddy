/**
 * The Android closed beta, in one place.
 *
 * Google approved the closed test on 2026-11-02 and will not open the Play
 * listing to the public until twelve testers have kept the app installed for
 * fourteen unbroken days. Until then nobody can reach Bible Buddy on Android
 * by searching Play - they have to join the tester group first, and only then
 * does the install link work.
 *
 * That two-step order is the whole reason /android exists instead of pointing
 * the Play buttons straight at the store. Someone sent directly to the test
 * link without joining the group is told they are not a tester, which reads
 * like a broken app rather than a missing step.
 *
 * When the beta ends: set BETA_OPEN to false. Every Play button then points at
 * the public listing, /android stops being linked from anywhere, and the
 * Android popup stops appearing. Nothing else needs touching.
 */

import { PLAY_PACKAGE } from "@/lib/appReviewPrompt";

/** False once Bible Buddy is publicly listed on Google Play. */
export const BETA_OPEN = true;

/** Google's bar: this many testers, installed continuously for 14 days. */
export const TESTERS_NEEDED = 12;
export const TESTER_DAYS = 14;

/** Step 1. Joining this is what grants permission to see the test. */
export const TESTER_GROUP_URL = "https://groups.google.com/g/biblebuddy-android-testers";

/** Step 2. Useless until step 1 has gone through. */
export const TESTER_OPT_IN_URL = `https://play.google.com/apps/testing/${PLAY_PACKAGE}`;

/** The public listing. Testers-only until the beta ends. */
export const PLAY_LISTING_URL = `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`;

/**
 * Where a "Get it on Google Play" button should send someone.
 *
 * During the beta that is our own explainer, never Play itself.
 */
export const androidDestination = () => (BETA_OPEN ? "/android" : PLAY_LISTING_URL);
