"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const SUBJECTS = [
  { name: "Bible Insights", slug: "bible-insights", bg: "bg-blue-100 border-blue-200", text: "text-blue-900" },
  { name: "Bible Study Tips", slug: "bible-study-tips", bg: "bg-yellow-100 border-yellow-200", text: "text-yellow-900" },
  { name: "Christian Foundations", slug: "christian-foundations", bg: "bg-purple-100 border-purple-200", text: "text-purple-900" },
  { name: "Verse Breakdowns", slug: "verse-breakdowns", bg: "bg-emerald-100 border-emerald-200", text: "text-emerald-900" },
  { name: "Character Studies", slug: "character-studies", bg: "bg-indigo-100 border-indigo-200", text: "text-indigo-900" },
  { name: "Christian History", slug: "christian-history", bg: "bg-orange-100 border-orange-200", text: "text-orange-900" },
];

export default function CommentsAdminPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchComments = async () => {
      let { data, error } = await supabase
        .from("article_comments")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setComments(data);
        // Count by subject
        const getSubjectFromSlug = (slug: string) => {
          const parts = slug.split("/").filter(Boolean);
          const hubIndex = parts.indexOf("bible-study-hub");
          return hubIndex !== -1 ? parts[hubIndex + 1] : null;
        };
        const counts = data.reduce((acc: Record<string, number>, c: any) => {
          const subject = getSubjectFromSlug(c.article_slug);
          if (subject) acc[subject] = (acc[subject] || 0) + 1;
          return acc;
        }, {});
        // Fill missing subjects with 0
        const grouped: { [key: string]: number } = {};
        SUBJECTS.forEach((s) => {
          grouped[s.slug] = counts[s.slug] || 0;
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
            className={`rounded-xl shadow-sm p-4 flex flex-col items-center border ${s.bg}`}
          >
            <div className={`font-semibold text-lg mb-2 ${s.text}`}>{s.name}</div>
            <div className={`text-2xl font-bold ${s.text}`}>{counts[s.slug] || 0}</div>
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
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
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
                  onClick={() => router.push(c.article_slug)}
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
