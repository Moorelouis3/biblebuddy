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

interface GroupMember {
  user_id: string;
  display_name: string;
  role: string;
  profile_image_url: string | null;
}

type MemberStatus = "not_member" | "pending" | "approved" | "rejected";

const AVATAR_COLORS = ["#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8"];
function avatarColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
function getInitial(name: string): string {
  return (name || "?")[0].toUpperCase();
}

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
  const [currentSeries, setCurrentSeries] = useState<{ title: string; current_week: number; total_weeks: number } | null>(null);

  // Members modal
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [modalMembers, setModalMembers] = useState<GroupMember[]>([]);
  const [loadingModalMembers, setLoadingModalMembers] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data: profile } = await supabase
          .from("profile_stats")
          .select("display_name, username")
          .eq("user_id", user.id)
          .maybeSingle();
        setDisplayName(profile?.display_name || profile?.username || user.email?.split("@")[0] || "Member");
      }

      const { data: groupData, error } = await supabase
        .from("study_groups")
        .select("*")
        .eq("id", groupId)
        .maybeSingle();

      if (error || !groupData) {
        router.push("/study-groups");
        return;
      }

      setGroup(groupData);

      const { data: seriesData } = await supabase
        .from("group_series")
        .select("title, current_week, total_weeks")
        .eq("group_id", groupId)
        .eq("is_current", true)
        .maybeSingle();
      setCurrentSeries(seriesData || null);

      if (user) {
        const { data: membership } = await supabase
          .from("group_members")
          .select("status")
          .eq("group_id", groupId)
          .eq("user_id", user.id)
          .maybeSingle();
        setMemberStatus(membership ? (membership.status as MemberStatus) : "not_member");
      }

      setLoading(false);
    }

    load();
  }, [groupId, router]);

  async function openMembersModal() {
    setShowMembersModal(true);
    if (modalMembers.length > 0) return; // already loaded
    setLoadingModalMembers(true);

    // Paginate past Supabase's 1000-row default limit
    let allMemberRows: { user_id: string; role: string; display_name: string }[] = [];
    let from = 0;
    const PAGE = 1000;
    while (true) {
      const { data: page } = await supabase
        .from("group_members")
        .select("user_id, role, display_name")
        .eq("group_id", groupId)
        .eq("status", "approved")
        .range(from, from + PAGE - 1);
      if (!page || page.length === 0) break;
      allMemberRows = allMemberRows.concat(page);
      if (page.length < PAGE) break;
      from += PAGE;
    }

    if (allMemberRows.length === 0) {
      setModalMembers([]);
      setLoadingModalMembers(false);
      return;
    }

    // Fetch profiles in batches of 500
    const userIds = allMemberRows.map((m) => m.user_id);
    const profileMap: Record<string, any> = {};
    for (let i = 0; i < userIds.length; i += 500) {
      const { data: pics } = await supabase
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url")
        .in("user_id", userIds.slice(i, i + 500));
      (pics || []).forEach((p) => { profileMap[p.user_id] = p; });
    }

    const roleOrder: Record<string, number> = { leader: 0, moderator: 1, member: 2 };
    const result: GroupMember[] = allMemberRows.map((m) => {
      const p = profileMap[m.user_id];
      return {
        user_id: m.user_id,
        display_name: p?.display_name || p?.username || m.display_name || "Member",
        role: m.role,
        profile_image_url: p?.profile_image_url || null,
      };
    });
    result.sort((a, b) => (roleOrder[a.role] ?? 2) - (roleOrder[b.role] ?? 2));
    setModalMembers(result);
    setLoadingModalMembers(false);
  }

  async function handleJoinRequest() {
    if (!userId || !group) return;
    setJoining(true);

    try {
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
        setJoining(false);
        return;
      }

      void supabase.rpc("log_feed_activity", {
        p_activity_type: "study_group_joined",
        p_activity_data: { group_id: group.id, group_name: group.name },
        p_group_id: group.id,
        p_group_name: group.name,
        p_is_public: true,
      });

      if (group.leader_user_id) {
        await supabase.from("notifications").insert({
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
              {/* Clickable member count */}
              <button
                onClick={openMembersModal}
                className="inline-flex items-center gap-1 mt-2 bg-white/60 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-white/80 transition"
              >
                👥 {group.member_count === 1 ? "1 member" : `${group.member_count} members`}
              </button>
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

        {/* Current Series */}
        {currentSeries && (
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6">
            <h2 className="text-base font-semibold text-gray-900 mb-2">📖 Current Series</h2>
            <div
              className="rounded-lg px-4 py-3 flex items-center justify-between gap-3"
              style={{ backgroundColor: coverColor + "55" }}
            >
              <div>
                <p className="text-gray-900 font-semibold text-sm">{currentSeries.title}</p>
                <p className="text-gray-600 text-xs mt-0.5">
                  {currentSeries.current_week === 0
                    ? "Coming Soon"
                    : `Week ${currentSeries.current_week} of ${currentSeries.total_weeks}`}
                </p>
              </div>
              {memberStatus === "approved" && (
                <Link
                  href={`/study-groups/${groupId}/chat?tab=bible_studies`}
                  className="text-xs font-medium text-gray-700 hover:text-gray-900 transition whitespace-nowrap"
                >
                  View in group →
                </Link>
              )}
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
                <button disabled className="w-full py-3 rounded-xl bg-gray-200 text-gray-500 font-semibold text-base cursor-not-allowed">
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
                <button disabled className="w-full py-3 rounded-xl bg-gray-200 text-gray-500 font-semibold text-base cursor-not-allowed">
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

      {/* ── Members Modal ─────────────────────────────────────────────────── */}
      {showMembersModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setShowMembersModal(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-base font-semibold text-gray-900">
                Members {modalMembers.length > 0 ? `(${modalMembers.length})` : ""}
              </h2>
              <button
                onClick={() => setShowMembersModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500"
              >
                ✕
              </button>
            </div>

            {/* Member list */}
            <div className="overflow-y-auto flex-1">
              {loadingModalMembers ? (
                <p className="text-sm text-gray-400 text-center py-10">Loading members...</p>
              ) : modalMembers.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-10">No members yet.</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {modalMembers.map((member) => (
                    <div key={member.user_id} className="flex items-center gap-3 px-5 py-3.5">
                      {/* Avatar */}
                      {member.profile_image_url ? (
                        <img
                          src={member.profile_image_url}
                          alt={member.display_name}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                          style={{ backgroundColor: avatarColor(member.user_id) }}
                        >
                          {getInitial(member.display_name)}
                        </div>
                      )}

                      {/* Name + role */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{member.display_name}</p>
                        {(member.role === "leader" || member.role === "moderator") && (
                          <span className="text-xs text-green-600 font-medium">
                            {member.role === "leader" ? "Leader" : "Moderator"}
                          </span>
                        )}
                      </div>

                      {/* View Profile button */}
                      <Link
                        href={`/profile/${member.user_id}`}
                        onClick={() => setShowMembersModal(false)}
                        className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition flex-shrink-0"
                      >
                        View Profile
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
