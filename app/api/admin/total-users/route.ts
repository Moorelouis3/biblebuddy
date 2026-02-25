import { NextResponse } from "next/server";

export async function GET() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  let totalUsers = 0;
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

    totalUsers += json.users.length;

    hasMore = json.users.length === perPage;
    page++;
  }

  return NextResponse.json({ totalUsers });
}