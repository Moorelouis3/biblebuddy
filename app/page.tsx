"use client";

/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AppLoadingScreen from "@/components/AppLoadingScreen";
import LegalPageThemeReset from "@/components/LegalPageThemeReset";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { hasCachedSupabaseSession } from "@/lib/authBoot";
import { applyAppThemeToDocument, cacheAppThemeForUser } from "@/lib/appThemes";

type PreviewPanel = "watch" | "study" | "trivia";
type StudyTab = "bible" | "notes";
type OnboardingStep = "intro" | "question" | "loading" | "recommendation" | "devotionalPicker" | "account";
type StudyRoute = "bible_year" | "devotional";

type Answers = {
  goal: string;
  experience: string;
  studyFocus: string;
  time: string;
  difficulty: string;
};

type LandingDevotionalOption = {
  id: string;
  title: string;
  description: string | null;
  total_days: number | null;
};

const emptyAnswers: Answers = {
  goal: "",
  experience: "",
  studyFocus: "",
  time: "",
  difficulty: "",
};

const journeyStudies = [
  { title: "Creation of the World", day: 1, status: "In Progress", cover: "/Day1cover.png", unlocked: true },
  { title: "Fall of Man", day: 2, status: "Preview", cover: "/day2cover.png", unlocked: false },
  { title: "Flood of Noah", day: 3, status: "Preview", cover: "/day3newcover.png", unlocked: false },
  { title: "Obedience of Abraham", day: 5, status: "Preview", cover: "/day5cover.png", unlocked: false },
  { title: "Life of Joseph", day: 15, status: "Preview", cover: "/TheTestingofJospehnewcover.png", unlocked: false },
  { title: "Wisdom of Proverbs", day: 1, status: "Preview", cover: "/Wisdomofproverbsnewcover.png", unlocked: false },
];

const tasks: Array<{ key: PreviewPanel; title: string; copy: string; tag: string }> = [
  {
    key: "watch",
    title: "Watch the 15 Minute Breakdown",
    copy: "Genesis 1-2: The Creation of the World",
    tag: "Task 1",
  },
  {
    key: "study",
    title: "Read the Chapter Summary",
    copy: "Understand the key events, themes, and meaning.",
    tag: "Task 2",
  },
  {
    key: "trivia",
    title: "Answer Trivia Questions",
    copy: "Test your understanding",
    tag: "Task 3",
  },
];

const howItWorksCards: Array<{ key: PreviewPanel; title: string; description: string }> = [
  {
    key: "watch",
    title: "Watch 15 Minute Video",
    description: "Watch a focused daily Scripture breakdown that helps the passage make sense.",
  },
  {
    key: "study",
    title: "Read the Chapter Summary",
    description: "Understand the key events, themes, and meaning from today's chapters.",
  },
  {
    key: "trivia",
    title: "Answer Trivia Questions",
    description: "Reinforce what you learned through 5 quick Bible questions.",
  },
];

const benefitRows = [
  ["Flexible", "Do it your way, anytime, anywhere."],
  ["15-20 Minutes", "Short lessons that fit your busy life."],
  ["Track Progress", "Stay motivated with streaks and goals."],
  ["Built on Truth", "Biblically sound. Spiritually transformative."],
];

const landingProofItems = [
  {
    name: "Maya",
    detail: "Bible Buddy member",
    quote: "I listen every morning while getting ready for work. It centers my day before everything gets loud.",
  },
  {
    name: "Daniel",
    detail: "Listens before work",
    quote: "I play two episodes a day, on the way to work and back home. I am on my second time finishing the Bible with Bible Buddy.",
  },
  {
    name: "Tiana",
    detail: "Busy mom",
    quote: "I put it on while I clean the kitchen at night. For the first time, Bible study fits the life I actually have.",
  },
  {
    name: "Marcus",
    detail: "New to Bible study",
    quote: "I always got confused reading alone. Now I listen first, and when I open the Bible the story finally makes sense.",
  },
  {
    name: "Alyssa",
    detail: "Daily listener",
    quote: "I listen at the gym, then open the summary later. It fits my actual life.",
  },
  {
    name: "Jordan",
    detail: "Morning routine",
    quote: "It feels more like a guided Bible podcast than homework. That changed everything for me.",
  },
  {
    name: "Naomi",
    detail: "Bible Buddy member",
    quote: "I finally understand how Abraham, Isaac, Jacob, and Joseph fit into one bigger story.",
  },
  {
    name: "Chris",
    detail: "On the go",
    quote: "I listen on walks. It gives me Scripture, explanation, and something to think about without feeling overwhelmed.",
  },
  {
    name: "Elena",
    detail: "Returning reader",
    quote: "The lessons make me slow down and notice details I always skipped before.",
  },
  {
    name: "Andre",
    detail: "Bible in One Year",
    quote: "For the first time, finishing the Bible feels like a daily path instead of a giant project.",
  },
];

const questions = [
  {
    id: "goal" as const,
    title: "What is your main goal with studying the Bible?",
    options: ["Build a consistent habit", "Understand the Bible better", "Grow closer to God", "Study with other believers"],
  },
  {
    id: "experience" as const,
    title: "How long have you been studying the Bible?",
    options: ["I'm just getting started", "Less than 1 year", "1-3 years", "More than 3 years"],
  },
  {
    id: "studyFocus" as const,
    title: "What do you most want to understand in the Bible?",
    options: ["The whole Bible story", "A specific book of the Bible", "People in the Bible", "Wisdom for real life"],
  },
  {
    id: "time" as const,
    title: "How much time can you realistically spend studying the Bible each day?",
    options: ["15-20 minutes", "30 minutes", "45 minutes", "60+ minutes"],
  },
  {
    id: "difficulty" as const,
    title: "What usually gets in the way of your Bible study?",
    options: ["I don't know where to start", "I don't understand what I read", "I struggle staying consistent", "I get distracted or too busy"],
  },
];

const loadingMessages = [
  "Consistency becomes easier when your next step is already planned for you.",
  "Small daily steps can lead to lasting spiritual growth.",
  "You do not need to study the Bible perfectly - you just need a clear next step.",
  "Understanding Scripture becomes easier when someone guides you through it.",
  "Most people struggle with consistency because they do not know where to start.",
  "Bible Buddy is designed to help you build a daily rhythm that lasts.",
];

function estimatedDaysForTime(time: string) {
  if (time.startsWith("30")) return 300;
  if (time.startsWith("45")) return 183;
  if (time.startsWith("60")) return 122;
  return 365;
}

function getRecommendedStudyRoute(answers: Answers): StudyRoute {
  return "bible_year";
}

function getStudyRouteLabel(route: StudyRoute) {
  return "Bible in One Year";
}

function normalizeGoalForProfile(goal: string) {
  if (goal === "Understand the Bible better") return "understand_bible";
  if (goal === "Grow closer to God") return "grow_closer_to_god";
  if (goal === "Study with other believers") return "study_with_buddies";
  return "build_consistency";
}

function normalizeExperienceForProfile(experience: string) {
  if (experience === "I'm just getting started") return "brand_new";
  if (experience === "Less than 1 year") return "beginner";
  if (experience === "1-3 years") return "intermediate";
  return "experienced";
}

type LandingAnalyticsEvent =
  | "landing_page_visit"
  | "clicked_start_journey"
  | "started_onboarding"
  | "viewed_onboarding_intro"
  | "viewed_question_1"
  | "viewed_question_2"
  | "viewed_question_3_focus"
  | "viewed_question_4"
  | "viewed_question_5"
  | "completed_question_1"
  | "completed_question_2"
  | "completed_question_3_focus"
  | "completed_question_4"
  | "completed_question_5"
  | "viewed_results_loading"
  | "viewed_results_page"
  | "reached_results_page"
  | "clicked_yes_start_my_journey"
  | "started_guest_journey"
  | "created_account_successfully"
  | "closed_onboarding";

function getLandingSessionId() {
  if (typeof window === "undefined") return "server";
  const key = "bb:landing-session-id";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next =
    typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.localStorage.setItem(key, next);
  return next;
}

function normalizeLandingSource(value: string | null) {
  const source = (value || "").toLowerCase();
  if (source.includes("instagram") || source === "ig") return "Instagram";
  if (source.includes("threads")) return "Threads";
  if (source.includes("youtube") || source.includes("youtu.be")) return "YouTube";
  if (source.includes("facebook")) return "Facebook";
  if (source.includes("tiktok")) return "TikTok";
  if (source.includes("google")) return "Google";
  return value ? "Other" : "Direct";
}

function getLandingSource() {
  if (typeof window === "undefined") return "Direct";
  const storageKey = "bb:landing-source";
  const stored = window.sessionStorage.getItem(storageKey);
  if (stored) return stored;

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") || params.get("source") || params.get("ref");
  const detected = normalizeLandingSource(utmSource || document.referrer || null);
  window.sessionStorage.setItem(storageKey, detected);
  return detected;
}

function trackLandingEvent(eventName: LandingAnalyticsEvent, metadata: Record<string, unknown> = {}, userId?: string) {
  if (typeof window === "undefined") return;

  const payload = {
    event_name: eventName,
    session_id: getLandingSessionId(),
    user_id: userId,
    source: getLandingSource(),
    referrer: document.referrer || null,
    page_path: `${window.location.pathname}${window.location.search}`,
    metadata,
  };

  void fetch("/api/landing-analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((error) => {
    console.error("Landing analytics event failed:", error);
  });
}

function trackLandingEventOnce(eventName: LandingAnalyticsEvent, metadata: Record<string, unknown> = {}, userId?: string) {
  if (typeof window === "undefined") return;
  const eventKey = `bb:landing-event:${getLandingSessionId()}:${eventName}:${String(metadata.stepKey || metadata.question_id || "")}`;
  if (window.sessionStorage.getItem(eventKey) === "1") return;
  window.sessionStorage.setItem(eventKey, "1");
  trackLandingEvent(eventName, metadata, userId);
}

async function saveLandingOnboardingResponse({
  userId,
  fullName,
  email,
  answers,
  recommendationDays,
  studyRoute,
  selectedDevotionalId,
}: {
  userId: string;
  fullName: string;
  email: string;
  answers: Answers;
  recommendationDays: number;
  studyRoute: StudyRoute;
  selectedDevotionalId?: string | null;
}) {
  const responsePayload = {
    user_id: userId,
    full_name: fullName,
    email,
    goal: answers.goal,
    experience: answers.experience,
    study_focus: answers.studyFocus,
    time_commitment: answers.time,
    difficulty: answers.difficulty,
    recommended_journey: getStudyRouteLabel(studyRoute),
    recommended_days: recommendationDays,
    updated_at: new Date().toISOString(),
  };

  const { error: responseError } = await supabase
    .from("landing_onboarding_responses")
    .upsert(responsePayload, { onConflict: "user_id" });

  if (responseError) {
    console.error("Landing onboarding response save failed:", responseError);
  }

  const { error: profileOnboardingError } = await supabase
    .from("profile_stats")
    .update({
      landing_onboarding_completed: true,
      onboarding_study_focus: answers.studyFocus,
      onboarding_time_commitment: answers.time,
      onboarding_difficulty: answers.difficulty,
      preferred_study_mode: studyRoute,
      ...(selectedDevotionalId ? { free_devotional_id: selectedDevotionalId, louis_primary_devotional_id: selectedDevotionalId, louis_primary_devotional_day: 1 } : {}),
    })
    .eq("user_id", userId);

  if (profileOnboardingError) {
    console.error("Landing onboarding profile fields save failed:", profileOnboardingError);
  }
}

function getLocalDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dataUrlToBlob(dataUrl: string) {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/data:(.*?);base64/)?.[1] || "image/jpeg";
  const binary = window.atob(base64 || "");
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new Blob([bytes], { type: mime });
}

async function uploadLandingProfileImage(userId: string, imageDataUrl: string | null) {
  if (!imageDataUrl) return null;

  try {
    const blob = dataUrlToBlob(imageDataUrl);
    const extension = blob.type.includes("png") ? "png" : blob.type.includes("webp") ? "webp" : "jpg";
    const path = `${userId}/landing-avatar.${extension}`;
    const { error } = await supabase.storage.from("avatars").upload(path, blob, {
      contentType: blob.type,
      upsert: true,
    });
    if (error) throw error;
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    return data.publicUrl;
  } catch (error) {
    console.error("Landing profile image upload failed:", error);
    return null;
  }
}

async function initializeLandingUserDashboard({
  userId,
  fullName,
  email,
  answers,
  recommendationDays,
  profileImage,
  studyRoute,
  selectedDevotionalId,
}: {
  userId: string;
  fullName: string;
  email: string;
  answers: Answers;
  recommendationDays: number;
  profileImage: string | null;
  studyRoute: StudyRoute;
  selectedDevotionalId?: string | null;
}) {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  if (!token) {
    throw new Error("Bible Buddy could not verify your new account session.");
  }

  const response = await fetch("/api/landing-onboarding/setup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
      fullName,
      email,
      answers,
      recommendationDays,
      profileImage,
      studyRoute,
      selectedDevotionalId,
    }),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.error || "Bible Buddy could not finish setting up your dashboard.");
  }
}

export default function LandingPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedStudyRoute, setSelectedStudyRoute] = useState<StudyRoute>("bible_year");
  const [selectedDevotionalId, setSelectedDevotionalId] = useState("");
  const [devotionalOptions, setDevotionalOptions] = useState<LandingDevotionalOption[]>([]);
  const [devotionalsLoading, setDevotionalsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountAttempted, setAccountAttempted] = useState(false);
  const [landingMenuOpen, setLandingMenuOpen] = useState(false);
  const guestJourneyStartingRef = useRef(false);

  const recommendationDays = useMemo(() => estimatedDaysForTime(answers.time), [answers.time]);
  const recommendedStudyRoute = useMemo(() => getRecommendedStudyRoute(answers), [answers]);
  const selectedDevotional = devotionalOptions.find((option) => option.id === selectedDevotionalId) || null;
  const currentQuestion = questions[questionIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : "";
  const progressPercent = Math.round(((questionIndex + 1) / questions.length) * 100);

  useEffect(() => {
    trackLandingEvent("landing_page_visit");
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("landing") === "1") {
      setIsChecking(false);
      return;
    }

    let settled = false;
    const hadCachedSession = hasCachedSupabaseSession();
    if (hadCachedSession) setIsChecking(true);
    const fallbackTimer = window.setTimeout(() => {
      if (!settled) {
        if (hadCachedSession) {
          setIsChecking(false);
          window.setTimeout(() => {
            if (window.location.pathname === "/") window.location.replace("/dashboard");
          }, 50);
          return;
        }
        setIsChecking(false);
      }
    }, hadCachedSession ? 1400 : 3000);

    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        settled = true;
        window.clearTimeout(fallbackTimer);
        if (session) {
          setIsChecking(false);
          router.replace("/dashboard");
          return;
        }
        setIsChecking(false);
      } catch {
        settled = true;
        window.clearTimeout(fallbackTimer);
        setIsChecking(false);
      }
    };

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      settled = true;
      window.clearTimeout(fallbackTimer);
      if (guestJourneyStartingRef.current) {
        setIsChecking(false);
        return;
      }
      if (session) {
        setIsChecking(false);
        router.replace("/dashboard");
      } else {
        setIsChecking(false);
      }
    });

    return () => {
      window.clearTimeout(fallbackTimer);
      subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    if (onboardingStep !== "loading") return;
    const interval = window.setInterval(() => {
      setLoadingMessageIndex((index) => (index + 1) % loadingMessages.length);
    }, 1700);
    const timer = window.setTimeout(() => {
      setOnboardingStep("recommendation");
    }, 5600);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, [onboardingStep]);

  useEffect(() => {
    if (!onboardingOpen) return;
    if (devotionalOptions.length > 0 || devotionalsLoading) return;

    let cancelled = false;
    async function loadDevotionals() {
      setDevotionalsLoading(true);
      const { data, error } = await supabase
        .from("devotionals")
        .select("id, title, description, total_days")
        .order("title", { ascending: true })
        .limit(100);

      if (cancelled) return;
      if (error) {
        console.error("Landing devotional options failed:", error);
        setDevotionalOptions([]);
      } else {
        const ordered = ((data || []) as LandingDevotionalOption[]).sort((a, b) => {
          const preferred = [
            "The Testing of Joseph",
            "The Wisdom of Proverbs",
            "The Disciples of Jesus",
            "Women of the Bible",
            "The Heart of David",
          ];
          const aIndex = preferred.indexOf(a.title);
          const bIndex = preferred.indexOf(b.title);
          if (aIndex !== -1 || bIndex !== -1) return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
          return a.title.localeCompare(b.title);
        });
        setDevotionalOptions(ordered);
        setSelectedDevotionalId((current) => current || ordered[0]?.id || "");
      }
      setDevotionalsLoading(false);
    }

    void loadDevotionals();
    return () => {
      cancelled = true;
    };
  }, [devotionalOptions.length, devotionalsLoading, onboardingOpen]);

  useEffect(() => {
    if (!onboardingOpen) return;

    if (onboardingStep === "intro") {
      trackLandingEventOnce("viewed_onboarding_intro", { stepKey: "intro" });
      return;
    }

    if (onboardingStep === "question" && currentQuestion) {
      const viewedQuestionEvents: LandingAnalyticsEvent[] = [
        "viewed_question_1",
        "viewed_question_2",
        "viewed_question_3_focus",
        "viewed_question_4",
        "viewed_question_5",
      ];
      const eventName = viewedQuestionEvents[questionIndex];
      if (eventName) {
        trackLandingEventOnce(eventName, {
          stepKey: `question_${questionIndex + 1}`,
          question_id: currentQuestion.id,
          question_title: currentQuestion.title,
        });
      }
      return;
    }

    if (onboardingStep === "loading") {
      trackLandingEventOnce("viewed_results_loading", { stepKey: "results_loading" });
      return;
    }

    if (onboardingStep === "recommendation") {
      trackLandingEventOnce("viewed_results_page", { stepKey: "results_page", recommendationDays, recommendedStudyRoute });
      return;
    }

    if (onboardingStep === "devotionalPicker") {
      trackLandingEventOnce("viewed_results_page", { stepKey: "devotional_picker", recommendedStudyRoute: "devotional" });
      return;
    }

  }, [currentQuestion, onboardingOpen, onboardingStep, questionIndex, recommendationDays, recommendedStudyRoute]);

  function trackStartJourneyClick(clickedFrom: string) {
    try {
      window.localStorage.setItem("bb:landing-start-clicked", "1");
      window.localStorage.setItem("bb:landing-start-clicked-at", new Date().toISOString());
      window.localStorage.setItem("bb:landing-start-clicked-from", clickedFrom);
    } catch {
      // Funnel tracking should never block navigation.
    }
    trackLandingEvent("clicked_start_journey", { clickedFrom });
    setLandingMenuOpen(false);
  }

  function openQuestionnaire() {
    trackStartJourneyClick("legacy_start_handler");
    setLandingMenuOpen(false);
    router.push("/signup");
  }

  function closeQuestionnaire(closedFrom: string) {
    trackLandingEvent("closed_onboarding", {
      closedFrom,
      step: onboardingStep,
      questionIndex: onboardingStep === "question" ? questionIndex + 1 : null,
      questionId: onboardingStep === "question" ? currentQuestion?.id : null,
    });
    setOnboardingOpen(false);
  }

  function startQuestionnaire() {
    trackLandingEvent("started_onboarding");
    setOnboardingStep("question");
    setQuestionIndex(0);
  }

  function skipToAccount() {
    setOnboardingOpen(false);
    setAccountAttempted(false);
    setError(null);
    setLandingMenuOpen(false);
    router.push("/signup");
  }

  function chooseAnswer(value: string) {
    if (!currentQuestion) return;
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);
    const eventNames: LandingAnalyticsEvent[] = [
      "completed_question_1",
      "completed_question_2",
      "completed_question_3_focus",
      "completed_question_4",
      "completed_question_5",
    ];
    const completedQuestionEvent = eventNames[questionIndex];
    if (completedQuestionEvent) {
      trackLandingEvent(completedQuestionEvent, {
        question_id: currentQuestion.id,
        question_title: currentQuestion.title,
        answer: value,
      });
    }

    window.setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((index) => index + 1);
        return;
      }
      window.localStorage.setItem("bb:landing-questionnaire", JSON.stringify(nextAnswers));
      trackLandingEvent("reached_results_page", { answers: nextAnswers, recommendationDays });
      setOnboardingStep("loading");
    }, 220);
  }

  function continueQuestionnaire() {
    if (!selectedAnswer) return;
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((index) => index + 1);
      return;
    }
    const nextAnswers = { ...answers };
    window.localStorage.setItem("bb:landing-questionnaire", JSON.stringify(nextAnswers));
    trackLandingEvent("reached_results_page", { answers: nextAnswers, recommendationDays });
    setOnboardingStep("loading");
  }

  function openAccountFromRecommendation(routeOverride?: StudyRoute) {
    const route: StudyRoute = "bible_year";
    trackLandingEvent("clicked_yes_start_my_journey", {
      recommendationDays,
      selectedTime: answers.time,
      studyRoute: route,
      selectedDevotionalId: null,
    });
    setOnboardingOpen(false);
    router.push("/signup");
  }

  async function startGuestJourney(routeOverride?: StudyRoute) {
    const route: StudyRoute = "bible_year";
    const devotionalIdForSetup = null;
    const guestName = "Bible Buddy Guest";
    setSelectedStudyRoute(route);
    setSubmitting(true);
    setError(null);
    guestJourneyStartingRef.current = true;

    const onboardingPayload = {
      answers,
      recommendation: {
        journey: getStudyRouteLabel(route),
        estimatedDays: recommendationDays,
        time: answers.time,
        studyRoute: route,
        selectedDevotionalId: devotionalIdForSetup,
        selectedDevotionalTitle: selectedDevotional?.title || null,
      },
      landingAnalytics: {
        sessionId: getLandingSessionId(),
        source: getLandingSource(),
        referrer: document.referrer || null,
        pagePath: `${window.location.pathname}${window.location.search}`,
      },
    };

    window.localStorage.setItem("bb:landing-questionnaire", JSON.stringify(onboardingPayload));

    try {
      const { data: currentSessionData } = await supabase.auth.getSession();
      let guestUserId = currentSessionData.session?.user?.id || null;
      if (!guestUserId) {
        const { data: anonymousData, error: anonymousError } = await supabase.auth.signInAnonymously({
          options: {
            data: {
              display_name: guestName,
              landing_questionnaire: onboardingPayload,
              recommended_journey: route,
              selected_devotional_id: devotionalIdForSetup,
            },
          },
        });
        if (anonymousError) {
          const message = anonymousError.message || "";
          if (/anonymous sign-?ins are disabled/i.test(message)) {
            setError("Guest Mode needs Supabase Anonymous Sign-Ins turned on before Bible Buddy can create guest users. Turn it on in Supabase Auth, then try again.");
            setSubmitting(false);
            guestJourneyStartingRef.current = false;
            return;
          }
          throw anonymousError;
        }
        guestUserId = anonymousData.user?.id || null;
      }

      if (!guestUserId) throw new Error("Bible Buddy could not start guest mode.");

      await initializeLandingUserDashboard({
        userId: guestUserId,
        fullName: guestName,
        email: "",
        answers,
        recommendationDays,
        profileImage: null,
        studyRoute: route,
        selectedDevotionalId: devotionalIdForSetup,
      });

      trackLandingEvent("started_guest_journey", {
        recommendationDays,
        selectedTime: answers.time,
        studyRoute: route,
        selectedDevotionalId: devotionalIdForSetup,
        source: getLandingSource(),
      }, guestUserId);
      window.localStorage.removeItem("bb:landing-questionnaire");
      enterDashboard(route);
    } catch (guestError) {
      console.warn("Guest journey start failed:", guestError);
      setError(guestError instanceof Error ? guestError.message : "Bible Buddy could not start guest mode. Please try again.");
      setSubmitting(false);
      guestJourneyStartingRef.current = false;
    }
  }

  function chooseDevotionalRoute() {
    chooseBibleYearRoute();
  }

  function chooseBibleYearRoute() {
    setSelectedStudyRoute("bible_year");
    void startGuestJourney("bible_year");
  }

  function confirmDevotionalChoice() {
    void startGuestJourney("bible_year");
  }

  function handleProfileImage(file: File | null) {
    if (!file) {
      setProfileImage(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setProfileImage(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setAccountAttempted(true);
    setSubmitting(true);
    setError(null);

    const normalizedEmail = email.trim().toLowerCase();
    const cleanName = firstName.trim();
    const studyRoute: StudyRoute = "bible_year";
    const devotionalIdForSetup = null;
    if (!cleanName) {
      setSubmitting(false);
      return;
    }
    const onboardingPayload = {
      answers,
      recommendation: {
        journey: getStudyRouteLabel(studyRoute),
        estimatedDays: recommendationDays,
        time: answers.time,
        studyRoute,
        selectedDevotionalId: devotionalIdForSetup,
        selectedDevotionalTitle: selectedDevotional?.title || null,
      },
      landingAnalytics: {
        sessionId: getLandingSessionId(),
        source: getLandingSource(),
        referrer: document.referrer || null,
        pagePath: `${window.location.pathname}${window.location.search}`,
      },
    };

    window.localStorage.setItem("bb:landing-questionnaire", JSON.stringify(onboardingPayload));

    const { data, error: signupError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: password.trim(),
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/dashboard`
            : undefined,
        data: {
          firstName: cleanName,
          first_name: cleanName,
          display_name: cleanName,
          landing_questionnaire: onboardingPayload,
          recommended_journey: studyRoute,
          selected_devotional_id: devotionalIdForSetup,
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setSubmitting(false);
      return;
    }

    const user = data.user;
    if (!user) {
      setError("Signup failed: no user returned.");
      setSubmitting(false);
      return;
    }
    if (Array.isArray(user.identities) && user.identities.length === 0) {
      setError("This email may already have an account. Please log in instead, or use a different email.");
      setSubmitting(false);
      return;
    }

    if (!data.session) {
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password.trim(),
      });

      if (!loginData.session) {
        setSubmitting(false);
        setError(
          loginError?.message?.toLowerCase().includes("email not confirmed")
            ? "Your account was created, but email confirmation is still turned on. Confirm your email or turn off confirmation in Supabase Auth."
            : loginError?.message || "Account created, but Bible Buddy could not start your session yet. Try logging in.",
        );
        return;
      }
    }

    try {
      await initializeLandingUserDashboard({
        userId: user.id,
        fullName: cleanName,
        email: normalizedEmail,
        answers,
        recommendationDays,
        profileImage,
        studyRoute,
        selectedDevotionalId: devotionalIdForSetup,
      });
    } catch (initializationError) {
      console.error("Landing user initialization failed:", initializationError);
      setError("Your account was created, but Bible Buddy could not finish setting up your dashboard. Please try logging in.");
      setSubmitting(false);
      return;
    }

    trackLandingEvent(
      "created_account_successfully",
      {
        email: normalizedEmail,
        recommendationDays,
        selectedTime: answers.time,
        studyRoute,
        selectedDevotionalId: devotionalIdForSetup,
        source: getLandingSource(),
      },
      user.id,
    );

    cacheAppThemeForUser(user.id, "light");
    applyAppThemeToDocument("light");
    window.localStorage.setItem(`bb:skip-initial-login:${user.id}`, "1");
    window.localStorage.setItem(`bb:skip-initial-dashboard-view:${user.id}`, "1");

    const { data: existingSignupAction } = await supabase
      .from("master_actions")
      .select("id")
      .eq("user_id", user.id)
      .eq("action_type", ACTION_TYPE.user_signup)
      .limit(1);
    const alreadyTrackedSignup = Boolean(existingSignupAction?.length);

    try {
      if (!alreadyTrackedSignup) {
        await supabase.from("user_signups").insert({
          user_id: user.id,
          email: user.email,
        });
      }
    } catch (analyticsError) {
      console.error("Analytics insert error (non-blocking):", analyticsError);
    }

    try {
      if (!alreadyTrackedSignup) {
        await supabase.from("master_actions").insert({
          user_id: user.id,
          username: cleanName,
          action_type: ACTION_TYPE.user_signup,
          action_label: "Signed up after Bible Buddy landing questionnaire",
          created_at: new Date().toISOString(),
        });
      }
    } catch (actionTrackingError) {
      console.error("Signup action tracking error (non-blocking):", actionTrackingError);
    }

    try {
      await fetch("/api/send-welcome-dm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, firstName: cleanName, lastName: "" }),
      });
    } catch (welcomeError) {
      console.error("Welcome DM failed (non-blocking):", welcomeError);
    }

    setSubmitting(false);
    window.localStorage.removeItem("bb:landing-questionnaire");
    enterDashboard(studyRoute);
  }

  async function handleOAuthSignIn() {
    const studyRoute: StudyRoute = "bible_year";
    const devotionalIdForSetup = null;
    window.localStorage.setItem(
      "bb:landing-questionnaire",
      JSON.stringify({
        answers,
        recommendation: {
          journey: getStudyRouteLabel(studyRoute),
          estimatedDays: recommendationDays,
          time: answers.time,
          studyRoute,
          selectedDevotionalId: devotionalIdForSetup,
          selectedDevotionalTitle: selectedDevotional?.title || null,
        },
        landingAnalytics: {
          sessionId: getLandingSessionId(),
          source: getLandingSource(),
          referrer: document.referrer || null,
          pagePath: `${window.location.pathname}${window.location.search}`,
        },
      }),
    );
    setSubmitting(true);
    setError(null);
    cacheAppThemeForUser(null, "light");
    applyAppThemeToDocument("light");
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/dashboard`
        : undefined;
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: redirectTo ? { redirectTo } : undefined,
    });
    if (oauthError) {
      setSubmitting(false);
      setError(oauthError.message);
    }
  }

  function enterDashboard(studyRoute: StudyRoute = selectedStudyRoute || recommendedStudyRoute) {
    window.location.href = "/dashboard";
  }

  if (isChecking) return <AppLoadingScreen />;

  return (
    <div className="bb-public-landing min-h-screen bg-[#fffdf8] text-[#07162f]">
      <LegalPageThemeReset />
      <LandingThemeStyles />

      <main>
        <div className="bb-landing-shell mx-auto max-w-[1440px] overflow-hidden bg-[#fffdf8]">
          <header className="relative z-20 flex w-full items-center justify-between gap-6 bg-[#fffdf8] px-5 pb-4 pt-6 sm:px-8 sm:py-5 lg:px-10">
            <BibleBuddyMark />
            <nav className="hidden items-center gap-10 text-sm font-bold text-[#07162f] md:flex">
              <Link href="/how-it-works" className="transition hover:text-[#135397]">How It Works</Link>
              <Link href="/features" className="transition hover:text-[#135397]">Features</Link>
              <Link href="/stories" className="transition hover:text-[#135397]">Stories</Link>
              <Link href="/faq" className="transition hover:text-[#135397]">FAQ</Link>
            </nav>
            <div className="hidden items-center gap-3 sm:flex">
              <Link href="/login" className="rounded-lg px-4 py-3 text-sm font-bold text-[#07162f] transition hover:bg-[#f4eee4]">
                Login
              </Link>
              <Link href="/signup" onClick={() => trackStartJourneyClick("header")} className="bb-public-button rounded-lg bg-[#135397] px-6 py-3 text-sm font-black text-white shadow-[0_16px_32px_rgba(19,83,151,0.22)] transition hover:-translate-y-0.5">
                Create Free Account
              </Link>
            </div>
            <div className="sm:hidden">
              <Link href="/login" className="rounded-lg border border-[#e9dfd1] bg-white px-4 py-2.5 text-sm font-black text-[#07162f] shadow-[0_12px_26px_rgba(7,22,47,0.10)] transition hover:bg-[#f8f2e8]">
                Login
              </Link>
            </div>
          </header>

          <section className="relative w-full overflow-hidden px-5 pb-8 pt-8 sm:min-h-[570px] sm:px-8 sm:pt-10 lg:min-h-[640px] lg:px-10 lg:pb-0 lg:pt-16">
            <Image
              src="/newherobanner.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="pointer-events-none absolute inset-0 hidden object-cover object-center sm:block"
            />
            <div className="relative z-10 max-w-[520px]">
              <h1 className="bb-serif text-center text-[2.15rem] font-black leading-[1.03] tracking-[-0.01em] text-[#07162f] sm:text-left sm:text-[clamp(2.05rem,3.5vw,3.45rem)]">
                Finally read, understand, and <span className="italic text-[#135397]">finish</span> the <span className="text-[#135397]">Bible.</span>
              </h1>
              <p className="mt-4 max-w-[520px] text-center text-sm font-semibold leading-6 text-[#526075] sm:mt-7 sm:text-left sm:text-lg sm:leading-8">
                Have you ever started reading the Bible only to quit a few days later because you didn't understand what you were reading?
                <br className="hidden sm:block" />
                <br className="hidden sm:block" />
                Bible Buddy helps you stay consistent with simple daily lessons, clear explanations, and guided audio that make Scripture easier to understand and easier to finish.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-7 sm:block sm:space-y-4">
                {[
                  ["headphones", "Audio lessons"],
                  ["book", "Understand Scripture"],
                  ["calendar", "Stay consistent with a daily plan"],
                  ["flag", "Finish the Bible"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-2 text-[12px] font-bold leading-tight text-[#07162f] sm:gap-3 sm:text-sm">
                    <LandingLineIcon name={icon} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 sm:mt-9">
                <Link href="/signup" onClick={() => trackStartJourneyClick("hero")} className="bb-public-button bb-join-pulse inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#135397] px-6 py-3.5 text-sm font-black text-white shadow-[0_18px_36px_rgba(19,83,151,0.2)] transition hover:-translate-y-0.5 sm:w-auto sm:px-8 sm:py-4 sm:text-base">
                  Create Free Account
                  <LandingLineIcon name="arrow" light />
                </Link>
                <p className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-[#6d7789] sm:mt-4 sm:justify-start">
                  <LandingLineIcon name="lock" small />
                  <span>Free to get started. Cancel anytime.</span>
                </p>
              </div>
            </div>
          </section>

          <section className="border-y border-[#eee4d8] bg-[#fffaf2] px-5 py-6 sm:px-8 sm:py-8">
            <RotatingProofStrip />
          </section>

          <section id="how-it-works" className="px-5 py-10 sm:px-8 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="bb-serif text-[2.15rem] font-black leading-tight text-[#07162f] sm:text-5xl">Why Bible Buddy works</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#526075] sm:mt-4">
                  We remove the overwhelm and guesswork so you can focus on what matters: spending time with God's Word.
                </p>
              </div>
              <div className="mt-7 grid gap-3 sm:mt-11 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
                {[
                  ["headphones", "Audio-First Experience", "Listen to cinematic Scripture readings anytime, anywhere.", "#eaf2ff", "#2563eb"],
                  ["book", "Understand What You Read", "Clear explanations help you grasp the meaning behind every chapter.", "#eaf8ed", "#3b9b65"],
                  ["calendar", "Stay Consistent", "A simple daily plan keeps you on track without the overwhelm.", "#fff4d9", "#d99822"],
                  ["flag", "Finish the Bible", "Go from Genesis to Revelation in just one year.", "#f0ecff", "#6555d9"],
                ].map(([icon, title, copy, bg, accent]) => (
                  <article key={title} className="bb-soft-card flex items-center gap-4 rounded-lg p-4 text-left sm:block sm:p-7 sm:text-center">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full sm:mx-auto sm:h-20 sm:w-20" style={{ backgroundColor: bg }}>
                      <LandingLineIcon name={icon} color={accent} large />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-black leading-tight text-[#07162f] sm:mt-7 sm:text-base">{title}</h3>
                      <p className="mt-1 text-xs font-semibold leading-5 text-[#526075] sm:mx-auto sm:mt-3 sm:max-w-[210px] sm:text-sm sm:leading-6">{copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="listen" className="px-5 pb-10 sm:px-8 sm:pb-16 lg:pb-20">
            <div className="bb-dark-panel mx-auto grid max-w-7xl overflow-hidden rounded-lg px-5 py-7 text-[#07162f] sm:px-10 sm:py-10 lg:min-h-[430px] lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:px-12">
              <div className="bb-listen-copy relative z-20 max-w-lg">
                <h2 className="bb-serif text-[2rem] font-black leading-tight sm:text-5xl">Listen anywhere. Grow everywhere.</h2>
                <p className="mt-3 text-sm font-semibold leading-6 sm:mt-5 sm:text-base sm:leading-7">
                  Whether you're driving, working out, cleaning, or taking a walk, Bible Buddy fits into your life. You do not need more time. You need a better way.
                </p>
                <div className="mt-6 grid grid-cols-5 gap-2 text-center text-[10px] font-bold sm:mt-10 sm:gap-4 sm:text-[11px]">
                  {[
                    ["car", "Driving"],
                    ["dumbbell", "Working Out"],
                    ["clean", "Cleaning"],
                    ["coffee", "On Break"],
                    ["walk", "Walking"],
                  ].map(([icon, label]) => (
                    <div key={label} className="grid gap-2">
                      <LandingLineIcon name={icon} light />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block" aria-hidden="true" />
            </div>
          </section>

          <section id="journey" className="px-5 pb-10 sm:px-8 sm:pb-16 lg:pb-20">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mx-auto mb-9 max-w-2xl rounded-[22px] bg-[#fffdf8] px-4 py-6 text-center sm:mb-12 sm:rounded-[28px] sm:px-8 sm:py-8">
                  <h2 className="bb-serif text-[clamp(1.8rem,3vw,2.45rem)] font-black leading-tight text-[#07162f]">
                    Ready to start your journey?
                  </h2>
                  <p className="mt-2 text-base font-semibold text-[#07162f]">
                    It only takes 15-30 minutes a day.
                  </p>
                  <Link href="/signup" onClick={() => trackStartJourneyClick("middle_cta")} className="bb-public-button mt-5 inline-flex w-full max-w-[520px] items-center justify-center gap-3 rounded-full bg-[#7fb6dc] px-6 py-3.5 text-sm font-black text-white shadow-[0_22px_52px_rgba(127,182,220,0.35)] transition hover:-translate-y-0.5 sm:mt-7 sm:px-8 sm:py-4 sm:text-lg">
                    <span className="text-white">*</span>
                    Create Free Account
                  </Link>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-black text-[#07162f] sm:mt-5 sm:text-sm">
                    <span className="inline-flex items-center gap-2">
                      <LandingLineIcon name="shield" small color="#315f94" />
                      No credit card required
                    </span>
                    <span className="text-[#07162f]">•</span>
                    <span>Cancel anytime</span>
                  </div>
                </div>
                <h2 className="bb-serif text-[2.55rem] font-black leading-[0.98] text-[#07162f] sm:text-[clamp(3.15rem,6.2vw,5.7rem)]">Your guided Bible journey</h2>
                <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-[#334762] sm:mt-5 sm:text-xl sm:leading-8">
                  A simple daily routine that fits your life.<br className="hidden sm:block" />
                  Listen anywhere. Understand deeply. Grow forever.
                </p>
              </div>

              <div className="relative mt-8 grid gap-4 sm:mt-14 lg:grid-cols-4 lg:gap-0">
                {[
                  {
                    icon: "headphones",
                    title: "1. Listen",
                    subtitle: "Play today's audio Scriptures",
                    copy: ["Every day includes a 15-30 minute cinematic audio lesson that walks you through the Bible one chapter at a time.", "Listen anywhere, anytime - while you drive, work out, clean, walk, or relax."],
                    outcome: "You become familiar with God's Word effortlessly, every day.",
                    bg: "#eaf2ff",
                    accent: "#4f8df7",
                  },
                  {
                    icon: "book",
                    title: "2. Understand",
                    subtitle: "Read the summary & key insights",
                    copy: ["Read a short chapter summary with optional study notes that explain the key people, themes, historical context, and practical meaning.", "So Scripture goes from confusing to clear and meaningful."],
                    outcome: "You understand what you're reading and why it matters.",
                    bg: "#eaf8ed",
                    accent: "#3b9b65",
                  },
                  {
                    icon: "question",
                    title: "3. Reflect",
                    subtitle: "Answer questions & go deeper",
                    copy: ["Answer reflection questions and Bible trivia to reinforce what you've learned and apply it to your daily life.", "Not just reading. Actually growing."],
                    outcome: "You build spiritual habits and deepen your relationship with God.",
                    bg: "#fff4d9",
                    accent: "#d99822",
                  },
                  {
                    icon: "chart",
                    title: "4. Stay on Track",
                    subtitle: "Build consistency that lasts",
                    copy: ["Track your streak, follow your Bible progress, and continue your journey from Genesis to Revelation.", "One day at a time. You've got this."],
                    outcome: "You stay consistent and finally finish what you started.",
                    bg: "#f0ecff",
                    accent: "#6555d9",
                  },
                ].map((step, index) => (
                  <article key={step.title} className="bb-journey-column relative flex h-full flex-col rounded-[18px] border border-[#eadfcd] bg-[#fffdf8]/78 p-4 text-left shadow-[0_14px_32px_rgba(7,22,47,0.045)] lg:rounded-none lg:border-0 lg:bg-transparent lg:px-9 lg:shadow-none">
                    {index < 3 ? (
                      <div className="pointer-events-none absolute right-0 top-32 hidden h-[320px] w-px bg-gradient-to-b from-transparent via-[#eadfcd] to-transparent lg:block" />
                    ) : null}
                    <div className="relative mb-3 flex items-center gap-3 lg:mb-8 lg:block lg:h-24">
                      {index < 3 ? (
                        <div className="absolute left-[184px] right-[-42px] top-12 z-0 hidden h-px lg:block" style={{ backgroundColor: step.accent, opacity: 0.5 }} />
                      ) : null}
                      <span className="relative z-20 grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black text-white shadow-[0_14px_30px_rgba(7,22,47,0.12)] lg:absolute lg:left-0 lg:top-[36px] lg:h-9 lg:w-9 lg:text-sm" style={{ backgroundColor: step.accent }}>
                        {index + 1}
                      </span>
                      <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white shadow-[0_20px_48px_rgba(7,22,47,0.08)] lg:mx-0 lg:ml-20 lg:h-24 lg:w-24" style={{ backgroundColor: step.bg }}>
                        <LandingLineIcon name={step.icon} color={step.accent} large />
                      </div>
                    </div>
                    <h3 className="bb-serif text-2xl font-black leading-tight text-[#07162f] lg:text-3xl">{step.title}</h3>
                    <p className="mt-2 text-sm font-black leading-5 text-[#07162f] lg:mt-5 lg:text-base lg:leading-6">{step.subtitle}</p>
                    <div className="mt-3 space-y-3 text-sm font-medium leading-6 text-[#07162f] lg:mt-7 lg:space-y-5 lg:text-base lg:leading-7">
                      {step.copy.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 lg:pt-9">
                    <div className="h-px w-full" style={{ backgroundColor: step.accent }} />
                    <p className="mt-3 flex items-start gap-2 text-sm font-medium leading-6 text-[#07162f] lg:mt-6 lg:gap-3 lg:text-base lg:leading-7">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-black text-white" style={{ backgroundColor: step.accent }}>✓</span>
                      <span><span className="font-black">Outcome:</span> {step.outcome}</span>
                    </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-5 pb-12 sm:px-8 lg:pb-16">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#eadfcd] bg-[#fffaf2] shadow-[0_28px_90px_rgba(7,22,47,0.08)]">
              <div className="relative grid min-h-[430px] lg:grid-cols-[0.56fr_0.44fr]">
                <div className="relative z-10 px-7 py-9 sm:px-10 lg:px-12 lg:py-10">
                  <div className="flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.16em] text-[#a66a14] sm:justify-start">
                    <span className="hidden h-px w-16 bg-[#d7a84a] sm:block" />
                    <LandingLineIcon name="book" small color="#b7791f" />
                    <span>Scripture was meant to be heard</span>
                    <span className="hidden h-px w-16 bg-[#d7a84a] sm:block" />
                  </div>

                  <h2 className="bb-serif mt-5 max-w-2xl text-center text-[clamp(2rem,3.6vw,3.2rem)] font-black leading-[1.03] text-[#07162f] sm:text-left">
                    For thousands of years, God&apos;s Word was heard before it was read.
                  </h2>
                  <p className="mt-4 max-w-2xl text-center text-sm font-medium leading-7 text-[#334762] sm:text-left">
                    People gathered to listen. Teachers read aloud. Early Christians shared Scripture together. Bible Buddy brings that ancient rhythm into modern life with guided audio lessons that help you understand, remember, and keep going.
                  </p>

                  <div className="mt-7 grid gap-5 md:grid-cols-3">
                    {[
                      ["headphones", "Listening helps you connect", "Hear the Bible come to life.", "#eaf2ff", "#2563eb"],
                      ["book", "Understanding helps you remember", "We break down the verses so you truly get it.", "#eaf8ed", "#3b9b65"],
                      ["flag", "Consistency helps you finish", "One lesson a day can take you through the Bible in one year.", "#fff4d9", "#d99822"],
                    ].map(([icon, title, copy, bg, accent]) => (
                      <div key={title} className="flex gap-4">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full" style={{ backgroundColor: bg }}>
                          <LandingLineIcon name={icon} small color={accent} />
                        </div>
                        <div>
                          <h3 className="text-sm font-black leading-5 text-[#07162f]">{title}</h3>
                          <p className="mt-2 text-xs font-semibold leading-5 text-[#526075]">{copy}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-2xl border border-[#eadfcd] bg-[#fffdf8]/82 px-5 py-4 text-center shadow-[0_16px_38px_rgba(7,22,47,0.055)]">
                    <p className="mx-auto max-w-2xl text-base font-black leading-7 text-[#07162f]">
                      No matter how busy life gets, Bible Buddy brings God&apos;s Word to you, so you never fall behind.
                    </p>
                    <div className="mx-auto mt-3 h-0.5 w-16 bg-[#d99822]" />
                  </div>
                </div>
                <div className="bb-bottom-story-image min-h-[320px] lg:min-h-full" aria-hidden="true" />
              </div>

              <div className="border-t border-[#eadfcd] bg-[#fffdf8]/90 px-7 py-7 text-center sm:px-12">
                <div className="mx-auto max-w-3xl">
                  <h2 className="bb-serif text-3xl font-black leading-tight text-[#07162f]">Ready to start your journey?</h2>
                  <p className="mt-2 text-base font-semibold text-[#334762]">It only takes 15-30 minutes a day.</p>
                  <Link href="/signup" onClick={() => trackStartJourneyClick("bottom_cta")} className="bb-public-button mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#2477f2] px-9 py-4 text-base font-black text-white shadow-[0_22px_48px_rgba(36,119,242,0.26)] transition hover:-translate-y-0.5 sm:w-auto sm:min-w-[420px]">
                    <span className="text-[#ffe08a]">*</span>
                    Create Free Account
                  </Link>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-[#315f94]">
                    <span className="inline-flex items-center gap-2"><LandingLineIcon name="shield" small color="#315f94" /> No credit card required</span>
                    <span className="text-[#b7c3d4]">•</span>
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="faq" className="px-5 pb-10 sm:px-8">
            <div className="mx-auto grid max-w-7xl gap-4 border-t border-[#eee4d8] pt-7 text-xs font-bold text-[#526075] sm:grid-cols-4">
              {[
                ["card", "No Credit Card Required"],
                ["clock", "Cancel Anytime"],
                ["shield", "Built on Truth"],
                ["people", "Trusted by Thousands"],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-3">
                  <LandingLineIcon name={icon} small />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </section>

          <footer className="border-t border-[#eee4d8] px-5 py-8 sm:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <BibleBuddyMark small />
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-bold text-[#07162f]">
                <Link href="/privacy" className="transition hover:text-[#135397]">Privacy Policy</Link>
                <Link href="/terms" className="transition hover:text-[#135397]">Terms of Service</Link>
                <Link href="/contact" className="transition hover:text-[#135397]">Contact</Link>
              </div>
            </div>
            <div className="mx-auto mt-5 flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[#6d7789]">
              <span>Copyright 2026 Bible Buddy. All rights reserved.</span>
              <span>Free to start. Cancel anytime.</span>
            </div>
          </footer>
        </div>
      </main>

    </div>
  );

  return (
    <div className="bb-public-landing min-h-screen bg-[#FBF9F4] text-black">
      <LegalPageThemeReset />
      <style>{`
        .bb-serif { font-family: "Playfair Display", "Cormorant Garamond", "Libre Baskerville", Georgia, serif; }
        .bb-public-landing,
        .bb-public-landing h1,
        .bb-public-landing h2,
        .bb-public-landing h3,
        .bb-public-landing p,
        .bb-public-landing span,
        .bb-public-landing div,
        .bb-public-landing svg {
          color: #000000 !important;
          opacity: 1 !important;
        }
        .bb-public-landing .bb-hero-gold {
          color: #D89B43 !important;
        }
        .bb-public-landing .bb-public-button,
        .bb-public-landing .bb-public-button * {
          color: #ffffff !important;
        }
        .bb-public-landing .bb-how-step {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
        }
        .bb-public-landing .bb-how-icon {
          color: var(--bb-step-accent) !important;
        }
        .bb-public-landing .bb-benefit-icon,
        .bb-public-landing .bb-benefit-icon svg {
          color: var(--bb-benefit-accent) !important;
        }
        .bb-public-landing .bb-accent-text {
          color: var(--bb-step-accent) !important;
          -webkit-text-fill-color: var(--bb-step-accent) !important;
        }
        .bb-public-landing .bb-step-number,
        .bb-public-landing .bb-step-number * {
          color: #ffffff !important;
        }
        .bb-public-landing .bb-video-preview,
        .bb-public-landing .bb-video-preview * {
          color: #ffffff !important;
        }
        .bb-soft-card {
          border: 1px solid rgba(160, 145, 120, 0.22);
          background: rgba(255, 255, 255, 0.86);
          box-shadow: 0 18px 44px rgba(14, 26, 58, 0.08);
          backdrop-filter: blur(12px);
        }
        .bb-small-card {
          border: 1px solid rgba(160, 145, 120, 0.18);
          background: rgba(255, 255, 255, 0.76);
          box-shadow: 0 10px 24px rgba(14, 26, 58, 0.05);
        }
        .bb-answer-card[data-selected="true"] {
          border-color: #D89B43;
          background: #fff8ea;
          box-shadow: 0 14px 28px rgba(216, 155, 67, 0.16);
        }
        .bb-join-pulse {
          animation: bb-join-pulse-shake 2.15s ease-in-out infinite;
          transform-origin: center;
        }
        .bb-join-pulse:hover {
          animation-play-state: paused;
        }
        @keyframes bb-join-pulse-shake {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            box-shadow: 0 16px 34px rgba(14, 26, 58, 0.18);
          }
          7% {
            transform: translate3d(-1.5px, 0, 0) scale(1.018);
          }
          11% {
            transform: translate3d(1.5px, 0, 0) scale(1.026);
          }
          15% {
            transform: translate3d(-1px, 0, 0) scale(1.022);
          }
          21% {
            transform: translate3d(1px, 0, 0) scale(1.028);
            box-shadow: 0 24px 54px rgba(14, 26, 58, 0.32);
          }
          30% {
            transform: translate3d(0, 0, 0) scale(1.018);
            box-shadow: 0 20px 44px rgba(14, 26, 58, 0.26);
          }
          48%, 76% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bb-join-pulse {
            animation: none;
          }
        }
        .bb-modal-yes-shake {
          animation: bb-modal-yes-shake 1.25s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes bb-modal-yes-shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50% {
            transform: translateX(-5px);
          }
          20%, 40%, 60% {
            transform: translateX(5px);
          }
          70% {
            transform: translateX(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bb-modal-yes-shake {
            animation: none;
          }
        }
      `}</style>

      <header className="bb-safe-top-header sticky top-0 z-[100] bg-[#FBF9F4]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-transparent">
              <svg className="h-8 w-8 text-black" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 8.5c4.8-1.7 7.8.2 11 2.7 3.2-2.5 6.2-4.4 11-2.7v17c-4.8-1.7-7.8.2-11 2.7-3.2-2.5-6.2-4.4-11-2.7v-17Z" />
                <path d="M16 11.2v17" />
                <path d="M8.2 12.4c2.6-.4 4.7.3 6.2 1.5" />
                <path d="M23.8 12.4c-2.6-.4-4.7.3-6.2 1.5" />
              </svg>
            </div>
            <span className="text-lg font-black tracking-tight">Bible Buddy</span>
          </div>
          <Link href="/login" className="bb-force-black hidden rounded-full border border-[#ece3d7] bg-[#FBF9F4] px-5 py-2.5 text-sm font-black shadow-[0_12px_30px_rgba(14,26,58,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(14,26,58,0.18)] sm:inline-flex sm:px-7 sm:py-3">
            Login
          </Link>
          <div className="relative sm:hidden">
            <button
              type="button"
              onClick={() => setLandingMenuOpen((open) => !open)}
              className="bb-force-black grid h-11 w-11 place-items-center rounded-2xl border border-[#ece3d7] bg-white text-xl font-black shadow-[0_12px_30px_rgba(14,26,58,0.14)]"
              aria-label={landingMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={landingMenuOpen}
            >
              {landingMenuOpen ? "×" : "☰"}
            </button>
            {landingMenuOpen ? (
              <div className="absolute right-0 top-[calc(100%+10px)] z-[110] w-[230px] rounded-[22px] border border-[#ece3d7] bg-white p-3 text-left shadow-[0_22px_52px_rgba(14,26,58,0.22)]">
                <Link
                  href="/login"
                  onClick={() => setLandingMenuOpen(false)}
                  className="bb-force-black block rounded-2xl border border-[#ece3d7] bg-white px-4 py-3 text-center text-sm font-black text-[#0E1A3A] shadow-sm"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => trackStartJourneyClick("mobile_menu")}
                  className="bb-force-black mt-2 block w-full rounded-2xl border border-[#ece3d7] bg-[#FBF9F4] px-4 py-3 text-center text-sm font-black text-[#0E1A3A]"
                >
                  Create Free Account
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-3xl px-5 pb-8 pt-14 text-center sm:px-8 lg:pb-10 lg:pt-18">
          <div className="mx-auto max-w-2xl">
            <div className="bb-force-black mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#e7dccb] bg-[#FBF9F4] px-4 py-2 text-sm font-bold shadow-[0_8px_24px_rgba(14,26,58,0.08)]">
              <svg className="bb-hero-gold h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="m12 2.8 2.58 5.8 6.32.66-4.72 4.25 1.32 6.21L12 16.55 6.5 19.72l1.32-6.21L3.1 9.26l6.32-.66L12 2.8Z" />
              </svg>
              <span>A better way to study God's Word</span>
            </div>
            <h1 className="bb-serif text-5xl font-black leading-[1.02] tracking-[-0.01em] text-black sm:text-6xl lg:text-7xl">
              <span className="block">You can't stick to</span>
              <span className="block">what you don't understand.</span>
              <span className="bb-hero-gold mt-3 block text-[0.82em]">Let's change that!</span>
            </h1>
            <p className="bb-force-black mx-auto mt-9 max-w-2xl text-lg font-semibold leading-8">
              If you've ever wanted to study the Bible but struggled to stay consistent or understand what you're reading, <strong>Bible Buddy</strong> makes Bible study easier.
            </p>
            <div className="mx-auto mt-8 grid max-w-3xl gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["15 minute daily lessons", "clock"],
                ["Study the Bible anywhere", "map"],
                ["Finish the Bible in less than a year", "check"],
                ["Understand it. Remember it. Live it.", "heart"],
              ].map(([text, icon]) => (
                <div key={text} className="bb-force-black flex items-center gap-3">
                  <LineIcon name={icon} />
                  <span className="text-sm font-black leading-tight">{text}</span>
                </div>
              ))}
            </div>
            <div className="mt-9">
              <Link
                href="/signup"
                onClick={() => trackStartJourneyClick("legacy_bottom_cta")}
                className="bb-public-button bb-join-pulse inline-block w-full rounded-2xl bg-[#0E1A3A] px-7 py-4 text-base font-black text-white shadow-[0_16px_34px_rgba(14,26,58,0.18)] transition hover:-translate-y-0.5 hover:bg-[#172654] sm:w-auto sm:min-w-[320px]"
              >
                Create Free Account
              </Link>
              <p className="bb-force-black mt-4 flex items-center justify-center gap-2 text-sm font-semibold">
                <svg className="h-4 w-4 shrink-0 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="10" width="14" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                <span>It's free to sign up. Cancel anytime.</span>
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 pb-4 sm:px-8">
          <div className="relative mx-auto h-[78px] w-full max-w-[720px] overflow-hidden sm:h-[102px]">
            <Image src="/Reviewsmaller.png" alt="" fill sizes="(max-width: 768px) 100vw, 720px" className="object-contain object-center" />
          </div>
        </section>

        <HowItWorksSection onStart={openQuestionnaire} />
      </main>

      <footer className="px-5 py-8 sm:px-8" style={{ backgroundColor: "#FBF9F4" }}>
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <svg className="h-6 w-6 text-[#0E1A3A]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 8.5c4.8-1.7 7.8.2 11 2.7 3.2-2.5 6.2-4.4 11-2.7v17c-4.8-1.7-7.8.2-11 2.7-3.2-2.5-6.2-4.4-11-2.7v-17Z" />
                <path d="M16 11.2v17" />
              </svg>
              <span className="text-base font-black text-[#0E1A3A]">Bible Buddy</span>
            </div>
            <p className="mt-3 max-w-xl text-xs font-semibold leading-5 text-[#536173]">
              Bible Buddy helps you build a guided daily Bible study rhythm. Educational content only; always seek pastoral or professional counsel for personal situations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-black text-[#0E1A3A]">
            <Link href="/privacy" className="transition hover:text-[#d89b43]">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-[#d89b43]">Terms of Service</Link>
            <Link href="/contact" className="transition hover:text-[#d89b43]">Contact</Link>
          </div>
        </div>
        <div className="mx-auto mt-5 flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[#6b7280]">
          <span>Copyright 2026 Bible Buddy. All rights reserved.</span>
          <span>Free to start. Cancel anytime.</span>
        </div>
      </footer>

      {onboardingOpen ? (
        <OnboardingFlow
          step={onboardingStep}
          onClose={(closedFrom) => closeQuestionnaire(closedFrom)}
          onStart={startQuestionnaire}
          onSkip={skipToAccount}
          question={currentQuestion}
          questionIndex={questionIndex}
          progressPercent={progressPercent}
          selectedAnswer={selectedAnswer}
          chooseAnswer={chooseAnswer}
          continueQuestionnaire={continueQuestionnaire}
          openAccountFromRecommendation={openAccountFromRecommendation}
          startGuestJourney={startGuestJourney}
          chooseDevotionalRoute={chooseDevotionalRoute}
          chooseBibleYearRoute={chooseBibleYearRoute}
          confirmDevotionalChoice={confirmDevotionalChoice}
          loadingMessage={loadingMessages[loadingMessageIndex]}
          answers={answers}
          recommendationDays={recommendationDays}
          recommendedStudyRoute={recommendedStudyRoute}
          selectedStudyRoute={selectedStudyRoute}
          devotionalOptions={devotionalOptions}
          devotionalsLoading={devotionalsLoading}
          selectedDevotionalId={selectedDevotionalId}
          setSelectedDevotionalId={setSelectedDevotionalId}
          firstName={firstName}
          setFirstName={setFirstName}
          accountAttempted={accountAttempted}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          profileImage={profileImage}
          handleProfileImage={handleProfileImage}
          submitting={submitting}
          error={error}
          handleSubmit={handleSubmit}
          handleOAuthSignIn={handleOAuthSignIn}
          enterDashboard={enterDashboard}
        />
      ) : null}
    </div>
  );
}

function LandingThemeStyles() {
  return (
    <style>{`
      .bb-serif { font-family: "Playfair Display", "Cormorant Garamond", "Libre Baskerville", Georgia, serif; }
      .bb-public-landing {
        --bb-ink: #07162f;
        --bb-muted: #526075;
        --bb-cream: #fbf7ef;
        --bb-blue: #135397;
        --bb-gold: #e7bc67;
      }
      .bb-public-landing .bb-public-button,
      .bb-public-landing .bb-public-button * {
        color: #ffffff !important;
      }
      .bb-public-landing .bb-gold-button,
      .bb-public-landing .bb-gold-button * {
        color: #07162f !important;
      }
      .bb-landing-shell {
        box-shadow: none;
      }
      .bb-hero-visual {
        background:
          radial-gradient(circle at 58% 36%, rgba(255, 226, 160, 0.78), transparent 18%),
          linear-gradient(90deg, rgba(255, 253, 248, 0.55), rgba(255, 253, 248, 0.06)),
          url("/landing-hero.png");
        background-size: cover;
        background-position: center;
      }
      .bb-phone-frame {
        background: linear-gradient(145deg, #0d1727, #050912);
        box-shadow: 0 34px 70px rgba(7, 22, 47, 0.35), inset 0 0 0 2px rgba(255,255,255,0.08);
      }
      .bb-dark-panel {
        background:
          url("/newmiddlebannerforlandingpage.png");
        background-size: cover;
        background-position: center;
      }
      .bb-listen-copy,
      .bb-listen-copy h2,
      .bb-listen-copy p,
      .bb-listen-copy span,
      .bb-listen-copy svg {
        color: #07162f !important;
      }
      .bb-listen-copy p {
        color: #526075 !important;
      }
      .bb-listen-copy {
        text-shadow: none;
      }
      .bb-soft-card {
        border: 1px solid rgba(9, 28, 58, 0.1);
        background: rgba(255, 253, 248, 0.82);
        box-shadow: 0 18px 42px rgba(7, 22, 47, 0.055);
        backdrop-filter: blur(14px);
      }
      .bb-journey-card {
        border: 1px solid rgba(9, 28, 58, 0.1);
        background: linear-gradient(180deg, rgba(255, 253, 248, 0.96), rgba(250, 244, 234, 0.9));
        box-shadow: 0 22px 58px rgba(7, 22, 47, 0.065);
      }
      .bb-bottom-story-image {
        background:
          linear-gradient(90deg, #fffaf2 0%, rgba(255, 250, 242, 0.88) 10%, rgba(255, 250, 242, 0.32) 34%, rgba(255, 250, 242, 0) 58%),
          url("/BottombannerLandingpage.png");
        background-size: cover;
        background-position: center right;
      }
      .bb-answer-card[data-selected="true"] {
        border-color: #D89B43;
        background: #fff8ea;
        box-shadow: 0 14px 28px rgba(216, 155, 67, 0.16);
      }
      .bb-join-pulse {
        animation: bb-join-pulse-shake 2.15s ease-in-out infinite;
        transform-origin: center;
      }
      .bb-join-pulse:hover {
        animation-play-state: paused;
      }
      @keyframes bb-join-pulse-shake {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); box-shadow: 0 18px 36px rgba(19, 83, 151, 0.2); }
        11% { transform: translate3d(1px, 0, 0) scale(1.018); }
        21% { transform: translate3d(-1px, 0, 0) scale(1.022); box-shadow: 0 24px 48px rgba(19, 83, 151, 0.28); }
        34%, 100% { transform: translate3d(0, 0, 0) scale(1); }
      }
      .bb-modal-yes-shake {
        animation: bb-modal-yes-shake 1.25s ease-in-out infinite;
        transform-origin: center;
      }
      @keyframes bb-modal-yes-shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50% { transform: translateX(-5px); }
        20%, 40%, 60% { transform: translateX(5px); }
        70% { transform: translateX(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .bb-join-pulse,
        .bb-modal-yes-shake {
          animation: none;
        }
      }
      @media (max-width: 640px) {
        .bb-dark-panel {
          background: #fffaf2;
          border: 1px solid rgba(9, 28, 58, 0.1);
          box-shadow: 0 18px 42px rgba(7, 22, 47, 0.055);
        }
        .bb-bottom-story-image {
          display: none;
        }
      }
    `}</style>
  );
}

function BibleBuddyMark({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 text-[#07162f]">
      <Image
        src="/TherealiconforBB.png"
        alt=""
        width={small ? 24 : 28}
        height={small ? 24 : 28}
        className={`${small ? "h-6 w-6" : "h-7 w-7"} rounded-md object-cover`}
      />
      <span className={small ? "text-base font-black tracking-tight" : "text-lg font-black tracking-tight"}>Bible Buddy</span>
    </div>
  );
}

function LandingPill({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/82 px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#07162f] shadow-[0_8px_22px_rgba(7,22,47,0.08)]">
      <span className="text-[#e2a63a]">*</span>
      <span>{children}</span>
    </div>
  );
}

function AvatarStack() {
  const avatars = ["/Lindseyhappy.png", "/WalterHappy.png", "/Stevehappy.png", "/Newlouisstareyes.png"];
  return (
    <div className="flex items-center justify-center">
      {avatars.map((src, index) => (
        <div key={src} className="-ml-3 first:ml-0">
          <Image src={src} alt="" width={48} height={48} className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-[0_10px_22px_rgba(7,22,47,0.12)]" priority={index === 0} />
        </div>
      ))}
    </div>
  );
}

function RotatingProofStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = landingProofItems[activeIndex] ?? landingProofItems[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % landingProofItems.length);
    }, 15000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-2 py-2 text-center">
      <p className="bb-serif text-[clamp(1.85rem,4vw,3.4rem)] font-black leading-[1.08] tracking-[-0.01em] text-[#2f3a4b]">
        "{activeItem.quote}"
      </p>
      <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-[#9b8560]">
        {activeItem.name} · {activeItem.detail}
      </p>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="bb-phone-frame rounded-[34px] p-3">
      <div className="overflow-hidden rounded-[26px] bg-[#071221] p-5 text-white">
        <div className="mb-4 flex items-center justify-between text-[11px] font-bold text-white/78">
          <span>5:31</span>
          <span>Wi-Fi 100%</span>
        </div>
        <p className="text-xs font-semibold text-white/76">Good morning, Alex</p>
        <p className="mt-5 text-xs font-bold text-white/54">Today's Lesson</p>
        <h3 className="bb-serif mt-1 text-3xl font-black leading-tight text-white">Genesis 1-2</h3>
        <p className="text-sm font-semibold text-white/62">The Beginning</p>
        <div className="relative mt-5 overflow-hidden rounded-lg">
          <Image src="/Day1cover.png" alt="" width={460} height={280} className="h-44 w-full object-cover" />
          <div className="absolute inset-0 grid place-items-center bg-black/18">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-[#07162f] shadow-[0_14px_36px_rgba(0,0,0,0.28)]">
              <LandingLineIcon name="play" />
            </div>
          </div>
          <span className="absolute bottom-3 right-3 text-xs font-bold text-white/78">15:42</span>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-bold text-white/62">
            <span>Your Progress</span>
            <span>8%</span>
          </div>
          <p className="mt-1 text-sm font-black text-white">Day 32 of 365</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/12">
            <div className="h-full w-[32%] rounded-full bg-[#20c997]" />
          </div>
          <div className="mt-4 flex justify-between text-[11px] font-bold text-white/72">
            {[29, 30, 31, 32, 33, 34, 35].map((day) => (
              <span key={day} className={day === 32 ? "grid h-7 w-7 place-items-center rounded-full bg-white text-[#07162f]" : "grid h-7 w-7 place-items-center rounded-full bg-white/8"}>
                {day}
              </span>
            ))}
          </div>
        </div>
        <p className="bb-serif mx-auto mt-6 max-w-[210px] text-center text-sm italic leading-6 text-white/72">
          Your word is a lamp for my feet, a light on my path.
        </p>
        <p className="mt-1 text-center text-xs font-semibold text-white/54">Psalm 119:105</p>
      </div>
    </div>
  );
}

function LandingLineIcon({
  name,
  color = "currentColor",
  small = false,
  large = false,
  light = false,
}: {
  name: string;
  color?: string;
  small?: boolean;
  large?: boolean;
  light?: boolean;
}) {
  const size = small ? "h-4 w-4" : large ? "h-9 w-9" : "h-6 w-6";
  const stroke = small ? "2.1" : "1.9";
  const common = {
    className: `${size} shrink-0 ${light ? "text-white" : ""}`,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  return (
    <svg {...common}>
      {name === "headphones" ? <><path d="M4 13a8 8 0 0 1 16 0" /><path d="M5 13h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Z" /><path d="M19 13h-3v6h3a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" /></> : null}
      {name === "book" ? <><path d="M4 5c5-1.8 8 .2 8 2.4V20c0-2.2-3-4.2-8-2.4V5Z" /><path d="M20 5c-5-1.8-8 .2-8 2.4V20c0-2.2 3-4.2 8-2.4V5Z" /></> : null}
      {name === "calendar" ? <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4" /><path d="M16 3v4" /><path d="M4 10h16" /><path d="m8 15 2 2 5-5" /></> : null}
      {name === "flag" ? <><path d="M5 21V4" /><path d="M5 5h12l-2 4 2 4H5" /></> : null}
      {name === "arrow" ? <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></> : null}
      {name === "lock" ? <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></> : null}
      {name === "play" ? <><circle cx="12" cy="12" r="10" /><path d="m10 8 6 4-6 4V8Z" /></> : null}
      {name === "question" ? <><circle cx="12" cy="12" r="10" /><path d="M9.5 9a3 3 0 0 1 5 2.2c0 2.6-3 2.5-3 4.8" /><path d="M12 19h.01" /></> : null}
      {name === "check" ? <><circle cx="12" cy="12" r="10" /><path d="m8 12.4 2.7 2.7L16.5 9" /></> : null}
      {name === "chart" ? <><path d="M5 19V9" /><path d="M12 19V5" /><path d="M19 19v-8" /><path d="M3 19h18" /></> : null}
      {name === "car" ? <><path d="M5 16h14" /><path d="m6.5 16 1.6-5h7.8l1.6 5" /><circle cx="8" cy="18" r="1.5" /><circle cx="16" cy="18" r="1.5" /></> : null}
      {name === "dumbbell" ? <><path d="M6 8v8" /><path d="M18 8v8" /><path d="M8 12h8" /><path d="M3 10v4" /><path d="M21 10v4" /></> : null}
      {name === "clean" ? <><path d="M14 4 4 14" /><path d="m5 13 6 6" /><path d="m9 9 6 6" /><path d="M16 5l3 3" /></> : null}
      {name === "coffee" ? <><path d="M5 8h12v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" /><path d="M17 10h1a3 3 0 0 1 0 6h-1" /><path d="M8 4v2" /><path d="M12 4v2" /></> : null}
      {name === "walk" ? <><circle cx="12" cy="5" r="2" /><path d="m10 9 4 1 2 4" /><path d="m11 10-2 4-3 2" /><path d="m13 14-1 7" /><path d="m9 15 4 2 3 4" /></> : null}
      {name === "crown" ? <><path d="m4 8 4 3 4-6 4 6 4-3-2 10H6L4 8Z" /><path d="M6 18h12" /></> : null}
      {name === "card" ? <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></> : null}
      {name === "shield" ? <><path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></> : null}
      {name === "people" ? <><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.5" /><path d="M15.5 15.5A5 5 0 0 1 21 19" /></> : null}
    </svg>
  );
}

function ResultIcon({ name }: { name: string }) {
  if (name === "play") {
    return (
      <svg className="h-6 w-6 text-[#0E1A3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="m10 8 6 4-6 4V8Z" />
      </svg>
    );
  }

  if (name === "question") {
    return (
      <svg className="h-6 w-6 text-[#0E1A3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.4 2.4 0 0 1 4.4 1.35c0 1.75-2.2 1.9-2.2 3.65" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  return (
    <svg className="h-6 w-6 text-[#0E1A3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.78-.07-1.53-.2-2.23H12v4.22h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.52Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.63-2.44l-3.24-2.51c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.76-5.6-4.12H3.05v2.59A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.4 13.89a6 6 0 0 1 0-3.78V7.52H3.05a10 10 0 0 0 0 8.96l3.35-2.59Z" />
      <path fill="#EA4335" d="M12 5.99c1.47 0 2.8.5 3.84 1.5l2.88-2.88C16.97 2.98 14.7 2 12 2a10 10 0 0 0-8.95 5.52l3.35 2.59C7.2 7.75 9.4 5.99 12 5.99Z" />
    </svg>
  );
}

function FieldIcon({ name }: { name: string }) {
  if (name === "email") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }
  if (name === "user") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    );
  }
  if (name === "eye") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (name === "upload") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 20h14" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function LineIcon({ name }: { name: string }) {
  if (name === "map") {
    return (
      <svg className="h-6 w-6 shrink-0 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z" />
        <path d="M9 3v15M15 6v15" />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg className="h-7 w-7 shrink-0 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </svg>
    );
  }
  if (name === "growth") {
    return (
      <svg className="h-7 w-7 shrink-0 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19V5M4 19h16" />
        <path d="m7 15 4-4 3 3 5-7" />
        <path d="M15 7h4v4" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg className="h-7 w-7 shrink-0 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    );
  }
  if (name === "clock") {
    return (
      <svg className="h-6 w-6 shrink-0 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }
  if (name === "check") {
    return (
      <svg className="h-6 w-6 shrink-0 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6 shrink-0 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.8 8.6c0 5.4-8.8 10.2-8.8 10.2S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z" />
    </svg>
  );
}

function HowItWorksSection({ onStart }: { onStart: () => void }) {
  const stepAccents = ["#2f57d6", "#d89b43", "#35a06b"];
  const stepIconBackgrounds = ["#edf2ff", "#fff3d7", "#e9f8ef"];
  const benefitAccents = ["#2f57d6", "#d89b43", "#6b55d9", "#356dd7"];
  const benefitBackgrounds = ["#edf2ff", "#fff3d7", "#f0ecff", "#edf4ff"];

  return (
    <section className="relative mx-auto max-w-6xl px-5 pb-16 pt-5 sm:px-8 sm:pt-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-5">
          <span className="hidden h-px w-24 bg-[#d89b43] sm:block" />
          <h2 className="bb-force-black bb-serif text-4xl font-black leading-tight sm:text-5xl">Here's How Bible Buddy Works</h2>
          <span className="hidden h-px w-24 bg-[#d89b43] sm:block" />
        </div>
        <p className="mt-4 text-2xl font-black leading-tight text-[#0E1A3A] sm:text-3xl">
          Scripture was meant to be <span className="text-[#d89b43]">heard and understood.</span>
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-6 text-[#33415c]">
          For thousands of years, people gathered together to listen as Scripture was read and explained aloud. Bible Buddy brings that experience into a simple daily system built for modern life.
        </p>
      </div>

      <div className="relative mt-8 hidden gap-6 md:grid md:grid-cols-3">
        <div className="pointer-events-none absolute left-[18%] right-[18%] top-8 hidden border-t border-dashed border-[#d89b43]/55 md:block" aria-hidden="true" />
        {howItWorksCards.map((card, index) => {
          const accent = stepAccents[index] ?? "#0E1A3A";
          const iconBackground = stepIconBackgrounds[index] ?? "#edf2ff";
          return (
          <article
            key={card.title}
            className="relative rounded-[14px] px-5 pb-5 pt-10 text-center shadow-[0_12px_28px_rgba(14,26,58,0.045)]"
            style={{ backgroundColor: "#fffdfa", border: "1px solid #eadfcd" }}
          >
            <span
              className="bb-how-step absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full text-sm font-black shadow-[0_8px_18px_rgba(14,26,58,0.10)]"
              style={{ backgroundColor: iconBackground, color: "#0E1A3A" }}
            >
              {index + 1}
            </span>
            <div className="flex justify-center">
              <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ backgroundColor: iconBackground }}>
                <DemoIcon panel={card.key} accent={accent} />
              </div>
            </div>
            <h3 className="mt-4 text-base font-black leading-tight text-black">{card.title}</h3>
            <p className="mx-auto mt-2 max-w-[190px] text-xs font-semibold leading-5 text-black">{card.description}</p>
            <MiniPreview panel={card.key} accent={accent} />
          </article>
          );
        })}
      </div>

      <div className="relative mx-auto mt-9 grid max-w-2xl gap-0 rounded-[24px] shadow-[0_14px_34px_rgba(14,26,58,0.045)] md:hidden" style={{ backgroundColor: "#fffdfa", border: "1px solid #eadfcd" }}>
        {howItWorksCards.map((card, index) => {
          const accent = stepAccents[index] ?? "#0E1A3A";
          const iconBackground = stepIconBackgrounds[index] ?? "#edf2ff";
          return (
          <div key={card.title} className={`relative flex gap-4 px-4 py-5 text-left ${index > 0 ? "border-t border-[#eee5d8]" : ""}`}>
            {index < howItWorksCards.length - 1 ? <span className="absolute left-[31px] top-12 h-14 border-l border-dashed border-[#dec89f]" aria-hidden="true" /> : null}
            <span className="bb-how-step z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-black" style={{ backgroundColor: iconBackground, color: "#0E1A3A" }}>{index + 1}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ backgroundColor: iconBackground }}>
                  <DemoIcon panel={card.key} accent={accent} />
                </div>
                <h3 className="text-sm font-black leading-tight text-black">{card.title}</h3>
              </div>
              <p className="mt-1 text-xs font-semibold leading-5 text-black">{card.description}</p>
              <div className="max-w-[240px]">
                <MiniPreview panel={card.key} compact accent={accent} />
              </div>
            </div>
          </div>
          );
        })}
      </div>

      <div
        className="mt-5 grid gap-0 overflow-hidden rounded-[18px] border border-[#eadfcd] text-left shadow-[0_12px_30px_rgba(14,26,58,0.045)] sm:grid-cols-2 lg:grid-cols-4"
        style={{ backgroundColor: "#fffdfa" }}
      >
        {benefitRows.map(([title, copy], index) => (
          <div
            key={title}
            className={`flex items-start gap-3 px-5 py-4 ${index > 0 ? "border-t border-[#eadfcd] sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-t lg:border-t-0" : ""}`}
            style={{ backgroundColor: "#fffdfa" }}
          >
            <div
              className="bb-benefit-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{ "--bb-benefit-accent": benefitAccents[index] ?? "#2f57d6", backgroundColor: benefitBackgrounds[index] ?? "#edf2ff" } as CSSProperties}
            >
              <LineIcon name={index === 0 ? "calendar" : index === 1 ? "clock" : index === 2 ? "growth" : "shield"} />
            </div>
            <div>
              <p className="text-base font-black leading-tight text-[#0E1A3A]">{title}</p>
              <p className="mt-1 text-xs font-semibold leading-4 text-[#33415c]">{copy}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button type="button" onClick={onStart} className="bb-public-button bb-join-pulse w-full rounded-2xl bg-[#0E1A3A] px-6 py-4 text-sm font-black text-white sm:w-auto sm:min-w-[320px]">
          Create Free Account
        </button>
      </div>
    </section>
  );
}

function DemoIcon({ panel, accent = "#0E1A3A" }: { panel: PreviewPanel; accent?: string }) {
  return (
    <svg className="bb-how-icon h-10 w-10 shrink-0" style={{ "--bb-step-accent": accent } as CSSProperties} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {panel === "watch" ? <><rect x="10" y="11" width="28" height="26" rx="4" /><path d="m21 19 10 6-10 6V19Z" /></> : null}
      {panel === "study" ? <><path d="M8 14c8-3 12 1 16 4 4-3 8-7 16-4v24c-8-3-12 1-16 4-4-3-8-7-16-4V14Z" /><path d="M24 18v24" /></> : null}
      {panel === "trivia" ? <><circle cx="24" cy="24" r="16" /><path d="M20 19a4.5 4.5 0 0 1 8 3c0 4-5 4-5 8" /><path d="M24 36h.01" /></> : null}
    </svg>
  );
}

function MiniPreview({ panel, compact = false, accent = "#0E1A3A" }: { panel: PreviewPanel; compact?: boolean; accent?: string }) {
  const wrapperMargin = compact ? "mt-3" : "mt-5";
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  if (panel === "watch") {
    return (
      <div className={`${wrapperMargin} overflow-hidden rounded-xl p-2 shadow-[0_8px_18px_rgba(14,26,58,0.045)]`} style={{ backgroundColor: "#fffaf4", border: "1px solid #eadfcd" }}>
        <div className="relative overflow-hidden rounded-xl">
          {showVideoPlayer ? (
            <iframe
              src="https://player.mediadelivery.net/play/618103/e810870b-c3f6-4289-b74d-263113afede9?autoplay=0&preload=false"
              title="Day 1 - Genesis 1-2 video preview"
              loading="lazy"
              allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
              allowFullScreen
              className="aspect-video w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setShowVideoPlayer(true)}
              className="relative block aspect-video w-full overflow-hidden bg-[#102033] text-white"
              aria-label="Load Day 1 video preview"
            >
              <Image src="/day1tumbnail.jpg" alt="" fill sizes="(max-width: 640px) 240px, 280px" className="object-cover opacity-80" />
              <span className="absolute inset-0 bg-black/25" aria-hidden="true" />
              <span className="bb-video-preview absolute inset-0 grid place-items-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#c59a4a] pl-0.5 text-sm font-black text-white shadow-lg">
                  Play
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    );
  }

  if (panel === "study") {
    return (
      <div className={`${wrapperMargin} rounded-xl p-3 text-left shadow-[0_8px_18px_rgba(14,26,58,0.04)]`} style={{ backgroundColor: "#fffaf4", border: "1px solid #eadfcd" }}>
        <p className="text-[9px] font-black uppercase tracking-[0.14em]" style={{ color: accent }}>Chapter Summary</p>
        <p className="mt-2 text-[12px] font-black leading-5 text-black">Genesis 1-2</p>
        <p className="mt-2 text-[11px] font-semibold leading-5 text-black">God brings order out of darkness, creates life with purpose, and forms humanity in His image.</p>
        <div className="mt-3 grid gap-1.5">
          {["Creation is good", "Humanity has dignity", "Eden shows God's design"].map((line) => (
            <span key={line} className="rounded-lg px-2 py-1.5 text-[10px] font-bold text-black" style={{ backgroundColor: "#fffdfa", border: "1px solid #eadfcd" }}>{line}</span>
          ))}
        </div>
      </div>
    );
  }

  if (panel === "trivia") {
    return (
      <div className={`${wrapperMargin} rounded-xl p-3 text-left shadow-[0_8px_18px_rgba(14,26,58,0.04)]`} style={{ backgroundColor: "#fffaf4", border: "1px solid #eadfcd" }}>
        <p className="text-[10px] font-black text-black">Question 1 of 5</p>
        <p className="mt-1 text-[11px] font-black leading-4 text-black">Who created everything?</p>
        {["Angels", "God", "Humans", "The Universe"].map((answer) => (
          <p
            key={answer}
            className="mt-1 rounded-lg px-2 py-1 text-[10px] font-semibold text-black"
            style={answer === "God" ? { backgroundColor: "#fff6e6", border: `1px solid ${accent}` } : { backgroundColor: "#fffdfa", border: "1px solid #eadfcd" }}
          >
            {answer}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className={`${wrapperMargin} rounded-xl p-3 text-left shadow-[0_8px_18px_rgba(14,26,58,0.04)]`} style={{ backgroundColor: "#fffaf4", border: "1px solid #eadfcd" }}>
      <p className="text-[10px] font-black text-black">Sarah W. <span className="font-semibold text-black">2h ago</span></p>
      <p className="mt-1 text-[11px] font-semibold leading-5 text-black">I never noticed how creation points to God's purpose.</p>
      <p className="bb-accent-text mt-2 text-[10px] font-black" style={{ "--bb-step-accent": accent } as CSSProperties}>5 stars - 12</p>
      <div className="mt-2 border-t border-[#eee5d8] pt-2">
        <p className="text-[10px] font-black text-black">David M.</p>
        <p className="text-[11px] font-semibold text-black">Great insight!</p>
      </div>
    </div>
  );
}

function PublicDashboardDemo({
  previewPanel,
  setPreviewPanel,
  studyTab,
  setStudyTab,
  onDeepNotesGift,
}: {
  previewPanel: PreviewPanel;
  setPreviewPanel: (panel: PreviewPanel) => void;
  studyTab: StudyTab;
  setStudyTab: (tab: StudyTab) => void;
  onDeepNotesGift: () => void;
}) {
  const [modalPanel, setModalPanel] = useState<PreviewPanel | null>(null);

  function openDemoTask(panel: PreviewPanel) {
    setPreviewPanel(panel);
    setModalPanel(panel);
  }

  return (
    <div className="bb-soft-card mx-auto w-full max-w-[640px] overflow-hidden rounded-[30px]">
      <div className="border-b border-[#eee5d8] px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-base font-black text-[#0E1A3A]">Welcome back, Alex!</p>
            <p className="mt-0.5 text-xs font-semibold text-[#4A4A4A]">Ready for your next step in God's Word?</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-[#e7dccb] bg-[#fff8ea] px-3 py-2 text-center">
              <p className="text-sm font-black text-[#0E1A3A]">12</p>
              <p className="text-[10px] font-black uppercase text-[#4A4A4A]">Day Streak</p>
            </div>
            <button type="button" className="grid h-10 w-10 place-items-center rounded-2xl border border-[#e7dccb] bg-white text-sm font-black text-[#0E1A3A]">!</button>
          </div>
        </div>
      </div>

      <div className="p-5">
        <button type="button" onClick={() => openDemoTask("watch")} className="w-full rounded-[24px] border border-[#e7dccb] bg-white p-4 text-left shadow-[0_10px_28px_rgba(14,26,58,0.05)] transition hover:-translate-y-0.5">
          <div className="grid gap-4 sm:grid-cols-[1fr_120px] sm:items-center">
            <div>
              <p className="text-xs font-black text-[#0E1A3A]">Bible in One Year</p>
              <p className="mt-1 text-xs font-semibold text-[#4A4A4A]">Day 1 of 365</p>
              <h2 className="mt-1 text-xl font-black leading-tight text-[#0E1A3A]">The Creation of the World</h2>
              <p className="mt-1 text-sm font-semibold text-[#4A4A4A]">Genesis 1-2</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#eee5d8]">
                <div className="h-full w-[1%] rounded-full bg-[#D89B43]" />
              </div>
              <p className="mt-1 text-right text-xs font-black text-[#4A4A4A]">0%</p>
            </div>
            <div className="hidden h-28 overflow-hidden rounded-2xl sm:block">
              <img src="/Day1cover.png" alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </button>

        <div className="mt-4 overflow-x-auto pb-2">
          <div className="flex min-w-[520px] gap-2">
            {journeyStudies.slice(0, 5).map((study) => (
              <button
                key={`${study.title}-${study.day}`}
                type="button"
                onClick={() => (study.unlocked ? openDemoTask("watch") : onDeepNotesGift())}
                className={`w-28 shrink-0 rounded-2xl border bg-white px-3 py-3 text-left transition hover:-translate-y-0.5 ${
                  study.unlocked ? "border-[#0E1A3A]" : "border-[#e7dccb]"
                }`}
              >
                <p className="text-xs font-black text-[#0E1A3A]">Day {study.day}</p>
                <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-4 text-[#4A4A4A]">{study.title}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 border-t border-[#eee5d8] pt-4">
          <p className="text-sm font-black text-[#0E1A3A]">Today's Tasks</p>
          <div className="mt-3 grid gap-1">
            {tasks.map((task, index) => (
              <button key={task.key} type="button" onClick={() => openDemoTask(task.key)} className="group grid grid-cols-[28px_1fr_auto] items-center gap-3 rounded-2xl px-2 py-3 text-left transition hover:bg-[#fff8ea]">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0E1A3A] text-xs font-black text-white">{index + 1}</span>
                <span className="min-w-0">
                  <span className="block text-sm font-black leading-tight text-[#0E1A3A]">{task.title}</span>
                  <span className="mt-0.5 block text-xs font-semibold leading-4 text-[#4A4A4A]">{task.copy}</span>
                </span>
                <span className="grid min-w-[52px] place-items-center rounded-2xl border border-[#e7dccb] bg-white px-2 py-2 text-xs font-black text-[#0E1A3A]">
                  {task.key === "watch" ? "15 min" : null}
                  {task.key === "study" ? "Summary" : null}
                  {task.key === "trivia" ? "?" : null}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 border-t border-[#eee5d8] bg-white/72 px-3 py-3">
        {["Dashboard", "Journey", "Community", "Progress", "Profile"].map((item, index) => (
          <button key={item} type="button" className="grid gap-1 text-center text-[10px] font-black text-[#4A4A4A]">
            <span className={`mx-auto grid h-7 w-7 place-items-center rounded-xl ${index === 0 ? "bg-[#0E1A3A] text-white" : "bg-[#f5efe6] text-[#0E1A3A]"}`}>{index + 1}</span>
            <span>{item}</span>
          </button>
        ))}
      </div>

      {modalPanel ? (
        <DemoTaskModal
          panel={modalPanel}
          studyTab={studyTab}
          setStudyTab={setStudyTab}
          onClose={() => setModalPanel(null)}
          onDeepNotesGift={onDeepNotesGift}
        />
      ) : null}
    </div>
  );
}

function DemoTaskModal({
  panel,
  studyTab,
  setStudyTab,
  onClose,
  onDeepNotesGift,
}: {
  panel: PreviewPanel;
  studyTab: StudyTab;
  setStudyTab: (tab: StudyTab) => void;
  onClose: () => void;
  onDeepNotesGift: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#102033]/55 px-4 py-6 backdrop-blur-sm">
      <div className="bb-soft-card max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[30px] p-4 sm:p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a6a1f]">Demo Preview</p>
            <h3 className="mt-1 text-2xl font-black leading-tight">
              {panel === "watch" ? "Watch the 15 Minute Breakdown" : null}
              {panel === "study" ? "Read the Chapter Summary" : null}
              {panel === "trivia" ? "Answer Trivia Questions" : null}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[#eadcc2] bg-white text-xl font-black text-[#102033]">
            x
          </button>
        </div>

        {panel === "watch" ? (
          <div>
            <div className="grid aspect-video place-items-center rounded-[24px] bg-[#102033] text-white">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#c59a4a] text-sm font-black">Play</div>
            </div>
            <h4 className="mt-4 text-xl font-black">Day 1 - The Creation of the World</h4>
            <p className="text-sm font-bold text-[#6a7890]">Genesis 1-2</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#58677a]">
              Learn how Genesis begins the story of creation, humanity, purpose, and God's design for the world.
            </p>
          </div>
        ) : null}

        {panel === "study" ? (
          <div>
            <div className="rounded-2xl border border-[#eadcc2] bg-[#fffaf1] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a6a1f]">Day 1 Summary</p>
              <h4 className="mt-2 text-xl font-black text-[#102033]">Genesis 1-2</h4>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#24364a]">
                Genesis 1-2 introduces the world before sin, pain, and brokenness entered creation. These chapters show God bringing order out of darkness, creating life with purpose, and forming humanity in His image.
              </p>
              <div className="mt-4 grid gap-2">
                {["God creates with order and purpose.", "Humanity is made with value and dignity.", "Eden shows work, rest, boundaries, and relationship with God."].map((line) => (
                  <p key={line} className="rounded-xl border border-[#eadcc2] bg-white px-3 py-2 text-sm font-bold text-[#24364a]">{line}</p>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {panel === "trivia" ? (
          <div>
            <h4 className="text-lg font-black">Who created the heavens and the earth?</h4>
            <div className="mt-3 grid gap-2">
              {["Angels", "God", "Humans", "The universe"].map((answer) => (
                <div key={answer} className={`rounded-2xl border px-4 py-3 text-sm font-black ${answer === "God" ? "border-[#c59a4a] bg-[#fff1d4] text-[#102033]" : "border-[#eadcc2] bg-[#fffaf1] text-[#526174]"}`}>
                  {answer}
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm font-bold text-[#9a6a1f]">Correct. Genesis begins with God as Creator over everything.</p>
          </div>
        ) : null}

      </div>
    </div>
  );
}

function DayOnePreview({
  previewPanel,
  setPreviewPanel,
  studyTab,
  setStudyTab,
  onDeepNotesGift,
}: {
  previewPanel: PreviewPanel;
  setPreviewPanel: (panel: PreviewPanel) => void;
  studyTab: StudyTab;
  setStudyTab: (tab: StudyTab) => void;
  onDeepNotesGift: () => void;
}) {
  const completedCount = previewPanel === "watch" ? 0 : 1;
  return (
    <div className="bb-soft-card mx-auto w-full max-w-[780px] overflow-hidden rounded-[32px] p-3 sm:p-4">
      <div className="grid gap-3">
        <div className="grid gap-3 sm:grid-cols-[1.08fr_0.92fr]">
          <section className="rounded-[26px] border border-[#eadcc2] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a6a1f]">Bible in One Year Progress</p>
                <h2 className="mt-1 text-2xl font-black leading-tight">Day 1</h2>
                <p className="mt-1 text-sm font-bold text-[#526174]">The Creation of the World - Genesis 1-2</p>
              </div>
              <div className="rounded-2xl border border-[#eadcc2] bg-[#fffaf1] px-3 py-2 text-center">
                <p className="text-xl font-black">0%</p>
                <p className="text-[10px] font-black uppercase text-[#9a6a1f]">Bible studied</p>
              </div>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#efe4d2]">
              <div className="h-full w-[1%] rounded-full bg-[#c59a4a]" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ["0", "streak"],
                ["2", "chapters"],
                ["364", "days left"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-[#fffaf1] px-3 py-2 text-center">
                  <p className="text-lg font-black">{value}</p>
                  <p className="text-[10px] font-black uppercase text-[#6a7890]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[26px] border border-[#eadcc2] bg-[#fffaf1] p-4 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a6a1f]">Current Home</p>
            <div className="mt-3 flex gap-3">
              <img src="/Day1cover.png" alt="" className="h-28 w-20 rounded-2xl object-cover shadow-sm" />
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-black leading-tight">Day 1</h3>
                <p className="mt-1 text-sm font-black text-[#102033]">The Creation of the World</p>
                <p className="mt-1 text-sm font-bold text-[#6a7890]">Finish 3 simple steps to move forward.</p>
                <button
                  type="button"
                  onClick={() => setPreviewPanel("watch")}
                  className="mt-3 rounded-full bg-[#102033] px-4 py-2 text-xs font-black text-white"
                >
                  Open Day 1
                </button>
              </div>
            </div>
          </section>
        </div>

        <section className="overflow-hidden rounded-[28px] border border-[#eadcc2] bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-[#eadcc2] px-4 py-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a6a1f]">Journey Map</p>
              <h3 className="text-xl font-black">Bible Journey</h3>
            </div>
            <button type="button" onClick={onDeepNotesGift} className="text-sm font-black text-[#9a6a1f]">View Full Map</button>
          </div>
          <div className="overflow-x-auto px-4 py-4">
            <div className="flex min-w-[680px] items-start gap-4">
              {journeyStudies.map((study, index) => (
                <button
                  key={`${study.title}-${index}`}
                  type="button"
                  onClick={() => study.unlocked ? setPreviewPanel("watch") : onDeepNotesGift()}
                  className="relative w-24 shrink-0 text-center"
                >
                  {index > 0 ? <span className="absolute right-[72px] top-12 h-[2px] w-12 bg-[#eadcc2]" aria-hidden="true" /> : null}
                  <span className={`relative mx-auto block h-28 w-20 overflow-hidden rounded-2xl border bg-[#f7f1e8] p-1 shadow-sm ${
                    study.unlocked ? "border-[#c59a4a] ring-2 ring-[#c59a4a]/20" : "border-[#eadcc2] opacity-70 grayscale"
                  }`}>
                    <img src={study.cover} alt="" className="h-full w-full rounded-xl object-cover" />
                    {!study.unlocked ? <span className="absolute right-1 top-1 rounded-full bg-white/90 px-1.5 py-0.5 text-xs">🔒</span> : null}
                  </span>
                  <span className="mt-2 block text-xs font-black leading-tight">Day {study.day}</span>
                  <span className={`mt-0.5 block text-[10px] font-black ${study.unlocked ? "text-[#9a6a1f]" : "text-[#6a7890]"}`}>{study.status}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-[#eadcc2] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#d9c49e] bg-[#fff7e8] text-[#9a6a1f]">◎</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-[#102033]">Today's Study Progress</p>
                  <p className="text-sm font-black">{completedCount} of 3</p>
                </div>
                <p className="mt-1 text-sm font-bold text-[#58677a]">Complete all 3 steps to finish Day 1.</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#efe4d2]">
                  <div className="h-full rounded-full bg-[#c59a4a]" style={{ width: `${Math.max(8, completedCount * 33)}%` }} />
                </div>
              </div>
              <div className="rounded-2xl border border-[#eadcc2] bg-[#fffaf1] px-3 py-2 text-center text-sm font-black text-[#9a6a1f]">Day<br />1</div>
            </div>
          </div>
        </section>

        <div className="grid gap-3">
        {tasks.map((task) => (
          <button
            key={task.key}
            type="button"
            onClick={() => setPreviewPanel(task.key)}
            className={`rounded-[22px] border p-4 text-left transition ${
              previewPanel === task.key
                ? "border-[#c59a4a] bg-[#fff7e8] shadow-[0_12px_28px_rgba(197,154,74,0.16)]"
                : "border-[#eadcc2] bg-white hover:bg-[#fffaf1]"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#102033] text-sm font-black text-white">{task.tag.replace("Task ", "")}</div>
              <div className="min-w-0 flex-1">
                <p className="font-black leading-tight">{task.title}</p>
                <p className="mt-1 text-sm font-semibold leading-5 text-[#58677a]">{task.copy}</p>
              </div>
              <span className="text-xl font-black text-[#9a6a1f]">&gt;</span>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-[24px] border border-[#eadcc2] bg-white p-4 shadow-sm">
        {previewPanel === "watch" ? (
          <div>
            <div className="grid aspect-video place-items-center rounded-2xl bg-[#102033] text-white">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#c59a4a] pl-1 text-2xl">▶</div>
            </div>
            <h3 className="mt-3 text-lg font-black">Day 1 - The Creation of the World</h3>
            <p className="text-sm font-bold text-[#6a7890]">Genesis 1-2</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#58677a]">
              Learn how Genesis begins the story of creation, humanity, purpose, and God's design for the world.
            </p>
          </div>
        ) : null}

        {previewPanel === "study" ? (
          <div>
            <div className="rounded-2xl border border-[#eadcc2] bg-[#fffaf1] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a6a1f]">Day 1 Summary</p>
              <h3 className="mt-2 text-lg font-black">Genesis 1-2</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#24364a]">
                God brings order out of darkness, fills creation with life, and gives humanity value, dignity, and purpose.
              </p>
              <div className="mt-4 grid gap-2">
                {["Creation reveals God's intentional design.", "Humanity is created in God's image.", "Eden shows God's original design for life with Him."].map((line) => (
                  <p key={line} className="rounded-xl border border-[#eadcc2] bg-white px-3 py-2 text-sm font-bold text-[#24364a]">{line}</p>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {previewPanel === "trivia" ? (
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a6a1f]">Trivia preview</p>
            <h3 className="mt-2 text-lg font-black">Who created the heavens and the earth?</h3>
            <div className="mt-3 grid gap-2">
              {["Angels", "God", "Humans", "The universe"].map((answer) => (
                <div key={answer} className={`rounded-2xl border px-4 py-3 text-sm font-black ${answer === "God" ? "border-[#c59a4a] bg-[#fff1d4] text-[#102033]" : "border-[#eadcc2] bg-[#fffaf1] text-[#526174]"}`}>
                  {answer}
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm font-bold text-[#9a6a1f]">Correct. Genesis begins with God as Creator over everything.</p>
          </div>
        ) : null}

      </div>
      </div>
    </div>
  );
}

function DayOneGiftModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#102033]/60 px-4 backdrop-blur-sm">
      <div className="bb-soft-card max-w-md rounded-[28px] p-5">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9a6a1f]">Day 1 free gift</p>
        <h2 className="mt-2 text-2xl font-black leading-tight">You're getting the Day 1 Study Notes as a free gift.</h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-[#58677a]">
          Study Notes are normally part of Bible Buddy Plus and include deeper explanations, context, themes, and guided study tools for every chapter.
        </p>
        <p className="mt-3 text-sm font-semibold leading-6 text-[#58677a]">
          If you want to continue unlocking Study Notes after Genesis 2, you can upgrade anytime.
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Link href="/upgrade" className="rounded-2xl bg-[#102033] px-4 py-3 text-center text-sm font-black text-white">Upgrade to Plus</Link>
          <button type="button" onClick={onClose} className="rounded-2xl border border-[#d9c49e] bg-white px-4 py-3 text-sm font-black text-[#102033]">
            Continue Free
          </button>
        </div>
      </div>
    </div>
  );
}

function OnboardingIntroIcon({ name }: { name: string }) {
  if (name === "target") {
    return (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="m16 8 3-3M17 5h2v2" />
      </svg>
    );
  }
  if (name === "clock") {
    return (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }
  if (name === "growth") {
    return (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19V5M4 19h16" />
        <path d="m7 15 4-4 3 3 5-7" />
        <path d="M15 7h4v4" />
      </svg>
    );
  }
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.8 8.6c0 5.4-8.8 10.2-8.8 10.2S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z" />
    </svg>
  );
}

function OnboardingFlow(props: {
  step: OnboardingStep;
  onClose: (closedFrom: string) => void;
  onStart: () => void;
  onSkip: () => void;
  question: (typeof questions)[number] | undefined;
  questionIndex: number;
  progressPercent: number;
  selectedAnswer: string;
  chooseAnswer: (value: string) => void;
  continueQuestionnaire: () => void;
  openAccountFromRecommendation: (routeOverride?: StudyRoute) => void;
  startGuestJourney: (routeOverride?: StudyRoute) => Promise<void>;
  chooseDevotionalRoute: () => void;
  chooseBibleYearRoute: () => void;
  confirmDevotionalChoice: () => void;
  loadingMessage: string;
  answers: Answers;
  recommendationDays: number;
  recommendedStudyRoute: StudyRoute;
  selectedStudyRoute: StudyRoute;
  devotionalOptions: LandingDevotionalOption[];
  devotionalsLoading: boolean;
  selectedDevotionalId: string;
  setSelectedDevotionalId: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  accountAttempted: boolean;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  profileImage: string | null;
  handleProfileImage: (file: File | null) => void;
  submitting: boolean;
  error: string | null;
  handleSubmit: (event: FormEvent) => void;
  handleOAuthSignIn: () => void;
  enterDashboard: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const showFullNameError = props.accountAttempted && !props.firstName.trim();
  const introBenefits = [
    {
      icon: "target",
      title: "Know Where to Start",
      description: "No more guessing what to read next. We'll guide you step by step.",
    },
    {
      icon: "clock",
      title: "Understand What You Read",
      description: "Our video lessons help explain the passage before you move on.",
    },
    {
      icon: "growth",
      title: "Stay Consistent",
      description: "A simple daily plan helps you build a Bible study rhythm you can actually keep.",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto px-4 py-5 backdrop-blur-sm sm:px-6"
      style={{ backgroundColor: "rgba(255, 252, 246, 0.78)" }}
    >
      <div className="mx-auto flex min-h-full max-w-lg flex-col justify-center">
        <div
          className="relative rounded-[28px] border p-5 shadow-[0_24px_70px_rgba(14,26,58,0.14)] sm:p-6"
          style={{ backgroundColor: "#FFFCF6", borderColor: "#e7dccb" }}
        >
          <style>{`
            @keyframes bb-question-swipe-in {
              0% {
                opacity: 0;
                transform: translateX(34px);
              }
              100% {
                opacity: 1;
                transform: translateX(0);
              }
            }
            .bb-question-swipe {
              animation: bb-question-swipe-in 320ms cubic-bezier(0.22, 1, 0.36, 1);
            }
            @keyframes bb-loading-dot-one {
              0%, 24% { opacity: 1; }
              25%, 100% { opacity: 0.22; }
            }
            @keyframes bb-loading-dot-two {
              0%, 24% { opacity: 0.22; }
              25%, 49% { opacity: 1; }
              50%, 100% { opacity: 0.22; }
            }
            @keyframes bb-loading-dot-three {
              0%, 49% { opacity: 0.22; }
              50%, 100% { opacity: 1; }
            }
            .bb-loading-dot:nth-child(1) { animation: bb-loading-dot-one 1.35s ease-in-out infinite; }
            .bb-loading-dot:nth-child(2) { animation: bb-loading-dot-two 1.35s ease-in-out infinite; }
            .bb-loading-dot:nth-child(3) { animation: bb-loading-dot-three 1.35s ease-in-out infinite; }
            @keyframes bb-result-sparkle {
              0% {
                opacity: 0;
                transform: translateY(8px) scale(0.65);
              }
              18%,
              58% {
                opacity: 1;
              }
              100% {
                opacity: 0;
                transform: translateY(-18px) scale(1);
              }
            }
            .bb-result-sparkle {
              animation: bb-result-sparkle 2.8s ease-out forwards;
            }
            @keyframes bb-result-firework {
              0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.2);
              }
              12% {
                opacity: 1;
              }
              70% {
                opacity: 0.88;
              }
              100% {
                opacity: 0;
                transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1);
              }
            }
            .bb-result-firework {
              animation: bb-result-firework 980ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            @keyframes bb-green-start-glow {
              0%, 100% {
                box-shadow: 0 16px 34px rgba(22, 163, 74, 0.28), 0 0 0 0 rgba(34, 197, 94, 0.28);
              }
              50% {
                box-shadow: 0 18px 42px rgba(22, 163, 74, 0.42), 0 0 0 7px rgba(34, 197, 94, 0.12);
              }
            }
            .bb-green-start-button {
              background: linear-gradient(135deg, #16a34a 0%, #22c55e 54%, #0f8f3d 100%);
              color: #ffffff !important;
              animation: bb-green-start-glow 1.9s ease-in-out infinite;
            }
          `}</style>
          {props.step !== "loading" ? (
            <button
              type="button"
              onClick={() => props.onClose("x_button")}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[#eadcc2] bg-white text-sm font-black text-[#667085] transition hover:text-[#0E1A3A]"
              aria-label="Close onboarding"
            >
              x
            </button>
          ) : null}

          {props.step === "intro" ? (
            <div className="pb-1 pt-1">
              <div className="flex items-center justify-between gap-4 pr-10">
                <div className="flex items-center gap-2 text-[#0E1A3A]">
                  <svg className="h-7 w-7 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 8.5c4.8-1.7 7.8.2 11 2.7 3.2-2.5 6.2-4.4 11-2.7v17c-4.8-1.7-7.8.2-11 2.7-3.2-2.5-6.2-4.4-11-2.7v-17Z" />
                    <path d="M16 11.2v17" />
                  </svg>
                  <span className="text-base font-black">Bible Buddy</span>
                </div>
              </div>

              <div className="mt-7 text-center">
                <h2 className="bb-serif text-3xl font-black leading-tight text-[#0E1A3A]">Start Your Journey Today</h2>
                <div className="mx-auto mt-4 flex max-w-[210px] items-center justify-center gap-3 text-[#d89b43]">
                  <span className="h-px flex-1 bg-[#d89b43]/60" />
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.8 8.6c0 5.4-8.8 10.2-8.8 10.2S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z" />
                  </svg>
                  <span className="h-px flex-1 bg-[#d89b43]/60" />
                </div>
                <p className="mx-auto mt-4 max-w-sm text-sm font-semibold leading-6 text-[#0E1A3A]">
                  Can we ask you a few questions about your Bible study goals?
                </p>
              </div>

              <div className="mx-auto mt-6 grid max-w-md gap-3">
                {introBenefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-center gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#f3f4f6] text-[#0E1A3A]">
                      <OnboardingIntroIcon name={benefit.icon} />
                    </div>
                    <div>
                      <p className="text-sm font-black leading-tight text-[#0E1A3A]">{benefit.title}</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-[#4b5563]">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                <button
                  type="button"
                  onClick={props.onStart}
                  className="bb-modal-yes-shake relative w-full rounded-2xl px-5 py-4 text-center text-sm font-black shadow-[0_14px_28px_rgba(14,26,58,0.18)] transition"
                  style={{ backgroundColor: "#0E1A3A", color: "#ffffff" }}
                >
                  <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>Yes, let's get started!</span>
                  <svg className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#ffffff" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => props.onClose("intro_no_thanks")}
                  className="w-full rounded-2xl border px-5 py-4 text-sm font-black transition"
                  style={{ backgroundColor: "#f3f4f6", borderColor: "#d8d5cf", color: "#111827" }}
                >
                  No thanks, maybe later
                </button>
                <p className="flex items-center justify-center gap-2 text-xs font-semibold text-[#667085]">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                  Takes less than 3 minutes to complete.
                </p>
              </div>
            </div>
          ) : null}

          {props.step === "question" && props.question ? (
            <div key={props.questionIndex} className="bb-question-swipe pb-1 pt-1">
              <div className="flex items-center justify-between gap-4 pr-10">
                <div className="flex items-center gap-2 text-[#0E1A3A]">
                  <svg className="h-7 w-7 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 8.5c4.8-1.7 7.8.2 11 2.7 3.2-2.5 6.2-4.4 11-2.7v17c-4.8-1.7-7.8.2-11 2.7-3.2-2.5-6.2-4.4-11-2.7v-17Z" />
                    <path d="M16 11.2v17" />
                  </svg>
                  <span className="text-base font-black">Bible Buddy</span>
                </div>
              </div>

              <div className="mx-auto mt-6 flex max-w-[260px] items-center justify-center">
                {questions.map((_, dot) => (
                  <div key={dot} className="flex flex-1 items-center last:flex-none">
                    <span className={`h-3 w-3 rounded-full ${dot <= props.questionIndex ? "bg-[#0E1A3A]" : "bg-[#d8d5cf]"}`} />
                    {dot < questions.length - 1 ? <span className="h-px flex-1 bg-[#d8d5cf]" /> : null}
                  </div>
                ))}
              </div>

              <div className="mt-7 text-center">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#d89b43]">Question {props.questionIndex + 1} of {questions.length}</p>
                <h2 className="bb-serif mt-3 text-3xl font-black leading-tight text-[#0E1A3A]">{props.question.title}</h2>
              </div>

              <div className="mt-6 grid gap-3">
                {props.question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    data-selected={props.selectedAnswer === option}
                    onClick={() => props.chooseAnswer(option)}
                    className="bb-answer-card rounded-2xl border px-4 py-4 text-left text-sm font-black transition"
                    style={{
                      backgroundColor: props.selectedAnswer === option ? "#fff8ea" : "#ffffff",
                      borderColor: props.selectedAnswer === option ? "#d89b43" : "#eadcc2",
                      color: "#0E1A3A",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={props.continueQuestionnaire}
                disabled={!props.selectedAnswer}
                className="hidden"
                style={{ backgroundColor: "#0E1A3A", color: "#ffffff" }}
              >
                Continue
              </button>
            </div>
          ) : null}

          {props.step === "loading" ? (
            <div className="flex min-h-[320px] flex-col justify-center py-7 text-center">
              <h2 className="bb-serif text-3xl font-black leading-tight text-[#0E1A3A]">Building your Bible study plan...</h2>
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[#d89b43]" aria-hidden="true">
                <span className="bb-loading-dot h-2.5 w-2.5 rounded-full bg-current" />
                <span className="bb-loading-dot h-2.5 w-2.5 rounded-full bg-current" />
                <span className="bb-loading-dot h-2.5 w-2.5 rounded-full bg-current" />
              </div>
              <p className="mx-auto mt-5 max-w-sm text-sm font-semibold leading-6 text-[#667085]">One second, we&apos;re using your goals, experience, and available time to recommend the best starting path for you.</p>
              <p className="mx-auto mt-5 min-h-[6rem] max-w-sm text-sm italic leading-6 text-[#536173] sm:min-h-[4.5rem]">
                {props.loadingMessage}
              </p>
            </div>
          ) : null}

          {props.step === "recommendation" ? (
            <div className="relative overflow-hidden pb-1 pt-1">
              <span className="bb-result-sparkle pointer-events-none absolute left-8 top-3 text-lg text-[#d89b43]" aria-hidden="true">*</span>
              <span className="bb-result-sparkle pointer-events-none absolute right-12 top-16 text-sm text-[#d89b43]" style={{ animationDelay: "0.18s" }} aria-hidden="true">*</span>
              <span className="bb-result-sparkle pointer-events-none absolute left-16 top-28 text-xs text-[#d89b43]" style={{ animationDelay: "0.34s" }} aria-hidden="true">*</span>
              {[
                ["18%", "15%", "-44px", "-34px", "#facc15"],
                ["27%", "10%", "28px", "-42px", "#22c55e"],
                ["79%", "17%", "40px", "-30px", "#60a5fa"],
                ["69%", "9%", "-26px", "-38px", "#f472b6"],
                ["50%", "7%", "0px", "-50px", "#d89b43"],
                ["84%", "30%", "34px", "22px", "#22c55e"],
                ["14%", "31%", "-34px", "24px", "#60a5fa"],
                ["54%", "21%", "44px", "18px", "#facc15"],
              ].map(([left, top, x, y, color], index) => (
                <span
                  key={`${left}-${top}-${index}`}
                  className="bb-result-firework pointer-events-none absolute h-2 w-2 rounded-full"
                  style={{
                    left,
                    top,
                    backgroundColor: color,
                    ["--x" as string]: x,
                    ["--y" as string]: y,
                    animationDelay: `${index * 52}ms`,
                  }}
                  aria-hidden="true"
                />
              ))}

              <p className="text-center text-xs font-black uppercase tracking-[0.16em] text-[#d89b43]">Recommended path</p>
              <h2 className="bb-serif mx-auto mt-3 max-w-sm text-center text-3xl font-black leading-tight text-[#0E1A3A]">
                Your Bible in One Year journey is ready.
              </h2>
              <div className="mt-6 rounded-[24px] border p-5 text-center" style={{ backgroundColor: "#fffaf1", borderColor: "#eadcc2" }}>
                <p className="text-xl font-black leading-8 text-[#0E1A3A]">
                  If you spend {props.answers.time || "30 minutes"} a day
                  <br />
                  with Bible Buddy,
                </p>
                <p className="mt-4 text-2xl font-black leading-8 text-[#d89b43]">
                  you could read the whole Bible
                  <br />
                  in about {props.recommendationDays} days.
                </p>
              </div>

              <p className="mt-6 text-center text-base font-black text-[#0E1A3A]">
                Ready to start your journey?
              </p>
              <div className="mt-4 grid gap-3">
                <button type="button" onClick={() => void props.startGuestJourney("bible_year")} disabled={props.submitting} className="bb-green-start-button rounded-2xl px-4 py-4 text-sm font-black transition hover:-translate-y-0.5 disabled:opacity-60">{props.submitting ? "Starting..." : "Yes, start my journey"}</button>
                <button type="button" onClick={() => props.onClose("recommendation_not_right_now")} className="rounded-2xl border px-4 py-4 text-sm font-black" style={{ backgroundColor: "#f3f4f6", borderColor: "#d8d5cf", color: "#111827" }}>Not right now</button>
              </div>
            </div>
          ) : null}

          {props.step === "devotionalPicker" ? (
            <div className="pb-1 pt-1">
              <p className="text-center text-xs font-black uppercase tracking-[0.16em] text-[#d89b43]">Focused devotional route</p>
              <h2 className="bb-serif mx-auto mt-3 max-w-sm text-center text-3xl font-black leading-tight text-[#0E1A3A]">Pick your devotional.</h2>
              <p className="mx-auto mt-3 max-w-sm text-center text-sm font-semibold leading-6 text-[#667085]">
                Choose the focused study you want on your dashboard first. You can still switch to Bible in One Year later.
              </p>
              <div className="mt-5 grid max-h-[360px] gap-3 overflow-y-auto pr-1">
                {props.devotionalsLoading ? (
                  <div className="rounded-2xl border px-4 py-5 text-center text-sm font-bold text-[#667085]" style={{ backgroundColor: "#ffffff", borderColor: "#eadcc2" }}>
                    Loading devotionals...
                  </div>
                ) : props.devotionalOptions.length === 0 ? (
                  <div className="rounded-2xl border px-4 py-5 text-center text-sm font-bold text-[#667085]" style={{ backgroundColor: "#ffffff", borderColor: "#eadcc2" }}>
                    Devotionals are loading slowly. You can still continue with Bible in One Year.
                  </div>
                ) : (
                  props.devotionalOptions.map((devotional) => (
                    <button
                      key={devotional.id}
                      type="button"
                      onClick={() => props.setSelectedDevotionalId(devotional.id)}
                      className="rounded-2xl border px-4 py-4 text-left transition"
                      style={{
                        backgroundColor: props.selectedDevotionalId === devotional.id ? "#fff8ea" : "#ffffff",
                        borderColor: props.selectedDevotionalId === devotional.id ? "#d89b43" : "#eadcc2",
                        color: "#0E1A3A",
                      }}
                    >
                      <span className="block text-sm font-black">{devotional.title}</span>
                      <span className="mt-1 block text-xs font-semibold leading-5 text-[#667085]">
                        {devotional.total_days ? `${devotional.total_days} day focused study` : "Focused Bible study"}
                      </span>
                    </button>
                  ))
                )}
              </div>
              <div className="mt-5 grid gap-3">
                <button
                  type="button"
                  onClick={props.confirmDevotionalChoice}
                  disabled={!props.selectedDevotionalId || props.submitting}
                  className="rounded-2xl px-4 py-4 text-sm font-black disabled:opacity-50"
                  style={{ backgroundColor: "#0E1A3A", color: "#ffffff" }}
                >
                  {props.submitting ? "Starting..." : "Continue with this devotional"}
                </button>
                <button type="button" onClick={props.chooseBibleYearRoute} className="rounded-2xl border px-4 py-4 text-sm font-black" style={{ backgroundColor: "#f3f4f6", borderColor: "#d8d5cf", color: "#111827" }}>
                  Choose Bible in One Year instead
                </button>
              </div>
            </div>
          ) : null}

          {props.step === "account" ? (
            <div className="pb-1 pt-1">
              <p className="text-center text-xs font-black uppercase tracking-[0.16em] text-[#d89b43]">Create Your Free Account</p>
              <h2 className="bb-serif mx-auto mt-3 max-w-sm text-center text-3xl font-black leading-tight text-[#0E1A3A]">Create your free account.</h2>
              <p className="mx-auto mt-3 max-w-sm text-center text-sm font-semibold leading-6 text-[#667085]">
                Save your Bible study plan and keep your progress as you continue your journey.
              </p>
              <button type="button" onClick={props.handleOAuthSignIn} disabled={props.submitting} className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl border px-4 py-3 text-sm font-black transition hover:bg-[#fafafa] disabled:opacity-60" style={{ backgroundColor: "#ffffff", borderColor: "#d9c49e", color: "#0E1A3A" }}>
                <GoogleLogo />
                <span>Sign up with Google</span>
              </button>
              <div className="my-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.16em] text-[#9aa4b2]">
                <span className="h-px flex-1 bg-[#eadcc2]" /> or <span className="h-px flex-1 bg-[#eadcc2]" />
              </div>
              <form onSubmit={props.handleSubmit} className="grid gap-3">
                <div>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]"><FieldIcon name="email" /></span>
                    <input value={props.email} onChange={(event) => props.setEmail(event.target.value)} required type="email" placeholder="Email address" className="w-full rounded-2xl border py-3 pl-11 pr-4 text-sm font-bold outline-none focus:border-[#c59a4a]" style={{ backgroundColor: "#ffffff", borderColor: "#d9c49e", color: "#0E1A3A" }} />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]"><FieldIcon name="user" /></span>
                    <input value={props.firstName} onChange={(event) => props.setFirstName(event.target.value)} required placeholder="Full name (first and last)" className="w-full rounded-2xl border py-3 pl-11 pr-4 text-sm font-bold outline-none focus:border-[#c59a4a]" style={{ backgroundColor: "#ffffff", borderColor: showFullNameError ? "#dc2626" : "#d9c49e", color: "#0E1A3A" }} />
                  </div>
                  {showFullNameError ? <p className="mt-1.5 text-xs font-bold text-red-600">Please enter your full name.</p> : null}
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]"><FieldIcon name="lock" /></span>
                  <input value={props.password} onChange={(event) => props.setPassword(event.target.value)} required minLength={6} type={showPassword ? "text" : "password"} placeholder="Password" className="w-full rounded-2xl border py-3 pl-11 pr-12 text-sm font-bold outline-none focus:border-[#c59a4a]" style={{ backgroundColor: "#ffffff", borderColor: "#d9c49e", color: "#0E1A3A" }} />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]" aria-label={showPassword ? "Hide password" : "Show password"}>
                    <FieldIcon name="eye" />
                  </button>
                </div>
                <label className="rounded-2xl border border-dashed px-4 py-3 text-sm font-bold text-[#58677a]" style={{ backgroundColor: "#ffffff", borderColor: "#d9c49e" }}>
                  <span className="block text-sm font-black text-[#667085]">Optional profile picture</span>
                  <span className="mt-2 flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-black text-[#0E1A3A]" style={{ backgroundColor: "#f8f3e9", borderColor: "#eadcc2" }}>
                      <FieldIcon name="upload" />
                      Choose file
                    </span>
                    <span className="text-xs font-bold text-[#667085]">{props.profileImage ? "File selected" : "No file chosen"}</span>
                  </span>
                  <input type="file" accept="image/*" onChange={(event) => props.handleProfileImage(event.target.files?.[0] || null)} className="sr-only" />
                </label>
                {props.profileImage ? <img src={props.profileImage} alt="" className="h-16 w-16 rounded-full object-cover" /> : null}
                {props.error ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{props.error}</p> : null}
                <p className="flex items-center gap-2 text-xs font-bold text-[#667085]">
                  <FieldIcon name="lock" />
                  <span>We&apos;ll never share your info. See our <Link href="/privacy" className="font-black text-[#0E1A3A] underline decoration-[#d89b43]/50 underline-offset-2">Privacy Policy</Link>.</span>
                </p>
                <button type="submit" disabled={props.submitting} className="rounded-2xl px-5 py-4 text-sm font-black disabled:opacity-60" style={{ backgroundColor: "#0E1A3A", color: "#ffffff" }}>
                  {props.submitting ? "Creating account..." : "Create Free Account"}
                </button>
              </form>
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
}
