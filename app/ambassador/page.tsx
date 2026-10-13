"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Referral {
  referred_user_id: string;
  username: string | null;
  display_name?: string | null;
  profile_image_url: string | null;
  trial_started_at: string;
  trial_ends_at: string;
}

interface RewardsProfile {
  referral_code: string;
  is_active: boolean;
  user_id: string;
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
  const [copied, setCopied] = useState(false);

  const signupCount = referrals.length;
  const shareLink = useMemo(() => {
    if (!profile?.user_id) return "";
    const origin = typeof window !== "undefined" ? window.location.origin : "https://thebiblestudybuddy.com";
    return `${origin}/signup?referrer=${encodeURIComponent(profile.user_id)}`;
  }, [profile?.user_id]);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Sign in again to load your invite link.");

      const res = await fetch("/api/ambassador/rewards", {
        headers: { authorization: `Bearer ${session.access_token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Could not load your invite link.");

      setProfile(json.profile);
      setReferrals(json.referrals || []);

      setLoading(false);
    }
    void init().catch(() => setLoading(false));
  }, [router]);

  async function copyText(value: string) {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
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
          <span className="font-medium text-gray-800">Invite Bible Buddies</span>
        </nav>

        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-600">Invite</p>
          <h1 className="mt-1 text-3xl font-black text-gray-950">Share Bible Buddy</h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
            Share Bible Buddy with friends who want help understanding Scripture and staying consistent.
          </p>
        </div>

        <div className="mb-4 rounded-2xl border border-blue-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">Your Invite Link</p>
          </div>

          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3">
            <p className="truncate text-xs font-bold text-gray-500">{shareLink}</p>
            <button onClick={() => void copyText(shareLink)} className="mt-2 w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-black text-white">
              {copied ? "Link Copied" : "Copy Invite Link"}
            </button>
            <p className="mt-2 text-xs font-semibold leading-5 text-gray-500">
              Anyone who signs up from this link is tracked back to you automatically. No code needed.
            </p>
          </div>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-black text-gray-950">{signupCount}</p>
            <p className="mt-1 text-xs font-bold text-gray-500">signups</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-gray-500">Signup Log</p>
          </div>

          {referrals.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-semibold text-gray-400">No signups yet. Share your link with someone who wants help reading the Bible.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {referrals.map((r) => {
                const displayName = r.display_name || r.username || "Bible Buddy";
                return (
                <div key={r.referred_user_id} className="flex items-center gap-3 px-5 py-3">
                  {r.profile_image_url ? (
                    <img src={r.profile_image_url} alt={displayName} className="h-9 w-9 shrink-0 rounded-full object-cover" />
                  ) : (
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-black text-blue-700">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-gray-800">{displayName}</p>
                    <p className="text-xs font-semibold text-gray-400">Joined {formatDate(r.trial_started_at)}</p>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
