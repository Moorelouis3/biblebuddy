"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { supabase } from "../../../lib/supabaseClient";
import { ModalShell } from "../../../components/ModalShell";
import UserBadge from "../../../components/UserBadge";
import StreakFlameBadge from "../../../components/StreakFlameBadge";
import { loadGroupPostMentions, type MentionCatalogItem } from "../../../lib/groupPostMentions";
import { getDirectMessagePresentation, isMissingDirectMessageActionColumnError } from "../../../lib/directMessageActions";
import MentionText from "../../../components/MentionText";

const TextareaMentionInput = dynamic(() => import("../../../components/TextareaMentionInput"), { ssr: false });

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

type InlineMessageSegment =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

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
  const [mentionItems, setMentionItems] = useState<MentionCatalogItem[]>([]);
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
  const bottomRef = useRef<HTMLDivElement>(null);
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
    let cancelled = false;
    loadGroupPostMentions(supabase, null)
      .then((items) => { if (!cancelled) setMentionItems(items); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

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
        .select("id, user_id_1, user_id_2, last_message_preview, last_message_at")
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

      const msgs = await fetchConversationMessages(conversationId);
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

      const { data: blockRows } = await supabase
        .from("buddy_blocks")
        .select("blocker_user_id, blocked_user_id")
        .or(`and(blocker_user_id.eq.${uid},blocked_user_id.eq.${otherId}),and(blocker_user_id.eq.${otherId},blocked_user_id.eq.${uid})`)
        .limit(1);

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

    const focusRefresh = () => {
      void loadConversation(currentUserId);
    };

    window.addEventListener("focus", focusRefresh);

    return () => {
      window.removeEventListener("focus", focusRefresh);
      void supabase.removeChannel(channel);
    };
  }, [conversationId, userId]);

  async function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !userId || blockState) return;
    const objectUrl = URL.createObjectURL(file);
    setPhotoPreview({ file, url: objectUrl });
    // Reset file input so same file can be selected again
    e.target.value = "";
    inputRef.current?.focus();
  }

  async function handleSendPhoto() {
    if (!photoPreview || !userId || uploadingPhoto || blockState) return;
    setUploadingPhoto(true);
    const { file } = photoPreview;
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
    URL.revokeObjectURL(photoPreview.url);
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
      let imageUrl: string | null = null;
      if (photoState) {
        const ext = photoState.file.name.split(".").pop() ?? "jpg";
        const path = `dm-photos/${conversationId}/${userId}-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("post-media").upload(path, photoState.file, { upsert: false });
        if (uploadError) {
          console.error("[DM PHOTO] Upload failed:", uploadError);
          throw uploadError;
        }
        const { data: urlData } = supabase.storage.from("post-media").getPublicUrl(path);
        imageUrl = urlData?.publicUrl ?? null;
      }

      const { data: inserted, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: userId,
          content,
          image_url: imageUrl,
        })
        .select("id, sender_id, content, image_url, read_at, created_at")
        .single();

      if (error) {
        console.error("[MESSAGES] Send error:", error);
        setMessages((prev) => prev.filter((message) => message.id !== optimisticMsg.id));
        setNewMessage(content);
        if (photoState) setPhotoPreview(photoState);
        return;
      }

      const normalizedInserted: Message = { ...inserted, action_label: null, action_href: null };
      setMessages((prev) => prev.map((message) => (message.id === optimisticMsg.id ? normalizedInserted : message)));

      const previewText =
        content.length > 0
          ? content.length > 80
            ? `${content.slice(0, 80)}...`
            : content
          : "Photo";

      await supabase
        .from("conversations")
        .update({
          last_message_at: inserted.created_at,
          last_message_preview: previewText,
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
        <div className="h-[100dvh] w-screen bg-white px-6 py-16 text-center sm:mx-4 sm:h-auto sm:w-full sm:max-w-3xl sm:rounded-[28px] sm:shadow-2xl">
          <p className="text-sm text-gray-400">Loading conversation...</p>
        </div>
      </ModalShell>
    );
  }

  if (notFound) {
    return (
      <ModalShell isOpen={true} onClose={() => onExternalClose ? onExternalClose() : router.back()} backdropColor="bg-black/45" zIndex="z-[80]">
        <div className="h-[100dvh] w-screen bg-white px-6 py-12 text-center sm:mx-4 sm:h-auto sm:w-full sm:max-w-md sm:rounded-[28px] sm:shadow-2xl">
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
      <ModalShell isOpen={true} onClose={() => onExternalClose ? onExternalClose() : router.back()} backdropColor="bg-black/45" zIndex="z-[80]">
        <div className="flex h-[100dvh] w-screen flex-col overflow-hidden bg-[#f5f5f5] sm:mx-4 sm:h-[84vh] sm:w-full sm:max-w-4xl sm:rounded-[32px] sm:border sm:border-gray-200 sm:shadow-2xl">
          <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-5 py-4">
            <button
              type="button"
              onClick={() => onExternalClose ? onExternalClose() : router.back()}
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
                (action, index, array) =>
                  array.findIndex((candidate) => candidate.label === action.label && candidate.href === action.href) === index,
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
              const senderName = isMine ? myDisplay : otherDisplay;
              const senderImage = isMine ? myProfile?.profile_image_url : otherUser?.profile_image_url;
              const senderInitials = isMine ? myInitials : otherInitials;
              const senderColor = isMine ? myColor : otherColor;
              const senderProfileHref = isMine ? (userId ? `/profile/${userId}` : null) : (otherUser?.user_id ? `/profile/${otherUser.user_id}` : null);

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
                      {senderProfileHref ? (
                        <Link href={senderProfileHref} className="px-1 text-xs font-semibold text-gray-700 hover:underline">
                          {senderName}
                        </Link>
                      ) : (
                        <div className="px-1 text-xs font-semibold text-gray-700">{senderName}</div>
                      )}

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
                        ) : msg.image_url ? (
                          <img
                            src={msg.image_url}
                            alt="Photo"
                            className="max-w-[240px] rounded-2xl object-cover"
                            style={{ maxHeight: 320 }}
                          />
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
                                      className="h-6"
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
                                          className="inline-flex min-h-10 items-center justify-center rounded-2xl border border-[#d8eadf] bg-[#eef7f1] px-4 py-2 text-sm font-semibold text-[#2f6f4f] transition hover:bg-[#e4f3ea]"
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
                                            className="inline-flex min-h-10 items-center justify-center rounded-2xl border border-[#d8eadf] bg-[#eef7f1] px-4 py-2 text-sm font-semibold text-[#2f6f4f] transition hover:bg-[#e4f3ea]"
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
                                            className="font-semibold text-[#8d5d38] underline underline-offset-2"
                                          >
                                            {segment.label}
                                          </button>
                                        ) : (
                                          <MentionText
                                            key={`msg-text:${msg.id}:${lineIndex}:${segmentIndex}`}
                                            text={segment.value}
                                            items={mentionItems}
                                          />
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
                                    className="inline-flex min-h-10 items-center justify-center rounded-2xl border border-[#d8eadf] bg-[#eef7f1] px-4 py-2 text-sm font-semibold text-[#2f6f4f] transition hover:bg-[#e4f3ea]"
                                  >
                                    {action.label}
                                  </button>
                                ))}
                              </div>
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
                {/* Photo preview */}
                {photoPreview && (
                  <div className="mb-3 flex items-start gap-3">
                    <div className="relative">
                      <img src={photoPreview.url} alt="Photo preview" className="h-24 w-24 rounded-2xl object-cover border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => { URL.revokeObjectURL(photoPreview.url); setPhotoPreview(null); }}
                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-white text-xs font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
                <div className="mx-auto flex max-w-3xl items-end gap-2">
                  {/* Hidden file input */}
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoSelect}
                  />
                  {/* Photo button */}
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    disabled={!!blockState}
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50 disabled:opacity-40"
                    title="Send photo"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <TextareaMentionInput
                    value={newMessage}
                    onChange={setNewMessage}
                    mentionItems={mentionItems}
                    onKeyDown={handleComposerKeyDown}
                    placeholder={`Message ${otherDisplay}`}
                    rows={1}
                    className="max-h-36 w-full resize-none overflow-y-auto rounded-[24px] border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    style={{ lineHeight: "1.5" }}
                  />
                  <button
                    type="button"
                    onClick={() => void handleSend()}
                    disabled={(!newMessage.trim() && !photoPreview) || sending || uploadingPhoto}
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-white transition disabled:opacity-40"
                    style={{ backgroundColor: (newMessage.trim() || photoPreview) ? "#4a9b6f" : "#cbd5e1" }}
                  >
                    <svg className="h-5 w-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-center text-[10px] text-gray-400">Enter to send | Shift+Enter for new line</p>
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
