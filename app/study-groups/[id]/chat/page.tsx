"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState, useRef, type MouseEvent } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../lib/supabaseClient";
import { HUB_CONTENT, type HubItemStatic } from "@/lib/hubContent";
import { logActionToMasterActions } from "@/lib/actionRecorder";
import { TOTAL_WEEKS, getSeriesWeekLesson } from "@/lib/seriesContent";
import { parseWeeklyTriviaQuestions } from "@/lib/groupWeeklyTrivia";
import WeekLessonPage from "../series/week/[weekNum]/page";
import UserBadge from "@/components/UserBadge";
import GroupWeeklyTriviaCard from "@/components/GroupWeeklyTriviaCard";

// â”€â”€ Interfaces â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
  title?: string | null;
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
  member_badge?: string | null;
  is_paid?: boolean;
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
  role?: string;
  member_badge?: string | null;
  is_paid?: boolean;
}

interface Member {
  user_id: string;
  display_name: string;
  role: string;
  profile_image_url: string | null;
  member_badge?: string | null;
  is_paid?: boolean;
}

interface MemberActivityItem {
  user_id: string;
  action_type: string;
  action_label: string | null;
  created_at: string;
  display_name: string;
  profile_image_url: string | null;
}

interface WeeklyGroupTriviaFeedSet {
  id: string;
  post_id: string;
  group_id: string;
  week_key: string;
  subject_key: string;
  subject_title: string;
  intro: string | null;
  questions: ReturnType<typeof parseWeeklyTriviaQuestions>;
  created_at: string;
}

interface ArticleLikeUser {
  user_id: string;
  display_name: string;
  profile_image_url: string | null;
  member_badge?: string | null;
  is_paid?: boolean;
}

interface HubItemStats {
  likeCount: number;
  commentCount: number;
  liked: boolean;
  likers: ArticleLikeUser[];
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
  role?: string;
  member_badge?: string | null;
  is_paid?: boolean;
}

const PLANNED_BIBLE_STUDY_SERIES = [
  { key: "temptation_of_jesus", title: "The Temptation of Jesus", subtitle: "5-week group study" },
  { key: "testing_of_joseph", title: "The Testing of Joseph", subtitle: "Coming next" },
  { key: "wisdom_of_proverbs", title: "The Wisdom of Proverbs", subtitle: "Coming later" },
  { key: "faith_of_job", title: "The Faith of Job", subtitle: "Coming later" },
  { key: "calling_of_moses", title: "The Calling of Moses", subtitle: "Coming later" },
  { key: "heart_of_david", title: "The Heart of David", subtitle: "Coming later" },
] as const;

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

function formatMemberActivityLine(activity: Pick<MemberActivityItem, "display_name" | "action_type" | "action_label">): string {
  const name = activity.display_name || "A Buddy";
  const label = activity.action_label?.trim();

  switch (activity.action_type) {
    case "chapter_completed":
      return label ? `${name} read ${label}.` : `${name} completed a chapter.`;
    case "book_completed":
      return label ? `${name} finished ${label}.` : `${name} finished a book.`;
    case "reading_plan_chapter_completed":
      return label ? `${name} completed ${label} from a reading plan.` : `${name} completed a reading plan chapter.`;
    case "devotional_day_completed":
      return label ? `${name} completed ${label}.` : `${name} completed a devotional day.`;
    case "note_created":
      return `${name} created a note.`;
    case "note_started":
      return `${name} started a note.`;
    case "person_learned":
      return label ? `${name} learned about ${label}.` : `${name} learned about a Bible person.`;
    case "person_viewed":
      return label ? `${name} read about ${label}.` : `${name} viewed a Bible person.`;
    case "place_discovered":
      return label ? `${name} discovered ${label}.` : `${name} discovered a Bible place.`;
    case "place_viewed":
      return label ? `${name} explored ${label}.` : `${name} viewed a Bible place.`;
    case "keyword_mastered":
      return label ? `${name} studied ${label}.` : `${name} mastered a Bible keyword.`;
    case "keyword_viewed":
      return label ? `${name} explored ${label}.` : `${name} viewed a Bible keyword.`;
    case "trivia_question_answered":
      return label ? `${name} answered a trivia question about ${label}.` : `${name} answered a trivia question.`;
    case "trivia_started":
      return label ? `${name} started trivia on ${label}.` : `${name} started trivia.`;
    case "chapter_notes_viewed":
      return label ? `${name} opened notes for ${label}.` : `${name} opened chapter notes.`;
    case "understand_verse_of_the_day":
      return label ? `${name} studied the verse of the day: ${label}.` : `${name} studied the verse of the day.`;
    case "verse_highlighted":
      return label ? `${name} highlighted ${label}.` : `${name} highlighted a verse.`;
    case "group_message_sent":
      return `${name} posted in the group.`;
    case "series_week_started":
      return label ? `${name} started ${label}.` : `${name} started a study week.`;
    case "user_login":
      return `${name} logged in.`;
    case "user_signup":
      return `${name} joined Bible Buddy.`;
    default:
      return label ? `${name} ${activity.action_type.replace(/_/g, " ")}: ${label}.` : `${name} ${activity.action_type.replace(/_/g, " ")}.`;
  }
}

function normalizeHubCategoryName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
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
      cta: "Open Study",
    };
  }

  const startTs = new Date(startAt).getTime();
  if (nowTs < startTs) {
    return {
      headline: `Study starts in ${formatCountdown(startTs, nowTs)}`,
      detail: formatDateTimeLabel(startAt),
      cta: "Open Study",
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


// â”€â”€ Video URL parsing â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€ Hub types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface HubCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  display_order: number;
}

// â”€â”€ Tab config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type TabKey = "home" | "general" | "bible_studies" | "updates" | "prayer" | "qa" | "members";

const TABS: { key: TabKey; label: string }[] = [
  { key: "home",          label: "🏠 Home" },
  { key: "general",       label: "💬 General" },
  { key: "bible_studies", label: "📚 Bible Studies" },
  { key: "updates",       label: "📢 Updates" },
  { key: "prayer",        label: "🙏 Prayer" },
  { key: "qa",            label: "❓ Q&A" },
  { key: "members",       label: "👥 Buddies" },
];

function getGroupPostCategory(activeTab: string): string {
  return activeTab === "home" ? "general" : activeTab;
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\u00a0/g, " ")
    .trim();
}

function getPostPreviewText(html: string): string {
  const firstLine = stripHtml(html)
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .find(Boolean);

  return firstLine ?? "";
}

function GroupCommentSection({
  groupId,
  post,
  userId,
  displayName,
  userProfileImage,
  currentUserRole,
  currentUserBadge,
  onCountChange,
  targetCommentId,
}: {
  groupId: string;
  post: Post;
  userId: string;
  displayName: string;
  userProfileImage: string | null;
  currentUserRole: string | null;
  currentUserBadge: string | null;
  onCountChange: (delta: number) => void;
  targetCommentId?: string | null;
}) {
  const [comments, setComments] = useState<GroupFeedComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [likeLoading, setLikeLoading] = useState<Set<string>>(new Set());
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

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
    const [{ data: profiles }, { data: likes }, { data: memberships }] = await Promise.all([
      supabase
        .from("profile_stats")
        .select("user_id, profile_image_url, is_paid, member_badge")
        .in("user_id", userIds),
      supabase
        .from("group_post_likes")
        .select("post_id")
        .eq("user_id", userId)
        .in("post_id", allRows.map((row) => row.id)),
      supabase
        .from("group_members")
        .select("user_id, role")
        .eq("group_id", groupId)
        .in("user_id", userIds),
    ]);

    const imageMap: Record<string, string | null> = {};
    const badgeMap: Record<string, { is_paid: boolean; member_badge: string | null }> = {};
    const roleMap: Record<string, string> = {};
    (profiles || []).forEach((profile: any) => {
      imageMap[profile.user_id] = profile.profile_image_url ?? null;
      badgeMap[profile.user_id] = { is_paid: !!profile.is_paid, member_badge: profile.member_badge ?? null };
    });
    (memberships || []).forEach((membership) => {
      roleMap[membership.user_id] = membership.role;
    });
    const likedSet = new Set((likes || []).map((like) => like.post_id));

    setComments(
      allRows.map((row) => ({
        ...row,
        liked: likedSet.has(row.id),
        profile_image_url: imageMap[row.user_id] ?? null,
        role: roleMap[row.user_id] || "member",
        is_paid: badgeMap[row.user_id]?.is_paid ?? false,
        member_badge: badgeMap[row.user_id]?.member_badge ?? null,
      }))
    );
    setLoading(false);
  }

  useEffect(() => {
    void loadComments();
  }, [groupId, post.id, userId]);

  useEffect(() => {
    if (!targetCommentId || loading) return;
    const timer = window.setTimeout(() => {
      const target = document.getElementById(`comment-${targetCommentId}`);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [targetCommentId, loading, comments.length]);

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
    setSubmitError(null);
    const text = content.trim();
    const { error } = await supabase
      .from("group_posts")
      .insert({
        group_id: groupId,
        user_id: userId,
        display_name: displayName,
        category: post.category,
        content: text,
        parent_post_id: parentId ?? post.id,
      });

    if (!error) {
      await loadComments();
      onCountChange(1);
      void logActionToMasterActions(userId, "group_message_sent", `group-post:${post.id}`);
      setNewComment("");
      setReplyText("");
      setReplyingTo(null);
    } else {
      setSubmitError(error.message || "Could not post your reply.");
    }
    setSubmitting(false);
  }

  function canDeleteComment(comment: GroupFeedComment) {
    return (
      comment.user_id === userId ||
      currentUserBadge === "moderator" ||
      currentUserRole === "leader" ||
      currentUserRole === "moderator"
    );
  }

  async function handleDeleteComment(comment: GroupFeedComment) {
    if (deletingCommentId) return;
    setDeletingCommentId(comment.id);
    setSubmitError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch("/api/comments/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          kind: "group_feed_comment",
          commentId: comment.id,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not delete this comment.");
      }

      const deletedIds = new Set<string>((payload.deletedIds || []) as string[]);
      if (deletedIds.size === 0) deletedIds.add(comment.id);

      setComments((prev) => prev.filter((item) => !deletedIds.has(item.id)));
      onCountChange(-deletedIds.size);

      if (replyingTo && deletedIds.has(replyingTo)) {
        setReplyingTo(null);
        setReplyText("");
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not delete this comment.");
    }

    setDeletingCommentId(null);
  }

  const topLevelComments = comments.filter((comment) => comment.parent_post_id === post.id);
  const replies = (parentId: string) => comments.filter((comment) => comment.parent_post_id === parentId);

  function renderCommentRow(comment: GroupFeedComment, indent = false) {
    const name = comment.display_name || "Buddy";
    const isTargetComment = targetCommentId === comment.id;
    return (
      <div
        key={comment.id}
        id={`comment-${comment.id}`}
        className={`flex gap-2 transition-colors duration-700 ${indent ? "ml-8 mt-3 pl-4 border-l border-[#e8ddd0]" : "mt-3"} ${isTargetComment ? "rounded-2xl ring-1 ring-[#e8ddd0] px-2 py-1" : ""}`}
      >
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
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/profile/${comment.user_id}`} className="text-xs font-semibold text-gray-800 hover:underline">
                {name}
              </Link>
              <UserBadge customBadge={comment.member_badge} isPaid={comment.is_paid} groupRole={comment.role} />
            </div>
            <p className="text-xs text-gray-700 mt-0.5 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
          </div>
          <div className="flex items-center gap-3 mt-1">
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
            {canDeleteComment(comment) && (
              <button
                type="button"
                onClick={() => void handleDeleteComment(comment)}
                disabled={deletingCommentId === comment.id}
                className="text-[10px] text-gray-400 hover:text-red-500 font-semibold transition disabled:opacity-50"
              >
                {deletingCommentId === comment.id ? "Deleting..." : "Delete"}
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
          {!indent && replies(comment.id).map((reply) => renderCommentRow(reply, true))}
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
            renderCommentRow(comment)
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
      {submitError && <p className="mt-2 text-xs text-red-500">{submitError}</p>}
    </div>
  );
}

// â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
  const [userIsPaid, setUserIsPaid] = useState(false);
  const [userMemberBadge, setUserMemberBadge] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [showGroupInfoModal, setShowGroupInfoModal] = useState(false);
  const [selectedFeedPost, setSelectedFeedPost] = useState<Post | null>(null);

  // Chat posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [weeklyTriviaByPostId, setWeeklyTriviaByPostId] = useState<Record<string, WeeklyGroupTriviaFeedSet>>({});
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [showPostComposerModal, setShowPostComposerModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [likeLoading, setLikeLoading] = useState<Set<string>>(new Set());
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
  const [moreMenuPosition, setMoreMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [selectedHubItem, setSelectedHubItem] = useState<HubItemStatic | null>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  // Members
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [loadingMoreMembers, setLoadingMoreMembers] = useState(false);
  const [membersOffset, setMembersOffset] = useState(0);
  const [membersHasMore, setMembersHasMore] = useState(false);
  const [membersTotal, setMembersTotal] = useState<number | null>(null);
  const [membersSearch, setMembersSearch] = useState("");
  const [showMembersActivityModal, setShowMembersActivityModal] = useState(false);
  const [membersActivity, setMembersActivity] = useState<MemberActivityItem[]>([]);
  const [loadingMembersActivity, setLoadingMembersActivity] = useState(false);
  const [loadingMoreMembersActivity, setLoadingMoreMembersActivity] = useState(false);
  const [membersActivityError, setMembersActivityError] = useState<string | null>(null);
  const [membersActivityOffset, setMembersActivityOffset] = useState(0);
  const [membersActivityHasMore, setMembersActivityHasMore] = useState(false);
  const MEMBERS_PAGE = 20;
  const MEMBERS_ACTIVITY_PAGE = 20;
  const MEMBERS_ACTIVITY_MORE_PAGE = 10;

  // Series list
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [loadingSeries, setLoadingSeries] = useState(false);

  // Series view
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [selectedSeriesWeek, setSelectedSeriesWeek] = useState<number | null>(null);
  const [seriesPosts, setSeriesPosts] = useState<SeriesPost[]>([]);
  const [loadingSeriesPosts, setLoadingSeriesPosts] = useState(false);
  const [seriesStartDate, setSeriesStartDate] = useState<string | null>(null);
  const [seriesWeekProgress, setSeriesWeekProgress] = useState<Record<number, { reading: boolean; trivia: boolean; reflection: boolean }>>({});
  const [seriesStartDateInput, setSeriesStartDateInput] = useState("");
  const [savingSeriesStartDate, setSavingSeriesStartDate] = useState(false);
  const [seriesStartSaveError, setSeriesStartSaveError] = useState<string | null>(null);
  const [nowTs, setNowTs] = useState(() => Date.now());
  const [currentSeriesPreview, setCurrentSeriesPreview] = useState<CurrentSeriesPreview | null>(null);
  const [currentSeriesStartAt, setCurrentSeriesStartAt] = useState<string | null>(null);
  const [editingSeriesStart, setEditingSeriesStart] = useState(false);
  const [showSeriesOverviewDetails, setShowSeriesOverviewDetails] = useState(true);
  const [hubItemStats, setHubItemStats] = useState<Record<string, HubItemStats>>({});
  const [showHubLikesFor, setShowHubLikesFor] = useState<HubItemStatic | null>(null);
  const [showPostLikesFor, setShowPostLikesFor] = useState<Post | null>(null);
  const [postLikers, setPostLikers] = useState<ArticleLikeUser[]>([]);
  const [loadingPostLikers, setLoadingPostLikers] = useState(false);
  const [deepLinkedCommentId, setDeepLinkedCommentId] = useState<string | null>(null);

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
  const [deletingSeriesCommentId, setDeletingSeriesCommentId] = useState<string | null>(null);

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
  const postEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[220px] px-4 py-4 text-gray-800",
      },
    },
  });

  function runPostEditorCommand(command: () => boolean) {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      command();
    };
  }

  // â”€â”€ Auth + membership guard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        .select("display_name, username, profile_image_url, is_paid, member_badge")
        .eq("user_id", user.id)
        .maybeSingle();
      setDisplayName(profile?.display_name || profile?.username || user.email?.split("@")[0] || "Buddy");
      setUserProfileImage(profile?.profile_image_url ?? null);
      setUserIsPaid(!!profile?.is_paid);
      setUserMemberBadge(profile?.member_badge ?? null);

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

  // â”€â”€ Load content when tab or group changes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    if (!group) return;
    setSelectedHubItem(null);
    if (activeTab === "members") {
      loadMembers();
    } else if (activeTab === "bible_studies") {
      setSelectedSeries(null);
      setSelectedSeriesWeek(null);
      setSelectedPost(null);
      loadSeries();
    } else if (hubCategories.some((c) => c.id === activeTab)) {
      // items come from static HUB_CONTENT â€” no fetch needed
    } else {
      loadPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, activeTab, hubCategories]);

  useEffect(() => {
    const targetPostId = searchParams.get("post");
    const targetCommentId = searchParams.get("comment");
    if (!group || !targetPostId) return;

    if (activeTab === "members" || activeTab === "bible_studies" || hubCategories.some((c) => c.id === activeTab)) {
      setActiveTab("home");
      return;
    }

    setDeepLinkedCommentId(targetCommentId);
    void openFeedPostById(targetPostId);
    router.replace(`/study-groups/${groupId}/chat`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, posts, activeTab, hubCategories, searchParams]);

  // â”€â”€ Load series posts + schedule + progress when series is selected â”€â”€â”€â”€â”€
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
  }, [selectedSeries?.id, activeTab]);

  useEffect(() => {
    const hubCat = hubCategories.find((c) => c.id === activeTab);
    if (!hubCat) return;
    const hubCatStatic = HUB_CONTENT.find((c) => normalizeHubCategoryName(c.name) === normalizeHubCategoryName(hubCat.name));
    const items = hubCatStatic?.items ?? [];
    if (items.length === 0) {
      setHubItemStats({});
      return;
    }
    void loadHubItemStats(items);
  }, [activeTab, hubCategories, userId]);

  useEffect(() => {
    const id = window.setInterval(() => setNowTs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const shouldLockBodyScroll =
      !!selectedFeedPost ||
      !!showPostComposerModal ||
      !!showMembersActivityModal ||
      !!showGroupInfoModal ||
      !!deletePostId ||
      !!lightboxUrl ||
      !!showHubLikesFor ||
      !!showPostLikesFor;

    if (!shouldLockBodyScroll) return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [
    selectedFeedPost,
    showPostComposerModal,
    showMembersActivityModal,
    showGroupInfoModal,
    deletePostId,
    lightboxUrl,
    showHubLikesFor,
    showPostLikesFor,
  ]);

  useEffect(() => {
    if (!showMoreNav) return;

    function updateMoreMenuPosition() {
      const rect = moreButtonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMoreMenuPosition({
        top: rect.bottom + 8,
        left: Math.max(12, rect.left),
      });
    }

    updateMoreMenuPosition();
    window.addEventListener("resize", updateMoreMenuPosition);
    window.addEventListener("scroll", updateMoreMenuPosition, true);
    return () => {
      window.removeEventListener("resize", updateMoreMenuPosition);
      window.removeEventListener("scroll", updateMoreMenuPosition, true);
    };
  }, [showMoreNav]);

  useEffect(() => {
    return () => {
      if (postEditor) postEditor.destroy();
    };
  }, [postEditor]);

  // â”€â”€ Load comments when post is selected â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    if (selectedPost) loadComments(selectedPost.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost]);

  // â”€â”€ Chat posts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  async function loadPosts() {
    if (!group) return;
    setLoadingPosts(true);
    const postCategory = getGroupPostCategory(activeTab);

    if (activeTab === "home") {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;
        if (accessToken) {
          await fetch(`/api/groups/${group.id}/weekly-trivia/ensure`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        }
      } catch (error) {
        console.error("[GROUP_WEEKLY_TRIVIA] Ensure failed:", error);
      }
    }

    const { data: postRows, error } = await supabase
      .from("group_posts")
      .select("id, user_id, display_name, title, category, content, like_count, is_pinned, created_at, parent_post_id, media_url, link_url")
      .eq("group_id", group.id)
      .eq("category", postCategory)
      .is("parent_post_id", null)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) { setLoadingPosts(false); return; }

    const rows = postRows || [];
    const nextWeeklyTriviaByPostId: Record<string, WeeklyGroupTriviaFeedSet> = {};
    const rootCommentCountMap: Record<string, number> = {};
    rows.forEach((row) => {
      rootCommentCountMap[row.id] = 0;
    });

    if (rows.length > 0) {
      const { data: triviaRows } = await supabase
        .from("weekly_group_trivia_sets")
        .select("id, post_id, group_id, week_key, subject_key, subject_title, intro, questions, created_at")
        .in("post_id", rows.map((row) => row.id));

      (triviaRows || []).forEach((row: any) => {
        nextWeeklyTriviaByPostId[row.post_id] = {
          id: row.id,
          post_id: row.post_id,
          group_id: row.group_id,
          week_key: row.week_key,
          subject_key: row.subject_key,
          subject_title: row.subject_title,
          intro: row.intro ?? null,
          questions: parseWeeklyTriviaQuestions(row.questions),
          created_at: row.created_at,
        };
      });
    }

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
    const badgeMap: Record<string, { is_paid: boolean; member_badge: string | null }> = {};

    let likedSet = new Set<string>();
    const likeCountMap: Record<string, number> = {};
    rows.forEach((row) => {
      likeCountMap[row.id] = 0;
    });
    if (rows.length > 0) {
      const { data: likes } = await supabase
        .from("group_post_likes").select("post_id, user_id")
        .in("post_id", rows.map((p) => p.id));
      (likes || []).forEach((like) => {
        likeCountMap[like.post_id] = (likeCountMap[like.post_id] || 0) + 1;
        if (userId && like.user_id === userId) likedSet.add(like.post_id);
      });
    }
    if (authorIds.length > 0) {
      const [{ data: mems }, { data: pics }] = await Promise.all([
        supabase.from("group_members").select("user_id, role").eq("group_id", group.id).in("user_id", authorIds),
        supabase.from("profile_stats").select("user_id, profile_image_url, is_paid, member_badge").in("user_id", authorIds),
      ]);
      (mems || []).forEach((m) => { roleMap[m.user_id] = m.role; });
      (pics || []).forEach((p: any) => {
        imageMap[p.user_id] = p.profile_image_url ?? null;
        badgeMap[p.user_id] = { is_paid: !!p.is_paid, member_badge: p.member_badge ?? null };
      });
    }
    setPosts(rows.map((p) => ({
      ...p,
      like_count: likeCountMap[p.id] || 0,
      comment_count: rootCommentCountMap[p.id] || 0,
      role: roleMap[p.user_id] || "member",
      liked: likedSet.has(p.id),
      profile_image_url: imageMap[p.user_id] ?? null,
      is_paid: badgeMap[p.user_id]?.is_paid ?? false,
      member_badge: badgeMap[p.user_id]?.member_badge ?? null,
    })));
    setWeeklyTriviaByPostId(nextWeeklyTriviaByPostId);
    setLoadingPosts(false);
  }

  async function openFeedPostById(postId: string) {
    const existingPost = posts.find((post) => post.id === postId);
    if (existingPost) {
      setSelectedFeedPost(existingPost);
      return;
    }

    if (!group) return;

    const { data: postRow } = await supabase
      .from("group_posts")
      .select("id, user_id, display_name, title, category, content, like_count, is_pinned, created_at, parent_post_id, media_url, link_url")
      .eq("group_id", group.id)
      .eq("id", postId)
      .is("parent_post_id", null)
      .maybeSingle();

    if (!postRow) return;

    const [{ data: membership }, { data: profile }, { data: likeRows }, { count: directCommentCount }, { data: topLevelComments }] = await Promise.all([
      supabase.from("group_members").select("role").eq("group_id", group.id).eq("user_id", postRow.user_id).maybeSingle(),
      supabase.from("profile_stats").select("profile_image_url, is_paid, member_badge").eq("user_id", postRow.user_id).maybeSingle(),
      supabase.from("group_post_likes").select("post_id, user_id").eq("post_id", postRow.id),
      supabase.from("group_posts").select("id", { count: "exact", head: true }).eq("parent_post_id", postRow.id),
      supabase.from("group_posts").select("id").eq("parent_post_id", postRow.id),
    ]);

    let replyCount = 0;
    const topLevelIds = (topLevelComments || []).map((comment) => comment.id);
    if (topLevelIds.length > 0) {
      const { count } = await supabase
        .from("group_posts")
        .select("id", { count: "exact", head: true })
        .in("parent_post_id", topLevelIds);
      replyCount = count ?? 0;
    }

    const liked = !!userId && (likeRows || []).some((row) => row.user_id === userId);
    const { data: triviaSetRow } = await supabase
      .from("weekly_group_trivia_sets")
      .select("id, post_id, group_id, week_key, subject_key, subject_title, intro, questions, created_at")
      .eq("post_id", postRow.id)
      .maybeSingle();

    if (triviaSetRow) {
      setWeeklyTriviaByPostId((prev) => ({
        ...prev,
        [postRow.id]: {
          id: triviaSetRow.id,
          post_id: triviaSetRow.post_id,
          group_id: triviaSetRow.group_id,
          week_key: triviaSetRow.week_key,
          subject_key: triviaSetRow.subject_key,
          subject_title: triviaSetRow.subject_title,
          intro: triviaSetRow.intro ?? null,
          questions: parseWeeklyTriviaQuestions((triviaSetRow as any).questions),
          created_at: triviaSetRow.created_at,
        },
      }));
    }

    const hydratedPost: Post = {
      ...postRow,
      like_count: likeRows?.length || 0,
      comment_count: (directCommentCount ?? 0) + replyCount,
      role: membership?.role || "member",
      liked,
      profile_image_url: profile?.profile_image_url ?? null,
      is_paid: !!profile?.is_paid,
      member_badge: profile?.member_badge ?? null,
    };

    setSelectedFeedPost(hydratedPost);
  }

  async function handleLike(post: Post) {
    if (!userId || likeLoading.has(post.id)) return;
    const currentPost = posts.find((p) => p.id === post.id) ?? selectedFeedPost ?? post;
    setLikeLoading((prev) => new Set(prev).add(post.id));
    if (currentPost.liked) {
      await supabase.from("group_post_likes").delete().eq("post_id", post.id).eq("user_id", userId);
      await supabase.from("group_posts").update({ like_count: Math.max(0, currentPost.like_count - 1) }).eq("id", post.id);
      const updated = { ...currentPost, like_count: Math.max(0, currentPost.like_count - 1), liked: false };
      setPosts((prev) => prev.map((p) => p.id === post.id ? updated : p));
      setSelectedFeedPost((prev) => prev?.id === post.id ? updated : prev);
      setPostLikers((prev) => prev.filter((liker) => liker.user_id !== userId));
    } else {
      await supabase.from("group_post_likes").insert({ post_id: post.id, user_id: userId });
      await supabase.from("group_posts").update({ like_count: currentPost.like_count + 1 }).eq("id", post.id);
      const updated = { ...currentPost, like_count: currentPost.like_count + 1, liked: true };
      setPosts((prev) => prev.map((p) => p.id === post.id ? updated : p));
      setSelectedFeedPost((prev) => prev?.id === post.id ? updated : prev);
      setPostLikers((prev) => prev.some((liker) => liker.user_id === userId) ? prev : [{ user_id: userId, display_name: displayName, profile_image_url: userProfileImage, is_paid: userIsPaid, member_badge: userMemberBadge }, ...prev]);
    }
    setLikeLoading((prev) => { const s = new Set(prev); s.delete(post.id); return s; });
  }

  async function openPostLikes(post: Post) {
    setShowPostLikesFor(post);
    setLoadingPostLikers(true);

    const { data: likeRows } = await supabase
      .from("group_post_likes")
      .select("user_id")
      .eq("post_id", post.id);

    const likerIds = [...new Set((likeRows || []).map((row) => row.user_id))];

    if (likerIds.length === 0) {
      setPostLikers([]);
      setLoadingPostLikers(false);
      return;
    }

    const { data: profiles } = await supabase
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url, is_paid, member_badge")
      .in("user_id", likerIds);

    setPostLikers(
      likerIds.map((userIdValue) => {
        const profile = (profiles || []).find((row) => row.user_id === userIdValue);
        return {
          user_id: userIdValue,
          display_name: profile?.display_name || profile?.username || "Buddy",
          profile_image_url: profile?.profile_image_url ?? null,
          is_paid: !!profile?.is_paid,
          member_badge: profile?.member_badge ?? null,
        };
      }),
    );
    setLoadingPostLikers(false);
  }

  function resetPostComposer() {
    setNewPostTitle("");
    setNewPostContent("");
    postEditor?.commands.clearContent();
    setComposerPhotoFile(null);
    setComposerPhotoPreview(null);
    if (composerVideoPreview) URL.revokeObjectURL(composerVideoPreview);
    setComposerVideoFile(null);
    setComposerVideoPreview(null);
    setComposerVideoDurationError(false);
    setComposerMode("text");
    setComposerUploadError(null);
  }

  async function handleSubmitPost() {
    const editorHtml = postEditor?.getHTML() ?? "";
    const normalizedContent = editorHtml === "<p></p>" ? "" : editorHtml;
    const hasContent = stripHtml(normalizedContent).length > 0;
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
        title: newPostTitle.trim() || null,
        category: getGroupPostCategory(activeTab),
        content: normalizedContent,
        media_url: mediaUrl,
        link_url: linkUrl,
      })
      .select("id, user_id, display_name, title, category, content, like_count, is_pinned, created_at, parent_post_id, media_url, link_url")
      .single();

    if (error) {
      console.error("Group post insert failed:", error);
      setComposerUploadError(error.message || "Post failed to publish. Please try again.");
      setSubmitting(false);
      return;
    }

    if (newPost) {
      setPosts((prev) => [{ ...newPost, comment_count: 0, role: userRole, liked: false, profile_image_url: userProfileImage, is_paid: userIsPaid, member_badge: userMemberBadge }, ...prev]);
      resetPostComposer();
      setShowPostComposerModal(false);
      void logActionToMasterActions(userId, "group_message_sent", group?.name || "Group");
    }
    setSubmitting(false);
  }

  async function handleDeleteGroupPost() {
    if (!deletePostId || deletingPost) return;
    setDeletingPost(true);
    await supabase.from("group_posts").delete().eq("id", deletePostId);
    setPosts((prev) => prev.filter((post) => post.id !== deletePostId));
    setSelectedFeedPost((prev) => (prev?.id === deletePostId ? null : prev));
    setDeletePostId(null);
    setDeletingPost(false);
  }

  async function loadHubItemStats(items: HubItemStatic[]) {
    const itemPaths = items.map((item) => item.path);
    const nextStats: Record<string, HubItemStats> = {};

    itemPaths.forEach((path) => {
      nextStats[path] = { likeCount: 0, commentCount: 0, liked: false, likers: [] };
    });

    const { data: commentRows } = await supabase
      .from("article_comments")
      .select("article_slug")
      .in("article_slug", itemPaths);

    (commentRows || []).forEach((row) => {
      if (!row.article_slug || !nextStats[row.article_slug]) return;
      nextStats[row.article_slug].commentCount += 1;
    });

    const { data: likeRows, error: likeRowsError } = await supabase
      .from("article_likes")
      .select("article_slug, user_id")
      .in("article_slug", itemPaths);

    if (!likeRowsError) {
      const likerIds = [...new Set((likeRows || []).map((row) => row.user_id))];
      let likerMap: Record<string, ArticleLikeUser> = {};

      if (likerIds.length > 0) {
        const { data: likerProfiles } = await supabase
          .from("profile_stats")
          .select("user_id, display_name, username, profile_image_url")
          .in("user_id", likerIds);

        likerMap = Object.fromEntries(
          (likerProfiles || []).map((profile) => [
            profile.user_id,
            {
              user_id: profile.user_id,
              display_name: profile.display_name || profile.username || "Buddy",
              profile_image_url: profile.profile_image_url ?? null,
            },
          ]),
        );
      }

      (likeRows || []).forEach((row) => {
        if (!row.article_slug || !nextStats[row.article_slug]) return;
        nextStats[row.article_slug].likeCount += 1;
        if (userId && row.user_id === userId) nextStats[row.article_slug].liked = true;
        const liker = likerMap[row.user_id] || { user_id: row.user_id, display_name: "Buddy", profile_image_url: null };
        nextStats[row.article_slug].likers.push(liker);
      });
    }

    setHubItemStats(nextStats);
  }

  async function handleHubItemLike(item: HubItemStatic) {
    if (!userId) return;
    const current = hubItemStats[item.path] || { likeCount: 0, commentCount: 0, liked: false, likers: [] };

    if (current.liked) {
      const { error } = await supabase
        .from("article_likes")
        .delete()
        .eq("article_slug", item.path)
        .eq("user_id", userId);
      if (error) return;

      setHubItemStats((prev) => ({
        ...prev,
        [item.path]: {
          ...current,
          liked: false,
          likeCount: Math.max(0, current.likeCount - 1),
          likers: current.likers.filter((liker) => liker.user_id !== userId),
        },
      }));
      return;
    }

    const { error } = await supabase.from("article_likes").insert({
      article_slug: item.path,
      user_id: userId,
    });
    if (error) return;

    const newLiker: ArticleLikeUser = {
      user_id: userId,
      display_name: displayName,
      profile_image_url: userProfileImage,
    };

    setHubItemStats((prev) => ({
      ...prev,
      [item.path]: {
        ...current,
        liked: true,
        likeCount: current.likeCount + 1,
        likers: current.likers.some((liker) => liker.user_id === userId) ? current.likers : [newLiker, ...current.likers],
      },
    }));
  }

  // â”€â”€ Members â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      .select("user_id, display_name, username, profile_image_url, is_paid, member_badge")
      .in("user_id", userIds);
    const profileMap: Record<string, any> = {};
    (profiles || []).forEach((p) => { profileMap[p.user_id] = p; });

    const roleOrder: Record<string, number> = { leader: 0, moderator: 1, member: 2 };
    const rows: Member[] = page.map((m) => {
      const p = profileMap[m.user_id];
      return {
        user_id: m.user_id,
        display_name: p?.display_name || p?.username || m.display_name || "Buddy",
        role: m.role,
        profile_image_url: p?.profile_image_url ?? null,
        is_paid: !!p?.is_paid,
        member_badge: p?.member_badge ?? null,
      };
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

  async function loadMembersActivity(reset = false) {
    if (!group || !userId) return;
    const pageSize = reset ? MEMBERS_ACTIVITY_PAGE : MEMBERS_ACTIVITY_MORE_PAGE;
    const offset = reset ? 0 : membersActivityOffset;
    if (reset) {
      setLoadingMembersActivity(true);
    } else {
      setLoadingMoreMembersActivity(true);
    }
    setMembersActivityError(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch(`/api/groups/${group.id}/buddies-activity?offset=${offset}&limit=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Buddy activity could not load right now.");
      }

      const mappedRows = Array.isArray(payload.items) ? payload.items as MemberActivityItem[] : [];
      const hasMore = payload.hasMore === true;

      setMembersActivity((prev) => {
        if (reset) return mappedRows;
        const seen = new Set(prev.map((item) => `${item.user_id}-${item.created_at}-${item.action_type}-${item.action_label || ""}`));
        return [...prev, ...mappedRows.filter((item) => !seen.has(`${item.user_id}-${item.created_at}-${item.action_type}-${item.action_label || ""}`))];
      });
      setMembersActivityHasMore(hasMore);
      setMembersActivityOffset(offset + mappedRows.length);
    } catch (error) {
      if (reset) setMembersActivity([]);
      setMembersActivityError(error instanceof Error ? error.message : "Buddy activity could not load right now.");
    }
    setLoadingMembersActivity(false);
    setLoadingMoreMembersActivity(false);
  }

  useEffect(() => {
    if (!showMembersActivityModal) return;
    setMembersActivity([]);
    setMembersActivityOffset(0);
    setMembersActivityHasMore(false);
    void loadMembersActivity(true);
  }, [showMembersActivityModal, group?.id]);

  useEffect(() => {
    if (!showMembersActivityModal) return;

    const channel = supabase
      .channel(`group-buddies-activity:${groupId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "master_actions",
        },
        () => {
          setMembersActivity([]);
          setMembersActivityOffset(0);
          setMembersActivityHasMore(false);
          void loadMembersActivity(true);
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [showMembersActivityModal, groupId, group?.id]);

  useEffect(() => {
    if (!group) return;
    if (activeTab === "members" || activeTab === "bible_studies" || hubCategories.some((c) => c.id === activeTab)) return;

    const channel = supabase
      .channel(`group-feed-refresh:${group.id}:${activeTab}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "group_posts",
          filter: `group_id=eq.${group.id}`,
        },
        () => {
          void loadPosts();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [group, activeTab, hubCategories]);

  // â”€â”€ Series â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

    let imageMap: Record<string, string | null> = {};
    let roleMap: Record<string, string> = {};
    let badgeMap: Record<string, { is_paid: boolean; member_badge: string | null }> = {};
    if (commentRows.length > 0) {
      const commenterIds = [...new Set(commentRows.map((c) => c.user_id))];
      const [{ data: pics }, { data: roles }] = await Promise.all([
        supabase.from("profile_stats").select("user_id, profile_image_url, is_paid, member_badge").in("user_id", commenterIds),
        group
          ? supabase.from("group_members").select("user_id, role").eq("group_id", group.id).in("user_id", commenterIds)
          : Promise.resolve({ data: [] as Array<{ user_id: string; role: string }> }),
      ]);
      (pics || []).forEach((p: any) => {
        imageMap[p.user_id] = p.profile_image_url ?? null;
        badgeMap[p.user_id] = { is_paid: !!p.is_paid, member_badge: p.member_badge ?? null };
      });
      (roles || []).forEach((row) => { roleMap[row.user_id] = row.role; });
    }

    let likedSet = new Set<string>();
    if (userId && commentRows.length > 0) {
      const { data: likes } = await supabase
        .from("group_series_comment_likes").select("comment_id")
        .eq("user_id", userId).in("comment_id", commentRows.map((c) => c.id));
      (likes || []).forEach((l) => likedSet.add(l.comment_id));
    }
    setComments(commentRows.map((c) => ({
      ...c,
      liked: likedSet.has(c.id),
      profile_image_url: imageMap[c.user_id] ?? null,
      role: roleMap[c.user_id] || "member",
      is_paid: badgeMap[c.user_id]?.is_paid ?? false,
      member_badge: badgeMap[c.user_id]?.member_badge ?? null,
    })));
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
    setSeriesStartSaveError(null);
    const startAtIso = new Date(seriesStartDateInput).toISOString();

    const payload = {
      series_id: selectedSeries.id,
      group_id: group.id,
      start_date: seriesStartDateInput.slice(0, 10),
      start_at: startAtIso,
      created_by: userId,
    };

    const { data: existingSchedule } = await supabase
      .from("series_schedules")
      .select("id")
      .eq("series_id", selectedSeries.id)
      .maybeSingle();

    const saveResult = existingSchedule?.id
      ? await supabase.from("series_schedules").update(payload).eq("id", existingSchedule.id)
      : await supabase.from("series_schedules").insert(payload);

    if (saveResult.error) {
      const message = saveResult.error.message || "";
      if (message.includes("Could not find the table 'public.series_schedules'")) {
        setSeriesStartSaveError("Supabase is missing the series schedule tables. Run STEP_H_SERIES_TABLES.sql first, then ADD_SERIES_START_TIME_SUPPORT.sql.");
      } else {
        setSeriesStartSaveError(message || "Could not save the series start time.");
      }
      setSavingSeriesStartDate(false);
      return;
    }

    const { data: refreshedSchedule, error: refreshError } = await supabase
      .from("series_schedules")
      .select("start_date, start_at")
      .eq("series_id", selectedSeries.id)
      .maybeSingle();

    if (refreshError) {
      setSeriesStartSaveError(refreshError.message || "The series start time saved, but it could not be reloaded.");
      setSavingSeriesStartDate(false);
      return;
    }

    const resolvedStart = resolveSeriesStart(refreshedSchedule);
    setSeriesStartDate(resolvedStart);
    setCurrentSeriesStartAt(resolvedStart);
    setSeriesStartDateInput(resolvedStart ? toDateTimeLocalValue(resolvedStart) : "");
    setEditingSeriesStart(!resolvedStart);
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

  function canDeleteSeriesComment(comment: SeriesComment) {
    return (
      comment.user_id === userId ||
      userMemberBadge === "moderator" ||
      userRole === "leader" ||
      userRole === "moderator"
    );
  }

  async function handleDeleteSeriesComment(comment: SeriesComment) {
    if (!userId || deletingSeriesCommentId) return;
    setDeletingSeriesCommentId(comment.id);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch("/api/comments/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          kind: "series_post_comment",
          commentId: comment.id,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not delete this comment.");
      }

      const deletedIds = new Set<string>((payload.deletedIds || []) as string[]);
      if (deletedIds.size === 0) deletedIds.add(comment.id);

      setComments((prev) => prev.filter((item) => !deletedIds.has(item.id)));

      if (typeof payload.nextCommentCount === "number") {
        setSelectedPost((prev) => (prev ? { ...prev, comment_count: payload.nextCommentCount } : prev));
        setSeriesPosts((prev) => prev.map((item) => (
          selectedPost && item.id === selectedPost.id
            ? { ...item, comment_count: payload.nextCommentCount }
            : item
        )));
      }

      if (replyingToId && deletedIds.has(replyingToId)) {
        setReplyingToId(null);
        setReplyText("");
      }
    } catch (error) {
      console.error("Failed to delete series comment:", error);
    }

    setDeletingSeriesCommentId(null);
  }

  // â”€â”€ Derived â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  const coverColor = group.cover_color || "#d4ecd4";
  const activeFeedPost = selectedFeedPost ? (posts.find((post) => post.id === selectedFeedPost.id) ?? selectedFeedPost) : null;
  const activeFeedTriviaSet = activeFeedPost ? weeklyTriviaByPostId[activeFeedPost.id] : undefined;
  const isLeader = userRole === "leader";
  const isLeaderOrMod = userRole === "leader" || userRole === "moderator";
  const SAGE = "#5a9a5a";
  const displayGroupName = group.name === "Hope Nation" ? "Bible Buddy Study Group" : group.name;
  const selectedSeriesAccent = selectedSeries?.title.toLowerCase().includes("tempt")
    ? { buttonBg: "#b7794d" }
    : { buttonBg: SAGE };

  // â”€â”€ Render â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* â”€â”€ Header banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="sticky top-0 z-20" style={{ backgroundColor: coverColor }}>
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-1 text-xs text-gray-600 font-medium mb-2 flex-wrap">
            <Link href="/dashboard" className="hover:text-gray-900 hover:underline transition">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-gray-900">Bible Study Group</span>
            {selectedSeries && (
              <>
                <span>/</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSeries(null);
                    setSelectedSeriesWeek(null);
                    setSelectedPost(null);
                  }}
                  className="text-gray-900 hover:underline"
                >
                  {selectedSeries.title}
                </button>
              </>
            )}
            {selectedPost && (
              <>
                <span>/</span>
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-900 hover:underline"
                >
                  {selectedPost.title}
                </button>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">{group.cover_emoji || "🤝"}</span>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">{displayGroupName}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => setShowGroupInfoModal(true)}
                  className="text-xs text-gray-600 hover:text-gray-900 transition font-medium"
                >
                  About Group
                </button>
              <button
                onClick={() => {
                      setShowMembersActivityModal(true);
                }}
                className="text-xs text-gray-600 hover:text-gray-900 transition font-medium"
              >
                👥 See All Buddies
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Header navigation */}
        <div className="max-w-2xl mx-auto px-4 pb-3">
          {(() => {
            const primaryTabs = [
              { key: "home", label: "Home" },
              { key: "bible_studies", label: "Bible Studies" },
            ];
            const moreItems = [
              { key: "prayer", label: "🤲 Prayer Request", isHub: false },
              { key: "qa", label: "❓ Q&A", isHub: false },
              ...hubCategories.map((cat) => ({
                key: cat.id,
                label: `${cat.emoji} ${cat.name}`,
                isHub: true,
              })),
            ];
            const moreIsActive = activeTab === "prayer" || activeTab === "qa" || hubCategories.some((cat) => cat.id === activeTab);
            return (
              <div className="relative">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pr-1">
                  {primaryTabs.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => {
                          if (tab.key === "bible_studies") {
                            setSelectedSeries(null);
                            setSelectedSeriesWeek(null);
                            setSelectedPost(null);
                          }
                          setSelectedHubItem(null);
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
                    <div className="flex-shrink-0">
                      <button
                        ref={moreButtonRef}
                        type="button"
                        onClick={() => {
                          setShowMoreNav((v) => !v);
                        }}
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
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {showMoreNav && moreMenuPosition && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowMoreNav(false)} />
          <div
            className="fixed z-20 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-[#ead8c4] bg-[#fffaf4] p-2 shadow-xl"
            style={{ top: moreMenuPosition.top, left: moreMenuPosition.left }}
          >
            {[
              { key: "prayer", label: "🤲 Prayer Request", isHub: false },
              { key: "qa", label: "❓ Q&A", isHub: false },
              ...hubCategories.map((cat) => ({
                key: cat.id,
                label: `${cat.emoji} ${cat.name}`,
                isHub: true,
              })),
            ].map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setSelectedHubItem(null);
                    setActiveTab(item.key);
                    if (item.isHub) setHubView("articles");
                    setShowMoreNav(false);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition"
                  style={{
                    backgroundColor: isActive ? "#f7e3d1" : "transparent",
                    color: isActive ? "#8d5d38" : "#5f6368",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </>
      )}


      {/* â”€â”€ Feed â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div ref={feedRef} className="flex-1 overflow-y-auto pb-32">

        {/* â”€â”€ Hub article viewer (iframe, full-width, no padding) â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {selectedHubItem && (
          <div className="w-full">
            <iframe
              key={selectedHubItem.path}
              src={selectedHubItem.path}
              title={selectedHubItem.title}
              className="w-full border-0 block bg-white"
              style={{ height: "calc(100vh - 118px)", minHeight: 600 }}
            />
          </div>
        )}

        {!selectedHubItem && <div className="max-w-2xl mx-auto px-4 py-4">

          {activeTab === "home" && currentSeriesPreview && (() => {
            const cardState = getCurrentSeriesCardState(currentSeriesStartAt, currentSeriesPreview.total_weeks, nowTs);
            return (
              <button
                type="button"
                onClick={() => setActiveTab("bible_studies")}
                className="w-full mb-4 text-left rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden"
                style={{ backgroundColor: "#f4e2d2", borderColor: "#d9b896" }}
              >
                <div
                  className="px-4 pt-4 pb-3"
                  style={{ borderBottom: "1px solid #d9b896" }}
                >
                  <div className="rounded-2xl overflow-hidden border shadow-sm" style={{ borderColor: "rgba(116, 74, 45, 0.16)" }}>
                    <div className="relative h-32 sm:h-40 bg-[#ead4c0]">
                      <img
                        src="/TheTemptingofjesusstudy.png"
                        alt="The Temptation of Jesus study banner"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "center 42%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4">
                  {currentSeriesStartAt && new Date(currentSeriesStartAt).getTime() > nowTs ? (
                    <p
                      className="text-lg font-bold"
                      style={{ color: "#d62828", WebkitTextFillColor: "#d62828" }}
                    >
                      Study starts in {formatCountdown(new Date(currentSeriesStartAt).getTime(), nowTs)}
                    </p>
                  ) : (
                    <p
                      className="text-lg font-bold"
                      style={{ color: "#d62828", WebkitTextFillColor: "#d62828" }}
                    >
                      {cardState.headline}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-1">{cardState.detail}</p>
                  <div
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl"
                    style={{ backgroundColor: "#8d5d38", color: "white", boxShadow: "0 8px 18px rgba(141,93,56,0.18)" }}
                  >
                    {cardState.cta}
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </button>
            );
          })()}

          {/* â”€â”€ MEMBERS TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeTab === "members" && !selectedSeries && !selectedPost ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mt-2">
              <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="text-base font-semibold text-gray-800">Buddies {membersTotal !== null ? `(${membersTotal})` : ""}</h2>
              </div>
              {/* Search */}
              <div className="px-4 py-3 border-b border-gray-100">
                <input
                  type="text"
                  value={membersSearch}
                  onChange={(e) => setMembersSearch(e.target.value)}
                      placeholder="Search buddies..."
                  className="w-full px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>
              {loadingMembers ? (
                <p className="text-sm text-gray-400 text-center py-8">Loading buddies...</p>
              ) : members.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No buddies yet.</p>
              ) : (() => {
                const q = membersSearch.toLowerCase();
                const filtered = membersSearch ? members.filter((m) => m.display_name.toLowerCase().includes(q)) : members;
                if (filtered.length === 0) return <p className="text-sm text-gray-400 text-center py-8">No buddies found for &ldquo;{membersSearch}&rdquo;.</p>;
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
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-gray-900 truncate">{member.display_name}</p>
                            <UserBadge customBadge={member.member_badge} isPaid={member.is_paid} groupRole={member.role} />
                          </div>
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
                  {/* Load more â€” only show when not searching */}
                  {!membersSearch && membersHasMore && (
                    <div className="px-5 py-4 border-t border-gray-100">
                      <button
                        onClick={loadMoreMembers}
                        disabled={loadingMoreMembers}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                      >
                      {loadingMoreMembers ? "Loading..." : `Load more · ${members.length} of ${membersTotal ?? "?"} buddies`}
                      </button>
                    </div>
                  )}
                  {!membersSearch && !membersHasMore && membersTotal !== null && (
                  <p className="text-xs text-gray-400 text-center py-3">{membersTotal} {membersTotal === 1 ? "buddy" : "buddies"} total</p>
                  )}
                </div>
                );
              })()}
            </div>

          /* â”€â”€ BIBLE STUDIES â€” POST VIEW â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
          ) : activeTab === "bible_studies" && selectedPost ? (
            <div className="flex flex-col gap-4">
              {/* Post card */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 pt-5 pb-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{selectedSeries?.title}</p>
                  <p className="text-xs text-gray-500 mb-3">Week {selectedPost.week_number} Â· {selectedPost.published_at ? formatDate(selectedPost.published_at) : formatDate(selectedPost.created_at)}</p>
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
                              <UserBadge customBadge={comment.member_badge} isPaid={comment.is_paid} groupRole={comment.role} />
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
                              {canDeleteSeriesComment(comment) && (
                                <button
                                  type="button"
                                  onClick={() => void handleDeleteSeriesComment(comment)}
                                  disabled={deletingSeriesCommentId === comment.id}
                                  className="text-xs text-gray-400 hover:text-red-500 transition disabled:opacity-50"
                                >
                                  {deletingSeriesCommentId === comment.id ? "Deleting..." : "Delete"}
                                </button>
                              )}
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
                                    <UserBadge customBadge={reply.member_badge} isPaid={reply.is_paid} groupRole={reply.role} />
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
                                  {canDeleteSeriesComment(reply) && (
                                    <button
                                      type="button"
                                      onClick={() => void handleDeleteSeriesComment(reply)}
                                      disabled={deletingSeriesCommentId === reply.id}
                                      className="text-xs text-gray-400 hover:text-red-500 transition disabled:opacity-50 mt-1"
                                    >
                                      {deletingSeriesCommentId === reply.id ? "Deleting..." : "Delete"}
                                    </button>
                                  )}
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

          /* â”€â”€ BIBLE STUDIES â€” SERIES VIEW â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
          ) : activeTab === "bible_studies" && selectedSeries && selectedSeriesWeek ? (
            <WeekLessonPage
              embedded
              embeddedGroupId={groupId}
              embeddedWeekNum={selectedSeriesWeek}
              onBack={() => setSelectedSeriesWeek(null)}
            />
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

                        {seriesStartDate && (
                          <div className="mt-3">
                            <p className="text-sm font-bold" style={{ color: "#d62828" }}>
                              {new Date(seriesStartDate).getTime() > nowTs
                                ? `Bible Study starts in ${formatCountdown(new Date(seriesStartDate).getTime(), nowTs)}`
                                : "Bible Study Series started"}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {formatDateTimeLabel(seriesStartDate)}
                            </p>
                          </div>
                        )}

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

              {/* Week Lessons â€” inline cards when series is current */}
              {isLeader && selectedSeries.is_current && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Series Control Panel</p>
                  <p className="text-sm text-amber-800 mb-3">Set the Week 1 start date and time. Every other week unlocks automatically 7 days later.</p>
                  {!seriesStartDate || editingSeriesStart ? (
                    <div className="space-y-2">
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
                      {seriesStartSaveError && (
                        <p className="text-xs text-red-600">{seriesStartSaveError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-amber-200 bg-white px-4 py-3">
                      <p className="text-sm font-semibold" style={{ color: "#d62828" }}>
                        Study starts in {formatCountdown(new Date(seriesStartDate).getTime(), nowTs)}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#d62828" }}>{formatDateTimeLabel(seriesStartDate)}</p>
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
                              <button
                                type="button"
                                onClick={() => setSelectedSeriesWeek(wn)}
                                className="w-full py-2 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
                                style={{ backgroundColor: "#4a9b6f" }}
                              >
                                {complete ? "Review" : done > 0 ? "Continue" : "Start"}
                              </button>
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

          /* â”€â”€ BIBLE STUDIES â€” SERIES LIST â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
          ) : activeTab === "bible_studies" ? (
            <div className="flex flex-col gap-4">
              {loadingSeries ? (
                <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {PLANNED_BIBLE_STUDY_SERIES.map((planned, index) => {
                    const liveSeries = index === 0 ? (seriesList.find((series) => series.is_current) ?? seriesList[0] ?? null) : null;
                    const isLive = index === 0 && !!liveSeries;
                    const startLabel = isLive && currentSeriesStartAt ? formatDateTimeLabel(currentSeriesStartAt) : null;
                    const startCountdown =
                      isLive && currentSeriesStartAt && new Date(currentSeriesStartAt).getTime() > nowTs
                        ? formatCountdown(new Date(currentSeriesStartAt).getTime(), nowTs)
                        : null;
                    return (
                      <button
                        key={planned.key}
                        type="button"
                        onClick={() => {
                          if (isLive && liveSeries) setSelectedSeries(liveSeries);
                        }}
                        disabled={!isLive}
                        className={`w-full rounded-xl p-4 shadow-sm text-left transition border ${
                          isLive
                            ? "bg-white border-gray-200 hover:shadow-md"
                            : "bg-gray-50 border-gray-200 opacity-55 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: isLive ? "#4f7e54" : "#9ca3af" }}>
                              {planned.subtitle}
                            </p>
                            <p className="text-base font-semibold text-gray-900 mt-1">{planned.title}</p>
                            {isLive ? (
                              <>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                  {liveSeries?.description || "A guided Bible Buddy study through Luke 4:1-30 with notes, trivia, reflection, and group discussion."}
                                </p>
                                <p className="text-xs mt-2">
                                  {startCountdown ? (
                                    <>
                                      <span className="text-gray-600">Study starts in </span>
                                      <span className="font-bold" style={{ color: "#d62828" }}>{startCountdown}</span>
                                      {startLabel && <span className="text-gray-500"> ({startLabel})</span>}
                                    </>
                                  ) : (
                                    <span style={{ color: "#d62828" }}>{startLabel ? `Starts ${startLabel}` : "Start date coming soon"}</span>
                                  )}
                                </p>
                              </>
                            ) : (
                              <p className="text-xs text-gray-400 mt-2">🔒 Locked until this series is released</p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            {isLive ? (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#d4ecd4", color: SAGE }}>
                                Active
                              </span>
                            ) : (
                              <span className="text-xs text-gray-400">🔒</span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          /* â”€â”€ HUB TABS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
          ) : hubCategories.some((c) => c.id === activeTab) ? (() => {
            const hubCat = hubCategories.find((c) => c.id === activeTab)!;
            const bg = "#ffffff";
            const borderColor = "#e5e7eb";

            // â”€â”€ Category list view (items from static config) â”€â”€
            const hubCatStatic = HUB_CONTENT.find((c) => normalizeHubCategoryName(c.name) === normalizeHubCategoryName(hubCat.name));
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
                      <div
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedHubItem(item)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedHubItem(item);
                          }
                        }}
                        className="w-full text-left rounded-xl p-4 shadow-sm border hover:shadow-md transition cursor-pointer"
                        style={{ backgroundColor: bg, borderColor }}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-gray-900 text-[15px] leading-snug">{item.title}</p>
                          <p className="text-gray-600 text-sm mt-1">{item.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-black/5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              void handleHubItemLike(item);
                            }}
                            className="flex items-center gap-1.5 text-sm transition"
                            style={{ color: hubItemStats[item.path]?.liked ? "#e53e3e" : "#7b7b7b" }}
                          >
                            <svg className="w-4 h-4" fill={hubItemStats[item.path]?.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowHubLikesFor(item);
                            }}
                            className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition"
                          >
                            {hubItemStats[item.path]?.likeCount || 0}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedHubItem(item);
                            }}
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#b7794d] transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{hubItemStats[item.path]?.commentCount || 0}</span>
                            <span>Comments</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })() : (

          /* â”€â”€ OTHER TABS (chat) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
            <div className="space-y-4">
              {!hubCategories.some((c) => c.id === activeTab) && activeTab !== "members" && activeTab !== "bible_studies" && !selectedPost && (
                <button
                  type="button"
                  onClick={() => setShowPostComposerModal(true)}
                  className="w-full bg-white border border-[#d4ecd4] rounded-2xl px-4 py-4 shadow-sm hover:shadow-md transition text-left relative overflow-hidden"
                >
                  <span className="absolute right-4 top-4 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#8ccf98] opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#4a9b6f]" />
                  </span>
                  <div className="flex items-center gap-3">
                    {userProfileImage ? (
                      <img src={userProfileImage} alt={displayName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: userId ? avatarColor(userId) : "#aaa" }}>
                        {getInitial(displayName)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">Share something with the group</p>
                      <p className="text-sm text-gray-400 mt-1">Add a title, write your post, and start the conversation...</p>
                    </div>
                  </div>
                </button>
              )}
              {renderPosts()}
            </div>
          )}

        </div>}
      </div>

      {activeFeedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in"
          onClick={() => {
            setSelectedFeedPost(null);
            setDeepLinkedCommentId(null);
          }}
        >
          <div
            className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto modal-panel-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[#efe5d9]">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900 text-sm">
                    {activeFeedPost.display_name || "Buddy"}
                  </p>
                  <UserBadge customBadge={activeFeedPost.member_badge} isPaid={activeFeedPost.is_paid} groupRole={activeFeedPost.role} />
                  <span className="text-xs text-gray-400">{timeAgo(activeFeedPost.created_at)}</span>
                </div>
                {activeFeedPost.title && (
                  <h2 className="text-xl font-bold text-gray-900 mt-2 leading-snug">{activeFeedPost.title}</h2>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedFeedPost(null);
                  setDeepLinkedCommentId(null);
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition flex-shrink-0"
              >
                ×
              </button>
            </div>

            <div className="px-6 py-5">
              {!activeFeedTriviaSet && activeFeedPost.content && (
                <div
                  className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: activeFeedPost.content }}
                />
              )}
              {activeFeedTriviaSet && (
                <GroupWeeklyTriviaCard triviaSet={activeFeedTriviaSet} userId={userId} />
              )}

              {activeFeedPost.media_url && isUploadedVideo(activeFeedPost.media_url) && (
                <video
                  src={activeFeedPost.media_url}
                  controls
                  playsInline
                  className="mt-4 w-full rounded-2xl bg-black"
                  style={{ maxHeight: "520px" }}
                />
              )}

              {activeFeedPost.media_url && !isUploadedVideo(activeFeedPost.media_url) && (
                <button
                  type="button"
                  onClick={() => setLightboxUrl(activeFeedPost.media_url!)}
                  className="mt-4 w-full block rounded-2xl overflow-hidden focus:outline-none"
                >
                  <img
                    src={activeFeedPost.media_url}
                    alt="Post image"
                    className="w-full object-contain rounded-2xl"
                    style={{ maxHeight: "520px", objectPosition: "center" }}
                  />
                </button>
              )}

              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => void handleLike(activeFeedPost)}
                  disabled={likeLoading.has(activeFeedPost.id)}
                  className="flex items-center gap-1.5 text-sm transition"
                  style={{ color: activeFeedPost.liked ? "#e53e3e" : "#9ca3af" }}
                >
                  <svg className="w-4 h-4" fill={activeFeedPost.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{activeFeedPost.like_count > 0 ? activeFeedPost.like_count : ""}</span>
                </button>
                <button
                  type="button"
                  onClick={() => void openPostLikes(activeFeedPost)}
                  className="text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  {activeFeedPost.like_count === 1 ? "1 like" : `${activeFeedPost.like_count || 0} likes`}
                </button>
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{activeFeedPost.comment_count || 0}</span>
                  <span>Comments</span>
                </div>
              </div>

              {userId && (
                <div className="mt-5">
                  <GroupCommentSection
                    groupId={groupId}
                    post={activeFeedPost}
                    userId={userId}
                    displayName={displayName}
                    userProfileImage={userProfileImage}
                    currentUserRole={userRole}
                    currentUserBadge={userMemberBadge}
                    targetCommentId={deepLinkedCommentId}
                    onCountChange={(delta) => {
                      setSelectedFeedPost((prev) => prev ? { ...prev, comment_count: Math.max((prev.comment_count || 0) + delta, 0) } : prev);
                      setPosts((prev) => prev.map((item) => item.id === activeFeedPost.id ? { ...item, comment_count: Math.max((item.comment_count || 0) + delta, 0) } : item));
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showHubLikesFor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in"
          onClick={() => setShowHubLikesFor(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-xl w-full max-w-sm max-h-[80vh] overflow-y-auto modal-panel-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Liked By</p>
                <h3 className="text-base font-bold text-gray-900 mt-1">{showHubLikesFor.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHubLikesFor(null)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
              >
                ×
              </button>
            </div>
            <div className="px-5 py-4">
              {(hubItemStats[showHubLikesFor.path]?.likers || []).length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No likes yet.</p>
              ) : (
                <div className="space-y-3">
                  {(hubItemStats[showHubLikesFor.path]?.likers || []).map((liker) => (
                    <div key={liker.user_id} className="flex items-center gap-3">
                      <Link href={`/profile/${liker.user_id}`} className="flex items-center gap-3 min-w-0">
                        {liker.profile_image_url ? (
                          <img src={liker.profile_image_url} alt={liker.display_name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: avatarColor(liker.user_id) }}>
                            {getInitial(liker.display_name)}
                          </div>
                        )}
                      </Link>
                      <div className="flex flex-wrap items-center gap-2 min-w-0">
                        <Link href={`/profile/${liker.user_id}`} className="text-sm font-medium text-gray-900 hover:underline">
                          {liker.display_name}
                        </Link>
                        <UserBadge customBadge={liker.member_badge} isPaid={liker.is_paid} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showPostLikesFor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in"
          onClick={() => setShowPostLikesFor(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-xl w-full max-w-sm max-h-[80vh] overflow-y-auto modal-panel-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Liked By</p>
                <h3 className="text-base font-bold text-gray-900 mt-1">{showPostLikesFor.title || "Post Likes"}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPostLikesFor(null)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
              >
                ×
              </button>
            </div>
            <div className="px-5 py-4">
              {loadingPostLikers ? (
                <p className="text-sm text-gray-400 text-center py-6">Loading likes...</p>
              ) : postLikers.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No likes yet.</p>
              ) : (
                <div className="space-y-3">
                  {postLikers.map((liker) => (
                    <div key={liker.user_id} className="flex items-center gap-3">
                      <Link href={`/profile/${liker.user_id}`} className="flex items-center gap-3 min-w-0">
                        {liker.profile_image_url ? (
                          <img src={liker.profile_image_url} alt={liker.display_name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: avatarColor(liker.user_id) }}>
                            {getInitial(liker.display_name)}
                          </div>
                        )}
                      </Link>
                      <div className="flex flex-wrap items-center gap-2 min-w-0">
                        <Link href={`/profile/${liker.user_id}`} className="text-sm font-medium text-gray-900 hover:underline">
                          {liker.display_name}
                        </Link>
                        <UserBadge customBadge={liker.member_badge} isPaid={liker.is_paid} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Group post composer */}
      {activeTab !== "members" && activeTab !== "bible_studies" && !hubCategories.some((c) => c.id === activeTab) && !selectedPost && (
        <>
          {showPostComposerModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in" onClick={() => setShowPostComposerModal(false)}>
              <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto modal-panel-in" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#efe5d9]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: SAGE }}>Bible Buddy Study Group</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-1">Create a Post</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPostComposerModal(false);
                      resetPostComposer();
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
                  >
                    ×
                  </button>
                </div>

                <div className="px-6 py-5 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Title</label>
                    <input
                      type="text"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      placeholder="Add a title for your post"
                      className="w-full rounded-2xl border border-[#ead8c4] bg-[#fffaf4] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d6b18b]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Message</label>
                    <div className="rounded-3xl border border-[#ead8c4] overflow-hidden bg-[#fffaf4]">
                      <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-[#efe5d9] bg-[#fffdf9]">
                        <button type="button" onMouseDown={runPostEditorCommand(() => postEditor?.chain().focus().toggleBold().run() ?? false)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${postEditor?.isActive("bold") ? "bg-[#dff0df] text-[#4f7e54]" : "bg-white text-gray-600 border border-[#d4ecd4]"}`}>Bold</button>
                        <button type="button" onMouseDown={runPostEditorCommand(() => postEditor?.chain().focus().toggleItalic().run() ?? false)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${postEditor?.isActive("italic") ? "bg-[#dff0df] text-[#4f7e54]" : "bg-white text-gray-600 border border-[#d4ecd4]"}`}>Italic</button>
                        <button type="button" onMouseDown={runPostEditorCommand(() => postEditor?.chain().focus().toggleHeading({ level: 1 }).run() ?? false)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${postEditor?.isActive("heading", { level: 1 }) ? "bg-[#dff0df] text-[#4f7e54]" : "bg-white text-gray-600 border border-[#d4ecd4]"}`}>H1</button>
                        <button type="button" onMouseDown={runPostEditorCommand(() => postEditor?.chain().focus().toggleHeading({ level: 2 }).run() ?? false)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${postEditor?.isActive("heading", { level: 2 }) ? "bg-[#dff0df] text-[#4f7e54]" : "bg-white text-gray-600 border border-[#d4ecd4]"}`}>H2</button>
                        <button type="button" onMouseDown={runPostEditorCommand(() => postEditor?.chain().focus().toggleBulletList().run() ?? false)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${postEditor?.isActive("bulletList") ? "bg-[#dff0df] text-[#4f7e54]" : "bg-white text-gray-600 border border-[#d4ecd4]"}`}>List</button>
                      </div>
                      <EditorContent editor={postEditor} />
                    </div>
                  </div>

                  <input
                    ref={groupPhotoInputRef}
                    type="file"
                    accept="image/*"
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
                  <input
                    ref={groupVideoInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 52428800) {
                        setComposerUploadError("Video must be under 50 MB.");
                        return;
                      }
                      if (composerVideoPreview) URL.revokeObjectURL(composerVideoPreview);
                      setComposerVideoFile(file);
                      setComposerVideoPreview(URL.createObjectURL(file));
                      setComposerVideoDurationError(false);
                      setComposerUploadError(null);
                      setComposerMode("video");
                    }}
                  />

                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={() => groupPhotoInputRef.current?.click()} className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${composerMode === "photo" ? "bg-green-100 text-green-700 border-green-200" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>Add Photo</button>
                    <button type="button" onClick={() => groupVideoInputRef.current?.click()} className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${composerMode === "video" ? "bg-green-100 text-green-700 border-green-200" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}>Add Video</button>
                  </div>

                  {composerMode === "photo" && composerPhotoPreview && (
                    <div className="relative inline-block">
                      <img src={composerPhotoPreview} alt="Preview" className="h-24 rounded-2xl object-cover border border-[#ead8c4]" />
                      <button
                        type="button"
                        onClick={() => { setComposerPhotoFile(null); setComposerPhotoPreview(null); setComposerMode("text"); }}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-700 text-white text-xs"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {composerMode === "video" && composerVideoPreview && (
                    <div className="relative">
                      <video
                        src={composerVideoPreview}
                        controls
                        playsInline
                        className="w-full rounded-2xl border border-[#ead8c4]"
                        style={{ maxHeight: "240px" }}
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
                        type="button"
                        onClick={() => {
                          if (composerVideoPreview) URL.revokeObjectURL(composerVideoPreview);
                          setComposerVideoFile(null);
                          setComposerVideoPreview(null);
                          setComposerVideoDurationError(false);
                          setComposerUploadError(null);
                          setComposerMode("text");
                        }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/65 text-white text-sm"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {composerUploadError && <p className="text-sm text-red-500">{composerUploadError}</p>}

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPostComposerModal(false);
                        resetPostComposer();
                      }}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitPost}
                      disabled={submitting || (!stripHtml(postEditor?.getHTML() ?? "").length && !composerPhotoFile && !composerVideoFile)}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 transition"
                      style={{ backgroundColor: SAGE }}
                    >
                      {submitting ? "Posting..." : "Post to Group"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {/* â”€â”€ Comment input bar (post view) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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

      {/* â”€â”€ Photo lightbox â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
            âœ•
          </button>
          <img
            src={lightboxUrl}
            alt="Full size"
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* â”€â”€ New Series Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {showNewSeriesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in">
          <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto modal-panel-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">New Series</h2>
              <button onClick={() => setShowNewSeriesModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 text-xl">Ã—</button>
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

      {/* â”€â”€ New Post Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in">
          <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto modal-panel-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Add Week Post Â· Week {seriesPosts.length + 1}</h2>
              <button onClick={() => setShowNewPostModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 text-xl">Ã—</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                <input
                  type="text"
                  value={newSeriesPostTitle}
                  onChange={(e) => setNewSeriesPostTitle(e.target.value)}
                  placeholder={`Week ${seriesPosts.length + 1} â€” `}
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

      {showMembersActivityModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in"
          onClick={() => setShowMembersActivityModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto modal-panel-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: SAGE }}>Bible Study Group</p>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">Buddies Activity</h2>
                  <p className="text-sm text-gray-500 mt-1">Recent activity from your Bible study buddies.</p>
                </div>
                <button
                  onClick={() => setShowMembersActivityModal(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition text-xl"
                >
                  ×
                </button>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    setShowMembersActivityModal(false);
                    setActiveTab("members");
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: SAGE }}
                >
                  View All Buddies
                </button>
                <button
                  onClick={() => void loadMembersActivity()}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Refresh
                </button>
              </div>
            </div>
            <div className="px-5 py-4">
                    {loadingMembersActivity ? (
                <p className="text-sm text-gray-400 text-center py-8">Loading buddy activity...</p>
              ) : membersActivityError ? (
                <div className="text-center py-8 space-y-2">
                  <p className="text-sm text-gray-500">{membersActivityError}</p>
                  <p className="text-xs text-gray-400">Try refreshing in a moment. This feed now pulls straight from the shared activity log on the server.</p>
                </div>
              ) : membersActivity.length === 0 ? (
                <div className="text-center py-8 space-y-2">
                  <p className="text-sm text-gray-500">No recent buddy activity yet.</p>
                  <p className="text-xs text-gray-400">This list pulls from your shared activity log, so older and new Bible Buddy actions will appear here as your group keeps moving.</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  {membersActivity.map((activity, index) => (
                    <div
                      key={`${activity.user_id}-${activity.created_at}-${index}`}
                      className={`px-4 py-4 ${index > 0 ? "border-t border-gray-100" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <Link href={`/profile/${activity.user_id}`} className="flex-shrink-0">
                          {activity.profile_image_url ? (
                            <img src={activity.profile_image_url} alt={activity.display_name} className="w-11 h-11 rounded-full object-cover hover:opacity-80 transition" />
                          ) : (
                            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold hover:opacity-80 transition" style={{ backgroundColor: avatarColor(activity.user_id) }}>
                              {getInitial(activity.display_name)}
                            </div>
                          )}
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <Link href={`/profile/${activity.user_id}`} className="text-sm font-semibold text-gray-900 hover:underline truncate">
                              {activity.display_name}
                            </Link>
                            <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(activity.created_at)}</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed mt-1">{formatMemberActivityLine(activity)}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(activity.created_at).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!loadingMembersActivity && !membersActivityError && membersActivity.length > 0 && membersActivityHasMore && (
                <div className="mt-3">
                  {membersActivityHasMore && (
                    <button
                      type="button"
                      onClick={() => void loadMembersActivity(false)}
                      disabled={loadingMoreMembersActivity}
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
                    >
                      {loadingMoreMembersActivity ? "Loading more activity..." : "Load 10 More"}
                    </button>
                  )}
                </div>
              )}
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
                Ã—
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
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Buddies</p>
                  <p className="text-sm text-gray-900 mt-1">{group.member_count === 1 ? "1 buddy" : `${group.member_count || 0} buddies`}</p>
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
                    setShowMembersActivityModal(true);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: SAGE }}
                >
                  Buddies Activity
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

  // â”€â”€ Chat renderPosts helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        {posts.map((post) => {
          const hasImagePost = Boolean(post.media_url && !isUploadedVideo(post.media_url) && !post.link_url);
          const triviaSet = weeklyTriviaByPostId[post.id];
          return (
          <div
            key={post.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedFeedPost(post)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedFeedPost(post);
              }
            }}
            className="w-full text-left transition cursor-pointer bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md"
          >
            <div>
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
                    {post.display_name || "Buddy"}
                  </Link>
                  <UserBadge customBadge={post.member_badge} isPaid={post.is_paid} groupRole={post.role} />
                  <span className="text-xs text-gray-400">{timeAgo(post.created_at)}</span>
                </div>
              </div>
              {(userId === post.user_id || isLeaderOrMod) && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePostMenuId(activePostMenuId === post.id ? null : post.id);
                    }}
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
                        onClick={(e) => {
                          e.stopPropagation();
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
            {post.title && <h3 className={`font-bold text-gray-900 leading-snug ${hasImagePost ? "text-base mt-3" : "text-lg mt-3"}`}>{post.title}</h3>}
            {!triviaSet && post.content && (
              <p className={`text-sm text-gray-700 mt-3 leading-relaxed ${hasImagePost ? "whitespace-pre-wrap" : "truncate whitespace-nowrap"}`}>
                {getPostPreviewText(post.content)}
              </p>
            )}
            {triviaSet && (
              <div className="mt-3">
                <GroupWeeklyTriviaCard triviaSet={triviaSet} userId={userId} />
              </div>
            )}
            {post.media_url && isUploadedVideo(post.media_url) && (
              <video
                src={post.media_url}
                controls
                playsInline
                className="mt-3 w-full rounded-xl"
                style={{ maxHeight: "400px" }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
            {post.media_url && !isUploadedVideo(post.media_url) && (
              <div
                className="mt-3 w-full block rounded-[22px] overflow-hidden bg-white"
                style={{ maxHeight: hasImagePost ? "560px" : "420px" }}
              >
                <img
                  src={post.media_url}
                  alt="Post image"
                  className="w-full object-contain"
                  style={{ maxHeight: hasImagePost ? "560px" : "420px", objectPosition: "center" }}
                />
              </div>
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
                <a href={post.link_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="mt-3 flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                  <span className="text-xl">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700">{meta.label}</p>
                    <p className="text-xs text-gray-400 truncate">{post.link_url}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              );
            })()}
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  void handleLike(post);
                }}
                disabled={likeLoading.has(post.id)}
                className="flex items-center gap-1.5 text-sm transition"
                style={{ color: post.liked ? "#e53e3e" : "#9ca3af" }}
              >
                <svg className="w-4 h-4" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  void openPostLikes(post);
                }}
                className="text-sm text-gray-500 hover:text-gray-700 transition"
              >
                {post.like_count === 1 ? "1 like" : `${post.like_count || 0} likes`}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFeedPost(post);
                }}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#b7794d] transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{post.comment_count || 0}</span>
                <span>Comments</span>
              </button>
            </div>
            </div>
          </div>
        )})}
      </div>
    );
  }
}


