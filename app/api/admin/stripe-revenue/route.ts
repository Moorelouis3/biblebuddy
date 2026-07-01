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

type BibleBuddyChargeType = "monthly" | "lifetime" | "yearly" | "other";

type RevenueWindowKey = "today" | "yesterday" | "24h" | "7d" | "30d" | "90d" | "this_month" | "lifetime";

function getRevenueWindowKey(req: NextRequest): RevenueWindowKey {
  const raw = req.nextUrl.searchParams.get("window");
  return raw === "today" ||
    raw === "yesterday" ||
    raw === "24h" ||
    raw === "7d" ||
    raw === "30d" ||
    raw === "90d" ||
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
  if (windowKey === "90d") return { start: Math.floor((now.getTime() - 90 * 24 * 60 * 60 * 1000) / 1000), end: null as number | null, label: "Last 90 days" };
  if (windowKey === "this_month") return { start: Math.floor(new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000), end: null as number | null, label: "This month" };
  if (windowKey === "lifetime") return { start: 0, end: null as number | null, label: "Lifetime" };
  return { start: Math.floor((now.getTime() - 24 * 60 * 60 * 1000) / 1000), end: null as number | null, label: "Last 24 hours" };
}

function getPreviousRevenueDateRange(windowKey: RevenueWindowKey) {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  if (windowKey === "today") {
    const previousStart = new Date(todayStart);
    previousStart.setDate(previousStart.getDate() - 1);
    return { start: Math.floor(previousStart.getTime() / 1000), end: Math.floor(todayStart.getTime() / 1000), label: "Previous day" };
  }
  if (windowKey === "yesterday") {
    const previousEnd = new Date(todayStart);
    previousEnd.setDate(previousEnd.getDate() - 1);
    const previousStart = new Date(previousEnd);
    previousStart.setDate(previousStart.getDate() - 1);
    return { start: Math.floor(previousStart.getTime() / 1000), end: Math.floor(previousEnd.getTime() / 1000), label: "Previous day" };
  }
  if (windowKey === "24h") return { start: Math.floor((now.getTime() - 48 * 24 * 60 * 60 * 1000) / 1000), end: Math.floor((now.getTime() - 24 * 60 * 60 * 1000) / 1000), label: "Previous 24 hours" };
  if (windowKey === "7d") return { start: Math.floor((now.getTime() - 14 * 24 * 60 * 60 * 1000) / 1000), end: Math.floor((now.getTime() - 7 * 24 * 60 * 60 * 1000) / 1000), label: "Previous 7 days" };
  if (windowKey === "30d") return { start: Math.floor((now.getTime() - 60 * 24 * 60 * 60 * 1000) / 1000), end: Math.floor((now.getTime() - 30 * 24 * 60 * 60 * 1000) / 1000), label: "Previous 30 days" };
  if (windowKey === "90d") return { start: Math.floor((now.getTime() - 180 * 24 * 60 * 60 * 1000) / 1000), end: Math.floor((now.getTime() - 90 * 24 * 60 * 60 * 1000) / 1000), label: "Previous 90 days" };
  return null;
}

function percentChange(current: number, previous: number) {
  if (previous <= 0 && current <= 0) return 0;
  if (previous <= 0) return 100;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

function getRevenueSeriesBucket(windowKey: RevenueWindowKey) {
  if (windowKey === "today" || windowKey === "24h" || windowKey === "yesterday") return "hour";
  if (windowKey === "90d") return "week";
  if (windowKey === "lifetime") return "month";
  return "day";
}

function startOfWeek(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  const day = copy.getDay();
  const diff = (day + 6) % 7;
  copy.setDate(copy.getDate() - diff);
  return copy;
}

function buildRevenueSeries(charges: Stripe.Charge[], windowKey: RevenueWindowKey) {
  const bucket = getRevenueSeriesBucket(windowKey);
  const counts = new Map<string, number>();
  const labelByKey = new Map<string, string>();

  charges.forEach((charge) => {
    const date = new Date(charge.created * 1000);
    let key = "";
    let label = "";

    if (bucket === "hour") {
      key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`;
      label = date.toLocaleTimeString("en-US", { hour: "numeric" });
    } else if (bucket === "week") {
      const weekStart = startOfWeek(date);
      key = weekStart.toISOString().slice(0, 10);
      label = weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } else if (bucket === "month") {
      key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      label = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    } else {
      key = date.toISOString().slice(0, 10);
      label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }

    counts.set(key, (counts.get(key) || 0) + (charge.amount_captured || charge.amount));
    labelByKey.set(key, label);
  });

  return Array.from(counts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => ({ label: labelByKey.get(key) || key, value: Math.round(value / 100) }));
}

function buildUpgradeSeries(charges: Stripe.Charge[], windowKey: RevenueWindowKey) {
  const bucket = getRevenueSeriesBucket(windowKey);
  const counts = new Map<string, number>();
  const labelByKey = new Map<string, string>();

  charges.forEach((charge) => {
    const date = new Date(charge.created * 1000);
    let key = "";
    let label = "";

    if (bucket === "hour") {
      key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`;
      label = date.toLocaleTimeString("en-US", { hour: "numeric" });
    } else if (bucket === "week") {
      const weekStart = startOfWeek(date);
      key = weekStart.toISOString().slice(0, 10);
      label = weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } else if (bucket === "month") {
      key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      label = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    } else {
      key = date.toISOString().slice(0, 10);
      label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }

    counts.set(key, (counts.get(key) || 0) + 1);
    labelByKey.set(key, label);
  });

  return Array.from(counts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => ({ label: labelByKey.get(key) || key, value }));
}

function getChargeCustomerKey(charge: Stripe.Charge) {
  const customer = typeof charge.customer === "object" && charge.customer && !("deleted" in charge.customer)
    ? charge.customer
    : null;
  const email = (charge.billing_details.email || charge.receipt_email || customer?.email || "").trim().toLowerCase();
  if (email) return `email:${email}`;
  if (typeof charge.customer === "string" && charge.customer) return `customer:${charge.customer}`;
  return `charge:${charge.id}`;
}

function classifyBibleBuddyCharge(charge: Stripe.Charge): BibleBuddyChargeType {
  const plan = `${charge.metadata?.plan || ""} ${charge.metadata?.checkout_context || ""}`.toLowerCase();
  const description = (charge.description || "").toLowerCase();
  const amount = charge.amount_captured || charge.amount;

  if (plan.includes("lifetime")) return "lifetime";
  if (!description && amount === 5000) return "lifetime";
  if (description.startsWith("subscription") && amount >= 4000) return "yearly";
  if (description.startsWith("subscription")) return "monthly";
  return "other";
}

function isWithinRange(created: number, range: { start: number; end: number | null }) {
  return created >= range.start && (!range.end || created < range.end);
}

function buildMonthlyRevenueSeries(charges: Stripe.Charge[], months = 12) {
  const now = new Date();
  const buckets = Array.from({ length: months }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (months - 1 - index), 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    return {
      key,
      month: key,
      label: date.toLocaleDateString("en-US", { month: "short" }),
      monthly: 0,
      lifetime: 0,
      total: 0,
    };
  });
  const byMonth = new Map(buckets.map((bucket) => [bucket.key, bucket]));

  charges.forEach((charge) => {
    const date = new Date(charge.created * 1000);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const bucket = byMonth.get(key);
    if (!bucket) return;
    const amount = (charge.amount_captured || charge.amount) / 100;
    const type = classifyBibleBuddyCharge(charge);
    if (type === "lifetime") bucket.lifetime += amount;
    if (type === "monthly" || type === "yearly") bucket.monthly += amount;
    bucket.total += amount;
  });

  return buckets.map(({ key: _key, ...bucket }) => ({
    ...bucket,
    monthly: Number(bucket.monthly.toFixed(2)),
    lifetime: Number(bucket.lifetime.toFixed(2)),
    total: Number(bucket.total.toFixed(2)),
  }));
}

async function loadAllPaidCharges() {
  const charges: Stripe.Charge[] = [];
  let startingAfter: string | undefined;

  for (;;) {
    const page = await stripe!.charges.list({
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
      expand: ["data.customer"],
    });
    charges.push(...page.data.filter((charge) => charge.paid && !charge.refunded && (charge.amount_captured || charge.amount) > 0));
    if (!page.has_more || page.data.length === 0) break;
    startingAfter = page.data[page.data.length - 1]?.id;
  }

  return charges;
}

async function loadAllSubscriptions() {
  const subscriptions: Stripe.Subscription[] = [];
  let startingAfter: string | undefined;

  for (;;) {
    const page = await stripe!.subscriptions.list({
      status: "all",
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
      expand: ["data.customer"],
    });
    subscriptions.push(...page.data);
    if (!page.has_more || page.data.length === 0) break;
    startingAfter = page.data[page.data.length - 1]?.id;
  }

  return subscriptions;
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
    const previousRange = getPreviousRevenueDateRange(windowKey);
    const broadestStart = previousRange ? Math.min(revenueRange.start, previousRange.start) : revenueRange.start;

    const [allSubscriptions, recentCharges, allPaidCharges] = await Promise.all([
      loadAllSubscriptions(),
      stripe.charges.list({
        limit: 25,
        expand: ["data.customer"],
      }),
      loadAllPaidCharges(),
    ]);

    const activePaidSubscriptions = allSubscriptions.filter((subscription) => subscription.status === "active");
    const trialingSubscriptions = allSubscriptions.filter((subscription) => subscription.status === "trialing");
    const monthlySubscriptions = activePaidSubscriptions.filter((subscription) =>
      subscription.items.data.some((item) => item.price.recurring?.interval === "month")
    );
    const yearlySubscriptions = activePaidSubscriptions.filter((subscription) =>
      subscription.items.data.some((item) => item.price.recurring?.interval === "year")
    );
    const mrrCents = activePaidSubscriptions.reduce((total, subscription) => total + getSubscriptionMrrCents(subscription), 0);
    const currency = activePaidSubscriptions[0]?.currency || recentCharges.data[0]?.currency || "usd";
    const bibleBuddyPaidCharges = allPaidCharges.filter((charge) => classifyBibleBuddyCharge(charge) !== "other");
    const paidAllFetchedCharges = bibleBuddyPaidCharges.filter((charge) => charge.created >= broadestStart);
    const paidRangeCharges = paidAllFetchedCharges.filter((charge) => {
      return isWithinRange(charge.created, revenueRange);
    });
    const paidPreviousCharges = previousRange
      ? paidAllFetchedCharges.filter((charge) => isWithinRange(charge.created, previousRange))
      : [];
    const sumCharges = (charges: Stripe.Charge[]) => charges.reduce((total, charge) => total + (charge.amount_captured || charge.amount), 0);
    const monthlyRangeCharges = paidRangeCharges.filter((charge) => classifyBibleBuddyCharge(charge) === "monthly");
    const lifetimeRangeCharges = paidRangeCharges.filter((charge) => classifyBibleBuddyCharge(charge) === "lifetime");
    const yearlyRangeCharges = paidRangeCharges.filter((charge) => classifyBibleBuddyCharge(charge) === "yearly");
    const revenueRangeCents = sumCharges(paidRangeCharges);
    const previousRevenueRangeCents = sumCharges(paidPreviousCharges);
    const monthlyRevenueRangeCents = sumCharges(monthlyRangeCharges);
    const lifetimeRevenueRangeCents = sumCharges(lifetimeRangeCharges);
    const yearlyRevenueRangeCents = sumCharges(yearlyRangeCharges);

    const monthlySignupSubscriptions = allSubscriptions.filter((subscription) =>
      subscription.items.data.some((item) => item.price.recurring?.interval === "month") &&
      isWithinRange(subscription.created, revenueRange)
    );
    const lifetimeSignupKeys = new Set(lifetimeRangeCharges.map(getChargeCustomerKey));
    const allLifetimeCustomerKeys = new Set(
      bibleBuddyPaidCharges
        .filter((charge) => classifyBibleBuddyCharge(charge) === "lifetime")
        .map(getChargeCustomerKey)
    );

    const firstPaidChargeByCustomer = new Map<string, Stripe.Charge>();
    bibleBuddyPaidCharges
      .slice()
      .sort((a, b) => a.created - b.created)
      .forEach((charge) => {
        const customerKey = getChargeCustomerKey(charge);
        if (!firstPaidChargeByCustomer.has(customerKey)) firstPaidChargeByCustomer.set(customerKey, charge);
      });
    const firstPaidCharges = Array.from(firstPaidChargeByCustomer.values());
    const upgradeRangeCharges = firstPaidCharges.filter((charge) => {
      if (charge.created < revenueRange.start) return false;
      if (revenueRange.end && charge.created >= revenueRange.end) return false;
      return true;
    });
    const previousUpgradeCharges = previousRange
      ? firstPaidCharges.filter((charge) => {
          if (charge.created < previousRange.start) return false;
          if (previousRange.end && charge.created >= previousRange.end) return false;
          return true;
        })
      : [];

    const recentPayments = recentCharges.data
      .filter((charge) => charge.paid && !charge.refunded && classifyBibleBuddyCharge(charge) !== "other")
      .slice(0, 12)
      .map((charge) => {
        const customer = typeof charge.customer === "object" && charge.customer && !("deleted" in charge.customer)
          ? charge.customer
          : null;
        const plan = classifyBibleBuddyCharge(charge);
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
    const series = buildRevenueSeries(paidRangeCharges, windowKey);
    const upgradeSeries = buildUpgradeSeries(upgradeRangeCharges, windowKey);
    const monthlyRevenueSeries = buildMonthlyRevenueSeries(bibleBuddyPaidCharges);

    return NextResponse.json({
      currency,
      window: windowKey,
      label: revenueRange.label,
      mrrCents,
      mrr: formatMoney(mrrCents, currency),
      activeSubscriptions: activePaidSubscriptions.length,
      monthlySubscriptions: monthlySubscriptions.length,
      yearlySubscriptions: yearlySubscriptions.length,
      trialingSubscriptions: trialingSubscriptions.length,
      totalSubscriptionsTracked: allSubscriptions.length,
      revenue30dCents: revenueRangeCents,
      revenue30d: formatMoney(revenueRangeCents, currency),
      revenueRangeCents,
      revenueRange: formatMoney(revenueRangeCents, currency),
      monthlyRevenueRangeCents,
      monthlyRevenueRange: formatMoney(monthlyRevenueRangeCents, currency),
      lifetimeRevenueRangeCents,
      lifetimeRevenueRange: formatMoney(lifetimeRevenueRangeCents, currency),
      yearlyRevenueRangeCents,
      yearlyRevenueRange: formatMoney(yearlyRevenueRangeCents, currency),
      monthlySignupsRange: monthlySignupSubscriptions.length,
      lifetimeSignupsRange: lifetimeSignupKeys.size,
      lifetimeCustomers: allLifetimeCustomerKeys.size,
      monthlyRevenueSeries,
      comparison: {
        current: Math.round(revenueRangeCents / 100),
        previous: Math.round(previousRevenueRangeCents / 100),
        change: percentChange(revenueRangeCents, previousRevenueRangeCents),
      },
      upgradesRange: upgradeRangeCharges.length,
      upgradeSeries,
      upgradeComparison: {
        current: upgradeRangeCharges.length,
        previous: previousUpgradeCharges.length,
        change: percentChange(upgradeRangeCharges.length, previousUpgradeCharges.length),
      },
      oneTime30dCents: lifetimeRevenueRangeCents,
      oneTime30d: formatMoney(lifetimeRevenueRangeCents, currency),
      oneTimeRangeCents: lifetimeRevenueRangeCents,
      oneTimeRange: formatMoney(lifetimeRevenueRangeCents, currency),
      series,
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
