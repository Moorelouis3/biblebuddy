"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

// Blocked users (2026-09-21, App Store guideline 1.2). buddy_blocks rows are
// visible to both parties under RLS, so we hide content in BOTH directions:
// people you blocked and people who blocked you. Small in-memory cache so the
// feed, comments and inbox don't each hit the DB; blocking/unblocking fires
// BLOCKS_CHANGED_EVENT so every list refreshes straight away.

export const BLOCKS_CHANGED_EVENT = "bb:blocks-changed";

const CACHE_MS = 60_000;

type BlockRow = { blocker_user_id: string; blocked_user_id: string };

let cache: { userId: string; rows: BlockRow[]; at: number } | null = null;
let inflight: { userId: string; promise: Promise<BlockRow[]> } | null = null;

async function fetchRows(userId: string): Promise<BlockRow[]> {
  const { data, error } = await supabase
    .from("buddy_blocks")
    .select("blocker_user_id, blocked_user_id")
    .or(`blocker_user_id.eq.${userId},blocked_user_id.eq.${userId}`);
  if (error) {
    console.warn("[BLOCKS] Could not load blocks:", error.message);
    return [];
  }
  return (data || []) as BlockRow[];
}

async function loadRows(userId: string, force = false): Promise<BlockRow[]> {
  if (!force && cache && cache.userId === userId && Date.now() - cache.at < CACHE_MS) return cache.rows;
  if (!force && inflight && inflight.userId === userId) return inflight.promise;
  const promise = fetchRows(userId).then((rows) => {
    cache = { userId, rows, at: Date.now() };
    return rows;
  });
  inflight = { userId, promise };
  try {
    return await promise;
  } finally {
    if (inflight?.promise === promise) inflight = null;
  }
}

async function currentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id ?? null;
}

/** IDs of everyone whose content should be hidden from the current user (both directions). */
export async function getBlockedUserIds(options: { force?: boolean; userId?: string | null } = {}): Promise<Set<string>> {
  const userId = options.userId ?? (await currentUserId());
  if (!userId) return new Set();
  const rows = await loadRows(userId, options.force);
  const ids = new Set<string>();
  for (const row of rows) {
    ids.add(row.blocker_user_id === userId ? row.blocked_user_id : row.blocker_user_id);
  }
  return ids;
}

/** IDs the current user blocked themselves (the ones they can unblock). */
export async function getUsersIBlocked(options: { force?: boolean; userId?: string | null } = {}): Promise<Set<string>> {
  const userId = options.userId ?? (await currentUserId());
  if (!userId) return new Set();
  const rows = await loadRows(userId, options.force);
  return new Set(rows.filter((row) => row.blocker_user_id === userId).map((row) => row.blocked_user_id));
}

function notifyBlocksChanged() {
  cache = null;
  if (typeof window !== "undefined") window.dispatchEvent(new Event(BLOCKS_CHANGED_EVENT));
}

export async function blockUser(blockedUserId: string, reason = "Blocked from community"): Promise<{ ok: boolean; error?: string }> {
  const userId = await currentUserId();
  if (!userId) return { ok: false, error: "Please sign in first." };
  if (userId === blockedUserId) return { ok: false, error: "You can't block yourself." };
  const { error } = await supabase
    .from("buddy_blocks")
    .upsert(
      { blocker_user_id: userId, blocked_user_id: blockedUserId, reason },
      { onConflict: "blocker_user_id,blocked_user_id" },
    );
  if (error) {
    console.error("[BLOCKS] Block error:", error);
    return { ok: false, error: "Could not block right now. Please try again." };
  }
  notifyBlocksChanged();
  return { ok: true };
}

export async function unblockUser(blockedUserId: string): Promise<{ ok: boolean; error?: string }> {
  const userId = await currentUserId();
  if (!userId) return { ok: false, error: "Please sign in first." };
  const { error } = await supabase
    .from("buddy_blocks")
    .delete()
    .eq("blocker_user_id", userId)
    .eq("blocked_user_id", blockedUserId);
  if (error) {
    console.error("[BLOCKS] Unblock error:", error);
    return { ok: false, error: "Could not unblock right now. Please try again." };
  }
  notifyBlocksChanged();
  return { ok: true };
}

/** React hook: the set of user IDs to hide, refreshed whenever blocks change or auth changes. */
export function useBlockedUserIds(): Set<string> {
  const [ids, setIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    let cancelled = false;
    const refresh = (force = false) => {
      void getBlockedUserIds({ force }).then((next) => {
        if (!cancelled) setIds(next);
      });
    };
    refresh();
    const onChange = () => refresh(true);
    window.addEventListener(BLOCKS_CHANGED_EVENT, onChange);
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        cache = null;
        refresh(true);
      }
    });
    return () => {
      cancelled = true;
      window.removeEventListener(BLOCKS_CHANGED_EVENT, onChange);
      sub.subscription.unsubscribe();
    };
  }, []);

  return ids;
}
