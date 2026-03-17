"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import { ModalShell } from "../../../components/ModalShell";
import UserBadge from "../../../components/UserBadge";

const AVATAR_COLORS = ["#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8"];

function avatarColor(uid: string): string {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = uid.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatMsgTime(dateStr: string): string {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  if (diffDays === 1) return `Yesterday ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function parseGroupInvite(content: string): { body: string; href: string | null } {
  const match = content.match(/Open Bible Study Group:\s*(\/study-groups\/[^\s]+)/i);
  if (!match) {
    return { body: content, href: null };
  }

  const href = match[1];
  const body = content.replace(match[0], "").trim();
  return { body, href };
}

interface Message {
  id: string;
  sender_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
}

interface OtherUser {
  user_id: string;
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
  member_badge: string | null;
  is_paid: boolean | null;
}

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.conversationId as string;

  const [userId, setUserId] = useState<string | null>(null);
  const [otherUser, setOtherUser] = useState<OtherUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUserId(user.id);
      await loadConversation(user.id);
    }
    void init();
  }, [conversationId, router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadConversation(uid: string) {
    setLoading(true);
    try {
      const { data: convo } = await supabase
        .from("conversations")
        .select("id, user_id_1, user_id_2")
        .eq("id", conversationId)
        .maybeSingle();

      if (!convo || (convo.user_id_1 !== uid && convo.user_id_2 !== uid)) {
        setNotFound(true);
        return;
      }

      const otherId = convo.user_id_1 === uid ? convo.user_id_2 : convo.user_id_1;

      const { data: profile } = await supabase
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url, member_badge, is_paid")
        .eq("user_id", otherId)
        .maybeSingle();

      setOtherUser(
        profile || {
          user_id: otherId,
          display_name: null,
          username: null,
          profile_image_url: null,
          member_badge: null,
          is_paid: false,
        },
      );

      const { data: msgs } = await supabase
        .from("messages")
        .select("id, sender_id, content, read_at, created_at")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      setMessages(msgs || []);

      if (msgs && msgs.some((m) => m.sender_id !== uid && !m.read_at)) {
        void supabase
          .from("messages")
          .update({ read_at: new Date().toISOString() })
          .eq("conversation_id", conversationId)
          .neq("sender_id", uid)
          .is("read_at", null)
          .then(() => {
            window.dispatchEvent(new Event("bb:refresh-unread-messages"));
          });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (!newMessage.trim() || !userId || sending) return;
    const content = newMessage.trim();
    setNewMessage("");
    setSending(true);

    const optimisticMsg: Message = {
      id: `temp-${Date.now()}`,
      sender_id: userId,
      content,
      read_at: null,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      const { data: inserted, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: userId,
          content,
        })
        .select("id, sender_id, content, read_at, created_at")
        .single();

      if (error) {
        console.error("[MESSAGES] Send error:", error);
        setMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id));
        setNewMessage(content);
        return;
      }

      setMessages((prev) => prev.map((m) => (m.id === optimisticMsg.id ? inserted : m)));

      await supabase
        .from("conversations")
        .update({
          last_message_at: inserted.created_at,
          last_message_preview: content.length > 80 ? `${content.slice(0, 80)}...` : content,
        })
        .eq("id", conversationId);

      window.dispatchEvent(new Event("bb:refresh-unread-messages"));
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  if (loading) {
    return (
      <ModalShell isOpen={true} onClose={() => router.back()} backdropColor="bg-black/45" zIndex="z-[80]">
        <div className="mx-4 w-full max-w-3xl rounded-[28px] bg-white px-6 py-16 text-center shadow-2xl">
          <p className="text-sm text-gray-400">Loading conversation...</p>
        </div>
      </ModalShell>
    );
  }

  if (notFound) {
    return (
      <ModalShell isOpen={true} onClose={() => router.back()} backdropColor="bg-black/45" zIndex="z-[80]">
        <div className="mx-4 w-full max-w-md rounded-[28px] bg-white px-6 py-12 text-center shadow-2xl">
          <p className="mb-4 text-4xl">🔍</p>
          <h1 className="mb-2 text-xl font-bold text-gray-900">Conversation not found</h1>
          <Link href="/messages" className="text-sm text-blue-600 hover:underline">
            Back to Messages
          </Link>
        </div>
      </ModalShell>
    );
  }

  const otherDisplay = otherUser?.display_name || otherUser?.username || "Bible Buddy";
  const otherInitials = otherDisplay
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const otherColor = otherUser ? avatarColor(otherUser.user_id) : "#4a9b6f";

  return (
    <ModalShell isOpen={true} onClose={() => router.back()} backdropColor="bg-black/45" zIndex="z-[80]">
      <div className="mx-4 flex h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-[30px] border border-black/5 bg-[#fcfcfb] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-black/5 bg-white px-4 py-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
            aria-label="Close conversation"
          >
            ×
          </button>

          <Link href={`/profile/${otherUser?.user_id}`} className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-1 py-1 transition hover:bg-gray-50">
            {otherUser?.profile_image_url ? (
              <img src={otherUser.profile_image_url} alt={otherDisplay} className="h-10 w-10 flex-shrink-0 rounded-full object-cover" />
            ) : (
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: otherColor }}
              >
                {otherInitials}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <p className="truncate text-sm font-semibold text-gray-900">{otherDisplay}</p>
                <UserBadge customBadge={otherUser?.member_badge} isPaid={otherUser?.is_paid === true} />
              </div>
              {otherUser?.username && <p className="truncate text-xs text-gray-400">@{otherUser.username}</p>}
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#f6f7f5] px-4 py-4">
          {messages.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-gray-400">No messages yet. Say hello!</p>
            </div>
          )}

          {messages.map((msg) => {
            const isMine = msg.sender_id === userId;
            const invite = parseGroupInvite(msg.content);
            return (
              <div key={msg.id} className={`mb-3 flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[78%] flex-col gap-1 ${isMine ? "items-end" : "items-start"}`}>
                  <div
                    className={`rounded-3xl px-4 py-3 text-sm leading-relaxed ${
                      isMine
                        ? "rounded-br-md text-white"
                        : "rounded-bl-md border border-black/5 bg-white text-gray-900 shadow-sm"
                    }`}
                    style={isMine ? { backgroundColor: "#4a9b6f" } : undefined}
                  >
                    <p className="whitespace-pre-wrap">{invite.body}</p>
                    {invite.href && (
                      <Link
                        href={invite.href}
                        className={`mt-3 inline-flex rounded-2xl px-3 py-2 text-xs font-semibold transition ${
                          isMine
                            ? "bg-white/20 text-white hover:bg-white/25"
                            : "bg-[#4a9b6f] text-white hover:opacity-90"
                        }`}
                      >
                        Open Bible Study Group
                      </Link>
                    )}
                  </div>
                  <span className="px-1 text-[10px] text-gray-400">{formatMsgTime(msg.created_at)}</span>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>

        <div className="border-t border-black/5 bg-white px-4 py-3">
          <div className="mx-auto flex max-w-2xl items-end gap-3">
            <textarea
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message..."
              rows={1}
              className="max-h-32 flex-1 resize-none overflow-y-auto rounded-3xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              style={{ lineHeight: "1.5" }}
            />
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!newMessage.trim() || sending}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-white transition disabled:opacity-40"
              style={{ backgroundColor: "#4a9b6f" }}
            >
              <svg className="h-5 w-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="mt-1.5 text-center text-[10px] text-gray-400">Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </ModalShell>
  );
}
