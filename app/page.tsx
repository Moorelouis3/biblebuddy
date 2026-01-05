"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LandingPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
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

    // 4. SIGNUP SUCCEEDED - Clear form and show success modal
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* TOP BANNER IMAGE */}
      <div className="w-full flex justify-center pb-8 md:pb-12">
        <div className="w-full max-w-6xl px-4">
          <Image
            src="/landing-banner.png"
            alt="Bible Buddy community"
            width={1200}
            height={400}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>
      </div>

      {/* TOP BAR / HEADER */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 py-4 md:py-6">
        <div className="text-2xl font-bold text-sky-600 tracking-tight">
          BibleBuddy
        </div>
        <div className="text-xs md:text-sm text-gray-500">
          Powered by Hope Nation
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center mb-4">
            Stop just reading the Bible.
            <br />
            Start understanding the Bible.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Join over 100 people who have already started using this free Bible study app built to help you move past surface-level reading and actually understand Scripture.
          </p>

          {/* Word-Art Style CTA Text */}
          <div className="max-w-md mx-auto mb-6">
            <p className="text-2xl md:text-3xl font-bold text-center tracking-wide text-gray-900">
              Create your free account here
            </p>
          </div>

          {/* Login Button */}
          <div className="max-w-md mx-auto mb-4 text-center">
            <Link
              href="/login"
              className="inline-block rounded-full border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-2.5 bg-white hover:bg-gray-50 transition"
            >
              Log In
            </Link>
          </div>

          {/* Signup Form */}
          <div className="max-w-md mx-auto mb-16">
            <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-sky-500 text-white text-base font-semibold py-3 mt-2 shadow-md hover:bg-sky-600 disabled:opacity-60 transition"
              >
                {loading ? "Creating account..." : "Create Free Account"}
              </button>

              <p className="text-xs text-gray-500 text-center mt-2">
                Free to use. No credit card required.
              </p>
            </form>
          </div>
        </div>

        {/* VIDEO SECTION */}
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <p className="text-center text-lg text-gray-700 mb-6">
            This short video explains why Bible Buddy was created and how to use it.
          </p>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/_zfp-sS5hPY"
              title="Bible Buddy Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* COPY SECTION - THE PROBLEM */}
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            If you've ever felt stuck reading the Bible, you're not alone.
          </h2>
          <div className="prose prose-lg max-w-none text-center text-gray-700 space-y-4">
            <p>
              Names you don't recognize. Places you've never heard of. Words that feel important but aren't explained. Not knowing what to do after you read.
            </p>
            <p className="font-semibold text-lg">
              Bible Buddy was built to solve this exact problem.
            </p>
          </div>
        </div>

        {/* COPY SECTION - WHAT BIBLE BUDDY DOES */}
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 bg-gray-50 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Bible Buddy helps you slow down and understand what you're reading.
          </h2>
          <ul className="space-y-4 max-w-2xl mx-auto">
            <li className="flex items-start">
              <span className="text-sky-500 mr-3 text-xl">•</span>
              <span className="text-lg text-gray-700">Guided reading so you always know what to read next</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-500 mr-3 text-xl">•</span>
              <span className="text-lg text-gray-700">Built-in explanations for people, places, and key words</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-500 mr-3 text-xl">•</span>
              <span className="text-lg text-gray-700">Notes that connect verses to the bigger story of Scripture</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-500 mr-3 text-xl">•</span>
              <span className="text-lg text-gray-700">Progress tracking so you can actually see your growth over time</span>
            </li>
          </ul>
        </div>

        {/* COPY SECTION - WHO IT'S FOR */}
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Bible Buddy is for you if:
          </h2>
          <ul className="space-y-4 max-w-2xl mx-auto">
            <li className="flex items-start">
              <span className="text-sky-500 mr-3 text-xl">•</span>
              <span className="text-lg text-gray-700">You want to understand Scripture, not just finish chapters</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-500 mr-3 text-xl">•</span>
              <span className="text-lg text-gray-700">You struggle with consistency or direction</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-500 mr-3 text-xl">•</span>
              <span className="text-lg text-gray-700">You want structure without feeling overwhelmed</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-500 mr-3 text-xl">•</span>
              <span className="text-lg text-gray-700">You want a tool that actually helps you learn the Bible</span>
            </li>
          </ul>
        </div>

        {/* CREDIBILITY SECTION */}
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Built by Bible Study With Louis
          </h2>
          <div className="text-lg text-gray-700 text-center max-w-2xl mx-auto space-y-4">
            <p>
              Bible Buddy was created as an extension of years of Bible teaching inside Hope Nation.
            </p>
            <p>
              This is not a devotional app.
            </p>
            <p>
              This is not a reading streak app.
            </p>
            <p>
              It's a Bible study tool built to help you actually learn and understand Scripture.
            </p>
          </div>
        </div>

        {/* FINAL CTA SECTION */}
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center space-y-6">
            <p className="text-2xl md:text-3xl font-bold">
              Ready to stop guessing and start understanding the Bible?
            </p>
            <div>
              <button
                onClick={() => {
                  const heroSection = document.querySelector('main');
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-block rounded-full bg-sky-500 text-white text-base font-semibold px-8 py-3 shadow-md hover:bg-sky-600 transition"
              >
                Create Free Account
              </button>
            </div>
          </div>
        </div>

        {/* LOGIN LINK */}
        <div className="max-w-4xl mx-auto px-4 pb-12 md:pb-16">
          <div className="text-center">
            <Link
              href="/login"
              className="inline-block text-lg text-sky-600 hover:text-sky-700 font-semibold underline"
            >
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </main>

      {/* Success Modal */}
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
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
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
