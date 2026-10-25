"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import UserBadge from "@/components/UserBadge";
import StreakFlameBadge from "@/components/StreakFlameBadge";

/**
 * Who this is, and how they are doing - above their posts.
 *
 * The identity half of the unified feed (Louis, 2026-10-24): "one identity,
 * one profile, one connected feed experience". The feed page shows this for
 * the signed-in reader; another person's page shows it for them, with their
 * posts underneath instead of the community.
 *
 * It reads the same rows the profile page reads - profile_stats,
 * completed_chapters, buddies - so there is no new table, no migration and no
 * second source of truth for a number. The markup and the pastel stat cards
 * are lifted from app/profile/[userId]/page.tsx deliberately, so the two
 * pages cannot drift apart visually.
 *
 * It does NOT own editing. Edit Profile and the deeper sections live on the
 * profile page, which this links to.
 */

/** The 66 books' worth of chapters, for the completion percentage. */
const TOTAL_BIBLE_CHAPTERS = 1189;

type Summary = {
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
  bio: string | null;
  location: string | null;
  member_badge: string | null;
  is_paid: boolean | null;
  pro_expires_at: string | null;
  selected_streak_flame: string | null;
  current_streak: number | null;
  total_actions: number | null;
  chapters_completed_count: number | null;
  created_at: string | null;
};

/** Same hashing the profile page uses, so an avatar keeps its colour. */
function avatarColor(uid: string): string {
  const colors = ["#2f7fe8", "#2f8f5b", "#c2410c", "#7c3aed", "#be123c", "#0f766e"];
  let sum = 0;
  for (let i = 0; i < uid.length; i += 1) sum += uid.charCodeAt(i);
  return colors[sum % colors.length];
}

/** One pastel stat tile: icon, a big number, and what it counts. */
function StatCard({
  tone,
  icon,
  value,
  label,
}: {
  tone: string;
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <div className={`profile-skin-stat-card rounded-2xl border p-3.5 shadow-sm ${tone}`}>
      <div aria-hidden="true" className="text-lg leading-none">{icon}</div>
      <div className="mt-1.5 text-[26px] font-black leading-none text-gray-900">{value}</div>
      <div className="mt-1 text-[13px] font-medium text-gray-600">{label}</div>
    </div>
  );
}

function joinedLabel(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return `Joined ${d.toLocaleDateString(undefined, { month: "short", year: "numeric" })}`;
}

export default function ProfileSummaryCard({
  userId,
  isSelf,
  /** Rendered on the right of the name - buddy controls on someone else's page. */
  actions,
}: {
  userId: string;
  isSelf: boolean;
  actions?: React.ReactNode;
}) {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [chapters, setChapters] = useState(0);
  const [buddyCount, setBuddyCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        // Three reads in parallel; none of them blocks the feed below, which
        // loads on its own.
        const [statsRes, chaptersRes, buddiesRes] = await Promise.all([
          supabase
            .from("profile_stats")
            .select(
              "display_name, username, profile_image_url, bio, location, member_badge, is_paid, pro_expires_at, selected_streak_flame, current_streak, total_actions, chapters_completed_count, created_at",
            )
            .eq("user_id", userId)
            .maybeSingle(),
          supabase
            .from("completed_chapters")
            .select("book", { count: "exact", head: true })
            .eq("user_id", userId),
          // Either column can hold this user: the row is the pair, not a
          // direction. Same `.or` the profile page uses in loadBuddyCount.
          supabase
            .from("buddies")
            .select("*", { count: "exact", head: true })
            .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`),
        ]);

        if (cancelled) return;
        if (statsRes.data) setSummary(statsRes.data as Summary);
        setChapters(chaptersRes.count ?? 0);
        setBuddyCount(buddiesRes.count ?? 0);
      } catch {
        // A profile that will not load must not take the feed with it.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const displayName = summary?.display_name || summary?.username || "Bible Buddy Member";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const completion = chapters > 0 ? Math.round((chapters / TOTAL_BIBLE_CHAPTERS) * 1000) / 10 : 0;
  const joined = joinedLabel(summary?.created_at ?? null);

  if (loading && !summary) {
    // A quiet placeholder the same height as the card, so the tabs below do
    // not jump once it arrives.
    return <div className="mb-4 h-[168px] animate-pulse rounded-xl border border-gray-200 bg-white/60" />;
  }

  return (
    <div className="mb-4">
      <div className="profile-skin-card rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex flex-shrink-0 justify-center sm:block">
            {summary?.profile_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={summary.profile_image_url}
                alt={displayName}
                className="profile-skin-avatar h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div
                className="profile-skin-avatar flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
                style={{ backgroundColor: avatarColor(userId) }}
              >
                {initials}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="profile-skin-primary text-2xl font-bold leading-tight text-gray-900">
                    {displayName}
                  </h1>
                  <StreakFlameBadge
                    currentStreak={summary?.current_streak ?? 0}
                    flameId={summary?.selected_streak_flame ?? undefined}
                  />
                  <UserBadge
                    customBadge={summary?.member_badge ?? undefined}
                    isPaid={summary?.is_paid ?? undefined}
                    proExpiresAt={summary?.pro_expires_at ?? undefined}
                  />
                </div>

                {summary?.bio ? (
                  <p className="mt-1 text-sm leading-snug text-gray-600">{summary.bio}</p>
                ) : null}

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                  {summary?.location ? <span>📍 {summary.location}</span> : null}
                  {joined ? <span>🗓 {joined}</span> : null}
                  <span>
                    {buddyCount} {buddyCount === 1 ? "buddy" : "buddies"}
                  </span>
                </div>
              </div>

              <div className="flex flex-shrink-0 flex-col items-stretch gap-2 sm:items-end">
                {isSelf ? (
                  // The edit form and the deeper sections live on the profile
                  // page; ?details=1 is what stops that page bouncing straight
                  // back here. See app/profile/[userId]/page.tsx.
                  <Link
                    href={`/profile/${userId}?details=1`}
                    className="profile-skin-button inline-flex min-h-[36px] items-center justify-center rounded-lg border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Edit Profile
                  </Link>
                ) : (
                  actions ?? null
                )}
              </div>
            </div>
          </div>
        </div>

        {/* The same four pastel cards as the profile page, scrollable on a
            phone rather than squeezed into a four column grid. */}
        {/* Four stats, each with its own icon and its own soft colour
            (Louis's mockup, 2026-10-25). Two columns on a phone rather than a
            sideways scroll - a stat you have to swipe to reach is a stat
            nobody reads - and four across from `sm` up. */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            tone="bg-[#eaf1ff] border-[#cfe0ff]"
            icon="🔥"
            value={String(summary?.current_streak ?? 0)}
            label="Day Streak"
          />
          <StatCard
            tone="bg-[#f1ecff] border-[#ddd2f8]"
            icon="👥"
            value={String(summary?.total_actions ?? 0)}
            label="Total Actions"
          />
          <StatCard
            tone="bg-[#e7f7ee] border-[#c7ebd7]"
            icon="📖"
            value={String(summary?.chapters_completed_count ?? chapters)}
            label="Chapters Read"
          />
          <StatCard
            tone="bg-[#fff0e3] border-[#ffd9bb]"
            icon="◐"
            value={`${completion}%`}
            label="Bible Completion"
          />
        </div>

        {isSelf ? (
          // A quiet line, not another section: the heavy profile lives behind
          // it and should not take up room here.
          <div className="mt-3 text-right">
            <Link
              href={`/profile/${userId}?details=1`}
              className="text-xs font-medium text-green-700 hover:underline"
            >
              Activity, groups and full profile →
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
