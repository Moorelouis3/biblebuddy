"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type OnboardingModalProps = {
  isOpen: boolean;
  userId: string;
  initialTrafficSource?: string | null;
  initialBibleExperienceLevel?: string | null;
  onFinished: (upgrade: boolean) => void;
};

const TOTAL_STEPS = 6;
const STEP_TWO_OPTIONS = ["Instagram", "Facebook", "Word of mouth", "Other"] as const;
const STEP_THREE_OPTIONS = [
  "Just getting started",
  "Been studying for a while",
  "Studying deeply for years",
] as const;

export function OnboardingModal({
  isOpen,
  userId,
  initialTrafficSource,
  initialBibleExperienceLevel,
  onFinished,
}: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTrafficSource, setSelectedTrafficSource] = useState<string | null>(null);
  const [otherTrafficSourceValue, setOtherTrafficSourceValue] = useState("");
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setCurrentStep(1);
    setError(null);

    const normalizedTrafficSource =
      typeof initialTrafficSource === "string" && initialTrafficSource.toLowerCase() !== "null"
        ? initialTrafficSource
        : "";
    if (
      normalizedTrafficSource &&
      STEP_TWO_OPTIONS.includes(normalizedTrafficSource as typeof STEP_TWO_OPTIONS[number])
    ) {
      setSelectedTrafficSource(normalizedTrafficSource);
      setOtherTrafficSourceValue("");
    } else {
      setSelectedTrafficSource(null);
      setOtherTrafficSourceValue("");
    }

    if (initialBibleExperienceLevel && STEP_THREE_OPTIONS.includes(initialBibleExperienceLevel as typeof STEP_THREE_OPTIONS[number])) {
      setSelectedExperienceLevel(initialBibleExperienceLevel);
    } else {
      setSelectedExperienceLevel(null);
    }
  }, [isOpen, initialTrafficSource, initialBibleExperienceLevel]);

  const progressText = useMemo(() => `${currentStep} of ${TOTAL_STEPS}`, [currentStep]);

  if (!isOpen) return null;

  const canContinueStepTwo =
    selectedTrafficSource === "Other"
      ? otherTrafficSourceValue.trim().length > 0
      : !!selectedTrafficSource;
  const canContinueStepThree = !!selectedExperienceLevel;

  async function ensureProfileStatsRow(currentUserId: string) {
    const { data: existingRow, error: selectError } = await supabase
      .from("profile_stats")
      .select("user_id")
      .eq("user_id", currentUserId)
      .maybeSingle();

    if (selectError) {
      console.error("[ONBOARDING] Failed checking profile_stats row:", selectError);
      throw selectError;
    }

    if (!existingRow) {
      const { error: insertError } = await supabase.from("profile_stats").insert({
        user_id: currentUserId,
        onboarding_completed: false,
      });

      if (insertError) {
        console.error("[ONBOARDING] Failed inserting missing profile_stats row:", insertError);
        throw insertError;
      }
    }
  }

  async function persistProfileStats(values: {
    traffic_source?: string;
    bible_experience_level?: string;
    onboarding_completed?: boolean;
  }) {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("[ONBOARDING] Failed loading auth session:", sessionError);
      throw sessionError;
    }

    const authenticatedUserId = session?.user?.id || userId;

    if (!authenticatedUserId) {
      const noUserError = new Error("No authenticated user id available for onboarding update");
      console.error("[ONBOARDING]", noUserError);
      throw noUserError;
    }

    console.log("[ONBOARDING] Persist attempt", {
      userId: authenticatedUserId,
      values,
    });

    await ensureProfileStatsRow(authenticatedUserId);

    const { data, error } = await supabase
      .from("profile_stats")
      .update(values)
      .eq("user_id", authenticatedUserId)
      .select("user_id, traffic_source")
      .maybeSingle();

    if (error) {
      console.error("[ONBOARDING] Supabase update error:", error);
      throw error;
    }

    console.log("[ONBOARDING] Persist success", {
      userId: authenticatedUserId,
      result: data,
    });

    return data;
  }

  async function handleContinue() {
    if (isSaving) return;

    setError(null);

    if (currentStep === 2) {
      if (!canContinueStepTwo || !selectedTrafficSource) return;
      try {
        setIsSaving(true);
        if (selectedTrafficSource === "Other") {
          await persistProfileStats({
            traffic_source: "Other",
          });
        } else {
          await persistProfileStats({
            traffic_source: selectedTrafficSource,
          });
        }
        setCurrentStep(3);
      } catch (persistError) {
        console.error("[ONBOARDING] Failed to save traffic_source:", persistError);
        setError("We couldn’t save your answer. Please try again.");
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (currentStep === 3) {
      if (!canContinueStepThree || !selectedExperienceLevel) return;
      try {
        setIsSaving(true);

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.log("Error:", sessionError);
          throw sessionError;
        }

        const authenticatedUserId = session?.user?.id || userId;

        if (!authenticatedUserId) {
          const noUserError = new Error("No authenticated user id available for bible_experience_level update");
          console.log("Error:", noUserError);
          throw noUserError;
        }

        console.log("Saving bible_experience_level:", selectedExperienceLevel);
        console.log("User ID:", authenticatedUserId);

        const { data: existingRow, error: existingRowError } = await supabase
          .from("profile_stats")
          .select("user_id")
          .eq("user_id", authenticatedUserId)
          .maybeSingle();

        if (existingRowError) {
          console.log("Error:", existingRowError);
          throw existingRowError;
        }

        let resultData: unknown = null;
        let resultError: unknown = null;

        if (existingRow) {
          const { data, error } = await supabase
            .from("profile_stats")
            .update({ bible_experience_level: selectedExperienceLevel })
            .eq("user_id", authenticatedUserId)
            .select("user_id, bible_experience_level");

          resultData = data;
          resultError = error;
        } else {
          const { data, error } = await supabase
            .from("profile_stats")
            .upsert(
              {
                user_id: authenticatedUserId,
                bible_experience_level: selectedExperienceLevel,
              },
              { onConflict: "user_id" }
            )
            .select("user_id, bible_experience_level");

          resultData = data;
          resultError = error;
        }

        console.log("Result:", resultData);
        console.log("Error:", resultError);

        if (resultError) {
          throw resultError;
        }

        setCurrentStep(4);
      } catch (persistError) {
        console.error("[ONBOARDING] Failed to save bible_experience_level:", persistError);
        setError("We couldn’t save your answer. Please try again.");
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((step) => step + 1);
    }
  }

  async function handleFinish(upgrade: boolean) {
    if (isSaving) return;

    setError(null);

    try {
      setIsSaving(true);
      await persistProfileStats({ onboarding_completed: true });
      onFinished(upgrade);
    } catch (persistError) {
      console.error("[ONBOARDING] Failed to complete onboarding:", persistError);
      setError("We couldn’t save your progress. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 md:p-6 overflow-hidden">
      <div
        className="relative w-full max-w-3xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3"
        role="dialog"
        aria-modal="true"
        aria-label="Bible Buddy onboarding"
      >
        <div className="rounded-3xl bg-blue-50/80 px-5 md:px-8 py-8 md:py-10 flex flex-col justify-center">
          <div className="absolute right-7 top-6 text-xs font-medium text-gray-500">{progressText}</div>

          <div className="w-full mx-auto">
            <div className="w-full max-w-2xl mx-auto rounded-2xl border border-blue-100 bg-white/80 px-5 md:px-7 py-6 md:py-6 max-h-[58vh] overflow-y-auto">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Welcome to Bible Buddy</h2>
                  <div className="max-w-xl space-y-6 text-sm md:text-[15px] text-gray-600 leading-7">
                    <p>Bible Buddy helps you understand the Bible with clarity.</p>
                    <p>Explore context.<br />Learn the history.<br />Study without breaking your flow.</p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">How did you hear about Bible Buddy?</h2>
                  <div className="space-y-3.5">
                    {STEP_TWO_OPTIONS.map((option) => {
                      const selected = selectedTrafficSource === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSelectedTrafficSource(option);
                            if (option !== "Other") {
                              setOtherTrafficSourceValue("");
                            }
                          }}
                          className={`w-full rounded-2xl border px-5 py-4 text-left text-sm md:text-base font-semibold transition ${
                            selected
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {selectedTrafficSource === "Other" && (
                    <input
                      type="text"
                      value={otherTrafficSourceValue ?? ""}
                      onChange={(event) => setOtherTrafficSourceValue(event.target.value)}
                      placeholder="Type your answer..."
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm md:text-base text-gray-700 focus:border-blue-500 focus:outline-none"
                    />
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Where are you in your Bible journey?</h2>
                  <div className="space-y-3.5">
                    <button
                      type="button"
                      onClick={() => setSelectedExperienceLevel("Just getting started")}
                      className={`w-full rounded-2xl border px-5 py-4 text-left text-sm md:text-base font-semibold transition ${
                        selectedExperienceLevel === "Just getting started"
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      🌱 Just getting started
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedExperienceLevel("Been studying for a while")}
                      className={`w-full rounded-2xl border px-5 py-4 text-left text-sm md:text-base font-semibold transition ${
                        selectedExperienceLevel === "Been studying for a while"
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      📖 Been studying for a while
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedExperienceLevel("Studying deeply for years")}
                      className={`w-full rounded-2xl border px-5 py-4 text-left text-sm md:text-base font-semibold transition ${
                        selectedExperienceLevel === "Studying deeply for years"
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      🔥 Studying deeply for years
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Bible study should be clear. Not complicated.</h2>
                  <div className="max-w-xl space-y-6 text-sm md:text-[15px] text-gray-600 leading-7">
                    <p>One of the biggest struggles people face when reading the Bible is understanding it.</p>
                    <p>Who is this person?<br />What does this word mean?<br />Why is this place important?</p>
                    <p>
                      Finding answers often means leaving the Bible, searching multiple sources, and breaking your focus.
                    </p>
                    <p>Bible Buddy was created to make Bible study easier.</p>
                    <p>Study the Bible and get answers instantly — without losing your flow.</p>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Everything you need for serious Bible study</h2>
                  <ul className="max-w-xl space-y-4 text-sm md:text-[15px] text-gray-600 leading-7">
                    <li>📖 Read an interactive Bible with multiple translations</li>
                    <li>🧭 Explore a database of thousands of people, places, and keywords</li>
                    <li>📅 Follow structured reading plans</li>
                    <li>📚 Dive into study guides and devotionals</li>
                    <li>🤖 Ask AI Bible Buddy questions while you study</li>
                    <li>📝 Take notes with a built-in editor</li>
                    <li>🎯 Test your knowledge with thousands of trivia questions</li>
                  </ul>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Free to start. Go deeper anytime.</h2>
                  <div className="max-w-xl space-y-4 text-[13px] sm:text-sm md:text-[15px] text-gray-600 leading-6 sm:leading-7">
                    <p><strong className="font-semibold text-gray-800">As a free user</strong>, you receive 5 credits each day.</p>
                    <p>That’s enough for a focused, in-depth Bible study.</p>
                    <div className="space-y-3">
                      <p className="font-semibold text-gray-800">Each action inside Bible Buddy uses 1 credit:</p>
                      <ul className="space-y-3.5">
                        <li>🔎 Looking up a person, place, or keyword</li>
                        <li>📚 Opening a study guide or devotional</li>
                        <li>🤖 Asking AI Bible Buddy a question</li>
                        <li>📝 Taking notes</li>
                        <li>🎯 Answering trivia questions</li>
                      </ul>
                    </div>
                    <p>
                      <strong className="font-semibold text-gray-800">The Bible itself is always free.</strong>
                      <br />You can read as much Scripture as you want.
                    </p>

                    <div className="border-t border-blue-100 pt-4 space-y-3">
                      <p>
                        For those who want more control, more detail, and no limits, Bible Buddy Pro is perfect.
                      </p>
                      <p className="font-semibold text-gray-800">Pro gives you:</p>
                      <ul className="space-y-3.5">
                        <li>✨ Unlimited credits</li>
                        <li>📚 Full access to all study guides and devotionals</li>
                        <li>🎯 Full access to all trivia questions</li>
                        <li>🤖 Unlimited AI questions</li>
                        <li>🚀 Study without limits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

          <div className="mt-8 flex items-center justify-between gap-3 max-w-2xl mx-auto flex-wrap sm:flex-nowrap">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((step) => Math.max(1, step - 1))}
                disabled={isSaving}
                className="px-4 py-4 rounded-2xl text-sm md:text-base font-semibold border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 6 && (
              <button
                type="button"
                onClick={handleContinue}
                disabled={
                  isSaving ||
                  (currentStep === 2 && !canContinueStepTwo) ||
                  (currentStep === 3 && !canContinueStepThree)
                }
                className="px-6 py-4 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Continue"}
              </button>
            )}

            {currentStep === 6 && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 ml-auto w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleFinish(false)}
                  disabled={isSaving}
                  className="w-full sm:w-auto px-4 py-4 rounded-2xl text-sm md:text-base font-semibold border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Continue Free"}
                </button>
                <button
                  type="button"
                  onClick={() => handleFinish(true)}
                  disabled={isSaving}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Upgrade to Pro"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
