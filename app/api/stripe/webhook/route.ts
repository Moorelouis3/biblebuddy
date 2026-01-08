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
// Uses upsert to create row if it doesn't exist
async function updateMembershipStatus(
  userId: string,
  status: "free" | "pro"
): Promise<{ success: boolean; error?: string; currentStatus?: string }> {
  try {
    console.log(`[WEBHOOK] 🔄 Updating membership_status for user ${userId}: → ${status}`);

    const supabase = getSupabaseAdminClient();

    // First check current status
    const { data: existingUser, error: checkError } = await supabase
      .from("profile_stats")
      .select("user_id, membership_status")
      .eq("user_id", userId)
      .maybeSingle();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows returned (not an error)
      console.error(`[WEBHOOK] ❌ Failed to check existing user:`, checkError);
      return { success: false, error: checkError.message };
    }

    const currentStatus = existingUser?.membership_status || null;

    // Only update if status is different
    if (currentStatus === status) {
      console.log(`[WEBHOOK] ℹ️ User ${userId} already has membership_status = ${status}. No update needed.`);
      return { success: true, currentStatus };
    }

    // Upsert to update existing or create new row
    const { error, data } = await supabase
      .from("profile_stats")
      .upsert(
        {
          user_id: userId,
          membership_status: status,
        },
        {
          onConflict: "user_id",
        }
      )
      .select("membership_status")
      .single();

    if (error) {
      console.error(`[WEBHOOK] ❌ Failed to upsert membership_status:`, error);
      console.error(`[WEBHOOK] Error details:`, JSON.stringify(error, null, 2));
      return { success: false, error: error.message };
    }

    console.log(
      `[WEBHOOK] ✅ Successfully updated membership_status: ${currentStatus || "null"} → ${status} for user ${userId}`
    );
    return { success: true, currentStatus: data?.membership_status || status };
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
    console.log(`[WEBHOOK] Found user_id in subscription metadata: ${subscription.metadata.user_id}`);
    return subscription.metadata.user_id;
  }

  // Fallback to customer metadata
  if (typeof subscription.customer === "string") {
    try {
      const customer = await stripe.customers.retrieve(subscription.customer);
      if (!customer.deleted && "metadata" in customer && customer.metadata?.user_id) {
        console.log(`[WEBHOOK] Found user_id in customer metadata: ${customer.metadata.user_id}`);
        return customer.metadata.user_id;
      }
    } catch (err) {
      console.error("[WEBHOOK] ❌ Error retrieving customer:", err);
    }
  }

  console.warn(`[WEBHOOK] ⚠️ Could not extract user_id from subscription ${subscription.id}`);
  return null;
}

// Helper function to extract user_id from invoice (via subscription)
async function extractUserIdFromInvoice(
  invoice: Stripe.Invoice,
  stripe: Stripe
): Promise<string | null> {
  // Try invoice metadata first
  if (invoice.metadata?.user_id) {
    console.log(`[WEBHOOK] Found user_id in invoice metadata: ${invoice.metadata.user_id}`);
    return invoice.metadata.user_id;
  }

  // If invoice has subscription, get user_id from subscription
  if (
    "subscription" in invoice &&
    typeof invoice.subscription === "string"
  ) {
    try {
      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription
      );
      return await extractUserIdFromSubscription(subscription, stripe);
    } catch (err) {
      console.error("[WEBHOOK] ❌ Error retrieving subscription from invoice:", err);
    }
  }

  // Fallback to customer metadata
  if (invoice.customer && typeof invoice.customer === "string") {
    try {
      const customer = await stripe.customers.retrieve(invoice.customer);
      if (!customer.deleted && "metadata" in customer && customer.metadata?.user_id) {
        console.log(`[WEBHOOK] Found user_id in invoice customer metadata: ${customer.metadata.user_id}`);
        return customer.metadata.user_id;
      }
    } catch (err) {
      console.error("[WEBHOOK] ❌ Error retrieving customer from invoice:", err);
    }
  }

  console.warn(`[WEBHOOK] ⚠️ Could not extract user_id from invoice ${invoice.id}`);
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

    // Handle specific events
    let userId: string | null = null;
    let membershipStatus: "free" | "pro" | null = null;
    let eventHandled = false;

    // Use string comparison instead of switch to avoid TypeScript strict type checking
    const eventType = event.type as string;

    if (eventType === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[WEBHOOK] 📦 checkout.session.completed:`, {
          event_id: event.id,
          session_id: session.id,
          mode: session.mode,
          customer_email: session.customer_email,
          metadata: session.metadata,
        });

      // Extract user_id from metadata
      userId = session.metadata?.user_id || null;

      if (!userId) {
        console.error(`[WEBHOOK] ❌ No user_id found in checkout session metadata for event ${event.id}`);
      } else if (session.mode === "subscription") {
        // Only upgrade if this was a subscription checkout
        membershipStatus = "pro";
        eventHandled = true;
      }
    } else if (eventType === "customer.subscription.created") {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[WEBHOOK] 📦 customer.subscription.created:`, {
        event_id: event.id,
        subscription_id: subscription.id,
        customer_id: subscription.customer,
        status: subscription.status,
        metadata: subscription.metadata,
      });

      userId = await extractUserIdFromSubscription(subscription, stripe);

      if (!userId) {
        console.error(`[WEBHOOK] ❌ No user_id found for subscription.created event ${event.id}`);
      } else {
        // Map subscription status to membership
        membershipStatus = mapSubscriptionStatusToMembership(subscription.status);
        eventHandled = true;
      }
    } else if (eventType === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[WEBHOOK] 📦 customer.subscription.updated:`, {
        event_id: event.id,
        subscription_id: subscription.id,
        customer_id: subscription.customer,
        status: subscription.status,
        metadata: subscription.metadata,
      });

      userId = await extractUserIdFromSubscription(subscription, stripe);

      if (!userId) {
        console.error(`[WEBHOOK] ❌ No user_id found for subscription.updated event ${event.id}`);
      } else {
        // Map subscription status to membership
        membershipStatus = mapSubscriptionStatusToMembership(subscription.status);
        eventHandled = true;
      }
    } else if (eventType === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[WEBHOOK] 📦 customer.subscription.deleted:`, {
        event_id: event.id,
        subscription_id: subscription.id,
        customer_id: subscription.customer,
        status: subscription.status,
        metadata: subscription.metadata,
      });

      userId = await extractUserIdFromSubscription(subscription, stripe);

      if (!userId) {
        console.error(`[WEBHOOK] ❌ No user_id found for subscription.deleted event ${event.id}`);
      } else {
        // Always downgrade to free when subscription is deleted
        membershipStatus = "free";
        eventHandled = true;
      }
    } else if (eventType === "invoice.payment.paid") {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`[WEBHOOK] 📦 invoice.payment.paid:`, {
        event_id: event.id,
        invoice_id: invoice.id,
        customer_id: invoice.customer,
        subscription_id: invoice.subscription,
        metadata: invoice.metadata,
      });

      // Extract user_id from invoice (via subscription or customer metadata)
      userId = await extractUserIdFromInvoice(invoice, stripe);

      if (userId) {
        // Payment successful - ensure Pro status
        membershipStatus = "pro";
        eventHandled = true;
      }
    } else if (eventType === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = typeof invoice.subscription === "string" ? invoice.subscription : null;
      console.log(`[WEBHOOK] 📦 invoice.payment_failed:`, {
        event_id: event.id,
        invoice_id: invoice.id,
        customer_id: invoice.customer,
        subscription_id: subscriptionId,
        metadata: invoice.metadata,
      });

      // Extract user_id from invoice (via subscription or customer metadata)
      userId = await extractUserIdFromInvoice(invoice, stripe);

      if (userId) {
        // Payment failed - downgrade to free
        membershipStatus = "free";
        eventHandled = true;
      }
    } else {
      // Log unhandled events but return 200 OK
      console.log(`[WEBHOOK] ℹ️ Ignoring event type: ${eventType} (${event.id})`);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // If event was handled, update membership status
    if (eventHandled) {
      if (!userId) {
        console.error(`[WEBHOOK] ❌ Event ${event.type} (${event.id}) was handled but user_id is missing`);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      if (membershipStatus === null) {
        console.warn(`[WEBHOOK] ⚠️ Event ${event.type} (${event.id}) was handled but membershipStatus is null`);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      // Update membership status
      console.log(
        `[WEBHOOK] 📊 Updating membership: user ${userId}, event ${event.type} → membership_status="${membershipStatus}"`
      );
      const result = await updateMembershipStatus(userId, membershipStatus);

      if (!result.success) {
        console.error(`[WEBHOOK] ❌ Failed to update membership_status:`, result.error);
        // Still return 200 OK to prevent Stripe retries
        return NextResponse.json({ received: true }, { status: 200 });
      }

      console.log(`[WEBHOOK] ✅ Successfully processed ${event.type}: user ${userId} → ${membershipStatus}`);
    } else {
      console.log(`[WEBHOOK] ℹ️ Event ${event.type} (${event.id}) was not handled (missing user_id or status)`);
    }

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
