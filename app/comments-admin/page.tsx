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
      const { data, error } = await supabase
        .from("article_comments")
        .select("user_name, article_slug, created_at");
      if (!error && data) {
        setComments(data);
        // Count by subject: count any comment whose article_slug contains the subject slug
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
            className="bg-white border rounded shadow p-4 flex flex-col items-center"
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
        <ul className="divide-y divide-gray-200">
          {comments.map((c, i) => (
            <li key={i} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="font-medium">{c.user_name}</span>
              <Link
                href={`/bible-study-hub/${c.article_slug}`}
                className="text-blue-600 hover:underline mx-2"
              >
                {c.article_slug}
              </Link>
              <span className="text-gray-500 text-sm">
                {new Date(c.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
