"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import StreakFlameEmoji from "../../components/StreakFlameEmoji";
import { LouisAvatar } from "../../components/LouisAvatar";
import {
  APP_THEME_STORAGE_KEY,
  APP_THEMES,
  applyAppThemeToDocument,
  normalizeAppThemeId,
  type AppThemeId,
} from "../../lib/appThemes";
import { BUDDY_STORE_ITEMS, PREMIUM_SKIN_STORE_ITEMS, STREAK_FLAME_STORE_ITEMS, THEME_STORE_ITEMS } from "../../lib/bibleBuddyStore";
import {
  BUDDY_AVATARS,
  DEFAULT_BUDDY_AVATAR,
  SELECTED_BUDDY_STORAGE_KEY,
  getBuddyAvatar,
  normalizeBuddyAvatarId,
  type BuddyAvatarId,
} from "../../lib/buddyAvatars";
import { ACTIVE_STREAK_FLAME_STORAGE_KEY, FLAME_COSMETICS, normalizeFlameCosmeticId, type FlameCosmeticId } from "../../lib/flameCosmetics";
import {
  PREMIUM_SKINS,
  PREMIUM_SKIN_STORAGE_KEY,
  applyPremiumSkinToDocument,
  normalizePremiumSkinId,
  type PremiumSkinId,
} from "../../lib/premiumSkins";
import { buildFullName, hasRequiredFullName, splitFullName } from "../../lib/profileName";
import { isAdminUser } from "../../lib/readingProgress";
import type { BuddyAvatar } from "../../lib/buddyAvatars";

type StorePurchaseRow = {
  item_id: string;
  item_kind: string;
};

type SettingsProfileRow = {
  display_name?: string | null;
  username?: string | null;
  app_theme?: string | null;
  selected_streak_flame?: string | null;
  selected_buddy_avatar?: string | null;
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

  // Promo code
  const [promoCode, setPromoCode] = useState("");
  const [applyingCode, setApplyingCode] = useState(false);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
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
        if (profileRequest.error && /selected_streak_flame|selected_buddy_avatar/i.test(profileRequest.error.message || "")) {
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
        setSelectedTheme(normalizeAppThemeId(profile?.app_theme));
        const resolvedPremiumSkin =
          typeof window !== "undefined" ? normalizePremiumSkinId(window.localStorage.getItem(PREMIUM_SKIN_STORAGE_KEY)) : "none";
        setSelectedPremiumSkin(resolvedPremiumSkin);
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
          window.localStorage.setItem(ACTIVE_STREAK_FLAME_STORAGE_KEY, resolvedSelectedFlame);
          window.localStorage.setItem(PREMIUM_SKIN_STORAGE_KEY, resolvedPremiumSkin);
          applyPremiumSkinToDocument(resolvedPremiumSkin);
          window.dispatchEvent(new CustomEvent("bb:selected-buddy-avatar-changed", { detail: { buddyId: resolvedSelectedBuddy } }));
        }
        setStorePurchases((purchases || []) as StorePurchaseRow[]);
      }
      setLoading(false);
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
    setThemeSaving(themeId);
    setSettingsMessage(null);
    try {
      const { error } = await supabase.from("profile_stats").update({ app_theme: themeId }).eq("user_id", user.id);
      if (error) throw error;
      setSelectedTheme(themeId);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(APP_THEME_STORAGE_KEY, themeId);
        window.localStorage.setItem("bb:dashboard-theme", themeId === "dark" ? "dark" : "light");
        window.dispatchEvent(new CustomEvent("bb:app-theme-purchased", { detail: { themeId } }));
      }
      applyAppThemeToDocument(themeId);
      setSettingsMessage("Theme updated.");
    } catch (error: any) {
      setSettingsMessage(error.message || "Could not update theme.");
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
      window.localStorage.setItem(ACTIVE_STREAK_FLAME_STORAGE_KEY, flameId);
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
        window.localStorage.setItem(ACTIVE_STREAK_FLAME_STORAGE_KEY, previousFlame);
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
    const ownsSkin = skinId === "none" || ownerHasUnlimitedDiamonds || Boolean(storeItem && storePurchases.some((purchase) => purchase.item_id === storeItem.id));
    if (!ownsSkin) {
      setSettingsMessage("Buy this Premium Skin in the store first.");
      return;
    }

    const previousSkin = selectedPremiumSkin;
    const previousFlame = selectedFlame;
    setSkinSaving(skinId);
    setSettingsMessage(null);
    setSelectedPremiumSkin(skinId);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PREMIUM_SKIN_STORAGE_KEY, skinId);
      applyPremiumSkinToDocument(skinId);
      window.dispatchEvent(new CustomEvent("bb:premium-skin-changed", { detail: { skinId } }));
    }

    try {
      const matchingFlame =
        skinId === "blue-storm"
          ? "blue"
          : skinId === "midnight-garden"
            ? "green"
            : skinId === "lavender-prayer"
              ? "purple"
              : skinId === "ruby-village"
                ? "red"
                : null;
      if (matchingFlame) {
        setSelectedFlame(matchingFlame);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(ACTIVE_STREAK_FLAME_STORAGE_KEY, matchingFlame);
          window.dispatchEvent(new CustomEvent("bb:streak-flame-changed", { detail: { flameId: matchingFlame } }));
        }
        const { error } = await supabase
          .from("profile_stats")
          .update({
            selected_streak_flame: matchingFlame,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id);
        if (error) throw error;
      }

      const { error: skinError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: user.id,
            active_premium_skin: skinId,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" },
        );
      if (skinError && !/active_premium_skin/i.test(skinError.message || "")) throw skinError;

      setSettingsMessage(skin ? `${skin.name} is now your default Premium Skin.` : "Premium Skin removed.");
    } catch (error: any) {
      setSelectedPremiumSkin(previousSkin);
      setSelectedFlame(previousFlame);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(PREMIUM_SKIN_STORAGE_KEY, previousSkin);
        window.localStorage.setItem(ACTIVE_STREAK_FLAME_STORAGE_KEY, previousFlame);
        applyPremiumSkinToDocument(previousSkin);
        window.dispatchEvent(new CustomEvent("bb:premium-skin-changed", { detail: { skinId: previousSkin } }));
        window.dispatchEvent(new CustomEvent("bb:streak-flame-changed", { detail: { flameId: previousFlame } }));
      }
      setSettingsMessage(error.message || "Could not update Premium Skin.");
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
      STREAK_FLAME_STORE_ITEMS.find((storeItem) => storeItem.id === itemId) ||
      BUDDY_STORE_ITEMS.find((storeItem) => storeItem.id === itemId);
    if (!item) return;

    const confirmed = window.confirm(`Remove ${item.title} from your account?`);
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

      if (item.themeId && selectedTheme === item.themeId) {
        await handleThemeSelect("light");
      }

      if (item.flameId && selectedFlame === item.flameId) {
        await handleFlameSelect("default");
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
  const ownedThemeIds = new Set(
    THEME_STORE_ITEMS
      .filter((item) => ownedStoreItemIds.includes(item.id) && item.themeId)
      .map((item) => item.themeId),
  );
  const availableThemes = APP_THEMES.filter((theme) =>
    ownerHasUnlimitedDiamonds || theme.id === "light" || theme.id === "dark" || ownedThemeIds.has(theme.id),
  );
  const visiblePremiumSkins = PREMIUM_SKINS;
  const ownedFlameIds = new Set(
    STREAK_FLAME_STORE_ITEMS
      .filter((item) => ownedStoreItemIds.includes(item.id) && item.flameId)
      .map((item) => item.flameId),
  );
  const availableFlames = FLAME_COSMETICS.filter((flame) => ownerHasUnlimitedDiamonds || flame.id === "default" || ownedFlameIds.has(flame.id));
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
    <div className="min-h-screen bg-gray-50 pb-12">
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

        {/* Theme Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-2">Theme</h2>
          <p className="mb-4 text-sm text-gray-600">
            Light and Dark are always here. Themes you buy in the Diamond Store show up here too.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {availableThemes.map((theme) => {
              const storeItem = THEME_STORE_ITEMS.find((item) => item.themeId === theme.id);
              const canDelete = Boolean(storeItem && ownedStoreItemIds.includes(storeItem.id));
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
                  {canDelete && storeItem ? (
                    <button
                      type="button"
                      onClick={() => void handleDeleteStoreItem(storeItem.id)}
                      disabled={removingItemId === storeItem.id}
                      className="mt-3 w-full rounded-full border border-red-200 px-3 py-1.5 text-xs font-black text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                    >
                      {removingItemId === storeItem.id ? "Removing..." : "Delete"}
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Premium Skin Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-2">Premium Skins</h2>
          <p className="mb-4 text-sm text-gray-600">
            Set a cinematic skin as your default Bible Buddy experience. Premium Skins stay here so you can turn them on after buying them.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div
              className={`rounded-2xl border p-3 text-left transition ${
                selectedPremiumSkin === "none" ? "border-[var(--bb-accent,#2563eb)] ring-2 ring-[var(--bb-accent,#2563eb)]/20" : "border-gray-200"
              }`}
            >
              <button
                type="button"
                onClick={() => void handlePremiumSkinSelect("none")}
                disabled={skinSaving === "none"}
                className="w-full text-left transition hover:-translate-y-0.5 disabled:hover:translate-y-0"
              >
                <div className="grid h-28 place-items-center rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-200">
                  <span className="text-3xl">BB</span>
                </div>
                <p className="mt-3 text-sm font-black text-gray-950">No Premium Skin</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  {skinSaving === "none" ? "Saving..." : selectedPremiumSkin === "none" ? "Active" : "Use default"}
                </p>
              </button>
            </div>

            {visiblePremiumSkins.map((skin) => {
              const storeItem = PREMIUM_SKIN_STORE_ITEMS.find((item) => item.skinId === skin.id);
              const hasSkinAccess =
                ownerHasUnlimitedDiamonds ||
                selectedPremiumSkin === skin.id ||
                Boolean(storeItem && ownedStoreItemIds.includes(storeItem.id));
              const canDelete = Boolean(storeItem && ownedStoreItemIds.includes(storeItem.id));
              return (
                <div
                  key={skin.id}
                  className={`overflow-hidden rounded-2xl border p-3 text-left transition ${
                    selectedPremiumSkin === skin.id ? "border-[var(--bb-accent,#5DD6FF)] ring-2 ring-[var(--bb-accent,#5DD6FF)]/25" : "border-gray-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (!hasSkinAccess) {
                        setSettingsMessage(`Buy ${skin.name} in the Diamond Store first, then come back here to set it.`);
                        return;
                      }
                      void handlePremiumSkinSelect(skin.id);
                    }}
                    disabled={skinSaving === skin.id}
                    className="w-full text-left transition hover:-translate-y-0.5 disabled:hover:translate-y-0"
                  >
                    <div
                      className="relative h-28 overflow-hidden rounded-2xl border bg-cover bg-center shadow-[0_16px_36px_rgba(7,16,20,0.28)]"
                      style={{
                        backgroundColor: skin.palette.background,
                        backgroundImage: `linear-gradient(180deg, rgba(3,10,18,0.04), rgba(3,10,18,0.38)), url("${skin.backgroundImage}")`,
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
                          backgroundColor: "rgba(6, 16, 20, 0.72)",
                          borderColor: skin.palette.cardBorder,
                          color: skin.palette.textPrimary,
                        }}
                      >
                        Premium Skin
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-black text-gray-950">{skin.name}</p>
                    <p className="mt-1 text-xs font-semibold text-gray-500">
                      {skinSaving === skin.id ? "Saving..." : selectedPremiumSkin === skin.id ? "Active" : hasSkinAccess ? "Use skin" : "Locked"}
                    </p>
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
                  {canDelete && storeItem ? (
                    <button
                      type="button"
                      onClick={() => void handleDeleteStoreItem(storeItem.id)}
                      disabled={removingItemId === storeItem.id}
                      className="mt-3 w-full rounded-full border border-red-200 px-3 py-1.5 text-xs font-black text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                    >
                      {removingItemId === storeItem.id ? "Removing..." : "Delete"}
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Flame Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-2">Streak Flame</h2>
          <p className="mb-4 text-sm text-gray-600">
            Bought flames replace the real dashboard flame, even before a 30 day streak.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {availableFlames.map((flame) => {
              const storeItem = STREAK_FLAME_STORE_ITEMS.find((item) => item.flameId === flame.id);
              const canDelete = Boolean(storeItem && ownedStoreItemIds.includes(storeItem.id));
              return (
                <div
                  key={flame.id}
                  className={`rounded-2xl border p-3 text-center transition ${
                    selectedFlame === flame.id ? "border-[var(--bb-accent,#2563eb)] ring-2 ring-[var(--bb-accent,#2563eb)]/20" : "border-gray-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => void handleFlameSelect(flame.id)}
                    disabled={flameSaving === flame.id}
                    className="w-full text-center transition hover:-translate-y-0.5 disabled:hover:translate-y-0"
                  >
                    <StreakFlameEmoji flameId={flame.id} size={48} title={flame.name} />
                    <p className="mt-3 text-sm font-black text-gray-950">{flame.name}</p>
                    <p className="mt-1 text-xs font-semibold text-gray-500">
                      {flameSaving === flame.id ? "Saving..." : selectedFlame === flame.id ? "Active" : "Use flame"}
                    </p>
                  </button>
                  {canDelete && storeItem ? (
                    <button
                      type="button"
                      onClick={() => void handleDeleteStoreItem(storeItem.id)}
                      disabled={removingItemId === storeItem.id}
                      className="mt-3 w-full rounded-full border border-red-200 px-3 py-1.5 text-xs font-black text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                    >
                      {removingItemId === storeItem.id ? "Removing..." : "Delete"}
                    </button>
                  ) : null}
                </div>
              );
            })}
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
