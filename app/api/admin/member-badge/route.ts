import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normalizeCustomMemberBadge } from "@/lib/userBadges";
import { markUserAsPaidAndTrackUpgrade } from "@/lib/server/upgradeTracking";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

export async function POST(request: NextRequest) {
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

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user || userData.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const targetUserId = typeof body?.userId === "string" ? body.userId : "";
  const normalizedBadge = normalizeCustomMemberBadge(body?.memberBadge);
  const shouldForcePaid =
    normalizedBadge === "founder_buddy" ||
    normalizedBadge === "moderator";

  if (!targetUserId) {
    return NextResponse.json({ error: "Missing userId." }, { status: 400 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const now = new Date();
  const trialExpiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  if (normalizedBadge === "pro_trial") {
    try {
      await markUserAsPaidAndTrackUpgrade({
        supabase: supabaseAdmin,
        userId: targetUserId,
        source: "admin_pro_trial",
        membershipStatus: "pro",
        proExpiresAt: trialExpiresAt.toISOString(),
        actionLabel: "Admin 30-day Pro trial assigned",
      });

      const { error: badgeError } = await supabaseAdmin
        .from("profile_stats")
        .update({
          member_badge: "pro_trial",
          updated_at: now.toISOString(),
        })
        .eq("user_id", targetUserId);

      if (badgeError) {
        return NextResponse.json({ error: badgeError.message || "Could not save badge." }, { status: 500 });
      }
    } catch (error: any) {
      return NextResponse.json({ error: error?.message || "Could not start Pro trial." }, { status: 500 });
    }
  } else {
  const { error } = await supabaseAdmin
    .from("profile_stats")
    .upsert(
      {
        user_id: targetUserId,
        member_badge: normalizedBadge,
        is_paid: shouldForcePaid ? true : undefined,
        membership_status: shouldForcePaid ? "pro" : undefined,
        pro_expires_at: shouldForcePaid ? null : undefined,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

  if (error) {
    return NextResponse.json({ error: error.message || "Could not save badge." }, { status: 500 });
  }
  }

  // If assigning buddy_partner, auto-create ambassador_profile if needed
  if (normalizedBadge === "buddy_partner") {
    const { data: existing } = await supabaseAdmin
      .from("ambassador_profiles")
      .select("id")
      .eq("user_id", targetUserId)
      .maybeSingle();

    if (!existing) {
      const { data: profile } = await supabaseAdmin
        .from("profile_stats")
        .select("username, display_name")
        .eq("user_id", targetUserId)
        .maybeSingle();

      const baseName = (profile?.username ?? profile?.display_name ?? "BUDDY")
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 8);
      const suffix = Math.floor(10 + Math.random() * 90);
      const referralCode = `${baseName}${suffix}`;

      await supabaseAdmin.from("ambassador_profiles").insert({
        user_id: targetUserId,
        referral_code: referralCode,
        is_active: true,
      });
    } else {
      await supabaseAdmin
        .from("ambassador_profiles")
        .update({ is_active: true })
        .eq("user_id", targetUserId);
    }
  } else {
    // Deactivate ambassador profile when badge is removed
    await supabaseAdmin
      .from("ambassador_profiles")
      .update({ is_active: false })
      .eq("user_id", targetUserId);
  }

  return NextResponse.json({
    ok: true,
    memberBadge: normalizedBadge,
    isPaid: shouldForcePaid ? true : null,
    proExpiresAt: normalizedBadge === "pro_trial" ? trialExpiresAt.toISOString() : null,
  });
}
