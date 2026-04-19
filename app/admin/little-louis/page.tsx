"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type LouisTimeFilter = "24h" | "7d" | "30d";

type LouisActionRow = {
  user_id: string | null;
  username: string | null;
  action_type: string;
  action_label: string | null;
  created_at: string;
};

type LouisInboxRow = {
  id: string;
  user_id: string;
  title: string | null;
  content: string;
  kind: string;
  created_at: string;
  consumed_at: string | null;
};

type LouisProfileRow = {
  user_id: string;
  display_name: string | null;
  username: string | null;
  current_level: number | null;
  current_streak: number | null;
  profile_image_url: string | null;
};

type LouisTopUser = {
  userId: string;
  name: string;
  username: string;
  currentLevel: number | null;
  currentStreak: number | null;
  messagesToLouis: number;
  messagesFromLouis: number;
  opens: number;
};

type LouisLogEntry = {
  id: string;
  createdAt: string;
  type: string;
  userId: string | null;
  displayName: string;
  username: string;
  detail: string;
  shortDetail?: string;
};

type LouisDashboardMetrics = {
  louisMessagesToday: number;
  peopleWhoTalkedToday: number;
  louisOpenedToday: number;
  dailyMessagesToday: number;
  routeHandoffsToday: number;
  louisInboxSentToday: number;
  unreadInboxMessages: number;
};

const LOUIS_ACTION_TYPES = [
  "louis_opened",
  "louis_user_message_sent",
  "louis_ai_message_sent",
  "louis_daily_message_shown",
  "louis_route_handoff_shown",
] as const;

function getSinceIso(filter: LouisTimeFilter) {
  const now = new Date();
  if (filter === "24h") {
    return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  }
  if (filter === "7d") {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  }
  return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
}

function getTodayStartIso() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return start.toISOString();
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function compactText(value: string | null | undefined, maxLength = 140) {
  const text = (value ?? "").replace(/\s+/g, " ").trim();
  if (!text) return "No message text";
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
}

function prettifyLouisPath(value: string | null | undefined) {
  const text = (value ?? "").trim();
  if (!text) return "inside the app";

  if (text === "/dashboard") return "the dashboard";
  if (text === "/reading" || text === "/Bible") return "the Bible reader home";
  if (text === "/devotionals") return "the devotionals page";
  if (text === "/study-groups") return "The Bible Study Group";
  if (text === "/bible-trivia") return "the Bible trivia page";
  if (text === "/bible-study-games/scrambled") return "the Scrambled page";
  if (text === "/bible-study-games") return "the Bible study games page";
  if (text.startsWith("/Bible/")) {
    const parts = text.split("/").filter(Boolean);
    const book = decodeURIComponent(parts[1] || "").replace(/-/g, " ");
    const chapter = parts[2];
    const prettyBook = book
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return chapter ? `${prettyBook} ${chapter}` : prettyBook || "the Bible reader";
  }

  if (text.startsWith("/reading/books/")) {
    const parts = text.split("/").filter(Boolean);
    const book = decodeURIComponent(parts[2] || "").replace(/-/g, " ");
    const prettyBook = book
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return prettyBook || "a Bible book page";
  }

  return text.replace(/^\//, "");
}

function describeLouisAction(action: LouisActionRow, profile?: LouisProfileRow): LouisLogEntry {
  const displayName = profile?.display_name?.trim() || profile?.username?.trim() || action.username?.trim() || "Buddy";
  const username = profile?.username?.trim() || action.username?.trim() || "buddy";

  switch (action.action_type) {
    case "louis_user_message_sent":
      return {
        id: `${action.created_at}-${action.user_id}-${action.action_type}`,
        createdAt: action.created_at,
        type: "Buddy sent Louis a message",
        userId: action.user_id,
        displayName,
        username,
        detail: compactText(action.action_label),
        shortDetail: "Buddy typed a message to Louis.",
      };
    case "louis_ai_message_sent":
      return {
        id: `${action.created_at}-${action.user_id}-${action.action_type}`,
        createdAt: action.created_at,
        type: "Louis sent a message",
        userId: action.user_id,
        displayName,
        username,
        detail: compactText(action.action_label),
        shortDetail: "Louis sent a reply back.",
      };
    case "louis_daily_message_shown":
      return {
        id: `${action.created_at}-${action.user_id}-${action.action_type}`,
        createdAt: action.created_at,
        type: "Louis showed the daily message",
        userId: action.user_id,
        displayName,
        username,
        detail: compactText(action.action_label || "Louis showed the daily dashboard message."),
        shortDetail: "Louis showed the main daily check-in.",
      };
    case "louis_route_handoff_shown":
      return {
        id: `${action.created_at}-${action.user_id}-${action.action_type}`,
        createdAt: action.created_at,
        type: "Louis followed them into a page",
        userId: action.user_id,
        displayName,
        username,
        detail: compactText(action.action_label || "Louis handed the user off into a page."),
        shortDetail: "Louis gave a follow-up message on the page they opened.",
      };
    default:
      return {
        id: `${action.created_at}-${action.user_id}-${action.action_type}`,
        createdAt: action.created_at,
        type: "Buddy opened Louis",
        userId: action.user_id,
        displayName,
        username,
        detail: `They opened Louis while on ${prettifyLouisPath(action.action_label)}.`,
        shortDetail: `Opened on ${prettifyLouisPath(action.action_label)}.`,
      };
  }
}

async function fetchPagedLouisActions(sinceIso: string) {
  const pageSize = 1000;
  const rows: LouisActionRow[] = [];

  for (let from = 0; ; from += pageSize) {
    const to = from + pageSize - 1;
    const { data, error } = await supabase
      .from("master_actions")
      .select("user_id, username, action_type, action_label, created_at")
      .in("action_type", [...LOUIS_ACTION_TYPES])
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      throw error;
    }

    const batch = (data ?? []) as LouisActionRow[];
    rows.push(...batch);

    if (batch.length < pageSize) {
      break;
    }
  }

  return rows;
}

async function fetchProfilesByIds(userIds: string[]) {
  if (userIds.length === 0) {
    return new Map<string, LouisProfileRow>();
  }

  const { data, error } = await supabase
    .from("profile_stats")
    .select("user_id, display_name, username, current_level, current_streak, profile_image_url")
    .in("user_id", userIds);

  if (error) {
    throw error;
  }

  return new Map<string, LouisProfileRow>(
    ((data ?? []) as LouisProfileRow[]).map((profile) => [profile.user_id, profile]),
  );
}

export default function LittleLouisAdminPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackingWarning, setTrackingWarning] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<LouisTimeFilter>("7d");
  const [metrics, setMetrics] = useState<LouisDashboardMetrics>({
    louisMessagesToday: 0,
    peopleWhoTalkedToday: 0,
    louisOpenedToday: 0,
    dailyMessagesToday: 0,
    routeHandoffsToday: 0,
    louisInboxSentToday: 0,
    unreadInboxMessages: 0,
  });
  const [topUsers, setTopUsers] = useState<LouisTopUser[]>([]);
  const [actionLog, setActionLog] = useState<LouisLogEntry[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadLouisDashboard() {
      setLoading(true);
      setError(null);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const email = session?.user?.email ?? null;
        if (email !== "moorelouis3@gmail.com") {
          window.location.href = "/dashboard";
          return;
        }

        setTrackingWarning(null);

        const sinceIso = getSinceIso(timeFilter);
        const todayStartIso = getTodayStartIso();

        const [actions, inboxResponse] = await Promise.all([
          fetchPagedLouisActions(sinceIso),
          supabase
            .from("louis_inbox_messages")
            .select("id, user_id, title, content, kind, created_at, consumed_at")
            .gte("created_at", sinceIso)
            .order("created_at", { ascending: false })
            .limit(500),
        ]);

        if (inboxResponse.error) {
          throw inboxResponse.error;
        }

        const inboxRows = (inboxResponse.data ?? []) as LouisInboxRow[];
        const userIds = [...new Set(actions.map((row) => row.user_id).filter(Boolean) as string[])];
        const profilesById = await fetchProfilesByIds(userIds);

        if (actions.length === 0 && inboxRows.length > 0) {
          setTrackingWarning(
            "Little Louis inbox messages exist, but no Louis actions were recorded in master_actions. Run scripts/allow-little-louis-master-actions.sql in Supabase so Louis analytics can track opens, replies, and daily messages.",
          );
        }

        const todayActions = actions.filter((row) => row.created_at >= todayStartIso);
        const userMessagesToday = todayActions.filter((row) => row.action_type === "louis_user_message_sent");
        const aiMessagesToday = todayActions.filter((row) => row.action_type === "louis_ai_message_sent");
        const opensToday = todayActions.filter((row) => row.action_type === "louis_opened");
        const dailyMessagesToday = todayActions.filter((row) => row.action_type === "louis_daily_message_shown");
        const routeHandoffsToday = todayActions.filter((row) => row.action_type === "louis_route_handoff_shown");

        setMetrics({
          louisMessagesToday: aiMessagesToday.length,
          peopleWhoTalkedToday: new Set(userMessagesToday.map((row) => row.user_id).filter(Boolean)).size,
          louisOpenedToday: new Set(opensToday.map((row) => row.user_id).filter(Boolean)).size,
          dailyMessagesToday: dailyMessagesToday.length,
          routeHandoffsToday: routeHandoffsToday.length,
          louisInboxSentToday: inboxRows.filter((row) => row.created_at >= todayStartIso).length,
          unreadInboxMessages: inboxRows.filter((row) => !row.consumed_at).length,
        });

        const topUserMap = new Map<string, LouisTopUser>();
        for (const action of actions) {
          if (!action.user_id) continue;

          const profile = profilesById.get(action.user_id);
          const current = topUserMap.get(action.user_id) ?? {
            userId: action.user_id,
            name: profile?.display_name?.trim() || profile?.username?.trim() || action.username?.trim() || "Buddy",
            username: profile?.username?.trim() || action.username?.trim() || "buddy",
            currentLevel: profile?.current_level ?? null,
            currentStreak: profile?.current_streak ?? null,
            messagesToLouis: 0,
            messagesFromLouis: 0,
            opens: 0,
          };

          if (action.action_type === "louis_user_message_sent") current.messagesToLouis += 1;
          if (action.action_type === "louis_ai_message_sent") current.messagesFromLouis += 1;
          if (action.action_type === "louis_opened") current.opens += 1;

          topUserMap.set(action.user_id, current);
        }

        setTopUsers(
          [...topUserMap.values()]
            .sort((a, b) => {
              if (b.messagesToLouis !== a.messagesToLouis) return b.messagesToLouis - a.messagesToLouis;
              if (b.opens !== a.opens) return b.opens - a.opens;
              return b.messagesFromLouis - a.messagesFromLouis;
            })
            .slice(0, 10),
        );

        setActionLog(
          actions
            .map((action) => describeLouisAction(action, action.user_id ? profilesById.get(action.user_id) : undefined)),
        );
      } catch (loadError: any) {
        console.error("[LITTLE_LOUIS_ADMIN] Could not load Louis dashboard:", loadError);
        setError(loadError?.message || "Could not load Little Louis right now.");
      } finally {
        setLoading(false);
      }
    }

    void loadLouisDashboard();
  }, [timeFilter]);

  const flowCards = useMemo(
    () => [
      {
        title: "Daily opener",
        text: "Louis sends one main dashboard message on the first login of the day, and that message is based on streak band plus real user behavior.",
      },
      {
        title: "Second recommendation",
        text: "Louis gets one more recommendation shot six hours later if the user opens the dashboard again, and it is meant to push expansion instead of repeating the same thing.",
      },
      {
        title: "Route handoffs",
        text: "Recommendation clicks and guided flows can hand the user into the next page with a Louis follow up.",
      },
      {
        title: "Bible Study Group push",
        text: "Louis can now push the current poll, current series, and other group activity as part of the daily recommendation logic.",
      },
      {
        title: "Inbox reports",
        text: "Weekly Bible reports and other inbox moments show up inside Louis instead of the old DM path.",
      },
      {
        title: "Conversation logging",
        text: "User messages, Louis replies, daily messages, opens, and handoffs are all tracked in master_actions now.",
      },
    ],
    [],
  );

  const selectedTopUser = useMemo(
    () => topUsers.find((user) => user.userId === selectedUserId) ?? null,
    [selectedUserId, topUsers],
  );

  const displayedActionLog = useMemo(() => {
    const filtered = selectedUserId
      ? actionLog.filter((entry) => entry.userId === selectedUserId)
      : actionLog;

    if (selectedUserId) {
      return [...filtered].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return filtered.slice(0, 150);
  }, [actionLog, selectedUserId]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">Little Louis</p>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">Little Louis Dashboard</h1>
        <p className="text-sm text-gray-600 mt-2">
          Watch what Louis is sending, who is talking to him, and which parts of the flow are getting used most.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {(["24h", "7d", "30d"] as LouisTimeFilter[]).map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setTimeFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              timeFilter === filter
                ? "bg-sky-100 text-sky-700"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {trackingWarning ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800 mb-6">
          {trackingWarning}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-7 gap-4 mb-8">
        <MetricCard label="Louis messages today" value={loading ? "..." : metrics.louisMessagesToday.toString()} />
        <MetricCard label="People who talked today" value={loading ? "..." : metrics.peopleWhoTalkedToday.toString()} />
        <MetricCard label="Louis opens today" value={loading ? "..." : metrics.louisOpenedToday.toString()} />
        <MetricCard label="Daily messages today" value={loading ? "..." : metrics.dailyMessagesToday.toString()} />
        <MetricCard label="Route handoffs today" value={loading ? "..." : metrics.routeHandoffsToday.toString()} />
        <MetricCard label="Inbox messages today" value={loading ? "..." : metrics.louisInboxSentToday.toString()} />
        <MetricCard label="Unread Louis inbox" value={loading ? "..." : metrics.unreadInboxMessages.toString()} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6 mb-8">
        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Top Louis users</h2>
              <p className="text-sm text-gray-600 mt-1">Most active people talking to Louis in this window.</p>
            </div>
          </div>

          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : topUsers.length === 0 ? (
              <p className="text-sm text-gray-500">No Louis activity yet in this window.</p>
            ) : (
              topUsers.map((user, index) => (
                <button
                  key={user.userId}
                  type="button"
                  onClick={() => setSelectedUserId((current) => (current === user.userId ? null : user.userId))}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    selectedUserId === user.userId
                      ? "border-sky-300 bg-sky-50 shadow-sm"
                      : "border-gray-200 bg-gray-50 hover:border-sky-200 hover:bg-sky-50/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-gray-500">#{index + 1}</p>
                      <p className="text-lg font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500">@{user.username}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-gray-900">{user.messagesToLouis} to Louis</p>
                      <p className="text-xs text-gray-500">{user.messagesFromLouis} back from Louis</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                    <span className="rounded-full bg-white px-3 py-1 border border-gray-200">Level {user.currentLevel ?? 0}</span>
                    <span className="rounded-full bg-white px-3 py-1 border border-gray-200">{user.currentStreak ?? 0} day streak</span>
                    <span className="rounded-full bg-white px-3 py-1 border border-gray-200">{user.opens} opens</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Current Louis systems</h2>
          <p className="text-sm text-gray-600 mt-1 mb-4">
            This is the starting control panel. We can turn this into full Louis settings next.
          </p>

          <div className="space-y-3">
            {flowCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3">
                <p className="text-sm font-semibold text-sky-900">{card.title}</p>
                <p className="text-sm text-sky-800 mt-1">{card.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedTopUser ? `${selectedTopUser.name}'s Louis history` : "Louis action log"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {selectedTopUser
                  ? "This shows the story in order, starting with what happened first and then what happened next."
                  : "What users sent to Louis, what Louis sent back, and when the special Louis flows fired."}
              </p>
            </div>
            {selectedTopUser ? (
              <button
                type="button"
                onClick={() => setSelectedUserId(null)}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Show everyone
              </button>
            ) : null}
          </div>
        </div>

        <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : displayedActionLog.length === 0 ? (
            <p className="text-sm text-gray-500">No Louis actions found in this window.</p>
          ) : (
            displayedActionLog.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{entry.type}</p>
                    {selectedTopUser ? null : (
                      <p className="text-sm text-gray-700 mt-1 break-words">
                        <span className="font-medium">{entry.displayName}</span>
                        {entry.username ? <span className="text-gray-500"> @{entry.username}</span> : null}
                      </p>
                    )}
                    {entry.shortDetail ? (
                      <p className="text-sm text-gray-500 mt-2 break-words">{entry.shortDetail}</p>
                    ) : null}
                    <p className="text-sm text-gray-600 mt-2 break-words">{entry.detail}</p>
                  </div>
                  <p className="text-xs text-gray-500 shrink-0">{formatDateTime(entry.createdAt)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-5 text-center shadow-sm">
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600 mt-2">{label}</p>
    </div>
  );
}
