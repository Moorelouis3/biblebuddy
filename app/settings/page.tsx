"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Profile fields
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  
  // Reset password
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  
  // Reset reading plan
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resettingPlan, setResettingPlan] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        setUser(currentUser);
        const meta = currentUser.user_metadata || {};
        setDisplayName(meta.firstName || meta.first_name || currentUser.email?.split("@")[0] || "");
        setEmail(currentUser.email || "");
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  async function handleSaveProfile() {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          firstName: displayName,
          first_name: displayName,
        },
      });

      if (error) throw error;

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
        redirectTo: `${window.location.origin}/reset-password`,
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

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Profile Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
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

