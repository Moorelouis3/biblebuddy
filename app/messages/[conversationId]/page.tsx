"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import { ModalShell } from "../../../components/ModalShell";
import UserBadge from "../../../components/UserBadge";
import StreakFlameBadge from "../../../components/StreakFlameBadge";

const AVATAR_COLORS = ["#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8"];
const REPORT_REASONS = [
  "Spam or scam",
  "Harassment or bullying",
  "Inappropriate or sexual content",
  "Hate or abusive language",
  "Threatening behavior",
  "Fake profile or impersonation",
];

function avatarColor(uid: string): string {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = uid.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function initialsFor(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
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
  if (diffDays === 1) {
    return `Yesterday ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatHeaderStatus(lastActiveAt?: string | null): string {
  if (!lastActiveAt) return "Buddy";
  const date = new Date(lastActiveAt);
  return `Active ${formatMsgTime(date.toISOString())}`;
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

interface BuddyProfile {
  user_id: string;
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
  member_badge: string | null;
  is_paid: boolean | null;
  last_active_at?: string | null;
  current_streak?: number | null;
}

interface BlockState {
  blocker_user_id: string;
  blocked_user_id: string;
}

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.conversationId as string;

  const [userId, setUserId] = useState<string | null>(null);
  const [myProfile, setMyProfile] = useState<BuddyProfile | null>(null);
  const [otherUser, setOtherUser] = useState<BuddyProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [submittingReport, setSubmittingReport] = useState(false);
  const [blockingBuddy, setBlockingBuddy] = useState(false);
  const [blockState, setBlockState] = useState<BlockState | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const editInputRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  async function markConversationAsRead(currentUserId: string) {
    const nowIso = new Date().toISOString();
    const { error } = await supabase
      .from("messages")
      .update({ read_at: nowIso })
      .eq("conversation_id", conversationId)
      .neq("sender_id", currentUserId)
      .is("read_at", null);

    if (error) {
      console.error("[MESSAGES] Could not mark conversation read:", error);
      return;
    }

    setMessages((prev) =>
      prev.map((message) =>
        message.sender_id !== currentUserId && !message.read_at
          ? { ...message, read_at: nowIso }
          : message,
      ),
    );

    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("type", "direct_message")
      .eq("article_slug", `/messages/${conversationId}`)
      .eq("user_id", currentUserId)
      .eq("is_read", false);

    window.dispatchEvent(
      new CustomEvent("bb:refresh-unread-messages", {
        detail: {
          conversationId,
          markRead: true,
        },
      }),
    );
  }

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

  useEffect(() => {
    if (!editingMessageId) return;
    editInputRef.current?.focus();
  }, [editingMessageId]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

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

      const { data: profiles } = await supabase
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url, member_badge, is_paid, last_active_at, current_streak")
        .in("user_id", [uid, otherId]);

      const profileRows = profiles || [];
      const myRow = profileRows.find((profile) => profile.user_id === uid) || null;
      const otherRow = profileRows.find((profile) => profile.user_id === otherId) || null;

      setMyProfile(
        myRow || {
          user_id: uid,
          display_name: null,
          username: null,
          profile_image_url: null,
          member_badge: null,
          is_paid: false,
          last_active_at: null,
          current_streak: null,
        },
      );

      setOtherUser(
        otherRow || {
          user_id: otherId,
          display_name: null,
          username: null,
          profile_image_url: null,
          member_badge: null,
          is_paid: false,
          last_active_at: null,
          current_streak: null,
        },
      );

      const { data: msgs } = await supabase
        .from("messages")
        .select("id, sender_id, content, read_at, created_at")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      setMessages(msgs || []);

      const { data: blockRows } = await supabase
        .from("buddy_blocks")
        .select("blocker_user_id, blocked_user_id")
        .or(`and(blocker_user_id.eq.${uid},blocked_user_id.eq.${otherId}),and(blocker_user_id.eq.${otherId},blocked_user_id.eq.${uid})`)
        .limit(1);

      setBlockState(blockRows?.[0] ?? null);

      const hadUnreadMessages = msgs ? msgs.some((message) => message.sender_id !== uid && !message.read_at) : false;

      if (hadUnreadMessages) {
        void markConversationAsRead(uid);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!userId) return;

    const currentUserId = userId;
    const channel = supabase
      .channel(`conversation:${conversationId}:${currentUserId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async () => {
          const { data: latestMessages, error } = await supabase
            .from("messages")
            .select("id, sender_id, content, read_at, created_at")
            .eq("conversation_id", conversationId)
            .order("created_at", { ascending: true });

          if (error) {
            console.error("[MESSAGES] Could not refresh conversation messages:", error);
            return;
          }

          setMessages(latestMessages || []);

          const hasUnreadIncoming = (latestMessages || []).some(
            (message) => message.sender_id !== currentUserId && !message.read_at,
          );

          if (hasUnreadIncoming) {
            await markConversationAsRead(currentUserId);
          }
        },
      )
      .subscribe();

    const focusRefresh = () => {
      void loadConversation(currentUserId);
    };

    window.addEventListener("focus", focusRefresh);

    return () => {
      window.removeEventListener("focus", focusRefresh);
      void supabase.removeChannel(channel);
    };
  }, [conversationId, userId]);

  async function handleSend() {
    if (!newMessage.trim() || !userId || sending || blockState) return;
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
        setMessages((prev) => prev.filter((message) => message.id !== optimisticMsg.id));
        setNewMessage(content);
        return;
      }

      setMessages((prev) => prev.map((message) => (message.id === optimisticMsg.id ? inserted : message)));

      await supabase
        .from("conversations")
        .update({
          last_message_at: inserted.created_at,
          last_message_preview: content.length > 80 ? `${content.slice(0, 80)}...` : content,
        })
        .eq("id", conversationId);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        void fetch("/api/messages/notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            conversationId,
            preview: content.length > 80 ? `${content.slice(0, 80)}...` : content,
          }),
        }).catch((error) => {
          console.warn("[MESSAGES] Could not create direct message notification:", error);
        });
      }

      window.dispatchEvent(new Event("bb:refresh-unread-messages"));
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  function handleComposerKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      void handleSend();
    }
  }

  function startEditingMessage(message: Message) {
    setEditingMessageId(message.id);
    setEditingContent(message.content);
  }

  function cancelEditingMessage() {
    setEditingMessageId(null);
    setEditingContent("");
  }

  async function handleSaveEdit() {
    if (!editingMessageId || !userId || savingEdit) return;
    const latestOwnMessageId =
      [...messages].reverse().find((message) => message.sender_id === userId)?.id ?? null;
    if (editingMessageId !== latestOwnMessageId) {
      cancelEditingMessage();
      return;
    }
    const trimmed = editingContent.trim();
    if (!trimmed) return;

    const originalMessage = messages.find((message) => message.id === editingMessageId);
    setSavingEdit(true);

    setMessages((prev) =>
      prev.map((message) =>
        message.id === editingMessageId
          ? {
              ...message,
              content: trimmed,
            }
          : message,
      ),
    );

    try {
      const { error } = await supabase
        .from("messages")
        .update({ content: trimmed })
        .eq("id", editingMessageId)
        .eq("sender_id", userId);

      if (error) {
        console.error("[MESSAGES] Edit error:", error);
        if (originalMessage) {
          setMessages((prev) =>
            prev.map((message) => (message.id === originalMessage.id ? originalMessage : message)),
          );
        }
        return;
      }

      await supabase
        .from("conversations")
        .update({
          last_message_preview: trimmed.length > 80 ? `${trimmed.slice(0, 80)}...` : trimmed,
        })
        .eq("id", conversationId);

      cancelEditingMessage();
    } finally {
      setSavingEdit(false);
    }
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      void handleSaveEdit();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      cancelEditingMessage();
    }
  }

  async function handleBlockBuddy() {
    if (!userId || !otherUser || blockingBuddy) return;
    setBlockingBuddy(true);

    try {
      const { error } = await supabase.from("buddy_blocks").upsert(
        {
          blocker_user_id: userId,
          blocked_user_id: otherUser.user_id,
          reason: "Blocked from messages",
        },
        { onConflict: "blocker_user_id,blocked_user_id" },
      );

      if (error) {
        console.error("[MESSAGES] Block buddy error:", error);
        return;
      }

      setBlockState({
        blocker_user_id: userId,
        blocked_user_id: otherUser.user_id,
      });
      setMenuOpen(false);
    } finally {
      setBlockingBuddy(false);
    }
  }

  async function handleSubmitReport() {
    if (!userId || !otherUser || !reportReason || submittingReport) return;
    setSubmittingReport(true);

    try {
      const { error } = await supabase.from("buddy_reports").insert({
        reporter_user_id: userId,
        reported_user_id: otherUser.user_id,
        conversation_id: conversationId,
        reason: reportReason,
      });

      if (error) {
        console.error("[MESSAGES] Report buddy error:", error);
        return;
      }

      setShowReportModal(false);
      setReportReason("");
      setMenuOpen(false);
    } finally {
      setSubmittingReport(false);
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
          <p className="mb-4 text-4xl">?</p>
          <h1 className="mb-2 text-xl font-bold text-gray-900">Conversation not found</h1>
          <Link href="/messages" className="text-sm text-blue-600 hover:underline">
            Back to Messages
          </Link>
        </div>
      </ModalShell>
    );
  }

  const otherDisplay = otherUser?.display_name || otherUser?.username || "Bible Buddy";
  const myDisplay = myProfile?.display_name || myProfile?.username || "You";
  const latestOwnMessageId =
    [...messages].reverse().find((message) => message.sender_id === userId)?.id ?? null;
  const latestSeenMessageId =
    [...messages].reverse().find((message) => message.sender_id === userId && message.read_at)?.id ?? null;
  const otherInitials = initialsFor(otherDisplay);
  const myInitials = initialsFor(myDisplay);
  const otherColor = otherUser ? avatarColor(otherUser.user_id) : "#4a9b6f";
  const myColor = userId ? avatarColor(userId) : "#5b8dd9";
  const blockedByMe = blockState?.blocker_user_id === userId;
  const blockedByThem = !!blockState && blockState.blocker_user_id !== userId;
  const composerNotice = blockedByMe
    ? "You blocked this buddy. Unblock them in the database or admin tools to message again."
    : blockedByThem
      ? "This buddy has blocked messages in this conversation."
      : null;

  return (
    <>
      <ModalShell isOpen={true} onClose={() => router.back()} backdropColor="bg-black/45" zIndex="z-[80]">
        <div className="mx-4 flex h-[84vh] w-full max-w-4xl flex-col overflow-hidden rounded-[32px] border border-gray-200 bg-[#f5f5f5] shadow-2xl">
          <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-5 py-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
              aria-label="Close conversation"
            >
              x
            </button>

            <Link
              href={`/profile/${otherUser?.user_id}`}
              className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-1 py-1 transition hover:bg-gray-50"
            >
              {otherUser?.profile_image_url ? (
                <img
                  src={otherUser.profile_image_url}
                  alt={otherDisplay}
                  className="h-12 w-12 flex-shrink-0 rounded-full object-cover ring-2 ring-white/10"
                />
              ) : (
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: otherColor }}
                >
                  {otherInitials}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-2">
                  <p className="truncate text-lg font-semibold text-gray-900">{otherDisplay}</p>
                  <StreakFlameBadge currentStreak={otherUser?.current_streak} />
                  <UserBadge customBadge={otherUser?.member_badge} isPaid={otherUser?.is_paid === true} />
                </div>
                <p className="truncate text-sm text-gray-500">
                  {otherUser?.username ? `@${otherUser.username} · ` : ""}
                  {formatHeaderStatus(otherUser?.last_active_at)}
                </p>
              </div>
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50"
                aria-label="Conversation options"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              </button>

              {menuOpen && otherUser && (
                <div className="absolute right-0 top-14 z-20 w-64 overflow-hidden rounded-3xl border border-gray-200 bg-white p-2 shadow-2xl">
                  <Link
                    href={`/profile/${otherUser.user_id}`}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                  >
                    View Buddy Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleBlockBuddy()}
                    disabled={blockingBuddy || !!blockedByMe}
                    className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {blockedByMe ? "Buddy Blocked" : blockingBuddy ? "Blocking..." : `Block ${otherDisplay}`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReportModal(true)}
                    className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                  >
                    Report {otherDisplay}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#f5f5f5] px-5 py-5">
            {messages.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-sm text-gray-400">No messages yet. Say hello!</p>
              </div>
            )}

            {messages.map((msg) => {
              const isMine = msg.sender_id === userId;
              const invite = parseGroupInvite(msg.content);
              const isEditing = editingMessageId === msg.id;
              const isSeen = msg.id === latestSeenMessageId;
              const canEdit = isMine && msg.id === latestOwnMessageId;
              const senderName = isMine ? myDisplay : otherDisplay;
              const senderImage = isMine ? myProfile?.profile_image_url : otherUser?.profile_image_url;
              const senderInitials = isMine ? myInitials : otherInitials;
              const senderColor = isMine ? myColor : otherColor;

              return (
                <div key={msg.id} className={`mb-5 flex ${isMine ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[86%] items-end gap-3 ${isMine ? "flex-row-reverse" : "flex-row"}`}>
                    {senderImage ? (
                      <img
                        src={senderImage}
                        alt={senderName}
                        className="h-10 w-10 flex-shrink-0 rounded-full object-cover ring-2 ring-white/10"
                      />
                    ) : (
                      <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: senderColor }}
                      >
                        {senderInitials}
                      </div>
                    )}

                    <div className={`flex min-w-0 flex-col gap-1 ${isMine ? "items-end" : "items-start"}`}>
                      <div className="px-1 text-xs font-semibold text-gray-700">{senderName}</div>

                      <div
                        className={`rounded-[24px] border px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          isMine
                            ? "rounded-br-md border-[#d8eadf] bg-[#eef7f1] text-gray-900"
                            : "rounded-bl-md border-gray-200 bg-white text-gray-900"
                        }`}
                      >
                        {isEditing ? (
                          <div className="space-y-3">
                            <textarea
                              ref={editInputRef}
                              value={editingContent}
                              onChange={(e) => setEditingContent(e.target.value)}
                              onKeyDown={handleEditKeyDown}
                              rows={3}
                              className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm leading-relaxed text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={cancelEditingMessage}
                                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 transition hover:bg-gray-200"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => void handleSaveEdit()}
                                disabled={!editingContent.trim() || savingEdit}
                                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2f6f4f] transition hover:bg-white/90 disabled:opacity-50"
                              >
                                {savingEdit ? "Saving..." : "Save"}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="whitespace-pre-wrap">{invite.body}</p>
                            {invite.href && (
                              <Link
                                href={invite.href}
                                className="mt-3 inline-flex rounded-2xl bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200"
                              >
                                Open Bible Study Group
                              </Link>
                            )}
                          </>
                        )}
                      </div>

                      <div className={`flex items-center gap-2 px-1 text-[11px] text-gray-400 ${isMine ? "justify-end" : "justify-start"}`}>
                        <span>{formatMsgTime(msg.created_at)}</span>
                        {canEdit && !isEditing && (
                          <button
                            type="button"
                            onClick={() => startEditingMessage(msg)}
                            className="font-medium text-gray-500 transition hover:text-gray-800"
                          >
                            Edit
                          </button>
                        )}
                        {isMine && isSeen && <span className="font-medium text-[#83e2a7]">Seen</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={bottomRef} />
          </div>

          <div className="border-t border-gray-200 bg-white px-5 py-4">
            {composerNotice ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {composerNotice}
              </div>
            ) : (
              <>
                <div className="mx-auto flex max-w-3xl items-end gap-3">
                  <textarea
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleComposerKeyDown}
                    placeholder={`Message ${otherDisplay}`}
                    rows={1}
                    className="max-h-36 flex-1 resize-none overflow-y-auto rounded-[24px] border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
                <p className="mt-2 text-center text-[10px] text-gray-400">Enter for new line | Ctrl+Enter to send</p>
              </>
            )}
          </div>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        backdropColor="bg-black/60"
        zIndex="z-[90]"
      >
        <div className="mx-4 w-full max-w-md rounded-[28px] border border-gray-200 bg-white px-6 py-6 text-gray-900 shadow-2xl">
          <h2 className="text-xl font-bold">Report Buddy</h2>
          <p className="mt-2 text-sm text-gray-500">Why are you reporting {otherDisplay}?</p>

          <div className="mt-5 space-y-2">
            {REPORT_REASONS.map((reason) => (
              <label
                key={reason}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  reportReason === reason
                    ? "border-[#4a9b6f] bg-[#eef7f1]"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="buddy-report-reason"
                  checked={reportReason === reason}
                  onChange={() => setReportReason(reason)}
                  className="h-4 w-4 accent-[#4a9b6f]"
                />
                <span>{reason}</span>
              </label>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setShowReportModal(false);
                setReportReason("");
              }}
              className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleSubmitReport()}
              disabled={!reportReason || submittingReport}
              className="flex-1 rounded-2xl bg-[#4a9b6f] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {submittingReport ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </div>
      </ModalShell>
    </>
  );
}
