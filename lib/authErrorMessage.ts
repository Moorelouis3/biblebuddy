/**
 * What a reader should be told when signing in or signing up goes wrong.
 *
 * The 8 November audit said the signup and login buttons hang on a network
 * failure. They do not: auth-js wraps a dead connection as
 * AuthRetryableFetchError, isAuthError accepts it, and every method returns
 * { error } rather than throwing - so the button is released and a message
 * appears. The message was the bug. It said:
 *
 *     TypeError: Failed to fetch
 *
 * on the four doors into the app, to people who had just typed their password.
 * Nothing in that sentence tells them their connection dropped, that their
 * password was fine, or that trying again would work.
 *
 * Supabase's own auth messages are good - "Invalid login credentials",
 * "User already registered" - so they are passed through untouched. Only the
 * ones that are really "we could not reach the server" get replaced.
 */

/** Anything that looks like an auth error, from any of the four doors. */
export type AuthErrorish = {
  name?: string;
  message?: string;
  status?: number;
} | null | undefined;

const UNREACHABLE =
  "Couldn't reach Bible Buddy. Check your connection and try again.";

const SOMETHING_WENT_WRONG =
  "Something went wrong. Please try again in a moment.";

/**
 * True when the request never got an answer, as opposed to getting one we did
 * not like.
 *
 * `AuthRetryableFetchError` with status 0 is auth-js's own wrapper for a fetch
 * that rejected. The message check catches the same failure arriving through
 * anything that did not wrap it, and AbortError is our own 30-second deadline
 * from lib/supabaseAuthLock.ts.
 */
export function isUnreachableAuthError(error: AuthErrorish): boolean {
  if (!error) return false;
  const name = error.name ?? "";
  const message = error.message ?? "";

  if (name === "AuthRetryableFetchError" && (error.status ?? 0) === 0) return true;
  if (name === "AbortError" || name === "TimeoutError") return true;
  if (/failed to fetch|networkerror|network request failed|load failed/i.test(message)) return true;
  if (/aborted|timed? ?out/i.test(message)) return true;
  return false;
}

/** The sentence to show. Never a stack, never the word "fetch". */
export function authErrorMessage(error: AuthErrorish): string {
  if (!error) return SOMETHING_WENT_WRONG;
  if (isUnreachableAuthError(error)) return UNREACHABLE;
  const message = (error.message ?? "").trim();
  if (!message) return SOMETHING_WENT_WRONG;
  // A message that still carries developer words is not for a reader.
  if (/^TypeError|^ReferenceError|\bundefined\b/i.test(message)) return SOMETHING_WENT_WRONG;
  return message;
}

export const UNREACHABLE_MESSAGE = UNREACHABLE;
