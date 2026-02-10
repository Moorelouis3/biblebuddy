import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-12-15.clover",
    })
  : null;

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

export async function POST(req: NextRequest) {
  if (!stripe || !webhookSecret) {
    console.error("[WEBHOOK] Missing Stripe configuration");
    return NextResponse.json(
      { error: "Stripe webhook is not configured" },
      { status: 500 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  const payload = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("[WEBHOOK] Signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid Stripe signature" },
      { status: 400 }
    );
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.metadata?.user_id;

  if (!userId) {
    console.error("[WEBHOOK] Missing user_id in Stripe session metadata");
    return NextResponse.json(
      { error: "Missing user_id in metadata" },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("profile_stats")
      .update({ is_paid: true })
      .eq("user_id", userId)
      .select("user_id")
      .maybeSingle();

    if (error) {
      console.error("[WEBHOOK] Failed to update profile_stats:", error);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    if (!data) {
      console.error("[WEBHOOK] No profile_stats row found for user_id", userId);
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[WEBHOOK] Error updating profile_stats:", err);
    return NextResponse.json(
      { error: "Stripe webhook processing failed" },
      { status: 500 }
    );
  }
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

      // Extract user_id from metadata (defensive check)
      userId = session.metadata?.user_id || null;

      if (!userId) {
        console.error(`[WEBHOOK] ❌ No user_id found in checkout session metadata for event ${event.id}`);
        // Return 200 OK to prevent Stripe retries, but don't update membership
        return NextResponse.json({ received: true }, { status: 200 });
      }

      // Only upgrade if this was a subscription checkout
      if (session.mode === "subscription") {
        membershipStatus = "pro";
        eventHandled = true;
        
        // Update payments status (checkout completed = active payment)
        await updatePaymentsStatus(userId, true);
      } else {
        console.log(`[WEBHOOK] ℹ️ Checkout session ${session.id} is not a subscription, skipping membership update`);
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
        
        // Update payments status based on subscription status
        const hasActivePayment = mapSubscriptionStatusToPayments(subscription.status);
        await updatePaymentsStatus(userId, hasActivePayment);
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
        
        // Update payments status based on subscription status
        const hasActivePayment = mapSubscriptionStatusToPayments(subscription.status);
        await updatePaymentsStatus(userId, hasActivePayment);
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

      // Extract user_id from subscription metadata (defensive check)
      userId = subscription.metadata?.user_id || null;

      if (!userId) {
        console.error(`[WEBHOOK] ❌ No user_id found in subscription.metadata for subscription.deleted event ${event.id}`);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      // Always downgrade to free when subscription is deleted
      membershipStatus = "free";
      eventHandled = true;
      
      // Update payments status (subscription deleted = no active payment)
      await updatePaymentsStatus(userId, false);
    } else if (eventType === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`[WEBHOOK] 📦 invoice.payment_succeeded:`, {
        event_id: event.id,
        invoice_id: invoice.id,
        customer_id: invoice.customer,
        subscription_id:
          "subscription" in invoice && typeof invoice.subscription === "string"
            ? invoice.subscription
            : null,
        metadata: invoice.metadata,
      });

      // Extract user_id from subscription metadata (defensive check)
      let subscriptionId: string | null = null;
      if (
        "subscription" in invoice &&
        typeof invoice.subscription === "string"
      ) {
        subscriptionId = invoice.subscription;
      }

      if (!subscriptionId) {
        console.error(`[WEBHOOK] ❌ No subscription found in invoice ${invoice.id} for event ${event.id}`);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        userId = subscription.metadata?.user_id || null;

        if (!userId) {
          console.error(`[WEBHOOK] ❌ No user_id found in subscription.metadata for subscription ${subscriptionId}`);
          return NextResponse.json({ received: true }, { status: 200 });
        }

        // Payment succeeded - ensure Pro status
        membershipStatus = "pro";
        eventHandled = true;
        
        // Update payments status (payment succeeded = active payment)
        await updatePaymentsStatus(userId, true);
      } catch (err) {
        console.error(`[WEBHOOK] ❌ Error retrieving subscription ${subscriptionId}:`, err);
        return NextResponse.json({ received: true }, { status: 200 });
      }
    } else if (eventType === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId =
        "subscription" in invoice && typeof invoice.subscription === "string"
          ? invoice.subscription
          : null;
      console.log(`[WEBHOOK] 📦 invoice.payment_failed:`, {
        event_id: event.id,
        invoice_id: invoice.id,
        customer_id: invoice.customer,
        subscription_id: subscriptionId,
        metadata: invoice.metadata,
      });

      // Extract user_id from subscription metadata (defensive check)
      if (!subscriptionId) {
        console.error(`[WEBHOOK] ❌ No subscription found in invoice ${invoice.id} for event ${event.id}`);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        userId = subscription.metadata?.user_id || null;

        if (!userId) {
          console.error(`[WEBHOOK] ❌ No user_id found in subscription.metadata for subscription ${subscriptionId}`);
          return NextResponse.json({ received: true }, { status: 200 });
        }

        // Payment failed - downgrade to free
        membershipStatus = "free";
        eventHandled = true;
        
        // Update payments status (payment failed = no active payment)
        await updatePaymentsStatus(userId, false);
      } catch (err) {
        console.error(`[WEBHOOK] ❌ Error retrieving subscription ${subscriptionId}:`, err);
        return NextResponse.json({ received: true }, { status: 200 });
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
