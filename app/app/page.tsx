"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import SignInWithAppleButton from "@/components/SignInWithAppleButton";
import { markTermsAcceptancePending } from "@/lib/termsAcceptance";
import {
  consumeNativeAuthError,
  nativeAuthTrail,
  signInWithProviderNatively,
  startNativeAuthListener,
} from "@/lib/nativeAuth";
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

const CREAM = "#FAF7EF";
const NAVY = "#102D4D";
const SLATE = "#596575";

/** Which button is mid-flight. Nothing else may be pressed while one is. */
type Pending = "apple" | "google" | null;

export default function AppEntryPage() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [pending, setPending] = useState<Pending>(null);
  const [error, setError] = useState<string | null>(null);
  const busy = pending !== null;

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
      if (cancelled) return;
      // A sign-in that failed while this page did not exist - iOS relaunched
      // the app to deliver the callback - has nowhere else to say so.
      const carried = consumeNativeAuthError();
      if (carried) setError(carried);
      setCheckingSession(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function continueWithGoogle() {
    if (busy) return;
    setPending("google");
    setError(null);
    markTermsAcceptancePending("google_login");
    try {
      const native = await signInWithProviderNatively("google", () => router.replace("/dashboard"));
      if (native !== false) {
        if (native.ok) {
          router.replace("/dashboard");
          return;
        }
        // Give the buttons back whatever happened. Cancelling says nothing; a
        // timeout or a refusal from the provider says what to do next.
        setPending(null);
        if (native.reason !== "cancelled") {
          // The trail is the point: it names the step it got stuck on.
          const trail = nativeAuthTrail();
          setError(
            `${native.message ?? "Sign-in did not complete. Please try again."}${
              trail ? `

${trail}` : ""
            }`,
          );
        }
        return;
      }
    } catch (nativeError) {
      setPending(null);
      setError(nativeError instanceof Error ? nativeError.message : "Could not start sign-in.");
      return;
    }
    const origin = typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined;
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: origin ? { redirectTo: origin } : undefined,
    });
    if (oauthError) {
      setPending(null);
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
      className="flex min-h-[100svh] flex-col"
      style={{
        backgroundColor: CREAM,
        color: NAVY,
        // Every inset is handled here rather than inherited, because this
        // screen renders outside the app shell and under a transparent status
        // bar. The phone draws the clock and the home indicator; we only keep
        // out of their way.
        // The top inset is paid once by the body - see globals.css.
        paddingTop: "8px",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 18px)",
        paddingLeft: "env(safe-area-inset-left, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[460px] flex-1 flex-col">
        {/* ---------------------------------------------------------------
            Hero: the copy sits on the cream wall of the photograph, and the
            Bible fills the band underneath it. The artwork is a background
            layer, so growing text (accessibility sizes, a longer headline)
            pushes the whole section taller instead of landing on the book.
            --------------------------------------------------------------- */}
        <section className="relative flex flex-1 flex-col overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <Image
              src="/app-welcome-bible.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 460px) 100vw, 460px"
              // Anchored to the bottom so the open book and its ribbon survive
              // every crop; what gets trimmed is wall, which the copy covers.
              className="object-cover object-bottom"
            />
            {/* Cream over the top two-thirds so the headline never fights the
                shadows, then clear by the time the book starts. */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, ${CREAM} 0%, ${CREAM} 34%, rgba(250,247,239,0.86) 48%, rgba(250,247,239,0.35) 62%, rgba(250,247,239,0) 76%)`,
              }}
            />
            {/* And back to cream at the very bottom, so the table edge melts
                into the page rather than ending on a line. */}
            <div
              className="absolute inset-x-0 bottom-0 h-16"
              style={{
                background: `linear-gradient(to top, ${CREAM} 0%, rgba(250,247,239,0.75) 45%, rgba(250,247,239,0) 100%)`,
              }}
            />
          </div>

          <div className="relative flex flex-1 flex-col px-6 pt-6 text-center">
            <h1 className="bb-app-serif text-[28px] font-bold leading-none tracking-[-0.01em]">
              Bible Buddy
            </h1>

            <p className="mx-auto mt-6 max-w-[21rem] text-[16px] leading-snug">
              Most Bible apps help you read the Bible.
            </p>

            <p className="bb-app-serif mx-auto mt-1.5 max-w-[19rem] text-balance text-[31px] font-extrabold leading-[1.08] tracking-[-0.015em]">
              Bible Buddy helps you understand it.
            </p>

            <p
              className="mx-auto mt-3.5 max-w-[20.5rem] text-[15px] leading-[1.45]"
              style={{ color: SLATE }}
            >
              Explore Scripture with clear explanations, guided studies, and daily devotionals.
            </p>

            {/* The band the Bible occupies. It is the artwork's room, not a
                spacer standing in for the blank top of the photograph - the
                copy above is already sitting on that. */}
            <div className="min-h-[clamp(140px,38vw,200px)] flex-1" />
          </div>
        </section>

        {/* Feature highlights. Not buttons - no handlers, no button role. */}
        <ul className="mt-1 flex flex-wrap items-center justify-center gap-1.5 px-3">
          {[
            { label: "Bible study", icon: <BookIcon /> },
            { label: "Daily devotionals", icon: <SproutIcon /> },
            { label: "Audio", icon: <SpeakerIcon /> },
          ].map((chip) => (
            <li
              key={chip.label}
              className="flex items-center gap-1.5 rounded-full bg-[#E7EEF6] px-2.5 py-2 text-[12.5px] font-semibold"
            >
              {chip.icon}
              <span>{chip.label}</span>
            </li>
          ))}
        </ul>

        {/* Breathing room under the chips. The slack above belongs to the
            artwork, which grows on a taller phone rather than leaving a hole. */}
        <div className="h-5" />

        <div className="px-6">
          {error ? (
            <p
              role="alert"
              className="mb-3 whitespace-pre-line break-words rounded-2xl bg-[#FDECEC] px-4 py-3 text-center text-[13px] font-semibold text-[#9B1C1C]"
            >
              {error}
            </p>
          ) : null}

          {/* Apple first and at least as prominent as Google - Guideline 4.8
              asks for both. Inside the app this is the native sheet, so it
              does not wait on the web environment flag. */}
          <SignInWithAppleButton
            redirectTo={redirectTo}
            disabled={busy}
            onError={setError}
            onBeforeSignIn={() => {
              setError(null);
              markTermsAcceptancePending("apple_login");
            }}
            onBusyChange={(isBusy) => setPending(isBusy ? "apple" : null)}
            onSignedIn={() => router.replace("/dashboard")}
            className={`${BUTTON} bg-black text-white focus-visible:outline-black`}
          >
            {pending === "apple" ? (
              <Spinner label="Signing in with Apple" />
            ) : (
              <>
                <AppleMark />
                <span>Continue with Apple</span>
              </>
            )}
          </SignInWithAppleButton>

          <button
            type="button"
            onClick={() => void continueWithGoogle()}
            disabled={busy}
            className={`${BUTTON} mt-[11px] border border-[#DCE1E8] bg-white text-[#1F2937] focus-visible:outline-[#135397]`}
          >
            {pending === "google" ? (
              <Spinner label="Signing in with Google" dark />
            ) : (
              <>
                <GoogleMark />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* The email screen, not the signup form: it offers signing in,
              creating an account and resetting a password in one place. */}
          <Link
            href="/login"
            aria-disabled={busy || undefined}
            tabIndex={busy ? -1 : undefined}
            onClick={(event) => {
              if (busy) event.preventDefault();
            }}
            className={`${BUTTON} mt-[11px] text-white focus-visible:outline-[#102D4D] ${
              busy ? "pointer-events-none opacity-60" : ""
            }`}
            style={{ backgroundColor: NAVY, color: "#FFFFFF" }}
          >
            <EnvelopeIcon />
            <span>Continue with email</span>
          </Link>

          <p className="mt-3.5 text-center text-[12px] leading-relaxed" style={{ color: SLATE }}>
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline" style={{ color: NAVY }}>
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline" style={{ color: NAVY }}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      <style>{`
        .bb-app-serif { font-family: var(--font-bb-serif), "Playfair Display", Georgia, serif; }
        /* The theme system writes a background straight onto html/body, which
           would show as a grey-blue strip when the screen rubber-bands past the
           top or bottom. Cream to the edges instead. */
        html, body { background-color: ${CREAM} !important; background-image: none !important; }
      `}</style>
    </main>
  );
}

/** One shape for all three, so the row reads as a single stack. */
const BUTTON =
  "flex min-h-[54px] w-full select-none items-center justify-center gap-3 rounded-[14px] px-4 text-[16px] font-semibold leading-none transition active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

function Spinner({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden
        className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-current border-t-transparent"
        style={{ opacity: dark ? 0.55 : 0.75 }}
      />
      <span>{label}</span>
    </span>
  );
}

/* --- chip icons: navy outlines, same weight as each other ---------------- */

const CHIP_ICON = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: NAVY,
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function BookIcon() {
  return (
    <svg {...CHIP_ICON}>
      <path d="M12 6.5C10.6 5.2 8.6 4.5 6 4.5H3.5v13H6c2.6 0 4.6.7 6 2 1.4-1.3 3.4-2 6-2h2.5v-13H18c-2.6 0-4.6.7-6 2Z" />
      <path d="M12 6.5v12" />
    </svg>
  );
}

function SproutIcon() {
  return (
    <svg {...CHIP_ICON}>
      <path d="M12 20v-7.5" />
      <path d="M12 12.5C12 9.6 14.4 7.2 17.3 7.2h2.2c0 2.9-2.4 5.3-5.3 5.3H12Z" />
      <path d="M12 14.2h-1.5A4.5 4.5 0 0 1 6 9.7V8.2h1.5A4.5 4.5 0 0 1 12 12.7v1.5Z" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg {...CHIP_ICON}>
      <path d="M11 5.5 6.8 9H4a.9.9 0 0 0-.9.9v4.2A.9.9 0 0 0 4 15h2.8L11 18.5Z" />
      <path d="M15.4 9.3a4 4 0 0 1 0 5.4" />
      <path d="M18 6.9a7.4 7.4 0 0 1 0 10.2" />
    </svg>
  );
}

/* --- provider marks ------------------------------------------------------ */

function AppleMark() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.54c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.61-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.75-.78-2.87-.76-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.75 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.87.69 1.18-.02 1.93-1.08 2.65-2.14.84-1.23 1.19-2.42 1.2-2.48-.02-.01-2.31-.89-2.33-3.5zM14.9 5.6c.6-.74 1.01-1.76.9-2.78-.87.04-1.93.58-2.56 1.31-.56.65-1.06 1.69-.93 2.69.97.07 1.97-.49 2.59-1.22z" />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg width="19" height="19" viewBox="0 0 48 48" aria-hidden="true">
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

function EnvelopeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.75" y="5" width="18.5" height="14" rx="2.5" />
      <path d="m3.5 7.5 7.3 5.2a2 2 0 0 0 2.4 0l7.3-5.2" />
    </svg>
  );
}
