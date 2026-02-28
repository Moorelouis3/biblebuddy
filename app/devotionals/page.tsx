"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

interface Devotional {
  id: string;
  title: string;
  description: string;
  total_days: number;
}

export default function DevotionalsPage() {
  const router = useRouter();
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [tempDontShowAgain, setTempDontShowAgain] = useState(false);

  // Load "Don't show again" preference from localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem("devotional-instructions-dont-show-again");
    if (savedPreference === "true") {
      setDontShowAgain(true);
      setIsInstructionsExpanded(false); // Start collapsed if user dismissed
    }
  }, []);

  useEffect(() => {
    async function loadDevotionals() {
      try {
        const { data, error } = await supabase
          .from("devotionals")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading devotionals:", error);
          return;
        }

        setDevotionals(data || []);
      } catch (err) {
        console.error("Error loading devotionals:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDevotionals();
  }, []);

  const handleToggleInstructions = () => {
    setIsInstructionsExpanded(!isInstructionsExpanded);
  };

  const handleCloseInstructions = () => {
    setIsInstructionsExpanded(false);
    
    // If "Don't show again" is checked, save preference
    if (tempDontShowAgain) {
      localStorage.setItem("devotional-instructions-dont-show-again", "true");
      setDontShowAgain(true);
    }
  };

  // Get cover image path based on devotional title
  const getCoverImage = (title: string): string | null => {
    // "The Tempting of Jesus" has a cover image
    if (title === "The Tempting of Jesus") {
      return "/images/temptingofjesus.png";
    }
    // "The Testing of Joseph" has a cover image
    if (title === "The Testing of Joseph") {
      return "/Thetestingofjoseph.png";
    }
    // Future devotionals can be added here
    return null;
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Devotionals</h1>
          <div className="text-gray-500">Loading devotionals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Devotionals</h1>

        {/* INSTRUCTIONS CALLOUT */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-sm mb-6">
          {/* HEADER - Clickable */}
          <button
            type="button"
            onClick={handleToggleInstructions}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-blue-100/50 transition rounded-t-xl"
          >
            <h2 className="text-lg font-semibold text-gray-900">📖 About Our Devotionals</h2>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${isInstructionsExpanded ? '' : 'transform -rotate-90'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* CONTENT - Collapsible */}
          {isInstructionsExpanded && (
            <div className="px-6 pb-6 border-t border-blue-200/50">
              <div className="pt-4 space-y-4">
                <h3 className="text-base font-semibold text-gray-900">📖 How to Use These Devotionals</h3>
                
                <p className="text-gray-700 leading-relaxed">
                  Each devotional is meant to be done daily, at a slow and intentional pace.
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Step 1: Read the Devotional</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Start by reading the daily narrative. This sets the theme and helps you understand what's happening and why it matters.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Step 2: Read the Bible Passage</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Don't skip this. This is where the real power is — in God's actual Word.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Step 3: Reflect Honestly</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Sit with the reflection question and respond thoughtfully. Let it challenge you, not rush you.
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-sm italic">
                  I recommend spending about 30 minutes a day.
                </p>

                <p className="text-gray-700 leading-relaxed text-sm">
                  If you stay consistent, you won't just finish a devotional — you'll walk away stronger, wiser, and closer to God than when you started.
                </p>

                {/* FOOTER CONTROLS */}
                <div className="pt-4 border-t border-blue-200/50 flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempDontShowAgain}
                      onChange={(e) => setTempDontShowAgain(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Don't show this again</span>
                  </label>
                  
                  <button
                    type="button"
                    onClick={handleCloseInstructions}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {devotionals.length === 0 ? (
          <div className="text-gray-500">
            No devotionals available yet. Check back soon!
          </div>
        ) : (
          <>
            {/* Mobile: Vertical scroll list */}
            <div className="flex flex-col md:hidden gap-6">
              {/* Active Devotionals (clickable) */}
              {devotionals.map((devotional) => {
                const coverImage = getCoverImage(devotional.title);
                if (!coverImage) return null;
                const isTemptingOfJesus = devotional.title === "The Tempting of Jesus";
                const card = (
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-xl hover:scale-[1.01] transition-all duration-200 cursor-pointer">
                    <img
                      src={coverImage}
                      alt={`${devotional.title} cover`}
                      className="w-full h-auto rounded-lg object-contain"
                    />
                    <div className="mt-3 text-lg font-semibold text-gray-900 text-center">
                      {devotional.title}
                    </div>
                  </div>
                );
                if (isTemptingOfJesus) {
                  return (
                    <div
                      key={devotional.id}
                      role="link"
                      tabIndex={0}
                      className="block w-full"
                      onClick={() => router.push(`/devotionals/${devotional.id}`)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          router.push(`/devotionals/${devotional.id}`);
                        }
                      }}
                    >
                      {card}
                    </div>
                  );
                }
                return (
                  <Link
                    key={devotional.id}
                    href={`/devotionals/${devotional.id}`}
                    className="block w-full"
                  >
                    {card}
                  </Link>
                );
              })}

              {/* Always show The Testing of Joseph (mobile) */}
              
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {/* Active Devotionals (clickable) */}
              {devotionals.map((devotional) => {
                const coverImage = getCoverImage(devotional.title);
                if (!coverImage) return null;
                const isTemptingOfJesus = devotional.title === "The Tempting of Jesus";
                const card = (
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                    <img
                      src={coverImage}
                      alt={`${devotional.title} cover`}
                      className="w-full h-auto rounded-lg object-contain"
                    />
                    <div className="mt-3 text-lg font-semibold text-gray-900 text-center">
                      {devotional.title}
                    </div>
                  </div>
                );
                if (isTemptingOfJesus) {
                  return (
                    <div
                      key={devotional.id}
                      role="link"
                      tabIndex={0}
                      className="block w-full max-w-xs"
                      onClick={() => router.push(`/devotionals/${devotional.id}`)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          router.push(`/devotionals/${devotional.id}`);
                        }
                      }}
                    >
                      {card}
                    </div>
                  );
                }
                return (
                  <Link
                    key={devotional.id}
                    href={`/devotionals/${devotional.id}`}
                    className="block w-full max-w-xs"
                  >
                    {card}
                  </Link>
                );
              })}

              {/* Always show The Testing of Joseph (desktop) */}
              
            </div>
          </>
        )}
      </div>
    </div>
  );
}

