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
 *
 * ON since 14 November 2026. Louis tested the App Store popup on his own
 * iPhone in test mode that day and said to switch it on for everyone. To
 * turn the whole thing off again, set this back to false: the old store
 * popups take over by themselves.
 */
export const COORDINATOR_ENABLED = true;

export const TEST_MODE_KEY = "bb:popup-coordinator-test";

const onLocalhost = () => {
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
};

/**
 * Test mode: try the coordinator on one phone or browser while the switch
 * above is off for everybody else (Louis, 2026-11-14: "let's test it on
 * mine").
 *
 * It is a flag in that browser's own storage, turned on by opening
 * /tips?popup_test=on and off with /tips?popup_test=off. It is per device:
 * the iPhone app, Safari and a laptop each have their own.
 *
 * It is not a secret and does not need to be. All it does is put that one
 * browser under the stricter rules - fewer popups, never more - and a popup
 * still needs its row in popup_settings.
 */
function testOverride(): boolean {
  try {
    return window.localStorage.getItem(TEST_MODE_KEY) === "1";
  } catch {
    return false;
  }
}

/** Turn test mode on or off in this browser. Returns what it now is. */
export function setTestMode(on: boolean): boolean {
  try {
    if (on) window.localStorage.setItem(TEST_MODE_KEY, "1");
    else window.localStorage.removeItem(TEST_MODE_KEY);
  } catch {
    // Storage blocked: test mode cannot be kept, so it is off.
  }
  return testOverride();
}

export function testModeOn(): boolean {
  return testOverride();
}

/** Is the coordinator the one in charge on this page? Browser only. */
export function coordinatorActive(): boolean {
  return COORDINATOR_ENABLED || testOverride();
}

/**
 * Testing on a developer's own machine only (localhost): pretend to be an
 * iPhone or Android browser so the store asks can be tried on a laptop.
 * localStorage `bb:popup-device-test` = "ios_web" or "android_web".
 */
export function testDevice(): "ios_web" | "android_web" | null {
  try {
    if (!onLocalhost() || !testOverride()) return null;
    const value = window.localStorage.getItem("bb:popup-device-test");
    return value === "ios_web" || value === "android_web" ? value : null;
  } catch {
    return null;
  }
}
