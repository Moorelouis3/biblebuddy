"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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
      {/* TOP BAR */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 py-4 md:py-6">
        <div className="text-2xl font-bold text-sky-600 tracking-tight">
          Bible Buddy
        </div>
        <div className="text-xs md:text-sm text-gray-500">
          Powered by{" "}
          <span className="font-semibold text-gray-800">Hope Nation</span>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 px-4 pb-10 md:pb-16">
          {/* LEFT: TEXT + CTA */}
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              The free, fun, and effective way to study the Bible.
            </h1>

            <p className="text-gray-600 text-base md:text-lg">
              Build a real Bible reading habit with short lessons, guided plans,
              and a friendly study buddy who walks with you one chapter at a
              time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-sky-500 text-white shadow-md hover:bg-sky-600 transition"
              >
                GET STARTED
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-gray-300 text-sky-700 bg-white hover:bg-gray-50 transition"
              >
                I ALREADY HAVE AN ACCOUNT
              </Link>
            </div>

            <p className="text-xs text-gray-400 pt-1">
              No credit card needed. Just bring your Bible and your hunger for
              God.
            </p>
          </div>

          {/* RIGHT: ILLUSTRATION */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src="/landing-hero.png"
                alt="Cartoon Bible characters gathered around an open Bible"
                width={800}
                height={600}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full">
        <div className="max-w-6xl mx-auto px-4 pb-6 flex justify-center md:justify-end">
          <span className="text-xs text-gray-400">Alpha version</span>
        </div>
      </footer>
    </div>
  );
}
