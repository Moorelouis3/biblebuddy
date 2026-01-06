"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LandingPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

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
              Powered by Hope Nation
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
          <Link
            href="/login"
            className="inline-block rounded-lg bg-blue-600 text-white text-sm md:text-base font-semibold px-5 md:px-6 py-2 md:py-2.5 shadow-md hover:bg-blue-700 transition"
          >
            Sign Up →
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT (Centered, Above the Fold) */}
      <main className="flex-1 w-full flex items-center justify-center px-4 py-8 md:py-12">
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
          <div className="mb-6 md:mb-8">
            <div className="relative max-w-4xl mx-auto">
              {/* Subtle glow effect behind video */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-gray-50/50 rounded-2xl blur-2xl -z-10"></div>
              
              {/* Video Container */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 md:p-3">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    src="https://www.youtube.com/embed/_zfp-sS5hPY"
                    title="Bible Buddy Introduction"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="text-center mb-6 md:mb-8">
            <Link
              href="/login"
              className="inline-block rounded-lg bg-blue-600 text-white text-base md:text-lg font-semibold px-8 md:px-10 py-3 md:py-4 shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Try Bible Buddy Now →
            </Link>
          </div>

          {/* Minimal Feature Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm md:text-base text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-lg">📖</span>
              <span>Interactive Bible</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🗺️</span>
              <span>Full Bible Database</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✍️</span>
              <span>Simple Notes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <span>Built for Understanding</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
