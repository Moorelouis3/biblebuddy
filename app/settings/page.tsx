"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LouisAvatar } from "../../components/LouisAvatar";
import SettingsSection from "../../components/SettingsSection";
import { BIBLE_VERSIONS } from "../../lib/bibleVersionPreference";
import { useBibleVersion } from "../../lib/useBibleVersion";
import { APP_LANGUAGES, GERMAN_IS_PUBLIC } from "../../lib/i18n/language";
import { useAppLanguage, useT } from "../../lib/i18n/useT";
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
import { BUDDY_STORE_ITEMS } from "../../lib/bibleBuddyStore";
import {
  BUDDY_AVATARS,
  DEFAULT_BUDDY_AVATAR,
  SELECTED_BUDDY_STORAGE_KEY,
  getBuddyAvatar,
  normalizeBuddyAvatarId,
  type BuddyAvatarId,
} from "../../lib/buddyAvatars";
import { ACTIVE_STREAK_FLAME_STORAGE_KEY, normalizeFlameCosmeticId, persistActiveStreakFlame, type FlameCosmeticId } from "../../lib/flameCosmetics";
import { buildFullName, hasRequiredFullName, splitFullName } from "../../lib/profileName";
import { isAdminUser } from "../../lib/readingProgress";
import type { BuddyAvatar } from "../../lib/buddyAvatars";
import { clearLegacyBibleYearOfflineStorage } from "../../lib/bibleYearOfflinePack";
import BibleLockSettings from "@/components/BibleLockSettings";
import BibleCoverPicker from "@/components/BibleCoverPicker";
import NotificationDiagnostics from "@/components/NotificationDiagnostics";
import { isNativeApp } from "@/lib/nativeApp";
import { APP_WELCOME_PATH } from "@/lib/appHome";

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
};

// Keys, not words: the label is looked up in the reader's language when shown.
const BUDDY_READY_BUTTON_LABEL_KEYS = [
  "settings.buddyReady.letsGo",
  "settings.buddyReady.ok",
  "settings.buddyReady.awesome",
] as const;

type BuddyReadyModal = {
  buddyId: BuddyAvatarId;
  buddyName: string;
  buttonLabelKey: (typeof BUDDY_READY_BUTTON_LABEL_KEYS)[number];
};

// Set from the load effect, which runs before the saved language is known, so
// it is stored as a marker and put into words at render.
const SETTINGS_LOAD_FAILED = "@settings.loadFailed";

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
export default function SettingsPage({ embedded = false }: { embedded?: boolean } = {}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [themeSaving, setThemeSaving] = useState<string | null>(null);
  const [flameSaving, setFlameSaving] = useState<string | null>(null);
  const [settingsMessage, setSettingsMessage] = useState<string | null>(null);
  const [bibleVersion, setBibleVersion] = useBibleVersion();
  const [appLanguage, setAppLanguage] = useAppLanguage();
  const t = useT();
  const [storePurchases, setStorePurchases] = useState<StorePurchaseRow[]>([]);
  const [ownerHasUnlimitedDiamonds, setOwnerHasUnlimitedDiamonds] = useState(false);
  // ?open=cover: arrived from the Bible Covers popup, so open the shelf.
  const [openCoverShelf, setOpenCoverShelf] = useState(false);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("open") === "cover") setOpenCoverShelf(true);
  }, []);
  const [selectedTheme, setSelectedTheme] = useState<AppThemeId>("light");
  const [selectedFlame, setSelectedFlame] = useState<FlameCosmeticId>("default");
  const [selectedBuddy, setSelectedBuddy] = useState<BuddyAvatarId>(DEFAULT_BUDDY_AVATAR);
  const [buddySaving, setBuddySaving] = useState<BuddyAvatarId | null>(null);
  const [buddyReadyModal, setBuddyReadyModal] = useState<BuddyReadyModal | null>(null);
  const [activeBuddyIndex, setActiveBuddyIndex] = useState(0);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
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

  // Delete account
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteAccountError, setDeleteAccountError] = useState<string | null>(null);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [guestLogoutWarningOpen, setGuestLogoutWarningOpen] = useState(false);

  useEffect(() => {
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
          .select("display_name, username, app_theme, selected_streak_flame, selected_buddy_avatar")
          .eq("user_id", currentUser.id)
          .maybeSingle();

        let profile = profileRequest.data as SettingsProfileRow | null;
        if (profileRequest.error && /app_theme_selected_at/i.test(profileRequest.error.message || "")) {
          const fallbackProfile = await supabase
            .from("profile_stats")
            .select("display_name, username, app_theme, selected_streak_flame, selected_buddy_avatar")
            .eq("user_id", currentUser.id)
            .maybeSingle();
          profile = fallbackProfile.data as SettingsProfileRow | null;
        } else if (profileRequest.error && /selected_streak_flame|selected_buddy_avatar/i.test(profileRequest.error.message || "")) {
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
        const localSelectedBuddy =
          typeof window !== "undefined" ? window.localStorage.getItem(SELECTED_BUDDY_STORAGE_KEY) : null;
        const resolvedSelectedBuddy = normalizeBuddyAvatarId(profile?.selected_buddy_avatar || localSelectedBuddy);
        setSelectedBuddy(resolvedSelectedBuddy);
        const localSelectedFlame =
          typeof window !== "undefined" ? window.localStorage.getItem(ACTIVE_STREAK_FLAME_STORAGE_KEY) : null;
        const dbSelectedFlame = normalizeFlameCosmeticId(profile?.selected_streak_flame);
        const resolvedSelectedFlame = dbSelectedFlame !== "default" ? dbSelectedFlame : normalizeFlameCosmeticId(localSelectedFlame);
        setSelectedFlame(resolvedSelectedFlame);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(SELECTED_BUDDY_STORAGE_KEY, resolvedSelectedBuddy);
          persistActiveStreakFlame(resolvedSelectedFlame);
          cacheAppThemeForUser(currentUser.id, savedTheme);
          if (dbTheme === savedTheme) clearPendingAppThemeSync(currentUser.id, savedTheme);
          applyAppThemeToDocument(savedTheme);
          window.dispatchEvent(new CustomEvent("bb:selected-buddy-avatar-changed", { detail: { buddyId: resolvedSelectedBuddy } }));
        }
          setStorePurchases((purchases || []) as StorePurchaseRow[]);
        }
      } catch (error) {
        console.error("[SETTINGS] Could not load settings:", error);
        setSettingsMessage(SETTINGS_LOAD_FAILED);
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
      alert(t("settings.profile.nameRequired"));
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

      alert(t("settings.profile.updated"));
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert(t("settings.errorWithMessage", { message: error.message }));
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    clearLegacyBibleYearOfflineStorage();
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
      alert(t("settings.errorWithMessage", { message: error.message }));
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

      alert(t("settings.readingPlan.done"));
      setShowResetConfirm(false);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error resetting reading plan:", error);
      alert(t("settings.errorWithMessage", { message: error.message }));
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

  async function handleDeleteAccount() {
    if (deleteConfirmText.trim().toUpperCase() !== "DELETE") {
      setDeleteAccountError(t("settings.delete.typeError"));
      return;
    }

    setDeletingAccount(true);
    setDeleteAccountError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error(t("settings.delete.signInAgain"));
      }

      const response = await fetch("/api/account/delete", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || t("settings.delete.failed"));
      }

      setAccountDeleted(true);
      try {
        await supabase.auth.signOut({ scope: "local" });
      } catch {
        // the login is already gone; clearing the local session is best-effort
      }
      setTimeout(() => {
        // In the app, "/" is the marketing landing page, and a hard navigation
        // there leaves the webview on an advert for the app you just left -
        // which is what Louis saw, with no way back and no profile. /app is
        // the native front door: it finds no session and shows the welcome
        // screen, which is what being signed out should look like.
        if (isNativeApp()) {
          router.replace(APP_WELCOME_PATH);
          return;
        }
        window.location.href = "/";
      }, 4000);
    } catch (error) {
      console.error("Error deleting account:", error);
      setDeleteAccountError(
        (error instanceof Error && error.message) || t("settings.delete.failed")
      );
      setDeletingAccount(false);
    }
  }

  async function handleThemeSelect(themeId: AppThemeId) {
    if (!user) return;
    const previousTheme = selectedTheme;
    setThemeSaving(themeId);
    setSettingsMessage(null);
    setSelectedTheme(themeId);
    if (typeof window !== "undefined") {
      cacheAppThemeForUser(user.id, themeId, { markSelected: true });
      applyAppThemeToDocument(themeId);
      window.dispatchEvent(new CustomEvent("bb:app-theme-purchased", { detail: { themeId } }));
    }
    try {
      const selectedAt = new Date().toISOString();
      let { error } = await supabase.from("profile_stats").upsert(
        {
          user_id: user.id,
          app_theme: themeId,
          app_theme_selected_at: selectedAt,
          updated_at: selectedAt,
        },
        { onConflict: "user_id" },
      );
      if (error && /app_theme_selected_at/i.test(error.message || "")) {
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
      setSettingsMessage(t("settings.display.updated"));
    } catch (error: any) {
      setSelectedTheme(previousTheme);
      if (typeof window !== "undefined") {
        cacheAppThemeForUser(user.id, previousTheme);
        applyAppThemeToDocument(previousTheme);
        window.dispatchEvent(new CustomEvent("bb:app-theme-purchased", { detail: { themeId: previousTheme } }));
      }
      setSettingsMessage(error.message || t("settings.display.updateFailed"));
    } finally {
      setThemeSaving(null);
    }
  }

  async function handleFlameSelect(flameId: FlameCosmeticId) {
    if (!user) return;
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
      setSettingsMessage(t("settings.flame.updated"));
    } catch (error: any) {
      setSelectedFlame(previousFlame);
      if (typeof window !== "undefined") {
        persistActiveStreakFlame(previousFlame);
        window.dispatchEvent(new CustomEvent("bb:streak-flame-changed", { detail: { flameId: previousFlame } }));
      }
      setSettingsMessage(
        /selected_streak_flame/i.test(error.message || "")
          ? "Streak flames need one database update before they can save. Run ADD_SELECTED_STREAK_FLAME.sql in Supabase."
          : error.message || t("settings.flame.updateFailed"),
      );
    } finally {
      setFlameSaving(null);
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
      setSettingsMessage(t("settings.buddy.updated"));
      setActiveBuddyIndex(0);
      const buddy = getBuddyAvatar(buddyId);
      const labelIndex = Math.abs(buddyId.charCodeAt(0) + buddyId.length) % BUDDY_READY_BUTTON_LABEL_KEYS.length;
      setBuddyReadyModal({
        buddyId,
        buddyName: buddy.name,
        buttonLabelKey: BUDDY_READY_BUTTON_LABEL_KEYS[labelIndex],
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
          : error.message || t("settings.buddy.updateFailed"),
      );
    } finally {
      setBuddySaving(null);
    }
  }

  async function handleDeleteStoreItem(itemId: string) {
    if (!user || removingItemId) return;
    const item =
      BUDDY_STORE_ITEMS.find((storeItem) => storeItem.id === itemId);
    if (!item) return;

    const confirmed = window.confirm(t("settings.buddy.removeConfirm", { item: item.title }));
    if (!confirmed) return;

    setRemovingItemId(itemId);
    setSettingsMessage(null);
    try {
      const { error } = await supabase
        .from("user_store_purchases")
        .delete()
        .eq("user_id", user.id)
        .eq("item_id", itemId);
      if (error) throw error;

      setStorePurchases((current) => current.filter((purchase) => purchase.item_id !== itemId));

      const removedBuddyId = BUDDY_AVATARS.find((buddy) => getBuddyStoreItemId(buddy.id) === itemId)?.id;
      if (removedBuddyId && selectedBuddy === removedBuddyId) {
        await handleBuddySelect(DEFAULT_BUDDY_AVATAR);
      }

      setSettingsMessage(t("settings.buddy.removed", { item: item.title }));
    } catch (error: any) {
      setSettingsMessage(
        /row-level security|policy|permission/i.test(error.message || "")
          ? "Deleting purchases needs the store delete policy SQL. Run ADD_USER_STORE_PURCHASES_DELETE_POLICY.sql in Supabase."
          : error.message || t("settings.buddy.removeFailed"),
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
      <div className={`${embedded ? "min-h-[420px]" : "min-h-screen"} bg-[var(--bb-background,#0e1218)] flex items-center justify-center`}>
        <p className="text-[var(--bb-text-secondary,#d1d5db)]">{t("settings.loading")}</p>
      </div>
    );
  }

  const ownedStoreItemIds = storePurchases.map((purchase) => purchase.item_id);
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
  // One sentence with the word to type in bold in the middle of it.
  const [deleteTypeBefore, deleteTypeAfter = ""] = t("settings.delete.typeToConfirm").split("{word}");

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

  // NOT its own scroll container. It was h-dvh + overflow-y-auto, and inside
  // the iOS app that put the last stretch of the page permanently out of
  // reach: the body carries the status-bar inset, so a child asking for the
  // full viewport height hangs off the bottom of the screen by exactly that
  // much, and overscroll-behavior:contain meant you could not scroll to it.
  // Delete my account is the last thing on this page. Louis had to turn the
  // phone sideways to tap it.
  //
  // Scrolling with the document instead fixes it everywhere and costs nothing.
  // The padding clears the floating navigation pill: --bb-bottom-nav-h is its
  // real measured height, safe area included, published by BottomNav.
  return (
    <div className={`${embedded ? "min-h-0 overflow-visible" : "min-h-dvh"} bg-[var(--bb-background,#0e1218)] pb-[calc(var(--bb-bottom-nav-h,0px)+3rem)] text-[var(--bb-text-primary,#f9fafb)] [overscroll-behavior:contain] [-webkit-overflow-scrolling:touch]`}>
      {guestLogoutWarningOpen ? (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/55 px-4">
          <div className="w-full max-w-md rounded-3xl border border-[#d8e7f2] bg-white p-6 text-center shadow-2xl">
            <button type="button" onClick={() => setGuestLogoutWarningOpen(false)} className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-lg font-black text-gray-500 transition hover:bg-gray-200" aria-label={t("settings.guest.closeAria")}>
              x
            </button>
            <div className="mx-auto mt-1 flex h-24 w-24 items-center justify-center rounded-full bg-[#edf7ff]">
              <LouisAvatar mood="think" size={82} />
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#5f93b8]">{t("settings.guest.eyebrow")}</p>
            <h2 className="mt-2 text-2xl font-black text-gray-950">{t("settings.guest.title")}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {t("settings.guest.body")}
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
                {t("settings.guest.create")}
              </button>
              <button type="button" onClick={() => void performLogout()} className="w-full rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-700 transition hover:bg-red-100">
                {t("settings.guest.logoutAnyway")}
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
                aria-label={t("settings.buddyReady.closeAria")}
              >
                x
              </button>
              <div className="relative mx-auto mt-1 grid h-40 w-40 place-items-center rounded-full bg-white shadow-[0_16px_36px_rgba(38,63,99,0.16)]">
                <LouisAvatar buddyId={buddyReadyModal.buddyId} mood="reading" size={136} />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-accent,#2563eb)]">
                {t("settings.buddyReady.eyebrow")}
              </p>
              <h2 className="mt-2 text-3xl font-black leading-tight text-gray-950">
                {t("settings.buddyReady.title", { name: buddyReadyModal.buddyName })}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-gray-600">
                {t("settings.buddyReady.body")}
              </p>
              <button
                type="button"
                onClick={() => setBuddyReadyModal(null)}
                className="mt-6 w-full rounded-full bg-[var(--bb-button,#2563eb)] px-6 py-3.5 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95 active:scale-[0.98]"
              >
                {t(buddyReadyModal.buttonLabelKey)}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className={`${embedded ? "max-w-xl px-1 py-1" : "max-w-2xl px-4 py-8"} mx-auto`}>
        <h1 className="text-3xl font-bold mb-8 text-[var(--bb-text-primary,#f9fafb)]">{t("settings.title")}</h1>

        {settingsMessage ? (
          <div className="mb-6 rounded-xl border border-[var(--bb-card-border,#d1d5db)] bg-[var(--bb-accent-soft,#eaf5ff)] p-4 text-sm font-bold text-[var(--bb-text-primary,#111827)]">
            {settingsMessage === SETTINGS_LOAD_FAILED ? t("settings.loadFailed") : settingsMessage}
          </div>
        ) : null}

        {/* Bible Covers are the one design choice (Louis, 2026-11-21: "remove the
            themes section.. we only have covers now.. not themes.. two separate
            designs competing"). The colour-theme picker that sat here is gone;
            lib/appThemes.ts now always paints the plain Light look underneath a
            cover. */}
        {/* ?open=cover (the Bible Covers popup's button) opens the shelf. */}
        <SettingsSection
          key={openCoverShelf ? "cover-open" : "cover"}
          defaultOpen={openCoverShelf}
          title={t("settings.cover.title")}
          icon="📖"
          description={t("settings.cover.description")}
        >
          <BibleCoverPicker />
        </SettingsSection>

        {/* One Bible version for the whole app (Louis, 2026-11-27: "can we make
            it site wide for the translation instead of every place"). The
            same choice the readers and Bible Memory offer; see
            lib/bibleVersionPreference.ts for who obeys it and who cannot. */}
        {/* The app's language (2026-11-28). An experiment for now: German is
            shown to admins only until Louis opens it (GERMAN_IS_PUBLIC in
            lib/i18n/language.ts). Separate from the Bible version below. */}
        {GERMAN_IS_PUBLIC || ownerHasUnlimitedDiamonds ? (
          <SettingsSection title={t("settings.language.title")} icon="🌍" description={t("settings.language.description")}>
            <div className="flex flex-wrap gap-2" role="group" aria-label={t("settings.language.title")}>
              {APP_LANGUAGES.map((option) => {
                const active = appLanguage === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setAppLanguage(option.value)}
                    aria-pressed={active}
                    lang={option.value}
                    className="min-h-[52px] flex-1 rounded-xl border px-3 py-2 text-left transition"
                    style={
                      active
                        ? { background: "var(--bb-button,#0056FD)", color: "var(--bb-button-text,#ffffff)", borderColor: "transparent" }
                        : { background: "var(--bb-card,#ffffff)", color: "var(--bb-text-primary,#111827)", borderColor: "var(--bb-card-border,#d1d5db)" }
                    }
                  >
                    <span className="block text-base font-black">{option.name}</span>
                  </button>
                );
              })}
            </div>
            {appLanguage === "de" ? (
              <>
                <p className="mt-3 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">{t("settings.language.note")}</p>
                {bibleVersion !== "lut" ? (
                  <button
                    type="button"
                    onClick={() => setBibleVersion("lut")}
                    className="mt-3 rounded-xl border px-4 py-2.5 text-sm font-black"
                    style={{ background: "var(--bb-card,#ffffff)", color: "var(--bb-text-primary,#111827)", borderColor: "var(--bb-card-border,#d1d5db)" }}
                  >
                    {t("settings.language.suggestBible")}
                  </button>
                ) : null}
              </>
            ) : null}
          </SettingsSection>
        ) : null}

        <SettingsSection title={t("settings.bibleVersion.title")} icon="📜" description={t("settings.bibleVersion.description")}>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t("settings.bibleVersion.title")}>
            {BIBLE_VERSIONS.map((option) => {
              const active = bibleVersion === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setBibleVersion(option.value)}
                  aria-pressed={active}
                  className="min-h-[52px] flex-1 rounded-xl border px-3 py-2 text-left transition"
                  style={
                    active
                      ? { background: "var(--bb-button,#0056FD)", color: "var(--bb-button-text,#ffffff)", borderColor: "transparent" }
                      : { background: "var(--bb-card,#ffffff)", color: "var(--bb-text-primary,#111827)", borderColor: "var(--bb-card-border,#d1d5db)" }
                  }
                >
                  <span className="block text-base font-black">{option.label}</span>
                  <span className="block text-xs font-semibold opacity-80">{option.name}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
            {t("settings.bibleVersion.note")}
          </p>
        </SettingsSection>

        {/* Bible Buddy Section */}
        <SettingsSection title={t("settings.buddy.title")} icon="🧑" description={t("settings.buddy.description")}>

          {activeBuddy ? (
            <div className="relative mx-auto max-w-[620px] px-0 sm:px-14">
              <button
                type="button"
                onClick={() => moveBuddyCard(-1)}
                className="absolute left-1 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-2xl font-black text-[var(--bb-accent,#2563eb)] shadow-sm transition hover:brightness-95 active:scale-95 sm:left-0"
                aria-label={t("settings.buddy.previousAria")}
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
                          {buddySaving === buddy.id ? t("settings.saving") : isCurrent ? t("settings.buddy.current") : t("settings.buddy.select")}
                        </button>

                        {canDelete && storeItem ? (
                          <button
                            type="button"
                            onClick={() => void handleDeleteStoreItem(storeItem.id)}
                            disabled={removingItemId === storeItem.id}
                            className="relative mt-3 w-full rounded-full border border-red-200 px-3 py-2 text-xs font-black text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                          >
                            {removingItemId === storeItem.id ? t("settings.buddy.removing") : t("settings.buddy.delete")}
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
                aria-label={t("settings.buddy.nextAria")}
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
                    aria-label={t("settings.buddy.showAria", { name: buddy.name })}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="rounded-2xl bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-500">
              {t("settings.buddy.none")}
            </p>
          )}
        </SettingsSection>

        {/* Profile Section */}
        <SettingsSection title={t("settings.profile.title")} icon="👤" description={t("settings.profile.description")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("settings.profile.firstName")}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t("settings.profile.firstNamePlaceholder")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("settings.profile.lastName")}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t("settings.profile.lastNamePlaceholder")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("settings.profile.email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t("settings.profile.emailPlaceholder")}
              />
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? t("settings.saving") : t("settings.profile.save")}
            </button>
          </div>
        </SettingsSection>

        {/* Password Section */}
        <SettingsSection title={t("settings.password.title")} icon="🔒" description={t("settings.password.description")}>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {t("settings.password.body")}
            </p>
            
            {resetPasswordSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {t("settings.password.sent")}
              </div>
            )}
            
            <button
              onClick={handleResetPassword}
              disabled={resetPasswordLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resetPasswordLoading ? t("settings.password.sending") : t("settings.password.reset")}
            </button>
          </div>
        </SettingsSection>

        {/* The Bible lock renders nothing unless this device can do it, so it
            costs the website and Android nothing to have it here. */}
        {/* What iOS actually thinks about notifications, and a button to ask
            again. Renders nothing outside the app. */}
        <NotificationDiagnostics />

        <BibleLockSettings />

        {/* Reading Plan Section */}
        <SettingsSection title={t("settings.readingPlan.title")} icon="📖" description={t("settings.readingPlan.description")}>
          <div className="space-y-4">
            {!showResetConfirm ? (
              <>
                <p className="text-sm text-gray-600">
                  {t("settings.readingPlan.description")}
                </p>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  {t("settings.readingPlan.resetButton")}
                </button>
              </>
            ) : (
              <>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-semibold text-red-800 mb-2">
                    {t("settings.readingPlan.warningTitle")}
                  </p>
                  <p className="text-sm text-red-700">
                    {t("settings.readingPlan.warningBody")}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleResetReadingPlan}
                    disabled={resettingPlan}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resettingPlan ? t("settings.readingPlan.resetting") : t("settings.readingPlan.confirm")}
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    disabled={resettingPlan}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t("settings.cancel")}
                  </button>
                </div>
              </>
            )}
          </div>
        </SettingsSection>

        {/* Account Section */}
        <SettingsSection title={t("settings.account.title")} icon="🪪" description={t("settings.account.description")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("settings.account.userId")}
              </label>
              <p className="text-sm text-gray-600 font-mono bg-gray-50 px-3 py-2 rounded border">
                {user?.id || t("settings.account.notAvailable")}
              </p>
            </div>

            {user?.created_at && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("settings.account.joined")}
                </label>
                <p className="text-sm text-gray-600">
                  {new Date(user.created_at).toLocaleDateString(t.locale)}
                </p>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              {t("settings.account.logout")}
            </button>
          </div>
        </SettingsSection>

        {/* Help Section */}
        <SettingsSection title={t("settings.help.title")} icon="❓" description={t("settings.help.description")}>
          <button
            type="button"
            onClick={handleReplayDashboardIntro}
            className="rounded-full bg-[var(--bb-button,#2563eb)] px-6 py-3 text-sm font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95"
          >
            {t("settings.help.replay")}
          </button>
        </SettingsSection>

        {/* Delete Account Section */}
        <SettingsSection title={t("settings.delete.title")} icon="⚠️" tone="danger" description={t("settings.delete.description")}>
          <div className="space-y-4">
            {accountDeleted ? (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {t("settings.delete.done")}
              </div>
            ) : !showDeleteAccount ? (
              <>
                <p className="text-sm text-gray-600">
                  {t("settings.delete.intro")}
                </p>
                <button
                  onClick={() => {
                    setShowDeleteAccount(true);
                    setDeleteConfirmText("");
                    setDeleteAccountError(null);
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  {t("settings.delete.title")}
                </button>
              </>
            ) : (
              <>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-semibold text-red-800 mb-2">
                    {t("settings.delete.warningTitle")}
                  </p>
                  <p className="text-sm text-red-700">
                    {t("settings.delete.warningBody")}{" "}
                    {deleteTypeBefore}<span className="font-bold">DELETE</span>{deleteTypeAfter}
                  </p>
                </div>

                {deleteAccountError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {deleteAccountError}
                  </div>
                )}

                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => {
                    setDeleteConfirmText(e.target.value);
                    setDeleteAccountError(null);
                  }}
                  placeholder={t("settings.delete.placeholder")}
                  autoCapitalize="characters"
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  disabled={deletingAccount}
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deletingAccount || deleteConfirmText.trim().toUpperCase() !== "DELETE"}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingAccount ? t("settings.delete.deleting") : t("settings.delete.confirm")}
                  </button>
                  <button
                    onClick={() => setShowDeleteAccount(false)}
                    disabled={deletingAccount}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t("settings.cancel")}
                  </button>
                </div>
              </>
            )}
          </div>
        </SettingsSection>

        <p className="text-center text-xs text-[var(--bb-text-secondary,#9ca3af)]">
          <Link href="/privacy" className="underline hover:opacity-80">{t("settings.legal.privacy")}</Link>
          {" · "}
          <Link href="/terms" className="underline hover:opacity-80">{t("settings.legal.terms")}</Link>
          {" · "}
          <Link href="/community-guidelines" className="underline hover:opacity-80">{t("settings.legal.guidelines")}</Link>
        </p>
      </div>
    </div>
  );
}
