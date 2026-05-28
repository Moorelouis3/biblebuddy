import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
    })
  : null;

function formatMoney(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function getSubscriptionMrrCents(subscription: Stripe.Subscription) {
  return subscription.items.data.reduce((total, item) => {
    const price = item.price;
    const unitAmount = price.unit_amount || 0;
    const quantity = item.quantity || 1;
    const interval = price.recurring?.interval;
    if (interval === "month") return total + unitAmount * quantity;
    if (interval === "year") return total + Math.round((unitAmount * quantity) / 12);
    return total;
  }, 0);
}

type ChargeWithInvoice = Stripe.Charge & {
  invoice?: string | Stripe.Invoice | null;
};

async function requireOwner(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!token || !supabaseUrl || !supabaseAnonKey) return false;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return false;
  return data.user.email === "moorelouis3@gmail.com";
}

export async function GET(req: NextRequest) {
  if (!(await requireOwner(req))) {
    return NextResponse.json({ error: "Owner only" }, { status: 403 });
  }

  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  try {
    const nowSeconds = Math.floor(Date.now() / 1000);
    const thirtyDaysAgo = nowSeconds - 30 * 24 * 60 * 60;

    const [activeSubscriptions, trialingSubscriptions, recentCharges, thirtyDayCharges] = await Promise.all([
      stripe.subscriptions.list({
        status: "active",
        limit: 100,
        expand: ["data.customer"],
      }),
      stripe.subscriptions.list({
        status: "trialing",
        limit: 100,
        expand: ["data.customer"],
      }),
      stripe.charges.list({
        limit: 25,
        expand: ["data.customer"],
      }),
      stripe.charges.list({
        limit: 100,
        created: { gte: thirtyDaysAgo },
        expand: ["data.customer"],
      }),
    ]);

    const subscriptions = [...activeSubscriptions.data, ...trialingSubscriptions.data];
    const activePaidSubscriptions = activeSubscriptions.data;
    const monthlySubscriptions = activePaidSubscriptions.filter((subscription) =>
      subscription.items.data.some((item) => item.price.recurring?.interval === "month")
    );
    const mrrCents = activePaidSubscriptions.reduce((total, subscription) => total + getSubscriptionMrrCents(subscription), 0);
    const currency = activePaidSubscriptions[0]?.currency || recentCharges.data[0]?.currency || "usd";
    const paidThirtyDayCharges = thirtyDayCharges.data.filter((charge) => charge.paid && !charge.refunded);
    const revenue30dCents = paidThirtyDayCharges.reduce((total, charge) => total + charge.amount_captured, 0);
    const oneTime30dCents = paidThirtyDayCharges
      .filter((charge) => {
        const chargeWithInvoice = charge as ChargeWithInvoice;
        const plan = (charge.metadata?.plan || charge.metadata?.checkout_context || "").toLowerCase();
        return plan.includes("lifetime") || !chargeWithInvoice.invoice;
      })
      .reduce((total, charge) => total + charge.amount_captured, 0);

    const recentPayments = recentCharges.data
      .filter((charge) => charge.paid && !charge.refunded)
      .slice(0, 12)
      .map((charge) => {
        const chargeWithInvoice = charge as ChargeWithInvoice;
        const customer = typeof charge.customer === "object" && charge.customer && !("deleted" in charge.customer)
          ? charge.customer
          : null;
        const plan = charge.metadata?.plan || (chargeWithInvoice.invoice ? "monthly" : "one_time");
        return {
          id: charge.id,
          amount: formatMoney(charge.amount_captured || charge.amount, charge.currency),
          amountCents: charge.amount_captured || charge.amount,
          currency: charge.currency,
          createdAt: new Date(charge.created * 1000).toISOString(),
          customerEmail: charge.billing_details.email || customer?.email || "Unknown customer",
          customerName: charge.billing_details.name || customer?.name || null,
          plan,
          status: charge.status,
          receiptUrl: charge.receipt_url,
        };
      });

    return NextResponse.json({
      currency,
      mrrCents,
      mrr: formatMoney(mrrCents, currency),
      activeSubscriptions: activePaidSubscriptions.length,
      monthlySubscriptions: monthlySubscriptions.length,
      trialingSubscriptions: trialingSubscriptions.data.length,
      totalSubscriptionsTracked: subscriptions.length,
      revenue30dCents,
      revenue30d: formatMoney(revenue30dCents, currency),
      oneTime30dCents,
      oneTime30d: formatMoney(oneTime30dCents, currency),
      recentPayments,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[STRIPE_REVENUE] Failed to load Stripe revenue:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load Stripe revenue." },
      { status: 500 }
    );
  }
}
