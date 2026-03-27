import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { markUserAsPaidAndTrackUpgrade } from "@/lib/server/upgradeTracking";

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
    console.log("[WEBHOOK] Updating is_paid for user_id:", userId);
    const amountTotal = typeof session.amount_total === "number"
      ? `$${(session.amount_total / 100).toFixed(2)}`
      : null;

    await markUserAsPaidAndTrackUpgrade({
      supabase,
      userId,
      source: "stripe",
      actionLabel: amountTotal
        ? `Stripe checkout completed (${amountTotal})`
        : "Stripe checkout completed",
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[WEBHOOK] Error updating profile_stats:", err);
    return NextResponse.json(
      { error: "Stripe webhook processing failed" },
      { status: 500 }
    );
  }
}
