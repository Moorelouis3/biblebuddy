"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type LimitOption = 10 | 20 | 50 | 100;
type WindowOption = "all" | "90d" | "30d" | "7d";

type TopBuddy = {
  rank: number;
  userId: string;
  displayName: string;
  username: string | null;
  profileImageUrl: string | null;
  memberBadge: string | null;
  isPaid: boolean;
  currentLevel: number;
  currentStreak: number;
  weightedXp: number;
  score: number;
  totalActions: number;
  tasksDone: number;
  chaptersRead: number;
  notesReviewed: number;
  triviaAnswered: number;
  triviaCorrect: number;
  triviaCompleted: number;
  scrambledWords: number;
  scrambledCompleted: number;
  reflections: number;
  communityEngagement: number;
  groupPosts: number;
  groupComments: number;
  groupLikes: number;
  articleComments: number;
  peopleLearned: number;
  placesDiscovered: number;
  keywordsMastered: number;
  lastActiveAt: string | null;
  joinedAt: string | null;
};

type ApiResponse = {
  buddies: TopBuddy[];
  totals: {
    usersRanked: number;
    totalActions: number;
    totalTasks: number;
    totalCommunity: number;
    topScore: number;
  };
  scoring: {
    summary: string;
    weights: Record<string, number>;
  };
};

const ADMIN_EMAIL = "moorelouis3@gmail.com";
const LIMITS: LimitOption[] = [10, 20, 50, 100];
const WINDOWS: Array<{ value: WindowOption; label: string }> = [
  { value: "all", label: "All time" },
  { value: "90d", label: "90 days" },
  { value: "30d", label: "30 days" },
  { value: "7d", label: "7 days" },
];

function formatNumber(value: number | null | undefined) {
  return Math.round(value || 0).toLocaleString();
}

function formatLastActive(value: string | null) {
  if (!value) return "No activity yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No activity yet";
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (minutes < 5) return "Active now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "BB";
}

function rankStyle(rank: number) {
  if (rank === 1) return "bg-[#f9e7a7] text-[#5d4712] border-[#e8c85a]";
  if (rank === 2) return "bg-gray-200 text-gray-800 border-gray-300";
  if (rank === 3) return "bg-[#f3c49d] text-[#6d3d17] border-[#dfa56f]";
  return "bg-white text-gray-700 border-gray-200";
}

function MetricCard({ label, value, hint, active, onClick }: { label: string; value: string; hint: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left shadow-sm transition ${
        active ? "border-[#7BAFD4] bg-[#eef7fd]" : "border-gray-200 bg-white hover:border-[#7BAFD4]"
      }`}
    >
      <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-gray-950">{value}</p>
      <p className="mt-1 text-xs font-semibold text-gray-500">{hint}</p>
    </button>
  );
}

export default function TopBuddiesAdminPage() {
  const [limit, setLimit] = useState<LimitOption>(20);
  const [windowValue, setWindowValue] = useState<WindowOption>("all");
  const [filter, setFilter] = useState<"all" | "tasks" | "community" | "games">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTopBuddies() {
      setLoading(true);
      setError(null);

      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        const user = authData.user;
        if (!user || (user.email || "").toLowerCase() !== ADMIN_EMAIL) {
          if (!cancelled) {
            setAuthorized(false);
            setData(null);
          }
          return;
        }

        if (!cancelled) setAuthorized(true);
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        if (!token) throw new Error("Missing admin session.");

        const response = await fetch(`/api/admin/top-buddies?limit=${limit}&window=${windowValue}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json?.error || "Could not load top buddies.");
        if (!cancelled) setData(json);
      } catch (loadError: any) {
        if (!cancelled) {
          setError(loadError?.message || "Could not load top buddies.");
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadTopBuddies();

    return () => {
      cancelled = true;
    };
  }, [limit, windowValue]);

  const buddies = useMemo(() => {
    const rows = data?.buddies || [];
    if (filter === "tasks") return [...rows].sort((a, b) => b.tasksDone - a.tasksDone || b.score - a.score);
    if (filter === "community") return [...rows].sort((a, b) => b.communityEngagement - a.communityEngagement || b.score - a.score);
    if (filter === "games") {
      return [...rows].sort(
        (a, b) =>
          b.triviaCorrect + b.scrambledWords - (a.triviaCorrect + a.scrambledWords) ||
          b.score - a.score,
      );
    }
    return rows;
  }, [data, filter]);

  if (authorized === false) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-2xl font-black text-gray-950">Top Buddies</h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">This analytics page is only available to the Bible Buddy owner.</p>
          <Link href="/dashboard" className="mt-5 inline-flex rounded-xl bg-[#7BAFD4] px-5 py-3 text-sm font-black text-slate-950">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f8fb] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4f8fb7]">Owner Analytics</p>
            <h1 className="mt-2 text-3xl font-black text-gray-950 md:text-4xl">Top Buddies</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
              Ranked by the custom Bible Buddy Score across XP, level, tasks, Bible reading, trivia, Scrambled, reflections, streak, and community engagement.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {WINDOWS.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setWindowValue(item.value)}
                className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                  windowValue === item.value ? "border-[#7BAFD4] bg-[#7BAFD4] text-slate-950" : "border-gray-200 bg-white text-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Ranked Users" value={formatNumber(data?.totals.usersRanked)} hint="Users with tracked activity" active={filter === "all"} onClick={() => setFilter("all")} />
          <MetricCard label="Top Score" value={formatNumber(data?.totals.topScore)} hint="Highest Bible Buddy Score" active={false} onClick={() => setFilter("all")} />
          <MetricCard label="Tasks Done" value={formatNumber(data?.totals.totalTasks)} hint="Task-heavy ranking view" active={filter === "tasks"} onClick={() => setFilter("tasks")} />
          <MetricCard label="Community" value={formatNumber(data?.totals.totalCommunity)} hint="Comments, posts, likes, replies" active={filter === "community"} onClick={() => setFilter("community")} />
        </div>

        <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm leading-6 text-gray-600">{data?.scoring.summary || "Loading the Bible Buddy scoring formula..."}</p>
            <div className="flex flex-wrap gap-2">
              {LIMITS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLimit(option)}
                  className={`rounded-full border px-4 py-2 text-sm font-black ${
                    limit === option ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  Top {option}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setFilter("games")}
                className={`rounded-full border px-4 py-2 text-sm font-black ${
                  filter === "games" ? "border-purple-300 bg-purple-50 text-purple-800" : "border-gray-200 bg-white text-gray-700"
                }`}
              >
                Games
              </button>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm font-semibold text-gray-500 shadow-sm">Loading top buddies...</div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm font-bold text-red-700">{error}</div>
        ) : (
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-[1180px] w-full border-collapse text-left">
                <thead className="bg-gray-50">
                  <tr className="text-xs font-black uppercase tracking-[0.16em] text-gray-500">
                    <th className="px-4 py-4">Rank</th>
                    <th className="px-4 py-4">Buddy</th>
                    <th className="px-4 py-4">Score</th>
                    <th className="px-4 py-4">Level</th>
                    <th className="px-4 py-4">XP</th>
                    <th className="px-4 py-4">Tasks</th>
                    <th className="px-4 py-4">Bible</th>
                    <th className="px-4 py-4">Trivia</th>
                    <th className="px-4 py-4">Scrambled</th>
                    <th className="px-4 py-4">Reflections</th>
                    <th className="px-4 py-4">Community</th>
                    <th className="px-4 py-4">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {buddies.map((buddy) => (
                    <tr key={buddy.userId} className="align-top hover:bg-[#f8fbfd]">
                      <td className="px-4 py-4">
                        <span className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-black ${rankStyle(buddy.rank)}`}>
                          #{buddy.rank}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <Link href={`/profile/${buddy.userId}`} className="flex min-w-[240px] items-center gap-3">
                          {buddy.profileImageUrl ? (
                            <img src={buddy.profileImageUrl} alt={buddy.displayName} className="h-12 w-12 rounded-full object-cover" />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7BAFD4] text-sm font-black text-slate-950">
                              {getInitials(buddy.displayName)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="truncate text-sm font-black text-gray-950">{buddy.displayName}</p>
                              {buddy.isPaid ? <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-800">PRO</span> : null}
                            </div>
                            <p className="truncate text-xs font-semibold text-gray-500">{buddy.username ? `@${buddy.username}` : buddy.userId}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-lg font-black text-gray-950">{formatNumber(buddy.score)}</p>
                        <p className="text-xs font-semibold text-gray-500">{formatNumber(buddy.totalActions)} actions</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-black text-gray-950">Level {buddy.currentLevel}</p>
                        <p className="text-xs font-semibold text-orange-600">{buddy.currentStreak} day streak</p>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-gray-800">{formatNumber(buddy.weightedXp)}</td>
                      <td className="px-4 py-4 text-sm font-bold text-gray-800">{formatNumber(buddy.tasksDone)}</td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-gray-900">{formatNumber(buddy.chaptersRead)} chapters</p>
                        <p className="text-xs font-semibold text-gray-500">{formatNumber(buddy.notesReviewed)} notes</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-gray-900">{formatNumber(buddy.triviaAnswered)} answered</p>
                        <p className="text-xs font-semibold text-gray-500">{formatNumber(buddy.triviaCorrect)} correct</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-gray-900">{formatNumber(buddy.scrambledWords)} words</p>
                        <p className="text-xs font-semibold text-gray-500">{formatNumber(buddy.scrambledCompleted)} rounds</p>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-gray-800">{formatNumber(buddy.reflections)}</td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-gray-900">{formatNumber(buddy.communityEngagement)}</p>
                        <p className="text-xs font-semibold text-gray-500">
                          {formatNumber(buddy.groupPosts)} posts, {formatNumber(buddy.groupComments + buddy.articleComments)} comments
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-gray-700">{formatLastActive(buddy.lastActiveAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
