import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceKey || !url) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { message, admin_email } = body;

    if (!message || !admin_email) {
      return NextResponse.json(
        { error: "Message and admin_email are required" },
        { status: 400 }
      );
    }

    // Create a Supabase client with service role key (bypasses RLS)
    const supabase = createClient(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error } = await supabase
      .from("admin_logs")
      .insert({
        message,
        admin_email,
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting admin log:", error);
      return NextResponse.json(
        { error: error.message || "Failed to save log" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

