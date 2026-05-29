"use client";

import { FormEvent, Suspense, type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LegalPageThemeReset from "@/components/LegalPageThemeReset";
import PublicHomeButton from "@/components/PublicHomeButton";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

const LogoHeader = () => (
  <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-5 py-5 sm:px-8" role="banner">
    <div className="flex items-center gap-3 text-[#111827]">
      <Image src="/Newforreallogoicon.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0 rounded-lg object-cover" />
      <span className="text-lg font-black tracking-tight">Bible Buddy</span>
    </div>
    <PublicHomeButton className="bb-reset-home fixed right-5 top-5 z-50 rounded-full border px-5 py-2.5 text-sm font-black shadow-[0_10px_24px_rgba(14,26,58,0.06)] transition hover:-translate-y-0.5 sm:right-8" />
  </div>
);

const ResetShell = ({ children }: { children: ReactNode }) => (
  <div className="bb-auth-public min-h-screen bg-[#F5F7FA] text-[#111827]">
    <LegalPageThemeReset />
    <style>{`
      .bb-reset-serif { font-family: "Playfair Display", "Cormorant Garamond", "Libre Baskerville", Georgia, serif; }
      .bb-reset-title.bb-reset-title {
        color: #000000 !important;
        -webkit-text-fill-color: #000000 !important;
      }
      .bb-reset-home.bb-reset-home {
        background: #ffffff !important;
        border-color: #E5E7EB !important;
        color: #111827 !important;
        -webkit-text-fill-color: #111827 !important;
      }
    `}</style>
    <LogoHeader />
    <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-5 pb-12 pt-6 sm:px-8">
      {children}
    </main>
  </div>
);

const ResetCard = ({ children }: { children: ReactNode }) => (
  <div className="w-full max-w-md rounded-[30px] border border-[#E5E7EB] bg-white px-6 py-8 shadow-[0_24px_70px_rgba(17,24,39,0.10)] sm:px-7">
    {children}
  </div>
);

const ResetTitle = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-7 text-center">
    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7BAFD4]">Account help</p>
    <h1 className="bb-reset-title bb-reset-serif mt-3 text-4xl font-black leading-tight text-black">
      {title}
    </h1>
    <div className="mx-auto mt-5 flex max-w-[210px] items-center justify-center gap-3 text-[#7BAFD4]">
      <span className="h-px flex-1 bg-[#7BAFD4]/70" />
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.8 8.6c0 5.4-8.8 10.2-8.8 10.2S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z" />
      </svg>
      <span className="h-px flex-1 bg-[#7BAFD4]/70" />
    </div>
    <p className="mx-auto mt-4 max-w-sm text-sm font-semibold leading-6 text-[#667085]">
      {description}
    </p>
  </div>
);

const inputClass = "w-full rounded-2xl border px-4 py-3 text-sm font-bold outline-none focus:border-[#7BAFD4]";
const inputStyle = { backgroundColor: "#ffffff", borderColor: "#E5E7EB", color: "#111827" };
const primaryButtonClass = "w-full rounded-2xl px-4 py-4 text-sm font-black text-white shadow-[0_18px_40px_rgba(14,26,58,0.18)] transition hover:-translate-y-0.5 disabled:opacity-60";

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
        const { error: sessionError } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
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
        const { error: verifyError } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "recovery" });
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

      const accessTokenQuery = searchParams.get("access_token");
      const refreshTokenQuery = searchParams.get("refresh_token");
      if (accessTokenQuery && refreshTokenQuery && typeQuery === "recovery") {
        const { error: sessionError } = await supabase.auth.setSession({ access_token: accessTokenQuery, refresh_token: refreshTokenQuery });
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

    const { error: updateError } = await supabase.auth.updateUser({ password: password.trim() });
    setLoading(false);

    if (updateError) {
      setError(updateError.message || "Failed to reset password. The link may have expired.");
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    }
  }

  if (isValidToken === null) {
    return (
      <ResetShell>
        <ResetCard>
          <p className="text-center text-sm font-semibold text-[#667085]">Verifying reset link...</p>
        </ResetCard>
      </ResetShell>
    );
  }

  if (isValidToken === false) {
    return (
      <ResetShell>
        <ResetCard>
          <ResetTitle title="Reset Your Password" description="Enter your email and we'll send you a link to create a new password." />

          <form onSubmit={handleRequestReset} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#667085]">Email</label>
              <input
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className={inputClass}
                style={inputStyle}
                placeholder="you@example.com"
              />
            </div>

            {error && <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">{error}</p>}
            {resetRequestSent && <p className="rounded-xl border border-[#E5E7EB] bg-[#EAF5FF] px-3 py-2 text-xs font-semibold text-[#111827]">Check your email for a password reset link.</p>}

            <button type="submit" disabled={loading} className={primaryButtonClass} style={{ backgroundColor: "#7BAFD4", color: "#ffffff" }}>
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>

          <Link href="/login" className="mt-5 block text-center text-xs font-black text-[#2563EB] hover:underline">
            Back to login
          </Link>
        </ResetCard>
      </ResetShell>
    );
  }

  if (success) {
    return (
      <ResetShell>
        <ResetCard>
          <ResetTitle title="Password Reset Successful" description="Your password has been updated. Redirecting to login..." />
        </ResetCard>
      </ResetShell>
    );
  }

  return (
    <ResetShell>
      <ResetCard>
        <ResetTitle title="Reset Your Password" description="Enter your new password below." />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#667085]">New Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="Enter new password"
              minLength={6}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[#667085]">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="Confirm new password"
              minLength={6}
            />
          </div>

          {error && <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className={primaryButtonClass} style={{ backgroundColor: "#7BAFD4", color: "#ffffff" }}>
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs font-semibold text-[#667085]">
          Remember your password?{" "}
          <Link href="/login" className="font-black text-[#2563EB] hover:underline">
            Log in
          </Link>
        </p>
      </ResetCard>
    </ResetShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <ResetShell>
          <ResetCard>
            <p className="text-center text-sm font-semibold text-[#667085]">Loading...</p>
          </ResetCard>
        </ResetShell>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
