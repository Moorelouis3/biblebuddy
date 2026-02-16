// lib/checkProExpiration.ts
// Utility to check if Pro access has expired and revert to Free if needed

import { createClient } from "@supabase/supabase-js";

export async function checkProExpiration(userId: string): Promise<void> {
  try {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceKey || !url) {
      return;
    }

    const supabaseAdmin = createClient(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Get current membership status and expiration
    const { data: profileStats, error: fetchError } = await supabaseAdmin
      .from("profile_stats")
      .select("membership_status, pro_expires_at")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      return;
    }

    if (!profileStats) {
      return; // No profile stats, nothing to check
    }

    // Only check expiration if user is currently Pro
    if (profileStats.membership_status !== "pro") {
      return; // Not Pro, nothing to expire
    }

    // If no expiration date, user has permanent Pro (lifetime code or Stripe)
    if (!profileStats.pro_expires_at) {
      return; // No expiration, keep Pro
    }

    // Check if expiration date has passed
    const expirationDate = new Date(profileStats.pro_expires_at);
    const now = new Date();

    if (now > expirationDate) {
      // Expiration has passed, revert to Free
      console.log(`[PRO_EXPIRATION] Pro access expired for user ${userId}, reverting to Free`);
      
      const { error: updateError } = await supabaseAdmin
        .from("profile_stats")
        .update({
          membership_status: "free",
          pro_expires_at: null, // Clear expiration since it's no longer relevant
        })
        .eq("user_id", userId);

      if (updateError) {
        return;
      }
    }
  } catch (_err: unknown) {
    return;
  }
}

