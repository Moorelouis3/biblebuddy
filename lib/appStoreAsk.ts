/**
 * One answer, shared by every place that asks an iPhone user to get the app.
 *
 * Louis, 2026-11-02: "make sure it doesnt annoy people like if they hit
 * ignore on one then it should ignore all."
 *
 * There are four surfaces that can ask - the sign-in popup, the dashboard
 * banner, the popup after a reading, and (for logged-out visitors) the
 * landing page buttons. Before this, each kept its own answer, so somebody
 * could dismiss the popup on Monday and be asked again by the banner thirty
 * seconds later. Saying no once now silences all of them.
 *
 * Deliberately separate from the old Add to Home Screen bookkeeping
 * (`install_prompt_state`). Declining a home-screen bookmark months ago is
 * not declining the actual app, and these must be able to disagree.
 *
 * localStorage only, per device. The alternative is a profile_stats column,
 * which needs a migration and a round trip before the first paint - too much
 * for a prompt whose job is to be quiet. Worst case somebody clears their
 * browser and gets asked once more.
 */

export type AppStoreAskState = "pending" | "later" | "tapped" | "never";

const KEY = "bb:appstore-ask";
/** "Not now" is not "never" - it returns, but not soon enough to nag. */
export const LATER_DAYS = 5;
/**
 * How long a tap through to the App Store buys.
 *
 * Louis, 2026-11-02: "if they click get the app, then they come back and
 * still dont have the app u keep offering it". Right - a tap is not an
 * install. Somebody can open the listing, read it and never press Get, and
 * treating that as a permanent no would quietly lose them.
 *
 * Re-asking is safe because the person who DID install never sees any of
 * this again: every surface bails out inside the native app. So the only
 * people this can reach are, by definition, still on the website without
 * the app. Three weeks is long enough not to feel like nagging.
 */
export const TAPPED_DAYS = 21;
/** Two trips to the listing without installing is an answer. Stop asking. */
export const MAX_TAPS = 2;

function read(): { state: AppStoreAskState; at: number; taps: number } {
  if (typeof window === "undefined") return { state: "never", at: 0, taps: 0 };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { state: "pending", at: 0, taps: 0 };
    const [state, at, taps] = raw.split(":");
    return {
      state: (state as AppStoreAskState) || "pending",
      at: Number(at) || 0,
      taps: Number(taps) || 0,
    };
  } catch {
    // Private mode or blocked storage. Treat as never-asked rather than
    // never-ask: a prompt that silently stops working is worse than one that
    // occasionally repeats.
    return { state: "pending", at: 0, taps: 0 };
  }
}

function write(state: AppStoreAskState, taps = read().taps) {
  try {
    window.localStorage.setItem(KEY, `${state}:${Date.now()}:${taps}`);
  } catch {
    // ignore
  }
}

/** True when any surface may ask right now. */
export function canAskForAppStore(): boolean {
  const { state, at } = read();
  if (state === "never") return false;
  if (state === "later") return Date.now() - at >= LATER_DAYS * 86_400_000;
  if (state === "tapped") return Date.now() - at >= TAPPED_DAYS * 86_400_000;
  return true;
}

/**
 * "Not now" anywhere quiets everywhere, for a few days.
 *
 * Never downgrades a "never". No surface can reach this after a permanent
 * no today - they all check canAskForAppStore first - but a softer answer
 * silently reopening a settled one is the kind of bug that only shows up as
 * a complaint months later.
 */
export function snoozeAppStoreAsk() {
  const { state } = read();
  // Never downgrade a firmer answer into a softer one.
  if (state === "never" || state === "tapped") return;
  write("later");
}

/** "Don't show again" anywhere. The only permanent no the user can give. */
export function silenceAppStoreAsk() {
  write("never");
}

/**
 * They tapped through to the listing.
 *
 * Quiet for three weeks rather than forever, because tapping is not
 * installing and iOS will never tell us which happened. If they installed,
 * they will never see a prompt again anyway - the app does not run them. If
 * they did not, one more ask in three weeks is fair.
 *
 * After MAX_TAPS trips to the listing with no install, stop: somebody who
 * has looked twice and not pressed Get has answered the question.
 */
export function recordAppStoreTap() {
  const taps = read().taps + 1;
  if (taps >= MAX_TAPS) write("never", taps);
  else write("tapped", taps);
}
