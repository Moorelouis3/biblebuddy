"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
// Simple UUID v4 generator (RFC4122 compliant, not cryptographically secure)
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

interface Comment {
  id: string;
  article_slug: string;
  user_id: string;
  user_name: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string | null;
  is_deleted: boolean;
  replies?: Comment[];
}

interface CommentSectionProps {
  articleSlug: string;
}

function groupComments(comments: Comment[]): Comment[] {
  const map: Record<string, Comment & { replies: Comment[] }> = {};
  const roots: Comment[] = [];
  comments.forEach((c) => {
    map[c.id] = { ...c, replies: [] };
  });
  comments.forEach((c) => {
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].replies.push(map[c.id]);
    } else if (!c.parent_id) {
      roots.push(map[c.id]);
    }
  });
  return roots;
}

function timeAgo(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diff = (now.getTime() - then.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return then.toLocaleDateString();
}

export default function CommentSection({ articleSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("article_comments")
      .select("*")
      .eq("article_slug", articleSlug)
      .order("created_at", { ascending: true });
    setLoading(false);
    if (error) setError(error.message);
    else setComments(data || []);
  }, [articleSlug]);

  useEffect(() => {
    fetchComments();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && data.session.user) {
        const meta = data.session.user.user_metadata || {};
        let displayName = "";
        if (meta.full_name && typeof meta.full_name === "string" && meta.full_name.trim()) {
          displayName = meta.full_name.trim();
        } else if (meta.name && typeof meta.name === "string" && meta.name.trim()) {
          displayName = meta.name.trim();
        } else if (data.session.user.email && typeof data.session.user.email === "string") {
          displayName = data.session.user.email.split("@")[0];
        } else {
          displayName = "Anonymous";
        }
        setUser({ id: data.session.user.id, name: displayName });
      }
    });
  }, [fetchComments]);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("article_comments").insert({
      id: uuidv4(),
      article_slug: articleSlug,
      user_id: user.id,
      user_name: user.name,
      content,
      parent_id: replyTo,
    });
    setLoading(false);
    setContent("");
    setReplyTo(null);
    if (error) setError(error.message);
    else fetchComments();
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const { error } = await supabase.from("article_comments").delete().eq("id", id);
    setLoading(false);
    if (error) setError(error.message);
    else fetchComments();
  };

  const renderComments = (comments: Comment[], depth = 0) =>
    comments.map((c) => (
      <div
        key={c.id}
        className={`pl-${depth * 4} border-b border-gray-200 py-4 flex gap-3`}
        style={{ marginLeft: depth ? 24 : 0 }}
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-white">
          {c.user_name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold">{c.user_name}</span>
            <span className="text-xs text-gray-500">{timeAgo(c.created_at)}</span>
          </div>
          <div className="mb-2 text-gray-800 whitespace-pre-line">{c.content}</div>
          <div className="flex gap-2 text-sm">
            {user && user.id === c.user_id && (
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(c.id)}
              >
                Delete
              </button>
            )}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setReplyTo(c.id)}
            >
              Reply
            </button>
          </div>
          {replyTo === c.id && (
            <form onSubmit={handlePost} className="mt-2 flex flex-col gap-2">
              <textarea
                className="border rounded p-2 text-sm"
                rows={2}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a reply..."
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Post Reply"}
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:underline text-sm"
                  onClick={() => {
                    setReplyTo(null);
                    setContent("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          {c.replies && c.replies.length > 0 && (
            <div className="mt-2">
              {renderComments(c.replies, depth + 1)}
            </div>
          )}
        </div>
      </div>
    ));

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {user && !replyTo && (
        <form onSubmit={handlePost} className="mb-6 flex flex-col gap-2">
          <textarea
            className="border rounded p-2 text-sm"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded self-end"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      )}
      <div>{renderComments(groupComments(comments))}</div>
      {!user && <div className="text-gray-500 text-sm">Sign in to comment.</div>}
    </section>
  );
}
