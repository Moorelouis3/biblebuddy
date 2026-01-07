import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceKey || !url) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    // Create Supabase client with service role key for admin queries
    const supabase = createClient(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Query auth.users via admin API with pagination
    let totalUsers = 0;
    let page = 1;
    const perPage = 1000; // Max per page
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
        console.error("[TOTAL_USERS] Error fetching users:", response.statusText);
        break;
      }

      const data = await response.json();
      const users = data?.users || [];
      totalUsers += users.length;

      // Check if there are more pages
      const totalPages = Math.ceil((data?.total || 0) / perPage);
      hasMore = page < totalPages && users.length === perPage;
      page++;

      // Safety limit: stop after 10 pages (10,000 users)
      if (page > 10) {
        break;
      }
    }

    return NextResponse.json({ totalUsers });
  } catch (error: any) {
    console.error("[TOTAL_USERS] Unexpected error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

