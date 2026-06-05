"use client";

import { useEffect } from "react";
import { preloadAdminAnalytics } from "@/lib/adminAnalyticsPreload";
import { supabase } from "@/lib/supabaseClient";

export default function AdminAnalyticsPreloader() {
  useEffect(() => {
    let cancelled = false;

    async function preload() {
      const { data: userData } = await supabase.auth.getUser();
      if (cancelled || userData.user?.email !== "moorelouis3@gmail.com") return;

      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!cancelled && token) void preloadAdminAnalytics("today", token);
    }

    const timer = window.setTimeout(() => {
      void preload();
    }, 800);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
