import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { betaToday, readBetaRun, type BetaCheck } from "@/lib/androidBetaRun";

/**
 * The Android beta tester count, recorded by hand.
 *
 * Louis, 2026-11-04: "we need to have a running list on the app anlytics page
 * where it has the users and all that so i know".
 *
 * It is typed in rather than fetched because there is nothing to fetch.
 * Google publishes the opted-in count on one Play Console screen, hides it
 * again the moment it passes twelve, and exposes no API for it - the Play
 * Developer API's testers resource manages who may join, not how many have.
 * So the number is read off that screen and posted here, and the history
 * does the work Google's console will not.
 *
 * GET   the readings and what they add up to
 * POST  { optedIn, groupMembers?, note? }  records today
 *
 * Auth: Bearer access token of the signed-in owner, same as the other admin
 * APIs here. The table has no RLS policies at all, so the service role below
 * is the only way in.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return null;
  const admin = getAdminClient();
  if (!admin) return null;
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  if ((data.user.email || "").toLowerCase() !== ADMIN_EMAIL) return null;
  return admin;
}

async function loadRun(admin: NonNullable<ReturnType<typeof getAdminClient>>) {
  const { data, error } = await admin
    .from("android_beta_checks")
    .select("checked_on, opted_in, group_members, note")
    .order("checked_on", { ascending: true });
  if (error) throw new Error(error.message);
  return readBetaRun((data || []) as BetaCheck[]);
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json({ ok: true, run: await loadRun(admin) });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json().catch(() => null)) as
    | { optedIn?: unknown; groupMembers?: unknown; note?: unknown; checkedOn?: unknown }
    | null;

  const optedIn = Number(body?.optedIn);
  if (!Number.isInteger(optedIn) || optedIn < 0) {
    return NextResponse.json({ error: "optedIn must be a whole number." }, { status: 400 });
  }
  const groupMembersRaw = body?.groupMembers;
  const groupMembers =
    groupMembersRaw === undefined || groupMembersRaw === null || groupMembersRaw === ""
      ? null
      : Number(groupMembersRaw);
  if (groupMembers !== null && (!Number.isInteger(groupMembers) || groupMembers < 0)) {
    return NextResponse.json({ error: "groupMembers must be a whole number." }, { status: 400 });
  }

  // Backdating is allowed so a missed day can be filled in from memory, but
  // only backwards - a reading dated in the future would invent continuity.
  const today = betaToday();
  const checkedOn = typeof body?.checkedOn === "string" && body.checkedOn ? body.checkedOn : today;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkedOn) || checkedOn > today) {
    return NextResponse.json({ error: "checkedOn must be today or earlier." }, { status: 400 });
  }

  // Keyed by date, so checking twice in one day corrects that day rather than
  // adding a second reading that would read as a dip.
  const { error } = await admin.from("android_beta_checks").upsert(
    {
      checked_on: checkedOn,
      opted_in: optedIn,
      group_members: groupMembers,
      note: typeof body?.note === "string" && body.note.trim() ? body.note.trim().slice(0, 300) : null,
    },
    { onConflict: "checked_on" },
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  try {
    return NextResponse.json({ ok: true, run: await loadRun(admin) });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
