"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

const AVATAR_COLORS = ["#4a9b6f","#5b8dd9","#c97b3e","#9b6bb5","#d45f7a","#3ea8a8"];
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);
      await loadConversation(user.id);
    }
    init();
  }, [conversationId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadConversation(uid: string) {
    setLoading(true);
    try {
      // Verify the user is part of this conversation
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

      // Fetch other user profile
      const { data: profile } = await supabase
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url")
        .eq("user_id", otherId)
        .maybeSingle();

      setOtherUser(profile || { user_id: otherId, display_name: null, username: null, profile_image_url: null });

      // Fetch messages
      const { data: msgs } = await supabase
        .from("messages")
        .select("id, sender_id, content, read_at, created_at")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      setMessages(msgs || []);

      // Mark incoming messages as read
      if (msgs && msgs.some((m) => m.sender_id !== uid && !m.read_at)) {
        void supabase
          .from("messages")
          .update({ read_at: new Date().toISOString() })
          .eq("conversation_id", conversationId)
          .neq("sender_id", uid)
          .is("read_at", null);
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

    // Optimistic add
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

      // Replace optimistic with real row
      setMessages((prev) => prev.map((m) => m.id === optimisticMsg.id ? inserted : m));

      // Update conversation preview
      await supabase
        .from("conversations")
        .update({
          last_message_at: inserted.created_at,
          last_message_preview: content.length > 80 ? content.slice(0, 80) + "…" : content,
        })
        .eq("id", conversationId);
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

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading conversation...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-4xl mb-4">🔍</p>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Conversation not found</h1>
          <Link href="/messages" className="text-sm text-blue-600 hover:underline">Back to Messages</Link>
        </div>
      </div>
    );
  }

  const otherDisplay = otherUser?.display_name || otherUser?.username || "Bible Buddy";
  const otherInitials = otherDisplay.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const otherColor = otherUser ? avatarColor(otherUser.user_id) : "#4a9b6f";

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => router.push("/messages")}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <Link href={`/profile/${otherUser?.user_id}`} className="flex items-center gap-3 hover:opacity-80 transition flex-1 min-w-0">
          {otherUser?.profile_image_url ? (
            <img src={otherUser.profile_image_url} alt={otherDisplay} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: otherColor }}
            >
              {otherInitials}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{otherDisplay}</p>
            {otherUser?.username && (
              <p className="text-xs text-gray-400 truncate">@{otherUser.username}</p>
            )}
          </div>
        </Link>
      </div>

      {/* ── MESSAGES ────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">No messages yet. Say hello! 👋</p>
          </div>
        )}

        {messages.map((msg) => {
          const isMine = msg.sender_id === userId;
          return (
            <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] ${isMine ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMine
                      ? "text-white rounded-br-sm"
                      : "bg-white border border-gray-200 text-gray-900 rounded-bl-sm shadow-sm"
                  }`}
                  style={isMine ? { backgroundColor: "#4a9b6f" } : undefined}
                >
                  {msg.content}
                </div>
                <span className="text-[10px] text-gray-400 px-1">{formatMsgTime(msg.created_at)}</span>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* ── INPUT ───────────────────────────────────────────────────────── */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-end gap-3 max-w-2xl mx-auto">
          <textarea
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            rows={1}
            className="flex-1 resize-none px-4 py-2.5 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 max-h-32 overflow-y-auto"
            style={{ lineHeight: "1.5" }}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white transition disabled:opacity-40"
            style={{ backgroundColor: "#4a9b6f" }}
          >
            <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-1.5">Enter to send · Shift+Enter for new line</p>
      </div>

    </div>
  );
}
