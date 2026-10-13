"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import SignInWithAppleButton, { appleSignInEnabled } from "@/components/SignInWithAppleButton";
import { markTermsAcceptancePending } from "@/lib/termsAcceptance";
import { signInWithProviderNatively, startNativeAuthListener } from "@/lib/nativeAuth";
import AppLoadingScreen from "@/components/AppLoadingScreen";

/**
 * The iPhone and Android app's front door (Louis, 2026-10-13).
 *
 * `capacitor.config.ts` opens the shell here instead of at "/". The website
 * keeps its marketing landing page exactly as it is - this route exists only
 * for people who have already installed the app, and it is deliberately not
 * linked from anywhere on the web.
 *
 * Why: the first TestFlight build opened on the marketing page - the video,
 * "Finally Understand God's Word", "Start Studying Now", a Login link in a
 * website nav. Someone who downloaded the app from the App Store has already
 * been sold it. Worse, that page's header has no safe-area padding, so the
 * logo and nav sat underneath the clock and battery.
 *
 * Signed in already? Nobody should ever see this screen. The session check
 * runs first and replaces straight into the dashboard, so a returning user
 * gets the splash and then their own app.
 */

const LOGO = "/Biblebuddyicon.png";

export default function AppEntryPage() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Attach the deep-link listener before any button can be pressed, so a fast
  // tap cannot land back here with nothing listening.
  useEffect(() => {
    void startNativeAuthListener(() => router.replace("/dashboard"));
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (cancelled) return;
        if (data?.session) {
          router.replace("/dashboard");
          return;
        }
      } catch {
        // No session, or storage is blocked. Either way: show the welcome.
      }
      if (!cancelled) setCheckingSession(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function continueWithGoogle() {
    setBusy(true);
    setError(null);
    markTermsAcceptancePending("google_login");
    try {
      if (await signInWithProviderNatively("google")) return;
    } catch (nativeError) {
      setBusy(false);
      setError(nativeError instanceof Error ? nativeError.message : "Could not start sign-in.");
      return;
    }
    const redirectTo =
      typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined;
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: redirectTo ? { redirectTo } : undefined,
    });
    if (oauthError) {
      setBusy(false);
      setError(oauthError.message);
    }
  }

  // Keep the splash up while deciding. A returning user should see one
  // loading screen and then the dashboard, never a flash of a login wall.
  if (checkingSession) return <AppLoadingScreen />;

  const redirectTo =
    typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined;

  return (
    <main
      className="flex min-h-[100svh] flex-col bg-[#fffdf8] text-[#07162f]"
      // Every inset is handled here rather than inherited, because this screen
      // renders outside the app shell and under a transparent status bar.
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 28px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
        paddingLeft: "calc(env(safe-area-inset-left, 0px) + 24px)",
        paddingRight: "calc(env(safe-area-inset-right, 0px) + 24px)",
      }}
    >
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Image
          src={LOGO}
          alt=""
          width={88}
          height={88}
          priority
          className="rounded-[22px] shadow-[0_18px_40px_rgba(19,83,151,0.22)]"
        />
        <h1 className="mt-6 text-[28px] font-black leading-tight">Bible Buddy</h1>
        <p className="mt-3 max-w-[20rem] text-[15px] leading-relaxed text-[#44536d]">
          Read the Bible and actually understand it.
        </p>
      </div>

      <div className="w-full">
        {error ? (
          <p className="mb-3 rounded-2xl bg-[#fdecec] px-4 py-3 text-center text-sm font-semibold text-[#9b1c1c]">
            {error}
          </p>
        ) : null}

        {/* Apple first, and visually at least as prominent as Google. Renders
            nothing until NEXT_PUBLIC_APPLE_SIGNIN_ENABLED is true, so there is
            never a button that errors with "Unsupported provider". */}
        <SignInWithAppleButton
          redirectTo={redirectTo}
          disabled={busy}
          onError={setError}
          onBeforeSignIn={() => markTermsAcceptancePending("apple_login")}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-black px-4 py-4 text-[15px] font-black text-white transition disabled:opacity-60"
        />

        <button
          type="button"
          onClick={() => void continueWithGoogle()}
          disabled={busy}
          className={`${appleSignInEnabled() ? "mt-3" : ""} flex w-full items-center justify-center gap-3 rounded-2xl border border-[#dfe4ec] bg-white px-4 py-4 text-[15px] font-black text-[#1f2937] transition disabled:opacity-60`}
        >
          <GoogleLogo />
          <span>Continue with Google</span>
        </button>

        <Link
          href="/signup"
          className="mt-3 flex w-full items-center justify-center rounded-2xl bg-[#135397] px-4 py-4 text-[15px] font-black text-white transition"
        >
          Continue with email
        </Link>

        <p className="mt-5 text-center text-[14px] text-[#44536d]">
          Already have an account?{" "}
          <Link href="/login" className="font-black text-[#135397] underline">
            Sign in
          </Link>
        </p>

        <p className="mt-4 text-center text-[12px] leading-relaxed text-[#8794a8]">
          Free, with no subscription. By continuing you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
