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

export type AppStoreAskState = "pending" | "later" | "never";

const KEY = "bb:appstore-ask";
/** "Not now" is not "never" - it returns, but not soon enough to nag. */
export const LATER_DAYS = 5;

function read(): { state: AppStoreAskState; at: number } {
  if (typeof window === "undefined") return { state: "never", at: 0 };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { state: "pending", at: 0 };
    const [state, at] = raw.split(":");
    return { state: (state as AppStoreAskState) || "pending", at: Number(at) || 0 };
  } catch {
    // Private mode or blocked storage. Treat as never-asked rather than
    // never-ask: a prompt that silently stops working is worse than one that
    // occasionally repeats.
    return { state: "pending", at: 0 };
  }
}

function write(state: AppStoreAskState) {
  try {
    window.localStorage.setItem(KEY, `${state}:${Date.now()}`);
  } catch {
    // ignore
  }
}

/** True when any surface may ask right now. */
export function canAskForAppStore(): boolean {
  const { state, at } = read();
  if (state === "never") return false;
  if (state === "later") return Date.now() - at >= LATER_DAYS * 86_400_000;
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
  if (read().state === "never") return;
  write("later");
}

/**
 * "Don't show again" anywhere, and also a tap through to the App Store -
 * somebody who went to the listing does not need asking again, whether or
 * not they installed it (and iOS will never tell us which).
 */
export function silenceAppStoreAsk() {
  write("never");
}
