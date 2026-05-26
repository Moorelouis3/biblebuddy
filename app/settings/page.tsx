"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { LouisAvatar } from "../../components/LouisAvatar";
import {
  APP_THEMES,
  applyAppThemeToDocument,
  cacheAppThemeForUser,
  clearPendingAppThemeSync,
  normalizeAppThemeId,
  readCachedAppTheme,
  shouldPreferCachedAppTheme,
  type AppThemeId,
} from "../../lib/appThemes";
import { BUDDY_STORE_ITEMS, PREMIUM_SKIN_STORE_ITEMS, THEME_STORE_ITEMS } from "../../lib/bibleBuddyStore";
import {
  BUDDY_AVATARS,
  DEFAULT_BUDDY_AVATAR,
  SELECTED_BUDDY_STORAGE_KEY,
  getBuddyAvatar,
  normalizeBuddyAvatarId,
  type BuddyAvatarId,
} from "../../lib/buddyAvatars";
import { ACTIVE_STREAK_FLAME_STORAGE_KEY, getPremiumSkinFlameId, normalizeFlameCosmeticId, persistActiveStreakFlame, type FlameCosmeticId } from "../../lib/flameCosmetics";
import {
  PREMIUM_SKINS,
  applyPremiumSkinToDocument,
  cachePremiumSkinForUser,
  clearPendingPremiumSkinSync,
  clearLegacyPremiumSkinCache,
  getPremiumSkinForLegacyTheme,
  normalizePremiumSkinId,
  readCachedPremiumSkin,
  shouldPreferCachedPremiumSkin,
  type PremiumSkinId,
} from "../../lib/premiumSkins";
import { buildFullName, hasRequiredFullName, splitFullName } from "../../lib/profileName";
import { isAdminUser } from "../../lib/readingProgress";
import type { BuddyAvatar } from "../../lib/buddyAvatars";
import { getBibleYearAudioApiSrc } from "../../lib/bibleYearAudio";
import { BIBLE_YEAR_OFFLINE_TEXT_PACK_KEY, cacheBibleYearOfflineTextPack } from "../../lib/bibleYearOfflinePack";

type StorePurchaseRow = {
  item_id: string;
  item_kind: string;
};

type SettingsProfileRow = {
  display_name?: string | null;
  username?: string | null;
  app_theme?: string | null;
  app_theme_selected_at?: string | null;
  selected_streak_flame?: string | null;
  selected_buddy_avatar?: string | null;
  active_premium_skin?: string | null;
  active_premium_skin_selected_at?: string | null;
};

type BuddyReadyModal = {
  buddyId: BuddyAvatarId;
  buddyName: string;
  buttonLabel: string;
};

const BUDDY_READY_BUTTON_LABELS = ["Let's go", "OK", "That's awesome"];

function getBuddyStoreItemId(buddyId: BuddyAvatarId) {
  return buddyId === "louis" ? "buddy-lil-louis" : `buddy-${buddyId}`;
}

function getBuddyMood(buddy: BuddyAvatar, currentBuddyId: BuddyAvatarId) {
  if (buddy.id !== "louis") return "wave";
  return currentBuddyId === "louis" ? "peace" : "wave";
}

function getPasswordResetRedirectUrl() {
  if (typeof window === "undefined") return "https://www.mybiblebuddy.net/reset-password";
  const origin = window.location.origin;
  if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
    return `${origin}/reset-password`;
  }
  return "https://www.mybiblebuddy.net/reset-password";
}

const DASHBOARD_GUIDED_INTRO_STORAGE_KEY = "bb:replay-dashboard-guided-intro";
const BIBLE_YEAR_OFFLINE_WIFI_ONLY_KEY = "bb:bible-year-offline-wifi-only";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [themeSaving, setThemeSaving] = useState<string | null>(null);
  const [skinSaving, setSkinSaving] = useState<string | null>(null);
  const [flameSaving, setFlameSaving] = useState<string | null>(null);
  const [settingsMessage, setSettingsMessage] = useState<string | null>(null);
  const [storePurchases, setStorePurchases] = useState<StorePurchaseRow[]>([]);
  const [ownerHasUnlimitedDiamonds, setOwnerHasUnlimitedDiamonds] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<AppThemeId>("light");
  const [selectedPremiumSkin, setSelectedPremiumSkin] = useState<PremiumSkinId>("none");
  const [selectedPremiumSkinSelectedAt, setSelectedPremiumSkinSelectedAt] = useState<string | null>(null);
  const [selectedFlame, setSelectedFlame] = useState<FlameCosmeticId>("default");
  const [selectedBuddy, setSelectedBuddy] = useState<BuddyAvatarId>(DEFAULT_BUDDY_AVATAR);
  const [buddySaving, setBuddySaving] = useState<BuddyAvatarId | null>(null);
  const [buddyReadyModal, setBuddyReadyModal] = useState<BuddyReadyModal | null>(null);
  const [activeBuddyIndex, setActiveBuddyIndex] = useState(0);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [openSkinActionsId, setOpenSkinActionsId] = useState<string | null>(null);
  const buddySwipeStartRef = useRef<{ x: number; y: number } | null>(null);
  
  // Profile fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  
  // Reset password
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  
  // Reset reading plan
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resettingPlan, setResettingPlan] = useState(false);

  // Promo code
  const [promoCode, setPromoCode] = useState("");
  const [applyingCode, setApplyingCode] = useState(false);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [offlineWifiOnly, setOfflineWifiOnly] = useState(true);
  const [offlineDownloadStatus, setOfflineDownloadStatus] = useState<string | null>(null);
  const [offlineDownloading, setOfflineDownloading] = useState<"starter" | "next7" | "full" | "clear" | null>(null);
  const [offlineStorageLabel, setOfflineStorageLabel] = useState<string | null>(null);
  const [guestLogoutWarningOpen, setGuestLogoutWarningOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOfflineWifiOnly(window.localStorage.getItem(BIBLE_YEAR_OFFLINE_WIFI_ONLY_KEY) !== "0");
    }

    async function loadUser() {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          setUser(currentUser);
          setOwnerHasUnlimitedDiamonds(isAdminUser(currentUser.email));
          const meta = currentUser.user_metadata || {};
          setEmail(currentUser.email || "");

        const profileRequest = await supabase
          .from("profile_stats")
          .select("display_name, username, app_theme, app_theme_selected_at, selected_streak_flame, selected_buddy_avatar, active_premium_skin, active_premium_skin_selected_at")
          .eq("user_id", currentUser.id)
          .maybeSingle();

        let profile = profileRequest.data as SettingsProfileRow | null;
        if (profileRequest.error && /app_theme_selected_at|active_premium_skin_selected_at/i.test(profileRequest.error.message || "")) {
          const fallbackProfile = await supabase
            .from("profile_stats")
            .select("display_name, username, app_theme, selected_streak_flame, selected_buddy_avatar, active_premium_skin")
            .eq("user_id", currentUser.id)
            .maybeSingle();
          profile = fallbackProfile.data as SettingsProfileRow | null;
          setSettingsMessage("Skin lock timing needs the newest profile_stats column before it can enforce the 24 hour lock.");
        } else if (profileRequest.error && /selected_streak_flame|selected_buddy_avatar|active_premium_skin/i.test(profileRequest.error.message || "")) {
          const fallbackProfile = await supabase
            .from("profile_stats")
            .select("display_name, username, app_theme")
            .eq("user_id", currentUser.id)
            .maybeSingle();
          profile = fallbackProfile.data as SettingsProfileRow | null;
          setSettingsMessage("Buddy and flame selections need the newest profile_stats columns before they can save.");
        }

        const { data: purchases } = await supabase
          .from("user_store_purchases")
          .select("item_id,item_kind")
          .eq("user_id", currentUser.id);

        const nameParts = splitFullName(
          profile?.display_name ||
            meta.display_name ||
            [meta.firstName || meta.first_name, meta.lastName || meta.last_name].filter(Boolean).join(" ") ||
            profile?.username ||
            "",
        );
        setFirstName(nameParts.firstName);
        setLastName(nameParts.lastName);
        const dbTheme = normalizeAppThemeId(profile?.app_theme);
        const savedTheme = shouldPreferCachedAppTheme(currentUser.id, dbTheme) ? readCachedAppTheme(currentUser.id) : dbTheme;
        setSelectedTheme(savedTheme);
        const dbPremiumSkin: PremiumSkinId =
          profile && "active_premium_skin" in profile && profile.active_premium_skin
            ? normalizePremiumSkinId(profile.active_premium_skin)
            : "none";
        const resolvedPremiumSkin = shouldPreferCachedPremiumSkin(currentUser.id, dbPremiumSkin) ? readCachedPremiumSkin(currentUser.id) : dbPremiumSkin;
        const premiumSkinStoreItem = PREMIUM_SKIN_STORE_ITEMS.find((item) => item.skinId === resolvedPremiumSkin);
        const ownsResolvedPremiumSkin =
          resolvedPremiumSkin === "none" ||
          isAdminUser(currentUser.email) ||
          Boolean(premiumSkinStoreItem && (purchases || []).some((purchase) => purchase.item_id === premiumSkinStoreItem.id));
        const safePremiumSkin: PremiumSkinId = ownsResolvedPremiumSkin ? resolvedPremiumSkin : "none";
        if (!ownsResolvedPremiumSkin) {
          void supabase
            .from("profile_stats")
            .update({ active_premium_skin: "none", updated_at: new Date().toISOString() })
            .eq("user_id", currentUser.id);
        } else if (resolvedPremiumSkin !== dbPremiumSkin) {
          void supabase
            .from("profile_stats")
            .upsert(
              {
                user_id: currentUser.id,
                active_premium_skin: resolvedPremiumSkin,
                active_premium_skin_selected_at: profile?.active_premium_skin_selected_at ?? new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              { onConflict: "user_id" },
            );
        }
        setSelectedPremiumSkin(safePremiumSkin);
        setSelectedPremiumSkinSelectedAt(safePremiumSkin === "none" ? null : profile?.active_premium_skin_selected_at ?? null);
        const localSelectedBuddy =
          typeof window !== "undefined" ? window.localStorage.getItem(SELECTED_BUDDY_STORAGE_KEY) : null;
        const resolvedSelectedBuddy = normalizeBuddyAvatarId(profile?.selected_buddy_avatar || localSelectedBuddy);
        setSelectedBuddy(resolvedSelectedBuddy);
        const localSelectedFlame =
          typeof window !== "undefined" ? window.localStorage.getItem(ACTIVE_STREAK_FLAME_STORAGE_KEY) : null;
        const dbSelectedFlame = normalizeFlameCosmeticId(profile?.selected_streak_flame);
        const skinLockedFlame = getPremiumSkinFlameId(safePremiumSkin);
        const resolvedSelectedFlame = skinLockedFlame ?? (dbSelectedFlame !== "default" ? dbSelectedFlame : normalizeFlameCosmeticId(localSelectedFlame));
        setSelectedFlame(resolvedSelectedFlame);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(SELECTED_BUDDY_STORAGE_KEY, resolvedSelectedBuddy);
          persistActiveStreakFlame(resolvedSelectedFlame);
          clearLegacyPremiumSkinCache();
          cachePremiumSkinForUser(currentUser.id, safePremiumSkin);
          if (dbPremiumSkin === safePremiumSkin) clearPendingPremiumSkinSync(currentUser.id, safePremiumSkin);
          cacheAppThemeForUser(currentUser.id, savedTheme);
          if (dbTheme === savedTheme) clearPendingAppThemeSync(currentUser.id, savedTheme);
          applyAppThemeToDocument(savedTheme);
          applyPremiumSkinToDocument(safePremiumSkin);
          window.dispatchEvent(new CustomEvent("bb:selected-buddy-avatar-changed", { detail: { buddyId: resolvedSelectedBuddy } }));
        }
          setStorePurchases((purchases || []) as StorePurchaseRow[]);
        }
      } catch (error) {
        console.error("[SETTINGS] Could not load settings:", error);
        setSettingsMessage("Settings had trouble loading. Please try again in a moment.");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  async function handleSaveProfile() {
    if (!user) return;
    const fullName = buildFullName(firstName, lastName);
    if (!hasRequiredFullName(fullName)) {
      alert("Please enter your first and last name.");
      return;
    }
    
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          firstName: firstName.trim(),
          first_name: firstName.trim(),
          lastName: lastName.trim(),
          last_name: lastName.trim(),
          display_name: fullName,
        },
      });

      if (error) throw error;

      const { error: profileError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: user.id,
            display_name: fullName,
            username: fullName,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        );
      if (profileError) throw profileError;

      // Update email if changed
      if (email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: email,
        });
        if (emailError) throw emailError;
      }

      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  }

  function getConnectionLooksLikeWifi() {
    if (typeof navigator === "undefined") return true;
    const connection = (navigator as Navigator & { connection?: { type?: string; effectiveType?: string } }).connection;
    const type = connection?.type?.toLowerCase();
    const effectiveType = connection?.effectiveType?.toLowerCase();
    if (type === "wifi" || type === "ethernet") return true;
    if (type === "cellular") return false;
    if (effectiveType && ["slow-2g", "2g", "3g"].includes(effectiveType)) return false;
    return true;
  }

  function formatStorageSize(bytes: number) {
    if (!Number.isFinite(bytes) || bytes <= 0) return "0 MB";
    const mb = bytes / (1024 * 1024);
    if (mb < 1024) return `${Math.round(mb)} MB`;
    return `${(mb / 1024).toFixed(1)} GB`;
  }

  async function refreshOfflineStorageEstimate() {
    if (typeof navigator === "undefined" || !navigator.storage?.estimate) return;
    try {
      const estimate = await navigator.storage.estimate();
      if (typeof estimate.usage === "number") {
        setOfflineStorageLabel(formatStorageSize(estimate.usage));
      }
    } catch {
      setOfflineStorageLabel(null);
    }
  }

  function setWifiOnlyPreference(nextValue: boolean) {
    setOfflineWifiOnly(nextValue);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(BIBLE_YEAR_OFFLINE_WIFI_ONLY_KEY, nextValue ? "1" : "0");
    }
  }

  async function requestBibleYearOfflineAudio(days: number[], mode: "starter" | "next7" | "full") {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      setOfflineDownloadStatus("Offline downloads need the installed app or a browser with service worker support.");
      return;
    }

    if (offlineWifiOnly && !getConnectionLooksLikeWifi()) {
      setOfflineDownloadStatus("Wi-Fi only is on. Connect to Wi-Fi or turn it off to download audio now.");
      return;
    }

    setOfflineDownloading(mode);
    setOfflineDownloadStatus("Preparing offline Bible in One Year text and audio...");
    cacheBibleYearOfflineTextPack();

    try {
      const registration = await navigator.serviceWorker.ready;
      const target = registration.active || navigator.serviceWorker.controller;
      if (!target) throw new Error("Offline worker is not ready yet.");

      target.postMessage({
        type: "CACHE_BIBLE_YEAR_OFFLINE",
        urls: ["/dashboard", "/dashboard?view=bible-year"],
        mediaUrls: days.map((day) => getBibleYearAudioApiSrc(day)),
      });

      setOfflineDownloadStatus(
        mode === "full"
          ? "Full audio library download started. Keep BibleBuddy open on Wi-Fi while it prepares."
          : mode === "starter"
            ? "Days 1-7 audio are downloading for offline mode. Text is saved automatically."
          : "Next 7 days of audio are downloading. Text is saved automatically.",
      );
      window.setTimeout(() => void refreshOfflineStorageEstimate(), 2500);
    } catch (error) {
      setOfflineDownloadStatus(error instanceof Error ? error.message : "Could not start offline download.");
    } finally {
      setOfflineDownloading(null);
    }
  }

  async function getCurrentOfflineAudioStartDay() {
    if (!user?.id) return 1;
    try {
      const { data, error } = await supabase
        .from("bible_year_day_progress")
        .select("day_number, reading_completed, trivia_completed, reflection_completed")
        .eq("user_id", user.id)
        .order("day_number", { ascending: true });

      if (error) throw error;

      const progressRows = (data || [])
        .filter((row) => typeof row.day_number === "number")
        .sort((a, b) => Number(a.day_number) - Number(b.day_number));
      const completedDays = new Set(
        progressRows
          .filter((row) => row.reading_completed && row.trivia_completed && row.reflection_completed)
          .map((row) => Number(row.day_number)),
      );
      const touchedDays = progressRows
        .filter((row) => row.reading_completed || row.trivia_completed || row.reflection_completed)
        .map((row) => Number(row.day_number));

      let nextDay = 1;
      while (completedDays.has(nextDay) && nextDay < 365) nextDay += 1;

      const latestTouchedDay = touchedDays.length ? Math.max(...touchedDays) : 1;
      return Math.min(365, Math.max(nextDay, latestTouchedDay, 1));
    } catch {
      return 1;
    }
  }

  async function downloadNextSevenAudio() {
    const startDay = await getCurrentOfflineAudioStartDay();
    const days = Array.from({ length: 7 }, (_, index) => startDay + index).filter((day) => day <= 365);
    void requestBibleYearOfflineAudio(days, "next7");
  }

  function downloadStarterAudioPack() {
    const days = Array.from({ length: 7 }, (_, index) => index + 1);
    void requestBibleYearOfflineAudio(days, "starter");
  }

  function downloadFullAudioLibrary() {
    const confirmed =
      typeof window === "undefined" ||
      window.confirm("Download all 365 audio files? This can use several GB of phone storage. Wi-Fi is strongly recommended.");
    if (!confirmed) return;
    const days = Array.from({ length: 365 }, (_, index) => index + 1);
    void requestBibleYearOfflineAudio(days, "full");
  }

  async function clearOfflineDownloads() {
    setOfflineDownloading("clear");
    setOfflineDownloadStatus("Clearing offline downloads...");
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(BIBLE_YEAR_OFFLINE_TEXT_PACK_KEY);
      }
      if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;
        const target = registration.active || navigator.serviceWorker.controller;
        target?.postMessage({ type: "CLEAR_BIBLE_YEAR_OFFLINE" });
      }
      setOfflineDownloadStatus("Offline downloads cleared.");
      window.setTimeout(() => void refreshOfflineStorageEstimate(), 1000);
    } catch {
      setOfflineDownloadStatus("Offline text was cleared, but media cache cleanup may need an app refresh.");
    } finally {
      setOfflineDownloading(null);
    }
  }

  useEffect(() => {
    cacheBibleYearOfflineTextPack();
    void refreshOfflineStorageEstimate();
  }, []);

  async function handleResetPassword() {
    if (!user?.email) return;
    
    setResetPasswordLoading(true);
    setResetPasswordSuccess(false);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: getPasswordResetRedirectUrl(),
      });

      if (error) throw error;

      setResetPasswordSuccess(true);
    } catch (error: any) {
      console.error("Error resetting password:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setResetPasswordLoading(false);
    }
  }

  async function handleResetReadingPlan() {
    if (!user) return;
    
    setResettingPlan(true);
    try {
      // Delete all completed chapters for this user
      const { error } = await supabase
        .from("completed_chapters")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;

      // Clear level cache
      if (typeof window !== "undefined") {
        const cacheKey = `bb_level_data_${user.id}`;
        const cacheTimestampKey = `bb_level_data_timestamp_${user.id}`;
        window.localStorage.removeItem(cacheKey);
        window.localStorage.removeItem(cacheTimestampKey);
      }

      alert("Reading plan has been reset. Your progress is now at 0.");
      setShowResetConfirm(false);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error resetting reading plan:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setResettingPlan(false);
    }
  }

  function handleReplayDashboardIntro() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DASHBOARD_GUIDED_INTRO_STORAGE_KEY, "1");
      window.dispatchEvent(new CustomEvent("bb:replay-dashboard-guided-intro"));
    }
    router.push("/dashboard");
  }

  async function handleApplyPromoCode() {
    if (!promoCode.trim()) {
      setPromoError("Please enter a code");
      return;
    }

    setApplyingCode(true);
    setPromoError(null);
    setPromoSuccess(false);

    try {
      const response = await fetch("/api/upgrade/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: promoCode.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to apply code");
      }

      setPromoSuccess(true);
      setPromoCode("");
      
      // Optionally refresh profile state after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error("Error applying promo code:", error);
      setPromoError(error.message || "Failed to apply code. Please try again.");
    } finally {
      setApplyingCode(false);
    }
  }

  async function handleThemeSelect(themeId: AppThemeId) {
    if (!user) return;
    const previousTheme = selectedTheme;
    const previousSkin = selectedPremiumSkin;
    const previousSkinSelectedAt = selectedPremiumSkinSelectedAt;
    setThemeSaving(themeId);
    setSettingsMessage(null);
    setSelectedTheme(themeId);
    setSelectedPremiumSkin("none");
    setSelectedPremiumSkinSelectedAt(null);
    if (typeof window !== "undefined") {
      cacheAppThemeForUser(user.id, themeId, { markSelected: true });
      cachePremiumSkinForUser(user.id, "none", { markSelected: true });
      applyPremiumSkinToDocument("none");
      applyAppThemeToDocument(themeId);
      window.dispatchEvent(new CustomEvent("bb:premium-skin-changed", { detail: { skinId: "none" } }));
      window.dispatchEvent(new CustomEvent("bb:app-theme-purchased", { detail: { themeId } }));
    }
    try {
      const selectedAt = new Date().toISOString();
      let { error } = await supabase.from("profile_stats").upsert(
        {
          user_id: user.id,
          app_theme: themeId,
          app_theme_selected_at: selectedAt,
          active_premium_skin: "none",
          active_premium_skin_selected_at: null,
          updated_at: selectedAt,
        },
        { onConflict: "user_id" },
      );
      if (error && /app_theme_selected_at|active_premium_skin_selected_at/i.test(error.message || "")) {
        const fallback = await supabase.from("profile_stats").upsert(
          {
            user_id: user.id,
            app_theme: themeId,
            active_premium_skin: "none",
            updated_at: selectedAt,
          },
          { onConflict: "user_id" },
        );
        error = fallback.error;
      }
      if (error && /active_premium_skin/i.test(error.message || "")) {
        const fallback = await supabase.from("profile_stats").upsert(
          {
            user_id: user.id,
            app_theme: themeId,
            updated_at: selectedAt,
          },
          { onConflict: "user_id" },
        );
        error = fallback.error;
      }
      if (error) throw error;
      clearPendingAppThemeSync(user.id, themeId);
      clearPendingPremiumSkinSync(user.id, "none");
      setSettingsMessage("Theme updated.");
    } catch (error: any) {
      setSelectedTheme(previousTheme);
      setSelectedPremiumSkin(previousSkin);
      setSelectedPremiumSkinSelectedAt(previousSkinSelectedAt);
      if (typeof window !== "undefined") {
        cacheAppThemeForUser(user.id, previousTheme);
        cachePremiumSkinForUser(user.id, previousSkin);
        applyAppThemeToDocument(previousTheme);
        applyPremiumSkinToDocument(previousSkin);
        window.dispatchEvent(new CustomEvent("bb:premium-skin-changed", { detail: { skinId: previousSkin } }));
        window.dispatchEvent(new CustomEvent("bb:app-theme-purchased", { detail: { themeId: previousTheme } }));
      }
      setSettingsMessage(error.message || "Could not update theme.");
    } finally {
      setThemeSaving(null);
    }
  }

  async function handleFlameSelect(flameId: FlameCosmeticId) {
    if (!user) return;
    const skinLockedFlame = getPremiumSkinFlameId(selectedPremiumSkin);
    if (skinLockedFlame) {
      setSelectedFlame(skinLockedFlame);
      if (typeof window !== "undefined") {
        persistActiveStreakFlame(skinLockedFlame);
        window.dispatchEvent(new CustomEvent("bb:streak-flame-changed", { detail: { flameId: skinLockedFlame } }));
      }
      const { error } = await supabase
        .from("profile_stats")
        .update({
          selected_streak_flame: skinLockedFlame,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);
      if (error) {
        setSettingsMessage("Your skin controls the flame color, but the database save needs to retry.");
      } else {
        setSettingsMessage("Your active skin controls this flame color.");
      }
      return;
    }
    const previousFlame = selectedFlame;
    setFlameSaving(flameId);
    setSettingsMessage(null);
    setSelectedFlame(flameId);
    if (typeof window !== "undefined") {
      persistActiveStreakFlame(flameId);
      window.dispatchEvent(new CustomEvent("bb:streak-flame-changed", { detail: { flameId } }));
    }
    try {
      const { error } = await supabase
        .from("profile_stats")
        .update({
          selected_streak_flame: flameId,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);
      if (error) throw error;
      setSettingsMessage("Streak flame updated.");
    } catch (error: any) {
      setSelectedFlame(previousFlame);
      if (typeof window !== "undefined") {
        persistActiveStreakFlame(previousFlame);
        window.dispatchEvent(new CustomEvent("bb:streak-flame-changed", { detail: { flameId: previousFlame } }));
      }
      setSettingsMessage(
        /selected_streak_flame/i.test(error.message || "")
          ? "Streak flames need one database update before they can save. Run ADD_SELECTED_STREAK_FLAME.sql in Supabase."
          : error.message || "Could not update streak flame.",
      );
    } finally {
      setFlameSaving(null);
    }
  }

  async function handlePremiumSkinSelect(skinId: PremiumSkinId) {
    if (!user) return;
    const skin = PREMIUM_SKINS.find((premiumSkin) => premiumSkin.id === skinId);
    const storeItem = skin ? PREMIUM_SKIN_STORE_ITEMS.find((item) => item.skinId === skin.id) : null;
    const legacyThemeItem = THEME_STORE_ITEMS.find((item) => item.themeId && getPremiumSkinForLegacyTheme(item.themeId) === skinId);
    const ownsSkin =
      skinId === "none" ||
      ownerHasUnlimitedDiamonds ||
      Boolean(storeItem && storePurchases.some((purchase) => purchase.item_id === storeItem.id)) ||
      Boolean(legacyThemeItem && storePurchases.some((purchase) => purchase.item_id === legacyThemeItem.id));
    if (!ownsSkin) {
      setSettingsMessage("Buy this skin in the store first.");
      return;
    }

    const previousSkin = selectedPremiumSkin;
    const previousSkinSelectedAt = selectedPremiumSkinSelectedAt;
    const previousFlame = selectedFlame;
    const selectedAt = new Date().toISOString();
    setSkinSaving(skinId);
    setSettingsMessage(null);
    setSelectedPremiumSkin(skinId);
    setSelectedPremiumSkinSelectedAt(selectedAt);
    if (typeof window !== "undefined") {
      cachePremiumSkinForUser(user.id, skinId, { markSelected: true });
      if (skinId === "none") {
        applyPremiumSkinToDocument("none");
        applyAppThemeToDocument(selectedTheme);
      } else {
        applyPremiumSkinToDocument(skinId);
      }
      window.dispatchEvent(new CustomEvent("bb:premium-skin-changed", { detail: { skinId } }));
    }

    try {
      const matchingFlame = getPremiumSkinFlameId(skinId);
      if (matchingFlame) {
        setSelectedFlame(matchingFlame);
        if (typeof window !== "undefined") {
          persistActiveStreakFlame(matchingFlame);
          window.dispatchEvent(new CustomEvent("bb:streak-flame-changed", { detail: { flameId: matchingFlame } }));
        }
        const { error } = await supabase
          .from("profile_stats")
          .update({
            selected_streak_flame: matchingFlame,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id);
        if (error) {
          console.warn("[SETTINGS] Could not save skin flame, continuing with skin save:", error.message);
        }
      }

      let { error: skinError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: user.id,
            active_premium_skin: skinId,
            active_premium_skin_selected_at: selectedAt,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        );
      if (skinError && /active_premium_skin_selected_at/i.test(skinError.message || "")) {
        const fallback = await supabase
          .from("profile_stats")
          .upsert(
            {
              user_id: user.id,
              active_premium_skin: skinId,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" },
          );
        skinError = fallback.error;
      }
      if (skinError) throw skinError;
      clearPendingPremiumSkinSync(user.id, skinId);

      setSettingsMessage(skin ? `${skin.name} is now your default skin.` : "Skin removed.");
    } catch (error: any) {
      setSelectedPremiumSkin(previousSkin);
      setSelectedPremiumSkinSelectedAt(previousSkinSelectedAt);
      setSelectedFlame(previousFlame);
      if (typeof window !== "undefined") {
        cachePremiumSkinForUser(user.id, previousSkin);
        persistActiveStreakFlame(previousFlame);
        if (previousSkin === "none") {
          applyPremiumSkinToDocument("none");
          applyAppThemeToDocument(selectedTheme);
        } else {
          applyPremiumSkinToDocument(previousSkin);
        }
        window.dispatchEvent(new CustomEvent("bb:premium-skin-changed", { detail: { skinId: previousSkin } }));
        window.dispatchEvent(new CustomEvent("bb:streak-flame-changed", { detail: { flameId: previousFlame } }));
      }
      setSettingsMessage(error.message || "Could not update skin.");
    } finally {
      setSkinSaving(null);
    }
  }

  async function handleBuddySelect(buddyId: BuddyAvatarId) {
    if (!user) return;
    const previousBuddy = selectedBuddy;
    setBuddySaving(buddyId);
    setSettingsMessage(null);
    setSelectedBuddy(buddyId);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SELECTED_BUDDY_STORAGE_KEY, buddyId);
      window.dispatchEvent(new CustomEvent("bb:selected-buddy-avatar-changed", { detail: { buddyId } }));
    }

    try {
      const { error } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: user.id,
            selected_buddy_avatar: buddyId,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        );
      if (error) throw error;
      setSettingsMessage("Bible Buddy updated.");
      setActiveBuddyIndex(0);
      const buddy = getBuddyAvatar(buddyId);
      const labelIndex = Math.abs(buddyId.charCodeAt(0) + buddyId.length) % BUDDY_READY_BUTTON_LABELS.length;
      setBuddyReadyModal({
        buddyId,
        buddyName: buddy.name,
        buttonLabel: BUDDY_READY_BUTTON_LABELS[labelIndex],
      });
    } catch (error: any) {
      setSelectedBuddy(previousBuddy);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(SELECTED_BUDDY_STORAGE_KEY, previousBuddy);
        window.dispatchEvent(new CustomEvent("bb:selected-buddy-avatar-changed", { detail: { buddyId: previousBuddy } }));
      }
      setSettingsMessage(
        /selected_buddy_avatar/i.test(error.message || "")
          ? "Bible Buddy selection needs the selected_buddy_avatar column in profile_stats before it can save."
          : error.message || "Could not update Bible Buddy.",
      );
    } finally {
      setBuddySaving(null);
    }
  }

  async function handleDeleteStoreItem(itemId: string) {
    if (!user || removingItemId) return;
    const item =
      THEME_STORE_ITEMS.find((storeItem) => storeItem.id === itemId) ||
      PREMIUM_SKIN_STORE_ITEMS.find((storeItem) => storeItem.id === itemId) ||
      BUDDY_STORE_ITEMS.find((storeItem) => storeItem.id === itemId);
    if (!item) return;

    const confirmed = window.confirm(`Remove ${item.title} from your account?`);
    if (!confirmed) return;

    setRemovingItemId(itemId);
    setSettingsMessage(null);
    setOpenSkinActionsId(null);
    try {
      const { error } = await supabase
        .from("user_store_purchases")
        .delete()
        .eq("user_id", user.id)
        .eq("item_id", itemId);
      if (error) throw error;

      setStorePurchases((current) => current.filter((purchase) => purchase.item_id !== itemId));

      if (item.themeId && selectedTheme === item.themeId) {
        await handleThemeSelect("light");
      }

      if (item.skinId && selectedPremiumSkin === item.skinId) {
        await handlePremiumSkinSelect("none");
      }

      const removedBuddyId = BUDDY_AVATARS.find((buddy) => getBuddyStoreItemId(buddy.id) === itemId)?.id;
      if (removedBuddyId && selectedBuddy === removedBuddyId) {
        await handleBuddySelect(DEFAULT_BUDDY_AVATAR);
      }

      setSettingsMessage(`${item.title} removed.`);
    } catch (error: any) {
      setSettingsMessage(
        /row-level security|policy|permission/i.test(error.message || "")
          ? "Deleting purchases needs the store delete policy SQL. Run ADD_USER_STORE_PURCHASES_DELETE_POLICY.sql in Supabase."
          : error.message || "Could not remove that item.",
      );
    } finally {
      setRemovingItemId(null);
    }
  }

  async function handleLogout() {
    if (user?.is_anonymous || !user?.email || user?.identities?.length === 0) {
      setGuestLogoutWarningOpen(true);
      return;
    }
    await performLogout();
  }

  async function performLogout() {
    setGuestLogoutWarningOpen(false);
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const ownedStoreItemIds = storePurchases.map((purchase) => purchase.item_id);
  const availableThemes = APP_THEMES.filter((theme) => theme.id === "light" || theme.id === "dark");
  const ownsPremiumSkin = (skin: { id: PremiumSkinId }) => {
    const storeItem = PREMIUM_SKIN_STORE_ITEMS.find((item) => item.skinId === skin.id);
    const legacyThemeItem = THEME_STORE_ITEMS.find((item) => item.themeId && getPremiumSkinForLegacyTheme(item.themeId) === skin.id);
    return (
      ownerHasUnlimitedDiamonds ||
      selectedPremiumSkin === skin.id ||
      Boolean(storeItem && ownedStoreItemIds.includes(storeItem.id)) ||
      Boolean(legacyThemeItem && ownedStoreItemIds.includes(legacyThemeItem.id))
    );
  };
  const ownedPremiumSkins = PREMIUM_SKINS.filter((skin) => {
    return ownsPremiumSkin(skin);
  }).sort((a, b) => {
    if (a.id === selectedPremiumSkin) return -1;
    if (b.id === selectedPremiumSkin) return 1;
    return a.name.localeCompare(b.name);
  });
  const ownedBuddyItemIds = new Set(
    BUDDY_STORE_ITEMS
      .filter((item) => ownedStoreItemIds.includes(item.id))
      .map((item) => item.id),
  );
  const availableBuddies = BUDDY_AVATARS.filter((buddy) =>
    ownerHasUnlimitedDiamonds ||
    buddy.id === DEFAULT_BUDDY_AVATAR ||
    buddy.id === selectedBuddy ||
    ownedBuddyItemIds.has(getBuddyStoreItemId(buddy.id)),
  );
  const currentBuddyForSlides = availableBuddies.find((buddy) => buddy.id === selectedBuddy) ?? availableBuddies[0];
  const buddySlides = currentBuddyForSlides
    ? [currentBuddyForSlides, ...availableBuddies.filter((buddy) => buddy.id !== currentBuddyForSlides.id)]
    : [];
  const activeBuddy = buddySlides[activeBuddyIndex] ?? buddySlides[0];

  function moveBuddyCard(direction: -1 | 1) {
    if (!buddySlides.length) return;
    setActiveBuddyIndex((index) => (index + direction + buddySlides.length) % buddySlides.length);
  }

  function handleBuddySwipeStart(event: React.TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    buddySwipeStartRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  }

  function handleBuddySwipeEnd(event: React.TouchEvent<HTMLDivElement>) {
    const start = buddySwipeStartRef.current;
    buddySwipeStartRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const endX = touch?.clientX ?? start.x;
    const endY = touch?.clientY ?? start.y;
    const deltaX = endX - start.x;
    const deltaY = endY - start.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    if (absX < 70 || absY > 35 || absY > absX * 0.55) return;

    moveBuddyCard(deltaX < 0 ? 1 : -1);
  }

  return (
    <div className="h-dvh min-h-screen overflow-y-auto bg-gray-50 pb-12 [overscroll-behavior:contain] [-webkit-overflow-scrolling:touch]">
      {guestLogoutWarningOpen ? (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/55 px-4">
          <div className="w-full max-w-md rounded-3xl border border-[#d8e7f2] bg-white p-6 text-center shadow-2xl">
            <button type="button" onClick={() => setGuestLogoutWarningOpen(false)} className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-lg font-black text-gray-500 transition hover:bg-gray-200" aria-label="Close logout warning">
              x
            </button>
            <div className="mx-auto mt-1 flex h-24 w-24 items-center justify-center rounded-full bg-[#edf7ff]">
              <LouisAvatar mood="think" size={82} />
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#5f93b8]">Guest account</p>
            <h2 className="mt-2 text-2xl font-black text-gray-950">Create an account before logging out?</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              You are a guest right now. If you log out, you will not be able to log back into this guest journey unless you create an account first.
            </p>
            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={() => {
                  setGuestLogoutWarningOpen(false);
                  window.localStorage.setItem("bb:open-guest-account-form", "1");
                  router.push("/dashboard");
                  window.setTimeout(() => window.dispatchEvent(new CustomEvent("bb:open-guest-account-form")), 120);
                }}
                className="w-full rounded-2xl bg-[#7BAFD4] px-5 py-3 text-sm font-black text-[#05111f] shadow-lg transition hover:bg-[#91c2df]"
              >
                Create Account
              </button>
              <button type="button" onClick={() => void performLogout()} className="w-full rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-700 transition hover:bg-red-100">
                Log Out Anyway
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {buddyReadyModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-md overflow-hidden rounded-[30px] border border-[var(--bb-card-border,#d7e4f7)] bg-white shadow-2xl">
            <div className="relative overflow-hidden px-6 pb-7 pt-5 text-center">
              <div className="absolute inset-x-0 top-0 h-28 bg-[var(--bb-accent-soft,#eaf5ff)]" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setBuddyReadyModal(null)}
                className="relative ml-auto grid h-9 w-9 place-items-center rounded-full bg-white/85 text-xl font-black text-gray-500 shadow-sm transition hover:brightness-95"
                aria-label="Close Buddy ready message"
              >
                x
              </button>
              <div className="relative mx-auto mt-1 grid h-40 w-40 place-items-center rounded-full bg-white shadow-[0_16px_36px_rgba(38,63,99,0.16)]">
                <LouisAvatar buddyId={buddyReadyModal.buddyId} mood="reading" size={136} />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent,#2563eb)]">
                Bible Buddy ready
              </p>
              <h2 className="mt-2 text-3xl font-black leading-tight text-gray-950">
                {buddyReadyModal.buddyName} is ready
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-gray-600">
                Your new Bible Buddy is ready to guide you through the Bible.
              </p>
              <button
                type="button"
                onClick={() => setBuddyReadyModal(null)}
                className="mt-6 w-full rounded-full bg-[var(--bb-button,#2563eb)] px-6 py-3.5 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95 active:scale-[0.98]"
              >
                {buddyReadyModal.buttonLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {settingsMessage ? (
          <div className="mb-6 rounded-xl border border-[var(--bb-card-border,#d1d5db)] bg-[var(--bb-accent-soft,#eaf5ff)] p-4 text-sm font-bold text-[var(--bb-text-primary,#111827)]">
            {settingsMessage}
          </div>
        ) : null}

        {/* Offline Bible Study Section */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2563eb)]">
                Offline Bible Study
              </p>
              <h2 className="mt-2 text-xl font-semibold text-gray-950">Downloads</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                BibleBuddy saves all Bible in One Year text automatically. Audio downloads let the next studies play without internet.
              </p>
            </div>

            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-accent-soft,#eaf5ff)] px-4 py-2 text-sm font-black text-gray-800">
              <span>Wi-Fi only</span>
              <input
                type="checkbox"
                checked={offlineWifiOnly}
                onChange={(event) => setWifiOnlyPreference(event.target.checked)}
                className="h-5 w-5 accent-[var(--bb-accent,#2563eb)]"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                cacheBibleYearOfflineTextPack();
                setOfflineDownloadStatus("All Bible in One Year text is saved on this device.");
                void refreshOfflineStorageEstimate();
              }}
              className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-white px-4 py-3 text-left text-sm font-black text-gray-900 shadow-sm transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
            >
              Always download all text
              <span className="mt-1 block text-xs font-semibold text-gray-500">Refresh the offline text pack now</span>
            </button>

            <button
              type="button"
              onClick={downloadStarterAudioPack}
              disabled={offlineDownloading !== null}
              className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-accent-soft,#eaf5ff)] px-4 py-3 text-left text-sm font-black text-gray-900 transition hover:brightness-95 disabled:opacity-60"
            >
              {offlineDownloading === "starter" ? "Starting download..." : "Download Days 1-7 audio"}
              <span className="mt-1 block text-xs font-semibold text-gray-600">Starter offline mode for the first week</span>
            </button>

            <button
              type="button"
              onClick={() => void downloadNextSevenAudio()}
              disabled={offlineDownloading !== null}
              className="rounded-2xl bg-[var(--bb-button,#2563eb)] px-4 py-3 text-left text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95 disabled:opacity-60"
            >
              {offlineDownloading === "next7" ? "Starting download..." : "Download next 7 days audio"}
              <span className="mt-1 block text-xs font-semibold opacity-85">Starts from your current Bible in One Year day</span>
            </button>

            <button
              type="button"
              onClick={downloadFullAudioLibrary}
              disabled={offlineDownloading !== null}
              className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-accent-soft,#eaf5ff)] px-4 py-3 text-left text-sm font-black text-gray-900 transition hover:brightness-95 disabled:opacity-60"
            >
              {offlineDownloading === "full" ? "Starting full library..." : "Download full audio library"}
              <span className="mt-1 block text-xs font-semibold text-gray-600">Best on Wi-Fi with plenty of storage</span>
            </button>

            <button
              type="button"
              onClick={() => void clearOfflineDownloads()}
              disabled={offlineDownloading !== null}
              className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-black text-red-700 transition hover:bg-red-100 disabled:opacity-60"
            >
              {offlineDownloading === "clear" ? "Clearing..." : "Clear offline downloads"}
              <span className="mt-1 block text-xs font-semibold text-red-500">Removes saved text and downloaded audio from this device</span>
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-gray-50 px-4 py-3 text-xs font-bold text-gray-600">
            {offlineDownloadStatus || "Days 1-7 plus your current day and next 3 days of audio download automatically when the dashboard opens."}
            {offlineStorageLabel ? <span className="mt-1 block">Device storage used by BibleBuddy: {offlineStorageLabel}</span> : null}
          </div>
        </div>

        {/* Theme Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-2">Theme</h2>
          <p className="mb-4 text-sm text-gray-600">
            Choose Light or Dark. Color skins live in the Skins section.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {availableThemes.map((theme) => {
              return (
                <div
                  key={theme.id}
                  className={`rounded-2xl border p-3 text-left transition ${
                    selectedTheme === theme.id ? "border-[var(--bb-accent,#2563eb)] ring-2 ring-[var(--bb-accent,#2563eb)]/20" : "border-gray-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => void handleThemeSelect(theme.id)}
                    disabled={themeSaving === theme.id}
                    className="w-full text-left transition hover:-translate-y-0.5 disabled:hover:translate-y-0"
                  >
                    <div className="flex gap-1">
                      {[theme.background, theme.surfaceSoft, theme.accent, theme.progressFill].map((color) => (
                        <span key={color} className="h-6 flex-1 rounded-full border border-black/5" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                    <p className="mt-3 text-sm font-black text-gray-950">{theme.name}</p>
                    <p className="mt-1 text-xs font-semibold text-gray-500">
                      {themeSaving === theme.id ? "Saving..." : selectedTheme === theme.id ? "Active" : "Use theme"}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skin Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-2">Skins</h2>
          <p className="mb-4 text-sm text-gray-600">
            Set a simple color skin as your default Bible Buddy experience. Skins include a matching profile ring and flame color.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div
              className={`rounded-2xl border p-3 text-left transition ${
                selectedPremiumSkin === "none" ? "border-[var(--bb-accent,#2563eb)] ring-2 ring-[var(--bb-accent,#2563eb)]/20" : "border-gray-200"
              }`}
            >
              <div className="grid h-28 place-items-center rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-200">
                <span className="text-3xl">BB</span>
              </div>
              <p className="mt-3 text-sm font-black text-gray-950">No Skin</p>
              <p className="mt-1 text-xs font-semibold text-gray-500">
                {selectedPremiumSkin === "none" ? "Active default" : "BibleBuddy's clean base look"}
              </p>
              <button
                type="button"
                onClick={() => void handlePremiumSkinSelect("none")}
                disabled={selectedPremiumSkin === "none" || skinSaving === "none"}
                className="mt-3 w-full rounded-full bg-[var(--bb-button,#2563eb)] px-3 py-2.5 text-xs font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95 disabled:bg-gray-100 disabled:text-gray-500 disabled:shadow-none"
              >
                {skinSaving === "none" ? "Saving..." : selectedPremiumSkin === "none" ? "Set" : "Set Skin"}
              </button>
            </div>

            {ownedPremiumSkins.map((skin) => {
              const storeItem = PREMIUM_SKIN_STORE_ITEMS.find((item) => item.skinId === skin.id);
              const hasSkinAccess =
                ownsPremiumSkin(skin);
              const canDelete = Boolean(storeItem && ownedStoreItemIds.includes(storeItem.id));
              return (
                <div
                  key={skin.id}
                  className={`overflow-hidden rounded-2xl border p-3 text-left transition ${
                    selectedPremiumSkin === skin.id ? "border-[var(--bb-accent,#5DD6FF)] ring-2 ring-[var(--bb-accent,#5DD6FF)]/25" : "border-gray-200"
                  }`}
                >
                  <div
                    className="relative h-28 overflow-hidden rounded-2xl border shadow-[0_12px_26px_rgba(7,16,20,0.12)]"
                    style={{
                      background: `linear-gradient(135deg, ${skin.palette.background}, ${skin.palette.accentSoft})`,
                      borderColor: skin.palette.cardBorder,
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(circle at 70% 18%, ${skin.palette.accentSoft}, transparent 34%)` }}
                    />
                    <div
                      className="absolute bottom-3 left-3 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]"
                      style={{
                        backgroundColor: skin.palette.card,
                        borderColor: skin.palette.cardBorder,
                        color: skin.palette.accent,
                      }}
                    >
                      Color Skin
                    </div>
                    {canDelete && storeItem ? (
                      <div className="absolute right-2 top-2">
                        <button
                          type="button"
                          onClick={() => setOpenSkinActionsId((current) => (current === skin.id ? null : skin.id))}
                          className="grid h-9 w-9 place-items-center rounded-full border border-white/70 bg-white/90 text-lg font-black text-gray-700 shadow-sm transition hover:bg-white"
                          aria-label={`${skin.name} options`}
                        >
                          ...
                        </button>
                        {openSkinActionsId === skin.id ? (
                          <div className="absolute right-0 top-11 z-10 w-36 overflow-hidden rounded-2xl border border-red-100 bg-white p-1 shadow-xl">
                            <button
                              type="button"
                              onClick={() => void handleDeleteStoreItem(storeItem.id)}
                              disabled={removingItemId === storeItem.id}
                              className="w-full rounded-xl px-3 py-2 text-left text-xs font-black text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                            >
                              {removingItemId === storeItem.id ? "Removing..." : "Delete Skin"}
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm font-black text-gray-950">{skin.name}</p>
                  <p className="mt-1 text-xs font-semibold text-gray-500">
                    {selectedPremiumSkin === skin.id ? "Active skin" : hasSkinAccess ? "Ready to set" : "Locked"}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (!hasSkinAccess) {
                        setSettingsMessage(`Buy ${skin.name} in the Diamond Store first, then come back here to set it.`);
                        return;
                      }
                      void handlePremiumSkinSelect(skin.id);
                    }}
                    disabled={!hasSkinAccess || selectedPremiumSkin === skin.id || skinSaving === skin.id}
                    className="mt-3 w-full rounded-full px-3 py-2.5 text-xs font-black shadow-sm transition hover:brightness-95 disabled:bg-gray-100 disabled:text-gray-500 disabled:shadow-none"
                    style={{
                      backgroundColor: hasSkinAccess && selectedPremiumSkin !== skin.id ? skin.palette.accent : undefined,
                      color: hasSkinAccess && selectedPremiumSkin !== skin.id ? skin.palette.buttonText : undefined,
                    }}
                  >
                    {skinSaving === skin.id ? "Saving..." : selectedPremiumSkin === skin.id ? "Set" : "Set Skin"}
                  </button>
                  {!hasSkinAccess ? (
                    <button
                      type="button"
                      onClick={() => router.push("/dashboard?openStore=1")}
                      className="mt-3 w-full rounded-full border px-3 py-2 text-xs font-black transition hover:brightness-110"
                      style={{
                        backgroundColor: skin.palette.background,
                        borderColor: skin.palette.cardBorder,
                        color: skin.palette.textPrimary,
                      }}
                    >
                      Open Diamond Store
                    </button>
                  ) : null}
                </div>
              );
            })}
            {!ownedPremiumSkins.length ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm font-bold text-gray-600 sm:col-span-2">
                Buy color skins in the Diamond Store. Once owned, they show up here to set.
              </div>
            ) : null}
          </div>
        </div>

        {/* Bible Buddy Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6 sm:p-6">
          <h2 className="text-xl font-semibold mb-2">Bible Buddy</h2>
          <p className="mb-4 text-sm text-gray-600">
            Pick the Buddy that should show across your dashboard, menu, popups, games, and study areas.
          </p>

          {activeBuddy ? (
            <div className="relative mx-auto max-w-[620px] px-0 sm:px-14">
              <button
                type="button"
                onClick={() => moveBuddyCard(-1)}
                className="absolute left-1 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-2xl font-black text-[var(--bb-accent,#2563eb)] shadow-sm transition hover:brightness-95 active:scale-95 sm:left-0"
                aria-label="Previous Bible Buddy"
              >
                ‹
              </button>

              <div
                className="mx-auto w-full overflow-hidden pb-3 pt-1 [touch-action:pan-y]"
                onTouchStart={handleBuddySwipeStart}
                onTouchEnd={handleBuddySwipeEnd}
              >
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${activeBuddyIndex * 100}%)` }}
                >
                  {buddySlides.map((buddy, index) => {
                    const isCurrent = buddy.id === selectedBuddy;
                    const isActive = index === activeBuddyIndex;
                    const storeItem = BUDDY_STORE_ITEMS.find((item) => item.id === getBuddyStoreItemId(buddy.id));
                    const canDelete = Boolean(storeItem && buddy.id !== DEFAULT_BUDDY_AVATAR && ownedStoreItemIds.includes(storeItem.id));

                    return (
                      <article
                        key={buddy.id}
                        data-settings-buddy-card-index={index}
                        className={`relative min-w-full overflow-hidden rounded-[26px] border p-4 text-center shadow-[0_16px_42px_rgba(38,63,99,0.12)] transition duration-300 sm:rounded-[30px] sm:p-6 ${
                          isActive ? "scale-100 opacity-100" : "scale-[0.97] opacity-80"
                        }`}
                        style={{
                          borderColor: isCurrent ? "var(--bb-accent,#2563eb)" : "var(--bb-card-border,#dbe7f4)",
                          background:
                            "radial-gradient(circle at 50% 18%, var(--bb-accent-soft,#eaf5ff), transparent 34%), var(--bb-card,#ffffff)",
                        }}
                      >
                        <div className="pointer-events-none absolute inset-x-10 bottom-20 h-24 rounded-full bg-[var(--bb-accent-soft,#eaf5ff)] blur-3xl" aria-hidden="true" />
                        <div className="relative mx-auto grid min-h-[240px] place-items-center sm:min-h-[320px]">
                          <LouisAvatar buddyId={buddy.id} mood={getBuddyMood(buddy, selectedBuddy)} size={isActive ? 230 : 210} />
                        </div>

                        <h3 className="relative -mt-2 text-4xl font-black leading-none text-gray-950 sm:text-5xl">{buddy.name}</h3>
                        <p className="relative mt-3 text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2563eb)] sm:text-sm">{buddy.title}</p>
                        <p className="relative mx-auto mt-3 max-w-sm text-sm font-semibold leading-relaxed text-gray-600">{buddy.description}</p>

                        <button
                          type="button"
                          onClick={() => void handleBuddySelect(buddy.id)}
                          disabled={isCurrent || buddySaving === buddy.id}
                          className={`relative mt-5 w-full rounded-full px-5 py-3.5 text-sm font-black shadow-sm transition active:scale-[0.98] ${
                            isCurrent
                              ? "bg-[var(--bb-accent,#2563eb)] text-[var(--bb-button-text,#ffffff)]"
                              : "bg-[var(--bb-button,#2563eb)] text-[var(--bb-button-text,#ffffff)] hover:brightness-95"
                          } disabled:cursor-default disabled:opacity-95`}
                        >
                          {buddySaving === buddy.id ? "Saving..." : isCurrent ? "Current Buddy" : "Select Buddy"}
                        </button>

                        {canDelete && storeItem ? (
                          <button
                            type="button"
                            onClick={() => void handleDeleteStoreItem(storeItem.id)}
                            disabled={removingItemId === storeItem.id}
                            className="relative mt-3 w-full rounded-full border border-red-200 px-3 py-2 text-xs font-black text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                          >
                            {removingItemId === storeItem.id ? "Removing..." : "Delete"}
                          </button>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => moveBuddyCard(1)}
                className="absolute right-1 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-2xl font-black text-[var(--bb-accent,#2563eb)] shadow-sm transition hover:brightness-95 active:scale-95 sm:right-0"
                aria-label="Next Bible Buddy"
              >
                ›
              </button>

              <div className="mt-1 flex justify-center gap-2">
                {buddySlides.map((buddy, index) => (
                  <button
                    key={buddy.id}
                    type="button"
                    onClick={() => setActiveBuddyIndex(index)}
                    className={`h-2.5 rounded-full transition ${index === activeBuddyIndex ? "w-7 bg-[var(--bb-accent,#2563eb)]" : "w-2.5 bg-[var(--bb-card-border,#dbe7f4)]"}`}
                    aria-label={`Show ${buddy.name}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="rounded-2xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-500">
              No Bible Buddies are available yet.
            </p>
          )}
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your last name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-2">Help</h2>
          <p className="mb-4 text-sm text-gray-600">
            Replay the dashboard walkthrough anytime if you want a quick refresher on the daily flow.
          </p>
          <button
            type="button"
            onClick={handleReplayDashboardIntro}
            className="rounded-full bg-[var(--bb-button,#2563eb)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95"
          >
            Replay Dashboard Walkthrough
          </button>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Password</h2>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Reset your password by email. We'll send you a link to create a new password.
            </p>
            
            {resetPasswordSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                Password reset email sent! Please check your inbox.
              </div>
            )}
            
            <button
              onClick={handleResetPassword}
              disabled={resetPasswordLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resetPasswordLoading ? "Sending..." : "Reset Password"}
            </button>
          </div>
        </div>

        {/* Reading Plan Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Reading Plan</h2>
          
          <div className="space-y-4">
            {!showResetConfirm ? (
              <>
                <p className="text-sm text-gray-600">
                  Reset your Bible reading progress back to the beginning.
                </p>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reset Bible Reading Plan
                </button>
              </>
            ) : (
              <>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-semibold text-red-800 mb-2">
                    ⚠️ Warning
                  </p>
                  <p className="text-sm text-red-700">
                    This will reset your reading progress, levels, and stats back to 0. This cannot be undone.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleResetReadingPlan}
                    disabled={resettingPlan}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resettingPlan ? "Resetting..." : "Yes, Reset"}
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    disabled={resettingPlan}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Promo Code Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Unlock Pro with a Code</h2>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Have a promo or lifetime access code? Enter it below to unlock Pro.
            </p>

            {promoSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                🎉 Pro unlocked! Welcome to BibleBuddy Pro.
              </div>
            )}

            {promoError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {promoError}
              </div>
            )}

            <div className="flex gap-3">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoError(null);
                  setPromoSuccess(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !applyingCode) {
                    handleApplyPromoCode();
                  }
                }}
                placeholder="Enter access code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={applyingCode}
              />
              <button
                onClick={handleApplyPromoCode}
                disabled={applyingCode || !promoCode.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {applyingCode ? "Applying..." : "Apply Code"}
              </button>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Account</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User ID
              </label>
              <p className="text-sm text-gray-600 font-mono bg-gray-50 px-3 py-2 rounded border">
                {user?.id || "N/A"}
              </p>
            </div>

            {user?.created_at && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Joined
                </label>
                <p className="text-sm text-gray-600">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
