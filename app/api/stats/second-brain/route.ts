import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Built for Life Buddy's "Socials"-style sidebar bridge and the Morning
// Newspaper - same real Supabase/Stripe access the existing /api/admin/*
// dashboards use, just service-to-service auth instead of a logged-in
// owner session, since the caller here is another server, not a browser.

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-12-15.clover" })
  : null;

// Unlike the existing cron routes' isAuthorized() (which fails OPEN if
// the secret env var isn't set), this fails CLOSED - a real revenue/
// signup endpoint should never be reachable with no secret configured.
function isAuthorized(request: NextRequest) {
  const secret = process.env.SECOND_BRAIN_STATS_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }
  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const sinceIso = since.toISOString();
  const sinceUnix = Math.floor(since.getTime() / 1000);

  // Signups in the last 24 hours - real count, never a guess.
  let signups24h: number | null = null;
  let signupsError: string | null = null;
  try {
    const { count, error } = await supabaseAdmin
      .from("user_signups")
      .select("user_id", { count: "exact", head: true })
      .gte("created_at", sinceIso);
    if (error) throw error;
    signups24h = count ?? 0;
  } catch (e) {
    signupsError = e instanceof Error ? e.message : String(e);
  }

  // Stripe revenue in the last 24 hours - same "paid, not refunded"
  // filter already used in /api/admin/stripe-revenue, just narrowed to a
  // rolling 24h window instead of the full multi-window report.
  let revenue24hUsd: number | null = null;
  let revenueError: string | null = null;
  if (!stripe) {
    revenueError = "Stripe not configured.";
  } else {
    try {
      let cents = 0;
      let startingAfter: string | undefined;
      for (;;) {
        const page = await stripe.charges.list({
          limit: 100,
          created: { gte: sinceUnix },
          ...(startingAfter ? { starting_after: startingAfter } : {}),
        });
        for (const charge of page.data) {
          const amount = charge.amount_captured || charge.amount;
          if (charge.paid && !charge.refunded && amount > 0) cents += amount;
        }
        if (!page.has_more || page.data.length === 0) break;
        startingAfter = page.data[page.data.length - 1]?.id;
      }
      revenue24hUsd = Number((cents / 100).toFixed(2));
    } catch (e) {
      revenueError = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    signups24h,
    signupsError,
    revenue24hUsd,
    revenueError,
    generatedAt: new Date().toISOString(),
  });
}
