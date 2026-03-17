"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import {
  calculateStreakFromActions,
  getDayAbbr,
  type ProfileStats,
  type StreakData,
} from "../../../lib/profileStats";
import { syncNotesCount, shouldSyncNotesCount } from "../../../lib/syncNotesCount";
import { syncChaptersCount, shouldSyncChaptersCount } from "../../../lib/syncChaptersCount";
import { syncTriviaQuestionsCount, shouldSyncTriviaQuestionsCount } from "../../../lib/syncTriviaQuestionsCount";
import { isBookComplete } from "../../../lib/readingProgress";
import { logActionToMasterActions } from "@/lib/actionRecorder";
import UserBadge from "@/components/UserBadge";
import { CUSTOM_MEMBER_BADGE_OPTIONS, normalizeCustomMemberBadge } from "@/lib/userBadges";

// ── Avatar color helpers ────────────────────────────────────────────────────
const AVATAR_COLORS = ["#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8"];
function avatarColor(uid: string): string {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = uid.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ── Time helpers ────────────────────────────────────────────────────────────
function formatLastActive(dateStr: string | null | undefined): string {
  if (!dateStr) return "Unknown";
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 60) return "Active today";
  if (diffHours < 24) return `Active ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays === 1) return "Active yesterday";
  if (diffDays < 7) return `Active ${diffDays} days ago`;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `Active ${months[date.getMonth()]} ${date.getDate()}`;
}

function formatJoined(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

type BuddyState = "none" | "pending_sent" | "pending_received" | "buddies";

interface BuddyProfile {
  user_id: string;
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
  member_badge?: string | null;
  is_paid?: boolean;
}

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const profileUserId = params.userId as string;

  const [viewerUserId, setViewerUserId] = useState<string | null>(null);
  const [viewerEmail, setViewerEmail] = useState<string | null>(null);
  const [viewerName, setViewerName] = useState<string>("");
  const [stats, setStats] = useState<ProfileStats & { created_at?: string } | null>(null);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [booksCompleted, setBooksCompleted] = useState(0);
  const [bibleCompletion, setBibleCompletion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [actionLog, setActionLog] = useState<Array<{ date: string; text: string; sortKey: number; actionType: string }>>([]);
  const [userGroups, setUserGroups] = useState<Array<{ id: string; name: string; cover_emoji: string | null; cover_color: string | null; member_count: number }>>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // ── Buddy state ────────────────────────────────────────────────────────────
  const [buddyState, setBuddyState] = useState<BuddyState>("none");
  const [buddyRequestId, setBuddyRequestId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [buddyCount, setBuddyCount] = useState(0);
  const [buddiesList, setBuddiesList] = useState<BuddyProfile[]>([]);
  const [buddiesPage, setBuddiesPage] = useState(1);
  const [buddiesLoadingPage, setBuddiesLoadingPage] = useState(false);
  const [buddiesSearch, setBuddiesSearch] = useState("");
  const [showBuddiesModal, setShowBuddiesModal] = useState(false);
  const BUDDIES_PAGE_SIZE = 20;
  const [showRemoveBuddyConfirm, setShowRemoveBuddyConfirm] = useState(false);
  const [badgeDraft, setBadgeDraft] = useState<string>("");
  const [savingBadge, setSavingBadge] = useState(false);
  const [badgeSaveMessage, setBadgeSaveMessage] = useState<string | null>(null);

  // ── Recent posts ───────────────────────────────────────────────────────────
  const [recentPosts, setRecentPosts] = useState<Array<{
    id: string;
    post_type: string;
    content: string;
    verse_ref: string | null;
    visibility: string;
    created_at: string;
  }>>([]);
  const [buddyActionLoading, setBuddyActionLoading] = useState(false);

  useEffect(() => {
    if (!profileUserId) return;
    loadProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUserId]);

  async function loadProfileData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setViewerUserId(user.id);
        setViewerEmail(user.email ?? null);
        if (user.id === profileUserId) {
          if (shouldSyncNotesCount(user.id)) await syncNotesCount(user.id);
          if (shouldSyncChaptersCount(user.id)) await syncChaptersCount(user.id);
          if (shouldSyncTriviaQuestionsCount(user.id)) await syncTriviaQuestionsCount(user.id);
        }
        // Fetch viewer's display name for notifications
        const { data: viewerProfile } = await supabase
          .from("profile_stats")
          .select("display_name, username")
          .eq("user_id", user.id)
          .maybeSingle();
        if (viewerProfile) {
          setViewerName(viewerProfile.display_name || viewerProfile.username || "Someone");
        }
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profile_stats")
        .select("*")
        .eq("user_id", profileUserId)
        .maybeSingle();

      if (profileError) {
        console.error("[PUBLIC_PROFILE] Error fetching profile:", profileError);
        setNotFound(true);
        setLoading(false);
        return;
      }
      if (!profileData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setStats(profileData as ProfileStats & { created_at?: string });
      setBadgeDraft(profileData.member_badge || "");

      const streakData = await calculateStreakFromActions(profileUserId);
      setStreak(streakData);

      const { data: completedChapters, error: chaptersError } = await supabase
        .from("completed_chapters")
        .select("book")
        .eq("user_id", profileUserId);

      if (!chaptersError && completedChapters) {
        const uniqueBooks = new Set(completedChapters.map((c) => c.book));
        let completedBooksCount = 0;
        for (const book of uniqueBooks) {
          if (await isBookComplete(profileUserId, book)) completedBooksCount++;
        }
        setBooksCompleted(completedBooksCount);
        const completionPercent = completedChapters.length > 0
          ? Math.round((completedChapters.length / 1189) * 100 * 10) / 10
          : 0;
        setBibleCompletion(completionPercent);
      }

      // Study groups the user belongs to
      const { data: memberRows } = await supabase
        .from("group_members")
        .select("study_groups(id, name, cover_emoji, cover_color, member_count)")
        .eq("user_id", profileUserId)
        .eq("status", "approved");

      if (memberRows) {
        const groups = memberRows
          .map((r: any) => r.study_groups)
          .filter(Boolean);
        setUserGroups(groups);
      }

      await buildActionLog(profileUserId);

      // Load buddy data (only if viewer is logged in and not owner)
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser && currentUser.id !== profileUserId) {
        await loadBuddyRelationship(currentUser.id);
      }
      await loadBuddyCount();

      // Load recent feed posts (RLS filters visibility automatically)
      const { data: posts } = await supabase
        .from("feed_posts")
        .select("id, post_type, content, verse_ref, visibility, created_at")
        .eq("user_id", profileUserId)
        .order("created_at", { ascending: false })
        .limit(6);
      setRecentPosts(posts || []);
    } catch (err) {
      console.error("[PUBLIC_PROFILE] Error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function loadBuddyRelationship(viewerId: string) {
    // Check if already buddies
    const uid1 = viewerId < profileUserId ? viewerId : profileUserId;
    const uid2 = viewerId < profileUserId ? profileUserId : viewerId;

    const { data: buddyRow } = await supabase
      .from("buddies")
      .select("id")
      .eq("user_id_1", uid1)
      .eq("user_id_2", uid2)
      .maybeSingle();

    if (buddyRow) {
      setBuddyState("buddies");
      // Get conversation id
      const { data: convRow } = await supabase
        .from("conversations")
        .select("id")
        .eq("user_id_1", uid1)
        .eq("user_id_2", uid2)
        .maybeSingle();
      if (convRow) setConversationId(convRow.id);
      return;
    }

    // Check pending request
    const { data: sentRequest } = await supabase
      .from("buddy_requests")
      .select("id")
      .eq("sender_id", viewerId)
      .eq("receiver_id", profileUserId)
      .eq("status", "pending")
      .maybeSingle();

    if (sentRequest) {
      setBuddyState("pending_sent");
      setBuddyRequestId(sentRequest.id);
      return;
    }

    const { data: receivedRequest } = await supabase
      .from("buddy_requests")
      .select("id")
      .eq("sender_id", profileUserId)
      .eq("receiver_id", viewerId)
      .eq("status", "pending")
      .maybeSingle();

    if (receivedRequest) {
      setBuddyState("pending_received");
      setBuddyRequestId(receivedRequest.id);
      return;
    }

    setBuddyState("none");
  }

  async function loadBuddyCount() {
    const { count } = await supabase
      .from("buddies")
      .select("*", { count: "exact", head: true })
      .or(`user_id_1.eq.${profileUserId},user_id_2.eq.${profileUserId}`);
    setBuddyCount(count ?? 0);
  }

  async function loadBuddiesPage(page: number) {
    setBuddiesLoadingPage(true);
    const from = (page - 1) * BUDDIES_PAGE_SIZE;
    const to = from + BUDDIES_PAGE_SIZE - 1;

    const { data: rows } = await supabase
      .from("buddies")
      .select("user_id_1, user_id_2")
      .or(`user_id_1.eq.${profileUserId},user_id_2.eq.${profileUserId}`)
      .range(from, to);

    if (!rows || rows.length === 0) { setBuddiesList([]); setBuddiesLoadingPage(false); return; }

    const otherIds = rows.map((r) => r.user_id_1 === profileUserId ? r.user_id_2 : r.user_id_1);

    const { data: pics } = await supabase
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url, member_badge, is_paid")
      .in("user_id", otherIds);

    const profileMap: Record<string, BuddyProfile> = {};
    (pics || []).forEach((p) => { profileMap[p.user_id] = p; });

    setBuddiesList(otherIds.map((id) => profileMap[id] || { user_id: id, display_name: null, username: null, profile_image_url: null, member_badge: null, is_paid: false }));
    setBuddiesLoadingPage(false);
  }

  // ── Buddy actions ──────────────────────────────────────────────────────────
  async function handleAddBuddy() {
    if (!viewerUserId || buddyActionLoading) return;
    setBuddyActionLoading(true);
    try {
      const { data: req, error } = await supabase
        .from("buddy_requests")
        .insert({ sender_id: viewerUserId, receiver_id: profileUserId })
        .select("id")
        .single();

      if (error) { console.error("[BUDDY] Add error:", error); return; }
      setBuddyRequestId(req.id);
      setBuddyState("pending_sent");

      // Send notification to profile owner
      await supabase.from("notifications").insert({
        user_id: profileUserId,
        type: "buddy_request",
        from_user_id: viewerUserId,
        from_user_name: viewerName,
        message: `${viewerName} sent you a Buddy request!`,
      });
    } finally {
      setBuddyActionLoading(false);
    }
  }

  async function handleCancelRequest() {
    if (!buddyRequestId || buddyActionLoading) return;
    setBuddyActionLoading(true);
    try {
      await supabase.from("buddy_requests").delete().eq("id", buddyRequestId);
      setBuddyState("none");
      setBuddyRequestId(null);
    } finally {
      setBuddyActionLoading(false);
    }
  }

  async function handleAcceptRequest() {
    if (!buddyRequestId || buddyActionLoading) return;
    setBuddyActionLoading(true);
    try {
      await supabase
        .from("buddy_requests")
        .update({ status: "accepted" })
        .eq("id", buddyRequestId);

      // Log feed activity
      void supabase.rpc("log_feed_activity", {
        p_activity_type: "buddy_added",
        p_activity_data: {
          buddy_id: profileUserId,
          buddy_name: stats?.display_name || stats?.username || "Bible Buddy",
        },
        p_is_public: true,
      });

      void logActionToMasterActions(viewerUserId!, "buddy_added", stats?.display_name || stats?.username || "Bible Buddy");

      setBuddyState("buddies");
      setBuddyRequestId(null);
      await loadBuddyCount();

      // Get conversation
      if (viewerUserId) {
        const uid1 = viewerUserId < profileUserId ? viewerUserId : profileUserId;
        const uid2 = viewerUserId < profileUserId ? profileUserId : viewerUserId;
        const { data: convRow } = await supabase
          .from("conversations")
          .select("id")
          .eq("user_id_1", uid1)
          .eq("user_id_2", uid2)
          .maybeSingle();
        if (convRow) setConversationId(convRow.id);
      }
    } finally {
      setBuddyActionLoading(false);
    }
  }

  async function handleDeclineRequest() {
    if (!buddyRequestId || buddyActionLoading) return;
    setBuddyActionLoading(true);
    try {
      await supabase.from("buddy_requests").delete().eq("id", buddyRequestId);
      setBuddyState("none");
      setBuddyRequestId(null);
    } finally {
      setBuddyActionLoading(false);
    }
  }

  async function handleRemoveBuddy() {
    if (!viewerUserId || buddyActionLoading) return;
    setBuddyActionLoading(true);
    try {
      const uid1 = viewerUserId < profileUserId ? viewerUserId : profileUserId;
      const uid2 = viewerUserId < profileUserId ? profileUserId : viewerUserId;
      await supabase.from("buddies").delete().eq("user_id_1", uid1).eq("user_id_2", uid2);
      setBuddyState("none");
      setConversationId(null);
      setShowRemoveBuddyConfirm(false);
      await loadBuddyCount();
    } finally {
      setBuddyActionLoading(false);
    }
  }

  async function handleSaveMemberBadge() {
    if (viewerEmail !== "moorelouis3@gmail.com") return;
    setSavingBadge(true);
    setBadgeSaveMessage(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        setBadgeSaveMessage("Could not verify admin session.");
        return;
      }

      const response = await fetch("/api/admin/member-badge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId: profileUserId,
          memberBadge: normalizeCustomMemberBadge(badgeDraft),
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setBadgeSaveMessage(payload.error || "Could not save badge.");
        return;
      }

      setStats((prev) => (
        prev
          ? {
              ...prev,
              member_badge: payload.memberBadge || null,
              is_paid: payload.isPaid === true ? true : prev.is_paid,
            }
          : prev
      ));
      setBadgeSaveMessage("Badge updated.");
    } catch (_error) {
      setBadgeSaveMessage("Could not save badge.");
    } finally {
      setSavingBadge(false);
    }
  }

  async function buildActionLog(uid: string) {
    const actions: Array<{ date: string; text: string; sortKey: number; actionType: string }> = [];
    const { data: masterActions, error } = await supabase
      .from("master_actions")
      .select("action_type, action_label, created_at")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });

    if (error || !masterActions) { setActionLog([]); return; }

    const loginDates = new Set<string>();
    for (const action of masterActions) {
      const actionDate = new Date(action.created_at);
      const dateKey = actionDate.toISOString().split("T")[0];
      const d = formatActionDate(actionDate);

      if (action.action_type === "chapter_completed") {
        actions.push({ date: d, text: action.action_label ? `${d} — Read ${action.action_label}` : `${d} — Read a chapter`, sortKey: actionDate.getTime(), actionType: "chapter_completed" });
      } else if (action.action_type === "book_completed") {
        actions.push({ date: d, text: action.action_label ? `${d} — Finished ${action.action_label}` : `${d} — Finished a book`, sortKey: actionDate.getTime(), actionType: "book_completed" });
      } else if (action.action_type === "person_learned") {
        actions.push({ date: d, text: action.action_label ? `${d} — Learned about ${action.action_label}` : `${d} — Learned about a Bible person`, sortKey: actionDate.getTime(), actionType: "person_learned" });
      } else if (action.action_type === "place_discovered") {
        actions.push({ date: d, text: action.action_label ? `${d} — Discovered ${action.action_label}` : `${d} — Discovered a Bible place`, sortKey: actionDate.getTime(), actionType: "place_discovered" });
      } else if (action.action_type === "keyword_mastered") {
        actions.push({ date: d, text: action.action_label ? `${d} — Explored ${action.action_label}` : `${d} — Explored a Bible keyword`, sortKey: actionDate.getTime(), actionType: "keyword_mastered" });
      } else if (action.action_type === "note_created") {
        actions.push({ date: d, text: `${d} — Created a note`, sortKey: actionDate.getTime(), actionType: "note_created" });
      } else if (action.action_type === "user_login" && !loginDates.has(dateKey)) {
        loginDates.add(dateKey);
        actions.push({ date: d, text: `${d} — Logged in`, sortKey: actionDate.getTime(), actionType: "user_login" });
      }
    }
    actions.sort((a, b) => b.sortKey - a.sortKey);
    setActionLog(actions);
  }

  function openEditModal() {
    setEditDisplayName(stats?.display_name || stats?.username || "");
    setEditBio(stats?.bio || "");
    setEditLocation(stats?.location || "");
    setEditImagePreview(stats?.profile_image_url || null);
    setEditImageFile(null);
    setShowEditModal(true);
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditImageFile(file);
    setEditImagePreview(URL.createObjectURL(file));
  }

  async function handleSaveProfile() {
    if (!viewerUserId || viewerUserId !== profileUserId) return;
    setSaving(true);

    try {
      let imageUrl = stats?.profile_image_url || null;

      if (editImageFile) {
        setUploadingImage(true);
        const ext = editImageFile.name.split(".").pop();
        const path = `${viewerUserId}/avatar.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(path, editImageFile, { upsert: true });

        if (uploadError) {
          console.error("[EDIT_PROFILE] Image upload error:", uploadError);
        } else {
          const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
          imageUrl = urlData.publicUrl;
        }
        setUploadingImage(false);
      }

      const { error } = await supabase
        .from("profile_stats")
        .update({
          display_name: editDisplayName.trim() || null,
          bio: editBio.trim() || null,
          location: editLocation.trim() || null,
          profile_image_url: imageUrl,
        })
        .eq("user_id", viewerUserId);

      if (error) {
        console.error("[EDIT_PROFILE] Save error:", error);
      } else {
        setStats((prev) => prev ? {
          ...prev,
          display_name: editDisplayName.trim() || prev.display_name,
          bio: editBio.trim() || null,
          location: editLocation.trim() || null,
          profile_image_url: imageUrl,
        } : prev);
        setShowEditModal(false);
      }
    } catch (err) {
      console.error("[EDIT_PROFILE] Error:", err);
    } finally {
      setSaving(false);
      setUploadingImage(false);
    }
  }

  function formatActionDate(date: Date): string {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  }

  function getActionColorClass(actionType: string): string {
    switch (actionType) {
      case "chapter_completed":  return "bg-green-50 border-l-4 border-green-500";
      case "book_completed":     return "bg-green-100 border-l-4 border-green-600";
      case "note_created":       return "bg-yellow-50 border-l-4 border-yellow-500";
      case "person_learned":     return "bg-pink-50 border-l-4 border-pink-500";
      case "place_discovered":   return "bg-cyan-50 border-l-4 border-cyan-500";
      case "keyword_mastered":   return "bg-purple-50 border-l-4 border-purple-500";
      case "user_login":         return "bg-blue-50 border-l-4 border-blue-500";
      default:                   return "bg-gray-50 border-l-4 border-gray-400";
    }
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-12">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center py-12 text-gray-500">Loading profile...</div>
        </div>
      </div>
    );
  }

  // ── Not found ─────────────────────────────────────────────────────────────
  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 pb-12">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800 font-medium">Profile</span>
          </nav>
          <div className="bg-white border border-gray-200 rounded-xl p-12 shadow-sm text-center">
            <p className="text-4xl mb-4">🔍</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile not found</h1>
            <p className="text-gray-500">This user doesn't exist or their profile isn't available.</p>
            <Link href="/dashboard" className="inline-block mt-6 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Derived display values ────────────────────────────────────────────────
  const displayStats = stats || { total_actions: 0, chapters_completed_count: 0, notes_created_count: 0, people_learned_count: 0, places_discovered_count: 0, keywords_mastered_count: 0, trivia_questions_answered: 0, last_active_date: null, current_streak: 0 };
  const displayStreak = streak || { currentStreak: 0, last7Days: [] };
  const displayName = stats?.display_name || stats?.username || "Bible Buddy Member";
  const username = stats?.username || null;
  const isOwner = viewerUserId === profileUserId;
  const canAssignBadges = viewerEmail === "moorelouis3@gmail.com";
  const initials = displayName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
  const color = avatarColor(profileUserId);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
          <span className="mx-2">›</span>
          <Link href="/profile" className="hover:text-gray-700 transition">Profile</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">{displayName}</span>
        </nav>

        {/* ── PROFILE HEADER ─────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-start gap-5">

            {/* Avatar */}
            <div className="flex-shrink-0">
              {stats?.profile_image_url ? (
                <img
                  src={stats.profile_image_url}
                  alt={displayName}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: color }}
                >
                  {initials}
                </div>
              )}
            </div>

            {/* Name + username + bio + meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">{displayName}</h1>
                    <UserBadge customBadge={stats?.member_badge} isPaid={stats?.is_paid} />
                  </div>
                  {username && (
                    <p className="text-sm text-gray-500 mt-0.5">@{username}</p>
                  )}
                </div>

                {/* Action buttons — owner: Edit Profile; visitor: buddy button */}
                {isOwner ? (
                  <button
                    onClick={openEditModal}
                    className="flex-shrink-0 px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Edit Profile
                  </button>
                ) : viewerUserId ? (
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    {buddyState === "none" && (
                      <button
                        onClick={handleAddBuddy}
                        disabled={buddyActionLoading}
                        className="px-4 py-1.5 rounded-lg text-sm font-medium text-white transition disabled:opacity-60"
                        style={{ backgroundColor: "#4a9b6f" }}
                      >
                        Add Buddy
                      </button>
                    )}
                    {buddyState === "pending_sent" && (
                      <>
                        <span className="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-500 bg-gray-100 border border-gray-200">
                          Request Sent
                        </span>
                        <button
                          onClick={handleCancelRequest}
                          disabled={buddyActionLoading}
                          className="text-xs text-red-500 hover:underline disabled:opacity-60"
                        >
                          Cancel Request
                        </button>
                      </>
                    )}
                    {buddyState === "pending_received" && (
                      <div className="flex gap-2">
                        <button
                          onClick={handleAcceptRequest}
                          disabled={buddyActionLoading}
                          className="px-4 py-1.5 rounded-lg text-sm font-medium text-white transition disabled:opacity-60"
                          style={{ backgroundColor: "#4a9b6f" }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={handleDeclineRequest}
                          disabled={buddyActionLoading}
                          className="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-600 bg-gray-100 border border-gray-200 hover:bg-gray-200 transition disabled:opacity-60"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                    {buddyState === "buddies" && (
                      <>
                        {conversationId ? (
                          <button
                            onClick={() => router.push(`/messages/${conversationId}`)}
                            className="px-4 py-1.5 rounded-lg text-sm font-medium text-white transition"
                            style={{ backgroundColor: "#4a9b6f" }}
                          >
                            Message
                          </button>
                        ) : (
                          <button
                            onClick={() => router.push("/messages")}
                            className="px-4 py-1.5 rounded-lg text-sm font-medium text-white transition"
                            style={{ backgroundColor: "#4a9b6f" }}
                          >
                            Message
                          </button>
                        )}
                        <button
                          onClick={() => setShowRemoveBuddyConfirm(true)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Remove Buddy
                        </button>
                      </>
                    )}
                  </div>
                ) : null}
              </div>

              {/* Bio */}
              {stats?.bio && (
                <p className="text-sm text-gray-500 italic mt-2 line-clamp-2">{stats.bio}</p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
                {stats?.location && (
                  <span>📍 {stats.location}</span>
                )}
                <span>🕐 {formatLastActive(stats?.last_active_at || stats?.last_active_date)}</span>
                {stats?.created_at && (
                  <span>📅 Joined {formatJoined(stats.created_at)}</span>
                )}
                <button
                  onClick={() => {
                    setBuddiesPage(1);
                    loadBuddiesPage(1);
                    setShowBuddiesModal(true);
                  }}
                  className="hover:text-gray-700 transition font-medium"
                >
                  🤝 {buddyCount} {buddyCount === 1 ? "Buddy" : "Buddies"}
                </button>
              </div>

              {canAssignBadges && (
                <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">Buddy Badge</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Pro Buddy is automatic for paid buddies. A custom badge overrides it.
                      </p>
                      <select
                        value={badgeDraft}
                        onChange={(e) => setBadgeDraft(e.target.value)}
                        className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none"
                      >
                        {CUSTOM_MEMBER_BADGE_OPTIONS.map((option) => (
                          <option key={option.value || "none"} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={handleSaveMemberBadge}
                      disabled={savingBadge}
                      className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-60"
                      style={{ backgroundColor: "#4a9b6f" }}
                    >
                      {savingBadge ? "Saving..." : "Save Badge"}
                    </button>
                  </div>
                  {badgeSaveMessage && (
                    <p className="mt-2 text-xs text-gray-500">{badgeSaveMessage}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── DAILY STREAK ───────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-1">{displayStreak.currentStreak} day streak</h2>
            <p className="text-sm text-gray-600">
              {displayStreak.currentStreak === 0 ? "No active streak" : "Active streak"}
            </p>
          </div>
          {displayStreak.last7Days.length > 0 ? (
            <div className="flex items-center gap-3">
              {displayStreak.last7Days.map((dayItem, index) => (
                <div key={dayItem.date} className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-2">{getDayAbbr(dayItem.date)}</div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    dayItem.completed ? "bg-green-500 text-white"
                    : index === displayStreak.last7Days.length - 1 ? "bg-blue-100 text-blue-600 border-2 border-blue-300"
                    : "bg-gray-200 text-gray-400"
                  }`}>
                    {dayItem.completed ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : index === displayStreak.last7Days.length - 1 ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 text-center py-2">No streak data available</div>
          )}
        </div>

        {/* ── STATS ROW 1 ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.total_actions}</div>
            <div className="text-sm text-gray-700">Total Actions</div>
          </div>
          <div className="bg-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{booksCompleted}</div>
            <div className="text-sm text-gray-700">Books Completed</div>
          </div>
          <div className="bg-green-100 border border-green-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.chapters_completed_count}</div>
            <div className="text-sm text-gray-700">Chapters Read</div>
          </div>
          <div className="bg-orange-100 border border-orange-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{bibleCompletion}%</div>
            <div className="text-sm text-gray-700">Bible Completion</div>
          </div>
        </div>

        {/* ── STATS ROW 2 ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-yellow-100 border border-yellow-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.notes_created_count}</div>
            <div className="text-sm text-gray-700">Notes Created</div>
          </div>
          <div className="bg-pink-100 border border-pink-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.people_learned_count}</div>
            <div className="text-sm text-gray-700">People Learned</div>
          </div>
          <div className="bg-cyan-100 border border-cyan-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.places_discovered_count}</div>
            <div className="text-sm text-gray-700">Places Found</div>
          </div>
          <div className="bg-indigo-100 border border-indigo-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.keywords_mastered_count}</div>
            <div className="text-sm text-gray-700">Keywords</div>
          </div>
          <div className="bg-teal-100 border border-teal-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-bold mb-1">{displayStats.trivia_questions_answered}</div>
            <div className="text-sm text-gray-700">Trivia Q&A</div>
          </div>
        </div>

        {/* ── STUDY GROUPS ───────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Study Groups</h2>
          {userGroups.length === 0 ? (
            <p className="text-sm text-gray-400">Not in any groups yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {userGroups.map((group) => (
                <Link key={group.id} href={`/study-groups/${group.id}`}>
                  <div
                    className="flex items-center gap-3 p-3 rounded-xl hover:opacity-80 transition cursor-pointer"
                    style={{ backgroundColor: group.cover_color ? group.cover_color + "55" : "#f3f4f6" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                      style={{ backgroundColor: group.cover_color || "#d4ecd4" }}
                    >
                      {group.cover_emoji || "🤝"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{group.name}</p>
                      <p className="text-xs text-gray-500">{group.member_count} member{group.member_count === 1 ? "" : "s"}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── RECENT POSTS ───────────────────────────────────────────────── */}
        {false && recentPosts.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
              <Link href="/bb-feed" className="text-xs text-green-600 hover:underline font-medium">View Feed →</Link>
            </div>
            <div className="flex flex-col gap-2">
              {recentPosts.map((post) => {
                const POST_TYPE_ICONS: Record<string, string> = {
                  thought: "💭", verse: "📖", prayer: "🙏", photo: "📷", link: "🔗",
                };
                const icon = POST_TYPE_ICONS[post.post_type] || "💬";
                const preview = post.verse_ref
                  ? `${post.verse_ref} — ${post.content.slice(0, 60)}`
                  : post.content.slice(0, 80);
                const diffMs = Date.now() - new Date(post.created_at).getTime();
                const diffDays = Math.floor(diffMs / 86400000);
                const timeStr = diffDays === 0 ? "Today" : diffDays === 1 ? "Yesterday" : `${diffDays}d ago`;
                return (
                  <div key={post.id} className="flex items-start gap-3 px-3 py-2.5 rounded-xl bg-gray-50">
                    <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 leading-snug truncate">
                        {preview}{post.content.length > 80 ? "…" : ""}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-400">{timeStr}</span>
                        {post.visibility === "buddies" && (
                          <span className="text-[10px] text-blue-400 bg-blue-50 rounded-full px-1.5 py-px">Buddies only</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ACTION LOG ─────────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold">Action Log</h2>
          </div>
          {actionLog.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 px-6">No actions recorded yet.</p>
          ) : (
            <div className="overflow-y-auto max-h-96">
              {actionLog.map((action, index) => (
                <div
                  key={index}
                  className={`${getActionColorClass(action.actionType)} px-6 py-3 text-sm text-gray-700 ${
                    index < actionLog.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  {action.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── EDIT PROFILE MODAL ─────────────────────────────────────────── */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">

              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Edit Profile</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="px-6 py-5 space-y-5">

                {/* Profile picture */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    {editImagePreview ? (
                      <img src={editImagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                    ) : (
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                        style={{ backgroundColor: color }}
                      >
                        {initials}
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 w-7 h-7 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-400">Tap the camera to change your photo</p>
                </div>

                {/* Display name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={editDisplayName}
                    onChange={(e) => setEditDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value.slice(0, 160))}
                    placeholder="A short bio about yourself..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                  />
                  <p className={`text-xs mt-1 text-right ${editBio.length >= 150 ? "text-orange-500" : "text-gray-400"}`}>
                    {editBio.length} / 160
                  </p>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="City, Country"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition disabled:opacity-60"
                    style={{ backgroundColor: "#4a9b6f" }}
                  >
                    {uploadingImage ? "Uploading..." : saving ? "Saving..." : "Save"}
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ── BUDDIES LIST MODAL ─────────────────────────────────────────── */}
        {showBuddiesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-md max-h-[80vh] flex flex-col">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
                <h2 className="text-lg font-bold text-gray-900">
                  {isOwner ? "Your Buddies" : `${displayName}'s Buddies`}
                  {buddyCount > 0 && <span className="ml-2 text-sm font-normal text-gray-400">({buddyCount.toLocaleString()})</span>}
                </h2>
                <button
                  onClick={() => { setShowBuddiesModal(false); setBuddiesSearch(""); setBuddiesPage(1); }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 text-xl"
                >
                  ×
                </button>
              </div>

              {/* Search */}
              <div className="px-4 pt-3 pb-2 flex-shrink-0">
                <input
                  type="text"
                  value={buddiesSearch}
                  onChange={(e) => setBuddiesSearch(e.target.value)}
                  placeholder="Search buddies..."
                  className="w-full px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>

              {/* List */}
              <div className="overflow-y-auto flex-1 px-4 pb-2">
                {buddiesLoadingPage ? (
                  <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
                ) : buddiesList.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-8">No buddies yet.</p>
                ) : (() => {
                  const q = buddiesSearch.toLowerCase();
                  const filtered = buddiesSearch
                    ? buddiesList.filter((b) => (b.display_name || b.username || "").toLowerCase().includes(q))
                    : buddiesList;
                  if (filtered.length === 0) return <p className="text-sm text-gray-400 text-center py-8">No results for "{buddiesSearch}".</p>;
                  return (
                    <div className="divide-y divide-gray-100">
                      {filtered.map((buddy) => {
                        const buddyDisplay = buddy.display_name || buddy.username || "Member";
                        const buddyInitials = buddyDisplay.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
                        return (
                          <div key={buddy.user_id} className="flex items-center gap-3 py-3">
                            {buddy.profile_image_url ? (
                              <img src={buddy.profile_image_url} alt={buddyDisplay} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                            ) : (
                              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: avatarColor(buddy.user_id) }}>
                                {buddyInitials}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-semibold text-gray-900 text-sm truncate">{buddyDisplay}</p>
                                <UserBadge customBadge={buddy.member_badge} isPaid={buddy.is_paid} />
                              </div>
                              {buddy.username && <p className="text-xs text-gray-500">@{buddy.username}</p>}
                            </div>
                            <Link
                              href={`/profile/${buddy.user_id}`}
                              onClick={() => { setShowBuddiesModal(false); setBuddiesSearch(""); setBuddiesPage(1); }}
                              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition flex-shrink-0"
                            >
                              View Profile
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Pagination */}
              {!buddiesSearch && buddyCount > BUDDIES_PAGE_SIZE && (() => {
                const totalPages = Math.ceil(buddyCount / BUDDIES_PAGE_SIZE);
                // Show up to 7 page buttons with ellipsis
                const getPages = () => {
                  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
                  const pages: (number | "...")[] = [];
                  pages.push(1);
                  if (buddiesPage > 3) pages.push("...");
                  for (let p = Math.max(2, buddiesPage - 1); p <= Math.min(totalPages - 1, buddiesPage + 1); p++) pages.push(p);
                  if (buddiesPage < totalPages - 2) pages.push("...");
                  pages.push(totalPages);
                  return pages;
                };
                return (
                  <div className="flex items-center justify-center gap-1 px-4 py-3 border-t border-gray-100 flex-shrink-0 flex-wrap">
                    <button
                      onClick={() => { const p = buddiesPage - 1; setBuddiesPage(p); loadBuddiesPage(p); }}
                      disabled={buddiesPage === 1 || buddiesLoadingPage}
                      className="px-2 py-1 text-sm rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition"
                    >‹</button>
                    {getPages().map((p, i) =>
                      p === "..." ? (
                        <span key={`ellipsis-${i}`} className="px-1 text-gray-400 text-sm">…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => { setBuddiesPage(p as number); loadBuddiesPage(p as number); }}
                          disabled={buddiesLoadingPage}
                          className={`w-8 h-8 text-sm rounded-lg font-medium transition ${buddiesPage === p ? "text-white" : "text-gray-600 hover:bg-gray-100"}`}
                          style={buddiesPage === p ? { backgroundColor: "#4a9b6f" } : {}}
                        >{p}</button>
                      )
                    )}
                    <button
                      onClick={() => { const p = buddiesPage + 1; setBuddiesPage(p); loadBuddiesPage(p); }}
                      disabled={buddiesPage === totalPages || buddiesLoadingPage}
                      className="px-2 py-1 text-sm rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition"
                    >›</button>
                  </div>
                );
              })()}

            </div>
          </div>
        )}

        {/* ── REMOVE BUDDY CONFIRM ───────────────────────────────────────── */}
        {showRemoveBuddyConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Remove Buddy?</h2>
              <p className="text-sm text-gray-500 mb-5">
                Are you sure you want to remove {displayName} as a buddy? You can always add them again later.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRemoveBuddyConfirm(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemoveBuddy}
                  disabled={buddyActionLoading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition disabled:opacity-60"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
