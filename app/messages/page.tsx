"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { ModalShell } from "../../components/ModalShell";
import UserBadge from "../../components/UserBadge";

const AVATAR_COLORS = ["#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8"];

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

interface Conversation {
  id: string;
  otherUserId: string;
  otherUserName: string;
  otherUserImage: string | null;
  otherUserBadge: string | null;
  otherUserIsPaid: boolean;
  lastMessagePreview: string | null;
  lastMessageAt: string | null;
  hasUnread: boolean;
}

export default function MessagesPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      await fetchConversations(user.id);
    }
    void load();
  }, [router]);

  async function fetchConversations(uid: string) {
    setLoading(true);
    try {
      const { data: convos } = await supabase
        .from("conversations")
        .select("id, user_id_1, user_id_2, last_message_at, last_message_preview")
        .or(`user_id_1.eq.${uid},user_id_2.eq.${uid}`)
        .order("last_message_at", { ascending: false, nullsFirst: false });

      if (!convos || convos.length === 0) {
        setConversations([]);
        return;
      }

      const otherIds = convos.map((c) => (c.user_id_1 === uid ? c.user_id_2 : c.user_id_1));

      const [profilesResult, unreadResult] = await Promise.all([
        supabase
          .from("profile_stats")
          .select("user_id, display_name, username, profile_image_url, member_badge, is_paid")
          .in("user_id", otherIds),
        supabase
          .from("messages")
          .select("conversation_id")
          .in("conversation_id", convos.map((c) => c.id))
          .neq("sender_id", uid)
          .is("read_at", null),
      ]);

      const profiles = profilesResult.data || [];
      const unreadConvoIds = new Set((unreadResult.data || []).map((m) => m.conversation_id));

      setConversations(
        convos.map((c) => {
          const otherId = c.user_id_1 === uid ? c.user_id_2 : c.user_id_1;
          const profile = profiles.find((p) => p.user_id === otherId);
          return {
            id: c.id,
            otherUserId: otherId,
            otherUserName: profile?.display_name || profile?.username || "Bible Buddy",
            otherUserImage: profile?.profile_image_url || null,
            otherUserBadge: profile?.member_badge || null,
            otherUserIsPaid: profile?.is_paid === true,
            lastMessagePreview: c.last_message_preview || null,
            lastMessageAt: c.last_message_at || null,
            hasUnread: unreadConvoIds.has(c.id),
          };
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModalShell
      isOpen={true}
      onClose={() => router.back()}
      backdropColor="bg-black/45"
      zIndex="z-[70]"
    >
      <div className="mx-4 w-full max-w-2xl rounded-[28px] border border-black/5 bg-[#fcfcfb] shadow-2xl">
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

        <div className="max-h-[78vh] overflow-y-auto px-4 py-4">
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
          ) : (
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
              {conversations.map((convo, index) => {
                const initials = convo.otherUserName
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div
                    key={convo.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => router.push(`/messages/${convo.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        router.push(`/messages/${convo.id}`);
                      }
                    }}
                    className={`w-full text-left transition-colors hover:bg-gray-50 cursor-pointer ${convo.hasUnread ? "bg-green-50/70" : ""} ${
                      index < conversations.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4 px-5 py-4">
                      <div className="flex-shrink-0">
                        {convo.otherUserImage ? (
                          <img src={convo.otherUserImage} alt={convo.otherUserName} className="h-12 w-12 rounded-full object-cover" />
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
                            <p className={`truncate text-sm ${convo.hasUnread ? "font-bold text-gray-900" : "font-semibold text-gray-800"}`}>
                              {convo.otherUserName}
                            </p>
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
