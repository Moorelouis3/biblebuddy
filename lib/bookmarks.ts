"use client";

/**
 * Bookmarks - the user's library of saved things (2026-09-13).
 *
 * One table, user_bookmarks, keyed by (content_type, content_id), so Daily
 * Verses today and Bible verses, devotionals or posts later all use the same
 * system. It is the single source of truth: the Daily Verse card, the popup,
 * the archive and the Bookmarks page all read and write through here, and a
 * window event keeps whatever is open on screen in sync.
 */

import { supabase } from "./supabaseClient";

export type BookmarkContentType = "daily_verse";

export type Bookmark = {
  id: string;
  content_type: BookmarkContentType;
  content_id: string;
  created_at: string;
};

const CHANGE_EVENT = "bb:bookmarks-changed";

type ChangeDetail = { contentType: BookmarkContentType; contentId: string; bookmarked: boolean };

export async function isBookmarked(userId: string, contentType: BookmarkContentType, contentId: string) {
  try {
    const { data } = await supabase
      .from("user_bookmarks")
      .select("id")
      .eq("user_id", userId)
      .eq("content_type", contentType)
      .eq("content_id", contentId)
      .maybeSingle();
    return Boolean(data);
  } catch {
    return false;
  }
}

/** Which of these ids the user has saved - one query for a whole list. */
export async function fetchBookmarkedIds(userId: string, contentType: BookmarkContentType, contentIds: string[]) {
  if (!contentIds.length) return new Set<string>();
  try {
    const { data } = await supabase
      .from("user_bookmarks")
      .select("content_id")
      .eq("user_id", userId)
      .eq("content_type", contentType)
      .in("content_id", contentIds);
    return new Set((data || []).map((row) => row.content_id as string));
  } catch {
    return new Set<string>();
  }
}

export async function listBookmarks(userId: string, contentType: BookmarkContentType, limit = 30, offset = 0) {
  const { data, error } = await supabase
    .from("user_bookmarks")
    .select("id, content_type, content_id, created_at")
    .eq("user_id", userId)
    .eq("content_type", contentType)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw new Error(error.message);
  return (data || []) as Bookmark[];
}

/** Save or remove. Returns false when the write failed so callers can roll back. */
export async function setBookmark(
  userId: string,
  contentType: BookmarkContentType,
  contentId: string,
  bookmarked: boolean,
) {
  try {
    const { error } = bookmarked
      ? await supabase
          .from("user_bookmarks")
          .upsert(
            { user_id: userId, content_type: contentType, content_id: contentId },
            { onConflict: "user_id,content_type,content_id", ignoreDuplicates: true },
          )
      : await supabase
          .from("user_bookmarks")
          .delete()
          .eq("user_id", userId)
          .eq("content_type", contentType)
          .eq("content_id", contentId);
    if (error) return false;
    window.dispatchEvent(new CustomEvent<ChangeDetail>(CHANGE_EVENT, { detail: { contentType, contentId, bookmarked } }));
    return true;
  } catch {
    return false;
  }
}

/** Subscribe to bookmark changes made anywhere on the page. Returns unsubscribe. */
export function onBookmarkChange(listener: (detail: ChangeDetail) => void) {
  const handler = (event: Event) => listener((event as CustomEvent<ChangeDetail>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}
