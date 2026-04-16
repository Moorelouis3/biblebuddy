// components/ChatLouis.tsx
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LouisAvatar } from "./LouisAvatar";
import { supabase } from "../lib/supabaseClient";
import { FeatureTourModal } from "./FeatureTourModal";
import { buildPersistedFeatureTours, DEFAULT_FEATURE_TOURS, normalizeFeatureTours } from "../lib/featureTours";
import { useFeatureRenderPriority } from "./FeatureRenderPriorityContext";
import { getDailyRecommendation, type DailyRecommendation } from "../lib/dailyRecommendation";
import { buildLouisGuideChatMessage, getLouisPageGuide } from "../lib/louisGuidance";
import { getVerseIntro, getVerseOfTheDay } from "../lib/verseOfTheDay";
import { LOUIS_MOMENT_EVENT, type LouisMomentDetail, type LouisMomentReply } from "../lib/louisMoments";

type MessageRole = "user" | "assistant";

type Message = {
  role: MessageRole;
  content: string;
};

type QuickReplyAction =
  | "daily_good"
  | "daily_okay"
  | "daily_bad"
  | "daily_yes"
  | "daily_no"
  | "daily_verse"
  | "daily_recommendation"
  | "daily_continue"
  | "daily_talk"
  | "daily_intro_help"
  | "daily_intro_later"
  | "guide_show"
  | "guide_later"
  | "guide_question"
  | "daily_try_missing"
  | "open_devotionals"
  | "moment_navigate"
  | "moment_message"
  | "recommendation_open"
  | "recommendation_question"
  | "recommendation_later";

type QuickReply = {
  id: string;
  label: string;
  action: QuickReplyAction;
  href?: string;
  message?: string;
};

type LouisLastActionSummary = {
  summary: string;
  followUp: string;
  continueLabel: string | null;
  continueHref: string | null;
};

type LouisHabitNudge = {
  summary: string;
  label: string;
  href: string;
};

// Type for SpeechRecognition (Web Speech API)
interface SpeechRecognitionResult {
  [key: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  [key: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

function getRecommendationSeenKey(userId: string) {
  const today = new Date().toISOString().slice(0, 10);
  return `bb:louis:recommendation:${userId}:${today}`;
}

function getDailyGreetingSeenKey(userId: string) {
  const today = new Date().toISOString().slice(0, 10);
  return `bb:louis:greeting:${userId}:${today}`;
}

function getChatStorageKey(userId: string) {
  return `bb:louis:chat:${userId}`;
}

function getMemoryStorageKey(userId: string) {
  return `bb:louis:memory:${userId}`;
}

function getGuidePromptKey(userId: string, guideId: string) {
  return `bb:louis:guide-prompt:${userId}:${guideId}`;
}

function getGoalStorageKey() {
  return "bb_onboarding_goal";
}

function hasSeenGuidePrompt(userId: string, guideId: string) {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getGuidePromptKey(userId, guideId)) === "1";
}

function hasSeenRecommendation(userId: string) {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getRecommendationSeenKey(userId)) === "1";
}

function rememberRecommendationSeen(userId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getRecommendationSeenKey(userId), "1");
}

function hasSeenDailyGreeting(userId: string) {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getDailyGreetingSeenKey(userId)) === "1";
}

function rememberDailyGreetingSeen(userId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getDailyGreetingSeenKey(userId), "1");
}

function getTimeOfDayGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getStreakCelebrationLine(currentStreak: number) {
  if (currentStreak <= 0) {
    return "This is a fresh start, and that's fine. Just do one real thing with God today and let that be enough.";
  }

  if (currentStreak === 1) {
    return "You're on day 1 right now. Once you hit 30 days, you earn the fire and your habit really starts to feel real.";
  }

  if (currentStreak === 2) {
    return "This is your second day in a row. That's how a habit starts getting real.";
  }

  if (currentStreak === 3) {
    return "You're on day 3 now. That's real momentum, not just a random check-in.";
  }

  if (currentStreak === 4) {
    return "Four days in a row is big. Most people talk about consistency, but this is what consistency actually looks like.";
  }

  if (currentStreak === 5) {
    return "Five straight days is strong. You're not just visiting Bible Buddy now. You're building something.";
  }

  if (currentStreak === 6) {
    return "Six days in a row is serious. You're close to a full week of showing up for your walk with God.";
  }

  if (currentStreak === 7) {
    return "A full week in a row is strong. That's how Bible study starts becoming part of your real life.";
  }

  if (currentStreak < 30) {
    return `You're on day ${currentStreak}. Keep stacking days like this and the fire is coming.`;
  }

  return `You're on day ${currentStreak}, and you've already earned the fire. Now it's about protecting the habit and growing deeper.`;
}

function buildHabitNudgeFromCards(openedCards: string[]): LouisHabitNudge | null {
  const seen = new Set(openedCards);

  if (!seen.has("Bible Study Group")) {
    return {
      summary:
        "I've noticed you haven't tried the Bible Study Group yet. You do not have to study alone in here.",
      label: "Try the group",
      href: "/study-groups",
    };
  }

  if (!seen.has("Bible Study Games")) {
    return {
      summary:
        "You've been showing up, but you still haven't tried Bible Study Games. That's one of the easiest ways to lock in what you're learning.",
      label: "Try Bible Study Games",
      href: "/bible-study-games",
    };
  }

  if (!seen.has("Bible Buddy TV")) {
    return {
      summary:
        "You still haven't tried Bible Buddy TV. If you want something easier to ease into today, that could be a good move.",
      label: "Try Bible Buddy TV",
      href: "/biblebuddy-tv",
    };
  }

  if (!seen.has("Bible Study Tools")) {
    return {
      summary:
        "You haven't opened the study tools yet. That's where devotionals, reading plans, and the deeper study side of Bible Buddy really opens up.",
      label: "Open study tools",
      href: "/guided-studies",
    };
  }

  return null;
}

function renderLouisGuideContent(_guide?: unknown) {
  return null;
}

function getEncodedBibleHref(book: string, chapter: number) {
  return `/Bible/${encodeURIComponent(book)}/${chapter}`;
}

function summarizeLastMasterAction(action: {
  action_type?: string | null;
  action_label?: string | null;
} | null): LouisLastActionSummary | null {
  if (!action?.action_type) return null;

  const label = action.action_label?.trim();

  if (action.action_type === "chapter_completed" || action.action_type === "reading_plan_chapter_completed") {
    const match = label?.match(/^(.+?)\s+(\d+)$/);
    if (match) {
      const book = match[1];
      const chapter = Number.parseInt(match[2], 10);
      if (!Number.isNaN(chapter)) {
        const nextChapter = chapter + 1;
        return {
          summary: `Last time you were in ${book} ${chapter}.`,
          followUp: `Do you want to continue with ${book} ${nextChapter}?`,
          continueLabel: `Continue ${book} ${nextChapter}`,
          continueHref: getEncodedBibleHref(book, nextChapter),
        };
      }
    }
  }

  if (action.action_type === "devotional_day_completed" && label) {
    return {
      summary: `Last time you were in ${label}.`,
      followUp: "Do you want to keep going with that devotional?",
      continueLabel: "Open devotionals",
      continueHref: "/devotionals",
    };
  }

  if (
    action.action_type === "bible_buddy_tv_video_started" ||
    action.action_type === "bible_buddy_tv_title_opened"
  ) {
    return {
      summary: label ? `Last time you were watching ${label}.` : "Last time you were in Bible Buddy TV.",
      followUp: "Do you want to pick that back up?",
      continueLabel: "Open Bible Buddy TV",
      continueHref: "/biblebuddy-tv",
    };
  }

  if (action.action_type === "trivia_question_answered") {
    return {
      summary: label ? `Last time you were working through ${label}.` : "Last time you were in Bible Trivia.",
      followUp: "Do you want to jump back into Bible Trivia?",
      continueLabel: "Open Bible Trivia",
      continueHref: "/bible-trivia",
    };
  }

  if (action.action_type === "scrambled_word_answered" || action.action_type === "scrambled_chapter_completed") {
    return {
      summary: label ? `Last time you were playing ${label}.` : "Last time you were in Scrambled.",
      followUp: "Do you want to go back there?",
      continueLabel: "Open Bible Study Games",
      continueHref: "/bible-study-games",
    };
  }

  if (action.action_type === "dashboard_card_opened" && label) {
    const href =
      label === "The Bible"
        ? "/reading"
        : label === "Bible Study Group"
          ? "/study-groups"
          : label === "Bible Study Tools"
            ? "/guided-studies"
            : label === "Bible Buddy TV"
              ? "/biblebuddy-tv"
              : label === "Bible Study Games"
                ? "/bible-study-games"
                : null;

    return {
      summary: `Last time you opened ${label}.`,
      followUp: "Do you want to go back there today?",
      continueLabel: href ? `Open ${label}` : null,
      continueHref: href,
    };
  }

  if (label) {
    return {
      summary: `Last time you were in ${label}.`,
      followUp: "Do you want to pick that back up?",
      continueLabel: null,
      continueHref: null,
    };
  }

  return null;
}

export function ChatLouis() {
  const { featureToursEnabled } = useFeatureRenderPriority();
  const pathname = usePathname();
  const router = useRouter();
  const currentPageGuide = useMemo(() => getLouisPageGuide(pathname), [pathname]);
  const todayVerse = useMemo(() => getVerseOfTheDay(), []);
  const todayVerseIntro = useMemo(() => getVerseIntro(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [louisUserId, setLouisUserId] = useState<string | null>(null);
  const [louisFeatureTours, setLouisFeatureTours] = useState({ ...DEFAULT_FEATURE_TOURS });
  const [louisRecommendation, setLouisRecommendation] = useState<DailyRecommendation | null>(null);
  const [hasUnseenRecommendation, setHasUnseenRecommendation] = useState(false);
  const [hasUnseenDailyGreeting, setHasUnseenDailyGreeting] = useState(false);
  const [lastMasterActionSummary, setLastMasterActionSummary] = useState<LouisLastActionSummary | null>(null);
  const [habitNudge, setHabitNudge] = useState<LouisHabitNudge | null>(null);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [onboardingGoal, setOnboardingGoal] = useState<string | null>(null);
  const [userProfileImageUrl, setUserProfileImageUrl] = useState<string | null>(null);
  const [hasLouisHistory, setHasLouisHistory] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [viewportSize, setViewportSize] = useState({ width: 1280, height: 800 });
  
  // Dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const showLouisGuideModal = false;
  const louisGuideView: "intro" | "tour" | "recommendation" = "intro";
  const showChatTourModal = false;
  const isSavingChatTour = false;
  const setLouisGuideView = (_value: "intro" | "tour" | "recommendation") => {};
  const setShowChatTourModal = (_value: boolean) => {};
  const userInitial = useMemo(() => {
    const lastUserMessage = [...messages].reverse().find((message) => message.role === "user")?.content?.trim();
    if (lastUserMessage) return lastUserMessage.charAt(0).toUpperCase();
    const trimmed = input.trim();
    if (trimmed) return trimmed.charAt(0).toUpperCase();
    return "Y";
  }, [input, messages]);

  // Format voice text with paragraph breaks
  function formatVoiceText(text: string, prevText: string): string {
    // Clean up the text
    let formatted = text.trim();
    
    // Add double line break after periods, exclamation marks, or question marks
    // This creates natural paragraph breaks
    formatted = formatted.replace(/([.!?])\s+/g, "$1\n\n");
    
    // Combine with previous text
    if (prevText.trim()) {
      // Add a space if previous text doesn't end with newline
      const separator = prevText.trimEnd().endsWith("\n") ? "" : " ";
      return prevText + separator + formatted;
    }
    
    return formatted;
  }

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncViewport = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Browser doesn't support speech recognition - silently fail
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep listening until stopped
    recognition.interimResults = true; // Show interim results as user speaks
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let fullTranscript = "";
      
      // With continuous=true, collect ALL results from the beginning
      // The results array contains all results accumulated so far
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        fullTranscript += transcript;
      }
      
      // Update input with all accumulated text
      if (fullTranscript.trim()) {
        setInput(() => {
          // Format the full accumulated transcript
          return formatVoiceText(fullTranscript.trim(), "");
        });
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // Handle errors silently
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      // With continuous=true, onend fires when recognition stops
      // Only stop if user explicitly stopped (not if recognition ended automatically)
      if (isListening) {
        // Restart if still listening (handles automatic stops in continuous mode)
        try {
          recognition.start();
        } catch (err) {
          // Silently handle restart errors (might already be starting)
          setIsListening(false);
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  // Initialize audio visualization
  useEffect(() => {
    if (typeof window === "undefined") return;

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      // AudioContext not available - silently fail
      return;
    }

    return () => {
      // Cleanup on unmount
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      analyserRef.current = null;
    };
  }, []);

  // Handle audio visualization
  useEffect(() => {
    if (!isListening) {
      // Stop visualization
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setAudioLevels([]);
      return;
    }

    // Start audio visualization
    async function startVisualization() {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 32; // Small for performance
        analyserRef.current = analyser;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        // Animation loop
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        function animate() {
          if (!analyserRef.current || !isListening) {
            return;
          }

          analyserRef.current.getByteFrequencyData(dataArray);
          
          // Extract 5 bars from the frequency data
          const barCount = 5;
          const step = Math.floor(dataArray.length / barCount);
          const levels: number[] = [];
          
          for (let i = 0; i < barCount; i++) {
            const index = i * step;
            levels.push(dataArray[index] / 255); // Normalize to 0-1
          }
          
          setAudioLevels(levels);
          animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();
      } catch (err) {
        // Silently fail if audio access denied or unavailable
        console.error("Audio visualization error:", err);
      }
    }

    startVisualization();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setAudioLevels([]);
    };
  }, [isListening]);

  // Handle listening state changes
  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        // Already started or other error - silently handle
        setIsListening(false);
      }
    } else {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  // Clean up when chat closes
  useEffect(() => {
    if (!isOpen && isListening) {
      setIsListening(false);
    }
  }, [isOpen, isListening]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  useEffect(() => {
    if (!louisUserId || typeof window === "undefined") return;
    window.localStorage.setItem(getChatStorageKey(louisUserId), JSON.stringify(messages.slice(-40)));

    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
    if (!latestUserMessage) return;

    window.localStorage.setItem(
      getMemoryStorageKey(louisUserId),
      JSON.stringify({
        lastUserMessage: latestUserMessage.content,
        lastUserAt: new Date().toISOString(),
      }),
    );
  }, [messages, louisUserId]);

  useEffect(() => {
    let cancelled = false;

    async function loadLouisContext() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        setLouisUserId(null);
        setLouisFeatureTours({ ...DEFAULT_FEATURE_TOURS });
        setLouisRecommendation(null);
        setLastMasterActionSummary(null);
        setHabitNudge(null);
        setCurrentStreak(0);
        setOnboardingGoal(null);
        setUserProfileImageUrl(null);
        setHasUnseenRecommendation(false);
        return;
      }

      setLouisUserId(user.id);

      if (typeof window !== "undefined") {
        try {
          const storedMessages = window.localStorage.getItem(getChatStorageKey(user.id));
          const parsedMessages = storedMessages ? (JSON.parse(storedMessages) as Message[]) : [];
          setMessages(parsedMessages);
          setHasLouisHistory(parsedMessages.length > 0);
        } catch {
          setMessages([]);
          setHasLouisHistory(false);
        }

        setOnboardingGoal(window.localStorage.getItem(getGoalStorageKey()));
      }

      const { data: profileStats, error: profileError } = await supabase
        .from("profile_stats")
        .select("feature_tours, level_1_skipped_date, current_streak, profile_image_url")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (profileError) {
        console.error("[LOUIS] Error loading profile context:", profileError);
        setLouisFeatureTours({ ...DEFAULT_FEATURE_TOURS });
        setCurrentStreak(0);
        setUserProfileImageUrl(null);
      } else {
        setLouisFeatureTours(normalizeFeatureTours(profileStats?.feature_tours));
        setCurrentStreak(profileStats?.current_streak ?? 0);
        setUserProfileImageUrl(profileStats?.profile_image_url ?? null);
      }

      const shouldLoadRecommendation = pathname === "/dashboard";
      if (!shouldLoadRecommendation) {
        setLouisRecommendation(null);
        setLastMasterActionSummary(null);
        setHabitNudge(null);
        setHasUnseenRecommendation(false);
        setHasUnseenDailyGreeting(false);
        return;
      }

      const { data: actionRows } = await supabase
        .from("master_actions")
        .select("action_type, action_label, created_at")
        .eq("user_id", user.id)
        .not("action_type", "in", '("user_login","dashboard_viewed","bible_buddy_tv_viewed","bible_buddy_tv_title_opened")')
        .order("created_at", { ascending: false })
        .limit(8);

      if (!cancelled) {
        const lastMeaningfulAction =
          actionRows?.find((row) => Boolean(row?.action_type && row?.action_label)) ??
          actionRows?.[0] ??
          null;
        setLastMasterActionSummary(summarizeLastMasterAction(lastMeaningfulAction));
      }

      const { data: dashboardCardRows } = await supabase
        .from("master_actions")
        .select("action_label")
        .eq("user_id", user.id)
        .eq("action_type", "dashboard_card_opened")
        .limit(50);

      if (!cancelled) {
        const openedCards = (dashboardCardRows ?? [])
          .map((row) => row.action_label)
          .filter((label): label is string => typeof label === "string" && label.length > 0);
        setHabitNudge(buildHabitNudgeFromCards(openedCards));
      }

      let suppressLevel1 = false;
      if (profileStats?.level_1_skipped_date) {
        const skippedDate = new Date(profileStats.level_1_skipped_date);
        const diffDays = Math.floor((Date.now() - skippedDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 3) suppressLevel1 = true;
      }

      const recommendation = await getDailyRecommendation(user.id, suppressLevel1);
      if (cancelled) return;

      setLouisRecommendation(recommendation);
      setHasUnseenRecommendation(Boolean(recommendation) && !hasSeenRecommendation(user.id));
      setHasUnseenDailyGreeting(!hasSeenDailyGreeting(user.id));
    }

    void loadLouisContext();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const hasPendingPageGuide = Boolean(
    featureToursEnabled &&
      currentPageGuide &&
      louisFeatureTours[currentPageGuide.featureKey] !== true &&
      (!louisUserId || !hasSeenGuidePrompt(louisUserId, currentPageGuide.id)),
  );

  const hasPendingLouisMoment =
    hasPendingPageGuide ||
    (pathname === "/dashboard" && (hasUnseenDailyGreeting || (hasUnseenRecommendation && Boolean(louisRecommendation))));

  const emptyStatePrompt = currentPageGuide
    ? currentPageGuide.id === "dashboard"
      ? "Ask me anything about the dashboard."
      : currentPageGuide.id === "bible_buddy_tv"
        ? "Ask me anything about Bible Buddy TV."
        : currentPageGuide.id === "bible_trivia"
          ? "Ask me anything about Bible trivia."
          : "Ask me anything about reading the Bible here."
    : "Ask me a question about your Bible reading.";

  function appendAssistantMessage(content: string) {
    setMessages((prev) => [...prev, { role: "assistant", content }]);
  }

  function appendUserMessage(content: string) {
    setMessages((prev) => [...prev, { role: "user", content }]);
  }

  function toggleListening() {
    setIsListening((prev) => !prev);
  }

  async function markCurrentGuideSeen() {
    if (!louisUserId || !currentPageGuide) return;

    const mergedFeatureTours = {
      ...louisFeatureTours,
      [currentPageGuide.featureKey]: true,
    };

    const { error: updateError } = await supabase
      .from("profile_stats")
      .update({
        feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
      })
      .eq("user_id", louisUserId);

    if (updateError) {
      const { error: upsertError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: louisUserId,
            feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
          },
          { onConflict: "user_id" },
        );

      if (upsertError) {
        console.error("[LOUIS] Error saving page guide state:", upsertError);
        return;
      }
    }

    setLouisFeatureTours(mergedFeatureTours);
  }

  async function markChatWidgetSeen() {
    if (!louisUserId) return;

    const mergedFeatureTours = {
      ...louisFeatureTours,
      chat_widget: true,
    };

    const { error: updateError } = await supabase
      .from("profile_stats")
      .update({
        feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
      })
      .eq("user_id", louisUserId);

    if (updateError) {
      const { error: upsertError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: louisUserId,
            feature_tours: buildPersistedFeatureTours(mergedFeatureTours),
          },
          { onConflict: "user_id" },
        );

      if (upsertError) {
        console.error("[LOUIS] Error saving chat widget state:", upsertError);
        return;
      }
    }

    setLouisFeatureTours(mergedFeatureTours);
  }

  function markRecommendationSeenLocal() {
    if (!louisUserId) return;
    rememberRecommendationSeen(louisUserId);
    setHasUnseenRecommendation(false);
  }

  function markDailyGreetingSeenLocal() {
    if (!louisUserId) return;
    rememberDailyGreetingSeen(louisUserId);
    setHasUnseenDailyGreeting(false);
  }

  function rememberGuidePromptShown() {
    if (!louisUserId || !currentPageGuide || typeof window === "undefined") return;
    window.localStorage.setItem(getGuidePromptKey(louisUserId, currentPageGuide.id), "1");
  }

  function seedQuickReplies(nextReplies: QuickReply[]) {
    setQuickReplies(nextReplies);
  }

  function getDailyQuickReplies(): QuickReply[] {
    return [
      { id: "daily-good", label: "Good", action: "daily_good" },
      { id: "daily-okay", label: "Okay", action: "daily_okay" },
      { id: "daily-bad", label: "Not great", action: "daily_bad" },
    ];
  }

  function getGuideQuickReplies(): QuickReply[] {
    return [
      { id: "guide-show", label: "Yes, show me", action: "guide_show" },
      { id: "guide-question", label: "I have a question", action: "guide_question" },
      { id: "guide-later", label: "Not right now", action: "guide_later" },
    ];
  }

  function buildDailyConversationMessage() {
    const streakIntro =
      currentStreak > 0
        ? `${getTimeOfDayGreeting()}. Welcome back.\n\nYou're on day ${currentStreak} right now.`
        : `${getTimeOfDayGreeting()}.\n\nThis is a good day to start something real.`;

    let message = hasLouisHistory
      ? `${streakIntro}\n\n${getStreakCelebrationLine(currentStreak)}\n\nHow are you doing today?`
      : `${streakIntro}\n\nI'm Louis.\n\nYou can talk to me like a regular person in here.\n\nIf I ask you something, just type back or use the voice button.\n\n${getStreakCelebrationLine(currentStreak)}\n\nHow are you doing today?`;

    if (!hasLouisHistory && pathname === "/dashboard") {
      message += onboardingGoal
        ? `\n\nYou told us you want to ${onboardingGoal.toLowerCase()}.\n\nLet's build that together one day at a time.`
        : "\n\nSince this is your first time here, let's build your Bible study habit together one day at a time.";
    }

    if (louisUserId && typeof window !== "undefined") {
      const rawMemory = window.localStorage.getItem(getMemoryStorageKey(louisUserId));
      if (rawMemory) {
        try {
          const parsed = JSON.parse(rawMemory) as { lastUserMessage?: string; lastUserAt?: string };
          if (parsed.lastUserMessage && parsed.lastUserAt) {
            const diffHours = (Date.now() - new Date(parsed.lastUserAt).getTime()) / 3600000;
            if (diffHours >= 12) {
              message += `\n\nLast time you mentioned "${parsed.lastUserMessage.slice(0, 90)}${parsed.lastUserMessage.length > 90 ? "..." : ""}".\n\nHow did that go?`;
            }
          }
        } catch {
          // no-op
        }
      }
    }

    if (hasPendingPageGuide && currentPageGuide?.id === "dashboard") {
      message += hasLouisHistory
        ? "\n\nAnd if you want, I can show you around the dashboard too."
        : "\n\nYou're on the dashboard right now, and I can walk you through it when you're ready.";
    }

    return message;
  }

  async function beginDailyConversation() {
    if (hasUnseenDailyGreeting) {
      markDailyGreetingSeenLocal();
    }
    if (hasUnseenRecommendation) {
      markRecommendationSeenLocal();
    }

    appendAssistantMessage(buildDailyConversationMessage());
    seedQuickReplies(getDailyQuickReplies());
  }

  async function beginPageGuideConversation() {
    if (!currentPageGuide) return;

    rememberGuidePromptShown();
    appendAssistantMessage(currentPageGuide.ask);
    seedQuickReplies(getGuideQuickReplies());
  }

  async function startDailyConversation() {
    if (hasUnseenDailyGreeting) {
      markDailyGreetingSeenLocal();
    }
    if (hasUnseenRecommendation) {
      markRecommendationSeenLocal();
    }
    appendAssistantMessage(buildDailyConversationMessage());
    seedQuickReplies(getDailyQuickReplies());
  }

  async function startPageGuideConversation() {
    if (!currentPageGuide) return;

    appendAssistantMessage(currentPageGuide.ask);
    seedQuickReplies([
      { id: "guide-show", label: "Yes, show me", action: "guide_show" },
      { id: "guide-question", label: "I have a question", action: "guide_question" },
      { id: "guide-later", label: "Not right now", action: "guide_later" },
    ]);
  }

  async function shareRecommendationInChat(preface?: string) {
    if (!louisRecommendation) return;

    markRecommendationSeenLocal();
    appendAssistantMessage(
      `${louisRecommendation.greeting}\n\n${louisRecommendation.contextLine}\n\nHereâ€™s what I think you should do next:\n\n${louisRecommendation.recommendationLine}`,
    );
    seedQuickReplies([
      {
        id: "recommendation-open",
        label: louisRecommendation.primaryButtonText,
        action: "recommendation_open",
      },
      { id: "recommendation-question", label: "Tell me more", action: "recommendation_question" },
      { id: "recommendation-later", label: "Maybe later", action: "recommendation_later" },
    ]);
  }

  async function shareVerseOfTheDayInChat() {
    const firstSection = todayVerse.explanationSections[0];
    const secondSection = todayVerse.explanationSections[1];

    appendAssistantMessage(
      `${todayVerseIntro}\n\n${todayVerse.reference}\n\n${todayVerse.text}\n\n${todayVerse.subtitle}\n\n${firstSection?.body ?? ""}${secondSection?.body ? `\n\n${secondSection.body}` : ""}\n\nWant me to break it down more, or do you want a recommendation for what to do next today?`,
    );

    seedQuickReplies([
      { id: "verse-rec", label: "Give me a recommendation", action: "daily_recommendation" },
      { id: "verse-talk", label: "Let's talk about it", action: "daily_talk" },
      { id: "verse-open-page", label: "Open verse page", action: "recommendation_open" },
    ]);
  }

  async function handleQuickReply(reply: QuickReply) {
    appendUserMessage(reply.label);
    setQuickReplies([]);

    switch (reply.action) {
      case "daily_yes":
        appendAssistantMessage(
          "Alright.\n\nWhat's on your mind?\n\nTell me straight, and I'll help you figure out what to do with it.",
        );
        break;
      case "daily_good":
        appendAssistantMessage(
          hasLouisHistory
            ? lastMasterActionSummary
              ? `Love that.\n\n${getStreakCelebrationLine(currentStreak)}\n\n${lastMasterActionSummary.summary}\n\n${lastMasterActionSummary.followUp}`
              : habitNudge
                ? `Love that.\n\n${getStreakCelebrationLine(currentStreak)}\n\n${habitNudge.summary}`
                : "Love that.\n\nDo you want today's verse, do you want a recommendation, or do you want me to show you something on this page?"
            : currentPageGuide
              ? pathname === "/dashboard"
                ? `That's good to hear.\n\nIt's great to have you here.\n\nSince this is your first time, how about we do this together?\n\nI can show you the dashboard, then help you take your first real step in Bible Buddy.`
                : `That's good to hear.\n\nIt's great to have you here.\n\nSince you're on ${currentPageGuide.title.toLowerCase()}, do you want me to show you how this page works?`
              : "That's good to hear.\n\nIt's great to have you here.\n\nDo you want today's verse, a recommendation, or help with the page you're on?",
        );
        seedQuickReplies(
          [
            currentPageGuide ? { id: "daily-intro-help", label: "Show me this page", action: "daily_intro_help" as const } : null,
            { id: "daily-good-verse", label: "Today's verse", action: "daily_verse" as const },
            { id: "daily-good-rec", label: "Recommend something", action: "daily_recommendation" as const },
            lastMasterActionSummary?.continueHref && lastMasterActionSummary.continueLabel
              ? { id: "daily-good-continue", label: lastMasterActionSummary.continueLabel, action: "daily_continue" as const }
              : null,
            habitNudge ? { id: "daily-good-nudge", label: habitNudge.label, action: "daily_try_missing" as const } : null,
          ].filter(Boolean) as QuickReply[],
        );
        break;
      case "daily_okay":
        appendAssistantMessage(
          hasLouisHistory
            ? habitNudge
              ? `Alright.\n\nLet's keep it simple then.\n\n${habitNudge.summary}`
              : "Alright.\n\nLet's keep it simple then.\n\nDo you want today's verse, do you want me to recommend one good next step, or do you want help with the page you're on?"
            : currentPageGuide
              ? `That's alright.\n\nWe can keep it simple.\n\nSince you're on ${currentPageGuide.title.toLowerCase()}, do you want me to show you how this page works?`
              : "That's alright.\n\nWe can keep it simple.\n\nDo you want today's verse, a recommendation, or help with the page you're on?",
        );
        seedQuickReplies(
          [
            currentPageGuide ? { id: "daily-okay-help", label: "Show me this page", action: "daily_intro_help" as const } : null,
            { id: "daily-okay-verse", label: "Today's verse", action: "daily_verse" as const },
            { id: "daily-okay-rec", label: "Recommend something", action: "daily_recommendation" as const },
            { id: "daily-okay-talk", label: "I want to talk", action: "daily_talk" as const },
            habitNudge ? { id: "daily-okay-nudge", label: habitNudge.label, action: "daily_try_missing" as const } : null,
          ].filter(Boolean) as QuickReply[],
        );
        break;
      case "daily_bad":
        appendAssistantMessage(
          hasLouisHistory
            ? "I'm sorry you're feeling like that.\n\nWhat's going on?\n\nTell me straight, and we'll try to move toward something in the Word that can help in this moment."
            : currentPageGuide
              ? `I'm sorry you're feeling like that.\n\nHopefully the Word can help meet you in this moment.\n\nI see you're on ${currentPageGuide.title.toLowerCase()}.\n\nIf you want, tell me what's wrong, or I can show you how this page works and help you start somewhere simple.`
              : "I'm sorry you're feeling like that.\n\nHopefully the Word can help meet you in this moment.\n\nTell me what's going on, and I'll help you find somewhere solid to start.",
        );
        seedQuickReplies(
          [
            { id: "daily-bad-talk", label: "What's wrong", action: "daily_talk" as const },
            currentPageGuide ? { id: "daily-bad-help", label: "Show me this page", action: "daily_intro_help" as const } : null,
            { id: "daily-bad-verse", label: "Give me today's verse", action: "daily_verse" as const },
          ].filter(Boolean) as QuickReply[],
        );
        break;
      case "daily_no":
        appendAssistantMessage(
          lastMasterActionSummary
            ? `Alright.\n\nThen what do you want to do today in Bible Buddy?\n\n${lastMasterActionSummary.summary}\n\n${lastMasterActionSummary.followUp}`
            : habitNudge
              ? `Alright.\n\nThen what do you want to do today in Bible Buddy?\n\n${habitNudge.summary}`
            : louisRecommendation
              ? "Alright.\n\nThen what do you want to do today in Bible Buddy?\n\nI can point you to the next thing that makes sense, or I can give you today's verse and let’s start there."
              : "Alright.\n\nThen what do you want to do today in Bible Buddy?\n\nI can give you today's verse, help you get back into the Bible, or point you somewhere solid to start.",
        );
        seedQuickReplies(
          [
            lastMasterActionSummary?.continueHref && lastMasterActionSummary.continueLabel
              ? { id: "daily-continue", label: lastMasterActionSummary.continueLabel, action: "daily_continue" as const }
              : null,
            { id: "daily-no-verse", label: "Tell me today's verse", action: "daily_verse" as const },
            louisRecommendation
              ? { id: "daily-no-rec", label: "What do you recommend?", action: "daily_recommendation" as const }
              : null,
            habitNudge ? { id: "daily-no-nudge", label: habitNudge.label, action: "daily_try_missing" as const } : null,
            hasPendingPageGuide && currentPageGuide?.id === "dashboard"
              ? { id: "daily-no-guide", label: "Show me the dashboard", action: "guide_show" as const }
              : { id: "daily-no-talk", label: "I changed my mind", action: "daily_talk" as const },
          ].filter(Boolean) as QuickReply[],
        );
        break;
      case "daily_verse":
        await shareVerseOfTheDayInChat();
        break;
      case "daily_recommendation":
        await shareRecommendationInChat("Here’s what I think would be good for you today.");
        break;
      case "daily_continue":
        if (lastMasterActionSummary?.continueHref) {
          router.push(lastMasterActionSummary.continueHref);
        }
        break;
      case "daily_try_missing":
        if (habitNudge?.href) {
          router.push(habitNudge.href);
        }
        break;
      case "daily_talk":
        appendAssistantMessage("I'm here.\n\nTell me what's going on, and I'll help you sort through it.");
        break;
      case "daily_intro_help":
        if (currentPageGuide) {
          await markCurrentGuideSeen();
          appendAssistantMessage(
            `${currentPageGuide.chatStarter}\n\n${buildLouisGuideChatMessage(currentPageGuide)}`,
          );
          seedQuickReplies([
            pathname === "/dashboard"
              ? { id: "guide-start-devotional", label: "Let's start with a devotional", action: "open_devotionals" }
              : { id: "guide-follow-up", label: "I have a question", action: "guide_question" },
            pathname === "/dashboard"
              ? { id: "guide-follow-up-question", label: "I have a question", action: "guide_question" }
              : null,
            louisRecommendation
              ? { id: "guide-then-rec", label: "What do you recommend?", action: "daily_recommendation" }
              : { id: "guide-later-2", label: "That helps", action: "guide_later" },
          ].filter(Boolean) as QuickReply[]);
        }
        break;
      case "daily_intro_later":
        appendAssistantMessage("No problem.\n\nWhenever you're ready, tap me and I'll help you out.");
        break;
      case "guide_show":
        if (currentPageGuide) {
          await markCurrentGuideSeen();
          appendAssistantMessage(buildLouisGuideChatMessage(currentPageGuide));
          seedQuickReplies([
            { id: "guide-follow-up", label: "I have a question", action: "guide_question" },
            pathname === "/dashboard" && louisRecommendation
              ? { id: "guide-then-rec", label: "What do you recommend?", action: "daily_recommendation" }
              : { id: "guide-later-2", label: "That helps", action: "guide_later" },
          ]);
        }
        break;
      case "guide_later":
        if (hasPendingPageGuide) {
          await markCurrentGuideSeen();
        }
        appendAssistantMessage("No problem.\n\nIf you want help with this page later, just tap me and ask.");
        break;
      case "guide_question":
        if (hasPendingPageGuide) {
          await markCurrentGuideSeen();
        }
        appendAssistantMessage(
          currentPageGuide
            ? `${currentPageGuide.chatStarter}\n\nWhat do you want help with on this page?`
            : "What do you want help with?",
        );
        break;
      case "open_devotionals":
        router.push("/devotionals");
        break;
      case "moment_navigate":
        if (reply.href) {
          router.push(reply.href);
        }
        break;
      case "moment_message":
        if (reply.message) {
          appendAssistantMessage(reply.message);
        }
        break;
      case "recommendation_open":
        if (reply.id === "verse-open-page") {
          router.push("/verse-of-the-day");
        } else if (louisRecommendation) {
          router.push(louisRecommendation.primaryButtonHref);
        }
        break;
      case "recommendation_question":
        appendAssistantMessage("Ask me anything about that recommendation and I'll break it down for you.");
        break;
      case "recommendation_later":
        appendAssistantMessage("That's fine.\n\nIf you want the recommendation later, just ask me and I'll bring it back up.");
        break;
      default:
        break;
    }
  }

  async function handleChatButtonClick() {
    setIsOpen(true);
    setQuickReplies([]);

    if (featureToursEnabled && louisFeatureTours.chat_widget !== true) {
      void markChatWidgetSeen();
    }

    const latestMessage = messages[messages.length - 1];

    if (pathname === "/dashboard" && (hasUnseenDailyGreeting || hasUnseenRecommendation)) {
      const dailyConversationMessage = buildDailyConversationMessage();

      if (latestMessage?.role === "assistant" && latestMessage.content === dailyConversationMessage) {
        seedQuickReplies(getDailyQuickReplies());
        return;
      }

      await beginDailyConversation();
      return;
    }

    if (hasPendingPageGuide) {
      const guideWasPrompted =
        louisUserId &&
        typeof window !== "undefined" &&
        currentPageGuide &&
        window.localStorage.getItem(getGuidePromptKey(louisUserId, currentPageGuide.id)) === "1";

      if (latestMessage?.role === "assistant" && latestMessage.content === currentPageGuide?.ask) {
        seedQuickReplies(getGuideQuickReplies());
        return;
      }

      if (guideWasPrompted) {
        seedQuickReplies(getGuideQuickReplies());
        return;
      }

      await beginPageGuideConversation();
      return;
    }
  }

  async function handleLouisGuideSecondary() {}

  async function handleLouisGuideClose() {}

  async function handleLouisGuidePrimary() {}

  async function handleChatTourUnderstand() {}

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages: Message[] = [...messages, userMessage];

    setMessages(newMessages);
    setQuickReplies([]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          pageContext: currentPageGuide
            ? {
                pathname,
                guideId: currentPageGuide.id,
                title: currentPageGuide.title,
                chatStarter: currentPageGuide.chatStarter,
                bullets: currentPageGuide.bullets,
              }
            : { pathname },
          louisContext: {
            isFirstTimeLouis: !hasLouisHistory,
            currentStreak,
            onboardingGoal,
            hasPendingPageGuide,
            pageGuideTitle: currentPageGuide?.title ?? null,
            lastActionSummary: lastMasterActionSummary?.summary ?? null,
            lastActionFollowUp: lastMasterActionSummary?.followUp ?? null,
            habitNudge: habitNudge?.summary ?? null,
            recommendationLine: louisRecommendation?.recommendationLine ?? null,
            recommendationHref: louisRecommendation?.primaryButtonHref ?? null,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply ?? "Sorry, I did not understand that.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, something went wrong. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Send on Enter (without Shift), otherwise allow normal textarea behavior
    if (e.key === "Enter" && !e.shiftKey && !isSending) {
      e.preventDefault();
      handleSend();
    }
  }

  // Dragging handlers (mouse + touch via Pointer Events)
  function handlePointerDown(e: React.PointerEvent<HTMLElement>) {
    // Only left button for mouse; allow all touch pointers
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  useEffect(() => {
    if (!isDragging) return;

    function handlePointerMove(e: PointerEvent) {
      e.preventDefault();
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }

    function handlePointerUp() {
      setIsDragging(false);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging, dragOffset]);

  useEffect(() => {
    if (!isOpen) return;

    const frame = window.requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ block: "end" });
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, messages, quickReplies]);

  useEffect(() => {
    function onLouisMoment(event: Event) {
      const detail = (event as CustomEvent<LouisMomentDetail>).detail;
      if (!detail?.message) return;

      setIsOpen(true);
      appendAssistantMessage(detail.message);
      seedQuickReplies(
        (detail.replies ?? []).map((reply: LouisMomentReply) => ({
          id: reply.id,
          label: reply.label,
          action: reply.href ? "moment_navigate" : "moment_message",
          href: reply.href,
          message: reply.message,
        })),
      );
    }

    document.addEventListener(LOUIS_MOMENT_EVENT, onLouisMoment);
    return () => document.removeEventListener(LOUIS_MOMENT_EVENT, onLouisMoment);
  }, []);

  const bubbleStyle =
    position.x === 0 && position.y === 0
      ? {
          position: "fixed" as const,
          bottom: "1rem",
          right: "1rem",
        }
      : {
          position: "fixed" as const,
          left: `${position.x}px`,
          top: `${position.y}px`,
        };

  const panelWidth = 360;
  const panelHeight = 500;
  const viewportPadding = 16;
  const bubbleSize = 80;
  const customPanelLeft =
    position.x === 0
      ? null
      : Math.min(
          Math.max(position.x + bubbleSize - panelWidth, viewportPadding),
          Math.max(viewportPadding, viewportSize.width - panelWidth - viewportPadding),
        );
  const customPanelTop =
    position.y === 0
      ? null
      : Math.min(
          Math.max(position.y - panelHeight + bubbleSize, viewportPadding),
          Math.max(viewportPadding, viewportSize.height - panelHeight - viewportPadding),
        );
  const panelStyle =
    position.x === 0 && position.y === 0
      ? {
          position: "fixed" as const,
          bottom: "6rem",
          right: "1rem",
        }
      : {
          position: "fixed" as const,
          left: `${customPanelLeft ?? viewportPadding}px`,
          top: `${customPanelTop ?? viewportPadding}px`,
        };

  return (
    <>
      {/* Floating avatar button */}
      {!isOpen && (
        <button
          ref={buttonRef}
          onClick={async (e) => {
            if (!isDragging) {
              await handleChatButtonClick();
            }
          }}
          onPointerDown={handlePointerDown}
          style={{
            ...bubbleStyle,
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "none",
          }}
          className={`z-[70] rounded-full shadow-xl flex items-center justify-center transition-transform ${
            hasPendingLouisMoment ? "animate-[bounce_1.7s_ease-in-out_infinite]" : ""
          }`}
          aria-label="Chat with Louis"
        >
          <div className="relative w-20 h-20 rounded-full bg-black/5 flex items-center justify-center">
            {hasPendingLouisMoment ? (
              <>
                <span className="absolute inset-0 rounded-full border-4 border-sky-300/60 animate-ping" />
                <span className="absolute -right-1 top-0 rounded-full bg-sky-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                  New
                </span>
              </>
            ) : null}
            <LouisAvatar mood="bible" size={64} />
          </div>
        </button>
      )}

      {/* Chat panel - Medium size */}
      {isOpen && (
        <div
          ref={panelRef}
          style={{
            ...panelStyle,
            cursor: isDragging ? "grabbing" : "default",
          }}
          className="z-[70] w-[360px] h-[500px] rounded-t-2xl bg-white border border-gray-200 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div 
            className="px-4 py-2.5 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-2xl cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
            onPointerDown={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest("button")) {
                return; // Don't drag if clicking close button
              }
              handlePointerDown(e);
            }}
          >
            <div className="flex items-center gap-2">
              <LouisAvatar mood="bible" size={28} />
              <span className="text-sm font-semibold text-gray-900">Chat with Louis</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-base leading-none"
              onPointerDown={(e) => e.stopPropagation()}
            >
              âœ•
            </button>
          </div>

          {/* Messages area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 bg-white"
          >
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-xs text-gray-500 text-center">
                  {emptyStatePrompt}
                </p>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "flex items-end justify-end gap-2.5"
                    : "flex items-end justify-start gap-2.5"
                }
              >
                {m.role === "assistant" ? (
                  <div className="shrink-0">
                    <div className="overflow-hidden rounded-full border border-sky-100 bg-white p-0.5 shadow-sm">
                      <LouisAvatar mood="bible" size={30} />
                    </div>
                  </div>
                ) : null}
                <div className={m.role === "user" ? "max-w-[78%] text-right" : "max-w-[78%]"}>
                  <div className={m.role === "user" ? "mb-1 text-[10px] font-medium text-slate-500" : "mb-1 text-[10px] font-medium text-slate-500"}>
                    {m.role === "user" ? "You" : "Louis"}
                  </div>
                  <div
                    className={
                      m.role === "user"
                        ? "inline-block rounded-[22px] rounded-br-md border border-[#b8d9ef] bg-[#7BAFD4] px-3.5 py-2.5 text-left text-slate-950 shadow-sm"
                        : "inline-block rounded-[22px] rounded-bl-md border border-gray-200 bg-white px-3.5 py-2.5 text-gray-800 shadow-sm"
                    }
                  >
                    <p className="text-xs whitespace-pre-line leading-relaxed break-words">
                      {m.content}
                    </p>
                  </div>
                </div>
                {m.role === "user" ? (
                  userProfileImageUrl ? (
                    <img
                      src={userProfileImageUrl}
                      alt="Your profile picture"
                      className="h-8 w-8 shrink-0 rounded-full border border-[#b8d9ef] object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#b8d9ef] bg-[#e8f3fb] text-[11px] font-semibold text-[#214761] shadow-sm">
                      {userInitial}
                    </div>
                  )
                ) : null}
              </div>
            ))}
            {quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    type="button"
                    onClick={() => {
                      void handleQuickReply(reply);
                    }}
                    className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div 
            className="border-t border-gray-200 px-3 py-2.5 bg-gray-50 rounded-b-2xl"
          >
            <div className="flex gap-2 items-end">
              <div className="flex-1 flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Talk to Louis..."
                  rows={1}
                  className="flex-1 text-xs border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none min-h-[36px] max-h-[120px] overflow-y-auto"
                />
                {isListening && audioLevels.length > 0 && (
                  <div className="flex items-end gap-0.5 h-8 pb-1">
                    {audioLevels.map((level, index) => (
                      <div
                        key={index}
                        className="w-1 bg-red-500 rounded-full transition-all duration-75"
                        style={{
                          height: `${Math.max(level * 24, 4)}px`,
                          minHeight: "4px",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={toggleListening}
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                }`}
                aria-label={isListening ? "Stop listening" : "Start listening"}
              >
                {isListening ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 9a1 1 0 10-2 0v2a1 1 0 102 0V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <button
                onClick={handleSend}
                disabled={isSending || !input.trim()}
                className="text-xs font-semibold bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700 transition"
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {false && (currentPageGuide || louisRecommendation) && (
        <FeatureTourModal
          isOpen={showLouisGuideModal}
          title={
            louisGuideView === "recommendation"
              ? louisRecommendation?.cardTitle || "Louis has your next step"
              : currentPageGuide?.title || "Louis has something for you"
          }
          body={
            louisGuideView === "recommendation"
              ? louisRecommendation?.contextLine || ""
              : currentPageGuide?.intro || ""
          }
          content={
            louisGuideView === "recommendation" ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-sky-100 bg-sky-50/60 px-4 py-3">
                  <p className="text-sm font-semibold text-sky-900">
                    {louisRecommendation?.greeting || "Hereâ€™s what I noticed today."}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-gray-600 md:text-[15px]">
                    {louisRecommendation?.contextLine}
                  </p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-gray-900 md:text-lg">Here&apos;s what I think you should do next</h2>
                  <p className="text-sm leading-7 text-gray-600 md:text-[15px]">
                    {louisRecommendation?.recommendationLine}
                  </p>
                </div>
              </div>
            ) : louisGuideView === "tour" && currentPageGuide ? (
              renderLouisGuideContent(currentPageGuide)
            ) : currentPageGuide ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-sky-100 bg-sky-50/60 px-4 py-3">
                  <p className="text-sm leading-7 text-gray-600 md:text-[15px]">{currentPageGuide?.prompt || ""}</p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    await markCurrentGuideSeen();
                    setLouisGuideView("tour");
                  }}
                  className="rounded-2xl border border-sky-200 bg-white px-4 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
                >
                  Take the tour
                </button>
              </div>
            ) : undefined
          }
          primaryButtonText={
            louisGuideView === "recommendation"
              ? louisRecommendation?.primaryButtonText || "Open it"
              : "I get it"
          }
          secondaryButtonText="Ask Louis"
          onSecondary={() => {
            void handleLouisGuideSecondary();
          }}
          onClose={() => {
            void handleLouisGuideClose();
          }}
          onUnderstand={() => {
            void handleLouisGuidePrimary();
          }}
        />
      )}

      {false && featureToursEnabled && (
        <FeatureTourModal
          isOpen={showChatTourModal}
          title="Welcome to Chat with Louis"
          body=""
          content={
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Welcome to Chat with Louis
              </h1>

              <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                This section helps you ask Bible questions instantly while you study so you can stay focused in your reading flow.
              </p>

              <section className="space-y-2">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ’¬ Ask Questions Anytime</h2>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                  While reading Scripture, you can open Chat with Louis and ask:
                </p>
                <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
                  <li>â€¢ What does this verse mean?</li>
                  <li>â€¢ Who is this person?</li>
                  <li>â€¢ What is the historical context?</li>
                  <li>â€¢ How does this connect to the rest of the Bible?</li>
                </ul>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                  You never have to leave your study flow.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ“– Scripture Focused Answers</h2>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                  Louis has been carefully trained on biblical content and designed to:
                </p>
                <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
                  <li>â€¢ Search Scripture</li>
                  <li>â€¢ Filter out nonsense</li>
                  <li>â€¢ Prioritize clear, Scripture grounded answers</li>
                </ul>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                  The goal is clarity, not confusion.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">ðŸ§  Study Without Breaking Flow</h2>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                  Instead of switching apps or searching the internet, your study partner is built directly into BibleBuddy.
                </p>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">Stay focused.</p>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">Dig deeper.</p>
                <p className="text-sm md:text-[15px] text-gray-600 leading-7">Keep reading.</p>
              </section>
            </div>
          }
          isSaving={isSavingChatTour}
          onClose={() => setShowChatTourModal(false)}
          onUnderstand={handleChatTourUnderstand}
        />
      )}
    </>
  );
}

