"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LegalPageThemeReset from "@/components/LegalPageThemeReset";
import PublicHomeButton from "@/components/PublicHomeButton";
import { supabase } from "../../lib/supabaseClient";
import { ACTION_TYPE } from "../../lib/actionTypes";

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
        router.push("/dashboard?view=bible-year&day=1");
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/dashboard?view=bible-year&day=1");
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
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/dashboard?view=bible-year&day=1` : undefined,
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
      router.push("/dashboard?view=bible-year&day=1");
      return;
    }

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: normalizedPassword,
    });

    if (loginData.session) {
      await applyReferralCodeIfPresent();
      router.push("/dashboard?view=bible-year&day=1");
      return;
    }

    setLoading(false);
    setError(
      loginError?.message?.toLowerCase().includes("email not confirmed")
        ? "Your account was created, but Supabase email confirmation is still turned on. Turn it off in Supabase Auth so new users can start onboarding right away."
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

    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/dashboard?view=bible-year&day=1` : undefined;
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
    <div className="bb-auth-public flex min-h-screen flex-col bg-[#F5F7FA]">
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

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white px-6 py-8 shadow-md">
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-950">
            Create your Bible Buddy account
          </h1>
          <p className="mb-6 text-center text-sm text-gray-600">
            Start with email and password, then jump straight into your Bible in One Year journey.
          </p>

          <div className="grid gap-2">
            <button
              type="button"
              onClick={() => void handleOAuthSignIn("google")}
              disabled={loading}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-gray-50 disabled:opacity-60"
            >
              Continue with Google
            </button>
          </div>

          <div className="my-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            or
            <span className="h-px flex-1 bg-gray-200" />
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
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]"
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
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]"
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
              className="mt-2 w-full rounded-full bg-[#7BAFD4] py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6AA0C8] disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign up"}
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
