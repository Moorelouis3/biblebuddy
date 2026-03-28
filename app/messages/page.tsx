"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { ModalShell } from "../../components/ModalShell";
import UserBadge from "../../components/UserBadge";
import StreakFlameBadge from "../../components/StreakFlameBadge";
import { extractLegacyDirectMessageAction } from "../../lib/directMessageActions";

const AVATAR_COLORS = ["#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8"];
const FETCH_BATCH_SIZE = 200;

function avatarColor(uid: string): string {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = uid.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatTime(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

type InboxBucket = "primary" | "general";

interface Conversation {
  id: string;
  otherUserId: string;
  otherUserName: string;
  otherUserImage: string | null;
  otherUserBadge: string | null;
  otherUserIsPaid: boolean;
  otherUserCurrentStreak: number | null;
  lastMessagePreview: string | null;
  lastMessageAt: string | null;
  hasUnread: boolean;
  bucket: InboxBucket;
}

function sortConversations(list: Conversation[]) {
  return [...list].sort((a, b) => {
    if (a.hasUnread !== b.hasUnread) return a.hasUnread ? -1 : 1;
    return (b.lastMessageAt ?? "").localeCompare(a.lastMessageAt ?? "");
  });
}

export default function MessagesPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<InboxBucket>("primary");

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setCurrentUserId(user.id);
      await fetchConversations(user.id);
    }
    void load();
  }, [router]);

  useEffect(() => {
    if (!currentUserId) return;

    const refresh = () => {
      void fetchConversations(currentUserId);
    };

    const messageChannel = supabase
      .channel(`messages-page:${currentUserId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "conversations" }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "profile_stats" }, refresh)
      .subscribe();

    window.addEventListener("focus", refresh);
    window.addEventListener("bb:refresh-unread-messages", refresh);

    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("bb:refresh-unread-messages", refresh);
      void supabase.removeChannel(messageChannel);
    };
  }, [currentUserId]);

  const primaryConversations = useMemo(
    () => conversations.filter((conversation) => conversation.bucket === "primary"),
    [conversations],
  );
  const generalConversations = useMemo(
    () => conversations.filter((conversation) => conversation.bucket === "general"),
    [conversations],
  );
  const visibleConversations = activeTab === "primary" ? primaryConversations : generalConversations;

  useEffect(() => {
    if (activeTab === "primary" && primaryConversations.length === 0 && generalConversations.length > 0) {
      setActiveTab("general");
    }
    if (activeTab === "general" && generalConversations.length === 0 && primaryConversations.length > 0) {
      setActiveTab("primary");
    }
  }, [activeTab, generalConversations.length, primaryConversations.length]);

  async function fetchConversations(uid: string) {
    setLoading(true);
    try {
      const rawConversations: Array<{
        id: string;
        user_id_1: string;
        user_id_2: string;
        last_message_at: string | null;
        last_message_preview: string | null;
      }> = [];

      for (let offset = 0; ; offset += FETCH_BATCH_SIZE) {
        const { data: batch } = await supabase
          .from("conversations")
          .select("id, user_id_1, user_id_2, last_message_at, last_message_preview")
          .or(`user_id_1.eq.${uid},user_id_2.eq.${uid}`)
          .order("last_message_at", { ascending: false, nullsFirst: false })
          .range(offset, offset + FETCH_BATCH_SIZE - 1);

        if (!batch || batch.length === 0) break;
        rawConversations.push(...batch);
        if (batch.length < FETCH_BATCH_SIZE) break;
      }

      if (rawConversations.length === 0) {
        setConversations([]);
        return;
      }

      const otherIds = rawConversations.map((conversation) =>
        conversation.user_id_1 === uid ? conversation.user_id_2 : conversation.user_id_1,
      );
      const conversationIds = rawConversations.map((conversation) => conversation.id);

      const profileChunks = Array.from(
        { length: Math.ceil(otherIds.length / FETCH_BATCH_SIZE) },
        (_, index) => [...new Set(otherIds.slice(index * FETCH_BATCH_SIZE, (index + 1) * FETCH_BATCH_SIZE))],
      ).filter((chunk) => chunk.length > 0);

      const conversationChunks = Array.from(
        { length: Math.ceil(conversationIds.length / FETCH_BATCH_SIZE) },
        (_, index) => conversationIds.slice(index * FETCH_BATCH_SIZE, (index + 1) * FETCH_BATCH_SIZE),
      ).filter((chunk) => chunk.length > 0);

      const [profileResults, unreadResults, replyResults] = await Promise.all([
        Promise.all(
          profileChunks.map((chunk) =>
            supabase
              .from("profile_stats")
              .select("user_id, display_name, username, profile_image_url, member_badge, is_paid, current_streak")
              .in("user_id", chunk),
          ),
        ),
        Promise.all(
          conversationChunks.map((chunk) =>
            supabase
              .from("messages")
              .select("conversation_id")
              .in("conversation_id", chunk)
              .neq("sender_id", uid)
              .is("read_at", null),
          ),
        ),
        Promise.all(
          conversationChunks.map((chunk) =>
            supabase
              .from("messages")
              .select("conversation_id")
              .in("conversation_id", chunk)
              .neq("sender_id", uid),
          ),
        ),
      ]);

      const profiles = profileResults.flatMap((result) => result.data || []);
      const missingIds = otherIds.filter((id) => !profiles.some((profile) => profile.user_id === id));

      if (missingIds.length > 0) {
        const missingResults = await Promise.all(
          [...new Set(missingIds)].map(async (missingId) => {
            const { data } = await supabase
              .from("profile_stats")
              .select("user_id, display_name, username, profile_image_url, member_badge, is_paid, current_streak")
              .eq("user_id", missingId)
              .maybeSingle();

            return data;
          }),
        );

        missingResults.forEach((profile) => {
          if (profile) profiles.push(profile);
        });
      }

      const unreadConvoIds = new Set(
        unreadResults.flatMap((result) => result.data || []).map((message) => message.conversation_id),
      );
      const repliedConvoIds = new Set(
        replyResults.flatMap((result) => result.data || []).map((message) => message.conversation_id),
      );

      const hydrated = rawConversations.map((conversation) => {
        const otherId = conversation.user_id_1 === uid ? conversation.user_id_2 : conversation.user_id_1;
        const profile = profiles.find((candidate) => candidate.user_id === otherId);

        return {
          id: conversation.id,
          otherUserId: otherId,
          otherUserName: profile?.display_name || profile?.username || "Bible Buddy",
          otherUserImage: profile?.profile_image_url || null,
          otherUserBadge: profile?.member_badge || null,
          otherUserIsPaid: profile?.is_paid === true,
          otherUserCurrentStreak: profile?.current_streak ?? null,
          lastMessagePreview: conversation.last_message_preview
            ? extractLegacyDirectMessageAction(conversation.last_message_preview).body
            : null,
          lastMessageAt: conversation.last_message_at || null,
          hasUnread: unreadConvoIds.has(conversation.id),
          bucket: repliedConvoIds.has(conversation.id) ? "primary" : "general",
        } satisfies Conversation;
      });

      const primary = sortConversations(hydrated.filter((conversation) => conversation.bucket === "primary"));
      const general = sortConversations(hydrated.filter((conversation) => conversation.bucket === "general"));

      setConversations([...primary, ...general]);
    } catch (error) {
      console.error("[MESSAGES_PAGE] Could not load conversations:", error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModalShell isOpen={true} onClose={() => router.back()} backdropColor="bg-black/45" zIndex="z-[70]">
      <div className="h-[100dvh] w-screen overflow-hidden bg-[#fcfcfb] sm:mx-4 sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:w-full sm:max-w-2xl sm:rounded-[28px] sm:border sm:border-black/5 sm:shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4a9b6f]">Bible Buddy</p>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">Messages</h1>
          </div>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
            aria-label="Close messages"
          >
            ×
          </button>
        </div>

        <div className="h-[calc(100dvh-5rem)] overflow-y-auto px-4 py-4 sm:h-auto sm:max-h-[78vh]">
          <div className="mb-4 inline-flex rounded-2xl border border-black/5 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("primary")}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === "primary" ? "bg-[#4a9b6f] text-white" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Primary ({primaryConversations.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("general")}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === "general" ? "bg-[#4a9b6f] text-white" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              General ({generalConversations.length})
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-gray-400">Loading...</div>
          ) : conversations.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center">
              <p className="mb-4 text-4xl">💬</p>
              <h2 className="mb-2 text-xl font-bold text-gray-900">No messages yet</h2>
              <p className="mb-6 text-sm text-gray-500">Add Buddies from their profile to start a conversation.</p>
              <Link
                href="/study-groups"
                className="inline-block rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition"
                style={{ backgroundColor: "#4a9b6f" }}
              >
                Find People
              </Link>
            </div>
          ) : visibleConversations.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center">
              <p className="mb-4 text-4xl">{activeTab === "primary" ? "📥" : "🗂️"}</p>
              <h2 className="mb-2 text-xl font-bold text-gray-900">
                No {activeTab === "primary" ? "primary" : "general"} messages
              </h2>
              <p className="text-sm text-gray-500">
                {activeTab === "primary"
                  ? "Threads move here once the other person replies back."
                  : "Outreach and onboarding threads stay here until somebody answers you."}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
              {visibleConversations.map((convo, index) => {
                const initials = convo.otherUserName
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div
                    key={convo.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => router.push(`/messages/${convo.id}`)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        router.push(`/messages/${convo.id}`);
                      }
                    }}
                    className={`w-full cursor-pointer text-left transition-colors hover:bg-gray-50 ${
                      convo.hasUnread ? "bg-green-50/70" : ""
                    } ${index < visibleConversations.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <div className="flex items-center gap-4 px-5 py-4">
                      <div className="flex-shrink-0">
                        {convo.otherUserImage ? (
                          <img
                            src={convo.otherUserImage}
                            alt={convo.otherUserName}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-white"
                            style={{ backgroundColor: avatarColor(convo.otherUserId) }}
                          >
                            {initials}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-0.5 flex items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            <Link
                              href={`/profile/${convo.otherUserId}`}
                              onClick={(event) => event.stopPropagation()}
                              className={`truncate text-sm hover:underline ${
                                convo.hasUnread ? "font-bold text-gray-900" : "font-semibold text-gray-800"
                              }`}
                            >
                              {convo.otherUserName}
                            </Link>
                            <StreakFlameBadge currentStreak={convo.otherUserCurrentStreak} />
                            <UserBadge customBadge={convo.otherUserBadge} isPaid={convo.otherUserIsPaid} />
                          </div>
                          <span className="flex-shrink-0 text-xs text-gray-400">{formatTime(convo.lastMessageAt)}</span>
                        </div>
                        <p className={`truncate text-sm ${convo.hasUnread ? "font-medium text-gray-800" : "text-gray-400"}`}>
                          {convo.lastMessagePreview || "No messages yet"}
                        </p>
                      </div>

                      {convo.hasUnread && (
                        <div className="h-3 w-3 flex-shrink-0 rounded-full" style={{ backgroundColor: "#4a9b6f" }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ModalShell>
  );
}
