"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { FeedOnboardingModal } from "../../components/FeedOnboardingModal";
import { ModalShell } from "../../components/ModalShell";
import { logActionToMasterActions } from "../../lib/actionRecorder";

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
}

interface FeedActivity {
  id: string;
  user_id: string;
  activity_type: string;
  activity_data: Record<string, string | number | null>;
  group_id: string | null;
  group_name: string | null;
  created_at: string;
  // joined
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
}

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

type MyProfile = { display_name: string | null; username: string | null; profile_image_url: string | null } | null;

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

const POST_TYPE_LABELS: Record<string, string> = {
  thought:        "💭 Thought",
  verse:          "📖 Verse",
  prayer:         "🙏 Prayer",
  prayer_request: "🙏 Prayer Request",
  photo:          "📷 Photo",
  link:           "🔗 Link",
  video:          "🎬 Video",
};

// ── Video URL parsing ─────────────────────────────────────────────────────────

type VideoPlatform = "youtube" | "youtube_short" | "tiktok" | "instagram" | "unknown";

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
  return { platform: "unknown", embedUrl: null, portrait: false };
}

const VIDEO_PLATFORM_META: Record<VideoPlatform, { icon: string; label: string }> = {
  youtube:       { icon: "▶️", label: "YouTube" },
  youtube_short: { icon: "▶️", label: "YouTube Shorts" },
  tiktok:        { icon: "🎵", label: "TikTok" },
  instagram:     { icon: "📸", label: "Instagram Reel" },
  unknown:       { icon: "🎬", label: "Video" },
};

// ── Feed ranking ──────────────────────────────────────────────────────────────

const OT_BOOKS = new Set(["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi"]);
const NT_BOOKS = new Set(["Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"]);

type RankedFeedItem =
  | ({ _kind: "post"; _score: number; _signals: Record<string, number> } & FeedPost)
  | ({ _kind: "activity"; _score: number; _signals: Record<string, number> } & FeedActivity);

function rankCommunityFeed(
  posts: FeedPost[],
  activities: FeedActivity[],
  buddyIds: Set<string>,
  myRecentActivity: Array<{ activity_type: string; activity_data: Record<string, string | number | null> }>,
  myReactedPostIds: Set<string>
): RankedFeedItem[] {
  const now = Date.now();

  type RawItem = ({ _kind: "post" } & FeedPost) | ({ _kind: "activity" } & FeedActivity);
  const raw: RawItem[] = [
    ...posts.map((p) => ({ ...p, _kind: "post" as const })),
    ...activities.map((a) => ({ ...a, _kind: "activity" as const })),
  ];

  // Pre-compute engagement velocities for normalization
  const velocities = raw.map((item) => {
    const hours = Math.max(0.1, (now - new Date(item.created_at).getTime()) / 3_600_000);
    if (item._kind === "post") {
      const p = item as FeedPost & { _kind: "post" };
      const reactions = Object.values(p.reaction_counts || {}).reduce((a, b) => a + b, 0);
      return (reactions + p.comment_count * 2) / hours;
    }
    return 0;
  });
  const maxVelocity = Math.max(1, ...velocities);

  // Personal relevance signals from recent activity
  const recentOT = myRecentActivity.some(
    (a) => a.activity_type === "chapter_read" && OT_BOOKS.has(String(a.activity_data?.book ?? ""))
  );
  const recentNT = myRecentActivity.some(
    (a) => a.activity_type === "chapter_read" && NT_BOOKS.has(String(a.activity_data?.book ?? ""))
  );

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

    // Signal 5 — Personal relevance (15%)
    let relevance = 0;
    if (item._kind === "post") {
      const p = item as FeedPost & { _kind: "post" };
      const ref = p.verse_ref ?? "";
      if (p.post_type === "verse") {
        const bookName = ref.split(" ").slice(0, p.verse_ref?.startsWith("1") || p.verse_ref?.startsWith("2") || p.verse_ref?.startsWith("3") ? 2 : 1).join(" ");
        if (recentOT && OT_BOOKS.has(bookName)) relevance += 0.3;
        if (recentNT && NT_BOOKS.has(bookName)) relevance += 0.3;
      }
    }

    // Base score (diversity = 0.10 applied in post-processing)
    const score = recency * 0.30 + engagement * 0.25 + proximity * 0.20 + relevance * 0.15;

    scored.push({
      ...item,
      _score: score,
      _signals: { recency, engagement, proximity, relevance },
    } as RankedFeedItem);
  });

  // Sort by score desc
  scored.sort((a, b) => b._score - a._score);

  // Hard rule: push already-reacted posts down (below first 5)
  const reacted = scored.filter((i) => i._kind === "post" && myReactedPostIds.has((i as FeedPost).id));
  const notReacted = scored.filter((i) => !(i._kind === "post" && myReactedPostIds.has((i as FeedPost).id)));
  const reordered = [...notReacted.slice(0, 5), ...reacted, ...notReacted.slice(5)];

  // Signal 4 — Diversity pass (10%): greedy pick, look ahead up to 5 candidates
  function isDiversityViolation(result: RankedFeedItem[], candidate: RankedFeedItem): boolean {
    if (result.length === 0) return false;
    // Never same author twice in a row
    if (result[result.length - 1].user_id === candidate.user_id) return true;
    if (candidate._kind === "activity") {
      // No more than 3 activity cards in a row
      let run = 0;
      for (let j = result.length - 1; j >= 0 && result[j]._kind === "activity"; j--) run++;
      if (run >= 3) return true;
    }
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

const ACTIVITY_LABELS: Record<string, (data: Record<string, string | number | null>) => string> = {
  devotional_day_completed: (d) => `completed Day ${d.day_number} of "${d.title}"`,
  study_group_joined: (d) => `joined the group "${d.group_name}"`,
  buddy_added: (d) => `became Buddies with ${d.buddy_name || "someone"}`,
  verse_shared: (d) => `shared ${d.verse_ref || "a verse"}`,
  post_created: () => `posted something new`,
  prayer_shared: () => `shared a prayer`,
};

function activityLabel(type: string, data: Record<string, string | number | null>): string {
  const fn = ACTIVITY_LABELS[type];
  return fn ? fn(data) : type.replace(/_/g, " ");
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
  const [submitting, setSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const displayName = userProfile?.display_name || userProfile?.username || "Bible Buddy";

  function reset() {
    setContent(""); setPrayerIsRequest(false);
    setPhotoFile(null); setPhotoPreview(null);
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(null); setVideoPreview(null); setVideoDurationError(false);
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
    if (file.size > 52428800) {
      setUploadError("Video must be under 50 MB.");
      return;
    }
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setVideoDurationError(false);
    setUploadError(null);
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

    // Upload video to Supabase Storage
    if (tab === "video" && videoFile) {
      const ext = videoFile.name.split(".").pop() ?? "mp4";
      const path = `${userId}/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("post-media").upload(path, videoFile, { upsert: false });
      if (uploadErr) {
        setUploadError("Video upload failed. Please try again.");
        setSubmitting(false);
        return;
      }
      const { data: pub } = supabase.storage.from("post-media").getPublicUrl(path);
      mediaUrl = pub.publicUrl;
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
      link_title: null,
      media_url: mediaUrl,
    };

    const { data, error } = await supabase
      .from("feed_posts")
      .insert(payload)
      .select("id, user_id, post_type, content, verse_ref, verse_text, media_url, link_url, link_title, visibility, reaction_counts, comment_count, created_at")
      .single();

    if (!error && data) {
      onPosted({
        ...data,
        display_name: userProfile?.display_name ?? null,
        username: userProfile?.username ?? null,
        profile_image_url: userProfile?.profile_image_url ?? null,
      } as FeedPost);

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
      <button
        onClick={() => setExpanded(true)}
        className="w-full flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:border-gray-300 transition text-left mb-6"
      >
        <Avatar userId={userId} displayName={displayName} imageUrl={userProfile?.profile_image_url ?? null} size={9} />
        <span className="text-sm text-gray-400 flex-1">Share a thought, prayer, or photo...</span>
        <span className="text-xs text-white font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: "#4a9b6f" }}>Post</span>
      </button>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 overflow-hidden">
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
              capture="environment"
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
                <span className="text-xs text-gray-400">MP4, MOV, or WebM · max 50 MB · 90 sec</span>
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
              {submitting ? "Posting..." : "Post"}
            </button>
        </div>
      </div>
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────

function Avatar({ userId, displayName, imageUrl, size = 9 }: {
  userId: string;
  displayName: string;
  imageUrl: string | null;
  size?: number;
}) {
  const initials = displayName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const cls = `w-${size} h-${size} rounded-full flex-shrink-0`;
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

function CommentSection({ postId, myId, myProfile, onCountChange }: {
  postId: string;
  myId: string;
  myProfile: MyProfile;
  onCountChange: (delta: number) => void;
}) {
  const [comments, setComments] = useState<FeedComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // parent comment id
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("feed_post_comments")
        .select("id, post_id, user_id, parent_comment_id, content, created_at")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (!data || data.length === 0) { setComments([]); setLoading(false); return; }

      const userIds = [...new Set(data.map((c) => c.user_id))];
      const { data: profiles } = await supabase
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url")
        .in("user_id", userIds);

      const p = profiles || [];
      setComments(data.map((c) => {
        const prof = p.find((pr) => pr.user_id === c.user_id);
        return { ...c, display_name: prof?.display_name ?? null, username: prof?.username ?? null, profile_image_url: prof?.profile_image_url ?? null };
      }));
      setLoading(false);
    }
    void load();
  }, [postId]);

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

  const topLevel = comments.filter((c) => !c.parent_comment_id);
  const replies = (parentId: string) => comments.filter((c) => c.parent_comment_id === parentId);

  function CommentRow({ comment, indent = false }: { comment: FeedComment; indent?: boolean }) {
    const name = comment.display_name || comment.username || "Bible Buddy";
    return (
      <div className={`flex gap-2 ${indent ? "ml-8 mt-1" : "mt-2"}`}>
        <Link href={`/profile/${comment.user_id}`} className="flex-shrink-0 mt-0.5">
          <Avatar userId={comment.user_id} displayName={name} imageUrl={comment.profile_image_url} size={6} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 rounded-xl px-3 py-2">
            <Link href={`/profile/${comment.user_id}`} className="text-xs font-semibold text-gray-800 hover:underline">
              {name}
            </Link>
            <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">{comment.content}</p>
          </div>
          <div className="flex items-center gap-3 mt-0.5 px-1">
            <span className="text-[10px] text-gray-400">{timeAgo(comment.created_at)}</span>
            {!indent && (
              <button
                onClick={() => {
                  setReplyingTo(replyingTo === comment.id ? null : comment.id);
                  setReplyText("");
                }}
                className="text-[10px] text-gray-400 hover:text-green-600 font-semibold transition"
              >
                Reply
              </button>
            )}
          </div>
          {/* Reply input */}
          {!indent && replyingTo === comment.id && (
            <div className="ml-0 mt-1 flex gap-2 items-end">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${name}...`}
                rows={1}
                autoFocus
                className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={() => submitComment(replyText, comment.id)}
                disabled={!replyText.trim() || submitting}
                className="text-xs font-semibold text-white px-3 py-2 rounded-xl transition disabled:opacity-40 flex-shrink-0"
                style={{ backgroundColor: "#4a9b6f" }}
              >
                Reply
              </button>
            </div>
          )}
          {/* Nested replies (1 level only) */}
          {!indent && replies(comment.id).map((reply) => (
            <CommentRow key={reply.id} comment={reply} indent />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      {loading ? (
        <p className="text-xs text-gray-400 text-center py-2">Loading comments...</p>
      ) : (
        <div>
          {topLevel.map((c) => <CommentRow key={c.id} comment={c} />)}
        </div>
      )}

      {/* New top-level comment input */}
      <div className="flex gap-2 items-end mt-3">
        <Avatar userId={myId} displayName={myProfile?.display_name || myProfile?.username || "You"} imageUrl={myProfile?.profile_image_url ?? null} size={6} />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={1}
          className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void submitComment(newComment, null);
            }
          }}
        />
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

// ── Post Card ─────────────────────────────────────────────────────────────────

function PostCard({ post, myId, myProfile, myReactions, onReact, onCommentCountChange, onDelete }: {
  post: FeedPost;
  myId: string;
  myProfile: MyProfile;
  myReactions: Set<string>;
  onReact: (postId: string, reaction: string) => void;
  onCommentCountChange: (postId: string, delta: number) => void;
  onDelete: (postId: string) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [localCommentCount, setLocalCommentCount] = useState(post.comment_count);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
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
    setDeleting(true);
    await supabase.from("feed_post_reactions").delete().eq("post_id", post.id);
    await supabase.from("feed_post_comments").delete().eq("post_id", post.id);
    await supabase.from("feed_posts").delete().eq("id", post.id);
    setDeleting(false);
    setShowDeleteModal(false);
    setDeleted(true);
    setTimeout(() => onDelete(post.id), 500);
  }

  async function handleReport() {
    if (!reportReason) return;
    await supabase.from("post_reports").insert({
      post_id: post.id,
      reporter_user_id: myId,
      reason: reportReason,
    });
    setShowReportModal(false);
    setReportReason("");
    showToastMsg("Report submitted. Thank you.");
  }

  if (deleted) {
    return <div className="transition-all duration-500 opacity-0 h-0 overflow-hidden" />;
  }
  const loveCount = post.reaction_counts?.["love"] ?? 0;
  const loveActive = myReactions.has(`${post.id}:love`);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <Link href={`/profile/${post.user_id}`}>
          <Avatar userId={post.user_id} displayName={displayName} imageUrl={post.profile_image_url} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/profile/${post.user_id}`} className="font-semibold text-sm text-gray-900 hover:underline truncate">
              {displayName}
            </Link>
            <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
              {POST_TYPE_LABELS[post.post_type] || post.post_type}
            </span>
          </div>
          <p className="text-xs text-gray-400">{timeAgo(post.created_at)}</p>
        </div>
        {/* 3-dot menu */}
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
                {isMyPost ? (
                  <button
                    onClick={() => { setMenuOpen(false); setShowDeleteModal(true); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    🗑️ Delete post
                  </button>
                ) : (
                  <button
                    onClick={() => { setMenuOpen(false); setShowReportModal(true); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    🚩 Report post
                  </button>
                )}
              </div>
            </>
          )}
        </div>
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
      {post.content && (
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{post.content}</p>
      )}

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

      {/* Video — direct upload */}
      {post.post_type === "video" && post.media_url && (
        <div className="mt-3 flex justify-center">
          <video
            src={post.media_url}
            controls
            playsInline
            className="rounded-xl bg-black w-full"
            style={{ maxHeight: "480px" }}
          />
        </div>
      )}

      {/* Video embed */}
      {post.post_type === "video" && post.link_url && (() => {
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
      })()}

      {/* Legacy link posts */}
      {post.post_type === "link" && post.link_url && (
        <a href={post.link_url} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-2 text-xs text-blue-600 hover:underline">
          🔗 {post.link_title || post.link_url}
        </a>
      )}

      {/* Reactions + comment toggle */}
      <div className="flex items-center gap-1 mt-4 flex-wrap">
        <div className={`flex items-center rounded-full text-xs border transition ${loveActive ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50"}`}>
          <button
            onClick={() => onReact(post.id, "love")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition hover:scale-110 ${loveActive ? "text-green-700 font-semibold" : "text-gray-600"}`}
          >
            <span>❤️</span>
          </button>
          {loveCount > 0 && (
            <button onClick={openLikers} className={`pr-2.5 py-1 font-medium transition hover:underline ${loveActive ? "text-green-700" : "text-gray-600 hover:text-gray-900"}`}>
              {loveCount}
            </button>
          )}
        </div>
        <button
          onClick={() => setShowComments((v) => !v)}
          className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-green-600 transition"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {localCommentCount > 0 ? localCommentCount : "Comment"}
        </button>
      </div>

      {showComments && (
        <CommentSection
          postId={post.id}
          myId={myId}
          myProfile={myProfile}
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

      {/* Report modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 modal-backdrop-in" onClick={() => setShowReportModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4 modal-panel-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Report this post</h3>
            <p className="text-sm text-gray-500 mb-4">Why are you reporting this post?</p>
            <div className="flex flex-col gap-2 mb-5">
              {["Spam", "Inappropriate content", "Harassment", "False information", "Other"].map((reason) => (
                <label key={reason} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`report-reason-${post.id}`}
                    value={reason}
                    checked={reportReason === reason}
                    onChange={() => setReportReason(reason)}
                    className="accent-green-600"
                  />
                  <span className="text-sm text-gray-700">{reason}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowReportModal(false); setReportReason(""); }}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                disabled={!reportReason}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-50 transition"
                style={{ backgroundColor: "#4a9b6f" }}
              >
                Submit Report
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

// ── Activity Card ─────────────────────────────────────────────────────────────

function ActivityCard({ activity }: { activity: FeedActivity }) {
  const displayName = activity.display_name || activity.username || "Bible Buddy";
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: "#f8f8f8" }}>
      <Link href={`/profile/${activity.user_id}`}>
        <Avatar userId={activity.user_id} displayName={displayName} imageUrl={activity.profile_image_url} size={8} />
      </Link>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800">
          <Link href={`/profile/${activity.user_id}`} className="font-semibold hover:underline">
            {displayName}
          </Link>{" "}
          {activityLabel(activity.activity_type, activity.activity_data)}
          {activity.group_name && (
            <span
              className="ml-1 text-xs font-semibold text-white rounded-full px-2 py-0.5"
              style={{ backgroundColor: "#4a9b6f" }}
            >
              {activity.group_name}
            </span>
          )}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{timeAgo(activity.created_at)}</p>
      </div>
    </div>
  );
}

// ── Activity Post Card ────────────────────────────────────────────────────────

const ACTIVITY_TYPE_BADGE: Record<string, string> = {
  devotional_day_completed: "📖 Devotional",
  study_group_joined:       "👥 Joined Group",
  buddy_added:              "🤝 New Buddy",
  verse_shared:             "📖 Verse",
  prayer_shared:            "🙏 Prayer",
  chapter_read:             "📖 Reading",
};

function ActivityPostCard({ activity }: { activity: FeedActivity }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const displayName = activity.display_name || activity.username || "Bible Buddy";
  const badge = ACTIVITY_TYPE_BADGE[activity.activity_type] || activity.activity_type.replace(/_/g, " ");
  const content = activityLabel(activity.activity_type, activity.activity_data);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <Link href={`/profile/${activity.user_id}`}>
          <Avatar userId={activity.user_id} displayName={displayName} imageUrl={activity.profile_image_url} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/profile/${activity.user_id}`} className="font-semibold text-sm text-gray-900 hover:underline truncate">
              {displayName}
            </Link>
            <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{badge}</span>
          </div>
          <p className="text-xs text-gray-400">{timeAgo(activity.created_at)}</p>
        </div>
      </div>
      <p className="text-sm text-gray-800 leading-relaxed">{content}</p>
      {activity.group_name && (
        <p className="mt-1 text-xs font-semibold" style={{ color: "#4a9b6f" }}>📍 {activity.group_name}</p>
      )}
      <div className="flex items-center gap-1 mt-4">
        <button
          onClick={() => { setLiked((v) => !v); setLikeCount((n) => liked ? Math.max(n - 1, 0) : n + 1); }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border transition ${liked ? "border-red-300 bg-red-50 text-red-600 font-semibold" : "border-gray-200 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 text-gray-600"}`}
        >
          <span>❤️</span>
          {likeCount > 0 && <span className="font-medium">{likeCount}</span>}
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function BbFeedPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [myProfile, setMyProfile] = useState<{ display_name: string | null; username: string | null; profile_image_url: string | null } | null>(null);
  const [tab, setTab] = useState<Tab>("community");
  const [loading, setLoading] = useState(true);
  const [showFeedOnboarding, setShowFeedOnboarding] = useState(false);

  // Buddies tab state — single ranked list (posts only shown, activities used for ranking)
  const [rankedBuddiesFeed, setRankedBuddiesFeed] = useState<RankedFeedItem[]>([]);

  // Community tab state — single ranked list
  const [rankedCommunityFeed, setRankedCommunityFeed] = useState<RankedFeedItem[]>([]);

  // My Feed tab state
  const [myFeedPosts, setMyFeedPosts] = useState<FeedPost[]>([]);
  const [myFeedActivity, setMyFeedActivity] = useState<FeedActivity[]>([]);
  const [myFeedLoading, setMyFeedLoading] = useState(false);
  const [myFeedLoaded, setMyFeedLoaded] = useState(false);

  // Reactions the current user has already made — key: "postId:reactionType"
  const [myReactions, setMyReactions] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);
      const { data: prof } = await supabase
        .from("profile_stats")
        .select("display_name, username, profile_image_url, feed_onboarding_completed")
        .eq("user_id", user.id)
        .maybeSingle();
      setMyProfile(prof ?? null);
      if (!prof?.feed_onboarding_completed) {
        setShowFeedOnboarding(true);
      }
      await loadFriendsTab(user.id);
      setLoading(false);
    }
    init();
  }, []);

  // ── Fetch helpers ──────────────────────────────────────────────────────────

  async function getBuddyIds(uid: string): Promise<string[]> {
    const { data } = await supabase
      .from("buddies")
      .select("user_id_1, user_id_2")
      .or(`user_id_1.eq.${uid},user_id_2.eq.${uid}`);
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

  async function loadFriendsTab(uid: string) {
    const buddyIds = await getBuddyIds(uid);

    if (buddyIds.length === 0) {
      setRankedBuddiesFeed([]);
      return;
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // Batch profile fetch to handle large buddy lists
    const profileMap: Record<string, { user_id: string; display_name: string | null; username: string | null; profile_image_url: string | null }> = {};
    for (let i = 0; i < buddyIds.length; i += 500) {
      const { data: pics } = await supabase
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url")
        .in("user_id", buddyIds.slice(i, i + 500));
      (pics || []).forEach((p) => { profileMap[p.user_id] = p; });
    }
    const profiles = Object.values(profileMap);

    // Fetch buddy posts + activity + my recent activity in parallel
    // Split buddy IDs into chunks of 500 for .in() safety
    const postChunks: FeedPost[] = [];
    const activityChunks: FeedActivity[] = [];
    for (let i = 0; i < buddyIds.length; i += 500) {
      const chunk = buddyIds.slice(i, i + 500);
      const [pr, ar] = await Promise.all([
        supabase
          .from("feed_posts")
          .select("id, user_id, post_type, content, verse_ref, verse_text, media_url, link_url, link_title, visibility, reaction_counts, comment_count, created_at")
          .in("user_id", chunk)
          .gte("created_at", sevenDaysAgo)
          .order("created_at", { ascending: false })
          .limit(100),
        supabase
          .from("feed_activity")
          .select("id, user_id, activity_type, activity_data, group_id, group_name, created_at")
          .in("user_id", chunk)
          .eq("is_public", true)
          .gte("created_at", sevenDaysAgo)
          .order("created_at", { ascending: false })
          .limit(100),
      ]);
      postChunks.push(...(await enrichWithProfiles(pr.data || [], profiles) as FeedPost[]));
      activityChunks.push(...(await enrichWithProfiles(ar.data || [], profiles) as FeedActivity[]));
    }

    const { data: myActivityData } = await supabase
      .from("feed_activity")
      .select("activity_type, activity_data")
      .eq("user_id", uid)
      .order("created_at", { ascending: false })
      .limit(30);

    const buddyIdSet = new Set(buddyIds);
    const myReactedIds = new Set([...myReactions].map((k) => k.split(":")[0]));

    const ranked = rankCommunityFeed(postChunks, activityChunks, buddyIdSet, myActivityData || [], myReactedIds);
    setRankedBuddiesFeed(ranked);
    void loadMyReactions(uid, postChunks.map((p) => p.id));
  }

  async function loadMyFeedTab(uid: string) {
    if (myFeedLoaded) return;
    setMyFeedLoading(true);

    const [postsRes, activityRes] = await Promise.all([
      supabase
        .from("feed_posts")
        .select("id, user_id, post_type, content, verse_ref, verse_text, media_url, link_url, link_title, visibility, reaction_counts, comment_count, created_at")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(100),
      supabase
        .from("feed_activity")
        .select("id, user_id, activity_type, activity_data, group_id, group_name, created_at")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(100),
    ]);

    // Use already-loaded myProfile to avoid an extra fetch
    const profileArr = myProfile ? [{ user_id: uid, ...myProfile }] : [];
    const posts = await enrichWithProfiles(postsRes.data || [], profileArr) as FeedPost[];
    const activities = await enrichWithProfiles(activityRes.data || [], profileArr) as FeedActivity[];

    setMyFeedPosts(posts);
    setMyFeedActivity(activities);
    setMyFeedLoading(false);
    setMyFeedLoaded(true);
    void loadMyReactions(uid, posts.map((p) => p.id));
  }

  const loadCommunityTab = useCallback(async () => {
    if (rankedCommunityFeed.length > 0) return; // already loaded

    if (!userId) return;

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // Fetch posts, activity, buddy IDs, and my recent activity in parallel
    const [activityRes, postsRes, buddyRows, myActivityRes] = await Promise.all([
      supabase
        .from("feed_activity")
        .select("id, user_id, activity_type, activity_data, group_id, group_name, created_at")
        .eq("is_public", true)
        .gte("created_at", sevenDaysAgo)
        .order("created_at", { ascending: false })
        .limit(100),
      supabase
        .from("feed_posts")
        .select("id, user_id, post_type, content, verse_ref, verse_text, media_url, link_url, link_title, visibility, reaction_counts, comment_count, created_at")
        .eq("visibility", "community")
        .gte("created_at", sevenDaysAgo)
        .order("created_at", { ascending: false })
        .limit(100),
      supabase
        .from("buddies")
        .select("user_id_1, user_id_2")
        .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`),
      supabase
        .from("feed_activity")
        .select("activity_type, activity_data")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(30),
    ]);

    const buddyIds = new Set(
      (buddyRows.data || []).map((b) => b.user_id_1 === userId ? b.user_id_2 : b.user_id_1)
    );

    const allUserIds = [
      ...new Set([
        ...(activityRes.data || []).map((r) => r.user_id),
        ...(postsRes.data || []).map((r) => r.user_id),
      ]),
    ];

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
    const enrichedActivity = await enrichWithProfiles(activityRes.data || [], profiles) as FeedActivity[];

    // Load reactions for optimistic UI
    void loadMyReactions(userId, enrichedPosts.map((pt) => pt.id));
    const myReactedIds = new Set([...myReactions].map((k) => k.split(":")[0]));

    const ranked = rankCommunityFeed(
      enrichedPosts,
      enrichedActivity,
      buddyIds,
      myActivityRes.data || [],
      myReactedIds
    );

    setRankedCommunityFeed(ranked);
  }, [rankedCommunityFeed.length, userId, myReactions]);

  useEffect(() => {
    if (tab === "community" && userId) {
      void loadCommunityTab();
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
          item._kind === "post" && (item as FeedPost).id === postId
            ? { ...item, reaction_counts: { ...(item as FeedPost).reaction_counts, [reactionType]: Math.max(((item as FeedPost).reaction_counts?.[reactionType] ?? 0) + delta, 0) } }
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

  function renderFriendsTab() {
    if (rankedBuddiesFeed.filter((i) => i._kind === "post").length === 0) {
      return (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
          <p className="text-3xl mb-3">👥</p>
          <h3 className="font-bold text-gray-900 mb-1">No buddy posts yet</h3>
          <p className="text-sm text-gray-500 mb-5">Add Buddies from their profile to see their posts here.</p>
          <Link href="/study-groups" className="inline-block px-4 py-2 rounded-xl text-sm font-semibold text-white transition hover:opacity-90" style={{ backgroundColor: "#4a9b6f" }}>
            Find People
          </Link>
        </div>
      );
    }

    const buddyPosts = rankedBuddiesFeed.filter((item) => item._kind === "post");
    return (
      <div className="flex flex-col gap-3">
        {buddyPosts.map((item) => (
          <PostCard key={`post-${item.id}`} post={item as FeedPost} myId={userId!} myProfile={myProfile} myReactions={myReactions} onReact={handleReact} onCommentCountChange={handleCommentCountChange} onDelete={handleDeletePost} />
        ))}
      </div>
    );
  }

  function renderCommunityTab() {
    const posts = rankedCommunityFeed.filter((item) => item._kind === "post");
    if (posts.length === 0) {
      return (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
          <p className="text-3xl mb-3">🌎</p>
          <h3 className="font-bold text-gray-900 mb-1">Community is quiet</h3>
          <p className="text-sm text-gray-500">Be the first to share something!</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {posts.map((item) => (
          <PostCard key={`post-${item.id}`} post={item as FeedPost} myId={userId!} myProfile={myProfile} myReactions={myReactions} onReact={handleReact} onCommentCountChange={handleCommentCountChange} onDelete={handleDeletePost} />
        ))}
      </div>
    );
  }

  function renderMyFeedTab() {
    if (myFeedLoading) {
      return <div className="text-sm text-gray-400 text-center py-16">Loading your feed...</div>;
    }

    // Exclude redundant/noise activity types (post_created already shown as PostCard, login/signup irrelevant)
    const EXCLUDED = new Set(["post_created", "login", "signup", "user_signed_in", "user_registered"]);

    type UnifiedItem = ({ _kind: "post" } & FeedPost) | ({ _kind: "activity" } & FeedActivity);
    const items: UnifiedItem[] = [
      ...myFeedPosts.map((p) => ({ ...p, _kind: "post" as const })),
      ...myFeedActivity.filter((a) => !EXCLUDED.has(a.activity_type)).map((a) => ({ ...a, _kind: "activity" as const })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    if (items.length === 0) {
      return (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
          <p className="text-3xl mb-3">✨</p>
          <h3 className="font-bold text-gray-900 mb-1">Your feed is empty</h3>
          <p className="text-sm text-gray-500">Your posts and activity will appear here as you use Bible Buddy.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {items.map((item) =>
          item._kind === "post" ? (
            <PostCard
              key={`post-${item.id}`}
              post={item as FeedPost}
              myId={userId!}
              myProfile={myProfile}
              myReactions={myReactions}
              onReact={handleReact}
              onCommentCountChange={handleCommentCountChange}
              onDelete={handleDeletePost}
            />
          ) : (
            <ActivityPostCard key={`act-${item.id}`} activity={item as FeedActivity} />
          )
        )}
      </div>
    );
  }

  // ── Page ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Feed onboarding — shown once on first visit */}
      {userId && (
        <FeedOnboardingModal
          isOpen={showFeedOnboarding}
          userId={userId}
          onFinished={() => setShowFeedOnboarding(false)}
        />
      )}

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">Bible Buddy Feed</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">🔥 Bible Buddy Feed</h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
          {([
            { key: "community", label: "🌎 Community" },
            { key: "buddies",   label: "🤝 Buddies" },
            { key: "myfeed",    label: "👤 My Feed" },
          ] as { key: Tab; label: string }[]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                tab === key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Composer — hidden on My Feed tab */}
        {!loading && userId && tab !== "myfeed" && (
          <PostComposer
            userId={userId}
            userProfile={myProfile}
            onPosted={(newPost) => {
              const newRanked: RankedFeedItem = { ...newPost, _kind: "post", _score: 1, _signals: { recency: 1, engagement: 0, proximity: 0, relevance: 0 } };
              if (tab === "buddies") {
                setRankedBuddiesFeed((prev) => [newRanked, ...prev]);
              } else {
                setRankedCommunityFeed((prev) => [newRanked, ...prev]);
              }
            }}
          />
        )}

        {/* Content */}
        {loading ? (
          <div className="text-sm text-gray-400 text-center py-16">Loading feed...</div>
        ) : (
          tab === "buddies" ? renderFriendsTab() : tab === "community" ? renderCommunityTab() : renderMyFeedTab()
        )}

      </div>
    </div>
  );
}
