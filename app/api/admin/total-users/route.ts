import { NextResponse } from "next/server";

export async function GET() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  let totalUsers = 0;
  let guestUsers = 0;
  let registeredUsers = 0;
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
        registeredUsers += 1;
      }
    }

    hasMore = users.length === perPage;
    page++;
  }

  return NextResponse.json({ totalUsers, guestUsers, registeredUsers, totalPeopleReached: totalUsers });
}
