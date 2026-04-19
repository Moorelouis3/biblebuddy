"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { supabase } from "../lib/supabaseClient";
import { LouisAvatar } from "./LouisAvatar";

type OnboardingModalProps = {
  isOpen: boolean;
  userId: string;
  initialTrafficSource?: string | null;
  initialBibleExperienceLevel?: string | null;
  canInstall?: boolean;
  onInstallPrompt?: () => Promise<void>;
  onFinished: (upgrade: boolean) => void;
};

type OnboardingStage =
  | "intro"
  | "source"
  | "experience"
  | "goal"
  | "profile"
  | "upgrade"
  | "final";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const SOURCES = ["Instagram", "Facebook", "Threads", "Word of mouth", "Other"] as const;
const EXPERIENCE = [
  "Just getting started",
  "Been studying for a while",
  "Studying deeply for years",
] as const;
const GOALS = [
  "Understand the Bible better",
  "Build a habit of reading",
  "Study with other Bible Buddies",
] as const;

const GOAL_KEY = "bb_onboarding_goal";
const ONBOARDING_STARTED_KEY_PREFIX = "bb:louis:onboarding-started:";

function getStartedKey(userId: string) {
  return `${ONBOARDING_STARTED_KEY_PREFIX}${userId}`;
}

function normalizeGoalValue(goal: string | null | undefined) {
  if (!goal) return null;
  switch (goal) {
    case "Understand the Bible better":
    case "understand_bible_better":
      return "understand_bible_better";
    case "Build a habit of reading":
    case "Build a habit of reading the Bible":
    case "build_bible_habit":
      return "build_bible_habit";
    case "Study with other Bible Buddies":
    case "study_with_buddies":
      return "study_with_buddies";
    case "Stay consistent with devotionals and study plans":
    case "stay_consistent":
      return "stay_consistent";
    default:
      return null;
  }
}

function hydrateGoalLabel(goal: string | null | undefined) {
  switch (normalizeGoalValue(goal)) {
    case "understand_bible_better":
      return "Understand the Bible better";
    case "build_bible_habit":
      return "Build a habit of reading";
    case "study_with_buddies":
      return "Study with other Bible Buddies";
    case "stay_consistent":
      return "Build a habit of reading";
    default:
      return null;
  }
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function getStageFromProfile(profile: {
  traffic_source?: string | null;
  bible_experience_level?: string | null;
  onboarding_goal?: string | null;
  display_name?: string | null;
  bio?: string | null;
  profile_image_url?: string | null;
}) {
  if (!profile.traffic_source) return "source" as const;
  if (!profile.bible_experience_level) return "experience" as const;
  if (!normalizeGoalValue(profile.onboarding_goal)) return "goal" as const;
  if (!profile.display_name?.trim() || !profile.bio?.trim() || !profile.profile_image_url?.trim()) return "profile" as const;
  return "upgrade" as const;
}

export function OnboardingModal({
  isOpen,
  userId,
  initialTrafficSource,
  initialBibleExperienceLevel,
  onFinished,
}: OnboardingModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stage, setStage] = useState<OnboardingStage>("intro");
  const [started, setStarted] = useState(false);
  const [showNoLoopPopup, setShowNoLoopPopup] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [finalizingUpgradeChoice, setFinalizingUpgradeChoice] = useState<boolean | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping, started, showNoLoopPopup]);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    async function hydrate() {
      const { data } = await supabase
        .from("profile_stats")
        .select("traffic_source, bible_experience_level, onboarding_goal, display_name, bio, profile_image_url")
        .eq("user_id", userId)
        .maybeSingle();

      if (cancelled) return;

      const nextSource =
        typeof data?.traffic_source === "string" && data.traffic_source.trim()
          ? data.traffic_source.trim()
          : initialTrafficSource ?? null;
      const nextExperience =
        typeof data?.bible_experience_level === "string" && data.bible_experience_level.trim()
          ? data.bible_experience_level.trim()
          : initialBibleExperienceLevel ?? null;
      const nextGoal = hydrateGoalLabel(data?.onboarding_goal) ?? hydrateGoalLabel(typeof window !== "undefined" ? window.localStorage.getItem(GOAL_KEY) : null);

      setSource(nextSource && SOURCES.includes(nextSource as (typeof SOURCES)[number]) ? nextSource : nextSource);
      setExperience(nextExperience && EXPERIENCE.includes(nextExperience as (typeof EXPERIENCE)[number]) ? nextExperience : nextExperience);
      setGoal(nextGoal);
      setDisplayName(data?.display_name?.trim() ?? "");
      setBio(data?.bio?.trim() ?? "");
      setAvatarPreview(data?.profile_image_url?.trim() ?? null);
      setAvatarFile(null);
      setError(null);
      setShowNoLoopPopup(false);
      setFinalizingUpgradeChoice(null);

      const storedStarted = typeof window !== "undefined" && window.localStorage.getItem(getStartedKey(userId)) === "1";
      const nextStarted = storedStarted && Boolean(data);
      setStarted(nextStarted);
      setMessages([]);
      setIsTyping(false);

      if (nextStarted) {
        const nextStage = getStageFromProfile({
          traffic_source: nextSource,
          bible_experience_level: nextExperience,
          onboarding_goal: normalizeGoalValue(nextGoal),
          display_name: data?.display_name ?? null,
          bio: data?.bio ?? null,
          profile_image_url: data?.profile_image_url ?? null,
        });
        setStage(nextStage);
      } else {
        setStage("intro");
      }
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, [isOpen, userId, initialTrafficSource, initialBibleExperienceLevel]);

  useEffect(() => {
    if (!isOpen || !started) return;
    if (messages.length > 0 || isTyping) return;

    void showStagePrompt(stage);
  }, [isOpen, started, stage, messages.length, isTyping]);

  async function ensureProfileStatsRow() {
    const { data } = await supabase.from("profile_stats").select("user_id").eq("user_id", userId).maybeSingle();
    if (!data) {
      const { error } = await supabase.from("profile_stats").insert({ user_id: userId, onboarding_completed: false });
      if (error) throw error;
    }
  }

  async function persistProfile(values: Record<string, unknown>) {
    await ensureProfileStatsRow();
    const { error } = await supabase.from("profile_stats").update(values).eq("user_id", userId);
    if (error) throw error;
  }

  function appendAssistantMessage(content: string) {
    setMessages((prev) => [...prev, { id: `${Date.now()}-${prev.length}-assistant`, role: "assistant", content }]);
  }

  async function appendAssistantWithDelay(content: string, delay = 450) {
    setIsTyping(true);
    await wait(delay);
    setIsTyping(false);
    appendAssistantMessage(content);
  }

  async function showStagePrompt(nextStage: OnboardingStage) {
    if (nextStage === "source") {
      await appendAssistantWithDelay("where did you hear about Bible Buddy?");
      return;
    }
    if (nextStage === "experience") {
      await appendAssistantWithDelay("where are you in your Bible journey right now?");
      return;
    }
    if (nextStage === "goal") {
      await appendAssistantWithDelay("what do you want help with the most?");
      return;
    }
    if (nextStage === "profile") {
      await appendAssistantWithDelay(
        "step 1… let’s set up your profile\n\ntell me your full name\n\nwrite a short bio 1 to 2 sentences\n\nand upload a profile picture",
      );
      return;
    }
    if (nextStage === "upgrade") {
      await appendAssistantWithDelay(
        "one more thing\n\nright now you’re on the free version of Bible Buddy\n\nthat means you get 5 credits a day\nwhich covers your main actions\n\nif you ever want unlimited access\nyou can upgrade for $4.99 a month",
      );
      return;
    }
    if (nextStage === "final") {
      await appendAssistantWithDelay(
        "that’s enough for today\n\nI’ll let you explore the app\n\nbut starting today… we’re building a real Bible habit\n\nI’ll check in with you tomorrow\n\nand if you ever have questions… just click me",
      );
      return;
    }
  }

  async function handleStartIntro() {
    setStarted(true);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(getStartedKey(userId));
    }
    setMessages([]);
    appendAssistantMessage(
      "hey… my name is Little Louis\n\nI’m your Bible Buddy\n\nyou signed up for a reason…\nprobably to understand the Bible better\nand actually build a habit with it\n\nI wanna help you do that\n\nbut first… I need to ask you a few quick questions\n\nit only takes about 60 seconds",
    );
    setStage("intro");
  }

  async function handleIntroAnswer(answer: "Yes" | "No") {
    if (answer === "No") {
      setShowNoLoopPopup(true);
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(getStartedKey(userId), "1");
    }
    const nextStage = getStageFromProfile({
      traffic_source: source,
      bible_experience_level: experience,
      onboarding_goal: normalizeGoalValue(goal),
      display_name: displayName,
      bio,
      profile_image_url: avatarPreview,
    });
    setStage(nextStage);
    setMessages([]);
    await showStagePrompt(nextStage);
  }

  async function handleSourceSelect(value: string) {
    setSource(value);
    setIsSaving(true);
    setError(null);
    try {
      await persistProfile({ traffic_source: value });
      setStage("experience");
      await showStagePrompt("experience");
    } catch (saveError: any) {
      setError(saveError?.message || "Could not save that answer.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleExperienceSelect(value: string) {
    setExperience(value);
    setIsSaving(true);
    setError(null);
    try {
      await persistProfile({ bible_experience_level: value });
      const response =
        value === "Just getting started"
          ? "perfect… we’ll build this the right way from the start"
          : value === "Been studying for a while"
            ? "good… now we lock in consistency"
            : "I like that… let’s go deeper then";
      await appendAssistantWithDelay(response, 350);
      setStage("goal");
      await showStagePrompt("goal");
    } catch (saveError: any) {
      setError(saveError?.message || "Could not save that answer.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleGoalSelect(value: string) {
    setGoal(value);
    const normalizedGoal = normalizeGoalValue(value);
    if (typeof window !== "undefined" && normalizedGoal) {
      window.localStorage.setItem(GOAL_KEY, normalizedGoal);
    }

    setIsSaving(true);
    setError(null);
    try {
      await persistProfile({ onboarding_goal: normalizedGoal });
      const response =
        value === "Understand the Bible better"
          ? "that’s exactly what this app is built for"
          : value === "Build a habit of reading"
            ? "we’re locking that in starting today"
            : "you don’t have to do this alone";
      await appendAssistantWithDelay(response, 350);
      setStage("profile");
      await showStagePrompt("profile");
    } catch (saveError: any) {
      setError(saveError?.message || "Could not save that answer.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleAvatarPick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleSaveProfileStep() {
    if (!displayName.trim() || !bio.trim() || (!avatarFile && !avatarPreview)) {
      setError("Add your full name, a short bio, and a profile picture first.");
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      let publicUrl = avatarPreview;

      if (avatarFile) {
        const ext = avatarFile.name.split(".").pop() || "jpg";
        const path = `${userId}/avatar.${ext}`;
        const { error: uploadError } = await supabase.storage.from("avatars").upload(path, avatarFile, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
        publicUrl = urlData.publicUrl;
      }

      await persistProfile({
        display_name: displayName.trim(),
        bio: bio.trim(),
        profile_image_url: publicUrl,
      });

      await appendAssistantWithDelay("perfect, now you’re part of the community", 350);
      setStage("upgrade");
      await showStagePrompt("upgrade");
    } catch (saveError: any) {
      setError(saveError?.message || "Could not save your profile.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpgradeChoice(choice: "Continue Free" | "Upgrade") {
    if (choice === "Upgrade") {
      setFinalizingUpgradeChoice(true);
      await handleFinish(true);
      return;
    }

    setFinalizingUpgradeChoice(false);
    setStage("final");
    await showStagePrompt("final");
  }

  async function handleFinish(upgradeOverride?: boolean) {
    if (isSaving) return;
    setIsSaving(true);
    setError(null);
    try {
      await persistProfile({ onboarding_completed: true });
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(getStartedKey(userId));
      }
      onFinished(typeof upgradeOverride === "boolean" ? upgradeOverride : Boolean(finalizingUpgradeChoice));
    } catch (saveError: any) {
      setError(saveError?.message || "Could not finish onboarding.");
    } finally {
      setIsSaving(false);
    }
  }

  const stageButtons = useMemo(() => {
    if (!started) return [];
    if (stage === "intro") return ["Yes", "No"];
    if (stage === "source") return [...SOURCES];
    if (stage === "experience") return [...EXPERIENCE];
    if (stage === "goal") return [...GOALS];
    if (stage === "upgrade") return ["Continue Free", "Upgrade"];
    if (stage === "final") return ["Start Exploring"];
    return [];
  }, [started, stage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[220]">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

      {!started ? (
        <>
          <div className="absolute inset-0 pointer-events-auto" />
          <button
            type="button"
            onClick={() => void handleStartIntro()}
            className="absolute bottom-5 right-5 md:bottom-8 md:right-8 z-[222] flex flex-col items-center gap-2"
          >
            <div className="relative">
              <span className="absolute inset-[-10px] rounded-full bg-sky-300/40 animate-ping" />
              <div className="relative rounded-full bg-white p-1.5 shadow-2xl ring-4 ring-sky-200/80 animate-bounce">
                <LouisAvatar mood="wave" size={74} />
              </div>
            </div>
            <span className="rounded-full bg-[#5f8ef0] px-3 py-1 text-xs font-semibold text-white shadow-md">
              Start with Little Louis
            </span>
          </button>
        </>
      ) : (
        <div className="absolute inset-0 pointer-events-auto">
          <div className="absolute inset-0" />
          <div className="absolute bottom-4 right-4 left-4 md:left-auto md:w-[430px] z-[222]">
            <div className="overflow-hidden rounded-[28px] border border-[#d7e4ff] bg-white shadow-2xl">
              <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
                <div className="rounded-full bg-[#eef5ff] p-1">
                  <LouisAvatar mood="wave" size={38} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Little Louis</p>
                  <p className="text-xs text-gray-500">Your Bible Buddy</p>
                </div>
              </div>

              <div className="max-h-[62vh] overflow-y-auto bg-[#f8fbff] px-4 py-4">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={message.role === "assistant" ? "flex items-start gap-2" : "flex justify-end"}
                    >
                      {message.role === "assistant" ? (
                        <>
                          <div className="mt-1 rounded-full bg-white p-1 shadow-sm">
                            <LouisAvatar mood="bible" size={28} />
                          </div>
                          <div className="max-w-[84%] rounded-[24px] rounded-tl-md border border-[#dbe8ff] bg-white px-4 py-3 text-left text-[15px] leading-7 text-gray-900 whitespace-pre-line shadow-sm">
                            {message.content}
                          </div>
                        </>
                      ) : (
                        <div className="max-w-[84%] rounded-[24px] rounded-tr-md bg-[#5f8ef0] px-4 py-3 text-[15px] leading-7 text-white shadow-sm whitespace-pre-line">
                          {message.content}
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping ? (
                    <div className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-white p-1 shadow-sm">
                        <LouisAvatar mood="think" size={28} />
                      </div>
                      <div className="rounded-[24px] rounded-tl-md border border-[#dbe8ff] bg-white px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#8db1f5] animate-bounce [animation-delay:-0.25s]" />
                          <span className="h-2 w-2 rounded-full bg-[#8db1f5] animate-bounce [animation-delay:-0.12s]" />
                          <span className="h-2 w-2 rounded-full bg-[#8db1f5] animate-bounce" />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {stage === "profile" ? (
                    <div className="ml-10 rounded-[24px] border border-[#dbe8ff] bg-white px-4 py-4 shadow-sm">
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={displayName}
                          onChange={(event) => setDisplayName(event.target.value)}
                          placeholder="Full name"
                          className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#7aa7f1] focus:ring-2 focus:ring-[#d8e7ff]"
                        />
                        <textarea
                          value={bio}
                          onChange={(event) => setBio(event.target.value)}
                          rows={3}
                          maxLength={160}
                          placeholder="Short bio"
                          className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#7aa7f1] focus:ring-2 focus:ring-[#d8e7ff]"
                        />
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => avatarInputRef.current?.click()}
                            className="rounded-2xl border border-gray-200 bg-[#f7fbff] px-4 py-3 text-sm font-semibold text-[#31528d] transition hover:bg-[#eef5ff]"
                          >
                            Upload profile picture
                          </button>
                          {avatarPreview ? (
                            <img src={avatarPreview} alt="Profile preview" className="h-12 w-12 rounded-full object-cover border border-gray-200" />
                          ) : null}
                        </div>
                        <input
                          ref={avatarInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => void handleAvatarPick(event)}
                        />
                        <button
                          type="button"
                          onClick={() => void handleSaveProfileStep()}
                          disabled={isSaving || !displayName.trim() || !bio.trim() || (!avatarFile && !avatarPreview)}
                          className="w-full rounded-2xl bg-[#6fb48b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5ea27a] disabled:opacity-50"
                        >
                          {isSaving ? "Saving..." : "Save and continue"}
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div ref={bottomRef} />
                </div>
              </div>

              {stageButtons.length > 0 ? (
                <div className="border-t border-gray-100 bg-white px-4 py-4">
                  <div className="grid gap-2">
                    {stageButtons.map((buttonLabel) => (
                      <button
                        key={buttonLabel}
                        type="button"
                        disabled={isSaving || isTyping}
                        onClick={() => {
                          if (stage === "intro") {
                            void handleIntroAnswer(buttonLabel as "Yes" | "No");
                          } else if (stage === "source") {
                            void handleSourceSelect(buttonLabel);
                          } else if (stage === "experience") {
                            void handleExperienceSelect(buttonLabel);
                          } else if (stage === "goal") {
                            void handleGoalSelect(buttonLabel);
                          } else if (stage === "upgrade") {
                            void handleUpgradeChoice(buttonLabel as "Continue Free" | "Upgrade");
                          } else if (stage === "final") {
                            void handleFinish();
                          }
                        }}
                        className={
                          buttonLabel === "Yes" || buttonLabel === "Continue Free" || buttonLabel === "Start Exploring"
                            ? "rounded-2xl bg-[#6fb48b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5ea27a] disabled:opacity-50"
                            : buttonLabel === "No"
                              ? "rounded-2xl bg-[#e98585] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#d96d6d] disabled:opacity-50"
                              : buttonLabel === "Upgrade"
                                ? "rounded-2xl bg-[#5f8ef0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4878dc] disabled:opacity-50"
                                : "rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 disabled:opacity-50"
                        }
                      >
                        {buttonLabel}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {error ? <div className="border-t border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
            </div>
          </div>

          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-[221] opacity-0 pointer-events-none">
            <LouisAvatar mood="wave" size={68} />
          </div>
        </div>
      )}

      {showNoLoopPopup ? (
        <div className="absolute inset-0 z-[230] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full max-w-sm rounded-[28px] bg-white p-6 shadow-2xl">
            <p className="text-base leading-8 text-gray-900 whitespace-pre-line">
              {"You signed up for Bible Buddy for a reason\n\nI’m here to help you understand the Bible\nand build a real habit with it\n\nbut I need these answers first\n\nit only takes about 60 seconds"}
            </p>
            <button
              type="button"
              onClick={() => setShowNoLoopPopup(false)}
              className="mt-5 w-full rounded-2xl bg-[#6fb48b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5ea27a]"
            >
              Oh okay
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
