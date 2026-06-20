import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { markUserAsPaidAndTrackUpgrade } from "@/lib/server/upgradeTracking";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-12-15.clover",
    })
  : null;

function getSupabaseClients() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceKey || !anonKey || !url) {
    throw new Error("Supabase is not configured");
  }

  return {
    auth: createClient(url, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    }),
    admin: createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    }),
  };
}

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session ID." }, { status: 400 });
  }

  try {
    const { auth, admin } = getSupabaseClients();
    const { data: userData, error: userError } = await auth.auth.getUser(token);
    if (userError || !userData.user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const metadata = session.metadata ?? {};
    if (metadata.user_id !== userData.user.id) {
      return NextResponse.json({ error: "Upgrade does not belong to this user." }, { status: 403 });
    }

    const isComplete = session.status === "complete";
    const isPaid = session.payment_status === "paid" || session.mode === "subscription";
    if (!isComplete || !isPaid) {
      return NextResponse.json({ error: "Checkout is not complete yet." }, { status: 400 });
    }

    const amountTotal = typeof session.amount_total === "number" ? `$${(session.amount_total / 100).toFixed(2)}` : null;
    const journeyDay = Number(metadata.journey_day || 0);
    const checkoutContext = metadata.checkout_context || "";
    const prompt = metadata.prompt || "";
    const upgradeOfferDay =
      journeyDay === 3 || checkoutContext === "day_3_upgrade_offer" || prompt === "day_3_pro_upgrade"
        ? 3
        : journeyDay === 7 || checkoutContext === "day_7_upgrade_offer" || prompt === "day_7_pro_upgrade"
          ? 7
          : null;
    const stripeCustomerId = typeof session.customer === "string" ? session.customer : null;
    const stripeSubscriptionId = typeof session.subscription === "string" ? session.subscription : null;

    await markUserAsPaidAndTrackUpgrade({
      supabase: admin,
      userId: userData.user.id,
      source: "stripe_success_page",
      membershipStatus: "pro",
      proExpiresAt: null,
      journeyDay: Number.isInteger(journeyDay) && journeyDay > 0 ? journeyDay : null,
      accountStatus: "pro",
      sessionId: session.id,
      eventMetadata: {
        checkoutSessionId: session.id,
        stripeCustomerId,
        stripeSubscriptionId,
        amountTotal: session.amount_total,
        currency: session.currency,
        plan: metadata.plan || null,
        checkoutContext: checkoutContext || null,
        prompt: prompt || null,
        returnTo: metadata.return_to || null,
        source: metadata.source || "stripe",
        confirmedOnSuccessPage: true,
      },
      actionLabel: amountTotal
        ? `Stripe checkout confirmed on success page${upgradeOfferDay ? ` - Day ${upgradeOfferDay} Pro upgrade` : ""} (${amountTotal})`
        : `Stripe checkout confirmed on success page${upgradeOfferDay ? ` - Day ${upgradeOfferDay} Pro upgrade` : ""}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[STRIPE_CONFIRM_UPGRADE] Failed:", error);
    return NextResponse.json({ error: "Could not confirm upgrade." }, { status: 500 });
  }
}
