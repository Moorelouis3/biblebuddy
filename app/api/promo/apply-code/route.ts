import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json(
        {
          error: "Invalid request format",
        },
        { status: 400 }
      );
    }

    const { code } = body;

    // Validate code exists
    if (!code || typeof code !== "string") {
      return NextResponse.json(
        {
          error: "Code is required",
        },
        { status: 400 }
      );
    }

    // Normalize code: trim whitespace and convert to uppercase
    const normalizedCode = code.trim().toUpperCase();

    console.log(`[PROMO_CODE] Received code request: "${normalizedCode}"`);

    // Check if code is valid (server-side only - never expose valid codes in frontend)
    const LIFETIME_PRO_CODE = "BIBLEBUDDY100OFF";
    const TRIAL_30_DAYS_CODE = "BIBLEBUDDY30DAYS";

    if (normalizedCode !== LIFETIME_PRO_CODE && normalizedCode !== TRIAL_30_DAYS_CODE) {
      console.log(`[PROMO_CODE] ❌ Invalid code: "${normalizedCode}"`);
      return NextResponse.json(
        {
          error: "Invalid code",
        },
        { status: 400 }
      );
    }

    console.log(`[PROMO_CODE] ✅ Valid code received: ${normalizedCode}`);

    // Check authentication
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            // Not needed for read-only auth check
          },
          remove(name: string, options: any) {
            // Not needed for read-only auth check
          },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error(`[PROMO_CODE] ❌ Authentication failed:`, authError?.message || "No user");
      return NextResponse.json(
        {
          error: "Unauthorized. Please log in to apply a code.",
        },
        { status: 401 }
      );
    }

    console.log(`[PROMO_CODE] ✅ User authenticated: ${user.id}`);

    // Create Supabase admin client to update profile_stats
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceKey || !url) {
      console.error(`[PROMO_CODE] ❌ Supabase service role key or URL not configured`);
      return NextResponse.json(
        {
          error: "Server configuration error",
        },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Determine update data based on code type
    let updateData: {
      user_id: string;
      is_paid: boolean;
      membership_status: string;
      member_badge?: string | null;
      pro_expires_at?: string | null;
    } = {
      user_id: user.id,
      is_paid: true,
      membership_status: "pro",
    };

    if (normalizedCode === TRIAL_30_DAYS_CODE) {
      // 30-day trial: set expiration date
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);
      updateData.pro_expires_at = expiresAt.toISOString();
      updateData.member_badge = "pro_trial";
      console.log(`[PROMO_CODE] 🔄 Updating membership_status to 'pro' with 30-day expiration for user ${user.id}`);
    } else {
      // Lifetime Pro: no expiration
      updateData.pro_expires_at = null;
      updateData.member_badge = null;
      console.log(`[PROMO_CODE] 🔄 Updating membership_status to 'pro' (lifetime) for user ${user.id}`);
    }
    
    const { error: updateError, data } = await supabaseAdmin
      .from("profile_stats")
      .upsert(updateData, {
        onConflict: "user_id",
      })
      .select("is_paid, membership_status, member_badge, pro_expires_at")
      .single();

    if (updateError) {
      console.error(`[PROMO_CODE] ❌ Failed to update membership_status:`, updateError);
      return NextResponse.json(
        {
          error: "Failed to apply code. Please try again.",
        },
        { status: 500 }
      );
    }

    const message = normalizedCode === TRIAL_30_DAYS_CODE
      ? "Pro unlocked for 30 days! Welcome to BibleBuddy Pro."
      : "Pro unlocked successfully! Welcome to BibleBuddy Pro.";

    console.log(`[PROMO_CODE] ✅ Successfully updated membership_status to 'pro' for user ${user.id}`);

    return NextResponse.json(
      {
        success: true,
        message,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[PROMO_CODE] ❌ Unexpected error:", err);
    return NextResponse.json(
      {
        error: process.env.NODE_ENV === "development"
          ? `Error: ${err.message || "Unknown error"}`
          : "An error occurred while applying the code. Please try again.",
      },
      { status: 500 }
    );
  }
}
