import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
    })
  : null;

const PRICE_IDS: Record<"monthly" | "yearly", string> = {
  monthly: "price_1SzK8nGDyj3itMVLMk98v1iD",
  yearly: "price_1Sn7BZGDyj3itMVLHoO6eeGw",
};

const normalizeOrigin = (value: string) => {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const isLocalhost =
    value.includes("localhost") || value.startsWith("127.0.0.1");
  const protocol = isLocalhost ? "http" : "https";
  return `${protocol}://${value}`;
};

export async function POST(req: NextRequest) {
  if (!stripe) {
    console.error("Stripe checkout error: STRIPE_SECRET_KEY missing");
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 500 }
    );
  }

  let body: { plan?: "monthly" | "yearly" };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const plan = body.plan;
  if (plan !== "monthly" && plan !== "yearly") {
    return NextResponse.json(
      { error: "Invalid plan" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {
          // No-op for server-side auth check.
        },
        remove() {
          // No-op for server-side auth check.
        },
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user || !user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawOrigin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;
  if (!rawOrigin) {
    return NextResponse.json(
      { error: "Missing origin" },
      { status: 500 }
    );
  }

  const origin = normalizeOrigin(rawOrigin);

  let successUrl: string;
  let cancelUrl: string;
  try {
    successUrl = new URL("/upgrade/success", origin).toString();
    cancelUrl = new URL("/upgrade", origin).toString();
  } catch {
    return NextResponse.json(
      { error: "Invalid origin URL" },
      { status: 500 }
    );
  }

  try {
    const priceId = PRICE_IDS[plan];
    const isLiveKey = !!process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_");

    try {
      const price = await stripe.prices.retrieve(priceId);
      if (price.livemode !== isLiveKey) {
        return NextResponse.json(
          {
            error:
              "Stripe price does not match the current key mode (test vs live)",
          },
          { status: 500 }
        );
      }
    } catch (err) {
      console.error("Stripe checkout error:", err);
      const message = err instanceof Error ? err.message : undefined;
      return NextResponse.json(
        { error: message || "Stripe checkout failed" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: user.email,
      metadata: {
        user_id: user.id,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    const message = err instanceof Error ? err.message : undefined;
    return NextResponse.json(
      { error: message || "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
