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
async function updateMembershipStatus(
  userId: string,
  status: "free" | "pro"
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(`[WEBHOOK] Updating membership_status for user ${userId} to ${status}`);

    const supabase = getSupabaseAdminClient();

    // Upsert profile_stats to update membership_status
    const { error } = await supabase
      .from("profile_stats")
      .upsert(
        {
          user_id: userId,
          membership_status: status,
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      console.error(`[WEBHOOK] ❌ Failed to update membership_status:`, error);
      return { success: false, error: error.message };
    }

    console.log(`[WEBHOOK] ✅ Successfully updated membership_status to ${status} for user ${userId}`);
    return { success: true };
  } catch (err: any) {
    console.error(`[WEBHOOK] ❌ Error updating membership_status:`, err);
    return { success: false, error: err.message };
  }
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

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`[WEBHOOK] 📦 checkout.session.completed:`, {
          event_id: event.id,
          session_id: session.id,
          customer_email: session.customer_email,
          metadata: session.metadata,
        });

        // Extract user_id from metadata
        const userId = session.metadata?.user_id;
        if (!userId) {
          console.error("[WEBHOOK] ❌ No user_id found in checkout session metadata");
          break;
        }

        // Only upgrade if this was a subscription checkout
        if (session.mode === "subscription") {
          await updateMembershipStatus(userId, "pro");
        }
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[WEBHOOK] 📦 customer.subscription.created:`, {
          event_id: event.id,
          subscription_id: subscription.id,
          customer_id: subscription.customer,
          status: subscription.status,
          metadata: subscription.metadata,
        });

        // Extract user_id from metadata (set during checkout)
        const userId = subscription.metadata?.user_id;
        if (!userId) {
          console.error("[WEBHOOK] ⚠️ No user_id found in subscription metadata");
          // Note: checkout.session.completed should have already upgraded the user
          // This event is logged but user is likely already upgraded
          break;
        }

        // Only upgrade if subscription is active or trialing
        if (subscription.status === "active" || subscription.status === "trialing") {
          await updateMembershipStatus(userId, "pro");
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[WEBHOOK] 📦 customer.subscription.updated:`, {
          event_id: event.id,
          subscription_id: subscription.id,
          customer_id: subscription.customer,
          status: subscription.status,
          metadata: subscription.metadata,
        });

        // Extract user_id from metadata
        let userId = subscription.metadata?.user_id;

        // If not in subscription metadata, try to get from customer metadata
        if (!userId && typeof subscription.customer === "string") {
          try {
            const customer = await stripe.customers.retrieve(subscription.customer);
            if (!customer.deleted && "metadata" in customer) {
              userId = customer.metadata?.user_id;
            }
          } catch (err) {
            console.error("[WEBHOOK] ❌ Error retrieving customer:", err);
          }
        }

        if (!userId) {
          console.error("[WEBHOOK] ⚠️ No user_id found in subscription or customer metadata");
          break;
        }

        // Update membership based on subscription status
        if (subscription.status === "active" || subscription.status === "trialing") {
          await updateMembershipStatus(userId, "pro");
        } else if (
          subscription.status === "canceled" ||
          subscription.status === "unpaid" ||
          subscription.status === "past_due"
        ) {
          await updateMembershipStatus(userId, "free");
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[WEBHOOK] 📦 customer.subscription.deleted:`, {
          event_id: event.id,
          subscription_id: subscription.id,
          customer_id: subscription.customer,
          status: subscription.status,
          metadata: subscription.metadata,
        });

        // Extract user_id from metadata
        let userId = subscription.metadata?.user_id;

        // If not in subscription metadata, try to get from customer metadata
        if (!userId && typeof subscription.customer === "string") {
          try {
            const customer = await stripe.customers.retrieve(subscription.customer);
            if (!customer.deleted && "metadata" in customer) {
              userId = customer.metadata?.user_id;
            }
          } catch (err) {
            console.error("[WEBHOOK] ❌ Error retrieving customer:", err);
          }
        }

        if (!userId) {
          console.error("[WEBHOOK] ⚠️ No user_id found in subscription or customer metadata");
          break;
        }

        // Downgrade to free
        await updateMembershipStatus(userId, "free");
        break;
      }

      default:
        // Log unhandled event types for debugging
        console.log(`[WEBHOOK] ⚠️ Unhandled event type: ${event.type}`, {
          event_id: event.id,
        });
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
