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

type RevenueWindowKey = "today" | "yesterday" | "24h" | "7d" | "30d" | "this_month" | "lifetime";

function getRevenueWindowKey(req: NextRequest): RevenueWindowKey {
  const raw = req.nextUrl.searchParams.get("window");
  return raw === "today" ||
    raw === "yesterday" ||
    raw === "24h" ||
    raw === "7d" ||
    raw === "30d" ||
    raw === "this_month" ||
    raw === "lifetime"
    ? raw
    : "today";
}

function getRevenueDateRange(windowKey: RevenueWindowKey) {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  if (windowKey === "today") return { start: Math.floor(todayStart.getTime() / 1000), end: null as number | null, label: "Today" };
  if (windowKey === "yesterday") {
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    return { start: Math.floor(yesterdayStart.getTime() / 1000), end: Math.floor(todayStart.getTime() / 1000), label: "Yesterday" };
  }
  if (windowKey === "7d") return { start: Math.floor((now.getTime() - 7 * 24 * 60 * 60 * 1000) / 1000), end: null as number | null, label: "Last 7 days" };
  if (windowKey === "30d") return { start: Math.floor((now.getTime() - 30 * 24 * 60 * 60 * 1000) / 1000), end: null as number | null, label: "Last 30 days" };
  if (windowKey === "this_month") return { start: Math.floor(new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000), end: null as number | null, label: "This month" };
  if (windowKey === "lifetime") return { start: 0, end: null as number | null, label: "Lifetime" };
  return { start: Math.floor((now.getTime() - 24 * 60 * 60 * 1000) / 1000), end: null as number | null, label: "Last 24 hours" };
}

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
    const windowKey = getRevenueWindowKey(req);
    const revenueRange = getRevenueDateRange(windowKey);
    const createdRange = revenueRange.end ? { gte: revenueRange.start, lt: revenueRange.end } : { gte: revenueRange.start };

    const [activeSubscriptions, trialingSubscriptions, recentCharges, rangeCharges] = await Promise.all([
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
        created: createdRange,
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
    const paidRangeCharges = rangeCharges.data.filter((charge) => charge.paid && !charge.refunded);
    const revenueRangeCents = paidRangeCharges.reduce((total, charge) => total + charge.amount_captured, 0);
    const oneTimeRangeCents = paidRangeCharges
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
      window: windowKey,
      label: revenueRange.label,
      mrrCents,
      mrr: formatMoney(mrrCents, currency),
      activeSubscriptions: activePaidSubscriptions.length,
      monthlySubscriptions: monthlySubscriptions.length,
      trialingSubscriptions: trialingSubscriptions.data.length,
      totalSubscriptionsTracked: subscriptions.length,
      revenue30dCents: revenueRangeCents,
      revenue30d: formatMoney(revenueRangeCents, currency),
      revenueRangeCents,
      revenueRange: formatMoney(revenueRangeCents, currency),
      oneTime30dCents: oneTimeRangeCents,
      oneTime30d: formatMoney(oneTimeRangeCents, currency),
      oneTimeRangeCents,
      oneTimeRange: formatMoney(oneTimeRangeCents, currency),
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
