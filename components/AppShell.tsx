"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { syncNotesCount, shouldSyncNotesCount } from "../lib/syncNotesCount";
import { syncChaptersCount, shouldSyncChaptersCount } from "../lib/syncChaptersCount";
import { trackUserActivity } from "../lib/trackUserActivity";
import { recalculateTotalActions } from "../lib/recalculateTotalActions";
import { syncCurrentStreakToProfileStats } from "../lib/profileStats";
import { FeatureRenderPriorityProvider } from "./FeatureRenderPriorityContext";
import { CURRENT_UPDATE_VERSION } from "../lib/globalUpdateConfig";
import { getDailyRecommendation, type DailyRecommendation } from "../lib/dailyRecommendation";
import { LouisAvatar } from "./LouisAvatar";
import { buildFullName, hasRequiredFullName, splitFullName } from "../lib/profileName";
import { extractLegacyDirectMessageAction } from "../lib/directMessageActions";
import BibleStudyBreadcrumb from "./BibleStudyBreadcrumb";
import { APP_NAV_ITEMS, buildBreadcrumbs, isNavItemActive } from "../lib/appNavigation";
import type { BuddyCelebrationUser } from "./BuddyCelebrationModal";
import UserBadge from "./UserBadge";
import StreakFlameBadge from "./StreakFlameBadge";
const ConversationPage = dynamic(() => import("../app/messages/[conversationId]/page"), { ssr: false });

const ChatLouis = dynamic(() => import("./ChatLouis").then((mod) => mod.ChatLouis), {
  ssr: false,
});
const FeedbackModal = dynamic(() => import("./FeedbackModal").then((mod) => mod.FeedbackModal), {
  ssr: false,
});
const ContactUsModal = dynamic(() => import("./ContactUsModal").then((mod) => mod.ContactUsModal), {
  ssr: false,
});
const NewMessageAlert = dynamic(() => import("./NewMessageAlert").then((mod) => mod.NewMessageAlert), {
  ssr: false,
});
const OnboardingModal = dynamic(() => import("./OnboardingModal").then((mod) => mod.OnboardingModal), {
  ssr: false,
});
const GlobalUpdateModal = dynamic(() => import("./GlobalUpdateModal").then((mod) => mod.GlobalUpdateModal), {
  ssr: false,
});
const DailyRecommendationModal = dynamic(() => import("./DailyRecommendationModal"), {
  ssr: false,
});
const BuddyCelebrationModal = dynamic(
  () => import("./BuddyCelebrationModal").then((mod) => mod.BuddyCelebrationModal),
  { ssr: false },
);

const HIDDEN_ROUTES = ["/", "/login", "/signup", "/reset-password"];
const DAILY_RECOMMENDATIONS_ENABLED = false;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

async function runBackgroundSessionSync(currentUserId: string) {
  const tasks: Promise<unknown>[] = [
    trackUserActivity(currentUserId),
    recalculateTotalActions(currentUserId),
    syncCurrentStreakToProfileStats(currentUserId),
  ];

  if (shouldSyncNotesCount(currentUserId)) {
    console.log("[APPSHELL] Syncing notes count in background");
    tasks.push(syncNotesCount(currentUserId));
  }

  if (shouldSyncChaptersCount(currentUserId)) {
    console.log("[APPSHELL] Syncing chapters count in background");
    tasks.push(syncChaptersCount(currentUserId));
  }

  await Promise.allSettled(tasks);
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // When loaded inside an iframe (group hub embed), skip the shell entirely
  const [isEmbedded, setIsEmbedded] = useState(false);
  useEffect(() => {
    try { setIsEmbedded(window.self !== window.top); } catch { setIsEmbedded(true); }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);
  
  // Feedback system state
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [feedbackChecked, setFeedbackChecked] = useState(false);
  
  // Contact Us modal state
  const [showContactUsModal, setShowContactUsModal] = useState(false);
  
  // Onboarding state
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [initialTrafficSource, setInitialTrafficSource] = useState<string | null>(null);
  const [initialBibleExperienceLevel, setInitialBibleExperienceLevel] = useState<string | null>(null);
  const [featureToursEnabled, setFeatureToursEnabled] = useState(false);
  const [showFullNameModal, setShowFullNameModal] = useState(false);
  const [fullNameFirst, setFullNameFirst] = useState("");
  const [fullNameLast, setFullNameLast] = useState("");
  const [fullNameSaving, setFullNameSaving] = useState(false);
  const [fullNameError, setFullNameError] = useState<string | null>(null);

  // Global update modal state
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateModalChecked, setUpdateModalChecked] = useState(false);

  // Daily recommendation modal state
  const [showDailyRecommendation, setShowDailyRecommendation] = useState(false);
  const [dailyRecommendation, setDailyRecommendation] = useState<DailyRecommendation | null>(null);

  // Notifications bell state
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: string | null;
    from_user_id: string | null;
    from_user_name: string;
    article_slug: string | null;
    comment_id: string | null;
    post_id: string | null;
    message: string | null;
    is_read: boolean;
    created_at: string;
  }>>([]);
  const [buddyActionLoadingId, setBuddyActionLoadingId] = useState<string | null>(null);
  const [showBuddyCelebration, setShowBuddyCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{ me: BuddyCelebrationUser; buddy: BuddyCelebrationUser } | null>(null);
  const shownCelebrationIds = useRef<Set<string>>(new Set());
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Messages panel state
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [conversationPreviews, setConversationPreviews] = useState<Array<{
    id: string;
    otherUserId: string;
    otherUserName: string;
    otherUserImage: string | null;
    otherUserBadge: string | null;
    otherUserIsPaid: boolean;
    otherUserCurrentStreak: number | null;
    lastMessagePreview: string | null;
    lastMessageAt: string | null;
    hasUnread: boolean;
    bucket: "primary" | "general";
  }>>([]);
  const [loadingPreviews, setLoadingPreviews] = useState(false);
  const [openConversationId, setOpenConversationId] = useState<string | null>(null);
  // Cache of unread conversation IDs from the service-role API (bypasses RLS)
  const _cachedUnreadConvoIds = useRef<Set<string>>(new Set());

  // PWA install prompt state
  const deferredInstallPromptRef = useRef<any>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);
  const [pushPermission, setPushPermission] = useState<NotificationPermission | "unsupported">("unsupported");
  const [pushSubscribed, setPushSubscribed] = useState(false);
  const [pushLoading, setPushLoading] = useState(false);
  const [pushError, setPushError] = useState<string | null>(null);
  const [showPushPrompt, setShowPushPrompt] = useState(false);
  const [pushPromptClosing, setPushPromptClosing] = useState(false);
  const [headerCurrentLevel, setHeaderCurrentLevel] = useState<number>(1);
  const [headerCurrentStreak, setHeaderCurrentStreak] = useState<number>(0);
  const [headerProfileImageUrl, setHeaderProfileImageUrl] = useState<string | null>(null);
  const [headerProfileName, setHeaderProfileName] = useState<string>("You");
  const [headerProfileImageFailed, setHeaderProfileImageFailed] = useState(false);

  const visibleUnreadNotificationCount = notifications.filter(
    (notification) => notification.type !== "direct_message" && !notification.is_read,
  ).length;

  const headerProfileInitials = headerProfileName
    .split(" ")
    .map((word) => word[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase() || "Y";

  const headerAvatarPalette = ["#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8"];
  let headerAvatarHash = 0;
  for (let i = 0; i < headerProfileName.length; i++) {
    headerAvatarHash = headerProfileName.charCodeAt(i) + ((headerAvatarHash << 5) - headerAvatarHash);
  }
  const headerAvatarBg = headerAvatarPalette[Math.abs(headerAvatarHash) % headerAvatarPalette.length];

  function getPushPromptDismissKey(currentUserId: string) {
    return `bb:push-prompt-dismissed:${currentUserId}`;
  }

  function hidePushPrompt(persist = false) {
    setPushPromptClosing(true);
    window.setTimeout(() => {
      setShowPushPrompt(false);
      setPushPromptClosing(false);
    }, 220);

    if (persist && userId && typeof window !== "undefined") {
      window.localStorage.setItem(getPushPromptDismissKey(userId), "1");
    }
  }

  async function savePushSubscription(currentUserId: string, subscription: PushSubscription) {
    const json = subscription.toJSON();
    const p256dh = json.keys?.p256dh;
    const auth = json.keys?.auth;

    if (!p256dh || !auth) {
      throw new Error("Push subscription keys are missing.");
    }

    const { error } = await supabase
      .from("push_subscriptions")
      .upsert(
        {
          user_id: currentUserId,
          endpoint: subscription.endpoint,
          p256dh,
          auth,
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
          updated_at: new Date().toISOString(),
          last_seen_at: new Date().toISOString(),
        },
        { onConflict: "endpoint" }
      );

    if (error) {
      throw new Error(error.message || "Could not save push subscription.");
    }
  }

  async function ensurePushSubscription(currentUserId: string) {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidPublicKey) {
      throw new Error("Missing NEXT_PUBLIC_VAPID_PUBLIC_KEY.");
    }

    const registration = await navigator.serviceWorker.register("/service-worker.js");
    const worker = await navigator.serviceWorker.ready;
    let subscription = await worker.pushManager.getSubscription();

    if (!subscription) {
      subscription = await worker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
    }

    await savePushSubscription(currentUserId, subscription);
    setPushSubscribed(true);
  }

  async function handleEnablePushAlerts() {
    if (!userId) return;
    setPushLoading(true);
    setPushError(null);
    try {
      if (typeof window === "undefined" || !("Notification" in window)) {
        throw new Error("Push notifications are not supported on this device.");
      }

      const permission =
        Notification.permission === "granted"
          ? "granted"
          : await Notification.requestPermission();
      setPushPermission(permission);

      if (permission !== "granted") {
        throw new Error(
          "Notifications are blocked in this browser. Open your browser or phone site settings for Bible Buddy, allow notifications, then tap Enable again.",
        );
      }

      await ensurePushSubscription(userId);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(getPushPromptDismissKey(userId));
      }
      hidePushPrompt(true);
    } catch (error: any) {
      setPushError(error?.message || "Could not enable push alerts.");
    } finally {
      setPushLoading(false);
    }
  }

  async function loadHeaderDashboardStats(currentUserId: string) {
    const { data, error } = await supabase
      .from("profile_stats")
      .select("current_level, current_streak, profile_image_url, display_name, username")
      .eq("user_id", currentUserId)
      .maybeSingle();

    if (error) {
      console.warn("[APPSHELL] Could not load header dashboard stats:", error);
      return;
    }

    setHeaderCurrentLevel(typeof data?.current_level === "number" && data.current_level > 0 ? data.current_level : 1);
    setHeaderCurrentStreak(typeof data?.current_streak === "number" && data.current_streak > 0 ? data.current_streak : 0);
    setHeaderProfileImageUrl(typeof data?.profile_image_url === "string" && data.profile_image_url.trim() ? data.profile_image_url : null);
    setHeaderProfileImageFailed(false);
    setHeaderProfileName(
      typeof data?.display_name === "string" && data.display_name.trim()
        ? data.display_name.trim()
        : typeof data?.username === "string" && data.username.trim()
          ? data.username.trim()
          : "You",
    );
  }

  async function checkOnboardingStatus(currentUserId: string) {
    try {
      const { data: profileStats, error: profileStatsError } = await supabase
        .from("profile_stats")
        .select("onboarding_completed, traffic_source, bible_experience_level")
        .eq("user_id", currentUserId)
        .maybeSingle();

      if (profileStatsError) {
        console.error("[ONBOARDING] Error loading onboarding status:", profileStatsError);
        setShowOnboardingModal(true);
        setFeatureToursEnabled(false);
        setInitialTrafficSource(null);
        setInitialBibleExperienceLevel(null);
        return;
      }

      if (!profileStats) {
        const { error: upsertError } = await supabase.from("profile_stats").upsert(
          {
            user_id: currentUserId,
            onboarding_completed: false,
            traffic_source: null,
            bible_experience_level: null,
          },
          { onConflict: "user_id" }
        );

        if (upsertError) {
          console.error("[ONBOARDING] Error creating profile_stats row:", upsertError);
        }

        setShowOnboardingModal(true);
        setFeatureToursEnabled(false);
        setInitialTrafficSource(null);
        setInitialBibleExperienceLevel(null);
        return;
      }

      setInitialTrafficSource(profileStats.traffic_source ?? null);
      setInitialBibleExperienceLevel(profileStats.bible_experience_level ?? null);
      const onboardingCompleted = profileStats.onboarding_completed === true;
      setShowOnboardingModal(!onboardingCompleted);
      setFeatureToursEnabled(onboardingCompleted);
    } catch (_err) {
      console.error("[ONBOARDING] Unexpected onboarding status error:", _err);
      setShowOnboardingModal(true);
      setFeatureToursEnabled(false);
      setInitialTrafficSource(null);
      setInitialBibleExperienceLevel(null);
      return;
    }
  }

  async function checkFullNameRequirement(currentUserId: string) {
    try {
      const { data: profile } = await supabase
        .from("profile_stats")
        .select("display_name, username")
        .eq("user_id", currentUserId)
        .maybeSingle();

      const currentName = profile?.display_name || profile?.username || "";
      if (hasRequiredFullName(currentName)) {
        setShowFullNameModal(false);
        setFullNameError(null);
        return;
      }

      const split = splitFullName(currentName);
      setFullNameFirst(split.firstName);
      setFullNameLast(split.lastName);
      setShowFullNameModal(true);
    } catch (error) {
      console.warn("[FULL_NAME] Check skipped due to transient issue.", error);
    }
  }

  async function handleSaveRequiredFullName() {
    if (!userId || fullNameSaving) return;

    const normalizedFullName = buildFullName(fullNameFirst, fullNameLast);
    if (!hasRequiredFullName(normalizedFullName)) {
      setFullNameError("Please add both your first and last name.");
      return;
    }

    setFullNameSaving(true);
    setFullNameError(null);

    try {
      const { error } = await supabase
        .from("profile_stats")
        .update({ display_name: normalizedFullName })
        .eq("user_id", userId);

      if (error) {
        throw error;
      }

      setShowFullNameModal(false);
    } catch (error: any) {
      setFullNameError(error?.message || "Could not save your full name.");
    } finally {
      setFullNameSaving(false);
    }
  }

  async function checkUpdateStatus(currentUserId: string) {
    if (updateModalChecked) return;
    try {
      const { data } = await supabase
        .from("profile_stats")
        .select("onboarding_completed, last_seen_update_version")
        .eq("user_id", currentUserId)
        .maybeSingle();

      // Only show to users who have finished onboarding
      if (data?.onboarding_completed !== true) {
        setUpdateModalChecked(true);
        return;
      }

      if (data?.last_seen_update_version !== CURRENT_UPDATE_VERSION) {
        setShowUpdateModal(true);
      }
    } catch (_err) {
      console.warn("[UPDATE MODAL] Check skipped due to transient issue.");
    }
    setUpdateModalChecked(true);
  }

  async function handleDismissUpdateModal() {
    setShowUpdateModal(false);
    if (userId) {
      await supabase
        .from("profile_stats")
        .update({ last_seen_update_version: CURRENT_UPDATE_VERSION })
        .eq("user_id", userId);
    }
  }

  async function checkDailyRecommendation(currentUserId: string) {
    try {
      const today = new Date().toISOString().slice(0, 10);

      // Gate: onboarding complete + update seen + not shown today
      const { data } = await supabase
        .from("profile_stats")
        .select("onboarding_completed, last_seen_update_version, daily_recommendation_shown, level_1_skipped_date")
        .eq("user_id", currentUserId)
        .maybeSingle();

      if (!data) return;
      if (data.onboarding_completed !== true) return;
      if (data.last_seen_update_version !== CURRENT_UPDATE_VERSION) return;
      if (data.daily_recommendation_shown === today) return;

      // Mark as shown for today immediately
      await supabase
        .from("profile_stats")
        .update({ daily_recommendation_shown: today })
        .eq("user_id", currentUserId);

      // Suppress Level 1 if user skipped one within the last 3 days
      let suppressLevel1 = false;
      if (data.level_1_skipped_date) {
        const skippedDate = new Date(data.level_1_skipped_date);
        const diffDays = Math.floor((Date.now() - skippedDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 3) suppressLevel1 = true;
      }

      // Build the recommendation
      const recommendation = await getDailyRecommendation(currentUserId, suppressLevel1);
      if (!recommendation) return;

      setDailyRecommendation(recommendation);
      setShowDailyRecommendation(true);
    } catch (err) {
      console.warn("[DAILY_RECOMMENDATION] Check skipped:", err);
    }
  }

  async function handleLevel1Skipped() {
    if (!userId) return;
    const today = new Date().toISOString().slice(0, 10);
    await supabase
      .from("profile_stats")
      .update({ level_1_skipped_date: today })
      .eq("user_id", userId);
  }

  // Re-fetch notifications on every page navigation
  useEffect(() => {
    if (userId) void fetchNotifications(userId);
  }, [pathname, userId]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          void fetchNotifications(userId);
          // Also refresh the message badge — DM notifications are created server-side
          // (service role) so this channel is guaranteed to fire when a new message arrives
          void refreshUnreadMessageCount(userId);
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [userId]);

  // Fetch unread message count by conversation, not by raw message rows
  useEffect(() => {
    if (!userId) return;
    void refreshUnreadMessageCount(userId);
  }, [pathname, userId]);

  useEffect(() => {
    if (!userId) return;

    const currentUserId = userId;
    const refresh = () => {
      void refreshUnreadMessageCount(currentUserId);
      if (isMessagesOpen) {
        void fetchConversationPreviews(currentUserId);
      }
      void fetchNotifications(currentUserId);
    };

    const interval = window.setInterval(refresh, 8000);
    window.addEventListener("focus", refresh);

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") refresh();
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userId, isMessagesOpen]);

  // Stable realtime channel — only depends on userId so it never tears down when the panel opens/closes
  useEffect(() => {
    if (!userId) return;
    const currentUserId = userId;

    const channel = supabase
      .channel(`messages-unread:${currentUserId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          void refreshUnreadMessageCount(currentUserId);
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [userId]);

  // Event listener for explicit mark-read / send signals from conversation pages
  useEffect(() => {
    if (!userId) return;
    const currentUserId = userId;

    function handleRefreshEvent(event: Event) {
      const customEvent = event as CustomEvent<{ conversationId?: string; markRead?: boolean }>;
      if (customEvent.detail?.markRead && customEvent.detail.conversationId) {
        const convId = customEvent.detail.conversationId;
        // Optimistic update using the cached set (works even if panel was never opened)
        if (_cachedUnreadConvoIds.current.has(convId)) {
          _cachedUnreadConvoIds.current.delete(convId);
          setUnreadMessageCount((count) => Math.max(0, count - 1));
        }
        setConversationPreviews((prev) =>
          prev.map((c) => (c.id === convId ? { ...c, hasUnread: false } : c))
        );
      }
      // Delay DB confirmation so mark-read API has time to complete first
      setTimeout(() => {
        void refreshUnreadMessageCount(currentUserId);
        if (isMessagesOpen) void fetchConversationPreviews(currentUserId);
      }, 1500);
    }

    window.addEventListener("bb:refresh-unread-messages", handleRefreshEvent);

    return () => {
      window.removeEventListener("bb:refresh-unread-messages", handleRefreshEvent);
    };
  }, [userId, isMessagesOpen]);

  // Capture the PWA install prompt (fires on Android/Chrome before page is interactive)
  useEffect(() => {
    function handler(e: Event) {
      e.preventDefault();
      deferredInstallPromptRef.current = e;
      setCanInstall(true);
    }
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const supported = "Notification" in window && "serviceWorker" in navigator && "PushManager" in window;
    setPushSupported(supported);
    setPushPermission(supported ? Notification.permission : "unsupported");
  }, []);

  useEffect(() => {
    if (!pushSupported || !userId || typeof window === "undefined") {
      setShowPushPrompt(false);
      return;
    }

    const dismissed = window.localStorage.getItem(getPushPromptDismissKey(userId)) === "1";
    const enabled = pushPermission === "granted" && pushSubscribed;
    setShowPushPrompt(!dismissed && !enabled);
  }, [pushPermission, pushSubscribed, pushSupported, userId]);

  useEffect(() => {
    if (!isLoggedIn || !userId || !pushSupported) return;

    let cancelled = false;
    const currentUserId = userId;

    async function syncPushState() {
      try {
        await navigator.serviceWorker.register("/service-worker.js");
        const worker = await navigator.serviceWorker.ready;
        const existingSubscription = await worker.pushManager.getSubscription();
        if (!cancelled) {
          setPushSubscribed(!!existingSubscription);
        }

        if (Notification.permission === "granted" && !existingSubscription) {
          await ensurePushSubscription(currentUserId);
        }
      } catch (error: any) {
        if (!cancelled) {
          setPushError(error?.message || "Could not initialize push alerts.");
        }
      }
    }

    void syncPushState();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, userId, pushSupported]);

  async function handleInstallPrompt() {
    if (!deferredInstallPromptRef.current) return;
    deferredInstallPromptRef.current.prompt();
    await deferredInstallPromptRef.current.userChoice;
    deferredInstallPromptRef.current = null;
    setCanInstall(false);
  }

  async function refreshUnreadMessageCount(_currentUserId: string) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return;
      const res = await fetch("/api/messages/unread-count", {
        headers: { authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) return;
      const json = await res.json();
      setUnreadMessageCount(json.count ?? 0);
      // Cache unread conversation IDs so fetchConversationPreviews can use them
      _cachedUnreadConvoIds.current = new Set(json.unreadConversationIds ?? []);
    } catch {
      // silently ignore — badge will retry on next tick
    }
  }

  async function fetchConversationPreviews(currentUserId: string) {
    setLoadingPreviews(true);
    try {
      // Step 1 — refresh unread IDs so we know exactly which convos have new messages
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        try {
          const res = await fetch("/api/messages/unread-count", {
            headers: { authorization: `Bearer ${session.access_token}` },
          });
          if (res.ok) {
            const json = await res.json();
            setUnreadMessageCount(json.count ?? 0);
            _cachedUnreadConvoIds.current = new Set(json.unreadConversationIds ?? []);
          }
        } catch { /* ignore */ }
      }

      const unreadIds = [..._cachedUnreadConvoIds.current];

      // Step 2 — fetch unread conversations (by ID) + top 5 recent, in parallel
      const [unreadConvosResult, recentConvosResult] = await Promise.all([
        unreadIds.length > 0
          ? supabase
              .from("conversations")
              .select("id, user_id_1, user_id_2, last_message_at, last_message_preview")
              .in("id", unreadIds)
              .order("last_message_at", { ascending: false, nullsFirst: false })
          : Promise.resolve({ data: [] as any[] }),
        supabase
          .from("conversations")
          .select("id, user_id_1, user_id_2, last_message_at, last_message_preview")
          .or(`user_id_1.eq.${currentUserId},user_id_2.eq.${currentUserId}`)
          .order("last_message_at", { ascending: false, nullsFirst: false })
          .limit(5),
      ]);

      // Step 3 — merge: unread first, then recent (deduplicated), max 7 shown
      const unreadConvos = (unreadConvosResult.data || []) as any[];
      const recentConvos = (recentConvosResult.data || []) as any[];
      const seen = new Set(unreadConvos.map((c: any) => c.id));
      const merged = [
        ...unreadConvos,
        ...recentConvos.filter((c: any) => !seen.has(c.id)),
      ].slice(0, 7);

      if (merged.length === 0) { setConversationPreviews([]); return; }

      const otherIds = merged.map((c: any) => c.user_id_1 === currentUserId ? c.user_id_2 : c.user_id_1);
      const [profileResult, replyStatusResult] = await Promise.all([
        supabase
          .from("profile_stats")
          .select("user_id, display_name, username, profile_image_url, member_badge, is_paid, current_streak")
          .in("user_id", [...new Set(otherIds)]),
        supabase
          .from("messages")
          .select("conversation_id")
          .in("conversation_id", merged.map((c: any) => c.id))
          .neq("sender_id", currentUserId),
      ]);

      const profiles = profileResult.data || [];
      const unreadConvoIds = _cachedUnreadConvoIds.current;
      const repliedConvoIds = new Set((replyStatusResult.data || []).map((m: any) => m.conversation_id));

      const previews: Array<{
        id: string;
        otherUserId: string;
        otherUserName: string;
        otherUserImage: string | null;
        otherUserBadge: string | null;
        otherUserIsPaid: boolean;
        otherUserCurrentStreak: number | null;
        lastMessagePreview: string | null;
        lastMessageAt: string | null;
        hasUnread: boolean;
        bucket: "primary" | "general";
      }> = merged.map((c: any) => {
        const otherId = c.user_id_1 === currentUserId ? c.user_id_2 : c.user_id_1;
        const profile = profiles.find((p: any) => p.user_id === otherId);
        return {
          id: c.id,
          otherUserId: otherId,
          otherUserName: profile?.display_name || profile?.username || "Bible Buddy",
          otherUserImage: profile?.profile_image_url || null,
          otherUserBadge: profile?.member_badge || null,
          otherUserIsPaid: profile?.is_paid === true,
          otherUserCurrentStreak: profile?.current_streak ?? null,
          lastMessagePreview: c.last_message_preview
            ? extractLegacyDirectMessageAction(c.last_message_preview).body
            : null,
          lastMessageAt: c.last_message_at || null,
          hasUnread: unreadConvoIds.has(c.id),
          bucket: repliedConvoIds.has(c.id) ? "primary" : "general",
        };
      });

      previews.sort((a, b) => {
        if (a.bucket !== b.bucket) return a.bucket === "primary" ? -1 : 1;
        if (a.hasUnread !== b.hasUnread) return a.hasUnread ? -1 : 1;
        return (b.lastMessageAt ?? "").localeCompare(a.lastMessageAt ?? "");
      });

      setConversationPreviews(previews);
    } finally {
      setLoadingPreviews(false);
    }
  }

  function formatMessageTime(dateStr: string | null): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  function cleanNotificationMessageBody(actorName: string | null | undefined, message: string | null | undefined) {
    let body = (message || "").trim();

    for (let i = 0; i < 4; i += 1) {
      body = body.replace(/^\s*from bible buddy[:\s-]*/i, "").trim();

      if (actorName) {
        const actorPrefix = `${actorName} `.toLowerCase();
        if (body.toLowerCase().startsWith(actorPrefix)) {
          body = body.slice(actorName.length + 1).trim();
        }
      }
    }

    return body || "sent you a new alert";
  }

  function renderNotificationCopy(notif: {
    from_user_name: string;
    message: string | null;
  }) {
    const actorName = notif.from_user_name?.trim() || "";
    const body = cleanNotificationMessageBody(actorName || null, notif.message);

    if (!actorName) {
      return body;
    }

    return `${actorName} ${body}`;
  }

  async function triggerBuddyCelebration(currentUserId: string, buddyUserId: string) {
    const { data: profiles } = await supabase
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url")
      .in("user_id", [currentUserId, buddyUserId]);
    if (!profiles || profiles.length < 2) return;
    const me = profiles.find((p) => p.user_id === currentUserId);
    const buddy = profiles.find((p) => p.user_id === buddyUserId);
    if (!me || !buddy) return;
    setCelebrationData({ me, buddy });
    setShowBuddyCelebration(true);
  }

  function getBuddyCelebrationSeenKey(notificationId: string) {
    return `bb:buddy-celebration-seen:${notificationId}`;
  }

  async function fetchNotifications(currentUserId: string) {
    const { data } = await supabase
      .from("notifications")
      .select("id, type, from_user_id, from_user_name, article_slug, comment_id, post_id, message, is_read, created_at")
      .eq("user_id", currentUserId)
      .order("created_at", { ascending: false })
      .limit(40);
    if (data) {
      const visibleNotifications = data
        .filter((n) => n.type !== "direct_message")
        .filter((n) => !n.from_user_id || n.from_user_id !== currentUserId)
        .slice(0, 20);
      setNotifications(visibleNotifications);
      // Trigger celebration for the sender when they see an unread buddy_accepted notification
      const unreadAccepted = visibleNotifications.find(
        (n) =>
          n.type === "buddy_accepted" &&
          !n.is_read &&
          n.from_user_id &&
          !shownCelebrationIds.current.has(n.id) &&
          (typeof window === "undefined" || window.localStorage.getItem(getBuddyCelebrationSeenKey(n.id)) !== "1")
      );
      if (unreadAccepted && unreadAccepted.from_user_id) {
        shownCelebrationIds.current.add(unreadAccepted.id);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(getBuddyCelebrationSeenKey(unreadAccepted.id), "1");
        }
        // Mark it read silently
        void supabase.from("notifications").update({ is_read: true }).eq("id", unreadAccepted.id);
        setNotifications((prev) =>
          prev.map((n) => n.id === unreadAccepted.id ? { ...n, is_read: true } : n)
        );
        void triggerBuddyCelebration(currentUserId, unreadAccepted.from_user_id);
      }
    }
  }

  async function handleBuddyRequestAccept(notif: typeof notifications[0]) {
    if (!userId || !notif.from_user_id || buddyActionLoadingId) return;
    setBuddyActionLoadingId(notif.id);
    try {
      // Find the pending buddy request
      const { data: req } = await supabase
        .from("buddy_requests")
        .select("id")
        .eq("sender_id", notif.from_user_id)
        .eq("receiver_id", userId)
        .eq("status", "pending")
        .maybeSingle();

      if (req) {
        await supabase
          .from("buddy_requests")
          .update({ status: "accepted" })
          .eq("id", req.id);

        // Log feed activity
        void supabase.rpc("log_feed_activity", {
          p_activity_type: "buddy_added",
          p_activity_data: {
            buddy_id: notif.from_user_id,
            buddy_name: notif.from_user_name || "Bible Buddy",
          },
          p_is_public: true,
        });
      }

      // Mark notification as read
      await supabase.from("notifications").update({ is_read: true }).eq("id", notif.id);
      setNotifications((prev) =>
        prev.map((n) => n.id === notif.id ? { ...n, is_read: true, type: "buddy_accepted_done" } : n)
      );
      setIsNotifOpen(false);

      // Show celebration for the receiver
      if (notif.from_user_id) {
        void triggerBuddyCelebration(userId, notif.from_user_id);
      }
    } finally {
      setBuddyActionLoadingId(null);
    }
  }

  async function handleBuddyRequestDecline(notif: typeof notifications[0]) {
    if (!userId || !notif.from_user_id || buddyActionLoadingId) return;
    setBuddyActionLoadingId(notif.id);
    try {
      // Delete the buddy request
      await supabase
        .from("buddy_requests")
        .delete()
        .eq("sender_id", notif.from_user_id)
        .eq("receiver_id", userId)
        .eq("status", "pending");

      // Mark notification as read
      await supabase.from("notifications").update({ is_read: true }).eq("id", notif.id);
      setNotifications((prev) =>
        prev.map((n) => n.id === notif.id ? { ...n, is_read: true, type: "buddy_declined_done" } : n)
      );
    } finally {
      setBuddyActionLoadingId(null);
    }
  }

  async function markAllRead() {
    if (!userId) return;
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", userId)
      .eq("is_read", false);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  }

  async function handleNotifClick(notif: typeof notifications[0]) {
    // Mark this one as read
    await supabase.from("notifications").update({ is_read: true }).eq("id", notif.id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, is_read: true } : n))
    );
    setIsNotifOpen(false);

    const buildHrefWithTargets = (baseHref: string) => {
      const url = new URL(baseHref, "https://biblebuddy.local");
      if (notif.post_id) url.searchParams.set("post", notif.post_id);
      if (notif.comment_id) url.searchParams.set("comment", notif.comment_id);
      return `${url.pathname}${url.search}${url.hash}`;
    };

    // Social feed notifications deep-link to the exact post/comment.
    if (
      notif.type === "buddy_posted" ||
      notif.type === "feed_post_liked" ||
      notif.type === "feed_post_commented" ||
      notif.type === "feed_post_replied"
    ) {
      router.push(buildHrefWithTargets("/bb-feed"));
      return;
    }
    if (notif.article_slug?.startsWith("/study-groups/")) {
      router.push(buildHrefWithTargets(notif.article_slug));
      return;
    }
    const hash = notif.comment_id ? `#comment-${notif.comment_id}` : "";
    router.push(`${notif.article_slug ?? "/dashboard"}${hash}`);
  }

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      setIsLoggedIn(!!session);
      setUserEmail(session?.user?.email ?? null);
      
      // Set userId and username for feedback system
      if (session?.user?.id) {
        setUserId(session.user.id);
        const meta: any = session.user.user_metadata || {};
        const extractedUsername =
          meta.firstName ||
          meta.first_name ||
          (session.user.email ? session.user.email.split("@")[0] : null) ||
          "User";
        setUsername(extractedUsername);
        void checkOnboardingStatus(session.user.id);
        void checkUpdateStatus(session.user.id);
        if (DAILY_RECOMMENDATIONS_ENABLED) {
          void checkDailyRecommendation(session.user.id);
        }
        void loadHeaderDashboardStats(session.user.id);
        void fetchNotifications(session.user.id);
        void refreshUnreadMessageCount(session.user.id);
      } else {
        setUserId(null);
        setUsername("");
        setShowOnboardingModal(false);
        setFeatureToursEnabled(false);
        setInitialTrafficSource(null);
        setInitialBibleExperienceLevel(null);
        setNotifications([]);
        setHeaderCurrentLevel(1);
        setHeaderCurrentStreak(0);
        setHeaderProfileImageUrl(null);
      }

      // Sync notes count on initial session check if user is logged in (non-blocking)
      if (session?.user?.id) {
        // Run all sync/tracking in background - don't block UI
        (async () => {
          try {
            await runBackgroundSessionSync(session.user.id);
          } catch (err) {
            console.warn("[APPSHELL] Background sync skipped due to transient issue.");
          }
        })();
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setIsLoggedIn(!!session);
        setUserEmail(session?.user?.email ?? null);
        
        // Set userId and username for feedback system
        if (session?.user?.id) {
          setUserId(session.user.id);
          const meta: any = session.user.user_metadata || {};
          const extractedUsername =
            meta.firstName ||
            meta.first_name ||
            (session.user.email ? session.user.email.split("@")[0] : null) ||
            "User";
          setUsername(extractedUsername);
          void checkOnboardingStatus(session.user.id);
          void checkUpdateStatus(session.user.id);
          void loadHeaderDashboardStats(session.user.id);
          void fetchNotifications(session.user.id);
          void refreshUnreadMessageCount(session.user.id);
        } else {
          setUserId(null);
          setUsername("");
          setShowOnboardingModal(false);
          setFeatureToursEnabled(false);
          setInitialTrafficSource(null);
          setInitialBibleExperienceLevel(null);
          setNotifications([]);
          setHeaderCurrentLevel(1);
          setHeaderCurrentStreak(0);
          setHeaderProfileImageUrl(null);
        }

        // Sync notes count when user logs in or session changes (non-blocking)
        if (session?.user?.id) {
          // Run all sync/tracking in background - don't block UI
          (async () => {
            try {
              await runBackgroundSessionSync(session.user.id);
            } catch (err) {
              console.warn("[APPSHELL] Background sync skipped due to transient issue.");
            }
          })();
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userId || pathname !== "/dashboard") return;

    void loadHeaderDashboardStats(userId);

    const refresh = () => {
      void loadHeaderDashboardStats(userId);
    };

    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
    };
  }, [pathname, userId]);

  useEffect(() => {
    function handleDashboardStatsSync(event: Event) {
      const customEvent = event as CustomEvent<{ level?: number; streak?: number }>;
      if (typeof customEvent.detail?.level === "number" && customEvent.detail.level > 0) {
        setHeaderCurrentLevel(customEvent.detail.level);
      }
      if (typeof customEvent.detail?.streak === "number" && customEvent.detail.streak >= 0) {
        setHeaderCurrentStreak(customEvent.detail.streak);
      }
    }

    window.addEventListener("bb:dashboard-stats-sync", handleDashboardStatsSync as EventListener);
    return () => {
      window.removeEventListener("bb:dashboard-stats-sync", handleDashboardStatsSync as EventListener);
    };
  }, []);

  // Treat iframe-embedded pages the same as bare pages (no shell/nav)
  const isBarePage = HIDDEN_ROUTES.includes(pathname ?? "/") || isEmbedded;

  const isAdmin = isLoggedIn && userEmail === "moorelouis3@gmail.com";

  const shouldShowNavMenu = isLoggedIn && !isBarePage && pathname && !pathname.startsWith("/dashboard");
  const breadcrumbItems = buildBreadcrumbs(pathname);
  const shouldShowBreadcrumbs = isLoggedIn && !isBarePage && breadcrumbItems.length > 0;
  const showDashboardStatusButtons = Boolean(isLoggedIn && pathname === "/dashboard");

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target as Node)
      ) {
        setIsNavMenuOpen(false);
      }
    }

    if (isProfileMenuOpen || isNavMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isProfileMenuOpen, isNavMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    if (isNotifOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isNotifOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setIsMessagesOpen(false);
      }
    }
    if (isMessagesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMessagesOpen]);

  // Close dropdowns on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (isProfileMenuOpen) setIsProfileMenuOpen(false);
        if (isNavMenuOpen) setIsNavMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isProfileMenuOpen, isNavMenuOpen]);

  // Check feedback eligibility and show modal directly (no banner)
  useEffect(() => {
    async function checkFeedbackEligibility() {
      if (!userId || feedbackChecked || showFeedbackModal) {
        return;
      }

      try {
        // Check if user has 5+ total actions
        const { data: profileStats, error: statsError } = await supabase
          .from("profile_stats")
          .select("total_actions")
          .eq("user_id", userId)
          .maybeSingle();

        if (statsError) {
          console.warn("[FEEDBACK] Profile stats unavailable; skipping feedback check.");
          setFeedbackChecked(true);
          return;
        }

        const totalActions = profileStats?.total_actions || 0;
        
        if (totalActions < 5) {
          setFeedbackChecked(true);
          return;
        }

        // Check if user has already submitted feedback
        const { data: existingFeedback, error: feedbackError } = await supabase
          .from("user_feedback")
          .select("happiness_rating, usefulness_rating, usage_frequency, recommendation_likelihood, last_dismissed_at, permanently_dismissed")
          .eq("user_id", userId)
          .maybeSingle();

        if (feedbackError && feedbackError.code !== 'PGRST116') {
          console.warn("[FEEDBACK] Feedback lookup unavailable; skipping feedback modal.");
          setFeedbackChecked(true);
          return;
        }

        // Check if user has submitted feedback (has any rating filled)
        const hasSubmitted = existingFeedback?.happiness_rating || 
                            existingFeedback?.usefulness_rating || 
                            existingFeedback?.usage_frequency || 
                            existingFeedback?.recommendation_likelihood;
        
        if (hasSubmitted) {
          // User has submitted feedback, never show again
          setFeedbackChecked(true);
          return;
        }

        // If user clicked "No" (permanently dismissed), never show again
        if (existingFeedback?.permanently_dismissed) {
          setFeedbackChecked(true);
          return;
        }

        // If user clicked "Do later", check if 30 days have passed
        if (existingFeedback?.last_dismissed_at && !existingFeedback?.permanently_dismissed) {
          const dismissedDate = new Date(existingFeedback.last_dismissed_at);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          if (dismissedDate > thirtyDaysAgo) {
            // Still within 30 day window, don't show
            setFeedbackChecked(true);
            return;
          }
        }

        // All conditions met - show modal directly
        setShowFeedbackModal(true);
        setFeedbackChecked(true);
      } catch (err) {
        console.warn("[FEEDBACK] Eligibility check skipped due to transient issue.");
        setFeedbackChecked(true);
      }
    }

    if (userId && isLoggedIn) {
      checkFeedbackEligibility();
    }
  }, [userId, isLoggedIn, feedbackChecked, showFeedbackModal]);

  useEffect(() => {
    if (!userId || !isLoggedIn || showOnboardingModal) return;
    void checkFullNameRequirement(userId);
  }, [userId, isLoggedIn, showOnboardingModal]);

  useEffect(() => {
    if (!isLoggedIn || !userId || !showOnboardingModal) return;
    if (!pathname) return;
    if (pathname === "/dashboard") return;
    if (HIDDEN_ROUTES.includes(pathname)) return;
    router.replace("/dashboard");
  }, [isLoggedIn, userId, showOnboardingModal, pathname, router]);

  return (
    <FeatureRenderPriorityProvider value={{ featureToursEnabled }}>

      {/* ONBOARDING MODAL */}
      {userId && (
        <OnboardingModal
          isOpen={showOnboardingModal}
          userId={userId}
          initialTrafficSource={initialTrafficSource}
          initialBibleExperienceLevel={initialBibleExperienceLevel}
          canInstall={canInstall}
          onInstallPrompt={handleInstallPrompt}
          onFinished={(upgrade) => {
            setShowOnboardingModal(false);
            setFeatureToursEnabled(true);
            if (upgrade) {
              router.push("/upgrade");
            } else {
              router.replace("/dashboard");
              router.refresh();
            }
          }}
        />
      )}

      {isLoggedIn && userId && !showOnboardingModal && showFullNameModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-md rounded-3xl border border-[#d9eadf] bg-[#f8fcf9] p-6 shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4a9b6f]">One-time setup</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">Add your first and last name</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Add your full name so Buddies can recognize you more easily in groups, messages, and profiles.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">First name</label>
                <input
                  type="text"
                  value={fullNameFirst}
                  onChange={(event) => setFullNameFirst(event.target.value)}
                  placeholder="First name"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#4a9b6f]/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Last name</label>
                <input
                  type="text"
                  value={fullNameLast}
                  onChange={(event) => setFullNameLast(event.target.value)}
                  placeholder="Last name"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#4a9b6f]/30"
                />
              </div>
            </div>

            {fullNameError && <p className="mt-3 text-sm text-red-500">{fullNameError}</p>}

            <button
              type="button"
              onClick={() => void handleSaveRequiredFullName()}
              disabled={fullNameSaving}
              className="mt-5 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white transition disabled:opacity-60"
              style={{ backgroundColor: "#4a9b6f" }}
            >
              {fullNameSaving ? "Saving..." : "Save full name"}
            </button>
          </div>
        </div>
      )}


      {/* FEEDBACK MODAL */}
      {isLoggedIn && userId && !showOnboardingModal && !showFullNameModal && (
        <FeedbackModal
          userId={userId}
          username={username}
          isOpen={showFeedbackModal}
          onClose={() => {
            setShowFeedbackModal(false);
            // Don't dismiss banner on close - only on "No"
          }}
          onDoLater={() => {
            setShowFeedbackModal(false);
            // Banner stays visible
          }}
          onNo={() => {
            setShowFeedbackModal(false);
            setBannerDismissed(true); // Permanently hide banner
          }}
        />
      )}

      {/* GLOBAL UPDATE MODAL */}
      {isLoggedIn && userId && !showOnboardingModal && !showFullNameModal && (
        <GlobalUpdateModal
          isOpen={showUpdateModal}
          onDismiss={handleDismissUpdateModal}
        />
      )}

      {/* DAILY RECOMMENDATION MODAL */}
      {DAILY_RECOMMENDATIONS_ENABLED && isLoggedIn && userId && !showOnboardingModal && !showFullNameModal && !showUpdateModal && showDailyRecommendation && dailyRecommendation && (
        <DailyRecommendationModal
          greeting={dailyRecommendation.greeting}
          contextLine={dailyRecommendation.contextLine}
          recommendationLine={dailyRecommendation.recommendationLine}
          primaryButtonText={dailyRecommendation.primaryButtonText}
          primaryButtonHref={dailyRecommendation.primaryButtonHref}
          onClose={() => setShowDailyRecommendation(false)}
          onSecondary={dailyRecommendation.level === 1 ? handleLevel1Skipped : undefined}
        />
      )}

      {/* CONTACT US MODAL */}
      {isLoggedIn && userId && !showOnboardingModal && !showFullNameModal && (
        <ContactUsModal
          userId={userId}
          username={username}
          isOpen={showContactUsModal}
          onClose={() => setShowContactUsModal(false)}
        />
      )}

      {/* NAVBAR (hidden on landing/login/signup) */}
      {!isBarePage && (
        <header className="w-full bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                {/* Logo removed as requested */}
                <div>
                  <div className="text-sm font-bold text-gray-900 tracking-tight">
                    Bible Buddy
                  </div>
                </div>
              </Link>

            </div>

            <div className="flex items-center gap-2">
              {/* NAVIGATION DROPDOWN MENU */}
              {shouldShowNavMenu && (
                <div className="relative" ref={navMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-all duration-150 active:scale-[0.98] shadow-sm"
                    aria-label="Navigation menu"
                    aria-expanded={isNavMenuOpen}
                  >
                    Navigation
                  </button>

                  {/* NAVIGATION DROPDOWN */}
                  {isNavMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-50">
                      {APP_NAV_ITEMS.map((item) => {
                        const active = isNavItemActive(pathname, item);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={(event) => {
                              if (active) {
                                event.preventDefault();
                              } else {
                                setIsNavMenuOpen(false);
                              }
                            }}
                            className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                              active ? item.activeClasses : item.hoverClasses
                            }`}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {showDashboardStatusButtons && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("bb:dashboard-open-streak-info"));
                    }}
                    className="relative flex h-9 items-center gap-1.5 rounded-full bg-gray-200 px-3 hover:bg-gray-300 text-gray-700 transition-colors"
                    aria-label={`Open streak details for ${headerCurrentStreak} day streak`}
                    title={`${headerCurrentStreak} day streak`}
                  >
                    <span
                      className={`text-base leading-none ${headerCurrentStreak >= 30 ? "" : "grayscale opacity-60"}`}
                      aria-hidden="true"
                    >
                      🔥
                    </span>
                    <span className="text-xs font-semibold leading-none text-gray-700">
                      {headerCurrentStreak}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("bb:dashboard-open-level-info"));
                    }}
                    className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-sm font-semibold text-gray-700 transition-colors"
                    aria-label={`Open level details for level ${headerCurrentLevel}`}
                    title={`Level ${headerCurrentLevel}`}
                  >
                    {headerCurrentLevel}
                  </button>
                </>
              )}

              {/* NOTIFICATION BELL */}
              {isLoggedIn && (
                <div className="relative" ref={notifRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsNotifOpen(!isNotifOpen);
                      if (!isNotifOpen && userId) fetchNotifications(userId);
                    }}
                    className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                    aria-label="Notifications"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {visibleUnreadNotificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold">
                        {visibleUnreadNotificationCount > 9 ? "9+" : visibleUnreadNotificationCount}
                      </span>
                    )}
                  </button>

                  {isNotifOpen && (
                    <div className="fixed top-16 left-4 right-4 sm:absolute sm:top-full sm:left-auto sm:right-0 sm:mt-2 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <span className="font-semibold text-sm text-gray-900">Notifications</span>
                        {visibleUnreadNotificationCount > 0 && (
                          <button onClick={markAllRead} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                            Mark all read
                          </button>
                        )}
                      </div>
                      {pushSupported && showPushPrompt && (
                        <div
                          className={`px-4 py-3 border-b border-gray-100 bg-[#f8fbf8] transition-all duration-200 ${
                            pushPromptClosing ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-900">Phone Push Alerts</p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {pushPermission === "granted" && pushSubscribed
                                  ? "Push alerts are on for this device."
                                  : "Turn on push alerts so new Bible Buddy notifications reach this device."}
                              </p>
                            </div>
                            {!(pushPermission === "granted" && pushSubscribed) && (
                              <button
                                type="button"
                                onClick={handleEnablePushAlerts}
                                disabled={pushLoading}
                                className="px-3 py-2 rounded-lg text-xs font-semibold text-white transition disabled:opacity-60"
                                style={{ backgroundColor: "#4a9b6f" }}
                              >
                                {pushLoading ? "Saving..." : "Enable"}
                              </button>
                            )}
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-3">
                            <button
                              type="button"
                              onClick={() => hidePushPrompt(true)}
                              className="text-xs font-medium text-gray-400 transition hover:text-gray-600"
                            >
                              No thanks
                            </button>
                            {pushPermission === "granted" && pushSubscribed && (
                              <span className="text-[11px] font-medium text-[#4a9b6f]">Saved for this device</span>
                            )}
                          </div>
                          {pushError && <p className="text-xs text-red-500 mt-2">{pushError}</p>}
                        </div>
                      )}
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="flex flex-col items-center justify-center px-5 py-7 text-center">
                            <div className="rounded-full bg-[#f4f8ff] p-2 shadow-sm">
                              <LouisAvatar mood="wave" size={44} />
                            </div>
                            <p className="mt-3 text-sm font-semibold text-gray-800">No notifications yet</p>
                            <p className="mt-1 text-xs leading-relaxed text-gray-500">
                              Louis will keep this spot warm until your next update comes in.
                            </p>
                          </div>
                        ) : (
                          notifications.map((notif) => {
                            // Friendly label for the notification source
                            const notifSourceLabel =
                              notif.type === "buddy_posted" ? "Community" :
                              notif.type === "feed_post_liked" ? "Community" :
                              notif.type === "feed_post_commented" ? "Community" :
                              notif.type === "feed_post_replied" ? "Community" :
                              notif.article_slug?.startsWith("/study-groups/")
                                ? "Study Group"
                                : notif.article_slug
                                  ? notif.article_slug.split("/").filter(Boolean).pop()?.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") ?? ""
                                  : "";
                            const timeStr = new Date(notif.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

                            // Buddy request — show Accept / Not Now buttons
                            if (notif.type === "buddy_request") {
                              const isLoading = buddyActionLoadingId === notif.id;
                              return (
                                <div
                                  key={notif.id}
                                  className={`px-4 py-3 border-b border-gray-50 ${!notif.is_read ? "bg-blue-50" : ""}`}
                                >
                                  <p className="text-sm text-gray-900 font-medium">{renderNotificationCopy(notif)}</p>
                                  <p className="text-xs text-gray-400 mt-0.5 mb-2">{timeStr}</p>
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      disabled={isLoading}
                                      onClick={() => handleBuddyRequestAccept(notif)}
                                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-white transition disabled:opacity-60"
                                      style={{ backgroundColor: "#4a9b6f" }}
                                    >
                                      {isLoading ? "..." : "Accept"}
                                    </button>
                                    <button
                                      type="button"
                                      disabled={isLoading}
                                      onClick={() => handleBuddyRequestDecline(notif)}
                                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 hover:bg-gray-200 transition disabled:opacity-60"
                                    >
                                      Not Now
                                    </button>
                                  </div>
                                </div>
                              );
                            }

                            // Buddy accepted — no action needed, just show message
                            if (notif.type === "buddy_accepted" || notif.type === "buddy_accepted_done" || notif.type === "buddy_declined_done") {
                              return (
                                <div
                                  key={notif.id}
                                  className={`px-4 py-3 border-b border-gray-50 ${!notif.is_read ? "bg-blue-50" : ""}`}
                                >
                                  <p className="text-sm text-gray-900 font-medium">{renderNotificationCopy(notif)}</p>
                                  <p className="text-xs text-gray-400 mt-0.5">{timeStr}</p>
                                </div>
                              );
                            }

                            // Default notification — clickable
                            return (
                              <button
                                key={notif.id}
                                type="button"
                                onClick={() => handleNotifClick(notif)}
                                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notif.is_read ? "bg-blue-50" : ""}`}
                              >
                                <p className="text-sm text-gray-900 font-medium">{renderNotificationCopy(notif)}</p>
                                {notifSourceLabel && <p className="text-xs text-blue-600 mt-0.5">{notifSourceLabel}</p>}
                                <p className="text-xs text-gray-400 mt-0.5">{timeStr}</p>
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MESSAGES PANEL */}
              {isLoggedIn && (
                <div className="relative" ref={messagesRef}>
                  <button
                    type="button"
                    onClick={() => {
                      const opening = !isMessagesOpen;
                      setIsMessagesOpen(opening);
                      if (opening && userId) void fetchConversationPreviews(userId);
                    }}
                    className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                    aria-label="Messages"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {unreadMessageCount > 0 && (
                      <span
                        className="absolute -top-1.5 -right-1.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full border-2 border-white text-[10px] leading-none font-bold flex items-center justify-center text-white"
                        style={{ backgroundColor: "#4a9b6f" }}
                        aria-label={`${unreadMessageCount} unread message${unreadMessageCount === 1 ? "" : "s"}`}
                      >
                        {unreadMessageCount > 99 ? "99+" : unreadMessageCount}
                      </span>
                    )}
                  </button>

                  {isMessagesOpen && (
                    <div className="fixed top-16 left-4 right-4 sm:absolute sm:top-full sm:left-auto sm:right-0 sm:mt-2 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <span className="font-semibold text-sm text-gray-900">Messages</span>
                        <Link
                          href="/messages"
                          onClick={() => setIsMessagesOpen(false)}
                          className="text-xs font-medium"
                          style={{ color: "#4a9b6f" }}
                        >
                          See all
                        </Link>
                      </div>

                      <div className="max-h-80 overflow-y-auto">
                        {loadingPreviews ? (
                          <p className="text-sm text-gray-400 text-center py-6">Loading...</p>
                        ) : conversationPreviews.length === 0 ? (
                          <div className="text-center py-8 px-4">
                            <div className="mx-auto flex w-fit rounded-full bg-[#eef7f1] p-2 shadow-sm">
                              <LouisAvatar mood="hands" size={48} />
                            </div>
                            <p className="text-sm font-semibold text-gray-800 mt-3 mb-1">No messages yet</p>
                            <p className="text-xs text-gray-500 leading-relaxed">
                              Add a few Buddies and Louis will help this inbox start feeling alive.
                            </p>
                          </div>
                        ) : (
                          conversationPreviews.map((convo, index) => {
                            const initials = convo.otherUserName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                            const COLORS = ["#4a9b6f","#5b8dd9","#c97b3e","#9b6bb5","#d45f7a","#3ea8a8"];
                            let hash = 0;
                            for (let i = 0; i < convo.otherUserId.length; i++) hash = convo.otherUserId.charCodeAt(i) + ((hash << 5) - hash);
                            const avatarBg = COLORS[Math.abs(hash) % COLORS.length];
                            const previousBucket = index > 0 ? conversationPreviews[index - 1]?.bucket : null;
                            const showBucketLabel = index === 0 || previousBucket !== convo.bucket;

                            return (
                              <div key={convo.id}>
                                {showBucketLabel && (
                                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-2">
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                                      {convo.bucket === "primary" ? "Primary" : "General"}
                                    </span>
                                  </div>
                                )}
                                <div
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => {
                                    if (convo.hasUnread) {
                                      setConversationPreviews((prev) =>
                                        prev.map((c) => (c.id === convo.id ? { ...c, hasUnread: false } : c))
                                      );
                                      setUnreadMessageCount((count) => Math.max(0, count - 1));
                                    }
                                    setIsMessagesOpen(false);
                                    setOpenConversationId(convo.id);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      if (convo.hasUnread) {
                                        setConversationPreviews((prev) =>
                                          prev.map((c) => (c.id === convo.id ? { ...c, hasUnread: false } : c))
                                        );
                                        setUnreadMessageCount((count) => Math.max(0, count - 1));
                                      }
                                      setIsMessagesOpen(false);
                                      setOpenConversationId(convo.id);
                                    }
                                  }}
                                  className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left cursor-pointer ${convo.hasUnread ? "bg-green-50" : ""}`}
                                >
                                  <div className="flex-shrink-0">
                                    {convo.otherUserImage ? (
                                      <img src={convo.otherUserImage} alt={convo.otherUserName} className="w-10 h-10 rounded-full object-cover" />
                                    ) : (
                                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: avatarBg }}>
                                        {initials}
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="flex min-w-0 items-center gap-2">
                                        <Link
                                          href={`/profile/${convo.otherUserId}`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setIsMessagesOpen(false);
                                          }}
                                          className={`text-sm truncate hover:underline ${convo.hasUnread ? "font-bold text-gray-900" : "font-medium text-gray-800"}`}
                                        >
                                          {convo.otherUserName}
                                        </Link>
                                        <StreakFlameBadge currentStreak={convo.otherUserCurrentStreak} />
                                        <UserBadge customBadge={convo.otherUserBadge} isPaid={convo.otherUserIsPaid} />
                                      </div>
                                      <span className="text-xs text-gray-400 flex-shrink-0">{formatMessageTime(convo.lastMessageAt)}</span>
                                    </div>
                                    <p className={`text-xs truncate mt-0.5 ${convo.hasUnread ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                                      {convo.lastMessagePreview || "No messages yet"}
                                    </p>
                                  </div>

                                  {convo.hasUnread && (
                                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#4a9b6f" }} />
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      <div className="border-t border-gray-100 px-4 py-2.5">
                        <Link
                          href="/messages"
                          onClick={() => setIsMessagesOpen(false)}
                          className="block text-center text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                        >
                          View all messages →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PROFILE DROPDOWN MENU */}
              {isLoggedIn && (
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center justify-center w-9 h-9 overflow-hidden rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                  aria-label="Profile menu"
                  aria-expanded={isProfileMenuOpen}
                >
                  {headerProfileImageUrl && !headerProfileImageFailed ? (
                    <img
                      src={headerProfileImageUrl}
                      alt="Your profile"
                      className="h-full w-full object-cover"
                      onError={() => setHeaderProfileImageFailed(true)}
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: headerAvatarBg }}
                    >
                      {headerProfileInitials}
                    </div>
                  )}
                </button>

                {/* DROPDOWN MENU */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {/* HOME */}
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname?.startsWith("/dashboard")
                          ? "bg-sky-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Home
                    </Link>

                    {/* PROFILE */}
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname?.startsWith("/profile")
                          ? "bg-sky-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Profile
                    </Link>

                    {/* SETTINGS */}
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname?.startsWith("/settings")
                          ? "bg-sky-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Settings
                    </Link>

                    {/* CONTACT US */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setShowContactUsModal(true);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      👉 Contact Us
                    </button>

                    {/* HOW TO USE BIBLEBUDDY */}
                    <Link
                      href="/lessons"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname?.startsWith("/lessons")
                          ? "bg-sky-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      How to Use
                    </Link>

                    {/* UPDATES */}
                    <Link
                      href="/updates"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname?.startsWith("/updates")
                          ? "bg-sky-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Updates
                    </Link>



                    {/* ANALYTICS (ADMIN ONLY) */}
                    {isAdmin && (
                      <>
                        <Link
                          href="/admin/analytics"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className={`block px-4 py-2 text-sm ${
                            pathname?.startsWith("/admin/analytics")
                              ? "bg-sky-100 text-black font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          Analytics
                        </Link>
                        <Link
                          href="/admin/little-louis"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className={`block px-4 py-2 text-sm ${
                            pathname?.startsWith("/admin/little-louis")
                              ? "bg-sky-100 text-black font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          Little Louis
                        </Link>
                        <Link
                          href="/comments-admin"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className={`block px-4 py-2 text-sm ${
                            pathname === "/comments-admin"
                              ? "bg-sky-100 text-black font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          Comments Admin
                        </Link>
                      </>
                    )}

                    {/* DIVIDER */}
                    <div className="border-t border-gray-200 my-1" />

                    {/* LOGOUT */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            </div>
          </div>
        </header>
      )}

      {/* PAGE CONTENT */}
      <main className={!isBarePage ? "pt-2 pb-2 bg-gray-50 min-h-screen" : ""}>
        {shouldShowBreadcrumbs && (
          <div className="max-w-5xl mx-auto px-4 pt-2">
            <BibleStudyBreadcrumb items={breadcrumbItems} className="mb-2" />
          </div>
        )}
        {children}
      </main>

      {/* CHAT LOUIS - always rendered in AppShell */}
      {!isBarePage && <ChatLouis />}

      {/* BUDDY CELEBRATION MODAL */}
      {showBuddyCelebration && celebrationData && (
        <BuddyCelebrationModal
          me={celebrationData.me}
          buddy={celebrationData.buddy}
          onClose={() => {
            setShowBuddyCelebration(false);
            setCelebrationData(null);
          }}
        />
      )}

      {/* INLINE CONVERSATION MODAL — opened from the messages panel, no page navigation */}
      {openConversationId && (
        <ConversationPage
          externalId={openConversationId}
          onExternalClose={() => setOpenConversationId(null)}
        />
      )}
    </FeatureRenderPriorityProvider>
  );
}
