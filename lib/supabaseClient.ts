// lib/supabaseClient.ts
"use client";

import { createBrowserClient } from "@supabase/ssr";
import { boundedAuthLock, fetchWithTimeout } from "./supabaseAuthLock";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ⭐ Use createBrowserClient from @supabase/ssr to store sessions in cookies
// ⭐ This allows middleware to read the session
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true,
    // Left to itself, supabase-js waits forever for its auth Web Lock, and a
    // page the OS suspended mid-refresh never gives that lock back - which is
    // how the iOS app froze after being left open. See lib/supabaseAuthLock.ts.
    lock: boundedAuthLock,
  },
  global: {
    // No request the client makes may outlive the page it was made on.
    fetch: fetchWithTimeout,
  },
  cookieOptions: {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
});
