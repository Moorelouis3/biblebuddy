"use client";

/**
 * The inbox.
 *
 * Rebuilt 2026-11-28 for two things Louis said the same day: "why it take my
 * message to load so long" and "make it more like social media DMs, it feels
 * old".
 *
 * Why it was slow. The old page read EVERY conversation an account has, 200
 * at a time, then asked for every profile and every message of every one of
 * them, and did all of that again whenever any row in messages, conversations
 * or profile_stats changed for anyone. For most people that is three requests.
 * For Louis, who is on one side of every welcome message ever sent (7,659
 * threads), it was about 160 requests per load, on a loop.
 *
 * How it loads now:
 *  1. One query for the messages other people sent me. That alone says which
 *     threads have a reply (Primary) and which are unread.
 *  2. Primary threads by id. Everything else (General) comes 40 at a time as
 *     you scroll, newest first.
 *  3. Profiles only for the rows on screen.
 * The last result is kept in memory, so coming back from a chat shows the
 * list at once and refreshes behind it.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { ModalShell } from "../../components/ModalShell";
import UserBadge from "../../components/UserBadge";
import StreakFlameBadge from "../../components/StreakFlameBadge";
import { extractLegacyDirectMessageAction } from "../../lib/directMessageActions";
import { useBlockedUserIds } from "../../lib/userBlocks";

const AVATAR_COLORS = ["#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8"];
const GENERAL_PAGE = 40;
const ID_CHUNK = 80;
const PROFILE_FIELDS = "user_id, display_name, username, profile_image_url, member_badge, is_paid, current_streak, selected_streak_flame";
const CONVERSATION_FIELDS = "id, user_id_1, user_id_2, last_message_at, last_message_preview";

function avatarColor(uid: string): string {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = uid.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/** Short, the way a DM list shows it: now, 5m, 2h, 3d, 4w, then a date. */
function formatTime(dateStr: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  if (days < 35) return `${Math.floor(days / 7)}w`;
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
  otherUserSelectedStreakFlame: string | null;
  lastMessagePreview: string | null;
  lastMessageAt: string | null;
  hasUnread: boolean;
  bucket: InboxBucket;
}

type RawConversation = {
  id: string;
  user_id_1: string | null;
  user_id_2: string | null;
  last_message_at: string | null;
  last_message_preview: string | null;
};

type Inbox = {
  uid: string;
  primary: Conversation[];
  general: Conversation[];
  total: number;
  /** How far into the newest-first list of all threads General has read. */
  generalOffset: number;
  generalDone: boolean;
  replied: Set<string>;
  unread: Set<string>;
};

/** Kept between visits to this page, so the list is there the moment it opens. */
let inboxCache: Inbox | null = null;

function sortConversations(list: Conversation[]) {
  return [...list].sort((a, b) => {
    if (a.hasUnread !== b.hasUnread) return a.hasUnread ? -1 : 1;
    return (b.lastMessageAt ?? "").localeCompare(a.lastMessageAt ?? "");
  });
}

function chunk<T>(list: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

const mine = (uid: string) => `user_id_1.eq.${uid},user_id_2.eq.${uid}`;

/**
 * Every message somebody else sent me, as (thread, read or not). One query
 * for almost everyone; paged because a response stops at 1000 rows.
 */
async function loadIncoming(uid: string) {
  const replied = new Set<string>();
  const unread = new Set<string>();
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await supabase
      .from("messages")
      .select("conversation_id, read_at, conversations!inner(user_id_1, user_id_2)")
      .neq("sender_id", uid)
      .or(mine(uid), { referencedTable: "conversations" })
      .range(offset, offset + 999);
    if (error) throw error;
    for (const row of data ?? []) {
      replied.add(row.conversation_id);
      if (!row.read_at) unread.add(row.conversation_id);
    }
    if (!data || data.length < 1000) break;
  }
  return { replied, unread };
}

async function hydrate(uid: string, rows: RawConversation[], replied: Set<string>, unread: Set<string>): Promise<Conversation[]> {
  // A deleted account leaves a NULL participant (the thread is kept).
  const otherOf = (row: RawConversation) => (row.user_id_1 === uid ? row.user_id_2 : row.user_id_1);
  const otherIds = [...new Set(rows.map(otherOf).filter((id): id is string => Boolean(id)))];
  const results = await Promise.all(
    chunk(otherIds, ID_CHUNK).map((ids) => supabase.from("profile_stats").select(PROFILE_FIELDS).in("user_id", ids)),
  );
  const profiles = new Map(results.flatMap((result) => result.data ?? []).map((profile) => [profile.user_id as string, profile]));

  return rows.map((row) => {
    const otherId = otherOf(row);
    const profile = otherId ? profiles.get(otherId) : undefined;
    return {
      id: row.id,
      otherUserId: otherId ?? "",
      otherUserName: otherId ? profile?.display_name || profile?.username || "Bible Buddy" : "Deleted account",
      otherUserImage: profile?.profile_image_url || null,
      otherUserBadge: profile?.member_badge || null,
      otherUserIsPaid: profile?.is_paid === true,
      otherUserCurrentStreak: profile?.current_streak ?? null,
      otherUserSelectedStreakFlame: profile?.selected_streak_flame ?? null,
      lastMessagePreview: row.last_message_preview ? extractLegacyDirectMessageAction(row.last_message_preview).body : null,
      lastMessageAt: row.last_message_at || null,
      hasUnread: unread.has(row.id),
      bucket: replied.has(row.id) ? "primary" : "general",
    } satisfies Conversation;
  });
}

/** The next stretch of General: newest threads nobody has answered yet. */
async function loadGeneralPage(uid: string, offset: number, replied: Set<string>, unread: Set<string>) {
  const { data, error } = await supabase
    .from("conversations")
    .select(CONVERSATION_FIELDS)
    .or(mine(uid))
    .order("last_message_at", { ascending: false, nullsFirst: false })
    .order("id", { ascending: true })
    .range(offset, offset + GENERAL_PAGE - 1);
  if (error) throw error;
  const rows = (data ?? []) as RawConversation[];
  const list = await hydrate(uid, rows.filter((row) => !replied.has(row.id)), replied, unread);
  return { list, read: rows.length, done: rows.length < GENERAL_PAGE };
}

/** One read at a time: a second ask while one is on its way gets the same answer. */
let inboxInFlight: { uid: string; promise: Promise<Inbox> } | null = null;

function loadInbox(uid: string): Promise<Inbox> {
  if (inboxInFlight?.uid === uid) return inboxInFlight.promise;
  const promise = readInbox(uid).finally(() => {
    if (inboxInFlight?.promise === promise) inboxInFlight = null;
  });
  inboxInFlight = { uid, promise };
  return promise;
}

async function readInbox(uid: string): Promise<Inbox> {
  const [{ replied, unread }, totalResult] = await Promise.all([
    loadIncoming(uid),
    supabase.from("conversations").select("id", { count: "exact", head: true }).or(mine(uid)),
  ]);

  const [primaryResults, firstGeneral] = await Promise.all([
    Promise.all(chunk([...replied], ID_CHUNK).map((ids) => supabase.from("conversations").select(CONVERSATION_FIELDS).in("id", ids))),
    loadGeneralPage(uid, 0, replied, unread),
  ]);
  const primaryRows = primaryResults.flatMap((result) => (result.data ?? []) as RawConversation[]);
  const primary = sortConversations(await hydrate(uid, primaryRows, replied, unread));

  return {
    uid,
    primary,
    general: firstGeneral.list,
    total: totalResult.count ?? primary.length + firstGeneral.list.length,
    generalOffset: firstGeneral.read,
    generalDone: firstGeneral.done,
    replied,
    unread,
  };
}

/** Threads with people whose name matches, for the search box. */
async function searchInbox(uid: string, term: string, replied: Set<string>, unread: Set<string>): Promise<Conversation[]> {
  const safe = term.replace(/[%,()*\\]/g, " ").trim();
  if (!safe) return [];
  const { data: people } = await supabase
    .from("profile_stats")
    .select("user_id")
    .or(`display_name.ilike.%${safe}%,username.ilike.%${safe}%`)
    .neq("user_id", uid)
    .limit(40);
  const ids = (people ?? []).map((person) => person.user_id as string);
  if (ids.length === 0) return [];
  const list = ids.join(",");
  const { data } = await supabase
    .from("conversations")
    .select(CONVERSATION_FIELDS)
    .or(`and(user_id_1.eq.${uid},user_id_2.in.(${list})),and(user_id_2.eq.${uid},user_id_1.in.(${list}))`)
    .order("last_message_at", { ascending: false, nullsFirst: false })
    .limit(40);
  return sortConversations(await hydrate(uid, (data ?? []) as RawConversation[], replied, unread));
}

function Avatar({ convo }: { convo: Conversation }) {
  const initials = convo.otherUserName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return convo.otherUserImage ? (
    <img src={convo.otherUserImage} alt="" loading="lazy" decoding="async" className="h-14 w-14 flex-shrink-0 rounded-full bg-[var(--bb-surface-soft,#eef0f3)] object-cover" />
  ) : (
    <div
      className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
      style={{ backgroundColor: avatarColor(convo.otherUserId || convo.id) }}
    >
      {initials}
    </div>
  );
}

function SkeletonRows() {
  return (
    <div aria-hidden="true">
      {Array.from({ length: 7 }, (_, index) => (
        <div key={index} className="flex animate-pulse items-center gap-3 px-4 py-2.5">
          <div className="h-14 w-14 flex-shrink-0 rounded-full bg-[var(--bb-surface-soft,#eef0f3)]" />
          <div className="min-w-0 flex-1">
            <div className="h-3.5 w-32 rounded-full bg-[var(--bb-surface-soft,#eef0f3)]" />
            <div className="mt-2 h-3 w-48 max-w-full rounded-full bg-[var(--bb-surface-soft,#eef0f3)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MessagesPage() {
  const router = useRouter();
  const [inbox, setInbox] = useState<Inbox | null>(inboxCache);
  const [failed, setFailed] = useState(false);
  const [activeTab, setActiveTab] = useState<InboxBucket>("primary");
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Conversation[] | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(inboxCache?.uid ?? null);
  const inboxRef = useRef<Inbox | null>(inboxCache);
  const moreRef = useRef<HTMLDivElement>(null);
  const busyMore = useRef(false);

  const keep = useCallback((next: Inbox) => {
    inboxCache = next;
    inboxRef.current = next;
    setInbox(next);
  }, []);

  /**
   * Read the inbox again without blanking the screen. Whatever of General the
   * reader had already scrolled through stays, with the fresh first page laid
   * over the top of it.
   */
  const refresh = useCallback(
    async (uid: string) => {
      try {
        const fresh = await loadInbox(uid);
        const before = inboxRef.current;
        if (before && before.uid === uid && before.generalOffset > fresh.generalOffset) {
          const seen = new Set(fresh.general.map((conversation) => conversation.id));
          const rest = before.general
            .filter((conversation) => !seen.has(conversation.id) && !fresh.replied.has(conversation.id))
            .map((conversation) => ({ ...conversation, hasUnread: fresh.unread.has(conversation.id) }));
          fresh.general = [...fresh.general, ...rest];
          fresh.generalOffset = before.generalOffset;
          fresh.generalDone = before.generalDone;
        }
        setFailed(false);
        keep(fresh);
      } catch (error) {
        console.error("[MESSAGES_PAGE] Could not load conversations:", error);
        if (!inboxRef.current) setFailed(true);
      }
    },
    [keep],
  );

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      // The session is already on the phone; getUser() would be a round trip.
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (cancelled) return;
      if (!user) {
        router.push("/login");
        return;
      }
      if (inboxCache && inboxCache.uid !== user.id) {
        inboxCache = null;
        inboxRef.current = null;
        setInbox(null);
      }
      setCurrentUserId(user.id);
      await refresh(user.id);
    })();
    return () => {
      cancelled = true;
    };
  }, [router, refresh]);

  useEffect(() => {
    if (!currentUserId) return;

    // Several rows change for one sent message; read the inbox once for all of them.
    let timer: ReturnType<typeof setTimeout> | null = null;
    const soon = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => void refresh(currentUserId), 600);
    };

    const channel = supabase
      .channel(`messages-page:${currentUserId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, soon)
      .on("postgres_changes", { event: "*", schema: "public", table: "conversations" }, soon)
      .subscribe();

    window.addEventListener("focus", soon);
    window.addEventListener("bb:refresh-unread-messages", soon);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("focus", soon);
      window.removeEventListener("bb:refresh-unread-messages", soon);
      void supabase.removeChannel(channel);
    };
  }, [currentUserId, refresh]);

  const loadMore = useCallback(async () => {
    const current = inboxRef.current;
    if (!current || current.generalDone || busyMore.current) return;
    busyMore.current = true;
    setLoadingMore(true);
    try {
      const page = await loadGeneralPage(current.uid, current.generalOffset, current.replied, current.unread);
      const latest = inboxRef.current ?? current;
      const have = new Set(latest.general.map((conversation) => conversation.id));
      keep({
        ...latest,
        general: [...latest.general, ...page.list.filter((conversation) => !have.has(conversation.id))],
        generalOffset: current.generalOffset + page.read,
        generalDone: page.done,
      });
    } catch (error) {
      console.error("[MESSAGES_PAGE] Could not load more conversations:", error);
    } finally {
      busyMore.current = false;
      setLoadingMore(false);
    }
  }, [keep]);

  // Search by name, a beat after the typing stops.
  const term = search.trim();
  useEffect(() => {
    if (!term || !currentUserId) {
      setSearchResults(null);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      const current = inboxRef.current;
      const found = await searchInbox(currentUserId, term, current?.replied ?? new Set(), current?.unread ?? new Set()).catch(() => []);
      if (!cancelled) setSearchResults(found);
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [term, currentUserId]);

  // Conversations with blocked buddies (either direction) stay out of the inbox.
  const blockedUserIds = useBlockedUserIds();
  const primaryConversations = useMemo(
    () => (inbox?.primary ?? []).filter((conversation) => !blockedUserIds.has(conversation.otherUserId)),
    [inbox, blockedUserIds],
  );
  const generalConversations = useMemo(
    () => (inbox?.general ?? []).filter((conversation) => !blockedUserIds.has(conversation.otherUserId)),
    [inbox, blockedUserIds],
  );
  const generalTotal = Math.max(generalConversations.length, (inbox?.total ?? 0) - (inbox?.primary.length ?? 0));
  const searching = term.length > 0;
  const visibleConversations = searching
    ? (searchResults ?? []).filter((conversation) => !blockedUserIds.has(conversation.otherUserId))
    : activeTab === "primary"
      ? primaryConversations
      : generalConversations;
  const loading = !inbox && !failed;
  const nothingAtAll = Boolean(inbox) && primaryConversations.length === 0 && generalConversations.length === 0;

  useEffect(() => {
    if (!inbox) return;
    if (activeTab === "primary" && primaryConversations.length === 0 && generalConversations.length > 0) setActiveTab("general");
    if (activeTab === "general" && generalConversations.length === 0 && primaryConversations.length > 0) setActiveTab("primary");
  }, [inbox, activeTab, generalConversations.length, primaryConversations.length]);

  // More of General as the end of the list comes into view.
  const showMore = !searching && activeTab === "general" && Boolean(inbox) && !inbox?.generalDone;
  useEffect(() => {
    const node = moreRef.current;
    if (!showMore || !node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) void loadMore();
      },
      { rootMargin: "400px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [showMore, loadMore, generalConversations.length]);

  const tabs: Array<{ key: InboxBucket; label: string; count: number }> = [
    { key: "primary", label: "Primary", count: primaryConversations.length },
    { key: "general", label: "General", count: generalTotal },
  ];

  return (
    <ModalShell isOpen={true} onClose={() => router.back()} backdropColor="bg-black/45" zIndex="z-[70]">
      <div className="flex h-[100dvh] w-screen flex-col overflow-hidden bg-[var(--bb-card,#ffffff)] text-[var(--bb-text-primary,#111827)] sm:mx-4 sm:h-[min(860px,calc(100dvh-2rem))] sm:w-full sm:max-w-xl sm:rounded-[28px] sm:border sm:border-[var(--bb-card-border,#e5e7eb)] sm:shadow-2xl">
        <div className="flex items-center gap-1 px-2 pb-1 pt-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[var(--bb-text-primary,#111827)] transition active:opacity-60"
            aria-label="Back"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-[22px] font-extrabold tracking-tight text-[var(--bb-text-primary,#111827)]">Messages</h1>
        </div>

        <div className="px-4 pb-2 pt-1">
          <label className="flex items-center gap-2 rounded-full bg-[var(--bb-surface-soft,#f1f2f4)] px-4 py-2.5">
            <svg className="h-4 w-4 flex-shrink-0 text-[var(--bb-text-muted,#9ca3af)]" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
              aria-label="Search messages by name"
              className="w-full min-w-0 border-0 bg-transparent p-0 text-[15px] text-[var(--bb-text-primary,#111827)] placeholder-[var(--bb-text-muted,#9ca3af)] outline-none focus:ring-0"
            />
          </label>
        </div>

        {!searching && (
          <div className="flex border-b border-[var(--bb-card-border,#e5e7eb)] px-2">
            {tabs.map((tab) => {
              const on = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex-1 px-3 py-3 text-[15px] transition ${
                    on ? "font-bold text-[var(--bb-text-primary,#111827)]" : "font-semibold text-[var(--bb-text-muted,#9ca3af)]"
                  }`}
                >
                  {tab.label}
                  {inbox ? <span className="ml-1.5 text-[13px] font-semibold opacity-70">{tab.count.toLocaleString("en-US")}</span> : null}
                  {on ? <span className="absolute inset-x-6 -bottom-px h-[3px] rounded-full bg-[var(--bb-button,#0056FD)]" /> : null}
                </button>
              );
            })}
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-6 pt-1">
          {loading ? (
            <SkeletonRows />
          ) : failed ? (
            <div className="px-8 py-16 text-center">
              <p className="text-[15px] font-semibold text-[var(--bb-text-primary,#111827)]">Could not load your messages.</p>
              <button
                type="button"
                onClick={() => {
                  setFailed(false);
                  if (currentUserId) void refresh(currentUserId);
                }}
                className="mt-4 rounded-full bg-[var(--bb-button,#0056FD)] px-5 py-2.5 text-sm font-bold text-[var(--bb-button-text,#ffffff)]"
              >
                Try again
              </button>
            </div>
          ) : searching && searchResults === null ? (
            <SkeletonRows />
          ) : searching && visibleConversations.length === 0 ? (
            <p className="px-8 py-16 text-center text-[15px] text-[var(--bb-text-secondary,#6b7280)]">No chats with “{term}”.</p>
          ) : nothingAtAll ? (
            <div className="px-8 py-16 text-center">
              <p className="mb-3 text-5xl">💬</p>
              <h2 className="text-xl font-extrabold text-[var(--bb-text-primary,#111827)]">No messages yet</h2>
              <p className="mt-1.5 text-[15px] text-[var(--bb-text-secondary,#6b7280)]">Open a buddy’s profile to start a chat.</p>
            </div>
          ) : visibleConversations.length === 0 ? (
            <div className="px-8 py-16 text-center">
              <h2 className="text-lg font-extrabold text-[var(--bb-text-primary,#111827)]">Nothing here yet</h2>
              <p className="mt-1.5 text-[15px] text-[var(--bb-text-secondary,#6b7280)]">
                {activeTab === "primary" ? "A chat moves here once the other person writes back." : "Chats nobody has answered yet stay here."}
              </p>
            </div>
          ) : (
            <>
              {visibleConversations.map((convo) => (
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
                  className="flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[var(--bb-surface-soft,#f3f4f6)] active:bg-[var(--bb-surface-soft,#f3f4f6)]"
                >
                  {convo.otherUserId ? (
                    <Link
                      href={`/profile/${convo.otherUserId}`}
                      onClick={(event) => event.stopPropagation()}
                      className="flex-shrink-0"
                      aria-label={`${convo.otherUserName}'s profile`}
                    >
                      <Avatar convo={convo} />
                    </Link>
                  ) : (
                    <Avatar convo={convo} />
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className={`truncate text-[15px] ${convo.hasUnread ? "font-extrabold" : "font-semibold"} text-[var(--bb-text-primary,#111827)]`}>
                        {convo.otherUserName}
                      </span>
                      <StreakFlameBadge currentStreak={convo.otherUserCurrentStreak} flameId={convo.otherUserSelectedStreakFlame} />
                      <UserBadge customBadge={convo.otherUserBadge} isPaid={convo.otherUserIsPaid} />
                    </div>
                    <div className="mt-0.5 flex min-w-0 items-baseline gap-1.5 text-[14px]">
                      <span className={`truncate ${convo.hasUnread ? "font-bold text-[var(--bb-text-primary,#111827)]" : "text-[var(--bb-text-secondary,#6b7280)]"}`}>
                        {convo.lastMessagePreview || "Say hello"}
                      </span>
                      {convo.lastMessageAt ? (
                        <span className="flex-shrink-0 text-[var(--bb-text-muted,#9ca3af)]">· {formatTime(convo.lastMessageAt)}</span>
                      ) : null}
                    </div>
                  </div>

                  {convo.hasUnread ? <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[var(--bb-button,#0056FD)]" aria-label="Unread" /> : null}
                </div>
              ))}
              {showMore ? (
                <div ref={moreRef} className="py-4 text-center text-[13px] text-[var(--bb-text-muted,#9ca3af)]">
                  {loadingMore ? "Loading more…" : ""}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </ModalShell>
  );
}
