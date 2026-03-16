"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../lib/supabaseClient";
import { HUB_CONTENT, type HubItemStatic } from "@/lib/hubContent";
import { logActionToMasterActions } from "@/lib/actionRecorder";
import { TOTAL_WEEKS, getSeriesWeekLesson } from "@/lib/seriesContent";

// ── Interfaces ───────────────────────────────────────────────────────────────

interface StudyGroup {
  id: string;
  name: string;
  leader_user_id: string | null;
  leader_name?: string | null;
  description?: string | null;
  member_count?: number;
  current_weekly_study?: string | null;
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
  comment_count?: number;
  is_pinned: boolean;
  created_at: string;
  parent_post_id?: string | null;
  role?: string;
  liked?: boolean;
  profile_image_url?: string | null;
  media_url?: string | null;
  link_url?: string | null;
}

interface GroupFeedComment {
  id: string;
  user_id: string;
  display_name: string | null;
  category: string;
  content: string;
  like_count: number;
  created_at: string;
  parent_post_id: string | null;
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

interface CurrentSeriesPreview {
  id: string;
  title: string;
  description: string | null;
  total_weeks: number;
  current_week: number;
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

function getWeekUnlockDate(startDate: string, weekNum: number): string {
  const d = new Date(startDate);
  d.setDate(d.getDate() + (weekNum - 1) * 7);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function resolveSeriesStart(schedule: { start_at?: string | null; start_date?: string | null } | null | undefined): string | null {
  if (!schedule) return null;
  if (schedule.start_at) return schedule.start_at;
  if (schedule.start_date) return `${schedule.start_date}T00:00:00`;
  return null;
}

function formatDateTimeLabel(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function toDateTimeLocalValue(dateStr: string): string {
  const date = new Date(dateStr);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function getWeekLockState(
  startDate: string | null,
  weekNum: number,
  isLeader: boolean,
  previousWeekComplete: boolean
): { unlocked: boolean; lockedMessage: string } {
  if (isLeader) return { unlocked: true, lockedMessage: "" };
  if (!startDate) return { unlocked: false, lockedMessage: "Start date not set yet" };

  const unlockAt = new Date(startDate);
  unlockAt.setDate(unlockAt.getDate() + (weekNum - 1) * 7);
  if (new Date() < unlockAt) {
    return { unlocked: false, lockedMessage: `Unlocks ${getWeekUnlockDate(startDate, weekNum)}` };
  }

  if (weekNum > 1 && !previousWeekComplete) {
    return { unlocked: false, lockedMessage: `Finish Week ${weekNum - 1} first` };
  }

  return { unlocked: true, lockedMessage: "" };
}

function getWeekUnlockTimestamp(startDate: string, weekNum: number): number {
  const d = new Date(startDate);
  d.setDate(d.getDate() + (weekNum - 1) * 7);
  return d.getTime();
}

function formatCountdown(targetTs: number, nowTs: number): string {
  const diff = Math.max(0, targetTs - nowTs);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

function getCurrentSeriesCardState(
  startAt: string | null,
  totalWeeks: number,
  nowTs: number
): { headline: string; detail: string; cta: string } {
  if (!startAt) {
    return {
      headline: "Bible study schedule coming soon",
      detail: "The leader has not set the first release date yet.",
      cta: "Open Series",
    };
  }

  const startTs = new Date(startAt).getTime();
  if (nowTs < startTs) {
    return {
      headline: `Series starts in ${formatCountdown(startTs, nowTs)}`,
      detail: formatDateTimeLabel(startAt),
      cta: "Open Series",
    };
  }

  const weeksSinceStart = Math.floor((nowTs - startTs) / (7 * 24 * 60 * 60 * 1000));
  const liveWeek = Math.min(totalWeeks, weeksSinceStart + 1);
  if (liveWeek < totalWeeks) {
    const nextUnlockTs = startTs + liveWeek * 7 * 24 * 60 * 60 * 1000;
    return {
      headline: `Week ${liveWeek + 1} unlocks in ${formatCountdown(nextUnlockTs, nowTs)}`,
      detail: `Week ${liveWeek} is live now`,
      cta: "Open Week Lessons",
    };
  }

  return {
    headline: "All weeks are now live",
    detail: "The full series is available now.",
    cta: "Open Week Lessons",
  };
}


// ── Video URL parsing ─────────────────────────────────────────────────────────

type VideoPlatform = "youtube" | "youtube_short" | "tiktok" | "instagram" | "unknown";
function parseVideoEmbed(url: string): { platform: VideoPlatform; embedUrl: string | null; portrait: boolean } {
  const ytWatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
  if (ytWatch) return { platform: "youtube", embedUrl: `https://www.youtube.com/embed/${ytWatch[1]}?rel=0`, portrait: false };
  const ytBe = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (ytBe) return { platform: "youtube", embedUrl: `https://www.youtube.com/embed/${ytBe[1]}?rel=0`, portrait: false };
  const ytShort = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (ytShort) return { platform: "youtube_short", embedUrl: `https://www.youtube.com/embed/${ytShort[1]}?rel=0`, portrait: true };
  const igReel = url.match(/instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/);
  if (igReel) return { platform: "instagram", embedUrl: `https://www.instagram.com/reel/${igReel[1]}/embed/`, portrait: true };
  const ttVideo = url.match(/tiktok\.com\/@[^/?]+\/video\/(\d+)/);
  if (ttVideo) return { platform: "tiktok", embedUrl: `https://www.tiktok.com/embed/v2/${ttVideo[1]}`, portrait: true };
  if (url.includes("tiktok.com")) return { platform: "tiktok", embedUrl: null, portrait: true };
  return { platform: "unknown", embedUrl: null, portrait: false };
}
const VIDEO_META: Record<VideoPlatform, { icon: string; label: string }> = {
  youtube:       { icon: "▶️", label: "YouTube" },
  youtube_short: { icon: "▶️", label: "YouTube Shorts" },
  tiktok:        { icon: "🎵", label: "TikTok" },
  instagram:     { icon: "📸", label: "Instagram Reel" },
  unknown:       { icon: "🎬", label: "Video" },
};

function isUploadedVideo(url: string): boolean {
  const lower = url.toLowerCase().split("?")[0];
  return lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.endsWith(".mov");
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

function getGroupPostCategory(activeTab: string): string {
  return activeTab === "home" ? "general" : activeTab;
}

function GroupCommentSection({
  groupId,
  post,
  userId,
  displayName,
  userProfileImage,
  onCountChange,
}: {
  groupId: string;
  post: Post;
  userId: string;
  displayName: string;
  userProfileImage: string | null;
  onCountChange: (delta: number) => void;
}) {
  const [comments, setComments] = useState<GroupFeedComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [likeLoading, setLikeLoading] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadComments() {
      setLoading(true);
      const { data: topLevelRows } = await supabase
        .from("group_posts")
        .select("id, user_id, display_name, category, content, like_count, created_at, parent_post_id")
        .eq("group_id", groupId)
        .eq("parent_post_id", post.id)
        .order("created_at", { ascending: true });

      const topLevel = topLevelRows || [];
      const topLevelIds = topLevel.map((row) => row.id);

      let replyRows: GroupFeedComment[] = [];
      if (topLevelIds.length > 0) {
        const { data } = await supabase
          .from("group_posts")
          .select("id, user_id, display_name, category, content, like_count, created_at, parent_post_id")
          .in("parent_post_id", topLevelIds)
          .order("created_at", { ascending: true });
        replyRows = (data || []) as GroupFeedComment[];
      }

      const allRows = [...topLevel, ...replyRows] as GroupFeedComment[];
      if (allRows.length === 0) {
        setComments([]);
        setLoading(false);
        return;
      }

      const userIds = [...new Set(allRows.map((row) => row.user_id))];
      const [{ data: profiles }, { data: likes }] = await Promise.all([
        supabase
          .from("profile_stats")
          .select("user_id, profile_image_url")
          .in("user_id", userIds),
        supabase
          .from("group_post_likes")
          .select("post_id")
          .eq("user_id", userId)
          .in("post_id", allRows.map((row) => row.id)),
      ]);

      const imageMap: Record<string, string | null> = {};
      (profiles || []).forEach((profile) => {
        imageMap[profile.user_id] = profile.profile_image_url ?? null;
      });
      const likedSet = new Set((likes || []).map((like) => like.post_id));

      setComments(
        allRows.map((row) => ({
          ...row,
          liked: likedSet.has(row.id),
          profile_image_url: imageMap[row.user_id] ?? null,
        }))
      );
      setLoading(false);
    }

    void loadComments();
  }, [groupId, post.id, userId]);

  async function toggleCommentLike(comment: GroupFeedComment) {
    if (likeLoading.has(comment.id)) return;
    setLikeLoading((prev) => new Set(prev).add(comment.id));
    if (comment.liked) {
      await supabase.from("group_post_likes").delete().eq("post_id", comment.id).eq("user_id", userId);
      await supabase.from("group_posts").update({ like_count: Math.max(0, comment.like_count - 1) }).eq("id", comment.id);
      setComments((prev) => prev.map((item) => item.id === comment.id ? { ...item, like_count: Math.max(0, item.like_count - 1), liked: false } : item));
    } else {
      await supabase.from("group_post_likes").insert({ post_id: comment.id, user_id: userId });
      await supabase.from("group_posts").update({ like_count: comment.like_count + 1 }).eq("id", comment.id);
      setComments((prev) => prev.map((item) => item.id === comment.id ? { ...item, like_count: item.like_count + 1, liked: true } : item));
    }
    setLikeLoading((prev) => {
      const next = new Set(prev);
      next.delete(comment.id);
      return next;
    });
  }

  async function submitComment(content: string, parentId: string | null) {
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from("group_posts")
      .insert({
        group_id: groupId,
        user_id: userId,
        display_name: displayName,
        category: post.category,
        content: content.trim(),
        parent_post_id: parentId ?? post.id,
      })
      .select("id, user_id, display_name, category, content, like_count, created_at, parent_post_id")
      .single();

    if (!error && data) {
      setComments((prev) => [
        ...prev,
        {
          ...(data as GroupFeedComment),
          liked: false,
          profile_image_url: userProfileImage,
        },
      ]);
      onCountChange(1);
      void logActionToMasterActions(userId, "group_message_sent", `group-post:${post.id}`);
    }

    setNewComment("");
    setReplyText("");
    setReplyingTo(null);
    setSubmitting(false);
  }

  const topLevelComments = comments.filter((comment) => comment.parent_post_id === post.id);
  const replies = (parentId: string) => comments.filter((comment) => comment.parent_post_id === parentId);

  function CommentRow({ comment, indent = false }: { comment: GroupFeedComment; indent?: boolean }) {
    const name = comment.display_name || "Member";
    return (
      <div className={`flex gap-2 ${indent ? "ml-8 mt-2" : "mt-2"}`}>
        <Link href={`/profile/${comment.user_id}`} className="flex-shrink-0 mt-0.5">
          {comment.profile_image_url ? (
            <img src={comment.profile_image_url} alt={name} className="w-7 h-7 rounded-full object-cover" />
          ) : (
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: avatarColor(comment.user_id) }}>
              {getInitial(name)}
            </div>
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <div className="rounded-2xl bg-[#faf7f2] border border-[#efe5d9] px-3 py-2">
            <Link href={`/profile/${comment.user_id}`} className="text-xs font-semibold text-gray-800 hover:underline">
              {name}
            </Link>
            <p className="text-xs text-gray-700 mt-0.5 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
          </div>
          <div className="flex items-center gap-3 mt-1 px-1">
            <span className="text-[10px] text-gray-400">{timeAgo(comment.created_at)}</span>
            <button
              onClick={() => void toggleCommentLike(comment)}
              disabled={likeLoading.has(comment.id)}
              className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-red-500 transition"
            >
              <svg className="w-3 h-3" fill={comment.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {comment.like_count > 0 ? comment.like_count : ""}
            </button>
            {!indent && (
              <button
                onClick={() => {
                  setReplyingTo(replyingTo === comment.id ? null : comment.id);
                  setReplyText("");
                }}
                className="text-[10px] text-gray-400 hover:text-[#b7794d] font-semibold transition"
              >
                Reply
              </button>
            )}
          </div>
          {!indent && replyingTo === comment.id && (
            <div className="mt-2 flex gap-2 items-end">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${name}...`}
                rows={1}
                className="flex-1 text-xs px-3 py-2 border border-[#eadfce] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#d6b18b] bg-white"
              />
              <button
                onClick={() => void submitComment(replyText, comment.id)}
                disabled={!replyText.trim() || submitting}
                className="text-xs font-semibold text-white px-3 py-2 rounded-xl transition disabled:opacity-40 flex-shrink-0"
                style={{ backgroundColor: "#b7794d" }}
              >
                Reply
              </button>
            </div>
          )}
          {!indent && replies(comment.id).map((reply) => (
            <CommentRow key={reply.id} comment={reply} indent />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-[#efe5d9]">
      {loading ? (
        <p className="text-xs text-gray-400 text-center py-2">Loading comments...</p>
      ) : topLevelComments.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-2">No comments yet. Start the conversation.</p>
      ) : (
        <div>
          {topLevelComments.map((comment) => (
            <CommentRow key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      <div className="flex gap-2 items-end mt-3">
        {userProfileImage ? (
          <img src={userProfileImage} alt={displayName} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ backgroundColor: avatarColor(userId) }}>
            {getInitial(displayName)}
          </div>
        )}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={1}
          className="flex-1 text-xs px-3 py-2 border border-[#eadfce] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#d6b18b] bg-white"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void submitComment(newComment, null);
            }
          }}
        />
        <button
          onClick={() => void submitComment(newComment, null)}
          disabled={!newComment.trim() || submitting}
          className="text-xs font-semibold text-white px-3 py-2 rounded-xl transition disabled:opacity-40 flex-shrink-0"
          style={{ backgroundColor: "#b7794d" }}
        >
          Post
        </button>
      </div>
    </div>
  );
}

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
  const [showGroupInfoModal, setShowGroupInfoModal] = useState(false);

  // Chat posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [likeLoading, setLikeLoading] = useState<Set<string>>(new Set());
  const [openCommentPostIds, setOpenCommentPostIds] = useState<Set<string>>(new Set());
  const [activePostMenuId, setActivePostMenuId] = useState<string | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [deletingPost, setDeletingPost] = useState(false);

  // Lightbox
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  // Composer media state
  const [composerMode, setComposerMode] = useState<"text" | "photo" | "video">("text");
  const [composerPhotoFile, setComposerPhotoFile] = useState<File | null>(null);
  const [composerPhotoPreview, setComposerPhotoPreview] = useState<string | null>(null);
  const [composerVideoFile, setComposerVideoFile] = useState<File | null>(null);
  const [composerVideoPreview, setComposerVideoPreview] = useState<string | null>(null);
  const [composerVideoDurationError, setComposerVideoDurationError] = useState(false);
  const [composerUploadError, setComposerUploadError] = useState<string | null>(null);
  const groupPhotoInputRef = useRef<HTMLInputElement>(null);
  const groupVideoInputRef = useRef<HTMLInputElement>(null);

  // Hub categories (loaded from DB)
  const [hubCategories, setHubCategories] = useState<HubCategory[]>([]);
  const [hubView, setHubView] = useState<"articles" | "questions">("articles");
  const [showMoreNav, setShowMoreNav] = useState(false);
  const [selectedHubItem, setSelectedHubItem] = useState<HubItemStatic | null>(null);

  // Members
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [loadingMoreMembers, setLoadingMoreMembers] = useState(false);
  const [membersOffset, setMembersOffset] = useState(0);
  const [membersHasMore, setMembersHasMore] = useState(false);
  const [membersTotal, setMembersTotal] = useState<number | null>(null);
  const [membersSearch, setMembersSearch] = useState("");
  const MEMBERS_PAGE = 20;

  // Series list
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [loadingSeries, setLoadingSeries] = useState(false);

  // Series view
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [seriesPosts, setSeriesPosts] = useState<SeriesPost[]>([]);
  const [loadingSeriesPosts, setLoadingSeriesPosts] = useState(false);
  const [seriesStartDate, setSeriesStartDate] = useState<string | null>(null);
  const [seriesWeekProgress, setSeriesWeekProgress] = useState<Record<number, { reading: boolean; trivia: boolean; reflection: boolean }>>({});
  const [seriesStartDateInput, setSeriesStartDateInput] = useState("");
  const [savingSeriesStartDate, setSavingSeriesStartDate] = useState(false);
  const [nowTs, setNowTs] = useState(() => Date.now());
  const [currentSeriesPreview, setCurrentSeriesPreview] = useState<CurrentSeriesPreview | null>(null);
  const [currentSeriesStartAt, setCurrentSeriesStartAt] = useState<string | null>(null);
  const [editingSeriesStart, setEditingSeriesStart] = useState(false);
  const [showSeriesOverviewDetails, setShowSeriesOverviewDetails] = useState(true);

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
      if (!user) {
        router.push("/login");
        return;
      }

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

      setUserRole(membership?.status === "approved" ? membership.role : "member");

      const { data: groupData } = await supabase
        .from("study_groups")
        .select("id, name, leader_user_id, leader_name, description, member_count, current_weekly_study, cover_color, cover_emoji")
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

      const { data: currentSeriesData } = await supabase
        .from("group_series")
        .select("id, title, description, total_weeks, current_week")
        .eq("group_id", groupId)
        .eq("is_current", true)
        .maybeSingle();

      setCurrentSeriesPreview(currentSeriesData ?? null);

      if (currentSeriesData?.id) {
        const { data: scheduleData } = await supabase
          .from("series_schedules")
          .select("start_date, start_at")
          .eq("series_id", currentSeriesData.id)
          .maybeSingle();
        setCurrentSeriesStartAt(resolveSeriesStart(scheduleData));
      } else {
        setCurrentSeriesStartAt(null);
      }

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

  // ── Load series posts + schedule + progress when series is selected ─────
  useEffect(() => {
    if (!selectedSeries) return;
    loadSeriesPosts(selectedSeries.id);
    // Load start date
    supabase.from("series_schedules").select("start_date, start_at").eq("series_id", selectedSeries.id).maybeSingle()
      .then(({ data }) => {
        const resolvedStart = resolveSeriesStart(data);
        setSeriesStartDate(resolvedStart);
        setSeriesStartDateInput(resolvedStart ? toDateTimeLocalValue(resolvedStart) : "");
        setEditingSeriesStart(!resolvedStart);
      });
    // Load week progress for current user
    if (userId) {
      supabase.from("series_week_progress")
        .select("week_number, reading_completed, trivia_completed, reflection_posted")
        .eq("user_id", userId).eq("series_id", selectedSeries.id)
        .then(({ data }) => {
          const map: Record<number, { reading: boolean; trivia: boolean; reflection: boolean }> = {};
          (data || []).forEach((p) => { map[p.week_number] = { reading: p.reading_completed, trivia: p.trivia_completed, reflection: p.reflection_posted }; });
          setSeriesWeekProgress(map);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeries]);

  useEffect(() => {
    const id = window.setInterval(() => setNowTs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // ── Load comments when post is selected ─────────────────────────────────
  useEffect(() => {
    if (selectedPost) loadComments(selectedPost.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost]);

  // ── Chat posts ───────────────────────────────────────────────────────────
  async function loadPosts() {
    if (!group) return;
    setLoadingPosts(true);
    const postCategory = getGroupPostCategory(activeTab);

    const { data: postRows, error } = await supabase
      .from("group_posts")
      .select("id, user_id, display_name, category, content, like_count, is_pinned, created_at, parent_post_id, media_url, link_url")
      .eq("group_id", group.id)
      .eq("category", postCategory)
      .is("parent_post_id", null)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) { setLoadingPosts(false); return; }

    const rows = postRows || [];
    const rootCommentCountMap: Record<string, number> = {};
    rows.forEach((row) => {
      rootCommentCountMap[row.id] = 0;
    });

    if (rows.length > 0) {
      const rootIds = rows.map((row) => row.id);
      const { data: topLevelComments } = await supabase
        .from("group_posts")
        .select("id, parent_post_id")
        .in("parent_post_id", rootIds);

      const directComments = topLevelComments || [];
      const topLevelMap: Record<string, string> = {};

      directComments.forEach((comment) => {
        if (!comment.parent_post_id) return;
        topLevelMap[comment.id] = comment.parent_post_id;
        rootCommentCountMap[comment.parent_post_id] = (rootCommentCountMap[comment.parent_post_id] || 0) + 1;
      });

      if (directComments.length > 0) {
        const { data: replyRows } = await supabase
          .from("group_posts")
          .select("id, parent_post_id")
          .in("parent_post_id", directComments.map((comment) => comment.id));

        (replyRows || []).forEach((reply) => {
          const rootId = reply.parent_post_id ? topLevelMap[reply.parent_post_id] : null;
          if (rootId) {
            rootCommentCountMap[rootId] = (rootCommentCountMap[rootId] || 0) + 1;
          }
        });
      }
    }

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
    setPosts(rows.map((p) => ({
      ...p,
      comment_count: rootCommentCountMap[p.id] || 0,
      role: roleMap[p.user_id] || "member",
      liked: likedSet.has(p.id),
      profile_image_url: imageMap[p.user_id] ?? null,
    })));
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
    const hasContent = newPostContent.trim().length > 0;
    const hasPhoto = composerMode === "photo" && !!composerPhotoFile;
    const hasVideo = composerMode === "video" && !!composerVideoFile && !composerVideoDurationError;
    if (!hasContent && !hasPhoto && !hasVideo) return;
    if (!userId || !group || submitting) return;
    if (activeTab === "members" || activeTab === "bible_studies") return;
    setSubmitting(true);
    setComposerUploadError(null);

    let mediaUrl: string | null = null;
    let linkUrl: string | null = null;

    if (hasPhoto && composerPhotoFile) {
      const ext = composerPhotoFile.name.split(".").pop() ?? "jpg";
      const path = `${userId}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("post-media").upload(path, composerPhotoFile, { upsert: false });
      if (upErr) {
        setComposerUploadError("Photo upload failed. Please try again.");
        setSubmitting(false);
        return;
      }
      const { data: pub } = supabase.storage.from("post-media").getPublicUrl(path);
      mediaUrl = pub.publicUrl;
    }

    if (hasVideo && composerVideoFile) {
      const ext = composerVideoFile.name.split(".").pop() ?? "mp4";
      const path = `${userId}/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("post-media").upload(path, composerVideoFile, { upsert: false });
      if (uploadErr) {
        setComposerUploadError("Video upload failed. Please try again.");
        setSubmitting(false);
        return;
      }
      const { data: pub } = supabase.storage.from("post-media").getPublicUrl(path);
      mediaUrl = pub.publicUrl;
    }

    const { data: newPost, error } = await supabase
      .from("group_posts")
      .insert({
        group_id: group.id,
        user_id: userId,
        display_name: displayName,
        category: getGroupPostCategory(activeTab),
        content: newPostContent.trim(),
        media_url: mediaUrl,
        link_url: linkUrl,
      })
      .select("id, user_id, display_name, category, content, like_count, is_pinned, created_at, parent_post_id, media_url, link_url")
      .single();

    if (!error && newPost) {
      setPosts((prev) => [{ ...newPost, comment_count: 0, role: userRole, liked: false, profile_image_url: userProfileImage }, ...prev]);
      setNewPostContent("");
      setComposerPhotoFile(null); setComposerPhotoPreview(null);
      if (composerVideoPreview) URL.revokeObjectURL(composerVideoPreview);
      setComposerVideoFile(null); setComposerVideoPreview(null); setComposerVideoDurationError(false);
      setComposerMode("text"); setComposerUploadError(null);
      void logActionToMasterActions(userId, "group_message_sent", group?.name || "Group");
    }
    setSubmitting(false);
  }

  async function handleDeleteGroupPost() {
    if (!deletePostId || deletingPost) return;
    setDeletingPost(true);
    await supabase.from("group_posts").delete().eq("id", deletePostId);
    setPosts((prev) => prev.filter((post) => post.id !== deletePostId));
    setOpenCommentPostIds((prev) => {
      const next = new Set(prev);
      next.delete(deletePostId);
      return next;
    });
    setDeletePostId(null);
    setDeletingPost(false);
  }

  // ── Members ──────────────────────────────────────────────────────────────
  async function fetchMembersPage(offset: number): Promise<{ rows: Member[]; hasMore: boolean }> {
    if (!group) return { rows: [], hasMore: false };
    const { data: page } = await supabase
      .from("group_members")
      .select("user_id, role, display_name")
      .eq("group_id", group.id)
      .eq("status", "approved")
      .order("role", { ascending: true })
      .range(offset, offset + MEMBERS_PAGE - 1);

    if (!page || page.length === 0) return { rows: [], hasMore: false };

    const userIds = page.map((m) => m.user_id);
    const { data: profiles } = await supabase
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url")
      .in("user_id", userIds);
    const profileMap: Record<string, any> = {};
    (profiles || []).forEach((p) => { profileMap[p.user_id] = p; });

    const roleOrder: Record<string, number> = { leader: 0, moderator: 1, member: 2 };
    const rows: Member[] = page.map((m) => {
      const p = profileMap[m.user_id];
      return { user_id: m.user_id, display_name: p?.display_name || p?.username || m.display_name || "Member", role: m.role, profile_image_url: p?.profile_image_url ?? null };
    });
    rows.sort((a, b) => (roleOrder[a.role] ?? 2) - (roleOrder[b.role] ?? 2));
    return { rows, hasMore: page.length === MEMBERS_PAGE };
  }

  async function loadMembers() {
    if (!group) return;
    setLoadingMembers(true);
    setMembersOffset(0);
    const [{ rows, hasMore }, { count }] = await Promise.all([
      fetchMembersPage(0),
      supabase
        .from("group_members")
        .select("user_id", { count: "exact", head: true })
        .eq("group_id", group.id)
        .eq("status", "approved"),
    ]);
    setMembers(rows);
    setMembersOffset(MEMBERS_PAGE);
    setMembersHasMore(hasMore);
    setMembersTotal(count ?? null);
    setLoadingMembers(false);
  }

  async function loadMoreMembers() {
    setLoadingMoreMembers(true);
    const { rows, hasMore } = await fetchMembersPage(membersOffset);
    setMembers((prev) => [...prev, ...rows]);
    setMembersOffset((prev) => prev + MEMBERS_PAGE);
    setMembersHasMore(hasMore);
    setLoadingMoreMembers(false);
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
    const rows = data || [];
    setSeriesList(rows);
    const currentSeries = rows.find((series) => series.is_current) ?? rows[0] ?? null;
    setSelectedSeries(currentSeries);
    setCurrentSeriesPreview(currentSeries ? {
      id: currentSeries.id,
      title: currentSeries.title,
      description: currentSeries.description,
      total_weeks: currentSeries.total_weeks,
      current_week: currentSeries.current_week,
    } : null);
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

  async function handleSaveSeriesStartDate() {
    if (!selectedSeries || !group || !userId || !seriesStartDateInput) return;
    setSavingSeriesStartDate(true);
    const startAtIso = new Date(seriesStartDateInput).toISOString();
    await supabase.from("series_schedules").upsert(
      {
        series_id: selectedSeries.id,
        group_id: group.id,
        start_date: seriesStartDateInput.slice(0, 10),
        start_at: startAtIso,
        created_by: userId,
      },
      { onConflict: "series_id" }
    );
    setSeriesStartDate(startAtIso);
    setCurrentSeriesStartAt(startAtIso);
    setEditingSeriesStart(false);
    setSavingSeriesStartDate(false);
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
  const displayGroupName = group.name === "Hope Nation" ? "Bible Buddy Study Group" : group.name;
  const selectedSeriesAccent = selectedSeries?.title.toLowerCase().includes("tempt")
    ? { buttonBg: "#b7794d" }
    : { buttonBg: SAGE };

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
            <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <span className="text-xl">{group.cover_emoji || "🤝"}</span>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">
              {selectedPost ? selectedPost.title : selectedSeries ? selectedSeries.title : selectedHubItem ? selectedHubItem.title : displayGroupName}
            </h1>
            {!selectedPost && !selectedSeries && !selectedHubItem && (
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => setShowGroupInfoModal(true)}
                  className="text-xs text-gray-600 hover:text-gray-900 transition font-medium"
                >
                  About Group
                </button>
                <button
                  onClick={() => setActiveTab("members")}
                  className="text-xs text-gray-600 hover:text-gray-900 transition font-medium"
                >
                  👥 See All Members
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Header navigation */}
        {!selectedSeries && !selectedPost && !selectedHubItem && (
          <div className="max-w-2xl mx-auto px-4 pb-3">
            {(() => {
              const primaryTabs = [
                { key: "home", label: "Home" },
                { key: "bible_studies", label: "Bible Studies" },
                { key: "prayer", label: "Prayer" },
                { key: "qa", label: "Q&A" },
              ];
              const moreItems = [
                { key: "members", label: "Members", isHub: false },
                ...hubCategories.map((cat) => ({
                  key: cat.id,
                  label: `${cat.emoji} ${cat.name}`,
                  isHub: true,
                })),
              ];
              const moreIsActive = activeTab === "members" || hubCategories.some((cat) => cat.id === activeTab);
              return (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {primaryTabs.map((tab) => {
                      const isActive = activeTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => {
                            setActiveTab(tab.key);
                            setShowMoreNav(false);
                          }}
                          className="px-4 py-2 rounded-full text-sm font-semibold border shadow-sm whitespace-nowrap transition"
                          style={{
                            backgroundColor: isActive ? "#ffffff" : "rgba(255,255,255,0.82)",
                            borderColor: isActive ? "#d9c7b4" : "#e5e7eb",
                            color: isActive ? "#8d5d38" : "#374151",
                          }}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                    {moreItems.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowMoreNav((v) => !v)}
                        className="px-4 py-2 rounded-full text-sm font-semibold border shadow-sm whitespace-nowrap transition flex items-center gap-2"
                        style={{
                          backgroundColor: moreIsActive || showMoreNav ? "#ffffff" : "rgba(255,255,255,0.82)",
                          borderColor: moreIsActive || showMoreNav ? "#d9c7b4" : "#e5e7eb",
                          color: moreIsActive || showMoreNav ? "#8d5d38" : "#374151",
                        }}
                      >
                        <span>More</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${showMoreNav ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {showMoreNav && moreItems.length > 0 && (
                    <div className="flex flex-wrap gap-2 rounded-2xl border px-3 py-3 shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.72)", borderColor: "rgba(255,255,255,0.78)" }}>
                      {moreItems.map((item) => {
                        const isActive = activeTab === item.key;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => {
                              setActiveTab(item.key);
                              if (item.isHub) setHubView("articles");
                            }}
                            className="px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition"
                            style={{
                              backgroundColor: isActive ? "#f7e3d1" : "#fffaf4",
                              color: isActive ? "#8d5d38" : "#5f6368",
                              border: "1px solid #ead8c4",
                            }}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>


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

          {activeTab === "home" && currentSeriesPreview && (() => {
            const cardState = getCurrentSeriesCardState(currentSeriesStartAt, currentSeriesPreview.total_weeks, nowTs);
            return (
              <button
                type="button"
                onClick={() => setActiveTab("bible_studies")}
                className="w-full mb-4 text-left rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden"
                style={{ backgroundColor: "#d4ecd4", borderColor: "#b8ddb8" }}
              >
                <div
                  className="px-5 py-4 flex items-center justify-between gap-3"
                  style={{ borderBottom: "1px solid #b8ddb8" }}
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "#4f7e54" }}>Pinned Series</p>
                    <h2 className="text-base font-bold text-gray-900 mt-1">{currentSeriesPreview.title}</h2>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "#edf7ed", color: "#4f7e54" }}
                  >
                    Bible Study
                  </span>
                </div>
                <div className="px-5 py-4">
                  <p className="text-lg font-bold text-gray-900">{cardState.headline}</p>
                  <p className="text-sm text-gray-600 mt-1">{cardState.detail}</p>
                  <div
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl"
                    style={{ backgroundColor: "#5a9a5a", color: "white", boxShadow: "0 8px 18px rgba(90,154,90,0.16)" }}
                  >
                    {cardState.cta}
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </button>
            );
          })()}

          {/* ── MEMBERS TAB ─────────────────────────────────────────────── */}
          {activeTab === "members" && !selectedSeries && !selectedPost ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mt-2">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-800">Members {membersTotal !== null ? `(${membersTotal})` : ""}</h2>
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
                if (filtered.length === 0) return <p className="text-sm text-gray-400 text-center py-8">No results for &ldquo;{membersSearch}&rdquo;.</p>;
                return (
                <div>
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
                              {member.role === "leader" ? "Teacher" : "Moderator"}
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
                  {/* Load more — only show when not searching */}
                  {!membersSearch && membersHasMore && (
                    <div className="px-5 py-4 border-t border-gray-100">
                      <button
                        onClick={loadMoreMembers}
                        disabled={loadingMoreMembers}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                      >
                        {loadingMoreMembers ? "Loading..." : `Load more · ${members.length} of ${membersTotal ?? "?"} members`}
                      </button>
                    </div>
                  )}
                  {!membersSearch && !membersHasMore && membersTotal !== null && (
                    <p className="text-xs text-gray-400 text-center py-3">{membersTotal} {membersTotal === 1 ? "member" : "members"} total</p>
                  )}
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
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {(() => {
                  const isTemptationSeries = selectedSeries.title.toLowerCase().includes("tempt");
                  const seriesAccent = isTemptationSeries
                    ? {
                        softBg: "#fff4ea",
                        softBorder: "#eac9ae",
                        mutedText: "#9c6a46",
                        badgeBg: "#f6dfca",
                        badgeText: "#8d5d38",
                        panelBg: "#fff8f2",
                        coverBg: "linear-gradient(180deg, #f7e3d1 0%, #fff4ea 100%)",
                        buttonBg: "#b7794d",
                      }
                    : {
                        softBg: "#edf7ed",
                        softBorder: "#d4ecd4",
                        mutedText: "#5a855d",
                        badgeBg: "#d4ecd4",
                        badgeText: SAGE,
                        panelBg: "#ffffff",
                        coverBg: "linear-gradient(180deg, #dcefdc 0%, #edf7ed 100%)",
                        buttonBg: SAGE,
                      };
                  return (
                    <>
                      <div
                        className="px-4 py-4 border-b border-gray-200"
                        style={{ background: seriesAccent.coverBg }}
                      >
                        <div className="rounded-2xl overflow-hidden border shadow-sm" style={{ borderColor: "rgba(255,255,255,0.65)" }}>
                          {isTemptationSeries ? (
                            <div className="relative h-48 sm:h-56 bg-[#f4dcc7]">
                              <img
                                src="/TheTemptingofjesusstudy.png"
                                alt="The Tempting of Jesus study cover"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: "center 42%" }}
                              />
                            </div>
                          ) : (
                            <div className="bg-white/35 px-4 py-6">
                              <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: seriesAccent.mutedText }}>
                                Placeholder Cover
                              </p>
                              <h2 className="text-2xl font-bold text-gray-900 mt-3">{selectedSeries.title}</h2>
                              <p className="text-sm text-gray-700 mt-2 max-w-xl">
                                A guided Bible Buddy group study through Scripture, released week by week.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: seriesAccent.mutedText }}>
                              {selectedSeries.total_weeks}-week group study
                            </p>
                            <h3 className="text-lg font-bold text-gray-900 mt-1">{selectedSeries.title}</h3>
                          </div>
                          {selectedSeries.is_current && (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: seriesAccent.badgeBg, color: seriesAccent.badgeText }}>
                              Current
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowSeriesOverviewDetails((v) => !v)}
                          className="mt-3 w-full flex items-center justify-between py-3 text-left transition"
                        >
                          <div>
                            <h4 className="text-base font-semibold text-gray-900">📖 About This Series</h4>
                            <p className="text-xs text-gray-500 mt-0.5">What to expect, how it works, and what we will cover</p>
                          </div>
                          <svg
                            className={`w-5 h-5 text-gray-600 transition-transform ${showSeriesOverviewDetails ? "" : "-rotate-90"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {showSeriesOverviewDetails && (
                          <div className="pt-3 border-t" style={{ borderColor: seriesAccent.softBorder }}>
                            <div className="space-y-3">
                              <h5 className="text-base font-semibold text-gray-900">📚 What We Are Studying</h5>

                              {isTemptationSeries ? (
                                <>
                                  <p className="text-sm text-gray-700 leading-relaxed">
                                    This is a 5 week Bible study series going into the story of Jesus in the wilderness. Our main passage is Luke 4:1-30, and we will break the story down slowly, week by week, so the group can study it together and really understand what is happening.
                                  </p>

                                  <div className="space-y-2.5">
                                    <div>
                                      <p className="font-semibold text-gray-900 mb-1">🔥 What we will cover</p>
                                      <p className="text-sm text-gray-700 leading-relaxed">
                                        We will study the temptation of Jesus directly, but we will also cover important background from Luke's Gospel like Jesus as a child, John the Baptist, and the spiritual buildup that leads into the wilderness story.
                                      </p>
                                    </div>

                                    <div>
                                      <p className="font-semibold text-gray-900 mb-1">💬 How this group study works</p>
                                      <p className="text-sm text-gray-700 leading-relaxed">
                                        Each week includes guided reading, detailed notes to explain the verses, trivia questions, reflection prompts, and group discussion so we can all talk through what we are seeing in Scripture together.
                                      </p>
                                    </div>

                                    <div>
                                      <p className="font-semibold text-gray-900 mb-1">🗓️ Weekly release rhythm</p>
                                      <p className="text-sm text-gray-700 leading-relaxed">
                                        Once the series starts, a new Bible study will release each week. The goal is for all of us to move through the same study together, reflect on the same reading, and discuss what we are learning as a group.
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-1.5 pt-1">
                                    {[
                                      "📖 Main focus: Luke 4:1-30",
                                      "📝 Includes detailed notes and verse explanation",
                                      "🎯 Trivia questions and reflection prompts each week",
                                      "🤝 Built for shared discussion and group study",
                                    ].map((item) => (
                                      <p key={item} className="text-sm text-gray-700 leading-relaxed">{item}</p>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <p className="text-sm text-gray-700 leading-relaxed">
                                    This is a guided Bible study series designed for the group to move through together week by week with reading, notes, reflection, and discussion.
                                  </p>
                                  <div className="space-y-1.5 pt-1">
                                    {[
                                      "📖 Weekly Bible reading",
                                      "📝 Detailed study notes",
                                      "🎯 Trivia and reflection prompts",
                                      "🤝 Shared group discussion",
                                    ].map((item) => (
                                      <p key={item} className="text-sm text-gray-700 leading-relaxed">{item}</p>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
                {isLeader && !selectedSeries.is_current && (
                  <div className="px-4 pb-4">
                    <button
                      onClick={() => handleSetCurrentSeries(selectedSeries)}
                      className="px-4 py-2 rounded-xl text-white text-sm font-medium transition hover:opacity-90"
                      style={{ backgroundColor: selectedSeriesAccent.buttonBg }}
                    >
                      Set as Current Series
                    </button>
                  </div>
                )}
              </div>

              {/* Week Lessons — inline cards when series is current */}
              {isLeader && selectedSeries.is_current && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Series Control Panel</p>
                  <p className="text-sm text-amber-800 mb-3">Set the Week 1 start date and time. Every other week unlocks automatically 7 days later.</p>
                  {!seriesStartDate || editingSeriesStart ? (
                    <div className="flex gap-2 flex-col sm:flex-row">
                      <input
                        type="datetime-local"
                        value={seriesStartDateInput}
                        onChange={(e) => setSeriesStartDateInput(e.target.value)}
                        className="flex-1 text-sm px-3 py-2 border border-amber-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      <button
                        onClick={handleSaveSeriesStartDate}
                        disabled={savingSeriesStartDate || !seriesStartDateInput}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 transition"
                      >
                        {savingSeriesStartDate ? "Saving..." : "Save"}
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-amber-200 bg-white px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">
                        Series starts in {formatCountdown(new Date(seriesStartDate).getTime(), nowTs)}
                      </p>
                      <p className="text-xs text-amber-700 mt-1">{formatDateTimeLabel(seriesStartDate)}</p>
                      <button
                        onClick={() => setEditingSeriesStart(true)}
                        className="mt-3 text-xs font-semibold text-amber-700 hover:text-amber-900 transition"
                      >
                        Change start time
                      </button>
                    </div>
                  )}
                </div>
              )}

              {selectedSeries.is_current && (() => {
                const sd = seriesStartDate;
                return (
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">Week Lessons</p>
                    {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((wn) => {
                      const lesson = getSeriesWeekLesson(wn);
                      const prog = seriesWeekProgress[wn] ?? { reading: false, trivia: false, reflection: false };
                      const done = [prog.reading, prog.trivia, prog.reflection].filter(Boolean).length;
                      const complete = done === 3;
                      const previousWeek = seriesWeekProgress[wn - 1] ?? { reading: false, trivia: false, reflection: false };
                      const previousWeekComplete = wn === 1 ? true : (previousWeek.reading && previousWeek.trivia && previousWeek.reflection);
                      const lockState = getWeekLockState(sd, wn, isLeader, previousWeekComplete);
                      const unlocked = lockState.unlocked;
                      return (
                        <div
                          key={wn}
                          className={`border rounded-xl shadow-sm overflow-hidden transition-all ${
                            complete ? "border-green-200 bg-white" : unlocked ? "border-gray-200 bg-white" : "border-gray-200 bg-gray-50 opacity-55"
                          }`}
                        >
                          <div className={`px-4 py-3 ${complete ? "bg-green-50" : ""}`}>
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-400 font-medium">Week {wn}</p>
                                <p className="text-sm font-semibold text-gray-900 mt-0.5">{lesson ? lesson.title : "Coming Soon"}</p>
                                {lesson && <p className="text-xs text-gray-400 mt-0.5">{lesson.readingReference}</p>}
                              </div>
                              {complete ? (
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 flex-shrink-0">✓ Done</span>
                              ) : unlocked && lesson ? (
                                done > 0 ? <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 flex-shrink-0">{done}/3</span>
                                : <span className="text-xs text-gray-400 flex-shrink-0">Not started</span>
                              ) : (
                                <span className="text-xs text-gray-400 flex-shrink-0">🔒</span>
                              )}
                            </div>
                            {!unlocked && <p className="text-xs text-gray-400 mt-1">{lockState.lockedMessage}</p>}
                          </div>
                          <div className="px-4 pb-3">
                            {unlocked && lesson ? (
                              <Link href={`/study-groups/${groupId}/series/week/${wn}`}>
                                <button className="w-full py-2 rounded-xl text-sm font-bold text-white transition hover:opacity-90" style={{ backgroundColor: "#4a9b6f" }}>
                                  {complete ? "Review" : done > 0 ? "Continue" : "Start"}
                                </button>
                              </Link>
                            ) : (
                              <button
                                disabled
                                className="w-full py-2 rounded-xl text-sm font-bold border border-gray-200 bg-white text-gray-400 cursor-not-allowed"
                              >
                                {wn === 1 && sd
                                  ? `Starting Soon · ${formatCountdown(getWeekUnlockTimestamp(sd, 1), nowTs)}`
                                  : `🔒 Week ${wn} Locked`}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Posts list */}
              {false && (
                <div className="hidden">
              false ? (
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
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 px-4 pt-2 pb-3">
          <div className="max-w-2xl mx-auto">
            {/* Photo preview strip */}
            {composerMode === "photo" && composerPhotoPreview && (
              <div className="mb-2 relative inline-block">
                <img src={composerPhotoPreview} alt="Preview" className="h-20 rounded-xl object-cover" />
                <button
                  onClick={() => { setComposerPhotoFile(null); setComposerPhotoPreview(null); setComposerMode("text"); }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center text-white text-[9px] hover:bg-gray-900"
                >✕</button>
              </div>
            )}
            {/* Video upload strip */}
            {composerMode === "video" && (
              <div className="mb-2">
                {!composerVideoPreview ? (
                  <button
                    onClick={() => groupVideoInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 flex items-center justify-center gap-2 hover:border-green-400 hover:bg-green-50/50 transition text-sm text-gray-500 font-medium"
                  >
                    🎬 Tap to upload a video <span className="text-xs text-gray-400 font-normal">· MP4/MOV · max 50 MB · 90 sec</span>
                    <button onClick={(e) => { e.stopPropagation(); setComposerMode("text"); }} className="ml-2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
                  </button>
                ) : (
                  <div className="relative">
                    <video
                      src={composerVideoPreview}
                      controls
                      playsInline
                      className="w-full rounded-xl"
                      style={{ maxHeight: "200px" }}
                      onLoadedMetadata={(e) => {
                        if (e.currentTarget.duration > 90) {
                          setComposerVideoDurationError(true);
                          setComposerUploadError("Video must be 90 seconds or shorter.");
                        } else {
                          setComposerVideoDurationError(false);
                          setComposerUploadError(null);
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (composerVideoPreview) URL.revokeObjectURL(composerVideoPreview);
                        setComposerVideoFile(null); setComposerVideoPreview(null);
                        setComposerVideoDurationError(false); setComposerUploadError(null);
                        setComposerMode("text");
                      }}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white text-[10px] hover:bg-black/80 transition"
                    >✕</button>
                  </div>
                )}
              </div>
            )}
            {composerUploadError && <p className="text-xs text-red-500 mb-1">{composerUploadError}</p>}

            {/* Main input row */}
            <div className="flex items-end gap-2">
              {userProfileImage ? (
                <img src={userProfileImage} alt={displayName} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: userId ? avatarColor(userId) : "#aaa" }}>
                  {getInitial(displayName)}
                </div>
              )}

              {/* Photo/video icon buttons */}
              <input
                ref={groupPhotoInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setComposerPhotoFile(file);
                  const reader = new FileReader();
                  reader.onload = (ev) => setComposerPhotoPreview(ev.target?.result as string);
                  reader.readAsDataURL(file);
                  setComposerMode("photo");
                }}
              />
              <button
                onClick={() => { groupPhotoInputRef.current?.click(); }}
                title="Add photo"
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition text-base ${
                  composerMode === "photo" ? "bg-green-100 text-green-700" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                }`}
              >📷</button>
              <input
                ref={groupVideoInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 52428800) { setComposerUploadError("Video must be under 50 MB."); return; }
                  if (composerVideoPreview) URL.revokeObjectURL(composerVideoPreview);
                  setComposerVideoFile(file);
                  setComposerVideoPreview(URL.createObjectURL(file));
                  setComposerVideoDurationError(false);
                  setComposerUploadError(null);
                  setComposerMode("video");
                }}
              />
              <button
                onClick={() => {
                  if (composerMode === "video") {
                    if (composerVideoPreview) URL.revokeObjectURL(composerVideoPreview);
                    setComposerVideoFile(null); setComposerVideoPreview(null); setComposerVideoDurationError(false);
                    setComposerMode("text");
                  } else {
                    groupVideoInputRef.current?.click();
                  }
                }}
                title="Upload a video"
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition text-base ${
                  composerMode === "video" ? "bg-green-100 text-green-700" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                }`}
              >🎬</button>

              <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 flex items-end gap-2">
                <textarea
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 resize-none outline-none max-h-28"
                  placeholder={
                    composerMode === "photo" ? "Add a caption..." :
                    composerMode === "video" ? "Say something about this video..." :
                    `Post in ${TABS.find((t) => t.key === activeTab)?.label ?? ""}...`
                  }
                  rows={1}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmitPost(); } }}
                />
                <button
                  onClick={handleSubmitPost}
                  disabled={submitting || (!newPostContent.trim() && !composerPhotoFile && !composerVideoFile)}
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

      {/* ── Photo lightbox ───────────────────────────────────────────────── */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 modal-backdrop-in"
          onClick={() => setLightboxUrl(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxUrl(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition"
          >
            ✕
          </button>
          <img
            src={lightboxUrl}
            alt="Full size"
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ── New Series Modal ─────────────────────────────────────────────── */}
      {showNewSeriesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in">
          <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto modal-panel-in">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in">
          <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto modal-panel-in">
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

      {showGroupInfoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in"
          onClick={() => setShowGroupInfoModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto modal-panel-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">{displayGroupName}</h2>
              <button
                onClick={() => setShowGroupInfoModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 text-xl"
              >
                ×
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-green-700">Official Group</p>
                <p className="text-sm text-green-900 mt-1">This is the official Bible Buddy study group for the whole app.</p>
              </div>
              {group.description && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">About</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{group.description}</p>
                </div>
              )}
              <div className="grid grid-cols-1 gap-3">
                <div className="rounded-xl border border-gray-200 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Members</p>
                  <p className="text-sm text-gray-900 mt-1">{group.member_count === 1 ? "1 member" : `${group.member_count || 0} members`}</p>
                </div>
                <div className="rounded-xl border border-gray-200 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Teacher</p>
                  <p className="text-sm text-gray-900 mt-1">{group.leader_name || "Bible Buddy"}</p>
                </div>
                {group.current_weekly_study && (
                  <div className="rounded-xl border border-gray-200 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Current Study</p>
                    <p className="text-sm text-gray-900 mt-1">{group.current_weekly_study}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => {
                    setShowGroupInfoModal(false);
                    setActiveTab("members");
                  }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: SAGE }}
                >
                  View Members
                </button>
                <button
                  onClick={() => setShowGroupInfoModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deletePostId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in" onClick={() => setDeletePostId(null)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full modal-panel-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Delete this post?</h3>
            <p className="text-sm text-gray-500 mb-5">This will remove the post and its replies from the group feed.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeletePostId(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteGroupPost}
                disabled={deletingPost}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition"
              >
                {deletingPost ? "Deleting..." : "Delete"}
              </button>
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
                      {post.role === "leader" ? "Teacher" : "Mod"}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">{timeAgo(post.created_at)}</span>
                </div>
              </div>
              {(userId === post.user_id || isLeaderOrMod) && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setActivePostMenuId(activePostMenuId === post.id ? null : post.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                    aria-label="Post options"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6h.01M12 12h.01M12 18h.01" />
                    </svg>
                  </button>
                  {activePostMenuId === post.id && (
                    <div className="absolute right-0 top-10 z-10 min-w-[140px] rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          setActivePostMenuId(null);
                          setDeletePostId(post.id);
                        }}
                        className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition"
                      >
                        Delete Post
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            {post.content && <p className="text-gray-800 text-sm mt-3 leading-relaxed whitespace-pre-wrap">{post.content}</p>}
            {post.media_url && isUploadedVideo(post.media_url) && (
              <video
                src={post.media_url}
                controls
                playsInline
                className="mt-3 w-full rounded-xl"
                style={{ maxHeight: "400px" }}
              />
            )}
            {post.media_url && !isUploadedVideo(post.media_url) && (
              <button
                type="button"
                onClick={() => setLightboxUrl(post.media_url!)}
                className="mt-3 w-full block rounded-xl overflow-hidden focus:outline-none"
                style={{ maxHeight: "320px" }}
              >
                <img
                  src={post.media_url}
                  alt="Post image"
                  className="w-full object-cover"
                  style={{ maxHeight: "320px", objectPosition: "center" }}
                />
              </button>
            )}
            {post.link_url && (() => {
              const parsed = parseVideoEmbed(post.link_url);
              if (parsed.embedUrl) {
                if (!parsed.portrait) {
                  return (
                    <div className="mt-3 relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingBottom: "56.25%" }}>
                      <iframe src={parsed.embedUrl} className="absolute inset-0 w-full h-full" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
                    </div>
                  );
                }
                return (
                  <div className="mt-3 flex justify-center">
                    <div className="relative rounded-2xl overflow-hidden bg-black w-full" style={{ maxWidth: "300px", height: "530px" }}>
                      <iframe src={parsed.embedUrl} className="w-full h-full border-0" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" scrolling="no" />
                    </div>
                  </div>
                );
              }
              const meta = VIDEO_META[parsed.platform];
              return (
                <a href={post.link_url} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                  <span className="text-xl">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700">{meta.label}</p>
                    <p className="text-xs text-gray-400 truncate">{post.link_url}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              );
            })()}
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
              <button
                onClick={() => {
                  setOpenCommentPostIds((prev) => {
                    const next = new Set(prev);
                    if (next.has(post.id)) next.delete(post.id);
                    else next.add(post.id);
                    return next;
                  });
                }}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#b7794d] transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{post.comment_count || 0}</span>
                <span>{openCommentPostIds.has(post.id) ? "Hide comments" : "Comments"}</span>
              </button>
            </div>
            {openCommentPostIds.has(post.id) && userId && (
              <GroupCommentSection
                groupId={groupId}
                post={post}
                userId={userId}
                displayName={displayName}
                userProfileImage={userProfileImage}
                onCountChange={(delta) => {
                  setPosts((prev) => prev.map((item) => item.id === post.id ? { ...item, comment_count: Math.max((item.comment_count || 0) + delta, 0) } : item));
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}

