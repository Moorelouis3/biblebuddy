// app/login/page.tsx
"use client";

import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Check for existing session on mount and redirect if logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleResetPassword(e: FormEvent) {
    e.preventDefault();
    if (!resetEmail.trim()) {
      setError("Please enter your email address");
      return;
    }

    setResetLoading(true);
    setError(null);
    setResetSuccess(false);

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setResetLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setResetSuccess(true);
      setResetEmail("");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER (Top Bar) */}
      <header className="w-full max-w-7xl mx-auto px-4 py-4 md:py-6 flex items-center">
        {/* Left: Logo + Text */}
        <div className="flex items-center gap-3">
          <Image
            src="/louis/louis-bible.png"
            alt="Bible Buddy Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <div>
            <div className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
              Bible Buddy
            </div>
            <div className="text-[10px] md:text-xs text-gray-500 -mt-0.5">
              <a
                href="https://joinhopenation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                Powered by Hope Nation
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-md border border-gray-200 px-6 py-8">
          <h1 className="text-2xl font-bold mb-2 text-center">
            Log in to Bible Buddy
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Pick up where you left off in Matthew.
          </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => {
                setShowResetPassword(true);
                setError(null);
                setResetSuccess(false);
              }}
              className="text-xs text-blue-600 hover:underline mt-1"
            >
              Forgot your password?
            </button>
          </div>

          {showResetPassword ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {resetSuccess && (
                <p className="text-xs text-green-600 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                  Check your email for a password reset link.
                </p>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetPassword(false);
                    setResetEmail("");
                    setError(null);
                    setResetSuccess(false);
                  }}
                  className="flex-1 rounded-full bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 shadow-sm hover:bg-gray-300"
                >
                  Back to Login
                </button>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={resetLoading}
                  className="flex-1 rounded-full bg-blue-600 text-white text-sm font-semibold py-2.5 shadow-sm hover:bg-blue-700 disabled:opacity-60"
                >
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-blue-600 text-white text-sm font-semibold py-2.5 mt-2 shadow-sm hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </>
          )}
        </form>

          <p className="text-xs text-gray-600 mt-4 text-center">
            Need an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

