"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const SUBJECTS = [
  { name: "Bible Insights", slug: "bible-insights" },
  { name: "Bible Study Tips", slug: "bible-study-tips" },
  { name: "Christian Foundations", slug: "christian-foundations" },
  { name: "Verse Breakdowns", slug: "verse-breakdowns" },
  { name: "Character Studies", slug: "character-studies" },
  { name: "Christian History", slug: "christian-history" },
];

export default function CommentsAdminPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchComments = async () => {
        // Try normal client first
        let { data, error } = await supabase
          .from("article_comments")
          .select("*")
          .order("created_at", { ascending: false });
        // If blocked, try admin client
        if (error || !data) {
          // Uncomment below if needed:
          // let { data: adminData, error: adminError } = await adminSupabase
          //   .from("article_comments")
          //   .select("*")
          //   .order("created_at", { ascending: false });
          // if (!adminError && adminData) {
          //   data = adminData;
          //   error = null;
          // }
        }
        console.log("Fetched comments:", data);
        if (!error && data) {
          setComments(data);
          // Count by subject
          const grouped: { [key: string]: number } = {};
          SUBJECTS.forEach((s) => (grouped[s.slug] = 0));
          data.forEach((c: any) => {
            if (grouped[c.article_slug] !== undefined) {
              grouped[c.article_slug]++;
            }
          });
          setCounts(grouped);
        }
        setLoading(false);
      };
      fetchComments();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Comments Admin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {SUBJECTS.map((s) => (
          <div
            key={s.slug}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col items-center"
          >
            <div className="font-semibold text-lg mb-2">{s.name}</div>
            <div className="text-2xl font-bold">{counts[s.slug] || 0}</div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-4">All Comments</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="max-h-96 overflow-y-auto p-4">
            {comments.map((c, i) => {
              // Parse subject from slug
              const slugParts = c.article_slug.split("/").filter(Boolean);
              const subject = slugParts[1] || "";
              const pageSlug = slugParts[2] || "";
              // Title case conversion
              const title = pageSlug
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              // Format date
              const dateObj = new Date(c.created_at);
              const formattedDate = dateObj.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              });
              return (
                <div
                  key={i}
                  className="mb-2 p-3 rounded cursor-pointer hover:opacity-90 transition-opacity border-l-4 bg-blue-50 border-blue-500 flex items-center justify-between gap-3"
                  // onClick={() => setSelectedComment(c)} // For modal detail view
                >
                  <span className="font-medium text-gray-900 w-1/4 truncate">{c.display_name || c.user_name || "Anonymous"}</span>
                  <span className="text-gray-700 w-1/2 truncate text-center">{title}</span>
                  <span className="text-gray-500 text-sm w-1/4 text-right">{formattedDate}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
