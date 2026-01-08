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
  try {
    // Check if Stripe is initialized
    if (!stripe) {
      return NextResponse.json(
        {
          error: "Stripe is not configured. Please check your environment variables.",
        },
        { status: 500 }
      );
    }

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

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json(
        {
          error: "Invalid request format",
        },
        { status: 400 }
      );
    }

    const { priceId } = body;

    // Validate priceId
    if (!priceId || typeof priceId !== "string") {
      return NextResponse.json(
        {
          error: "Invalid priceId. Please provide a valid Stripe price ID.",
        },
        { status: 400 }
      );
    }

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

    if (authError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized. Please log in to upgrade.",
        },
        { status: 401 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
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

    // Return the session URL
    return NextResponse.json(
      {
        url: session.url,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Stripe checkout session creation error:", err);

    // Handle Stripe-specific errors
    if (err.type === "StripeCardError") {
      return NextResponse.json(
        {
          error: "Card error. Please check your payment details.",
        },
        { status: 400 }
      );
    }

    if (err.type === "StripeInvalidRequestError") {
      return NextResponse.json(
        {
          error: "Invalid request. Please check your subscription details.",
        },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        error: process.env.NODE_ENV === "development"
          ? `Error: ${err.message || "Unknown error"}`
          : "An error occurred while creating the checkout session. Please try again.",
      },
      { status: 500 }
    );
  }
}
