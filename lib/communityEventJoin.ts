"use client";

/**
 * The one way a user joins a community study (e.g. Wisdom of Proverbs).
 * Used by the event page's join buttons and the one-time promo popup, so
 * both entry points register people identically. Idempotent: an existing
 * member is reported as alreadyJoined and nothing is written twice.
 *
 * The full-account gate (name, email, photo) stays with the caller, because
 * each surface shows the account modal its own way.
 */

import { supabase } from "./supabaseClient";
import { recordNewUser } from "./guestSession";

export type JoinResult = { ok: true; alreadyJoined: boolean } | { ok: false; error: string };

export async function isCommunityEventMember(userId: string, eventSlug: string) {
  const { data, error } = await supabase
    .from("community_event_members")
    .select("user_id")
    .eq("event_slug", eventSlug)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return Boolean(data);
}

export async function joinCommunityEvent(
  userId: string,
  eventSlug: string,
  options: { reminders?: boolean; source?: string } = {},
): Promise<JoinResult> {
  try {
    if (await isCommunityEventMember(userId, eventSlug)) return { ok: true, alreadyJoined: true };
    const { error } = await supabase
      .from("community_event_members")
      .upsert(
        { event_slug: eventSlug, user_id: userId, reminders: Boolean(options.reminders) },
        { onConflict: "event_slug,user_id", ignoreDuplicates: true },
      );
    if (error) return { ok: false, error: error.message };
    // Confirm the row really exists before anyone is told they're in.
    if (!(await isCommunityEventMember(userId, eventSlug))) return { ok: false, error: "Join was not saved." };
    recordNewUser(userId, `community_event_${eventSlug}`);
    return { ok: true, alreadyJoined: false };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Join failed." };
  }
}
