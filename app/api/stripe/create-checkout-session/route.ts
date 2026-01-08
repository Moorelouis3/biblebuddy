import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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
  console.log("[STRIPE_CHECKOUT] ========== Request received ==========");
  
  try {
    // Check if Stripe is initialized
    if (!stripe) {
      console.error("[STRIPE_CHECKOUT] ❌ Stripe is not initialized");
      console.error("[STRIPE_CHECKOUT] STRIPE_SECRET_KEY exists:", !!process.env.STRIPE_SECRET_KEY);
      return NextResponse.json(
        {
          error: "Stripe is not configured. Please check your environment variables.",
        },
        { status: 500 }
      );
    }

    console.log("[STRIPE_CHECKOUT] ✅ Stripe initialized");

    // Check environment variables
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.error("⚠️ NEXT_PUBLIC_APP_URL is not set in environment variables!");
      return NextResponse.json(
        {
          error: "Server configuration error. Please contact support.",
        },
        { status: 500 }
      );
    }

    console.log("[STRIPE_CHECKOUT] ✅ NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL);

    // Get raw body for logging
    const rawBody = await req.text();
    console.log("[STRIPE_CHECKOUT] Raw request body:", rawBody);

    // Parse request body
    let body;
    try {
      body = JSON.parse(rawBody);
      console.log("[STRIPE_CHECKOUT] Parsed body:", JSON.stringify(body, null, 2));
    } catch (err: any) {
      console.error("[STRIPE_CHECKOUT] ❌ Failed to parse JSON:", err.message);
      console.error("[STRIPE_CHECKOUT] Raw body was:", rawBody);
      return NextResponse.json(
        {
          error: "Invalid request format",
        },
        { status: 400 }
      );
    }

    const { priceId } = body;
    console.log("[STRIPE_CHECKOUT] Extracted priceId:", priceId);
    console.log("[STRIPE_CHECKOUT] priceId type:", typeof priceId);
    console.log("[STRIPE_CHECKOUT] priceId is string:", typeof priceId === "string");

    // Validate priceId
    if (!priceId) {
      console.error("[STRIPE_CHECKOUT] ❌ Missing priceId");
      console.error("[STRIPE_CHECKOUT] Full body:", JSON.stringify(body, null, 2));
      return NextResponse.json(
        {
          error: "Missing priceId",
        },
        { status: 400 }
      );
    }

    if (typeof priceId !== "string") {
      console.error("[STRIPE_CHECKOUT] ❌ priceId is not a string");
      console.error("[STRIPE_CHECKOUT] priceId value:", priceId);
      console.error("[STRIPE_CHECKOUT] priceId type:", typeof priceId);
      return NextResponse.json(
        {
          error: "Invalid priceId. Please provide a valid Stripe price ID.",
        },
        { status: 400 }
      );
    }

    console.log("[STRIPE_CHECKOUT] ✅ priceId validated:", priceId);

    // Create Supabase client to check authentication
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            // Server-side cookie setting (not needed for read-only auth check)
          },
          remove(name: string, options: any) {
            // Server-side cookie removal (not needed for read-only auth check)
          },
        },
      }
    );

    // Check for authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    console.log("[STRIPE_CHECKOUT] Auth check:");
    console.log("[STRIPE_CHECKOUT] - authError:", authError);
    console.log("[STRIPE_CHECKOUT] - user exists:", !!user);
    console.log("[STRIPE_CHECKOUT] - user id:", user?.id);
    console.log("[STRIPE_CHECKOUT] - user email:", user?.email);

    if (authError || !user) {
      console.error("[STRIPE_CHECKOUT] ❌ Unauthorized:", authError?.message || "No user");
      return NextResponse.json(
        {
          error: "Unauthorized. Please log in to upgrade.",
        },
        { status: 401 }
      );
    }

    console.log("[STRIPE_CHECKOUT] ✅ User authenticated:", user.id);

    // Create Stripe Checkout Session
    console.log("[STRIPE_CHECKOUT] Creating Stripe Checkout Session with:");
    console.log("[STRIPE_CHECKOUT] - mode: subscription");
    console.log("[STRIPE_CHECKOUT] - priceId:", priceId);
    console.log("[STRIPE_CHECKOUT] - customer_email:", user.email);
    console.log("[STRIPE_CHECKOUT] - success_url:", `${process.env.NEXT_PUBLIC_APP_URL}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`);
    console.log("[STRIPE_CHECKOUT] - cancel_url:", `${process.env.NEXT_PUBLIC_APP_URL}/upgrade`);
    console.log("[STRIPE_CHECKOUT] - metadata:", { user_id: user.id, plan: "pro" });

    let session;
    try {
      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade`,
        customer_email: user.email || undefined,
        metadata: {
          user_id: user.id,
          plan: "pro",
        },
      });

      console.log("[STRIPE_CHECKOUT] ✅ Stripe session created successfully");
      console.log("[STRIPE_CHECKOUT] - session_id:", session.id);
      console.log("[STRIPE_CHECKOUT] - session_url:", session.url);
    } catch (stripeError: any) {
      console.error("[STRIPE_CHECKOUT] ❌ Stripe API error:");
      console.error("[STRIPE_CHECKOUT] - Error type:", stripeError.type);
      console.error("[STRIPE_CHECKOUT] - Error code:", stripeError.code);
      console.error("[STRIPE_CHECKOUT] - Error message:", stripeError.message);
      console.error("[STRIPE_CHECKOUT] - Error raw:", JSON.stringify(stripeError, null, 2));
      throw stripeError;
    }

    // Return the session URL
    return NextResponse.json(
      {
        url: session.url,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[STRIPE_CHECKOUT] ========== ERROR ==========");
    console.error("[STRIPE_CHECKOUT] Error type:", err.type);
    console.error("[STRIPE_CHECKOUT] Error code:", err.code);
    console.error("[STRIPE_CHECKOUT] Error message:", err.message);
    console.error("[STRIPE_CHECKOUT] Full error:", JSON.stringify(err, null, 2));
    console.error("[STRIPE_CHECKOUT] Error stack:", err.stack);

    // Handle Stripe-specific errors
    if (err.type === "StripeCardError") {
      console.error("[STRIPE_CHECKOUT] ❌ Stripe Card Error");
      return NextResponse.json(
        {
          error: err.message || "Card error. Please check your payment details.",
        },
        { status: 400 }
      );
    }

    if (err.type === "StripeInvalidRequestError") {
      console.error("[STRIPE_CHECKOUT] ❌ Stripe Invalid Request Error");
      console.error("[STRIPE_CHECKOUT] Error details:", {
        message: err.message,
        code: err.code,
        param: err.param,
      });
      return NextResponse.json(
        {
          error: err.message || "Invalid request. Please check your subscription details.",
          details: process.env.NODE_ENV === "development" ? {
            code: err.code,
            param: err.param,
          } : undefined,
        },
        { status: 400 }
      );
    }

    // Generic error response
    console.error("[STRIPE_CHECKOUT] ❌ Generic error");
    return NextResponse.json(
      {
        error: err.message || (process.env.NODE_ENV === "development"
          ? `Error: ${err.message || "Unknown error"}`
          : "An error occurred while creating the checkout session. Please try again."),
      },
      { status: 500 }
    );
  }
}
