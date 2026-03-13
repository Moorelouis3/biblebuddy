"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

const SUBJECTS = [
  { name: "Bible Insights", slug: "bible-insights", color: "bg-blue-50 border-l-4 border-blue-500", cardColor: "bg-blue-50", countColor: "text-blue-700" },
  { name: "Bible Study Tips", slug: "bible-study-tips", color: "bg-green-50 border-l-4 border-green-500", cardColor: "bg-green-50", countColor: "text-green-700" },
  { name: "Christian Foundations", slug: "christian-foundations", color: "bg-purple-50 border-l-4 border-purple-500", cardColor: "bg-purple-50", countColor: "text-purple-700" },
  { name: "Verse Breakdowns", slug: "verse-breakdowns", color: "bg-yellow-50 border-l-4 border-yellow-500", cardColor: "bg-yellow-50", countColor: "text-yellow-700" },
  { name: "Character Studies", slug: "character-studies", color: "bg-pink-50 border-l-4 border-pink-500", cardColor: "bg-pink-50", countColor: "text-pink-700" },
  { name: "Christian History", slug: "christian-history", color: "bg-orange-50 border-l-4 border-orange-500", cardColor: "bg-orange-50", countColor: "text-orange-700" },
];

// Convert an article slug like "bible-insights/what-is-faith" into a readable title "What Is Faith"
function slugToTitle(slug: string): string {
  const parts = slug.split("/");
  const last = parts[parts.length - 1];
  return last
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// The slug is already the full path (e.g. "/bible-study-hub/bible-insights/what-is-faith")
function slugToUrl(slug: string): string {
  return slug;
}

// Get subject color class for a comment row
function getCommentColor(slug: string): string {
  const subject = SUBJECTS.find((s) => typeof slug === "string" && slug.includes(s.slug));
  return subject ? subject.color : "bg-gray-50 border-l-4 border-gray-400";
}

export default function CommentsAdminPage() {
  const router = useRouter();
  const [comments, setComments] = useState<any[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [selectedComment, setSelectedComment] = useState<any | null>(null);
  const [replyText, setReplyText] = useState("");
  const replyUsername = "Louis";
  const [submittingReply, setSubmittingReply] = useState(false);
  const [replySuccess, setReplySuccess] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [adminUserId, setAdminUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setAdminUserId(user.id);
    });
  }, []);

  async function fetchComments() {
    setLoading(true);
    const { data, error } = await supabase
      .from("article_comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setComments(data);
      const grouped: { [key: string]: number } = {};
      SUBJECTS.forEach((s) => (grouped[s.slug] = 0));
      data.forEach((c: any) => {
        SUBJECTS.forEach((s) => {
          if (typeof c.article_slug === "string" && c.article_slug.includes(s.slug)) {
            grouped[s.slug]++;
          }
        });
      });
      setCounts(grouped);
    }
    setLoading(false);
  }

  async function submitReply() {
    if (!replyText.trim() || !selectedComment) return;
    setSubmittingReply(true);
    const { error } = await supabase.from("article_comments").insert({
      article_slug: selectedComment.article_slug,
      user_id: adminUserId,
      user_name: replyUsername,
      content: replyText.trim(),
      parent_id: selectedComment.id ?? null,
    });
    setSubmittingReply(false);
    if (!error) {
      setReplySuccess(true);
      setReplyText("");
      fetchComments();
      setTimeout(() => setReplySuccess(false), 3000);
    }
  }

  const filteredComments = selectedSubject
    ? comments.filter((c) => typeof c.article_slug === "string" && c.article_slug.includes(selectedSubject))
    : comments;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Comments Admin</h1>
      <p className="text-gray-500 mb-8">All reader comments across Bible study articles.</p>

      {/* Subject Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        {SUBJECTS.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => setSelectedSubject(selectedSubject === s.slug ? null : s.slug)}
            className={`rounded-xl p-4 text-left shadow-sm ring-1 transition-all ${s.cardColor} ${
              selectedSubject === s.slug
                ? "ring-2 ring-blue-500 shadow-md"
                : "ring-black/5 hover:ring-black/10"
            }`}
          >
            <div className={`text-3xl font-bold mb-1 ${s.countColor}`}>
              {counts[s.slug] || 0}
            </div>
            <div className="text-sm font-medium text-gray-700">{s.name}</div>
          </button>
        ))}
      </div>

      {/* Comment List */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          {selectedSubject
            ? SUBJECTS.find((s) => s.slug === selectedSubject)?.name ?? "Comments"
            : "All Comments"}
        </h2>
        {selectedSubject && (
          <button
            onClick={() => setSelectedSubject(null)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear Filter
          </button>
        )}
      </div>

      {loading ? (
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">Loading comments...</p>
        </div>
      ) : filteredComments.length === 0 ? (
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-500 text-sm">No comments yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="max-h-[500px] overflow-y-auto p-4 space-y-2">
            {filteredComments.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setSelectedComment(c); setReplySuccess(false); setReplyText(""); }}
                className={`w-full text-left p-3 rounded transition-opacity hover:opacity-90 ${getCommentColor(c.article_slug)}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-sm text-gray-900">{c.user_name || "Anonymous"}</span>
                    <span className="text-gray-500 text-sm"> on </span>
                    <span className="font-medium text-sm text-blue-700">
                      {slugToTitle(c.article_slug || "")}
                    </span>
                    {c.content && (
                      <p className="text-sm text-gray-600 mt-1 truncate">{c.content}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                    {new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comment Detail Modal */}
      {selectedComment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {slugToTitle(selectedComment.article_slug || "")}
                  </h3>
                  <button
                    onClick={() => router.push(slugToUrl(selectedComment.article_slug))}
                    className="text-xs text-blue-600 hover:underline mt-0.5"
                  >
                    View article →
                  </button>
                </div>
                <button
                  onClick={() => setSelectedComment(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none ml-4"
                >
                  ×
                </button>
              </div>

              {/* Comment */}
              <div className={`p-4 rounded-xl mb-5 ${getCommentColor(selectedComment.article_slug)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-gray-900">{selectedComment.user_name || "Anonymous"}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(selectedComment.created_at).toLocaleString("en-US", {
                      month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {selectedComment.content || <span className="italic text-gray-400">No comment text</span>}
                </p>
              </div>

              {/* Reply Box */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Reply as admin</h4>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {replySuccess && (
                  <p className="text-green-600 text-sm mt-1">Reply posted!</p>
                )}
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={submitReply}
                    disabled={submittingReply || !replyText.trim()}
                    className="flex-1 bg-blue-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {submittingReply ? "Posting..." : "Post Reply"}
                  </button>
                  <button
                    onClick={() => setSelectedComment(null)}
                    className="flex-1 bg-gray-100 text-gray-600 text-sm font-medium py-2 rounded-xl hover:bg-gray-200 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
