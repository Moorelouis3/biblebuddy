"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { ChatLouis } from "./ChatLouis";
import { syncNotesCount, shouldSyncNotesCount } from "../lib/syncNotesCount";
import { syncChaptersCount, shouldSyncChaptersCount } from "../lib/syncChaptersCount";
import { trackUserActivity } from "../lib/trackUserActivity";
import { recalculateTotalActions } from "../lib/recalculateTotalActions";
import { FeedbackModal } from "./FeedbackModal";
import { ContactUsModal } from "./ContactUsModal";
import { NewMessageAlert } from "./NewMessageAlert";
import { OnboardingModal } from "./OnboardingModal";
import { GlobalUpdateModal } from "./GlobalUpdateModal";
import { FeatureRenderPriorityProvider } from "./FeatureRenderPriorityContext";
import { CURRENT_UPDATE_VERSION } from "../lib/globalUpdateConfig";
import DailyRecommendationModal from "./DailyRecommendationModal";
import { getDailyRecommendation, type DailyRecommendation } from "../lib/dailyRecommendation";
import { BuddyCelebrationModal, type BuddyCelebrationUser } from "./BuddyCelebrationModal";
import UserBadge from "./UserBadge";

const HIDDEN_ROUTES = ["/", "/login", "/signup", "/reset-password"];
const DAILY_RECOMMENDATIONS_ENABLED = false;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
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
    lastMessagePreview: string | null;
    lastMessageAt: string | null;
    hasUnread: boolean;
  }>>([]);
  const [loadingPreviews, setLoadingPreviews] = useState(false);

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

      const permission = await Notification.requestPermission();
      setPushPermission(permission);

      if (permission !== "granted") {
        throw new Error("Notifications were not allowed.");
      }

      await ensurePushSubscription(userId);
      hidePushPrompt(true);
    } catch (error: any) {
      setPushError(error?.message || "Could not enable push alerts.");
    } finally {
      setPushLoading(false);
    }
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

    const interval = window.setInterval(refresh, 15000);
    window.addEventListener("focus", refresh);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
    };
  }, [userId, isMessagesOpen]);

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

    function handleRefreshEvent() {
      void refreshUnreadMessageCount(currentUserId);
    }

    window.addEventListener("bb:refresh-unread-messages", handleRefreshEvent);

    return () => {
      window.removeEventListener("bb:refresh-unread-messages", handleRefreshEvent);
      void supabase.removeChannel(channel);
    };
  }, [userId]);

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

  async function refreshUnreadMessageCount(currentUserId: string) {
    const { data: convos } = await supabase
      .from("conversations")
      .select("id")
      .or(`user_id_1.eq.${currentUserId},user_id_2.eq.${currentUserId}`);

    if (!convos || convos.length === 0) {
      setUnreadMessageCount(0);
      return;
    }

    const convoIds = convos.map((c: any) => c.id);
    const { data: unreadRows } = await supabase
      .from("messages")
      .select("conversation_id")
      .in("conversation_id", convoIds)
      .neq("sender_id", currentUserId)
      .is("read_at", null);

    setUnreadMessageCount(new Set((unreadRows || []).map((row) => row.conversation_id)).size);
  }

  async function fetchConversationPreviews(currentUserId: string) {
    setLoadingPreviews(true);
    try {
      const { data: convos } = await supabase
        .from("conversations")
        .select("id, user_id_1, user_id_2, last_message_at, last_message_preview")
        .or(`user_id_1.eq.${currentUserId},user_id_2.eq.${currentUserId}`)
        .order("last_message_at", { ascending: false, nullsFirst: false })
        .limit(5);

      if (!convos || convos.length === 0) { setConversationPreviews([]); return; }

      const otherIds = convos.map((c) => c.user_id_1 === currentUserId ? c.user_id_2 : c.user_id_1);

      const [profilesResult, unreadResult] = await Promise.all([
        supabase
          .from("profile_stats")
          .select("user_id, display_name, username, profile_image_url, member_badge, is_paid")
          .in("user_id", otherIds),
        supabase
          .from("messages")
          .select("conversation_id")
          .in("conversation_id", convos.map((c) => c.id))
          .neq("sender_id", currentUserId)
          .is("read_at", null),
      ]);

      const profiles = profilesResult.data || [];
      const unreadConvoIds = new Set((unreadResult.data || []).map((m) => m.conversation_id));

      const previews = convos.map((c) => {
        const otherId = c.user_id_1 === currentUserId ? c.user_id_2 : c.user_id_1;
        const profile = profiles.find((p) => p.user_id === otherId);
        return {
          id: c.id,
          otherUserId: otherId,
          otherUserName: profile?.display_name || profile?.username || "Bible Buddy",
          otherUserImage: profile?.profile_image_url || null,
          otherUserBadge: profile?.member_badge || null,
          otherUserIsPaid: profile?.is_paid === true,
          lastMessagePreview: c.last_message_preview || null,
          lastMessageAt: c.last_message_at || null,
          hasUnread: unreadConvoIds.has(c.id),
        };
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
        (n) => n.type === "buddy_accepted" && !n.is_read && n.from_user_id && !shownCelebrationIds.current.has(n.id)
      );
      if (unreadAccepted && unreadAccepted.from_user_id) {
        shownCelebrationIds.current.add(unreadAccepted.id);
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
    // Social feed notifications deep-link to the specific post/comment
    if (notif.type === "buddy_posted" || notif.type === "feed_post_liked" || notif.type === "feed_post_commented" || notif.type === "feed_post_replied") {
      router.push("/dashboard");
      return;
    }
    if (notif.article_slug?.startsWith("/study-groups/")) {
      const searchParams = new URLSearchParams();
      if (notif.post_id) searchParams.set("post", notif.post_id);
      if (notif.comment_id) searchParams.set("comment", notif.comment_id);
      const query = searchParams.toString();
      router.push(query ? `${notif.article_slug}?${query}` : notif.article_slug);
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
        void fetchNotifications(session.user.id);
      } else {
        setUserId(null);
        setUsername("");
        setShowOnboardingModal(false);
        setFeatureToursEnabled(false);
        setInitialTrafficSource(null);
        setInitialBibleExperienceLevel(null);
        setNotifications([]);
      }

      // Sync notes count on initial session check if user is logged in (non-blocking)
      if (session?.user?.id) {
        // Run all sync/tracking in background - don't block UI
        (async () => {
          try {
            // Temporarily disabled for stability:
            // await checkProExpiration(session.user.id);
            
            // Track user activity (login/refresh) - once per 24 hours
            await trackUserActivity(session.user.id);
            
            // Recalculate total_actions from current counts
            await recalculateTotalActions(session.user.id);
            
            if (shouldSyncNotesCount(session.user.id)) {
              console.log("[APPSHELL] Syncing notes count on initial session check (new day detected)");
              await syncNotesCount(session.user.id);
            }
            
            // Sync chapters count on initial session check
            if (shouldSyncChaptersCount(session.user.id)) {
              console.log("[APPSHELL] Syncing chapters count on initial session check (new day detected)");
              await syncChaptersCount(session.user.id);
            }
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
          void fetchNotifications(session.user.id);
        } else {
          setUserId(null);
          setUsername("");
          setShowOnboardingModal(false);
          setFeatureToursEnabled(false);
          setInitialTrafficSource(null);
          setInitialBibleExperienceLevel(null);
          setNotifications([]);
        }

        // Sync notes count when user logs in or session changes (non-blocking)
        if (session?.user?.id) {
          // Run all sync/tracking in background - don't block UI
          (async () => {
            try {
              // Temporarily disabled for stability:
              // await checkProExpiration(session.user.id);
              
              // Track user activity (login/refresh) - once per 24 hours
              await trackUserActivity(session.user.id);
              
              // Recalculate total_actions from current counts
              await recalculateTotalActions(session.user.id);
              
              // Check if we should sync (new day or first time)
              if (shouldSyncNotesCount(session.user.id)) {
                console.log("[APPSHELL] Syncing notes count on login/new day");
                await syncNotesCount(session.user.id);
              }
              
              // Sync chapters count when user logs in or session changes
              if (shouldSyncChaptersCount(session.user.id)) {
                console.log("[APPSHELL] Syncing chapters count on login/new day");
                await syncChaptersCount(session.user.id);
              }
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

  // Treat iframe-embedded pages the same as bare pages (no shell/nav)
  const isBarePage = HIDDEN_ROUTES.includes(pathname ?? "/") || isEmbedded;

  const isAdmin = isLoggedIn && userEmail === "moorelouis3@gmail.com";

  // Determine if navigation menu should be shown (only on content pages)
  // Shows on: Bible main page (/Bible), book pages (/Bible/[book]), chapter pages (/Bible/[book]/[chapter]),
  // Notes pages, People, Places, and Keywords pages
  // Hidden on: landing, login, signup, dashboard, and main home page
  const shouldShowNavMenu = isLoggedIn && !isBarePage && pathname && (
    pathname.startsWith("/Bible") ||  // Matches /Bible, /Bible/[book], /Bible/[book]/[chapter]
    pathname.startsWith("/notes") ||
    pathname.startsWith("/people-in-the-bible") ||
    pathname.startsWith("/places-in-the-bible") ||
    pathname.startsWith("/keywords-in-the-bible")
  ) && !pathname.startsWith("/dashboard");

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

  return (
    <FeatureRenderPriorityProvider value={{ featureToursEnabled }}>
      {/* NEW MESSAGE ALERT (admin only) */}
      {isAdmin && <NewMessageAlert />}

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


      {/* FEEDBACK MODAL */}
      {isLoggedIn && userId && !showOnboardingModal && (
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
      {isLoggedIn && userId && !showOnboardingModal && (
        <GlobalUpdateModal
          isOpen={showUpdateModal}
          onDismiss={handleDismissUpdateModal}
        />
      )}

      {/* DAILY RECOMMENDATION MODAL */}
      {DAILY_RECOMMENDATIONS_ENABLED && isLoggedIn && userId && !showOnboardingModal && !showUpdateModal && showDailyRecommendation && dailyRecommendation && (
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
      {isLoggedIn && userId && !showOnboardingModal && (
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
                    <div className="absolute right-0 mt-2 w-48 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-50">
                      {/* BIBLE */}
                      <Link
                        href="/Bible"
                        onClick={(e) => {
                          if (pathname?.startsWith("/Bible")) {
                            e.preventDefault();
                          } else {
                            setIsNavMenuOpen(false);
                          }
                        }}
                        className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                          pathname?.startsWith("/Bible")
                            ? "bg-blue-50 text-blue-700 font-medium cursor-not-allowed"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]"
                        }`}
                      >
                        Bible
                      </Link>

                      {/* NOTES */}
                      <Link
                        href="/notes"
                        onClick={(e) => {
                          if (pathname?.startsWith("/notes")) {
                            e.preventDefault();
                          } else {
                            setIsNavMenuOpen(false);
                          }
                        }}
                        className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                          pathname?.startsWith("/notes")
                            ? "bg-purple-50 text-purple-700 font-medium cursor-not-allowed"
                            : "text-gray-700 hover:bg-purple-50 hover:text-purple-600 active:scale-[0.98]"
                        }`}
                      >
                        Notes
                      </Link>

                      {/* PEOPLE IN THE BIBLE */}
                      <Link
                        href="/people-in-the-bible"
                        onClick={(e) => {
                          if (pathname?.startsWith("/people-in-the-bible")) {
                            e.preventDefault();
                          } else {
                            setIsNavMenuOpen(false);
                          }
                        }}
                        className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                          pathname?.startsWith("/people-in-the-bible")
                            ? "bg-green-50 text-green-700 font-medium cursor-not-allowed"
                            : "text-gray-700 hover:bg-green-50 hover:text-green-600 active:scale-[0.98]"
                        }`}
                      >
                        People in the Bible
                      </Link>

                      {/* PLACES IN THE BIBLE */}
                      <Link
                        href="/places-in-the-bible"
                        onClick={(e) => {
                          if (pathname?.startsWith("/places-in-the-bible")) {
                            e.preventDefault();
                          } else {
                            setIsNavMenuOpen(false);
                          }
                        }}
                        className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                          pathname?.startsWith("/places-in-the-bible")
                            ? "bg-amber-50 text-amber-700 font-medium cursor-not-allowed"
                            : "text-gray-700 hover:bg-amber-50 hover:text-amber-600 active:scale-[0.98]"
                        }`}
                      >
                        Places in the Bible
                      </Link>

                      {/* KEYWORDS IN THE BIBLE */}
                      <Link
                        href="/keywords-in-the-bible"
                        onClick={(e) => {
                          if (pathname?.startsWith("/keywords-in-the-bible")) {
                            e.preventDefault();
                          } else {
                            setIsNavMenuOpen(false);
                          }
                        }}
                        className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                          pathname?.startsWith("/keywords-in-the-bible")
                            ? "bg-red-50 text-red-700 font-medium cursor-not-allowed"
                            : "text-gray-700 hover:bg-red-50 hover:text-red-600 active:scale-[0.98]"
                        }`}
                      >
                        Keywords in the Bible
                      </Link>
                    </div>
                  )}
                </div>
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
                    {notifications.filter((n) => !n.is_read).length > 0 && (
                      <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold">
                        {notifications.filter((n) => !n.is_read).length > 9 ? "9+" : notifications.filter((n) => !n.is_read).length}
                      </span>
                    )}
                  </button>

                  {isNotifOpen && (
                    <div className="fixed top-16 left-4 right-4 sm:absolute sm:top-full sm:left-auto sm:right-0 sm:mt-2 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <span className="font-semibold text-sm text-gray-900">Notifications</span>
                        {notifications.some((n) => !n.is_read) && (
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
                          <p className="text-sm text-gray-500 text-center py-6">No notifications yet.</p>
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
                            <p className="text-sm text-gray-500 mb-1">No messages yet.</p>
                            <p className="text-xs text-gray-400">Add Buddies to start chatting!</p>
                          </div>
                        ) : (
                          conversationPreviews.map((convo) => {
                            const initials = convo.otherUserName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                            const COLORS = ["#4a9b6f","#5b8dd9","#c97b3e","#9b6bb5","#d45f7a","#3ea8a8"];
                            let hash = 0;
                            for (let i = 0; i < convo.otherUserId.length; i++) hash = convo.otherUserId.charCodeAt(i) + ((hash << 5) - hash);
                            const avatarBg = COLORS[Math.abs(hash) % COLORS.length];

                            return (
                              <div
                                key={convo.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => {
                                  setIsMessagesOpen(false);
                                  router.push(`/messages/${convo.id}`);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setIsMessagesOpen(false);
                                    router.push(`/messages/${convo.id}`);
                                  }
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left cursor-pointer ${convo.hasUnread ? "bg-green-50" : ""}`}
                              >
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                  {convo.otherUserImage ? (
                                    <img src={convo.otherUserImage} alt={convo.otherUserName} className="w-10 h-10 rounded-full object-cover" />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: avatarBg }}>
                                      {initials}
                                    </div>
                                  )}
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex min-w-0 items-center gap-2">
                                      <p className={`text-sm truncate ${convo.hasUnread ? "font-bold text-gray-900" : "font-medium text-gray-800"}`}>
                                        {convo.otherUserName}
                                      </p>
                                      <UserBadge customBadge={convo.otherUserBadge} isPaid={convo.otherUserIsPaid} />
                                    </div>
                                    <span className="text-xs text-gray-400 flex-shrink-0">{formatMessageTime(convo.lastMessageAt)}</span>
                                  </div>
                                  <p className={`text-xs truncate mt-0.5 ${convo.hasUnread ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                                    {convo.lastMessagePreview || "No messages yet"}
                                  </p>
                                </div>

                                {/* Unread dot */}
                                {convo.hasUnread && (
                                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#4a9b6f" }} />
                                )}
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
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                  aria-label="Profile menu"
                  aria-expanded={isProfileMenuOpen}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
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

                    {/* NOTES */}
                    <Link
                      href="/notes"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname?.startsWith("/notes")
                          ? "bg-sky-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Notes
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
    </FeatureRenderPriorityProvider>
  );
}
