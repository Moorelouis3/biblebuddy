// app/login/page.tsx
"use client";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppLoadingScreen from "@/components/AppLoadingScreen";
import LegalPageThemeReset from "@/components/LegalPageThemeReset";
import PublicHomeButton from "@/components/PublicHomeButton";
import { supabase } from "../../lib/supabaseClient";
import { hasCachedSupabaseSession } from "../../lib/authBoot";

export default function LoginPage() {
  const router = useRouter();
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
          router.replace("/dashboard");
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
        router.replace("/dashboard");
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

    // Use window.location for full page reload to ensure cookies are set
    // This prevents middleware from running before cookies are available
    window.location.href = "/dashboard";
  }

  async function handleOAuthSignIn(provider: "google") {
    setLoading(true);
    setError(null);

    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined;
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
    <div className="bb-auth-public min-h-screen bg-[#F5F7FA] text-[#111827]">
      <LegalPageThemeReset />
      <style>{`
        .bb-login-serif { font-family: "Playfair Display", "Cormorant Garamond", "Libre Baskerville", Georgia, serif; }
        .bb-login-title.bb-login-title {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
        }
        .bb-login-home.bb-login-home {
          background: #ffffff !important;
          color: #111827 !important;
          -webkit-text-fill-color: #111827 !important;
          border-color: #E5E7EB !important;
        }
      `}</style>

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-[#111827]">
          <svg className="h-8 w-8 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 8.5c4.8-1.7 7.8.2 11 2.7 3.2-2.5 6.2-4.4 11-2.7v17c-4.8-1.7-7.8.2-11 2.7-3.2-2.5-6.2-4.4-11-2.7v-17Z" />
            <path d="M16 11.2v17" />
          </svg>
          <span className="text-lg font-black tracking-tight">Bible Buddy</span>
        </Link>
        <PublicHomeButton className="bb-login-home fixed right-5 top-5 z-50 rounded-full border px-5 py-2.5 text-sm font-black shadow-[0_10px_24px_rgba(14,26,58,0.06)] transition hover:-translate-y-0.5 sm:right-8" />
      </header>

      <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-5 pb-12 pt-6 sm:px-8">
        <div className="w-full max-w-md rounded-[30px] border border-[#E5E7EB] bg-white px-6 py-8 shadow-[0_24px_70px_rgba(17,24,39,0.10)] sm:px-7">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7BAFD4]">Welcome back</p>
            <h1 className="bb-login-title bb-login-serif mt-3 text-4xl font-black leading-tight">
              Log in to Bible Buddy
            </h1>
            <div className="mx-auto mt-5 flex max-w-[210px] items-center justify-center gap-3 text-[#7BAFD4]">
              <span className="h-px flex-1 bg-[#7BAFD4]/70" />
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.8 8.6c0 5.4-8.8 10.2-8.8 10.2S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z" />
              </svg>
              <span className="h-px flex-1 bg-[#7BAFD4]/70" />
            </div>
            <p className="mx-auto mt-4 max-w-sm text-sm font-semibold leading-6 text-[#667085]">
              Pick up your Bible study journey right where you left off.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void handleOAuthSignIn("google")}
            disabled={loading}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl border px-4 py-3 text-sm font-black transition hover:bg-[#fafafa] disabled:opacity-60"
            style={{ backgroundColor: "#ffffff", borderColor: "#E5E7EB", color: "#111827" }}
          >
            <GoogleLogo />
            <span>Continue with Google</span>
          </button>

          <div className="my-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.16em] text-[#9aa4b2]">
            <span className="h-px flex-1 bg-[#E5E7EB]" />
            or
            <span className="h-px flex-1 bg-[#E5E7EB]" />
          </div>

          <form onSubmit={handleSubmit} className="grid gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.12em] text-[#667085]">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border px-4 py-3 text-sm font-bold outline-none transition focus:border-[#7BAFD4]"
                style={{ backgroundColor: "#ffffff", borderColor: "#E5E7EB", color: "#111827" }}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-[0.12em] text-[#667085]">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border px-4 py-3 text-sm font-bold outline-none transition focus:border-[#7BAFD4]"
                style={{ backgroundColor: "#ffffff", borderColor: "#E5E7EB", color: "#111827" }}
              />
              <div className="mt-2 text-right">
                <Link
                  href={email.trim() ? `/reset-password?email=${encodeURIComponent(email.trim())}` : "/reset-password"}
                  className="text-xs font-black text-[#2563EB] hover:underline"
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
              className="mt-2 w-full rounded-2xl px-5 py-4 text-sm font-black shadow-[0_14px_28px_rgba(14,26,58,0.18)] transition disabled:opacity-60"
              style={{ backgroundColor: "#7BAFD4", color: "#ffffff" }}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm font-semibold text-[#667085]">
            Need an account?{" "}
            <Link href="/signup" className="font-black text-[#2563EB] hover:underline">
              Sign up
            </Link>
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
