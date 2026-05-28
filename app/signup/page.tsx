"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LegalPageThemeReset from "@/components/LegalPageThemeReset";
import PublicHomeButton from "@/components/PublicHomeButton";
import { supabase } from "../../lib/supabaseClient";
import { ACTION_TYPE } from "../../lib/actionTypes";

const DASHBOARD_ENTRY_PATH = "/dashboard";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referrerUserId] = useState(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    const referrerFromUrl = params.get("referrer") || params.get("invitedBy") || "";
    return referrerFromUrl.trim() || localStorage.getItem("bb:pending-referrer-user-id") || "";
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (referrerUserId) {
      localStorage.setItem("bb:pending-referrer-user-id", referrerUserId);
    }

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push(DASHBOARD_ENTRY_PATH);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push(DASHBOARD_ENTRY_PATH);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [referrerUserId, router]);

  async function recordSignup(userId: string, userEmail: string | undefined, username: string) {
    try {
      await supabase.from("user_signups").insert({
        user_id: userId,
        email: userEmail,
      });
    } catch (analyticsError) {
      console.error("Analytics insert error (non-blocking):", analyticsError);
    }

    try {
      await supabase.from("master_actions").insert({
        user_id: userId,
        username,
        action_type: ACTION_TYPE.user_signup,
        action_label: "Signed up for Bible Buddy",
        created_at: new Date().toISOString(),
      });
    } catch (actionTrackingError) {
      console.error("Signup action tracking error (non-blocking):", actionTrackingError);
    }

    try {
      await fetch("/api/send-welcome-dm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, firstName: username, lastName: "" }),
      });
    } catch (welcomeError) {
      console.error("Welcome DM failed (non-blocking):", welcomeError);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    const username = normalizedEmail.split("@")[0] || "New User";

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: normalizedPassword,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}${DASHBOARD_ENTRY_PATH}` : undefined,
        data: {
          firstName: username,
          first_name: username,
          display_name: username,
        },
      },
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    const user = data.user;
    if (!user) {
      setLoading(false);
      setError("Signup failed: no user returned.");
      return;
    }
    if (Array.isArray(user.identities) && user.identities.length === 0) {
      setLoading(false);
      setError("This email may already have an account. Please log in instead, or use a different email.");
      return;
    }

    void recordSignup(user.id, user.email, username);

    if (data.session) {
      await applyReferralCodeIfPresent();
      router.push(DASHBOARD_ENTRY_PATH);
      return;
    }

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: normalizedPassword,
    });

    if (loginData.session) {
      await applyReferralCodeIfPresent();
      router.push(DASHBOARD_ENTRY_PATH);
      return;
    }

    setLoading(false);
    setError(
      loginError?.message?.toLowerCase().includes("email not confirmed")
        ? "Your account was created, but Supabase email confirmation is still turned on. Turn it off in Supabase Auth so new users can enter the dashboard immediately."
        : loginError?.message || "Account created, but Bible Buddy could not start your session yet. Try logging in."
    );
  }

  async function applyReferralCodeIfPresent() {
    const pendingReferrerUserId = referrerUserId.trim() || localStorage.getItem("bb:pending-referrer-user-id") || "";
    if (!pendingReferrerUserId) return;
    try {
      const res = await fetch("/api/ambassador/apply-code", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ referrerUserId: pendingReferrerUserId }),
      });
      if (res.ok) {
        localStorage.removeItem("bb:pending-referrer-user-id");
      }
    } catch (referralError) {
      console.error("Bible Buddy invite apply failed (non-blocking):", referralError);
    }
  }

  async function handleOAuthSignIn(provider: "google") {
    setLoading(true);
    setError(null);

    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}${DASHBOARD_ENTRY_PATH}` : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: redirectTo ? { redirectTo } : undefined,
    });

    if (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className="bb-auth-public flex min-h-screen flex-col bg-[#fffdf8] text-[#07162f]">
      <LegalPageThemeReset />
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-4 py-4 md:py-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/Newlouiswave.png"
            alt="Bible Buddy Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <div className="text-lg font-bold tracking-tight text-gray-900 md:text-xl">
            Bible Buddy
          </div>
        </Link>
        <PublicHomeButton className="fixed right-5 top-5 z-50 rounded-full border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-black text-[#111827] shadow-[0_10px_24px_rgba(17,24,39,0.06)] transition hover:-translate-y-0.5 sm:right-8" />
      </header>

      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-[#eadfcd] bg-white/88 px-6 py-8 shadow-[0_24px_70px_rgba(7,22,47,0.08)]">
          <h1 className="mb-2 text-center text-3xl font-black text-[#07162f]">
            Start your Bible journey
          </h1>
          <p className="mb-7 text-center text-sm font-semibold leading-6 text-[#526075]">
            Create your account and go straight to today&apos;s lesson.
          </p>

          <div className="grid gap-2">
            <button
              type="button"
              onClick={() => void handleOAuthSignIn("google")}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#d9e3ee] bg-white px-4 py-3 text-sm font-black text-[#07162f] transition hover:bg-[#f8fbff] disabled:opacity-60"
            >
              <GoogleLogo />
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="my-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
            <span className="h-px flex-1 bg-[#eadfcd]" />
            or
            <span className="h-px flex-1 bg-[#eadfcd]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-[#d9e3ee] bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-[#d9e3ee] bg-white px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]"
                placeholder="Create a password"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-[#135397] py-3 text-sm font-black text-white shadow-[0_16px_32px_rgba(19,83,151,0.18)] hover:bg-[#0f4279] disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-black hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
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
