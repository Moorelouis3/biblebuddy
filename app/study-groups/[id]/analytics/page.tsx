"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type AnalyticsPayload = {
  group: {
    id: string;
    name: string;
    coverEmoji: string;
  };
  metrics: {
    uniqueFeedVisitors: number;
    totalFeedVisits: number;
    posts: number;
    comments: number;
    likes: number;
    articleReads: number;
    uniqueArticleReaders: number;
  };
  latestDrops: {
    weeklyTrivia: { week_key: string; subject_title: string; created_at: string } | null;
    truthThursday: { week_key: string; subject_title: string; prompt: string; created_at: string } | null;
  };
  schedule: Array<{
    key: string;
    label: string;
    accent: string;
    nextReleaseLabel: string;
    nextContentTitle: string;
    nextContentDescription: string;
  }>;
};

export default function StudyGroupAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsPayload | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAnalytics() {
      setLoading(true);
      setError(null);

      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;
      if (!user) {
        router.push("/login");
        return;
      }
      if (user.email !== "moorelouis3@gmail.com") {
        router.push(`/study-groups/${groupId}/chat`);
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) {
        setError("Could not verify your session.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/groups/${groupId}/analytics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.error || "Could not load analytics.");
        }

        if (!cancelled) {
          setData(payload);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load analytics.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadAnalytics();
    return () => {
      cancelled = true;
    };
  }, [groupId, router]);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-sm text-gray-500">Loading group analytics...</div>;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-[#ead8c4] bg-white p-6 shadow-sm text-center">
          <p className="text-lg font-bold text-gray-900">Group analytics unavailable</p>
          <p className="mt-2 text-sm text-gray-500">{error || "Could not load this page."}</p>
          <Link href={`/study-groups/${groupId}/chat`} className="mt-4 inline-flex rounded-xl bg-[#4a9b6f] px-4 py-2.5 text-sm font-semibold text-white">
            Back to Group
          </Link>
        </div>
      </div>
    );
  }

  const metricCards = [
    { label: "Feed Visitors", value: data.metrics.uniqueFeedVisitors, helper: `${data.metrics.totalFeedVisits} total visits logged` },
    { label: "Posts", value: data.metrics.posts, helper: "Top-level group posts" },
    { label: "Comments", value: data.metrics.comments, helper: "Replies and discussion" },
    { label: "Likes", value: data.metrics.likes, helper: "Group post likes" },
    { label: "Article Reads", value: data.metrics.articleReads, helper: `${data.metrics.uniqueArticleReaders} unique readers` },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8f4]">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-4 flex-wrap">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <span>/</span>
          <Link href={`/study-groups/${groupId}/chat`} className="hover:underline">Bible Study Group</Link>
          <span>/</span>
          <span className="text-gray-900">Analytics</span>
        </div>

        <div className="rounded-[28px] border border-[#d8e8d7] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6f8d6c]">Study Group Analytics</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span>{data.group.coverEmoji}</span>
                <span>{data.group.name}</span>
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                A quick Louis-only view of group momentum, engagement, and the next planned recurring drops.
              </p>
            </div>
            <Link
              href={`/study-groups/${groupId}/chat`}
              className="rounded-full border border-[#d9c7b4] bg-[#fffaf4] px-4 py-2 text-sm font-semibold text-[#8d5d38]"
            >
              Back to Group
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-5">
            {metricCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-[#ece6dd] bg-[#fcfbf8] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">{card.label}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{card.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{card.helper}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#ead9c4] bg-[#fff9f2] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a8693e]">Latest Recurring Drops</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-[#f0e3d3] bg-white p-4">
                  <p className="text-sm font-semibold text-gray-900">Trivia Tuesday</p>
                  <p className="mt-1 text-sm text-[#8d5d38]">{data.latestDrops.weeklyTrivia?.subject_title || "No trivia published yet"}</p>
                </div>
                <div className="rounded-2xl border border-[#f0e3d3] bg-white p-4">
                  <p className="text-sm font-semibold text-gray-900">Truth Thursday</p>
                  <p className="mt-1 text-sm text-[#8d5d38]">{data.latestDrops.truthThursday?.subject_title || "No question published yet"}</p>
                  {data.latestDrops.truthThursday?.prompt ? (
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{data.latestDrops.truthThursday.prompt}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#dce8dc] bg-[#f8fcf7] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f8d6c]">Weekly Scheduler</p>
              <div className="mt-4 space-y-3">
                {data.schedule.map((item) => (
                  <div key={item.key} className="rounded-2xl border border-[#e6efe5] bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide" style={{ color: item.accent }}>
                          Next release: {item.nextReleaseLabel}
                        </p>
                      </div>
                      <span className="h-3 w-3 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: item.accent }} />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-gray-900">{item.nextContentTitle}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.nextContentDescription}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
