"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import StreakFlameEmoji from "../../components/StreakFlameEmoji";
import {
  APP_THEME_STORAGE_KEY,
  APP_THEMES,
  applyAppThemeToDocument,
  normalizeAppThemeId,
  type AppThemeId,
} from "../../lib/appThemes";
import { STREAK_FLAME_STORE_ITEMS, THEME_STORE_ITEMS } from "../../lib/bibleBuddyStore";
import { FLAME_COSMETICS, normalizeFlameCosmeticId, type FlameCosmeticId } from "../../lib/flameCosmetics";
import { buildFullName, hasRequiredFullName, splitFullName } from "../../lib/profileName";
import { isAdminUser } from "../../lib/readingProgress";

type StorePurchaseRow = {
  item_id: string;
  item_kind: string;
};

type SettingsProfileRow = {
  display_name?: string | null;
  username?: string | null;
  app_theme?: string | null;
  selected_streak_flame?: string | null;
};

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
  const [flameSaving, setFlameSaving] = useState<string | null>(null);
  const [settingsMessage, setSettingsMessage] = useState<string | null>(null);
  const [storePurchases, setStorePurchases] = useState<StorePurchaseRow[]>([]);
  const [ownerHasUnlimitedDiamonds, setOwnerHasUnlimitedDiamonds] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<AppThemeId>("light");
  const [selectedFlame, setSelectedFlame] = useState<FlameCosmeticId>("default");
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  
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
          .select("display_name, username, app_theme, selected_streak_flame")
          .eq("user_id", currentUser.id)
          .maybeSingle();

        let profile = profileRequest.data as SettingsProfileRow | null;
        if (profileRequest.error && /selected_streak_flame/i.test(profileRequest.error.message || "")) {
          const fallbackProfile = await supabase
            .from("profile_stats")
            .select("display_name, username, app_theme")
            .eq("user_id", currentUser.id)
            .maybeSingle();
          profile = fallbackProfile.data as SettingsProfileRow | null;
          setSettingsMessage("Streak flames need one database update before they can save. Run ADD_SELECTED_STREAK_FLAME.sql in Supabase.");
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
        setSelectedFlame(normalizeFlameCosmeticId(profile?.selected_streak_flame));
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
      setSettingsMessage(
        /selected_streak_flame/i.test(error.message || "")
          ? "Streak flames need one database update before they can save. Run ADD_SELECTED_STREAK_FLAME.sql in Supabase."
          : error.message || "Could not update streak flame.",
      );
    } finally {
      setFlameSaving(null);
    }
  }

  async function handleDeleteStoreItem(itemId: string) {
    if (!user || removingItemId) return;
    const item =
      THEME_STORE_ITEMS.find((storeItem) => storeItem.id === itemId) ||
      STREAK_FLAME_STORE_ITEMS.find((storeItem) => storeItem.id === itemId);
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
  const ownedFlameIds = new Set(
    STREAK_FLAME_STORE_ITEMS
      .filter((item) => ownedStoreItemIds.includes(item.id) && item.flameId)
      .map((item) => item.flameId),
  );
  const availableFlames = FLAME_COSMETICS.filter((flame) => ownerHasUnlimitedDiamonds || flame.id === "default" || ownedFlameIds.has(flame.id));

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
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
