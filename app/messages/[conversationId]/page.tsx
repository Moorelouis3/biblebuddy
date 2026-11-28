"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import { ModalShell } from "../../../components/ModalShell";
import UserBadge from "../../../components/UserBadge";
import StreakFlameBadge from "../../../components/StreakFlameBadge";
import { getDirectMessagePresentation, isMissingDirectMessageActionColumnError } from "../../../lib/directMessageActions";
import MentionText from "../../../components/MentionText";
import { BLOCKS_CHANGED_EVENT, unblockUser } from "../../../lib/userBlocks";

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

/**
 * A chat reads as runs of bubbles with the time said once, between runs,
 * the way every DM app does it (Louis, 2026-11-28: "make it more like social
 * media DMs, it feels old"). A new time line appears when the day changes or
 * more than an hour has gone by.
 */
function needsTimeBreak(previous: string | null, current: string): boolean {
  if (!previous) return true;
  const a = new Date(previous);
  const b = new Date(current);
  return a.toDateString() !== b.toDateString() || b.getTime() - a.getTime() > 60 * 60 * 1000;
}

function formatSeparator(dateStr: string): string {
  const date = new Date(dateStr);
  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const days = Math.round((startOfToday.getTime() - new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()) / 86400000);
  if (days <= 0) return time;
  if (days === 1) return `Yesterday ${time}`;
  if (days < 7) return `${date.toLocaleDateString("en-US", { weekday: "short" })} ${time}`;
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return `${date.toLocaleDateString("en-US", sameYear ? { month: "short", day: "numeric" } : { month: "short", day: "numeric", year: "numeric" })}, ${time}`;
}

function formatHeaderStatus(lastActiveAt?: string | null): string {
  if (!lastActiveAt) return "Buddy";
  const date = new Date(lastActiveAt);
  return `Active ${formatMsgTime(date.toISOString())}`;
}

type InlineMessageSegment =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

/**
 * **bold**, in a direct message.
 *
 * Links already worked here - [Label](/path) becomes a button and a bare URL
 * becomes a link - but bold printed its own asterisks, so a message written
 * with emphasis arrived looking like it had been typed wrong. Louis writes
 * the group's posts with headings and emphasis and expects a DM to carry the
 * same weight.
 *
 * Only ** **, and only within a line. Nothing else here is markdown, and a
 * DM is somewhere people paste things: anything cleverer would start eating
 * punctuation that somebody meant literally.
 */
function splitBold(text: string): Array<{ bold: boolean; value: string }> {
  const parts: Array<{ bold: boolean; value: string }> = [];
  const pattern = /\*\*([^*\n]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push({ bold: false, value: text.slice(lastIndex, match.index) });
    parts.push({ bold: true, value: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) parts.push({ bold: false, value: text.slice(lastIndex) });
  return parts;
}

function splitInlineMessageLinks(text: string): InlineMessageSegment[] {
  const segments: InlineMessageSegment[] = [];
  const pattern = /\[([^\]]+)\]\((\/[^)\s]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    segments.push({ type: "link", label: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }

  return segments;
}

function parseQuickActionLine(line: string): { label: string; href: string } | null {
  const match = line.match(/^\s*Quick Action:\s*(.+?)\|(\S.*)\s*$/i);
  if (!match) return null;
  return { label: match[1], href: match[2] };
}

function parseLegacyActionButtonLine(line: string): { label: string; href: string } | null {
  const match = line.match(/^\s*Action Button:\s*(.+?)\|(\S.*)\s*$/i);
  if (!match) return null;
  return { label: match[1], href: match[2] };
}

function isWeeklyReportHeader(line: string): boolean {
  const normalized = line.replace(/[^\p{L}\p{N}]+/gu, "").toLowerCase();
  return [
    "yourweek",
    "whyitmatters",
    "nextsteps",
    "quickactions",
    "weeklybiblereport",
  ].includes(normalized);
}

function isQuickActionsHeader(line: string): boolean {
  return line.replace(/[^\p{L}\p{N}]+/gu, "").toLowerCase() === "quickactions";
}

interface Message {
  id: string;
  sender_id: string;
  content: string;
  image_url?: string | null;
  action_label?: string | null;
  action_href?: string | null;
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
  selected_streak_flame?: string | null;
}

interface BlockState {
  blocker_user_id: string;
  blocked_user_id: string;
}

type MessageRowWithoutActions = Omit<Message, "action_label" | "action_href">;

export default function ConversationPage({
  externalId,
  onExternalClose,
}: {
  externalId?: string;
  onExternalClose?: () => void;
} = {}) {
  const params = useParams();
  const router = useRouter();
  const conversationId = (externalId ?? params?.conversationId) as string;

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
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<{ file: File; url: string } | null>(null);
  /** The rest of a multi-photo pick, sent one after the other. */
  const [photoQueue, setPhotoQueue] = useState<Array<{ file: File; url: string }>>([]);
  const photoQueueRef = useRef<Array<{ file: File; url: string }>>([]);
  const [expandedImageUrl, setExpandedImageUrl] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const firstScroll = useRef(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const editInputRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  function handleActionNavigation(href: string) {
    onExternalClose?.();
    router.push(href);
  }

  async function markConversationAsRead(currentUserId: string) {
    const nowIso = new Date().toISOString();

    // 1. Optimistically update local message state so "Seen" ticks appear immediately
    setMessages((prev) =>
      prev.map((message) =>
        message.sender_id !== currentUserId && !message.read_at
          ? { ...message, read_at: nowIso }
          : message,
      ),
    );

    // 2. Immediately tell AppShell to clear the badge/dot — don't block on the DB call
    window.dispatchEvent(
      new CustomEvent("bb:refresh-unread-messages", {
        detail: { conversationId, markRead: true },
      }),
    );

    // 3. Server-side update via service role so RLS never blocks it
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      fetch("/api/messages/mark-read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ conversationId }),
      }).catch((err) => {
        console.warn("[MESSAGES] Could not mark messages as read via API:", err);
      });
    }
  }

  useEffect(() => {
    async function init() {
      // The session is already on the phone; getUser() would be a round trip
      // before the first message could even be asked for.
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;

      if (!user) {
        router.push("/login");
        return;
      }

      firstScroll.current = true;
      setUserId(user.id);
      await loadConversation(user.id);
    }

    void init();
  }, [conversationId, router]);

  // Open at the newest message, already there; only later messages glide in.
  useEffect(() => {
    if (loading || messages.length === 0) return;
    bottomRef.current?.scrollIntoView({ behavior: firstScroll.current ? "auto" : "smooth" });
    firstScroll.current = false;
  }, [messages, loading]);

  // The composer grows with what is typed, up to a few lines.
  useEffect(() => {
    const box = inputRef.current;
    if (!box) return;
    box.style.height = "auto";
    box.style.height = `${Math.min(box.scrollHeight, 132)}px`;
  }, [newMessage, loading]);

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

  /**
   * Opening a chat. It used to ask for five things one after the other (who
   * am I, the thread, both profiles, the messages, blocks) and showed nothing
   * until the last had answered. Now the thread and its messages are asked
   * for together and shown the moment they land; the name, the face and the
   * block state fill in behind them.
   */
  async function loadConversation(uid: string) {
    setLoading(true);
    setOtherUser(null);
    try {
      const [{ data: convo }, msgs] = await Promise.all([
        supabase
          .from("conversations")
          .select("id, user_id_1, user_id_2, last_message_preview, last_message_at")
          .eq("id", conversationId)
          .maybeSingle(),
        fetchConversationMessages(conversationId),
      ]);

      if (!convo || (convo.user_id_1 !== uid && convo.user_id_2 !== uid)) {
        setNotFound(true);
        return;
      }

      const otherId = convo.user_id_1 === uid ? convo.user_id_2 : convo.user_id_1;

      const normalizedMessages =
        msgs.length === 0 && convo.last_message_preview
          ? [
              {
                id: `preview-${conversationId}`,
                sender_id: otherId,
                content: convo.last_message_preview,
                image_url: null,
                action_label: null,
                action_href: null,
                read_at: null,
                created_at: convo.last_message_at || new Date().toISOString(),
              },
            ]
          : msgs;

      setMessages(normalizedMessages);
      setLoading(false);

      const [{ data: profiles }, { data: blockRows }] = await Promise.all([
        supabase
          .from("profile_stats")
          .select("user_id, display_name, username, profile_image_url, member_badge, is_paid, last_active_at, current_streak, selected_streak_flame")
          .in("user_id", otherId ? [uid, otherId] : [uid]),
        otherId
          ? supabase
              .from("buddy_blocks")
              .select("blocker_user_id, blocked_user_id")
              .or(`and(blocker_user_id.eq.${uid},blocked_user_id.eq.${otherId}),and(blocker_user_id.eq.${otherId},blocked_user_id.eq.${uid})`)
              .limit(1)
          : Promise.resolve({ data: null }),
      ]);

      const profileRows = profiles || [];
      const myRow = profileRows.find((profile) => profile.user_id === uid) || null;
      const otherRow = profileRows.find((profile) => profile.user_id === otherId) || null;
      const blank = {
        username: null,
        profile_image_url: null,
        member_badge: null,
        is_paid: false,
        last_active_at: null,
        current_streak: null,
        selected_streak_flame: null,
      };

      setMyProfile(myRow || { ...blank, user_id: uid, display_name: null });
      setOtherUser(otherRow || { ...blank, user_id: otherId ?? "", display_name: otherId ? null : "Deleted account" });
      setBlockState(blockRows?.[0] ?? null);

      const hadUnreadMessages = msgs.some((message) => message.sender_id !== uid && !message.read_at);

      if (hadUnreadMessages) {
        void markConversationAsRead(uid);
      } else {
        // Even when there's nothing to mark read, tell AppShell to re-sync its badge/dot state
        window.dispatchEvent(
          new CustomEvent("bb:refresh-unread-messages", {
            detail: { conversationId, markRead: true },
          }),
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function normalizeMessagesWithoutActions(rows: MessageRowWithoutActions[] | null | undefined): Message[] {
    return (rows || []).map((row) => ({
      ...row,
      action_label: null,
      action_href: null,
    }));
  }

  async function fetchConversationMessages(currentConversationId: string): Promise<Message[]> {
    const withActions = await supabase
      .from("messages")
      .select("id, sender_id, content, image_url, action_label, action_href, read_at, created_at")
      .eq("conversation_id", currentConversationId)
      .order("created_at", { ascending: true });

    if (!withActions.error) {
      return withActions.data || [];
    }

    if (!isMissingDirectMessageActionColumnError(withActions.error)) {
      console.error("[MESSAGES] Could not load conversation messages:", withActions.error);
      return [];
    }

    const fallback = await supabase
      .from("messages")
      .select("id, sender_id, content, image_url, read_at, created_at")
      .eq("conversation_id", currentConversationId)
      .order("created_at", { ascending: true });

    if (fallback.error) {
      console.error("[MESSAGES] Could not load conversation messages with fallback:", fallback.error);
      return [];
    }

    return normalizeMessagesWithoutActions(fallback.data);
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
          const latestMessages = await fetchConversationMessages(conversationId);
          setMessages(latestMessages);

          const hasUnreadIncoming = (latestMessages || []).some(
            (message) => message.sender_id !== currentUserId && !message.read_at,
          );

          if (hasUnreadIncoming) {
            await markConversationAsRead(currentUserId);
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [conversationId, userId]);

  async function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    // Every photo picked, not just the first (Louis, 2026-10-17: "I can only
    // upload one pic at a time"). They go as separate messages, in order, the
    // way every other messaging app sends them.
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0 || !userId || blockState) return;
    const picked = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
    setPhotoPreview(picked[0]);
    setPhotoQueue(picked.slice(1));
    photoQueueRef.current = picked.slice(1);
    // Reset file input so same file can be selected again
    e.target.value = "";
    inputRef.current?.focus();
  }

  async function handleSendPhoto(item?: { file: File; url: string }) {
    const pending = item ?? photoPreview;
    if (!pending || !userId || blockState) return;
    if (!item && uploadingPhoto) return;
    setUploadingPhoto(true);
    const { file } = pending;
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `dm-photos/${conversationId}/${userId}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("post-media").upload(path, file, { upsert: false });
    if (uploadError) {
      console.error("[DM PHOTO] Upload failed:", uploadError);
      setUploadingPhoto(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("post-media").getPublicUrl(path);
    const imageUrl = urlData?.publicUrl ?? null;
    URL.revokeObjectURL(pending.url);
    setPhotoPreview(null);

    const optimisticMsg: Message = {
      id: `temp-photo-${Date.now()}`,
      sender_id: userId,
      content: "",
      image_url: imageUrl,
      action_label: null,
      action_href: null,
      read_at: null,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    const { data: inserted, error } = await supabase
      .from("messages")
      .insert({ conversation_id: conversationId, sender_id: userId, content: "", image_url: imageUrl })
      .select("id, sender_id, content, image_url, read_at, created_at")
      .single();

    if (error) {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id));
    } else {
      const normalizedInserted: Message = { ...inserted, action_label: null, action_href: null };
      setMessages((prev) => prev.map((m) => (m.id === optimisticMsg.id ? normalizedInserted : m)));
      await supabase.from("conversations").update({ last_message_at: inserted.created_at, last_message_preview: "📷 Photo" }).eq("id", conversationId);
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
            preview: "Photo",
          }),
        }).catch((notifyError) => {
          console.warn("[MESSAGES] Could not create direct message photo notification:", notifyError);
        });
      }
      window.dispatchEvent(new Event("bb:refresh-unread-messages"));
    }
    setUploadingPhoto(false);

    // Next photo of the same pick, if there is one.
    const [next, ...rest] = photoQueueRef.current;
    if (next) {
      photoQueueRef.current = rest;
      setPhotoQueue(rest);
      await handleSendPhoto(next);
    }
  }

  async function handleSend() {
    const photoState = photoPreview;
    const content = newMessage.trim();
    if ((!content && !photoState) || !userId || sending || uploadingPhoto || blockState) return;

    if (content) setNewMessage("");
    if (photoState) {
      setPhotoPreview(null);
      setUploadingPhoto(true);
    }
    setSending(true);

    const optimisticMsg: Message = {
      id: `temp-${Date.now()}`,
      sender_id: userId,
      content,
      image_url: photoState?.url ?? null,
      read_at: null,
      action_label: null,
      action_href: null,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Missing session.");
      }

      const formData = new FormData();
      formData.append("conversationId", conversationId);
      formData.append("content", content);
      if (photoState) {
        formData.append("photo", photoState.file);
      }

      const response = await fetch("/api/messages/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.message) {
        console.error("[MESSAGES] Send error:", payload);
        setMessages((prev) => prev.filter((message) => message.id !== optimisticMsg.id));
        setNewMessage(content);
        if (photoState) setPhotoPreview(photoState);
        return;
      }

      const normalizedInserted: Message = payload.message as Message;
      setMessages((prev) => prev.map((message) => (message.id === optimisticMsg.id ? normalizedInserted : message)));

      const previewText = typeof payload?.preview === "string" && payload.preview.trim().length > 0 ? payload.preview : "Photo";

      if (session?.access_token) {
        void fetch("/api/messages/notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            conversationId,
            preview: previewText,
          }),
        }).catch((error) => {
          console.warn("[MESSAGES] Could not create direct message notification:", error);
        });
      }

      window.dispatchEvent(new Event("bb:refresh-unread-messages"));
      if (photoState) {
        URL.revokeObjectURL(photoState.url);
      }
    } catch (error) {
      console.error("[MESSAGES] Send failed:", error);
      setMessages((prev) => prev.filter((message) => message.id !== optimisticMsg.id));
      setNewMessage(content);
      if (photoState) setPhotoPreview(photoState);
    } finally {
      setSending(false);
      setUploadingPhoto(false);
      inputRef.current?.focus();
    }
  }

  function handleComposerKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
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
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch("/api/messages/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          messageId: editingMessageId,
          content: trimmed,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "Could not edit message.");
      }

      cancelEditingMessage();
      window.dispatchEvent(new Event("bb:refresh-unread-messages"));
    } catch (error) {
      console.error("[MESSAGES] Edit error:", error);
      if (originalMessage) {
        setMessages((prev) =>
          prev.map((message) => (message.id === originalMessage.id ? originalMessage : message)),
        );
      }
    } finally {
      setSavingEdit(false);
    }
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
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
      window.dispatchEvent(new Event(BLOCKS_CHANGED_EVENT));
    } finally {
      setBlockingBuddy(false);
    }
  }

  async function handleUnblockBuddy() {
    if (!userId || !otherUser || blockingBuddy) return;
    setBlockingBuddy(true);

    try {
      const result = await unblockUser(otherUser.user_id);
      if (!result.ok) return;
      setBlockState(null);
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
      <ModalShell isOpen={true} onClose={() => onExternalClose ? onExternalClose() : router.back()} backdropColor="bg-black/45" zIndex="z-[80]">
        <div
          aria-busy="true"
          aria-label="Loading conversation"
          className="flex h-[calc(100dvh-max(2rem,env(safe-area-inset-top,0px)+env(safe-area-inset-bottom,0px)))] w-screen flex-col justify-end gap-2 bg-[var(--bb-card,#ffffff)] px-4 pb-24 sm:mx-4 sm:h-[84vh] sm:w-full sm:max-w-xl sm:rounded-[28px] sm:shadow-2xl"
        >
          {["w-40 self-start", "w-56 self-start", "w-32 self-end", "w-48 self-start", "w-44 self-end"].map((shape, index) => (
            <div key={index} className={`h-9 animate-pulse rounded-[20px] bg-[var(--bb-surface-soft,#eef0f3)] ${shape}`} />
          ))}
        </div>
      </ModalShell>
    );
  }

  if (notFound) {
    return (
      <ModalShell isOpen={true} onClose={() => onExternalClose ? onExternalClose() : router.back()} backdropColor="bg-black/45" zIndex="z-[80]">
        <div className="h-[calc(100dvh-max(2rem,env(safe-area-inset-top,0px)+env(safe-area-inset-bottom,0px)))] w-screen bg-[var(--bb-card,#ffffff)] px-6 py-12 text-center text-[var(--bb-text-primary,#1f2937)] sm:mx-4 sm:h-auto sm:w-full sm:max-w-md sm:rounded-[28px] sm:shadow-2xl">
          <p className="mb-4 text-4xl">?</p>
          <h1 className="mb-2 text-xl font-bold">Conversation not found</h1>
          <Link href="/messages" className="text-sm font-semibold text-[var(--bb-accent,#2563eb)] hover:underline">
            Back to Messages
          </Link>
        </div>
      </ModalShell>
    );
  }

  const otherDisplay = otherUser ? otherUser.display_name || otherUser.username || "Bible Buddy" : "";
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
  const otherAccountDeleted = !loading && !!otherUser && !otherUser.user_id;
  const composerNotice = otherAccountDeleted
    ? "This account was deleted. You can read your conversation, but you can’t reply."
    : blockedByMe
    ? "You blocked this buddy. Unblock them to message again."
    : blockedByThem
      ? "This buddy has blocked messages in this conversation."
      : null;

  return (
    <>
      <ModalShell isOpen={true} onClose={() => onExternalClose ? onExternalClose() : router.back()} backdropColor="bg-black/45" zIndex="z-[80]">
        <div className="flex h-[calc(100dvh-max(2rem,env(safe-area-inset-top,0px)+env(safe-area-inset-bottom,0px)))] w-screen flex-col overflow-hidden bg-[var(--bb-card,#ffffff)] text-[var(--bb-text-primary,#1f2937)] sm:mx-4 sm:h-[84vh] sm:w-full sm:max-w-xl sm:rounded-[28px] sm:border sm:border-[var(--bb-card-border,#e5e7eb)] sm:shadow-2xl">
          <div className="flex items-center gap-1 border-b border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] px-2 py-2">
            <button
              type="button"
              onClick={() => onExternalClose ? onExternalClose() : router.back()}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[var(--bb-text-primary,#111827)] transition active:opacity-60"
              aria-label="Back"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <Link
              href={otherUser?.user_id ? `/profile/${otherUser.user_id}` : "/messages"}
              className="flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl py-1 pr-1"
            >
              {otherUser?.profile_image_url ? (
                <img src={otherUser.profile_image_url} alt="" className="h-9 w-9 flex-shrink-0 rounded-full object-cover" />
              ) : (
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: otherUser ? otherColor : "var(--bb-surface-soft,#eef0f3)" }}
                >
                  {otherInitials}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-1.5">
                  <p className="truncate text-[16px] font-bold leading-tight text-[var(--bb-text-primary,#111827)]">{otherDisplay}</p>
                  <StreakFlameBadge currentStreak={otherUser?.current_streak} flameId={otherUser?.selected_streak_flame} />
                  <UserBadge customBadge={otherUser?.member_badge} isPaid={otherUser?.is_paid === true} />
                </div>
                {otherUser && (otherUser.username || otherUser.last_active_at) ? (
                  <p className="truncate text-[12px] leading-tight text-[var(--bb-text-secondary,#6b7280)]">
                    {otherUser.last_active_at ? formatHeaderStatus(otherUser.last_active_at) : `@${otherUser.username}`}
                  </p>
                ) : null}
              </div>
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--bb-text-primary,#374151)] transition hover:bg-[var(--bb-surface-soft,#f3f4f6)]"
                aria-label="Conversation options"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              </button>

              {menuOpen && otherUser && (
                <div className="absolute right-0 top-11 z-20 w-64 overflow-hidden rounded-3xl border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] p-2 shadow-2xl">
                  <Link
                    href={`/profile/${otherUser.user_id}`}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-surface-soft,#f3f4f6)]"
                  >
                    View Buddy Profile
                  </Link>
                  {blockedByMe ? (
                    <button
                      type="button"
                      onClick={() => void handleUnblockBuddy()}
                      disabled={blockingBuddy}
                      className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-surface-soft,#f3f4f6)] disabled:opacity-50"
                    >
                      {blockingBuddy ? "Unblocking..." : `Unblock ${otherDisplay}`}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => void handleBlockBuddy()}
                      disabled={blockingBuddy}
                      className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {blockingBuddy ? "Blocking..." : `Block ${otherDisplay}`}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowReportModal(true)}
                    className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-surface-soft,#f3f4f6)]"
                  >
                    Report {otherDisplay}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[var(--bb-card,#ffffff)] px-3 pb-3 pt-2">
            {messages.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-sm text-[var(--bb-text-muted,#9ca3af)]">No messages yet. Say hello!</p>
              </div>
            )}

            {messages.map((msg, index) => {
              const isMine = msg.sender_id === userId;
              const presentation = getDirectMessagePresentation(
                msg.content,
                msg.action_label,
                msg.action_href,
              );
              const rawInlineActions = msg.content
                .split(/\r?\n/)
                .map((line) => parseQuickActionLine(line) ?? parseLegacyActionButtonLine(line))
                .filter((action): action is { label: string; href: string } => !!action);
              const messageActions = [...presentation.actions, ...rawInlineActions].filter(
                (action, actionIndex, array) =>
                  array.findIndex((candidate) => candidate.label === action.label && candidate.href === action.href) === actionIndex,
              );
              const bodyLines = presentation.body.split(/\r?\n/);
              const shouldInlineActionsUnderHeader = bodyLines.some((line) => isQuickActionsHeader(line)) && messageActions.length > 0;
              const shouldInlineActionsBeforeSignature =
                !shouldInlineActionsUnderHeader &&
                messageActions.length > 0 &&
                bodyLines.some((line) => line.trim().toLowerCase() === "keep going.");
              const isEditing = editingMessageId === msg.id;
              const isSeen = msg.id === latestSeenMessageId;
              const canEdit = isMine && msg.id === latestOwnMessageId;

              // Where this bubble sits in its run: a run is one person's
              // messages in a row with no time line between them.
              const previous = index > 0 ? messages[index - 1] : null;
              const next = index < messages.length - 1 ? messages[index + 1] : null;
              const showTime = needsTimeBreak(previous?.created_at ?? null, msg.created_at);
              const firstOfRun = showTime || previous?.sender_id !== msg.sender_id;
              const lastOfRun = !next || next.sender_id !== msg.sender_id || needsTimeBreak(msg.created_at, next.created_at);
              const isPhoto = Boolean(msg.image_url) && !isEditing;
              // My bubble is the solid brand colour; while I am editing it turns plain so the box reads.
              const solid = isMine && !isEditing;
              const corner = isMine
                ? `${firstOfRun ? "" : "rounded-tr-[6px]"} ${lastOfRun ? "" : "rounded-br-[6px]"}`
                : `${firstOfRun ? "" : "rounded-tl-[6px]"} ${lastOfRun ? "" : "rounded-bl-[6px]"}`;
              const actionClass = `inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition hover:opacity-85 ${
                solid ? "bg-white" : "border border-[var(--bb-card-border,#d8eadf)] bg-[var(--bb-card,#ffffff)]"
              }`;
              const actionStyle = { color: solid ? "var(--bb-button,#0056FD)" : "var(--bb-accent,#2f6f4f)" };
              const linkClass = "font-semibold underline underline-offset-2";
              const linkStyle = solid ? { color: "inherit" } : { color: "var(--bb-accent,#8d5d38)" };

              return (
                <div key={msg.id}>
                  {showTime ? (
                    <p className="pb-2 pt-4 text-center text-[11px] font-semibold text-[var(--bb-text-muted,#9ca3af)]">{formatSeparator(msg.created_at)}</p>
                  ) : null}
                  <div className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"} ${firstOfRun && !showTime ? "mt-3" : "mt-[3px]"}`}>
                    {isMine ? null : lastOfRun ? (
                      otherUser?.profile_image_url ? (
                        <img src={otherUser.profile_image_url} alt="" className="h-7 w-7 flex-shrink-0 rounded-full object-cover" />
                      ) : (
                        <div
                          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ backgroundColor: otherColor }}
                        >
                          {otherInitials}
                        </div>
                      )
                    ) : (
                      <div className="w-7 flex-shrink-0" aria-hidden="true" />
                    )}

                    <div className={`flex min-w-0 max-w-[78%] flex-col ${isMine ? "items-end" : "items-start"}`}>
                      <div
                        className={
                          isPhoto
                            ? `overflow-hidden rounded-[20px] border border-[var(--bb-card-border,#e5e7eb)] ${corner}`
                            : `rounded-[20px] px-3.5 py-2 text-[15px] leading-snug ${corner} ${
                                solid ? "" : "border border-[var(--bb-card-border,#e5e7eb)] text-[var(--bb-text-primary,#111827)]"
                              }`
                        }
                        style={
                          isPhoto
                            ? undefined
                            : solid
                              ? { backgroundColor: "var(--bb-button,#0056FD)", color: "var(--bb-button-text,#ffffff)" }
                              : { backgroundColor: isMine ? "var(--bb-card,#ffffff)" : "var(--bb-surface-soft,#eff1f3)" }
                        }
                      >
                        {isEditing ? (
                          <div className="space-y-3">
                            <textarea
                              ref={editInputRef}
                              value={editingContent}
                              onChange={(e) => setEditingContent(e.target.value)}
                              onKeyDown={handleEditKeyDown}
                              rows={3}
                              className="w-full resize-none rounded-2xl border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] px-3 py-2 text-sm leading-relaxed text-[var(--bb-text-primary,#111827)] placeholder-[var(--bb-text-muted,#9ca3af)] focus:outline-none focus:ring-2 focus:ring-[var(--bb-accent,#d62828)]"
                            />
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={cancelEditingMessage}
                                className="rounded-full bg-[var(--bb-surface-soft,#f3f4f6)] px-3 py-1 text-xs font-semibold text-[var(--bb-text-secondary,#374151)] transition hover:opacity-85"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => void handleSaveEdit()}
                                disabled={!editingContent.trim() || savingEdit}
                                className="rounded-full bg-[var(--bb-card,#ffffff)] px-3 py-1 text-xs font-semibold text-[var(--bb-accent,#2f6f4f)] transition hover:opacity-90 disabled:opacity-50"
                              >
                                {savingEdit ? "Saving..." : "Save"}
                              </button>
                            </div>
                          </div>
                        ) : msg.image_url ? (
                          <>
                          <button
                            type="button"
                            onClick={() => setExpandedImageUrl(msg.image_url || null)}
                            className="block text-left transition hover:opacity-95 focus:outline-none"
                            aria-label="Open shared photo"
                          >
                            <img
                              src={msg.image_url}
                              alt="Shared photo"
                              className="block max-w-full bg-[var(--bb-surface-soft,#eff1f3)] object-cover"
                              style={{ maxHeight: 320, minHeight: 120, width: 240 }}
                            />
                          </button>
                          {/* A photo sent with words keeps its words. */}
                          {msg.content.trim() ? (
                            <p
                              className="whitespace-pre-wrap px-3.5 py-2 text-[15px] leading-snug"
                              style={
                                solid
                                  ? { width: 240, backgroundColor: "var(--bb-button,#0056FD)", color: "var(--bb-button-text,#ffffff)" }
                                  : { width: 240, backgroundColor: "var(--bb-surface-soft,#eff1f3)", color: "var(--bb-text-primary,#111827)" }
                              }
                            >
                              {msg.content}
                            </p>
                          ) : null}
                          </>
                        ) : (
                          <>
                            <div className="whitespace-pre-wrap">
                              {bodyLines.map((line, lineIndex) => {
                                const quickAction = parseQuickActionLine(line);
                                const legacyActionButton = parseLegacyActionButtonLine(line);
                                const previousLine = lineIndex > 0 ? bodyLines[lineIndex - 1] : null;

                                if (line.trim() === "") {
                                  if (previousLine && isWeeklyReportHeader(previousLine)) {
                                    return null;
                                  }
                                  return (
                                    <div
                                      key={`msg-blank:${msg.id}:${lineIndex}`}
                                      aria-hidden="true"
                                      className="h-3"
                                    />
                                  );
                                }

                                if (quickAction || legacyActionButton) {
                                  return null;
                                }

                                const isKeepGoingLine = line.trim().toLowerCase() === "keep going.";
                                const shouldInsertButtonsHere = shouldInlineActionsBeforeSignature && isKeepGoingLine;

                                if (isQuickActionsHeader(line) && messageActions.length > 0) {
                                  return (
                                    <div key={`msg-actions:${msg.id}:${lineIndex}`} className="mt-2 flex flex-wrap gap-2">
                                      {messageActions.map((action, index) => (
                                        <button
                                          key={`${action.label}-${action.href}-${index}`}
                                          type="button"
                                          onClick={() => handleActionNavigation(action.href)}
                                          className={actionClass}
                                          style={actionStyle}
                                        >
                                          {action.label}
                                        </button>
                                      ))}
                                    </div>
                                  );
                                }

                                return (
                                  <div key={`msg-line:${msg.id}:${lineIndex}`}>
                                    {shouldInsertButtonsHere && (
                                      <div className="mb-3 flex flex-wrap gap-2">
                                        {messageActions.map((action, index) => (
                                          <button
                                            key={`${action.label}-${action.href}-${index}`}
                                            type="button"
                                            onClick={() => handleActionNavigation(action.href)}
                                            className={actionClass}
                                          style={actionStyle}
                                          >
                                            {action.label}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                    <div className={isWeeklyReportHeader(line) ? "mt-3 mb-2 font-black tracking-[0.14em]" : ""}>
                                      {splitInlineMessageLinks(line).map((segment, segmentIndex) =>
                                        segment.type === "link" ? (
                                          <button
                                            key={`msg-link:${msg.id}:${lineIndex}:${segmentIndex}`}
                                            type="button"
                                            onClick={() => handleActionNavigation(segment.href)}
                                            className={linkClass}
                                            style={linkStyle}
                                          >
                                            {segment.label}
                                          </button>
                                        ) : (
                                          splitBold(segment.value).map((part, partIndex) =>
                                            part.bold ? (
                                              <strong
                                                key={`msg-bold:${msg.id}:${lineIndex}:${segmentIndex}:${partIndex}`}
                                                className="font-black"
                                              >
                                                {part.value}
                                              </strong>
                                            ) : (
                                              <MentionText
                                                key={`msg-text:${msg.id}:${lineIndex}:${segmentIndex}:${partIndex}`}
                                                text={part.value}
                                                items={[]}
                                                enableUrlLinks
                                              />
                                            ),
                                          )
                                        ),
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            {messageActions.length > 0 && !shouldInlineActionsUnderHeader && !shouldInlineActionsBeforeSignature && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {messageActions.map((action, index) => (
                                  <button
                                    key={`${action.label}-${action.href}-${index}`}
                                    type="button"
                                    onClick={() => handleActionNavigation(action.href)}
                                    className={actionClass}
                                          style={actionStyle}
                                  >
                                    {action.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {(canEdit && !isEditing) || (isMine && isSeen) ? (
                        <div className="mt-1 flex items-center justify-end gap-2 px-1 text-[11px] text-[var(--bb-text-muted,#9ca3af)]">
                          {canEdit && !isEditing && !msg.image_url && (
                            <button
                              type="button"
                              onClick={() => startEditingMessage(msg)}
                              className="font-semibold text-[var(--bb-text-secondary,#6b7280)] transition hover:text-[var(--bb-text-primary,#1f2937)]"
                            >
                              Edit
                            </button>
                          )}
                          {isMine && isSeen && <span className="font-semibold">Seen</span>}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={bottomRef} />
          </div>

          <div className="bg-[var(--bb-card,#ffffff)] px-3 pb-3 pt-1.5">
            {composerNotice ? (
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <span>{composerNotice}</span>
                {blockedByMe && (
                  <button
                    type="button"
                    onClick={() => void handleUnblockBuddy()}
                    disabled={blockingBuddy}
                    className="flex-shrink-0 rounded-full border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    {blockingBuddy ? "Unblocking..." : "Unblock"}
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Photo preview */}
                {photoPreview && (
                  <div className="mb-3 flex items-start gap-3">
                    <div className="relative">
                      <img src={photoPreview.url} alt="Photo preview" className="h-24 w-24 rounded-2xl object-cover border border-[var(--bb-card-border,#e5e7eb)]" />
                      {photoQueue.length > 0 ? (
                        <span className="absolute -bottom-1 -left-1 rounded-full bg-[var(--bb-accent,#2f7fe8)] px-2 py-0.5 text-[11px] font-black text-white shadow">
                          +{photoQueue.length} more
                        </span>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => { URL.revokeObjectURL(photoPreview.url); photoQueue.forEach((q) => URL.revokeObjectURL(q.url)); setPhotoPreview(null); setPhotoQueue([]); photoQueueRef.current = []; }}
                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-white text-xs font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex items-end gap-1 rounded-[26px] border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-surface-soft,#f1f2f4)] p-1">
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoSelect}
                  />
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    disabled={!!blockState}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[var(--bb-text-secondary,#6b7280)] transition active:opacity-60 disabled:opacity-40"
                    aria-label="Send a photo"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <textarea
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleComposerKeyDown}
                    placeholder="Message..."
                    aria-label={otherDisplay ? `Message ${otherDisplay}` : "Message"}
                    rows={1}
                    className="min-w-0 flex-1 resize-none self-center overflow-y-auto border-0 bg-transparent px-1 py-2 text-[16px] leading-snug text-[var(--bb-text-primary,#111827)] placeholder-[var(--bb-text-muted,#9ca3af)] outline-none focus:outline-none focus:ring-0"
                  />
                  {newMessage.trim() || photoPreview ? (
                    <button
                      type="button"
                      onClick={() => void handleSend()}
                      disabled={sending || uploadingPhoto}
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition active:opacity-80 disabled:opacity-50"
                      style={{ backgroundColor: "var(--bb-button,#0056FD)", color: "var(--bb-button-text,#ffffff)" }}
                      aria-label="Send"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.6} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
                      </svg>
                    </button>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={Boolean(expandedImageUrl)}
        onClose={() => setExpandedImageUrl(null)}
        backdropColor="bg-black/85"
        zIndex="z-[100]"
      >
        <div className="relative mx-2 flex max-h-[92vh] w-full max-w-5xl items-center justify-center">
          <button
            type="button"
            onClick={() => setExpandedImageUrl(null)}
            className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-3xl leading-none text-white shadow-lg transition hover:bg-black/80"
            aria-label="Close photo"
          >
            ×
          </button>
          {expandedImageUrl ? (
            <img
              src={expandedImageUrl}
              alt="Expanded shared photo"
              className="max-h-[88vh] w-full rounded-[28px] object-contain shadow-2xl"
            />
          ) : null}
        </div>
      </ModalShell>

      <ModalShell
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        backdropColor="bg-black/60"
        zIndex="z-[90]"
      >
        <div className="mx-4 w-full max-w-md rounded-[28px] border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] px-6 py-6 text-[var(--bb-text-primary,#111827)] shadow-2xl">
          <h2 className="text-xl font-bold">Report Buddy</h2>
          <p className="mt-2 text-sm text-[var(--bb-text-secondary,#6b7280)]">Why are you reporting {otherDisplay}?</p>

          <div className="mt-5 space-y-2">
            {REPORT_REASONS.map((reason) => (
              <label
                key={reason}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  reportReason === reason
                    ? "border-[var(--bb-accent,#4a9b6f)] bg-[var(--bb-accent-soft,#eef7f1)]"
                    : "border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] hover:bg-[var(--bb-surface-soft,#f3f4f6)]"
                }`}
              >
                <input
                  type="radio"
                  name="buddy-report-reason"
                  checked={reportReason === reason}
                  onChange={() => setReportReason(reason)}
                  className="h-4 w-4 accent-[var(--bb-accent,#4a9b6f)]"
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
              className="flex-1 rounded-2xl border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] px-4 py-3 text-sm font-semibold text-[var(--bb-text-secondary,#374151)] transition hover:bg-[var(--bb-surface-soft,#f3f4f6)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleSubmitReport()}
              disabled={!reportReason || submittingReport}
              className="flex-1 rounded-2xl bg-[var(--bb-button,#4a9b6f)] px-4 py-3 text-sm font-semibold text-[var(--bb-button-text,#ffffff)] transition hover:opacity-90 disabled:opacity-50"
            >
              {submittingReport ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </div>
      </ModalShell>
    </>
  );
}
