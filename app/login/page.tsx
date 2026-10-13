// app/login/page.tsx
"use client";

import { FormEvent, useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppLoadingScreen from "@/components/AppLoadingScreen";
import LegalPageThemeReset from "@/components/LegalPageThemeReset";
import PublicHomeButton from "@/components/PublicHomeButton";
import BrandHomeLink from "@/components/BrandHomeLink";
import { supabase } from "../../lib/supabaseClient";
import SignInWithAppleButton from "@/components/SignInWithAppleButton";
import { markTermsAcceptancePending } from "../../lib/termsAcceptance";
import { hasCachedSupabaseSession } from "../../lib/authBoot";
import { isNativeApp } from "../../lib/nativeApp";
import { signInWithProviderNatively } from "../../lib/nativeAuth";

/**
 * Where to send someone after login. Callers pass ?next=/events/... (the
 * Proverbs signup does), and before 2026-09-19 this page ignored it and always
 * went to the dashboard, so anyone tapping an email link while logged out
 * never reached the page they came for. Only same-site paths are honoured.
 */
function nextPath() {
  if (typeof window === "undefined") return "/dashboard";
  const raw = new URLSearchParams(window.location.search).get("next");
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return "/dashboard";
  return raw;
}

export default function LoginPage() {
  const router = useRouter();
  // Inside the app this page IS the "Continue with email" screen: Apple and
  // Google were already offered on the welcome screen one tap ago, and showing
  // them again made the email option look like an afterthought. The user agent
  // does not exist during the server render, so the server snapshot is false
  // and the first paint matches on both sides.
  const nativeApp = useSyncExternalStore(
    () => () => {},
    () => isNativeApp(),
    () => false,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount and redirect if logged in
  useEffect(() => {
    let settled = false;
    const hadCachedSession = hasCachedSupabaseSession();
    const fallbackTimer = window.setTimeout(() => {
      if (!settled) setCheckingSession(false);
    }, hadCachedSession ? 1600 : 700);

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        settled = true;
        window.clearTimeout(fallbackTimer);
        if (session) {
          router.replace(nextPath());
          return;
        }
      } finally {
        setCheckingSession(false);
      }
    };
    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        settled = true;
        window.clearTimeout(fallbackTimer);
        router.replace(nextPath());
      }
    });

    return () => {
      window.clearTimeout(fallbackTimer);
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    // Wait for session to be fully established
    // Verify session exists before redirecting
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) {
      setLoading(false);
      setError("Login failed: session not established");
      return;
    }

    // Log the login to app_logins table (fire-and-forget, don't block on error)
    const userId = sessionData.session.user.id;
    (async () => {
      try {
        const { error } = await supabase
          .from("app_logins")
          .insert({ user_id: userId });
        if (error) {
          console.error("Failed to log login:", error);
        }
      } catch (err) {
        console.error("Error logging login:", err);
      }
    })();

    setLoading(false);

    // On the web, a full reload so the next page is rendered with the
    // session already in place.
    //
    // NOT in the iOS app. A hard navigation fired the instant the session is
    // written gets reported by WKWebView as a failed load, and Capacitor
    // answers a failed load with its error page - which is why a successful
    // email login showed "You're offline" on build 5, and why Try again then
    // worked. Client-side navigation never leaves the page, so there is no
    // load to fail.
    if (isNativeApp()) {
      router.replace(nextPath());
      return;
    }
    window.location.href = nextPath();
  }

  async function handleOAuthSignIn(provider: "google") {
    setLoading(true);
    setError(null);

    markTermsAcceptancePending("google_login");
    // In the app this opens an in-app Safari sheet and comes back through a
    // deep link. On the web it returns false and we fall through.
    try {
      const native = await signInWithProviderNatively("google", () => router.replace(nextPath()));
      if (native !== false) {
        if (native.ok) {
          router.replace(nextPath());
          return;
        }
        // Cancelling is not a failure - give the controls back and say nothing.
        setLoading(false);
        if (native.reason !== "cancelled") {
          setError(native.message ?? "Sign-in did not complete. Please try again.");
        }
        return;
      }
    } catch (nativeError) {
      setLoading(false);
      setError(nativeError instanceof Error ? nativeError.message : "Could not start sign-in.");
      return;
    }

    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}${nextPath()}` : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: redirectTo ? { redirectTo } : undefined,
    });

    if (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  if (loading || checkingSession) {
    return <AppLoadingScreen />;
  }

  return (
    <div className="bb-auth-public min-h-screen bg-[#FAF7EF] text-[#102D4D]">
      <LegalPageThemeReset />
      <style>{`
        .bb-login-serif { font-family: var(--font-bb-serif), "Playfair Display", Georgia, serif; }
        .bb-login-title.bb-login-title {
          color: #102D4D !important;
          -webkit-text-fill-color: #102D4D !important;
        }
        .bb-login-home.bb-login-home {
          background: #FFFFFF !important;
          color: #102D4D !important;
          -webkit-text-fill-color: #102D4D !important;
          border-color: #E7DFCE !important;
        }
        /* The theme system writes a background onto html/body, which shows as
           a grey-blue strip when the screen rubber-bands. Cream to the edges,
           the same as the app welcome screen. */
        html, body { background-color: #FAF7EF !important; background-image: none !important; }
      `}</style>

      {/* Same reason as the landing page: this renders outside the app shell. */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 pb-5 pt-5 sm:px-8">
        <BrandHomeLink className="flex items-center gap-3 text-[#102D4D]">
          <svg className="h-8 w-8 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 8.5c4.8-1.7 7.8.2 11 2.7 3.2-2.5 6.2-4.4 11-2.7v17c-4.8-1.7-7.8.2-11 2.7-3.2-2.5-6.2-4.4-11-2.7v-17Z" />
            <path d="M16 11.2v17" />
          </svg>
          <span className="text-lg font-black tracking-tight">Bible Buddy</span>
        </BrandHomeLink>
        <PublicHomeButton className="bb-login-home fixed right-5 top-5 z-50 rounded-full border px-5 py-2.5 text-sm font-black shadow-[0_10px_24px_rgba(14,26,58,0.06)] transition hover:-translate-y-0.5 sm:right-8" />
      </header>

      <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-5 pb-12 pt-6 sm:px-8">
        <div className="w-full max-w-md rounded-[24px] border border-[#EFE6D6] bg-white/85 px-6 py-8 shadow-[0_24px_60px_rgba(16,45,77,0.07)] sm:px-7">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8A9AAE]">{nativeApp ? "Email" : "Welcome back"}</p>
            <h1 className="bb-login-title bb-login-serif mt-3 text-4xl font-black leading-tight">
              {nativeApp ? "Sign in or create an account" : "Log in to Bible Buddy"}
            </h1>
            <div className="mx-auto mt-5 flex max-w-[210px] items-center justify-center gap-3 text-[#A9B7C6]">
              <span className="h-px flex-1 bg-[#A9B7C6]/70" />
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.8 8.6c0 5.4-8.8 10.2-8.8 10.2S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z" />
              </svg>
              <span className="h-px flex-1 bg-[#A9B7C6]/70" />
            </div>
            <p className="mx-auto mt-4 max-w-sm text-sm font-semibold leading-6 text-[#596575]">
              {nativeApp
                ? "Use an email address you already have. Creating a Bible Buddy account does not create an email address."
                : "Pick up your Bible study journey right where you left off."}
            </p>
          </div>

          {!nativeApp ? (
          <>
          <button
            type="button"
            onClick={() => void handleOAuthSignIn("google")}
            disabled={loading}
            className="mt-7 flex min-h-[54px] w-full items-center justify-center gap-3 rounded-[14px] border px-4 text-[15px] font-black transition active:scale-[0.99] disabled:opacity-60"
            style={{ backgroundColor: "#ffffff", borderColor: "#DCE1E8", color: "#1F2937" }}
          >
            <GoogleLogo />
            <span>Continue with Google</span>
          </button>
          {/* Guideline 4.8: offering Google means Apple must be offered too.
              Native sheet inside the app; on the web it waits for the flag. */}
          <SignInWithAppleButton
            disabled={loading}
            redirectTo={typeof window !== "undefined" ? `${window.location.origin}${nextPath()}` : undefined}
            onBeforeSignIn={() => markTermsAcceptancePending("apple_login")}
            onSignedIn={() => router.replace(nextPath())}
            onError={(message) => setError(message)}
            onBusyChange={setLoading}
            className="mt-3 flex min-h-[54px] w-full items-center justify-center gap-3 rounded-[14px] bg-black px-4 text-[15px] font-black text-white transition active:scale-[0.99] disabled:opacity-60"
          />
          <p className="mt-2 text-center text-[11px] font-semibold leading-5 text-[#596575]">By continuing you agree to our <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline">Terms</a>, <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a> and <a href="/community-guidelines" target="_blank" rel="noopener noreferrer" className="underline">Community Guidelines</a>.</p>

          <div className="my-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.16em] text-[#8A93A3]">
            <span className="h-px flex-1 bg-[#E7DFCE]" />
            or
            <span className="h-px flex-1 bg-[#E7DFCE]" />
          </div>
          </>
          ) : <div className="mt-6" />}

          <form onSubmit={handleSubmit} className="grid gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.12em] text-[#596575]">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[14px] border px-4 py-3.5 text-[15px] font-bold outline-none transition focus:border-[#102D4D]"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E3DACA", color: "#102D4D" }}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.12em] text-[#596575]">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[14px] border px-4 py-3.5 text-[15px] font-bold outline-none transition focus:border-[#102D4D]"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E3DACA", color: "#102D4D" }}
              />
              <div className="mt-2 text-right">
                <Link
                  href={email.trim() ? `/reset-password?email=${encodeURIComponent(email.trim())}` : "/reset-password"}
                  className="text-xs font-black text-[#102D4D] underline"
                >
                  Reset password
                </Link>
              </div>
            </div>

            {error && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex min-h-[54px] w-full items-center justify-center rounded-[14px] px-5 text-[15px] font-black transition active:scale-[0.99] disabled:opacity-60"
              style={{ backgroundColor: "#102D4D", color: "#FFFFFF" }}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="mt-5">
            <Link
              href={`/signup${typeof window !== "undefined" ? window.location.search : ""}`}
              className="flex min-h-[54px] w-full items-center justify-center rounded-[14px] border border-[#102D4D] px-5 text-[15px] font-black text-[#102D4D] transition active:scale-[0.99]"
            >
              Create an account
            </Link>
            <p className="mt-2 text-center text-xs font-semibold leading-5 text-[#596575]">
              New to Bible Buddy? Create an account with an email address you
              already own - this does not create a new email address.
            </p>
          </div>

          <p className="mt-4 text-center text-xs font-semibold text-[#596575]">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            {" · "}
            <Link href="/terms" className="hover:underline">Terms</Link>
            {" · "}
            <Link href="/community-guidelines" className="hover:underline">Community Guidelines</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.78-.07-1.53-.2-2.23H12v4.22h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.52Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.63-2.44l-3.24-2.51c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.76-5.6-4.12H3.05v2.59A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.4 13.89a6 6 0 0 1 0-3.78V7.52H3.05a10 10 0 0 0 0 8.96l3.35-2.59Z" />
      <path fill="#EA4335" d="M12 5.99c1.47 0 2.8.5 3.84 1.5l2.88-2.88C16.97 2.98 14.7 2 12 2a10 10 0 0 0-8.95 5.52l3.35 2.59C7.2 7.75 9.4 5.99 12 5.99Z" />
    </svg>
  );
}
