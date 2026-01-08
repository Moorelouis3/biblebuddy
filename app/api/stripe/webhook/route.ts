import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("⚠️ STRIPE_SECRET_KEY is not set in environment variables!");
}

let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-12-15.clover",
  });
}

// Initialize Supabase client with service role (bypasses RLS)
function getSupabaseAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceKey || !url) {
    throw new Error("Supabase service role key or URL is not configured");
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Helper function to update membership status
// Only updates existing rows, does not create duplicates
async function updateMembershipStatus(
  userId: string,
  status: "free" | "pro"
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(`[WEBHOOK] 🔄 Updating membership_status for user ${userId}: → ${status}`);

    const supabase = getSupabaseAdminClient();

    // First check if the user exists in profile_stats
    const { data: existingUser, error: checkError } = await supabase
      .from("profile_stats")
      .select("user_id, membership_status")
      .eq("user_id", userId)
      .maybeSingle();

    if (checkError) {
      console.error(`[WEBHOOK] ❌ Failed to check existing user:`, checkError);
      return { success: false, error: checkError.message };
    }

    // If user doesn't exist, log and skip (don't create new rows)
    if (!existingUser) {
      console.warn(`[WEBHOOK] ⚠️ User ${userId} does not exist in profile_stats. Skipping update.`);
      return { success: false, error: "User does not exist in profile_stats" };
    }

    // Only update if status is different (avoid unnecessary updates)
    if (existingUser.membership_status === status) {
      console.log(`[WEBHOOK] ℹ️ User ${userId} already has membership_status = ${status}. No update needed.`);
      return { success: true };
    }

    // Update only existing row
    const { error } = await supabase
      .from("profile_stats")
      .update({ membership_status: status })
      .eq("user_id", userId);

    if (error) {
      console.error(`[WEBHOOK] ❌ Failed to update membership_status:`, error);
      return { success: false, error: error.message };
    }

    console.log(
      `[WEBHOOK] ✅ Successfully updated membership_status: ${existingUser.membership_status} → ${status} for user ${userId}`
    );
    return { success: true };
  } catch (err: any) {
    console.error(`[WEBHOOK] ❌ Error updating membership_status:`, err);
    return { success: false, error: err.message };
  }
}

// Helper function to extract user_id from subscription metadata or customer metadata
async function extractUserIdFromSubscription(
  subscription: Stripe.Subscription,
  stripe: Stripe
): Promise<string | null> {
  // Try subscription metadata first
  if (subscription.metadata?.user_id) {
    return subscription.metadata.user_id;
  }

  // Fallback to customer metadata
  if (typeof subscription.customer === "string") {
    try {
      const customer = await stripe.customers.retrieve(subscription.customer);
      if (!customer.deleted && "metadata" in customer && customer.metadata?.user_id) {
        return customer.metadata.user_id;
      }
    } catch (err) {
      console.error("[WEBHOOK] ❌ Error retrieving customer:", err);
    }
  }

  return null;
}

// Map Stripe subscription status to membership_status
function mapSubscriptionStatusToMembership(
  stripeStatus: string
): "free" | "pro" | null {
  // Active subscriptions → Pro
  if (stripeStatus === "active" || stripeStatus === "trialing") {
    return "pro";
  }

  // Past due → Keep as Pro (grace period)
  if (stripeStatus === "past_due") {
    return "pro";
  }

  // Cancelled/Unpaid/Expired/Paused → Free
  if (
    stripeStatus === "canceled" ||
    stripeStatus === "unpaid" ||
    stripeStatus === "incomplete_expired" ||
    stripeStatus === "paused"
  ) {
    return "free";
  }

  // Unknown status → null (don't update)
  return null;
}

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe is initialized
    if (!stripe) {
      console.error("Stripe is not configured");
      return NextResponse.json(
        {
          error: "Stripe is not configured. Please check your environment variables.",
        },
        { status: 500 }
      );
    }

    // Check for webhook secret
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("⚠️ STRIPE_WEBHOOK_SECRET is not set in environment variables!");
      return NextResponse.json(
        {
          error: "Webhook secret is not configured. Please set STRIPE_WEBHOOK_SECRET.",
        },
        { status: 500 }
      );
    }

    // Get raw body (required for Stripe signature verification)
    const rawBody = await req.text();

    // Get Stripe signature from headers
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json(
        {
          error: "Missing stripe-signature header",
        },
        { status: 400 }
      );
    }

    // Verify the event
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      console.log(`[WEBHOOK] ✅ Event verified: ${event.type} (${event.id})`);
    } catch (err: any) {
      console.error("[WEBHOOK] ❌ Webhook signature verification failed:", err.message);
      return NextResponse.json(
        {
          error: `Webhook signature verification failed: ${err.message}`,
        },
        { status: 400 }
      );
    }

    // Handle ONLY subscription events (ignore all others)
    if (
      event.type !== "customer.subscription.created" &&
      event.type !== "customer.subscription.updated" &&
      event.type !== "customer.subscription.deleted"
    ) {
      // Log ignored events for debugging
      console.log(`[WEBHOOK] ℹ️ Ignoring event type: ${event.type} (${event.id})`);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Handle subscription events
    const subscription = event.data.object as Stripe.Subscription;
    console.log(`[WEBHOOK] 📦 ${event.type}:`, {
      event_id: event.id,
      subscription_id: subscription.id,
      customer_id: subscription.customer,
      status: subscription.status,
      metadata: subscription.metadata,
    });

    // Extract user_id from subscription or customer metadata
    const userId = await extractUserIdFromSubscription(subscription, stripe);

    if (!userId) {
      console.error(
        `[WEBHOOK] ❌ No user_id found in subscription or customer metadata for event ${event.type} (${event.id})`
      );
      // Return 200 OK even if user_id not found (to prevent Stripe retries)
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Map Stripe subscription status to membership_status
    const membershipStatus = mapSubscriptionStatusToMembership(subscription.status);

    if (membershipStatus === null) {
      console.warn(
        `[WEBHOOK] ⚠️ Unknown subscription status "${subscription.status}" for subscription ${subscription.id}. No membership update.`
      );
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Update membership status
    console.log(
      `[WEBHOOK] 📊 Status mapping: subscription.status="${subscription.status}" → membership_status="${membershipStatus}"`
    );
    const result = await updateMembershipStatus(userId, membershipStatus);

    if (!result.success) {
      console.error(`[WEBHOOK] ❌ Failed to update membership_status:`, result.error);
      // Still return 200 OK to prevent Stripe retries for permanent errors
      // (user doesn't exist, etc.)
      return NextResponse.json({ received: true }, { status: 200 });
    }

    console.log(
      `[WEBHOOK] ✅ Successfully processed ${event.type}: user ${userId} → ${membershipStatus}`
    );

    // Return 200 OK to acknowledge receipt
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      {
        error: process.env.NODE_ENV === "development"
          ? `Webhook error: ${err.message || "Unknown error"}`
          : "Webhook processing failed",
      },
      { status: 500 }
    );
  }
}

// Disable body parsing to get raw body for Stripe signature verification
export const runtime = "nodejs";
