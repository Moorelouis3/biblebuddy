"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { ModalShell } from "./ModalShell";

type FeedOnboardingModalProps = {
  isOpen: boolean;
  userId: string;
  onFinished: () => void;
};

const TOTAL_STEPS = 4;

export function FeedOnboardingModal({ isOpen, userId, onFinished }: FeedOnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progressText = `${currentStep} of ${TOTAL_STEPS}`;

  async function handleFinish() {
    if (isSaving) return;
    setError(null);
    try {
      setIsSaving(true);
      await supabase
        .from("profile_stats")
        .upsert({ user_id: userId, feed_onboarding_completed: true }, { onConflict: "user_id" });
      onFinished();
    } catch {
      setError("Couldn't save your progress. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleContinue() {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
    } else {
      void handleFinish();
    }
  }

  const canContinue = currentStep === 3 ? agreed : true;

  return (
    <ModalShell isOpen={isOpen} zIndex="z-[200]" backdropColor="bg-black/70">
      <div
        className="relative w-full max-w-3xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3"
        role="dialog"
        aria-modal="true"
        aria-label="Bible Buddy Feed introduction"
      >
        <div className="rounded-3xl bg-blue-50/80 px-5 md:px-8 py-8 md:py-10 flex flex-col justify-center">
          <div className="absolute right-7 top-6 text-xs font-medium text-gray-500">{progressText}</div>

          <div className="w-full mx-auto">
            <div className="w-full max-w-2xl mx-auto rounded-2xl border border-blue-100 bg-white/80 px-5 md:px-7 py-6 md:py-7 max-h-[58vh] overflow-y-auto">

              {/* ── Step 1 — Welcome ────────────────────────────────────────── */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    Welcome to the Bible Buddy Feed
                  </h2>
                  <div className="space-y-4 text-sm md:text-[15px] text-gray-600 leading-7 max-w-xl">
                    <p>
                      The Bible Buddy Feed is your faith community — a dedicated space where Scripture, prayer, and real conversations come together.
                    </p>
                    <p>
                      Think of it as a social platform built specifically for Bible study. Here you can share what God is putting on your heart, post your favorite verses, lift up prayer requests, and see what your fellow Bible Buddies are exploring in Scripture.
                    </p>
                    <p>
                      No noise. No distractions. Just a community of people committed to growing deeper in the Word — together.
                    </p>
                  </div>
                </div>
              )}

              {/* ── Step 2 — Three Feed Views ───────────────────────────────── */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    Three ways to experience the community
                  </h2>
                  <div className="space-y-5 text-sm md:text-[15px] text-gray-600 leading-7 max-w-xl">
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 space-y-1">
                      <p className="font-semibold text-gray-800">🌍 Community Feed</p>
                      <p>See posts from every Bible Buddy on the platform. Content is ranked by relevance, engagement, and what you've been studying — so what rises to the top always feels personal and timely.</p>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 space-y-1">
                      <p className="font-semibold text-gray-800">👥 Buddy Feed</p>
                      <p>A closer look at the people you've connected with. Posts from your Bible Buddies surface here so you never miss what your faith circle is reading, praying over, or sharing.</p>
                    </div>
                    <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 space-y-1">
                      <p className="font-semibold text-gray-800">📋 My Feed</p>
                      <p>A personal record of everything you've posted — your thoughts, verses, prayers, and activity. Your journey, your voice, all in one place.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 3 — Community Guidelines ──────────────────────────── */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    Community guidelines
                  </h2>
                  <p className="text-sm md:text-[15px] text-gray-600 leading-7 max-w-xl">
                    The Bible Buddy Feed is a place of encouragement, honesty, and faith. To keep it that way for everyone, we ask that all members follow these guidelines.
                  </p>
                  <ul className="space-y-3.5 text-sm md:text-[15px] text-gray-700 max-w-xl">
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">1</span>
                      <span><strong className="text-gray-800">Keep it faith-centered.</strong> Posts should relate to Scripture, prayer, spiritual reflection, or faith-based encouragement.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">2</span>
                      <span><strong className="text-gray-800">Be respectful.</strong> Disagreement is welcome; disrespect, harassment, or hateful language is not.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">3</span>
                      <span><strong className="text-gray-800">No spam or self-promotion.</strong> Don't post repetitive content, advertise products, or promote outside platforms.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">4</span>
                      <span><strong className="text-gray-800">Protect your privacy.</strong> Don't share personal contact information publicly in posts or comments.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">5</span>
                      <span><strong className="text-gray-800">Report concerns promptly.</strong> If something feels off, report it. We take every report seriously and act quickly.</span>
                    </li>
                  </ul>
                  <label className="flex items-center gap-3 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-sm md:text-[15px] font-semibold text-gray-800">
                      I understand and agree to the Community Guidelines
                    </span>
                  </label>
                </div>
              )}

              {/* ── Step 4 — How to Engage ──────────────────────────────────── */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                    You&apos;re ready. Here&apos;s how it works.
                  </h2>
                  <div className="space-y-4 text-sm md:text-[15px] text-gray-600 leading-7 max-w-xl">
                    <p>The Feed is built for real interaction. Here&apos;s what you can do:</p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="text-lg">❤️</span>
                        <span><strong className="text-gray-800">React to posts</strong> with emoji reactions to show support, agreement, or encouragement.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-lg">💬</span>
                        <span><strong className="text-gray-800">Comment</strong> to join the conversation, ask a question, or respond to someone&apos;s reflection.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-lg">👤</span>
                        <span><strong className="text-gray-800">Tap any name</strong> to visit that person&apos;s profile, see their journey, and connect as Bible Buddies.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-lg">✍️</span>
                        <span><strong className="text-gray-800">Post anything</strong> — a thought, a verse, a prayer, or a prayer request. Your voice matters here.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-lg">🔄</span>
                        <span><strong className="text-gray-800">Check back often.</strong> The Feed is ranked and refreshed regularly to surface what&apos;s most relevant to you.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-8 flex items-center justify-between gap-3 max-w-2xl mx-auto flex-wrap sm:flex-nowrap">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                disabled={isSaving}
                className="px-4 py-4 rounded-2xl text-sm md:text-base font-semibold border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleContinue}
              disabled={isSaving || !canContinue}
              className="px-6 py-4 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isSaving
                ? "Saving..."
                : currentStep === TOTAL_STEPS
                ? "Let's Go"
                : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
