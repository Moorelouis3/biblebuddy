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
    const VALID_CODE = "BIBLEBUDDY100OFF";

    if (normalizedCode !== VALID_CODE) {
      console.log(`[PROMO_CODE] ❌ Invalid code: "${normalizedCode}"`);
      return NextResponse.json(
        {
          error: "Invalid code",
        },
        { status: 400 }
      );
    }

    console.log(`[PROMO_CODE] ✅ Valid code received`);

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

    // Update membership_status to 'pro'
    console.log(`[PROMO_CODE] 🔄 Updating membership_status to 'pro' for user ${user.id}`);
    
    const { error: updateError, data } = await supabaseAdmin
      .from("profile_stats")
      .upsert(
        {
          user_id: user.id,
          membership_status: "pro",
        },
        {
          onConflict: "user_id",
        }
      )
      .select("membership_status")
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

    console.log(`[PROMO_CODE] ✅ Successfully updated membership_status to 'pro' for user ${user.id}`);

    return NextResponse.json(
      {
        success: true,
        message: "Pro unlocked successfully!",
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
