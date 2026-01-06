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
      {/* HEADER (Top Bar) */}
      <header className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8 flex items-center justify-between">
        <div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Bible Buddy
          </div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">
            Powered by Hope Nation
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm md:text-base text-gray-700 hover:text-gray-900 font-medium transition"
          >
            Log In
          </Link>
          <Link
            href="#signup"
            className="text-sm md:text-base text-gray-700 hover:text-gray-900 font-medium transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 w-full">
        <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8 md:mb-12">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-gray-900">
              Don't just read the Bible,
              <br />
              Learn how to Study
              <br />
              and <span className="text-blue-600">Understand it.</span>
            </h1>

            {/* Hero Image - Laptop Mockup */}
            <div className="relative max-w-4xl mx-auto mb-8">
              {/* Decorative horizontal lines behind laptop */}
              <div className="absolute inset-0 flex flex-col justify-center items-center -z-10">
                <div className="w-full max-w-3xl h-px bg-gray-200 mb-4"></div>
                <div className="w-full max-w-2xl h-px bg-yellow-100 mb-4"></div>
                <div className="w-full max-w-3xl h-px bg-gray-200"></div>
              </div>
              
              {/* Laptop mockup image */}
              <div className="relative w-full max-w-4xl mx-auto">
                <Image
                  src="/images/landing/bible-buddy-laptop.webp"
                  alt="Bible Buddy App Screenshot"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg shadow-2xl"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* Primary CTA Button */}
            <div className="mb-8">
              <a
                href="#signup"
                className="inline-block rounded-lg bg-blue-600 text-white text-base md:text-lg font-semibold px-8 md:px-10 py-3 md:py-4 shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
              >
                Try Bible Buddy Now →
              </a>
            </div>
          </div>
        </section>

        {/* FEATURE BOXES (4 CARDS) */}
        <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Bible</h3>
              <p className="text-gray-600 leading-relaxed">
                Tap to reveal helpful explanations as you read.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Simple Note Taking</h3>
              <p className="text-gray-600 leading-relaxed">
                Easily jot down and organize your own thoughts.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Full Bible Database</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore people, places, and keywords effortlessly.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Perfect Study App</h3>
              <p className="text-gray-600 leading-relaxed">
                The ideal tool to truly study and grasp the Bible.
              </p>
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION (CENTERED COPY) */}
        <section className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The Problem Isn't Reading the Bible —
              <br />
              It's Understanding It.
            </h2>
            <div className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto space-y-4">
              <p>
                Most Bible apps only offer more reading plans.
              </p>
              <p>
                Bible Buddy helps you truly understand what you're reading through in-depth explanations and an interactive Bible study experience.
              </p>
            </div>
          </div>
        </section>

        {/* VIDEO SECTION */}
        <section className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/_zfp-sS5hPY"
                title="Bible Buddy Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* SIGNUP FORM SECTION */}
        <section id="signup" className="max-w-md mx-auto px-4 py-8 md:py-12">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg border border-gray-200 p-6 md:p-8 shadow-sm">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full rounded-lg bg-blue-600 text-white text-base font-semibold py-3 mt-2 shadow-md hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {loading ? "Creating account..." : "Create Free Account"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-2">
              Free to use. No credit card required.
            </p>
          </form>
        </section>
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
