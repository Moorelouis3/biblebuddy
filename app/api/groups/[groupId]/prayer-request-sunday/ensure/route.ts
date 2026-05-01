import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ensureWeeklyGroupSeriesPost } from "@/lib/weeklyGroupSeriesPostAdmin";
import { canManageGroupScheduler } from "@/lib/groupSchedulerAccess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ groupId: string }> },
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { groupId } = await context.params;

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const allowed = await canManageGroupScheduler(
    supabaseAdmin,
    groupId,
    userData.user.id,
    userData.user.email,
  );

  if (!allowed) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const targetDate = typeof body?.targetDate === "string" ? new Date(body.targetDate) : new Date();
    const result = await ensureWeeklyGroupSeriesPost(
      supabaseAdmin,
      groupId,
      "prayer_request_sunday",
      userData.user.id,
      targetDate,
      { force: body?.force === true },
    );
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not ensure Prayer Request Sunday.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
