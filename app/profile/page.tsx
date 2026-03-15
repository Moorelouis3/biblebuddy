"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

/**
 * /profile redirects to /profile/[userId] for the logged-in user.
 * This keeps existing links (nav bar, AppShell) working without changes.
 */
export default function ProfileRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.replace(`/profile/${user.id}`);
      } else {
        router.replace("/");
      }
    }
    redirect();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Loading profile...</p>
    </div>
  );
}
