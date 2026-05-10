"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import { ensureLouisDailyTaskCycle, rememberLouisDailyTaskTarget } from "../lib/louisDailyFlow";
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

type StudyOption = {
  title: string;
  cover: string;
  description: string;
  id?: string;
};

type ChoiceOption = {
  label: string;
  description?: string;
  icon: string;
};

type LouisMood = "wave" | "stareyes" | "think" | "pray" | "sheesh" | "bible" | "smile" | "cool" | "hands" | "salute" | "sideeye";

const TOTAL_SLIDES = 10;

const SOURCE_OPTIONS: ChoiceOption[] = [
  { label: "Instagram", icon: "📸" },
  { label: "Threads", icon: "@" },
  { label: "YouTube", icon: "▶️" },
  { label: "Facebook", icon: "f" },
  { label: "Word of mouth", icon: "👥" },
  { label: "Other", icon: "📣" },
];

const EXPERIENCE_OPTIONS: ChoiceOption[] = [
  { label: "Just starting", description: "I’m new to Bible reading or just getting started.", icon: "🌱" },
  { label: "1–3 years", description: "I’ve been reading the Bible for a little while.", icon: "🗓️" },
  { label: "3+ years", description: "I’ve built some consistency in my Bible reading.", icon: "🌳" },
  { label: "10+ years", description: "I’ve been reading and studying the Bible for many years.", icon: "🏆" },
];

const GOAL_OPTIONS: ChoiceOption[] = [
  {
    label: "To be more consistent",
    description: "Build a daily habit and stay consistent with my Bible reading.",
    icon: "🎯",
  },
  {
    label: "To understand more",
    description: "Gain a deeper understanding of Scripture and what it means.",
    icon: "💡",
  },
  {
    label: "To be part of a community and discuss Bible themes",
    description: "Engage in meaningful discussions and learn from other believers.",
    icon: "💬",
  },
  {
    label: "To grow spiritually",
    description: "Strengthen my relationship with God and grow in my faith.",
    icon: "🌱",
  },
];

const STARTER_STUDIES: StudyOption[] = [
  {
    title: "The Testing of Joseph",
    cover: "/newtesting.png",
    description:
      "Walk through Joseph’s story of betrayal, waiting, testing, forgiveness, and God’s faithfulness through every chapter.",
  },
  {
    title: "The Wisdom of Proverbs",
    cover: "/WisdomofProverbs.png",
    description:
      "Study Proverbs chapter by chapter and learn how wisdom shapes speech, decisions, relationships, money, discipline, and daily life.",
  },
  {
    title: "The Heart of David",
    cover: "/heartofdaviddevotional.png",
    description:
      "Explore the life of King David, his faith, victories, mistakes, and his heart for God. Learn how God used him to fulfill His purpose.",
  },
  {
    title: "The Disciples of Jesus",
    cover: "/disciplesofjesusdevotional.png",
    description:
      "Follow Jesus’ disciples as they are called, corrected, shaped, and sent. Learn what real discipleship looks like today.",
  },
  {
    title: "Women of the Bible",
    cover: "/womenofthebible.png",
    description:
      "Meet women across Scripture whose courage, faith, pain, wisdom, and obedience reveal how God works through real lives.",
  },
  {
    title: "The Transforming of Paul",
    cover: "/transformingofpauldevotional.png",
    description:
      "Follow Paul from opposition to transformation and mission, seeing how grace can redirect a life completely.",
  },
];

function normalizeGoalValue(goal: string | null | undefined) {
  if (!goal) return null;
  switch (goal) {
    case "To be more consistent":
      return "build_bible_habit";
    case "To understand more":
      return "understand_bible_better";
    case "To be part of a community and discuss Bible themes":
      return "study_with_buddies";
    case "To grow spiritually":
      return "grow_spiritually";
    default:
      return goal;
  }
}

function optionFromStored<T extends readonly ChoiceOption[]>(options: T, value: string | null | undefined) {
  if (!value) return null;
  return options.find((option) => option.label === value)?.label ?? null;
}

function goalFromStored(value: string | null | undefined) {
  switch (value) {
    case "build_bible_habit":
      return "To be more consistent";
    case "understand_bible_better":
      return "To understand more";
    case "study_with_buddies":
      return "To be part of a community and discuss Bible themes";
    case "grow_spiritually":
      return "To grow spiritually";
    default:
      return optionFromStored(GOAL_OPTIONS, value);
  }
}

function ProgressPills({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2" aria-label={`Onboarding step ${activeIndex + 1} of ${TOTAL_SLIDES}`}>
      {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 rounded-full transition-all ${
            index === activeIndex ? "w-8 bg-[#2f80ed]" : "w-5 bg-[#e3e6ee]"
          }`}
        />
      ))}
    </div>
  );
}

function LouisHero({ mood = "wave" }: { mood?: LouisMood }) {
  return (
    <div className="relative mx-auto mb-5 h-44 w-44">
      <div className="absolute inset-0 rounded-full bg-[#eef6ff]" />
      <span className="absolute left-[-10px] top-16 text-3xl text-[#3b6cf6]">✦</span>
      <span className="absolute right-[-6px] top-24 text-2xl text-[#f6b720]">✦</span>
      <span className="absolute right-6 top-3 h-3 w-3 rounded-full bg-[#7fb2e8]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <LouisAvatar mood={mood} size={150} />
      </div>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="mt-6 w-full rounded-2xl bg-[#2878f0] px-5 py-4 text-base font-bold text-white shadow-[0_12px_24px_rgba(40,120,240,0.24)] transition hover:bg-[#1f6ee3] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}

function OnboardingShell({
  children,
  activeIndex,
}: {
  children: ReactNode;
  activeIndex: number;
}) {
  return (
    <div className="fixed inset-0 z-[260] overflow-y-auto bg-white">
      <div className="flex min-h-screen items-center justify-center px-4 py-6 md:bg-[#f7f9ff]">
        <div className="flex min-h-[calc(100vh-48px)] w-full max-w-[390px] flex-col justify-center rounded-none bg-white px-2 py-4 md:min-h-[760px] md:rounded-[34px] md:border md:border-[#e6ebf4] md:px-8 md:shadow-2xl">
          {children}
          <ProgressPills activeIndex={activeIndex} />
        </div>
      </div>
    </div>
  );
}

function Headline({ children }: { children: ReactNode }) {
  return <h1 className="text-center text-[34px] font-black leading-[1.04] tracking-[-0.03em] text-[#121a34]">{children}</h1>;
}

function Subtitle({ children }: { children: ReactNode }) {
  return <p className="mx-auto mt-4 max-w-[310px] text-center text-[15px] font-medium leading-6 text-[#76809a]">{children}</p>;
}

function InfoRows({ rows }: { rows: ChoiceOption[] }) {
  return (
    <div className="mt-8 space-y-1">
      {rows.map((row, index) => (
        <div key={row.label} className={`flex gap-4 py-3 ${index > 0 ? "border-t border-[#e4e9f3]" : ""}`}>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf5ff] text-2xl text-[#2f80ed]">
            {row.icon}
          </div>
          <div className="text-left">
            <p className="text-[15px] font-extrabold leading-5 text-[#141b34]">{row.label}</p>
            <p className="mt-1 text-[13px] font-medium leading-5 text-[#656f87]">{row.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChoiceCards({
  options,
  selected,
  onSelect,
  disabled,
}: {
  options: ChoiceOption[];
  selected: string | null;
  onSelect: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="mt-8 space-y-3">
      {options.map((option) => {
        const isSelected = selected === option.label;
        return (
          <button
            key={option.label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(option.label)}
            className={`flex w-full items-center gap-4 rounded-2xl border bg-white px-4 py-4 text-left shadow-[0_8px_22px_rgba(25,39,78,0.06)] transition ${
              isSelected ? "border-[#8fe0b5] bg-[#f0fff6]" : "border-[#e6ebf3] hover:border-[#b8d4ff]"
            }`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf5ff] text-2xl font-black text-[#2f80ed]">
              {option.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-extrabold leading-5 text-[#141b34]">{option.label}</span>
              {option.description ? (
                <span className="mt-1 block text-[12px] font-semibold leading-4 text-[#616b82]">{option.description}</span>
              ) : null}
            </span>
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                isSelected ? "border-[#24b978] bg-[#24b978]" : "border-[#d8dde8]"
              }`}
            >
              {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function OnboardingModal({
  isOpen,
  userId,
  initialTrafficSource,
  initialBibleExperienceLevel,
  onFinished,
}: OnboardingModalProps) {
  const [slide, setSlide] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");
  const [selectedStudyIndex, setSelectedStudyIndex] = useState(2);
  const [showStudyDescription, setShowStudyDescription] = useState(true);
  const [studies, setStudies] = useState<StudyOption[]>(STARTER_STUDIES);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const studyDragStartX = useRef<number | null>(null);
  const studyDraggedRef = useRef(false);
  const [studyDragX, setStudyDragX] = useState(0);

  const selectedStudy = studies[selectedStudyIndex] ?? studies[0];

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    async function hydrate() {
      setError(null);
      const { data } = await supabase
        .from("profile_stats")
        .select("traffic_source, bible_experience_level, onboarding_goal, display_name, profile_image_url, free_devotional_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (cancelled) return;

      setSource(optionFromStored(SOURCE_OPTIONS, data?.traffic_source) ?? optionFromStored(SOURCE_OPTIONS, initialTrafficSource));
      setExperience(
        optionFromStored(EXPERIENCE_OPTIONS, data?.bible_experience_level) ??
          optionFromStored(EXPERIENCE_OPTIONS, initialBibleExperienceLevel),
      );
      setGoal(goalFromStored(data?.onboarding_goal));
      setFullName(data?.display_name?.trim() ?? "");
      setAvatarPreview(data?.profile_image_url?.trim() || null);
      setAvatarFile(null);

      const { data: devotionalRows } = await supabase
        .from("devotionals")
        .select("id, title, description")
        .in("title", STARTER_STUDIES.map((study) => study.title));

      if (cancelled || !devotionalRows?.length) return;

      const merged = STARTER_STUDIES.map((study) => {
        const row = devotionalRows.find((item) => item.title === study.title);
        return {
          ...study,
          id: row?.id,
          description: row?.description?.trim() || study.description,
        };
      });
      setStudies(merged);

      const currentIndex = merged.findIndex((study) => study.id && study.id === data?.free_devotional_id);
      if (currentIndex >= 0) setSelectedStudyIndex(currentIndex);
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, [isOpen, userId, initialTrafficSource, initialBibleExperienceLevel]);

  async function ensureProfileStatsRow() {
    const { data } = await supabase.from("profile_stats").select("user_id").eq("user_id", userId).maybeSingle();
    if (!data) {
      const { error: insertError } = await supabase.from("profile_stats").insert({ user_id: userId, onboarding_completed: false });
      if (insertError) throw insertError;
    }
  }

  async function persistProfile(values: Record<string, unknown>) {
    await ensureProfileStatsRow();
    const { error: updateError } = await supabase.from("profile_stats").update(values).eq("user_id", userId);
    if (updateError) throw updateError;
  }

  async function saveChoice(field: "traffic_source" | "bible_experience_level" | "onboarding_goal", value: string, nextSlide: number) {
    setIsSaving(true);
    setError(null);
    try {
      const dbValue = field === "onboarding_goal" ? normalizeGoalValue(value) : value;
      await persistProfile({ [field]: dbValue });
      if (field === "traffic_source") setSource(value);
      if (field === "bible_experience_level") setExperience(value);
      if (field === "onboarding_goal") setGoal(value);
      window.setTimeout(() => setSlide(nextSlide), 180);
    } catch (saveError: any) {
      setError(saveError?.message || "Could not save that answer.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleAvatarPick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Profile picture must be 5MB or smaller.");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setError(null);
  }

  async function saveProfileAndContinue() {
    const normalizedName = fullName.trim().replace(/\s+/g, " ");

    if (!normalizedName || normalizedName.split(" ").length < 2) {
      setError("Please enter your first and last name.");
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
        display_name: normalizedName,
        ...(publicUrl ? { profile_image_url: publicUrl } : {}),
      });
      setSlide(8);
    } catch (saveError: any) {
      setError(saveError?.message || "Could not save your profile.");
    } finally {
      setIsSaving(false);
    }
  }

  async function startCheckout(plan: "monthly" | "yearly") {
    setSelectedPlan(plan);
    setIsSaving(true);
    setError(null);
    try {
      await persistProfile({ onboarding_completed: false });
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not start checkout.");
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL returned.");
    } catch (checkoutError: any) {
      setError(checkoutError?.message || "Could not start checkout.");
    } finally {
      setIsSaving(false);
    }
  }

  async function finishWithStudy() {
    if (!selectedStudy) return;

    setIsSaving(true);
    setError(null);
    try {
      let studyId = selectedStudy.id ?? null;
      if (!studyId) {
        const { data, error: lookupError } = await supabase
          .from("devotionals")
          .select("id")
          .eq("title", selectedStudy.title)
          .maybeSingle();
        if (lookupError) throw lookupError;
        studyId = data?.id ?? null;
      }

      if (!studyId) throw new Error("Could not find that Bible Study. Please choose another one.");

      await persistProfile({
        free_devotional_id: studyId,
        louis_primary_devotional_id: studyId,
        louis_primary_devotional_day: 1,
        onboarding_completed: true,
      });

      await supabase.from("devotional_progress").upsert(
        {
          user_id: userId,
          devotional_id: studyId,
          day_number: 1,
          is_completed: false,
          reading_completed: false,
        },
        { onConflict: "user_id,devotional_id,day_number" },
      );

      const cycleStartedAt = ensureLouisDailyTaskCycle(userId);
      if (cycleStartedAt) {
        rememberLouisDailyTaskTarget(userId, cycleStartedAt, { devotionalId: studyId, dayNumber: 1 });
      }

      onFinished(false);
    } catch (finishError: any) {
      setError(finishError?.message || "Could not start that Bible Study.");
    } finally {
      setIsSaving(false);
    }
  }

  function beginStudyDrag(clientX: number) {
    studyDragStartX.current = clientX;
    studyDraggedRef.current = false;
    setStudyDragX(0);
  }

  function moveStudyDrag(clientX: number) {
    if (studyDragStartX.current === null) return;
    const delta = Math.max(-90, Math.min(90, clientX - studyDragStartX.current));
    if (Math.abs(delta) > 8) studyDraggedRef.current = true;
    setStudyDragX(delta);
  }

  function finishStudyDrag() {
    if (studyDragStartX.current === null) return;
    const delta = studyDragX;
    if (delta < -36) {
      setSelectedStudyIndex((current) => Math.min(studies.length - 1, current + 1));
    } else if (delta > 36) {
      setSelectedStudyIndex((current) => Math.max(0, current - 1));
    }
    studyDragStartX.current = null;
    setStudyDragX(0);
    window.setTimeout(() => {
      studyDraggedRef.current = false;
    }, 0);
  }

  const slides = useMemo(
    () => [
      <OnboardingShell key="welcome" activeIndex={0}>
        <LouisHero mood="wave" />
        <Headline>
          Welcome to
          <br />
          Bible Buddy
        </Headline>
        <Subtitle>
          We make reading the Bible easier.
          <br />
          Let’s grow together.
        </Subtitle>
        <PrimaryButton onClick={() => setSlide(1)}>Next&nbsp;›</PrimaryButton>
      </OnboardingShell>,

      <OnboardingShell key="problem" activeIndex={1}>
        <LouisHero mood="think" />
        <Headline>The real problem.</Headline>
        <Subtitle>The real problem with starting to read the Bible is:</Subtitle>
        <InfoRows
          rows={[
            {
              icon: "?",
              label: "You don’t know where to start.",
              description: "The Bible is big, and it’s easy to feel lost.",
            },
            {
              icon: "📖",
              label: "You’re not fully understanding what you’re reading.",
              description: "It’s hard to stay motivated when things don’t make sense.",
            },
            {
              icon: "☑️",
              label: "You’re not staying consistent.",
              description: "Life gets busy, and the habit is hard to build.",
            },
          ]}
        />
        <p className="mt-6 text-center text-[14px] font-extrabold leading-5 text-[#2f80ed]">
          💙 Reading the Bible should feel inspired,
          <br />
          not like homework.
        </p>
        <PrimaryButton onClick={() => setSlide(2)}>Next&nbsp;›</PrimaryButton>
      </OnboardingShell>,

      <OnboardingShell key="solution" activeIndex={2}>
        <LouisHero mood="bible" />
        <Headline>
          Bible Buddy
          <br />
          helps you.
        </Headline>
        <Subtitle>
          We make Bible study simple,
          <br />
          clear, and life-changing.
        </Subtitle>
        <InfoRows
          rows={[
            {
              icon: "📖",
              label: "Study chapter by chapter.",
              description: "Each chapter comes with an intro, study notes, reflections, trivia questions, and more.",
            },
            {
              icon: "💡",
              label: "Understand what you read.",
              description:
                "Before you read, get a clear intro explaining what’s happening. After you read, get detailed notes to help it make sense.",
            },
            {
              icon: "☑️",
              label: "Build consistency through guided daily progress.",
              description: "Build a Bible reading habit with daily tasks that keep you on track and help you grow.",
            },
          ]}
        />
        <p className="mt-6 text-center text-[14px] font-extrabold leading-5 text-[#2f80ed]">
          💙 With Bible Buddy, we make reading
          <br />
          the Bible easier.
        </p>
        <PrimaryButton onClick={() => setSlide(3)}>Next&nbsp;›</PrimaryButton>
      </OnboardingShell>,

      <OnboardingShell key="transition" activeIndex={3}>
        <LouisHero mood="smile" />
        <Headline>
          But before we can
          <br />
          embark on this
          <br />
          Bible reading journey,
        </Headline>
        <Subtitle>
          I need to ask you
          <br />a few questions.
        </Subtitle>
        <PrimaryButton onClick={() => setSlide(4)}>Next&nbsp;›</PrimaryButton>
      </OnboardingShell>,

      <OnboardingShell key="source" activeIndex={4}>
        <LouisHero mood="think" />
        <Headline>
          How did you learn
          <br />
          about Bible Buddy?
        </Headline>
        <Subtitle>
          Your answer helps us improve
          <br />
          and reach more people like you.
        </Subtitle>
        <ChoiceCards
          options={SOURCE_OPTIONS}
          selected={source}
          disabled={isSaving}
          onSelect={(value) => void saveChoice("traffic_source", value, 5)}
        />
      </OnboardingShell>,

      <OnboardingShell key="experience" activeIndex={5}>
        <LouisHero mood="bible" />
        <Headline>
          How long have you
          <br />
          been reading the Bible?
        </Headline>
        <Subtitle>
          This helps us personalize your
          <br />
          Bible Buddy experience.
        </Subtitle>
        <ChoiceCards
          options={EXPERIENCE_OPTIONS}
          selected={experience}
          disabled={isSaving}
          onSelect={(value) => void saveChoice("bible_experience_level", value, 6)}
        />
      </OnboardingShell>,

      <OnboardingShell key="goal" activeIndex={6}>
        <LouisHero mood="bible" />
        <Headline>
          What would you say is
          <br />
          your Bible reading goal?
        </Headline>
        <Subtitle>This helps us guide your experience and recommend the best Bible studies for you.</Subtitle>
        <ChoiceCards
          options={GOAL_OPTIONS}
          selected={goal}
          disabled={isSaving}
          onSelect={(value) => void saveChoice("onboarding_goal", value, 7)}
        />
      </OnboardingShell>,

      <OnboardingShell key="profile" activeIndex={7}>
        <LouisHero mood="smile" />
        <Headline>
          Let’s set up
          <br />
          your profile
        </Headline>
        <Subtitle>
          Enter your name and upload your profile picture so you can connect with other Bible Buddies on the app.
        </Subtitle>
        <div className="mt-8 space-y-5">
          <label className="block text-left">
            <span className="text-sm font-extrabold text-[#161f3b]">Full name</span>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-2xl border border-[#e2e7f0] bg-white px-4 py-4 text-sm font-semibold text-[#18213a] outline-none transition focus:border-[#2f80ed] focus:ring-4 focus:ring-[#d9eaff]"
            />
          </label>

          <div className="text-left">
            <span className="text-sm font-extrabold text-[#161f3b]">Profile picture</span>
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="mt-2 flex min-h-[138px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8dfeb] bg-white px-4 py-5 text-center"
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile preview" className="h-20 w-20 rounded-full object-cover shadow-md" />
              ) : (
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#edf5ff] text-3xl text-[#2f80ed]">📷</span>
              )}
              <span className="mt-3 text-sm font-extrabold text-[#1c2745]">
                {avatarPreview ? "Change profile picture" : "Upload a profile picture"}
              </span>
              <span className="mt-1 text-xs font-semibold text-[#8b94a8]">JPG, PNG or GIF (Max 5MB)</span>
            </button>
            <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarPick} className="hidden" />
          </div>
        </div>
        <PrimaryButton onClick={() => void saveProfileAndContinue()} disabled={isSaving}>
          Continue
        </PrimaryButton>
      </OnboardingShell>,

      <OnboardingShell key="upgrade" activeIndex={8}>
        <LouisHero mood="smile" />
        <Headline>
          Upgrade to Bible Buddy
          <br />
          Pro (Optional)
        </Headline>
        <Subtitle>
          You can continue for free, but if you want unlimited access to everything inside Bible Buddy, upgrade to Pro.
        </Subtitle>
        <div className="mt-6 rounded-2xl border border-[#e5ebf5] bg-white p-4 text-left shadow-[0_8px_22px_rgba(25,39,78,0.06)]">
          <p className="text-sm font-black text-[#17213d]">💎 Bible Buddy Pro includes:</p>
          <div className="mt-3 space-y-2 text-xs font-bold text-[#4d5872]">
            {[
              "Unlimited access to all studies",
              "Exclusive Pro-only content",
              "Advanced notes and highlights",
              "Track your progress in depth",
              "Ad-free experience",
              "Priority support",
            ].map((item) => (
              <p key={item}>✅ {item}</p>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          {[
            { key: "monthly" as const, label: "$4.99 / month", sub: "Billed monthly. Cancel anytime.", icon: "🗓️" },
            { key: "yearly" as const, label: "$50 / year", sub: "Billed yearly. Cancel anytime.", icon: "🏷️", badge: "Save 17%" },
          ].map((plan) => (
            <button
              key={plan.key}
              type="button"
              onClick={() => setSelectedPlan(plan.key)}
              className={`flex items-center gap-3 rounded-2xl border bg-white p-3 text-left transition ${
                selectedPlan === plan.key ? "border-[#2f80ed] ring-2 ring-[#d9eaff]" : "border-[#e3e8f0]"
              }`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf5ff] text-xl">{plan.icon}</span>
              <span className="flex-1">
                <span className="block text-sm font-black text-[#17213d]">
                  {plan.label} {plan.badge ? <span className="ml-1 rounded-full bg-[#d8f6df] px-2 py-0.5 text-[10px] text-[#219653]">{plan.badge}</span> : null}
                </span>
                <span className="block text-xs font-semibold text-[#7b8497]">{plan.sub}</span>
              </span>
              <span className={`h-5 w-5 rounded-full border-2 ${selectedPlan === plan.key ? "border-[#2f80ed] bg-[#2f80ed]" : "border-[#d8dde8]"}`} />
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-[#eef6ff] px-4 py-3 text-center text-xs font-semibold leading-5 text-[#60708f]">
          🔐 All purchases are secure and cancel anytime.
          <br />
          Your support helps us keep improving Bible Buddy!
        </div>
        <button
          type="button"
          disabled={isSaving}
          onClick={() => void startCheckout(selectedPlan)}
          className="mt-4 w-full rounded-2xl border border-[#d4e4fb] bg-white px-5 py-3 text-sm font-extrabold text-[#2f80ed] transition hover:bg-[#f4f9ff] disabled:opacity-60"
        >
          Upgrade with {selectedPlan === "yearly" ? "$50 / year" : "$4.99 / month"}
        </button>
        <PrimaryButton onClick={() => setSlide(9)} disabled={isSaving}>
          Continue for Free
        </PrimaryButton>
        <p className="mt-3 text-center text-xs font-semibold text-[#8b94a8]">You can upgrade anytime in settings.</p>
      </OnboardingShell>,

      <OnboardingShell key="study" activeIndex={9}>
        <LouisHero mood="smile" />
        <Headline>
          Pick your first
          <br />
          Bible study
        </Headline>
        <Subtitle>
          Now that that’s out of the way,
          <br />
          choose which Bible study you wanna start with first.
        </Subtitle>

        <div
          className="relative mx-[-22px] mt-8 h-60 cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
          onPointerDown={(event) => {
            beginStudyDrag(event.clientX);
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => moveStudyDrag(event.clientX)}
          onPointerUp={finishStudyDrag}
          onPointerCancel={finishStudyDrag}
        >
          <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-end justify-center gap-0">
            {studies.map((study, index) => {
              const offset = index - selectedStudyIndex;
              const isSelected = index === selectedStudyIndex;
              if (Math.abs(offset) > 2) return null;
              return (
                <button
                  key={study.title}
                  type="button"
                  onClick={() => {
                    if (studyDraggedRef.current) return;
                    setSelectedStudyIndex(index);
                  }}
                  className="relative -mx-2 select-none transition-all duration-300"
                  style={{
                    transform: `translateX(${offset * 28 + (isSelected ? studyDragX : studyDragX * 0.25)}px) rotate(${offset * 6}deg) scale(${isSelected ? 1 : 0.78})`,
                    zIndex: isSelected ? 20 : 10 - Math.abs(offset),
                    opacity: Math.abs(offset) === 2 ? 0.86 : 1,
                  }}
                >
                  <Image
                    src={study.cover}
                    alt={`${study.title} cover`}
                    width={148}
                    height={218}
                    draggable={false}
                    className={`h-[218px] w-[148px] rounded-md object-contain shadow-xl ${isSelected ? "ring-2 ring-white" : ""}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-2 flex justify-center gap-2">
          {studies.map((study, index) => (
            <button
              key={study.title}
              type="button"
              aria-label={`Select ${study.title}`}
              onClick={() => setSelectedStudyIndex(index)}
              className={`h-2 rounded-full transition-all ${index === selectedStudyIndex ? "w-7 bg-[#2f80ed]" : "w-4 bg-[#dfe3ec]"}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowStudyDescription((current) => !current)}
          className="mx-auto mt-6 block text-sm font-bold text-[#18213a] underline"
        >
          What is this Bible study about?
        </button>
        {showStudyDescription ? (
          <p className="mx-auto mt-3 max-w-[300px] text-center text-sm font-medium leading-6 text-[#3d465c]">
            {selectedStudy.description}
          </p>
        ) : null}

        <PrimaryButton onClick={() => void finishWithStudy()} disabled={isSaving}>
          Pick this Bible study
        </PrimaryButton>
      </OnboardingShell>,
    ],
    [
      avatarPreview,
      experience,
      fullName,
      goal,
      isSaving,
      selectedPlan,
      selectedStudy,
      selectedStudyIndex,
      studyDragX,
      showStudyDescription,
      source,
      studies,
    ],
  );

  if (!isOpen) return null;

  return (
    <>
      {slides[slide]}
      {error ? (
        <div className="fixed bottom-5 left-1/2 z-[280] w-[calc(100%-32px)] max-w-sm -translate-x-1/2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700 shadow-xl">
          {error}
        </div>
      ) : null}
    </>
  );
}

export default OnboardingModal;
