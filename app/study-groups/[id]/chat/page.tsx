"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../lib/supabaseClient";

interface StudyGroup {
  id: string;
  name: string;
  leader_user_id: string | null;
  cover_color: string | null;
  cover_emoji: string | null;
}

interface Post {
  id: string;
  user_id: string;
  display_name: string | null;
  category: string;
  content: string;
  like_count: number;
  is_pinned: boolean;
  created_at: string;
  role?: string; // joined from group_members
  liked?: boolean; // has current user liked this post
}

type TabKey = "general" | "bible_studies" | "updates" | "prayer" | "qa" | "members";

const TABS: { key: TabKey; label: string }[] = [
  { key: "general",       label: "💬 General" },
  { key: "bible_studies", label: "📚 Bible Studies" },
  { key: "updates",       label: "📢 Updates" },
  { key: "prayer",        label: "🙏 Prayer" },
  { key: "qa",            label: "❓ Q&A" },
  { key: "members",       label: "👥 Members" },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function getInitial(name: string | null): string {
  return (name || "?")[0].toUpperCase();
}

const AVATAR_COLORS = [
  "#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8",
];
function avatarColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function GroupChatPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;

  const [group, setGroup] = useState<StudyGroup | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("member");
  const [displayName, setDisplayName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabKey>("general");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [likeLoading, setLikeLoading] = useState<Set<string>>(new Set());
  const feedRef = useRef<HTMLDivElement>(null);

  // ── Auth + membership guard ──────────────────────────────────────────────
  useEffect(() => {
    async function checkAccessAndLoad() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push(`/study-groups/${groupId}`); return; }

      setUserId(user.id);

      // Get display name
      const { data: profile } = await supabase
        .from("profile_stats")
        .select("display_name, username")
        .eq("user_id", user.id)
        .maybeSingle();
      setDisplayName(profile?.display_name || profile?.username || user.email?.split("@")[0] || "Member");

      // Check membership — must be approved
      const { data: membership } = await supabase
        .from("group_members")
        .select("status, role")
        .eq("group_id", groupId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (!membership || membership.status !== "approved") {
        router.push(`/study-groups/${groupId}`);
        return;
      }

      setUserRole(membership.role);

      // Load group meta
      const { data: groupData } = await supabase
        .from("study_groups")
        .select("id, name, leader_user_id, cover_color, cover_emoji")
        .eq("id", groupId)
        .maybeSingle();

      if (!groupData) { router.push("/study-groups"); return; }
      setGroup(groupData);
    }

    checkAccessAndLoad();
  }, [groupId, router]);

  // ── Load posts when tab or group changes ─────────────────────────────────
  useEffect(() => {
    if (!group || activeTab === "members") return;
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, activeTab]);

  async function loadPosts() {
    if (!group) return;
    setLoadingPosts(true);

    const { data: postRows, error } = await supabase
      .from("group_posts")
      .select("id, user_id, display_name, category, content, like_count, is_pinned, created_at")
      .eq("group_id", group.id)
      .eq("category", activeTab)
      .is("parent_post_id", null) // top-level posts only
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[CHAT] Error loading posts:", error);
      setLoadingPosts(false);
      return;
    }

    const rows = postRows || [];

    // Fetch roles for post authors
    const authorIds = [...new Set(rows.map((p) => p.user_id))];
    let roleMap: Record<string, string> = {};
    if (authorIds.length > 0) {
      const { data: members } = await supabase
        .from("group_members")
        .select("user_id, role")
        .eq("group_id", group.id)
        .in("user_id", authorIds);
      (members || []).forEach((m) => { roleMap[m.user_id] = m.role; });
    }

    // Fetch which posts current user has liked
    let likedSet = new Set<string>();
    if (userId && rows.length > 0) {
      const { data: likes } = await supabase
        .from("group_post_likes")
        .select("post_id")
        .eq("user_id", userId)
        .in("post_id", rows.map((p) => p.id));
      (likes || []).forEach((l) => likedSet.add(l.post_id));
    }

    setPosts(rows.map((p) => ({
      ...p,
      role: roleMap[p.user_id] || "member",
      liked: likedSet.has(p.id),
    })));

    setLoadingPosts(false);
  }

  // ── Like / unlike ────────────────────────────────────────────────────────
  async function handleLike(post: Post) {
    if (!userId || likeLoading.has(post.id)) return;
    setLikeLoading((prev) => new Set(prev).add(post.id));

    if (post.liked) {
      // Unlike
      await supabase
        .from("group_post_likes")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", userId);

      await supabase
        .from("group_posts")
        .update({ like_count: Math.max(0, post.like_count - 1) })
        .eq("id", post.id);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, like_count: Math.max(0, p.like_count - 1), liked: false } : p
        )
      );
    } else {
      // Like
      await supabase
        .from("group_post_likes")
        .insert({ post_id: post.id, user_id: userId });

      await supabase
        .from("group_posts")
        .update({ like_count: post.like_count + 1 })
        .eq("id", post.id);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, like_count: p.like_count + 1, liked: true } : p
        )
      );
    }

    setLikeLoading((prev) => { const s = new Set(prev); s.delete(post.id); return s; });
  }

  // ── Submit new post ──────────────────────────────────────────────────────
  async function handleSubmitPost() {
    if (!newPostContent.trim() || !userId || !group || submitting) return;
    if (activeTab === "members") return;
    setSubmitting(true);

    const { data: newPost, error } = await supabase
      .from("group_posts")
      .insert({
        group_id: group.id,
        user_id: userId,
        display_name: displayName,
        category: activeTab,
        content: newPostContent.trim(),
      })
      .select("id, user_id, display_name, category, content, like_count, is_pinned, created_at")
      .single();

    if (error) {
      console.error("[CHAT] Error posting:", error);
    } else if (newPost) {
      setPosts((prev) => [{ ...newPost, role: userRole, liked: false }, ...prev]);
      setNewPostContent("");
    }

    setSubmitting(false);
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  const coverColor = group.cover_color || "#d4ecd4";
  const isLeader = userRole === "leader" || userRole === "moderator";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Header banner ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20" style={{ backgroundColor: coverColor }}>
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href={`/study-groups/${groupId}`} className="text-gray-700 hover:text-gray-900 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <span className="text-xl">{group.cover_emoji || "🤝"}</span>
          <h1 className="text-lg font-bold text-gray-900 truncate">{group.name}</h1>
        </div>

        {/* ── Category tabs ──────────────────────────────────────────── */}
        <div
          className="max-w-2xl mx-auto px-4 flex gap-1 overflow-x-auto pb-3 scrollbar-hide"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition"
                style={{
                  backgroundColor: isActive ? "#fff" : "transparent",
                  color: isActive ? "#4a9b6f" : "rgba(0,0,0,0.55)",
                  boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.12)" : "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Feed ──────────────────────────────────────────────────────── */}
      <div ref={feedRef} className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-2xl mx-auto px-4 py-4">

          {activeTab === "members" ? (
            /* Members tab placeholder */
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center mt-4">
              <p className="text-2xl mb-2">👥</p>
              <p className="text-gray-700 font-medium">Members list coming soon</p>
              <p className="text-gray-400 text-sm mt-1">Full member directory will be available here.</p>
            </div>
          ) : activeTab === "bible_studies" ? (
            <>
              {/* Study Progress placeholder card */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-4">
                <h3 className="font-semibold text-gray-700 mb-1">📊 Group Study Progress</h3>
                <p className="text-gray-400 text-sm">Group study progress tracking coming soon.</p>
              </div>
              {renderPosts()}
            </>
          ) : (
            renderPosts()
          )}

        </div>
      </div>

      {/* ── Post composer (fixed bottom) ──────────────────────────────── */}
      {activeTab !== "members" && (
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 px-4 py-3 safe-area-bottom">
          <div className="max-w-2xl mx-auto flex items-end gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: userId ? avatarColor(userId) : "#aaa" }}
            >
              {getInitial(displayName)}
            </div>
            <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 flex items-end gap-2">
              <textarea
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 resize-none outline-none max-h-28"
                placeholder={`Post in ${TABS.find((t) => t.key === activeTab)?.label ?? ""}...`}
                rows={1}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitPost();
                  }
                }}
              />
              <button
                onClick={handleSubmitPost}
                disabled={!newPostContent.trim() || submitting}
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition disabled:opacity-40"
                style={{ backgroundColor: "#4a9b6f" }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function renderPosts() {
    if (loadingPosts) {
      return <p className="text-gray-400 text-sm text-center py-8">Loading posts...</p>;
    }

    if (posts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">No posts yet.</p>
          <p className="text-gray-400 text-sm mt-1">Be the first to post something!</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            {post.is_pinned && (
              <div className="flex items-center gap-1 text-xs text-amber-600 font-medium mb-2">
                📌 Pinned
              </div>
            )}

            {/* Post header */}
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: avatarColor(post.user_id) }}
              >
                {getInitial(post.display_name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link href={`/profile/${post.user_id}`} className="font-semibold text-gray-900 text-sm hover:underline">
                    {post.display_name || "Member"}
                  </Link>
                  {(post.role === "leader" || post.role === "moderator") && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      {post.role === "leader" ? "Leader" : "Mod"}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">{timeAgo(post.created_at)}</span>
                </div>
              </div>

              {/* Pin option for leader (skeleton) */}
              {isLeader && (
                <button
                  className="text-gray-300 hover:text-amber-500 transition"
                  title="Pin post (coming soon)"
                  disabled
                >
                  📌
                </button>
              )}
            </div>

            {/* Post content */}
            <p className="text-gray-800 text-sm mt-3 leading-relaxed whitespace-pre-wrap">{post.content}</p>

            {/* Post actions */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
              {/* Like */}
              <button
                onClick={() => handleLike(post)}
                disabled={likeLoading.has(post.id)}
                className="flex items-center gap-1.5 text-sm transition"
                style={{ color: post.liked ? "#e53e3e" : "#9ca3af" }}
              >
                <svg className="w-4 h-4" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.like_count > 0 ? post.like_count : ""}</span>
              </button>

              {/* Reply (skeleton) */}
              <button
                className="flex items-center gap-1.5 text-sm text-gray-400"
                title="Reply threads coming soon"
                disabled
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
