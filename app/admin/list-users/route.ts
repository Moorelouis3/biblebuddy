import { NextResponse } from "next/server";

export async function GET() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceKey || !url) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const res = await fetch(`${url}/auth/v1/admin/users`, {
    headers: {
      apiKey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
  });

  const json = await res.json();

  return NextResponse.json({ users: json.users ?? [] });
}
