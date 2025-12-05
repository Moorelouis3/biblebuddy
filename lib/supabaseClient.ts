// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ⭐ This ensures your login session is stored in localStorage
// ⭐ and fixes the "Auth session missing" error
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,      // keeps user logged in
    autoRefreshToken: true,    // refreshes tokens before they expire
    detectSessionInUrl: true,  // needed for magic links etc.
  },
});
