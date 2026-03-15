"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../lib/supabaseClient";
import { HUB_CONTENT, type HubItemStatic } from "@/lib/hubContent";

// ── Interfaces ───────────────────────────────────────────────────────────────

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
  role?: string;
  liked?: boolean;
  profile_image_url?: string | null;
}

interface Member {
  user_id: string;
  display_name: string;
  role: string;
  profile_image_url: string | null;
}

interface Series {
  id: string;
  title: string;
  description: string | null;
  total_weeks: number;
  current_week: number;
  is_current: boolean;
  created_at: string;
}

interface SeriesPost {
  id: string;
  series_id: string;
  week_number: number;
  title: string;
  content: string;
  is_published: boolean;
  like_count: number;
  comment_count: number;
  created_at: string;
  published_at: string | null;
  liked?: boolean;
}

interface SeriesComment {
  id: string;
  user_id: string;
  display_name: string;
  content: string;
  parent_comment_id: string | null;
  like_count: number;
  created_at: string;
  liked?: boolean;
  profile_image_url?: string | null;
}

// ── Hub types ─────────────────────────────────────────────────────────────

interface HubCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  display_order: number;
}

// ── Tab config ───────────────────────────────────────────────────────────────

type TabKey = "home" | "general" | "bible_studies" | "updates" | "prayer" | "qa" | "members";

const TABS: { key: TabKey; label: string }[] = [
  { key: "home",          label: "🏠 Home" },
  { key: "general",       label: "💬 General" },
  { key: "bible_studies", label: "📚 Bible Studies" },
  { key: "updates",       label: "📢 Updates" },
  { key: "prayer",        label: "🙏 Prayer" },
  { key: "qa",            label: "❓ Q&A" },
  { key: "members",       label: "👥 Members" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getInitial(name: string | null): string {
  return (name || "?")[0].toUpperCase();
}

const AVATAR_COLORS = ["#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8"];
function avatarColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ── Component ────────────────────────────────────────────────────────────────

export default function GroupChatPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = params.id as string;

  // Core state
  const [group, setGroup] = useState<StudyGroup | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("member");
  const [displayName, setDisplayName] = useState<string>("");
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("home");

  // Chat posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [likeLoading, setLikeLoading] = useState<Set<string>>(new Set());

  // Hub categories (loaded from DB)
  const [hubCategories, setHubCategories] = useState<HubCategory[]>([]);
  const [hubView, setHubView] = useState<"articles" | "questions">("articles");
  const [showHubDropdown, setShowHubDropdown] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<DOMRect | null>(null);
  const dropdownBtnRef = useRef<HTMLButtonElement>(null);
  const [selectedHubItem, setSelectedHubItem] = useState<HubItemStatic | null>(null);

  // Members
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [membersSearch, setMembersSearch] = useState("");

  // Series list
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [loadingSeries, setLoadingSeries] = useState(false);

  // Series view
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [seriesPosts, setSeriesPosts] = useState<SeriesPost[]>([]);
  const [loadingSeriesPosts, setLoadingSeriesPosts] = useState(false);

  // Post view
  const [selectedPost, setSelectedPost] = useState<SeriesPost | null>(null);
  const [comments, setComments] = useState<SeriesComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [postLikeLoading, setPostLikeLoading] = useState(false);
  const [commentLikeLoading, setCommentLikeLoading] = useState<Set<string>>(new Set());

  // New Series modal
  const [showNewSeriesModal, setShowNewSeriesModal] = useState(false);
  const [newSeriesTitle, setNewSeriesTitle] = useState("");
  const [newSeriesDesc, setNewSeriesDesc] = useState("");
  const [newSeriesTotalWeeks, setNewSeriesTotalWeeks] = useState<number>(4);
  const [submittingNewSeries, setSubmittingNewSeries] = useState(false);

  // New Post modal
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newSeriesPostTitle, setNewSeriesPostTitle] = useState("");
  const [newSeriesPostContent, setNewSeriesPostContent] = useState("");
  const [newSeriesPostPublish, setNewSeriesPostPublish] = useState(false);
  const [submittingNewSeriesPost, setSubmittingNewSeriesPost] = useState(false);

  const feedRef = useRef<HTMLDivElement>(null);

  // ── Auth + membership guard ──────────────────────────────────────────────
  useEffect(() => {
    async function checkAccessAndLoad() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push(`/study-groups/${groupId}`); return; }

      setUserId(user.id);

      const { data: profile } = await supabase
        .from("profile_stats")
        .select("display_name, username, profile_image_url")
        .eq("user_id", user.id)
        .maybeSingle();
      setDisplayName(profile?.display_name || profile?.username || user.email?.split("@")[0] || "Member");
      setUserProfileImage(profile?.profile_image_url ?? null);

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

      const { data: groupData } = await supabase
        .from("study_groups")
        .select("id, name, leader_user_id, cover_color, cover_emoji")
        .eq("id", groupId)
        .maybeSingle();

      if (!groupData) { router.push("/study-groups"); return; }
      setGroup(groupData);

      // Load hub categories for this group
      const { data: hubCats } = await supabase
        .from("group_hub_categories")
        .select("id, name, emoji, color, display_order")
        .eq("group_id", groupId)
        .order("display_order", { ascending: true });
      setHubCategories(hubCats || []);

      // Handle ?tab=bible_studies from detail page link
      const tabParam = searchParams.get("tab");
      if (tabParam === "bible_studies") setActiveTab("bible_studies");
    }

    checkAccessAndLoad();
  }, [groupId, router, searchParams]);

  // ── Load content when tab or group changes ───────────────────────────────
  useEffect(() => {
    if (!group) return;
    setSelectedHubItem(null);
    if (activeTab === "members") {
      loadMembers();
    } else if (activeTab === "bible_studies") {
      setSelectedSeries(null);
      setSelectedPost(null);
      loadSeries();
    } else if (hubCategories.some((c) => c.id === activeTab)) {
      // items come from static HUB_CONTENT — no fetch needed
    } else {
      loadPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, activeTab, hubCategories]);

  // ── Load series posts when series is selected ────────────────────────────
  useEffect(() => {
    if (selectedSeries) loadSeriesPosts(selectedSeries.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeries]);

  // ── Load comments when post is selected ─────────────────────────────────
  useEffect(() => {
    if (selectedPost) loadComments(selectedPost.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost]);

  // ── Chat posts ───────────────────────────────────────────────────────────
  async function loadPosts() {
    if (!group) return;
    setLoadingPosts(true);

    const { data: postRows, error } = await supabase
      .from("group_posts")
      .select("id, user_id, display_name, category, content, like_count, is_pinned, created_at")
      .eq("group_id", group.id)
      .eq("category", activeTab)
      .is("parent_post_id", null)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) { setLoadingPosts(false); return; }

    const rows = postRows || [];
    const authorIds = [...new Set(rows.map((p) => p.user_id))];
    let roleMap: Record<string, string> = {};
    let imageMap: Record<string, string | null> = {};
    if (authorIds.length > 0) {
      const [{ data: mems }, { data: pics }] = await Promise.all([
        supabase.from("group_members").select("user_id, role").eq("group_id", group.id).in("user_id", authorIds),
        supabase.from("profile_stats").select("user_id, profile_image_url").in("user_id", authorIds),
      ]);
      (mems || []).forEach((m) => { roleMap[m.user_id] = m.role; });
      (pics || []).forEach((p) => { imageMap[p.user_id] = p.profile_image_url ?? null; });
    }

    let likedSet = new Set<string>();
    if (userId && rows.length > 0) {
      const { data: likes } = await supabase
        .from("group_post_likes").select("post_id")
        .eq("user_id", userId).in("post_id", rows.map((p) => p.id));
      (likes || []).forEach((l) => likedSet.add(l.post_id));
    }

    setPosts(rows.map((p) => ({ ...p, role: roleMap[p.user_id] || "member", liked: likedSet.has(p.id), profile_image_url: imageMap[p.user_id] ?? null })));
    setLoadingPosts(false);
  }

  async function handleLike(post: Post) {
    if (!userId || likeLoading.has(post.id)) return;
    setLikeLoading((prev) => new Set(prev).add(post.id));
    if (post.liked) {
      await supabase.from("group_post_likes").delete().eq("post_id", post.id).eq("user_id", userId);
      await supabase.from("group_posts").update({ like_count: Math.max(0, post.like_count - 1) }).eq("id", post.id);
      setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, like_count: Math.max(0, p.like_count - 1), liked: false } : p));
    } else {
      await supabase.from("group_post_likes").insert({ post_id: post.id, user_id: userId });
      await supabase.from("group_posts").update({ like_count: post.like_count + 1 }).eq("id", post.id);
      setPosts((prev) => prev.map((p) => p.id === post.id ? { ...p, like_count: p.like_count + 1, liked: true } : p));
    }
    setLikeLoading((prev) => { const s = new Set(prev); s.delete(post.id); return s; });
  }

  async function handleSubmitPost() {
    if (!newPostContent.trim() || !userId || !group || submitting) return;
    if (activeTab === "members" || activeTab === "bible_studies") return;
    setSubmitting(true);
    const { data: newPost, error } = await supabase
      .from("group_posts")
      .insert({ group_id: group.id, user_id: userId, display_name: displayName, category: activeTab, content: newPostContent.trim() })
      .select("id, user_id, display_name, category, content, like_count, is_pinned, created_at")
      .single();
    if (!error && newPost) {
      setPosts((prev) => [{ ...newPost, role: userRole, liked: false, profile_image_url: userProfileImage }, ...prev]);
      setNewPostContent("");
    }
    setSubmitting(false);
  }

  // ── Members ──────────────────────────────────────────────────────────────
  async function loadMembers() {
    if (!group) return;
    setLoadingMembers(true);

    // Paginate past Supabase's 1000-row default limit
    let allMemberRows: { user_id: string; role: string; display_name: string }[] = [];
    let from = 0;
    const PAGE = 1000;
    while (true) {
      const { data: page } = await supabase
        .from("group_members")
        .select("user_id, role, display_name")
        .eq("group_id", group.id)
        .eq("status", "approved")
        .range(from, from + PAGE - 1);
      if (!page || page.length === 0) break;
      allMemberRows = allMemberRows.concat(page);
      if (page.length < PAGE) break;
      from += PAGE;
    }

    if (allMemberRows.length === 0) { setMembers([]); setLoadingMembers(false); return; }

    // Fetch profiles in batches of 500 (Supabase .in() limit)
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
    const result: Member[] = allMemberRows.map((m) => {
      const p = profileMap[m.user_id];
      return { user_id: m.user_id, display_name: p?.display_name || p?.username || m.display_name || "Member", role: m.role, profile_image_url: p?.profile_image_url || null };
    });
    result.sort((a, b) => (roleOrder[a.role] ?? 2) - (roleOrder[b.role] ?? 2));
    setMembers(result);
    setLoadingMembers(false);
  }

  // ── Series ───────────────────────────────────────────────────────────────
  async function loadSeries() {
    if (!group) return;
    setLoadingSeries(true);
    const { data } = await supabase
      .from("group_series")
      .select("id, title, description, total_weeks, current_week, is_current, created_at")
      .eq("group_id", group.id)
      .order("created_at", { ascending: false });
    setSeriesList(data || []);
    setLoadingSeries(false);
  }

  async function loadSeriesPosts(seriesId: string) {
    if (!group) return;
    setLoadingSeriesPosts(true);
    const isLeader = userRole === "leader";
    let query = supabase
      .from("group_series_posts")
      .select("id, series_id, week_number, title, content, is_published, like_count, comment_count, created_at, published_at")
      .eq("series_id", seriesId)
      .order("week_number", { ascending: true });
    if (!isLeader) query = query.eq("is_published", true);
    const { data: postRows } = await query;
    const rows = postRows || [];
    let likedSet = new Set<string>();
    if (userId && rows.length > 0) {
      const { data: likes } = await supabase
        .from("group_series_post_likes").select("post_id")
        .eq("user_id", userId).in("post_id", rows.map((p) => p.id));
      (likes || []).forEach((l) => likedSet.add(l.post_id));
    }
    setSeriesPosts(rows.map((p) => ({ ...p, liked: likedSet.has(p.id) })));
    setLoadingSeriesPosts(false);
  }

  async function loadComments(postId: string) {
    setLoadingComments(true);
    const { data: rows } = await supabase
      .from("group_series_post_comments")
      .select("id, user_id, display_name, content, parent_comment_id, like_count, created_at")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    const commentRows = rows || [];

    // Fetch profile images for all commenters
    let imageMap: Record<string, string | null> = {};
    if (commentRows.length > 0) {
      const commenterIds = [...new Set(commentRows.map((c) => c.user_id))];
      const { data: pics } = await supabase
        .from("profile_stats").select("user_id, profile_image_url").in("user_id", commenterIds);
      (pics || []).forEach((p) => { imageMap[p.user_id] = p.profile_image_url ?? null; });
    }

    let likedSet = new Set<string>();
    if (userId && commentRows.length > 0) {
      const { data: likes } = await supabase
        .from("group_series_comment_likes").select("comment_id")
        .eq("user_id", userId).in("comment_id", commentRows.map((c) => c.id));
      (likes || []).forEach((l) => likedSet.add(l.comment_id));
    }
    setComments(commentRows.map((c) => ({ ...c, liked: likedSet.has(c.id), profile_image_url: imageMap[c.user_id] ?? null })));
    setLoadingComments(false);
  }

  async function handleSetCurrentSeries(series: Series) {
    if (!group) return;
    // Set all series for this group to is_current = false
    await supabase.from("group_series").update({ is_current: false }).eq("group_id", group.id);
    // Set this one to true, and update current_week to 1
    await supabase.from("group_series").update({ is_current: true }).eq("id", series.id);
    setSeriesList((prev) => prev.map((s) => ({ ...s, is_current: s.id === series.id })));
    setSelectedSeries((prev) => prev ? { ...prev, is_current: true } : prev);
  }

  async function handleCreateSeries() {
    if (!newSeriesTitle.trim() || !group || !userId) return;
    setSubmittingNewSeries(true);
    const { data, error } = await supabase
      .from("group_series")
      .insert({ group_id: group.id, title: newSeriesTitle.trim(), description: newSeriesDesc.trim() || null, total_weeks: newSeriesTotalWeeks, created_by: userId })
      .select("id, title, description, total_weeks, current_week, is_current, created_at")
      .single();
    if (!error && data) {
      setSeriesList((prev) => [data, ...prev]);
      setShowNewSeriesModal(false);
      setNewSeriesTitle("");
      setNewSeriesDesc("");
      setNewSeriesTotalWeeks(4);
    }
    setSubmittingNewSeries(false);
  }

  async function handleCreateSeriesPost() {
    if (!newSeriesPostTitle.trim() || !newSeriesPostContent.trim() || !selectedSeries || !group || !userId) return;
    setSubmittingNewSeriesPost(true);
    const nextWeek = seriesPosts.length + 1;
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("group_series_posts")
      .insert({
        series_id: selectedSeries.id,
        group_id: group.id,
        week_number: nextWeek,
        title: newSeriesPostTitle.trim(),
        content: newSeriesPostContent.trim(),
        is_published: newSeriesPostPublish,
        published_at: newSeriesPostPublish ? now : null,
        created_by: userId,
      })
      .select("id, series_id, week_number, title, content, is_published, like_count, comment_count, created_at, published_at")
      .single();
    if (!error && data) {
      setSeriesPosts((prev) => [...prev, { ...data, liked: false }]);
      setShowNewPostModal(false);
      setNewSeriesPostTitle("");
      setNewSeriesPostContent("");
      setNewSeriesPostPublish(false);
    }
    setSubmittingNewSeriesPost(false);
  }

  async function handleSeriesPostLike(post: SeriesPost) {
    if (!userId || postLikeLoading) return;
    setPostLikeLoading(true);
    if (post.liked) {
      await supabase.from("group_series_post_likes").delete().eq("post_id", post.id).eq("user_id", userId);
      await supabase.from("group_series_posts").update({ like_count: Math.max(0, post.like_count - 1) }).eq("id", post.id);
      const updated = { ...post, like_count: Math.max(0, post.like_count - 1), liked: false };
      setSelectedPost(updated);
      setSeriesPosts((prev) => prev.map((p) => p.id === post.id ? updated : p));
    } else {
      await supabase.from("group_series_post_likes").insert({ post_id: post.id, user_id: userId });
      await supabase.from("group_series_posts").update({ like_count: post.like_count + 1 }).eq("id", post.id);
      const updated = { ...post, like_count: post.like_count + 1, liked: true };
      setSelectedPost(updated);
      setSeriesPosts((prev) => prev.map((p) => p.id === post.id ? updated : p));
    }
    setPostLikeLoading(false);
  }

  async function handleCommentLike(comment: SeriesComment) {
    if (!userId || commentLikeLoading.has(comment.id)) return;
    setCommentLikeLoading((prev) => new Set(prev).add(comment.id));
    if (comment.liked) {
      await supabase.from("group_series_comment_likes").delete().eq("comment_id", comment.id).eq("user_id", userId);
      await supabase.from("group_series_post_comments").update({ like_count: Math.max(0, comment.like_count - 1) }).eq("id", comment.id);
      setComments((prev) => prev.map((c) => c.id === comment.id ? { ...c, like_count: Math.max(0, c.like_count - 1), liked: false } : c));
    } else {
      await supabase.from("group_series_comment_likes").insert({ comment_id: comment.id, user_id: userId });
      await supabase.from("group_series_post_comments").update({ like_count: comment.like_count + 1 }).eq("id", comment.id);
      setComments((prev) => prev.map((c) => c.id === comment.id ? { ...c, like_count: c.like_count + 1, liked: true } : c));
    }
    setCommentLikeLoading((prev) => { const s = new Set(prev); s.delete(comment.id); return s; });
  }

  async function handleAddComment(parentId: string | null = null) {
    const text = parentId ? replyText : newCommentText;
    if (!text.trim() || !userId || !selectedPost || !group || submittingComment) return;
    setSubmittingComment(true);
    const { data, error } = await supabase
      .from("group_series_post_comments")
      .insert({ post_id: selectedPost.id, group_id: group.id, user_id: userId, display_name: displayName, content: text.trim(), parent_comment_id: parentId })
      .select("id, user_id, display_name, content, parent_comment_id, like_count, created_at")
      .single();
    if (!error && data) {
      setComments((prev) => [...prev, { ...data, liked: false }]);
      if (parentId) { setReplyText(""); setReplyingToId(null); }
      else setNewCommentText("");
    }
    setSubmittingComment(false);
  }

  // ── Derived ──────────────────────────────────────────────────────────────
  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  const coverColor = group.cover_color || "#d4ecd4";
  const isLeader = userRole === "leader";
  const isLeaderOrMod = userRole === "leader" || userRole === "moderator";
  const SAGE = "#5a9a5a";

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Header banner ───────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20" style={{ backgroundColor: coverColor }}>
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          {/* Back: hub item → hub list → post view → series view → series list → group detail */}
          {selectedPost ? (
            <button onClick={() => setSelectedPost(null)} className="text-gray-700 hover:text-gray-900 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : selectedSeries ? (
            <button onClick={() => setSelectedSeries(null)} className="text-gray-700 hover:text-gray-900 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : selectedHubItem ? (
            <button onClick={() => setSelectedHubItem(null)} className="text-gray-700 hover:text-gray-900 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <Link href={`/study-groups/${groupId}`} className="text-gray-700 hover:text-gray-900 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <span className="text-xl">{group.cover_emoji || "🤝"}</span>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">
              {selectedPost ? selectedPost.title : selectedSeries ? selectedSeries.title : selectedHubItem ? selectedHubItem.title : group.name}
            </h1>
            {!selectedPost && !selectedSeries && !selectedHubItem && (
              <button
                onClick={() => setActiveTab("members")}
                className="text-xs text-gray-600 hover:text-gray-900 transition font-medium"
              >
                👥 See All Members
              </button>
            )}
          </div>
        </div>

        {/* ── Navigation dropdown (hidden when in series/post/hub-item sub-view) ─── */}
        {!selectedSeries && !selectedPost && !selectedHubItem && (
          <div className="max-w-2xl mx-auto px-4 pb-3">
            {(() => {
              const staticOptions = [
                { key: "home",          label: "🏠 Home" },
                { key: "bible_studies", label: "📚 Bible Studies" },
                { key: "prayer",        label: "🙏 Prayer" },
                { key: "qa",            label: "❓ Q&A" },
              ];
              const activeStatic = staticOptions.find((o) => o.key === activeTab);
              const activeHub = hubCategories.find((c) => c.id === activeTab);
              const currentLabel =
                activeStatic?.label ??
                (activeHub ? `${activeHub.emoji} ${activeHub.name}` : "🏠 Home");
              return (
                <button
                  ref={dropdownBtnRef}
                  onClick={() => {
                    if (dropdownBtnRef.current) {
                      setDropdownRect(dropdownBtnRef.current.getBoundingClientRect());
                    }
                    setShowHubDropdown((v) => !v);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full text-sm font-semibold text-gray-800 shadow-sm border border-gray-200 hover:bg-white transition"
                >
                  <span>{currentLabel}</span>
                  <svg
                    className="w-4 h-4 opacity-60 flex-shrink-0"
                    style={{ transform: showHubDropdown ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              );
            })()}
          </div>
        )}
      </div>

      {/* ── Nav dropdown overlay (rendered outside sticky header to escape z-20 stacking context) */}
      {showHubDropdown && dropdownRect && (
        <>
          <div
            className="fixed inset-0"
            style={{ zIndex: 9998 }}
            onClick={() => setShowHubDropdown(false)}
          />
          <div
            className="fixed bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            style={{
              zIndex: 9999,
              top: dropdownRect.bottom + 6,
              left: dropdownRect.left,
              minWidth: 230,
            }}
          >
            {[
              { key: "home",          label: "🏠 Home" },
              { key: "bible_studies", label: "📚 Bible Studies" },
              { key: "prayer",        label: "🙏 Prayer" },
              { key: "qa",            label: "❓ Q&A" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setActiveTab(opt.key); setShowHubDropdown(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-50 transition border-b border-gray-50"
                style={{ color: activeTab === opt.key ? "#4a9b6f" : "#374151", fontWeight: activeTab === opt.key ? 600 : 400 }}
              >
                <span>{opt.label}</span>
                {activeTab === opt.key && (
                  <svg className="w-4 h-4 ml-auto text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
            {hubCategories.length > 0 && (
              <div className="border-t border-gray-100">
                {hubCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveTab(cat.id); setHubView("articles"); setShowHubDropdown(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-50 transition border-b border-gray-50 last:border-0"
                    style={{ color: activeTab === cat.id ? "#4a9b6f" : "#374151", fontWeight: activeTab === cat.id ? 600 : 400 }}
                  >
                    <span className="text-base">{cat.emoji}</span>
                    <span>{cat.name}</span>
                    {activeTab === cat.id && (
                      <svg className="w-4 h-4 ml-auto text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Feed ────────────────────────────────────────────────────────── */}
      <div ref={feedRef} className="flex-1 overflow-y-auto pb-32">

        {/* ── Hub article viewer (iframe, full-width, no padding) ───────── */}
        {selectedHubItem && (
          <iframe
            key={selectedHubItem.path}
            src={selectedHubItem.path}
            title={selectedHubItem.title}
            className="w-full border-0 block"
            style={{ height: "calc(100vh - 60px)", minHeight: 500 }}
          />
        )}

        {!selectedHubItem && <div className="max-w-2xl mx-auto px-4 py-4">

          {/* ── MEMBERS TAB ─────────────────────────────────────────────── */}
          {activeTab === "members" && !selectedSeries && !selectedPost ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mt-2">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-800">Members ({members.length})</h2>
              </div>
              {/* Search */}
              <div className="px-4 py-3 border-b border-gray-100">
                <input
                  type="text"
                  value={membersSearch}
                  onChange={(e) => setMembersSearch(e.target.value)}
                  placeholder="Search members..."
                  className="w-full px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>
              {loadingMembers ? (
                <p className="text-sm text-gray-400 text-center py-8">Loading members...</p>
              ) : members.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No members yet.</p>
              ) : (() => {
                const q = membersSearch.toLowerCase();
                const filtered = membersSearch ? members.filter((m) => m.display_name.toLowerCase().includes(q)) : members;
                if (filtered.length === 0) return <p className="text-sm text-gray-400 text-center py-8">No results for "{membersSearch}".</p>;
                return (
                <div className="divide-y divide-gray-100">
                  {filtered.map((member) => (
                    <div key={member.user_id} className="flex items-center gap-3 px-5 py-3.5">
                      {member.profile_image_url ? (
                        <img src={member.profile_image_url} alt={member.display_name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: avatarColor(member.user_id) }}>
                          {getInitial(member.display_name)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{member.display_name}</p>
                        {(member.role === "leader" || member.role === "moderator") && (
                          <span className="text-xs text-green-600 font-medium">
                            {member.role === "leader" ? "Leader" : "Moderator"}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/profile/${member.user_id}`}
                        className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition flex-shrink-0"
                      >
                        View Profile
                      </Link>
                    </div>
                  ))}
                </div>
                );
              })()}
            </div>

          /* ── BIBLE STUDIES — POST VIEW ─────────────────────────────────── */
          ) : activeTab === "bible_studies" && selectedPost ? (
            <div className="flex flex-col gap-4">
              {/* Post card */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 pt-5 pb-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{selectedSeries?.title}</p>
                  <p className="text-xs text-gray-500 mb-3">Week {selectedPost.week_number} · {selectedPost.published_at ? formatDate(selectedPost.published_at) : formatDate(selectedPost.created_at)}</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 leading-snug">{selectedPost.title}</h2>
                  <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{selectedPost.content}</p>
                </div>
                {/* Like bar */}
                <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-3">
                  <button
                    onClick={() => handleSeriesPostLike(selectedPost)}
                    disabled={postLikeLoading}
                    className="flex items-center gap-1.5 text-sm font-medium transition"
                    style={{ color: selectedPost.liked ? "#e53e3e" : "#9ca3af" }}
                  >
                    <svg className="w-5 h-5" fill={selectedPost.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {selectedPost.like_count > 0 ? selectedPost.like_count : "Like"}
                  </button>
                  <span className="text-xs text-gray-400">{selectedPost.comment_count} comment{selectedPost.comment_count !== 1 ? "s" : ""}</span>
                </div>
              </div>

              {/* Comments */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-800">Comments</h3>
                </div>
                {loadingComments ? (
                  <p className="text-sm text-gray-400 text-center py-6">Loading...</p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {/* Top-level comments */}
                    {comments.filter((c) => !c.parent_comment_id).map((comment) => (
                      <div key={comment.id} className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <Link href={`/profile/${comment.user_id}`} className="flex-shrink-0">
                            {comment.profile_image_url ? (
                              <img src={comment.profile_image_url} alt={comment.display_name} className="w-8 h-8 rounded-full object-cover hover:opacity-80 transition" />
                            ) : (
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold hover:opacity-80 transition" style={{ backgroundColor: avatarColor(comment.user_id) }}>
                                {getInitial(comment.display_name)}
                              </div>
                            )}
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Link href={`/profile/${comment.user_id}`} className="text-sm font-semibold text-gray-900 hover:underline">{comment.display_name}</Link>
                              <span className="text-xs text-gray-400">{timeAgo(comment.created_at)}</span>
                            </div>
                            <p className="text-sm text-gray-800 leading-relaxed">{comment.content}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <button
                                onClick={() => handleCommentLike(comment)}
                                disabled={commentLikeLoading.has(comment.id)}
                                className="flex items-center gap-1 text-xs transition"
                                style={{ color: comment.liked ? "#e53e3e" : "#9ca3af" }}
                              >
                                <svg className="w-3.5 h-3.5" fill={comment.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {comment.like_count > 0 ? comment.like_count : ""}
                              </button>
                              <button
                                onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                                className="text-xs text-gray-400 hover:text-gray-700 transition"
                              >
                                Reply
                              </button>
                            </div>

                            {/* Inline reply input */}
                            {replyingToId === comment.id && (
                              <div className="mt-3 flex gap-2">
                                <input
                                  type="text"
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder={`Reply to ${comment.display_name}...`}
                                  className="flex-1 text-xs bg-gray-100 rounded-xl px-3 py-2 outline-none text-gray-900 placeholder-gray-400"
                                  onKeyDown={(e) => { if (e.key === "Enter") handleAddComment(comment.id); }}
                                />
                                <button
                                  onClick={() => handleAddComment(comment.id)}
                                  disabled={!replyText.trim() || submittingComment}
                                  className="px-3 py-1.5 rounded-xl text-white text-xs font-medium disabled:opacity-40 transition"
                                  style={{ backgroundColor: SAGE }}
                                >
                                  Send
                                </button>
                              </div>
                            )}

                            {/* Replies */}
                            {comments.filter((c) => c.parent_comment_id === comment.id).map((reply) => (
                              <div key={reply.id} className="mt-3 ml-4 flex items-start gap-2">
                                <Link href={`/profile/${reply.user_id}`} className="flex-shrink-0">
                                  {reply.profile_image_url ? (
                                    <img src={reply.profile_image_url} alt={reply.display_name} className="w-6 h-6 rounded-full object-cover hover:opacity-80 transition" />
                                  ) : (
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold hover:opacity-80 transition" style={{ backgroundColor: avatarColor(reply.user_id) }}>
                                      {getInitial(reply.display_name)}
                                    </div>
                                  )}
                                </Link>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <Link href={`/profile/${reply.user_id}`} className="text-xs font-semibold text-gray-900 hover:underline">{reply.display_name}</Link>
                                    <span className="text-xs text-gray-400">{timeAgo(reply.created_at)}</span>
                                  </div>
                                  <p className="text-xs text-gray-800 leading-relaxed">{reply.content}</p>
                                  <button
                                    onClick={() => handleCommentLike(reply)}
                                    disabled={commentLikeLoading.has(reply.id)}
                                    className="flex items-center gap-1 text-xs mt-1 transition"
                                    style={{ color: reply.liked ? "#e53e3e" : "#9ca3af" }}
                                  >
                                    <svg className="w-3 h-3" fill={reply.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {reply.like_count > 0 ? reply.like_count : ""}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    {comments.filter((c) => !c.parent_comment_id).length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-6">No comments yet. Be the first!</p>
                    )}
                  </div>
                )}
              </div>
            </div>

          /* ── BIBLE STUDIES — SERIES VIEW ───────────────────────────────── */
          ) : activeTab === "bible_studies" && selectedSeries ? (
            <div className="flex flex-col gap-4">
              {/* Series header card */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900">{selectedSeries.title}</h2>
                    {selectedSeries.description && <p className="text-sm text-gray-500 mt-1">{selectedSeries.description}</p>}
                    <p className="text-xs text-gray-400 mt-2">{selectedSeries.total_weeks} weeks</p>
                  </div>
                  {selectedSeries.is_current && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#d4ecd4", color: SAGE }}>
                      Current
                    </span>
                  )}
                </div>
                {isLeader && (
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {!selectedSeries.is_current && (
                      <button
                        onClick={() => handleSetCurrentSeries(selectedSeries)}
                        className="px-4 py-2 rounded-xl text-white text-sm font-medium transition hover:opacity-90"
                        style={{ backgroundColor: SAGE }}
                      >
                        Set as Current Series
                      </button>
                    )}
                    <button
                      onClick={() => setShowNewPostModal(true)}
                      className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                    >
                      + Add Week Post
                    </button>
                  </div>
                )}
              </div>

              {/* Posts list */}
              {loadingSeriesPosts ? (
                <p className="text-sm text-gray-400 text-center py-8">Loading posts...</p>
              ) : seriesPosts.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center">
                  <p className="text-gray-400 text-sm">{isLeader ? "No posts yet. Add the first week post." : "No posts published yet."}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {seriesPosts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-left hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 mb-1">Week {post.week_number}</p>
                          <p className="text-sm font-semibold text-gray-900 truncate">{post.title}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                            <span>❤️ {post.like_count}</span>
                            <span>💬 {post.comment_count}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          {isLeader && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                              {post.is_published ? "Published" : "Draft"}
                            </span>
                          )}
                          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

          /* ── BIBLE STUDIES — SERIES LIST ───────────────────────────────── */
          ) : activeTab === "bible_studies" ? (
            <div className="flex flex-col gap-4">
              {/* Leader header */}
              {isLeader && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowNewSeriesModal(true)}
                    className="px-4 py-2 rounded-xl text-white text-sm font-semibold transition hover:opacity-90"
                    style={{ backgroundColor: SAGE }}
                  >
                    + New Series
                  </button>
                </div>
              )}

              {loadingSeries ? (
                <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
              ) : seriesList.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center">
                  <p className="text-gray-400 text-sm">{isLeader ? "No series yet. Create the first one." : "No series available yet."}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {seriesList.map((series) => {
                    const publishedCount = 0; // would require a join; omitted for perf
                    return (
                      <button
                        key={series.id}
                        onClick={() => setSelectedSeries(series)}
                        className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-left hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{series.title}</p>
                            {series.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{series.description}</p>}
                            <p className="text-xs text-gray-400 mt-1">{series.total_weeks} weeks</p>
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            {series.is_current && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#d4ecd4", color: SAGE }}>
                                Current
                              </span>
                            )}
                            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          /* ── HUB TABS ───────────────────────────────────────────────────── */
          ) : hubCategories.some((c) => c.id === activeTab) ? (() => {
            const hubCat = hubCategories.find((c) => c.id === activeTab)!;
            const bg = hubCat.color;
            const borderColor = bg.replace(/ff$/, "cc");

            // ── Category list view (items from static config) ──
            const hubCatStatic = HUB_CONTENT.find((c) => c.name === hubCat.name);
            const allItems = hubCatStatic?.items ?? [];
            const articles = allItems.filter((i) => i.type === "article");
            const questions = allItems.filter((i) => i.type === "question");
            const items = hubView === "articles" ? articles : questions;
            return (
              <div className="flex flex-col gap-4">
                {/* Articles / Questions toggle */}
                <div className="flex justify-center">
                  <div className="inline-flex rounded-lg border overflow-hidden shadow-sm" style={{ borderColor }}>
                    <button
                      className="px-5 py-2 text-sm font-semibold transition focus:outline-none"
                      style={{ backgroundColor: hubView === "articles" ? bg : "transparent", color: hubView === "articles" ? "#1a1a1a" : "rgba(0,0,0,0.45)" }}
                      onClick={() => setHubView("articles")}
                      type="button"
                    >
                      Articles
                    </button>
                    <button
                      className="px-5 py-2 text-sm font-semibold transition focus:outline-none border-l"
                      style={{ borderColor, backgroundColor: hubView === "questions" ? bg : "transparent", color: hubView === "questions" ? "#1a1a1a" : "rgba(0,0,0,0.45)" }}
                      onClick={() => setHubView("questions")}
                      type="button"
                    >
                      Questions
                    </button>
                  </div>
                </div>

                {/* Content list */}
                {items.length === 0 ? (
                  <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center">
                    <p className="text-gray-400 text-sm">No {hubView} yet in this category.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedHubItem(item)}
                        className="w-full text-left rounded-xl p-5 shadow-sm border hover:shadow-md transition cursor-pointer"
                        style={{ backgroundColor: bg, borderColor }}
                      >
                        <p className="font-bold text-gray-900 text-base leading-snug">{item.title}</p>
                        <p className="text-gray-600 text-sm mt-1">{item.subtitle}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })() : (

          /* ── OTHER TABS (chat) ──────────────────────────────────────────── */
            renderPosts()
          )}

        </div>}
      </div>

      {/* ── Post composer (chat tabs only) ──────────────────────────────── */}
      {activeTab !== "members" && activeTab !== "bible_studies" && !hubCategories.some((c) => c.id === activeTab) && !selectedPost && (
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-end gap-3">
            {userProfileImage ? (
              <img src={userProfileImage} alt={displayName} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: userId ? avatarColor(userId) : "#aaa" }}>
                {getInitial(displayName)}
              </div>
            )}
            <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 flex items-end gap-2">
              <textarea
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 resize-none outline-none max-h-28"
                placeholder={`Post in ${TABS.find((t) => t.key === activeTab)?.label ?? ""}...`}
                rows={1}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmitPost(); } }}
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

      {/* ── Comment input bar (post view) ────────────────────────────────── */}
      {activeTab === "bible_studies" && selectedPost && (
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-end gap-3">
            {userProfileImage ? (
              <img src={userProfileImage} alt={displayName} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: userId ? avatarColor(userId) : "#aaa" }}>
                {getInitial(displayName)}
              </div>
            )}
            <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2.5 flex items-end gap-2">
              <textarea
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 resize-none outline-none max-h-28"
                placeholder="Add a comment..."
                rows={1}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAddComment(null); } }}
              />
              <button
                onClick={() => handleAddComment(null)}
                disabled={!newCommentText.trim() || submittingComment}
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition disabled:opacity-40"
                style={{ backgroundColor: SAGE }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── New Series Modal ─────────────────────────────────────────────── */}
      {showNewSeriesModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-0 sm:px-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">New Series</h2>
              <button onClick={() => setShowNewSeriesModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 text-xl">×</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Series Title</label>
                <input
                  type="text"
                  value={newSeriesTitle}
                  onChange={(e) => setNewSeriesTitle(e.target.value)}
                  placeholder="e.g. The Temptation of Jesus"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-gray-400 font-normal">(optional)</span></label>
                <textarea
                  value={newSeriesDesc}
                  onChange={(e) => setNewSeriesDesc(e.target.value)}
                  placeholder="Brief description of the series..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Weeks</label>
                <input
                  type="number"
                  min={1}
                  max={52}
                  value={newSeriesTotalWeeks}
                  onChange={(e) => setNewSeriesTotalWeeks(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setShowNewSeriesModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Cancel</button>
                <button
                  onClick={handleCreateSeries}
                  disabled={!newSeriesTitle.trim() || submittingNewSeries}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition disabled:opacity-60"
                  style={{ backgroundColor: SAGE }}
                >
                  {submittingNewSeries ? "Creating..." : "Create Series"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── New Post Modal ───────────────────────────────────────────────── */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-0 sm:px-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Add Week Post · Week {seriesPosts.length + 1}</h2>
              <button onClick={() => setShowNewPostModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 text-xl">×</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                <input
                  type="text"
                  value={newSeriesPostTitle}
                  onChange={(e) => setNewSeriesPostTitle(e.target.value)}
                  placeholder={`Week ${seriesPosts.length + 1} — `}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={newSeriesPostContent}
                  onChange={(e) => setNewSeriesPostContent(e.target.value)}
                  placeholder="Write your study post here..."
                  rows={8}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newSeriesPostPublish}
                    onChange={(e) => setNewSeriesPostPublish(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
                <span className="text-sm text-gray-700">{newSeriesPostPublish ? "Publish now" : "Save as draft"}</span>
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setShowNewPostModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Cancel</button>
                <button
                  onClick={handleCreateSeriesPost}
                  disabled={!newSeriesPostTitle.trim() || !newSeriesPostContent.trim() || submittingNewSeriesPost}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition disabled:opacity-60"
                  style={{ backgroundColor: SAGE }}
                >
                  {submittingNewSeriesPost ? "Saving..." : "Save Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  // ── Chat renderPosts helper ──────────────────────────────────────────────
  function renderPosts() {
    if (loadingPosts) return <p className="text-gray-400 text-sm text-center py-8">Loading posts...</p>;
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
            {post.is_pinned && <div className="flex items-center gap-1 text-xs text-amber-600 font-medium mb-2">📌 Pinned</div>}
            <div className="flex items-start gap-3">
              {post.profile_image_url ? (
                <img src={post.profile_image_url} alt={post.display_name || ""} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: avatarColor(post.user_id) }}>
                  {getInitial(post.display_name)}
                </div>
              )}
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
              {isLeaderOrMod && (
                <button className="text-gray-300 hover:text-amber-500 transition" title="Pin post (coming soon)" disabled>📌</button>
              )}
            </div>
            <p className="text-gray-800 text-sm mt-3 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleLike(post)}
                disabled={likeLoading.has(post.id)}
                className="flex items-center gap-1.5 text-sm transition"
                style={{ color: post.liked ? "#e53e3e" : "#9ca3af" }}
              >
                <svg className="w-4 h-4" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.like_count > 0 ? post.like_count : ""}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-gray-400" title="Reply threads coming soon" disabled>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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
