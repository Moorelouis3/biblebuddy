"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";

export default function LandingPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Check for existing session on mount and redirect if logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
        return;
      }
      setIsChecking(false);
    };
    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/dashboard");
      } else {
        setIsChecking(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowSuccessModal(false);

    // Split name into first and last (if provided)
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // 1. SIGN USER UP
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // 2. GET THE USER ID
    const user = data.user;
    if (!user) {
      setError("Signup failed: no user returned.");
      setLoading(false);
      return;
    }

    // 3. INSERT INTO user_signups TABLE (non-blocking, analytics only)
    try {
      const { error: insertError } = await supabase
        .from("user_signups")
        .insert({
          user_id: user.id,
          email: user.email,
        });

      if (insertError) {
        console.error("Analytics insert failed (non-blocking):", insertError);
      }
    } catch (analyticsError) {
      console.error("Analytics insert error (non-blocking):", analyticsError);
    }

    // 4. INSERT INTO master_actions for signup tracking (non-blocking, analytics only)
    try {
      const firstName = nameParts[0] || "";
      const username = firstName || user.email?.split("@")[0] || "New User";
      
      const { error: actionError } = await supabase
        .from("master_actions")
        .insert({
          user_id: user.id,
          username: username,
          action_type: ACTION_TYPE.user_signup,
          action_label: "Signed up for Bible Buddy",
          created_at: new Date().toISOString(),
        });

      if (actionError) {
        console.error("Signup action tracking failed (non-blocking):", actionError);
      }
    } catch (actionTrackingError) {
      console.error("Signup action tracking error (non-blocking):", actionTrackingError);
    }

    // 5. SIGNUP SUCCEEDED - Clear form and show success modal
    setLoading(false);
    setName("");
    setEmail("");
    setPassword("");
    setShowSuccessModal(true);
  }

  // Don't render content until we've checked for session (prevents flash)
  if (isChecking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#fefefe" }}>
      {/* HEADER (Top Bar) */}
      <header className="w-full max-w-7xl mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
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

        {/* Right: Log In + Sign Up */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm md:text-base text-gray-700 hover:text-gray-900 font-medium transition"
          >
            Log In
          </Link>
          <button
            type="button"
            onClick={() => setShowSignupModal(true)}
            className="inline-block rounded-full bg-blue-600 text-white text-sm md:text-base font-semibold px-5 md:px-6 py-2 md:py-2.5 shadow-md hover:bg-blue-700 transition"
          >
            Sign Up →
          </button>
        </div>
      </header>

      {/* MAIN CONTENT (Centered, Above the Fold) */}
      <main className="w-full flex justify-center px-4 pt-8 pb-4 md:pt-10 md:pb-6">
        <div className="w-full max-w-5xl mx-auto">
          {/* Headline Section */}
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
              Study the Bible Smarter with Bible Buddy
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Learn how to understand the Bible with an interactive, in depth study experience.
            </p>
          </div>

          {/* VSL Video Section (MAIN FOCUS) */}
          <div className="mb-2 md:mb-2">
            <div className="relative max-w-4xl mx-auto">
              {/* Subtle glow effect behind video */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-gray-50/50 rounded-2xl blur-2xl -z-10"></div>
              
              {/* Video Container */}
              <div className="p-2 md:p-3">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <Image
                    src="/LandingPage1.png"
                    alt="Bible Buddy preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    style={{
                      WebkitMaskImage: "radial-gradient(120% 120% at 50% 40%, #000 70%, transparent 100%)",
                      maskImage: "radial-gradient(120% 120% at 50% 40%, #000 70%, transparent 100%)",
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="text-center mb-3 md:mb-4">
            <button
              type="button"
              onClick={() => setShowSignupModal(true)}
              className="inline-block rounded-lg bg-blue-600 text-white text-base md:text-lg font-semibold px-8 md:px-10 py-3 md:py-4 shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Try Bible Buddy Now →
            </button>
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              Create Your Bible Buddy Account Now
            </p>
          </div>

        </div>
      </main>

      <section className="w-full" style={{ backgroundColor: "#fefefe" }}>
        <div className="max-w-6xl mx-auto px-4 pt-0 pb-12 md:pb-16">
          <div className="text-center mb-10 md:mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
            <div className="space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 6.5C2 5.12 3.12 4 4.5 4H12a3 3 0 0 1 3 3v13H4.5A2.5 2.5 0 0 0 2 22Z" />
                <path d="M12 4h7.5A2.5 2.5 0 0 1 22 6.5V22H15" />
              </svg>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Interactive Bible</h3>
              <p className="text-sm md:text-base text-gray-600">
                Read Scripture with clarity, save your progress, and pick up exactly where you left off without losing your place.
              </p>
            </div>

            <div className="space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a8 8 0 1 0-14.8 0" />
                <path d="M12 2v2" />
              </svg>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Guided Studies</h3>
              <p className="text-sm md:text-base text-gray-600">
                Devotionals, study guides, and Bible reading plans designed to help you slow down and build a consistent habit of reading the Bible.
              </p>
            </div>

            <div className="space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Bible Help</h3>
              <p className="text-sm md:text-base text-gray-600">
                Access a growing database of over 5,000 explanations for biblical people, places, and key terms to understand historical and cultural context.
              </p>
            </div>

            <div className="space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="6" y="4" width="12" height="16" rx="2" />
                <path d="M9 8h6" />
                <path d="M9 12h6" />
                <path d="M9 16h4" />
              </svg>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Chapter Reviews</h3>
              <p className="text-sm md:text-base text-gray-600">
                Each chapter includes a clear overview explaining what’s happening, the main theme, and how it fits into the larger story of Scripture.
              </p>
            </div>

            <div className="space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Bible Trivia</h3>
              <p className="text-sm md:text-base text-gray-600">
                Reinforce what you’ve read with over 10,000 Bible trivia questions designed to help you remember and apply Scripture.
              </p>
            </div>

            <div className="space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2c1.8 3.6 1.5 6.1 0 8.5 2.7-.2 4.5-2.1 4.5-4.8 3.3 3 3.7 8.1.6 11.6-2.9 3.3-8.2 3.4-11.1.3C2.1 14 2.6 8.9 6 6c0 2.7 1.9 4.6 4.6 4.8" />
              </svg>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Streak Tracker</h3>
              <p className="text-sm md:text-base text-gray-600">
                Track your reading streak and stay consistent as you build a daily habit of spending time in the Bible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-gray-700 border-t border-gray-200 mt-4">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left column - Connect with me */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Connect with me (I&apos;m very responsive)
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.youtube.com/@BibleStudyWithLouis"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/biblestudywithlouis"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.threads.net/@biblestudywithlouis"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  Threads
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@biblestudywithlouis"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100085924826685"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Middle column - Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Right column - Brand + Description */}
          <div className="text-sm md:text-base">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Bible Buddy
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-sm">
              An interactive Bible study app built to help you understand
              Scripture, not just read it.
            </p>
          </div>
        </div>

        {/* Copyright row */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4 text-xs md:text-sm text-gray-500 text-center md:text-right">
            © 2026 Bible Buddy — Powered by Hope Nation
          </div>
        </div>
      </footer>

      {/* SIGNUP MODAL */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 md:p-7 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowSignupModal(false)}
              className="absolute right-4 top-3 text-sm text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl md:text-2xl font-bold mb-1 text-gray-900 text-center">
              Create your free Bible Buddy account
            </h2>
            <p className="text-xs text-gray-500 mb-4 text-center">
              Free to use. No credit card required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 mt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
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
                className="w-full rounded-lg bg-blue-600 text-white text-sm font-semibold py-2.5 mt-1 shadow-md hover:bg-blue-700 disabled:opacity-60 transition"
              >
                {loading ? "Creating account..." : "Create Free Account"}
              </button>

              <p className="text-[10px] text-gray-500 text-center mt-1.5">
                By creating an account, you agree to the terms of service and privacy policy.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                Account created successfully!
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Please check your email to confirm your account before logging in.
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setShowSignupModal(false);
                }}
                className="w-full px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
