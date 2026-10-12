"use client";

import { supabase } from "@/lib/supabaseClient";

/**
 * Sign in with Apple (Louis, 2026-10-11).
 *
 * App Review Guideline 4.8: an app that offers any third-party sign-in must
 * also offer Sign in with Apple or an equivalent privacy-preserving option.
 * My Bible Buddy offers Google, so this is not optional - it is a flat
 * rejection without it.
 *
 * SWITCHED OFF until the Apple side exists. Turning it on needs a paid
 * Developer Program membership (end of October), a Services ID, a signing
 * key, and the Apple provider enabled in Supabase. A button that throws
 * "Unsupported provider" is worse than no button, so it renders nothing
 * until NEXT_PUBLIC_APPLE_SIGNIN_ENABLED is set to "true" in Vercel.
 *
 * The code is written now so that switching it on in Stage 2 is one
 * environment variable rather than a feature to build under deadline.
 */

export function appleSignInEnabled(): boolean {
  return process.env.NEXT_PUBLIC_APPLE_SIGNIN_ENABLED === "true";
}

function AppleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.54c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.61-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.75-.78-2.87-.76-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.87.69 1.18-.02 1.93-1.08 2.65-2.14.84-1.23 1.19-2.42 1.2-2.48-.02-.01-2.31-.89-2.33-3.5zM14.9 5.6c.6-.74 1.01-1.76.9-2.78-.87.04-1.93.58-2.56 1.31-.56.65-1.06 1.69-.93 2.69.97.07 1.97-.49 2.59-1.22z" />
    </svg>
  );
}

type Props = {
  /** Where to land after Apple sends them back. */
  redirectTo?: string;
  disabled?: boolean;
  onError?: (message: string) => void;
  /** Called before redirecting, so the page can record terms acceptance. */
  onBeforeSignIn?: () => void;
  className?: string;
};

export default function SignInWithAppleButton({
  redirectTo,
  disabled,
  onError,
  onBeforeSignIn,
  className,
}: Props) {
  if (!appleSignInEnabled()) return null;

  async function signIn() {
    onBeforeSignIn?.();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: redirectTo ? { redirectTo } : undefined,
    });
    if (error) onError?.(error.message);
  }

  return (
    <button
      type="button"
      onClick={() => void signIn()}
      disabled={disabled}
      // Apple's guidelines require their mark and wording, and a button at
      // least as prominent as the other sign-in options. Black on white is
      // one of the permitted treatments.
      className={
        className ??
        "mt-3 flex w-full items-center justify-center gap-3 rounded-2xl px-4 py-3 text-sm font-black text-white transition disabled:opacity-60"
      }
      style={className ? undefined : { backgroundColor: "#000000" }}
    >
      <AppleLogo />
      <span>Continue with Apple</span>
    </button>
  );
}
