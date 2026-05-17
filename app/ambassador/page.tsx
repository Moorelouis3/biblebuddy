"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const REWARD_DIAMONDS = 250;
const REWARD_XP = 250;

interface Referral {
  referred_user_id: string;
  username: string;
  profile_image_url: string | null;
  trial_started_at: string;
  trial_ends_at: string;
}

interface RewardsProfile {
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

export default function BuddyRewardsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<RewardsProfile | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState<"code" | "link" | null>(null);
  const [editingCode, setEditingCode] = useState(false);
  const [newCodeInput, setNewCodeInput] = useState("");
  const [savingCode, setSavingCode] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);

  const signupCount = referrals.length;
  const earnedDiamonds = signupCount * REWARD_DIAMONDS;
  const earnedXp = signupCount * REWARD_XP;
  const shareLink = useMemo(() => {
    if (!profile?.referral_code) return "";
    const origin = typeof window !== "undefined" ? window.location.origin : "https://thebiblestudybuddy.com";
    return `${origin}/signup?ref=${encodeURIComponent(profile.referral_code)}`;
  }, [profile?.referral_code]);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        const res = await fetch("/api/ambassador/ensure-profile", {
          method: "POST",
          headers: { authorization: `Bearer ${session.access_token}` },
        });
        if (res.ok) {
          const json = await res.json();
          setProfile({ referral_code: json.referral_code, is_active: json.is_active });
        }
      }

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
            username: p?.display_name ?? p?.username ?? "Bible Buddy",
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
    const code = newCodeInput.trim().toUpperCase().replace(/[^A-Z]/g, "");
    if (code.length < 4 || code.length > 10) {
      setCodeError("Use one word, 4-10 letters.");
      setSavingCode(false);
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      setCodeError("Session expired. Please refresh and try again.");
      setSavingCode(false);
      return;
    }

    const res = await fetch("/api/ambassador/update-code", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ code }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setCodeError(json.error ?? "Could not save that code.");
    } else {
      setProfile((prev) => prev ? { ...prev, referral_code: code } : prev);
      setEditingCode(false);
      setNewCodeInput("");
    }
    setSavingCode(false);
  }

  async function copyText(value: string, kind: "code" | "link") {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1800);
  }

  if (loading) {
    return <div className="mx-auto max-w-2xl px-4 py-16 text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/dashboard" className="transition hover:text-gray-700">Dashboard</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-800">Buddy Rewards</span>
        </nav>

        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">Buddy Rewards</p>
          <h1 className="mt-1 text-3xl font-black text-gray-950">Share Bible Buddy</h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
            Share Bible Buddy with friends and earn XP points and diamonds.
          </p>
        </div>

        <div className="mb-4 rounded-2xl border border-blue-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">Your Code</p>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">+250 XP +250 diamonds</span>
          </div>

          {!editingCode ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-center">
                <p className="font-mono text-2xl font-black tracking-widest text-blue-800">{profile?.referral_code}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
                <button onClick={() => void copyText(profile?.referral_code || "", "code")} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-black text-white">
                  {copied === "code" ? "Copied" : "Copy"}
                </button>
                <button onClick={() => { setEditingCode(true); setNewCodeInput(profile?.referral_code ?? ""); }} className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-black text-gray-700">
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <input
                type="text"
                value={newCodeInput}
                onChange={(e) => setNewCodeInput(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))}
                maxLength={10}
                placeholder="FAITH"
                className="w-full rounded-xl border border-blue-300 bg-blue-50 px-4 py-3 text-center font-mono text-xl font-black uppercase tracking-widest text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-xs font-semibold text-gray-500">You can choose one word, up to 10 letters. Your code locks after your first signup.</p>
              {codeError && <p className="text-xs font-bold text-red-600">{codeError}</p>}
              <div className="flex gap-2">
                <button onClick={handleSaveCode} disabled={savingCode || !newCodeInput.trim()} className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-black text-white disabled:opacity-50">
                  {savingCode ? "Saving..." : "Save Code"}
                </button>
                <button onClick={() => { setEditingCode(false); setCodeError(null); }} className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-black text-gray-700">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3">
            <p className="truncate text-xs font-bold text-gray-500">{shareLink}</p>
            <button onClick={() => void copyText(shareLink, "link")} className="mt-2 w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-black text-white">
              {copied === "link" ? "Link Copied" : "Copy Signup Link"}
            </button>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-black text-gray-950">{signupCount}</p>
            <p className="mt-1 text-xs font-bold text-gray-500">signups</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-black text-blue-700">{earnedXp}</p>
            <p className="mt-1 text-xs font-bold text-gray-500">XP earned</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-black text-cyan-700">{earnedDiamonds}</p>
            <p className="mt-1 text-xs font-bold text-gray-500">diamonds</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-gray-500">Signup Log</p>
          </div>

          {referrals.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-semibold text-gray-400">No signups yet. Share your link to start earning.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {referrals.map((r) => (
                <div key={r.referred_user_id} className="flex items-center gap-3 px-5 py-3">
                  {r.profile_image_url ? (
                    <img src={r.profile_image_url} alt={r.username} className="h-9 w-9 shrink-0 rounded-full object-cover" />
                  ) : (
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-black text-blue-700">
                      {r.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-gray-800">{r.username}</p>
                    <p className="text-xs font-semibold text-gray-400">Joined {formatDate(r.trial_started_at)}</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">+250/+250</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
