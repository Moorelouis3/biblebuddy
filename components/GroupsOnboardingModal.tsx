"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { ModalShell } from "./ModalShell";

type GroupsOnboardingModalProps = {
  isOpen: boolean;
  userId: string;
  onFinished: () => void;
};

const TOTAL_STEPS = 4;

export function GroupsOnboardingModal({ isOpen, userId, onFinished }: GroupsOnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
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
        .upsert({ user_id: userId, groups_onboarding_completed: true }, { onConflict: "user_id" });
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

  return (
    <>
      <style>{`
        @keyframes groupsModalEntrance {
          from { opacity: 0; transform: scale(0.93) translateY(14px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes groupsCardFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
        @keyframes groupsSlideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes groupsDotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }
        .groups-modal-enter {
          animation: groupsModalEntrance 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .groups-icon-float {
          animation: groupsCardFloat 3s ease-in-out infinite;
        }
        .groups-row-1 { animation: groupsSlideIn 0.35s 0.1s ease-out both; }
        .groups-row-2 { animation: groupsSlideIn 0.35s 0.2s ease-out both; }
        .groups-row-3 { animation: groupsSlideIn 0.35s 0.3s ease-out both; }
        .groups-row-4 { animation: groupsSlideIn 0.35s 0.4s ease-out both; }
        .groups-row-5 { animation: groupsSlideIn 0.35s 0.5s ease-out both; }
        .groups-row-6 { animation: groupsSlideIn 0.35s 0.6s ease-out both; }
        .beta-dot { animation: groupsDotPulse 1.8s ease-in-out infinite; }
      `}</style>

      <ModalShell isOpen={isOpen} zIndex="z-[200]" backdropColor="bg-black/70">
        <div
          className="groups-modal-enter relative w-full max-w-3xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3"
          role="dialog"
          aria-modal="true"
          aria-label="Bible Study Groups introduction"
        >
          <div className="rounded-3xl bg-gradient-to-b from-emerald-50 to-green-50/40 px-5 md:px-8 py-8 md:py-10 flex flex-col justify-center">
            <div className="absolute right-7 top-6 text-xs font-medium text-gray-500">{progressText}</div>

            <div className="w-full mx-auto">
              <div className="w-full max-w-2xl mx-auto rounded-2xl border border-green-100 bg-white/80 px-5 md:px-7 py-6 max-h-[58vh] overflow-y-auto">

                {/* ── Step 1 — What are Bible Study Groups ──────────────────── */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="flex justify-center">
                      <span className="groups-icon-float text-5xl">🤝</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 text-center">
                      Welcome to Bible Study Groups
                    </h2>
                    <div className="space-y-4 text-sm md:text-[15px] text-gray-600 leading-7 max-w-xl mx-auto">
                      <p>
                        Bible has always been better together. Bible Study Groups give you a dedicated community to read, discuss, and grow through Scripture alongside others who are just as serious about the Word.
                      </p>
                      <p>
                        Each group runs structured weekly Bible studies — so you&apos;re never just reading alone. You study, reflect, and discuss as a group, week by week, in a shared space designed for it.
                      </p>
                      <p>
                        Think of it as a small group — but built directly into your Bible study tool, so everything stays in one place.
                      </p>
                    </div>
                  </div>
                )}

                {/* ── Step 2 — Hope Nation (beta) ─────────────────────────── */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                        Meet Hope Nation
                      </h2>
                      <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        <span className="beta-dot inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Beta
                      </span>
                    </div>
                    <p className="text-sm md:text-[15px] text-gray-600 leading-7 max-w-xl">
                      As this feature is in beta, <strong className="text-gray-800">Hope Nation is the first and only active group</strong> on the platform right now. More groups are coming — but this is where it all starts.
                    </p>
                    <p className="text-sm md:text-[15px] text-gray-600 leading-7 max-w-xl">
                      Hope Nation runs four weekly Bible study series. Each series walks through a different book or story in Scripture, week by week, with readings, reflections, and group discussion:
                    </p>

                    <div className="space-y-3 max-w-xl">
                      <div className="groups-row-1 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-3">
                        <span className="text-xl flex-shrink-0">🔥</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">The Testing of Joseph</p>
                          <p className="text-xs text-gray-500">21 weeks · Genesis 37–50</p>
                        </div>
                      </div>
                      <div className="groups-row-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-3">
                        <span className="text-xl flex-shrink-0">✝️</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">The Temptation of Jesus</p>
                          <p className="text-xs text-gray-500">Weekly series · Matthew 4, Luke 4</p>
                        </div>
                      </div>
                      <div className="groups-row-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-3">
                        <span className="text-xl flex-shrink-0">🕊️</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">The Faith of Job</p>
                          <p className="text-xs text-gray-500">Weekly series · The Book of Job</p>
                        </div>
                      </div>
                      <div className="groups-row-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-3">
                        <span className="text-xl flex-shrink-0">📜</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">The Wisdom of Proverbs</p>
                          <p className="text-xs text-gray-500">Weekly series · The Book of Proverbs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 3 — Community & Tabs ────────────────────────────── */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                      More than a study — it&apos;s a community
                    </h2>
                    <p className="text-sm md:text-[15px] text-gray-600 leading-7 max-w-xl">
                      When you join a group, you get access to a full community space — not just the weekly study. Every group has dedicated channels to keep connection and conversation going all week long.
                    </p>
                    <div className="space-y-2.5 max-w-xl">
                      <div className="groups-row-1 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-3">
                        <span className="text-lg w-7 text-center flex-shrink-0">🏠</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Home</p>
                          <p className="text-xs text-gray-500">Group overview, announcements, and current series progress</p>
                        </div>
                      </div>
                      <div className="groups-row-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-3">
                        <span className="text-lg w-7 text-center flex-shrink-0">💬</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">General</p>
                          <p className="text-xs text-gray-500">Open conversation — share, encourage, and connect with the group</p>
                        </div>
                      </div>
                      <div className="groups-row-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-3">
                        <span className="text-lg w-7 text-center flex-shrink-0">📚</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Bible Studies</p>
                          <p className="text-xs text-gray-500">Weekly series content — read, reflect, and discuss as a group</p>
                        </div>
                      </div>
                      <div className="groups-row-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-3">
                        <span className="text-lg w-7 text-center flex-shrink-0">📢</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Updates</p>
                          <p className="text-xs text-gray-500">News and posts from the group leader</p>
                        </div>
                      </div>
                      <div className="groups-row-5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-3">
                        <span className="text-lg w-7 text-center flex-shrink-0">🙏</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Prayer</p>
                          <p className="text-xs text-gray-500">Share prayer requests and lift one another up in faith</p>
                        </div>
                      </div>
                      <div className="groups-row-6 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-3">
                        <span className="text-lg w-7 text-center flex-shrink-0">❓</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Q&A</p>
                          <p className="text-xs text-gray-500">Ask questions, dig into Scripture, and get answers from the group</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 4 — How to Join ─────────────────────────────────── */}
                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div className="flex justify-center">
                      <span className="groups-icon-float text-5xl">🚪</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 text-center">
                      Ready to join?
                    </h2>
                    <p className="text-sm md:text-[15px] text-gray-600 leading-7 max-w-xl mx-auto text-center">
                      Joining a group is simple. Here&apos;s how it works:
                    </p>
                    <div className="space-y-4 max-w-xl mx-auto">
                      <div className="groups-row-1 flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center mt-0.5">1</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Find a group</p>
                          <p className="text-xs text-gray-500 mt-0.5">Browse the groups listed on this page and tap one to learn more about it.</p>
                        </div>
                      </div>
                      <div className="groups-row-2 flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center mt-0.5">2</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Request to join</p>
                          <p className="text-xs text-gray-500 mt-0.5">Send a join request — the group leader will review and approve it.</p>
                        </div>
                      </div>
                      <div className="groups-row-3 flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center mt-0.5">3</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Get approved &amp; dive in</p>
                          <p className="text-xs text-gray-500 mt-0.5">Once approved, you&apos;ll get full access to the group&apos;s community, weekly studies, and all channels.</p>
                        </div>
                      </div>
                      <div className="groups-row-4 flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center mt-0.5">4</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">Study together, every week</p>
                          <p className="text-xs text-gray-500 mt-0.5">New content drops weekly. Work through it at your own pace and share your reflections with the group.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}

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
                disabled={isSaving}
                className="px-6 py-4 rounded-2xl text-sm md:text-base font-semibold bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 transition disabled:bg-emerald-300 disabled:cursor-not-allowed"
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
    </>
  );
}
