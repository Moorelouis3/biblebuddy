"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { ACTION_TYPE } from "../../lib/actionTypes";
import { trackNavigationActionOnce } from "../../lib/navigationActionTracker";

interface Devotional {
  id: string;
  title: string;
  description: string;
  total_days: number;
}

const HIDDEN_DEVOTIONAL_TITLES = new Set([
  "The Calling of Moses",
]);

const NEXT_BIBLE_STUDY_TITLE = "The Wisdom of Proverbs";

export default function DevotionalsPage() {
  const router = useRouter();
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [tempDontShowAgain, setTempDontShowAgain] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Load "Don't show again" preference from localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem("devotional-instructions-dont-show-again");
    if (savedPreference === "true") {
      setDontShowAgain(true);
      setIsInstructionsExpanded(false); // Start collapsed if user dismissed
    }
  }, []);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      setUserId(user?.id ?? null);
      const meta: any = user?.user_metadata || {};
      setUsername(
        meta.firstName ||
          meta.first_name ||
          (user?.email ? user.email.split("@")[0] : null) ||
          null
      );
    });
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

  useEffect(() => {
    if (!userId) return;
    void trackNavigationActionOnce({
      userId,
      username,
      actionType: ACTION_TYPE.devotionals_viewed,
      actionLabel: "Bible Studies",
      dedupeKey: "devotionals-viewed",
    }).catch((error) => console.error("[NAV] Failed to track devotionals view:", error));
  }, [userId, username]);

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
    if (title === "The Tempting of Jesus") {
      return "/newtempting.png";
    }
    if (title === "The Testing of Joseph") {
      return "/newtesting.png";
    }
    if (title === "The Disciples of Jesus") {
      return "/disciplesofjesusdevotional.png";
    }
    if (title === "Women of the Bible") {
      return "/womenofthebible.png";
    }
    if (title === "The Wisdom of Proverbs") {
      return "/WisdomofProverbs.png";
    }
    if (title === "The Faith of Job") {
      return "/faithofjob.png";
    }
    if (title === "The Calling of Moses") {
      return "/callingofmosesdevotional.png";
    }
    if (title === "The Heart of David") {
      return "/heartofdaviddevotional.png";
    }
    if (title === "The Obedience of Abraham") {
      return "/obedienceofabraham.png";
    }
    if (title === "The Transforming of Paul") {
      return "/transformingofpauldevotional.png";
    }
    if (title === "The Courage of Daniel") {
      return "/courageofdaniel.png";
    }
    if (title === "The Rise of Esther") {
      return "/RiseofEsther.png";
    }
    return null;
  };

  const getDevotionalVisual = (devotional: Devotional) => {
    const coverImage = getCoverImage(devotional.title);
    if (coverImage) {
      return (
        <img
          src={coverImage}
          alt={`${devotional.title} cover`}
          className="w-full h-auto rounded-lg object-contain"
        />
      );
    }

    return (
      <div className="w-full min-h-[150px] md:min-h-[260px] rounded-lg bg-gradient-to-br from-amber-50 via-white to-emerald-50 border border-amber-100 flex flex-col items-center justify-center px-4 py-6 text-center">
        <div className="text-3xl md:text-5xl mb-3">📖</div>
        <div className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
          {devotional.title}
        </div>
        <div className="mt-2 text-xs md:text-sm text-gray-600">
          {devotional.total_days} chapter Bible study
        </div>
      </div>
    );
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Bible Studies</h1>
          <div className="text-gray-500">Loading Bible studies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Bible Studies</h1>

        {/* INSTRUCTIONS CALLOUT */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-sm mb-6">
          {/* HEADER - Clickable */}
          <button
            type="button"
            onClick={handleToggleInstructions}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-blue-100/50 transition rounded-t-xl"
          >
            <h2 className="text-lg font-semibold text-gray-900">📖 About Our Bible Studies</h2>
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
                <h3 className="text-base font-semibold text-gray-900">📖 How to Use These Bible Studies</h3>
                
                <p className="text-gray-700 leading-relaxed">
                  Each Bible study is meant to be done at a slow and intentional pace.
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Step 1: Read the Bible Study Intro</p>
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
                  If you stay consistent, you won't just finish a Bible study — you'll walk away stronger, wiser, and closer to God than when you started.
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

        {devotionals.filter((devotional) => !HIDDEN_DEVOTIONAL_TITLES.has(devotional.title)).length === 0 ? (
          <div className="text-gray-500">
            No Bible studies available yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 md:gap-8">
            {devotionals
              .filter((devotional) => !HIDDEN_DEVOTIONAL_TITLES.has(devotional.title))
              .map((devotional) => {
              const isNextBibleStudy = devotional.title === NEXT_BIBLE_STUDY_TITLE;
              const card = (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 md:p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                  {isNextBibleStudy && (
                    <div className="mb-2 text-center">
                      <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-800 md:text-xs">
                        Next Bible Study
                      </span>
                    </div>
                  )}
                  {getDevotionalVisual(devotional)}
                  <div className="mt-2 text-xs md:text-lg font-semibold text-gray-900 text-center leading-tight">
                    {devotional.title}
                  </div>
                </div>
              );
              return (
                <div
                  key={devotional.id}
                  role="link"
                  tabIndex={0}
                  className="block w-full"
                  onClick={() => {
                    if (userId) {
                      void trackNavigationActionOnce({
                        userId,
                        username,
                        actionType: ACTION_TYPE.devotional_opened,
                        actionLabel: devotional.title,
                        dedupeKey: `devotional-opened:${devotional.id}`,
                      }).catch((error) => console.error("[NAV] Failed to track devotional click:", error));
                    }
                    router.push(`/devotionals/${devotional.id}`);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      if (userId) {
                        void trackNavigationActionOnce({
                          userId,
                          username,
                          actionType: ACTION_TYPE.devotional_opened,
                          actionLabel: devotional.title,
                          dedupeKey: `devotional-opened:${devotional.id}`,
                        }).catch((error) => console.error("[NAV] Failed to track devotional click:", error));
                      }
                      router.push(`/devotionals/${devotional.id}`);
                    }
                  }}
                >
                  {card}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
