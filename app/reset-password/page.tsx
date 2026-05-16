"use client";

import { FormEvent, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

// Logo component for reset password page (shared across all states)
const LogoHeader = () => (
  <header className="w-full max-w-7xl mx-auto px-4 py-4 md:py-6 flex items-center">
    <div className="flex items-center gap-3">
      <Image
        src="/Newlouiswave.png"
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
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >

          </a>
        </div>
      </div>
    </div>
  </header>
);

function getPasswordResetRedirectUrl() {
  if (typeof window === "undefined") return "https://www.mybiblebuddy.net/reset-password";
  const origin = window.location.origin;
  if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
    return `${origin}/reset-password`;
  }
  return "https://www.mybiblebuddy.net/reset-password";
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [resetEmail, setResetEmail] = useState(() => searchParams.get("email") || "");
  const [resetRequestSent, setResetRequestSent] = useState(false);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);

  useEffect(() => {
    // Supabase recovery links can arrive as:
    // 1. PKCE query code: /reset-password?code=...
    // 2. Implicit hash tokens: /reset-password#access_token=...&refresh_token=...&type=recovery
    // 3. Email template token_hash: /reset-password?token_hash=...&type=recovery
    const checkToken = async () => {
      setError(null);
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      const type = hashParams.get("type");
      const code = searchParams.get("code");
      const tokenHash = searchParams.get("token_hash");
      const typeQuery = searchParams.get("type");

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          setError("This reset link is invalid or expired. Please request a new one.");
          setIsValidToken(false);
          return;
        }
        setHasRecoverySession(true);
        setIsValidToken(true);
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      if (accessToken && refreshToken && type === "recovery") {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (sessionError) {
          setError("This reset link is invalid or expired. Please request a new one.");
          setIsValidToken(false);
          return;
        }
        setHasRecoverySession(true);
        setIsValidToken(true);
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      if (tokenHash && typeQuery === "recovery") {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: "recovery",
        });
        if (verifyError) {
          setError("This reset link is invalid or expired. Please request a new one.");
          setIsValidToken(false);
          return;
        }
        setHasRecoverySession(true);
        setIsValidToken(true);
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      // Some email clients can rewrite hash params into query params.
      const accessTokenQuery = searchParams.get("access_token");
      const refreshTokenQuery = searchParams.get("refresh_token");
      if (accessTokenQuery && refreshTokenQuery && typeQuery === "recovery") {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessTokenQuery,
          refresh_token: refreshTokenQuery,
        });
        if (sessionError) {
          setError("This reset link is invalid or expired. Please request a new one.");
          setIsValidToken(false);
          return;
        }
        setHasRecoverySession(true);
        setIsValidToken(true);
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (data.session) {
          setIsValidToken(true);
          setHasRecoverySession(true);
          return;
      }

      setIsValidToken(false);
    };

    void checkToken();
  }, [searchParams]);

  async function handleRequestReset(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setResetRequestSent(false);

    const email = resetEmail.trim();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getPasswordResetRedirectUrl(),
    });
    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setResetRequestSent(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!password.trim()) {
      setError("Please enter a new password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    if (!hasRecoverySession) {
      setError("Invalid or expired reset link. Please request a new one.");
      setLoading(false);
      return;
    }

    // Update password using Supabase
    const { error: updateError } = await supabase.auth.updateUser({
      password: password.trim(),
    });

    setLoading(false);

    if (updateError) {
      setError(updateError.message || "Failed to reset password. The link may have expired.");
    } else {
      setSuccess(true);
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }

  if (isValidToken === null) {
    // Still checking token
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <LogoHeader />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-md border border-gray-200 px-6 py-8">
            <p className="text-center text-gray-600">Verifying reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isValidToken === false) {
    // No token yet: let the user request a reset link.
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <LogoHeader />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-md border border-gray-200 px-6 py-8">
            <h1 className="text-2xl font-bold mb-2 text-center">Reset Your Password</h1>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Enter your email and we’ll send you a link to create a new password.
            </p>

            <form onSubmit={handleRequestReset} className="space-y-4">
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

              {resetRequestSent && (
                <p className="text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                  Check your email for a password reset link.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-blue-600 text-white text-sm font-semibold py-2.5 shadow-sm hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>

            <Link
              href="/login"
              className="mt-4 block text-center text-xs font-semibold text-blue-600 hover:underline"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <LogoHeader />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-md border border-gray-200 px-6 py-8">
            <h1 className="text-2xl font-bold mb-2 text-center">Password Reset Successful!</h1>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Your password has been updated. Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <LogoHeader />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-md border border-gray-200 px-6 py-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Reset Your Password</h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Enter your new password below.
          </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
              minLength={6}
            />
          </div>

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
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4 text-center">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Log in
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <LogoHeader />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-md border border-gray-200 px-6 py-8">
              <p className="text-center text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
