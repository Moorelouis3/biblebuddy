/**
 * The page a link or widget tap opened the app for, held for the length of
 * one launch (Louis, 2026-11-21: tapping the Bible Lock widget's "set it up"
 * opened the dashboard).
 *
 * On a cold start two things race. NativeDeepLinks reads the launch URL and
 * pushes it, and the native front door (/app) finds the session and replaces
 * into /dashboard. Whichever ran second won, so a link that arrived before the
 * session check finished was thrown away. The front door now asks here first.
 *
 * Module memory, not storage: it has to die with the launch, or a stale link
 * would hijack the next ordinary app open.
 */
let pending: string | null = null;

export function setPendingDeepLink(path: string) {
  pending = path;
}

/** Returns the waiting path once, then forgets it. */
export function takePendingDeepLink(): string | null {
  const path = pending;
  pending = null;
  return path;
}

/**
 * Where an opened link should really go.
 *
 * The 1.17 Bible Lock widget opens /settings when the lock is not set up,
 * where the lock sits at the very bottom of a long page. /bible-lock is the
 * lock's own page with its setup. The widget points there itself from the
 * next iOS build (see NEXT_BUILD.md); until everyone has that build, a bare
 * /settings arriving from outside the app is read as the widget.
 */
export function resolveOpenedPath(path: string): string {
  if (path === "/settings") return "/bible-lock";
  return path;
}
