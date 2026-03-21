"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Referral {
  referred_user_id: string;
  username: string;
  profile_image_url: string | null;
  trial_started_at: string;
  trial_ends_at: string;
}

interface AmbassadorProfile {
  referral_code: string;
  is_active: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isTrialActive(endsAt: string) {
  return new Date(endsAt) > new Date();
}

export default function AmbassadorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notAuthorized, setNotAuthorized] = useState(false);
  const [profile, setProfile] = useState<AmbassadorProfile | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);
  const [editingCode, setEditingCode] = useState(false);
  const [newCodeInput, setNewCodeInput] = useState("");
  const [savingCode, setSavingCode] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: profileStats } = await supabase
        .from("profile_stats")
        .select("member_badge")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileStats?.member_badge !== "buddy_partner") {
        setNotAuthorized(true);
        setLoading(false);
        return;
      }

      let { data: ambProfile } = await supabase
        .from("ambassador_profiles")
        .select("referral_code, is_active")
        .eq("user_id", user.id)
        .maybeSingle();

      // Auto-create profile row if missing (e.g. table was created after badge was assigned)
      if (!ambProfile) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          const res = await fetch("/api/ambassador/ensure-profile", {
            method: "POST",
            headers: { authorization: `Bearer ${session.access_token}` },
          });
          if (res.ok) {
            const json = await res.json();
            ambProfile = { referral_code: json.referral_code, is_active: json.is_active };
          }
        }
      }

      if (!ambProfile) {
        setNotAuthorized(true);
        setLoading(false);
        return;
      }

      setProfile(ambProfile);

      const { data: refs } = await supabase
        .from("ambassador_referrals")
        .select("referred_user_id, trial_started_at, trial_ends_at")
        .eq("ambassador_user_id", user.id)
        .order("trial_started_at", { ascending: false });

      if (refs && refs.length > 0) {
        const refUserIds = refs.map((r) => r.referred_user_id);
        const { data: refProfiles } = await supabase
          .from("profile_stats")
          .select("user_id, username, display_name, profile_image_url")
          .in("user_id", refUserIds);

        const profileMap = new Map((refProfiles || []).map((p) => [p.user_id, p]));

        setReferrals(refs.map((r) => {
          const p = profileMap.get(r.referred_user_id);
          return {
            referred_user_id: r.referred_user_id,
            username: p?.username ?? p?.display_name ?? "Unknown",
            profile_image_url: p?.profile_image_url ?? null,
            trial_started_at: r.trial_started_at,
            trial_ends_at: r.trial_ends_at,
          };
        }));
      }

      setLoading(false);
    }
    void init();
  }, [router]);

  async function handleSaveCode() {
    if (!newCodeInput.trim()) return;
    setSavingCode(true);
    setCodeError(null);
    const code = newCodeInput.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (code.length < 4 || code.length > 16) {
      setCodeError("Code must be 4–16 letters/numbers.");
      setSavingCode(false);
      return;
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("ambassador_profiles")
      .update({ referral_code: code, updated_at: new Date().toISOString() })
      .eq("user_id", user.id);

    if (error) {
      setCodeError(error.message.includes("unique") ? "That code is already taken. Try another." : "Failed to save. Try again.");
    } else {
      setProfile((prev) => prev ? { ...prev, referral_code: code } : prev);
      setEditingCode(false);
      setNewCodeInput("");
    }
    setSavingCode(false);
  }

  function handleCopy() {
    if (!profile) return;
    navigator.clipboard.writeText(profile.referral_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return <div className="max-w-2xl mx-auto px-4 py-16 text-center text-gray-400">Loading...</div>;
  }

  if (notAuthorized) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-sm">This page is only available to Buddy Partners.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-sm text-blue-600 hover:underline">← Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">Buddy Partner</span>
        </nav>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wide text-teal-600">Ambassador Program</span>
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-teal-100 text-teal-700">🤝 Buddy Partner</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Your Partner Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Share your code. Every signup gets 30 days of Pro free.</p>
        </div>

        {/* Referral Code Card */}
        <div className="bg-white border border-teal-200 rounded-2xl p-5 mb-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-teal-600 mb-3">Your Referral Code</p>

          {!editingCode ? (
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-teal-50 border border-teal-200 rounded-xl px-5 py-3 text-center">
                <p className="text-2xl font-black tracking-widest text-teal-800 font-mono">{profile?.referral_code}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: "#4a9b6f" }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={() => { setEditingCode(true); setNewCodeInput(profile?.referral_code ?? ""); }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                value={newCodeInput}
                onChange={(e) => setNewCodeInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                maxLength={16}
                placeholder="e.g. LOUIS30"
                className="w-full text-xl font-black font-mono tracking-widest text-center px-4 py-3 border border-teal-300 rounded-xl bg-teal-50 text-teal-800 uppercase focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              {codeError && <p className="text-xs text-red-600">{codeError}</p>}
              <div className="flex gap-2">
                <button
                  onClick={handleSaveCode}
                  disabled={savingCode || !newCodeInput.trim()}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-50 transition"
                >
                  {savingCode ? "Saving..." : "Save Code"}
                </button>
                <button
                  onClick={() => { setEditingCode(false); setCodeError(null); }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-3">New users enter this code during signup to get 30 days of Pro free.</p>
        </div>

        {/* Stats */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Total Signups</p>
            <p className="text-3xl font-black text-teal-700">{referrals.length}</p>
          </div>
        </div>

        {/* Referral list */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Signups via Your Code</p>
          </div>

          {referrals.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-gray-400">No signups yet. Share your code to get started!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {referrals.map((r) => (
                <div key={r.referred_user_id} className="flex items-center gap-3 px-5 py-3">
                  {r.profile_image_url ? (
                    <img src={r.profile_image_url} alt={r.username} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-sm font-bold text-teal-700 flex-shrink-0">
                      {r.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{r.username}</p>
                    <p className="text-xs text-gray-400">Joined {formatDate(r.trial_started_at)}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isTrialActive(r.trial_ends_at) ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {isTrialActive(r.trial_ends_at) ? `Trial ends ${formatDate(r.trial_ends_at)}` : "Trial ended"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
