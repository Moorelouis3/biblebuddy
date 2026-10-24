"use client";

import { useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { triggerSmokeDelete } from "@/components/SmokeDeleteEffect";
import { triggerPostSuccess } from "@/components/PostSuccessEffect";
import { triggerToast } from "@/components/AppToast";
import * as tus from "tus-js-client";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { FeedOnboardingModal } from "../../components/FeedOnboardingModal";
import ReportBlockMenu from "../../components/ReportBlockMenu";
import { BIBLE_STUDY_GROUP_ID } from "../../lib/bibleStudiesCatalog";
import { BLOCKS_CHANGED_EVENT, getBlockedUserIds } from "../../lib/userBlocks";
import { ModalShell } from "../../components/ModalShell";
import { logActionToMasterActions } from "../../lib/actionRecorder";
import { requestAutoReplyDraft } from "../../lib/requestAutoReplyDraft";
import { readStudyActivity } from "../../lib/communityMilestones";
import { BIBLE_BUDDY_USER_ID } from "../../lib/bibleBuddyAccount";
import { FEED_OPEN_POST_EVENT } from "../../components/AppShell";
import AddBuddyButton, { type BuddyState } from "../../components/feed/AddBuddyButton";
import FeedPollBlock from "../../components/feed/FeedPollBlock";
import { pollIdFromPost } from "../../lib/weeklyFeedPosts";
import TopBuddiesCard from "../../components/feed/TopBuddiesCard";
import ProfileSummaryCard from "../../components/profile/ProfileSummaryCard";
import { COMMUNITY_GROUP_ID } from "../../lib/communityMilestones";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FeedPost {
  id: string;
  user_id: string;
  post_type: "thought" | "verse" | "prayer" | "prayer_request" | "photo" | "link" | "video";
  content: string;
  verse_ref: string | null;
  verse_text: string | null;
  media_url: string | null;
  link_url: string | null;
  link_title: string | null;
  visibility: "buddies" | "community";
  reaction_counts: Record<string, number>;
  comment_count: number;
  created_at: string;
  // joined
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
  /**
   * This row came from the group, not from feed_posts.
   *
   * Louis, 2026-10-18: "wouldn't it be better to make the community post be
   * the feed for the group - all the stuff in there sits on the feed... and
   * then it just be BB posting like a regular post mixed with others' posts
   * and actions, and we select what each person sees."
   *
   * So group threads rank in the same stream as everything else. They are
   * marked rather than converted, because their likes and replies live in
   * group_post_likes and in rows with parent_post_id, not in the feed's own
   * tables - acting on one here would write to the wrong place. The card is a
   * door into the thread instead.
   */
  group_post?: boolean;
}


/**
 * The faces and the "New comment 12m ago" line under a post.
 *
 * Gathered for a whole page of posts in two queries rather than two per card,
 * because the card is rendered fifty times and a request per card is how a
 * feed takes a minute to settle. See loadCommentPreviews.
 */
type CommentPreviewPerson = {
  user_id: string;
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
};
type CommentPreview = { people: CommentPreviewPerson[]; lastAt: string };

type Tab = "community" | "buddies" | "myfeed";
type PostType = "thought" | "verse" | "prayer" | "prayer_request" | "photo" | "link" | "video";

interface FeedComment {
  id: string;
  post_id: string;
  user_id: string;
  parent_comment_id: string | null;
  content: string;
  created_at: string;
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
}

type MyProfile = {
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
  is_paid?: boolean | null;
  member_badge?: string | null;
} | null;

const INLINE_UPGRADE_INTERVAL = 15;
const ADMIN_EMAIL = "moorelouis3@gmail.com";

// ── Helpers ───────────────────────────────────────────────────────────────────

const AVATAR_COLORS = ["#4a9b6f","#5b8dd9","#c97b3e","#9b6bb5","#d45f7a","#3ea8a8"];
function avatarColor(uid: string): string {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = uid.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ── Video URL parsing ─────────────────────────────────────────────────────────

type VideoPlatform = "youtube" | "youtube_short" | "tiktok" | "instagram" | "bunny" | "unknown";

// Returns embedUrl + whether it's portrait (9:16) layout
function parseVideoEmbed(url: string): { platform: VideoPlatform; embedUrl: string | null; portrait: boolean } {
  // YouTube standard
  const ytWatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
  if (ytWatch) return { platform: "youtube", embedUrl: `https://www.youtube.com/embed/${ytWatch[1]}?rel=0`, portrait: false };
  // youtu.be short links
  const ytBe = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (ytBe) return { platform: "youtube", embedUrl: `https://www.youtube.com/embed/${ytBe[1]}?rel=0`, portrait: false };
  // YouTube Shorts — portrait
  const ytShort = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (ytShort) return { platform: "youtube_short", embedUrl: `https://www.youtube.com/embed/${ytShort[1]}?rel=0`, portrait: true };
  // Instagram Reels: /reel/CODE/ or /p/CODE/
  const igReel = url.match(/instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/);
  if (igReel) return { platform: "instagram", embedUrl: `https://www.instagram.com/reel/${igReel[1]}/embed/`, portrait: true };
  // TikTok: /@user/video/ID
  const ttVideo = url.match(/tiktok\.com\/@[^/?]+\/video\/(\d+)/);
  if (ttVideo) return { platform: "tiktok", embedUrl: `https://www.tiktok.com/embed/v2/${ttVideo[1]}`, portrait: true };
  // TikTok short (vm.tiktok.com) — can't resolve without server, show link
  if (url.includes("tiktok.com")) return { platform: "tiktok", embedUrl: null, portrait: true };
  // Bunny Stream embed — portrait by default (phone uploads are vertical)
  if (url.includes("iframe.mediadelivery.net/embed/")) return { platform: "bunny", embedUrl: url, portrait: true };
  return { platform: "unknown", embedUrl: null, portrait: false };
}

const VIDEO_PLATFORM_META: Record<VideoPlatform, { icon: string; label: string }> = {
  youtube:       { icon: "▶️", label: "YouTube" },
  youtube_short: { icon: "▶️", label: "YouTube Shorts" },
  tiktok:        { icon: "🎵", label: "TikTok" },
  instagram:     { icon: "📸", label: "Instagram Reel" },
  bunny:         { icon: "🎬", label: "Video" },
  unknown:       { icon: "🎬", label: "Video" },
};

// ── Feed ranking ──────────────────────────────────────────────────────────────

type RankedFeedItem = { _kind: "post"; _score: number; _signals: Record<string, number> } & FeedPost;

function rankCommunityFeed(
  posts: FeedPost[],
  buddyIds: Set<string>,
  myReactedPostIds: Set<string>
): RankedFeedItem[] {
  const now = Date.now();

  type RawItem = { _kind: "post" } & FeedPost;
  const raw: RawItem[] = posts.map((p) => ({ ...p, _kind: "post" as const }));

  // Pre-compute engagement velocities for normalization
  const velocities = raw.map((item) => {
    const hours = Math.max(0.1, (now - new Date(item.created_at).getTime()) / 3_600_000);
    const reactions = Object.values(item.reaction_counts || {}).reduce((a, b) => a + b, 0);
    return (reactions + item.comment_count * 2) / hours;
  });
  const maxVelocity = Math.max(1, ...velocities);

  // Score every item
  const scored: RankedFeedItem[] = [];
  raw.forEach((item, i) => {
    const hours = Math.max(0.1, (now - new Date(item.created_at).getTime()) / 3_600_000);

    // Hard filter: older than 7 days AND low engagement
    if (hours > 168 && velocities[i] / maxVelocity < 0.5) return;

    // Signal 1 — Recency (30%)
    const recency = 1 / (1 + hours / 6);

    // Signal 2 — Engagement velocity (25%)
    const engagement = velocities[i] / maxVelocity;

    // Signal 3 — Relationship proximity (20%)
    const proximity = buddyIds.has(item.user_id) ? 1.0 : 0.1;

    // Base score (diversity = 0.10 applied in post-processing)
    const score = recency * 0.30 + engagement * 0.25 + proximity * 0.20;

    scored.push({
      ...item,
      _score: score,
      _signals: { recency, engagement, proximity },
    } as RankedFeedItem);
  });

  // Sort by score desc
  scored.sort((a, b) => b._score - a._score);

  // Hard rule: push already-reacted posts down (below first 5)
  const reacted = scored.filter((i) => myReactedPostIds.has(i.id));
  const notReacted = scored.filter((i) => !myReactedPostIds.has(i.id));
  const reordered = [...notReacted.slice(0, 5), ...reacted, ...notReacted.slice(5)];

  // Signal 4 — Diversity pass (10%): greedy pick, look ahead up to 5 candidates
  function isDiversityViolation(result: RankedFeedItem[], candidate: RankedFeedItem): boolean {
    if (result.length === 0) return false;
    // Never same author twice in a row
    if (result[result.length - 1].user_id === candidate.user_id) return true;
    if (candidate._kind === "post") {
      const pt = (candidate as FeedPost & { _kind: "post" }).post_type;
      const len = result.length;
      if (len >= 2 &&
        result[len - 1]._kind === "post" && (result[len - 1] as any).post_type === pt &&
        result[len - 2]._kind === "post" && (result[len - 2] as any).post_type === pt) return true;
    }
    return false;
  }

  const queue = [...reordered];
  const final: RankedFeedItem[] = [];
  while (queue.length > 0 && final.length < 50) {
    let picked = false;
    for (let k = 0; k < Math.min(queue.length, 5); k++) {
      if (!isDiversityViolation(final, queue[k])) {
        final.push(queue.splice(k, 1)[0]);
        picked = true;
        break;
      }
    }
    if (!picked) { final.push(queue.shift()!); } // force-add top item
  }

  return final;
}

// ── Post Composer ─────────────────────────────────────────────────────────────

type ComposerTab = "thought" | "prayer" | "photo" | "video";
const COMPOSER_TABS: { key: ComposerTab; emoji: string; label: string }[] = [
  { key: "thought", emoji: "💭", label: "Thought" },
  { key: "prayer",  emoji: "🙏", label: "Prayer"  },
  { key: "photo",   emoji: "📷", label: "Photo"   },
  { key: "video",   emoji: "🎬", label: "Video"   },
];

function PostComposer({ userId, userProfile, onPosted }: {
  userId: string;
  userProfile: { display_name: string | null; username: string | null; profile_image_url: string | null } | null;
  onPosted: (post: FeedPost) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<ComposerTab>("thought");
  const [content, setContent] = useState("");
  const [prayerIsRequest, setPrayerIsRequest] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoDurationError, setVideoDurationError] = useState(false);
  const [isPortraitVideo, setIsPortraitVideo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const displayName = userProfile?.display_name || userProfile?.username || "Bible Buddy";


  function reset() {
    setContent(""); setPrayerIsRequest(false);
    setPhotoFile(null); setPhotoPreview(null);
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(null); setVideoPreview(null); setVideoDurationError(false); setIsPortraitVideo(false);
    setTab("thought");
    setExpanded(false);
    setUploadError(null);
  }

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleVideoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3221225472) {
      setUploadError("Video must be under 3 GB.");
      return;
    }
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    const objectUrl = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoPreview(objectUrl);
    setVideoDurationError(false);
    setUploadError(null);
    // Detect portrait vs landscape so we can render the right frame
    const probe = document.createElement("video");
    probe.src = objectUrl;
    probe.onloadedmetadata = () => {
      setIsPortraitVideo(probe.videoHeight > probe.videoWidth);
    };
  }

  const canPost =
    tab === "photo"  ? !!photoFile :
    tab === "video"  ? !!videoFile && !videoDurationError :
    content.trim().length > 0;

  async function handleSubmit() {
    if (!canPost || submitting) return;
    setSubmitting(true);
    setUploadError(null);

    let mediaUrl: string | null = null;
    let linkUrl: string | null = null;

    // Upload photo to Supabase Storage
    if (tab === "photo" && photoFile) {
      const ext = photoFile.name.split(".").pop() ?? "jpg";
      const path = `${userId}/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("post-media").upload(path, photoFile, { upsert: false });
      if (uploadErr) {
        setUploadError("Photo upload failed. Please try again.");
        setSubmitting(false);
        return;
      }
      const { data: pub } = supabase.storage.from("post-media").getPublicUrl(path);
      mediaUrl = pub.publicUrl;
    }

    // Upload video to Bunny Stream via TUS
    if (tab === "video" && videoFile) {
      setUploadProgress(0);
      try {
        // Get video slot + TUS signature from our API
        const credRes = await fetch("/api/bunny/video", { method: "POST" });
        if (!credRes.ok) {
          const err = await credRes.json();
          throw new Error(err.error || "Failed to create video slot");
        }
        const { videoId, libraryId, expiration, signature } = await credRes.json();

        // Upload directly to Bunny via TUS (resumable, no size limit)
        const embedUrl: string = await new Promise((resolve, reject) => {
          const upload = new tus.Upload(videoFile, {
            endpoint: "https://video.bunnycdn.com/tusupload",
            retryDelays: [0, 3000, 5000, 10000, 20000],
            headers: {
              AuthorizationSignature: signature,
              AuthorizationExpire: String(expiration),
              VideoId: videoId,
              LibraryId: String(libraryId),
            },
            metadata: {
              filetype: videoFile.type,
              title: `bb-${Date.now()}`,
            },
            onProgress(bytesUploaded, bytesTotal) {
              setUploadProgress(Math.round((bytesUploaded / bytesTotal) * 100));
            },
            onSuccess() {
              resolve(`https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}`);
            },
            onError(err) {
              reject(err);
            },
          });
          upload.start();
        });

        linkUrl = embedUrl;
        setUploadProgress(null);
      } catch (err) {
        console.error("Bunny video upload error:", err);
        setUploadError(`Video upload failed: ${err instanceof Error ? err.message : "Unknown error"}`);
        setSubmitting(false);
        setUploadProgress(null);
        return;
      }
    }

    const postType: PostType =
      tab === "prayer" && prayerIsRequest ? "prayer_request" :
      tab === "prayer" ? "prayer" :
      tab;

    const payload: Record<string, string | null> = {
      user_id: userId,
      post_type: postType,
      content: content.trim() || "",
      visibility: "community",
      verse_ref: null,
      verse_text: null,
      link_url: linkUrl,
      // For Bunny videos, store orientation so the feed renders the right aspect ratio
      link_title: postType === "video" && linkUrl ? (isPortraitVideo ? "portrait" : "landscape") : null,
      media_url: mediaUrl,
    };

    const { data, error } = await supabase
      .from("feed_posts")
      .insert(payload)
      .select("id, user_id, post_type, content, verse_ref, verse_text, media_url, link_url, link_title, visibility, reaction_counts, comment_count, created_at")
      .single();

    if (error) {
      console.error("Post insert error:", error);
      setUploadError(`Failed to post: ${error.message}`);
      setSubmitting(false);
      return;
    }

    if (data) {
      onPosted({
        ...data,
        display_name: userProfile?.display_name ?? null,
        username: userProfile?.username ?? null,
        profile_image_url: userProfile?.profile_image_url ?? null,
      } as FeedPost);
      triggerPostSuccess();
      triggerToast("Shared to the feed! 🙌");

      void supabase.rpc("log_feed_activity", {
        p_activity_type: "post_created",
        p_activity_data: { post_id: data.id, post_type: postType, content_preview: content.trim().slice(0, 80) },
        p_feed_post_id: data.id,
        p_is_public: true,
      });

      void logActionToMasterActions(userId,
        postType === "thought" ? "feed_post_thought" :
        postType === "prayer" ? "feed_post_prayer" :
        postType === "prayer_request" ? "feed_post_prayer_request" :
        postType === "photo" ? "feed_post_photo" : "feed_post_video",
        postType === "thought" ? content.trim().slice(0, 80) :
        postType === "prayer" ? "Prayer" :
        postType === "prayer_request" ? "Prayer Request" :
        postType === "photo" ? "Photo post" : "Video post"
      );

      reset();
    }
    setSubmitting(false);
  }

  if (!expanded) {
    return (
      <div className="bb-community-composer mb-5 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <Avatar userId={userId} displayName={displayName} imageUrl={userProfile?.profile_image_url ?? null} size={10} />
        <button
          type="button"
          onClick={() => setExpanded(true)}
          // truncate, so a narrow phone keeps this a one-line pill. Wrapped,
          // the rounded-full border balloons into a blob around three lines
          // of placeholder.
          className="min-w-0 flex-1 truncate rounded-full border border-gray-200 bg-gray-50/70 px-4 py-2.5 text-left text-sm text-gray-400 transition hover:border-gray-300 hover:bg-gray-50"
        >
          Share something with the community...
        </button>
        {/* Photo gets its own way in, because "add a picture" is a different
            intention from "write something" and finding it behind a tab you
            have to open first is why nobody adds pictures. */}
        <button
          type="button"
          onClick={() => { setTab("photo"); setExpanded(true); }}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-2 py-2 text-sm font-semibold text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span className="hidden sm:inline">Photo</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bb-community-composer bg-white border border-gray-200 rounded-xl shadow-sm mb-6 overflow-hidden">
      {/* Tab selector */}
      <div className="flex border-b border-gray-100">
        {COMPOSER_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2.5 text-xs font-semibold transition border-b-2 ${
              tab === t.key
                ? "border-green-500 text-green-700 bg-green-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      <div className="p-4 flex flex-col gap-3">

        {/* ── PRAYER: sub-type toggle ── */}
        {tab === "prayer" && (
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5 self-start">
            <button
              onClick={() => setPrayerIsRequest(false)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                !prayerIsRequest ? "bg-white shadow-sm text-gray-800" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              🙏 Prayer
            </button>
            <button
              onClick={() => setPrayerIsRequest(true)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                prayerIsRequest ? "bg-white shadow-sm text-gray-800" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              🤲 Prayer Request
            </button>
          </div>
        )}

        {/* ── PHOTO: file picker + preview ── */}
        {tab === "photo" && (
          <div>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoSelect}
            />
            {!photoPreview ? (
              <button
                onClick={() => photoInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center gap-2 hover:border-green-400 hover:bg-green-50/50 transition"
              >
                <span className="text-3xl">📷</span>
                <span className="text-sm font-semibold text-gray-600">Tap to add a photo</span>
                <span className="text-xs text-gray-400">Choose from library or take a new one</span>
              </button>
            ) : (
              <div className="relative">
                <img src={photoPreview} alt="Preview" className="w-full rounded-xl object-cover max-h-64" />
                <button
                  onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white text-xs hover:bg-black/80 transition"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── VIDEO: file upload + preview ── */}
        {tab === "video" && (
          <div>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={handleVideoSelect}
            />
            {!videoPreview ? (
              <button
                onClick={() => videoInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center gap-2 hover:border-green-400 hover:bg-green-50/50 transition"
              >
                <span className="text-3xl">🎬</span>
                <span className="text-sm font-semibold text-gray-600">Tap to upload a video</span>
                <span className="text-xs text-gray-400">MP4, MOV, or WebM · up to 3 GB</span>
              </button>
            ) : (
              <div className="relative">
                <video
                  src={videoPreview}
                  controls
                  playsInline
                  className="w-full rounded-xl"
                  style={{ maxHeight: "320px" }}
                  onLoadedMetadata={(e) => {
                    if (e.currentTarget.duration > 90) {
                      setVideoDurationError(true);
                      setUploadError("Video must be 90 seconds or shorter.");
                    } else {
                      setVideoDurationError(false);
                      setUploadError(null);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (videoPreview) URL.revokeObjectURL(videoPreview);
                    setVideoFile(null); setVideoPreview(null);
                    setVideoDurationError(false); setUploadError(null);
                  }}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white text-xs hover:bg-black/80 transition"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── CAPTION / CONTENT textarea (all types) ── */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            tab === "thought" ? "What's on your heart?" :
            tab === "prayer"  ? (prayerIsRequest ? "What would you like prayer for?" : "Share your prayer...") :
            tab === "photo"   ? "Add a caption... (optional)" :
            "Say something about this video... (optional)"
          }
          rows={tab === "photo" || tab === "video" ? 2 : 3}
          autoFocus={tab !== "photo"}
          className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2">
            <button onClick={reset} className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-100 transition">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canPost || submitting}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition disabled:opacity-40"
              style={{ backgroundColor: "#4a9b6f" }}
            >
              {submitting && tab === "video" && uploadProgress !== null
                ? `Uploading ${uploadProgress}%`
                : submitting ? "Posting..." : "Post"}
            </button>
        </div>
        {/* Video upload progress bar */}
        {tab === "video" && uploadProgress !== null && (
          <div className="px-4 pb-3">
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%`, backgroundColor: "#4a9b6f" }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 text-center">Uploading to Bible Buddy Feed… {uploadProgress}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────

/**
 * Avatar sizes, written out rather than built up.
 *
 * This was `w-${size} h-${size}`, and Tailwind never sees a class spelled
 * like that: it scans the source for literal names, so a size only had a
 * width at all if some other file happened to contain the same utility. Every
 * size here is a string the scanner can find, which is the difference between
 * an avatar and a 0x0 box.
 */
const AVATAR_SIZES: Record<number, string> = {
  6: "w-6 h-6",
  7: "w-7 h-7",
  8: "w-8 h-8",
  9: "w-9 h-9",
  10: "w-10 h-10",
  11: "w-11 h-11",
  12: "w-12 h-12",
};

function Avatar({ userId, displayName, imageUrl, size = 9 }: {
  userId: string;
  displayName: string;
  imageUrl: string | null;
  size?: number;
}) {
  const initials = displayName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const cls = `${AVATAR_SIZES[size] ?? AVATAR_SIZES[9]} rounded-full flex-shrink-0`;
  if (imageUrl) {
    return <img src={imageUrl} alt={displayName} className={`${cls} object-cover`} />;
  }
  return (
    <div
      className={`${cls} flex items-center justify-center text-white text-xs font-bold`}
      style={{ backgroundColor: avatarColor(userId) }}
    >
      {initials}
    </div>
  );
}

// ── Comment Section ───────────────────────────────────────────────────────────

function CommentSection({ postId, postUserId, postTitle, postContent, myId, myProfile, currentUserIsAdmin, onCountChange, highlightCommentId }: {
  postId: string;
  postUserId: string;
  postTitle?: string | null;
  postContent?: string | null;
  myId: string;
  myProfile: MyProfile;
  currentUserIsAdmin: boolean;
  onCountChange: (delta: number) => void;
  highlightCommentId?: string | null;
}) {
  const [comments, setComments] = useState<FeedComment[]>([]);

  /**
   * Who liked which comment, and how many.
   *
   * Loaded with the thread in one query over all of its comments rather than
   * one per row, and kept as a count plus a set of the ones this reader has
   * liked - which is everything the row needs to draw.
   */
  const [commentLikeCounts, setCommentLikeCounts] = useState<Record<string, number>>({});
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // parent comment id
  const [replyText, setReplyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [savingCommentId, setSavingCommentId] = useState<string | null>(null);
  const [autoReplyLoadingId, setAutoReplyLoadingId] = useState<string | null>(null);
  const [autoCommentLoading, setAutoCommentLoading] = useState(false);
  const currentUserBadge = myProfile?.member_badge ?? null;

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("feed_post_comments")
        .select("id, post_id, user_id, parent_comment_id, content, created_at")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (!data || data.length === 0) { setComments([]); setLoading(false); return; }

      // Blocking has to reach the comments too, or the person you blocked is
      // still talking to you one level down. Cached in lib/userBlocks, so this
      // is not a query per post.
      const blocked = await getBlockedUserIds();
      const visible = blocked.size ? data.filter((c) => !blocked.has(c.user_id)) : data;
      if (visible.length === 0) { setComments([]); setLoading(false); return; }

      const userIds = [...new Set(visible.map((c) => c.user_id))];
      const { data: profiles } = await supabase
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url")
        .in("user_id", userIds);

      const p = profiles || [];
      setComments(visible.map((c) => {
        const prof = p.find((pr) => pr.user_id === c.user_id);
        return { ...c, display_name: prof?.display_name ?? null, username: prof?.username ?? null, profile_image_url: prof?.profile_image_url ?? null };
      }));
      setLoading(false);

      // Likes for the whole thread, in one query.
      const { data: likes } = await supabase
        .from("feed_post_comment_likes")
        .select("comment_id, user_id")
        .in("comment_id", visible.map((c) => c.id));

      const counts: Record<string, number> = {};
      const mine = new Set<string>();
      for (const like of likes || []) {
        counts[like.comment_id] = (counts[like.comment_id] ?? 0) + 1;
        if (like.user_id === myId) mine.add(like.comment_id);
      }
      setCommentLikeCounts(counts);
      setLikedComments(mine);
    }
    void load();
  }, [postId, myId]);

  /**
   * Like, or take it back. Optimistic, because a like that waits for a round
   * trip before it moves reads as a tap that did not register.
   */
  async function toggleCommentLike(comment: FeedComment) {
    const liked = likedComments.has(comment.id);

    setLikedComments((prev) => {
      const next = new Set(prev);
      if (liked) next.delete(comment.id);
      else next.add(comment.id);
      return next;
    });
    setCommentLikeCounts((prev) => ({
      ...prev,
      [comment.id]: Math.max((prev[comment.id] ?? 0) + (liked ? -1 : 1), 0),
    }));

    if (liked) {
      await supabase
        .from("feed_post_comment_likes")
        .delete()
        .eq("comment_id", comment.id)
        .eq("user_id", myId);
      return;
    }

    const { error } = await supabase
      .from("feed_post_comment_likes")
      .insert({ comment_id: comment.id, user_id: myId });

    // Put it back if the insert was refused, rather than leaving a like on
    // screen that the database never took.
    if (error) {
      setLikedComments((prev) => {
        const next = new Set(prev);
        next.delete(comment.id);
        return next;
      });
      setCommentLikeCounts((prev) => ({
        ...prev,
        [comment.id]: Math.max((prev[comment.id] ?? 1) - 1, 0),
      }));
    }
  }

  async function submitComment(content: string, parentId: string | null) {
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from("feed_post_comments")
      .insert({ post_id: postId, user_id: myId, parent_comment_id: parentId, content: content.trim() })
      .select("id, post_id, user_id, parent_comment_id, content, created_at")
      .single();

    if (!error && data) {
      const newC: FeedComment = {
        ...data,
        display_name: myProfile?.display_name ?? null,
        username: myProfile?.username ?? null,
        profile_image_url: myProfile?.profile_image_url ?? null,
      };
      setComments((prev) => [...prev, newC]);
      onCountChange(1);
      void logActionToMasterActions(myId, parentId ? "feed_post_replied" : "feed_post_commented", `post:${postId}`);

    }
    setNewComment("");
    setReplyText("");
    setReplyingTo(null);
    setSubmitting(false);
  }

  function canDeleteComment(comment: FeedComment) {
    return (
      comment.user_id === myId ||
      currentUserBadge === "moderator" ||
      currentUserIsAdmin
    );
  }

  function canEditComment(comment: FeedComment) {
    return comment.user_id === myId;
  }

  async function handleDeleteComment(comment: FeedComment) {
    if (submitting) return;
    triggerSmokeDelete();

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
          kind: "feed_post_comment",
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
        onCountChange(payload.nextCommentCount - comments.length);
      } else {
        onCountChange(-deletedIds.size);
      }

      if (replyingTo && deletedIds.has(replyingTo)) {
        setReplyingTo(null);
        setReplyText("");
      }

      if (editingCommentId && deletedIds.has(editingCommentId)) {
        setEditingCommentId(null);
        setEditingCommentText("");
      }
    } catch (error) {
      console.error("Failed to delete feed comment:", error);
    }
  }

  async function handleSaveCommentEdit(comment: FeedComment) {
    const nextContent = editingCommentText.trim();
    if (!nextContent || savingCommentId) return;

    setSavingCommentId(comment.id);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch("/api/comments/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          kind: "feed_post_comment",
          commentId: comment.id,
          content: nextContent,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not save this comment.");
      }

      setComments((prev) =>
        prev.map((item) =>
          item.id === comment.id
            ? { ...item, content: payload.comment?.content ?? nextContent }
            : item
        )
      );
      setEditingCommentId(null);
      setEditingCommentText("");
    } catch (error) {
      console.error("Failed to edit feed comment:", error);
    }

    setSavingCommentId(null);
  }

  async function handleAutoReply(comment: FeedComment) {
    if (!currentUserIsAdmin) return;
    if (autoReplyLoadingId) return;
    setAutoReplyLoadingId(comment.id);
    setReplyingTo(comment.id);

    // Answering a reply: the draft also gets the comment it hangs under, or
    // it would be written blind to what the thread is actually about.
    const parent = comment.parent_comment_id
      ? comments.find((item) => item.id === comment.parent_comment_id)
      : null;
    const context = parent
      ? [postContent || "", `Earlier in this thread, ${parent.display_name || parent.username || "someone"} wrote: ${parent.content}`]
          .filter(Boolean)
          .join("\n\n")
      : postContent;

    try {
      const draft = await requestAutoReplyDraft({
        originalPostTitle: postTitle || null,
        originalPostContent: context || null,
        targetCommentContent: comment.content,
        targetDisplayName: comment.display_name || comment.username || "Bible Buddy",
      });
      setReplyText(draft);
    } catch (error) {
      triggerToast(error instanceof Error ? error.message : "Could not generate a reply draft.");
    }

    setAutoReplyLoadingId(null);
  }

  async function handleAutoComment() {
    if (!currentUserIsAdmin) return;
    if (autoCommentLoading || postUserId === myId) return;
    setAutoCommentLoading(true);

    try {
      const draft = await requestAutoReplyDraft({
        originalPostTitle: postTitle || null,
        originalPostContent: postContent || null,
        targetCommentContent: postContent || postTitle || "",
        targetDisplayName: "Bible Buddy",
      });
      setNewComment(draft);
    } catch (error) {
      triggerToast(error instanceof Error ? error.message : "Could not generate a comment draft.");
    }

    setAutoCommentLoading(false);
  }

  const topLevel = comments.filter((c) => !c.parent_comment_id);
  const replies = (parentId: string) => comments.filter((c) => c.parent_comment_id === parentId);

  // Handed to CommentRow, which lives at module scope so the reply box is not
  // rebuilt on every keystroke.
  const commentRowContext: CommentRowContext = {
    highlightCommentId,
    editingCommentId,
    editingCommentText,
    setEditingCommentText,
    handleSaveCommentEdit,
    savingCommentId,
    setEditingCommentId,
    toggleCommentLike,
    likedComments,
    commentLikeCounts,
    replyingTo,
    setReplyingTo,
    replyText,
    setReplyText,
    submitComment,
    submitting,
    currentUserIsAdmin,
    handleAutoReply,
    autoReplyLoadingId,
    canEditComment,
    canDeleteComment,
    handleDeleteComment,
    myId,
    replies,
  };


  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      {loading ? (
        <p className="text-xs text-gray-400 text-center py-2">Loading comments...</p>
      ) : (
        <div>
          {topLevel.map((c) => <CommentRow key={c.id} comment={c} ctx={commentRowContext} />)}
        </div>
      )}

      {/* New top-level comment input */}
      <div className="flex gap-2 items-end mt-3">
        <Avatar userId={myId} displayName={myProfile?.display_name || myProfile?.username || "You"} imageUrl={myProfile?.profile_image_url ?? null} size={8} />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows={1}
          className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void submitComment(newComment, null);
            }
          }}
        />
        {currentUserIsAdmin && postUserId !== myId && (
          <button
            type="button"
            onClick={() => void handleAutoComment()}
            disabled={autoCommentLoading}
            className="text-xs font-semibold text-gray-500 px-3 py-2 rounded-xl border border-gray-200 transition hover:text-[#4a9b6f] hover:border-[#cfe4d8] disabled:opacity-50 flex-shrink-0"
          >
            {autoCommentLoading ? "Writing..." : "Auto Comment"}
          </button>
        )}
        <button
          onClick={() => submitComment(newComment, null)}
          disabled={!newComment.trim() || submitting}
          className="text-xs font-semibold text-white px-3 py-2 rounded-xl transition disabled:opacity-40 flex-shrink-0"
          style={{ backgroundColor: "#4a9b6f" }}
        >
          Post
        </button>
      </div>
    </div>
  );
}

// ── Video Block (autoplay on scroll like IG) ──────────────────────────────────

type CommentRowContext = {
  highlightCommentId?: string | null;
  editingCommentId: string | null;
  editingCommentText: string;
  setEditingCommentText: (value: string) => void;
  handleSaveCommentEdit: (comment: FeedComment) => void | Promise<void>;
  savingCommentId: string | null;
  setEditingCommentId: (value: string | null) => void;
  toggleCommentLike: (comment: FeedComment) => void | Promise<void>;
  likedComments: Set<string>;
  commentLikeCounts: Record<string, number>;
  replyingTo: string | null;
  setReplyingTo: (value: string | null) => void;
  replyText: string;
  setReplyText: (value: string) => void;
  submitComment: (content: string, parentId: string | null) => void | Promise<void>;
  submitting: boolean;
  currentUserIsAdmin: boolean;
  handleAutoReply: (comment: FeedComment) => void | Promise<void>;
  autoReplyLoadingId: string | null;
  canEditComment: (comment: FeedComment) => boolean;
  canDeleteComment: (comment: FeedComment) => boolean;
  handleDeleteComment: (comment: FeedComment) => void | Promise<void>;
  myId: string;
  replies: (parentId: string) => FeedComment[];
};

/**
 * One comment, and the replies under it.
 *
 * This lives at module scope on purpose. It used to be declared inside
 * CommentSection, which made it a brand new component type on every render -
 * so every keystroke in the reply box unmounted the box, remounted it, and
 * autoFocus put the caret back at the start. Typing "hello" produced "olleh"
 * (Louis, 2026-10-18). Everything it needs now arrives in ctx.
 */
function CommentRow({
  comment,
  indent = false,
  ctx,
}: {
  comment: FeedComment;
  indent?: boolean;
  ctx: CommentRowContext;
}) {
  const name = comment.display_name || comment.username || "Bible Buddy";
  const isHighlightComment = comment.id === ctx.highlightCommentId;
  const commentRowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isHighlightComment && commentRowRef.current) {
      const t = setTimeout(() => {
        commentRowRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 700);
      return () => clearTimeout(t);
    }
  }, [isHighlightComment]);
  return (
    <div
      ref={commentRowRef}
      className={`flex gap-2 ${indent ? "mt-3 border-l border-[var(--bb-card-border,#e8ddd0)] pl-2 sm:pl-3" : "mt-2"} ${isHighlightComment ? "rounded-xl ring-2 ring-green-300 p-1 -mx-1" : ""}`}
    >
      <Link href={`/profile/${comment.user_id}`} className="flex-shrink-0 mt-0.5">
        <Avatar userId={comment.user_id} displayName={name} imageUrl={comment.profile_image_url} size={indent ? 5 : 6} />
      </Link>
      <div className="flex-1 min-w-0">
        <div className={`rounded-xl px-3 py-2 ${isHighlightComment ? "border border-[var(--bb-accent,#4a9b6f)] bg-[var(--bb-accent-soft,#ecfdf3)]" : "bg-[var(--bb-surface-soft,#f9fafb)]"}`}>
          <Link href={`/profile/${comment.user_id}`} className="text-sm font-bold text-[var(--bb-text-primary,#1f2937)] hover:underline">
            {name}
          </Link>
          {ctx.editingCommentId === comment.id ? (
            <div className="mt-2 space-y-2">
              <textarea
                value={ctx.editingCommentText}
                onChange={(e) => ctx.setEditingCommentText(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => void ctx.handleSaveCommentEdit(comment)}
                  disabled={ctx.savingCommentId === comment.id || !ctx.editingCommentText.trim()}
                  className="rounded-xl bg-[#4a9b6f] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                >
                  {ctx.savingCommentId === comment.id ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    ctx.setEditingCommentId(null);
                    ctx.setEditingCommentText("");
                  }}
                  className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[var(--bb-text-secondary,#374151)] mt-0.5 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
          )}
        </div>
        <div className="flex items-center gap-3 mt-0.5 px-1">
          <span className="text-xs text-gray-400">{timeAgo(comment.created_at)}</span>
          {/* Liking a comment. The group had it and the feed never did, so
              "somebody liked your comment" had nothing to fire on (Louis,
              2026-10-18). The notification is written by a trigger on
              feed_post_comment_likes, the same way post likes are. */}
          <button
            type="button"
            onClick={() => void ctx.toggleCommentLike(comment)}
            aria-pressed={ctx.likedComments.has(comment.id)}
            className={`flex items-center gap-1 text-xs font-semibold transition ${
              ctx.likedComments.has(comment.id) ? "text-[#2f7fe8]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <svg
              className="h-3.5 w-3.5"
              fill={ctx.likedComments.has(comment.id) ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Like
            {(ctx.commentLikeCounts[comment.id] ?? 0) > 0 ? ` ${ctx.commentLikeCounts[comment.id]}` : ""}
          </button>
          <button
            onClick={() => {
              const closing = ctx.replyingTo === comment.id;
              ctx.setReplyingTo(closing ? null : comment.id);
              // Answering a reply opens with that person's name already in the
              // box, so a thread reads as a conversation rather than a pile.
              ctx.setReplyText(closing || !indent ? "" : `@${name} `);
            }}
            className="text-xs text-gray-400 hover:text-green-600 font-semibold transition"
          >
            Reply
          </button>
          {/* Auto Reply sits on replies too, not just on the top comment:
              a thread is where someone answers back, and that answer is the
              one most worth helping Louis write (2026-10-19). */}
          {ctx.currentUserIsAdmin && (
            <button
              type="button"
              onClick={() => void ctx.handleAutoReply(comment)}
              disabled={ctx.autoReplyLoadingId === comment.id}
              className="text-xs text-gray-400 hover:text-[#4a9b6f] font-semibold transition disabled:opacity-50"
            >
              {ctx.autoReplyLoadingId === comment.id ? "Writing..." : "Auto Reply"}
            </button>
          )}
          {ctx.canEditComment(comment) && ctx.editingCommentId !== comment.id && (
            <button
              type="button"
              onClick={() => {
                ctx.setEditingCommentId(comment.id);
                ctx.setEditingCommentText(comment.content);
                ctx.setReplyingTo(null);
                ctx.setReplyText("");
              }}
              className="text-xs text-gray-400 hover:text-green-600 font-semibold transition"
            >
              Edit
            </button>
          )}
          {ctx.canDeleteComment(comment) && (
            <button
              type="button"
              onClick={() => void ctx.handleDeleteComment(comment)}
              className="text-xs text-gray-400 hover:text-red-500 font-semibold transition"
            >
              Delete
            </button>
          )}
          {/* A comment needs reporting as much as a post does, and this is
              where blocking reaches the person who is replying rather than
              posting. The menu hides itself on your own comment. */}
          <ReportBlockMenu
            targetUserId={comment.user_id}
            targetName={name}
            contentType="feed_comment"
            contentId={comment.id}
            currentUserId={ctx.myId}
            reportLabel="Report comment"
            size="sm"
            align="left"
          />
        </div>
        {/* Reply input */}
        {ctx.replyingTo === comment.id && (
          <div className="ml-0 mt-1 flex gap-2 items-end">
            <textarea
              value={ctx.replyText}
              onChange={(e) => ctx.setReplyText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void ctx.submitComment(ctx.replyText, indent ? comment.parent_comment_id ?? comment.id : comment.id);
                }
              }}
              placeholder={`Reply to ${name}...`}
              rows={1}
              autoFocus
              className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={() => ctx.submitComment(ctx.replyText, indent ? comment.parent_comment_id ?? comment.id : comment.id)}
              disabled={!ctx.replyText.trim() || ctx.submitting}
              className="text-xs font-semibold text-white px-3 py-2 rounded-xl transition disabled:opacity-40 flex-shrink-0"
              style={{ backgroundColor: "#4a9b6f" }}
            >
              Reply
            </button>
          </div>
        )}
        {/* The replies under this comment. Answering any of them posts here too,
            so a thread stays one level deep and reads top to bottom. */}
        {!indent && ctx.replies(comment.id).map((reply) => (
          <CommentRow key={reply.id} comment={reply} indent ctx={ctx} />
        ))}
      </div>
    </div>
  );
}

function VideoBlock({ post }: { post: FeedPost }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [everInView, setEverInView] = useState(false);

  // Intersection Observer — fire when 40% of the block is visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);
        if (visible) setEverInView(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play / pause native <video> elements
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  // ── Direct upload (Supabase mp4) ──────────────────────────────────────────
  if (post.post_type === "video" && post.media_url) {
    return (
      <div ref={containerRef} className="mt-3 flex justify-center">
        <video
          ref={videoRef}
          src={post.media_url}
          muted
          playsInline
          loop
          controls
          className="rounded-xl bg-black w-full"
          style={{ maxHeight: "480px" }}
        />
      </div>
    );
  }

  // ── Embedded video (Bunny, YouTube, TikTok, Instagram) ────────────────────
  if (post.post_type === "video" && post.link_url) {
    const parsed = parseVideoEmbed(post.link_url);

    if (parsed.embedUrl) {
      const isBunny = parsed.platform === "bunny";
      // For Bunny: use link_title to know orientation. Default portrait if unknown.
      const isPortrait = isBunny
        ? (post.link_title === "landscape" ? false : true)
        : parsed.portrait;
      // Bunny: autoplay=true + muted=true so browser allows it. Mount iframe only
      // when inView so it autoplays on scroll-in and stops on scroll-out.
      const embedSrc = isBunny
        ? `${parsed.embedUrl}?autoplay=1&muted=1&loop=1&preload=true&controls=false`
        : parsed.embedUrl;

      if (!isPortrait) {
        // Landscape 16:9
        return (
          <div ref={containerRef} className="mt-3 relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingBottom: "56.25%" }}>
            {inView ? (
              <iframe
                src={embedSrc}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-2xl ml-1">▶</span>
                </div>
              </div>
            )}
          </div>
        );
      }

      // Portrait 9:16 — full-width like Instagram Reels
      return (
        <div ref={containerRef} className="mt-3 relative w-full rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "9/16", maxHeight: "600px" }}>
          {inView ? (
            <iframe
              src={embedSrc}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              scrolling="no"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-2xl ml-1">▶</span>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Unembeddable link fallback
    const meta = VIDEO_PLATFORM_META[parsed.platform];
    return (
      <a href={post.link_url} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
        <span className="text-2xl">{meta.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800">{meta.label}</p>
          <p className="text-xs text-gray-400 truncate">{post.link_url}</p>
        </div>
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    );
  }

  return null;
}

/**
 * The body of a post: its own formatting, and long ones folded.
 *
 * Louis, 2026-10-18: "the formatting is terrible, this is not how it should
 * show, it all jumbled, it should be formatted and have a read more button."
 * He was looking at a Bible Buddy study post - a verse, a blank line, a
 * paragraph, three bullets - arriving as one unbroken run of text with the
 * bullet emoji stranded mid-sentence, because the pass that copied those posts
 * off the wall turned every tag into a space and then collapsed every run of
 * whitespace into one. The line breaks are back in the stored text; this
 * renders them as what they are.
 *
 * Blank-line-separated blocks become paragraphs. A block of bullet lines
 * becomes a list with hanging indents, so wrapped text lines up under its own
 * first word rather than under the bullet. A post that opens on a quotation
 * gets the quote rule, the same as a shared verse does.
 *
 * Long posts fold to about six lines behind a fade, because one study filling
 * the whole screen is a wall nobody scrolls past. The fold is deliberately
 * generous: most of what people write themselves is shorter than this and
 * never sees a button at all.
 */
const FOLD_AFTER_CHARS = 420;
const FOLD_AFTER_BLOCKS = 3;
/** Longer than this and an opening line is a sentence, not a heading. */
const HEADLINE_MAX_CHARS = 90;

/**
 * [label](href) and bare URLs, rendered as something you can tap.
 *
 * Bible Buddy's posts are written with links in them - "Complete Day 18
 * here", "read the article", "get it in print" - and the pass that brought
 * them into the feed used to keep the words and throw the destination away.
 * A pinned devotional whose one job is to open today's day, that could not
 * open it (Louis, 2026-10-18).
 *
 * An internal path goes through next/link so it stays inside the app; an
 * outside address opens in a new tab with the usual rel.
 */
const MARKDOWN_LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g;

function renderWithLinks(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(MARKDOWN_LINK.source, "g");

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) out.push(text.slice(cursor, match.index));
    const [, label, href] = match;
    const internal = href.startsWith("/") || href.startsWith("https://www.mybiblebuddy.net");
    const path = href.replace(/^https:\/\/www\.mybiblebuddy\.net/, "") || "/";

    out.push(
      internal ? (
        <Link
          key={`${keyPrefix}-${match.index}`}
          href={path}
          className="font-bold underline"
          style={{ color: "#2f7fe8" }}
        >
          {label}
        </Link>
      ) : (
        <a
          key={`${keyPrefix}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
          style={{ color: "#2f7fe8" }}
        >
          {label}
        </a>
      ),
    );
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

function PostBody({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);

  const blocks = content.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const foldable = content.length > FOLD_AFTER_CHARS || blocks.length > FOLD_AFTER_BLOCKS;
  const folded = foldable && !expanded;

  return (
    <div>
      <div className="relative overflow-hidden" style={folded ? { maxHeight: "9.5rem" } : undefined}>
        {blocks.map((block, index) => {
          const lines = block.split("\n").filter(Boolean);
          const isList = lines.length > 0 && lines.every((line) => /^[\u2022\-*]\s+/.test(line));

          // A headline, when the post actually has one - never forced.
          //
          // Bible Buddy's own posts carry their heading on the first line
          // (lib/htmlToPlainText), and people write that way too: a short line,
          // then the thing itself. A first block that is short, single-line
          // and followed by more is that heading; anything else is just the
          // post opening with a sentence, and gets no special treatment.
          if (index === 0 && !isList && lines.length === 1 && block.length <= HEADLINE_MAX_CHARS && blocks.length > 1) {
            return (
              <p key={index} className="text-[17px] font-bold leading-snug text-gray-900">
                {renderWithLinks(block, `h${index}`)}
              </p>
            );
          }

          if (isList) {
            return (
              <ul key={index} className={index > 0 ? "mt-2 space-y-1" : "space-y-1"}>
                {lines.map((line, lineIndex) => (
                  <li key={lineIndex} className="pl-4 -indent-4 text-sm text-gray-800 leading-relaxed">
                    {renderWithLinks(line.replace(/^[\u2022\-*]\s+/, "\u2022 "), `l${index}-${lineIndex}`)}
                  </li>
                ))}
              </ul>
            );
          }

          if (index === 0 && /^["\u201c]/.test(block)) {
            return (
              <p
                key={index}
                className="border-l-2 border-green-400 pl-3 text-sm italic text-gray-700 leading-relaxed whitespace-pre-wrap"
              >
                {renderWithLinks(block, `q${index}`)}
              </p>
            );
          }

          return (
            <p
              key={index}
              className={index > 0
                ? "mt-2 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap"
                : "text-sm text-gray-800 leading-relaxed whitespace-pre-wrap"}
            >
              {renderWithLinks(block, `p${index}`)}
            </p>
          );
        })}

        {folded && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0), #ffffff)" }}
          />
        )}
      </div>

      {foldable && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-1 text-sm font-bold"
          // Inline, because globals.css carries unlayered colour rules that
          // outrank a utility class - see components/home/BibleLockBanner.
          style={{ color: "#2f7fe8" }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

// ── Post Card ─────────────────────────────────────────────────────────────────

function PostCard({ post, myId, myProfile, currentUserIsAdmin, myReactions, onReact, onCommentCountChange, onDelete, highlightPostId, highlightCommentId, preview, pinned, buddyState, onBuddyRequested }: {
  post: FeedPost;
  myId: string;
  myProfile: MyProfile;
  currentUserIsAdmin: boolean;
  myReactions: Set<string>;
  onReact: (postId: string, reaction: string) => void;
  onCommentCountChange: (postId: string, delta: number) => void;
  onDelete: (postId: string) => void;
  highlightPostId?: string | null;
  highlightCommentId?: string | null;
  /** Who has commented and when, for the row under the post. */
  preview?: CommentPreview;
  /** Held at the top of the feed rather than ranked into it. */
  pinned?: boolean;
  /** Where the reader stands with this post's author. */
  buddyState?: BuddyState;
  onBuddyRequested: (targetUserId: string) => void;
}) {
  const isHighlighted = post.id === highlightPostId;
  const cardRef = useRef<HTMLDivElement>(null);
  const [showComments, setShowComments] = useState(false);

  // Auto-scroll and open comments when this post is the deep-link target
  useEffect(() => {
    if (isHighlighted) {
      setShowComments(true);
      const t = setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isHighlighted]);
  const [localCommentCount, setLocalCommentCount] = useState(post.comment_count);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loveAnimating, setLoveAnimating] = useState(false);
  const [likersOpen, setLikersOpen] = useState(false);
  const [likers, setLikers] = useState<{ user_id: string; display_name: string | null; username: string | null; profile_image_url: string | null }[]>([]);
  const [likersLoading, setLikersLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const displayName = post.display_name || post.username || "Bible Buddy";
  const isMyPost = post.user_id === myId;

  async function openLikers() {
    setLikersOpen(true);
    if (likers.length > 0 && !likersLoading) return; // already loaded
    setLikersLoading(true);
    const { data: reactions } = await supabase
      .from("feed_post_reactions")
      .select("user_id")
      .eq("post_id", post.id)
      .eq("reaction_type", "love");
    if (!reactions || reactions.length === 0) { setLikers([]); setLikersLoading(false); return; }
    const ids = reactions.map((r) => r.user_id);
    const { data: profiles } = await supabase
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url")
      .in("user_id", ids);
    setLikers(profiles || []);
    setLikersLoading(false);
  }

  function showToastMsg(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleDelete() {
    triggerSmokeDelete();
    setDeleting(true);
    await supabase.from("feed_post_reactions").delete().eq("post_id", post.id);
    await supabase.from("feed_post_comments").delete().eq("post_id", post.id);
    await supabase.from("feed_posts").delete().eq("id", post.id);
    setDeleting(false);
    setShowDeleteModal(false);
    setDeleted(true);
    setTimeout(() => onDelete(post.id), 500);
  }

  if (deleted) {
    return <div className="transition-all duration-500 opacity-0 h-0 overflow-hidden" />;
  }
  const loveCount = post.reaction_counts?.["love"] ?? 0;
  const loveActive = myReactions.has(`${post.id}:love`);

  // An automatic completion, or something somebody typed. Either way it is a
  // post and gets the same card, the same like, the same comment thread -
  // Louis, 2026-10-18: "everything needs to be in post form". The only thing
  // this changes is the quiet label under the name and the study's title
  // being set in bold.
  const studyActivity = readStudyActivity(post.content);

  return (
    <div ref={cardRef} className={`bb-community-post-card bg-white border rounded-xl p-4 shadow-sm relative transition-all ${isHighlighted ? "border-green-400 ring-2 ring-green-200" : "border-gray-200"}`}>
      {pinned ? (
        <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-400">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.5 1a1 1 0 0 0-1 1v1.1L6.2 5.4A3 3 0 0 0 5.3 7.5v.8a1 1 0 0 0 1 1h2.7v6.2a1 1 0 0 0 2 0V9.3h2.7a1 1 0 0 0 1-1v-.8a3 3 0 0 0-.9-2.1L11.5 3.1V2a1 1 0 0 0-1-1h-1Z" />
          </svg>
          Pinned
        </p>
      ) : null}

      {/* Header: who, when, and the menu. Nothing else.

          The post type used to sit here as a grey pill - "Thought" on every
          single post, including the automatic completions, which is both
          noise and wrong. A photo announces itself by being a photo. The one
          thing worth saying is when a post was not typed by a person, and
          that is the Study activity line below. */}
      <div className="flex items-start gap-3 mb-3">
        <Link href={`/profile/${post.user_id}`} className="flex-shrink-0">
          <Avatar userId={post.user_id} displayName={displayName} imageUrl={post.profile_image_url} size={11} />
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/profile/${post.user_id}`} className="block truncate text-[15px] font-bold leading-tight text-gray-900 hover:underline">
            {displayName}
          </Link>
          <p className="mt-0.5 text-xs text-gray-400">{timeAgo(post.created_at)}</p>
          {studyActivity ? (
            <p className="mt-0.5 text-xs text-gray-400">Study activity</p>
          ) : null}
        </div>

        {/* Add them, from the post that made you want to.
            Bible Buddy is an account rather than a person, so it is skipped -
            there is nobody there to accept. */}
        {post.user_id !== BIBLE_BUDDY_USER_ID ? (
          <AddBuddyButton
            targetUserId={post.user_id}
            targetName={displayName}
            myId={myId}
            myName={myProfile?.display_name || myProfile?.username || "Someone"}
            state={buddyState ?? "none"}
            onRequested={onBuddyRequested}
          />
        ) : null}
        {/* Delete: your own post, or anybody's if you are an admin.

            Louis, 2026-10-18: "I need a delete option on all the posts in the
            feed." He is the only person this changes anything for - everyone
            else still sees Report and Block on somebody else's post, which is
            what App Store guideline 1.2 wants there - and without it the only
            way to take down something that should not be on the wall was to
            open the database.

            Somebody else's post, for everybody who is not an admin, goes
            through the shared ReportBlockMenu below. */}
        {isMyPost || currentUserIsAdmin ? (
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition text-lg leading-none"
            >
              ···
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-8 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[150px]">
                  <button
                    onClick={() => { setMenuOpen(false); setShowDeleteModal(true); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    🗑️ Delete post
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <ReportBlockMenu
            targetUserId={post.user_id}
            targetName={displayName}
            contentType="feed_post"
            contentId={post.id}
            currentUserId={myId}
            reportLabel="Report post"
            align="right"
            className="flex-shrink-0"
            // Blocking somebody should take their posts off the screen there
            // and then, not on the next refresh.
            onBlocked={() => onDelete(post.id)}
          />
        )}
      </div>

      {/* Content */}
      {post.post_type === "prayer_request" && (
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-0.5 rounded-full">🤲 Prayer Request</span>
        </div>
      )}
      {post.post_type === "verse" && post.verse_ref && (
        <p className="text-xs font-semibold text-green-700 mb-1">{post.verse_ref}</p>
      )}
      {post.verse_text && (
        <p className="text-sm italic text-gray-600 mb-2 border-l-2 border-green-400 pl-3">&ldquo;{post.verse_text}&rdquo;</p>
      )}
      {studyActivity ? (
        <p className="text-[15px] leading-relaxed text-gray-800">
          {studyActivity.lead}
          <span className="font-bold">{studyActivity.title}</span>
          {studyActivity.trail}
        </p>
      ) : post.content ? (
        <PostBody content={post.content} />
      ) : null}

      {/* The week's poll, drawn inside its own post. Answering here and
          answering in the popup write the same vote, so there is one set of
          results and one comment thread under it. */}
      {pollIdFromPost(post.link_url) ? (
        <FeedPollBlock pollId={pollIdFromPost(post.link_url)!} userId={myId} />
      ) : null}

      {/* Photo — natural proportions, tap to expand */}
      {post.media_url && post.post_type !== "video" && (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="mt-3 block w-full rounded-xl overflow-hidden focus:outline-none bg-gray-50"
        >
          <img
            src={post.media_url}
            alt="Post image"
            className="w-full h-auto"
            style={{ maxHeight: "500px", objectFit: "contain" }}
          />
        </button>
      )}

      {/* Video — autoplay on scroll (Bunny Stream + embeds) */}
      {post.post_type === "video" && <VideoBlock post={post} />}

      {/* Legacy link posts */}
      {post.post_type === "link" && post.link_url && (
        <a href={post.link_url} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-2 text-xs text-blue-600 hover:underline">
          🔗 {post.link_title || post.link_url}
        </a>
      )}

      {/* Like and Comment, together, on the left.

          Before this, liking was an emoji heart in a pill and Comment was
          pushed to the far right edge by ml-auto, so the two halves of
          engaging with a post sat at opposite ends of the card and neither
          said what it was. They are one group now, left-aligned under the
          content, each an icon with its word and its count - the shape every
          feed uses, because it reads as a pair of verbs rather than two
          decorations. The reaction row still writes "love", which is what
          every existing like in the database is; only the face of it is a
          thumb now. */}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-100 pt-3">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              if (!loveActive) {
                setLoveAnimating(true);
                window.setTimeout(() => setLoveAnimating(false), 420);
              }
              onReact(post.id, "love");
            }}
            aria-pressed={loveActive}
            className={`flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-semibold transition hover:bg-gray-50 ${
              loveActive ? "text-[#2f7fe8]" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg
              className={`h-5 w-5 ${loveAnimating ? "animate-heart-pop" : ""}`}
              fill={loveActive ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.04 9.04 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.5 4.5 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904M6.633 10.25a2.25 2.25 0 0 1 .4 1.286c0 .414-.055.815-.159 1.197-.147.541.244 1.102.805 1.102H8.25M6.633 10.25H5.904m0 0a2.25 2.25 0 0 0-2.15 1.588 10.5 10.5 0 0 0-.454 3.065c0 1.456.296 2.843.832 4.104.306.721 1.030 1.143 1.812 1.143h.657" />
            </svg>
            <span>Like</span>
          </button>
          {loveCount > 0 ? (
            <button
              type="button"
              onClick={openLikers}
              className="text-sm font-semibold text-gray-500 transition hover:text-gray-800 hover:underline"
            >
              {loveCount}
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowComments((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-semibold text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Comment</span>
          </button>
          {localCommentCount > 0 ? (
            <span className="text-sm font-semibold text-gray-500">{localCommentCount}</span>
          ) : null}
        </div>

        {/* Who is already in the thread. Only when somebody is - an empty
            post should not carry the furniture of a busy one. */}
        {preview && preview.people.length > 0 ? (
          <button
            type="button"
            onClick={() => setShowComments(true)}
            className="flex items-center gap-2 text-left"
          >
            <span className="flex -space-x-2">
              {preview.people.slice(0, 3).map((person) => (
                <span key={person.user_id} className="rounded-full ring-2 ring-white">
                  <Avatar
                    userId={person.user_id}
                    displayName={person.display_name || person.username || "Bible Buddy"}
                    imageUrl={person.profile_image_url}
                    size={7}
                  />
                </span>
              ))}
            </span>
            <span className="text-sm font-semibold" style={{ color: "#2f7fe8" }}>
              New comment {timeAgo(preview.lastAt)}
            </span>
          </button>
        ) : null}
      </div>

      {showComments && (
        <CommentSection
          postId={post.id}
          postUserId={post.user_id}
          postTitle={post.link_title || post.verse_ref || post.post_type}
          postContent={post.verse_text || post.content}
          myId={myId}
          myProfile={myProfile}
          currentUserIsAdmin={currentUserIsAdmin}
          highlightCommentId={isHighlighted ? highlightCommentId : null}
          onCountChange={(delta) => {
            setLocalCommentCount((n) => n + delta);
            onCommentCountChange(post.id, delta);
          }}
        />
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 modal-backdrop-in" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 modal-panel-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Delete this post?</h3>
            <p className="text-sm text-gray-500 mb-5">This can&apos;t be undone. Your post, reactions, and comments will be permanently removed.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Photo lightbox */}
      {lightboxOpen && post.media_url && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 modal-backdrop-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition"
          >
            ✕
          </button>
          <img
            src={post.media_url}
            alt="Full size"
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Likers popup */}
      <ModalShell isOpen={likersOpen} onClose={() => setLikersOpen(false)} zIndex="z-[110]" backdropColor="bg-black/50">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-base">❤️ Liked by</h3>
            <button onClick={() => setLikersOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 text-sm transition">✕</button>
          </div>
          <div className="max-h-80 overflow-y-auto py-2">
            {likersLoading ? (
              <p className="text-sm text-gray-400 text-center py-6">Loading...</p>
            ) : likers.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No likes yet.</p>
            ) : (
              likers.map((u) => {
                const name = u.display_name || u.username || "Bible Buddy";
                return (
                  <div key={u.user_id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition">
                    <Link href={`/profile/${u.user_id}`} onClick={() => setLikersOpen(false)} className="flex-shrink-0">
                      <Avatar userId={u.user_id} displayName={name} imageUrl={u.profile_image_url} size={9} />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/profile/${u.user_id}`} onClick={() => setLikersOpen(false)} className="text-sm font-semibold text-gray-900 hover:underline truncate block">
                        {name}
                      </Link>
                    </div>
                    <Link
                      href={`/profile/${u.user_id}`}
                      onClick={() => setLikersOpen(false)}
                      className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition flex-shrink-0"
                    >
                      View
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </ModalShell>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg pointer-events-none">
          {toast}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

function FeedUpgradeCard({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/upgrade"
      className={`block rounded-2xl border border-[#ead8c4] bg-[#fffaf4] shadow-sm transition hover:shadow-md ${
        compact ? "px-4 py-4" : "px-5 py-5"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">Go deeper with Bible Buddy Pro</p>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            Unlock unlimited study, open every Bible study, and keep going when God is already meeting you here.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#f5e3d0] text-[#9a5b1f]">Unlimited study access</span>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#f5e3d0] text-[#9a5b1f]">Full Bible study library</span>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#f5e3d0] text-[#9a5b1f]">No daily credit wall</span>
          </div>
        </div>
        <div className="text-xl flex-shrink-0">👑</div>
      </div>
      <div className="mt-3">
        <span
          className="inline-flex rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#4a9b6f" }}
        >
          Upgrade to Pro
        </span>
      </div>
    </Link>
  );
}

function interleaveUpgradeCards<T extends { id: string }>(
  items: T[],
  shouldInsert: boolean,
  renderItem: (item: T) => ReactNode
) {
  const nodes: ReactNode[] = [];

  items.forEach((item, index) => {
    nodes.push(renderItem(item));
    if (shouldInsert && (index + 1) % INLINE_UPGRADE_INTERVAL === 0 && index < items.length - 1) {
      nodes.push(<FeedUpgradeCard key={`upgrade-${index + 1}`} compact />);
    }
  });

  return nodes;
}


/**
 * How many buddies the community ranking looks at.
 *
 * The buddy list is only a signal here: a post by somebody you have added
 * scores higher than a stranger's. Uncapped it would ship 7,045 rows to the
 * phone to build a Set used for that one comparison, and the 300 most recent
 * friendships decide it just as well.
 */
const BUDDY_FEED_LIMIT = 300;

/**
 * The posts that sit above the feed, the way Skool keeps a few at the top.
 *
 * Louis, 2026-10-18: "we always have a group devotional going, and that should
 * be the first pin at the top. It should be pinned there - like how in Skool,
 * you can have three different pins."
 *
 * Today the rule finds one: the current day of the running study, which Bible
 * Buddy posts every morning as "Day 18: The Wall That Isn't There". Pinned, it
 * is in front of everybody who opens the tab, which is what it needs now that
 * finding it no longer depends on an alert.
 *
 * Found by a rule rather than a flag on the row, because a pinned column is a
 * change to a live table and that is Louis's to approve. The shape here takes
 * three, so a hand-picked pin drops in beside this one once the column exists.
 */
const PINNED_MAX = 3;

/**
 * "The Wisdom of Proverbs · Day 18: The Wall That Isn't There" - the daily
 * study post, and nothing else.
 *
 * The day used to open the headline; it is preceded by the study's name since
 * 2026-10-18, so this matches either shape rather than only the old one. A
 * rule that recognises the pinned post has to keep up with the post.
 */
const DEVOTIONAL_DAY_HEADLINE = /(?:^|·\s)Day \d+:\s/;

/**
 * What sits at the top of the feed: this week's poll, this week's prayer
 * thread, and the running study's day post - the newest of each, from the
 * Bible Buddy account (Louis, 2026-10-19: "the poll and the prayer request
 * should both be under the top pinned account, both pinned").
 */
function selectPinnedPosts<T extends FeedPost>(posts: T[]): T[] {
  const official = posts.filter((post) => post.user_id === BIBLE_BUDDY_USER_ID);
  const firstLine = (post: T) => post.content.split("\n", 1)[0] ?? "";

  const poll = official.find((post) => pollIdFromPost(post.link_url));
  const prayer = official.find((post) => /pray/i.test(post.content) && !pollIdFromPost(post.link_url));
  const study = official.find((post) => DEVOTIONAL_DAY_HEADLINE.test(firstLine(post)));

  const pinned: T[] = [];
  for (const candidate of [poll, prayer, study]) {
    if (!candidate || pinned.length >= PINNED_MAX) continue;
    if (pinned.some((post) => post.id === candidate.id)) continue;
    pinned.push(candidate);
  }
  return pinned;
}

/** A control that looks like the label it shows, not like a form field. */
function FeedSelect<T extends string>({ value, onChange, options }: {
  value: T;
  onChange: (next: T) => void;
  options: Array<{ value: T; label: string }>;
}) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="cursor-pointer appearance-none bg-transparent py-1 pl-1 pr-6 text-sm font-semibold text-gray-600 outline-none transition hover:text-gray-900"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-0 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

export default function BbFeedPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [myProfile, setMyProfile] = useState<MyProfile>(null);
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  /**
   * My Feed first, and selected by default (Louis, 2026-10-24).
   *
   * The feed is the reader's own page now, with their profile above it, so it
   * opens on their own posts rather than on everybody else's. A reader with
   * nothing posted yet lands on an empty My Feed, which is the one cost of
   * this order - renderMyFeedTab answers that with an empty state pointing at
   * Community rather than silently switching tabs, which would leave someone
   * wondering which tab they were actually on.
   *
   * A deep link to a post still forces Community (see the postId effect
   * below), so notification links are unaffected.
   */
  const [tab, setTab] = useState<Tab>("myfeed");
  const [loading, setLoading] = useState(true);
  const [showFeedOnboarding, setShowFeedOnboarding] = useState(false);

  // Notification deep-link params
  const [highlightPostId, setHighlightPostId] = useState<string | null>(null);
  const [highlightCommentId, setHighlightCommentId] = useState<string | null>(null);
  useEffect(() => {
    const openFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const postId = params.get("post");
      const commentId = params.get("comment");
      setHighlightPostId(postId);
      setHighlightCommentId(commentId);
      // Switch to community tab so the post is visible
      if (postId) setTab("community");
    };
    openFromUrl();

    /**
     * The same thing again, when the feed is already the page on screen.
     *
     * Tapping an alert from the feed pushes /bb-feed?post=… , and Next keeps
     * this component mounted for a query-string change on the same route -
     * so the read above, which runs on mount, never runs again. The URL
     * changed and nothing moved, which is exactly what Louis saw: "I click it
     * and it takes me to the feed page but nothing happens."
     */
    const openFromEvent = (event: Event) => {
      const detail = (event as CustomEvent<{ postId?: string; commentId?: string | null }>).detail;
      if (!detail?.postId) return;
      setHighlightPostId(detail.postId);
      setHighlightCommentId(detail.commentId ?? null);
      setTab("community");
    };
    window.addEventListener(FEED_OPEN_POST_EVENT, openFromEvent);
    window.addEventListener("popstate", openFromUrl);
    return () => {
      window.removeEventListener(FEED_OPEN_POST_EVENT, openFromEvent);
      window.removeEventListener("popstate", openFromUrl);
    };
  }, []);

  // Buddies tab state — the same ranked list, kept to people you added
  const [rankedBuddiesFeed, setRankedBuddiesFeed] = useState<RankedFeedItem[]>([]);

  /**
   * The Buddies tab loads when it is opened, not on arrival.
   *
   * init used to await it before the page would show anything, so every visit
   * paid for a tab most people never opened. This drives the tab's own
   * spinner; without one the empty panel flashes up and is replaced by posts
   * a moment later.
   */
  const [buddiesLoading, setBuddiesLoading] = useState(false);
  /**
   * Whether the fetch has started, as a ref rather than state.
   *
   * State is not visible to another call in the same tick, and the effect that
   * triggers this re-runs when userId arrives and when loadCommunityTab is
   * rebuilt, with React invoking effects twice in development - so a state
   * flag would let a second fetch through. It is a flag at all, rather than a
   * check on rankedBuddiesFeed.length, because the median reader has exactly
   * one buddy and may genuinely have nothing to show: a length check would
   * re-run the whole fetch every time they returned to an empty tab, which is
   * precisely the case where it cannot help.
   */
  const buddiesLoadStarted = useRef(false);

  // Community tab state — single ranked list
  const [rankedCommunityFeed, setRankedCommunityFeed] = useState<RankedFeedItem[]>([]);

  // My Feed tab state
  const [myFeedPosts, setMyFeedPosts] = useState<FeedPost[]>([]);
  const [myFeedLoading, setMyFeedLoading] = useState(false);
  const [myFeedLoaded, setMyFeedLoaded] = useState(false);

  // Reactions the current user has already made — key: "postId:reactionType"
  const [myReactions, setMyReactions] = useState<Set<string>>(new Set());

  // Faces and "New comment 12m ago", keyed by post id. See loadCommentPreviews.
  const [commentPreviews, setCommentPreviews] = useState<Record<string, CommentPreview>>({});

  // Where I stand with each author on screen. See loadBuddyStates.
  const [buddyStates, setBuddyStates] = useState<Record<string, BuddyState>>({});

  // The two controls above the feed. See applyFeedControls.
  const [postFilter, setPostFilter] = useState<"all" | "photos" | "study">("all");
  const [sortBy, setSortBy] = useState<"ranked" | "recent">("ranked");

  /**
   * The post an alert was about, fetched on its own when the feed has not
   * loaded it.
   *
   * Highlighting only works on a post that is on screen, and the community
   * tab holds a week of posts that the ranking chose - so "Stefani replied to
   * your post" about something from ten days ago, or about a post the ranking
   * left out, scrolled to nothing. Louis: "the alert needs to show the exact
   * post that was activity, not just the page where it is."
   *
   * So the post is fetched by id and shown at the top until the reader moves
   * on. An id from an older group-era alert finds nothing, and then the feed
   * simply opens, which is the honest outcome for a post that was never in
   * this table.
   */
  const [focusedPost, setFocusedPost] = useState<FeedPost | null>(null);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);
      setCurrentUserIsAdmin(user.email === ADMIN_EMAIL);
      const { data: prof } = await supabase
        .from("profile_stats")
        .select("display_name, username, profile_image_url, feed_onboarding_completed, is_paid, member_badge")
        .eq("user_id", user.id)
        .maybeSingle();
      setMyProfile(prof ?? null);
      if (!prof?.feed_onboarding_completed) {
        setShowFeedOnboarding(true);
      }
      setLoading(false);
    }
    init();
  }, []);

  // ── Fetch helpers ──────────────────────────────────────────────────────────
  /**
   * Who has commented on these posts, and when the last one landed.
   *
   * The row under a post shows two or three faces and "New comment 12m ago",
   * which means knowing something about each post's comments before anybody
   * opens them. Done per card that is fifty round trips on a feed of fifty
   * posts, on phones, for decoration - so it is two queries for the whole
   * page: the comments on every post at once, then the profiles of the people
   * who wrote them.
   *
   * Capped at the most recent 400 comments across the page. A post with
   * eighty comments does not need all eighty to show three faces, and the
   * ordering means the three shown are the three who spoke last.
   */
  async function loadCommentPreviews(postIds: string[]) {
    const ids = postIds.filter(Boolean);
    if (ids.length === 0) return;

    const rows: Array<{ post_id: string; user_id: string; created_at: string }> = [];
    // Chunked, because .in() goes into the URL and a long enough list is
    // rejected before it reaches the database.
    for (let i = 0; i < ids.length; i += 150) {
      const { data } = await supabase
        .from("feed_post_comments")
        .select("post_id, user_id, created_at")
        .in("post_id", ids.slice(i, i + 150))
        .order("created_at", { ascending: false })
        .limit(400);
      rows.push(...(data || []));
    }
    if (rows.length === 0) return;

    const { data: profiles } = await supabase
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url")
      .in("user_id", [...new Set(rows.map((row) => row.user_id))].slice(0, 500));

    const byId = new Map((profiles || []).map((profile) => [profile.user_id, profile]));
    const next: Record<string, CommentPreview> = {};

    // rows are newest first, so the first time a post is seen is its latest
    // comment, and people arrive in the order they last spoke.
    for (const row of rows) {
      const existing = next[row.post_id];
      const person = byId.get(row.user_id);
      if (!existing) {
        next[row.post_id] = { people: person ? [person] : [], lastAt: row.created_at };
        continue;
      }
      if (person && existing.people.length < 3 && !existing.people.some((p) => p.user_id === person.user_id)) {
        existing.people.push(person);
      }
    }

    setCommentPreviews((prev) => ({ ...prev, ...next }));
  }

  /**
   * Everybody this account is buddies with - all of them, paginated.
   *
   * getBuddyIds below caps at 300 for the ranking signal, which is fine for a
   * weight and wrong for a filter: capped, the Buddies tab showed "no buddy
   * posts yet" to somebody with 7,045 of them. PostgREST stops at a thousand
   * rows a page, so this walks the pages - eight requests for Louis, one for
   * everybody else, and only when the Buddies tab is opened.
   */
  async function getAllBuddyIds(uid: string): Promise<Set<string>> {
    const ids = new Set<string>();
    for (let from = 0; from < 20_000; from += 1000) {
      const { data } = await supabase
        .from("buddies")
        .select("user_id_1, user_id_2")
        .or(`user_id_1.eq.${uid},user_id_2.eq.${uid}`)
        .range(from, from + 999);
      if (!data || data.length === 0) break;
      for (const row of data) ids.add(row.user_id_1 === uid ? row.user_id_2 : row.user_id_1);
      if (data.length < 1000) break;
    }
    return ids;
  }

  /**
   * Where I stand with everybody who posted, for the Add button on the card.
   *
   * Four queries for the whole page rather than three per card. Asked by the
   * handful of people whose posts are on screen, not by my buddy list, which
   * on Louis's account is 7,045 rows and would say nothing extra.
   */
  async function loadBuddyStates(uid: string, authorIds: string[]) {
    const ids = [...new Set(authorIds)].filter((id) => id && id !== uid);
    if (ids.length === 0) return;

    const next: Record<string, BuddyState> = {};
    for (const id of ids) next[id] = "none";

    const [asFirst, asSecond, sent, received] = await Promise.all([
      supabase.from("buddies").select("user_id_2").eq("user_id_1", uid).in("user_id_2", ids),
      supabase.from("buddies").select("user_id_1").eq("user_id_2", uid).in("user_id_1", ids),
      supabase.from("buddy_requests").select("receiver_id").eq("sender_id", uid).eq("status", "pending").in("receiver_id", ids),
      supabase.from("buddy_requests").select("sender_id").eq("receiver_id", uid).eq("status", "pending").in("sender_id", ids),
    ]);

    for (const row of sent.data || []) next[row.receiver_id] = "pending_sent";
    for (const row of received.data || []) next[row.sender_id] = "pending_received";
    // Buddies last: an accepted pair outranks a stale pending row either way.
    for (const row of asFirst.data || []) next[row.user_id_2] = "buddies";
    for (const row of asSecond.data || []) next[row.user_id_1] = "buddies";

    setBuddyStates((prev) => ({ ...prev, ...next }));
  }

  async function getBuddyIds(uid: string): Promise<string[]> {
    const { data } = await supabase
      .from("buddies")
      .select("user_id_1, user_id_2")
      .or(`user_id_1.eq.${uid},user_id_2.eq.${uid}`)
      .order("created_at", { ascending: false })
      .limit(BUDDY_FEED_LIMIT);
    if (!data) return [];
    return data.map((b) => b.user_id_1 === uid ? b.user_id_2 : b.user_id_1);
  }

  async function loadMyReactions(uid: string, postIds: string[]) {
    if (postIds.length === 0) return;
    const { data } = await supabase
      .from("feed_post_reactions")
      .select("post_id, reaction_type")
      .eq("user_id", uid)
      .in("post_id", postIds);
    if (data) {
      setMyReactions((prev) => {
        const next = new Set(prev);
        data.forEach((r) => next.add(`${r.post_id}:${r.reaction_type}`));
        return next;
      });
    }
  }

  async function enrichWithProfiles<T extends { user_id: string }>(
    rows: T[],
    profiles: Array<{ user_id: string; display_name: string | null; username: string | null; profile_image_url: string | null }>
  ): Promise<(T & { display_name: string | null; username: string | null; profile_image_url: string | null })[]> {
    return rows.map((row) => {
      const p = profiles.find((pr) => pr.user_id === row.user_id);
      return { ...row, display_name: p?.display_name ?? null, username: p?.username ?? null, profile_image_url: p?.profile_image_url ?? null };
    });
  }

  /**
   * The Buddies tab: the same week of posts as Community, kept to buddies.
   *
   * It used to ask the other way round - "give me posts by these authors" -
   * with the author list capped at 300 of the newest friendships. Louis is
   * buddies with 7,045 people, so that cap decided his Buddies tab, and it
   * showed "no buddy posts yet" while the same posts sat in Community
   * (2026-10-18: "I'm buddies with everybody, so technically my buddy feed
   * should be kind of looking like the community feed").
   *
   * Asking by recency instead fixes the shape of it: a week of posts is small
   * and bounded however many friends somebody has, and the buddy list is then
   * only used to filter what came back. No cap, no chunking, two queries
   * instead of thirty.
   */
  async function loadFriendsTab(uid: string) {
    if (buddiesLoadStarted.current) return;
    buddiesLoadStarted.current = true;
    setBuddiesLoading(true);

    const buddyIdSet = await getAllBuddyIds(uid);
    if (buddyIdSet.size === 0) {
      setRankedBuddiesFeed([]);
      setBuddiesLoading(false);
      return;
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: postRows } = await supabase
      .from("feed_posts")
      .select("id, user_id, post_type, content, verse_ref, verse_text, media_url, link_url, link_title, visibility, reaction_counts, comment_count, created_at")
      .eq("visibility", "community")
      .gte("created_at", sevenDaysAgo)
      .order("created_at", { ascending: false })
      .limit(200);

    const buddyPosts = (postRows || []).filter((row) => buddyIdSet.has(row.user_id));

    // Profiles only for the handful of people who actually posted, rather
    // than for every buddy on the list.
    const authorIds = [...new Set(buddyPosts.map((row) => row.user_id))];
    const profiles: Array<{ user_id: string; display_name: string | null; username: string | null; profile_image_url: string | null }> = [];
    for (let i = 0; i < authorIds.length; i += 500) {
      const { data: pics } = await supabase
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url")
        .in("user_id", authorIds.slice(i, i + 500));
      profiles.push(...(pics || []));
    }

    const posts = await enrichWithProfiles(buddyPosts, profiles) as FeedPost[];

    const myReactedIds = new Set([...myReactions].map((k) => k.split(":")[0]));
    const ranked = rankCommunityFeed(posts, buddyIdSet, myReactedIds);

    // Blocked both ways, and asked for here rather than read from state: the
    // list is cached for a minute inside lib/userBlocks, so this costs nothing
    // after the first call, and it cannot race the feed loading before the
    // block list has arrived.
    const blocked = await getBlockedUserIds({ userId: uid });
    setRankedBuddiesFeed(blocked.size ? ranked.filter((item) => !blocked.has(item.user_id)) : ranked);
    setBuddiesLoading(false);
    void loadMyReactions(uid, posts.map((p) => p.id));
    void loadCommentPreviews(posts.map((p) => p.id));
    void loadBuddyStates(uid, posts.map((row) => row.user_id));
  }

  async function loadMyFeedTab(uid: string) {
    if (myFeedLoaded) return;
    setMyFeedLoading(true);

    const { data: postRows } = await supabase
      .from("feed_posts")
      .select("id, user_id, post_type, content, verse_ref, verse_text, media_url, link_url, link_title, visibility, reaction_counts, comment_count, created_at")
      .eq("user_id", uid)
      .order("created_at", { ascending: false })
      .limit(100);

    // Use already-loaded myProfile to avoid an extra fetch
    const profileArr = myProfile ? [{ user_id: uid, ...myProfile }] : [];
    const posts = await enrichWithProfiles(postRows || [], profileArr) as FeedPost[];

    setMyFeedPosts(posts);
    setMyFeedLoading(false);
    setMyFeedLoaded(true);
    void loadMyReactions(uid, posts.map((p) => p.id));
    void loadCommentPreviews(posts.map((p) => p.id));
  }

  const loadCommunityTab = useCallback(async () => {
    if (rankedCommunityFeed.length > 0) return; // already loaded

    if (!userId) return;

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // The posts and the buddy list, in parallel
    const [postsRes, buddyRows] = await Promise.all([
      supabase
        .from("feed_posts")
        .select("id, user_id, post_type, content, verse_ref, verse_text, media_url, link_url, link_title, visibility, reaction_counts, comment_count, created_at")
        .eq("visibility", "community")
        .gte("created_at", sevenDaysAgo)
        .order("created_at", { ascending: false })
        .limit(100),
      // Same cap. This one is a single query whatever the answer's size, so it
      // was never a request-count problem - but uncapped it ships 7,045 rows to
      // the phone to build a Set used only for ranking signals, and the top 300
      // decide those signals just as well.
      supabase
        .from("buddies")
        .select("user_id_1, user_id_2")
        .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`)
        .order("created_at", { ascending: false })
        .limit(BUDDY_FEED_LIMIT),
    ]);

    const buddyIds = new Set(
      (buddyRows.data || []).map((b) => b.user_id_1 === userId ? b.user_id_2 : b.user_id_1)
    );

    const allUserIds = [...new Set((postsRes.data || []).map((r) => r.user_id))];

    // Fetch profiles in batches to avoid 1000-row limit
    const profileMap: Record<string, { user_id: string; display_name: string | null; username: string | null; profile_image_url: string | null }> = {};
    for (let i = 0; i < allUserIds.length; i += 500) {
      const { data: pics } = await supabase
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url")
        .in("user_id", allUserIds.slice(i, i + 500));
      (pics || []).forEach((p) => { profileMap[p.user_id] = p; });
    }
    const profiles = Object.values(profileMap);

    const enrichedPosts = await enrichWithProfiles(postsRes.data || [], profiles) as FeedPost[];
    void loadMyReactions(userId, enrichedPosts.map((pt) => pt.id));
    void loadCommentPreviews(enrichedPosts.map((pt) => pt.id));
    void loadBuddyStates(userId, enrichedPosts.map((row) => row.user_id));
    const myReactedIds = new Set([...myReactions].map((k) => k.split(":")[0]));

    const ranked = rankCommunityFeed(enrichedPosts, buddyIds, myReactedIds);

    const blocked = await getBlockedUserIds({ userId: userId ?? null });
    setRankedCommunityFeed(blocked.size ? ranked.filter((item) => !blocked.has(item.user_id)) : ranked);
  }, [rankedCommunityFeed.length, userId, myReactions]);

  useEffect(() => {
    if (!highlightPostId || !userId) {
      setFocusedPost(null);
      return;
    }
    const alreadyShown =
      rankedCommunityFeed.some((item) => item.id === highlightPostId) ||
      rankedBuddiesFeed.some((item) => item.id === highlightPostId) ||
      myFeedPosts.some((item) => item.id === highlightPostId);
    if (alreadyShown) {
      setFocusedPost(null);
      return;
    }
    if (focusedPost?.id === highlightPostId) return;

    let cancelled = false;
    void (async () => {
      const { data } = await supabase
        .from("feed_posts")
        .select("id, user_id, post_type, content, verse_ref, verse_text, media_url, link_url, link_title, visibility, reaction_counts, comment_count, created_at")
        .eq("id", highlightPostId)
        .maybeSingle();
      if (cancelled || !data) return;

      const { data: profile } = await supabase
        .from("profile_stats")
        .select("display_name, username, profile_image_url")
        .eq("user_id", data.user_id)
        .maybeSingle();
      if (cancelled) return;

      setFocusedPost({
        ...(data as FeedPost),
        display_name: profile?.display_name ?? null,
        username: profile?.username ?? null,
        profile_image_url: profile?.profile_image_url ?? null,
      });
      void loadCommentPreviews([data.id]);
      void loadBuddyStates(userId, [data.user_id]);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightPostId, userId, rankedCommunityFeed, rankedBuddiesFeed, myFeedPosts]);

  // Blocking somebody from anywhere in the app clears them out of both feeds
  // here, without a reload. ReportBlockMenu fires BLOCKS_CHANGED_EVENT, and the
  // block may well have happened in the inbox or on a profile rather than on
  // this page, so listening is the only way to stay honest.
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    const prune = async () => {
      const blocked = await getBlockedUserIds({ force: true, userId });
      if (cancelled || blocked.size === 0) return;
      const drop = <T extends { user_id: string }>(items: T[]) => items.filter((item) => !blocked.has(item.user_id));
      setRankedBuddiesFeed((prev) => drop(prev));
      setRankedCommunityFeed((prev) => drop(prev));
    };
    window.addEventListener(BLOCKS_CHANGED_EVENT, prune);
    return () => {
      cancelled = true;
      window.removeEventListener(BLOCKS_CHANGED_EVENT, prune);
    };
  }, [userId]);

  useEffect(() => {
    if (tab === "community" && userId) {
      void loadCommunityTab();
    } else if (tab === "buddies" && userId) {
      void loadFriendsTab(userId);
    } else if (tab === "myfeed" && userId) {
      void loadMyFeedTab(userId);
    }
  }, [tab, userId, loadCommunityTab]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Reaction handler ───────────────────────────────────────────────────────

  async function handleReact(postId: string, reactionType: string) {
    if (!userId) return;
    const key = `${postId}:${reactionType}`;
    const alreadyReacted = myReactions.has(key);

    // Optimistic UI
    const delta = alreadyReacted ? -1 : 1;
    const updateCounts = (prev: FeedPost[]) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          reaction_counts: {
            ...p.reaction_counts,
            [reactionType]: Math.max((p.reaction_counts?.[reactionType] ?? 0) + delta, 0),
          },
        };
      });

    if (tab === "buddies") {
      setRankedBuddiesFeed((prev) =>
        prev.map((item) =>
          item.id === postId
            ? { ...item, reaction_counts: { ...item.reaction_counts, [reactionType]: Math.max((item.reaction_counts?.[reactionType] ?? 0) + delta, 0) } }
            : item
        ) as RankedFeedItem[]
      );
    } else if (tab === "myfeed") {
      setMyFeedPosts(updateCounts);
    } else {
      setRankedCommunityFeed((prev) =>
        prev.map((item) =>
          item._kind === "post" && (item as FeedPost).id === postId
            ? { ...item, reaction_counts: { ...(item as FeedPost).reaction_counts, [reactionType]: Math.max(((item as FeedPost).reaction_counts?.[reactionType] ?? 0) + delta, 0) } }
            : item
        ) as RankedFeedItem[]
      );
    }

    setMyReactions((prev) => {
      const next = new Set(prev);
      alreadyReacted ? next.delete(key) : next.add(key);
      return next;
    });

    if (alreadyReacted) {
      await supabase
        .from("feed_post_reactions")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId)
        .eq("reaction_type", reactionType);
      await supabase.rpc("decrement_reaction_count", { p_post_id: postId, p_reaction: reactionType });
    } else {
      await supabase
        .from("feed_post_reactions")
        .insert({ post_id: postId, user_id: userId, reaction_type: reactionType });
      await supabase.rpc("increment_reaction_count", { p_post_id: postId, p_reaction: reactionType });
      void logActionToMasterActions(userId, "feed_post_liked", `post:${postId}`);
    }
  }

  // One request, every card by that person. Somebody can easily have three
  // posts on screen, and watching two of them still say Add after you tapped
  // the third reads as the button not having worked.
  function handleBuddyRequested(targetUserId: string) {
    setBuddyStates((prev) => ({ ...prev, [targetUserId]: "pending_sent" }));
  }

  // ── Delete post handler ────────────────────────────────────────────────────

  function handleDeletePost(postId: string) {
    const filterOut = (prev: RankedFeedItem[]) => prev.filter((item) => !(item._kind === "post" && (item as FeedPost).id === postId));
    setRankedBuddiesFeed(filterOut);
    setRankedCommunityFeed(filterOut);
    setMyFeedPosts((prev) => prev.filter((p) => p.id !== postId));
  }

  // ── Comment count sync ─────────────────────────────────────────────────────

  function handleCommentCountChange(postId: string, delta: number) {
    const patchRanked = (prev: RankedFeedItem[]) =>
      prev.map((item) =>
        item._kind === "post" && (item as FeedPost).id === postId
          ? { ...item, comment_count: Math.max((item as FeedPost).comment_count + delta, 0) }
          : item
      ) as RankedFeedItem[];
    setRankedBuddiesFeed(patchRanked);
    setRankedCommunityFeed(patchRanked);
    setMyFeedPosts((prev) => prev.map((p) => p.id === postId ? { ...p, comment_count: Math.max(p.comment_count + delta, 0) } : p));
  }

  // ── Render helpers ─────────────────────────────────────────────────────────

  /**
   * The two controls above the feed, applied to whichever list is on screen.
   *
   * Both are client-side on what has already been fetched, which is the whole
   * reason they can exist: a week of posts is already in memory, so filtering
   * and re-sorting it costs nothing and needs no round trip.
   *
   * Sort defaults to the ranking rather than to time. Community is what the
   * algorithm chose - that is the thing being built - and "Most recent" is
   * there for when somebody wants the raw firehose instead. On My Feed the
   * list is your own wall and is always in time order, so only the filter
   * shows there.
   */
  function applyFeedControls<T extends FeedPost>(list: T[]): T[] {
    const filtered =
      postFilter === "photos"
        ? list.filter((item) => Boolean(item.media_url))
        : postFilter === "study"
          ? list.filter((item) => readStudyActivity(item.content) !== null)
          : list;

    if (sortBy !== "recent") return filtered;
    return [...filtered].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }

  /**
   * Buddies: the same card, the same controls, the same everything.
   *
   * Louis, 2026-10-18: "I want the Buddies tab also and it should work the
   * same way." The only difference from Community is which posts reach it -
   * the ones written by people this account has added - so it runs through
   * applyFeedControls and renders PostCard exactly as the other two tabs do.
   */
  function renderFriendsTab() {
    if (buddiesLoading) {
      return <div className="text-sm text-gray-400 text-center py-16">Loading your buddies&apos; posts...</div>;
    }

    const posts = applyFeedControls(rankedBuddiesFeed);
    if (posts.length === 0) {
      return (
        <div className="bb-community-panel bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
          <p className="text-3xl mb-3">👥</p>
          <h3 className="font-bold text-gray-900 mb-1">
            {postFilter === "all" ? "No buddy posts yet" : "Nothing here yet"}
          </h3>
          <p className="text-sm text-gray-500 mb-5">
            {postFilter === "all"
              ? "Add Buddies from their profile to see their posts here."
              : "Try All posts."}
          </p>
          {postFilter === "all" ? (
            <button type="button" onClick={() => setTab("community")} className="inline-block px-4 py-2 rounded-xl text-sm font-semibold text-white transition hover:opacity-90" style={{ backgroundColor: "#4a9b6f" }}>
              Find People
            </button>
          ) : null}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {interleaveUpgradeCards(posts, myProfile?.is_paid !== true, (item) => (
          <PostCard key={`post-${item.id}`} post={item as FeedPost} myId={userId!} myProfile={myProfile} currentUserIsAdmin={currentUserIsAdmin} myReactions={myReactions} onReact={handleReact} onCommentCountChange={handleCommentCountChange} onDelete={handleDeletePost} highlightPostId={highlightPostId} highlightCommentId={highlightCommentId} preview={commentPreviews[item.id]} buddyState={buddyStates[item.user_id]} onBuddyRequested={handleBuddyRequested} />
        ))}
      </div>
    );
  }

  function renderCommunityTab() {
    /**
     * Everything the ranking chose, not only the written posts.
     *
     * This filtered to _kind === "post" and threw the rest away, so every
     * completion the ranker had just scored and ordered was discarded one
     * line before it reached the screen. That is why Louis saw "Community is
     * quiet" on a day with sixteen completions in it - the wall was being
     * handed them and dropping them.
     *
     * "Sheila read chapter 33 of Genesis, Sheila got five out of six right" -
     * that is what an activity card is, and it is most of what this wall has
     * to show until people start writing posts of their own.
     */
    // Pins sit above the ranking and are not re-ranked. Only on the unfiltered
    // view: asking for Photos and being shown a text post because it happens
    // to be pinned is the control not working.
    const pinned = postFilter === "all" ? selectPinnedPosts(rankedCommunityFeed) : [];
    const pinnedIds = new Set(pinned.map((item) => item.id));
    const posts = applyFeedControls(rankedCommunityFeed).filter((item) => !pinnedIds.has(item.id));

    if (pinned.length === 0 && posts.length === 0) {
      return (
        <div className="bb-community-panel bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
          <p className="text-3xl mb-3">🌎</p>
          <h3 className="font-bold text-gray-900 mb-1">
            {postFilter === "all" ? "Community is quiet" : "Nothing here yet"}
          </h3>
          <p className="text-sm text-gray-500">
            {postFilter === "all" ? "Be the first to share something!" : "Try All posts."}
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {/* The post an alert was about, when the feed did not already hold it. */}
        {focusedPost ? (
          <PostCard
            key={`focused-${focusedPost.id}`}
            post={focusedPost}
            myId={userId!}
            myProfile={myProfile}
            currentUserIsAdmin={currentUserIsAdmin}
            myReactions={myReactions}
            onReact={handleReact}
            onCommentCountChange={handleCommentCountChange}
            onDelete={handleDeletePost}
            highlightPostId={highlightPostId}
            highlightCommentId={highlightCommentId}
            preview={commentPreviews[focusedPost.id]} buddyState={buddyStates[focusedPost.user_id]} onBuddyRequested={handleBuddyRequested}
          />
        ) : null}

        {/* The day's study, above everything, in the same card as the rest.
            A pin is a position, not a different kind of post - it still takes
            likes and comments where it sits. */}
        {pinned.map((item) => (
          <PostCard
            key={`pinned-${item.id}`}
            post={item as FeedPost}
            myId={userId!}
            myProfile={myProfile}
            currentUserIsAdmin={currentUserIsAdmin}
            myReactions={myReactions}
            onReact={handleReact}
            onCommentCountChange={handleCommentCountChange}
            onDelete={handleDeletePost}
            highlightPostId={highlightPostId}
            highlightCommentId={highlightCommentId}
            preview={commentPreviews[item.id]} buddyState={buddyStates[item.user_id]} onBuddyRequested={handleBuddyRequested}
            pinned
          />
        ))}

        {/* Posts and completions, in whatever order the ranking put them.
            Bible Buddy's own posts arrive as real feed posts (see
            lib/groupPostInsert.ts), so nothing here links out of the feed. */}
        {interleaveUpgradeCards(posts, myProfile?.is_paid !== true, (item) => (
          <PostCard key={`post-${item.id}`} post={item as FeedPost} myId={userId!} myProfile={myProfile} currentUserIsAdmin={currentUserIsAdmin} myReactions={myReactions} onReact={handleReact} onCommentCountChange={handleCommentCountChange} onDelete={handleDeletePost} highlightPostId={highlightPostId} highlightCommentId={highlightCommentId} preview={commentPreviews[item.id]} buddyState={buddyStates[item.user_id]} onBuddyRequested={handleBuddyRequested} />
        ))}
      </div>
    );
  }

  function renderMyFeedTab() {
    if (myFeedLoading) {
      return <div className="text-sm text-gray-400 text-center py-16">Loading your feed...</div>;
    }

    const items = applyFeedControls(
      [...myFeedPosts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    );

    if (items.length === 0) {
      return (
        /* My Feed is the tab the app now opens on, so this is the first
           thing a reader with no posts sees. It says what this tab is for
           and offers the obvious way out - Community - rather than leaving a
           dead end. Deliberately NOT an automatic switch to another tab:
           that leaves someone unsure which tab they are even on (Louis,
           2026-10-24). */
        <div className="bb-community-panel bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
          <p className="text-3xl mb-3">✨</p>
          <h3 className="font-bold text-gray-900 mb-1">Nothing here yet</h3>
          <p className="text-sm text-gray-500">
            Your own posts and activity show up here. Share something above, or see what everyone else is reading.
          </p>
          <button
            type="button"
            onClick={() => setTab("community")}
            className="mt-4 inline-flex min-h-[40px] items-center rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#4a9b6f" }}
          >
            Go to Community
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {interleaveUpgradeCards(items, myProfile?.is_paid !== true, (item) => (
          <PostCard
              key={`post-${item.id}`}
              post={item as FeedPost}
              myId={userId!}
              myProfile={myProfile}
              currentUserIsAdmin={currentUserIsAdmin}
              myReactions={myReactions}
              onReact={handleReact}
              onCommentCountChange={handleCommentCountChange}
              onDelete={handleDeletePost}
              highlightPostId={highlightPostId}
              highlightCommentId={highlightCommentId}
              preview={commentPreviews[item.id]} buddyState={buddyStates[item.user_id]} onBuddyRequested={handleBuddyRequested}
          />
        ))}
      </div>
    );
  }

  // ── Page ───────────────────────────────────────────────────────────────────

  // Nothing until we know who is here.
  //
  // The init effect sends a signed-out visitor to /login, but it is async, so
  // the feed's whole frame - tabs, composer, empty states - drew first and then
  // vanished. This page was written when anyone could browse as a guest;
  // anonymous accounts were turned off on 2026-10-06, so there is no longer
  // such a thing as a signed-out reader here, and showing them the shell of a
  // feed they cannot use was only ever a flash of the wrong thing.
  if (!userId) {
    return (
      <div className="bb-community-page bb-community-feed min-h-screen bg-gray-50" aria-busy="true">
        <div className="mx-auto max-w-xl px-4 pt-6">
          <div className="h-10 animate-pulse rounded-xl bg-gray-200" />
          <div className="mt-3 h-28 animate-pulse rounded-xl bg-gray-200" />
          <div className="mt-3 h-28 animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="bb-community-page bb-community-feed min-h-screen bg-gray-50 pb-16">
      {/* Feed onboarding — shown once on first visit */}
      {userId && (
        <FeedOnboardingModal
          isOpen={showFeedOnboarding}
          userId={userId}
          onFinished={() => setShowFeedOnboarding(false)}
        />
      )}

      {/* One column, nothing beside it.

          740-800px is the width a feed wants: wider and a line of text runs
          past what the eye tracks comfortably, narrower and photos get
          postage-stamp sized. The old max-w-2xl was 672px, set when this
          page was a list of short status lines rather than studies with
          paragraphs in them. The bottom padding clears the floating nav bar,
          which otherwise sits on top of the last post's Like and Comment. */}
      <div
        className="bb-community-content mx-auto w-full px-4 py-8"
        style={{ maxWidth: "780px", paddingBottom: "calc(var(--bb-bottom-nav-h, 0px) + 3rem)" }}
      >
        {/* No breadcrumb. The bottom bar says where you are and gets you
            anywhere else; a "Dashboard › Bible Buddy Feed" row above it was a
            second navigation saying less (Louis, 2026-10-18: "we have two
            breadcrumb menus and we don't need any, it's taking up space"). */}
        {/* Title and tabs in one lavender card, the dashboard's own.

            #f5f2ff with the #ddd6f3 border and bg-journey behind it is what
            From Your Groups and the bookshelf's community strip already use,
            so the top of the feed belongs to the same app as the home screen
            rather than being a bare heading over a bare row (Louis's mockup,
            2026-10-18).

            The text colours are fixed rather than themed, as on those cards:
            the background is a fixed light illustration, so themed text would
            turn white on it in dark mode. */}
        {/* The reader's own profile, above their own feed.
            One identity and one feed on one page (Louis, 2026-10-24). The
            card reads the same profile_stats row the profile page reads, and
            links to it for editing and for the deeper sections. */}
        {userId ? <ProfileSummaryCard userId={userId} isSelf /> : null}

        <div
          className="relative mb-3 overflow-hidden rounded-3xl border border-[#ddd6f3] p-4 shadow-sm sm:p-5"
          style={{
            backgroundColor: "#f5f2ff",
            backgroundImage: "url(/home-cards/bg-journey.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "left bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="text-[26px] font-black leading-tight text-[#2b2150] sm:text-3xl">
            Bible Buddy Feed
          </h1>

          {/* Pills inside the card: the selected one white with the accent
              blue, the rest dark enough to read on lavender. */}
          <div className="bb-community-tab mt-3 flex gap-1 rounded-2xl bg-white/45 p-1">
            {([
              { key: "myfeed",    label: "My Feed" },
              { key: "buddies",   label: "Buddies" },
              { key: "community", label: "Community" },
            ] as { key: Tab; label: string }[]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                aria-pressed={tab === key}
                className={`flex-1 rounded-xl px-2 py-2 text-[13px] font-black transition sm:text-[15px] ${
                  tab === key ? "bg-white shadow-sm" : "hover:bg-white/50"
                }`}
                style={{ color: tab === key ? "#2f7fe8" : "#3b3263" }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Top Buddies, directly under the tabs and in the same place on all
            three of them. The ranking is the one that already exists; this is
            a second way of showing it (Louis, with a mockup, 2026-10-18). */}
        {!loading && userId ? <TopBuddiesCard groupId={COMMUNITY_GROUP_ID} /> : null}

        {/* The composer, at the top of either tab.

            It was on My Feed alone, on the reasoning that you post to your own
            wall and Community is only what the ranking picked out of
            everybody's. True of where a post is stored - and it meant that the
            tab people actually open had no way to write anything on it, which
            is a strange thing to do to a feed. Posting from here writes the
            same row either way: it lands on your wall and goes into the
            ranking like everything else. */}
        {!loading && userId && (
          <PostComposer
            userId={userId}
            userProfile={myProfile}
            onPosted={(newPost) => {
              // Straight onto your own wall, which is the tab you are looking
              // at. It used to be pushed into whichever ranked feed was open,
              // from a composer that was never on this tab - so the one place
              // a new post certainly belongs was the one place it did not go.
              setMyFeedPosts((prev) => [newPost, ...prev]);

              // And into the community in front of you, if it is loaded.
              // Posting to your wall is what puts something up for the
              // ranking to choose; seeing it land is how that reads as true.
              const newRanked: RankedFeedItem = { ...newPost, _kind: "post", _score: 1, _signals: { recency: 1, engagement: 0, proximity: 0, relevance: 0 } };
              setRankedCommunityFeed((prev) => (prev.length ? [newRanked, ...prev] : prev));
            }}
          />
        )}

        {/* What is in the feed, and in what order */}
        {!loading && (
          <div className="mb-3 flex items-center justify-between px-1">
            <FeedSelect
              value={postFilter}
              onChange={setPostFilter}
              options={[
                { value: "all", label: "All posts" },
                { value: "photos", label: "Photos" },
                { value: "study", label: "Study activity" },
              ]}
            />
            {tab !== "myfeed" ? (
              <FeedSelect
                value={sortBy}
                onChange={setSortBy}
                options={[
                  { value: "ranked", label: "Top picks" },
                  { value: "recent", label: "Most recent" },
                ]}
              />
            ) : null}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="text-sm text-gray-400 text-center py-16">Loading feed...</div>
        ) : (
          tab === "community" ? renderCommunityTab() : tab === "buddies" ? renderFriendsTab() : renderMyFeedTab()
        )}

      </div>
    </div>
  );
}
