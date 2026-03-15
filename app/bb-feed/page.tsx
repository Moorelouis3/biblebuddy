"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FeedPost {
  id: string;
  user_id: string;
  post_type: "thought" | "verse" | "prayer" | "photo" | "link";
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

type Tab = "friends" | "community";
type PostType = "thought" | "verse" | "prayer" | "photo" | "link";

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
  thought: "💭 Thought",
  verse: "📖 Verse",
  prayer: "🙏 Prayer",
  photo: "📷 Photo",
  link: "🔗 Link",
};

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

const POST_TYPES: { key: PostType; emoji: string; label: string }[] = [
  { key: "thought", emoji: "💭", label: "Thought" },
  { key: "verse",   emoji: "📖", label: "Verse"   },
  { key: "prayer",  emoji: "🙏", label: "Prayer"  },
  { key: "photo",   emoji: "📷", label: "Photo"   },
  { key: "link",    emoji: "🔗", label: "Link"    },
];

function PostComposer({ userId, userProfile, onPosted }: {
  userId: string;
  userProfile: { display_name: string | null; username: string | null; profile_image_url: string | null } | null;
  onPosted: (post: FeedPost) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [postType, setPostType] = useState<PostType>("thought");
  const [content, setContent] = useState("");
  const [verseRef, setVerseRef] = useState("");
  const [verseText, setVerseText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [visibility, setVisibility] = useState<"community" | "buddies">("community");
  const [submitting, setSubmitting] = useState(false);

  const displayName = userProfile?.display_name || userProfile?.username || "Bible Buddy";

  function reset() {
    setContent("");
    setVerseRef("");
    setVerseText("");
    setLinkUrl("");
    setLinkTitle("");
    setPostType("thought");
    setVisibility("community");
    setExpanded(false);
  }

  async function handleSubmit() {
    if (!content.trim() || submitting) return;
    setSubmitting(true);

    const payload: Record<string, string | null> = {
      user_id: userId,
      post_type: postType,
      content: content.trim(),
      visibility,
      verse_ref: verseRef.trim() || null,
      verse_text: verseText.trim() || null,
      link_url: linkUrl.trim() || null,
      link_title: linkTitle.trim() || null,
      media_url: null,
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

      // Log activity
      await supabase.rpc("log_feed_activity", {
        p_activity_type: "post_created",
        p_activity_data: { post_id: data.id, post_type: postType, content_preview: content.trim().slice(0, 80) },
        p_feed_post_id: data.id,
        p_is_public: visibility === "community",
      });

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
        <span className="text-sm text-gray-400 flex-1">Share a thought, verse, or prayer...</span>
        <span className="text-xs text-white font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: "#4a9b6f" }}>Post</span>
      </button>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 overflow-hidden">
      {/* Type selector */}
      <div className="flex gap-0 border-b border-gray-100">
        {POST_TYPES.map((t) => (
          <button
            key={t.key}
            onClick={() => setPostType(t.key)}
            className={`flex-1 py-2.5 text-xs font-semibold transition border-b-2 ${
              postType === t.key
                ? "border-green-500 text-green-700 bg-green-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      <div className="p-4 flex flex-col gap-3">
        {/* Verse extras */}
        {postType === "verse" && (
          <>
            <input
              type="text"
              value={verseRef}
              onChange={(e) => setVerseRef(e.target.value)}
              placeholder="Reference (e.g. John 3:16 NIV)"
              className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <textarea
              value={verseText}
              onChange={(e) => setVerseText(e.target.value)}
              placeholder="Paste verse text here..."
              rows={2}
              className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </>
        )}

        {/* Link extras */}
        {postType === "link" && (
          <>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
              placeholder="Link title (optional)"
              className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </>
        )}

        {/* Main content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            postType === "thought" ? "What's on your heart?" :
            postType === "verse"   ? "What does this verse mean to you?" :
            postType === "prayer"  ? "Share your prayer..." :
            postType === "photo"   ? "Caption your photo..." :
            "Why are you sharing this?"
          }
          rows={3}
          autoFocus
          className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Footer: visibility + actions */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Visibility toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setVisibility("community")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                visibility === "community" ? "bg-white shadow-sm text-gray-800" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              🌎 Community
            </button>
            <button
              onClick={() => setVisibility("buddies")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                visibility === "buddies" ? "bg-white shadow-sm text-gray-800" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              👥 Buddies
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={reset}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!content.trim() || submitting}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition disabled:opacity-40"
              style={{ backgroundColor: "#4a9b6f" }}
            >
              {submitting ? "Posting..." : "Post"}
            </button>
          </div>
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

function PostCard({ post, myId, myProfile, myReactions, onReact, onCommentCountChange }: {
  post: FeedPost;
  myId: string;
  myProfile: MyProfile;
  myReactions: Set<string>;
  onReact: (postId: string, reaction: string) => void;
  onCommentCountChange: (postId: string, delta: number) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [localCommentCount, setLocalCommentCount] = useState(post.comment_count);
  const displayName = post.display_name || post.username || "Bible Buddy";
  const REACTIONS = [
    { key: "pray",  emoji: "🙏", label: "Pray" },
    { key: "love",  emoji: "❤️",  label: "Love" },
    { key: "fire",  emoji: "🔥",  label: "Fire" },
    { key: "light", emoji: "💡", label: "Light" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
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
            {post.visibility === "buddies" && (
              <span className="text-xs text-blue-500 bg-blue-50 rounded-full px-2 py-0.5">Buddies only</span>
            )}
          </div>
          <p className="text-xs text-gray-400">{timeAgo(post.created_at)}</p>
        </div>
      </div>

      {/* Content */}
      {post.post_type === "verse" && post.verse_ref && (
        <p className="text-xs font-semibold text-green-700 mb-1">{post.verse_ref}</p>
      )}
      {post.verse_text && (
        <p className="text-sm italic text-gray-600 mb-2 border-l-2 border-green-400 pl-3">"{post.verse_text}"</p>
      )}
      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{post.content}</p>

      {post.media_url && (
        <img src={post.media_url} alt="Post image" className="mt-3 rounded-lg w-full object-cover max-h-64" />
      )}
      {post.link_url && (
        <a
          href={post.link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-2 text-xs text-blue-600 hover:underline"
        >
          🔗 {post.link_title || post.link_url}
        </a>
      )}

      {/* Reactions + comment toggle */}
      <div className="flex items-center gap-1 mt-4 flex-wrap">
        {REACTIONS.map((r) => {
          const count = post.reaction_counts?.[r.key] ?? 0;
          const active = myReactions.has(`${post.id}:${r.key}`);
          return (
            <button
              key={r.key}
              onClick={() => onReact(post.id, r.key)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border transition ${
                active
                  ? "border-green-400 bg-green-50 text-green-700 font-semibold"
                  : "border-gray-200 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 text-gray-600"
              }`}
            >
              <span>{r.emoji}</span>
              {count > 0 && <span className="font-medium">{count}</span>}
            </button>
          );
        })}
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

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function BbFeedPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [myProfile, setMyProfile] = useState<{ display_name: string | null; username: string | null; profile_image_url: string | null } | null>(null);
  const [tab, setTab] = useState<Tab>("friends");
  const [loading, setLoading] = useState(true);

  // Friends tab state
  const [friendsPosts, setFriendsPosts] = useState<FeedPost[]>([]);
  const [friendsActivity, setFriendsActivity] = useState<FeedActivity[]>([]);

  // Community tab state
  const [communityActivity, setCommunityActivity] = useState<FeedActivity[]>([]);
  const [communityPosts, setCommunityPosts] = useState<FeedPost[]>([]);

  // Reactions the current user has already made — key: "postId:reactionType"
  const [myReactions, setMyReactions] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);
      const { data: prof } = await supabase
        .from("profile_stats")
        .select("display_name, username, profile_image_url")
        .eq("user_id", user.id)
        .maybeSingle();
      setMyProfile(prof ?? null);
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
      setFriendsPosts([]);
      setFriendsActivity([]);
      return;
    }

    const [postsRes, activityRes, profilesRes] = await Promise.all([
      supabase
        .from("feed_posts")
        .select("id, user_id, post_type, content, verse_ref, verse_text, media_url, link_url, link_title, visibility, reaction_counts, comment_count, created_at")
        .in("user_id", buddyIds)
        .order("created_at", { ascending: false })
        .limit(30),
      supabase
        .from("feed_activity")
        .select("id, user_id, activity_type, activity_data, group_id, group_name, created_at")
        .in("user_id", buddyIds)
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url")
        .in("user_id", buddyIds),
    ]);

    const profiles = profilesRes.data || [];
    const posts = await enrichWithProfiles(postsRes.data || [], profiles) as FeedPost[];
    setFriendsPosts(posts);
    setFriendsActivity(await enrichWithProfiles(activityRes.data || [], profiles) as FeedActivity[]);
    void loadMyReactions(uid, posts.map((p) => p.id));
  }

  const loadCommunityTab = useCallback(async () => {
    if (communityActivity.length > 0 || communityPosts.length > 0) return; // already loaded

    const [activityRes, postsRes] = await Promise.all([
      supabase
        .from("feed_activity")
        .select("id, user_id, activity_type, activity_data, group_id, group_name, created_at")
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(60),
      supabase
        .from("feed_posts")
        .select("id, user_id, post_type, content, verse_ref, verse_text, media_url, link_url, link_title, visibility, reaction_counts, comment_count, created_at")
        .eq("visibility", "community")
        .order("created_at", { ascending: false })
        .limit(30),
    ]);

    const allUserIds = [
      ...new Set([
        ...(activityRes.data || []).map((r) => r.user_id),
        ...(postsRes.data || []).map((r) => r.user_id),
      ]),
    ];

    const { data: profiles } = await supabase
      .from("profile_stats")
      .select("user_id, display_name, username, profile_image_url")
      .in("user_id", allUserIds);

    const p = profiles || [];
    const communityPostsEnriched = await enrichWithProfiles(postsRes.data || [], p) as FeedPost[];
    setCommunityActivity(await enrichWithProfiles(activityRes.data || [], p) as FeedActivity[]);
    setCommunityPosts(communityPostsEnriched);
    if (userId) {
      void loadMyReactions(userId, communityPostsEnriched.map((pt) => pt.id));
    }
  }, [communityActivity.length, communityPosts.length]);

  useEffect(() => {
    if (tab === "community" && userId) {
      void loadCommunityTab();
    }
  }, [tab, userId, loadCommunityTab]);

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

    if (tab === "friends") setFriendsPosts(updateCounts);
    else setCommunityPosts(updateCounts);

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
    }
  }

  // ── Comment count sync ─────────────────────────────────────────────────────

  function handleCommentCountChange(postId: string, delta: number) {
    const update = (prev: FeedPost[]) =>
      prev.map((p) => p.id === postId ? { ...p, comment_count: Math.max(p.comment_count + delta, 0) } : p);
    setFriendsPosts(update);
    setCommunityPosts(update);
  }

  // ── Render helpers ─────────────────────────────────────────────────────────

  function renderFriendsTab() {
    if (friendsPosts.length === 0 && friendsActivity.length === 0) {
      return (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
          <p className="text-3xl mb-3">👥</p>
          <h3 className="font-bold text-gray-900 mb-1">No buddy activity yet</h3>
          <p className="text-sm text-gray-500 mb-5">Add Buddies from their profile to see their posts and activity here.</p>
          <Link href="/study-groups" className="inline-block px-4 py-2 rounded-xl text-sm font-semibold text-white transition hover:opacity-90" style={{ backgroundColor: "#4a9b6f" }}>
            Find People
          </Link>
        </div>
      );
    }

    // Interleave posts + activity sorted by created_at desc
    type FeedItem = ({ _kind: "post" } & FeedPost) | ({ _kind: "activity" } & FeedActivity);
    const items: FeedItem[] = [
      ...friendsPosts.map((p) => ({ ...p, _kind: "post" as const })),
      ...friendsActivity.map((a) => ({ ...a, _kind: "activity" as const })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return (
      <div className="flex flex-col gap-3">
        {items.map((item) =>
          item._kind === "post" ? (
            <PostCard key={`post-${item.id}`} post={item as FeedPost} myId={userId!} myProfile={myProfile} myReactions={myReactions} onReact={handleReact} onCommentCountChange={handleCommentCountChange} />
          ) : (
            <ActivityCard key={`act-${item.id}`} activity={item as FeedActivity} />
          )
        )}
      </div>
    );
  }

  function renderCommunityTab() {
    const hasPosts = communityPosts.length > 0;
    const hasActivity = communityActivity.length > 0;

    if (!hasPosts && !hasActivity) {
      return (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
          <p className="text-3xl mb-3">🌎</p>
          <h3 className="font-bold text-gray-900 mb-1">Community is quiet</h3>
          <p className="text-sm text-gray-500">Be the first to share something!</p>
        </div>
      );
    }

    type FeedItem = ({ _kind: "post" } & FeedPost) | ({ _kind: "activity" } & FeedActivity);
    const items: FeedItem[] = [
      ...communityPosts.map((p) => ({ ...p, _kind: "post" as const })),
      ...communityActivity.map((a) => ({ ...a, _kind: "activity" as const })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return (
      <div className="flex flex-col gap-3">
        {items.map((item) =>
          item._kind === "post" ? (
            <PostCard key={`post-${item.id}`} post={item as FeedPost} myId={userId!} myProfile={myProfile} myReactions={myReactions} onReact={handleReact} onCommentCountChange={handleCommentCountChange} />
          ) : (
            <ActivityCard key={`act-${item.id}`} activity={item as FeedActivity} />
          )
        )}
      </div>
    );
  }

  // ── Page ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">Bible Buddy Feed</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-1">🔥 Bible Buddy Feed</h1>
        <p className="text-sm text-gray-500 mb-6">See what your community is up to</p>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
          {(["friends", "community"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "friends" ? "👥 Friends" : "🌎 Community"}
            </button>
          ))}
        </div>

        {/* Composer */}
        {!loading && userId && (
          <PostComposer
            userId={userId}
            userProfile={myProfile}
            onPosted={(newPost) => {
              if (tab === "friends") {
                setFriendsPosts((prev) => [newPost, ...prev]);
              } else {
                setCommunityPosts((prev) => [newPost, ...prev]);
              }
            }}
          />
        )}

        {/* Content */}
        {loading ? (
          <div className="text-sm text-gray-400 text-center py-16">Loading feed...</div>
        ) : (
          tab === "friends" ? renderFriendsTab() : renderCommunityTab()
        )}

      </div>
    </div>
  );
}
