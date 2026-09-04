"use client";

/**
 * The full-account gate (2026-09-04): posting in the group and joining the
 * Proverbs community study require a real account - name, email, and a
 * profile picture - not just an anonymous guest session. Louis: people
 * showing up in community spaces should be people.
 */

import { supabase } from "./supabaseClient";

export type AccountGateState = {
  ok: boolean;
  userId: string | null;
  missing: { email: boolean; name: boolean; photo: boolean };
  displayName: string;
  profileImageUrl: string | null;
};

/** A real name: at least two words, like the comment section requires. */
export function hasFullName(value: string | null | undefined) {
  return Boolean(value && value.trim().split(/\s+/).length >= 2);
}

export async function checkFullAccount(): Promise<AccountGateState> {
  const empty: AccountGateState = {
    ok: false,
    userId: null,
    missing: { email: true, name: true, photo: true },
    displayName: "",
    profileImageUrl: null,
  };
  try {
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (!user) return empty;
    const hasEmail = Boolean(user.email);
    const { data: profile } = await supabase
      .from("profile_stats")
      .select("display_name, username, profile_image_url")
      .eq("user_id", user.id)
      .maybeSingle();
    const displayName = (profile?.display_name || profile?.username || "").trim();
    const name = hasFullName(displayName);
    const photo = Boolean(profile?.profile_image_url);
    return {
      ok: hasEmail && name && photo,
      userId: user.id,
      missing: { email: !hasEmail, name: !name, photo: !photo },
      displayName,
      profileImageUrl: (profile?.profile_image_url as string) || null,
    };
  } catch {
    return empty;
  }
}
