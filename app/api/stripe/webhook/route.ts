import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

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
    } catch (err: any) {
      console.error("⚠️ Webhook signature verification failed:", err.message);
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
        console.log("✅ checkout.session.completed:", {
          event_id: event.id,
          session_id: session.id,
          customer_email: session.customer_email,
          metadata: session.metadata,
        });
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("✅ customer.subscription.created:", {
          event_id: event.id,
          subscription_id: subscription.id,
          customer_id: subscription.customer,
          status: subscription.status,
        });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("✅ customer.subscription.updated:", {
          event_id: event.id,
          subscription_id: subscription.id,
          customer_id: subscription.customer,
          status: subscription.status,
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("✅ customer.subscription.deleted:", {
          event_id: event.id,
          subscription_id: subscription.id,
          customer_id: subscription.customer,
          status: subscription.status,
        });
        break;
      }

      default:
        // Log unhandled event types for debugging
        console.log("⚠️ Unhandled event type:", event.type, {
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
