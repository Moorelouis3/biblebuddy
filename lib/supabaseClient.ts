// lib/supabaseClient.ts
"use client";

import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ⭐ Use createBrowserClient from @supabase/ssr to store sessions in cookies
// ⭐ This allows middleware to read the session
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
