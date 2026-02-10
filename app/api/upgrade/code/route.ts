import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

type UpgradeCodeRequest = {
  code?: string;
};

export async function POST(req: NextRequest) {
  let body: UpgradeCodeRequest;
  try {
    body = (await req.json()) as UpgradeCodeRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }

  const code =
    typeof body.code === "string" ? body.code.trim().toUpperCase() : "";
  if (code !== "BBP4LIFE") {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceKey || !url) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const supabaseAdmin = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    console.log("[UPGRADE_CODE] Updating is_paid for user_id:", user.id);
    const { data, error } = await supabaseAdmin
      .from("profile_stats")
      .update({ is_paid: true })
      .eq("user_id", user.id)
      .select("user_id")
      .maybeSingle();

    if (error) {
      console.error("[UPGRADE_CODE] Failed to update profile_stats:", error);
      return NextResponse.json(
        { error: "Failed to apply code" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[UPGRADE_CODE] Unexpected error:", err);
    return NextResponse.json(
      { error: "Failed to apply code" },
      { status: 500 }
    );
  }
}
