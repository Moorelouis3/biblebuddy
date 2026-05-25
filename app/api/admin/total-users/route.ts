import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  let totalUsers = 0;
  let guestUsers = 0;
  let registeredUsers = 0;
  let upgradedUsers = 0;
  const registeredCandidateIds: string[] = [];
  let page = 1;
  const perPage = 1000;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `${url}/auth/v1/admin/users?page=${page}&per_page=${perPage}`,
      {
        headers: {
          apiKey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 }
      );
    }

    const json = await response.json();

    const users = Array.isArray(json.users) ? json.users : [];
    totalUsers += users.length;
    for (const user of users) {
      const isAnonymous = Boolean(user?.is_anonymous) || (!user?.email && (!Array.isArray(user?.identities) || user.identities.length === 0));
      if (isAnonymous) {
        guestUsers += 1;
      } else {
        const id = typeof user?.id === "string" ? user.id : "";
        if (id && user?.email) registeredCandidateIds.push(id);
      }
    }

    hasMore = users.length === perPage;
    page++;
  }

  const realRegisteredUserIds = new Set<string>();
  const upgradedUserIds = new Set<string>();

  try {
    const admin = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    for (let index = 0; index < registeredCandidateIds.length; index += 500) {
      const batch = registeredCandidateIds.slice(index, index + 500);
      const { data: profiles } = await admin
        .from("profile_stats")
        .select("user_id, display_name, username, is_paid")
        .in("user_id", batch);

      for (const profile of profiles || []) {
        const userId = typeof profile.user_id === "string" ? profile.user_id : "";
        const displayName = typeof profile.display_name === "string" ? profile.display_name.trim() : "";
        const username = typeof profile.username === "string" ? profile.username.trim() : "";
        if (!userId || (!displayName && !username)) continue;
        realRegisteredUserIds.add(userId);
        if (profile.is_paid) upgradedUserIds.add(userId);
      }
    }
  } catch (error) {
    console.warn("[TOTAL_USERS] Could not count registered profile users:", error);
  }

  registeredUsers = realRegisteredUserIds.size;
  upgradedUsers = upgradedUserIds.size;
  const freeAccounts = Math.max(0, registeredUsers - upgradedUsers);

  return NextResponse.json({
    totalUsers,
    guestUsers,
    registeredUsers,
    freeAccounts,
    upgradedUsers,
    totalPeopleReached: totalUsers,
  });
}
