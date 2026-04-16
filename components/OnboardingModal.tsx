"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { LouisAvatar } from "./LouisAvatar";
import { ModalShell } from "./ModalShell";

type OnboardingModalProps = {
  isOpen: boolean;
  userId: string;
  initialTrafficSource?: string | null;
  initialBibleExperienceLevel?: string | null;
  canInstall?: boolean;
  onInstallPrompt?: () => Promise<void>;
  onFinished: (upgrade: boolean) => void;
};

const TOTAL_STEPS = 8;
const SOURCES = ["Instagram", "Facebook", "Threads", "Word of mouth", "Other"] as const;
const EXPERIENCE = [
  "Just getting started",
  "Been studying for a while",
  "Studying deeply for years",
] as const;
const GOALS = [
  "Understand the Bible better",
  "Build a habit of reading the Bible",
  "Stay consistent with devotionals and study plans",
  "Study with other Bible Buddies",
] as const;
const GOAL_KEY = "bb_onboarding_goal";

function normalizeGoalValue(goal: string | null | undefined) {
  if (!goal) return null;
  switch (goal) {
    case "Understand the Bible better":
    case "understand_bible_better":
      return "understand_bible_better";
    case "Build a habit of reading the Bible":
    case "build_bible_habit":
      return "build_bible_habit";
    case "Stay consistent with devotionals and study plans":
    case "stay_consistent":
      return "stay_consistent";
    case "Study with other Bible Buddies":
    case "study_with_buddies":
      return "study_with_buddies";
    default:
      return null;
  }
}

function hydrateGoalLabel(goal: string | null | undefined) {
  switch (normalizeGoalValue(goal)) {
    case "understand_bible_better":
      return "Understand the Bible better";
    case "build_bible_habit":
      return "Build a habit of reading the Bible";
    case "stay_consistent":
      return "Stay consistent with devotionals and study plans";
    case "study_with_buddies":
      return "Study with other Bible Buddies";
    default:
      return null;
  }
}

function Choice({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full rounded-[22px] border px-4 py-4 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-md",
        selected
          ? "border-[#4f7fd6] bg-white/95 text-[#23457f] shadow-sm"
          : "border-white/70 bg-white/55 text-gray-700 hover:border-[#b7d2f7] hover:bg-white/85",
      ].join(" ")}
    >
      <div className="text-sm font-semibold sm:text-[15px]">{label}</div>
      {description ? <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">{description}</p> : null}
    </button>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[22px] border border-white/70 bg-white/55 px-4 py-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 sm:text-[15px]">{title}</h3>
      <p className="mt-1.5 text-xs leading-5 text-gray-600 sm:text-sm">{description}</p>
    </div>
  );
}

export function OnboardingModal({
  isOpen,
  userId,
  initialTrafficSource,
  initialBibleExperienceLevel,
  canInstall = false,
  onInstallPrompt,
  onFinished,
}: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [source, setSource] = useState<string | null>(null);
  const [otherSource, setOtherSource] = useState("");
  const [experience, setExperience] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [referralState, setReferralState] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [referralError, setReferralError] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent));
    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as Navigator & { standalone?: boolean }).standalone === true,
    );
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setError(null);
    setAvatarFile(null);
    setAvatarPreview(null);
    setBio("");
    setReferralCode("");
    setReferralState("idle");
    setReferralError(null);

    const normalized = typeof initialTrafficSource === "string" && initialTrafficSource.toLowerCase() !== "null"
      ? initialTrafficSource
      : "";
    if (normalized && SOURCES.includes(normalized as (typeof SOURCES)[number])) {
      setSource(normalized);
    } else {
      setSource(null);
    }
    setOtherSource("");

    if (initialBibleExperienceLevel && EXPERIENCE.includes(initialBibleExperienceLevel as (typeof EXPERIENCE)[number])) {
      setExperience(initialBibleExperienceLevel);
    } else {
      setExperience(null);
    }

    if (typeof window !== "undefined") {
      const storedGoal = window.localStorage.getItem(GOAL_KEY);
      const hydratedGoal = hydrateGoalLabel(storedGoal);
      if (hydratedGoal && GOALS.includes(hydratedGoal as (typeof GOALS)[number])) setGoal(hydratedGoal);
      else setGoal(null);
    }
  }, [isOpen, initialTrafficSource, initialBibleExperienceLevel]);

  const progressText = useMemo(() => `${step} of ${TOTAL_STEPS}`, [step]);

  function goToStep(nextStep: number, nextDirection: 1 | -1) {
    setDirection(nextDirection);
    setStep(nextStep);
  }

  function goForward() {
    goToStep(Math.min(TOTAL_STEPS, step + 1), 1);
  }

  function goBack() {
    goToStep(Math.max(1, step - 1), -1);
  }

  async function ensureProfileStatsRow(currentUserId: string) {
    const { data, error } = await supabase.from("profile_stats").select("user_id").eq("user_id", currentUserId).maybeSingle();
    if (error) throw error;
    if (!data) {
      const { error: insertError } = await supabase.from("profile_stats").insert({ user_id: currentUserId, onboarding_completed: false });
      if (insertError) throw insertError;
    }
  }

  async function persistProfileStats(values: {
    traffic_source?: string;
    bible_experience_level?: string;
    onboarding_completed?: boolean;
    profile_image_url?: string;
    bio?: string;
    onboarding_goal?: string;
  }) {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    const currentUserId = session?.user?.id || userId;
    if (!currentUserId) throw new Error("No authenticated user id available for onboarding update");
    await ensureProfileStatsRow(currentUserId);
    const { error } = await supabase.from("profile_stats").update(values).eq("user_id", currentUserId);
    if (error) throw error;
  }

  async function handleContinue() {
    if (isSaving || isUploadingAvatar) return;
    setError(null);

    if (step === 2) {
      if (!source || (source === "Other" && !otherSource.trim())) return;
      try {
        setIsSaving(true);
        await persistProfileStats({ traffic_source: source === "Other" ? `Other: ${otherSource.trim()}` : source });
        goToStep(3, 1);
      } catch (persistError) {
        console.error("[ONBOARDING] Failed to save traffic_source:", persistError);
        setError("We could not save your answer. Please try again.");
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (step === 3) {
      if (!experience) return;
      try {
        setIsSaving(true);
        await persistProfileStats({ bible_experience_level: experience });
        goToStep(4, 1);
      } catch (persistError) {
        console.error("[ONBOARDING] Failed to save bible_experience_level:", persistError);
        setError("We could not save your answer. Please try again.");
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (step === 4) {
      if (!goal) return;
      const normalizedGoal = normalizeGoalValue(goal);
      if (typeof window !== "undefined" && normalizedGoal) {
        window.localStorage.setItem(GOAL_KEY, normalizedGoal);
      }
      if (normalizedGoal) {
        try {
          setIsSaving(true);
          await persistProfileStats({ onboarding_goal: normalizedGoal });
        } catch (persistError) {
          console.warn("[ONBOARDING] Could not save onboarding_goal to profile_stats yet:", persistError);
        } finally {
          setIsSaving(false);
        }
      }
      goToStep(5, 1);
      return;
    }

    if (step === 5) {
      try {
        if (avatarFile) {
          setIsUploadingAvatar(true);
          const { data: { session } } = await supabase.auth.getSession();
          const currentUserId = session?.user?.id || userId;
          const ext = avatarFile.name.split(".").pop() || "jpg";
          const path = `${currentUserId}/avatar.${ext}`;
          const { error: uploadError } = await supabase.storage.from("avatars").upload(path, avatarFile, { upsert: true });
          if (!uploadError) {
            const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
            await persistProfileStats({ profile_image_url: urlData.publicUrl });
          }
        }
        if (bio.trim()) {
          setIsSaving(true);
          await persistProfileStats({ bio: bio.trim() });
        }
      } catch (persistError) {
        console.error("[ONBOARDING] Failed during profile setup:", persistError);
      } finally {
        setIsSaving(false);
        setIsUploadingAvatar(false);
      }
      goToStep(6, 1);
      return;
    }

    if (step < TOTAL_STEPS) goForward();
  }

  async function applyReferralCode() {
    const code = referralCode.trim().toUpperCase();
    if (!code) return;
    setReferralState("checking");
    setReferralError(null);
    try {
      const response = await fetch("/api/ambassador/apply-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const json = await response.json();
      if (json.success) setReferralState("valid");
      else {
        setReferralState("invalid");
        setReferralError(json.error ?? "Invalid code.");
      }
    } catch {
      setReferralState("invalid");
      setReferralError("Could not apply code. Try again.");
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
      setError("We could not save your progress. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  const title =
    step === 1
      ? "Welcome to Bible Buddy"
      : step === 2
        ? "How did you hear about Bible Buddy?"
        : step === 3
          ? "Where are you in your Bible journey right now?"
          : step === 4
            ? "What do you hope to get from Bible Buddy?"
            : step === 5
              ? "Set up your profile"
              : step === 6
                ? "What you get inside Bible Buddy"
                : step === 7
                  ? "Use Bible Buddy like an app"
                  : "Go deeper with Bible Buddy Pro";

  const louisLine =
    step === 1
      ? "Hey, welcome to Bible Buddy. I am here to help you understand the Bible and actually keep coming back to it."
      : step === 2
        ? "Help me understand how people are finding us so we can keep growing Bible Buddy the right way."
        : step === 3
          ? "Tell me where you are right now so Bible Buddy can feel a little more like it was made for you."
          : step === 4
            ? "This helps me understand what matters most to you inside the app."
            : step === 5
              ? "A photo and short bio make Bible Buddy feel like real community, not random usernames."
              : step === 6
                ? "Here is what is waiting for you inside the app once you finish setup."
                : step === 7
                  ? "Bible Buddy is still in beta, but you can already use it like a real app from your home screen."
                  : "Start free if you want, or unlock the full Bible Buddy study experience right now.";

  return (
    <ModalShell isOpen={isOpen} zIndex="z-[200]" backdropColor="bg-black/70" scrollable={true}>
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-[#b7d2f7] bg-[#dce9fb] shadow-2xl shadow-black/30" role="dialog" aria-modal="true" aria-label="Bible Buddy onboarding">
        <div className="px-4 py-4 sm:px-6 sm:py-5 md:px-7 md:py-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL_STEPS }, (_, index) => index + 1).map((current) => (
                <span
                  key={current}
                  className={[
                    "h-2.5 rounded-full transition-all duration-200",
                    current === step ? "w-8 bg-[#4f7fd6]" : current < step ? "w-4 bg-[#7fa4e4]" : "w-4 bg-white/65",
                  ].join(" ")}
                />
              ))}
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#42639d]">{progressText}</p>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-[28px] border border-white/70 bg-white/40 px-4 py-5 text-center shadow-sm sm:px-5">
              <div className="mx-auto flex max-w-2xl flex-col items-center">
                <div className="rounded-full border border-white/80 bg-white/80 p-1.5 shadow-sm">
                  <LouisAvatar mood="wave" size={66} />
                </div>
                <h2 className="mt-3 text-[1.45rem] font-bold leading-tight text-[#1f3f77] sm:text-[1.7rem]">{title}</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#4d6082] sm:text-[15px]">{louisLine}</p>
                {step === 1 ? (
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#4d6082] sm:text-[15px]">
                    This is a short onboarding to show you how Bible Buddy works and help you get started the right way.
                  </p>
                ) : null}
              </div>
            </div>

            <div
              key={step}
              className={[
                "rounded-[28px] border border-white/70 bg-white/40 px-4 py-5 shadow-sm sm:px-5 sm:py-5",
                "onboarding-step-panel",
                direction === 1 ? "onboarding-step-forward" : "onboarding-step-back",
              ].join(" ")}
            >
              {step === 1 ? (
                <div className="space-y-4">
                  <div className="rounded-[22px] border border-white/70 bg-white/55 px-4 py-4">
                    <h3 className="text-sm font-semibold text-gray-900 sm:text-[15px]">What Bible Buddy is really for</h3>
                    <p className="mt-1.5 text-sm leading-6 text-gray-600 sm:text-[15px]">
                      Bible Buddy is here to help you understand the Bible more clearly, build a habit of coming back to it,
                      and keep moving toward a real relationship with God.
                    </p>
                  </div>
                  <div className="rounded-[22px] border border-white/70 bg-white/55 px-4 py-4">
                    <h3 className="text-sm font-semibold text-gray-900 sm:text-[15px]">The one thing that matters</h3>
                    <p className="mt-1.5 text-sm leading-6 text-gray-600 sm:text-[15px]">
                      The app only helps if you actually come back, read the Bible, and use it. That is where real growth happens.
                    </p>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {SOURCES.map((option) => (
                      <Choice
                        key={option}
                        label={option}
                        selected={source === option}
                        onClick={() => {
                          setSource(option);
                          if (option !== "Other") setOtherSource("");
                        }}
                      />
                    ))}
                  </div>
                  {source === "Other" ? (
                    <input
                      type="text"
                      value={otherSource}
                      onChange={(event) => setOtherSource(event.target.value)}
                      placeholder="Type your answer"
                      className="w-full rounded-[18px] border border-white/80 bg-white/85 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#8cb0ec] focus:ring-2 focus:ring-[#cfe0ff] sm:text-[15px]"
                    />
                  ) : null}
                </div>
              ) : null}

              {step === 3 ? (
                <div className="grid gap-3">
                  <Choice
                    label="Just getting started"
                    description="You want help understanding the Bible and knowing where to begin."
                    selected={experience === "Just getting started"}
                    onClick={() => setExperience("Just getting started")}
                  />
                  <Choice
                    label="Been studying for a while"
                    description="You already read the Bible some, but you want more clarity and consistency."
                    selected={experience === "Been studying for a while"}
                    onClick={() => setExperience("Been studying for a while")}
                  />
                  <Choice
                    label="Studying deeply for years"
                    description="You know the Bible well and want stronger tools, context, and structure."
                    selected={experience === "Studying deeply for years"}
                    onClick={() => setExperience("Studying deeply for years")}
                  />
                </div>
              ) : null}

              {step === 4 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {GOALS.map((option) => (
                    <Choice key={option} label={option} selected={goal === option} onClick={() => setGoal(option)} />
                  ))}
                </div>
              ) : null}

              {step === 5 ? (
                <div className="grid gap-4 md:grid-cols-[190px_minmax(0,1fr)]">
                  <div className="flex flex-col items-center gap-3 rounded-[22px] border border-white/70 bg-white/55 px-4 py-4">
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-[#b7d2f7] bg-[#edf4ff] shadow-sm transition hover:scale-[1.02]"
                    >
                      {avatarPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={avatarPreview} alt="Profile preview" className="h-full w-full object-cover" />
                      ) : (
                        <div className="px-3 text-center text-xs font-semibold leading-5 text-[#5873a7]">Add your photo</div>
                      )}
                    </button>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          setAvatarFile(file);
                          setAvatarPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                    {avatarPreview ? (
                      <button
                        type="button"
                        onClick={() => {
                          setAvatarFile(null);
                          setAvatarPreview(null);
                        }}
                        className="text-xs font-medium text-[#5873a7] underline"
                      >
                        Remove photo
                      </button>
                    ) : (
                      <p className="text-center text-xs leading-5 text-gray-500">Optional now. You can always change it later.</p>
                    )}
                  </div>

                  <div className="rounded-[22px] border border-white/70 bg-white/55 px-4 py-4">
                    <h3 className="text-sm font-semibold text-gray-900 sm:text-[15px]">Tell other Bible Buddies who you are</h3>
                    <p className="mt-1.5 text-sm leading-6 text-gray-600 sm:text-[15px]">
                      Add a short bio about why you are here or what you hope to grow in.
                    </p>
                    <textarea
                      value={bio}
                      onChange={(event) => setBio(event.target.value)}
                      maxLength={140}
                      rows={4}
                      placeholder="A short line about why you are here or what you want from Bible Buddy."
                      className="mt-3 w-full resize-none rounded-[18px] border border-white/80 bg-white/90 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#8cb0ec] focus:ring-2 focus:ring-[#cfe0ff] sm:text-[15px]"
                    />
                    <p className="mt-2 text-right text-xs text-gray-500">{bio.length}/140</p>
                  </div>
                </div>
              ) : null}

              {step === 6 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Feature title="The Bible" description="Read an interactive Bible, track your progress chapter by chapter, and switch between WEB, ASV, and KJV." />
                  <Feature title="Bible Buddy Study Group" description="Join weekly studies, share daily insights, and grow with other Bible Buddies in one place." />
                  <Feature title="Bible Study Tools" description="Use devotionals, reading plans, people, places, keywords, and your own study notes to go deeper." />
                  <Feature title="Bible Study Games" description="Play Bible Trivia and Scrambled to help lock key Bible ideas and chapter words into your memory." />
                </div>
              ) : null}

              {step === 7 ? (
                <div className="space-y-4">
                  <div className="rounded-[22px] border border-white/70 bg-white/55 px-4 py-4">
                    <h3 className="text-sm font-semibold text-gray-900 sm:text-[15px]">Bible Buddy is still in beta</h3>
                    <p className="mt-1.5 text-sm leading-6 text-gray-600 sm:text-[15px]">
                      That is why we are not in the App Store or Play Store yet, but you can still use Bible Buddy like an app.
                    </p>
                  </div>

                  {isStandalone ? (
                    <div className="rounded-[22px] border border-white/70 bg-white/55 px-4 py-4">
                      <h3 className="text-sm font-semibold text-gray-900 sm:text-[15px]">You are already set up</h3>
                      <p className="mt-1.5 text-sm leading-6 text-gray-600 sm:text-[15px]">Bible Buddy is already on your home screen.</p>
                    </div>
                  ) : isIOS ? (
                    <div className="rounded-[22px] border border-white/70 bg-white/55 px-4 py-4">
                      <h3 className="text-sm font-semibold text-gray-900 sm:text-[15px]">Add it on iPhone or iPad</h3>
                      <ol className="mt-2 space-y-2 text-sm leading-6 text-gray-600 sm:text-[15px]">
                        <li>1. Open Bible Buddy in Safari.</li>
                        <li>2. Tap Share.</li>
                        <li>3. Tap Add to Home Screen.</li>
                      </ol>
                    </div>
                  ) : canInstall ? (
                    <div className="rounded-[22px] border border-white/70 bg-white/55 px-4 py-4">
                      <h3 className="text-sm font-semibold text-gray-900 sm:text-[15px]">Add Bible Buddy to your home screen</h3>
                      <p className="mt-1.5 text-sm leading-6 text-gray-600 sm:text-[15px]">One tap and Bible Buddy opens like an app.</p>
                      <button
                        type="button"
                        onClick={() => void onInstallPrompt?.()}
                        className="mt-3 inline-flex rounded-[18px] bg-[#4f7fd6] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3f6fc6]"
                      >
                        Add to Home Screen
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-[22px] border border-white/70 bg-white/55 px-4 py-4">
                      <h3 className="text-sm font-semibold text-gray-900 sm:text-[15px]">Use your browser menu</h3>
                      <p className="mt-1.5 text-sm leading-6 text-gray-600 sm:text-[15px]">
                        Open your browser menu and choose Add to Home Screen for quicker access.
                      </p>
                    </div>
                  )}
                </div>
              ) : null}

              {step === 8 ? (
                <div className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-[24px] border border-white/70 bg-white/60 px-4 py-5 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900">Free</h3>
                      <p className="mt-1 text-sm text-gray-600">Perfect for getting started</p>
                      <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-700">
                        <li>Read the Bible for free</li>
                        <li>Track notes, progress, and streaks</li>
                        <li>Get 5 study credits each day</li>
                      </ul>
                      <p className="mt-4 text-lg font-bold text-gray-900">$0</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Forever free</p>
                    </div>
                    <div className="relative overflow-hidden rounded-[24px] border-2 border-[#4f7fd6] bg-white px-4 py-5 shadow-md">
                      <div className="absolute right-3 top-3 rounded-full bg-[#4f7fd6] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                        Recommended
                      </div>
                      <h3 className="text-lg font-semibold text-[#22457e]">Pro</h3>
                      <p className="mt-1 text-sm text-gray-600">Unlimited Bible study</p>
                      <div className="mt-4 space-y-2">
                        <div className="rounded-[18px] border border-[#cfe0ff] bg-[#f4f8ff] px-3 py-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f7fd6]">Monthly</p>
                          <p className="mt-1 text-xl font-bold text-[#22457e]">$4.99</p>
                          <p className="text-xs text-gray-500">per month</p>
                        </div>
                        <div className="rounded-[18px] border border-[#cfe0ff] bg-white px-3 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f7fd6]">Yearly</p>
                              <p className="mt-1 text-xl font-bold text-[#22457e]">$50</p>
                              <p className="text-xs text-gray-500">per year</p>
                            </div>
                            <span className="rounded-full bg-[#fff4bf] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a6a00]">
                              Best Value
                            </span>
                          </div>
                        </div>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-700">
                        <li>Everything in Free</li>
                        <li>Unlimited people, places, and keywords</li>
                        <li>Unlimited Bible Trivia and Scrambled</li>
                        <li>Full devotionals, reading plans, and Louis access</li>
                      </ul>
                      <div className="mt-4 rounded-[18px] border border-[#cfe0ff] bg-[#f4f8ff] px-3 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4f7fd6]">What You Unlock</p>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Study without daily limits and use the full Bible Buddy experience the way it was meant to feel.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/70 bg-white/60 px-4 py-4">
                    <h3 className="text-sm font-semibold text-gray-900 sm:text-[15px]">Code</h3>
                    {referralState === "valid" ? (
                      <p className="mt-2 text-sm font-semibold leading-6 text-green-700 sm:text-[15px]">Your 30 day Pro trial is ready.</p>
                    ) : (
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <input
                          type="text"
                          value={referralCode}
                          onChange={(event) => {
                            setReferralCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
                            setReferralState("idle");
                            setReferralError(null);
                          }}
                          placeholder="Enter code"
                          maxLength={16}
                          className="flex-1 rounded-[18px] border border-white/80 bg-white/90 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-700 outline-none transition focus:border-[#8cb0ec] focus:ring-2 focus:ring-[#cfe0ff]"
                        />
                        <button
                          type="button"
                          onClick={() => void applyReferralCode()}
                          disabled={!referralCode.trim() || referralState === "checking"}
                          className="rounded-[18px] bg-white px-4 py-3 text-sm font-semibold text-[#31528d] shadow-sm transition hover:bg-[#f5f9ff] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {referralState === "checking" ? "Checking..." : "Apply"}
                        </button>
                      </div>
                    )}
                    {referralState === "invalid" && referralError ? <p className="mt-2 text-xs text-red-600">{referralError}</p> : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                disabled={isSaving || isUploadingAvatar}
                className="rounded-[18px] border border-white/80 bg-white/80 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={() => void handleContinue()}
                disabled={
                  isSaving ||
                  isUploadingAvatar ||
                  (step === 2 && (!source || (source === "Other" && !otherSource.trim()))) ||
                  (step === 3 && !experience) ||
                  (step === 4 && !goal)
                }
                className="rounded-[18px] bg-[#4f7fd6] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3f6fc6] disabled:cursor-not-allowed disabled:bg-[#9db9eb]"
              >
                {isUploadingAvatar ? "Uploading..." : isSaving ? "Saving..." : "Continue"}
              </button>
            ) : (
              <div className="ml-auto flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <button
                  type="button"
                  onClick={() => void handleFinish(false)}
                  disabled={isSaving}
                  className="rounded-[18px] border border-white/80 bg-white/80 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Continue as Free User"}
                </button>
                <button
                  type="button"
                  onClick={() => void handleFinish(true)}
                  disabled={isSaving}
                  className="rounded-[18px] bg-[#4f7fd6] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3f6fc6] disabled:cursor-not-allowed disabled:bg-[#9db9eb]"
                >
                  {isSaving ? "Saving..." : "Upgrade to Pro"}
                </button>
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
          .onboarding-step-panel {
            animation-duration: 360ms;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
            animation-fill-mode: both;
          }

          .onboarding-step-forward {
            animation-name: onboarding-slide-forward;
          }

          .onboarding-step-back {
            animation-name: onboarding-slide-back;
          }

          @keyframes onboarding-slide-forward {
            0% {
              opacity: 0;
              transform: translateX(36px) scale(0.985);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @keyframes onboarding-slide-back {
            0% {
              opacity: 0;
              transform: translateX(-36px) scale(0.985);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
        `}</style>
      </div>
    </ModalShell>
  );
}
