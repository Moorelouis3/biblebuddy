/**
 * The popup coordinator's master switch (Louis, 2026-11-13).
 *
 * In its own file because two kinds of code need it: the coordinator, and the
 * older popups that hand over to it. While this is false the App Store and
 * Android asks run exactly as they always have. The moment it is true they
 * stand down and the coordinator shows them instead, under the one-per-visit
 * limit - so the two can never both be asking.
 *
 * Turning it on is not enough on its own: a popup also needs a row in
 * popup_settings with enabled = true.
 */
export const COORDINATOR_ENABLED = false;

/**
 * For testing on a developer's own machine while the switch above is off:
 * on localhost only, with localStorage `bb:popup-coordinator-test` = "1".
 * It can never be true on the live site, whatever is in storage.
 */
function testOverride(): boolean {
  try {
    const host = window.location.hostname;
    const local = host === "localhost" || host === "127.0.0.1";
    return local && window.localStorage.getItem("bb:popup-coordinator-test") === "1";
  } catch {
    return false;
  }
}

/** Is the coordinator the one in charge on this page? Browser only. */
export function coordinatorActive(): boolean {
  return COORDINATOR_ENABLED || testOverride();
}

/**
 * Testing only, same localhost-only rule as above: pretend to be an iPhone or
 * Android browser so the store asks can be tried on a laptop.
 * localStorage `bb:popup-device-test` = "ios_web" or "android_web".
 */
export function testDevice(): "ios_web" | "android_web" | null {
  if (!testOverride()) return null;
  try {
    const value = window.localStorage.getItem("bb:popup-device-test");
    return value === "ios_web" || value === "android_web" ? value : null;
  } catch {
    return null;
  }
}
