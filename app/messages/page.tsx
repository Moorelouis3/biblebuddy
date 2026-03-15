"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const AVATAR_COLORS = ["#4a9b6f","#5b8dd9","#c97b3e","#9b6bb5","#d45f7a","#3ea8a8"];
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
  lastMessagePreview: string | null;
  lastMessageAt: string | null;
  hasUnread: boolean;
}

export default function MessagesPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);
      await fetchConversations(user.id);
    }
    load();
  }, []);

  async function fetchConversations(uid: string) {
    setLoading(true);
    try {
      const { data: convos } = await supabase
        .from("conversations")
        .select("id, user_id_1, user_id_2, last_message_at, last_message_preview")
        .or(`user_id_1.eq.${uid},user_id_2.eq.${uid}`)
        .order("last_message_at", { ascending: false, nullsFirst: false });

      if (!convos || convos.length === 0) { setConversations([]); return; }

      const otherIds = convos.map((c) => c.user_id_1 === uid ? c.user_id_2 : c.user_id_1);

      const [profilesResult, unreadResult] = await Promise.all([
        supabase
          .from("profile_stats")
          .select("user_id, display_name, username, profile_image_url")
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

      setConversations(convos.map((c) => {
        const otherId = c.user_id_1 === uid ? c.user_id_2 : c.user_id_1;
        const profile = profiles.find((p) => p.user_id === otherId);
        return {
          id: c.id,
          otherUserId: otherId,
          otherUserName: profile?.display_name || profile?.username || "Bible Buddy",
          otherUserImage: profile?.profile_image_url || null,
          lastMessagePreview: c.last_message_preview || null,
          lastMessageAt: c.last_message_at || null,
          hasUnread: unreadConvoIds.has(c.id),
        };
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">Messages</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>

        {loading ? (
          <div className="text-sm text-gray-400 text-center py-12">Loading...</div>
        ) : conversations.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 shadow-sm text-center">
            <p className="text-4xl mb-4">💬</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No messages yet</h2>
            <p className="text-sm text-gray-500 mb-6">Add Buddies from their profile to start a conversation.</p>
            <Link href="/study-groups" className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition" style={{ backgroundColor: "#4a9b6f" }}>
              Find People
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {conversations.map((convo, index) => {
              const initials = convo.otherUserName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
              return (
                <button
                  key={convo.id}
                  type="button"
                  onClick={() => router.push(`/messages/${convo.id}`)}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors ${convo.hasUnread ? "bg-green-50" : ""} ${index < conversations.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {convo.otherUserImage ? (
                      <img src={convo.otherUserImage} alt={convo.otherUserName} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: avatarColor(convo.otherUserId) }}
                      >
                        {initials}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className={`text-sm ${convo.hasUnread ? "font-bold text-gray-900" : "font-semibold text-gray-800"}`}>
                        {convo.otherUserName}
                      </p>
                      <span className="text-xs text-gray-400 flex-shrink-0">{formatTime(convo.lastMessageAt)}</span>
                    </div>
                    <p className={`text-sm truncate ${convo.hasUnread ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                      {convo.lastMessagePreview || "No messages yet"}
                    </p>
                  </div>

                  {/* Unread dot */}
                  {convo.hasUnread && (
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: "#4a9b6f" }} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
