"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  leader_user_id: string | null;
  leader_name: string | null;
  category: string;
  status: string;
  member_count: number;
  max_members: number;
  current_weekly_study: string | null;
  cover_emoji: string | null;
  cover_color: string | null;
  invite_code: string | null;
}

type MemberStatus = "not_member" | "pending" | "approved" | "rejected";

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;

  const [group, setGroup] = useState<StudyGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [memberStatus, setMemberStatus] = useState<MemberStatus>("not_member");
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    async function load() {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // Try to get display name from profile_stats
        const { data: profile } = await supabase
          .from("profile_stats")
          .select("display_name, username")
          .eq("user_id", user.id)
          .maybeSingle();
        setDisplayName(profile?.display_name || profile?.username || user.email?.split("@")[0] || "Member");
      }

      // Fetch group
      const { data: groupData, error } = await supabase
        .from("study_groups")
        .select("*")
        .eq("id", groupId)
        .maybeSingle();

      if (error || !groupData) {
        console.error("[GROUP_DETAIL] Error loading group:", error);
        router.push("/study-groups");
        return;
      }

      setGroup(groupData);

      // Check membership status
      if (user) {
        const { data: membership } = await supabase
          .from("group_members")
          .select("status")
          .eq("group_id", groupId)
          .eq("user_id", user.id)
          .maybeSingle();

        if (membership) {
          setMemberStatus(membership.status as MemberStatus);
        } else {
          setMemberStatus("not_member");
        }
      }

      setLoading(false);
    }

    load();
  }, [groupId, router]);

  async function handleJoinRequest() {
    if (!userId || !group) return;
    setJoining(true);

    try {
      // Insert membership request
      const { error: memberError } = await supabase
        .from("group_members")
        .insert({
          group_id: group.id,
          user_id: userId,
          display_name: displayName,
          role: "member",
          status: "pending",
        });

      if (memberError) {
        console.error("[GROUP_DETAIL] Error inserting member:", memberError);
        setJoining(false);
        return;
      }

      // Notify the group leader
      if (group.leader_user_id) {
        await supabase
          .from("notifications")
          .insert({
            user_id: group.leader_user_id,
            type: "group_join_request",
            from_user_name: displayName,
            message: `${displayName} has requested to join "${group.name}"`,
          });
      }

      setMemberStatus("pending");
    } catch (err) {
      console.error("[GROUP_DETAIL] Error:", err);
    } finally {
      setJoining(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-gray-500 text-sm">Loading group...</div>
        </div>
      </div>
    );
  }

  if (!group) return null;

  const coverColor = group.cover_color || "#d4ecd4";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
          <span className="mx-2">›</span>
          <Link href="/study-groups" className="hover:text-gray-700 transition">Bible Study Groups</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">{group.name}</span>
        </nav>

        {/* Header banner */}
        <div
          className="rounded-2xl p-6 mb-6 relative"
          style={{ backgroundColor: coverColor }}
        >
          {/* Share icon (skeleton — no logic yet) */}
          <button
            className="absolute top-4 right-4 w-9 h-9 bg-white/60 rounded-full flex items-center justify-center hover:bg-white/80 transition"
            title="Invite link coming soon"
            disabled
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <div className="text-5xl">{group.cover_emoji || "🤝"}</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
              {group.leader_name && (
                <p className="text-gray-700 text-sm mt-0.5">
                  Led by{" "}
                  {group.leader_user_id ? (
                    <Link href={`/profile/${group.leader_user_id}`} className="underline hover:text-gray-900 transition">
                      {group.leader_name}
                    </Link>
                  ) : (
                    group.leader_name
                  )}
                </p>
              )}
              <span className="inline-flex items-center gap-1 mt-2 bg-white/60 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                👥 {group.member_count} / {group.max_members} members
              </span>
            </div>
          </div>
        </div>

        {/* About This Group */}
        {group.description && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-4">
            <h2 className="text-base font-semibold text-gray-900 mb-2">About This Group</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{group.description}</p>
          </div>
        )}

        {/* Current Weekly Study */}
        {group.current_weekly_study && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6">
            <h2 className="text-base font-semibold text-gray-900 mb-2">📖 Current Weekly Study</h2>
            <div
              className="rounded-lg px-4 py-3"
              style={{ backgroundColor: coverColor + "55" }}
            >
              <p className="text-gray-900 font-medium text-sm">{group.current_weekly_study}</p>
            </div>
          </div>
        )}

        {/* Join / Enter button */}
        {group.status === "coming_soon" ? (
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-5 text-center">
            <p className="text-gray-500 font-medium">This group isn't open for members yet.</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            {memberStatus === "not_member" && (
              <>
                <button
                  onClick={handleJoinRequest}
                  disabled={joining}
                  className="w-full py-3 rounded-xl text-white font-semibold text-base transition hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "#4a9b6f" }}
                >
                  {joining ? "Sending Request..." : "Request to Join Group"}
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Join requests are reviewed by the group leader.
                </p>
              </>
            )}

            {memberStatus === "pending" && (
              <>
                <button
                  disabled
                  className="w-full py-3 rounded-xl bg-gray-200 text-gray-500 font-semibold text-base cursor-not-allowed"
                >
                  Request Pending
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Join requests are reviewed by the group leader.
                </p>
              </>
            )}

            {memberStatus === "approved" && (
              <button
                onClick={() => router.push(`/study-groups/${group.id}/chat`)}
                className="w-full py-3 rounded-xl text-white font-semibold text-base transition hover:opacity-90"
                style={{ backgroundColor: "#4a9b6f" }}
              >
                Enter Group
              </button>
            )}

            {memberStatus === "rejected" && (
              <>
                <button
                  disabled
                  className="w-full py-3 rounded-xl bg-gray-200 text-gray-500 font-semibold text-base cursor-not-allowed"
                >
                  Request Not Approved
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Contact the group leader if you believe this is a mistake.
                </p>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
