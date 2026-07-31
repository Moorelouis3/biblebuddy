// Detects where the app is running so the "Add to Home Screen" banner can
// decide what tapping Add should do. All checks are synchronous and safe to
// call during render on the client; on the server they return the "no" answer.

export type InstallEnvironment = {
  /** Already running as an installed app (home screen icon). */
  isStandalone: boolean;
  /** iPhone/iPad — no beforeinstallprompt API, needs the manual-steps sheet. */
  isIOS: boolean;
  /** Instagram/Facebook in-app browser — installing is impossible here. */
  isInAppBrowser: boolean;
  /** Everything else (Android/desktop Chrome etc.) — real install prompt can fire. */
  canPrompt: boolean;
};

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia?.("(display-mode: standalone)").matches) return true;
  // iOS Safari's non-standard flag, set when launched from a home screen icon.
  return (window.navigator as { standalone?: boolean }).standalone === true;
}

export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return true;
  // iPadOS 13+ reports a Mac user agent but is the only "Mac" with touch.
  return navigator.userAgent.includes("Macintosh") && navigator.maxTouchPoints > 1;
}

export function isInAppBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Instagram|FBAN|FBAV/i.test(navigator.userAgent);
}

export function getInstallEnvironment(): InstallEnvironment {
  const standalone = isStandalone();
  const ios = isIOS();
  const inApp = isInAppBrowser();
  return {
    isStandalone: standalone,
    isIOS: ios,
    isInAppBrowser: inApp,
    canPrompt: !standalone && !ios && !inApp,
  };
}
