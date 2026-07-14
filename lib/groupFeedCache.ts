import { supabase } from "./supabaseClient";

type GroupFeedCachePayload = {
  groupId: string;
  tab: string;
  fetchedAt: number;
  posts: any[];
  hasMore: boolean;
  weeklyPollByPostId: Record<string, any>;
  weeklyTriviaByPostId: Record<string, any>;
  weeklyQuestionByPostId: Record<string, any>;
};

const GROUP_FEED_CACHE_PREFIX = "bb:group-feed-cache";
const GROUP_FEED_CACHE_TTL_MS = 20 * 60 * 1000;
const GROUP_FEED_PRELOAD_LIMIT = 10;

function isBrowser() {
  return typeof window !== "undefined";
}

function cacheKey(groupId: string, tab: string) {
  return `${GROUP_FEED_CACHE_PREFIX}:${tab}:${groupId}`;
}

export function readGroupFeedCache(groupId: string, tab = "home") {
  if (!isBrowser()) return null;
  try {
    const raw = window.sessionStorage.getItem(cacheKey(groupId, tab));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GroupFeedCachePayload;
    if (!parsed?.groupId || parsed.groupId !== groupId) return null;
    if (!parsed?.tab || parsed.tab !== tab) return null;
    if (!parsed?.fetchedAt || Date.now() - parsed.fetchedAt > GROUP_FEED_CACHE_TTL_MS) {
      window.sessionStorage.removeItem(cacheKey(groupId, tab));
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeGroupFeedCache(payload: GroupFeedCachePayload) {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.setItem(cacheKey(payload.groupId, payload.tab), JSON.stringify(payload));
  } catch {
    // Ignore storage failures and keep the feed working normally.
  }
}

export function clearGroupFeedCache(groupId: string, tab = "home") {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.removeItem(cacheKey(groupId, tab));
  } catch {
    // Ignore storage failures and keep the feed working normally.
  }
}

export async function preloadGroupFeedForUser(userId: string, tab = "home") {
  if (!isBrowser() || !userId) return null;

  try {
    const { data: membershipRows, error: membershipError } = await supabase
      .from("group_members")
      .select("status, group_id, study_groups(id, name, description, member_count, cover_emoji, cover_color, current_weekly_study)")
      .eq("user_id", userId)
      .eq("status", "approved")
      .limit(1);

    if (membershipError) throw membershipError;

    const membership = (membershipRows || [])[0] as any;
    let group = (Array.isArray(membership?.study_groups) ? membership.study_groups[0] : membership?.study_groups) as { id: string } | null;

    if (!group) {
      const { data: groups, error: groupError } = await supabase
        .from("study_groups")
        .select("id, name, description, member_count, cover_emoji, cover_color, current_weekly_study")
        .eq("status", "active")
        .order("member_count", { ascending: false })
        .limit(1);

      if (groupError) throw groupError;
      group = ((groups || [])[0] as { id: string } | undefined) ?? null;
    }

    if (!group?.id) return null;

    const existing = readGroupFeedCache(group.id, tab);
    if (existing) return existing;

    const { data: postRows, error: postsError } = await supabase
      .from("group_posts")
      .select("id, user_id, display_name, title, category, content, like_count, is_pinned, created_at, parent_post_id, media_url, link_url")
      .eq("group_id", group.id)
      .is("parent_post_id", null)
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(GROUP_FEED_PRELOAD_LIMIT);

    if (postsError) throw postsError;

    const cachePayload: GroupFeedCachePayload = {
      groupId: group.id,
      tab,
      fetchedAt: Date.now(),
      posts: Array.isArray(postRows) ? postRows : [],
      hasMore: Array.isArray(postRows) ? postRows.length >= GROUP_FEED_PRELOAD_LIMIT : false,
      weeklyPollByPostId: {},
      weeklyTriviaByPostId: {},
      weeklyQuestionByPostId: {},
    };

    writeGroupFeedCache(cachePayload);
    return cachePayload;
  } catch {
    return null;
  }
}
