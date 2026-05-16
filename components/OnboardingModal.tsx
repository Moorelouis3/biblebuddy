"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import { ensureLouisDailyTaskCycle, rememberLouisDailyTaskTarget } from "../lib/louisDailyFlow";
import { LouisAvatar } from "./LouisAvatar";
import { BIBLE_GAME_BOOKS } from "../lib/bibleStudyGameCatalog";

type OnboardingModalProps = {
  isOpen: boolean;
  userId: string;
  initialTrafficSource?: string | null;
  initialBibleExperienceLevel?: string | null;
  studySelectionOnly?: boolean;
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

const TOTAL_SLIDES = 13;

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
    title: "The Obedience of Abraham",
    cover: "/TheobedienceofAbraham.png",
    description:
      "Walk through Abraham's call, waiting, covenant, testing, and legacy across Genesis 11-25.",
  },
  {
    title: "The Testing of Joseph",
    cover: "/newtesting.png",
    description:
      "Walk through Joseph's story of betrayal, waiting, testing, forgiveness, and God's faithfulness through every chapter.",
  },
  {
    title: "The Wisdom of Proverbs",
    cover: "/Wisdomofproverbsnewcover.png",
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

const STUDY_PICKER_ORDER = [
  "The Creation of the World",
  "The Fall of Man",
  "The Flood of Noah",
  "The Obedience of Abraham",
  "The Covenant Through Isaac",
  "The Wrestling of Jacob",
  "The Testing of Joseph",
  "The Wisdom of Proverbs",
];
const STUDY_PICKER_ORDER_INDEX = new Map(
  STUDY_PICKER_ORDER.map((title, index) => [title, index]),
);

const COVER_BY_STUDY_TITLE: Record<string, string> = {
  "The Tempting of Jesus": "/newtempting.png",
  "The Testing of Joseph": "/newtesting.png",
  "The Disciples of Jesus": "/disciplesofjesusdevotional.png",
  "Women of the Bible": "/womenofthebible.png",
  "The Wisdom of Proverbs": "/Wisdomofproverbsnewcover.png",
  "The Faith of Job": "/faithofjob.png",
  "The Calling of Moses": "/callingofmosesdevotional.png",
  "The Heart of David": "/heartofdaviddevotional.png",
  "The Obedience of Abraham": "/TheobedienceofAbraham.png",
  "The Transforming of Paul": "/transformingofpauldevotional.png",
  "The Courage of Daniel": "/thecourageofdaniel.png",
  "The Rise of Esther": "/theriseofester.png",
  "The Creation of the World": "/creationoftheworld.png",
  "The Fall of Man": "/thefallofman.png",
  "The Flood of Noah": "/thefallofman.png",
  "The Covenant Through Isaac": "/TheobedienceofAbraham.png",
  "The Wrestling of Jacob": "/TheobedienceofAbraham.png",
};

const ONBOARDING_STUDY_DESCRIPTION_BY_TITLE: Record<string, string> = {
  "The Wisdom of Proverbs": "A deep dive through Proverbs. Understand the wisdom of the Bible, chapter by chapter.",
  "The Testing of Joseph":
    "A chapter by chapter journey through Joseph's life, from betrayal and waiting to forgiveness, family healing, and God's faithfulness.",
  "The Heart of David":
    "A chapter by chapter journey through the life of David, from the shepherd fields to the throne, from Goliath to Bathsheba, from worship to repentance, and from youthful courage to a life that kept returning to God.",
  "The Disciples of Jesus":
    "A chapter by chapter journey through the men Jesus called, shaped, corrected, and sent to carry the message of the kingdom.",
  "Women of the Bible":
    "A chapter by chapter journey through the lives of women in Scripture and how God worked through their courage, pain, faith, and obedience.",
  "The Transforming of Paul":
    "A chapter by chapter journey through Paul's transformation, from opposing Jesus to becoming one of the boldest voices for the gospel.",
  "The Tempting of Jesus":
    "A chapter by chapter journey through Jesus in the wilderness and how truth, obedience, and identity stand firm under pressure.",
  "The Faith of Job":
    "A chapter by chapter journey through suffering, questions, endurance, and what it means to trust God when life does not make sense.",
  "The Calling of Moses":
    "A chapter by chapter journey through Moses' calling, fear, obedience, leadership, and the God who delivers His people.",
  "The Obedience of Abraham":
    "A 15-chapter journey through Genesis 11-25, following Abraham's call, waiting, covenant, testing, and legacy.",
  "The Courage of Daniel":
    "A 6-chapter journey through Daniel 1-6, following exile, identity pressure, wisdom, fire, pride, judgment, prayer, and the lions' den.",
  "The Rise of Esther":
    "A chapter by chapter journey through Esther's story of courage, timing, identity, and God working even when His name is hidden.",
  "The Creation of the World":
    "A 2-chapter journey through Genesis 1-2, following creation, order, Eden, humanity in God's image, purpose, rest, and relationship with God.",
  "The Fall of Man":
    "A 2-chapter journey through Genesis 3-4, following temptation, shame, blame, Cain and Abel, violence, exile, and the need for redemption.",
  "The Flood of Noah":
    "A guided journey through Noah, judgment, mercy, the ark, covenant, and God's preservation of creation.",
  "The Covenant Through Isaac":
    "A guided journey through the promise continuing through Isaac, showing how God's covenant keeps moving across generations.",
  "The Wrestling of Jacob":
    "A guided journey through Jacob's family, struggle, transformation, and the God who stays faithful through messy stories.",
};

const STUDY_BOOK_BY_TITLE: Record<string, string> = {
  "The Creation of the World": "Genesis",
  "The Fall of Man": "Genesis",
  "The Flood of Noah": "Genesis",
  "The Obedience of Abraham": "Genesis",
  "The Covenant Through Isaac": "Genesis",
  "The Wrestling of Jacob": "Genesis",
  "The Testing of Joseph": "Genesis",
  "The Wisdom of Proverbs": "Proverbs",
  "The Rise of Esther": "Esther",
  "The Courage of Daniel": "Daniel",
  "The Faith of Job": "Job",
  "The Calling of Moses": "Exodus",
  "The Heart of David": "1 Samuel",
  "The Disciples of Jesus": "Matthew",
  "The Tempting of Jesus": "Matthew",
  "The Transforming of Paul": "Acts",
  "Women of the Bible": "Genesis",
};

const POPULAR_FREE_MODE_BOOK_KEYS = new Set(["genesis", "exodus", "psalms", "proverbs", "matthew", "romans"]);

function getBibleBookAccent(bookKey: string) {
  const accents = [
    "border-[#c9d8f0] bg-[#dce7f7]",
    "border-emerald-200 bg-emerald-100",
    "border-amber-200 bg-amber-100",
    "border-violet-200 bg-[#efe7ff]",
    "border-rose-200 bg-rose-100",
    "border-teal-200 bg-teal-100",
  ];
  const index = BIBLE_GAME_BOOKS.findIndex((book) => book.key === bookKey);
  return accents[Math.max(0, index) % accents.length];
}

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

function getStudyCover(title: string) {
  return COVER_BY_STUDY_TITLE[title] ?? "/newtesting.png";
}

function shortenStudyDescription(description: string) {
  const trimmed = description.trim();
  const sentences = trimmed.match(/[^.!?]+[.!?]+/g);
  if (sentences?.length) {
    return sentences.slice(0, 2).join(" ").replace(/\s+/g, " ").trim();
  }
  return trimmed.length > 190 ? `${trimmed.slice(0, 187).trim()}...` : trimmed;
}

function getOnboardingStudyDescription(study: StudyOption) {
  return ONBOARDING_STUDY_DESCRIPTION_BY_TITLE[study.title] ?? shortenStudyDescription(study.description);
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function ProgressPills({
  activeIndex,
  visitedSlides,
  onGoToSlide,
}: {
  activeIndex: number;
  visitedSlides: Set<number>;
  onGoToSlide: (index: number) => void;
}) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2" aria-label={`Onboarding step ${activeIndex + 1} of ${TOTAL_SLIDES}`}>
      {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to onboarding step ${index + 1}`}
          disabled={!visitedSlides.has(index)}
          onClick={() => onGoToSlide(index)}
          className={`h-1.5 rounded-full transition-all ${
            index === activeIndex ? "w-8 bg-[#2f80ed]" : "w-5 bg-[#e3e6ee]"
          } ${visitedSlides.has(index) ? "cursor-pointer hover:bg-[#9fc8ff]" : "cursor-not-allowed opacity-60"}`}
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
  visitedSlides,
  onGoToSlide,
}: {
  children: ReactNode;
  activeIndex: number;
  visitedSlides: Set<number>;
  onGoToSlide: (index: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-[260] overflow-y-auto bg-white">
      <div className="flex min-h-screen items-center justify-center px-4 py-6 md:bg-[#f7f9ff]">
        <div className="flex min-h-[calc(100vh-48px)] w-full max-w-[390px] flex-col justify-center rounded-none bg-white px-2 py-4 md:min-h-[760px] md:rounded-[34px] md:border md:border-[#e6ebf4] md:px-8 md:shadow-2xl">
          {children}
          <ProgressPills activeIndex={activeIndex} visitedSlides={visitedSlides} onGoToSlide={onGoToSlide} />
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

function JourneyStepBadge({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="min-w-[72px] text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#f2cb63] bg-[#fff6d9] text-2xl shadow-sm">
        {icon}
      </div>
      <p className="mt-2 text-[11px] font-black leading-3 text-[#17213d]">{title}</p>
      <p className="mt-0.5 text-[10px] font-semibold leading-3 text-[#5d667a]">{subtitle}</p>
    </div>
  );
}

export function OnboardingModal({
  isOpen,
  userId,
  initialTrafficSource,
  initialBibleExperienceLevel,
  studySelectionOnly = false,
  onFinished,
}: OnboardingModalProps) {
  const [slide, setSlide] = useState(studySelectionOnly ? 10 : 0);
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(() => new Set([studySelectionOnly ? 10 : 0]));
  const [isSaving, setIsSaving] = useState(false);
  const [isCheckingUpgrade, setIsCheckingUpgrade] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");
  const [selectedStudyIndex, setSelectedStudyIndex] = useState(0);
  const [studies, setStudies] = useState<StudyOption[]>(STARTER_STUDIES);
  const [selectedFreeBookKey, setSelectedFreeBookKey] = useState("genesis");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const onboardingSwipeStartX = useRef<number | null>(null);
  const onboardingSwipeStartY = useRef<number | null>(null);
  const isPaidRef = useRef(false);
  const checkoutInProgressRef = useRef(false);
  const checkoutStartedPaidRef = useRef(false);

  const selectedStudy = studies[selectedStudyIndex] ?? studies[0];
  const selectedFreeBook = BIBLE_GAME_BOOKS.find((book) => book.key === selectedFreeBookKey) ?? BIBLE_GAME_BOOKS[0];
  const popularFreeModeBooks = BIBLE_GAME_BOOKS.filter((book) => POPULAR_FREE_MODE_BOOK_KEYS.has(book.key));
  const remainingFreeModeBooks = BIBLE_GAME_BOOKS.filter((book) => !POPULAR_FREE_MODE_BOOK_KEYS.has(book.key));
  const selectedBookStudies = studies.filter((study) => STUDY_BOOK_BY_TITLE[study.title] === selectedFreeBook.title);

  useEffect(() => {
    if (!isOpen) return;
    const initialSlide = studySelectionOnly ? 10 : 0;
    setSlide(initialSlide);
    setVisitedSlides(new Set([initialSlide]));
    setError(null);
  }, [isOpen, studySelectionOnly]);

  function goToSlide(nextSlide: number) {
    setError(null);
    setSlide(nextSlide);
    setVisitedSlides((current) => {
      const next = new Set(current);
      next.add(nextSlide);
      return next;
    });
  }

  function goToPreviousVisitedSlide() {
    if (studySelectionOnly) return;
    setError(null);
    setSlide((currentSlide) => {
      const previous = Array.from(visitedSlides)
        .filter((index) => index < currentSlide)
        .sort((a, b) => b - a)[0];
      return previous ?? Math.max(0, currentSlide - 1);
    });
  }

  async function loadStudyOptions(isPaid: boolean, currentStudyId?: string | null) {
    const devotionalQuery = supabase.from("devotionals").select("id, title, description").order("created_at", {
      ascending: false,
    });
    const onboardingStudyTitles = Array.from(new Set([...STARTER_STUDIES.map((study) => study.title), ...STUDY_PICKER_ORDER]));
    const { data: devotionalRows } = isPaid
      ? await devotionalQuery
      : await devotionalQuery.in("title", onboardingStudyTitles);

    if (!devotionalRows?.length) return;

    const merged = (isPaid
      ? devotionalRows.map((row) => ({
          title: row.title,
          cover: getStudyCover(row.title),
          description: row.description?.trim() || `${row.title} is a guided Bible Study inside Bible Buddy.`,
          id: row.id,
        }))
      : onboardingStudyTitles.map((title) => {
          const fallbackStudy = STARTER_STUDIES.find((study) => study.title === title);
          const row = devotionalRows.find((item) => item.title === title);
          if (!row && !fallbackStudy) return null;
          return {
            title,
            cover: getStudyCover(title),
            description: row?.description?.trim() || fallbackStudy?.description || ONBOARDING_STUDY_DESCRIPTION_BY_TITLE[title] || `${title} is a guided Bible Study inside Bible Buddy.`,
            id: row?.id,
          };
        }).filter(Boolean) as StudyOption[]
    ).sort((a, b) => {
      const aOrder = STUDY_PICKER_ORDER_INDEX.get(a.title);
      const bOrder = STUDY_PICKER_ORDER_INDEX.get(b.title);

      if (aOrder !== undefined || bOrder !== undefined) {
        return (aOrder ?? Number.MAX_SAFE_INTEGER) - (bOrder ?? Number.MAX_SAFE_INTEGER);
      }

      return 0;
    });

    setStudies(merged);
    const currentIndex = merged.findIndex((study) => study.id && study.id === currentStudyId);
    setSelectedStudyIndex(currentIndex >= 0 ? currentIndex : 0);
  }

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    async function hydrate() {
      setError(null);
      const { data } = await supabase
        .from("profile_stats")
        .select("traffic_source, bible_experience_level, onboarding_goal, display_name, profile_image_url, free_devotional_id, is_paid")
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
      isPaidRef.current = data?.is_paid === true;

      if (!cancelled) {
        await loadStudyOptions(data?.is_paid === true, data?.free_devotional_id);
      }
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
      window.setTimeout(() => goToSlide(nextSlide), 180);
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
      goToSlide(8);
    } catch (saveError: any) {
      setError(saveError?.message || "Could not save your profile.");
    } finally {
      setIsSaving(false);
    }
  }

  async function watchCheckoutWindow(checkoutWindow: Window | null) {
    setIsCheckingUpgrade(true);
    setError(null);
    for (let attempt = 0; attempt < 48; attempt += 1) {
      await wait(2500);
      const { data } = await supabase.from("profile_stats").select("is_paid, free_devotional_id").eq("user_id", userId).maybeSingle();
      const becamePaidFromCheckout = data?.is_paid === true && checkoutInProgressRef.current && checkoutStartedPaidRef.current === false;
      if (becamePaidFromCheckout) {
        isPaidRef.current = true;
        checkoutInProgressRef.current = false;
        await loadStudyOptions(true, data.free_devotional_id);
        goToSlide(9);
        setIsCheckingUpgrade(false);
        return;
      }
      if (checkoutWindow?.closed && attempt >= 2) break;
    }
    checkoutInProgressRef.current = false;
    setIsCheckingUpgrade(false);
    goToSlide(10);
  }

  async function checkUpgradeOnReturn() {
    if (!isOpen || slide !== 8 || !checkoutInProgressRef.current) return;
    setIsCheckingUpgrade(true);
    try {
      const { data } = await supabase.from("profile_stats").select("is_paid, free_devotional_id").eq("user_id", userId).maybeSingle();
      const becamePaidFromCheckout = data?.is_paid === true && checkoutStartedPaidRef.current === false;
      if (becamePaidFromCheckout) {
        isPaidRef.current = true;
        checkoutInProgressRef.current = false;
        await loadStudyOptions(true, data.free_devotional_id);
        goToSlide(9);
      }
    } finally {
      setIsCheckingUpgrade(false);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    const handleFocus = () => {
      void checkUpgradeOnReturn();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") void checkUpgradeOnReturn();
    };
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isOpen, slide, userId]);

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
        checkoutInProgressRef.current = true;
        checkoutStartedPaidRef.current = isPaidRef.current;
        const checkoutWindow = window.open(data.url, "bible-buddy-upgrade", "width=520,height=760");
        if (!checkoutWindow) {
          window.location.href = data.url;
          return;
        }
        checkoutWindow.focus();
        setIsSaving(false);
        void watchCheckoutWindow(checkoutWindow);
        return;
      }
      throw new Error("No checkout URL returned.");
    } catch (checkoutError: any) {
      setError(checkoutError?.message || "Could not start checkout.");
    } finally {
      setIsSaving(false);
    }
  }

  async function finishWithStudy(studyOverride?: StudyOption) {
    const targetStudy = studyOverride ?? selectedStudy;
    if (!targetStudy) return;

    setIsSaving(true);
    setError(null);
    try {
      let studyId = targetStudy.id ?? null;
      if (!studyId) {
        const { data, error: lookupError } = await supabase
          .from("devotionals")
          .select("id")
          .eq("title", targetStudy.title)
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

  async function finishWithStudyTitle(title: string) {
    const study = studies.find((item) => item.title === title) ?? {
      title,
      cover: getStudyCover(title),
      description: ONBOARDING_STUDY_DESCRIPTION_BY_TITLE[title] ?? `${title} is a guided Bible Study inside Bible Buddy.`,
    };
    await finishWithStudy(study);
  }

  function beginOnboardingSwipe(clientX: number, clientY: number) {
    if (studySelectionOnly) return;
    onboardingSwipeStartX.current = clientX;
    onboardingSwipeStartY.current = clientY;
  }

  function finishOnboardingSwipe(clientX: number, clientY: number) {
    if (studySelectionOnly) return;
    if (onboardingSwipeStartX.current === null || onboardingSwipeStartY.current === null) return;
    const deltaX = clientX - onboardingSwipeStartX.current;
    const deltaY = clientY - onboardingSwipeStartY.current;
    onboardingSwipeStartX.current = null;
    onboardingSwipeStartY.current = null;

    if (deltaX > 70 && Math.abs(deltaY) < 70) {
      goToPreviousVisitedSlide();
    }
  }

  const slides = useMemo(
    () => [
      <OnboardingShell key="welcome" activeIndex={0} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
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
        <PrimaryButton onClick={() => goToSlide(1)}>Next&nbsp;›</PrimaryButton>
      </OnboardingShell>,

      <OnboardingShell key="problem" activeIndex={1} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
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
        <PrimaryButton onClick={() => goToSlide(2)}>Next&nbsp;›</PrimaryButton>
      </OnboardingShell>,

      <OnboardingShell key="solution" activeIndex={2} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
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
        <PrimaryButton onClick={() => goToSlide(3)}>Next&nbsp;›</PrimaryButton>
      </OnboardingShell>,

      <OnboardingShell key="transition" activeIndex={3} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
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
        <PrimaryButton onClick={() => goToSlide(4)}>Next&nbsp;›</PrimaryButton>
      </OnboardingShell>,

      <OnboardingShell key="source" activeIndex={4} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
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

      <OnboardingShell key="experience" activeIndex={5} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
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

      <OnboardingShell key="goal" activeIndex={6} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
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

      <OnboardingShell key="profile" activeIndex={7} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
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

      <OnboardingShell key="upgrade" activeIndex={8} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
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
        <button
          type="button"
          disabled={isSaving || isCheckingUpgrade}
          onClick={() => void startCheckout(selectedPlan)}
          className="mt-5 w-full rounded-2xl border border-[#d4e4fb] bg-white px-5 py-3 text-sm font-extrabold text-[#2f80ed] transition hover:bg-[#f4f9ff] disabled:opacity-60"
        >
          {isCheckingUpgrade ? "Checking upgrade..." : `Upgrade with ${selectedPlan === "yearly" ? "$50 / year" : "$4.99 / month"}`}
        </button>
        <PrimaryButton onClick={() => goToSlide(10)} disabled={isSaving || isCheckingUpgrade}>
          Continue for Free
        </PrimaryButton>
        <p className="mt-3 text-center text-xs font-semibold text-[#8b94a8]">You can upgrade anytime in settings.</p>
      </OnboardingShell>,

      <OnboardingShell key="upgrade-success" activeIndex={9} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
        <LouisHero mood="stareyes" />
        <Headline>
          You’re upgraded
          <br />
          to Pro
        </Headline>
        <Subtitle>
          You now have full access to every Bible Study inside Bible Buddy.
          <br />
          Let’s set up your Bible Study Journey.
        </Subtitle>
        <div className="mx-auto mt-7 max-w-[330px] rounded-3xl border border-[#cce7d5] bg-[#f0fff5] px-5 py-5 text-center shadow-[0_14px_32px_rgba(39,174,96,0.12)]">
          <p className="text-4xl">🎉</p>
          <p className="mt-3 text-lg font-black text-[#17213d]">Bible Buddy Pro is ready.</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#536079]">
            Your study library is unlocked, and your first Bible Study is waiting.
          </p>
        </div>
        <PrimaryButton onClick={() => goToSlide(10)}>
          Set up my journey
        </PrimaryButton>
      </OnboardingShell>,

      <OnboardingShell key="journey-choice" activeIndex={10} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
        <Headline>
          Let&apos;s get ready to start
          <br />
          your <span className="text-[#2f66d6]">Bible study journey.</span>
        </Headline>
        <Subtitle>Choose how you want to study and grow through Scripture.</Subtitle>

        <div className="mt-7 rounded-[28px] border border-[#f4d77e] bg-gradient-to-br from-[#fff8df] via-white to-[#fff7d7] p-4 text-left shadow-[0_16px_34px_rgba(214,158,46,0.18)]">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#ffe8a3] px-3 py-1 text-xs font-black uppercase text-[#9a6500]">
            <span>★</span>
            Recommended
          </div>
          <div className="flex gap-4">
            <div className="hidden h-44 w-28 shrink-0 overflow-hidden rounded-2xl bg-[#fff2bf] shadow-sm sm:block">
              <Image src="/creationoftheworld.png" alt="" width={160} height={220} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#ffe59a] text-3xl shadow-sm">📖</span>
                <div>
                  <h2 className="text-2xl font-black leading-tight text-[#0f172a]">Bible Buddy Journey</h2>
                  <p className="text-sm font-black text-[#b77900]">Recommended</p>
                </div>
              </div>
              <p className="mt-4 text-lg font-black leading-6 text-[#101828]">
                Follow a guided path through the Bible one study at a time.
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#556071]">
                Start in Genesis and progress through Scripture with chapter intros, Bible reading, deep notes, trivia, Scrambled, reflection, and community discussion.
              </p>
            </div>
          </div>
          <div className="mt-5 overflow-x-auto pb-1">
            <div className="flex min-w-max items-start justify-between gap-3">
              <JourneyStepBadge icon="🌎" title="Genesis" subtitle="Creation" />
              <JourneyStepBadge icon="🍎" title="The Fall" subtitle="of Man" />
              <JourneyStepBadge icon="🌊" title="The Flood" subtitle="of Noah" />
              <JourneyStepBadge icon="🐪" title="Abraham" subtitle="Obedience" />
            </div>
          </div>
          <div className="mt-4 rounded-full border border-[#f4d77e] bg-white/70 px-4 py-2 text-center text-sm font-black text-[#8a6100]">
            65+ guided studies • Full Bible journey
          </div>
          <PrimaryButton onClick={() => void finishWithStudyTitle("The Creation of the World")} disabled={isSaving}>
            {isSaving ? "Starting journey..." : "Start Journey  ›"}
          </PrimaryButton>
        </div>

        <div className="mt-5 rounded-[28px] border border-[#bdd7ff] bg-gradient-to-br from-[#eef7ff] via-white to-[#eaf4ff] p-4 text-left shadow-[0_12px_28px_rgba(47,127,232,0.12)]">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-[#d8eaff] text-4xl shadow-sm">🧭</div>
            <div>
              <h2 className="text-2xl font-black text-[#101828]">Free Mode</h2>
              <p className="text-sm font-black text-[#2457b8]">Choose Your Own Path</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#556071]">
                Pick any book of the Bible and jump into available Bible studies instantly.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => goToSlide(11)}
            className="mt-5 w-full rounded-2xl border border-[#9fc6ff] bg-white px-5 py-3 text-base font-black text-[#2457b8] shadow-sm transition hover:bg-[#f4f9ff]"
          >
            Choose My Own Studies  ›
          </button>
        </div>

        <div className="mx-auto mt-6 flex max-w-[330px] items-center gap-3 rounded-3xl bg-[#f4f7fb] px-4 py-3 text-left">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-xl">🛡️</span>
          <p className="text-xs font-bold leading-5 text-[#5d667a]">
            Either way, we&apos;ll help you build your streak, earn rewards, and stay consistent in God&apos;s Word.
          </p>
        </div>
      </OnboardingShell>,

      <OnboardingShell key="free-books" activeIndex={11} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
        <Headline>
          Choose a book
          <br />
          of the Bible
        </Headline>
        <Subtitle>Pick where you want to start, then choose from the Bible studies connected to that book.</Subtitle>
        <div className="mt-7 grid grid-cols-2 gap-3">
          {[...popularFreeModeBooks, ...remainingFreeModeBooks].map((book) => (
            <button
              key={book.key}
              type="button"
              onClick={() => {
                setSelectedFreeBookKey(book.key);
                goToSlide(12);
              }}
              className={`min-h-[86px] rounded-2xl border px-3 py-3 text-left text-sm shadow-sm transition hover:scale-[1.01] hover:shadow-md ${getBibleBookAccent(book.key)}`}
            >
              <p className="font-black text-[#111827]">{book.title}</p>
              <p className="mt-1 text-[11px] font-semibold leading-4 text-[#4b5563]">View available studies</p>
            </button>
          ))}
        </div>
      </OnboardingShell>,

      <OnboardingShell key="free-studies" activeIndex={12} visitedSlides={visitedSlides} onGoToSlide={goToSlide}>
        <Headline>
          {selectedFreeBook.title}
          <br />
          Bible studies
        </Headline>
        <Subtitle>Choose the study you want to begin. We&apos;ll connect it to your dashboard right away.</Subtitle>
        <button
          type="button"
          onClick={() => goToSlide(11)}
          className="mx-auto mt-5 block rounded-full bg-[#eef6ff] px-4 py-2 text-sm font-black text-[#2f80ed]"
        >
          ← Pick another book
        </button>
        <div className="mt-5 space-y-3">
          {selectedBookStudies.length > 0 ? (
            selectedBookStudies.map((study) => (
              <button
                key={study.id ?? study.title}
                type="button"
                onClick={() => void finishWithStudy(study)}
                disabled={isSaving}
                className="flex w-full gap-3 rounded-2xl border border-[#e0e8f4] bg-white p-3 text-left shadow-sm transition hover:border-[#9fc6ff] hover:shadow-md disabled:opacity-60"
              >
                <Image src={study.cover} alt="" width={56} height={78} className="h-20 w-14 shrink-0 rounded-xl object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-black text-[#111827]">{study.title}</span>
                  <span className="mt-1 line-clamp-3 block text-xs font-semibold leading-5 text-[#5d667a]">
                    {getOnboardingStudyDescription(study)}
                  </span>
                </span>
              </button>
            ))
          ) : (
            <div className="rounded-2xl border border-[#dbe7f4] bg-[#f7fbff] px-4 py-5 text-center">
              <p className="text-sm font-black text-[#17213d]">No guided studies for {selectedFreeBook.title} yet.</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-[#5d667a]">
                More Bible Study Journey paths are being added over time. Try Genesis, Proverbs, Esther, Daniel, or Job.
              </p>
            </div>
          )}
        </div>
      </OnboardingShell>,
    ],
    [
      avatarPreview,
      experience,
      fullName,
      goal,
      isCheckingUpgrade,
      isSaving,
      visitedSlides,
      selectedPlan,
      selectedStudy,
      selectedStudyIndex,
      source,
      studies,
    ],
  );

  if (!isOpen) return null;

  return (
    <div
      onPointerDown={(event) => beginOnboardingSwipe(event.clientX, event.clientY)}
      onPointerUp={(event) => finishOnboardingSwipe(event.clientX, event.clientY)}
      onPointerCancel={() => {
        onboardingSwipeStartX.current = null;
        onboardingSwipeStartY.current = null;
      }}
    >
      {slides[slide]}
      {error ? (
        <div className="fixed bottom-5 left-1/2 z-[280] w-[calc(100%-32px)] max-w-sm -translate-x-1/2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700 shadow-xl">
          {error}
        </div>
      ) : null}
    </div>
  );
}

export default OnboardingModal;



