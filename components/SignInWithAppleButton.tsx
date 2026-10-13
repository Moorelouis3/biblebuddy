"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { isNativeApp } from "@/lib/nativeApp";
import { signInWithAppleNatively } from "@/lib/nativeAuth";

/**
 * Sign in with Apple (Louis, 2026-10-11, rewired 2026-10-13).
 *
 * App Review Guideline 4.8: an app that offers any third-party sign-in must
 * also offer Sign in with Apple or an equivalent privacy-preserving option.
 * Bible Buddy offers Google, so this is not optional - it is a flat
 * rejection without it.
 *
 * Two different flows behind one button, and they are not interchangeable:
 *
 *   - In the iOS app: the native sheet, via signInWithAppleNatively(). Apple
 *     hands back an identity token and Supabase takes it directly. No
 *     redirect, no browser, and - the part that matters for maintenance - no
 *     OAuth "Secret Key", which Apple expires every six months.
 *   - On the web: the ordinary OAuth redirect, which *does* need that secret.
 *     It is not configured, so this stays behind
 *     NEXT_PUBLIC_APPLE_SIGNIN_ENABLED. A button that throws "Unsupported
 *     provider" is worse than no button.
 *
 * Which is why the button renders inside the app whether or not that
 * environment variable is set: the app's path needs nothing on the web side.
 */

/** The web flow only. The app does not depend on this. */
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
  /** Where to land after Apple sends them back. Web flow only. */
  redirectTo?: string;
  disabled?: boolean;
  onError?: (message: string) => void;
  /** Called before signing in, so the page can record terms acceptance. */
  onBeforeSignIn?: () => void;
  /** Called when the native sheet succeeds - there is no redirect to carry it. */
  onSignedIn?: () => void;
  className?: string;
};

export default function SignInWithAppleButton({
  redirectTo,
  disabled,
  onError,
  onBeforeSignIn,
  onSignedIn,
  className,
}: Props) {
  // isNativeApp() reads the user agent, which does not exist during the
  // server render. Deciding in an effect keeps the first paint identical on
  // both sides rather than hydrating into a mismatch.
  const [visible, setVisible] = useState(appleSignInEnabled());

  useEffect(() => {
    if (appleSignInEnabled() || isNativeApp()) setVisible(true);
  }, []);

  if (!visible) return null;

  async function signIn() {
    onBeforeSignIn?.();
    try {
      if (await signInWithAppleNatively()) {
        onSignedIn?.();
        return;
      }
    } catch (nativeError) {
      // A cancelled sheet throws too. Say nothing rather than show an error
      // for something the person did on purpose.
      const message =
        nativeError instanceof Error ? nativeError.message : "Could not start sign-in.";
      if (!/cancel/i.test(message)) onError?.(message);
      return;
    }
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
