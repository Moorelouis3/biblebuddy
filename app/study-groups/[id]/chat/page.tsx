"use client";

import dynamic from "next/dynamic";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ReactMarkdown from "react-markdown";
import { useEffect, useState, useRef, type MouseEvent } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../lib/supabaseClient";
import { HOME_FEED_COVER_MARKER } from "@/lib/groupFeedCarouselScheduler";
import { HUB_CONTENT, type HubItemStatic } from "@/lib/hubContent";
import { logActionToMasterActions } from "@/lib/actionRecorder";
import { TOTAL_WEEKS, getSeriesWeekLesson } from "@/lib/seriesContent";
import { parseWeeklyTriviaQuestions } from "@/lib/groupWeeklyTrivia";
import { parseWeeklyPollOptions, type WeeklyGroupPollRecord } from "@/lib/groupWeeklyPoll";
import type { WeeklyGroupQuestionRecord } from "@/lib/groupWeeklyQuestion";
import { calculateStreakFromActions } from "@/lib/profileStats";
import UserBadge from "@/components/UserBadge";
import { LouisAvatar } from "@/components/LouisAvatar";
import StreakFlameBadge from "@/components/StreakFlameBadge";
import { enrichBibleVerses } from "@/lib/bibleHighlighting";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { BIBLE_PEOPLE_LIST } from "@/lib/biblePeopleList";
import {
  linkMentionItemsInHtml,
  loadGroupPostMentions,
  type MentionCatalogItem,
} from "@/lib/groupPostMentions";

const WeekLessonPage = dynamic(() => import("../series/week/[weekNum]/page"), { ssr: false });
const GroupWeeklyPollCard = dynamic(() => import("@/components/GroupWeeklyPollCard"), { ssr: false });
const GroupWeeklyTriviaCard = dynamic(() => import("@/components/GroupWeeklyTriviaCard"), { ssr: false });
const GroupWeeklyQuestionCard = dynamic(() => import("@/components/GroupWeeklyQuestionCard"), { ssr: false });
const UpgradeRequiredModal = dynamic(() => import("@/components/UpgradeRequiredModal"), { ssr: false });
const CreditLimitModal = dynamic(() => import("@/components/CreditLimitModal"), { ssr: false });
const PostMentionSuggestions = dynamic(() => import("@/components/PostMentionSuggestions"), { ssr: false });

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
  current_streak?: number | null;
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
  current_streak?: number | null;
}

interface Member {
  user_id: string;
  display_name: string;
  role: string;
  profile_image_url: string | null;
  member_badge?: string | null;
  is_paid?: boolean;
  current_streak?: number | null;
}

interface TopBuddy {
  rank: number;
  userId: string;
  displayName: string;
  profileImageUrl: string | null;
  memberBadge: string | null;
  isPaid: boolean;
  currentStreak?: number | null;
  posts: number;
  comments: number;
  likes: number;
  score: number;
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

interface WeeklyGroupQuestionFeedSet extends WeeklyGroupQuestionRecord {}

interface WeeklyGroupPollFeedSet extends WeeklyGroupPollRecord {
  vote_counts: Record<string, number>;
  total_votes: number;
  current_user_vote: string | null;
}

interface ArticleLikeUser {
  user_id: string;
  display_name: string;
  profile_image_url: string | null;
  member_badge?: string | null;
  is_paid?: boolean;
  current_streak?: number | null;
}

interface DevotionalPreview {
  id: string;
  title: string;
  description: string | null;
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
  current_streak?: number | null;
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

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
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

const HOME_FEED_CATEGORIES = [
  "general",
  "weekly_trivia",
  "weekly_poll",
  "weekly_question",
  "update_monday",
  "who_was_this_friday",
  "bible_study_saturday",
  "prayer_request_sunday",
] as const;

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function getPostPreviewText(html: string): string {
  const previewLines = stripHtml(html)
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 4);

  return previewLines.join("\n");
}

function isHomeFeedCoverPost(post: Pick<Post, "media_url" | "content">): boolean {
  return Boolean(post.media_url && post.content?.includes(HOME_FEED_COVER_MARKER));
}

function getRenderablePostContent(html: string): string {
  return linkBibleReferencesInHtml(html.replace(HOME_FEED_COVER_MARKER, "").trim());
}

function escapeHtmlAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function linkBibleReferencesInHtml(html: string) {
  return html.replace(
    /\b((?:[1-3]\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(\d+):(\d+)(?:-(\d+))?\b/g,
    (match) =>
      `<button type="button" class="scripture-ref-link inline font-semibold text-[#8d5d38] underline underline-offset-2" data-scripture-ref="${escapeHtmlAttribute(match)}">${match}</button>`,
  );
}

function parseBibleReference(reference: string) {
  const match = reference.match(/^((?:[1-3]\s+)?[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(\d+):?/);
  if (!match) return null;

  const book = match[1].trim();
  const chapter = Number(match[2]);
  if (!book || Number.isNaN(chapter)) return null;

  return { book, chapter };
}

function normalizePersonMarkdown(markdown: string) {
  return markdown
    .replace(/^\s*[-â€¢*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizePlaceMarkdown(markdown: string) {
  return markdown
    .replace(/^\s*[-â€¢*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeKeywordMarkdown(markdown: string) {
  return markdown
    .replace(/^\s*[-â€¢*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [savingCommentId, setSavingCommentId] = useState<string | null>(null);

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
        .select("user_id, profile_image_url, is_paid, member_badge, current_streak")
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
    const badgeMap: Record<string, { is_paid: boolean; member_badge: string | null; current_streak: number | null }> = {};
    const roleMap: Record<string, string> = {};
    (profiles || []).forEach((profile: any) => {
      imageMap[profile.user_id] = profile.profile_image_url ?? null;
      badgeMap[profile.user_id] = {
        is_paid: !!profile.is_paid,
        member_badge: profile.member_badge ?? null,
        current_streak: profile.current_streak ?? null,
      };
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
        current_streak: badgeMap[row.user_id]?.current_streak ?? null,
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

  function canEditComment(comment: GroupFeedComment) {
    return comment.user_id === userId;
  }

  async function handleSaveCommentEdit(comment: GroupFeedComment) {
    const nextContent = editingCommentText.trim();
    if (!nextContent || savingCommentId) return;

    setSavingCommentId(comment.id);
    setSubmitError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch(`/api/groups/${groupId}/edit-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          postId: comment.id,
          content: nextContent,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not save your comment.");
      }

      setComments((prev) => prev.map((item) => (
        item.id === comment.id
          ? { ...item, content: payload.post?.content ?? nextContent }
          : item
      )));
      setEditingCommentId(null);
      setEditingCommentText("");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not save your comment.");
    }

    setSavingCommentId(null);
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
              <StreakFlameBadge currentStreak={comment.current_streak} />
              <UserBadge customBadge={comment.member_badge} isPaid={comment.is_paid} groupRole={comment.role} />
            </div>
            {editingCommentId === comment.id ? (
              <div className="mt-2 space-y-2">
                <textarea
                  value={editingCommentText}
                  onChange={(e) => setEditingCommentText(e.target.value)}
                  rows={3}
                  className="w-full rounded-2xl border border-[#ead8c4] bg-[#fffaf4] px-3 py-2 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-[#d6b18b] resize-none"
                />
            <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => void handleSaveCommentEdit(comment)}
                    disabled={savingCommentId === comment.id || !editingCommentText.trim()}
                    className="rounded-xl px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                    style={{ backgroundColor: "#5a9a5a" }}
                  >
                    {savingCommentId === comment.id ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditingCommentText("");
                    }}
                    className="rounded-xl px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-700 mt-0.5 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
            )}
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
            {canEditComment(comment) && editingCommentId !== comment.id && (
              <button
                type="button"
                onClick={() => {
                  setEditingCommentId(comment.id);
                  setEditingCommentText(comment.content);
                  setReplyingTo(null);
                  setReplyText("");
                }}
                className="text-[10px] text-gray-400 hover:text-[#4a9b6f] font-semibold transition"
              >
                Edit
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

function sortPinnedPostsFirst<T extends { is_pinned: boolean; created_at: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
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
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("member");
  const [displayName, setDisplayName] = useState<string>("");
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [userBio, setUserBio] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [userIsPaid, setUserIsPaid] = useState(false);
  const [userMemberBadge, setUserMemberBadge] = useState<string | null>(null);
  const [userCurrentStreak, setUserCurrentStreak] = useState<number | null>(null);
  const [pushSupported, setPushSupported] = useState(false);
  const [pushPermission, setPushPermission] = useState<NotificationPermission | "unsupported">("unsupported");
  const [pushSubscribed, setPushSubscribed] = useState(false);
  const [pushSetupLoading, setPushSetupLoading] = useState(false);
  const [pushSetupError, setPushSetupError] = useState<string | null>(null);
  const [pushDismissed, setPushDismissed] = useState(false);
  const [hideProfileSetupCard, setHideProfileSetupCard] = useState(false);
  const [hidePushSetupCard, setHidePushSetupCard] = useState(false);
  const [showDevotionalUpgradeModal, setShowDevotionalUpgradeModal] = useState(false);
  const [devotionalPreviews, setDevotionalPreviews] = useState<Record<string, DevotionalPreview>>({});
  const [updateFeatureIndex, setUpdateFeatureIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [showGroupInfoModal, setShowGroupInfoModal] = useState(false);
  const [selectedFeedPost, setSelectedFeedPost] = useState<Post | null>(null);
  const [selectedScripture, setSelectedScripture] = useState<{ reference: string; book: string; chapter: number } | null>(null);
  const [scriptureHtml, setScriptureHtml] = useState<string | null>(null);
  const [loadingScripture, setLoadingScripture] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<{ name: string } | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<{ name: string } | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<{ name: string } | null>(null);
  const [personNotes, setPersonNotes] = useState<string | null>(null);
  const [placeNotes, setPlaceNotes] = useState<string | null>(null);
  const [keywordNotes, setKeywordNotes] = useState<string | null>(null);
  const [completedPeople, setCompletedPeople] = useState<Set<string>>(new Set());
  const [viewedPeople, setViewedPeople] = useState<Set<string>>(new Set());
  const [completedPlaces, setCompletedPlaces] = useState<Set<string>>(new Set());
  const [viewedPlaces, setViewedPlaces] = useState<Set<string>>(new Set());
  const [completedKeywords, setCompletedKeywords] = useState<Set<string>>(new Set());
  const [viewedKeywords, setViewedKeywords] = useState<Set<string>>(new Set());
  const [personCreditBlocked, setPersonCreditBlocked] = useState(false);
  const [placeCreditBlocked, setPlaceCreditBlocked] = useState(false);
  const [keywordCreditBlocked, setKeywordCreditBlocked] = useState(false);

  // Chat posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [weeklyPollByPostId, setWeeklyPollByPostId] = useState<Record<string, WeeklyGroupPollFeedSet>>({});
  const [weeklyTriviaByPostId, setWeeklyTriviaByPostId] = useState<Record<string, WeeklyGroupTriviaFeedSet>>({});
  const [weeklyQuestionByPostId, setWeeklyQuestionByPostId] = useState<Record<string, WeeklyGroupQuestionFeedSet>>({});
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [showPostComposerModal, setShowPostComposerModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [likeLoading, setLikeLoading] = useState<Set<string>>(new Set());
  const [activePostMenuId, setActivePostMenuId] = useState<string | null>(null);
  const [editingFeedPost, setEditingFeedPost] = useState<Post | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [deletingPost, setDeletingPost] = useState(false);
  const [pinningPostId, setPinningPostId] = useState<string | null>(null);

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
  const [mentionItems, setMentionItems] = useState<MentionCatalogItem[]>([]);
  const groupPhotoInputRef = useRef<HTMLInputElement>(null);
  const groupVideoInputRef = useRef<HTMLInputElement>(null);
  const scriptureContainerRef = useRef<HTMLDivElement>(null);

  function handleScriptureClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement | null;
    const scriptureButton = target?.closest(".scripture-ref-link") as HTMLElement | null;
    if (!scriptureButton) return;

    event.preventDefault();
    event.stopPropagation();

    const reference = scriptureButton.dataset.scriptureRef;
    if (!reference) return;

    const parsed = parseBibleReference(reference);
    if (!parsed) return;

    setSelectedScripture({
      reference,
      book: parsed.book,
      chapter: parsed.chapter,
    });
  }

  useEffect(() => {
    let cancelled = false;

    async function loadScriptureSelection() {
      if (!selectedScripture) {
        setScriptureHtml(null);
        return;
      }

      try {
        setLoadingScripture(true);
        setScriptureHtml(null);

        const normalizedRef = selectedScripture.reference.replace(/\s+/g, "+");
        const response = await fetch(`https://bible-api.com/${normalizedRef}`);
        if (!response.ok) throw new Error("Could not load Bible verses.");
        const payload = await response.json();
        const verses = Array.isArray(payload?.verses) ? payload.verses : [];
        const enriched = await enrichBibleVerses(verses);

        if (!cancelled) setScriptureHtml(enriched);
      } catch {
        if (!cancelled) setScriptureHtml("<p>Could not load this verse right now.</p>");
      } finally {
        if (!cancelled) setLoadingScripture(false);
      }
    }

    void loadScriptureSelection();
    return () => {
      cancelled = true;
    };
  }, [selectedScripture]);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    async function loadBiblePopupProgress() {
      try {
        const [peopleResult, placesResult, keywordsResult] = await Promise.all([
          supabase.from("people_progress").select("person_name").eq("user_id", userId),
          supabase.from("places_progress").select("place_name").eq("user_id", userId),
          supabase.from("keywords_progress").select("keyword_name").eq("user_id", userId),
        ]);

        if (cancelled) return;

        const nextCompletedPeople = new Set<string>();
        (peopleResult.data || []).forEach((row: { person_name: string | null }) => {
          nextCompletedPeople.add(String(row.person_name || "").toLowerCase().trim());
        });
        setCompletedPeople(nextCompletedPeople);

        const nextCompletedPlaces = new Set<string>();
        (placesResult.data || []).forEach((row: { place_name: string | null }) => {
          nextCompletedPlaces.add(String(row.place_name || "").toLowerCase().trim());
        });
        setCompletedPlaces(nextCompletedPlaces);

        const nextCompletedKeywords = new Set<string>();
        (keywordsResult.data || []).forEach((row: { keyword_name: string | null }) => {
          nextCompletedKeywords.add(String(row.keyword_name || "").toLowerCase().trim());
        });
        setCompletedKeywords(nextCompletedKeywords);
      } catch (progressError) {
        console.error("[GROUP_CHAT] Could not load Bible popup progress:", progressError);
      }
    }

    void loadBiblePopupProgress();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (!scriptureHtml) return undefined;

    const handler = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const highlightElement = target?.closest(".bible-highlight") as HTMLElement | null;
      if (!highlightElement) return;

      event.preventDefault();
      event.stopPropagation();

      const type = highlightElement.dataset.type;
      const term = highlightElement.dataset.term;
      if (!type || !term) return;

      if (type === "people") {
        setSelectedPerson({ name: term });
        setSelectedPlace(null);
        setSelectedKeyword(null);
      } else if (type === "places") {
        setSelectedPlace({ name: term });
        setSelectedPerson(null);
        setSelectedKeyword(null);
      } else if (type === "keywords") {
        setSelectedKeyword({ name: term });
        setSelectedPerson(null);
        setSelectedPlace(null);
      }
    };

    const attachHandler = () => {
      const container = scriptureContainerRef.current;
      if (container) {
        container.addEventListener("click", handler, true);
        return true;
      }
      return false;
    };

    let timeout: NodeJS.Timeout | null = null;
    const attached = attachHandler();
    if (!attached) {
      timeout = setTimeout(() => {
        attachHandler();
      }, 100);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      const container = scriptureContainerRef.current;
      if (container) {
        container.removeEventListener("click", handler, true);
      }
    };
  }, [scriptureHtml]);

  useEffect(() => {
    if (!selectedPerson) {
      setPersonNotes(null);
      setPersonCreditBlocked(false);
      return;
    }

    const selectedPersonName = selectedPerson.name;

    async function loadPersonNotes() {
      setPersonNotes(null);
      setPersonCreditBlocked(false);

      try {
        const clickedTerm = selectedPersonName;
        let primaryName = clickedTerm;

        for (const person of BIBLE_PEOPLE_LIST) {
          if (person.aliases?.some((alias) => alias.toLowerCase().trim() === clickedTerm.toLowerCase().trim())) {
            primaryName = person.name;
            break;
          }
          if (person.name.toLowerCase().trim() === clickedTerm.toLowerCase().trim()) {
            primaryName = person.name;
            break;
          }
        }

        const personNameKey = primaryName.toLowerCase().trim();
        const isCompleted = completedPeople.has(personNameKey);
        const isViewed = viewedPeople.has(personNameKey);

        if (userId && !isCompleted && !isViewed) {
          const creditResponse = await fetch("/api/consume-credit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ actionType: ACTION_TYPE.person_viewed }),
          });

          if (!creditResponse.ok) {
            setPersonCreditBlocked(true);
            return;
          }

          const creditResult = (await creditResponse.json()) as { ok: boolean };
          if (!creditResult.ok) {
            setPersonCreditBlocked(true);
            return;
          }

          setViewedPeople((prev) => new Set(prev).add(personNameKey));
        }

        const { data: existing, error: existingError } = await supabase
          .from("bible_people_notes")
          .select("notes_text")
          .eq("person_name", personNameKey)
          .maybeSingle();

        if (existingError && existingError.code !== "PGRST116") {
          console.error("Error checking existing person notes:", existingError);
        }

        if (existing?.notes_text?.trim()) {
          setPersonNotes(existing.notes_text);
          return;
        }

        const isFemale = /^(Mary|Martha|Sarah|Ruth|Esther|Deborah|Hannah|Leah|Rachel|Rebekah|Eve|Delilah|Bathsheba|Jezebel|Lydia|Phoebe|Priscilla|Anna|Elizabeth|Joanna|Susanna|Judith|Vashti|Bernice|Drusilla|Euodia|Syntyche|Chloe|Nympha|Tryphaena|Tryphosa|Julia|Claudia|Persis)/i.test(primaryName);
        const pronoun = isFemale ? "Her" : "Him";
        const whoPronoun = isFemale ? "She" : "He";

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `You are Little Louis. Generate Bible study style notes for ${primaryName} from Scripture using the EXACT markdown structure below.

CRITICAL RENDERING RULES (MANDATORY):
- Use ONLY markdown
- Use SINGLE # for all section headers
- INSERT TWO FULL LINE BREAKS AFTER EVERY SECTION
- INSERT TWO FULL LINE BREAKS AFTER EVERY PARAGRAPH GROUP
- DO NOT use markdown bullet characters (*, -, â€¢)
- Use EMOJIS as bullets instead
- Emojis must start each bullet line
- No hyphens anywhere
- No compact spacing
- Spacing matters more than word count

The person's name is already shown in the UI. DO NOT include their name as a header.

---

TEMPLATE (FOLLOW EXACTLY):

# ðŸ‘¤ Who ${whoPronoun} Is

Write two short paragraphs explaining who this person is.



# ðŸ“– Their Role in the Story

Write two to three short paragraphs explaining what role this person plays in the biblical narrative.



# ðŸ”¥ Key Moments

ðŸ”¥ Short sentence describing a key moment.

ðŸ”¥ Short sentence describing a key moment.

ðŸ”¥ Short sentence describing a key moment.

ðŸ”¥ Short sentence describing a key moment.



# ðŸ“ Where You Find ${pronoun}

ðŸ“– Book Chapter range

ðŸ“– Book Chapter range

ðŸ“– Book Chapter range



# ðŸŒ± Why This Person Matters

Write two to three short paragraphs explaining why this person is important and what we learn from them.



FINAL RULES:
- Every section must be separated by TWO blank lines
- Every paragraph block must be separated by TWO blank lines
- Do not compress content
- No lists without emojis
- Keep it cinematic, Bible study focused, and clear`,
              },
            ],
          }),
        });

        if (!response.ok) throw new Error(`Failed to generate notes: ${response.statusText}`);
        const json = await response.json();
        const generated = (json?.reply as string) ?? "";

        const { data: existingCheck } = await supabase
          .from("bible_people_notes")
          .select("notes_text")
          .eq("person_name", personNameKey)
          .maybeSingle();

        let notesText = "";
        if (existingCheck?.notes_text?.trim()) {
          notesText = existingCheck.notes_text;
        } else {
          await supabase
            .from("bible_people_notes")
            .upsert({ person_name: personNameKey, notes_text: generated }, { onConflict: "person_name" });

          const { data: finalData } = await supabase
            .from("bible_people_notes")
            .select("notes_text")
            .eq("person_name", personNameKey)
            .single();
          notesText = finalData?.notes_text || generated;
        }

        setPersonNotes(notesText);
      } catch (personError) {
        console.error("Error loading person notes:", personError);
      }
    }

    void loadPersonNotes();
  }, [selectedPerson, userId, completedPeople, viewedPeople]);

  useEffect(() => {
    if (!selectedPlace) {
      setPlaceNotes(null);
      setPlaceCreditBlocked(false);
      return;
    }

    const selectedPlaceName = selectedPlace.name;

    async function loadPlaceNotes() {
      setPlaceNotes(null);
      setPlaceCreditBlocked(false);

      try {
        const normalizedPlace = selectedPlaceName.toLowerCase().trim().replace(/\s+/g, "_");
        const isCompleted = completedPlaces.has(normalizedPlace);
        const isViewed = viewedPlaces.has(normalizedPlace);

        if (userId && !isCompleted && !isViewed) {
          const creditResponse = await fetch("/api/consume-credit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ actionType: ACTION_TYPE.place_viewed }),
          });

          if (!creditResponse.ok) {
            setPlaceCreditBlocked(true);
            return;
          }

          const creditResult = (await creditResponse.json()) as { ok: boolean };
          if (!creditResult.ok) {
            setPlaceCreditBlocked(true);
            return;
          }

          setViewedPlaces((prev) => new Set(prev).add(normalizedPlace));
        }

        const { data: existing } = await supabase
          .from("places_in_the_bible_notes")
          .select("notes_text")
          .eq("normalized_place", normalizedPlace)
          .maybeSingle();

        if (existing?.notes_text?.trim()) {
          setPlaceNotes(existing.notes_text);
          return;
        }

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `You are Little Louis.

Generate beginner friendly Bible notes about the PLACE: ${selectedPlaceName}.

Follow this EXACT markdown template and rules.

TEMPLATE:

# Where is this place?

One short paragraph explaining where ${selectedPlaceName} is located (region, country, significance) and why it matters in the Bible.



# What happens at ${selectedPlaceName}?

Include two or three specific Bible references where ${selectedPlaceName} appears. Each reference should include the book, chapter, and verse (e.g., "Genesis 12:1-9"). After each reference, write one sentence explaining what happens in that passage at ${selectedPlaceName}.



# Why is ${selectedPlaceName} significant?

List two or three key reasons why ${selectedPlaceName} matters in the Bible story. Each point should be one sentence. Keep it simple and beginner-friendly.



# How does ${selectedPlaceName} connect to Jesus?

One short paragraph connecting ${selectedPlaceName} to Jesus, prophecy, or the bigger story of redemption. Keep it simple and clear.



# What can we learn from ${selectedPlaceName}?

One short paragraph with a simple, practical life application related to place, journey, or God's presence.

RULES
DO NOT include a header like "${selectedPlaceName} Notes" or any title at the beginning. Start directly with "# Where is this place?".
Keep emojis in headers if helpful, but focus on clarity.
No images. No Greek or Hebrew words unless essential (and then explain simply).
Keep it cinematic, warm, simple. Do not overwhelm beginners.
Be accurate to Scripture.`,
              },
            ],
          }),
        });

        if (!response.ok) throw new Error(`Failed to generate notes: ${response.statusText}`);
        const json = await response.json();
        const generated = (json?.reply as string) ?? "";

        await supabase
          .from("places_in_the_bible_notes")
          .upsert({ place: selectedPlaceName, normalized_place: normalizedPlace, notes_text: generated }, { onConflict: "normalized_place" });

        setPlaceNotes(generated);
      } catch (placeError) {
        console.error("Error loading place notes:", placeError);
      }
    }

    void loadPlaceNotes();
  }, [selectedPlace, userId, completedPlaces, viewedPlaces]);

  useEffect(() => {
    if (!selectedKeyword) {
      setKeywordNotes(null);
      setKeywordCreditBlocked(false);
      return;
    }

    const selectedKeywordName = selectedKeyword.name;

    async function loadKeywordNotes() {
      setKeywordNotes(null);
      setKeywordCreditBlocked(false);

      try {
        const keywordKey = selectedKeywordName.toLowerCase().trim();
        const isCompleted = completedKeywords.has(keywordKey);
        const isViewed = viewedKeywords.has(keywordKey);

        if (userId && !isCompleted && !isViewed) {
          const creditResponse = await fetch("/api/consume-credit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ actionType: ACTION_TYPE.keyword_viewed }),
          });

          if (!creditResponse.ok) {
            setKeywordCreditBlocked(true);
            return;
          }

          const creditResult = (await creditResponse.json()) as { ok: boolean };
          if (!creditResult.ok) {
            setKeywordCreditBlocked(true);
            return;
          }

          setViewedKeywords((prev) => new Set(prev).add(keywordKey));
        }

        const { data: existingCheck, error: existingError } = await supabase
          .from("keywords_in_the_bible")
          .select("notes_text")
          .eq("keyword", keywordKey)
          .maybeSingle();

        if (existingError && existingError.code !== "PGRST116") {
          console.error("[keywords_in_the_bible] Error checking keywords_in_the_bible:", existingError);
        }

        if (existingCheck?.notes_text && existingCheck.notes_text.trim().length > 0) {
          setKeywordNotes(existingCheck.notes_text);
          return;
        }

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `You are Little Louis.

Generate beginner friendly Bible notes about the KEYWORD: ${selectedKeywordName}.

Follow this EXACT markdown template and rules.

TEMPLATE:

# ðŸ“– What This Keyword Means

(two short paragraphs)





# ðŸ” Where It Appears in Scripture

(two to three short paragraphs)





# ðŸ”‘ Key Verses Using This Keyword

ðŸ”¥ sentence  

ðŸ”¥ sentence  

ðŸ”¥ sentence  

ðŸ”¥ sentence  





# ðŸ“š Where You Find It in the Bible

ðŸ“– Book Chapterâ€“Chapter  

ðŸ“– Book Chapterâ€“Chapter  

ðŸ“– Book Chapterâ€“Chapter  





# ðŸŒ± Why This Keyword Matters

(two to three short paragraphs)



RULES:
- Use # for all section headers
- Double line breaks between sections
- No hyphens anywhere
- Use emoji bullets only
- No lists with dashes
- No meta commentary
- No deep theology
- Cinematic but simple
- Total length about 200â€“300 words
- Do NOT include the keyword name as a header`,
              },
            ],
          }),
        });

        if (!response.ok) throw new Error(`Failed to generate notes: ${response.statusText}`);
        const json = await response.json();
        const generated = (json?.reply as string) ?? "";

        await supabase
          .from("keywords_in_the_bible")
          .upsert({ keyword: selectedKeywordName, notes_text: generated }, { onConflict: "keyword" });

        const { data: finalData } = await supabase
          .from("keywords_in_the_bible")
          .select("notes_text")
          .eq("keyword", keywordKey)
          .single();

        setKeywordNotes(finalData?.notes_text || generated);
      } catch (keywordError) {
        console.error("Error loading keyword notes:", keywordError);
      }
    }

    void loadKeywordNotes();
  }, [selectedKeyword, userId, completedKeywords, viewedKeywords]);

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
  const [showTopBuddiesModal, setShowTopBuddiesModal] = useState(false);
  const [topBuddies, setTopBuddies] = useState<TopBuddy[]>([]);
  const [loadingTopBuddies, setLoadingTopBuddies] = useState(false);
  const MEMBERS_PAGE = 20;

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

  function getUpdateCardPushDismissKey(currentUserId: string) {
    return `bb:update-card-push-dismissed:${currentUserId}`;
  }

  function dismissUpdateCardPush() {
    if (!userId || typeof window === "undefined") return;
    window.localStorage.setItem(getUpdateCardPushDismissKey(userId), "1");
    setPushDismissed(true);
  }

  async function savePushSubscription(currentUserId: string, subscription: PushSubscription) {
    const json = subscription.toJSON();
    const p256dh = json.keys?.p256dh;
    const auth = json.keys?.auth;

    if (!p256dh || !auth) {
      throw new Error("Push subscription keys are missing.");
    }

    const { error } = await supabase
      .from("push_subscriptions")
      .upsert(
        {
          user_id: currentUserId,
          endpoint: subscription.endpoint,
          p256dh,
          auth,
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
          updated_at: new Date().toISOString(),
          last_seen_at: new Date().toISOString(),
        },
        { onConflict: "endpoint" },
      );

    if (error) {
      throw new Error(error.message || "Could not save push subscription.");
    }
  }

  async function ensurePushSubscription(currentUserId: string) {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidPublicKey) {
      throw new Error("Missing NEXT_PUBLIC_VAPID_PUBLIC_KEY.");
    }

    await navigator.serviceWorker.register("/service-worker.js");
    const worker = await navigator.serviceWorker.ready;
    let subscription = await worker.pushManager.getSubscription();

    if (!subscription) {
      subscription = await worker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
    }

    await savePushSubscription(currentUserId, subscription);
    setPushSubscribed(true);
  }

  async function handleEnableUpdateCardPush() {
    if (!userId) return;
    setPushSetupLoading(true);
    setPushSetupError(null);

    try {
      if (typeof window === "undefined" || !("Notification" in window)) {
        throw new Error("Push notifications are not supported on this device.");
      }

      const permission = await Notification.requestPermission();
      setPushPermission(permission);

      if (permission !== "granted") {
        throw new Error("Notifications were not allowed.");
      }

      await ensurePushSubscription(userId);
      dismissUpdateCardPush();
    } catch (error: any) {
      setPushSetupError(error?.message || "Could not enable push alerts.");
    } finally {
      setPushSetupLoading(false);
    }
  }

  async function openDevotionalFromFeature(title: "The Tempting of Jesus" | "The Testing of Joseph", paidOnly: boolean) {
    if (paidOnly && !userIsPaid) {
      setShowDevotionalUpgradeModal(true);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("devotionals")
        .select("id")
        .eq("title", title)
        .maybeSingle();

      if (error) {
        router.push("/devotionals");
        return;
      }

      if (data?.id) {
        router.push(`/devotionals/${data.id}`);
      } else {
        router.push("/devotionals");
      }
    } catch {
      router.push("/devotionals");
    }
  }

  function getDevotionalDescription(title: "The Tempting of Jesus" | "The Testing of Joseph", fallback: string) {
    return devotionalPreviews[title]?.description?.trim() || fallback;
  }

  function getDevotionalId(title: "The Tempting of Jesus" | "The Testing of Joseph") {
    return devotionalPreviews[title]?.id || null;
  }

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

  useEffect(() => {
    let cancelled = false;

    async function loadMentionItems() {
      if (!groupId) return;

      try {
        const items = await loadGroupPostMentions(supabase, groupId);
        if (!cancelled) setMentionItems(items);
      } catch (error) {
        console.error("Could not load mention items:", error);
      }
    }

    loadMentionItems();

    return () => {
      cancelled = true;
    };
  }, [groupId]);

  // â”€â”€ Auth + membership guard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    async function checkAccessAndLoad() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);
      setUserEmail(user.email ?? null);

      const [{ data: profile }, streakData] = await Promise.all([
        supabase
          .from("profile_stats")
          .select("display_name, username, profile_image_url, bio, location, is_paid, member_badge, current_streak")
          .eq("user_id", user.id)
          .maybeSingle(),
        calculateStreakFromActions(user.id),
      ]);
      const resolvedCurrentStreak = streakData.currentStreak ?? profile?.current_streak ?? null;
      setDisplayName(profile?.display_name || profile?.username || user.email?.split("@")[0] || "Buddy");
      setUserProfileImage(profile?.profile_image_url ?? null);
      setUserBio(profile?.bio ?? null);
      setUserLocation(profile?.location ?? null);
      setUserIsPaid(!!profile?.is_paid);
      setUserMemberBadge(profile?.member_badge ?? null);
      setUserCurrentStreak(resolvedCurrentStreak);

      if (profile && profile.current_streak !== resolvedCurrentStreak) {
        await supabase
          .from("profile_stats")
          .update({ current_streak: resolvedCurrentStreak })
          .eq("user_id", user.id);
      }

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

  useEffect(() => {
    if (!userId || userCurrentStreak == null) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.user_id === userId ? { ...post, current_streak: userCurrentStreak } : post,
      ),
    );
    setComments((prev) =>
      prev.map((comment) =>
        comment.user_id === userId ? { ...comment, current_streak: userCurrentStreak } : comment,
      ),
    );
    setMembers((prev) =>
      prev.map((member) =>
        member.user_id === userId ? { ...member, current_streak: userCurrentStreak } : member,
      ),
    );
    setPostLikers((prev) =>
      prev.map((liker) =>
        liker.user_id === userId ? { ...liker, current_streak: userCurrentStreak } : liker,
      ),
    );
    setSelectedFeedPost((prev) =>
      prev?.user_id === userId ? { ...prev, current_streak: userCurrentStreak } : prev,
    );
  }, [userCurrentStreak, userId]);

  useEffect(() => {
    const supported =
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window;
    setPushSupported(supported);
    setPushPermission(supported ? Notification.permission : "unsupported");
  }, []);

  useEffect(() => {
    if (!userId || typeof window === "undefined") return;
    setPushDismissed(window.localStorage.getItem(getUpdateCardPushDismissKey(userId)) === "1");
  }, [userId]);

  useEffect(() => {
    if (!pushSupported || !userId) return;

    let cancelled = false;

    async function loadPushState() {
      try {
        const worker = await navigator.serviceWorker.ready;
        const subscription = await worker.pushManager.getSubscription();
        if (!cancelled) {
          setPushPermission(Notification.permission);
          setPushSubscribed(!!subscription);
        }
      } catch {
        if (!cancelled) {
          setPushSubscribed(false);
        }
      }
    }

    void loadPushState();
    return () => {
      cancelled = true;
    };
  }, [pushSupported, userId]);

  useEffect(() => {
    const profileComplete = !!userProfileImage && !!userBio?.trim() && !!userLocation?.trim();
    if (!profileComplete) {
      setHideProfileSetupCard(false);
      return;
    }
    const timeout = window.setTimeout(() => setHideProfileSetupCard(true), 220);
    return () => window.clearTimeout(timeout);
  }, [userProfileImage, userBio, userLocation]);

  useEffect(() => {
    const pushComplete = pushSupported && (pushPermission === "granted" && pushSubscribed || pushDismissed);
    if (!pushComplete) {
      setHidePushSetupCard(false);
      return;
    }
    const timeout = window.setTimeout(() => setHidePushSetupCard(true), 220);
    return () => window.clearTimeout(timeout);
  }, [pushSupported, pushPermission, pushSubscribed, pushDismissed]);

  useEffect(() => {
    let cancelled = false;

    async function loadDevotionalPreviews() {
      try {
        const { data, error } = await supabase
          .from("devotionals")
          .select("id, title, description")
          .in("title", ["The Tempting of Jesus", "The Testing of Joseph"]);

        if (error || !data || cancelled) return;

        const next: Record<string, DevotionalPreview> = {};
        for (const item of data) {
          next[item.title] = item as DevotionalPreview;
        }
        setDevotionalPreviews(next);
      } catch {
        // best effort only
      }
    }

    void loadDevotionalPreviews();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!userId || activeTab !== "home") return;

    const featureCount = userIsPaid ? 6 : 7;
    const storageKey = `bb:update-card-feature-index:${userId}`;
    const previousRaw = window.localStorage.getItem(storageKey);
    const previousIndex = previousRaw ? Number(previousRaw) : -1;
    const nextIndex = Number.isFinite(previousIndex) ? (previousIndex + 1 + featureCount) % featureCount : 0;

    window.localStorage.setItem(storageKey, String(nextIndex));
    setUpdateFeatureIndex(nextIndex);
  }, [activeTab, userId, userIsPaid]);

  useEffect(() => {
    if (!group || !userId || activeTab !== "home" || typeof window === "undefined") return;

    const todayKey = new Date().toISOString().slice(0, 10);
    const storageKey = `bb:group-home-view:${group.id}:${userId}:${todayKey}`;
    if (window.localStorage.getItem(storageKey) === "1") return;

    window.localStorage.setItem(storageKey, "1");
    void logActionToMasterActions(userId, "study_group_feed_viewed", group.id, displayName || null);
  }, [activeTab, displayName, group, userId]);

  useEffect(() => {
    if (!group || !userId || !selectedHubItem || selectedHubItem.type !== "article" || typeof window === "undefined") return;

    const storageKey = `bb:group-article-open:${group.id}:${userId}:${selectedHubItem.path}`;
    if (window.sessionStorage.getItem(storageKey) === "1") return;

    window.sessionStorage.setItem(storageKey, "1");
    void logActionToMasterActions(userId, "study_group_article_opened", `${group.id}:${selectedHubItem.path}`, displayName || null);
  }, [displayName, group, selectedHubItem, userId]);

  async function handleOpenBibleStudyCard() {
    if (group && userId) {
      void logActionToMasterActions(
        userId,
        "study_group_bible_study_card_opened",
        group.id,
        displayName || null,
      );
    }

    const knownCurrentSeries =
      seriesList.find((series) => series.is_current) ??
      (currentSeriesPreview
        ? {
            ...currentSeriesPreview,
            is_current: true,
            created_at: new Date().toISOString(),
          }
        : null);

    if (knownCurrentSeries) {
      setSelectedSeries(knownCurrentSeries);
      setSelectedSeriesWeek(null);
      setActiveTab("bible_studies");
      return;
    }

    await loadSeries();
    setActiveTab("bible_studies");
  }

  async function loadTopBuddies() {
    if (!group) return;
    setLoadingTopBuddies(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch(`/api/groups/${group.id}/top-buddies`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Could not load top members.");
      }

      setTopBuddies(payload.buddies || []);
    } catch (error) {
      console.error("[TOP_BUDDIES] Failed to load:", error);
      setTopBuddies([]);
    } finally {
      setLoadingTopBuddies(false);
    }
  }

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
      !!showTopBuddiesModal ||
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
    showTopBuddiesModal,
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
          await Promise.all([
            fetch(`/api/groups/${group.id}/update-monday/ensure`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
            fetch(`/api/groups/${group.id}/weekly-trivia/ensure`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
            fetch(`/api/groups/${group.id}/weekly-question/ensure`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
            fetch(`/api/groups/${group.id}/who-was-this-friday/ensure`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
            fetch(`/api/groups/${group.id}/bible-study-saturday/ensure`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
            fetch(`/api/groups/${group.id}/prayer-request-sunday/ensure`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
            fetch(`/api/groups/${group.id}/weekly-poll/ensure`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
          ]);
        }
      } catch (error) {
        console.error("[GROUP_WEEKLY_AUTOMATIONS] Ensure failed:", error);
      }
    }

    const postQuery = supabase
      .from("group_posts")
      .select("id, user_id, display_name, title, category, content, like_count, is_pinned, created_at, parent_post_id, media_url, link_url")
      .eq("group_id", group.id)
      .is("parent_post_id", null);

    const categorizedPostQuery =
      activeTab === "home"
        ? postQuery.in("category", [...HOME_FEED_CATEGORIES])
        : postQuery.eq("category", postCategory);

    const { data: postRows, error } = await categorizedPostQuery
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) { setLoadingPosts(false); return; }

    const rows = postRows || [];
    const nextWeeklyPollByPostId: Record<string, WeeklyGroupPollFeedSet> = {};
    const nextWeeklyTriviaByPostId: Record<string, WeeklyGroupTriviaFeedSet> = {};
    const nextWeeklyQuestionByPostId: Record<string, WeeklyGroupQuestionFeedSet> = {};
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

      const { data: questionRows } = await supabase
        .from("weekly_group_questions")
        .select("id, group_id, post_id, week_key, prompt_key, subject_title, prompt, intro, comment_prompt, created_at")
        .in("post_id", rows.map((row) => row.id));

      (questionRows || []).forEach((row: any) => {
        nextWeeklyQuestionByPostId[row.post_id] = {
          id: row.id,
          group_id: row.group_id,
          post_id: row.post_id,
          week_key: row.week_key,
          prompt_key: row.prompt_key,
          subject_title: row.subject_title,
          prompt: row.prompt,
          intro: row.intro ?? null,
          comment_prompt: row.comment_prompt ?? null,
          created_at: row.created_at,
        };
      });

      const { data: pollRows } = await supabase
        .from("weekly_group_polls")
        .select("id, group_id, post_id, week_key, poll_key, subject_title, question, intro, options, created_at")
        .in("post_id", rows.map((row) => row.id));

      const pollIds = (pollRows || []).map((row: any) => row.id);
      const { data: pollVoteRows } = pollIds.length > 0
        ? await supabase
            .from("weekly_group_poll_votes")
            .select("poll_id, user_id, option_key")
            .in("poll_id", pollIds)
        : { data: [] as any[] };

      const voteMap: Record<string, Record<string, number>> = {};
      const totalVoteMap: Record<string, number> = {};
      const currentUserVoteMap: Record<string, string | null> = {};

      (pollVoteRows || []).forEach((vote: any) => {
        voteMap[vote.poll_id] ||= {};
        voteMap[vote.poll_id][vote.option_key] = (voteMap[vote.poll_id][vote.option_key] || 0) + 1;
        totalVoteMap[vote.poll_id] = (totalVoteMap[vote.poll_id] || 0) + 1;
        if (userId && vote.user_id === userId) {
          currentUserVoteMap[vote.poll_id] = vote.option_key;
        }
      });

      (pollRows || []).forEach((row: any) => {
        nextWeeklyPollByPostId[row.post_id] = {
          id: row.id,
          group_id: row.group_id,
          post_id: row.post_id,
          week_key: row.week_key,
          poll_key: row.poll_key,
          subject_title: row.subject_title,
          question: row.question,
          intro: row.intro ?? null,
          options: parseWeeklyPollOptions(row.options),
          created_at: row.created_at,
          vote_counts: voteMap[row.id] || {},
          total_votes: totalVoteMap[row.id] || 0,
          current_user_vote: currentUserVoteMap[row.id] || null,
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
    const badgeMap: Record<string, { is_paid: boolean; member_badge: string | null; current_streak: number | null }> = {};

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
        supabase.from("profile_stats").select("user_id, profile_image_url, is_paid, member_badge, current_streak").in("user_id", authorIds),
      ]);
      (mems || []).forEach((m) => { roleMap[m.user_id] = m.role; });
      (pics || []).forEach((p: any) => {
        imageMap[p.user_id] = p.profile_image_url ?? null;
        badgeMap[p.user_id] = {
          is_paid: !!p.is_paid,
          member_badge: p.member_badge ?? null,
          current_streak: p.current_streak ?? null,
        };
      });
    }
    setPosts(sortPinnedPostsFirst(rows.map((p) => ({
      ...p,
      like_count: likeCountMap[p.id] || 0,
      comment_count: rootCommentCountMap[p.id] || 0,
      role: roleMap[p.user_id] || "member",
      liked: likedSet.has(p.id),
      profile_image_url: imageMap[p.user_id] ?? null,
      is_paid: badgeMap[p.user_id]?.is_paid ?? false,
      member_badge: badgeMap[p.user_id]?.member_badge ?? null,
      current_streak: badgeMap[p.user_id]?.current_streak ?? null,
    }))));
    setWeeklyPollByPostId(nextWeeklyPollByPostId);
    setWeeklyTriviaByPostId(nextWeeklyTriviaByPostId);
    setWeeklyQuestionByPostId(nextWeeklyQuestionByPostId);
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
      supabase.from("profile_stats").select("profile_image_url, is_paid, member_badge, current_streak").eq("user_id", postRow.user_id).maybeSingle(),
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
    const [{ data: triviaSetRow }, { data: questionSetRow }, { data: pollSetRow }] = await Promise.all([
      supabase
        .from("weekly_group_trivia_sets")
        .select("id, post_id, group_id, week_key, subject_key, subject_title, intro, questions, created_at")
        .eq("post_id", postRow.id)
        .maybeSingle(),
      supabase
        .from("weekly_group_questions")
        .select("id, group_id, post_id, week_key, prompt_key, subject_title, prompt, intro, comment_prompt, created_at")
        .eq("post_id", postRow.id)
        .maybeSingle(),
      supabase
        .from("weekly_group_polls")
        .select("id, group_id, post_id, week_key, poll_key, subject_title, question, intro, options, created_at")
        .eq("post_id", postRow.id)
        .maybeSingle(),
    ]);

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

    if (questionSetRow) {
      setWeeklyQuestionByPostId((prev) => ({
        ...prev,
        [postRow.id]: {
          id: questionSetRow.id,
          group_id: questionSetRow.group_id,
          post_id: questionSetRow.post_id,
          week_key: questionSetRow.week_key,
          prompt_key: questionSetRow.prompt_key,
          subject_title: questionSetRow.subject_title,
          prompt: questionSetRow.prompt,
          intro: questionSetRow.intro ?? null,
          comment_prompt: questionSetRow.comment_prompt ?? null,
          created_at: questionSetRow.created_at,
        },
      }));
    }

    if (pollSetRow) {
      const { data: pollVoteRows } = await supabase
        .from("weekly_group_poll_votes")
        .select("poll_id, user_id, option_key")
        .eq("poll_id", pollSetRow.id);

      const voteCounts: Record<string, number> = {};
      let totalVotes = 0;
      let currentUserVote: string | null = null;
      (pollVoteRows || []).forEach((vote: any) => {
        voteCounts[vote.option_key] = (voteCounts[vote.option_key] || 0) + 1;
        totalVotes += 1;
        if (userId && vote.user_id === userId) currentUserVote = vote.option_key;
      });

      setWeeklyPollByPostId((prev) => ({
        ...prev,
        [postRow.id]: {
          id: pollSetRow.id,
          group_id: pollSetRow.group_id,
          post_id: pollSetRow.post_id,
          week_key: pollSetRow.week_key,
          poll_key: pollSetRow.poll_key,
          subject_title: pollSetRow.subject_title,
          question: pollSetRow.question,
          intro: pollSetRow.intro ?? null,
          options: parseWeeklyPollOptions((pollSetRow as any).options),
          created_at: pollSetRow.created_at,
          vote_counts: voteCounts,
          total_votes: totalVotes,
          current_user_vote: currentUserVote,
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
      current_streak: profile?.current_streak ?? null,
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
      setPostLikers((prev) => prev.some((liker) => liker.user_id === userId) ? prev : [{
        user_id: userId,
        display_name: displayName,
        profile_image_url: userProfileImage,
        is_paid: userIsPaid,
        member_badge: userMemberBadge,
        current_streak: userCurrentStreak,
      }, ...prev]);
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
      .select("user_id, display_name, username, profile_image_url, is_paid, member_badge, current_streak")
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
          current_streak: profile?.current_streak ?? null,
        };
      }),
    );
    setLoadingPostLikers(false);
  }

  function resetPostComposer() {
    setNewPostTitle("");
    setNewPostContent("");
    setEditingFeedPost(null);
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

  function canEditFeedPost(post: Post) {
    return post.user_id === userId;
  }

  function startEditingFeedPost(post: Post) {
    setActivePostMenuId(null);
    setEditingFeedPost(post);
    setNewPostTitle(post.title || "");
    setNewPostContent(post.content || "");
    postEditor?.commands.setContent(post.content || "");
    setShowPostComposerModal(true);
  }

  async function handleSubmitPost() {
    const editorHtml = postEditor?.getHTML() ?? "";
    let normalizedContent = editorHtml === "<p></p>" ? "" : editorHtml;
    const hasContent = stripHtml(normalizedContent).length > 0;
    const hasPhoto = composerMode === "photo" && !!composerPhotoFile;
    const hasVideo = composerMode === "video" && !!composerVideoFile && !composerVideoDurationError;
    const hasExistingMedia = !!editingFeedPost?.media_url;
    if (!hasContent && !hasPhoto && !hasVideo && !hasExistingMedia) return;
    if (!userId || !group || submitting) return;
    if (activeTab === "members" || activeTab === "bible_studies") return;
    setSubmitting(true);
    setComposerUploadError(null);

    let mediaUrl: string | null = null;
    let linkUrl: string | null = null;

    if (normalizedContent) {
      try {
        const items = mentionItems.length > 0 ? mentionItems : await loadGroupPostMentions(supabase, group.id);
        normalizedContent = linkMentionItemsInHtml(normalizedContent, items);
      } catch (mentionError) {
        setComposerUploadError(mentionError instanceof Error ? mentionError.message : "Could not prepare post mentions.");
        setSubmitting(false);
        return;
      }
    }

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

    if (editingFeedPost) {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;

        if (!accessToken) {
          throw new Error("Could not verify your session.");
        }

        const response = await fetch(`/api/groups/${group.id}/edit-post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            postId: editingFeedPost.id,
            title: newPostTitle.trim(),
            content: normalizedContent,
          }),
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload.error || "Could not save your post changes.");
        }

        const updatedPost: Post = {
          ...editingFeedPost,
          title: payload.post?.title ?? null,
          content: payload.post?.content ?? normalizedContent,
        };

        setPosts((prev) => sortPinnedPostsFirst(prev.map((item) => (item.id === updatedPost.id ? updatedPost : item))));
        setSelectedFeedPost((prev) => (prev?.id === updatedPost.id ? updatedPost : prev));
        resetPostComposer();
        setShowPostComposerModal(false);
      } catch (error) {
        setComposerUploadError(error instanceof Error ? error.message : "Could not save your post changes.");
      }

      setSubmitting(false);
      return;
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
      setPosts((prev) => sortPinnedPostsFirst([{
        ...newPost,
        comment_count: 0,
        role: userRole,
        liked: false,
        profile_image_url: userProfileImage,
        is_paid: userIsPaid,
        member_badge: userMemberBadge,
        current_streak: userCurrentStreak,
      }, ...prev]));
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

  async function handleTogglePin(post: Post) {
    if (!isLeaderOrMod || pinningPostId || !group) return;

    const nextPinned = !post.is_pinned;
    setPinningPostId(post.id);
    setActivePostMenuId(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch(`/api/groups/${group.id}/pin-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          postId: post.id,
          nextPinned,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not update pin right now.");
      }

      setPosts((prev) =>
        sortPinnedPostsFirst(
          prev.map((item) =>
            item.id === post.id ? { ...item, is_pinned: Boolean(payload.isPinned) } : item,
          ),
        ),
      );
      setSelectedFeedPost((prev) =>
        prev?.id === post.id ? { ...prev, is_pinned: Boolean(payload.isPinned) } : prev,
      );
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Could not update pin right now.");
    }

    setPinningPostId(null);
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
          .select("user_id, display_name, username, profile_image_url, current_streak")
          .in("user_id", likerIds);

        likerMap = Object.fromEntries(
          (likerProfiles || []).map((profile) => [
            profile.user_id,
            {
              user_id: profile.user_id,
              display_name: profile.display_name || profile.username || "Buddy",
              profile_image_url: profile.profile_image_url ?? null,
              current_streak: profile.current_streak ?? null,
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
      .select("user_id, display_name, username, profile_image_url, is_paid, member_badge, current_streak")
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
        current_streak: p?.current_streak ?? null,
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

  useEffect(() => {
    if (!group || activeTab !== "members") return;
    void loadTopBuddies();
  }, [activeTab, group?.id]);

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
    let badgeMap: Record<string, { is_paid: boolean; member_badge: string | null; current_streak: number | null }> = {};
    if (commentRows.length > 0) {
      const commenterIds = [...new Set(commentRows.map((c) => c.user_id))];
      const [{ data: pics }, { data: roles }] = await Promise.all([
        supabase.from("profile_stats").select("user_id, profile_image_url, is_paid, member_badge, current_streak").in("user_id", commenterIds),
        group
          ? supabase.from("group_members").select("user_id, role").eq("group_id", group.id).in("user_id", commenterIds)
          : Promise.resolve({ data: [] as Array<{ user_id: string; role: string }> }),
      ]);
      (pics || []).forEach((p: any) => {
        imageMap[p.user_id] = p.profile_image_url ?? null;
        badgeMap[p.user_id] = {
          is_paid: !!p.is_paid,
          member_badge: p.member_badge ?? null,
          current_streak: p.current_streak ?? null,
        };
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
      current_streak: badgeMap[c.user_id]?.current_streak ?? null,
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
      setComments((prev) => [...prev, {
        ...data,
        liked: false,
        profile_image_url: userProfileImage,
        role: userRole,
        is_paid: userIsPaid,
        member_badge: userMemberBadge,
        current_streak: userCurrentStreak,
      }]);
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
  const activeFeedPollSet = activeFeedPost ? weeklyPollByPostId[activeFeedPost.id] : undefined;
  const activeFeedTriviaSet = activeFeedPost ? weeklyTriviaByPostId[activeFeedPost.id] : undefined;
  const activeFeedQuestionSet = activeFeedPost ? weeklyQuestionByPostId[activeFeedPost.id] : undefined;
  const activeFeedCoverPost = activeFeedPost ? isHomeFeedCoverPost(activeFeedPost) : false;
  const isLeader = userRole === "leader";
  const isLeaderOrMod = userRole === "leader" || userRole === "moderator";
  const isLouisAdmin = userEmail === "moorelouis3@gmail.com";
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
                      setActiveTab("members");
                }}
                className="text-xs text-gray-600 hover:text-gray-900 transition font-medium"
              >
                👥 See All Buddies
              </button>
              {isLouisAdmin && (
                <>
                  <Link
                    href={`/study-groups/${group.id}/analytics`}
                    className="text-xs text-gray-600 hover:text-gray-900 transition font-medium"
                  >
                    📊 Group Analytics
                  </Link>
                  <Link
                    href={`/study-groups/${group.id}/scheduler`}
                    className="text-xs text-gray-600 hover:text-gray-900 transition font-medium"
                  >
                    🗓️ Scheduler
                  </Link>
                </>
              )}
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
              <>
                <button
                  type="button"
                  onClick={() => void handleOpenBibleStudyCard()}
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
                      <div className="flex items-center justify-between gap-3">
                        <p
                          className="text-base font-bold whitespace-nowrap"
                          style={{ color: "#d62828", WebkitTextFillColor: "#d62828" }}
                        >
                          Study starts in {formatCountdown(new Date(currentSeriesStartAt).getTime(), nowTs)}
                        </p>
                        <p className="text-xs text-gray-600 text-right whitespace-nowrap">{formatDateTimeLabel(currentSeriesStartAt)}</p>
                      </div>
                    ) : (
                      <p
                        className="text-lg font-bold"
                        style={{ color: "#d62828", WebkitTextFillColor: "#d62828" }}
                      >
                        {cardState.headline}
                      </p>
                    )}
                    {!currentSeriesStartAt || new Date(currentSeriesStartAt).getTime() <= nowTs ? (
                      <p className="text-sm text-gray-600 mt-1">{cardState.detail}</p>
                    ) : null}
                  </div>
                </button>

                <div className="mb-4">
                  {renderUpdateCard()}
                </div>

              </>
            );
          })()}

          {/* â”€â”€ MEMBERS TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeTab === "members" && !selectedSeries && !selectedPost ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mt-2">
              <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="text-base font-semibold text-gray-800">Buddies {membersTotal !== null ? `(${membersTotal})` : ""}</h2>
              </div>
              <div className="px-4 pt-4">
                <div className="rounded-2xl border border-[#d8e8d7] bg-white shadow-sm overflow-hidden">
                  <div className="px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f8d6c]">Top Members</p>
                        <h3 className="mt-2 text-lg font-bold text-gray-900">Buddies showing up the most</h3>
                        <p className="mt-1 text-sm text-gray-600">Top 5 over the last 30 days based on posts, comments, and likes.</p>
                      </div>
                      <span className="rounded-full bg-[#edf7ed] px-3 py-1 text-xs font-semibold text-[#4a9b6f]">Top 10</span>
                    </div>

                    <div className="mt-4 space-y-3">
                      {loadingTopBuddies ? (
                        <p className="text-sm text-gray-500">Loading top members...</p>
                      ) : topBuddies.length === 0 ? (
                        <p className="text-sm text-gray-500">No top member activity yet.</p>
                      ) : (
                        topBuddies.slice(0, 5).map((buddy) => (
                          <div key={buddy.userId} className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2e7dc] text-xs font-bold text-[#8d5d38]">
                              {buddy.rank}
                            </div>
                            {buddy.profileImageUrl ? (
                              <img src={buddy.profileImageUrl} alt={buddy.displayName} className="h-10 w-10 rounded-full object-cover" />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: avatarColor(buddy.userId) }}>
                                {getInitial(buddy.displayName)}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5">
                                  <p className="truncate text-sm font-semibold text-gray-900">{buddy.displayName}</p>
                                  <StreakFlameBadge currentStreak={buddy.currentStreak} />
                                </div>
                                <UserBadge customBadge={buddy.memberBadge} isPaid={buddy.isPaid} />
                              </div>
                              <p className="mt-0.5 text-xs text-gray-500">{buddy.posts} posts / {buddy.comments} comments / {buddy.likes} likes</p>
                            </div>
                            <div className="text-right">
                              <p className="text-base font-bold text-gray-900">{buddy.score}</p>
                              <p className="text-[11px] text-gray-500">score</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowTopBuddiesModal(true)}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#4a9b6f]"
                    >
                      See full ranking
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
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
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-semibold text-gray-900 truncate">{member.display_name}</p>
                              <StreakFlameBadge currentStreak={member.current_streak} />
                            </div>
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
                            <div className="flex items-center gap-1.5 mb-1">
                              <Link href={`/profile/${comment.user_id}`} className="text-sm font-semibold text-gray-900 hover:underline">{comment.display_name}</Link>
                              <StreakFlameBadge currentStreak={comment.current_streak} />
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
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <Link href={`/profile/${reply.user_id}`} className="text-xs font-semibold text-gray-900 hover:underline">{reply.display_name}</Link>
                                    <StreakFlameBadge currentStreak={reply.current_streak} />
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

      <UpgradeRequiredModal
        isOpen={showDevotionalUpgradeModal}
        onClose={() => setShowDevotionalUpgradeModal(false)}
      />

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
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="font-semibold text-gray-900 text-sm">
                    {activeFeedPost.display_name || "Buddy"}
                  </p>
                  <StreakFlameBadge currentStreak={activeFeedPost.current_streak} />
                  <UserBadge customBadge={activeFeedPost.member_badge} isPaid={activeFeedPost.is_paid} groupRole={activeFeedPost.role} />
                  <span className="text-xs text-gray-400">{timeAgo(activeFeedPost.created_at)}</span>
                </div>
                {activeFeedPost.title && !activeFeedCoverPost && (
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
              {!activeFeedCoverPost && !activeFeedPollSet && !activeFeedTriviaSet && !activeFeedQuestionSet && activeFeedPost.content && (
                <div
                  className="prose prose-sm max-w-none text-gray-800 leading-relaxed [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-bold [&_p]:my-4 [&_ul]:my-4 [&_ul]:pl-5 [&_li]:my-1.5"
                  onClick={handleScriptureClick}
                  dangerouslySetInnerHTML={{ __html: getRenderablePostContent(activeFeedPost.content) }}
                />
              )}
              {activeFeedPollSet && (
                <GroupWeeklyPollCard pollSet={activeFeedPollSet} userId={userId} />
              )}
              {activeFeedTriviaSet && (
                <GroupWeeklyTriviaCard triviaSet={activeFeedTriviaSet} userId={userId} />
              )}
              {activeFeedQuestionSet && (
                <GroupWeeklyQuestionCard
                  prompt={activeFeedQuestionSet.prompt}
                  intro={activeFeedQuestionSet.intro}
                  commentPrompt={activeFeedQuestionSet.comment_prompt}
                />
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

              {activeFeedCoverPost && activeFeedPost.title && (
                <h2 className="mt-5 text-xl font-bold leading-snug text-gray-900">{activeFeedPost.title}</h2>
              )}

              {activeFeedCoverPost && !activeFeedPollSet && !activeFeedTriviaSet && !activeFeedQuestionSet && activeFeedPost.content && (
                <div
                  className="prose prose-sm mt-5 max-w-none text-gray-800 leading-relaxed [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-bold [&_p]:my-4 [&_ul]:my-4 [&_ul]:pl-5 [&_li]:my-1.5"
                  onClick={handleScriptureClick}
                  dangerouslySetInnerHTML={{ __html: getRenderablePostContent(activeFeedPost.content) }}
                />
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
                <div className="mt-5" id="group-feed-comments">
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

      {selectedScripture ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4" onClick={() => setSelectedScripture(null)}>
          <div className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#efe5d9] px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8d5d38]">Bible Reference</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">{selectedScripture.reference}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScripture(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100"
              >
                x
              </button>
            </div>

            <div className="px-6 py-5">
              {loadingScripture ? (
                <p className="text-sm text-gray-500">Loading verses...</p>
              ) : (
                <div
                  ref={scriptureContainerRef}
                  className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: scriptureHtml || "<p>Could not load this verse right now.</p>" }}
                />
              )}

              <div className="mt-6 flex justify-end">
                <Link
                  href={`/Bible/${encodeURIComponent(selectedScripture.book.toLowerCase())}/${selectedScripture.chapter}`}
                  className="rounded-xl bg-[#4a9b6f] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Read Full Chapter
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {selectedPerson ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-3 py-4" onClick={() => { setSelectedPerson(null); setPersonNotes(null); }}>
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-8" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => { setSelectedPerson(null); setPersonNotes(null); }} className="absolute right-4 top-4 text-xl text-gray-500 hover:text-gray-800">
              x
            </button>
            <h2 className="mb-2 text-3xl font-bold">{selectedPerson.name}</h2>
            {personCreditBlocked ? null : personNotes === null ? (
              <div className="flex flex-col items-center gap-5 py-10">
                <div style={{ animation: "bounce 1s infinite" }}><LouisAvatar mood="think" size={72} /></div>
                <div className="w-full space-y-3 px-2">
                  <div className="h-3.5 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-5/6 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-gray-100" />
                </div>
                <p className="text-sm italic text-gray-400 animate-pulse">{selectedPerson.name} is loading...</p>
              </div>
            ) : (
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h1 className="mb-4 mt-6 text-xl font-bold text-gray-900 md:text-2xl" {...props} />,
                  p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                  strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                }}
              >
                {normalizePersonMarkdown(personNotes)}
              </ReactMarkdown>
            )}
          </div>
        </div>
      ) : null}

      {selectedPlace ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-3 py-4" onClick={() => { setSelectedPlace(null); setPlaceNotes(null); }}>
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-8" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => { setSelectedPlace(null); setPlaceNotes(null); }} className="absolute right-4 top-4 text-xl text-gray-500 hover:text-gray-800">
              x
            </button>
            <h2 className="mb-2 text-3xl font-bold">{selectedPlace.name}</h2>
            {placeCreditBlocked ? null : placeNotes === null ? (
              <div className="flex flex-col items-center gap-5 py-10">
                <div style={{ animation: "bounce 1s infinite" }}><LouisAvatar mood="think" size={72} /></div>
                <div className="w-full space-y-3 px-2">
                  <div className="h-3.5 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-5/6 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-gray-100" />
                </div>
                <p className="text-sm italic text-gray-400 animate-pulse">{selectedPlace.name} is loading...</p>
              </div>
            ) : (
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h1 className="mb-4 mt-6 text-xl font-bold text-gray-900 md:text-2xl" {...props} />,
                  p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                  strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                }}
              >
                {normalizePlaceMarkdown(placeNotes)}
              </ReactMarkdown>
            )}
          </div>
        </div>
      ) : null}

      {selectedKeyword ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-3 py-4" onClick={() => { setSelectedKeyword(null); setKeywordNotes(null); }}>
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-8" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => { setSelectedKeyword(null); setKeywordNotes(null); }} className="absolute right-4 top-4 text-xl text-gray-500 hover:text-gray-800">
              x
            </button>
            <h2 className="mb-2 text-3xl font-bold">{selectedKeyword.name}</h2>
            {keywordCreditBlocked ? null : keywordNotes === null ? (
              <div className="flex flex-col items-center gap-5 py-10">
                <div style={{ animation: "bounce 1s infinite" }}><LouisAvatar mood="think" size={72} /></div>
                <div className="w-full space-y-3 px-2">
                  <div className="h-3.5 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-5/6 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-gray-100" />
                </div>
                <p className="text-sm italic text-gray-400 animate-pulse">{selectedKeyword.name} is loading...</p>
              </div>
            ) : (
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h1 className="mb-4 mt-6 text-xl font-bold text-gray-900 md:text-2xl" {...props} />,
                  p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                  strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                }}
              >
                {normalizeKeywordMarkdown(keywordNotes)}
              </ReactMarkdown>
            )}
          </div>
        </div>
      ) : null}

      <CreditLimitModal
        open={personCreditBlocked}
        userId={userId}
        zIndexClassName="z-[80]"
        onClose={() => {
          setPersonCreditBlocked(false);
          setSelectedPerson(null);
          setPersonNotes(null);
        }}
      />

      <CreditLimitModal
        open={placeCreditBlocked}
        userId={userId}
        zIndexClassName="z-[80]"
        onClose={() => {
          setPlaceCreditBlocked(false);
          setSelectedPlace(null);
          setPlaceNotes(null);
        }}
      />

      <CreditLimitModal
        open={keywordCreditBlocked}
        userId={userId}
        zIndexClassName="z-[80]"
        onClose={() => {
          setKeywordCreditBlocked(false);
          setSelectedKeyword(null);
          setKeywordNotes(null);
        }}
      />

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
                      <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                        <Link href={`/profile/${liker.user_id}`} className="text-sm font-medium text-gray-900 hover:underline">
                          {liker.display_name}
                        </Link>
                        <StreakFlameBadge currentStreak={liker.current_streak} />
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
                      <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                        <Link href={`/profile/${liker.user_id}`} className="text-sm font-medium text-gray-900 hover:underline">
                          {liker.display_name}
                        </Link>
                        <StreakFlameBadge currentStreak={liker.current_streak} />
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
                    <h2 className="text-xl font-bold text-gray-900 mt-1">{editingFeedPost ? "Edit Post" : "Create a Post"}</h2>
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
                    <PostMentionSuggestions editor={postEditor} items={mentionItems} />
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
                      disabled={submitting || (!stripHtml(postEditor?.getHTML() ?? "").length && !composerPhotoFile && !composerVideoFile && !editingFeedPost?.media_url)}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 transition"
                      style={{ backgroundColor: SAGE }}
                    >
                      {submitting ? (editingFeedPost ? "Saving..." : "Posting...") : (editingFeedPost ? "Save Changes" : "Post to Group")}
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

      {showTopBuddiesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 modal-backdrop-in"
          onClick={() => setShowTopBuddiesModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto modal-panel-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: SAGE }}>Bible Study Group</p>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">Top Members</h2>
                  <p className="text-sm text-gray-500 mt-1">Top 10 over the last 30 days based on posts, comments, and likes.</p>
                </div>
                <button
                  onClick={() => setShowTopBuddiesModal(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="px-5 py-4">
              {loadingTopBuddies ? (
                <p className="text-sm text-gray-400 text-center py-8">Loading top members...</p>
              ) : topBuddies.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No top member activity yet.</p>
              ) : (
                <div className="space-y-3">
                  {topBuddies.map((buddy) => (
                    <div key={buddy.userId} className="rounded-2xl border border-gray-200 bg-white px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2e7dc] text-xs font-bold text-[#8d5d38]">
                          {buddy.rank}
                        </div>
                        <Link href={`/profile/${buddy.userId}`} className="flex-shrink-0">
                          {buddy.profileImageUrl ? (
                            <img src={buddy.profileImageUrl} alt={buddy.displayName} className="h-11 w-11 rounded-full object-cover" />
                          ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: avatarColor(buddy.userId) }}>
                              {getInitial(buddy.displayName)}
                            </div>
                          )}
                        </Link>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link href={`/profile/${buddy.userId}`} className="truncate text-sm font-semibold text-gray-900 hover:underline">
                              {buddy.displayName}
                            </Link>
                            <StreakFlameBadge currentStreak={buddy.currentStreak} />
                            <UserBadge customBadge={buddy.memberBadge} isPaid={buddy.isPaid} />
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {buddy.posts} posts / {buddy.comments} comments / {buddy.likes} likes
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{buddy.score}</p>
                          <p className="text-xs text-gray-500">score</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
                    setActiveTab("members");
                  }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: SAGE }}
                >
                  View All Buddies
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
    const orderedPosts = sortPinnedPostsFirst(posts);
    return (
      <div className="flex flex-col gap-3">
        {orderedPosts.map((post) => {
          const pollSet = weeklyPollByPostId[post.id];
          const hasImagePost = Boolean(post.media_url && !isUploadedVideo(post.media_url) && !post.link_url);
          const isCoverOnlyFeedPost = isHomeFeedCoverPost(post);
          const triviaSet = weeklyTriviaByPostId[post.id];
          const questionSet = weeklyQuestionByPostId[post.id];
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
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Link href={`/profile/${post.user_id}`} className="font-semibold text-gray-900 text-sm hover:underline">
                    {post.display_name || "Buddy"}
                  </Link>
                  <StreakFlameBadge currentStreak={post.current_streak} />
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
                      {canEditFeedPost(post) && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditingFeedPost(post);
                          }}
                          className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                          Edit Post
                        </button>
                      )}
                      {isLeaderOrMod && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            void handleTogglePin(post);
                          }}
                          disabled={pinningPostId === post.id}
                          className="w-full px-4 py-3 text-left text-sm font-medium text-amber-700 hover:bg-amber-50 transition disabled:opacity-50"
                        >
                          {pinningPostId === post.id ? "Saving..." : post.is_pinned ? "Unpin Post" : "Pin to Top"}
                        </button>
                      )}
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
            {post.title && !isCoverOnlyFeedPost && <h3 className={`font-bold text-gray-900 leading-snug ${hasImagePost ? "text-base mt-3" : "text-lg mt-3"}`}>{post.title}</h3>}
            {!pollSet && !triviaSet && !questionSet && post.content && !isCoverOnlyFeedPost && (
              <p className={`text-sm text-gray-700 mt-3 leading-relaxed whitespace-pre-line line-clamp-4`}>
                {getPostPreviewText(post.content)}
              </p>
            )}
            {pollSet && (
              <div className="mt-3">
                <GroupWeeklyPollCard pollSet={pollSet} userId={userId} compactResults />
              </div>
            )}
            {triviaSet && (
              <div className="mt-3">
                <GroupWeeklyTriviaCard triviaSet={triviaSet} userId={userId} compactBoard />
              </div>
            )}
            {questionSet && (
              <div className="mt-3">
                <GroupWeeklyQuestionCard
                  prompt={questionSet.prompt}
                  intro={questionSet.intro}
                  commentPrompt={questionSet.comment_prompt}
                />
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

  function renderUpdateCard() {
    const missingProfilePhoto = !userProfileImage;
    const missingBio = !userBio?.trim();
    const missingLocation = !userLocation?.trim();
    const profileIncomplete = missingProfilePhoto || missingBio || missingLocation;
    const pushIncomplete = pushSupported && !(pushPermission === "granted" && pushSubscribed) && !pushDismissed;
    const showProfileSetup = profileIncomplete && !hideProfileSetupCard;
    const showPushSetup = pushIncomplete && !hidePushSetupCard;
    const showSetupHeader = showProfileSetup || showPushSetup;
    const profileHref = userId ? `/profile/${userId}` : "/profile";
    if (!showSetupHeader) {
      return null;
    }

    return (
      <div className="w-full rounded-2xl border border-[#d7e8d7] bg-white px-4 py-4 shadow-sm">
        {showSetupHeader ? (
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: SAGE }}>Set Up</p>
              <h3 className="text-lg font-bold text-gray-900 mt-1">Set up your Bible Buddy</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                A few quick things help your profile feel real and make sure you do not miss replies, likes, and important Bible Buddy updates.
              </p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-[#eef8ef] flex items-center justify-center text-xl flex-shrink-0">✨</div>
          </div>
        ) : null}

        <div className={`${showSetupHeader ? "mt-4" : ""} space-y-3`}>
          <div className={`overflow-hidden transition-all duration-300 ${showProfileSetup ? "max-h-64 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none"}`}>
          <div className={`rounded-2xl border px-4 py-3 ${profileIncomplete ? "border-[#ead8c4] bg-[#fffaf4]" : "border-[#d7e8d7] bg-[#f4fbf5]"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">Complete your profile</p>
                <p className="text-sm text-gray-600 mt-1">
                  Add your photo, bio, and location so other Buddies can know who they are studying with.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${missingProfilePhoto ? "bg-[#f5e3d0] text-[#9a5b1f]" : "bg-[#dff0df] text-[#4f7e54]"}`}>
                    {missingProfilePhoto ? "Photo needed" : "Photo set"}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${missingBio ? "bg-[#f5e3d0] text-[#9a5b1f]" : "bg-[#dff0df] text-[#4f7e54]"}`}>
                    {missingBio ? "Bio needed" : "Bio set"}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${missingLocation ? "bg-[#f5e3d0] text-[#9a5b1f]" : "bg-[#dff0df] text-[#4f7e54]"}`}>
                    {missingLocation ? "Location needed" : "Location set"}
                  </span>
                </div>
              </div>
              <Link
                href={profileHref}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 flex-shrink-0"
                style={{ backgroundColor: SAGE }}
              >
                {profileIncomplete ? "Finish Profile" : "View Profile"}
              </Link>
            </div>
          </div>
          </div>

          <div className={`overflow-hidden transition-all duration-300 ${showPushSetup ? "max-h-64 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1 pointer-events-none"}`}>
          {pushIncomplete && (
            <div className="rounded-2xl border border-[#d7e8d7] bg-[#f4fbf5] px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">Turn on push alerts</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Get real-time Bible Buddy notifications when someone likes your post, replies, or sends something important.
                  </p>
                </div>
                <div className="text-xl flex-shrink-0">🔔</div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => void handleEnableUpdateCardPush()}
                  disabled={pushSetupLoading}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: SAGE }}
                >
                  {pushSetupLoading ? "Saving..." : "Enable"}
                </button>
                <button
                  type="button"
                  onClick={dismissUpdateCardPush}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-white transition"
                >
                  No thanks
                </button>
              </div>
              {pushSetupError && <p className="text-xs text-red-500 mt-2">{pushSetupError}</p>}
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }

}


