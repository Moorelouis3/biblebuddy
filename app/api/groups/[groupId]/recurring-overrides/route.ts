import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { canManageGroupScheduler } from "@/lib/groupSchedulerAccess";
import {
  isRecurringScheduleKey,
  normalizeRecurringOverridePayload,
} from "@/lib/groupRecurringOverrides";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function buildClients(request: NextRequest, groupId: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    throw new Error("Server not configured.");
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return { error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return { error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
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
    return { error: NextResponse.json({ error: "Forbidden." }, { status: 403 }) };
  }

  return { supabaseAdmin, user: userData.user };
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ groupId: string }> },
) {
  try {
    const { groupId } = await context.params;
    const clients = await buildClients(request, groupId);
    if ("error" in clients) return clients.error;

    const { data, error } = await clients.supabaseAdmin
      .from("group_recurring_post_overrides")
      .select("schedule_key, week_key, override_payload, updated_at")
      .eq("group_id", groupId);

    if (error) {
      throw new Error(error.message || "Could not load recurring post edits.");
    }

    return NextResponse.json({ rows: data || [] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load recurring post edits.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ groupId: string }> },
) {
  try {
    const { groupId } = await context.params;
    const clients = await buildClients(request, groupId);
    if ("error" in clients) return clients.error;

    const body = await request.json().catch(() => ({}));
    const scheduleKey = body?.scheduleKey;
    const weekKey = typeof body?.weekKey === "string" ? body.weekKey.trim() : "";

    if (!isRecurringScheduleKey(scheduleKey) || !weekKey) {
      return NextResponse.json({ error: "Missing recurring post details." }, { status: 400 });
    }

    const overridePayload = normalizeRecurringOverridePayload(scheduleKey, body?.overridePayload);
    if (!overridePayload) {
      return NextResponse.json({ error: "Could not save those recurring post edits." }, { status: 400 });
    }

    const { data, error } = await clients.supabaseAdmin
      .from("group_recurring_post_overrides")
      .upsert(
        {
          group_id: groupId,
          schedule_key: scheduleKey,
          week_key: weekKey,
          override_payload: overridePayload,
          created_by: clients.user.id,
        },
        { onConflict: "group_id,schedule_key,week_key" },
      )
      .select("schedule_key, week_key, override_payload, updated_at")
      .single();

    if (error) {
      throw new Error(error.message || "Could not save recurring post edits.");
    }

    return NextResponse.json({ row: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save recurring post edits.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ groupId: string }> },
) {
  try {
    const { groupId } = await context.params;
    const clients = await buildClients(request, groupId);
    if ("error" in clients) return clients.error;

    const body = await request.json().catch(() => ({}));
    const scheduleKey = body?.scheduleKey;
    const weekKey = typeof body?.weekKey === "string" ? body.weekKey.trim() : "";

    if (!isRecurringScheduleKey(scheduleKey) || !weekKey) {
      return NextResponse.json({ error: "Missing recurring post details." }, { status: 400 });
    }

    const { error } = await clients.supabaseAdmin
      .from("group_recurring_post_overrides")
      .delete()
      .eq("group_id", groupId)
      .eq("schedule_key", scheduleKey)
      .eq("week_key", weekKey);

    if (error) {
      throw new Error(error.message || "Could not reset recurring post edits.");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not reset recurring post edits.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
