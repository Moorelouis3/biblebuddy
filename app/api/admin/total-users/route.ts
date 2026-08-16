import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * The user count.
 *
 * The model, deliberately simple:
 *
 *     TOTAL USERS  =  registered  +  guests
 *
 * The moment someone lands in Bible Buddy they are a real user and they count.
 * Underneath that they are either a guest or registered. When a guest signs up
 * they move from one side to the other and TOTAL does not change — because
 * signing up attaches an email to the SAME Supabase user, it does not create a
 * second one.
 *
 * Supabase Auth is the source of truth, not profile_stats. Two reasons:
 *
 *   1. `is_anonymous` on the auth user is the only reliable guest marker. The
 *      guest columns the app tries to write (account_type, guest_started_at,
 *      converted_from_guest_at) DO NOT EXIST on profile_stats, so those writes
 *      silently fall back and the label is lost.
 *   2. Roughly 700 auth users have no profile_stats row at all. Counting from
 *      profile_stats loses them.
 *
 * A previous version counted `registeredUsers` as "has a profile row AND a
 * display name", which dropped ~700 real people and meant guests + registered
 * never summed to total. Profile completeness is a genuinely useful number, so
 * it is still reported — as `profilesCompleted`, separate from the headline.
 */

type AuthUser = {
  id?: string;
  email?: string | null;
  is_anonymous?: boolean;
  identities?: unknown[];
  created_at?: string;
};

function isGuest(user: AuthUser) {
  return (
    Boolean(user?.is_anonymous) ||
    (!user?.email && (!Array.isArray(user?.identities) || user.identities.length === 0))
  );
}

export async function GET() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  let totalUsers = 0;
  let guestUsers = 0;
  const registeredIds: string[] = [];

  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;
  let newLast24h = 0;
  let newLast7d = 0;

  let page = 1;
  const perPage = 1000;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${url}/auth/v1/admin/users?page=${page}&per_page=${perPage}`, {
      headers: { apiKey: serviceKey, Authorization: `Bearer ${serviceKey}` },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }

    const json = await response.json();
    const users: AuthUser[] = Array.isArray(json.users) ? json.users : [];
    totalUsers += users.length;

    for (const user of users) {
      if (isGuest(user)) {
        guestUsers += 1;
      } else if (typeof user.id === "string") {
        registeredIds.push(user.id);
      }

      const created = user.created_at ? Date.parse(user.created_at) : NaN;
      if (!Number.isNaN(created)) {
        if (now - created <= DAY) newLast24h += 1;
        if (now - created <= 7 * DAY) newLast7d += 1;
      }
    }

    hasMore = users.length === perPage;
    page += 1;
  }

  // Everyone who is not a guest is registered. This is what makes the two
  // numbers add up to the total.
  const registeredUsers = registeredIds.length;

  // Secondary quality metrics — never subtracted from the headline count.
  let profilesCompleted = 0;
  let upgradedUsers = 0;

  try {
    const admin = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    for (let i = 0; i < registeredIds.length; i += 500) {
      const batch = registeredIds.slice(i, i + 500);
      const { data: profiles } = await admin
        .from("profile_stats")
        .select("user_id, display_name, username, is_paid")
        .in("user_id", batch);

      for (const profile of profiles || []) {
        const displayName = typeof profile.display_name === "string" ? profile.display_name.trim() : "";
        const username = typeof profile.username === "string" ? profile.username.trim() : "";
        if (displayName || username) profilesCompleted += 1;
        if (profile.is_paid) upgradedUsers += 1;
      }
    }
  } catch (error) {
    console.warn("[TOTAL_USERS] Could not read profile_stats:", error);
  }

  return NextResponse.json({
    // Headline: these two always sum to totalUsers.
    totalUsers,
    registeredUsers,
    guestUsers,

    // Secondary.
    profilesCompleted,
    upgradedUsers,
    newLast24h,
    newLast7d,

    // Kept for existing callers.
    freeAccounts: Math.max(0, registeredUsers - upgradedUsers),
    totalPeopleReached: totalUsers,
  });
}
