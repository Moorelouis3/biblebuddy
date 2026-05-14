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
          className="groups-modal-enter relative w-full max-w-3xl rounded-[32px] bg-white p-2 shadow-2xl shadow-black/30 ring-1 ring-black/10 md:p-3"
          role="dialog"
          aria-modal="true"
          aria-label="Bible Study Groups introduction"
        >
          <div className="flex flex-col justify-center rounded-3xl bg-gradient-to-b from-emerald-50 to-green-50/40 px-5 py-8 md:px-8 md:py-10">
            <div className="absolute right-7 top-6 text-xs font-medium text-gray-500">{progressText}</div>

            <div className="mx-auto w-full">
              <div className="mx-auto max-h-[58vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-green-100 bg-white/80 px-5 py-6 md:px-7">
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="flex justify-center">
                      <span className="groups-icon-float text-5xl">BB</span>
                    </div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                      Welcome to Bible Study Groups
                    </h2>
                    <div className="mx-auto max-w-xl space-y-4 text-sm leading-7 text-gray-600 md:text-[15px]">
                      <p>
                        Bible has always been better together. Bible Study Groups give you a dedicated community to
                        read, discuss, and grow through Scripture alongside others who are serious about the Word.
                      </p>
                      <p>
                        Each group runs structured Bible studies, so you are never just reading alone. You study,
                        reflect, and discuss as a group in a shared space designed for it.
                      </p>
                      <p>
                        Think of it as a small group built directly into your Bible study tool, so everything stays in
                        one place.
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                        Meet Hope Nation
                      </h2>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
                        <span className="beta-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Beta
                      </span>
                    </div>
                    <p className="max-w-xl text-sm leading-7 text-gray-600 md:text-[15px]">
                      As this feature is in beta, <strong className="text-gray-800">Hope Nation is the first and only active group</strong> on the platform right now.
                      More groups are coming, but this is where it all starts.
                    </p>
                    <p className="max-w-xl text-sm leading-7 text-gray-600 md:text-[15px]">
                      Hope Nation features Bible studies that walk through books and stories in Scripture with
                      readings, reflections, and group discussion:
                    </p>

                    <div className="max-w-xl space-y-3">
                      {[
                        ["The Testing of Joseph", "14 chapters - Genesis 37-50"],
                        ["The Temptation of Jesus", "Bible study - Matthew 4, Luke 4"],
                        ["The Faith of Job", "Bible study - The Book of Job"],
                        ["The Wisdom of Proverbs", "31 chapters - The Book of Proverbs"],
                      ].map(([title, subtitle], index) => (
                        <div
                          key={title}
                          className={`groups-row-${index + 1} flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3`}
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">
                            {index + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{title}</p>
                            <p className="text-xs text-gray-500">{subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-5">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                      More than a study
                    </h2>
                    <p className="max-w-xl text-sm leading-7 text-gray-600 md:text-[15px]">
                      When you join a group, you get access to a full community space, not just the Bible study. Every
                      group has dedicated channels to keep connection and conversation going.
                    </p>
                    <div className="max-w-xl space-y-2.5">
                      {[
                        ["Home", "Group overview, announcements, and Bible study progress"],
                        ["General", "Open conversation to share, encourage, and connect with the group"],
                        ["Bible Studies", "Bible study content to read, reflect, and discuss as a group"],
                        ["Updates", "News and posts from the group leader"],
                        ["Prayer", "Share prayer requests and lift one another up in faith"],
                        ["Q&A", "Ask questions, dig into Scripture, and get answers from the group"],
                      ].map(([title, subtitle], index) => (
                        <div
                          key={title}
                          className={`groups-row-${index + 1} flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3`}
                        >
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-emerald-700">
                            {index + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{title}</p>
                            <p className="text-xs text-gray-500">{subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div className="flex justify-center">
                      <span className="groups-icon-float text-5xl">Go</span>
                    </div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                      Ready to join?
                    </h2>
                    <p className="mx-auto max-w-xl text-center text-sm leading-7 text-gray-600 md:text-[15px]">
                      Joining a group is simple. Here is how it works:
                    </p>
                    <div className="mx-auto max-w-xl space-y-4">
                      {[
                        ["Find a group", "Browse the groups listed on this page and tap one to learn more about it."],
                        ["Request to join", "Send a join request, and the group leader will review and approve it."],
                        ["Get approved and dive in", "Once approved, you get full access to the group's community, Bible studies, and all channels."],
                        ["Study together", "Work through Bible studies at your own pace and share your reflections with the group."],
                      ].map(([title, subtitle], index) => (
                        <div key={title} className={`groups-row-${index + 1} flex items-start gap-4`}>
                          <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                            {index + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{title}</p>
                            <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}

            <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                  disabled={isSaving}
                  className="rounded-2xl border border-gray-300 bg-white px-4 py-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
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
                className="rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300 md:text-base"
              >
                {isSaving ? "Saving..." : currentStep === TOTAL_STEPS ? "Let's Go" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </ModalShell>
    </>
  );
}
