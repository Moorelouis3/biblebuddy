"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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

export default function PublicProfilePage() {
  const params = useParams();
  const profileUserId = params.userId as string;

  const [viewerUserId, setViewerUserId] = useState<string | null>(null);
  const [stats, setStats] = useState<ProfileStats & { created_at?: string } | null>(null);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [booksCompleted, setBooksCompleted] = useState(0);
  const [bibleCompletion, setBibleCompletion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [actionLog, setActionLog] = useState<Array<{ date: string; text: string; sortKey: number; actionType: string }>>([]);
  const [isActionLogOpen, setIsActionLogOpen] = useState(false);
  const [visibleLogCount, setVisibleLogCount] = useState(20);
  const [userGroups, setUserGroups] = useState<Array<{ id: string; name: string; cover_emoji: string | null; cover_color: string | null; member_count: number }>>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

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
        if (user.id === profileUserId) {
          if (shouldSyncNotesCount(user.id)) await syncNotesCount(user.id);
          if (shouldSyncChaptersCount(user.id)) await syncChaptersCount(user.id);
          if (shouldSyncTriviaQuestionsCount(user.id)) await syncTriviaQuestionsCount(user.id);
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
    } catch (err) {
      console.error("[PUBLIC_PROFILE] Error:", err);
    } finally {
      setLoading(false);
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

      // Upload new image if selected
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
        // Reflect changes locally without a full reload
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
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">{displayName}</h1>
                  {username && (
                    <p className="text-sm text-gray-500 mt-0.5">@{username}</p>
                  )}
                </div>
                {/* Edit Profile button — owner only */}
                {isOwner && (
                  <button
                    onClick={openEditModal}
                    className="flex-shrink-0 px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Edit Profile
                  </button>
                )}
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
              </div>
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

        {/* ── ACTION LOG ─────────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <button
            type="button"
            onClick={() => setIsActionLogOpen(!isActionLogOpen)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-150"
          >
            <h2 className="text-xl font-semibold">Action Log</h2>
            <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isActionLogOpen ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isActionLogOpen && (
            <div className="pb-2">
              {actionLog.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 px-6">No actions recorded yet.</p>
              ) : (
                <>
                  {actionLog.slice(0, visibleLogCount).map((action, index) => (
                    <div
                      key={index}
                      className={`${getActionColorClass(action.actionType)} px-6 py-3 text-sm text-gray-700 ${
                        index < Math.min(visibleLogCount, actionLog.length) - 1 ? "border-b border-gray-100" : ""
                      }`}
                    >
                      {action.text}
                    </div>
                  ))}
                  {visibleLogCount < actionLog.length && (
                    <div className="px-6 py-4 border-t border-gray-100">
                      <button
                        onClick={() => setVisibleLogCount((n) => n + 20)}
                        className="text-sm text-gray-500 hover:text-gray-800 font-medium transition"
                      >
                        Show more ({actionLog.length - visibleLogCount} remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* ── EDIT PROFILE MODAL ─────────────────────────────────────────── */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-0 sm:px-4">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto">

              {/* Modal header */}
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

      </div>
    </div>
  );
}
